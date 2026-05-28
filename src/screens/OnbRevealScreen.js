import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { RMButton } from '../components/RMButton';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function OnbRevealScreen({ navigation }) {
  return (
    <Screen backgroundColor={colors.cream} scroll={false} contentStyle={styles.fill}>
      <View style={styles.header}>
        <Text style={styles.step}>CHAPTER FIVE</Text>
        <Text style={styles.title}>
          Reveal your{'\n'}
          <Text style={styles.italic}>reader aura</Text>
        </Text>
      </View>

      <LinearGradient colors={[colors.purple, colors.violet, colors.ink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
        <Text style={styles.cardKicker}>YOUR TYPE</Text>
        <Text style={styles.cardTitle}>Dark‑curious synthesizer</Text>
        <Text style={styles.cardBody}>
          You like ideas with texture: philosophical, atmospheric, and a little strange. The group gets a diversity boost when you vote early.
        </Text>
        <View style={styles.meterRow}>
          <View style={styles.meter}>
            <View style={[styles.meterFill, { width: '78%' }]} />
          </View>
          <Text style={styles.meterLabel}>78%</Text>
        </View>
        <View style={styles.tags}>
          {['Slow burn', 'Speculative', 'Essays', 'Mood'].map((t) => (
            <View key={t} style={styles.tag}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      <View style={styles.footer}>
        <RMButton title="Finish · Go to Home" onPress={() => navigation.navigate(routes.Home)} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    paddingBottom: 36,
  },
  header: {
    paddingTop: 44,
    paddingHorizontal: 22,
  },
  step: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.55)',
    fontWeight: '700',
  },
  title: {
    marginTop: 10,
    fontSize: 34,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -1,
    lineHeight: 36,
  },
  italic: {
    fontStyle: 'italic',
    fontWeight: '700',
  },
  card: {
    marginTop: 18,
    marginHorizontal: 22,
    borderRadius: radii.xl,
    padding: 18,
    overflow: 'hidden',
  },
  cardKicker: {
    color: 'rgba(251,246,235,0.6)',
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontWeight: '800',
  },
  cardTitle: {
    marginTop: 10,
    color: colors.cream,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  cardBody: {
    marginTop: 10,
    color: 'rgba(251,246,235,0.85)',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  meterRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  meter: {
    flex: 1,
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  meterFill: {
    height: '100%',
    backgroundColor: colors.lime,
  },
  meterLabel: {
    color: colors.lime,
    fontWeight: '900',
    letterSpacing: -0.2,
  },
  tags: {
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  tagText: {
    color: colors.cream,
    fontWeight: '800',
    fontSize: 11,
  },
  footer: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 26,
  },
});

