import { StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../theme/tokens';

export function Pill({ label, tone = 'lime', style }) {
  const v = tones[tone] ?? tones.lime;
  return (
    <View style={[styles.base, v.base, style]}>
      <Text style={[styles.text, v.text]}>{label}</Text>
    </View>
  );
}

const tones = {
  lime: { base: { backgroundColor: colors.lime }, text: { color: colors.ink } },
  purple: { base: { backgroundColor: colors.purple }, text: { color: colors.white } },
  coral: { base: { backgroundColor: colors.coral }, text: { color: colors.ink } },
  ink: { base: { backgroundColor: colors.ink }, text: { color: colors.cream } },
  glass: {
    base: { backgroundColor: 'rgba(255,255,255,0.18)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)' },
    text: { color: colors.white },
  },
};

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radii.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
});

