
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, UserCircleIcon } from '../constants';
import { useSettings } from '../App';

const BottomNav: React.FC = () => {
    const { t } = useSettings();
    const navItems = [
      { path: '/app/home', icon: HomeIcon, label: t('home') },
      { path: '/app/friends', icon: UserGroupIcon, label: t('friends') },
      { path: '/app/profile', icon: UserCircleIcon, label: t('profile') },
    ];

    return (
        <nav className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-t-lg transition-colors duration-300">
            <div className="flex justify-around items-center h-20 max-w-md mx-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center space-y-1 w-20 transition-all duration-300 ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400 dark:text-gray-500'}`
                        }
                    >
                        <item.icon className="w-7 h-7" />
                        <span className={`text-xs font-medium ${item.label === t('friends') ? 'hidden' : ''}`}>{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full h-full flex flex-col bg-gradient-to-b from-purple-200 via-purple-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 transition-colors duration-300">
      <main className="flex-grow overflow-y-auto pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;