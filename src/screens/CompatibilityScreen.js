import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { Pill } from '../components/Pill';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { MEMBERS } from '../data/sample';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function CompatibilityScreen({ navigation }) {
  return (
    <Screen backgroundColor={colors.ink} contentStyle={styles.content}>
      <TopBar
        subtitle="Slow Burners · 5 members"
        title="Group compatibility"
        onBack={() => navigation.goBack()}
        right={
          <Pressable onPress={() => navigation.replace(routes.Compatibility)} style={styles.refresh}>
            <Text style={styles.refreshText}>↻</Text>
          </Pressable>
        }
        style={{ paddingTop: 18 }}
      />

      <View style={styles.scoreRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.scoreKicker}>Collective score</Text>
          <Text style={styles.score}>0.86</Text>
        </View>
        <Pill label="↗ +0.04 this month" tone="lime" />
      </View>

      <LinearGradient colors={['rgba(124,91,255,0.22)', 'rgba(22,16,46,0)']} start={{ x: 0.5, y: 0.7 }} end={{ x: 0.5, y: 0 }} style={styles.map}>
        <Text style={styles.mapTitle}>Overlap</Text>
        <Text style={styles.mapSub}>4 genres · shared complexity band</Text>
        <View style={styles.mapAvatars}>
          {MEMBERS.map((m) => (
            <View key={m.id} style={styles.mapAvatar}>
              <Avatar m={m} size={40} />
              <Text style={styles.mapName}>{m.name}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      <View style={styles.tabs}>
        {['Overlap', 'Diversity', 'Mood', 'Trends'].map((t, i) => (
          <View key={t} style={[styles.tab, i === 0 ? styles.tabActive : null]}>
            <Text style={[styles.tabText, i === 0 ? styles.tabTextActive : null]}>{t}</Text>
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

      <View style={styles.satisfaction}>
        <Text style={styles.satKicker}>Collective satisfaction</Text>
        <View style={styles.satRow}>
          <Text style={styles.satPct}>92%</Text>
          <Text style={styles.satQuote}>“we trust the algorithm”</Text>
        </View>
      </View>

      <Pressable onPress={() => navigation.navigate(routes.Home)} style={styles.cta}>
        <Text style={styles.ctaText}>Back to dashboard →</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 36,
  },
  refresh: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshText: {
    color: colors.cream,
    fontWeight: '900',
  },
  scoreRow: {
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 14,
    marginTop: 6,
  },
  scoreKicker: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(251,246,235,0.5)',
    fontWeight: '800',
  },
  score: {
    marginTop: 4,
    fontSize: 64,
    color: colors.lime,
    fontWeight: '900',
    letterSpacing: -1,
    lineHeight: 70,
  },
  map: {
    marginTop: 10,
    marginHorizontal: 22,
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  mapTitle: {
    color: colors.cream,
    fontWeight: '900',
    letterSpacing: -0.3,
    fontSize: 16,
  },
  mapSub: {
    marginTop: 6,
    color: 'rgba(251,246,235,0.6)',
    fontSize: 12,
    fontWeight: '600',
  },
  mapAvatars: {
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  mapAvatar: {
    alignItems: 'center',
    width: 64,
  },
  mapName: {
    marginTop: 6,
    fontSize: 10,
    letterSpacing: 0.8,
    color: 'rgba(251,246,235,0.6)',
    fontWeight: '700',
  },
  tabs: {
    marginTop: 14,
    marginHorizontal: 22,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 4,
    flexDirection: 'row',
    gap: 4,
  },
  tab: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: colors.cream,
  },
  tabText: {
    color: 'rgba(251,246,235,0.65)',
    fontWeight: '800',
  },
  tabTextActive: {
    color: colors.ink,
  },
  panel: {
    marginTop: 14,
    marginHorizontal: 22,
    borderRadius: radii.xl,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  panelHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  panelTitle: {
    color: colors.cream,
    fontWeight: '900',
    letterSpacing: -0.2,
  },
  panelMeta: {
    color: 'rgba(251,246,235,0.4)',
    fontSize: 10,
    letterSpacing: 1.4,
    fontWeight: '800',
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
    color: 'rgba(251,246,235,0.85)',
    fontWeight: '700',
  },
  barVal: {
    fontWeight: '900',
  },
  barTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  satisfaction: {
    marginTop: 12,
    marginHorizontal: 22,
    borderRadius: radii.xl,
    padding: 16,
    backgroundColor: colors.lime,
  },
  satKicker: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.65)',
    fontWeight: '900',
  },
  satRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  satPct: {
    fontSize: 40,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -1,
  },
  satQuote: {
    fontStyle: 'italic',
    fontWeight: '700',
    color: colors.ink,
  },
  cta: {
    marginTop: 14,
    marginHorizontal: 22,
    borderRadius: radii.pill,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  ctaText: {
    color: colors.cream,
    fontWeight: '900',
  },
});

