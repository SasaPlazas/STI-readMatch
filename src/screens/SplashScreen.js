import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { BookCover } from '../components/BookCover';
import { RMButton } from '../components/RMButton';
import { BOOKS } from '../data/sample';
import { colors } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function SplashScreen({ navigation }) {
  return (
    <LinearGradient colors={[colors.violet, colors.ink, colors.violet2]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.bg}>
      <View style={styles.floating}>
        <View style={[styles.coverPos, { top: 130, left: 60 }]}>
          <BookCover book={BOOKS[1]} w={130} h={184} tilt={-8} />
        </View>
        <View style={[styles.coverPos, { top: 220, right: 40 }]}>
          <BookCover book={BOOKS[2]} w={120} h={170} tilt={9} />
        </View>
        <View style={[styles.coverPos, { top: 310, left: 40 }]}>
          <BookCover book={BOOKS[0]} w={150} h={212} tilt={-4} />
        </View>
      </View>

      <View style={styles.logo}>
        <Text style={styles.wordmark}>
          read<Text style={styles.wordmarkAccent}>match</Text>
        </Text>
        <Text style={styles.tagline}>find the perfect book — together.</Text>
        <Text style={styles.meta}>AI · group reads · 2.4M readers</Text>
      </View>

      <View style={styles.cta}>
        <RMButton title="Start matching" onPress={() => navigation.navigate(routes.OnbIdentity)} right={<View style={styles.arrow}><Text style={styles.arrowText}>→</Text></View>} />
        <Text style={styles.signIn}>
          Have an account? <Text style={styles.signInAccent}>Sign in</Text>
        </Text>
        <Text style={styles.allScreens} onPress={() => navigation.navigate(routes.AllScreens)}>
          Ver todas las pantallas
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  floating: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  coverPos: {
    position: 'absolute',
  },
  logo: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 210,
  },
  wordmark: {
    color: colors.cream,
    fontSize: 64,
    fontWeight: '900',
    letterSpacing: -1.5,
    lineHeight: 66,
  },
  wordmarkAccent: {
    color: colors.lime,
  },
  tagline: {
    marginTop: 14,
    fontSize: 20,
    color: colors.cream,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  meta: {
    marginTop: 10,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'rgba(251,246,235,0.55)',
    fontWeight: '700',
  },
  cta: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 56,
    gap: 14,
  },
  arrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: colors.lime,
    fontWeight: '900',
  },
  signIn: {
    textAlign: 'center',
    fontSize: 13,
    color: 'rgba(251,246,235,0.7)',
  },
  signInAccent: {
    color: colors.lime,
    textDecorationLine: 'underline',
  },
  allScreens: {
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(251,246,235,0.65)',
    textDecorationLine: 'underline',
  },
});

