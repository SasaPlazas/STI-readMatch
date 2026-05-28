import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Pill } from '../components/Pill';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function SyncScreen({ navigation }) {
  return (
    <Screen backgroundColor={colors.ink} contentStyle={styles.content}>
      <TopBar
        subtitle="Telegram sync"
        title={null}
        onBack={() => navigation.goBack()}
        right={<Pill label="● Live" tone="lime" style={{ paddingVertical: 4, paddingHorizontal: 10 }} />}
        style={{ paddingTop: 18 }}
      />

      <View style={styles.diagram}>
        <LinearGradient colors={[colors.purple, colors.violet]} start={{ x: 0.2, y: 0.2 }} end={{ x: 0.8, y: 1 }} style={styles.orbLeft}>
          <Text style={styles.orbGlyph}>✦</Text>
          <Text style={styles.orbLabel}>ReadMatch</Text>
        </LinearGradient>
        <View style={styles.link} />
        <LinearGradient colors={[colors.lime, '#94B82A']} start={{ x: 0.2, y: 0.2 }} end={{ x: 0.8, y: 1 }} style={styles.orbRight}>
          <Text style={[styles.orbGlyph, { color: colors.ink }]}>↗</Text>
          <Text style={[styles.orbLabel, { color: colors.ink }]}>Telegram</Text>
        </LinearGradient>

        <View style={styles.center}>
          <Text style={styles.rtt}>0.4s</Text>
          <Text style={styles.rttK}>avg round-trip</Text>
        </View>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusDotWrap}>
          <View style={styles.statusDot} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.statusTitle}>Channel is healthy</Text>
          <Text style={styles.statusBody}>Bidirectional sync active. 5 members mirrored both ways. No conflicts.</Text>
          <View style={styles.kpis}>
            {[
              { l: 'Channel', v: '@rm_slow' },
              { l: 'Synced', v: '6m ago' },
              { l: 'Webhook', v: 'OK · 200' },
            ].map((s) => (
              <View key={s.l}>
                <Text style={styles.kpiL}>{s.l}</Text>
                <Text style={styles.kpiV}>{s.v}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <Text style={styles.section}>What syncs</Text>
      <View style={styles.grid}>
        {[
          { l: 'Members', d: '↔ both ways', c: colors.lime },
          { l: 'Votes', d: '↔ instant', c: colors.purple },
          { l: 'Recommendations', d: '→ to TG', c: colors.coral },
          { l: 'Highlights', d: '← from TG', c: colors.lavender },
        ].map((r) => (
          <View key={r.l} style={styles.tile}>
            <Text style={styles.tileD}>{r.d}</Text>
            <View style={styles.tileRow}>
              <View style={[styles.tileDot, { backgroundColor: r.c }]} />
              <Text style={styles.tileL}>{r.l}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.section}>Recent events</Text>
        <Text style={styles.sectionMeta}>LAST HOUR</Text>
      </View>
      <View style={styles.log}>
        {[
          { dir: '→ TG', t: '08:42', l: 'Recommendation "Soft Algorithms" sent', c: colors.coral },
          { dir: '← RM', t: '08:39', l: 'Iris voted ★ via Telegram', c: colors.purple },
          { dir: '↔', t: '08:21', l: 'Diego joined from Telegram link', c: colors.lime },
          { dir: '→ TG', t: '07:50', l: 'Compatibility update posted (0.86)', c: colors.coral },
        ].map((e, i, arr) => (
          <View key={e.t} style={[styles.logRow, i < arr.length - 1 ? styles.logSep : null]}>
            <Text style={[styles.logDir, { color: e.c }]}>{e.dir}</Text>
            <Text style={styles.logText}>{e.l}</Text>
            <Text style={styles.logTime}>{e.t}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable onPress={() => null} style={styles.actionGhost}>
          <Text style={styles.actionGhostText}>↻ Force resync</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(routes.Telegram)} style={styles.actionPrimary}>
          <Text style={styles.actionPrimaryText}>Open channel ↗</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 36,
  },
  diagram: {
    marginTop: 6,
    marginHorizontal: 22,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbLeft: {
    position: 'absolute',
    left: 10,
    top: 80,
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.purple,
    shadowOpacity: 0.4,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 5,
  },
  orbRight: {
    position: 'absolute',
    right: 10,
    top: 80,
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.lime,
    shadowOpacity: 0.3,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 5,
  },
  orbGlyph: {
    color: colors.lime,
    fontWeight: '900',
    fontSize: 28,
  },
  orbLabel: {
    marginTop: 6,
    fontSize: 9,
    letterSpacing: 1,
    color: colors.cream,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  link: {
    position: 'absolute',
    left: 120,
    right: 120,
    top: 130,
    height: 2,
    borderRadius: 2,
    backgroundColor: 'rgba(124,91,255,0.5)',
  },
  center: {
    position: 'absolute',
    top: 200,
    alignItems: 'center',
  },
  rtt: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.lime,
    letterSpacing: -0.3,
  },
  rttK: {
    marginTop: 4,
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(251,246,235,0.5)',
    fontWeight: '800',
  },
  statusCard: {
    marginTop: 6,
    marginHorizontal: 22,
    borderRadius: radii.xl,
    padding: 16,
    backgroundColor: 'rgba(212,255,61,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(212,255,61,0.3)',
    flexDirection: 'row',
    gap: 12,
  },
  statusDotWrap: {
    paddingTop: 6,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.lime,
    shadowColor: colors.lime,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  statusTitle: {
    color: colors.cream,
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: -0.2,
  },
  statusBody: {
    marginTop: 6,
    color: 'rgba(251,246,235,0.7)',
    fontWeight: '600',
    lineHeight: 17,
  },
  kpis: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 18,
    flexWrap: 'wrap',
  },
  kpiL: {
    fontSize: 8.5,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: 'rgba(251,246,235,0.5)',
    fontWeight: '800',
  },
  kpiV: {
    marginTop: 4,
    fontSize: 11,
    letterSpacing: 0.4,
    color: colors.cream,
    fontWeight: '800',
  },
  section: {
    marginTop: 18,
    marginHorizontal: 22,
    fontSize: 18,
    fontWeight: '900',
    color: colors.cream,
    letterSpacing: -0.2,
  },
  grid: {
    marginTop: 10,
    marginHorizontal: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tile: {
    width: '48%',
    borderRadius: radii.md,
    padding: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  tileD: {
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: 'rgba(251,246,235,0.5)',
    fontWeight: '800',
  },
  tileRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tileDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tileL: {
    color: colors.cream,
    fontWeight: '900',
    letterSpacing: -0.2,
  },
  sectionRow: {
    marginTop: 18,
    marginHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  sectionMeta: {
    fontSize: 10,
    letterSpacing: 1.4,
    color: 'rgba(251,246,235,0.45)',
    fontWeight: '800',
  },
  log: {
    marginTop: 10,
    marginHorizontal: 22,
    borderRadius: radii.lg,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  logRow: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logSep: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  logDir: {
    width: 50,
    fontSize: 10,
    letterSpacing: 0.6,
    fontWeight: '900',
  },
  logText: {
    flex: 1,
    color: 'rgba(251,246,235,0.9)',
    fontWeight: '600',
    lineHeight: 17,
  },
  logTime: {
    color: 'rgba(251,246,235,0.4)',
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 0.4,
  },
  actions: {
    marginTop: 16,
    marginHorizontal: 22,
    flexDirection: 'row',
    gap: 10,
  },
  actionGhost: {
    flex: 1,
    height: 50,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionGhostText: {
    color: colors.cream,
    fontWeight: '800',
  },
  actionPrimary: {
    flex: 1,
    height: 50,
    borderRadius: radii.md,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionPrimaryText: {
    color: colors.ink,
    fontWeight: '900',
  },
});

