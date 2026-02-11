import { Metadata } from "next";
import Link from "next/link";
import { TesteurVisibiliteIA } from "./TesteurVisibiliteIA";
import { ArrowRight, Bot, Shield, Code2, FileCode, Search, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Testeur Visibilité IA Gratuit — ChatGPT, Perplexity, Claude | INDHACK",
    description: "Votre site est-il visible par ChatGPT et Perplexity ? Testez gratuitement vos signaux GEO : crawlers IA, schema JSON-LD, signaux E-E-A-T. Le seul outil français gratuit.",
    alternates: {
        canonical: "https://indhack.com/outils/testeur-visibilite-ia"
    },
    openGraph: {
        title: "Testeur Visibilité IA — Êtes-vous visible par ChatGPT ? | INDHACK",
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
        description: "Score SEO complet /100",
        href: "/outils/audit-seo-gratuit",
        icon: Search,
        status: "live" as const,
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
        answer: "Notre outil vérifie 8 crawlers IA : GPTBot et ChatGPT-User (OpenAI), OAI-SearchBot (OpenAI Search), Claude-Web (Anthropic), PerplexityBot (Perplexity), Google-Extended (Gemini), Bytespider (ByteDance/TikTok), et CCBot (Common Crawl). Chacun a un rôle différent dans l'écosystème IA."
    },
    {
        question: "Comment améliorer mon score de visibilité IA ?",
        answer: "Les actions prioritaires sont : 1) Autoriser les crawlers IA dans votre robots.txt, 2) Ajouter des données structurées JSON-LD (FAQPage, Organization...), 3) Créer du contenu structuré avec FAQ et statistiques, 4) Afficher clairement l'auteur et les informations de contact (signaux E-E-A-T)."
    },
    {
        question: "Pourquoi bloquer certains crawlers IA ?",
        answer: "Vous pouvez choisir de bloquer GPTBot (entraînement) pour protéger votre contenu tout en autorisant ChatGPT-User (navigation) pour rester citable. Google-Extended contrôle l'entraînement de Gemini. Notre générateur robots.txt vous aide à configurer ces options selon votre stratégie."
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
                        "name": "Testeur Visibilité IA INDHACK",
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
                            "name": "INDHACK",
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

            <main className="min-h-screen bg-fond-clair">
                {/* Hero */}
                <section className="relative pt-32 pb-12 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-fond-sombre via-fond-sombre to-violet-900/30" />
                    <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Fil d'Ariane">
                            <ol className="flex items-center gap-2 text-sm text-texte-moyen">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li>/</li>
                                <li><Link href="/outils" className="hover:text-white transition-colors">Outils SEO</Link></li>
                                <li>/</li>
                                <li className="text-white font-medium">Testeur Visibilité IA</li>
                            </ol>
                        </nav>

                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                <Bot className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/20 rounded-full text-violet-300 text-sm font-medium mb-4">
                                    <Sparkles className="w-4 h-4" />
                                    Exclusif : le seul outil français gratuit
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                                    Testeur Visibilité IA
                                </h1>
                                <p className="text-lg text-texte-moyen max-w-2xl">
                                    Votre site est-il visible par ChatGPT, Perplexity et Claude ?
                                    Analysez vos signaux GEO et découvrez comment être cité par les IA.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tool */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <TesteurVisibiliteIA />
                    </div>
                </section>

                {/* What We Analyze */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            4 catégories de signaux analysés
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">Accessibilité IA</h3>
                                <p className="text-sm text-soft">Crawlers autorisés, sitemap, temps de réponse, contenu accessible</p>
                                <p className="text-xs text-blue-600 font-medium mt-2">/30 points</p>
                            </div>
                            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center mb-4">
                                    <Code2 className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">Richesse Sémantique</h3>
                                <p className="text-sm text-soft">Schema JSON-LD, FAQ structurées, listes et tableaux</p>
                                <p className="text-xs text-emerald-600 font-medium mt-2">/30 points</p>
                            </div>
                            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                                    <FileCode className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">Signaux E-E-A-T</h3>
                                <p className="text-sm text-soft">Page À propos, auteur, réseaux sociaux, contact</p>
                                <p className="text-xs text-amber-600 font-medium mt-2">/20 points</p>
                            </div>
                            <div className="p-6 bg-violet-50 rounded-2xl border border-violet-100">
                                <div className="w-10 h-10 bg-violet-500 rounded-lg flex items-center justify-center mb-4">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-ink mb-2">Format IA-Friendly</h3>
                                <p className="text-sm text-soft">Longueur contenu, données chiffrées, structure titres</p>
                                <p className="text-xs text-violet-600 font-medium mt-2">/20 points</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AI Crawlers Info */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                                Les 8 crawlers IA que nous vérifions
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { name: "GPTBot", company: "OpenAI", desc: "Entraînement modèles" },
                                    { name: "ChatGPT-User", company: "OpenAI", desc: "Navigation temps réel" },
                                    { name: "Claude-Web", company: "Anthropic", desc: "Assistant Claude" },
                                    { name: "PerplexityBot", company: "Perplexity", desc: "Moteur de recherche IA" },
                                    { name: "Google-Extended", company: "Google", desc: "Entraînement Gemini" },
                                    { name: "OAI-SearchBot", company: "OpenAI", desc: "Recherche OpenAI" },
                                    { name: "Bytespider", company: "ByteDance", desc: "TikTok / Doubao" },
                                    { name: "CCBot", company: "Common Crawl", desc: "Dataset public" },
                                ].map((crawler) => (
                                    <div key={crawler.name} className="bg-white p-4 rounded-xl border border-line">
                                        <div className="font-bold text-ink text-sm">{crawler.name}</div>
                                        <div className="text-xs text-soft">{crawler.company}</div>
                                        <div className="text-xs text-violet-600 mt-1">{crawler.desc}</div>
                                    </div>
                                ))}
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
                                return (
                                    <Link
                                        key={tool.href}
                                        href={tool.href}
                                        className="group p-6 bg-gray-50 rounded-2xl border border-line hover:border-violet-300 transition-all"
                                    >
                                        <Icon className="w-8 h-8 text-violet-500 mb-4" />
                                        <h3 className="font-bold text-ink mb-2 group-hover:text-violet-600 transition-colors">
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
                            Besoin d'une stratégie GEO complète ?
                        </h2>
                        <p className="text-texte-moyen mb-8 max-w-xl mx-auto">
                            Le GEO (Generative Engine Optimization) est la prochaine frontière du référencement.
                            Nos experts vous accompagnent pour apparaître dans les réponses de ChatGPT et Perplexity.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-violet-500 text-white px-8 py-4 rounded-full font-bold hover:bg-violet-600 transition-colors"
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
