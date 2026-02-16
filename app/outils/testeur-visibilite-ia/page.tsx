import { Metadata } from "next";
import Link from "next/link";
import { TesteurVisibiliteIA } from "./TesteurVisibiliteIA";
import { ArrowRight, Bot, Shield, Code2, FileCode, Search, Sparkles, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Testeur Visibilité IA Gratuit — ChatGPT, Perplexity, Claude",
    description: "Votre site est-il visible par ChatGPT et Perplexity ? Testez gratuitement vos signaux GEO : crawlers IA, schema JSON-LD, signaux E-E-A-T. Le seul outil français gratuit.",
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
        gradient: "from-cyan-500 to-blue-500",
    },
    {
        title: "Générateur Schema JSON-LD",
        description: "Créez vos données structurées",
        href: "/outils/generateur-schema-json-ld",
        icon: Code2,
        gradient: "from-blue-500 to-indigo-500",
    },
    {
        title: "Audit SEO Gratuit",
        description: "Score SEO complet /100",
        href: "/outils/audit-seo-gratuit",
        icon: Search,
        gradient: "from-emerald-500 to-teal-500",
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

const STATS = [
    { value: "40%", label: "des 18-34 ans utilisent ChatGPT pour rechercher" },
    { value: "65%", label: "font confiance aux réponses des IA" },
    { value: "+900%", label: "croissance des requêtes 'selon ChatGPT'" },
    { value: "8", label: "crawlers IA analysés par cet outil" },
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

            <main className="min-h-screen bg-ink">
                {/* Hero + Tool Section */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-violet-900/20" />
                    <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[150px] pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[180px] pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Fil d'Ariane">
                            <ol className="flex items-center gap-2 text-sm text-white/40">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li className="text-white/20">/</li>
                                <li><Link href="/outils" className="hover:text-white transition-colors">Outils SEO</Link></li>
                                <li className="text-white/20">/</li>
                                <li className="text-white font-medium">Testeur Visibilité IA</li>
                            </ol>
                        </nav>

                        {/* Header */}
                        <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-2xl shadow-violet-500/30">
                                <Bot className="w-10 h-10 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded-full text-violet-300 text-sm font-bold mb-4 backdrop-blur-sm">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="uppercase tracking-wider text-xs">Exclusif : le seul outil français gratuit</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 tracking-tight">
                                    Testeur Visibilité <span className="text-sauge">IA</span>
                                </h1>
                                <p className="text-xl text-white/60 max-w-2xl">
                                    Votre site est-il visible par ChatGPT, Perplexity et Claude ?
                                    Analysez vos signaux GEO et découvrez comment être cité par les IA.
                                </p>
                            </div>
                        </div>

                        {/* Stats Badges */}
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {STATS.map((stat) => (
                                <div key={stat.label} className="px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center">
                                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-xs text-white/50 max-w-[140px]">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Tool */}
                        <TesteurVisibiliteIA />
                    </div>
                </section>

                {/* Why AI Visibility Matters */}
                <section className="py-20 bg-gradient-to-b from-ink to-fond-sombre relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sauge/10 rounded-full blur-[150px] pointer-events-none" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <p className="text-sauge font-bold tracking-[0.2em] uppercase text-sm mb-4">Pourquoi c'est crucial</p>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                                    La visibilité IA en <span className="text-sauge">2026</span>
                                </h2>
                            </div>

                            <div className="prose prose-lg prose-invert max-w-none mb-12">
                                <p className="text-white/70 text-lg leading-relaxed">
                                    <strong className="text-white">Le <Link href="/referencement-naturel" className="text-sauge hover:text-sauge/80 transition-colors">SEO traditionnel</Link> ne suffit plus.</strong> En 2026, une part croissante de vos clients potentiels ne tapent plus de requêtes dans Google — ils posent des questions à <strong className="text-white">ChatGPT</strong>, <strong className="text-white">Perplexity</strong> ou <strong className="text-white">Gemini</strong>.
                                </p>
                                <p className="text-white/70 text-lg leading-relaxed">
                                    Quand une IA répond à une question comme <em className="text-violet-300">"Quel <Link href="/consultant-seo-nice" className="text-sauge hover:text-sauge/80 transition-colors">consultant SEO à Nice</Link> recommandes-tu ?"</em>, elle cite des sources. <strong className="text-white">Si votre site n'est pas visible par ces IA, vous n'existez pas</strong> pour cette nouvelle génération d'utilisateurs.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                                            <AlertTriangle className="w-5 h-5 text-red-400" />
                                        </div>
                                        <h3 className="font-bold text-white">Si vous ignorez le GEO</h3>
                                    </div>
                                    <ul className="space-y-2 text-sm text-white/60">
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-400 mt-1">•</span>
                                            Invisible dans les réponses ChatGPT et Perplexity
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-400 mt-1">•</span>
                                            Perte de trafic qualifié vers vos concurrents
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-400 mt-1">•</span>
                                            Contenu potentiellement utilisé sans citation
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-400 mt-1">•</span>
                                            Retard stratégique difficile à rattraper
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-emerald-500/10 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <h3 className="font-bold text-white">En optimisant pour le GEO</h3>
                                    </div>
                                    <ul className="space-y-2 text-sm text-white/60">
                                        <li className="flex items-start gap-2">
                                            <span className="text-emerald-400 mt-1">•</span>
                                            Cité comme source dans les réponses IA
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-emerald-400 mt-1">•</span>
                                            Nouveau canal d'acquisition de trafic
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-emerald-400 mt-1">•</span>
                                            Renforcement de votre autorité d'expert
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-emerald-400 mt-1">•</span>
                                            Avantage concurrentiel durable
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-20 bg-fond-sombre relative overflow-hidden">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <p className="text-sauge font-bold tracking-[0.2em] uppercase text-sm mb-4">Méthodologie</p>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                                    Comment fonctionne le <span className="text-sauge">testeur</span>
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    { num: "1", title: "Analyse robots.txt", desc: "On vérifie si les 8 crawlers IA majeurs (GPTBot, Claude-Web, PerplexityBot...) sont autorisés à accéder à votre site." },
                                    { num: "2", title: "Scan des signaux GEO", desc: "On analyse vos données structurées (JSON-LD), votre format de contenu (FAQ, listes) et vos signaux E-E-A-T." },
                                    { num: "3", title: "Score et recommandations", desc: "Vous recevez un score /100 avec des actions concrètes pour améliorer votre visibilité auprès des IA." },
                                ].map((step) => (
                                    <div key={step.num} className="text-center">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-violet-500/30">
                                            {step.num}
                                        </div>
                                        <h3 className="font-bold text-white text-lg mb-3">{step.title}</h3>
                                        <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-14 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-sauge/20 flex items-center justify-center flex-shrink-0">
                                        <TrendingUp className="w-6 h-6 text-sauge" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-2 text-lg">Pourquoi cet outil est unique</h3>
                                        <p className="text-white/60 leading-relaxed">
                                            La plupart des outils SEO ignorent complètement la visibilité IA. Les quelques outils qui existent sont payants et souvent en anglais. <strong className="text-white">Ce testeur est le premier outil français gratuit</strong> qui combine analyse SEO classique et analyse GEO. Je l'utilise moi-même pour mes clients chez <Link href="/" className="text-sauge hover:text-sauge/80 transition-colors">IndHack</Link>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What We Analyze */}
                <section className="py-20 bg-ink relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-12">
                            <p className="text-sauge font-bold tracking-[0.2em] uppercase text-sm mb-4">Analyse complète</p>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                                4 catégories de <span className="text-sauge">signaux</span> analysés
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                            {[
                                { icon: Shield, gradient: "from-cyan-500 to-blue-500", title: "Accessibilité IA", desc: "Crawlers autorisés, sitemap, temps de réponse", points: "/30" },
                                { icon: Code2, gradient: "from-emerald-500 to-teal-500", title: "Richesse Sémantique", desc: "Schema JSON-LD, FAQ structurées, listes", points: "/30" },
                                { icon: FileCode, gradient: "from-amber-500 to-orange-500", title: "Signaux E-E-A-T", desc: "Page À propos, auteur, réseaux sociaux", points: "/20" },
                                { icon: Bot, gradient: "from-violet-500 to-purple-500", title: "Format IA-Friendly", desc: "Longueur contenu, données chiffrées", points: "/20" },
                            ].map((cat) => {
                                const Icon = cat.icon;
                                return (
                                    <div key={cat.title} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors group">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-bold text-white mb-2">{cat.title}</h3>
                                        <p className="text-sm text-white/50 mb-3">{cat.desc}</p>
                                        <span className="text-xs font-bold text-violet-400">{cat.points} points</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* AI Crawlers Info */}
                <section className="py-20 bg-fond-sombre">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <p className="text-sauge font-bold tracking-[0.2em] uppercase text-sm mb-4">Crawlers vérifiés</p>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                                    Les 8 <span className="text-sauge">crawlers IA</span> analysés
                                </h2>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { name: "GPTBot", company: "OpenAI", desc: "Entraînement modèles", color: "from-emerald-500 to-teal-500" },
                                    { name: "ChatGPT-User", company: "OpenAI", desc: "Navigation temps réel", color: "from-emerald-500 to-green-500" },
                                    { name: "Claude-Web", company: "Anthropic", desc: "Assistant Claude", color: "from-amber-500 to-orange-500" },
                                    { name: "PerplexityBot", company: "Perplexity", desc: "Moteur de recherche IA", color: "from-blue-500 to-cyan-500" },
                                    { name: "Google-Extended", company: "Google", desc: "Entraînement Gemini", color: "from-red-500 to-rose-500" },
                                    { name: "OAI-SearchBot", company: "OpenAI", desc: "Recherche OpenAI", color: "from-violet-500 to-purple-500" },
                                    { name: "Bytespider", company: "ByteDance", desc: "TikTok / Doubao", color: "from-pink-500 to-rose-500" },
                                    { name: "CCBot", company: "Common Crawl", desc: "Dataset public", color: "from-gray-500 to-slate-500" },
                                ].map((crawler) => (
                                    <div key={crawler.name} className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${crawler.color} flex items-center justify-center mb-3 text-white text-xs font-bold`}>
                                            {crawler.name.slice(0, 2).toUpperCase()}
                                        </div>
                                        <div className="font-bold text-white text-sm">{crawler.name}</div>
                                        <div className="text-xs text-white/40">{crawler.company}</div>
                                        <div className="text-xs text-violet-400 mt-1">{crawler.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Tools */}
                <section className="py-20 bg-ink">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <p className="text-sauge font-bold tracking-[0.2em] uppercase text-sm mb-4">Outils complémentaires</p>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                                Améliorez votre <span className="text-sauge">score</span>
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {RELATED_TOOLS.map((tool) => {
                                const Icon = tool.icon;
                                return (
                                    <Link
                                        key={tool.href}
                                        href={tool.href}
                                        className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1"
                                    >
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">{tool.title}</h3>
                                        <p className="text-sm text-white/50">{tool.description}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Internal Links Section */}
                <section className="py-16 bg-fond-sombre border-t border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div>
                                    <h3 className="font-bold text-white mb-5 text-lg">Articles SEO & GEO</h3>
                                    <ul className="space-y-3">
                                        {[
                                            { href: "/blog/pourquoi-consultant-seo", text: "Pourquoi faire appel à un consultant SEO ?" },
                                            { href: "/blog/importance-audit-seo", text: "L'audit SEO : point de départ de votre croissance" },
                                            { href: "/blog/missions-consultant-seo", text: "Les missions d'un consultant SEO" },
                                        ].map((link) => (
                                            <li key={link.href}>
                                                <Link href={link.href} className="text-white/50 hover:text-violet-400 transition-colors flex items-center gap-2 text-sm">
                                                    <ArrowRight className="w-3 h-3 text-violet-400" />
                                                    {link.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white mb-5 text-lg">Consultant SEO par ville</h3>
                                    <ul className="space-y-3">
                                        {[
                                            { href: "/consultant-seo-nice", text: "Consultant SEO Nice" },
                                            { href: "/consultant-seo-cannes", text: "Consultant SEO Cannes" },
                                            { href: "/consultant-seo-sophia-antipolis", text: "Consultant SEO Sophia Antipolis" },
                                            { href: "/consultant-seo-paris", text: "Consultant SEO Paris" },
                                        ].map((link) => (
                                            <li key={link.href}>
                                                <Link href={link.href} className="text-white/50 hover:text-violet-400 transition-colors flex items-center gap-2 text-sm">
                                                    <ArrowRight className="w-3 h-3 text-violet-400" />
                                                    {link.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 bg-ink">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                                    Questions <span className="text-sauge">Fréquentes</span>
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {FAQ_ITEMS.map((item, index) => (
                                    <details
                                        key={index}
                                        className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                                    >
                                        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                            <span className="font-bold text-white pr-4">{item.question}</span>
                                            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-open:rotate-180 transition-transform">
                                                <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="px-6 pb-6">
                                            <p className="text-white/60 leading-relaxed">{item.answer}</p>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 bg-fond-sombre relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-fond-sombre via-fond-sombre to-violet-900/20" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sauge/20 rounded-full blur-[150px] pointer-events-none" />

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sauge/10 border border-sauge/20 mb-6 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-sauge" />
                            <span className="text-sauge font-bold text-xs uppercase tracking-[0.2em]">Expertise GEO</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 uppercase tracking-tight">
                            Besoin d'une stratégie<br />
                            <span className="text-sauge">GEO complète</span> ?
                        </h2>
                        <p className="text-white/50 mb-10 max-w-xl mx-auto text-lg">
                            Le GEO (Generative Engine Optimization) est la prochaine frontière du référencement.
                            Je vous accompagne pour apparaître dans les réponses de ChatGPT et Perplexity.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 bg-white text-ink px-10 py-5 rounded-full font-bold text-lg hover:bg-sauge hover:text-white transition-all shadow-2xl shadow-white/10 hover:-translate-y-0.5"
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
