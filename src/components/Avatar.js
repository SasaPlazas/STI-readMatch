import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/tokens';

export function Avatar({ m, size = 32, ring = 0, style }) {
  const ringSize = ring ? size + ring * 2 : size;
  return (
    <View style={[ring ? { width: ringSize, height: ringSize, borderRadius: ringSize / 2, backgroundColor: m.hue, padding: ring } : null, style]}>
      <View
        style={[
          styles.base,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: m.hue,
            shadowColor: colors.ink,
            shadowOpacity: 0.12,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
            borderWidth: 2,
            borderColor: colors.white,
          },
        ]}
      >
        <Text style={[styles.text, { fontSize: size * 0.45 }]}>{m.initial}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '900',
    color: colors.ink,
  },
});
