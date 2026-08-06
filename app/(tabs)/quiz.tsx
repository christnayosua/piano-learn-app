import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeIn, SlideInRight } from 'react-native-reanimated';
import StatsBanner from '../../components/StatsBanner';
import PianoKeyboard from '../../components/PianoKeyboard';
import QuizCard from '../../components/QuizCard';
import AnimatedButton from '../../components/AnimatedButton';
import StaffNotation from '../../components/StaffNotation';
import { NOTE_QUIZ, CHORD_QUIZ, EAR_QUIZ, SIGHT_QUIZ, type QuizQuestion, type QuizType } from '../../data/quizzes';
import { useAppStore } from '../../store/useAppStore';
import { playNoteSound } from '../../utils/sound';

type QuizMode = 'menu' | 'playing' | 'result';

export default function QuizScreen() {
  const { xp, streak, level, recordQuizAnswer, recordQuizScore, quizHighScores } = useAppStore();
  const [mode, setMode] = useState<QuizMode>('menu');
  const [quizType, setQuizType] = useState<QuizType>('note');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const questions = useMemo(() => {
    let pool = NOTE_QUIZ;
    if (quizType === 'chord') pool = CHORD_QUIZ;
    if (quizType === 'ear') pool = EAR_QUIZ;
    if (quizType === 'sight') pool = SIGHT_QUIZ;
    return [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
  }, [quizType, mode]);

  const currentQuestion = questions[currentIndex];

  const startQuiz = useCallback((type: QuizType) => {
    setQuizType(type);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setTotalQuestions(0);
    setMode('playing');
    const firstQ = (type === 'ear' ? EAR_QUIZ : type === 'chord' ? CHORD_QUIZ : type === 'sight' ? SIGHT_QUIZ : NOTE_QUIZ)[0];
    if (type === 'ear' && firstQ?.audioNote !== undefined) {
      playNoteSound(firstQ.audioNote, 4);
    }
  }, []);

  const handleAnswer = useCallback(
    (answer: string, isCorrect: boolean) => {
      setSelectedAnswer(answer);
      setTotalQuestions((prev) => prev + 1);
      recordQuizAnswer(isCorrect);
      const newScore = score + (isCorrect ? 1 : 0);
      if (isCorrect) {
        setScore(newScore);
      }

      // Auto-advance after delay
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setSelectedAnswer(null);
        } else {
          recordQuizScore(quizType, newScore);
          setMode('result');
        }
      }, 1200);
    },
    [currentIndex, questions.length, recordQuizAnswer, recordQuizScore, quizType, score]
  );

  // Result Screen
  if (mode === 'result') {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPerfect = percentage === 100;
    const isGood = percentage >= 60;

    return (
      <SafeAreaView className="flex-1 bg-deep-black">
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
          <Animated.View entering={FadeIn.duration(600)} className="items-center">
            {/* Result Icon */}
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: isPerfect ? '#00E5FF20' : isGood ? '#B388FF20' : '#FF6BCD20',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
              }}
            >
              <Text style={{ fontSize: 44 }}>
                {isPerfect ? '🏆' : isGood ? '🎉' : '💪'}
              </Text>
            </View>

            <Text className="text-text-primary font-bold" style={{ fontSize: 28 }}>
              {isPerfect ? 'Perfect!' : isGood ? 'Great Job!' : 'Keep Practicing!'}
            </Text>

            <Text className="text-text-secondary mt-2" style={{ fontSize: 15 }}>
              You scored {score} out of {totalQuestions}
            </Text>

            {/* Score Ring */}
            <View className="mt-8 mb-8">
              <LinearGradient
                colors={['#12121A', '#1A1A25']}
                style={{
                  borderRadius: 20,
                  padding: 24,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#2A2A3A',
                  width: 200,
                }}
              >
                <Text
                  style={{
                    fontSize: 48,
                    fontWeight: '900',
                    color: isPerfect ? '#00E5FF' : isGood ? '#B388FF' : '#FF6BCD',
                  }}
                >
                  {percentage}%
                </Text>
                <Text className="text-text-secondary mt-2" style={{ fontSize: 12 }}>
                  Accuracy
                </Text>
              </LinearGradient>
            </View>

            {/* XP Earned */}
            <View
              style={{
                backgroundColor: '#FFD74020',
                borderRadius: 12,
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginBottom: 24,
              }}
            >
              <Text style={{ color: '#FFD740', fontSize: 15, fontWeight: '700' }}>
                +{score * 10} XP earned!
              </Text>
            </View>

            {/* Actions */}
            <View style={{ gap: 12, width: '100%' }}>
              <AnimatedButton
                title="Try Again"
                onPress={() => startQuiz(quizType)}
                variant="primary"
                size="lg"
                icon={<Ionicons name="refresh" size={18} color="#0A0A0F" />}
              />
              <AnimatedButton
                title="Back to Menu"
                onPress={() => setMode('menu')}
                variant="outline"
                size="md"
              />
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Playing Mode
  if (mode === 'playing' && currentQuestion) {
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
      <SafeAreaView className="flex-1 bg-deep-black">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Progress Bar */}
          <View className="px-5 pt-4 pb-2">
            <View className="flex-row items-center justify-between mb-2">
              <Pressable onPress={() => setMode('menu')}>
                <Ionicons name="close" size={24} color="#8888A0" />
              </Pressable>
              <Text className="text-text-secondary" style={{ fontSize: 12, fontWeight: '600' }}>
                {currentIndex + 1} / {questions.length}
              </Text>
              <View
                style={{
                  backgroundColor: '#FFD74020',
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}
              >
                <Text style={{ color: '#FFD740', fontSize: 12, fontWeight: '700' }}>
                  {score} ✓
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 4,
                backgroundColor: '#1A1A25',
                borderRadius: 2,
              }}
            >
              <LinearGradient
                colors={['#00E5FF', '#B388FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  height: 4,
                  borderRadius: 2,
                  width: `${progress}%`,
                }}
              />
            </View>
          </View>

          {/* Visual Staff Note */}
          {currentQuestion.staffNote && (
            <Animated.View entering={FadeInUp.duration(400)} className="mt-4 mb-2 items-center">
              <StaffNotation
                notes={[{
                  key: currentQuestion.staffNote.key,
                  octave: currentQuestion.staffNote.octave,
                  duration: currentQuestion.staffNote.duration ?? 1,
                }]}
                clef={currentQuestion.staffClef ?? 'treble'}
                width={320}
                height={120}
                showNoteLabels={selectedAnswer !== null}
                highlightNoteIndex={0}
              />
            </Animated.View>
          )}

          {/* Piano hint */}
          {currentQuestion.highlightKeys && !currentQuestion.staffNote && (
            <Animated.View entering={SlideInRight.duration(400)} className="mt-4 mb-6">
              <PianoKeyboard
                highlightedKeys={currentQuestion.highlightKeys}
                octaves={1}
                compact
              />
            </Animated.View>
          )}

          {/* Quiz Card */}
          <Animated.View entering={FadeInUp.duration(400)} className="mt-2">
            <QuizCard
              question={currentQuestion.question}
              options={currentQuestion.options}
              correctAnswer={currentQuestion.correctAnswer}
              onAnswer={handleAnswer}
              selectedAnswer={selectedAnswer}
              disabled={selectedAnswer !== null}
            />
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Menu
  return (
    <SafeAreaView className="flex-1 bg-deep-black">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-4 pb-2">
          <Text className="text-text-primary font-bold" style={{ fontSize: 26 }}>
            Quiz
          </Text>
          <Text className="text-text-secondary mt-1" style={{ fontSize: 13 }}>
            Test your music knowledge
          </Text>
        </View>

        {/* Stats */}
        <View className="mt-4 mb-6">
          <StatsBanner xp={xp} streak={streak} level={level} />
        </View>

        {/* Quiz Types */}
        <View className="px-5">
          <Text
            className="text-text-primary font-bold mb-4"
            style={{ fontSize: 18 }}
          >
            Choose a Quiz
          </Text>

          {/* Guess the Note */}
          <Animated.View entering={FadeInUp.delay(100).duration(400)}>
            <Pressable
              onPress={() => startQuiz('note')}
              style={{
                backgroundColor: '#12121A',
                borderRadius: 20,
                padding: 20,
                borderWidth: 1,
                borderColor: '#2A2A3A',
                marginBottom: 14,
              }}
            >
              <View className="flex-row items-center">
                <LinearGradient
                  colors={['#00E5FF20', '#00E5FF10']}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 28 }}>🎵</Text>
                </LinearGradient>
                <View className="flex-1 ml-4">
                  <Text className="text-text-primary font-bold" style={{ fontSize: 16 }}>
                    Guess the Note
                  </Text>
                  <Text className="text-text-secondary mt-1" style={{ fontSize: 12 }}>
                    Identify notes on the keyboard
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#555570" />
              </View>
              <View className="flex-row mt-3" style={{ gap: 8 }}>
                <View
                  style={{
                    backgroundColor: '#00E5FF10',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ color: '#00E5FF', fontSize: 10, fontWeight: '700' }}>
                    8 QUESTIONS
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#1A1A25',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ color: '#8888A0', fontSize: 10, fontWeight: '600' }}>
                    BEGINNER
                  </Text>
                </View>
              </View>
            </Pressable>
          </Animated.View>

          {/* Guess the Chord */}
          <Animated.View entering={FadeInUp.delay(200).duration(400)}>
            <Pressable
              onPress={() => startQuiz('chord')}
              style={{
                backgroundColor: '#12121A',
                borderRadius: 20,
                padding: 20,
                borderWidth: 1,
                borderColor: '#2A2A3A',
                marginBottom: 14,
              }}
            >
              <View className="flex-row items-center">
                <LinearGradient
                  colors={['#B388FF20', '#B388FF10']}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 28 }}>🎹</Text>
                </LinearGradient>
                <View className="flex-1 ml-4">
                  <Text className="text-text-primary font-bold" style={{ fontSize: 16 }}>
                    Guess the Chord
                  </Text>
                  <Text className="text-text-secondary mt-1" style={{ fontSize: 12 }}>
                    Identify chords from key patterns
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#555570" />
              </View>
              <View className="flex-row mt-3" style={{ gap: 8 }}>
                <View
                  style={{
                    backgroundColor: '#B388FF10',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ color: '#B388FF', fontSize: 10, fontWeight: '700' }}>
                    8 QUESTIONS
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#1A1A25',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ color: '#8888A0', fontSize: 10, fontWeight: '600' }}>
                    INTERMEDIATE
                  </Text>
                </View>
              </View>
            </Pressable>
          </Animated.View>

          {/* Ear Training */}
          <Animated.View entering={FadeInUp.delay(300).duration(400)}>
            <Pressable
              onPress={() => startQuiz('ear')}
              style={{
                backgroundColor: '#12121A',
                borderRadius: 20,
                padding: 20,
                borderWidth: 1,
                borderColor: '#2A2A3A',
                marginBottom: 14,
              }}
            >
              <View className="flex-row items-center">
                <LinearGradient
                  colors={['#FF6BCD20', '#FF6BCD10']}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 28 }}>👂</Text>
                </LinearGradient>
                <View className="flex-1 ml-4">
                  <Text className="text-text-primary font-bold" style={{ fontSize: 16 }}>
                    Ear Training
                  </Text>
                  <Text className="text-text-secondary mt-1" style={{ fontSize: 12 }}>
                    Recognize notes and pitch by ear
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#555570" />
              </View>
              <View className="flex-row mt-3" style={{ gap: 8 }}>
                <View
                  style={{
                    backgroundColor: '#FF6BCD10',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ color: '#FF6BCD', fontSize: 10, fontWeight: '700' }}>
                    AUDIO QUIZ
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#1A1A25',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ color: '#8888A0', fontSize: 10, fontWeight: '600' }}>
                    ADVANCED
                  </Text>
                </View>
              </View>
            </Pressable>
          </Animated.View>

          {/* Sight Reading */}
          <Animated.View entering={FadeInUp.delay(400).duration(400)}>
            <Pressable
              onPress={() => startQuiz('sight')}
              style={{
                backgroundColor: '#12121A',
                borderRadius: 20,
                padding: 20,
                borderWidth: 1,
                borderColor: '#2A2A3A',
                marginBottom: 14,
              }}
            >
              <View className="flex-row items-center">
                <LinearGradient
                  colors={['#FFD74020', '#FFD74010']}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 28 }}>🎼</Text>
                </LinearGradient>
                <View className="flex-1 ml-4">
                  <Text className="text-text-primary font-bold" style={{ fontSize: 16 }}>
                    Sight Reading
                  </Text>
                  <Text className="text-text-secondary mt-1" style={{ fontSize: 12 }}>
                    Read staff notation and keyboard positions
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#555570" />
              </View>
              <View className="flex-row mt-3" style={{ gap: 8 }}>
                <View
                  style={{
                    backgroundColor: '#FFD74010',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ color: '#FFD740', fontSize: 10, fontWeight: '700' }}>
                    STAFF READ
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#1A1A25',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ color: '#8888A0', fontSize: 10, fontWeight: '600' }}>
                    PRO
                  </Text>
                </View>
              </View>
            </Pressable>
          </Animated.View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
