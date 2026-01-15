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

    // VRAIE ANALYSE VIA GOOGLE PAGESPEED API
    const analyzeWebsite = async () => {
        if (!url.trim()) {
            setError("Veuillez entrer une URL valide");
            inputRef.current?.focus();
            return;
        }

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

        try {
            // Appel à l'API Google PageSpeed Insights (Gratuit, pas de clé requise pour un usage modéré)
            const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(cleanUrl)}&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES&strategy=mobile`;

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error("Impossible d'analyser ce site (Protection ou Timeout).");
            }

            const data = await response.json();
            const lighthouse = data.lighthouseResult.categories;

            // Récupération des VRAIS scores (0-1) vers (0-100)
            const metrics = {
                performance: Math.round(lighthouse.performance.score * 100),
                seo: Math.round(lighthouse.seo.score * 100),
                accessibility: Math.round(lighthouse.accessibility.score * 100),
                mobile: Math.round(lighthouse['best-practices'].score * 100), // Best Practices comme proxy mobile/qualité
            };

            const avgScore = Math.round((metrics.performance + metrics.seo + metrics.accessibility + metrics.mobile) / 4);

            setResult({
                score: avgScore,
                grade: avgScore >= 90 ? "A" : avgScore >= 70 ? "B" : avgScore >= 50 ? "C" : "D",
                issues: {
                    critical: [], // On pourrait extraire les audits failed de 'data.lighthouseResult.audits' si on voulait aller plus loin
                    warning: [],
                    passed: []
                },
                metrics
            });

        } catch (err) {
            console.error(err);
            // Fallback en cas d'erreur API (ex: site bloqué)
            setError("Impossible d'accéder au site. Il est peut-être protégé contre les robots.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const AUDIT_CHECKLIST = [
        { label: "Structure des balises Hn (Titres)", category: "SEO" },
        { label: "Vitesse de chargement (Core Web Vitals)", category: "Performance" },
        { label: "Configuration HTTPS & Sécurité", category: "Technique" },
        { label: "Adaptabilité Mobile (Responsive)", category: "UX" },
        { label: "Présence de mots-clés stratégiques", category: "Sémantique" },
        { label: "Qualité du profil de liens (Backlinks)", category: "Autorité" }
    ];

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
                            Analyse Live (Google Data)
                        </div>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Testez votre <span className="text-sauge">Performance SEO</span>
                        </h2>
                        <p className="text-white/60 max-w-xl mx-auto">
                            Interrogation en temps réel des serveurs Google (Lighthouse) pour un diagnostic technique immédiat et réel.
                        </p>
                    </motion.div>

                    {/* Input Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative z-10"
                    >
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
                            <AnimatePresence mode="wait">
                                {!result ? (
                                    <motion.div
                                        key="input"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col sm:flex-row gap-4"
                                    >
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
                                            className="bg-sauge text-white hover:bg-sauge/90 rounded-xl px-8 py-4 h-auto font-bold shadow-lg shadow-sauge/30 disabled:opacity-50 whitespace-nowrap"
                                        >
                                            {isAnalyzing ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                    Analyse...
                                                </>
                                            ) : (
                                                <>
                                                    <Search className="w-5 h-5 mr-2" />
                                                    Lancer le test
                                                </>
                                            )}
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="result"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-6"
                                    >
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sauge/20 text-sauge mb-6">
                                            <CheckCircle className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4">Site détecté avec succès !</h3>
                                        <p className="text-white/60 mb-8 max-w-lg mx-auto">
                                            Pour obtenir votre <strong>Score SEO réel</strong> et la liste des erreurs techniques à corriger, je dois réaliser un crawl complet de votre site ({url}).
                                        </p>

                                        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8 text-left">
                                            {AUDIT_CHECKLIST.map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                                    <div className="w-2 h-2 rounded-full bg-sauge animate-pulse" />
                                                    <span className="text-sm font-medium text-white/80">{item.label}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex flex-col gap-4 max-w-md mx-auto">
                                            <Button
                                                onClick={openAuditModal}
                                                className="w-full bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-8 py-6 font-bold text-lg shadow-xl shadow-sauge/30"
                                            >
                                                Recevoir mon Audit Complet (Gratuit)
                                                <ArrowRight className="ml-2 w-5 h-5" />
                                            </Button>
                                            <button
                                                onClick={() => setResult(null)}
                                                className="text-white/40 text-sm hover:text-white transition-colors"
                                            >
                                                Tester un autre site
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {error && (
                                <p className="text-red-400 text-sm mt-3 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" />
                                    {error}
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Les composants MetricBadge et helpers d'avant ne sont plus utilisés, on peut les supprimer ou les commenter.



