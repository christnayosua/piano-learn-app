import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import ProgressRing from './ProgressRing';
import { SECTIONS, type Lesson, type LessonSection } from '../data/curriculum';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface RoadmapNodeProps {
  lesson: Lesson;
  index: number;
  isCurrent: boolean;
  onPress: (lesson: Lesson) => void;
}

const sectionColor = (section: LessonSection): string => {
  return SECTIONS.find((s) => s.key === section)?.color ?? '#00E5FF';
};

export default function RoadmapNode({ lesson, index, isCurrent, onPress }: RoadmapNodeProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.92, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const color = sectionColor(lesson.section);
  const isCompleted = lesson.progress === 100;
  const isLocked = lesson.isLocked;

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 80).duration(400).springify()}
      className="mb-4"
    >
      <AnimatedPressable
        onPress={() => !isLocked && onPress(lesson)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isLocked}
        style={[
          animatedStyle,
          {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: isCurrent ? '#1A1A25' : '#12121A',
            borderRadius: 16,
            padding: 16,
            borderWidth: isCurrent ? 1.5 : 1,
            borderColor: isCurrent ? color : '#2A2A3A',
            opacity: isLocked ? 0.5 : 1,
            shadowColor: isCurrent ? color : 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: isCurrent ? 0.3 : 0,
            shadowRadius: isCurrent ? 12 : 0,
            elevation: isCurrent ? 8 : 0,
          },
        ]}
      >
        {/* Progress Ring with Icon */}
        <ProgressRing progress={lesson.progress} size={52} strokeWidth={3} color={color}>
          {isLocked ? (
            <Ionicons name="lock-closed" size={18} color="#555570" />
          ) : isCompleted ? (
            <Ionicons name="checkmark-circle" size={22} color={color} />
          ) : (
            <Ionicons name={lesson.icon as any} size={20} color={color} />
          )}
        </ProgressRing>

        {/* Lesson Info */}
        <View className="flex-1 ml-4">
          <Text
            className="text-text-primary font-bold"
            style={{ fontSize: 15 }}
            numberOfLines={1}
          >
            {lesson.title}
          </Text>
          <Text
            className="text-text-secondary mt-1"
            style={{ fontSize: 12 }}
            numberOfLines={2}
          >
            {lesson.description}
          </Text>
        </View>

        {/* Status indicator */}
        <View className="ml-3">
          {isCompleted ? (
            <View
              style={{
                backgroundColor: color + '20',
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}
            >
              <Text style={{ color, fontSize: 10, fontWeight: '700' }}>DONE</Text>
            </View>
          ) : isCurrent ? (
            <Ionicons name="play-circle" size={28} color={color} />
          ) : !isLocked ? (
            <Ionicons name="chevron-forward" size={20} color="#555570" />
          ) : null}
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
}
