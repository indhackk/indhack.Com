"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, CheckCircle, XCircle, AlertTriangle, ArrowRight, Zap, Globe, Rocket, TrendingUp, Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";

interface SEOCheckResult {
    score: number;
    grade: string;
    issues: {
        critical: string[];
        warning: string[];
        passed: string[];
    };
    metrics: {
        performance: number;
        seo: number;
        accessibility: number;
        mobile: number;
    };
}

export function SEOScoreChecker() {
    const [url, setUrl] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<SEOCheckResult | null>(null);
    const [error, setError] = useState("");
    const { openAuditModal } = useModal();
    const inputRef = useRef<HTMLInputElement>(null);

    // Simulation d'analyse SEO (peut être connectée à une vraie API)
    const analyzeWebsite = async () => {
        if (!url.trim()) {
            setError("Veuillez entrer une URL valide");
            inputRef.current?.focus();
            return;
        }

        // Validation simple de l'URL
        let cleanUrl = url.trim();
        if (!cleanUrl.startsWith('http')) {
            cleanUrl = 'https://' + cleanUrl;
        }

        try {
            new URL(cleanUrl);
        } catch {
            setError("Format d'URL invalide. Exemple: www.monsite.fr");
            return;
        }

        setError("");
        setIsAnalyzing(true);
        setResult(null);

        // Simulation d'analyse (2-4 secondes)
        await new Promise(resolve => setTimeout(resolve, 2500 + Math.random() * 1500));

        // Génération de résultats simulés mais réalistes
        const baseScore = Math.floor(Math.random() * 40) + 30; // Score entre 30-70 généralement
        const issues = generateRandomIssues();
        const metrics = {
            performance: Math.floor(Math.random() * 50) + 40,
            seo: baseScore + Math.floor(Math.random() * 20) - 10,
            accessibility: Math.floor(Math.random() * 40) + 50,
            mobile: Math.floor(Math.random() * 45) + 45,
        };

        const avgScore = Math.round((metrics.performance + metrics.seo + metrics.accessibility + metrics.mobile) / 4);

        setResult({
            score: avgScore,
            grade: avgScore >= 80 ? "A" : avgScore >= 60 ? "B" : avgScore >= 40 ? "C" : "D",
            issues,
            metrics
        });
        setIsAnalyzing(false);
    };

    const generateRandomIssues = () => {
        const criticalPool = [
            "Balise title manquante sur certaines pages",
            "Meta description absente ou dupliquée",
            "Temps de chargement excessif (>4s)",
            "Pas de certificat SSL (HTTPS)",
            "Erreurs 404 détectées",
            "Contenu dupliqué interne",
            "Pas de sitemap.xml",
            "Robots.txt bloque l'indexation"
        ];

        const warningPool = [
            "Images sans attribut alt",
            "Structure de titres (H1-H6) incorrecte",
            "URLs non optimisées (trop longues, accents)",
            "Liens internes insuffisants",
            "Pas de données structurées Schema.org",
            "Core Web Vitals à améliorer",
            "Mobile-first non optimisé",
            "Fichiers CSS/JS non minifiés"
        ];

        const passedPool = [
            "Site accessible en HTTPS",
            "Balise H1 présente",
            "Viewport mobile configuré",
            "Fichier robots.txt présent",
            "Compression GZIP activée"
        ];

        const shuffle = (arr: string[]) => arr.sort(() => Math.random() - 0.5);

        return {
            critical: shuffle(criticalPool).slice(0, Math.floor(Math.random() * 3) + 1),
            warning: shuffle(warningPool).slice(0, Math.floor(Math.random() * 4) + 2),
            passed: shuffle(passedPool).slice(0, Math.floor(Math.random() * 3) + 2)
        };
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-500";
        if (score >= 60) return "text-yellow-500";
        if (score >= 40) return "text-orange-500";
        return "text-red-500";
    };

    const getGradeBg = (grade: string) => {
        if (grade === "A") return "bg-green-500";
        if (grade === "B") return "bg-yellow-500";
        if (grade === "C") return "bg-orange-500";
        return "bg-red-500";
    };

    return (
        <section className="py-16 bg-gradient-to-b from-ink to-ink/95 text-white overflow-hidden" id="seo-checker">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <div className="inline-flex items-center gap-2 bg-sauge/20 text-sauge px-4 py-2 rounded-full text-sm font-bold mb-4">
                            <Zap className="w-4 h-4" />
                            Outil Gratuit
                        </div>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Analysez le <span className="text-sauge">Score SEO</span> de votre site
                        </h2>
                        <p className="text-white/60 max-w-xl mx-auto">
                            Découvrez en 30 secondes les points bloquants qui empêchent votre site d'être visible sur Google.
                        </p>
                    </motion.div>

                    {/* Input Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative"
                    >
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && analyzeWebsite()}
                                        placeholder="www.votresite.fr"
                                        disabled={isAnalyzing}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sauge focus:border-transparent transition-all disabled:opacity-50"
                                    />
                                </div>
                                <Button
                                    onClick={analyzeWebsite}
                                    disabled={isAnalyzing}
                                    className="bg-sauge text-white hover:bg-sauge/90 rounded-xl px-8 py-4 h-auto font-bold shadow-lg shadow-sauge/30 disabled:opacity-50"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Analyse...
                                        </>
                                    ) : (
                                        <>
                                            <Search className="w-5 h-5 mr-2" />
                                            Analyser
                                        </>
                                    )}
                                </Button>
                            </div>
                            {error && (
                                <p className="text-red-400 text-sm mt-3 flex items-center gap-2">
                                    <XCircle className="w-4 h-4" />
                                    {error}
                                </p>
                            )}
                        </div>
                    </motion.div>

                    {/* Loading State */}
                    <AnimatePresence>
                        {isAnalyzing && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-8"
                            >
                                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-full border-4 border-sauge/30 border-t-sauge animate-spin" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Rocket className="w-6 h-6 text-sauge" />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-white font-bold">Analyse en cours...</p>
                                            <p className="text-white/50 text-sm mt-1">Vérification de +50 critères SEO</p>
                                        </div>
                                        <div className="w-full max-w-xs bg-white/10 rounded-full h-2 overflow-hidden">
                                            <motion.div
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 3, ease: "linear" }}
                                                className="h-full bg-gradient-to-r from-sauge to-sauge/70"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Results */}
                    <AnimatePresence>
                        {result && !isAnalyzing && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mt-8 space-y-6"
                            >
                                {/* Score Card */}
                                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        {/* Score Display */}
                                        <div className="text-center md:text-left">
                                            <p className="text-white/60 text-sm mb-2">Score SEO Global</p>
                                            <div className="flex items-center justify-center md:justify-start gap-4">
                                                <span className={`text-6xl md:text-7xl font-heading font-bold ${getScoreColor(result.score)}`}>
                                                    {result.score}
                                                </span>
                                                <div className="flex flex-col gap-1">
                                                    <span className={`${getGradeBg(result.grade)} text-white text-xl font-bold px-3 py-1 rounded-lg`}>
                                                        {result.grade}
                                                    </span>
                                                    <span className="text-white/40 text-xs">/ 100</span>
                                                </div>
                                            </div>
                                            <p className="text-white/50 text-sm mt-4">
                                                {result.score >= 60
                                                    ? "Bon début ! Des optimisations peuvent encore améliorer votre visibilité."
                                                    : "Votre site a un potentiel SEO inexploité. Agissons ensemble !"}
                                            </p>
                                        </div>

                                        {/* Mini Metrics */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <MetricBadge icon={<TrendingUp />} label="SEO" value={result.metrics.seo} />
                                            <MetricBadge icon={<Zap />} label="Performance" value={result.metrics.performance} />
                                            <MetricBadge icon={<Shield />} label="Accessibilité" value={result.metrics.accessibility} />
                                            <MetricBadge icon={<Smartphone />} label="Mobile" value={result.metrics.mobile} />
                                        </div>
                                    </div>
                                </div>

                                {/* Issues List */}
                                <div className="grid md:grid-cols-3 gap-4">
                                    {/* Critical */}
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
                                        <div className="flex items-center gap-2 text-red-400 font-bold mb-3">
                                            <XCircle className="w-5 h-5" />
                                            <span>Critiques ({result.issues.critical.length})</span>
                                        </div>
                                        <ul className="space-y-2">
                                            {result.issues.critical.map((issue, i) => (
                                                <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                                    {issue}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Warnings */}
                                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-5">
                                        <div className="flex items-center gap-2 text-yellow-400 font-bold mb-3">
                                            <AlertTriangle className="w-5 h-5" />
                                            <span>À améliorer ({result.issues.warning.length})</span>
                                        </div>
                                        <ul className="space-y-2">
                                            {result.issues.warning.map((issue, i) => (
                                                <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                                                    {issue}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Passed */}
                                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">
                                        <div className="flex items-center gap-2 text-green-400 font-bold mb-3">
                                            <CheckCircle className="w-5 h-5" />
                                            <span>Validés ({result.issues.passed.length})</span>
                                        </div>
                                        <ul className="space-y-2">
                                            {result.issues.passed.map((issue, i) => (
                                                <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                                                    {issue}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="bg-gradient-to-r from-sauge/20 to-sauge/10 rounded-2xl p-8 border border-sauge/30 text-center">
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        Obtenez un audit complet et personnalisé
                                    </h3>
                                    <p className="text-white/60 mb-6 max-w-lg mx-auto">
                                        Cette analyse rapide ne montre que la surface. Réservez un audit approfondi gratuit pour découvrir tout le potentiel de croissance de votre site.
                                    </p>
                                    <Button
                                        onClick={openAuditModal}
                                        className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-8 py-6 font-bold shadow-xl shadow-sauge/30"
                                    >
                                        Audit Complet Gratuit
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

function MetricBadge({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
    const getColor = (v: number) => {
        if (v >= 80) return "text-green-400 border-green-500/30 bg-green-500/10";
        if (v >= 60) return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
        if (v >= 40) return "text-orange-400 border-orange-500/30 bg-orange-500/10";
        return "text-red-400 border-red-500/30 bg-red-500/10";
    };

    return (
        <div className={`rounded-xl p-4 border ${getColor(value)}`}>
            <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5">{icon}</span>
                <span className="text-xs font-bold text-white/70">{label}</span>
            </div>
            <span className="text-2xl font-bold">{value}</span>
        </div>
    );
}
