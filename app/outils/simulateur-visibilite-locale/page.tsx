import { Metadata } from "next";
import Link from "next/link";
import { SimulateurLocal } from "./SimulateurLocal";
import { ArrowRight, MapPin, Search, Bot, Code2, Target, TrendingUp, Users } from "lucide-react";

export const metadata: Metadata = {
    title: "Simulateur Visibilité Locale — Analysez la SERP de votre ville",
    description: "Qui domine Google pour votre métier dans votre ville ? Analysez les 10 premiers résultats, identifiez les plateformes vs commerces locaux. Gratuit, sans inscription.",
    alternates: {
        canonical: "https://indhack.com/outils/simulateur-visibilite-locale"
    },
    openGraph: {
        title: "Simulateur Visibilité Locale — Analysez la concurrence Google",
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
        answer: "L'outil interroge Google avec la requête '[votre métier] [votre ville]' et analyse les 10 premiers résultats organiques. Il classe chaque résultat en catégorie : plateforme nationale (PagesJaunes, Doctolib, TripAdvisor...), annuaire en ligne, ou site local (commerce indépendant). Vous voyez ainsi qui domine réellement la page 1."
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
        answer: "Les résultats Google sont actualisés régulièrement mais mis en cache pendant 7 jours pour optimiser les performances. Les positions peuvent légèrement varier selon l'heure, la localisation et l'historique de recherche. L'outil donne une vision représentative de la SERP."
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
                        "name": "Simulateur Visibilité Locale IndHack",
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
                            "name": "IndHack",
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

            <main className="min-h-screen bg-ink">
                {/* Hero + Tool Section */}
                <section className="pt-28 pb-16 relative overflow-hidden">
                    <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-sauge/10 rounded-full blur-[150px] pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sauge/5 rounded-full blur-[180px] pointer-events-none" />

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Fil d'Ariane">
                            <ol className="flex items-center gap-2 text-sm text-white/40">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li className="text-white/20">/</li>
                                <li><Link href="/outils" className="hover:text-white transition-colors">Outils SEO</Link></li>
                                <li className="text-white/20">/</li>
                                <li className="text-white font-medium">Simulateur Visibilité Locale</li>
                            </ol>
                        </nav>

                        {/* Header - Compact */}
                        <div className="max-w-3xl mx-auto text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sauge/20 border border-sauge/30 rounded-full text-sauge text-sm font-bold mb-4">
                                <MapPin className="w-4 h-4" />
                                <span className="uppercase tracking-wider text-xs">Analyse SERP locale</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                                Simulateur Visibilité <span className="text-sauge">Locale</span>
                            </h1>
                            <p className="text-white/60 text-lg">
                                Qui domine la page 1 de Google pour votre métier dans votre ville ?
                                Plateformes nationales ou commerces locaux ? Identifiez vos opportunités SEO.
                            </p>
                        </div>

                        {/* Tool */}
                        <SimulateurLocal />
                    </div>
                </section>

                {/* Features */}
                <section className="py-16 bg-fond-sombre border-t border-white/5">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-heading font-bold text-white text-center mb-10">
                            Ce que l&apos;outil <span className="text-sauge">analyse</span>
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                            <div className="bg-white/5 rounded-xl p-5 border border-white/10 text-center">
                                <div className="w-10 h-10 rounded-lg bg-sauge/20 flex items-center justify-center mx-auto mb-3">
                                    <Search className="w-5 h-5 text-sauge" />
                                </div>
                                <h3 className="font-bold text-white text-sm mb-1">Top 10 Google</h3>
                                <p className="text-xs text-white/50">Analyse des 10 premiers résultats organiques pour votre requête locale</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-5 border border-white/10 text-center">
                                <div className="w-10 h-10 rounded-lg bg-sauge/20 flex items-center justify-center mx-auto mb-3">
                                    <Users className="w-5 h-5 text-sauge" />
                                </div>
                                <h3 className="font-bold text-white text-sm mb-1">Classification</h3>
                                <p className="text-xs text-white/50">Plateformes (PagesJaunes, Doctolib...) vs annuaires vs sites locaux</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-5 border border-white/10 text-center">
                                <div className="w-10 h-10 rounded-lg bg-sauge/20 flex items-center justify-center mx-auto mb-3">
                                    <TrendingUp className="w-5 h-5 text-sauge" />
                                </div>
                                <h3 className="font-bold text-white text-sm mb-1">Opportunités</h3>
                                <p className="text-xs text-white/50">Niveau de concurrence et recommandations SEO personnalisées</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Tools */}
                <section className="py-16 bg-ink border-t border-white/5">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-heading font-bold text-white text-center mb-8">
                            Outils <span className="text-sauge">complémentaires</span>
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                            {RELATED_TOOLS.map((tool) => {
                                const Icon = tool.icon;
                                return (
                                    <Link
                                        key={tool.href}
                                        href={tool.href}
                                        className="group bg-white/5 rounded-xl p-5 border border-white/10 hover:border-sauge/30 hover:bg-white/10 transition-all"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-sauge/20 flex items-center justify-center mb-3 group-hover:bg-sauge/30 transition-colors">
                                            <Icon className="w-5 h-5 text-sauge" />
                                        </div>
                                        <h3 className="font-bold text-white mb-1 group-hover:text-sauge transition-colors">{tool.title}</h3>
                                        <p className="text-sm text-white/50">{tool.description}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-16 bg-ink border-t border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl font-heading font-bold text-white text-center mb-8">
                                Questions <span className="text-sauge">Fréquentes</span>
                            </h2>
                            <div className="space-y-3">
                                {FAQ_ITEMS.map((item, index) => (
                                    <details
                                        key={index}
                                        className="group bg-white/5 rounded-xl border border-white/10 overflow-hidden"
                                    >
                                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                                            <span className="font-medium text-white pr-4 text-sm">{item.question}</span>
                                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-open:rotate-180 transition-transform">
                                                <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="px-5 pb-5">
                                            <p className="text-white/60 text-sm leading-relaxed">{item.answer}</p>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-fond-sombre border-t border-white/5">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                            Besoin de dominer votre <span className="text-sauge">marché local</span> ?
                        </h2>
                        <p className="text-white/50 mb-8 max-w-xl mx-auto">
                            Cet outil vous montre la situation. Pour une stratégie SEO local complète
                            (Google Business, citations, backlinks locaux), je vous accompagne.
                        </p>
                        <Link
                            href="/seo-local"
                            className="inline-flex items-center gap-2 bg-white text-ink px-8 py-4 rounded-full font-bold hover:bg-sauge hover:text-white transition-all"
                        >
                            Découvrir l&apos;offre SEO Local
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
