import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { colors, radii } from '../theme/tokens';

export function ExplainScreen({ navigation }) {
  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>
      <TopBar subtitle="Reasoning · Soft Algorithms" title={null} onBack={() => navigation.goBack()} />

      <LinearGradient colors={[colors.lime, '#B5E62A']} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={styles.hero}>
        <View style={styles.heroKickerRow}>
          <View style={styles.heroIcon}>
            <Text style={styles.heroIconText}>✦</Text>
          </View>
          <Text style={styles.heroKicker}>How we got here</Text>
        </View>
        <Text style={styles.heroTitle}>
          Fantasy affinity raised{'\n'}group fit by <Text style={styles.heroItalic}>32%</Text>
        </Text>
        <Text style={styles.heroBody}>
          Re-weighting after Iris joined the group nudged hybrid scoring toward speculative non-fiction — a soft cluster that everyone shares at least a thread of.
        </Text>
      </LinearGradient>

      <Text style={styles.section}>The mix</Text>
      <View style={styles.panel}>
        <View style={styles.stackBar}>
          <View style={{ width: '42%', backgroundColor: colors.purple }} />
          <View style={{ width: '28%', backgroundColor: colors.coral }} />
          <View style={{ width: '18%', backgroundColor: colors.lime }} />
          <View style={{ width: '12%', backgroundColor: colors.ink }} />
        </View>

        <View style={styles.rows}>
          {[
            { c: colors.purple, l: 'Collaborative filtering', v: '42%', s: 'Books readers similar to your group already love.' },
            { c: colors.coral, l: 'Content-based', v: '28%', s: 'Genre, complexity, language, and theme proximity.' },
            { c: colors.lime, l: 'Fairness re-weighting', v: '18%', s: 'Boost for under-represented preferences.' },
            { c: colors.ink, l: 'Novelty bonus', v: '12%', s: "Encourages reads outside the group's usual cluster." },
          ].map((row) => (
            <View key={row.l} style={styles.row}>
              <View style={[styles.dot, { backgroundColor: row.c }]} />
              <View style={{ flex: 1 }}>
                <View style={styles.rowTop}>
                  <Text style={styles.rowLabel}>{row.l}</Text>
                  <Text style={[styles.rowVal, { color: row.c === colors.lime ? colors.purple : row.c }]}>{row.v}</Text>
                </View>
                <Text style={styles.rowSub}>{row.s}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.section}>Factors at play</Text>
      <View style={styles.factorList}>
        {[
          { tone: colors.purple, txt: "Iris's dark-academia streak pulled the group toward slow, atmospheric prose.", dir: '↑', pct: '+24%' },
          { tone: colors.coral, txt: 'Theo finishing two essay collections last month raised non-fiction weight.', dir: '↑', pct: '+11%' },
          { tone: colors.ink, txt: 'Last pick scored low on novelty — we counterbalance this round.', dir: '↓', pct: '−06%', invert: true },
          { tone: colors.lime, txt: "June's minority romance preference protected from being averaged out.", dir: '⊕', pct: 'safeguarded' },
        ].map((c) => (
          <View key={c.txt} style={[styles.factor, c.invert ? { backgroundColor: c.tone } : styles.factorWhite]}>
            <View style={[styles.factorIcon, { backgroundColor: c.invert ? 'rgba(255,255,255,0.12)' : c.tone }]}>
              <Text style={[styles.factorIconText, { color: c.invert ? colors.lime : colors.ink }]}>{c.dir}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.factorText, c.invert ? { color: colors.cream } : null]}>{c.txt}</Text>
              <Text style={[styles.factorMeta, c.invert ? { color: 'rgba(251,246,235,0.65)' } : null]}>{c.pct.toUpperCase()}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.feedback}>
        <View style={styles.q}>
          <Text style={styles.qText}>?</Text>
        </View>
        <Text style={styles.feedbackText}>Was this explanation useful?</Text>
        <View style={styles.feedbackBtns}>
          <Pressable style={[styles.fbBtn, { backgroundColor: colors.lime }]} onPress={() => null}>
            <Text style={[styles.fbText, { color: colors.ink }]}>↑</Text>
          </Pressable>
          <Pressable style={[styles.fbBtn, { backgroundColor: 'rgba(255,255,255,0.06)' }]} onPress={() => null}>
            <Text style={[styles.fbText, { color: colors.cream }]}>↓</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 36,
  },
  hero: {
    marginHorizontal: 22,
    borderRadius: radii.xl,
    padding: 18,
    overflow: 'hidden',
  },
  heroKickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroIcon: {
    width: 24,
    height: 24,
    borderRadius: 7,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIconText: {
    color: colors.lime,
    fontWeight: '900',
  },
  heroKicker: {
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    fontWeight: '900',
    color: colors.ink,
  },
  heroTitle: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.6,
    lineHeight: 28,
  },
  heroItalic: {
    fontStyle: 'italic',
    fontWeight: '700',
  },
  heroBody: {
    marginTop: 10,
    fontSize: 13,
    color: 'rgba(22,16,46,0.7)',
    fontWeight: '600',
    lineHeight: 18,
  },
  section: {
    marginTop: 18,
    marginHorizontal: 22,
    fontSize: 20,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  panel: {
    marginTop: 10,
    marginHorizontal: 22,
    borderRadius: radii.xl,
    padding: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  stackBar: {
    height: 26,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.05)',
  },
  rows: {
    marginTop: 14,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 4,
    marginTop: 4,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.ink,
    flex: 1,
    paddingRight: 10,
  },
  rowVal: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  rowSub: {
    marginTop: 4,
    fontSize: 12,
    color: 'rgba(22,16,46,0.6)',
    lineHeight: 16,
    fontWeight: '600',
  },
  factorList: {
    marginTop: 10,
    marginHorizontal: 22,
    gap: 10,
  },
  factor: {
    borderRadius: radii.lg,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  factorWhite: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  factorIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  factorIconText: {
    fontWeight: '900',
    fontSize: 18,
  },
  factorText: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.ink,
    fontWeight: '600',
  },
  factorMeta: {
    marginTop: 4,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.6)',
    fontWeight: '800',
  },
  feedback: {
    marginTop: 18,
    marginHorizontal: 22,
    padding: 14,
    borderRadius: radii.lg,
    backgroundColor: colors.ink,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  q: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(212,255,61,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qText: {
    color: colors.lime,
    fontWeight: '900',
  },
  feedbackText: {
    flex: 1,
    color: 'rgba(251,246,235,0.85)',
    fontWeight: '700',
  },
  feedbackBtns: {
    flexDirection: 'row',
    gap: 8,
  },
  fbBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fbText: {
    fontWeight: '900',
  },
});

