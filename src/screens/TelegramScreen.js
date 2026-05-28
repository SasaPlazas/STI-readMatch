import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { BookCover } from '../components/BookCover';
import { Pill } from '../components/Pill';
import { Ring } from '../components/Ring';
import { BOOKS, MEMBERS } from '../data/sample';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function TelegramScreen({ navigation }) {
  const reactions = ['✦', '♥', '◐', '↑', '?'];
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.hBtn}>
          <Text style={styles.hBtnText}>‹</Text>
        </Pressable>
        <View style={styles.botAvatar}>
          <Text style={styles.botAvatarText}>✦</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.hTitle}>ReadMatch Bot</Text>
          <Text style={styles.hSub}>● online · slow burners</Text>
        </View>
        <Pressable onPress={() => navigation.navigate(routes.AllScreens)} style={styles.hMenu}>
          <Text style={styles.hMenuText}>⋮</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} showsVerticalScrollIndicator={false}>
        <View style={styles.dateWrap}>
          <Text style={styles.date}>Today · 8:42</Text>
        </View>

        <View style={styles.incoming}>
          <View style={styles.bubbleCard}>
            <LinearGradient colors={[colors.violet, colors.purple]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cardHero}>
              <BookCover book={BOOKS[1]} w={60} h={84} tilt={-3} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={styles.cardKicker}>★ THIS WEEK</Text>
                <Text style={styles.cardTitle}>Soft Algorithms</Text>
                <Text style={styles.cardAuthor}>Yuki Tanabe</Text>
              </View>
              <Ring value={89} size={44} stroke={4} color={colors.lime} textColor={colors.cream} />
            </LinearGradient>
            <View style={styles.cardBody}>
              <Text style={styles.cardText}>
                Picked for your group because <Text style={styles.b}>Iris</Text>' dark-academia streak met <Text style={styles.b}>Theo</Text>'s essay habit. Diversity{' '}
                <Text style={{ color: colors.purple, fontWeight: '900' }}>+18%</Text>.
              </Text>
            </View>
            <View style={styles.cardBtns}>
              <Pressable style={styles.cardBtn} onPress={() => navigation.navigate(routes.Vote)}>
                <Text style={[styles.cardBtnText, { color: colors.purple }]}>✦ I'm in</Text>
              </Pressable>
              <View style={styles.sep} />
              <Pressable style={styles.cardBtn} onPress={() => navigation.navigate(routes.Explain)}>
                <Text style={[styles.cardBtnText, { color: colors.ink }]}>See why</Text>
              </Pressable>
            </View>
          </View>
          <Text style={styles.stamp}>BOT · 08:42</Text>
        </View>

        <View style={styles.incoming}>
          <View style={[styles.bubble, styles.bubbleDark]}>
            <Text style={styles.bubbleDarkText}>Quick poll — want this for Oct?</Text>
            <View style={styles.poll}>
              {[
                { l: '✦ Yes', c: colors.lime, cnt: 2 },
                { l: '◐ Maybe', c: colors.purple, cnt: 1 },
                { l: '✕ Pass', c: colors.coral, cnt: 0 },
              ].map((b) => (
                <Pressable key={b.l} style={[styles.pollBtn, { backgroundColor: b.c }]} onPress={() => null}>
                  <Text style={styles.pollText}>{b.l}</Text>
                  {b.cnt ? (
                    <View style={styles.pollCnt}>
                      <Text style={[styles.pollCntText, { color: b.c }]}>{b.cnt}</Text>
                    </View>
                  ) : null}
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.outgoing}>
          <View style={[styles.bubble, styles.bubbleOut]}>
            <Text style={styles.bubbleOutText}>Can you swap the second pick for something shorter?</Text>
            <Text style={styles.outStamp}>08:43 ✓✓</Text>
          </View>
        </View>

        <View style={styles.incoming}>
          <View style={styles.bubble}>
            <View style={styles.updateRow}>
              <View style={styles.updateIcon}>
                <Text style={styles.updateIconText}>↗</Text>
              </View>
              <Text style={styles.updateKicker}>COMPATIBILITY UPDATE</Text>
            </View>
            <Text style={styles.cardText}>
              Group score is up to <Text style={styles.b}>0.86</Text> after June joined. New alternates ready.
            </Text>
          </View>
        </View>

        <View style={styles.reactionLine}>
          {MEMBERS.slice(0, 4).map((m, i) => (
            <View key={m.id} style={styles.reactChip}>
              <Avatar m={m} size={14} />
              <Text style={styles.reactGlyph}>{reactions[i]}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.composer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestRow}>
          {['/match', '/vote', '/why', '/swap', '/stats'].map((s) => (
            <Pill key={s} label={s} tone="glass" style={styles.suggestPill} />
          ))}
        </ScrollView>
        <View style={styles.input}>
          <Text style={styles.placeholder}>Ask the bot…</Text>
          <Pressable style={styles.send} onPress={() => navigation.navigate(routes.Sync)}>
            <Text style={styles.sendText}>↑</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.lavender,
  },
  header: {
    height: 92,
    backgroundColor: colors.ink,
    paddingTop: 54,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  hBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hBtnText: {
    color: colors.cream,
    fontWeight: '900',
    fontSize: 18,
  },
  botAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botAvatarText: {
    color: colors.ink,
    fontWeight: '900',
  },
  hTitle: {
    color: colors.cream,
    fontWeight: '900',
  },
  hSub: {
    marginTop: 2,
    color: 'rgba(212,255,61,0.85)',
    fontSize: 10,
    letterSpacing: 0.8,
    fontWeight: '800',
  },
  hMenu: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hMenuText: {
    color: colors.cream,
    fontWeight: '900',
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingTop: 12,
    paddingHorizontal: 14,
    paddingBottom: 130,
  },
  dateWrap: {
    alignItems: 'center',
    marginBottom: 14,
  },
  date: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(22,16,46,0.12)',
    color: colors.ink,
    fontWeight: '700',
  },
  incoming: {
    alignItems: 'flex-start',
    marginBottom: 12,
    maxWidth: 320,
  },
  outgoing: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  bubble: {
    borderRadius: 18,
    backgroundColor: colors.white,
    padding: 14,
    shadowColor: colors.ink,
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  bubbleCard: {
    borderRadius: 18,
    backgroundColor: colors.white,
    overflow: 'hidden',
    shadowColor: colors.ink,
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  bubbleDark: {
    backgroundColor: colors.ink,
  },
  bubbleDarkText: {
    color: colors.cream,
    fontWeight: '700',
  },
  bubbleOut: {
    backgroundColor: colors.purple,
    borderBottomRightRadius: 4,
    maxWidth: 260,
  },
  bubbleOutText: {
    color: colors.cream,
    fontWeight: '700',
    lineHeight: 18,
  },
  outStamp: {
    marginTop: 6,
    fontSize: 9,
    letterSpacing: 0.8,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '800',
    textAlign: 'right',
  },
  cardHero: {
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  cardKicker: {
    fontSize: 9,
    color: colors.lime,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontWeight: '900',
  },
  cardTitle: {
    marginTop: 2,
    fontSize: 18,
    color: colors.cream,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  cardAuthor: {
    marginTop: 2,
    fontSize: 12,
    color: 'rgba(251,246,235,0.75)',
    fontStyle: 'italic',
    fontWeight: '600',
  },
  cardBody: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  cardText: {
    fontSize: 12.5,
    color: colors.inkSoft,
    lineHeight: 17,
    fontWeight: '600',
  },
  b: {
    fontWeight: '900',
    color: colors.ink,
  },
  cardBtns: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(22,16,46,0.08)',
  },
  cardBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cardBtnText: {
    fontWeight: '900',
  },
  sep: {
    width: 1,
    backgroundColor: 'rgba(22,16,46,0.08)',
  },
  stamp: {
    marginTop: 4,
    marginLeft: 4,
    fontSize: 9,
    letterSpacing: 1,
    color: 'rgba(22,16,46,0.45)',
    fontWeight: '800',
  },
  poll: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pollBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  pollText: {
    color: colors.ink,
    fontWeight: '900',
  },
  pollCnt: {
    backgroundColor: colors.ink,
    borderRadius: 999,
    paddingVertical: 1,
    paddingHorizontal: 6,
  },
  pollCntText: {
    fontSize: 10,
    fontWeight: '900',
  },
  updateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  updateIcon: {
    width: 22,
    height: 22,
    borderRadius: 7,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateIconText: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 12,
  },
  updateKicker: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.purple,
    fontWeight: '900',
  },
  reactionLine: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  reactChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(22,16,46,0.08)',
  },
  reactGlyph: {
    fontSize: 11,
  },
  composer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 22,
    backgroundColor: colors.ink,
  },
  suggestRow: {
    gap: 8,
    paddingRight: 8,
    marginBottom: 10,
  },
  suggestPill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  input: {
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 6,
    gap: 10,
  },
  placeholder: {
    flex: 1,
    fontSize: 13,
    color: 'rgba(251,246,235,0.5)',
    fontWeight: '700',
  },
  send: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: {
    color: colors.ink,
    fontWeight: '900',
  },
});

