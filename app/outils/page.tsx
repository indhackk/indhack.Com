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
    Shield
} from "lucide-react";

export const metadata: Metadata = {
    title: "Outils SEO Gratuits 2026 — Audit, Visibilité IA, Schema",
    description: "5 outils SEO gratuits et uniques : audit SEO avec analyse IA, testeur visibilité ChatGPT/Perplexity, générateur robots.txt crawlers IA, schema JSON-LD. Sans inscription.",
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
        title: "Testeur Visibilité IA",
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
        title: "Générateur Schema JSON-LD",
        description: "Créez vos données structurées sans coder.",
        longDescription: "9 types de schema supportés : LocalBusiness, FAQPage, Article, Product, Organization... Indispensable pour les rich snippets et la visibilité IA.",
        icon: Code2,
        href: "/outils/generateur-schema-json-ld",
        color: "from-blue-500 to-indigo-600",
        features: ["9 types de schema", "Validation intégrée", "Rich snippets Google"],
    },
    {
        id: "simulateur-visibilite-locale",
        title: "Simulateur Visibilité Locale",
        description: "Qui domine Google dans votre ville ?",
        longDescription: "Analysez les 10 premiers résultats Google pour votre métier + ville. Identifiez les opportunités SEO local et la part des plateformes vs commerces indépendants.",
        icon: MapPin,
        href: "/outils/simulateur-visibilite-locale",
        color: "from-orange-500 to-red-500",
        features: ["Analyse SERP locale", "Classification plateformes/locaux", "Score d'opportunité"],
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

            <main className="min-h-screen bg-fond-clair">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-fond-sombre via-fond-sombre to-sauge/30" />
                    <div className="absolute top-20 left-10 w-72 h-72 bg-sauge/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Fil d'Ariane">
                            <ol className="flex items-center gap-2 text-sm text-texte-moyen">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li>/</li>
                                <li className="text-white font-medium">Outils SEO</li>
                            </ol>
                        </nav>

                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/20 rounded-full text-violet-300 text-sm font-medium mb-6">
                                <Sparkles className="w-4 h-4" />
                                {TOOLS.length} outils gratuits • Orientés IA & GEO
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                                Outils SEO Gratuits 2026
                            </h1>

                            <p className="text-xl text-texte-moyen leading-relaxed mb-4">
                                Les <strong className="text-white">seuls outils SEO français</strong> qui analysent votre visibilité sur Google <strong className="text-white">ET</strong> sur les IA génératives (ChatGPT, Perplexity, Claude).
                            </p>

                            <p className="text-lg text-texte-moyen leading-relaxed">
                                <span className="text-white font-medium">100% gratuits, sans inscription.</span> Préparez votre site pour le référencement de demain.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Benefits Bar */}
                <section className="py-8 bg-white border-b border-line">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-6">
                            {BENEFITS.map((benefit) => {
                                const Icon = benefit.icon;
                                return (
                                    <div key={benefit.title} className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-sauge/10 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-sauge" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-ink">{benefit.title}</h3>
                                            <p className="text-sm text-soft">{benefit.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Tools Grid */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {TOOLS.map((tool) => {
                                const Icon = tool.icon;
                                return (
                                    <Link key={tool.id} href={tool.href} className="group">
                                        <div className="relative bg-white rounded-2xl p-6 border border-line shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                                            {/* Badge */}
                                            {tool.badge && (
                                                <span className="absolute top-4 right-4 px-3 py-1 bg-violet-100 text-violet-700 text-xs font-bold rounded-full">
                                                    {tool.badge}
                                                </span>
                                            )}

                                            {/* Icon */}
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
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
                                            <div className="flex items-center gap-2 text-sauge font-medium text-sm mt-auto">
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

                {/* Why These Tools Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl font-heading font-bold text-ink mb-6 text-center">
                                Pourquoi ces outils sont différents
                            </h2>

                            <div className="prose prose-lg max-w-none text-soft">
                                <p>
                                    En 2026, <strong className="text-ink">le SEO ne se limite plus à Google</strong>. Vos clients utilisent ChatGPT, Perplexity et Gemini pour trouver des réponses. Si votre site n'est pas optimisé pour ces IA, vous êtes invisible pour une partie croissante de votre audience.
                                </p>

                                <p>
                                    C'est pourquoi j'ai créé <strong className="text-ink">les premiers outils SEO français orientés GEO</strong> (Generative Engine Optimization). Chaque outil analyse non seulement les critères SEO classiques, mais aussi votre compatibilité avec les crawlers IA.
                                </p>

                                <p>
                                    Mon <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline font-medium">Testeur de Visibilité IA</Link> est unique en France : il vérifie si GPTBot, Claude-Web et PerplexityBot peuvent accéder à votre contenu, et analyse vos signaux E-E-A-T que les IA utilisent pour vous citer.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl font-heading font-bold text-ink mb-12 text-center">
                                Questions Fréquentes
                            </h2>

                            <div className="space-y-6">
                                {FAQ_ITEMS.map((item, index) => (
                                    <div key={index} className="bg-white rounded-xl border border-line p-6">
                                        <h3 className="text-lg font-bold text-ink mb-3">
                                            {item.question}
                                        </h3>
                                        <p className="text-soft leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-fond-sombre">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-heading font-bold text-white mb-6">
                            Besoin d'aller plus loin ?
                        </h2>
                        <p className="text-texte-moyen text-lg mb-8 max-w-2xl mx-auto">
                            Ces outils vous donnent un aperçu. Pour une stratégie SEO et GEO complète avec accompagnement personnalisé, je suis là pour vous.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-sauge text-white px-8 py-4 rounded-full font-bold hover:bg-sauge/90 transition-colors"
                            >
                                Demander un audit personnalisé
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/blog/visibilite-ia-geo"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors"
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
