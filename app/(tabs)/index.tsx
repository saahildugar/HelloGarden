import { View, StyleSheet, ScrollView, RefreshControl, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, SCREEN_PADDING, BorderRadius } from '@/constants/Spacing';
import { useHomeDashboard } from '@/hooks/useHomeDashboard';
import { DashboardHeader } from '@/components/home/DashboardHeader';
import { WeatherWidget } from '@/components/home/WeatherWidget';
import { StreakBadge } from '@/components/home/StreakBadge';
import { GardenCards } from '@/components/home/GardenCards';
import { TaskSection } from '@/components/home/TaskSection';
import { SeedBoxBanner } from '@/components/home/SeedBoxBanner';
import { EmptyGardenState } from '@/components/home/EmptyGardenState';

export default function HomeScreen() {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const {
    firstName,
    hasZip,
    weather,
    weatherLoading,
    weatherError,
    gardens,
    todayTasks,
    streak,
    seedBoxStatus,
    totalPlants,
    isLoading,
    error,
    refresh,
    onCompleteTask,
  } = useHomeDashboard();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  // Initial loading state
  if (isLoading && gardens.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <DashboardHeader firstName={firstName} />
          {/* Weather skeleton */}
          <View style={[styles.skeletonCard, { backgroundColor: theme.card }]}>
            <View style={[styles.skeletonLine, { backgroundColor: theme.border, width: 120 }]} />
            <View style={[styles.skeletonLine, { backgroundColor: theme.border, width: 80 }]} />
          </View>
          {/* Streak skeleton */}
          <View style={[styles.skeletonPill, { backgroundColor: theme.card }]} />
          {/* Garden cards skeleton */}
          <View style={styles.skeletonRow}>
            <View style={[styles.skeletonGarden, { backgroundColor: theme.card }]} />
            <View style={[styles.skeletonGarden, { backgroundColor: theme.card }]} />
          </View>
          {/* Task skeletons */}
          {[1, 2, 3].map((i) => (
            <View key={i} style={[styles.skeletonTask, { backgroundColor: theme.card }]} />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Error state
  if (error && gardens.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, styles.centerContent]}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.sagePrimary} />}
        >
          <DashboardHeader firstName={firstName} />
          <View style={[styles.errorCard, { backgroundColor: theme.card }]}>
            <Text style={[Typography.bodyMedium, { color: theme.text }]}>Couldn't load your garden data</Text>
            <Text style={[Typography.caption, { color: theme.textMuted }]}>Pull down to retry</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const showEmptyState = totalPlants === 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.sagePrimary} />
        }
      >
        {/* Header section (padded) */}
        <View style={styles.paddedSection}>
          <DashboardHeader firstName={firstName} />
        </View>

        {/* Weather + Streak (padded) */}
        <View style={styles.paddedSection}>
          <WeatherWidget
            weather={weather}
            isLoading={weatherLoading}
            error={weatherError}
            hasZip={hasZip}
            onRetry={onRefresh}
          />
        </View>

        <View style={styles.paddedSection}>
          <StreakBadge count={streak} />
        </View>

        {/* Garden cards (full-bleed horizontal scroll) */}
        <GardenCards gardens={gardens} />

        {/* Main content area */}
        {showEmptyState ? (
          <EmptyGardenState hasGardens={gardens.length > 0} />
        ) : (
          <TaskSection tasks={todayTasks} onComplete={onCompleteTask} />
        )}

        {/* SeedBox banner */}
        <SeedBoxBanner status={seedBoxStatus} />

        {/* Bottom spacer */}
        <View style={{ height: Spacing.xl }} />
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
    gap: Spacing.base,
  },
  scrollContent: {
    paddingTop: Spacing.base,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.base,
  },
  paddedSection: {
    paddingHorizontal: SCREEN_PADDING,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
  },

  // Error
  errorCard: {
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
  },

  // Skeletons
  skeletonCard: {
    height: 72,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  skeletonLine: {
    height: 12,
    borderRadius: BorderRadius.sm,
  },
  skeletonPill: {
    width: 120,
    height: 32,
    borderRadius: BorderRadius.full,
  },
  skeletonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  skeletonGarden: {
    width: 130,
    height: 100,
    borderRadius: BorderRadius.xl,
  },
  skeletonTask: {
    height: 64,
    borderRadius: BorderRadius.lg,
  },
});
