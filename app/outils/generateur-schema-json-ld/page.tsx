import { Metadata } from "next";
import Link from "next/link";
import { SchemaGenerator } from "./SchemaGenerator";
import { ArrowRight, Code2, Bot, FileCode, Search, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Générateur Schema JSON-LD Gratuit — Données Structurées",
    description: "Créez vos données structurées en quelques clics. LocalBusiness, FAQPage, Article, Product... Générateur gratuit avec prévisualisation et validation.",
    alternates: {
        canonical: "https://indhack.com/outils/generateur-schema-json-ld"
    },
    openGraph: {
        title: "Générateur Schema JSON-LD Gratuit",
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
        gradient: "from-violet-500 to-purple-600",
    },
    {
        title: "Générateur robots.txt",
        description: "Configurez votre robots.txt avec les crawlers IA",
        href: "/outils/generateur-robots-txt",
        icon: FileCode,
        gradient: "from-cyan-500 to-blue-600",
    },
    {
        title: "Audit SEO Gratuit",
        description: "Analysez votre site en 1 clic, score /100",
        href: "/outils/audit-seo-gratuit",
        icon: Search,
        gradient: "from-emerald-500 to-teal-600",
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

            <main className="min-h-screen bg-ink">
                {/* Hero */}
                <section className="relative pt-32 pb-16 overflow-hidden">
                    {/* Background effects */}
                    <div className="absolute inset-0 bg-gradient-to-b from-fond-sombre via-ink to-ink" />
                    <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[150px]" />
                    <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-[120px]" />

                    {/* Dot grid */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '24px 24px'
                        }}
                    />

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Fil d'Ariane">
                            <ol className="flex items-center gap-2 text-sm text-white/50">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li className="text-white/30">/</li>
                                <li><Link href="/outils" className="hover:text-white transition-colors">Outils SEO</Link></li>
                                <li className="text-white/30">/</li>
                                <li className="text-white font-medium">Générateur Schema</li>
                            </ol>
                        </nav>

                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                                <Code2 className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sauge/10 border border-sauge/20 text-sauge text-sm font-medium mb-4">
                                    <Sparkles className="w-4 h-4" />
                                    9 types de schema supportés
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                                    Générateur Schema JSON-LD
                                </h1>
                                <p className="text-lg text-white/60 max-w-2xl">
                                    Créez vos données structurées en quelques clics.
                                    Prévisualisation en temps réel, copie en un clic.
                                </p>

                                {/* Stats badges */}
                                <div className="flex flex-wrap gap-4 mt-8">
                                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                        <span className="text-white font-bold">9</span>
                                        <span className="text-white/60 ml-2">types de schema</span>
                                    </div>
                                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                        <span className="text-white font-bold">7</span>
                                        <span className="text-white/60 ml-2">templates sectoriels</span>
                                    </div>
                                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                        <span className="text-white font-bold">100%</span>
                                        <span className="text-white/60 ml-2">gratuit</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Generator */}
                <section className="py-12 relative">
                    <div className="container mx-auto px-4">
                        <SchemaGenerator />
                    </div>
                </section>

                {/* Why Schema Section */}
                <section className="py-16 bg-fond-sombre relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-ink via-fond-sombre to-fond-sombre" />
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <span className="px-4 py-2 rounded-full bg-sauge/10 border border-sauge/20 text-sauge text-xs font-semibold uppercase tracking-[0.2em]">
                                    Guide
                                </span>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-6 mb-4">
                                    Les données structurées au service de votre visibilité
                                </h2>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8">
                                <p className="text-white/70 text-lg leading-relaxed mb-6">
                                    Les schémas JSON-LD permettent aux moteurs de recherche et aux <strong className="text-white">IA génératives</strong> de comprendre précisément le contenu de vos pages. C'est l'un des piliers d'une <Link href="/referencement-naturel" className="text-sauge hover:underline">stratégie de référencement naturel</Link> efficace.
                                </p>
                                <p className="text-white/70 text-lg leading-relaxed">
                                    Un <Link href="/audit-seo" className="text-sauge hover:underline">audit SEO professionnel</Link> vérifie systématiquement la présence et la validité de ces balises. Vous pouvez aussi utiliser notre <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">testeur de visibilité IA</Link> pour voir si vos schémas sont correctement détectés.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Maillage Section */}
                <section className="py-16 bg-ink">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-8 text-center">
                                Ressources SEO IndHack
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                                    <h3 className="font-bold text-white mb-4">Articles SEO & données structurées</h3>
                                    <ul className="space-y-3">
                                        <li>
                                            <Link href="/blog/importance-audit-seo" className="text-sauge hover:underline">
                                                L'importance d'un audit SEO pour votre site
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/blog/contenu-rapport-audit-seo" className="text-sauge hover:underline">
                                                Que contient un rapport d'audit SEO ?
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/blog/pourquoi-consultant-seo" className="text-sauge hover:underline">
                                                Pourquoi travailler avec un consultant SEO
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                                    <h3 className="font-bold text-white mb-4">Expertise SEO locale</h3>
                                    <ul className="space-y-3">
                                        <li>
                                            <Link href="/consultant-seo-nice" className="text-sauge hover:underline">
                                                Consultante SEO à Nice
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/consultant-seo-cannes" className="text-sauge hover:underline">
                                                Consultante SEO à Cannes
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/consultant-seo-antibes" className="text-sauge hover:underline">
                                                Consultante SEO à Antibes
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Tools */}
                <section className="py-16 bg-fond-sombre">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-8 text-center">
                            Outils complémentaires
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {RELATED_TOOLS.map((tool) => {
                                const Icon = tool.icon;
                                return (
                                    <Link
                                        key={tool.href}
                                        href={tool.href}
                                        className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-sauge/30 transition-all hover:bg-white/10"
                                    >
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-bold text-white mb-2 group-hover:text-sauge transition-colors">
                                            {tool.title}
                                        </h3>
                                        <p className="text-sm text-white/60">{tool.description}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-16 bg-ink">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-8 text-center">
                                Questions Fréquentes
                            </h2>
                            <div className="space-y-4">
                                {FAQ_ITEMS.map((item, index) => (
                                    <details
                                        key={index}
                                        className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                                    >
                                        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                            <h3 className="font-bold text-white pr-4">{item.question}</h3>
                                            <svg
                                                className="w-5 h-5 text-white/50 flex-shrink-0 transition-transform group-open:rotate-180"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </summary>
                                        <div className="px-6 pb-6 pt-0">
                                            <p className="text-white/60 leading-relaxed">{item.answer}</p>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-fond-sombre relative overflow-hidden">
                    {/* Background effects */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-sauge/20 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px]" />

                    <div className="container mx-auto px-4 text-center relative z-10">
                        <span className="px-4 py-2 rounded-full bg-sauge/10 border border-sauge/20 text-sauge text-xs font-semibold uppercase tracking-[0.2em]">
                            Prochaine étape
                        </span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-6 mb-4">
                            Besoin d'une stratégie SEO complète ?
                        </h2>
                        <p className="text-white/60 mb-8 max-w-xl mx-auto text-lg">
                            Le schema JSON-LD est un élément parmi d'autres. Pour une optimisation SEO globale,
                            je vous accompagne.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white text-ink px-8 py-4 rounded-full font-bold hover:bg-sauge hover:text-white transition-all shadow-2xl shadow-white/10"
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
