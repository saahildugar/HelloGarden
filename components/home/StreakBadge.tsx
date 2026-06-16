import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius } from '@/constants/Spacing';

interface StreakBadgeProps {
  count: number;
}

export function StreakBadge({ count }: StreakBadgeProps) {
  const theme = useTheme();

  return (
    <View style={[styles.pill, { backgroundColor: count > 0 ? Colors.successLight : theme.card }]}>
      <Ionicons
        name="leaf"
        size={16}
        color={count > 0 ? Colors.sagePrimary : theme.textMuted}
      />
      <Text
        style={[
          Typography.label,
          {
            color: count > 0 ? Colors.sageDark : theme.textMuted,
            fontFamily: 'DMSans_600SemiBold',
          },
        ]}
      >
        {count > 0 ? `${count} day streak` : 'No streak yet'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
});
