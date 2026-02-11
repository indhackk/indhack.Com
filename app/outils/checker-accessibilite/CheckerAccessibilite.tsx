"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Accessibility,
    Loader2,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ExternalLink,
    Copy,
    Check,
    ArrowRight,
    RefreshCw,
    Image,
    List,
    Navigation,
    FormInput,
    Code,
    Award,
} from "lucide-react";
import Link from "next/link";

interface CriteriaResult {
    id: string;
    name: string;
    category: "images" | "structure" | "navigation" | "formulaires" | "semantique";
    status: "success" | "warning" | "error";
    score: number;
    maxScore: number;
    message: string;
    details?: string;
    fix?: string;
    wcagLevel: "A" | "AA" | "AAA";
    rgaaRef?: string;
}

interface AccessibilityResult {
    url: string;
    timestamp: string;
    score: number;
    maxScore: number;
    conformityLevel: "Non conforme" | "Partiellement conforme" | "Conforme";
    conformityPercentage: number;
    categories: {
        images: { score: number; maxScore: number; errors: number };
        structure: { score: number; maxScore: number; errors: number };
        navigation: { score: number; maxScore: number; errors: number };
        formulaires: { score: number; maxScore: number; errors: number };
        semantique: { score: number; maxScore: number; errors: number };
    };
    criteria: CriteriaResult[];
    summary: {
        errors: number;
        warnings: number;
        passed: number;
    };
    pageTitle: string;
    cached?: boolean;
}

const CATEGORY_CONFIG = {
    images: { label: "Images", icon: Image, color: "text-blue-500", bg: "bg-blue-500" },
    structure: { label: "Structure", icon: List, color: "text-emerald-500", bg: "bg-emerald-500" },
    navigation: { label: "Navigation", icon: Navigation, color: "text-amber-500", bg: "bg-amber-500" },
    formulaires: { label: "Formulaires", icon: FormInput, color: "text-pink-500", bg: "bg-pink-500" },
    semantique: { label: "Sémantique", icon: Code, color: "text-violet-500", bg: "bg-violet-500" },
};

const CONFORMITY_CONFIG = {
    "Non conforme": { color: "text-red-500", bg: "bg-red-500", bgLight: "bg-red-50", border: "border-red-200" },
    "Partiellement conforme": { color: "text-amber-500", bg: "bg-amber-500", bgLight: "bg-amber-50", border: "border-amber-200" },
    "Conforme": { color: "text-emerald-500", bg: "bg-emerald-500", bgLight: "bg-emerald-50", border: "border-emerald-200" },
};

function ScoreGauge({ score, conformityLevel }: { score: number; conformityLevel: AccessibilityResult["conformityLevel"] }) {
    const config = CONFORMITY_CONFIG[conformityLevel];
    const circumference = 2 * Math.PI * 90;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-48 h-48 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="90" stroke="currentColor" strokeWidth="12" fill="none" className="text-gray-200" />
                <motion.circle
                    cx="96" cy="96" r="90"
                    stroke="currentColor"
                    strokeWidth="12"
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
                <Accessibility className={`w-6 h-6 ${config.color} mb-1`} />
                <motion.span
                    className={`text-5xl font-bold ${config.color}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                >
                    {score}
                </motion.span>
                <span className="text-sm text-soft">/100</span>
                <span className={`text-xs font-bold mt-1 ${config.color}`}>{conformityLevel}</span>
            </div>
        </div>
    );
}

function CategoryCard({ category, data }: { category: keyof typeof CATEGORY_CONFIG; data: { score: number; maxScore: number; errors: number } }) {
    const config = CATEGORY_CONFIG[category];
    const Icon = config.icon;
    const percentage = Math.round((data.score / data.maxScore) * 100);

    return (
        <div className="bg-white rounded-xl border border-line p-4">
            <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${config.bg}/10 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1">
                    <div className="font-bold text-ink text-sm">{config.label}</div>
                    <div className="text-xs text-soft">{data.score}/{data.maxScore} pts</div>
                </div>
                {data.errors > 0 && (
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                        {data.errors} erreur{data.errors > 1 ? "s" : ""}
                    </span>
                )}
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full ${config.bg}`}
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
    const categoryConfig = CATEGORY_CONFIG[criteria.category];

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
            transition={{ delay: index * 0.03 }}
            className={`rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${statusBg[criteria.status]}`}
            onClick={() => setExpanded(!expanded)}
        >
            <div className="flex items-start gap-3">
                {statusIcon[criteria.status]}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-ink text-sm">{criteria.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${categoryConfig.bg}/10 ${categoryConfig.color}`}>
                            {categoryConfig.label}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-soft">
                            WCAG {criteria.wcagLevel}
                        </span>
                        {criteria.rgaaRef && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                                RGAA {criteria.rgaaRef}
                            </span>
                        )}
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
                                    <p className="text-xs text-soft mt-3 p-2 bg-white/50 rounded-lg font-mono">
                                        {criteria.details}
                                    </p>
                                )}
                                {criteria.fix && (
                                    <div className="mt-3 flex items-start gap-2 text-sm p-3 bg-white rounded-lg border border-line">
                                        <Award className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-ink">{criteria.fix}</span>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="text-right flex-shrink-0">
                    <span className="font-bold text-ink">{criteria.score}</span>
                    <span className="text-soft">/{criteria.maxScore}</span>
                </div>
            </div>
        </motion.div>
    );
}

export function CheckerAccessibilite() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AccessibilityResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("/api/checker-accessibilite", {
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
        const shareUrl = `${window.location.origin}/outils/checker-accessibilite?url=${encodeURIComponent(result?.url || "")}`;
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto">
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
                                    className="w-full px-6 py-4 text-lg border-2 border-line rounded-xl focus:border-pink-500 focus:ring-0 transition-colors pr-12"
                                    disabled={loading}
                                />
                                <Accessibility className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft" />
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
                            className="w-full bg-pink-500 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Analyse en cours...
                                </>
                            ) : (
                                <>
                                    <Accessibility className="w-5 h-5" />
                                    Tester l'accessibilité
                                </>
                            )}
                        </button>

                        <p className="text-center text-sm text-soft">
                            Gratuit • Sans inscription • 10 critères RGAA/WCAG analysés
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
                                {["Connexion au site...", "Analyse des images...", "Vérification de la structure...", "Test de la navigation..."].map((text, i) => (
                                    <motion.div
                                        key={text}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.6 }}
                                        className="flex items-center gap-3 text-soft"
                                    >
                                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                                        {text}
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}

            {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                    {/* Header */}
                    <div className={`rounded-2xl shadow-xl border p-8 ${CONFORMITY_CONFIG[result.conformityLevel].bgLight} ${CONFORMITY_CONFIG[result.conformityLevel].border}`}>
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <ScoreGauge score={result.score} conformityLevel={result.conformityLevel} />
                            <div className="flex-1 text-center lg:text-left">
                                <h2 className="text-2xl font-bold text-ink mb-2">{result.pageTitle}</h2>
                                <a
                                    href={result.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-pink-600 hover:underline flex items-center justify-center lg:justify-start gap-1"
                                >
                                    {result.url}
                                    <ExternalLink className="w-4 h-4" />
                                </a>

                                {/* Summary */}
                                <div className="flex items-center justify-center lg:justify-start gap-4 mt-4">
                                    <span className="flex items-center gap-1 text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        {result.summary.passed} validés
                                    </span>
                                    <span className="flex items-center gap-1 text-sm">
                                        <AlertCircle className="w-4 h-4 text-amber-500" />
                                        {result.summary.warnings} avertissements
                                    </span>
                                    <span className="flex items-center gap-1 text-sm">
                                        <XCircle className="w-4 h-4 text-red-500" />
                                        {result.summary.errors} erreurs
                                    </span>
                                </div>

                                <div className="flex items-center justify-center lg:justify-start gap-3 mt-4">
                                    <button
                                        onClick={handleCopyUrl}
                                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors border border-line"
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        {copied ? "Copié !" : "Partager"}
                                    </button>
                                    <button
                                        onClick={() => { setResult(null); setUrl(""); }}
                                        className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Nouveau test
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {(Object.keys(result.categories) as Array<keyof typeof result.categories>).map((cat) => (
                            <CategoryCard key={cat} category={cat} data={result.categories[cat]} />
                        ))}
                    </div>

                    {/* Criteria */}
                    <div className="bg-white rounded-2xl shadow-xl border border-line p-6 md:p-8">
                        <h3 className="text-xl font-bold text-ink mb-6">Détail des 10 critères</h3>
                        <div className="space-y-3">
                            {result.criteria.map((c, i) => (
                                <CriteriaCard key={c.id} criteria={c} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    {result.score < 75 && (
                        <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-8 text-center text-white">
                            <h3 className="text-2xl font-bold mb-3">
                                Votre site n'est pas encore conforme RGAA
                            </h3>
                            <p className="text-white/80 mb-6 max-w-xl mx-auto">
                                La mise en conformité RGAA est obligatoire pour les sites publics et bientôt pour les grandes entreprises.
                                Nos experts peuvent vous accompagner.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-white text-pink-600 px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-colors"
                            >
                                Demander un audit accessibilité
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    )}

                    {/* Related Tools */}
                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                        <h3 className="text-lg font-bold text-ink mb-4">Outils complémentaires</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <Link href="/outils/audit-seo-gratuit" className="p-4 bg-white rounded-xl border border-line hover:border-pink-300 transition-all group">
                                <Award className="w-6 h-6 text-emerald-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-pink-600 transition-colors">Audit SEO Gratuit</div>
                                <p className="text-sm text-soft">Score SEO complet /100</p>
                            </Link>
                            <Link href="/outils/generateur-schema-json-ld" className="p-4 bg-white rounded-xl border border-line hover:border-pink-300 transition-all group">
                                <Code className="w-6 h-6 text-blue-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-pink-600 transition-colors">Générateur Schema</div>
                                <p className="text-sm text-soft">Données structurées</p>
                            </Link>
                            <Link href="/outils/testeur-visibilite-ia" className="p-4 bg-white rounded-xl border border-line hover:border-pink-300 transition-all group">
                                <Navigation className="w-6 h-6 text-violet-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-pink-600 transition-colors">Testeur Visibilité IA</div>
                                <p className="text-sm text-soft">ChatGPT vous trouve-t-il ?</p>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
