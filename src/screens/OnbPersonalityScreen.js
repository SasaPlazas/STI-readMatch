import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { RMButton } from '../components/RMButton';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

const OPTIONS = [
  { id: 'light', title: 'Light & fast', subtitle: 'page‑turners, beachable' },
  { id: 'balanced', title: 'Balanced & immersive', subtitle: 'absorbed but moving' },
  { id: 'deep', title: 'Deep & philosophical', subtitle: 'underlined, reread, list' },
  { id: 'experimental', title: 'Experimental', subtitle: 'fragments, forms, friction' },
];

export function OnbPersonalityScreen({ navigation }) {
  const [picked, setPicked] = useState('deep');

  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>
      <TopBar subtitle="Chapter Three" title="Reading personality" onBack={() => navigation.goBack()} />
      <View style={styles.header}>
        <Text style={styles.h2}>How deep do you like to go?</Text>
        <Text style={styles.hint}>SLIDER · DIVE · DRIFT · TRANSFORM</Text>
      </View>

      <View style={styles.options}>
        {OPTIONS.map((o) => {
          const active = picked === o.id;
          return (
            <Pressable key={o.id} onPress={() => setPicked(o.id)} style={[styles.option, active ? styles.optionActive : null]}>
              <View style={[styles.radio, active ? styles.radioActive : null]} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.optionTitle, active ? styles.optionTitleActive : null]}>{o.title}</Text>
                <Text style={[styles.optionSub, active ? styles.optionSubActive : null]}>{o.subtitle}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statTitle}>Discovery openness</Text>
        <Text style={styles.statValue}>72%</Text>
        <View style={styles.sliderTrack}>
          <View style={styles.sliderFill} />
          <View style={styles.sliderThumb} />
        </View>
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>FAMILIAR</Text>
          <Text style={styles.sliderLabel}>UNCHARTED</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RMButton title="Continue · Find your circle" onPress={() => navigation.navigate(routes.OnbCollab)} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 120,
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 6,
    paddingBottom: 12,
  },
  h2: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.ink,
  },
  hint: {
    marginTop: 6,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.45)',
    fontWeight: '700',
  },
  options: {
    paddingHorizontal: 22,
    gap: 10,
  },
  option: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  optionActive: {
    backgroundColor: colors.purple,
    borderColor: colors.purple,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'rgba(22,16,46,0.25)',
    backgroundColor: colors.white,
  },
  radioActive: {
    borderColor: colors.lime,
    backgroundColor: colors.lime,
  },
  optionTitle: {
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.2,
  },
  optionTitleActive: {
    color: colors.cream,
  },
  optionSub: {
    marginTop: 2,
    fontSize: 12,
    color: 'rgba(22,16,46,0.6)',
    fontWeight: '600',
  },
  optionSubActive: {
    color: 'rgba(251,246,235,0.8)',
  },
  statCard: {
    marginTop: 16,
    marginHorizontal: 22,
    backgroundColor: colors.ink,
    borderRadius: radii.xl,
    padding: 16,
  },
  statTitle: {
    color: 'rgba(251,246,235,0.55)',
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontWeight: '800',
  },
  statValue: {
    marginTop: 10,
    fontSize: 40,
    fontWeight: '900',
    color: colors.lime,
    letterSpacing: -1,
  },
  sliderTrack: {
    marginTop: 14,
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
    position: 'relative',
  },
  sliderFill: {
    width: '72%',
    height: '100%',
    backgroundColor: colors.lime,
  },
  sliderThumb: {
    position: 'absolute',
    left: '70%',
    top: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.lime,
    borderWidth: 3,
    borderColor: colors.ink,
  },
  sliderLabels: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(251,246,235,0.45)',
    fontWeight: '800',
  },
  footer: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 26,
  },
});

