import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Screen } from "../components/Screen";
import { RMButton } from "../components/RMButton";
import { supabase } from "../lib/supabase";
import {
  createGroupWithMembers,
  insertUserWeights,
  upsertUserPreferences,
} from "../utils/userStorage";
import { useAuth } from "../context/AuthContext";
import { colors, radii } from "../theme/tokens";
import { routes } from "../navigation/routes";

const VIBE_CATEGORIES = [
  {
    label: "Styles",
    options: [
      "Dark Academia",
      "Cozy Fantasy",
      "Psychological",
      "Emotional",
      "Philosophical",
      "Fast Thrillers",
      "Sci-Fi",
      "Character-driven",
    ],
  },
  {
    label: "Genres",
    options: [
      "Literary",
      "Fantasy",
      "Mystery",
      "Romance",
      "Memoir",
      "History",
      "Horror",
      "Essays",
      "Poetry",
      "Climate",
      "Politics",
    ],
  },
  {
    label: "Pace",
    options: [
      "Light & fast",
      "Balanced & immersive",
      "Deep & philosophical",
      "Experimental",
    ],
  },
];
const MAX_VIBES = 5;

export function OnbCollabScreen({ navigation }) {
  const { completeOnboarding } = useAuth();
  const [name, setName] = useState("Slow Burners");
  const [selectedVibes, setSelectedVibes] = useState([]);
  const [vibeError, setVibeError] = useState("");
  const [tgOn, setTgOn] = useState(false);
  const [friendQuery, setFriendQuery] = useState("");
  const [friendResults, setFriendResults] = useState([]);
  const [friendSearching, setFriendSearching] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [saving, setSaving] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);
  const [error, setError] = useState("");
  const [groupLink, setGroupLink] = useState(null);
  const [createdGroupId, setCreatedGroupId] = useState(null);
  const savingRef = useRef(false);
  const selectedFriendsRef = useRef(selectedFriends);
  useEffect(() => {
    selectedFriendsRef.current = selectedFriends;
  }, [selectedFriends]);

  useEffect(() => {
    if (friendQuery.trim().length < 2) {
      setFriendResults([]);
      return;
    }
    setFriendSearching(true);
    const t = setTimeout(async () => {
      try {
        const { data } = await supabase.rpc("search_users", {
          query: friendQuery.trim(),
        });
        setFriendResults(
          (data ?? []).filter(
            (r) =>
              !selectedFriendsRef.current.some((f) => f.user_id === r.user_id),
          ),
        );
      } catch (_) {}
      setFriendSearching(false);
    }, 500);
    return () => clearTimeout(t);
  }, [friendQuery]);

  const toggleVibe = (label) => {
    setVibeError("");
    if (selectedVibes.includes(label)) {
      setSelectedVibes((v) => v.filter((x) => x !== label));
    } else {
      if (selectedVibes.length >= MAX_VIBES) {
        setVibeError("Max 5 vibes per circle");
        return;
      }
      setSelectedVibes((v) => [...v, label]);
    }
  };

  const friendLabel = (f) => f.username || f.email?.split("@")[0] || "?";

  const addFriend = (f) => {
    setSelectedFriends((prev) => [...prev, f]);
    setFriendResults((r) => r.filter((x) => x.user_id !== f.user_id));
    setFriendQuery("");
  };

  const onSkip = async () => {
    if (savingRef.current || skipLoading) return;
    setSkipLoading(true);
    try {
      await completeOnboarding();
    } catch (e) {
      setError(e?.message || "Could not continue");
      setSkipLoading(false);
    }
  };

  const onCreate = async () => {
    if (savingRef.current) return;
    savingRef.current = true;
    setSaving(true);
    setError("");
    try {
      const { groupId } = await createGroupWithMembers({
        groupName: name.trim() || "My Circle",
        vibes: selectedVibes,
        tgOn,
        friendUserIds: selectedFriends.map((f) => f.user_id),
      });
      try {
        await upsertUserPreferences({ onboarding_completed: true });
      } catch (_) {}
      try {
        if (selectedVibes.length) {
          await insertUserWeights([
            {
              category: "circle_vibe",
              item: selectedVibes.join(","),
              score: 1,
            },
          ]);
        }
      } catch (e) {
        console.warn("weights:", e?.message);
      }
      setCreatedGroupId(groupId);
      setGroupLink(`readmatch://join/${groupId}`);
    } catch (e) {
      setError(e?.message || "Could not create your circle");
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  };

  if (groupLink) {
    return (
      <Screen
        backgroundColor={colors.ink}
        footer={
          <View style={{ gap: 10 }}>
            <RMButton
              title={saving ? "Entrando…" : "Ver mi círculo →"}
              variant="primary"
              disabled={saving}
              onPress={async () => {
                setSaving(true);
                try {
                  await completeOnboarding();
                  navigation.navigate(routes.GroupDetail, { groupId: createdGroupId });
                } catch (e) {
                  setError(e?.message || "");
                  setSaving(false);
                }
              }}
            />
            <Pressable
              disabled={saving}
              onPress={async () => {
                setSaving(true);
                try {
                  await completeOnboarding();
                } catch (e) {
                  setError(e?.message || "");
                  setSaving(false);
                }
              }}
              style={styles.skipBtn}
            >
              <Text style={styles.skipText}>
                {saving ? "Entrando…" : "Ir al inicio →"}
              </Text>
            </Pressable>
          </View>
        }
      >
        <View style={styles.linkWrap}>
          <Text style={styles.linkKicker}>✦ Your circle is ready</Text>
          <Text style={styles.linkTitle}>
            Share this{"\n"}
            <Text style={styles.linkAccent}>link</Text>
          </Text>
          <Text style={styles.linkSub}>
            with your friends so they can join your circle.
          </Text>
          <TextInput
            value={groupLink}
            editable={false}
            selectTextOnFocus
            style={styles.linkInput}
          />
          <Text style={styles.linkHint}>Select the text to copy it</Text>
          {tgOn && (
            <Text style={styles.linkTgNote}>
              The Telegram bot will activate when you connect it — placeholder
              for now.
            </Text>
          )}
          {error ? <Text style={styles.linkError}>{error}</Text> : null}
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      backgroundColor={colors.cream}
      footer={
        <View style={{ gap: 10 }}>
          <RMButton
            title={saving ? "Saving…" : "Create my circle ✦"}
            variant={!saving ? "dark" : "ghost"}
            disabled={saving || skipLoading}
            onPress={onCreate}
          />
          <Pressable
            onPress={onSkip}
            disabled={saving || skipLoading}
            style={styles.skipBtn}
          >
            <Text style={styles.skipText}>
              {skipLoading ? "Entering…" : "Later →"}
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
        <Text style={styles.kicker}>★ Chapter five</Text>
        <Text style={styles.title}>
          Create your{"\n"}
          <Text style={styles.titleItalic}>circle</Text>
        </Text>
        <Text style={styles.subtitle}>
          Start your own reading circle — or skip and jump straight to the
          dashboard.
        </Text>
      </View>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* Q01 — Name */}
      <View style={styles.card}>
        <Text style={styles.cardQ}>Q · 01</Text>
        <Text style={styles.cardTitle}>Name your circle</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.nameInput}
          placeholder="Circle name…"
          placeholderTextColor="rgba(22,16,46,0.35)"
        />
      </View>

      {/* Q02 — Vibes */}
      <View style={styles.card}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.cardQ}>Q · 02</Text>
          <Text
            style={[
              styles.vibeCount,
              selectedVibes.length > 0 && styles.vibeCountActive,
            ]}
          >
            {selectedVibes.length} / {MAX_VIBES}
          </Text>
        </View>
        <Text style={styles.cardTitle}>What will your circle read?</Text>
        {vibeError ? <Text style={styles.vibeError}>{vibeError}</Text> : null}
        {VIBE_CATEGORIES.map((cat) => (
          <View key={cat.label} style={styles.vibeGroup}>
            <Text style={styles.vibeCatLabel}>{cat.label}</Text>
            <View style={styles.vibeChips}>
              {cat.options.map((opt) => {
                const on = selectedVibes.includes(opt);
                return (
                  <Pressable
                    key={`${cat.label}-${opt}`}
                    onPress={() => toggleVibe(opt)}
                    style={[styles.vibeChip, on && styles.vibeChipOn]}
                  >
                    <Text
                      style={[styles.vibeChipText, on && styles.vibeChipTextOn]}
                    >
                      {opt}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
        <Text style={styles.vibeHint}>
          This gives us an idea of your group's reading style — recommendations
          always adapt to each member's actual tastes.
        </Text>
      </View>

      {/* Q03 — Friends */}
      <View style={styles.card}>
        <Text style={styles.cardQ}>Q · 03</Text>
        <Text style={styles.cardTitle}>Invite friends</Text>
        <View style={styles.searchRow}>
          <TextInput
            value={friendQuery}
            onChangeText={setFriendQuery}
            style={styles.searchInput}
            placeholder="Search by username…"
            placeholderTextColor="rgba(22,16,46,0.35)"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {friendSearching && <Text style={styles.spinner}>···</Text>}
        </View>
        {friendResults.length > 0 && (
          <View style={styles.results}>
            {friendResults.map((r) => (
              <Pressable
                key={r.user_id}
                style={styles.resultRow}
                onPress={() => addFriend(r)}
              >
                <View style={styles.resultAvatar}>
                  <Text style={styles.resultAvatarText}>
                    {friendLabel(r)[0].toUpperCase()}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.resultName}>{friendLabel(r)}</Text>
                  {r.username && r.email ? (
                    <Text style={styles.resultEmail}>{r.email}</Text>
                  ) : null}
                </View>
                <Text style={styles.resultAdd}>+ Invite</Text>
              </Pressable>
            ))}
          </View>
        )}
        {selectedFriends.length > 0 && (
          <View style={styles.selectedRow}>
            {selectedFriends.map((f) => (
              <Pressable
                key={f.user_id}
                style={styles.selectedChip}
                onPress={() =>
                  setSelectedFriends((p) =>
                    p.filter((x) => x.user_id !== f.user_id),
                  )
                }
              >
                <Text style={styles.selectedName}>{friendLabel(f)}</Text>
                <Text style={styles.selectedX}>×</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* Q04 — Telegram */}
      <View style={[styles.tgCard, tgOn && styles.tgCardOn]}>
        <Text style={[styles.cardQ, tgOn && styles.cardQLime]}>Q · 04</Text>
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
              Connect your group to Telegram to receive recommendations directly
              there.
            </Text>
          </View>
          <Pressable
            onPress={() => setTgOn((v) => !v)}
            style={[styles.toggle, tgOn && styles.toggleOn]}
          >
            <View style={[styles.toggleThumb, tgOn && styles.toggleThumbOn]} />
          </Pressable>
        </View>
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
  dot: { width: 26, height: 4, borderRadius: 2 },
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
  cardTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardQ: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: "rgba(22,16,46,0.5)",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -0.3,
    marginBottom: 14,
  },
  nameInput: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.ink,
    borderBottomWidth: 2,
    borderBottomColor: colors.purple,
    paddingBottom: 4,
    letterSpacing: -0.5,
  },
  vibeCount: {
    fontSize: 11,
    fontWeight: "800",
    color: "rgba(22,16,46,0.35)",
    letterSpacing: 0.5,
  },
  vibeCountActive: { color: colors.purple },
  vibeError: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.coral,
    marginBottom: 8,
  },
  vibeGroup: { marginBottom: 14 },
  vibeCatLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "rgba(22,16,46,0.45)",
    marginBottom: 8,
  },
  vibeChips: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  vibeChip: {
    borderRadius: radii.pill,
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: "rgba(22,16,46,0.04)",
    borderWidth: 1,
    borderColor: "rgba(22,16,46,0.08)",
  },
  vibeChipOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  vibeChipText: { fontSize: 12, fontWeight: "700", color: colors.ink },
  vibeChipTextOn: { color: colors.cream },
  vibeHint: {
    fontSize: 11,
    color: "rgba(22,16,46,0.42)",
    fontWeight: "600",
    lineHeight: 16,
    marginTop: 4,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(22,16,46,0.12)",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: colors.ink,
    paddingVertical: 8,
  },
  spinner: { fontSize: 16, color: "rgba(22,16,46,0.35)", letterSpacing: 2 },
  results: { borderRadius: radii.md, overflow: "hidden", marginBottom: 8 },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(22,16,46,0.05)",
  },
  resultAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.lavender,
    alignItems: "center",
    justifyContent: "center",
  },
  resultAvatarText: { fontSize: 13, fontWeight: "900", color: colors.ink },
  resultName: { fontSize: 14, fontWeight: "700", color: colors.ink },
  resultEmail: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(22,16,46,0.45)",
    marginTop: 1,
  },
  resultAdd: { fontSize: 12, fontWeight: "800", color: colors.purple },
  selectedRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 4 },
  selectedChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: radii.pill,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.purple,
  },
  selectedName: { fontSize: 12, fontWeight: "800", color: colors.cream },
  selectedX: {
    fontSize: 14,
    fontWeight: "900",
    color: "rgba(251,246,235,0.65)",
  },
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
  cardQLime: { color: "rgba(212,255,61,0.85)" },
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
  skipBtn: { alignItems: "center", paddingVertical: 12 },
  skipText: {
    fontSize: 13,
    fontWeight: "700",
    color: "rgba(22,16,46,0.5)",
    letterSpacing: 0.2,
  },
  linkWrap: { paddingHorizontal: 22, paddingTop: 60 },
  linkKicker: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
    color: colors.lime,
    marginBottom: 12,
  },
  linkTitle: {
    fontSize: 40,
    fontWeight: "900",
    color: colors.cream,
    letterSpacing: -1,
    lineHeight: 42,
  },
  linkAccent: { fontStyle: "italic", fontWeight: "400", color: colors.lime },
  linkSub: {
    marginTop: 10,
    fontSize: 14,
    color: "rgba(251,246,235,0.7)",
    fontWeight: "600",
    lineHeight: 20,
    marginBottom: 28,
  },
  linkInput: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: radii.md,
    padding: 14,
    fontSize: 14,
    fontWeight: "700",
    color: colors.lime,
    letterSpacing: 0.3,
    borderWidth: 0.5,
    borderColor: "rgba(212,255,61,0.3)",
  },
  linkHint: {
    marginTop: 8,
    fontSize: 11,
    color: "rgba(251,246,235,0.38)",
    fontWeight: "600",
  },
  linkTgNote: {
    marginTop: 20,
    fontSize: 12,
    color: "rgba(251,246,235,0.48)",
    fontWeight: "600",
    lineHeight: 18,
  },
  linkError: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: "700",
    color: colors.coral,
  },
});
