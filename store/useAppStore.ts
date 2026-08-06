import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACHIEVEMENTS } from '../data/achievements';

interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastPlayedDate: string | null;
  completedLessons: string[];
  lessonProgress: Record<string, number>;
  quizHighScores: Record<string, number>;
  totalQuizCorrect: number;
  totalQuizAttempted: number;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  unlockedAchievements: string[];
  hasSeenOnboarding: boolean;
}

interface AppState extends UserProgress {
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  updateLessonProgress: (lessonId: string, progress: number) => void;
  recordQuizAnswer: (correct: boolean) => void;
  recordQuizScore: (quizType: string, score: number) => void;
  updateStreak: () => void;
  toggleSound: () => void;
  toggleHaptics: () => void;
  setHasSeenOnboarding: (val: boolean) => void;
  checkAchievements: () => void;
  resetProgress: () => void;
}

const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 200) + 1;
};

const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

const initialProgressState: UserProgress = {
  xp: 0,
  level: 1,
  streak: 1,
  lastPlayedDate: null,
  completedLessons: [],
  lessonProgress: {},
  quizHighScores: {},
  totalQuizCorrect: 0,
  totalQuizAttempted: 0,
  soundEnabled: true,
  hapticsEnabled: true,
  unlockedAchievements: [],
  hasSeenOnboarding: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialProgressState,

      addXP: (amount: number) => {
        const currentXP = get().xp + amount;
        const newLevel = calculateLevel(currentXP);
        set({ xp: currentXP, level: newLevel });
        get().checkAchievements();
      },

      completeLesson: (lessonId: string) => {
        const completed = get().completedLessons;
        if (!completed.includes(lessonId)) {
          set({
            completedLessons: [...completed, lessonId],
            lessonProgress: { ...get().lessonProgress, [lessonId]: 100 },
          });
          get().addXP(50);
          get().checkAchievements();
        }
      },

      updateLessonProgress: (lessonId: string, progress: number) => {
        set({
          lessonProgress: { ...get().lessonProgress, [lessonId]: Math.min(progress, 100) },
        });
      },

      recordQuizAnswer: (correct: boolean) => {
        set({
          totalQuizAttempted: get().totalQuizAttempted + 1,
          totalQuizCorrect: get().totalQuizCorrect + (correct ? 1 : 0),
        });
        if (correct) {
          get().addXP(10);
        }
        get().checkAchievements();
      },

      recordQuizScore: (quizType: string, score: number) => {
        const currentHigh = get().quizHighScores[quizType] ?? 0;
        if (score > currentHigh) {
          set({
            quizHighScores: { ...get().quizHighScores, [quizType]: score },
          });
        }
      },

      updateStreak: () => {
        const today = getTodayString();
        const lastPlayed = get().lastPlayedDate;

        if (lastPlayed === today) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastPlayed === yesterdayStr) {
          set({ streak: get().streak + 1, lastPlayedDate: today });
        } else if (lastPlayed !== today) {
          set({ streak: 1, lastPlayedDate: today });
        }
        get().checkAchievements();
      },

      toggleSound: () => {
        set({ soundEnabled: !get().soundEnabled });
      },

      toggleHaptics: () => {
        set({ hapticsEnabled: !get().hapticsEnabled });
      },

      setHasSeenOnboarding: (val: boolean) => {
        set({ hasSeenOnboarding: val });
      },

      checkAchievements: () => {
        const state = get();
        const newlyUnlocked: string[] = [];

        ACHIEVEMENTS.forEach((ach) => {
          if (!state.unlockedAchievements.includes(ach.id) && ach.condition(state)) {
            newlyUnlocked.push(ach.id);
          }
        });

        if (newlyUnlocked.length > 0) {
          set({
            unlockedAchievements: [...state.unlockedAchievements, ...newlyUnlocked],
          });
        }
      },

      resetProgress: () => {
        set({ ...initialProgressState });
      },
    }),
    {
      name: 'piano_learn_progress_v2',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

