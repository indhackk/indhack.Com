"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Loader2,
    CheckCircle2,
    XCircle,
    Globe,
    TrendingUp,
    AlertTriangle,
    Sparkles,
    Plus,
    Minus,
    ArrowRight,
    Eye,
} from "lucide-react";
import Link from "next/link";

interface CitationSource {
    url: string;
    title?: string;
}

interface PromptResult {
    prompt: string;
    isCited: boolean;
    citationPosition: number | null;
    totalSources: number;
    competitors: string[];
    snippet: string;
    sources: CitationSource[];
    aiEngine: string;
}

interface CitationCheckResult {
    domain: string;
    timestamp: string;
    prompts: PromptResult[];
    overallScore: {
        cited: number;
        total: number;
        percentage: number;
    };
    topCompetitors: { domain: string; count: number }[];
}

// Prompts suggérés selon le domaine/niche
const SUGGESTED_PROMPTS = [
    "meilleur consultant SEO",
    "outil audit SEO gratuit",
    "comment améliorer son référencement",
    "agence SEO freelance France",
    "testeur visibilité IA",
];

export default function CitationChecker({ domain }: { domain: string }) {
    const [prompts, setPrompts] = useState<string[]>(["", "", ""]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<CitationCheckResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [expandedPrompt, setExpandedPrompt] = useState<number | null>(null);

    const updatePrompt = (index: number, value: string) => {
        const newPrompts = [...prompts];
        newPrompts[index] = value;
        setPrompts(newPrompts);
    };

    const fillSuggestion = (index: number, suggestion: string) => {
        updatePrompt(index, suggestion);
    };

    const activePrompts = prompts.filter((p) => p.trim().length > 0);

    const handleCheck = async () => {
        if (activePrompts.length === 0) {
            setError("Entrez au moins un mot-clé à tester.");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("/api/citation-check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    domain,
                    prompts: activePrompts,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Erreur lors de la vérification");
            }

            const data: CitationCheckResult = await response.json();
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur inattendue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-violet-500/10 via-fond-card/80 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-violet-500/20 shadow-lg"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-violet-500/20 rounded-lg">
                    <Eye className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        Test de Citation IA
                        <span className="text-[10px] font-medium px-2 py-0.5 bg-violet-500/20 text-violet-300 rounded-full uppercase tracking-wider">
                            Nouveau
                        </span>
                    </h3>
                    <p className="text-sm text-soft-light">
                        Vérifiez si les IA vous citent sur vos mots-clés business
                    </p>
                </div>
            </div>

            {!result ? (
                <>
                    {/* Prompt inputs */}
                    <div className="space-y-3 mb-4">
                        {prompts.map((prompt, i) => (
                            <div key={i} className="relative">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-soft-light w-4 flex-shrink-0">{i + 1}.</span>
                                    <input
                                        type="text"
                                        value={prompt}
                                        onChange={(e) => updatePrompt(i, e.target.value)}
                                        placeholder={`Ex: ${SUGGESTED_PROMPTS[i] || "votre mot-clé"}`}
                                        className="w-full bg-fond-sombre/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Suggestions rapides */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="text-xs text-soft-light">Suggestions :</span>
                        {SUGGESTED_PROMPTS.slice(0, 4).map((s) => (
                            <button
                                key={s}
                                onClick={() => {
                                    const emptyIndex = prompts.findIndex((p) => p.trim() === "");
                                    if (emptyIndex >= 0) fillSuggestion(emptyIndex, s);
                                }}
                                className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md text-soft-light hover:text-white hover:border-violet-500/30 transition-all"
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-300 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        onClick={handleCheck}
                        disabled={loading || activePrompts.length === 0}
                        className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:bg-white/10 disabled:text-white/30 text-white font-bold py-3 px-6 rounded-xl transition-all"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Interrogation des IA en cours...
                            </>
                        ) : (
                            <>
                                <Search className="w-4 h-4" />
                                Vérifier mes citations ({activePrompts.length} mot{activePrompts.length > 1 ? "s" : ""}-clé{activePrompts.length > 1 ? "s" : ""})
                            </>
                        )}
                    </button>

                    <p className="text-xs text-soft-light/60 text-center mt-3">
                        Gratuit • 3 mots-clés • 5 tests/heure • Propulsé par Tavily AI Search
                    </p>
                </>
            ) : (
                /* ═══ RESULTS ═══ */
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-5"
                >
                    {/* Score global */}
                    <div className="text-center py-4">
                        <div className="text-5xl font-black mb-2">
                            <span className={result.overallScore.percentage >= 50 ? "text-emerald-400" : result.overallScore.percentage > 0 ? "text-amber-400" : "text-red-400"}>
                                {result.overallScore.cited}
                            </span>
                            <span className="text-white/30">/{result.overallScore.total}</span>
                        </div>
                        <p className="text-soft-light text-sm">
                            {result.overallScore.percentage === 100
                                ? "Excellent ! Vous êtes cité sur toutes vos requêtes."
                                : result.overallScore.percentage >= 50
                                    ? "Bon début — vous êtes cité sur certaines requêtes."
                                    : result.overallScore.percentage > 0
                                        ? "Visibilité partielle — il y a du travail à faire."
                                        : "Invisible — les IA ne vous citent pas encore."}
                        </p>
                        <p className="text-xs text-soft-light/50 mt-1">
                            Testé via {result.prompts[0]?.aiEngine || "IA"}
                        </p>
                    </div>

                    {/* Résultats par prompt */}
                    <div className="space-y-3">
                        {result.prompts.map((pr, i) => (
                            <div
                                key={i}
                                className={`rounded-xl border transition-all ${pr.isCited
                                    ? "bg-emerald-500/5 border-emerald-500/20"
                                    : "bg-red-500/5 border-red-500/20"
                                    }`}
                            >
                                <button
                                    onClick={() => setExpandedPrompt(expandedPrompt === i ? null : i)}
                                    className="w-full flex items-center gap-3 p-4 text-left"
                                >
                                    {pr.isCited ? (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">
                                            &quot;{pr.prompt}&quot;
                                        </p>
                                        <p className="text-xs text-soft-light">
                                            {pr.isCited
                                                ? pr.citationPosition === -1
                                                    ? "Mentionné dans la réponse"
                                                    : `Cité en source #${pr.citationPosition} sur ${pr.totalSources}`
                                                : `Non cité — ${pr.totalSources} sources trouvées`}
                                        </p>
                                    </div>
                                    <div className="text-soft-light">
                                        {expandedPrompt === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {expandedPrompt === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 pb-4 space-y-3">
                                                {/* Snippet */}
                                                <div className="bg-fond-sombre/30 rounded-lg p-3">
                                                    <p className="text-xs text-soft-light/70 mb-1">Extrait de la réponse IA :</p>
                                                    <p className="text-sm text-soft-light italic">&quot;{pr.snippet}&quot;</p>
                                                </div>

                                                {/* Concurrents */}
                                                {pr.competitors.length > 0 && (
                                                    <div>
                                                        <p className="text-xs text-soft-light/70 mb-2 flex items-center gap-1">
                                                            <TrendingUp className="w-3 h-3" />
                                                            Concurrents cités à votre place :
                                                        </p>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {pr.competitors.map((c) => (
                                                                <span
                                                                    key={c}
                                                                    className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-soft-light"
                                                                >
                                                                    {c}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Sources */}
                                                {pr.sources.length > 0 && (
                                                    <div>
                                                        <p className="text-xs text-soft-light/70 mb-1">
                                                            Sources ({pr.sources.length}) :
                                                        </p>
                                                        <div className="space-y-1 max-h-32 overflow-y-auto">
                                                            {pr.sources.slice(0, 6).map((s, j) => {
                                                                const isDomain = s.url.includes(result.domain);
                                                                return (
                                                                    <div
                                                                        key={j}
                                                                        className={`flex items-center gap-2 text-xs ${isDomain ? "text-emerald-400 font-medium" : "text-soft-light/60"
                                                                            }`}
                                                                    >
                                                                        <Globe className="w-3 h-3 flex-shrink-0" />
                                                                        <span className="truncate">
                                                                            {isDomain ? "→ " : ""}
                                                                            {s.title || s.url}
                                                                        </span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Top concurrents agrégés */}
                    {result.topCompetitors.length > 0 && (
                        <div className="bg-fond-sombre/30 rounded-xl p-4">
                            <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-amber-400" />
                                Vos concurrents IA
                            </h4>
                            <div className="space-y-2">
                                {result.topCompetitors.slice(0, 5).map((c, i) => (
                                    <div key={c.domain} className="flex items-center gap-3">
                                        <span className="text-xs text-soft-light/50 w-4">{i + 1}.</span>
                                        <div className="flex-1 flex items-center gap-2">
                                            <span className="text-sm text-soft-light">{c.domain}</span>
                                        </div>
                                        <span className="text-xs text-soft-light/50">
                                            cité {c.count}x
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                setResult(null);
                                setPrompts(["", "", ""]);
                            }}
                            className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-soft-light hover:text-white hover:border-white/20 py-2.5 rounded-xl text-sm transition-all"
                        >
                            Nouveau test
                        </button>
                        <Link
                            href="/consultant-geo"
                            className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-medium py-2.5 rounded-xl text-sm transition-all"
                        >
                            Améliorer mes citations
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
