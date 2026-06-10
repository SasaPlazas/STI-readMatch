import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { joinGroupByCode, triggerGroupRecommendations } from '../utils/userStorage';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

const BADGE_COLORS = [
  colors.purple,
  colors.coral,
  colors.lavender,
  colors.violet,
  colors.lime,
  '#E8E0FF',
];

function strHash(s = '') {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
function groupInitials(name = '') {
  return (
    name.trim().split(/\s+/).slice(0, 2).map((w) => w[0] ?? '').join('').toUpperCase() || '?'
  );
}
function badgeColor(id = '') {
  return BADGE_COLORS[strHash(id) % BADGE_COLORS.length];
}

function GroupResultCard({ group, onPress, onJoin, joining }) {
  const vibes = Array.isArray(group.vibe) ? group.vibe : [];
  const bg = badgeColor(group.id);
  const darkBg = bg === colors.purple || bg === colors.violet;

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={[styles.cardBadge, { backgroundColor: bg }]}>
        <Text style={[styles.cardBadgeText, darkBg && { color: colors.cream }]}>
          {groupInitials(group.group_name)}
        </Text>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardName} numberOfLines={1}>{group.group_name}</Text>
        {vibes.length > 0 && (
          <View style={styles.vibeRow}>
            {vibes.slice(0, 3).map((v) => (
              <View key={v} style={styles.vibePill}>
                <Text style={styles.vibePillText}>{v}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <Pressable
        onPress={onJoin}
        disabled={joining}
        style={[styles.joinCardBtn, joining && styles.joinCardBtnDisabled]}
      >
        {joining ? (
          <ActivityIndicator size="small" color={colors.cream} />
        ) : (
          <Text style={styles.joinCardBtnText}>Unirse</Text>
        )}
      </Pressable>
    </Pressable>
  );
}

export function JoinGroupScreen({ navigation }) {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(true);
  const [joiningId, setJoiningId] = useState(null);

  const [showCodeSection, setShowCodeSection] = useState(false);
  const [code, setCode] = useState('');
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState('');
  const [joinSuccess, setJoinSuccess] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        let q = supabase
          .from('recommendation_groups')
          .select('id, group_name, vibe, join_code')
          .neq('created_by', user.id);

        if (query.trim().length > 0) {
          q = q.ilike('group_name', `%${query.trim()}%`).limit(20);
        } else {
          q = q.order('created_at', { ascending: false }).limit(15);
        }

        const { data } = await q;
        setSearchResults(data ?? []);
      } catch {
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query, user?.id]);

  const onJoinFromSearch = async (group) => {
    setJoiningId(group.id);
    try {
      const { error: joinErr } = await supabase.from('group_members').insert({
        group_id: group.id,
        user_id: user.id,
        role: 'member',
        influence_weight: 1.0,
      });
      if (joinErr) {
        if (joinErr.code === '23505') throw new Error('Ya eres miembro de este grupo');
        throw joinErr;
      }
      try { await triggerGroupRecommendations(group.id); } catch {}
      navigation.navigate(routes.GroupDetail, { groupId: group.id });
    } catch (e) {
      Alert.alert('No se pudo unir', e?.message || 'Inténtalo de nuevo');
    } finally {
      setJoiningId(null);
    }
  };

  const onJoinByCode = async () => {
    if (code.trim().length < 4 || joining) return;
    setJoining(true);
    setJoinError('');
    setJoinSuccess(null);
    try {
      const result = await joinGroupByCode(code);
      setJoinSuccess(result);
      setCode('');
    } catch (e) {
      setJoinError(e?.message || 'Código no encontrado');
    } finally {
      setJoining(false);
    }
  };

  return (
    <Screen backgroundColor={colors.cream}>
      <TopBar title="Unirse a un círculo" onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        <View style={styles.header}>
          <Text style={styles.kicker}>★ Find your people</Text>
          <Text style={styles.title}>
            Join a reading{'\n'}
            <Text style={styles.titleItalic}>circle</Text>
          </Text>
        </View>

        {/* ── Search ── */}
        <View style={styles.searchWrap}>
          <View style={styles.searchRow}>
            <View style={styles.searchIconWrap}>
              <Text style={styles.searchIconText}>⌕</Text>
            </View>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search circles..."
              placeholderTextColor="rgba(22,16,46,0.35)"
              style={styles.searchInput}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
            />
            {searching && <ActivityIndicator size="small" color={colors.purple} />}
          </View>
        </View>

        {/* ── Results ── */}
        <View style={styles.results}>
          {searching ? null : searchResults.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                {query.trim()
                  ? 'Sin resultados para ese nombre'
                  : 'No hay círculos públicos aún'}
              </Text>
            </View>
          ) : (
            searchResults.map((group) => (
              <GroupResultCard
                key={group.id}
                group={group}
                joining={joiningId === group.id}
                onPress={() => navigation.navigate(routes.GroupDetail, { groupId: group.id })}
                onJoin={() => onJoinFromSearch(group)}
              />
            ))
          )}
        </View>

        {/* ── Code toggle ── */}
        <Pressable
          onPress={() => setShowCodeSection((v) => !v)}
          style={styles.codeToggle}
        >
          <Text style={styles.codeToggleText}>
            {showCodeSection ? '▲' : '▼'}{' '}¿Tienes un código de invitación?
          </Text>
        </Pressable>

        {/* ── Join by code ── */}
        {showCodeSection && (
          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>CÓDIGO DEL GRUPO</Text>
            <View style={styles.inputRow}>
              <TextInput
                value={code}
                onChangeText={(v) => {
                  setCode(v.toUpperCase());
                  setJoinError('');
                  setJoinSuccess(null);
                }}
                placeholder="ej. RM-A3F7"
                placeholderTextColor="rgba(22,16,46,0.3)"
                autoCapitalize="characters"
                autoCorrect={false}
                maxLength={8}
                style={styles.codeInput}
                onSubmitEditing={onJoinByCode}
              />
            </View>
            <View style={[styles.codeUnderline, code.length >= 4 && styles.codeUnderlineActive]} />
            {joinError ? <Text style={styles.errText}>{joinError}</Text> : null}
            {joinSuccess ? (
              <View style={styles.successBox}>
                <Text style={styles.successText}>¡Entraste a {joinSuccess.groupName}! 🎉</Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate(routes.GroupDetail, { groupId: joinSuccess.groupId })
                  }
                  style={styles.goHome}
                >
                  <Text style={styles.goHomeText}>Ir al grupo →</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                onPress={onJoinByCode}
                disabled={code.length < 6 || joining}
                style={[
                  styles.joinBtn,
                  (code.length < 6 || joining) && styles.joinBtnDisabled,
                  { marginTop: 12 },
                ]}
              >
                {joining ? (
                  <ActivityIndicator color={colors.cream} />
                ) : (
                  <Text style={styles.joinBtnText}>Unirse al círculo</Text>
                )}
              </Pressable>
            )}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 24 },

  header: { paddingHorizontal: 22, paddingBottom: 20 },
  kicker: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.purple,
    marginBottom: 8,
  },
  title: { fontSize: 38, fontWeight: '900', color: colors.ink, letterSpacing: -1, lineHeight: 40 },
  titleItalic: { fontStyle: 'italic', fontWeight: '400', color: colors.purple },

  searchWrap: { paddingHorizontal: 22, marginBottom: 14 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: radii.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.08)',
  },
  searchIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: 'rgba(22,16,46,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  searchIconText: { fontSize: 16, color: colors.ink },
  searchInput: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.ink },

  results: { paddingHorizontal: 16, gap: 10 },
  emptyState: { padding: 20, alignItems: 'center' },
  emptyText: { fontSize: 13, fontWeight: '600', color: 'rgba(22,16,46,0.4)', textAlign: 'center' },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  cardBadge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardBadgeText: { fontSize: 16, fontWeight: '900', color: colors.ink, letterSpacing: -0.3 },
  cardInfo: { flex: 1, minWidth: 0 },
  cardName: { fontSize: 15, fontWeight: '900', color: colors.ink, letterSpacing: -0.2 },
  vibeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 5 },
  vibePill: {
    borderRadius: radii.pill,
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(124,91,255,0.1)',
  },
  vibePillText: { fontSize: 10, fontWeight: '700', color: colors.purple },

  joinCardBtn: {
    borderRadius: radii.pill,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: colors.ink,
    flexShrink: 0,
    minWidth: 72,
    alignItems: 'center',
  },
  joinCardBtnDisabled: { backgroundColor: 'rgba(22,16,46,0.2)' },
  joinCardBtnText: { fontSize: 12, fontWeight: '900', color: colors.cream },

  codeToggle: {
    marginHorizontal: 22,
    marginTop: 24,
    marginBottom: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: radii.lg,
    backgroundColor: 'rgba(22,16,46,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.08)',
    alignItems: 'center',
  },
  codeToggleText: { fontSize: 13, fontWeight: '700', color: 'rgba(22,16,46,0.55)' },

  inputCard: { marginHorizontal: 22, marginBottom: 12 },
  inputLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.45)',
    marginBottom: 10,
  },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  codeInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: 4,
    paddingVertical: 4,
  },
  codeUnderline: {
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(22,16,46,0.15)',
    marginTop: 6,
  },
  codeUnderlineActive: { backgroundColor: colors.purple },
  errText: { fontSize: 12, fontWeight: '700', color: colors.coral, marginTop: 8, marginBottom: 4 },
  successBox: {
    backgroundColor: 'rgba(212,255,61,0.1)',
    borderRadius: radii.md,
    padding: 12,
    gap: 8,
    marginTop: 12,
  },
  successText: { fontSize: 13, fontWeight: '800', color: colors.ink },
  goHome: { alignSelf: 'flex-start' },
  goHomeText: { fontSize: 13, fontWeight: '800', color: colors.purple },
  joinBtn: {
    borderRadius: radii.pill,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.ink,
    alignItems: 'center',
  },
  joinBtnDisabled: { backgroundColor: 'rgba(22,16,46,0.2)' },
  joinBtnText: { fontSize: 14, fontWeight: '900', color: colors.cream },
});
