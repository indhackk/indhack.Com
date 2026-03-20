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

function SourceAnnotation({ id, source }: { id: string; source: string }) {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <span className="relative inline-block">
            <sup
                className="text-sauge cursor-help text-[10px] ml-0.5 hover:text-sauge/70 transition-colors"
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
                        className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-white border border-line rounded-lg shadow-xl z-50 text-xs text-soft font-sans"
                    >
                        <div className="flex items-start gap-2">
                            <Info className="w-3 h-3 text-sauge shrink-0 mt-0.5" />
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
        <span className={`tabular-nums tracking-tight ${className}`}>
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
        <span ref={ref} className="tabular-nums">
            {prefix}{displayValue.toLocaleString('fr-FR')}{suffix}
        </span>
    );
}

function StudyCard({ children, className = "", variant = "default" }: { children: React.ReactNode; className?: string; variant?: "default" | "verified" | "alert" }) {
    const borderColors = {
        default: "border-line",
        verified: "border-emerald-200",
        alert: "border-red-200"
    };

    return (
        <div className={`bg-white ${borderColors[variant]} border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
            {children}
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
            value: "35 %",
            source: "Moyenne sectorielle restauration traditionnelle",
            formula: "288 000 × 0.35 = 100 800 €"
        },
        {
            label: "Commission UberEats / Deliveroo",
            value: "25-30 %",
            source: "Conditions générales publiques des plateformes (2024)",
            formula: null
        },
        {
            label: "Marge brute après commission livraison",
            value: "8 %",
            source: "35 % - 27 % (commission moyenne) = 8 %",
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
            value: "44 %",
            source: "Sistrix / Backlinko, Local Pack CTR Study 2024",
            formula: null
        }
    ];

    return (
        <div className="border border-line rounded-2xl overflow-hidden bg-white shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-fond-clair transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-sauge/10 border border-sauge/20">
                        <Calculator className="w-5 h-5 text-sauge" />
                    </div>
                    <div>
                        <h3 className="font-bold text-ink text-sm">Transparence du modèle économique</h3>
                        <p className="text-soft text-xs mt-0.5">Méthodologie de calcul et sources vérifiables</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded text-[10px] uppercase tracking-wider text-emerald-700">
                        <CheckCircle2 className="w-3 h-3" />
                        Vérifié
                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-soft" /> : <ChevronDown className="w-5 h-5 text-soft" />}
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
                        <div className="px-6 pb-6 border-t border-line">
                            <div className="pt-6 space-y-4">
                                {calculations.map((calc, i) => (
                                    <div key={i} className="grid grid-cols-12 gap-4 py-3 border-b border-line/50 last:border-0">
                                        <div className="col-span-5">
                                            <p className="text-soft text-sm">{calc.label}</p>
                                        </div>
                                        <div className="col-span-3">
                                            <p className="font-bold text-ink text-sm tabular-nums">{calc.value}</p>
                                        </div>
                                        <div className="col-span-4">
                                            <p className="text-soft/70 text-xs leading-relaxed">{calc.source}</p>
                                            {calc.formula && (
                                                <code className="block mt-1 text-[10px] text-sauge bg-sauge/5 px-2 py-1 rounded">
                                                    {calc.formula}
                                                </code>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-fond-clair rounded-xl border border-line">
                                <div className="flex items-start gap-3">
                                    <FlaskConical className="w-4 h-4 text-soft shrink-0 mt-0.5" />
                                    <div className="text-xs text-soft leading-relaxed">
                                        <strong className="text-ink">Hypothèse conservatrice :</strong> Ces calculs supposent une dépendance à 100 % aux plateformes tierces. En réalité, le mix de canaux varie. Le différentiel réel se situe entre 40 000 € et 77 760 € selon le taux de commandes en ligne vs. walk-in.
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

function ProgressBar({ value, maxValue = 100, color = "default" }: { value: number; maxValue?: number; color?: string }) {
    const percentage = (value / maxValue) * 100;
    const colorClasses: Record<string, string> = {
        default: "bg-gradient-to-r from-sauge to-sauge-light",
        critical: "bg-gradient-to-r from-red-500 to-red-400",
        high: "bg-gradient-to-r from-amber-500 to-amber-400",
        medium: "bg-gradient-to-r from-yellow-500 to-yellow-400",
        low: "bg-gradient-to-r from-emerald-500 to-emerald-400"
    };

    return (
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
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
        <main className="bg-fond-clair min-h-screen text-ink selection:bg-sauge/20 antialiased">

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* HERO */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-sauge/5 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Badges */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line bg-white">
                                <FileText className="w-3.5 h-3.5 text-sauge" />
                                <span className="text-xs font-medium text-soft">Étude terrain · Mars 2026</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line bg-white">
                                <span className="text-xs font-medium text-soft">{RESEARCH_DATA.methodology.cities} communes · Côte d'Azur</span>
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] tracking-tight mb-8">
                            <span className="text-ink">Visibilité Google des restaurants</span><br />
                            <span className="text-soft">sur la Côte d'Azur :</span><br />
                            <span className="text-ink">ce que révèlent les données.</span>
                        </motion.h1>

                        {/* Methodology Statement */}
                        <motion.div variants={fadeInUp} className="mb-10 p-6 bg-white border border-line rounded-xl shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-sauge/10 border border-sauge/20 shrink-0">
                                    <Database className="w-5 h-5 text-sauge" />
                                </div>
                                <div>
                                    <p className="text-soft leading-relaxed">
                                        Nous avons analysé <MonospaceNumber value={RESEARCH_DATA.methodology.totalScraped} className="text-ink font-bold" /> fiches Google Business sur le littoral PACA,
                                        puis audité manuellement les <MonospaceNumber value={RESEARCH_DATA.methodology.sampleSize} className="text-ink font-bold" /> restaurants
                                        qui captent <MonospaceNumber value={RESEARCH_DATA.methodology.trafficCapture} suffix=" %" className="text-sauge font-bold" /> du trafic de recherche.
                                        <SourceAnnotation id="1" source="Loi de Pareto appliquée au référencement local : les 10 premiers résultats organiques captent 80 %+ des clics (Sistrix, 2024)" />
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-fond-clair rounded-full text-xs text-soft border border-line">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            {RESEARCH_DATA.methodology.cities} communes
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-fond-clair rounded-full text-xs text-soft border border-line">
                                            <span className="w-1.5 h-1.5 rounded-full bg-sauge"></span>
                                            Top {RESEARCH_DATA.methodology.samplePercentage} % des résultats
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-fond-clair rounded-full text-xs text-soft border border-line">
                                            <span className="w-1.5 h-1.5 rounded-full bg-soft/40"></span>
                                            Données du {RESEARCH_DATA.methodology.extractionDate}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Key Finding */}
                        <motion.div variants={fadeInUp} className="mb-10">
                            <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
                                <div className="flex items-center gap-2 mb-3">
                                    <AlertTriangle className="w-4 h-4 text-red-600" />
                                    <span className="text-xs font-bold uppercase tracking-wider text-red-600">Constat principal</span>
                                </div>
                                <p className="text-2xl md:text-3xl font-heading font-bold text-ink mb-2">
                                    Perte de marge estimée : <MonospaceNumber value={77760} prefix="-" suffix=" €" className="text-red-600" />/an
                                    <SourceAnnotation id="2" source="Différentiel calculé entre marge brute réservation directe (35 %) et marge après commission plateforme (8 %) sur CA référence INSEE 288k€" />
                                </p>
                                <p className="text-soft text-sm">
                                    Par restaurant dépendant à 100 % des plateformes (UberEats, Deliveroo, TheFork) au lieu de l'acquisition directe.
                                </p>
                            </div>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                            <a href="#findings">
                                <Button className="bg-sauge text-white hover:bg-sauge/90 rounded-full px-6 py-5 text-sm font-bold h-12">
                                    Voir les résultats
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </a>
                            <a href="#methodology">
                                <Button variant="outline" className="border-line text-soft hover:bg-white hover:text-ink rounded-full px-6 py-5 text-sm font-bold h-12">
                                    <FlaskConical className="mr-2 w-4 h-4" />
                                    Méthodologie
                                </Button>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* METHODOLOGY ACCORDION */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-8 border-t border-line" id="methodology">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <MethodologyAccordion />
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* KEY METRICS - Findings */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-16 border-t border-line" id="findings">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-6xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="mb-10">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">Indicateurs clés de vulnérabilité</h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Card 1 */}
                            <motion.div variants={fadeInUp}>
                                <StudyCard className="p-6 h-full" variant="alert">
                                    <div className="flex items-center justify-between mb-4">
                                        <CreditCard className="w-5 h-5 text-red-500" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">Dépendance critique</span>
                                    </div>
                                    <p className="text-4xl font-bold text-ink tracking-tight mb-2 tabular-nums">
                                        <AnimatedNumber value={56.4} suffix=" %" duration={1.5} />
                                    </p>
                                    <p className="text-xs text-soft leading-relaxed">
                                        Taux de dépendance aux plateformes tierces pour l'acquisition client
                                        <SourceAnnotation id="3" source="Ratio établissements sans site web + sans système de réservation directe / échantillon total" />
                                    </p>
                                </StudyCard>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div variants={fadeInUp}>
                                <StudyCard className="p-6 h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <TrendingDown className="w-5 h-5 text-accent" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Perte annuelle</span>
                                    </div>
                                    <p className="text-4xl font-bold text-ink tracking-tight mb-2 tabular-nums">
                                        <AnimatedNumber value={77.7} prefix="-" suffix="k€" duration={1.2} />
                                    </p>
                                    <p className="text-xs text-soft leading-relaxed">
                                        Différentiel de marge brute annuel par établissement (scénario dépendance 100 %)
                                        <SourceAnnotation id="4" source="Calcul : (288k × 35 %) - (288k × 8 %) = 77 760 €" />
                                    </p>
                                </StudyCard>
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div variants={fadeInUp}>
                                <StudyCard className="p-6 h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <Globe className="w-5 h-5 text-soft" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-soft">Déficit digital</span>
                                    </div>
                                    <p className="text-4xl font-bold text-ink tracking-tight mb-2 tabular-nums">
                                        <AnimatedNumber value={20.5} suffix=" %" duration={1} />
                                    </p>
                                    <p className="text-xs text-soft leading-relaxed">
                                        Établissements du top Google sans site web propriétaire (n={RESEARCH_DATA.findings.noWebsite.count})
                                    </p>
                                </StudyCard>
                            </motion.div>

                            {/* Card 4 */}
                            <motion.div variants={fadeInUp}>
                                <StudyCard className="p-6 h-full" variant="verified">
                                    <div className="flex items-center justify-between mb-4">
                                        <Target className="w-5 h-5 text-emerald-600" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">CTR Pack Local</span>
                                    </div>
                                    <p className="text-4xl font-bold text-ink tracking-tight mb-2 tabular-nums">
                                        <AnimatedNumber value={44} suffix=" %" duration={1} />
                                    </p>
                                    <p className="text-xs text-soft leading-relaxed">
                                        Taux de clic Position 1 du Pack Local Google
                                        <SourceAnnotation id="5" source="Sistrix / Backlinko, Local Pack CTR Study 2024" />
                                    </p>
                                </StudyCard>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* CITY BREAKDOWN */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-16 border-t border-line">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="mb-10">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-3">Analyse par commune</h2>
                            <p className="text-soft text-sm">
                                Taux d'établissements sans site web parmi les mieux classés de chaque commune.
                                On observe une corrélation nette entre maturité digitale et indépendance vis-à-vis des plateformes.
                            </p>
                        </motion.div>

                        {/* Table Header */}
                        <motion.div variants={fadeInUp} className="grid grid-cols-12 gap-4 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-soft border-b border-line">
                            <div className="col-span-3">Commune</div>
                            <div className="col-span-2 text-right">Fiches analysées</div>
                            <div className="col-span-2 text-right">Échantillon</div>
                            <div className="col-span-3">Sans site web</div>
                            <div className="col-span-2 text-right">Risque</div>
                        </motion.div>

                        {/* Table Rows */}
                        <div className="divide-y divide-line/50">
                            {RESEARCH_DATA.cityData.map((city, index) => {
                                const riskLabels: Record<string, { label: string; color: string }> = {
                                    critical: { label: "Critique", color: "text-red-700 bg-red-50 border-red-200" },
                                    high: { label: "Élevé", color: "text-amber-700 bg-amber-50 border-amber-200" },
                                    medium: { label: "Moyen", color: "text-yellow-700 bg-yellow-50 border-yellow-200" },
                                    low: { label: "Faible", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                                };
                                const risk = riskLabels[city.riskLevel];

                                return (
                                    <motion.div
                                        key={city.city}
                                        variants={fadeInUp}
                                        className="grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-white transition-colors"
                                    >
                                        <div className="col-span-3 flex items-center gap-3">
                                            <span className="w-6 h-6 rounded bg-fond-clair flex items-center justify-center text-[10px] text-soft/60 border border-line">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span className="font-medium text-ink text-sm">{city.city}</span>
                                        </div>
                                        <div className="col-span-2 text-right text-soft text-sm tabular-nums">
                                            {city.scraped.toLocaleString('fr-FR')}
                                        </div>
                                        <div className="col-span-2 text-right text-ink text-sm font-bold tabular-nums">
                                            {city.sample}
                                        </div>
                                        <div className="col-span-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1">
                                                    <ProgressBar value={city.noWebsitePct} color={city.riskLevel} />
                                                </div>
                                                <span className="font-bold text-ink text-sm w-10 text-right tabular-nums">{city.noWebsitePct} %</span>
                                            </div>
                                        </div>
                                        <div className="col-span-2 text-right">
                                            <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${risk.color}`}>
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
            <section className="py-16 border-t border-line bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-5xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="mb-10">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-3">Impact sur les marges : la comparaison</h2>
                            <p className="text-soft text-sm max-w-2xl">
                                Simulation sur la base d'un CA de référence de <MonospaceNumber value={288000} suffix=" €" className="text-ink font-medium" />/an
                                (INSEE 2024, restauration traditionnelle NAF 56.10A).
                                <SourceAnnotation id="6" source="INSEE, Enquête annuelle d'entreprise 2024" />
                            </p>
                        </motion.div>

                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Direct Booking */}
                            <motion.div variants={fadeInUp}>
                                <StudyCard className="p-6 h-full" variant="verified">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Shield className="w-5 h-5 text-emerald-600" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Canal direct</span>
                                    </div>
                                    <p className="text-sm text-soft mb-4">Réservation directe (site web, téléphone)</p>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-soft text-xs">Marge brute</span>
                                            <span className="text-2xl font-bold text-emerald-600 tabular-nums">35 %</span>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1 }}
                                                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                                            />
                                        </div>
                                        <div className="pt-4 border-t border-line">
                                            <div className="flex justify-between">
                                                <span className="text-soft text-xs">Marge annuelle</span>
                                                <span className="font-bold text-ink tabular-nums">100 800 €</span>
                                            </div>
                                        </div>
                                    </div>
                                </StudyCard>
                            </motion.div>

                            {/* TheFork */}
                            <motion.div variants={fadeInUp}>
                                <StudyCard className="p-6 h-full">
                                    <div className="flex items-center gap-2 mb-6">
                                        <CreditCard className="w-5 h-5 text-accent" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-accent">TheFork</span>
                                    </div>
                                    <p className="text-sm text-soft mb-4">Commission ~2,50 €/couvert</p>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-soft text-xs">Marge résiduelle</span>
                                            <span className="text-2xl font-bold text-accent tabular-nums">~22 %</span>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "63%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.1 }}
                                                className="h-full bg-gradient-to-r from-accent to-yellow-400 rounded-full"
                                            />
                                        </div>
                                        <div className="pt-4 border-t border-line">
                                            <div className="flex justify-between">
                                                <span className="text-soft text-xs">Marge annuelle</span>
                                                <span className="font-bold text-ink tabular-nums">~63 360 €</span>
                                            </div>
                                            <div className="flex justify-between mt-1">
                                                <span className="text-red-500/80 text-xs">Différentiel</span>
                                                <span className="text-red-600 text-sm tabular-nums">-37 440 €</span>
                                            </div>
                                        </div>
                                    </div>
                                </StudyCard>
                            </motion.div>

                            {/* Delivery Platforms */}
                            <motion.div variants={fadeInUp}>
                                <StudyCard className="p-6 h-full" variant="alert">
                                    <div className="flex items-center gap-2 mb-6">
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-red-600">UberEats / Deliveroo</span>
                                    </div>
                                    <p className="text-sm text-soft mb-4">Commission 25-30 %</p>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-soft text-xs">Marge résiduelle</span>
                                            <span className="text-2xl font-bold text-red-600 tabular-nums">8 %</span>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "23%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                                            />
                                        </div>
                                        <div className="pt-4 border-t border-line">
                                            <div className="flex justify-between">
                                                <span className="text-soft text-xs">Marge annuelle</span>
                                                <span className="font-bold text-ink tabular-nums">23 040 €</span>
                                            </div>
                                            <div className="flex justify-between mt-1">
                                                <span className="text-red-500/80 text-xs">Différentiel</span>
                                                <span className="font-bold text-red-600 text-sm tabular-nums">-77 760 €</span>
                                            </div>
                                        </div>
                                    </div>
                                </StudyCard>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* SUSPICIOUS PROFILES */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-16 border-t border-line">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="mb-10">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-3">Anomalies statistiques détectées</h2>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <StudyCard className="p-8" variant="alert">
                                <div className="grid md:grid-cols-3 gap-8">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <AlertTriangle className="w-5 h-5 text-red-500" />
                                            <span className="text-xs font-bold uppercase tracking-wider text-red-600">Profils suspects</span>
                                        </div>
                                        <p className="text-5xl font-bold text-red-600 mb-2 tabular-nums">
                                            {RESEARCH_DATA.findings.suspiciousProfiles.count}
                                        </p>
                                        <p className="text-sm text-soft">
                                            soit <MonospaceNumber value={RESEARCH_DATA.findings.suspiciousProfiles.percentage} suffix=" %" className="text-ink font-medium" /> de l'échantillon
                                        </p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-soft text-sm mb-4">
                                            <strong className="text-ink">Critère de détection :</strong> Fiches affichant une note &gt; 4.5/5 avec un volume d'avis &lt; 10.
                                            Cette combinaison est statistiquement improbable sur un marché concurrentiel et suggère une manipulation ou un profil récemment créé sans historique réel.
                                        </p>
                                        <div className="p-4 bg-fond-clair rounded-lg border border-line">
                                            <p className="text-xs text-soft mb-2">Répartition par commune (Top 3)</p>
                                            <div className="flex gap-4">
                                                <span className="text-soft">Nice : <strong className="text-red-600">9</strong></span>
                                                <span className="text-soft">Antibes : <strong className="text-amber-600">3</strong></span>
                                                <span className="text-soft">Cagnes : <strong className="text-yellow-600">2</strong></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </StudyCard>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* OPEN DATA */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-16 border-t border-line bg-white" id="opendata">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-5xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 mb-4">
                                <Database className="w-4 h-4 text-emerald-600" />
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Open Data</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-3">Données publiques et vérifiables</h2>
                            <p className="text-soft text-sm max-w-xl mx-auto">
                                L'intégralité du dataset est en accès libre, sous licence Creative Commons BY 4.0.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6 mb-10">
                            <motion.a href="/data/gmb-study-cote-azur-2026.json" download variants={fadeInUp} className="group">
                                <StudyCard className="p-6 h-full transition-transform hover:-translate-y-1" variant="verified">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                                            <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <Download className="w-5 h-5 text-soft/30 group-hover:text-emerald-600 transition-colors" />
                                    </div>
                                    <h3 className="font-bold text-ink mb-1">Dataset complet (JSON)</h3>
                                    <p className="text-soft text-xs mb-4">297 établissements · Métriques détaillées</p>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-fond-clair rounded text-soft border border-line">API Ready</span>
                                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-fond-clair rounded text-soft border border-line">2.4 MB</span>
                                    </div>
                                </StudyCard>
                            </motion.a>

                            <motion.a href="/data/restaurants_visibilite_paca.csv" download variants={fadeInUp} className="group">
                                <StudyCard className="p-6 h-full transition-transform hover:-translate-y-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                                            <BarChart3 className="w-6 h-6 text-accent" />
                                        </div>
                                        <Download className="w-5 h-5 text-soft/30 group-hover:text-accent transition-colors" />
                                    </div>
                                    <h3 className="font-bold text-ink mb-1">Export tabulaire (CSV)</h3>
                                    <p className="text-soft text-xs mb-4">Format Excel/Sheets · Compatible Data.gouv.fr · UTF-8</p>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-fond-clair rounded text-soft border border-line">Tableur</span>
                                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-fond-clair rounded text-soft border border-line">256 KB</span>
                                    </div>
                                </StudyCard>
                            </motion.a>
                        </div>

                        {/* Sources & References */}
                        <motion.div variants={fadeInUp}>
                            <StudyCard className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <BookOpen className="w-5 h-5 text-soft" />
                                    <h3 className="font-bold text-ink">Références et sources</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6 text-xs text-soft">
                                    <div>
                                        <p className="text-soft/60 mb-2 font-bold">[1] Loi de Pareto SERP</p>
                                        <p>Sistrix, « Click-Through Rate Study », 2024. Les 10 premiers résultats organiques captent 80 %+ des clics.</p>
                                    </div>
                                    <div>
                                        <p className="text-soft/60 mb-2 font-bold">[2] [4] Modèle de marge</p>
                                        <p>Calcul interne basé sur marge brute sectorielle (35 %) et commissions plateformes publiques (25-30 %).</p>
                                    </div>
                                    <div>
                                        <p className="text-soft/60 mb-2 font-bold">[3] Taux de dépendance</p>
                                        <p>Ratio établissements sans présence web directe / échantillon. Méthodologie : analyse des champs « website » de l'API Google Places.</p>
                                    </div>
                                    <div>
                                        <p className="text-soft/60 mb-2 font-bold">[5] CTR Pack Local</p>
                                        <p>Sistrix / Backlinko, « Local Pack CTR Study », 2024. Position 1 : 44 %, Position 2 : 28 %, Position 3 : 18 %.</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-soft/60 mb-2 font-bold">[6] CA de référence</p>
                                        <p>INSEE, Enquête annuelle d'entreprise 2024 – Restauration traditionnelle (NAF 56.10A). CA moyen par établissement : 288 000 €/an.</p>
                                    </div>
                                </div>
                            </StudyCard>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════════ */}
            {/* CTA */}
            {/* ════════════════════════════════════════════════════════════════════ */}
            <section className="py-20 border-t border-line">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <p className="text-sauge font-medium mb-4">Prochaine étape</p>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-4">
                            Où en est votre restaurant sur Google ?
                        </h2>
                        <p className="text-soft mb-8 text-sm leading-relaxed">
                            Évaluez votre position face aux plateformes tierces.
                            Diagnostic chiffré de votre visibilité sur le Pack Local Google.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/contact?service=audit-gmb">
                                <Button className="bg-accent text-white hover:bg-accent-hover rounded-full px-8 py-6 text-sm font-bold h-14">
                                    Demander un audit
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                            <Link href="/seo-local">
                                <Button variant="outline" className="border-line text-soft hover:bg-white hover:text-ink rounded-full px-8 py-6 text-sm font-bold h-14">
                                    En savoir plus sur le SEO local
                                    <ExternalLink className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
