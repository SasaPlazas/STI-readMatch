import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radii } from "../theme/tokens";
import { routes } from "../navigation/routes";

export function NotificationsBell({ navigation, userId, light = false }) {
  return (
    <Pressable
      onPress={() => navigation.navigate(routes.Notifications)}
      style={[styles.btn, light && styles.btnLight]}
      hitSlop={8}
    >
      <Text style={styles.icon}>🔔</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  btnLight: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 12,
  },
  icon: { fontSize: 18 },
});
