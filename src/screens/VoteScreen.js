import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { Pill } from '../components/Pill';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { BOOKS, MEMBERS } from '../data/sample';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function VoteScreen({ navigation }) {
  const [card, setCard] = useState(0);
  const book = BOOKS[card % BOOKS.length];
  const next = BOOKS[(card + 1) % BOOKS.length];

  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>
      <TopBar title="Group vote" subtitle="Pick your next read together" onBack={() => navigation.goBack()} right={<Pill label="3 / 5 IN" tone="ink" />} />

      <View style={styles.header}>
        <Text style={styles.h1}>
          Pick your next{'\n'}read together
        </Text>
        <Text style={styles.meta}>Closes Thu 9pm · 3 of 5 voted</Text>
        <View style={styles.members}>
          {MEMBERS.slice(0, 5).map((m, i) => (
            <View key={m.id} style={{ marginLeft: i === 0 ? 0 : -6 }}>
              <Avatar m={m} size={24} ring={i < 3 ? 1 : 0} />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.stack}>
        <View style={styles.backCard}>
          <LinearGradient colors={next.gradient} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }} style={styles.backCover} />
          <View style={styles.backBody}>
            <Text style={styles.backTitle} numberOfLines={1}>
              {next.title}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <LinearGradient colors={book.gradient} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }} style={styles.cover}>
            <View style={styles.matchPill}>
              <Text style={styles.matchText}>✦ {book.match}% MATCH</Text>
            </View>
            <View style={styles.coverText}>
              <Text style={[styles.coverTitle, { color: book.ink }]}>{book.title}</Text>
              <Text style={[styles.coverAuthor, { color: book.ink }]}>{book.author}</Text>
            </View>
          </LinearGradient>
          <View style={styles.body}>
            <View style={styles.tags}>
              <Pill label={book.genre} tone="coral" />
              <Pill label={book.complexity} tone="glass" style={{ backgroundColor: colors.mist, borderColor: 'rgba(22,16,46,0.06)' }} />
              <Pill label={`${book.pages}p`} tone="glass" style={{ backgroundColor: colors.mist, borderColor: 'rgba(22,16,46,0.06)' }} />
            </View>
            <Text style={styles.summary}>{book.summary}</Text>
            <Pressable onPress={() => navigation.navigate(routes.Explain)} style={styles.reactions}>
              <Text style={styles.reactionsKicker}>so far</Text>
              <View style={styles.reactionRow}>
                {[
                  { g: '✦', n: 2 },
                  { g: '♡', n: 1 },
                  { g: '◐', n: 1 },
                ].map((r) => (
                  <View key={r.g} style={styles.reactionPill}>
                    <Text style={styles.reactionGlyph}>{r.g}</Text>
                    <Text style={styles.reactionNum}>{r.n}</Text>
                  </View>
                ))}
              </View>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.hints}>
        <Text style={styles.hint}>← pass</Text>
        <View style={styles.hintLine} />
        <Text style={styles.hint}>in →</Text>
      </View>

      <View style={styles.actions}>
        <ActionButton label="✕" bg={colors.white} fg={colors.ink} onPress={() => setCard((c) => c + 1)} />
        <ActionButton label="♡" bg={colors.lavender} fg={colors.ink} onPress={() => navigation.navigate(routes.Book)} size={44} />
        <ActionButton label="✦" bg={colors.ink} fg={colors.lime} onPress={() => navigation.navigate(routes.Sync)} size={64} shadow />
        <ActionButton label="☐" bg={colors.coral} fg={colors.ink} onPress={() => navigation.navigate(routes.CreateGroup)} size={44} />
        <ActionButton label="→" bg={colors.lime} fg={colors.ink} onPress={() => setCard((c) => c + 1)} />
      </View>
    </Screen>
  );
}

function ActionButton({ label, bg, fg, onPress, size = 52, shadow = false }) {
  return (
    <Pressable onPress={onPress} style={[styles.act, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg }, shadow ? styles.actShadow : null]}>
      <Text style={[styles.actText, { color: fg, fontSize: size * 0.32 }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 22,
    paddingBottom: 12,
  },
  h1: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.6,
    lineHeight: 30,
  },
  meta: {
    marginTop: 8,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.5)',
    fontWeight: '700',
  },
  members: {
    marginTop: 10,
    flexDirection: 'row',
  },
  stack: {
    marginTop: 10,
    height: 480,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backCard: {
    position: 'absolute',
    top: 14,
    width: 280,
    height: 430,
    borderRadius: radii.xl,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
    transform: [{ scale: 0.95 }],
    overflow: 'hidden',
  },
  backCover: {
    height: 240,
  },
  backBody: {
    padding: 16,
  },
  backTitle: {
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.2,
  },
  card: {
    width: 280,
    height: 460,
    borderRadius: radii.xl,
    backgroundColor: colors.white,
    overflow: 'hidden',
    shadowColor: colors.ink,
    shadowOpacity: 0.18,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 18 },
    elevation: 6,
  },
  cover: {
    height: 260,
  },
  matchPill: {
    position: 'absolute',
    top: 16,
    left: 16,
    borderRadius: 999,
    backgroundColor: colors.ink,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  matchText: {
    color: colors.lime,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  coverText: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 22,
  },
  coverTitle: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.6,
    lineHeight: 28,
  },
  coverAuthor: {
    marginTop: 6,
    fontStyle: 'italic',
    fontSize: 16,
    fontWeight: '600',
  },
  body: {
    padding: 18,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  summary: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.inkSoft,
    fontWeight: '600',
  },
  reactions: {
    marginTop: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: radii.md,
    backgroundColor: colors.mist,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reactionsKicker: {
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.6)',
    fontWeight: '900',
  },
  reactionRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  reactionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.05)',
  },
  reactionGlyph: {
    color: colors.ink,
    fontWeight: '900',
  },
  reactionNum: {
    color: colors.ink,
    fontWeight: '900',
  },
  hints: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  hint: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.45)',
    fontWeight: '800',
  },
  hintLine: {
    width: 24,
    height: 1,
    backgroundColor: 'rgba(22,16,46,0.15)',
  },
  actions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    alignItems: 'center',
  },
  act: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actShadow: {
    shadowColor: colors.ink,
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  actText: {
    fontWeight: '900',
  },
});

