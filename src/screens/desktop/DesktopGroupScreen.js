import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../../components/Avatar';
import { Pill } from '../../components/Pill';
import { DesktopShell } from '../../components/desktop/DesktopShell';
import { MEMBERS } from '../../data/sample';
import { routes } from '../../navigation/routes';
import { colors, radii } from '../../theme/tokens';

export function DesktopGroupScreen({ navigation }) {
  const members = [
    { ...MEMBERS[0], role: 'Curator', status: 'synced', affinity: 0.91 },
    { ...MEMBERS[1], role: 'Member', status: 'synced', affinity: 0.84 },
    { ...MEMBERS[2], role: 'Member', status: 'synced', affinity: 0.88 },
    { ...MEMBERS[3], role: 'Member', status: 'tg-only', affinity: 0.72 },
    { ...MEMBERS[4], role: 'Pending', status: 'pending', affinity: 0.0 },
  ];

  return (
    <DesktopShell navigation={navigation} activeRoute={routes.GroupSettings} title="Group workspace" subtitle="Slow Burners · Settings" scroll={false}>
      <View style={styles.grid}>
        <View style={styles.main}>
          <View style={styles.kpis}>
            <KPI tone={colors.lime} k="Members" v="5" />
            <KPI tone={colors.coral} k="Votes this week" v="14" />
            <KPI tone={colors.purple} k="Diversity" v="0.78" dark />
            <View style={[styles.kpi, { backgroundColor: colors.ink }]}>
              <Text style={[styles.kpiK, { color: 'rgba(251,246,235,0.55)' }]}>Circle</Text>
              <Text style={[styles.kpiV, { color: colors.cream }]}>Slow Burners</Text>
              <View style={styles.kpiPills}>
                <Pill label="● TG synced" tone="lime" />
                <Pill label="Curious mood" tone="glass" style={{ backgroundColor: 'rgba(255,255,255,0.10)' }} />
              </View>
            </View>
          </View>

          <View style={styles.twoCol}>
            <View style={styles.card}>
              <View style={styles.cardHead}>
                <Text style={styles.cardTitle}>Members</Text>
                <Pressable onPress={() => navigation.navigate(routes.Invite)} style={styles.inviteBtn}>
                  <Text style={styles.inviteText}>+ Invite</Text>
                </Pressable>
              </View>
              <View style={styles.tableHead}>
                <Text style={[styles.th, { flex: 1 }]}>Member</Text>
                <Text style={[styles.th, { width: 100 }]}>Role</Text>
                <Text style={[styles.th, { width: 100 }]}>Status</Text>
                <Text style={[styles.th, { width: 140 }]}>Affinity</Text>
              </View>
              {members.map((m) => (
                <View key={m.id} style={styles.tr}>
                  <View style={styles.memberCell}>
                    <Avatar m={m} size={34} />
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Text style={styles.memberName} numberOfLines={1}>
                        {m.name}
                      </Text>
                      <Text style={styles.memberMeta} numberOfLines={1}>
                        {m.tag}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.td, { width: 100 }]}>{m.role}</Text>
                  <Status status={m.status} />
                  <Affinity v={m.affinity} />
                </View>
              ))}
            </View>

            <LinearGradient colors={[colors.ink, colors.violet]} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={styles.sync}>
              <View style={styles.syncHead}>
                <Text style={styles.syncTitle}>Telegram sync</Text>
                <Pill label="● LIVE" tone="lime" style={{ paddingVertical: 4, paddingHorizontal: 10 }} />
              </View>
              <Text style={styles.syncBody}>Bidirectional sync active. Members, votes, recommendations and highlights mirror both ways.</Text>
              <View style={styles.syncGrid}>
                {[
                  { l: 'Members', d: '↔ both ways', c: colors.lime },
                  { l: 'Votes', d: '↔ instant', c: colors.purple },
                  { l: 'Recommendations', d: '→ to TG', c: colors.coral },
                  { l: 'Highlights', d: '← from TG', c: colors.lavender },
                ].map((r) => (
                  <View key={r.l} style={styles.syncTile}>
                    <Text style={styles.syncD}>{r.d}</Text>
                    <View style={styles.syncRow}>
                      <View style={[styles.syncDot, { backgroundColor: r.c }]} />
                      <Text style={styles.syncL}>{r.l}</Text>
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.log}>
                {[
                  { t: '08:42', l: 'Recommendation "Soft Algorithms" sent' },
                  { t: '08:39', l: 'Iris voted ★ via Telegram' },
                  { t: '08:21', l: 'Diego joined from Telegram link' },
                ].map((e, i, arr) => (
                  <View key={e.t} style={[styles.logRow, i < arr.length - 1 ? styles.logSep : null]}>
                    <Text style={styles.logText} numberOfLines={1}>
                      {e.l}
                    </Text>
                    <Text style={styles.logTime}>{e.t}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.syncBtns}>
                <Pressable onPress={() => navigation.navigate(routes.Telegram)} style={styles.syncPrimary}>
                  <Text style={styles.syncPrimaryText}>Open channel ↗</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate(routes.Sync)} style={styles.syncGhost}>
                  <Text style={styles.syncGhostText}>Details</Text>
                </Pressable>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHead}>
              <Text style={styles.cardTitle}>Recommendation priorities</Text>
              <Text style={styles.meta}>TOGGLES</Text>
            </View>
            <View style={styles.prios}>
              {[
                { l: 'Diversity', c: colors.purple },
                { l: 'Depth over speed', c: colors.lime },
                { l: 'Fairness-aware', c: colors.coral },
                { l: 'Minority voices', c: colors.lavender },
                { l: 'Novelty', c: colors.cream, outline: true },
                { l: 'Short reads', c: colors.white, outline: true },
              ].map((p, i) => (
                <View key={p.l} style={[styles.prio, { backgroundColor: p.c }, p.outline ? styles.prioOutline : null]}>
                  <Text style={[styles.prioText, i < 3 ? { color: colors.ink } : { color: colors.ink }]}>{p.l}</Text>
                  <View style={styles.check}>
                    <Text style={styles.checkText}>✓</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </DesktopShell>
  );
}

function KPI({ tone, k, v, dark = false }) {
  return (
    <View style={[styles.kpi, { backgroundColor: tone }]}>
      <Text style={[styles.kpiK, dark ? { color: 'rgba(251,246,235,0.55)' } : { color: 'rgba(22,16,46,0.65)' }]}>{k}</Text>
      <Text style={[styles.kpiV, dark ? { color: colors.cream } : { color: colors.ink }]}>{v}</Text>
    </View>
  );
}

function Status({ status }) {
  const map = {
    synced: { bg: '#E8F8D5', fg: '#3F6E12', text: '● synced' },
    'tg-only': { bg: colors.mist, fg: '#5F38C2', text: 'TG only' },
    pending: { bg: 'rgba(255,158,87,0.18)', fg: '#A04A12', text: 'pending' },
  };
  const s = map[status] ?? map.pending;
  return (
    <View style={[styles.status, { backgroundColor: s.bg }]}>
      <Text style={[styles.statusText, { color: s.fg }]}>{s.text}</Text>
    </View>
  );
}

function Affinity({ v }) {
  if (!v) return <Text style={[styles.td, { width: 140, color: 'rgba(22,16,46,0.35)' }]}>—</Text>;
  return (
    <View style={{ width: 140 }}>
      <View style={styles.affTrack}>
        <View style={[styles.affFill, { width: `${v * 100}%` }]} />
      </View>
      <Text style={styles.affVal}>{Math.round(v * 100)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    padding: 22,
  },
  main: {
    flex: 1,
    gap: 14,
  },
  kpis: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  kpi: {
    flex: 1,
    minWidth: 220,
    borderRadius: radii.lg,
    padding: 16,
  },
  kpiK: {
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontWeight: '900',
  },
  kpiV: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.6,
  },
  kpiPills: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  twoCol: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'stretch',
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardTitle: {
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.2,
  },
  meta: {
    fontSize: 10,
    letterSpacing: 1.4,
    color: 'rgba(22,16,46,0.45)',
    fontWeight: '900',
  },
  inviteBtn: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: colors.ink,
  },
  inviteText: {
    color: colors.cream,
    fontWeight: '900',
    fontSize: 12,
  },
  tableHead: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(22,16,46,0.06)',
  },
  th: {
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.5)',
    fontWeight: '900',
  },
  tr: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(22,16,46,0.05)',
  },
  memberCell: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  memberName: {
    fontWeight: '900',
    color: colors.ink,
  },
  memberMeta: {
    marginTop: 2,
    fontSize: 10.5,
    color: 'rgba(22,16,46,0.55)',
    fontWeight: '700',
  },
  td: {
    color: colors.ink,
    fontWeight: '800',
  },
  status: {
    width: 100,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 999,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 9.5,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontWeight: '900',
  },
  affTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(22,16,46,0.08)',
    overflow: 'hidden',
  },
  affFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: colors.lime,
  },
  affVal: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '900',
    color: 'rgba(22,16,46,0.65)',
  },
  sync: {
    width: 420,
    borderRadius: radii.xl,
    padding: 16,
    overflow: 'hidden',
  },
  syncHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  syncTitle: {
    color: colors.cream,
    fontWeight: '900',
    letterSpacing: -0.2,
  },
  syncBody: {
    marginTop: 10,
    color: 'rgba(251,246,235,0.75)',
    fontWeight: '600',
    lineHeight: 18,
  },
  syncGrid: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  syncTile: {
    width: '48%',
    borderRadius: radii.md,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  syncD: {
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: 'rgba(251,246,235,0.5)',
    fontWeight: '900',
  },
  syncRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  syncDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  syncL: {
    color: colors.cream,
    fontWeight: '900',
  },
  log: {
    marginTop: 12,
    borderRadius: radii.lg,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  logRow: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logSep: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  logText: {
    flex: 1,
    color: 'rgba(251,246,235,0.9)',
    fontWeight: '600',
  },
  logTime: {
    color: 'rgba(251,246,235,0.45)',
    fontWeight: '900',
    fontSize: 10,
  },
  syncBtns: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 10,
  },
  syncPrimary: {
    flex: 1,
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  syncPrimaryText: {
    color: colors.ink,
    fontWeight: '900',
  },
  syncGhost: {
    flex: 1,
    height: 44,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  syncGhostText: {
    color: colors.cream,
    fontWeight: '900',
  },
  prios: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  prio: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  prioOutline: {
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.12)',
  },
  prioText: {
    fontWeight: '800',
    color: colors.ink,
  },
  check: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    fontSize: 9,
    fontWeight: '900',
    color: colors.lime,
  },
});

