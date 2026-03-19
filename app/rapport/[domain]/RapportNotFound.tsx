"use client";

import Link from "next/link";
import { Bot, ArrowRight, Search, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function RapportNotFound({ domain }: { domain: string }) {
    return (
        <div className="min-h-screen bg-ink flex items-center justify-center p-4">
            <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-sauge/10 rounded-full blur-[150px] pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center relative z-10"
            >
                <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-10 h-10 text-amber-500" />
                </div>
                
                <h1 className="text-3xl font-heading font-bold text-white mb-4">
                    Rapport introuvable
                </h1>
                
                <p className="text-soft-light text-lg mb-8">
                    Le rapport de visibilité IA pour <strong className="text-white">{domain}</strong> n'existe pas ou a expiré. 
                    Les rapports sont conservés temporairement pour garantir des données toujours à jour.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href={`/outils/testeur-visibilite-ia`}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sauge hover:bg-sauge-light text-white px-8 py-4 rounded-xl font-bold transition-colors"
                    >
                        <Bot className="w-5 h-5" />
                        Générer un nouveau rapport
                    </Link>
                    <Link
                        href="/"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-medium border border-white/10 transition-colors"
                    >
                        Retour à l'accueil
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
