import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

export type EquipmentLevel = 'none' | 'band' | 'dumbbell' | 'gym';
export type Goal = 'fat_loss' | 'strength' | 'consistency' | 'energy';

export type Profile = {
  hasOnboarded: boolean;
  age?: number;
  heightCm?: number;
  waistCm?: number;
  equipment: EquipmentLevel;
  dietPattern?: string;
  sleepGoalHours?: number;
  alcoholUnitsPerWeek?: number;
  goals: Goal[];
};

export type DailyCheckIn = {
  date: string; // YYYY-MM-DD
  sleepHours?: number;
  alcoholUnits?: number;
  proteinGrams?: number;
  notes?: string;
};

export type WorkoutLog = {
  id: string;
  date: string;
  sessionId?: string;
  exercise: string;
  load?: number;
  reps?: number;
  rpe?: number;
};

type AppState = {
  profile: Profile | null;
  checkIns: Record<string, DailyCheckIn>;
  workoutLogs: WorkoutLog[];
  setProfile: (p: Partial<Profile>) => void;
  completeOnboarding: () => void;
  upsertCheckIn: (c: Partial<DailyCheckIn> & { date?: string }) => void;
  addWorkoutLog: (w: WorkoutLog) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      profile: null,
      checkIns: {},
      workoutLogs: [],
      setProfile: (p) => set((s) => ({ profile: { ...(s.profile ?? { hasOnboarded: false, equipment: 'none', goals: [] }), ...p } })),
      completeOnboarding: () => set((s) => ({ profile: { ...(s.profile ?? { equipment: 'none', goals: [] }), hasOnboarded: true } })),
      upsertCheckIn: (c) => {
        const date = c.date ?? dayjs().format('YYYY-MM-DD');
        set((s) => ({ checkIns: { ...s.checkIns, [date]: { ...(s.checkIns[date] ?? { date }), ...c, date } } }));
      },
      addWorkoutLog: (w) => set((s) => ({ workoutLogs: [...s.workoutLogs, w] })),
    }),
    { name: 'steady-t-store', storage: createJSONStorage(() => AsyncStorage) }
  )
);