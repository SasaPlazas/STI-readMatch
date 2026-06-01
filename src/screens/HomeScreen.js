import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { BookCover } from '../components/BookCover';
import { Pill } from '../components/Pill';
import { Ring } from '../components/Ring';
import { Screen } from '../components/Screen';
import { RMButton } from '../components/RMButton';
import { useAuth } from '../context/AuthContext';
import { BOOKS, GROUPS, MEMBERS } from '../data/sample';
import { getGroupRecommendations } from '../utils/recommendations';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [activeGroupId, setActiveGroupId] = useState(GROUPS[0].id);

  const activeGroup = GROUPS.find((g) => g.id === activeGroupId) ?? GROUPS[0];
  const groupMembers = activeGroup.memberIds.map((id) => MEMBERS.find((m) => m.id === id)).filter(Boolean);

  // Recomendaciones auto-generadas para el grupo activo
  const recs = getGroupRecommendations(activeGroupId, 3);
  const topRec = recs[0];
  const topBook = topRec?.book ?? BOOKS[1];
  const topScore = topRec?.score ?? 89;
  const topReasons = topRec?.reasons ?? [];

  // Feed consolidado de TODOS los grupos
  const allActivities = GROUPS.flatMap((g) =>
    g.activities.map((a) => ({ ...a, groupName: g.name, groupColor: g.color }))
  ).sort(() => Math.random() - 0.5).slice(0, 6);

  const displayName = user?.name ?? 'Maya';

  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>
      {/* Top bar */}
      <View style={styles.top}>
        <View style={{ flex: 1 }}>
          <Text style={styles.kicker}>Tuesday · 8:42</Text>
          <Text style={styles.h1}>Hey, {displayName} ✦</Text>
        </View>
        <Pressable onPress={() => navigation.navigate(routes.Personality)}>
          <Avatar m={MEMBERS[0]} size={44} />
        </Pressable>
      </View>

      {/* Group selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.groupScroll} contentContainerStyle={styles.groupScrollContent}>
        {GROUPS.map((g) => {
          const active = g.id === activeGroupId;
          return (
            <Pressable
              key={g.id}
              onPress={() => setActiveGroupId(g.id)}
              style={[styles.groupPill, active && { backgroundColor: g.color, borderColor: colors.ink, borderWidth: 1.5 }]}
            >
              <View style={[styles.groupPillDot, { backgroundColor: active ? colors.ink : g.color }]} />
              <Text style={[styles.groupPillText, active && { fontWeight: '900' }]}>{g.name}</Text>
            </Pressable>
          );
        })}
        <Pressable onPress={() => navigation.navigate(routes.CreateGroup)} style={styles.groupPillAdd}>
          <Text style={styles.groupPillAddText}>+ New</Text>
        </Pressable>
      </ScrollView>

      {/* Members of active group */}
      <View style={styles.memberRow}>
        <Text style={styles.memberLabel}>Reading with</Text>
        <View style={styles.avatars}>
          {groupMembers.slice(0, 5).map((m, i) => (
            <View key={m.id} style={{ marginLeft: i === 0 ? 0 : -8 }}>
              <Avatar m={m} size={26} />
            </View>
          ))}
        </View>
        <Pill label={`${activeGroup.name} · ${groupMembers.length}`} tone="ink" />
      </View>

      {/* Hero — weekly auto-recommendation */}
      <View style={styles.heroWrap}>
        <LinearGradient colors={[colors.violet, colors.ink, colors.violet2]} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }} style={styles.hero}>
          <View style={styles.heroTags}>
            <Pill label="★ This week's match" tone="lime" />
            <Pill label="AUTO-GENERATED" tone="glass" />
          </View>

          <View style={styles.heroRow}>
            <Pressable onPress={() => navigation.navigate(routes.Book)}>
              <BookCover book={topBook} w={120} h={170} tilt={-3} />
            </Pressable>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <Ring value={topScore} size={62} stroke={6} color={colors.lime} textColor={colors.cream} />
              <View>
                <Text style={styles.heroTitle}>{topBook.title}</Text>
                <Text style={styles.heroAuthor}>{topBook.author}</Text>
              </View>
            </View>
          </View>

          <View style={styles.why}>
            <View style={styles.whyHeader}>
              <View style={styles.spark}><Text style={styles.sparkText}>✦</Text></View>
              <Text style={styles.whyKicker}>Why this matches</Text>
            </View>
            <Text style={styles.whyText}>
              {topReasons.length > 0
                ? topReasons.join(' · ')
                : `Top match for ${activeGroup.name} this week.`}
            </Text>
          </View>

          <View style={styles.heroActions}>
            <RMButton title="I'm in →" onPress={() => navigation.navigate(routes.Vote)} style={{ flex: 1, height: 48 }} />
            <RMButton title="See alternates" variant="ghost" onPress={() => navigation.navigate(routes.Compatibility)} style={[{ flex: 1, height: 48 }, styles.heroAlt]} />
          </View>
        </LinearGradient>
      </View>

      {/* Top 3 auto-ranked */}
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Top 3 this week</Text>
        <Text style={styles.sectionSub}>RANKED BY GROUP MATCH</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rankScroll} contentContainerStyle={styles.rankScrollContent}>
        {recs.map((rec) => (
          <Pressable key={rec.book.id} onPress={() => navigation.navigate(routes.Book)} style={styles.rankCard}>
            <BookCover book={rec.book} w={70} h={100} tilt={0} />
            <View style={styles.rankMeta}>
              <Text style={styles.rankNum}>#{rec.rank}</Text>
              <Text style={styles.rankScore}>{rec.score}%</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Telegram */}
      <Pressable onPress={() => navigation.navigate(routes.Telegram)} style={styles.tgCard}>
        <View style={styles.tgIcon}><Text style={styles.tgIconText}>↗</Text></View>
        <View style={{ flex: 1 }}>
          <View style={styles.tgTitleRow}>
            <Text style={styles.tgTitle}>Telegram mirror</Text>
            <View style={styles.tgLive}><Text style={styles.tgLiveText}>● LIVE</Text></View>
          </View>
          <Text style={styles.tgSub}>3 new votes · synced 6m ago</Text>
        </View>
        <View style={styles.tgOpen}><Text style={styles.tgOpenText}>Open ↗</Text></View>
      </Pressable>

      {/* Stats */}
      <View style={styles.statsHeader}>
        <Text style={styles.statsTitle}>This week, together</Text>
        <Text style={styles.statsLive}>LIVE</Text>
      </View>
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: colors.lime }]}>
          <Text style={[styles.statKicker, { color: 'rgba(22,16,46,0.7)' }]}>Group mood</Text>
          <Text style={[styles.statBig, { color: colors.ink }]}>{activeGroup.stats.mood}</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.coral }]}>
          <Text style={[styles.statKicker, { color: 'rgba(22,16,46,0.65)' }]}>Pages read</Text>
          <Text style={[styles.statNum, { color: colors.ink }]}>{activeGroup.stats.pages.toLocaleString()}</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.ink }]}>
          <Text style={[styles.statKicker, { color: 'rgba(251,246,235,0.55)' }]}>Diversity</Text>
          <Text style={[styles.statNum, { color: colors.lime }]}>{activeGroup.stats.diversity}</Text>
        </View>
      </View>

      {/* Activity feed — ALL groups */}
      <View style={styles.activityHeader}>
        <Text style={styles.activityTitle}>All groups · activity</Text>
      </View>
      <View style={styles.feed}>
        {allActivities.map((a, i) => (
          <Pressable key={i} onPress={() => navigation.navigate(a.screen)} style={styles.feedRow}>
            <Avatar m={a.who} size={36} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={styles.feedText} numberOfLines={2}>
                <Text style={{ fontWeight: '900' }}>{a.who.name}</Text>{' '}
                {a.action}{' '}
                <Text style={{ color: colors.inkSoft }}>{a.target}</Text>
              </Text>
              <View style={styles.feedBottom}>
                <Text style={styles.feedMeta}>{a.meta} ago</Text>
                <View style={[styles.feedGroup, { backgroundColor: a.groupColor + '22' }]}>
                  <Text style={[styles.feedGroupText, { color: a.groupColor === colors.cream ? colors.ink : a.groupColor }]}>{a.groupName}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.feedIcon, { backgroundColor: a.tone }]}>
              <Text style={styles.feedIconText}>{a.icon}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      {/* Your circles */}
      <View style={styles.circlesHeader}>
        <Text style={styles.circlesTitle}>Your reading circles</Text>
        <Pressable onPress={() => navigation.navigate(routes.GroupSettings)}>
          <Text style={styles.circlesManage}>Manage ›</Text>
        </Pressable>
      </View>

      {GROUPS.map((g) => (
        <Pressable key={g.id} onPress={() => { setActiveGroupId(g.id); navigation.navigate(routes.GroupSettings); }} style={styles.groupCard}>
          <View style={[styles.groupCardBadge, { backgroundColor: g.color }]}>
            <Text style={styles.groupCardBadgeText}>{g.initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.groupCardName}>{g.name}</Text>
            <Text style={styles.groupCardMood}>{g.mood} · {g.memberIds.length} members</Text>
          </View>
          <View style={styles.groupCardAvatars}>
            {g.memberIds.slice(0, 3).map((id, i) => {
              const m = MEMBERS.find((mem) => mem.id === id);
              return m ? <View key={id} style={{ marginLeft: i === 0 ? 0 : -8 }}><Avatar m={m} size={24} /></View> : null;
            })}
          </View>
        </Pressable>
      ))}

      <View style={styles.circleActions}>
        <Pressable onPress={() => navigation.navigate(routes.CreateGroup)} style={styles.circleActionCreate}>
          <View style={styles.circleActionIcon}><Text style={styles.circleActionIconText}>+</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.circleActionTitle}>Create a circle</Text>
            <Text style={styles.circleActionSub}>Start fresh with your people</Text>
          </View>
          <Text style={styles.circleActionArrow}>→</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(routes.JoinGroup)} style={styles.circleActionJoin}>
          <View style={[styles.circleActionIcon, { backgroundColor: colors.purple }]}><Text style={styles.circleActionIconText}>◎</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.circleActionTitle}>Join a circle</Text>
            <Text style={styles.circleActionSub}>Enter an invite code</Text>
          </View>
          <Text style={styles.circleActionArrow}>→</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 40 },
  top: { paddingTop: 26, paddingHorizontal: 22, flexDirection: 'row', alignItems: 'center', gap: 12, paddingBottom: 16 },
  kicker: { fontSize: 11, color: 'rgba(22,16,46,0.5)', letterSpacing: 1.6, textTransform: 'uppercase', fontWeight: '700' },
  h1: { marginTop: 4, fontSize: 32, fontWeight: '900', color: colors.ink, letterSpacing: -0.8 },
  groupScroll: { marginBottom: 12 },
  groupScrollContent: { paddingHorizontal: 22, gap: 8 },
  groupPill: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: radii.pill, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: colors.white, borderWidth: 1, borderColor: 'rgba(22,16,46,0.1)' },
  groupPillDot: { width: 8, height: 8, borderRadius: 4 },
  groupPillText: { fontSize: 13, fontWeight: '700', color: colors.ink },
  groupPillAdd: { borderRadius: radii.pill, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: colors.cream, borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(22,16,46,0.2)' },
  groupPillAddText: { fontSize: 13, fontWeight: '800', color: 'rgba(22,16,46,0.5)' },
  memberRow: { paddingHorizontal: 22, paddingBottom: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  memberLabel: { fontSize: 11, color: 'rgba(22,16,46,0.5)', letterSpacing: 1.4, textTransform: 'uppercase', fontWeight: '700' },
  avatars: { flexDirection: 'row' },
  heroWrap: { paddingHorizontal: 22 },
  hero: { borderRadius: 28, padding: 18, overflow: 'hidden' },
  heroTags: { flexDirection: 'row', gap: 8 },
  heroRow: { flexDirection: 'row', gap: 16, marginTop: 18 },
  heroTitle: { fontSize: 22, fontWeight: '900', color: colors.cream, lineHeight: 24, letterSpacing: -0.5 },
  heroAuthor: { marginTop: 6, color: 'rgba(251,246,235,0.75)', fontStyle: 'italic', fontWeight: '600' },
  why: { marginTop: 14, padding: 14, borderRadius: radii.md, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)' },
  whyHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  spark: { width: 22, height: 22, borderRadius: 6, backgroundColor: colors.lime, alignItems: 'center', justifyContent: 'center' },
  sparkText: { color: colors.ink, fontWeight: '900' },
  whyKicker: { color: colors.lime, letterSpacing: 1.4, textTransform: 'uppercase', fontSize: 11, fontWeight: '800' },
  whyText: { color: 'rgba(251,246,235,0.92)', fontSize: 13, lineHeight: 18, fontWeight: '600' },
  heroActions: { flexDirection: 'row', gap: 10, marginTop: 12 },
  heroAlt: { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.25)' },
  sectionHead: { paddingHorizontal: 22, paddingTop: 20, paddingBottom: 12, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: colors.ink, letterSpacing: -0.3 },
  sectionSub: { fontSize: 9, fontWeight: '800', color: 'rgba(22,16,46,0.4)', letterSpacing: 1.2, textTransform: 'uppercase' },
  rankScroll: { marginBottom: 4 },
  rankScrollContent: { paddingHorizontal: 22, gap: 12 },
  rankCard: { alignItems: 'center', gap: 8 },
  rankMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rankNum: { fontSize: 12, fontWeight: '900', color: 'rgba(22,16,46,0.4)' },
  rankScore: { fontSize: 13, fontWeight: '900', color: colors.purple },
  tgCard: { marginTop: 14, marginHorizontal: 22, backgroundColor: colors.white, borderRadius: radii.lg, padding: 14, borderWidth: 1, borderColor: 'rgba(22,16,46,0.06)', flexDirection: 'row', alignItems: 'center', gap: 12 },
  tgIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  tgIconText: { color: colors.lime, fontWeight: '900' },
  tgTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tgTitle: { fontWeight: '900', color: colors.ink },
  tgLive: { paddingVertical: 2, paddingHorizontal: 8, borderRadius: 8, backgroundColor: '#E8F8D5' },
  tgLiveText: { color: '#3F6E12', fontSize: 9, fontWeight: '900', letterSpacing: 0.6 },
  tgSub: { marginTop: 4, fontSize: 10, letterSpacing: 0.8, color: 'rgba(22,16,46,0.5)', fontWeight: '700' },
  tgOpen: { paddingVertical: 7, paddingHorizontal: 11, borderRadius: 999, backgroundColor: colors.lime },
  tgOpenText: { color: colors.ink, fontWeight: '900', fontSize: 11 },
  statsHeader: { marginTop: 20, paddingHorizontal: 22, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 },
  statsTitle: { fontSize: 22, fontWeight: '900', color: colors.ink, letterSpacing: -0.3 },
  statsLive: { fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: 'rgba(22,16,46,0.45)', fontWeight: '800' },
  statsGrid: { paddingHorizontal: 22, gap: 10 },
  statCard: { borderRadius: radii.lg, padding: 16 },
  statKicker: { fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', fontWeight: '800' },
  statBig: { marginTop: 10, fontSize: 20, fontWeight: '900', letterSpacing: -0.6, lineHeight: 24 },
  statNum: { marginTop: 8, fontSize: 30, fontWeight: '900', letterSpacing: -0.8 },
  activityHeader: { paddingHorizontal: 22, paddingTop: 20, paddingBottom: 12 },
  activityTitle: { fontSize: 20, fontWeight: '900', color: colors.ink, letterSpacing: -0.3 },
  feed: { paddingHorizontal: 22, gap: 10 },
  feedRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: radii.md, backgroundColor: colors.white, borderWidth: 1, borderColor: 'rgba(22,16,46,0.05)' },
  feedText: { fontSize: 13, color: colors.ink, lineHeight: 17 },
  feedBottom: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  feedMeta: { fontSize: 10, color: 'rgba(22,16,46,0.45)', letterSpacing: 0.8, fontWeight: '700' },
  feedGroup: { borderRadius: 6, paddingVertical: 2, paddingHorizontal: 6 },
  feedGroupText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.4 },
  feedIcon: { width: 30, height: 30, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  feedIconText: { fontWeight: '900', color: colors.ink },
  circlesHeader: { paddingHorizontal: 22, paddingTop: 28, paddingBottom: 12, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
  circlesTitle: { fontSize: 20, fontWeight: '900', color: colors.ink, letterSpacing: -0.3 },
  circlesManage: { fontSize: 13, fontWeight: '800', color: colors.purple },
  groupCard: { marginHorizontal: 22, marginBottom: 10, backgroundColor: colors.white, borderRadius: radii.lg, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: 'rgba(22,16,46,0.06)' },
  groupCardBadge: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  groupCardBadgeText: { color: colors.white, fontWeight: '900', fontSize: 15, letterSpacing: -0.3 },
  groupCardName: { fontSize: 15, fontWeight: '900', color: colors.ink, letterSpacing: -0.2 },
  groupCardMood: { fontSize: 11, fontWeight: '700', color: 'rgba(22,16,46,0.55)', marginTop: 2 },
  groupCardAvatars: { flexDirection: 'row' },
  circleActions: { paddingHorizontal: 22, gap: 10, paddingBottom: 16 },
  circleActionCreate: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.lime, borderRadius: radii.lg, padding: 16, borderWidth: 1.5, borderColor: colors.ink },
  circleActionJoin: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.white, borderRadius: radii.lg, padding: 16, borderWidth: 1, borderColor: 'rgba(22,16,46,0.08)' },
  circleActionIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  circleActionIconText: { fontSize: 18, fontWeight: '900', color: colors.lime },
  circleActionTitle: { fontSize: 15, fontWeight: '900', color: colors.ink, letterSpacing: -0.2 },
  circleActionSub: { fontSize: 11, fontWeight: '700', color: 'rgba(22,16,46,0.55)', marginTop: 2 },
  circleActionArrow: { fontSize: 18, fontWeight: '900', color: 'rgba(22,16,46,0.4)' },
});
