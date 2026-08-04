import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
}

interface AppState extends UserProgress {
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  updateLessonProgress: (lessonId: string, progress: number) => void;
  recordQuizAnswer: (correct: boolean) => void;
  updateStreak: () => void;
  loadProgress: () => Promise<void>;
  saveProgress: () => Promise<void>;
}

const STORAGE_KEY = 'piano_learn_progress';

const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 200) + 1;
};

const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const useAppStore = create<AppState>((set, get) => ({
  xp: 0,
  level: 1,
  streak: 1,
  lastPlayedDate: null,
  completedLessons: [],
  lessonProgress: {},
  quizHighScores: {},
  totalQuizCorrect: 0,
  totalQuizAttempted: 0,

  addXP: (amount: number) => {
    const currentXP = get().xp + amount;
    const newLevel = calculateLevel(currentXP);
    set({ xp: currentXP, level: newLevel });
    get().saveProgress();
  },

  completeLesson: (lessonId: string) => {
    const completed = get().completedLessons;
    if (!completed.includes(lessonId)) {
      set({
        completedLessons: [...completed, lessonId],
        lessonProgress: { ...get().lessonProgress, [lessonId]: 100 },
      });
      get().addXP(50);
    }
  },

  updateLessonProgress: (lessonId: string, progress: number) => {
    set({
      lessonProgress: { ...get().lessonProgress, [lessonId]: Math.min(progress, 100) },
    });
    get().saveProgress();
  },

  recordQuizAnswer: (correct: boolean) => {
    set({
      totalQuizAttempted: get().totalQuizAttempted + 1,
      totalQuizCorrect: get().totalQuizCorrect + (correct ? 1 : 0),
    });
    if (correct) {
      get().addXP(10);
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

    get().saveProgress();
  },

  loadProgress: async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved) as Partial<UserProgress>;
        set({
          xp: data.xp ?? 0,
          level: data.level ?? 1,
          streak: data.streak ?? 1,
          lastPlayedDate: data.lastPlayedDate ?? null,
          completedLessons: data.completedLessons ?? [],
          lessonProgress: data.lessonProgress ?? {},
          quizHighScores: data.quizHighScores ?? {},
          totalQuizCorrect: data.totalQuizCorrect ?? 0,
          totalQuizAttempted: data.totalQuizAttempted ?? 0,
        });
      }
    } catch (e) {
      console.warn('Failed to load progress:', e);
    }
  },

  saveProgress: async () => {
    try {
      const state = get();
      const data: UserProgress = {
        xp: state.xp,
        level: state.level,
        streak: state.streak,
        lastPlayedDate: state.lastPlayedDate,
        completedLessons: state.completedLessons,
        lessonProgress: state.lessonProgress,
        quizHighScores: state.quizHighScores,
        totalQuizCorrect: state.totalQuizCorrect,
        totalQuizAttempted: state.totalQuizAttempted,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save progress:', e);
    }
  },
}));
