import { Platform, useWindowDimensions } from 'react-native';
import { RootNavigator } from './RootNavigator';
import { WebDesktopNavigator } from './WebDesktopNavigator';

export function AppNavigator() {
  const { width } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && width >= 1024;
  return isDesktopWeb ? <WebDesktopNavigator /> : <RootNavigator />;
}

