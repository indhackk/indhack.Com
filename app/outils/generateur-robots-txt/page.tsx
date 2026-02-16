import { Metadata } from "next";
import Link from "next/link";
import { RobotsGenerator } from "./RobotsGenerator";
import { ArrowRight, FileCode, Bot, Code2, Search } from "lucide-react";

export const metadata: Metadata = {
    title: "Générateur robots.txt avec Crawlers IA 2026 — Gratuit | IndHack",
    description: "Créez votre fichier robots.txt avec les crawlers IA de 2026 : GPTBot, Claude-Web, PerplexityBot... Configurez la visibilité de votre site pour les IA en quelques clics.",
    alternates: {
        canonical: "https://indhack.com/outils/generateur-robots-txt"
    },
    openGraph: {
        title: "Générateur robots.txt avec Crawlers IA 2026 | IndHack",
        description: "Le seul générateur robots.txt français incluant tous les crawlers IA : GPTBot, Claude, Perplexity... Gratuit, sans inscription.",
        url: "https://indhack.com/outils/generateur-robots-txt",
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
        title: "Audit SEO Gratuit",
        description: "Analysez votre site en 1 clic",
        href: "/outils/audit-seo-gratuit",
        icon: Search,
        status: "live" as const,
    },
];

const FAQ_ITEMS = [
    {
        question: "Qu'est-ce que le fichier robots.txt ?",
        answer: "Le fichier robots.txt est un fichier texte placé à la racine de votre site qui indique aux robots (crawlers) des moteurs de recherche et des IA quelles parties de votre site ils peuvent ou ne peuvent pas explorer. C'est un standard du web depuis 1994."
    },
    {
        question: "Quels sont les crawlers IA à connaître en 2026 ?",
        answer: "Les principaux crawlers IA sont : GPTBot (OpenAI pour l'entraînement), ChatGPT-User (navigation temps réel), Claude-Web (Anthropic), PerplexityBot (Perplexity AI), Google-Extended (entraînement Gemini), et Bytespider (ByteDance/TikTok). Chacun a un comportement différent."
    },
    {
        question: "Dois-je bloquer les crawlers IA ?",
        answer: "Cela dépend de votre stratégie. Bloquer GPTBot empêche l'utilisation de votre contenu pour entraîner les modèles, mais ne vous rend pas invisible dans ChatGPT (qui utilise ChatGPT-User pour la navigation). La configuration 'Recommandée' équilibre visibilité et protection."
    },
    {
        question: "Le robots.txt protège-t-il vraiment mon contenu ?",
        answer: "Non, le robots.txt est une directive, pas une protection. Les bots bien intentionnés (Google, OpenAI) le respectent, mais les scrapers malveillants l'ignorent. Pour une vraie protection, utilisez des solutions techniques : authentification, WAF, rate limiting."
    },
    {
        question: "Où placer le fichier robots.txt ?",
        answer: "Le fichier robots.txt doit être placé à la racine de votre domaine, accessible via votresite.com/robots.txt. Il doit être nommé exactement 'robots.txt' (minuscules). Sur WordPress, vous pouvez le gérer via Yoast SEO ou un plugin dédié."
    },
];

export default function GenerateurRobotsTxtPage() {
    return (
        <>
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Générateur robots.txt IndHack",
                        "description": "Outil gratuit pour créer un fichier robots.txt avec les crawlers IA 2026",
                        "url": "https://indhack.com/outils/generateur-robots-txt",
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
                            { "@type": "ListItem", "position": 3, "name": "Générateur robots.txt", "item": "https://indhack.com/outils/generateur-robots-txt" }
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
                    <div className="absolute inset-0 bg-gradient-to-br from-fond-sombre via-fond-sombre to-cyan-900/30" />
                    <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Fil d'Ariane">
                            <ol className="flex items-center gap-2 text-sm text-texte-moyen">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li>/</li>
                                <li><Link href="/outils" className="hover:text-white transition-colors">Outils SEO</Link></li>
                                <li>/</li>
                                <li className="text-white font-medium">Générateur robots.txt</li>
                            </ol>
                        </nav>

                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                                <FileCode className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/20 rounded-full text-violet-300 text-sm font-medium mb-4">
                                    <Bot className="w-4 h-4" />
                                    Inclut les 12 crawlers IA de 2026
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                                    Générateur robots.txt
                                </h1>
                                <p className="text-lg text-texte-moyen max-w-2xl">
                                    Configurez la visibilité de votre site pour les moteurs de recherche et les IA.
                                    GPTBot, Claude, Perplexity... tous les crawlers 2026 inclus.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Generator */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <RobotsGenerator />
                    </div>
                </section>

                {/* IA Crawlers Explained */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-heading font-bold text-ink mb-8 text-center">
                                Comprendre les crawlers IA en 2026
                            </h2>

                            <div className="prose prose-lg max-w-none text-soft mb-12">
                                <p>
                                    En 2026, votre fichier <code className="bg-gray-100 px-2 py-1 rounded">robots.txt</code> ne gère plus seulement Googlebot. <strong className="text-ink">Une dizaine de crawlers IA</strong> parcourent le web pour alimenter ChatGPT, Gemini, Perplexity et d'autres. Chacun a un rôle différent.
                                </p>
                                <p>
                                    La bonne stratégie dépend de vos objectifs : voulez-vous <strong className="text-ink">être cité par les IA</strong> (excellent pour la visibilité) ou <strong className="text-ink">protéger votre contenu</strong> de l'entraînement des modèles ?
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse bg-white rounded-xl overflow-hidden">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-6 py-4 text-left font-bold text-ink">Crawler</th>
                                            <th className="px-6 py-4 text-left font-bold text-ink">Éditeur</th>
                                            <th className="px-6 py-4 text-left font-bold text-ink">Usage</th>
                                            <th className="px-6 py-4 text-left font-bold text-ink">Recommandation</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-line">
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-ink">GPTBot</td>
                                            <td className="px-6 py-4 text-soft">OpenAI</td>
                                            <td className="px-6 py-4 text-soft">Entraînement des modèles</td>
                                            <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">À bloquer si protection souhaitée</span></td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-ink">ChatGPT-User</td>
                                            <td className="px-6 py-4 text-soft">OpenAI</td>
                                            <td className="px-6 py-4 text-soft">Navigation temps réel</td>
                                            <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">Autoriser pour être cité</span></td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-ink">Claude-Web</td>
                                            <td className="px-6 py-4 text-soft">Anthropic</td>
                                            <td className="px-6 py-4 text-soft">Navigation Claude</td>
                                            <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">Autoriser</span></td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-ink">PerplexityBot</td>
                                            <td className="px-6 py-4 text-soft">Perplexity</td>
                                            <td className="px-6 py-4 text-soft">Moteur de recherche IA</td>
                                            <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">Autoriser</span></td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-ink">Google-Extended</td>
                                            <td className="px-6 py-4 text-soft">Google</td>
                                            <td className="px-6 py-4 text-soft">Entraînement Gemini</td>
                                            <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">À bloquer si protection souhaitée</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-8 bg-cyan-50 rounded-2xl p-6 border border-cyan-100">
                                <p className="text-soft">
                                    <strong className="text-ink">Ma recommandation :</strong> Autorisez les crawlers de navigation (ChatGPT-User, Claude-Web, PerplexityBot) pour être cité dans les réponses. Bloquez les crawlers d'entraînement (GPTBot, Google-Extended) si vous souhaitez protéger votre contenu original.
                                </p>
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
                            Votre site est-il visible par les IA ?
                        </h2>
                        <p className="text-texte-moyen mb-8 max-w-xl mx-auto">
                            Le robots.txt est la première étape. Pour une stratégie GEO complète
                            (Generative Engine Optimization), je vous accompagne.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-sauge text-white px-8 py-4 rounded-full font-bold hover:bg-sauge/90 transition-colors"
                        >
                            Demander un audit GEO
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
