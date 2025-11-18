
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth, useSettings } from '../../App';

const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-4 text-center transition-colors duration-300">
        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-300">{label}</p>
    </div>
);

const MenuItem: React.FC<{ label: string; icon: React.ReactNode; onClick?: () => void; }> = ({ label, icon, onClick }) => (
    <div onClick={onClick} className="flex items-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300">
        <div className="text-purple-600 dark:text-purple-400">{icon}</div>
        <span className="ml-4 font-medium text-gray-700 dark:text-gray-200">{label}</span>
        <div className="flex-grow text-right">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </div>
    </div>
);

const ProfileScreen: React.FC = () => {
    const { user, logout } = useAuth();
    const { t } = useSettings();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleFeatureNotAvailable = () => {
        alert('Fitur ini sedang dalam pengembangan dan akan segera hadir!');
    };
    
    const handleEditProfile = () => {
        navigate('/app/profile/edit');
    }
    
    const handleSettings = () => {
        navigate('/app/settings');
    }

    if (!user) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-8"
        >
            <div className="bg-purple-500 h-40 pt-10 px-6 rounded-b-3xl">
                <h1 className="text-2xl font-bold text-white text-center">{t('profile')}</h1>
            </div>
            <div className="px-6 -mt-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-colors duration-300">
                    <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full border-4 border-purple-200 shadow-md bg-gray-100"/>
                    <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-white">{user.name}</h2>
                    <div className="flex justify-center space-x-6 my-4 text-gray-600 dark:text-gray-300">
                        <div><span className="font-bold text-black dark:text-white">{user.followers}</span> {t('followers')}</div>
                        <div><span className="font-bold text-black dark:text-white">{user.following}</span> {t('following')}</div>
                    </div>
                    <button onClick={handleEditProfile} className="border-2 border-purple-500 text-purple-600 dark:text-purple-400 dark:border-purple-400 font-semibold px-6 py-2 rounded-full text-sm hover:bg-purple-50 dark:hover:bg-gray-700 transition">
                        {t('editProfile')}
                    </button>
                </div>
            </div>

            <div className="px-6 mt-6">
                <div className="grid grid-cols-3 gap-4">
                    <StatCard label={t('streak')} value={user.karaokeStreak} />
                    <StatCard label={t('rank')} value={user.globalRank === 0 ? '-' : `#${user.globalRank}`} />
                    <StatCard label={t('score')} value={user.totalScore} />
                </div>
            </div>

            <div className="px-6 mt-6 space-y-3">
                 <MenuItem onClick={handleFeatureNotAvailable} label={t('notifications')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>} />
                 <MenuItem onClick={handleSettings} label={t('settings')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0 3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
                 <MenuItem onClick={handleFeatureNotAvailable} label={t('help')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                <MenuItem label={t('logout')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>} onClick={handleLogout}/>
            </div>
        </motion.div>
    );
};

export default ProfileScreen;