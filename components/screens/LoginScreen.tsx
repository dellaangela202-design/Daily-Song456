
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../App';

const SocialIcon: React.FC<{ children: React.ReactNode; onClick: () => void; }> = ({ children, onClick }) => (
    <div onClick={onClick} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
        {children}
    </div>
);

const LoginScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
        alert("Harap isi semua kolom.");
        return;
    }
    login(email, password, name);
    navigate('/app/home');
  };
  
  const handleFeatureNotAvailable = () => {
    alert('Fitur ini sedang dalam pengembangan dan akan segera hadir!');
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-screen bg-gradient-to-b from-purple-400 to-purple-600 p-8 text-white"
    >
      <div className="flex-grow flex flex-col justify-center">
        <div className="text-left mb-10">
            <h1 className="text-4xl font-bold">Hello!</h1>
            <p className="text-lg text-purple-200">Welcome to</p>
        </div>
        
        <h2 className="text-5xl font-bold mb-10">Login</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-purple-200">Nama Pengguna*</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full bg-white/20 border-0 border-b-2 border-purple-300 rounded-t-md py-3 px-4 text-white placeholder-purple-200 focus:outline-none focus:ring-0 focus:border-white transition"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-purple-200">Email*</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full bg-white/20 border-0 border-b-2 border-purple-300 rounded-t-md py-3 px-4 text-white placeholder-purple-200 focus:outline-none focus:ring-0 focus:border-white transition"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-purple-200">Password*</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full bg-white/20 border-0 border-b-2 border-purple-300 rounded-t-md py-3 px-4 text-white placeholder-purple-200 focus:outline-none focus:ring-0 focus:border-white transition"
              required
            />
             <a href="#" onClick={handleFeatureNotAvailable} className="text-xs text-purple-200 hover:text-white float-right mt-2">Lupa Password</a>
          </div>
          
          <button
            type="submit"
            className="w-full bg-white text-purple-600 font-bold py-3 px-4 rounded-full shadow-lg hover:bg-purple-100 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>

      <div className="text-center">
        <p className="text-sm text-purple-200 mb-4">Or login with</p>
        <div className="flex justify-center space-x-4">
            <SocialIcon onClick={handleFeatureNotAvailable}>
                <svg className="w-6 h-6 text-blue-800" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" /></svg>
            </SocialIcon>
            <SocialIcon onClick={handleFeatureNotAvailable}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.657-3.356-11.303-7.918l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.45 44 30.634 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
            </SocialIcon>
            <SocialIcon onClick={handleFeatureNotAvailable}>
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M17.256 12.012c0 2.9-.847 4.904-2.733 4.904-1.92 0-2.83-1.89-4.882-1.89-2.02 0-3.132 1.89-4.81 1.89-1.857 0-2.8-2.02-2.8-4.903 0-3.332 1.34-6.075 3.633-6.075 1.583 0 2.658 1.053 4.022 1.053 1.332 0 2.625-.98 4.303-.98 2.22 0 3.247 2.704 3.247 5.002zm-5.485-6.937c.847-.98 1.41-2.31 1.223-3.708-1.053.07-2.343.664-3.214 1.686-.723.88-1.41 2.205-1.188 3.528 1.19.105 2.33-.455 3.18-1.506z"/></svg>
            </SocialIcon>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginScreen;