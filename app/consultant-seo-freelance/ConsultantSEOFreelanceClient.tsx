"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AuditCTA } from "@/components/blog/AuditCTA";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";
import ReactMarkdown from "react-markdown";
import {
    CheckCircle2,
    ArrowRight,
    Phone,
    Mail,
    Clock,
    Shield,
    Zap,
    Users,
    Award,
    MapPin,
    TrendingUp,
    Target,
    Briefcase,
    Star,
    Calendar,
    Euro
} from "lucide-react";

const AVANTAGES_FREELANCE = [
    {
        icon: Zap,
        title: "Réactivité maximale",
        description: "Pas de hiérarchie, pas de process lourds. Je réponds sous 24h et m'adapte à vos urgences."
    },
    {
        icon: Users,
        title: "Interlocuteur unique",
        description: "Vous travaillez directement avec l'experte. Pas de junior, pas de turnover, continuité assurée."
    },
    {
        icon: Euro,
        title: "Tarifs compétitifs",
        description: "Pas de locaux, pas de commerciaux à payer. Mes tarifs reflètent uniquement mon expertise."
    },
    {
        icon: Target,
        title: "Sur-mesure total",
        description: "Chaque stratégie est construite pour VOTRE business, pas un template copié-collé."
    },
    {
        icon: Calendar,
        title: "Flexibilité contractuelle",
        description: "Pas d'engagement long terme obligatoire. On travaille ensemble tant que ça fonctionne."
    },
    {
        icon: Award,
        title: "Expertise Senior",
        description: "Veille quotidienne, certifications, expérience terrain. Vous bénéficiez du meilleur niveau."
    }
];

const COMPARATIF = [
    { critere: "Interlocuteur", freelance: "Unique, expert senior", agence: "Multiple, souvent junior" },
    { critere: "Réactivité", freelance: "< 24h", agence: "Variable (48-72h)" },
    { critere: "Personnalisation", freelance: "100% sur-mesure", agence: "Process standardisés" },
    { critere: "Tarif journalier", freelance: "300-600€", agence: "500-1200€" },
    { critere: "Engagement minimum", freelance: "3 mois", agence: "6-12 mois" },
    { critere: "Reporting", freelance: "Direct, transparent", agence: "Filtré par le commercial" },
];

const MISSIONS = [
    { title: "Audit SEO ponctuel", duree: "1-2 semaines", desc: "Diagnostic complet avec roadmap priorisée" },
    { title: "Accompagnement mensuel", duree: "3+ mois", desc: "Optimisation continue et suivi des KPIs" },
    { title: "Mission refonte SEO", duree: "2-4 mois", desc: "Migration sans perte de trafic" },
    { title: "Formation équipe", duree: "1-3 jours", desc: "Montée en compétence de vos collaborateurs" },
];

const CITIES = [
    { name: "Nice", slug: "seo-nice" },
    { name: "Paris", slug: "seo-paris" },
    { name: "Lyon", slug: "seo-lyon" },
    { name: "Marseille", slug: "seo-marseille" },
    { name: "Bordeaux", slug: "seo-bordeaux" },
    { name: "Toulouse", slug: "seo-toulouse" },
    { name: "Nantes", slug: "seo-nantes" },
    { name: "Rennes", slug: "seo-rennes" },
];

const FAQ = [
    {
        question: "Quelle est la différence entre un consultant SEO freelance et une agence ?",
        answer: "Le freelance offre une relation directe avec l'expert, sans intermédiaire. Vous bénéficiez de tarifs plus compétitifs (pas de structure lourde à financer), d'une réactivité maximale et d'un accompagnement 100% personnalisé. L'agence convient mieux aux très gros projets nécessitant plusieurs spécialistes simultanément."
    },
    {
        question: "Comment travaillez-vous à distance ?",
        answer: "Je travaille avec des outils collaboratifs (Notion, Slack, Meet/Zoom) qui permettent un suivi en temps réel. Reporting mensuel, points réguliers, accès aux dashboards. La distance n'impacte pas la qualité : 80% de mes clients sont hors de ma région et les résultats sont identiques."
    },
    {
        question: "Quel est votre tarif journalier ?",
        answer: "Mon TJM varie de 400€ à 600€ selon la complexité du projet. Pour les accompagnements mensuels, je propose des forfaits adaptés à chaque budget. L'audit initial est gratuit pour évaluer ensemble le potentiel et définir la meilleure approche."
    },
    {
        question: "Pouvez-vous travailler avec notre équipe interne ?",
        answer: "Absolument. Je m'intègre facilement aux équipes existantes (marketing, développeurs, rédacteurs). Je peux former vos collaborateurs, superviser l'implémentation ou prendre en charge certaines tâches. Flexibilité totale selon vos besoins."
    },
    {
        question: "Quels types de projets acceptez-vous ?",
        answer: "J'accompagne principalement les PME, startups et entrepreneurs ambitieux. E-commerce, services B2B, professions libérales, commerces locaux. Je refuse les projets contraires à mon éthique (MLM, contenus trompeurs, etc.)."
    }
];

export default function ConsultantSEOFreelanceClient() {
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
                                Consultant SEO Freelance
                            </p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                                Votre <span className="text-sauge">experte SEO freelance</span> dédiée à votre croissance
                            </h1>
                            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
                                Flexibilité, expertise et résultats. Je vous accompagne en direct, sans intermédiaire,
                                pour dominer Google et transformer votre visibilité en chiffre d'affaires.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                <AuditCTA className="bg-sauge hover:bg-white hover:text-ink text-white px-8 py-6 rounded-xl text-lg font-semibold">
                                    Audit Gratuit
                                </AuditCTA>
                                <a href="tel:0661139748">
                                    <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ink px-8 py-6 rounded-xl text-lg">
                                        <Phone className="w-5 h-5 mr-2" />
                                        06 61 13 97 48
                                    </Button>
                                </a>
                            </div>

                            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge" />
                                    Disponible immédiatement
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge" />
                                    Remote ou présentiel
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge" />
                                    Sans engagement long
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Définition */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-6 text-center">
                            Qu'est-ce qu'un <span className="text-sauge">consultant SEO freelance</span> ?
                        </h2>
                        <div className="prose prose-lg max-w-none text-soft">
                            <p className="text-xl leading-relaxed mb-6">
                                Un <strong>consultant SEO freelance</strong> est un expert indépendant en <Link href="/referencement-naturel" className="text-sauge hover:underline">référencement naturel</Link>.
                                Contrairement aux agences, il travaille en direct avec vous, offrant une expertise senior sans les coûts de structure.
                            </p>
                            <p className="leading-relaxed mb-6">
                                En tant que <Link href="/consultant-seo" className="text-sauge hover:underline">consultante SEO</Link> freelance, je combine la rigueur d'un process professionnel
                                avec la flexibilité et la réactivité que seul un indépendant peut offrir. Vous bénéficiez d'un accompagnement
                                personnalisé, d'une communication directe et de tarifs justes.
                            </p>
                            <p className="leading-relaxed">
                                Mon statut d'indépendante me permet de choisir mes clients et de m'investir pleinement dans chaque projet.
                                Votre succès est ma meilleure carte de visite.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Avantages */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Pourquoi choisir un <span className="text-sauge">freelance</span> ?
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Les avantages concrets de travailler avec une consultante SEO indépendante.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {AVANTAGES_FREELANCE.map((avantage, index) => (
                            <motion.div
                                key={avantage.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all group"
                            >
                                <div className="w-14 h-14 bg-sauge/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sauge transition-colors">
                                    <avantage.icon className="w-7 h-7 text-sauge group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-ink mb-3">
                                    {avantage.title}
                                </h3>
                                <p className="text-soft leading-relaxed">
                                    {avantage.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparatif */}
            <section className="py-20 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Freelance vs Agence : <span className="text-sauge">le comparatif</span>
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="text-left py-4 px-4 font-bold">Critère</th>
                                    <th className="text-left py-4 px-4 font-bold text-sauge">Freelance</th>
                                    <th className="text-left py-4 px-4 font-bold text-white/60">Agence</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARATIF.map((row, i) => (
                                    <tr key={i} className="border-b border-white/10">
                                        <td className="py-4 px-4 font-medium">{row.critere}</td>
                                        <td className="py-4 px-4 text-sauge">{row.freelance}</td>
                                        <td className="py-4 px-4 text-white/60">{row.agence}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Types de missions */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Missions <span className="text-sauge">freelance</span> disponibles
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Du ponctuel au récurrent, je m'adapte à vos besoins.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {MISSIONS.map((mission, i) => (
                            <motion.div
                                key={mission.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-sauge transition-all"
                            >
                                <Briefcase className="w-8 h-8 text-sauge mb-4" />
                                <h3 className="font-bold text-ink mb-2">{mission.title}</h3>
                                <p className="text-sauge text-sm font-medium mb-2">{mission.duree}</p>
                                <p className="text-soft text-sm">{mission.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link href="/audit-seo">
                            <Button variant="outline" className="border-2 border-ink text-ink hover:bg-ink hover:text-white rounded-full px-8 py-6">
                                Découvrir mes services d'audit
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Questions fréquentes
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-6">
                        {FAQ.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-6 rounded-2xl border border-gray-100"
                            >
                                <h3 className="text-lg font-heading font-bold text-ink mb-3">
                                    {faq.question}
                                </h3>
                                <div className="text-soft leading-relaxed">
                                    <ReactMarkdown>{faq.answer}</ReactMarkdown>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Villes */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-4">
                            Freelance SEO disponible dans toute la France
                        </h2>
                        <p className="text-soft">
                            Remote ou présentiel, je m'adapte à votre localisation.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {CITIES.map((city) => (
                            <Link
                                key={city.slug}
                                href={`/${city.slug}`}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-sauge hover:text-white rounded-full text-sm font-medium transition-all"
                            >
                                <MapPin className="w-4 h-4" />
                                SEO Freelance {city.name}
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
            </section>

            {/* CTA Final */}
            <section className="py-20 bg-ink text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                            Prêt à travailler avec une <span className="text-sauge">freelance</span> ?
                        </h2>
                        <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                            Audit gratuit, réponse sous 24h, premier échange sans engagement.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <AuditCTA className="bg-sauge hover:bg-white hover:text-ink text-white px-8 py-6 rounded-xl text-lg font-semibold">
                                Demander un audit gratuit
                            </AuditCTA>
                            <Link href="/contact">
                                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ink px-8 py-6 rounded-xl text-lg">
                                    Me contacter
                                </Button>
                            </Link>
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 text-white/60 text-sm">
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Réponse sous 24h
                            </span>
                            <span className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Audit gratuit
                            </span>
                            <span className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                contact@indhack.com
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Schema.org FAQPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": FAQ.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />

            {/* Schema.org Service */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": "Consultant SEO Freelance",
                        "provider": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "jobTitle": "Consultante SEO Freelance",
                            "url": "https://indhack.com"
                        },
                        "areaServed": {
                            "@type": "Country",
                            "name": "France"
                        },
                        "description": "Services de consultant SEO freelance : audit, accompagnement mensuel, refonte SEO, formation.",
                        "offers": {
                            "@type": "AggregateOffer",
                            "lowPrice": "400",
                            "highPrice": "600",
                            "priceCurrency": "EUR",
                            "priceSpecification": {
                                "@type": "UnitPriceSpecification",
                                "price": "500",
                                "priceCurrency": "EUR",
                                "unitText": "DAY"
                            }
                        }
                    })
                }}
            />

            {/* Schema.org BreadcrumbList */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Accueil",
                                "item": "https://indhack.com"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Consultant SEO",
                                "item": "https://indhack.com/consultant-seo"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": "Consultant SEO Freelance",
                                "item": "https://indhack.com/consultant-seo-freelance"
                            }
                        ]
                    })
                }}
            />

            <HomepageBacklink variant="default" />
        </main>
    );
}
