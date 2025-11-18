
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../App';
import { MOCK_FRIENDS } from '../../constants';
import type { User } from '../../types';

const ChatScreen: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user, messages, sendMessage } = useAuth();
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Retrieve user data
    const receiver: User = state?.user || MOCK_FRIENDS.find(u => u.id === userId) || {
        id: userId || 'unknown',
        name: 'Pengguna',
        avatarUrl: `https://api.dicebear.com/9.x/micah/svg?seed=${userId}`,
        followers: 0, following: 0, karaokeStreak: 0, globalRank: 0, totalScore: 0, nim: ''
    };

    // Filter and Sort Messages
    const conversation = messages.filter(msg => 
        (msg.senderId === user?.id && msg.receiverId === userId) ||
        (msg.senderId === userId && msg.receiverId === user?.id)
    ).sort((a, b) => a.timestamp - b.timestamp);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim() && userId) {
            sendMessage(userId, inputText);
            setInputText('');
        }
    };

    return (
        <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-gray-100 flex flex-col"
        >
            {/* Header */}
            <div className="bg-purple-600 p-3 px-4 shadow-md flex items-center text-white shrink-0">
                <button onClick={() => navigate(-1)} className="mr-3 p-1 hover:bg-purple-700 rounded-full transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <img src={receiver.avatarUrl} alt={receiver.name} className="w-10 h-10 rounded-full border-2 border-purple-400 bg-gray-200" />
                <div className="ml-3 flex-grow">
                    <h2 className="font-bold leading-tight text-lg">{receiver.name}</h2>
                    <p className="text-xs text-purple-200 flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                        Online
                    </p>
                </div>
                <button className="p-2 hover:bg-purple-700 rounded-full">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-2 bg-[#e5ddd5]">
                {conversation.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full opacity-60">
                        <div className="bg-white p-4 rounded-full mb-2 shadow-sm">
                            <span className="text-4xl">👋</span>
                        </div>
                        <p className="text-gray-600 text-sm">Mulai percakapan dengan {receiver.name}</p>
                    </div>
                ) : (
                    conversation.map((msg) => {
                        const isMe = msg.senderId === user?.id;
                        return (
                            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] px-3 py-2 rounded-xl shadow-sm relative text-sm ${
                                    isMe 
                                    ? 'bg-purple-100 text-gray-800 rounded-tr-none' 
                                    : 'bg-white text-gray-800 rounded-tl-none'
                                }`}>
                                    <p className="mb-1">{msg.text}</p>
                                    <div className="flex justify-end items-center space-x-1">
                                         <span className="text-[10px] text-gray-500">
                                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        {isMe && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white p-2 px-3 shrink-0 flex items-center space-x-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] safe-area-pb">
                 <button className="p-2 text-gray-500 hover:text-purple-600 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <form onSubmit={handleSend} className="flex-grow flex items-center">
                    <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Ketik pesan..." 
                        className="w-full bg-gray-100 text-gray-800 rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-400 transition"
                    />
                </form>
                <button 
                    onClick={handleSend}
                    disabled={!inputText.trim()}
                    className={`p-3 rounded-full transition-all shadow-md ${
                        inputText.trim() 
                        ? 'bg-purple-600 text-white transform hover:scale-105 active:scale-95' 
                        : 'bg-gray-200 text-gray-400'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </div>
        </motion.div>
    );
};

export default ChatScreen;
