"use client";

import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { getNeighborCities } from "@/lib/city-neighbors";
import { FRENCH_CITIES } from "@/lib/cities-data";

interface NearbyLinksProps {
    city: string;
    title?: string;
    maxLinks?: number;
    variant?: "compact" | "full";
}

/**
 * Composant affichant les villes voisines pour le maillage interne SEO
 * Utilisé sur les pages villes pour créer des liens vers les pages locales proches
 */
export function NearbyLinks({
    city,
    title,
    maxLinks = 6,
    variant = "compact"
}: NearbyLinksProps) {
    // Récupérer les villes voisines
    const neighborSlugs = getNeighborCities(city);

    // Trouver les données complètes des villes voisines
    const neighborCities = neighborSlugs
        .map(slug => FRENCH_CITIES.find(c => c.slug === `consultant-seo-${slug}` || c.name.toLowerCase() === slug))
        .filter(Boolean)
        .slice(0, maxLinks);

    // Si pas de villes voisines dans la config, utiliser les villes de la même région
    const currentCity = FRENCH_CITIES.find(c =>
        c.slug === `consultant-seo-${city}` ||
        c.name.toLowerCase() === city
    );

    const displayCities = neighborCities.length > 0
        ? neighborCities
        : currentCity
            ? FRENCH_CITIES
                .filter(c => c.region === currentCity.region && c.name !== currentCity.name)
                .slice(0, maxLinks)
            : [];

    if (displayCities.length === 0) return null;

    // Formater le nom de la ville pour le titre
    const cityName = currentCity?.name || city.charAt(0).toUpperCase() + city.slice(1);
    const displayTitle = title || `Consultant SEO près de ${cityName}`;

    if (variant === "compact") {
        return (
            <div className="py-6 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-2 text-sm text-soft font-medium">
                            <MapPin className="w-4 h-4 text-sauge" />
                            {displayTitle} :
                        </span>
                        {displayCities.map((c, i) => (
                            <span key={c!.slug} className="inline-flex items-center">
                                <Link
                                    href={`/${c!.slug}`}
                                    className="text-sm text-sauge hover:text-ink hover:underline transition-colors"
                                >
                                    {c!.name}
                                </Link>
                                {i < displayCities.length - 1 && (
                                    <span className="text-gray-300 mx-1">•</span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Variant "full" - grille de cards
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h3 className="text-xl font-heading font-bold text-ink flex items-center justify-center gap-2">
                        <MapPin className="w-5 h-5 text-sauge" />
                        {displayTitle}
                    </h3>
                    <p className="text-soft text-sm mt-2">
                        J'interviens également dans ces villes proches
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
                    {displayCities.map((c) => (
                        <Link key={c!.slug} href={`/${c!.slug}`}>
                            <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-sauge hover:shadow-md transition-all group text-center">
                                <span className="font-medium text-ink group-hover:text-sauge transition-colors text-sm">
                                    {c!.name}
                                </span>
                                <ArrowRight className="w-3 h-3 mx-auto mt-2 text-sauge opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
