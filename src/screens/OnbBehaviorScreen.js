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
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Screen } from "../components/Screen";
import { RMButton } from "../components/RMButton";
import {
  insertUserWeights,
  upsertBooks,
  upsertUserPreferences,
} from "../utils/userStorage";
import { colors, radii } from "../theme/tokens";
import { routes } from "../navigation/routes";
import { supabase } from "../lib/supabase";

const ITEM_HEIGHT = 128; // height of each book row including gap

const FREQ_OPTIONS = [
  { id: "daily", label: "Daily", sub: "reader · always", icon: "☼" },
  { id: "weekly", label: "Weekly", sub: "committed", icon: "◐" },
  { id: "occas", label: "Occasionally", sub: "when it calls", icon: "◌" },
  { id: "seasonal", label: "Seasonal", sub: "binge & rest", icon: "❀" },
];

const BOOK_TAGS = ["Comfort read", "Mind-expanding", "Life‑changing", "Emotional"];

function DraggableBookRow({ book, index, total, dragInfo, onReorder, onTagChange, onRemove }) {
  const handlePan = Gesture.Pan()
    .onBegin(() => {
      dragInfo.value = { active: index, dy: 0 };
    })
    .onUpdate((e) => {
      dragInfo.value = { active: index, dy: e.translationY };
    })
    .onEnd(() => {
      const { active, dy } = dragInfo.value;
      const toIdx = Math.max(0, Math.min(total - 1, Math.round(active + dy / ITEM_HEIGHT)));
      dragInfo.value = { active: -1, dy: 0 };
      runOnJS(onReorder)(active, toIdx);
    });

  const animStyle = useAnimatedStyle(() => {
    const { active, dy } = dragInfo.value;
    if (active === index) {
      return {
        transform: [{ translateY: dy }],
        zIndex: 100,
        elevation: 10,
        opacity: 0.93,
      };
    }
    if (active === -1) {
      return { transform: [{ translateY: 0 }], zIndex: 0, elevation: 0, opacity: 1 };
    }
    const hoverIdx = Math.max(0, Math.min(total - 1, Math.round(active + dy / ITEM_HEIGHT)));
    let shift = 0;
    if (active < index && index <= hoverIdx) shift = -ITEM_HEIGHT;
    else if (hoverIdx <= index && index < active) shift = ITEM_HEIGHT;
    return { transform: [{ translateY: shift }], zIndex: 0, elevation: 0, opacity: 1 };
  });

  return (
    <Animated.View style={[styles.bookRow, animStyle]}>
      <Text style={styles.rank}>{index + 1}</Text>

      <View style={styles.bookBody}>
        <Text style={styles.bookTitle} numberOfLines={1}>{book.title}</Text>
        <Text style={styles.bookMeta} numberOfLines={1}>{book.author}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tagScroll}
          contentContainerStyle={styles.tagScrollContent}
        >
          {BOOK_TAGS.map((tag) => {
            const active = book.tags?.includes(tag);
            return (
              <Pressable
                key={tag}
                onPress={() => onTagChange(index, tag)}
                style={[styles.tagChip, active && styles.tagChipActive]}
              >
                <Text style={[styles.tagText, active && styles.tagTextActive]}>{tag}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <Pressable onPress={() => onRemove(index)} style={styles.removeBtn} hitSlop={8}>
        <Text style={styles.removeBtnText}>✕</Text>
      </Pressable>

      <GestureDetector gesture={handlePan}>
        <View style={styles.dragHandle}>
          <Text style={styles.dragIcon}>⠿</Text>
        </View>
      </GestureDetector>
    </Animated.View>
  );
}

export function OnbBehaviorScreen({ navigation }) {
  const [topBooks, setTopBooks] = useState([]);
  const [bookQuery, setBookQuery] = useState("");
  const [bookResults, setBookResults] = useState([]);
  const [bookSearching, setBookSearching] = useState(false);
  const [bookNoResults, setBookNoResults] = useState(false);
  const [freq, setFreq] = useState("weekly");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const savingRef = useRef(false);
  const dragInfo = useSharedValue({ active: -1, dy: 0 });

  const canContinue = topBooks.length >= 1 && !saving;

  async function fetchFromOpenLibrary() {
    if (bookQuery.length < 3) return;
    setBookSearching(true);
    setBookNoResults(false);
    try {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(bookQuery)}&limit=8&fields=key,title,author_name,subject,first_publish_year`;
      const res = await fetch(url);
      const data = await res.json();
      const alreadyKeys = new Set(topBooks.map((b) => b.ol_key));
      setBookResults(
        (data.docs ?? [])
          .filter((d) => d.title && !alreadyKeys.has(d.key))
          .map((d) => ({
            ol_key: d.key,
            title: d.title,
            author: (d.author_name ?? [])[0] ?? "Unknown",
            genre: (d.subject ?? [])[0] ?? null,
            description: null,
            tags: [],
          }))
          .slice(0, 8)
      );
    } catch {
      setBookResults([]);
    } finally {
      setBookSearching(false);
    }
  }

  useEffect(() => {
    setBookNoResults(false);
    if (bookQuery.length < 3) {
      setBookResults([]);
      setBookSearching(false);
      return;
    }
    setBookSearching(true);
    const timer = setTimeout(async () => {
      try {
        const alreadyKeys = new Set(topBooks.map((b) => b.ol_key));
        const { data } = await supabase
          .from("books")
          .select("id, nombre_libro, autor, genero, ol_key")
          .or(`nombre_libro.ilike.%${bookQuery}%,autor.ilike.%${bookQuery}%`)
          .limit(8);
        const results = (data ?? [])
          .filter((row) => !alreadyKeys.has(row.ol_key ?? String(row.id)))
          .map((row) => ({
            ol_key: row.ol_key ?? String(row.id),
            title: row.nombre_libro,
            author: row.autor,
            genre: row.genero,
            description: null,
            tags: [],
          }));
        if (results.length === 0) {
          setBookNoResults(true);
          setBookResults([]);
        } else {
          setBookResults(results);
        }
      } catch {
        setBookResults([]);
      } finally {
        setBookSearching(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [bookQuery]);

  function addBook(book) {
    if (topBooks.length >= 5) return;
    setTopBooks((prev) => {
      if (prev.some((b) => b.ol_key === book.ol_key)) return prev;
      return [...prev, book];
    });
    setBookQuery("");
    setBookResults([]);
  }

  function removeBook(index) {
    setTopBooks((prev) => prev.filter((_, i) => i !== index));
  }

  function reorderBooks(fromIdx, toIdx) {
    if (fromIdx === toIdx) return;
    setTopBooks((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, moved);
      return next;
    });
  }

  function toggleTag(bookIndex, tag) {
    setTopBooks((prev) =>
      prev.map((b, i) => {
        if (i !== bookIndex) return b;
        const tags = b.tags ?? [];
        return {
          ...b,
          tags: tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag],
        };
      })
    );
  }

  const onPressContinue = async () => {
    if (savingRef.current || !canContinue) return;
    savingRef.current = true;
    setSaving(true);
    setError("");
    let shouldNavigate = true;
    try {
      // Insert books to books table (non-fatal)
      try {
        await upsertBooks(topBooks);
      } catch {
        // books table may not exist yet — continue anyway
      }

      const topBooksJson = topBooks.map((b) => ({
        title: b.title,
        author: b.author,
        ol_key: b.ol_key,
        tags_emocionales: b.tags ?? [],
      }));

      try {
        await upsertUserPreferences({
          top_books: topBooksJson,
          preferred_reading_pace: freq,
        });
      } catch (e) {
        const msg = e?.message ?? "";
        const isConflict =
          msg.includes("ON CONFLICT") ||
          msg.includes("duplicate key") ||
          msg.includes("unique or exclusion constraint");
        if (!isConflict) throw e;
      }

      try {
        await insertUserWeights([{ category: "reading_pace", item: freq, score: 1 }]);
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
      setError(e?.message || "Could not save your preferences");
      shouldNavigate = false;
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
    if (shouldNavigate) navigation.navigate(routes.OnbPersonality);
  };

  return (
    <Screen
      backgroundColor={colors.cream}
      footer={
        <View style={{ gap: 8 }}>
          {!canContinue && (
            <Text style={styles.validationHint}>
              Add at least 1 book to your top 5 to continue
            </Text>
          )}
          <RMButton
            title={saving ? "Saving…" : "Continue · Personality"}
            variant={canContinue && !saving ? "dark" : "ghost"}
            disabled={!canContinue || saving}
            onPress={onPressContinue}
          />
        </View>
      }
    >
      <View style={styles.progress}>
        <View style={styles.dots}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={[styles.dot, i <= 2 ? styles.dotOn : styles.dotOff]} />
          ))}
        </View>
        <Text style={styles.stepLabel}>02 / 04</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.kicker}>★ Chapter two</Text>
        <Text style={styles.title}>
          Reading{"\n"}
          <Text style={styles.titleItalic}>history</Text>
        </Text>
      </View>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* ── TOP 5 ── */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Your top 5 ever</Text>
          <View style={[styles.countBadge, topBooks.length >= 1 && styles.countBadgeOk]}>
            <Text style={[styles.countBadgeText, topBooks.length >= 1 && { color: colors.ink }]}>
              {topBooks.length} / 5
            </Text>
          </View>
        </View>
        <Text style={styles.sectionHint}>SEARCH REAL BOOKS · DRAG ⠿ TO REORDER</Text>

        {/* Book search */}
        {topBooks.length < 5 && (
          <View style={{ marginBottom: 10 }}>
            <View style={styles.bookSearch}>
              <View style={styles.bookSearchIcon}>
                <Text style={styles.bookSearchIconText}>◎</Text>
              </View>
              <TextInput
                value={bookQuery}
                onChangeText={setBookQuery}
                placeholder="Search a book…"
                placeholderTextColor="rgba(22,16,46,0.45)"
                style={styles.bookSearchInput}
                autoCorrect={false}
              />
              {bookSearching ? (
                <ActivityIndicator size="small" color={colors.ink} />
              ) : bookQuery.length > 0 ? (
                <Pressable onPress={() => { setBookQuery(""); setBookResults([]); }}>
                  <Text style={styles.clearBtn}>✕</Text>
                </Pressable>
              ) : null}
            </View>

            {/* Book results */}
            {bookResults.length > 0 && (
              <View style={styles.resultsBox}>
                {bookResults.map((b) => (
                  <Pressable key={b.ol_key} onPress={() => addBook(b)} style={styles.resultRow}>
                    <View style={styles.resultIcon}>
                      <Text style={styles.resultIconText}>📖</Text>
                    </View>
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Text style={styles.resultTitle} numberOfLines={1}>{b.title}</Text>
                      <Text style={styles.resultAuthor} numberOfLines={1}>{b.author}</Text>
                    </View>
                    <Text style={styles.resultAdd}>+ Add</Text>
                  </Pressable>
                ))}
              </View>
            )}

            {/* No results fallback */}
            {bookNoResults && !bookSearching && (
              <View style={styles.noResultsBox}>
                <Text style={styles.noResultsText}>
                  No encontramos ese libro aún — sigue buscando o agrega uno nuevo
                </Text>
                <Pressable onPress={fetchFromOpenLibrary} style={styles.fallbackBtn}>
                  <Text style={styles.fallbackBtnText}>Buscar en Open Library</Text>
                </Pressable>
              </View>
            )}
          </View>
        )}

        {/* Book list */}
        {topBooks.length > 0 ? (
          <View style={styles.bookList}>
            {topBooks.map((book, i) => (
              <DraggableBookRow
                key={book.ol_key}
                book={book}
                index={i}
                total={topBooks.length}
                dragInfo={dragInfo}
                onReorder={reorderBooks}
                onTagChange={toggleTag}
                onRemove={removeBook}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyBooks}>
            <Text style={styles.emptyBooksText}>
              Search your favorite books and build your top 5
            </Text>
          </View>
        )}

        <View style={styles.hintBox}>
          <View style={styles.hintIcon}>
            <Text style={styles.hintIconText}>✦</Text>
          </View>
          <Text style={styles.hintBoxText}>
            Tap ⠿ and drag to reorder · Choose tags to define your reading aura
          </Text>
        </View>
      </View>

      {/* ── Frequency ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How often do you read?</Text>
        <Text style={styles.freqHint}>BE HONEST — SETS YOUR PACE</Text>
        <View style={styles.freqGrid}>
          {FREQ_OPTIONS.map((o) => {
            const on = freq === o.id;
            return (
              <Pressable
                key={o.id}
                onPress={() => setFreq(o.id)}
                style={[styles.freqCard, on && styles.freqCardActive]}
              >
                <View style={[styles.freqIconWrap, { backgroundColor: on ? colors.ink : colors.cream }]}>
                  <Text style={[styles.freqIcon, { color: on ? colors.lime : colors.ink }]}>{o.icon}</Text>
                </View>
                <Text style={styles.freqLabel}>{o.label}</Text>
                <Text style={styles.freqSub}>{o.sub}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  progress: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 22, paddingTop: 18, paddingBottom: 20,
  },
  dots: { flexDirection: "row", gap: 4 },
  dot: { width: 32, height: 4, borderRadius: 2 },
  dotOn: { backgroundColor: colors.ink },
  dotOff: { backgroundColor: "rgba(22,16,46,0.15)" },
  stepLabel: { fontSize: 11, fontWeight: "700", letterSpacing: 1.4, color: "rgba(22,16,46,0.5)" },
  header: { paddingHorizontal: 22, paddingBottom: 22 },
  kicker: { fontSize: 10, fontWeight: "800", letterSpacing: 2, textTransform: "uppercase", color: colors.coral, marginBottom: 8 },
  title: { fontSize: 40, fontWeight: "900", color: colors.ink, letterSpacing: -1, lineHeight: 42 },
  titleItalic: { fontStyle: "italic", fontWeight: "700", color: colors.coral },
  errorBox: {
    marginHorizontal: 22, marginBottom: 10,
    backgroundColor: "rgba(255,126,107,0.12)", borderRadius: radii.md, padding: 12,
  },
  errorText: { fontSize: 12, fontWeight: "700", color: "#C0392B" },
  validationHint: {
    fontSize: 12, fontWeight: "700", color: "rgba(22,16,46,0.55)",
    textAlign: "center", letterSpacing: 0.1,
  },
  section: { paddingHorizontal: 22, marginBottom: 24 },
  sectionHead: {
    flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 4,
  },
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
  bookSearch: {
    flexDirection: "row", alignItems: "center", gap: 10, padding: 12,
    borderRadius: 14, backgroundColor: colors.white,
    borderWidth: 1, borderColor: "rgba(22,16,46,0.08)",
  },
  bookSearchIcon: {
    width: 24, height: 24, borderRadius: 8,
    backgroundColor: colors.mist, alignItems: "center", justifyContent: "center",
  },
  bookSearchIconText: { fontSize: 14, color: colors.ink },
  bookSearchInput: { flex: 1, fontSize: 14, color: colors.ink, fontWeight: "600" },
  clearBtn: { fontSize: 14, color: "rgba(22,16,46,0.4)", fontWeight: "700", paddingHorizontal: 4 },
  resultsBox: {
    backgroundColor: colors.white, borderRadius: 14, overflow: "hidden",
    borderWidth: 1, borderColor: "rgba(22,16,46,0.08)", marginTop: 6,
  },
  resultRow: {
    flexDirection: "row", alignItems: "center", gap: 10,
    paddingHorizontal: 12, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: "rgba(22,16,46,0.05)",
  },
  resultIcon: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: colors.mist, alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  resultIconText: { fontSize: 16 },
  resultTitle: { fontSize: 13, fontWeight: "800", color: colors.ink, letterSpacing: -0.2 },
  resultAuthor: { fontSize: 11, fontStyle: "italic", color: "rgba(22,16,46,0.6)", fontWeight: "600", marginTop: 1 },
  resultAdd: { fontSize: 12, fontWeight: "900", color: colors.purple, flexShrink: 0 },
  bookList: {
    gap: 8,
    // Extra bottom padding so the last dragged item has room
    paddingBottom: 4,
  },
  bookRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(22,16,46,0.06)",
    minHeight: 96,
    shadowColor: colors.ink,
    shadowOpacity: 0,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
  },
  rank: {
    width: 22, textAlign: "center",
    fontWeight: "900", color: colors.ink, fontSize: 17, flexShrink: 0,
  },
  bookBody: { flex: 1, minWidth: 0 },
  bookTitle: { fontWeight: "900", color: colors.ink, letterSpacing: -0.2, fontSize: 14 },
  bookMeta: {
    marginTop: 2, fontStyle: "italic",
    color: "rgba(22,16,46,0.65)", fontWeight: "600", fontSize: 12,
  },
  tagScroll: { marginTop: 8, marginHorizontal: -2 },
  tagScrollContent: { gap: 5, paddingHorizontal: 2 },
  tagChip: {
    borderRadius: radii.pill, paddingVertical: 5, paddingHorizontal: 9,
    backgroundColor: colors.mist, borderWidth: 1, borderColor: "rgba(22,16,46,0.06)",
  },
  tagChipActive: { backgroundColor: colors.lime, borderColor: colors.ink },
  tagText: { fontSize: 10, fontWeight: "700", color: "rgba(22,16,46,0.55)" },
  tagTextActive: { fontWeight: "900", color: colors.ink },
  removeBtn: {
    width: 28, height: 28, borderRadius: 9, flexShrink: 0,
    backgroundColor: "rgba(22,16,46,0.05)",
    alignItems: "center", justifyContent: "center",
  },
  removeBtnText: { fontSize: 12, fontWeight: "900", color: "rgba(22,16,46,0.4)" },
  dragHandle: {
    width: 32, height: 44, flexShrink: 0,
    alignItems: "center", justifyContent: "center",
  },
  dragIcon: { fontSize: 20, color: "rgba(22,16,46,0.3)", fontWeight: "900" },
  emptyBooks: {
    padding: 20, borderRadius: 14,
    backgroundColor: "rgba(22,16,46,0.04)",
    borderWidth: 1.5, borderColor: "rgba(22,16,46,0.1)", borderStyle: "dashed",
    alignItems: "center",
  },
  emptyBooksText: {
    fontSize: 13, fontWeight: "600", color: "rgba(22,16,46,0.5)",
    textAlign: "center", lineHeight: 18,
  },
  noResultsBox: {
    marginTop: 6, padding: 14, borderRadius: 14,
    backgroundColor: "rgba(124,91,255,0.06)",
    borderWidth: 1, borderColor: "rgba(124,91,255,0.15)",
    alignItems: "center", gap: 10,
  },
  noResultsText: {
    fontSize: 12, fontWeight: "600", color: "rgba(22,16,46,0.6)",
    textAlign: "center", lineHeight: 17,
  },
  fallbackBtn: {
    borderRadius: radii.pill, paddingVertical: 8, paddingHorizontal: 16,
    backgroundColor: colors.purple,
  },
  fallbackBtnText: { fontSize: 12, fontWeight: "900", color: colors.cream },
  hintBox: {
    marginTop: 10, padding: 12, borderRadius: radii.md,
    backgroundColor: "rgba(124,91,255,0.08)", flexDirection: "row",
    alignItems: "center", gap: 10,
  },
  hintIcon: {
    width: 26, height: 26, borderRadius: 8, backgroundColor: colors.purple,
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  hintIconText: { color: colors.cream, fontWeight: "900" },
  hintBoxText: { flex: 1, fontSize: 12, color: colors.inkSoft, fontWeight: "600", lineHeight: 17 },
  freqHint: {
    fontSize: 9, fontWeight: "800", letterSpacing: 1.2,
    color: "rgba(22,16,46,0.4)", textTransform: "uppercase", marginTop: 4, marginBottom: 14,
  },
  freqGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  freqCard: {
    width: "47.5%", backgroundColor: colors.white, borderRadius: radii.lg,
    padding: 14, borderWidth: 1, borderColor: "rgba(22,16,46,0.08)",
  },
  freqCardActive: { backgroundColor: colors.lime, borderColor: colors.ink, borderWidth: 1.5 },
  freqIconWrap: {
    width: 32, height: 32, borderRadius: 10,
    alignItems: "center", justifyContent: "center", marginBottom: 10,
  },
  freqIcon: { fontSize: 18, fontWeight: "900" },
  freqLabel: { fontSize: 16, fontWeight: "900", color: colors.ink, letterSpacing: -0.3 },
  freqSub: { marginTop: 2, fontSize: 10, fontWeight: "700", color: "rgba(22,16,46,0.6)", letterSpacing: 0.4 },
});
