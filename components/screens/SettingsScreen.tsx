
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettings } from '../../App';

const SettingsScreen: React.FC = () => {
    const { theme, language, setTheme, setLanguage, t } = useSettings();
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="h-full bg-gray-50 dark:bg-gray-800 p-6 pt-12 transition-colors duration-300"
        >
            <div className="flex items-center mb-8">
                <button onClick={() => navigate('/app/profile')} className="text-purple-600 dark:text-purple-400 font-semibold">
                    &larr; {t('back')}
                </button>
                <h1 className="text-xl font-bold flex-grow text-center text-gray-800 dark:text-white">{t('settings')}</h1>
                <div className="w-10"></div> {/* Spacer */}
            </div>

            <div className="space-y-6">
                {/* Theme Section */}
                <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-6 transition-colors duration-300">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{t('chooseTheme')}</h2>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setTheme('light')}
                            className={`flex-1 py-3 px-4 rounded-lg border-2 flex items-center justify-center space-x-2 transition-all ${
                                theme === 'light'
                                    ? 'border-purple-600 bg-purple-50 text-purple-700'
                                    : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="font-medium">{t('light')}</span>
                        </button>
                        <button
                            onClick={() => setTheme('dark')}
                            className={`flex-1 py-3 px-4 rounded-lg border-2 flex items-center justify-center space-x-2 transition-all ${
                                theme === 'dark'
                                    ? 'border-purple-600 bg-gray-800 text-white'
                                    : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                            <span className="font-medium">{t('dark')}</span>
                        </button>
                    </div>
                </div>

                {/* Language Section */}
                <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-6 transition-colors duration-300">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{t('chooseLang')}</h2>
                    <div className="space-y-3">
                        <button
                            onClick={() => setLanguage('id')}
                            className={`w-full text-left px-4 py-3 rounded-lg border-2 flex items-center justify-between transition-all ${
                                language === 'id'
                                    ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-gray-600 dark:text-purple-200'
                                    : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                            }`}
                        >
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">🇮🇩</span>
                                <span className="font-medium">Bahasa Indonesia</span>
                            </div>
                            {language === 'id' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                        
                         <button
                            onClick={() => setLanguage('en')}
                            className={`w-full text-left px-4 py-3 rounded-lg border-2 flex items-center justify-between transition-all ${
                                language === 'en'
                                    ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-gray-600 dark:text-purple-200'
                                    : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                            }`}
                        >
                             <div className="flex items-center">
                                <span className="text-2xl mr-3">🇬🇧</span>
                                <span className="font-medium">English</span>
                            </div>
                            {language === 'en' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SettingsScreen;