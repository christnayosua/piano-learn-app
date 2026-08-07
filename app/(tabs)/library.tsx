import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  FlatList,
  Modal,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, SlideInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import PianoKeyboard from '../../components/PianoKeyboard';
import ChordDiagram from '../../components/ChordDiagram';
import AnimatedButton from '../../components/AnimatedButton';
import NoteGuide from '../../components/NoteGuide';
import { CHORDS, NOTE_NAMES, type Chord, type ChordCategory } from '../../data/chords';
import { SCALES, type Scale } from '../../data/scales';
import { SONGS, type Song } from '../../data/songs';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type LibraryTab = 'chords' | 'scales' | 'sheets' | 'guide';

const CHORD_CATEGORIES: { key: ChordCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'major', label: 'Major' },
  { key: 'minor', label: 'Minor' },
  { key: 'seventh', label: '7th' },
  { key: 'diminished', label: 'Dim' },
];



const DIFF_COLORS = { easy: '#00E5FF', medium: '#B388FF', hard: '#FF6BCD' };

function ScaleDetailModal({
  scale,
  visible,
  onClose,
}: {
  scale: Scale | null;
  visible: boolean;
  onClose: () => void;
}) {
  if (!scale) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
        <Animated.View
          entering={SlideInUp.duration(400)}
          style={{
            backgroundColor: '#0A0A0F',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24,
            paddingBottom: 40,
            borderWidth: 1,
            borderColor: '#2A2A3A',
          }}
        >
          <View className="items-center mb-4">
            <View style={{ width: 36, height: 4, backgroundColor: '#2A2A3A', borderRadius: 2 }} />
          </View>

          <View className="flex-row items-center justify-between mb-2">
            <View>
              <Text className="text-text-primary font-bold" style={{ fontSize: 24 }}>
                {scale.name}
              </Text>
              <Text className="text-text-secondary mt-1" style={{ fontSize: 13 }}>
                Formula: {scale.formula}
              </Text>
            </View>
            <Pressable onPress={onClose} style={{ backgroundColor: '#1A1A25', borderRadius: 12, padding: 8 }}>
              <Ionicons name="close" size={20} color="#8888A0" />
            </Pressable>
          </View>

          <Text className="text-text-secondary my-3" style={{ fontSize: 13, lineHeight: 18 }}>
            {scale.description}
          </Text>

          {/* Scale Notes */}
          <View className="flex-row items-center mt-2 mb-6">
            <Text className="text-text-secondary" style={{ fontSize: 13 }}>
              Scale Notes:{' '}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {scale.keys.map((key, i) => (
                <View
                  key={i}
                  style={{
                    backgroundColor: '#B388FF20',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    marginRight: 6,
                  }}
                >
                  <Text style={{ color: '#B388FF', fontSize: 13, fontWeight: '700' }}>
                    {NOTE_NAMES[key % 12]}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Keyboard Visual */}
          <View className="mb-6 items-center">
            <Text className="text-text-secondary mb-3 w-full text-left" style={{ fontSize: 12 }}>
              Keyboard Finger Pattern:
            </Text>
            <PianoKeyboard
              highlightedKeys={scale.keys.map((k) => k % 12)}
              octaves={1}
              compact={true}
            />
          </View>

          <AnimatedButton
            title="Close"
            onPress={onClose}
            size="lg"
            variant="secondary"
          />
        </Animated.View>
      </View>
    </Modal>
  );
}

function ChordDetailModal({
  chord,
  visible,
  onClose,
}: {
  chord: Chord | null;
  visible: boolean;
  onClose: () => void;
}) {
  if (!chord) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
        <Animated.View
          entering={SlideInUp.duration(400)}
          style={{
            backgroundColor: '#0A0A0F',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24,
            paddingBottom: 40,
            borderWidth: 1,
            borderColor: '#2A2A3A',
          }}
        >
          {/* Handle */}
          <View className="items-center mb-4">
            <View
              style={{
                width: 36,
                height: 4,
                backgroundColor: '#2A2A3A',
                borderRadius: 2,
              }}
            />
          </View>

          {/* Chord Name */}
          <View className="flex-row items-center justify-between mb-2">
            <View>
              <Text className="text-text-primary font-bold" style={{ fontSize: 24 }}>
                {chord.name}
              </Text>
              <Text className="text-text-secondary mt-1" style={{ fontSize: 13 }}>
                {chord.description}
              </Text>
            </View>
            <Pressable
              onPress={onClose}
              style={{
                backgroundColor: '#1A1A25',
                borderRadius: 12,
                padding: 8,
              }}
            >
              <Ionicons name="close" size={20} color="#8888A0" />
            </Pressable>
          </View>

          {/* Notes */}
          <View className="flex-row items-center mt-4 mb-6">
            <Text className="text-text-secondary" style={{ fontSize: 13 }}>
              Notes:{' '}
            </Text>
            {chord.keys.map((key, i) => (
              <View
                key={i}
                style={{
                  backgroundColor: '#00E5FF20',
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  marginRight: 6,
                }}
              >
                <Text style={{ color: '#00E5FF', fontSize: 13, fontWeight: '700' }}>
                  {NOTE_NAMES[key % 12]}
                </Text>
              </View>
            ))}
          </View>

          {/* Interactive Piano */}
          <View className="mb-4 items-center">
            <Text className="text-text-secondary mb-3 w-full text-left" style={{ fontSize: 12 }}>
              Keys to press:
            </Text>
            <PianoKeyboard
              highlightedKeys={chord.keys.map((k) => k % 12)}
              octaves={1}
              compact={true} 
            />
          </View>

          {/* Difficulty badge */}
          <View className="flex-row items-center mt-4">
            <View
              style={{
                backgroundColor: DIFF_COLORS[chord.difficulty] + '20',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
            >
              <Text
                style={{
                  color: DIFF_COLORS[chord.difficulty],
                  fontSize: 11,
                  fontWeight: '700',
                }}
              >
                {chord.difficulty.toUpperCase()}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#1A1A25',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 6,
                marginLeft: 8,
              }}
            >
              <Text style={{ color: '#8888A0', fontSize: 11, fontWeight: '600' }}>
                {chord.category.toUpperCase()}
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}



export default function LibraryScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<LibraryTab>('chords');
  const [activeCategory, setActiveCategory] = useState<ChordCategory | 'all'>('all');
  const [selectedChord, setSelectedChord] = useState<Chord | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedScale, setSelectedScale] = useState<Scale | null>(null);
  const [scaleModalVisible, setScaleModalVisible] = useState(false);

  const filteredChords = useMemo(() => {
    if (activeCategory === 'all') return CHORDS;
    return CHORDS.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  const openChordDetail = useCallback((chord: Chord) => {
    setSelectedChord(chord);
    setModalVisible(true);
  }, []);

  const renderChordCard = useCallback(
    ({ item, index }: { item: Chord; index: number }) => (
      <Animated.View entering={FadeInUp.delay(index * 50).duration(300)}>
        <Pressable
          onPress={() => openChordDetail(item)}
          style={{
            backgroundColor: '#12121A',
            borderRadius: 16,
            padding: 14,
            borderWidth: 1,
            borderColor: '#2A2A3A',
            width: (SCREEN_WIDTH - 48 - 12) / 2,
            marginBottom: 12,
          }}
        >
          <View className="items-center mb-3">
            <ChordDiagram chordName={item.name} keys={item.keys} compact />
          </View>
          <Text className="text-text-primary font-bold text-center" style={{ fontSize: 14 }}>
            {item.symbol}
          </Text>
          <Text className="text-text-secondary text-center mt-1" style={{ fontSize: 10 }}>
            {item.name}
          </Text>
          <View className="items-center mt-2">
            <View
              style={{
                backgroundColor: DIFF_COLORS[item.difficulty] + '20',
                borderRadius: 6,
                paddingHorizontal: 8,
                paddingVertical: 2,
              }}
            >
              <Text
                style={{
                  color: DIFF_COLORS[item.difficulty],
                  fontSize: 8,
                  fontWeight: '700',
                }}
              >
                {item.difficulty.toUpperCase()}
              </Text>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    ),
    [openChordDetail]
  );

  return (
    <SafeAreaView className="flex-1 bg-deep-black">
      {/* Header */}
      <View className="px-5 pt-4 pb-2">
        <Text className="text-text-primary font-bold" style={{ fontSize: 26 }}>
          Library
        </Text>
        <Text className="text-text-secondary mt-1" style={{ fontSize: 13 }}>
          Chords, scales, and sheet music
        </Text>
      </View>

      {/* Tab Switcher */}
      <View className="flex-row mx-5 mt-4 mb-4">
        {(['chords', 'scales', 'sheets', 'guide'] as LibraryTab[]).map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{
              flex: 1,
              paddingVertical: 10,
              borderRadius: 12,
              backgroundColor: activeTab === tab ? '#00E5FF' : '#12121A',
              marginHorizontal: 3,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: activeTab === tab ? '#0A0A0F' : '#8888A0',
                fontSize: 12,
                fontWeight: '700',
              }}
            >
              {tab === 'chords' ? '🎹 Chords' : tab === 'scales' ? '🎼 Scales' : tab === 'sheets' ? '📄 Sheets' : '📖 Guide'}
            </Text>
          </Pressable>
        ))}
      </View>

      {activeTab === 'chords' ? (
        <>
          {/* Category Filter */}
          <View style={{ height: 45, marginBottom: 16 }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, alignItems: 'center' }}
            >
              {CHORD_CATEGORIES.map((cat) => (
                <Pressable
                  key={cat.key}
                  onPress={() => setActiveCategory(cat.key)}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor: activeCategory === cat.key ? '#B388FF20' : '#12121A',
                    borderWidth: 1,
                    borderColor: activeCategory === cat.key ? '#B388FF' : '#2A2A3A',
                    marginRight: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 70,
                  }}
                >
                  <Text
                    style={{
                      color: activeCategory === cat.key ? '#B388FF' : '#8888A0',
                      fontSize: 13,
                      fontWeight: '700',
                    }}
                  >
                    {cat.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Chord Grid */}
          <FlatList
            data={filteredChords}
            renderItem={renderChordCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : activeTab === 'scales' ? (
        /* Scale List */
        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          {SCALES.map((scale, index) => (
            <Animated.View
              key={scale.id}
              entering={FadeInUp.delay(index * 60).duration(300)}
            >
              <Pressable
                onPress={() => {
                  setSelectedScale(scale);
                  setScaleModalVisible(true);
                }}
                style={{
                  backgroundColor: '#12121A',
                  borderRadius: 16,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: '#2A2A3A',
                  marginBottom: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#B388FF20',
                    borderRadius: 12,
                    width: 48,
                    height: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name="musical-notes" size={22} color="#B388FF" />
                </View>
                <View className="flex-1 ml-3">
                  <Text className="text-text-primary font-bold" style={{ fontSize: 15 }}>
                    {scale.name}
                  </Text>
                  <Text className="text-text-secondary mt-1" style={{ fontSize: 11 }}>
                    Formula: {scale.formula}
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
                  <Text style={{ color: '#8888A0', fontSize: 10, fontWeight: '700' }}>
                    {scale.category.toUpperCase()}
                  </Text>
                </View>
              </Pressable>
            </Animated.View>
          ))}
          <View style={{ height: 100 }} />
        </ScrollView>
      ) : activeTab === 'sheets' ? (
        /* Sheet Music List */
        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          {SONGS.map((sheet, index) => (
            <Animated.View
              key={sheet.id}
              entering={FadeInUp.delay(index * 60).duration(300)}
            >
              <Pressable
                onPress={() => {
                  router.push(`/sheet/${sheet.id}`);
                }}
                style={{
                  backgroundColor: '#12121A',
                  borderRadius: 16,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: '#2A2A3A',
                  marginBottom: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#1A1A25',
                    borderRadius: 12,
                    width: 48,
                    height: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name="document-text" size={22} color="#B388FF" />
                </View>
                <View className="flex-1 ml-3">
                  <Text className="text-text-primary font-bold" style={{ fontSize: 14 }}>
                    {sheet.title}
                  </Text>
                  <Text className="text-text-secondary mt-1" style={{ fontSize: 11 }}>
                    {sheet.artist}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: DIFF_COLORS[sheet.difficulty] + '20',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      color: DIFF_COLORS[sheet.difficulty],
                      fontSize: 10,
                      fontWeight: '700',
                    }}
                  >
                    {sheet.difficulty.toUpperCase()}
                  </Text>
                </View>
              </Pressable>
            </Animated.View>
          ))}
          <View style={{ height: 100 }} />
        </ScrollView>
      ) : (
        /* Note Guide Tab */
        <View className="flex-1 px-5">
          <NoteGuide />
        </View>
      )}

      <ChordDetailModal
        chord={selectedChord}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <ScaleDetailModal
        scale={selectedScale}
        visible={scaleModalVisible}
        onClose={() => setScaleModalVisible(false)}
      />


    </SafeAreaView>
  );
}
