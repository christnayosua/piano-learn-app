import { SongNote } from '../data/songs';

const NOTE_TO_KEY: Record<string, number> = {
  C: 0, 'C#': 1, Db: 1,
  D: 2, 'D#': 3, Eb: 3,
  E: 4,
  F: 5, 'F#': 6, Gb: 6,
  G: 7, 'G#': 8, Ab: 8,
  A: 9, 'A#': 10, Bb: 10,
  B: 11,
};

function parseSingleNote(str: string): { noteName: string; octave: number } | null {
  const match = str.match(/^([A-G][#b]?)([0-8])$/);
  if (!match) return null;
  return {
    noteName: match[1],
    octave: parseInt(match[2], 10),
  };
}

export function parseLetterNotes(letterNotes?: string): SongNote[] {
  if (!letterNotes) return [];

  const result: SongNote[] = [];
  const lines = letterNotes.split('\n');

  lines.forEach((line) => {
    let hand: 'left' | 'right' = 'right';
    let cleanLine = line.trim();

    if (cleanLine.startsWith('RH:')) {
      hand = 'right';
      cleanLine = cleanLine.substring(3).trim();
    } else if (cleanLine.startsWith('LH:')) {
      hand = 'left';
      cleanLine = cleanLine.substring(3).trim();
    }

    // Split by whitespace, ignoring '|'
    const tokens = cleanLine.split(/\s+/).filter((t) => t !== '|' && t.length > 0);

    let currentBeat = 0;
    let lastNotesInBeat: SongNote[] = [];

    tokens.forEach((token) => {
      // Remove trailing comments or annotations in parentheses if not duration flags
      if (token.startsWith('(') && token.endsWith(')')) {
        const inner = token.substring(1, token.length - 1).toLowerCase();
        if (inner === 'rest' || inner === 'qr') {
          currentBeat += 1;
          lastNotesInBeat = [];
          return;
        }
        if (inner.includes('play') || inner.includes('see') || inner.includes('pattern') || inner.includes('triplet') || inner.includes('eighths')) {
          return;
        }
      }

      // Check if dash '-' which extends duration of last notes
      if (token === '-') {
        if (lastNotesInBeat.length > 0) {
          lastNotesInBeat.forEach((n) => {
            n.duration += 1;
          });
        }
        currentBeat += 1;
        return;
      }

      // Check for duration modifier attached e.g. C4(h), C4(w), [C4 E4](h)
      let duration = 1;
      let coreToken = token;
      const durMatch = token.match(/^(.*?)\((h|w|q|qr)\)$/i);
      if (durMatch) {
        coreToken = durMatch[1];
        const modifier = durMatch[2].toLowerCase();
        if (modifier === 'h') duration = 2;
        else if (modifier === 'w') duration = 4;
        else if (modifier === 'q') duration = 1;
        else if (modifier === 'qr') {
          currentBeat += 1;
          lastNotesInBeat = [];
          return;
        }
      }

      // Check if bracketed chord e.g. [C4 E4 G4] or single note e.g. C4
      let noteStrings: string[] = [];
      if (coreToken.startsWith('[') && coreToken.endsWith(']')) {
        const chordInner = coreToken.substring(1, coreToken.length - 1);
        noteStrings = chordInner.split(/\s+/).filter(Boolean);
      } else if (coreToken.includes(']')) {
        // Handled if space-separated chord tokens
        noteStrings = [coreToken.replace(/[\[\]]/g, '')];
      } else {
        noteStrings = [coreToken.replace(/[\[\]]/g, '')];
      }

      const beatNotes: SongNote[] = [];
      noteStrings.forEach((ns) => {
        const parsed = parseSingleNote(ns);
        if (parsed) {
          const key = NOTE_TO_KEY[parsed.noteName];
          if (key !== undefined) {
            const noteObj: SongNote = {
              key,
              octave: parsed.octave,
              duration,
              startBeat: currentBeat,
              hand,
            };
            result.push(noteObj);
            beatNotes.push(noteObj);
          }
        }
      });

      if (beatNotes.length > 0) {
        lastNotesInBeat = beatNotes;
      }

      currentBeat += duration;
    });
  });

  return result;
}
