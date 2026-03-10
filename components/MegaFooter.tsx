"use client";

import Link from "next/link";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

// ══════════════════════════════════════════════════════════════
// COLONNE 1 — Expertises SEO (7 services)
// ══════════════════════════════════════════════════════════════
const SERVICES = [
    { title: "Consultante SEO Freelance", href: "/consultant-seo" },
    { title: "Audit SEO Complet", href: "/audit-seo" },
    { title: "Référencement Naturel", href: "/referencement-naturel" },
    { title: "SEO Local", href: "/seo-local" },
    { title: "Consultant IA & Automatisation", href: "/consultant-ia" },
    { title: "Création de Site Web", href: "/creation-site-web" },
    { title: "Refonte de Site Web", href: "/refonte-site-web" },
    { title: "Création boutique e-commerce", href: "/creation-boutique-en-ligne" },
];

// ══════════════════════════════════════════════════════════════
// COLONNE 2 — SEO Local France (top 20 villes)
// ══════════════════════════════════════════════════════════════
const CITIES = [
    { name: "Nice", href: "/consultant-seo-nice" },
    { name: "Paris", href: "/consultant-seo-paris" },
    { name: "Lyon", href: "/consultant-seo-lyon" },
    { name: "Marseille", href: "/consultant-seo-marseille" },
    { name: "Toulouse", href: "/consultant-seo-toulouse" },
    { name: "Bordeaux", href: "/consultant-seo-bordeaux" },
    { name: "Nantes", href: "/consultant-seo-nantes" },
    { name: "Montpellier", href: "/consultant-seo-montpellier" },
    { name: "Lille", href: "/consultant-seo-lille" },
    { name: "Strasbourg", href: "/consultant-seo-strasbourg" },
    { name: "Rennes", href: "/consultant-seo-rennes" },
    { name: "Grenoble", href: "/consultant-seo-grenoble" },
    { name: "Cannes", href: "/consultant-seo-cannes" },
    { name: "Antibes", href: "/consultant-seo-antibes" },
    { name: "Monaco", href: "/consultant-seo-monaco" },
    { name: "Sophia-Antipolis", href: "/consultant-seo-sophia-antipolis" },
    { name: "Aix-en-Provence", href: "/consultant-seo-aix-en-provence" },
    { name: "Boulogne-Billancourt", href: "/consultant-seo-boulogne-billancourt" },
];

// ══════════════════════════════════════════════════════════════
// COLONNE 3 — Ressources
// ══════════════════════════════════════════════════════════════
const RESOURCES = [
    { title: "Outils SEO Gratuits", href: "/outils" },
    { title: "Blog SEO", href: "/blog" },
    { title: "Études de cas", href: "/etudes-de-cas" },
    { title: "FAQ", href: "/faq" },
    { title: "À propos", href: "/a-propos" },
    { title: "Widget Agence Gratuit 🎁", href: "/partenaires" },
];

// ══════════════════════════════════════════════════════════════
// MENTIONS LÉGALES (bottom bar)
// ══════════════════════════════════════════════════════════════
const LEGAL = [
    { title: "Mentions légales", href: "/mentions-legales" },
    { title: "Confidentialité", href: "/confidentialite" },
    { title: "CGV", href: "/cgv" },
];

export function MegaFooter() {
    return (
        <footer className="bg-ink text-white">
            {/* Main Footer Content - 4 Colonnes */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

                    {/* ══════════════════════════════════════════════════════════════
                        COLONNE 1 — Expertises SEO
                    ══════════════════════════════════════════════════════════════ */}
                    <div>
                        <p className="font-bold text-sm uppercase tracking-wider text-sauge-light mb-6">
                            Expertises SEO
                        </p>
                        <ul className="space-y-3">
                            {SERVICES.map(service => (
                                <li key={service.href}>
                                    <Link
                                        href={service.href}
                                        className="text-sm text-soft-light hover:text-white transition-colors"
                                    >
                                        {service.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ══════════════════════════════════════════════════════════════
                        COLONNE 2 — SEO Local France (20 villes en 2 sous-colonnes)
                    ══════════════════════════════════════════════════════════════ */}
                    <div>
                        <p className="font-bold text-sm uppercase tracking-wider text-sauge-light mb-6 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            SEO Local France
                        </p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {CITIES.map(city => (
                                <Link
                                    key={city.href}
                                    href={city.href}
                                    className="text-sm text-soft-light hover:text-sauge-light transition-colors"
                                >
                                    {city.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ══════════════════════════════════════════════════════════════
                        COLONNE 3 — Ressources
                    ══════════════════════════════════════════════════════════════ */}
                    <div>
                        <p className="font-bold text-sm uppercase tracking-wider text-sauge-light mb-6">
                            Ressources
                        </p>
                        <ul className="space-y-3">
                            {RESOURCES.map(resource => (
                                <li key={resource.href}>
                                    <Link
                                        href={resource.href}
                                        className="text-sm text-soft-light hover:text-white transition-colors"
                                    >
                                        {resource.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ══════════════════════════════════════════════════════════════
                        COLONNE 4 — Contact
                    ══════════════════════════════════════════════════════════════ */}
                    <div>
                        <p className="font-bold text-sm uppercase tracking-wider text-sauge-light mb-6">
                            Contact
                        </p>

                        {/* Logo + Description */}
                        <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
                            <Image
                                src="/images/logo-indhack.webp"
                                alt="IndHack - Consultante SEO"
                                width={32}
                                height={32}
                                className="group-hover:scale-110 transition-transform"
                            />
                            <span className="text-lg font-heading font-bold">IndHack</span>
                        </Link>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            <a
                                href="tel:0661139748"
                                className="flex items-center gap-3 text-white hover:text-sauge-light transition-colors"
                            >
                                <Phone className="w-4 h-4 text-sauge-light" />
                                <span className="font-bold">06 61 13 97 48</span>
                            </a>
                            <a
                                href="mailto:contact@indhack.com"
                                className="flex items-center gap-3 text-soft-light hover:text-white transition-colors text-sm"
                            >
                                <Mail className="w-4 h-4 text-sauge-light" />
                                contact@indhack.com
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a
                                href="https://www.linkedin.com/in/indianaaflalo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[#0077B5] transition-all"
                                aria-label="LinkedIn Indiana Aflalo"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:contact@indhack.com"
                                className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-sauge transition-all"
                                aria-label="Email contact@indhack.com"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                            <a
                                href="tel:0661139748"
                                className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-sauge transition-all"
                                aria-label="Téléphone 06 61 13 97 48"
                            >
                                <Phone className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                Bottom Bar — Mentions légales + Copyright
            ══════════════════════════════════════════════════════════════ */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Legal Links */}
                        <div className="flex flex-wrap justify-center gap-6">
                            {LEGAL.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-xs text-soft-light hover:text-white transition-colors"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>

                        {/* Copyright */}
                        <p className="text-xs text-soft-light text-center">
                            © {new Date().getFullYear()}{" "}
                            <Link href="/" className="hover:text-sauge-light transition-colors">
                                IndHack - Consultante SEO
                            </Link>
                            {" "}• Nice, France
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
