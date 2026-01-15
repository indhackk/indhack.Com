"use client";

import { HeroServices } from "@/components/services/HeroServices";
import { FAQ } from "@/components/FAQ";
import { RelatedServices } from "@/components/RelatedServices";
import { motion } from "framer-motion";
import { Search, BarChart4, ClipboardList, Target, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";

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
        answer: "Vous recevez un rapport structuré avec une <strong>roadmap opérationnelle</strong>. Pas de blabla inutile : des recommandations concrètes, priorisées par impact business et facilité d'implémentation."
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
                        <AuditPoint title="Rigueur Pro" text="Je n'utilise pas d'outils automatisés génériques. Chaque audit est une <strong>analyse manuelle et experte</strong>." />
                        <AuditPoint title="Focus Business" text="Je ne liste pas d'erreurs gratuites. Je me focalise sur ce qui <strong>empêche vos ventes</strong> et vos conversions." />
                        <AuditPoint title="Accompagnement" text="Je vous explique chaque recommandation pour que vous puissiez l'implémenter sereinement." />
                    </div>
                </div>
            </section>

            <FAQ items={AUDIT_FAQ} title="Questions sur l'audit SEO" />

            {/* Services complémentaires */}
            <RelatedServices currentService="audit-seo" />

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
            <p className="text-soft leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    )
}
