"use client";

import Link from "next/link";
import { Activity, ArrowRight, Sparkles } from "lucide-react";

/**
 * CTA intégré dans les articles de blog
 * S'affiche après le 2ème ou 3ème H2 pour capturer l'attention des lecteurs mobiles
 * qui ne scrollent pas jusqu'au bout
 */
export function InArticleCTA() {
    return (
        <div className="my-10 not-prose">
            <div className="bg-sauge/5 border border-sauge/20 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-sauge/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

                <div className="relative z-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white border border-sauge/20 rounded-full px-3 py-1 mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-sauge" />
                        <span className="text-xs font-bold text-sauge uppercase tracking-wide">Outil gratuit</span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex-shrink-0">
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center border border-sauge/10">
                                <Activity className="w-7 h-7 text-sauge" />
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg md:text-xl font-heading font-bold text-ink mb-2">
                                Mesurez la santé de votre trafic
                            </h3>
                            <p className="text-soft text-sm md:text-base leading-relaxed">
                                Analyse technique, performance et SEO en 30 secondes.
                                Score sur 100 + recommandations personnalisées.
                            </p>
                        </div>

                        <div className="flex-shrink-0">
                            <Link
                                href="/outils/audit-seo-gratuit"
                                className="inline-flex items-center gap-2 bg-sauge hover:bg-ink text-white font-bold px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-sauge/20"
                            >
                                Tester mon site
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
