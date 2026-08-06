import { Platform } from 'react-native';
import { Audio } from 'expo-av';
import { detectPitchYIN, PitchDetectionResult } from './pitchEngine';
import { aiNoiseProcessor } from './aiNoiseClearance';
import { NoteStabilizer } from './noteStabilizer';

export interface AudioCaptureStatus {
  isListening: boolean;
  hasPermission: boolean;
  currentRMS: number;
  noiseLevel: number;
  detectedPitch: PitchDetectionResult | null;
  stablePitch: PitchDetectionResult | null;
}

export type AudioStatusCallback = (status: AudioCaptureStatus) => void;

class AudioCaptureController {
  private isListening: boolean = false;
  private hasPermission: boolean = false;
  private callback: AudioStatusCallback | null = null;
  private noteStabilizer: NoteStabilizer = new NoteStabilizer();
  private enableAINoiseClearance: boolean = true;

  // Web Audio Context variables
  private webAudioCtx: any = null;
  private webMediaStream: any = null;
  private webSourceNode: any = null;
  private webAnalyserNode: any = null;
  private webAnimFrameId: number | null = null;

  // Expo Native Recording variables
  private nativeRecording: Audio.Recording | null = null;

  /**
   * Request microphone permission from OS.
   */
  public async requestPermissions(): Promise<boolean> {
    try {
      if (Platform.OS === 'web') {
        if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          // Stop track immediately after test
          stream.getTracks().forEach((t) => t.stop());
          this.hasPermission = true;
          return true;
        }
        return false;
      } else {
        const { status } = await Audio.requestPermissionsAsync();
        this.hasPermission = status === 'granted';
        return this.hasPermission;
      }
    } catch (e) {
      console.warn('Microphone permission request failed:', e);
      this.hasPermission = false;
      return false;
    }
  }

  public setAINoiseClearance(enabled: boolean): void {
    this.enableAINoiseClearance = enabled;
  }

  /**
   * Start real-time microphone pitch listening.
   */
  public async startListening(callback: AudioStatusCallback): Promise<boolean> {
    this.callback = callback;

    if (!this.hasPermission) {
      const granted = await this.requestPermissions();
      if (!granted) {
        this.emitStatus({
          isListening: false,
          hasPermission: false,
          currentRMS: 0,
          noiseLevel: 0,
          detectedPitch: null,
          stablePitch: null,
        });
        return false;
      }
    }

    this.isListening = true;
    this.noteStabilizer.reset();
    aiNoiseProcessor.reset();

    if (Platform.OS === 'web') {
      return this.startWebAudioListening();
    } else {
      return this.startNativeAudioListening();
    }
  }

  /**
   * Stop microphone pitch listening.
   */
  public async stopListening(): Promise<void> {
    this.isListening = false;

    // Web cleanup
    if (this.webAnimFrameId !== null) {
      cancelAnimationFrame(this.webAnimFrameId);
      this.webAnimFrameId = null;
    }
    if (this.webMediaStream) {
      this.webMediaStream.getTracks().forEach((track: any) => track.stop());
      this.webMediaStream = null;
    }
    if (this.webAudioCtx && this.webAudioCtx.state !== 'closed') {
      try {
        await this.webAudioCtx.close();
      } catch (e) {}
      this.webAudioCtx = null;
    }

    // Native cleanup
    if (this.nativeRecording) {
      try {
        await this.nativeRecording.stopAndUnloadAsync();
      } catch (e) {}
      this.nativeRecording = null;
    }

    this.emitStatus({
      isListening: false,
      hasPermission: this.hasPermission,
      currentRMS: 0,
      noiseLevel: 0,
      detectedPitch: null,
      stablePitch: null,
    });
  }

  // --- Web Audio API Implementation ---
  private async startWebAudioListening(): Promise<boolean> {
    try {
      const AudioCtxClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return false;

      this.webAudioCtx = new AudioCtxClass({ latencyHint: 'interactive' });
      if (this.webAudioCtx.state === 'suspended') {
        await this.webAudioCtx.resume();
      }

      this.webMediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      this.webSourceNode = this.webAudioCtx.createMediaStreamSource(this.webMediaStream);
      this.webAnalyserNode = this.webAudioCtx.createAnalyser();
      this.webAnalyserNode.fftSize = 2048; // Higher FFT size for lower pitch resolution (e.g. C2-C4)
      this.webAnalyserNode.smoothingTimeConstant = 0.2;

      this.webSourceNode.connect(this.webAnalyserNode);

      const bufferLength = this.webAnalyserNode.fftSize;
      const rawBuffer = new Float32Array(bufferLength);

      const processLoop = () => {
        if (!this.isListening) return;

        this.webAnalyserNode.getFloatTimeDomainData(rawBuffer);

        // Process AI Noise Clearance
        const { cleanBuffer, isGateOpen, currentRMS, noiseLevel } = aiNoiseProcessor.processBuffer(
          rawBuffer,
          this.enableAINoiseClearance
        );

        // Run Pitch Engine if Noise Gate is open
        let rawPitch: PitchDetectionResult | null = null;
        if (isGateOpen) {
          rawPitch = detectPitchYIN(cleanBuffer, this.webAudioCtx.sampleRate, 0.15);
        }

        const stablePitch = this.noteStabilizer.push(rawPitch);

        this.emitStatus({
          isListening: true,
          hasPermission: true,
          currentRMS,
          noiseLevel,
          detectedPitch: rawPitch,
          stablePitch,
        });

        this.webAnimFrameId = requestAnimationFrame(processLoop);
      };

      processLoop();
      return true;
    } catch (e) {
      console.error('Web audio start error:', e);
      this.stopListening();
      return false;
    }
  }

  // --- Native Expo Audio Recording Implementation ---
  private async startNativeAudioListening(): Promise<boolean> {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      const recording = new Audio.Recording();
      const customOptions: Audio.RecordingOptions = {
        android: {
          extension: '.m4a',
          outputFormat: Audio.AndroidOutputFormat.MPEG_4,
          audioEncoder: Audio.AndroidAudioEncoder.AAC,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 128000,
        },
        ios: {
          extension: '.caf',
          audioQuality: Audio.IOSAudioQuality.MAX,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {},
      };

      await recording.prepareToRecordAsync(customOptions);
      recording.setOnRecordingStatusUpdate((status) => {
        if (!this.isListening || !status.isRecording) return;

        // Use metering dB to calculate audio level & RMS estimate
        const metering = status.metering ?? -160;
        // Convert dB (-160 to 0) to normalized RMS 0.0 - 1.0
        const rms = Math.pow(10, metering / 20);

        const { isGateOpen, noiseLevel } = aiNoiseProcessor.processBuffer(
          new Float32Array([rms]),
          this.enableAINoiseClearance
        );

        this.emitStatus({
          isListening: true,
          hasPermission: true,
          currentRMS: rms,
          noiseLevel,
          detectedPitch: null, // Native pitch relies on streaming buffer or Web Audio polyfill
          stablePitch: null,
        });
      });

      await recording.startAsync();
      this.nativeRecording = recording;
      return true;
    } catch (e) {
      console.error('Native audio start error:', e);
      this.stopListening();
      return false;
    }
  }

  private emitStatus(status: AudioCaptureStatus): void {
    if (this.callback) {
      this.callback(status);
    }
  }
}

export const audioCaptureController = new AudioCaptureController();
