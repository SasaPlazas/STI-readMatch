import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { routes } from './src/navigation/routes';

const linking =
  Platform.OS === 'web'
    ? {
        prefixes: [typeof window !== 'undefined' ? window.location.origin : ''],
        config: {
          screens: {
            [routes.Splash]: '',
            [routes.SignIn]: 'signin',
            [routes.CreateAccount]: 'create-account',
            [routes.OnbIdentity]: 'onboarding/identity',
            [routes.OnbBehavior]: 'onboarding/behavior',
            [routes.OnbPersonality]: 'onboarding/personality',
            [routes.OnbCollab]: 'onboarding/collab',
            [routes.OnbReveal]: 'onboarding/reveal',
            [routes.Home]: 'home',
            [routes.Book]: 'book',
            [routes.Explain]: 'explain',
            [routes.Notifications]: 'notifications',
            [routes.Personality]: 'personality',
            [routes.Telegram]: 'telegram',
            [routes.CreateGroup]: 'groups/create',
            [routes.JoinGroup]: 'groups/join',
            [routes.GroupDetail]: 'groups/:groupId',
            [routes.GroupPreview]: 'groups/preview/:groupId',
            [routes.Invite]: 'invite',
            [routes.GroupSettings]: 'group-settings',
            [routes.Sync]: 'sync',
            [routes.AllScreens]: 'all',
          },
        },
        getInitialURL: async () => null,
      }
    : undefined;

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <NavigationContainer linking={linking}>
          <StatusBar style="auto" />
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
