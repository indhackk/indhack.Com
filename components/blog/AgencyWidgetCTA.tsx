import Link from "next/link";
import { Bot, ArrowRight, Zap, Target } from "lucide-react";

export function AgencyWidgetCTA() {
    return (
        <div className="my-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a2f28] to-ink border border-sauge/20 p-8 md:p-10 shadow-2xl group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-sauge/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-sauge-light text-xs font-bold uppercase tracking-wider mb-6">
                        <Target className="w-4 h-4" />
                        Pour les Agences Web & SEO
                    </div>

                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4 !mt-0">
                        Générez des leads SEO en automatique
                    </h3>

                    <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-xl">
                        Intégrez notre widget d'Audit SEO IA gratuit en marque blanche sur votre site. Vos visiteurs testent leur référencement, vous recevez leurs emails. 100% gratuit, installé en 2 minutes.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link
                            href="/partenaires"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sauge hover:bg-white text-white hover:text-ink px-6 py-4 rounded-xl font-bold transition-all duration-300"
                        >
                            <Bot className="w-5 h-5" />
                            Découvrir le Widget Gratuit
                        </Link>
                        <Link
                            href="/partenaires"
                            className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1 group/link"
                        >
                            Voir la démo longue <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                <div className="w-full md:w-1/3 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-sauge blur-[30px] opacity-20 rounded-full animate-pulse" />
                        <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">Nouveau Lead SEO</div>
                                    <div className="text-white/50 text-xs">À l'instant</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 bg-white/10 rounded w-full" />
                                <div className="h-2 bg-white/10 rounded w-3/4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
