import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  ZoomIn,
} from 'react-native-reanimated';
import PianoKeyboard from './PianoKeyboard';
import AnimatedButton from './AnimatedButton';
import StaffNotation from './StaffNotation';
import {
  LESSON_CONTENTS,
  SECTIONS,
  type Lesson,
  type LessonSection,
} from '../data/curriculum';
import { useAppStore } from '../store/useAppStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface LessonModalProps {
  lesson: Lesson | null;
  visible: boolean;
  onClose: () => void;
}

const getSectionColor = (section?: LessonSection): string => {
  return SECTIONS.find((s) => s.key === section)?.color ?? '#00E5FF';
};

export default function LessonModal({ lesson, visible, onClose }: LessonModalProps) {
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>('theory');
  const [pressedKeys, setPressedKeys] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const completeLessonInStore = useAppStore((state) => state.completeLesson);

  useEffect(() => {
    if (visible) {
      setActiveTab('theory');
      setPressedKeys([]);
      setIsFinished(false);
    }
  }, [visible, lesson]);

  if (!lesson) return null;

  const content = LESSON_CONTENTS[lesson.id] ?? {
    theoryTitle: lesson.title,
    theoryParagraphs: [lesson.description],
    keyPoints: ['Master the core concepts of this lesson.', 'Practice regularly on the interactive keyboard.'],
    practiceTitle: 'Interactive Practice',
    practiceInstruction: 'Tap the keys below to practice and hear the notes.',
    highlightedKeys: [0, 4, 7],
  };

  const sectionColor = getSectionColor(lesson.section);

  const handleKeyPress = (keyIndex: number) => {
    const noteIdx = keyIndex % 12;
    if (!pressedKeys.includes(noteIdx)) {
      setPressedKeys((prev) => [...prev, noteIdx]);
    }
  };

  const handleComplete = () => {
    completeLessonInStore(lesson.id);
    setIsFinished(true);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Top Header Navigation */}
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#8888A0" />
          </Pressable>

          <View style={styles.headerCenter}>
            <View style={[styles.sectionBadge, { backgroundColor: sectionColor + '20' }]}>
              <Text style={[styles.sectionBadgeText, { color: sectionColor }]}>
                {lesson.section.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {lesson.title}
            </Text>
          </View>

          <View style={styles.headerRight}>
            <Ionicons name={lesson.icon as any} size={22} color={sectionColor} />
          </View>
        </View>

        {/* Success Modal Overlay when Lesson Finished */}
        {isFinished ? (
          <Animated.View entering={ZoomIn.duration(400)} style={styles.finishedContainer}>
            <LinearGradient
              colors={[sectionColor + '30', '#12121A']}
              style={styles.finishedCard}
            >
              <View style={[styles.finishedIconCircle, { backgroundColor: sectionColor }]}>
                <Ionicons name="checkmark" size={48} color="#0A0A0F" />
              </View>
              <Text style={styles.finishedTitle}>Lesson Completed!</Text>
              <Text style={styles.finishedSub}>
                You earned <Text style={{ color: '#00E5FF', fontWeight: '800' }}>+50 XP</Text> and progressed your Piano Journey!
              </Text>

              <View style={styles.rewardRow}>
                <View style={styles.rewardBadge}>
                  <Ionicons name="flash" size={20} color="#FFD740" />
                  <Text style={styles.rewardText}>+50 XP</Text>
                </View>
                <View style={styles.rewardBadge}>
                  <Ionicons name="trophy" size={20} color="#00E5FF" />
                  <Text style={styles.rewardText}>Lesson Unlocked</Text>
                </View>
              </View>

              <AnimatedButton
                title="Continue Roadmap"
                onPress={onClose}
                size="lg"
                style={{ width: '100%', marginTop: 24 }}
              />
            </LinearGradient>
          </Animated.View>
        ) : (
          <>
            {/* Tab Selector */}
            <View style={styles.tabContainer}>
              <Pressable
                onPress={() => setActiveTab('theory')}
                style={[
                  styles.tabButton,
                  activeTab === 'theory' && {
                    backgroundColor: '#1A1A25',
                    borderColor: sectionColor,
                  },
                ]}
              >
                <Ionicons
                  name="book-outline"
                  size={18}
                  color={activeTab === 'theory' ? sectionColor : '#8888A0'}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'theory' && { color: '#FFFFFF', fontWeight: '700' },
                  ]}
                >
                  Theory & Concepts
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setActiveTab('practice')}
                style={[
                  styles.tabButton,
                  activeTab === 'practice' && {
                    backgroundColor: '#1A1A25',
                    borderColor: sectionColor,
                  },
                ]}
              >
                <Ionicons
                  name="musical-notes-outline"
                  size={18}
                  color={activeTab === 'practice' ? sectionColor : '#8888A0'}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'practice' && { color: '#FFFFFF', fontWeight: '700' },
                  ]}
                >
                  Interactive Practice
                </Text>
              </Pressable>
            </View>

            {/* Scrollable Content */}
            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
              {activeTab === 'theory' ? (
                <Animated.View entering={FadeInDown.duration(400)}>
                  {/* Theory Hero Box */}
                  <LinearGradient
                    colors={['#1A1A25', '#12121A']}
                    style={styles.heroBox}
                  >
                    <Ionicons name="sparkles" size={24} color={sectionColor} style={{ marginBottom: 8 }} />
                    <Text style={styles.heroTitle}>{content.theoryTitle}</Text>
                    {content.theoryParagraphs.map((para, idx) => (
                      <Text key={idx} style={styles.heroText}>
                        {para}
                      </Text>
                    ))}
                  </LinearGradient>

                  {/* Staff Notation Visual in Theory */}
                  {content.staffNotes && content.staffNotes.length > 0 && (
                    <View style={{ marginVertical: 14, alignItems: 'center' }}>
                      <Text style={{ color: '#8888A0', fontSize: 12, fontWeight: '700', marginBottom: 8 }}>
                        STAFF NOTATION VISUAL
                      </Text>
                      <StaffNotation
                        notes={content.staffNotes}
                        clef={content.staffClef ?? 'treble'}
                        width={SCREEN_WIDTH - 48}
                        showNoteLabels={true}
                      />
                    </View>
                  )}

                  {/* Key Takeaways */}
                  <View style={styles.sectionBlock}>
                    <Text style={styles.sectionHeaderTitle}>Key Takeaways</Text>
                    {content.keyPoints.map((point, idx) => (
                      <View key={idx} style={styles.keyPointRow}>
                        <View style={[styles.bullet, { backgroundColor: sectionColor }]} />
                        <Text style={styles.keyPointText}>{point}</Text>
                      </View>
                    ))}
                  </View>
                </Animated.View>
              ) : (
                <Animated.View entering={FadeInUp.duration(400)}>
                  {/* Practice Prompt */}
                  <View style={styles.practiceHeaderCard}>
                    <Ionicons name="musical-notes" size={26} color="#00E5FF" />
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={styles.practiceTitle}>{content.practiceTitle}</Text>
                      <Text style={styles.practiceInstruction}>{content.practiceInstruction}</Text>
                    </View>
                  </View>

                  {/* Staff Notation Interactive Practice Visual */}
                  {content.staffNotes && content.staffNotes.length > 0 && (
                    <View style={{ marginBottom: 14, alignItems: 'center' }}>
                      <StaffNotation
                        notes={content.staffNotes}
                        clef={content.staffClef ?? 'treble'}
                        width={SCREEN_WIDTH - 48}
                        highlightNoteIndex={pressedKeys.length % content.staffNotes.length}
                        showNoteLabels={true}
                      />
                    </View>
                  )}

                  {/* Interactive Piano Keyboard */}
                  <View style={styles.keyboardContainer}>
                    <Text style={styles.keyboardHint}>
                      Tap the highlighted keys to practice audio playback
                    </Text>
                    <PianoKeyboard
                      highlightedKeys={content.highlightedKeys}
                      onKeyPress={handleKeyPress}
                      compact={false}
                      octaves={2}
                      startOctave={4}
                    />
                  </View>
                </Animated.View>
              )}
            </ScrollView>

            {/* Footer Action Button */}
            <View style={styles.footer}>
              {activeTab === 'theory' ? (
                <AnimatedButton
                  title="Go to Interactive Practice"
                  onPress={() => setActiveTab('practice')}
                  size="lg"
                  icon={<Ionicons name="arrow-forward" size={20} color="#0A0A0F" />}
                />
              ) : (
                <AnimatedButton
                  title="Complete Lesson (+50 XP)"
                  onPress={handleComplete}
                  size="lg"
                  icon={<Ionicons name="checkmark-circle" size={20} color="#0A0A0F" />}
                />
              )}
            </View>
          </>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A25',
  },
  closeButton: {
    padding: 8,
    backgroundColor: '#12121A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A3A',
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 12,
  },
  sectionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
  sectionBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerRight: {
    padding: 8,
    backgroundColor: '#12121A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A3A',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#12121A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A3A',
    gap: 6,
  },
  tabText: {
    fontSize: 12,
    color: '#8888A0',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroBox: {
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2A3A',
    marginBottom: 20,
    marginTop: 8,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  heroText: {
    fontSize: 14,
    color: '#B0B0C0',
    lineHeight: 22,
    marginBottom: 8,
  },
  sectionBlock: {
    backgroundColor: '#12121A',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2A3A',
    marginBottom: 20,
  },
  sectionHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#00E5FF',
    marginBottom: 14,
  },
  keyPointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  keyPointText: {
    fontSize: 13,
    color: '#EAEAF0',
    flex: 1,
    lineHeight: 18,
  },
  practiceHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12121A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A3A',
    marginTop: 8,
    marginBottom: 20,
  },
  practiceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  practiceInstruction: {
    fontSize: 12,
    color: '#8888A0',
    marginTop: 2,
  },
  keyboardContainer: {
    backgroundColor: '#12121A',
    borderRadius: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#2A2A3A',
    alignItems: 'center',
    marginBottom: 24,
  },
  keyboardHint: {
    fontSize: 12,
    color: '#8888A0',
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#1A1A25',
    backgroundColor: '#0A0A0F',
  },
  finishedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  finishedCard: {
    width: '100%',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A3A',
  },
  finishedIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  finishedTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  finishedSub: {
    fontSize: 14,
    color: '#8888A0',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  rewardRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A25',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A3A',
    gap: 6,
  },
  rewardText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
