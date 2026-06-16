import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius } from '@/constants/Spacing';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

interface DashboardHeaderProps {
  firstName: string | null;
  onAvatarPress?: () => void;
}

export function DashboardHeader({ firstName, onAvatarPress }: DashboardHeaderProps) {
  const theme = useTheme();
  const greeting = getGreeting();
  const displayGreeting = firstName ? `${greeting}, ${firstName}` : greeting;
  const initial = firstName ? firstName.charAt(0).toUpperCase() : null;

  return (
    <View style={styles.container}>
      <View style={styles.textBlock}>
        <Text style={[Typography.body, { color: theme.textSecondary }]}>{displayGreeting}</Text>
        <Text style={[Typography.heading3, { color: theme.text }]}>Your Garden</Text>
      </View>
      <Pressable
        onPress={onAvatarPress}
        disabled={!onAvatarPress}
        style={[styles.avatar, { backgroundColor: Colors.sageLight + '40' }]}
        hitSlop={8}
      >
        {initial ? (
          <Text style={[Typography.bodyMedium, { color: Colors.sageDark }]}>{initial}</Text>
        ) : (
          <Ionicons name="person" size={18} color={Colors.sageDark} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textBlock: {
    gap: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
