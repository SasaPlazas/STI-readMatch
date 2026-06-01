import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { Avatar } from '../components/Avatar';
import { BookCover } from '../components/BookCover';
import { Ring } from '../components/Ring';
import { BOOKS, GROUPS, MEMBERS } from '../data/sample';
import { getGroupRecommendations } from '../utils/recommendations';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

const COMPLEXITY_LABEL = { Low: 'Easy read', Medium: 'Balanced', High: 'Dense' };

export function GroupDetailScreen({ navigation, route }) {
  const { groupId } = route.params ?? { groupId: GROUPS[0].id };
  const group = GROUPS.find((g) => g.id === groupId) ?? GROUPS[0];
  const members = group.memberIds.map((id) => MEMBERS.find((m) => m.id === id)).filter(Boolean);
  const recs = getGroupRecommendations(group.id, 3);

  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>

      {/* ── Header ── */}
      <LinearGradient colors={['#2B1B69', '#16102E']} style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <View style={[styles.badge, { backgroundColor: group.color }]}>
          <Text style={styles.badgeText}>{group.initials}</Text>
        </View>
        <Text style={styles.groupName}>{group.name}</Text>
        <Text style={styles.groupMood}>{group.mood}</Text>

        {/* Members strip */}
        <View style={styles.membersStrip}>
          {members.map((m, i) => (
            <View key={m.id} style={{ marginLeft: i === 0 ? 0 : -10 }}>
              <Avatar m={m} size={32} />
            </View>
          ))}
          <Text style={styles.memberCount}>{members.length} members</Text>
        </View>
      </LinearGradient>

      {/* ── This week's picks ── */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>This week's picks</Text>
          <View style={styles.autoBadge}>
            <Text style={styles.autoBadgeText}>✦ AUTO</Text>
          </View>
        </View>
        <Text style={styles.sectionSub}>
          Generated from the combined tastes of your {members.length} members
        </Text>

        <View style={styles.recList}>
          {recs.map((rec, index) => (
            <Pressable
              key={rec.book.id}
              onPress={() => navigation.navigate(routes.Book)}
              style={styles.recCard}
            >
              {/* Rank indicator */}
              <View style={[styles.rankPill, index === 0 && styles.rankPillTop]}>
                <Text style={[styles.rankText, index === 0 && styles.rankTextTop]}>#{rec.rank}</Text>
              </View>

              <BookCover book={rec.book} w={72} h={102} tilt={0} />

              <View style={styles.recInfo}>
                <Text style={styles.recTitle} numberOfLines={2}>{rec.book.title}</Text>
                <Text style={styles.recAuthor}>{rec.book.author}</Text>
                <Text style={styles.recGenre}>{rec.book.genre}</Text>

                <View style={styles.recMeta}>
                  <View style={styles.recComplexity}>
                    <Text style={styles.recComplexityText}>{COMPLEXITY_LABEL[rec.book.complexity]}</Text>
                  </View>
                  <Text style={styles.recPages}>{rec.book.pages} pages</Text>
                </View>

                {rec.reasons[0] && (
                  <Text style={styles.recReason} numberOfLines={2}>
                    ✦ {rec.reasons[0]}
                  </Text>
                )}
              </View>

              <Ring
                value={rec.score}
                size={48}
                stroke={5}
                color={index === 0 ? colors.lime : colors.purple}
                track="rgba(22,16,46,0.08)"
                textColor={colors.ink}
              />
            </Pressable>
          ))}
        </View>
      </View>

      {/* ── Recent updates ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent updates</Text>
        <Text style={styles.sectionSub}>What happened in this circle lately</Text>

        <View style={styles.updateList}>
          {group.activities.map((a, i) => (
            <View key={i} style={styles.updateRow}>
              <Avatar m={a.who} size={34} />
              <View style={styles.updateInfo}>
                <Text style={styles.updateText}>
                  <Text style={styles.updateName}>{a.who.name}</Text>
                  {' '}{a.action}{' '}
                  <Text style={styles.updateTarget}>{a.target}</Text>
                </Text>
                <Text style={styles.updateMeta}>{a.meta} ago</Text>
              </View>
              <View style={[styles.updateIcon, { backgroundColor: a.tone }]}>
                <Text style={styles.updateIconText}>{a.icon}</Text>
              </View>
            </View>
          ))}

          {group.activities.length === 0 && (
            <View style={styles.emptyUpdates}>
              <Text style={styles.emptyText}>No recent activity · check back soon</Text>
            </View>
          )}
        </View>
      </View>

      {/* ── Telegram ── */}
      <View style={styles.section}>
        <Pressable
          onPress={() => navigation.navigate(routes.Telegram)}
          style={styles.tgCard}
        >
          <View style={styles.tgIconWrap}>
            <Text style={styles.tgIconText}>↗</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.tgTitleRow}>
              <Text style={styles.tgTitle}>Open in Telegram</Text>
              <View style={styles.tgLive}>
                <Text style={styles.tgLiveText}>● LIVE</Text>
              </View>
            </View>
            <Text style={styles.tgSub}>
              See recommendations and updates in the group channel · synced automatically
            </Text>
          </View>
          <Text style={styles.tgArrow}>›</Text>
        </Pressable>
      </View>

    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 36 },
  header: {
    paddingTop: 54, paddingHorizontal: 22, paddingBottom: 28,
    alignItems: 'center', gap: 6,
  },
  back: {
    position: 'absolute', top: 14, left: 16,
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  backText: { fontSize: 22, color: colors.cream, fontWeight: '900', marginTop: -2 },
  badge: { width: 64, height: 64, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  badgeText: { fontSize: 26, fontWeight: '900', color: colors.ink, letterSpacing: -0.5 },
  groupName: { fontSize: 28, fontWeight: '900', color: colors.cream, letterSpacing: -0.8 },
  groupMood: { fontSize: 14, fontStyle: 'italic', color: 'rgba(251,246,235,0.6)', fontWeight: '600' },
  membersStrip: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  memberCount: { fontSize: 13, fontWeight: '700', color: 'rgba(251,246,235,0.7)' },
  section: { paddingHorizontal: 22, paddingTop: 26 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: colors.ink, letterSpacing: -0.3 },
  sectionSub: { fontSize: 13, fontWeight: '600', color: 'rgba(22,16,46,0.5)', lineHeight: 18, marginBottom: 16 },
  autoBadge: { borderRadius: radii.pill, paddingVertical: 4, paddingHorizontal: 10, backgroundColor: colors.lime },
  autoBadgeText: { fontSize: 10, fontWeight: '900', color: colors.ink, letterSpacing: 0.8 },
  recList: { gap: 12 },
  recCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 14,
    backgroundColor: colors.white, borderRadius: radii.xl, padding: 14,
    borderWidth: 1, borderColor: 'rgba(22,16,46,0.06)',
    position: 'relative',
  },
  rankPill: {
    position: 'absolute', top: 12, left: 12, zIndex: 1,
    borderRadius: radii.pill, paddingVertical: 3, paddingHorizontal: 7,
    backgroundColor: 'rgba(22,16,46,0.08)',
  },
  rankPillTop: { backgroundColor: colors.lime },
  rankText: { fontSize: 10, fontWeight: '900', color: 'rgba(22,16,46,0.5)' },
  rankTextTop: { color: colors.ink },
  recInfo: { flex: 1, paddingTop: 20, gap: 3 },
  recTitle: { fontSize: 16, fontWeight: '900', color: colors.ink, letterSpacing: -0.3, lineHeight: 20 },
  recAuthor: { fontSize: 13, fontStyle: 'italic', color: 'rgba(22,16,46,0.6)', fontWeight: '600' },
  recGenre: { fontSize: 10, fontWeight: '800', color: 'rgba(22,16,46,0.4)', letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 2 },
  recMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  recComplexity: { borderRadius: radii.pill, paddingVertical: 3, paddingHorizontal: 8, backgroundColor: colors.mist },
  recComplexityText: { fontSize: 10, fontWeight: '800', color: colors.purple },
  recPages: { fontSize: 10, fontWeight: '700', color: 'rgba(22,16,46,0.45)' },
  recReason: { fontSize: 12, fontWeight: '600', color: colors.purple, marginTop: 6, lineHeight: 16 },
  updateList: { gap: 10 },
  updateRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.white, borderRadius: radii.lg, padding: 12,
    borderWidth: 1, borderColor: 'rgba(22,16,46,0.05)',
  },
  updateInfo: { flex: 1, minWidth: 0 },
  updateText: { fontSize: 13, color: colors.ink, lineHeight: 18 },
  updateName: { fontWeight: '900' },
  updateTarget: { color: colors.inkSoft },
  updateMeta: { fontSize: 10, fontWeight: '700', color: 'rgba(22,16,46,0.4)', letterSpacing: 0.6, marginTop: 3 },
  updateIcon: { width: 30, height: 30, borderRadius: 9, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  updateIconText: { fontSize: 14, fontWeight: '900', color: colors.ink },
  emptyUpdates: { padding: 16, alignItems: 'center' },
  emptyText: { fontSize: 13, color: 'rgba(22,16,46,0.4)', fontWeight: '600' },
  tgCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: colors.ink, borderRadius: radii.xl, padding: 16,
  },
  tgIconWrap: {
    width: 46, height: 46, borderRadius: 14,
    backgroundColor: colors.lime,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  tgIconText: { fontSize: 20, fontWeight: '900', color: colors.ink },
  tgTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  tgTitle: { fontSize: 16, fontWeight: '900', color: colors.cream },
  tgLive: {
    borderRadius: 6, paddingVertical: 2, paddingHorizontal: 7,
    backgroundColor: '#E8F8D5',
  },
  tgLiveText: { fontSize: 9, fontWeight: '900', color: '#3F6E12', letterSpacing: 0.6 },
  tgSub: { fontSize: 12, fontWeight: '600', color: 'rgba(251,246,235,0.6)', lineHeight: 17 },
  tgArrow: { fontSize: 26, fontWeight: '900', color: 'rgba(251,246,235,0.3)', flexShrink: 0 },
});
