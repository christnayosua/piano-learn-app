import '../global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useAppStore } from '../store/useAppStore';

export default function RootLayout() {
  const loadProgress = useAppStore((s) => s.loadProgress);
  const updateStreak = useAppStore((s) => s.updateStreak);

  useEffect(() => {
    loadProgress().then(() => {
      updateStreak();
    });
  }, [loadProgress, updateStreak]);

  return (
    <View className="flex-1 bg-deep-black">
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0A0A0F' },
          animation: 'slide_from_right',
        }}
      />
    </View>
  );
}
