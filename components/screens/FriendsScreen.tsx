
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_FRIENDS } from '../../constants';
import { useAuth } from '../../App';
import type { User, Message } from '../../types';

const FriendCard: React.FC<{ user: User; onSelect: () => void; isSearchResult?: boolean }> = ({ user, onSelect, isSearchResult }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFollowing(!isFollowing);
    };

    return (
        <div onClick={onSelect} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition cursor-pointer mb-3">
            <div className="flex items-center space-x-3">
                <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full object-cover bg-gray-200"/>
                <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    {isSearchResult && <p className="text-xs text-purple-600">Ditemukan dari pencarian</p>}
                </div>
            </div>
            <button 
                onClick={handleFollow}
                className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-colors ${
                    isFollowing 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
            >
                {isFollowing ? 'Mengikuti' : 'Ikuti'}
            </button>
        </div>
    );
};

const ChatListItem: React.FC<{ user: User; lastMessage: Message; onSelect: () => void }> = ({ user, lastMessage, onSelect }) => {
    const isMe = lastMessage.senderId !== user.id;
    
    return (
        <div onClick={onSelect} className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition cursor-pointer mb-3">
            <div className="relative">
                <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full object-cover bg-gray-200"/>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-grow min-w-0">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 truncate">{user.name}</h3>
                    <span className="text-[10px] text-gray-400">
                        {new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                    {isMe && <span className="text-purple-600 mr-1">Anda:</span>}
                    {lastMessage.text}
                </p>
            </div>
        </div>
    );
};

const FriendProfileModal: React.FC<{ user: User; onClose: () => void }> = ({ user, onClose }) => {
    const navigate = useNavigate();
    
    const handlePlayTogether = () => {
        navigate('/app/challenge/daily');
    };

    const handleSendMessage = () => {
        navigate(`/app/chat/${user.id}`, { state: { user } });
    };
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-b from-purple-50 to-white w-full max-w-sm rounded-3xl shadow-2xl p-6 text-center"
            >
                <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full mx-auto -mt-16 border-4 border-white shadow-lg bg-gray-100"/>
                <h2 className="text-2xl font-bold mt-4 text-gray-800">{user.name}</h2>
                <div className="flex justify-center space-x-6 my-4 text-gray-600">
                    <div><span className="font-bold text-black">{user.followers}</span> Pengikut</div>
                    <div><span className="font-bold text-black">{user.following}</span> Mengikuti</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center my-6">
                    <div className="bg-white p-3 rounded-lg shadow-sm"><p className="text-sm text-gray-500">Karaoke Streak</p><p className="font-bold text-purple-600 text-lg">{user.karaokeStreak}</p></div>
                    <div className="bg-white p-3 rounded-lg shadow-sm"><p className="text-sm text-gray-500">Global Rank</p><p className="font-bold text-purple-600 text-lg">#{user.globalRank === 0 ? '-' : user.globalRank}</p></div>
                    <div className="bg-white p-3 rounded-lg shadow-sm col-span-2"><p className="text-sm text-gray-500">Total Skor</p><p className="font-bold text-purple-600 text-lg">{user.totalScore}</p></div>
                </div>

                <div className="flex space-x-3">
                    <button onClick={handlePlayTogether} className="flex-1 bg-purple-600 text-white font-bold py-3 rounded-full hover:bg-purple-700 transition">Main Bersama</button>
                    <button onClick={handleSendMessage} className="flex-1 bg-yellow-400 text-purple-900 font-bold py-3 rounded-full hover:bg-yellow-500 transition flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                        </svg>
                        Chat
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};


const FriendsScreen: React.FC = () => {
    const { user: currentUser, messages } = useAuth();
    const [activeTab, setActiveTab] = useState<'chats' | 'friends' | 'global'>('chats');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
    const navigate = useNavigate();

    // --- Logic for Recent Chats ---
    const getRecentChats = () => {
        if (!currentUser) return [];
        
        // 1. Group messages by the *other* person
        const chatHistory: { [key: string]: Message } = {};
        
        messages.forEach(msg => {
            const otherId = msg.senderId === currentUser.id ? msg.receiverId : msg.senderId;
            // Keep the latest message
            if (!chatHistory[otherId] || msg.timestamp > chatHistory[otherId].timestamp) {
                chatHistory[otherId] = msg;
            }
        });

        // 2. Convert to array and sort by time descending
        const sortedChats = Object.entries(chatHistory)
            .map(([otherId, lastMsg]) => {
                // Find user info
                let otherUser = MOCK_FRIENDS.find(u => u.id === otherId);
                if (!otherUser) {
                    // If not in mocks (e.g. global search result), reconstruct basic info
                    otherUser = {
                        id: otherId,
                        name: 'Pengguna', // Fallback
                        avatarUrl: `https://api.dicebear.com/9.x/micah/svg?seed=${otherId}`,
                        followers: 0, following: 0, karaokeStreak: 0, globalRank: 0, totalScore: 0, nim: ''
                    };
                    // Try to find name from search logic if possible, but for now fallback is ok
                    // Or if we had a global user cache, we'd use it.
                }
                return { user: otherUser, lastMessage: lastMsg };
            })
            .sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);

        return sortedChats;
    };

    // --- Logic for Friends / Search ---
    const getDisplayedUsers = () => {
        if (activeTab === 'friends') {
            return MOCK_FRIENDS.filter(friend =>
                friend.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else if (activeTab === 'global') {
            if (!searchTerm) return []; 
            const existing = MOCK_FRIENDS.filter(friend => 
                friend.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (existing.length > 0) return existing;

            const generatedUser: User = {
                id: `global-${searchTerm}`,
                name: searchTerm,
                nim: `G${Math.floor(Math.random() * 90000)}`,
                avatarUrl: `https://api.dicebear.com/9.x/micah/svg?seed=${searchTerm}`,
                followers: Math.floor(Math.random() * 500),
                following: Math.floor(Math.random() * 500),
                karaokeStreak: Math.floor(Math.random() * 10),
                globalRank: Math.floor(Math.random() * 5000),
                totalScore: Math.floor(Math.random() * 2000),
            };
            return [generatedUser];
        }
        return [];
    };

    const recentChats = getRecentChats();
    const displayedUsers = getDisplayedUsers();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 pt-12 h-full flex flex-col"
        >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Sosial</h1>
            
            {/* Tabs */}
            <div className="flex bg-gray-200 rounded-full p-1 mb-6 shadow-inner">
                 <button 
                    onClick={() => setActiveTab('chats')}
                    className={`flex-1 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${activeTab === 'chats' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500'}`}
                >
                    Obrolan
                </button>
                <button 
                    onClick={() => { setActiveTab('friends'); setSearchTerm(''); }}
                    className={`flex-1 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${activeTab === 'friends' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500'}`}
                >
                    Teman
                </button>
                <button 
                    onClick={() => { setActiveTab('global'); setSearchTerm(''); }}
                    className={`flex-1 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${activeTab === 'global' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500'}`}
                >
                    Cari
                </button>
            </div>

            {/* Search Bar (Only for Friends/Global) */}
            {activeTab !== 'chats' && (
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder={activeTab === 'friends' ? "Cari teman..." : "Ketik nama siapa saja..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-3 pl-10 pr-4 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                    </div>
                </div>
            )}
            
            {/* Content Area */}
            <div className="flex-grow overflow-y-auto pb-20">
                {activeTab === 'chats' ? (
                    recentChats.length > 0 ? (
                        recentChats.map(chat => (
                            <ChatListItem 
                                key={chat.user.id} 
                                user={chat.user} 
                                lastMessage={chat.lastMessage} 
                                onSelect={() => navigate(`/app/chat/${chat.user.id}`, { state: { user: chat.user } })} 
                            />
                        ))
                    ) : (
                        <div className="text-center pt-10 opacity-50">
                            <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <p className="text-gray-600 font-medium">Belum ada obrolan.</p>
                            <p className="text-sm text-gray-400">Cari teman dan mulai sapa mereka!</p>
                        </div>
                    )
                ) : (
                    displayedUsers.length > 0 ? (
                        displayedUsers.map(user => (
                            <FriendCard 
                                key={user.id} 
                                user={user} 
                                onSelect={() => setSelectedFriend(user)} 
                                isSearchResult={activeTab === 'global'}
                            />
                        ))
                    ) : (
                        <div className="text-center pt-10 opacity-50">
                            <p>{activeTab === 'friends' ? "Tidak ada teman ditemukan." : "Ketik nama untuk mencari."}</p>
                        </div>
                    )
                )}
            </div>

            <AnimatePresence>
                {selectedFriend && <FriendProfileModal user={selectedFriend} onClose={() => setSelectedFriend(null)} />}
            </AnimatePresence>
        </motion.div>
    );
};

export default FriendsScreen;
