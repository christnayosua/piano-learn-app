import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Image } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

type SectionKey = 'all' | 'symbols' | 'rhythm' | 'melody';

export default function NoteGuide() {
  const [activeSection, setActiveSection] = useState<SectionKey>('all');

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {/* Category Header Selector */}
      <View style={styles.filterRow}>
        {[
          { key: 'all', label: 'Semua' },
          { key: 'symbols', label: '1. Simbol & Not' },
          { key: 'rhythm', label: '2. Ketukan & Tempo' },
          { key: 'melody', label: '3. Tangga Nada & Akidental' },
        ].map((item) => (
          <Pressable
            key={item.key}
            onPress={() => setActiveSection(item.key as SectionKey)}
            style={[
              styles.filterChip,
              activeSection === item.key && styles.filterChipActive,
            ]}
          >
            <Text
              style={[
                styles.filterChipText,
                activeSection === item.key && styles.filterChipTextActive,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Intro Box */}
      <Animated.View entering={FadeInUp.delay(50).duration(400)} style={styles.introCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="book-outline" size={24} color="#00E5FF" />
          <Text style={styles.cardTitle}>Panduan Bergambar Membaca Not Balok</Text>
        </View>
        <Text style={styles.paragraph}>
          Panduan visual lengkap beserta ilustrasi pendukung untuk membantu Anda menguasai cara membaca not balok, ritme, tanda kunci, hingga tangga nada secara komprehensif.
        </Text>
      </Animated.View>

      {/* STEP 1: SIMBOL & CLEF */}
      {(activeSection === 'all' || activeSection === 'symbols') && (
        <>
          <View style={styles.sectionDivider}>
            <Text style={styles.sectionDividerTitle}>1. Simbol Dasar & Kunci (Clefs)</Text>
          </View>

          {/* Treble Clef */}
          <Animated.View entering={FadeInUp.delay(100).duration(400)} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="musical-notes" size={24} color="#B388FF" />
              <Text style={styles.cardTitle}>Treble Clef (Kunci G / Tangan Kanan)</Text>
            </View>
            <Text style={styles.paragraph}>
              Kunci G melingkari garis kedua paranada yang menunjukkan lokasi not G. Kunci ini digunakan untuk register suara tinggi (tangan kanan pada piano).
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/guide/treble.png')}
                style={styles.guideImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.subBox}>
              <Text style={styles.labelTitle}>Singkatan Menghafal Treble Clef:</Text>
              <Text style={styles.mnemonicText}>
                • Garis (E-G-B-D-F): "<Text style={styles.highlightText}>E</Text>very <Text style={styles.highlightText}>G</Text>ood <Text style={styles.highlightText}>B</Text>oy <Text style={styles.highlightText}>D</Text>oes <Text style={styles.highlightText}>F</Text>ine"
              </Text>
              <Text style={styles.mnemonicText}>
                • Spasi (F-A-C-E): Membentuk kata "<Text style={styles.highlightText}>F A C E</Text>"
              </Text>
            </View>
          </Animated.View>

          {/* Bass Clef */}
          <Animated.View entering={FadeInUp.delay(150).duration(400)} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="musical-note" size={24} color="#FF6BCD" />
              <Text style={styles.cardTitle}>Bass Clef (Kunci F / Tangan Kiri)</Text>
            </View>
            <Text style={styles.paragraph}>
              Dua titik pada Kunci F mengapit garis keempat (garis F). Kunci ini menandai register suara rendah (tangan kiri pada piano).
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/guide/bass.png')}
                style={styles.guideImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.subBox}>
              <Text style={styles.labelTitle}>Singkatan Menghafal Bass Clef:</Text>
              <Text style={styles.mnemonicText}>
                • Garis (G-B-D-F-A): "<Text style={styles.highlightText}>G</Text>ood <Text style={styles.highlightText}>B</Text>oys <Text style={styles.highlightText}>D</Text>o <Text style={styles.highlightText}>F</Text>ine <Text style={styles.highlightText}>A</Text>lways"
              </Text>
              <Text style={styles.mnemonicText}>
                • Spasi (A-C-E-G): "<Text style={styles.highlightText}>A</Text>ll <Text style={styles.highlightText}>C</Text>ows <Text style={styles.highlightText}>E</Text>at <Text style={styles.highlightText}>G</Text>rass"
              </Text>
            </View>
          </Animated.View>

          {/* Note Anatomy */}
          <Animated.View entering={FadeInUp.delay(200).duration(400)} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="ellipse" size={24} color="#F2C94C" />
              <Text style={styles.cardTitle}>Anatomi Not Musik</Text>
            </View>
            <Text style={styles.paragraph}>
              Setiap not terdiri dari tiga bagian utama: Kepala Not (Note Head), Tangkai (Stem), dan Bendera (Flag).
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/guide/notes.png')}
                style={styles.guideImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.paragraphSmall}>
              • <Text style={styles.boldText}>Kepala Not:</Text> Posisi kepala pada garis/spasi menentukan nada yang dimainkan.{'\n'}
              • <Text style={styles.boldText}>Tangkai:</Text> Menunjuk ke atas jika not berada di bawah garis ketiga, dan ke bawah jika berada di atau atas garis ketiga.{'\n'}
              • <Text style={styles.boldText}>Bendera:</Text> Menentukan seberapa cepat not dimainkan.
            </Text>
          </Animated.View>

          {/* Note Values */}
          <Animated.View entering={FadeInUp.delay(250).duration(400)} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="time" size={24} color="#00E5FF" />
              <Text style={styles.cardTitle}>Nilai Not & Bentuk Kepala Not</Text>
            </View>
            <Text style={styles.paragraph}>
              Bentuk dan isi kepala not menentukan lama (durasi) not tersebut ditahan.
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/guide/notevalues.png')}
                style={styles.guideImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/guide/values.png')}
                style={styles.guideImage}
                resizeMode="contain"
              />
            </View>
          </Animated.View>

          {/* Dots & Ties */}
          <Animated.View entering={FadeInUp.delay(300).duration(400)} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="add-circle-outline" size={24} color="#B388FF" />
              <Text style={styles.cardTitle}>Titik Perpanjangan (Dots) & Legato (Ties)</Text>
            </View>
            <Text style={styles.paragraph}>
              Cara memperpanjang nilai ketukan not menggunakan Titik (Dot) atau Garis Penghubung (Tie).
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/guide/dots&ties.png')}
                style={styles.guideImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.paragraphSmall}>
              • <Text style={styles.boldText}>Dot (Titik):</Text> Menambahkan 50% dari durasi asal not.{'\n'}
              • <Text style={styles.boldText}>Tie (Garis Legato):</Text> Menggabungkan dua not yang bertetangga menjadi satu tahanan panjang.
            </Text>
          </Animated.View>

          {/* Beams & Rests */}
          <Animated.View entering={FadeInUp.delay(350).duration(400)} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="funnel-outline" size={24} color="#FF6BCD" />
              <Text style={styles.cardTitle}>Bendera Gabung (Beams) & Tanda Istirahat (Rests)</Text>
            </View>
            <Text style={styles.paragraph}>
              Dua not cepat atau lebih dapat digabungkan dengan garis horizontal (Beam) agar lembaran tampak rapi. Tanda istirahat menandai saat diam (tanpa suara).
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/guide/notesvalues2.png')}
                style={styles.guideImage}
                resizeMode="contain"
              />
            </View>
          </Animated.View>
        </>
      )}

      {/* STEP 2: RHYTHM & TEMPO */}
      {(activeSection === 'all' || activeSection === 'rhythm') && (
        <>
          <View style={styles.sectionDivider}>
            <Text style={styles.sectionDividerTitle}>2. Sukat (Time Signature) & Tempo</Text>
          </View>

          {/* Time Signatures */}
          <Animated.View entering={FadeInUp.delay(100).duration(400)} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="pie-chart-outline" size={24} color="#00E5FF" />
              <Text style={styles.cardTitle}>Time Signature (Sukat 4/4 & 3/4)</Text>
            </View>
            <Text style={styles.paragraph}>
              Sukat menunjukkan jumlah ketukan dalam satu birama (bar) dan jenis not yang dihitung sebagai satu ketukan.
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/guide/beat.png')}
                style={styles.guideImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.paragraphSmall}>
              <Text style={styles.boldText}>Sukat 4/4:</Text> Terdapat 4 ketukan per birama, di mana not 1/4 (quarter note) bernilai 1 ketuk.
            </Text>

            <View style={[styles.imageContainer, { marginTop: 12 }]}>
              <Image
                source={require('../assets/images/guide/beat2.png')}
                style={styles.guideImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.paragraphSmall}>
              <Text style={styles.boldText}>Sukat 3/4:</Text> Terdapat 3 ketukan per birama (seperti ritme dansa Waltz).
            </Text>
          </Animated.View>

          {/* Tempo */}
          <Animated.View entering={FadeInUp.delay(150).duration(400)} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="speedometer-outline" size={24} color="#F2C94C" />
              <Text style={styles.cardTitle}>Kecepatan Musik (Tempo & BPM)</Text>
            </View>
            <Text style={styles.paragraph}>
              Tempo menentukan kecepatan dimainkannya suatu lagu dalam satuan BPM (Beats Per Minute) atau menggunakan istilah bahasa Italia.
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/guide/tempo.png')}
                style={styles.guideImage}
                resizeMode="contain"
              />
            </View>
          </Animated.View>
        </>
      )}

      {/* STEP 3: MELODY & ACCIDENTALS */}
      {(activeSection === 'all' || activeSection === 'melody') && (
        <>
          <View style={styles.sectionDivider}>
            <Text style={styles.sectionDividerTitle}>3. Tangga Nada & Tanda Akidental</Text>
          </View>

          {/* C Major Scale */}
          <Animated.View entering={FadeInUp.delay(100).duration(400)} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="stats-chart-outline" size={24} color="#00E5FF" />
              <Text style={styles.cardTitle}>Tangga Nada C Major (C - D - E - F - G - A - B - C)</Text>
            </View>
            <Text style={styles.paragraph}>
              Hubungan antara not pada paranada dengan tuts putih pada keyboard piano Anda.
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/guide/melody.png')}
                style={styles.guideImage}
                resizeMode="contain"
              />
            </View>
          </Animated.View>

          {/* Whole Steps & Half Steps */}
          <Animated.View entering={FadeInUp.delay(150).duration(400)} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="resize-outline" size={24} color="#B388FF" />
              <Text style={styles.cardTitle}>Langkah Utuh (Whole Steps) & Setengah (Half Steps)</Text>
            </View>
            <Text style={styles.paragraph}>
              Selisih antar tuts piano. Tangga nada Major selalu memiliki pola: Utuh - Utuh - Setengah - Utuh - Utuh - Utuh - Setengah.
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/guide/wholethones.png')}
                style={styles.guideImage}
                resizeMode="contain"
              />
            </View>
          </Animated.View>

          {/* Sharps & Flats */}
          <Animated.View entering={FadeInUp.delay(200).duration(400)} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="key-outline" size={24} color="#FF6BCD" />
              <Text style={styles.cardTitle}>Tanda Kres (Sharp ♯) & Mol (Flat ♭)</Text>
            </View>
            <Text style={styles.paragraph}>
              Penggunaan nada setengah langkah (semitone) pada tuts hitam atau putih untuk menaikkan (Sharp) atau menurunkan (Flat) nada.
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/guide/semitones.png')}
                style={styles.guideImage}
                resizeMode="contain"
              />
            </View>
          </Animated.View>

          {/* Naturals */}
          <Animated.View entering={FadeInUp.delay(250).duration(400)} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="refresh-circle-outline" size={24} color="#F2C94C" />
              <Text style={styles.cardTitle}>Tanda Pugar (Natural ♮)</Text>
            </View>
            <Text style={styles.paragraph}>
              Tanda Pugar berfungsi membatalkan tanda kres atau mol sebelumnya dalam satu birama, mengembalikan not ke nada aslinya.
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/guide/naturals.png')}
                style={styles.guideImage}
                resizeMode="contain"
              />
            </View>
          </Animated.View>

          {/* Key Signatures */}
          <Animated.View entering={FadeInUp.delay(300).duration(400)} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="ribbon-outline" size={24} color="#00E5FF" />
              <Text style={styles.cardTitle}>Tanda Mula (Key Signatures)</Text>
            </View>
            <Text style={styles.paragraph}>
              Kumpulan tanda kres atau mol di awal paranada setelah kunci (clef) yang berlaku untuk seluruh lagu.
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/guide/keysignature.png')}
                style={styles.guideImage}
                resizeMode="contain"
              />
            </View>
          </Animated.View>
        </>
      )}

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 6,
  },
  filterChip: {
    backgroundColor: '#12121A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A3A',
  },
  filterChipActive: {
    backgroundColor: '#00E5FF20',
    borderColor: '#00E5FF',
  },
  filterChipText: {
    color: '#8888A0',
    fontSize: 12,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#00E5FF',
    fontWeight: '700',
  },
  introCard: {
    backgroundColor: '#12121A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#00E5FF40',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#12121A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A3A',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
  },
  paragraph: {
    color: '#A0A0B5',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 10,
  },
  paragraphSmall: {
    color: '#8888A0',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  boldText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  subBox: {
    backgroundColor: '#1A1A25',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  labelTitle: {
    color: '#D0D0E0',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  mnemonicText: {
    color: '#E0E0F0',
    fontSize: 12,
    marginTop: 2,
  },
  highlightText: {
    color: '#00E5FF',
    fontWeight: 'bold',
  },
  sectionDivider: {
    marginVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A3A',
    paddingBottom: 6,
  },
  sectionDividerTitle: {
    color: '#00E5FF',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  imageContainer: {
    backgroundColor: '#161622',
    borderRadius: 12,
    padding: 8,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    borderWidth: 1,
    borderColor: '#2A2A3A',
  },
  guideImage: {
    width: '100%',
    height: 140,
  },
});
