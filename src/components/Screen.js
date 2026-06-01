import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

export function Screen({ children, footer, backgroundColor = '#FBF6EB', scroll = true, contentStyle, style }) {
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }, style]}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={[styles.scroll, contentStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.fill, contentStyle]}>{children}</View>
      )}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  fill: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 16,
  },
  footer: {
    paddingHorizontal: 22,
    paddingBottom: 26,
    paddingTop: 10,
  },
});
