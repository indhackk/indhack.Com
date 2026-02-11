import { Metadata } from "next";
import Link from "next/link";
import { SimulateurLocal } from "./SimulateurLocal";
import { ArrowRight, MapPin, Search, Bot, Code2, Target, TrendingUp, Users } from "lucide-react";

export const metadata: Metadata = {
    title: "Simulateur Visibilité Locale — Analysez la SERP de votre ville | INDHACK",
    description: "Qui domine Google pour votre métier dans votre ville ? Analysez les 10 premiers résultats, identifiez les plateformes vs commerces locaux. Gratuit, sans inscription.",
    alternates: {
        canonical: "https://indhack.com/outils/simulateur-visibilite-locale"
    },
    openGraph: {
        title: "Simulateur Visibilité Locale — Analysez la concurrence Google | INDHACK",
        description: "Découvrez qui domine la page 1 de Google pour votre activité dans votre ville. Plateformes vs commerces locaux.",
        url: "https://indhack.com/outils/simulateur-visibilite-locale",
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
        description: "LocalBusiness pour le SEO local",
        href: "/outils/generateur-schema-json-ld",
        icon: Code2,
    },
];

const FAQ_ITEMS = [
    {
        question: "Comment fonctionne le simulateur de visibilité locale ?",
        answer: "Notre outil interroge Google avec la requête '[votre métier] [votre ville]' et analyse les 10 premiers résultats organiques. Il classe chaque résultat en catégorie : plateforme nationale (PagesJaunes, Doctolib, TripAdvisor...), annuaire en ligne, ou site local (commerce indépendant). Vous voyez ainsi qui domine réellement la page 1."
    },
    {
        question: "Que signifie le niveau d'opportunité ?",
        answer: "Le niveau d'opportunité (Élevé, Modéré, Faible) indique la difficulté à se positionner. Si peu de sites locaux sont présents en page 1, l'opportunité est élevée : il y a de la place pour votre site. Si beaucoup de concurrents locaux dominent déjà, la concurrence est plus rude et nécessite une stratégie SEO plus poussée."
    },
    {
        question: "Pourquoi les plateformes dominent-elles souvent ?",
        answer: "PagesJaunes, Doctolib, TripAdvisor et autres plateformes ont une autorité de domaine très forte et des milliers de pages optimisées. Google les favorise car elles offrent une expérience utilisateur structurée. C'est pourquoi il est crucial d'y être présent ET d'avoir son propre site bien référencé."
    },
    {
        question: "Comment utiliser ces résultats pour mon SEO ?",
        answer: "Identifiez les plateformes où vous n'êtes pas encore présent et créez-y un profil optimisé. Analysez les sites locaux bien positionnés pour comprendre leur stratégie. Ciblez le mot-clé '[métier] [ville]' dans votre title, H1, et contenu. Obtenez des backlinks locaux (presse, partenaires)."
    },
    {
        question: "Les résultats sont-ils en temps réel ?",
        answer: "Les résultats Google sont actualisés régulièrement mais mis en cache pendant 7 jours pour optimiser les performances. Les positions peuvent légèrement varier selon l'heure, la localisation et l'historique de recherche. Notre outil donne une vision représentative de la SERP."
    },
];

export default function SimulateurLocalPage() {
    return (
        <>
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Simulateur Visibilité Locale INDHACK",
                        "description": "Outil gratuit pour analyser qui domine Google pour votre métier dans votre ville",
                        "url": "https://indhack.com/outils/simulateur-visibilite-locale",
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
                            "Analyse des 10 premiers résultats Google",
                            "Classification plateformes vs locaux",
                            "Détection des opportunités SEO",
                            "Recommandations personnalisées",
                            "Statistiques de répartition"
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
                            { "@type": "ListItem", "position": 3, "name": "Simulateur Visibilité Locale", "item": "https://indhack.com/outils/simulateur-visibilite-locale" }
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
                    <div className="absolute inset-0 bg-gradient-to-br from-fond-sombre via-fond-sombre to-orange-900/30" />
                    <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Fil d'Ariane">
                            <ol className="flex items-center gap-2 text-sm text-texte-moyen">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li>/</li>
                                <li><Link href="/outils" className="hover:text-white transition-colors">Outils SEO</Link></li>
                                <li>/</li>
                                <li className="text-white font-medium">Simulateur Visibilité Locale</li>
                            </ol>
                        </nav>

                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/20 rounded-full text-orange-300 text-sm font-medium mb-4">
                                    <Target className="w-4 h-4" />
                                    Analyse SERP locale
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                                    Simulateur Visibilité Locale
                                </h1>
                                <p className="text-lg text-texte-moyen max-w-2xl">
                                    Qui domine la page 1 de Google pour votre métier dans votre ville ?
                                    Plateformes nationales ou commerces locaux ? Identifiez vos opportunités SEO.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tool */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <SimulateurLocal />
                    </div>
                </section>

                {/* Features */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            Ce que notre outil analyse
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 text-center">
                                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">Top 10 Google</h3>
                                <p className="text-sm text-soft">Analyse des 10 premiers résultats organiques pour votre requête locale</p>
                            </div>
                            <div className="p-6 bg-red-50 rounded-2xl border border-red-100 text-center">
                                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">Classification</h3>
                                <p className="text-sm text-soft">Plateformes (PagesJaunes, Doctolib...) vs annuaires vs sites locaux</p>
                            </div>
                            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 text-center">
                                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">Opportunités</h3>
                                <p className="text-sm text-soft">Niveau de concurrence et recommandations SEO personnalisées</p>
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
                                        className="group p-6 bg-white rounded-2xl border border-line hover:border-orange-300 transition-all"
                                    >
                                        <Icon className="w-8 h-8 text-orange-500 mb-4" />
                                        <h3 className="font-bold text-ink mb-2 group-hover:text-orange-600 transition-colors">
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
                            Besoin de dominer votre marché local ?
                        </h2>
                        <p className="text-texte-moyen mb-8 max-w-xl mx-auto">
                            Notre outil vous montre la situation. Pour une stratégie SEO local complète
                            (Google Business, citations, backlinks locaux), nos experts vous accompagnent.
                        </p>
                        <Link
                            href="/seo-local"
                            className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-colors"
                        >
                            Découvrir notre offre SEO Local
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
