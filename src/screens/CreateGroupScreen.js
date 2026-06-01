import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from '../components/Avatar';
import { Pill } from '../components/Pill';
import { Ring } from '../components/Ring';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { MEMBERS } from '../data/sample';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

const MOODS = [
  { id: 'curious', label: 'Curious', emoji: '✦', c: colors.lime },
  { id: 'cozy', label: 'Cozy', emoji: '◐', c: colors.coral },
  { id: 'critical', label: 'Critical', emoji: '◇', c: colors.purple },
  { id: 'wild', label: 'Wild', emoji: '⚡', c: colors.lavender },
];

const PRIORITIES = [
  { id: 'diversity', l: 'Diversity', c: colors.purple },
  { id: 'depth', l: 'Depth over speed', c: colors.lime },
  { id: 'fairness', l: 'Fairness-aware', c: colors.coral },
  { id: 'minority', l: 'Minority voices', c: colors.lavender },
  { id: 'novelty', l: 'Novelty', c: colors.cream },
  { id: 'short', l: 'Short reads', c: colors.white },
];

export function CreateGroupScreen({ navigation }) {
  const [name, setName] = useState('Slow Burners');
  const [mood, setMood] = useState('curious');
  const [priority, setPriority] = useState(() => new Set(['diversity', 'depth']));
  const [tg, setTg] = useState(true);

  return (
    <Screen
      backgroundColor={colors.cream}
      footer={
        <Pressable onPress={() => navigation.navigate(routes.Invite)} style={styles.next}>
          <Text style={styles.nextText}>Next · Invite members</Text>
          <View style={styles.nextIcon}>
            <Text style={styles.nextIconText}>→</Text>
          </View>
        </Pressable>
      }
    >
      <TopBar subtitle="Step 1 of 3" title={null} onBack={() => navigation.goBack()} right={<Pressable onPress={() => navigation.navigate(routes.Invite)}><Text style={styles.skip}>Skip</Text></Pressable>} />

      <Text style={styles.h1}>
        Start a{'\n'}
        <Text style={styles.italic}>reading circle</Text>
      </Text>
      <Text style={styles.sub}>Pick a name, set the vibe, and we'll spin up a Telegram channel to keep everyone synced.</Text>

      <View style={styles.card}>
        <View style={styles.nameRow}>
          <LinearGradient colors={[colors.purple, colors.violet]} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={styles.badge}>
            <Text style={styles.badgeText}>SB</Text>
            <View style={styles.badgePlus}>
              <Text style={styles.badgePlusText}>+</Text>
            </View>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Group name</Text>
            <TextInput value={name} onChangeText={setName} style={styles.input} />
            <View style={styles.underline} />
          </View>
        </View>
      </View>

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Group mood</Text>
        <Text style={styles.sectionMeta}>SHAPES RECS</Text>
      </View>
      <View style={styles.grid}>
        {MOODS.map((m) => {
          const on = m.id === mood;
          return (
            <Pressable key={m.id} onPress={() => setMood(m.id)} style={[styles.mood, on ? { backgroundColor: m.c } : styles.moodOff]}>
              <View style={[styles.moodIcon, { backgroundColor: on ? colors.ink : m.c }]}>
                <Text style={[styles.moodIconText, { color: on ? m.c : colors.ink }]}>{m.emoji}</Text>
              </View>
              <Text style={styles.moodText}>{m.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.sectionTitle2}>Recommendation priorities</Text>
      <View style={styles.prios}>
        {PRIORITIES.map((p) => {
          const on = priority.has(p.id);
          return (
            <Pressable
              key={p.id}
              onPress={() =>
                setPriority((prev) => {
                  const next = new Set(prev);
                  if (next.has(p.id)) next.delete(p.id);
                  else next.add(p.id);
                  return next;
                })
              }
              style={[styles.prio, on ? { backgroundColor: p.c } : styles.prioOff]}
            >
              <Text style={styles.prioText}>{p.l}</Text>
              {on ? (
                <View style={styles.check}>
                  <Text style={[styles.checkText, { color: p.c }]}>✓</Text>
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>

      <View style={[styles.tg, tg ? styles.tgOn : styles.tgOff]}>
        <View style={styles.tgIcon}>
          <Text style={{ fontWeight: '900', color: colors.ink }}>↗</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.tgTitle, tg ? { color: colors.cream } : { color: colors.ink }]}>Mirror to Telegram</Text>
          <Text style={[styles.tgBody, tg ? { color: 'rgba(251,246,235,0.75)' } : { color: 'rgba(22,16,46,0.65)' }]}>
            We'll create a private channel. Members, votes, recommendations and discussions sync both ways.
          </Text>
          {tg ? (
            <View style={styles.tgPills}>
              <Pill label="● Auto-sync" tone="lime" />
              <Pill label="t.me/rm-slowburners" tone="glass" />
            </View>
          ) : null}
        </View>
        <Pressable onPress={() => setTg((v) => !v)} style={[styles.toggle, tg ? styles.toggleOn : styles.toggleOff]}>
          <View style={[styles.knob, tg ? { left: 23 } : { left: 3 }]} />
        </Pressable>
      </View>

      <View style={styles.preview}>
        <View>
          <Text style={styles.previewKicker}>Preview</Text>
          <View style={styles.previewAvs}>
            {MEMBERS.slice(0, 3).map((m, i) => (
              <View key={m.id} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                <Avatar m={m} size={28} />
              </View>
            ))}
            <View style={styles.more}>
              <Text style={styles.moreText}>+2</Text>
            </View>
          </View>
        </View>
        <Ring value={84} size={56} stroke={5} color={colors.purple} track="rgba(22,16,46,0.1)" textColor={colors.ink} />
      </View>

    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 140,
    paddingTop: 10,
  },
  skip: {
    color: colors.purple,
    fontWeight: '800',
  },
  h1: {
    marginTop: 10,
    marginHorizontal: 22,
    fontSize: 36,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -1,
    lineHeight: 38,
  },
  italic: {
    fontStyle: 'italic',
    fontWeight: '700',
    color: colors.purple,
  },
  sub: {
    marginTop: 10,
    marginHorizontal: 22,
    fontSize: 14,
    color: 'rgba(22,16,46,0.6)',
    lineHeight: 19,
    fontWeight: '600',
  },
  card: {
    marginTop: 18,
    marginHorizontal: 22,
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  badge: {
    width: 76,
    height: 76,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  badgeText: {
    color: colors.cream,
    fontWeight: '900',
    fontSize: 34,
    letterSpacing: -0.6,
  },
  badgePlus: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgePlusText: {
    color: colors.ink,
    fontWeight: '900',
  },
  label: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.55)',
    fontWeight: '800',
  },
  input: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    fontSize: 22,
    fontWeight: '900',
    color: colors.ink,
    marginTop: 4,
  },
  underline: {
    marginTop: 8,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.purple,
    width: 120,
    opacity: 0.7,
  },
  sectionHead: {
    marginTop: 16,
    marginHorizontal: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.2,
  },
  sectionMeta: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.45)',
    fontWeight: '800',
  },
  grid: {
    marginHorizontal: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  mood: {
    width: '48%',
    borderRadius: radii.lg,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  moodOff: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.08)',
  },
  moodIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodIconText: {
    fontWeight: '900',
    fontSize: 18,
  },
  moodText: {
    fontWeight: '900',
    color: colors.ink,
  },
  sectionTitle2: {
    marginTop: 16,
    marginHorizontal: 22,
    fontSize: 18,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.2,
    marginBottom: 10,
  },
  prios: {
    marginHorizontal: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  prio: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  prioOff: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.12)',
  },
  prioText: {
    color: colors.ink,
    fontWeight: '800',
  },
  check: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    fontSize: 9,
    fontWeight: '900',
  },
  tg: {
    marginTop: 18,
    marginHorizontal: 22,
    borderRadius: radii.xl,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  tgOn: {
    backgroundColor: colors.ink,
  },
  tgOff: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.08)',
  },
  tgIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tgTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.2,
  },
  tgBody: {
    marginTop: 6,
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: '600',
  },
  tgPills: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    position: 'relative',
    flexShrink: 0,
  },
  toggleOn: {
    backgroundColor: colors.lime,
  },
  toggleOff: {
    backgroundColor: 'rgba(22,16,46,0.15)',
  },
  knob: {
    position: 'absolute',
    top: 3,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.ink,
  },
  preview: {
    marginTop: 14,
    marginHorizontal: 22,
    padding: 16,
    borderRadius: radii.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewKicker: {
    fontSize: 9.5,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.5)',
    fontWeight: '800',
  },
  previewAvs: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  more: {
    marginLeft: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.ink,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreText: {
    color: colors.lime,
    fontWeight: '900',
    fontSize: 11,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 26,
    backgroundColor: colors.cream,
  },
  next: {
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.ink,
    paddingLeft: 24,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nextText: {
    color: colors.cream,
    fontWeight: '900',
    fontSize: 16,
  },
  nextIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextIconText: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 16,
  },
});

