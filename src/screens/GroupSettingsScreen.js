import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from '../components/Avatar';
import { Pill } from '../components/Pill';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { MEMBERS } from '../data/sample';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function GroupSettingsScreen({ navigation }) {
  const [tgMirror, setTgMirror] = useState(true);
  const [autoRec, setAutoRec] = useState(true);
  const [fairness, setFairness] = useState(true);

  const members = [
    { ...MEMBERS[0], role: 'Curator', status: 'in-sync', last: '2m' },
    { ...MEMBERS[1], role: 'Member', status: 'in-sync', last: '14m' },
    { ...MEMBERS[2], role: 'Member', status: 'in-sync', last: '1h' },
    { ...MEMBERS[3], role: 'Member', status: 'tg-only', last: '3h' },
    { ...MEMBERS[4], role: 'Pending', status: 'pending', last: '—' },
  ];

  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>
      <TopBar subtitle="Group settings" title={null} onBack={() => navigation.goBack()} right={<Pressable onPress={() => navigation.navigate(routes.AllScreens)} style={styles.more}><Text style={styles.moreText}>⋯</Text></Pressable>} />

      <View style={styles.hero}>
        <LinearGradient colors={[colors.purple, colors.violet]} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={styles.badge}>
          <Text style={styles.badgeText}>SB</Text>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Text style={styles.groupName}>Slow Burners</Text>
          <Text style={styles.groupMeta}>5 members · est. Aug 2024</Text>
          <View style={styles.heroPills}>
            <Pill label="● TG synced" tone="lime" />
            <Pill label="Curious mood" tone="glass" style={{ backgroundColor: colors.white, borderColor: 'rgba(22,16,46,0.1)' }} />
          </View>
        </View>
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.section}>Members</Text>
        <Pressable onPress={() => navigation.navigate(routes.Invite)} style={styles.inviteBtn}>
          <Text style={styles.inviteText}>+ Invite</Text>
        </Pressable>
      </View>

      <View style={styles.memberList}>
        {members.map((m) => (
          <View key={m.id} style={[styles.member, m.status === 'pending' ? styles.memberPending : null]}>
            <Avatar m={m} size={42} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <View style={styles.memberTop}>
                <Text style={styles.memberName} numberOfLines={1}>
                  {m.name}
                </Text>
                {m.role === 'Curator' ? <Text style={styles.curator}>CURATOR</Text> : null}
              </View>
              <Text style={styles.memberMeta} numberOfLines={1}>
                {m.tag} · last {m.last}
              </Text>
            </View>
            <StatusPill status={m.status} />
          </View>
        ))}
      </View>

      <Text style={styles.section2}>Preferences</Text>
      <View style={styles.prefList}>
        <PrefRow icon="✈" tone={colors.purple} title="Telegram mirror" subtitle="Push recs & votes to the channel." value={tgMirror} onToggle={() => setTgMirror((v) => !v)} />
        <PrefRow icon="✦" tone={colors.coral} title="Auto-recommend" subtitle="AI picks a new book every Monday." value={autoRec} onToggle={() => setAutoRec((v) => !v)} />
        <PrefRow icon="⚖" tone={colors.lime} title="Fairness guard" subtitle="Protect minority preferences." value={fairness} onToggle={() => setFairness((v) => !v)} />
      </View>

      <Pressable style={styles.danger} onPress={() => null}>
        <View style={styles.dangerIcon}>
          <Text style={styles.dangerIconText}>!</Text>
        </View>
        <Text style={styles.dangerText}>Disband group · permanent</Text>
      </Pressable>
    </Screen>
  );
}

function StatusPill({ status }) {
  const map = {
    'in-sync': { bg: '#E8F8D5', fg: '#3F6E12', dot: '#7DC22A', text: '● synced' },
    'tg-only': { bg: colors.mist, fg: '#5F38C2', dot: colors.purple, text: 'TG only' },
    pending: { bg: 'rgba(255,158,87,0.18)', fg: '#A04A12', dot: '#FF9457', text: 'pending' },
  };
  const s = map[status] ?? map.pending;

  return (
    <View style={[styles.status, { backgroundColor: s.bg }]}>
      <View style={[styles.statusDot, { backgroundColor: s.dot }]} />
      <Text style={[styles.statusText, { color: s.fg }]}>{s.text}</Text>
    </View>
  );
}

function PrefRow({ icon, tone, title, subtitle, value, onToggle }) {
  return (
    <View style={styles.pref}>
      <View style={[styles.prefIcon, { backgroundColor: tone }]}>
        <Text style={styles.prefIconText}>{icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.prefTitle}>{title}</Text>
        <Text style={styles.prefSub}>{subtitle}</Text>
      </View>
      <Pressable onPress={onToggle} style={[styles.prefToggle, value ? styles.prefToggleOn : styles.prefToggleOff]}>
        <View style={[styles.prefKnob, value ? styles.prefKnobOn : styles.prefKnobOff]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 36,
    paddingTop: 10,
  },
  more: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreText: {
    color: colors.ink,
    fontWeight: '900',
  },
  hero: {
    paddingHorizontal: 22,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  badge: {
    width: 80,
    height: 80,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.cream,
    fontWeight: '900',
    fontSize: 36,
    letterSpacing: -0.6,
  },
  groupName: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.5,
  },
  groupMeta: {
    marginTop: 4,
    fontSize: 10.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.55)',
    fontWeight: '800',
  },
  heroPills: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sectionRow: {
    marginTop: 10,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  section: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  inviteBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: colors.ink,
  },
  inviteText: {
    color: colors.cream,
    fontWeight: '900',
    fontSize: 11,
  },
  memberList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  member: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.05)',
  },
  memberPending: {
    backgroundColor: '#fff8e6',
  },
  memberTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  memberName: {
    fontWeight: '900',
    color: colors.ink,
    flex: 1,
  },
  curator: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: colors.lime,
    color: colors.ink,
    fontSize: 9,
    letterSpacing: 0.6,
    fontWeight: '900',
  },
  memberMeta: {
    marginTop: 4,
    fontSize: 10,
    letterSpacing: 0.4,
    color: 'rgba(22,16,46,0.5)',
    fontWeight: '700',
  },
  status: {
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 9.5,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontWeight: '900',
  },
  section2: {
    marginTop: 18,
    paddingHorizontal: 22,
    fontSize: 20,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.3,
    paddingBottom: 8,
  },
  prefList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  pref: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.05)',
  },
  prefIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prefIconText: {
    color: colors.ink,
    fontWeight: '900',
  },
  prefTitle: {
    fontWeight: '900',
    color: colors.ink,
  },
  prefSub: {
    marginTop: 2,
    fontSize: 11.5,
    color: 'rgba(22,16,46,0.55)',
    fontWeight: '600',
  },
  prefToggle: {
    width: 44,
    height: 26,
    borderRadius: 13,
    position: 'relative',
  },
  prefToggleOn: {
    backgroundColor: colors.ink,
  },
  prefToggleOff: {
    backgroundColor: 'rgba(22,16,46,0.15)',
  },
  prefKnob: {
    position: 'absolute',
    top: 3,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  prefKnobOn: {
    left: 21,
    backgroundColor: colors.lime,
  },
  prefKnobOff: {
    left: 3,
    backgroundColor: colors.white,
  },
  danger: {
    marginTop: 18,
    marginHorizontal: 16,
    padding: 14,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(192,67,47,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dangerIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(192,67,47,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerIconText: {
    color: '#C0432F',
    fontWeight: '900',
  },
  dangerText: {
    color: '#C0432F',
    fontWeight: '800',
  },
});

