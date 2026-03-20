"use client";

import { HeroServices } from "@/components/services/HeroServices";
import { FAQ } from "@/components/FAQ";
import { RelatedServices } from "@/components/RelatedServices";
import { motion } from "framer-motion";
import { Instagram, Linkedin, TrendingUp, MessageCircle, ArrowRight, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";

const SOCIAL_SERVICES = [
    {
        icon: <Instagram className="w-8 h-8 text-sauge" />,
        title: "Gestion Instagram et TikTok",
        desc: "Création de contenu engageant, reels, stories stratégiques. Croissance organique et communauté active."
    },
    {
        icon: <Linkedin className="w-8 h-8 text-sauge" />,
        title: "LinkedIn Professionnel",
        desc: "Positionnement expert, image de marque personnelle, génération de contacts qualifiés pour les entreprises."
    },
    {
        icon: <MessageCircle className="w-8 h-8 text-sauge" />,
        title: "Animation de Communauté",
        desc: "Modération, réponses aux commentaires et messages, gestion de crise, animation quotidienne."
    },
    {
        icon: <BarChart3 className="w-8 h-8 text-sauge" />,
        title: "Stratégie sur Données",
        desc: "Analyse des indicateurs clés, tests comparatifs, optimisation continue basée sur les performances réelles."
    }
];

const CM_PROCESS = [
    {
        step: "Audit et Stratégie",
        desc: "Analyse de votre présence actuelle, positionnement des concurrents, définition des cibles et objectifs mesurables."
    },
    {
        step: "Calendrier de Publication",
        desc: "Planification mensuelle des publications : thématiques, formats, fréquence optimisée par plateforme."
    },
    {
        step: "Création de Contenu",
        desc: "Visuels professionnels, textes accrocheurs, mots-clés stratégiques, appels à l'action efficaces."
    },
    {
        step: "Publication et Animation",
        desc: "Programmation automatisée, modération en temps réel, réponses personnalisées aux messages."
    },
    {
        step: "Reporting Mensuel",
        desc: "Tableau de bord complet : croissance, engagement, portée, conversions. Recommandations d'amélioration."
    }
];

const CommunityManagerFAQ = [
    {
        question: "Pourquoi externaliser la gestion de mes réseaux sociaux ?",
        answer: "Parce que gérer efficacement les réseaux sociaux demande 4 à 6h par jour : création de contenu, veille, engagement, analyse. Externaliser libère votre temps pour vous concentrer sur votre cœur de métier."
    },
    {
        question: "Quelles plateformes maîtrisez-vous ?",
        answer: "Les essentielles : Instagram (engagement et vente), TikTok (croissance virale), LinkedIn (professionnel), et Facebook (communautés locales). Également X/Twitter, Pinterest et YouTube selon vos besoins."
    },
    {
        question: "Combien de publications par semaine ?",
        answer: "Cela dépend de la plateforme : Instagram (3-5 posts + stories quotidiennes), TikTok (5-7 vidéos pour l'algorithme), LinkedIn (3-4 posts professionnels). La fréquence optimale est définie lors de l'audit initial."
    },
    {
        question: "Comment mesurez-vous le retour sur investissement ?",
        answer: "Plusieurs indicateurs : taux d'engagement, croissance de communauté, portée, clics vers votre site, et surtout **conversions** (ventes, contacts, rendez-vous). Reporting mensuel transparent avec recommandations."
    },
    {
        question: "Créez-vous aussi du contenu vidéo ?",
        answer: "Oui ! Reels Instagram, TikToks, vidéos explicatives courtes. Pour une production plus complexe (interviews, animations), collaboration avec des vidéastes de confiance."
    },
    {
        question: "Combien coûte un community manager ?",
        answer: "Les forfaits démarrent à partir de **150€** pour des interventions ponctuelles. Un accompagnement complet multi-plateformes avec création de contenu vidéo est réalisé **sur devis**, en fonction de vos besoins."
    },
    {
        question: "Comment se passe la collaboration au quotidien ?",
        answer: "Je propose un calendrier éditorial mensuel validé ensemble. Vous gardez le contrôle éditorial, je m'occupe de l'exécution. Communication via un outil dédié (Notion, Slack) pour valider les contenus avant publication."
    },
    {
        question: "Les réseaux sociaux remplacent-ils le SEO ?",
        answer: "Non, ils sont **complémentaires**. Les réseaux sociaux génèrent de la visibilité immédiate et du relationnel, le SEO apporte du trafic qualifié durable. L'idéal est de combiner les deux pour une stratégie d'acquisition complète."
    }
];

export default function CommunityManagerClient() {
    const { openAuditModal } = useModal();

    return (
        <main className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        "name": "IndHack - Gestion Réseaux Sociaux",
                        "description": "Gestion de réseaux sociaux : Instagram, TikTok, LinkedIn. Création de contenu et animation de communauté.",
                        "url": "https://indhack.com/community-manager",
                        "telephone": "+33661139748",
                        "priceRange": "€€",
                        "serviceType": ["Gestion Réseaux Sociaux", "Instagram", "Stratégie Digitale"],
                        "areaServed": { "@type": "Country", "name": "France" }
                    })
                }}
            />

            <HeroServices
                title="Gestion de Réseaux Sociaux : Transformez votre Présence Digitale"
                subtitle="Stratégie complète, création de contenu engageant et animation de communauté. Vos réseaux sociaux deviennent un vrai levier de croissance."
                image="seo-dashboard"
                category="Réseaux Sociaux"
            />

            {/* Services */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Vos réseaux sociaux <span className="text-sauge">dorment</span> ?
                        </h2>
                        <p className="text-lg text-soft">
                            Votre audience est sur Instagram, TikTok ou LinkedIn, mais vous n'avez ni le temps ni l'expertise
                            pour créer du contenu engageant. Résultat : faible visibilité et opportunités manquées.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {SOCIAL_SERVICES.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl hover:border-sauge/30 transition-all group"
                            >
                                <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:bg-sauge group-hover:scale-110 transition-all duration-300">
                                    <div className="group-hover:text-white transition-colors">
                                        {service.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-ink mb-3">{service.title}</h3>
                                <p className="text-soft text-sm">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Méthodologie */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <p className="text-sauge font-bold tracking-[0.2em] uppercase mb-4 text-sm">Processus</p>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">
                            Comment ça <span className="text-sauge">fonctionne</span>
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {CM_PROCESS.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-6 items-start p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all group"
                            >
                                <div className="w-12 h-12 rounded-full bg-sauge/10 flex items-center justify-center text-sauge font-bold group-hover:bg-sauge group-hover:text-white transition-all">
                                    {i + 1}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-ink mb-2">{step.step}</h4>
                                    <p className="text-soft">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact */}
            <section className="py-16 md:py-20 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                            Ce que les <span className="text-sauge">réseaux sociaux</span> apportent
                        </h2>
                        <p className="text-lg text-white/50 mb-12">
                            Au-delà des likes, voici l'impact réel d'une <strong>stratégie bien menée</strong>.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                                <h4 className="text-xl font-bold mb-3">Notoriété de Marque</h4>
                                <p className="text-white/60 text-sm">Présence cohérente et mémorable qui transforme votre audience en ambassadeurs.</p>
                            </div>
                            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                                <h4 className="text-xl font-bold mb-3">Génération de Contacts</h4>
                                <p className="text-white/60 text-sm">Convertir les interactions en opportunités business via des appels à l'action stratégiques.</p>
                            </div>
                            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                                <h4 className="text-xl font-bold mb-3">Relation Client</h4>
                                <p className="text-white/60 text-sm">Créer une communauté engagée qui dialogue avec votre marque et reste fidèle.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FAQ items={CommunityManagerFAQ} title="Questions sur la Gestion de Réseaux Sociaux" />

            {/* Services complémentaires */}
            <RelatedServices currentService="community-manager" />

            {/* Lien vers la page d'accueil - Maillage interne SEO */}
            <HomepageBacklink variant="default" />

            {/* CTA */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="bg-ink p-12 md:p-16 rounded-3xl text-white">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                            Prêt à <span className="text-sauge">exploser</span> sur les réseaux ?
                        </h2>
                        <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
                            Audit réseaux sociaux offert : découvrez comment doubler votre engagement en 30 jours.
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
                                    Discutons de votre projet
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
