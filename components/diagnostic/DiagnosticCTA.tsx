"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, Gift, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface DiagnosticCTAProps {
    nom: string;
    ville: string;
}

export default function DiagnosticCTA({ nom, ville }: DiagnosticCTAProps) {
    return (
        <section className="py-20 bg-gradient-to-br from-sauge/20 to-emerald-900/20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <div className="inline-flex items-center gap-2 bg-sauge/20 text-white px-4 py-2 rounded-full mb-6">
                        <Gift className="w-5 h-5" />
                        <span className="font-medium">Offre limitée</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Prêt à dominer Google ?
                    </h2>

                    <p className="text-xl text-gray-400 mb-10">
                        Discutons de votre projet <strong className="text-white">{nom}</strong> à {ville}.<br />
                        Réponse sous 24h. Devis gratuit.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/contact?entreprise=${encodeURIComponent(nom)}&ville=${encodeURIComponent(ville)}`}
                            className="inline-flex items-center justify-center gap-2 bg-sauge hover:bg-sauge/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
                        >
                            <Sparkles className="w-5 h-5" />
                            Je veux ce site
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                        <a
                            href="tel:+33661139748"
                            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all border border-white/20"
                        >
                            <Phone className="w-5 h-5" />
                            Appeler maintenant
                        </a>
                    </div>

                    <p className="text-gray-500 text-sm mt-8">
                        <Mail className="w-4 h-4 inline mr-2" />
                        contact@indhack.com
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
