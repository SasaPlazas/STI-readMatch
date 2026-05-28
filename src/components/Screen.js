import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

export function Screen({ children, backgroundColor = '#FBF6EB', scroll = true, contentStyle, style }) {
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }, style]}>
      {scroll ? (
        <ScrollView contentContainerStyle={[styles.scroll, contentStyle]} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.fill, contentStyle]}>{children}</View>
      )}
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
    paddingBottom: 24,
  },
});

