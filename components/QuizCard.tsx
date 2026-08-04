import React, { useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface QuizCardProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  selectedAnswer: string | null;
  disabled: boolean;
}

function OptionButton({
  option,
  isCorrect,
  isSelected,
  isRevealed,
  onPress,
  disabled,
  index,
}: {
  option: string;
  isCorrect: boolean;
  isSelected: boolean;
  isRevealed: boolean;
  onPress: () => void;
  disabled: boolean;
  index: number;
}) {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: translateX.value }],
  }));

  const handlePress = useCallback(() => {
    if (disabled) return;

    if (isCorrect) {
      scale.value = withSequence(
        withSpring(1.05, { damping: 10, stiffness: 400 }),
        withSpring(1, { damping: 15, stiffness: 300 })
      );
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      translateX.value = withSequence(
        withTiming(-8, { duration: 60 }),
        withTiming(8, { duration: 60 }),
        withTiming(-6, { duration: 60 }),
        withTiming(6, { duration: 60 }),
        withTiming(0, { duration: 60 })
      );
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
    onPress();
  }, [disabled, isCorrect, onPress, scale, translateX]);

  const getBorderColor = () => {
    if (!isRevealed) return '#2A2A3A';
    if (isCorrect) return '#00E5FF';
    if (isSelected && !isCorrect) return '#FF4B6E';
    return '#2A2A3A';
  };

  const getBgColor = () => {
    if (!isRevealed) return '#12121A';
    if (isCorrect) return '#00E5FF15';
    if (isSelected && !isCorrect) return '#FF4B6E15';
    return '#12121A';
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        animatedStyle,
        {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          borderRadius: 14,
          borderWidth: 1.5,
          borderColor: getBorderColor(),
          backgroundColor: getBgColor(),
          marginBottom: 10,
        },
      ]}
    >
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: isRevealed && isCorrect ? '#00E5FF' : '#1A1A25',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}
      >
        <Text
          style={{
            color: isRevealed && isCorrect ? '#0A0A0F' : '#8888A0',
            fontSize: 13,
            fontWeight: '700',
          }}
        >
          {String.fromCharCode(65 + index)}
        </Text>
      </View>
      <Text
        style={{
          color: isRevealed && isCorrect ? '#00E5FF' : '#EAEAF0',
          fontSize: 15,
          fontWeight: '600',
          flex: 1,
        }}
      >
        {option}
      </Text>
      {isRevealed && isCorrect && (
        <Text style={{ fontSize: 18 }}>✓</Text>
      )}
      {isRevealed && isSelected && !isCorrect && (
        <Text style={{ fontSize: 18, color: '#FF4B6E' }}>✗</Text>
      )}
    </AnimatedPressable>
  );
}

export default function QuizCard({
  question,
  options,
  correctAnswer,
  onAnswer,
  selectedAnswer,
  disabled,
}: QuizCardProps) {
  const isRevealed = selectedAnswer !== null;

  return (
    <View className="px-4">
      <View
        style={{
          backgroundColor: '#12121A',
          borderRadius: 20,
          padding: 20,
          borderWidth: 1,
          borderColor: '#2A2A3A',
        }}
      >
        <Text
          style={{
            color: '#EAEAF0',
            fontSize: 18,
            fontWeight: '700',
            marginBottom: 20,
            lineHeight: 26,
          }}
        >
          {question}
        </Text>

        {options.map((option, index) => (
          <OptionButton
            key={option}
            option={option}
            index={index}
            isCorrect={option === correctAnswer}
            isSelected={selectedAnswer === option}
            isRevealed={isRevealed}
            disabled={disabled}
            onPress={() => onAnswer(option, option === correctAnswer)}
          />
        ))}
      </View>
    </View>
  );
}
