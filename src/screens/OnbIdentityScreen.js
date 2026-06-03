import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '../components/Screen';
import { RMButton } from '../components/RMButton';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

const STORIES = [
  { id: 'dark', label: 'Dark Academia',        gradient: ['#2B1B69', '#16102E'], ink: colors.lime,  mood: 'velvet · ivy · candle' },
  { id: 'cozy', label: 'Cozy Fantasy',         gradient: ['#FF7E6B', '#FBF6EB'], ink: colors.ink,   mood: 'tea · hearth · familiar' },
  { id: 'psyc', label: 'Psychological',        gradient: ['#7C5BFF', '#E8E0FF'], ink: colors.ink,   mood: 'unreliable · interior' },
  { id: 'emo',  label: 'Emotional Narratives', gradient: ['#FF7E6B', '#7C5BFF'], ink: colors.cream, mood: 'heart · ache · home' },
  { id: 'phi',  label: 'Philosophical',        gradient: ['#16102E', '#3A2F5C'], ink: colors.lime,  mood: 'idea · paradox · slow' },
  { id: 'thr',  label: 'Fast Thrillers',       gradient: ['#D4FF3D', '#94B82A'], ink: colors.ink,   mood: 'pulse · cliff · grip' },
  { id: 'sci',  label: 'Sci-Fi Worlds',        gradient: ['#7C5BFF', '#16102E'], ink: colors.lime,  mood: 'orbit · code · soft' },
  { id: 'char', label: 'Character-driven',     gradient: ['#FBF6EB', '#F0E6D2'], ink: colors.ink,   mood: 'voice · arc · life' },
];

const GENRES = [
  { id: 'lit', label: 'Literary',  color: colors.purple },
  { id: 'fan', label: 'Fantasy',   color: colors.lime },
  { id: 'sci', label: 'Sci-Fi',    color: colors.coral },
  { id: 'mys', label: 'Mystery',   color: colors.lavender },
  { id: 'rom', label: 'Romance',   color: colors.cream },
  { id: 'mem', label: 'Memoir',    color: colors.white },
  { id: 'his', label: 'History',   color: colors.purple },
  { id: 'hor', label: 'Horror',    color: colors.coral },
  { id: 'ess', label: 'Essays',    color: colors.lime },
  { id: 'poe', label: 'Poetry',    color: colors.lavender },
  { id: 'cli', label: 'Climate',   color: colors.white },
  { id: 'pol', label: 'Politics',  color: colors.cream },
];

const AUTHORS = [
  { name: 'Han Kang',          tag: 'lit · korean · quiet',  color: colors.purple, dark: false },
  { name: 'Ursula K. Le Guin', tag: 'sci-fi · ethics',       color: colors.lime,   dark: false },
  { name: 'Italo Calvino',     tag: 'magical · meta',        color: colors.coral,  dark: false },
  { name: 'Donna Tartt',       tag: 'dark academia',         color: colors.ink,    dark: true  },
];

export function OnbIdentityScreen({ navigation }) {
  const [pickedStories, setPickedStories] = useState(() => new Set(['dark', 'psyc', 'sci']));
  const [pickedGenres, setPickedGenres] = useState(() => new Set(['lit', 'sci', 'ess']));
  const [authorRatings, setAuthorRatings] = useState({ 0: 3, 1: 2, 2: 1, 3: 0 });
  const [authorQuery, setAuthorQuery] = useState('');

  const canContinue = pickedStories.size >= 1 && pickedGenres.size >= 1;

  function toggleStory(id) {
    setPickedStories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleGenre(id) {
    setPickedGenres((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function setRating(authorIdx, star) {
    setAuthorRatings((prev) => ({ ...prev, [authorIdx]: prev[authorIdx] === star ? 0 : star }));
  }

  return (
    <Screen
      backgroundColor={colors.cream}
      footer={
        <RMButton
          title="Continue · Behavior"
          variant={canContinue ? 'dark' : 'ghost'}
          onPress={() => canContinue && navigation.navigate(routes.OnbBehavior)}
        />
      }
    >
      {/* Progress */}
      <View style={styles.progress}>
        <View style={styles.dots}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={[styles.dot, i <= 1 ? styles.dotOn : styles.dotOff]} />
          ))}
        </View>
        <Text style={styles.stepLabel}>01 / 04</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.kicker}>★ Chapter one</Text>
        <Text style={styles.title}>
          Your literary{'\n'}
          <Text style={styles.titleItalic}>identity</Text>
        </Text>
      </View>

      {/* Q1 — Story types */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Stories that pull you in</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{pickedStories.size} ↑</Text>
          </View>
        </View>
        <Text style={styles.sectionHint}>TAP ANY · MULTI-SELECT</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storyScroll} contentContainerStyle={styles.storyScrollContent}>
          {STORIES.map((s) => {
            const on = pickedStories.has(s.id);
            return (
              <Pressable key={s.id} onPress={() => toggleStory(s.id)}>
                <LinearGradient colors={s.gradient} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }} style={[styles.storyCard, on && styles.storyCardActive]}>
                  {on && (
                    <View style={styles.storyCheck}>
                      <Text style={styles.storyCheckText}>✓</Text>
                    </View>
                  )}
                  <Text style={[styles.storyLabel, { color: s.ink }]}>{s.label}</Text>
                  <Text style={[styles.storyMood, { color: s.ink }]}>{s.mood}</Text>
                </LinearGradient>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Q2 — Genres */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorite genres</Text>
        <Text style={styles.sectionHint}>3+ RECOMMENDED</Text>
        <View style={styles.genreChips}>
          {GENRES.map((g, i) => {
            const on = pickedGenres.has(g.id);
            return (
              <Pressable key={g.id} onPress={() => toggleGenre(g.id)} style={[styles.genreChip, on && { backgroundColor: g.color, borderColor: colors.ink, borderWidth: 1.5 }]}>
                <Text style={[styles.genreChipText, on && { fontWeight: '900' }]}>{g.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Q3 — Authors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Authors you trust</Text>
        <Text style={styles.sectionHint}>SEARCH OR PICK SUGGESTED</Text>
        <View style={styles.authorSearch}>
          <View style={styles.authorSearchIcon}>
            <Text style={styles.authorSearchIconText}>◔</Text>
          </View>
          <TextInput value={authorQuery} onChangeText={setAuthorQuery} placeholder="Search by name…" placeholderTextColor="rgba(22,16,46,0.45)" style={styles.authorSearchInput} />
        </View>
        <View style={styles.authorList}>
          {AUTHORS.map((a, i) => (
            <View key={a.name} style={[styles.authorRow, a.dark && styles.authorRowDark]}>
              <View style={[styles.authorAvatar, { backgroundColor: a.color }]}>
                <Text style={[styles.authorAvatarText, { color: a.dark ? colors.lime : colors.ink }]}>{a.name.charAt(0)}</Text>
              </View>
              <View style={styles.authorInfo}>
                <Text style={[styles.authorName, a.dark && { color: colors.cream }]}>{a.name}</Text>
                <Text style={[styles.authorTag, a.dark && { color: 'rgba(251,246,235,0.6)' }]}>{a.tag}</Text>
              </View>
              <View style={styles.stars}>
                {[1, 2, 3].map((n) => {
                  const filled = n <= (authorRatings[i] ?? 0);
                  return (
                    <Pressable key={n} onPress={() => setRating(i, n)} style={[styles.star, { backgroundColor: filled ? colors.lime : a.dark ? 'rgba(255,255,255,0.08)' : 'rgba(22,16,46,0.06)' }]}>
                      <Text style={[styles.starText, { color: filled ? colors.ink : 'rgba(22,16,46,0.3)' }]}>★</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  progress: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 22, paddingTop: 18, paddingBottom: 20 },
  dots: { flexDirection: 'row', gap: 4 },
  dot: { width: 32, height: 4, borderRadius: 2 },
  dotOn: { backgroundColor: colors.ink },
  dotOff: { backgroundColor: 'rgba(22,16,46,0.15)' },
  stepLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1.4, color: 'rgba(22,16,46,0.5)' },
  header: { paddingHorizontal: 22, paddingBottom: 22 },
  kicker: { fontSize: 10, fontWeight: '800', letterSpacing: 2, textTransform: 'uppercase', color: colors.purple, marginBottom: 8 },
  title: { fontSize: 40, fontWeight: '900', color: colors.ink, letterSpacing: -1, lineHeight: 42 },
  titleItalic: { fontStyle: 'italic', fontWeight: '400', color: colors.purple },
  section: { paddingHorizontal: 22, marginBottom: 26 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: colors.ink, letterSpacing: -0.3 },
  sectionHint: { fontSize: 9, fontWeight: '800', letterSpacing: 1.2, color: 'rgba(22,16,46,0.4)', textTransform: 'uppercase', marginBottom: 14 },
  countBadge: { borderRadius: radii.pill, paddingVertical: 4, paddingHorizontal: 10, backgroundColor: colors.ink },
  countBadgeText: { fontSize: 11, fontWeight: '900', color: colors.cream, letterSpacing: 0.4 },
  storyScroll: { marginHorizontal: -22 },
  storyScrollContent: { paddingHorizontal: 22, gap: 10 },
  storyCard: { width: 152, height: 196, borderRadius: 22, padding: 14, justifyContent: 'space-between', overflow: 'hidden' },
  storyCardActive: { elevation: 8, shadowColor: colors.ink, shadowOpacity: 0.25, shadowRadius: 18, shadowOffset: { width: 0, height: 8 } },
  storyCheck: { position: 'absolute', top: 10, right: 10, width: 24, height: 24, borderRadius: 12, backgroundColor: colors.lime, alignItems: 'center', justifyContent: 'center' },
  storyCheckText: { fontSize: 13, fontWeight: '900', color: colors.ink },
  storyLabel: { fontSize: 22, fontWeight: '900', letterSpacing: -0.5, lineHeight: 24, marginTop: 28 },
  storyMood: { fontSize: 9, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', opacity: 0.7 },
  genreChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  genreChip: { borderRadius: radii.pill, paddingVertical: 10, paddingHorizontal: 14, backgroundColor: colors.white, borderWidth: 1, borderColor: 'rgba(22,16,46,0.12)' },
  genreChipText: { fontSize: 13, fontWeight: '600', color: colors.ink },
  authorSearch: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 14, backgroundColor: colors.white, borderWidth: 1, borderColor: 'rgba(22,16,46,0.08)', marginBottom: 10 },
  authorSearchIcon: { width: 24, height: 24, borderRadius: 8, backgroundColor: colors.mist, alignItems: 'center', justifyContent: 'center' },
  authorSearchIconText: { fontSize: 14, color: colors.purple },
  authorSearchInput: { flex: 1, fontSize: 14, color: colors.ink, fontWeight: '600' },
  authorList: { gap: 8 },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: radii.md, backgroundColor: colors.white, borderWidth: 1, borderColor: 'rgba(22,16,46,0.05)' },
  authorRowDark: { backgroundColor: colors.ink, borderColor: colors.ink, elevation: 4 },
  authorAvatar: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  authorAvatarText: { fontSize: 18, fontWeight: '900' },
  authorInfo: { flex: 1, minWidth: 0 },
  authorName: { fontSize: 14, fontWeight: '900', color: colors.ink, letterSpacing: -0.2 },
  authorTag: { fontSize: 10, fontWeight: '700', color: 'rgba(22,16,46,0.55)', letterSpacing: 0.4, marginTop: 2 },
  stars: { flexDirection: 'row', gap: 4 },
  star: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  starText: { fontSize: 11, fontWeight: '900' },
});
