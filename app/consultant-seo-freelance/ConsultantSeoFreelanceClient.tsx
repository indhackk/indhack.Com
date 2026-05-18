"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    ArrowRight, CheckCircle2, Phone, Search, FileSearch,
    TrendingUp, BarChart3, AlertTriangle, Clock,
    Users, Zap, Eye, Target, Award, Brain, MapPin,
    Sparkles, DollarSign
} from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { RelatedServices } from "@/components/RelatedServices";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

const stagger = (i: number) => ({
    ...fadeInUp,
    transition: { duration: 0.6, delay: i * 0.1 },
});

const COMPARISON_DATA = [
    { critere: "Coût mensuel moyen", freelance: "800 – 3 000 €", agence: "2 000 – 10 000 €", avantage: "freelance" },
    { critere: "Interlocuteur unique", freelance: "Oui, toujours le même expert", agence: "Non, turnover fréquent", avantage: "freelance" },
    { critere: "Flexibilité contractuelle", freelance: "Sans engagement, au mois", agence: "Engagement 6-12 mois", avantage: "freelance" },
    { critere: "Expertise technique", freelance: "Spécialiste pointu", agence: "Généraliste multi-compétences", avantage: "freelance" },
    { critere: "Capacité de scaling", freelance: "Limitée à 1 personne", agence: "Équipe dédiée possible", avantage: "agence" },
    { critere: "Expertise GEO / IA", freelance: "Rare, mais les meilleurs l'ont", agence: "Très rarement proposée", avantage: "freelance" },
];

const PRICING_TIERS = [
    {
        level: "Junior",
        experience: "0-2 ans",
        tjm: "250 – 400 €",
        mensuel: "500 – 1 500 €",
        ideal: "Petits sites, blogs, artisans",
        color: "border-gray-200",
    },
    {
        level: "Confirmé",
        experience: "3-7 ans",
        tjm: "400 – 700 €",
        mensuel: "1 500 – 3 500 €",
        ideal: "PME, e-commerce, SaaS",
        color: "border-sauge",
        popular: true,
    },
    {
        level: "Expert / Senior",
        experience: "8+ ans",
        tjm: "700 – 1 500 €",
        mensuel: "3 500 – 8 000 €",
        ideal: "Grands comptes, sites internationaux, migration complexe",
        color: "border-accent",
    },
];

const PROCESS_STEPS = [
    {
        step: 1,
        title: "Audit gratuit de votre site",
        description: "Je commence par un diagnostic rapide de votre visibilité actuelle sur Google et dans les IA génératives. Vous recevez un score /100 et les 5 priorités d'optimisation.",
        duration: "30 minutes",
        link: { href: "/outils/audit-seo-gratuit", text: "Lancer l'audit gratuit" },
        icon: Search,
    },
    {
        step: 2,
        title: "Audit SEO complet",
        description: "Analyse approfondie de +150 points : technique (Core Web Vitals, crawl, indexation), sémantique (contenu, mots-clés, intention), autorité (backlinks, E-E-A-T) et visibilité IA (GEO).",
        duration: "48 heures",
        link: { href: "/audit-seo", text: "Découvrir l'audit complet" },
        icon: FileSearch,
    },
    {
        step: 3,
        title: "Stratégie sur-mesure",
        description: "Roadmap priorisée par ROI avec des actions concrètes, des deadlines et des KPI mesurables. Pas de jargon inutile : chaque recommandation est justifiée par son impact business.",
        duration: "1 semaine",
        icon: Target,
    },
    {
        step: 4,
        title: "Exécution et optimisation",
        description: "Implémentation des corrections techniques, optimisation du contenu existant, création de nouvelles pages stratégiques et renforcement du maillage interne.",
        duration: "En continu",
        icon: Zap,
    },
    {
        step: 5,
        title: "Reporting mensuel et visibilité IA",
        description: "Suivi des positions Google, du trafic organique, des conversions et — spécificité que peu de freelances offrent — de votre visibilité dans ChatGPT, Perplexity et Claude.",
        duration: "Chaque mois",
        link: { href: "/outils/testeur-visibilite-ia", text: "Tester votre visibilité IA" },
        icon: BarChart3,
    },
];

const SELECTION_CRITERIA = [
    {
        title: "Résultats documentés",
        description: "Demandez des études de cas avec des chiffres vérifiables : progression du trafic, positions gagnées, CA généré. Un bon consultant SEO freelance n'a pas peur de montrer ses résultats.",
        icon: TrendingUp,
    },
    {
        title: "Expertise technique réelle",
        description: "Le SEO ne se résume pas au contenu. Votre consultant doit maîtriser le crawl, l'indexation, les Core Web Vitals, les données structurées et le JavaScript rendering.",
        icon: FileSearch,
    },
    {
        title: "Transparence totale",
        description: "Accès complet à Google Search Console, Google Analytics et aux outils utilisés. Pas de boîte noire. Un vrai freelance SEO vous explique chaque action et son impact attendu.",
        icon: Eye,
    },
    {
        title: "Process structuré",
        description: "Audit documenté, roadmap priorisée, reporting régulier. Méfiez-vous des consultants qui « font du SEO » sans méthodologie claire ni calendrier de livrables.",
        icon: Target,
    },
    {
        title: "Veille permanente",
        description: "Les algorithmes Google changent plusieurs fois par an. Votre consultant SEO freelance doit suivre les core updates, les évolutions de l'IA et adapter sa stratégie en conséquence.",
        icon: Brain,
    },
    {
        title: "Communication régulière",
        description: "Un point mensuel minimum, une disponibilité par email ou Slack et des rapports lisibles par un non-technicien. Le SEO est un marathon : la communication est la clé.",
        icon: Users,
    },
    {
        title: "Expertise GEO (visibilité IA)",
        description: "En 2026, 39 % des Français utilisent les IA pour chercher des informations. Un consultant SEO freelance à jour doit aussi optimiser votre présence dans ChatGPT, Perplexity et Claude.",
        icon: Sparkles,
    },
];

const RED_FLAGS = [
    { text: "« Garantie première page Google »", detail: "Personne ne peut garantir un résultat sur Google. Les algorithmes dépendent de centaines de facteurs et changent constamment." },
    { text: "« Résultats visibles en 1 semaine »", detail: "Le SEO prend 3 à 6 mois minimum. Quiconque promet des résultats immédiats utilise probablement des techniques à risque." },
    { text: "« 100 backlinks par mois »", detail: "La quantité de liens n'est pas un indicateur de qualité. Des backlinks de masse proviennent souvent de fermes de liens toxiques." },
    { text: "« On s'occupe de tout, ne vous inquiétez pas »", detail: "Un bon consultant SEO freelance vous implique dans la stratégie et vous forme. L'opacité totale est un signal d'alerte." },
    { text: "Aucune référence ni étude de cas", detail: "Un professionnel expérimenté a toujours des résultats à montrer. L'absence de portfolio est un red flag majeur." },
];

const FAQ_ITEMS = [
    {
        question: "Combien coûte un consultant SEO freelance en 2026 ?",
        answer: "Le tarif d'un consultant SEO freelance varie selon l'expérience : de **250 €/jour** pour un junior à **1 500 €/jour** pour un expert senior. En forfait mensuel, comptez entre **800 € et 5 000 €** selon l'ampleur du projet. Le TJM moyen en France se situe autour de **570 €**. Ces tarifs restent 40 à 60 % inférieurs à ceux d'une agence SEO pour un niveau d'expertise équivalent."
    },
    {
        question: "Quelle est la différence entre un consultant SEO freelance et une agence SEO ?",
        answer: "Le freelance offre un **interlocuteur unique**, une **flexibilité contractuelle** (pas d'engagement longue durée) et des **tarifs plus compétitifs**. L'agence apporte une **capacité de scaling** avec des équipes multi-compétences. Pour une PME ou un e-commerce avec un budget de 1 000 à 4 000 €/mois, le freelance est généralement le meilleur choix rapport qualité-prix."
    },
    {
        question: "Combien de temps faut-il pour voir des résultats en SEO ?",
        answer: "Comptez **3 à 6 mois** pour les premiers résultats visibles (amélioration des positions et du trafic) et **6 à 12 mois** pour des gains significatifs et durables. Les corrections techniques (vitesse, indexation) ont un impact plus rapide (2-4 semaines). Le contenu et l'autorité prennent plus de temps. Méfiez-vous de quiconque promet des résultats en quelques jours."
    },
    {
        question: "Quelles questions poser avant d'engager un consultant SEO freelance ?",
        answer: "Les 5 questions essentielles : **1)** Pouvez-vous me montrer des études de cas avec des résultats chiffrés ? **2)** Quelle est votre méthodologie d'audit ? **3)** Comment mesurez-vous le ROI de vos actions ? **4)** Quelle est votre politique de reporting ? **5)** Suivez-vous les évolutions de l'IA et du GEO ? Les réponses vous donneront une vision claire de l'expertise et du sérieux du consultant."
    },
    {
        question: "Un consultant SEO freelance peut-il aussi optimiser ma visibilité dans les IA ?",
        answer: "C'est rare, mais c'est devenu essentiel. Le **GEO** (Generative Engine Optimization) consiste à optimiser votre site pour qu'il soit cité par ChatGPT, Perplexity, Claude et les AI Overviews de Google. Cela inclut l'optimisation des données structurées, du fichier llms.txt, des signaux E-E-A-T et de la « citabilité » du contenu. Vérifiez si votre consultant maîtrise cette discipline avec un [test de visibilité IA](/outils/testeur-visibilite-ia)."
    },
    {
        question: "Faut-il un budget minimum pour travailler avec un consultant SEO freelance ?",
        answer: "Pour un accompagnement mensuel efficace, prévoyez au minimum **800 à 1 200 €/mois**. En dessous, le consultant ne pourra pas couvrir audit, optimisation et suivi de manière sérieuse. Pour un **audit ponctuel**, comptez entre **500 et 3 000 €** selon la taille du site. Un bon investissement SEO génère un ROI de 5x à 20x sur 12 mois."
    },
];

const CITIES = [
    { name: "Nice", slug: "/consultant-seo-nice" },
    { name: "Paris", slug: "/consultant-seo-paris" },
    { name: "Sophia-Antipolis", slug: "/consultant-seo-sophia-antipolis" },
    { name: "Cannes", slug: "/consultant-seo-cannes" },
    { name: "Marseille", slug: "/consultant-seo-marseille" },
    { name: "Lyon", slug: "/consultant-seo-lyon" },
    { name: "Bordeaux", slug: "/consultant-seo-bordeaux" },
    { name: "Toulouse", slug: "/consultant-seo-toulouse" },
];

const BLOG_ARTICLES = [
    {
        href: "/blog/devenir-consultant-seo",
        tag: "Carrière",
        title: "Comment devenir consultant SEO en 2026 ?",
        description: "Parcours, compétences, formations et conseils d'une consultante en activité.",
    },
    {
        href: "/blog/salaire-consultant-seo",
        tag: "Rémunération",
        title: "Salaire consultant SEO : grilles CDI et TJM freelance",
        description: "Grilles salariales CDI et TJM freelance selon expérience, ville et spécialité.",
    },
    {
        href: "/blog/checklist-seo-2026",
        tag: "Guide pratique",
        title: "Checklist SEO 2026 : les 50 points essentiels",
        description: "Les 50 points à vérifier en technique, contenu, SEO local et visibilité IA.",
    },
];

export default function ConsultantSeoFreelanceClient() {
    return (
        <main>
            {/* ══════════════════════════════════════════════════════════════ */}
            {/* HERO */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="relative bg-ink overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(46,94,78,0.15),transparent_60%)]" />
                <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-sauge/20 text-sauge-light rounded-full text-sm font-medium mb-6">
                                <Search className="w-4 h-4" />
                                Guide expert
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-6">
                                Consultant SEO freelance :{" "}
                                <span className="text-sauge-light">le guide pour choisir le bon expert</span>
                            </h1>
                            <p className="text-lg text-soft-light mb-8 max-w-xl">
                                Tarifs réels, comparatif freelance vs agence, process de travail transparent
                                et les 7 critères pour identifier un vrai expert — y compris l'expertise
                                en visibilité IA que 95 % des consultants n'ont pas.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="#comparatif"
                                    className="inline-flex items-center justify-center gap-2 bg-sauge hover:bg-sauge/90 text-white px-8 py-4 rounded-xl font-bold transition-all text-lg"
                                >
                                    Comparer les options
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="/consultant-seo"
                                    className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-bold transition-all"
                                >
                                    Voir mon accompagnement SEO
                                </Link>
                            </div>
                            {/* Indicateurs informationnels orientés guide,
                               pas réassurance landing page (cf. brief phase 2). */}
                            <div className="flex flex-wrap gap-6 mt-6 text-sm text-soft-light">
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge-light" />
                                    Tarifs marché 2026 vérifiés
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge-light" />
                                    7 critères de sélection
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge-light" />
                                    Comparatif freelance vs agence
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="hidden lg:block"
                        >
                            <div className="relative">
                                <div className="bg-gradient-to-br from-sauge/20 to-sauge/5 rounded-3xl p-8 backdrop-blur-sm border border-sauge/20">
                                    <div className="space-y-4">
                                        {[
                                            { label: "TJM moyen France", value: "570 €/jour", icon: DollarSign },
                                            { label: "Consultants SEO en France", value: "5 000+", icon: Users },
                                            { label: "Délai premiers résultats", value: "3-6 mois", icon: Clock },
                                            { label: "ROI moyen à 12 mois", value: "5x à 20x", icon: TrendingUp },
                                        ].map((stat, i) => (
                                            <motion.div
                                                key={stat.label}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 + i * 0.15 }}
                                                className="flex items-center gap-4 bg-white/10 rounded-xl p-4"
                                            >
                                                <div className="w-10 h-10 bg-sauge/30 rounded-lg flex items-center justify-center">
                                                    <stat.icon className="w-5 h-5 text-sauge-light" />
                                                </div>
                                                <div>
                                                    <p className="text-soft-light text-sm">{stat.label}</p>
                                                    <p className="text-white font-bold text-lg">{stat.value}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* QU'EST-CE QU'UN CONSULTANT SEO FREELANCE ? */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-6">
                            Qu'est-ce qu'un consultant SEO freelance ?
                        </h2>
                        <div className="prose prose-lg max-w-none text-soft">
                            <p>
                                Un consultant SEO freelance est un <strong>expert indépendant en <Link href="/referencement-naturel" className="text-sauge hover:underline">référencement naturel</Link></strong> qui
                                accompagne les entreprises dans l'amélioration de leur visibilité sur Google — et de plus en plus,
                                dans les moteurs de recherche IA comme ChatGPT, Perplexity ou Claude.
                            </p>
                            <p>
                                Contrairement à un SEO manager salarié en agence qui gère souvent 15 à 20 clients simultanément,
                                le freelance travaille avec un <strong>portefeuille restreint de 5 à 10 clients</strong>, ce qui lui
                                permet une implication beaucoup plus profonde dans chaque projet. C'est la principale raison pour laquelle
                                les PME et les startups privilégient de plus en plus cette option.
                            </p>
                            <p>
                                En France, on estime à <strong>plus de 5 000 le nombre de consultants SEO freelance</strong> actifs
                                en 2026, avec un TJM (tarif journalier moyen) qui oscille entre 250 € pour un junior et 1 500 € pour
                                un expert reconnu. Le marché est en croissance de 12 % par an, porté par la montée en puissance du
                                SEO technique et du <Link href="/blog/geo-comment-apparaitre-chatgpt-2026" className="text-sauge hover:underline">GEO (Generative Engine Optimization)</Link>.
                            </p>
                            <p>
                                Le rôle du consultant SEO freelance couvre un spectre large : <strong>audit technique</strong> (vitesse,
                                crawl, indexation, Core Web Vitals), <strong>stratégie de contenu</strong> (recherche de mots-clés,
                                rédaction optimisée, cocon sémantique), <strong>netlinking</strong> (acquisition de backlinks
                                qualitatifs), <Link href="/seo-local" className="text-sauge hover:underline">SEO local</Link> (Google
                                Business Profile, citations NAP) et, de plus en plus, <strong>optimisation GEO</strong> pour les
                                moteurs de recherche IA.
                            </p>
                            <p>
                                Vous hésitez entre le salariat et le freelance ?
                                Consultez le <Link href="/blog/devenir-consultant-seo" className="text-sauge hover:underline">guide complet pour devenir consultant SEO</Link> et
                                les <Link href="/blog/salaire-consultant-seo" className="text-sauge hover:underline">grilles salariales consultant SEO 2026</Link>.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* FREELANCE VS AGENCE — COMPARATIF */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section id="comparatif" className="py-16 md:py-20 bg-gray-50 scroll-mt-24">
                <div className="container mx-auto px-4">
                    <motion.div {...fadeInUp} className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-4">
                            Freelance SEO vs agence : le comparatif honnête
                        </h2>
                        <p className="text-soft max-w-2xl mx-auto">
                            Ni l'un ni l'autre n'est universellement meilleur. Le bon choix dépend de votre budget,
                            de la complexité de votre projet et de vos attentes en termes de reporting.
                        </p>
                    </motion.div>

                    <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
                        {/* Desktop : tableau classique */}
                        <div className="hidden md:block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                            <div className="grid grid-cols-4 bg-ink text-white font-bold text-sm">
                                <div className="p-4">Critère</div>
                                <div className="p-4 text-center">Freelance</div>
                                <div className="p-4 text-center">Agence</div>
                                <div className="p-4 text-center">Avantage</div>
                            </div>
                            {COMPARISON_DATA.map((row, i) => (
                                <motion.div
                                    key={row.critere}
                                    {...stagger(i)}
                                    className={`grid grid-cols-4 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} border-t border-gray-100`}
                                >
                                    <div className="p-4 font-medium text-ink">{row.critere}</div>
                                    <div className="p-4 text-center text-soft">{row.freelance}</div>
                                    <div className="p-4 text-center text-soft">{row.agence}</div>
                                    <div className="p-4 text-center">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${row.avantage === "freelance"
                                            ? "bg-sauge/10 text-sauge"
                                            : "bg-accent/10 text-accent"
                                        }`}>
                                            {row.avantage === "freelance" ? "Freelance" : "Agence"}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile : cards empilées */}
                        <div className="md:hidden space-y-4">
                            {COMPARISON_DATA.map((row, i) => (
                                <motion.div
                                    key={row.critere}
                                    {...stagger(i)}
                                    className="bg-white rounded-2xl border border-gray-100 p-5"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-ink text-sm">{row.critere}</h3>
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${row.avantage === "freelance"
                                            ? "bg-sauge/10 text-sauge"
                                            : "bg-accent/10 text-accent"
                                        }`}>
                                            {row.avantage === "freelance" ? "Freelance" : "Agence"}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-xs text-sauge font-bold mb-1">Freelance</p>
                                            <p className="text-soft">{row.freelance}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-accent font-bold mb-1">Agence</p>
                                            <p className="text-soft">{row.agence}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 bg-sauge/5 border border-sauge/20 rounded-2xl p-6">
                            <p className="text-soft">
                                <strong className="text-ink">En résumé :</strong> pour une PME avec un budget SEO de 1 000 à 4 000 €/mois,
                                le consultant SEO freelance offre le meilleur rapport qualité-prix. L'agence devient pertinente à partir
                                de 5 000 €/mois ou pour des projets nécessitant des compétences multiples (SEO + SEA + design + développement).
                                Pour un <Link href="/audit-seo" className="text-sauge hover:underline font-medium">audit SEO complet</Link> ou
                                du <Link href="/seo-local" className="text-sauge hover:underline font-medium">référencement local</Link>,
                                le freelance est quasi-toujours le meilleur choix.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* TARIFS */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div {...fadeInUp} className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-4">
                            Les vrais tarifs d'un consultant SEO freelance en 2026
                        </h2>
                        <p className="text-soft max-w-2xl mx-auto">
                            Données basées sur les études Malt, Crème de la Crème et notre expérience
                            du marché français. TJM = tarif journalier moyen.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {PRICING_TIERS.map((tier, i) => (
                            <motion.div
                                key={tier.level}
                                {...stagger(i)}
                                className={`relative bg-white rounded-2xl border-2 ${tier.color} p-8 ${tier.popular ? "lg:scale-105 shadow-xl" : "shadow-sm"} transition-all hover:shadow-lg`}
                            >
                                {tier.popular && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sauge text-white text-xs font-bold px-4 py-1 rounded-full">
                                        Le plus demandé
                                    </span>
                                )}
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-heading font-bold text-ink mb-1">{tier.level}</h3>
                                    <p className="text-soft text-sm">{tier.experience} d'expérience</p>
                                </div>
                                <div className="text-center mb-6">
                                    <p className="text-3xl font-heading font-bold text-sauge">{tier.tjm}</p>
                                    <p className="text-soft text-sm">par jour (TJM)</p>
                                </div>
                                <div className="border-t border-gray-100 pt-4 mb-6">
                                    <p className="text-sm text-soft">
                                        <span className="font-medium text-ink">Forfait mensuel :</span> {tier.mensuel}
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm text-soft">
                                        <span className="font-medium text-ink">Idéal pour :</span> {tier.ideal}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div {...fadeInUp} className="text-center mt-10">
                        <p className="text-soft mb-4">
                            Besoin d'un devis personnalisé pour votre projet ?
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-sauge hover:bg-sauge/90 text-white px-8 py-4 rounded-xl font-bold transition-all"
                        >
                            Demander un devis gratuit
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* PROCESS EN 5 ÉTAPES */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-ink">
                <div className="container mx-auto px-4">
                    <motion.div {...fadeInUp} className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                            Mon process en 5 étapes
                        </h2>
                        <p className="text-soft-light max-w-2xl mx-auto">
                            Transparence totale : voici exactement comment je travaille avec mes clients,
                            de l'audit initial au suivi mensuel.
                        </p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-6">
                        {PROCESS_STEPS.map((step, i) => (
                            <motion.div
                                key={step.step}
                                {...stagger(i)}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:border-sauge/40 transition-all"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="flex-shrink-0 w-12 h-12 bg-sauge/20 rounded-xl flex items-center justify-center">
                                        <step.icon className="w-6 h-6 text-sauge-light" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-sauge-light font-bold text-sm">Étape {step.step}</span>
                                            <span className="text-soft-light text-xs bg-white/10 px-2 py-0.5 rounded-full">
                                                {step.duration}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-heading font-bold text-white mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-soft-light text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                        {step.link && (
                                            <Link
                                                href={step.link.href}
                                                className="inline-flex items-center gap-1 text-sauge-light hover:text-white text-sm font-medium mt-3 transition-colors"
                                            >
                                                {step.link.text}
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* 7 CRITÈRES DE SÉLECTION */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div {...fadeInUp} className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-4">
                            7 critères pour choisir le bon consultant SEO freelance
                        </h2>
                        <p className="text-soft max-w-2xl mx-auto">
                            Avant de signer, vérifiez que votre futur consultant coche ces cases.
                            Le critère n°7 est celui que 95 % des freelances ignorent encore.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {SELECTION_CRITERIA.map((criteria, i) => (
                            <motion.div
                                key={criteria.title}
                                {...stagger(i)}
                                className={`bg-white p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all ${i === 6 ? "md:col-span-2 lg:col-span-1 bg-gradient-to-br from-sauge/5 to-sauge/10 border-sauge/20" : ""
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${i === 6 ? "bg-sauge text-white" : "bg-sauge/10 text-sauge"
                                    }`}>
                                    <criteria.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-ink mb-2">
                                    {i + 1}. {criteria.title}
                                </h3>
                                <p className="text-soft text-sm leading-relaxed">
                                    {criteria.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div {...fadeInUp} className="text-center mt-10">
                        <p className="text-soft text-sm">
                            Envie de vérifier ces critères pour votre site ? Commencez par
                            la <Link href="/blog/checklist-seo-2026" className="text-sauge hover:underline font-medium">checklist SEO 2026</Link>.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* RED FLAGS */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div {...fadeInUp} className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-4">
                            Les signaux d'alerte : repérer un mauvais consultant SEO
                        </h2>
                        <p className="text-soft max-w-2xl mx-auto">
                            Ces promesses doivent immédiatement vous mettre en garde. Un professionnel
                            sérieux ne les fera jamais.
                        </p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {RED_FLAGS.map((flag, i) => (
                            <motion.div
                                key={i}
                                {...stagger(i)}
                                className="bg-white rounded-2xl border border-red-100 p-6 hover:border-red-200 transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-ink mb-1">{flag.text}</h3>
                                        <p className="text-soft text-sm">{flag.detail}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* POURQUOI ME CHOISIR */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div {...fadeInUp} className="max-w-5xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-sauge/10 text-sauge rounded-full text-sm font-medium mb-4">
                                    <Award className="w-4 h-4" />
                                    Pourquoi me choisir
                                </span>
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-6">
                                    Une consultante SEO freelance qui maîtrise aussi l'IA
                                </h2>
                                <p className="text-soft mb-4">
                                    Je suis Indiana Aflalo, <Link href="/consultant-seo" className="text-sauge hover:underline font-medium">consultante SEO</Link> basée
                                    à Nice. Ce qui me différencie ? Je ne fais pas que du référencement classique. Je suis l'une
                                    des rares consultantes en France à proposer une double expertise <strong>SEO + GEO</strong> (Generative Engine Optimization).
                                </p>
                                <p className="text-soft mb-4">
                                    Concrètement, cela signifie que je ne me contente pas de vous positionner sur Google :
                                    je m'assure aussi que votre marque est <strong>citée par ChatGPT, Perplexity et Claude</strong> quand
                                    un prospect pose une question sur votre secteur d'activité. En 2026, ignorer les moteurs de recherche IA
                                    revient à ignorer 39 % des recherches des Français.
                                </p>
                                <p className="text-soft mb-8">
                                    Mon approche repose sur des <strong>données, pas des intuitions</strong>. Chaque recommandation
                                    est justifiée par son impact business estimé, chaque action est mesurée, et vous avez accès
                                    à tous les outils que j'utilise. Pas de boîte noire, pas de rapport générique —
                                    un accompagnement chirurgical adapté à votre marché.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        { icon: Brain, title: "Double expertise SEO + GEO", text: "Votre site ranke sur Google ET est cité par ChatGPT et Perplexity" },
                                        { icon: FileSearch, title: "Approche technique rigoureuse", text: "+150 points analysés dans chaque audit, pas d'approximation" },
                                        { icon: Eye, title: "Transparence totale", text: "Accès complet aux outils, rapports détaillés, aucune boîte noire" },
                                        { icon: TrendingUp, title: "Résultats mesurables", text: "KPI définis ensemble, suivi mensuel, ROI documenté" },
                                    ].map((item, i) => (
                                        <motion.div key={i} {...stagger(i)} className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-sauge/10 rounded-lg flex items-center justify-center">
                                                <item.icon className="w-5 h-5 text-sauge" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-ink text-sm">{item.title}</h3>
                                                <p className="text-soft text-sm">{item.text}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="mt-8 flex flex-wrap gap-3">
                                    <Link
                                        href="/etudes-de-cas"
                                        className="inline-flex items-center gap-2 text-sauge hover:text-ink font-medium text-sm transition-colors"
                                    >
                                        Voir mes études de cas <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href="/a-propos"
                                        className="inline-flex items-center gap-2 text-soft hover:text-ink font-medium text-sm transition-colors"
                                    >
                                        Découvrir mon parcours SEO <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <Image
                                    src="/images/indiana-aflalo.webp"
                                    alt="Indiana Aflalo, consultante SEO freelance à Nice, experte en référencement naturel et visibilité IA"
                                    width={500}
                                    height={500}
                                    className="rounded-3xl object-cover shadow-xl"
                                />
                                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-sauge rounded-full flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-ink text-sm">Nice, Côte d'Azur</p>
                                            <p className="text-soft text-xs">Intervention France entière</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* FAQ */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <FAQ items={FAQ_ITEMS} title="Questions fréquentes — consultant SEO freelance" />
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* ARTICLES COMPLÉMENTAIRES */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div {...fadeInUp} className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                            Articles complémentaires
                        </h2>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {BLOG_ARTICLES.map((article, i) => (
                            <motion.div key={article.href} {...stagger(i)}>
                                <Link href={article.href} className="group block bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all h-full">
                                    <span className="inline-block text-xs font-bold text-sauge bg-sauge/10 px-2 py-1 rounded mb-3">
                                        {article.tag}
                                    </span>
                                    <h3 className="font-bold text-ink group-hover:text-sauge transition-colors mb-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-soft text-sm">{article.description}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* VILLES */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-xl font-heading font-bold text-ink mb-6">
                        Consultant SEO freelance par ville
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {CITIES.map((city) => (
                            <Link
                                key={city.slug}
                                href={city.slug}
                                className="px-4 py-2 bg-white border border-gray-200 hover:border-sauge hover:text-sauge rounded-full text-sm font-medium text-soft transition-all"
                            >
                                Consultant SEO {city.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SERVICES COMPLÉMENTAIRES */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <RelatedServices currentService="consultant-seo-freelance" />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* CTA FINAL */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-ink">
                <div className="container mx-auto px-4 text-center">
                    <motion.div {...fadeInUp}>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                            Prêt à travailler avec une{" "}
                            <span className="text-sauge-light">consultante SEO freelance</span>{" "}
                            qui comprend l'IA ?
                        </h2>
                        <p className="text-soft-light max-w-xl mx-auto mb-8">
                            Audit gratuit de votre site en 30 minutes. Diagnostic SEO + visibilité IA.
                            Aucun engagement, aucune surprise.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href="/outils/audit-seo-gratuit"
                                className="inline-flex items-center justify-center gap-2 bg-sauge hover:bg-sauge/90 text-white px-8 py-4 rounded-xl font-bold transition-all text-lg"
                            >
                                Lancer l'audit gratuit
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a
                                href="tel:0661139748"
                                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-bold transition-all"
                            >
                                <Phone className="w-5 h-5" />
                                06 61 13 97 48
                            </a>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-soft-light">
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-sauge-light" />
                                Réponse sous 24h
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-sauge-light" />
                                Devis gratuit
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-sauge-light" />
                                Sans engagement
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* HOMEPAGE BACKLINK */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <HomepageBacklink />
        </main>
    );
}
