"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { FRENCH_CITIES } from "@/lib/cities-data";

// Organiser les villes par région pour l'affichage
const REGIONS = [
    {
        name: "Côte d'Azur",
        cities: ["Nice", "Cannes", "Antibes", "Monaco", "Sophia-Antipolis"]
    },
    {
        name: "PACA",
        cities: ["Marseille", "Aix-en-Provence"]
    },
    {
        name: "Île-de-France",
        cities: ["Paris", "Boulogne-Billancourt"]
    },
    {
        name: "Rhône-Alpes",
        cities: ["Lyon", "Grenoble"]
    },
    {
        name: "Sud-Ouest",
        cities: ["Toulouse", "Bordeaux", "Montpellier"]
    },
    {
        name: "Ouest & Nord",
        cities: ["Nantes", "Rennes", "Lille", "Strasbourg"]
    }
];

interface CityCarouselProps {
    title?: string;
    subtitle?: string;
}

export function CityCarousel({
    title = "J'interviens partout en France",
    subtitle = "Consultante SEO à votre service"
}: CityCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 320; // Largeur d'une carte + gap
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="text-sm font-bold tracking-[0.2em] uppercase text-sauge mb-4"
                        >
                            {subtitle}
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="text-3xl md:text-4xl font-heading font-bold text-ink"
                        >
                            {title}
                        </motion.h2>
                    </div>

                    {/* Navigation arrows */}
                    <div className="flex gap-2 mt-6 md:mt-0">
                        <button
                            onClick={() => scroll("left")}
                            className="p-3 bg-white border border-gray-200 rounded-full hover:bg-ink hover:text-white hover:border-ink transition-all"
                            aria-label="Défiler vers la gauche"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-3 bg-white border border-gray-200 rounded-full hover:bg-ink hover:text-white hover:border-ink transition-all"
                            aria-label="Défiler vers la droite"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {REGIONS.map((region, i) => (
                        <motion.div
                            key={region.name}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.1 }}
                            className="flex-shrink-0 w-80 snap-start"
                        >
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 h-full hover:shadow-xl hover:border-sauge/30 transition-all">
                                {/* Region header */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 bg-sauge/10 rounded-lg">
                                        <MapPin className="w-4 h-4 text-sauge" />
                                    </div>
                                    <h3 className="font-bold text-ink">{region.name}</h3>
                                </div>

                                {/* Cities list */}
                                <div className="space-y-2">
                                    {region.cities.map((cityName) => {
                                        const city = FRENCH_CITIES.find(c => c.name === cityName);
                                        if (!city) return null;

                                        return (
                                            <Link
                                                key={city.slug}
                                                href={`/${city.slug}`}
                                                className="flex items-center justify-between p-3 bg-gray-50 hover:bg-sauge/10 rounded-xl transition-colors group"
                                            >
                                                <div>
                                                    <span className="font-medium text-ink group-hover:text-sauge transition-colors">
                                                        SEO {city.name}
                                                    </span>
                                                    <span className="text-xs text-soft block">
                                                        {city.department}
                                                    </span>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-soft group-hover:text-sauge transition-colors" />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.6 }}
                        className="flex-shrink-0 w-80 snap-start"
                    >
                        <div className="bg-ink rounded-3xl p-6 h-full flex flex-col justify-center text-center">
                            <MapPin className="w-12 h-12 text-sauge mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">
                                Votre ville n'est pas listée ?
                            </h3>
                            <p className="text-white/60 text-sm mb-6">
                                J'interviens dans toute la France. Contactez-moi pour discuter de votre projet.
                            </p>
                            <Link
                                href="/seo-local"
                                className="inline-flex items-center justify-center gap-2 bg-sauge text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-ink transition-all"
                            >
                                Voir toutes les villes
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
