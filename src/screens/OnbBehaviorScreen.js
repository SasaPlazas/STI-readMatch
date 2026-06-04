import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { BookCover } from "../components/BookCover";
import { RMButton } from "../components/RMButton";
import { insertUserWeights, upsertUserPreferences } from "../utils/userStorage";
import { BOOKS } from "../data/sample";
import { colors, radii } from "../theme/tokens";
import { routes } from "../navigation/routes";

const SHELVES = [
  { id: "rd", label: "Read", count: 142, color: colors.lime, icon: "✓" },
  {
    id: "now",
    label: "Currently reading",
    count: 2,
    color: colors.coral,
    icon: "◐",
  },
  {
    id: "wnt",
    label: "Want to read",
    count: 28,
    color: colors.purple,
    icon: "☆",
  },
  {
    id: "fav",
    label: "Favorites",
    count: 18,
    color: colors.lavender,
    icon: "♥",
  },
  {
    id: "drop",
    label: "Dropped",
    count: 6,
    color: colors.ink,
    icon: "✕",
    dark: true,
  },
];

const FREQ_OPTIONS = [
  { id: "daily", label: "Daily", sub: "reader · always", icon: "☼" },
  { id: "weekly", label: "Weekly", sub: "committed", icon: "◐" },
  { id: "occas", label: "Occasionally", sub: "when it calls", icon: "◌" },
  { id: "seasonal", label: "Seasonal", sub: "binge & rest", icon: "❀" },
];

const BADGE_COLORS = [colors.lime, colors.lavender, colors.coral, colors.mist];
const BADGE_LABELS = [
  "Comfort read",
  "Mind-expanding",
  "Life‑changing",
  "Emotional",
];

export function OnbBehaviorScreen({ navigation }) {
  const [freq, setFreq] = useState("weekly");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const savingRef = useRef(false);
  const top = [BOOKS[2], BOOKS[3], BOOKS[0], BOOKS[5]];

  return (
    <Screen
      backgroundColor={colors.cream}
      footer={
        <RMButton
          title={saving ? "Saving…" : "Continue · Personality"}
          variant={!saving ? "dark" : "ghost"}
          disabled={saving}
          onPress={async () => {
            if (savingRef.current) return;
            savingRef.current = true;
            setSaving(true);
            setError("");
            let shouldNavigate = true;
            try {
              await upsertUserPreferences({ preferred_reading_pace: freq });
              try {
                await insertUserWeights([
                  { category: "reading_pace", item: freq, score: 1 },
                ]);
              } catch (weightsError) {
                const message = weightsError?.message ?? "";
                const isContinueError =
                  weightsError?.status === 403 ||
                  weightsError?.status === 400 ||
                  message.includes("Bad Request") ||
                  message.includes("RLS") ||
                  message.includes("row-level security") ||
                  message.includes("new row violates") ||
                  message.includes("policy");
                if (!isContinueError) {
                  throw weightsError;
                }
              }
            } catch (e) {
              setError(e?.message || "No se pudieron guardar tus preferencias");
              shouldNavigate = false;
            } finally {
              savingRef.current = false;
              setSaving(false);
            }
            if (shouldNavigate) {
              navigation.navigate(routes.OnbPersonality);
            }
          }}
        />
      }
    >
      <View style={styles.progress}>
        <View style={styles.dots}>
          {[1, 2, 3, 4].map((i) => (
            <View
              key={i}
              style={[styles.dot, i <= 2 ? styles.dotOn : styles.dotOff]}
            />
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

      {/* Q1 — Top 5 */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Your top 5 ever</Text>
          <Text style={styles.sectionHint}>TAP TO PREVIEW</Text>
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
              <View
                style={[styles.badge, { backgroundColor: BADGE_COLORS[i] }]}
              >
                <Text style={styles.badgeText}>{BADGE_LABELS[i]}</Text>
              </View>
            </View>
          ))}
          <Pressable style={styles.addSlot}>
            <View style={styles.addIcon}>
              <Text style={styles.addIconText}>+</Text>
            </View>
            <Text style={styles.addLabel}>Add #5</Text>
          </Pressable>
        </View>
        <View style={styles.hintBox}>
          <View style={styles.hintIcon}>
            <Text style={styles.hintIconText}>✦</Text>
          </View>
          <Text style={styles.hintBoxText}>
            Tap a book to add emotional tags — they shape your reading aura.
          </Text>
        </View>
      </View>

      {/* Q2 — Shelves */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Build your shelves</Text>
          <Text style={styles.sectionHint}>IMPORT GOODREADS ↗</Text>
        </View>
        <View style={styles.shelvesGrid}>
          {SHELVES.map((s) => (
            <View
              key={s.id}
              style={[
                styles.shelfCard,
                { backgroundColor: s.color },
                s.id === "drop" && styles.shelfCardFull,
              ]}
            >
              <View style={styles.shelfTop}>
                <View
                  style={[
                    styles.shelfIcon,
                    {
                      backgroundColor: s.dark
                        ? "rgba(212,255,61,0.15)"
                        : colors.ink,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.shelfIconText,
                      { color: s.dark ? colors.lime : s.color },
                    ]}
                  >
                    {s.icon}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.shelfCount,
                    { color: s.dark ? colors.cream : colors.ink },
                  ]}
                >
                  {s.count}
                </Text>
              </View>
              <Text
                style={[
                  styles.shelfLabel,
                  { color: s.dark ? colors.cream : colors.ink },
                ]}
              >
                {s.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Q3 — Frequency */}
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
                <View
                  style={[
                    styles.freqIconWrap,
                    { backgroundColor: on ? colors.ink : colors.cream },
                  ]}
                >
                  <Text
                    style={[
                      styles.freqIcon,
                      { color: on ? colors.lime : colors.ink },
                    ]}
                  >
                    {o.icon}
                  </Text>
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
  content: { paddingBottom: 16 },
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
  stepLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
    color: "rgba(22,16,46,0.5)",
  },
  header: { paddingHorizontal: 22, paddingBottom: 22 },
  kicker: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
    color: colors.coral,
    marginBottom: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -1,
    lineHeight: 42,
  },
  titleItalic: { fontStyle: "italic", fontWeight: "700", color: colors.coral },
  errorBox: {
    marginHorizontal: 22,
    marginBottom: 10,
    backgroundColor: "rgba(255,126,107,0.12)",
    borderRadius: radii.md,
    padding: 12,
  },
  errorText: { fontSize: 12, fontWeight: "700", color: "#C0392B" },
  section: { paddingHorizontal: 22, marginBottom: 24 },
  sectionHead: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -0.3,
  },
  sectionHint: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "rgba(22,16,46,0.4)",
    textTransform: "uppercase",
  },
  freqHint: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "rgba(22,16,46,0.4)",
    textTransform: "uppercase",
    marginTop: 4,
    marginBottom: 14,
  },
  list: { gap: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(22,16,46,0.06)",
  },
  rank: {
    width: 24,
    textAlign: "center",
    fontWeight: "900",
    color: colors.ink,
    fontSize: 18,
  },
  rowText: { flex: 1, minWidth: 0 },
  rowTitle: { fontWeight: "900", color: colors.ink, letterSpacing: -0.2 },
  rowMeta: {
    marginTop: 2,
    fontStyle: "italic",
    color: "rgba(22,16,46,0.65)",
    fontWeight: "600",
    fontSize: 12,
  },
  badge: {
    borderRadius: radii.pill,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.ink,
    letterSpacing: 0.4,
  },
  addSlot: {
    height: 58,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: "rgba(22,16,46,0.18)",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  addIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(22,16,46,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  addIconText: {
    fontSize: 16,
    fontWeight: "900",
    color: "rgba(22,16,46,0.55)",
  },
  addLabel: { fontSize: 14, fontWeight: "700", color: "rgba(22,16,46,0.55)" },
  hintBox: {
    marginTop: 10,
    padding: 12,
    borderRadius: radii.md,
    backgroundColor: "rgba(124,91,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  hintIcon: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  hintIconText: { color: colors.cream, fontWeight: "900" },
  hintBoxText: {
    flex: 1,
    fontSize: 12,
    color: colors.inkSoft,
    fontWeight: "600",
    lineHeight: 17,
  },
  shelvesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  shelfCard: {
    width: "47.5%",
    borderRadius: radii.lg,
    padding: 14,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },
  shelfCardFull: { width: "100%" },
  shelfTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  shelfIcon: {
    width: 28,
    height: 28,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  shelfIconText: { fontWeight: "900", fontSize: 14 },
  shelfCount: { fontSize: 24, fontWeight: "900", letterSpacing: -0.5 },
  shelfLabel: { fontSize: 13, fontWeight: "800" },
  freqGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  freqCard: {
    width: "47.5%",
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(22,16,46,0.08)",
  },
  freqCardActive: {
    backgroundColor: colors.lime,
    borderColor: colors.ink,
    borderWidth: 1.5,
  },
  freqIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  freqIcon: { fontSize: 18, fontWeight: "900" },
  freqLabel: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -0.3,
  },
  freqSub: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: "700",
    color: "rgba(22,16,46,0.6)",
    letterSpacing: 0.4,
  },
  footer: { position: "absolute", left: 22, right: 22, bottom: 26 },
});
