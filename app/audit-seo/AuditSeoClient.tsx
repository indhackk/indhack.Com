"use client";

import { HeroServices } from "@/components/services/HeroServices";
import { FAQ } from "@/components/FAQ";
import { RelatedServices } from "@/components/RelatedServices";
import { motion } from "framer-motion";
import { Search, BarChart4, ClipboardList, Target, ArrowRight, CheckCircle2, AlertTriangle, MapPin, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";

const FEATURED_CITIES = [
    { name: "Nice", slug: "consultant-seo-nice" },
    { name: "Paris", slug: "consultant-seo-paris" },
    { name: "Lyon", slug: "consultant-seo-lyon" },
    { name: "Marseille", slug: "consultant-seo-marseille" },
];

const AUDIT_FEATURES = [
    {
        icon: <Search className="w-8 h-8 text-sauge" />,
        title: "Analyse Technique",
        desc: "Crawl profond de votre site pour identifier les erreurs invisibles : indexation, redirections, vitesse de chargement."
    },
    {
        icon: <BarChart4 className="w-8 h-8 text-sauge" />,
        title: "Audit Sémantique",
        desc: "Analyse de vos mots-clés stratégiques et de la pertinence de vos contenus face aux intentions de recherche."
    },
    {
        icon: <ClipboardList className="w-8 h-8 text-sauge" />,
        title: "Profil de Backlinks",
        desc: "Évaluation de la puissance et de la santé de votre Netlinking. Nettoyage et stratégie d'autorité."
    },
    {
        icon: <Target className="w-8 h-8 text-sauge" />,
        title: "Roadmap Priorisée",
        desc: "Un plan d'action concret avec les interventions à ROI immédiat et les chantiers de fond."
    }
];

const AUDIT_FAQ = [
    {
        question: "Pourquoi faire un audit SEO avant de lancer une stratégie ?",
        answer: "C'est comme le diagnostic d'un médecin. Sans audit, on risque d'investir du temps et de l'argent sur des pages qui ne pourront jamais ranker à cause de blocages techniques invisibles."
    },
    {
        question: "L'audit inclut-il une analyse de la concurrence ?",
        answer: "Oui, systématiquement. Je décortique la stratégie de vos concurrents directs pour comprendre comment ils captent votre trafic et identifier leurs failles."
    },
    {
        question: "Sous quel format est livré l'audit SEO ?",
        answer: "Vous recevez un rapport structuré avec une **roadmap opérationnelle**. Pas de blabla inutile : des recommandations concrètes, priorisées par impact business et facilité d'implémentation."
    },
    {
        question: "Combien coûte un audit SEO ?",
        answer: "Un audit complet démarre à partir de **500€** pour un site vitrine. Le tarif varie selon la taille du site et la profondeur d'analyse requise. Je propose un premier diagnostic gratuit pour évaluer précisément vos besoins."
    },
    {
        question: "Combien de temps dure un audit SEO complet ?",
        answer: "Comptez **5 à 10 jours ouvrés** selon la complexité de votre site. Je préfère prendre le temps d'une analyse approfondie plutôt que de livrer un rapport automatisé superficiel."
    },
    {
        question: "Que contient le rapport d'audit ?",
        answer: "Le rapport inclut : analyse technique (indexation, vitesse, Core Web Vitals), audit sémantique (mots-clés, contenu), profil de backlinks, benchmark concurrentiel, et surtout une **roadmap priorisée** avec les actions à mener classées par impact."
    }
];

export default function AuditSeoClient() {
    const { openAuditModal } = useModal();

    return (
        <main className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Audit SEO Complet",
                        "description": "Audit technique et sémantique approfondi pour identifier les bloquants SEO de votre site.",
                        "provider": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "url": "https://indhack.com"
                        },
                        "areaServed": "France",
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Audits SEO",
                            "itemListElement": [
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Audit Technique" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Audit Sémantique" } }
                            ]
                        }
                    })
                }}
            />

            <HeroServices
                title="Votre site a un problème. L'audit SEO le révèle."
                subtitle="Vous investissez du temps et de l'argent dans votre site, mais les résultats ne suivent pas ? Des blocages invisibles freinent votre croissance. Je les trouve."
                image="audit-seo"
                category="Diagnostic & Stratégie"
            />

            {/* Hook - Problème */}
            <section className="py-12 bg-amber-50 border-y border-amber-200">
                <div className="container mx-auto px-4">
                    <div className="flex items-start gap-4 max-w-3xl mx-auto">
                        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                            <p className="text-amber-900 font-medium">
                                <strong>72% des sites</strong> ont des erreurs techniques qui les empêchent de ranker.
                                Sans audit, vous optimisez peut-être des pages qui ne pourront jamais atteindre la première page.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-heading font-bold text-ink uppercase tracking-tighter"
                        >
                            Une analyse <span className="text-sauge">stratégique</span>
                        </motion.h2>
                        <p className="text-xl text-soft leading-relaxed max-w-3xl mx-auto">
                            L'audit SEO n'est pas une simple liste d'erreurs techniques. C'est une <strong>feuille de route détaillée</strong> pour aligner votre site avec les attentes de Google et de vos clients.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {AUDIT_FEATURES.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:border-sauge/30 hover:shadow-2xl transition-all group"
                            >
                                <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:bg-sauge group-hover:text-white group-hover:rotate-12 transition-all duration-500">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-ink mb-4 transition-colors group-hover:text-sauge uppercase tracking-tight">{feature.title}</h3>
                                <p className="text-soft leading-relaxed text-sm">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-ink mb-16 uppercase tracking-tighter">
                        Pourquoi IndHack pour votre <span className="text-sauge">Audit</span> ?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        <AuditPoint title="Rigueur Pro" text="Je n'utilise pas d'outils automatisés génériques. Chaque audit est une analyse manuelle et experte." />
                        <AuditPoint title="Focus Business" text="Je ne liste pas d'erreurs gratuites. Je me focalise sur ce qui empêche vos ventes et vos conversions." />
                        <AuditPoint title="Accompagnement" text="Je vous explique chaque recommandation pour que vous puissiez l'implémenter sereinement." />
                    </div>
                </div>
            </section>

            {/* Section Types d'audit et Maillage */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                                Audit adapté à <span className="text-sauge">votre situation</span>
                            </h2>
                            <p className="text-lg text-soft max-w-2xl mx-auto">
                                Que vous soyez une entreprise locale ou nationale, un e-commerce ou un site vitrine,
                                l'audit est personnalisé selon vos objectifs.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-sauge transition-all">
                                <MapPin className="w-10 h-10 text-sauge mb-4" />
                                <h3 className="text-xl font-bold text-ink mb-3">Audit SEO Local</h3>
                                <p className="text-soft mb-4">
                                    Pour les entreprises qui ciblent une zone géographique précise. Analyse de votre
                                    <strong>Google Business Profile</strong>, positionnement local et stratégie de proximité.
                                </p>
                                <Link href="/seo-local" className="text-sauge font-semibold hover:underline inline-flex items-center gap-2">
                                    Découvrir le SEO Local <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-sauge transition-all">
                                <FileText className="w-10 h-10 text-sauge mb-4" />
                                <h3 className="text-xl font-bold text-ink mb-3">Audit Technique Complet</h3>
                                <p className="text-soft mb-4">
                                    Analyse en profondeur de l'architecture, de la vitesse, de l'indexation et des Core Web Vitals.
                                    Idéal avant une <Link href="/refonte-site-web" className="text-sauge hover:underline">refonte de site</Link>.
                                </p>
                                <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline inline-flex items-center gap-2">
                                    En savoir plus sur mes services <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="bg-ink p-8 rounded-2xl text-white">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Besoin d'un audit dans votre ville ?</h3>
                                    <p className="text-white/70">
                                        J'accompagne des entreprises dans toute la France avec une expertise particulière sur la Côte d'Azur.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {FEATURED_CITIES.map((city) => (
                                        <Link
                                            key={city.slug}
                                            href={`/${city.slug}`}
                                            className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-sauge transition-all"
                                        >
                                            {city.name}
                                        </Link>
                                    ))}
                                    <Link
                                        href="/seo-local"
                                        className="px-4 py-2 bg-sauge text-white rounded-full text-sm font-medium hover:bg-white hover:text-ink transition-all"
                                    >
                                        Toutes les villes →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Outil gratuit - Maillage */}
            <section className="py-12 bg-sauge/5 border-y border-sauge/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-sauge font-bold text-sm uppercase tracking-wider mb-3">Outil Gratuit</p>
                        <h2 className="text-2xl font-heading font-bold text-ink mb-4">
                            Testez votre site gratuitement
                        </h2>
                        <p className="text-soft mb-6">
                            Obtenez un premier aperçu de la santé SEO de votre site en 30 secondes avec mon outil d'audit gratuit.
                        </p>
                        <Link href="/outils/audit-seo-gratuit" className="inline-flex items-center gap-2 bg-sauge text-white px-6 py-3 rounded-xl font-semibold hover:bg-ink transition-all">
                            Lancer l'audit gratuit <ArrowRight className="w-4 h-4" />
                        </Link>
                        <p className="text-sm text-soft mt-4">
                            <Link href="/outils" className="text-sauge hover:underline">Voir tous mes outils SEO gratuits →</Link>
                        </p>
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
                            <Link href="/blog/contenu-rapport-audit-seo" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Audit SEO : que contient le rapport ?
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Découvrez en détail ce que contient un rapport d'audit SEO professionnel.
                                </p>
                            </Link>
                            <Link href="/blog/importance-audit-seo" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Pourquoi l'audit SEO est le point de départ
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Ne naviguez plus à vue. L'audit est l'investissement le plus rentable.
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
                        Besoin d'un premier avis rapide ? Utilisez mes outils d'audit instantané.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/outils" className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 rounded-full text-ink font-bold hover:border-sauge hover:text-sauge transition-colors bg-gray-50">
                            <span className="mr-2">🛠️</span> Voir tous les outils SEO
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <FAQ items={AUDIT_FAQ} title="Questions sur l'audit SEO" />

            {/* Services complémentaires */}
            <RelatedServices currentService="audit-seo" />

            {/* Lien vers la page d'accueil - Maillage interne SEO */}
            <HomepageBacklink variant="default" />

            {/* Final CTA */}
            <section className="py-24 bg-white text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-ink p-16 rounded-[4rem] text-white overflow-hidden relative group">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sauge/20 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-1000" />

                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 uppercase tracking-tighter relative z-10">
                            Passez à l'étape <br />
                            <span className="text-sauge">supérieure</span>.
                        </h2>
                        <p className="text-xl text-white/50 mb-12 max-w-xl mx-auto relative z-10">
                            Obtenez un état des lieux clair de votre site et un plan d'action chiffré.
                        </p>
                        <div className="relative z-10">
                            <Button
                                onClick={openAuditModal}
                                size="lg"
                                className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-12 py-8 text-xl font-bold shadow-xl shadow-sauge/20"
                            >
                                COMMANDER MON AUDIT
                                <ArrowRight className="ml-3 w-6 h-6" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}

function AuditPoint({ title, text }: { title: string, text: string }) {
    return (
        <div className="space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-sauge/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-sauge" />
            </div>
            <h4 className="text-2xl font-bold text-ink uppercase tracking-tight">{title}</h4>
            <div className="text-soft leading-relaxed">
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>
        </div>
    )
}
