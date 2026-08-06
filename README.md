# 🎹 PianoLearn App

<div align="center">

![PianoLearn App](https://img.shields.io/badge/PianoLearn-v1.0.0-00E5FF?style=for-the-badge&logo=react)
![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react)
![Expo](https://img.shields.io/badge/Expo-SDK_54-000000?style=for-the-badge&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-00FF88?style=for-the-badge)

*Aplikasi pembelajaran piano interaktif real-time bertenaga AI untuk pemula hingga profesional.*  
*An interactive AI-powered real-time piano learning app for beginners to professionals.*

</div>

---

> 💡 **Personal Motivation / Cerita Latar Belakang**
> 
> **🇮🇩 Bahasa Indonesia:**  
> Aplikasi ini berawal dari hobi pribadi saya dalam belajar memainkan piano. Saat mencari media pembelajaran, saya menyadari sulitnya menemukan aplikasi gratis berkualitas yang benar-benar efektif dalam membimbing proses latihan musik dari tingkat dasar (beginner) hingga mahir (profesional). Oleh karena itu, saya membangun **PianoLearn** sebagai solusi komprehensif dan gratis bagi siapa saja yang ingin belajar piano secara interaktif.
> 
> **🇬🇧 English:**  
> This application was born out of my personal passion for learning the piano. While searching for learning tools, I found it challenging to find high-quality, free apps that effectively support the music education journey from beginner to professional levels. Therefore, I built **PianoLearn** to provide a free, feature-rich, and interactive solution for anyone aspiring to learn the piano.

---

## 🇮🇩 Bahasa Indonesia

### 📌 Deskripsi Aplikasi
**PianoLearn** adalah aplikasi mobile & web interaktif yang membantu Anda mempelajari piano secara menyenangkan dan terstruktur. Aplikasi ini dilengkapi dengan dua mode latihan utama:
1. **Tuts Layar (Touch Mode)**: Latihan interaktif menggunakan tuts piano virtual di layar dengan respon suara sintetis dan efek haptik.
2. **Piano Asli (Real Piano Mic Mode)**: Latihan menggunakan **piano fisik asli** di rumah Anda! Aplikasi menggunakan mikrofon untuk mendeteksi suara piano secara *real-time* lengkap dengan **AI Noise Clearance** untuk menyaring suara bising ruangan.

### 🌟 Fitur Unggulan
- 🎤 **Real-Time Pitch Detection**: Deteksi otomatis frekuensi nada piano fisik menggunakan algoritma YIN dengan latency sangat rendah.
- 🪄 **AI Noise Clearance**: Fitur penyaring kebisingan berbasis *AI Spectral Noise Gating* untuk menghilangkan gangguan suara AC, angin, atau percakapan di sekitar.
- 🎼 **Mode Latihan Waterfall Notes**: Tampilan notasi lagu jatuh interaktif lengkap dengan penanda tangan kanan/kiri, not balok, dan not angka/huruf.
- 📚 **Perpustakaan Lagu & Tangga Nada**: Akses lagu klasik (Beyer 50, Beyer 74, Beyer 100, Hanon, Minuet in G, Malam Kudus, dll.) serta eksplorasi tangga nada Major, Minor, Pentatonic, dan Blues.
- 🧠 **Kuis & Teori Musik**: Latihan membaca not angka, kuis pendengaran nada (*ear training*), dan identifikasi chord.
- 🏆 **Sistem Gamifikasi**: Lacak perolehan XP, kenaikan Level, Streak harian, dan pembukaan Lencana Pencapaian (*Achievements Badges*).

### 🛠️ Teknologi yang Digunakan (Tech Stack)
- **Framework Utama**: React Native `0.81.5`, Expo `SDK 54` (New Architecture / TurboModules)
- **Routing & Navigasi**: Expo Router `v6` (File-based Navigation)
- **Manajemen State**: Zustand `v5` + AsyncStorage (Preservasi progres otomatis)
- **Desain & UI**: NativeWind `v4` (Tailwind CSS) + React Native Reanimated `v4`
- **Pemrosesan Sinyal Audio**: Web Audio API & `expo-av`, Custom YIN Pitch Engine, AI Noise Gate Processor

### 💻 Cara Menjalankan Aplikasi Secara Lokal

#### 1. Prasyarat
- Node.js versi 18 atau lebih baru.
- Aplikasi **Expo Go** pada HP Android/iOS Anda (atau Emulator Android Studio / `scrcpy`).

#### 2. Clone Repository
```bash
git clone https://github.com/christnayosua/piano-learn-app.git
cd piano-learn-app
```

#### 3. Install Dependensi
```bash
npm install --legacy-peer-deps
```

#### 4. Jalankan Server Pengembangan
```bash
npx expo start
```

#### 5. Buka Aplikasi
- **Di HP Android / iOS**: Scan QR code yang muncul di terminal menggunakan kamera HP atau aplikasi Expo Go.
- **Di Web Browser**: Tekan tombol `w` di terminal.
- **Di Emulator Android**: Tekan tombol `a` di terminal.

---

## 🇬🇧 English

### 📌 Application Overview
**PianoLearn** is an interactive mobile & web application designed to make learning the piano enjoyable, effective, and structured. It features two primary practice modes:
1. **Touch Mode**: Interactive practice using an on-screen virtual keyboard with dynamic sound synthesis and haptic feedback.
2. **Real Piano Mic Mode**: Practice with your **actual physical acoustic/digital piano**! The app uses your device's microphone for *real-time note tracking* paired with **AI Noise Clearance** to filter room acoustics.

### 🌟 Key Features
- 🎤 **Real-Time Pitch Detection**: Instant acoustic pitch recognition using an optimized C++/TS YIN algorithm with sub-10ms latency.
- 🪄 **AI Noise Clearance**: Intelligent *AI Spectral Noise Gating* to eliminate ambient room noises like AC hums, fans, and background chatter.
- 🎼 **Waterfall Practice Mode**: Interactive scrolling notes with left/right hand color guides, letter notes, and sheet music cues.
- 📚 **Song Library & Scale Explorer**: Collection of classical study pieces (Beyer 50, 74, 100, Hanon exercises, Minuet in G, Silent Night, etc.) and comprehensive scale charts (Major, Minor, Pentatonic, Blues).
- 🧠 **Quizzes & Music Theory**: Note reading challenges, ear training exercises, and chord identification tests.
- 🏆 **Gamified Progress**: Track your XP, Level progression, Daily Streaks, and unlockable Achievement Badges.

### 🛠️ Tech Stack
- **Core Framework**: React Native `0.81.5`, Expo `SDK 54` (New Architecture enabled)
- **Routing & Navigation**: Expo Router `v6`
- **State Management**: Zustand `v5` + AsyncStorage (Auto persistence)
- **UI & Animation**: NativeWind `v4` (Tailwind CSS) + React Native Reanimated `v4`
- **Audio & Signal Processing**: Web Audio API & `expo-av`, Custom YIN Pitch Engine, AI Noise Gate Processor

### 💻 Local Setup & Installation

#### 1. Prerequisites
- Node.js (v18 or higher).
- **Expo Go** app on your iOS/Android device (or Android Studio Emulator).

#### 2. Clone Repository
```bash
git clone https://github.com/christnayosua/piano-learn-app.git
cd piano-learn-app
```

#### 3. Install Dependencies
```bash
npm install --legacy-peer-deps
```

#### 4. Start Development Server
```bash
npx expo start
```

#### 5. Launch App
- **Mobile Device**: Scan the terminal QR code using Expo Go app.
- **Web Browser**: Press `w` in the terminal.
- **Android Emulator**: Press `a` in the terminal.

---

<div align="center">

Made with ❤️ by **Christna Yosua**  
*Happy Piano Practice! 🎹✨*

</div>
