"use client";

import { useState } from "react";
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
    Shield,
    FileText,
    Award,
    Layout,
    AlertTriangle,
    Zap,
    Linkedin,
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
    invisible: { color: "text-red-600", bg: "bg-red-500", label: "Invisible pour les IA" },
    partial: { color: "text-amber-600", bg: "bg-amber-500", label: "Partiellement visible" },
    visible: { color: "text-emerald-600", bg: "bg-emerald-500", label: "Bonne visibilité" },
    excellent: { color: "text-sauge", bg: "bg-sauge", label: "Excellent" },
};

const CATEGORY_CONFIG = {
    accessibilite: { label: "Accessibilité IA", icon: Shield },
    semantique: { label: "Richesse Sémantique", icon: FileText },
    eeat: { label: "Signaux E-E-A-T", icon: Award },
    format: { label: "Format IA-Friendly", icon: Layout },
};

function ScoreGauge({ score }: { score: number }) {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    const getColor = () => {
        if (score <= 30) return "#dc2626";
        if (score <= 60) return "#d97706";
        if (score <= 85) return "#059669";
        return "#638576";
    };

    return (
        <div className="relative w-48 h-48">
            <svg className="transform -rotate-90" width={192} height={192} viewBox="0 0 192 192">
                <circle
                    cx="96"
                    cy="96"
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                />
                <motion.circle
                    cx="96"
                    cy="96"
                    r={radius}
                    stroke={getColor()}
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    className="text-5xl font-bold text-ink"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                >
                    {score}
                </motion.span>
                <span className="text-soft text-sm">/100</span>
            </div>
        </div>
    );
}

function CrawlerRow({ crawler }: { crawler: CrawlerStatus }) {
    const statusConfig = {
        allowed: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        blocked: { icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
        not_mentioned: { icon: MinusCircle, color: "text-gray-400", bg: "bg-gray-50" },
    };
    const config = statusConfig[crawler.status];
    const Icon = config.icon;

    return (
        <div className={`flex items-center justify-between p-3 rounded-lg ${config.bg}`}>
            <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${config.color}`} />
                <div>
                    <span className="font-medium text-ink text-sm">{crawler.name}</span>
                    {crawler.critical && (
                        <span className="ml-2 text-[10px] bg-sauge/10 text-sauge px-1.5 py-0.5 rounded font-medium">
                            Critique
                        </span>
                    )}
                </div>
            </div>
            <span className="text-xs text-soft">{crawler.company}</span>
        </div>
    );
}

function CategoryCard({ category, data }: { category: keyof typeof CATEGORY_CONFIG; data: CategoryScore }) {
    const config = CATEGORY_CONFIG[category];
    const Icon = config.icon;
    const percentage = Math.round((data.score / data.maxScore) * 100);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
            >
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-soft" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-ink text-sm">{config.label}</span>
                        <span className={`text-sm font-bold ${percentage >= 70 ? "text-emerald-600" : percentage >= 40 ? "text-amber-600" : "text-red-600"}`}>
                            {data.score}/{data.maxScore}
                        </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full ${percentage >= 70 ? "bg-emerald-500" : percentage >= 40 ? "bg-amber-500" : "bg-red-500"}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        />
                    </div>
                </div>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 space-y-2">
                            {data.checks.map((check, i) => (
                                <div key={i} className={`flex items-start gap-2 p-2 rounded-lg ${
                                    check.status === "success" ? "bg-emerald-50" :
                                    check.status === "warning" ? "bg-amber-50" : "bg-red-50"
                                }`}>
                                    {check.status === "success" ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    ) : check.status === "warning" ? (
                                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                    ) : (
                                        <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-ink">{check.label}</span>
                                            <span className="text-[10px] text-soft">{check.points}/{check.maxPoints}</span>
                                        </div>
                                        <p className="text-[11px] text-soft mt-0.5">{check.detail}</p>
                                        {check.fixUrl && (
                                            <Link href={check.fixUrl} className="inline-flex items-center gap-1 text-[11px] text-sauge font-medium hover:underline mt-1">
                                                {check.fixLabel || "Corriger"}
                                                <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function TesteurVisibiliteIA() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<VisibilityResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copiedLink, setCopiedLink] = useState(false);
    const [copiedResult, setCopiedResult] = useState(false);

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

    const shareOnLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://indhack.com/outils/testeur-visibilite-ia')}`,
            '_blank',
            'width=600,height=600'
        );
    };

    const copyResult = () => {
        if (!result) return;
        const text = `Score visibilité IA : ${result.score}/100
Accessibilité : ${result.categories.accessibilite.score}/${result.categories.accessibilite.maxScore} | Sémantique : ${result.categories.semantique.score}/${result.categories.semantique.maxScore} | E-E-A-T : ${result.categories.eeat.score}/${result.categories.eeat.maxScore} | Format : ${result.categories.format.score}/${result.categories.format.maxScore}
Testez votre site → https://indhack.com/outils/testeur-visibilite-ia`;
        navigator.clipboard.writeText(text);
        setCopiedResult(true);
        setTimeout(() => setCopiedResult(false), 2000);
    };

    const copyLink = () => {
        navigator.clipboard.writeText('https://indhack.com/outils/testeur-visibilite-ia');
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    const handleNewTest = () => {
        setResult(null);
        setUrl("");
        setError(null);
    };

    const blockedCount = result?.crawlers.filter(c => c.status === "blocked").length || 0;

    return (
        <div className="max-w-3xl mx-auto">
            {/* Form */}
            {!result && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full px-5 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl focus:border-sauge focus:ring-2 focus:ring-sauge/20 transition-all text-ink placeholder-gray-400"
                                    disabled={loading}
                                    placeholder="https://votre-site.com"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading || !url.trim()}
                                className="bg-ink text-white px-8 py-4 rounded-xl font-bold hover:bg-sauge disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Analyse...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5" />
                                        Tester
                                    </>
                                )}
                            </button>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-2"
                            >
                                <XCircle className="w-4 h-4 flex-shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        <p className="text-center text-sm text-soft mt-4">
                            Gratuit • Sans inscription • 8 crawlers IA analysés
                        </p>
                    </form>

                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-6 bg-white rounded-xl border border-gray-200 p-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-sauge/10 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-sauge animate-pulse" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-ink mb-2">Analyse en cours...</div>
                                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-sauge rounded-full"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 3, ease: "easeInOut" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}

            {/* Results */}
            {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    {/* Score Card */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <ScoreGauge score={result.score} />
                            <div className="flex-1 text-center md:text-left">
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-3 ${LEVEL_CONFIG[result.level].bg} text-white`}>
                                    {result.levelLabel}
                                </div>
                                <h2 className="text-xl font-bold text-ink mb-2 line-clamp-2">{result.pageTitle}</h2>
                                <a
                                    href={result.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-soft hover:text-sauge flex items-center justify-center md:justify-start gap-1 text-sm"
                                >
                                    {result.url}
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-4">
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs text-soft">{result.wordCount} mots</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs text-soft">{result.responseTime}ms</span>
                                    {result.hasLlmsTxt && (
                                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-xs font-medium">llms.txt</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 pt-6 border-t border-gray-100">
                            <button
                                onClick={shareOnLinkedIn}
                                className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] hover:bg-[#006097] rounded-lg text-sm font-medium text-white transition-colors"
                            >
                                <Linkedin className="w-4 h-4" />
                                LinkedIn
                            </button>
                            <button
                                onClick={copyResult}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-ink transition-colors"
                            >
                                {copiedResult ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copiedResult ? "Copié !" : "Copier le résultat"}
                            </button>
                            <button
                                onClick={copyLink}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-ink transition-colors"
                            >
                                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copiedLink ? "Copié !" : "Copier le lien"}
                            </button>
                            <button
                                onClick={handleNewTest}
                                className="flex items-center gap-2 px-4 py-2 bg-sauge hover:bg-sauge/90 rounded-lg text-sm font-medium text-white transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Nouveau test
                            </button>
                        </div>
                    </div>

                    {/* Recommendations */}
                    {result.recommendations.length > 0 && (
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h3 className="font-bold text-ink mb-4">Actions prioritaires</h3>
                            <div className="space-y-3">
                                {result.recommendations.map((rec, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                                            rec.priority === 1 ? "bg-red-500" : rec.priority === 2 ? "bg-amber-500" : "bg-emerald-500"
                                        }`} />
                                        <div className="flex-1">
                                            <p className="text-sm text-ink">{rec.text}</p>
                                            {rec.fixUrl && (
                                                <Link
                                                    href={rec.fixUrl}
                                                    className="inline-flex items-center gap-1 text-sm text-sauge font-medium hover:underline mt-1"
                                                >
                                                    {rec.fixLabel || "Corriger"}
                                                    <ArrowRight className="w-3 h-3" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Crawlers */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-ink">Crawlers IA</h3>
                            {blockedCount > 0 && (
                                <Link
                                    href="/outils/generateur-robots-txt"
                                    className="text-sm text-sauge font-medium hover:underline flex items-center gap-1"
                                >
                                    Configurer robots.txt
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            )}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2">
                            {result.crawlers.map((crawler) => (
                                <CrawlerRow key={crawler.agent} crawler={crawler} />
                            ))}
                        </div>
                        {blockedCount > 0 && (
                            <div className="mt-4 p-3 bg-red-50 rounded-lg text-sm text-red-600 flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <span>{blockedCount} crawler(s) bloqué(s) — ces IA ne peuvent pas accéder à votre contenu.</span>
                            </div>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {(Object.keys(result.categories) as Array<keyof typeof result.categories>).map((cat) => (
                            <CategoryCard key={cat} category={cat} data={result.categories[cat]} />
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="bg-ink rounded-2xl p-8 text-center">
                        <h3 className="text-xl font-bold text-white mb-2">
                            Besoin d&apos;aide pour améliorer votre score ?
                        </h3>
                        <p className="text-white/60 mb-6 text-sm">
                            Je vous accompagne pour optimiser votre visibilité IA.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white text-ink px-6 py-3 rounded-full font-bold hover:bg-sauge hover:text-white transition-all"
                        >
                            Demander un audit GEO
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
