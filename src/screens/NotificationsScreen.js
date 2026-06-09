import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { colors, radii } from '../theme/tokens';

const TYPE_META = {
  recommendation_updated: { icon: '✦', color: colors.lime, label: 'Recommendation' },
  member_joined:          { icon: '◎', color: colors.purple, label: 'New member' },
  member_left:            { icon: '◉', color: colors.coral, label: 'Member left' },
  group_created:          { icon: '★', color: colors.lavender, label: 'New circle' },
};

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function NotifItem({ notif }) {
  const meta = TYPE_META[notif.type] ?? { icon: '◦', color: colors.mist, label: notif.type ?? '' };
  return (
    <View style={[styles.item, !notif.is_read && styles.itemUnread]}>
      <View style={[styles.iconWrap, { backgroundColor: meta.color + '28' }]}>
        <Text style={[styles.iconText, { color: meta.color === colors.lime ? colors.ink : meta.color }]}>
          {meta.icon}
        </Text>
      </View>
      <View style={styles.itemBody}>
        <Text style={styles.itemMsg}>{notif.message}</Text>
        <View style={styles.itemMeta}>
          <View style={[styles.typePill, { backgroundColor: meta.color + '22' }]}>
            <Text style={[styles.typeText, { color: meta.color === colors.lime ? '#3F6E12' : meta.color }]}>
              {meta.label}
            </Text>
          </View>
          <Text style={styles.timeText}>{timeAgo(notif.created_at)}</Text>
        </View>
      </View>
      {!notif.is_read && <View style={styles.unreadDot} />}
    </View>
  );
}

export function NotificationsScreen({ navigation }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!user?.id || disabled) return;

    async function load() {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) {
        setDisabled(true);
        setNotifications([]);
        setLoading(false);
        return;
      }
      setNotifications(data ?? []);
      setLoading(false);

      // Mark all as read
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false);
    }

    load();
  }, [user?.id, disabled]);

  return (
    <Screen backgroundColor={colors.cream}>
      <TopBar
        title="Notifications"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {loading ? null : notifications.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>✦</Text>
            <Text style={styles.emptyTitle}>All caught up</Text>
            <Text style={styles.emptySub}>No notifications yet</Text>
          </View>
        ) : (
          notifications.map((n) => <NotifItem key={n.id} notif={n} />)
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 40,
    gap: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  itemUnread: {
    borderColor: colors.purple + '30',
    backgroundColor: colors.lavender + '18',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconText: {
    fontSize: 18,
    fontWeight: '900',
  },
  itemBody: { flex: 1, gap: 6 },
  itemMsg: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.ink,
    lineHeight: 20,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typePill: {
    borderRadius: radii.pill,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(22,16,46,0.4)',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.purple,
    flexShrink: 0,
    marginTop: 4,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 64,
    gap: 8,
  },
  emptyIcon: { fontSize: 36, color: 'rgba(22,16,46,0.15)' },
  emptyTitle: { fontSize: 18, fontWeight: '900', color: 'rgba(22,16,46,0.35)', letterSpacing: -0.3 },
  emptySub: { fontSize: 13, fontWeight: '600', color: 'rgba(22,16,46,0.3)' },
});
