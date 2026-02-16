import { Metadata } from "next";
import Link from "next/link";
import { AuditSEO } from "./AuditSEO";
import { ArrowRight, Search, Bot, Code2, FileCode, Gauge, TrendingUp, Zap, Target } from "lucide-react";

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
        status: "live" as const,
    },
    {
        title: "Générateur Schema JSON-LD",
        description: "Créez vos données structurées",
        href: "/outils/generateur-schema-json-ld",
        icon: Code2,
        status: "live" as const,
    },
    {
        title: "Générateur robots.txt",
        description: "Configurez vos crawlers IA",
        href: "/outils/generateur-robots-txt",
        icon: FileCode,
        status: "live" as const,
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

            <main className="min-h-screen bg-fond-clair">
                {/* Hero */}
                <section className="relative pt-32 pb-12 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-fond-sombre via-fond-sombre to-emerald-900/30" />
                    <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Fil d'Ariane">
                            <ol className="flex items-center gap-2 text-sm text-texte-moyen">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li>/</li>
                                <li><Link href="/outils" className="hover:text-white transition-colors">Outils SEO</Link></li>
                                <li>/</li>
                                <li className="text-white font-medium">Audit SEO Gratuit</li>
                            </ol>
                        </nav>

                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                                <Search className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium mb-4">
                                    <Gauge className="w-4 h-4" />
                                    Score /100 en 30 secondes
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                                    Audit SEO Gratuit
                                </h1>
                                <p className="text-lg text-texte-moyen max-w-2xl">
                                    Analysez votre site en 1 clic. 15 critères vérifiés dont la compatibilité avec les crawlers IA.
                                    Recommandations actionnables pour améliorer votre référencement.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Audit Tool */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <AuditSEO />
                    </div>
                </section>

                {/* Features */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            15 critères analysés en 4 catégories
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                                    <Search className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">Technique</h3>
                                <p className="text-sm text-soft">HTTPS, viewport, vitesse, sitemap, robots.txt, Open Graph, Twitter Cards</p>
                            </div>
                            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center mb-4">
                                    <Code2 className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">Contenu</h3>
                                <p className="text-sm text-soft">Title, meta description, H1, structure Hn, ratio texte/HTML</p>
                            </div>
                            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                                    <FileCode className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">Accessibilité</h3>
                                <p className="text-sm text-soft">Images alt, attributs ARIA, labels de formulaires</p>
                            </div>
                            <div className="p-6 bg-violet-50 rounded-2xl border border-violet-100">
                                <div className="w-10 h-10 bg-violet-500 rounded-lg flex items-center justify-center mb-4">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">IA-Ready</h3>
                                <p className="text-sm text-soft">Crawlers GPTBot, Claude-Web, PerplexityBot, Google-Extended</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Audit Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-heading font-bold text-ink mb-8 text-center">
                                Pourquoi auditer votre site SEO ?
                            </h2>

                            <div className="prose prose-lg max-w-none text-soft mb-12">
                                <p>
                                    <strong className="text-ink">90% des sites web ont des problèmes SEO invisibles</strong> qui plombent leur visibilité Google. Balises title mal optimisées, images sans attribut alt, vitesse de chargement trop lente, absence de sitemap... Ces erreurs passent inaperçues mais coûtent cher en trafic perdu. Découvrez <Link href="/blog/contenu-rapport-audit-seo" className="text-sauge hover:underline">ce que contient un rapport d'audit SEO complet</Link>.
                                </p>
                                <p>
                                    Un audit SEO révèle ces problèmes et vous donne une <strong className="text-ink">roadmap claire</strong> pour les corriger. Cet outil analyse 15 critères essentiels en moins de 30 secondes — et contrairement aux autres outils, il vérifie aussi votre <strong className="text-ink">compatibilité avec les crawlers IA</strong> (ChatGPT, Perplexity, Claude). Pour une analyse encore plus poussée de votre visibilité IA, utilisez notre <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">testeur de visibilité IA dédié</Link>.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 text-center">
                                    <Zap className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
                                    <h3 className="font-bold text-ink mb-2">Résultats en 30 sec</h3>
                                    <p className="text-sm text-soft">
                                        Pas d'attente, pas de file. Entrez votre URL et obtenez votre score immédiatement.
                                    </p>
                                </div>
                                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 text-center">
                                    <Bot className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                                    <h3 className="font-bold text-ink mb-2">Analyse IA incluse</h3>
                                    <p className="text-sm text-soft">
                                        Le seul audit gratuit qui vérifie si GPTBot, Claude et Perplexity peuvent accéder à votre site.
                                    </p>
                                </div>
                                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 text-center">
                                    <Target className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                                    <h3 className="font-bold text-ink mb-2">Actions concrètes</h3>
                                    <p className="text-sm text-soft">
                                        Chaque problème détecté est accompagné d'une recommandation claire et actionnable.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-12 bg-gray-50 rounded-2xl p-8 border border-line">
                                <div className="flex items-start gap-4">
                                    <TrendingUp className="w-8 h-8 text-sauge flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-ink mb-2">Après l'audit : passez à l'action</h3>
                                        <p className="text-soft mb-4">
                                            Cet outil gratuit vous donne un aperçu. Pour un <strong className="text-ink">audit SEO professionnel complet</strong> avec analyse concurrentielle, étude sémantique et roadmap priorisée par ROI, découvrez mon accompagnement expert.
                                        </p>
                                        <Link href="/audit-seo" className="text-sauge font-medium hover:underline inline-flex items-center gap-2">
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
                                        className="group p-6 bg-white rounded-2xl border border-line hover:border-sauge/30 transition-all"
                                    >
                                        {content}
                                    </Link>
                                ) : (
                                    <div
                                        key={tool.href}
                                        className="p-6 bg-white rounded-2xl border border-line opacity-60"
                                    >
                                        {content}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Maillage Section */}
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                                Approfondir votre stratégie SEO
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-bold text-ink mb-4">Lectures recommandées</h3>
                                    <ul className="space-y-3">
                                        <li>
                                            <Link href="/blog/importance-audit-seo" className="text-sauge hover:underline">
                                                Pourquoi un audit SEO est indispensable
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/blog/contenu-rapport-audit-seo" className="text-sauge hover:underline">
                                                Décryptage d'un rapport d'audit SEO
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/blog/pourquoi-consultant-seo" className="text-sauge hover:underline">
                                                Pourquoi s'entourer d'un consultant SEO
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-ink mb-4">Audit SEO par ville</h3>
                                    <ul className="space-y-3">
                                        <li>
                                            <Link href="/consultant-seo-nice" className="text-sauge hover:underline">
                                                Audit SEO à Nice
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/consultant-seo-sophia-antipolis" className="text-sauge hover:underline">
                                                Audit SEO à Sophia-Antipolis
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/consultant-seo-marseille" className="text-sauge hover:underline">
                                                Audit SEO à Marseille
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
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
                            Besoin d'un audit SEO approfondi ?
                        </h2>
                        <p className="text-texte-moyen mb-8 max-w-xl mx-auto">
                            Cet outil gratuit vous donne un aperçu. Pour une analyse complète avec recommandations personnalisées,
                            je vous accompagne.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-sauge text-white px-8 py-4 rounded-full font-bold hover:bg-sauge/90 transition-colors"
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
