import React, { useMemo } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import StatsBanner from '../../components/StatsBanner';
import RoadmapNode from '../../components/RoadmapNode';
import { CURRICULUM, SECTIONS, type Lesson, type LessonSection } from '../../data/curriculum';
import { useAppStore } from '../../store/useAppStore';

export default function HomeScreen() {
  const { xp, streak, level, lessonProgress, completedLessons } = useAppStore();

  const enrichedLessons = useMemo(() => {
    return CURRICULUM.map((lesson) => ({
      ...lesson,
      progress: lessonProgress[lesson.id] ?? lesson.progress,
      isLocked: lesson.isLocked && !completedLessons.includes(lesson.id),
    }));
  }, [lessonProgress, completedLessons]);

  const currentLessonId = useMemo(() => {
    const firstIncomplete = enrichedLessons.find(
      (l) => !l.isLocked && l.progress < 100
    );
    return firstIncomplete?.id ?? enrichedLessons[0].id;
  }, [enrichedLessons]);

  const groupedBySection = useMemo(() => {
    const groups: Record<LessonSection, Lesson[]> = {
      basics: [],
      intermediate: [],
      advanced: [],
      professional: [],
    };
    enrichedLessons.forEach((lesson) => {
      groups[lesson.section].push(lesson);
    });
    return groups;
  }, [enrichedLessons]);

  const handleLessonPress = (lesson: Lesson) => {
    // In a full app, navigate to lesson detail screen
    useAppStore.getState().updateLessonProgress(lesson.id, Math.min(lesson.progress + 25, 100));
  };

  return (
    <SafeAreaView className="flex-1 bg-deep-black">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View
          entering={FadeInDown.duration(600)}
          className="px-5 pt-4 pb-2"
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-text-secondary" style={{ fontSize: 14 }}>
                Welcome back 👋
              </Text>
              <Text
                className="text-text-primary font-bold mt-1"
                style={{ fontSize: 26 }}
              >
                Piano Journey
              </Text>
            </View>
            <Pressable
              style={{
                backgroundColor: '#12121A',
                borderRadius: 14,
                padding: 10,
                borderWidth: 1,
                borderColor: '#2A2A3A',
              }}
            >
              <Ionicons name="notifications-outline" size={22} color="#8888A0" />
            </Pressable>
          </View>
        </Animated.View>

        {/* Stats Banner */}
        <View className="mt-4 mb-6">
          <StatsBanner xp={xp} streak={streak} level={level} />
        </View>

        {/* Current Lesson Quick Access */}
        <Animated.View entering={FadeInUp.delay(200).duration(500)} className="px-5 mb-6">
          <Pressable onPress={() => {
            const current = enrichedLessons.find((l) => l.id === currentLessonId);
            if (current) handleLessonPress(current);
          }}>
            <LinearGradient
              colors={['#00E5FF20', '#B388FF10']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 20,
                padding: 20,
                borderWidth: 1,
                borderColor: '#00E5FF40',
              }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text style={{ color: '#00E5FF', fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>
                    CONTINUE LEARNING
                  </Text>
                  <Text className="text-text-primary font-bold mt-2" style={{ fontSize: 17 }}>
                    {enrichedLessons.find((l) => l.id === currentLessonId)?.title}
                  </Text>
                  <Text className="text-text-secondary mt-1" style={{ fontSize: 12 }}>
                    {enrichedLessons.find((l) => l.id === currentLessonId)?.description}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#00E5FF',
                    borderRadius: 16,
                    width: 48,
                    height: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#00E5FF',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.6,
                    shadowRadius: 12,
                    elevation: 8,
                  }}
                >
                  <Ionicons name="play" size={22} color="#0A0A0F" />
                </View>
              </View>
            </LinearGradient>
          </Pressable>
        </Animated.View>

        {/* Roadmap */}
        <View className="px-5 pb-8">
          {SECTIONS.map((section) => {
            const lessons = groupedBySection[section.key];
            if (lessons.length === 0) return null;

            return (
              <View key={section.key} className="mb-6">
                {/* Section Header */}
                <Animated.View
                  entering={FadeInUp.delay(100).duration(400)}
                  className="flex-row items-center mb-3"
                >
                  <View
                    style={{
                      width: 4,
                      height: 20,
                      backgroundColor: section.color,
                      borderRadius: 2,
                      marginRight: 10,
                    }}
                  />
                  <Text style={{ color: section.color, fontSize: 14, fontWeight: '800', letterSpacing: 1 }}>
                    {section.label.toUpperCase()}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: section.color + '30',
                      marginLeft: 12,
                    }}
                  />
                </Animated.View>

                {/* Lessons */}
                {lessons.map((lesson, index) => (
                  <RoadmapNode
                    key={lesson.id}
                    lesson={lesson}
                    index={index}
                    isCurrent={lesson.id === currentLessonId}
                    onPress={handleLessonPress}
                  />
                ))}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
