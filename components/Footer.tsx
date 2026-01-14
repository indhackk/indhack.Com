"use client";

import Link from "next/link";
import { Linkedin, Mail, Phone, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const FOOTER_LINKS = {
    expertises: [
        { title: "Audit SEO", href: "/audit-seo" },
        { title: "Référencement naturel", href: "/referencement-naturel" },
        { title: "Création de site SEO", href: "/creation-site-web" },
        { title: "Refonte de site", href: "/refonte-site-web" },
    ],
    menu: [
        { title: "Accueil", href: "/" },
        { title: "À propos", href: "/about" },
        { title: "Blog & Ressources", href: "/blog" },
        { title: "Contact", href: "/contact" },
    ],
    legal: [
        { title: "Mentions légales", href: "/mentions-legales" },
        { title: "Confidentialité", href: "/confidentialite" },
        { title: "CGV", href: "/cgv" },
    ]
};

export function Footer() {
    return (
        <footer className="bg-ink text-white">
            <div className="container mx-auto px-4 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    <div className="space-y-8">
                        <Link href="/" className="inline-flex items-center gap-4 group">
                            <Image
                                src="/images/logo-indhack.png"
                                alt="IndHack"
                                width={48}
                                height={48}
                                className="group-hover:rotate-12 transition-transform"
                            />
                            <span className="font-heading font-bold text-2xl tracking-tighter uppercase">IndHack</span>
                        </Link>
                        <p className="text-white/50 text-base leading-relaxed max-w-xs">
                            Expertise en <strong>référencement naturel</strong> et <strong>visibilité IA</strong>.
                            J'accompagne les entreprises dans leur conquête organique et leur transformation digitale.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-sauge mb-10">Expertises</h4>
                        <ul className="space-y-4">
                            {FOOTER_LINKS.expertises.map(link => (
                                <li key={link.href}>
                                    <FooterLink href={link.href}>{link.title}</FooterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-sauge mb-10">Agence</h4>
                        <ul className="space-y-4">
                            {FOOTER_LINKS.menu.map(link => (
                                <li key={link.href}>
                                    <FooterLink href={link.href}>{link.title}</FooterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-sauge mb-10">Restons connectés</h4>
                        <div className="space-y-6">
                            <a
                                href="tel:0661139748"
                                className="flex items-center gap-4 text-white hover:text-sauge transition-colors group"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-sauge group-hover:text-white transition-all">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <span className="font-bold tracking-tight text-lg">06 61 13 97 48</span>
                            </a>

                            <div className="flex gap-4">
                                <a
                                    href="https://www.linkedin.com/in/indianaaflalo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#0077B5] transition-all"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href="mailto:contact@indhack.com"
                                    className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-sauge transition-all"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/5">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-wrap justify-center gap-6">
                            {FOOTER_LINKS.legal.map(link => (
                                <Link key={link.href} href={link.href} className="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors">
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">
                            © {new Date().getFullYear()} IndHack • Expertise SEO & GEO
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-white/60 hover:text-white transition-all text-sm font-bold tracking-tight inline-flex items-center gap-2 group"
        >
            <div className="w-1.5 h-1.5 rounded-full bg-sauge opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            {children}
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
        </Link>
    );
}
