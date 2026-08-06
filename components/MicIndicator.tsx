import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PitchDetectionResult } from '../utils/pitchEngine';

interface MicIndicatorProps {
  isListening: boolean;
  hasPermission: boolean;
  currentRMS: number;
  detectedPitch: PitchDetectionResult | null;
  enableAINoiseClearance: boolean;
  onToggleAINoiseClearance: () => void;
  onRequestPermission: () => void;
}

export default function MicIndicator({
  isListening,
  hasPermission,
  currentRMS,
  detectedPitch,
  enableAINoiseClearance,
  onToggleAINoiseClearance,
  onRequestPermission,
}: MicIndicatorProps) {
  if (!hasPermission) {
    return (
      <View
        style={{
          backgroundColor: '#1E1424',
          borderColor: '#FF4D6D',
          borderWidth: 1,
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          marginHorizontal: 16,
          marginBottom: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="mic-off" size={16} color="#FF4D6D" style={{ marginRight: 6 }} />
          <Text style={{ color: '#EAEAF0', fontSize: 11, fontWeight: '600' }}>
            Akses Mikrofon Belum Diizinkan
          </Text>
        </View>
        <Pressable
          onPress={onRequestPermission}
          style={{
            backgroundColor: '#FF4D6D20',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#FF4D6D',
          }}
        >
          <Text style={{ color: '#FF4D6D', fontSize: 10, fontWeight: '700' }}>Aktifkan</Text>
        </Pressable>
      </View>
    );
  }

  // Calculate VU meter width percentage (0% to 100%)
  const meterWidth = Math.min(100, Math.max(5, currentRMS * 600));

  return (
    <View
      style={{
        backgroundColor: '#12121A',
        borderColor: isListening ? '#00FF8840' : '#2A2A3A',
        borderWidth: 1,
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginHorizontal: 16,
        marginBottom: 8,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Status Indicator & VU Meter */}
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: isListening ? '#00FF88' : '#8888A0',
              marginRight: 8,
            }}
          />
          <Ionicons
            name={isListening ? 'mic' : 'mic-outline'}
            size={16}
            color={isListening ? '#00FF88' : '#8888A0'}
            style={{ marginRight: 6 }}
          />
          <Text style={{ color: '#EAEAF0', fontSize: 11, fontWeight: '700', marginRight: 8 }}>
            {isListening ? 'Piano Mic Active' : 'Mic Paused'}
          </Text>

          {/* VU Level Meter Bar */}
          {isListening && (
            <View
              style={{
                height: 4,
                width: 50,
                backgroundColor: '#1A1A25',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  height: '100%',
                  width: `${meterWidth}%`,
                  backgroundColor: meterWidth > 70 ? '#FF6BCD' : '#00FF88',
                }}
              />
            </View>
          )}
        </View>

        {/* AI Noise Clearance Toggle */}
        <Pressable
          onPress={onToggleAINoiseClearance}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: enableAINoiseClearance ? '#00E5FF15' : '#1A1A25',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: enableAINoiseClearance ? '#00E5FF60' : '#2A2A3A',
          }}
        >
          <Ionicons
            name="sparkles"
            size={12}
            color={enableAINoiseClearance ? '#00E5FF' : '#8888A0'}
            style={{ marginRight: 4 }}
          />
          <Text
            style={{
              fontSize: 10,
              fontWeight: '700',
              color: enableAINoiseClearance ? '#00E5FF' : '#8888A0',
            }}
          >
            {enableAINoiseClearance ? 'AI Noise Cleared' : 'Noise Gate Off'}
          </Text>
        </Pressable>
      </View>

      {/* Detected Note Display Banner */}
      {isListening && (
        <View
          style={{
            marginTop: 6,
            paddingTop: 6,
            borderTopWidth: 1,
            borderTopColor: '#1A1A25',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {detectedPitch ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: '#00FF8820',
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: '#00FF88',
                  marginRight: 8,
                }}
              >
                <Text style={{ color: '#00FF88', fontWeight: '900', fontSize: 13 }}>
                  {detectedPitch.noteName}
                </Text>
              </View>
              <Text style={{ color: '#8888A0', fontSize: 10, fontWeight: '600' }}>
                {detectedPitch.frequency} Hz · Clarity {Math.round(detectedPitch.clarity * 100)}%
              </Text>
            </View>
          ) : (
            <Text style={{ color: '#666680', fontSize: 10, fontStyle: 'italic' }}>
              Mainkan tuts piano fisik Anda di depan mikrofon...
            </Text>
          )}

          {detectedPitch && detectedPitch.cents !== 0 && (
            <Text
              style={{
                fontSize: 9,
                fontWeight: '700',
                color: Math.abs(detectedPitch.cents) < 10 ? '#00FF88' : '#FFD700',
              }}
            >
              {detectedPitch.cents > 0 ? `+${detectedPitch.cents}c` : `${detectedPitch.cents}c`}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
