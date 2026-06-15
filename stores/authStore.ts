import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

const ONBOARDING_KEY = 'hg_onboarding_v1';

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isOnboardingComplete: boolean;
  error: string | null;

  initialize: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, fullName?: string) => Promise<void>;
  signInAnonymously: () => Promise<void>;
  signOut: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Database['public']['Tables']['profiles']['Update']) => Promise<void>;
  setOnboardingComplete: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  profile: null,
  isLoading: true,
  isOnboardingComplete: false,
  error: null,

  initialize: async () => {
    try {
      const [onboardingFlag, { data: { session } }] = await Promise.all([
        SecureStore.getItemAsync(ONBOARDING_KEY),
        supabase.auth.getSession(),
      ]);

      set({
        session,
        user: session?.user ?? null,
        isOnboardingComplete: onboardingFlag === 'true',
        isLoading: false,
      });

      if (session) {
        get().fetchProfile();
      }

      supabase.auth.onAuthStateChange((_event, session) => {
        set({ session, user: session?.user ?? null });
        if (session) {
          get().fetchProfile();
        } else {
          set({ profile: null });
        }
      });
    } catch {
      set({ isLoading: false });
    }
  },

  signInWithEmail: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err: any) {
      set({ error: err.message ?? 'Sign in failed. Check your email and password.' });
    } finally {
      set({ isLoading: false });
    }
  },

  signUpWithEmail: async (email, password, fullName) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) throw error;
    } catch (err: any) {
      set({ error: err.message ?? 'Sign up failed. Please try again.' });
    } finally {
      set({ isLoading: false });
    }
  },

  signInAnonymously: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signInAnonymously();
      if (error) throw error;
    } catch (err: any) {
      set({ error: err.message ?? 'Failed to create session' });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    await SecureStore.deleteItemAsync(ONBOARDING_KEY);
    set({ session: null, user: null, profile: null, isOnboardingComplete: false });
  },

  fetchProfile: async () => {
    const { user } = get();
    if (!user) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any).from('profiles').select('*').eq('id', user.id).single();
    if (data) set({ profile: data as Profile });
  },

  updateProfile: async (updates) => {
    const { user } = get();
    if (!user) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any)
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    if (data) set({ profile: data as Profile });
  },

  setOnboardingComplete: async () => {
    await SecureStore.setItemAsync(ONBOARDING_KEY, 'true');
    set({ isOnboardingComplete: true });
  },

  clearError: () => set({ error: null }),
}));
