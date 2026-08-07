import '../global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { ThemeProvider, DarkTheme } from '@react-navigation/native';
import { useAppStore } from '../store/useAppStore';

const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'transparent',
    card: '#0A0A0F',
    text: '#EAEAF0',
  },
};

export default function RootLayout() {
  const updateStreak = useAppStore((s) => s.updateStreak);

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  return (
    <ThemeProvider value={AppDarkTheme}>
      <View style={{ flex: 1, backgroundColor: '#0A0A0F' }}>
        <StatusBar style="light" />
        {/* Background GIF using expo-image for native animated GIF support */}
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
          <Image
            source={require('../assets/bg/learn-piano-bg.gif')}
            style={{
              width: '100%',
              height: '100%',
              opacity: 0.25,
            }}
            contentFit="cover"
            autoplay={true}
          />
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(10, 10, 15, 0.40)',
            }}
          />
        </View>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
            animation: 'slide_from_right',
          }}
        />
      </View>
    </ThemeProvider>
  );
}
