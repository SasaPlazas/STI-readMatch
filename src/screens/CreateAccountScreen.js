import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

function PasswordStrength({ password }) {
  const len = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasNum = /[0-9]/.test(password);
  const score = (len >= 8 ? 1 : 0) + (hasUpper ? 1 : 0) + (hasNum ? 1 : 0);
  const labels = ['', 'Weak', 'Fair', 'Strong'];
  const barColors = ['rgba(22,16,46,0.1)', colors.coral, colors.lime, colors.lime];
  if (!password) return null;
  return (
    <View style={pw.wrap}>
      <View style={pw.bars}>
        {[1, 2, 3].map((n) => (
          <View key={n} style={[pw.bar, { backgroundColor: n <= score ? barColors[score] : 'rgba(22,16,46,0.1)' }]} />
        ))}
      </View>
      <Text style={[pw.label, { color: score === 1 ? colors.coral : score >= 2 ? '#3F6E12' : 'rgba(22,16,46,0.4)' }]}>
        {labels[score]}
      </Text>
    </View>
  );
}

const pw = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  bars: { flexDirection: 'row', gap: 4, flex: 1 },
  bar: { flex: 1, height: 4, borderRadius: 2 },
  label: { fontSize: 11, fontWeight: '800', letterSpacing: 0.4 },
});

export function CreateAccountScreen({ navigation }) {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSubmit = name.length >= 2 && email.includes('@') && password.length >= 6 && agreed;

  function handleCreate() {
    if (!canSubmit) return;
    setLoading(true);
    // Simula creación de cuenta — reemplazar con lógica real
    setTimeout(() => {
      setLoading(false);
      signUp({ email, name });
      // signUp marca completedOnboarding: false
      // RootNavigator mantiene al usuario en AuthStack → navega al onboarding
      navigation.navigate(routes.OnbIdentity);
    }, 1200);
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

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.kicker}>★ Join ReadMatch</Text>
            <Text style={styles.title}>Create your{'\n'}
              <Text style={styles.titleAccent}>account</Text>
            </Text>
            <Text style={styles.subtitle}>Takes 30 seconds. Then we find your reading identity.</Text>
          </View>

          {/* Form */}
          <View style={styles.card}>

            {/* Name */}
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Your name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="How should we call you?"
                placeholderTextColor="rgba(22,16,46,0.35)"
                autoCapitalize="words"
                style={styles.field}
              />
            </View>

            {/* Email */}
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
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
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.fieldPwWrap}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
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
              <PasswordStrength password={password} />
            </View>

            {/* Terms */}
            <Pressable onPress={() => setAgreed((v) => !v)} style={styles.termsRow}>
              <View style={[styles.checkbox, agreed && styles.checkboxOn]}>
                {agreed && <Text style={styles.checkboxCheck}>✓</Text>}
              </View>
              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text style={styles.termsLink}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </Pressable>

            {/* Submit */}
            <Pressable
              onPress={handleCreate}
              disabled={!canSubmit || loading}
              style={[styles.submitBtn, (!canSubmit || loading) && styles.submitBtnDisabled]}
            >
              <Text style={styles.submitText}>{loading ? 'Creating account…' : 'Create account'}</Text>
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
            <Text style={styles.dividerText}>or sign up with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social */}
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

          {/* Already have account */}
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate(routes.SignIn)}>
              <Text style={styles.switchLink}>Sign in</Text>
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
    marginBottom: 28,
  },
  backText: { fontSize: 22, color: colors.cream, fontWeight: '900', marginTop: -2 },
  header: { marginBottom: 28 },
  kicker: { fontSize: 10, fontWeight: '800', letterSpacing: 2, textTransform: 'uppercase', color: colors.lime, marginBottom: 10 },
  title: { fontSize: 40, fontWeight: '900', color: colors.cream, letterSpacing: -1, lineHeight: 42 },
  titleAccent: { color: colors.lime, fontStyle: 'italic', fontWeight: '400' },
  subtitle: { marginTop: 10, fontSize: 14, color: 'rgba(251,246,235,0.65)', fontWeight: '600', lineHeight: 20 },
  card: {
    backgroundColor: colors.cream,
    borderRadius: radii.xl,
    padding: 20,
    gap: 16,
  },
  fieldWrap: { gap: 6 },
  fieldLabel: { fontSize: 12, fontWeight: '800', color: colors.ink, letterSpacing: 0.4 },
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
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: 'rgba(22,16,46,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  checkboxOn: { backgroundColor: colors.purple, borderColor: colors.purple },
  checkboxCheck: { fontSize: 13, fontWeight: '900', color: colors.white },
  termsText: { flex: 1, fontSize: 13, color: 'rgba(22,16,46,0.7)', fontWeight: '600', lineHeight: 19 },
  termsLink: { color: colors.purple, fontWeight: '800', textDecorationLine: 'underline' },
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
