import { Metadata } from "next";
import Link from "next/link";
import { ExtracteurMotsCles } from "./ExtracteurMotsCles";
import { ArrowRight, Tags, Search, Bot, Code2, FileCode } from "lucide-react";

export const metadata: Metadata = {
    title: "Extracteur de Mots-clés Gratuit — Analyse Sémantique | INDHACK",
    description: "Extrayez les mots-clés d'une URL ou d'un texte. Nuage de mots interactif, densité, bigrammes, trigrammes. Analysez les mots-clés SEO en 1 clic. Gratuit, sans inscription.",
    alternates: {
        canonical: "https://indhack.com/outils/extracteur-mots-cles"
    },
    openGraph: {
        title: "Extracteur de Mots-clés — Analyse Sémantique Gratuite | INDHACK",
        description: "Analysez les mots-clés d'une page web ou d'un texte. Nuage de mots, densité, expressions fréquentes. Gratuit, sans inscription.",
        url: "https://indhack.com/outils/extracteur-mots-cles",
        type: "website",
    }
};

const RELATED_TOOLS = [
    {
        title: "Audit SEO Gratuit",
        description: "Score SEO complet /100",
        href: "/outils/audit-seo-gratuit",
        icon: Search,
        status: "live" as const,
    },
    {
        title: "Testeur Visibilité IA",
        description: "ChatGPT vous trouve-t-il ?",
        href: "/outils/testeur-visibilite-ia",
        icon: Bot,
        status: "live" as const,
    },
    {
        title: "Générateur Schema JSON-LD",
        description: "Données structurées en 1 clic",
        href: "/outils/generateur-schema-json-ld",
        icon: Code2,
        status: "live" as const,
    },
];

const FAQ_ITEMS = [
    {
        question: "Comment fonctionne l'extracteur de mots-clés ?",
        answer: "Notre outil analyse le contenu d'une page web ou d'un texte que vous fournissez. Il identifie les mots significatifs en excluant les mots vides (le, la, de, etc.), calcule leur fréquence et leur densité, et les classe par importance en tenant compte de leur emplacement (title, H1, meta description, contenu)."
    },
    {
        question: "Quelle est la différence entre mode URL et mode texte ?",
        answer: "Le mode URL analyse une page web complète et détecte les mots-clés dans les zones SEO importantes (title, H1, meta, headings, alt images, liens). Le mode texte analyse simplement le texte que vous collez, sans distinction de zones. Le mode URL est idéal pour l'analyse SEO, le mode texte pour analyser un brouillon."
    },
    {
        question: "Que sont les bigrammes et trigrammes ?",
        answer: "Ce sont des expressions de 2 ou 3 mots consécutifs qui reviennent fréquemment. Par exemple, 'référencement naturel' (bigramme) ou 'consultant seo paris' (trigramme). Ces expressions sont souvent plus pertinentes que les mots isolés pour identifier les thématiques d'un contenu."
    },
    {
        question: "Comment interpréter la densité de mots-clés ?",
        answer: "La densité indique le pourcentage d'occurrences d'un mot par rapport au nombre total de mots. Une densité entre 1% et 3% est généralement recommandée pour un mot-clé cible. Au-delà, on risque le keyword stuffing. En dessous, le mot-clé n'est peut-être pas assez présent."
    },
    {
        question: "Puis-je analyser les mots-clés de mes concurrents ?",
        answer: "Absolument ! Entrez l'URL d'une page concurrente pour voir quels mots-clés sont ciblés, dans quelles zones (title, H1, contenu), et avec quelle densité. C'est un excellent moyen d'identifier les opportunités sémantiques à exploiter."
    },
];

export default function ExtracteurMotsClesPage() {
    return (
        <>
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Extracteur de Mots-clés INDHACK",
                        "description": "Outil gratuit pour extraire et analyser les mots-clés d'une page web ou d'un texte",
                        "url": "https://indhack.com/outils/extracteur-mots-cles",
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
                            "Extraction de mots-clés depuis URL",
                            "Analyse de texte",
                            "Nuage de mots interactif",
                            "Calcul de densité",
                            "Détection des bigrammes et trigrammes",
                            "Identification des zones SEO (title, H1, meta)"
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
                            { "@type": "ListItem", "position": 3, "name": "Extracteur Mots-clés", "item": "https://indhack.com/outils/extracteur-mots-cles" }
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
                    <div className="absolute inset-0 bg-gradient-to-br from-fond-sombre via-fond-sombre to-lime-900/30" />
                    <div className="absolute top-20 left-10 w-72 h-72 bg-lime-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Fil d'Ariane">
                            <ol className="flex items-center gap-2 text-sm text-texte-moyen">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li>/</li>
                                <li><Link href="/outils" className="hover:text-white transition-colors">Outils SEO</Link></li>
                                <li>/</li>
                                <li className="text-white font-medium">Extracteur Mots-clés</li>
                            </ol>
                        </nav>

                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center flex-shrink-0">
                                <Tags className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-500/20 rounded-full text-lime-300 text-sm font-medium mb-4">
                                    <FileCode className="w-4 h-4" />
                                    Nuage de mots + analyse complète
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                                    Extracteur de Mots-clés
                                </h1>
                                <p className="text-lg text-texte-moyen max-w-2xl">
                                    Analysez les mots-clés d'une page web ou d'un texte. Nuage de mots interactif,
                                    densité, bigrammes, trigrammes. Identifiez les opportunités sémantiques.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tool */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <ExtracteurMotsCles />
                    </div>
                </section>

                {/* Features */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            Ce que notre outil analyse
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <div className="p-6 bg-lime-50 rounded-2xl border border-lime-100 text-center">
                                <div className="w-12 h-12 bg-lime-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Tags className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">Mots-clés simples</h3>
                                <p className="text-sm text-soft">Fréquence, densité et emplacement de chaque mot significatif</p>
                            </div>
                            <div className="p-6 bg-green-50 rounded-2xl border border-green-100 text-center">
                                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">Zones SEO</h3>
                                <p className="text-sm text-soft">Title, H1, meta description, headings, images, liens</p>
                            </div>
                            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Code2 className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">Expressions</h3>
                                <p className="text-sm text-soft">Bigrammes et trigrammes fréquents pour identifier les thématiques</p>
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
                                        className="group p-6 bg-white rounded-2xl border border-line hover:border-lime-300 transition-all"
                                    >
                                        <Icon className="w-8 h-8 text-lime-500 mb-4" />
                                        <h3 className="font-bold text-ink mb-2 group-hover:text-lime-600 transition-colors">
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
                            Besoin d'une stratégie de mots-clés complète ?
                        </h2>
                        <p className="text-texte-moyen mb-8 max-w-xl mx-auto">
                            Notre outil extrait les mots-clés existants. Pour une recherche de mots-clés
                            stratégique avec analyse de la concurrence, nos experts vous accompagnent.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-lime-500 text-white px-8 py-4 rounded-full font-bold hover:bg-lime-600 transition-colors"
                        >
                            Demander un audit sémantique
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
