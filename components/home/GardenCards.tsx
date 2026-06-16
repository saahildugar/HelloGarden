import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Typography } from '@/constants/Typography';
import { Spacing, SCREEN_PADDING } from '@/constants/Spacing';
import { GardenCard } from './GardenCard';
import type { GardenWithCount } from '@/stores/homeStore';

interface GardenCardsProps {
  gardens: GardenWithCount[];
}

export function GardenCards({ gardens }: GardenCardsProps) {
  const theme = useTheme();

  if (gardens.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={[Typography.titleMedium, { color: theme.text, paddingHorizontal: SCREEN_PADDING }]}>
        My Gardens
      </Text>
      <FlatList
        horizontal
        data={gardens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GardenCard garden={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ width: Spacing.sm }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  list: {
    paddingHorizontal: SCREEN_PADDING,
  },
});
