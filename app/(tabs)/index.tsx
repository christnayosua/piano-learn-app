import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, SlideInUp } from 'react-native-reanimated';
import StatsBanner from '../../components/StatsBanner';
import RoadmapNode from '../../components/RoadmapNode';
import LessonModal from '../../components/LessonModal';
import AnimatedButton from '../../components/AnimatedButton';
import { CURRICULUM, SECTIONS, type Lesson, type LessonSection } from '../../data/curriculum';
import { useAppStore } from '../../store/useAppStore';

function OnboardingModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      icon: 'musical-notes',
      title: 'Welcome to PianoLearn',
      description: 'Master piano theory, reading staff notes, and playing chords through interactive gamified roadmaps.',
      color: '#00E5FF',
    },
    {
      icon: 'play-circle',
      title: 'Waterfall Practice',
      description: 'Practice your favorite songs with falling notes and real-time piano key press feedback.',
      color: '#B388FF',
    },
    {
      icon: 'trophy',
      title: 'Track Your Mastery',
      description: 'Earn XP, level up, maintain daily streaks, and test your skills with ear training quizzes.',
      color: '#FFD740',
    },
  ];

  const current = slides[slide];

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(10,10,15,0.95)', justifyContent: 'center', padding: 24 }}>
        <Animated.View
          key={slide}
          entering={SlideInUp.duration(300)}
          style={{
            backgroundColor: '#12121A',
            borderRadius: 24,
            padding: 28,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#2A2A3A',
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: current.color + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <Ionicons name={current.icon as any} size={40} color={current.color} />
          </View>

          <Text style={{ color: '#EAEAF0', fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 8 }}>
            {current.title}
          </Text>

          <Text style={{ color: '#8888A0', fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 28 }}>
            {current.description}
          </Text>

          <View className="flex-row mb-6" style={{ gap: 6 }}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={{
                  width: i === slide ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: i === slide ? current.color : '#2A2A3A',
                }}
              />
            ))}
          </View>

          <AnimatedButton
            title={slide < slides.length - 1 ? 'Next' : 'Get Started 🚀'}
            onPress={() => {
              if (slide < slides.length - 1) {
                setSlide((s) => s + 1);
              } else {
                onClose();
              }
            }}
            size="lg"
            variant="primary"
          />
        </Animated.View>
      </View>
    </Modal>
  );
}

export default function HomeScreen() {
  const { xp, streak, level, lessonProgress, completedLessons, hasSeenOnboarding, setHasSeenOnboarding } = useAppStore();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const enrichedLessons = useMemo(() => {
    return CURRICULUM.map((lesson, idx) => {
      const currentProg = lessonProgress[lesson.id] ?? lesson.progress;
      const isCompleted = completedLessons.includes(lesson.id) || currentProg === 100;

      const prevLesson = idx > 0 ? CURRICULUM[idx - 1] : null;
      const prevProg = prevLesson ? (lessonProgress[prevLesson.id] ?? prevLesson.progress) : 0;
      const isPrevCompleted = prevLesson
        ? (completedLessons.includes(prevLesson.id) || prevProg === 100)
        : true;

      const isLocked = !isCompleted && !isPrevCompleted && idx !== 0;

      return {
        ...lesson,
        progress: currentProg,
        isLocked,
      };
    });
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
    setSelectedLesson(lesson);
    setIsModalVisible(true);
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

        {/* Daily Challenge Card */}
        <Animated.View entering={FadeInUp.delay(150).duration(400)} className="px-5 mb-6">
          <LinearGradient
            colors={['#00E5FF15', '#B388FF10']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderRadius: 20,
              padding: 18,
              borderWidth: 1,
              borderColor: '#00E5FF40',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: '#00E5FF20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 14,
              }}
            >
              <Text style={{ fontSize: 24 }}>🎯</Text>
            </View>

            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="text-text-primary font-bold" style={{ fontSize: 15 }}>
                  Daily Challenge
                </Text>
                <View
                  style={{
                    backgroundColor: '#FFD74020',
                    borderRadius: 6,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    marginLeft: 8,
                  }}
                >
                  <Text style={{ color: '#FFD740', fontSize: 9, fontWeight: '800' }}>
                    +50 XP
                  </Text>
                </View>
              </View>
              <Text className="text-text-secondary mt-1" style={{ fontSize: 12 }}>
                Play C Major scale & 3 chords today
              </Text>
            </View>

            <Pressable
              onPress={() => {
                useAppStore.getState().addXP(50);
                alert('🎉 Daily Challenge completed! Earned +50 XP!');
              }}
              style={{
                backgroundColor: '#00E5FF',
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: '#0A0A0F', fontWeight: '800', fontSize: 12 }}>
                Claim
              </Text>
            </Pressable>
          </LinearGradient>
        </Animated.View>

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
                  className="flex-row items-center mb-4"
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

                {/* Lessons - Clean Aligned Vertical Timeline */}
                <View className="py-1">
                  {lessons.map((lesson, index) => (
                    <View key={lesson.id} style={{ width: '100%' }}>
                      <RoadmapNode
                        lesson={lesson}
                        index={index}
                        isCurrent={lesson.id === currentLessonId}
                        onPress={handleLessonPress}
                      />
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Lesson Detail & Practice Modal */}
      <LessonModal
        lesson={selectedLesson}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />

      {/* Onboarding Welcome Modal */}
      <OnboardingModal
        visible={!hasSeenOnboarding}
        onClose={() => setHasSeenOnboarding(true)}
      />
    </SafeAreaView>
  );
}
