
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../App';

const EditProfileScreen: React.FC = () => {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState(user?.name || '');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if(name.trim()) {
            updateProfile(name);
            navigate('/app/profile');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="h-full bg-gray-50 p-6 pt-12"
        >
            <div className="flex items-center mb-8">
                <button onClick={() => navigate('/app/profile')} className="text-purple-600 font-semibold">
                    &larr; Batal
                </button>
                <h1 className="text-xl font-bold flex-grow text-center text-gray-800">Edit Profil</h1>
                <div className="w-10"></div> {/* Spacer */}
            </div>

            <div className="flex flex-col items-center mb-8">
                <img 
                    src={`https://api.dicebear.com/9.x/micah/svg?seed=${name}`} 
                    alt="Avatar Preview" 
                    className="w-28 h-28 rounded-full bg-white shadow-lg border-4 border-purple-200"
                />
                <p className="text-xs text-gray-500 mt-2">Avatar otomatis berubah sesuai nama</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                        placeholder="Masukkan nama baru"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-purple-700 transition transform active:scale-95"
                >
                    Simpan Perubahan
                </button>
            </form>
        </motion.div>
    );
};

export default EditProfileScreen;
