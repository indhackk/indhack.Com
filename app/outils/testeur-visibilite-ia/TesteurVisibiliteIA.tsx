"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bot,
    Loader2,
    CheckCircle2,
    XCircle,
    MinusCircle,
    ExternalLink,
    Copy,
    Check,
    ArrowRight,
    RefreshCw,
    Sparkles,
    Eye,
    EyeOff,
    Shield,
    FileText,
    Award,
    Layout,
    AlertTriangle,
    Zap,
    Search,
    Linkedin,
    AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface CrawlerStatus {
    name: string;
    agent: string;
    description: string;
    company: string;
    status: "allowed" | "blocked" | "not_mentioned";
    critical: boolean;
}

interface CheckItem {
    label: string;
    status: "success" | "warning" | "error";
    detail: string;
    points: number;
    maxPoints: number;
    fixUrl?: string;
    fixLabel?: string;
}

interface CategoryScore {
    score: number;
    maxScore: number;
    checks: CheckItem[];
}

interface VisibilityResult {
    url: string;
    timestamp: string;
    score: number;
    maxScore: number;
    level: "invisible" | "partial" | "visible" | "excellent";
    levelLabel: string;
    categories: {
        accessibilite: CategoryScore;
        semantique: CategoryScore;
        eeat: CategoryScore;
        format: CategoryScore;
    };
    crawlers: CrawlerStatus[];
    recommendations: { text: string; fixUrl?: string; fixLabel?: string; priority: number }[];
    pageTitle: string;
    metaDescription: string;
    wordCount: number;
    responseTime: number;
    hasLlmsTxt: boolean;
    cached?: boolean;
}

const LEVEL_CONFIG = {
    invisible: { color: "text-red-400", bg: "bg-red-500", ring: "ring-red-500/30", gradient: "from-red-500 to-red-600", icon: EyeOff, label: "Invisible pour les IA" },
    partial: { color: "text-amber-400", bg: "bg-amber-500", ring: "ring-amber-500/30", gradient: "from-amber-500 to-orange-500", icon: Eye, label: "Partiellement visible" },
    visible: { color: "text-emerald-400", bg: "bg-emerald-500", ring: "ring-emerald-500/30", gradient: "from-emerald-500 to-green-500", icon: Eye, label: "Bonne visibilité" },
    excellent: { color: "text-violet-400", bg: "bg-violet-500", ring: "ring-violet-500/30", gradient: "from-violet-500 to-purple-600", icon: Sparkles, label: "Excellent — Prêt pour le GEO" },
};

const CATEGORY_CONFIG = {
    accessibilite: { label: "Accessibilité IA", icon: Shield, color: "text-cyan-400", bg: "bg-cyan-500", gradient: "from-cyan-500 to-blue-500" },
    semantique: { label: "Richesse Sémantique", icon: FileText, color: "text-emerald-400", bg: "bg-emerald-500", gradient: "from-emerald-500 to-teal-500" },
    eeat: { label: "Signaux E-E-A-T", icon: Award, color: "text-amber-400", bg: "bg-amber-500", gradient: "from-amber-500 to-orange-500" },
    format: { label: "Format IA-Friendly", icon: Layout, color: "text-violet-400", bg: "bg-violet-500", gradient: "from-violet-500 to-purple-500" },
};

const PLACEHOLDER_URLS = [
    "https://votre-site.com",
    "https://mon-commerce.fr",
    "https://ma-startup.io",
    "https://mon-entreprise.fr",
];

const LOADING_STEPS = [
    { text: "Analyse du robots.txt...", icon: Shield },
    { text: "Scan des données structurées...", icon: FileText },
    { text: "Vérification des signaux E-E-A-T...", icon: Award },
    { text: "Calcul du score GEO...", icon: Sparkles },
];

function AnimatedPlaceholder() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % PLACEHOLDER_URLS.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.5, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/50"
            >
                {PLACEHOLDER_URLS[index]}
            </motion.span>
        </AnimatePresence>
    );
}

function CircularGauge({ score, size = 240, strokeWidth = 10, color }: { score: number; size?: number; strokeWidth?: number; color: string }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <svg className="transform -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="none"
                className="text-white/10"
            />
            <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />
        </svg>
    );
}

function VisibilityGauge({ score, level }: { score: number; level: VisibilityResult["level"] }) {
    const config = LEVEL_CONFIG[level];
    const Icon = config.icon;

    const getColor = () => {
        if (score <= 30) return "#ef4444";
        if (score <= 60) return "#f59e0b";
        if (score <= 85) return "#10b981";
        return "#8b5cf6";
    };

    return (
        <div className="relative w-64 h-64 mx-auto">
            <CircularGauge score={score} size={256} strokeWidth={12} color={getColor()} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Icon className={`w-10 h-10 ${config.color} mb-3`} />
                <motion.span
                    className="text-6xl font-bold text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                >
                    {score}
                </motion.span>
                <span className="text-white/50 text-sm font-medium mt-1">/100</span>
            </div>
        </div>
    );
}

function MiniGauge({ score, maxScore, color }: { score: number; maxScore: number; color: string }) {
    const percentage = Math.round((score / maxScore) * 100);
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-14 h-14">
            <svg className="transform -rotate-90" width={56} height={56} viewBox="0 0 56 56">
                <circle cx="28" cy="28" r={radius} stroke="currentColor" strokeWidth="4" fill="none" className="text-white/10" />
                <motion.circle
                    cx="28"
                    cy="28"
                    r={radius}
                    stroke={color}
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white">{percentage}%</span>
            </div>
        </div>
    );
}

function CrawlerCard({ crawler, index }: { crawler: CrawlerStatus; index: number }) {
    const statusConfig = {
        allowed: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30", pulse: true },
        blocked: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30", pulse: false },
        not_mentioned: { icon: MinusCircle, color: "text-white/40", bg: "bg-white/5", border: "border-white/10", pulse: false },
    };
    const config = statusConfig[crawler.status];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 rounded-xl ${config.bg} border ${config.border} backdrop-blur-sm`}
        >
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Icon className={`w-5 h-5 ${config.color}`} />
                    {config.pulse && (
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{crawler.name}</span>
                        {crawler.critical && (
                            <span className="text-[9px] bg-violet-500/30 text-violet-300 px-1.5 py-0.5 rounded font-medium border border-violet-500/30">
                                Critique
                            </span>
                        )}
                    </div>
                    <div className="text-xs text-white/50 truncate">{crawler.company}</div>
                </div>
            </div>
        </motion.div>
    );
}

function CheckItemRow({ check, index }: { check: CheckItem; index: number }) {
    const statusConfig = {
        success: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
        warning: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10" },
        error: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
    };
    const config = statusConfig[check.status];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-start gap-3 p-3 rounded-lg ${config.bg} border border-white/5`}
        >
            <Icon className={`w-4 h-4 ${config.color} flex-shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-white">{check.label}</span>
                    <span className="text-xs text-white/40 font-mono">{check.points}/{check.maxPoints}</span>
                </div>
                <p className="text-xs text-white/50 mt-0.5">{check.detail}</p>
                {check.fixUrl && (
                    <Link href={check.fixUrl} className="inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 mt-1.5 font-medium">
                        {check.fixLabel || "Corriger"}
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                )}
            </div>
        </motion.div>
    );
}

function CategoryCard({ category, data, index }: { category: keyof typeof CATEGORY_CONFIG; data: CategoryScore; index: number }) {
    const config = CATEGORY_CONFIG[category];
    const Icon = config.icon;
    const percentage = Math.round((data.score / data.maxScore) * 100);
    const [isOpen, setIsOpen] = useState(false);

    const getGaugeColor = () => {
        if (percentage <= 30) return "#ef4444";
        if (percentage <= 60) return "#f59e0b";
        return "#10b981";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-5 flex items-center gap-4 text-left"
            >
                <MiniGauge score={data.score} maxScore={data.maxScore} color={getGaugeColor()} />
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <Icon className={`w-4 h-4 ${config.color}`} />
                        <span className="font-bold text-white">{config.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold ${percentage >= 80 ? "text-emerald-400" : percentage >= 50 ? "text-amber-400" : "text-red-400"}`}>
                            {data.score}<span className="text-white/30 text-sm">/{data.maxScore} pts</span>
                        </span>
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="text-white/40"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.div>
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
                        <div className="px-5 pb-5 space-y-2">
                            {data.checks.map((check, i) => (
                                <CheckItemRow key={i} check={check} index={i} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function PriorityBadge({ priority }: { priority: number }) {
    if (priority === 1) {
        return (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-lg text-[10px] font-bold text-red-400 uppercase tracking-wide">
                <AlertCircle className="w-3 h-3" />
                Critique
            </span>
        );
    }
    if (priority === 2) {
        return (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded-lg text-[10px] font-bold text-amber-400 uppercase tracking-wide">
                <AlertTriangle className="w-3 h-3" />
                Important
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-[10px] font-bold text-emerald-400 uppercase tracking-wide">
            <CheckCircle2 className="w-3 h-3" />
            Bonus
        </span>
    );
}

function RecommendationCard({ rec, index }: { rec: { text: string; fixUrl?: string; fixLabel?: string; priority: number }; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-5 rounded-2xl backdrop-blur-sm border transition-all ${
                rec.priority === 1
                    ? "bg-red-500/10 border-red-500/20 hover:border-red-500/40"
                    : rec.priority === 2
                    ? "bg-amber-500/10 border-amber-500/20 hover:border-amber-500/40"
                    : "bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40"
            }`}
        >
            <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    rec.priority === 1 ? "bg-red-500" : rec.priority === 2 ? "bg-amber-500" : "bg-emerald-500"
                }`}>
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <PriorityBadge priority={rec.priority} />
                    </div>
                    <p className="text-white font-medium leading-relaxed">{rec.text}</p>
                    {rec.fixUrl && (
                        <Link
                            href={rec.fixUrl}
                            className={`inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                rec.priority === 1
                                    ? "bg-red-500 hover:bg-red-600 text-white"
                                    : rec.priority === 2
                                    ? "bg-amber-500 hover:bg-amber-600 text-white"
                                    : "bg-emerald-500 hover:bg-emerald-600 text-white"
                            }`}
                        >
                            {rec.fixLabel || "Corriger maintenant"}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export function TesteurVisibiliteIA() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const [result, setResult] = useState<VisibilityResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
            }, 800);
            return () => clearInterval(interval);
        } else {
            setLoadingStep(0);
        }
    }, [loading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("/api/testeur-visibilite-ia", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: url.trim() }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Erreur lors de l'analyse");
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur inattendue");
        } finally {
            setLoading(false);
        }
    };

    const handleCopyUrl = () => {
        const shareUrl = `${window.location.origin}/outils/testeur-visibilite-ia`;
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleLinkedInShare = () => {
        const shareText = `Mon site a obtenu ${result?.score}/100 au test de visibilité IA ! Découvrez si votre site est visible par ChatGPT, Perplexity et Google AI.`;
        const shareUrl = `${window.location.origin}/outils/testeur-visibilite-ia`;
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`;
        window.open(linkedInUrl, "_blank", "width=600,height=600");
    };

    const handleNewTest = () => {
        setResult(null);
        setUrl("");
        setError(null);
    };

    const allowedCount = result?.crawlers.filter(c => c.status === "allowed" || c.status === "not_mentioned").length || 0;
    const blockedCount = result?.crawlers.filter(c => c.status === "blocked").length || 0;
    const totalCrawlers = result?.crawlers.length || 0;

    return (
        <div className="max-w-5xl mx-auto">
            {/* Form Section */}
            {!result && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                >
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 md:p-12 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <label htmlFor="url" className="block text-sm font-bold text-white/80 mb-3 uppercase tracking-wider">
                                    URL de votre site ou page
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="w-full px-6 py-5 text-lg bg-white/5 border-2 border-white/20 rounded-2xl focus:border-violet-500 focus:ring-0 transition-all text-white placeholder-transparent pr-14"
                                        disabled={loading}
                                        placeholder="https://votre-site.com"
                                    />
                                    {!url && <AnimatedPlaceholder />}
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <p className="text-white/40 text-sm mt-2">
                                    Analysez un domaine (ex: indhack.com) ou une page spécifique (ex: indhack.com/blog/article)
                                </p>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm backdrop-blur-sm flex items-center gap-3"
                                >
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || !url.trim()}
                                className="w-full bg-gradient-to-r from-white to-white/90 text-ink py-5 px-8 rounded-2xl font-bold text-lg hover:from-sauge hover:to-emerald-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-2xl shadow-white/10 hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Analyse en cours...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5" />
                                        Tester ma visibilité IA
                                    </>
                                )}
                            </button>

                            <p className="text-center text-sm text-white/40">
                                Gratuit • Sans inscription • 8 crawlers IA + 16 signaux GEO analysés
                            </p>
                        </form>

                        {/* Loading Animation */}
                        <AnimatePresence>
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-10 pt-8 border-t border-white/10"
                                >
                                    <div className="space-y-4">
                                        {LOADING_STEPS.map((step, i) => {
                                            const Icon = step.icon;
                                            const isActive = i === loadingStep;
                                            const isComplete = i < loadingStep;

                                            return (
                                                <motion.div
                                                    key={step.text}
                                                    initial={{ opacity: 0.3 }}
                                                    animate={{ opacity: isActive || isComplete ? 1 : 0.3 }}
                                                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                                                        isActive ? "bg-violet-500/20 border border-violet-500/30" :
                                                        isComplete ? "bg-emerald-500/10 border border-emerald-500/20" :
                                                        "bg-white/5 border border-white/5"
                                                    }`}
                                                >
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                                        isComplete ? "bg-emerald-500" : isActive ? "bg-violet-500" : "bg-white/10"
                                                    }`}>
                                                        {isComplete ? (
                                                            <CheckCircle2 className="w-5 h-5 text-white" />
                                                        ) : isActive ? (
                                                            <Loader2 className="w-5 h-5 text-white animate-spin" />
                                                        ) : (
                                                            <Icon className="w-5 h-5 text-white/50" />
                                                        )}
                                                    </div>
                                                    <span className={`font-medium ${isActive ? "text-white" : isComplete ? "text-emerald-300" : "text-white/50"}`}>
                                                        {step.text}
                                                    </span>
                                                    {isComplete && (
                                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 ml-auto" />
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}

            {/* Results Section */}
            {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                    {/* Score Header */}
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
                        <div className="p-8 md:p-12">
                            <div className="flex flex-col lg:flex-row items-center gap-10">
                                {/* Score Gauge */}
                                <div className="relative">
                                    <div className={`absolute inset-0 ${LEVEL_CONFIG[result.level].bg} blur-[100px] opacity-30`} />
                                    <VisibilityGauge score={result.score} level={result.level} />
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-center lg:text-left">
                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${LEVEL_CONFIG[result.level].gradient} text-white text-sm font-bold mb-4 shadow-lg`}>
                                        {(() => {
                                            const LevelIcon = LEVEL_CONFIG[result.level].icon;
                                            return <LevelIcon className="w-4 h-4" />;
                                        })()}
                                        {result.levelLabel}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 line-clamp-2">{result.pageTitle}</h2>
                                    <a
                                        href={result.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/60 hover:text-white flex items-center justify-center lg:justify-start gap-1 text-sm transition-colors"
                                    >
                                        {result.url}
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-5">
                                        <span className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white/70 font-medium">
                                            {result.wordCount} mots
                                        </span>
                                        <span className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white/70 font-medium">
                                            {result.responseTime}ms
                                        </span>
                                        {result.hasLlmsTxt && (
                                            <span className="px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs text-emerald-300 font-medium flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" /> llms.txt
                                            </span>
                                        )}
                                        {result.cached && (
                                            <span className="px-3 py-1.5 bg-violet-500/20 border border-violet-500/30 rounded-full text-xs text-violet-300 font-medium">
                                                Résultat en cache
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white/5 border-t border-white/10 p-5 flex flex-wrap items-center justify-center gap-3">
                            <button
                                onClick={handleLinkedInShare}
                                className="flex items-center gap-2 px-5 py-2.5 bg-[#0077B5] hover:bg-[#006097] rounded-xl text-sm font-bold text-white transition-colors"
                            >
                                <Linkedin className="w-4 h-4" />
                                Partager sur LinkedIn
                            </button>
                            <button
                                onClick={handleCopyUrl}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-white hover:bg-white/20 transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copié !" : "Copier le lien"}
                            </button>
                            <button
                                onClick={handleNewTest}
                                className="flex items-center gap-2 px-5 py-2.5 bg-violet-500 text-white rounded-xl text-sm font-bold hover:bg-violet-600 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Nouveau test
                            </button>
                        </div>
                    </div>

                    {/* Priority Recommendations */}
                    {result.recommendations.length > 0 && (
                        <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 p-6 md:p-8 backdrop-blur-xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Vos actions prioritaires</h3>
                                    <p className="text-white/50 text-sm">Corrigez ces points pour améliorer votre score</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {result.recommendations.map((rec, i) => (
                                    <RecommendationCard key={i} rec={rec} index={i} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* AI Crawlers Grid */}
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-white">Crawlers IA</h3>
                                <p className="text-white/50 text-sm mt-1">
                                    {allowedCount}/{totalCrawlers} crawlers peuvent accéder à votre site
                                </p>
                            </div>
                            {blockedCount > 0 && (
                                <Link
                                    href="/outils/generateur-robots-txt"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-white text-sm font-bold transition-colors shadow-lg"
                                >
                                    Débloquer les crawlers
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            )}
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {result.crawlers.map((crawler, i) => (
                                <CrawlerCard key={crawler.agent} crawler={crawler} index={i} />
                            ))}
                        </div>
                        {blockedCount > 0 && (
                            <div className="mt-5 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-red-200 font-medium">
                                            {blockedCount} crawler(s) bloqué(s) dans votre robots.txt
                                        </p>
                                        <p className="text-xs text-red-200/60 mt-1">
                                            Ces IA ne peuvent pas accéder à votre contenu et ne vous citeront jamais.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Category Scores */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {(Object.keys(result.categories) as Array<keyof typeof result.categories>).map((cat, i) => (
                            <CategoryCard key={cat} category={cat} data={result.categories[cat]} index={i} />
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="relative overflow-hidden rounded-3xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-fond-sombre" />
                        <div className="absolute top-0 right-0 w-96 h-96 bg-sauge/20 rounded-full blur-[120px]" />
                        <div className="relative p-10 md:p-14 text-center">
                            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 uppercase tracking-tight">
                                Besoin d&apos;une stratégie <span className="text-sauge">GEO</span> complète ?
                            </h3>
                            <p className="text-white/50 mb-8 max-w-xl mx-auto text-lg">
                                Le GEO (Generative Engine Optimization) est la prochaine révolution du référencement.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 bg-white text-ink px-8 py-4 rounded-full font-bold hover:bg-sauge hover:text-white transition-all shadow-2xl shadow-white/10 hover:-translate-y-0.5"
                                >
                                    Demander un audit GEO gratuit
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="/blog/geo-comment-apparaitre-chatgpt-2026"
                                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-medium"
                                >
                                    Comprendre le GEO
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Related Tools */}
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6 md:p-8">
                        <h3 className="text-lg font-bold text-white mb-5">Améliorez votre score avec nos outils gratuits</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            {[
                                { href: "/outils/generateur-robots-txt", icon: Shield, color: "from-cyan-500 to-blue-500", title: "Générateur robots.txt", desc: "Autorisez les crawlers IA" },
                                { href: "/outils/generateur-schema-json-ld", icon: FileText, color: "from-blue-500 to-indigo-500", title: "Générateur Schema JSON-LD", desc: "Créez vos données structurées" },
                                { href: "/outils/audit-seo-gratuit", icon: Search, color: "from-emerald-500 to-teal-500", title: "Audit SEO Gratuit", desc: "Score SEO complet /100" },
                            ].map((tool) => {
                                const Icon = tool.icon;
                                return (
                                    <Link
                                        key={tool.href}
                                        href={tool.href}
                                        className="group p-5 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all"
                                    >
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="font-bold text-white group-hover:text-violet-300 transition-colors">{tool.title}</div>
                                        <p className="text-sm text-white/50 mt-1">{tool.desc}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
