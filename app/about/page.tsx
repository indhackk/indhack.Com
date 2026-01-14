"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useModal } from "@/components/providers/ModalProvider";
import { FAQ } from "@/components/FAQ";

const ABOUT_FAQ = [
    {
        question: "Quelle est votre approche du référencement ?",
        answer: "Une méthodologie basée sur trois piliers : la technique (vitesse, structure, indexation), le contenu (pertinence sémantique, expertise) et l'autorité (notoriété, liens entrants). Chaque projet est unique and l'approche est adaptée à vos objectifs business."
    },
    {
        question: "Travaillez-vous seule ou en équipe ?",
        answer: "Consultante indépendante, ce qui garantit une agilité maximale et un interlocuteur unique. Pour des projets d'envergure, collaboration possible avec un réseau d'experts (développeurs, rédacteurs) triés sur le volet."
    },
    {
        question: "Quels outils utilisez-vous ?",
        answer: "Les outils leaders du marché : Semrush, Screaming Frog, Google Search Console, Ahrefs, et des scripts d'automatisation personnalisés pour le suivi de performance."
    }
];

export default function AboutPage() {
    const { openAuditModal } = useModal();

    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-40 pb-24 bg-ink overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sauge/20 rounded-full blur-[150px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="text-sauge font-bold tracking-[0.2em] uppercase mb-6 text-sm">À propos</p>
                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-[1.1] tracking-tight mb-8">
                                Propulser votre business<br />
                                <span className="text-sauge">au sommet de Google</span>
                            </h1>
                            <p className="text-xl text-white/60 leading-relaxed max-w-xl mb-10">
                                Passionnée par la performance digitale, <strong>j'accompagne</strong> les entreprises ambitieuses dans leur conquête des premières positions sur les moteurs de recherche.
                            </p>
                            <Button
                                onClick={openAuditModal}
                                className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-10 py-7 font-bold transition-all"
                            >
                                Demander un audit gratuit
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative lg:max-w-sm mx-auto"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/indiana-aflalo.jpg"
                                    alt="Indiana Aflalo - Experte en Référencement"
                                    width={400}
                                    height={500}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Valeurs */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Une approche orientée <span className="text-sauge">résultats</span>
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Chaque stratégie est conçue pour générer un retour sur investissement mesurable.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center p-8 bg-gray-50 rounded-3xl"
                        >
                            <div className="w-16 h-16 bg-sauge/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Target className="w-8 h-8 text-sauge" />
                            </div>
                            <h3 className="text-xl font-bold text-ink mb-3">Stratégie Sur-Mesure</h3>
                            <p className="text-soft">Chaque projet est unique. Analyse approfondie de votre marché et de vos concurrents pour une approche personnalisée.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-center p-8 bg-gray-50 rounded-3xl"
                        >
                            <div className="w-16 h-16 bg-sauge/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Zap className="w-8 h-8 text-sauge" />
                            </div>
                            <h3 className="text-xl font-bold text-ink mb-3">Performance Technique</h3>
                            <p className="text-soft">Maîtrise des aspects techniques du référencement : vitesse, structure, données structurées, indexation optimale.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-center p-8 bg-gray-50 rounded-3xl"
                        >
                            <div className="w-16 h-16 bg-sauge/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Award className="w-8 h-8 text-sauge" />
                            </div>
                            <h3 className="text-xl font-bold text-ink mb-3">Transparence Totale</h3>
                            <p className="text-soft">Reporting clair et accessible. Vous comprenez exactement ce qui est fait et les résultats obtenus chaque mois.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Parcours */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-10">
                            Un parcours dédié au <span className="text-sauge">digital</span>
                        </h2>
                        <div className="prose prose-lg max-w-none text-soft mx-auto">
                            <p className="text-lg leading-relaxed mb-6">
                                Diplômée d'un <strong>double master en stratégie digitale</strong> et expérience utilisateur,
                                je me suis spécialisée dans l'optimisation des performances web et le <strong>référencement naturel</strong>.
                            </p>
                            <p className="text-lg leading-relaxed mb-6">
                                Après plusieurs années au sein d'agences digitales et en tant qu'indépendante,
                                <strong>j'accompagne aujourd'hui des entreprises</strong> de toutes tailles dans leur croissance organique.
                            </p>
                            <p className="text-lg leading-relaxed">
                                L'objectif : rendre le référencement accessible et surtout <strong>rentable</strong>.
                                Chaque action doit contribuer à vos objectifs business, pas juste à améliorer des métriques abstraites.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <FAQ items={ABOUT_FAQ} title="Questions sur mon approche" />

            {/* CTA */}
            <section className="py-24 bg-ink">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                        Prêt à booster votre <span className="text-sauge">visibilité</span> ?
                    </h2>
                    <p className="text-xl text-white/50 mb-10 max-w-xl mx-auto">
                        Discutons de votre projet et voyons comment atteindre vos objectifs ensemble.
                    </p>
                    <Button
                        onClick={openAuditModal}
                        className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-12 py-8 text-lg font-bold transition-all"
                    >
                        Demander un audit gratuit
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </section>
        </main>
    );
}
