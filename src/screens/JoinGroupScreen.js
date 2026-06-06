import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { Avatar } from '../components/Avatar';
import { RMButton } from '../components/RMButton';
import { DISCOVERABLE_GROUPS, MEMBERS } from '../data/sample';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function JoinGroupScreen({ navigation }) {
  const [code, setCode] = useState('');
  const [found, setFound] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  function handleSearch() {
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length < 4) { setError('Enter at least 4 characters'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      const match = DISCOVERABLE_GROUPS.find((g) => g.code === trimmed);
      setLoading(false);
      if (match) { setFound(match); }
      else { setError('No group found with that code. Double-check and try again.'); setFound(null); }
    }, 900);
  }

  function goToPreview(group) {
    navigation.navigate(routes.GroupPreview, { groupId: group.id });
  }

  return (
    <Screen
      backgroundColor={colors.cream}
      footer={
        found ? (
          <RMButton title="See group profile →" variant="dark" onPress={() => goToPreview(found)} />
        ) : (
          <RMButton
            title={loading ? 'Searching…' : 'Find group'}
            variant={code.length >= 4 ? 'dark' : 'ghost'}
            onPress={handleSearch}
          />
        )
      }
    >
      <TopBar title="Join a circle" onBack={() => navigation.goBack()} />

      <View style={styles.header}>
        <Text style={styles.kicker}>★ Find your people</Text>
        <Text style={styles.title}>
          Join a reading{'\n'}
          <Text style={styles.titleItalic}>circle</Text>
        </Text>
        <Text style={styles.subtitle}>
          Enter an invite code or browse popular circles below.
        </Text>
      </View>

      {/* Code input */}
      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>INVITE CODE</Text>
        <View style={styles.inputRow}>
          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={(v) => { setCode(v.toUpperCase()); setFound(null); setError(''); }}
            placeholder="e.g. DR9981"
            placeholderTextColor="rgba(22,16,46,0.3)"
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={8}
            style={styles.codeInput}
            onSubmitEditing={handleSearch}
          />
          {code.length > 0 && (
            <Pressable onPress={() => { setCode(''); setFound(null); setError(''); }} style={styles.clearBtn}>
              <Text style={styles.clearBtnText}>✕</Text>
            </Pressable>
          )}
        </View>
        <View style={[styles.codeUnderline, code.length >= 4 && styles.codeUnderlineActive]} />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      {/* Found group preview card */}
      {found && (
        <Pressable onPress={() => goToPreview(found)} style={styles.foundCard}>
          <View style={[styles.foundBadge, { backgroundColor: found.color }]}>
            <Text style={styles.foundBadgeText}>{found.initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.foundName}>{found.name}</Text>
            <Text style={styles.foundMood}>{found.mood}</Text>
            <View style={styles.foundMeta}>
              <View style={styles.foundAvatars}>
                {found.memberIds.slice(0, 3).map((id, i) => {
                  const m = MEMBERS.find((mem) => mem.id === id);
                  return m ? <View key={id} style={{ marginLeft: i === 0 ? 0 : -8 }}><Avatar m={m} size={22} /></View> : null;
                })}
              </View>
              <Text style={styles.foundMembers}>{found.memberIds.length} members · {found.pace}</Text>
            </View>
          </View>
          <View style={styles.previewBtn}>
            <Text style={styles.previewBtnText}>View →</Text>
          </View>
        </Pressable>
      )}

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or browse popular circles</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Browse list */}
      <View style={styles.browseList}>
        {DISCOVERABLE_GROUPS.map((g) => (
          <Pressable key={g.id} onPress={() => goToPreview(g)} style={styles.browseRow}>
            <View style={[styles.browseBadge, { backgroundColor: g.color + '33' }]}>
              <Text style={[styles.browseBadgeText, { color: g.color === colors.cream ? colors.ink : g.color }]}>
                {g.initials}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.browseName}>{g.name}</Text>
              <Text style={styles.browseMood}>{g.mood}</Text>
              <Text style={styles.browsePace}>{g.pace}</Text>
            </View>
            <View style={styles.browseMeta}>
              <View style={styles.browseAvatars}>
                {g.memberIds.slice(0, 2).map((id, i) => {
                  const m = MEMBERS.find((mem) => mem.id === id);
                  return m ? <View key={id} style={{ marginLeft: i === 0 ? 0 : -6 }}><Avatar m={m} size={20} /></View> : null;
                })}
              </View>
              <Text style={styles.browseCount}>{g.memberIds.length} members</Text>
              <View style={styles.browseArrow}>
                <Text style={styles.browseArrowText}>›</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 22, paddingBottom: 24 },
  kicker: { fontSize: 10, fontWeight: '800', letterSpacing: 2, textTransform: 'uppercase', color: colors.purple, marginBottom: 8 },
  title: { fontSize: 38, fontWeight: '900', color: colors.ink, letterSpacing: -1, lineHeight: 40 },
  titleItalic: { fontStyle: 'italic', fontWeight: '400', color: colors.purple },
  subtitle: { marginTop: 10, fontSize: 14, color: 'rgba(22,16,46,0.6)', fontWeight: '600', lineHeight: 19 },
  inputCard: { marginHorizontal: 22, marginBottom: 12 },
  inputLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 2, color: 'rgba(22,16,46,0.45)', marginBottom: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  codeInput: { flex: 1, fontSize: 32, fontWeight: '900', color: colors.ink, letterSpacing: 4, paddingVertical: 4 },
  clearBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(22,16,46,0.08)', alignItems: 'center', justifyContent: 'center' },
  clearBtnText: { fontSize: 13, color: 'rgba(22,16,46,0.5)', fontWeight: '900' },
  codeUnderline: { height: 2, borderRadius: 1, backgroundColor: 'rgba(22,16,46,0.15)', marginTop: 6 },
  codeUnderlineActive: { backgroundColor: colors.purple },
  errorText: { marginTop: 8, fontSize: 12, fontWeight: '700', color: colors.coral },
  foundCard: {
    marginHorizontal: 22,
    marginBottom: 20,
    backgroundColor: colors.lime,
    borderRadius: radii.xl,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },
  foundBadge: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  foundBadgeText: { color: colors.ink, fontWeight: '900', fontSize: 16, letterSpacing: -0.5 },
  foundName: { fontSize: 16, fontWeight: '900', color: colors.ink, letterSpacing: -0.3 },
  foundMood: { fontSize: 11, fontWeight: '700', color: 'rgba(22,16,46,0.65)', marginTop: 2 },
  foundMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  foundAvatars: { flexDirection: 'row' },
  foundMembers: { fontSize: 11, fontWeight: '800', color: 'rgba(22,16,46,0.7)' },
  previewBtn: { borderRadius: radii.pill, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: colors.ink },
  previewBtnText: { color: colors.lime, fontWeight: '900', fontSize: 12 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: 22, marginBottom: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(22,16,46,0.1)' },
  dividerText: { fontSize: 10, fontWeight: '700', color: 'rgba(22,16,46,0.4)', letterSpacing: 0.4 },
  browseList: { paddingHorizontal: 22, gap: 10 },
  browseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: radii.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  browseBadge: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  browseBadgeText: { fontWeight: '900', fontSize: 15, letterSpacing: -0.3 },
  browseName: { fontSize: 15, fontWeight: '900', color: colors.ink, letterSpacing: -0.2 },
  browseMood: { fontSize: 11, fontWeight: '700', color: 'rgba(22,16,46,0.55)', marginTop: 2 },
  browsePace: { fontSize: 10, fontWeight: '700', color: 'rgba(22,16,46,0.4)', marginTop: 2, letterSpacing: 0.2 },
  browseMeta: { alignItems: 'flex-end', gap: 6 },
  browseAvatars: { flexDirection: 'row' },
  browseCount: { fontSize: 10, fontWeight: '800', color: 'rgba(22,16,46,0.45)' },
  browseArrow: { width: 26, height: 26, borderRadius: 8, backgroundColor: colors.cream, alignItems: 'center', justifyContent: 'center' },
  browseArrowText: { fontSize: 18, fontWeight: '900', color: 'rgba(22,16,46,0.5)' },
});
