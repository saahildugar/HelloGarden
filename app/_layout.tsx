import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import { Theme } from '@/constants/Colors';
import { useAuthStore } from '@/stores/authStore';

SplashScreen.preventAutoHideAsync();

/**
 * NavigationGuard sits inside the Router tree and redirects users
 * based on onboarding status and auth session.
 *
 * Rules:
 *  1. No onboarding complete → /onboarding/welcome
 *  2. Has session + onboarding complete → /(tabs)
 *  3. Onboarding complete but no session + not in auth/tabs → /(tabs) (app works without account)
 */
function NavigationGuard() {
  const { session, isLoading, isOnboardingComplete } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inTabs = segments[0] === '(tabs)';
    const inOnboarding = segments[0] === 'onboarding';
    const inAuth = segments[0] === '(auth)';

    if (!isOnboardingComplete && !inOnboarding && !inAuth) {
      // First-time user not in onboarding or auth → send to onboarding
      // (allow auth screens so "Sign in" link on Welcome works)
      router.replace('/onboarding/welcome');
      return;
    }

    if (session && !isOnboardingComplete && !inOnboarding) {
      // User signed in (via email or OAuth) but hasn't finished onboarding → send to setup
      // (don't redirect if already in onboarding — let them progress through screens)
      router.replace('/onboarding/setup');
      return;
    }

    if (session && isOnboardingComplete && !inTabs) {
      // Authenticated user with completed onboarding → main app
      router.replace('/(tabs)');
      return;
    }

    if (isOnboardingComplete && !session && !inAuth && !inTabs) {
      // Onboarding done, no session, not in auth or tabs → go to tabs
      // (app is fully usable without an account)
      router.replace('/(tabs)');
    }
  }, [session, isLoading, isOnboardingComplete, segments]);

  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Theme.dark : Theme.light;
  const { initialize, isLoading: authLoading } = useAuthStore();

  const [fontsLoaded, fontError] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
  });

  // Initialize auth state on mount
  useEffect(() => {
    initialize();
  }, []);

  // Hide splash only when both fonts and auth state are ready
  useEffect(() => {
    if ((fontsLoaded || fontError) && !authLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, authLoading]);

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <NavigationGuard />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack>
    </>
  );
}
