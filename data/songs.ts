export type SongDifficulty = 'easy' | 'medium' | 'hard';
export type SongCategory = 'pop' | 'classical' | 'jazz' | 'movie';

export const SONG_CATEGORIES: { key: SongCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'classical', label: 'Classical' },
  { key: 'pop', label: 'Pop' },
  { key: 'jazz', label: 'Jazz' },
  { key: 'movie', label: 'Movie' },
];

export const DIFFICULTY_COLORS: Record<SongDifficulty, string> = {
  easy: '#00E5FF',
  medium: '#B388FF',
  hard: '#FF6BCD',
};

export interface SongNote {
  key: number;       // 0-11 representing C through B
  octave: number;    // 4 = middle C octave
  duration: number;  // in beats (1 = quarter note, 2 = half, 4 = whole)
  startBeat: number; // when the note starts
  hand?: 'left' | 'right';
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  category: SongCategory;
  difficulty: SongDifficulty;
  bpm: number;
  timeSignature: string;
  letterNotes?: string;
  sheetImage?: any; // e.g. require('../assets/images/walking.png')
  notes: SongNote[];
}

export const SONGS: Song[] = [
  {
    id: "book1_g1_01",
    title: "1. Walking and Running",
    artist: "A Dozen A Day - Book 1 (Group I)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C4 D4 E4 F4 G4 A4 B4 C5 | C5 B4 A4 G4 F4 E4 D4 C4\nLH: C3 D3 E3 F3 G3 A3 B3 C4 | C4 B3 A3 G3 F3 E3 D3 C3",
    sheetImage: require('../assets/images/sheets/page_2.png'),
    notes: []
  },
  {
    id: "book1_g1_02",
    title: "2. Skipping",
    artist: "A Dozen A Day - Book 1 (Group I)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C4 E4 D4 F4 E4 G4 F4 A4 | G4 B4 A4 C5 G4 - - -\nLH: C3 E3 D3 F3 E3 G3 F3 A3 | G3 B3 A3 C4 G3 - - -",
    sheetImage: require('../assets/images/sheets/page_2.png'),
    notes: []
  },
  {
    id: "book1_g1_03",
    title: "3. Hopping",
    artist: "A Dozen A Day - Book 1 (Group I)",
    category: "classical",
    difficulty: "easy",
    bpm: 110,
    timeSignature: "4/4",
    letterNotes: "RH: [C4 E4] [C4 E4] [D4 F4] [D4 F4] | [E4 G4] [E4 G4] [F4 A4] [F4 A4] | [G4 B4] [G4 B4] [A4 C5] [A4 C5] | [G4 B4] - - -\nLH: [C3 E3] [C3 E3] [B2 D3] [B2 D3] | [A2 C3] [A2 C3] [G2 B2] [G2 B2] | [F2 A2] [F2 A2] [E2 G2] [E2 G2] | [D2 F2] - - -",
    sheetImage: require('../assets/images/sheets/page_2.png'),
    notes: []
  },
  {
    id: "book1_g1_04",
    title: "4. Deep Breathing",
    artist: "A Dozen A Day - Book 1 (Group I)",
    category: "classical",
    difficulty: "easy",
    bpm: 80,
    timeSignature: "4/4",
    letterNotes: "RH: [C4 E4 G4] - - - | [C4 F4 A4] - - - | [C4 E4 G4] - - - | [B3 D4 G4] - - - | [C4 E4 G4] - - -\nLH: [C3 E3 G3] - - - | [C3 F3 A3] - - - | [C3 E3 G3] - - - | [B2 D3 G3] - - - | [C3 E3 G3] - - -",
    sheetImage: require('../assets/images/sheets/page_3.png'),
    notes: []
  },
  {
    id: "book1_g1_05",
    title: "5. Deep Knee Bend",
    artist: "A Dozen A Day - Book 1 (Group I)",
    category: "classical",
    difficulty: "easy",
    bpm: 80,
    timeSignature: "4/4",
    letterNotes: "RH: [C4 E4 G4] - - - | [C4 F4 A4] - - - | [C4 E4 G4] - - - | [B3 D4 G4] - - - | [C4 E4 G4] - - -\nLH: C3 - - - | F2 - - - | C3 - - - | G2 - - - | C3 - - -",
    sheetImage: require('../assets/images/sheets/page_3.png'),
    notes: []
  },
  {
    id: "book1_g1_06",
    title: "6. Stretching",
    artist: "A Dozen A Day - Book 1 (Group I)",
    category: "classical",
    difficulty: "easy",
    bpm: 90,
    timeSignature: "4/4",
    letterNotes: "RH: C4 - - - | - - - - | C4 G4 C5 G4 | C5 - - -\nLH: - G3 E3 C3 | G2 E2 C2 - | - - - - | C3 - - -",
    sheetImage: require('../assets/images/sheets/page_3.png'),
    notes: []
  },
  {
    id: "book1_g1_07",
    title: "7. Stretching Right Leg Up",
    artist: "A Dozen A Day - Book 1 (Group I)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C4 (rest) C5 (rest) | C4 (rest) C5 (rest) | C4 (rest) C5 (rest) | [C4 C5] - - -\nLH: C3 - - - | C3 - - - | C3 - - - | C3 - - -",
    sheetImage: require('../assets/images/sheets/page_4.png'),
    notes: []
  },
  {
    id: "book1_g1_08",
    title: "8. Stretching Left Leg",
    artist: "A Dozen A Day - Book 1 (Group I)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C4 - - - | C4 - - - | C4 - - - | C4 - - -\nLH: C3 (rest) C2 (rest) | C3 (rest) C2 (rest) | C3 (rest) C2 (rest) | [C3 C2] - - -",
    sheetImage: require('../assets/images/sheets/page_4.png'),
    notes: []
  },
  {
    id: "book1_g1_09",
    title: "9. Cartwheels",
    artist: "A Dozen A Day - Book 1 (Group I)",
    category: "classical",
    difficulty: "easy",
    bpm: 110,
    timeSignature: "4/4",
    letterNotes: "RH: C4 E4 (LH G4 C5) | C4 E4 (LH G4 C5) | C4 E4 (LH G4 C5) | (LH C6) - - -\nLH: C3 G2 (RH E2 C2) | C3 G2 (RH E2 C2) | C3 G2 (RH E2 C2) | (RH C1) - - -",
    sheetImage: require('../assets/images/sheets/page_4.png'),
    notes: []
  },
  {
    id: "book1_g1_10",
    title: "10. The Splits",
    artist: "A Dozen A Day - Book 1 (Group I)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C4 D4 E4 F4 G4 A4 B4 C5 | D5 E5 F5 G5 A5 B5 C6 - | C6 B5 A5 G5 F5 E5 D5 C5 | B4 A4 G4 F4 E4 D4 C4 -\nLH: C4 B3 A3 G3 F3 E3 D3 C3 | B2 A2 G2 F2 E2 D2 C2 - | C2 D2 E2 F2 G2 A2 B2 C3 | D3 E3 F3 G3 A3 B3 C4 -",
    sheetImage: require('../assets/images/sheets/page_5.png'),
    notes: []
  },
  {
    id: "book1_g1_11",
    title: "11. Standing on Head",
    artist: "A Dozen A Day - Book 1 (Group I)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C5 B4 A4 G4 F4 E4 D4 C4 | C4 - - - | C4 D4 E4 F4 G4 A4 B4 C5 | C5 - - -\nLH: C3 D3 E3 F3 G3 A3 B3 C4 | C4 - - - | C4 B3 A3 G3 F3 E3 D3 C3 | C3 - - -",
    sheetImage: require('../assets/images/sheets/page_5.png'),
    notes: []
  },
  {
    id: "book1_g1_12",
    title: "12. Fit as a Fiddle and Ready To Go",
    artist: "A Dozen A Day - Book 1 (Group I)",
    category: "classical",
    difficulty: "easy",
    bpm: 110,
    timeSignature: "4/4",
    letterNotes: "RH: C4 E4 G4 C5 G4 E4 C4(qr) | [C4 E4 G4 C5] - - -\nLH: [C3 E3 G3] - - - | [C3 E3 G3] - - -",
    sheetImage: require('../assets/images/sheets/page_5.png'),
    notes: []
  },
  {
    id: "book1_g2_01",
    title: "1. Morning Stretch",
    artist: "A Dozen A Day - Book 1 (Group II)",
    category: "classical",
    difficulty: "easy",
    bpm: 80,
    timeSignature: "4/4",
    letterNotes: "RH: C4(h) E4(h) | C4(h) E4(h) | C4(h) E4(h) | C5(w)\nLH: C3(h) G2(h) | C3(h) G2(h) | C3(h) G2(h) | C2(w)",
    sheetImage: require('../assets/images/sheets/page_6.png'),
    notes: []
  },
  {
    id: "book1_g2_02",
    title: "2. Walking",
    artist: "A Dozen A Day - Book 1 (Group II)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C4 E4 G4 C5 | B4 A4 G4 F4 | E4 D4 C4 E4 | G4 F4 E4 D4 | C4 E4 G4 C5 | B4 A4 G4 F4 | E4 D4 C4 B3 | C4 - - -\nLH: C3 E3 G3 C4 | B3 A3 G3 F3 | E3 D3 C3 E3 | G3 F3 E3 D3 | C3 E3 G3 C4 | B3 A3 G3 F3 | E3 D3 C3 B2 | C3 - - -",
    sheetImage: require('../assets/images/sheets/page_6.png'),
    notes: []
  },
  {
    id: "book1_g2_03",
    title: "3. Running",
    artist: "A Dozen A Day - Book 1 (Group II)",
    category: "classical",
    difficulty: "easy",
    bpm: 110,
    timeSignature: "4/4",
    letterNotes: "RH: C4 D4 E4 F4 G4 A4 B4 C5 | C5 B4 A4 G4 F4 E4 D4 C4 (play 3x) | C4 - - -\nLH: C3 D3 E3 F3 G3 A3 B3 C4 | C4 B3 A3 G3 F3 E3 D3 C3 (play 3x) | C3 - - -",
    sheetImage: require('../assets/images/sheets/page_6.png'),
    notes: []
  },
  {
    id: "book1_g2_04",
    title: "4. High Stepping",
    artist: "A Dozen A Day - Book 1 (Group II)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C4 E4 D4 F4 E4 G4 F4 A4 | G4 B4 A4 C5 B4 D5 C5 - | C5 A4 B4 G4 A4 F4 G4 E4 | F4 D4 E4 C4 D4 B3 C4 -\nLH: C3 E3 D3 F3 E3 G3 F3 A3 | G3 B3 A3 C4 B3 D4 C4 - | C4 A3 B3 G3 A3 F3 G3 E3 | F3 D3 E3 C3 D3 B2 C3 -",
    sheetImage: require('../assets/images/sheets/page_7.png'),
    notes: []
  },
  {
    id: "book1_g2_05",
    title: "5. Jumping",
    artist: "A Dozen A Day - Book 1 (Group II)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C4 [E4 G4 C5] C4 [E4 G4 C5] | C4 [E4 G4 C5] C4 [E4 G4 C5] | C4 [E4 G4 C5] C4 [E4 G4 C5] | C4 [C4 E4 G4 C5] - -\nLH: C3 [E3 G3 C4] C3 [E3 G3 C4] | C3 [E3 G3 C4] C3 [E3 G3 C4] | C3 [E3 G3 C4] C3 [E3 G3 C4] | C3 [C3 E3 G3 C4] - -",
    sheetImage: require('../assets/images/sheets/page_7.png'),
    notes: []
  },
  {
    id: "book1_g2_06",
    title: "6. Kicking Right Leg",
    artist: "A Dozen A Day - Book 1 (Group II)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: G4 - G4 - | G4 - G4 - | G4 - G4 - | G4 - - -\nLH: C4(w) | C4(w) | C4(w) | [C3 G3](w)",
    sheetImage: require('../assets/images/sheets/page_7.png'),
    notes: []
  },
  {
    id: "book1_g2_07",
    title: "7. Kicking Left Leg",
    artist: "A Dozen A Day - Book 1 (Group II)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C5(w) | C5(w) | C5(w) | [C4 C5](w)\nLH: G3 - G3 - | G3 - G3 - | G3 - G3 - | G3 - - -",
    sheetImage: require('../assets/images/sheets/page_8.png'),
    notes: []
  },
  {
    id: "book1_g2_08",
    title: "8. The Splits",
    artist: "A Dozen A Day - Book 1 (Group II)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C5 C4 B4 C4 A4 C4 G4 C4 | F4 C4 E4 C4 D4 C4 C4 - | D4 C4 E4 C4 F4 C4 G4 C4 | A4 C4 B4 C4 C5 C4 C5 -\nLH: C3 C4 D3 C4 E3 C4 F3 C4 | G3 C4 A3 C4 B3 C4 C4 - | B3 C4 A3 C4 G3 C4 F3 C4 | E3 C4 D3 C4 C3 C4 C3 -",
    sheetImage: require('../assets/images/sheets/page_8.png'),
    notes: []
  },
  {
    id: "book1_g2_09",
    title: "9. Leg Work (lying down)",
    artist: "A Dozen A Day - Book 1 (Group II)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C4 E4 G4 E4 C4 E4 G4 E4 | (rest) | C4 E4 G4 E4 C4 E4 G4 E4 | C4 - - -\nLH: (rest) | C3 E3 G3 E3 C3 E3 G3 E3 | C3 E3 G3 E3 C3 E3 G3 E3 | C3 - - -",
    sheetImage: require('../assets/images/sheets/page_8.png'),
    notes: []
  },
  {
    id: "book1_g2_10",
    title: "10. Sitting Up and Lying Down",
    artist: "A Dozen A Day - Book 1 (Group II)",
    category: "classical",
    difficulty: "easy",
    bpm: 90,
    timeSignature: "4/4",
    letterNotes: "RH: C4 D4 E4 F4 G4(h) | C5 B4 A4 G4 F4(h) | C4 D4 E4 F4 G4(h) | C5 B4 A4 G4 C4(h) | C4 D4 E4 F4 G4 A4 B4 C5 | C5 B4 A4 G4 F4 E4 D4 C4 | C4 - - -\nLH: C3 D3 E3 F3 G3(h) | C4 B3 A3 G3 F3(h) | C3 D3 E3 F3 G3(h) | C4 B3 A3 G3 C3(h) | C3 D3 E3 F3 G3 A3 B3 C4 | C4 B3 A3 G3 F3 E3 D3 C3 | C3 - - -",
    sheetImage: require('../assets/images/sheets/page_9.png'),
    notes: []
  },
  {
    id: "book1_g2_11",
    title: "11. A Hard Trick",
    artist: "A Dozen A Day - Book 1 (Group II)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C4 E4 G4 C5 E5 C5 G4 E4 | C4 E4 G4 C5 E5 C5 G4 E4 | C4 - - -\nLH: C3 E3 G3 C4 E4 C4 G3 E3 | C3 E3 G3 C4 E4 C4 G3 E3 | C3 - - -",
    sheetImage: require('../assets/images/sheets/page_9.png'),
    notes: []
  },
  {
    id: "book1_g2_12",
    title: "12. Fit as a Fiddle and Ready To Go",
    artist: "A Dozen A Day - Book 1 (Group II)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C4 D4 E4 F4 G4(h) | (rest) C5 B4 A4 G4 | C4 D4 E4 F4 G4(h) | (rest) C5 B4 A4 G4 | C4 D4 E4 F4 G4 G4 | (rest) C5 B4 A4 G4 C4 -\nLH: C3(w) | C4(h) (rest) | C3(w) | C4(h) (rest) | C3(w) | C4(h) C3(h)",
    sheetImage: require('../assets/images/sheets/page_10.png'),
    notes: []
  },
  {
    id: "book1_g3_01",
    title: "1. Deep Breathing",
    artist: "A Dozen A Day - Book 1 (Group III)",
    category: "classical",
    difficulty: "easy",
    bpm: 70,
    timeSignature: "4/4",
    letterNotes: "RH: [C4 E4 G4](w) | [B3 Eb4 Gb4](w) | [C4 E4 G4](w) | [C4 E4 G4](w)\nLH: [C3 E3 G3](w) | [B2 Eb3 Gb3](w) | [C3 E3 G3](w) | [C3 E3 G3](w)",
    sheetImage: require('../assets/images/sheets/page_11.png'),
    notes: []
  },
  {
    id: "book1_g3_02",
    title: "2. Rolling",
    artist: "A Dozen A Day - Book 1 (Group III)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: [C4 E4] [D4 F4] [E4 G4] [D4 F4] (play 2x) | [C4 E4](w)\nLH: [C3 E3] [B2 D3] [A2 C3] [B2 D3] (play 2x) | [C3 E3](w)",
    sheetImage: require('../assets/images/sheets/page_11.png'),
    notes: []
  },
  {
    id: "book1_g3_03",
    title: "3. Climbing (in place)",
    artist: "A Dozen A Day - Book 1 (Group III)",
    category: "classical",
    difficulty: "easy",
    bpm: 90,
    timeSignature: "4/4",
    letterNotes: "RH: C4 D4 E4 (triplet) | C4 D4 E4 (triplet) | C4 D4 E4 (triplet) | C4 D4 E4 (triplet)\nLH: E3 D3 C3 (triplet) | E3 D3 C3 (triplet) | E3 D3 C3 (triplet) | E3 D3 C3 (triplet)",
    sheetImage: require('../assets/images/sheets/page_12.png'),
    notes: []
  },
  {
    id: "book1_g3_04",
    title: "4. Tip-toe Running (in place)",
    artist: "A Dozen A Day - Book 1 (Group III)",
    category: "classical",
    difficulty: "easy",
    bpm: 110,
    timeSignature: "4/4",
    letterNotes: "RH: E4 D4 C4 (triplet) | E4 D4 C4 (triplet) | E4 D4 C4 (triplet) | E4 D4 C4 (triplet)\nLH: C3 D3 E3 (triplet) | C3 D3 E3 (triplet) | C3 D3 E3 (triplet) | C3 D3 E3 (triplet)",
    sheetImage: require('../assets/images/sheets/page_12.png'),
    notes: []
  },
  {
    id: "book1_g3_05",
    title: "5. Baby Steps",
    artist: "A Dozen A Day - Book 1 (Group III)",
    category: "classical",
    difficulty: "easy",
    bpm: 80,
    timeSignature: "4/4",
    letterNotes: "RH: C#4 D4 C#4 D4 (eighths)\nLH: C#3 D3 C#3 D3 (eighths)",
    sheetImage: require('../assets/images/sheets/page_13.png'),
    notes: []
  },
  {
    id: "book1_g3_06",
    title: "6. Giant Steps",
    artist: "A Dozen A Day - Book 1 (Group III)",
    category: "classical",
    difficulty: "easy",
    bpm: 90,
    timeSignature: "4/4",
    letterNotes: "RH: C4 - G4 - | C5 - G5 - | C6 - - -\nLH: (Rest) | (Rest) | C5 - G4 - | C4 - G3 - | C3 - - -",
    sheetImage: require('../assets/images/sheets/page_13.png'),
    notes: []
  },
  {
    id: "book1_g3_07",
    title: "7. Jumping Rope",
    artist: "A Dozen A Day - Book 1 (Group III)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: [G4 C5](q) [G4 C5](q) [G4 C5](q) [G4 C5](q)\nLH: [C3 G3](q) [C3 G3](q) [C3 G3](q) [C3 G3](q)",
    sheetImage: require('../assets/images/sheets/page_13.png'),
    notes: []
  },
  {
    id: "book1_g3_08",
    title: "8. Somersaults",
    artist: "A Dozen A Day - Book 1 (Group III)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "LH: C3 D3 E3 | RH: C4 D4 E4 | LH: G3 F3 E3 | RH: G4 F4 E4",
    sheetImage: require('../assets/images/sheets/page_14.png'),
    notes: []
  },
  {
    id: "book1_g3_09",
    title: "9. Touching Toes",
    artist: "A Dozen A Day - Book 1 (Group III)",
    category: "classical",
    difficulty: "easy",
    bpm: 80,
    timeSignature: "4/4",
    letterNotes: "RH: [C4 E4 G4] - [B3 D4 G4] - | [C4 E4 G4] - [B3 D4 G4] -\nLH: C3 - G2 - | C3 - G2 -",
    sheetImage: require('../assets/images/sheets/page_14.png'),
    notes: []
  },
  {
    id: "book1_g3_10",
    title: "10. Ballet Exercise",
    artist: "A Dozen A Day - Book 1 (Group III)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C#4 D#4 C#4 D#4 (sixteenths) | E4 (quarter)\nLH: [C3 E3 G3](w)",
    sheetImage: require('../assets/images/sheets/page_14.png'),
    notes: []
  },
  {
    id: "book1_g3_11",
    title: "11. The Splits",
    artist: "A Dozen A Day - Book 1 (Group III)",
    category: "classical",
    difficulty: "easy",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C4 - E4 - G4 - C5 - E5\nLH: C4 - A3 - F3 - C3 - A2",
    sheetImage: require('../assets/images/sheets/page_15.png'),
    notes: []
  },
  {
    id: "book1_g3_12",
    title: "12. Fit as a Fiddle and Ready To Go",
    artist: "A Dozen A Day - Book 1 (Group III)",
    category: "classical",
    difficulty: "easy",
    bpm: 110,
    timeSignature: "4/4",
    letterNotes: "RH: C4 D4 E4 F4 G4 (quarter) | G4 (quarter) | (See sheet for full melody)\nLH: [C3 E3 G3](w)",
    sheetImage: require('../assets/images/sheets/page_15.png'),
    notes: []
  },
  {
    id: "book1_g4_01",
    title: "1. Deep Breathing",
    artist: "A Dozen A Day - Book 1 (Group IV)",
    category: "classical",
    difficulty: "medium",
    bpm: 70,
    timeSignature: "4/4",
    letterNotes: "RH: [C4 E4 G4] | [B3 D#4 F#4] | [C4 E4 G4]\nLH: [C3 E3 G3] | [B2 D#3 F#3] | [C3 E3 G3]",
    sheetImage: require('../assets/images/sheets/page_16.png'),
    notes: []
  },
  {
    id: "book1_g4_02",
    title: "2. Rolling",
    artist: "A Dozen A Day - Book 1 (Group IV)",
    category: "classical",
    difficulty: "medium",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C4 E4 D4 F4 E4 G4 D4 F4 (pattern)\nLH: C3 E3 B2 D3 A2 C3 B2 D3 (pattern)",
    sheetImage: require('../assets/images/sheets/page_16.png'),
    notes: []
  },
  {
    id: "book1_g4_03",
    title: "3. Bear Hug",
    artist: "A Dozen A Day - Book 1 (Group IV)",
    category: "classical",
    difficulty: "medium",
    bpm: 90,
    timeSignature: "4/4",
    letterNotes: "Cross hands exercise.\nRH & LH crossing patterns. (See sheet)",
    sheetImage: require('../assets/images/sheets/page_17.png'),
    notes: []
  },
  {
    id: "book1_g4_04",
    title: "4. Touching Toes",
    artist: "A Dozen A Day - Book 1 (Group IV)",
    category: "classical",
    difficulty: "medium",
    bpm: 80,
    timeSignature: "4/4",
    letterNotes: "RH: [C4 E4 G4] - [B3 D4 G4] -\nLH: C3 - G2 -",
    sheetImage: require('../assets/images/sheets/page_17.png'),
    notes: []
  },
  {
    id: "book1_g4_05",
    title: "5. Skipping",
    artist: "A Dozen A Day - Book 1 (Group IV)",
    category: "classical",
    difficulty: "medium",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C4 E4 D4 F4 E4 G4 F4 A4\nLH: C3 E3 D3 F3 E3 G3 F3 A3",
    sheetImage: require('../assets/images/sheets/page_18.png'),
    notes: []
  },
  {
    id: "book1_g4_06",
    title: "6. Kicking Right Leg",
    artist: "A Dozen A Day - Book 1 (Group IV)",
    category: "classical",
    difficulty: "medium",
    bpm: 110,
    timeSignature: "4/4",
    letterNotes: "RH: C4 - D4 - E4 - F4 - G4\nLH: C3 - - -",
    sheetImage: require('../assets/images/sheets/page_18.png'),
    notes: []
  },
  {
    id: "book1_g4_07",
    title: "7. Kicking Left Leg",
    artist: "A Dozen A Day - Book 1 (Group IV)",
    category: "classical",
    difficulty: "medium",
    bpm: 110,
    timeSignature: "4/4",
    letterNotes: "RH: (Rest)\nLH: C4 - B3 - A3 - G3 - F3",
    sheetImage: require('../assets/images/sheets/page_18.png'),
    notes: []
  },
  {
    id: "book1_g4_08",
    title: "8. The Splits",
    artist: "A Dozen A Day - Book 1 (Group IV)",
    category: "classical",
    difficulty: "medium",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "Arpeggios out and in.\nRH: C4 E4 G4 C5 | C5 G4 E4 C4\nLH: C3 A2 F2 C2 | C2 F2 A2 C3",
    sheetImage: require('../assets/images/sheets/page_19.png'),
    notes: []
  },
  {
    id: "book1_g4_09",
    title: "9. Standing on Head",
    artist: "A Dozen A Day - Book 1 (Group IV)",
    category: "classical",
    difficulty: "medium",
    bpm: 90,
    timeSignature: "4/4",
    letterNotes: "RH: C5 B4 A4 G4 F4 E4 D4 C4\nLH: C3 D3 E3 F3 G3 A3 B3 C4",
    sheetImage: require('../assets/images/sheets/page_19.png'),
    notes: []
  },
  {
    id: "book1_g4_10",
    title: "10. Fit as a Fiddle and Ready To Go",
    artist: "A Dozen A Day - Book 1 (Group IV)",
    category: "classical",
    difficulty: "medium",
    bpm: 110,
    timeSignature: "4/4",
    letterNotes: "RH: C4 D4 E4 F4 G4 (See sheet)\nLH: [C3 E3 G3]",
    sheetImage: require('../assets/images/sheets/page_20.png'),
    notes: []
  },
  {
    id: "book1_g5_01",
    title: "1. Deep Breathing",
    artist: "A Dozen A Day - Book 1 (Group V)",
    category: "classical",
    difficulty: "hard",
    bpm: 70,
    timeSignature: "4/4",
    letterNotes: "RH: [C4 E4 G4] | [B3 D4 F4] | [C4 E4 G4]\nLH: [C3 E3 G3] | [B2 D3 F3] | [C3 E3 G3]",
    sheetImage: require('../assets/images/sheets/page_21.png'),
    notes: []
  },
  {
    id: "book1_g5_02",
    title: "2. Rolling",
    artist: "A Dozen A Day - Book 1 (Group V)",
    category: "classical",
    difficulty: "hard",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "Rolling broken chords up and down.\nRH: C4 E4 G4 C5 | C5 G4 E4 C4\nLH: C3 E3 G3 C4 | C4 G3 E3 C3",
    sheetImage: require('../assets/images/sheets/page_21.png'),
    notes: []
  },
  {
    id: "book1_g5_03",
    title: "3. Swinging Arms",
    artist: "A Dozen A Day - Book 1 (Group V)",
    category: "classical",
    difficulty: "hard",
    bpm: 90,
    timeSignature: "4/4",
    letterNotes: "Arpeggios swinging left and right.\nRH: C4 E4 G4 C5 G4 E4 | C4\nLH: C3 E3 G3 C4 G3 E3 | C3",
    sheetImage: require('../assets/images/sheets/page_22.png'),
    notes: []
  },
  {
    id: "book1_g5_04",
    title: "4. Touching Toes",
    artist: "A Dozen A Day - Book 1 (Group V)",
    category: "classical",
    difficulty: "hard",
    bpm: 80,
    timeSignature: "4/4",
    letterNotes: "RH: [C4 E4 G4] - [B3 D4 G4] -\nLH: C3 - G2 -",
    sheetImage: require('../assets/images/sheets/page_22.png'),
    notes: []
  },
  {
    id: "book1_g5_05",
    title: "5. Skipping",
    artist: "A Dozen A Day - Book 1 (Group V)",
    category: "classical",
    difficulty: "hard",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "RH: C4 E4 D4 F4 E4 G4 F4 A4 (triplets/skips)\nLH: C3 E3 D3 F3 E3 G3 F3 A3",
    sheetImage: require('../assets/images/sheets/page_23.png'),
    notes: []
  },
  {
    id: "book1_g5_06",
    title: "6. Kicking Right Leg",
    artist: "A Dozen A Day - Book 1 (Group V)",
    category: "classical",
    difficulty: "hard",
    bpm: 110,
    timeSignature: "4/4",
    letterNotes: "RH: C4 - D4 - E4 - F4 - G4\nLH: C3 - - -",
    sheetImage: require('../assets/images/sheets/page_23.png'),
    notes: []
  },
  {
    id: "book1_g5_07",
    title: "7. Kicking Left Leg",
    artist: "A Dozen A Day - Book 1 (Group V)",
    category: "classical",
    difficulty: "hard",
    bpm: 110,
    timeSignature: "4/4",
    letterNotes: "RH: (Rest)\nLH: C4 - B3 - A3 - G3 - F3",
    sheetImage: require('../assets/images/sheets/page_23.png'),
    notes: []
  },
  {
    id: "book1_g5_08",
    title: "8. The Splits",
    artist: "A Dozen A Day - Book 1 (Group V)",
    category: "classical",
    difficulty: "hard",
    bpm: 100,
    timeSignature: "4/4",
    letterNotes: "Arpeggios out and in.\nRH: C4 E4 G4 C5 | C5 G4 E4 C4\nLH: C3 A2 F2 C2 | C2 F2 A2 C3",
    sheetImage: require('../assets/images/sheets/page_24.png'),
    notes: []
  },
  {
    id: "book1_g5_09",
    title: "9. Standing on Head",
    artist: "A Dozen A Day - Book 1 (Group V)",
    category: "classical",
    difficulty: "hard",
    bpm: 90,
    timeSignature: "4/4",
    letterNotes: "RH: C5 B4 A4 G4 F4 E4 D4 C4\nLH: C3 D3 E3 F3 G3 A3 B3 C4",
    sheetImage: require('../assets/images/sheets/page_24.png'),
    notes: []
  },
  {
    id: "book1_g5_10",
    title: "10. Fit as a Fiddle and Ready To Go",
    artist: "A Dozen A Day - Book 1 (Group V)",
    category: "classical",
    difficulty: "hard",
    bpm: 110,
    timeSignature: "4/4",
    letterNotes: "RH: C4 D4 E4 F4 G4 (See sheet)\nLH: [C3 E3 G3]",
    sheetImage: require('../assets/images/sheets/page_25.png'),
    notes: []
  }
];
