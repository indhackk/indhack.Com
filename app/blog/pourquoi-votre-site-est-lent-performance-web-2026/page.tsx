import { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight, Phone, CheckCircle2, XCircle, AlertTriangle, Gauge, Zap, Shield, Smartphone, Globe, TrendingUp } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AuditCTA } from "@/components/blog/AuditCTA";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Site web lent = clients perdus : comment passer de 56 à 93 sur PageSpeed",
    description: "Un site lent vous fait perdre des clients. Comparatif réel PageSpeed : 56/100 (WordPress) vs 93/100 (Next.js). Découvrez comment améliorer vos Core Web Vitals.",
    keywords: ["site internet rapide", "création site web performant", "pourquoi mon site est lent", "vitesse site web SEO", "core web vitals 2026", "création site web Nice", "performance web", "PageSpeed Insights"],
    authors: [{ name: "Indiana Aflalo" }],
    openGraph: {
        title: "Site web lent = clients perdus : comment passer de 56 à 93 sur PageSpeed",
        description: "Un site lent vous fait perdre des clients. Comparatif réel PageSpeed : 56/100 (WordPress) vs 93/100 (Next.js). Découvrez comment améliorer vos Core Web Vitals.",
        type: "article",
        publishedTime: "2026-02-17",
        authors: ["Indiana Aflalo"],
        images: [{ url: "https://indhack.com/images/blog/checklist-seo-2026.jpg", width: 1200, height: 630, alt: "Performance Web 2026 - Comparatif PageSpeed" }],
        locale: "fr_FR",
        siteName: "IndHack",
    },
    twitter: {
        card: "summary_large_image",
        title: "Site web lent = clients perdus : comment passer de 56 à 93 sur PageSpeed",
        description: "Un site lent vous fait perdre des clients. Comparatif réel PageSpeed : 56/100 vs 93/100.",
        images: ["https://indhack.com/images/blog/checklist-seo-2026.jpg"],
    },
    alternates: {
        canonical: "https://indhack.com/blog/pourquoi-votre-site-est-lent-performance-web-2026",
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
        question: "Combien coûte un site web performant ?",
        answer: "Tout dépend du projet. Un site vitrine sur-mesure coûte plus qu'un thème WordPress au départ, mais sur 3 ans le coût total est souvent équivalent voire inférieur (hébergement gratuit, pas de plugins premium, pas de maintenance sécurité lourde). Tarifs sur devis.",
    },
    {
        question: "Mon site WordPress peut-il être aussi rapide ?",
        answer: "Avec beaucoup d'optimisation (cache agressif, CDN, thème léger, plugins minimaux), un WordPress bien configuré peut atteindre 70-80 en performance mobile. Mais ça demande un effort technique constant. Un site sur-mesure atteint 90+ sans effort.",
    },
    {
        question: "C'est quoi un bon score PageSpeed ?",
        answer: "Google considère 90-100 comme « bon » (vert), 50-89 comme « moyen » (orange), et 0-49 comme « mauvais » (rouge). En mobile, visez minimum 80.",
    },
    {
        question: "La vitesse est-elle vraiment un facteur de classement Google ?",
        answer: "Oui. Depuis 2021, les Core Web Vitals sont un facteur de classement officiel. Google ne cache plus que les sites rapides ont un avantage.",
    },
    {
        question: "Pourquoi le score mobile est-il plus important ?",
        answer: "Parce que Google utilise le mobile-first indexing : c'est la version mobile de votre site qui est évaluée pour le classement, même quand quelqu'un cherche depuis un ordinateur.",
    },
    {
        question: "Combien de temps pour créer un site performant ?",
        answer: "Entre 2 et 4 semaines pour un site vitrine, 4 à 8 semaines pour un e-commerce ou un projet plus complexe.",
    },
];

export default function PerformanceWebArticlePage() {
    return (
        <>
            {/* Schema.org Article */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": "Site web lent = clients perdus : comment passer de 56 à 93 sur PageSpeed",
                        "description": "Un site lent vous fait perdre des clients. Comparatif réel PageSpeed : 56/100 (WordPress) vs 93/100 (Next.js). Découvrez comment améliorer vos Core Web Vitals.",
                        "image": {
                            "@type": "ImageObject",
                            "url": "https://indhack.com/images/blog/checklist-seo-2026.jpg",
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
                        "mainEntityOfPage": { "@type": "WebPage", "@id": "https://indhack.com/blog/pourquoi-votre-site-est-lent-performance-web-2026" },
                        "keywords": "site internet rapide, création site web performant, pourquoi mon site est lent, vitesse site web SEO, core web vitals 2026",
                        "articleSection": "Performance Web",
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

            <Breadcrumb
                items={[
                    { label: "Blog", href: "/blog" },
                    { label: "Site web lent = clients perdus", href: "/blog/pourquoi-votre-site-est-lent-performance-web-2026" },
                ]}
            />

            <main className="pt-28 pb-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <header className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-soft mb-6">
                            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg font-bold uppercase tracking-wider text-xs">
                                Performance Web
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                17 février 2026
                            </span>
                            <span className="text-soft">~12 min de lecture</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-ink mb-6 leading-tight">
                            Site web lent = clients perdus : comment passer de 56 à 93 sur PageSpeed
                        </h1>

                        <p className="lead text-xl text-soft leading-relaxed italic border-l-4 border-emerald-500 pl-6">
                            J'ai testé mon site et celui de 5 concurrents sur PageSpeed Insights. Les résultats sont édifiants.
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
                                            { id: "ce-que-google-mesure", label: "Ce que Google mesure" },
                                            { id: "le-test-comparatif", label: "Le test comparatif" },
                                            { id: "pourquoi-sites-lents", label: "Pourquoi les sites sont lents" },
                                            { id: "ce-que-je-fais-differemment", label: "Ce que je fais différemment" },
                                            { id: "impact-business", label: "L'impact sur votre business" },
                                            { id: "tester-votre-site", label: "Tester votre site" },
                                            { id: "faq", label: "FAQ" },
                                        ].map((item) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className="block text-sm py-1 border-l-2 pl-3 text-soft border-transparent hover:text-emerald-600 hover:border-emerald-600 transition-colors font-medium"
                                            >
                                                {item.label}
                                            </a>
                                        ))}
                                    </nav>
                                </div>

                                <div className="bg-ink p-6 rounded-2xl text-white">
                                    <div className="font-heading font-bold text-lg mb-4">Un site rapide ?</div>
                                    <p className="text-white/70 text-sm mb-6">
                                        Découvrez comment je crée des sites qui scorent 90+ sur Google.
                                    </p>
                                    <Link
                                        href="/creation-site-web"
                                        className="block w-full bg-emerald-500 hover:bg-emerald-400 text-white text-center py-3 rounded-xl font-bold transition-colors mb-3"
                                    >
                                        Création de site
                                    </Link>
                                    <a href="tel:0661139748" className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                                        <Phone className="w-4 h-4" />
                                        06 61 13 97 48
                                    </a>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                    <div className="font-heading font-bold text-ink mb-4">Auteur</div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-emerald-100 flex items-center justify-center">
                                            <span className="text-emerald-600 font-bold">IA</span>
                                        </div>
                                        <div>
                                            <div className="font-bold text-ink text-sm">Indiana Aflalo</div>
                                            <div className="text-xs text-soft">Consultante SEO Nice</div>
                                        </div>
                                    </div>
                                    <Link href="/a-propos" className="text-xs font-medium text-emerald-600 hover:text-ink transition-colors flex items-center gap-1">
                                        Voir mon profil <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <article className="lg:col-span-3 prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-headings:text-ink prose-headings:scroll-mt-32 prose-p:text-soft prose-li:text-soft prose-strong:text-ink prose-a:text-emerald-600 prose-blockquote:border-emerald-500 prose-blockquote:bg-gray-50 prose-blockquote:p-6 prose-blockquote:rounded-xl max-w-none">

                            {/* Introduction */}
                            <p>
                                En 2026, Google utilise la vitesse de votre site comme critère de classement. Ce n'est plus une option, c'est un fait documenté. Un site lent, c'est moins de visiteurs, moins de clients, moins de revenus.
                            </p>

                            <p>
                                <strong>Seulement 43% des sites WordPress passent les Core Web Vitals de Google</strong> (source : Search Engine Journal, données CrUX août 2025). Dit autrement : 57% des sites échouent au test minimum de performance imposé par Google.
                            </p>

                            <p>
                                Et ce n'est pas qu'une question de SEO. <strong>53% des visiteurs mobiles quittent un site qui met plus de 3 secondes à charger</strong> (source : Google/Think with Google). Chaque seconde compte, littéralement.
                            </p>

                            <p>
                                Dans cet article, je vous montre avec des données réelles pourquoi la technologie de votre site impacte directement votre chiffre d'affaires. Pas de théorie, des chiffres. Pas de promesses, des captures d'écran PageSpeed.
                            </p>

                            {/* Section 1 */}
                            <h2 id="ce-que-google-mesure">1. Ce que Google mesure (et que votre agence ne vous dit pas)</h2>

                            <p>
                                Google évalue la performance de votre site via trois métriques principales, les <strong>Core Web Vitals</strong>. Ces mesures ne sont pas optionnelles : elles influencent directement votre position dans les résultats de recherche depuis 2021.
                            </p>

                            <div className="not-prose grid md:grid-cols-3 gap-4 my-8">
                                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Gauge className="w-5 h-5 text-emerald-600" />
                                        <span className="font-bold text-ink">LCP</span>
                                    </div>
                                    <div className="text-sm text-soft mb-2">Largest Contentful Paint</div>
                                    <div className="text-xs text-emerald-600 font-medium mb-3">Google veut &lt; 2.5 secondes</div>
                                    <p className="text-sm text-soft">
                                        Le temps pour que le contenu principal s'affiche. C'est le temps entre le clic et le moment où votre visiteur voit quelque chose d'utile.
                                    </p>
                                </div>
                                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Zap className="w-5 h-5 text-emerald-600" />
                                        <span className="font-bold text-ink">INP</span>
                                    </div>
                                    <div className="text-sm text-soft mb-2">Interaction to Next Paint</div>
                                    <div className="text-xs text-emerald-600 font-medium mb-3">Google veut &lt; 200ms</div>
                                    <p className="text-sm text-soft">
                                        La réactivité quand on clique. Quand un visiteur clique sur un bouton, est-ce que ça réagit instantanément ?
                                    </p>
                                </div>
                                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Shield className="w-5 h-5 text-emerald-600" />
                                        <span className="font-bold text-ink">CLS</span>
                                    </div>
                                    <div className="text-sm text-soft mb-2">Cumulative Layout Shift</div>
                                    <div className="text-xs text-emerald-600 font-medium mb-3">Google veut &lt; 0.1</div>
                                    <p className="text-sm text-soft">
                                        La stabilité visuelle. Est-ce que le contenu saute ou bouge pendant le chargement ?
                                    </p>
                                </div>
                            </div>

                            <p>
                                Ce qui rend ces métriques redoutables : <strong>Google les mesure automatiquement</strong> via les navigateurs Chrome de vrais utilisateurs. Pas besoin de test manuel, Google sait exactement comment votre site performe dans le monde réel.
                            </p>

                            <p>
                                Vous pouvez tester votre score SEO global avec notre <Link href="/outils/audit-seo-gratuit">outil d'audit SEO gratuit</Link>. Mais pour la performance pure, rien ne vaut PageSpeed Insights de Google.
                            </p>

                            {/* Section 2 - Comparative Test */}
                            <h2 id="le-test-comparatif">2. Le test : mon site vs un concurrent — Les chiffres parlent</h2>

                            <p>
                                J'ai testé mon site et celui d'un professionnel du web des Alpes-Maritimes sur PageSpeed Insights. Ces tests ont été réalisés le 17 février 2026. Tout le monde peut les reproduire.
                            </p>

                            {/* Performance Cards */}
                            <div className="not-prose grid md:grid-cols-2 gap-6 my-8">
                                {/* IndHack Card */}
                                <div className="bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 rounded-2xl p-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                                        Next.js sur-mesure
                                    </div>
                                    <h3 className="font-heading font-bold text-ink text-lg mb-4">IndHack.com</h3>

                                    <div className="mb-4">
                                        <div className="text-xs text-soft uppercase tracking-wider mb-2">Mobile</div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">92</div>
                                                <span className="text-xs text-soft">Performance</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">96</div>
                                                <span className="text-xs text-soft">Accessibilité</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">100</div>
                                                <span className="text-xs text-soft">Bonnes pratiques</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">100</div>
                                                <span className="text-xs text-soft">SEO</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-xs text-soft uppercase tracking-wider mb-2">Desktop</div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">96</div>
                                                <span className="text-xs text-soft">Performance</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">100</div>
                                                <span className="text-xs text-soft">Accessibilité</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">100</div>
                                                <span className="text-xs text-soft">Bonnes pratiques</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">100</div>
                                                <span className="text-xs text-soft">SEO</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-emerald-200 text-xs text-soft">
                                        <strong className="text-ink">Métriques clés :</strong> FCP 1.0s | LCP 3.2s | TBT 80ms | CLS 0
                                    </div>
                                </div>

                                {/* Concurrent Card */}
                                <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-2xl p-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                                        WordPress classique
                                    </div>
                                    <h3 className="font-heading font-bold text-ink text-lg mb-4">Site concurrent (06)</h3>

                                    <div className="mb-4">
                                        <div className="text-xs text-soft uppercase tracking-wider mb-2">Mobile</div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">56</div>
                                                <span className="text-xs text-soft">Performance</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">84</div>
                                                <span className="text-xs text-soft">Accessibilité</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">96</div>
                                                <span className="text-xs text-soft">Bonnes pratiques</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">100</div>
                                                <span className="text-xs text-soft">SEO</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-xs text-soft uppercase tracking-wider mb-2">Desktop</div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">78</div>
                                                <span className="text-xs text-soft">Performance</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">84</div>
                                                <span className="text-xs text-soft">Accessibilité</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">96</div>
                                                <span className="text-xs text-soft">Bonnes pratiques</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">100</div>
                                                <span className="text-xs text-soft">SEO</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-orange-200 text-xs text-soft">
                                        <strong className="text-ink">Écart mobile :</strong> -36 points | <strong className="text-ink">Écart desktop :</strong> -18 points
                                    </div>
                                </div>
                            </div>

                            <p>
                                <strong>36 points d'écart en performance mobile.</strong> C'est la différence entre un site que Google récompense et un site que Google pénalise.
                            </p>

                            <p>
                                Le concurrent n'est pas un mauvais site — c'est un site WordPress classique, avec un thème populaire et quelques plugins. C'est la norme. <strong>Et c'est bien le problème.</strong>
                            </p>

                            <p>
                                Notez que les deux sites ont 100/100 en SEO technique de base. La différence se fait sur la performance — et c'est cette performance qui impacte le classement réel dans Google.
                            </p>

                            <p>
                                C'est exactement cette approche que j'applique pour chaque site que je crée. <Link href="/creation-site-web">Découvrez mon processus de création de site web</Link>.
                            </p>

                            {/* Section 3 */}
                            <h2 id="pourquoi-sites-lents">3. Pourquoi la plupart des sites sont lents (et ce n'est pas de votre faute)</h2>

                            <p>
                                Le problème n'est pas le contenu de votre site. C'est son <strong>architecture technique</strong>. Voici pourquoi :
                            </p>

                            <h3>Les thèmes "tout-en-un"</h3>
                            <p>
                                Divi, Elementor, Avada — ces constructeurs de pages embarquent des centaines de fonctionnalités dont vous n'utilisez que 10%. C'est comme conduire un camion pour aller acheter du pain. Chaque fonctionnalité inutilisée ajoute du code qui doit être téléchargé par vos visiteurs.
                            </p>

                            <h3>L'accumulation de plugins</h3>
                            <p>
                                Formulaire + SEO + cache + sécurité + slider + analytics + cookies = 20-30 extensions qui chargent chacune leur propre code JavaScript et CSS. Chaque plugin ajoute du poids. À 30 plugins, votre site transporte l'équivalent d'une encyclopédie à chaque visite.
                            </p>

                            <h3>L'architecture serveur traditionnelle</h3>
                            <p>
                                À chaque visite sur un site WordPress classique, le serveur reconstruit la page en interrogeant une base de données. C'est comme si un restaurant recuisait chaque plat de zéro à chaque commande, au lieu de préparer les plus demandés à l'avance.
                            </p>

                            <h3>Les coûts cachés</h3>
                            <p>
                                Hébergement WordPress correct : 15-50€/mois. Plugins premium : 50-200€/an. Maintenance sécurité (mises à jour constantes sinon failles) : temps ou argent. Sur 3 ans, ça s'additionne. Pour en savoir plus sur les vrais coûts, consultez mon article sur <Link href="/blog/cout-site-web-2026">le coût d'un site web en 2026</Link>.
                            </p>

                            <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <div className="font-bold text-ink mb-2">Statistique clé</div>
                                        <p className="text-soft text-sm">
                                            WordPress est le CMS le moins performant parmi les grandes plateformes : <strong>43% de taux de passage Core Web Vitals</strong>, contre 75% pour Shopify et 83% pour Duda (source : Search Engine Journal, données CrUX 2025).
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p>
                                <strong>Nuance importante :</strong> WordPress reste un excellent choix pour certains projets — un blog avec beaucoup de contributeurs, un site avec un budget très serré au départ. Mais pour un site vitrine professionnel qui doit convertir et bien se positionner sur Google, il existe des alternatives nettement plus performantes.
                            </p>

                            <p>
                                Votre site actuel est lent ? <Link href="/refonte-site-web">Une refonte ciblée peut tout changer</Link> sans perdre votre référencement existant.
                            </p>

                            {/* Section 4 */}
                            <h2 id="ce-que-je-fais-differemment">4. Ce que je fais différemment</h2>

                            <p>
                                Voici l'approche que j'applique pour chaque site que je développe. Pas de magie, de l'ingénierie moderne :
                            </p>

                            <div className="not-prose space-y-4 my-8">
                                {[
                                    {
                                        icon: Zap,
                                        title: "Pages pré-construites",
                                        description: "Au lieu de reconstruire chaque page à chaque visite, elles sont générées à l'avance et servies instantanément depuis un réseau mondial de serveurs (CDN). Résultat : 0.3 à 1 seconde de chargement."
                                    },
                                    {
                                        icon: Shield,
                                        title: "Zéro superflu",
                                        description: "Chaque ligne de code est écrite pour votre site. Pas de fonctionnalités inutiles qui alourdissent. Pas de thème générique avec 95% de code inutilisé."
                                    },
                                    {
                                        icon: Smartphone,
                                        title: "Images optimisées automatiquement",
                                        description: "Format nouvelle génération (WebP), redimensionnement selon l'écran, chargement différé. Sans que vous ayez quoi que ce soit à faire."
                                    },
                                    {
                                        icon: Globe,
                                        title: "SEO natif",
                                        description: "Le référencement est intégré dans la structure même du site, pas ajouté après avec un plugin. C'est mon métier de consultante SEO spécialisée en référencement naturel."
                                    },
                                    {
                                        icon: TrendingUp,
                                        title: "Hébergement quasi-gratuit",
                                        description: "Grâce à l'architecture moderne, l'hébergement coûte 0€ pour la plupart des sites vitrines. Pas de serveur à payer chaque mois."
                                    },
                                    {
                                        icon: CheckCircle2,
                                        title: "Sécurité by design",
                                        description: "Pas de base de données exposée, pas de panneau d'administration piratable, pas de plugins vulnérables. Les attaques n'ont rien à attaquer."
                                    },
                                ].map((item, index) => (
                                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-ink mb-1">{item.title}</div>
                                            <p className="text-soft text-sm">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p>
                                Tarifs sur devis — je m'adapte à chaque projet. Ce que je peux vous garantir : un rapport qualité-performance que peu d'agences peuvent égaler.
                            </p>

                            <div className="not-prose flex flex-col sm:flex-row gap-4 my-8">
                                <Link href="/creation-site-web" className="flex-1">
                                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl font-bold">
                                        Découvrir mon processus
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                                <Link href="/contact" className="flex-1">
                                    <Button variant="outline" className="w-full border-2 border-ink text-ink hover:bg-ink hover:text-white py-6 rounded-xl font-bold">
                                        Demander un devis gratuit
                                    </Button>
                                </Link>
                            </div>

                            {/* Section 5 */}
                            <h2 id="impact-business">5. L'impact sur votre business (en euros)</h2>

                            <p>
                                La vitesse n'est pas qu'une métrique technique. Elle impacte directement vos revenus :
                            </p>

                            <ul>
                                <li><strong>Chaque seconde de chargement supplémentaire réduit vos conversions de 7%</strong> (source : études Google)</li>
                                <li>Taux de rebond de 32% pour un site à 1-3 secondes, contre <strong>90% pour un site à 5+ secondes</strong></li>
                                <li>Les sites mobiles perdent 53% de leurs visiteurs au-delà de 3 secondes</li>
                            </ul>

                            <div className="not-prose bg-ink text-white rounded-2xl p-6 my-8">
                                <div className="font-heading font-bold text-lg mb-4">Exemple concret</div>
                                <p className="text-white/80 text-sm leading-relaxed">
                                    Un commerce niçois qui reçoit 1000 visiteurs par mois avec un site à 5 secondes de chargement perd potentiellement 500 visiteurs avant même d'avoir vu l'offre. Avec un site à 1 seconde, il en retient 900. <strong className="text-emerald-400">La différence se chiffre en milliers d'euros de chiffre d'affaires.</strong>
                                </p>
                            </div>

                            <p>
                                Et ce n'est pas que Google. Les moteurs de recherche IA comme ChatGPT et Perplexity ont aussi un budget de crawl limité. Un site rapide est plus facilement indexé et cité par ces nouvelles sources de trafic. <Link href="/outils/testeur-visibilite-ia">Testez gratuitement si ChatGPT peut trouver votre site</Link>.
                            </p>

                            <p>
                                Pour aller plus loin sur l'optimisation IA, consultez mon guide complet sur <Link href="/blog/geo-comment-apparaitre-chatgpt-2026">comment apparaître dans ChatGPT en 2026</Link>.
                            </p>

                            {/* Section 6 */}
                            <h2 id="tester-votre-site">6. Comment tester votre site maintenant</h2>

                            <p>
                                C'est simple et gratuit :
                            </p>

                            <ol>
                                <li>Allez sur <strong>pagespeed.web.dev</strong></li>
                                <li>Entrez l'URL de votre site</li>
                                <li>Regardez le <strong>score mobile</strong> — c'est celui qui compte le plus (Google utilise le mobile-first indexing)</li>
                            </ol>

                            <div className="not-prose grid md:grid-cols-3 gap-4 my-8">
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-red-600 mb-1">0-49</div>
                                    <div className="text-sm text-soft">Score faible</div>
                                    <div className="text-xs text-red-600 mt-2">Votre site vous coûte des clients</div>
                                </div>
                                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-orange-600 mb-1">50-89</div>
                                    <div className="text-sm text-soft">Peut mieux faire</div>
                                    <div className="text-xs text-orange-600 mt-2">Des optimisations sont possibles</div>
                                </div>
                                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-emerald-600 mb-1">90-100</div>
                                    <div className="text-sm text-soft">Excellent</div>
                                    <div className="text-xs text-emerald-600 mt-2">Vous faites partie des meilleurs</div>
                                </div>
                            </div>

                            <p>
                                Pour un diagnostic SEO plus complet qui va au-delà de la performance, utilisez notre <Link href="/outils/audit-seo-gratuit">outil d'audit SEO gratuit</Link>. Et si vous êtes dans la région, je propose aussi un <Link href="/audit-seo">audit SEO professionnel</Link> avec recommandations personnalisées. Mon expertise couvre l'ensemble du <Link href="/referencement-naturel">référencement naturel</Link>, de l'audit technique à l'optimisation de contenu.
                            </p>

                            <p>
                                <strong>Vous voulez un site conçu pour scorer 90+ dès le départ ?</strong> <Link href="/creation-site-web">Parlons de votre projet</Link>. En tant que <Link href="/consultant-seo-nice">consultante SEO à Nice</Link>, j'accompagne les entreprises locales et nationales vers une présence web performante.
                            </p>

                            {/* FAQ Section */}
                            <h2 id="faq">7. Questions fréquentes</h2>

                            <div className="not-prose space-y-4 my-8">
                                {FAQ_ITEMS.map((item, index) => (
                                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="bg-gray-50 px-6 py-4">
                                            <h3 className="font-bold text-ink">{item.question}</h3>
                                        </div>
                                        <div className="px-6 py-4">
                                            <p className="text-soft text-sm">{item.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h3>Pour aller plus loin</h3>

                            <ul>
                                <li><Link href="/blog/comment-creer-site-visible-google">Comment créer un site visible sur Google</Link></li>
                                <li><Link href="/blog/refonte-site-web-sans-perdre-seo">Refaire son site sans perdre son référencement</Link></li>
                                <li><Link href="/blog/audit-seo-erreurs-qui-coutent-cher">Les erreurs d'audit SEO qui coûtent cher</Link></li>
                                <li><Link href="/blog/checklist-seo-2026">Checklist SEO 2026 : la liste complète</Link></li>
                            </ul>

                        </article>
                    </div>

                    {/* CTA Final */}
                    <div className="mt-16 bg-gradient-to-br from-ink to-ink/90 rounded-3xl p-8 md:p-12 text-white text-center">
                        <h2 className="font-heading font-bold text-2xl md:text-4xl mb-4">
                            Vous voulez un site qui score 90+ sur Google ?
                        </h2>
                        <p className="text-white/70 max-w-2xl mx-auto mb-8">
                            Discutons de votre projet. Audit gratuit, devis transparent, résultats mesurables.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button className="bg-white text-ink hover:bg-emerald-500 hover:text-white px-8 py-6 rounded-full font-bold text-lg">
                                    Demander un devis gratuit
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/creation-site-web">
                                <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white hover:text-ink px-8 py-6 rounded-full font-bold text-lg">
                                    Découvrir mes services
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Related Articles */}
                    <div className="mt-16">
                        <h3 className="font-heading font-bold text-xl text-ink mb-6">Articles complémentaires</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { title: "Combien coûte un site web en 2026 ?", href: "/blog/cout-site-web-2026", category: "Création web" },
                                { title: "Comment créer un site visible sur Google", href: "/blog/comment-creer-site-visible-google", category: "SEO" },
                                { title: "GEO : Apparaître dans ChatGPT en 2026", href: "/blog/geo-comment-apparaitre-chatgpt-2026", category: "IA & SEO" },
                            ].map((article, index) => (
                                <Link key={index} href={article.href} className="group block p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-colors">
                                    <span className="text-xs text-emerald-600 font-medium">{article.category}</span>
                                    <h4 className="font-bold text-ink mt-2 group-hover:text-emerald-600 transition-colors">{article.title}</h4>
                                    <span className="text-sm text-emerald-600 flex items-center gap-1 mt-3">
                                        Lire <ArrowRight className="w-3 h-3" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm text-soft font-medium">Tags :</span>
                            {["Performance web", "Core Web Vitals", "PageSpeed", "Création site web", "SEO technique", "WordPress vs Next.js"].map((tag, index) => (
                                <span key={index} className="bg-gray-100 text-soft text-xs px-3 py-1 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}
