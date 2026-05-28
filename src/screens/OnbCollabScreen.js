import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { Avatar } from '../components/Avatar';
import { Pill } from '../components/Pill';
import { RMButton } from '../components/RMButton';
import { MEMBERS } from '../data/sample';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function OnbCollabScreen({ navigation }) {
  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>
      <TopBar subtitle="Chapter Four" title="Find your circle" onBack={() => navigation.goBack()} />

      <View style={styles.hero}>
        <Text style={styles.h2}>
          Name your <Text style={styles.italic}>circle</Text>
        </Text>
        <Text style={styles.p}>
          ReadMatch works better with people. We'll handle the Telegram side.
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>SB</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Slow Burners</Text>
            <View style={styles.pills}>
              <Pill label="Curious" tone="lime" />
              <Pill label="Cozy" tone="glass" style={{ borderColor: 'rgba(22,16,46,0.1)' }} />
              <Pill label="Wild" tone="coral" />
            </View>
          </View>
        </View>

        <Text style={styles.cardSub}>Invite a friend or two</Text>
        <View style={styles.avatars}>
          {MEMBERS.slice(0, 4).map((m) => (
            <Avatar key={m.id} m={m} size={34} />
          ))}
          <View style={styles.plus}>
            <Text style={styles.plusText}>+</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <RMButton title="Link" variant="dark" onPress={() => navigation.navigate(routes.Telegram)} style={{ flex: 1, height: 46 }} />
          <RMButton title="QR code" variant="ghost" onPress={() => navigation.navigate(routes.Invite)} style={{ flex: 1, height: 46 }} />
        </View>
      </View>

      <View style={styles.footer}>
        <RMButton title="Continue · Reveal my reader aura" onPress={() => navigation.navigate(routes.OnbReveal)} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 120,
  },
  hero: {
    paddingHorizontal: 22,
    paddingTop: 6,
    paddingBottom: 12,
  },
  h2: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.4,
  },
  italic: {
    fontStyle: 'italic',
    fontWeight: '700',
  },
  p: {
    marginTop: 8,
    fontSize: 13,
    color: 'rgba(22,16,46,0.65)',
    fontWeight: '600',
    lineHeight: 18,
  },
  card: {
    marginTop: 10,
    marginHorizontal: 22,
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.white,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  pills: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cardSub: {
    marginTop: 16,
    fontWeight: '900',
    color: colors.ink,
  },
  avatars: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  plus: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.08)',
  },
  plusText: {
    fontWeight: '900',
    color: colors.ink,
    fontSize: 18,
  },
  actions: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 10,
  },
  footer: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 26,
  },
});

