import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { RMButton } from '../components/RMButton';
import { supabase } from '../lib/supabase';
import { createGroupWithMembers } from '../utils/userStorage';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

const VIBE_CATEGORIES = [
  {
    label: 'Estilos',
    options: ['Dark Academia','Cozy Fantasy','Psychological','Emotional','Philosophical','Fast Thrillers','Sci-Fi','Character-driven'],
  },
  {
    label: 'Géneros',
    options: ['Literary','Fantasy','Mystery','Romance','Memoir','History','Horror','Essays','Poetry','Climate','Politics'],
  },
  {
    label: 'Ritmo',
    options: ['Light & fast','Balanced & immersive','Deep & philosophical','Experimental'],
  },
];
const MAX_VIBES = 5;

export function CreateGroupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [selectedVibes, setSelectedVibes] = useState([]);
  const [vibeError, setVibeError] = useState('');
  const [tgOn, setTgOn] = useState(false);
  const [friendQuery, setFriendQuery] = useState('');
  const [friendResults, setFriendResults] = useState([]);
  const [friendSearching, setFriendSearching] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [groupLink, setGroupLink] = useState(null);
  const savingRef = useRef(false);
  const selectedFriendsRef = useRef(selectedFriends);
  useEffect(() => { selectedFriendsRef.current = selectedFriends; }, [selectedFriends]);

  useEffect(() => {
    if (friendQuery.trim().length < 2) { setFriendResults([]); return; }
    setFriendSearching(true);
    const t = setTimeout(async () => {
      try {
        const { data } = await supabase.rpc('search_users', { query: friendQuery.trim() });
        setFriendResults(
          (data ?? []).filter((r) => !selectedFriendsRef.current.some((f) => f.user_id === r.user_id))
        );
      } catch (_) {}
      setFriendSearching(false);
    }, 500);
    return () => clearTimeout(t);
  }, [friendQuery]);

  const toggleVibe = (label) => {
    setVibeError('');
    if (selectedVibes.includes(label)) {
      setSelectedVibes((v) => v.filter((x) => x !== label));
    } else {
      if (selectedVibes.length >= MAX_VIBES) { setVibeError('Máximo 5 vibes por grupo'); return; }
      setSelectedVibes((v) => [...v, label]);
    }
  };

  const friendLabel = (f) => f.username || f.email?.split('@')[0] || '?';

  const addFriend = (f) => {
    setSelectedFriends((prev) => [...prev, f]);
    setFriendResults((r) => r.filter((x) => x.user_id !== f.user_id));
    setFriendQuery('');
  };

  const onCreate = async () => {
    if (savingRef.current) return;
    savingRef.current = true;
    setSaving(true);
    setError('');
    try {
      const groupId = await createGroupWithMembers({
        groupName: name.trim() || 'My Circle',
        vibes: selectedVibes,
        tgOn,
        friendUserIds: selectedFriends.map((f) => f.user_id),
      });
      setGroupLink(`readmatch://join/${groupId}`);
    } catch (e) {
      setError(e?.message || 'No se pudo crear el círculo');
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  };

  if (groupLink) {
    return (
      <Screen
        backgroundColor={colors.ink}
        footer={
          <RMButton
            title="Ir al dashboard →"
            variant="primary"
            onPress={() => navigation.navigate(routes.Home)}
          />
        }
      >
        <View style={styles.linkWrap}>
          <Text style={styles.linkKicker}>✦ Círculo creado</Text>
          <Text style={styles.linkTitle}>
            Comparte este{'\n'}
            <Text style={styles.linkAccent}>link</Text>
          </Text>
          <Text style={styles.linkSub}>con tus amigos para que se unan a tu círculo.</Text>
          <TextInput
            value={groupLink}
            editable={false}
            selectTextOnFocus
            style={styles.linkInput}
          />
          <Text style={styles.linkHint}>Selecciona el texto para copiarlo</Text>
          {tgOn && (
            <Text style={styles.linkTgNote}>
              El bot de Telegram se activará cuando conectes el bot — por ahora es un placeholder.
            </Text>
          )}
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      backgroundColor={colors.cream}
      footer={
        <RMButton
          title={saving ? 'Creando…' : 'Create circle ✦'}
          variant={!saving ? 'dark' : 'ghost'}
          disabled={saving}
          onPress={onCreate}
        />
      }
    >
      <TopBar title="Nuevo círculo" onBack={() => navigation.goBack()} />

      <View style={styles.header}>
        <Text style={styles.title}>
          Start a{'\n'}
          <Text style={styles.titleItalic}>reading circle</Text>
        </Text>
        <Text style={styles.subtitle}>
          Dale un nombre, define el vibe e invita a tus amigos.
        </Text>
      </View>

      {error ? <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text></View> : null}

      {/* Name */}
      <View style={styles.card}>
        <Text style={styles.cardQ}>01 · Nombre</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.nameInput}
          placeholder="Nombre del círculo…"
          placeholderTextColor="rgba(22,16,46,0.35)"
        />
      </View>

      {/* Vibes */}
      <View style={styles.card}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.cardQ}>02 · ¿Qué leerán?</Text>
          <Text style={[styles.vibeCount, selectedVibes.length > 0 && styles.vibeCountActive]}>
            {selectedVibes.length} / {MAX_VIBES}
          </Text>
        </View>
        {vibeError ? <Text style={styles.vibeError}>{vibeError}</Text> : null}
        {VIBE_CATEGORIES.map((cat) => (
          <View key={cat.label} style={styles.vibeGroup}>
            <Text style={styles.vibeCatLabel}>{cat.label}</Text>
            <View style={styles.vibeChips}>
              {cat.options.map((opt) => {
                const on = selectedVibes.includes(opt);
                return (
                  <Pressable key={`${cat.label}-${opt}`} onPress={() => toggleVibe(opt)} style={[styles.vibeChip, on && styles.vibeChipOn]}>
                    <Text style={[styles.vibeChipText, on && styles.vibeChipTextOn]}>{opt}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
        <Text style={styles.vibeHint}>
          Esto nos da una idea del tipo de lecturas que busca tu grupo, pero las recomendaciones siempre se adaptan a los gustos reales de cada miembro.
        </Text>
      </View>

      {/* Friends */}
      <View style={styles.card}>
        <Text style={styles.cardQ}>03 · Invitar amigos</Text>
        <View style={styles.searchRow}>
          <TextInput
            value={friendQuery}
            onChangeText={setFriendQuery}
            style={styles.searchInput}
            placeholder="Buscar por username…"
            placeholderTextColor="rgba(22,16,46,0.35)"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {friendSearching && <Text style={styles.spinner}>···</Text>}
        </View>
        {friendResults.length > 0 && (
          <View style={styles.results}>
            {friendResults.map((r) => (
              <Pressable key={r.user_id} style={styles.resultRow} onPress={() => addFriend(r)}>
                <View style={styles.resultAvatar}>
                  <Text style={styles.resultAvatarText}>{friendLabel(r)[0].toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.resultName}>{friendLabel(r)}</Text>
                  {r.username && r.email ? <Text style={styles.resultEmail}>{r.email}</Text> : null}
                </View>
                <Text style={styles.resultAdd}>+ Invitar</Text>
              </Pressable>
            ))}
          </View>
        )}
        {selectedFriends.length > 0 && (
          <View style={styles.selectedRow}>
            {selectedFriends.map((f) => (
              <Pressable
                key={f.user_id}
                style={styles.selectedChip}
                onPress={() => setSelectedFriends((p) => p.filter((x) => x.user_id !== f.user_id))}
              >
                <Text style={styles.selectedName}>{friendLabel(f)}</Text>
                <Text style={styles.selectedX}>×</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* Telegram */}
      <View style={[styles.tgCard, tgOn && styles.tgCardOn]}>
        <View style={styles.tgRow}>
          <View style={[styles.tgIcon, { backgroundColor: tgOn ? colors.lime : colors.lavender }]}>
            <Text style={styles.tgIconText}>↗</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.tgTitle, tgOn && { color: colors.cream }]}>Conectar Telegram</Text>
            <Text style={[styles.tgBody, tgOn && { color: 'rgba(251,246,235,0.75)' }]}>
              Conecta tu grupo a Telegram para recibir las recomendaciones directamente ahí.
            </Text>
          </View>
          <Pressable onPress={() => setTgOn((v) => !v)} style={[styles.toggle, tgOn && styles.toggleOn]}>
            <View style={[styles.toggleThumb, tgOn && styles.toggleThumbOn]} />
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 22, paddingBottom: 20, paddingTop: 4 },
  title: { fontSize: 36, fontWeight: '900', color: colors.ink, letterSpacing: -1, lineHeight: 38 },
  titleItalic: { fontStyle: 'italic', fontWeight: '700', color: colors.purple },
  subtitle: { marginTop: 10, fontSize: 14, color: 'rgba(22,16,46,0.6)', fontWeight: '600', lineHeight: 19 },
  errorBox: { marginHorizontal: 22, marginBottom: 10, backgroundColor: 'rgba(255,126,107,0.12)', borderRadius: radii.md, padding: 12 },
  errorText: { fontSize: 12, fontWeight: '700', color: '#C0392B' },
  card: { marginHorizontal: 22, marginBottom: 12, backgroundColor: colors.white, borderRadius: radii.xl, padding: 16, borderWidth: 1, borderColor: 'rgba(22,16,46,0.06)' },
  cardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardQ: { fontSize: 10, fontWeight: '800', letterSpacing: 1.2, textTransform: 'uppercase', color: 'rgba(22,16,46,0.5)', marginBottom: 12 },
  nameInput: { fontSize: 22, fontWeight: '900', color: colors.ink, borderBottomWidth: 2, borderBottomColor: colors.purple, paddingBottom: 4, letterSpacing: -0.5 },
  vibeCount: { fontSize: 11, fontWeight: '800', color: 'rgba(22,16,46,0.35)' },
  vibeCountActive: { color: colors.purple },
  vibeError: { fontSize: 11, fontWeight: '700', color: colors.coral, marginBottom: 8 },
  vibeGroup: { marginBottom: 14 },
  vibeCatLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 1.4, textTransform: 'uppercase', color: 'rgba(22,16,46,0.45)', marginBottom: 8 },
  vibeChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  vibeChip: { borderRadius: radii.pill, paddingVertical: 7, paddingHorizontal: 12, backgroundColor: 'rgba(22,16,46,0.04)', borderWidth: 1, borderColor: 'rgba(22,16,46,0.08)' },
  vibeChipOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  vibeChipText: { fontSize: 12, fontWeight: '700', color: colors.ink },
  vibeChipTextOn: { color: colors.cream },
  vibeHint: { fontSize: 11, color: 'rgba(22,16,46,0.42)', fontWeight: '600', lineHeight: 16, marginTop: 4 },
  searchRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1.5, borderBottomColor: 'rgba(22,16,46,0.12)', marginBottom: 10 },
  searchInput: { flex: 1, fontSize: 15, fontWeight: '700', color: colors.ink, paddingVertical: 8 },
  spinner: { fontSize: 16, color: 'rgba(22,16,46,0.35)', letterSpacing: 2 },
  results: { borderRadius: radii.md, overflow: 'hidden', marginBottom: 8 },
  resultRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(22,16,46,0.05)' },
  resultAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.lavender, alignItems: 'center', justifyContent: 'center' },
  resultAvatarText: { fontSize: 13, fontWeight: '900', color: colors.ink },
  resultName: { fontSize: 14, fontWeight: '700', color: colors.ink },
  resultEmail: { fontSize: 11, fontWeight: '600', color: 'rgba(22,16,46,0.45)', marginTop: 1 },
  resultAdd: { fontSize: 12, fontWeight: '800', color: colors.purple },
  selectedRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
  selectedChip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: radii.pill, paddingVertical: 6, paddingHorizontal: 10, backgroundColor: colors.purple },
  selectedName: { fontSize: 12, fontWeight: '800', color: colors.cream },
  selectedX: { fontSize: 14, fontWeight: '900', color: 'rgba(251,246,235,0.65)' },
  tgCard: { marginHorizontal: 22, marginBottom: 12, borderRadius: radii.xl, padding: 16, backgroundColor: colors.white, borderWidth: 1, borderColor: 'rgba(22,16,46,0.06)' },
  tgCardOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  tgRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
  tgIcon: { width: 44, height: 44, borderRadius: 13, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  tgIconText: { fontSize: 18, fontWeight: '900', color: colors.ink },
  tgTitle: { fontSize: 16, fontWeight: '900', color: colors.ink, letterSpacing: -0.3 },
  tgBody: { fontSize: 12, fontWeight: '600', color: 'rgba(22,16,46,0.65)', lineHeight: 17, marginTop: 4 },
  toggle: { width: 50, height: 28, borderRadius: 14, backgroundColor: 'rgba(22,16,46,0.15)', justifyContent: 'center', paddingHorizontal: 2, flexShrink: 0 },
  toggleOn: { backgroundColor: colors.lime },
  toggleThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.ink, alignSelf: 'flex-start' },
  toggleThumbOn: { alignSelf: 'flex-end' },
  linkWrap: { paddingHorizontal: 22, paddingTop: 60 },
  linkKicker: { fontSize: 11, fontWeight: '800', letterSpacing: 2, textTransform: 'uppercase', color: colors.lime, marginBottom: 12 },
  linkTitle: { fontSize: 40, fontWeight: '900', color: colors.cream, letterSpacing: -1, lineHeight: 42 },
  linkAccent: { fontStyle: 'italic', fontWeight: '400', color: colors.lime },
  linkSub: { marginTop: 10, fontSize: 14, color: 'rgba(251,246,235,0.7)', fontWeight: '600', lineHeight: 20, marginBottom: 28 },
  linkInput: { backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: radii.md, padding: 14, fontSize: 14, fontWeight: '700', color: colors.lime, letterSpacing: 0.3, borderWidth: 0.5, borderColor: 'rgba(212,255,61,0.3)' },
  linkHint: { marginTop: 8, fontSize: 11, color: 'rgba(251,246,235,0.38)', fontWeight: '600' },
  linkTgNote: { marginTop: 20, fontSize: 12, color: 'rgba(251,246,235,0.48)', fontWeight: '600', lineHeight: 18 },
});
