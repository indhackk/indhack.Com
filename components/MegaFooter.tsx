"use client";

import Link from "next/link";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

// Villes principales pour le maillage (allégé)
const MAIN_CITIES = [
    { name: "Nice", slug: "/seo-nice" },
    { name: "Cannes", slug: "/seo-cannes" },
    { name: "Marseille", slug: "/seo-marseille" },
    { name: "Paris", slug: "/seo-paris" },
    { name: "Lyon", slug: "/seo-lyon" },
    { name: "Bordeaux", slug: "/seo-bordeaux" },
];

const SERVICES = [
    { title: "Audit SEO", href: "/audit-seo" },
    { title: "Référencement Naturel", href: "/referencement-naturel" },
    { title: "SEO Local", href: "/seo-local" },
    { title: "Création Site Web", href: "/creation-site-web" },
];

const LEGAL = [
    { title: "Mentions légales", href: "/mentions-legales" },
    { title: "Confidentialité", href: "/confidentialite" },
    { title: "CGV", href: "/cgv" },
];

export function MegaFooter() {
    return (
        <footer className="bg-ink text-white">
            <div className="container mx-auto px-4 py-12">
                {/* Grid compact */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-2 mb-4">
                            <Image
                                src="/images/logo-indhack.png"
                                alt="INDHACK"
                                width={32}
                                height={32}
                            />
                            <span className="text-xl font-heading font-bold">INDHACK</span>
                        </Link>
                        <p className="text-white/50 text-xs mb-4 leading-relaxed">
                            <strong className="text-white/70">Consultante SEO</strong> experte en <strong className="text-white/70">référencement naturel</strong> et visibilité Google.
                        </p>
                        <div className="flex gap-2">
                            <a
                                href="https://www.linkedin.com/in/indianaaflalo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[#0077B5] transition-all"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href="mailto:contact@indhack.com"
                                className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-sauge transition-all"
                                aria-label="Email"
                            >
                                <Mail className="w-4 h-4" />
                            </a>
                            <a
                                href="tel:0661139748"
                                className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-sauge transition-all"
                                aria-label="Téléphone"
                            >
                                <Phone className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-sauge mb-4">Expertises</h4>
                        <ul className="space-y-2">
                            {SERVICES.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-xs text-white/60 hover:text-white transition-colors">
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Zones SEO Local */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-sauge mb-4 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            SEO Local
                        </h4>
                        <ul className="space-y-2">
                            {MAIN_CITIES.map(city => (
                                <li key={city.slug}>
                                    <Link href={city.slug} className="text-xs text-white/60 hover:text-white transition-colors">
                                        SEO {city.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link href="/seo-local" className="text-xs text-sauge hover:text-white transition-colors font-medium">
                                    Toutes les villes →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-sauge mb-4">Contact</h4>
                        <div className="space-y-3">
                            <a
                                href="tel:0661139748"
                                className="flex items-center gap-2 text-white hover:text-sauge transition-colors text-sm font-bold"
                            >
                                <Phone className="w-4 h-4 text-sauge" />
                                06 61 13 97 48
                            </a>
                            <a
                                href="mailto:contact@indhack.com"
                                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs"
                            >
                                <Mail className="w-4 h-4" />
                                contact@indhack.com
                            </a>
                            <Link href="/contact" className="inline-block mt-2 text-xs bg-sauge text-white px-4 py-2 rounded-lg hover:bg-white hover:text-ink transition-all font-bold">
                                Audit Gratuit
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
                        <div className="flex flex-wrap justify-center gap-4">
                            {LEGAL.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-white/20">
                            © {new Date().getFullYear()} INDHACK • Consultante SEO France
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
