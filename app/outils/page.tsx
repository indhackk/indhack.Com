import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
    Search,
    Bot,
    Code2,
    MapPin,
    FileCode,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Zap,
    Shield,
    Hash
} from "lucide-react";

export const metadata: Metadata = {
    title: "Outils SEO Gratuits 2026 — Audit, Visibilité IA, Schema",
    description: "6 outils SEO gratuits : audit SEO, testeur visibilité IA ChatGPT/Perplexity, générateur robots.txt, schema JSON-LD, extracteur mots-clés. Sans inscription.",
    alternates: {
        canonical: "https://indhack.com/outils"
    },
    openGraph: {
        title: "Outils SEO Gratuits 2026 — Audit, Visibilité IA, Schema",
        description: "5 outils SEO gratuits incluant le seul testeur de visibilité IA français. Analysez votre site pour Google ET pour ChatGPT.",
        url: "https://indhack.com/outils",
        type: "website",
    }
};

interface Tool {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    color: string;
    features: string[];
    badge?: string;
}

const TOOLS: Tool[] = [
    {
        id: "testeur-visibilite-ia",
        title: "Testeur de visibilité IA",
        description: "Êtes-vous visible par ChatGPT, Perplexity et Claude ?",
        longDescription: "Le seul outil français gratuit qui analyse si votre site peut être cité par les IA génératives. Vérifiez vos crawlers IA, signaux E-E-A-T et données structurées.",
        icon: Bot,
        href: "/outils/testeur-visibilite-ia",
        color: "from-violet-500 to-purple-600",
        features: ["8 crawlers IA analysés", "Score GEO /100", "Signaux E-E-A-T"],
        badge: "Exclusif France",
    },
    {
        id: "audit-seo-gratuit",
        title: "Audit SEO Gratuit",
        description: "Score /100 en 30 secondes, 15 critères vérifiés.",
        longDescription: "Analysez votre site en 1 clic. Le seul audit SEO gratuit qui vérifie aussi la compatibilité avec les crawlers IA (GPTBot, Claude, Perplexity).",
        icon: Search,
        href: "/outils/audit-seo-gratuit",
        color: "from-emerald-500 to-teal-600",
        features: ["15 critères SEO", "Analyse crawlers IA", "Recommandations actionnables"],
    },
    {
        id: "generateur-robots-txt",
        title: "Générateur robots.txt 2026",
        description: "Configurez vos crawlers IA en quelques clics.",
        longDescription: "Le seul générateur robots.txt qui inclut les 12 crawlers IA de 2026 : GPTBot, Claude-Web, PerplexityBot, Google-Extended et plus.",
        icon: FileCode,
        href: "/outils/generateur-robots-txt",
        color: "from-cyan-500 to-blue-600",
        features: ["12 crawlers IA inclus", "Prévisualisation live", "Copie en 1 clic"],
    },
    {
        id: "generateur-schema-json-ld",
        title: "Générateur de schema JSON-LD",
        description: "Créez vos données structurées sans coder.",
        longDescription: "9 types de schema supportés : LocalBusiness, FAQPage, Article, Product, Organization... Indispensable pour les rich snippets et la visibilité IA.",
        icon: Code2,
        href: "/outils/generateur-schema-json-ld",
        color: "from-blue-500 to-indigo-600",
        features: ["9 types de schema", "Validation intégrée", "Rich snippets Google"],
    },
    {
        id: "simulateur-visibilite-locale",
        title: "Simulateur de visibilité locale",
        description: "Qui domine Google dans votre ville ?",
        longDescription: "Analysez les 10 premiers résultats Google pour votre métier + ville. Identifiez les opportunités SEO local et la part des plateformes vs commerces indépendants.",
        icon: MapPin,
        href: "/outils/simulateur-visibilite-locale",
        color: "from-orange-500 to-red-500",
        features: ["Analyse SERP locale", "Classification plateformes/locaux", "Score d'opportunité"],
    },
    {
        id: "extracteur-mots-cles",
        title: "Extracteur de mots-clés",
        description: "Analysez la densité et les n-grammes d'un texte.",
        longDescription: "Collez un texte et obtenez instantanément les mots-clés principaux, leur densité, et les expressions 2-3 mots les plus fréquentes. Idéal pour analyser vos contenus ou ceux de vos concurrents.",
        icon: Hash,
        href: "/outils/extracteur-mots-cles",
        color: "from-amber-500 to-orange-600",
        features: ["Densité de mots-clés", "Bi-grammes et tri-grammes", "Analyse 100% côté client"],
    },
];

const BENEFITS = [
    {
        icon: Zap,
        title: "Résultats instantanés",
        description: "Pas d'attente, pas de file. Vos analyses en quelques secondes."
    },
    {
        icon: Shield,
        title: "100% gratuit, sans inscription",
        description: "Pas de carte bancaire, pas d'email. Utilisez les outils immédiatement."
    },
    {
        icon: Bot,
        title: "Orientés IA & GEO",
        description: "Les seuls outils français qui préparent votre site pour ChatGPT et Perplexity."
    },
];

const FAQ_ITEMS = [
    {
        question: "Ces outils sont-ils vraiment gratuits ?",
        answer: "Oui, 100% gratuits et sans inscription. Mon modèle : vous découvrez mon expertise via ces outils, et si vous avez besoin d'aller plus loin, vous faites appel à mes services de consulting SEO."
    },
    {
        question: "Pourquoi ces outils sont-ils différents ?",
        answer: "Je suis la seule en France à intégrer l'analyse de la visibilité IA (GEO - Generative Engine Optimization) dans mes outils. Le SEO de 2026, c'est Google + ChatGPT + Perplexity. Mes outils vous préparent à ce nouveau paradigme."
    },
    {
        question: "Mes données sont-elles stockées ?",
        answer: "Les résultats sont temporairement mis en cache (24h) pour améliorer les performances, puis supprimés. Je ne conserve aucune donnée personnelle. Conformité RGPD totale."
    },
    {
        question: "Qu'est-ce que le GEO (Generative Engine Optimization) ?",
        answer: "Le GEO est l'optimisation pour les moteurs de recherche IA comme ChatGPT, Perplexity et Gemini. Contrairement au SEO classique qui vise les liens bleus Google, le GEO vise à être cité comme source dans les réponses générées par l'IA. C'est la prochaine frontière du référencement."
    },
    {
        question: "Puis-je utiliser ces outils pour mes clients ?",
        answer: "Absolument. Agences SEO, freelances, webmasters : vous pouvez utiliser ces outils pour vos propres audits clients. Une mention IndHack est toujours appréciée."
    },
];

export default function OutilsPage() {
    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": "Outils SEO gratuits IndHack",
                        "description": "Suite d'outils SEO gratuits incluant l'analyse de visibilité IA",
                        "numberOfItems": TOOLS.length,
                        "itemListElement": TOOLS.map((tool, index) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "item": {
                                "@type": "WebApplication",
                                "name": tool.title,
                                "description": tool.longDescription,
                                "url": `https://indhack.com${tool.href}`,
                                "applicationCategory": "SEO Tool",
                                "operatingSystem": "Web",
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "EUR"
                                }
                            }
                        }))
                    })
                }}
            />

            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://indhack.com" },
                            { "@type": "ListItem", "position": 2, "name": "Outils SEO", "item": "https://indhack.com/outils" }
                        ]
                    })
                }}
            />

            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": FAQ_ITEMS.map(item => ({
                            "@type": "Question",
                            "name": item.question,
                            "acceptedAnswer": { "@type": "Answer", "text": item.answer }
                        }))
                    })
                }}
            />

            <main className="min-h-screen">
                {/* Hero Section — Dark */}
                <section className="relative bg-ink pt-32 pb-16 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-sauge/20 rounded-full blur-[150px]" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-[150px]" />

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Fil d'Ariane">
                            <ol className="flex items-center gap-2 text-sm text-soft-light">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li>/</li>
                                <li className="text-white font-medium">Outils SEO</li>
                            </ol>
                        </nav>

                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full text-white text-sm font-medium mb-6">
                                <Sparkles className="w-4 h-4 text-sauge-light" />
                                {TOOLS.length} outils gratuits · Orientés IA &amp; GEO
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                                Outils SEO gratuits 2026
                            </h1>

                            <p className="text-xl text-soft-light leading-relaxed mb-4">
                                Les <strong className="text-white">seuls outils SEO français</strong> qui analysent votre visibilité sur Google <strong className="text-white">ET</strong> sur les IA génératives (ChatGPT, Perplexity, Claude).
                            </p>

                            <p className="text-lg text-soft-light leading-relaxed">
                                <span className="text-white font-medium">100 % gratuits, sans inscription.</span> Préparez votre site pour le référencement de demain.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Benefits Bar — White */}
                <section className="py-12 bg-white border-b border-line">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-8">
                            {BENEFITS.map((benefit) => {
                                const Icon = benefit.icon;
                                return (
                                    <div key={benefit.title} className="flex items-start gap-4">
                                        <div className="w-11 h-11 rounded-xl bg-sauge/10 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-sauge" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-ink">{benefit.title}</h3>
                                            <p className="text-sm text-soft mt-1">{benefit.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Tools Grid — Light */}
                <section className="py-16 md:py-20 bg-fond-clair">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-10 text-center">
                            Choisissez votre outil
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {TOOLS.map((tool) => {
                                const Icon = tool.icon;
                                return (
                                    <Link key={tool.id} href={tool.href} className="group">
                                        <div className="relative bg-white rounded-2xl p-6 border border-line shadow-sm transition-all duration-300 hover:shadow-md hover:border-sauge/30 h-full flex flex-col">
                                            {/* Badge */}
                                            {tool.badge && (
                                                <span className="absolute top-4 right-4 px-3 py-1 bg-violet-100 text-violet-700 text-xs font-bold rounded-full border border-violet-200">
                                                    {tool.badge}
                                                </span>
                                            )}

                                            {/* Icon */}
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>

                                            {/* Content */}
                                            <h2 className="text-lg font-heading font-bold text-ink mb-2 group-hover:text-sauge transition-colors">
                                                {tool.title}
                                            </h2>

                                            <p className="text-soft text-sm leading-relaxed mb-4">
                                                {tool.longDescription}
                                            </p>

                                            {/* Features */}
                                            <ul className="space-y-2 mb-4">
                                                {tool.features.map((feature) => (
                                                    <li key={feature} className="flex items-center gap-2 text-sm text-ink">
                                                        <CheckCircle2 className="w-4 h-4 text-sauge flex-shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* CTA */}
                                            <div className="flex items-center gap-2 text-sauge font-medium text-sm mt-auto pt-2">
                                                Utiliser l'outil
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Why Different — Sauge (dark green) */}
                <section className="py-16 md:py-20 bg-sauge text-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl font-heading font-bold mb-8 text-center">
                                Pourquoi ces outils sont différents
                            </h2>

                            <div className="space-y-6 text-lg text-white/85 leading-relaxed">
                                <p>
                                    En 2026, <strong className="text-white">le SEO ne se limite plus à Google</strong>. Vos clients utilisent ChatGPT, Perplexity et Gemini pour trouver des réponses. Si votre site n'est pas optimisé pour ces IA, vous êtes invisible pour une partie croissante de votre audience.
                                </p>

                                <p>
                                    C'est pourquoi j'ai créé <strong className="text-white">les premiers outils SEO français orientés GEO</strong> (Generative Engine Optimization). Chaque outil analyse non seulement les critères SEO classiques, mais aussi votre compatibilité avec les crawlers IA.
                                </p>

                                <p>
                                    Mon <Link href="/outils/testeur-visibilite-ia" className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white font-medium transition-colors">testeur de visibilité IA</Link> est unique en France : il vérifie si GPTBot, Claude-Web et PerplexityBot peuvent accéder à votre contenu, et analyse vos signaux E-E-A-T que les IA utilisent pour vous citer.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section — White */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl font-heading font-bold text-ink mb-10 text-center">
                                Questions fréquentes
                            </h2>

                            <div className="space-y-3">
                                {FAQ_ITEMS.map((item, index) => (
                                    <details key={index} className="group bg-fond-clair rounded-xl border border-line overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                                            <h3 className="text-base font-bold text-ink pr-4">
                                                {item.question}
                                            </h3>
                                            <span className="text-soft group-open:rotate-180 transition-transform duration-200 flex-shrink-0">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="px-5 pb-5 pt-0">
                                            <p className="text-soft leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Maillage Section — Light gray */}
                <section className="py-16 md:py-20 bg-gray-50 border-t border-line">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                                Complétez votre stratégie SEO
                            </h2>

                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Services */}
                                <div className="bg-white rounded-xl border border-line p-6 shadow-sm">
                                    <h3 className="font-bold text-ink mb-4">Services SEO</h3>
                                    <ul className="space-y-3">
                                        <li>
                                            <Link href="/audit-seo" className="text-soft hover:text-sauge transition-colors text-sm flex items-center gap-2">
                                                <ArrowRight className="w-3 h-3 text-sauge" />
                                                Audit SEO complet
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/referencement-naturel" className="text-soft hover:text-sauge transition-colors text-sm flex items-center gap-2">
                                                <ArrowRight className="w-3 h-3 text-sauge" />
                                                Référencement naturel
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/creation-site-web" className="text-soft hover:text-sauge transition-colors text-sm flex items-center gap-2">
                                                <ArrowRight className="w-3 h-3 text-sauge" />
                                                Création de site web
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* Blog */}
                                <div className="bg-white rounded-xl border border-line p-6 shadow-sm">
                                    <h3 className="font-bold text-ink mb-4">Articles SEO</h3>
                                    <ul className="space-y-3">
                                        <li>
                                            <Link href="/blog/geo-comment-apparaitre-chatgpt-2026" className="text-soft hover:text-sauge transition-colors text-sm flex items-center gap-2">
                                                <ArrowRight className="w-3 h-3 text-sauge" />
                                                Guide complet du GEO
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/blog" className="text-soft hover:text-sauge transition-colors text-sm flex items-center gap-2">
                                                <ArrowRight className="w-3 h-3 text-sauge" />
                                                Tous les articles
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* Local */}
                                <div className="bg-white rounded-xl border border-line p-6 shadow-sm">
                                    <h3 className="font-bold text-ink mb-4">SEO Local</h3>
                                    <ul className="space-y-3">
                                        <li>
                                            <Link href="/consultant-seo-nice" className="text-soft hover:text-sauge transition-colors text-sm flex items-center gap-2">
                                                <ArrowRight className="w-3 h-3 text-sauge" />
                                                Consultante SEO Nice
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/consultant-seo-cannes" className="text-soft hover:text-sauge transition-colors text-sm flex items-center gap-2">
                                                <ArrowRight className="w-3 h-3 text-sauge" />
                                                Consultante SEO Cannes
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/consultant-seo-sophia-antipolis" className="text-soft hover:text-sauge transition-colors text-sm flex items-center gap-2">
                                                <ArrowRight className="w-3 h-3 text-sauge" />
                                                Consultante SEO Sophia-Antipolis
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section — Dark */}
                <section className="py-16 md:py-20 bg-ink relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sauge/15 rounded-full blur-[150px]" />

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <h2 className="text-3xl font-heading font-bold text-white mb-6">
                            Besoin d'aller plus loin ?
                        </h2>
                        <p className="text-soft-light text-lg mb-8 max-w-2xl mx-auto">
                            Ces outils vous donnent un aperçu. Pour une stratégie SEO et GEO complète avec accompagnement personnalisé, je suis là pour vous.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full font-bold transition-colors"
                            >
                                Demander un audit personnalisé
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/blog/geo-comment-apparaitre-chatgpt-2026"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors"
                            >
                                En savoir plus sur le GEO
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
