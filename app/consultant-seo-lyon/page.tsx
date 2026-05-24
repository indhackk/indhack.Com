"use client";

import { CityPageTemplateV2 } from "@/components/templates/CityPageTemplateV2";
import { getCityBySlug } from "@/lib/cities-data";
import { Breadcrumb, getCityBreadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    Cpu,
    FlaskConical,
    MapPin,
    Users,
    Utensils,
} from "lucide-react";

const cityData = getCityBySlug("consultant-seo-lyon")!;

const DISTRICTS = [
    { zone: "Part-Dieu / 3e", type: "SEO B2B corporate", clients: "Sièges sociaux, banques, cabinets conseil", icon: <Building2 className="h-5 w-5" /> },
    { zone: "Confluence / 2e", type: "SEO tech & retail", clients: "Startups, commerces, loisirs", icon: <Cpu className="h-5 w-5" /> },
    { zone: "Presqu'île", type: "SEO local premium", clients: "Restaurants, boutiques, artisans", icon: <Utensils className="h-5 w-5" /> },
    { zone: "Gerland / 7e", type: "SEO biotech & santé", clients: "Labos, startups santé, medical devices", icon: <FlaskConical className="h-5 w-5" /> },
    { zone: "Vieux Lyon", type: "SEO tourisme & culture", clients: "Restaurants, hôtels, guides, musées", icon: <MapPin className="h-5 w-5" /> },
    { zone: "Villeurbanne / Tonkin", type: "SEO startup & campus", clients: "Écoles, étudiants, jeunes entreprises", icon: <Users className="h-5 w-5" /> },
];

const SECTORS = [
    { sector: "Santé & biotech", examples: "Labos, medtech, pharma", focus: "SEO B2B technique" },
    { sector: "Gastronomie", examples: "Restaurants, bouchons, traiteurs", focus: "SEO local prioritaire" },
    { sector: "Tech & startups", examples: "SaaS, French Tech, éditeurs", focus: "SEO B2B growth" },
    { sector: "Industrie & BTP", examples: "Textile, métallurgie, équipements", focus: "SEO B2B industriel" },
    { sector: "Services professionnels", examples: "Cabinets, avocats, experts", focus: "SEO local + autorité" },
    { sector: "Commerce & retail", examples: "Boutiques, enseignes, e-commerce", focus: "SEO e-commerce" },
];

const OUTCOMES = [
    { business: "Restaurant ou bouchon lyonnais", delay: "1 à 2 mois", goal: "Gagner des appels et réservations via Google Maps" },
    { business: "Startup tech ou SaaS", delay: "3 à 4 mois", goal: "Créer une base de contenus B2B qui capte les requêtes à forte intention" },
    { business: "Cabinet libéral", delay: "2 à 3 mois", goal: "Renforcer les pages locales et la preuve d'expertise" },
    { business: "E-commerce mode ou textile", delay: "3 à 4 mois", goal: "Structurer les catégories, guides et pages produits visibles" },
    { business: "Entreprise biotech ou santé", delay: "4 à 6 mois", goal: "Construire une autorité thématique crédible et sourcée" },
];

const RESOURCES = [
    { href: "/seo-local", label: "Comprendre le SEO local et Google Maps" },
    { href: "/outils/audit-seo-gratuit", label: "Tester la base technique de votre site" },
    { href: "/outils/simulateur-visibilite-locale", label: "Simuler votre visibilité locale" },
    { href: "/blog/google-business-profile-guide-complet", label: "Optimiser une fiche Google Business Profile" },
    { href: "/blog/google-maps-voler-clients-concurrents", label: "Approfondir les leviers Google Maps" },
    { href: "/contact", label: "Demander un diagnostic SEO à Lyon" },
];

function LyonCustomContent() {
    return (
        <>
            <section className="border-t border-line bg-white py-14 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                            <div className="max-w-xl">
                                <span className="inline-flex items-center gap-2 rounded-full bg-sauge/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-sauge">
                                    <Building2 className="h-3.5 w-3.5" />
                                    Marché lyonnais
                                </span>
                                <h2 className="mt-4 font-heading text-2xl font-bold leading-tight text-ink md:text-3xl">
                                    Un marché SEO dense, avec des intentions très différentes selon les quartiers.
                                </h2>
                                <div className="mt-5 space-y-4 text-base leading-8 text-soft">
                                    <p>
                                        Lyon concentre des filières fortes : santé, biotech, gastronomie, textile, SaaS, services professionnels. Une page locale générique ne suffit pas à couvrir ces intentions.
                                    </p>
                                    <p>
                                        La stratégie doit distinguer les recherches de proximité, les requêtes B2B et les contenus d'autorité qui rassurent avant une prise de contact.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {[
                                    { value: "520 000+", label: "habitants à Lyon" },
                                    { value: "1,4 M", label: "habitants dans la métropole" },
                                    { value: "140 000+", label: "entreprises implantées" },
                                    { value: "9,56 M", label: "nuitées touristiques 2024" },
                                ].map((stat) => (
                                    <div key={stat.label} className="rounded-2xl border border-line bg-fond-clair p-5">
                                        <p className="font-heading text-2xl font-bold text-ink">{stat.value}</p>
                                        <p className="mt-2 text-xs font-medium text-soft">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="mt-5 text-xs leading-6 text-soft">
                            Sources : <a href="https://www.insee.fr/fr/statistiques/2011101?geo=EPCI-200046977" target="_blank" rel="noopener noreferrer" className="font-semibold text-sauge hover:underline">INSEE</a>,{" "}
                            <a href="https://www.grandlyon.com/actualite/transition-ecologique-les-entreprises-relevent-le-defi" target="_blank" rel="noopener noreferrer" className="font-semibold text-sauge hover:underline">Métropole de Lyon</a> et{" "}
                            <a href="https://presse.lyon-france.com/boite-a-outils/bilans-et-etudes" target="_blank" rel="noopener noreferrer" className="font-semibold text-sauge hover:underline">ONLYLYON Tourisme</a>.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-fond-clair py-14">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-8 flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sauge/10 text-sauge">
                                <MapPin className="h-5 w-5" />
                            </span>
                            <h2 className="font-heading text-2xl font-bold text-ink md:text-3xl">
                                Zones et intentions à travailler à Lyon
                            </h2>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {DISTRICTS.map((item) => (
                                <div key={item.zone} className="rounded-2xl border border-line bg-white p-5 shadow-sm transition-colors hover:border-sauge/30">
                                    <div className="mb-3 flex items-center gap-3">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sauge/10 text-sauge">
                                            {item.icon}
                                        </span>
                                        <h3 className="font-bold text-ink">{item.zone}</h3>
                                    </div>
                                    <p className="text-sm font-semibold text-sauge">{item.type}</p>
                                    <p className="mt-2 text-sm leading-relaxed text-soft">{item.clients}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-14 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="max-w-3xl font-heading text-2xl font-bold leading-tight text-ink md:text-3xl">
                            Une consultante SEO utile quand il faut prioriser vite et parler concret.
                        </h2>

                        <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                            <div className="space-y-4 text-base leading-8 text-soft">
                                <p>
                                    Une agence peut être pertinente sur des projets très larges. Mais pour une PME, un cabinet, un restaurant ou une startup, le besoin est souvent plus simple : comprendre ce qui bloque, prioriser les actions et avancer sans couche de validation inutile.
                                </p>
                                <p>
                                    Mon rôle de <Link href="/consultant-seo" className="font-semibold text-sauge hover:underline">consultante SEO</Link> est d'apporter cette lecture directe : technique, contenu, maillage interne, Search Console et visibilité IA quand elle a un intérêt réel pour votre marché.
                                </p>
                                <p>
                                    L'objectif n'est pas de promettre des positions. C'est de construire une base plus claire, plus mesurable, et plus facile à faire progresser.
                                </p>
                            </div>

                            <div className="rounded-[1.5rem] border border-line bg-fond-clair p-6 md:p-7">
                                <h3 className="font-heading text-xl font-bold text-ink">Ce qui change dans l'accompagnement</h3>
                                <ul className="mt-5 grid gap-3">
                                    {[
                                        "Un interlocuteur unique sur toute la mission",
                                        "Une roadmap SEO priorisée par impact et effort",
                                        "Une lecture technique réelle du site, pas seulement un rapport automatique",
                                        "Des contenus reliés aux intentions locales et aux pages business",
                                        "Un suivi des demandes qualifiées, pas seulement des positions",
                                        "Une ouverture GEO si vos prospects utilisent les moteurs IA",
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sauge" />
                                            <span className="text-soft">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-ink py-14 text-white">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
                            Secteurs d'activité accompagnés à <span className="text-sauge-light">Lyon</span>
                        </h2>
                        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {SECTORS.map((item) => (
                                <div key={item.sector} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                                    <h3 className="mb-1 text-sm font-bold text-white">{item.sector}</h3>
                                    <p className="mb-2 text-xs text-white/60">{item.examples}</p>
                                    <span className="text-xs font-medium text-sauge-light">{item.focus}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-14">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-5xl">
                        <h2 className="font-heading text-2xl font-bold text-ink md:text-3xl">
                            Trajectoires SEO réalistes pour les entreprises lyonnaises
                        </h2>

                        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-line">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-line bg-fond-clair">
                                        <th className="px-4 py-4 text-left font-bold text-ink">Type de business</th>
                                        <th className="px-4 py-4 text-left font-bold text-ink">Premier signal</th>
                                        <th className="px-4 py-4 text-left font-bold text-ink">Objectif réaliste</th>
                                    </tr>
                                </thead>
                                <tbody className="text-soft">
                                    {OUTCOMES.map((row) => (
                                        <tr key={row.business} className="border-b border-line last:border-0">
                                            <td className="px-4 py-4 font-medium text-ink">{row.business}</td>
                                            <td className="px-4 py-4">{row.delay}</td>
                                            <td className="px-4 py-4">{row.goal}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-4 text-xs italic text-soft">
                            Ces délais sont des ordres de grandeur. Un <Link href="/audit-seo" className="text-sauge hover:underline">audit SEO complet</Link> sert justement à vérifier l'état réel du site avant de promettre une trajectoire.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-fond-clair py-10">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-5xl rounded-[1.5rem] border border-line bg-white p-6 md:p-7">
                        <h3 className="font-heading text-xl font-bold text-ink">Ressources SEO utiles pour une entreprise lyonnaise</h3>
                        <div className="mt-5 grid gap-3 md:grid-cols-2">
                            {RESOURCES.map((resource) => (
                                <Link key={resource.href} href={resource.href} className="flex items-center gap-3 rounded-xl bg-fond-clair px-4 py-3 text-sm text-soft transition-colors hover:text-sauge">
                                    <ArrowRight className="h-4 w-4 shrink-0 text-sauge" />
                                    <span>{resource.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SeoLyonPage() {
    return (
        <>
            <Breadcrumb items={getCityBreadcrumb(cityData.name, cityData.slug)} />
            <CityPageTemplateV2
                cityData={cityData}
                customContent={<LyonCustomContent />}
                visualVariant="premium"
            />
        </>
    );
}
