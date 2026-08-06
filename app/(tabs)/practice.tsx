import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeInUp,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import PianoKeyboard from '../../components/PianoKeyboard';
import AnimatedButton from '../../components/AnimatedButton';
import MicIndicator from '../../components/MicIndicator';
import { audioCaptureController, AudioCaptureStatus } from '../../utils/audioCapture';
import { PitchDetectionResult } from '../../utils/pitchEngine';
import {
  SONGS,
  SONG_CATEGORIES,
  DIFFICULTY_COLORS,
  type Song,
  type SongCategory,
  type SongNote,
} from '../../data/songs';
import { NOTE_NAMES } from '../../data/chords';
import { playNoteSound } from '../../utils/sound';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type PracticeState = 'catalog' | 'playing';

function FallingNote({
  note,
  currentBeat,
  bpm,
  keyboardWidth,
}: {
  note: SongNote;
  currentBeat: number;
  bpm: number;
  keyboardWidth: number;
}) {
  const beatsAhead = note.startBeat - currentBeat;
  const noteHeight = note.duration * 30;
  const bottom = beatsAhead * 45;

  // Only show notes within visible range
  if (bottom < -noteHeight || bottom > 320) return null;

  const totalWhiteKeys = 14;
  const whiteKeyWidth = (keyboardWidth - 32) / totalWhiteKeys;
  const whiteKeyPositions: Record<number, number> = {
    0: 0, 2: 1, 4: 2, 5: 3, 7: 4, 9: 5, 11: 6,
  };
  const blackKeyPositions: Record<number, number> = {
    1: 0.65, 3: 1.75, 6: 3.7, 8: 4.75, 10: 5.8,
  };

  const isBlack = [1, 3, 6, 8, 10].includes(note.key % 12);
  const octaveOffset = (note.octave - 4) * 7;
  let left: number;

  if (isBlack) {
    left = ((blackKeyPositions[note.key % 12] ?? 0) + octaveOffset) * whiteKeyWidth + (whiteKeyWidth * 0.2);
  } else {
    left = ((whiteKeyPositions[note.key % 12] ?? 0) + octaveOffset) * whiteKeyWidth + 1;
  }

  const isActive = beatsAhead <= 0.2 && beatsAhead > -note.duration;
  const isLeftHand = note.hand === 'left';
  const baseColor = isLeftHand ? '#FF6BCD' : '#B388FF';
  const activeColor = isLeftHand ? '#FF6BCD' : '#00E5FF';

  return (
    <View
      style={{
        position: 'absolute',
        left,
        bottom,
        width: isBlack ? whiteKeyWidth * 0.6 : whiteKeyWidth - 2,
        height: Math.max(noteHeight, 16),
        backgroundColor: isActive ? activeColor : baseColor + '90',
        borderRadius: 4,
        borderWidth: isActive ? 1 : 0,
        borderColor: activeColor,
        shadowColor: isActive ? activeColor : 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: isActive ? 0.9 : 0,
        shadowRadius: isActive ? 8 : 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: isBlack ? 10 : 1,
      }}
    >
      <Text style={{ fontSize: 8, color: '#fff', fontWeight: '800' }}>
        {NOTE_NAMES[note.key % 12]}
      </Text>
    </View>
  );
}

function SongCard({
  song,
  index,
  onPress,
}: {
  song: Song;
  index: number;
  onPress: () => void;
}) {
  return (
    <Animated.View entering={FadeInUp.delay(index * 60).duration(300)}>
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: '#12121A',
          borderRadius: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: '#2A2A3A',
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: DIFFICULTY_COLORS[song.difficulty] + '20',
            borderRadius: 12,
            width: 48,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="musical-notes" size={22} color={DIFFICULTY_COLORS[song.difficulty]} />
        </View>
        <View className="flex-1 ml-3">
          <Text className="text-text-primary font-bold" style={{ fontSize: 14 }} numberOfLines={1}>
            {song.title}
          </Text>
          <Text className="text-text-secondary mt-1" style={{ fontSize: 11 }}>
            {song.artist} · {song.bpm} BPM
          </Text>
        </View>
        <View className="items-end">
          <View
            style={{
              backgroundColor: DIFFICULTY_COLORS[song.difficulty] + '20',
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}
          >
            <Text
              style={{
                color: DIFFICULTY_COLORS[song.difficulty],
                fontSize: 10,
                fontWeight: '700',
              }}
            >
              {song.difficulty.toUpperCase()}
            </Text>
          </View>
          <Ionicons name="play-circle" size={24} color="#00E5FF" style={{ marginTop: 6 }} />
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function PracticeScreen() {
  const [state, setState] = useState<PracticeState>('catalog');
  const [activeCategory, setActiveCategory] = useState<SongCategory | 'all'>('all');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-4);
  const [tempo, setTempo] = useState(100);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [hitFeedback, setHitFeedback] = useState<string | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  
  // Real-Time Microphone Pitch Detection State
  const [inputMode, setInputMode] = useState<'touch' | 'mic'>('touch');
  const [isMicListening, setIsMicListening] = useState(false);
  const [micPermission, setMicPermission] = useState(true);
  const [currentRMS, setCurrentRMS] = useState(0);
  const [detectedPitch, setDetectedPitch] = useState<PitchDetectionResult | null>(null);
  const [enableAINoiseClearance, setEnableAINoiseClearance] = useState(true);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pulseAnim = useSharedValue(1);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
  }));

  const filteredSongs = useMemo(() => {
    if (activeCategory === 'all') return SONGS;
    return SONGS.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const highlightedKeys = useMemo(() => {
    if (!selectedSong) return [];
    return selectedSong.notes
      .filter(
        (n) => n.startBeat <= currentBeat + 0.3 && n.startBeat + n.duration >= currentBeat - 0.2
      )
      .map((n) => n.key % 12);
  }, [selectedSong, currentBeat]);

  const detectedKeys = useMemo(() => {
    if (!detectedPitch) return [];
    return [detectedPitch.noteIndex];
  }, [detectedPitch]);

  // Handle Real-Time Pitch Matching when note detected via mic
  useEffect(() => {
    if (inputMode === 'mic' && detectedPitch && selectedSong && isPlaying) {
      const matched = selectedSong.notes.find((n) => {
        const beatsAhead = n.startBeat - currentBeat;
        return n.key % 12 === detectedPitch.noteIndex && Math.abs(beatsAhead) <= 0.9;
      });

      if (matched) {
        setScore((prev) => prev + 100);
        setCombo((prev) => prev + 1);
        setHitFeedback('PERFECT MIC!');
        setTimeout(() => setHitFeedback(null), 800);
      }
    }
  }, [detectedPitch, inputMode, selectedSong, currentBeat, isPlaying]);

  // Handle Microphone Lifecycle
  useEffect(() => {
    if (state === 'playing' && inputMode === 'mic') {
      audioCaptureController.setAINoiseClearance(enableAINoiseClearance);
      audioCaptureController.startListening((status) => {
        setIsMicListening(status.isListening);
        setMicPermission(status.hasPermission);
        setCurrentRMS(status.currentRMS);
        setDetectedPitch(status.stablePitch || status.detectedPitch);
      });
    } else {
      audioCaptureController.stopListening();
      setIsMicListening(false);
      setDetectedPitch(null);
    }

    return () => {
      audioCaptureController.stopListening();
    };
  }, [state, inputMode, enableAINoiseClearance]);

  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    cancelAnimation(pulseAnim);
    pulseAnim.value = 1;
  }, [pulseAnim]);

  const startPlayback = useCallback(() => {
    if (!selectedSong) return;
    setIsPlaying(true);
    const bpm = (selectedSong.bpm * tempo) / 100;
    const intervalMs = (60 / bpm) * 250;

    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1.01, { duration: intervalMs * 2, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: intervalMs * 2, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    intervalRef.current = setInterval(() => {
      setCurrentBeat((prev) => {
        const nextBeat = prev + 0.25;
        const maxBeat = Math.max(...selectedSong.notes.map((n) => n.startBeat + n.duration));

        // Play demo sound automatically
        selectedSong.notes.forEach((note) => {
          if (Math.abs(note.startBeat - nextBeat) < 0.125) {
            playNoteSound(note.key % 12, note.octave);
            setCombo((c) => c + 1);
            setScore((s) => s + 50);
          }
        });

        if (nextBeat >= maxBeat + 2) {
          stopPlayback();
          setShowCompletionModal(true);
          return maxBeat;
        }
        return nextBeat;
      });
    }, intervalMs);
  }, [selectedSong, tempo, pulseAnim, stopPlayback]);

  const resetPlayback = useCallback(() => {
    stopPlayback();
    setCurrentBeat(-4);
    setScore(0);
    setCombo(0);
    setHitFeedback(null);
  }, [stopPlayback]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const selectSong = useCallback((song: Song) => {
    setSelectedSong(song);
    setCurrentBeat(-4);
    setScore(0);
    setCombo(0);
    setHitFeedback(null);
    setShowCompletionModal(false);
    setState('playing');
  }, []);

  const handleKeyPress = useCallback((keyIndex: number) => {
    if (!selectedSong) return;
    
    // Check if key press matches active notes
    const activeNote = selectedSong.notes.find((n) => {
      const beatsAhead = n.startBeat - currentBeat;
      return n.key % 12 === keyIndex % 12 && Math.abs(beatsAhead) <= 0.8;
    });

    if (activeNote) {
      setScore((prev) => prev + 100);
      setCombo((prev) => prev + 1);
      setHitFeedback('PERFECT!');
      setTimeout(() => setHitFeedback(null), 800);
    }
  }, [selectedSong, currentBeat]);

  if (state === 'playing' && selectedSong) {
    return (
      <SafeAreaView className="flex-1 bg-deep-black">
        {/* Header */}
        <View className="flex-row items-center px-5 pt-2 pb-2">
          <Pressable
            onPress={() => {
              stopPlayback();
              setState('catalog');
            }}
            style={{
              backgroundColor: '#12121A',
              borderRadius: 12,
              padding: 8,
              borderWidth: 1,
              borderColor: '#2A2A3A',
            }}
          >
            <Ionicons name="arrow-back" size={20} color="#8888A0" />
          </Pressable>
          <View className="flex-1 ml-3">
            <Text className="text-text-primary font-bold" style={{ fontSize: 16 }} numberOfLines={1}>
              {selectedSong.title}
            </Text>
            <Text className="text-text-secondary" style={{ fontSize: 11 }}>
              {selectedSong.artist} · Score: {score}
            </Text>
          </View>
          <View className="flex-row items-center">
            <View
              style={{
                backgroundColor: '#00E5FF20',
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 4,
                marginRight: 6,
              }}
            >
              <Text style={{ color: '#00E5FF', fontSize: 10, fontWeight: '700' }}>
                COMBO x{combo}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: DIFFICULTY_COLORS[selectedSong.difficulty] + '20',
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  color: DIFFICULTY_COLORS[selectedSong.difficulty],
                  fontSize: 10,
                  fontWeight: '700',
                }}
              >
                {selectedSong.difficulty.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* Mode Switcher: Touch vs Piano Asli (Mic) */}
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 16,
            marginBottom: 8,
            backgroundColor: '#12121A',
            borderRadius: 12,
            padding: 3,
            borderWidth: 1,
            borderColor: '#2A2A3A',
          }}
        >
          <Pressable
            onPress={() => setInputMode('touch')}
            style={{
              flex: 1,
              paddingVertical: 6,
              borderRadius: 9,
              backgroundColor: inputMode === 'touch' ? '#00E5FF20' : 'transparent',
              borderWidth: inputMode === 'touch' ? 1 : 0,
              borderColor: '#00E5FF',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Ionicons
              name="hand-left-outline"
              size={14}
              color={inputMode === 'touch' ? '#00E5FF' : '#8888A0'}
              style={{ marginRight: 6 }}
            />
            <Text
              style={{
                color: inputMode === 'touch' ? '#00E5FF' : '#8888A0',
                fontSize: 11,
                fontWeight: '700',
              }}
            >
              Tuts Layar
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setInputMode('mic')}
            style={{
              flex: 1,
              paddingVertical: 6,
              borderRadius: 9,
              backgroundColor: inputMode === 'mic' ? '#00FF8820' : 'transparent',
              borderWidth: inputMode === 'mic' ? 1 : 0,
              borderColor: '#00FF88',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Ionicons
              name="mic"
              size={14}
              color={inputMode === 'mic' ? '#00FF88' : '#8888A0'}
              style={{ marginRight: 6 }}
            />
            <Text
              style={{
                color: inputMode === 'mic' ? '#00FF88' : '#8888A0',
                fontSize: 11,
                fontWeight: '700',
              }}
            >
              Piano Asli (Mic)
            </Text>
          </Pressable>
        </View>

        {/* Mic Indicator Component when mic mode active */}
        {inputMode === 'mic' && (
          <MicIndicator
            isListening={isMicListening}
            hasPermission={micPermission}
            currentRMS={currentRMS}
            detectedPitch={detectedPitch}
            enableAINoiseClearance={enableAINoiseClearance}
            onToggleAINoiseClearance={() => setEnableAINoiseClearance(!enableAINoiseClearance)}
            onRequestPermission={() => audioCaptureController.requestPermissions()}
          />
        )}
        {/* Letter Notes Banner */}
        {selectedSong.letterNotes && (
          <View
            style={{
              marginHorizontal: 16,
              marginBottom: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
              backgroundColor: '#12121A',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#2A2A3A',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons name="musical-notes" size={16} color="#00E5FF" style={{ marginRight: 8 }} />
            <Text style={{ color: '#EAEAF0', fontSize: 11, fontWeight: '600', flex: 1 }} numberOfLines={1}>
              {selectedSong.letterNotes}
            </Text>
          </View>
        )}

        {/* Falling Notes Area */}
        <Animated.View
          style={[
            pulseStyle,
            {
              flex: 1,
              marginHorizontal: 16,
              borderRadius: 16,
              backgroundColor: '#12121A',
              borderWidth: 1,
              borderColor: '#2A2A3A',
              overflow: 'hidden',
              position: 'relative',
            },
          ]}
        >
          {/* Hit Feedback Floating Toast */}
          {hitFeedback && (
            <Animated.View
              entering={FadeIn.duration(200)}
              style={{
                position: 'absolute',
                top: 40,
                alignSelf: 'center',
                backgroundColor: '#00E5FF',
                paddingHorizontal: 16,
                paddingVertical: 6,
                borderRadius: 12,
                zIndex: 50,
              }}
            >
              <Text style={{ color: '#0A0A0F', fontWeight: '900', fontSize: 14 }}>
                {hitFeedback}
              </Text>
            </Animated.View>
          )}

          {/* Target Hit Line */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              backgroundColor: '#00E5FF',
              shadowColor: '#00E5FF',
              shadowRadius: 8,
              shadowOpacity: 0.8,
            }}
          />

          {/* Falling notes */}
          {selectedSong.notes.map((note, i) => (
            <FallingNote
              key={`${note.key}-${note.startBeat}-${i}`}
              note={note}
              currentBeat={currentBeat}
              bpm={selectedSong.bpm}
              keyboardWidth={SCREEN_WIDTH}
            />
          ))}

          {/* Beat counter */}
          <View
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: '#1A1A25',
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}
          >
            <Text style={{ color: '#8888A0', fontSize: 11, fontWeight: '700' }}>
              Beat: {Math.max(0, Math.floor(currentBeat))}
            </Text>
          </View>
        </Animated.View>

        {/* Controls */}
        <View className="px-5 py-3">
          {/* Tempo Selector */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-text-secondary" style={{ fontSize: 12 }}>
              Tempo: {tempo}%
            </Text>
            <View className="flex-row">
              {[50, 75, 100].map((t) => (
                <Pressable
                  key={t}
                  onPress={() => {
                    setTempo(t);
                    if (isPlaying) {
                      stopPlayback();
                      setTimeout(() => startPlayback(), 100);
                    }
                  }}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    borderRadius: 8,
                    backgroundColor: tempo === t ? '#B388FF20' : '#12121A',
                    borderWidth: 1,
                    borderColor: tempo === t ? '#B388FF' : '#2A2A3A',
                    marginLeft: 6,
                  }}
                >
                  <Text
                    style={{
                      color: tempo === t ? '#B388FF' : '#8888A0',
                      fontSize: 11,
                      fontWeight: '700',
                    }}
                  >
                    {t}%
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Play / Reset Buttons */}
          <View className="flex-row items-center justify-center" style={{ gap: 16 }}>
            <AnimatedButton
              title="Reset"
              onPress={resetPlayback}
              variant="secondary"
              size="sm"
              icon={<Ionicons name="refresh" size={16} color="#EAEAF0" />}
            />
            <AnimatedButton
              title={isPlaying ? 'Pause' : 'Play Song'}
              onPress={isPlaying ? stopPlayback : startPlayback}
              variant="primary"
              size="lg"
              icon={
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={20}
                  color="#0A0A0F"
                />
              }
            />
          </View>
        </View>

        {/* Interactive Piano Keyboard */}
        <View className="pb-4">
          <PianoKeyboard
            highlightedKeys={highlightedKeys}
            detectedKeys={detectedKeys}
            octaves={2}
            compact
            onKeyPress={handleKeyPress}
          />
        </View>

        {/* Song Completion Overlay */}
        {showCompletionModal && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(10,10,15,0.92)',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
              zIndex: 100,
            }}
          >
            <Ionicons name="trophy" size={64} color="#FFD700" style={{ marginBottom: 16 }} />
            <Text style={{ color: '#EAEAF0', fontSize: 24, fontWeight: '800', marginBottom: 8 }}>
              Song Completed!
            </Text>
            <Text style={{ color: '#8888A0', fontSize: 14, marginBottom: 24, textAlign: 'center' }}>
              Great job practicing {selectedSong.title}!
            </Text>

            <View style={{ backgroundColor: '#12121A', borderRadius: 16, padding: 20, width: '100%', marginBottom: 24, borderWidth: 1, borderColor: '#2A2A3A' }}>
              <View className="flex-row justify-between mb-2">
                <Text style={{ color: '#8888A0' }}>Final Score</Text>
                <Text style={{ color: '#00E5FF', fontWeight: '700' }}>{score} PTS</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text style={{ color: '#8888A0' }}>Max Combo</Text>
                <Text style={{ color: '#B388FF', fontWeight: '700' }}>{combo}x</Text>
              </View>
              <View className="flex-row justify-between">
                <Text style={{ color: '#8888A0' }}>XP Earned</Text>
                <Text style={{ color: '#FF6BCD', fontWeight: '700' }}>+100 XP</Text>
              </View>
            </View>

            <AnimatedButton
              title="Practice Again"
              onPress={resetPlayback}
              size="lg"
              variant="primary"
            />
            <Pressable
              onPress={() => {
                stopPlayback();
                setState('catalog');
              }}
              style={{ marginTop: 16 }}
            >
              <Text style={{ color: '#8888A0', fontSize: 14, fontWeight: '600' }}>Back to Song Catalog</Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    );
  }

  // Catalog View
  return (
    <SafeAreaView className="flex-1 bg-deep-black">
      {/* Header */}
      <View className="px-5 pt-4 pb-2">
        <Text className="text-text-primary font-bold" style={{ fontSize: 26 }}>
          Practice
        </Text>
        <Text className="text-text-secondary mt-1" style={{ fontSize: 13 }}>
          Learn your favorite songs step by step
        </Text>
      </View>

      {/* Category Chips */}
      <View style={{ height: 45, marginTop: 16, marginBottom: 16 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, alignItems: 'center' }}
        >
          {SONG_CATEGORIES.map((cat) => (
            <Pressable
              key={cat.key}
              onPress={() => setActiveCategory(cat.key)}
              style={{
                paddingHorizontal: 18,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: activeCategory === cat.key ? '#00E5FF20' : '#12121A',
                borderWidth: 1,
                borderColor: activeCategory === cat.key ? '#00E5FF' : '#2A2A3A',
                marginRight: 8,
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 70,
              }}
            >
              <Text
                style={{
                  color: activeCategory === cat.key ? '#00E5FF' : '#8888A0',
                  fontSize: 12,
                  fontWeight: '700',
                }}
              >
                {cat.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Song List */}
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {filteredSongs.map((song, index) => (
          <SongCard
            key={song.id}
            song={song}
            index={index}
            onPress={() => selectSong(song)}
          />
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
