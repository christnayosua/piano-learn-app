import React from 'react';
import { View, Text } from 'react-native';
import Svg, {
  Line,
  Path,
  Ellipse,
  Text as SvgText,
  G,
  Rect,
  Circle,
} from 'react-native-svg';
import { SongNote } from '../data/songs';
import {
  getNoteStaffInfo,
  getSolfegeName,
  getNumberNotation,
} from '../utils/staffMapping';

export interface ScrollingStaffProps {
  notes: SongNote[];
  currentBeat: number;
  bpm: number;
  timeSignature?: string;
  width?: number;
  height?: number;
  labelMode?: 'letter' | 'solfege' | 'number' | 'none';
  clef?: 'treble' | 'bass';
}

const TREBLE_CLEF_PATH =
  'M 14.5 35 C 13.5 35 12.5 34.2 12.5 33 C 12.5 31.5 14 30.5 15.5 30.5 C 17 30.5 18.2 31.8 18.2 33.2 C 18.2 36 15 38 11.5 38 C 7 38 4 34.5 4 30 C 4 24 9.5 18.5 15.5 14 C 18 12 20 9 20 6 C 20 3.5 18.5 2 16.5 2 C 14.5 2 13 3.5 13 5.5 C 13 6.2 13.2 7 13.5 7.8 L 13 8 C 11.5 8 10 6.5 10 4.5 C 10 1.8 13 -0.5 16.5 -0.5 C 20.5 -0.5 23.5 2 23.5 6 C 23.5 10 20.5 13.5 17.5 16 C 12.5 20 7.5 24.5 7.5 29.5 C 7.5 33.5 10 36 13.5 36 C 14.2 36 14.8 35.8 15.5 35.5 Z';

const BASS_CLEF_PATH =
  'M 6 4 C 6 2 8 0.5 10 0.5 C 12.5 0.5 14.5 2.5 14.5 5 C 14.5 9 9 12 9 17 C 9 18 9.5 18.5 10 18.5 C 14 18.5 18 13.5 18 8.5 C 18 3.5 14.5 0 9.5 0 C 4 0 0.5 4.5 0.5 9.5 C 0.5 12.5 2 15 4 15 C 5.5 15 6.5 14 6.5 12.5 C 6.5 11 5.5 10 4.2 10 C 3.8 10 3.5 10.1 3.2 10.3 C 3 8 4 5.5 6 4 Z';

export default function ScrollingStaff({
  notes,
  currentBeat,
  bpm,
  timeSignature = '4/4',
  width = 340,
  height = 140,
  labelMode = 'letter',
  clef = 'treble',
}: ScrollingStaffProps) {
  const lineSpacing = 10;
  const staffTopY = 35;
  const staffBottomY = staffTopY + 4 * lineSpacing; // 75px

  // Cursor position (playhead fixed position in center-left)
  const cursorX = 90;
  const beatPixels = 40; // 40px per beat

  // Filter notes visible within beat window (-2 beats to +8 beats from currentBeat)
  const visibleNotes = notes.filter(
    (n) => n.startBeat >= currentBeat - 3 && n.startBeat <= currentBeat + 8
  );

  return (
    <View
      style={{
        width,
        height,
        backgroundColor: '#12121A',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#2A2A3A',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Background container */}
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
              key={`scrolling-staff-line-${i}`}
              x1={20}
              y1={y}
              x2={width - 20}
              y2={y}
              stroke="#3A3A50"
              strokeWidth={1.5}
            />
          );
        })}

        {/* Fixed Clef Icon */}
        <G transform={`translate(28, ${staffTopY - 5}) scale(0.9)`}>
          <Path d={TREBLE_CLEF_PATH} fill="#00E5FF" />
        </G>

        {/* Playhead Cursor (Red Vertical Line) */}
        <Line
          x1={cursorX}
          y1={staffTopY - 10}
          x2={cursorX}
          y2={staffBottomY + 10}
          stroke="#FF4B6E"
          strokeWidth={2}
          strokeDasharray="4 2"
        />

        {/* Floating Notes */}
        {visibleNotes.map((note, index) => {
          const info = getNoteStaffInfo(
            note.key,
            note.octave,
            clef,
            note.duration ?? 1
          );

          // Calculate horizontal X based on distance to currentBeat
          const beatsAhead = note.startBeat - currentBeat;
          const x = cursorX + beatsAhead * beatPixels;
          const y = staffBottomY - info.position * (lineSpacing / 2);

          const isActive = beatsAhead <= 0.2 && beatsAhead > -note.duration;
          const isLeftHand = note.hand === 'left';
          const baseColor = isLeftHand ? '#FF6BCD' : '#B388FF';
          const activeColor = isLeftHand ? '#FF6BCD' : '#00E5FF';
          const noteColor = isActive ? activeColor : baseColor;

          // Note Label
          let labelText = '';
          if (labelMode === 'letter') {
            labelText = `${info.letter}${info.octave}`;
          } else if (labelMode === 'solfege') {
            labelText = getSolfegeName(info.letter);
          } else if (labelMode === 'number') {
            labelText = getNumberNotation(info.letter);
          }

          return (
            <G key={`scroll-note-${index}-${note.key}-${note.startBeat}`}>
              {/* Highlight Glow when active */}
              {isActive && (
                <Circle
                  cx={x}
                  cy={y}
                  r={16}
                  fill={activeColor}
                  fillOpacity={0.3}
                />
              )}

              {/* Ledger Lines */}
              {info.ledgerLines.map((lp) => {
                const ly = staffBottomY - lp * (lineSpacing / 2);
                return (
                  <Line
                    key={`scroll-ledger-${index}-${lp}`}
                    x1={x - 12}
                    y1={ly}
                    x2={x + 12}
                    y2={ly}
                    stroke={isActive ? activeColor : '#5A5A78'}
                    strokeWidth={1.8}
                  />
                );
              })}

              {/* Sharp Accidental */}
              {info.isSharp && (
                <SvgText
                  x={x - 14}
                  y={y + 5}
                  fill={noteColor}
                  fontSize={13}
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  ♯
                </SvgText>
              )}

              {/* Note Head */}
              <Ellipse
                cx={x}
                cy={y}
                rx={6}
                ry={4.2}
                fill={noteColor}
                transform={`rotate(-20, ${x}, ${y})`}
              />

              {/* Note Stem */}
              <Line
                x1={info.stemDirection === 'up' ? x + 5 : x - 5}
                y1={y}
                x2={info.stemDirection === 'up' ? x + 5 : x - 5}
                y2={info.stemDirection === 'up' ? y - 24 : y + 24}
                stroke={noteColor}
                strokeWidth={1.8}
              />

              {/* Label below */}
              {labelMode !== 'none' && labelText !== '' && (
                <SvgText
                  x={x}
                  y={height - 14}
                  fill={isActive ? activeColor : '#8888A0'}
                  fontSize={10}
                  fontWeight={isActive ? 'bold' : '600'}
                  textAnchor="middle"
                >
                  {labelText}
                </SvgText>
              )}
            </G>
          );
        })}
      </Svg>
    </View>
  );
}
