import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, Phone, CheckCircle2, Bot, Shield, FileText, Award, Layout, ExternalLink } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AuditCTA } from "@/components/blog/AuditCTA";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "GEO en 2026 : Comment Apparaître dans ChatGPT, Perplexity et Google AI | IndHack",
    description: "Le Generative Engine Optimization (GEO) expliqué simplement. Guide pratique pour rendre votre site visible dans les réponses des IA. Checklist, outil gratuit et stratégie concrète.",
    keywords: ["GEO", "Generative Engine Optimization", "ChatGPT SEO", "visibilité IA", "référencement ChatGPT", "Perplexity SEO", "Google AI Overviews", "optimisation IA", "crawlers IA", "GPTBot"],
    authors: [{ name: "Indiana Aflalo" }],
    openGraph: {
        title: "GEO en 2026 : Comment Apparaître dans ChatGPT, Perplexity et Google AI",
        description: "Le Generative Engine Optimization (GEO) expliqué simplement. Guide pratique pour rendre votre site visible dans les réponses des IA.",
        type: "article",
        publishedTime: "2026-02-17",
        authors: ["Indiana Aflalo"],
        images: [{ url: "https://indhack.com/images/blog/geo-chatgpt-2026.jpg", width: 1200, height: 630, alt: "GEO Generative Engine Optimization 2026" }],
        locale: "fr_FR",
        siteName: "IndHack",
    },
    twitter: {
        card: "summary_large_image",
        title: "GEO en 2026 : Comment Apparaître dans ChatGPT et Perplexity",
        description: "Guide pratique du Generative Engine Optimization pour être cité par les IA.",
        images: ["https://indhack.com/images/blog/geo-chatgpt-2026.jpg"],
    },
    alternates: {
        canonical: "https://indhack.com/blog/geo-comment-apparaitre-chatgpt-2026",
    },
    robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
    },
};

const FAQ_ITEMS = [
    {
        question: "Le GEO va-t-il remplacer le SEO ?",
        answer: "Non, le GEO est un complément du SEO, pas un remplacement. Les fondations SEO (technique, contenu, autorité) restent essentielles. Un site mal référencé sur Google ne sera pas cité par les IA. Pensez au GEO comme une couche supplémentaire d'optimisation qui s'ajoute à votre stratégie SEO existante.",
    },
    {
        question: "Combien de temps pour voir des résultats en GEO ?",
        answer: "Les actions techniques (débloquer les crawlers, ajouter les données structurées) montrent des effets en quelques semaines. La construction d'autorité et de crédibilité pour être cité régulièrement par les IA demande 3 à 6 mois. C'est un investissement moyen terme, comme le SEO.",
    },
    {
        question: "Comment savoir si mon site apparaît dans les réponses IA ?",
        answer: "Deux méthodes : le test manuel (posez des questions à ChatGPT/Perplexity sur votre domaine d'expertise et vérifiez si vous êtes cité) et les outils automatisés comme le testeur de visibilité IA IndHack qui analyse les signaux techniques déterminant si votre site peut être cité.",
    },
    {
        question: "Les petites entreprises sont-elles concernées par le GEO ?",
        answer: "Oui, particulièrement. Le GEO offre un avantage first mover : vos concurrents n'y pensent probablement pas encore. Une PME qui optimise son GEO maintenant peut être citée avant des entreprises plus grandes mais moins réactives. C'est une fenêtre d'opportunité.",
    },
    {
        question: "Faut-il bloquer ou autoriser les crawlers IA ?",
        answer: "Autoriser, dans 99% des cas. Bloquer les crawlers IA revient à se rendre invisible pour une part croissante de votre audience. Les seules exceptions : contenus très sensibles ou propriété intellectuelle que vous ne voulez pas voir réutilisée par des modèles IA.",
    },
    {
        question: "Qu'est-ce que le fichier llms.txt ?",
        answer: "C'est un fichier texte placé à la racine de votre site (comme robots.txt) qui aide les LLM (Large Language Models) à comprendre votre contenu. Il peut contenir des informations sur votre entreprise, vos sujets d'expertise, vos pages importantes. Le format n'est pas encore standardisé mais plusieurs acteurs IA commencent à le reconnaître.",
    },
];

const CHECKLIST = [
    "Vérifiez votre robots.txt — GPTBot, PerplexityBot, Claude-Web, Google-Extended sont-ils autorisés ?",
    "Créez ou mettez à jour votre sitemap.xml — Référencez-le dans robots.txt",
    "Ajoutez des données structurées — Organization, LocalBusiness, FAQPage minimum",
    "Structurez vos titres H2/H3 en format questions — \"Comment...\", \"Pourquoi...\", \"Qu'est-ce que...\"",
    "Ajoutez une section FAQ sur vos pages principales — Avec schema FAQPage",
    "Identifiez clairement l'auteur — Page à propos, bio, profils professionnels",
    "Incluez des données chiffrées et des sources — Statistiques, études, références",
    "Optimisez votre Google Business Profile — Photos, avis, description complète",
    "Vérifiez votre temps de chargement — Les IA pénalisent les sites lents",
    "Testez votre visibilité IA avec notre testeur gratuit",
];

const AI_CRAWLERS = [
    { name: "GPTBot", company: "OpenAI", usage: "Entraînement des modèles" },
    { name: "ChatGPT-User", company: "OpenAI", usage: "Navigation temps réel" },
    { name: "OAI-SearchBot", company: "OpenAI", usage: "Recherche OpenAI" },
    { name: "PerplexityBot", company: "Perplexity", usage: "Moteur de recherche IA" },
    { name: "Claude-Web", company: "Anthropic", usage: "Assistant Claude" },
    { name: "Google-Extended", company: "Google", usage: "Entraînement Gemini" },
    { name: "Bytespider", company: "ByteDance", usage: "TikTok AI / Doubao" },
    { name: "CCBot", company: "Common Crawl", usage: "Données d'entraînement IA" },
];

export default function GEOArticlePage() {
    return (
        <>
            {/* Schema.org Article */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": "GEO : Comment Rendre Votre Site Visible dans ChatGPT, Perplexity et Google AI en 2026",
                        "description": "Le Generative Engine Optimization (GEO) expliqué simplement. Guide pratique pour rendre votre site visible dans les réponses des IA. Checklist, outil gratuit et stratégie concrète.",
                        "image": {
                            "@type": "ImageObject",
                            "url": "https://indhack.com/images/blog/geo-chatgpt-2026.jpg",
                            "width": 1200,
                            "height": 630,
                        },
                        "datePublished": "2026-02-17",
                        "dateModified": "2026-02-17",
                        "author": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "url": "https://indhack.com/a-propos",
                            "jobTitle": "Consultante SEO",
                            "worksFor": { "@type": "Organization", "name": "IndHack" },
                            "sameAs": ["https://www.linkedin.com/in/indianaaflalo"],
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "IndHack",
                            "url": "https://indhack.com",
                            "logo": { "@type": "ImageObject", "url": "https://indhack.com/images/logo-indhack.webp", "width": 200, "height": 60 },
                        },
                        "mainEntityOfPage": { "@type": "WebPage", "@id": "https://indhack.com/blog/geo-comment-apparaitre-chatgpt-2026" },
                        "keywords": "GEO, Generative Engine Optimization, ChatGPT SEO, visibilité IA, référencement IA",
                        "articleSection": "IA & SEO",
                        "inLanguage": "fr-FR",
                        "isAccessibleForFree": true,
                        "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", "h2", ".lead"] },
                    }),
                }}
            />

            {/* Schema.org FAQPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": FAQ_ITEMS.map((item) => ({
                            "@type": "Question",
                            "name": item.question,
                            "acceptedAnswer": { "@type": "Answer", "text": item.answer },
                        })),
                    }),
                }}
            />

            {/* BreadcrumbList Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://indhack.com" },
                            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://indhack.com/blog" },
                            { "@type": "ListItem", "position": 3, "name": "GEO : Comment Apparaître dans ChatGPT en 2026", "item": "https://indhack.com/blog/geo-comment-apparaitre-chatgpt-2026" },
                        ],
                    }),
                }}
            />

            <Breadcrumb
                items={[
                    { label: "Blog", href: "/blog" },
                    { label: "GEO : Comment Apparaître dans ChatGPT en 2026", href: "/blog/geo-comment-apparaitre-chatgpt-2026" },
                ]}
            />

            <main className="pt-8 pb-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <header className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-soft mb-6">
                            <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-lg font-bold uppercase tracking-wider text-xs">
                                IA & SEO
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                17 février 2026
                            </span>
                            <span className="text-soft">~15 min de lecture</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-ink mb-6 leading-tight">
                            GEO : Comment Rendre Votre Site Visible dans ChatGPT, Perplexity et Google AI en 2026
                        </h1>

                        <p className="lead text-xl text-soft leading-relaxed italic border-l-4 border-violet-500 pl-6">
                            Le Generative Engine Optimization (GEO) expliqué simplement. Guide pratique pour être cité par les IA quand vos clients posent des questions.
                        </p>
                    </header>

                    {/* Content Grid */}
                    <div className="grid lg:grid-cols-4 gap-12">
                        {/* Sidebar */}
                        <aside className="lg:col-span-1 order-last lg:order-first">
                            <div className="sticky top-32 space-y-8">
                                <div className="hidden lg:block">
                                    <div className="text-xs font-bold text-ink uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                                        Sommaire
                                    </div>
                                    <nav className="space-y-1">
                                        {[
                                            { id: "quest-ce-que-le-geo", label: "Qu'est-ce que le GEO ?" },
                                            { id: "pourquoi-le-geo-est-incontournable", label: "Pourquoi le GEO est incontournable" },
                                            { id: "les-4-piliers-du-geo", label: "Les 4 piliers du GEO" },
                                            { id: "geo-et-seo-local", label: "GEO et SEO local" },
                                            { id: "checklist-geo", label: "Checklist GEO" },
                                            { id: "faq", label: "FAQ" },
                                        ].map((item) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className="block text-sm py-1 border-l-2 pl-3 text-soft border-transparent hover:text-violet-600 hover:border-violet-600 transition-colors font-medium"
                                            >
                                                {item.label}
                                            </a>
                                        ))}
                                    </nav>
                                </div>

                                <div className="bg-ink p-6 rounded-2xl text-white">
                                    <div className="font-heading font-bold text-lg mb-4">Testez votre visibilité IA</div>
                                    <p className="text-white/70 text-sm mb-6">
                                        Votre site est-il visible par ChatGPT et Perplexity ?
                                    </p>
                                    <Link
                                        href="/outils/testeur-visibilite-ia"
                                        className="block w-full bg-violet-500 hover:bg-violet-400 text-white text-center py-3 rounded-xl font-bold transition-colors mb-3"
                                    >
                                        Tester gratuitement
                                    </Link>
                                    <a href="tel:0661139748" className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                                        <Phone className="w-4 h-4" />
                                        06 61 13 97 48
                                    </a>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                    <div className="font-heading font-bold text-ink mb-4">Auteur</div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-violet-100 flex items-center justify-center">
                                            <span className="text-violet-600 font-bold">IA</span>
                                        </div>
                                        <div>
                                            <div className="font-bold text-ink text-sm">Indiana Aflalo</div>
                                            <div className="text-xs text-soft">Consultante SEO</div>
                                        </div>
                                    </div>
                                    <Link href="/a-propos" className="text-xs font-medium text-violet-600 hover:text-ink transition-colors flex items-center gap-1">
                                        Voir mon profil <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <article className="lg:col-span-3 prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-headings:text-ink prose-headings:scroll-mt-32 prose-p:text-soft prose-li:text-soft prose-strong:text-ink prose-a:text-violet-600 prose-blockquote:border-violet-500 prose-blockquote:bg-gray-50 prose-blockquote:p-6 prose-blockquote:rounded-xl max-w-none">

                            {/* Introduction */}
                            <p>
                                En 2026, vos clients ne tapent plus seulement des mots-clés dans Google. Ils posent des questions à <strong>ChatGPT</strong>, <strong>Perplexity</strong>, <strong>Google AI Overviews</strong>, Claude ou Gemini. Ces moteurs de recherche IA ne renvoient pas une liste de liens : ils génèrent une réponse unique en synthétisant plusieurs sources.
                            </p>

                            <p>
                                La question n'est plus "êtes-vous bien référencé sur Google ?" mais <strong>"êtes-vous cité par les IA quand vos clients potentiels posent une question ?"</strong>
                            </p>

                            <p>
                                Selon les recherches menées par l'université de Princeton sur le GEO (2023-2024), les techniques d'optimisation pour les moteurs génératifs peuvent améliorer la visibilité dans les réponses IA de <strong>30 à 40%</strong>. Ce n'est pas une projection : c'est une réalité mesurable.
                            </p>

                            <p>
                                Dans ce guide, je vous explique concrètement ce qu'est le GEO, pourquoi il va impacter votre business, et surtout comment adapter votre site dès aujourd'hui.
                            </p>

                            <p>
                                <strong>IndHack propose le premier outil de diagnostic GEO gratuit en français.</strong> Notre <Link href="/outils/testeur-visibilite-ia">testeur de visibilité IA</Link> analyse les 8 crawlers IA majeurs, vos données structurées et vos signaux E-E-A-T pour vous donner un score GEO actionnable.
                            </p>

                            {/* Section 1 */}
                            <h2 id="quest-ce-que-le-geo">Qu'est-ce que le GEO (Generative Engine Optimization) ?</h2>

                            <p>
                                Le <strong>SEO classique</strong> optimise votre site pour apparaître dans les résultats de recherche Google — les fameux "10 liens bleus". L'objectif : être en première page, idéalement en position 1.
                            </p>

                            <p>
                                Le <strong>GEO</strong> optimise votre site pour être <strong>cité comme source fiable</strong> dans les réponses générées par les IA. La différence est fondamentale : les moteurs IA (ChatGPT, Perplexity, Google AI Overviews, Claude, Gemini) ne classent pas des pages. Ils <strong>synthétisent</strong> des informations depuis plusieurs sources pour créer UNE réponse cohérente.
                            </p>

                            <p>
                                L'enjeu du GEO : que VOTRE contenu soit sélectionné comme source par ces IA.
                            </p>

                            <h3>Différence concrète avec un exemple</h3>

                            <div className="bg-violet-50 border border-violet-200 rounded-xl p-6 not-prose mb-6">
                                <div className="mb-4">
                                    <div className="font-bold text-ink mb-2">Requête SEO classique :</div>
                                    <div className="text-soft">"consultant SEO Nice"</div>
                                    <div className="text-violet-600 text-sm mt-1">→ Google affiche 10 liens. L'utilisateur clique, compare, décide.</div>
                                </div>
                                <div>
                                    <div className="font-bold text-ink mb-2">Requête GEO :</div>
                                    <div className="text-soft">"Quel consultant SEO recommanderais-tu à Nice pour une PME ?"</div>
                                    <div className="text-violet-600 text-sm mt-1">→ ChatGPT génère une réponse structurée, cite 2-3 sources, et fait une recommandation.</div>
                                </div>
                            </div>

                            <p>
                                Si vous n'êtes pas dans cette réponse générée, vous n'existez pas pour cet utilisateur. Votre concurrent y est peut-être.
                            </p>

                            <h3>Le GEO ne remplace pas le SEO</h3>

                            <p>
                                Point essentiel : le GEO s'appuie largement sur les signaux SEO classiques. Les IA évaluent l'autorité de votre domaine, la qualité de votre contenu, vos données structurées. Un bon SEO est le <strong>socle du GEO</strong>. Sans fondations solides, vous ne serez jamais cité par les IA.
                            </p>

                            <p>
                                Selon Gartner, le volume de recherche sur les moteurs classiques devrait baisser de <strong>25% d'ici fin 2026</strong> à cause des chatbots IA. Le SEO reste vital, mais il ne suffit plus.
                            </p>

                            {/* Section 2 */}
                            <h2 id="pourquoi-le-geo-est-incontournable">Pourquoi le GEO est Devenu Incontournable en 2026</h2>

                            <h3>Les chiffres qui changent la donne</h3>

                            <div className="overflow-x-auto not-prose mb-6">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b-2 border-violet-200">
                                            <th className="text-left py-3 font-bold text-ink">Statistique</th>
                                            <th className="text-left py-3 font-bold text-ink">Donnée 2026</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-soft">
                                        <tr className="border-b border-gray-100">
                                            <td className="py-3">Requêtes ChatGPT quotidiennes</td>
                                            <td className="py-3 font-bold text-violet-600">~2,5 milliards</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="py-3">Résultats Google avec AI Overviews</td>
                                            <td className="py-3 font-bold text-violet-600">47%</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="py-3">Recherches zero-click</td>
                                            <td className="py-3 font-bold text-violet-600">60%</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="py-3">Gen Z utilisant les IA plutôt que Google</td>
                                            <td className="py-3 font-bold text-violet-600">31%</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3">Baisse du CTR organique avec AI Overviews</td>
                                            <td className="py-3 font-bold text-red-500">jusqu'à -61%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p className="text-sm text-soft italic">
                                Sources : Seer Interactive (novembre 2025), SparkToro, données publiques OpenAI.
                            </p>

                            <h3>Ce que ça change pour votre business</h3>

                            <p>
                                <strong>Vos clients comparent déjà via ChatGPT.</strong> Quand quelqu'un cherche un prestataire, un produit ou un service, il demande souvent à ChatGPT "compare X et Y" ou "quel est le meilleur Z pour mon besoin". Si vous n'apparaissez pas dans ces réponses, c'est votre concurrent qui est recommandé.
                            </p>

                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 not-prose my-6">
                                <div className="font-bold text-ink mb-2">Exemple concret de mon activité de consultante</div>
                                <p className="text-soft text-sm">
                                    J'ai récemment audité le site d'un commerce niçois qui bloquait GPTBot sans le savoir — une configuration par défaut de leur hébergeur Cloudflare. Leur robots.txt contenait une ligne <code className="bg-white px-1 rounded">User-agent: GPTBot / Disallow: /</code>. Résultat : quand un client demandait à ChatGPT "meilleur [leur métier] à Nice", ils n'apparaissaient jamais. Leur concurrent direct, lui, était systématiquement cité. Une simple correction du robots.txt a changé la donne en quelques semaines.
                                </p>
                            </div>

                            <p>
                                <strong>Le GEO impacte particulièrement les requêtes à forte intention d'achat</strong> : comparatifs, choix de prestataire, shortlists. Ce sont les requêtes les plus précieuses commercialement.
                            </p>

                            <p>
                                Pour les entreprises locales, l'impact est direct. Les utilisateurs demandent de plus en plus "quel est le meilleur [service] près de [ville]" aux IA. C'est particulièrement vrai pour le <Link href="/referencement-naturel">référencement naturel local</Link>, où les IA citent de plus en plus les fiches Google Business Profile comme source.
                            </p>

                            {/* Section 3 - Les 4 Piliers */}
                            <h2 id="les-4-piliers-du-geo">Les 4 Piliers du GEO : Comment Optimiser Votre Site pour les IA</h2>

                            {/* Pilier 1 */}
                            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-6 not-prose mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-heading font-bold text-ink text-lg">Pilier 1 — Accessibilité technique aux crawlers IA</div>
                                    </div>
                                </div>
                            </div>

                            <p>
                                Les moteurs IA envoient des robots explorer votre site, exactement comme Googlebot. Mais ce sont des robots <strong>différents</strong>. Si vous les bloquez, les IA ne lisent pas votre contenu. Vous êtes invisible.
                            </p>

                            <h3>Les crawlers IA à connaître</h3>

                            <div className="overflow-x-auto not-prose mb-6">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b-2 border-cyan-200">
                                            <th className="text-left py-3 font-bold text-ink">Crawler</th>
                                            <th className="text-left py-3 font-bold text-ink">Éditeur</th>
                                            <th className="text-left py-3 font-bold text-ink">Usage</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-soft">
                                        {AI_CRAWLERS.map((crawler, i) => (
                                            <tr key={crawler.name} className={i < AI_CRAWLERS.length - 1 ? "border-b border-gray-100" : ""}>
                                                <td className="py-3 font-bold text-ink">{crawler.name}</td>
                                                <td className="py-3">{crawler.company}</td>
                                                <td className="py-3">{crawler.usage}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <h3>Actions concrètes</h3>

                            <ol>
                                <li><strong>Vérifiez votre robots.txt</strong> — Beaucoup de sites bloquent ces crawlers sans le savoir. Cloudflare les bloque par défaut depuis 2024.</li>
                                <li><strong>Créez un fichier llms.txt</strong> — C'est l'équivalent du robots.txt pour les IA. Placé à la racine de votre site, il aide les LLM à comprendre votre contenu.</li>
                                <li><strong>Assurez-vous que votre contenu est rendu côté serveur</strong> — Si votre contenu est caché derrière du JavaScript pur, les crawlers IA ne le voient pas.</li>
                                <li><strong>Vérifiez votre sitemap.xml</strong> — Il doit être à jour et référencé dans votre robots.txt.</li>
                            </ol>

                            <blockquote>
                                <strong>Actions immédiates :</strong> Vérifiez si votre site bloque les crawlers IA (voir le testeur en sidebar). Si vous devez corriger votre robots.txt, utilisez notre <Link href="/outils/generateur-robots-txt">générateur de robots.txt optimisé IA</Link>.
                            </blockquote>

                            {/* Pilier 2 */}
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 not-prose mb-8 mt-12">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-heading font-bold text-ink text-lg">Pilier 2 — Richesse sémantique et données structurées</div>
                                    </div>
                                </div>
                            </div>

                            <p>
                                Les IA comprennent mieux le contenu quand il est balisé avec des <strong>données structurées</strong> (Schema.org). C'est le langage des machines.
                            </p>

                            <h3>Les schemas essentiels pour le GEO</h3>

                            <ul>
                                <li><strong>Organization</strong> — Votre entreprise (identité claire)</li>
                                <li><strong>LocalBusiness</strong> — Entreprise locale (visibilité locale IA)</li>
                                <li><strong>FAQPage</strong> — Questions fréquentes (format préféré des IA)</li>
                                <li><strong>Article / BlogPosting</strong> — Contenus éditoriaux (attribution d'auteur)</li>
                                <li><strong>Product</strong> — Produits e-commerce (comparatifs IA)</li>
                                <li><strong>Review / AggregateRating</strong> — Avis clients (preuve sociale)</li>
                            </ul>

                            <p>
                                Les <strong>FAQ structurées</strong> sont particulièrement importantes. Les IA adorent le format question/réponse car c'est exactement ainsi que les utilisateurs les interrogent.
                            </p>

                            <h3>Structure du contenu</h3>

                            <ul>
                                <li><strong>Des titres (H2, H3) qui posent des questions</strong> — Les IA mappent le contenu par intention de recherche</li>
                                <li><strong>Des listes à puces et des tableaux</strong> — Les IA extraient plus facilement les données structurées</li>
                                <li><strong>Des réponses directes en début de section</strong> — Pas de suspense, allez droit au but</li>
                                <li><strong>Des chiffres, des données, des statistiques sourcées</strong> — Les IA préfèrent le contenu vérifiable</li>
                            </ul>

                            <blockquote>
                                <strong>Action :</strong> Si votre site n'a pas de données structurées, notre <Link href="/outils/generateur-schema-json-ld">générateur de schema JSON-LD</Link> vous permet d'en créer en quelques clics.
                            </blockquote>

                            {/* Pilier 3 */}
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 not-prose mb-8 mt-12">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-heading font-bold text-ink text-lg">Pilier 3 — Signaux E-E-A-T</div>
                                    </div>
                                </div>
                            </div>

                            <p>
                                Les IA sont entraînées à privilégier les sources fiables. Le framework <strong>E-E-A-T</strong> de Google s'applique aussi au GEO.
                            </p>

                            <div className="overflow-x-auto not-prose mb-6">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b-2 border-amber-200">
                                            <th className="text-left py-3 font-bold text-ink">Critère</th>
                                            <th className="text-left py-3 font-bold text-ink">Signification</th>
                                            <th className="text-left py-3 font-bold text-ink">Comment le renforcer</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-soft">
                                        <tr className="border-b border-gray-100">
                                            <td className="py-3 font-bold text-ink">Experience</td>
                                            <td className="py-3">Vécu réel du sujet</td>
                                            <td className="py-3">Études de cas, exemples concrets, résultats chiffrés</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="py-3 font-bold text-ink">Expertise</td>
                                            <td className="py-3">Compétence démontrée</td>
                                            <td className="py-3">Auteur identifié, bio, certifications, page à propos</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="py-3 font-bold text-ink">Authoritativeness</td>
                                            <td className="py-3">Reconnaissance par les pairs</td>
                                            <td className="py-3">Backlinks de qualité, mentions presse, annuaires pro</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 font-bold text-ink">Trustworthiness</td>
                                            <td className="py-3">Confiance et transparence</td>
                                            <td className="py-3">Mentions légales, politique de confidentialité, contact, HTTPS</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p>
                                Un contenu non sourcé, sans auteur identifié, sans page de contact, sera ignoré par les IA.
                            </p>

                            <blockquote>
                                <strong>Diagnostic :</strong> Un <Link href="/audit-seo">audit SEO technique</Link> permet d'identifier rapidement les lacunes de votre site en matière de signaux E-E-A-T.
                            </blockquote>

                            {/* Pilier 4 */}
                            <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-2xl p-6 not-prose mb-8 mt-12">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                                        <Layout className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-heading font-bold text-ink text-lg">Pilier 4 — Format "AI-friendly" du contenu</div>
                                    </div>
                                </div>
                            </div>

                            <p>Au-delà de la structure, le <strong>contenu lui-même</strong> doit être optimisé pour les IA.</p>

                            <h3>Soyez la meilleure réponse</h3>
                            <p>Votre contenu doit être exhaustif, précis et unique. Les IA comparent des dizaines de sources. Si votre page est moins complète que celle d'un concurrent, elle ne sera pas citée.</p>

                            <h3>Incluez des données originales</h3>
                            <p>Vos propres études, benchmarks, statistiques. Les IA valorisent le contenu qui apporte quelque chose de nouveau.</p>

                            <h3>Citez vos sources</h3>
                            <p>Les IA font confiance au contenu qui référence des sources fiables. Une affirmation non sourcée a moins de poids.</p>

                            <h3>Longueur et profondeur</h3>
                            <p>Les contenus longs (2000+ mots) sur vos sujets d'expertise performent mieux — non pas parce que "plus c'est long, mieux c'est", mais parce qu'un sujet traité en profondeur répond à plus de questions.</p>

                            <h3>Mises à jour régulières</h3>
                            <p>Les IA préfèrent le contenu récent. Affichez clairement la date de dernière mise à jour.</p>

                            <blockquote>
                                <strong>Outil complémentaire :</strong> Notre <Link href="/outils/audit-seo-gratuit">audit SEO gratuit</Link> analyse la structure et le contenu de vos pages.
                            </blockquote>

                            {/* GEO Local */}
                            <h2 id="geo-et-seo-local">GEO et SEO Local : L'Enjeu pour les Entreprises de Proximité</h2>

                            <p>
                                Les IA répondent de plus en plus aux requêtes locales. "Quel restaurant italien près de moi ?", "Trouve-moi un plombier à Nice disponible aujourd'hui" — ces questions sont posées à ChatGPT, pas à Google.
                            </p>

                            <h3>Les clés du GEO local</h3>

                            <ol>
                                <li><strong>Google Business Profile optimisé</strong> — C'est une source majeure pour les IA. Photos, horaires, description complète, catégories précises.</li>
                                <li><strong>Avis Google récents et positifs</strong> — Les IA utilisent les avis pour évaluer la fiabilité. Un commerce avec 4,5 étoiles et 200 avis sera plus souvent cité qu'un concurrent à 3,8 étoiles.</li>
                                <li><strong>Contenu localisé sur votre site</strong> — Mentionnez les quartiers, les zones spécifiques, les particularités locales.</li>
                                <li><strong>Citations NAP cohérentes</strong> — Nom, Adresse, Téléphone identiques partout sur le web.</li>
                            </ol>

                            <p>
                                Pour optimiser votre référencement local, <Link href="/consultant-seo-nice">découvrez nos services SEO à Nice et sur la Côte d'Azur</Link>.
                            </p>

                            {/* Checklist */}
                            <h2 id="checklist-geo">Checklist GEO — 10 Actions à Faire Aujourd'hui</h2>

                            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-6 not-prose mb-8">
                                <div className="font-heading font-bold text-ink text-lg mb-6">Actions prioritaires</div>
                                <div className="space-y-4">
                                    {CHECKLIST.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                                {i + 1}
                                            </div>
                                            <span className="text-soft text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                                            </div>

                            {/* FAQ */}
                            <h2 id="faq">Questions Fréquentes sur le GEO</h2>

                            <div className="space-y-4 not-prose mb-8">
                                {FAQ_ITEMS.map((faq, i) => (
                                    <details key={i} className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-ink hover:bg-gray-100 transition-colors">
                                            {faq.question}
                                            <span className="text-soft group-open:rotate-180 transition-transform">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="px-5 pb-5 text-soft">
                                            {faq.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>

                            {/* Conclusion */}
                            <h2>Ce qu'il faut retenir</h2>

                            <p>
                                Le <strong>GEO (Generative Engine Optimization)</strong> n'est pas une tendance passagère. C'est l'évolution naturelle du référencement face à la montée des IA génératives. Les entreprises qui investissent dans le GEO maintenant auront un avantage concurrentiel durable.
                            </p>

                            <p>Les 4 piliers à retenir :</p>
                            <ol>
                                <li><strong>Accessibilité</strong> — Autorisez les crawlers IA</li>
                                <li><strong>Sémantique</strong> — Structurez vos données (Schema.org, FAQ)</li>
                                <li><strong>E-E-A-T</strong> — Démontrez votre expertise et votre fiabilité</li>
                                <li><strong>Format</strong> — Créez du contenu complet, sourcé, à jour</li>
                            </ol>

                            {/* Tags */}
                            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2 not-prose">
                                {["GEO", "ChatGPT SEO", "visibilité IA", "crawlers IA", "GPTBot", "Perplexity", "Google AI", "référencement IA"].map((tag) => (
                                    <span key={tag} className="text-xs font-medium text-soft bg-gray-50 px-3 py-1 rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </article>
                    </div>

                    {/* CTA Section */}
                    <section className="mt-20 py-12 px-8 bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl text-center text-white">
                        <Bot className="w-16 h-16 mx-auto mb-6 opacity-90" />
                        <div className="text-2xl md:text-3xl font-heading font-bold mb-4">
                            Testez gratuitement votre visibilité IA
                        </div>
                        <p className="text-white/80 mb-8 max-w-xl mx-auto">
                            Le seul outil français qui analyse si votre site peut être cité par ChatGPT, Perplexity et Claude.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/outils/testeur-visibilite-ia"
                                className="bg-white text-violet-700 hover:bg-violet-100 rounded-full px-8 py-4 font-bold transition-colors inline-flex items-center gap-2"
                            >
                                Tester mon site gratuitement
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/contact"
                                className="bg-white/10 border border-white/30 text-white hover:bg-white/20 rounded-full px-8 py-4 font-bold transition-colors"
                            >
                                Demander un audit GEO
                            </Link>
                        </div>
                    </section>

                    {/* Resources Section */}
                    <section className="mt-16">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8">Ressources complémentaires</h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Outils */}
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <h3 className="font-bold text-ink mb-4">Outils gratuits</h3>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/outils/generateur-robots-txt" className="text-violet-600 hover:text-violet-800 font-medium flex items-center gap-2 text-sm">
                                            <ArrowRight className="w-3 h-3" />
                                            Générateur robots.txt IA
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/outils/generateur-schema-json-ld" className="text-violet-600 hover:text-violet-800 font-medium flex items-center gap-2 text-sm">
                                            <ArrowRight className="w-3 h-3" />
                                            Générateur Schema JSON-LD
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/outils/audit-seo-gratuit" className="text-violet-600 hover:text-violet-800 font-medium flex items-center gap-2 text-sm">
                                            <ArrowRight className="w-3 h-3" />
                                            Audit SEO Gratuit
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/outils" className="text-violet-600 hover:text-violet-800 font-medium flex items-center gap-2 text-sm">
                                            <ArrowRight className="w-3 h-3" />
                                            Tous nos outils SEO
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Articles */}
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <h3 className="font-bold text-ink mb-4">Articles à lire</h3>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/blog/checklist-seo-2026" className="text-violet-600 hover:text-violet-800 font-medium flex items-center gap-2 text-sm">
                                            <ArrowRight className="w-3 h-3" />
                                            Checklist SEO 2026
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blog/importance-audit-seo" className="text-violet-600 hover:text-violet-800 font-medium flex items-center gap-2 text-sm">
                                            <ArrowRight className="w-3 h-3" />
                                            L'importance d'un audit SEO
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blog/google-business-profile-guide-complet" className="text-violet-600 hover:text-violet-800 font-medium flex items-center gap-2 text-sm">
                                            <ArrowRight className="w-3 h-3" />
                                            Guide Google Business Profile
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Services */}
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <h3 className="font-bold text-ink mb-4">Services SEO</h3>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/consultant-seo-nice" className="text-violet-600 hover:text-violet-800 font-medium flex items-center gap-2 text-sm">
                                            <ArrowRight className="w-3 h-3" />
                                            Consultante SEO Nice
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/consultant-seo-cannes" className="text-violet-600 hover:text-violet-800 font-medium flex items-center gap-2 text-sm">
                                            <ArrowRight className="w-3 h-3" />
                                            Consultante SEO Cannes
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/consultant-seo-sophia-antipolis" className="text-violet-600 hover:text-violet-800 font-medium flex items-center gap-2 text-sm">
                                            <ArrowRight className="w-3 h-3" />
                                            Consultante SEO Sophia-Antipolis
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/audit-seo" className="text-violet-600 hover:text-violet-800 font-medium flex items-center gap-2 text-sm">
                                            <ArrowRight className="w-3 h-3" />
                                            Audit SEO complet
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
