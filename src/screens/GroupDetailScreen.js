import * as Clipboard from "expo-clipboard";
import { triggerGroupRecommendations } from "../utils/userStorage";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { colors, radii } from "../theme/tokens";
import { routes } from "../navigation/routes";

const BADGE_COLORS = [
  colors.purple,
  colors.coral,
  colors.lavender,
  colors.violet,
  colors.lime,
  "#E8E0FF",
];

function strHash(s = "") {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
function groupInitials(name = "") {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0] ?? "")
      .join("")
      .toUpperCase() || "?"
  );
}
function badgeColor(id = "") {
  return BADGE_COLORS[strHash(id) % BADGE_COLORS.length];
}

function toPct(value, decimals = 0) {
  const n = Number(value) || 0;
  const factor = 10 ** decimals;
  return Math.round(n * 100 * factor) / factor;
}

function MemberCard({ member }) {
  const prefs = member.user_preferences ?? {};
  const archetype = prefs.archetype ?? "";
  const username = prefs.username ?? "";
  const label = archetype || username || "Member";
  const initial =
    archetype?.[0]?.toUpperCase() ?? username?.[0]?.toUpperCase() ?? "?";
  const bg = badgeColor(member.user_id);
  const dark = bg === colors.purple || bg === colors.violet;

  return (
    <View style={styles.memberCard}>
      <View style={[styles.memberAvatar, { backgroundColor: bg }]}>
        <Text
          style={[styles.memberAvatarText, dark && { color: colors.cream }]}
        >
          {initial}
        </Text>
      </View>
      <Text style={styles.memberLabel} numberOfLines={1}>
        {label}
      </Text>
      {member.role === "admin" && (
        <View style={styles.adminBadge}>
          <Text style={styles.adminText}>Admin</Text>
        </View>
      )}
    </View>
  );
}

function RecCard({ rec, index, onPress }) {
  const book = rec.books ?? rec.book ?? {};
  const title = book.nombre_libro ?? book.title ?? "—";
  const author = book.autor ?? book.author ?? "";
  const genreRaw = book.genero ?? book.genre ?? "";
  const genres = (
    typeof genreRaw === "string" ? genreRaw.split(",") : [String(genreRaw)]
  )
    .map((g) => g.trim())
    .filter(Boolean)
    .slice(0, 2);
  const groupScore =
    rec.final_score ?? rec.collaborative_score ?? rec.score ?? 0;
  const score = toPct(groupScore, 0);
  const why = rec.explanation?.why_recommended ?? rec.reasons?.[0] ?? null;
  const isTop = index === 0;
  const metricItems = [
    { label: "Group", value: toPct(groupScore, 0) },
    { label: "Fairness", value: toPct(rec.fairness_score, 0) },
    { label: "Coverage", value: toPct(rec.member_coverage, 0) },
  ];

  return (
    <Pressable onPress={onPress} style={styles.recCard}>
      <View style={[styles.rankPill, isTop && styles.rankPillTop]}>
        <Text style={[styles.rankText, isTop && styles.rankTextTop]}>
          #{rec.rank ?? index + 1}
        </Text>
      </View>

      <View style={styles.recInfo}>
        <Text style={styles.recTitle} numberOfLines={2}>
          {title}
        </Text>
        {author ? (
          <Text style={styles.recAuthor} numberOfLines={1}>
            {author}
          </Text>
        ) : null}
        {genres.length > 0 && (
          <View style={styles.recGenres}>
            {genres.map((g) => (
              <View key={g} style={styles.genrePill}>
                <Text style={styles.genreText}>{g}</Text>
              </View>
            ))}
          </View>
        )}
        {why ? (
          <Text style={styles.recReason} numberOfLines={3}>
            Motivo: {why}
          </Text>
        ) : null}
        <View style={styles.statsRow}>
          {metricItems.map((item) => (
            <View key={item.label} style={styles.statPill}>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statValue}>{item.value}%</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.scoreBubble, isTop && styles.scoreBubbleTop]}>
        <Text style={[styles.scoreNum, isTop && styles.scoreNumTop]}>
          {score}
        </Text>
        <Text style={[styles.scorePct, isTop && styles.scorePctTop]}>%</Text>
      </View>
    </Pressable>
  );
}

export function GroupDetailScreen({ navigation, route }) {
  const { user } = useAuth();
  const { groupId } = route.params ?? {};
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recalculating, setRecalculating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [metodo, setMetodo] = useState("media_sigma");

  const loadGroupData = useCallback(async ({ skipTrigger = false } = {}) => {
    if (!groupId) return;
    try {
      const [{ data: g }, { data: memberRows }, { data: recRows }] =
        await Promise.all([
          supabase
            .from("recommendation_groups")
            .select("id, group_name, vibe, telegram_chat_id, created_by, join_code")
            .eq("id", groupId)
            .maybeSingle(),
          supabase
            .from("group_members")
            .select("user_id, role")
            .eq("group_id", groupId),
          supabase
            .from("group_recommendations")
            .select(
              "rank, final_score, content_score, collaborative_score, popularity_score, fairness_score, member_coverage, per_member_scores, explanation, book_id",
            )
            .eq("group_id", groupId)
            .order("rank", { ascending: true })
            .limit(3),
        ]);

      const userIds = (memberRows ?? [])
        .map((row) => row.user_id)
        .filter(Boolean);
      let prefsByUserId = {};
      if (userIds.length > 0) {
        const { data: preferenceRows } = await supabase
          .from("user_preferences")
          .select("user_id, username, archetype")
          .in("user_id", userIds);
        prefsByUserId = Object.fromEntries(
          (preferenceRows ?? []).map((row) => [row.user_id, row]),
        );
      }

      const nextMembers = (memberRows ?? []).map((member) => ({
        ...member,
        user_preferences: prefsByUserId[member.user_id] ?? {},
      }));

      let nextRecs = recRows ?? [];
      const bookIds = nextRecs.map((row) => row.book_id).filter(Boolean);
      if (bookIds.length > 0) {
        const { data: bookRows } = await supabase
          .from("books")
          .select("id, nombre_libro, autor, genero")
          .in("id", bookIds);
        const booksById = Object.fromEntries(
          (bookRows ?? []).map((row) => [row.id, row]),
        );
        nextRecs = nextRecs.map((rec) => ({
          ...rec,
          books: booksById[rec.book_id] ?? {},
        }));
      }

      if (!skipTrigger) {
        try {
          const remote = await triggerGroupRecommendations(groupId, metodo);
          nextRecs = remote?.recommendations ?? nextRecs;
        } catch (_) {
          // Keep the latest persisted rows if the Python service is unavailable.
        }
      }

      setGroup(g ?? null);
      setMembers(nextMembers);
      setRecs(nextRecs);
      setRecalculating(nextRecs.length === 0);
    } catch (e) {
      console.warn("GroupDetail load error:", e.message);
    }
  }, [groupId, metodo]);

  useEffect(() => {
    if (!groupId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    loadGroupData().finally(() => setLoading(false));
  }, [groupId, metodo, loadGroupData]);

  useEffect(() => {
    if (!groupId) return;
    const channel = supabase
      .channel(`group-recs-${groupId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'group_recommendations',
          filter: `group_id=eq.${groupId}`,
        },
        () => {
          loadGroupData({ skipTrigger: true });
        }
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [groupId, loadGroupData]);

  const onRecalculate = async () => {
    setRecalculating(true);
    try {
      await triggerGroupRecommendations(groupId, metodo);
      await loadGroupData({ skipTrigger: true });
    } catch (e) {
      console.warn('recalculate:', e?.message);
    } finally {
      setRecalculating(false);
    }
  };

  const groupName = group?.group_name ?? "—";
  const vibes = Array.isArray(group?.vibe) ? group.vibe : [];
  const initials = groupInitials(groupName);
  const headerBg = badgeColor(groupId ?? "");
  const hasTelegram = Boolean(group?.telegram_chat_id);
  const isAdmin = user?.id === group?.created_by;

  const onLeaveGroup = () => {
    Alert.alert(
      'Abandonar círculo',
      '¿Seguro que quieres abandonar este círculo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Abandonar',
          style: 'destructive',
          onPress: async () => {
            try {
              await supabase
                .from('group_members')
                .delete()
                .eq('group_id', groupId)
                .eq('user_id', user.id);
              navigation.navigate(routes.Home);
            } catch (e) {
              Alert.alert('Error', e?.message || 'No se pudo abandonar el círculo');
            }
          },
        },
      ],
    );
  };

  const onDeleteGroup = () => {
    Alert.alert(
      'Eliminar círculo',
      'Esta acción es permanente. ¿Eliminar el círculo y todas sus recomendaciones?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await supabase.from('group_recommendations').delete().eq('group_id', groupId);
              await supabase.from('group_members').delete().eq('group_id', groupId);
              await supabase.from('recommendation_groups').update({ is_active: false }).eq('id', groupId);
              navigation.navigate(routes.Home);
            } catch (e) {
              Alert.alert('Error', e?.message || 'No se pudo eliminar el círculo');
            }
          },
        },
      ],
    );
  };

  function handleTelegram() {
    Alert.alert(
      "Coming soon",
      "Las recomendaciones se enviarán al canal cuando el bot esté activo.",
      [{ text: "OK" }],
    );
  }

  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Header ── */}
        <LinearGradient colors={["#2B1B69", "#16102E"]} style={styles.header}>
          <Pressable onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate(routes.Home)} style={styles.back}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>

          <View style={styles.headerRight}>
            <Pressable
              onPress={() => navigation.navigate(routes.Personality)}
              style={styles.profileBtnLight}
            >
              <Text style={styles.profileBtnLightText}>
                {user?.name?.[0]?.toUpperCase() ?? "?"}
              </Text>
            </Pressable>
          </View>

          <View style={[styles.badge, { backgroundColor: headerBg }]}>
            <Text style={styles.badgeText}>{initials}</Text>
          </View>
          <Text style={styles.groupName}>{groupName}</Text>

          {vibes.length > 0 && (
            <View style={styles.vibeRow}>
              {vibes.slice(0, 4).map((v) => (
                <View key={v} style={styles.vibePill}>
                  <Text style={styles.vibePillText}>{v}</Text>
                </View>
              ))}
            </View>
          )}

          <Text style={styles.memberCount}>
            {members.length} member{members.length !== 1 ? "s" : ""}
          </Text>
        </LinearGradient>

        {/* ── Código de invitación ── */}
        {group?.join_code && (
          <View style={styles.codeSection}>
            <Text style={styles.codeSectionLabel}>CÓDIGO DE INVITACIÓN</Text>
            <Pressable
              style={styles.codeBox}
              onPress={async () => {
                await Clipboard.setStringAsync(group.join_code);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <Text style={styles.codeText}>{group.join_code}</Text>
              <Text style={styles.codeCopyHint}>{copied ? '✓ Copiado' : 'Toca para copiar'}</Text>
            </Pressable>
          </View>
        )}

        {/* ── Members ── */}
        {!loading && members.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Members</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.membersRow}
            >
              {members.map((m) => (
                <MemberCard key={m.user_id} member={m} />
              ))}
            </ScrollView>
          </View>
        )}

        {/* ── Book recommendations ── */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Top picks</Text>
            <View style={styles.autoBadge}>
              <Text style={styles.autoBadgeText}>✦ AUTO</Text>
            </View>
            <Pressable
              onPress={onRecalculate}
              disabled={recalculating}
              style={[styles.recalcBtn, recalculating && styles.recalcBtnDisabled]}
            >
              {recalculating ? (
                <ActivityIndicator size="small" color={colors.purple} />
              ) : (
                <Text style={styles.recalcBtnText}>↻ Recalcular</Text>
              )}
            </Pressable>
          </View>

          {/* Selector de método de agregación */}
          <View style={metodoStyles.row}>
            {[
              { id: "media_sigma", label: "Consenso" },
              { id: "promedio", label: "Promedio" },
              { id: "min_miseria", label: "Justo" },
              { id: "max_placer", label: "Mayoría" },
            ].map((m) => (
              <Pressable
                key={m.id}
                onPress={() => setMetodo(m.id)}
                style={[
                  metodoStyles.chip,
                  metodo === m.id && metodoStyles.chipOn,
                ]}
              >
                <Text
                  style={[
                    metodoStyles.chipText,
                    metodo === m.id && metodoStyles.chipTextOn,
                  ]}
                >
                  {m.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {loading ? null : recs.length === 0 ? (
            recalculating ? (
              <View style={styles.recsLoading}>
                <ActivityIndicator color={colors.purple} />
                <Text style={styles.recsLoadingText}>Calculando recomendaciones…</Text>
                <Text style={styles.recsLoadingSubtext}>Esto tarda unos segundos la primera vez</Text>
              </View>
            ) : (
              <View style={styles.emptyRecs}>
                <Text style={styles.emptyRecsText}>
                  No recommendations yet — the engine runs once your circle has
                  members and preferences.
                </Text>
              </View>
            )
          ) : (
            <View style={styles.recList}>
              {recs.map((rec, i) => (
                <RecCard
                  key={rec.rank ?? i}
                  rec={rec}
                  index={i}
                  onPress={() => navigation.navigate(routes.Book, { bookId: rec.book_id, groupId: group.id })}
                />
              ))}
            </View>
          )}
        </View>

        {/* ── Telegram ── */}
        {!loading && hasTelegram && (
          <View style={styles.section}>
            <Pressable onPress={handleTelegram} style={styles.tgCard}>
              <View style={styles.tgIconWrap}>
                <Text style={styles.tgIconText}>↗</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.tgTitle}>Send to Telegram</Text>
                <Text style={styles.tgSub}>
                  Push today's top picks to the group channel
                </Text>
              </View>
              <Text style={styles.tgArrow}>›</Text>
            </Pressable>
          </View>
        )}

        {/* ── Acciones destructivas ── */}
        {!loading && group && (
          <View style={styles.dangerSection}>
            {isAdmin ? (
              <Pressable onPress={onDeleteGroup} style={styles.dangerBtn}>
                <Text style={styles.dangerBtnText}>Eliminar círculo</Text>
              </Pressable>
            ) : (
              <Pressable onPress={onLeaveGroup} style={styles.dangerBtn}>
                <Text style={styles.dangerBtnText}>Abandonar círculo</Text>
              </Pressable>
            )}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 0 },

  header: {
    paddingTop: 54,
    paddingHorizontal: 22,
    paddingBottom: 24,
    alignItems: "center",
    gap: 8,
  },
  back: {
    position: "absolute",
    top: 14,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    fontSize: 22,
    color: colors.cream,
    fontWeight: "900",
    marginTop: -2,
  },
  headerRight: {
    position: "absolute",
    top: 14,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileBtnLight: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  profileBtnLightText: { fontSize: 15, fontWeight: "900", color: colors.cream },
  badge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -0.5,
  },
  groupName: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.cream,
    letterSpacing: -0.6,
    textAlign: "center",
  },
  vibeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    justifyContent: "center",
    marginTop: 2,
  },
  vibePill: {
    borderRadius: radii.pill,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  vibePillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(251,246,235,0.85)",
  },
  memberCount: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(251,246,235,0.5)",
    marginTop: 2,
  },

  section: { paddingHorizontal: 22, paddingTop: 24 },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -0.3,
  },
  autoBadge: {
    borderRadius: radii.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: colors.lime,
  },
  autoBadgeText: {
    fontSize: 10,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: 0.8,
  },

  membersRow: { gap: 10, paddingTop: 12, paddingBottom: 4 },
  memberCard: { alignItems: "center", gap: 6, width: 72 },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  memberAvatarText: { fontSize: 18, fontWeight: "900", color: colors.ink },
  memberLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "rgba(22,16,46,0.6)",
    textAlign: "center",
    width: 72,
  },
  adminBadge: {
    borderRadius: radii.pill,
    paddingVertical: 2,
    paddingHorizontal: 7,
    backgroundColor: colors.lime,
  },
  adminText: {
    fontSize: 9,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: 0.4,
  },

  recList: { gap: 12 },
  recCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(22,16,46,0.06)",
    position: "relative",
  },
  rankPill: {
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 1,
    borderRadius: radii.pill,
    paddingVertical: 3,
    paddingHorizontal: 7,
    backgroundColor: "rgba(22,16,46,0.08)",
  },
  rankPillTop: { backgroundColor: colors.lime },
  rankText: { fontSize: 10, fontWeight: "900", color: "rgba(22,16,46,0.5)" },
  rankTextTop: { color: colors.ink },
  recInfo: { flex: 1, paddingTop: 22, gap: 4 },
  recTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -0.3,
    lineHeight: 20,
  },
  recAuthor: {
    fontSize: 13,
    fontStyle: "italic",
    color: "rgba(22,16,46,0.55)",
    fontWeight: "600",
  },
  recGenres: { flexDirection: "row", flexWrap: "wrap", gap: 5, marginTop: 6 },
  genrePill: {
    borderRadius: radii.pill,
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: "rgba(124,91,255,0.1)",
  },
  genreText: { fontSize: 10, fontWeight: "800", color: colors.purple },
  recReason: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.purple,
    marginTop: 8,
    lineHeight: 17,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  statPill: {
    minWidth: 74,
    borderRadius: radii.lg,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: "rgba(22,16,46,0.05)",
  },
  statLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "rgba(22,16,46,0.45)",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  statValue: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.ink,
    marginTop: 2,
  },
  scoreBubble: {
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(22,16,46,0.06)",
    marginTop: 22,
  },
  scoreBubbleTop: { backgroundColor: colors.lime },
  scoreNum: {
    fontSize: 18,
    fontWeight: "900",
    color: "rgba(22,16,46,0.5)",
    lineHeight: 20,
  },
  scoreNumTop: { color: colors.ink },
  scorePct: {
    fontSize: 9,
    fontWeight: "800",
    color: "rgba(22,16,46,0.4)",
    marginTop: -2,
  },
  scorePctTop: { color: "rgba(22,16,46,0.6)" },

  recsLoading: {
    padding: 24,
    borderRadius: radii.xl,
    backgroundColor: "rgba(22,16,46,0.04)",
    alignItems: "center",
    gap: 10,
  },
  recsLoadingText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.ink,
    letterSpacing: -0.2,
  },
  recsLoadingSubtext: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(22,16,46,0.45)",
    textAlign: "center",
  },
  emptyRecs: {
    padding: 20,
    borderRadius: radii.xl,
    backgroundColor: "rgba(22,16,46,0.04)",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(22,16,46,0.12)",
  },
  emptyRecsText: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(22,16,46,0.4)",
    lineHeight: 19,
  },

  codeSection: { marginHorizontal: 22, marginBottom: 16 },
  codeSectionLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(22,16,46,0.45)', marginBottom: 8 },
  codeBox: { backgroundColor: colors.lime, borderRadius: radii.lg, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1.5, borderColor: colors.ink },
  codeText: { fontSize: 28, fontWeight: '900', color: colors.ink, letterSpacing: 4 },
  codeCopyHint: { fontSize: 11, fontWeight: '700', color: 'rgba(22,16,46,0.55)' },
  recalcBtn: {
    marginLeft: 'auto',
    borderRadius: radii.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(22,16,46,0.06)',
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recalcBtnDisabled: { opacity: 0.5 },
  recalcBtnText: { fontSize: 12, fontWeight: '800', color: colors.ink },
  tgCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: colors.ink,
    borderRadius: radii.xl,
    padding: 16,
  },
  tgIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  tgIconText: { fontSize: 20, fontWeight: "900", color: colors.ink },
  tgTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.cream,
    marginBottom: 3,
  },
  tgSub: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(251,246,235,0.6)",
    lineHeight: 17,
  },
  tgArrow: {
    fontSize: 26,
    fontWeight: "900",
    color: "rgba(251,246,235,0.3)",
    flexShrink: 0,
  },
  dangerSection: {
    marginHorizontal: 22,
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(22,16,46,0.08)',
  },
  dangerBtn: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,126,107,0.35)',
    alignItems: 'center',
  },
  dangerBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.coral,
    letterSpacing: 0.1,
  },
});

const metodoStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
    flexWrap: "wrap",
  },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 999,
    backgroundColor: "rgba(22,16,46,0.06)",
    borderWidth: 1,
    borderColor: "rgba(22,16,46,0.08)",
  },
  chipOn: {
    backgroundColor: "#16102E",
    borderColor: "#16102E",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(22,16,46,0.6)",
  },
  chipTextOn: {
    color: "#D4FF3D",
  },
});
