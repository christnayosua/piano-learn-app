import React from 'react';
import { View, Text } from 'react-native';
import { NOTE_NAMES, isBlackKey } from '../data/chords';

interface ChordDiagramProps {
  chordName: string;
  keys: number[];
  compact?: boolean;
}

const MINI_WHITE_KEYS = [0, 2, 4, 5, 7, 9, 11];
const MINI_BLACK_KEYS = [1, 3, 6, 8, 10];

export default function ChordDiagram({ chordName, keys, compact = false }: ChordDiagramProps) {
  const whiteKeyWidth = compact ? 18 : 24;
  const whiteKeyHeight = compact ? 50 : 70;
  const blackKeyWidth = whiteKeyWidth * 0.6;
  const blackKeyHeight = whiteKeyHeight * 0.6;

  const getBlackKeyOffset = (noteIndex: number): number => {
    const offsets: Record<number, number> = {
      1: 0.65,
      3: 1.75,
      6: 3.7,
      8: 4.75,
      10: 5.8,
    };
    return (offsets[noteIndex] ?? 0) * whiteKeyWidth + whiteKeyWidth * 0.2;
  };

  return (
    <View className="items-center">
      <View style={{ position: 'relative', flexDirection: 'row' }}>
        {/* White keys */}
        {MINI_WHITE_KEYS.map((noteIdx) => {
          const isHighlighted = keys.includes(noteIdx);
          return (
            <View
              key={`w-${noteIdx}`}
              style={{
                width: whiteKeyWidth - 1,
                height: whiteKeyHeight,
                backgroundColor: isHighlighted ? '#00E5FF' : '#EAEAF0',
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                marginHorizontal: 0.5,
                borderWidth: 0.5,
                borderColor: isHighlighted ? '#00E5FF' : '#C0C0C8',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: 2,
              }}
            >
              {isHighlighted && (
                <Text style={{ fontSize: 7, fontWeight: '700', color: '#0A0A0F' }}>
                  {NOTE_NAMES[noteIdx]}
                </Text>
              )}
            </View>
          );
        })}
        {/* Black keys */}
        {MINI_BLACK_KEYS.map((noteIdx) => {
          const isHighlighted = keys.includes(noteIdx);
          return (
            <View
              key={`b-${noteIdx}`}
              style={{
                position: 'absolute',
                left: getBlackKeyOffset(noteIdx),
                top: 0,
                width: blackKeyWidth,
                height: blackKeyHeight,
                backgroundColor: isHighlighted ? '#00E5FF' : '#1A1A25',
                borderBottomLeftRadius: 2,
                borderBottomRightRadius: 2,
                borderWidth: 0.5,
                borderColor: isHighlighted ? '#00E5FF' : '#2A2A3A',
                zIndex: 10,
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: 1,
              }}
            >
              {isHighlighted && (
                <Text style={{ fontSize: 5, fontWeight: '700', color: '#0A0A0F' }}>
                  {NOTE_NAMES[noteIdx]}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
