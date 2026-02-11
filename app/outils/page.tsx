import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
    Search,
    Bot,
    Code2,
    MapPin,
    Accessibility,
    Gauge,
    FileCode,
    Tags,
    ArrowRight,
    Sparkles
} from "lucide-react";

export const metadata: Metadata = {
    title: "Outils SEO Gratuits — Suite Complète d'Analyse | INDHACK",
    description: "8 outils SEO gratuits : audit technique, visibilité IA, générateur schema JSON-LD, accessibilité, vitesse... Analysez votre site sans inscription.",
    alternates: {
        canonical: "https://indhack.com/outils"
    },
    openGraph: {
        title: "Outils SEO Gratuits — Suite Complète d'Analyse | INDHACK",
        description: "8 outils SEO gratuits pour analyser et optimiser votre site web. Sans inscription, résultats instantanés.",
        url: "https://indhack.com/outils",
        type: "website",
    }
};

interface Tool {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    color: string;
    status: "live" | "coming";
}

const TOOLS: Tool[] = [
    {
        id: "audit-seo-gratuit",
        title: "Audit SEO Gratuit",
        description: "Analysez votre site en 1 clic. Score /100, 15 critères vérifiés dont la compatibilité IA.",
        icon: Search,
        href: "/outils/audit-seo-gratuit",
        color: "from-emerald-500 to-teal-600",
        status: "live" as const,
    },
    {
        id: "testeur-visibilite-ia",
        title: "Testeur Visibilité IA",
        description: "Votre site est-il visible par ChatGPT et Perplexity ? Vérifiez vos signaux GEO.",
        icon: Bot,
        href: "/outils/testeur-visibilite-ia",
        color: "from-violet-500 to-purple-600",
        status: "live" as const,
    },
    {
        id: "generateur-schema-json-ld",
        title: "Générateur Schema JSON-LD",
        description: "Créez vos données structurées en quelques clics. LocalBusiness, FAQ, Article...",
        icon: Code2,
        href: "/outils/generateur-schema-json-ld",
        color: "from-blue-500 to-indigo-600",
        status: "live" as const,
    },
    {
        id: "simulateur-visibilite-locale",
        title: "Simulateur Visibilité Locale",
        description: "Qui domine la page 1 Google pour votre métier et votre ville ?",
        icon: MapPin,
        href: "/outils/simulateur-visibilite-locale",
        color: "from-orange-500 to-red-500",
        status: "live" as const,
    },
    {
        id: "checker-accessibilite",
        title: "Checker Accessibilité",
        description: "Testez la conformité RGAA de votre site. Score accessibilité instantané.",
        icon: Accessibility,
        href: "/outils/checker-accessibilite",
        color: "from-pink-500 to-rose-600",
        status: "live" as const,
    },
    {
        id: "analyseur-vitesse-site",
        title: "Analyseur Vitesse",
        description: "Mesurez les performances de votre site. Core Web Vitals simplifiés.",
        icon: Gauge,
        href: "/outils/analyseur-vitesse-site",
        color: "from-amber-500 to-orange-600",
        status: "live" as const,
    },
    {
        id: "generateur-robots-txt",
        title: "Générateur robots.txt",
        description: "Configurez votre robots.txt avec les crawlers IA 2026. GPTBot, Claude, Perplexity...",
        icon: FileCode,
        href: "/outils/generateur-robots-txt",
        color: "from-cyan-500 to-blue-600",
        status: "live" as const,
    },
    {
        id: "extracteur-mots-cles",
        title: "Extracteur Mots-clés",
        description: "Extrayez les mots-clés d'une page ou d'un texte. Nuage de mots interactif.",
        icon: Tags,
        href: "/outils/extracteur-mots-cles",
        color: "from-lime-500 to-green-600",
        status: "live" as const,
    },
];

const FAQ_ITEMS = [
    {
        question: "Ces outils sont-ils vraiment gratuits ?",
        answer: "Oui, 100% gratuits et sans inscription. Pas de limite d'utilisation, pas de carte bancaire demandée. Notre modèle : vous découvrez notre expertise via ces outils, et si vous avez besoin d'aller plus loin, vous faites appel à nos services."
    },
    {
        question: "Mes données sont-elles stockées ?",
        answer: "Les résultats sont temporairement mis en cache (24h) pour améliorer les performances, puis supprimés. Nous ne conservons aucune donnée personnelle. Conformité RGPD totale."
    },
    {
        question: "Puis-je utiliser ces outils pour mes clients ?",
        answer: "Absolument. Agences SEO, freelances, webmasters : vous pouvez utiliser ces outils pour vos propres audits clients. Une mention INDHACK est toujours appréciée."
    },
    {
        question: "Quelle différence avec les outils payants ?",
        answer: "Nos outils se concentrent sur l'essentiel avec une approche française et des explications claires. Pas de fonctionnalités inutiles, pas de dashboards complexes. L'efficacité avant tout."
    },
    {
        question: "Les outils fonctionnent-ils sur tous les sites ?",
        answer: "Oui, sur n'importe quel site web accessible publiquement. Sites WordPress, Shopify, Wix, sur-mesure... peu importe la technologie utilisée."
    },
];

export default function OutilsPage() {
    const liveTools = TOOLS.filter(t => t.status === "live");
    const comingTools = TOOLS.filter(t => t.status === "coming");

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": "Outils SEO Gratuits INDHACK",
                        "description": "Suite d'outils SEO gratuits pour analyser et optimiser votre site web",
                        "numberOfItems": TOOLS.length,
                        "itemListElement": TOOLS.map((tool, index) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "item": {
                                "@type": "WebApplication",
                                "name": tool.title,
                                "description": tool.description,
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
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Accueil",
                                "item": "https://indhack.com"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Outils SEO",
                                "item": "https://indhack.com/outils"
                            }
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
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": item.answer
                            }
                        }))
                    })
                }}
            />

            <main className="min-h-screen bg-fond-clair">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-fond-sombre via-fond-sombre to-sauge/30" />

                    {/* Decorative elements */}
                    <div className="absolute top-20 left-10 w-72 h-72 bg-sauge/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-sauge/10 rounded-full blur-3xl" />

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Fil d'Ariane">
                            <ol className="flex items-center gap-2 text-sm text-texte-moyen">
                                <li>
                                    <Link href="/" className="hover:text-white transition-colors">
                                        Accueil
                                    </Link>
                                </li>
                                <li>/</li>
                                <li className="text-white font-medium">Outils SEO</li>
                            </ol>
                        </nav>

                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sauge/20 rounded-full text-sauge text-sm font-medium mb-6">
                                <Sparkles className="w-4 h-4" />
                                {liveTools.length} outils disponibles • {comingTools.length} à venir
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                                Outils SEO Gratuits
                            </h1>

                            <p className="text-xl text-texte-moyen leading-relaxed mb-8">
                                Analysez, optimisez et améliorez votre site web avec notre suite d'outils SEO.
                                <span className="text-white font-medium"> 100% gratuits, sans inscription.</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Tools Grid */}
                <section className="py-20 -mt-10">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {TOOLS.map((tool) => {
                                const Icon = tool.icon;
                                const isLive = tool.status === "live";

                                const CardContent = (
                                    <div className={`group relative bg-white rounded-2xl p-6 border border-line shadow-sm transition-all duration-300 ${
                                        isLive ? 'hover:shadow-xl hover:-translate-y-1' : 'opacity-60'
                                    }`}>
                                        {/* Status badge */}
                                        {!isLive && (
                                            <span className="absolute top-4 right-4 px-2 py-1 bg-gray-100 text-soft text-xs font-medium rounded-full">
                                                Bientôt
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
                                            {tool.description}
                                        </p>

                                        {/* CTA */}
                                        {isLive && (
                                            <div className="flex items-center gap-2 text-sauge font-medium text-sm">
                                                Utiliser l'outil
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        )}
                                    </div>
                                );

                                return isLive ? (
                                    <Link key={tool.id} href={tool.href}>
                                        {CardContent}
                                    </Link>
                                ) : (
                                    <div key={tool.id}>
                                        {CardContent}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl font-heading font-bold text-ink mb-12 text-center">
                                Questions Fréquentes
                            </h2>

                            <div className="space-y-6">
                                {FAQ_ITEMS.map((item, index) => (
                                    <div key={index} className="border-b border-line pb-6">
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
                            Ces outils vous donnent un aperçu. Pour une stratégie SEO complète et personnalisée,
                            nos experts sont là pour vous accompagner.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-sauge text-white px-8 py-4 rounded-full font-bold hover:bg-sauge/90 transition-colors"
                        >
                            Demander un audit personnalisé
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
