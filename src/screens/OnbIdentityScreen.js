import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../components/Screen';
import { RMButton } from '../components/RMButton';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

const GENRES = ['Fantasy', 'Sci‑Fi', 'Mystery', 'Romance', 'History', 'Poetry', 'Horror', 'Climate', 'Politics'];

export function OnbIdentityScreen({ navigation }) {
  const [picked, setPicked] = useState(() => new Set(['Fantasy', 'Sci‑Fi']));
  const [query, setQuery] = useState('');
  const canContinue = picked.size >= 2;

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GENRES;
    return GENRES.filter((g) => g.toLowerCase().includes(q));
  }, [query]);

  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.step}>CHAPTER ONE</Text>
        <Text style={styles.title}>
          Your literary{'\n'}
          <Text style={styles.italic}>identity</Text>
        </Text>
        <Text style={styles.subtitle}>Pick genres that pull you in</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Top genres</Text>
        <View style={styles.chips}>
          {list.map((g) => {
            const active = picked.has(g);
            return (
              <Pressable
                key={g}
                onPress={() => {
                  setPicked((prev) => {
                    const next = new Set(prev);
                    if (next.has(g)) next.delete(g);
                    else next.add(g);
                    return next;
                  });
                }}
                style={[styles.chip, active ? styles.chipActive : null]}
              >
                <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>{g}</Text>
              </Pressable>
            );
          })}
        </View>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search by name…"
          placeholderTextColor="rgba(22,16,46,0.35)"
          style={styles.search}
        />
      </View>

      <View style={styles.footer}>
        <RMButton title="Continue · Behavior" variant={canContinue ? 'primary' : 'ghost'} onPress={() => (canContinue ? navigation.navigate(routes.OnbBehavior) : null)} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 120,
  },
  header: {
    paddingTop: 26,
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
    fontSize: 40,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -1,
    lineHeight: 42,
  },
  italic: {
    fontStyle: 'italic',
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 10,
    color: 'rgba(22,16,46,0.7)',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    marginTop: 18,
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
    marginBottom: 10,
    fontSize: 14,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderRadius: radii.pill,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.08)',
  },
  chipActive: {
    backgroundColor: colors.purple,
    borderColor: colors.purple,
  },
  chipText: {
    fontWeight: '800',
    color: colors.ink,
    fontSize: 12,
  },
  chipTextActive: {
    color: colors.white,
  },
  search: {
    marginTop: 14,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.cream,
    paddingHorizontal: 12,
    color: colors.ink,
    fontWeight: '700',
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  footer: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 26,
  },
});

