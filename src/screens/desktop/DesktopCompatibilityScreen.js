import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { Avatar } from '../../components/Avatar';
import { Pill } from '../../components/Pill';
import { DesktopShell } from '../../components/desktop/DesktopShell';
import { MEMBERS } from '../../data/sample';
import { routes } from '../../navigation/routes';
import { colors, radii } from '../../theme/tokens';

export function DesktopCompatibilityScreen({ navigation }) {
  return (
    <DesktopShell navigation={navigation} activeRoute={routes.Compatibility} title="Compatibility workspace" subtitle="Overlap · Diversity · Mood" scroll={false}>
      <View style={styles.grid}>
        <View style={styles.left}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreK}>Collective score</Text>
            <Text style={styles.score}>0.86</Text>
            <Pill label="↗ +0.04 this month" tone="lime" />
          </View>

          <View style={styles.tabs}>
            {['Overlap', 'Diversity', 'Mood', 'Trends'].map((t, i) => (
              <View key={t} style={[styles.tab, i === 0 ? styles.tabOn : null]}>
                <Text style={[styles.tabText, i === 0 ? styles.tabTextOn : null]}>{t}</Text>
              </View>
            ))}
          </View>

          <View style={styles.panel}>
            <View style={styles.panelHead}>
              <Text style={styles.panelTitle}>Diversity balance</Text>
              <Text style={styles.panelMeta}>LAST 8 READS</Text>
            </View>
            {[
              { l: 'Genre', v: 0.78, c: colors.lime },
              { l: 'Setting', v: 0.62, c: colors.coral },
              { l: 'Voice', v: 0.85, c: colors.purple },
              { l: 'Era', v: 0.41, c: colors.lavender },
            ].map((b) => (
              <View key={b.l} style={styles.barRow}>
                <View style={styles.barTop}>
                  <Text style={styles.barLabel}>{b.l}</Text>
                  <Text style={[styles.barVal, { color: b.c }]}>{b.v.toFixed(2)}</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${b.v * 100}%`, backgroundColor: b.c }]} />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.sat}>
            <Text style={styles.satK}>Collective satisfaction</Text>
            <Text style={styles.satV}>92%</Text>
            <Text style={styles.satQ}>“we trust the algorithm”</Text>
          </View>
        </View>

        <View style={styles.center}>
          <View style={styles.centerHead}>
            <Text style={styles.centerTitle}>Overlap map</Text>
            <View style={styles.modes}>
              {['Radial', 'Network', 'Bubbles'].map((m, i) => (
                <View key={m} style={[styles.mode, i === 0 ? styles.modeOn : null]}>
                  <Text style={[styles.modeText, i === 0 ? styles.modeTextOn : null]}>{m}</Text>
                </View>
              ))}
            </View>
          </View>
          <LinearGradient colors={['rgba(124,91,255,0.16)', 'rgba(22,16,46,0)']} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} style={styles.viz}>
            <Svg width="100%" height="100%" viewBox="0 0 800 520">
              <Circle cx="400" cy="260" r="170" stroke="rgba(255,255,255,0.10)" strokeWidth="2" fill="none" />
              <Circle cx="400" cy="260" r="110" stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />
              <Circle cx="400" cy="260" r="60" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
              {[
                [400, 90],
                [540, 160],
                [560, 300],
                [430, 420],
                [260, 360],
                [250, 210],
              ].map((p, i) => (
                <Line key={i} x1="400" y1="260" x2={p[0]} y2={p[1]} stroke="rgba(212,255,61,0.15)" strokeWidth="2" />
              ))}
            </Svg>
            <View style={styles.nodes}>
              {MEMBERS.map((m, i) => (
                <View
                  key={m.id}
                  style={[
                    styles.node,
                    i === 0 ? { left: '52%', top: '14%' } : null,
                    i === 1 ? { left: '74%', top: '30%' } : null,
                    i === 2 ? { left: '76%', top: '58%' } : null,
                    i === 3 ? { left: '54%', top: '78%' } : null,
                    i === 4 ? { left: '28%', top: '62%' } : null,
                  ]}
                >
                  <Avatar m={m} size={46} />
                  <Text style={styles.nodeName}>{m.name}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
          <Pressable onPress={() => navigation.navigate(routes.Home)} style={styles.centerBtn}>
            <Text style={styles.centerBtnText}>Back to Home →</Text>
          </Pressable>
        </View>

        <View style={styles.right}>
          <View style={styles.panel}>
            <View style={styles.panelHead}>
              <Text style={styles.panelTitle}>AI reasoning</Text>
              <Pill label="Fairness balanced" tone="lime" />
            </View>
            <Text style={styles.quote}>
              “This pick boosts novelty without breaking the group's mood. It protects June's minority preference while keeping Iris & Theo's overlap strong.”
            </Text>
            <View style={styles.mixBar}>
              <View style={{ width: '42%', backgroundColor: colors.purple }} />
              <View style={{ width: '28%', backgroundColor: colors.coral }} />
              <View style={{ width: '18%', backgroundColor: colors.lime }} />
              <View style={{ width: '12%', backgroundColor: colors.ink }} />
            </View>
            {[
              { l: 'Collaborative filtering', v: '42%', c: colors.purple },
              { l: 'Content-based', v: '28%', c: colors.coral },
              { l: 'Fairness re-weighting', v: '18%', c: colors.lime },
              { l: 'Novelty bonus', v: '12%', c: colors.ink },
            ].map((r) => (
              <View key={r.l} style={styles.mixRow}>
                <View style={[styles.dot, { backgroundColor: r.c }]} />
                <Text style={styles.mixLabel}>{r.l}</Text>
                <Text style={[styles.mixVal, { color: r.c === colors.ink ? colors.purple : r.c }]}>{r.v}</Text>
              </View>
            ))}
          </View>

          <View style={styles.panel}>
            <View style={styles.panelHead}>
              <Text style={styles.panelTitle}>Per‑member affinity</Text>
              <Text style={styles.panelMeta}>THIS PICK</Text>
            </View>
            {MEMBERS.map((m, i) => (
              <View key={m.id} style={styles.affRow}>
                <Avatar m={m} size={32} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.affName}>{m.name}</Text>
                  <View style={styles.affTrack}>
                    <View style={[styles.affFill, { width: `${(90 - i * 7).toFixed(0)}%`, backgroundColor: i % 2 ? colors.coral : colors.lime }]} />
                  </View>
                </View>
                <Text style={styles.affVal}>{(90 - i * 7).toFixed(0)}%</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </DesktopShell>
  );
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    padding: 22,
    backgroundColor: colors.cream,
  },
  left: {
    width: 320,
    gap: 12,
  },
  center: {
    flex: 1,
    minWidth: 0,
    gap: 12,
  },
  right: {
    width: 380,
    gap: 12,
  },
  scoreCard: {
    backgroundColor: colors.ink,
    borderRadius: radii.xl,
    padding: 16,
  },
  scoreK: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(251,246,235,0.5)',
    fontWeight: '900',
  },
  score: {
    marginTop: 8,
    fontSize: 58,
    color: colors.lime,
    fontWeight: '900',
    letterSpacing: -1,
    lineHeight: 62,
  },
  tabs: {
    borderRadius: 14,
    backgroundColor: 'rgba(22,16,46,0.06)',
    padding: 4,
    flexDirection: 'row',
    gap: 4,
  },
  tab: {
    flex: 1,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabOn: {
    backgroundColor: colors.white,
  },
  tabText: {
    color: 'rgba(22,16,46,0.55)',
    fontWeight: '900',
    fontSize: 12,
  },
  tabTextOn: {
    color: colors.ink,
  },
  panel: {
    borderRadius: radii.xl,
    padding: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  panelHead: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 10,
  },
  panelTitle: {
    fontWeight: '900',
    color: colors.ink,
  },
  panelMeta: {
    fontSize: 10,
    letterSpacing: 1.4,
    color: 'rgba(22,16,46,0.45)',
    fontWeight: '900',
  },
  barRow: {
    marginTop: 12,
  },
  barTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  barLabel: {
    color: 'rgba(22,16,46,0.75)',
    fontWeight: '700',
  },
  barVal: {
    fontWeight: '900',
  },
  barTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(22,16,46,0.06)',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  sat: {
    borderRadius: radii.xl,
    padding: 16,
    backgroundColor: colors.lime,
  },
  satK: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.65)',
    fontWeight: '900',
  },
  satV: {
    marginTop: 10,
    fontSize: 38,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -1,
  },
  satQ: {
    marginTop: 4,
    fontStyle: 'italic',
    fontWeight: '700',
    color: colors.ink,
  },
  centerHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  centerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.2,
  },
  modes: {
    flexDirection: 'row',
    gap: 6,
    padding: 4,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  mode: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeOn: {
    backgroundColor: colors.ink,
  },
  modeText: {
    fontWeight: '900',
    color: 'rgba(22,16,46,0.6)',
    fontSize: 12,
  },
  modeTextOn: {
    color: colors.cream,
  },
  viz: {
    flex: 1,
    borderRadius: radii.xl,
    backgroundColor: colors.ink,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.12)',
  },
  nodes: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  node: {
    position: 'absolute',
    alignItems: 'center',
  },
  nodeName: {
    marginTop: 6,
    color: 'rgba(251,246,235,0.7)',
    fontWeight: '800',
    fontSize: 11,
  },
  centerBtn: {
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBtnText: {
    color: colors.lime,
    fontWeight: '900',
  },
  quote: {
    marginTop: 12,
    color: 'rgba(22,16,46,0.75)',
    fontWeight: '600',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  mixBar: {
    marginTop: 12,
    height: 18,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.05)',
  },
  mixRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 4,
  },
  mixLabel: {
    flex: 1,
    color: colors.ink,
    fontWeight: '800',
  },
  mixVal: {
    fontWeight: '900',
  },
  affRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  affName: {
    fontWeight: '900',
    color: colors.ink,
  },
  affTrack: {
    marginTop: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(22,16,46,0.08)',
    overflow: 'hidden',
  },
  affFill: {
    height: '100%',
    borderRadius: 3,
  },
  affVal: {
    width: 46,
    textAlign: 'right',
    fontWeight: '900',
    color: 'rgba(22,16,46,0.7)',
    fontSize: 12,
  },
});

