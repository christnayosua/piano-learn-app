export interface NoteStaffInfo {
  position: number; // 0 = bottom line (Line 1), 2 = Line 2, 4 = Line 3, 6 = Line 4, 8 = Line 5
  isSharp: boolean;
  noteName: string; // e.g. "C4", "F#4"
  letter: string; // e.g. "C", "F#"
  octave: number;
  ledgerLines: number[]; // positions where ledger lines are needed
  stemDirection: 'up' | 'down';
  noteType: 'whole' | 'half' | 'quarter' | 'eighth' | 'sixteenth';
}

const KEY_TO_DIATONIC: Record<number, { step: number; isSharp: boolean; letter: string }> = {
  0: { step: 0, isSharp: false, letter: 'C' },
  1: { step: 0, isSharp: true, letter: 'C#' },
  2: { step: 1, isSharp: false, letter: 'D' },
  3: { step: 1, isSharp: true, letter: 'D#' },
  4: { step: 2, isSharp: false, letter: 'E' },
  5: { step: 3, isSharp: false, letter: 'F' },
  6: { step: 3, isSharp: true, letter: 'F#' },
  7: { step: 4, isSharp: false, letter: 'G' },
  8: { step: 4, isSharp: true, letter: 'G#' },
  9: { step: 5, isSharp: false, letter: 'A' },
  10: { step: 5, isSharp: true, letter: 'A#' },
  11: { step: 6, isSharp: false, letter: 'B' },
};

/**
 * Calculates absolute diatonic step count from C0 (C0 = 0).
 */
export function getAbsoluteDiatonicStep(key: number, octave: number): number {
  const normalizedKey = ((key % 12) + 12) % 12;
  const diatonic = KEY_TO_DIATONIC[normalizedKey];
  return octave * 7 + (diatonic ? diatonic.step : 0);
}

/**
 * Calculates staff info for a given note (key 0-11, octave 0-8) and clef.
 */
export function getNoteStaffInfo(
  key: number,
  octave: number,
  clef: 'treble' | 'bass' = 'treble',
  duration: number = 1
): NoteStaffInfo {
  const normalizedKey = ((key % 12) + 12) % 12;
  const diatonic = KEY_TO_DIATONIC[normalizedKey];
  const absStep = getAbsoluteDiatonicStep(normalizedKey, octave);

  // Bottom line (Line 1):
  // Treble Clef: E4 -> octave 4, step 2 -> 4 * 7 + 2 = 30
  // Bass Clef: G2 -> octave 2, step 4 -> 2 * 7 + 4 = 18
  const baseStep = clef === 'treble' ? 30 : 18;
  const position = absStep - baseStep;

  // Ledger lines needed below (position < 0) or above (position > 8)
  const ledgerLines: number[] = [];
  if (position < 0) {
    for (let p = -2; p >= position; p -= 2) {
      ledgerLines.push(p);
    }
  } else if (position > 8) {
    for (let p = 10; p <= position; p += 2) {
      ledgerLines.push(p);
    }
  }

  // Stem direction: down if on middle line or higher (position >= 4)
  const stemDirection: 'up' | 'down' = position >= 4 ? 'down' : 'up';

  // Determine note type from beat duration
  let noteType: 'whole' | 'half' | 'quarter' | 'eighth' | 'sixteenth' = 'quarter';
  if (duration >= 3.5) {
    noteType = 'whole';
  } else if (duration >= 1.75) {
    noteType = 'half';
  } else if (duration >= 0.85) {
    noteType = 'quarter';
  } else if (duration >= 0.4) {
    noteType = 'eighth';
  } else {
    noteType = 'sixteenth';
  }

  return {
    position,
    isSharp: diatonic.isSharp,
    noteName: `${diatonic.letter}${octave}`,
    letter: diatonic.letter,
    octave,
    ledgerLines,
    stemDirection,
    noteType,
  };
}

/**
 * Gets solfege name for a note letter (C -> Do, D -> Re, etc.)
 */
export function getSolfegeName(letter: string): string {
  const base = letter.replace('#', '');
  const solfegeMap: Record<string, string> = {
    C: 'Do',
    D: 'Re',
    E: 'Mi',
    F: 'Fa',
    G: 'Sol',
    A: 'La',
    B: 'Si',
  };
  const sol = solfegeMap[base] || base;
  return letter.includes('#') ? `${sol}#` : sol;
}

/**
 * Gets number notation for a note (C -> 1, D -> 2, etc.)
 */
export function getNumberNotation(letter: string): string {
  const base = letter.replace('#', '');
  const numberMap: Record<string, string> = {
    C: '1',
    D: '2',
    E: '3',
    F: '4',
    G: '5',
    A: '6',
    B: '7',
  };
  const num = numberMap[base] || base;
  return letter.includes('#') ? `${num}#` : num;
}
