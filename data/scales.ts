export interface Scale {
  id: string;
  name: string;
  formula: string;
  category: 'major' | 'minor' | 'pentatonic' | 'blues';
  root: string;
  keys: number[]; // Key indices (0-11)
  description: string;
}

export const SCALES: Scale[] = [
  {
    id: 'c_major',
    name: 'C Major Scale',
    formula: 'W-W-H-W-W-W-H',
    category: 'major',
    root: 'C',
    keys: [0, 2, 4, 5, 7, 9, 11],
    description: 'The fundamental scale in Western music, containing all natural white keys.',
  },
  {
    id: 'g_major',
    name: 'G Major Scale',
    formula: 'W-W-H-W-W-W-H',
    category: 'major',
    root: 'G',
    keys: [7, 9, 11, 0, 2, 4, 6],
    description: 'Contains one sharp (F#). Very common in classical and acoustic pop.',
  },
  {
    id: 'a_minor',
    name: 'A Natural Minor',
    formula: 'W-H-W-W-H-W-W',
    category: 'minor',
    root: 'A',
    keys: [9, 11, 0, 2, 4, 5, 7],
    description: 'The relative minor of C Major, using all white keys starting from A.',
  },
  {
    id: 'e_minor',
    name: 'E Harmonic Minor',
    formula: 'W-H-W-W-H-1.5-H',
    category: 'minor',
    root: 'E',
    keys: [4, 6, 7, 9, 11, 0, 3],
    description: 'Features a raised 7th degree (D#) creating a distinctive classical sound.',
  },
  {
    id: 'c_pentatonic',
    name: 'C Major Pentatonic',
    formula: '1-2-3-5-6',
    category: 'pentatonic',
    root: 'C',
    keys: [0, 2, 4, 7, 9],
    description: 'A 5-note scale widely used for soloing and improvisation in pop and rock.',
  },
  {
    id: 'a_blues',
    name: 'A Minor Blues',
    formula: '1-b3-4-b5-5-b7',
    category: 'blues',
    root: 'A',
    keys: [9, 0, 2, 3, 4, 7],
    description: 'Essential scale for blues, jazz, and rock keyboard solos.',
  },
];
