export type QuizType = 'note' | 'chord';

export interface QuizQuestion {
  id: string;
  type: QuizType;
  question: string;
  /** For note quiz: the key index (0-11). For chord quiz: the chord id */
  correctAnswer: string;
  options: string[];
  /** Visual hint: key indices to highlight on the piano */
  highlightKeys?: number[];
}

export const NOTE_QUIZ: QuizQuestion[] = [
  {
    id: 'nq1',
    type: 'note',
    question: 'Which note is this on the staff?',
    correctAnswer: 'C',
    options: ['C', 'D', 'E', 'F'],
    highlightKeys: [0],
  },
  {
    id: 'nq2',
    type: 'note',
    question: 'Identify this note:',
    correctAnswer: 'E',
    options: ['D', 'E', 'F', 'G'],
    highlightKeys: [4],
  },
  {
    id: 'nq3',
    type: 'note',
    question: 'Which note is this?',
    correctAnswer: 'G',
    options: ['F', 'G', 'A', 'B'],
    highlightKeys: [7],
  },
  {
    id: 'nq4',
    type: 'note',
    question: 'What note is highlighted?',
    correctAnswer: 'A',
    options: ['G', 'A', 'B', 'C'],
    highlightKeys: [9],
  },
  {
    id: 'nq5',
    type: 'note',
    question: 'Name this note:',
    correctAnswer: 'F',
    options: ['E', 'F', 'G', 'A'],
    highlightKeys: [5],
  },
  {
    id: 'nq6',
    type: 'note',
    question: 'Which note is being shown?',
    correctAnswer: 'B',
    options: ['A', 'A#', 'B', 'C'],
    highlightKeys: [11],
  },
  {
    id: 'nq7',
    type: 'note',
    question: 'Identify the highlighted key:',
    correctAnswer: 'D',
    options: ['C', 'C#', 'D', 'D#'],
    highlightKeys: [2],
  },
  {
    id: 'nq8',
    type: 'note',
    question: 'What is this black key?',
    correctAnswer: 'F#',
    options: ['F', 'F#', 'G', 'G#'],
    highlightKeys: [6],
  },
];

export const CHORD_QUIZ: QuizQuestion[] = [
  {
    id: 'cq1',
    type: 'chord',
    question: 'Which chord uses these keys?',
    correctAnswer: 'C Major',
    options: ['C Major', 'C Minor', 'D Major', 'G Major'],
    highlightKeys: [0, 4, 7],
  },
  {
    id: 'cq2',
    type: 'chord',
    question: 'Identify this chord:',
    correctAnswer: 'A Minor',
    options: ['A Major', 'A Minor', 'E Minor', 'D Minor'],
    highlightKeys: [9, 0, 4],
  },
  {
    id: 'cq3',
    type: 'chord',
    question: 'What chord is being played?',
    correctAnswer: 'G Major',
    options: ['F Major', 'G Major', 'G Minor', 'A Major'],
    highlightKeys: [7, 11, 2],
  },
  {
    id: 'cq4',
    type: 'chord',
    question: 'Name this chord:',
    correctAnswer: 'D Minor',
    options: ['D Major', 'D Minor', 'E Minor', 'C Minor'],
    highlightKeys: [2, 5, 9],
  },
  {
    id: 'cq5',
    type: 'chord',
    question: 'Which chord is this?',
    correctAnswer: 'F Major',
    options: ['E Major', 'F Major', 'F Minor', 'G Major'],
    highlightKeys: [5, 9, 0],
  },
  {
    id: 'cq6',
    type: 'chord',
    question: 'Identify the chord:',
    correctAnswer: 'E Minor',
    options: ['E Major', 'E Minor', 'D Minor', 'F Minor'],
    highlightKeys: [4, 7, 11],
  },
  {
    id: 'cq7',
    type: 'chord',
    question: 'What four-note chord is this?',
    correctAnswer: 'C Major 7th',
    options: ['C Major 7th', 'C Dominant 7th', 'D Minor 7th', 'G7'],
    highlightKeys: [0, 4, 7, 11],
  },
  {
    id: 'cq8',
    type: 'chord',
    question: 'Name this seventh chord:',
    correctAnswer: 'G Dominant 7th',
    options: ['G Major', 'G Minor', 'G Dominant 7th', 'F Major 7th'],
    highlightKeys: [7, 11, 2, 5],
  },
];
