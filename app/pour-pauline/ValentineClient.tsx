"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Playlist avec pochettes photos
const PLAYLIST = [
    {
        title: "Les aventures de COCO & COLINE #1",
        src: "/valentine-photos/coco-coline.mp3",
        cover: "/valentine-photos/coco-coline-cover-1.jpg",
    },
    {
        title: "Les aventures de COCO & COLINE #2",
        src: "/valentine-photos/coco-coline-2.mp3",
        cover: "/valentine-photos/coco-coline-cover-2.jpg",
    },
];

// Photos disponibles (41 photos)
const PHOTOS = [
    "/valentine-photos/IMG_0794.jpg",
    "/valentine-photos/IMG_0922.jpg",
    "/valentine-photos/IMG_0937.jpg",
    "/valentine-photos/IMG_1516.jpg",
    "/valentine-photos/IMG_3358.jpg",
    "/valentine-photos/IMG_3453.jpg",
    "/valentine-photos/IMG_4677.jpg",
    "/valentine-photos/IMG_4689.jpg",
    "/valentine-photos/IMG_4690.jpg",
    "/valentine-photos/IMG_5121.jpg",
    "/valentine-photos/IMG_5142.jpg",
    "/valentine-photos/IMG_5208.jpg",
    "/valentine-photos/IMG_5210.jpg",
    "/valentine-photos/IMG_5797.jpg",
    "/valentine-photos/IMG_5996.jpg",
    "/valentine-photos/IMG_5998.jpg",
    "/valentine-photos/IMG_6211.jpg",
    "/valentine-photos/IMG_6371.png",
    "/valentine-photos/IMG_6433.jpg",
    "/valentine-photos/IMG_6435.jpg",
    "/valentine-photos/IMG_6440.jpg",
    "/valentine-photos/IMG_7087.jpg",
    "/valentine-photos/IMG_7244.jpg",
    "/valentine-photos/IMG_7254.jpg",
    "/valentine-photos/IMG_7407.jpg",
    "/valentine-photos/IMG_7532.jpg",
    "/valentine-photos/IMG_7837.jpg",
    "/valentine-photos/IMG_7902.jpg",
    "/valentine-photos/IMG_7903.jpg",
    "/valentine-photos/IMG_7913.jpg",
    "/valentine-photos/IMG_7934.jpg",
    "/valentine-photos/IMG_7937.jpg",
    "/valentine-photos/IMG_7972.jpg",
    "/valentine-photos/IMG_7978.jpg",
    "/valentine-photos/IMG_8008.jpg",
    "/valentine-photos/IMG_8011.jpg",
    "/valentine-photos/IMG_8040.jpg",
    "/valentine-photos/IMG_8048.jpg",
    "/valentine-photos/IMG_8052.jpg",
    "/valentine-photos/IMG_8217.jpg",
    "/valentine-photos/lp_image.jpg",
];

// Quiz questions
const QUIZ = [
    {
        question: "Où est-ce qu'on s'est rencontrés ?",
        options: ["En boîte", "À une bar mitsvah", "Sur Tinder", "Au supermarché"],
        correct: 1,
    },
    {
        question: "Qu'est-ce que je préfère chez toi ?",
        options: ["Tes yeux", "Ton sourire en coin", "Tes seins", "Tout ❤️"],
        correct: 3,
    },
    {
        question: "Mon surnom pour toi c'est quoi ?",
        options: ["Mon bébé", "Ma bouclette", "Ma puce", "Coline"],
        correct: 1,
    },
    {
        question: "Qu'est-ce qui me rend ouf chez toi ?",
        options: ["Tes caprices", "Quand tu boudes", "Quand tu voles la couette", "Tes seins 🍑"],
        correct: 3,
    },
    {
        question: "C'est quoi notre plus gros sujet de dispute ?",
        options: ["Où manger ce soir", "Le ménage", "Qui a raison", "Tromperie 😱"],
        correct: 0,
    },
    {
        question: "Si j'étais un animal pour toi je serais ?",
        options: ["Un ours (câlins)", "Un lapin 🐰", "Un chat (indépendant)", "Un chien (fidèle)"],
        correct: 1,
    },
    {
        question: "Qu'est-ce que je fais quand tu t'endors ?",
        options: ["Je te regarde dormir", "Je te vole la couette", "Je joue sur mon tel", "Rien, je dors aussi"],
        correct: 3,
    },
];

// Wrapped stats
const WRAPPED_STATS = [
    { emoji: "💋", label: "Bisous échangés", value: "14 283", sub: "(estimation basse)" },
    { emoji: "🍕", label: "Débats sur où manger", value: "312", sub: "" },
    { emoji: "😴", label: "Films où tu t'es endormie", value: "8", sub: "" },
    { emoji: "💬", label: "Messages envoyés", value: "47 392", sub: "" },
    { emoji: "🤬", label: "Prises de tête", value: "1 000", sub: "(mais toujours réconciliés)" },
    { emoji: "😂", label: "Fous rires", value: "∞", sub: "incalculable" },
    { emoji: "😍", label: 'Fois où j\'ai pensé "elle est trop belle"', value: "Chaque jour", sub: "" },
    { emoji: "🛏️", label: "Fois où t'as volé la couette", value: "TOUTES", sub: "" },
];

// Love message
const LOVE_MESSAGE = `Ma Pauline,

Je t'aime !

On se prend la tête, on s'engueule pour des conneries, on boude (surtout toi), mais à la fin c'est toujours toi que je veux retrouver. Toujours toi qui me fais rire. Toujours toi que je regarde dormir en me disant que j'ai de la chance.

Nos disputes c'est rien face à ce qu'on a. C'est du bruit. Nous c'est plus fort que ça.

J'ai hâte d'être avec toi ce soir. J'ai hâte de te voir sourire avec tes grandes gencives que j'aime tant. J'ai hâte de serrer ma bouclette contre moi.

Bonne Saint-Valentin ma coquine.

Ton coco, pour toujours. ❤️`;

export default function ValentineClient() {
    const [mounted, setMounted] = useState(false);
    const [stage, setStage] = useState<"question" | "quiz" | "wrapped" | "message" | "montage" | "player">("question");

    // Fix hydration issues with window
    useEffect(() => {
        setMounted(true);
    }, []);
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [quizIndex, setQuizIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [wrappedIndex, setWrappedIndex] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [showConfetti, setShowConfetti] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Music player state
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [montageStarted, setMontageStarted] = useState(false);
    const [photoInterval, setPhotoInterval] = useState(4000);

    // Bouton "Non" qui s'enfuit
    const handleNoHover = () => {
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        setNoButtonPos({ x, y });
    };

    // Quiz logic
    const handleAnswer = (index: number) => {
        if (index === QUIZ[quizIndex].correct) {
            setScore(score + 1);
        }
        if (quizIndex < QUIZ.length - 1) {
            setQuizIndex(quizIndex + 1);
        } else {
            setStage("wrapped");
        }
    };

    // Wrapped animation
    useEffect(() => {
        if (stage === "wrapped" && wrappedIndex < WRAPPED_STATS.length) {
            const timer = setTimeout(() => {
                setWrappedIndex(wrappedIndex + 1);
            }, 1500);
            return () => clearTimeout(timer);
        } else if (stage === "wrapped" && wrappedIndex >= WRAPPED_STATS.length) {
            const timer = setTimeout(() => {
                setStage("message");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [stage, wrappedIndex]);

    // Typewriter effect
    useEffect(() => {
        if (stage === "message" && typedText.length < LOVE_MESSAGE.length) {
            const timer = setTimeout(() => {
                setTypedText(LOVE_MESSAGE.slice(0, typedText.length + 1));
            }, 30);
            return () => clearTimeout(timer);
        } else if (stage === "message" && typedText.length >= LOVE_MESSAGE.length) {
            setShowConfetti(true);
            const timer = setTimeout(() => {
                setStage("montage");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [stage, typedText]);

    // Start montage with music - wait for metadata to get duration
    useEffect(() => {
        if (stage === "montage" && audioRef.current && !montageStarted) {
            setMontageStarted(true);
            setCurrentTrack(0);
            setCurrentPhoto(0);
            audioRef.current.src = PLAYLIST[0].src;
            audioRef.current.load();

            // Wait for audio to be ready then play
            const playAudio = () => {
                if (audioRef.current) {
                    const trackDuration = audioRef.current.duration;
                    if (trackDuration && trackDuration > 0) {
                        // Calculate interval: track duration / number of photos
                        const interval = (trackDuration * 1000) / PHOTOS.length;
                        setPhotoInterval(interval);
                        setDuration(trackDuration);
                    }
                    audioRef.current.play().catch(() => {});
                    setIsPlaying(true);
                }
            };

            audioRef.current.addEventListener('loadedmetadata', playAudio, { once: true });
            // Fallback if already loaded
            if (audioRef.current.readyState >= 1) {
                playAudio();
            }
        }
    }, [stage, montageStarted]);

    // Photo montage slideshow - synced with music duration
    useEffect(() => {
        if (stage === "montage" && isPlaying && photoInterval > 0) {
            const timer = setInterval(() => {
                setCurrentPhoto((prev) => {
                    if (prev >= PHOTOS.length - 1) {
                        return 0; // Loop back
                    }
                    return prev + 1;
                });
            }, photoInterval);
            return () => clearInterval(timer);
        }
    }, [stage, isPlaying, photoInterval]);

    // When track 1 ends, go to player stage
    const handleTrack1Ended = () => {
        if (stage === "montage") {
            setIsPlaying(false);
            setCurrentTime(0);
            // Go to player with track 1 (index 1 = second track)
            setTimeout(() => {
                setCurrentTrack(1);
                setStage("player");
                // Load the next track
                if (audioRef.current) {
                    audioRef.current.src = PLAYLIST[1].src;
                    audioRef.current.load();
                }
            }, 500);
        } else {
            // Normal next track behavior in player stage
            nextTrack();
        }
    };

    // Music player handlers
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const nextTrack = () => {
        const next = (currentTrack + 1) % PLAYLIST.length;
        setCurrentTrack(next);
        setCurrentTime(0);
        if (audioRef.current) {
            audioRef.current.src = PLAYLIST[next].src;
            audioRef.current.load();
            if (isPlaying) audioRef.current.play();
        }
    };

    const prevTrack = () => {
        if (currentTime > 3) {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                setCurrentTime(0);
            }
        } else {
            const prev = (currentTrack - 1 + PLAYLIST.length) % PLAYLIST.length;
            setCurrentTrack(prev);
            setCurrentTime(0);
            if (audioRef.current) {
                audioRef.current.src = PLAYLIST[prev].src;
                audioRef.current.load();
                if (isPlaying) audioRef.current.play();
            }
        }
    };

    const selectTrack = (index: number) => {
        setCurrentTrack(index);
        setCurrentTime(0);
        if (audioRef.current) {
            audioRef.current.src = PLAYLIST[index].src;
            audioRef.current.load();
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    // Load correct track when entering player stage
    useEffect(() => {
        if (stage === "player" && audioRef.current) {
            audioRef.current.src = PLAYLIST[currentTrack].src;
            audioRef.current.load();
            // Get duration once loaded
            const handleLoaded = () => {
                if (audioRef.current) {
                    setDuration(audioRef.current.duration);
                }
            };
            audioRef.current.addEventListener('loadedmetadata', handleLoaded, { once: true });
        }
    }, [stage]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 flex items-center justify-center p-4 overflow-hidden relative">
            {/* Elegant background pattern */}
            <div className="fixed inset-0 opacity-30 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,182,193,0.4) 0%, transparent 50%),
                                      radial-gradient(circle at 75% 75%, rgba(255,105,180,0.3) 0%, transparent 50%)`
                }} />
            </div>

            {/* Floating hearts - more subtle */}
            {mounted && stage !== "montage" && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-2xl opacity-40"
                            style={{ left: `${(i * 8) % 100}%` }}
                            initial={{ y: "110vh" }}
                            animate={{ y: "-10vh" }}
                            transition={{
                                duration: 15 + (i % 5) * 3,
                                repeat: Infinity,
                                delay: i * 0.8,
                                ease: "linear"
                            }}
                        >
                            {["♥", "♡", "❤"][i % 3]}
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Confetti */}
            {showConfetti && mounted && (
                <div className="fixed inset-0 pointer-events-none z-40">
                    {[...Array(60)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: ["#f9a8d4", "#f472b6", "#ec4899", "#db2777", "#be185d", "#fda4af", "#fb7185"][i % 7],
                                left: `${(i * 1.7) % 100}%`,
                            }}
                            initial={{ y: -20, opacity: 1, rotate: 0 }}
                            animate={{
                                y: "110vh",
                                opacity: 0,
                                rotate: 360 * (i % 2 === 0 ? 1 : -1)
                            }}
                            transition={{ duration: 3 + (i % 3), delay: (i % 10) * 0.1 }}
                        />
                    ))}
                </div>
            )}

            <AnimatePresence mode="wait">
                {/* STAGE 1: Valentine Question */}
                {stage === "question" && (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                        className="text-center relative z-10"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="text-8xl mb-8"
                        >
                            💝
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-5xl md:text-7xl font-light text-rose-600 mb-6 tracking-tight"
                        >
                            Pauline...
                        </motion.h1>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-2xl md:text-4xl font-light text-gray-700 mb-16"
                        >
                            Tu veux être ma Valentine ?
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex gap-6 justify-center items-center relative h-24"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236,72,153,0.3)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setStage("quiz")}
                                className="px-14 py-5 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xl font-medium rounded-full shadow-xl transition-all"
                            >
                                Oui ! 💕
                            </motion.button>
                            <motion.button
                                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                                onMouseEnter={handleNoHover}
                                onTouchStart={handleNoHover}
                                className="px-14 py-5 bg-gray-200 text-gray-500 text-xl font-medium rounded-full shadow-lg absolute"
                                style={{ right: "-140px" }}
                            >
                                Non
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}

                {/* STAGE 2: Quiz */}
                {stage === "quiz" && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 relative z-10"
                    >
                        <div className="text-center mb-8">
                            <span className="inline-block px-4 py-1 bg-rose-100 text-rose-600 rounded-full text-sm font-medium mb-4">
                                Question {quizIndex + 1} sur {QUIZ.length}
                            </span>
                            <h2 className="text-2xl font-light text-gray-800">
                                Tu me connais vraiment ? 🎯
                            </h2>
                            <div className="w-full bg-rose-100 rounded-full h-1.5 mt-6">
                                <motion.div
                                    className="bg-gradient-to-r from-rose-400 to-pink-500 h-1.5 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((quizIndex + 1) / QUIZ.length) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>

                        <h3 className="text-xl font-medium text-gray-700 mb-8 text-center">
                            {QUIZ[quizIndex].question}
                        </h3>

                        <div className="space-y-3">
                            {QUIZ[quizIndex].options.map((option, i) => (
                                <motion.button
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAnswer(i)}
                                    className="w-full p-4 bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 rounded-2xl text-gray-700 font-medium transition-all text-left border border-rose-100 hover:border-rose-200"
                                >
                                    <span className="text-rose-400 mr-3">{String.fromCharCode(65 + i)}.</span>
                                    {option}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* STAGE 3: Wrapped Stats */}
                {stage === "wrapped" && (
                    <motion.div
                        key="wrapped"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-md relative z-10"
                    >
                        <div className="text-center mb-10">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-6xl mb-4"
                            >
                                ✨
                            </motion.div>
                            <h2 className="text-3xl font-light text-gray-800 mb-2">
                                Notre année ensemble
                            </h2>
                            <p className="text-rose-400 font-medium">Pauline & Indiana • 2025</p>
                        </div>

                        <div className="space-y-4">
                            {WRAPPED_STATS.slice(0, wrappedIndex).map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className="bg-gradient-to-r from-rose-400 via-pink-500 to-rose-500 rounded-2xl p-5 text-white shadow-xl"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl">{stat.emoji}</span>
                                        <div className="flex-1">
                                            <p className="text-white/70 text-sm">{stat.label}</p>
                                            <p className="text-2xl font-bold">{stat.value}</p>
                                            {stat.sub && <p className="text-white/50 text-xs">{stat.sub}</p>}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {wrappedIndex >= WRAPPED_STATS.length && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center mt-10 text-gray-500 text-lg font-light"
                            >
                                Et ce n'est que le début... 💫
                            </motion.p>
                        )}
                    </motion.div>
                )}

                {/* STAGE 4: Love Message */}
                {stage === "message" && (
                    <motion.div
                        key="message"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl p-10 md:p-14 shadow-2xl border border-white/50 relative z-10"
                    >
                        <div className="text-center mb-8">
                            <span className="text-5xl">💌</span>
                        </div>
                        <div className="font-serif text-gray-700 text-lg md:text-xl leading-relaxed whitespace-pre-wrap italic">
                            {typedText}
                            <span className="animate-pulse text-rose-400">|</span>
                        </div>
                    </motion.div>
                )}

                {/* STAGE 5: Photo Montage with Track 1 */}
                {stage === "montage" && (
                    <motion.div
                        key="montage"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
                    >
                        {/* Cinematic photo display */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPhoto}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={PHOTOS[currentPhoto]}
                                    alt="Notre moment"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Vignette overlay */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                            background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)"
                        }} />

                        {/* Now playing indicator */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="absolute bottom-8 left-8 right-8 flex items-center gap-4 bg-black/60 backdrop-blur-xl rounded-2xl p-4"
                        >
                            <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden">
                                <Image
                                    src={PLAYLIST[0].cover}
                                    alt="Cover"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-white/60 text-xs uppercase tracking-wider">En écoute</p>
                                <p className="text-white font-medium">{PLAYLIST[0].title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-rose-500"
                                            style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-white/40 text-xs">{formatTime(currentTime)}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1 bg-rose-500 rounded-full"
                                        animate={{ height: [12, 24, 12] }}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Skip button */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3 }}
                            onClick={() => {
                                if (audioRef.current) audioRef.current.pause();
                                setIsPlaying(false);
                                setCurrentTrack(1);
                                setStage("player");
                            }}
                            className="absolute top-8 right-8 text-white/40 hover:text-white text-sm transition-colors"
                        >
                            Passer →
                        </motion.button>

                        {/* Photo counter */}
                        <div className="absolute top-8 left-8 text-white/40 text-sm">
                            {currentPhoto + 1} / {PHOTOS.length}
                        </div>
                    </motion.div>
                )}

                {/* STAGE 6: Player Interface */}
                {stage === "player" && (
                    <motion.div
                        key="player"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-md relative z-10"
                    >
                        <div className="text-center mb-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring" }}
                                className="text-6xl mb-4"
                            >
                                🎵
                            </motion.div>
                            <h2 className="text-2xl font-light text-gray-800 mb-2">
                                Notre playlist
                            </h2>
                            <p className="text-rose-400 text-sm">Les aventures de Coco & Coline</p>
                        </div>

                        {/* Current track display */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 mb-6"
                        >
                            <div className="flex items-center gap-5 mb-6">
                                <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
                                    <Image
                                        src={PLAYLIST[currentTrack].cover}
                                        alt="Cover"
                                        fill
                                        className="object-cover"
                                    />
                                    {isPlaying && (
                                        <motion.div
                                            className="absolute inset-0 bg-black/20 flex items-center justify-center"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <div className="flex gap-1">
                                                {[...Array(3)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="w-1 bg-white rounded-full"
                                                        animate={{ height: [8, 20, 8] }}
                                                        transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                                                    />
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-800 font-semibold text-lg">
                                        {PLAYLIST[currentTrack].title}
                                    </p>
                                    <p className="text-rose-400 text-sm">
                                        Coco & Coline
                                    </p>
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="mb-4">
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 100}
                                    value={currentTime}
                                    onChange={handleSeek}
                                    className="w-full h-2 bg-rose-100 rounded-full appearance-none cursor-pointer
                                        [&::-webkit-slider-thumb]:appearance-none
                                        [&::-webkit-slider-thumb]:w-4
                                        [&::-webkit-slider-thumb]:h-4
                                        [&::-webkit-slider-thumb]:bg-rose-500
                                        [&::-webkit-slider-thumb]:rounded-full
                                        [&::-webkit-slider-thumb]:shadow-lg
                                        [&::-webkit-slider-thumb]:hover:scale-110
                                        [&::-webkit-slider-thumb]:transition-transform"
                                    style={{
                                        background: `linear-gradient(to right, #f43f5e ${(currentTime / (duration || 1)) * 100}%, #fce7f3 ${(currentTime / (duration || 1)) * 100}%)`
                                    }}
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-center gap-6">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={prevTrack}
                                    className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors"
                                >
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                                    </svg>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={togglePlay}
                                    className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-xl"
                                >
                                    {isPlaying ? (
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={nextTrack}
                                    className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors"
                                >
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                                    </svg>
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Playlist */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/50">
                            <p className="text-gray-500 text-xs uppercase tracking-wider px-4 py-3 border-b border-rose-100">
                                Playlist
                            </p>
                            {PLAYLIST.map((track, i) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ backgroundColor: "rgba(244,63,94,0.05)" }}
                                    onClick={() => selectTrack(i)}
                                    className={`w-full flex items-center gap-4 p-4 transition-colors ${
                                        i === currentTrack ? "bg-rose-50" : ""
                                    } ${i < PLAYLIST.length - 1 ? "border-b border-rose-50" : ""}`}
                                >
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={track.cover}
                                            alt={track.title}
                                            fill
                                            className="object-cover"
                                        />
                                        {i === currentTrack && isPlaying && (
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                <div className="flex gap-0.5">
                                                    {[...Array(3)].map((_, j) => (
                                                        <motion.div
                                                            key={j}
                                                            className="w-0.5 bg-white rounded-full"
                                                            animate={{ height: [4, 12, 4] }}
                                                            transition={{ duration: 0.4, repeat: Infinity, delay: j * 0.1 }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className={`font-medium ${i === currentTrack ? "text-rose-500" : "text-gray-700"}`}>
                                            {track.title}
                                        </p>
                                        <p className="text-gray-400 text-xs">Coco & Coline</p>
                                    </div>
                                    {i === currentTrack && (
                                        <span className="text-rose-400 text-xs">En cours</span>
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Final message */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="text-center mt-8 text-rose-400 font-light"
                        >
                            Je t'aime ma bouclette ❤️
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden audio element */}
            <audio
                ref={audioRef}
                src={PLAYLIST[currentTrack].src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleTrack1Ended}
            />
        </div>
    );
}
