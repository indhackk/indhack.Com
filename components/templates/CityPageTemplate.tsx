"use client";

import { HeroServices } from "@/components/services/HeroServices";
import { FAQ } from "@/components/FAQ";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Users, Search, ArrowRight, CheckCircle2, Zap, Target, BarChart3, Globe, FileSearch } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";

interface CityPageProps {
    city: string;
    zipCode: string;
    description: string;
    customContent?: React.ReactNode;
}

// Configuration des données locales par ville pour JSON-LD
const CITY_DATA: Record<string, { lat: string; lng: string; region: string; department: string }> = {
    "Nice": { lat: "43.7102", lng: "7.2620", region: "Provence-Alpes-Côte d'Azur", department: "Alpes-Maritimes" },
    "Cannes": { lat: "43.5528", lng: "7.0174", region: "Provence-Alpes-Côte d'Azur", department: "Alpes-Maritimes" },
    "Antibes": { lat: "43.5804", lng: "7.1251", region: "Provence-Alpes-Côte d'Azur", department: "Alpes-Maritimes" },
    "Monaco": { lat: "43.7384", lng: "7.4246", region: "Principauté de Monaco", department: "Monaco" },
    "Sophia-Antipolis": { lat: "43.6163", lng: "7.0557", region: "Provence-Alpes-Côte d'Azur", department: "Alpes-Maritimes" },
};

export function CityPageTemplate({ city, zipCode, description, customContent }: CityPageProps) {
    const { openAuditModal } = useModal();
    const cityData = CITY_DATA[city] || CITY_DATA["Nice"];

    // JSON-LD LocalBusiness dynamique pour chaque ville
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `https://indhack.com/seo-${city.toLowerCase()}#business`,
        "name": `IndHack - Consultant SEO ${city}`,
        "alternateName": "Indiana Aflalo - Experte SEO",
        "description": `Consultante SEO freelance à ${city}. Référencement naturel, audit technique et stratégie de visibilité Google pour PME et entrepreneurs de ${city} et sa région.`,
        "url": `https://indhack.com/seo-${city.toLowerCase()}`,
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
            { "@type": "AdministrativeArea", "name": cityData.department }
        ],
        "serviceType": [
            "Référencement Naturel SEO",
            "Audit SEO",
            "SEO Local",
            "Google Business Profile",
            "Création de Site Web",
            "Stratégie Digitale"
        ],
        "sameAs": [
            "https://www.linkedin.com/in/indianaaflalo"
        ]
    };

    // FAQ étendue avec plus de questions pour densifier le contenu
    const FAQ_ITEMS = [
        {
            question: `Pourquoi faire appel à une consultante SEO locale à ${city} ?`,
            answer: `Travailler avec une consultante SEO basée dans la région ${city} offre plusieurs avantages. Je connais les spécificités du marché local, les comportements de recherche des habitants de ${city} et des ${cityData.department}. Cette proximité permet des rendez-vous physiques pour mieux comprendre votre activité, votre clientèle cible et vos concurrents directs. Un accompagnement de proximité est souvent plus efficace qu'une agence parisienne déconnectée de votre réalité terrain.`
        },
        {
            question: `Quels résultats attendre d'une stratégie SEO à ${city} ?`,
            answer: `Sur des requêtes locales comme "votre métier + ${city}", les premiers résultats apparaissent généralement en 1 à 3 mois. Pour des secteurs très concurrentiels (immobilier, restauration, avocats), comptez 4 à 6 mois pour une position stable en première page. L'objectif : générer un flux régulier de prospects qualifiés via Google Maps et les résultats organiques.`
        },
        {
            question: `Quel est le coût d'un accompagnement SEO à ${city} ?`,
            answer: `Un audit SEO complet démarre à 690€. Pour un accompagnement mensuel incluant optimisations techniques, création de contenu et netlinking local, les prestations débutent à 790€/mois. Chaque projet est unique : je vous propose un devis personnalisé après un audit gratuit de 15 minutes pour évaluer vos besoins et votre potentiel de croissance.`
        },
        {
            question: "Comment fonctionne le référencement local Google ?",
            answer: "Le SEO local repose sur trois piliers : votre fiche Google Business Profile (anciennement Google My Business), les citations locales (annuaires, Pages Jaunes, etc.) et les avis clients. Mon travail consiste à optimiser ces trois éléments pour vous faire apparaître dans le fameux 'Pack Local' de 3 résultats qui s'affiche en haut des recherches géolocalisées."
        },
        {
            question: "Proposez-vous des services au-delà du SEO local ?",
            answer: "Absolument. Mon expertise couvre le référencement naturel complet : audit technique, stratégie de contenu, netlinking national, création et refonte de sites web optimisés SEO. Le SEO local est souvent la première étape idéale pour les entreprises qui veulent des résultats rapides, mais je peux vous accompagner sur une stratégie nationale ou internationale."
        },
        {
            question: `Travaillez-vous avec des entreprises en dehors de ${city} ?`,
            answer: `Oui, j'interviens sur toute la Côte d'Azur (Nice, Cannes, Antibes, Monaco, Grasse, Menton...) et même en remote pour des clients dans toute la France. La proximité reste un atout pour le SEO local, mais les outils modernes permettent un accompagnement efficace à distance.`
        }
    ];

    // Méthodologie en 4 étapes
    const METHODOLOGY = [
        {
            step: "01",
            title: "Audit Local Complet",
            desc: `Analyse de votre visibilité actuelle sur ${city} : fiche Google Business, positions sur les mots-clés locaux, analyse de vos concurrents directs dans la zone.`
        },
        {
            step: "02",
            title: "Stratégie Sur-Mesure",
            desc: "Identification des mots-clés à fort potentiel de conversion, plan de contenu géolocalisé, stratégie d'acquisition d'avis clients."
        },
        {
            step: "03",
            title: "Optimisation & Contenu",
            desc: "Optimisation technique de votre site, création de pages locales, enrichissement de votre fiche Google avec photos, posts et attributs."
        },
        {
            step: "04",
            title: "Suivi & Croissance",
            desc: "Reporting mensuel transparent : évolution des positions, trafic généré, appels et demandes de contact. Ajustements continus pour maximiser le ROI."
        }
    ];

    // Services liés (maillage interne)
    const RELATED_SERVICES = [
        { title: "Audit SEO Complet", href: "/audit-seo", desc: "Diagnostic technique approfondi de votre site" },
        { title: "Référencement Naturel", href: "/referencement-naturel", desc: "Stratégie SEO complète pour dominer Google" },
        { title: "Création de Site Web", href: "/creation-site-web", desc: "Sites web optimisés SEO dès la conception" },
        { title: "Refonte SEO-Safe", href: "/refonte-site-web", desc: "Refonte sans perdre votre trafic existant" },
    ];

    // Villes liées (maillage zones)
    const OTHER_CITIES = [
        { name: "Nice", href: "/seo-nice" },
        { name: "Cannes", href: "/seo-cannes" },
        { name: "Antibes", href: "/seo-antibes" },
        { name: "Monaco", href: "/seo-monaco" },
        { name: "Sophia-Antipolis", href: "/seo-sophia-antipolis" },
    ].filter(c => c.name !== city);

    // Points forts différenciants
    const WHY_CHOOSE_ME = [
        {
            title: "Expertise Technique",
            desc: "Maîtrise de Next.js, Core Web Vitals, et des dernières pratiques d'indexation Google."
        },
        {
            title: "Approche ROI",
            desc: "Chaque action est mesurée. Reporting transparent avec KPIs business, pas juste des positions."
        },
        {
            title: "Proximité Locale",
            desc: `Basée dans la région, je comprends le marché de ${city} et peux vous rencontrer physiquement.`
        },
        {
            title: "Pas de Contrat Long",
            desc: "Engagement minimum de 3 mois pour voir des résultats, puis en toute liberté."
        }
    ];

    return (
        <main className="bg-white min-h-screen">
            {/* JSON-LD LocalBusiness Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />

            {/* Fil d'Ariane (Breadcrumb) SEO */}
            <div className="bg-gray-50 pt-24 pb-4 px-4">
                <div className="container mx-auto">
                    <nav className="text-sm text-soft flex items-center gap-2" aria-label="Fil d'ariane">
                        <Link href="/" className="hover:text-sauge transition-colors">Accueil</Link>
                        <span>/</span>
                        <Link href="/seo-local" className="hover:text-sauge transition-colors">SEO Local</Link>
                        <span>/</span>
                        <span className="text-ink font-medium">Consultant SEO {city}</span>
                    </nav>
                </div>
            </div>

            <HeroServices
                title={`Consultante SEO ${city} : Dominez Google Localement`}
                subtitle={`Boostez votre visibilité à ${city} (${zipCode}) et attirez des clients qualifiés grâce à une stratégie de référencement naturel taillée pour votre marché local.`}
                image="seo-dashboard"
                category="Référencement Local"
            />

            {/* Section Introduction Enrichie */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-6">
                            Être visible à <span className="text-sauge">{city}</span>, c'est vital pour votre business
                        </h2>
                        <p className="text-lg text-soft leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Contenu enrichi pour densifier */}
                    <div className="prose prose-lg max-w-none text-soft">
                        <p>
                            <strong className="text-ink">Le référencement local à {city}</strong> est devenu un enjeu stratégique majeur pour toutes les entreprises qui souhaitent capter une clientèle de proximité. Avec plus de 46% des recherches Google ayant une intention locale, ne pas apparaître dans les premiers résultats quand un habitant de {city} cherche vos services, c'est offrir ce client à vos concurrents.
                        </p>
                        <p>
                            En tant que <strong className="text-ink">consultante SEO freelance spécialisée sur la région {cityData.department}</strong>, j'accompagne les PME, artisans, professions libérales et commerces de {city} dans leur conquête de visibilité Google. Mon approche combine expertise technique, connaissance du marché local et méthodologie éprouvée pour des résultats mesurables.
                        </p>
                        <p>
                            Contrairement aux grandes agences parisiennes, je vous offre un <strong className="text-ink">accompagnement personnalisé et de proximité</strong>. Je peux vous rencontrer physiquement, visiter votre établissement, comprendre votre clientèle et adapter ma stratégie à vos contraintes réelles. Cette approche sur-mesure fait toute la différence.
                        </p>
                    </div>
                    {customContent}
                </div>
            </section>

            {/* Les 3 Piliers Locaux */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <p className="text-sauge font-bold tracking-[0.2em] uppercase mb-4 text-sm">Expertise</p>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">
                            Les <span className="text-sauge">3 piliers</span> du SEO local à {city}
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:border-sauge/30 transition-all group"
                        >
                            <MapPin className="w-10 h-10 text-sauge mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-3">Google Business Profile {city}</h3>
                            <p className="text-soft text-sm leading-relaxed">
                                Optimisation complète de votre fiche d'établissement : catégories, attributs, photos professionnelles, posts réguliers et gestion des avis pour apparaître dans le <strong>Pack Local</strong> de Google.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:border-sauge/30 transition-all group"
                        >
                            <Search className="w-10 h-10 text-sauge mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-3">Mots-clés Géolocalisés</h3>
                            <p className="text-soft text-sm leading-relaxed">
                                Positionnement sur des requêtes stratégiques comme "votre métier + {city}" qui convertissent <strong>3x plus</strong> que les requêtes génériques. Ciblage des quartiers et zones spécifiques.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:border-sauge/30 transition-all group"
                        >
                            <Users className="w-10 h-10 text-sauge mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-3">Autorité Locale</h3>
                            <p className="text-soft text-sm leading-relaxed">
                                Acquisition de liens (backlinks) depuis des partenaires locaux, annuaires professionnels et presse régionale pour <strong>asseoir votre crédibilité</strong> aux yeux de Google.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Méthodologie */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <p className="text-sauge font-bold tracking-[0.2em] uppercase mb-4 text-sm">Méthodologie</p>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">
                            Mon accompagnement SEO à <span className="text-sauge">{city}</span>
                        </h2>
                    </div>
                    <div className="max-w-4xl mx-auto space-y-4">
                        {METHODOLOGY.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all flex gap-6 items-start group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-sauge font-bold text-xl shadow-sm group-hover:bg-sauge group-hover:text-white transition-all shrink-0">
                                    {item.step}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-ink mb-2">{item.title}</h3>
                                    <p className="text-soft">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Le SEO local <span className="text-sauge">en chiffres</span>
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            Des statistiques qui prouvent l'importance du référencement local pour votre entreprise à {city}.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10">
                            <p className="text-4xl font-bold text-sauge mb-2">46%</p>
                            <p className="text-sm text-white/60">Des recherches Google sont locales</p>
                        </div>
                        <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10">
                            <p className="text-4xl font-bold text-sauge mb-2">78%</p>
                            <p className="text-sm text-white/60">Aboutissent à un achat en 24h</p>
                        </div>
                        <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10">
                            <p className="text-4xl font-bold text-sauge mb-2">88%</p>
                            <p className="text-sm text-white/60">Font confiance aux avis Google</p>
                        </div>
                        <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10">
                            <p className="text-4xl font-bold text-sauge mb-2">x5</p>
                            <p className="text-sm text-white/60">ROI moyen constaté</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Liés - Maillage Interne */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <p className="text-sauge font-bold tracking-[0.2em] uppercase mb-4 text-sm">Expertise Complète</p>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">
                            Mes autres <span className="text-sauge">services</span> à {city}
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {RELATED_SERVICES.map((service, i) => (
                            <Link key={i} href={service.href}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-sauge/30 transition-all group h-full"
                                >
                                    <h3 className="text-lg font-bold text-ink mb-2 group-hover:text-sauge transition-colors">{service.title}</h3>
                                    <p className="text-soft text-sm">{service.desc}</p>
                                    <div className="mt-4 flex items-center gap-2 text-sauge text-sm font-bold">
                                        En savoir plus <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <FAQ items={FAQ_ITEMS} title={`Questions Fréquentes - SEO ${city}`} />

            {/* Maillage Zones d'intervention */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-lg font-bold text-ink mb-6">J'interviens également sur</h3>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-soft">
                        {OTHER_CITIES.map((c, i) => (
                            <span key={c.name} className="flex items-center gap-4">
                                {i > 0 && <span>•</span>}
                                <Link
                                    href={c.href}
                                    className="hover:text-sauge transition-colors font-medium"
                                >
                                    Consultant SEO {c.name}
                                </Link>
                            </span>
                        ))}
                    </div>
                    <div className="mt-8">
                        <Link href="/seo-local" className="text-sauge font-bold text-sm hover:underline">
                            ← Découvrir ma méthodologie SEO Local complète
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="bg-ink p-12 md:p-16 rounded-3xl text-white">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                            Prêt à dominer Google à <span className="text-sauge">{city}</span> ?
                        </h2>
                        <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
                            Audit SEO local offert pour les entreprises de {city} et sa région. Découvrez votre potentiel de croissance en 15 minutes.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                onClick={openAuditModal}
                                className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-10 py-7 text-lg font-bold"
                            >
                                Audit Gratuit {city}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Link href="/contact">
                                <Button
                                    variant="outline"
                                    className="border-2 border-white text-white hover:bg-white hover:text-ink rounded-full px-10 py-7 text-lg font-bold"
                                >
                                    Me contacter
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
