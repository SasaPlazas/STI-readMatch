import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Screen } from "../components/Screen";
import { RMButton } from "../components/RMButton";
import { insertUserWeights, upsertUserPreferences } from "../utils/userStorage";
import { colors, radii } from "../theme/tokens";
import { routes } from "../navigation/routes";

const STORIES = [
  { id: "dark", label: "Dark Academia", gradient: ["#2B1B69", "#16102E"], ink: colors.lime, mood: "velvet · ivy · candle" },
  { id: "cozy", label: "Cozy Fantasy", gradient: ["#FF7E6B", "#FBF6EB"], ink: colors.ink, mood: "tea · hearth · familiar" },
  { id: "psyc", label: "Psychological", gradient: ["#7C5BFF", "#E8E0FF"], ink: colors.ink, mood: "unreliable · interior" },
  { id: "emo", label: "Emotional Narratives", gradient: ["#FF7E6B", "#7C5BFF"], ink: colors.cream, mood: "heart · ache · home" },
  { id: "phi", label: "Philosophical", gradient: ["#16102E", "#3A2F5C"], ink: colors.lime, mood: "idea · paradox · slow" },
  { id: "thr", label: "Fast Thrillers", gradient: ["#D4FF3D", "#94B82A"], ink: colors.ink, mood: "pulse · cliff · grip" },
  { id: "sci", label: "Sci-Fi Worlds", gradient: ["#7C5BFF", "#16102E"], ink: colors.lime, mood: "orbit · code · soft" },
  { id: "char", label: "Character-driven", gradient: ["#FBF6EB", "#F0E6D2"], ink: colors.ink, mood: "voice · arc · life" },
];

const GENRES = [
  { id: "lit", label: "Literary", color: colors.purple },
  { id: "fan", label: "Fantasy", color: colors.lime },
  { id: "sci", label: "Sci-Fi", color: colors.coral },
  { id: "mys", label: "Mystery", color: colors.lavender },
  { id: "rom", label: "Romance", color: colors.cream },
  { id: "mem", label: "Memoir", color: colors.white },
  { id: "his", label: "History", color: colors.purple },
  { id: "hor", label: "Horror", color: colors.coral },
  { id: "ess", label: "Essays", color: colors.lime },
  { id: "poe", label: "Poetry", color: colors.lavender },
  { id: "cli", label: "Climate", color: colors.white },
  { id: "pol", label: "Politics", color: colors.cream },
];

const AVATAR_PALETTE = [colors.purple, colors.lime, colors.coral, colors.lavender, "#7C5BFF", colors.ink];

export function OnbIdentityScreen({ navigation }) {
  const [pickedStories, setPickedStories] = useState(() => new Set(["dark", "psyc", "sci"]));
  const [pickedGenres, setPickedGenres] = useState(() => new Set());
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [authorQuery, setAuthorQuery] = useState("");
  const [authorResults, setAuthorResults] = useState([]);
  const [authorSearching, setAuthorSearching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const savingRef = useRef(false);
  const selectedAuthorsRef = useRef(selectedAuthors);

  useEffect(() => {
    selectedAuthorsRef.current = selectedAuthors;
  }, [selectedAuthors]);

  const canContinue = selectedAuthors.length >= 1 && pickedGenres.size >= 2 && !saving;

  useEffect(() => {
    if (authorQuery.length < 3) {
      setAuthorResults([]);
      setAuthorSearching(false);
      return;
    }
    setAuthorSearching(true);
    const timer = setTimeout(async () => {
      try {
        const url = `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(authorQuery)}&limit=8`;
        const res = await fetch(url);
        const data = await res.json();
        const already = new Set(selectedAuthorsRef.current.map((a) => a.key));
        setAuthorResults(
          (data.docs ?? [])
            .map((d) => ({ key: d.key, name: d.name }))
            .filter((a) => a.name && !already.has(a.key))
            .slice(0, 8)
        );
      } catch {
        setAuthorResults([]);
      } finally {
        setAuthorSearching(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [authorQuery]);

  function addAuthor(author) {
    setSelectedAuthors((prev) => {
      if (prev.some((a) => a.key === author.key)) return prev;
      const color = AVATAR_PALETTE[prev.length % AVATAR_PALETTE.length];
      return [...prev, { ...author, rating: 1, color }];
    });
    setAuthorQuery("");
    setAuthorResults([]);
  }

  function removeAuthor(key) {
    setSelectedAuthors((prev) => prev.filter((a) => a.key !== key));
  }

  function setAuthorRating(key, stars) {
    setSelectedAuthors((prev) =>
      prev.map((a) => (a.key === key ? { ...a, rating: a.rating === stars ? 1 : stars } : a))
    );
  }

  function toggleStory(id) {
    setPickedStories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleGenre(id) {
    setPickedGenres((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const onPressContinue = async () => {
    if (savingRef.current || !canContinue) return;
    savingRef.current = true;
    setSaving(true);
    setError("");
    let shouldNavigate = true;
    try {
      const selectedGenres = GENRES.filter((g) => pickedGenres.has(g.id)).map((g) => g.label);
      const selectedStyles = STORIES.filter((s) => pickedStories.has(s.id)).map((s) => s.label);
      const authorNames = selectedAuthors.map((a) => a.name);

      try {
        await upsertUserPreferences({
          favorite_genres: selectedGenres,
          favorite_authors: authorNames,
          narrative_styles: selectedStyles,
        });
      } catch (e) {
        const msg = e?.message ?? "";
        const isConflict =
          msg.includes("ON CONFLICT") ||
          msg.includes("duplicate key") ||
          msg.includes("unique or exclusion constraint");
        if (!isConflict) throw e;
      }

      const weights = [
        ...Array.from(pickedStories).map((id) => ({
          category: "style",
          item: STORIES.find((s) => s.id === id)?.label ?? id,
          score: 1,
        })),
        ...Array.from(pickedGenres).map((id) => ({
          category: "genre",
          item: GENRES.find((g) => g.id === id)?.label ?? id,
          score: 1,
        })),
        ...selectedAuthors.map((a) => ({
          category: "author",
          item: a.name,
          score: a.rating,
        })),
      ];

      try {
        await insertUserWeights(weights);
      } catch (e) {
        const msg = e?.message ?? "";
        const isContinueError =
          e?.status === 403 ||
          e?.status === 400 ||
          msg.includes("Bad Request") ||
          msg.includes("RLS") ||
          msg.includes("row-level security") ||
          msg.includes("new row violates") ||
          msg.includes("policy");
        if (!isContinueError) throw e;
      }
    } catch (e) {
      setError(e?.message || "No se pudieron guardar tus preferencias");
      shouldNavigate = false;
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
    if (shouldNavigate) navigation.navigate(routes.OnbBehavior);
  };

  const validationMsg = !canContinue
    ? selectedAuthors.length === 0 && pickedGenres.size < 2
      ? "Selecciona al menos 1 autor y 2 géneros para continuar"
      : selectedAuthors.length === 0
      ? "Busca y selecciona al menos 1 autor para continuar"
      : "Selecciona al menos 2 géneros para continuar"
    : "";

  return (
    <Screen
      backgroundColor={colors.cream}
      footer={
        <View style={{ gap: 8 }}>
          {validationMsg ? (
            <Text style={styles.validationHint}>{validationMsg}</Text>
          ) : null}
          <RMButton
            title={saving ? "Guardando…" : "Continue · Behavior"}
            variant={canContinue && !saving ? "dark" : "ghost"}
            disabled={!canContinue || saving}
            onPress={onPressContinue}
          />
        </View>
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
          Your literary{"\n"}
          <Text style={styles.titleItalic}>identity</Text>
        </Text>
      </View>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* Q1 — Story types */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Stories that pull you in</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{pickedStories.size} ↑</Text>
          </View>
        </View>
        <Text style={styles.sectionHint}>TAP ANY · MULTI-SELECT</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storyScroll}
          contentContainerStyle={styles.storyScrollContent}
        >
          {STORIES.map((s) => {
            const on = pickedStories.has(s.id);
            return (
              <Pressable key={s.id} onPress={() => toggleStory(s.id)}>
                <LinearGradient
                  colors={s.gradient}
                  start={{ x: 0.1, y: 0 }}
                  end={{ x: 0.9, y: 1 }}
                  style={[styles.storyCard, on && styles.storyCardActive]}
                >
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
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Favorite genres</Text>
          {pickedGenres.size > 0 && (
            <View style={[styles.countBadge, pickedGenres.size >= 2 && styles.countBadgeOk]}>
              <Text style={[styles.countBadgeText, pickedGenres.size >= 2 && { color: colors.ink }]}>
                {pickedGenres.size} ✓
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.sectionHint}>2+ REQUERIDOS · MULTI-SELECT</Text>
        <View style={styles.genreChips}>
          {GENRES.map((g) => {
            const on = pickedGenres.has(g.id);
            return (
              <Pressable
                key={g.id}
                onPress={() => toggleGenre(g.id)}
                style={[styles.genreChip, on && { backgroundColor: g.color, borderColor: colors.ink, borderWidth: 1.5 }]}
              >
                <Text style={[styles.genreChipText, on && { fontWeight: "900" }]}>{g.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Q3 — Authors */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Authors you trust</Text>
          {selectedAuthors.length > 0 && (
            <View style={styles.countBadgeOk}>
              <Text style={[styles.countBadgeText, { color: colors.ink }]}>{selectedAuthors.length} ✓</Text>
            </View>
          )}
        </View>
        <Text style={styles.sectionHint}>BÚSQUEDA REAL · 3+ CARACTERES</Text>

        {/* Search box */}
        <View style={styles.authorSearch}>
          <View style={styles.authorSearchIcon}>
            <Text style={styles.authorSearchIconText}>◔</Text>
          </View>
          <TextInput
            value={authorQuery}
            onChangeText={setAuthorQuery}
            placeholder="Search by name…"
            placeholderTextColor="rgba(22,16,46,0.45)"
            style={styles.authorSearchInput}
            autoCorrect={false}
          />
          {authorSearching ? (
            <ActivityIndicator size="small" color={colors.purple} />
          ) : authorQuery.length > 0 ? (
            <Pressable onPress={() => { setAuthorQuery(""); setAuthorResults([]); }}>
              <Text style={styles.clearBtn}>✕</Text>
            </Pressable>
          ) : null}
        </View>

        {/* Results */}
        {authorResults.length > 0 && (
          <View style={styles.resultsBox}>
            {authorResults.map((a) => (
              <Pressable key={a.key} onPress={() => addAuthor(a)} style={styles.resultRow}>
                <View style={styles.resultAvatar}>
                  <Text style={styles.resultAvatarText}>{a.name.charAt(0).toUpperCase()}</Text>
                </View>
                <Text style={styles.resultName} numberOfLines={1}>{a.name}</Text>
                <Text style={styles.resultAdd}>+ Add</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Empty hint */}
        {selectedAuthors.length === 0 && authorResults.length === 0 && !authorSearching && (
          <View style={styles.emptyAuthors}>
            <Text style={styles.emptyAuthorsText}>
              Escribe el nombre de un autor para buscarlo en Open Library
            </Text>
          </View>
        )}

        {/* Selected authors */}
        {selectedAuthors.length > 0 && (
          <View style={styles.authorList}>
            {selectedAuthors.map((a) => {
              const isDark = a.color === colors.ink;
              return (
                <View key={a.key} style={[styles.authorRow, isDark && styles.authorRowDark]}>
                  <View style={[styles.authorAvatar, { backgroundColor: a.color }]}>
                    <Text style={[styles.authorAvatarText, { color: isDark ? colors.lime : colors.ink }]}>
                      {a.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.authorInfo}>
                    <Text style={[styles.authorName, isDark && { color: colors.cream }]} numberOfLines={1}>
                      {a.name}
                    </Text>
                    <Text style={[styles.authorTagLine, isDark && { color: "rgba(251,246,235,0.5)" }]}>
                      {a.rating === 1 ? "Like" : a.rating <= 3 ? "Love" : a.rating <= 4 ? "Admire" : "Obsessed"}
                    </Text>
                  </View>
                  <View style={styles.stars}>
                    {[1, 2, 3, 4, 5].map((n) => {
                      const filled = n <= a.rating;
                      return (
                        <Pressable
                          key={n}
                          onPress={() => setAuthorRating(a.key, n)}
                          style={[
                            styles.star,
                            { backgroundColor: filled ? colors.lime : isDark ? "rgba(255,255,255,0.08)" : "rgba(22,16,46,0.06)" },
                          ]}
                        >
                          <Text style={[styles.starText, { color: filled ? colors.ink : "rgba(22,16,46,0.3)" }]}>★</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                  <Pressable onPress={() => removeAuthor(a.key)} style={styles.authorRemove}>
                    <Text style={[styles.authorRemoveText, isDark && { color: "rgba(251,246,235,0.5)" }]}>✕</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  progress: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 20,
  },
  dots: { flexDirection: "row", gap: 4 },
  dot: { width: 32, height: 4, borderRadius: 2 },
  dotOn: { backgroundColor: colors.ink },
  dotOff: { backgroundColor: "rgba(22,16,46,0.15)" },
  stepLabel: { fontSize: 11, fontWeight: "700", letterSpacing: 1.4, color: "rgba(22,16,46,0.5)" },
  header: { paddingHorizontal: 22, paddingBottom: 22 },
  kicker: { fontSize: 10, fontWeight: "800", letterSpacing: 2, textTransform: "uppercase", color: colors.purple, marginBottom: 8 },
  title: { fontSize: 40, fontWeight: "900", color: colors.ink, letterSpacing: -1, lineHeight: 42 },
  titleItalic: { fontStyle: "italic", fontWeight: "400", color: colors.purple },
  errorBox: {
    marginHorizontal: 22, marginBottom: 10,
    backgroundColor: "rgba(255,126,107,0.12)", borderRadius: radii.md, padding: 12,
  },
  errorText: { fontSize: 12, fontWeight: "700", color: "#C0392B" },
  validationHint: {
    fontSize: 12, fontWeight: "700", color: "rgba(22,16,46,0.55)",
    textAlign: "center", letterSpacing: 0.1,
  },
  section: { paddingHorizontal: 22, marginBottom: 26 },
  sectionHead: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 4 },
  sectionTitle: { fontSize: 18, fontWeight: "900", color: colors.ink, letterSpacing: -0.3 },
  sectionHint: {
    fontSize: 9, fontWeight: "800", letterSpacing: 1.2,
    color: "rgba(22,16,46,0.4)", textTransform: "uppercase", marginBottom: 14,
  },
  countBadge: {
    borderRadius: radii.pill, paddingVertical: 4, paddingHorizontal: 10, backgroundColor: colors.ink,
  },
  countBadgeOk: {
    borderRadius: radii.pill, paddingVertical: 4, paddingHorizontal: 10, backgroundColor: colors.lime,
  },
  countBadgeText: { fontSize: 11, fontWeight: "900", color: colors.cream, letterSpacing: 0.4 },
  storyScroll: { marginHorizontal: -22 },
  storyScrollContent: { paddingHorizontal: 22, gap: 10 },
  storyCard: {
    width: 152, height: 196, borderRadius: 22, padding: 14,
    justifyContent: "space-between", overflow: "hidden",
  },
  storyCardActive: {
    elevation: 8, shadowColor: colors.ink, shadowOpacity: 0.25,
    shadowRadius: 18, shadowOffset: { width: 0, height: 8 },
  },
  storyCheck: {
    position: "absolute", top: 10, right: 10,
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: colors.lime, alignItems: "center", justifyContent: "center",
  },
  storyCheckText: { fontSize: 13, fontWeight: "900", color: colors.ink },
  storyLabel: { fontSize: 22, fontWeight: "900", letterSpacing: -0.5, lineHeight: 24, marginTop: 28 },
  storyMood: { fontSize: 9, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", opacity: 0.7 },
  genreChips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  genreChip: {
    borderRadius: radii.pill, paddingVertical: 10, paddingHorizontal: 14,
    backgroundColor: colors.white, borderWidth: 1, borderColor: "rgba(22,16,46,0.12)",
  },
  genreChipText: { fontSize: 13, fontWeight: "600", color: colors.ink },
  authorSearch: {
    flexDirection: "row", alignItems: "center", gap: 10, padding: 12,
    borderRadius: 14, backgroundColor: colors.white,
    borderWidth: 1, borderColor: "rgba(22,16,46,0.08)", marginBottom: 8,
  },
  authorSearchIcon: {
    width: 24, height: 24, borderRadius: 8,
    backgroundColor: colors.mist, alignItems: "center", justifyContent: "center",
  },
  authorSearchIconText: { fontSize: 14, color: colors.purple },
  authorSearchInput: { flex: 1, fontSize: 14, color: colors.ink, fontWeight: "600" },
  clearBtn: { fontSize: 14, color: "rgba(22,16,46,0.4)", fontWeight: "700", paddingHorizontal: 4 },
  resultsBox: {
    backgroundColor: colors.white, borderRadius: 14, overflow: "hidden",
    borderWidth: 1, borderColor: "rgba(22,16,46,0.08)", marginBottom: 10,
  },
  resultRow: {
    flexDirection: "row", alignItems: "center", gap: 10,
    paddingHorizontal: 12, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: "rgba(22,16,46,0.05)",
  },
  resultAvatar: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: colors.mist, alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  resultAvatarText: { fontSize: 15, fontWeight: "900", color: colors.purple },
  resultName: { flex: 1, fontSize: 13, fontWeight: "700", color: colors.ink },
  resultAdd: { fontSize: 12, fontWeight: "900", color: colors.purple },
  emptyAuthors: {
    padding: 16, borderRadius: 14,
    backgroundColor: "rgba(124,91,255,0.06)",
    borderWidth: 1, borderColor: "rgba(124,91,255,0.12)",
    alignItems: "center",
  },
  emptyAuthorsText: {
    fontSize: 13, fontWeight: "600", color: "rgba(22,16,46,0.55)",
    textAlign: "center", lineHeight: 18,
  },
  authorList: { gap: 8, marginTop: 4 },
  authorRow: {
    flexDirection: "row", alignItems: "center", gap: 10, padding: 12,
    borderRadius: radii.md, backgroundColor: colors.white,
    borderWidth: 1, borderColor: "rgba(22,16,46,0.05)",
  },
  authorRowDark: { backgroundColor: colors.ink, borderColor: colors.ink },
  authorAvatar: {
    width: 38, height: 38, borderRadius: 12,
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  authorAvatarText: { fontSize: 18, fontWeight: "900" },
  authorInfo: { flex: 1, minWidth: 0 },
  authorName: { fontSize: 13, fontWeight: "900", color: colors.ink, letterSpacing: -0.2 },
  authorTagLine: { fontSize: 10, fontWeight: "700", color: "rgba(22,16,46,0.5)", marginTop: 2 },
  stars: { flexDirection: "row", gap: 3 },
  star: { width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  starText: { fontSize: 10, fontWeight: "900" },
  authorRemove: { paddingHorizontal: 6, paddingVertical: 4 },
  authorRemoveText: { fontSize: 14, fontWeight: "700", color: "rgba(22,16,46,0.35)" },
});
