import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Screen } from "../components/Screen";
import { Avatar } from "../components/Avatar";
import { RMButton } from "../components/RMButton";
import { supabase } from "../lib/supabase";
import { insertUserWeights, upsertUserPreferences } from "../utils/userStorage";
import { useAuth } from "../context/AuthContext";
import { MEMBERS } from "../data/sample";
import { colors, radii } from "../theme/tokens";
import { routes } from "../navigation/routes";

const VIBES = [
  { id: "curious", label: "Curious", color: colors.lime, icon: "✦" },
  { id: "cozy", label: "Cozy", color: colors.coral, icon: "◐" },
  { id: "sharp", label: "Sharp", color: colors.purple, icon: "◇" },
  { id: "wild", label: "Wild", color: colors.lavender, icon: "⚡" },
];

const SYNC_TAGS = ["Members ↔", "Votes ↔", "Recs →", "Highlights ←"];

export function OnbCollabScreen({ navigation }) {
  const { completeOnboarding } = useAuth();
  const [name, setName] = useState("Slow Burners");
  const [vibe, setVibe] = useState("curious");
  const [tgOn, setTgOn] = useState(true);
  const [saving, setSaving] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);
  const [error, setError] = useState("");
  const savingRef = useRef(false);

  const selectedVibe = VIBES.find((v) => v.id === vibe);

  const onSkip = async () => {
    if (savingRef.current || skipLoading) return;
    setSkipLoading(true);
    setError("");
    try {
      await completeOnboarding();
    } catch (e) {
      setError(e?.message || "No se pudo continuar");
      setSkipLoading(false);
    }
  };

  return (
    <Screen
      backgroundColor={colors.cream}
      footer={
        <View style={{ gap: 10 }}>
          <RMButton
            title={saving ? "Saving…" : "Create my circle ✦"}
            variant={!saving ? "dark" : "ghost"}
            disabled={saving || skipLoading}
            onPress={async () => {
            if (savingRef.current) return;
            savingRef.current = true;
            setSaving(true);
            setError("");
            let shouldNavigate = true;
            try {
              // 1. Create group + add user as admin via SECURITY DEFINER function
              //    (avoids RLS infinite recursion on group_members)
              const { error: rpcError } = await supabase.rpc(
                "create_group_with_admin",
                {
                  p_group_name: name.trim() || "My Circle",
                  p_vibe: vibe,
                  p_telegram_chat_id: tgOn ? "pending" : null,
                }
              );
              if (rpcError) throw rpcError;

              // 2. Mark onboarding complete in user_preferences
              await upsertUserPreferences({ onboarding_completed: true });

              // 5. Non-critical: save weights for recommendation engine
              try {
                await insertUserWeights([
                  { category: "circle_vibe", item: vibe, score: 1 },
                  { category: "telegram", item: "enabled", score: tgOn ? 1 : 0 },
                  { category: "circle_name", item: name.trim() || "Circle", score: 1 },
                ]);
              } catch (e) {
                console.warn("user_weights (non-critical):", e?.message);
              }
            } catch (e) {
              setError(e?.message || "No se pudo crear tu círculo");
              shouldNavigate = false;
            } finally {
              savingRef.current = false;
              setSaving(false);
            }
            if (shouldNavigate) {
              await completeOnboarding();
            }
          }}
          />
          <Pressable
            onPress={onSkip}
            disabled={saving || skipLoading}
            style={styles.skipBtn}
          >
            <Text style={styles.skipBtnText}>
              {skipLoading ? "Entering ReadMatch…" : "Later →"}
            </Text>
          </Pressable>
        </View>
      }
    >
      <View style={styles.progress}>
        <View style={styles.dots}>
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={[styles.dot, styles.dotOn]} />
          ))}
        </View>
        <Text style={styles.stepLabel}>05 / 05</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.kicker}>★ Chapter four</Text>
        <Text style={styles.title}>
          Create your{"\n"}
          <Text style={styles.titleItalic}>circle</Text>
        </Text>
        <Text style={styles.subtitle}>
          Start your own reading circle — or skip this step and jump straight to
          the dashboard.
        </Text>
      </View>
      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* Q1 — Name */}
      <View style={styles.card}>
        <Text style={styles.cardQ}>Q · 01</Text>
        <Text style={styles.cardTitle}>Name your circle</Text>
        <View style={styles.nameRow}>
          <View
            style={[
              styles.circleIcon,
              { backgroundColor: selectedVibe?.color ?? colors.purple },
            ]}
          >
            <Text style={styles.circleInitials}>
              {name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </Text>
          </View>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.nameInput}
            placeholder="Circle name…"
            placeholderTextColor="rgba(22,16,46,0.35)"
          />
        </View>
        <View style={styles.vibes}>
          {VIBES.map((v) => {
            const on = vibe === v.id;
            return (
              <Pressable
                key={v.id}
                onPress={() => setVibe(v.id)}
                style={[
                  styles.vibeChip,
                  on && {
                    backgroundColor: v.color,
                    borderColor: colors.ink,
                    borderWidth: 1.5,
                  },
                ]}
              >
                <Text style={styles.vibeIcon}>{v.icon}</Text>
                <Text style={styles.vibeLabel}>{v.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Q2 — Invite */}
      <View style={styles.card}>
        <Text style={styles.cardQ}>Q · 02</Text>
        <Text style={styles.cardTitle}>Invite a friend or two</Text>
        <View style={styles.inviteRow}>
          {MEMBERS.slice(0, 3).map((m) => (
            <View key={m.id} style={styles.inviteSlot}>
              <Avatar m={m} size={48} />
              <Text style={styles.inviteName}>{m.name.toUpperCase()}</Text>
            </View>
          ))}
          {[1, 2].map((i) => (
            <Pressable key={i} style={styles.inviteSlot}>
              <View style={styles.inviteEmpty}>
                <Text style={styles.inviteEmptyText}>+</Text>
              </View>
              <Text style={styles.inviteName}>ADD</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.methodRow}>
          {[
            { label: "Link", bg: colors.ink, text: colors.cream },
            { label: "QR code", bg: colors.purple, text: colors.cream },
            { label: "Telegram", bg: colors.lime, text: colors.ink },
          ].map((m) => (
            <Pressable
              key={m.label}
              style={[styles.methodBtn, { backgroundColor: m.bg }]}
            >
              <Text style={[styles.methodBtnText, { color: m.text }]}>
                {m.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Q3 — Telegram toggle */}
      <View style={[styles.tgCard, tgOn && styles.tgCardOn]}>
        <Text style={[styles.cardQ, tgOn && styles.cardQLime]}>Q · 03</Text>
        <View style={styles.tgRow}>
          <View
            style={[
              styles.tgIcon,
              { backgroundColor: tgOn ? colors.lime : colors.lavender },
            ]}
          >
            <Text style={styles.tgIconText}>↗</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.tgTitle, tgOn && { color: colors.cream }]}>
              Connect Telegram
            </Text>
            <Text
              style={[
                styles.tgBody,
                tgOn && { color: "rgba(251,246,235,0.75)" },
              ]}
            >
              We'll create a private channel. Recs, votes & members sync both
              ways — automatically.
            </Text>
            {tgOn && (
              <View style={styles.tgPills}>
                <View style={styles.tgPillLime}>
                  <Text style={styles.tgPillLimeText}>● Auto-create</Text>
                </View>
                <View style={styles.tgPillGlass}>
                  <Text style={styles.tgPillGlassText}>Bidirectional</Text>
                </View>
              </View>
            )}
          </View>
          <Pressable
            onPress={() => setTgOn((v) => !v)}
            style={[styles.toggle, tgOn && styles.toggleOn]}
          >
            <View style={[styles.toggleThumb, tgOn && styles.toggleThumbOn]} />
          </Pressable>
        </View>
        {tgOn && (
          <View style={styles.syncBox}>
            <Text style={styles.syncLabel}>WHAT SYNCS</Text>
            <View style={styles.syncTags}>
              {SYNC_TAGS.map((t) => (
                <View key={t} style={styles.syncTag}>
                  <Text style={styles.syncTagText}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
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
  stepLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
    color: "rgba(22,16,46,0.5)",
  },
  header: { paddingHorizontal: 22, paddingBottom: 18 },
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
  subtitle: {
    marginTop: 10,
    fontSize: 13,
    color: "rgba(22,16,46,0.65)",
    fontWeight: "600",
    lineHeight: 19,
  },
  errorBox: {
    marginHorizontal: 22,
    marginBottom: 10,
    backgroundColor: "rgba(255,126,107,0.12)",
    borderRadius: radii.md,
    padding: 12,
  },
  errorText: { fontSize: 12, fontWeight: "700", color: "#C0392B" },
  card: {
    marginHorizontal: 22,
    marginBottom: 12,
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(22,16,46,0.06)",
  },
  cardQ: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: "rgba(22,16,46,0.5)",
    marginBottom: 4,
  },
  cardQLime: { color: "rgba(212,255,61,0.85)" },
  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -0.3,
    marginBottom: 14,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  circleIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  circleInitials: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -0.5,
  },
  nameInput: {
    flex: 1,
    fontSize: 22,
    fontWeight: "900",
    color: colors.ink,
    borderBottomWidth: 2,
    borderBottomColor: colors.purple,
    paddingBottom: 4,
    letterSpacing: -0.5,
  },
  vibes: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  vibeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: radii.pill,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.mist,
    borderWidth: 1,
    borderColor: "transparent",
  },
  vibeIcon: { fontSize: 14 },
  vibeLabel: { fontSize: 13, fontWeight: "800", color: colors.ink },
  inviteRow: { flexDirection: "row", gap: 6, marginBottom: 14 },
  inviteSlot: { flex: 1, alignItems: "center", gap: 6 },
  inviteName: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: "rgba(22,16,46,0.55)",
    textTransform: "uppercase",
  },
  inviteEmpty: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "rgba(22,16,46,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  inviteEmptyText: {
    fontSize: 20,
    fontWeight: "900",
    color: "rgba(22,16,46,0.4)",
  },
  methodRow: { flexDirection: "row", gap: 6 },
  methodBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  methodBtnText: { fontWeight: "900", fontSize: 12 },
  tgCard: {
    marginHorizontal: 22,
    marginBottom: 12,
    borderRadius: radii.xl,
    padding: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "rgba(22,16,46,0.06)",
  },
  tgCardOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  tgRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    marginTop: 4,
  },
  tgIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  tgIconText: { fontSize: 18, fontWeight: "900", color: colors.ink },
  tgTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -0.3,
  },
  tgBody: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(22,16,46,0.65)",
    lineHeight: 17,
    marginTop: 4,
  },
  tgPills: { flexDirection: "row", gap: 6, marginTop: 10 },
  tgPillLime: {
    borderRadius: radii.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "rgba(212,255,61,0.12)",
  },
  tgPillLimeText: { fontSize: 10, fontWeight: "800", color: colors.lime },
  tgPillGlass: {
    borderRadius: radii.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  tgPillGlassText: {
    fontSize: 10,
    fontWeight: "800",
    color: "rgba(251,246,235,0.65)",
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(22,16,46,0.15)",
    justifyContent: "center",
    paddingHorizontal: 2,
    flexShrink: 0,
  },
  toggleOn: { backgroundColor: colors.lime },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.ink,
    alignSelf: "flex-start",
  },
  toggleThumbOn: { alignSelf: "flex-end" },
  syncBox: {
    marginTop: 14,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(212,255,61,0.08)",
    borderWidth: 0.5,
    borderColor: "rgba(212,255,61,0.25)",
  },
  syncLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.6,
    color: "rgba(251,246,235,0.5)",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  syncTags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  syncTag: {
    borderRadius: radii.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  syncTagText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.lime,
    letterSpacing: 0.4,
  },
  footer: { position: "absolute", left: 22, right: 22, bottom: 26 },
  skipBtn: {
    alignItems: "center",
    paddingVertical: 12,
    opacity: 1,
  },
  skipBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "rgba(22,16,46,0.5)",
    letterSpacing: 0.2,
  },
});
