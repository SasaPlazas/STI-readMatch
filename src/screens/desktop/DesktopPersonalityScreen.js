import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Polygon, Text as SvgText } from 'react-native-svg';
import { Avatar } from '../../components/Avatar';
import { BookCover } from '../../components/BookCover';
import { DesktopShell } from '../../components/desktop/DesktopShell';
import { useAuth } from '../../context/AuthContext';
import { BOOKS, MEMBERS } from '../../data/sample';
import { routes } from '../../navigation/routes';
import { colors, radii } from '../../theme/tokens';

export function DesktopPersonalityScreen({ navigation }) {
  const { signOut } = useAuth();
  return (
    <DesktopShell
      navigation={navigation}
      activeRoute={routes.Personality}
      title="Reading personality"
      subtitle="Dashboard"
      scroll={false}
      rightTop={
        <Pressable accessibilityRole="button" onPress={signOut} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Salir</Text>
        </Pressable>
      }
    >
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <LinearGradient colors={[colors.ink, colors.violet]} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={styles.identity}>
            <View style={styles.profileTop}>
              <Avatar m={MEMBERS[2]} size={52} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>Iris Calderón</Text>
                <Text style={styles.meta}>READER · 2.4yrs</Text>
              </View>
            </View>
            <Text style={styles.type}>
              The <Text style={styles.typeAccent}>Dark Academic</Text>
            </Text>
            <Text style={styles.blurb}>You read like there's a thesis to defend. Long sentences, longer silences.</Text>
            <View style={styles.miniStats}>
              {[
                { l: 'books / yr', v: '32' },
                { l: 'avg pages', v: '286' },
                { l: 'depth idx', v: '0.81' },
              ].map((s) => (
                <View key={s.l}>
                  <Text style={styles.miniK}>{s.l}</Text>
                  <Text style={styles.miniV}>{s.v}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>

          <View style={styles.radarCard}>
            <Text style={styles.cardTitle}>Reading aura</Text>
            <Text style={styles.cardSub}>Radar · normalized</Text>
            <RadarChart />
          </View>
        </View>

        <View style={styles.midRow}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Signature traits</Text>
            {[
              { l: 'Atmosphere', v: 0.88, c: colors.purple },
              { l: 'Slow prose', v: 0.92, c: colors.coral },
              { l: 'Plot velocity', v: 0.28, c: colors.lime },
              { l: 'Translation', v: 0.76, c: colors.ink },
            ].map((b) => (
              <View key={b.l} style={styles.barRow}>
                <View style={styles.barTop}>
                  <Text style={styles.barLabel}>{b.l}</Text>
                  <Text style={styles.barVal}>{Math.round(b.v * 100)}%</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${b.v * 100}%`, backgroundColor: b.c }]} />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Literary palette</Text>
            <View style={styles.tags}>
              {[
                { l: 'Literary Fiction', c: colors.purple, dark: true },
                { l: 'Translation', c: colors.coral },
                { l: 'Magic Realism', c: colors.lime },
                { l: 'Essays', c: colors.lavender },
                { l: 'Mystery · slow', c: colors.ink, dark: true },
                { l: 'Memoir', c: colors.cream, outline: true },
              ].map((g) => (
                <View key={g.l} style={[styles.tag, { backgroundColor: g.c }, g.outline ? styles.tagOutline : null]}>
                  <Text style={[styles.tagText, g.dark ? { color: colors.cream } : { color: colors.ink }]}>{g.l}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Compatibility archetypes</Text>
            {[
              { l: 'The Synthesizer', v: 0.84, c: colors.lime },
              { l: 'The Romantic', v: 0.63, c: colors.coral },
              { l: 'The Analyst', v: 0.72, c: colors.purple },
              { l: 'The Explorer', v: 0.58, c: colors.ink },
            ].map((a) => (
              <View key={a.l} style={styles.archRow}>
                <View style={[styles.archDot, { backgroundColor: a.c }]} />
                <Text style={styles.archLabel}>{a.l}</Text>
                <Text style={styles.archVal}>{a.v.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomCard}>
          <Text style={styles.cardTitle}>Recently lived with</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.books}>
            {BOOKS.map((b, i) => (
              <View key={b.id} style={{ alignItems: 'flex-start' }}>
                <BookCover book={b} w={110} h={154} tilt={i % 2 ? 2 : -2} />
                <Text style={styles.bookMeta}>★ {b.match}%</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </DesktopShell>
  );
}

function RadarChart() {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 90;
  const labels = ['Depth', 'Novelty', 'Mood', 'Speed', 'Themes'];
  const values = [0.82, 0.64, 0.88, 0.28, 0.74];

  const pts = labels.map((_, i) => {
    const a = (-Math.PI / 2) + (i * (2 * Math.PI)) / labels.length;
    const rr = r * values[i];
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  });
  const poly = pts.map((p) => `${p[0]},${p[1]}`).join(' ');

  const axes = labels.map((_, i) => {
    const a = (-Math.PI / 2) + (i * (2 * Math.PI)) / labels.length;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r, a];
  });

  return (
    <View style={{ marginTop: 12, alignItems: 'center' }}>
      <Svg width={size} height={size}>
        {[0.25, 0.5, 0.75, 1].map((k) => (
          <Circle key={k} cx={cx} cy={cy} r={r * k} stroke="rgba(22,16,46,0.08)" strokeWidth="1" fill="none" />
        ))}
        {axes.map((a, i) => (
          <Line key={i} x1={cx} y1={cy} x2={a[0]} y2={a[1]} stroke="rgba(22,16,46,0.10)" strokeWidth="1" />
        ))}
        <Polygon points={poly} fill="rgba(124,91,255,0.25)" stroke={colors.purple} strokeWidth="2" />
        {axes.map((a, i) => (
          <SvgText
            key={labels[i]}
            x={cx + Math.cos(a[2]) * (r + 18)}
            y={cy + Math.sin(a[2]) * (r + 18)}
            fontSize="10"
            fontWeight="800"
            fill="rgba(22,16,46,0.6)"
            textAnchor="middle"
          >
            {labels[i]}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 22,
    paddingBottom: 36,
    gap: 14,
  },
  logoutBtn: {
    height: 42,
    paddingHorizontal: 14,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: colors.cream,
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  topRow: {
    flexDirection: 'row',
    gap: 14,
  },
  identity: {
    flex: 1,
    borderRadius: 28,
    padding: 18,
    overflow: 'hidden',
  },
  radarCard: {
    width: 360,
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  name: {
    color: colors.cream,
    fontWeight: '900',
    fontSize: 16,
  },
  meta: {
    marginTop: 4,
    fontSize: 10,
    letterSpacing: 1.4,
    color: 'rgba(251,246,235,0.5)',
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  type: {
    marginTop: 16,
    fontSize: 34,
    color: colors.cream,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  typeAccent: {
    color: colors.lime,
    fontStyle: 'italic',
    fontWeight: '700',
  },
  blurb: {
    marginTop: 10,
    fontSize: 14,
    fontStyle: 'italic',
    color: 'rgba(251,246,235,0.85)',
    fontWeight: '600',
    lineHeight: 20,
    maxWidth: 520,
  },
  miniStats: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 18,
    flexWrap: 'wrap',
  },
  miniK: {
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(251,246,235,0.45)',
    fontWeight: '800',
  },
  miniV: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: '900',
    color: colors.cream,
    letterSpacing: -0.4,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
    minWidth: 260,
  },
  midRow: {
    flexDirection: 'row',
    gap: 14,
    flexWrap: 'wrap',
  },
  bottomCard: {
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  cardTitle: {
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.2,
  },
  cardSub: {
    marginTop: 6,
    color: 'rgba(22,16,46,0.6)',
    fontWeight: '600',
    fontSize: 12,
  },
  barRow: {
    marginTop: 12,
  },
  barTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barLabel: {
    color: 'rgba(22,16,46,0.75)',
    fontWeight: '700',
  },
  barVal: {
    fontWeight: '900',
    color: colors.ink,
  },
  barTrack: {
    marginTop: 6,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(22,16,46,0.06)',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  tags: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  tagOutline: {
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.15)',
  },
  tagText: {
    fontSize: 13,
    fontWeight: '800',
  },
  archRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  archDot: {
    width: 10,
    height: 10,
    borderRadius: 4,
  },
  archLabel: {
    flex: 1,
    color: colors.ink,
    fontWeight: '800',
  },
  archVal: {
    fontWeight: '900',
    color: 'rgba(22,16,46,0.65)',
  },
  books: {
    paddingTop: 12,
    paddingBottom: 8,
    gap: 12,
  },
  bookMeta: {
    marginTop: 6,
    fontSize: 9,
    color: 'rgba(22,16,46,0.5)',
    letterSpacing: 0.8,
    fontWeight: '800',
  },
});
