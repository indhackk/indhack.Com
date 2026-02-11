"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Loader2,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ExternalLink,
    Copy,
    Check,
    ArrowRight,
    Shield,
    FileText,
    Accessibility,
    Bot,
    RefreshCw,
    Sparkles,
} from "lucide-react";
import Link from "next/link";

interface CriteriaResult {
    id: string;
    name: string;
    category: "technique" | "contenu" | "accessibilite" | "ia";
    status: "success" | "warning" | "error";
    score: number;
    maxScore: number;
    message: string;
    details?: string;
    fix?: string;
}

interface AuditResult {
    url: string;
    timestamp: string;
    score: number;
    maxScore: number;
    categories: {
        technique: { score: number; maxScore: number };
        contenu: { score: number; maxScore: number };
        accessibilite: { score: number; maxScore: number };
        ia: { score: number; maxScore: number };
    };
    criteria: CriteriaResult[];
    pageTitle: string;
    pageDescription: string;
    cached?: boolean;
}

const CATEGORY_INFO = {
    technique: { label: "Technique", icon: Shield, color: "text-blue-500", bg: "bg-blue-500" },
    contenu: { label: "Contenu", icon: FileText, color: "text-emerald-500", bg: "bg-emerald-500" },
    accessibilite: { label: "Accessibilité", icon: Accessibility, color: "text-amber-500", bg: "bg-amber-500" },
    ia: { label: "IA-Ready", icon: Bot, color: "text-violet-500", bg: "bg-violet-500" },
};

function ScoreGauge({ score }: { score: number }) {
    const getColor = () => {
        if (score >= 80) return "text-emerald-500";
        if (score >= 50) return "text-amber-500";
        return "text-red-500";
    };

    const getGradient = () => {
        if (score >= 80) return "from-emerald-500 to-teal-400";
        if (score >= 50) return "from-amber-500 to-orange-400";
        return "from-red-500 to-rose-400";
    };

    const getLabel = () => {
        if (score >= 80) return "Excellent";
        if (score >= 60) return "Bon";
        if (score >= 40) return "À améliorer";
        return "Critique";
    };

    const circumference = 2 * Math.PI * 90;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-48 h-48 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx="96"
                    cy="96"
                    r="90"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-gray-200"
                />
                {/* Progress circle */}
                <motion.circle
                    cx="96"
                    cy="96"
                    r="90"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" className={`${getGradient().split(" ")[0].replace("from-", "text-")}`} stopColor="currentColor" />
                        <stop offset="100%" className={`${getGradient().split(" ")[1].replace("to-", "text-")}`} stopColor="currentColor" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    className={`text-5xl font-bold ${getColor()}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                >
                    {score}
                </motion.span>
                <span className="text-sm text-soft">/100</span>
                <span className={`text-sm font-medium mt-1 ${getColor()}`}>{getLabel()}</span>
            </div>
        </div>
    );
}

function CategoryScore({ category, score, maxScore }: { category: keyof typeof CATEGORY_INFO; score: number; maxScore: number }) {
    const info = CATEGORY_INFO[category];
    const Icon = info.icon;
    const percentage = Math.round((score / maxScore) * 100);

    return (
        <div className="bg-white rounded-xl border border-line p-4">
            <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${info.bg}/10 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${info.color}`} />
                </div>
                <div>
                    <div className="font-bold text-ink">{info.label}</div>
                    <div className="text-sm text-soft">{score}/{maxScore} points</div>
                </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full ${info.bg}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                />
            </div>
        </div>
    );
}

function CriteriaCard({ criteria, index }: { criteria: CriteriaResult; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const categoryInfo = CATEGORY_INFO[criteria.category];

    const statusIcon = {
        success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
        warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
        error: <XCircle className="w-5 h-5 text-red-500" />,
    };

    const statusBg = {
        success: "bg-emerald-50 border-emerald-200",
        warning: "bg-amber-50 border-amber-200",
        error: "bg-red-50 border-red-200",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${statusBg[criteria.status]}`}
            onClick={() => setExpanded(!expanded)}
        >
            <div className="flex items-start gap-4">
                {statusIcon[criteria.status]}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-ink">{criteria.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${categoryInfo.bg}/10 ${categoryInfo.color}`}>
                            {categoryInfo.label}
                        </span>
                    </div>
                    <p className="text-sm text-soft mt-1">{criteria.message}</p>

                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                {criteria.details && (
                                    <p className="text-xs text-soft mt-3 p-2 bg-white/50 rounded-lg font-mono break-all">
                                        {criteria.details}
                                    </p>
                                )}
                                {criteria.fix && (
                                    <div className="mt-3 flex items-start gap-2 text-sm">
                                        <Sparkles className="w-4 h-4 text-sauge flex-shrink-0 mt-0.5" />
                                        <span className="text-ink">{criteria.fix}</span>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="text-right">
                    <span className="font-bold text-ink">{criteria.score}</span>
                    <span className="text-soft">/{criteria.maxScore}</span>
                </div>
            </div>
        </motion.div>
    );
}

export function AuditSEO() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AuditResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("/api/audit-seo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: url.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erreur lors de l'analyse");
            }

            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur inattendue");
        } finally {
            setLoading(false);
        }
    };

    const handleCopyUrl = () => {
        const shareUrl = `${window.location.origin}/outils/audit-seo-gratuit?url=${encodeURIComponent(result?.url || "")}`;
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleNewAudit = () => {
        setResult(null);
        setUrl("");
        setError(null);
    };

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
                                    className="w-full px-6 py-4 text-lg border-2 border-line rounded-xl focus:border-sauge focus:ring-0 transition-colors pr-12"
                                    disabled={loading}
                                />
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft" />
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
                            className="w-full bg-sauge text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-sauge/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Analyse en cours...
                                </>
                            ) : (
                                <>
                                    <Search className="w-5 h-5" />
                                    Analyser mon site
                                </>
                            )}
                        </button>

                        <p className="text-center text-sm text-soft">
                            Gratuit • Sans inscription • 15 critères analysés dont la compatibilité IA
                        </p>
                    </form>

                    {/* Loading animation */}
                    <AnimatePresence>
                        {loading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="mt-8 space-y-3"
                            >
                                {["Connexion au site...", "Analyse du HTML...", "Vérification SEO...", "Analyse des crawlers IA..."].map((text, i) => (
                                    <motion.div
                                        key={text}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 1 }}
                                        className="flex items-center gap-3 text-soft"
                                    >
                                        <div className="w-2 h-2 bg-sauge rounded-full animate-pulse" />
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
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                >
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-xl border border-line p-8">
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <ScoreGauge score={result.score} />
                            <div className="flex-1 text-center lg:text-left">
                                <h2 className="text-2xl font-bold text-ink mb-2">{result.pageTitle}</h2>
                                <a
                                    href={result.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sauge hover:underline flex items-center justify-center lg:justify-start gap-1"
                                >
                                    {result.url}
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                                {result.cached && (
                                    <p className="text-xs text-soft mt-2">Résultat mis en cache (analysé récemment)</p>
                                )}
                                <div className="flex items-center justify-center lg:justify-start gap-3 mt-4">
                                    <button
                                        onClick={handleCopyUrl}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        {copied ? "Copié !" : "Partager"}
                                    </button>
                                    <button
                                        onClick={handleNewAudit}
                                        className="flex items-center gap-2 px-4 py-2 bg-sauge text-white rounded-lg text-sm font-medium hover:bg-sauge/90 transition-colors"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Nouvel audit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Category Scores */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {(Object.keys(result.categories) as Array<keyof typeof result.categories>).map((cat) => (
                            <CategoryScore
                                key={cat}
                                category={cat}
                                score={result.categories[cat].score}
                                maxScore={result.categories[cat].maxScore}
                            />
                        ))}
                    </div>

                    {/* Criteria Details */}
                    <div className="bg-white rounded-2xl shadow-xl border border-line p-6 md:p-8">
                        <h3 className="text-xl font-bold text-ink mb-6">Détail des 15 critères</h3>
                        <div className="space-y-3">
                            {result.criteria.map((c, i) => (
                                <CriteriaCard key={c.id} criteria={c} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    {result.score < 80 && (
                        <div className="bg-gradient-to-br from-sauge to-emerald-600 rounded-2xl p-8 text-center text-white">
                            <h3 className="text-2xl font-bold mb-3">
                                Votre score est de {result.score}/100
                            </h3>
                            <p className="text-white/80 mb-6 max-w-xl mx-auto">
                                Nos experts SEO peuvent améliorer votre score et booster votre visibilité sur Google et les IA.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-white text-sauge px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-colors"
                            >
                                Demander un devis gratuit
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    )}

                    {/* Related Tools */}
                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                        <h3 className="text-lg font-bold text-ink mb-4">Outils complémentaires</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <Link
                                href="/outils/testeur-visibilite-ia"
                                className="p-4 bg-white rounded-xl border border-line hover:border-sauge/30 transition-all group"
                            >
                                <Bot className="w-6 h-6 text-violet-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-sauge transition-colors">Testeur Visibilité IA</div>
                                <p className="text-sm text-soft">Votre site est-il visible par ChatGPT ?</p>
                            </Link>
                            <Link
                                href="/outils/generateur-schema-json-ld"
                                className="p-4 bg-white rounded-xl border border-line hover:border-sauge/30 transition-all group"
                            >
                                <FileText className="w-6 h-6 text-blue-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-sauge transition-colors">Générateur Schema</div>
                                <p className="text-sm text-soft">Créez vos données structurées</p>
                            </Link>
                            <Link
                                href="/outils/generateur-robots-txt"
                                className="p-4 bg-white rounded-xl border border-line hover:border-sauge/30 transition-all group"
                            >
                                <Shield className="w-6 h-6 text-cyan-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-sauge transition-colors">Générateur robots.txt</div>
                                <p className="text-sm text-soft">Configurez vos crawlers IA</p>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
