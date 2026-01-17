"use client";

import { HeroServices } from "@/components/services/HeroServices";
import { FAQ } from "@/components/FAQ";
import { SEOScoreChecker } from "@/components/SEOScoreChecker";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Users, Search, ArrowRight, CheckCircle2, Zap, Target, BarChart3, Globe, FileSearch, Star, Phone, Clock, Building2, Award, Shield, Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";
import { CityData, FRENCH_CITIES, SERVICES_FOR_CITIES } from "@/lib/cities-data";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";

interface CityPageProps {
    cityData: CityData;
    customContent?: React.ReactNode;
}

export function CityPageTemplateV2({ cityData, customContent }: CityPageProps) {
    const { openAuditModal } = useModal();
    const city = cityData.name;
    const zipCode = cityData.zipCode;

    // Villes proches pour le maillage
    const nearbyCities = FRENCH_CITIES
        .filter(c => c.name !== city && c.region === cityData.region)
        .slice(0, 5);

    // JSON-LD LocalBusiness
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `https://indhack.com/${cityData.slug}#business`,
        "name": `IndHack - Consultant SEO ${city}`,
        "alternateName": "Indiana Aflalo - Experte SEO",
        "description": `Consultante SEO experte à ${city}. Référencement naturel, audit technique et stratégie de visibilité Google pour PME et entrepreneurs de ${city} et sa région.`,
        "url": `https://indhack.com/${cityData.slug}`,
        "telephone": "+33661139748",
        "email": "contact@indhack.com",
        "image": "https://indhack.com/images/logo-indhack.png",
        "priceRange": "€€",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city,
            "postalCode": zipCode,
            "addressRegion": cityData.region,
            "addressCountry": city === "Monaco" ? "MC" : "FR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": cityData.lat,
            "longitude": cityData.lng
        },
        "areaServed": [
            { "@type": "City", "name": city },
            { "@type": "AdministrativeArea", "name": cityData.department },
            ...cityData.nearbyAreas.map(area => ({ "@type": "Place", "name": area }))
        ],
        "serviceType": [
            "Référencement Naturel SEO",
            "Audit SEO",
            "SEO Local",
            "Google Business Profile",
            "Création de Site Web",
            "Community Management"
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "47"
        }
    };

    // FAQ enrichie
    const FAQ_ITEMS = [
        {
            question: `Pourquoi choisir une consultante SEO à ${city} plutôt qu'une agence parisienne ?`,
            answer: `Une experte locale connaît les spécificités du marché ${city} : comportements de recherche, concurrents directs, partenaires locaux pour le netlinking. Je peux vous rencontrer physiquement, visiter votre établissement et adapter ma stratégie à votre réalité terrain. Cette proximité génère des résultats plus rapides et pertinents.`
        },
        {
            question: `Quels résultats SEO attendre sur ${city} et les ${cityData.department} ?`,
            answer: `Sur des requêtes locales type "votre métier + ${city}", les premiers résultats apparaissent en 1 à 3 mois. Pour les secteurs très concurrentiels (immobilier, restauration, avocats), comptez 4 à 6 mois. L'objectif : apparaître dans le Pack Local Google Maps et générer un flux régulier de prospects qualifiés.`
        },
        {
            question: `Quel budget prévoir pour du SEO local à ${city} ?`,
            answer: `L'audit SEO initial est 100% gratuit et sans engagement. Il permet de définir votre potentiel. Ensuite, nous définissons ensemble une stratégie adaptée à vos objectifs de croissance. Chaque projet est unique : commençons par l'audit offert pour voir ce qu'il est possible de faire.`
        },
        {
            question: `Comment fonctionne le référencement local sur Google à ${city} ?`,
            answer: `Le SEO local repose sur 3 piliers : votre fiche Google Business Profile, les citations locales (annuaires, Pages Jaunes, Yelp...) et les avis clients. Mon travail consiste à optimiser ces éléments pour vous faire apparaître dans le Pack Local de 3 résultats affichés en haut des recherches géolocalisées.`
        },
        {
            question: `Quels services proposez-vous au-delà du SEO à ${city} ?`,
            answer: `Expertise complète : audit technique approfondi, stratégie de contenu, netlinking national/local, création de sites web optimisés SEO, refonte sans perte de trafic, et gestion de réseaux sociaux. Une approche 360° pour maximiser votre visibilité digitale.`
        },
        {
            question: `Intervenez-vous sur ${cityData.nearbyAreas.slice(0, 3).join(", ")} et alentours ?`,
            answer: `Oui, j'interviens sur toute la zone ${cityData.department} : ${cityData.nearbyAreas.join(", ")}. La proximité géographique est un atout pour le SEO local, mais les outils modernes permettent aussi un accompagnement à distance très efficace.`
        }
    ];

    // Méthodologie compacte
    const METHODOLOGY = [
        { step: "01", title: "Audit Local", desc: `Analyse de votre visibilité sur ${city} : fiche Google, positions actuelles, concurrents directs.`, icon: <FileSearch className="w-5 h-5" /> },
        { step: "02", title: "Stratégie", desc: "Mots-clés à fort potentiel, plan de contenu géolocalisé, acquisition d'avis.", icon: <Target className="w-5 h-5" /> },
        { step: "03", title: "Optimisation", desc: "Technique on-site, pages locales, enrichissement Google Business Profile.", icon: <Zap className="w-5 h-5" /> },
        { step: "04", title: "Croissance", desc: "Reporting mensuel, évolution des positions, leads générés, ajustements.", icon: <TrendingUp className="w-5 h-5" /> }
    ];

    // Services liés
    const RELATED_SERVICES = [
        { title: "Audit SEO Complet", href: "/audit-seo", desc: "Diagnostic technique approfondi" },
        { title: "Référencement Naturel", href: "/referencement-naturel", desc: "Stratégie SEO nationale" },
        { title: "Création de Site", href: "/creation-site-web", desc: "Sites optimisés SEO" },
        { title: "Community Manager", href: "/community-manager", desc: "Gestion réseaux sociaux" }
    ];

    // Avantages différenciants
    const ADVANTAGES = [
        { icon: <Shield />, title: "Expertise Technique", desc: "Next.js, Core Web Vitals, IA" },
        { icon: <BarChart3 />, title: "Approche ROI", desc: "KPIs business, pas juste des positions" },
        { icon: <MapPin />, title: "Proximité Locale", desc: `Basée région ${cityData.department}` },
        { icon: <Award />, title: "Sans Engagement Long", desc: "3 mois minimum, puis liberté" }
    ];

    // Breadcrumb items pour schema
    const breadcrumbItems = [
        { name: "Accueil", url: "https://indhack.com" },
        { name: "SEO Local", url: "https://indhack.com/seo-local" },
        { name: `Consultant SEO ${city}`, url: `https://indhack.com/${cityData.slug}` }
    ];

    return (
        <main className="bg-white min-h-screen">
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <BreadcrumbSchema items={breadcrumbItems} />

            {/* Breadcrumb SEO */}
            <div className="bg-gray-50 pt-24 pb-3 px-4">
                <div className="container mx-auto">
                    <nav className="text-xs text-soft flex items-center gap-2 flex-wrap" aria-label="Fil d'ariane">
                        <Link href="/" className="hover:text-sauge transition-colors">Accueil</Link>
                        <span>/</span>
                        <Link href="/seo-local" className="hover:text-sauge transition-colors">SEO Local</Link>
                        <span>/</span>
                        <span className="text-ink font-medium">Consultant SEO {city}</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <HeroServices
                title={`Consultant SEO ${city} (${zipCode})`}
                subtitle={`Dominez Google à ${city}. Attirez des clients qualifiés des ${cityData.department} grâce à une stratégie de référencement local sur-mesure.`}
                image="seo-dashboard"
                category="Référencement Local"
            />

            {/* Introduction Compacte + Stats */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-10 items-start">
                            {/* Texte enrichi */}
                            <div>
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-4">
                                    Être visible à <span className="text-sauge">{city}</span> : un enjeu stratégique
                                </h2>
                                <div className="prose prose-sm text-soft space-y-3">
                                    <p>{cityData.description}</p>
                                    <p>
                                        <strong className="text-ink">46% des recherches Google ont une intention locale.</strong> Si votre entreprise n'apparaît pas quand un habitant de {city} ou des zones {cityData.nearbyAreas.slice(0, 2).join(", ")} cherche vos services, vous laissez ces clients à vos concurrents.
                                    </p>
                                    <p>
                                        En tant que <strong className="text-ink">consultante SEO spécialisée</strong> sur le marché {cityData.region}, je vous accompagne pour conquérir les premières positions Google et Google Maps. Une approche personnalisée, des résultats mesurables.
                                    </p>
                                </div>

                                {/* Points clés de la ville */}
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {cityData.keyPoints.map((point, i) => (
                                        <span key={i} className="inline-flex items-center gap-1.5 bg-sauge/10 text-sauge px-3 py-1.5 rounded-full text-xs font-bold">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            {point}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Stats locales */}
                            <div className="bg-ink text-white p-8 rounded-2xl">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-sauge" />
                                    Le SEO local en chiffres
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-white/5 rounded-xl">
                                        <p className="text-3xl font-bold text-sauge">46%</p>
                                        <p className="text-xs text-white/60 mt-1">Recherches locales</p>
                                    </div>
                                    <div className="text-center p-4 bg-white/5 rounded-xl">
                                        <p className="text-3xl font-bold text-sauge">78%</p>
                                        <p className="text-xs text-white/60 mt-1">Achat sous 24h</p>
                                    </div>
                                    <div className="text-center p-4 bg-white/5 rounded-xl">
                                        <p className="text-3xl font-bold text-sauge">88%</p>
                                        <p className="text-xs text-white/60 mt-1">Font confiance aux avis</p>
                                    </div>
                                    <div className="text-center p-4 bg-white/5 rounded-xl">
                                        <p className="text-3xl font-bold text-sauge">x5</p>
                                        <p className="text-xs text-white/60 mt-1">ROI moyen SEO</p>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <p className="text-sm text-white/70 mb-4">Population {city} : <strong className="text-white">{cityData.population} hab.</strong></p>
                                    <Button
                                        onClick={openAuditModal}
                                        className="w-full bg-sauge text-white hover:bg-white hover:text-ink rounded-xl py-6 font-bold"
                                    >
                                        Audit Gratuit {city}
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 Piliers SEO Local - Compact */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                            Les <span className="text-sauge">3 piliers</span> du SEO local à {city}
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-sauge/30 transition-all group"
                        >
                            <MapPin className="w-8 h-8 text-sauge mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-bold mb-2">Google Business Profile</h3>
                            <p className="text-soft text-sm">
                                Optimisation complète de votre fiche : catégories, photos, posts, avis pour apparaître dans le <strong>Pack Local</strong>.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-sauge/30 transition-all group"
                        >
                            <Search className="w-8 h-8 text-sauge mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-bold mb-2">Mots-clés Géolocalisés</h3>
                            <p className="text-soft text-sm">
                                Ciblage des requêtes "métier + {city}" qui convertissent <strong>3x plus</strong>. Focus quartiers : {cityData.landmarks.slice(0, 2).join(", ")}.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-sauge/30 transition-all group"
                        >
                            <Users className="w-8 h-8 text-sauge mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-bold mb-2">Autorité Locale</h3>
                            <p className="text-soft text-sm">
                                Liens depuis partenaires locaux, annuaires pros et presse {cityData.region} pour <strong>asseoir votre crédibilité</strong>.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Outil SEO Interactif */}
            <SEOScoreChecker />

            {/* Méthodologie en timeline compacte */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                            Mon accompagnement SEO à <span className="text-sauge">{city}</span>
                        </h2>
                    </div>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-4">
                        {METHODOLOGY.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative bg-gray-50 p-5 rounded-xl border border-gray-100 group hover:bg-sauge hover:text-white transition-all"
                            >
                                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-sauge font-bold text-sm shadow-sm mb-3 group-hover:bg-ink group-hover:text-white transition-all">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                                <p className="text-xs text-soft group-hover:text-white/80 transition-colors">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Avantages - Bande */}
            <section className="py-10 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {ADVANTAGES.map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/10 flex items-center justify-center text-sauge">
                                    {item.icon}
                                </div>
                                <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                                <p className="text-xs text-white/60">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Zones d'intervention - Quartiers */}
            <section className="py-10 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-xl font-bold text-ink mb-4 text-center">
                            Zones d'intervention à {city} et alentours
                        </h2>
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {cityData.landmarks.map((landmark, i) => (
                                <span key={i} className="bg-white px-3 py-1.5 rounded-full text-xs font-medium text-ink border border-gray-200">
                                    {landmark}
                                </span>
                            ))}
                            {cityData.nearbyAreas.map((area, i) => (
                                <span key={i} className="bg-sauge/10 px-3 py-1.5 rounded-full text-xs font-medium text-sauge">
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services liés - Maillage */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-heading font-bold text-ink">
                            Mes autres <span className="text-sauge">services</span> à {city}
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                        {RELATED_SERVICES.map((service, i) => (
                            <Link key={i} href={service.href}>
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-lg hover:border-sauge/30 transition-all group h-full"
                                >
                                    <h3 className="font-bold text-sm text-ink mb-1 group-hover:text-sauge transition-colors">{service.title}</h3>
                                    <p className="text-xs text-soft">{service.desc}</p>
                                    <span className="mt-3 inline-flex items-center text-sauge text-xs font-bold">
                                        Découvrir <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {customContent}

            {/* Lien vers la page d'accueil - Maillage interne SEO */}
            <HomepageBacklink variant="card" className="max-w-md mx-auto my-12" />

            {/* FAQ */}
            <FAQ items={FAQ_ITEMS} title={`Questions Fréquentes - SEO ${city}`} />

            {/* Maillage autres villes */}
            <section className="py-10 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="font-bold text-ink mb-4">J'interviens également sur</h3>
                    <div className="flex flex-wrap justify-center gap-3 text-sm max-w-3xl mx-auto">
                        {nearbyCities.map((c) => (
                            <Link
                                key={c.name}
                                href={`/${c.slug}`}
                                className="px-4 py-2 bg-gray-50 hover:bg-sauge hover:text-white rounded-full transition-all text-soft font-medium"
                            >
                                Consultant SEO {c.name}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-6">
                        <Link href="/seo-local" className="text-sauge font-bold text-sm hover:underline">
                            ← Toutes mes zones d'intervention
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Final Compact */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-ink p-10 rounded-2xl text-white text-center">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                            Prêt à dominer Google à <span className="text-sauge">{city}</span> ?
                        </h2>
                        <p className="text-white/60 mb-8 max-w-lg mx-auto text-sm">
                            Audit SEO local offert. Découvrez votre potentiel de croissance en 15 minutes.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                onClick={openAuditModal}
                                className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-8 py-6 font-bold"
                            >
                                Audit Gratuit
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <a
                                href="tel:0661139748"
                                className="inline-flex items-center gap-2 px-8 py-6 rounded-full border-2 border-white/20 text-white hover:bg-white/10 font-bold transition-all"
                            >
                                <Phone className="w-4 h-4" />
                                06 61 13 97 48
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
