import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { RMButton } from '../components/RMButton';
import { joinGroupByLink } from '../utils/userStorage';
import { supabase } from '../lib/supabase';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

const BADGE_COLORS = [colors.purple, colors.coral, colors.lavender, colors.violet, colors.lime];

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

function groupBadgeColor(id = '') {
  return BADGE_COLORS[strHash(id) % BADGE_COLORS.length];
}

export function JoinGroupScreen({ navigation }) {
  const [deepLink, setDeepLink] = useState('');
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState('');
  const [joinSuccess, setJoinSuccess] = useState(null);

  const [code, setCode] = useState('');
  const [found, setFound] = useState(null);
  const [searching, setSearching] = useState(false);
  const [codeError, setCodeError] = useState('');

  const [nameQuery, setNameQuery] = useState('');
  const [nameResults, setNameResults] = useState([]);
  const [nameSearching, setNameSearching] = useState(false);

  const [discoverGroups, setDiscoverGroups] = useState([]);

  useEffect(() => {
    if (nameQuery.length < 2) { setNameResults([]); return; }
    const timer = setTimeout(async () => {
      setNameSearching(true);
      try {
        const { data } = await supabase
          .from('recommendation_groups')
          .select('id, group_name, vibe, created_at')
          .ilike('group_name', `%${nameQuery}%`)
          .eq('is_active', true)
          .limit(10);
        setNameResults(data ?? []);
      } catch {
        setNameResults([]);
      } finally {
        setNameSearching(false);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [nameQuery]);

  useEffect(() => {
    supabase
      .from('recommendation_groups')
      .select('id, group_name, vibe, group_members(count)')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(6)
      .then(({ data }) => setDiscoverGroups(data ?? []));
  }, []);

  const onJoinByLink = async () => {
    if (!deepLink.trim() || joining) return;
    setJoining(true);
    setJoinError('');
    setJoinSuccess(null);
    try {
      const result = await joinGroupByLink(deepLink);
      setJoinSuccess(result.groupName ?? 'tu círculo');
      setDeepLink('');
    } catch (e) {
      setJoinError(e?.message || 'No se pudo unir al grupo');
    } finally {
      setJoining(false);
    }
  };

  async function handleSearch() {
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length < 4) { setCodeError('Enter at least 4 characters'); return; }
    setCodeError('');
    setSearching(true);
    try {
      const { data } = await supabase
        .from('recommendation_groups')
        .select('id, group_name, vibe')
        .eq('join_code', trimmed)
        .eq('is_active', true)
        .maybeSingle();
      if (data) { setFound(data); }
      else { setCodeError('No group found with that code. Check and try again.'); setFound(null); }
    } catch {
      setCodeError('Error searching. Try again.');
      setFound(null);
    } finally {
      setSearching(false);
    }
  }

  return (
    <Screen
      backgroundColor={colors.cream}
      footer={
        found ? (
          <RMButton
            title="Ver perfil del grupo →"
            variant="dark"
            onPress={() => navigation.navigate(routes.GroupPreview, { groupId: found.id })}
          />
        ) : null
      }
    >
      <TopBar title="Unirse a un círculo" onBack={() => navigation.goBack()} />

      <View style={styles.header}>
        <Text style={styles.kicker}>★ Find your people</Text>
        <Text style={styles.title}>
          Join a reading{'\n'}
          <Text style={styles.titleItalic}>circle</Text>
        </Text>
      </View>

      {/* Deep link join */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>GOT A LINK</Text>
        <Text style={styles.cardTitle}>Paste your invite link</Text>
        <View style={styles.linkRow}>
          <TextInput
            value={deepLink}
            onChangeText={(v) => { setDeepLink(v); setJoinError(''); setJoinSuccess(null); }}
            placeholder="readmatch://join/…"
            placeholderTextColor="rgba(22,16,46,0.3)"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.linkInput}
            onSubmitEditing={onJoinByLink}
          />
          {deepLink.length > 0 && (
            <Pressable onPress={() => { setDeepLink(''); setJoinError(''); setJoinSuccess(null); }} style={styles.clearBtn}>
              <Text style={styles.clearText}>✕</Text>
            </Pressable>
          )}
        </View>
        {joinError ? <Text style={styles.errText}>{joinError}</Text> : null}
        {joinSuccess ? (
          <View style={styles.successBox}>
            <Text style={styles.successText}>You joined {joinSuccess}! 🎉</Text>
            <Pressable onPress={() => navigation.navigate(routes.Home)} style={styles.goHome}>
              <Text style={styles.goHomeText}>Go to dashboard →</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={onJoinByLink}
            disabled={!deepLink.trim() || joining}
            style={[styles.joinBtn, (!deepLink.trim() || joining) && styles.joinBtnDisabled]}
          >
            <Text style={styles.joinBtnText}>{joining ? 'Joining…' : 'Join circle'}</Text>
          </Pressable>
        )}
      </View>

      {/* Search by name */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or search by name</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>GROUP NAME</Text>
        <View style={styles.nameInputRow}>
          <TextInput
            value={nameQuery}
            onChangeText={(v) => { setNameQuery(v); }}
            placeholder="Search circles by name…"
            placeholderTextColor="rgba(22,16,46,0.3)"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.nameInput}
          />
          {nameSearching && <ActivityIndicator size="small" color={colors.purple} />}
          {nameQuery.length > 0 && !nameSearching && (
            <Pressable onPress={() => { setNameQuery(''); setNameResults([]); }} style={styles.clearBtn}>
              <Text style={styles.clearText}>✕</Text>
            </Pressable>
          )}
        </View>
        {nameResults.length > 0 && (
          <View style={styles.nameResults}>
            {nameResults.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => navigation.navigate(routes.GroupPreview, { groupId: item.id })}
                style={styles.nameResultRow}
              >
                <View style={[styles.nameResultBadge, { backgroundColor: groupBadgeColor(item.id) }]}>
                  <Text style={styles.nameResultBadgeText}>{groupInitials(item.group_name)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.nameResultName}>{item.group_name}</Text>
                  {Array.isArray(item.vibe) && item.vibe.length > 0 && (
                    <View style={styles.vibeChipsRow}>
                      {item.vibe.slice(0, 3).map((v) => (
                        <View key={v} style={styles.vibeChip}>
                          <Text style={styles.vibeChipText}>{v}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
                <View style={styles.nameResultBtn}>
                  <Text style={styles.nameResultBtnText}>Ver grupo</Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}
        {nameQuery.length >= 2 && !nameSearching && nameResults.length === 0 && (
          <Text style={[styles.errText, { marginTop: 8 }]}>No circles found matching "{nameQuery}"</Text>
        )}
      </View>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or search by code</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Code input */}
      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>INVITE CODE</Text>
        <View style={styles.inputRow}>
          <TextInput
            value={code}
            onChangeText={(v) => { setCode(v.toUpperCase()); setFound(null); setCodeError(''); }}
            placeholder="e.g. RM-A3F7"
            placeholderTextColor="rgba(22,16,46,0.3)"
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={8}
            style={styles.codeInput}
            onSubmitEditing={handleSearch}
          />
          {code.length > 0 && (
            <Pressable onPress={() => { setCode(''); setFound(null); setCodeError(''); }} style={styles.clearBtn}>
              <Text style={styles.clearText}>✕</Text>
            </Pressable>
          )}
        </View>
        <View style={[styles.codeUnderline, code.length >= 4 && styles.codeUnderlineActive]} />
        {codeError ? <Text style={styles.errText}>{codeError}</Text> : null}
        <Pressable
          onPress={handleSearch}
          disabled={code.length < 4 || searching}
          style={[styles.joinBtn, (code.length < 4 || searching) && styles.joinBtnDisabled, { marginTop: 12 }]}
        >
          <Text style={styles.joinBtnText}>{searching ? 'Searching…' : 'Find group'}</Text>
        </Pressable>
      </View>

      {found && (
        <Pressable
          onPress={() => navigation.navigate(routes.GroupPreview, { groupId: found.id })}
          style={styles.foundCard}
        >
          <View style={[styles.foundBadge, { backgroundColor: groupBadgeColor(found.id) }]}>
            <Text style={styles.foundBadgeText}>{groupInitials(found.group_name)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.foundName}>{found.group_name}</Text>
            {Array.isArray(found.vibe) && found.vibe.length > 0 && (
              <View style={styles.vibeChipsRow}>
                {found.vibe.slice(0, 3).map((v) => (
                  <View key={v} style={styles.vibeChip}>
                    <Text style={styles.vibeChipText}>{v}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
          <View style={styles.previewBtn}>
            <Text style={styles.previewBtnText}>Ver →</Text>
          </View>
        </Pressable>
      )}

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or explore popular circles</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.browseList}>
        {discoverGroups.map((g) => {
          const memberCount = g.group_members?.[0]?.count ?? 0;
          const vibes = Array.isArray(g.vibe) ? g.vibe : [];
          const bg = groupBadgeColor(g.id);
          return (
            <Pressable key={g.id} onPress={() => navigation.navigate(routes.GroupPreview, { groupId: g.id })} style={styles.browseRow}>
              <View style={[styles.browseBadge, { backgroundColor: bg + '33' }]}>
                <Text style={[styles.browseBadgeText, { color: bg }]}>
                  {groupInitials(g.group_name)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.browseName}>{g.group_name}</Text>
                {vibes.length > 0 && (
                  <View style={styles.vibeChipsRow}>
                    {vibes.slice(0, 2).map((v) => (
                      <View key={v} style={styles.vibeChip}>
                        <Text style={styles.vibeChipText}>{v}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
              <View style={styles.browseMeta}>
                <Text style={styles.browseCount}>{memberCount} member{memberCount !== 1 ? 's' : ''}</Text>
                <View style={styles.browseArrow}>
                  <Text style={styles.browseArrowText}>›</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 22, paddingBottom: 20 },
  kicker: { fontSize: 10, fontWeight: '800', letterSpacing: 2, textTransform: 'uppercase', color: colors.purple, marginBottom: 8 },
  title: { fontSize: 38, fontWeight: '900', color: colors.ink, letterSpacing: -1, lineHeight: 40 },
  titleItalic: { fontStyle: 'italic', fontWeight: '400', color: colors.purple },
  card: { marginHorizontal: 22, marginBottom: 12, backgroundColor: colors.white, borderRadius: radii.xl, padding: 16, borderWidth: 1, borderColor: 'rgba(22,16,46,0.06)' },
  cardLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 1.6, textTransform: 'uppercase', color: 'rgba(22,16,46,0.45)', marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: '900', color: colors.ink, letterSpacing: -0.3, marginBottom: 12 },
  linkRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1.5, borderBottomColor: 'rgba(22,16,46,0.12)', marginBottom: 12 },
  linkInput: { flex: 1, fontSize: 14, fontWeight: '700', color: colors.ink, paddingVertical: 8, letterSpacing: 0.2 },
  clearBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(22,16,46,0.08)', alignItems: 'center', justifyContent: 'center' },
  clearText: { fontSize: 11, color: 'rgba(22,16,46,0.5)', fontWeight: '900' },
  errText: { fontSize: 12, fontWeight: '700', color: colors.coral, marginBottom: 8 },
  successBox: { backgroundColor: 'rgba(212,255,61,0.1)', borderRadius: radii.md, padding: 12, gap: 8 },
  successText: { fontSize: 13, fontWeight: '800', color: colors.ink },
  goHome: { alignSelf: 'flex-start' },
  goHomeText: { fontSize: 13, fontWeight: '800', color: colors.purple },
  joinBtn: { borderRadius: radii.pill, paddingVertical: 12, paddingHorizontal: 20, backgroundColor: colors.ink, alignItems: 'center' },
  joinBtnDisabled: { backgroundColor: 'rgba(22,16,46,0.2)' },
  joinBtnText: { fontSize: 14, fontWeight: '900', color: colors.cream },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: 22, marginVertical: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(22,16,46,0.1)' },
  dividerText: { fontSize: 10, fontWeight: '700', color: 'rgba(22,16,46,0.4)', letterSpacing: 0.4 },
  inputCard: { marginHorizontal: 22, marginBottom: 12 },
  inputLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 2, color: 'rgba(22,16,46,0.45)', marginBottom: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  codeInput: { flex: 1, fontSize: 32, fontWeight: '900', color: colors.ink, letterSpacing: 4, paddingVertical: 4 },
  codeUnderline: { height: 2, borderRadius: 1, backgroundColor: 'rgba(22,16,46,0.15)', marginTop: 6 },
  codeUnderlineActive: { backgroundColor: colors.purple },
  foundCard: { marginHorizontal: 22, marginBottom: 16, backgroundColor: colors.lime, borderRadius: radii.xl, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1.5, borderColor: colors.ink },
  foundBadge: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  foundBadgeText: { color: colors.ink, fontWeight: '900', fontSize: 16, letterSpacing: -0.5 },
  foundName: { fontSize: 16, fontWeight: '900', color: colors.ink, letterSpacing: -0.3 },
  foundMood: { fontSize: 11, fontWeight: '700', color: 'rgba(22,16,46,0.65)', marginTop: 2 },
  foundMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  foundAvatars: { flexDirection: 'row' },
  foundMembers: { fontSize: 11, fontWeight: '800', color: 'rgba(22,16,46,0.7)' },
  previewBtn: { borderRadius: radii.pill, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: colors.ink },
  previewBtnText: { color: colors.lime, fontWeight: '900', fontSize: 12 },
  browseList: { paddingHorizontal: 22, gap: 10 },
  browseRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: radii.lg, backgroundColor: colors.white, borderWidth: 1, borderColor: 'rgba(22,16,46,0.06)' },
  browseBadge: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  browseBadgeText: { fontWeight: '900', fontSize: 15, letterSpacing: -0.3 },
  browseName: { fontSize: 15, fontWeight: '900', color: colors.ink, letterSpacing: -0.2 },
  browseMood: { fontSize: 11, fontWeight: '700', color: 'rgba(22,16,46,0.55)', marginTop: 2 },
  browsePace: { fontSize: 10, fontWeight: '700', color: 'rgba(22,16,46,0.4)', marginTop: 2 },
  browseMeta: { alignItems: 'flex-end', gap: 6 },
  browseAvatars: { flexDirection: 'row' },
  browseCount: { fontSize: 10, fontWeight: '800', color: 'rgba(22,16,46,0.45)' },
  browseArrow: { width: 26, height: 26, borderRadius: 8, backgroundColor: colors.cream, alignItems: 'center', justifyContent: 'center' },
  browseArrowText: { fontSize: 18, fontWeight: '900', color: 'rgba(22,16,46,0.5)' },
  // Name search
  nameInputRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1.5, borderBottomColor: 'rgba(22,16,46,0.12)', paddingBottom: 6, gap: 8 },
  nameInput: { flex: 1, fontSize: 16, fontWeight: '700', color: colors.ink, paddingVertical: 4 },
  nameResults: { marginTop: 10, gap: 8 },
  nameResultRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: radii.lg, backgroundColor: colors.white, borderWidth: 1, borderColor: 'rgba(22,16,46,0.06)' },
  nameResultBadge: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  nameResultBadgeText: { color: colors.ink, fontWeight: '900', fontSize: 14, letterSpacing: -0.3 },
  nameResultName: { fontSize: 14, fontWeight: '900', color: colors.ink, letterSpacing: -0.2 },
  nameResultBtn: { borderRadius: radii.pill, paddingVertical: 6, paddingHorizontal: 10, backgroundColor: colors.ink },
  nameResultBtnText: { color: colors.cream, fontWeight: '900', fontSize: 11 },
  vibeChipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 },
  vibeChip: { borderRadius: radii.pill, paddingVertical: 2, paddingHorizontal: 7, backgroundColor: 'rgba(124,91,255,0.1)' },
  vibeChipText: { fontSize: 9, fontWeight: '800', color: colors.purple },
});
