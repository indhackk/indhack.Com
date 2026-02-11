"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Tags,
    Loader2,
    ExternalLink,
    Copy,
    Check,
    ArrowRight,
    RefreshCw,
    FileText,
    Link2,
    Globe,
    Hash,
    BarChart3,
    Search,
    Bot,
    Code2,
} from "lucide-react";
import Link from "next/link";

interface KeywordData {
    word: string;
    count: number;
    density: number;
    locations: string[];
    importance: number;
}

interface NGramData {
    phrase: string;
    count: number;
    words: number;
}

interface ExtractionResult {
    url?: string;
    timestamp: string;
    totalWords: number;
    uniqueWords: number;
    keywords: KeywordData[];
    bigrams: NGramData[];
    trigrams: NGramData[];
    titleKeywords: string[];
    h1Keywords: string[];
    metaKeywords: string[];
    pageTitle?: string;
    mode: "url" | "text";
}

const LOCATION_LABELS: Record<string, { label: string; color: string }> = {
    title: { label: "Title", color: "bg-red-100 text-red-700" },
    h1: { label: "H1", color: "bg-orange-100 text-orange-700" },
    meta: { label: "Meta", color: "bg-amber-100 text-amber-700" },
    headings: { label: "Hn", color: "bg-yellow-100 text-yellow-700" },
    content: { label: "Contenu", color: "bg-blue-100 text-blue-700" },
    images: { label: "Images", color: "bg-green-100 text-green-700" },
    links: { label: "Liens", color: "bg-purple-100 text-purple-700" },
};

function WordCloud({ keywords }: { keywords: KeywordData[] }) {
    const maxImportance = Math.max(...keywords.map(k => k.importance));

    return (
        <div className="flex flex-wrap justify-center gap-2 p-6 bg-gradient-to-br from-lime-50 to-green-50 rounded-xl border border-lime-200">
            {keywords.slice(0, 30).map((keyword, index) => {
                const size = 0.7 + (keyword.importance / maxImportance) * 1.3;
                const opacity = 0.5 + (keyword.importance / maxImportance) * 0.5;
                const hue = 120 + (index * 5) % 60;

                return (
                    <motion.span
                        key={keyword.word}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.02 }}
                        className="px-3 py-1 rounded-full cursor-default transition-all hover:scale-110"
                        style={{
                            fontSize: `${size}rem`,
                            backgroundColor: `hsla(${hue}, 60%, 50%, 0.15)`,
                            color: `hsla(${hue}, 60%, 30%, ${opacity})`,
                            fontWeight: keyword.importance > maxImportance * 0.7 ? 700 : 500,
                        }}
                        title={`${keyword.word}: ${keyword.count} occurrences (${keyword.density}%)`}
                    >
                        {keyword.word}
                    </motion.span>
                );
            })}
        </div>
    );
}

function KeywordTable({ keywords }: { keywords: KeywordData[] }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-line">
                        <th className="text-left py-3 px-4 font-bold text-ink">Mot-clé</th>
                        <th className="text-center py-3 px-2 font-bold text-ink">Occurrences</th>
                        <th className="text-center py-3 px-2 font-bold text-ink">Densité</th>
                        <th className="text-left py-3 px-4 font-bold text-ink">Emplacements</th>
                    </tr>
                </thead>
                <tbody>
                    {keywords.slice(0, 25).map((keyword, index) => (
                        <motion.tr
                            key={keyword.word}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.02 }}
                            className="border-b border-line/50 hover:bg-gray-50"
                        >
                            <td className="py-3 px-4 font-medium text-ink">{keyword.word}</td>
                            <td className="py-3 px-2 text-center">
                                <span className="px-2 py-1 bg-lime-100 text-lime-700 rounded-full text-xs font-medium">
                                    {keyword.count}
                                </span>
                            </td>
                            <td className="py-3 px-2 text-center text-soft">{keyword.density}%</td>
                            <td className="py-3 px-4">
                                <div className="flex flex-wrap gap-1">
                                    {keyword.locations.map(loc => {
                                        const config = LOCATION_LABELS[loc];
                                        return config ? (
                                            <span key={loc} className={`px-2 py-0.5 rounded text-xs font-medium ${config.color}`}>
                                                {config.label}
                                            </span>
                                        ) : null;
                                    })}
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function NGramSection({ title, data }: { title: string; data: NGramData[] }) {
    if (data.length === 0) return null;

    return (
        <div>
            <h4 className="font-bold text-ink mb-3 flex items-center gap-2">
                <Hash className="w-4 h-4 text-lime-500" />
                {title}
            </h4>
            <div className="flex flex-wrap gap-2">
                {data.map((ngram, index) => (
                    <motion.span
                        key={ngram.phrase}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03 }}
                        className="px-3 py-1.5 bg-white border border-lime-200 rounded-lg text-sm"
                    >
                        <span className="font-medium text-ink">{ngram.phrase}</span>
                        <span className="ml-2 text-xs text-lime-600 font-bold">×{ngram.count}</span>
                    </motion.span>
                ))}
            </div>
        </div>
    );
}

export function ExtracteurMotsCles() {
    const [mode, setMode] = useState<"url" | "text">("url");
    const [url, setUrl] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ExtractionResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [view, setView] = useState<"cloud" | "table">("cloud");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === "url" && !url.trim()) return;
        if (mode === "text" && !text.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("/api/extracteur-mots-cles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    mode,
                    url: mode === "url" ? url.trim() : undefined,
                    text: mode === "text" ? text.trim() : undefined,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Erreur lors de l'extraction");
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur inattendue");
        } finally {
            setLoading(false);
        }
    };

    const handleCopyKeywords = () => {
        if (!result) return;
        const text = result.keywords.slice(0, 20).map(k => k.word).join(", ");
        navigator.clipboard.writeText(text);
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
                    {/* Mode Tabs */}
                    <div className="flex gap-2 mb-8">
                        <button
                            onClick={() => setMode("url")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                                mode === "url"
                                    ? "bg-lime-500 text-white"
                                    : "bg-gray-100 text-soft hover:bg-gray-200"
                            }`}
                        >
                            <Globe className="w-4 h-4" />
                            Analyser une URL
                        </button>
                        <button
                            onClick={() => setMode("text")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                                mode === "text"
                                    ? "bg-lime-500 text-white"
                                    : "bg-gray-100 text-soft hover:bg-gray-200"
                            }`}
                        >
                            <FileText className="w-4 h-4" />
                            Analyser un texte
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {mode === "url" ? (
                            <div>
                                <label htmlFor="url" className="block text-sm font-bold text-ink mb-2">
                                    URL à analyser
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="https://votresite.fr/page"
                                        className="w-full px-6 py-4 text-lg border-2 border-line rounded-xl focus:border-lime-500 focus:ring-0 transition-colors pr-12"
                                        disabled={loading}
                                    />
                                    <Link2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft" />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label htmlFor="text" className="block text-sm font-bold text-ink mb-2">
                                    Texte à analyser
                                </label>
                                <textarea
                                    id="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Collez votre texte ici..."
                                    rows={8}
                                    className="w-full px-6 py-4 border-2 border-line rounded-xl focus:border-lime-500 focus:ring-0 transition-colors resize-none"
                                    disabled={loading}
                                />
                                <p className="text-xs text-soft mt-2">
                                    {text.split(/\s+/).filter(Boolean).length} mots
                                </p>
                            </div>
                        )}

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
                            disabled={loading || (mode === "url" ? !url.trim() : !text.trim())}
                            className="w-full bg-lime-500 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-lime-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Extraction en cours...
                                </>
                            ) : (
                                <>
                                    <Tags className="w-5 h-5" />
                                    Extraire les mots-clés
                                </>
                            )}
                        </button>

                        <p className="text-center text-sm text-soft">
                            Gratuit • Sans inscription • Nuage de mots + tableau détaillé
                        </p>
                    </form>
                </motion.div>
            )}

            {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                    {/* Header */}
                    <div className="bg-gradient-to-br from-lime-50 to-green-50 rounded-2xl border border-lime-200 p-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                {result.pageTitle && (
                                    <h2 className="text-xl font-bold text-ink mb-2">{result.pageTitle}</h2>
                                )}
                                {result.url && (
                                    <a
                                        href={result.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lime-600 hover:underline flex items-center gap-1 text-sm"
                                    >
                                        {result.url}
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                                <div className="flex items-center gap-4 mt-3 text-sm text-soft">
                                    <span className="flex items-center gap-1">
                                        <BarChart3 className="w-4 h-4" />
                                        {result.totalWords} mots
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Hash className="w-4 h-4" />
                                        {result.uniqueWords} uniques
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Tags className="w-4 h-4" />
                                        {result.keywords.length} mots-clés
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleCopyKeywords}
                                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors border border-line"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? "Copié !" : "Copier les mots-clés"}
                                </button>
                                <button
                                    onClick={() => { setResult(null); setUrl(""); setText(""); }}
                                    className="flex items-center gap-2 px-4 py-2 bg-lime-500 text-white rounded-lg text-sm font-medium hover:bg-lime-600 transition-colors"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Nouvelle analyse
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* SEO Keywords */}
                    {result.mode === "url" && (result.titleKeywords.length > 0 || result.h1Keywords.length > 0) && (
                        <div className="bg-white rounded-2xl shadow-xl border border-line p-6">
                            <h3 className="text-lg font-bold text-ink mb-4">Mots-clés SEO prioritaires</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                {result.titleKeywords.length > 0 && (
                                    <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                        <div className="text-xs font-bold text-red-600 mb-2">TITLE</div>
                                        <div className="flex flex-wrap gap-1">
                                            {result.titleKeywords.map(k => (
                                                <span key={k} className="px-2 py-1 bg-white rounded text-sm text-ink">{k}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {result.h1Keywords.length > 0 && (
                                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                                        <div className="text-xs font-bold text-orange-600 mb-2">H1</div>
                                        <div className="flex flex-wrap gap-1">
                                            {result.h1Keywords.map(k => (
                                                <span key={k} className="px-2 py-1 bg-white rounded text-sm text-ink">{k}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {result.metaKeywords.length > 0 && (
                                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                                        <div className="text-xs font-bold text-amber-600 mb-2">META DESCRIPTION</div>
                                        <div className="flex flex-wrap gap-1">
                                            {result.metaKeywords.map(k => (
                                                <span key={k} className="px-2 py-1 bg-white rounded text-sm text-ink">{k}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* View Toggle + Content */}
                    <div className="bg-white rounded-2xl shadow-xl border border-line overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-line">
                            <h3 className="text-lg font-bold text-ink">Tous les mots-clés</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setView("cloud")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        view === "cloud" ? "bg-lime-500 text-white" : "bg-gray-100 text-soft hover:bg-gray-200"
                                    }`}
                                >
                                    Nuage
                                </button>
                                <button
                                    onClick={() => setView("table")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        view === "table" ? "bg-lime-500 text-white" : "bg-gray-100 text-soft hover:bg-gray-200"
                                    }`}
                                >
                                    Tableau
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            {view === "cloud" ? (
                                <WordCloud keywords={result.keywords} />
                            ) : (
                                <KeywordTable keywords={result.keywords} />
                            )}
                        </div>
                    </div>

                    {/* N-grams */}
                    {(result.bigrams.length > 0 || result.trigrams.length > 0) && (
                        <div className="bg-white rounded-2xl shadow-xl border border-line p-6 space-y-6">
                            <h3 className="text-lg font-bold text-ink">Expressions fréquentes</h3>
                            <NGramSection title="Bigrammes (2 mots)" data={result.bigrams} />
                            <NGramSection title="Trigrammes (3 mots)" data={result.trigrams} />
                        </div>
                    )}

                    {/* Related Tools */}
                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                        <h3 className="text-lg font-bold text-ink mb-4">Outils complémentaires</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <Link href="/outils/audit-seo-gratuit" className="p-4 bg-white rounded-xl border border-line hover:border-lime-300 transition-all group">
                                <Search className="w-6 h-6 text-emerald-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-lime-600 transition-colors">Audit SEO Gratuit</div>
                                <p className="text-sm text-soft">Score SEO complet /100</p>
                            </Link>
                            <Link href="/outils/generateur-schema-json-ld" className="p-4 bg-white rounded-xl border border-line hover:border-lime-300 transition-all group">
                                <Code2 className="w-6 h-6 text-blue-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-lime-600 transition-colors">Générateur Schema</div>
                                <p className="text-sm text-soft">Données structurées</p>
                            </Link>
                            <Link href="/outils/testeur-visibilite-ia" className="p-4 bg-white rounded-xl border border-line hover:border-lime-300 transition-all group">
                                <Bot className="w-6 h-6 text-violet-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-lime-600 transition-colors">Testeur Visibilité IA</div>
                                <p className="text-sm text-soft">ChatGPT vous trouve-t-il ?</p>
                            </Link>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-lime-500 to-green-500 rounded-2xl p-8 text-center text-white">
                        <h3 className="text-2xl font-bold mb-3">
                            Besoin d'une analyse sémantique approfondie ?
                        </h3>
                        <p className="text-white/80 mb-6 max-w-xl mx-auto">
                            Notre outil gratuit extrait les mots-clés. Pour une stratégie de contenu complète
                            avec analyse de la concurrence, nos experts vous accompagnent.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white text-lime-600 px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-colors"
                        >
                            Demander un audit sémantique
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
