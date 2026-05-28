import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { BookCover } from '../components/BookCover';
import { RMButton } from '../components/RMButton';
import { BOOKS } from '../data/sample';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function OnbBehaviorScreen({ navigation }) {
  const top = [BOOKS[2], BOOKS[3], BOOKS[0], BOOKS[5]];

  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>
      <TopBar subtitle="Chapter Two" title="Reading history" onBack={() => navigation.goBack()} />

      <View style={styles.block}>
        <Text style={styles.h2}>Your top 5 ever</Text>
        <Text style={styles.hint}>Tap to preview · Drag-to-rank later</Text>
      </View>

      <View style={styles.list}>
        {top.map((b, i) => (
          <View key={b.id} style={styles.row}>
            <Text style={styles.rank}>{i + 1}</Text>
            <BookCover book={b} w={44} h={64} tilt={0} />
            <View style={styles.rowText}>
              <Text style={styles.rowTitle} numberOfLines={1}>
                {b.title}
              </Text>
              <Text style={styles.rowMeta} numberOfLines={1}>
                {b.author}
              </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: i === 0 ? colors.lime : colors.lavender }]}>
              <Text style={styles.badgeText}>{i === 0 ? 'Comfort read' : i === 1 ? 'Mind-expanding' : 'Life‑changing'}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <RMButton title="Continue · Personality" onPress={() => navigation.navigate(routes.OnbPersonality)} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 120,
  },
  block: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 12,
  },
  h2: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  hint: {
    marginTop: 6,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.45)',
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: 22,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  rank: {
    width: 24,
    textAlign: 'center',
    fontWeight: '900',
    color: colors.ink,
  },
  rowText: {
    flex: 1,
    minWidth: 0,
  },
  rowTitle: {
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.2,
  },
  rowMeta: {
    marginTop: 2,
    fontStyle: 'italic',
    color: 'rgba(22,16,46,0.65)',
    fontWeight: '600',
    fontSize: 12,
  },
  badge: {
    borderRadius: radii.pill,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: 0.4,
  },
  footer: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 26,
  },
});

