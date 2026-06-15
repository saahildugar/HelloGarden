import { create } from 'zustand';
import type { ExperienceLevel, GardenType } from '@/types/database';

interface OnboardingState {
  zip: string;
  zone: string | null;
  experienceLevel: ExperienceLevel | null;
  gardenTypes: GardenType[];

  setZip: (zip: string) => void;
  setZone: (zone: string | null) => void;
  setExperienceLevel: (level: ExperienceLevel) => void;
  toggleGardenType: (type: GardenType) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  zip: '',
  zone: null,
  experienceLevel: null,
  gardenTypes: [],

  setZip: (zip) => set({ zip }),
  setZone: (zone) => set({ zone }),
  setExperienceLevel: (level) => set({ experienceLevel: level }),
  toggleGardenType: (type) =>
    set((state) => ({
      gardenTypes: state.gardenTypes.includes(type)
        ? state.gardenTypes.filter((t) => t !== type)
        : [...state.gardenTypes, type],
    })),
  reset: () => set({ zip: '', zone: null, experienceLevel: null, gardenTypes: [] }),
}));
