"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AuditCTA } from "@/components/blog/AuditCTA";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";
import {
    Search,
    TrendingUp,
    FileText,
    Link2,
    BarChart3,
    CheckCircle2,
    ArrowRight,
    Phone,
    Mail,
    Clock,
    Shield,
    Target,
    Zap,
    Users,
    Award,
    MapPin
} from "lucide-react";

const MISSIONS = [
    {
        icon: Search,
        title: "Audit SEO complet",
        description: "Analyse technique, sémantique et concurrentielle de votre site pour identifier les opportunités de croissance."
    },
    {
        icon: FileText,
        title: "Stratégie de contenu",
        description: "Recherche de mots-clés, planning éditorial et rédaction optimisée pour capter du trafic qualifié."
    },
    {
        icon: Link2,
        title: "Netlinking",
        description: "Acquisition de backlinks de qualité pour renforcer l'autorité de votre domaine."
    },
    {
        icon: TrendingUp,
        title: "Optimisation on-page",
        description: "Balises title, meta descriptions, structure Hn, maillage interne, Core Web Vitals."
    },
    {
        icon: BarChart3,
        title: "Suivi & Reporting",
        description: "Tableaux de bord personnalisés, suivi des positions et analyse du ROI mensuel."
    },
    {
        icon: Target,
        title: "SEO Local",
        description: "Optimisation Google Business Profile et positionnement sur les recherches de proximité."
    }
];

const AVANTAGES = [
    {
        icon: Zap,
        title: "Réactivité",
        description: "Interlocuteur unique, réponse sous 24h, ajustements rapides"
    },
    {
        icon: Users,
        title: "Personnalisation",
        description: "Stratégie sur-mesure adaptée à votre secteur et vos objectifs"
    },
    {
        icon: Award,
        title: "Expertise",
        description: "Veille permanente sur les évolutions de l'algorithme Google"
    },
    {
        icon: Shield,
        title: "Transparence",
        description: "Reporting clair, pas de black hat, méthodologie explicable"
    }
];

const CITIES = [
    { name: "Nice", slug: "consultant-seo-nice" },
    { name: "Paris", slug: "consultant-seo-paris" },
    { name: "Cannes", slug: "consultant-seo-cannes" },
    { name: "Monaco", slug: "consultant-seo-monaco" },
    { name: "Marseille", slug: "consultant-seo-marseille" },
    { name: "Lyon", slug: "consultant-seo-lyon" },
    { name: "Bordeaux", slug: "consultant-seo-bordeaux" },
    { name: "Toulouse", slug: "consultant-seo-toulouse" },
    { name: "Nantes", slug: "consultant-seo-nantes" },
    { name: "Rennes", slug: "consultant-seo-rennes" },
    { name: "Montpellier", slug: "consultant-seo-montpellier" },
    { name: "Lille", slug: "consultant-seo-lille" },
];

const FAQ = [
    {
        question: "Qu'est-ce qu'un consultant SEO ?",
        answer: "Un consultant SEO est un expert en référencement naturel qui aide les entreprises à améliorer leur visibilité sur les moteurs de recherche comme Google. Il analyse, optimise et met en place des stratégies pour augmenter le trafic organique d'un site web."
    },
    {
        question: "Pourquoi faire appel à un consultant SEO freelance ?",
        answer: "Un consultant SEO freelance offre une expertise pointue, une relation directe sans intermédiaire, des tarifs compétitifs (pas de structure lourde d'agence) et une flexibilité totale. Vous bénéficiez d'un accompagnement personnalisé avec un interlocuteur unique."
    },
    {
        question: "Combien coûte un consultant SEO ?",
        answer: "Les tarifs varient selon l'expérience et la complexité du projet : audit ponctuel (500€-2000€), accompagnement mensuel (500€-2500€/mois), mission complète (3000€-10000€). L'important est le retour sur investissement : un bon SEO génère bien plus qu'il ne coûte."
    },
    {
        question: "Quels résultats attendre et en combien de temps ?",
        answer: "Le SEO est un investissement moyen/long terme. Les premiers résultats apparaissent généralement entre 3 et 6 mois. À 12 mois, les effets sont significatifs et durables. Contrairement à la publicité, les résultats perdurent même après l'arrêt de l'accompagnement."
    },
    {
        question: "Quelle est la différence entre consultant SEO et agence SEO ?",
        answer: "Le consultant freelance offre un contact direct, une expertise personnalisée et des tarifs compétitifs. L'agence propose des équipes pluridisciplinaires mais avec des process standardisés et des tarifs plus élevés. Pour les PME, le freelance est souvent le meilleur choix."
    }
];

export default function ConsultantSEOClient() {
    return (
        <main className="bg-white">
            {/* Hero Section */}
            <section className="bg-ink text-white pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-sauge font-medium mb-4 text-sm uppercase tracking-wider">
                                Consultant SEO Freelance
                            </p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                                Votre <span className="text-sauge">Consultante SEO</span> pour dominer Google
                            </h1>
                            <p className="text-xl text-white/80 mb-8 leading-relaxed">
                                Experte en référencement naturel, j'aide les entreprises ambitieuses à atteindre la <strong>première page Google</strong> et à transformer leur visibilité en chiffre d'affaires.
                            </p>

                            <div className="flex flex-wrap gap-4 mb-8">
                                <AuditCTA className="bg-sauge hover:bg-white hover:text-ink text-white px-8 py-6 rounded-xl text-lg font-semibold transition-all">
                                    Audit SEO Gratuit
                                </AuditCTA>
                                <Link href="/contact">
                                    <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ink px-8 py-6 rounded-xl text-lg">
                                        Me contacter
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex flex-wrap gap-6 text-sm text-white/70">
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge" />
                                    Réponse sous 24h
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge" />
                                    Devis gratuit
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge" />
                                    Sans engagement
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative w-full aspect-square max-w-md mx-auto">
                                <div className="absolute inset-0 bg-sauge/20 rounded-3xl transform rotate-6"></div>
                                <div className="absolute inset-0 bg-white/10 rounded-3xl transform -rotate-3"></div>
                                <Image
                                    src="/images/indiana-aflalo.jpg"
                                    alt="Indiana Aflalo - Consultante SEO Freelance"
                                    fill
                                    className="object-cover rounded-3xl relative z-10"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Définition Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-8 text-center">
                            Qu'est-ce qu'un <span className="text-sauge">consultant SEO</span> ?
                        </h2>
                        <div className="prose prose-lg max-w-none text-soft">
                            <p className="text-xl leading-relaxed mb-6">
                                Un <strong>consultant SEO</strong> (Search Engine Optimization) est un expert en <Link href="/referencement-naturel" className="text-sauge hover:underline">référencement naturel</Link> qui accompagne les entreprises pour améliorer leur positionnement sur les moteurs de recherche.
                            </p>
                            <p className="leading-relaxed mb-6">
                                Contrairement à la publicité payante (SEA), le référencement naturel vise à obtenir des positions <strong>durables et gratuites</strong> dans les résultats de Google. Le consultant SEO analyse votre site, identifie les opportunités et met en œuvre les optimisations nécessaires.
                            </p>
                            <p className="leading-relaxed">
                                En tant que <strong>consultante SEO freelance</strong>, je travaille directement avec vous, sans intermédiaire. Cette approche garantit une communication fluide, une stratégie personnalisée et des tarifs compétitifs.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Missions Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Les missions d'un consultant SEO
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            De l'audit initial au suivi des performances, voici les prestations que je propose pour booster votre visibilité.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {MISSIONS.map((mission, index) => (
                            <motion.div
                                key={mission.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all group"
                            >
                                <div className="w-14 h-14 bg-sauge/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sauge transition-colors">
                                    <mission.icon className="w-7 h-7 text-sauge group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-ink mb-3">
                                    {mission.title}
                                </h3>
                                <p className="text-soft leading-relaxed">
                                    {mission.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/referencement-naturel">
                            <Button variant="outline" className="border-2 border-ink text-ink hover:bg-ink hover:text-white rounded-full px-8 py-6">
                                Voir mes services en détail
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Avantages Freelance */}
            <section className="py-20 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Pourquoi choisir un <span className="text-sauge">consultant SEO freelance</span> ?
                        </h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Travailler avec un freelance plutôt qu'une agence présente de nombreux avantages pour les PME et entrepreneurs.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {AVANTAGES.map((avantage, index) => (
                            <motion.div
                                key={avantage.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-sauge/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <avantage.icon className="w-8 h-8 text-sauge" />
                                </div>
                                <h3 className="text-xl font-heading font-bold mb-3">
                                    {avantage.title}
                                </h3>
                                <p className="text-white/70 leading-relaxed">
                                    {avantage.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tarifs */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Tarifs consultant SEO
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Des formules adaptées à chaque besoin et budget. Transparence totale sur les prix.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Audit */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-sauge transition-all"
                        >
                            <h3 className="text-xl font-heading font-bold text-ink mb-2">Audit SEO</h3>
                            <p className="text-soft text-sm mb-6">Diagnostic complet de votre site</p>
                            <div className="text-4xl font-bold text-ink mb-6">
                                500€ - 2 000€
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Audit technique complet</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Analyse sémantique</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Benchmark concurrentiel</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Roadmap priorisée</span>
                                </li>
                            </ul>
                            <Link href="/audit-seo">
                                <Button variant="outline" className="w-full rounded-xl border-2">
                                    En savoir plus
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Accompagnement - Populaire */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-ink text-white p-8 rounded-2xl relative transform lg:scale-105 shadow-xl"
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sauge text-white text-xs font-bold px-4 py-1 rounded-full">
                                POPULAIRE
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-2">Accompagnement mensuel</h3>
                            <p className="text-white/70 text-sm mb-6">Optimisation continue</p>
                            <div className="text-4xl font-bold mb-6">
                                500€ - 2 500€<span className="text-lg font-normal">/mois</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Audit initial inclus</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Optimisations mensuelles</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Rédaction SEO (2-4 articles)</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Reporting mensuel</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Support prioritaire</span>
                                </li>
                            </ul>
                            <AuditCTA className="w-full bg-sauge hover:bg-white hover:text-ink rounded-xl py-6">
                                Demander un devis
                            </AuditCTA>
                        </motion.div>

                        {/* Mission complète */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-sauge transition-all"
                        >
                            <h3 className="text-xl font-heading font-bold text-ink mb-2">Mission complète</h3>
                            <p className="text-soft text-sm mb-6">Projet clé en main</p>
                            <div className="text-4xl font-bold text-ink mb-6">
                                3 000€ - 10 000€
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Audit + Stratégie complète</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Optimisation technique</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Création de contenu (10+ pages)</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Netlinking (backlinks)</span>
                                </li>
                            </ul>
                            <Link href="/contact">
                                <Button variant="outline" className="w-full rounded-xl border-2">
                                    Discuter du projet
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Questions fréquentes
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            Tout ce que vous devez savoir avant de faire appel à un consultant SEO.
                        </p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-6">
                        {FAQ.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-2xl border border-gray-100"
                            >
                                <h3 className="text-lg font-heading font-bold text-ink mb-3">
                                    {faq.question}
                                </h3>
                                <p className="text-soft leading-relaxed">
                                    {faq.answer}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Local - Villes */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Consultant SEO dans votre ville
                        </h2>
                        <p className="text-lg text-soft max-w-2xl mx-auto">
                            J'accompagne des entreprises dans toute la France, avec une expertise particulière sur la Côte d'Azur.
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {CITIES.map((city) => (
                            <Link
                                key={city.slug}
                                href={`/${city.slug}`}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-sauge hover:text-white rounded-full text-sm font-medium transition-all"
                            >
                                <MapPin className="w-4 h-4" />
                                Consultant SEO {city.name}
                            </Link>
                        ))}
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
                            Prêt à dominer Google ?
                        </h2>
                        <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                            Discutons de votre projet et voyons ensemble comment atteindre vos objectifs de visibilité.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <AuditCTA className="bg-sauge hover:bg-white hover:text-ink text-white px-8 py-6 rounded-xl text-lg font-semibold transition-all">
                                Audit SEO Gratuit
                            </AuditCTA>
                            <a href="tel:0661139748">
                                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ink px-8 py-6 rounded-xl text-lg">
                                    <Phone className="w-5 h-5 mr-2" />
                                    06 61 13 97 48
                                </Button>
                            </a>
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 text-white/60 text-sm">
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Réponse sous 24h
                            </span>
                            <span className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Audit gratuit sans engagement
                            </span>
                            <span className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                contact@indhack.com
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Schema.org FAQ */}
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
                        "serviceType": "Consultant SEO",
                        "provider": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "jobTitle": "Consultante SEO Freelance",
                            "url": "https://indhack.com",
                            "sameAs": [
                                "https://www.linkedin.com/in/indianaaflalo"
                            ]
                        },
                        "areaServed": {
                            "@type": "Country",
                            "name": "France"
                        },
                        "description": "Services de consultant SEO freelance : audit technique, stratégie de contenu, netlinking, optimisation on-page et suivi des performances.",
                        "offers": {
                            "@type": "AggregateOffer",
                            "lowPrice": "500",
                            "highPrice": "10000",
                            "priceCurrency": "EUR"
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
                            }
                        ]
                    })
                }}
            />

            <HomepageBacklink variant="default" />
        </main>
    );
}
