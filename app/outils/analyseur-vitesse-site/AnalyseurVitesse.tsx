"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Gauge,
    Loader2,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Smartphone,
    Monitor,
    Zap,
    Clock,
    TrendingUp,
    AlertTriangle,
    ChevronDown,
    ChevronUp,
    Info,
} from "lucide-react";

interface CoreWebVital {
    name: string;
    value: number;
    unit: string;
    rating: "good" | "needs-improvement" | "poor";
    description: string;
    threshold: { good: number; poor: number };
}

interface SpeedMetric {
    name: string;
    value: number;
    displayValue: string;
    score: number;
    description: string;
}

interface Opportunity {
    title: string;
    description: string;
    savings: string;
    priority: "high" | "medium" | "low";
}

interface Diagnostic {
    title: string;
    description: string;
    value: string;
}

interface SpeedAnalysisResult {
    url: string;
    timestamp: string;
    strategy: "mobile" | "desktop";
    scores: {
        performance: number;
        accessibility: number;
        bestPractices: number;
        seo: number;
    };
    coreWebVitals: CoreWebVital[];
    metrics: SpeedMetric[];
    opportunities: Opportunity[];
    diagnostics: Diagnostic[];
    summary: string;
    cached?: boolean;
    isDemo?: boolean;
    demoMessage?: string;
}

function ScoreGauge({ score, label, size = "large" }: { score: number; label: string; size?: "large" | "small" }) {
    const getColor = (s: number) => {
        if (s >= 90) return { bg: "bg-green-500", text: "text-green-500", ring: "ring-green-500" };
        if (s >= 50) return { bg: "bg-amber-500", text: "text-amber-500", ring: "ring-amber-500" };
        return { bg: "bg-red-500", text: "text-red-500", ring: "ring-red-500" };
    };

    const colors = getColor(score);
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    if (size === "small") {
        return (
            <div className="text-center">
                <div className="relative w-16 h-16 mx-auto">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-gray-200"
                        />
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeLinecap="round"
                            className={colors.text}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            style={{ strokeDasharray: circumference }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-lg font-bold ${colors.text}`}>{score}</span>
                    </div>
                </div>
                <p className="text-xs text-soft mt-1">{label}</p>
            </div>
        );
    }

    return (
        <div className="text-center">
            <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="text-gray-200"
                    />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        className={colors.text}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{ strokeDasharray: circumference }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold ${colors.text}`}>{score}</span>
                    <span className="text-xs text-soft">/100</span>
                </div>
            </div>
            <p className="text-sm font-medium text-ink mt-2">{label}</p>
        </div>
    );
}

function CoreWebVitalCard({ vital }: { vital: CoreWebVital }) {
    const getStatusIcon = () => {
        switch (vital.rating) {
            case "good":
                return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            case "needs-improvement":
                return <AlertTriangle className="w-5 h-5 text-amber-500" />;
            case "poor":
                return <XCircle className="w-5 h-5 text-red-500" />;
        }
    };

    const getBgColor = () => {
        switch (vital.rating) {
            case "good":
                return "bg-green-50 border-green-200";
            case "needs-improvement":
                return "bg-amber-50 border-amber-200";
            case "poor":
                return "bg-red-50 border-red-200";
        }
    };

    const formatValue = () => {
        if (vital.unit === "ms") {
            return vital.value >= 1000 ? `${(vital.value / 1000).toFixed(1)} s` : `${Math.round(vital.value)} ms`;
        }
        return vital.value.toString();
    };

    return (
        <div className={`p-4 rounded-xl border ${getBgColor()}`}>
            <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-ink">{vital.name}</span>
                {getStatusIcon()}
            </div>
            <div className="text-2xl font-bold text-ink mb-1">{formatValue()}</div>
            <p className="text-xs text-soft">{vital.description}</p>
            <div className="mt-2 text-xs text-soft">
                Bon : {"<"} {vital.threshold.good}{vital.unit} • Faible : {">"} {vital.threshold.poor}{vital.unit}
            </div>
        </div>
    );
}

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
    const [expanded, setExpanded] = useState(false);

    const getPriorityBadge = () => {
        switch (opportunity.priority) {
            case "high":
                return <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">Priorité haute</span>;
            case "medium":
                return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">Priorité moyenne</span>;
            case "low":
                return <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">Priorité faible</span>;
        }
    };

    return (
        <div className="border border-line rounded-xl overflow-hidden">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <div>
                        <div className="font-medium text-ink">{opportunity.title}</div>
                        {opportunity.savings && (
                            <div className="text-xs text-green-600 font-medium">{opportunity.savings}</div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {getPriorityBadge()}
                    {expanded ? <ChevronUp className="w-4 h-4 text-soft" /> : <ChevronDown className="w-4 h-4 text-soft" />}
                </div>
            </button>
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 pt-0">
                            <p className="text-sm text-soft">{opportunity.description}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function AnalyseurVitesse() {
    const [url, setUrl] = useState("");
    const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<SpeedAnalysisResult | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("/api/analyseur-vitesse", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: url.trim(), strategy }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erreur lors de l'analyse");
            }

            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur lors de l'analyse");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Form */}
            <div className="bg-white rounded-2xl border border-line shadow-sm p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Strategy Toggle */}
                    <div className="flex items-center justify-center gap-2 p-1 bg-gray-100 rounded-xl w-fit mx-auto">
                        <button
                            type="button"
                            onClick={() => setStrategy("mobile")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${strategy === "mobile"
                                    ? "bg-white text-ink shadow-sm"
                                    : "text-soft hover:text-ink"
                                }`}
                        >
                            <Smartphone className="w-4 h-4" />
                            Mobile
                        </button>
                        <button
                            type="button"
                            onClick={() => setStrategy("desktop")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${strategy === "desktop"
                                    ? "bg-white text-ink shadow-sm"
                                    : "text-soft hover:text-ink"
                                }`}
                        >
                            <Monitor className="w-4 h-4" />
                            Desktop
                        </button>
                    </div>

                    {/* URL Input */}
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-ink mb-2">
                            URL à analyser
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                id="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com"
                                className="flex-1 px-4 py-3 border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                disabled={loading || !url.trim()}
                                className="px-6 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Analyse...
                                    </>
                                ) : (
                                    <>
                                        <Gauge className="w-5 h-5" />
                                        Analyser
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Info */}
                <div className="mt-4 flex items-start gap-2 text-xs text-soft">
                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p>
                        L'analyse utilise l'API PageSpeed Insights de Google. Temps d'analyse : 15-30 secondes.
                        Les résultats sont mis en cache 24h.
                    </p>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="bg-white rounded-2xl border border-line shadow-sm p-12 text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-amber-500 mx-auto mb-4" />
                    <p className="text-ink font-medium">Analyse en cours...</p>
                    <p className="text-soft text-sm mt-1">Cette opération peut prendre 15 à 30 secondes</p>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                        <div>
                            <p className="font-medium text-red-800">Erreur lors de l'analyse</p>
                            <p className="text-red-600 text-sm mt-1">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Results */}
            {result && !loading && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Demo Notice */}
                    {result.isDemo && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <p className="text-blue-700 text-sm">{result.demoMessage}</p>
                        </div>
                    )}

                    {/* Scores */}
                    <div className="bg-white rounded-2xl border border-line shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-ink">Scores Lighthouse</h2>
                            <div className="flex items-center gap-2 text-sm text-soft">
                                {strategy === "mobile" ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                                {strategy === "mobile" ? "Mobile" : "Desktop"}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <ScoreGauge score={result.scores.performance} label="Performance" />
                            <ScoreGauge score={result.scores.accessibility} label="Accessibilité" size="small" />
                            <ScoreGauge score={result.scores.bestPractices} label="Bonnes Pratiques" size="small" />
                            <ScoreGauge score={result.scores.seo} label="SEO" size="small" />
                        </div>

                        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                            <p className="text-ink">{result.summary}</p>
                        </div>
                    </div>

                    {/* Core Web Vitals */}
                    <div className="bg-white rounded-2xl border border-line shadow-sm p-6">
                        <h2 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-amber-500" />
                            Core Web Vitals
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {result.coreWebVitals.map((vital) => (
                                <CoreWebVitalCard key={vital.name} vital={vital} />
                            ))}
                        </div>
                    </div>

                    {/* Metrics */}
                    <div className="bg-white rounded-2xl border border-line shadow-sm p-6">
                        <h2 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                            <Clock className="w-6 h-6 text-amber-500" />
                            Métriques de Performance
                        </h2>
                        <div className="space-y-4">
                            {result.metrics.map((metric) => (
                                <div key={metric.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <div className="font-medium text-ink">{metric.name}</div>
                                        <div className="text-xs text-soft">{metric.description}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-ink">{metric.displayValue}</div>
                                        <div className={`text-xs font-medium ${metric.score >= 90 ? "text-green-600" :
                                                metric.score >= 50 ? "text-amber-600" : "text-red-600"
                                            }`}>
                                            Score : {metric.score}/100
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Opportunities */}
                    {result.opportunities.length > 0 && (
                        <div className="bg-white rounded-2xl border border-line shadow-sm p-6">
                            <h2 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                                <Zap className="w-6 h-6 text-amber-500" />
                                Opportunités d'amélioration
                            </h2>
                            <div className="space-y-3">
                                {result.opportunities.map((opp, index) => (
                                    <OpportunityCard key={index} opportunity={opp} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Diagnostics */}
                    {result.diagnostics.length > 0 && (
                        <div className="bg-white rounded-2xl border border-line shadow-sm p-6">
                            <h2 className="text-xl font-bold text-ink mb-6">Diagnostics</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {result.diagnostics.map((diag, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                                        <div className="font-medium text-ink mb-1">{diag.title}</div>
                                        <div className="text-lg font-bold text-amber-600">{diag.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Cache Notice */}
                    {result.cached && (
                        <p className="text-center text-sm text-soft">
                            Résultats en cache • Analysé le {new Date(result.timestamp).toLocaleDateString("fr-FR")}
                        </p>
                    )}
                </motion.div>
            )}
        </div>
    );
}
