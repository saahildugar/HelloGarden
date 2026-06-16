import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import type { CareType, GardenType, OrderStatus } from '@/types/database';

// --- Types ---

export interface GardenWithCount {
  id: string;
  name: string;
  emoji_icon: string;
  type: GardenType;
  plant_count: number;
}

export interface CareTask {
  scheduleId: string;
  plantId: string;
  plantName: string;
  gardenEmoji: string;
  careType: CareType;
  frequencyDays: number;
  nextDueDate: string;
  urgency: 'overdue' | 'today' | 'upcoming';
  overdueDays: number;
}

export type SeedBoxStatus =
  | { type: 'none' }
  | { type: 'active'; orderStatus: OrderStatus | null; trackingNumber: string | null }
  | { type: 'paused' }
  | { type: 'cancelled' };

interface StreakData {
  count: number;
  lastCompletedDate: string; // "YYYY-MM-DD"
}

// --- Helpers ---

const STREAK_KEY = 'hg_streak_v1';

function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

function tomorrowStr(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export function classifyUrgency(nextDueDate: string): { urgency: 'overdue' | 'today' | 'upcoming'; overdueDays: number } {
  const today = new Date(todayStr());
  const due = new Date(nextDueDate.split('T')[0]);
  const diffMs = due.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { urgency: 'overdue', overdueDays: Math.abs(diffDays) };
  if (diffDays === 0) return { urgency: 'today', overdueDays: 0 };
  return { urgency: 'upcoming', overdueDays: diffDays };
}

const CARE_LABELS: Record<CareType, string> = {
  water: 'Water',
  fertilize: 'Fertilize',
  prune: 'Prune',
  repot: 'Repot',
  other: 'Care',
};

export function getCareLabel(type: CareType): string {
  return CARE_LABELS[type] ?? 'Care';
}

// --- Store ---

interface HomeState {
  gardens: GardenWithCount[];
  todayTasks: CareTask[];
  streak: number;
  seedBoxStatus: SeedBoxStatus;
  isLoading: boolean;
  error: string | null;
  totalPlants: number;

  fetchDashboard: (userId: string) => Promise<void>;
  completeTask: (task: CareTask, userId: string) => Promise<void>;
  loadStreak: () => Promise<void>;
}

export const useHomeStore = create<HomeState>((set, get) => ({
  gardens: [],
  todayTasks: [],
  streak: 0,
  seedBoxStatus: { type: 'none' },
  isLoading: true,
  error: null,
  totalPlants: 0,

  loadStreak: async () => {
    try {
      const raw = await AsyncStorage.getItem(STREAK_KEY);
      if (!raw) { set({ streak: 0 }); return; }
      const data: StreakData = JSON.parse(raw);
      const today = todayStr();
      const yesterday = yesterdayStr();

      if (data.lastCompletedDate === today || data.lastCompletedDate === yesterday) {
        set({ streak: data.count });
      } else {
        // Streak broken
        set({ streak: 0 });
        await AsyncStorage.setItem(STREAK_KEY, JSON.stringify({ count: 0, lastCompletedDate: '' }));
      }
    } catch {
      set({ streak: 0 });
    }
  },

  fetchDashboard: async (userId: string) => {
    set({ isLoading: true, error: null });

    try {
      // 1. Fetch gardens (simple query, no joins)
      const { data: gardensRaw, error: gardensErr } = await (supabase as any)
        .from('gardens')
        .select('id, name, emoji_icon, type')
        .eq('user_id', userId);

      if (gardensErr) throw gardensErr;

      const gardensList = gardensRaw ?? [];

      // 2. Count plants per garden (separate simple query)
      let plantCounts: Record<string, number> = {};
      if (gardensList.length > 0) {
        const gardenIds = gardensList.map((g: any) => g.id);
        const { data: plants } = await (supabase as any)
          .from('plants')
          .select('garden_id')
          .in('garden_id', gardenIds);

        if (plants) {
          for (const p of plants) {
            plantCounts[p.garden_id] = (plantCounts[p.garden_id] ?? 0) + 1;
          }
        }
      }

      const gardens: GardenWithCount[] = gardensList.map((g: any) => ({
        id: g.id,
        name: g.name,
        emoji_icon: g.emoji_icon ?? '🌱',
        type: g.type,
        plant_count: plantCounts[g.id] ?? 0,
      }));

      const totalPlants = gardens.reduce((sum, g) => sum + g.plant_count, 0);

      // 3. Fetch care tasks (only if there are gardens with plants)
      let todayTasks: CareTask[] = [];
      if (totalPlants > 0) {
        const gardenIds = gardens.map((g) => g.id);
        const gardenEmojiMap = Object.fromEntries(gardens.map((g) => [g.id, g.emoji_icon]));

        // Get all plants for user's gardens
        const { data: userPlants } = await (supabase as any)
          .from('plants')
          .select('id, nickname, custom_name, garden_id, species_id')
          .in('garden_id', gardenIds);

        if (userPlants && userPlants.length > 0) {
          const plantIds = userPlants.map((p: any) => p.id);
          const plantMap = Object.fromEntries(userPlants.map((p: any) => [p.id, p]));

          const tomorrow = tomorrowStr();
          const { data: schedules } = await (supabase as any)
            .from('care_schedules')
            .select('id, plant_id, care_type, frequency_days, next_due_date')
            .in('plant_id', plantIds)
            .lte('next_due_date', tomorrow);

          if (schedules) {
            todayTasks = schedules.map((s: any) => {
              const plant = plantMap[s.plant_id];
              const plantName = plant?.nickname || plant?.custom_name || 'Plant';
              const { urgency, overdueDays } = classifyUrgency(s.next_due_date);

              return {
                scheduleId: s.id,
                plantId: s.plant_id,
                plantName,
                gardenEmoji: gardenEmojiMap[plant?.garden_id] ?? '🌱',
                careType: s.care_type as CareType,
                frequencyDays: s.frequency_days,
                nextDueDate: s.next_due_date,
                urgency,
                overdueDays,
              };
            });

            todayTasks.sort((a, b) => {
              const urgencyOrder = { overdue: 0, today: 1, upcoming: 2 };
              const orderDiff = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
              if (orderDiff !== 0) return orderDiff;
              return new Date(a.nextDueDate).getTime() - new Date(b.nextDueDate).getTime();
            });
          }
        }
      }

      // 4. SeedBox status
      const { data: seedBoxData } = await (supabase as any)
        .from('seedbox_subscriptions')
        .select('id, status')
        .eq('user_id', userId)
        .limit(1);

      // Process SeedBox
      let seedBoxStatus: SeedBoxStatus = { type: 'none' };
      const sub = seedBoxData?.[0];
      if (sub) {
        if (sub.status === 'active') {
          // Fetch latest order
          const { data: orders } = await (supabase as any)
            .from('seedbox_orders')
            .select('status, tracking_number')
            .eq('subscription_id', sub.id)
            .order('created_at', { ascending: false })
            .limit(1);

          seedBoxStatus = {
            type: 'active',
            orderStatus: orders?.[0]?.status ?? null,
            trackingNumber: orders?.[0]?.tracking_number ?? null,
          };
        } else if (sub.status === 'paused') {
          seedBoxStatus = { type: 'paused' };
        } else {
          seedBoxStatus = { type: 'cancelled' };
        }
      }

      // Load streak
      await get().loadStreak();

      set({ gardens, todayTasks, seedBoxStatus, totalPlants, isLoading: false });
    } catch (err: any) {
      set({ error: err.message ?? 'Failed to load dashboard', isLoading: false });
    }
  },

  completeTask: async (task: CareTask, userId: string) => {
    const { todayTasks } = get();

    // Optimistic removal
    set({ todayTasks: todayTasks.filter((t) => t.scheduleId !== task.scheduleId) });

    try {
      const now = new Date().toISOString();
      const today = todayStr();

      // Insert care log
      await (supabase as any).from('care_logs').insert({
        plant_id: task.plantId,
        care_type: task.careType,
        logged_at: now,
        created_by: userId,
      });

      // Update next_due_date
      const nextDate = new Date(today);
      nextDate.setDate(nextDate.getDate() + task.frequencyDays);
      await (supabase as any)
        .from('care_schedules')
        .update({
          last_completed_at: now,
          next_due_date: nextDate.toISOString().split('T')[0],
        })
        .eq('id', task.scheduleId);

      // Update streak if all tasks done
      const remaining = get().todayTasks.filter((t) => t.urgency !== 'upcoming');
      if (remaining.length === 0) {
        const raw = await AsyncStorage.getItem(STREAK_KEY);
        const current: StreakData = raw ? JSON.parse(raw) : { count: 0, lastCompletedDate: '' };

        if (current.lastCompletedDate !== today) {
          const newCount = (current.lastCompletedDate === yesterdayStr() || current.lastCompletedDate === today)
            ? current.count + 1
            : 1;
          const updated = { count: newCount, lastCompletedDate: today };
          await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(updated));
          set({ streak: newCount });
        }
      }
    } catch {
      // Revert optimistic update on failure
      set({ todayTasks });
    }
  },
}));
