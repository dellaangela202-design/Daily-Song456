
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth, useSettings } from '../../App';
import { MusicNoteIcon, SparklesIcon, UserGroupIcon } from '../../constants';

const ChallengeCard: React.FC<{ title: string; to: string; icon: React.ReactNode; delay: number; }> = ({ title, to, icon, delay }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            onClick={() => navigate(to)}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 flex items-center space-x-4 shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
            </div>
            <div className="flex-grow text-right">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </motion.div>
    );
}

const HomeScreen: React.FC = () => {
    const { user } = useAuth();
    const { t } = useSettings();
  
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 h-full"
        >
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-left mb-10 pt-8"
            >
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('welcome')} {user?.name}!</h1>
                <p className="text-gray-500 dark:text-gray-300">{t('ready')}</p>
            </motion.div>

            <div className="space-y-5">
                <ChallengeCard title={t('dailyChallenge')} to="/app/challenge/daily" icon={<MusicNoteIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />} delay={0.2} />
                <ChallengeCard title={t('specialChallenge')} to="/app/challenge/special" icon={<SparklesIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />} delay={0.4} />
                <ChallengeCard title={t('friendChallenge')} to="/app/friends" icon={<UserGroupIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />} delay={0.6} />
            </div>
        </motion.div>
    );
};

export default HomeScreen;