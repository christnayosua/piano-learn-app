import { StaffDisplayNote } from '../components/StaffNotation';

export type LessonSection =
  | 'basics'
  | 'c_position'
  | 'grand_staff'
  | 'chords'
  | 'g_position'
  | 'middle_c'
  | 'expanding_position'
  | 'scales_masterpieces';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  section: LessonSection;
  icon: string;
  isLocked: boolean;
  progress: number;
}

export interface LessonContentDetails {
  theoryTitle: string;
  theoryParagraphs: string[];
  keyPoints: string[];
  practiceTitle: string;
  practiceInstruction: string;
  highlightedKeys: number[];
  staffNotes?: StaffDisplayNote[];
  staffClef?: 'treble' | 'bass';
  staffTimeSignature?: string;
}

export const SECTIONS: { key: LessonSection; label: string; color: string }[] = [
  { key: 'basics', label: 'Unit 1: Pengenalan Bermain (hal. 4-11)', color: '#00E5FF' },
  { key: 'c_position', label: 'Unit 2: Posisi C & Ritme (hal. 12-19)', color: '#B388FF' },
  { key: 'grand_staff', label: 'Unit 3: Grand Staff & C-G (hal. 20-31)', color: '#FF6BCD' },
  { key: 'chords', label: 'Unit 4: Akor & Progresi Dinamis (hal. 32-49)', color: '#FFD740' },
  { key: 'g_position', label: 'Unit 5: Posisi G & Kres (hal. 50-71)', color: '#00FF88' },
  { key: 'middle_c', label: 'Unit 6: Posisi Middle C & Ritme (hal. 72-82)', color: '#FF7043' },
  { key: 'expanding_position', label: 'Unit 7: Perluasan Posisi & Mol (hal. 83-99)', color: '#E040FB' },
  { key: 'scales_masterpieces', label: 'Unit 8: Tanda Mula & Karya Masterpiece (hal. 100-147)', color: '#1DE9B6' },
];

export const CURRICULUM: Lesson[] = [
  // Unit 1: Pengenalan Bermain (pp. 4-11)
  {
    id: 'b1',
    title: 'Latihan Pendahuluan & Postur Duduk',
    description: 'Pelajari relaksasi lengan yang benar, postur duduk, dan penyejajaran posisi tubuh di Middle C.',
    section: 'basics',
    icon: 'body-outline',
    isLocked: false,
    progress: 100,
  },
  {
    id: 'b2',
    title: 'Nomor Jari & Nada Piano',
    description: 'Kuasai penomoran jari 1-5 untuk kedua tangan dan hasilkan nada piano yang jernih.',
    section: 'basics',
    icon: 'hand-left-outline',
    isLocked: false,
    progress: 100,
  },
  {
    id: 'b3',
    title: 'Keyboard & Tebak Nadanya!',
    description: 'Eksplorasi semua 88 tuts dengan panduan 2-tuts hitam dan 3-tuts hitam (C D E F G A B).',
    section: 'basics',
    icon: 'grid-outline',
    isLocked: false,
    progress: 75,
  },
  {
    id: 'b4',
    title: 'Latihan Isometrik & Jari Melengkung',
    description: 'Bangun kekuatan tangan dengan pijatan dan pahami 4 alasan bermain dengan jari yang melengkung.',
    section: 'basics',
    icon: 'fitness-outline',
    isLocked: false,
    progress: 0,
  },

  // Unit 2: Posisi C & Ritme (pp. 12-19)
  {
    id: 'c1',
    title: 'Posisi Tangan Kanan di C & Pemanasan',
    description: 'Posisikan jari tangan kanan 1-5 di C4-D4-E4-F4-G4 dan latih jatuhnya jari dengan mulus.',
    section: 'c_position',
    icon: 'play-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'c2',
    title: 'Not Seperempat, Not Setengah & Birama',
    description: 'Hitung not seperempat (1 ketuk), not setengah (2 ketuk), birama, garis birama, dan mainkan Ode to Joy.',
    section: 'c_position',
    icon: 'time-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'c3',
    title: 'Tanda Kunci G (Treble Clef)',
    description: 'Baca not garis (E G B D F) dan not spasi (F A C E) pada Kunci G (Treble).',
    section: 'c_position',
    icon: 'book-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'c4',
    title: 'Posisi Tangan Kiri di C & Pemanasan',
    description: 'Posisikan jari tangan kiri 5-1 di C3-D3-E3-F3-G3 dan baca not balok pada Kunci F (Bass).',
    section: 'c_position',
    icon: 'musical-note-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'c5',
    title: 'Not Penuh & Tanda Istirahat Penuh',
    description: 'Kuasai Not Penuh 4 ketuk, Tanda Istirahat Penuh, dan mainkan Aura Lee.',
    section: 'c_position',
    icon: 'disc-outline',
    isLocked: true,
    progress: 0,
  },

  // Unit 3: Grand Staff & C-G (pp. 20-31)
  {
    id: 'cg1',
    title: 'Grand Staff & Tanda Birama 4/4',
    description: 'Hubungkan paranada Treble & Bass dengan Middle C, tanda birama 4/4 (Rock-Along).',
    section: 'grand_staff',
    icon: 'layers-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'cg2',
    title: 'Interval Melodis (Ke-2 & Ke-3) & Dinamika',
    description: 'Not melangkah dan melompat dengan dinamika piano (p) & mezzo forte (mf) (Au Claire de la Lune).',
    section: 'grand_staff',
    icon: 'trending-up-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'cg3',
    title: 'Interval Harmonis (Ke-2 & Ke-3) & Forte',
    description: 'Mainkan 2 not bersamaan dengan tanda dinamika forte (f) (Rockin Intervals & Harmonica Rock).',
    section: 'grand_staff',
    icon: 'swap-horizontal-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'cg4',
    title: 'Interval Ke-4 & Ke-5 Melodis & Harmonis',
    description: 'Perluas interval ke-4 & ke-5 (Good King Wenceslas, My Fifth & Jingle Bells).',
    section: 'grand_staff',
    icon: 'resize-outline',
    isLocked: true,
    progress: 0,
  },

  // Unit 4: Pengenalan Akor (pp. 32-49)
  {
    id: 'ch1',
    title: 'Akor C Mayor & Tanda Istirahat Setengah',
    description: 'Bentuk triad 3-not C Mayor (C-E-G) dan hitung tanda istirahat setengah bernilai 2 ketuk (Brother John).',
    section: 'chords',
    icon: 'shapes-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'ch2',
    title: 'Nada B untuk Tangan Kiri/Kanan & Akor G7',
    description: 'Geser jari ke nada B dan kuasai transisi akor G7 (Merrily We Roll Along & Mary Ann).',
    section: 'chords',
    icon: 'flash-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'ch3',
    title: 'Tanda Birama 3/4 & Not Setengah Bertitik',
    description: 'Hitung 3 ketuk per birama dan not setengah bertitik bernilai 3 ketuk (Rockets).',
    section: 'chords',
    icon: 'speedometer-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'ch4',
    title: 'Slur, Bermain Legato & Tie (Garis Lengkung)',
    description: 'Hubungkan not dengan mulus menggunakan slur dan tahan durasi not dengan tie (Day Is Done).',
    section: 'chords',
    icon: 'water-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'ch5',
    title: 'Nada A untuk Tangan Kiri/Kanan & Akor F Mayor',
    description: 'Pelajari akor F Mayor (C-F-A) dan pemanasan akor primer (When the Saints Go Marching In).',
    section: 'chords',
    icon: 'star-outline',
    isLocked: true,
    progress: 0,
  },

  // Unit 5: Posisi G & Kres (pp. 50-71)
  {
    id: 'g1',
    title: 'Posisi G & Interval di G',
    description: 'Posisikan tangan di G (Tangan Kanan G4-D5, Tangan Kiri G3-D4) dan mainkan Love Somebody & Bandleader.',
    section: 'g_position',
    icon: 'navigate-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'g2',
    title: 'Tanda Kres (#) & Keterampilan Jari Seimbang',
    description: 'Mainkan nada kres (naik setengah laras) dan solusi tangan Leschetizky (Money Can’t Buy Ev’rything).',
    section: 'g_position',
    icon: 'key-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'g3',
    title: 'Akor G Mayor & D7 untuk Tangan Kiri & Kanan',
    description: 'Kuasai akor blok dan pecah (broken chord) G Mayor (G-B-D) dan D7 (F#-C-D) (Liza Jane).',
    section: 'g_position',
    icon: 'sparkles-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'g4',
    title: 'Menggunakan Pedal Damper (Sustain)',
    description: 'Pelajari teknik pedal kanan (damper) untuk gaung suara yang panjang dan kaya (Harp Song).',
    section: 'g_position',
    icon: 'disc-sharp',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'g5',
    title: 'Nada E & Posisi Akor C Mayor Baru',
    description: 'Perluas Posisi G agar mencakup E dan mainkan Beautiful Brown Eyes & Alpine Melody.',
    section: 'g_position',
    icon: 'options-outline',
    isLocked: true,
    progress: 0,
  },

  // Unit 6: Posisi Middle C & Variasi Ritme (pp. 72-82)
  {
    id: 'm1',
    title: 'Posisi Middle C',
    description: 'Berbagi Middle C (C4) di antara kedua ibu jari (Thumbs on C!).',
    section: 'middle_c',
    icon: 'radio-button-on-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'm2',
    title: 'Tanda Dinamika: Crescendo & Diminuendo',
    description: 'Lakukan perubahan volume secara bertahap (< makin keras, > makin lembut) dalam Tempo Waltz.',
    section: 'middle_c',
    icon: 'volume-medium-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'm3',
    title: 'Tanda Fermata & Not Seperdelapan',
    description: 'Tahan not menggunakan Fermata (𝄐) dan hitung not seperdelapan yang dibagi-bagi (Happy Birthday).',
    section: 'middle_c',
    icon: 'funnel-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'm4',
    title: 'D.C. al Fine & Not Seperempat Bertitik',
    description: 'Pahami pengulangan D.C. al Fine dan mainkan not seperempat bertitik bernilai 1.5 ketuk (Alouette).',
    section: 'middle_c',
    icon: 'repeat-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'm5',
    title: 'Aerobik Teknis Hanon',
    description: 'Kembangkan kemandirian, kelincahan, dan keluwesan pergelangan tangan dengan latihan Hanon.',
    section: 'middle_c',
    icon: 'pulse-outline',
    isLocked: true,
    progress: 0,
  },

  // Unit 7: Perluasan Posisi & Mol (pp. 83-99)
  {
    id: 'ex1',
    title: 'Mengukur Interval Ke-6 & Tanda Birama 3/8',
    description: 'Rentangkan tangan hingga interval ke-6 dan hitung tanda birama 3/8 (Lavender’s Blue & Kum-Ba-Yah).',
    section: 'expanding_position',
    icon: 'expand-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'ex2',
    title: 'Hanon Ke-6 & Bergerak di Interval Ke-6',
    description: 'Mainkan latihan interval ke-6 Hanon dan geser naik/turun pada keyboard dalam interval ke-6 (London Bridge).',
    section: 'expanding_position',
    icon: 'swap-vertical-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'ex3',
    title: 'Artikulasi Staccato',
    description: 'Mainkan not staccato yang renyah dan terputus menggunakan pantulan ringan pergelangan tangan.',
    section: 'expanding_position',
    icon: 'ellipse-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'ex4',
    title: 'Mengukur Interval Ke-7 & Oktaf',
    description: 'Rentangkan interval ke-7 dan oktaf penuh melintasi paranada (Café Vienna & Lullaby).',
    section: 'expanding_position',
    icon: 'contract-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'ex5',
    title: 'Tanda Mol (♭), Jarak Penuh & Tetrakord',
    description: 'Pahami tanda aksidental mol, jarak setengah/penuh, dan tetrakord 4 nada (Rock It Away).',
    section: 'expanding_position',
    icon: 'remove-circle-outline',
    isLocked: true,
    progress: 0,
  },

  // Unit 8: Tanda Mula & Karya Masterpiece (pp. 100-147)
  {
    id: 'sk1',
    title: 'Tangga Nada C Mayor & Persilangan Jari',
    description: 'Lewatkan ibu jari di bawah jari ke-3 (Kanan) dan jari ke-3 di atas ibu jari (Kiri) untuk oktaf penuh (Joy to the World).',
    section: 'scales_masterpieces',
    icon: 'trending-up-sharp',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'sk2',
    title: 'Progresi Blues & Tanda Pugar (Natural)',
    description: 'Kuasai progresi blues 12-bar dan tanda pugar (Got Those Blues & Blues for Wynton Marsalis).',
    section: 'scales_masterpieces',
    icon: 'flame-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'sk3',
    title: 'Kunci G Mayor (Tanda Mula F#) & Sinkopasi',
    description: 'Mainkan di Kunci G Mayor dengan tanda mula F# dan ritme sinkopasi (The Can-Can).',
    section: 'scales_masterpieces',
    icon: 'prism-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'sk4',
    title: 'Kunci F Mayor (Tanda Mula Bb) & Arpeggio',
    description: 'Mainkan di Kunci F Mayor dengan tanda mula Bb dan akor arpeggio pecah (Auld Lang Syne & O Sole Mio!).',
    section: 'scales_masterpieces',
    icon: 'flower-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'sk5',
    title: 'Kunci A Minor & Overlapping Pedal',
    description: 'Temukan tangga nada A Minor Harmonis relatif dan teknik overlapping pedal (Greensleeves & Jericho).',
    section: 'scales_masterpieces',
    icon: 'moon-outline',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'sk6',
    title: 'Kunci D Minor & Tangga Nada Minor Harmonis',
    description: 'Jelajahi tangga nada D Minor Harmonis relatif dan triad minor (Scarborough Fair).',
    section: 'scales_masterpieces',
    icon: 'water-sharp',
    isLocked: true,
    progress: 0,
  },
  {
    id: 'sk7',
    title: 'Triplet & Pertunjukan Karya Masterpiece',
    description: 'Kuasai triplet not seperdelapan dan tampilkan karya abadi: The Entertainer & Amazing Grace.',
    section: 'scales_masterpieces',
    icon: 'trophy-outline',
    isLocked: true,
    progress: 0,
  },
];

export const LESSON_CONTENTS: Record<string, LessonContentDetails> = {
  b1: {
    theoryTitle: 'Latihan Pendahuluan & Postur Duduk (hal. 4-6)',
    theoryParagraphs: [
      'Piano standar memiliki 88 tuts: 52 tuts putih (nada natural) dan 36 tuts hitam (kres dan mol aksidental).',
      'Duduklah di tengah menghadap Middle C (C4). Jaga tulang belakang tetap lurus, bahu rileks, kaki mendatar di lantai, dan lengan sejajar dengan keyboard.',
    ],
    keyPoints: [
      'Middle C (C4) adalah pusat pijakan pada keyboard',
      'Pertahankan postur tegak dan bahu yang santai',
      '52 Tuts putih + 36 Tuts hitam = total 88 tuts',
    ],
    practiceTitle: 'Temukan & Mainkan Middle C',
    practiceInstruction: 'Tekan tuts yang disorot (C4) di tengah keyboard.',
    highlightedKeys: [0],
    staffClef: 'treble',
    staffNotes: [{ key: 0, octave: 4, duration: 1, finger: 1 }],
  },
  b2: {
    theoryTitle: 'Nomor Jari & Nada Piano (hal. 7)',
    theoryParagraphs: [
      'Dalam partitur piano, jari diberi nomor 1 sampai 5 untuk tangan kiri dan kanan.',
      'Ibu jari adalah 1, Telunjuk 2, Tengah 3, Manis 4, dan Kelingking 5. Jatuhkan beban lengan secara alami untuk menciptakan nada piano yang hangat.',
    ],
    keyPoints: [
      'Jari 1 = Ibu jari | 2 = Telunjuk | 3 = Tengah | 4 = Manis | 5 = Kelingking',
      'Bermain dengan ujung jari, jaga agar pergelangan tangan tetap fleksibel',
    ],
    practiceTitle: 'Ketukan Berurutan 5 Jari',
    practiceInstruction: 'Tekan tuts C-D-E-F-G secara berurutan dengan jari 1-2-3-4-5.',
    highlightedKeys: [0, 2, 4, 5, 7],
  },
  b3: {
    theoryTitle: 'Keyboard & Tebak Nadanya! (hal. 8-9)',
    theoryParagraphs: [
      'Tuts putih menggunakan abjad musik: C, D, E, F, G, A, B.',
      'C selalu berada tepat di sebelah kiri DUA tuts hitam. F berada di sebelah kiri TIGA tuts hitam.',
    ],
    keyPoints: [
      'Abjad: C D E F G A B',
      'Patokan 2 Tuts Hitam = C di sebelah kiri',
      'Patokan 3 Tuts Hitam = F di sebelah kiri',
    ],
    practiceTitle: 'Identifikasi C D E F G A B',
    practiceInstruction: 'Tekan setiap tuts putih dari C sampai B.',
    highlightedKeys: [0, 2, 4, 5, 7, 9, 11],
  },
  b4: {
    theoryTitle: 'Latihan Isometrik & Jari Melengkung (hal. 10-11)',
    theoryParagraphs: [
      'Latihan isometrik memperkuat persendian jari dan meningkatkan daya tahan.',
      'Bermain dengan jari melengkung (seolah memegang bola tenis) memaksimalkan kecepatan, kontrol, dan mencegah persendian tertekuk ke dalam.',
    ],
    keyPoints: [
      'Jari melengkung memaksimalkan kecepatan dan kemandirian jari',
      'Rilekskan telapak dan pergelangan tangan untuk menghindari ketegangan otot',
    ],
    practiceTitle: 'Tes Teknik Jari Melengkung',
    practiceInstruction: 'Tekan C4-E4-G4 dengan jari melengkung 1-3-5.',
    highlightedKeys: [0, 4, 7],
  },

  c1: {
    theoryTitle: 'Posisi Tangan Kanan di C & Pemanasan (hal. 12)',
    theoryParagraphs: [
      'Letakkan Jari Tangan Kanan 1 di C4, 2 di D4, 3 di E4, 4 di F4, dan 5 di G4.',
      'Setiap jari bertumpu ringan pada tutsnya masing-masing. Jatuhkan setiap jari dengan bersih tanpa menggerakkan jari di sebelahnya.',
    ],
    keyPoints: [
      'Ibu Jari (1) Kanan di C4 | Kelingking (5) Kanan di G4',
      'Jaga pergelangan tangan tetap rata dan jari melengkung',
    ],
    practiceTitle: 'Pemanasan Posisi C Kanan',
    practiceInstruction: 'Mainkan C4, D4, E4, F4, G4 secara berurutan.',
    highlightedKeys: [0, 2, 4, 5, 7],
    staffClef: 'treble',
    staffNotes: [
      { key: 0, octave: 4, duration: 1, finger: 1 },
      { key: 2, octave: 4, duration: 1, finger: 2 },
      { key: 4, octave: 4, duration: 1, finger: 3 },
      { key: 5, octave: 4, duration: 1, finger: 4 },
      { key: 7, octave: 4, duration: 1, finger: 5 },
    ],
  },
  c2: {
    theoryTitle: 'Not Seperempat, Not Setengah & Birama (hal. 13)',
    theoryParagraphs: [
      'Musik dibagi menjadi birama-birama oleh Garis Birama vertikal.',
      'Not Seperempat mendapat 1 ketuk (hitung "1"). Not Setengah mendapat 2 ketuk (hitung "1-2"). Garis Birama Ganda menandai akhir lagu.',
    ],
    keyPoints: [
      'Not seperempat (♩) = 1 ketuk',
      'Not setengah (𝄤) = 2 ketuk',
      'Contoh lagu: Ode to Joy',
    ],
    practiceTitle: 'Mainkan Melodi Ode to Joy',
    practiceInstruction: 'Mainkan E4, E4, F4, G4 (masing-masing 1 ketuk), G4, F4, E4, D4.',
    highlightedKeys: [4, 5, 7, 2],
    staffClef: 'treble',
    staffNotes: [
      { key: 4, octave: 4, duration: 1, finger: 3 },
      { key: 4, octave: 4, duration: 1, finger: 3 },
      { key: 5, octave: 4, duration: 1, finger: 4 },
      { key: 7, octave: 4, duration: 1, finger: 5 },
    ],
  },
  c3: {
    theoryTitle: 'Tanda Kunci G / Treble (hal. 14-15)',
    theoryParagraphs: [
      'Kunci G (Treble Clef) melingkari garis ke-2 (G4). Ini biasanya dimainkan dengan tangan kanan.',
      'Not garis (dari bawah ke atas): E G B D F. Not spasi: F A C E.',
    ],
    keyPoints: [
      'Garis Kunci G: E4, G4, B4, D5, F5',
      'Spasi Kunci G: F4, A4, C5, E5',
    ],
    practiceTitle: 'Mainkan Garis Kunci G',
    practiceInstruction: 'Tekan E4, G4, B4, D5, F5.',
    highlightedKeys: [4, 7, 11, 2, 5],
    staffClef: 'treble',
    staffNotes: [
      { key: 4, octave: 4, duration: 1, finger: 1 },
      { key: 7, octave: 4, duration: 1, finger: 2 },
      { key: 11, octave: 4, duration: 1, finger: 3 },
      { key: 2, octave: 5, duration: 1, finger: 4 },
      { key: 5, octave: 5, duration: 1, finger: 5 },
    ],
  },
  c4: {
    theoryTitle: 'Posisi Tangan Kiri di C & Kunci F / Bass (hal. 16-18)',
    theoryParagraphs: [
      'Letakkan Jari Tangan Kiri 5 (kelingking) di C3, 4 di D3, 3 di E3, 2 di F3, dan 1 (ibu jari) di G3.',
      'Kunci F (Bass Clef) menunjukkan nada-nada yang lebih rendah. Not garis: G B D F A. Not spasi: A C E G.',
    ],
    keyPoints: [
      'Posisi C Kiri: C3 sampai G3',
      'Garis Kunci F: G2, B2, D3, F3, A3 | Spasi Kunci F: A2, C3, E3, G3',
    ],
    practiceTitle: 'Pemanasan Kunci F Kiri',
    practiceInstruction: 'Tekan C3, D3, E3, F3, G3 dengan jari kiri 5-4-3-2-1.',
    highlightedKeys: [0, 2, 4, 5, 7],
    staffClef: 'bass',
    staffNotes: [
      { key: 0, octave: 3, duration: 1, finger: 5 },
      { key: 2, octave: 3, duration: 1, finger: 4 },
      { key: 4, octave: 3, duration: 1, finger: 3 },
      { key: 5, octave: 3, duration: 1, finger: 2 },
      { key: 7, octave: 3, duration: 1, finger: 1 },
    ],
  },
  c5: {
    theoryTitle: 'Not Penuh & Tanda Istirahat Penuh (hal. 17-19)',
    theoryParagraphs: [
      'Not Penuh mendapat 4 ketukan suara penuh (hitung "1-2-3-4").',
      'Tanda Istirahat Penuh menggantung di bawah garis ke-4, mewakili 4 ketukan keheningan total. (Contoh lagu: Aura Lee).',
    ],
    keyPoints: [
      'Not penuh (𝄣) = 4 ketuk',
      'Istirahat penuh = 4 ketuk diam',
    ],
    practiceTitle: 'Tahan Not Penuh (Aura Lee)',
    practiceInstruction: 'Tahan C4 selama 4 ketuk, lalu D4 selama 4 ketuk.',
    highlightedKeys: [0, 2],
    staffClef: 'treble',
    staffNotes: [
      { key: 0, octave: 4, duration: 4, finger: 1 },
      { key: 2, octave: 4, duration: 4, finger: 2 },
    ],
  },

  cg1: {
    theoryTitle: 'Grand Staff & Tanda Birama 4/4 (hal. 20-22)',
    theoryParagraphs: [
      'Grand Staff menggabungkan paranada Treble & Bass dengan tanda kurung kurawal. Middle C berada di garis bantu di antara dua paranada.',
      'Tanda Birama 4/4 berarti ada 4 ketuk per birama. Tanda Istirahat Seperempat (𝄽) berarti 1 ketuk diam (Rock-Along & Mexican Hat Dance).',
    ],
    keyPoints: [
      'Kurung kurawal menggabungkan paranada Treble dan Bass',
      '4/4 = 4 ketuk per birama',
    ],
    practiceTitle: 'Mainkan Tanda Istirahat Seperempat',
    practiceInstruction: 'Mainkan C4, diam 1 ketuk, mainkan E4, diam 1 ketuk.',
    highlightedKeys: [0, 4],
  },
  cg2: {
    theoryTitle: 'Interval Melodis (Ke-2 & Ke-3) & Dinamika (hal. 23-25)',
    theoryParagraphs: [
      'Interval adalah jarak nada antar not. Interval melodis dimainkan berurutan.',
      'Interval ke-2 melangkah ke tuts sebelah. Interval ke-3 melompat 1 tuts. Dinamika: piano (p = lembut) dan mezzo forte (mf = agak keras).',
    ],
    keyPoints: [
      'Ke-2 = Melangkah | Ke-3 = Melompat',
      'p = piano (lembut) | mf = mezzo forte (agak keras)',
    ],
    practiceTitle: 'Mainkan Interval 2 dan 3 (Au Claire de la Lune)',
    practiceInstruction: 'Mainkan C4-D4 (Ke-2), lalu C4-E4 (Ke-3).',
    highlightedKeys: [0, 2, 4],
  },
  cg3: {
    theoryTitle: 'Interval Harmonis (Ke-2 & Ke-3) & Forte (hal. 26-27)',
    theoryParagraphs: [
      'Interval harmonis adalah dua not yang dimainkan pada saat yang bersamaan.',
      'Tanda dinamika forte (f) berarti bermain dengan volume yang keras dan bertenaga (Rockin Intervals & Harmonica Rock).',
    ],
    keyPoints: [
      'Interval harmonis = not disuarakan bersamaan',
      'f = forte (keras)',
    ],
    practiceTitle: 'Mainkan Interval Ke-3 Harmonis (C4 + E4)',
    practiceInstruction: 'Tekan C4 dan E4 bersamaan.',
    highlightedKeys: [0, 4],
  },
  cg4: {
    theoryTitle: 'Interval Ke-4 & Ke-5 Melodis & Harmonis (hal. 28-31)',
    theoryParagraphs: [
      'Interval ke-4 membentang sejauh 4 huruf (contoh: C ke F). Interval ke-5 membentang sejauh 5 huruf (contoh: C ke G).',
      'Kuasai lagu Good King Wenceslas, My Fifth, Jingle Bells, dan Dueling Harmonics.',
    ],
    keyPoints: [
      'Ke-4 = garis ke spasi / spasi ke garis',
      'Ke-5 = garis ke garis / spasi ke spasi (batas luar tangan)',
    ],
    practiceTitle: 'Mainkan Interval Ke-5 (C4 ke G4)',
    practiceInstruction: 'Mainkan C4 lalu G4.',
    highlightedKeys: [0, 7],
  },

  ch1: {
    theoryTitle: 'Akor C Mayor & Tanda Istirahat Setengah (hal. 32-33)',
    theoryParagraphs: [
      'Akor adalah 3 not atau lebih yang dibunyikan bersama. Triad C Mayor dibentuk dari C - E - G (Akar, Ke-3, Ke-5).',
      'Tanda Istirahat Setengah (𝄾) berada di atas garis ke-3 dan menunjukkan 2 ketuk diam (Brother John).',
    ],
    keyPoints: [
      'Triad C Mayor = C + E + G',
      'Istirahat setengah = 2 ketuk diam',
    ],
    practiceTitle: 'Mainkan Akor C Mayor Penuh',
    practiceInstruction: 'Tekan C4, E4, dan G4 bersamaan.',
    highlightedKeys: [0, 4, 7],
  },
  ch2: {
    theoryTitle: 'Nada B untuk Tangan Kiri/Kanan & Akor G7 (hal. 34-39)',
    theoryParagraphs: [
      'Akor G7 menggunakan nada B - F - G. Transisi dari C Mayor ke G7 hanya butuh menggeser 2 jari!',
      'Kelingking kiri bergeser ke B2 sementara telunjuk memainkan F3 dan ibu jari tetap di G3 (Merrily We Roll Along & Mary Ann).',
    ],
    keyPoints: [
      'Akor G7 = B + F + G',
      'Perpindahan suara yang mulus dari C Mayor ke G7',
    ],
    practiceTitle: 'Harmonisasi C Mayor ke G7',
    practiceInstruction: 'Mainkan akor C Mayor (C4-E4-G4), lalu akor G7 (B3-F4-G4).',
    highlightedKeys: [0, 4, 7, 11, 5],
  },
  ch3: {
    theoryTitle: 'Tanda Birama 3/4 & Not Setengah Bertitik (hal. 40-41)',
    theoryParagraphs: [
      'Tanda Birama 3/4 berarti 3 ketuk per birama (Tempo Waltz).',
      'Not Setengah Bertitik (𝄤.) bernilai 3 ketuk (2 ketuk + separuh dari 2 = 3 ketuk) (Rockets).',
    ],
    keyPoints: [
      'Birama 3/4 = 3 ketuk per birama',
      'Not setengah bertitik = 3 ketuk',
    ],
    practiceTitle: 'Hitungan Waltz 3/4',
    practiceInstruction: 'Mainkan C4 (not setengah bertitik, tahan 3 ketuk).',
    highlightedKeys: [0],
  },
  ch4: {
    theoryTitle: 'Slur, Bermain Legato & Tie (Garis Lengkung) (hal. 42-43)',
    theoryParagraphs: [
      'Slur adalah garis melengkung yang menghubungkan not dengan nada berbeda, menandakan Legato (permainan tersambung mulus).',
      'Tie menghubungkan dua not dengan nada yang SAMA, menggabungkan durasi keduanya menjadi satu not panjang (Day Is Done).',
    ],
    keyPoints: [
      'Slur / Legato = transisi terhubung mulus',
      'Tie = gabungkan nilai not menjadi 1 not panjang',
    ],
    practiceTitle: 'Latihan Legato & Not Tie',
    practiceInstruction: 'Mainkan C4 ke E4 dengan mulus (Legato).',
    highlightedKeys: [0, 4],
  },
  ch5: {
    theoryTitle: 'Nada A untuk Tangan Kiri/Kanan & Akor F Mayor (hal. 44-49)',
    theoryParagraphs: [
      'Akor F Mayor terdiri dari C - F - A. Bersama dengan C Mayor (I) dan G7 (V7), mereka membentuk Akor Primer C Mayor.',
      'Kuasai progresi akor I - IV - V7 di When the Saints Go Marching In & Waltzing Chords.',
    ],
    keyPoints: [
      'Akor F Mayor = C + F + A',
      'Akor Primer C Mayor: I (C), IV (F), V7 (G7)',
    ],
    practiceTitle: 'Mainkan Progresi I - IV - V7 - I',
    practiceInstruction: 'Mainkan akor C Mayor -> F Mayor -> G7 -> C Mayor.',
    highlightedKeys: [0, 4, 7, 5, 9, 11],
  },

  g1: {
    theoryTitle: 'Posisi G & Interval di G (hal. 50-53)',
    theoryParagraphs: [
      'Dalam Posisi G, jari Tangan Kanan 1-5 berada di G4-A4-B4-C5-D5. Jari Tangan Kiri 5-1 berada di G3-A3-B3-C4-D4.',
      'Kuasai interval melodis dan harmonis dalam Posisi G (Love Somebody & Bandleader).',
    ],
    keyPoints: [
      'Posisi G Kanan = G4 ke D5',
      'Posisi G Kiri = G3 ke D4',
    ],
    practiceTitle: 'Jelajahi Posisi G',
    practiceInstruction: 'Mainkan G4, A4, B4, C5, D5.',
    highlightedKeys: [7, 9, 11, 0, 2],
  },
  g2: {
    theoryTitle: 'Tanda Kres (#) & Keterampilan Jari Seimbang (hal. 54-57)',
    theoryParagraphs: [
      'Tanda Kres (#) menaikkan nada sebesar setengah laras (tuts tepat di sebelah kanan). F# adalah tuts hitam setelah F.',
      'Terapkan solusi tangan Leschetizky untuk menyeimbangkan ketangkasan di semua jari (Money Can’t Buy Ev’rything).',
    ],
    keyPoints: [
      'Kres (#) = naik setengah laras ke kanan',
      'Teknik Leschetizky menyeimbangkan kemandirian jari',
    ],
    practiceTitle: 'Mainkan F Kres (F#4)',
    practiceInstruction: 'Tekan F#4 (tuts hitam tepat setelah F4).',
    highlightedKeys: [6],
  },
  g3: {
    theoryTitle: 'Akor G Mayor & D7 untuk Tangan Kiri & Kanan (hal. 58-60)',
    theoryParagraphs: [
      'Dalam Posisi G, Akor G Mayor (I) adalah G - B - D. Akor D7 (V7) adalah F# - C - D.',
      'Latihlah akor blok dan pola akor pecah (The Cuckoo & Liza Jane).',
    ],
    keyPoints: [
      'Akor G Mayor = G + B + D',
      'Akor D7 = F# + C + D',
    ],
    practiceTitle: 'Mainkan Akor G Mayor & D7',
    practiceInstruction: 'Mainkan akor G Mayor lalu akor D7.',
    highlightedKeys: [7, 11, 2, 6, 0],
  },
  g4: {
    theoryTitle: 'Menggunakan Pedal Damper (Sustain) (hal. 61-63)',
    theoryParagraphs: [
      'Pedal Damper (pedal paling kanan) mengangkat semua peredam dari senar, membuat nada bergema panjang dan memadukan harmoniknya.',
      'Pertahankan tumit di lantai dan tekan pedal dengan mulus menggunakan bantalan kaki (Harp Song).',
    ],
    keyPoints: [
      'Pedal kanan = Pedal Damper / Sustain',
      'Tumit di lantai, lepaskan pedal dengan mulus',
    ],
    practiceTitle: 'Mainkan Arpeggio dengan Sustain',
    practiceInstruction: 'Tekan G4, B4, D5, G5 dengan gema yang ditahan (sustain).',
    highlightedKeys: [7, 11, 2],
  },
  g5: {
    theoryTitle: 'Nada E & Posisi Akor C Mayor Baru (hal. 64-71)',
    theoryParagraphs: [
      'Memperluas Posisi G untuk mencakup nada E akan membentuk posisi inversi baru untuk C Mayor (G - C - E).',
      'Lakukan pemanasan menggunakan akor G, D7, dan C (Beautiful Brown Eyes & Alpine Melody).',
    ],
    keyPoints: [
      'Posisi C Mayor baru = G + C + E',
      'Perpindahan akor yang mulus di kunci G Mayor',
    ],
    practiceTitle: 'Mainkan Progresi G - D7 - C',
    practiceInstruction: 'Mainkan G Mayor -> D7 -> C Mayor (G-C-E) -> G Mayor.',
    highlightedKeys: [7, 11, 2, 6, 0, 4],
  },

  m1: {
    theoryTitle: 'Posisi Middle C (hal. 72)',
    theoryParagraphs: [
      'Dalam Posisi Middle C, kedua ibu jari berbagi nada Middle C (C4). Jari Tangan Kanan berada di C4-D4-E4-F4-G4 sedangkan Jari Tangan Kiri di F3-G3-A3-B3-C4 (Thumbs on C!).',
    ],
    keyPoints: [
      'Kedua ibu jari bertemu di Middle C (C4)',
      'Tangan Kanan memainkan nada di atas C4, Kiri nada di bawah C4',
    ],
    practiceTitle: 'Mainkan Thumbs on C',
    practiceInstruction: 'Tekan C4 dengan ibu jari Kanan, lalu C4 dengan ibu jari Kiri.',
    highlightedKeys: [0],
  },
  m2: {
    theoryTitle: 'Tanda Dinamika: Crescendo & Diminuendo (hal. 73)',
    theoryParagraphs: [
      'Crescendo (<) berarti bermain makin keras secara bertahap. Diminuendo / Decrescendo (>) berarti bermain makin lembut secara bertahap (Waltz Time).',
    ],
    keyPoints: [
      '< Crescendo = makin keras',
      '> Diminuendo = makin lembut',
    ],
    practiceTitle: 'Latihan Volume Dinamis',
    practiceInstruction: 'Mainkan C4 lembut, D4 sedang, E4 keras.',
    highlightedKeys: [0, 2, 4],
  },
  m3: {
    theoryTitle: 'Tanda Fermata & Not Seperdelapan (hal. 74-76)',
    theoryParagraphs: [
      'Fermata (𝄐) berarti menahan nada lebih lama dari nilai normalnya.',
      'Not Seperdelapan (♪) mendapat 1/2 ketuk masing-masing (hitung "1-dan-2-dan") (Happy Birthday, Shoo Fly Shoo, Skip to My Lou).',
    ],
    keyPoints: [
      'Fermata (𝄐) = tahan nada lebih lama',
      'Not seperdelapan = 1/2 ketuk',
    ],
    practiceTitle: 'Mainkan Ritme Not Seperdelapan',
    practiceInstruction: 'Mainkan C4-C4 (seperdelapan) D4 (seperempat).',
    highlightedKeys: [0, 2],
  },
  m4: {
    theoryTitle: 'D.C. al Fine & Not Seperempat Bertitik (hal. 77-80)',
    theoryParagraphs: [
      'Da Capo (D.C.) al Fine berarti mengulang dari awal lagu sampai menemukan kata Fine.',
      'Not Seperempat Bertitik mendapat 1.5 ketuk, diikuti oleh sebuah not seperdelapan (Standing in the Need of Prayer & Alouette).',
    ],
    keyPoints: [
      'D.C. al Fine = ulang dari awal hingga Fine',
      'Not seperempat bertitik = 1.5 ketuk',
    ],
    practiceTitle: 'Latihan Not Seperempat Bertitik',
    practiceInstruction: 'Mainkan C4 (tahan 1.5 ketuk) D4 (0.5 ketuk).',
    highlightedKeys: [0, 2],
  },
  m5: {
    theoryTitle: 'Aerobik Teknis Hanon (hal. 78, 81-82)',
    theoryParagraphs: [
      'Charles-Louis Hanon menciptakan latihan untuk membangun kemandirian jari, kekuatan yang seimbang, dan keluwesan pergelangan tangan.',
    ],
    keyPoints: [
      'Kekuatan seimbang pada jari 4 dan 5',
      'Gerakan pergelangan tangan fleksibel mengurangi kelelahan',
    ],
    practiceTitle: 'Latihan Jari Hanon',
    practiceInstruction: 'Mainkan C4-E4-F4-G4-A4-G4-F4-E4 dengan mulus.',
    highlightedKeys: [0, 4, 5, 7, 9],
  },

  ex1: {
    theoryTitle: 'Mengukur Interval Ke-6 & Tanda Birama 3/8 (hal. 83-86)',
    theoryParagraphs: [
      'Interval ke-6 membentang sejauh 6 nama nada (contoh: C ke A). Ini melebarkan rentangan melampaui posisi standar 5-jari.',
      'Tanda Birama 3/8 memiliki 3 ketuk not seperdelapan per birama (Lavender’s Blue & Kum-Ba-Yah).',
    ],
    keyPoints: [
      'Interval ke-6 = C ke A (rentangkan tangan)',
      'Birama 3/8 = 3 not seperdelapan per birama',
    ],
    practiceTitle: 'Mainkan Interval Ke-6 (C4 ke A4)',
    practiceInstruction: 'Mainkan C4 lalu rentangkan ke A4.',
    highlightedKeys: [0, 9],
  },
  ex2: {
    theoryTitle: 'Hanon Ke-6 & Bergerak di Interval Ke-6 (hal. 87-90)',
    theoryParagraphs: [
      'Latihlah menggeser tangan naik dan turun keyboard dalam interval ke-6 paralel.',
      'Kuasai London Bridge, Michael Row the Boat Ashore, Blow the Man Down, dan Lone Star Waltz.',
    ],
    keyPoints: [
      'Geser tangan dengan mulus sambil mempertahankan rentang interval ke-6',
    ],
    practiceTitle: 'Mainkan Geseran Harmonik Ke-6',
    practiceInstruction: 'Mainkan interval ke-6 C4+A4, lalu D4+B4.',
    highlightedKeys: [0, 9, 2, 11],
  },
  ex3: {
    theoryTitle: 'Artikulasi Staccato (hal. 91)',
    theoryParagraphs: [
      'Not staccato ditandai dengan titik di atas atau di bawah kepala not. Mainkan not pendek, renyah, dan terputus dengan pantulan ringan pergelangan tangan.',
    ],
    keyPoints: [
      'Titik staccato = suara pendek terputus',
      'Gerakan pantulan pergelangan tangan ringan',
    ],
    practiceTitle: 'Mainkan Not Staccato yang Renyah',
    practiceInstruction: 'Tekan C4, E4, G4 dengan pantulan staccato ringan.',
    highlightedKeys: [0, 4, 7],
  },
  ex4: {
    theoryTitle: 'Mengukur Interval Ke-7 & Oktaf (hal. 92-95)',
    theoryParagraphs: [
      'Interval ke-7 membentang sejauh 7 huruf (contoh: C ke B). Sebuah Oktaf membentang sejauh 8 huruf (C ke C).',
      'Kuasai lompatan interval lebar di Café Vienna & Lullaby.',
    ],
    keyPoints: [
      'Ke-7 = C ke B | Oktaf = C ke C (8 not)',
    ],
    practiceTitle: 'Mainkan Rentang Oktaf (C4 ke C5)',
    practiceInstruction: 'Mainkan C4 lalu lompat ke C5.',
    highlightedKeys: [0],
  },
  ex5: {
    theoryTitle: 'Tanda Mol (♭), Jarak Penuh & Tetrakord (hal. 96-99)',
    theoryParagraphs: [
      'Tanda Mol (♭) menurunkan nada sebesar setengah laras (ke kiri). Bb adalah tuts hitam di sebelah kiri B.',
      'Jarak Penuh sama dengan 2 setengah laras. Tetrakord adalah kelompok tangga nada 4 not (W-W-H) (Rock It Away).',
    ],
    keyPoints: [
      'Mol (♭) = turun 1 setengah laras ke kiri',
      'Jarak penuh = 2 semitone | Tetrakord = 4 not tangga nada',
    ],
    practiceTitle: 'Mainkan B Mol (Bb4)',
    practiceInstruction: 'Tekan Bb4 (tuts hitam di kiri B4).',
    highlightedKeys: [10],
  },

  sk1: {
    theoryTitle: 'Tangga Nada C Mayor & Persilangan Jari (hal. 100-106)',
    theoryParagraphs: [
      'Tangga Nada C Mayor terdiri dari 8 not: C D E F G A B C. Tangga nada ini tidak menggunakan kres atau mol.',
      'Penjarian Tangan Kanan: 1 - 2 - 3 (lewatkan ibu jari ke bawah) 1 - 2 - 3 - 4 - 5. Kuasai Joy to the World & Cockles and Mussels.',
    ],
    keyPoints: [
      'Penjarian Tangga Nada Kanan: 1 2 3 - 1 2 3 4 5',
      'Lewatkan ibu jari di bawah jari ke-3 setelah E4',
      'Akor Primer C Mayor: I (C), IV (F), V7 (G7)',
    ],
    practiceTitle: 'Mainkan 8-Not Tangga Nada C Mayor',
    practiceInstruction: 'Mainkan C4 D4 E4, lewatkan ibu jari ke F4 G4 A4 B4 C5.',
    highlightedKeys: [0, 2, 4, 5, 7, 9, 11],
    staffClef: 'treble',
    staffNotes: [
      { key: 0, octave: 4, duration: 1, finger: 1 },
      { key: 2, octave: 4, duration: 1, finger: 2 },
      { key: 4, octave: 4, duration: 1, finger: 3 },
      { key: 5, octave: 4, duration: 1, finger: 1 },
      { key: 7, octave: 4, duration: 1, finger: 2 },
      { key: 9, octave: 4, duration: 1, finger: 3 },
      { key: 11, octave: 4, duration: 1, finger: 4 },
      { key: 0, octave: 5, duration: 1, finger: 5 },
    ],
  },
  sk2: {
    theoryTitle: 'Progresi Blues & Tanda Pugar (Natural) (hal. 107-109)',
    theoryParagraphs: [
      'Tanda Pugar (♮) membatalkan kres atau mol selama sisa birama tersebut.',
      'Progresi Blues 12-bar memanfaatkan akor dominan ke-7 I7, IV7, dan V7 dalam groove yang ritmis (Got Those Blues & Blues for Wynton Marsalis).',
    ],
    keyPoints: [
      'Pugar (♮) membatalkan kres/mol',
      'Struktur 12-Bar Blues: I7 - IV7 - V7',
    ],
    practiceTitle: 'Mainkan Akor Blues',
    practiceInstruction: 'Mainkan akor C7 (C-E-G-Bb).',
    highlightedKeys: [0, 4, 7, 10],
  },
  sk3: {
    theoryTitle: 'Kunci G Mayor (Tanda Mula F#) & Sinkopasi (hal. 112-117)',
    theoryParagraphs: [
      'Kunci G Mayor memiliki satu kres dalam tanda mulanya: F#.',
      'Not sinkopasi memberi aksen pada ketukan lemah. Kuasai The Can-Can, Marines’ Hymn, dan Good People.',
    ],
    keyPoints: [
      'Tanda Mula = 1 kres (F#)',
      'Tangga Nada G Mayor: G A B C D E F# G',
      'Sinkopasi = penekanan ketukan lemah',
    ],
    practiceTitle: 'Mainkan Tangga Nada G Mayor',
    practiceInstruction: 'Mainkan G4 A4 B4 C5 D5 E5 F#5 G5.',
    highlightedKeys: [7, 9, 11, 0, 2, 4, 6],
  },
  sk4: {
    theoryTitle: 'Kunci F Mayor (Tanda Mula Bb) & Arpeggio (hal. 118-125)',
    theoryParagraphs: [
      'Kunci F Mayor memiliki satu mol dalam tanda mulanya: Bb.',
      'Penjarian Tangan Kanan: 1 - 2 - 3 - 4 (lewatkan ibu jari ke bawah) 1 - 2 - 3 - 4.',
      'Kuasai Little Brown Jug, Chiapanecas, Auld Lang Syne, O Sole Mio!, dan Akor Arpeggio.',
    ],
    keyPoints: [
      'Tanda Mula = 1 mol (Bb)',
      'Tangga Nada F Mayor: F G A Bb C D E F',
      'Akor arpeggio = sapuan akor pecah',
    ],
    practiceTitle: 'Mainkan Tangga Nada F Mayor',
    practiceInstruction: 'Mainkan F4 G4 A4 Bb4 C5 D5 E5 F5.',
    highlightedKeys: [5, 7, 9, 10, 0, 2, 4],
  },
  sk5: {
    theoryTitle: 'Kunci A Minor & Overlapping Pedal (hal. 126-133)',
    theoryParagraphs: [
      'A Minor adalah minor relatif dari C Mayor (tidak memiliki kres/mol). Tangga nada Minor Harmonis menaikkan G menjadi G#.',
      'Overlapping Pedal berarti menekan pedal SETELAH menekan akor baru untuk menciptakan transisi legato yang mulus (Greensleeves, Jericho, Go Down Moses).',
    ],
    keyPoints: [
      'A Minor relatif terhadap C Mayor (menaikkan ke-7: G#)',
      'Overlapping pedal = koneksi akor yang mulus',
    ],
    practiceTitle: 'Mainkan Tangga Nada A Minor Harmonis',
    practiceInstruction: 'Mainkan A4 B4 C5 D5 E5 F5 G#5 A5.',
    highlightedKeys: [9, 11, 0, 2, 4, 5, 8],
  },
  sk6: {
    theoryTitle: 'Kunci D Minor & Tangga Nada Minor Harmonis (hal. 134-137)',
    theoryParagraphs: [
      'D Minor adalah minor relatif dari F Mayor (berbagi 1 mol: Bb). Tangga nada D Minor Harmonis menaikkan C menjadi C#.',
      'Kuasai Scarborough Fair dan Raisins and Almonds.',
    ],
    keyPoints: [
      'D Minor relatif terhadap F Mayor (menaikkan ke-7: C#)',
      'Tangga nada D Minor Harmonis: D E F G A Bb C# D',
    ],
    practiceTitle: 'Mainkan Tangga Nada D Minor Harmonis',
    practiceInstruction: 'Mainkan D4 E4 F4 G4 A4 Bb4 C#5 D5.',
    highlightedKeys: [2, 4, 5, 7, 9, 10, 1],
  },
  sk7: {
    theoryTitle: 'Triplet & Etalase Pertunjukan Masterpiece (hal. 138-147)',
    theoryParagraphs: [
      'Triplet Not Seperdelapan memasukkan 3 not yang sama panjang ke dalam 1 ketukan not seperempat (hitung "1-dan-a, 2-dan-a").',
      'Mainkan aransemen piano klasik: He’s Got the Whole World in His Hands, Scott Joplin’s The Entertainer, dan Amazing Grace.',
    ],
    keyPoints: [
      'Triplet = 3 not per ketuk seperempat',
      'Ritme ragtime sinkopasi Scott Joplin',
      'Tinjauan semua akor primer dan kunci mayor/minor',
    ],
    practiceTitle: 'Mainkan Pemanasan Ritme Triplet',
    practiceInstruction: 'Mainkan C4-D4-E4 sebagai triplet dalam 1 ketuk.',
    highlightedKeys: [0, 2, 4],
  },
};
