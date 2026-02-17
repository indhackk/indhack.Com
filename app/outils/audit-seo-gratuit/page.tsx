import { Metadata } from "next";
import Link from "next/link";
import { AuditSEO } from "./AuditSEO";
import { ArrowRight, Search, Bot, Code2, FileCode, Gauge, TrendingUp, Zap, Target, MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "Audit SEO Gratuit en 1 Clic — Score /100",
    description: "Analysez gratuitement le SEO de votre site en 1 clic. Score /100, 15 critères vérifiés dont la compatibilité IA. Recommandations actionnables pour PME.",
    alternates: {
        canonical: "https://indhack.com/outils/audit-seo-gratuit"
    },
    openGraph: {
        title: "Audit SEO Gratuit — Score /100 en 30 secondes",
        description: "15 critères analysés dont la visibilité IA. Gratuit, sans inscription. L'outil SEO français de référence.",
        url: "https://indhack.com/outils/audit-seo-gratuit",
        type: "website",
    }
};

const RELATED_TOOLS = [
    {
        title: "Testeur Visibilité IA",
        description: "Votre site est-il visible par ChatGPT ?",
        href: "/outils/testeur-visibilite-ia",
        icon: Bot,
    },
    {
        title: "Générateur Schema JSON-LD",
        description: "Créez vos données structurées",
        href: "/outils/generateur-schema-json-ld",
        icon: Code2,
    },
    {
        title: "Générateur robots.txt",
        description: "Configurez vos crawlers IA",
        href: "/outils/generateur-robots-txt",
        icon: FileCode,
    },
];

const FAQ_ITEMS = [
    {
        question: "Qu'est-ce qu'un audit SEO ?",
        answer: "Un audit SEO est une analyse complète de votre site web pour identifier les problèmes techniques, de contenu et de référencement qui peuvent affecter votre visibilité sur Google et les moteurs de recherche. Cet outil analyse 15 critères essentiels en quelques secondes."
    },
    {
        question: "Combien de critères sont analysés ?",
        answer: "L'audit analyse 15 critères répartis en 4 catégories : Technique (HTTPS, viewport, vitesse, sitemap, robots.txt, Open Graph, Twitter Cards), Contenu (title, meta description, H1, structure Hn, ratio texte/HTML), Accessibilité (images alt) et IA-Ready (crawlers IA autorisés). C'est le seul outil gratuit français qui vérifie la compatibilité avec les crawlers IA."
    },
    {
        question: "L'audit est-il vraiment gratuit ?",
        answer: "Oui, 100% gratuit et sans inscription. Vous pouvez analyser jusqu'à 5 sites par heure. Les résultats sont mis en cache 24h pour améliorer les performances. Aucune carte bancaire n'est demandée."
    },
    {
        question: "Que signifie le score /100 ?",
        answer: "Le score reflète la santé SEO globale de votre page. Au-dessus de 80/100, votre SEO technique est excellent. Entre 50 et 80, des améliorations sont possibles. En dessous de 50, des problèmes critiques nécessitent votre attention. Chaque critère contribue au score selon son importance pour le référencement."
    },
    {
        question: "Que signifie IA-Ready ?",
        answer: "La catégorie IA-Ready analyse si votre site est accessible aux crawlers des IA génératives : GPTBot (OpenAI), Claude-Web (Anthropic), PerplexityBot, etc. Si vous bloquez ces crawlers dans votre robots.txt, votre contenu ne pourra pas être cité par ChatGPT ou Perplexity."
    },
];

const FEATURES = [
    { title: "Technique", description: "HTTPS, viewport, vitesse, sitemap, robots.txt, Open Graph", icon: Search },
    { title: "Contenu", description: "Title, meta description, H1, structure Hn, ratio texte/HTML", icon: Code2 },
    { title: "Accessibilité", description: "Images alt, attributs ARIA, labels de formulaires", icon: FileCode },
    { title: "IA-Ready", description: "Crawlers GPTBot, Claude-Web, PerplexityBot, Google-Extended", icon: Bot },
];

export default function AuditSEOPage() {
    return (
        <>
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Audit SEO Gratuit INDHACK",
                        "description": "Outil d'audit SEO gratuit analysant 15 critères techniques dont la compatibilité IA",
                        "url": "https://indhack.com/outils/audit-seo-gratuit",
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
                            "Analyse HTTPS et sécurité",
                            "Vérification balises title et meta",
                            "Analyse structure H1/H2/H3",
                            "Test mobile-friendly",
                            "Détection Schema JSON-LD",
                            "Vérification sitemap et robots.txt",
                            "Analyse crawlers IA (GPTBot, Claude, Perplexity)"
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
                            { "@type": "ListItem", "position": 3, "name": "Audit SEO Gratuit", "item": "https://indhack.com/outils/audit-seo-gratuit" }
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
                                <li className="text-white font-medium">Audit SEO Gratuit</li>
                            </ol>
                        </nav>

                        {/* Header - Compact */}
                        <div className="max-w-3xl mx-auto text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sauge/20 border border-sauge/30 rounded-full text-sauge text-sm font-bold mb-4">
                                <Gauge className="w-4 h-4" />
                                <span className="uppercase tracking-wider text-xs">Score /100 en 30 secondes</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                                Audit SEO <span className="text-sauge">Gratuit</span>
                            </h1>
                            <p className="text-white/60 text-lg">
                                Analysez votre site en 1 clic. 15 critères vérifiés dont la compatibilité avec les crawlers IA.
                            </p>
                        </div>

                        {/* Tool */}
                        <AuditSEO />
                    </div>
                </section>

                {/* Features */}
                <section className="py-16 bg-fond-sombre border-t border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-heading font-bold text-white text-center mb-10">
                                15 critères analysés en <span className="text-sauge">4 catégories</span>
                            </h2>

                            <div className="grid md:grid-cols-4 gap-4">
                                {FEATURES.map((feature) => {
                                    const Icon = feature.icon;
                                    return (
                                        <div key={feature.title} className="bg-white/5 rounded-xl p-5 border border-white/10">
                                            <div className="w-10 h-10 rounded-lg bg-sauge/20 flex items-center justify-center mb-3">
                                                <Icon className="w-5 h-5 text-sauge" />
                                            </div>
                                            <h3 className="font-bold text-white text-sm mb-1">{feature.title}</h3>
                                            <p className="text-xs text-white/50">{feature.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Audit Section */}
                <section className="py-16 bg-ink border-t border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-10">
                                <span className="px-4 py-2 rounded-full bg-sauge/20 border border-sauge/30 text-sauge text-xs font-bold uppercase tracking-wider">
                                    Guide
                                </span>
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mt-6 mb-4">
                                    Pourquoi auditer votre site <span className="text-sauge">SEO</span> ?
                                </h2>
                            </div>

                            <div className="bg-white/5 rounded-xl border border-white/10 p-6 mb-10">
                                <p className="text-white/60 leading-relaxed mb-4">
                                    <strong className="text-white">90% des sites web ont des problèmes SEO invisibles</strong> qui plombent leur visibilité Google. Balises title mal optimisées, images sans attribut alt, vitesse de chargement trop lente, absence de sitemap... Ces erreurs passent inaperçues mais coûtent cher en trafic perdu. Découvrez <Link href="/blog/contenu-rapport-audit-seo" className="text-sauge hover:underline">ce que contient un rapport d'audit SEO complet</Link>.
                                </p>
                                <p className="text-white/60 leading-relaxed">
                                    Un audit SEO révèle ces problèmes et vous donne une <strong className="text-white">roadmap claire</strong> pour les corriger. Cet outil analyse 15 critères essentiels en moins de 30 secondes — et contrairement aux autres outils, il vérifie aussi votre <strong className="text-white">compatibilité avec les crawlers IA</strong> (ChatGPT, Perplexity, Claude). Pour une analyse encore plus poussée de votre visibilité IA, utilisez notre <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">testeur de visibilité IA dédié</Link>.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-white/5 rounded-xl p-5 border border-white/10 text-center">
                                    <div className="w-10 h-10 rounded-lg bg-sauge/20 flex items-center justify-center mx-auto mb-3">
                                        <Zap className="w-5 h-5 text-sauge" />
                                    </div>
                                    <h3 className="font-bold text-white text-sm mb-1">Résultats en 30 sec</h3>
                                    <p className="text-xs text-white/50">
                                        Pas d'attente, pas de file. Entrez votre URL et obtenez votre score immédiatement.
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-5 border border-white/10 text-center">
                                    <div className="w-10 h-10 rounded-lg bg-sauge/20 flex items-center justify-center mx-auto mb-3">
                                        <Bot className="w-5 h-5 text-sauge" />
                                    </div>
                                    <h3 className="font-bold text-white text-sm mb-1">Analyse IA incluse</h3>
                                    <p className="text-xs text-white/50">
                                        Le seul audit gratuit qui vérifie si GPTBot, Claude et Perplexity peuvent accéder à votre site.
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-5 border border-white/10 text-center">
                                    <div className="w-10 h-10 rounded-lg bg-sauge/20 flex items-center justify-center mx-auto mb-3">
                                        <Target className="w-5 h-5 text-sauge" />
                                    </div>
                                    <h3 className="font-bold text-white text-sm mb-1">Actions concrètes</h3>
                                    <p className="text-xs text-white/50">
                                        Chaque problème détecté est accompagné d'une recommandation claire et actionnable.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10 bg-white/5 rounded-xl p-6 border border-sauge/20">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-sauge/20 flex items-center justify-center flex-shrink-0">
                                        <TrendingUp className="w-5 h-5 text-sauge" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-2">Après l'audit : passez à l'action</h3>
                                        <p className="text-white/60 text-sm mb-3">
                                            Cet outil gratuit vous donne un aperçu. Pour un <strong className="text-white">audit SEO professionnel complet</strong> avec analyse concurrentielle, étude sémantique et roadmap priorisée par ROI, découvrez mon accompagnement expert.
                                        </p>
                                        <Link href="/audit-seo" className="text-sauge font-medium hover:underline inline-flex items-center gap-2 text-sm">
                                            Découvrir l'audit SEO professionnel
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
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
                                        <p className="text-sm text-white/50">{tool.description}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Internal Links / Maillage */}
                <section className="py-12 bg-ink border-t border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
                            <div>
                                <h3 className="font-bold text-white mb-4">Lectures recommandées</h3>
                                <ul className="space-y-2">
                                    {[
                                        { href: "/blog/importance-audit-seo", text: "Pourquoi un audit SEO est indispensable" },
                                        { href: "/blog/contenu-rapport-audit-seo", text: "Décryptage d'un rapport d'audit SEO" },
                                        { href: "/blog/pourquoi-consultant-seo", text: "Pourquoi s'entourer d'un consultant SEO" },
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-white/50 hover:text-sauge transition-colors flex items-center gap-2 text-sm">
                                                <ArrowRight className="w-3 h-3 text-sauge" />
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-4">Audit SEO par ville</h3>
                                <ul className="space-y-2">
                                    {[
                                        { href: "/consultant-seo-nice", text: "Audit SEO à Nice" },
                                        { href: "/consultant-seo-sophia-antipolis", text: "Audit SEO à Sophia-Antipolis" },
                                        { href: "/consultant-seo-marseille", text: "Audit SEO à Marseille" },
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-white/50 hover:text-sauge transition-colors flex items-center gap-2 text-sm">
                                                <MapPin className="w-3 h-3 text-sauge" />
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-16 bg-fond-sombre border-t border-white/5">
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
                            Besoin d&apos;un audit SEO <span className="text-sauge">approfondi</span> ?
                        </h2>
                        <p className="text-white/50 mb-8 max-w-xl mx-auto">
                            Cet outil gratuit vous donne un aperçu. Pour une analyse complète avec recommandations personnalisées, je vous accompagne.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white text-ink px-8 py-4 rounded-full font-bold hover:bg-sauge hover:text-white transition-all"
                        >
                            Demander un audit complet
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
