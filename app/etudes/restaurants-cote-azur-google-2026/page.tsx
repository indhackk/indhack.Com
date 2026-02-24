import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, MapPin, Star, AlertTriangle, CheckCircle, ExternalLink, Globe, MessageSquare, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "30% des meilleurs restaurants Google sans site web | Étude Côte d'Azur 2026",
    description: "Étude exclusive : analyse de 308 restaurants du Top Google sur la Côte d'Azur. 30% sans site web, 13% avec des profils suspects. Données vérifiées, méthodologie transparente.",
    keywords: ["restaurants Côte d'Azur", "Google My Business", "SEO local restauration", "visibilité Google restaurants", "étude restauration 2026", "Nice", "Cannes", "Monaco"],
    alternates: {
        canonical: "https://indhack.com/etudes/restaurants-cote-azur-google-2026"
    },
    openGraph: {
        title: "30% des meilleurs restaurants Google sans site web | Côte d'Azur",
        description: "Même les restaurants les plus visibles de la Côte d'Azur ont des failles critiques. Étude exclusive sur 308 établissements.",
        url: "https://indhack.com/etudes/restaurants-cote-azur-google-2026",
        type: "article",
        publishedTime: "2026-02-24",
        authors: ["Indiana Aflalo"],
        images: [{
            url: "https://indhack.com/images/etudes/restaurants-cote-azur-2026-og.png",
            width: 1200,
            height: 630,
            alt: "Infographie : failles des meilleurs restaurants Google de la Côte d'Azur"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "30% des meilleurs restaurants Google sans site web",
        description: "Étude exclusive sur 308 restaurants de la Côte d'Azur. Données vérifiées.",
    }
};

// Données de l'étude - CORRIGÉES
const STUDY_DATA = {
    date: "24 février 2026",
    totalAnalyzed: 308,
    citiesCount: 10,
    // Stats clés
    noRealWebsite: { count: 92, pct: 29.9 },
    noWebsiteAtAll: { count: 65, pct: 21.1 },
    suspiciousProfiles: { count: 41, pct: 13.3, criteria: ">=4.5★ avec <10 avis" },
    verySuspicious: { count: 18, pct: 5.8, criteria: ">=4.8★ avec <20 avis" },
    lowEngagement: { count: 98, pct: 31.8, criteria: "<50 avis" },
    lowRating: { count: 16, pct: 5.2, criteria: "<4★" },
    avgRating: 4.55,
    avgReviews: 302,
    medianReviews: 222,
    cities: [
        { name: "Menton", total: 28, noWebsite: 12, pctNoWebsite: 43, avgRating: 4.61, suspectProfiles: 1 },
        { name: "Fréjus", total: 28, noWebsite: 11, pctNoWebsite: 39, avgRating: 4.64, suspectProfiles: 1 },
        { name: "Grasse", total: 30, noWebsite: 8, pctNoWebsite: 27, avgRating: 4.61, suspectProfiles: 1 },
        { name: "Cagnes-sur-Mer", total: 31, noWebsite: 8, pctNoWebsite: 26, avgRating: 4.55, suspectProfiles: 2 },
        { name: "Mandelieu", total: 30, noWebsite: 7, pctNoWebsite: 23, avgRating: 4.53, suspectProfiles: 0 },
        { name: "Antibes", total: 36, noWebsite: 8, pctNoWebsite: 22, avgRating: 4.58, suspectProfiles: 3 },
        { name: "Saint-Tropez", total: 31, noWebsite: 6, pctNoWebsite: 19, avgRating: 4.23, suspectProfiles: 0 },
        { name: "Monaco", total: 26, noWebsite: 3, pctNoWebsite: 12, avgRating: 4.58, suspectProfiles: 0 },
        { name: "Nice", total: 35, noWebsite: 1, pctNoWebsite: 3, avgRating: 4.65, suspectProfiles: 9 },
        { name: "Cannes", total: 33, noWebsite: 1, pctNoWebsite: 3, avgRating: 4.52, suspectProfiles: 1 },
    ]
};

// Composant Infographie SVG - CORRIGÉE
function Infographic() {
    return (
        <div className="bg-ink rounded-3xl p-8 my-12">
            <svg viewBox="0 0 800 650" className="w-full h-auto" aria-label="Infographie : failles des meilleurs restaurants Google de la Côte d'Azur">
                {/* Background */}
                <rect width="800" height="650" fill="#2A3830" rx="24"/>

                {/* Title */}
                <text x="400" y="45" textAnchor="middle" fill="#FAFBFA" fontSize="24" fontWeight="bold" fontFamily="system-ui">
                    Les failles des restaurants les plus visibles
                </text>
                <text x="400" y="72" textAnchor="middle" fill="#8FBFAA" fontSize="16" fontFamily="system-ui">
                    Côte d'Azur — Analyse du Top Google — Février 2026
                </text>

                {/* Main stats - 3 columns */}
                <g transform="translate(50, 110)">
                    {/* Stat 1: Sans site web */}
                    <g transform="translate(0, 0)">
                        <rect width="220" height="140" fill="#3D4D46" rx="16"/>
                        <text x="110" y="45" textAnchor="middle" fill="#D4A853" fontSize="48" fontWeight="bold" fontFamily="system-ui">30%</text>
                        <text x="110" y="75" textAnchor="middle" fill="#FAFBFA" fontSize="14" fontFamily="system-ui">sans vrai site web</text>
                        <text x="110" y="95" textAnchor="middle" fill="#8FBFAA" fontSize="11" fontFamily="system-ui">(pas de site ou juste</text>
                        <text x="110" y="110" textAnchor="middle" fill="#8FBFAA" fontSize="11" fontFamily="system-ui">Facebook/Instagram)</text>
                        <circle cx="30" cy="30" r="18" fill="#D4A853" fillOpacity="0.2"/>
                        <text x="30" y="35" textAnchor="middle" fill="#D4A853" fontSize="16">🌐</text>
                    </g>

                    {/* Stat 2: Profils suspects */}
                    <g transform="translate(240, 0)">
                        <rect width="220" height="140" fill="#3D4D46" rx="16"/>
                        <text x="110" y="45" textAnchor="middle" fill="#D4A853" fontSize="48" fontWeight="bold" fontFamily="system-ui">13%</text>
                        <text x="110" y="75" textAnchor="middle" fill="#FAFBFA" fontSize="14" fontFamily="system-ui">profils « suspects »</text>
                        <text x="110" y="95" textAnchor="middle" fill="#8FBFAA" fontSize="11" fontFamily="system-ui">(note ≥4.5★ avec</text>
                        <text x="110" y="110" textAnchor="middle" fill="#8FBFAA" fontSize="11" fontFamily="system-ui">moins de 10 avis)</text>
                        <circle cx="30" cy="30" r="18" fill="#D4A853" fillOpacity="0.2"/>
                        <text x="30" y="35" textAnchor="middle" fill="#D4A853" fontSize="16">⚠️</text>
                    </g>

                    {/* Stat 3: Faible engagement */}
                    <g transform="translate(480, 0)">
                        <rect width="220" height="140" fill="#3D4D46" rx="16"/>
                        <text x="110" y="45" textAnchor="middle" fill="#D4A853" fontSize="48" fontWeight="bold" fontFamily="system-ui">32%</text>
                        <text x="110" y="75" textAnchor="middle" fill="#FAFBFA" fontSize="14" fontFamily="system-ui">faible engagement</text>
                        <text x="110" y="95" textAnchor="middle" fill="#8FBFAA" fontSize="11" fontFamily="system-ui">(moins de 50 avis malgré</text>
                        <text x="110" y="110" textAnchor="middle" fill="#8FBFAA" fontSize="11" fontFamily="system-ui">leur visibilité Top Google)</text>
                        <circle cx="30" cy="30" r="18" fill="#D4A853" fillOpacity="0.2"/>
                        <text x="30" y="35" textAnchor="middle" fill="#D4A853" fontSize="16">💬</text>
                    </g>
                </g>

                {/* Sub-headline */}
                <text x="400" y="290" textAnchor="middle" fill="#FAFBFA" fontSize="13" fontFamily="system-ui">
                    Analyse de 308 restaurants apparaissant dans le Top Google pour « restaurant + ville »
                </text>

                {/* City breakdown - bars */}
                <g transform="translate(50, 320)">
                    <text x="0" y="0" fill="#8FBFAA" fontSize="12" fontFamily="system-ui" fontWeight="bold">TAUX SANS SITE WEB PAR VILLE</text>

                    {/* Menton - 43% */}
                    <text x="0" y="35" fill="#FAFBFA" fontSize="12" fontFamily="system-ui">Menton</text>
                    <rect x="100" y="22" width="300" height="18" fill="#3D4D46" rx="4"/>
                    <rect x="100" y="22" width="129" height="18" fill="#D4A853" rx="4"/>
                    <text x="410" y="36" fill="#FAFBFA" fontSize="12" fontFamily="system-ui" fontWeight="bold">43%</text>

                    {/* Fréjus - 39% */}
                    <text x="0" y="60" fill="#FAFBFA" fontSize="12" fontFamily="system-ui">Fréjus</text>
                    <rect x="100" y="47" width="300" height="18" fill="#3D4D46" rx="4"/>
                    <rect x="100" y="47" width="117" height="18" fill="#D4A853" rx="4"/>
                    <text x="410" y="61" fill="#FAFBFA" fontSize="12" fontFamily="system-ui" fontWeight="bold">39%</text>

                    {/* Grasse - 27% */}
                    <text x="0" y="85" fill="#FAFBFA" fontSize="12" fontFamily="system-ui">Grasse</text>
                    <rect x="100" y="72" width="300" height="18" fill="#3D4D46" rx="4"/>
                    <rect x="100" y="72" width="81" height="18" fill="#D4A853" rx="4"/>
                    <text x="410" y="86" fill="#FAFBFA" fontSize="12" fontFamily="system-ui" fontWeight="bold">27%</text>

                    {/* Nice - 3% */}
                    <text x="0" y="110" fill="#FAFBFA" fontSize="12" fontFamily="system-ui">Nice</text>
                    <rect x="100" y="97" width="300" height="18" fill="#3D4D46" rx="4"/>
                    <rect x="100" y="97" width="9" height="18" fill="#2E5E4E" rx="4"/>
                    <text x="410" y="111" fill="#FAFBFA" fontSize="12" fontFamily="system-ui">3%</text>
                </g>

                {/* Right side - Paradoxe Saint-Tropez */}
                <g transform="translate(480, 320)">
                    <text x="0" y="0" fill="#8FBFAA" fontSize="12" fontFamily="system-ui" fontWeight="bold">LE PARADOXE SAINT-TROPEZ</text>

                    <rect x="0" y="20" width="270" height="110" fill="#3D4D46" rx="12"/>

                    <text x="135" y="55" textAnchor="middle" fill="#D4A853" fontSize="36" fontWeight="bold" fontFamily="system-ui">4.23★</text>
                    <text x="135" y="80" textAnchor="middle" fill="#FAFBFA" fontSize="13" fontFamily="system-ui">Note moyenne la plus basse</text>
                    <text x="135" y="100" textAnchor="middle" fill="#8FBFAA" fontSize="11" fontFamily="system-ui">malgré le standing premium</text>
                    <text x="135" y="118" textAnchor="middle" fill="#8FBFAA" fontSize="10" fontFamily="system-ui">(Nice : 4.65★ | Fréjus : 4.64★)</text>
                </g>

                {/* Bottom stats */}
                <g transform="translate(50, 480)">
                    <rect x="0" y="0" width="700" height="70" fill="#3D4D46" rx="12"/>

                    <text x="90" y="28" textAnchor="middle" fill="#8FBFAA" fontSize="10" fontFamily="system-ui">RESTAURANTS</text>
                    <text x="90" y="50" textAnchor="middle" fill="#FAFBFA" fontSize="22" fontWeight="bold" fontFamily="system-ui">308</text>

                    <line x1="175" y1="15" x2="175" y2="55" stroke="#8FBFAA" strokeOpacity="0.3" strokeWidth="1"/>

                    <text x="265" y="28" textAnchor="middle" fill="#8FBFAA" fontSize="10" fontFamily="system-ui">VILLES</text>
                    <text x="265" y="50" textAnchor="middle" fill="#FAFBFA" fontSize="22" fontWeight="bold" fontFamily="system-ui">10</text>

                    <line x1="350" y1="15" x2="350" y2="55" stroke="#8FBFAA" strokeOpacity="0.3" strokeWidth="1"/>

                    <text x="440" y="28" textAnchor="middle" fill="#8FBFAA" fontSize="10" fontFamily="system-ui">NOTE MOYENNE</text>
                    <text x="440" y="50" textAnchor="middle" fill="#FAFBFA" fontSize="22" fontWeight="bold" fontFamily="system-ui">4.55/5</text>

                    <line x1="525" y1="15" x2="525" y2="55" stroke="#8FBFAA" strokeOpacity="0.3" strokeWidth="1"/>

                    <text x="615" y="28" textAnchor="middle" fill="#8FBFAA" fontSize="10" fontFamily="system-ui">AVIS MÉDIAN</text>
                    <text x="615" y="50" textAnchor="middle" fill="#FAFBFA" fontSize="22" fontWeight="bold" fontFamily="system-ui">222</text>
                </g>

                {/* Methodology note */}
                <text x="400" y="585" textAnchor="middle" fill="#8FBFAA" fontSize="10" fontFamily="system-ui">
                    Données : Google Places API via Serper — Requêtes « restaurant/pizzeria/brasserie + ville »
                </text>
                <text x="400" y="600" textAnchor="middle" fill="#8FBFAA" fontSize="10" fontFamily="system-ui">
                    Analyse des restaurants apparaissant dans les résultats de recherche Google
                </text>

                {/* Source */}
                <text x="50" y="630" fill="#8FBFAA" fontSize="10" fontFamily="system-ui">
                    Source : IndHack — Février 2026
                </text>

                {/* Logo/watermark */}
                <text x="750" y="630" textAnchor="end" fill="#2E5E4E" fontSize="14" fontWeight="bold" fontFamily="system-ui">
                    indhack.com
                </text>
            </svg>
        </div>
    );
}

export default function EtudeRestaurantsCoteAzur() {
    return (
        <>
            {/* Schema.org NewsArticle */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "NewsArticle",
                        "headline": "30% des restaurants les plus visibles de la Côte d'Azur n'ont pas de site web : étude 2026",
                        "description": "Analyse des failles des 308 restaurants apparaissant dans le Top Google sur 10 villes de la Côte d'Azur. 30% sans site web, 13% de profils suspects.",
                        "image": "https://indhack.com/images/etudes/restaurants-cote-azur-2026-og.png",
                        "datePublished": "2026-02-24",
                        "dateModified": "2026-02-24",
                        "author": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "url": "https://indhack.com/a-propos",
                            "jobTitle": "Consultante SEO"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "IndHack",
                            "url": "https://indhack.com",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://indhack.com/logo.png"
                            }
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "https://indhack.com/etudes/restaurants-cote-azur-google-2026"
                        }
                    })
                }}
            />

            {/* Schema.org Dataset */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Dataset",
                        "name": "Failles GMB des restaurants de la Côte d'Azur 2026",
                        "description": "Analyse des failles des 308 restaurants les plus visibles sur Google dans 10 villes de la Côte d'Azur (Nice, Cannes, Monaco, Antibes, etc.)",
                        "url": "https://indhack.com/etudes/restaurants-cote-azur-google-2026",
                        "creator": {
                            "@type": "Person",
                            "name": "Indiana Aflalo"
                        },
                        "datePublished": "2026-02-24",
                        "spatialCoverage": {
                            "@type": "Place",
                            "name": "Côte d'Azur, France"
                        },
                        "temporalCoverage": "2026-02",
                        "variableMeasured": [
                            "Présence site web",
                            "Note moyenne Google",
                            "Nombre d'avis",
                            "Profils suspects"
                        ]
                    })
                }}
            />

            <main className="bg-white min-h-screen">
                {/* Hero */}
                <section className="bg-ink text-white pt-32 pb-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-2 text-sauge text-sm font-bold mb-4">
                                <MapPin className="w-4 h-4" />
                                ÉTUDE EXCLUSIVE — FÉVRIER 2026
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                                <span className="text-accent">30%</span> des meilleurs restaurants Google{" "}
                                <span className="text-sauge">n'ont pas de site web</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-8 leading-relaxed">
                                Même les restaurants les plus visibles de la Côte d'Azur ont des failles critiques.
                                Analyse de <strong className="text-white">308 établissements</strong> du Top Google
                                sur 10 villes azuréennes. Données vérifiées, méthodologie transparente.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="#methodologie">
                                    <Button className="bg-sauge text-white hover:bg-sauge-light rounded-full px-6 py-5">
                                        Voir la méthodologie
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </a>
                                <a href="#donnees">
                                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-6 py-5">
                                        <Download className="mr-2 w-4 h-4" />
                                        Télécharger les données
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Stats */}
                <section className="py-12 bg-gray-50 border-b">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                                <p className="text-4xl font-bold text-accent mb-1">30%</p>
                                <p className="text-sm text-soft">Sans vrai site web</p>
                            </div>
                            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                                <p className="text-4xl font-bold text-accent mb-1">13%</p>
                                <p className="text-sm text-soft">Profils « suspects »</p>
                            </div>
                            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                                <p className="text-4xl font-bold text-ink mb-1">308</p>
                                <p className="text-sm text-soft">Restaurants analysés</p>
                            </div>
                            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                                <p className="text-4xl font-bold text-sauge mb-1">10</p>
                                <p className="text-sm text-soft">Villes étudiées</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Infographic */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-heading font-bold text-ink mb-4 text-center">
                                L'infographie complète
                            </h2>
                            <p className="text-soft text-center mb-8">
                                Partagez librement cette infographie en citant la source (indhack.com)
                            </p>
                            <Infographic />
                        </div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto prose prose-lg">
                            <h2 className="text-3xl font-heading font-bold text-ink mb-6">
                                Les failles des « meilleurs » restaurants Google
                            </h2>

                            <p className="text-soft leading-relaxed">
                                Cette étude, réalisée le <strong className="text-ink">24 février 2026</strong>, analyse
                                les <strong className="text-ink">308 restaurants</strong> qui apparaissent dans les résultats
                                Google pour les requêtes « restaurant », « pizzeria », « brasserie » + nom de ville
                                sur la Côte d'Azur.
                            </p>

                            <p className="text-soft leading-relaxed">
                                Ces établissements sont <strong className="text-ink">par définition les plus visibles</strong> :
                                ce sont ceux que Google choisit d'afficher aux utilisateurs. Et pourtant, même parmi cette élite,
                                les failles sont nombreuses.
                            </p>

                            <div className="bg-white rounded-2xl p-6 border border-gray-100 my-8">
                                <h3 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-accent" />
                                    Les 3 failles critiques identifiées
                                </h3>
                                <ul className="space-y-4 text-soft">
                                    <li className="flex items-start gap-3">
                                        <Globe className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <strong className="text-ink">30% sans vrai site web</strong>
                                            <p className="text-sm mt-1">92 restaurants sur 308 n'ont pas de site web, ou uniquement une page Facebook/Instagram. Ils sont 1ers sur Google... mais refusent de convertir.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Star className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <strong className="text-ink">13% de profils « suspects »</strong>
                                            <p className="text-sm mt-1">41 restaurants affichent une note ≥4.5★ avec moins de 10 avis. Des profils qui semblent trop beaux pour être vrais.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <MessageSquare className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <strong className="text-ink">32% avec un engagement faible</strong>
                                            <p className="text-sm mt-1">98 restaurants ont moins de 50 avis, malgré leur visibilité dans le Top Google. Un manque de stratégie de collecte d'avis évident.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <h3 className="text-2xl font-heading font-bold text-ink mt-12 mb-4">
                                Le champion du « sans site web » : Menton (43%)
                            </h3>
                            <p className="text-soft leading-relaxed">
                                <strong className="text-ink">Menton</strong> détient le record : <strong className="text-ink">43% des restaurants
                                visibles</strong> sur Google n'ont pas de site web. Suivi de près par Fréjus (39%)
                                et Grasse (27%).
                            </p>
                            <p className="text-soft leading-relaxed">
                                À l'inverse, <strong className="text-ink">Nice et Cannes</strong> font figure de bons élèves avec
                                seulement 3% de restaurants sans site web parmi les plus visibles. Ces établissements ont compris
                                l'importance d'un{" "}
                                <Link href="/creation-site-web" className="text-sauge hover:underline">site web professionnel</Link>{" "}
                                pour convertir leur visibilité Google en réservations.
                            </p>

                            <h3 className="text-2xl font-heading font-bold text-ink mt-12 mb-4">
                                Le paradoxe Saint-Tropez : note la plus basse malgré le standing
                            </h3>
                            <p className="text-soft leading-relaxed">
                                Fait surprenant : <strong className="text-ink">Saint-Tropez</strong>, destination premium par excellence,
                                affiche la <strong className="text-ink">note moyenne la plus basse</strong> de l'étude (<strong className="text-accent">4.23/5</strong>)
                                parmi les restaurants visibles sur Google. À titre de comparaison, Nice atteint 4.65/5
                                et Fréjus 4.64/5.
                            </p>
                            <p className="text-soft leading-relaxed">
                                Cette donnée suggère que les établissements haut de gamme de Saint-Tropez négligent
                                leur{" "}
                                <Link href="/blog/google-business-profile-guide-complet" className="text-sauge hover:underline">
                                    fiche Google Business Profile
                                </Link>, ou que les attentes élevées des clients génèrent davantage d'avis critiques.
                                Dans tous les cas, une{" "}
                                <Link href="/blog/google-maps-voler-clients-concurrents" className="text-sauge hover:underline">
                                    stratégie d'acquisition d'avis
                                </Link>{" "}
                                serait bénéfique.
                            </p>

                            <h3 className="text-2xl font-heading font-bold text-ink mt-12 mb-4">
                                Nice : 9 profils « trop beaux pour être vrais »
                            </h3>
                            <p className="text-soft leading-relaxed">
                                Si Nice excelle sur le site web, la ville concentre le plus grand nombre de
                                <strong className="text-ink"> profils suspects</strong> : 9 restaurants affichent une note ≥4.8★
                                avec moins de 20 avis. Des exemples concrets :
                            </p>
                            <ul className="text-soft list-disc list-inside my-4 space-y-1">
                                <li><strong className="text-ink">L'Alchimie restaurant Nice</strong> : 4.9★ avec 1 seul avis</li>
                                <li><strong className="text-ink">Le Bouchon</strong> : 4.9★ avec 1 seul avis</li>
                                <li><strong className="text-ink">Le Panier</strong> : 4.8★ avec 2 avis</li>
                                <li><strong className="text-ink">Prima Volta</strong> : 4.9★ avec 2 avis</li>
                            </ul>
                            <p className="text-soft leading-relaxed">
                                Ces profils ne sont pas nécessairement frauduleux — il peut s'agir de nouveaux établissements.
                                Mais ils illustrent un problème de crédibilité : une note quasi parfaite sans volume
                                d'avis n'inspire pas confiance aux consommateurs avertis.
                            </p>

                            <h3 className="text-2xl font-heading font-bold text-ink mt-12 mb-4">
                                Détail par ville
                            </h3>

                            <div className="overflow-x-auto my-8">
                                <table className="w-full text-sm">
                                    <thead className="bg-ink text-white">
                                        <tr>
                                            <th className="p-3 text-left rounded-tl-xl">Ville</th>
                                            <th className="p-3 text-center">Restaurants</th>
                                            <th className="p-3 text-center">Sans site web</th>
                                            <th className="p-3 text-center">Note moy.</th>
                                            <th className="p-3 text-center rounded-tr-xl">Profils suspects</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {STUDY_DATA.cities.map((city, index) => (
                                            <tr key={city.name} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                                <td className="p-3 font-medium text-ink">{city.name}</td>
                                                <td className="p-3 text-center text-soft">{city.total}</td>
                                                <td className="p-3 text-center">
                                                    <span className={city.pctNoWebsite >= 30 ? "text-accent font-bold" : "text-soft"}>
                                                        {city.pctNoWebsite}%
                                                    </span>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <span className={city.avgRating < 4.3 ? "text-accent font-bold" : "text-soft"}>
                                                        {city.avgRating}/5
                                                    </span>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <span className={city.suspectProfiles >= 5 ? "text-accent font-bold" : "text-soft"}>
                                                        {city.suspectProfiles}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div id="methodologie" className="bg-sauge/10 rounded-2xl p-6 border border-sauge/20 my-8">
                                <h3 className="text-xl font-bold text-ink mb-4">
                                    Méthodologie de l'étude
                                </h3>
                                <ol className="space-y-3 text-soft list-decimal list-inside">
                                    <li>
                                        <strong className="text-ink">Source des données :</strong> Google Places API via Serper.dev
                                    </li>
                                    <li>
                                        <strong className="text-ink">Requêtes effectuées :</strong> « restaurant », « restaurant gastronomique », « pizzeria », « brasserie » + nom de chaque ville
                                    </li>
                                    <li>
                                        <strong className="text-ink">Échantillon :</strong> Les 308 restaurants uniques apparaissant dans les résultats Google Places pour ces requêtes
                                    </li>
                                    <li>
                                        <strong className="text-ink">Période de collecte :</strong> 24 février 2026
                                    </li>
                                    <li>
                                        <strong className="text-ink">Critères d'analyse :</strong>
                                        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                            <li>Présence d'un site web (hors Facebook/Instagram/plateformes)</li>
                                            <li>Ratio note/nombre d'avis (profils suspects)</li>
                                            <li>Volume d'avis (engagement)</li>
                                        </ul>
                                    </li>
                                </ol>
                                <p className="text-sm text-soft mt-4 italic">
                                    <strong>Note importante :</strong> Cette étude analyse uniquement les restaurants
                                    qui apparaissent dans les résultats Google. Elle ne prétend pas mesurer un « taux d'invisibilité »
                                    global, mais les failles des établissements les plus visibles.
                                </p>
                            </div>

                            <h3 className="text-2xl font-heading font-bold text-ink mt-12 mb-4">
                                Ce que ces chiffres révèlent
                            </h3>
                            <p className="text-soft leading-relaxed">
                                Si les restaurants les <strong className="text-ink">plus visibles</strong> de la Côte d'Azur
                                présentent autant de failles, que peut-on en déduire des milliers d'établissements
                                qui n'apparaissent même pas dans les résultats Google ?
                            </p>
                            <p className="text-soft leading-relaxed">
                                Ces données montrent un <strong className="text-ink">retard digital significatif</strong> dans
                                le secteur de la restauration azuréenne, même parmi les établissements qui ont réussi
                                à se positionner sur Google.
                            </p>

                            <div id="donnees" className="bg-ink text-white rounded-2xl p-8 my-12">
                                <h3 className="text-2xl font-bold mb-4">
                                    Télécharger les données
                                </h3>
                                <p className="text-white/70 mb-6">
                                    Les données complètes de cette étude sont disponibles en téléchargement libre.
                                    Vous pouvez les réutiliser en citant la source (IndHack).
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href="/data/gmb-study-cote-azur-2026.json"
                                        download
                                        className="inline-flex items-center gap-2 bg-sauge text-white px-6 py-3 rounded-full font-bold hover:bg-sauge-light transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        Données complètes (JSON)
                                    </a>
                                    <a
                                        href="/data/gmb-study-key-stats.json"
                                        download
                                        className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        Statistiques clés (JSON)
                                    </a>
                                </div>
                            </div>

                            <h3 className="text-2xl font-heading font-bold text-ink mt-12 mb-4">
                                Recommandations pour les restaurateurs
                            </h3>
                            <p className="text-soft leading-relaxed">
                                Même si votre restaurant apparaît dans les résultats Google, vérifiez ces points :
                            </p>
                            <ol className="space-y-3 text-soft list-decimal list-inside my-4">
                                <li><strong className="text-ink">Avoir un vrai site web</strong> — pas juste une page Facebook. Un{" "}
                                    <Link href="/creation-site-web" className="text-sauge hover:underline">site dédié</Link>{" "}
                                    inspire confiance et permet de convertir.</li>
                                <li><strong className="text-ink">Viser 50+ avis</strong> — en dessous, votre profil manque de crédibilité.{" "}
                                    <Link href="/blog/google-maps-voler-clients-concurrents" className="text-sauge hover:underline">
                                        Sollicitez activement vos clients satisfaits
                                    </Link>.</li>
                                <li><strong className="text-ink">Répondre à TOUS les avis</strong> — positifs comme négatifs. Consultez notre{" "}
                                    <Link href="/blog/google-business-profile-guide-complet" className="text-sauge hover:underline">
                                        guide Google Business Profile
                                    </Link>{" "}pour les bonnes pratiques.</li>
                                <li><strong className="text-ink">Éviter le « 5 étoiles avec 2 avis »</strong> — privilégiez un volume d'avis réaliste à une note artificiellement parfaite.</li>
                            </ol>
                            <p className="text-soft leading-relaxed">
                                Pour un accompagnement personnalisé, consultez notre{" "}
                                <Link href="/seo-local" className="text-sauge hover:underline">expertise en SEO local</Link>{" "}
                                ou testez votre visibilité avec notre{" "}
                                <Link href="/outils/simulateur-visibilite-locale" className="text-sauge hover:underline">
                                    simulateur de visibilité locale
                                </Link>.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Pour aller plus loin */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                                Pour aller plus loin
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <Link href="/blog/google-business-profile-guide-complet" className="group">
                                    <div className="bg-gray-50 rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                                        <div className="text-xs font-bold text-sauge mb-2">GUIDE</div>
                                        <h3 className="font-bold text-ink group-hover:text-sauge transition-colors mb-2">
                                            Google Business Profile : le guide complet 2026
                                        </h3>
                                        <p className="text-soft text-sm">
                                            Optimisez votre fiche pour apparaître dans le top Google Maps.
                                        </p>
                                    </div>
                                </Link>
                                <Link href="/blog/google-maps-voler-clients-concurrents" className="group">
                                    <div className="bg-gray-50 rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                                        <div className="text-xs font-bold text-sauge mb-2">STRATÉGIE</div>
                                        <h3 className="font-bold text-ink group-hover:text-sauge transition-colors mb-2">
                                            Comment voler les clients de vos concurrents sur Google Maps
                                        </h3>
                                        <p className="text-soft text-sm">
                                            Techniques pour dominer votre zone de chalandise locale.
                                        </p>
                                    </div>
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="group">
                                    <div className="bg-gray-50 rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                                        <div className="text-xs font-bold text-accent mb-2">OUTIL GRATUIT</div>
                                        <h3 className="font-bold text-ink group-hover:text-sauge transition-colors mb-2">
                                            Audit SEO gratuit de votre site
                                        </h3>
                                        <p className="text-soft text-sm">
                                            Analysez les performances de votre site en 30 secondes.
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sources */}
                <section className="py-12 bg-white border-t">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-xl font-heading font-bold text-ink mb-4">Sources</h3>
                            <ul className="space-y-2 text-soft text-sm">
                                <li className="flex items-start gap-2">
                                    <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>Google Places API via Serper.dev — Données collectées le 24/02/2026</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>Analyse réalisée par IndHack — Consultante SEO Côte d'Azur</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-ink text-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-heading font-bold mb-4">
                                Votre restaurant a-t-il ces failles ?
                            </h2>
                            <p className="text-white/70 mb-8">
                                Testez gratuitement votre visibilité locale et identifiez vos points d'amélioration.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/outils/simulateur-visibilite-locale">
                                    <Button className="bg-sauge text-white hover:bg-sauge-light rounded-full px-8 py-6 font-bold">
                                        Tester ma visibilité locale
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                                <Link href="/seo-local">
                                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 font-bold">
                                        Découvrir le SEO local
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Author */}
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-sauge rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    IA
                                </div>
                                <div>
                                    <p className="font-bold text-ink">Indiana Aflalo</p>
                                    <p className="text-soft text-sm">Consultante SEO Freelance — Spécialiste SEO local Côte d'Azur</p>
                                    <Link href="/a-propos" className="text-sauge text-sm hover:underline">
                                        En savoir plus →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
