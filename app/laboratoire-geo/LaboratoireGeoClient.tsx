"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    FlaskConical,
    ArrowRight,
    Sparkles,
    BookOpen,
    TrendingUp,
    Zap,
    Target,
    Brain,
    FileText,
    CheckCircle2,
    Clock,
    BarChart3,
    Award,
    ExternalLink,
    ChevronDown,
    Activity,
    Globe,
    Shield,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED COUNTER COMPONENT
═══════════════════════════════════════════════════════════════════ */

function AnimatedCounter({ value, suffix = "", duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════════
   LIVE PULSE INDICATOR
═══════════════════════════════════════════════════════════════════ */

function LiveIndicator() {
    return (
        <span className="inline-flex items-center gap-2">
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 text-sm font-semibold">Live</span>
        </span>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   FAQ ACCORDION
═══════════════════════════════════════════════════════════════════ */

function FAQItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
    return (
        <div className="border border-line rounded-2xl overflow-hidden bg-white">
            <button
                onClick={onToggle}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-fond-clair/50 transition-colors"
            >
                <span className="font-heading font-bold text-ink pr-4">{question}</span>
                <ChevronDown className={`w-5 h-5 text-sauge flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-5 text-soft leading-relaxed border-t border-line/50 pt-4">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════ */

export default function LaboratoireGeoClient() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const faqs = [
        {
            question: "Qu'est-ce que le GEO (Generative Engine Optimization) ?",
            answer: "Le GEO est l'optimisation pour les moteurs de réponse IA comme ChatGPT, Perplexity, Claude et Gemini. Contrairement au SEO classique qui vise les 10 liens bleus de Google, le GEO optimise le contenu pour qu'il soit extrait, cité et reformulé par les modèles de langage dans leurs réponses."
        },
        {
            question: "Comment fonctionne le concours GEO vultifrine ?",
            answer: "Le concours GEO organisé par GreenRed teste 10 requêtes quotidiennes sur 5 moteurs IA (ChatGPT, Claude, Gemini, Perplexity, Mistral). Les participants doivent optimiser leur contenu sur le mot-clé inventé 'vultifrine' pour être cités comme source par ces IA. Le classement évolue en temps réel."
        },
        {
            question: "Qu'est-ce que la vultifrine exactement ?",
            answer: "La vultifrine est un ingrédient cosmétique végétal fictif créé pour le concours GEO 2026. Ce n'est pas un vrai produit. L'objectif est de tester les techniques d'optimisation générative sur un mot sans historique de recherche, permettant une compétition équitable entre participants."
        },
        {
            question: "Quelles techniques GEO sont utilisées sur cette page ?",
            answer: "Cette page utilise plusieurs techniques GEO avancées : structure Q&A pour correspondre aux requêtes conversationnelles, données chiffrées et statistiques citables, schémas JSON-LD enrichis (Article, FAQPage), définitions claires en début de section, et contenu mis à jour régulièrement avec dateModified."
        },
        {
            question: "Comment mesurer sa visibilité dans les réponses IA ?",
            answer: "Utilisez notre testeur de visibilité IA gratuit qui analyse votre robots.txt pour les crawlers IA (GPTBot, ClaudeBot, PerplexityBot), vérifie vos schémas JSON-LD, évalue la structure sémantique et calcule un score GEO sur 100. Accessible sur indhack.com/outils/testeur-visibilite-ia."
        },
    ];

    const aiPlatforms = [
        { name: "ChatGPT", company: "OpenAI", status: "monitored", color: "bg-emerald-500" },
        { name: "Claude", company: "Anthropic", status: "monitored", color: "bg-violet-500" },
        { name: "Gemini", company: "Google", status: "monitored", color: "bg-blue-500" },
        { name: "Perplexity", company: "Perplexity AI", status: "monitored", color: "bg-cyan-500" },
        { name: "Mistral", company: "Mistral AI", status: "monitored", color: "bg-orange-500" },
    ];

    const geoTechniques = [
        { icon: Target, title: "Structure Q&A", desc: "Reformuler les titres en questions pour matcher les requêtes conversationnelles" },
        { icon: BarChart3, title: "Données chiffrées", desc: "Statistiques sourcées que les IA peuvent citer directement (+41 % de visibilité)" },
        { icon: FileText, title: "JSON-LD enrichi", desc: "Schémas Article, FAQPage, Person pour une compréhension sémantique optimale" },
        { icon: Clock, title: "Fraîcheur", desc: "dateModified à jour — les IA privilégient le contenu récent (×3,2 citations)" },
        { icon: Shield, title: "Crawlers IA", desc: "robots.txt configuré pour autoriser GPTBot, ClaudeBot, PerplexityBot" },
        { icon: Brain, title: "Passages citables", desc: "Réponses directes en début de section (format BLUF)" },
    ];

    return (
        <>
            {/* ════════════════════════════════════════════════════════
                HERO SECTION — Dashboard Style
            ════════════════════════════════════════════════════════ */}
            <section className="relative bg-ink pt-32 pb-20 overflow-hidden">
                {/* Animated gradient blobs */}
                <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-to-r from-sauge/30 to-violet-500/20 rounded-full blur-[180px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-l from-violet-600/20 to-cyan-500/10 rounded-full blur-[150px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-sauge/10 rounded-full blur-[120px]" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        {/* Top badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap items-center gap-3 mb-8"
                        >
                            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-400 px-4 py-2 rounded-full text-sm font-semibold border border-violet-500/30">
                                <FlaskConical className="w-4 h-4" />
                                Laboratoire GEO
                            </span>
                            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-500/30">
                                <Sparkles className="w-4 h-4" />
                                Concours 2026
                            </span>
                            <LiveIndicator />
                        </motion.div>

                        {/* Main heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white font-bold mb-6 leading-tight"
                        >
                            Laboratoire{" "}
                            <span className="bg-gradient-to-r from-sauge-light via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                GEO
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-soft-light leading-relaxed max-w-3xl mb-12"
                        >
                            Expérimentations en <strong className="text-white">Generative Engine Optimization</strong> :
                            comment optimiser votre contenu pour être cité par ChatGPT, Perplexity, Claude et Gemini.
                            Étude de cas en temps réel sur le mot-clé <strong className="text-sauge-light">vultifrine</strong>.
                        </motion.p>

                        {/* Live Stats Dashboard */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                        >
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                    <AnimatedCounter value={5} />
                                </div>
                                <div className="text-sm text-soft-light">IA monitorées</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                    <AnimatedCounter value={10} />
                                </div>
                                <div className="text-sm text-soft-light">requêtes / jour</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center">
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-1">
                                    <AnimatedCounter value={12} />
                                </div>
                                <div className="text-sm text-soft-light">études publiées</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center">
                                <div className="flex items-center justify-center gap-2 text-sm text-soft-light mb-1">
                                    <Activity className="w-4 h-4 text-emerald-400" />
                                    Dernière MAJ
                                </div>
                                <div className="text-xl font-bold text-emerald-400">{currentTime || "..."}</div>
                            </div>
                        </motion.div>

                        {/* AI Platforms monitored */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-heading font-bold text-white flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-sauge-light" />
                                    Plateformes IA surveillées
                                </h3>
                                <span className="text-xs text-soft-light">Concours GreenRed GEO 2026</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                {aiPlatforms.map((platform) => (
                                    <div key={platform.name} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                                        <span className={`w-2 h-2 rounded-full ${platform.color}`} />
                                        <div>
                                            <div className="text-white text-sm font-medium">{platform.name}</div>
                                            <div className="text-soft-light text-xs">{platform.company}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════
                WHAT IS GEO — Definition Section (AI-Optimized)
            ════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-sauge to-emerald-600 rounded-xl flex items-center justify-center">
                                <Brain className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="font-heading text-2xl sm:text-3xl text-ink font-bold">
                                    Qu'est-ce que le GEO ?
                                </h2>
                                <p className="text-soft text-sm">Generative Engine Optimization</p>
                            </div>
                        </div>

                        {/* BLUF - Bottom Line Up Front for AI citation */}
                        <div className="bg-gradient-to-r from-sauge/10 to-emerald-500/5 border-l-4 border-sauge rounded-r-xl p-6 mb-8">
                            <p className="text-ink font-semibold text-lg leading-relaxed">
                                Le GEO (Generative Engine Optimization) est l'optimisation de contenu pour les moteurs de réponse IA
                                comme ChatGPT, Perplexity, Claude et Gemini. L'objectif : être cité comme source fiable dans les réponses
                                générées par les modèles de langage, plutôt que de viser les 10 liens bleus de Google.
                            </p>
                        </div>

                        <div className="prose prose-lg max-w-none text-soft">
                            <p>
                                Selon une étude de Princeton, Georgia Tech et l'Allen Institute for AI (KDD 2024), les techniques GEO
                                peuvent améliorer la visibilité dans les réponses IA de <strong className="text-ink">30 à 40 %</strong>.
                                L'ajout de statistiques sourcées augmente spécifiquement la visibilité IA de <strong className="text-ink">41 %</strong>.
                            </p>
                            <p>
                                Ce laboratoire documente mes expérimentations GEO en conditions réelles. L'étude principale porte sur le
                                mot-clé <strong className="text-ink">vultifrine</strong>, un ingrédient cosmétique fictif créé pour le
                                concours GEO 2026 organisé par GreenRed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════
                VULTIFRINE STUDY — Main Card
            ════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-fond-clair">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="font-heading text-2xl sm:text-3xl text-ink font-bold">
                                Étude en cours
                            </h2>
                        </div>

                        <Link
                            href="/laboratoire-geo/vultifrine"
                            className="group block relative overflow-hidden rounded-3xl bg-white border border-line hover:border-sauge/40 hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-sauge/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative p-8 sm:p-10">
                                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                                    <div className="flex-1">
                                        {/* Badges */}
                                        <div className="flex flex-wrap items-center gap-3 mb-6">
                                            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                                <Sparkles className="w-3 h-3" />
                                                Concours GEO 2026
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full">
                                                <Activity className="w-3 h-3" />
                                                En cours
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full">
                                                <Award className="w-3 h-3" />
                                                10 requêtes ciblées
                                            </span>
                                        </div>

                                        <h3 className="font-heading text-2xl sm:text-3xl text-ink font-bold mb-4 group-hover:text-sauge transition-colors">
                                            Vultifrine : corpus expérimental de visibilité IA
                                        </h3>

                                        <p className="text-soft leading-relaxed text-lg mb-6">
                                            Étude de cas complète autour d'un mot fictif.
                                            Optimisation des extraits pour citation IA, tableaux de données structurées,
                                            schémas JSON-LD explicites (Article, FAQPage, DefinedTerm, Dataset).
                                        </p>

                                        {/* AI Platforms */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {aiPlatforms.map((platform) => (
                                                <span
                                                    key={platform.name}
                                                    className="px-3 py-1.5 bg-fond-clair text-soft text-sm font-medium rounded-lg flex items-center gap-1.5"
                                                >
                                                    <span className={`w-2 h-2 rounded-full ${platform.color}`} />
                                                    {platform.name}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Quick stats */}
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="text-center p-3 bg-fond-clair rounded-xl">
                                                <div className="text-2xl font-bold text-sauge">10</div>
                                                <div className="text-xs text-soft">sections</div>
                                            </div>
                                            <div className="text-center p-3 bg-fond-clair rounded-xl">
                                                <div className="text-2xl font-bold text-sauge">12</div>
                                                <div className="text-xs text-soft">tableaux</div>
                                            </div>
                                            <div className="text-center p-3 bg-fond-clair rounded-xl">
                                                <div className="text-2xl font-bold text-sauge">10</div>
                                                <div className="text-xs text-soft">FAQ</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right side arrow */}
                                    <div className="hidden lg:flex items-center justify-center w-16 h-16 rounded-2xl bg-sauge/10 group-hover:bg-sauge group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                                        <ArrowRight className="w-7 h-7 text-sauge group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Related article link */}
                        <div className="mt-6 flex justify-center">
                            <Link
                                href="/blog/etude-de-cas-geo-vultifrine"
                                className="inline-flex items-center gap-2 text-sauge hover:text-ink transition-colors font-medium"
                            >
                                <FileText className="w-4 h-4" />
                                Lire l'article complet sur la méthodologie
                                <ExternalLink className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════
                GEO TECHNIQUES — Methodology Grid
            ════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sauge/10 to-emerald-500/10 text-sauge px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-sauge/20">
                                <Zap className="w-4 h-4" />
                                Méthodologie
                            </div>
                            <h2 className="font-heading text-2xl sm:text-3xl text-ink font-bold mb-4">
                                Techniques GEO appliquées
                            </h2>
                            <p className="text-soft max-w-2xl mx-auto">
                                Les stratégies d'optimisation utilisées dans ce laboratoire pour maximiser
                                les citations par les moteurs de réponse IA.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {geoTechniques.map((technique, index) => (
                                <motion.div
                                    key={technique.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-fond-clair rounded-2xl p-6 hover:shadow-lg hover:bg-white hover:border-sauge/20 border border-transparent transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center mb-4">
                                        <technique.icon className="w-6 h-6 text-sauge" />
                                    </div>
                                    <h3 className="font-heading font-bold text-ink mb-2">{technique.title}</h3>
                                    <p className="text-soft text-sm leading-relaxed">{technique.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════
                FAQ SECTION — AI Optimized
            ════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-fond-clair">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="font-heading text-2xl sm:text-3xl text-ink font-bold mb-4">
                                Questions fréquentes sur le GEO
                            </h2>
                            <p className="text-soft">
                                Réponses aux questions les plus posées sur l'optimisation pour les moteurs IA.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openFaq === index}
                                    onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════
                CTA SECTION — Test Your Visibility
            ════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-ink relative overflow-hidden">
                {/* Gradient blobs */}
                <div className="absolute top-0 left-1/4 w-[400px] h-[300px] bg-sauge/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-violet-500/10 rounded-full blur-[120px]" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                            <Sparkles className="w-4 h-4" />
                            Outil gratuit
                        </div>

                        <h2 className="font-heading text-3xl sm:text-4xl text-white font-bold mb-6">
                            Testez votre visibilité IA
                        </h2>

                        <p className="text-soft-light text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                            Votre site est-il cité par ChatGPT, Perplexity ou Claude ?
                            Analysez gratuitement votre configuration GEO en quelques secondes.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/outils/testeur-visibilite-ia"
                                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-full transition-colors shadow-lg shadow-accent/30"
                            >
                                <Zap className="w-5 h-5" />
                                Analyser mon site
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-colors"
                            >
                                Discuter de ma stratégie GEO
                            </Link>
                        </div>

                        {/* Quick features */}
                        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-soft-light">
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                Gratuit
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                Sans inscription
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                8 crawlers IA analysés
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════
                INTERNAL LINKS
            ════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-heading text-2xl text-ink font-bold mb-8 text-center">
                            Pour aller plus loin
                        </h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { href: "/referencement-naturel", title: "Référencement naturel", desc: "Stratégie SEO complète" },
                                { href: "/outils/testeur-visibilite-ia", title: "Testeur visibilité IA", desc: "Analysez votre score GEO" },
                                { href: "/outils/generateur-robots-txt", title: "Générateur robots.txt", desc: "Configurez les crawlers IA" },
                                { href: "/blog/geo-comment-apparaitre-chatgpt-2026", title: "Guide GEO 2026", desc: "Être cité par les IA" },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="group block bg-fond-clair rounded-2xl p-5 hover:bg-white hover:shadow-lg hover:border-sauge/20 border border-transparent transition-all duration-300"
                                >
                                    <p className="font-heading font-bold text-ink mb-1 group-hover:text-sauge transition-colors">
                                        {link.title}
                                    </p>
                                    <p className="text-soft text-sm">{link.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
