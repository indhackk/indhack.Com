import Link from "next/link";
import { Bot, ArrowRight, FileQuestion, Zap } from "lucide-react";

export default function RapportNotFound() {
    return (
        <main className="min-h-screen bg-ink flex items-center justify-center px-4">
            {/* Background effects */}
            <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-sauge/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[180px] pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto text-center">
                {/* Icon */}
                <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-violet-500/20 to-sauge/20 border border-white/10 flex items-center justify-center">
                    <FileQuestion className="w-12 h-12 text-violet-400" />
                </div>

                {/* Content */}
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                    Rapport non disponible
                </h1>
                <p className="text-lg text-soft-light mb-8 max-w-md mx-auto">
                    Ce domaine n&apos;a pas encore été analysé par notre testeur de visibilité IA.
                    Lancez une analyse gratuite pour obtenir votre rapport.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                        <span className="text-white font-bold">8</span>
                        <span className="text-soft-light ml-2">crawlers IA analysés</span>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                        <span className="text-white font-bold">4</span>
                        <span className="text-soft-light ml-2">catégories de signaux</span>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                        <span className="text-white font-bold">100%</span>
                        <span className="text-soft-light ml-2">gratuit</span>
                    </div>
                </div>

                {/* CTA */}
                <Link
                    href="/outils/testeur-visibilite-ia"
                    className="inline-flex items-center gap-3 bg-white text-ink px-8 py-4 rounded-full font-bold hover:bg-sauge hover:text-white transition-all group"
                >
                    <Zap className="w-5 h-5" />
                    Tester ma visibilité IA
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Secondary links */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
                    <Link
                        href="/outils"
                        className="text-soft-light hover:text-sauge-light transition-colors flex items-center gap-2"
                    >
                        <Bot className="w-4 h-4" />
                        Voir tous les outils
                    </Link>
                    <Link
                        href="/blog/geo-comment-apparaitre-chatgpt-2026"
                        className="text-soft-light hover:text-sauge-light transition-colors"
                    >
                        Qu&apos;est-ce que le GEO ?
                    </Link>
                </div>

                {/* Info box */}
                <div className="mt-12 p-5 bg-white/5 rounded-xl border border-white/10 text-left">
                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                        <Bot className="w-4 h-4 text-sauge-light" />
                        Pourquoi analyser votre visibilité IA ?
                    </h3>
                    <p className="text-sm text-soft-light">
                        En 2026, 39 % des Français utilisent ChatGPT et Perplexity pour chercher des informations.
                        Si votre site n&apos;est pas optimisé pour les crawlers IA, vous êtes invisible pour ces utilisateurs.
                        Notre outil analyse votre robots.txt, vos schemas JSON-LD et vos signaux E-E-A-T.
                    </p>
                </div>
            </div>
        </main>
    );
}
