import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius, SCREEN_PADDING } from '@/constants/Spacing';
import { Button } from '@/components/ui/Button';

interface EmptyGardenStateProps {
  hasGardens: boolean;
  onAddPlant?: () => void;
  onCreateGarden?: () => void;
}

export function EmptyGardenState({ hasGardens, onAddPlant, onCreateGarden }: EmptyGardenStateProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { paddingHorizontal: SCREEN_PADDING }]}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={[styles.iconWrap, { backgroundColor: Colors.successLight }]}>
          <Text style={styles.emoji}>🪴</Text>
        </View>
        <Text style={[Typography.title, { color: theme.text, textAlign: 'center' }]}>
          {hasGardens ? 'No plants yet' : 'Create your first garden'}
        </Text>
        <Text style={[Typography.body, { color: theme.textSecondary, textAlign: 'center', lineHeight: 22 }]}>
          {hasGardens
            ? 'Add a plant to start tracking its care and get personalized reminders.'
            : 'Set up a garden to start tracking your plants.'}
        </Text>
        <Button
          label={hasGardens ? 'Add Your First Plant' : 'Create a Garden'}
          onPress={hasGardens ? onAddPlant : onCreateGarden}
          style={styles.cta}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    gap: Spacing.base,
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  emoji: {
    fontSize: 36,
  },
  cta: {
    width: '100%',
    marginTop: Spacing.sm,
  },
});
