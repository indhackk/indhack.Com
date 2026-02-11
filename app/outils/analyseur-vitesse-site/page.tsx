import { Metadata } from "next";
import Link from "next/link";
import { AnalyseurVitesse } from "./AnalyseurVitesse";
import { ArrowRight, Gauge, Search, Bot, Code2, Zap, TrendingUp, Timer } from "lucide-react";

export const metadata: Metadata = {
    title: "Analyseur de Vitesse Site Web — Core Web Vitals Gratuit | INDHACK",
    description: "Mesurez les performances de votre site avec l'API PageSpeed. Core Web Vitals (LCP, FID, CLS, INP), score Lighthouse, opportunités d'optimisation. Gratuit, sans inscription.",
    alternates: {
        canonical: "https://indhack.com/outils/analyseur-vitesse-site"
    },
    openGraph: {
        title: "Analyseur de Vitesse — Core Web Vitals & Lighthouse | INDHACK",
        description: "Analysez les performances de votre site. Scores Lighthouse, Core Web Vitals, recommandations d'optimisation. Gratuit.",
        url: "https://indhack.com/outils/analyseur-vitesse-site",
        type: "website",
    }
};

const RELATED_TOOLS = [
    {
        title: "Audit SEO Gratuit",
        description: "Score SEO complet /100",
        href: "/outils/audit-seo-gratuit",
        icon: Search,
    },
    {
        title: "Testeur Visibilité IA",
        description: "ChatGPT vous trouve-t-il ?",
        href: "/outils/testeur-visibilite-ia",
        icon: Bot,
    },
    {
        title: "Générateur Schema JSON-LD",
        description: "Données structurées en 1 clic",
        href: "/outils/generateur-schema-json-ld",
        icon: Code2,
    },
];

const FAQ_ITEMS = [
    {
        question: "Que sont les Core Web Vitals ?",
        answer: "Les Core Web Vitals sont les métriques de performance clés définies par Google : LCP (Largest Contentful Paint) mesure le temps de chargement du contenu principal, FID/INP mesure l'interactivité, et CLS (Cumulative Layout Shift) mesure la stabilité visuelle. Ces métriques sont un facteur de classement SEO depuis 2021."
    },
    {
        question: "Pourquoi analyser en mode mobile et desktop ?",
        answer: "Google utilise l'indexation mobile-first, donc les performances mobiles sont prioritaires pour le SEO. Cependant, vos utilisateurs desktop méritent aussi une bonne expérience. Analyser les deux vous permet d'identifier les optimisations spécifiques à chaque plateforme."
    },
    {
        question: "Quel est un bon score Lighthouse ?",
        answer: "Un score de 90-100 est considéré comme bon (vert), 50-89 comme moyen nécessitant des améliorations (orange), et en dessous de 50 comme faible (rouge). Pour le SEO, visez au minimum 90 en Performance, surtout sur mobile."
    },
    {
        question: "Comment améliorer mon score de performance ?",
        answer: "Les optimisations les plus impactantes sont généralement : optimiser et compresser les images (WebP/AVIF), éliminer les ressources bloquantes (CSS/JS), activer la mise en cache et la compression serveur, différer le chargement du JavaScript non critique, et utiliser un CDN."
    },
    {
        question: "Les résultats sont-ils fiables ?",
        answer: "Notre outil utilise l'API officielle PageSpeed Insights de Google, qui effectue un audit Lighthouse complet. Les résultats peuvent légèrement varier entre les tests en raison des conditions réseau et serveur. Les données sont mises en cache 24h pour la cohérence."
    },
];

export default function AnalyseurVitessePage() {
    return (
        <>
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Analyseur Vitesse Site INDHACK",
                        "description": "Outil gratuit pour analyser les performances et Core Web Vitals d'un site web",
                        "url": "https://indhack.com/outils/analyseur-vitesse-site",
                        "applicationCategory": "SEO Tool",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "EUR"
                        },
                        "author": {
                            "@type": "Organization",
                            "name": "INDHACK",
                            "url": "https://indhack.com"
                        },
                        "featureList": [
                            "Analyse PageSpeed Insights",
                            "Scores Lighthouse (Performance, Accessibilité, SEO)",
                            "Core Web Vitals (LCP, FID, CLS, INP)",
                            "Mode mobile et desktop",
                            "Opportunités d'optimisation",
                            "Diagnostics détaillés"
                        ]
                    })
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://indhack.com" },
                            { "@type": "ListItem", "position": 2, "name": "Outils SEO", "item": "https://indhack.com/outils" },
                            { "@type": "ListItem", "position": 3, "name": "Analyseur Vitesse", "item": "https://indhack.com/outils/analyseur-vitesse-site" }
                        ]
                    })
                }}
            />

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
                {/* Hero */}
                <section className="relative pt-32 pb-12 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-fond-sombre via-fond-sombre to-amber-900/30" />
                    <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Fil d'Ariane">
                            <ol className="flex items-center gap-2 text-sm text-texte-moyen">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li>/</li>
                                <li><Link href="/outils" className="hover:text-white transition-colors">Outils SEO</Link></li>
                                <li>/</li>
                                <li className="text-white font-medium">Analyseur Vitesse</li>
                            </ol>
                        </nav>

                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                                <Gauge className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 rounded-full text-amber-300 text-sm font-medium mb-4">
                                    <Zap className="w-4 h-4" />
                                    Core Web Vitals + Lighthouse
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                                    Analyseur de Vitesse
                                </h1>
                                <p className="text-lg text-texte-moyen max-w-2xl">
                                    Mesurez les performances de votre site avec l'API PageSpeed Insights.
                                    Core Web Vitals, scores Lighthouse et recommandations d'optimisation.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tool */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <AnalyseurVitesse />
                    </div>
                </section>

                {/* Features */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            Ce que notre outil analyse
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 text-center">
                                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Gauge className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">Scores Lighthouse</h3>
                                <p className="text-sm text-soft">Performance, Accessibilité, Bonnes Pratiques et SEO sur 100</p>
                            </div>
                            <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 text-center">
                                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">Core Web Vitals</h3>
                                <p className="text-sm text-soft">LCP, FID/INP, CLS - les métriques clés pour le SEO Google</p>
                            </div>
                            <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100 text-center">
                                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Timer className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">Opportunités</h3>
                                <p className="text-sm text-soft">Recommandations prioritaires avec gains estimés</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Tools */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8">
                            Outils complémentaires
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {RELATED_TOOLS.map((tool) => {
                                const Icon = tool.icon;
                                return (
                                    <Link
                                        key={tool.href}
                                        href={tool.href}
                                        className="group p-6 bg-white rounded-2xl border border-line hover:border-amber-300 transition-all"
                                    >
                                        <Icon className="w-8 h-8 text-amber-500 mb-4" />
                                        <h3 className="font-bold text-ink mb-2 group-hover:text-amber-600 transition-colors">
                                            {tool.title}
                                        </h3>
                                        <p className="text-sm text-soft">{tool.description}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                                Questions Fréquentes
                            </h2>
                            <div className="space-y-6">
                                {FAQ_ITEMS.map((item, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl border border-line p-6">
                                        <h3 className="font-bold text-ink mb-3">{item.question}</h3>
                                        <p className="text-soft leading-relaxed">{item.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-fond-sombre">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">
                            Besoin d'optimiser les performances de votre site ?
                        </h2>
                        <p className="text-texte-moyen mb-8 max-w-xl mx-auto">
                            Notre outil identifie les problèmes. Pour une optimisation technique complète
                            (images, code, serveur, CDN), nos experts vous accompagnent.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-4 rounded-full font-bold hover:bg-amber-600 transition-colors"
                        >
                            Demander un audit performance
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
