export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  xpReward: number;
  condition: (state: {
    xp: number;
    level: number;
    streak: number;
    completedLessons: string[];
    totalQuizCorrect: number;
  }) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    title: 'First Step',
    description: 'Complete your first piano lesson',
    icon: 'school',
    color: '#00E5FF',
    xpReward: 50,
    condition: (s) => s.completedLessons.length >= 1,
  },
  {
    id: 'streak_master',
    title: 'On Fire',
    description: 'Reach a 3-day learning streak',
    icon: 'flame',
    color: '#FF6BCD',
    xpReward: 100,
    condition: (s) => s.streak >= 3,
  },
  {
    id: 'quiz_whiz',
    title: 'Quiz Whiz',
    description: 'Answer 10 quiz questions correctly',
    icon: 'bulb',
    color: '#FFD740',
    xpReward: 100,
    condition: (s) => s.totalQuizCorrect >= 10,
  },
  {
    id: 'maestro',
    title: 'Piano Maestro',
    description: 'Reach Level 5',
    icon: 'trophy',
    color: '#B388FF',
    xpReward: 200,
    condition: (s) => s.level >= 5,
  },
  {
    id: 'staff_reader',
    title: 'Sheet Music Scholar',
    description: 'Complete the Treble Clef Reading lesson',
    icon: 'book',
    color: '#00E5FF',
    xpReward: 100,
    condition: (s) => s.completedLessons.includes('b5'),
  },
  {
    id: 'sight_master',
    title: 'Sight Reader',
    description: 'Answer 5 sight reading quiz questions correctly',
    icon: 'eye',
    color: '#FF6BCD',
    xpReward: 150,
    condition: (s) => s.totalQuizCorrect >= 5,
  },
];
