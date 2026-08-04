export type LessonSection = 'basics' | 'intermediate' | 'advanced' | 'professional';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  section: LessonSection;
  icon: string;
  isLocked: boolean;
  progress: number;
}

export const SECTIONS: { key: LessonSection; label: string; color: string }[] = [
  { key: 'basics', label: 'Basics', color: '#00E5FF' },
  { key: 'intermediate', label: 'Intermediate', color: '#B388FF' },
  { key: 'advanced', label: 'Advanced', color: '#FF6BCD' },
  { key: 'professional', label: 'Professional', color: '#FFD740' },
];

export const CURRICULUM: Lesson[] = [
  // Basics
  {
    id: 'b1',
    title: 'Meet the Piano',
    description: 'Learn about the keyboard layout and proper sitting posture',
    section: 'basics',
    icon: 'musical-notes',
    isLocked: false,
    progress: 100,
  },
  {
    id: 'b2',
    title: 'White Keys',
    description: 'Identify all 7 white keys: C D E F G A B',
    section: 'basics',
    icon: 'grid-outline',
    isLocked: false,
    progress: 75,
  },
  {
    id: 'b3',
    title: 'Black Keys',
    description: 'Understand sharps and flats on the keyboard',
    section: 'basics',
    icon: 'contrast',
    isLocked: false,
    progress: 30,
  },
  {
    id: 'b4',
    title: 'Finger Numbers',
    description: 'Master proper finger placement and numbering',
    section: 'basics',
    icon: 'hand-left',
    isLocked: false,
    progress: 0,
  },
  {
    id: 'b5',
    title: 'Reading Notes',
    description: 'Introduction to treble clef and note reading',
    section: 'basics',
    icon: 'book',
    isLocked: true,
    progress: 0,
  },
  // Intermediate
  {
    id: 'i1',
    title: 'C Major Scale',
    description: 'Play your first scale with both hands',
    section: 'intermediate',
    icon: 'trending-up',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'i2',
    title: 'Simple Chords',
    description: 'Learn C, F, G major chords and transitions',
    section: 'intermediate',
    icon: 'layers',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'i3',
    title: 'Rhythm Basics',
    description: 'Whole, half, quarter notes and time signatures',
    section: 'intermediate',
    icon: 'pulse',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'i4',
    title: 'Two-Hand Coordination',
    description: 'Play different parts with left and right hand',
    section: 'intermediate',
    icon: 'sync',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'i5',
    title: 'Minor Scales',
    description: 'Natural, harmonic, and melodic minor scales',
    section: 'intermediate',
    icon: 'water',
    isLocked: true,
    progress: 0,
  },
  // Advanced
  {
    id: 'a1',
    title: 'Seventh Chords',
    description: 'Major 7th, minor 7th, and dominant 7th chords',
    section: 'advanced',
    icon: 'diamond',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'a2',
    title: 'Chord Inversions',
    description: 'Root, first, and second inversions',
    section: 'advanced',
    icon: 'swap-vertical',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'a3',
    title: 'Music Theory',
    description: 'Circle of fifths, key signatures, intervals',
    section: 'advanced',
    icon: 'compass',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'a4',
    title: 'Arpeggios',
    description: 'Broken chord patterns across octaves',
    section: 'advanced',
    icon: 'flash',
    isLocked: true,
    progress: 0,
  },
  // Professional
  {
    id: 'p1',
    title: 'Improvisation',
    description: 'Create melodies over common progressions',
    section: 'professional',
    icon: 'sparkles',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'p2',
    title: 'Jazz Voicings',
    description: 'Extended chords and jazz harmony',
    section: 'professional',
    icon: 'moon',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'p3',
    title: 'Composition',
    description: 'Write your own piano pieces',
    section: 'professional',
    icon: 'create',
    isLocked: true,
    progress: 0,
  },
];
