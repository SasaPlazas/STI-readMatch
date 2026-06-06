import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/Avatar';
import { RMButton } from '../components/RMButton';
import { MEMBERS } from '../data/sample';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

const PALETTE = [
  { label: 'Literary Fiction', color: colors.purple },
  { label: 'Translation',      color: colors.coral },
  { label: 'Essays',           color: colors.lime },
  { label: 'Magic Realism',    color: colors.lavender },
  { label: 'Memoir',           color: colors.cream },
  { label: 'Sci-Fi · soft',   color: colors.ink, dark: true },
];

const PAIRS = [
  { type: 'The Philosopher', m: MEMBERS[1] },
  { type: 'The Explorer',    m: MEMBERS[0] },
  { type: 'Dark Academic',   m: MEMBERS[2] },
];

export function OnbRevealScreen({ navigation }) {
  const { completeOnboarding } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(340, [
      Animated.timing(anim1, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(anim2, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(anim3, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const slide = (anim, offset = 20) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [offset, 0] }) }],
  });

  return (
    <LinearGradient
      colors={['#2B1B69', '#16102E', '#1A1042']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.bg}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          <Animated.View style={[styles.leadIn, slide(anim1)]}>
            <Text style={styles.leadKicker}>★ Your reading aura</Text>
            <Text style={styles.leadSub}>after 137 signals · we have you</Text>
          </Animated.View>

          <Animated.View style={[styles.identityCard, slide(anim1, 24)]}>
            <Text style={styles.identityPre}>You read like</Text>
            <Text style={styles.identityType}>The</Text>
            <Text style={styles.identityTypeAccent}>Curator</Text>
            <Text style={styles.identityBody}>
              You read with intention. Stacks are short, recommendations rare, and you save the right book for the right month.
            </Text>
            <View style={styles.miniStats}>
              {[
                { label: 'depth',     value: '0.81' },
                { label: 'openness',  value: '72%' },
                { label: 'group fit', value: '0.88' },
              ].map((s) => (
                <View key={s.label} style={styles.miniStat}>
                  <Text style={styles.miniStatLabel}>{s.label}</Text>
                  <Text style={styles.miniStatValue}>{s.value}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          <Animated.View style={[styles.paletteSection, slide(anim2)]}>
            <Text style={styles.paletteSectionLabel}>YOUR LITERARY PALETTE</Text>
            <View style={styles.paletteChips}>
              {PALETTE.map((g, i) => (
                <View
                  key={g.label}
                  style={[
                    styles.paletteChip,
                    { backgroundColor: g.color },
                    { transform: [{ rotate: `${i % 2 ? -1.5 : 1.5}deg` }] },
                    g.dark && styles.paletteChipDark,
                  ]}
                >
                  <Text style={[styles.paletteChipText, g.dark && styles.paletteChipTextDark]}>{g.label}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          <Animated.View style={[styles.affinityRow, slide(anim2)]}>
            <View style={styles.affinityCard}>
              <Text style={styles.affinityLabel}>Group affinity</Text>
              <Text style={styles.affinityValue}>0.88</Text>
              <Text style={styles.affinityQuote}>"you balance circles"</Text>
            </View>
            <View style={styles.pairCard}>
              <Text style={styles.pairLabel}>YOU PAIR WITH</Text>
              {PAIRS.map((p) => (
                <View key={p.type} style={styles.pairRow}>
                  <Avatar m={p.m} size={18} />
                  <Text style={styles.pairType}>{p.type}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          <Animated.View style={[styles.shareHint, { opacity: anim3 }]}>
            <View style={styles.shareIcon}>
              <Text style={styles.shareIconText}>✦</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.shareTitle}>Share your aura</Text>
              <Text style={styles.shareSub}>1.2M readers shared theirs this week</Text>
            </View>
            <Pressable style={styles.shareBtn}>
              <Text style={styles.shareBtnText}>Share ↗</Text>
            </Pressable>
          </Animated.View>

          <View style={{ height: 110 }} />
        </ScrollView>

        <Animated.View style={[styles.cta, { opacity: anim3 }]}>
          <LinearGradient colors={['rgba(22,16,46,0)', 'rgba(22,16,46,0.92)']} style={styles.ctaGrad}>
            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
            <RMButton
              title={loading ? 'Entering…' : 'Enter ReadMatch →'}
              variant="primary"
              onPress={async () => {
                if (loading) return;
                setError('');
                setLoading(true);
                try {
                  await completeOnboarding();
                  // RootNavigator cambiará automáticamente a AppStack
                  // cuando el usuario tenga completedOnboarding = true.
                } catch (err) {
                  setError(err?.message || 'No se pudo entrar a ReadMatch');
                } finally {
                  setLoading(false);
                }
              }}
              style={styles.ctaBtn}
            />
          </LinearGradient>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  scroll: { paddingHorizontal: 22, paddingTop: 60 },
  leadIn: { alignItems: 'center', marginBottom: 28 },
  leadKicker: { fontSize: 12, fontWeight: '800', letterSpacing: 2.5, textTransform: 'uppercase', color: colors.lime },
  leadSub: { marginTop: 6, fontSize: 15, fontStyle: 'italic', color: 'rgba(251,246,235,0.7)', fontWeight: '600' },
  identityCard: { borderRadius: radii.xl, padding: 22, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.16)', marginBottom: 22 },
  identityPre: { fontSize: 11, fontWeight: '700', letterSpacing: 2, color: 'rgba(251,246,235,0.55)', textTransform: 'uppercase' },
  identityType: { fontSize: 60, fontWeight: '900', color: colors.cream, letterSpacing: -1.5, lineHeight: 62, marginTop: 6 },
  identityTypeAccent: { fontSize: 60, fontWeight: '400', fontStyle: 'italic', color: colors.lime, letterSpacing: -1.5, lineHeight: 62, marginTop: -10 },
  identityBody: { fontSize: 14, fontStyle: 'italic', color: 'rgba(251,246,235,0.85)', fontWeight: '600', lineHeight: 21, marginTop: 14 },
  miniStats: { flexDirection: 'row', gap: 10, marginTop: 18 },
  miniStat: { flex: 1, padding: 10, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.1)' },
  miniStatLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 1.2, color: 'rgba(251,246,235,0.5)', textTransform: 'uppercase' },
  miniStatValue: { fontSize: 20, fontWeight: '900', color: colors.cream, letterSpacing: -0.5, marginTop: 4 },
  paletteSection: { marginBottom: 22 },
  paletteSectionLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 1.8, color: 'rgba(251,246,235,0.5)', textTransform: 'uppercase', marginBottom: 14 },
  paletteChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  paletteChip: { borderRadius: radii.pill, paddingVertical: 9, paddingHorizontal: 16 },
  paletteChipDark: { borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.18)' },
  paletteChipText: { fontSize: 13, fontWeight: '800', color: colors.ink },
  paletteChipTextDark: { color: colors.lime },
  affinityRow: { flexDirection: 'row', gap: 12, marginBottom: 22 },
  affinityCard: { flex: 1, borderRadius: radii.xl, padding: 16, backgroundColor: colors.lime, overflow: 'hidden' },
  affinityLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 1.2, color: 'rgba(22,16,46,0.7)', textTransform: 'uppercase' },
  affinityValue: { fontSize: 36, fontWeight: '900', color: colors.ink, letterSpacing: -1, marginTop: 4 },
  affinityQuote: { fontSize: 12, fontStyle: 'italic', color: 'rgba(22,16,46,0.75)', fontWeight: '600', marginTop: 2 },
  pairCard: { flex: 1, borderRadius: radii.xl, padding: 16, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.12)' },
  pairLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 1.2, color: 'rgba(251,246,235,0.5)', textTransform: 'uppercase', marginBottom: 10 },
  pairRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  pairType: { fontSize: 12, fontWeight: '700', color: 'rgba(251,246,235,0.85)' },
  shareHint: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: radii.lg, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 12 },
  shareIcon: { width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(212,255,61,0.16)', alignItems: 'center', justifyContent: 'center' },
  shareIconText: { color: colors.lime, fontSize: 16, fontWeight: '900' },
  shareTitle: { fontSize: 14, fontWeight: '800', color: colors.cream },
  shareSub: { fontSize: 11, color: 'rgba(251,246,235,0.55)', marginTop: 2, fontWeight: '600' },
  shareBtn: { borderRadius: radii.pill, paddingVertical: 8, paddingHorizontal: 14, backgroundColor: colors.cream },
  shareBtnText: { color: colors.ink, fontWeight: '900', fontSize: 12 },
  cta: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  errorBox: { backgroundColor: 'rgba(255,126,107,0.12)', borderRadius: radii.sm, padding: 12, marginBottom: 14 },
  errorText: { fontSize: 13, fontWeight: '700', color: '#C0392B' },
  ctaGrad: { paddingHorizontal: 22, paddingTop: 20, paddingBottom: 36 },
  ctaBtn: { backgroundColor: colors.lime },
});
