import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function SignInScreen({ navigation, route }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState(route?.params?.email ?? '');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState(route?.params?.info ?? '');

  const canSubmit = email.length > 3 && password.length >= 6;

  async function handleSignIn() {
    if (!canSubmit || loading) return;
    setError('');
    setLoading(true);
    try {
      const { completedOnboarding } = await signIn({ email, password });
      navigation.reset({ index: 0, routes: [{ name: completedOnboarding ? routes.Home : routes.OnbIdentity }] });
    } catch (e) {
      setError(e?.message || 'Could not sign in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={['#2B1B69', '#16102E', '#1A1042']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.bg}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back */}
          <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>

          {/* Wordmark */}
          <View style={styles.brand}>
            <Text style={styles.wordmark}>
              read<Text style={styles.wordmarkAccent}>match</Text>
            </Text>
            <Text style={styles.brandSub}>Welcome back</Text>
          </View>

          {/* Form card */}
          <View style={styles.card}>
            {/* Email */}
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                value={email}
                onChangeText={(v) => { setEmail(v); setError(''); }}
                placeholder="you@example.com"
                placeholderTextColor="rgba(22,16,46,0.35)"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.field}
              />
            </View>

            {/* Password */}
            <View style={styles.fieldWrap}>
              <View style={styles.fieldLabelRow}>
                <Text style={styles.fieldLabel}>Password</Text>
                <Pressable onPress={() => null}>
                  <Text style={styles.forgotLink}>Forgot?</Text>
                </Pressable>
              </View>
              <View style={styles.fieldPwWrap}>
                <TextInput
                  value={password}
                  onChangeText={(v) => { setPassword(v); setError(''); }}
                  placeholder="Min. 6 characters"
                  placeholderTextColor="rgba(22,16,46,0.35)"
                  secureTextEntry={!showPw}
                  autoCapitalize="none"
                  style={[styles.field, { paddingRight: 50 }]}
                />
                <Pressable onPress={() => setShowPw((v) => !v)} style={styles.eyeBtn}>
                  <Text style={styles.eyeText}>{showPw ? '◉' : '◎'}</Text>
                </Pressable>
              </View>
            </View>

            {/* Message */}
            {info ? (
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>{info}</Text>
              </View>
            ) : null}

            {/* Error */}
            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Submit */}
            <Pressable
              onPress={handleSignIn}
              disabled={!canSubmit || loading}
              style={[styles.submitBtn, (!canSubmit || loading) && styles.submitBtnDisabled]}
            >
              <Text style={styles.submitText}>{loading ? 'Signing in…' : 'Sign in'}</Text>
              {!loading && (
                <View style={styles.submitArrow}>
                  <Text style={styles.submitArrowText}>→</Text>
                </View>
              )}
            </Pressable>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social buttons */}
          <View style={styles.socialRow}>
            <Pressable style={styles.socialBtn}>
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialLabel}>Google</Text>
            </Pressable>
            <Pressable style={styles.socialBtn}>
              <Text style={styles.socialIcon}></Text>
              <Text style={styles.socialLabel}>Apple</Text>
            </Pressable>
          </View>

          {/* Create account link */}
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>Don't have an account? </Text>
            <Pressable onPress={() => navigation.navigate(routes.CreateAccount)}>
              <Text style={styles.switchLink}>Create one</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 48 },
  back: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  backText: { fontSize: 22, color: colors.cream, fontWeight: '900', marginTop: -2 },
  brand: { marginBottom: 36 },
  wordmark: { fontSize: 48, fontWeight: '900', color: colors.cream, letterSpacing: -1.5, lineHeight: 50 },
  wordmarkAccent: { color: colors.lime },
  brandSub: { marginTop: 10, fontSize: 18, fontStyle: 'italic', color: 'rgba(251,246,235,0.7)', fontWeight: '600' },
  card: {
    backgroundColor: colors.cream,
    borderRadius: radii.xl,
    padding: 20,
    gap: 16,
  },
  fieldWrap: { gap: 6 },
  fieldLabel: { fontSize: 12, fontWeight: '800', color: colors.ink, letterSpacing: 0.4 },
  fieldLabelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  forgotLink: { fontSize: 12, fontWeight: '700', color: colors.purple, textDecorationLine: 'underline' },
  field: {
    height: 52,
    borderRadius: radii.md,
    backgroundColor: 'rgba(22,16,46,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.08)',
    paddingHorizontal: 14,
    fontSize: 15,
    fontWeight: '600',
    color: colors.ink,
  },
  fieldPwWrap: { position: 'relative' },
  eyeBtn: { position: 'absolute', right: 14, top: 0, bottom: 0, justifyContent: 'center' },
  eyeText: { fontSize: 18, color: 'rgba(22,16,46,0.45)' },
  errorBox: { backgroundColor: 'rgba(255,126,107,0.12)', borderRadius: radii.sm, padding: 12 },
  errorText: { fontSize: 13, fontWeight: '700', color: '#C0392B' },
  infoBox: { backgroundColor: 'rgba(212,255,61,0.24)', borderRadius: radii.sm, padding: 12 },
  infoText: { fontSize: 13, fontWeight: '700', color: '#3F6E12' },
  submitBtn: {
    height: 56,
    borderRadius: radii.pill,
    backgroundColor: colors.lime,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 4,
  },
  submitBtnDisabled: { opacity: 0.45 },
  submitText: { fontSize: 17, fontWeight: '900', color: colors.ink, letterSpacing: -0.2 },
  submitArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitArrowText: { color: colors.lime, fontWeight: '900', fontSize: 16 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(251,246,235,0.15)' },
  dividerText: { fontSize: 11, fontWeight: '700', color: 'rgba(251,246,235,0.45)', letterSpacing: 0.6 },
  socialRow: { flexDirection: 'row', gap: 12 },
  socialBtn: {
    flex: 1,
    height: 52,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  socialIcon: { fontSize: 18, fontWeight: '900', color: colors.cream },
  socialLabel: { fontSize: 14, fontWeight: '800', color: colors.cream },
  switchRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 28 },
  switchText: { fontSize: 14, color: 'rgba(251,246,235,0.65)', fontWeight: '600' },
  switchLink: { fontSize: 14, fontWeight: '900', color: colors.lime, textDecorationLine: 'underline' },
});
