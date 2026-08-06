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

export interface LessonContentDetails {
  theoryTitle: string;
  theoryParagraphs: string[];
  keyPoints: string[];
  practiceTitle: string;
  practiceInstruction: string;
  highlightedKeys: number[];
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

export const LESSON_CONTENTS: Record<string, LessonContentDetails> = {
  b1: {
    theoryTitle: 'Understanding the Keyboard Layout',
    theoryParagraphs: [
      'A full acoustic piano has 88 keys: 52 white keys and 36 black keys. The keys are arranged in a repeating pattern across multiple octaves.',
      'Always sit centered in front of Middle C (C4) with a relaxed spine, arms level with the keys, and curved fingers as if holding a small ball.',
    ],
    keyPoints: [
      '52 White keys (natural notes) & 36 Black keys (accidental notes)',
      'Middle C is located near the center of the keyboard',
      'Maintain an upright posture with curved fingers for agility',
    ],
    practiceTitle: 'Find & Play Middle C',
    practiceInstruction: 'Tap the highlighted key (C) below to hear Middle C pitch.',
    highlightedKeys: [0],
  },
  b2: {
    theoryTitle: 'The 7 Natural White Keys',
    theoryParagraphs: [
      'The white keys are named after the first seven letters of the alphabet: C, D, E, F, G, A, B.',
      'To easily locate C, look for the group of TWO black keys—the white key directly to the left of the two black keys is always C!',
    ],
    keyPoints: [
      'Alphabet sequence: C - D - E - F - G - A - B',
      'C is to the left of TWO black keys',
      'F is to the left of THREE black keys',
    ],
    practiceTitle: 'Explore the White Keys',
    practiceInstruction: 'Tap each highlighted white key from C through B.',
    highlightedKeys: [0, 2, 4, 5, 7, 9, 11],
  },
  b3: {
    theoryTitle: 'Sharps (#) and Flats (♭)',
    theoryParagraphs: [
      'Black keys represent sharp (#) and flat (♭) notes. A Sharp moves up one semitone (right), while a Flat moves down one semitone (left).',
      'Black keys are arranged in alternating clusters of 2 and 3 keys across the entire keyboard.',
    ],
    keyPoints: [
      'Sharp (#) = move right 1 key (+1 semitone)',
      'Flat (♭) = move left 1 key (-1 semitone)',
      'Cluster of 2 black keys: C# / D#',
      'Cluster of 3 black keys: F# / G# / A#',
    ],
    practiceTitle: 'Practice the Black Keys',
    practiceInstruction: 'Tap the black keys below to hear their sharp/flat pitch.',
    highlightedKeys: [1, 3, 6, 8, 10],
  },
  b4: {
    theoryTitle: 'Standard Finger Numbering',
    theoryParagraphs: [
      'In piano sheet music, fingers are numbered 1 through 5 for both left and right hands.',
      'Thumb is 1, Index is 2, Middle is 3, Ring is 4, and Pinky is 5. Proper finger numbering makes playing fast melodies effortless.',
    ],
    keyPoints: [
      'Finger 1: Thumb',
      'Finger 2: Index finger',
      'Finger 3: Middle finger',
      'Finger 4: Ring finger',
      'Finger 5: Pinky finger',
    ],
    practiceTitle: '5-Finger Sequence Practice',
    practiceInstruction: 'Tap C-D-E-F-G sequentially using fingers 1-2-3-4-5.',
    highlightedKeys: [0, 2, 4, 5, 7],
  },
  b5: {
    theoryTitle: 'Reading the Treble Clef',
    theoryParagraphs: [
      'Sheet music uses lines and spaces called a Staff. The Treble Clef (G Clef) represents notes played higher on the piano, usually with the right hand.',
      'Memorize line notes from bottom to top: E - G - B - D - F. Space notes spell F - A - C - E.',
    ],
    keyPoints: [
      'Treble Clef indicates higher pitch range',
      'Line notes (bottom to top): E G B D F',
      'Space notes (bottom to top): F A C E',
    ],
    practiceTitle: 'Play the C Triad (C - E - G)',
    practiceInstruction: 'Tap C, E, and G on the keyboard to hear the foundational triad.',
    highlightedKeys: [0, 4, 7],
  },
  i1: {
    theoryTitle: 'The C Major Scale',
    theoryParagraphs: [
      'The C Major Scale consists of notes C, D, E, F, G, A, B, C. It uses no sharps or flats.',
      'The step pattern for any Major scale is: Whole - Whole - Half - Whole - Whole - Whole - Half (W-W-H-W-W-W-H).',
    ],
    keyPoints: [
      'Contains 7 unique notes starting and ending on C',
      'Formula: Whole - Whole - Half - Whole - Whole - Whole - Half',
      'Uses all white keys in sequential order',
    ],
    practiceTitle: 'Ascending C Major Scale',
    practiceInstruction: 'Tap the highlighted keys in order from C up to C.',
    highlightedKeys: [0, 2, 4, 5, 7, 9, 11],
  },
  i2: {
    theoryTitle: 'Essential Major Chords (C, F, G)',
    theoryParagraphs: [
      'Chords form the harmonic backbone of modern music. A Major Triad consists of Root + Major 3rd + Perfect 5th.',
      'In the key of C Major, the three main chords are C Major (C-E-G), F Major (F-A-C), and G Major (G-B-D).',
    ],
    keyPoints: [
      'C Major: C - E - G (I chord)',
      'F Major: F - A - C (IV chord)',
      'G Major: G - B - D (V chord)',
    ],
    practiceTitle: 'C Major Triad Practice',
    practiceInstruction: 'Tap C, E, and G together to form a full C Major chord.',
    highlightedKeys: [0, 4, 7],
  },
  i3: {
    theoryTitle: 'Understanding Rhythm & Time',
    theoryParagraphs: [
      'Rhythm measures note duration. Time signatures (like 4/4) tell you how many beats are in each measure.',
      'A Whole Note gets 4 beats, a Half Note gets 2 beats, and a Quarter Note gets 1 beat.',
    ],
    keyPoints: [
      '4/4 Time Signature = 4 Quarter note beats per measure',
      'Whole Note (4 beats) > Half Note (2 beats) > Quarter Note (1 beat)',
      'Keep a steady pulse using an even tempo',
    ],
    practiceTitle: 'Pulse Rhythm Exercise',
    practiceInstruction: 'Tap C key steadily on 4 consecutive beats.',
    highlightedKeys: [0],
  },
  i4: {
    theoryTitle: 'Developing Two-Hand Independence',
    theoryParagraphs: [
      'Playing with two hands requires split focus: your left hand plays bass lines or backing chords while your right hand plays melodies.',
      'Start practicing slowly with simple quarter notes in the left hand before adding right-hand syncopation.',
    ],
    keyPoints: [
      'Left Hand = Harmonic foundation (Bass / Chords)',
      'Right Hand = Melodic expression',
      'Practice hands separately before combining',
    ],
    practiceTitle: 'Two-Hand Harmonic Preview',
    practiceInstruction: 'Tap the bass C note and treble C chord notes.',
    highlightedKeys: [0, 4, 7],
  },
  i5: {
    theoryTitle: 'Natural, Harmonic & Melodic Minor Scales',
    theoryParagraphs: [
      'Minor scales produce a darker, emotional atmosphere. The A Natural Minor scale shares all white keys with C Major.',
      'Harmonic minor raises the 7th degree by a half step (G#), giving it a distinctive middle-eastern flavor.',
    ],
    keyPoints: [
      'A Natural Minor: A - B - C - D - E - F - G - A',
      'A Harmonic Minor: A - B - C - D - E - F - G# - A',
      'Formula for Natural Minor: W-H-W-W-H-W-W',
    ],
    practiceTitle: 'A Natural Minor Scale',
    practiceInstruction: 'Tap the minor scale notes starting from A (note A).',
    highlightedKeys: [9, 11, 0, 2, 4, 5, 7],
  },
  a1: {
    theoryTitle: 'Seventh Chords (maj7, dom7, m7)',
    theoryParagraphs: [
      'Adding a 7th note above a triad creates a 4-note 7th chord, giving warmth and sophisticated harmony widely used in jazz and pop.',
      'C Major 7th (C-E-G-B) sounds dreamy, C Dominant 7th (C-E-G-Bb) creates bluesy tension, and A Minor 7th (A-C-E-G) feels smooth.',
    ],
    keyPoints: [
      'Cmaj7: C - E - G - B (Dreamy & lush)',
      'C7: C - E - G - B♭ (Bluesy tension)',
      'Am7: A - C - E - G (Mellow jazz)',
    ],
    practiceTitle: 'Play C Major 7th Chord',
    practiceInstruction: 'Tap C - E - G - B on the keyboard to hear Cmaj7.',
    highlightedKeys: [0, 4, 7, 11],
  },
  a2: {
    theoryTitle: 'Mastering Chord Inversions',
    theoryParagraphs: [
      'Inversions change which note is at the bottom (bass) of the chord. This allows smooth transitions without jumping your hand across the keyboard.',
      'Root Position (C-E-G), 1st Inversion (E-G-C), 2nd Inversion (G-C-E).',
    ],
    keyPoints: [
      'Root Position: Root note at bottom (C - E - G)',
      '1st Inversion: 3rd degree at bottom (E - G - C)',
      '2nd Inversion: 5th degree at bottom (G - C - E)',
    ],
    practiceTitle: '1st Inversion C Major (E - G - C)',
    practiceInstruction: 'Tap E, G, and C on the keyboard.',
    highlightedKeys: [4, 7, 0],
  },
  a3: {
    theoryTitle: 'Advanced Music Theory & Circle of Fifths',
    theoryParagraphs: [
      'The Circle of Fifths maps out all 12 musical keys and their relative minors.',
      'Moving clockwise adds sharps (#) by intervals of fifths (C -> G -> D -> A), helping you instantly transpose and understand key signatures.',
    ],
    keyPoints: [
      'Clockwise = add 1 Sharp (#) per step',
      'Counter-clockwise = add 1 Flat (♭) per step',
      'Key signature determines key center and accidentals',
    ],
    practiceTitle: 'G Major Scale (1 Sharp: F#)',
    practiceInstruction: 'Tap G Major scale notes (G A B C D E F# G).',
    highlightedKeys: [7, 9, 11, 0, 2, 4, 6],
  },
  a4: {
    theoryTitle: 'Fluid Arpeggios',
    theoryParagraphs: [
      'An arpeggio is a broken chord where notes are played sequentially across one or more octaves instead of simultaneously.',
      'Keep your wrist loose and roll gently as you move between notes to create smooth, flowing passages.',
    ],
    keyPoints: [
      'Notes played one after another ascending/descending',
      'Loose wrist movement prevents tension',
      'Used extensively in classical and pop accompaniments',
    ],
    practiceTitle: 'C Major Arpeggio Sequence',
    practiceInstruction: 'Play C - E - G - C in a flowing motion.',
    highlightedKeys: [0, 4, 7],
  },
  p1: {
    theoryTitle: 'Melodic & Harmonic Improvisation',
    theoryParagraphs: [
      'Improvisation is composing music in real-time. By staying within a key scale (e.g., C Major), any note you play will naturally harmonize with backing chords.',
      'Experiment with rhythmic variations, short motifs, and dynamic accents to create memorable solos.',
    ],
    keyPoints: [
      'Use scale notes as your foundation',
      'Repeat short 3-note motifs with rhythmic variations',
      'Leave space/rests to let melodies breathe',
    ],
    practiceTitle: 'Improvise over C Major',
    practiceInstruction: 'Free play on C Major scale keys (C D E F G A B).',
    highlightedKeys: [0, 2, 4, 5, 7, 9, 11],
  },
  p2: {
    theoryTitle: 'Jazz Voicings & Extended Harmony',
    theoryParagraphs: [
      'Jazz piano uses extended notes (9ths, 11ths, 13ths) and rootless voicings, allowing the bass player to handle root notes while the piano adds color.',
      'Cmaj9 (C-E-G-B-D) adds a bright 9th degree (D), producing a rich, open modern sound.',
    ],
    keyPoints: [
      'Extended chords: 9th, 11th, 13th intervals',
      'Rootless voicings give space for bass instruments',
      'Tritone substitutions & chromatic passing chords',
    ],
    practiceTitle: 'Cmaj9 Voicing Practice',
    practiceInstruction: 'Tap C - E - G - B - D for a rich 9th chord.',
    highlightedKeys: [0, 4, 7, 11, 2],
  },
  p3: {
    theoryTitle: 'Piano Composition & Arranging',
    theoryParagraphs: [
      'Composition combines theme (motif), chord progressions, tension/release, and song structure (Verse - Chorus - Bridge).',
      'Expressing emotion comes from subtle changes in velocity (loud/soft dynamics) and tempo rubato.',
    ],
    keyPoints: [
      'Build around a strong central melody',
      'Create contrast between sections (Verse vs Chorus)',
      'Use dynamics and tempo rubato to express emotion',
    ],
    practiceTitle: 'Composition Motif Practice',
    practiceInstruction: 'Combine chords and melody notes to craft your piece.',
    highlightedKeys: [0, 4, 7, 9, 11],
  },
};
