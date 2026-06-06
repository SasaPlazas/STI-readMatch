import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { BookCover } from '../components/BookCover';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { useAuth } from '../context/AuthContext';
import { BOOKS, MEMBERS } from '../data/sample';
import { colors, radii } from '../theme/tokens';

export function PersonalityScreen({ navigation }) {
  const { signOut } = useAuth();
  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>
      <LinearGradient colors={[colors.lavender, colors.cream]} start={{ x: 0.3, y: 0 }} end={{ x: 0.7, y: 1 }} style={styles.hero}>
        <TopBar
          subtitle="Reading identity · Iris"
          title={null}
          onBack={() => navigation.goBack()}
          right={
            <Pressable accessibilityRole="button" onPress={signOut} style={styles.logoutBtn}>
              <Text style={styles.logoutText}>Salir</Text>
            </Pressable>
          }
        />

        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            <Avatar m={MEMBERS[2]} size={48} />
            <View>
              <Text style={styles.name}>Iris Calderón</Text>
              <Text style={styles.meta}>READER · 2.4yrs</Text>
            </View>
          </View>

          <Text style={styles.type}>
            The{'\n'}
            <Text style={styles.typeAccent}>Dark Academic</Text>
          </Text>
          <Text style={styles.blurb}>You read like there's a thesis to defend. Long sentences, longer silences.</Text>

          <View style={styles.miniStats}>
            {[
              { l: 'books / yr', v: '32' },
              { l: 'avg pages', v: '286' },
              { l: 'depth idx', v: '0.81' },
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
          { l: 'Slow prose', v: 92, c: colors.purple },
          { l: 'Atmosphere', v: 88, c: colors.coral },
          { l: 'Plot velocity', v: 28, c: colors.white, invert: true },
          { l: 'Translation', v: 76, c: colors.lime },
        ].map((t) => (
          <View key={t.l} style={[styles.auraCard, t.invert ? styles.auraInvert : { backgroundColor: t.c }]}>
            <Text style={styles.auraKicker}>{t.l}</Text>
            <Text style={styles.auraVal}>
              {t.v}
              <Text style={{ fontSize: 14 }}>%</Text>
            </Text>
            <View style={[styles.auraTrack, { backgroundColor: t.invert ? 'rgba(22,16,46,0.08)' : 'rgba(22,16,46,0.15)' }]}>
              <View style={[styles.auraFill, { width: `${t.v}%` }]} />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.section}>Signature genres</Text>
        <Text style={styles.small}>TOP 6</Text>
      </View>
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

      <Text style={[styles.section, { marginTop: 18 }]}>Recently lived with</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rowBooks}>
        {BOOKS.map((b, i) => (
          <View key={b.id} style={{ alignItems: 'flex-start' }}>
            <BookCover book={b} w={110} h={154} tilt={i % 2 ? 2 : -2} />
            <Text style={styles.bookMeta}>★ {b.match}%</Text>
          </View>
        ))}
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: colors.cream,
    fontWeight: '900',
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  name: {
    color: colors.cream,
    fontWeight: '800',
  },
  meta: {
    marginTop: 4,
    fontSize: 10,
    letterSpacing: 1.4,
    color: 'rgba(251,246,235,0.5)',
    fontWeight: '800',
  },
  type: {
    marginTop: 14,
    fontSize: 42,
    color: colors.cream,
    fontWeight: '900',
    letterSpacing: -1.1,
    lineHeight: 44,
  },
  typeAccent: {
    color: colors.lime,
    fontStyle: 'italic',
    fontWeight: '700',
  },
  blurb: {
    marginTop: 10,
    fontSize: 15,
    fontStyle: 'italic',
    color: 'rgba(251,246,235,0.85)',
    fontWeight: '600',
    lineHeight: 20,
  },
  miniStats: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 18,
  },
  miniKicker: {
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(251,246,235,0.45)',
    fontWeight: '800',
  },
  miniVal: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: '900',
    color: colors.cream,
    letterSpacing: -0.4,
  },
  section: {
    marginTop: 18,
    marginHorizontal: 22,
    fontSize: 20,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  auraGrid: {
    marginTop: 10,
    marginHorizontal: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  auraCard: {
    width: '48%',
    borderRadius: radii.lg,
    padding: 14,
    overflow: 'hidden',
  },
  auraInvert: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.08)',
  },
  auraKicker: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    opacity: 0.7,
    fontWeight: '900',
    color: colors.ink,
  },
  auraVal: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.6,
  },
  auraTrack: {
    marginTop: 10,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  auraFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: colors.ink,
  },
  sectionRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
  },
  small: {
    fontSize: 10,
    letterSpacing: 1.4,
    color: 'rgba(22,16,46,0.45)',
    fontWeight: '800',
  },
  tags: {
    marginTop: 10,
    marginHorizontal: 22,
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
    fontWeight: '700',
  },
  rowBooks: {
    paddingHorizontal: 22,
    gap: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  bookMeta: {
    marginTop: 6,
    fontSize: 9,
    color: 'rgba(22,16,46,0.5)',
    letterSpacing: 0.8,
    fontWeight: '800',
  },
});
