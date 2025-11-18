
import React, { useState, useMemo, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { MOCK_USER, TRANSLATIONS, MOCK_FRIENDS } from './constants';
import type { User, Message, Theme, Language } from './types';
import { generateChatReply } from './services/geminiService';

import SplashScreen from './components/screens/SplashScreen';
import LoginScreen from './components/screens/LoginScreen';
import Layout from './components/Layout';
import HomeScreen from './components/screens/HomeScreen';
import ChallengeScreen from './components/screens/ChallengeScreen';
import FriendsScreen from './components/screens/FriendsScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import EditProfileScreen from './components/screens/EditProfileScreen';
import ChatScreen from './components/screens/ChatScreen';
import SettingsScreen from './components/screens/SettingsScreen';

// --- Settings Context ---
interface SettingsContextType {
    theme: Theme;
    language: Language;
    setTheme: (theme: Theme) => void;
    setLanguage: (lang: Language) => void;
    t: (key: keyof typeof TRANSLATIONS['id']) => string;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light');
    const [language, setLanguage] = useState<Language>('id');

    // Apply dark mode class to html
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const t = (key: keyof typeof TRANSLATIONS['id']) => {
        return TRANSLATIONS[language][key] || key;
    };

    const value = useMemo(() => ({ theme, language, setTheme, setLanguage, t }), [theme, language]);

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

// --- Auth Context ---

interface AuthContextType {
  user: User | null;
  messages: Message[];
  login: (email: string, pass: string, name: string) => void;
  logout: () => void;
  addScore: (points: number) => void;
  updateProfile: (name: string) => void;
  sendMessage: (receiverId: string, text: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const login = (email: string, pass: string, name: string) => {
    // Create a fresh new user (empty state)
    console.log(`Logging in with ${email}/${pass} as ${name}`);
    
    const newUser: User = {
        ...MOCK_USER,
        id: `user-${Date.now()}`,
        name: name || 'Guest',
        nim: `U${Math.floor(Math.random() * 10000)}`,
        avatarUrl: `https://api.dicebear.com/9.x/micah/svg?seed=${name || 'Guest'}`, // Unique avatar based on name
        followers: 0,
        following: 0,
        karaokeStreak: 0,
        globalRank: 0, // 0 means unranked
        totalScore: 0
    };
    
    setUser(newUser); 
  };

  const logout = () => {
    setUser(null);
    setMessages([]);
  };

  const addScore = (points: number) => {
    setUser((prevUser) => {
        if (!prevUser) return null;
        
        const newScore = prevUser.totalScore + points;
        // Simple fake ranking logic: Rank improves as score increases (starts high, goes low)
        // If score is 0, rank is 0. If score > 0, rank starts around 1000 and drops.
        const newRank = newScore > 0 ? Math.max(1, 1000 - Math.floor(newScore / 100)) : 0;

        return {
            ...prevUser,
            totalScore: newScore,
            karaokeStreak: prevUser.karaokeStreak + 1,
            globalRank: newRank
        };
    });
  };

  const updateProfile = (name: string) => {
    setUser((prevUser) => {
        if(!prevUser) return null;
        return {
            ...prevUser,
            name: name,
            avatarUrl: `https://api.dicebear.com/9.x/micah/svg?seed=${name}`
        }
    })
  }

  const sendMessage = (receiverId: string, text: string) => {
    if (!user) return;

    // 1. Add user message immediately
    const newMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: user.id,
        receiverId: receiverId,
        text: text,
        timestamp: Date.now(),
        isRead: false
    };

    setMessages(prev => [...prev, newMessage]);

    // 2. Simulate thinking time and generate AI reply
    // Determine friend name for context
    const friendName = MOCK_FRIENDS.find(f => f.id === receiverId)?.name || "Teman";

    setTimeout(async () => {
        try {
            const replyText = await generateChatReply(text, friendName);
            
            const replyMessage: Message = {
                id: `msg-reply-${Date.now()}`,
                senderId: receiverId,
                receiverId: user.id,
                text: replyText,
                timestamp: Date.now(),
                isRead: false
            };
            setMessages(prev => [...prev, replyMessage]);
        } catch (error) {
            console.error("Failed to generate reply", error);
        }
    }, 1500 + Math.random() * 1000); // Random delay between 1.5s and 2.5s
  };

  const value = useMemo(() => ({ user, messages, login, logout, addScore, updateProfile, sendMessage }), [user, messages]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route
                    path="/app/*"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Routes>
                                    <Route path="home" element={<HomeScreen />} />
                                    <Route path="challenge/:type" element={<ChallengeScreen />} />
                                    <Route path="friends" element={<FriendsScreen />} />
                                    <Route path="chat/:userId" element={<ChatScreen />} />
                                    <Route path="profile" element={<ProfileScreen />} />
                                    <Route path="profile/edit" element={<EditProfileScreen />} />
                                    <Route path="settings" element={<SettingsScreen />} />
                                </Routes>
                            </Layout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};


const App: React.FC = () => {
  return (
    <SettingsProvider>
        <AuthProvider>
            <div className="w-full h-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
                <div className="max-w-md mx-auto h-screen bg-purple-50 dark:bg-gray-800 shadow-lg overflow-hidden transition-colors duration-300">
                    <HashRouter>
                        <AnimatedRoutes />
                    </HashRouter>
                </div>
            </div>
        </AuthProvider>
    </SettingsProvider>
  );
};

export default App;
