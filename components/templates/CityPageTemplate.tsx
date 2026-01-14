"use client";

import { HeroServices } from "@/components/services/HeroServices";
import { FAQ } from "@/components/FAQ";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Users, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";

interface CityPageProps {
    city: string;
    zipCode: string;
    description: string;
    customContent?: React.ReactNode;
}

export function CityPageTemplate({ city, zipCode, description, customContent }: CityPageProps) {
    const { openAuditModal } = useModal();

    const FAQ_ITEMS = [
        {
            question: `Pourquoi un consultant SEO à ${city} plutôt qu'une agence parisienne ?`,
            answer: `La connaissance du marché local est clé. En étant basée dans la région, je comprends les spécificités économiques de ${city} et je peux vous rencontrer physiquement. De plus, vous évitez les frais de structure d'une grosse agence.`
        },
        {
            question: `Combien de temps pour être visible sur "SEO ${city}" ?`,
            answer: "Sur une requête locale peu concurrentielle, les premiers résultats peuvent arriver en 1 à 3 mois. Pour des secteurs très disputés (immobilier, tourisme), comptez 6 mois pour une domination durable."
        },
        {
            question: "Faites-vous uniquement du référencement local ?",
            answer: "Non, je gère aussi des stratégies nationales. Mais commencer par dominer votre ville est souvent la stratégie la plus rentable pour acquérir vos premiers clients organiques."
        }
    ];

    return (
        <main className="bg-white min-h-screen">

            {/* Fil d'Ariane (Breadcrumb) SEO */}
            <div className="bg-gray-50 pt-24 pb-4 px-4">
                <div className="container mx-auto">
                    <nav className="text-sm text-soft flex items-center gap-2">
                        <Link href="/" className="hover:text-sauge transition-colors">Accueil</Link>
                        <span>/</span>
                        <Link href="/seo-local" className="hover:text-sauge transition-colors">SEO Local</Link>
                        <span>/</span>
                        <span className="text-ink font-medium">Consultant {city}</span>
                    </nav>
                </div>
            </div>

            <HeroServices
                title={`Consultant SEO ${city} : Votre Expert Local`}
                subtitle={`Dominez les recherches Google à ${city} (${zipCode}) et attirez plus de clients qualifiés grâce à une stratégie de référencement naturel sur-mesure.`}
                image="seo-dashboard" // On garde une image neutre pro pour l'instant
                category="Référencement Local"
            />

            {/* Intro Locale */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-6">
                        Être visible à <span className="text-sauge">{city}</span>, c'est vital.
                    </h2>
                    <p className="text-lg text-soft leading-relaxed mb-8">
                        {description}
                    </p>
                    {customContent}
                </div>
            </section>

            {/* Les 3 Piliers Locaux */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                            <MapPin className="w-10 h-10 text-sauge mb-6" />
                            <h3 className="text-xl font-bold mb-3">Google Maps ({city})</h3>
                            <p className="text-soft text-sm">Optimisation de votre fiche Business Profile pour apparaître dans le "Pack Local" quand on cherche vos services à {city}.</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                            <Search className="w-10 h-10 text-sauge mb-6" />
                            <h3 className="text-xl font-bold mb-3">Mots-clés Locaux</h3>
                            <p className="text-soft text-sm">Positionnement sur des requêtes précises comme "votre métier + {city}" qui convertissent 3x plus que les requêtes génériques.</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                            <Users className="w-10 h-10 text-sauge mb-6" />
                            <h3 className="text-xl font-bold mb-3">Notoriété Régionale</h3>
                            <p className="text-soft text-sm">Acquisition de liens (backlinks) depuis des partenaires locaux et presse régionale pour asseoir votre autorité.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FAQ items={FAQ_ITEMS} title={`Questions Fréquentes - SEO ${city}`} />

            {/* Maillage Zones d'intervention */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-lg font-bold text-ink mb-6">J'interviens dans toute la région</h3>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-soft">
                        <Link href="/seo-nice" className={`hover:text-sauge transition-colors ${city === 'Nice' ? 'font-bold text-sauge' : ''}`}>SEO Nice</Link>
                        <span>•</span>
                        <Link href="/seo-cannes" className={`hover:text-sauge transition-colors ${city === 'Cannes' ? 'font-bold text-sauge' : ''}`}>SEO Cannes</Link>
                        <span>•</span>
                        <Link href="/seo-antibes" className={`hover:text-sauge transition-colors ${city === 'Antibes' ? 'font-bold text-sauge' : ''}`}>SEO Antibes</Link>
                        {/* On pourra ajouter d'autres villes ici */}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="bg-ink p-12 md:p-16 rounded-3xl text-white">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                            Prêt à devenir le N°1 à <span className="text-sauge">{city}</span> ?
                        </h2>
                        <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
                            Audit SEO offert pour les entreprises de {city}.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                onClick={openAuditModal}
                                className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-10 py-7 text-lg font-bold"
                            >
                                Audit Gratuit {city}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
