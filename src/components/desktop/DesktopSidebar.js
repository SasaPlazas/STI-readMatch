import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../../theme/tokens';
import { Avatar } from '../Avatar';
import { MEMBERS } from '../../data/sample';
import { routes } from '../../navigation/routes';

const NAV = [
  { r: routes.Home, label: 'Home' },
  { r: routes.Compatibility, label: 'Compatibility' },
  { r: routes.Notifications, label: 'Notifications' },
  { r: routes.GroupSettings, label: 'Group' },
  { r: routes.Personality, label: 'Personality' },
];

export function DesktopSidebar({ navigation, activeRoute }) {
  return (
    <View style={styles.side}>
      <View style={styles.brand}>
        <Text style={styles.brandText}>
          read<Text style={styles.brandAccent}>match</Text>
        </Text>
        <Text style={styles.brandSub}>desktop</Text>
      </View>

      <View style={styles.nav}>
        {NAV.map((n) => {
          const active = n.r === activeRoute;
          return (
            <Pressable key={n.r} onPress={() => navigation.navigate(n.r)} style={[styles.navItem, active ? styles.navItemActive : null]}>
              <Text style={[styles.navText, active ? styles.navTextActive : null]}>{n.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your circles</Text>
        <View style={styles.circles}>
          {MEMBERS.slice(0, 5).map((m) => (
            <View key={m.id} style={styles.circleRow}>
              <Avatar m={m} size={22} />
              <Text style={styles.circleText} numberOfLines={1}>
                {m.name}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.user}>
        <Avatar m={MEMBERS[0]} size={34} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={styles.userName} numberOfLines={1}>
            Maya
          </Text>
          <Text style={styles.userMeta} numberOfLines={1}>
            Curator · Slow Burners
          </Text>
        </View>
        <View style={styles.userBtn}>
          <Text style={styles.userBtnText}>⚙</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  side: {
    width: 264,
    backgroundColor: colors.ink,
    paddingTop: 22,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  brand: {
    paddingHorizontal: 4,
    paddingBottom: 14,
  },
  brandText: {
    color: colors.cream,
    fontWeight: '900',
    fontSize: 28,
    letterSpacing: -0.6,
  },
  brandAccent: {
    color: colors.lime,
  },
  brandSub: {
    marginTop: 4,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(251,246,235,0.45)',
    fontWeight: '800',
  },
  nav: {
    paddingTop: 12,
    gap: 6,
  },
  navItem: {
    height: 40,
    borderRadius: radii.md,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  navItemActive: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  navText: {
    color: 'rgba(251,246,235,0.72)',
    fontWeight: '800',
  },
  navTextActive: {
    color: colors.cream,
  },
  section: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  sectionTitle: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(251,246,235,0.45)',
    fontWeight: '900',
  },
  circles: {
    marginTop: 10,
    gap: 10,
  },
  circleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  circleText: {
    flex: 1,
    color: 'rgba(251,246,235,0.75)',
    fontWeight: '700',
  },
  user: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  userName: {
    color: colors.cream,
    fontWeight: '900',
  },
  userMeta: {
    marginTop: 2,
    color: 'rgba(251,246,235,0.5)',
    fontWeight: '700',
    fontSize: 11,
  },
  userBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userBtnText: {
    color: colors.cream,
    fontWeight: '900',
  },
});

