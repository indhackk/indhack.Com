import { Metadata } from "next";
import Link from "next/link";
import { SchemaGenerator } from "./SchemaGenerator";
import { ArrowRight, Code2, Bot, FileCode, Search } from "lucide-react";

export const metadata: Metadata = {
    title: "Générateur Schema JSON-LD Gratuit — Données Structurées | INDHACK",
    description: "Créez vos données structurées en quelques clics. LocalBusiness, FAQPage, Article, Product... Générateur gratuit avec prévisualisation et validation.",
    alternates: {
        canonical: "https://indhack.com/outils/generateur-schema-json-ld"
    },
    openGraph: {
        title: "Générateur Schema JSON-LD Gratuit | INDHACK",
        description: "Créez vos données structurées Schema.org en quelques clics. 9 types de schema supportés. Gratuit, sans inscription.",
        url: "https://indhack.com/outils/generateur-schema-json-ld",
        type: "website",
    }
};

const RELATED_TOOLS = [
    {
        title: "Testeur Visibilité IA",
        description: "Vérifiez si votre site est visible par ChatGPT et Perplexity",
        href: "/outils/testeur-visibilite-ia",
        icon: Bot,
        status: "live" as const,
    },
    {
        title: "Générateur robots.txt",
        description: "Configurez votre robots.txt avec les crawlers IA",
        href: "/outils/generateur-robots-txt",
        icon: FileCode,
        status: "live" as const,
    },
    {
        title: "Audit SEO Gratuit",
        description: "Analysez votre site en 1 clic, score /100",
        href: "/outils/audit-seo-gratuit",
        icon: Search,
        status: "coming" as const,
    },
];

const FAQ_ITEMS = [
    {
        question: "Qu'est-ce que le Schema JSON-LD ?",
        answer: "Le Schema JSON-LD est un format de données structurées recommandé par Google. Il permet aux moteurs de recherche de mieux comprendre le contenu de vos pages et d'afficher des résultats enrichis (rich snippets) : étoiles, FAQ, horaires, prix..."
    },
    {
        question: "Pourquoi utiliser des données structurées ?",
        answer: "Les données structurées améliorent votre visibilité dans Google (rich snippets), augmentent votre taux de clic (CTR), et préparent votre site pour les IA génératives (ChatGPT, Perplexity) qui utilisent ces données pour répondre aux questions des utilisateurs."
    },
    {
        question: "Quel type de Schema choisir ?",
        answer: "Cela dépend de votre activité. LocalBusiness pour les commerces et artisans locaux, FAQPage pour les pages de questions/réponses, Article pour les blogs, Product pour l'e-commerce, Organization pour les entreprises, Person pour les freelances..."
    },
    {
        question: "Où placer le code JSON-LD ?",
        answer: "Le code JSON-LD doit être placé dans la balise <head> de votre page HTML, ou juste avant la fermeture de </body>. Sur WordPress, utilisez un plugin comme Yoast SEO ou RankMath, ou ajoutez-le manuellement dans votre thème."
    },
    {
        question: "Comment vérifier que mon Schema fonctionne ?",
        answer: "Utilisez l'outil Rich Results Test de Google (search.google.com/test/rich-results). Collez l'URL de votre page ou votre code JSON-LD. Google vous indiquera si le schema est valide et quels résultats enrichis sont détectés."
    },
];

export default function GenerateurSchemaPage() {
    return (
        <>
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Générateur Schema JSON-LD INDHACK",
                        "description": "Outil gratuit pour créer des données structurées Schema.org",
                        "url": "https://indhack.com/outils/generateur-schema-json-ld",
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
                        }
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
                            { "@type": "ListItem", "position": 3, "name": "Générateur Schema JSON-LD", "item": "https://indhack.com/outils/generateur-schema-json-ld" }
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
                    <div className="absolute inset-0 bg-gradient-to-br from-fond-sombre via-fond-sombre to-blue-900/30" />
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Fil d'Ariane">
                            <ol className="flex items-center gap-2 text-sm text-texte-moyen">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li>/</li>
                                <li><Link href="/outils" className="hover:text-white transition-colors">Outils SEO</Link></li>
                                <li>/</li>
                                <li className="text-white font-medium">Générateur Schema</li>
                            </ol>
                        </nav>

                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                                <Code2 className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                                    Générateur Schema JSON-LD
                                </h1>
                                <p className="text-lg text-texte-moyen max-w-2xl">
                                    Créez vos données structurées en quelques clics. 9 types de schema supportés.
                                    Prévisualisation en temps réel, copie en un clic.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Generator */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <SchemaGenerator />
                    </div>
                </section>

                {/* Related Tools */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8">
                            Outils complémentaires
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {RELATED_TOOLS.map((tool) => {
                                const Icon = tool.icon;
                                const isLive = tool.status === "live";
                                const content = (
                                    <>
                                        <Icon className="w-8 h-8 text-sauge mb-4" />
                                        <h3 className="font-bold text-ink mb-2 group-hover:text-sauge transition-colors">
                                            {tool.title}
                                            {!isLive && <span className="ml-2 text-xs text-soft">(Bientôt)</span>}
                                        </h3>
                                        <p className="text-sm text-soft">{tool.description}</p>
                                    </>
                                );
                                return isLive ? (
                                    <Link
                                        key={tool.href}
                                        href={tool.href}
                                        className="group p-6 bg-gray-50 rounded-2xl border border-line hover:border-sauge/30 transition-all"
                                    >
                                        {content}
                                    </Link>
                                ) : (
                                    <div
                                        key={tool.href}
                                        className="p-6 bg-gray-50 rounded-2xl border border-line opacity-60"
                                    >
                                        {content}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                                Questions Fréquentes
                            </h2>
                            <div className="space-y-6">
                                {FAQ_ITEMS.map((item, index) => (
                                    <div key={index} className="bg-white rounded-xl border border-line p-6">
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
                            Besoin d'une stratégie SEO complète ?
                        </h2>
                        <p className="text-texte-moyen mb-8 max-w-xl mx-auto">
                            Le schema JSON-LD est un élément parmi d'autres. Pour une optimisation SEO globale,
                            nos experts vous accompagnent.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-sauge text-white px-8 py-4 rounded-full font-bold hover:bg-sauge/90 transition-colors"
                        >
                            Demander un audit
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
