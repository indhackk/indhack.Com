"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
    ArrowRight,
    Download,
    TrendingDown,
    AlertTriangle,
    Globe,
    DollarSign,
    BarChart3,
    Shield,
    ExternalLink,
    FileSpreadsheet,
    Database,
    BookOpen,
    Zap,
    Target,
    Users,
    CreditCard,
    PieChart,
    Award
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ═══════════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════════

const STUDY_DATA = {
    meta: {
        date: "24 février 2026",
        totalRestaurants: 308,
        cities: 10,
        dataSource: "Google Places API & Serper.dev"
    },
    keyMetrics: {
        platformDependency: 68.4,
        annualLostMargin: 84500,
        noWebsite: 29.9,
        suspiciousProfiles: 13.3,
        reservationMultiplier: 3.4
    },
    cityRanking: [
        { city: "Menton", noWebsitePct: 43, lostRevenue: 61200, riskLevel: "critical" },
        { city: "Fréjus", noWebsitePct: 39, lostRevenue: 58600, riskLevel: "critical" },
        { city: "Grasse", noWebsitePct: 27, lostRevenue: 54800, riskLevel: "high" },
        { city: "Cagnes-sur-Mer", noWebsitePct: 26, lostRevenue: 52100, riskLevel: "high" },
        { city: "Mandelieu", noWebsitePct: 23, lostRevenue: 49200, riskLevel: "medium" },
        { city: "Antibes", noWebsitePct: 22, lostRevenue: 48700, riskLevel: "medium" },
        { city: "Saint-Tropez", noWebsitePct: 19, lostRevenue: 72400, riskLevel: "medium" },
        { city: "Monaco", noWebsitePct: 12, lostRevenue: 52000, riskLevel: "low" },
        { city: "Nice", noWebsitePct: 3, lostRevenue: 38200, riskLevel: "low" },
        { city: "Cannes", noWebsitePct: 3, lostRevenue: 41500, riskLevel: "low" },
    ],
    marginComparison: {
        seoLocal: { label: "SEO Local (Direct)", margin: 35, revenue: 288000, color: "sauge" },
        thefork: { label: "TheFork (Commission 12-25%)", margin: 18, revenue: 216000, color: "accent" },
        ubereats: { label: "UberEats/Deliveroo (30%)", margin: 8, revenue: 180000, color: "red" },
    },
    suspiciousBreakdown: {
        total: 41,
        nice: 9,
        antibes: 3,
        cagnes: 2,
        criteria: "Note > 4.5 avec moins de 10 avis"
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] } }
};

const fadeInScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedNumber({ value, suffix = "", prefix = "", duration = 2 }: { value: number; suffix?: string; prefix?: string; duration?: number }) {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const end = value;
        const stepTime = Math.abs(Math.floor(duration * 1000 / end));
        const increment = end / (duration * 60);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setDisplayValue(end);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {prefix}{typeof value === 'number' && value % 1 !== 0 ? displayValue.toFixed(1) : displayValue.toLocaleString('fr-FR')}{suffix}
        </span>
    );
}

function HolographicCard({ children, className = "", glowColor = "white" }: { children: React.ReactNode; className?: string; glowColor?: string }) {
    const glowClasses: Record<string, string> = {
        white: "group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_80px_-20px_rgba(255,255,255,0.15)]",
        red: "group-hover:shadow-[inset_0_1px_0_0_rgba(239,68,68,0.2),0_0_80px_-20px_rgba(239,68,68,0.2)]",
        accent: "group-hover:shadow-[inset_0_1px_0_0_rgba(212,168,83,0.2),0_0_80px_-20px_rgba(212,168,83,0.2)]",
        sauge: "group-hover:shadow-[inset_0_1px_0_0_rgba(46,94,78,0.3),0_0_80px_-20px_rgba(143,191,170,0.2)]",
    };

    return (
        <div className={`group relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.06] rounded-3xl overflow-hidden transition-all duration-500 ${glowClasses[glowColor] || glowClasses.white} ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">{children}</div>
        </div>
    );
}

function ProgressBar({ value, maxValue = 100, color = "sauge", animated = true, showValue = true, label = "" }: { value: number; maxValue?: number; color?: string; animated?: boolean; showValue?: boolean; label?: string }) {
    const percentage = (value / maxValue) * 100;
    const colorClasses: Record<string, string> = {
        sauge: "bg-gradient-to-r from-sauge to-sauge-light",
        red: "bg-gradient-to-r from-red-600 to-red-400",
        accent: "bg-gradient-to-r from-accent to-yellow-400",
        white: "bg-white/80"
    };

    return (
        <div className="space-y-2">
            {label && (
                <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60 font-medium">{label}</span>
                    {showValue && <span className="text-white font-bold">{value}%</span>}
                </div>
            )}
            <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                    initial={animated ? { width: 0 } : { width: `${percentage}%` }}
                    whileInView={animated ? { width: `${percentage}%` } : {}}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
                    className={`h-full rounded-full ${colorClasses[color] || colorClasses.sauge}`}
                />
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function StudyClientContent() {
    return (
        <main className="bg-[#0A0D0B] min-h-screen text-white selection:bg-accent/30 selection:text-white antialiased">

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* HERO - L'Accroche Brutale */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                {/* Ambient Lighting */}
                <div className="absolute top-[-30%] left-[-20%] w-[60%] h-[60%] bg-sauge/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
                <div className="absolute bottom-[-20%] right-[-15%] w-[50%] h-[50%] bg-red-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-5xl mx-auto"
                    >
                        {/* Badge */}
                        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">Rapport Économique · Février 2026</span>
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h1 variants={fadeInUp} className="text-[clamp(2.5rem,8vw,6rem)] font-heading font-bold leading-[0.95] tracking-tighter mb-8">
                            <span className="text-white/90">L'illusion</span><br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 via-white/80 to-white/40">
                                du 5 étoiles.
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-white/50 mb-6 max-w-3xl leading-relaxed font-light tracking-tight">
                            Une bonne note Google ne protège pas des erreurs stratégiques. Notre audit de{" "}
                            <span className="text-white/80 font-medium">308 restaurants</span> révèle une hémorragie silencieuse :
                        </motion.p>

                        {/* Key Stat Highlight */}
                        <motion.div variants={fadeInScale} className="mb-12">
                            <div className="inline-flex items-baseline gap-2 px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                                <span className="text-5xl md:text-6xl font-heading font-bold text-red-400 tracking-tight">
                                    <AnimatedNumber value={84.5} suffix="k€" duration={1.5} />
                                </span>
                                <span className="text-lg text-red-300/80 font-medium">de marge brute perdus par an, en moyenne.</span>
                            </div>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                            <a href="#analyse">
                                <Button className="bg-white text-[#0A0D0B] hover:bg-white/90 rounded-full px-8 py-6 text-sm font-bold uppercase tracking-wider h-14 shadow-[0_0_60px_-15px_rgba(255,255,255,0.3)]">
                                    Analyser les données
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </a>
                            <a href="#opendata">
                                <Button variant="outline" className="border-white/10 text-white/80 hover:bg-white/5 hover:text-white hover:border-white/20 rounded-full px-8 py-6 text-sm font-bold uppercase tracking-wider h-14 backdrop-blur-xl">
                                    <Database className="mr-2 w-4 h-4" />
                                    Open Data
                                </Button>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* BENTO GRID - Key Metrics Dashboard */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-16 border-t border-white/[0.04]" id="analyse">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-7xl mx-auto"
                    >
                        {/* Section Header */}
                        <motion.div variants={fadeInUp} className="mb-12">
                            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent mb-3">Indicateurs clés</p>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white/90 tracking-tight">Le diagnostic financier en 4 métriques</h2>
                        </motion.div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">

                            {/* Card 1 - Platform Dependency */}
                            <motion.div variants={fadeInUp}>
                                <HolographicCard className="p-7 h-full" glowColor="red">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                                            <CreditCard className="w-5 h-5 text-red-400" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400/80">Taxe Plateforme</span>
                                    </div>
                                    <p className="text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-3">
                                        <AnimatedNumber value={68.4} suffix="%" duration={1.5} />
                                    </p>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        des restaurants dépendent de TheFork, UberEats ou Deliveroo — sacrifiant jusqu'à <span className="text-white/80">30% de marge</span> sur chaque transaction.
                                    </p>
                                </HolographicCard>
                            </motion.div>

                            {/* Card 2 - Annual Loss */}
                            <motion.div variants={fadeInUp}>
                                <HolographicCard className="p-7 h-full" glowColor="accent">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20">
                                            <TrendingDown className="w-5 h-5 text-accent" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/80">Manque à Gagner</span>
                                    </div>
                                    <p className="text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-3">
                                        <AnimatedNumber value={84} prefix="-" suffix="k€" duration={1.2} />
                                    </p>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        Le déficit annuel moyen entre un restaurant invisible et un établissement optimisé pour le <span className="text-white/80">Pack Local Google</span>.
                                    </p>
                                </HolographicCard>
                            </motion.div>

                            {/* Card 3 - No Website */}
                            <motion.div variants={fadeInUp}>
                                <HolographicCard className="p-7 h-full" glowColor="sauge">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2.5 rounded-xl bg-sauge/10 border border-sauge/30">
                                            <Globe className="w-5 h-5 text-sauge-light" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sauge-light/80">Angle Mort Digital</span>
                                    </div>
                                    <p className="text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-3">
                                        <AnimatedNumber value={30} suffix="%" duration={1} />
                                    </p>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        n'ont aucun site web. Ils <span className="text-white/80">offrent</span> leur trafic organique aux concurrents et aux annuaires.
                                    </p>
                                </HolographicCard>
                            </motion.div>

                            {/* Card 4 - Reservation Multiplier */}
                            <motion.div variants={fadeInUp}>
                                <HolographicCard className="p-7 h-full" glowColor="white">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                                            <Target className="w-5 h-5 text-white/70" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Levier CRO</span>
                                    </div>
                                    <p className="text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-3">
                                        ×<AnimatedNumber value={3.4} duration={1} />
                                    </p>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        Le multiplicateur de conversion des fiches GMB avec bouton <span className="text-white/80">"Réserver une table"</span> activé.
                                    </p>
                                </HolographicCard>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* CITY RANKING - Déficit par Ville */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 border-t border-white/[0.04]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-5xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="mb-12">
                            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-400 mb-3">Classement du risque</p>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white/90 tracking-tight mb-4">Déficit digital par commune</h2>
                            <p className="text-white/50 max-w-2xl">Pourcentage de restaurants du Top Google sans site web propre. Plus le score est élevé, plus la dépendance aux plateformes tierces est forte.</p>
                        </motion.div>

                        <div className="space-y-4">
                            {STUDY_DATA.cityRanking.map((city, index) => {
                                const riskColors: Record<string, { bar: string; badge: string; text: string }> = {
                                    critical: { bar: "red", badge: "bg-red-500/20 border-red-500/30 text-red-400", text: "Critique" },
                                    high: { bar: "accent", badge: "bg-amber-500/20 border-amber-500/30 text-amber-400", text: "Élevé" },
                                    medium: { bar: "accent", badge: "bg-yellow-500/15 border-yellow-500/25 text-yellow-400/80", text: "Moyen" },
                                    low: { bar: "sauge", badge: "bg-sauge/20 border-sauge/30 text-sauge-light", text: "Faible" },
                                };
                                const risk = riskColors[city.riskLevel] || riskColors.medium;

                                return (
                                    <motion.div
                                        key={city.city}
                                        variants={fadeInUp}
                                        className="group"
                                    >
                                        <HolographicCard className="p-5" glowColor={city.riskLevel === 'critical' ? 'red' : 'white'}>
                                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                                {/* Rank & City */}
                                                <div className="flex items-center gap-4 md:w-48">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index < 3 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-white/5 text-white/50 border border-white/10'}`}>
                                                        {index + 1}
                                                    </div>
                                                    <span className="font-bold text-white/90">{city.city}</span>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="flex-1">
                                                    <div className="h-3 bg-white/[0.04] rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${city.noWebsitePct}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1, delay: index * 0.05, ease: [0.25, 0.4, 0.25, 1] }}
                                                            className={`h-full rounded-full ${
                                                                city.riskLevel === 'critical' ? 'bg-gradient-to-r from-red-600 to-red-400' :
                                                                city.riskLevel === 'high' ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                                                                city.riskLevel === 'medium' ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' :
                                                                'bg-gradient-to-r from-sauge to-sauge-light'
                                                            }`}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Stats */}
                                                <div className="flex items-center gap-4 md:gap-6">
                                                    <div className="text-right">
                                                        <p className="text-2xl font-heading font-bold text-white">{city.noWebsitePct}%</p>
                                                        <p className="text-[10px] text-white/40 uppercase tracking-wider">sans site</p>
                                                    </div>
                                                    <div className="text-right hidden sm:block">
                                                        <p className="text-lg font-bold text-red-400">-{city.lostRevenue.toLocaleString('fr-FR')} €</p>
                                                        <p className="text-[10px] text-white/40 uppercase tracking-wider">perte/an</p>
                                                    </div>
                                                    <div className={`px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${risk.badge}`}>
                                                        {risk.text}
                                                    </div>
                                                </div>
                                            </div>
                                        </HolographicCard>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* MARGIN COMPARISON - La Taxe Plateforme Visualisée */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 border-t border-white/[0.04] bg-gradient-to-b from-transparent via-red-500/[0.02] to-transparent">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Left: Content */}
                            <motion.div variants={fadeInUp}>
                                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent mb-3">Anatomie d'une Hémorragie</p>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white/90 tracking-tight mb-6">
                                    Où part votre marge ?
                                </h2>
                                <p className="text-white/50 mb-8 leading-relaxed">
                                    Pour un restaurant générant <span className="text-white/80 font-medium">288 000 € de CA annuel</span>, voici l'impact du canal d'acquisition sur la marge brute. Le différentiel entre une stratégie SEO Local et une dépendance aux plateformes atteint <span className="text-red-400 font-medium">77 760 €</span> de marge perdue.
                                </p>

                                <div className="space-y-6">
                                    {/* SEO Local */}
                                    <div className="p-5 rounded-2xl bg-sauge/5 border border-sauge/20">
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center gap-3">
                                                <Shield className="w-5 h-5 text-sauge-light" />
                                                <span className="font-bold text-white/90">SEO Local (Réservation directe)</span>
                                            </div>
                                            <span className="text-2xl font-heading font-bold text-sauge-light">35%</span>
                                        </div>
                                        <ProgressBar value={35} maxValue={40} color="sauge" showValue={false} />
                                        <p className="text-xs text-white/40 mt-2">= 100 800 € de marge brute conservée</p>
                                    </div>

                                    {/* TheFork */}
                                    <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20">
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center gap-3">
                                                <DollarSign className="w-5 h-5 text-accent" />
                                                <span className="font-bold text-white/90">TheFork (Commission 12-25%)</span>
                                            </div>
                                            <span className="text-2xl font-heading font-bold text-accent">18%</span>
                                        </div>
                                        <ProgressBar value={18} maxValue={40} color="accent" showValue={false} />
                                        <p className="text-xs text-white/40 mt-2">= 51 840 € de marge | <span className="text-red-400">-48 960 € vs direct</span></p>
                                    </div>

                                    {/* UberEats */}
                                    <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20">
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center gap-3">
                                                <AlertTriangle className="w-5 h-5 text-red-400" />
                                                <span className="font-bold text-white/90">UberEats / Deliveroo (30%)</span>
                                            </div>
                                            <span className="text-2xl font-heading font-bold text-red-400">8%</span>
                                        </div>
                                        <ProgressBar value={8} maxValue={40} color="red" showValue={false} />
                                        <p className="text-xs text-white/40 mt-2">= 23 040 € de marge | <span className="text-red-400">-77 760 € vs direct</span></p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right: Visual */}
                            <motion.div variants={fadeInScale}>
                                <HolographicCard className="p-8 lg:p-10" glowColor="accent">
                                    <div className="text-center mb-8">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-2">Simulation sur 288 000 € CA</p>
                                        <h3 className="text-xl font-heading font-bold text-white/90">Marge Brute Conservée</h3>
                                    </div>

                                    {/* Visual Bars */}
                                    <div className="flex items-end justify-center gap-6 h-64 mb-8">
                                        {/* SEO Local Bar */}
                                        <div className="flex flex-col items-center">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                whileInView={{ height: "100%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
                                                className="w-20 lg:w-24 bg-gradient-to-t from-sauge to-sauge-light rounded-t-xl relative"
                                                style={{ height: '224px' }}
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                                    <p className="text-lg font-bold text-sauge-light">100 800 €</p>
                                                </div>
                                            </motion.div>
                                            <p className="text-xs text-white/50 mt-4 text-center">SEO Local</p>
                                        </div>

                                        {/* TheFork Bar */}
                                        <div className="flex flex-col items-center">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                whileInView={{ height: "51%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                                                className="w-20 lg:w-24 bg-gradient-to-t from-accent to-yellow-400 rounded-t-xl relative"
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                                    <p className="text-lg font-bold text-accent">51 840 €</p>
                                                </div>
                                            </motion.div>
                                            <p className="text-xs text-white/50 mt-4 text-center">TheFork</p>
                                        </div>

                                        {/* UberEats Bar */}
                                        <div className="flex flex-col items-center">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                whileInView={{ height: "23%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                                                className="w-20 lg:w-24 bg-gradient-to-t from-red-600 to-red-400 rounded-t-xl relative"
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                                    <p className="text-lg font-bold text-red-400">23 040 €</p>
                                                </div>
                                            </motion.div>
                                            <p className="text-xs text-white/50 mt-4 text-center">UberEats</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/[0.06] text-center">
                                        <p className="text-sm text-white/50">
                                            Différentiel annuel : <span className="text-red-400 font-bold text-lg">-77 760 €</span>
                                        </p>
                                    </div>
                                </HolographicCard>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* SUSPICIOUS PROFILES - L'Alerte Fraude */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 border-t border-white/[0.04]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Alert Card */}
                            <motion.div variants={fadeInUp} className="lg:col-span-1">
                                <div className="p-8 rounded-3xl bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent border border-red-500/20 h-full">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30">
                                            <AlertTriangle className="w-6 h-6 text-red-400" />
                                        </div>
                                    </div>
                                    <p className="text-5xl font-heading font-bold text-red-400 mb-4">
                                        <AnimatedNumber value={13.3} suffix="%" duration={1} />
                                    </p>
                                    <h3 className="text-xl font-bold text-white/90 mb-3">Profils Suspects</h3>
                                    <p className="text-white/50 text-sm leading-relaxed">
                                        Des fiches affichant des notes supérieures à <span className="text-white/80">4.5/5</span> avec moins de <span className="text-white/80">10 avis</span>. Statistiquement improbable.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Details */}
                            <motion.div variants={fadeInUp} className="lg:col-span-2">
                                <HolographicCard className="p-8 h-full" glowColor="red">
                                    <h3 className="text-xl font-heading font-bold text-white/90 mb-6">Répartition des profils à risque</h3>

                                    <div className="space-y-6 mb-8">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-white/70">Nice</span>
                                                <span className="text-white font-bold">9 profils</span>
                                            </div>
                                            <ProgressBar value={9} maxValue={10} color="red" showValue={false} />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-white/70">Antibes</span>
                                                <span className="text-white font-bold">3 profils</span>
                                            </div>
                                            <ProgressBar value={3} maxValue={10} color="accent" showValue={false} />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-white/70">Cagnes-sur-Mer</span>
                                                <span className="text-white font-bold">2 profils</span>
                                            </div>
                                            <ProgressBar value={2} maxValue={10} color="accent" showValue={false} />
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                        <p className="text-sm text-white/60">
                                            <span className="text-red-400 font-bold">Critère de détection :</span> Note &gt; 4.5★ avec &lt; 10 avis. Ces profils biaisent la SERP locale et trompent les consommateurs.
                                        </p>
                                    </div>
                                </HolographicCard>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* EDITORIAL - L'Analyse Expert */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white text-ink">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="max-w-3xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="mb-12">
                            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-sauge mb-4">Analyse</p>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-ink leading-[1.1] tracking-tight">
                                L'élite Google Map<br />
                                <span className="text-soft">laisse sa marge aux intermédiaires.</span>
                            </h2>
                        </motion.div>

                        <div className="prose prose-lg prose-slate prose-headings:font-heading prose-headings:font-bold prose-a:text-sauge hover:prose-a:text-sauge/80 prose-a:no-underline max-w-none">
                            <motion.p variants={fadeInUp} className="text-xl text-soft leading-relaxed">
                                Le constat de ce rapport est clinique : <strong>avoir de bonnes notes ne suffit plus</strong>. En l'absence de site web et d'optimisation sérieuse, le trafic organique est systématiquement vampirisé par les plateformes.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="my-12 p-8 bg-ink rounded-2xl text-white">
                                <h3 className="text-xl font-bold text-white mt-0 mb-4">Le vrai coût de TheFork</h3>
                                <p className="text-white/70 mb-0">
                                    Acheter sa salle via une marketplace à 2-3 € par couvert revient à une ponction folle. Pour un établissement plein 300 jours/an, cela représente <strong className="text-red-400">25 300 € de marge nette sacrifiée</strong> annuellement. Un <Link href="/creation-site-web" className="text-accent hover:text-accent/80 underline underline-offset-4">site internet conçu pour convertir</Link> est le seul rempart.
                                </p>
                            </motion.div>

                            <motion.p variants={fadeInUp}>
                                Une Fiche Google Business Profile ne se gère pas "à la va-vite". C'est le point d'entrée n°1 du tunnel d'acquisition local. Perdre 3 places dans le Pack Local équivaut à diviser par deux les appels entrants — l'impact se lit dans la caisse le soir même.
                            </motion.p>

                            <motion.p variants={fadeInUp}>
                                Le <Link href="/seo-local" className="font-bold underline decoration-sauge/30 underline-offset-4 hover:decoration-sauge">SEO Local</Link> n'est pas un luxe. C'est une stratégie d'indépendance financière face aux monopoles tech.
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* OPEN DATA - Le Piège à Backlinks */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-ink text-white relative overflow-hidden" id="opendata">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="absolute top-1/2 right-0 w-[40%] h-[60%] bg-sauge/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-6xl mx-auto"
                    >
                        {/* Header */}
                        <motion.div variants={fadeInUp} className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sauge/30 bg-sauge/10 mb-6">
                                <Database className="w-4 h-4 text-sauge-light" />
                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sauge-light">Transparence Totale</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white/90 tracking-tight mb-4">Open Data & Méthodologie</h2>
                            <p className="text-white/50 max-w-2xl mx-auto">
                                Les données complètes de cette étude sont accessibles à tous. Journalistes, chercheurs, syndicats hôteliers : téléchargez, analysez, citez.
                            </p>
                        </motion.div>

                        {/* Download Cards */}
                        <div className="grid md:grid-cols-2 gap-6 mb-16">
                            <motion.a
                                href="/data/gmb-study-cote-azur-2026.json"
                                download
                                variants={fadeInUp}
                                className="group"
                            >
                                <HolographicCard className="p-8 h-full cursor-pointer transition-transform hover:-translate-y-1" glowColor="sauge">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="p-4 rounded-2xl bg-sauge/10 border border-sauge/20">
                                            <FileSpreadsheet className="w-8 h-8 text-sauge-light" />
                                        </div>
                                        <Download className="w-5 h-5 text-white/30 group-hover:text-sauge-light group-hover:-translate-y-1 transition-all" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white/90 mb-2">Dataset Complet JSON</h3>
                                    <p className="text-white/50 text-sm mb-4">308 restaurants · Métriques détaillées · Insights Business</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/5 rounded text-white/50">API Ready</span>
                                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/5 rounded text-white/50">2.4 MB</span>
                                    </div>
                                </HolographicCard>
                            </motion.a>

                            <motion.a
                                href="/data/restaurants_visibilite_paca.csv"
                                download
                                variants={fadeInUp}
                                className="group"
                            >
                                <HolographicCard className="p-8 h-full cursor-pointer transition-transform hover:-translate-y-1" glowColor="accent">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
                                            <BarChart3 className="w-8 h-8 text-accent" />
                                        </div>
                                        <Download className="w-5 h-5 text-white/30 group-hover:text-accent group-hover:-translate-y-1 transition-all" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white/90 mb-2">Export CSV / Excel</h3>
                                    <p className="text-white/50 text-sm mb-4">Format tabulaire · Compatible Data.gouv.fr · Prêt pour analyse</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/5 rounded text-white/50">Tableur</span>
                                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/5 rounded text-white/50">UTF-8</span>
                                    </div>
                                </HolographicCard>
                            </motion.a>
                        </div>

                        {/* Methodology */}
                        <motion.div variants={fadeInUp}>
                            <HolographicCard className="p-8 lg:p-10" glowColor="white">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                        <BookOpen className="w-6 h-6 text-white/70" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white/90">Cadre Méthodologique</h3>
                                        <p className="text-white/40 text-sm">Extraction et analyse · Février 2026</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Zap className="w-4 h-4 text-accent" />
                                            <span className="text-xs font-bold uppercase tracking-wider text-white/50">Sources</span>
                                        </div>
                                        <p className="text-white/70 text-sm leading-relaxed">
                                            Google Places API et Serper.dev. Extraction des Top résultats organiques pour les requêtes "restaurant + ville", "pizzeria + ville", "brasserie + ville".
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Target className="w-4 h-4 text-sauge-light" />
                                            <span className="text-xs font-bold uppercase tracking-wider text-white/50">Périmètre</span>
                                        </div>
                                        <p className="text-white/70 text-sm leading-relaxed">
                                            10 communes de la Côte d'Azur : Nice, Cannes, Antibes, Monaco, Menton, Grasse, Cagnes-sur-Mer, Saint-Tropez, Fréjus, Mandelieu-la-Napoule.
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Award className="w-4 h-4 text-red-400" />
                                            <span className="text-xs font-bold uppercase tracking-wider text-white/50">Estimations</span>
                                        </div>
                                        <p className="text-white/70 text-sm leading-relaxed">
                                            Calculs de marge basés sur : panier moyen 35 €, taux de conversion 12 %, commissions plateformes 15-30 %. Modèle économique standard restauration.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                                    <p className="text-white/40 text-xs">
                                        <strong className="text-white/60">Licence :</strong> Ces données sont mises à disposition sous licence Creative Commons BY 4.0. Vous êtes libre de les utiliser, partager et adapter à condition de créditer INDHACK comme source avec un lien vers cette page.
                                    </p>
                                </div>
                            </HolographicCard>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* CTA FINAL - L'Audit de Rentabilité */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#0A0D0B] border-t border-white/[0.04] relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-gradient-to-t from-red-500/10 via-transparent to-transparent rounded-full blur-[100px]"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/10 mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-300">Action requise</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-[1.05] tracking-tight mb-6">
                            Stoppez l'hémorragie<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-accent">sur vos marges.</span>
                        </h2>

                        <p className="text-xl text-white/50 mb-10 max-w-xl mx-auto leading-relaxed">
                            L'algorithme Google ne vous doit rien. Reprenez le contrôle de vos clients, éliminez la taxe des intermédiaires.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/contact?service=audit-rentabilite-gmb">
                                <Button className="bg-white text-[#0A0D0B] hover:bg-white/90 rounded-full px-10 py-7 text-base font-bold w-full sm:w-auto h-16 shadow-[0_0_80px_-20px_rgba(255,255,255,0.4)] transition-shadow hover:shadow-[0_0_100px_-20px_rgba(255,255,255,0.5)]">
                                    Demander un Audit de Rentabilité GMB
                                    <ArrowRight className="ml-3 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>

                        <p className="text-white/30 text-sm mt-8">
                            Diagnostic financier complet · Résultats sous 48h · Restaurateurs Côte d'Azur
                        </p>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
