"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    Loader2,
    ExternalLink,
    ArrowRight,
    RefreshCw,
    Building2,
    Globe,
    Users,
    TrendingUp,
    AlertTriangle,
    CheckCircle2,
    Search,
    Bot,
    Code2,
} from "lucide-react";
import Link from "next/link";

interface SearchResult {
    position: number;
    title: string;
    url: string;
    snippet: string;
    classification: "platform" | "annuaire" | "local" | "google";
    platformName?: string;
}

interface LocalVisibilityResult {
    query: string;
    metier: string;
    ville: string;
    timestamp: string;
    results: SearchResult[];
    stats: {
        totalResults: number;
        platforms: number;
        annuaires: number;
        locaux: number;
        platformPercentage: number;
        localPercentage: number;
    };
    opportunity: "high" | "medium" | "low";
    opportunityMessage: string;
    recommendations: string[];
    cached?: boolean;
    isDemo?: boolean;
    demoMessage?: string;
}

const CLASSIFICATION_CONFIG = {
    platform: { label: "Plateforme", color: "bg-red-100 text-red-700 border-red-200", icon: Globe },
    annuaire: { label: "Annuaire", color: "bg-amber-100 text-amber-700 border-amber-200", icon: Building2 },
    local: { label: "Site local", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: Users },
    google: { label: "Google", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Search },
};

const OPPORTUNITY_CONFIG = {
    high: { color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200", icon: TrendingUp },
    medium: { color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200", icon: CheckCircle2 },
    low: { color: "text-red-500", bg: "bg-red-50", border: "border-red-200", icon: AlertTriangle },
};

// Popular métiers for suggestions
const METIERS = [
    "Plombier", "Électricien", "Coiffeur", "Restaurant", "Avocat", "Dentiste",
    "Boulangerie", "Garage auto", "Serrurier", "Ostéopathe", "Photographe", "Fleuriste"
];

// Popular cities
const VILLES = [
    "Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier",
    "Bordeaux", "Lille", "Rennes", "Reims", "Toulon", "Grenoble", "Dijon", "Angers"
];

function ResultCard({ result, index }: { result: SearchResult; index: number }) {
    const config = CLASSIFICATION_CONFIG[result.classification];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-start gap-4 p-4 rounded-xl border ${config.color}`}
        >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white font-bold text-sm">
                {result.position}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                    <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-ink hover:underline truncate max-w-[300px]"
                    >
                        {result.title}
                    </a>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                        <Icon className="w-3 h-3" />
                        {result.platformName || config.label}
                    </span>
                </div>
                <p className="text-sm text-soft truncate">{result.snippet}</p>
                <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
                >
                    {new URL(result.url).hostname}
                    <ExternalLink className="w-3 h-3" />
                </a>
            </div>
        </motion.div>
    );
}

function StatsChart({ stats }: { stats: LocalVisibilityResult["stats"] }) {
    const data = [
        { label: "Plateformes", value: stats.platforms, color: "bg-red-500" },
        { label: "Annuaires", value: stats.annuaires, color: "bg-amber-500" },
        { label: "Sites locaux", value: stats.locaux, color: "bg-emerald-500" },
    ];

    return (
        <div className="space-y-3">
            {data.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                    <div className="w-24 text-sm text-soft">{item.label}</div>
                    <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full ${item.color} flex items-center justify-end pr-2`}
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.value / stats.totalResults) * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <span className="text-xs font-bold text-white">{item.value}</span>
                        </motion.div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function SimulateurLocal() {
    const [metier, setMetier] = useState("");
    const [ville, setVille] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<LocalVisibilityResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!metier.trim() || !ville.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("/api/simulateur-visibilite-locale", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ metier: metier.trim(), ville: ville.trim() }),
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

    const opportunityConfig = result ? OPPORTUNITY_CONFIG[result.opportunity] : null;
    const OpportunityIcon = opportunityConfig?.icon || TrendingUp;

    return (
        <div className="max-w-5xl mx-auto">
            {!result && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl border border-line p-8 md:p-12"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="metier" className="block text-sm font-bold text-ink mb-2">
                                    Métier / Activité
                                </label>
                                <input
                                    type="text"
                                    id="metier"
                                    value={metier}
                                    onChange={(e) => setMetier(e.target.value)}
                                    placeholder="Ex: Plombier, Restaurant, Avocat..."
                                    className="w-full px-4 py-3 border-2 border-line rounded-xl focus:border-orange-500 focus:ring-0 transition-colors"
                                    disabled={loading}
                                    list="metiers-list"
                                />
                                <datalist id="metiers-list">
                                    {METIERS.map(m => <option key={m} value={m} />)}
                                </datalist>
                            </div>
                            <div>
                                <label htmlFor="ville" className="block text-sm font-bold text-ink mb-2">
                                    Ville
                                </label>
                                <input
                                    type="text"
                                    id="ville"
                                    value={ville}
                                    onChange={(e) => setVille(e.target.value)}
                                    placeholder="Ex: Paris, Lyon, Nice..."
                                    className="w-full px-4 py-3 border-2 border-line rounded-xl focus:border-orange-500 focus:ring-0 transition-colors"
                                    disabled={loading}
                                    list="villes-list"
                                />
                                <datalist id="villes-list">
                                    {VILLES.map(v => <option key={v} value={v} />)}
                                </datalist>
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
                            disabled={loading || !metier.trim() || !ville.trim()}
                            className="w-full bg-orange-500 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Analyse en cours...
                                </>
                            ) : (
                                <>
                                    <MapPin className="w-5 h-5" />
                                    Analyser la visibilité locale
                                </>
                            )}
                        </button>

                        <p className="text-center text-sm text-soft">
                            Gratuit • Découvrez qui domine Google pour votre requête locale
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
                                {["Recherche Google en cours...", "Analyse des résultats...", "Classification des sites..."].map((text, i) => (
                                    <motion.div
                                        key={text}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.8 }}
                                        className="flex items-center gap-3 text-soft"
                                    >
                                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
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
                    {/* Demo Warning */}
                    {result.isDemo && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-amber-800">Mode démonstration</p>
                                <p className="text-xs text-amber-700">{result.demoMessage}</p>
                            </div>
                        </div>
                    )}

                    {/* Header */}
                    <div className={`rounded-2xl border p-8 ${opportunityConfig?.bg} ${opportunityConfig?.border}`}>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <MapPin className={`w-6 h-6 ${opportunityConfig?.color}`} />
                                    <h2 className="text-2xl font-bold text-ink">
                                        "{result.metier} {result.ville}"
                                    </h2>
                                </div>
                                <div className={`flex items-center gap-2 ${opportunityConfig?.color}`}>
                                    <OpportunityIcon className="w-5 h-5" />
                                    <span className="font-medium">{result.opportunityMessage}</span>
                                </div>
                                {result.cached && (
                                    <p className="text-xs text-soft mt-2">Résultats mis en cache (7 jours)</p>
                                )}
                            </div>
                            <button
                                onClick={() => { setResult(null); setMetier(""); setVille(""); }}
                                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors border border-line"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Nouvelle recherche
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl shadow-xl border border-line p-6">
                            <h3 className="text-lg font-bold text-ink mb-4">Répartition des résultats</h3>
                            <StatsChart stats={result.stats} />
                            <div className="mt-4 pt-4 border-t border-line">
                                <div className="flex justify-between text-sm">
                                    <span className="text-soft">Part des plateformes</span>
                                    <span className="font-bold text-red-600">{result.stats.platformPercentage}%</span>
                                </div>
                                <div className="flex justify-between text-sm mt-2">
                                    <span className="text-soft">Part des sites locaux</span>
                                    <span className="font-bold text-emerald-600">{result.stats.localPercentage}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl border border-line p-6">
                            <h3 className="text-lg font-bold text-ink mb-4">Recommandations</h3>
                            <div className="space-y-3">
                                {result.recommendations.map((rec, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                                            {i + 1}
                                        </span>
                                        <span className="text-sm text-ink">{rec}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="bg-white rounded-2xl shadow-xl border border-line p-6">
                        <h3 className="text-lg font-bold text-ink mb-4">
                            Top 10 Google pour "{result.metier} {result.ville}"
                        </h3>
                        <div className="space-y-3">
                            {result.results.map((r, i) => (
                                <ResultCard key={r.position} result={r} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-center text-white">
                        <h3 className="text-2xl font-bold mb-3">
                            Vous n'apparaissez pas en page 1 ?
                        </h3>
                        <p className="text-white/80 mb-6 max-w-xl mx-auto">
                            Je peux vous aider à dominer les résultats SEO local
                            pour "{result.metier} {result.ville}" et attirer plus de clients.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-colors"
                        >
                            Demander une stratégie SEO local
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Related Tools */}
                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                        <h3 className="text-lg font-bold text-ink mb-4">Outils complémentaires</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <Link href="/outils/audit-seo-gratuit" className="p-4 bg-white rounded-xl border border-line hover:border-orange-300 transition-all group">
                                <Search className="w-6 h-6 text-emerald-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-orange-600 transition-colors">Audit SEO Gratuit</div>
                                <p className="text-sm text-soft">Score SEO complet /100</p>
                            </Link>
                            <Link href="/outils/generateur-schema-json-ld" className="p-4 bg-white rounded-xl border border-line hover:border-orange-300 transition-all group">
                                <Code2 className="w-6 h-6 text-blue-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-orange-600 transition-colors">Générateur Schema</div>
                                <p className="text-sm text-soft">LocalBusiness JSON-LD</p>
                            </Link>
                            <Link href="/outils/testeur-visibilite-ia" className="p-4 bg-white rounded-xl border border-line hover:border-orange-300 transition-all group">
                                <Bot className="w-6 h-6 text-violet-500 mb-2" />
                                <div className="font-bold text-ink group-hover:text-orange-600 transition-colors">Testeur Visibilité IA</div>
                                <p className="text-sm text-soft">ChatGPT vous trouve-t-il ?</p>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
