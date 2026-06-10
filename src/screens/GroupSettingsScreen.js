import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function GroupSettingsScreen({ navigation, route }) {
  const { user } = useAuth();
  const { groupId } = route.params ?? {};
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!groupId) return;
    try {
      const [{ data: g }, { data: memberRows }] = await Promise.all([
        supabase
          .from('recommendation_groups')
          .select('id, group_name, join_code, created_by')
          .eq('id', groupId)
          .maybeSingle(),
        supabase
          .from('group_members')
          .select('user_id, role, user_preferences(archetype, username)')
          .eq('group_id', groupId),
      ]);
      setGroup(g ?? null);
      setMembers(memberRows ?? []);
    } catch (e) {
      console.warn('GroupSettings load error:', e?.message);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useFocusEffect(useCallback(() => { loadData(); }, [loadData]));

  const isAdmin = user?.id === group?.created_by;

  const onLeaveGroup = () => {
    Alert.alert(
      'Abandonar círculo',
      '¿Seguro que quieres abandonar este círculo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Abandonar',
          style: 'destructive',
          onPress: async () => {
            try {
              await supabase
                .from('group_members')
                .delete()
                .eq('group_id', groupId)
                .eq('user_id', user.id);
              navigation.navigate(routes.Home);
            } catch (e) {
              Alert.alert('Error', e?.message || 'No se pudo abandonar el círculo');
            }
          },
        },
      ],
    );
  };

  const onDeleteGroup = () => {
    Alert.alert(
      'Eliminar círculo',
      'Esta acción es permanente. ¿Eliminar el círculo y todas sus recomendaciones?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await supabase.from('group_recommendations').delete().eq('group_id', groupId);
              await supabase.from('group_members').delete().eq('group_id', groupId);
              await supabase.from('recommendation_groups').update({ is_active: false }).eq('id', groupId);
              navigation.navigate(routes.Home);
            } catch (e) {
              Alert.alert('Error', e?.message || 'No se pudo eliminar el círculo');
            }
          },
        },
      ],
    );
  };

  const memberLabel = (m) => {
    const prefs = m.user_preferences ?? {};
    return prefs.username || prefs.archetype || m.user_id?.slice(0, 8) || '?';
  };

  return (
    <Screen backgroundColor={colors.cream}>
      <TopBar
        subtitle="Group settings"
        title={null}
        onBack={() => navigation.goBack()}
      />

      {loading ? (
        <ActivityIndicator color={colors.purple} style={{ marginTop: 40 }} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

          {group?.join_code && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Join code</Text>
              <View style={styles.codeBox}>
                <Text style={styles.codeText}>{group.join_code}</Text>
              </View>
            </View>
          )}

          <View style={styles.section}>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Members · {members.length}</Text>
              <Pressable
                onPress={() => navigation.navigate(routes.Invite, { groupId })}
                style={styles.inviteBtn}
              >
                <Text style={styles.inviteText}>+ Invite</Text>
              </Pressable>
            </View>
            <View style={styles.memberList}>
              {members.map((m) => (
                <View key={m.user_id} style={styles.memberRow}>
                  <View style={[styles.memberAvatar, m.role === 'admin' && styles.memberAvatarAdmin]}>
                    <Text style={styles.memberAvatarText}>
                      {memberLabel(m)[0]?.toUpperCase() ?? '?'}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.memberName} numberOfLines={1}>{memberLabel(m)}</Text>
                    <Text style={styles.memberRole}>{m.role}</Text>
                  </View>
                  {m.role === 'admin' && (
                    <View style={styles.adminBadge}>
                      <Text style={styles.adminText}>Admin</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          <View style={styles.dangerSection}>
            {isAdmin ? (
              <Pressable onPress={onDeleteGroup} style={styles.dangerBtn}>
                <Text style={styles.dangerText}>Eliminar círculo</Text>
              </Pressable>
            ) : (
              <Pressable onPress={onLeaveGroup} style={styles.dangerBtn}>
                <Text style={styles.dangerText}>Abandonar círculo</Text>
              </Pressable>
            )}
          </View>

        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 40,
  },
  section: {
    marginHorizontal: 22,
    marginTop: 24,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.5)',
  },
  codeBox: {
    backgroundColor: colors.lime,
    borderRadius: radii.lg,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.ink,
  },
  codeText: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: 5,
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
    gap: 8,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.lavender,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  memberAvatarAdmin: {
    backgroundColor: colors.purple,
  },
  memberAvatarText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.ink,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.ink,
  },
  memberRole: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(22,16,46,0.45)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  adminBadge: {
    borderRadius: radii.pill,
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: colors.lime,
  },
  adminText: {
    fontSize: 9,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: 0.5,
  },
  dangerSection: {
    marginHorizontal: 22,
    marginTop: 32,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(22,16,46,0.08)',
  },
  dangerBtn: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,126,107,0.35)',
    alignItems: 'center',
  },
  dangerText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.coral,
    letterSpacing: 0.1,
  },
});
