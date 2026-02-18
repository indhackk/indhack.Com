"use client";

import { HeroServices } from "@/components/services/HeroServices";
import { FAQ } from "@/components/FAQ";
import { RelatedServices } from "@/components/RelatedServices";
import { motion } from "framer-motion";
import { Search, FileText, Link2, BarChart3, ArrowRight, TrendingUp, Target, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { useModal } from "@/components/providers/ModalProvider";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";

const FEATURED_CITIES = [
    { name: "Nice", slug: "consultant-seo-nice" },
    { name: "Paris", slug: "consultant-seo-paris" },
    { name: "Lyon", slug: "consultant-seo-lyon" },
    { name: "Marseille", slug: "consultant-seo-marseille" },
    { name: "Bordeaux", slug: "consultant-seo-bordeaux" },
    { name: "Toulouse", slug: "consultant-seo-toulouse" },
];

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

const SEO_FAQ = [
    {
        question: "Combien de temps pour remonter dans Google ?",
        answer: "Le référencement est une course de fond. Les premiers résultats significatifs apparaissent entre 3 et 6 mois. C'est un **investissement qui prend de la valeur chaque mois**, contrairement à la publicité payante."
    },
    {
        question: "Proposez-vous un rapport de suivi ?",
        answer: "Chaque mois, vous recevez un rapport de performance transparent : évolution des positions, trafic qualifié et surtout, impact sur vos **conversions business**."
    },
    {
        question: "Travaillez-vous avec tous les secteurs d'activité ?",
        answer: "Principalement avec les services professionnels, e-commerce et entreprises locales. Chaque secteur a ses spécificités et l'approche est adaptée à votre marché."
    },
    {
        question: "Quelle différence avec une agence classique ?",
        answer: "Je suis votre unique interlocutrice. Pas de junior qui apprend sur votre dossier comme en agence. Juste une expertise Senior, de la réactivité directe et une implication personnelle dans votre réussite."
    },
    {
        question: "Combien coûte un accompagnement SEO ?",
        answer: "Un accompagnement mensuel se situe entre **500€ et 2000€/mois** selon l'ampleur du projet et le niveau de concurrence. L'investissement est calibré sur vos objectifs business et votre capacité à absorber la croissance."
    },
    {
        question: "Quelle différence entre SEO et SEA (Google Ads) ?",
        answer: "Le **SEO** travaille sur les résultats organiques (gratuits) - c'est un investissement long terme qui continue de rapporter. Le **SEA** affiche des annonces payantes - résultats immédiats mais coût par clic. Les deux sont complémentaires."
    },
    {
        question: "Garantissez-vous la première position Google ?",
        answer: "**Non, et méfiez-vous de ceux qui le promettent.** Google seul décide des classements. Ce que je garantis : une méthodologie rigoureuse, un travail transparent et une amélioration mesurable de votre visibilité."
    },
    {
        question: "Mon site est nouveau, peut-on faire du SEO ?",
        answer: "C'est même le **meilleur moment** ! Un site nouveau peut être conçu avec une architecture SEO optimale dès le départ. Google met quelques mois à faire confiance, mais des fondations solides accélèrent les résultats."
    }
];

const SEO_EDUCATION = [
    {
        title: "Comprendre le référencement naturel",
        content: "Le référencement naturel (SEO) consiste à optimiser votre site web pour qu'il apparaisse en **première page de Google** sur les mots-clés recherchés par vos clients potentiels. Contrairement à la publicité, vous ne payez pas pour chaque clic : une fois bien positionné, votre site génère du trafic gratuit en continu."
    },
    {
        title: "Les trois piliers du SEO",
        content: "Le technique (vitesse, structure, indexation), le contenu (textes optimisés, pertinence sémantique) et la popularité (liens entrants de sites de qualité). Ces trois piliers doivent être travaillés ensemble pour obtenir des résultats durables."
    },
    {
        title: "Pourquoi c'est un investissement rentable",
        content: "Un site bien référencé génère des contacts qualifiés 24h/24, 7j/7. Le coût par acquisition diminue avec le temps car le trafic organique est gratuit. C'est un **actif digital qui prend de la valeur**, contrairement à la publicité qui s'arrête dès que vous coupez le budget."
    }
];

export default function ReferencementClient() {
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
                title="Arrêtez de payer pour chaque clic. Dominez Google."
                subtitle="Vos concurrents captent vos clients sur Google pendant que vous payez la publicité. Le référencement naturel vous fait passer devant eux, définitivement."
                image="seo-dashboard"
                category="Croissance Organique"
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
                            C'est une question d'<strong>expertise</strong>, d'expérience et de <strong>crédibilité</strong> reconnue par Google.
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
                                    <div className="text-soft leading-relaxed">
                                        <ReactMarkdown>{item.content}</ReactMarkdown>
                                    </div>
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

            {/* Section SEO Local - Maillage vers pages villes */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="text-sauge font-bold tracking-[0.2em] uppercase mb-4 text-sm">Proximité</p>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                                Référencement <span className="text-sauge">local</span> pour entreprises ambitieuses
                            </h2>
                            <p className="text-lg text-soft max-w-2xl mx-auto">
                                Dominez les recherches "près de chez moi" et captez les clients de votre zone géographique.
                                Le <Link href="/seo-local" className="text-sauge hover:underline font-semibold">SEO local</Link> combine optimisation Google Business Profile et référencement de proximité.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                <MapPin className="w-10 h-10 text-sauge mb-4" />
                                <h3 className="text-xl font-bold text-ink mb-3">Google Business Profile</h3>
                                <p className="text-soft mb-4">
                                    Optimisation complète de votre fiche pour apparaître dans le <strong>Local Pack</strong> (les 3 résultats locaux en haut de Google).
                                </p>
                                <Link href="/seo-local" className="text-sauge font-semibold hover:underline inline-flex items-center gap-2">
                                    Découvrir le SEO Local <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                <Search className="w-10 h-10 text-sauge mb-4" />
                                <h3 className="text-xl font-bold text-ink mb-3">Pages Locales Optimisées</h3>
                                <p className="text-soft mb-4">
                                    Création de contenus géo-ciblés pour vous positionner sur les requêtes locales de votre secteur d'activité.
                                </p>
                                <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline inline-flex items-center gap-2">
                                    Mon expertise consultant SEO <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-soft mb-4">J'accompagne des entreprises dans toute la France :</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {FEATURED_CITIES.map((city) => (
                                    <Link
                                        key={city.slug}
                                        href={`/${city.slug}`}
                                        className="px-4 py-2 bg-sauge/10 text-sauge rounded-full text-sm font-medium hover:bg-sauge hover:text-white transition-all"
                                    >
                                        SEO {city.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/seo-local"
                                    className="px-4 py-2 bg-ink text-white rounded-full text-sm font-medium hover:bg-sauge transition-all"
                                >
                                    Toutes les villes →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles liés */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            Approfondir le sujet
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Link href="/blog/seo-vs-sea-que-choisir" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    SEO vs SEA : que choisir ?
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Comparatif complet : coûts, délais, ROI. Guide pour faire le bon choix.
                                </p>
                            </Link>
                            <Link href="/blog/google-business-profile-guide-complet" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Google Business Profile : guide complet
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Optimisez votre fiche pour dominer le pack local.
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Outils SEO Gratuits */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-heading font-bold text-ink mb-6">
                        Testez vos performances <span className="text-sauge">gratuitement</span>
                    </h2>
                    <p className="text-soft mb-8 max-w-2xl mx-auto">
                        Avant de vous engager, utilisez mes outils d'analyse pour faire un état des lieux de votre site.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/outils/audit-seo-gratuit" className="inline-flex items-center justify-center px-6 py-3 bg-sauge text-white rounded-full font-bold hover:bg-ink transition-colors">
                            Audit SEO gratuit
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                        <Link href="/outils" className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 rounded-full text-ink font-bold hover:border-sauge hover:text-sauge transition-colors bg-gray-50">
                            Voir tous les outils
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <FAQ items={SEO_FAQ} title="Questions sur le Référencement Naturel" />

            {/* Services complémentaires */}
            <RelatedServices currentService="referencement-naturel" />

            {/* Lien vers la page d'accueil - Maillage interne SEO */}
            <HomepageBacklink variant="default" />

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
