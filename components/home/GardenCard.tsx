import { Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius, Shadow } from '@/constants/Spacing';
import type { GardenWithCount } from '@/stores/homeStore';

interface GardenCardProps {
  garden: GardenWithCount;
  onPress?: () => void;
}

export function GardenCard({ garden, onPress }: GardenCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, Shadow.sm, { backgroundColor: theme.card }]}
    >
      <Text style={styles.emoji}>{garden.emoji_icon}</Text>
      <Text style={[Typography.bodyMedium, { color: theme.text }]} numberOfLines={1}>
        {garden.name}
      </Text>
      <Text style={[Typography.caption, { color: theme.textMuted }]}>
        {garden.plant_count === 0
          ? 'No plants yet'
          : `${garden.plant_count} plant${garden.plant_count !== 1 ? 's' : ''}`}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 130,
    padding: Spacing.base,
    borderRadius: BorderRadius.xl,
    gap: Spacing.xs,
  },
  emoji: {
    fontSize: 28,
    marginBottom: Spacing.xs,
  },
});
