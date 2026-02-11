"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bot,
    Loader2,
    CheckCircle2,
    XCircle,
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
} from "lucide-react";
import Link from "next/link";

interface CrawlerStatus {
    name: string;
    agent: string;
    description: string;
    company: string;
    allowed: boolean;
}

interface CategoryScore {
    score: number;
    maxScore: number;
    details: string[];
}

interface VisibilityResult {
    url: string;
    timestamp: string;
    score: number;
    maxScore: number;
    level: "invisible" | "partial" | "visible" | "optimized";
    levelLabel: string;
    categories: {
        accessibilite: CategoryScore;
        semantique: CategoryScore;
        eeat: CategoryScore;
        format: CategoryScore;
    };
    crawlers: CrawlerStatus[];
    recommendations: string[];
    pageTitle: string;
    cached?: boolean;
}

const LEVEL_CONFIG = {
    invisible: { color: "text-red-500", bg: "bg-red-500", bgLight: "bg-red-50", border: "border-red-200", icon: EyeOff },
    partial: { color: "text-amber-500", bg: "bg-amber-500", bgLight: "bg-amber-50", border: "border-amber-200", icon: Eye },
    visible: { color: "text-emerald-500", bg: "bg-emerald-500", bgLight: "bg-emerald-50", border: "border-emerald-200", icon: Eye },
    optimized: { color: "text-violet-500", bg: "bg-violet-500", bgLight: "bg-violet-50", border: "border-violet-200", icon: Sparkles },
};

const CATEGORY_CONFIG = {
    accessibilite: { label: "Accessibilité IA", icon: Shield, color: "text-blue-500", bg: "bg-blue-500" },
    semantique: { label: "Richesse Sémantique", icon: FileText, color: "text-emerald-500", bg: "bg-emerald-500" },
    eeat: { label: "Signaux E-E-A-T", icon: Award, color: "text-amber-500", bg: "bg-amber-500" },
    format: { label: "Format IA-Friendly", icon: Layout, color: "text-violet-500", bg: "bg-violet-500" },
};

function VisibilityGauge({ score, level, levelLabel }: { score: number; level: VisibilityResult["level"]; levelLabel: string }) {
    const config = LEVEL_CONFIG[level];
    const Icon = config.icon;
    const circumference = 2 * Math.PI * 90;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-52 h-52 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
                <circle cx="104" cy="104" r="90" stroke="currentColor" strokeWidth="14" fill="none" className="text-gray-200" />
                <motion.circle
                    cx="104" cy="104" r="90"
                    stroke="currentColor"
                    strokeWidth="14"
                    fill="none"
                    strokeLinecap="round"
                    className={config.color}
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Icon className={`w-8 h-8 ${config.color} mb-1`} />
                <motion.span
                    className={`text-5xl font-bold ${config.color}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                >
                    {score}
                </motion.span>
                <span className="text-sm text-soft">/100</span>
                <span className={`text-sm font-bold mt-1 ${config.color}`}>{levelLabel}</span>
            </div>
        </div>
    );
}

function CrawlerCard({ crawler, index }: { crawler: CrawlerStatus; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`p-3 rounded-xl border ${crawler.allowed
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-red-50 border-red-200"
                }`}
        >
            <div className="flex items-center gap-3">
                {crawler.allowed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                ) : (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                    <div className="font-bold text-ink text-sm">{crawler.name}</div>
                    <div className="text-xs text-soft truncate">{crawler.description}</div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${crawler.allowed ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}>
                    {crawler.allowed ? "Autorisé" : "Bloqué"}
                </span>
            </div>
        </motion.div>
    );
}

function CategoryCard({ category, data }: { category: keyof typeof CATEGORY_CONFIG; data: CategoryScore }) {
    const config = CATEGORY_CONFIG[category];
    const Icon = config.icon;
    const percentage = Math.round((data.score / data.maxScore) * 100);

    return (
        <div className="bg-white rounded-xl border border-line p-5">
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg ${config.bg}/10 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1">
                    <div className="font-bold text-ink">{config.label}</div>
                    <div className="text-sm text-soft">{data.score}/{data.maxScore} points</div>
                </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                <motion.div
                    className={`h-full ${config.bg}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                />
            </div>
            <ul className="space-y-1">
                {data.details.map((detail, i) => (
                    <li key={i} className="text-xs text-soft flex items-start gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${config.bg} mt-1.5 flex-shrink-0`} />
                        {detail}
                    </li>
                ))}
            </ul>
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
        const shareUrl = `${window.location.origin}/outils/testeur-visibilite-ia?url=${encodeURIComponent(result?.url || "")}`;
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleNewTest = () => {
        setResult(null);
        setUrl("");
        setError(null);
    };

    const allowedCount = result?.crawlers.filter(c => c.allowed).length || 0;
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
                            className="w-full bg-violet-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Analyse en cours...
                                </>
                            ) : (
                                <>
                                    <Bot className="w-5 h-5" />
                                    Tester ma visibilité IA
                                </>
                            )}
                        </button>

                        <p className="text-center text-sm text-soft">
                            Gratuit • Sans inscription • Analyse 8 crawlers IA + 4 catégories de signaux GEO
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
                                {["Connexion au site...", "Analyse du robots.txt...", "Vérification des crawlers IA...", "Analyse sémantique..."].map((text, i) => (
                                    <motion.div
                                        key={text}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.8 }}
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
                    {/* Header */}
                    <div className={`rounded-2xl shadow-xl border p-8 ${LEVEL_CONFIG[result.level].bgLight} ${LEVEL_CONFIG[result.level].border}`}>
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <VisibilityGauge score={result.score} level={result.level} levelLabel={result.levelLabel} />
                            <div className="flex-1 text-center lg:text-left">
                                <h2 className="text-2xl font-bold text-ink mb-2">{result.pageTitle}</h2>
                                <a
                                    href={result.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-violet-600 hover:underline flex items-center justify-center lg:justify-start gap-1"
                                >
                                    {result.url}
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                                {result.cached && (
                                    <p className="text-xs text-soft mt-2">Résultat mis en cache</p>
                                )}
                                <div className="flex items-center justify-center lg:justify-start gap-3 mt-4">
                                    <button
                                        onClick={handleCopyUrl}
                                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors border border-line"
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        {copied ? "Copié !" : "Partager"}
                                    </button>
                                    <button
                                        onClick={handleNewTest}
                                        className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Nouveau test
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Crawlers */}
                    <div className="bg-white rounded-2xl shadow-xl border border-line p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-ink">Crawlers IA</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${allowedCount >= 6 ? "bg-emerald-100 text-emerald-700" :
                                    allowedCount >= 4 ? "bg-amber-100 text-amber-700" :
                                        "bg-red-100 text-red-700"
                                }`}>
                                {allowedCount}/{totalCrawlers} autorisés
                            </span>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {result.crawlers.map((crawler, i) => (
                                <CrawlerCard key={crawler.agent} crawler={crawler} index={i} />
                            ))}
                        </div>
                        {allowedCount < totalCrawlers && (
                            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-amber-800 font-medium">
                                            {totalCrawlers - allowedCount} crawler(s) bloqué(s)
                                        </p>
                                        <p className="text-xs text-amber-700 mt-1">
                                            Configurez votre robots.txt pour autoriser ces crawlers
                                        </p>
                                        <Link
                                            href="/outils/generateur-robots-txt"
                                            className="inline-flex items-center gap-1 text-xs text-amber-700 font-medium hover:underline mt-2"
                                        >
                                            Utiliser le générateur robots.txt
                                            <ArrowRight className="w-3 h-3" />
                                        </Link>
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
                                Recommandations prioritaires
                            </h3>
                            <div className="space-y-3">
                                {result.recommendations.map((rec, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-3 bg-white p-4 rounded-xl border border-violet-100"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-violet-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                                            {i + 1}
                                        </span>
                                        <span className="text-ink">{rec}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    {result.score < 70 && (
                        <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl p-8 text-center text-white">
                            <h3 className="text-2xl font-bold mb-3">
                                Les IA ne vous trouvent pas encore
                            </h3>
                            <p className="text-white/80 mb-6 max-w-xl mx-auto">
                                Nos experts en GEO (Generative Engine Optimization) peuvent optimiser votre visibilité
                                sur ChatGPT, Perplexity et les autres moteurs IA.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-white text-violet-600 px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-colors"
                            >
                                Demander un audit GEO complet
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    )}

                    {/* Related Tools */}
                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                        <h3 className="text-lg font-bold text-ink mb-4">Outils complémentaires</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <Link
                                href="/outils/generateur-robots-txt"
                                className="p-4 bg-white rounded-xl border border-line hover:border-violet-300 transition-all group"
                            >
                                <Shield className="w-6 h-6 text-cyan-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-violet-600 transition-colors">Générateur robots.txt</div>
                                <p className="text-sm text-soft">Configurez vos crawlers IA</p>
                            </Link>
                            <Link
                                href="/outils/generateur-schema-json-ld"
                                className="p-4 bg-white rounded-xl border border-line hover:border-violet-300 transition-all group"
                            >
                                <FileText className="w-6 h-6 text-blue-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-violet-600 transition-colors">Générateur Schema</div>
                                <p className="text-sm text-soft">Créez vos données structurées</p>
                            </Link>
                            <Link
                                href="/outils/audit-seo-gratuit"
                                className="p-4 bg-white rounded-xl border border-line hover:border-violet-300 transition-all group"
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
