import { Metadata } from "next";
import Link from "next/link";
import { TesteurVisibiliteIA } from "./TesteurVisibiliteIA";
import { ArrowRight, Bot, Shield, Code2, FileCode, Search, MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "Tester ma visibilité GEO — site prêt à être cité par les IA",
    description: "Votre site est-il accessible aux crawlers IA et prêt à être cité par ChatGPT, Perplexity, Claude et Google AI Mode ? Score GEO sur 100, diagnostic complet, gratuit, sans inscription.",
    alternates: {
        canonical: "https://indhack.com/outils/testeur-visibilite-ia"
    },
    openGraph: {
        title: "Tester ma visibilité GEO — site prêt à être cité par les IA",
        description: "Audit GEO en 30 secondes : robots.txt, llms.txt, schemas, signaux E-E-A-T, format citable. Score sur 100 + diagnostic actionnable. Sans inscription.",
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
        answer: "Cet outil vérifie 9 crawlers IA : MistralBot (Mistral), GPTBot et ChatGPT-User (OpenAI), OAI-SearchBot (OpenAI Search), Claude-Web (Anthropic), PerplexityBot (Perplexity), Google-Extended (Gemini), Bytespider (ByteDance/TikTok), et CCBot (Common Crawl). Chacun a un rôle différent dans l'écosystème IA."
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
                        "@type": "SoftwareApplication",
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
                            "@type": "Person",
                            "@id": "https://indhack.com/#indiana-aflalo",
                            "name": "Indiana Aflalo",
                            "jobTitle": "Consultante SEO & Experte GEO"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "@id": "https://indhack.com/#organization",
                            "name": "IndHack",
                            "url": "https://indhack.com"
                        },
                        "inLanguage": "fr-FR",
                        "isAccessibleForFree": true,
                        "datePublished": "2026-01-15",
                        "dateModified": "2026-03-11",
                        "featureList": [
                            "Vérification de 8 crawlers IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, MistralBot)",
                            "Analyse robots.txt pour tous les crawlers IA majeurs",
                            "Score de visibilité GEO sur 100 points",
                            "Analyse des signaux E-E-A-T pour l'IA",
                            "Recommandations GEO personnalisées et actionnables",
                            "Vérification du fichier llms.txt",
                            "Analyse des données structurées JSON-LD",
                            "Rapport public partageable avec badge SVG"
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

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sauge/20 border border-sauge/30 rounded-full text-white text-sm font-bold mb-4">
                                <Bot className="w-4 h-4" />
                                <span className="uppercase tracking-wider text-xs">Audit GEO · Unique en France · 100 % gratuit</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4 leading-tight">
                                Tester ma visibilité <span className="text-sauge-light">sur les IA</span>
                            </h1>
                            <p className="text-soft-light text-lg leading-relaxed max-w-2xl mx-auto">
                                Votre site est-il cité par <strong className="text-white">ChatGPT, Perplexity, Claude</strong> et <strong className="text-white">Google AI Mode</strong> ? Obtenez votre score GEO sur 100 en <strong className="text-white">30 secondes</strong>. Sans inscription.
                            </p>
                        </div>

                        {/* Tool */}
                        <TesteurVisibiliteIA />
                    </div>
                </section>

                {/* How the tester works - SEO content section */}
                <section className="py-16 bg-ink border-t border-white/5">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto prose prose-invert">
                            <h2 className="text-2xl font-heading font-bold text-white mb-6">
                                Comment fonctionne le <span className="text-sauge-light">testeur de visibilité IA</span>
                            </h2>

                            <div className="space-y-6 text-soft-light">
                                <p>
                                    Notre testeur analyse votre site selon les critères qui déterminent sa visibilité auprès des IA génératives comme <strong className="text-white">ChatGPT</strong>, <strong className="text-white">Perplexity</strong>, <strong className="text-white">Claude</strong> et <strong className="text-white">Gemini</strong>. Cette discipline émergente s&apos;appelle le <strong className="text-white">GEO (Generative Engine Optimization)</strong> — l&apos;équivalent du SEO pour les moteurs de recherche IA.
                                </p>

                                <p>
                                    L&apos;outil vérifie d&apos;abord l&apos;<strong className="text-white">accessibilité de votre site aux crawlers IA</strong> : nous analysons votre fichier <code className="text-sauge-light bg-sauge/10 px-1 rounded">robots.txt</code> pour détecter si GPTBot, Claude-Web ou PerplexityBot sont autorisés à indexer vos pages. Nous vérifions également la présence du nouveau standard <code className="text-sauge-light bg-sauge/10 px-1 rounded">llms.txt</code>, un fichier Markdown adopté par plus de 844 000 sites (dont Anthropic, Cloudflare et Stripe) pour guider les LLM vers les contenus importants.
                                </p>

                                <p>
                                    Ensuite, nous analysons vos <strong className="text-white">données structurées JSON-LD</strong> (Organization, FAQPage, LocalBusiness...) qui permettent aux IA de comprendre le contexte de votre contenu. Les pages avec un <Link href="/outils/generateur-schema-json-ld" className="text-sauge-light hover:underline">schema JSON-LD</Link> bien implémenté sont jusqu&apos;à 40 % plus susceptibles d&apos;être citées comme source.
                                </p>

                                <p>
                                    Enfin, nous évaluons vos <strong className="text-white">signaux E-E-A-T</strong> (Expérience, Expertise, Autorité, Confiance) et la <strong className="text-white">citabilité de votre contenu</strong>. Les IA privilégient les contenus avec des données chiffrées, des listes structurées et des définitions claires. <Link href="/outils/generateur-robots-txt" className="text-sauge-light hover:underline">Configurez vos crawlers IA</Link> pour maximiser votre score, et complétez avec un <Link href="/outils/audit-seo-gratuit" className="text-sauge-light hover:underline">audit SEO complet</Link> pour optimiser votre référencement global.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-16 bg-fond-sombre border-t border-white/5">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-heading font-bold text-white text-center mb-10">
                                4 catégories de <span className="text-sauge-light">signaux</span> analysés
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
                                            <div className="w-10 h-10 rounded-lg bg-sauge/30 flex items-center justify-center mb-3">
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="font-bold text-white text-sm mb-1">{cat.title}</h3>
                                            <p className="text-sm text-soft-light mb-2">{cat.desc}</p>
                                            <span className="text-sm font-bold text-white">{cat.points} pts</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why AI visibility matters in 2026 - SEO content section */}
                <section className="py-16 bg-ink border-t border-white/5">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-heading font-bold text-white text-center mb-8">
                                Pourquoi la visibilité IA est <span className="text-sauge-light">cruciale en 2026</span>
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6 mb-10">
                                {[
                                    { stat: "39 %", label: "des Français utilisent les IA pour chercher", source: "IPSOS 2025" },
                                    { stat: "800M", label: "d'utilisateurs actifs hebdomadaires sur ChatGPT", source: "OpenAI 2025" },
                                    { stat: "-61 %", label: "de CTR organique sur les requêtes avec AI Overview", source: "Ahrefs" },
                                    { stat: "1,48 Md€", label: "marché GEO estimé en 2026", source: "Grand View Research" },
                                ].map((item) => (
                                    <div key={item.stat} className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                                        <span className="text-3xl font-bold text-white block mb-2">{item.stat}</span>
                                        <span className="text-white font-medium block mb-1">{item.label}</span>
                                        <span className="text-sm text-white/60">Source : {item.source}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="prose prose-invert max-w-none space-y-4 text-soft-light">
                                <p>
                                    Les moteurs de recherche traditionnels perdent du terrain face aux assistants IA. Quand un utilisateur demande à ChatGPT ou Perplexity « quel consultant SEO à Nice ? », l&apos;IA ne renvoie pas 10 liens bleus — elle <strong className="text-white">cite directement les sources qu&apos;elle juge fiables</strong>. Si votre site n&apos;est pas optimisé pour le GEO, vous êtes tout simplement invisible.
                                </p>

                                <p>
                                    Notre testeur de visibilité IA est <strong className="text-white">le seul outil GEO gratuit disponible en français</strong>. Les alternatives anglophones (Otterly.ai, GEO Tracker) sont payantes et ne prennent pas en compte les spécificités du marché francophone. En analysant votre site gratuitement, sans inscription, nous vous donnons les clés pour <Link href="/blog/geo-comment-apparaitre-chatgpt-2026" className="text-sauge-light hover:underline">apparaître dans les réponses de ChatGPT</Link> et des autres IA.
                                </p>
                            </div>

                            {/* SEO vs GEO comparison table */}
                            <div className="mt-10">
                                <h3 className="text-xl font-heading font-bold text-white text-center mb-6">
                                    SEO vs GEO : <span className="text-sauge-light">tableau comparatif</span>
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border-collapse">
                                        <thead>
                                            <tr className="bg-white/10">
                                                <th className="px-4 py-3 text-left text-white font-medium border border-white/20">Critère</th>
                                                <th className="px-4 py-3 text-left text-white font-medium border border-white/20">SEO classique</th>
                                                <th className="px-4 py-3 text-left text-sauge-light font-medium border border-white/20">GEO (Generative Engine Optimization)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-soft-light">
                                            <tr>
                                                <td className="px-4 py-3 border border-white/20 font-medium text-white">Objectif</td>
                                                <td className="px-4 py-3 border border-white/20">Apparaître dans les liens bleus Google</td>
                                                <td className="px-4 py-3 border border-white/20">Être cité comme source par les IA</td>
                                            </tr>
                                            <tr className="bg-white/5">
                                                <td className="px-4 py-3 border border-white/20 font-medium text-white">Canaux ciblés</td>
                                                <td className="px-4 py-3 border border-white/20">Google, Bing, Yahoo</td>
                                                <td className="px-4 py-3 border border-white/20">ChatGPT, Perplexity, Claude, Gemini, Copilot</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 border border-white/20 font-medium text-white">Signaux clés</td>
                                                <td className="px-4 py-3 border border-white/20">Backlinks, mots-clés, Core Web Vitals</td>
                                                <td className="px-4 py-3 border border-white/20">JSON-LD, E-E-A-T, llms.txt, contenu citable</td>
                                            </tr>
                                            <tr className="bg-white/5">
                                                <td className="px-4 py-3 border border-white/20 font-medium text-white">Crawlers</td>
                                                <td className="px-4 py-3 border border-white/20">Googlebot, Bingbot</td>
                                                <td className="px-4 py-3 border border-white/20">GPTBot, Claude-Web, PerplexityBot</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 border border-white/20 font-medium text-white">Métriques</td>
                                                <td className="px-4 py-3 border border-white/20">Position, CTR, impressions</td>
                                                <td className="px-4 py-3 border border-white/20">Taux de citation, présence dans les réponses IA</td>
                                            </tr>
                                            <tr className="bg-white/5">
                                                <td className="px-4 py-3 border border-white/20 font-medium text-white">Outils</td>
                                                <td className="px-4 py-3 border border-white/20">Search Console, Ahrefs, SEMrush</td>
                                                <td className="px-4 py-3 border border-white/20"><span className="text-sauge-light font-medium">Testeur Visibilité IA IndHack</span>, Perplexity Analytics</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-xs text-soft-light text-center mt-4">
                                    Le SEO et le GEO sont complémentaires. Un bon positionnement Google renforce généralement votre autorité perçue par les IA.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How to check if your brand is cited by ChatGPT — Pillar SEO content */}
                <section className="py-16 bg-ink border-t border-white/5">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto prose prose-invert">
                            <h2 className="text-2xl font-heading font-bold text-white mb-6">
                                Comment vérifier si votre marque est <span className="text-sauge-light">citée par ChatGPT</span> ?
                            </h2>

                            <div className="space-y-6 text-soft-light">
                                <p>
                                    En 2026, <strong className="text-white">39 % des consommateurs français</strong> interrogent ChatGPT, Perplexity ou Claude avant de prendre une décision d&apos;achat. Si votre marque n&apos;apparaît pas dans ces réponses, vous perdez des prospects sans même le savoir. Voici les trois méthodes pour vérifier votre présence.
                                </p>

                                <h3 className="text-xl font-heading font-bold text-white !mt-8 !mb-4">
                                    Méthode 1 : le test manuel (5 minutes)
                                </h3>
                                <p>
                                    Ouvrez <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-sauge-light hover:underline">ChatGPT</a>, <a href="https://www.perplexity.ai" target="_blank" rel="noopener noreferrer" className="text-sauge-light hover:underline">Perplexity</a> et Claude. Posez-leur les requêtes que vos clients taperaient : <em>&laquo;&nbsp;quel est le meilleur [votre métier] à [votre ville]&nbsp;?&nbsp;&raquo;</em>, <em>&laquo;&nbsp;recommande-moi un [votre service]&nbsp;&raquo;</em>. Notez si votre marque est citée, dans quelle position, et avec quelles informations.
                                </p>

                                <h3 className="text-xl font-heading font-bold text-white !mt-8 !mb-4">
                                    Méthode 2 : l&apos;analyse automatisée (30 secondes)
                                </h3>
                                <p>
                                    Utilisez notre <strong className="text-white">testeur de visibilité IA</strong> ci-dessus. Il analyse en un clic les 8 signaux techniques qui déterminent si les IA <em>peuvent</em> vous citer : crawlers autorisés, schema JSON-LD, fichier <code className="text-sauge-light bg-sauge/10 px-1 rounded">llms.txt</code>, signaux E-E-A-T. Un score inférieur à 50/100 signifie que votre site est techniquement invisible pour les IA, même si votre contenu est excellent.
                                </p>

                                <h3 className="text-xl font-heading font-bold text-white !mt-8 !mb-4">
                                    Méthode 3 : le monitoring continu
                                </h3>
                                <p>
                                    Créez un tableau de suivi mensuel. Chaque mois, posez les mêmes 10 requêtes aux IA et notez votre taux de citation. C&apos;est la seule façon de mesurer l&apos;impact de vos optimisations <Link href="/blog/geo-comment-apparaitre-chatgpt-2026" className="text-sauge-light hover:underline">GEO</Link> dans le temps. Pour aller plus loin, consultez notre <Link href="/blog/analyser-visibilite-marque-chatgpt-ia" className="text-sauge-light hover:underline">guide complet d&apos;analyse de visibilité IA</Link>.
                                </p>

                                <div className="!mt-8 bg-sauge/10 border border-sauge/30 rounded-xl p-6">
                                    <p className="!mb-0 text-white font-medium">
                                        <strong>Astuce pro :</strong> les IA citent en priorité les sites qui combinent <strong>autorité de domaine</strong> (backlinks, ancienneté) et <strong>contenu structuré</strong> (FAQ, données chiffrées, schema JSON-LD). C&apos;est pourquoi un bon <Link href="/audit-seo" className="text-sauge-light hover:underline">audit SEO</Link> est le socle indispensable de toute stratégie GEO.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Tools */}
                <section className="py-16 bg-fond-sombre border-t border-white/5">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-heading font-bold text-white text-center mb-8">
                            Outils <span className="text-sauge-light">complémentaires</span>
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
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="font-bold text-white mb-1 group-hover:text-sauge-light transition-colors">{tool.title}</h3>
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
                                        { href: "/blog/etude-de-cas-geo-vultifrine", text: "Étude de cas vultifrine : 168 citations IA en 27 jours" },
                                        { href: "/blog/concours-geo-greenred-2026-methode", text: "Méthode du concours GEO GreenRed 2026" },
                                        { href: "/blog/sites-francais-invisibles-ia-barometre-2026", text: "Sites français invisibles dans les IA — baromètre" },
                                        { href: "/blog/geo-comment-apparaitre-chatgpt-2026", text: "GEO : Comment apparaître dans ChatGPT en 2026" },
                                        { href: "/widget/testeur-ia", text: "Widget testeur IA embeddable (iframe gratuite)" },
                                        { href: "/blog/audit-seo-approfondi-guide-complet", text: "L'audit SEO : point de départ de votre croissance" },
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-soft-light hover:text-sauge-light transition-colors flex items-center gap-2 text-sm">
                                                <ArrowRight className="w-3 h-3 text-sauge-light" />
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
                                            <Link href={link.href} className="text-soft-light hover:text-sauge-light transition-colors flex items-center gap-2 text-sm">
                                                <MapPin className="w-3 h-3 text-sauge-light" />
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
                                Questions <span className="text-sauge-light">Fréquentes</span>
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

                {/* Widget embed */}
                <section className="py-16 bg-fond-sombre/50 border-t border-white/5">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto bg-white/5 rounded-2xl border border-white/10 p-8">
                            <h2 className="text-2xl font-heading font-bold text-white mb-3">
                                Intégrer le testeur sur votre site
                            </h2>
                            <p className="text-soft-light mb-5 text-sm leading-relaxed">
                                Vous êtes consultant SEO, agence ou éditeur de site ? Embarquez le testeur de visibilité IA en iframe sur votre propre site, gratuitement.
                                Idéal pour offrir un outil d&apos;audit GEO à vos lecteurs ou prospects.
                            </p>
                            <Link
                                href="/widget/testeur-ia"
                                className="inline-flex items-center gap-2 bg-sauge-light text-ink px-6 py-3 rounded-full font-semibold hover:bg-white transition-all"
                            >
                                Voir le widget embeddable
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-fond-sombre border-t border-white/5">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                            Besoin d&apos;une stratégie <span className="text-sauge-light">GEO</span> complète ?
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
