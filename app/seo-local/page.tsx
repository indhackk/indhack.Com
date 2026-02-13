import { Metadata } from "next";
import Link from "next/link";
import { FRENCH_CITIES } from "@/lib/cities-data";
import { MapPin, ArrowRight, Search, Users, TrendingUp, CheckCircle2, Phone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "SEO Local | Dominez Google Maps & le Pack Local – INDHACK",
    description: "Consultante SEO locale experte sur toutes les grandes villes françaises. Nice, Cannes, Marseille, Paris, Lyon, Bordeaux, Toulouse, Rennes, Nantes, Lille... Référencement géolocalisé pour PME. ✆ 06 61 13 97 48",
    alternates: {
        canonical: "https://indhack.com/seo-local"
    },
    openGraph: {
        title: "SEO Local France | Indiana Aflalo - IndHack",
        description: "Expertise en référencement local sur toute la France. Boostez votre visibilité Google dans votre ville.",
        url: "https://indhack.com/seo-local",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
        images: [{
            url: "https://indhack.com/api/og?title=SEO%20Local%20France&subtitle=Dominez%20Google%20Maps%20dans%20votre%20ville",
            width: 1200,
            height: 630,
            alt: "SEO Local France - IndHack"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "SEO Local France | INDHACK",
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
                        <div className="inline-flex items-center gap-2 bg-sauge/20 text-sauge px-4 py-2 rounded-full text-sm font-bold mb-6">
                            <MapPin className="w-4 h-4" />
                            Référencement Géolocalisé
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                            Consultant <span className="text-sauge">SEO Local</span>
                            <br />partout en France
                        </h1>
                        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
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
                            <h3 className="text-xl font-bold mb-2">Mots-clés Géolocalisés</h3>
                            <p className="text-soft text-sm">
                                Ciblage des requêtes "métier + ville" à fort potentiel de conversion. Focus sur les quartiers et zones de chalandise spécifiques.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                            <Users className="w-10 h-10 text-sauge mb-4" />
                            <h3 className="text-xl font-bold mb-2">Autorité Locale</h3>
                            <p className="text-soft text-sm">
                                Acquisition de liens depuis partenaires locaux, annuaires professionnels et presse régionale pour renforcer votre crédibilité Google.
                            </p>
                        </div>
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
                            <p className="text-xs text-white/60">Next.js, Core Web Vitals, IA</p>
                        </div>
                        <div className="text-center">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center text-sauge">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold mb-1">Approche ROI</h4>
                            <p className="text-xs text-white/60">KPIs business mesurables</p>
                        </div>
                        <div className="text-center">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center text-sauge">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold mb-1">Proximité Locale</h4>
                            <p className="text-xs text-white/60">Connaissance du terrain</p>
                        </div>
                        <div className="text-center">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center text-sauge">
                                <Users className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold mb-1">Sans Engagement Long</h4>
                            <p className="text-xs text-white/60">3 mois minimum, puis liberté</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Outil gratuit - Maillage */}
            <section className="py-12 bg-sauge/5 border-y border-sauge/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-sauge font-bold text-sm uppercase tracking-wider mb-3">Outil Gratuit</p>
                        <h2 className="text-2xl font-heading font-bold text-ink mb-4">
                            Qui domine votre ville ?
                        </h2>
                        <p className="text-soft mb-6">
                            Découvrez en temps réel qui sont les leaders SEO dans votre secteur et votre ville.
                        </p>
                        <Link href="/outils/simulateur-visibilite-locale" className="inline-flex items-center gap-2 bg-sauge text-white px-6 py-3 rounded-xl font-semibold hover:bg-ink transition-all">
                            Lancer le simulateur <ArrowRight className="w-4 h-4" />
                        </Link>
                        <p className="text-sm text-soft mt-4">
                            <Link href="/outils" className="text-sauge hover:underline">Voir tous nos outils SEO gratuits →</Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-white">
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
