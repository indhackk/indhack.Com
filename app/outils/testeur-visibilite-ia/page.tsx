import { Metadata } from "next";
import Link from "next/link";
import { TesteurVisibiliteIA } from "./TesteurVisibiliteIA";
import { ArrowRight, Bot, Shield, Code2, FileCode, Search, MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "Testeur Visibilité IA Gratuit — ChatGPT, Perplexity, Claude",
    description: "Votre site est-il visible par ChatGPT et Perplexity ? Testez vos signaux GEO : crawlers IA, schema JSON-LD, E-E-A-T. Outil français gratuit, sans inscription.",
    alternates: {
        canonical: "https://indhack.com/outils/testeur-visibilite-ia"
    },
    openGraph: {
        title: "Testeur Visibilité IA — Êtes-vous visible par ChatGPT ?",
        description: "Analysez vos signaux GEO (Generative Engine Optimization). 8 crawlers IA vérifiés, 4 catégories de signaux. Gratuit, sans inscription.",
        url: "https://indhack.com/outils/testeur-visibilite-ia",
        type: "website",
    }
};

const RELATED_TOOLS = [
    {
        title: "Générateur robots.txt",
        description: "Configurez vos crawlers IA en 1 clic",
        href: "/outils/generateur-robots-txt",
        icon: FileCode,
    },
    {
        title: "Générateur de schema JSON-LD",
        description: "Créez vos données structurées",
        href: "/outils/generateur-schema-json-ld",
        icon: Code2,
    },
    {
        title: "Audit SEO Gratuit",
        description: "Score SEO complet /100",
        href: "/outils/audit-seo-gratuit",
        icon: Search,
    },
];

const FAQ_ITEMS = [
    {
        question: "Qu'est-ce que la visibilité IA ?",
        answer: "La visibilité IA mesure la capacité de votre site à être découvert et cité par les moteurs de recherche IA comme ChatGPT, Perplexity, Claude ou Gemini. Contrairement au SEO classique qui cible Google, le GEO (Generative Engine Optimization) optimise votre présence dans les réponses générées par l'IA."
    },
    {
        question: "Qu'est-ce que le GEO (Generative Engine Optimization) ?",
        answer: "Le GEO est l'ensemble des techniques pour optimiser la visibilité d'un site dans les réponses des IA génératives. Cela inclut : autoriser les crawlers IA (GPTBot, Claude-Web...), structurer les données avec JSON-LD, créer du contenu facilement citable (FAQ, statistiques), et démontrer l'expertise (signaux E-E-A-T)."
    },
    {
        question: "Quels crawlers IA sont analysés ?",
        answer: "Cet outil vérifie 8 crawlers IA : GPTBot et ChatGPT-User (OpenAI), OAI-SearchBot (OpenAI Search), Claude-Web (Anthropic), PerplexityBot (Perplexity), Google-Extended (Gemini), Bytespider (ByteDance/TikTok), et CCBot (Common Crawl). Chacun a un rôle différent dans l'écosystème IA."
    },
    {
        question: "Comment améliorer mon score de visibilité IA ?",
        answer: "Les actions prioritaires sont : 1) Autoriser les crawlers IA dans votre robots.txt, 2) Ajouter des données structurées JSON-LD (FAQPage, Organization...), 3) Créer du contenu structuré avec FAQ et statistiques, 4) Afficher clairement l'auteur et les informations de contact (signaux E-E-A-T)."
    },
    {
        question: "Pourquoi bloquer certains crawlers IA ?",
        answer: "Vous pouvez choisir de bloquer GPTBot (entraînement) pour protéger votre contenu tout en autorisant ChatGPT-User (navigation) pour rester citable. Google-Extended contrôle l'entraînement de Gemini. Mon générateur robots.txt vous aide à configurer ces options selon votre stratégie."
    },
    {
        question: "ChatGPT peut-il citer mon site même si je bloque GPTBot ?",
        answer: "Oui, et c'est crucial de comprendre la distinction. GPTBot sert à l'entraînement des modèles, tandis que ChatGPT-User est utilisé quand ChatGPT navigue sur le web en temps réel pour répondre aux utilisateurs. Vous pouvez bloquer le premier et autoriser le second pour protéger votre contenu tout en restant citable."
    },
    {
        question: "Quelle différence entre SEO et GEO ?",
        answer: "Le SEO vise à apparaître dans les liens bleus de Google. Le GEO vise à être cité comme source dans les réponses générées par les IA. Les deux sont complémentaires : un bon SEO renforce généralement le GEO, mais des optimisations spécifiques (schema JSON-LD, format Q&A, signaux E-E-A-T) sont nécessaires pour maximiser la visibilité IA."
    },
    {
        question: "Les IA citent-elles vraiment leurs sources ?",
        answer: "Oui, de plus en plus. Perplexity affiche systématiquement les sources. ChatGPT avec browsing cite les sites consultés. Gemini intègre des liens vers les sources. Être cité augmente votre trafic et renforce votre autorité. C'est pourquoi l'optimisation GEO devient stratégique."
    },
];

export default function TesteurVisibiliteIAPage() {
    return (
        <>
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Testeur Visibilité IA IndHack",
                        "description": "Outil gratuit pour tester la visibilité de votre site auprès des IA génératives (ChatGPT, Perplexity, Claude)",
                        "url": "https://indhack.com/outils/testeur-visibilite-ia",
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
                            "Vérification de 8 crawlers IA",
                            "Analyse robots.txt pour GPTBot, Claude-Web, PerplexityBot",
                            "Score de visibilité /100",
                            "Analyse des signaux E-E-A-T",
                            "Recommandations GEO personnalisées"
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
                            { "@type": "ListItem", "position": 3, "name": "Testeur Visibilité IA", "item": "https://indhack.com/outils/testeur-visibilite-ia" }
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
                            <ol className="flex items-center gap-2 text-sm text-soft-light">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li className="text-white/20">/</li>
                                <li><Link href="/outils" className="hover:text-white transition-colors">Outils SEO</Link></li>
                                <li className="text-white/20">/</li>
                                <li className="text-white font-medium">Testeur Visibilité IA</li>
                            </ol>
                        </nav>

                        {/* Header - Compact */}
                        <div className="max-w-3xl mx-auto text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sauge/20 border border-sauge/30 rounded-full text-sauge text-sm font-bold mb-4">
                                <Bot className="w-4 h-4" />
                                <span className="uppercase tracking-wider text-xs">Le seul outil français gratuit</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                                Testeur Visibilité <span className="text-sauge">IA</span>
                            </h1>
                            <p className="text-soft-light text-lg">
                                Votre site est-il visible par ChatGPT, Perplexity et Claude ?
                            </p>
                        </div>

                        {/* Tool */}
                        <TesteurVisibiliteIA />
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-16 bg-fond-sombre border-t border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-heading font-bold text-white text-center mb-10">
                                4 catégories de <span className="text-sauge">signaux</span> analysés
                            </h2>

                            <div className="grid md:grid-cols-4 gap-4">
                                {[
                                    { icon: Shield, title: "Accessibilité", desc: "Crawlers IA autorisés, sitemap, temps de réponse", points: "/30" },
                                    { icon: Code2, title: "Sémantique", desc: "Schema JSON-LD, FAQ structurées, hiérarchie", points: "/30" },
                                    { icon: FileCode, title: "E-E-A-T", desc: "Page À propos, auteur, réseaux sociaux", points: "/20" },
                                    { icon: Bot, title: "Format IA", desc: "Longueur contenu, données chiffrées, meta", points: "/20" },
                                ].map((cat) => {
                                    const Icon = cat.icon;
                                    return (
                                        <div key={cat.title} className="bg-white/5 rounded-xl p-5 border border-white/10">
                                            <div className="w-10 h-10 rounded-lg bg-sauge/20 flex items-center justify-center mb-3">
                                                <Icon className="w-5 h-5 text-sauge" />
                                            </div>
                                            <h3 className="font-bold text-white text-sm mb-1">{cat.title}</h3>
                                            <p className="text-xs text-soft-light mb-2">{cat.desc}</p>
                                            <span className="text-xs font-bold text-sauge">{cat.points} pts</span>
                                        </div>
                                    );
                                })}
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
                                        <p className="text-sm text-soft-light">{tool.description}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Internal Links */}
                <section className="py-12 bg-fond-sombre border-t border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
                            <div>
                                <h3 className="font-bold text-white mb-4">Articles SEO & GEO</h3>
                                <ul className="space-y-2">
                                    {[
                                        { href: "/blog/geo-comment-apparaitre-chatgpt-2026", text: "GEO : Comment apparaître dans ChatGPT en 2026" },
                                        { href: "/blog/pourquoi-consultant-seo", text: "Pourquoi faire appel à un consultant SEO ?" },
                                        { href: "/blog/importance-audit-seo", text: "L'audit SEO : point de départ de votre croissance" },
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
                                        { href: "/consultant-seo-cannes", text: "Consultant SEO Cannes" },
                                        { href: "/consultant-seo-paris", text: "Consultant SEO Paris" },
                                        { href: "/consultant-seo-sophia-antipolis", text: "Consultant SEO Sophia Antipolis" },
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-soft-light hover:text-sauge transition-colors flex items-center gap-2 text-sm">
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
                            Besoin d&apos;une stratégie <span className="text-sauge">GEO</span> complète ?
                        </h2>
                        <p className="text-soft-light mb-8 max-w-xl mx-auto">
                            Je vous accompagne pour apparaître dans les réponses de ChatGPT et Perplexity.
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
