import React, { useCallback } from 'react';
import { Text, Pressable, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
}

export default function AnimatedButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  style,
  disabled = false,
}: AnimatedButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  }, [scale]);

  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  }, [onPress]);

  const paddingMap = { sm: 10, md: 14, lg: 18 };
  const textSizeMap = { sm: 13, md: 15, lg: 17 };
  const padding = paddingMap[size];
  const textSize = textSizeMap[size];

  if (variant === 'outline') {
    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled}
        style={[
          animatedStyle,
          {
            paddingVertical: padding,
            paddingHorizontal: padding * 1.5,
            borderRadius: 14,
            borderWidth: 1.5,
            borderColor: '#00E5FF',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
      >
        {icon}
        <Text style={{ color: '#00E5FF', fontSize: textSize, fontWeight: '700' }}>
          {title}
        </Text>
      </AnimatedPressable>
    );
  }

  if (variant === 'secondary') {
    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled}
        style={[
          animatedStyle,
          {
            paddingVertical: padding,
            paddingHorizontal: padding * 1.5,
            borderRadius: 14,
            backgroundColor: '#1A1A25',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
      >
        {icon}
        <Text style={{ color: '#EAEAF0', fontSize: textSize, fontWeight: '600' }}>
          {title}
        </Text>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled}
      style={[animatedStyle, { borderRadius: 14, opacity: disabled ? 0.5 : 1 }, style]}
    >
      <LinearGradient
        colors={['#00E5FF', '#B388FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingVertical: padding,
          paddingHorizontal: padding * 1.5,
          borderRadius: 14,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {icon}
        <Text style={{ color: '#0A0A0F', fontSize: textSize, fontWeight: '800' }}>
          {title}
        </Text>
      </LinearGradient>
    </AnimatedPressable>
  );
}
