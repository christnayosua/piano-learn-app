import React, { useCallback } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { isBlackKey, NOTE_NAMES } from '../data/chords';
import { playNoteSound } from '../utils/sound';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PianoKeyboardProps {
  highlightedKeys?: number[];
  onKeyPress?: (keyIndex: number) => void;
  startOctave?: number;
  octaves?: number;
  compact?: boolean;
}

const WHITE_KEY_INDICES = [0, 2, 4, 5, 7, 9, 11]; // C D E F G A B
const BLACK_KEY_OFFSETS: Record<number, number> = {
  1: 0.65,   // C#
  3: 1.75,   // D#
  6: 3.7,    // F#
  8: 4.75,   // G#
  10: 5.8,   // A#
};

function PianoKey({
  noteIndex,
  octave = 4,
  isHighlighted,
  isBlack,
  onPress,
  whiteKeyWidth,
  compact,
}: {
  noteIndex: number;
  octave?: number;
  isHighlighted: boolean;
  isBlack: boolean;
  onPress: () => void;
  whiteKeyWidth: number;
  compact: boolean;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.94, { damping: 15, stiffness: 350 });
    playNoteSound(noteIndex, octave);
    onPress();
  }, [onPress, noteIndex, octave, scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 350 });
  }, [scale]);

  if (isBlack) {
    const blackKeyWidth = whiteKeyWidth * 0.6;
    const blackKeyHeight = compact ? 60 : 80;
    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          animatedStyle,
          {
            width: blackKeyWidth,
            height: blackKeyHeight,
            backgroundColor: isHighlighted ? '#00E5FF' : '#1A1A25',
            borderRadius: 0,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            borderWidth: 1,
            borderColor: isHighlighted ? '#00E5FF' : '#2A2A3A',
            zIndex: 10,
            position: 'absolute',
            left: (BLACK_KEY_OFFSETS[noteIndex % 12] ?? 0) * whiteKeyWidth + (whiteKeyWidth * 0.2),
            shadowColor: isHighlighted ? '#00E5FF' : '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isHighlighted ? 0.8 : 0.5,
            shadowRadius: isHighlighted ? 8 : 4,
            elevation: isHighlighted ? 8 : 4,
          },
        ]}
      >
        {isHighlighted && (
          <View className="flex-1 items-center justify-end pb-1">
            <Text className="text-deep-black text-[8px] font-bold">
              {NOTE_NAMES[noteIndex % 12]}
            </Text>
          </View>
        )}
      </AnimatedPressable>
    );
  }

  const whiteKeyHeight = compact ? 100 : 140;
  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        animatedStyle,
        {
          width: whiteKeyWidth - 2,
          height: whiteKeyHeight,
          backgroundColor: isHighlighted ? '#00E5FF' : '#EAEAF0',
          borderRadius: 0,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
          marginHorizontal: 1,
          borderWidth: 1,
          borderColor: isHighlighted ? '#00E5FF' : '#D0D0D8',
          shadowColor: isHighlighted ? '#00E5FF' : '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isHighlighted ? 0.6 : 0.2,
          shadowRadius: isHighlighted ? 8 : 3,
          elevation: isHighlighted ? 6 : 2,
        },
      ]}
    >
      <View className="flex-1 items-center justify-end pb-2">
        <Text
          style={{
            fontSize: compact ? 9 : 11,
            fontWeight: '600',
            color: isHighlighted ? '#0A0A0F' : '#555570',
          }}
        >
          {NOTE_NAMES[noteIndex % 12]}
        </Text>
      </View>
    </AnimatedPressable>
  );
}

export default function PianoKeyboard({
  highlightedKeys = [],
  onKeyPress,
  startOctave = 4,
  octaves = 2,
  compact = false,
}: PianoKeyboardProps) {
  const totalWhiteKeys = 7 * octaves;
  const keyWidth = Math.min((SCREEN_WIDTH - 32) / totalWhiteKeys, 40);

  const whiteKeys: { noteIndex: number; octave: number }[] = [];
  const blackKeys: { noteIndex: number; octave: number; octaveOffset: number }[] = [];

  for (let oct = 0; oct < octaves; oct++) {
    const currentOctave = startOctave + oct;
    WHITE_KEY_INDICES.forEach((noteIdx) => {
      whiteKeys.push({ noteIndex: noteIdx, octave: currentOctave });
    });
    Object.keys(BLACK_KEY_OFFSETS).forEach((key) => {
      const noteIdx = parseInt(key);
      blackKeys.push({
        noteIndex: noteIdx,
        octave: currentOctave,
        octaveOffset: oct,
      });
    });
  }

  const isKeyHighlighted = (noteIndex: number): boolean => {
    return highlightedKeys.includes(noteIndex % 12);
  };

  return (
    <View
      className="items-center"
      style={{ paddingHorizontal: 16 }}
    >
      <View style={{ position: 'relative', flexDirection: 'row' }}>
        {whiteKeys.map((key, index) => (
          <PianoKey
            key={`white-${key.octave}-${key.noteIndex}`}
            noteIndex={key.noteIndex}
            octave={key.octave}
            isHighlighted={isKeyHighlighted(key.noteIndex)}
            isBlack={false}
            onPress={() => onKeyPress?.(key.noteIndex)}
            whiteKeyWidth={keyWidth}
            compact={compact}
          />
        ))}
        {blackKeys.map((key) => (
          <View
            key={`black-container-${key.octave}-${key.noteIndex}`}
            style={{
              position: 'absolute',
              left: key.octaveOffset * 7 * keyWidth,
              top: 0,
            }}
            pointerEvents="box-none"
          >
            <PianoKey
              noteIndex={key.noteIndex}
              octave={key.octave}
              isHighlighted={isKeyHighlighted(key.noteIndex)}
              isBlack={true}
              onPress={() => onKeyPress?.(key.noteIndex)}
              whiteKeyWidth={keyWidth}
              compact={compact}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
