import { NOTE_NAMES } from '../data/chords';

export interface PitchDetectionResult {
  frequency: number;       // In Hz (e.g. 261.63)
  noteName: string;        // E.g. "C4", "G#5"
  noteIndex: number;       // 0 to 11 (C = 0, C# = 1, ..., B = 11)
  octave: number;          // Octave number (e.g. 4)
  cents: number;           // Deviation from exact pitch in cents (-50 to +50)
  clarity: number;         // 0.0 to 1.0 (confidence of detection)
  isPianoNote: boolean;    // True if within piano fundamental frequency range
}

/**
 * YIN Pitch Detection Algorithm
 * Computes fundamental frequency (f0) from a mono PCM Float32 audio buffer.
 */
export function detectPitchYIN(
  buffer: Float32Array,
  sampleRate: number = 44100,
  threshold: number = 0.15
): PitchDetectionResult | null {
  const bufferSize = buffer.length;
  const halfSize = Math.floor(bufferSize / 2);

  // Step 1: Calculate RMS energy to ensure signal is strong enough
  let sumSquare = 0;
  for (let i = 0; i < bufferSize; i++) {
    sumSquare += buffer[i] * buffer[i];
  }
  const rms = Math.sqrt(sumSquare / bufferSize);

  // If signal is too quiet (noise floor), skip detection
  if (rms < 0.015) {
    return null;
  }

  // Step 2: Calculate difference function d(tau)
  const d = new Float32Array(halfSize);
  for (let tau = 0; tau < halfSize; tau++) {
    let sum = 0;
    for (let i = 0; i < halfSize; i++) {
      const delta = buffer[i] - buffer[i + tau];
      sum += delta * delta;
    }
    d[tau] = sum;
  }

  // Step 3: Cumulative Mean Normalized Difference Function d'(tau)
  const dPrime = new Float32Array(halfSize);
  dPrime[0] = 1;
  let runningSum = 0;

  for (let tau = 1; tau < halfSize; tau++) {
    runningSum += d[tau];
    dPrime[tau] = runningSum === 0 ? 1 : (d[tau] * tau) / runningSum;
  }

  // Step 4: Absolute Thresholding to find tau
  let tauFound = -1;
  for (let tau = 2; tau < halfSize; tau++) {
    if (dPrime[tau] < threshold) {
      while (tau + 1 < halfSize && dPrime[tau + 1] < dPrime[tau]) {
        tau++;
      }
      tauFound = tau;
      break;
    }
  }

  // If no tau was under threshold, find global minimum
  if (tauFound === -1) {
    let minVal = 1.0;
    for (let tau = 2; tau < halfSize; tau++) {
      if (dPrime[tau] < minVal) {
        minVal = dPrime[tau];
        tauFound = tau;
      }
    }
    // If minimum is still too noisy (high uncertainty), reject
    if (minVal > 0.45) {
      return null;
    }
  }

  // Step 5: Parabolic Interpolation for sub-sample precision
  let betterTau = tauFound;
  if (tauFound > 0 && tauFound < halfSize - 1) {
    const s0 = dPrime[tauFound - 1];
    const s1 = dPrime[tauFound];
    const s2 = dPrime[tauFound + 1];
    const delta = (s2 - s0) / (2 * (2 * s1 - s2 - s0));
    if (Math.abs(delta) < 1) {
      betterTau += delta;
    }
  }

  const frequency = sampleRate / betterTau;

  // Filter out frequencies outside typical piano range (A0 = 27.5Hz to C8 = 4186Hz)
  if (frequency < 27.5 || frequency > 4200.0) {
    return null;
  }

  const clarity = Math.max(0, 1 - (dPrime[tauFound] || 0));

  return frequencyToNote(frequency, clarity);
}

/**
 * Converts a frequency in Hz to musical note information (MIDI standard: A4 = 440Hz, index 69).
 */
export function frequencyToNote(frequency: number, clarity: number = 1.0): PitchDetectionResult {
  // MIDI note number equation: n = 12 * log2(f / 440) + 69
  const midiNote = 12 * (Math.log(frequency / 440) / Math.log(2)) + 69;
  const roundedMidi = Math.round(midiNote);
  
  // Note index (0 = C, 1 = C#, ..., 11 = B)
  const noteIndex = (roundedMidi - 12) % 12;
  const octave = Math.floor((roundedMidi - 12) / 12);
  
  // Calculate cents error (difference from exact pitch, -50 to +50 cents)
  const cents = Math.round((midiNote - roundedMidi) * 100);
  const pitchName = NOTE_NAMES[noteIndex] ?? 'C';
  const noteName = `${pitchName}${octave}`;

  const isPianoNote = frequency >= 27.5 && frequency <= 4186.0;

  return {
    frequency: Math.round(frequency * 10) / 10,
    noteName,
    noteIndex,
    octave,
    cents,
    clarity: Math.round(clarity * 100) / 100,
    isPianoNote,
  };
}
