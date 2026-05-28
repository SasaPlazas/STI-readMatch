import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { BookCover } from '../components/BookCover';
import { Pill } from '../components/Pill';
import { RMButton } from '../components/RMButton';
import { BOOKS } from '../data/sample';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function BookScreen({ navigation }) {
  const book = BOOKS[1];

  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>
      <TopBar subtitle={`Book · ${book.genre}`} title={book.title} onBack={() => navigation.goBack()} />

      <View style={styles.hero}>
        <BookCover book={book} w={160} h={228} tilt={-2} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <View style={styles.pills}>
            <Pill label={`${book.pages} pages`} tone="lime" />
            <Pill label={`Complexity: ${book.complexity}`} tone="purple" />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Summary</Text>
        <Text style={styles.body}>{book.summary}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>What your group gets</Text>
        <View style={styles.bullets}>
          {[
            'High overlap on prose style and essay tolerance.',
            'Novelty boost without breaking the group mood.',
            'Good discussion density (themes & structure).',
          ].map((t) => (
            <View key={t} style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <RMButton title="See compatibility →" onPress={() => navigation.navigate(routes.Compatibility)} />
        <RMButton title="Read AI reasoning" variant="dark" onPress={() => navigation.navigate(routes.Explain)} style={{ marginTop: 10 }} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 140,
  },
  hero: {
    paddingHorizontal: 22,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingTop: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.4,
  },
  author: {
    marginTop: 6,
    fontStyle: 'italic',
    color: 'rgba(22,16,46,0.65)',
    fontWeight: '600',
  },
  pills: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  card: {
    marginTop: 14,
    marginHorizontal: 22,
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  cardTitle: {
    fontWeight: '900',
    color: colors.ink,
    fontSize: 14,
    letterSpacing: -0.2,
  },
  body: {
    marginTop: 10,
    color: 'rgba(22,16,46,0.75)',
    fontWeight: '600',
    lineHeight: 18,
  },
  bullets: {
    marginTop: 10,
    gap: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  bulletDot: {
    width: 10,
    height: 10,
    borderRadius: 4,
    backgroundColor: colors.purple,
    marginTop: 4,
  },
  bulletText: {
    flex: 1,
    color: 'rgba(22,16,46,0.75)',
    fontWeight: '600',
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 26,
  },
});

