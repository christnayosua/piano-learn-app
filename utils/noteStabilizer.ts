import { PitchDetectionResult } from './pitchEngine';

export class NoteStabilizer {
  private history: PitchDetectionResult[] = [];
  private historySize: number = 4;
  private currentStableNote: PitchDetectionResult | null = null;
  private lastTriggerTime: number = 0;
  private minHoldMs: number = 80; // Hold note for at least 80ms before switching

  public push(pitch: PitchDetectionResult | null): PitchDetectionResult | null {
    const now = Date.now();

    if (!pitch || pitch.clarity < 0.6) {
      // Decay history
      if (this.history.length > 0) {
        this.history.shift();
      }
      if (this.history.length === 0) {
        this.currentStableNote = null;
      }
      return this.currentStableNote;
    }

    this.history.push(pitch);
    if (this.history.length > this.historySize) {
      this.history.shift();
    }

    // Count note occurrences in history
    const counts: Record<string, { count: number; pitch: PitchDetectionResult }> = {};
    for (const item of this.history) {
      const key = item.noteName;
      if (!counts[key]) {
        counts[key] = { count: 0, pitch: item };
      }
      counts[key].count++;
    }

    // Find note with maximum occurrences
    let bestKey: string | null = null;
    let maxCount = 0;
    for (const key in counts) {
      if (counts[key].count > maxCount) {
        maxCount = counts[key].count;
        bestKey = key;
      }
    }

    // Trigger new note if count >= 2 and hold time elapsed
    if (bestKey && maxCount >= 2) {
      const candidate = counts[bestKey].pitch;

      if (!this.currentStableNote || this.currentStableNote.noteName !== candidate.noteName) {
        if (now - this.lastTriggerTime >= this.minHoldMs) {
          this.currentStableNote = candidate;
          this.lastTriggerTime = now;
        }
      } else {
        // Update frequency and cents of current note
        this.currentStableNote = candidate;
      }
    }

    return this.currentStableNote;
  }

  public reset(): void {
    this.history = [];
    this.currentStableNote = null;
    this.lastTriggerTime = 0;
  }
}
