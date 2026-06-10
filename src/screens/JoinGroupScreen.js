import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { joinGroupByCode } from '../utils/userStorage';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function JoinGroupScreen({ navigation }) {
  const [code, setCode] = useState('');
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState('');
  const [joinSuccess, setJoinSuccess] = useState(null); // { groupId, groupName }

  const onJoinByCode = async () => {
    if (code.trim().length < 4 || joining) return;
    setJoining(true);
    setJoinError('');
    setJoinSuccess(null);
    try {
      const result = await joinGroupByCode(code);
      setJoinSuccess(result);
      setCode('');
    } catch (e) {
      setJoinError(e?.message || 'Código no encontrado');
    } finally {
      setJoining(false);
    }
  };

  return (
    <Screen backgroundColor={colors.cream}>
      <TopBar title="Unirse a un círculo" onBack={() => navigation.goBack()} />

      <View style={styles.header}>
        <Text style={styles.kicker}>★ Find your people</Text>
        <Text style={styles.title}>
          Join a reading{'\n'}
          <Text style={styles.titleItalic}>circle</Text>
        </Text>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>CÓDIGO DEL GRUPO</Text>
        <View style={styles.inputRow}>
          <TextInput
            value={code}
            onChangeText={(v) => {
              setCode(v.toUpperCase());
              setJoinError('');
              setJoinSuccess(null);
            }}
            placeholder="ej. RM-A3F7"
            placeholderTextColor="rgba(22,16,46,0.3)"
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={8}
            style={styles.codeInput}
            onSubmitEditing={onJoinByCode}
          />
        </View>
        <View style={[styles.codeUnderline, code.length >= 4 && styles.codeUnderlineActive]} />
        {joinError ? <Text style={styles.errText}>{joinError}</Text> : null}
        {joinSuccess ? (
          <View style={styles.successBox}>
            <Text style={styles.successText}>¡Entraste a {joinSuccess.groupName}! 🎉</Text>
            <Pressable
              onPress={() =>
                navigation.navigate(routes.GroupDetail, { groupId: joinSuccess.groupId })
              }
              style={styles.goHome}
            >
              <Text style={styles.goHomeText}>Ir al grupo →</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={onJoinByCode}
            disabled={code.length < 6 || joining}
            style={[
              styles.joinBtn,
              (code.length < 6 || joining) && styles.joinBtnDisabled,
              { marginTop: 12 },
            ]}
          >
            {joining ? (
              <ActivityIndicator color={colors.cream} />
            ) : (
              <Text style={styles.joinBtnText}>Unirse al círculo</Text>
            )}
          </Pressable>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 22, paddingBottom: 20 },
  kicker: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.purple,
    marginBottom: 8,
  },
  title: { fontSize: 38, fontWeight: '900', color: colors.ink, letterSpacing: -1, lineHeight: 40 },
  titleItalic: { fontStyle: 'italic', fontWeight: '400', color: colors.purple },
  inputCard: { marginHorizontal: 22, marginBottom: 12 },
  inputLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.45)',
    marginBottom: 10,
  },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  codeInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: 4,
    paddingVertical: 4,
  },
  codeUnderline: {
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(22,16,46,0.15)',
    marginTop: 6,
  },
  codeUnderlineActive: { backgroundColor: colors.purple },
  errText: { fontSize: 12, fontWeight: '700', color: colors.coral, marginTop: 8, marginBottom: 4 },
  successBox: {
    backgroundColor: 'rgba(212,255,61,0.1)',
    borderRadius: radii.md,
    padding: 12,
    gap: 8,
    marginTop: 12,
  },
  successText: { fontSize: 13, fontWeight: '800', color: colors.ink },
  goHome: { alignSelf: 'flex-start' },
  goHomeText: { fontSize: 13, fontWeight: '800', color: colors.purple },
  joinBtn: {
    borderRadius: radii.pill,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.ink,
    alignItems: 'center',
  },
  joinBtnDisabled: { backgroundColor: 'rgba(22,16,46,0.2)' },
  joinBtnText: { fontSize: 14, fontWeight: '900', color: colors.cream },
});
