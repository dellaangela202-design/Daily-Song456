
import React from 'react';
import type { User, Song, SpecialChallenge } from './types';

export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

export const UserGroupIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-1.023 1.535-1.84 2.66-2.435m-7.5 0a4.5 4.5 0 119 0m-9 0a4.5 4.5 0 00-9 0m9 0c0-.53.038-1.04.108-1.54M9 18.75v-2.187c0-.597.237-1.17.659-1.591l.206-.206a.5.5 0 01.707 0l3.747 3.747a.5.5 0 010 .707l-.206.206a2.121 2.121 0 01-1.591.659v4.5M9 18.75a4.5 4.5 0 01-4.5-4.5M9 18.75a4.5 4.5 0 004.5-4.5m-4.5 4.5L9 14.25" />
  </svg>
);

export const UserCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const MusicNoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V7.5A2.25 2.25 0 0013.5 6h-3a2.25 2.25 0 00-2.25 2.25v1.5m1.5 6.375V16.5m0 0v-1.5m0 1.5v-1.5m0 0l3.75-1.039a2.25 2.25 0 001.632-2.163z" />
  </svg>
);

export const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18 13.5l-.259 1.035a3.375 3.375 0 00-2.456 2.456L14.25 18l1.035.259a3.375 3.375 0 002.456 2.456L18 21.75l.259-1.035a3.375 3.375 0 002.456-2.456L21.75 18l-1.035-.259a3.375 3.375 0 00-2.456-2.456z" />
    </svg>
);

export const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M15 19.128L18 18.5" />
    </svg>
);

// Initial template for a new user (Empty state)
export const MOCK_USER: User = {
  id: '',
  name: '',
  nim: '',
  avatarUrl: '',
  followers: 0,
  following: 0,
  karaokeStreak: 0,
  globalRank: 0, // 0 indicates unranked
  totalScore: 0,
};

export const MOCK_FRIENDS: User[] = [
    { id: 'user-2', name: 'Yuspa', nim: 'F0000002', avatarUrl: 'https://api.dicebear.com/9.x/micah/svg?seed=Yuspa', followers: 120, following: 30, karaokeStreak: 12, globalRank: 8, totalScore: 2007 },
    { id: 'user-3', name: 'Cien', nim: 'F0000003', avatarUrl: 'https://api.dicebear.com/9.x/micah/svg?seed=Cien', followers: 80, following: 25, karaokeStreak: 5, globalRank: 45, totalScore: 300 },
    { id: 'user-4', name: 'Jimin', nim: 'F0000004', avatarUrl: 'https://api.dicebear.com/9.x/micah/svg?seed=Jimin', followers: 500, following: 2, karaokeStreak: 50, globalRank: 2, totalScore: 9800 },
    { id: 'user-5', name: 'Decha', nim: 'F0000005', avatarUrl: 'https://api.dicebear.com/9.x/micah/svg?seed=Decha', followers: 45, following: 45, karaokeStreak: 3, globalRank: 102, totalScore: 250 },
    { id: 'user-6', name: 'Anggel', nim: 'F0000006', avatarUrl: 'https://api.dicebear.com/9.x/micah/svg?seed=Anggel', followers: 500, following: 30, karaokeStreak: 12, globalRank: 3, totalScore: 8500 },
    { id: 'user-7', name: 'Rika', nim: 'F0000007', avatarUrl: 'https://api.dicebear.com/9.x/micah/svg?seed=Rika', followers: 90, following: 15, karaokeStreak: 10, globalRank: 33, totalScore: 1500 },
    { id: 'user-8', name: 'Ellsa', nim: 'F0000008', avatarUrl: 'https://api.dicebear.com/9.x/micah/svg?seed=Ellsa', followers: 75, following: 50, karaokeStreak: 8, globalRank: 50, totalScore: 1100 },
];

export const TRANSLATIONS = {
    id: {
        home: 'Beranda',
        friends: 'Teman',
        profile: 'Profil',
        settings: 'Pengaturan',
        theme: 'Tema',
        language: 'Bahasa',
        light: 'Terang',
        dark: 'Gelap',
        logout: 'Keluar',
        editProfile: 'Edit Profil',
        followers: 'Pengikut',
        following: 'Mengikuti',
        streak: 'Karaoke Streak',
        rank: 'Peringkat Global',
        score: 'Total Skor',
        help: 'Bantuan',
        notifications: 'Notifikasi',
        back: 'Kembali',
        save: 'Simpan',
        chooseTheme: 'Pilih Tampilan',
        chooseLang: 'Pilih Bahasa',
        welcome: 'Hai',
        ready: 'Siap untuk tantangan hari ini?',
        dailyChallenge: 'Tantangan Harian',
        specialChallenge: 'Tantangan Khusus',
        friendChallenge: 'Tantangan Bersama'
    },
    en: {
        home: 'Home',
        friends: 'Friends',
        profile: 'Profile',
        settings: 'Settings',
        theme: 'Theme',
        language: 'Language',
        light: 'Light',
        dark: 'Dark',
        logout: 'Logout',
        editProfile: 'Edit Profile',
        followers: 'Followers',
        following: 'Following',
        streak: 'Karaoke Streak',
        rank: 'Global Rank',
        score: 'Total Score',
        help: 'Help',
        notifications: 'Notifications',
        back: 'Back',
        save: 'Save',
        chooseTheme: 'Choose Appearance',
        chooseLang: 'Choose Language',
        welcome: 'Hi',
        ready: 'Ready for today\'s challenge?',
        dailyChallenge: 'Daily Challenge',
        specialChallenge: 'Special Challenge',
        friendChallenge: 'Challenge Friends'
    }
};

// A royalty-free upbeat track for demo purposes
const DEMO_INSTRUMENTAL = 'https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=upbeat-pop-126466.mp3';

export const MOCK_SONGS: Song[] = [
    { 
        id: 's1', 
        title: 'About You', 
        artist: 'The 1975', 
        genre: 'english', 
        coverUrl: 'https://picsum.photos/seed/aboutyou/400',
        coverArtistUrl: 'https://picsum.photos/seed/the1975/200',
        instrumentalUrl: DEMO_INSTRUMENTAL,
        lyrics: [
            { text: "I know a place", startTime: 2, endTime: 5 },
            { text: "It's somewhere I go when I'm alone", startTime: 5.5, endTime: 9 },
            { text: "And I know you hate it", startTime: 9.5, endTime: 12 },
            { text: "But everything there is made of stone", startTime: 12.5, endTime: 16 },
            { text: "And I know I'm not a saviour", startTime: 16.5, endTime: 19 },
            { text: "And I know that I can be strange", startTime: 19.5, endTime: 22 },
            { text: "But I'm trying to be better", startTime: 22.5, endTime: 25 },
            { text: "I'm trying to be better now", startTime: 25.5, endTime: 28 },
            { text: "Do you think I have forgotten?", startTime: 29, endTime: 33 },
            { text: "Do you think I have forgotten?", startTime: 33.5, endTime: 37 },
            { text: "Do you think I have forgotten about you?", startTime: 37.5, endTime: 43 },
            { text: "There was something about you that now I can't remember", startTime: 44, endTime: 50 },
            { text: "It's the same damn thing that made my heart surrender", startTime: 50.5, endTime: 56 },
            { text: "And I miss you on a train, I miss you in the morning", startTime: 56.5, endTime: 62 },
            { text: "I never know what to think about", startTime: 62.5, endTime: 65 },
            { text: "I think about you", startTime: 66, endTime: 70 }
        ] 
    },
    { 
        id: 's2', 
        title: 'Best Part', 
        artist: 'Daniel Caesar ft. H.E.R.', 
        genre: 'english', 
        coverUrl: 'https://picsum.photos/seed/bestpart/400',
        coverArtistUrl: 'https://picsum.photos/seed/danielcaesar/200',
        instrumentalUrl: DEMO_INSTRUMENTAL,
        lyrics: [
            { text: "You don't know babe", startTime: 2, endTime: 5 },
            { text: "When you hold me", startTime: 5.5, endTime: 8 },
            { text: "And kiss me slowly", startTime: 8.5, endTime: 11 },
            { text: "It's the sweetest thing", startTime: 11.5, endTime: 14 },
            { text: "And it don't change", startTime: 14.5, endTime: 17 },
            { text: "If I had it my way", startTime: 17.5, endTime: 20 },
            { text: "You would know that you are", startTime: 20.5, endTime: 24 },
            { text: "You're the coffee that I need in the morning", startTime: 25, endTime: 29 },
            { text: "You're my sunshine in the rain when it's pouring", startTime: 29.5, endTime: 34 },
            { text: "Won't you give yourself to me", startTime: 34.5, endTime: 37 },
            { text: "Give it all, oh", startTime: 37.5, endTime: 40 },
            { text: "I just wanna see", startTime: 41, endTime: 43 },
            { text: "I just wanna see how beautiful you are", startTime: 43.5, endTime: 47 },
            { text: "You know that I see it", startTime: 47.5, endTime: 50 },
            { text: "I know you're a star", startTime: 50.5, endTime: 53 },
            { text: "Where you go I follow", startTime: 53.5, endTime: 56 },
            { text: "No matter how far", startTime: 56.5, endTime: 59 },
            { text: "If life is a movie", startTime: 60, endTime: 63 },
            { text: "Oh you're the best part, oh", startTime: 63.5, endTime: 68 },
            { text: "You're the best part, oh", startTime: 69, endTime: 74 }
        ]
    },
    { 
        id: 's3', 
        title: 'Monolog', 
        artist: 'Pamungkas', 
        genre: 'pop', 
        coverUrl: 'https://picsum.photos/seed/monolog/400',
        coverArtistUrl: 'https://picsum.photos/seed/pamungkas/200',
        instrumentalUrl: DEMO_INSTRUMENTAL,
        lyrics: [
            { text: "Gelap di dalam tanya", startTime: 3, endTime: 7 },
            { text: "Menyimpankan rahasianya", startTime: 7.5, endTime: 11 },
            { text: "Letih, kehabisan kata", startTime: 11.5, endTime: 15 },
            { text: "Dan kita pada akhirnya diam", startTime: 15.5, endTime: 20 },
            { text: "Bisu, tak mampu bicara", startTime: 21, endTime: 25 },
            { text: "Apa yang salah, tak pernah kita tahu", startTime: 25.5, endTime: 30 },
            { text: "Cinta, sudah lewat waktunya", startTime: 31, endTime: 35 },
            { text: "Kita sama-sama berubah", startTime: 35.5, endTime: 39 },
            { text: "Rindu, sudah beda arahnya", startTime: 40, endTime: 44 },
            { text: "Sudah, sudahi semua", startTime: 45, endTime: 49 },
            { text: "Alasan masih bersama", startTime: 50, endTime: 53 },
            { text: "Bukan karena terlanjur lama", startTime: 53.5, endTime: 58 },
            { text: "Tapi rasanya yang masih sama", startTime: 59, endTime: 64 },
            { text: "Seperti sejak pertama jumpa", startTime: 65, endTime: 70 }
        ]
    },
    { 
        id: 's4', 
        title: 'doremi', 
        artist: 'Budi Doremi', 
        genre: 'pop', 
        coverUrl: 'https://picsum.photos/seed/doremi/400',
        coverArtistUrl: 'https://picsum.photos/seed/budidoremi/200',
        instrumentalUrl: DEMO_INSTRUMENTAL,
        lyrics: [
            { text: "Hari ini akupun tak mengerti", startTime: 2, endTime: 6 },
            { text: "Mengapa kau marah-marah lagi", startTime: 6.5, endTime: 10 },
            { text: "Mungkin karena yang kemarin", startTime: 10.5, endTime: 14 },
            { text: "Soal pesan singkatmu yang lupa ku balas", startTime: 14.5, endTime: 19 },
            { text: "Kau bidadari jatuh dari surga di hadapanku, ea", startTime: 20, endTime: 25 },
            { text: "Kau bidadari jatuh dari surga tepat di hatiku, ea", startTime: 25.5, endTime: 30 },
            { text: "So, I will fly to the sky to get you and you will be mine", startTime: 31, endTime: 36 },
            { text: "Do-do-do-do-do-do", startTime: 36.5, endTime: 38 },
            { text: "Karena kau do-do-do-re-mi-mi-mi", startTime: 38.5, endTime: 43 },
            { text: "Fa-fa-fa-sol-la-si-do-do-do-do it for me", startTime: 43.5, endTime: 48 },
            { text: "Karena kau do-do-do-re-mi-mi-mi", startTime: 48.5, endTime: 53 },
            { text: "Fa-fa-fa-sol-la-si-do-do-do-do it for me", startTime: 53.5, endTime: 58 },
            { text: "Makan ati", startTime: 59, endTime: 62 }
        ]
    },
    { 
        id: 's5', 
        title: 'Dynamite', 
        artist: 'BTS', 
        genre: 'kpop', 
        coverUrl: 'https://picsum.photos/seed/dynamite/400',
        coverArtistUrl: 'https://picsum.photos/seed/bts/200',
        instrumentalUrl: DEMO_INSTRUMENTAL,
        lyrics: [
            { text: "'Cause I-I-I'm in the stars tonight", startTime: 2, endTime: 5 },
            { text: "So watch me bring the fire and set the night alight", startTime: 5.5, endTime: 9 },
            { text: "Shoes on, get up in the morn'", startTime: 10, endTime: 12 },
            { text: "Cup of milk, let's rock and roll", startTime: 12.5, endTime: 14.5 },
            { text: "King Kong, kick the drum, rolling on like a Rolling Stone", startTime: 15, endTime: 19 },
            { text: "Sing song when I'm walking home", startTime: 19.5, endTime: 22 },
            { text: "Jump up to the top, LeBron", startTime: 22.5, endTime: 24 },
            { text: "Ding dong, call me on my phone", startTime: 24.5, endTime: 26.5 },
            { text: "Ice tea and a game of ping pong", startTime: 27, endTime: 29 },
            { text: "This is getting heavy, can you hear the bass boom?", startTime: 30, endTime: 34 },
            { text: "I'm ready, life is sweet as honey", startTime: 34.5, endTime: 38 },
            { text: "Yeah, this beat cha ching like money", startTime: 38.5, endTime: 42 },
            { text: "Disco overload, I'm into that, I'm good to go", startTime: 42.5, endTime: 46 },
            { text: "I'm in the stars tonight", startTime: 47, endTime: 50 },
            { text: "So watch me bring the fire and set the night alight", startTime: 50.5, endTime: 54 },
            { text: "Shining through the city with a little funk and soul", startTime: 54.5, endTime: 59 },
            { text: "So I'ma light it up like dynamite, whoa-oh-oh", startTime: 59.5, endTime: 64 }
        ]
    },
    { 
        id: 's6', 
        title: 'Shut Down', 
        artist: 'BLACKPINK', 
        genre: 'kpop', 
        coverUrl: 'https://picsum.photos/seed/shutdown/400',
        coverArtistUrl: 'https://picsum.photos/seed/blackpink/200',
        instrumentalUrl: DEMO_INSTRUMENTAL,
        lyrics: [
            { text: "Blackpink in your area", startTime: 2, endTime: 4 },
            { text: "Blackpink in your area", startTime: 4.5, endTime: 7 },
            { text: "It's not a comeback since we've never been gone", startTime: 8, endTime: 11 },
            { text: "Heads turning, careful, you'll break your neck", startTime: 11.5, endTime: 15 },
            { text: "Pink ice drips and drips, we're on a rampage", startTime: 15.5, endTime: 19 },
            { text: "Pop, pop, pop, it's getting real", startTime: 19.5, endTime: 22 },
            { text: "Don't look at me, it's not in my nature", startTime: 23, endTime: 26 },
            { text: "To cater to your expectations", startTime: 26.5, endTime: 29 },
            { text: "When I pull up, you know it's a shut down", startTime: 30, endTime: 34 },
            { text: "Whip it, whip it, whip it, whip it", startTime: 35, endTime: 37 },
            { text: "Whip it, whip it, whip it, whip it", startTime: 37.5, endTime: 40 },
            { text: "It's black and it's pink once the sun down", startTime: 40.5, endTime: 44 },
            { text: "Keep watching me shut it down", startTime: 45, endTime: 48 }
        ]
    },
    { 
        id: 's7', 
        title: 'Komang', 
        artist: 'Raim Laode', 
        genre: 'pop', 
        coverUrl: 'https://picsum.photos/seed/komang/400',
        coverArtistUrl: 'https://picsum.photos/seed/raim/200',
        instrumentalUrl: DEMO_INSTRUMENTAL,
        lyrics: [
            { text: "Dari kejauhan", startTime: 2, endTime: 5 },
            { text: "Tergambar cerita tentang kita", startTime: 5.5, endTime: 9 },
            { text: "Terpisah jarak dan waktu", startTime: 9.5, endTime: 13 },
            { text: "Ingin kuungkapkan rindu", startTime: 13.5, endTime: 17 },
            { text: "Lewat kata indah", startTime: 17.5, endTime: 20 },
            { text: "Tak cukup untuk dirimu", startTime: 20.5, endTime: 24 },
            { text: "Sebab kau terlalu indah dari sekedar kata", startTime: 25, endTime: 30 },
            { text: "Dunia berhenti sejenak menikmati indahmu", startTime: 30.5, endTime: 36 },
            { text: "Dan apabila tak bersamamu", startTime: 37, endTime: 40 },
            { text: "Ku pastikan ku jalani dunia tak seindah kemarin", startTime: 40.5, endTime: 46 },
            { text: "Sederhana tertawamu sudah cukup", startTime: 47, endTime: 52 },
            { text: "Lengkapi sempurnanya hidupku", startTime: 52.5, endTime: 56 },
            { text: "Terima kasih", startTime: 57, endTime: 60 }
        ]
    },
    { 
        id: 's8', 
        title: 'Sial', 
        artist: 'Mahalini', 
        genre: 'pop', 
        coverUrl: 'https://picsum.photos/seed/sial/400',
        coverArtistUrl: 'https://picsum.photos/seed/mahalini/200',
        instrumentalUrl: DEMO_INSTRUMENTAL,
        lyrics: [
            { text: "Sampai saat ini tak terpikir olehku", startTime: 2, endTime: 6 },
            { text: "Aku pernah beri rasa pada orang sepertimu", startTime: 6.5, endTime: 11 },
            { text: "Seandainya sejak awal ku tahu akhirnya begini", startTime: 11.5, endTime: 16 },
            { text: "Ku takkan mau mencintaimu, oh", startTime: 16.5, endTime: 21 },
            { text: "Tutur batinku tak akan salah", startTime: 22, endTime: 26 },
            { text: "Silahkan pergi ku tak rasa kalah", startTime: 26.5, endTime: 30 },
            { text: "Namun percuma takkan ada ajakan", startTime: 30.5, endTime: 35 },
            { text: "Seseorang yang tulus kan datang", startTime: 35.5, endTime: 39 },
            { text: "Lalu bagaimana dengan aku yang terlanjur mencintaimu?", startTime: 40, endTime: 46 },
            { text: "Yang datang beri harapan, lalu pergi dan menghilang", startTime: 46.5, endTime: 52 },
            { text: "Tak terpikirkan olehmu, hatiku hancur kar'namu", startTime: 52.5, endTime: 58 },
            { text: "Tanpa sedikit alasan, pergi tanpa berpamitan", startTime: 58.5, endTime: 64 },
            { text: "Sial-sialnya ku bertemu denganmu", startTime: 65, endTime: 70 }
        ]
    },
    { 
        id: 's9', 
        title: 'As It Was', 
        artist: 'Harry Styles', 
        genre: 'english', 
        coverUrl: 'https://picsum.photos/seed/harry/400',
        coverArtistUrl: 'https://picsum.photos/seed/styles/200',
        instrumentalUrl: DEMO_INSTRUMENTAL,
        lyrics: [
            { text: "Holdin' me back", startTime: 2, endTime: 4 },
            { text: "Gravity's holdin' me back", startTime: 4.5, endTime: 7 },
            { text: "I want you to hold out the palm of your hand", startTime: 7.5, endTime: 11 },
            { text: "Why don't we leave it at that?", startTime: 11.5, endTime: 14 },
            { text: "Nothin' to say", startTime: 14.5, endTime: 17 },
            { text: "When everything gets in the way", startTime: 17.5, endTime: 21 },
            { text: "Seems you cannot be replaced", startTime: 21.5, endTime: 24 },
            { text: "And I'm the one who will stay, oh-oh-oh", startTime: 24.5, endTime: 28 },
            { text: "In this world, it's just us", startTime: 29, endTime: 33 },
            { text: "You know it's not the same as it was", startTime: 33.5, endTime: 37 },
            { text: "In this world, it's just us", startTime: 37.5, endTime: 41 },
            { text: "You know it's not the same as it was", startTime: 41.5, endTime: 45 },
            { text: "As it was, as it was", startTime: 45.5, endTime: 49 },
            { text: "You know it's not the same", startTime: 49.5, endTime: 53 }
        ]
    },
    { 
        id: 's10', 
        title: 'Hati-Hati di Jalan', 
        artist: 'Tulus', 
        genre: 'pop', 
        coverUrl: 'https://picsum.photos/seed/tulus/400',
        coverArtistUrl: 'https://picsum.photos/seed/tulus2/200',
        instrumentalUrl: DEMO_INSTRUMENTAL,
        lyrics: [
            { text: "Perjalanan membawamu", startTime: 2, endTime: 5 },
            { text: "Bertemu denganku", startTime: 5.5, endTime: 8 },
            { text: "Ku bertemu kamu", startTime: 8.5, endTime: 11 },
            { text: "Sepertimu yang kucari", startTime: 12, endTime: 15 },
            { text: "Konon aku juga seperti yang kaucari", startTime: 15.5, endTime: 20 },
            { text: "Kukira kita asam dan garam", startTime: 21, endTime: 25 },
            { text: "Dan kita bertemu di belanga", startTime: 25.5, endTime: 29 },
            { text: "Kisah yang ternyata tak seindah itu", startTime: 29.5, endTime: 34 },
            { text: "Kukira kita akan bersama", startTime: 35, endTime: 39 },
            { text: "Begitu banyak yang sama", startTime: 39.5, endTime: 43 },
            { text: "Latarmu dan latarku", startTime: 43.5, endTime: 46 },
            { text: "Kukira takkan ada kendala", startTime: 46.5, endTime: 50 },
            { text: "Kukira ini kan mudah", startTime: 50.5, endTime: 53 },
            { text: "Kau aku jadi kita", startTime: 53.5, endTime: 57 },
            { text: "Kasih sayangmu membekas", startTime: 58, endTime: 61 },
            { text: "Redam kini sudah pijar istimewa", startTime: 61.5, endTime: 65 },
            { text: "Entah apa maksud dunia", startTime: 65.5, endTime: 68 },
            { text: "Tentang ujung cerita", startTime: 68.5, endTime: 71 },
            { text: "Kita tidak bersama", startTime: 71.5, endTime: 74 },
            { text: "Semoga rindu ini menghilang", startTime: 74.5, endTime: 78 },
            { text: "Konon katanya waktu sembuhkan", startTime: 78.5, endTime: 82 },
            { text: "Akan adakah lagi yang sepertimu", startTime: 82.5, endTime: 86 },
            { text: "Kukira kita akan bersama", startTime: 87, endTime: 90 }
        ]
    },
    { 
        id: 's11', 
        title: 'Ditto', 
        artist: 'NewJeans', 
        genre: 'kpop', 
        coverUrl: 'https://picsum.photos/seed/ditto/400',
        coverArtistUrl: 'https://picsum.photos/seed/newjeans/200',
        instrumentalUrl: DEMO_INSTRUMENTAL,
        lyrics: [
            { text: "Woo woo woo, woo woo woo", startTime: 2, endTime: 6 },
            { text: "Stay in the middle", startTime: 6.5, endTime: 8.5 },
            { text: "Like you a little", startTime: 9, endTime: 11 },
            { text: "Don't want no riddle", startTime: 11.5, endTime: 13.5 },
            { text: "Malhaejwo say it back", startTime: 14, endTime: 16 },
            { text: "Oh, say it ditto", startTime: 16.5, endTime: 19 },
            { text: "Achim-eun neomu meoreo", startTime: 19.5, endTime: 22 },
            { text: "So say it ditto", startTime: 22.5, endTime: 25 },
            { text: "I don't want to walk in this labyrinth", startTime: 26, endTime: 29 },
            { text: "Not only you, but everything", startTime: 29.5, endTime: 32 },
            { text: "Ra-ta-ta-ta", startTime: 33, endTime: 35 },
            { text: "Ra-ta-ta-ta", startTime: 35.5, endTime: 38 },
            { text: "I got no time to lose", startTime: 39, endTime: 41 },
            { text: "I had a long day", startTime: 41.5, endTime: 43 },
            { text: "I miss you, ra-ta-ta-ta", startTime: 43.5, endTime: 47 },
            { text: "Ra-ta-ta-ta", startTime: 47.5, endTime: 50 }
        ]
    }
];

export const SPECIAL_CHALLENGES: SpecialChallenge[] = [
    {id: 'sc1', title: 'Duet Misterius', icon: <UsersIcon className="w-8 h-8 text-purple-600" />},
    {id: 'sc2', title: 'Skala Nada Tinggi', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg> },
    {id: 'sc3', title: 'Geotagging Lagu', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg> },
    {id: 'sc4', title: 'Madley Estafet Misterius', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.092 1.21-.138 2.43-.138 3.662v.513a5.035 5.035 0 004.93 4.981l.006.002 2.38.08a2.25 2.25 0 012.24 2.247l.007.002v.421a5.035 5.035 0 004.93-4.981v-.513z" /></svg>},
];