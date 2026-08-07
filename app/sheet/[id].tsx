import React from 'react';
import { View, Text, ScrollView, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SONGS } from '../../data/songs';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function SheetViewerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const sheet = SONGS.find((s) => s.id === id);

  if (!sheet) {
    return (
      <SafeAreaView className="flex-1 bg-deep-black items-center justify-center">
        <Text style={{ color: '#EAEAF0', fontSize: 18 }}>Sheet not found.</Text>
        <Pressable onPress={() => router.back()} style={{ marginTop: 20, padding: 10, backgroundColor: '#1A1A25', borderRadius: 8 }}>
          <Text style={{ color: '#00E5FF' }}>Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-deep-black">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-[#2A2A3A]">
        <Pressable onPress={() => router.back()} className="p-2 mr-2">
          <Ionicons name="arrow-back" size={24} color="#EAEAF0" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-text-primary font-bold" style={{ fontSize: 20 }} numberOfLines={1}>
            {sheet.title}
          </Text>
          <Text className="text-text-secondary" style={{ fontSize: 12 }}>
            {sheet.artist}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
        
        {/* Sheet Image Section */}
        {sheet.sheetImage ? (
          <View style={{ marginBottom: 24, borderRadius: 12, overflow: 'hidden', backgroundColor: '#fff' }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Image
                source={sheet.sheetImage}
                style={{ width: SCREEN_WIDTH * 1.5, height: undefined, aspectRatio: 0.7 }}
                resizeMode="contain"
              />
            </ScrollView>
          </View>
        ) : (
          <View style={{ backgroundColor: '#12121A', borderRadius: 16, padding: 32, alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: '#2A2A3A' }}>
            <Ionicons name="image-outline" size={48} color="#8888A0" style={{ marginBottom: 16 }} />
            <Text style={{ color: '#EAEAF0', fontSize: 16, fontWeight: '700', textAlign: 'center', marginBottom: 8 }}>
              Belum Ada Note Balok
            </Text>
            <Text style={{ color: '#8888A0', fontSize: 13, textAlign: 'center' }}>
              Simpan gambar note balok ke direktori assets/images/sheets/ dan update data/songs.ts untuk menampilkannya di sini.
            </Text>
          </View>
        )}

        {/* Letter Notes Section */}
        <View style={{ backgroundColor: '#12121A', borderRadius: 16, padding: 24, borderWidth: 1, borderColor: '#2A2A3A', marginBottom: 40 }}>
          <View className="flex-row items-center mb-4">
            <Ionicons name="musical-notes" size={20} color="#00E5FF" />
            <Text style={{ color: '#00E5FF', fontSize: 16, fontWeight: '700', marginLeft: 8 }}>
              Note Huruf
            </Text>
          </View>
          
          {sheet.letterNotes ? (
            <Text style={{ color: '#EAEAF0', fontSize: 16, lineHeight: 28, fontFamily: 'monospace' }}>
              {sheet.letterNotes}
            </Text>
          ) : (
            <Text style={{ color: '#8888A0', fontSize: 14, fontStyle: 'italic' }}>
              Note huruf tidak tersedia.
            </Text>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
