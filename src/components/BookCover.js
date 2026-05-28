import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../theme/tokens';

export function BookCover({ book, w = 120, h = 168, tilt = 0, sticker = null, style }) {
  return (
    <View style={[{ width: w, height: h, transform: tilt ? [{ rotate: `${tilt}deg` }] : undefined }, style]}>
      <LinearGradient
        colors={book.gradient}
        start={{ x: 0.1, y: 0.0 }}
        end={{ x: 0.9, y: 1.0 }}
        style={[styles.card, { borderRadius: radii.xs }]}
      >
        <View style={styles.spine} />
        <View style={styles.inner}>
          <Text
            numberOfLines={3}
            style={[
              styles.title,
              {
                color: book.ink,
                fontSize: Math.round(w * 0.13),
              },
            ]}
          >
            {book.title}
          </Text>
          <View style={styles.bottom}>
            <Text
              numberOfLines={1}
              style={[
                styles.genre,
                {
                  color: book.ink,
                  fontSize: Math.round(w * 0.06),
                },
              ]}
            >
              {book.genre.toUpperCase()}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                styles.author,
                {
                  color: book.ink,
                  fontSize: Math.round(w * 0.085),
                },
              ]}
            >
              {book.author}
            </Text>
          </View>
        </View>
        {sticker}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    overflow: 'hidden',
    shadowColor: colors.ink,
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  spine: {
    position: 'absolute',
    left: 8,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  inner: {
    flex: 1,
    paddingTop: 14,
    paddingBottom: 12,
    paddingRight: 12,
    paddingLeft: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '900',
    letterSpacing: -0.4,
    lineHeight: 22,
  },
  bottom: {
    gap: 2,
  },
  genre: {
    opacity: 0.7,
    letterSpacing: 1.6,
    fontWeight: '700',
  },
  author: {
    fontStyle: 'italic',
    fontWeight: '600',
  },
});

