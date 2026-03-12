import { Metadata } from "next";
import Link from "next/link";
import { SchemaGenerator } from "./SchemaGenerator";
import { ArrowRight, Code2, Bot, FileCode, Search } from "lucide-react";

export const metadata: Metadata = {
    title: "Générateur schema JSON-LD gratuit — données structurées",
    description: "Créez vos données structurées Schema.org en quelques clics. LocalBusiness, FAQPage, Article, Product... Générateur SEO gratuit avec prévisualisation en temps réel.",
    alternates: {
        canonical: "https://indhack.com/outils/generateur-schema-json-ld"
    },
    openGraph: {
        title: "Générateur schema JSON-LD gratuit",
        description: "Créez vos données structurées Schema.org en quelques clics. 9 types de schema supportés. Gratuit, sans inscription.",
        url: "https://indhack.com/outils/generateur-schema-json-ld",
        type: "website",
    }
};

const RELATED_TOOLS = [
    {
        title: "Testeur de visibilité IA",
        description: "Vérifiez si votre site est visible par ChatGPT et Perplexity",
        href: "/outils/testeur-visibilite-ia",
        icon: Bot,
    },
    {
        title: "Générateur robots.txt",
        description: "Configurez votre robots.txt avec les crawlers IA",
        href: "/outils/generateur-robots-txt",
        icon: FileCode,
    },
    {
        title: "Audit SEO Gratuit",
        description: "Analysez votre site en 1 clic, score /100",
        href: "/outils/audit-seo-gratuit",
        icon: Search,
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
                        "@type": "SoftwareApplication",
                        "name": "Générateur Schema JSON-LD IndHack",
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
                            "name": "IndHack",
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
                <section className="pt-28 pb-16 relative overflow-hidden">
                    {/* Background effects */}
                    <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-sauge/10 rounded-full blur-[150px] pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sauge/5 rounded-full blur-[180px] pointer-events-none" />

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Fil d'Ariane">
                            <ol className="flex items-center gap-2 text-sm text-soft-light">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li className="text-white/20">/</li>
                                <li><Link href="/outils" className="hover:text-white transition-colors">Outils SEO</Link></li>
                                <li className="text-white/20">/</li>
                                <li className="text-white font-medium">Générateur Schema</li>
                            </ol>
                        </nav>

                        {/* Header - Compact */}
                        <div className="max-w-3xl mx-auto text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sauge/20 border border-sauge/30 rounded-full text-sauge text-sm font-bold mb-4">
                                <Code2 className="w-4 h-4" />
                                <span className="uppercase tracking-wider text-xs">9 types de schema supportés</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                                Générateur Schema <span className="text-sauge">JSON-LD</span>
                            </h1>
                            <p className="text-soft-light text-lg">
                                Créez vos données structurées en quelques clics. Prévisualisation en temps réel, copie en un clic.
                            </p>
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
                <section className="py-16 bg-fond-sombre border-t border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-heading font-bold text-white text-center mb-10">
                                Les données structurées au service de votre <span className="text-sauge">visibilité</span>
                            </h2>

                            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                                <p className="text-soft-light leading-relaxed mb-4">
                                    Les schémas JSON-LD permettent aux moteurs de recherche et aux <strong className="text-white">IA génératives</strong> de comprendre précisément le contenu de vos pages. C'est l'un des piliers d'une <Link href="/referencement-naturel" className="text-sauge hover:underline">stratégie de référencement naturel</Link> efficace.
                                </p>
                                <p className="text-soft-light leading-relaxed">
                                    Un <Link href="/audit-seo" className="text-sauge hover:underline">audit SEO professionnel</Link> vérifie systématiquement la présence et la validité de ces balises. Vous pouvez aussi utiliser notre <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">testeur de visibilité IA</Link> pour voir si vos schémas sont correctement détectés.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Internal Links */}
                <section className="py-12 bg-ink border-t border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
                            <div>
                                <h3 className="font-bold text-white mb-4">Articles SEO & données structurées</h3>
                                <ul className="space-y-2">
                                    {[
                                        { href: "/blog/importance-audit-seo", text: "L'importance d'un audit SEO pour votre site" },
                                        { href: "/blog/contenu-rapport-audit-seo", text: "Que contient un rapport d'audit SEO ?" },
                                        { href: "/blog/pourquoi-consultant-seo", text: "Pourquoi travailler avec un consultant SEO" },
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-soft-light hover:text-sauge transition-colors flex items-center gap-2 text-sm">
                                                <ArrowRight className="w-3 h-3 text-sauge" />
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-4">Expertise SEO locale</h3>
                                <ul className="space-y-2">
                                    {[
                                        { href: "/consultant-seo-nice", text: "Consultante SEO à Nice" },
                                        { href: "/consultant-seo-cannes", text: "Consultante SEO à Cannes" },
                                        { href: "/consultant-seo-antibes", text: "Consultante SEO à Antibes" },
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-soft-light hover:text-sauge transition-colors flex items-center gap-2 text-sm">
                                                <ArrowRight className="w-3 h-3 text-sauge" />
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Tools */}
                <section className="py-16 bg-fond-sombre border-t border-white/5">
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
                                        <p className="text-sm text-soft-light">{tool.description}</p>
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
                                                <svg className="w-3 h-3 text-soft-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="px-5 pb-5">
                                            <p className="text-soft-light text-sm leading-relaxed">{item.answer}</p>
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
                            Besoin d&apos;une stratégie <span className="text-sauge">SEO</span> complète ?
                        </h2>
                        <p className="text-soft-light mb-8 max-w-xl mx-auto">
                            Le schema JSON-LD est un élément parmi d'autres. Pour une optimisation SEO globale, je vous accompagne.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white text-ink px-8 py-4 rounded-full font-bold hover:bg-sauge hover:text-white transition-all"
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
