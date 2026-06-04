import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '../components/Screen';
import { Avatar } from '../components/Avatar';
import { BookCover } from '../components/BookCover';
import { Ring } from '../components/Ring';
import { RMButton } from '../components/RMButton';
import { BOOKS, DISCOVERABLE_GROUPS, GROUPS, MEMBERS, MEMBER_PREFS } from '../data/sample';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

// Calcula la compatibilidad del usuario actual con el grupo
function calcCompatibility(group) {
  const myPrefs = MEMBER_PREFS['m1']; // usuario actual
  if (!myPrefs || !group.memberIds) return 72;

  const groupTags = group.memberIds.flatMap((id) => MEMBER_PREFS[id]?.tags ?? []);
  const overlap = myPrefs.tags.filter((t) => groupTags.includes(t)).length;
  const tagScore = Math.min(overlap / myPrefs.tags.length, 1) * 60;

  const groupDepths = group.memberIds.map((id) => MEMBER_PREFS[id]?.depth ?? 2);
  const avgDepth = groupDepths.reduce((a, b) => a + b, 0) / groupDepths.length;
  const depthScore = (1 - Math.abs(myPrefs.depth - avgDepth) / 4) * 40;

  return Math.round(tagScore + depthScore);
}

export function GroupPreviewScreen({ navigation, route }) {
  const { groupId } = route.params ?? {};
  const group =
    [...DISCOVERABLE_GROUPS, ...GROUPS].find((g) => g.id === groupId) ??
    DISCOVERABLE_GROUPS[0] ??
    GROUPS[0];
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  const currentBook = BOOKS.find((b) => b.id === group.currentBookId);
  const pastBooks = (group.pastBookIds ?? []).map((id) => BOOKS.find((b) => b.id === id)).filter(Boolean);
  const members = (group.memberIds ?? []).map((id) => MEMBERS.find((m) => m.id === id)).filter(Boolean);
  const compatibility = calcCompatibility(group);

  function handleJoin() {
    setJoining(true);
    setTimeout(() => {
      setJoining(false);
      setJoined(true);
    }, 1000);
  }

  if (joined) {
    return (
      <Screen
        backgroundColor={colors.ink}
        scroll={false}
        footer={<RMButton title="Go to Home →" variant="primary" onPress={() => navigation.navigate(routes.Home)} />}
      >
        <LinearGradient colors={['#2B1B69', '#16102E', '#1A1042']} style={styles.successBg}>
          <View style={styles.successContent}>
            <View style={[styles.successBadge, { backgroundColor: group.color }]}>
              <Text style={styles.successBadgeText}>{group.initials}</Text>
            </View>
            <Text style={styles.successTitle}>You're in!</Text>
            <Text style={styles.successSub}>
              Welcome to{' '}
              <Text style={{ color: group.color, fontWeight: '900' }}>{group.name}</Text>
              {'. '}Your first weekly recommendation drops next Monday.
            </Text>

            <View style={styles.successStats}>
              <View style={styles.successStat}>
                <Text style={styles.successStatValue}>{members.length + 1}</Text>
                <Text style={styles.successStatLabel}>Members</Text>
              </View>
              <View style={styles.successStatDivider} />
              <View style={styles.successStat}>
                <Text style={styles.successStatValue}>{group.stats.booksRead}</Text>
                <Text style={styles.successStatLabel}>Books read</Text>
              </View>
              <View style={styles.successStatDivider} />
              <View style={styles.successStat}>
                <Text style={[styles.successStatValue, { color: colors.lime }]}>{compatibility}%</Text>
                <Text style={styles.successStatLabel}>Your fit</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Screen>
    );
  }

  return (
    <Screen
      backgroundColor={colors.cream}
      footer={
        <RMButton
          title={joining ? 'Joining…' : `Join ${group.name} →`}
          variant="dark"
          onPress={handleJoin}
        />
      }
    >
      {/* Header */}
      <LinearGradient colors={['#2B1B69', '#16102E']} style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <View style={[styles.badge, { backgroundColor: group.color }]}>
          <Text style={styles.badgeText}>{group.initials}</Text>
        </View>
        <Text style={styles.groupName}>{group.name}</Text>
        <Text style={styles.groupMood}>{group.mood}</Text>
        <Text style={styles.groupDesc}>{group.description}</Text>

        <View style={styles.headerMeta}>
          <View style={styles.metaChip}>
            <Text style={styles.metaChipIcon}>◐</Text>
            <Text style={styles.metaChipText}>{group.pace}</Text>
          </View>
          <View style={styles.metaChip}>
            <Text style={styles.metaChipIcon}>✦</Text>
            <Text style={styles.metaChipText}>{group.commitment}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Your compatibility */}
      <View style={styles.compatRow}>
        <View style={styles.compatCard}>
          <Ring value={compatibility} size={72} stroke={7} color={compatibility >= 75 ? colors.lime : colors.coral} track="rgba(22,16,46,0.08)" textColor={colors.ink} />
          <View style={{ flex: 1 }}>
            <Text style={styles.compatTitle}>Your fit score</Text>
            <Text style={styles.compatSub}>
              {compatibility >= 80
                ? 'Excellent match — your tastes align strongly with this group.'
                : compatibility >= 65
                ? "Good match — you'll bring fresh perspective and find common ground."
                : "Interesting contrast — you'd add diversity to this circle."}
            </Text>
          </View>
        </View>
      </View>

      {/* Members */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Members</Text>
          <Text style={styles.sectionCount}>{members.length} readers</Text>
        </View>
        <View style={styles.membersList}>
          {members.map((m) => {
            const prefs = MEMBER_PREFS[m.id];
            const topTag = prefs?.tags?.[0] ?? 'reader';
            return (
              <View key={m.id} style={styles.memberRow}>
                <Avatar m={m} size={42} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.memberName}>{m.name}</Text>
                  <Text style={styles.memberType}>{m.tag}</Text>
                </View>
                <View style={[styles.memberTagBadge, { backgroundColor: m.hue === colors.cream ? colors.lavender : m.hue + '22' }]}>
                  <Text style={[styles.memberTagText, { color: m.hue === colors.cream ? colors.ink : m.hue }]}>
                    {topTag}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Currently reading */}
      {currentBook && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Currently reading</Text>
          <View style={styles.currentCard}>
            <BookCover book={currentBook} w={80} h={114} tilt={-2} />
            <View style={{ flex: 1 }}>
              <View style={styles.nowBadge}>
                <Text style={styles.nowBadgeText}>● READING NOW</Text>
              </View>
              <Text style={styles.currentTitle}>{currentBook.title}</Text>
              <Text style={styles.currentAuthor}>{currentBook.author}</Text>
              <Text style={styles.currentSummary} numberOfLines={3}>{currentBook.summary}</Text>
              <View style={styles.currentMeta}>
                <Text style={styles.currentMetaText}>{currentBook.pages} pages</Text>
                <Text style={styles.currentMetaDot}>·</Text>
                <Text style={styles.currentMetaText}>{currentBook.complexity} complexity</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Genre DNA */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Genre DNA</Text>
          <Text style={styles.sectionCount}>what they love</Text>
        </View>
        <View style={styles.genreList}>
          {(group.genreDNA ?? []).map((g, i) => (
            <View key={g.label} style={styles.genreRow}>
              <Text style={styles.genreLabel}>{g.label}</Text>
              <View style={styles.genreBarWrap}>
                <View style={[styles.genreBar, { width: `${g.pct}%`, backgroundColor: g.color }]} />
              </View>
              <Text style={styles.genrePct}>{g.pct}%</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Past reads */}
      {pastBooks.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Past reads</Text>
            <Text style={styles.sectionCount}>{group.stats.booksRead} total</Text>
          </View>
          <View style={styles.pastRow}>
            {pastBooks.map((b, i) => (
              <View key={b.id} style={styles.pastBook}>
                <BookCover book={b} w={72} h={102} tilt={i % 2 === 0 ? -1.5 : 1.5} />
                <Text style={styles.pastTitle} numberOfLines={2}>{b.title}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Group stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Group stats</Text>
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: colors.lime }]}>
            <Text style={styles.statValue}>{group.stats.booksRead}</Text>
            <Text style={styles.statLabel}>Books read</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.purple }]}>
            <Text style={[styles.statValue, { color: colors.cream }]}>{group.stats.diversity}</Text>
            <Text style={[styles.statLabel, { color: 'rgba(251,246,235,0.7)' }]}>Diversity</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.coral }]}>
            <Text style={styles.statValue}>{group.stats.avgRating}</Text>
            <Text style={styles.statLabel}>Avg rating</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.ink }]}>
            <Text style={[styles.statValue, { color: colors.lime }]}>{(group.stats.pages / 1000).toFixed(1)}k</Text>
            <Text style={[styles.statLabel, { color: 'rgba(251,246,235,0.7)' }]}>Pages</Text>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 56,
    paddingHorizontal: 22,
    paddingBottom: 28,
    alignItems: 'center',
    gap: 8,
  },
  back: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: { fontSize: 22, color: colors.cream, fontWeight: '900', marginTop: -2 },
  badge: { width: 72, height: 72, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  badgeText: { fontSize: 28, fontWeight: '900', color: colors.ink, letterSpacing: -0.5 },
  groupName: { fontSize: 30, fontWeight: '900', color: colors.cream, letterSpacing: -0.8, textAlign: 'center' },
  groupMood: { fontSize: 14, fontStyle: 'italic', color: 'rgba(251,246,235,0.65)', fontWeight: '600' },
  groupDesc: { fontSize: 14, color: 'rgba(251,246,235,0.8)', fontWeight: '600', lineHeight: 20, textAlign: 'center', paddingHorizontal: 8, marginTop: 6 },
  headerMeta: { flexDirection: 'row', gap: 10, marginTop: 14, flexWrap: 'wrap', justifyContent: 'center' },
  metaChip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: radii.pill, paddingVertical: 7, paddingHorizontal: 12, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.18)' },
  metaChipIcon: { fontSize: 12, color: colors.lime },
  metaChipText: { fontSize: 12, fontWeight: '700', color: colors.cream },
  compatRow: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 4 },
  compatCard: { flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: colors.white, borderRadius: radii.xl, padding: 16, borderWidth: 1, borderColor: 'rgba(22,16,46,0.06)' },
  compatTitle: { fontSize: 15, fontWeight: '900', color: colors.ink, marginBottom: 6 },
  compatSub: { fontSize: 13, color: 'rgba(22,16,46,0.65)', fontWeight: '600', lineHeight: 18 },
  section: { paddingHorizontal: 22, paddingTop: 24 },
  sectionHead: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: colors.ink, letterSpacing: -0.3 },
  sectionCount: { fontSize: 11, fontWeight: '700', color: 'rgba(22,16,46,0.45)', letterSpacing: 0.4 },
  membersList: { gap: 10 },
  memberRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.white, borderRadius: radii.lg, padding: 12, borderWidth: 1, borderColor: 'rgba(22,16,46,0.05)' },
  memberName: { fontSize: 15, fontWeight: '900', color: colors.ink, letterSpacing: -0.2 },
  memberType: { fontSize: 11, fontWeight: '700', color: 'rgba(22,16,46,0.55)', marginTop: 2 },
  memberTagBadge: { borderRadius: radii.pill, paddingVertical: 5, paddingHorizontal: 10 },
  memberTagText: { fontSize: 11, fontWeight: '800', letterSpacing: 0.2 },
  currentCard: { flexDirection: 'row', gap: 16, backgroundColor: colors.white, borderRadius: radii.xl, padding: 16, borderWidth: 1, borderColor: 'rgba(22,16,46,0.06)' },
  nowBadge: { borderRadius: 6, paddingVertical: 3, paddingHorizontal: 8, backgroundColor: '#E8F8D5', alignSelf: 'flex-start', marginBottom: 8 },
  nowBadgeText: { fontSize: 9, fontWeight: '900', color: '#3F6E12', letterSpacing: 0.8 },
  currentTitle: { fontSize: 17, fontWeight: '900', color: colors.ink, letterSpacing: -0.3, lineHeight: 20 },
  currentAuthor: { fontSize: 13, fontStyle: 'italic', color: 'rgba(22,16,46,0.65)', fontWeight: '600', marginTop: 4 },
  currentSummary: { fontSize: 12, color: 'rgba(22,16,46,0.6)', fontWeight: '600', lineHeight: 17, marginTop: 8 },
  currentMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  currentMetaText: { fontSize: 11, fontWeight: '800', color: 'rgba(22,16,46,0.5)' },
  currentMetaDot: { color: 'rgba(22,16,46,0.3)', fontWeight: '900' },
  genreList: { gap: 12 },
  genreRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  genreLabel: { width: 120, fontSize: 13, fontWeight: '800', color: colors.ink },
  genreBarWrap: { flex: 1, height: 10, borderRadius: 5, backgroundColor: 'rgba(22,16,46,0.06)', overflow: 'hidden' },
  genreBar: { height: '100%', borderRadius: 5 },
  genrePct: { width: 36, fontSize: 12, fontWeight: '900', color: 'rgba(22,16,46,0.55)', textAlign: 'right' },
  pastRow: { flexDirection: 'row', gap: 14 },
  pastBook: { alignItems: 'center', gap: 8, width: 72 },
  pastTitle: { fontSize: 11, fontWeight: '700', color: colors.ink, textAlign: 'center', lineHeight: 14 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingBottom: 16 },
  statCard: { width: '47%', borderRadius: radii.lg, padding: 16 },
  statValue: { fontSize: 28, fontWeight: '900', color: colors.ink, letterSpacing: -0.8 },
  statLabel: { fontSize: 11, fontWeight: '800', color: 'rgba(22,16,46,0.6)', marginTop: 4, letterSpacing: 0.2 },
  successBg: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  successContent: { alignItems: 'center', width: '100%' },
  successBadge: { width: 80, height: 80, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  successBadgeText: { fontSize: 32, fontWeight: '900', color: colors.ink },
  successTitle: { fontSize: 44, fontWeight: '900', color: colors.cream, letterSpacing: -1, marginBottom: 12 },
  successSub: { fontSize: 16, color: 'rgba(251,246,235,0.75)', fontWeight: '600', textAlign: 'center', lineHeight: 24 },
  successStats: { flexDirection: 'row', alignItems: 'center', marginTop: 36, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: radii.xl, padding: 20, width: '100%', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.14)' },
  successStat: { flex: 1, alignItems: 'center' },
  successStatValue: { fontSize: 28, fontWeight: '900', color: colors.cream, letterSpacing: -0.8 },
  successStatLabel: { fontSize: 10, fontWeight: '800', color: 'rgba(251,246,235,0.5)', textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 },
  successStatDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.14)' },
});
