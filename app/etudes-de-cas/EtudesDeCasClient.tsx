"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";
import {
    TrendingUp,
    ArrowRight,
    CheckCircle2,
    Target,
    BarChart3,
    Users,
    MapPin,
    Search,
    Calendar,
    Briefcase
} from "lucide-react";
import { useModal } from "@/components/providers/ModalProvider";

const CASE_STUDIES = [
    {
        id: 1,
        title: "Cabinet d'Avocats Nice",
        sector: "Services Juridiques",
        location: "Nice (06)",
        duration: "6 mois",
        context: "Un cabinet d'avocats familial souhaitait développer sa visibilité en ligne face à une concurrence accrue des grands cabinets parisiens implantés sur la Côte d'Azur.",
        problem: "Site vieillissant non optimisé, 0 visibilité sur Google, dépendance au bouche-à-oreille et aux annuaires payants. Aucune stratégie digitale en place.",
        solution: [
            "Audit SEO complet et refonte technique du site",
            "Création de pages optimisées par domaine d'expertise (droit de la famille, droit des affaires, etc.)",
            "Optimisation Google Business Profile et stratégie d'avis clients",
            "Netlinking local avec partenaires du barreau"
        ],
        results: {
            traffic: "+340%",
            leads: "15-20/mois",
            positions: "Top 3",
            roi: "x8"
        },
        testimonial: "En 6 mois, nous avons doublé notre nombre de consultations. Le SEO est devenu notre premier canal d'acquisition.",
        services: ["/audit-seo", "/referencement-naturel", "/seo-local"]
    },
    {
        id: 2,
        title: "E-commerce Mode Éthique",
        sector: "E-commerce",
        location: "France",
        duration: "8 mois",
        context: "Une marque de mode éthique en ligne cherchait à se démarquer sur un marché ultra-concurrentiel dominé par les géants du secteur.",
        problem: "Faible trafic organique malgré un bon produit. Dépendance à 90% aux publicités payantes. Coût d'acquisition client élevé (45€/client).",
        solution: [
            "Restructuration complète de l'architecture du site",
            "Création de contenus SEO sur la mode responsable (30+ articles)",
            "Optimisation des fiches produits avec mots-clés longue traîne",
            "Campagne de netlinking auprès de blogs mode et lifestyle"
        ],
        results: {
            traffic: "+520%",
            leads: "CAC divisé par 3",
            positions: "50+ mots-clés P1",
            roi: "x12"
        },
        testimonial: "Le SEO nous a permis de réduire notre dépendance aux ads. Aujourd'hui, 60% de notre trafic est organique.",
        services: ["/audit-seo", "/referencement-naturel", "/creation-site-web"]
    },
    {
        id: 3,
        title: "Artisan Plombier Marseille",
        sector: "Artisanat BTP",
        location: "Marseille (13)",
        duration: "4 mois",
        context: "Un plombier indépendant avec 15 ans d'expérience souhaitait arrêter de payer des leads hors de prix sur les plateformes d'artisans.",
        problem: "Aucune présence en ligne. 100% des leads venaient de plateformes payantes (coût moyen : 35€/lead). Pas de site web professionnel.",
        solution: [
            "Création d'un site vitrine optimisé SEO",
            "Optimisation Google Business Profile avec photos travaux",
            "Stratégie de collecte et réponse aux avis clients",
            "Pages locales ciblées (quartiers de Marseille)"
        ],
        results: {
            traffic: "De 0 à 800 visites/mois",
            leads: "25-30/mois",
            positions: "Pack Local #1",
            roi: "x15"
        },
        testimonial: "Je n'achète plus aucun lead. Les clients m'appellent directement depuis Google. Mon chiffre d'affaires a augmenté de 40%.",
        services: ["/creation-site-web", "/seo-local", "/consultant-seo-marseille"]
    }
];

export default function EtudesDeCasClient() {
    const { openAuditModal } = useModal();

    return (
        <main className="bg-white">
            {/* Hero */}
            <section className="bg-ink text-white pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <p className="text-sauge font-medium mb-4 text-sm uppercase tracking-wider">
                                Résultats Concrets
                            </p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                                Des <span className="text-sauge">résultats mesurables</span>,
                                <br />pas des promesses en l'air
                            </h1>
                            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
                                Découvrez comment j'ai aidé des entreprises comme la vôtre à dominer Google
                                et transformer leur visibilité en chiffre d'affaires.
                            </p>

                            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
                                <span className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-sauge" />
                                    +300% trafic moyen
                                </span>
                                <span className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-sauge" />
                                    ROI x10 moyen
                                </span>
                                <span className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-sauge" />
                                    50+ clients accompagnés
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto space-y-16">
                        {CASE_STUDIES.map((study, index) => (
                            <motion.article
                                key={study.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100"
                            >
                                {/* Header */}
                                <div className="bg-ink text-white p-8">
                                    <div className="flex flex-wrap gap-4 mb-4">
                                        <span className="flex items-center gap-2 text-sm text-white/60">
                                            <Briefcase className="w-4 h-4" />
                                            {study.sector}
                                        </span>
                                        <span className="flex items-center gap-2 text-sm text-white/60">
                                            <MapPin className="w-4 h-4" />
                                            {study.location}
                                        </span>
                                        <span className="flex items-center gap-2 text-sm text-white/60">
                                            <Calendar className="w-4 h-4" />
                                            {study.duration}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-heading font-bold">
                                        {study.title}
                                    </h2>
                                </div>

                                {/* Content */}
                                <div className="p-8 space-y-8">
                                    {/* Context */}
                                    <div>
                                        <h3 className="text-lg font-bold text-ink mb-3 flex items-center gap-2">
                                            <Search className="w-5 h-5 text-sauge" />
                                            Contexte
                                        </h3>
                                        <p className="text-soft">{study.context}</p>
                                    </div>

                                    {/* Problem */}
                                    <div>
                                        <h3 className="text-lg font-bold text-ink mb-3 flex items-center gap-2">
                                            <Target className="w-5 h-5 text-sauge" />
                                            Problématique
                                        </h3>
                                        <p className="text-soft">{study.problem}</p>
                                    </div>

                                    {/* Solution */}
                                    <div>
                                        <h3 className="text-lg font-bold text-ink mb-3 flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-sauge" />
                                            Solution mise en place
                                        </h3>
                                        <ul className="space-y-2">
                                            {study.solution.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-soft">
                                                    <ArrowRight className="w-4 h-4 text-sauge flex-shrink-0 mt-1" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Results */}
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100">
                                        <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                                            <BarChart3 className="w-5 h-5 text-sauge" />
                                            Résultats obtenus
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="text-center p-4 bg-sauge/10 rounded-xl">
                                                <p className="text-2xl font-bold text-sauge">{study.results.traffic}</p>
                                                <p className="text-xs text-soft mt-1">Trafic organique</p>
                                            </div>
                                            <div className="text-center p-4 bg-sauge/10 rounded-xl">
                                                <p className="text-2xl font-bold text-sauge">{study.results.leads}</p>
                                                <p className="text-xs text-soft mt-1">Leads générés</p>
                                            </div>
                                            <div className="text-center p-4 bg-sauge/10 rounded-xl">
                                                <p className="text-2xl font-bold text-sauge">{study.results.positions}</p>
                                                <p className="text-xs text-soft mt-1">Positions Google</p>
                                            </div>
                                            <div className="text-center p-4 bg-sauge/10 rounded-xl">
                                                <p className="text-2xl font-bold text-sauge">{study.results.roi}</p>
                                                <p className="text-xs text-soft mt-1">ROI</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Testimonial */}
                                    <blockquote className="border-l-4 border-sauge pl-6 py-2 italic text-soft">
                                        "{study.testimonial}"
                                    </blockquote>

                                    {/* Services used */}
                                    <div className="flex flex-wrap gap-2">
                                        {study.services.map((service) => (
                                            <Link
                                                key={service}
                                                href={service}
                                                className="px-4 py-2 bg-ink text-white rounded-full text-sm hover:bg-sauge transition-colors"
                                            >
                                                {service.replace("/", "").replace(/-/g, " ")}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Links */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-6">
                            Services utilisés dans ces <span className="text-sauge">études de cas</span>
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <Link href="/audit-seo" className="px-6 py-3 bg-white border border-gray-200 rounded-full hover:border-sauge hover:text-sauge transition-all font-medium">
                                Audit SEO
                            </Link>
                            <Link href="/referencement-naturel" className="px-6 py-3 bg-white border border-gray-200 rounded-full hover:border-sauge hover:text-sauge transition-all font-medium">
                                Référencement Naturel
                            </Link>
                            <Link href="/seo-local" className="px-6 py-3 bg-white border border-gray-200 rounded-full hover:border-sauge hover:text-sauge transition-all font-medium">
                                SEO Local
                            </Link>
                            <Link href="/creation-site-web" className="px-6 py-3 bg-white border border-gray-200 rounded-full hover:border-sauge hover:text-sauge transition-all font-medium">
                                Création de Site Web
                            </Link>
                            <Link href="/refonte-site-web" className="px-6 py-3 bg-white border border-gray-200 rounded-full hover:border-sauge hover:text-sauge transition-all font-medium">
                                Refonte de Site
                            </Link>
                        </div>
                        <p className="text-soft">
                            Vous souhaitez obtenir des résultats similaires ?
                            <Link href="/contact" className="text-sauge hover:underline">Contactez-moi</Link> pour un audit gratuit.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-ink text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                            Prêt à écrire votre <span className="text-sauge">success story</span> ?
                        </h2>
                        <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                            Audit gratuit et sans engagement. Découvrez votre potentiel de croissance.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                onClick={openAuditModal}
                                className="bg-sauge hover:bg-white hover:text-ink text-white px-8 py-6 rounded-xl text-lg font-semibold"
                            >
                                Audit SEO Gratuit
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Link href="/contact">
                                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ink px-8 py-6 rounded-xl text-lg">
                                    Me contacter
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <HomepageBacklink variant="default" />
        </main>
    );
}
