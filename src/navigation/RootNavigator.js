import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from './routes';
import { AllScreensScreen } from '../screens/AllScreensScreen';
import { BookScreen } from '../screens/BookScreen';
import { CompatibilityScreen } from '../screens/CompatibilityScreen';
import { CreateGroupScreen } from '../screens/CreateGroupScreen';
import { ExplainScreen } from '../screens/ExplainScreen';
import { GroupSettingsScreen } from '../screens/GroupSettingsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { InviteScreen } from '../screens/InviteScreen';
import { OnbBehaviorScreen } from '../screens/OnbBehaviorScreen';
import { OnbCollabScreen } from '../screens/OnbCollabScreen';
import { OnbIdentityScreen } from '../screens/OnbIdentityScreen';
import { OnbPersonalityScreen } from '../screens/OnbPersonalityScreen';
import { OnbRevealScreen } from '../screens/OnbRevealScreen';
import { PersonalityScreen } from '../screens/PersonalityScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { SyncScreen } from '../screens/SyncScreen';
import { TelegramScreen } from '../screens/TelegramScreen';
import { VoteScreen } from '../screens/VoteScreen';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName={routes.Splash} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.Splash} component={SplashScreen} />
      <Stack.Screen name={routes.OnbIdentity} component={OnbIdentityScreen} />
      <Stack.Screen name={routes.OnbBehavior} component={OnbBehaviorScreen} />
      <Stack.Screen name={routes.OnbPersonality} component={OnbPersonalityScreen} />
      <Stack.Screen name={routes.OnbCollab} component={OnbCollabScreen} />
      <Stack.Screen name={routes.OnbReveal} component={OnbRevealScreen} />
      <Stack.Screen name={routes.Home} component={HomeScreen} />
      <Stack.Screen name={routes.Book} component={BookScreen} />
      <Stack.Screen name={routes.Compatibility} component={CompatibilityScreen} />
      <Stack.Screen name={routes.Vote} component={VoteScreen} />
      <Stack.Screen name={routes.Explain} component={ExplainScreen} />
      <Stack.Screen name={routes.Personality} component={PersonalityScreen} />
      <Stack.Screen name={routes.Telegram} component={TelegramScreen} />
      <Stack.Screen name={routes.CreateGroup} component={CreateGroupScreen} />
      <Stack.Screen name={routes.Invite} component={InviteScreen} />
      <Stack.Screen name={routes.GroupSettings} component={GroupSettingsScreen} />
      <Stack.Screen name={routes.Sync} component={SyncScreen} />
      <Stack.Screen name={routes.AllScreens} component={AllScreensScreen} />
    </Stack.Navigator>
  );
}

