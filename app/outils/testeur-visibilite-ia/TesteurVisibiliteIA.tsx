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
    visible: { color: "text-emerald-400", bg: "bg-emerald-500", ring: "ring-emerald-500/30", gradient: "from-emerald-500 to-green-500", icon: Eye, label: "Bonne visibilit\u00e9" },
    excellent: { color: "text-violet-400", bg: "bg-violet-500", ring: "ring-violet-500/30", gradient: "from-violet-500 to-purple-600", icon: Sparkles, label: "Excellent \u2014 Pr\u00eat pour le GEO" },
};

const CATEGORY_CONFIG = {
    accessibilite: { label: "Accessibilit\u00e9 IA", icon: Shield, color: "text-cyan-400", bg: "bg-cyan-500", gradient: "from-cyan-500 to-blue-500" },
    semantique: { label: "Richesse S\u00e9mantique", icon: FileText, color: "text-emerald-400", bg: "bg-emerald-500", gradient: "from-emerald-500 to-teal-500" },
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
    { text: "Scan des donn\u00e9es structur\u00e9es...", icon: FileText },
    { text: "V\u00e9rification des signaux E-E-A-T...", icon: Award },
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

function VisibilityGauge({ score, level }: { score: number; level: VisibilityResult["level"] }) {
    const config = LEVEL_CONFIG[level];
    const Icon = config.icon;
    const circumference = 2 * Math.PI * 90;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-64 h-64 mx-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 208 208">
                <circle cx="104" cy="104" r="90" stroke="currentColor" strokeWidth="8" fill="none" className="text-white/10" />
                <motion.circle
                    cx="104" cy="104" r="90"
                    stroke="url(#gaugeGradientDark)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                    <linearGradient id="gaugeGradientDark" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={level === "invisible" ? "#ef4444" : level === "partial" ? "#f59e0b" : level === "visible" ? "#10b981" : "#8b5cf6"} />
                        <stop offset="100%" stopColor={level === "invisible" ? "#dc2626" : level === "partial" ? "#ea580c" : level === "visible" ? "#059669" : "#7c3aed"} />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Icon className={`w-10 h-10 ${config.color} mb-3`} />
                <motion.span
                    className={`text-6xl font-bold text-white`}
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
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white">{config.label}</span>
                        <span className={`text-2xl font-bold ${percentage >= 80 ? "text-emerald-400" : percentage >= 50 ? "text-amber-400" : "text-red-400"}`}>
                            {data.score}<span className="text-white/30 text-base">/{data.maxScore}</span>
                        </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full bg-gradient-to-r ${config.gradient}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                        />
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
        const shareUrl = `${window.location.origin}/outils/testeur-visibilite-ia?score=${result?.score}`;
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <label htmlFor="url" className="block text-sm font-bold text-white/80 mb-3 uppercase tracking-wider">
                                    URL de votre site
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="w-full px-6 py-5 text-lg bg-white/5 border-2 border-white/10 rounded-2xl focus:border-violet-500 focus:ring-0 transition-all text-white placeholder-transparent pr-14"
                                        disabled={loading}
                                        placeholder="https://votre-site.com"
                                    />
                                    {!url && <AnimatedPlaceholder />}
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-violet-400" />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm backdrop-blur-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || !url.trim()}
                                className="w-full bg-white text-ink py-5 px-8 rounded-2xl font-bold text-lg hover:bg-sauge hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-2xl shadow-white/10 hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Analyse en cours...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5" />
                                        Tester ma visibilit\u00e9 IA
                                    </>
                                )}
                            </button>

                            <p className="text-center text-sm text-white/40">
                                Gratuit \u2022 Sans inscription \u2022 8 crawlers IA + 16 signaux GEO analys\u00e9s
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
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                        <div className="p-8 md:p-12">
                            <div className="flex flex-col lg:flex-row items-center gap-10">
                                {/* Score Gauge */}
                                <div className="relative">
                                    <div className={`absolute inset-0 ${LEVEL_CONFIG[result.level].bg} blur-[80px] opacity-30`} />
                                    <VisibilityGauge score={result.score} level={result.level} />
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-center lg:text-left">
                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${LEVEL_CONFIG[result.level].gradient} text-white text-sm font-bold mb-4`}>
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
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white/5 border-t border-white/10 p-5 flex flex-wrap items-center justify-center gap-3">
                            <button
                                onClick={handleCopyUrl}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-white hover:bg-white/20 transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copi\u00e9 !" : "Partager mes r\u00e9sultats"}
                            </button>
                            <button
                                onClick={handleNewTest}
                                className="flex items-center gap-2 px-5 py-2.5 bg-violet-500 text-white rounded-xl text-sm font-medium hover:bg-violet-600 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Nouveau test
                            </button>
                        </div>
                    </div>

                    {/* AI Crawlers Grid */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-white">Crawlers IA</h3>
                                <p className="text-white/50 text-sm mt-1">
                                    {allowedCount}/{totalCrawlers} crawlers peuvent acc\u00e9der \u00e0 votre site
                                </p>
                            </div>
                            {blockedCount > 0 && (
                                <Link
                                    href="/outils/generateur-robots-txt"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded-xl text-violet-300 text-sm font-medium hover:bg-violet-500/30 transition-colors"
                                >
                                    Configurer robots.txt
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
                            <div className="mt-5 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl backdrop-blur-sm">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-amber-200 font-medium">
                                            {blockedCount} crawler(s) bloqu\u00e9(s) dans votre robots.txt
                                        </p>
                                        <p className="text-xs text-amber-200/60 mt-1">
                                            Ces IA ne peuvent pas acc\u00e9der \u00e0 votre contenu. Utilisez notre g\u00e9n\u00e9rateur pour les autoriser.
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

                    {/* Recommendations */}
                    {result.recommendations.length > 0 && (
                        <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/10 rounded-2xl border border-violet-500/20 p-6 md:p-8 backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                Actions prioritaires
                            </h3>
                            <div className="space-y-3">
                                {result.recommendations.map((rec, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-4 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm"
                                    >
                                        <span className="w-8 h-8 rounded-full bg-violet-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                                            {i + 1}
                                        </span>
                                        <div className="flex-1">
                                            <p className="text-white">{rec.text}</p>
                                            {rec.fixUrl && (
                                                <Link
                                                    href={rec.fixUrl}
                                                    className="inline-flex items-center gap-1 text-sm text-violet-400 font-medium hover:text-violet-300 mt-2 transition-colors"
                                                >
                                                    {rec.fixLabel || "Corriger maintenant"}
                                                    <ArrowRight className="w-3 h-3" />
                                                </Link>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="relative overflow-hidden rounded-3xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-fond-sombre" />
                        <div className="absolute top-0 right-0 w-96 h-96 bg-sauge/20 rounded-full blur-[120px]" />
                        <div className="relative p-10 md:p-14 text-center">
                            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 uppercase tracking-tight">
                                Besoin d'une strat\u00e9gie <span className="text-sauge">GEO</span> compl\u00e8te ?
                            </h3>
                            <p className="text-white/50 mb-8 max-w-xl mx-auto text-lg">
                                Le GEO (Generative Engine Optimization) est la prochaine r\u00e9volution du r\u00e9f\u00e9rencement.
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
                                    href="/audit-seo"
                                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-medium"
                                >
                                    En savoir plus sur l'audit SEO
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Related Tools */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                        <h3 className="text-lg font-bold text-white mb-5">Am\u00e9liorez votre score avec nos outils gratuits</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            {[
                                { href: "/outils/generateur-robots-txt", icon: Shield, color: "from-cyan-500 to-blue-500", title: "G\u00e9n\u00e9rateur robots.txt", desc: "Autorisez les crawlers IA" },
                                { href: "/outils/generateur-schema-json-ld", icon: FileText, color: "from-blue-500 to-indigo-500", title: "G\u00e9n\u00e9rateur Schema JSON-LD", desc: "Cr\u00e9ez vos donn\u00e9es structur\u00e9es" },
                                { href: "/outils/audit-seo-gratuit", icon: Search, color: "from-emerald-500 to-teal-500", title: "Audit SEO Gratuit", desc: "Score SEO complet /100" },
                            ].map((tool) => {
                                const Icon = tool.icon;
                                return (
                                    <Link
                                        key={tool.href}
                                        href={tool.href}
                                        className="group p-5 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                                    >
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
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
