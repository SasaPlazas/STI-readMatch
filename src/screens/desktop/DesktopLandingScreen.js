import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BookCover } from '../../components/BookCover';
import { Ring } from '../../components/Ring';
import { BOOKS } from '../../data/sample';
import { routes } from '../../navigation/routes';
import { colors, radii } from '../../theme/tokens';

export function DesktopLandingScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <View style={styles.nav}>
        <Text style={styles.brand}>
          read<Text style={styles.brandAccent}>match</Text>
        </Text>
        <View style={styles.navLinks}>
          {['Product', 'Groups', 'Telegram', 'Pricing'].map((l) => (
            <Pressable key={l} onPress={() => null} style={styles.link}>
              <Text style={styles.linkText}>{l}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.navRight}>
          <Pressable onPress={() => navigation.navigate(routes.CreateAccount)} style={styles.ghostBtn}>
            <Text style={styles.ghostText}>Create account</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate(routes.SignIn)} style={styles.primaryBtn}>
            <Text style={styles.primaryText}>Sign in →</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.left}>
          <Text style={styles.kicker}>COLLABORATIVE AI RECOMMENDATIONS</Text>
          <Text style={styles.h1}>
            Find the perfect{'\n'}
            book — <Text style={styles.italic}>together</Text>.
          </Text>
          <Text style={styles.p}>
            ReadMatch blends group taste, novelty, and fairness-aware balancing. Vote with friends and mirror everything to Telegram.
          </Text>

          <View style={styles.ctas}>
            <Pressable onPress={() => navigation.navigate(routes.Home)} style={styles.ctaPrimary}>
              <Text style={styles.ctaPrimaryText}>Start matching</Text>
              <View style={styles.ctaIcon}>
                <Text style={styles.ctaIconText}>→</Text>
              </View>
            </Pressable>
          </View>

          <View style={styles.metrics}>
            {[
              { k: 'Readers', v: '2.4M' },
              { k: 'Groups', v: '180k' },
              { k: 'Avg match', v: '88%' },
            ].map((m) => (
              <View key={m.k} style={styles.metric}>
                <Text style={styles.metricK}>{m.k}</Text>
                <Text style={styles.metricV}>{m.v}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.right}>
          <LinearGradient colors={[colors.violet, colors.ink, colors.violet2]} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }} style={styles.heroCard}>
            <View style={styles.heroTop}>
              <View>
                <Text style={styles.heroK}>This week</Text>
                <Text style={styles.heroT}>Soft Algorithms</Text>
                <Text style={styles.heroA}>Yuki Tanabe</Text>
              </View>
              <Ring value={89} size={56} stroke={6} color={colors.lime} textColor={colors.cream} />
            </View>

            <View style={styles.covers}>
              <BookCover book={BOOKS[1]} w={140} h={198} tilt={-6} />
              <View style={{ marginLeft: -10, marginTop: 20 }}>
                <BookCover book={BOOKS[2]} w={120} h={170} tilt={8} />
              </View>
              <View style={{ marginLeft: -18, marginTop: 46 }}>
                <BookCover book={BOOKS[0]} w={150} h={212} tilt={-3} />
              </View>
            </View>

            <View style={styles.heroBottom}>
              <Text style={styles.heroWhyK}>Why this matches</Text>
              <Text style={styles.heroWhy}>
                Balances <Text style={{ color: colors.lime, fontWeight: '900' }}>Iris</Text>' dark-academia streak with{' '}
                <Text style={{ color: colors.coral, fontWeight: '900' }}>Theo</Text>'s essay habit and keeps everyone inside the complexity band.
              </Text>
            </View>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  nav: {
    height: 74,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(22,16,46,0.08)',
    backgroundColor: colors.cream,
  },
  brand: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.4,
  },
  brandAccent: {
    color: colors.purple,
  },
  navLinks: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'center',
  },
  link: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  linkText: {
    color: 'rgba(22,16,46,0.72)',
    fontWeight: '700',
  },
  navRight: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  ghostBtn: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostText: {
    color: colors.ink,
    fontWeight: '900',
  },
  primaryBtn: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: colors.lime,
    fontWeight: '900',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 30,
    gap: 28,
  },
  left: {
    flex: 1,
    justifyContent: 'center',
  },
  right: {
    width: 520,
    justifyContent: 'center',
  },
  kicker: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.55)',
    fontWeight: '900',
  },
  h1: {
    marginTop: 12,
    fontSize: 54,
    lineHeight: 56,
    letterSpacing: -1.4,
    color: colors.ink,
    fontWeight: '900',
  },
  italic: {
    fontStyle: 'italic',
    fontWeight: '700',
    color: colors.purple,
  },
  p: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(22,16,46,0.7)',
    fontWeight: '600',
    maxWidth: 520,
  },
  ctas: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  ctaPrimary: {
    height: 54,
    borderRadius: 999,
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: colors.lime,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ctaPrimaryText: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 16,
  },
  ctaIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaIconText: {
    color: colors.lime,
    fontWeight: '900',
    fontSize: 14,
  },
  ctaGhost: {
    height: 54,
    borderRadius: 999,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaGhostText: {
    color: colors.ink,
    fontWeight: '900',
  },
  metrics: {
    marginTop: 22,
    flexDirection: 'row',
    gap: 18,
  },
  metric: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radii.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.08)',
  },
  metricK: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.55)',
    fontWeight: '900',
  },
  metricV: {
    marginTop: 6,
    fontSize: 18,
    color: colors.ink,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  heroCard: {
    borderRadius: 28,
    padding: 18,
    overflow: 'hidden',
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  heroK: {
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: 'rgba(251,246,235,0.55)',
    fontWeight: '900',
  },
  heroT: {
    marginTop: 8,
    color: colors.cream,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  heroA: {
    marginTop: 6,
    color: 'rgba(251,246,235,0.75)',
    fontStyle: 'italic',
    fontWeight: '600',
  },
  covers: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  heroBottom: {
    marginTop: 14,
    padding: 14,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  heroWhyK: {
    color: colors.lime,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    fontWeight: '900',
  },
  heroWhy: {
    marginTop: 8,
    color: 'rgba(251,246,235,0.9)',
    fontWeight: '600',
    lineHeight: 18,
    fontSize: 13,
  },
});
