import { Metadata } from "next";
import Link from "next/link";
import { FRENCH_CITIES } from "@/lib/cities-data";
import { MapPin, ArrowRight, Search, Users, TrendingUp, CheckCircle2, Phone, Zap } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "SEO Local | Dominez Google Maps & le Pack Local – IndHack",
    description: "Consultante SEO locale experte sur toutes les grandes villes françaises. Référencement géolocalisé pour PME. Audit gratuit.",
    alternates: {
        canonical: "https://indhack.com/seo-local"
    },
    openGraph: {
        title: "SEO Local France | IndHack",
        description: "Expertise en référencement local sur toute la France. Boostez votre visibilité Google dans votre ville.",
        url: "https://indhack.com/seo-local",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
        images: [{
            url: "https://indhack.com/api/og?title=SEO%20Local%20France&subtitle=Dominez%20Google%20Maps%20dans%20votre%20ville",
            width: 1200,
            height: 630,
            alt: "SEO Local France"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "SEO Local France",
        description: "Dominez les résultats Google dans votre ville. 18+ villes couvertes.",
        images: ["https://indhack.com/api/og?title=SEO%20Local%20France&subtitle=18%2B%20villes%20couvertes"],
    },
};

// Grouper les villes par région
const citiesByRegion = FRENCH_CITIES.reduce((acc, city) => {
    const region = city.region;
    if (!acc[region]) acc[region] = [];
    acc[region].push(city);
    return acc;
}, {} as Record<string, typeof FRENCH_CITIES>);

export default function SeoLocalPage() {
    return (
        <>
            <ServiceSchema
                name="SEO Local"
                description="Consultante SEO locale experte sur toutes les grandes villes françaises. Référencement géolocalisé pour PME."
                url="https://indhack.com/seo-local"
                serviceType="SEO Local"
            />
            <Breadcrumb items={getServiceBreadcrumb("SEO Local", "/seo-local")} />
            <main className="bg-white min-h-screen">
                {/* Hero */}
                <section className="bg-ink text-white pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-sauge/20 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                            <MapPin className="w-4 h-4" />
                            Référencement géolocalisé
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                            Consultant <span className="text-sauge">SEO Local</span>
                            <br />partout en France
                        </h1>
                        <p className="text-xl text-soft-light mb-10 max-w-2xl mx-auto">
                            Dominez les résultats Google dans votre ville. Expertise locale, stratégie sur-mesure et résultats mesurables pour votre entreprise.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact">
                                <Button className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-8 py-6 font-bold">
                                    Demander un Audit
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                            <a href="tel:0661139748">
                                <Button variant="outline" className="border-2 border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 font-bold">
                                    <Phone className="mr-2 w-4 h-4" />
                                    06 61 13 97 48
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                            <p className="text-3xl font-bold text-sauge mb-1">46%</p>
                            <p className="text-xs text-soft">Recherches locales</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                            <p className="text-3xl font-bold text-sauge mb-1">78%</p>
                            <p className="text-xs text-soft">Achat sous 24h</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                            <p className="text-3xl font-bold text-sauge mb-1">18+</p>
                            <p className="text-xs text-soft">Villes couvertes</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                            <p className="text-3xl font-bold text-sauge mb-1">x5</p>
                            <p className="text-xs text-soft">ROI moyen</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Piliers SEO Local */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-bold text-ink mb-4">
                            Les <span className="text-sauge">3 piliers</span> du SEO Local
                        </h2>
                        <p className="text-soft max-w-2xl mx-auto">
                            Une méthodologie éprouvée pour dominer les recherches géolocalisées et attirer des clients de votre zone de chalandise.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                            <MapPin className="w-10 h-10 text-sauge mb-4" />
                            <h3 className="text-xl font-bold mb-2">Google Business Profile</h3>
                            <p className="text-soft text-sm">
                                Optimisation complète de votre fiche établissement : catégories, attributs, photos, posts et gestion des avis pour apparaître dans le Pack Local.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                            <Search className="w-10 h-10 text-sauge mb-4" />
                            <h3 className="text-xl font-bold mb-2">Mots-clés géolocalisés</h3>
                            <p className="text-soft text-sm">
                                Ciblage des requêtes "métier + ville" à fort potentiel de conversion. Focus sur les quartiers et zones de chalandise spécifiques.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                            <Users className="w-10 h-10 text-sauge mb-4" />
                            <h3 className="text-xl font-bold mb-2">Autorité locale</h3>
                            <p className="text-soft text-sm">
                                Acquisition de liens depuis partenaires locaux, annuaires professionnels et presse régionale pour renforcer votre crédibilité Google.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Étude Côte d'Azur */}
            <section className="py-12 bg-accent/5 border-y border-accent/20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <Link href="/etudes/restaurants-cote-azur-google-2026" className="block group">
                            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                                <div className="flex-shrink-0 text-center">
                                    <p className="text-5xl font-bold text-accent">30%</p>
                                    <p className="text-xs text-soft font-medium">sans site web</p>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <span className="text-xs font-bold text-accent uppercase tracking-wider">Étude exclusive</span>
                                    <h3 className="text-xl font-heading font-bold text-ink mt-1 mb-2 group-hover:text-sauge transition-colors">
                                        30% des meilleurs restaurants Google n'ont pas de site web
                                    </h3>
                                    <p className="text-soft text-sm">
                                        Notre analyse de 308 restaurants de la Côte d'Azur révèle des failles critiques, même chez les mieux positionnés.
                                    </p>
                                </div>
                                <ArrowRight className="w-6 h-6 text-accent group-hover:translate-x-2 transition-transform" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Villes par région */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-bold text-ink mb-4">
                            Mes zones d'<span className="text-sauge">intervention</span>
                        </h2>
                        <p className="text-soft max-w-2xl mx-auto">
                            J'accompagne les entreprises de toutes les grandes métropoles françaises dans leur stratégie de référencement local.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {Object.entries(citiesByRegion).map(([region, cities]) => (
                            <div key={region} className="bg-white p-6 rounded-2xl shadow-sm">
                                <h3 className="font-bold text-sauge text-sm uppercase tracking-wider mb-4">
                                    {region}
                                </h3>
                                <ul className="space-y-2">
                                    {cities.map(city => (
                                        <li key={city.slug}>
                                            <Link
                                                href={`/${city.slug}`}
                                                className="flex items-center justify-between text-ink hover:text-sauge transition-colors group py-1"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-sauge/50 group-hover:text-sauge" />
                                                    Consultant SEO {city.name}
                                                </span>
                                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Focus Technopole - Sophia Antipolis */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-sauge/5 to-sauge/10 p-8 rounded-2xl border border-sauge/20">
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <div className="flex-1">
                                    <span className="text-sauge font-bold text-xs uppercase tracking-wider">Focus Technopole</span>
                                    <h3 className="text-xl font-heading font-bold text-ink mt-2 mb-3">
                                        SEO pour startups tech à Sophia Antipolis
                                    </h3>
                                    <p className="text-soft text-sm mb-4">
                                        Première technopole d'Europe avec plus de 2 500 entreprises tech, Sophia Antipolis nécessite une expertise SEO adaptée aux cycles de financement et à la croissance rapide des startups B2B.
                                    </p>
                                    <Link
                                        href="/consultant-seo-sophia-antipolis"
                                        className="inline-flex items-center gap-2 text-sauge font-semibold hover:underline"
                                    >
                                        Découvrir mon expertise Sophia Antipolis
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="flex-shrink-0">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                                            <p className="text-2xl font-bold text-sauge">2 500+</p>
                                            <p className="text-xs text-soft">Entreprises tech</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                                            <p className="text-2xl font-bold text-sauge">36 000</p>
                                            <p className="text-xs text-soft">Emplois</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Avantages */}
            <section className="py-16 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-bold mb-4">
                            Pourquoi me <span className="text-sauge">choisir</span> ?
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        <div className="text-center">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center text-sauge">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold mb-1">Expertise Technique</h4>
                            <p className="text-xs text-soft-light">Next.js, Core Web Vitals, IA</p>
                        </div>
                        <div className="text-center">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center text-sauge">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold mb-1">Approche ROI</h4>
                            <p className="text-xs text-soft-light">KPIs business mesurables</p>
                        </div>
                        <div className="text-center">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center text-sauge">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold mb-1">Proximité Locale</h4>
                            <p className="text-xs text-soft-light">Connaissance du terrain</p>
                        </div>
                        <div className="text-center">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center text-sauge">
                                <Users className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold mb-1">Sans Engagement Long</h4>
                            <p className="text-xs text-soft-light">3 mois minimum, puis liberté</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Outils gratuits - Maillage */}
            <section className="py-12 bg-sauge/5 border-y border-sauge/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-sauge font-bold text-sm uppercase tracking-wider mb-3">Outils Gratuits</p>
                        <h2 className="text-2xl font-heading font-bold text-ink mb-4">
                            Analysez votre SEO local
                        </h2>
                        <p className="text-soft mb-6">
                            Testez gratuitement la visibilité de votre site et identifiez vos opportunités de croissance.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mb-4">
                            <Link href="/outils/audit-seo-gratuit" className="inline-flex items-center gap-2 bg-sauge text-white px-6 py-3 rounded-xl font-semibold hover:bg-ink transition-all">
                                Audit SEO gratuit <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="/outils/simulateur-visibilite-locale" className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 rounded-xl font-semibold hover:bg-sauge transition-all">
                                Simulateur local <MapPin className="w-4 h-4" />
                            </Link>
                        </div>
                        <p className="text-sm text-soft">
                            <Link href="/outils" className="text-sauge hover:underline">Voir tous mes outils SEO gratuits →</Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* Articles liés */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            Approfondir le sujet
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Link href="/blog/seo-local-nice" className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-base font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    SEO local à Nice : guide complet
                                </h3>
                            </Link>
                            <Link href="/blog/google-business-profile-guide-complet" className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-base font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Guide complet Google Business Profile
                                </h3>
                            </Link>
                            <Link href="/blog/google-maps-voler-clients-concurrents" className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-base font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Dominer Google Maps
                                </h3>
                            </Link>
                            <Link href="/blog/geo-comment-apparaitre-chatgpt-2026" className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-base font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Apparaître dans ChatGPT
                                </h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-fond-clair">
                <div className="container mx-auto px-4 max-w-4xl">
                    <FAQ
                        items={[
                            {
                                question: "Combien de temps faut-il pour voir des résultats en SEO local ?",
                                answer: "Les premiers résultats en SEO local apparaissent généralement entre 3 et 6 mois. L'optimisation de votre fiche Google Business Profile peut montrer des améliorations en 4 à 8 semaines, tandis que le positionnement organique local nécessite un travail plus long. Selon BrightLocal (2024), 76 % des consommateurs qui effectuent une recherche locale sur leur smartphone visitent un commerce dans les 24 heures — chaque mois d'attente représente donc un manque à gagner direct."
                            },
                            {
                                question: "Quelle est la différence entre SEO classique et SEO local ?",
                                answer: "Le SEO classique vise à positionner votre site sur des requêtes nationales ou informationnelles (ex : « meilleur logiciel CRM »). Le SEO local cible les recherches géolocalisées (ex : « restaurant italien Nice ») et implique l'optimisation de votre fiche Google Business Profile, la cohérence des citations NAP (Nom, Adresse, Téléphone) et les avis clients. Selon Google, 46 % de toutes les recherches ont une intention locale — et 78 % des recherches locales mobiles aboutissent à un achat en magasin sous 24 heures."
                            },
                            {
                                question: "Faut-il un site web pour faire du SEO local ?",
                                answer: "Une fiche Google Business Profile seule peut vous rendre visible dans le Pack Local (les 3 résultats sur la carte). Cependant, un site web optimisé multiplie vos chances : il vous permet d'apparaître aussi dans les résultats organiques classiques, de créer du contenu localisé, et de convertir les visiteurs avec des pages de destination dédiées. Notre étude sur 100 restaurants de la Côte d'Azur montre que 30 % n'ont pas de site web — et perdent en moyenne 40 % de visibilité par rapport à ceux qui en ont un."
                            },
                            {
                                question: "Comment gérer les avis négatifs sur Google ?",
                                answer: "Ne supprimez jamais les avis négatifs (sauf s'ils sont faux ou diffamatoires — vous pouvez alors les signaler à Google). Répondez professionnellement dans les 24 heures en reconnaissant le problème, en proposant une solution et en invitant le client à vous recontacter en privé. Selon BrightLocal, 88 % des consommateurs font confiance à une entreprise qui répond à ses avis négatifs. Un profil avec quelques avis négatifs bien gérés est perçu comme plus authentique qu'un profil 100 % positif."
                            },
                            {
                                question: "Combien coûte une prestation de SEO local ?",
                                answer: "Un accompagnement SEO local professionnel coûte entre 500 € et 2 000 €/mois selon l'intensité concurrentielle de votre secteur et votre zone géographique. Pour les artisans et TPE, un audit initial avec optimisation de la fiche Google Business Profile (prestation ponctuelle) démarre à partir de 800 €. Le ROI est généralement atteint en 3 à 6 mois : un client local supplémentaire par semaine suffit souvent à rentabiliser l'investissement."
                            },
                        ]}
                        title="Questions fréquentes sur le SEO local"
                    />
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <h2 className="text-3xl font-heading font-bold text-ink mb-4">
                        Prêt à <span className="text-sauge">dominer</span> votre marché local ?
                    </h2>
                    <p className="text-soft mb-8">
                        Audit SEO local offert. Découvrez votre potentiel de croissance en 15 minutes.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact">
                            <Button className="bg-sauge text-white hover:bg-ink rounded-full px-10 py-6 font-bold">
                                Demander un Audit Gratuit
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

                <HomepageBacklink variant="default" />
            </main>
        </>
    );
}
