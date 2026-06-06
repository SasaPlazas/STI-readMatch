import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { BookCover } from '../components/BookCover';
import { Pill } from '../components/Pill';
import { Ring } from '../components/Ring';
import { Screen } from '../components/Screen';
import { useAuth } from '../context/AuthContext';
import { BOOKS, GROUPS, MEMBERS } from '../data/sample';
import { getGroupRecommendations } from '../utils/recommendations';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

// Simula si un grupo tiene novedades (en producción vendría del backend)
const GROUP_UPDATES = { g1: 3, g2: 1, g3: 0 };

export function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const displayName = user?.name ?? 'Maya';

  // Usamos el primer grupo como el activo para el hero
  const heroGroup = GROUPS[0];
  const recs = getGroupRecommendations(heroGroup.id, 1);
  const topRec = recs[0];
  const topBook = topRec?.book ?? BOOKS[1];
  const topScore = topRec?.score ?? 89;
  const topReasons = topRec?.reasons ?? [];

  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>

      {/* ── Header ── */}
      <View style={styles.top}>
        <View style={{ flex: 1 }}>
          <Text style={styles.kicker}>Tuesday · 8:42</Text>
          <Text style={styles.h1}>Hey, {displayName} ✦</Text>
        </View>
        <Pressable onPress={() => navigation.navigate(routes.Personality)}>
          <Avatar m={MEMBERS[0]} size={44} />
        </Pressable>
      </View>

      {/* ── Hero: this week's top pick ── */}
      <View style={styles.heroWrap}>
        <LinearGradient
          colors={[colors.violet, colors.ink, colors.violet2]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroTags}>
            <Pill label={`★ ${heroGroup.name} · this week`} tone="lime" />
            <Pill label="AUTO-GENERATED" tone="glass" />
          </View>

          <View style={styles.heroRow}>
            <Pressable onPress={() => navigation.navigate(routes.Book)}>
              <BookCover book={topBook} w={110} h={156} tilt={-3} />
            </Pressable>
            <View style={styles.heroMeta}>
              <Ring value={topScore} size={58} stroke={6} color={colors.lime} textColor={colors.cream} />
              <View style={styles.heroInfo}>
                <Text style={styles.heroTitle}>{topBook.title}</Text>
                <Text style={styles.heroAuthor}>{topBook.author}</Text>
                <Text style={styles.heroGenre}>{topBook.genre}</Text>
              </View>
            </View>
          </View>

          {topReasons.length > 0 && (
            <View style={styles.why}>
              <View style={styles.whySpark}>
                <Text style={styles.whySparkText}>✦</Text>
              </View>
              <Text style={styles.whyText}>{topReasons.join(' · ')}</Text>
            </View>
          )}

          <Pressable
            onPress={() => navigation.navigate(routes.GroupDetail, { groupId: heroGroup.id })}
            style={styles.heroAction}
          >
            <Text style={styles.heroActionText}>See all picks for this group →</Text>
          </Pressable>
        </LinearGradient>
      </View>


      {/* ── My circles ── */}
      <View style={styles.circlesHeader}>
        <Text style={styles.circlesTitle}>My circles</Text>
      </View>

      <View style={styles.circlesList}>
        {GROUPS.map((g) => {
          const members = g.memberIds.map((id) => MEMBERS.find((m) => m.id === id)).filter(Boolean);
          const updates = GROUP_UPDATES[g.id] ?? 0;
          const groupRecs = getGroupRecommendations(g.id, 1);
          const currentBook = groupRecs[0]?.book ?? BOOKS.find((b) => b.id === g.currentBookId);

          return (
            <Pressable
              key={g.id}
              onPress={() => navigation.navigate(routes.GroupDetail, { groupId: g.id })}
              style={styles.circleCard}
            >
              {/* Badge */}
              <View style={[styles.circleBadge, { backgroundColor: g.color }]}>
                <Text style={styles.circleBadgeText}>{g.initials}</Text>
              </View>

              {/* Info */}
              <View style={styles.circleInfo}>
                <View style={styles.circleNameRow}>
                  <Text style={styles.circleName}>{g.name}</Text>
                  {updates > 0 && (
                    <View style={styles.updateBadge}>
                      <Text style={styles.updateBadgeText}>{updates} new</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.circleMeta}>{g.mood} · {members.length} members</Text>
                <View style={styles.circleAvatars}>
                  {members.slice(0, 4).map((m, i) => (
                    <View key={m.id} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                      <Avatar m={m} size={20} />
                    </View>
                  ))}
                </View>
              </View>

              {/* Current book thumbnail */}
              {currentBook && (
                <BookCover book={currentBook} w={38} h={54} tilt={2} />
              )}

              <Text style={styles.circleArrow}>›</Text>
            </Pressable>
          );
        })}

        {/* Create a new circle */}
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

        {/* Join another circle */}
        <Pressable
          onPress={() => navigation.navigate(routes.JoinGroup)}
          style={styles.joinCard}
        >
          <View style={styles.joinIcon}>
            <Text style={styles.joinIconText}>◎</Text>
          </View>
          <Text style={styles.joinText}>Join another circle</Text>
          <Text style={styles.circleArrow}>›</Text>
        </Pressable>
      </View>

    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 32 },
  top: {
    paddingTop: 26, paddingHorizontal: 22,
    flexDirection: 'row', alignItems: 'center', gap: 12, paddingBottom: 20,
  },
  kicker: { fontSize: 11, color: 'rgba(22,16,46,0.5)', letterSpacing: 1.6, textTransform: 'uppercase', fontWeight: '700' },
  h1: { marginTop: 4, fontSize: 32, fontWeight: '900', color: colors.ink, letterSpacing: -0.8 },
  heroWrap: { paddingHorizontal: 22 },
  hero: { borderRadius: 28, padding: 18, overflow: 'hidden' },
  heroTags: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  heroRow: { flexDirection: 'row', gap: 16, marginTop: 18, alignItems: 'flex-start' },
  heroMeta: { flex: 1, gap: 14 },
  heroInfo: { gap: 4 },
  heroTitle: { fontSize: 22, fontWeight: '900', color: colors.cream, letterSpacing: -0.5, lineHeight: 24 },
  heroAuthor: { fontSize: 13, fontStyle: 'italic', color: 'rgba(251,246,235,0.75)', fontWeight: '600' },
  heroGenre: { fontSize: 10, fontWeight: '800', color: 'rgba(251,246,235,0.5)', letterSpacing: 1.2, textTransform: 'uppercase', marginTop: 2 },
  why: {
    marginTop: 14, flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    padding: 14, borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)',
  },
  whySpark: { width: 22, height: 22, borderRadius: 6, backgroundColor: colors.lime, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 },
  whySparkText: { color: colors.ink, fontWeight: '900', fontSize: 12 },
  whyText: { flex: 1, color: 'rgba(251,246,235,0.92)', fontSize: 13, lineHeight: 18, fontWeight: '600' },
  heroAction: {
    marginTop: 14, height: 48, borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  heroActionText: { color: colors.cream, fontWeight: '800', fontSize: 14, letterSpacing: -0.1 },
  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 22, marginTop: 14 },
  statsCol: { flex: 1, gap: 10 },
  statCard: { flex: 1, borderRadius: radii.lg, padding: 14 },
  statKicker: { fontSize: 9, letterSpacing: 1.6, textTransform: 'uppercase', fontWeight: '800', color: 'rgba(22,16,46,0.7)' },
  statBig: { marginTop: 8, fontSize: 17, fontWeight: '900', letterSpacing: -0.4, lineHeight: 20 },
  statNum: { marginTop: 6, fontSize: 26, fontWeight: '900', letterSpacing: -0.8 },
  circlesHeader: {
    paddingHorizontal: 22, paddingTop: 28, paddingBottom: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  circlesTitle: { fontSize: 22, fontWeight: '900', color: colors.ink, letterSpacing: -0.4 },
  circlesAdd: { fontSize: 14, fontWeight: '900', color: colors.purple },
  circlesList: { paddingHorizontal: 22, gap: 10 },
  circleCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.white, borderRadius: radii.xl, padding: 14,
    borderWidth: 1, borderColor: 'rgba(22,16,46,0.06)',
  },
  circleBadge: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  circleBadgeText: { color: colors.ink, fontWeight: '900', fontSize: 17, letterSpacing: -0.4 },
  circleInfo: { flex: 1, gap: 4 },
  circleNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  circleName: { fontSize: 16, fontWeight: '900', color: colors.ink, letterSpacing: -0.3 },
  updateBadge: { borderRadius: radii.pill, paddingVertical: 3, paddingHorizontal: 8, backgroundColor: colors.lime },
  updateBadgeText: { fontSize: 10, fontWeight: '900', color: colors.ink, letterSpacing: 0.3 },
  circleMeta: { fontSize: 12, fontWeight: '700', color: 'rgba(22,16,46,0.5)' },
  circleAvatars: { flexDirection: 'row', marginTop: 4 },
  circleArrow: { fontSize: 22, fontWeight: '900', color: 'rgba(22,16,46,0.3)', flexShrink: 0 },
  createCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.ink, borderRadius: radii.xl, padding: 14,
  },
  createIcon: { width: 48, height: 48, borderRadius: 15, backgroundColor: colors.lime, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  createIconText: { fontSize: 20, color: colors.ink, fontWeight: '900' },
  createText: { flex: 1, fontSize: 15, fontWeight: '800', color: colors.cream },
  joinCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.cream, borderRadius: radii.xl, padding: 14,
    borderWidth: 1.5, borderStyle: 'dashed', borderColor: 'rgba(22,16,46,0.2)',
  },
  joinIcon: { width: 48, height: 48, borderRadius: 15, backgroundColor: colors.mist, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  joinIconText: { fontSize: 22, color: colors.purple },
  joinText: { flex: 1, fontSize: 15, fontWeight: '800', color: 'rgba(22,16,46,0.55)' },
});
