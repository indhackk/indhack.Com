"use client";

import { useState } from "react";
import {
    Bot,
    Loader2,
    CheckCircle2,
    XCircle,
    MinusCircle,
    ExternalLink,
    ArrowRight,
    RefreshCw,
    Shield,
    FileText,
    Award,
    Layout,
    AlertTriangle,
    Zap,
    Mail,
} from "lucide-react";

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
    recommendations: { text: string; priority: number }[];
    pageTitle: string;
    metaDescription: string;
    wordCount: number;
    responseTime: number;
    hasLlmsTxt: boolean;
    cached?: boolean;
}

interface WidgetTheme {
    primaryColor?: string;
    buttonColor?: string;
    buttonText?: string;
    borderRadius?: string;
    darkMode?: boolean;
}

const LEVEL_CONFIG = {
    invisible: { color: "text-red-500", bg: "bg-red-500", label: "Invisible pour les IA" },
    partial: { color: "text-amber-500", bg: "bg-amber-500", label: "Partiellement visible" },
    visible: { color: "text-emerald-500", bg: "bg-emerald-500", label: "Bonne visibilité" },
    excellent: { color: "text-sauge", bg: "bg-sauge", label: "Excellent" },
};

const CATEGORY_CONFIG = {
    accessibilite: { label: "Accessibilité IA", icon: Shield },
    semantique: { label: "Richesse Sémantique", icon: FileText },
    eeat: { label: "Signaux E-E-A-T", icon: Award },
    format: { label: "Format IA-Friendly", icon: Layout },
};

function ScoreGauge({ score, primaryColor }: { score: number; primaryColor?: string }) {
    const radius = 65;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    const getColor = () => {
        if (score <= 30) return "#ef4444";
        if (score <= 60) return "#f59e0b";
        if (score <= 85) return "#10b981";
        return primaryColor || "#2E5E4E";
    };

    return (
        <div className="relative w-36 h-36 mx-auto">
            <svg className="transform -rotate-90" width={144} height={144} viewBox="0 0 144 144">
                <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    fill="none"
                />
                <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    stroke={getColor()}
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{ transition: "stroke-dashoffset 1s ease-out" }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-ink">{score}</span>
                <span className="text-soft text-sm">/100</span>
            </div>
        </div>
    );
}

function CrawlerRow({ crawler }: { crawler: CrawlerStatus }) {
    const statusConfig = {
        allowed: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
        blocked: { icon: XCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
        not_mentioned: { icon: MinusCircle, color: "text-gray-400", bg: "bg-gray-50", border: "border-gray-200" },
    };
    const config = statusConfig[crawler.status];
    const Icon = config.icon;

    return (
        <div className={`flex items-center justify-between p-2 rounded-lg ${config.bg} border ${config.border}`}>
            <div className="flex items-center gap-2">
                <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                <span className="font-medium text-ink text-xs">{crawler.name}</span>
                {crawler.critical && (
                    <span className="text-[8px] bg-sauge/20 text-sauge px-1 py-0.5 rounded font-medium">
                        Critique
                    </span>
                )}
            </div>
            <span className="text-[10px] text-soft">{crawler.company}</span>
        </div>
    );
}

function CategoryCard({ category, data, primaryColor }: { category: keyof typeof CATEGORY_CONFIG; data: CategoryScore; primaryColor?: string }) {
    const config = CATEGORY_CONFIG[category];
    const Icon = config.icon;
    const percentage = Math.round((data.score / data.maxScore) * 100);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-3 flex items-center gap-2 text-left hover:bg-gray-50 transition-colors"
            >
                <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-ink text-xs truncate">{config.label}</span>
                        <span className={`text-xs font-bold ${percentage >= 70 ? "text-emerald-600" : percentage >= 40 ? "text-amber-600" : "text-red-600"}`}>
                            {data.score}/{data.maxScore}
                        </span>
                    </div>
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-700`}
                            style={{
                                width: `${percentage}%`,
                                backgroundColor: percentage >= 70
                                    ? (primaryColor || "#10b981")
                                    : percentage >= 40 ? "#f59e0b" : "#ef4444"
                            }}
                        />
                    </div>
                </div>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="px-3 pb-3 space-y-1">
                    {data.checks.map((check, i) => (
                        <div key={i} className={`flex items-start gap-1.5 p-1.5 rounded text-[10px] ${
                            check.status === "success" ? "bg-emerald-50" :
                            check.status === "warning" ? "bg-amber-50" : "bg-red-50"
                        }`}>
                            {check.status === "success" ? (
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0 mt-0.5" />
                            ) : check.status === "warning" ? (
                                <AlertTriangle className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5" />
                            ) : (
                                <XCircle className="w-3 h-3 text-red-600 flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 min-w-0">
                                <span className="font-medium text-ink">{check.label}</span>
                                <span className="text-gray-500 ml-1">({check.points}/{check.maxPoints})</span>
                                <p className="text-gray-500 mt-0.5">{check.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

interface TesteurIAWidgetProps {
    agencyEmail?: string;
    showLeadForm?: boolean;
    theme?: WidgetTheme;
}

export function TesteurIAWidget({ agencyEmail, showLeadForm = true, theme }: TesteurIAWidgetProps) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<VisibilityResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Lead form state
    const [visitorEmail, setVisitorEmail] = useState("");
    const [leadSubmitting, setLeadSubmitting] = useState(false);
    const [leadSubmitted, setLeadSubmitted] = useState(false);
    const [leadError, setLeadError] = useState<string | null>(null);

    // Theme
    const primaryColor = theme?.primaryColor || "#2E5E4E";
    const buttonColor = theme?.buttonColor || primaryColor;
    const buttonText = theme?.buttonText || "Tester";
    const borderRadius = theme?.borderRadius ? `${theme.borderRadius}px` : "12px";
    const isDark = theme?.darkMode || false;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);
        setLeadSubmitted(false);

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

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!visitorEmail.trim() || !result || !agencyEmail) return;

        setLeadSubmitting(true);
        setLeadError(null);

        try {
            const response = await fetch("/api/widget-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    visitorEmail: visitorEmail.trim(),
                    score: result.score,
                    testedUrl: result.url,
                    agencyEmail: agencyEmail,
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi");
            }

            setLeadSubmitted(true);
        } catch (err) {
            setLeadError(err instanceof Error ? err.message : "Erreur lors de l'envoi");
        } finally {
            setLeadSubmitting(false);
        }
    };

    const handleNewTest = () => {
        setResult(null);
        setUrl("");
        setError(null);
        setLeadSubmitted(false);
        setVisitorEmail("");
    };

    const blockedCount = result?.crawlers.filter(c => c.status === "blocked").length || 0;

    return (
        <div
            className="max-w-2xl mx-auto p-3 sm:p-4 min-h-screen"
            style={{
                backgroundColor: isDark ? "#1e1e2e" : "#ffffff",
                borderRadius,
                color: isDark ? "#e0e0e0" : undefined,
            }}
        >
            {/* Form */}
            {!result && (
                <div>
                    <div className="text-center mb-5">
                        <div
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-full text-[10px] font-bold mb-2"
                            style={{
                                backgroundColor: `${primaryColor}15`,
                                borderColor: `${primaryColor}30`,
                                color: primaryColor,
                            }}
                        >
                            <Bot className="w-3 h-3" />
                            <span className="uppercase tracking-wider">Testeur Visibilité IA</span>
                        </div>
                        <h2
                            className="text-lg sm:text-xl font-bold mb-1"
                            style={{ color: isDark ? "#ffffff" : "#2A3830" }}
                        >
                            Votre site est-il visible par{" "}
                            <span style={{ color: primaryColor }}>ChatGPT</span> ?
                        </h2>
                        <p className="text-xs" style={{ color: isDark ? "#a0a0a0" : "#3D4D46" }}>
                            Analysez vos signaux GEO en 30 secondes
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="border p-4"
                        style={{
                            borderRadius,
                            backgroundColor: isDark ? "#252538" : "#f9fafb",
                            borderColor: isDark ? "#3a3a50" : "#e5e7eb",
                        }}
                    >
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full px-3 py-2.5 border focus:ring-2 transition-all text-sm"
                                    style={{
                                        borderRadius: `${parseInt(borderRadius) - 4}px`,
                                        borderColor: isDark ? "#3a3a50" : "#e5e7eb",
                                        backgroundColor: isDark ? "#1e1e2e" : "#ffffff",
                                        color: isDark ? "#e0e0e0" : "#2A3830",
                                        outlineColor: primaryColor,
                                    }}
                                    disabled={loading}
                                    placeholder="https://votre-site.com"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading || !url.trim()}
                                className="text-white px-5 py-2.5 font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1.5 whitespace-nowrap text-sm hover:opacity-90"
                                style={{
                                    backgroundColor: buttonColor,
                                    borderRadius: `${parseInt(borderRadius) - 4}px`,
                                }}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Analyse...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-4 h-4" />
                                        {buttonText}
                                    </>
                                )}
                            </button>
                        </div>

                        {error && (
                            <div className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2">
                                <XCircle className="w-4 h-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <p className="text-center text-[10px] mt-3" style={{ color: isDark ? "#666" : "#9ca3af" }}>
                            Gratuit • 8 crawlers IA analysés
                        </p>
                    </form>

                    {loading && (
                        <div
                            className="mt-4 border p-4"
                            style={{
                                borderRadius,
                                backgroundColor: isDark ? "#252538" : "#f9fafb",
                                borderColor: isDark ? "#3a3a50" : "#e5e7eb",
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${primaryColor}15` }}
                                >
                                    <Bot className="w-4 h-4 animate-pulse" style={{ color: primaryColor }} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs font-medium mb-1.5" style={{ color: isDark ? "#e0e0e0" : "#2A3830" }}>
                                        Analyse en cours...
                                    </div>
                                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full animate-pulse"
                                            style={{ width: "60%", backgroundColor: primaryColor }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Backlink inside the iframe */}
                    <div className="mt-6 text-center">
                        <a
                            href="https://indhack.com/outils/testeur-visibilite-ia"
                            target="_blank"
                            rel="dofollow"
                            className="inline-flex items-center gap-1 text-[10px] hover:underline transition-opacity opacity-50 hover:opacity-80"
                            style={{ color: isDark ? "#888" : "#9ca3af" }}
                        >
                            <Bot className="w-3 h-3" />
                            Propulsé par IndHack — Testeur de visibilité IA
                        </a>
                    </div>
                </div>
            )}

            {/* Results */}
            {result && (
                <div className="space-y-4">
                    {/* Score Card */}
                    <div
                        className="border p-4"
                        style={{
                            borderRadius,
                            backgroundColor: isDark ? "#252538" : "#f9fafb",
                            borderColor: isDark ? "#3a3a50" : "#e5e7eb",
                        }}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <ScoreGauge score={result.score} primaryColor={primaryColor} />
                            <div className="text-center">
                                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium mb-1 ${LEVEL_CONFIG[result.level].bg} text-white`}>
                                    {result.levelLabel}
                                </div>
                                <h3
                                    className="text-sm font-bold mb-0.5 line-clamp-1"
                                    style={{ color: isDark ? "#ffffff" : "#2A3830" }}
                                >
                                    {result.pageTitle}
                                </h3>
                                <a
                                    href={result.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-1 text-[10px] hover:underline"
                                    style={{ color: isDark ? "#888" : "#6b7280" }}
                                >
                                    {result.url.length > 35 ? result.url.substring(0, 35) + "..." : result.url}
                                    <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                                <div className="flex items-center justify-center gap-2 mt-2">
                                    <span
                                        className="px-1.5 py-0.5 rounded text-[10px] border"
                                        style={{
                                            backgroundColor: isDark ? "#1e1e2e" : "#ffffff",
                                            borderColor: isDark ? "#3a3a50" : "#e5e7eb",
                                            color: isDark ? "#a0a0a0" : "#6b7280",
                                        }}
                                    >
                                        {result.wordCount} mots
                                    </span>
                                    <span
                                        className="px-1.5 py-0.5 rounded text-[10px] border"
                                        style={{
                                            backgroundColor: isDark ? "#1e1e2e" : "#ffffff",
                                            borderColor: isDark ? "#3a3a50" : "#e5e7eb",
                                            color: isDark ? "#a0a0a0" : "#6b7280",
                                        }}
                                    >
                                        {result.responseTime}ms
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t flex justify-center" style={{ borderColor: isDark ? "#3a3a50" : "#e5e7eb" }}>
                            <button
                                onClick={handleNewTest}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border"
                                style={{
                                    backgroundColor: isDark ? "#1e1e2e" : "#ffffff",
                                    borderColor: isDark ? "#3a3a50" : "#e5e7eb",
                                    color: isDark ? "#e0e0e0" : "#2A3830",
                                }}
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                                Nouveau test
                            </button>
                        </div>
                    </div>

                    {/* Recommendations */}
                    {result.recommendations.length > 0 && (
                        <div
                            className="border p-3"
                            style={{
                                borderRadius,
                                backgroundColor: isDark ? "#252538" : "#f9fafb",
                                borderColor: isDark ? "#3a3a50" : "#e5e7eb",
                            }}
                        >
                            <h4 className="font-bold text-xs mb-2" style={{ color: isDark ? "#ffffff" : "#2A3830" }}>
                                Actions prioritaires
                            </h4>
                            <div className="space-y-1.5">
                                {result.recommendations.slice(0, 3).map((rec, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-2 p-2 rounded-lg border"
                                        style={{
                                            backgroundColor: isDark ? "#1e1e2e" : "#ffffff",
                                            borderColor: isDark ? "#3a3a50" : "#f3f4f6",
                                        }}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                                            rec.priority === 1 ? "bg-red-500" : rec.priority === 2 ? "bg-amber-500" : "bg-emerald-500"
                                        }`} />
                                        <p className="text-[11px] leading-relaxed" style={{ color: isDark ? "#d0d0d0" : "#2A3830" }}>
                                            {rec.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Crawlers */}
                    <div
                        className="border p-3"
                        style={{
                            borderRadius,
                            backgroundColor: isDark ? "#252538" : "#f9fafb",
                            borderColor: isDark ? "#3a3a50" : "#e5e7eb",
                        }}
                    >
                        <h4 className="font-bold text-xs mb-2" style={{ color: isDark ? "#ffffff" : "#2A3830" }}>
                            Crawlers IA
                        </h4>
                        <div className="grid grid-cols-2 gap-1.5">
                            {result.crawlers.map((crawler) => (
                                <CrawlerRow key={crawler.agent} crawler={crawler} />
                            ))}
                        </div>
                        {blockedCount > 0 && (
                            <div className="mt-2 p-2 bg-red-50 border border-red-100 rounded-lg text-[10px] text-red-700 flex items-start gap-1.5">
                                <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                                <span>{blockedCount} crawler(s) bloqué(s)</span>
                            </div>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="grid grid-cols-2 gap-2">
                        {(Object.keys(result.categories) as Array<keyof typeof result.categories>).map((cat) => (
                            <CategoryCard key={cat} category={cat} data={result.categories[cat]} primaryColor={primaryColor} />
                        ))}
                    </div>

                    {/* Lead Form */}
                    {showLeadForm && agencyEmail && !leadSubmitted && (
                        <div
                            className="border p-4"
                            style={{
                                borderRadius,
                                backgroundColor: `${primaryColor}08`,
                                borderColor: `${primaryColor}30`,
                            }}
                        >
                            <h4 className="font-bold text-sm mb-1" style={{ color: isDark ? "#ffffff" : "#2A3830" }}>
                                Améliorez votre visibilité IA
                            </h4>
                            <p className="text-[11px] mb-3" style={{ color: isDark ? "#a0a0a0" : "#3D4D46" }}>
                                Recevez un rapport détaillé avec des recommandations personnalisées.
                            </p>
                            <form onSubmit={handleLeadSubmit} className="flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 relative">
                                    <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        value={visitorEmail}
                                        onChange={(e) => setVisitorEmail(e.target.value)}
                                        className="w-full pl-8 pr-3 py-2 border focus:ring-2 transition-all text-sm"
                                        style={{
                                            borderRadius: `${parseInt(borderRadius) - 4}px`,
                                            borderColor: isDark ? "#3a3a50" : "#e5e7eb",
                                            backgroundColor: isDark ? "#1e1e2e" : "#ffffff",
                                            color: isDark ? "#e0e0e0" : "#2A3830",
                                            outlineColor: primaryColor,
                                        }}
                                        placeholder="Votre email"
                                        required
                                        disabled={leadSubmitting}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={leadSubmitting || !visitorEmail.trim()}
                                    className="text-white px-4 py-2 font-medium disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 text-sm whitespace-nowrap hover:opacity-90"
                                    style={{
                                        backgroundColor: buttonColor,
                                        borderRadius: `${parseInt(borderRadius) - 4}px`,
                                    }}
                                >
                                    {leadSubmitting ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            Recevoir mon rapport
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </>
                                    )}
                                </button>
                            </form>
                            {leadError && (
                                <p className="text-[10px] text-red-600 mt-2">{leadError}</p>
                            )}
                        </div>
                    )}

                    {/* Lead Submitted */}
                    {leadSubmitted && (
                        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 text-center">
                            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                            <p className="font-medium text-emerald-800 text-sm">
                                Merci ! Vous serez recontacté rapidement.
                            </p>
                        </div>
                    )}

                    {/* Backlink inside the iframe — results view */}
                    <div className="mt-2 text-center">
                        <a
                            href="https://indhack.com/outils/testeur-visibilite-ia"
                            target="_blank"
                            rel="dofollow"
                            className="inline-flex items-center gap-1 text-[10px] hover:underline transition-opacity opacity-50 hover:opacity-80"
                            style={{ color: isDark ? "#888" : "#9ca3af" }}
                        >
                            <Bot className="w-3 h-3" />
                            Propulsé par IndHack — Testeur de visibilité IA
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
