import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { Typography } from '@/constants/Typography';
import { Spacing, SCREEN_PADDING } from '@/constants/Spacing';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[Typography.caption, { color: theme.textMuted }]}>
              Good morning
            </Text>
            <Text style={[Typography.heading2, { color: theme.text }]}>
              Your Garden
            </Text>
          </View>
          <View style={[styles.avatar, { backgroundColor: theme.card }]} />
        </View>

        {/* Placeholder sections — replaced in Phase 3 */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[Typography.label, { color: theme.textMuted }]}>
            WEATHER & STREAK
          </Text>
          <Text style={[Typography.body, { color: theme.text, marginTop: Spacing.xs }]}>
            Weather widget + daily streak go here
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[Typography.label, { color: theme.textMuted }]}>
            TODAY'S TASKS
          </Text>
          <Text style={[Typography.body, { color: theme.text, marginTop: Spacing.xs }]}>
            Care task list goes here
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: SCREEN_PADDING,
    gap: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  card: {
    borderRadius: 14,
    padding: Spacing.base,
  },
});
