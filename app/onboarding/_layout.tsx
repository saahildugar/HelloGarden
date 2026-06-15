import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Theme } from '@/constants/Colors';

export default function OnboardingLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Theme.dark : Theme.light;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
        // No slide animation between onboarding screens — use fade for a cleaner feel
        animation: 'fade',
        // No back gesture in onboarding
        gestureEnabled: false,
      }}
    />
  );
}
