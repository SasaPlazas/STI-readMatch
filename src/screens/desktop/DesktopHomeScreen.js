import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../../components/Avatar';
import { BookCover } from '../../components/BookCover';
import { Pill } from '../../components/Pill';
import { Ring } from '../../components/Ring';
import { DesktopShell } from '../../components/desktop/DesktopShell';
import { BOOKS, MEMBERS } from '../../data/sample';
import { routes } from '../../navigation/routes';
import { colors, radii } from '../../theme/tokens';

export function DesktopHomeScreen({ navigation }) {
  return (
    <DesktopShell navigation={navigation} activeRoute={routes.Home} title="Home dashboard" subtitle="Slow Burners · Live" scroll={false}>
      <View style={styles.grid}>
        <ScrollView style={styles.main} contentContainerStyle={styles.mainContent} showsVerticalScrollIndicator={false}>
          <LinearGradient colors={[colors.violet, colors.ink, colors.violet2]} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }} style={styles.hero}>
            <View style={styles.heroTop}>
              <View style={styles.heroTags}>
                <Pill label="★ This week's match" tone="lime" />
                <Pill label="UPDATED 2H AGO" tone="glass" />
              </View>
            </View>

            <View style={styles.heroRow}>
              <Pressable onPress={() => navigation.navigate(routes.Book)}>
                <BookCover book={BOOKS[1]} w={160} h={224} tilt={-4} />
              </Pressable>
              <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={styles.heroScoreRow}>
                  <Ring value={89} size={74} stroke={7} color={colors.lime} textColor={colors.cream} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.heroTitle}>Soft Algorithms</Text>
                    <Text style={styles.heroAuthor}>Yuki Tanabe</Text>
                    <Text style={styles.heroMeta}>Sci‑Fi Essays · 224 pages · Complexity: Medium</Text>
                  </View>
                </View>
                <View style={styles.why}>
                  <View style={styles.whyHead}>
                    <View style={styles.spark}>
                      <Text style={styles.sparkText}>✦</Text>
                    </View>
                    <Text style={styles.whyK}>Why this matches</Text>
                  </View>
                  <Text style={styles.whyText}>
                    Balances <Text style={{ color: colors.lime, fontWeight: '900' }}>Iris</Text>' dark-academia streak with{' '}
                    <Text style={{ color: colors.coral, fontWeight: '900' }}>Theo</Text>'s essay habit — while protecting minority preferences.
                  </Text>
                </View>
                <View style={styles.heroActions}>
                  <Pressable onPress={() => navigation.navigate(routes.Book)} style={styles.primary}>
                    <Text style={styles.primaryText}>See book →</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>This week, together</Text>
            <Text style={styles.sectionMeta}>LIVE</Text>
          </View>
          <View style={styles.stats}>
            <Tile tone={colors.lime} kicker="Group mood" big="Curious & contemplative" />
            <Tile tone={colors.coral} kicker="Pages read" value="1,284" />
            <Tile tone={colors.ink} kicker="Diversity" value="0.78" invert />
          </View>

          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Alternates</Text>
            <Text style={styles.sectionMeta}>AI-PICKED</Text>
          </View>
          <View style={styles.alts}>
            {BOOKS.slice(0, 4).map((b) => (
              <Pressable key={b.id} style={styles.altCard} onPress={() => navigation.navigate(routes.Book)}>
                <BookCover book={b} w={90} h={128} tilt={0} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={styles.altTitle} numberOfLines={1}>
                    {b.title}
                  </Text>
                  <Text style={styles.altMeta} numberOfLines={1}>
                    {b.author} · {b.match}% match
                  </Text>
                  <View style={styles.altTags}>
                    <Pill label={b.genre} tone="glass" style={styles.altPill} />
                    <Pill label={b.complexity} tone="glass" style={styles.altPill} />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <ScrollView style={styles.rail} contentContainerStyle={styles.railContent} showsVerticalScrollIndicator={false}>
          <View style={styles.railCard}>
            <View style={styles.railHead}>
              <View style={styles.tgIcon}>
                <Text style={styles.tgIconText}>↗</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.railTitle}>Telegram mirror</Text>
                <Text style={styles.railSub}>3 new votes · synced 6m ago</Text>
              </View>
              <Pill label="● LIVE" tone="lime" />
            </View>
            <View style={styles.feed}>
              {[
                { who: MEMBERS[2], t: 'voted ★', msg: '"Lemon, Lemon"' },
                { who: MEMBERS[1], t: 'finished ✓', msg: '"The Quiet Bureau"' },
                { who: MEMBERS[3], t: 'highlighted ✎', msg: 'p. 84 "small kindnesses"' },
              ].map((i, idx) => (
                <View key={idx} style={styles.feedRow}>
                  <Avatar m={i.who} size={26} />
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={styles.feedText} numberOfLines={1}>
                      <Text style={{ fontWeight: '900' }}>{i.who.name}</Text> {i.t}
                    </Text>
                    <Text style={styles.feedMsg} numberOfLines={1}>
                      {i.msg}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <Pressable onPress={() => navigation.navigate(routes.Telegram)} style={styles.railBtn}>
              <Text style={styles.railBtnText}>Open channel ↗</Text>
            </Pressable>
          </View>

          <View style={styles.railCard}>
            <View style={styles.railHead}>
              <Text style={styles.railTitle}>Members</Text>
              <Text style={styles.railMeta}>AFFINITY</Text>
            </View>
            <View style={styles.members}>
              {MEMBERS.map((m, i) => (
                <View key={m.id} style={styles.memberRow}>
                  <Avatar m={m} size={28} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.memberName}>{m.name}</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { width: `${(92 - i * 9).toFixed(0)}%`, backgroundColor: i % 2 ? colors.coral : colors.lime }]} />
                    </View>
                  </View>
                  <Text style={styles.memberVal}>{(92 - i * 9).toFixed(0)}%</Text>
                </View>
              ))}
            </View>
          </View>

        </ScrollView>
      </View>
    </DesktopShell>
  );
}

function Tile({ tone, kicker, value, big, invert = false }) {
  return (
    <View style={[styles.tile, { backgroundColor: tone }]}>
      <Text style={[styles.tileK, invert ? { color: 'rgba(251,246,235,0.55)' } : { color: 'rgba(22,16,46,0.65)' }]}>{kicker}</Text>
      {big ? <Text style={[styles.tileBig, invert ? { color: colors.cream } : { color: colors.ink }]}>{big}</Text> : null}
      {value ? <Text style={[styles.tileVal, invert ? { color: colors.lime } : { color: colors.ink }]}>{value}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    gap: 18,
    padding: 22,
  },
  main: {
    flex: 1,
    minWidth: 0,
  },
  mainContent: {
    paddingBottom: 22,
    gap: 18,
  },
  rail: {
    width: 360,
  },
  railContent: {
    paddingBottom: 22,
    gap: 14,
  },
  hero: {
    borderRadius: 28,
    padding: 18,
    overflow: 'hidden',
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  heroTags: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  heroRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 18,
  },
  heroScoreRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  heroTitle: {
    color: colors.cream,
    fontWeight: '900',
    fontSize: 30,
    letterSpacing: -0.6,
  },
  heroAuthor: {
    marginTop: 6,
    color: 'rgba(251,246,235,0.75)',
    fontStyle: 'italic',
    fontWeight: '600',
  },
  heroMeta: {
    marginTop: 8,
    color: 'rgba(251,246,235,0.55)',
    fontWeight: '700',
    fontSize: 12,
  },
  why: {
    marginTop: 12,
    padding: 14,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  whyHead: {
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
  whyK: {
    color: colors.lime,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    fontSize: 11,
    fontWeight: '900',
  },
  whyText: {
    color: 'rgba(251,246,235,0.9)',
    fontWeight: '600',
    lineHeight: 18,
    fontSize: 13,
  },
  heroActions: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 10,
  },
  primary: {
    flex: 1,
    height: 46,
    borderRadius: 999,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: colors.ink,
    fontWeight: '900',
  },
  ghost: {
    flex: 1,
    height: 46,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostDark: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderColor: 'rgba(255,255,255,0.18)',
  },
  ghostText: {
    color: colors.cream,
    fontWeight: '900',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  sectionMeta: {
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.45)',
    fontWeight: '900',
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  tile: {
    flex: 1,
    minWidth: 220,
    borderRadius: radii.lg,
    padding: 16,
  },
  tileK: {
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontWeight: '900',
  },
  tileBig: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
    lineHeight: 22,
  },
  tileVal: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  alts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  altCard: {
    width: '48%',
    minWidth: 360,
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  altTitle: {
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.2,
  },
  altMeta: {
    marginTop: 4,
    fontSize: 12,
    color: 'rgba(22,16,46,0.6)',
    fontStyle: 'italic',
    fontWeight: '600',
  },
  altTags: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  altPill: {
    backgroundColor: colors.mist,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  railCard: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  railHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  railTitle: {
    fontWeight: '900',
    color: colors.ink,
  },
  railSub: {
    marginTop: 4,
    fontSize: 10,
    letterSpacing: 0.8,
    color: 'rgba(22,16,46,0.5)',
    fontWeight: '700',
  },
  railMeta: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: 'rgba(22,16,46,0.45)',
    fontWeight: '900',
  },
  tgIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tgIconText: {
    color: colors.lime,
    fontWeight: '900',
  },
  feed: {
    marginTop: 12,
    gap: 10,
  },
  feedRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  feedText: {
    color: colors.ink,
    fontWeight: '700',
  },
  feedMsg: {
    marginTop: 2,
    color: 'rgba(22,16,46,0.55)',
    fontWeight: '600',
    fontSize: 11,
  },
  railBtn: {
    marginTop: 12,
    height: 42,
    borderRadius: 999,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  railBtnText: {
    color: colors.ink,
    fontWeight: '900',
  },
  members: {
    marginTop: 12,
    gap: 10,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  memberName: {
    fontWeight: '800',
    color: colors.ink,
  },
  barTrack: {
    marginTop: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(22,16,46,0.08)',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  memberVal: {
    width: 46,
    textAlign: 'right',
    fontWeight: '900',
    color: 'rgba(22,16,46,0.7)',
    fontSize: 12,
  },
});

