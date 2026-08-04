export type SongDifficulty = 'easy' | 'medium' | 'hard';
export type SongCategory = 'pop' | 'classical' | 'jazz' | 'movie';

export interface SongNote {
  key: number;       // 0-11 representing C through B
  octave: number;    // 4 = middle C octave
  duration: number;  // in beats (1 = quarter note, 2 = half, 4 = whole)
  startBeat: number; // when the note starts
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  category: SongCategory;
  difficulty: SongDifficulty;
  bpm: number;
  timeSignature: string;
  notes: SongNote[];
}

export const SONGS: Song[] = [
  {
    id: 'twinkle',
    title: 'Twinkle Twinkle Little Star',
    artist: 'Traditional',
    category: 'classical',
    difficulty: 'easy',
    bpm: 100,
    timeSignature: '4/4',
    notes: [
      { key: 0, octave: 4, duration: 1, startBeat: 0 },
      { key: 0, octave: 4, duration: 1, startBeat: 1 },
      { key: 7, octave: 4, duration: 1, startBeat: 2 },
      { key: 7, octave: 4, duration: 1, startBeat: 3 },
      { key: 9, octave: 4, duration: 1, startBeat: 4 },
      { key: 9, octave: 4, duration: 1, startBeat: 5 },
      { key: 7, octave: 4, duration: 2, startBeat: 6 },
      { key: 5, octave: 4, duration: 1, startBeat: 8 },
      { key: 5, octave: 4, duration: 1, startBeat: 9 },
      { key: 4, octave: 4, duration: 1, startBeat: 10 },
      { key: 4, octave: 4, duration: 1, startBeat: 11 },
      { key: 2, octave: 4, duration: 1, startBeat: 12 },
      { key: 2, octave: 4, duration: 1, startBeat: 13 },
      { key: 0, octave: 4, duration: 2, startBeat: 14 },
    ],
  },
  {
    id: 'ode_to_joy',
    title: 'Ode to Joy',
    artist: 'Beethoven',
    category: 'classical',
    difficulty: 'easy',
    bpm: 108,
    timeSignature: '4/4',
    notes: [
      { key: 4, octave: 4, duration: 1, startBeat: 0 },
      { key: 4, octave: 4, duration: 1, startBeat: 1 },
      { key: 5, octave: 4, duration: 1, startBeat: 2 },
      { key: 7, octave: 4, duration: 1, startBeat: 3 },
      { key: 7, octave: 4, duration: 1, startBeat: 4 },
      { key: 5, octave: 4, duration: 1, startBeat: 5 },
      { key: 4, octave: 4, duration: 1, startBeat: 6 },
      { key: 2, octave: 4, duration: 1, startBeat: 7 },
      { key: 0, octave: 4, duration: 1, startBeat: 8 },
      { key: 0, octave: 4, duration: 1, startBeat: 9 },
      { key: 2, octave: 4, duration: 1, startBeat: 10 },
      { key: 4, octave: 4, duration: 1, startBeat: 11 },
      { key: 4, octave: 4, duration: 1.5, startBeat: 12 },
      { key: 2, octave: 4, duration: 0.5, startBeat: 13.5 },
      { key: 2, octave: 4, duration: 2, startBeat: 14 },
    ],
  },
  {
    id: 'fur_elise',
    title: 'Für Elise',
    artist: 'Beethoven',
    category: 'classical',
    difficulty: 'medium',
    bpm: 130,
    timeSignature: '3/8',
    notes: [
      { key: 4, octave: 5, duration: 0.5, startBeat: 0 },
      { key: 3, octave: 5, duration: 0.5, startBeat: 0.5 },
      { key: 4, octave: 5, duration: 0.5, startBeat: 1 },
      { key: 3, octave: 5, duration: 0.5, startBeat: 1.5 },
      { key: 4, octave: 5, duration: 0.5, startBeat: 2 },
      { key: 11, octave: 4, duration: 0.5, startBeat: 2.5 },
      { key: 2, octave: 5, duration: 0.5, startBeat: 3 },
      { key: 0, octave: 5, duration: 0.5, startBeat: 3.5 },
      { key: 9, octave: 4, duration: 1, startBeat: 4 },
    ],
  },
  {
    id: 'canon_d',
    title: 'Canon in D',
    artist: 'Pachelbel',
    category: 'classical',
    difficulty: 'medium',
    bpm: 66,
    timeSignature: '4/4',
    notes: [
      { key: 6, octave: 5, duration: 1, startBeat: 0 },
      { key: 4, octave: 5, duration: 1, startBeat: 1 },
      { key: 2, octave: 5, duration: 1, startBeat: 2 },
      { key: 0, octave: 5, duration: 1, startBeat: 3 },
      { key: 11, octave: 4, duration: 1, startBeat: 4 },
      { key: 7, octave: 4, duration: 1, startBeat: 5 },
      { key: 11, octave: 4, duration: 1, startBeat: 6 },
      { key: 2, octave: 5, duration: 1, startBeat: 7 },
    ],
  },
  {
    id: 'let_it_be',
    title: 'Let It Be',
    artist: 'The Beatles',
    category: 'pop',
    difficulty: 'easy',
    bpm: 72,
    timeSignature: '4/4',
    notes: [
      { key: 7, octave: 4, duration: 0.5, startBeat: 0 },
      { key: 9, octave: 4, duration: 0.5, startBeat: 0.5 },
      { key: 11, octave: 4, duration: 1, startBeat: 1 },
      { key: 11, octave: 4, duration: 0.5, startBeat: 2 },
      { key: 9, octave: 4, duration: 0.5, startBeat: 2.5 },
      { key: 11, octave: 4, duration: 1, startBeat: 3 },
      { key: 0, octave: 5, duration: 1, startBeat: 4 },
      { key: 11, octave: 4, duration: 1, startBeat: 5 },
      { key: 9, octave: 4, duration: 2, startBeat: 6 },
    ],
  },
  {
    id: 'river_flows',
    title: 'River Flows in You',
    artist: 'Yiruma',
    category: 'classical',
    difficulty: 'hard',
    bpm: 68,
    timeSignature: '4/4',
    notes: [
      { key: 9, octave: 4, duration: 0.5, startBeat: 0 },
      { key: 11, octave: 4, duration: 0.5, startBeat: 0.5 },
      { key: 0, octave: 5, duration: 0.5, startBeat: 1 },
      { key: 11, octave: 4, duration: 0.5, startBeat: 1.5 },
      { key: 0, octave: 5, duration: 0.5, startBeat: 2 },
      { key: 4, octave: 5, duration: 0.5, startBeat: 2.5 },
      { key: 2, octave: 5, duration: 1, startBeat: 3 },
      { key: 0, octave: 5, duration: 0.5, startBeat: 4 },
      { key: 11, octave: 4, duration: 0.5, startBeat: 4.5 },
      { key: 9, octave: 4, duration: 1, startBeat: 5 },
    ],
  },
  {
    id: 'bohemian',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    category: 'pop',
    difficulty: 'hard',
    bpm: 72,
    timeSignature: '4/4',
    notes: [
      { key: 7, octave: 4, duration: 1, startBeat: 0 },
      { key: 9, octave: 4, duration: 1, startBeat: 1 },
      { key: 11, octave: 4, duration: 0.5, startBeat: 2 },
      { key: 7, octave: 4, duration: 0.5, startBeat: 2.5 },
      { key: 4, octave: 4, duration: 1, startBeat: 3 },
      { key: 7, octave: 4, duration: 1, startBeat: 4 },
      { key: 2, octave: 5, duration: 1, startBeat: 5 },
      { key: 0, octave: 5, duration: 1, startBeat: 6 },
      { key: 11, octave: 4, duration: 1, startBeat: 7 },
    ],
  },
  {
    id: 'fly_me',
    title: 'Fly Me to the Moon',
    artist: 'Frank Sinatra',
    category: 'jazz',
    difficulty: 'medium',
    bpm: 120,
    timeSignature: '4/4',
    notes: [
      { key: 0, octave: 5, duration: 1.5, startBeat: 0 },
      { key: 11, octave: 4, duration: 0.5, startBeat: 1.5 },
      { key: 9, octave: 4, duration: 1, startBeat: 2 },
      { key: 7, octave: 4, duration: 1, startBeat: 3 },
      { key: 5, octave: 4, duration: 1.5, startBeat: 4 },
      { key: 7, octave: 4, duration: 0.5, startBeat: 5.5 },
      { key: 9, octave: 4, duration: 1, startBeat: 6 },
      { key: 0, octave: 5, duration: 1, startBeat: 7 },
    ],
  },
  {
    id: 'cinema_paradiso',
    title: 'Cinema Paradiso',
    artist: 'Ennio Morricone',
    category: 'movie',
    difficulty: 'medium',
    bpm: 80,
    timeSignature: '4/4',
    notes: [
      { key: 4, octave: 4, duration: 2, startBeat: 0 },
      { key: 5, octave: 4, duration: 1, startBeat: 2 },
      { key: 7, octave: 4, duration: 1, startBeat: 3 },
      { key: 9, octave: 4, duration: 2, startBeat: 4 },
      { key: 7, octave: 4, duration: 1, startBeat: 6 },
      { key: 5, octave: 4, duration: 1, startBeat: 7 },
    ],
  },
  {
    id: 'moonlight',
    title: 'Moonlight Sonata',
    artist: 'Beethoven',
    category: 'classical',
    difficulty: 'hard',
    bpm: 56,
    timeSignature: '4/4',
    notes: [
      { key: 1, octave: 4, duration: 0.33, startBeat: 0 },
      { key: 4, octave: 4, duration: 0.33, startBeat: 0.33 },
      { key: 8, octave: 4, duration: 0.34, startBeat: 0.66 },
      { key: 1, octave: 4, duration: 0.33, startBeat: 1 },
      { key: 4, octave: 4, duration: 0.33, startBeat: 1.33 },
      { key: 8, octave: 4, duration: 0.34, startBeat: 1.66 },
      { key: 1, octave: 4, duration: 0.33, startBeat: 2 },
      { key: 4, octave: 4, duration: 0.33, startBeat: 2.33 },
      { key: 8, octave: 4, duration: 0.34, startBeat: 2.66 },
      { key: 1, octave: 4, duration: 0.33, startBeat: 3 },
      { key: 4, octave: 4, duration: 0.33, startBeat: 3.33 },
      { key: 8, octave: 4, duration: 0.34, startBeat: 3.66 },
    ],
  },
];

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
