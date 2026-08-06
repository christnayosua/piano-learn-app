import React from 'react';
import { View, Text, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import StatsBanner from '../../components/StatsBanner';
import AnimatedButton from '../../components/AnimatedButton';
import { useAppStore } from '../../store/useAppStore';
import { ACHIEVEMENTS } from '../../data/achievements';

export default function ProfileScreen() {
  const {
    xp,
    streak,
    level,
    completedLessons,
    quizHighScores,
    totalQuizAttempted,
    totalQuizCorrect,
    soundEnabled,
    hapticsEnabled,
    unlockedAchievements,
    toggleSound,
    toggleHaptics,
    resetProgress,
  } = useAppStore();

  const quizAccuracy = totalQuizAttempted > 0 
    ? Math.round((totalQuizCorrect / totalQuizAttempted) * 100) 
    : 0;

  const handleReset = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all your learning progress and XP? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => resetProgress() },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-deep-black">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View className="px-5 pt-4 pb-2">
          <Text className="text-text-primary font-bold" style={{ fontSize: 26 }}>
            Profile & Settings
          </Text>
          <Text className="text-text-secondary mt-1" style={{ fontSize: 13 }}>
            Track your accomplishments and preferences
          </Text>
        </View>

        {/* User Card */}
        <Animated.View entering={FadeInUp.delay(100).duration(400)} className="px-5 mt-4 mb-4">
          <LinearGradient
            colors={['#1A1A25', '#12121A']}
            style={{
              borderRadius: 20,
              padding: 20,
              borderWidth: 1,
              borderColor: '#2A2A3A',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#00E5FF20',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: '#00E5FF',
              }}
            >
              <Ionicons name="person" size={30} color="#00E5FF" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-text-primary font-bold" style={{ fontSize: 18 }}>
                Piano Learner
              </Text>
              <Text className="text-text-secondary mt-1" style={{ fontSize: 12 }}>
                Level {level} Maestro · {xp} Total XP
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Stats */}
        <View className="mb-6">
          <StatsBanner xp={xp} streak={streak} level={level} />
        </View>

        {/* Detailed Achievements Grid */}
        <View className="px-5 mb-6">
          <Text className="text-text-primary font-bold mb-3" style={{ fontSize: 18 }}>
            Learning Summary
          </Text>
          
          <View className="flex-row mb-3" style={{ gap: 12 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#12121A',
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: '#2A2A3A',
              }}
            >
              <Ionicons name="checkmark-circle" size={24} color="#00E5FF" style={{ marginBottom: 8 }} />
              <Text style={{ color: '#EAEAF0', fontSize: 20, fontWeight: '800' }}>
                {completedLessons.length}
              </Text>
              <Text style={{ color: '#8888A0', fontSize: 11, fontWeight: '600', marginTop: 2 }}>
                Lessons Completed
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: '#12121A',
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: '#2A2A3A',
              }}
            >
              <Ionicons name="stats-chart" size={24} color="#B388FF" style={{ marginBottom: 8 }} />
              <Text style={{ color: '#EAEAF0', fontSize: 20, fontWeight: '800' }}>
                {quizAccuracy}%
              </Text>
              <Text style={{ color: '#8888A0', fontSize: 11, fontWeight: '600', marginTop: 2 }}>
                Quiz Accuracy
              </Text>
            </View>
          </View>

          {/* Badges */}
          <Text className="text-text-primary font-bold mt-4 mb-3" style={{ fontSize: 18 }}>
            Badges & Achievements
          </Text>
          <View className="flex-row flex-wrap justify-between" style={{ gap: 10 }}>
            {ACHIEVEMENTS.map((ach) => {
              const isUnlocked = unlockedAchievements.includes(ach.id);
              return (
                <View
                  key={ach.id}
                  style={{
                    width: '48%',
                    backgroundColor: isUnlocked ? '#12121A' : '#0E0E14',
                    borderRadius: 16,
                    padding: 14,
                    borderWidth: 1,
                    borderColor: isUnlocked ? ach.color + '40' : '#1A1A25',
                    opacity: isUnlocked ? 1 : 0.5,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      backgroundColor: isUnlocked ? ach.color + '20' : '#1A1A25',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <Ionicons name={ach.icon as any} size={20} color={isUnlocked ? ach.color : '#8888A0'} />
                  </View>
                  <Text style={{ color: '#EAEAF0', fontSize: 13, fontWeight: '700' }}>
                    {ach.title}
                  </Text>
                  <Text style={{ color: '#8888A0', fontSize: 10, marginTop: 2 }} numberOfLines={2}>
                    {ach.description}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Settings */}
        <View className="px-5 mb-6">
          <Text className="text-text-primary font-bold mb-3" style={{ fontSize: 18 }}>
            Preferences
          </Text>

          <View
            style={{
              backgroundColor: '#12121A',
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderWidth: 1,
              borderColor: '#2A2A3A',
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View className="flex-row items-center flex-1">
              <Ionicons name="volume-high" size={20} color="#8888A0" style={{ marginRight: 12 }} />
              <Text style={{ color: '#EAEAF0', fontSize: 14, fontWeight: '600' }}>
                Sound Effects
              </Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={toggleSound}
              trackColor={{ false: '#1A1A25', true: '#00E5FF40' }}
              thumbColor={soundEnabled ? '#00E5FF' : '#555570'}
            />
          </View>

          <View
            style={{
              backgroundColor: '#12121A',
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderWidth: 1,
              borderColor: '#2A2A3A',
              marginBottom: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View className="flex-row items-center flex-1">
              <Ionicons name="hand-right" size={20} color="#8888A0" style={{ marginRight: 12 }} />
              <Text style={{ color: '#EAEAF0', fontSize: 14, fontWeight: '600' }}>
                Haptic Feedback
              </Text>
            </View>
            <Switch
              value={hapticsEnabled}
              onValueChange={toggleHaptics}
              trackColor={{ false: '#1A1A25', true: '#00E5FF40' }}
              thumbColor={hapticsEnabled ? '#00E5FF' : '#555570'}
            />
          </View>

          <AnimatedButton
            title="Reset All Progress"
            onPress={handleReset}
            variant="outline"
            size="md"
            icon={<Ionicons name="trash" size={18} color="#FF4B6E" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
