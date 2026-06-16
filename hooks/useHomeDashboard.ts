import { useEffect, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useHomeStore } from '@/stores/homeStore';
import { useWeather } from './useWeather';

export function useHomeDashboard() {
  const user = useAuthStore((s) => s.user);
  const authLoading = useAuthStore((s) => s.isLoading);
  const profile = useAuthStore((s) => s.profile);
  const {
    gardens,
    todayTasks,
    streak,
    seedBoxStatus,
    totalPlants,
    isLoading: dashLoading,
    error: dashError,
    fetchDashboard,
    completeTask,
  } = useHomeStore();

  const { weather, isLoading: weatherLoading, error: weatherError, refresh: refreshWeather } = useWeather();

  useEffect(() => {
    if (authLoading) return; // Wait for auth to finish initializing
    if (user?.id) {
      fetchDashboard(user.id);
    } else {
      // No user (anonymous auth failed, or no session) — stop loading so UI renders
      useHomeStore.setState({ isLoading: false });
    }
  }, [user?.id, authLoading]);

  const refresh = useCallback(async () => {
    const promises: Promise<void>[] = [refreshWeather()];
    if (user?.id) {
      promises.push(fetchDashboard(user.id));
    }
    await Promise.all(promises);
  }, [user?.id, refreshWeather, fetchDashboard]);

  const onCompleteTask = useCallback(
    (task: Parameters<typeof completeTask>[0]) => {
      if (user?.id) {
        completeTask(task, user.id);
      }
    },
    [user?.id, completeTask],
  );

  return {
    // User
    firstName: profile?.full_name?.split(' ')[0] ?? null,
    hasZip: Boolean(profile?.zip_code),

    // Weather
    weather,
    weatherLoading,
    weatherError,

    // Dashboard
    gardens,
    todayTasks,
    streak,
    seedBoxStatus,
    totalPlants,
    isLoading: authLoading || dashLoading,
    error: dashError,

    // Actions
    refresh,
    onCompleteTask,
  };
}
