export type ChordCategory = 'major' | 'minor' | 'seventh' | 'diminished';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Chord {
  id: string;
  name: string;
  symbol: string;
  keys: number[]; // MIDI-style key indices (0 = C, 1 = C#, ... 11 = B) within one octave
  category: ChordCategory;
  difficulty: Difficulty;
  description: string;
}

export const CHORDS: Chord[] = [
  // Major chords
  { id: 'c_major', name: 'C Major', symbol: 'C', keys: [0, 4, 7], category: 'major', difficulty: 'easy', description: 'The most fundamental chord. Bright and happy.' },
  { id: 'd_major', name: 'D Major', symbol: 'D', keys: [2, 6, 9], category: 'major', difficulty: 'easy', description: 'A bright, open chord commonly used in pop music.' },
  { id: 'e_major', name: 'E Major', symbol: 'E', keys: [4, 8, 11], category: 'major', difficulty: 'easy', description: 'A powerful chord with a full, resonant sound.' },
  { id: 'f_major', name: 'F Major', symbol: 'F', keys: [5, 9, 0], category: 'major', difficulty: 'easy', description: 'Warm and mellow. One of the first chords to learn.' },
  { id: 'g_major', name: 'G Major', symbol: 'G', keys: [7, 11, 2], category: 'major', difficulty: 'easy', description: 'A common chord with a strong, uplifting character.' },
  { id: 'a_major', name: 'A Major', symbol: 'A', keys: [9, 1, 4], category: 'major', difficulty: 'easy', description: 'Bright and joyful. Key of many famous songs.' },
  { id: 'bb_major', name: 'B♭ Major', symbol: 'B♭', keys: [10, 2, 5], category: 'major', difficulty: 'medium', description: 'A smooth, warm chord popular in jazz and classical.' },

  // Minor chords
  { id: 'a_minor', name: 'A Minor', symbol: 'Am', keys: [9, 0, 4], category: 'minor', difficulty: 'easy', description: 'The relative minor of C major. Sad and emotional.' },
  { id: 'c_minor', name: 'C Minor', symbol: 'Cm', keys: [0, 3, 7], category: 'minor', difficulty: 'easy', description: 'Dark and dramatic. Used heavily by Beethoven.' },
  { id: 'd_minor', name: 'D Minor', symbol: 'Dm', keys: [2, 5, 9], category: 'minor', difficulty: 'easy', description: 'Melancholic and introspective.' },
  { id: 'e_minor', name: 'E Minor', symbol: 'Em', keys: [4, 7, 11], category: 'minor', difficulty: 'easy', description: 'One of the easiest minor chords. Hauntingly beautiful.' },
  { id: 'f_minor', name: 'F Minor', symbol: 'Fm', keys: [5, 8, 0], category: 'minor', difficulty: 'medium', description: 'Deeply emotional and passionate.' },
  { id: 'g_minor', name: 'G Minor', symbol: 'Gm', keys: [7, 10, 2], category: 'minor', difficulty: 'medium', description: 'Used by Mozart in his Symphony No. 40.' },

  // Seventh chords
  { id: 'c7', name: 'C Dominant 7th', symbol: 'C7', keys: [0, 4, 7, 10], category: 'seventh', difficulty: 'medium', description: 'Bluesy and unresolved. Creates tension.' },
  { id: 'cmaj7', name: 'C Major 7th', symbol: 'Cmaj7', keys: [0, 4, 7, 11], category: 'seventh', difficulty: 'medium', description: 'Dreamy and sophisticated. Jazz staple.' },
  { id: 'dm7', name: 'D Minor 7th', symbol: 'Dm7', keys: [2, 5, 9, 0], category: 'seventh', difficulty: 'medium', description: 'Smooth and mellow. Essential for jazz.' },
  { id: 'g7', name: 'G Dominant 7th', symbol: 'G7', keys: [7, 11, 2, 5], category: 'seventh', difficulty: 'medium', description: 'Resolves naturally to C major.' },
  { id: 'am7', name: 'A Minor 7th', symbol: 'Am7', keys: [9, 0, 4, 7], category: 'seventh', difficulty: 'medium', description: 'Gentle and flowing. Great for ballads.' },

  // Diminished
  { id: 'b_dim', name: 'B Diminished', symbol: 'B°', keys: [11, 2, 5], category: 'diminished', difficulty: 'hard', description: 'Tense and unstable. Creates dramatic tension.' },
  { id: 'c_dim7', name: 'C Diminished 7th', symbol: 'C°7', keys: [0, 3, 6, 9], category: 'diminished', difficulty: 'hard', description: 'Symmetrical and mysterious. Used for passing.' },
];

export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const KEY_LABELS: Record<number, string> = {
  0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E', 5: 'F',
  6: 'F#', 7: 'G', 8: 'G#', 9: 'A', 10: 'A#', 11: 'B',
};

export const isBlackKey = (index: number): boolean => {
  return [1, 3, 6, 8, 10].includes(index % 12);
};
