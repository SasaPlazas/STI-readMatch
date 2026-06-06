import { useRef, useState } from "react";
import { PanResponder, Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { RMButton } from "../components/RMButton";
import { insertUserWeights, upsertUserPreferences } from "../utils/userStorage";
import { colors, radii } from "../theme/tokens";
import { routes } from "../navigation/routes";

const DEPTH_OPTIONS = [
  {
    id: "light",
    label: "Light & fast",
    sub: "page-turners, beachable",
    icon: "☼",
    color: colors.lime,
  },
  {
    id: "balanced",
    label: "Balanced & immersive",
    sub: "absorbed but moving",
    icon: "◐",
    color: colors.coral,
  },
  {
    id: "deep",
    label: "Deep & philosophical",
    sub: "underline, re-read, sit",
    icon: "◓",
    color: colors.purple,
  },
  {
    id: "experimental",
    label: "Experimental",
    sub: "fragments, forms, friction",
    icon: "✦",
    color: colors.ink,
    dark: true,
  },
];

const VALUE_OPTIONS = [
  { id: "harmony", label: "Group harmony", color: colors.lime },
  { id: "perspectives", label: "New perspectives", color: colors.purple },
  { id: "deep", label: "Deep discussions", color: colors.coral },
  { id: "emo", label: "Emotional connection", color: colors.lavender },
  { id: "quality", label: "Literary quality", color: colors.ink, dark: true },
  { id: "fun", label: "Fast & fun", color: colors.cream, outline: true },
];

function getOpennessLabel(v) {
  if (v < 30) return '"I know what I like"';
  if (v < 60) return '"surprise me carefully"';
  if (v < 85) return '"take me somewhere new"';
  return '"destabilize me"';
}

export function OnbPersonalityScreen({ navigation }) {
  const [depth, setDepth] = useState("deep");
  const [openness, setOpenness] = useState(72);
  const [values, setValues] = useState(() => new Set(["perspectives", "deep"]));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const savingRef = useRef(false);

  const sliderWidth = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const pct = Math.round(
          Math.min(
            100,
            Math.max(0, (e.nativeEvent.locationX / sliderWidth.current) * 100),
          ),
        );
        setOpenness(pct);
      },
      onPanResponderMove: (e) => {
        const pct = Math.round(
          Math.min(
            100,
            Math.max(0, (e.nativeEvent.locationX / sliderWidth.current) * 100),
          ),
        );
        setOpenness(pct);
      },
    }),
  ).current;

  function toggleValue(id) {
    setValues((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <Screen
      backgroundColor={colors.cream}
      footer={
        <RMButton
          title={saving ? "Saving…" : "Continue · Find your circle"}
          variant={!saving ? "dark" : "ghost"}
          disabled={saving}
          onPress={async () => {
            if (savingRef.current) return;
            savingRef.current = true;
            setSaving(true);
            setError("");
            let shouldNavigate = true;
            try {
              // Critical: save personality to user_preferences
              await upsertUserPreferences({
                depth_preference: depth,
                openness_score: openness,
                group_values: Array.from(values),
              });

              // Non-critical: insert weights for recommendation engine
              const weights = [
                { category: "depth", item: depth, score: 1 },
                { category: "openness", item: "discovery", score: openness / 100 },
                ...Array.from(values).map((id) => ({
                  category: "collab_value",
                  item: id,
                  score: 1,
                })),
              ];
              try {
                await insertUserWeights(weights);
              } catch (e) {
                console.warn("user_weights (non-critical):", e?.message);
              }
            } catch (e) {
              setError(e?.message || "No se pudieron guardar tus preferencias");
              shouldNavigate = false;
            } finally {
              savingRef.current = false;
              setSaving(false);
            }
            if (shouldNavigate) {
              navigation.navigate(routes.OnbReveal);
            }
          }}
        />
      }
    >
      <Pressable
        accessibilityRole="button"
        style={styles.back}
        onPress={() => navigation.navigate(routes.OnbBehavior)}
      >
        <Text style={styles.backText}>‹</Text>
      </Pressable>
      <View style={styles.progress}>
        <View style={styles.dots}>
          {[1, 2, 3, 4].map((i) => (
            <View
              key={i}
              style={[styles.dot, i <= 3 ? styles.dotOn : styles.dotOff]}
            />
          ))}
        </View>
        <Text style={styles.stepLabel}>03 / 04</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.kicker}>★ Chapter three</Text>
        <Text style={styles.title}>
          Reading{"\n"}
          <Text style={styles.titleItalic}>personality</Text>
        </Text>
      </View>
      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* Q1 — Depth */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How deep do you like to go?</Text>
        <Text style={styles.sectionHint}>SWIM · DIVE · DROWN · TRANSFORM</Text>
        <View style={styles.depthList}>
          {DEPTH_OPTIONS.map((o, i) => {
            const on = depth === o.id;
            return (
              <Pressable
                key={o.id}
                onPress={() => setDepth(o.id)}
                style={[
                  styles.depthCard,
                  { marginLeft: i * 12 },
                  on && {
                    backgroundColor: o.color,
                    borderColor: colors.ink,
                    borderWidth: 1.5,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.depthIcon,
                    on && o.dark && { color: colors.lime },
                  ]}
                >
                  {o.icon}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.depthLabel,
                      on && o.dark && { color: colors.cream },
                    ]}
                  >
                    {o.label}
                  </Text>
                  <Text
                    style={[
                      styles.depthSub,
                      on && o.dark && { color: "rgba(251,246,235,0.7)" },
                    ]}
                  >
                    {o.sub}
                  </Text>
                </View>
                {on && (
                  <View style={[styles.check, { backgroundColor: colors.ink }]}>
                    <Text
                      style={[
                        styles.checkText,
                        { color: o.dark ? colors.lime : o.color },
                      ]}
                    >
                      ✓
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Q2 — Openness slider */}
      <View style={styles.sliderCard}>
        <Text style={styles.sliderTitle}>Discovery openness</Text>
        <Text style={styles.sliderSub}>SHAPES DIVERSITY & FAIRNESS</Text>
        <View style={styles.sliderValueRow}>
          <Text style={styles.sliderValue}>
            {openness}
            <Text style={styles.sliderPct}>%</Text>
          </Text>
          <Text style={styles.sliderQuote}>{getOpennessLabel(openness)}</Text>
        </View>
        <View
          style={styles.sliderTrack}
          onLayout={(e) => {
            sliderWidth.current = e.nativeEvent.layout.width;
          }}
          {...panResponder.panHandlers}
        >
          <View style={styles.sliderTrackBg} />
          <View style={[styles.sliderFill, { width: `${openness}%` }]} />
          <View style={[styles.sliderThumb, { left: `${openness}%` }]} />
        </View>
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>FAMILIAR</Text>
          <Text style={styles.sliderLabel}>UNCHARTED</Text>
        </View>
      </View>

      {/* Q3 — Collaborative values */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reading with others, you value…</Text>
        <Text style={styles.sectionHint}>POWERS GROUP COMPATIBILITY</Text>
        <View style={styles.valueChips}>
          {VALUE_OPTIONS.map((v) => {
            const on = values.has(v.id);
            return (
              <Pressable
                key={v.id}
                onPress={() => toggleValue(v.id)}
                style={[
                  styles.valueChip,
                  on && {
                    backgroundColor: v.color,
                    borderColor: colors.ink,
                    borderWidth: 1.5,
                  },
                  v.outline && !on && { borderColor: "rgba(22,16,46,0.12)" },
                ]}
              >
                <Text
                  style={[
                    styles.valueChipText,
                    on && v.dark && { color: colors.lime },
                  ]}
                >
                  {v.label}
                </Text>
                {on && (
                  <View
                    style={[styles.checkSmall, { backgroundColor: colors.ink }]}
                  >
                    <Text
                      style={[
                        styles.checkSmallText,
                        { color: v.dark ? colors.lime : v.color },
                      ]}
                    >
                      ✓
                    </Text>
                  </View>
                )}
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
    color: colors.purple,
    marginBottom: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -1,
    lineHeight: 42,
  },
  titleItalic: { fontStyle: "italic", fontWeight: "700", color: colors.purple },
  errorBox: {
    marginHorizontal: 22,
    marginBottom: 10,
    backgroundColor: "rgba(255,126,107,0.12)",
    borderRadius: radii.md,
    padding: 12,
  },
  errorText: { fontSize: 12, fontWeight: "700", color: "#C0392B" },
  section: { paddingHorizontal: 22, marginBottom: 24 },
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
    marginTop: 4,
    marginBottom: 14,
  },
  depthList: { gap: 8 },
  depthCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "rgba(22,16,46,0.06)",
  },
  depthIcon: {
    fontSize: 22,
    color: colors.ink,
    opacity: 0.65,
    width: 28,
    textAlign: "center",
  },
  depthLabel: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -0.3,
  },
  depthSub: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(22,16,46,0.55)",
    marginTop: 2,
    letterSpacing: 0.2,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  checkText: { fontSize: 12, fontWeight: "900" },
  sliderCard: {
    marginHorizontal: 22,
    marginBottom: 24,
    backgroundColor: colors.ink,
    borderRadius: radii.xl,
    padding: 18,
    overflow: "hidden",
  },
  sliderTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.cream,
    letterSpacing: -0.3,
  },
  sliderSub: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.4,
    color: "rgba(212,255,61,0.7)",
    textTransform: "uppercase",
    marginTop: 4,
  },
  sliderValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 18,
  },
  sliderValue: {
    fontSize: 56,
    fontWeight: "900",
    color: colors.lime,
    letterSpacing: -1.5,
    lineHeight: 58,
  },
  sliderPct: { fontSize: 28, fontWeight: "900" },
  sliderQuote: {
    fontSize: 13,
    fontStyle: "italic",
    color: "rgba(251,246,235,0.7)",
    fontWeight: "600",
    flexShrink: 1,
    textAlign: "right",
    marginLeft: 10,
  },
  sliderTrack: {
    height: 36,
    marginTop: 14,
    justifyContent: "center",
    position: "relative",
  },
  sliderTrackBg: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  sliderFill: {
    position: "absolute",
    left: 0,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lime,
  },
  sliderThumb: {
    position: "absolute",
    marginLeft: -14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.lime,
    top: 4,
    elevation: 4,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "rgba(251,246,235,0.4)",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  valueChips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  valueChip: {
    borderRadius: radii.pill,
    paddingVertical: 11,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "rgba(22,16,46,0.08)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  valueChipText: { fontSize: 13, fontWeight: "800", color: colors.ink },
  checkSmall: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkSmallText: { fontSize: 9, fontWeight: "900" },
  back: {
    width: 34,
    height: 34,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 22,
    marginBottom: 16,
  },
  backText: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.ink,
    lineHeight: 22,
  },
  footer: { position: "absolute", left: 22, right: 22, bottom: 26 },
});
