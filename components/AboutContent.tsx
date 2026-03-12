"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Target, Zap, CheckCircle, Users, Clock, Star, Globe, GraduationCap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useModal } from "@/components/providers/ModalProvider";
import { FAQ } from "@/components/FAQ";

const ABOUT_FAQ = [
    {
        question: "Quelle est votre approche du référencement ?",
        answer: "Une méthodologie basée sur trois piliers : la technique (vitesse, structure, indexation), le contenu (pertinence sémantique, expertise) et l'autorité (notoriété, liens entrants). Chaque projet est unique et l'approche est adaptée à vos objectifs business. Découvrez mon service d'audit SEO pour un diagnostic complet."
    },
    {
        question: "Travaillez-vous seule ou en équipe ?",
        answer: "Consultante indépendante, ce qui garantit une agilité maximale et un interlocuteur unique. Pour des projets d'envergure, collaboration possible avec un réseau d'experts (développeurs, rédacteurs) triés sur le volet."
    },
    {
        question: "Quels outils utilisez-vous ?",
        answer: "Les outils leaders du marché : Semrush, Screaming Frog, Google Search Console, Ahrefs, et des scripts d'automatisation personnalisés pour le suivi de performance."
    },
    {
        question: "Intervenez-vous partout en France ?",
        answer: "Oui, j'accompagne des clients dans toute la France. Bien que basée sur la Côte d'Azur, les outils modernes permettent un accompagnement à distance très efficace. Consultez mes zones d'intervention pour le SEO local."
    }
];

export function AboutContent() {
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
                                Votre visibilité Google,<br />
                                <span className="text-sauge">ma spécialité</span>
                            </h1>
                            <p className="text-xl text-soft-light leading-relaxed max-w-xl mb-10">
                                Consultante SEO indépendante, j'aide les entreprises ambitieuses à <strong className="text-white">transformer leur présence digitale</strong> en machine à générer des clients qualifiés.
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
                                    alt="Indiana Aflalo - Experte en Référencement Naturel"
                                    width={400}
                                    height={500}
                                    priority
                                    fetchPriority="high"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* E-E-A-T Stats - Trust Signals */}
            <section className="py-12 bg-gray-50 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="text-center"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-sauge mb-1">7+</div>
                            <div className="text-xs text-soft uppercase tracking-wider">Années d'expérience</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: 0.1 }}
                            className="text-center"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-sauge mb-1">50+</div>
                            <div className="text-xs text-soft uppercase tracking-wider">Clients accompagnés</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-sauge mb-1">4.9</div>
                            <div className="text-xs text-soft uppercase tracking-wider">Note moyenne</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: 0.3 }}
                            className="text-center"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-sauge mb-1">17</div>
                            <div className="text-xs text-soft uppercase tracking-wider">Villes couvertes</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Valeurs */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Une approche orientée <span className="text-sauge">résultats</span>
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Pas de métriques creuses. Chaque action vise un objectif : augmenter votre chiffre d'affaires.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
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
                            viewport={{ once: true, margin: "-100px" }}
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
                            viewport={{ once: true, margin: "-100px" }}
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
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-10">
                            Un parcours dédié au <span className="text-sauge">digital</span>
                        </h2>
                        <div className="prose prose-lg max-w-none text-soft mx-auto">
                            <p className="text-lg leading-relaxed mb-6">
                                Diplômée d'un <strong className="text-ink">double master en stratégie digitale</strong> et expérience utilisateur,
                                je me suis spécialisée dans l'optimisation des performances web et le <strong className="text-ink">référencement naturel</strong>.
                            </p>
                            <p className="text-lg leading-relaxed mb-6">
                                Après avoir fait mes armes en agence, j'ai choisi l'indépendance pour offrir un accompagnement vraiment personnalisé.
                                Aujourd'hui, j'aide des entreprises de toutes tailles à développer leur <strong className="text-ink">croissance organique</strong>.
                            </p>
                            <p className="text-lg leading-relaxed">
                                L'objectif : rendre le référencement <strong className="text-ink">accessible et rentable</strong>.
                                Chaque action doit contribuer à vos objectifs business, pas juste améliorer des métriques abstraites.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expertise & Compétences */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-heading font-bold text-ink">
                                Expertise & <span className="text-sauge">Compétences</span>
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Formation */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-ink flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-sauge" />
                                    Formation
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-soft text-sm">
                                        <CheckCircle className="w-4 h-4 text-sauge mt-0.5 flex-shrink-0" />
                                        <span>Double Master en Stratégie Digitale & UX Design</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-soft text-sm">
                                        <CheckCircle className="w-4 h-4 text-sauge mt-0.5 flex-shrink-0" />
                                        <span>Certification Google Analytics 4</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-soft text-sm">
                                        <CheckCircle className="w-4 h-4 text-sauge mt-0.5 flex-shrink-0" />
                                        <span>Formation continue SEO technique (Semrush Academy)</span>
                                    </li>
                                </ul>
                            </div>
                            {/* Compétences techniques */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-ink flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-sauge" />
                                    Compétences Techniques
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-soft text-sm">
                                        <CheckCircle className="w-4 h-4 text-sauge mt-0.5 flex-shrink-0" />
                                        <span>SEO technique : Core Web Vitals, JavaScript SEO, Crawl Budget</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-soft text-sm">
                                        <CheckCircle className="w-4 h-4 text-sauge mt-0.5 flex-shrink-0" />
                                        <span>Développement web : Next.js, React, WordPress avancé</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-soft text-sm">
                                        <CheckCircle className="w-4 h-4 text-sauge mt-0.5 flex-shrink-0" />
                                        <span>Data : Google Search Console, Analytics, Looker Studio</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Outils */}
                        <div className="mt-10 pt-8 border-t border-gray-100">
                            <h3 className="font-bold text-ink text-center mb-6">Outils maîtrisés</h3>
                            <div className="flex flex-wrap justify-center gap-3">
                                {["Semrush", "Ahrefs", "Screaming Frog", "Google Search Console", "Google Analytics 4", "Looker Studio", "Figma", "WordPress", "Next.js", "Vercel"].map((tool) => (
                                    <span key={tool} className="px-4 py-2 bg-gray-50 rounded-full text-xs font-medium text-ink">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services proposés */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-heading font-bold text-ink">
                            Mes <span className="text-sauge">services</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        <Link href="/audit-seo" className="p-4 bg-gray-50 rounded-xl text-center hover:bg-sauge hover:text-white transition-all group">
                            <span className="text-sm font-medium">Diagnostic SEO</span>
                        </Link>
                        <Link href="/referencement-naturel" className="p-4 bg-gray-50 rounded-xl text-center hover:bg-sauge hover:text-white transition-all group">
                            <span className="text-sm font-medium">Stratégie SEO</span>
                        </Link>
                        <Link href="/creation-site-web" className="p-4 bg-gray-50 rounded-xl text-center hover:bg-sauge hover:text-white transition-all group">
                            <span className="text-sm font-medium">Site SEO-ready</span>
                        </Link>
                        <Link href="/seo-local" className="p-4 bg-gray-50 rounded-xl text-center hover:bg-sauge hover:text-white transition-all group">
                            <span className="text-sm font-medium">Google Maps</span>
                        </Link>
                    </div>
                </div>
            </section>

            <FAQ items={ABOUT_FAQ} title="Questions sur mon approche" />

            {/* CTA */}
            <section className="py-16 md:py-20 bg-ink">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                        Prêt à booster votre <span className="text-sauge">visibilité</span> ?
                    </h2>
                    <p className="text-xl text-soft-light mb-10 max-w-xl mx-auto">
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
