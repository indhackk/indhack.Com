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
        gradient: "from-violet-500 to-purple-600",
    },
    {
        title: "Générateur Schema JSON-LD",
        description: "Créez vos données structurées",
        href: "/outils/generateur-schema-json-ld",
        icon: Code2,
        gradient: "from-blue-500 to-cyan-600",
    },
    {
        title: "Générateur robots.txt",
        description: "Configurez vos crawlers IA",
        href: "/outils/generateur-robots-txt",
        icon: FileCode,
        gradient: "from-cyan-500 to-teal-600",
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
    { title: "Technique", description: "HTTPS, viewport, vitesse, sitemap, robots.txt, Open Graph", gradient: "from-blue-500 to-blue-600", icon: Search },
    { title: "Contenu", description: "Title, meta description, H1, structure Hn, ratio texte/HTML", gradient: "from-emerald-500 to-emerald-600", icon: Code2 },
    { title: "Accessibilité", description: "Images alt, attributs ARIA, labels de formulaires", gradient: "from-amber-500 to-amber-600", icon: FileCode },
    { title: "IA-Ready", description: "Crawlers GPTBot, Claude-Web, PerplexityBot, Google-Extended", gradient: "from-violet-500 to-violet-600", icon: Bot },
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
                {/* Hero */}
                <section className="relative pt-32 pb-16 overflow-hidden">
                    {/* Background effects */}
                    <div className="absolute inset-0 bg-gradient-to-b from-fond-sombre via-ink to-ink" />
                    <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-[150px]" />
                    <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-500/20 rounded-full blur-[120px]" />

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
                                <li className="text-white font-medium">Audit SEO Gratuit</li>
                            </ol>
                        </nav>

                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
                                <Search className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sauge/10 border border-sauge/20 text-sauge text-sm font-medium mb-4">
                                    <Gauge className="w-4 h-4" />
                                    Score /100 en 30 secondes
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                                    Audit SEO Gratuit
                                </h1>
                                <p className="text-lg text-white/60 max-w-2xl">
                                    Analysez votre site en 1 clic. 15 critères vérifiés dont la compatibilité avec les crawlers IA.
                                    Recommandations actionnables pour améliorer votre référencement.
                                </p>

                                {/* Stats badges */}
                                <div className="flex flex-wrap gap-4 mt-8">
                                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                        <span className="text-white font-bold">15</span>
                                        <span className="text-white/60 ml-2">critères</span>
                                    </div>
                                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                        <span className="text-white font-bold">4</span>
                                        <span className="text-white/60 ml-2">catégories</span>
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

                {/* Audit Tool */}
                <section className="py-12 relative">
                    <div className="container mx-auto px-4">
                        <AuditSEO />
                    </div>
                </section>

                {/* Features */}
                <section className="py-16 bg-fond-sombre relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-ink via-fond-sombre to-fond-sombre" />
                    <div className="container mx-auto px-4 relative z-10">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-8 text-center">
                            15 critères analysés en 4 catégories
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                            {FEATURES.map((feature) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={feature.title} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                                        <p className="text-sm text-white/60">{feature.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Why Audit Section */}
                <section className="py-16 bg-ink">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <span className="px-4 py-2 rounded-full bg-sauge/10 border border-sauge/20 text-sauge text-xs font-semibold uppercase tracking-[0.2em]">
                                    Guide
                                </span>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-6 mb-4">
                                    Pourquoi auditer votre site SEO ?
                                </h2>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 mb-12">
                                <p className="text-white/70 text-lg leading-relaxed mb-6">
                                    <strong className="text-white">90% des sites web ont des problèmes SEO invisibles</strong> qui plombent leur visibilité Google. Balises title mal optimisées, images sans attribut alt, vitesse de chargement trop lente, absence de sitemap... Ces erreurs passent inaperçues mais coûtent cher en trafic perdu. Découvrez <Link href="/blog/contenu-rapport-audit-seo" className="text-sauge hover:underline">ce que contient un rapport d'audit SEO complet</Link>.
                                </p>
                                <p className="text-white/70 text-lg leading-relaxed">
                                    Un audit SEO révèle ces problèmes et vous donne une <strong className="text-white">roadmap claire</strong> pour les corriger. Cet outil analyse 15 critères essentiels en moins de 30 secondes — et contrairement aux autres outils, il vérifie aussi votre <strong className="text-white">compatibilité avec les crawlers IA</strong> (ChatGPT, Perplexity, Claude). Pour une analyse encore plus poussée de votre visibilité IA, utilisez notre <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">testeur de visibilité IA dédié</Link>.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-white mb-2">Résultats en 30 sec</h3>
                                    <p className="text-sm text-white/60">
                                        Pas d'attente, pas de file. Entrez votre URL et obtenez votre score immédiatement.
                                    </p>
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-white mb-2">Analyse IA incluse</h3>
                                    <p className="text-sm text-white/60">
                                        Le seul audit gratuit qui vérifie si GPTBot, Claude et Perplexity peuvent accéder à votre site.
                                    </p>
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-white mb-2">Actions concrètes</h3>
                                    <p className="text-sm text-white/60">
                                        Chaque problème détecté est accompagné d'une recommandation claire et actionnable.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-12 bg-gradient-to-r from-sauge/10 to-transparent rounded-2xl p-8 border border-sauge/20">
                                <div className="flex items-start gap-4">
                                    <TrendingUp className="w-8 h-8 text-sauge flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-white mb-2">Après l'audit : passez à l'action</h3>
                                        <p className="text-white/70 mb-4">
                                            Cet outil gratuit vous donne un aperçu. Pour un <strong className="text-white">audit SEO professionnel complet</strong> avec analyse concurrentielle, étude sémantique et roadmap priorisée par ROI, découvrez mon accompagnement expert.
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

                {/* Maillage Section */}
                <section className="py-16 bg-ink">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-8 text-center">
                                Approfondir votre stratégie SEO
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                                    <h3 className="font-bold text-white mb-4">Lectures recommandées</h3>
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
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                                    <h3 className="font-bold text-white mb-4">Audit SEO par ville</h3>
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
                <section className="py-16 bg-fond-sombre">
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
                <section className="py-20 bg-ink relative overflow-hidden">
                    {/* Background effects */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-sauge/20 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px]" />

                    <div className="container mx-auto px-4 text-center relative z-10">
                        <span className="px-4 py-2 rounded-full bg-sauge/10 border border-sauge/20 text-sauge text-xs font-semibold uppercase tracking-[0.2em]">
                            Prochaine étape
                        </span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-6 mb-4">
                            Besoin d'un audit SEO approfondi ?
                        </h2>
                        <p className="text-white/60 mb-8 max-w-xl mx-auto text-lg">
                            Cet outil gratuit vous donne un aperçu. Pour une analyse complète avec recommandations personnalisées,
                            je vous accompagne.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white text-ink px-8 py-4 rounded-full font-bold hover:bg-sauge hover:text-white transition-all shadow-2xl shadow-white/10"
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
