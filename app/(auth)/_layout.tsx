import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Theme } from '@/constants/Colors';

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Theme.dark : Theme.light;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
        animation: 'slide_from_right',
      }}
    />
  );
}
