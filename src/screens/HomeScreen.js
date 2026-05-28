import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { BookCover } from '../components/BookCover';
import { Pill } from '../components/Pill';
import { Ring } from '../components/Ring';
import { Screen } from '../components/Screen';
import { RMButton } from '../components/RMButton';
import { BOOKS, MEMBERS } from '../data/sample';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function HomeScreen({ navigation }) {
  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>
      <View style={styles.top}>
        <View style={{ flex: 1 }}>
          <Text style={styles.kicker}>Tuesday · 8:42</Text>
          <Text style={styles.h1}>Hey, Maya ✦</Text>
        </View>
        <Pressable onPress={() => navigation.navigate(routes.Personality)}>
          <Avatar m={MEMBERS[0]} size={44} />
        </Pressable>
      </View>

      <View style={styles.groupRow}>
        <Text style={styles.groupLabel}>Reading with</Text>
        <View style={styles.avatars}>
          {MEMBERS.slice(0, 5).map((m, i) => (
            <View key={m.id} style={{ marginLeft: i === 0 ? 0 : -8 }}>
              <Avatar m={m} size={26} />
            </View>
          ))}
        </View>
        <Pill label="Slow Burners · 5" tone="ink" />
      </View>

      <View style={styles.heroWrap}>
        <LinearGradient colors={[colors.violet, colors.ink, colors.violet2]} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }} style={styles.hero}>
          <View style={styles.heroTags}>
            <Pill label="★ This week's match" tone="lime" />
            <Pill label="UPDATED 2H AGO" tone="glass" />
          </View>

          <View style={styles.heroRow}>
            <Pressable onPress={() => navigation.navigate(routes.Book)}>
              <BookCover book={BOOKS[1]} w={120} h={170} tilt={-3} />
            </Pressable>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <Ring value={89} size={62} stroke={6} color={colors.lime} textColor={colors.cream} />
              <View>
                <Text style={styles.heroTitle}>Soft{'\n'}Algorithms</Text>
                <Text style={styles.heroAuthor}>Yuki Tanabe</Text>
              </View>
            </View>
          </View>

          <View style={styles.why}>
            <View style={styles.whyHeader}>
              <View style={styles.spark}>
                <Text style={styles.sparkText}>✦</Text>
              </View>
              <Text style={styles.whyKicker}>Why this matches</Text>
            </View>
            <Text style={styles.whyText}>
              Balances <Text style={{ color: colors.lime, fontWeight: '900' }}>Iris</Text>' dark‑academia streak with{' '}
              <Text style={{ color: colors.coral, fontWeight: '900' }}>Theo</Text>'s essay habit — and lands inside everyone's complexity band.
            </Text>
          </View>

          <View style={styles.heroActions}>
            <RMButton title="I'm in →" onPress={() => navigation.navigate(routes.Vote)} style={{ flex: 1, height: 48 }} />
            <RMButton title="See alternates" variant="ghost" onPress={() => navigation.navigate(routes.Compatibility)} style={[{ flex: 1, height: 48 }, styles.heroAlt]} />
          </View>
        </LinearGradient>
      </View>

      <Pressable onPress={() => navigation.navigate(routes.Telegram)} style={styles.tgCard}>
        <View style={styles.tgIcon}>
          <Text style={styles.tgIconText}>↗</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.tgTitleRow}>
            <Text style={styles.tgTitle}>Telegram mirror</Text>
            <View style={styles.tgLive}>
              <Text style={styles.tgLiveText}>● LIVE</Text>
            </View>
          </View>
          <Text style={styles.tgSub}>3 new votes · synced 6m ago</Text>
        </View>
        <View style={styles.tgOpen}>
          <Text style={styles.tgOpenText}>Open ↗</Text>
        </View>
      </Pressable>

      <View style={styles.statsHeader}>
        <Text style={styles.statsTitle}>This week, together</Text>
        <Text style={styles.statsLive}>LIVE</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: colors.lime }]}>
          <Text style={[styles.statKicker, { color: 'rgba(22,16,46,0.7)' }]}>Group mood</Text>
          <Text style={[styles.statBig, { color: colors.ink }]}>Curious &{'\n'}contemplative</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.coral }]}>
          <Text style={[styles.statKicker, { color: 'rgba(22,16,46,0.65)' }]}>Pages read</Text>
          <Text style={[styles.statNum, { color: colors.ink }]}>1,284</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.ink }]}>
          <Text style={[styles.statKicker, { color: 'rgba(251,246,235,0.55)' }]}>Diversity</Text>
          <Text style={[styles.statNum, { color: colors.lime }]}>0.78</Text>
        </View>
      </View>

      <View style={styles.activityHeader}>
        <Text style={styles.activityTitle}>Group activity</Text>
      </View>
      <View style={styles.feed}>
        {[
          { who: MEMBERS[2], action: 'voted', target: '"Lemon, Lemon"', icon: '♥', tone: colors.coral, meta: '12m', to: routes.Vote },
          { who: MEMBERS[1], action: 'finished', target: '"The Quiet Bureau"', icon: '✓', tone: colors.lime, meta: '1h', to: routes.Book },
          { who: MEMBERS[3], action: 'highlighted', target: 'p. 84 · "small kindnesses"', icon: '✎', tone: colors.purple, meta: '3h', to: routes.Explain },
        ].map((a, i) => (
          <Pressable key={i} onPress={() => navigation.navigate(a.to)} style={styles.feedRow}>
            <Avatar m={a.who} size={36} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={styles.feedText} numberOfLines={2}>
                <Text style={{ fontWeight: '900' }}>{a.who.name}</Text> {a.action} <Text style={{ color: colors.inkSoft }}>{a.target}</Text>
              </Text>
              <Text style={styles.feedMeta}>{a.meta} ago</Text>
            </View>
            <View style={[styles.feedIcon, { backgroundColor: a.tone }]}>
              <Text style={styles.feedIconText}>{a.icon}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 110,
  },
  top: {
    paddingTop: 26,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 18,
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
  groupRow: {
    paddingHorizontal: 22,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  groupLabel: {
    fontSize: 11,
    color: 'rgba(22,16,46,0.5)',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  avatars: {
    flexDirection: 'row',
  },
  heroWrap: {
    paddingHorizontal: 22,
  },
  hero: {
    borderRadius: 28,
    padding: 18,
    overflow: 'hidden',
  },
  heroTags: {
    flexDirection: 'row',
    gap: 8,
  },
  heroRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 18,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.cream,
    lineHeight: 25,
    letterSpacing: -0.5,
  },
  heroAuthor: {
    marginTop: 6,
    color: 'rgba(251,246,235,0.75)',
    fontStyle: 'italic',
    fontWeight: '600',
  },
  why: {
    marginTop: 14,
    padding: 14,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  whyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  spark: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkText: {
    color: colors.ink,
    fontWeight: '900',
  },
  whyKicker: {
    color: colors.lime,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    fontSize: 11,
    fontWeight: '800',
  },
  whyText: {
    color: 'rgba(251,246,235,0.92)',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  heroActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  heroAlt: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.25)',
  },
  tgCard: {
    marginTop: 14,
    marginHorizontal: 22,
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tgIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tgIconText: {
    color: colors.lime,
    fontWeight: '900',
  },
  tgTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tgTitle: {
    fontWeight: '900',
    color: colors.ink,
  },
  tgLive: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#E8F8D5',
  },
  tgLiveText: {
    color: '#3F6E12',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  tgSub: {
    marginTop: 4,
    fontSize: 10,
    letterSpacing: 0.8,
    color: 'rgba(22,16,46,0.5)',
    fontWeight: '700',
  },
  tgOpen: {
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 999,
    backgroundColor: colors.lime,
  },
  tgOpenText: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 11,
  },
  statsHeader: {
    marginTop: 20,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statsTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  statsLive: {
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.45)',
    fontWeight: '800',
  },
  statsGrid: {
    paddingHorizontal: 22,
    gap: 10,
  },
  statCard: {
    borderRadius: radii.lg,
    padding: 16,
  },
  statKicker: {
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontWeight: '800',
  },
  statBig: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.6,
    lineHeight: 24,
  },
  statNum: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  activityHeader: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 12,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  feed: {
    paddingHorizontal: 22,
    gap: 10,
  },
  feedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.05)',
  },
  feedText: {
    fontSize: 13,
    color: colors.ink,
    lineHeight: 17,
  },
  feedMeta: {
    marginTop: 4,
    fontSize: 10,
    color: 'rgba(22,16,46,0.45)',
    letterSpacing: 0.8,
    fontWeight: '700',
  },
  feedIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedIconText: {
    fontWeight: '900',
    color: colors.ink,
  },
});

