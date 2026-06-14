import { useColorScheme } from 'react-native';
import { Theme, ThemeColors } from '@/constants/Colors';

export function useTheme(): ThemeColors {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? Theme.dark : Theme.light;
}
