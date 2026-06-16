import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius, SCREEN_PADDING } from '@/constants/Spacing';
import { TaskItem } from './TaskItem';
import type { CareTask } from '@/stores/homeStore';

interface TaskSectionProps {
  tasks: CareTask[];
  onComplete: (task: CareTask) => void;
}

export function TaskSection({ tasks, onComplete }: TaskSectionProps) {
  const theme = useTheme();
  const overdueCount = tasks.filter((t) => t.urgency === 'overdue').length;
  const todayCount = tasks.filter((t) => t.urgency === 'today').length;
  const activeCount = overdueCount + todayCount;

  return (
    <View style={styles.container}>
      {/* Section header */}
      <View style={styles.header}>
        <Text style={[Typography.titleMedium, { color: theme.text }]}>Today's Tasks</Text>
        {activeCount > 0 && (
          <View style={[styles.badge, { backgroundColor: overdueCount > 0 ? Colors.alertRed : Colors.warningAmber }]}>
            <Text style={[Typography.caption, { color: Colors.white, fontFamily: 'DMSans_600SemiBold' }]}>
              {activeCount}
            </Text>
          </View>
        )}
      </View>

      {/* Tasks or empty state */}
      {tasks.length === 0 ? (
        <View style={[styles.emptyCard, { backgroundColor: theme.card }]}>
          <Ionicons name="checkmark-circle" size={32} color={Colors.successGreen} />
          <Text style={[Typography.bodyMedium, { color: theme.text }]}>All caught up!</Text>
          <Text style={[Typography.caption, { color: theme.textMuted }]}>
            No tasks for today. Enjoy your garden.
          </Text>
        </View>
      ) : (
        <View style={styles.taskList}>
          {tasks.map((task) => (
            <TaskItem
              key={task.scheduleId}
              task={task}
              onComplete={() => onComplete(task)}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
    paddingHorizontal: SCREEN_PADDING,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xs + 2,
  },
  emptyCard: {
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
  },
  taskList: {
    gap: Spacing.sm,
  },
});
