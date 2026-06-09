import { useEffect, useRef, useState } from "react";
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RMButton } from "../components/RMButton";
import { colors, radii } from "../theme/tokens";
import { routes } from "../navigation/routes";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { assignArchetype, generateReveal } from "../services/revealService";

const CHIP_PALETTE = [
  colors.purple,
  colors.coral,
  colors.lime,
  colors.lavender,
  "#E8E0FF",
  colors.cream,
];
const CHIP_DARK = [false, false, false, false, false, true];

const DEPTH_SCORE = {
  light: "0.35",
  balanced: "0.62",
  deep: "0.85",
  experimental: "0.95",
};
const GROUP_FIT = ["0.60", "0.72", "0.84", "0.91", "0.96"];

const ARCHETYPE_AFFINITY = {
  "The Philosopher": "0.88",
  "The Explorer": "0.91",
  "The Romantic": "0.84",
  "Dark Academic": "0.87",
  "The Visionary": "0.89",
  "The Storyteller": "0.86",
  "The Cozy Reader": "0.82",
  "The Chronicler": "0.85",
};

const ARCHETYPE_PAIRS = {
  "The Philosopher": ["The Explorer", "Dark Academic", "The Chronicler"],
  "The Explorer": ["The Philosopher", "The Visionary", "The Chronicler"],
  "The Romantic": ["The Cozy Reader", "The Storyteller", "The Explorer"],
  "Dark Academic": ["The Philosopher", "The Chronicler", "The Visionary"],
  "The Visionary": ["The Explorer", "The Philosopher", "Dark Academic"],
  "The Storyteller": ["The Romantic", "The Cozy Reader", "The Explorer"],
  "The Cozy Reader": ["The Romantic", "The Storyteller", "The Explorer"],
  "The Chronicler": ["The Philosopher", "Dark Academic", "The Explorer"],
};

const FALLBACK_TEXT =
  "You bring a unique perspective to every reading circle, enriching discussions with your distinctive voice. Your groups thrive because of the depth and authenticity you contribute.";

function SkeletonBox({ width, height, radius = 12, style }) {
  const shimmer = useRef(new Animated.Value(0.35)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 0.7,
          duration: 850,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0.35,
          duration: 850,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, []);
  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: "rgba(255,255,255,0.14)",
          opacity: shimmer,
        },
        style,
      ]}
    />
  );
}

function LoadingSkeleton() {
  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.leadIn, { gap: 10 }]}>
        <SkeletonBox width={160} height={13} radius={6} />
        <SkeletonBox width={230} height={11} radius={6} />
      </View>
      <View style={[styles.identityCard, { gap: 14 }]}>
        <SkeletonBox width={90} height={10} radius={5} />
        <SkeletonBox width={120} height={54} radius={10} />
        <SkeletonBox width={200} height={54} radius={10} />
        <SkeletonBox width="100%" height={58} radius={10} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <SkeletonBox width="30%" height={64} />
          <SkeletonBox width="30%" height={64} />
          <SkeletonBox width="30%" height={64} />
        </View>
      </View>
      <View style={styles.paletteSection}>
        <SkeletonBox
          width={130}
          height={10}
          radius={5}
          style={{ marginBottom: 14 }}
        />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {[80, 110, 90, 70, 105, 85].map((w, i) => (
            <SkeletonBox key={i} width={w} height={36} radius={999} />
          ))}
        </View>
      </View>
      <View style={{ height: 110 }} />
    </ScrollView>
  );
}

export function OnbRevealScreen({ navigation }) {
  const { user, completeOnboarding } = useAuth();
  const [loading, setLoading] = useState(true);
  const [archetype, setArchetype] = useState("");
  const [revealText, setRevealText] = useState("");
  const [prefs, setPrefs] = useState(null);
  const [completing, setCompleting] = useState(false);

  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;

  function runEntrance() {
    Animated.stagger(340, [
      Animated.timing(anim1, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(anim2, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(anim3, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      let p = {};
      let arch = "The Explorer";

      try {
        if (!user?.id) {
          throw new Error("No user");
        }
        const { data } = await supabase
          .from("user_preferences")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();
        p = data ?? {};
        arch = assignArchetype(p);
      } catch (_) {}

      if (cancelled) return;

      let text = FALLBACK_TEXT;
      try {
        text = await generateReveal(arch, p);
      } catch (_) {}

      if (cancelled) return;

      // Save back to DB — fire-and-forget, don't block UI
      if (user?.id) {
        supabase
          .from("user_preferences")
          .update({ archetype: arch, reveal_text: text })
          .eq("user_id", user.id)
          .then(() => {});
      }

      setPrefs(p);
      setArchetype(arch);
      setRevealText(text);
      setLoading(false);
      runEntrance();
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleEnter() {
    if (completing) return;
    setCompleting(true);
    try {
      await completeOnboarding();
    } catch (_) {}
  }

  const slide = (anim, offset = 20) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [offset, 0],
        }),
      },
    ],
  });

  const genres = prefs?.favorite_genres?.slice(0, 6) ?? [];
  const depth = DEPTH_SCORE[prefs?.depth_preference] ?? "0.62";
  const openness = `${prefs?.openness_score ?? 0}%`;
  const groupFit = GROUP_FIT[Math.min(prefs?.group_values?.length ?? 0, 4)];
  const affinity = ARCHETYPE_AFFINITY[archetype] ?? "0.85";
  const pairs = ARCHETYPE_PAIRS[archetype] ?? [
    "The Explorer",
    "The Philosopher",
    "The Chronicler",
  ];

  const parts = archetype.split(" ");
  const archetypeFirst = parts[0] ?? "";
  const archetypeRest = parts.slice(1).join(" ");
  const accentSize = archetypeRest.length > 9 ? 44 : 60;
  const accentLineHeight = accentSize === 44 ? 46 : 62;

  return (
    <LinearGradient
      colors={["#2B1B69", "#16102E", "#1A1042"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.bg}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={[styles.leadIn, slide(anim1)]}>
              <Text style={styles.leadKicker}>★ Your reading aura</Text>
              <Text style={styles.leadSub}>
                we've mapped your reading identity
              </Text>
            </Animated.View>

            <Animated.View style={[styles.identityCard, slide(anim1, 24)]}>
              <Text style={styles.identityPre}>You read like</Text>
              <Text style={styles.identityType}>{archetypeFirst}</Text>
              <Text
                style={[
                  styles.identityTypeAccent,
                  { fontSize: accentSize, lineHeight: accentLineHeight },
                ]}
              >
                {archetypeRest}
              </Text>
              <Text style={styles.identityBody}>{revealText}</Text>
              <View style={styles.miniStats}>
                {[
                  { label: "depth", value: depth },
                  { label: "openness", value: openness },
                  { label: "group fit", value: groupFit },
                ].map((s) => (
                  <View key={s.label} style={styles.miniStat}>
                    <Text style={styles.miniStatLabel}>{s.label}</Text>
                    <Text style={styles.miniStatValue}>{s.value}</Text>
                  </View>
                ))}
              </View>
            </Animated.View>

            {genres.length > 0 && (
              <Animated.View style={[styles.paletteSection, slide(anim2)]}>
                <Text style={styles.paletteSectionLabel}>
                  YOUR LITERARY PALETTE
                </Text>
                <View style={styles.paletteChips}>
                  {genres.map((g, i) => {
                    const bg = CHIP_PALETTE[i % CHIP_PALETTE.length];
                    const dark = CHIP_DARK[i % CHIP_DARK.length];
                    return (
                      <View
                        key={g}
                        style={[
                          styles.paletteChip,
                          { backgroundColor: bg },
                          {
                            transform: [{ rotate: `${i % 2 ? -1.5 : 1.5}deg` }],
                          },
                          dark && styles.paletteChipDark,
                        ]}
                      >
                        <Text
                          style={[
                            styles.paletteChipText,
                            dark && styles.paletteChipTextDark,
                          ]}
                        >
                          {g}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </Animated.View>
            )}

            <Animated.View style={[styles.affinityRow, slide(anim2)]}>
              <View style={styles.affinityCard}>
                <Text style={styles.affinityLabel}>Group affinity</Text>
                <Text style={styles.affinityValue}>{affinity}</Text>
                <Text style={styles.affinityQuote}>"you elevate circles"</Text>
              </View>
              <View style={styles.pairCard}>
                <Text style={styles.pairLabel}>YOU PAIR WITH</Text>
                {pairs.map((t) => (
                  <View key={t} style={styles.pairRow}>
                    <View style={styles.pairDot} />
                    <Text style={styles.pairType}>{t}</Text>
                  </View>
                ))}
              </View>
            </Animated.View>

            <Animated.View style={[styles.shareHint, { opacity: anim3 }]}>
              <View style={styles.shareIcon}>
                <Text style={styles.shareIconText}>✦</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.shareTitle}>Share your aura</Text>
                <Text style={styles.shareSub}>
                  1.2M readers shared theirs this week
                </Text>
              </View>
              <Pressable style={styles.shareBtn}>
                <Text style={styles.shareBtnText}>Share ↗</Text>
              </Pressable>
            </Animated.View>

            <View style={{ height: 110 }} />
          </ScrollView>
        )}

        {!loading && (
          <Animated.View style={[styles.cta, { opacity: anim3 }]}>
            <LinearGradient
              colors={["rgba(22,16,46,0)", "rgba(22,16,46,0.92)"]}
              style={styles.ctaGrad}
            >
              <RMButton
                title={completing ? "Entering…" : "Enter ReadMatch →"}
                variant="primary"
                onPress={handleEnter}
                style={styles.ctaBtn}
              />
            </LinearGradient>
          </Animated.View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  scroll: { paddingHorizontal: 22, paddingTop: 60 },
  leadIn: { alignItems: "center", marginBottom: 28 },
  leadKicker: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: colors.lime,
  },
  leadSub: {
    marginTop: 6,
    fontSize: 15,
    fontStyle: "italic",
    color: "rgba(251,246,235,0.7)",
    fontWeight: "600",
  },
  identityCard: {
    borderRadius: radii.xl,
    padding: 22,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.16)",
    marginBottom: 22,
  },
  identityPre: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    color: "rgba(251,246,235,0.55)",
    textTransform: "uppercase",
  },
  identityType: {
    fontSize: 60,
    fontWeight: "900",
    color: colors.cream,
    letterSpacing: -1.5,
    lineHeight: 62,
    marginTop: 6,
  },
  identityTypeAccent: {
    fontWeight: "400",
    fontStyle: "italic",
    color: colors.lime,
    letterSpacing: -1.5,
    marginTop: -10,
  },
  identityBody: {
    fontSize: 14,
    fontStyle: "italic",
    color: "rgba(251,246,235,0.85)",
    fontWeight: "600",
    lineHeight: 21,
    marginTop: 14,
  },
  miniStats: { flexDirection: "row", gap: 10, marginTop: 18 },
  miniStat: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
  },
  miniStatLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "rgba(251,246,235,0.5)",
    textTransform: "uppercase",
  },
  miniStatValue: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.cream,
    letterSpacing: -0.5,
    marginTop: 4,
  },
  paletteSection: { marginBottom: 22 },
  paletteSectionLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.8,
    color: "rgba(251,246,235,0.5)",
    textTransform: "uppercase",
    marginBottom: 14,
  },
  paletteChips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  paletteChip: {
    borderRadius: radii.pill,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  paletteChipDark: { borderWidth: 0.5, borderColor: "rgba(255,255,255,0.18)" },
  paletteChipText: { fontSize: 13, fontWeight: "800", color: colors.ink },
  paletteChipTextDark: { color: colors.lime },
  affinityRow: { flexDirection: "row", gap: 12, marginBottom: 22 },
  affinityCard: {
    flex: 1,
    borderRadius: radii.xl,
    padding: 16,
    backgroundColor: colors.lime,
  },
  affinityLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "rgba(22,16,46,0.7)",
    textTransform: "uppercase",
  },
  affinityValue: {
    fontSize: 36,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -1,
    marginTop: 4,
  },
  affinityQuote: {
    fontSize: 12,
    fontStyle: "italic",
    color: "rgba(22,16,46,0.75)",
    fontWeight: "600",
    marginTop: 2,
  },
  pairCard: {
    flex: 1,
    borderRadius: radii.xl,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.12)",
  },
  pairLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "rgba(251,246,235,0.5)",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  pairRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  pairDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.lime,
    opacity: 0.7,
  },
  pairType: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(251,246,235,0.85)",
  },
  shareHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: radii.lg,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 12,
  },
  shareIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(212,255,61,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  shareIconText: { color: colors.lime, fontSize: 16, fontWeight: "900" },
  shareTitle: { fontSize: 14, fontWeight: "800", color: colors.cream },
  shareSub: {
    fontSize: 11,
    color: "rgba(251,246,235,0.55)",
    marginTop: 2,
    fontWeight: "600",
  },
  shareBtn: {
    borderRadius: radii.pill,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: colors.cream,
  },
  shareBtnText: { color: colors.ink, fontWeight: "900", fontSize: 12 },
  cta: { position: "absolute", left: 0, right: 0, bottom: 0 },
  ctaGrad: { paddingHorizontal: 22, paddingTop: 20, paddingBottom: 36 },
  ctaBtn: { backgroundColor: colors.lime },
});
