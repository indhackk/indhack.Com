"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles, ArrowRight, Zap, Brain, Eye } from "lucide-react";
import Link from "next/link";

/**
 * Section GEO (Generative Engine Optimization) pour la Homepage
 * Différenciation forte : positionnement sur la visibilité IA (ChatGPT, Perplexity, Claude)
 */
export function GEOSection() {
    return (
        <section className="py-16 bg-ink text-white overflow-hidden relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-sauge/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-sauge/5 rounded-full blur-2xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-sauge/20 border border-sauge/30 rounded-full px-4 py-1.5 mb-6">
                                <Sparkles className="w-4 h-4 text-sauge-light" />
                                <span className="text-sm font-medium text-sauge-light">Nouveauté 2026</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                                Optimisation pour <span className="text-sauge-light">l'IA</span>
                                <span className="block text-xl md:text-2xl font-normal text-white/70 mt-2">
                                    Generative Engine Optimization (GEO)
                                </span>
                            </h2>

                            <p className="text-white/70 mb-6 leading-relaxed">
                                En 2026, vos clients ne cherchent plus seulement sur Google.
                                Ils posent leurs questions à <strong className="text-white">ChatGPT</strong>, <strong className="text-white">Perplexity</strong> et <strong className="text-white">Claude</strong>.
                                Si ces IA ne vous citent pas, vous perdez des opportunités invisibles.
                            </p>

                            <p className="text-white/70 mb-8 leading-relaxed">
                                J'optimise votre site pour être <strong className="text-white">référencé ET recommandé</strong> par
                                les moteurs de recherche traditionnels et les moteurs de réponse IA.
                                Une double visibilité qui vous positionne en avance sur vos concurrents.
                            </p>

                            <Link
                                href="/outils/testeur-visibilite-ia"
                                className="inline-flex items-center gap-2 bg-sauge hover:bg-sauge-light text-white px-6 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-sauge/20"
                            >
                                <Bot className="w-5 h-5" />
                                Tester votre visibilité IA
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>

                        {/* Visual / Stats */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8">
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                                    <div className="w-10 h-10 bg-sauge/20 rounded-lg flex items-center justify-center">
                                        <Brain className="w-5 h-5 text-sauge-light" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Audit Visibilité IA</p>
                                        <p className="text-xs text-white/50">8 crawlers analysés</p>
                                    </div>
                                </div>

                                {/* Stats grid */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-white/5 rounded-xl p-4 text-center">
                                        <p className="text-3xl font-bold text-sauge-light">40%</p>
                                        <p className="text-xs text-white/60 mt-1">des recherches passent par l'IA</p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4 text-center">
                                        <p className="text-3xl font-bold text-sauge-light">+200%</p>
                                        <p className="text-xs text-white/60 mt-1">trafic IA d'ici 2027</p>
                                    </div>
                                </div>

                                {/* Crawlers list */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                                        <div className="flex items-center gap-2">
                                            <Eye className="w-4 h-4 text-green-400" />
                                            <span className="text-sm text-white">GPTBot (ChatGPT)</span>
                                        </div>
                                        <span className="text-xs text-green-400 font-medium">Vérifié</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                                        <div className="flex items-center gap-2">
                                            <Eye className="w-4 h-4 text-green-400" />
                                            <span className="text-sm text-white">PerplexityBot</span>
                                        </div>
                                        <span className="text-xs text-green-400 font-medium">Vérifié</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                                        <div className="flex items-center gap-2">
                                            <Eye className="w-4 h-4 text-green-400" />
                                            <span className="text-sm text-white">Claude-Web</span>
                                        </div>
                                        <span className="text-xs text-green-400 font-medium">Vérifié</span>
                                    </div>
                                </div>

                                {/* CTA mini */}
                                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                                    <Link href="/outils/testeur-visibilite-ia" className="text-sauge-light text-sm font-medium hover:underline inline-flex items-center gap-1">
                                        <Zap className="w-3 h-3" />
                                        Analyser mon site gratuitement
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
