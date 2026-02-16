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
    Sparkles,
    Eye,
    EyeOff,
    Shield,
    FileText,
    Award,
    Layout,
    AlertTriangle,
    Zap,
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
    invisible: { color: "text-red-500", bg: "bg-red-500", bgLight: "bg-red-50", border: "border-red-200", gradient: "from-red-500 to-red-600", icon: EyeOff },
    partial: { color: "text-amber-500", bg: "bg-amber-500", bgLight: "bg-amber-50", border: "border-amber-200", gradient: "from-amber-500 to-orange-500", icon: Eye },
    visible: { color: "text-emerald-500", bg: "bg-emerald-500", bgLight: "bg-emerald-50", border: "border-emerald-200", gradient: "from-emerald-500 to-green-500", icon: Eye },
    excellent: { color: "text-violet-500", bg: "bg-violet-500", bgLight: "bg-violet-50", border: "border-violet-200", gradient: "from-violet-500 to-purple-600", icon: Sparkles },
};

const CATEGORY_CONFIG = {
    accessibilite: { label: "Accessibilité IA", icon: Shield, color: "text-blue-500", bg: "bg-blue-500", bgLight: "bg-blue-50" },
    semantique: { label: "Richesse Sémantique", icon: FileText, color: "text-emerald-500", bg: "bg-emerald-500", bgLight: "bg-emerald-50" },
    eeat: { label: "Signaux E-E-A-T", icon: Award, color: "text-amber-500", bg: "bg-amber-500", bgLight: "bg-amber-50" },
    format: { label: "Format IA-Friendly", icon: Layout, color: "text-violet-500", bg: "bg-violet-500", bgLight: "bg-violet-50" },
};

function VisibilityGauge({ score, level, levelLabel }: { score: number; level: VisibilityResult["level"]; levelLabel: string }) {
    const config = LEVEL_CONFIG[level];
    const Icon = config.icon;
    const circumference = 2 * Math.PI * 90;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-56 h-56 mx-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 208 208">
                <circle cx="104" cy="104" r="90" stroke="currentColor" strokeWidth="12" fill="none" className="text-gray-100" />
                <motion.circle
                    cx="104" cy="104" r="90"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" className={`${config.color}`} stopColor="currentColor" />
                        <stop offset="100%" className={`${config.color}`} stopColor="currentColor" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Icon className={`w-8 h-8 ${config.color} mb-2`} />
                <motion.span
                    className={`text-5xl font-bold ${config.color}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                >
                    {score}
                </motion.span>
                <span className="text-sm text-soft font-medium">/100</span>
            </div>
        </div>
    );
}

function CrawlerCard({ crawler, index }: { crawler: CrawlerStatus; index: number }) {
    const statusConfig = {
        allowed: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200", label: "Autorisé" },
        blocked: { icon: XCircle, color: "text-red-500", bg: "bg-red-50", border: "border-red-200", label: "Bloqué" },
        not_mentioned: { icon: MinusCircle, color: "text-gray-400", bg: "bg-gray-50", border: "border-gray-200", label: "Non spécifié" },
    };
    const config = statusConfig[crawler.status];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`p-3 rounded-xl border ${config.bg} ${config.border}`}
        >
            <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${config.color} flex-shrink-0`} />
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-ink text-sm">{crawler.name}</span>
                        {crawler.critical && (
                            <span className="text-[10px] bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded font-medium">Critique</span>
                        )}
                    </div>
                    <div className="text-xs text-soft truncate">{crawler.company}</div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${crawler.status === "allowed" ? "bg-emerald-100 text-emerald-700" : crawler.status === "blocked" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}>
                    {config.label}
                </span>
            </div>
        </motion.div>
    );
}

function CheckItemRow({ check, index }: { check: CheckItem; index: number }) {
    const statusConfig = {
        success: { icon: CheckCircle2, color: "text-emerald-500" },
        warning: { icon: AlertTriangle, color: "text-amber-500" },
        error: { icon: XCircle, color: "text-red-500" },
    };
    const config = statusConfig[check.status];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-3 py-2"
        >
            <Icon className={`w-4 h-4 ${config.color} flex-shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-ink">{check.label}</span>
                    <span className="text-xs text-soft">{check.points}/{check.maxPoints} pts</span>
                </div>
                <p className="text-xs text-soft mt-0.5">{check.detail}</p>
                {check.fixUrl && (
                    <Link href={check.fixUrl} className="inline-flex items-center gap-1 text-xs text-violet-600 hover:underline mt-1">
                        {check.fixLabel || "Corriger"}
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                )}
            </div>
        </motion.div>
    );
}

function CategoryCard({ category, data }: { category: keyof typeof CATEGORY_CONFIG; data: CategoryScore }) {
    const config = CATEGORY_CONFIG[category];
    const Icon = config.icon;
    const percentage = Math.round((data.score / data.maxScore) * 100);

    return (
        <div className={`rounded-2xl border border-line bg-white p-5 hover:shadow-lg transition-shadow`}>
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${config.bgLight} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1">
                    <div className="font-bold text-ink">{config.label}</div>
                    <div className="text-sm text-soft">{data.score}/{data.maxScore} points</div>
                </div>
                <div className={`text-2xl font-bold ${percentage >= 80 ? "text-emerald-500" : percentage >= 50 ? "text-amber-500" : "text-red-500"}`}>
                    {percentage}%
                </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                <motion.div
                    className={`h-full ${config.bg}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                />
            </div>
            <div className="divide-y divide-gray-100">
                {data.checks.map((check, i) => (
                    <CheckItemRow key={i} check={check} index={i} />
                ))}
            </div>
        </div>
    );
}

export function TesteurVisibiliteIA() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<VisibilityResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

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
            {/* Form */}
            {!result && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl border border-line p-8 md:p-12"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="url" className="block text-sm font-bold text-ink mb-2">
                                URL de votre site
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://votresite.fr"
                                    className="w-full px-6 py-4 text-lg border-2 border-line rounded-xl focus:border-violet-500 focus:ring-0 transition-colors pr-12"
                                    disabled={loading}
                                />
                                <Bot className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft" />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !url.trim()}
                            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg shadow-violet-500/25"
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

                        <p className="text-center text-sm text-soft">
                            Gratuit • Sans inscription • 8 crawlers IA + 16 signaux GEO analysés
                        </p>
                    </form>

                    <AnimatePresence>
                        {loading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="mt-8 space-y-3"
                            >
                                {["Connexion au site...", "Analyse du robots.txt et llms.txt...", "Vérification des 8 crawlers IA...", "Analyse sémantique et E-E-A-T...", "Calcul du score GEO..."].map((text, i) => (
                                    <motion.div
                                        key={text}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.6 }}
                                        className="flex items-center gap-3 text-soft"
                                    >
                                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                                        {text}
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Results */}
            {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                    {/* Score Header */}
                    <div className={`rounded-3xl overflow-hidden shadow-2xl border ${LEVEL_CONFIG[result.level].border}`}>
                        <div className={`bg-gradient-to-br ${LEVEL_CONFIG[result.level].gradient} p-8 text-white`}>
                            <div className="flex flex-col lg:flex-row items-center gap-8">
                                <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                                    <VisibilityGauge score={result.score} level={result.level} levelLabel={result.levelLabel} />
                                </div>
                                <div className="flex-1 text-center lg:text-left">
                                    {(() => {
                                        const LevelIcon = LEVEL_CONFIG[result.level].icon;
                                        return (
                                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium mb-3">
                                                {LevelIcon && <LevelIcon className="w-4 h-4" />}
                                                {result.levelLabel}
                                            </div>
                                        );
                                    })()}
                                    <h2 className="text-2xl font-bold mb-2 line-clamp-1">{result.pageTitle}</h2>
                                    <a
                                        href={result.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/80 hover:text-white flex items-center justify-center lg:justify-start gap-1 text-sm"
                                    >
                                        {result.url}
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-4 text-sm text-white/70">
                                        <span>{result.wordCount} mots</span>
                                        <span>•</span>
                                        <span>{result.responseTime}ms</span>
                                        {result.hasLlmsTxt && (
                                            <>
                                                <span>•</span>
                                                <span className="text-white flex items-center gap-1">
                                                    <CheckCircle2 className="w-3 h-3" /> llms.txt
                                                </span>
                                            </>
                                        )}
                                        {result.cached && (
                                            <>
                                                <span>•</span>
                                                <span>Cache</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 flex items-center justify-center gap-3">
                            <button
                                onClick={handleCopyUrl}
                                className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copié !" : "Partager mes résultats"}
                            </button>
                            <button
                                onClick={handleNewTest}
                                className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Nouveau test
                            </button>
                        </div>
                    </div>

                    {/* AI Crawlers */}
                    <div className="bg-white rounded-2xl shadow-xl border border-line p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-ink">Crawlers IA ({allowedCount}/{totalCrawlers} accessibles)</h3>
                            {blockedCount > 0 && (
                                <Link
                                    href="/outils/generateur-robots-txt"
                                    className="text-sm text-violet-600 hover:underline flex items-center gap-1"
                                >
                                    Configurer robots.txt
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            )}
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {result.crawlers.map((crawler, i) => (
                                <CrawlerCard key={crawler.agent} crawler={crawler} index={i} />
                            ))}
                        </div>
                        {blockedCount > 0 && (
                            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-amber-800 font-medium">
                                            {blockedCount} crawler(s) bloqué(s) dans votre robots.txt
                                        </p>
                                        <p className="text-xs text-amber-700 mt-1">
                                            Ces IA ne peuvent pas accéder à votre contenu. Utilisez notre générateur pour les autoriser.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Category Scores */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {(Object.keys(result.categories) as Array<keyof typeof result.categories>).map((cat) => (
                            <CategoryCard key={cat} category={cat} data={result.categories[cat]} />
                        ))}
                    </div>

                    {/* Recommendations */}
                    {result.recommendations.length > 0 && (
                        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-violet-200 p-6 md:p-8">
                            <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-violet-500" />
                                Actions prioritaires pour améliorer votre score
                            </h3>
                            <div className="space-y-3">
                                {result.recommendations.map((rec, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-4 bg-white p-4 rounded-xl border border-violet-100"
                                    >
                                        <span className="w-7 h-7 rounded-full bg-violet-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                                            {i + 1}
                                        </span>
                                        <div className="flex-1">
                                            <p className="text-ink">{rec.text}</p>
                                            {rec.fixUrl && (
                                                <Link
                                                    href={rec.fixUrl}
                                                    className="inline-flex items-center gap-1 text-sm text-violet-600 font-medium hover:underline mt-2"
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
                    <div className="bg-gradient-to-br from-ink to-fond-sombre rounded-2xl p-8 text-center text-white">
                        <h3 className="text-2xl font-bold mb-3">
                            {result.score >= 70 ? "Optimisez encore votre visibilité GEO" : "Passez à l'action avec un expert"}
                        </h3>
                        <p className="text-white/70 mb-6 max-w-xl mx-auto">
                            Le GEO (Generative Engine Optimization) est la prochaine révolution du référencement.
                            Je vous accompagne pour apparaître dans les réponses de ChatGPT, Perplexity et Claude.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-white text-ink px-8 py-4 rounded-full font-bold hover:bg-sauge hover:text-white transition-colors"
                            >
                                Demander un audit GEO gratuit
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/audit-seo"
                                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                            >
                                En savoir plus sur l'audit SEO
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Related Tools */}
                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                        <h3 className="text-lg font-bold text-ink mb-4">Améliorez votre score avec nos outils gratuits</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <Link
                                href="/outils/generateur-robots-txt"
                                className="p-4 bg-white rounded-xl border border-line hover:border-violet-300 hover:shadow-lg transition-all group"
                            >
                                <Shield className="w-6 h-6 text-cyan-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-violet-600 transition-colors">Générateur robots.txt</div>
                                <p className="text-sm text-soft">Autorisez les crawlers IA en 1 clic</p>
                            </Link>
                            <Link
                                href="/outils/generateur-schema-json-ld"
                                className="p-4 bg-white rounded-xl border border-line hover:border-violet-300 hover:shadow-lg transition-all group"
                            >
                                <FileText className="w-6 h-6 text-blue-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-violet-600 transition-colors">Générateur Schema JSON-LD</div>
                                <p className="text-sm text-soft">Créez vos données structurées</p>
                            </Link>
                            <Link
                                href="/outils/audit-seo-gratuit"
                                className="p-4 bg-white rounded-xl border border-line hover:border-violet-300 hover:shadow-lg transition-all group"
                            >
                                <Award className="w-6 h-6 text-emerald-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-violet-600 transition-colors">Audit SEO Gratuit</div>
                                <p className="text-sm text-soft">Score SEO complet /100</p>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
