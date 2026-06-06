import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { routes } from './routes';
import { DesktopGroupScreen } from '../screens/desktop/DesktopGroupScreen';
import { DesktopHomeScreen } from '../screens/desktop/DesktopHomeScreen';
import { DesktopLandingScreen } from '../screens/desktop/DesktopLandingScreen';
import { DesktopNotificationsScreen } from '../screens/desktop/DesktopNotificationsScreen';
import { DesktopPersonalityScreen } from '../screens/desktop/DesktopPersonalityScreen';
import { BookScreen } from '../screens/BookScreen';
import { CreateAccountScreen } from '../screens/CreateAccountScreen';
import { CreateGroupScreen } from '../screens/CreateGroupScreen';
import { ExplainScreen } from '../screens/ExplainScreen';
import { InviteScreen } from '../screens/InviteScreen';
import { JoinGroupScreen } from '../screens/JoinGroupScreen';
import { OnbBehaviorScreen } from '../screens/OnbBehaviorScreen';
import { OnbCollabScreen } from '../screens/OnbCollabScreen';
import { OnbIdentityScreen } from '../screens/OnbIdentityScreen';
import { OnbPersonalityScreen } from '../screens/OnbPersonalityScreen';
import { OnbRevealScreen } from '../screens/OnbRevealScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SyncScreen } from '../screens/SyncScreen';
import { TelegramScreen } from '../screens/TelegramScreen';

const Stack = createNativeStackNavigator();
const NO_HEADER = { headerShown: false };

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={NO_HEADER}>
      <Stack.Screen name={routes.Splash} component={DesktopLandingScreen} />
      <Stack.Screen name={routes.SignIn} component={SignInScreen} />
      <Stack.Screen name={routes.CreateAccount} component={CreateAccountScreen} />
      <Stack.Screen name={routes.OnbIdentity} component={OnbIdentityScreen} />
      <Stack.Screen name={routes.OnbBehavior} component={OnbBehaviorScreen} />
      <Stack.Screen name={routes.OnbPersonality} component={OnbPersonalityScreen} />
      <Stack.Screen name={routes.OnbCollab} component={OnbCollabScreen} />
      <Stack.Screen name={routes.OnbReveal} component={OnbRevealScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={NO_HEADER} initialRouteName={routes.Home}>
      <Stack.Screen name={routes.Home} component={DesktopHomeScreen} />
      <Stack.Screen name={routes.Notifications} component={DesktopNotificationsScreen} />
      <Stack.Screen name={routes.GroupSettings} component={DesktopGroupScreen} />
      <Stack.Screen name={routes.Personality} component={DesktopPersonalityScreen} />
      <Stack.Screen name={routes.Book} component={BookScreen} />
      <Stack.Screen name={routes.Explain} component={ExplainScreen} />
      <Stack.Screen name={routes.Telegram} component={TelegramScreen} />
      <Stack.Screen name={routes.CreateGroup} component={CreateGroupScreen} />
      <Stack.Screen name={routes.JoinGroup} component={JoinGroupScreen} />
      <Stack.Screen name={routes.Invite} component={InviteScreen} />
      <Stack.Screen name={routes.Sync} component={SyncScreen} />
    </Stack.Navigator>
  );
}

export function WebDesktopNavigator() {
  const { user } = useAuth();
  return user?.completedOnboarding ? <AppStack /> : <AuthStack />;
}
