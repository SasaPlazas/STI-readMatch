import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { routes } from './routes';

// Auth screens
import { SplashScreen } from '../screens/SplashScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { CreateAccountScreen } from '../screens/CreateAccountScreen';
import { OnbIdentityScreen } from '../screens/OnbIdentityScreen';
import { OnbBehaviorScreen } from '../screens/OnbBehaviorScreen';
import { OnbPersonalityScreen } from '../screens/OnbPersonalityScreen';
import { OnbCollabScreen } from '../screens/OnbCollabScreen';
import { OnbRevealScreen } from '../screens/OnbRevealScreen';

// App screens
import { AllScreensScreen } from '../screens/AllScreensScreen';
import { BookScreen } from '../screens/BookScreen';
import { CompatibilityScreen } from '../screens/CompatibilityScreen';
import { CreateGroupScreen } from '../screens/CreateGroupScreen';
import { ExplainScreen } from '../screens/ExplainScreen';
import { GroupSettingsScreen } from '../screens/GroupSettingsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { InviteScreen } from '../screens/InviteScreen';
import { GroupDetailScreen } from '../screens/GroupDetailScreen';
import { GroupPreviewScreen } from '../screens/GroupPreviewScreen';
import { JoinGroupScreen } from '../screens/JoinGroupScreen';
import { PersonalityScreen } from '../screens/PersonalityScreen';
import { SyncScreen } from '../screens/SyncScreen';
import { TelegramScreen } from '../screens/TelegramScreen';

const Stack = createNativeStackNavigator();
const NO_HEADER = { headerShown: false };

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={NO_HEADER}>
      <Stack.Screen name={routes.Splash}         component={SplashScreen} />
      <Stack.Screen name={routes.SignIn}          component={SignInScreen} />
      <Stack.Screen name={routes.CreateAccount}  component={CreateAccountScreen} />
      <Stack.Screen name={routes.OnbIdentity}    component={OnbIdentityScreen} />
      <Stack.Screen name={routes.OnbBehavior}    component={OnbBehaviorScreen} />
      <Stack.Screen name={routes.OnbPersonality} component={OnbPersonalityScreen} />
      <Stack.Screen name={routes.OnbCollab}      component={OnbCollabScreen} />
      <Stack.Screen name={routes.OnbReveal}      component={OnbRevealScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={NO_HEADER} initialRouteName={routes.Home}>
      <Stack.Screen name={routes.Home}           component={HomeScreen} />
      <Stack.Screen name={routes.Book}           component={BookScreen} />
      <Stack.Screen name={routes.Compatibility}  component={CompatibilityScreen} />
      <Stack.Screen name={routes.Explain}        component={ExplainScreen} />
      <Stack.Screen name={routes.Personality}    component={PersonalityScreen} />
      <Stack.Screen name={routes.Telegram}       component={TelegramScreen} />
      <Stack.Screen name={routes.CreateGroup}    component={CreateGroupScreen} />
      <Stack.Screen name={routes.JoinGroup}       component={JoinGroupScreen} />
      <Stack.Screen name={routes.GroupDetail}      component={GroupDetailScreen} />
      <Stack.Screen name={routes.GroupPreview}    component={GroupPreviewScreen} />
      <Stack.Screen name={routes.Invite}         component={InviteScreen} />
      <Stack.Screen name={routes.GroupSettings}  component={GroupSettingsScreen} />
      <Stack.Screen name={routes.Sync}           component={SyncScreen} />
      <Stack.Screen name={routes.AllScreens}     component={AllScreensScreen} />
    </Stack.Navigator>
  );
}

export function RootNavigator() {
  const { user } = useAuth();
  // Si hay usuario autenticado Y completó onboarding → app
  // En cualquier otro caso → auth flow
  return user?.completedOnboarding ? <AppStack /> : <AuthStack />;
}
