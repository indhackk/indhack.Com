"use client";

import { HeroServices } from "@/components/services/HeroServices";
import { FAQ } from "@/components/FAQ";
import { RelatedServices } from "@/components/RelatedServices";
import { motion } from "framer-motion";
import { RefreshCw, ShieldCheck, Zap, BarChart3, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { useModal } from "@/components/providers/ModalProvider";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";
import Link from "next/link";
import { MapPin, CheckCircle2 } from "lucide-react";
import { FRENCH_CITIES } from "@/lib/cities-data";

// Toutes les villes actives (19) — maillage cocon complet
const FEATURED_CITIES = FRENCH_CITIES.map((c) => ({
    name: c.name,
    slug: c.slug,
}));

const REFONTE_FEATURES = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-sauge" />,
        title: "Sécurisation du SEO",
        desc: "Plan de redirection 301 strict pour conserver 100 % de votre historique de positionnement. 45 points de contrôle avant migration."
    },
    {
        icon: <Zap className="w-8 h-8 text-sauge" />,
        title: "Core Web Vitals 2026",
        desc: "Nouveau site conforme LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1. Performance 90+ PageSpeed garantie."
    },
    {
        icon: <RefreshCw className="w-8 h-8 text-sauge" />,
        title: "Migration sémantique + GEO",
        desc: "Refonte de l'arborescence pour une structure cocon, optimisée pour la citation par ChatGPT, Perplexity, Claude et Google AI Mode."
    },
    {
        icon: <BarChart3 className="w-8 h-8 text-sauge" />,
        title: "Surveillance 90 jours",
        desc: "Monitoring quotidien des positions Google, Core Web Vitals et couverture Search Console. Alerte automatique si chute > 5 %."
    }
];

// Les 3 chiffres clés 2026 — preuves sociales chiffrées
const REFONTE_STATS_2026 = [
    {
        value: "−40 %",
        label: "Perte moyenne de trafic organique sans expertise SEO",
        source: "Search Engine Journal 2025"
    },
    {
        value: "45 pts",
        label: "Points de contrôle SEO validés avant, pendant et après",
        source: "Méthodologie IndHack 2026"
    },
    {
        value: "4 à 8 sem.",
        label: "Délai de récupération complète si migration maîtrisée",
        source: "Google Search Console benchmark"
    }
];

const REFONTE_FAQ = [
    {
        question: "Vais-je perdre mon trafic actuel lors d'une refonte ?",
        answer: "Sans expertise, **80 % des refontes subissent une perte de trafic** (Search Engine Journal 2025). Avec mon accompagnement en 45 points de contrôle, l'objectif est une **migration neutre à +10 % de visibilité**. Je sécurise chaque URL avec un plan de redirection 301 chirurgical, testé en staging avant la bascule."
    },
    {
        question: "Combien coûte une refonte SEO complète en 2026 ?",
        answer: "L'audit pré-migration (obligatoire) commence à **1 500 €**. La mission complète (audit + plan 301 + surveillance 90 jours) démarre à **3 500 €** pour un site < 100 pages. Au-delà, le tarif varie selon la volumétrie et la complexité technique. Devis gratuit sous 24 h via le formulaire de contact."
    },
    {
        question: "Dois-je modifier mes contenus lors de la refonte ?",
        answer: "C'est le moment idéal pour un **élagage sémantique** (content pruning). On conserve ce qui rank, on enrichit ce qui sous-performe (passer en format AI-citable pour le GEO), et on supprime les pages zombies qui gaspillent votre budget de crawl."
    },
    {
        question: "Combien de temps faut-il pour voir les résultats après une refonte ?",
        answer: "Google met **4 à 8 semaines** pour ré-indexer totalement une nouvelle structure. Pendant cette phase, surveillance quotidienne obligatoire (positions, 404, erreurs GSC). En mois 3-6, les sites bien refaits observent généralement **+15 à +25 % de visibilité** grâce à l'optimisation technique 2026 (Core Web Vitals + Schema + GEO)."
    },
    {
        question: "Comment la refonte prépare-t-elle mon site pour l'IA (ChatGPT, Google AI Mode) ?",
        answer: "En 2026, une refonte SEO doit obligatoirement intégrer le **GEO (Generative Engine Optimization)** : autorisation des crawlers IA dans robots.txt, schema JSON-LD enrichi, passages citables par AI Overviews. Un site refait sans ces signaux devient invisible dans 43 % des recherches Google (celles qui déclenchent AI Mode). Ce n'est plus optionnel."
    }
];

export default function RefonteSiteClient() {
    const { openAuditModal } = useModal();

    return (
        <main className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Refonte de Site Web SEO",
                        "description": "Refonte de site web avec migration SEO sécurisée et optimisation technique.",
                        "provider": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "url": "https://indhack.com"
                        },
                        "serviceType": "Web Design & SEO Migration",
                        "areaServed": "France"
                    })
                }}
            />

            <HeroServices
                title="Refonte de site web : Sécurisez votre héritage SEO"
                subtitle="Ne prenez pas le risque de tout perdre. Je pilote la migration technique et sémantique de votre nouveau site pour une transition 100% invisible pour Google."
                image="creation-site"
                category="Expertise Technique"
            />

            <section className="py-16 md:py-20 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-heading font-bold text-ink mb-6 uppercase tracking-tighter"
                        >
                            Une migration sans <span className="text-sauge">accroc</span>
                        </motion.h2>
                        <p className="text-xl text-soft leading-relaxed">
                            Une refonte graphique c'est bien. Une refonte qui <strong>conserve vos positions SEO</strong>, c'est vital.
                            J'interviens comme garde-fou technique entre votre prestataire web et vos résultats.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {REFONTE_FEATURES.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-sauge/20 hover:shadow-xl transition-all group"
                            >
                                <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-ink mb-4">{feature.title}</h3>
                                <p className="text-soft leading-relaxed text-sm">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 md:py-20 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <p className="text-sauge font-bold tracking-widest uppercase mb-4">La Méthode</p>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 leading-tight">
                                Refondre son site sans <br />
                                sacrifier son <span className="text-sauge">acquisition</span>.
                            </h2>
                            <div className="space-y-6">
                                <ProcessItem num="01" title="Audit pré-refonte" text="Identification des pages top performers et des 'quick wins' sémantiques." />
                                <ProcessItem num="02" title="Mapping de redirection" text="Établissement du plan de redirection 301 pour éviter les erreurs 404 en masse." />
                                <ProcessItem num="03" title="Recettage technique" text="Analyse du site en pré-production pour valider le balisage et la performance." />
                                <ProcessItem num="04" title="Go-live & suivi" text="Surveillance accrue de la Search Console et rafraîchissement manuel de l'index." />
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/seo-dashboard.webp"
                                    alt="Monitoring SEO"
                                    width={800}
                                    height={600}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section SEO Local - Maillage */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-4">
                            Refonte de site web avec <span className="text-sauge">accompagnement SEO</span>
                        </h2>
                        <p className="text-soft mb-8">
                            Que vous soyez à Nice, Paris ou ailleurs en France, je sécurise votre migration SEO.
                            La refonte est l'occasion idéale d'améliorer votre <Link href="/referencement-naturel" className="text-sauge hover:underline">référencement naturel</Link> et
                            de renforcer votre positionnement <Link href="/seo-local" className="text-sauge hover:underline">local</Link>.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {FEATURED_CITIES.map((city) => (
                                <Link
                                    key={city.slug}
                                    href={`/${city.slug}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-sauge hover:text-white rounded-full text-sm font-medium transition-all border border-gray-100"
                                >
                                    <MapPin className="w-3 h-3" />
                                    {city.name}
                                </Link>
                            ))}
                            <Link
                                href="/seo-local"
                                className="px-4 py-2 bg-ink text-white rounded-full text-sm font-medium hover:bg-sauge transition-all"
                            >
                                Toutes les villes →
                            </Link>
                        </div>
                        <p className="text-sm text-soft">
                            Avant toute refonte, un <Link href="/audit-seo" className="text-sauge hover:underline">audit SEO complet</Link> est recommandé.
                            Envie de créer un nouveau site plutôt qu'une refonte ? Découvrez mon offre de <Link href="/creation-site-web" className="text-sauge hover:underline">création de site web</Link>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Articles liés */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            Approfondir le sujet
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Link href="/blog/refonte-site-web-sans-perdre-seo" className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Comment refondre son site sans perdre son SEO
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Guide complet pour éviter les pièges et conserver vos positions.
                                </p>
                            </Link>
                            <Link href="/blog/refonte-site-web-sans-perdre-seo" className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Checklist SEO : 45 points pour votre refonte
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    La liste complète avant, pendant et après la migration.
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <FAQ items={REFONTE_FAQ} title="Questions sur la refonte SEO" />

            {/* Services complémentaires */}
            <RelatedServices currentService="refonte-site-web" />

            {/* Lien vers la page d'accueil - Maillage interne SEO */}
            <HomepageBacklink variant="default" />

            {/* Final CTA */}
            <section className="py-16 md:py-20 bg-white text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-gray-50 rounded-[3rem] p-12 md:p-20 border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                            <RefreshCw className="w-40 h-40 text-sauge" />
                        </div>
                        <h2 className="text-4xl font-heading font-bold text-ink mb-6 uppercase tracking-tighter">
                            Vous lancez votre nouveau site <span className="text-sauge">bientôt</span> ?
                        </h2>
                        <p className="text-xl text-soft mb-12 max-w-2xl mx-auto">
                            Ne laissez pas la technique au hasard. Sécurisez votre trafic dès aujourd'hui.
                        </p>
                        <Button
                            onClick={openAuditModal}
                            size="lg"
                            className="bg-sauge text-white hover:bg-ink rounded-full px-12 py-8 text-xl font-bold shadow-xl shadow-sauge/20"
                        >
                            PILOTER MON PROJET
                            <ArrowRight className="ml-3 w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </section>

        </main>
    );
}

function ProcessItem({ num, title, text }: { num: string; title: string, text: string }) {
    return (
        <div className="flex gap-6 items-start pb-8 border-b border-white/10 last:border-0">
            <span className="text-2xl font-bold text-sauge/50">{num}</span>
            <div>
                <h4 className="text-xl font-bold mb-2">{title}</h4>
                <div className="text-soft-light text-sm leading-relaxed">
                    <ReactMarkdown>{text}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
