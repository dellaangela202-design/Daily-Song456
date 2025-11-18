
// Fix: Import React to make React.ReactNode available.
import React from 'react';

export type Theme = 'light' | 'dark';
export type Language = 'id' | 'en';

export interface User {
  id: string;
  name: string;
  nim: string;
  avatarUrl: string;
  followers: number;
  following: number;
  karaokeStreak: number;
  globalRank: number;
  totalScore: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
  isRead: boolean;
}

export interface LyricLine {
  text: string;
  startTime: number;
  endTime: number;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: 'kpop' | 'english' | 'pop';
  coverUrl: string;
  coverArtistUrl: string;
  lyrics: LyricLine[];
  instrumentalUrl: string;
}

export interface SpecialChallenge {
  id: string;
  title: string;
  icon: React.ReactNode;
}