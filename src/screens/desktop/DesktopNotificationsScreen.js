import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../../components/Avatar';
import { Pill } from '../../components/Pill';
import { DesktopShell } from '../../components/desktop/DesktopShell';
import { MEMBERS } from '../../data/sample';
import { routes } from '../../navigation/routes';
import { colors, radii } from '../../theme/tokens';

export function DesktopNotificationsScreen({ navigation }) {
  return (
    <DesktopShell navigation={navigation} activeRoute={routes.Notifications} title="Notifications" subtitle="Activity · Telegram · Recs" scroll={false}>
      <View style={styles.grid}>
        <View style={styles.feed}>
          <View style={styles.filters}>
            {['All', 'Unread', 'Telegram', 'Recs', 'Votes', 'Mentions'].map((t, i) => (
              <View key={t} style={[styles.filter, i === 1 ? styles.filterOn : null]}>
                <Text style={[styles.filterText, i === 1 ? styles.filterTextOn : null]}>{t}</Text>
              </View>
            ))}
          </View>

          <View style={styles.list}>
            {[
              { who: MEMBERS[2], k: 'VOTE', msg: 'Iris voted ★ for "Lemon, Lemon"', time: '12m', unread: true },
              { who: MEMBERS[1], k: 'TELEGRAM', msg: 'Theo asked to swap the second pick for a shorter read', time: '1h', unread: true },
              { who: MEMBERS[3], k: 'HIGHLIGHT', msg: 'Ravi highlighted p. 84 “small kindnesses”', time: '3h', unread: false },
              { who: MEMBERS[0], k: 'RECOMMENDATION', msg: 'New weekly match posted to the channel', time: 'Yesterday', unread: false },
            ].map((n, i) => (
              <Pressable key={i} onPress={() => navigation.navigate(routes.Home)} style={[styles.row, n.unread ? styles.rowUnread : null]}>
                <View style={[styles.icon, { backgroundColor: n.k === 'VOTE' ? colors.lime : n.k === 'TELEGRAM' ? colors.purple : colors.coral }]}>
                  <Text style={styles.iconText}>{n.k === 'VOTE' ? '★' : n.k === 'TELEGRAM' ? '↗' : '✎'}</Text>
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <View style={styles.rowTop}>
                    <Pill label={n.k} tone="glass" style={styles.pill} />
                    <Text style={styles.time}>{n.time}</Text>
                  </View>
                  <Text style={styles.msg} numberOfLines={2}>
                    {n.msg}
                  </Text>
                </View>
                <Avatar m={n.who} size={30} />
                <View style={styles.openBtn}>
                  <Text style={styles.openBtnText}>Open</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.side}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quiet hours</Text>
            <Text style={styles.cardSub}>Mute between 10pm and 8am</Text>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Enabled</Text>
              <View style={styles.switchOn}>
                <View style={styles.knobOn} />
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>This week summary</Text>
            <View style={styles.summaryGrid}>
              <SummaryTile k="Votes" v="14" />
              <SummaryTile k="Recs" v="3" />
              <SummaryTile k="New" v="2" />
              <SummaryTile k="Mentions" v="5" />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>What pings you</Text>
            {[
              { l: 'Telegram mentions', on: true },
              { l: 'New recommendations', on: true },
              { l: 'Vote closes', on: false },
              { l: 'Highlights', on: false },
            ].map((t) => (
              <View key={t.l} style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>{t.l}</Text>
                <View style={t.on ? styles.switchOn : styles.switchOff}>
                  <View style={t.on ? styles.knobOn : styles.knobOff} />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </DesktopShell>
  );
}

function SummaryTile({ k, v }) {
  return (
    <View style={styles.sumTile}>
      <Text style={styles.sumK}>{k}</Text>
      <Text style={styles.sumV}>{v}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    padding: 22,
  },
  feed: {
    flex: 1,
    minWidth: 0,
    gap: 12,
  },
  side: {
    width: 360,
    gap: 12,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filter: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.08)',
  },
  filterOn: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  filterText: {
    fontWeight: '900',
    color: colors.ink,
    fontSize: 12,
  },
  filterTextOn: {
    color: colors.cream,
  },
  list: {
    gap: 10,
  },
  row: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowUnread: {
    borderLeftWidth: 6,
    borderLeftColor: colors.lime,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontWeight: '900',
    color: colors.ink,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pill: {
    backgroundColor: colors.mist,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  time: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.45)',
    fontWeight: '900',
  },
  msg: {
    marginTop: 8,
    color: colors.ink,
    fontWeight: '700',
    lineHeight: 18,
  },
  openBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: colors.lime,
  },
  openBtnText: {
    fontWeight: '900',
    color: colors.ink,
    fontSize: 12,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  cardTitle: {
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.2,
  },
  cardSub: {
    marginTop: 8,
    color: 'rgba(22,16,46,0.6)',
    fontWeight: '600',
  },
  switchRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontWeight: '800',
    color: colors.ink,
  },
  switchOn: {
    width: 46,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.ink,
    position: 'relative',
  },
  switchOff: {
    width: 46,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(22,16,46,0.15)',
    position: 'relative',
  },
  knobOn: {
    position: 'absolute',
    top: 3,
    left: 23,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.lime,
  },
  knobOff: {
    position: 'absolute',
    top: 3,
    left: 3,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  summaryGrid: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sumTile: {
    width: '48%',
    borderRadius: radii.md,
    padding: 12,
    backgroundColor: colors.mist,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.05)',
  },
  sumK: {
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.55)',
    fontWeight: '900',
  },
  sumV: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.6,
  },
  toggleRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabel: {
    color: colors.ink,
    fontWeight: '800',
  },
});

