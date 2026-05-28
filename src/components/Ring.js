import Svg, { Circle } from 'react-native-svg';
import { StyleSheet, Text, View } from 'react-native';

export function Ring({ value = 80, size = 56, stroke = 5, color = '#D4FF3D', track = 'rgba(255,255,255,0.18)', textColor = '#fff', style }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;

  return (
    <View style={[styles.wrap, { width: size, height: size }, style]}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={off}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.textWrap}>
        <Text style={[styles.value, { color: textColor, fontSize: size * 0.32 }]}>
          {value}
          <Text style={{ fontSize: size * 0.18, opacity: 0.7 }}>%</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
  },
  textWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontWeight: '900',
    letterSpacing: -0.2,
  },
});

