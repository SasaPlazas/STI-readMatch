import { ScrollView, View } from 'react-native';

export function DesktopShell({ children, scroll = true }) {
  if (scroll) {
    return <ScrollView style={{ flex: 1 }}>{children}</ScrollView>;
  }
  return <View style={{ flex: 1 }}>{children}</View>;
}
