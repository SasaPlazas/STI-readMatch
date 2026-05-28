import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { colors, radii } from '../theme/tokens';
import { routeOrder, routes } from '../navigation/routes';

export function AllScreensScreen({ navigation }) {
  return (
    <Screen backgroundColor={colors.cream} contentStyle={styles.content}>
      <TopBar title="Pantallas" subtitle="ReadMatch" onBack={() => navigation.goBack()} />
      <View style={styles.list}>
        {routeOrder.map((r) => (
          <Pressable key={r} onPress={() => navigation.navigate(r)} style={styles.row}>
            <Text style={styles.rowText}>{r}</Text>
            <Text style={styles.chev}>›</Text>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={() => navigation.navigate(routes.Splash)} style={styles.toSplash}>
        <Text style={styles.toSplashText}>Volver a Splash</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 36,
  },
  list: {
    paddingHorizontal: 22,
    gap: 10,
  },
  row: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowText: {
    color: colors.ink,
    fontWeight: '800',
  },
  chev: {
    color: 'rgba(22,16,46,0.45)',
    fontSize: 18,
    fontWeight: '900',
  },
  toSplash: {
    marginTop: 18,
    marginHorizontal: 22,
    borderRadius: radii.pill,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: colors.ink,
  },
  toSplashText: {
    color: colors.cream,
    fontWeight: '900',
  },
});

