import { Metadata } from "next";
import Link from "next/link";
import { RobotsGenerator } from "./RobotsGenerator";
import { ArrowRight, FileCode, Bot, Code2, Search } from "lucide-react";

export const metadata: Metadata = {
    title: "Générateur robots.txt avec Crawlers IA 2026 — Gratuit",
    description: "Créez votre fichier robots.txt avec les crawlers IA de 2026 : GPTBot, Claude-Web, PerplexityBot... Configurez la visibilité de votre site pour les IA en quelques clics.",
    alternates: {
        canonical: "https://indhack.com/outils/generateur-robots-txt"
    },
    openGraph: {
        title: "Générateur robots.txt avec Crawlers IA 2026",
        description: "Le seul générateur robots.txt français incluant tous les crawlers IA : GPTBot, Claude, Perplexity... Gratuit, sans inscription.",
        url: "https://indhack.com/outils/generateur-robots-txt",
        type: "website",
    }
};

const RELATED_TOOLS = [
    {
        title: "Testeur de visibilité IA",
        description: "Votre site est-il visible par ChatGPT ?",
        href: "/outils/testeur-visibilite-ia",
        icon: Bot,
    },
    {
        title: "Générateur de schema JSON-LD",
        description: "Créez vos données structurées",
        href: "/outils/generateur-schema-json-ld",
        icon: Code2,
    },
    {
        title: "Audit SEO Gratuit",
        description: "Analysez votre site en 1 clic",
        href: "/outils/audit-seo-gratuit",
        icon: Search,
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

const CRAWLER_INFO = [
    { name: "GPTBot", editor: "OpenAI", usage: "Entraînement des modèles", recommendation: "warning", text: "À bloquer si protection souhaitée" },
    { name: "ChatGPT-User", editor: "OpenAI", usage: "Navigation temps réel", recommendation: "success", text: "Autoriser pour être cité" },
    { name: "Claude-Web", editor: "Anthropic", usage: "Navigation Claude", recommendation: "success", text: "Autoriser" },
    { name: "PerplexityBot", editor: "Perplexity", usage: "Moteur de recherche IA", recommendation: "success", text: "Autoriser" },
    { name: "Google-Extended", editor: "Google", usage: "Entraînement Gemini", recommendation: "warning", text: "À bloquer si protection souhaitée" },
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
                        "@type": "SoftwareApplication",
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

            <main className="min-h-screen bg-ink">
                {/* Hero */}
                <section className="pt-28 pb-16 relative overflow-hidden">
                    {/* Background effects */}
                    <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-sauge/10 rounded-full blur-[150px] pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sauge/5 rounded-full blur-[180px] pointer-events-none" />

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Fil d'Ariane">
                            <ol className="flex items-center gap-2 text-sm text-soft-light">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li className="text-white/20">/</li>
                                <li><Link href="/outils" className="hover:text-white transition-colors">Outils SEO</Link></li>
                                <li className="text-white/20">/</li>
                                <li className="text-white font-medium">Générateur robots.txt</li>
                            </ol>
                        </nav>

                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/20">
                                <FileCode className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sauge/10 border border-sauge/20 text-white text-sm font-medium mb-4">
                                    <Bot className="w-4 h-4" />
                                    Inclut les 12 crawlers IA de 2026
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                                    Générateur robots.txt
                                </h1>
                                <p className="text-lg text-soft-light max-w-2xl">
                                    Configurez la visibilité de votre site pour les moteurs de recherche et les IA.
                                    GPTBot, Claude, Perplexity... tous les crawlers 2026 inclus.
                                </p>

                                {/* Stats badges */}
                                <div className="flex flex-wrap gap-4 mt-8">
                                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                        <span className="text-white font-bold">12</span>
                                        <span className="text-soft-light ml-2">crawlers IA</span>
                                    </div>
                                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                        <span className="text-white font-bold">4</span>
                                        <span className="text-soft-light ml-2">configs prêtes</span>
                                    </div>
                                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                        <span className="text-white font-bold">100%</span>
                                        <span className="text-soft-light ml-2">gratuit</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Generator */}
                <section className="py-12 relative">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <RobotsGenerator />
                    </div>
                </section>

                {/* IA Crawlers Explained */}
                <section className="py-16 bg-fond-sombre border-t border-white/5">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-12">
                                <span className="px-4 py-2 rounded-full bg-sauge/10 border border-sauge/20 text-white text-xs font-semibold uppercase tracking-[0.2em]">
                                    Guide
                                </span>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-6 mb-4">
                                    Comprendre les crawlers IA en 2026
                                </h2>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 mb-12">
                                <p className="text-soft-light text-lg leading-relaxed mb-6">
                                    En 2026, votre fichier <code className="bg-white/10 px-2 py-1 rounded text-white">robots.txt</code> ne gère plus seulement Googlebot. <strong className="text-white">Une dizaine de crawlers IA</strong> parcourent le web pour alimenter ChatGPT, Gemini, Perplexity et d'autres. Pour vérifier si ces crawlers accèdent déjà à votre site, utilisez notre <Link href="/outils/testeur-visibilite-ia" className="text-sauge-light hover:underline">testeur de visibilité IA</Link>.
                                </p>
                                <p className="text-soft-light text-lg leading-relaxed">
                                    La bonne stratégie dépend de vos objectifs : voulez-vous <strong className="text-white">être cité par les IA</strong> (excellent pour la visibilité) ou <strong className="text-white">protéger votre contenu</strong> de l'entraînement des modèles ? Cette configuration fait partie d'une <Link href="/referencement-naturel" className="text-sauge-light hover:underline">stratégie SEO complète</Link>.
                                </p>
                            </div>

                            {/* Crawler Table - Dark theme */}
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="px-6 py-4 text-left font-bold text-white">Crawler</th>
                                            <th className="px-6 py-4 text-left font-bold text-white">Éditeur</th>
                                            <th className="px-6 py-4 text-left font-bold text-white">Usage</th>
                                            <th className="px-6 py-4 text-left font-bold text-white">Recommandation</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {CRAWLER_INFO.map((crawler) => (
                                            <tr key={crawler.name} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 font-medium text-white">{crawler.name}</td>
                                                <td className="px-6 py-4 text-soft-light">{crawler.editor}</td>
                                                <td className="px-6 py-4 text-soft-light">{crawler.usage}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${crawler.recommendation === 'success'
                                                            ? 'bg-emerald-500/40 border border-emerald-500/50'
                                                            : 'bg-amber-500/40 border border-amber-500/50'
                                                        }`}>
                                                        {crawler.text}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Recommendation box */}
                            <div className="mt-8 bg-white/5 rounded-xl p-6 border border-white/10">
                                <div className="flex gap-4">
                                    <Bot className="w-6 h-6 text-sauge flex-shrink-0" />
                                    <p className="text-soft-light">
                                        <strong className="text-white">Ma recommandation :</strong> Autorisez les crawlers de navigation (ChatGPT-User, Claude-Web, PerplexityBot) pour être cité dans les réponses. Bloquez les crawlers d'entraînement (GPTBot, Google-Extended) si vous souhaitez protéger votre contenu original.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Tools */}
                <section className="py-16 bg-ink border-t border-white/5">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                                        <div className="w-10 h-10 rounded-lg bg-sauge flex items-center justify-center mb-3 transition-colors">
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="font-bold text-white mb-1 group-hover:text-sauge-light transition-colors">
                                            {tool.title}
                                        </h3>
                                        <p className="text-sm text-soft-light">{tool.description}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Internal Links */}
                <section className="py-12 bg-fond-sombre border-t border-white/5">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
                            <div>
                                <h3 className="font-bold text-white mb-4">Articles SEO & GEO</h3>
                                <ul className="space-y-2">
                                    {[
                                        { href: "/blog/pourquoi-consultant-seo", text: "Pourquoi faire appel à un consultant SEO ?" },
                                        { href: "/blog/importance-audit-seo", text: "Pourquoi un audit SEO est essentiel" },
                                        { href: "/blog/seo-local-nice", text: "Guide du SEO local à Nice" },
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
                                <h3 className="font-bold text-white mb-4">Consultant SEO par ville</h3>
                                <ul className="space-y-2">
                                    {[
                                        { href: "/consultant-seo-nice", text: "Consultant SEO Nice" },
                                        { href: "/consultant-seo-sophia-antipolis", text: "Consultant SEO Sophia Antipolis" },
                                        { href: "/consultant-seo-cannes", text: "Consultant SEO Cannes" },
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

                {/* FAQ */}
                <section className="py-16 bg-ink border-t border-white/5">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                            Besoin d&apos;une stratégie <span className="text-sauge">GEO</span> complète ?
                        </h2>
                        <p className="text-soft-light mb-8 max-w-xl mx-auto">
                            Le robots.txt est la première étape. Je vous accompagne pour apparaître dans les réponses de ChatGPT et Perplexity.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white text-ink px-8 py-4 rounded-full font-bold hover:bg-sauge hover:text-white transition-all"
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
