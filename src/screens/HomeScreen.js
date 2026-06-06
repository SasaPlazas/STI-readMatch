import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Screen } from '../components/Screen';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

const BADGE_COLORS = [
  colors.purple, colors.coral, colors.lavender,
  colors.violet, colors.lime, colors.beige,
];

function strHash(s = '') {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function groupInitials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0] ?? '').join('').toUpperCase() || '?';
}

function groupBadgeColor(id = '') {
  return BADGE_COLORS[strHash(id) % BADGE_COLORS.length];
}

function GroupCard({ group, onPress }) {
  const vibes = Array.isArray(group.vibe) ? group.vibe : [];
  const bg = groupBadgeColor(group.id);
  const darkBg = bg === colors.purple || bg === colors.violet;

  return (
    <Pressable onPress={onPress} style={styles.circleCard}>
      <View style={[styles.circleBadge, { backgroundColor: bg }]}>
        <Text style={[styles.circleBadgeText, darkBg && { color: colors.cream }]}>
          {groupInitials(group.group_name)}
        </Text>
      </View>

      <View style={styles.circleInfo}>
        <Text style={styles.circleName} numberOfLines={1}>{group.group_name}</Text>

        {vibes.length > 0 && (
          <View style={styles.vibeRow}>
            {vibes.slice(0, 3).map(v => (
              <View key={v} style={styles.vibePill}>
                <Text style={styles.vibePillText}>{v}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.metaRow}>
          <Text style={styles.circleMeta}>
            {group.memberCount ?? 1} member{(group.memberCount ?? 1) !== 1 ? 's' : ''}
          </Text>
          {group.telegram_chat_id ? (
            <View style={styles.tgBadge}>
              <Text style={styles.tgText}>TG</Text>
            </View>
          ) : null}
        </View>
      </View>

      <Text style={styles.circleArrow}>›</Text>
    </Pressable>
  );
}

function EmptyState({ tab, navigation }) {
  if (tab === 0) {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyIcon}>✦</Text>
        <Text style={styles.emptyText}>You haven't created any circles yet</Text>
        <Pressable
          onPress={() => navigation.navigate(routes.CreateGroup)}
          style={styles.emptyBtn}
        >
          <Text style={styles.emptyBtnText}>Create a circle</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.emptyBox}>
      <Text style={styles.emptyIcon}>◎</Text>
      <Text style={styles.emptyText}>You haven't joined any circles yet</Text>
      <Pressable
        onPress={() => navigation.navigate(routes.JoinGroup)}
        style={styles.emptyBtn}
      >
        <Text style={styles.emptyBtnText}>Join with a link</Text>
      </Pressable>
    </View>
  );
}

const TABS = ['My circles', 'Joined'];

export function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');

  const loadGroups = useCallback(async () => {
    if (!user?.id) return;
    setLoadingGroups(true);
    try {
      const { data, error } = await supabase
        .from('group_members')
        .select(`
          group_id,
          role,
          recommendation_groups (
            id,
            group_name,
            vibe,
            created_by,
            is_active,
            telegram_chat_id
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const valid = (data ?? [])
        .filter(r => r.recommendation_groups?.is_active)
        .map(r => ({ ...r.recommendation_groups, myRole: r.role }));

      // Intentar contar miembros por grupo (depende de RLS)
      const ids = valid.map(g => g.id);
      let counts = {};
      if (ids.length > 0) {
        const { data: md } = await supabase
          .from('group_members')
          .select('group_id')
          .in('group_id', ids);
        (md ?? []).forEach(m => {
          counts[m.group_id] = (counts[m.group_id] ?? 0) + 1;
        });
      }

      setGroups(valid.map(g => ({ ...g, memberCount: counts[g.id] ?? 1 })));
    } catch (e) {
      console.warn('loadGroups error:', e.message);
    } finally {
      setLoadingGroups(false);
    }
  }, [user?.id]);

  useFocusEffect(useCallback(() => {
    loadGroups();
  }, [loadGroups]));

  const displayName = user?.name ?? 'Reader';
  const createdByMe = groups.filter(g => g.created_by === user?.id);
  const joinedGroups = groups.filter(g => g.created_by !== user?.id);
  const activeList = activeTab === 0 ? createdByMe : joinedGroups;
  const filtered = search.trim()
    ? activeList.filter(g => g.group_name?.toLowerCase().includes(search.toLowerCase()))
    : activeList;

  return (
    <Screen backgroundColor={colors.cream}>
      {/* ── Header ── */}
      <View style={styles.top}>
        <View style={{ flex: 1 }}>
          <Text style={styles.kicker}>ReadMatch</Text>
          <Text style={styles.h1}>Hey, {displayName} ✦</Text>
        </View>
      </View>

      {/* ── Barra de búsqueda ── */}
      <View style={styles.searchWrap}>
        <View style={styles.searchIcon}>
          <Text style={styles.searchIconText}>⌕</Text>
        </View>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search circles..."
          placeholderTextColor="rgba(22,16,46,0.35)"
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>

      {/* ── Tabs ── */}
      <View style={styles.tabs}>
        {TABS.map((tab, i) => (
          <Pressable
            key={tab}
            onPress={() => { setActiveTab(i); setSearch(''); }}
            style={[styles.tab, activeTab === i && styles.tabActive]}
          >
            <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* ── Lista ── */}
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {loadingGroups ? (
          <ActivityIndicator color={colors.purple} style={{ marginTop: 48 }} />
        ) : filtered.length === 0 ? (
          <EmptyState tab={activeTab} navigation={navigation} />
        ) : (
          filtered.map(g => (
            <GroupCard
              key={g.id}
              group={g}
              onPress={() => navigation.navigate(routes.GroupDetail, { groupId: g.id })}
            />
          ))
        )}

        {/* Acciones siempre visibles al final */}
        {!loadingGroups && (
          <View style={styles.actionCards}>
            <Pressable
              onPress={() => navigation.navigate(routes.CreateGroup)}
              style={styles.createCard}
            >
              <View style={styles.createIcon}>
                <Text style={styles.createIconText}>✦</Text>
              </View>
              <Text style={styles.createText}>Create a circle</Text>
              <Text style={styles.circleArrow}>›</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate(routes.JoinGroup)}
              style={styles.joinCard}
            >
              <View style={styles.joinIcon}>
                <Text style={styles.joinIconText}>◎</Text>
              </View>
              <Text style={styles.joinText}>Join a circle</Text>
              <Text style={styles.circleArrow}>›</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: {
    paddingTop: 26,
    paddingHorizontal: 22,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  kicker: {
    fontSize: 11,
    color: 'rgba(22,16,46,0.5)',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  h1: {
    marginTop: 4,
    fontSize: 32,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.8,
  },

  // Search
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 22,
    marginBottom: 14,
    backgroundColor: colors.white,
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.08)',
    gap: 8,
  },
  searchIcon: { width: 20, alignItems: 'center' },
  searchIconText: { fontSize: 18, color: 'rgba(22,16,46,0.35)', fontWeight: '700' },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.ink,
    padding: 0,
  },

  // Tabs
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 22,
    marginBottom: 16,
    backgroundColor: 'rgba(22,16,46,0.06)',
    borderRadius: radii.pill,
    padding: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: radii.pill,
  },
  tabActive: {
    backgroundColor: colors.ink,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '800',
    color: 'rgba(22,16,46,0.5)',
    letterSpacing: 0.2,
  },
  tabTextActive: {
    color: colors.cream,
  },

  // List
  list: {
    paddingHorizontal: 22,
    paddingBottom: 40,
    gap: 10,
  },

  // Group card
  circleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  circleBadge: {
    width: 48,
    height: 48,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  circleBadgeText: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 17,
    letterSpacing: -0.4,
  },
  circleInfo: { flex: 1, gap: 4 },
  circleName: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  vibeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  vibePill: {
    borderRadius: radii.pill,
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: colors.mist,
  },
  vibePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.purple,
    letterSpacing: 0.2,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  circleMeta: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(22,16,46,0.5)',
  },
  tgBadge: {
    borderRadius: radii.pill,
    paddingVertical: 2,
    paddingHorizontal: 7,
    backgroundColor: 'rgba(41,182,246,0.15)',
  },
  tgText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#0288D1',
    letterSpacing: 0.5,
  },
  circleArrow: {
    fontSize: 22,
    fontWeight: '900',
    color: 'rgba(22,16,46,0.3)',
    flexShrink: 0,
  },

  // Empty state
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  emptyIcon: {
    fontSize: 32,
    color: 'rgba(22,16,46,0.2)',
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'rgba(22,16,46,0.45)',
    textAlign: 'center',
  },
  emptyBtn: {
    marginTop: 4,
    borderRadius: radii.pill,
    paddingVertical: 11,
    paddingHorizontal: 24,
    backgroundColor: colors.ink,
  },
  emptyBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.cream,
  },

  // Action cards
  actionCards: { gap: 10, marginTop: 4 },
  createCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.ink,
    borderRadius: radii.xl,
    padding: 14,
  },
  createIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  createIconText: { fontSize: 20, color: colors.ink, fontWeight: '900' },
  createText: { flex: 1, fontSize: 15, fontWeight: '800', color: colors.cream },
  joinCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.cream,
    borderRadius: radii.xl,
    padding: 14,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(22,16,46,0.2)',
  },
  joinIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: colors.mist,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  joinIconText: { fontSize: 22, color: colors.purple },
  joinText: { flex: 1, fontSize: 15, fontWeight: '800', color: 'rgba(22,16,46,0.55)' },
});
