"use client";

import Link from "next/link";
import { useState } from "react";
import { Linkedin, Mail, Phone, MapPin, ChevronDown, ArrowRight } from "lucide-react";
import Image from "next/image";

// Toutes les villes organisées par région pour le maillage interne complet
const CITIES_BY_REGION = [
    {
        region: "Côte d'Azur",
        cities: [
            { name: "Nice", slug: "/seo-nice" },
            { name: "Cannes", slug: "/seo-cannes" },
            { name: "Antibes", slug: "/seo-antibes" },
            { name: "Monaco", slug: "/seo-monaco" },
            { name: "Sophia-Antipolis", slug: "/seo-sophia-antipolis" },
        ]
    },
    {
        region: "PACA",
        cities: [
            { name: "Marseille", slug: "/seo-marseille" },
            { name: "Aix-en-Provence", slug: "/seo-aix-en-provence" },
        ]
    },
    {
        region: "Île-de-France",
        cities: [
            { name: "Paris", slug: "/seo-paris" },
            { name: "Boulogne-Billancourt", slug: "/seo-boulogne-billancourt" },
        ]
    },
    {
        region: "Rhône-Alpes",
        cities: [
            { name: "Lyon", slug: "/seo-lyon" },
            { name: "Grenoble", slug: "/seo-grenoble" },
        ]
    },
    {
        region: "Sud-Ouest",
        cities: [
            { name: "Toulouse", slug: "/seo-toulouse" },
            { name: "Bordeaux", slug: "/seo-bordeaux" },
            { name: "Montpellier", slug: "/seo-montpellier" },
        ]
    },
    {
        region: "Ouest & Nord",
        cities: [
            { name: "Nantes", slug: "/seo-nantes" },
            { name: "Rennes", slug: "/seo-rennes" },
            { name: "Lille", slug: "/seo-lille" },
            { name: "Strasbourg", slug: "/seo-strasbourg" },
        ]
    }
];

const SERVICES = [
    { title: "Audit SEO", href: "/audit-seo", description: "Diagnostic complet" },
    { title: "Référencement Naturel", href: "/referencement-naturel", description: "Stratégie SEO" },
    { title: "SEO Local", href: "/seo-local", description: "Visibilité géolocalisée" },
    { title: "Création Site Web", href: "/creation-site-web", description: "Sites performants" },
    { title: "Refonte Site Web", href: "/refonte-site-web", description: "Migration SEO" },
    { title: "Community Manager", href: "/community-manager", description: "Réseaux sociaux" },
];

const LEGAL = [
    { title: "Mentions légales", href: "/mentions-legales" },
    { title: "Confidentialité", href: "/confidentialite" },
    { title: "CGV", href: "/cgv" },
];

export function MegaFooter() {
    const [showAllCities, setShowAllCities] = useState(false);

    return (
        <footer className="bg-ink text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                            <Image
                                src="/images/logo-indhack.png"
                                alt="IndHack - Consultante SEO"
                                width={40}
                                height={40}
                                className="group-hover:scale-110 transition-transform"
                            />
                            <span className="text-2xl font-heading font-bold">INDHACK</span>
                        </Link>
                        <p className="text-white/60 text-sm mb-6 leading-relaxed">
                            <strong className="text-white/80">Consultante SEO indépendante</strong> spécialisée en{" "}
                            <Link href="/" className="text-sauge hover:text-white transition-colors">
                                référencement naturel
                            </Link>{" "}
                            et stratégie de croissance digitale.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3 mb-6">
                            <a
                                href="https://www.linkedin.com/in/indianaaflalo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#0077B5] transition-all"
                                aria-label="LinkedIn Indiana Aflalo"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:contact@indhack.com"
                                className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-sauge transition-all"
                                aria-label="Email contact@indhack.com"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                            <a
                                href="tel:0661139748"
                                className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-sauge transition-all"
                                aria-label="Téléphone 06 61 13 97 48"
                            >
                                <Phone className="w-5 h-5" />
                            </a>
                        </div>

                        {/* Contact CTA */}
                        <div className="space-y-2">
                            <a
                                href="tel:0661139748"
                                className="flex items-center gap-2 text-white hover:text-sauge transition-colors text-lg font-bold"
                            >
                                <Phone className="w-5 h-5 text-sauge" />
                                06 61 13 97 48
                            </a>
                            <a
                                href="mailto:contact@indhack.com"
                                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                            >
                                <Mail className="w-4 h-4" />
                                contact@indhack.com
                            </a>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-sauge mb-6 flex items-center gap-2">
                            Expertises SEO
                        </h4>
                        <ul className="space-y-3">
                            {SERVICES.map(link => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-start gap-2 text-white/60 hover:text-white transition-colors"
                                    >
                                        <ArrowRight className="w-4 h-4 mt-0.5 text-sauge opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div>
                                            <span className="font-medium">{link.title}</span>
                                            <span className="block text-xs text-white/40">{link.description}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cities Column - Expanded */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="font-bold text-sm uppercase tracking-wider text-sauge flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                SEO Local France
                            </h4>
                            <button
                                onClick={() => setShowAllCities(!showAllCities)}
                                className="text-xs text-white/40 hover:text-white flex items-center gap-1 transition-colors"
                            >
                                {showAllCities ? "Réduire" : "Voir tout"}
                                <ChevronDown className={`w-4 h-4 transition-transform ${showAllCities ? "rotate-180" : ""}`} />
                            </button>
                        </div>

                        {/* Grid of regions */}
                        <div className={`grid grid-cols-2 md:grid-cols-3 gap-6 ${!showAllCities ? "max-h-48 overflow-hidden" : ""}`}>
                            {CITIES_BY_REGION.map((region) => (
                                <div key={region.region}>
                                    <p className="text-xs font-bold text-white/30 uppercase tracking-wider mb-2">
                                        {region.region}
                                    </p>
                                    <ul className="space-y-1">
                                        {region.cities.map(city => (
                                            <li key={city.slug}>
                                                <Link
                                                    href={city.slug}
                                                    className="text-sm text-white/60 hover:text-sauge transition-colors"
                                                >
                                                    SEO {city.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Gradient overlay when collapsed */}
                        {!showAllCities && (
                            <div className="relative -mt-12 pt-12 bg-gradient-to-t from-ink to-transparent">
                                <Link
                                    href="/seo-local"
                                    className="inline-flex items-center gap-2 text-sauge hover:text-white transition-colors text-sm font-bold"
                                >
                                    Voir toutes les villes
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )}

                        {showAllCities && (
                            <div className="mt-6">
                                <Link
                                    href="/seo-local"
                                    className="inline-flex items-center gap-2 bg-sauge/20 hover:bg-sauge text-sauge hover:text-white px-4 py-2 rounded-full transition-all text-sm font-bold"
                                >
                                    Page SEO Local complète
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Legal Links */}
                        <div className="flex flex-wrap justify-center gap-6">
                            {LEGAL.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-xs uppercase tracking-widest text-white/30 hover:text-white transition-colors"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>

                        {/* Copyright with homepage backlink */}
                        <p className="text-xs text-white/20 text-center">
                            © {new Date().getFullYear()}{" "}
                            <Link href="/" className="hover:text-sauge transition-colors">
                                IndHack - Experte en référencement naturel
                            </Link>
                            {" "}• France
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
