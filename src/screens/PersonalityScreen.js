import { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { colors, radii } from "../theme/tokens";
import { routes } from "../navigation/routes";

const DEPTH_NUM = { light: 25, balanced: 55, deep: 82, experimental: 96 };
const GENRE_COLORS = [
  { c: colors.purple, dark: true },
  { c: colors.coral, dark: false },
  { c: colors.lime, dark: false },
  { c: colors.lavender, dark: false },
  { c: colors.ink, dark: true },
  { c: colors.cream, outline: true },
];

export function PersonalityScreen({ navigation }) {
  const { user, signOut } = useAuth();
  const [prefs, setPrefs] = useState(null);
  const [createdCount, setCreatedCount] = useState(0);
  const [joinedCount, setJoinedCount] = useState(0);

  const loadData = useCallback(async () => {
    if (!user?.id) return;
    const [{ data: p }, { count: total }, { count: admin }] = await Promise.all(
      [
        supabase
          .from("user_preferences")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("group_members")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id),
        supabase
          .from("group_members")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("role", "admin"),
      ],
    );
    setPrefs(p ?? {});
    setCreatedCount(admin ?? 0);
    setJoinedCount((total ?? 0) - (admin ?? 0));
  }, [user?.id]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  const archParts = (prefs?.archetype ?? "").split(" ");
  const archFirst = archParts[0] ?? "—";
  const archRest = archParts.slice(1).join(" ") || "—";

  const genres = prefs?.favorite_genres ?? [];
  const styles_list = prefs?.narrative_styles ?? [];
  const openness = prefs?.openness_score ?? 0;
  const depthLabel = prefs?.depth_preference ?? "—";
  const depthNum = DEPTH_NUM[depthLabel] ?? 55;
  const genresNum = Math.min(Math.round((genres.length / 8) * 100), 100);
  const stylesNum = Math.min(Math.round((styles_list.length / 7) * 100), 100);

  const nameInitial = user?.name?.[0]?.toUpperCase() ?? "?";
  const hasReveal = Boolean(prefs?.reveal_text);

  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>
      <LinearGradient
        colors={[colors.lavender, colors.cream]}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 1 }}
        style={styles.hero}
      >
        <TopBar
          subtitle={`Reading identity · ${user?.name ?? ""}`}
          title={null}
          onBack={() => navigation.goBack()}
          right={
            <Pressable
              accessibilityRole="button"
              onPress={signOut}
              style={styles.logoutBtn}
            >
              <Text style={styles.logoutText}>Sign out</Text>
            </Pressable>
          }
        />

        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarLetter}>{nameInitial}</Text>
            </View>
            <View>
              <Text style={styles.name}>{user?.name ?? "—"}</Text>
              <Text style={styles.meta}>READER</Text>
            </View>
          </View>

          {prefs?.archetype ? (
            <>
              <Text style={styles.type}>
                {archFirst}
                {"\n"}
                <Text style={styles.typeAccent}>{archRest}</Text>
              </Text>
              {hasReveal ? (
                <Text style={styles.blurb}>{prefs.reveal_text}</Text>
              ) : (
                <Pressable
                  style={styles.discoverBtn}
                  onPress={() => navigation.navigate(routes.OnbReveal)}
                >
                  <Text style={styles.discoverBtnText}>
                    Discover my profile →
                  </Text>
                </Pressable>
              )}
            </>
          ) : (
            <Pressable
              style={[styles.discoverBtn, { marginTop: 18 }]}
              onPress={() => navigation.navigate(routes.OnbReveal)}
            >
              <Text style={styles.discoverBtnText}>
                Discover my reading identity →
              </Text>
            </Pressable>
          )}

          <View style={styles.miniStats}>
            {[
              { l: "depth", v: depthLabel },
              { l: "openness", v: `${openness}%` },
              { l: "circles", v: `${createdCount + joinedCount}` },
            ].map((s) => (
              <View key={s.l}>
                <Text style={styles.miniKicker}>{s.l}</Text>
                <Text style={styles.miniVal}>{s.v}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>

      <Text style={styles.section}>Compatibility aura</Text>
      <View style={styles.auraGrid}>
        {[
          { l: "Openness", v: openness, c: colors.coral },
          { l: "Depth", v: depthNum, c: colors.purple },
          { l: "Genres", v: genresNum, c: colors.lime },
          { l: "Styles", v: stylesNum, c: colors.white, invert: true },
        ].map((t) => (
          <View
            key={t.l}
            style={[
              styles.auraCard,
              t.invert ? styles.auraInvert : { backgroundColor: t.c },
            ]}
          >
            <Text style={styles.auraKicker}>{t.l}</Text>
            <Text style={styles.auraVal}>
              {t.v}
              <Text style={{ fontSize: 14 }}>%</Text>
            </Text>
            <View
              style={[
                styles.auraTrack,
                {
                  backgroundColor: t.invert
                    ? "rgba(22,16,46,0.08)"
                    : "rgba(22,16,46,0.15)",
                },
              ]}
            >
              <View style={[styles.auraFill, { width: `${t.v}%` }]} />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.section}>Signature genres</Text>
        <Text style={styles.small}>TOP {genres.length}</Text>
      </View>
      {genres.length > 0 ? (
        <View style={styles.tags}>
          {genres.map((g, i) => {
            const palette = GENRE_COLORS[i % GENRE_COLORS.length];
            return (
              <View
                key={g}
                style={[
                  styles.tag,
                  { backgroundColor: palette.c },
                  palette.outline ? styles.tagOutline : null,
                ]}
              >
                <Text
                  style={[
                    styles.tagText,
                    palette.dark
                      ? { color: colors.cream }
                      : { color: colors.ink },
                  ]}
                >
                  {g}
                </Text>
              </View>
            );
          })}
        </View>
      ) : (
        <Text style={styles.emptyHint}>No genres selected yet</Text>
      )}

      {styles_list.length > 0 && (
        <>
          <View style={styles.sectionRow}>
            <Text style={[styles.section, { marginTop: 18 }]}>
              Narrative styles
            </Text>
            <Text style={styles.small}>{styles_list.length} selected</Text>
          </View>
          <View style={styles.tags}>
            {styles_list.map((s, i) => {
              const palette = GENRE_COLORS[(i + 2) % GENRE_COLORS.length];
              return (
                <View
                  key={s}
                  style={[
                    styles.tag,
                    { backgroundColor: palette.c },
                    palette.outline ? styles.tagOutline : null,
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      palette.dark
                        ? { color: colors.cream }
                        : { color: colors.ink },
                    ]}
                  >
                    {s}
                  </Text>
                </View>
              );
            })}
          </View>
        </>
      )}

      <Text style={[styles.section, { marginTop: 18 }]}>Reading circles</Text>
      <View style={styles.groupsRow}>
        <View style={styles.groupCard}>
          <Text style={styles.groupVal}>{createdCount}</Text>
          <Text style={styles.groupLabel}>Created</Text>
        </View>
        <View style={[styles.groupCard, { backgroundColor: colors.lavender }]}>
          <Text style={styles.groupVal}>{joinedCount}</Text>
          <Text style={styles.groupLabel}>Joined</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
  },
  hero: {
    paddingBottom: 18,
  },
  logoutBtn: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: radii.pill,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: colors.cream,
    fontWeight: "900",
    fontSize: 11,
    letterSpacing: 0.4,
  },
  profileCard: {
    marginTop: 10,
    marginHorizontal: 22,
    borderRadius: 28,
    padding: 18,
    backgroundColor: colors.ink,
    shadowColor: colors.ink,
    shadowOpacity: 0.32,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 18 },
    elevation: 6,
  },
  profileTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center",
  },
  userAvatarLetter: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.cream,
  },
  name: {
    color: colors.cream,
    fontWeight: "800",
  },
  meta: {
    marginTop: 4,
    fontSize: 10,
    letterSpacing: 1.4,
    color: "rgba(251,246,235,0.5)",
    fontWeight: "800",
  },
  type: {
    marginTop: 14,
    fontSize: 42,
    color: colors.cream,
    fontWeight: "900",
    letterSpacing: -1.1,
    lineHeight: 44,
  },
  typeAccent: {
    color: colors.lime,
    fontStyle: "italic",
    fontWeight: "700",
  },
  blurb: {
    marginTop: 10,
    fontSize: 15,
    fontStyle: "italic",
    color: "rgba(251,246,235,0.85)",
    fontWeight: "600",
    lineHeight: 20,
  },
  discoverBtn: {
    marginTop: 12,
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: radii.pill,
    backgroundColor: colors.lime,
  },
  discoverBtnText: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.ink,
  },
  miniStats: {
    marginTop: 14,
    flexDirection: "row",
    gap: 18,
  },
  miniKicker: {
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "rgba(251,246,235,0.45)",
    fontWeight: "800",
  },
  miniVal: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: "900",
    color: colors.cream,
    letterSpacing: -0.4,
  },
  section: {
    marginTop: 18,
    marginHorizontal: 22,
    fontSize: 20,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -0.3,
  },
  auraGrid: {
    marginTop: 10,
    marginHorizontal: 22,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  auraCard: {
    width: "48%",
    borderRadius: radii.lg,
    padding: 14,
    overflow: "hidden",
  },
  auraInvert: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "rgba(22,16,46,0.08)",
  },
  auraKicker: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    opacity: 0.7,
    fontWeight: "900",
    color: colors.ink,
  },
  auraVal: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -0.6,
  },
  auraTrack: {
    marginTop: 10,
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  auraFill: {
    height: "100%",
    borderRadius: 2,
    backgroundColor: colors.ink,
  },
  sectionRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingHorizontal: 22,
  },
  small: {
    fontSize: 10,
    letterSpacing: 1.4,
    color: "rgba(22,16,46,0.45)",
    fontWeight: "800",
  },
  tags: {
    marginTop: 10,
    marginHorizontal: 22,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  tagOutline: {
    borderWidth: 1,
    borderColor: "rgba(22,16,46,0.15)",
  },
  tagText: {
    fontSize: 13,
    fontWeight: "700",
  },
  emptyHint: {
    marginHorizontal: 22,
    marginTop: 10,
    fontSize: 13,
    color: "rgba(22,16,46,0.4)",
    fontStyle: "italic",
  },
  groupsRow: {
    marginTop: 10,
    marginHorizontal: 22,
    flexDirection: "row",
    gap: 12,
  },
  groupCard: {
    flex: 1,
    borderRadius: radii.lg,
    padding: 18,
    backgroundColor: colors.lime,
    alignItems: "center",
  },
  groupVal: {
    fontSize: 40,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -1,
  },
  groupLabel: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "rgba(22,16,46,0.6)",
  },
});
