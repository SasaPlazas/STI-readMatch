import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radii } from '../../theme/tokens';
import { Avatar } from '../Avatar';
import { MEMBERS } from '../../data/sample';

export function DesktopTopBar({ title, subtitle, right = null }) {
  return (
    <View style={styles.top}>
      <View style={{ flex: 1 }}>
        {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput placeholder="Search…" placeholderTextColor="rgba(251,246,235,0.45)" style={styles.search} />
        <View style={styles.kbd}>
          <Text style={styles.kbdText}>⌘ K</Text>
        </View>
      </View>

      <View style={styles.right}>
        {right}
        <Pressable style={styles.bell} onPress={() => null}>
          <Text style={styles.bellText}>🔔</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </Pressable>
        <Avatar m={MEMBERS[0]} size={34} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    height: 72,
    paddingHorizontal: 22,
    backgroundColor: colors.ink,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  sub: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(251,246,235,0.45)',
    fontWeight: '900',
  },
  title: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: '900',
    color: colors.cream,
    letterSpacing: -0.2,
  },
  searchWrap: {
    width: 360,
    height: 42,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 10,
    gap: 10,
  },
  searchIcon: {
    color: 'rgba(251,246,235,0.7)',
    fontWeight: '900',
  },
  search: {
    flex: 1,
    color: colors.cream,
    fontWeight: '700',
    outlineStyle: 'none',
  },
  kbd: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  kbdText: {
    color: 'rgba(251,246,235,0.7)',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bell: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellText: {
    color: colors.cream,
    fontSize: 14,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 10,
  },
});

