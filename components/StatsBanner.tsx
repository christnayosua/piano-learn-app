import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface StatsBannerProps {
  xp: number;
  streak: number;
  level: number;
}

function StatItem({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <View className="items-center flex-1">
      <View
        style={{
          backgroundColor: color + '20',
          borderRadius: 12,
          padding: 8,
          marginBottom: 6,
        }}
      >
        <Ionicons name={icon as any} size={20} color={color} />
      </View>
      <Text style={{ color: '#EAEAF0', fontSize: 16, fontWeight: '800' }}>{value}</Text>
      <Text style={{ color: '#8888A0', fontSize: 10, fontWeight: '600', marginTop: 2 }}>
        {label}
      </Text>
    </View>
  );
}

export default function StatsBanner({ xp, streak, level }: StatsBannerProps) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <LinearGradient
        colors={['#12121A', '#1A1A25']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 20,
          padding: 20,
          marginHorizontal: 16,
          borderWidth: 1,
          borderColor: '#2A2A3A',
        }}
      >
        <View className="flex-row justify-between">
          <StatItem icon="flash" label="XP" value={xp} color="#FFD740" />
          <View style={{ width: 1, backgroundColor: '#2A2A3A' }} />
          <StatItem icon="flame" label="STREAK" value={`${streak}🔥`} color="#FF6BCD" />
          <View style={{ width: 1, backgroundColor: '#2A2A3A' }} />
          <StatItem icon="trophy" label="LEVEL" value={level} color="#00E5FF" />
        </View>
      </LinearGradient>
    </Animated.View>
  );
}
