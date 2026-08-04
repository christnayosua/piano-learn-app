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
import {
  SONGS,
  SONG_CATEGORIES,
  DIFFICULTY_COLORS,
  type Song,
  type SongCategory,
  type SongNote,
} from '../../data/songs';
import { NOTE_NAMES } from '../../data/chords';

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
  const bottom = beatsAhead * 40;

  // Only show notes within visible range
  if (bottom < -noteHeight || bottom > 300) return null;

  // Calculate horizontal position based on key
  const whiteKeyWidth = (keyboardWidth - 32) / 14;
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
    left = ((blackKeyPositions[note.key % 12] ?? 0) + octaveOffset) * whiteKeyWidth + 16;
  } else {
    left = ((whiteKeyPositions[note.key % 12] ?? 0) + octaveOffset) * whiteKeyWidth + 16;
  }

  const isActive = beatsAhead <= 0 && beatsAhead > -note.duration;

  return (
    <View
      style={{
        position: 'absolute',
        left,
        bottom,
        width: isBlack ? whiteKeyWidth * 0.6 : whiteKeyWidth - 4,
        height: Math.max(noteHeight, 14),
        backgroundColor: isActive ? '#00E5FF' : '#B388FF80',
        borderRadius: 4,
        borderWidth: isActive ? 1 : 0,
        borderColor: '#00E5FF',
        shadowColor: isActive ? '#00E5FF' : 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: isActive ? 0.8 : 0,
        shadowRadius: isActive ? 8 : 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 7, color: '#fff', fontWeight: '700' }}>
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
          <Ionicons name="play-circle" size={24} color="#555570" style={{ marginTop: 6 }} />
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
  const [currentBeat, setCurrentBeat] = useState(-4); // Start 4 beats before
  const [tempo, setTempo] = useState(100);
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
        (n) => n.startBeat <= currentBeat && n.startBeat + n.duration > currentBeat
      )
      .map((n) => n.key % 12);
  }, [selectedSong, currentBeat]);

  const startPlayback = useCallback(() => {
    if (!selectedSong) return;
    setIsPlaying(true);
    const bpm = (selectedSong.bpm * tempo) / 100;
    const intervalMs = (60 / bpm) * 250; // quarter of a beat

    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: intervalMs * 2, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: intervalMs * 2, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    intervalRef.current = setInterval(() => {
      setCurrentBeat((prev) => {
        const maxBeat = Math.max(...selectedSong.notes.map((n) => n.startBeat + n.duration));
        if (prev >= maxBeat + 2) {
          stopPlayback();
          return -4;
        }
        return prev + 0.25;
      });
    }, intervalMs);
  }, [selectedSong, tempo, pulseAnim]);

  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    cancelAnimation(pulseAnim);
    pulseAnim.value = 1;
  }, [pulseAnim]);

  const resetPlayback = useCallback(() => {
    stopPlayback();
    setCurrentBeat(-4);
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
    setState('playing');
  }, []);

  if (state === 'playing' && selectedSong) {
    return (
      <SafeAreaView className="flex-1 bg-deep-black">
        {/* Header */}
        <View className="flex-row items-center px-5 pt-2 pb-3">
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
              {selectedSong.artist} · {selectedSong.timeSignature}
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
          {/* Guide line */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              backgroundColor: '#00E5FF40',
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
        <View className="px-5 py-4">
          {/* Tempo Slider */}
          <View className="flex-row items-center justify-between mb-4">
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

          {/* Play Controls */}
          <View className="flex-row items-center justify-center" style={{ gap: 16 }}>
            <AnimatedButton
              title="Reset"
              onPress={resetPlayback}
              variant="secondary"
              size="sm"
              icon={<Ionicons name="refresh" size={16} color="#EAEAF0" />}
            />
            <AnimatedButton
              title={isPlaying ? 'Pause' : 'Play'}
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

        {/* Piano Keyboard */}
        <View className="pb-4">
          <PianoKeyboard
            highlightedKeys={highlightedKeys}
            octaves={2}
            compact
            onKeyPress={(key) => {
              // Visual feedback handled by keyboard component
            }}
          />
        </View>
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4 mb-4"
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {SONG_CATEGORIES.map((cat) => (
          <Pressable
            key={cat.key}
            onPress={() => setActiveCategory(cat.key)}
            style={{
              paddingHorizontal: 18,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor:
                activeCategory === cat.key ? '#00E5FF20' : '#12121A',
              borderWidth: 1,
              borderColor:
                activeCategory === cat.key ? '#00E5FF' : '#2A2A3A',
              marginRight: 8,
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
