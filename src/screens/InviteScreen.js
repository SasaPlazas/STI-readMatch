import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from '../components/Avatar';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { MEMBERS } from '../data/sample';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

const CANDIDATES = [
  { id: 'c1', name: 'Adaeze O.', handle: '@adze', hue: colors.coral, initial: 'A', tag: 'Mutual: Theo' },
  { id: 'c2', name: 'Sam Wren', handle: '@samwren', hue: colors.lime, initial: 'S', tag: 'Reads ✦ Mystery' },
  { id: 'c3', name: 'Petra K.', handle: '@petra.k', hue: colors.purple, initial: 'P', tag: '94% compatible' },
  { id: 'c4', name: 'Diego Vela', handle: '@diegove', hue: colors.lavender, initial: 'D', tag: 'Telegram only' },
  { id: 'c5', name: 'Noor Rahim', handle: '@noor', hue: colors.cream, initial: 'N', tag: 'New reader' },
];

export function InviteScreen({ navigation }) {
  const [tab, setTab] = useState('link');

  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>
      <TopBar subtitle="Step 2 of 3" title={null} onBack={() => navigation.goBack()} />

      <Text style={styles.h1}>
        Add the{'\n'}
        <Text style={styles.italic}>circle</Text>
      </Text>
      <Text style={styles.sub}>Drop a link, search a handle, or pick from your reading orbit. Telegram side syncs instantly.</Text>

      <View style={styles.tabs}>
        {[
          { id: 'link', label: '★ Invite link' },
          { id: 'tg', label: '✈ Telegram' },
          { id: 'search', label: '◐ Search' },
        ].map((t) => {
          const on = tab === t.id;
          return (
            <Pressable key={t.id} onPress={() => setTab(t.id)} style={[styles.tab, on ? styles.tabOn : null]}>
              <Text style={[styles.tabText, on ? styles.tabTextOn : null]}>{t.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <LinearGradient colors={[colors.ink, colors.violet]} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={styles.linkCard}>
        <Text style={styles.linkKicker}>Shareable link</Text>
        <View style={styles.linkRow}>
          <Text style={styles.link} numberOfLines={1}>
            readmatch.io/g/slow-burners
          </Text>
          <Pressable style={styles.copy} onPress={() => null}>
            <Text style={styles.copyText}>Copy</Text>
          </Pressable>
        </View>
        <View style={styles.shareRow}>
          {['Telegram', 'QR code', 'SMS'].map((s) => (
            <Pressable key={s} style={styles.shareBtn} onPress={() => (s === 'Telegram' ? navigation.navigate(routes.Telegram) : null)}>
              <Text style={styles.shareText}>{s}</Text>
            </Pressable>
          ))}
        </View>
      </LinearGradient>

      <View style={styles.search}>
        <View style={styles.searchIcon}>
          <Text style={styles.searchIconText}>◔</Text>
        </View>
        <Text style={styles.searchPh}>Search name, email, @handle…</Text>
        <Text style={styles.searchKey}>⌘ K</Text>
      </View>

      <View style={styles.headRow}>
        <Text style={styles.head}>Suggested</Text>
        <Text style={styles.headMeta}>AI‑picked</Text>
      </View>

      <View style={styles.list}>
        {CANDIDATES.map((c, i) => (
          <View key={c.id} style={styles.row}>
            <Avatar m={c} size={42} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={styles.name} numberOfLines={1}>
                {c.name}
              </Text>
              <Text style={styles.tag} numberOfLines={1}>
                {c.handle} · {c.tag}
              </Text>
            </View>
            <Pressable style={[styles.add, i % 2 ? styles.addOn : styles.addSent]} onPress={() => null}>
              <Text style={[styles.addText, i % 2 ? styles.addTextOn : styles.addTextSent]}>{i % 2 ? '+ Add' : 'Sent ✓'}</Text>
            </Pressable>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.invitedRow}>
          <View style={{ flexDirection: 'row' }}>
            {MEMBERS.slice(0, 3).map((m, i) => (
              <View key={m.id} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                <Avatar m={m} size={26} />
              </View>
            ))}
          </View>
          <Text style={styles.invitedText}>
            <Text style={{ fontWeight: '900', color: colors.ink }}>3 invited</Text> · 2 joined
          </Text>
        </View>
        <Pressable onPress={() => navigation.navigate(routes.GroupSettings)} style={styles.next}>
          <Text style={styles.nextText}>Continue</Text>
          <View style={styles.nextIcon}>
            <Text style={styles.nextIconText}>→</Text>
          </View>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 140,
    paddingTop: 10,
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
    color: colors.coral,
  },
  sub: {
    marginTop: 10,
    marginHorizontal: 22,
    fontSize: 14,
    color: 'rgba(22,16,46,0.6)',
    lineHeight: 19,
    fontWeight: '600',
  },
  tabs: {
    marginTop: 18,
    marginHorizontal: 22,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 4,
    flexDirection: 'row',
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  tab: {
    flex: 1,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabOn: {
    backgroundColor: colors.ink,
  },
  tabText: {
    color: colors.inkSoft,
    fontWeight: '800',
  },
  tabTextOn: {
    color: colors.cream,
  },
  linkCard: {
    marginTop: 14,
    marginHorizontal: 22,
    borderRadius: radii.xl,
    padding: 16,
    overflow: 'hidden',
  },
  linkKicker: {
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: 'rgba(212,255,61,0.85)',
    fontWeight: '900',
  },
  linkRow: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  link: {
    flex: 1,
    color: colors.cream,
    fontWeight: '800',
  },
  copy: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: colors.lime,
  },
  copyText: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 12,
  },
  shareRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 8,
  },
  shareBtn: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareText: {
    color: colors.cream,
    fontWeight: '800',
  },
  search: {
    marginTop: 14,
    marginHorizontal: 22,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchIcon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: colors.mist,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIconText: {
    color: colors.purple,
    fontWeight: '900',
  },
  searchPh: {
    flex: 1,
    color: 'rgba(22,16,46,0.5)',
    fontWeight: '700',
  },
  searchKey: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: 'rgba(22,16,46,0.4)',
    fontWeight: '900',
  },
  headRow: {
    marginTop: 18,
    marginHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  head: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  headMeta: {
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: 'rgba(22,16,46,0.45)',
    fontWeight: '900',
  },
  list: {
    marginTop: 10,
    marginHorizontal: 22,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.05)',
  },
  name: {
    fontWeight: '900',
    color: colors.ink,
  },
  tag: {
    marginTop: 2,
    fontSize: 10.5,
    color: 'rgba(22,16,46,0.55)',
    letterSpacing: 0.4,
    fontWeight: '700',
  },
  add: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  addOn: {
    backgroundColor: colors.lime,
  },
  addSent: {
    backgroundColor: colors.ink,
  },
  addText: {
    fontWeight: '900',
    fontSize: 12,
  },
  addTextOn: {
    color: colors.ink,
  },
  addTextSent: {
    color: colors.cream,
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
  invitedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 4,
    paddingBottom: 10,
  },
  invitedText: {
    fontSize: 12,
    color: 'rgba(22,16,46,0.6)',
    fontWeight: '700',
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

