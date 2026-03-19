"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Zap, Search, Globe, BarChart3, Users, Rocket, Phone } from "lucide-react";
import { useModal } from "@/components/providers/ModalProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";

const offers = [
    {
        popular: false,
        title: "Audit SEO",
        subtitle: "Mission ponctuelle",
        description: "Un diagnostic complet de votre visibilité avec une roadmap actionnable.",
        features: [
            "Audit technique complet",
            "Analyse sémantique",
            "Étude de la concurrence",
            "Roadmap priorisée",
            "Livrable détaillé",
            "1 call de restitution"
        ],
        cta: "Demander un devis"
    },
    {
        popular: true,
        title: "Accompagnement",
        subtitle: "Suivi mensuel",
        description: "Un pilotage continu de votre SEO pour une croissance durable.",
        features: [
            "Audit initial inclus",
            "Optimisations mensuelles",
            "Suivi des positions",
            "Reporting détaillé",
            "Recommandations continues",
            "Disponibilité prioritaire",
            "Call mensuel de suivi"
        ],
        cta: "Réserver un call"
    },
    {
        popular: false,
        title: "Intégration Remote",
        subtitle: "Temps partiel ou complet",
        description: "Je rejoins votre équipe comme consultante SEO dédiée.",
        features: [
            "Intégration à vos process",
            "Disponibilité sur-mesure",
            "Participation aux réunions",
            "Formation de vos équipes",
            "Vision stratégique long terme",
            "Flexibilité totale"
        ],
        cta: "En savoir plus"
    }
];

const services = [
    {
        icon: <Search className="w-8 h-8" />,
        title: "Audit & Stratégie SEO",
        description: "Analyse complète de votre visibilité organique avec une roadmap priorisée pour dominer les résultats de recherche.",
        benefits: ["Audit technique & sémantique", "Analyse concurrentielle", "Plan d'action priorisé", "Quick wins identifiés"]
    },
    {
        icon: <Globe className="w-8 h-8" />,
        title: "Visibilité IA & SGE",
        description: "Optimisez votre contenu pour être citée par ChatGPT, Google SGE et les IA génératives.",
        benefits: ["Contenu NLP optimisé", "Données structurées", "Signaux E-E-A-T", "Veille IA continue"]
    },
    {
        icon: <Zap className="w-8 h-8" />,
        title: "Création Web SEO-First",
        description: "Sites ultra-rapides pensés dès la conception pour le référencement et la conversion.",
        benefits: ["performance web 100", "Architecture SEO", "Design conversion", "Performance mobile"]
    },
    {
        icon: <BarChart3 className="w-8 h-8" />,
        title: "Pilotage & Analytics",
        description: "Tableaux de bord sur-mesure pour piloter votre croissance par la donnée.",
        benefits: ["GA4 configuré", "Looker Studio", "KPIs business", "Reporting mensuel"]
    }
];

export function SolutionsContent() {
    const { openAuditModal } = useModal();

    return (
        <>
            {/* Hero */}
            <section className="bg-fond-sombre text-texte-clair pt-32 pb-20">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            Mes services
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                            Des solutions <span className="text-accent-clair">sur-mesure</span>
                        </h1>
                        <p className="text-xl text-texte-moyen max-w-2xl mx-auto mb-8">
                            Que vous ayez besoin d'un audit ponctuel, d'un accompagnement mensuel ou d'une consultante
                            intégrée à vos équipes, j'adapte mon intervention à vos besoins.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                size="lg"
                                onClick={openAuditModal}
                                className="bg-texte-clair text-fond-sombre hover:bg-white rounded-full px-8 py-6 text-lg group"
                            >
                                Demander un audit gratuit
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg"
                                >
                                    <Phone className="mr-2 w-5 h-5" />
                                    06 61 13 97 48
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Pricing/Offers */}
            <section className="py-20 bg-fond-clair">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-heading font-bold text-ink mb-4">
                            Choisissez votre formule
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Trois façons de travailler ensemble, adaptées à votre contexte et vos ambitions.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {offers.map((offer, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative bg-white rounded-3xl overflow-hidden border-2 transition-all hover:shadow-2xl ${offer.popular ? 'border-sauge shadow-xl scale-105' : 'border-line hover:border-sauge/30'
                                    }`}
                            >
                                {offer.popular && (
                                    <div className="absolute top-0 left-0 right-0 bg-sauge text-white text-center py-2 text-sm font-semibold">
                                        ⭐ Le plus populaire
                                    </div>
                                )}

                                <div className={`p-8 ${offer.popular ? 'pt-14' : ''}`}>
                                    <div className="text-sm text-sauge font-medium mb-2">{offer.subtitle}</div>
                                    <h3 className="text-2xl font-heading font-bold text-ink mb-3">{offer.title}</h3>
                                    <p className="text-soft mb-6">{offer.description}</p>

                                    <div className="space-y-3 mb-8">
                                        {offer.features.map((feature, j) => (
                                            <div key={j} className="flex items-center gap-3 text-sm">
                                                <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0" />
                                                <span className="text-ink">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        onClick={openAuditModal}
                                        className={`w-full py-6 rounded-xl text-lg transition-all ${offer.popular
                                                ? 'bg-sauge hover:bg-soft text-white'
                                                : 'bg-ink hover:bg-sauge text-white'
                                            }`}
                                    >
                                        {offer.cta}
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Detail */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-heading font-bold text-ink mb-4">
                            Mes expertises détaillées
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Chaque service est conçu pour générer un impact concret sur votre business.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-fond-clair p-8 rounded-3xl border border-line hover:border-sauge/30 hover:shadow-xl transition-all"
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 text-white group-hover:bg-sauge group-hover:text-white transition-colors">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-ink mb-4">{service.title}</h3>
                                <p className="text-soft mb-6 leading-relaxed">{service.description}</p>

                                <div className="grid grid-cols-2 gap-3">
                                    {service.benefits.map((benefit, j) => (
                                        <div key={j} className="flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-sauge flex-shrink-0" />
                                            <span className="text-ink font-medium">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-20 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-6">
                                Pourquoi me faire confiance ?
                            </h2>
                            <p className="text-xl text-soft-light mb-8">
                                Je m'engage sur des résultats concrets, avec une transparence totale à chaque étape.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { icon: <Users className="w-6 h-6" />, title: "Approche personnalisée", desc: "Chaque stratégie est adaptée à votre secteur et vos objectifs spécifiques." },
                                    { icon: <Rocket className="w-6 h-6" />, title: "Résultats mesurables", desc: "Reporting transparent avec des KPIs business, pas des métriques vanity." },
                                    { icon: <CheckCircle2 className="w-6 h-6" />, title: "Engagement qualité", desc: "Je ne prends que les projets où je sais pouvoir apporter de la valeur." }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-4"
                                    >
                                        <div className="w-12 h-12 bg-sauge rounded-xl flex items-center justify-center flex-shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                            <p className="text-soft-light">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="relative"
                        >
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                                <h3 className="text-2xl font-bold mb-6">Prête à démarrer ?</h3>
                                <p className="text-soft-light mb-8">
                                    Réservez un appel découverte gratuit de 30 minutes. On discute de vos objectifs
                                    et je vous dis honnêtement si je suis la bonne personne pour vous accompagner.
                                </p>
                                <div className="space-y-4">
                                    <Button
                                        size="lg"
                                        onClick={openAuditModal}
                                        className="w-full bg-sauge hover:bg-white hover:text-ink rounded-xl py-6 text-lg"
                                    >
                                        Réserver mon call gratuit
                                    </Button>
                                    <a
                                        href="tel:0661139748"
                                        className="flex items-center justify-center gap-2 py-4 text-white/80 hover:text-white transition-colors"
                                    >
                                        <Phone className="w-5 h-5" />
                                        Ou appelez-moi : 06 61 13 97 48
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
