import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius, Shadow, MIN_TOUCH_TARGET } from '@/constants/Spacing';
import type { CareTask } from '@/stores/homeStore';
import type { CareType } from '@/types/database';

const CARE_ICONS: Record<CareType, string> = {
  water: 'water-outline',
  fertilize: 'nutrition-outline',
  prune: 'cut-outline',
  repot: 'flower-outline',
  other: 'ellipsis-horizontal',
};

const URGENCY_COLORS = {
  overdue: Colors.alertRed,
  today: Colors.warningAmber,
  upcoming: Colors.successGreen,
};

function urgencyLabel(task: CareTask): string {
  if (task.urgency === 'overdue') {
    return task.overdueDays === 1 ? '1 day overdue' : `${task.overdueDays} days overdue`;
  }
  if (task.urgency === 'today') return 'Due today';
  return 'Tomorrow';
}

interface TaskItemProps {
  task: CareTask;
  onComplete: () => void;
}

export function TaskItem({ task, onComplete }: TaskItemProps) {
  const theme = useTheme();
  const color = URGENCY_COLORS[task.urgency];
  const iconName = CARE_ICONS[task.careType] ?? 'ellipsis-horizontal';

  return (
    <View style={[styles.card, Shadow.sm, { backgroundColor: theme.card }]}>
      {/* Urgency stripe */}
      <View style={[styles.stripe, { backgroundColor: color }]} />

      {/* Care type icon */}
      <View style={[styles.iconCircle, { backgroundColor: color + '18' }]}>
        <Ionicons name={iconName as any} size={18} color={color} />
      </View>

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.gardenEmoji}>{task.gardenEmoji}</Text>
          <Text style={[Typography.bodyMedium, { color: theme.text, flex: 1 }]} numberOfLines={1}>
            {task.plantName}
          </Text>
        </View>
        <Text style={[Typography.caption, { color }]}>
          {urgencyLabel(task)}
        </Text>
      </View>

      {/* Complete button */}
      <Pressable
        onPress={onComplete}
        hitSlop={8}
        style={[styles.checkBtn, { borderColor: color }]}
      >
        <Ionicons name="checkmark" size={18} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    paddingLeft: 0,
    gap: Spacing.md,
    overflow: 'hidden',
  },
  stripe: {
    width: 4,
    alignSelf: 'stretch',
    borderTopLeftRadius: BorderRadius.lg,
    borderBottomLeftRadius: BorderRadius.lg,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  gardenEmoji: {
    fontSize: 14,
  },
  checkBtn: {
    width: MIN_TOUCH_TARGET,
    height: MIN_TOUCH_TARGET,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
