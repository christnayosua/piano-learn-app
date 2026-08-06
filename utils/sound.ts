import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import { useAppStore } from '../store/useAppStore';

// Frequencies for notes (C4 = 261.63Hz)
const NOTE_FREQUENCIES: Record<number, number> = {
  0: 261.63, // C4
  1: 277.18, // C#4
  2: 293.66, // D4
  3: 311.13, // D#4
  4: 329.63, // E4
  5: 349.23, // F4
  6: 369.99, // F#4
  7: 392.00, // G4
  8: 415.30, // G#4
  9: 440.00, // A4
  10: 466.16, // A#4
  11: 493.88, // B4
};

// Web Audio API context for Web & Expo Web
let audioCtx: any = null;

const getAudioContext = () => {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
  }
  return audioCtx;
};

export const triggerHapticFeedback = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
  try {
    const { hapticsEnabled } = useAppStore.getState();
    if (hapticsEnabled && Platform.OS !== 'web') {
      Haptics.impactAsync(style);
    }
  } catch (e) {
    // Ignore haptic errors on unsupported devices
  }
};

export const playNoteSound = (noteIndex: number, octave: number = 4) => {
  triggerHapticFeedback(Haptics.ImpactFeedbackStyle.Light);

  try {
    const { soundEnabled } = useAppStore.getState();
    if (!soundEnabled) return;

    const ctx = getAudioContext();
    if (ctx) {
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const baseFreq = NOTE_FREQUENCIES[noteIndex % 12] || 440;
      const octaveMultiplier = Math.pow(2, octave - 4);
      const frequency = baseFreq * octaveMultiplier;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle'; // Soft piano timbre
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.85);
    }
  } catch (e) {
    // Ignore sound synth errors on platforms without Web Audio
  }
};
