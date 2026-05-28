import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../theme/tokens';

export function RMButton({ title, onPress, variant = 'primary', right = null, style }) {
  const v = variants[variant] ?? variants.primary;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.base, v.base, pressed ? { opacity: 0.9 } : null, style]}
    >
      <Text style={[styles.title, v.title]}>{title}</Text>
      {right ? <View style={styles.right}>{right}</View> : null}
    </Pressable>
  );
}

const variants = {
  primary: {
    base: { backgroundColor: colors.lime },
    title: { color: colors.ink },
  },
  dark: {
    base: { backgroundColor: colors.ink },
    title: { color: colors.cream },
  },
  ghost: {
    base: { backgroundColor: colors.white, borderWidth: 1, borderColor: 'rgba(22,16,46,0.08)' },
    title: { color: colors.ink },
  },
};

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 18,
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  right: {
    marginLeft: 8,
  },
});

