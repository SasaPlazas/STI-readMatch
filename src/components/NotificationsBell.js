import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function NotificationsBell({ navigation, userId, light = false }) {
  const [unread, setUnread] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useFocusEffect(useCallback(() => {
    if (!userId || disabled) return;
    supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false)
      .then(({ count, error }) => {
        if (error) {
          setDisabled(true);
          setUnread(0);
          return;
        }
        setUnread(count ?? 0);
      });
  }, [userId, disabled]));

  return (
    <Pressable
      onPress={() => {
        if (disabled) return;
        navigation.navigate(routes.Notifications);
      }}
      style={[styles.btn, light && styles.btnLight]}
      hitSlop={8}
    >
      <Text style={styles.icon}>🔔</Text>
      {unread > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{unread > 9 ? '9+' : String(unread)}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLight: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
  },
  icon: { fontSize: 18 },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#fff',
  },
});
