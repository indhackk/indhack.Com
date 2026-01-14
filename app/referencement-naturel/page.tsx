"use client";

import { HeroServices } from "@/components/services/HeroServices";
import { FAQ } from "@/components/FAQ";
import { motion } from "framer-motion";
import { Search, FileText, Link2, BarChart3, ArrowRight, ShieldCheck, Zap, Globe, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";

const SEO_PILLARS = [
    {
        icon: <Search className="w-8 h-8 text-sauge" />,
        title: "Expertise Technique",
        desc: "Optimisation de l'indexation, de la structure et de la vitesse pour plaire aux robots de Google."
    },
    {
        icon: <FileText className="w-8 h-8 text-sauge" />,
        title: "Contenu Stratégique",
        desc: "Rédaction optimisée pour répondre aux intentions de recherche et se positionner sur les bons mots-clés."
    },
    {
        icon: <Link2 className="w-8 h-8 text-sauge" />,
        title: "Autorité et Crédibilité",
        desc: "Campagnes de liens entrants ciblées pour renforcer votre notoriété auprès de Google."
    }
];

// FAQ sans gras dans les questions
const SEO_FAQ = [
    {
        question: "Combien de temps pour remonter dans Google ?",
        answer: "Le référencement est une course de fond. Les premiers résultats significatifs apparaissent entre 3 et 6 mois. C'est un investissement qui prend de la valeur chaque mois, contrairement à la publicité payante."
    },
    {
        question: "Proposez-vous un rapport de suivi ?",
        answer: "Chaque mois, vous recevez un rapport de performance transparent : évolution des positions, trafic qualifié et surtout, impact sur vos conversions business."
    },
    {
        question: "Travaillez-vous avec tous les secteurs d'activité ?",
        answer: "Principalement avec les services professionnels, e-commerce et entreprises locales. Chaque secteur a ses spécificités et l'approche est adaptée à votre marché."
    },
    {
        question: "Quelle différence avec une agence classique ?",
        answer: "Un interlocuteur unique spécialisé au lieu d'un compte partagé entre juniors. Plus de réactivité, plus de transparence et une vraie compréhension de vos enjeux business."
    }
];

// Contenu éducatif
const SEO_EDUCATION = [
    {
        title: "Comprendre le référencement naturel",
        content: "Le référencement naturel (SEO) consiste à optimiser votre site web pour qu'il apparaisse en première page de Google sur les mots-clés recherchés par vos clients potentiels. Contrairement à la publicité, vous ne payez pas pour chaque clic : une fois bien positionné, votre site génère du trafic gratuit en continu."
    },
    {
        title: "Les trois piliers du SEO",
        content: "Le technique (vitesse, structure, indexation), le contenu (textes optimisés, pertinence sémantique) et la popularité (liens entrants de sites de qualité). Ces trois piliers doivent être travaillés ensemble pour obtenir des résultats durables."
    },
    {
        title: "Pourquoi c'est un investissement rentable",
        content: "Un site bien référencé génère des contacts qualifiés 24h/24, 7j/7. Le coût par acquisition diminue avec le temps car le trafic organique est gratuit. C'est un actif digital qui prend de la valeur, contrairement à la publicité qui s'arrête dès que vous coupez le budget."
    }
];

export default function ReferencementNaturelPage() {
    const { openAuditModal } = useModal();

    return (
        <main className="bg-white min-h-screen">

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Consulting Référencement Naturel (SEO)",
                        "description": "Stratégies d'acquisition SEO sur-mesure pour augmenter votre trafic organique.",
                        "provider": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "url": "https://indhack.com"
                        },
                        "serviceType": "SEO Consulting",
                        "areaServed": "France"
                    })
                }}
            />

            <HeroServices
                title="Référencement Naturel : Performance et Visibilité"
                subtitle="Stratégies sur-mesure pour capturer le trafic qualifié et transformer votre visibilité en croissance durable."
                image="seo-dashboard"
                category="Acquisition Organique"
            />

            {/* Section Introduction */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-heading font-bold text-ink mb-6"
                        >
                            Plus qu'un simple <span className="text-sauge">classement</span>, une autorité
                        </motion.h2>
                        <p className="text-lg text-soft leading-relaxed">
                            Le référencement en 2026 n'est plus une question de répétition de mots-clés.
                            C'est une question d'expertise, d'expérience et de crédibilité reconnue par Google.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {SEO_PILLARS.map((pillar, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl hover:border-sauge/30 transition-all duration-300 h-full flex flex-col items-center text-center"
                            >
                                <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm text-sauge group-hover:scale-110 transition-transform duration-300">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-xl font-bold text-ink mb-4">{pillar.title}</h3>
                                <p className="text-soft leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Éducative */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <p className="text-sauge font-bold tracking-[0.2em] uppercase mb-4 text-sm">Comprendre</p>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">
                                Le référencement <span className="text-sauge">expliqué simplement</span>
                            </h2>
                        </div>

                        <div className="space-y-8">
                            {SEO_EDUCATION.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-8 rounded-3xl border border-gray-100"
                                >
                                    <h3 className="text-xl font-bold text-ink mb-4">{item.title}</h3>
                                    <p className="text-soft leading-relaxed">{item.content}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Résultats */}
            <section className="py-24 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                            Ce que le <span className="text-sauge">référencement</span> vous apporte
                        </h2>
                        <p className="text-lg text-white/50 mb-12">
                            Au-delà des positions, voici l'impact réel sur votre business.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                                <TrendingUp className="w-10 h-10 text-sauge mx-auto mb-4" />
                                <h4 className="text-xl font-bold mb-3">Trafic Qualifié</h4>
                                <p className="text-white/60 text-sm">Des visiteurs qui cherchent activement vos services, pas des curieux.</p>
                            </div>
                            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                                <Target className="w-10 h-10 text-sauge mx-auto mb-4" />
                                <h4 className="text-xl font-bold mb-3">Leads Préqualifiés</h4>
                                <p className="text-white/60 text-sm">Des contacts qui ont déjà compris votre valeur grâce à votre contenu.</p>
                            </div>
                            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                                <BarChart3 className="w-10 h-10 text-sauge mx-auto mb-4" />
                                <h4 className="text-xl font-bold mb-3">Croissance Durable</h4>
                                <p className="text-white/60 text-sm">Un actif qui génère des résultats même quand vous dormez.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FAQ items={SEO_FAQ} title="Questions sur le Référencement Naturel" />

            {/* CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="bg-ink p-12 md:p-16 rounded-3xl text-white">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                            Prêt à <span className="text-sauge">grimper</span> sur Google ?
                        </h2>
                        <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
                            Audit gratuit : découvrez où vous en êtes et comment atteindre la première page.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                onClick={openAuditModal}
                                className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-10 py-7 text-lg font-bold"
                            >
                                Audit gratuit
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Link href="/contact">
                                <Button
                                    variant="outline"
                                    className="border-2 border-white text-white hover:bg-white hover:text-ink rounded-full px-10 py-7 text-lg font-bold"
                                >
                                    Me contacter
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
