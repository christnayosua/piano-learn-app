import React from 'react';
import { View, Text, Pressable, StyleProp, ViewStyle } from 'react-native';
import Svg, {
  Line,
  Path,
  Ellipse,
  Text as SvgText,
  G,
  Rect,
  Circle,
} from 'react-native-svg';
import {
  getNoteStaffInfo,
  getSolfegeName,
  getNumberNotation,
  NoteStaffInfo,
} from '../utils/staffMapping';

export interface StaffDisplayNote {
  key: number; // 0-11
  octave: number; // 3-6
  duration?: number; // in beats, default 1
  hand?: 'left' | 'right';
  finger?: number; // 1-5
  label?: string; // custom label override
}

export interface StaffNotationProps {
  notes?: StaffDisplayNote[];
  clef?: 'treble' | 'bass';
  timeSignature?: string;
  width?: number;
  height?: number;
  highlightNoteIndex?: number;
  showNoteLabels?: boolean;
  labelFormat?: 'letter' | 'solfege' | 'number';
  showFingerNumbers?: boolean;
  interactive?: boolean;
  onNotePress?: (index: number) => void;
  style?: StyleProp<ViewStyle>;
}

// SVG Path for Treble Clef (G-Clef)
const TREBLE_CLEF_PATH =
  'M 14.5 35 C 13.5 35 12.5 34.2 12.5 33 C 12.5 31.5 14 30.5 15.5 30.5 C 17 30.5 18.2 31.8 18.2 33.2 C 18.2 36 15 38 11.5 38 C 7 38 4 34.5 4 30 C 4 24 9.5 18.5 15.5 14 C 18 12 20 9 20 6 C 20 3.5 18.5 2 16.5 2 C 14.5 2 13 3.5 13 5.5 C 13 6.2 13.2 7 13.5 7.8 L 13 8 C 11.5 8 10 6.5 10 4.5 C 10 1.8 13 -0.5 16.5 -0.5 C 20.5 -0.5 23.5 2 23.5 6 C 23.5 10 20.5 13.5 17.5 16 C 12.5 20 7.5 24.5 7.5 29.5 C 7.5 33.5 10 36 13.5 36 C 14.2 36 14.8 35.8 15.5 35.5 Z';

// SVG Path for Bass Clef (F-Clef)
const BASS_CLEF_PATH =
  'M 6 4 C 6 2 8 0.5 10 0.5 C 12.5 0.5 14.5 2.5 14.5 5 C 14.5 9 9 12 9 17 C 9 18 9.5 18.5 10 18.5 C 14 18.5 18 13.5 18 8.5 C 18 3.5 14.5 0 9.5 0 C 4 0 0.5 4.5 0.5 9.5 C 0.5 12.5 2 15 4 15 C 5.5 15 6.5 14 6.5 12.5 C 6.5 11 5.5 10 4.2 10 C 3.8 10 3.5 10.1 3.2 10.3 C 3 8 4 5.5 6 4 Z';

export default function StaffNotation({
  notes = [{ key: 0, octave: 4, duration: 1 }],
  clef = 'treble',
  timeSignature = '4/4',
  width = 340,
  height = 140,
  highlightNoteIndex = 0,
  showNoteLabels = true,
  labelFormat = 'letter',
  showFingerNumbers = false,
  interactive = false,
  onNotePress,
  style,
}: StaffNotationProps) {
  const lineSpacing = 10;
  const staffTopY = 35;
  const staffBottomY = staffTopY + 4 * lineSpacing; // 75px

  // X layout offsets
  const startX = timeSignature ? 85 : 65;
  const availableWidth = width - startX - 30;
  const noteSpacing =
    notes.length > 1
      ? Math.min(60, Math.max(32, availableWidth / notes.length))
      : 50;

  return (
    <View
      style={[
        {
          width,
          height,
          backgroundColor: '#12121A',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#2A2A3A',
          paddingVertical: 8,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Staff Background Glow / Container */}
        <Rect
          x={10}
          y={10}
          width={width - 20}
          height={height - 20}
          rx={12}
          fill="#161622"
        />

        {/* 5 Staff Lines */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = staffTopY + i * lineSpacing;
          return (
            <Line
              key={`staff-line-${i}`}
              x1={25}
              y1={y}
              x2={width - 25}
              y2={y}
              stroke="#3A3A50"
              strokeWidth={1.5}
            />
          );
        })}

        {/* Start / End Vertical Bar Lines */}
        <Line
          x1={25}
          y1={staffTopY}
          x2={25}
          y2={staffBottomY}
          stroke="#4A4A68"
          strokeWidth={2}
        />
        <Line
          x1={width - 25}
          y1={staffTopY}
          x2={width - 25}
          y2={staffBottomY}
          stroke="#4A4A68"
          strokeWidth={2}
        />

        {/* Clef Icon */}
        {clef === 'treble' ? (
          <G transform={`translate(32, ${staffTopY - 5}) scale(0.9)`}>
            <Path d={TREBLE_CLEF_PATH} fill="#00E5FF" />
          </G>
        ) : (
          <G transform={`translate(32, ${staffTopY + 4}) scale(1.1)`}>
            <Path d={BASS_CLEF_PATH} fill="#B388FF" />
            {/* Bass Clef Dots */}
            <Circle cx={22} cy={5} r={1.8} fill="#B388FF" />
            <Circle cx={22} cy={13} r={1.8} fill="#B388FF" />
          </G>
        )}

        {/* Time Signature */}
        {timeSignature && (
          <G transform={`translate(62, ${staffTopY + 12})`}>
            <SvgText
              x={0}
              y={0}
              fill="#8888A0"
              fontSize={14}
              fontWeight="bold"
              textAnchor="middle"
            >
              {timeSignature.split('/')[0] || '4'}
            </SvgText>
            <SvgText
              x={0}
              y={18}
              fill="#8888A0"
              fontSize={14}
              fontWeight="bold"
              textAnchor="middle"
            >
              {timeSignature.split('/')[1] || '4'}
            </SvgText>
          </G>
        )}

        {/* Notes Rendering */}
        {notes.map((note, index) => {
          const info: NoteStaffInfo = getNoteStaffInfo(
            note.key,
            note.octave,
            clef,
            note.duration ?? 1
          );

          const x = startX + index * noteSpacing;
          const y = staffBottomY - info.position * (lineSpacing / 2);
          const isHighlighted = highlightNoteIndex === index;

          const isLeftHand = note.hand === 'left';
          const activeColor = isLeftHand ? '#FF6BCD' : '#00E5FF';
          const defaultColor = '#EAEAF0';
          const noteColor = isHighlighted ? activeColor : defaultColor;

          // Note Label Text
          let labelText = note.label;
          if (!labelText) {
            if (labelFormat === 'solfege') {
              labelText = getSolfegeName(info.letter);
            } else if (labelFormat === 'number') {
              labelText = getNumberNotation(info.letter);
            } else {
              labelText = `${info.letter}${info.octave}`;
            }
          }

          return (
            <G
              key={`note-${index}-${note.key}-${note.octave}`}
              onPress={() => interactive && onNotePress?.(index)}
            >
              {/* Highlight Aura */}
              {isHighlighted && (
                <Circle
                  cx={x}
                  cy={y}
                  r={16}
                  fill={activeColor}
                  fillOpacity={0.25}
                />
              )}

              {/* Ledger Lines */}
              {info.ledgerLines.map((lp) => {
                const ly = staffBottomY - lp * (lineSpacing / 2);
                return (
                  <Line
                    key={`ledger-${index}-${lp}`}
                    x1={x - 12}
                    y1={ly}
                    x2={x + 12}
                    y2={ly}
                    stroke={isHighlighted ? activeColor : '#5A5A78'}
                    strokeWidth={1.8}
                  />
                );
              })}

              {/* Sharp (#) Accidental */}
              {info.isSharp && (
                <SvgText
                  x={x - 14}
                  y={y + 5}
                  fill={noteColor}
                  fontSize={14}
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  ♯
                </SvgText>
              )}

              {/* Note Head */}
              {info.noteType === 'whole' ? (
                <Ellipse
                  cx={x}
                  cy={y}
                  rx={6.5}
                  ry={4.5}
                  stroke={noteColor}
                  strokeWidth={2}
                  fill="none"
                  transform={`rotate(-20, ${x}, ${y})`}
                />
              ) : info.noteType === 'half' ? (
                <Ellipse
                  cx={x}
                  cy={y}
                  rx={6}
                  ry={4.2}
                  stroke={noteColor}
                  strokeWidth={2}
                  fill="none"
                  transform={`rotate(-20, ${x}, ${y})`}
                />
              ) : (
                <Ellipse
                  cx={x}
                  cy={y}
                  rx={6}
                  ry={4.2}
                  fill={noteColor}
                  transform={`rotate(-20, ${x}, ${y})`}
                />
              )}

              {/* Note Stem */}
              {info.noteType !== 'whole' && (
                <Line
                  x1={info.stemDirection === 'up' ? x + 5 : x - 5}
                  y1={y}
                  x2={info.stemDirection === 'up' ? x + 5 : x - 5}
                  y2={info.stemDirection === 'up' ? y - 26 : y + 26}
                  stroke={noteColor}
                  strokeWidth={1.8}
                />
              )}

              {/* Note Label underneath */}
              {showNoteLabels && (
                <SvgText
                  x={x}
                  y={height - 14}
                  fill={isHighlighted ? activeColor : '#8888A0'}
                  fontSize={11}
                  fontWeight={isHighlighted ? 'bold' : '600'}
                  textAnchor="middle"
                >
                  {labelText}
                </SvgText>
              )}

              {/* Finger Number above or below */}
              {showFingerNumbers && note.finger && (
                <G
                  transform={`translate(${x}, ${
                    info.stemDirection === 'up' ? y - 34 : y + 34
                  })`}
                >
                  <Circle cx={0} cy={0} r={7} fill="#2A2A3A" />
                  <SvgText
                    x={0}
                    y={3.5}
                    fill="#00E5FF"
                    fontSize={9}
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {note.finger}
                  </SvgText>
                </G>
              )}
            </G>
          );
        })}
      </Svg>
    </View>
  );
}
