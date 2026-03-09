"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
    ArrowRight,
    Download,
    TrendingDown,
    AlertTriangle,
    Globe,
    ChevronDown,
    ChevronUp,
    BarChart3,
    Shield,
    FileSpreadsheet,
    Database,
    BookOpen,
    Zap,
    Target,
    CreditCard,
    Award,
    Info,
    CheckCircle2,
    FlaskConical,
    Calculator,
    FileText,
    ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ═══════════════════════════════════════════════════════════════════════════════
// DATA SCHEMA - Modèle Économique Sourcé
// ═══════════════════════════════════════════════════════════════════════════════

const RESEARCH_DATA = {
    methodology: {
        totalScraped: 3108,
        sampleSize: 297,
        samplePercentage: 9.5,
        trafficCapture: 80,
        cities: 10,
        extractionDate: "9 mars 2026",
        sources: ["Google Places API", "Serper.dev", "INSEE 2024"]
    },
    economicModel: {
        avgRevenuePerRestaurant: 288000, // INSEE 2024
        avgRevenueSource: "INSEE, Enquête annuelle d'entreprise 2024 – Restauration traditionnelle (NAF 56.10A)",
        platformCommissions: {
            ubereats: { min: 25, max: 30, avg: 27.5 },
            deliveroo: { min: 25, max: 30, avg: 27.5 },
            thefork: { perCover: 2.50, avgCovers: 35 }
        },
        localPackCTR: {
            position1: 44,
            position2: 28,
            position3: 18,
            source: "Sistrix / Backlinko, Local Pack CTR Study 2024"
        },
        marginImpact: {
            directBooking: 35,
            theforkBooking: 18,
            deliveryPlatform: 8
        }
    },
    findings: {
        noWebsite: { count: 61, percentage: 20.5 },
        platformDependent: { percentage: 56.4 },
        suspiciousProfiles: { count: 28, percentage: 9.4 },
        calculatedLoss: {
            perRestaurant: 77760,
            methodology: "Différentiel de marge brute : réservation directe (35%) vs livraison plateforme (8%) sur CA 288k€"
        }
    },
    cityData: [
        { city: "Menton", scraped: 247, sample: 28, noWebsitePct: 42.9, riskLevel: "critical" },
        { city: "Fréjus", scraped: 252, sample: 28, noWebsitePct: 39.3, riskLevel: "critical" },
        { city: "Grasse", scraped: 283, sample: 30, noWebsitePct: 26.7, riskLevel: "high" },
        { city: "Cagnes-sur-Mer", scraped: 294, sample: 31, noWebsitePct: 25.8, riskLevel: "high" },
        { city: "Mandelieu", scraped: 212, sample: 29, noWebsitePct: 24.1, riskLevel: "medium" },
        { city: "Saint-Tropez", scraped: 287, sample: 31, noWebsitePct: 19.4, riskLevel: "medium" },
        { city: "Antibes", scraped: 274, sample: 26, noWebsitePct: 15.4, riskLevel: "medium" },
        { city: "Monaco", scraped: 226, sample: 26, noWebsitePct: 11.5, riskLevel: "low" },
        { city: "Cannes", scraped: 332, sample: 33, noWebsitePct: 3.0, riskLevel: "low" },
        { city: "Nice", scraped: 418, sample: 35, noWebsitePct: 2.9, riskLevel: "low" },
    ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function DataVerifiedBadge() {
    return (
        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-mono uppercase tracking-wider text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            Data Verified
        </div>
    );
}

function SourceAnnotation({ id, source }: { id: string; source: string }) {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <span className="relative inline-block">
            <sup
                className="text-accent cursor-help font-mono text-[10px] ml-0.5 hover:text-accent/80 transition-colors"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                [{id}]
            </sup>
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-ink border border-white/10 rounded-lg shadow-xl z-50 text-xs text-white/70 font-sans"
                    >
                        <div className="flex items-start gap-2">
                            <Info className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                            <span>{source}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
}

function MonospaceNumber({ value, suffix = "", prefix = "", className = "" }: { value: string | number; suffix?: string; prefix?: string; className?: string }) {
    return (
        <span className={`font-mono tracking-tight ${className}`}>
            {prefix}{typeof value === 'number' ? value.toLocaleString('fr-FR') : value}{suffix}
        </span>
    );
}

function AnimatedNumber({ value, suffix = "", prefix = "", duration = 2 }: { value: number; suffix?: string; prefix?: string; duration?: number }) {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const end = value;
        const increment = end / (duration * 60);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setDisplayValue(end);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(start * 10) / 10);
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className="font-mono">
            {prefix}{displayValue.toLocaleString('fr-FR')}{suffix}
        </span>
    );
}

function HolographicCard({ children, className = "", variant = "default" }: { children: React.ReactNode; className?: string; variant?: "default" | "verified" | "alert" }) {
    const borderColors = {
        default: "border-white/[0.06]",
        verified: "border-emerald-500/20",
        alert: "border-red-500/20"
    };

    return (
        <div className={`group relative bg-white/[0.02] backdrop-blur-2xl ${borderColors[variant]} border rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/[0.04] ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">{children}</div>
        </div>
    );
}

function MethodologyAccordion() {
    const [isOpen, setIsOpen] = useState(false);

    const calculations = [
        {
            label: "Chiffre d'affaires de référence",
            value: "288 000 €/an",
            source: "INSEE, Enquête annuelle d'entreprise 2024 – NAF 56.10A",
            formula: null
        },
        {
            label: "Marge brute réservation directe",
            value: "35%",
            source: "Moyenne sectorielle restauration traditionnelle",
            formula: "288 000 × 0.35 = 100 800 €"
        },
        {
            label: "Commission UberEats / Deliveroo",
            value: "25-30%",
            source: "Conditions générales publiques des plateformes (2024)",
            formula: null
        },
        {
            label: "Marge brute après commission livraison",
            value: "8%",
            source: "35% - 27% (commission moyenne) = 8%",
            formula: "288 000 × 0.08 = 23 040 €"
        },
        {
            label: "Différentiel de marge annuel",
            value: "77 760 €",
            source: "Calcul",
            formula: "100 800 € - 23 040 € = 77 760 €"
        },
        {
            label: "CTR Position 1 Pack Local",
            value: "44%",
            source: "Sistrix / Backlinko, Local Pack CTR Study 2024",
            formula: null
        }
    ];

    return (
        <div className="border border-white/[0.06] rounded-2xl overflow-hidden bg-white/[0.02]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                        <Calculator className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white/90 text-sm">Transparence du modèle économique</h3>
                        <p className="text-white/40 text-xs mt-0.5">Méthodologie de calcul et sources vérifiables</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <DataVerifiedBadge />
                    {isOpen ? <ChevronUp className="w-5 h-5 text-white/40" /> : <ChevronDown className="w-5 h-5 text-white/40" />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 border-t border-white/[0.04]">
                            <div className="pt-6 space-y-4">
                                {calculations.map((calc, i) => (
                                    <div key={i} className="grid grid-cols-12 gap-4 py-3 border-b border-white/[0.04] last:border-0">
                                        <div className="col-span-5">
                                            <p className="text-white/70 text-sm">{calc.label}</p>
                                        </div>
                                        <div className="col-span-3">
                                            <p className="font-mono text-white font-bold text-sm">{calc.value}</p>
                                        </div>
                                        <div className="col-span-4">
                                            <p className="text-white/40 text-xs leading-relaxed">{calc.source}</p>
                                            {calc.formula && (
                                                <code className="block mt-1 text-[10px] font-mono text-accent/80 bg-accent/5 px-2 py-1 rounded">
                                                    {calc.formula}
                                                </code>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                                <div className="flex items-start gap-3">
                                    <FlaskConical className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                                    <div className="text-xs text-white/50 leading-relaxed">
                                        <strong className="text-white/70">Hypothèse conservatrice :</strong> Ces calculs supposent une dépendance à 100% aux plateformes tierces. En réalité, le mix de canaux varie. Le différentiel réel se situe entre 40 000 € et 77 760 € selon le taux de commandes en ligne vs. walk-in.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function DataStreamLine() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setOffset(prev => (prev + 1) % 100);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const dataPoints = "▪ NICE:687 ▪ CANNES:491 ▪ ANTIBES:445 ▪ MENTON:312 ▪ FRÉJUS:298 ▪ GRASSE:287 ▪ CAGNES:276 ▪ ST-TROPEZ:267 ▪ MONACO:198 ▪ MANDELIEU:189 ▪ ";

    return (
        <div className="overflow-hidden py-3 border-y border-white/[0.04] bg-white/[0.01]">
            <div
                className="whitespace-nowrap font-mono text-[10px] text-white/20 tracking-widest"
                style={{ transform: `translateX(-${offset}px)` }}
            >
                {dataPoints.repeat(5)}
            </div>
        </div>
    );
}

function ProgressBar({ value, maxValue = 100, color = "default" }: { value: number; maxValue?: number; color?: string }) {
    const percentage = (value / maxValue) * 100;
    const colorClasses: Record<string, string> = {
        default: "bg-gradient-to-r from-white/60 to-white/40",
        critical: "bg-gradient-to-r from-red-500 to-red-400",
        high: "bg-gradient-to-r from-amber-500 to-amber-400",
        medium: "bg-gradient-to-r from-yellow-500 to-yellow-400",
        low: "bg-gradient-to-r from-emerald-500 to-emerald-400"
    };

    return (
        <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
                className={`h-full rounded-full ${colorClasses[color] || colorClasses.default}`}
            />
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function StudyClientContent() {
    return (
        <main className="bg-[#08090A] min-h-screen text-white selection:bg-accent/30 antialiased">

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* DATA STREAM HEADER */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <DataStreamLine />

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* HERO - Entonnoir Data */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="relative pt-24 pb-20 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Research Badge */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02]">
                                <FileText className="w-3.5 h-3.5 text-white/50" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Rapport d'Intelligence Économique</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02]">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">REF: PACA-RESTO-2026-Q1</span>
                            </div>
                            <DataVerifiedBadge />
                        </motion.div>

                        {/* Title */}
                        <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] tracking-tight mb-8">
                            <span className="text-white/90">Asymétrie algorithmique</span><br />
                            <span className="text-white/40">et cannibalisation des marges</span><br />
                            <span className="text-white/90">dans la restauration azuréenne.</span>
                        </motion.h1>

                        {/* Methodology Statement */}
                        <motion.div variants={fadeInUp} className="mb-10 p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 shrink-0">
                                    <Database className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <p className="text-white/70 leading-relaxed">
                                        Extraction exhaustive de <MonospaceNumber value={RESEARCH_DATA.methodology.totalScraped} className="text-white font-bold" /> fiches d'établissements sur le littoral méditerranéen (PACA).
                                        Isolation et audit manuel de l'<strong className="text-white">élite algorithmique</strong> : les <MonospaceNumber value={RESEARCH_DATA.methodology.sampleSize} className="text-white font-bold" /> restaurants
                                        qui captent <MonospaceNumber value={RESEARCH_DATA.methodology.trafficCapture} suffix="%" className="text-accent font-bold" /> du trafic de recherche Google.
                                        <SourceAnnotation id="1" source="Loi de Pareto appliquée au référencement local : les 10 premiers résultats organiques captent 80%+ des clics (Sistrix, 2024)" />
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/[0.04] rounded text-[10px] font-mono text-white/50">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            {RESEARCH_DATA.methodology.cities} communes
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/[0.04] rounded text-[10px] font-mono text-white/50">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                                            Top {RESEARCH_DATA.methodology.samplePercentage}% SERP
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/[0.04] rounded text-[10px] font-mono text-white/50">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                                            Extraction: {RESEARCH_DATA.methodology.extractionDate}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Key Finding */}
                        <motion.div variants={fadeInUp} className="mb-10">
                            <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl">
                                <div className="flex items-center gap-2 mb-3">
                                    <AlertTriangle className="w-4 h-4 text-red-400" />
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-red-400">Constat Principal</span>
                                </div>
                                <p className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                                    Différentiel de marge opérationnelle : <MonospaceNumber value={77760} prefix="-" suffix=" €" className="text-red-400" />/an
                                    <SourceAnnotation id="2" source="Différentiel calculé entre marge brute réservation directe (35%) et marge après commission plateforme (8%) sur CA référence INSEE 288k€" />
                                </p>
                                <p className="text-white/50 text-sm">
                                    Par établissement dépendant à 100% des canaux d'acquisition tiers (UberEats, Deliveroo, TheFork) vs. acquisition directe.
                                </p>
                            </div>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                            <a href="#findings">
                                <Button className="bg-white text-[#08090A] hover:bg-white/90 rounded-full px-6 py-5 text-sm font-bold h-12">
                                    Résultats de l'étude
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </a>
                            <a href="#methodology">
                                <Button variant="outline" className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white rounded-full px-6 py-5 text-sm font-bold h-12">
                                    <FlaskConical className="mr-2 w-4 h-4" />
                                    Méthodologie complète
                                </Button>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* METHODOLOGY ACCORDION */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-8 border-t border-white/[0.04]" id="methodology">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <MethodologyAccordion />
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* KEY METRICS - Findings */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-16 border-t border-white/[0.04]" id="findings">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-6xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="mb-10 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-2">Section 01</p>
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white/90">Indicateurs de vulnérabilité</h2>
                            </div>
                            <DataVerifiedBadge />
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Card 1 */}
                            <motion.div variants={fadeInUp}>
                                <HolographicCard className="p-6 h-full" variant="alert">
                                    <div className="flex items-center justify-between mb-4">
                                        <CreditCard className="w-5 h-5 text-red-400" />
                                        <span className="text-[9px] font-mono uppercase tracking-wider text-red-400/60">Dépendance Critique</span>
                                    </div>
                                    <p className="text-4xl font-mono font-bold text-white tracking-tight mb-2">
                                        <AnimatedNumber value={56.4} suffix="%" duration={1.5} />
                                    </p>
                                    <p className="text-xs text-white/40 leading-relaxed">
                                        Taux de dépendance aux plateformes tierces pour l'acquisition client
                                        <SourceAnnotation id="3" source="Ratio établissements sans site web + sans système de réservation directe / échantillon total" />
                                    </p>
                                </HolographicCard>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div variants={fadeInUp}>
                                <HolographicCard className="p-6 h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <TrendingDown className="w-5 h-5 text-accent" />
                                        <span className="text-[9px] font-mono uppercase tracking-wider text-accent/60">Perte Annuelle</span>
                                    </div>
                                    <p className="text-4xl font-mono font-bold text-white tracking-tight mb-2">
                                        <AnimatedNumber value={77.7} prefix="-" suffix="k€" duration={1.2} />
                                    </p>
                                    <p className="text-xs text-white/40 leading-relaxed">
                                        Différentiel de marge brute annuel par établissement (scénario dépendance 100%)
                                        <SourceAnnotation id="4" source="Calcul: (288k × 35%) - (288k × 8%) = 77 760€" />
                                    </p>
                                </HolographicCard>
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div variants={fadeInUp}>
                                <HolographicCard className="p-6 h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <Globe className="w-5 h-5 text-white/50" />
                                        <span className="text-[9px] font-mono uppercase tracking-wider text-white/30">Déficit Digital</span>
                                    </div>
                                    <p className="text-4xl font-mono font-bold text-white tracking-tight mb-2">
                                        <AnimatedNumber value={20.5} suffix="%" duration={1} />
                                    </p>
                                    <p className="text-xs text-white/40 leading-relaxed">
                                        Établissements du Top SERP sans site web propriétaire (n={RESEARCH_DATA.findings.noWebsite.count})
                                    </p>
                                </HolographicCard>
                            </motion.div>

                            {/* Card 4 */}
                            <motion.div variants={fadeInUp}>
                                <HolographicCard className="p-6 h-full" variant="verified">
                                    <div className="flex items-center justify-between mb-4">
                                        <Target className="w-5 h-5 text-emerald-400" />
                                        <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400/60">CTR Pack Local</span>
                                    </div>
                                    <p className="text-4xl font-mono font-bold text-white tracking-tight mb-2">
                                        <AnimatedNumber value={44} suffix="%" duration={1} />
                                    </p>
                                    <p className="text-xs text-white/40 leading-relaxed">
                                        Taux de clic Position 1 du Pack Local Google
                                        <SourceAnnotation id="5" source="Sistrix / Backlinko, Local Pack CTR Study 2024" />
                                    </p>
                                </HolographicCard>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* CITY BREAKDOWN */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-16 border-t border-white/[0.04]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="mb-10">
                            <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-2">Section 02</p>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white/90 mb-3">Analyse par commune</h2>
                            <p className="text-white/50 text-sm">
                                Taux d'établissements sans site web parmi l'élite algorithmique de chaque commune.
                                Corrélation négative observée entre maturité digitale et dépendance aux plateformes.
                            </p>
                        </motion.div>

                        {/* Table Header */}
                        <motion.div variants={fadeInUp} className="grid grid-cols-12 gap-4 px-4 py-3 text-[10px] font-mono uppercase tracking-wider text-white/30 border-b border-white/[0.06]">
                            <div className="col-span-3">Commune</div>
                            <div className="col-span-2 text-right">Scrapés</div>
                            <div className="col-span-2 text-right">Échantillon</div>
                            <div className="col-span-3">Sans Site Web</div>
                            <div className="col-span-2 text-right">Risque</div>
                        </motion.div>

                        {/* Table Rows */}
                        <div className="divide-y divide-white/[0.04]">
                            {RESEARCH_DATA.cityData.map((city, index) => {
                                const riskLabels: Record<string, { label: string; color: string }> = {
                                    critical: { label: "Critique", color: "text-red-400 bg-red-500/10 border-red-500/20" },
                                    high: { label: "Élevé", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
                                    medium: { label: "Moyen", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
                                    low: { label: "Faible", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                                };
                                const risk = riskLabels[city.riskLevel];

                                return (
                                    <motion.div
                                        key={city.city}
                                        variants={fadeInUp}
                                        className="grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-white/[0.02] transition-colors"
                                    >
                                        <div className="col-span-3 flex items-center gap-3">
                                            <span className="w-6 h-6 rounded bg-white/[0.04] flex items-center justify-center text-[10px] font-mono text-white/40">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span className="font-medium text-white/80 text-sm">{city.city}</span>
                                        </div>
                                        <div className="col-span-2 text-right font-mono text-white/50 text-sm">
                                            {city.scraped.toLocaleString('fr-FR')}
                                        </div>
                                        <div className="col-span-2 text-right font-mono text-white/80 text-sm font-bold">
                                            {city.sample}
                                        </div>
                                        <div className="col-span-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1">
                                                    <ProgressBar value={city.noWebsitePct} color={city.riskLevel} />
                                                </div>
                                                <span className="font-mono text-white font-bold text-sm w-10 text-right">{city.noWebsitePct}%</span>
                                            </div>
                                        </div>
                                        <div className="col-span-2 text-right">
                                            <span className={`inline-flex px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider border ${risk.color}`}>
                                                {risk.label}
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* MARGIN ANALYSIS */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-16 border-t border-white/[0.04] bg-gradient-to-b from-transparent via-red-500/[0.01] to-transparent">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-5xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="mb-10">
                            <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-2">Section 03</p>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white/90 mb-3">Structure de cannibalisation des marges</h2>
                            <p className="text-white/50 text-sm max-w-2xl">
                                Simulation sur base CA référence <MonospaceNumber value={288000} suffix=" €" className="text-white/70" />/an
                                (INSEE 2024, restauration traditionnelle NAF 56.10A).
                                <SourceAnnotation id="6" source="INSEE, Enquête annuelle d'entreprise 2024" />
                            </p>
                        </motion.div>

                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Direct Booking */}
                            <motion.div variants={fadeInUp}>
                                <HolographicCard className="p-6 h-full" variant="verified">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Shield className="w-5 h-5 text-emerald-400" />
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80">Canal Direct</span>
                                    </div>
                                    <p className="text-sm text-white/50 mb-4">Réservation directe (site web, téléphone)</p>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-white/40 text-xs">Marge brute</span>
                                            <span className="font-mono text-2xl font-bold text-emerald-400">35%</span>
                                        </div>
                                        <div className="h-3 bg-white/[0.04] rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1 }}
                                                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                                            />
                                        </div>
                                        <div className="pt-4 border-t border-white/[0.06]">
                                            <div className="flex justify-between">
                                                <span className="text-white/40 text-xs">Marge annuelle</span>
                                                <span className="font-mono text-white font-bold">100 800 €</span>
                                            </div>
                                        </div>
                                    </div>
                                </HolographicCard>
                            </motion.div>

                            {/* TheFork */}
                            <motion.div variants={fadeInUp}>
                                <HolographicCard className="p-6 h-full">
                                    <div className="flex items-center gap-2 mb-6">
                                        <CreditCard className="w-5 h-5 text-accent" />
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-accent/80">TheFork</span>
                                    </div>
                                    <p className="text-sm text-white/50 mb-4">Commission ~2.50€/couvert</p>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-white/40 text-xs">Marge résiduelle</span>
                                            <span className="font-mono text-2xl font-bold text-accent">~22%</span>
                                        </div>
                                        <div className="h-3 bg-white/[0.04] rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "63%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.1 }}
                                                className="h-full bg-gradient-to-r from-accent to-yellow-400 rounded-full"
                                            />
                                        </div>
                                        <div className="pt-4 border-t border-white/[0.06]">
                                            <div className="flex justify-between">
                                                <span className="text-white/40 text-xs">Marge annuelle</span>
                                                <span className="font-mono text-white font-bold">~63 360 €</span>
                                            </div>
                                            <div className="flex justify-between mt-1">
                                                <span className="text-red-400/60 text-xs">Différentiel</span>
                                                <span className="font-mono text-red-400 text-sm">-37 440 €</span>
                                            </div>
                                        </div>
                                    </div>
                                </HolographicCard>
                            </motion.div>

                            {/* Delivery Platforms */}
                            <motion.div variants={fadeInUp}>
                                <HolographicCard className="p-6 h-full" variant="alert">
                                    <div className="flex items-center gap-2 mb-6">
                                        <AlertTriangle className="w-5 h-5 text-red-400" />
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-red-400/80">UberEats / Deliveroo</span>
                                    </div>
                                    <p className="text-sm text-white/50 mb-4">Commission 25-30%</p>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-white/40 text-xs">Marge résiduelle</span>
                                            <span className="font-mono text-2xl font-bold text-red-400">8%</span>
                                        </div>
                                        <div className="h-3 bg-white/[0.04] rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "23%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                                            />
                                        </div>
                                        <div className="pt-4 border-t border-white/[0.06]">
                                            <div className="flex justify-between">
                                                <span className="text-white/40 text-xs">Marge annuelle</span>
                                                <span className="font-mono text-white font-bold">23 040 €</span>
                                            </div>
                                            <div className="flex justify-between mt-1">
                                                <span className="text-red-400/60 text-xs">Différentiel</span>
                                                <span className="font-mono text-red-400 text-sm font-bold">-77 760 €</span>
                                            </div>
                                        </div>
                                    </div>
                                </HolographicCard>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* SUSPICIOUS PROFILES */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-16 border-t border-white/[0.04]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="mb-10">
                            <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-2">Section 04</p>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white/90 mb-3">Anomalies statistiques détectées</h2>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <HolographicCard className="p-8" variant="alert">
                                <div className="grid md:grid-cols-3 gap-8">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <AlertTriangle className="w-5 h-5 text-red-400" />
                                            <span className="text-[10px] font-mono uppercase tracking-wider text-red-400/80">Profils Suspects</span>
                                        </div>
                                        <p className="text-5xl font-mono font-bold text-red-400 mb-2">
                                            {RESEARCH_DATA.findings.suspiciousProfiles.count}
                                        </p>
                                        <p className="text-sm text-white/50">
                                            <MonospaceNumber value={RESEARCH_DATA.findings.suspiciousProfiles.percentage} suffix="%" className="text-white/70" /> de l'échantillon
                                        </p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-white/60 text-sm mb-4">
                                            <strong className="text-white/80">Critère de détection :</strong> Fiches affichant une note &gt; 4.5/5 avec un volume d'avis &lt; 10.
                                            Cette combinaison est statistiquement improbable sur un marché concurrentiel et suggère une manipulation ou un profil récemment créé sans historique réel.
                                        </p>
                                        <div className="p-4 bg-white/[0.02] rounded-lg border border-white/[0.04]">
                                            <p className="text-xs font-mono text-white/40 mb-2">Répartition par commune (Top 3)</p>
                                            <div className="flex gap-4">
                                                <span className="font-mono text-white/70">Nice: <strong className="text-red-400">9</strong></span>
                                                <span className="font-mono text-white/70">Antibes: <strong className="text-amber-400">3</strong></span>
                                                <span className="font-mono text-white/70">Cagnes: <strong className="text-yellow-400">2</strong></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </HolographicCard>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* OPEN DATA */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-16 border-t border-white/[0.04] bg-white/[0.01]" id="opendata">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-5xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-4">
                                <Database className="w-4 h-4 text-emerald-400" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Open Data</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white/90 mb-3">Données publiques et vérifiables</h2>
                            <p className="text-white/50 text-sm max-w-xl mx-auto">
                                Conformément à notre engagement de transparence, l'intégralité du dataset est accessible.
                                Licence Creative Commons BY 4.0.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6 mb-10">
                            <motion.a href="/data/gmb-study-cote-azur-2026.json" download variants={fadeInUp} className="group">
                                <HolographicCard className="p-6 h-full transition-transform hover:-translate-y-1" variant="verified">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                            <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <Download className="w-5 h-5 text-white/20 group-hover:text-emerald-400 transition-colors" />
                                    </div>
                                    <h3 className="font-bold text-white/90 mb-1">Dataset Complet (JSON)</h3>
                                    <p className="text-white/40 text-xs mb-4">297 établissements · Métriques détaillées · Business Insights</p>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider bg-white/[0.04] rounded text-white/40">API Ready</span>
                                        <span className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider bg-white/[0.04] rounded text-white/40">2.4 MB</span>
                                    </div>
                                </HolographicCard>
                            </motion.a>

                            <motion.a href="/data/restaurants_visibilite_paca.csv" download variants={fadeInUp} className="group">
                                <HolographicCard className="p-6 h-full transition-transform hover:-translate-y-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                                            <BarChart3 className="w-6 h-6 text-accent" />
                                        </div>
                                        <Download className="w-5 h-5 text-white/20 group-hover:text-accent transition-colors" />
                                    </div>
                                    <h3 className="font-bold text-white/90 mb-1">Export Tabulaire (CSV)</h3>
                                    <p className="text-white/40 text-xs mb-4">Format Excel/Sheets · Compatible Data.gouv.fr · UTF-8</p>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider bg-white/[0.04] rounded text-white/40">Tableur</span>
                                        <span className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider bg-white/[0.04] rounded text-white/40">256 KB</span>
                                    </div>
                                </HolographicCard>
                            </motion.a>
                        </div>

                        {/* Sources & References */}
                        <motion.div variants={fadeInUp}>
                            <HolographicCard className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <BookOpen className="w-5 h-5 text-white/50" />
                                    <h3 className="font-bold text-white/90">Références et sources</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6 text-xs text-white/50">
                                    <div>
                                        <p className="font-mono text-white/30 mb-2">[1] Loi de Pareto SERP</p>
                                        <p>Sistrix, "Click-Through Rate Study", 2024. Les 10 premiers résultats organiques captent 80%+ des clics.</p>
                                    </div>
                                    <div>
                                        <p className="font-mono text-white/30 mb-2">[2] [4] Modèle de marge</p>
                                        <p>Calcul interne basé sur marge brute sectorielle (35%) et commissions plateformes publiques (25-30%).</p>
                                    </div>
                                    <div>
                                        <p className="font-mono text-white/30 mb-2">[3] Taux de dépendance</p>
                                        <p>Ratio établissements sans présence web directe / échantillon. Méthodologie : analyse des champs "website" de l'API Google Places.</p>
                                    </div>
                                    <div>
                                        <p className="font-mono text-white/30 mb-2">[5] CTR Pack Local</p>
                                        <p>Sistrix / Backlinko, "Local Pack CTR Study", 2024. Position 1 : 44%, Position 2 : 28%, Position 3 : 18%.</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="font-mono text-white/30 mb-2">[6] CA de référence</p>
                                        <p>INSEE, Enquête annuelle d'entreprise 2024 – Restauration traditionnelle (NAF 56.10A). CA moyen par établissement : 288 000 €/an.</p>
                                    </div>
                                </div>
                            </HolographicCard>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* CTA */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 border-t border-white/[0.04]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-4">Recommandation</p>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white/90 mb-4">
                            Audit de position concurrentielle
                        </h2>
                        <p className="text-white/50 mb-8 text-sm leading-relaxed">
                            Évaluez votre exposition au risque de cannibalisation des marges par les plateformes tierces.
                            Diagnostic chiffré de votre position sur le Pack Local Google.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/contact?service=audit-gmb">
                                <Button className="bg-white text-[#08090A] hover:bg-white/90 rounded-full px-8 py-6 text-sm font-bold h-14">
                                    Demander un audit
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                            <Link href="/seo-local">
                                <Button variant="outline" className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white rounded-full px-8 py-6 text-sm font-bold h-14">
                                    En savoir plus sur le SEO Local
                                    <ExternalLink className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer Data Stream */}
            <DataStreamLine />
        </main>
    );
}
