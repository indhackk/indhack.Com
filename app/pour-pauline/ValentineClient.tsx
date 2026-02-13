"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Photos disponibles
const PHOTOS = [
    "/valentine-photos/IMG_0794.jpg",
    "/valentine-photos/IMG_0922.jpg",
    "/valentine-photos/IMG_0937.jpg",
    "/valentine-photos/IMG_1516.jpg",
    "/valentine-photos/IMG_3358.jpg",
    "/valentine-photos/IMG_4677.jpg",
    "/valentine-photos/IMG_5121.jpg",
    "/valentine-photos/IMG_5142.jpg",
    "/valentine-photos/IMG_5208.jpg",
    "/valentine-photos/IMG_5797.jpg",
    "/valentine-photos/IMG_5996.jpg",
    "/valentine-photos/IMG_6211.jpg",
    "/valentine-photos/IMG_6433.jpg",
    "/valentine-photos/IMG_6435.jpg",
    "/valentine-photos/IMG_6440.jpg",
    "/valentine-photos/IMG_7532.jpg",
    "/valentine-photos/IMG_7902.jpg",
    "/valentine-photos/IMG_7913.jpg",
    "/valentine-photos/IMG_7972.jpg",
    "/valentine-photos/IMG_8011.jpg",
    "/valentine-photos/IMG_8040.jpg",
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
    const [stage, setStage] = useState<"question" | "quiz" | "wrapped" | "message" | "photos">("question");
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [quizIndex, setQuizIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [wrappedIndex, setWrappedIndex] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [showConfetti, setShowConfetti] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

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
                setStage("photos");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [stage, typedText]);

    // Photo slideshow
    useEffect(() => {
        if (stage === "photos") {
            const timer = setInterval(() => {
                setCurrentPhoto((prev) => (prev + 1) % PHOTOS.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [stage]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 flex items-center justify-center p-4 overflow-hidden">
            {/* Floating hearts background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-4xl"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50
                        }}
                        animate={{
                            y: -100,
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    >
                        {["❤️", "💕", "💖", "💗", "💝"][Math.floor(Math.random() * 5)]}
                    </motion.div>
                ))}
            </div>

            {/* Confetti */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none">
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: ["#ff6b6b", "#ff8787", "#ffa8a8", "#ffc9c9", "#ffe3e3", "#ff69b4", "#ff1493"][Math.floor(Math.random() * 7)],
                                left: `${Math.random() * 100}%`,
                            }}
                            initial={{ y: -20, opacity: 1 }}
                            animate={{ y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20, opacity: 0 }}
                            transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 0.5 }}
                        />
                    ))}
                </div>
            )}

            <AnimatePresence mode="wait">
                {/* STAGE 1: Valentine Question */}
                {stage === "question" && (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center"
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold text-pink-600 mb-12"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Pauline... 💕
                        </motion.h1>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-16">
                            Tu veux être ma Valentine ?
                        </h2>
                        <div className="flex gap-8 justify-center items-center relative h-32">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setStage("quiz")}
                                className="px-12 py-6 bg-gradient-to-r from-pink-500 to-red-500 text-white text-2xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                            >
                                Oui ! 💖
                            </motion.button>
                            <motion.button
                                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                                onMouseEnter={handleNoHover}
                                onTouchStart={handleNoHover}
                                className="px-12 py-6 bg-gray-300 text-gray-600 text-2xl font-bold rounded-full shadow-lg absolute"
                                style={{ right: "-150px" }}
                            >
                                Non 😢
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* STAGE 2: Quiz */}
                {stage === "quiz" && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
                    >
                        <div className="text-center mb-8">
                            <p className="text-pink-500 font-bold text-sm uppercase tracking-wider mb-2">
                                Question {quizIndex + 1} / {QUIZ.length}
                            </p>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                                🎯 Tu me connais vraiment ?
                            </h2>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                                <div
                                    className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full transition-all"
                                    style={{ width: `${((quizIndex + 1) / QUIZ.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-8 text-center">
                            {QUIZ[quizIndex].question}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {QUIZ[quizIndex].options.map((option, i) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleAnswer(i)}
                                    className="p-4 bg-gradient-to-r from-pink-100 to-red-100 hover:from-pink-200 hover:to-red-200 rounded-xl text-gray-800 font-medium text-lg transition-all text-left"
                                >
                                    <span className="font-bold text-pink-600 mr-2">{String.fromCharCode(65 + i)})</span>
                                    {option}
                                </motion.button>
                            ))}
                        </div>

                        <p className="text-center mt-6 text-gray-500">
                            Score: {score} / {quizIndex}
                        </p>
                    </motion.div>
                )}

                {/* STAGE 3: Wrapped Stats */}
                {stage === "wrapped" && (
                    <motion.div
                        key="wrapped"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-lg"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                                Notre Wrapped 2024 💕
                            </h2>
                            <p className="text-gray-500">Pauline x Indiana</p>
                        </div>

                        <div className="space-y-4">
                            {WRAPPED_STATS.slice(0, wrappedIndex).map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl p-5 text-white shadow-lg"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl">{stat.emoji}</span>
                                        <div className="flex-1">
                                            <p className="text-white/80 text-sm">{stat.label}</p>
                                            <p className="text-2xl font-bold">{stat.value}</p>
                                            {stat.sub && <p className="text-white/60 text-xs">{stat.sub}</p>}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {wrappedIndex >= WRAPPED_STATS.length && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center mt-8 text-gray-600 text-lg"
                            >
                                Et ce n'est que le début... ❤️
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
                        className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl"
                    >
                        <div className="text-center mb-6">
                            <span className="text-6xl">💌</span>
                        </div>
                        <div className="font-mono text-gray-800 text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
                            {typedText}
                            <span className="animate-pulse">|</span>
                        </div>
                    </motion.div>
                )}

                {/* STAGE 5: Photo Gallery */}
                {stage === "photos" && (
                    <motion.div
                        key="photos"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full max-w-4xl"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                                Nos plus beaux moments 📸
                            </h2>
                            <p className="text-gray-500">Je t'aime ma bouclette ❤️</p>
                        </div>

                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-black">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentPhoto}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={PHOTOS[currentPhoto]}
                                        alt="Notre photo"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="flex justify-center gap-2 mt-6 flex-wrap">
                            {PHOTOS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPhoto(i)}
                                    className={`w-3 h-3 rounded-full transition-all ${
                                        i === currentPhoto ? "bg-pink-500 scale-125" : "bg-gray-300"
                                    }`}
                                />
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <p className="text-2xl font-bold text-pink-600">
                                Bonne Saint-Valentin mon amour 💕
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Audio player (invisible) */}
            <audio ref={audioRef} loop />
        </div>
    );
}
