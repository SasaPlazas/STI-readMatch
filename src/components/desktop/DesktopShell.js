import { ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '../../theme/tokens';
import { DesktopSidebar } from './DesktopSidebar';
import { DesktopTopBar } from './DesktopTopBar';

export function DesktopShell({ navigation, activeRoute, title, subtitle, rightTop, children, scroll = true }) {
  return (
    <View style={styles.root}>
      <DesktopSidebar navigation={navigation} activeRoute={activeRoute} />
      <View style={styles.main}>
        <DesktopTopBar title={title} subtitle={subtitle} right={rightTop} />
        {scroll ? (
          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        ) : (
          <View style={styles.fill}>{children}</View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.cream,
  },
  main: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 22,
    paddingBottom: 36,
  },
  fill: {
    flex: 1,
    padding: 22,
  },
});

