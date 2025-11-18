
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SPECIAL_CHALLENGES, MOCK_SONGS, MOCK_FRIENDS } from '../../constants';
import type { Song, User } from '../../types';
import { generateChallengeDescription } from '../../services/geminiService';
import { useAuth } from '../../App';

// Sub-components defined in the same file to keep it compact
const GenreButton: React.FC<{ genre: string; onSelect: (genre: string) => void; }> = ({ genre, onSelect }) => (
    <button onClick={() => onSelect(genre)} className="w-full text-left p-4 bg-white rounded-lg shadow-md hover:bg-purple-100 transition">
        <h3 className="font-semibold capitalize text-gray-700">{genre} Song</h3>
    </button>
);

const SongCard: React.FC<{ song: Song; onSelect: (song: Song) => void; }> = ({ song, onSelect }) => (
    <div onClick={() => onSelect(song)} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-purple-100 cursor-pointer">
        <img src={song.coverUrl} alt={song.title} className="w-16 h-16 rounded-md object-cover" />
        <div>
            <p className="font-semibold text-gray-800">{song.title}</p>
            <p className="text-sm text-gray-500">{song.artist}</p>
        </div>
    </div>
);

const KaraokeView: React.FC<{ song: Song; onBack: () => void; }> = ({ song, onBack }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunksRef = useRef<Blob[]>([]);
    const lyricsContainerRef = useRef<HTMLDivElement | null>(null);
    const { addScore } = useAuth();
    
    const [status, setStatus] = useState<'idle' | 'singing' | 'finished'>('idle');
    const [currentLineIndex, setCurrentLineIndex] = useState(-1);
    const [progress, setProgress] = useState(0);
    const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
            }
            const currentLine = song.lyrics.findIndex(
                (line) => audio.currentTime >= line.startTime && audio.currentTime <= line.endTime
            );
            setCurrentLineIndex(currentLine);
        };
        
        const handleEnded = () => {
            // When music ends, stop recording automatically
            stopSinging(false); 
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [song.lyrics]);

    useEffect(() => {
        if (currentLineIndex > -1 && lyricsContainerRef.current) {
            const currentLineElement = lyricsContainerRef.current.children[currentLineIndex] as HTMLElement;
            if (currentLineElement) {
                const container = lyricsContainerRef.current;
                const elementTop = currentLineElement.offsetTop;
                const elementHeight = currentLineElement.offsetHeight;
                const containerHeight = container.offsetHeight;
                
                container.scrollTo({
                    top: elementTop - containerHeight / 2 + elementHeight / 2,
                    behavior: 'smooth'
                });
            }
        }
    }, [currentLineIndex]);

    const cleanupRecording = () => {
        if (recordedAudioUrl) {
            URL.revokeObjectURL(recordedAudioUrl);
            setRecordedAudioUrl(null);
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    }

    const startSinging = async () => {
        cleanupRecording();
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            mediaRecorderRef.current = new MediaRecorder(stream);
            recordedChunksRef.current = [];
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunksRef.current.push(event.data);
                }
            };
            mediaRecorderRef.current.start();
            
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(e => console.error("Audio playback failed", e));
            }
            setStatus('singing');
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Tidak dapat mengakses mikrofon. Mohon izinkan akses mikrofon untuk melanjutkan.");
        }
    };
    
    const stopSinging = (resetAudio = true) => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            
            mediaRecorderRef.current.onstop = () => {
                 const recordedBlob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
                 const url = URL.createObjectURL(recordedBlob);
                 setRecordedAudioUrl(url);
                 console.log("Rekaman tersedia di:", url);
            };
        }
        
        if (audioRef.current) {
            audioRef.current.pause();
            if (resetAudio) {
                audioRef.current.currentTime = 0;
            }
        }

        if(resetAudio) {
            setStatus('idle');
            setCurrentLineIndex(-1);
            setProgress(0);
        } else {
            setStatus('finished');
            // Award points for finishing the song
            // Calculate random score between 80 and 100 for demo purposes
            const earnedPoints = Math.floor(Math.random() * (100 - 80 + 1)) + 80;
            setScore(earnedPoints);
            addScore(earnedPoints);
        }
    };

    const handleBack = () => {
        if (status === 'singing') {
            stopSinging();
        }
        cleanupRecording();
        onBack();
    };

    return (
        <motion.div 
            initial={{ y: '100%' }} 
            animate={{ y: 0 }} 
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="absolute inset-0 bg-purple-900 text-white flex flex-col p-4 z-20"
        >
            <audio ref={audioRef} src={song.instrumentalUrl} preload="auto" crossOrigin="anonymous"></audio>

            <div className="flex items-center space-x-4 flex-shrink-0">
                <button onClick={handleBack} className="text-white p-2 rounded-full hover:bg-white/10 transition">&larr; Kembali</button>
                <div className="text-center flex-grow">
                    <h2 className="text-lg font-bold truncate">{song.title}</h2>
                    <h3 className="text-sm text-purple-300">{song.artist}</h3>
                </div>
                <div className="w-20"></div>
            </div>

            <div ref={lyricsContainerRef} className="flex-grow my-4 overflow-auto text-center flex flex-col justify-center py-32">
                {song.lyrics.map((line, index) => (
                    <p key={index} className={`transition-all duration-300 text-4xl font-bold p-3 leading-relaxed ${
                        index === currentLineIndex
                            ? 'text-yellow-300 scale-110'
                            : 'text-gray-300 opacity-50'
                    }`}>
                        {line.text}
                    </p>
                ))}
            </div>

            <div className="w-full bg-purple-700 rounded-full h-2.5 mb-4 flex-shrink-0">
                <div className="bg-yellow-300 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="text-center flex-shrink-0 pb-6 flex flex-col justify-center items-center min-h-[120px]">
                {status === 'idle' && (
                    <>
                        <p className="text-sm text-purple-300 mb-2">Tekan mulai untuk merekam dan bernyanyi</p>
                        <button onClick={startSinging} className="bg-yellow-300 text-purple-900 font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition">
                            Mulai Bernyanyi
                        </button>
                    </>
                )}
                {status === 'singing' && (
                     <button onClick={() => stopSinging()} className="bg-red-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition flex items-center mx-auto">
                        <div className="w-3 h-3 bg-white rounded-sm animate-pulse mr-2"></div>
                        Berhenti & Selesai
                    </button>
                )}
                 {status === 'finished' && (
                    <div className="flex flex-col items-center space-y-4 w-full max-w-md bg-purple-800/50 p-4 rounded-2xl">
                         <div className="text-center">
                             <p className="text-yellow-300 font-bold text-2xl">Luar Biasa!</p>
                             <p className="text-white text-lg">Skor Kamu: {score}</p>
                         </div>
                         
                         {recordedAudioUrl ? (
                             <div className="w-full">
                                 <p className="text-xs text-purple-200 mb-1 text-left">Hasil Rekamanmu:</p>
                                 <audio src={recordedAudioUrl} controls className="w-full h-10 rounded-md" />
                             </div>
                         ) : (
                             <p className="text-sm text-gray-400">Memproses rekaman...</p>
                         )}
                         
                        <button onClick={startSinging} className="bg-white/20 text-white font-semibold py-2 px-6 rounded-full hover:bg-white/30 transition">
                            Nyanyi Ulang
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};


const DailyChallengeFlow: React.FC = () => {
    type DailyStep = 'options' | 'genre' | 'songlist' | 'karaoke';
    const [step, setStep] = useState<DailyStep>('options');
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);

    const handleShuffle = () => {
        const randomSong = MOCK_SONGS[Math.floor(Math.random() * MOCK_SONGS.length)];
        setSelectedSong(randomSong);
        setStep('karaoke');
    };

    const handleGenreSelect = (genre: string) => {
        setSelectedGenre(genre);
        setStep('songlist');
    };

    const handleSongSelect = (song: Song) => {
        setSelectedSong(song);
        setStep('karaoke');
    };
    
    const reset = () => {
        setStep('options');
        setSelectedGenre(null);
        setSelectedSong(null);
    }
    
    const getBackFunction = () => {
        if (selectedGenre) {
            return () => setStep('songlist');
        }
        return reset;
    }


    const renderContent = () => {
        if (step === 'songlist' && selectedGenre) {
            const songs = MOCK_SONGS.filter(s => s.genre === selectedGenre);
            return (
                <motion.div key="songlist" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="p-6 space-y-4">
                     <button onClick={() => setStep('genre')} className="text-purple-600 mb-2">&larr; Kembali ke Genre</button>
                    <h2 className="text-xl font-bold capitalize">{selectedGenre} Songs</h2>
                    {songs.length === 0 ? (
                         <p className="text-gray-500">Tidak ada lagu di genre ini.</p>
                    ) : (
                        songs.map(song => <SongCard key={song.id} song={song} onSelect={handleSongSelect} />)
                    )}
                </motion.div>
            );
        }
        if (step === 'genre') {
            return (
                <motion.div key="genre" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="p-6 space-y-4">
                    <button onClick={reset} className="text-purple-600 mb-2">&larr; Kembali</button>
                    <h2 className="text-xl font-bold">Pilih Genre</h2>
                    <GenreButton genre="pop" onSelect={handleGenreSelect} />
                    <GenreButton genre="kpop" onSelect={handleGenreSelect} />
                    <GenreButton genre="english" onSelect={handleGenreSelect} />
                </motion.div>
            );
        }

        return (
            <motion.div key="options" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-4">
                 <h2 className="text-2xl font-bold text-center">Tantangan Harian</h2>
                <button onClick={handleShuffle} className="w-full p-6 bg-purple-500 text-white rounded-xl shadow-lg hover:bg-purple-600 transition flex flex-col items-center justify-center space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    <h3 className="text-lg font-semibold">MODE ACAK (SURPRISE)</h3>
                </button>
                <button onClick={() => setStep('genre')} className="w-full p-6 bg-white text-purple-600 rounded-xl shadow-lg hover:bg-gray-50 transition flex flex-col items-center justify-center space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                    <h3 className="text-lg font-semibold">PILIH LAGU</h3>
                </button>
            </motion.div>
        );
    }

    return (
        <div className="relative">
            <AnimatePresence mode="wait">
                {renderContent()}
            </AnimatePresence>
            <AnimatePresence>
                {step === 'karaoke' && selectedSong && <KaraokeView song={selectedSong} onBack={getBackFunction()} />}
            </AnimatePresence>
        </div>
    );
};

const SpecialChallengeFlow: React.FC = () => {
    const [selectedChallenge, setSelectedChallenge] = useState<typeof SPECIAL_CHALLENGES[0] | null>(null);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [criteriaResult, setCriteriaResult] = useState<{ met: boolean; requirement: string | null }>({ met: true, requirement: null });
    const navigate = useNavigate();
    const { user } = useAuth();

    const checkChallengeCriteria = (challengeId: string, currentUser: User | null, friendsCount: number) => {
        if (!currentUser) return { met: false, requirement: "Anda harus login." };

        switch (challengeId) {
            case 'sc1': // Duet Misterius
                const metSc1 = friendsCount >= 1;
                return {
                    met: metSc1,
                    requirement: metSc1 ? null : "Anda memerlukan setidaknya 1 teman untuk mencoba tantangan ini."
                };
            case 'sc2': // Skala Nada Tinggi
                const metSc2 = currentUser.totalScore >= 1000;
                return {
                    met: metSc2,
                    requirement: metSc2 ? null : "Skor total Anda harus minimal 1000 untuk membuka tantangan ini."
                };
            case 'sc3': // Geotagging Lagu
                const metSc3 = currentUser.karaokeStreak >= 5;
                return {
                    met: metSc3,
                    requirement: metSc3 ? null : "Capai 5 hari beruntun karaoke untuk membuka tantangan ini."
                };
            case 'sc4': // Madley Estafet Misterius
                const metSc4 = currentUser.globalRank > 0 && currentUser.globalRank <= 10;
                return {
                    met: metSc4,
                    requirement: metSc4 ? null : "Masuk ke peringkat 10 besar global untuk mencoba tantangan estafet ini."
                };
            default:
                return { met: true, requirement: null };
        }
    };

    const handleSelectChallenge = async (challenge: typeof SPECIAL_CHALLENGES[0]) => {
        setSelectedChallenge(challenge);

        const criteria = checkChallengeCriteria(challenge.id, user, MOCK_FRIENDS.length);
        setCriteriaResult(criteria);
        
        setIsLoading(true);
        const desc = await generateChallengeDescription(challenge.title);
        setDescription(desc);
        setIsLoading(false);
    };
    
    const handleStartChallenge = () => {
        // As a placeholder, navigate to the daily challenge flow
        setSelectedChallenge(null);
        navigate('/app/challenge/daily');
    };

    return (
        <div className="p-6">
             <h2 className="text-2xl font-bold text-center mb-6">Tantangan Khusus</h2>
             <div className="space-y-4">
                 {SPECIAL_CHALLENGES.map(challenge => (
                     <div key={challenge.id} onClick={() => handleSelectChallenge(challenge)} className="flex items-center p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-purple-50 transition">
                         {challenge.icon}
                         <span className="ml-4 font-semibold text-gray-700">{challenge.title}</span>
                     </div>
                 ))}
             </div>

            <AnimatePresence>
                {selectedChallenge && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-30"
                        onClick={() => setSelectedChallenge(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 w-full max-w-sm text-center"
                        >
                            <div className="mx-auto w-fit p-3 bg-purple-100 rounded-full mb-4">
                                {selectedChallenge.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{selectedChallenge.title}</h3>
                            {isLoading ? (
                                <div className="animate-pulse space-y-2 my-4">
                                    <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full mx-auto"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/6 mx-auto"></div>
                                </div>
                            ) : (
                                <p className="text-gray-600 mb-6">{description}</p>
                            )}

                            {!criteriaResult.met && (
                                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 my-4 rounded-md text-left" role="alert">
                                    <p className="font-bold">Tantangan Terkunci</p>
                                    <p className="text-sm">{criteriaResult.requirement}</p>
                                </div>
                            )}
                            
                            <div className="flex space-x-2">
                                <button onClick={() => setSelectedChallenge(null)} className="flex-1 bg-gray-200 text-gray-800 px-6 py-2 rounded-full font-semibold">Kembali</button>
                                <button 
                                    onClick={handleStartChallenge} 
                                    className={`flex-1 text-white px-6 py-2 rounded-full font-semibold transition-colors ${
                                        criteriaResult.met ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                                    disabled={!criteriaResult.met}
                                >
                                    Mulai Tantangan
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


const ChallengeScreen: React.FC = () => {
    const { type } = useParams<{ type: string }>();
    const navigate = useNavigate();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative min-h-full pt-12">
            <button onClick={() => navigate('/app/home')} className="absolute top-5 left-5 z-10 font-semibold text-purple-600 bg-purple-100/50 rounded-full px-3 py-1 text-sm">
                &larr; Home
            </button>
            {type === 'daily' && <DailyChallengeFlow />}
            {type === 'special' && <SpecialChallengeFlow />}
        </motion.div>
    );
};

export default ChallengeScreen;
