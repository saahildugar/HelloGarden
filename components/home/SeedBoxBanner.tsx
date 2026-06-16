import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius, SCREEN_PADDING } from '@/constants/Spacing';
import type { SeedBoxStatus } from '@/stores/homeStore';

interface SeedBoxBannerProps {
  status: SeedBoxStatus;
}

export function SeedBoxBanner({ status }: SeedBoxBannerProps) {
  const theme = useTheme();

  // Active subscriber -- show order status
  if (status.type === 'active') {
    const statusText = status.orderStatus === 'shipped'
      ? 'Your SeedBox is on its way!'
      : status.orderStatus === 'delivered'
      ? 'Your SeedBox has arrived!'
      : status.orderStatus === 'processing'
      ? 'Your SeedBox is being prepared'
      : status.orderStatus === 'pending_selection'
      ? 'Pick your seeds for this month'
      : 'SeedBox subscription active';

    return (
      <View style={[styles.banner, { backgroundColor: Colors.successLight, marginHorizontal: SCREEN_PADDING }]}>
        <Ionicons name="cube" size={18} color={Colors.sageDark} />
        <Text style={[Typography.label, { color: Colors.sageDark, flex: 1 }]}>{statusText}</Text>
        <Ionicons name="chevron-forward" size={16} color={Colors.sageDark} />
      </View>
    );
  }

  // Paused
  if (status.type === 'paused') {
    return (
      <View style={[styles.banner, { backgroundColor: Colors.warningLight, marginHorizontal: SCREEN_PADDING }]}>
        <Ionicons name="pause-circle" size={18} color={Colors.warningAmber} />
        <Text style={[Typography.label, { color: Colors.warningAmber, flex: 1 }]}>SeedBox paused</Text>
      </View>
    );
  }

  // Non-subscriber -- subtle pitch
  return (
    <Pressable style={[styles.banner, { backgroundColor: theme.card, marginHorizontal: SCREEN_PADDING }]}>
      <Text style={styles.seedEmoji}>🌱</Text>
      <View style={{ flex: 1 }}>
        <Text style={[Typography.label, { color: theme.text }]}>
          Try SeedBox — your first box is free
        </Text>
        <Text style={[Typography.caption, { color: theme.textMuted }]}>
          Curated seeds delivered monthly
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.base,
    borderRadius: BorderRadius.xl,
  },
  seedEmoji: {
    fontSize: 20,
  },
});
