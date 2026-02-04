"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ArrowRight, ChevronDown } from "lucide-react";
import { useModal } from "@/components/providers/ModalProvider";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SERVICES = [
    // SEO & Référencement
    { title: "Audit SEO", href: "/audit-seo", desc: "Analyse technique et sémantique profonde.", category: "seo" },
    { title: "Référencement Naturel", href: "/referencement-naturel", desc: "Stratégie d'acquisition durable sur Google.", category: "seo" },
    { title: "SEO Local", href: "/seo-local", desc: "Dominez Google Maps et le Pack Local.", category: "seo" },
    // Création & Refonte Web
    { title: "Création de Site Web", href: "/creation-site-web", desc: "Sites haute performance optimisés SEO.", category: "web" },
    { title: "Refonte de Site", href: "/refonte-site-web", desc: "Migrez sans perdre votre visibilité.", category: "web" },
    // Communication Digitale
    { title: "Community Manager", href: "/community-manager", desc: "Gestion complète de vos réseaux sociaux.", category: "social" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const { openAuditModal } = useModal();
    const pathname = usePathname();

    // Pages qui nécessitent un menu sombre par défaut (fond clair en haut)
    const isLightPage = pathname?.startsWith('/blog');

    // Le menu doit être sombre si on a scrollé OU si on est sur une page claire
    const useDarkMenu = isScrolled || isLightPage;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-white/80 backdrop-blur-xl border-b border-line shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 lg:h-24">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative p-2">
                            <Image
                                src="/images/logo-indhack.png"
                                alt="IndHack"
                                width={40}
                                height={40}
                                className="group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out"
                            />
                        </div>
                        <span className={`font-heading font-bold text-2xl tracking-tighter transition-colors ${useDarkMenu ? 'text-ink' : 'text-white'}`}>
                            INDHACK
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <div
                            className="relative group"
                            onMouseEnter={() => setIsServicesOpen(true)}
                            onMouseLeave={() => setIsServicesOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-1.5 py-4 text-sm font-bold tracking-wide transition-colors ${useDarkMenu ? 'text-ink' : 'text-white'} hover:text-sauge`}
                                aria-expanded={isServicesOpen}
                                aria-haspopup="true"
                            >
                                Expertises <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isServicesOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 w-[850px] bg-white rounded-2xl shadow-2xl border border-line p-6 grid grid-cols-3 gap-3"
                                    >
                                        {SERVICES.map((service) => (
                                            <Link
                                                key={service.href}
                                                href={service.href}
                                                className="p-4 rounded-xl hover:bg-gray-50 transition-all group/item"
                                            >
                                                <div className="font-bold text-ink group-hover/item:text-sauge transition-colors text-sm">{service.title}</div>
                                                <div className="text-xs text-soft leading-relaxed mt-1">{service.desc}</div>
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <NavLink href="/a-propos" isScrolled={useDarkMenu}>À Propos</NavLink>
                        <NavLink href="/blog" isScrolled={useDarkMenu}>Blog</NavLink>
                        <NavLink href="/contact" isScrolled={useDarkMenu}>Contact</NavLink>
                    </div>

                    {/* Actions */}
                    <div className="hidden lg:flex items-center gap-6">
                        <a
                            href="tel:0661139748"
                            className={`flex items-center gap-2 text-sm font-bold tracking-wider transition-all ${useDarkMenu ? 'text-ink hover:text-sauge' : 'text-white hover:text-white/80'
                                }`}
                        >
                            <Phone className="w-4 h-4 text-sauge" />
                            06 61 13 97 48
                        </a>
                        <Button
                            onClick={openAuditModal}
                            className="bg-white text-sauge hover:bg-sauge hover:text-white border-2 border-transparent hover:border-white/20 rounded-full px-8 py-6 font-bold tracking-wide shadow-lg shadow-black/5 group overflow-hidden relative transition-all"
                        >
                            <span className="relative z-10 flex items-center gap-2 font-bold transition-colors">
                                Audit gratuit
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-sauge translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                            />
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`lg:hidden p-2 rounded-xl transition-colors ${useDarkMenu ? 'text-ink hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                        aria-label="Ouvrir le menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="lg:hidden fixed inset-0 z-50 bg-white"
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between p-6 border-b border-line">
                                <span className="font-heading font-bold text-2xl tracking-tighter text-ink">INDHACK</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-ink" aria-label="Fermer le menu">
                                    <X size={32} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                <div className="space-y-4">
                                    <p className="text-xs font-bold text-soft tracking-widest uppercase">Expertises</p>
                                    {SERVICES.map((service) => (
                                        <Link
                                            key={service.href}
                                            href={service.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block text-2xl font-bold text-ink hover:text-sauge transition-colors"
                                        >
                                            {service.title}
                                        </Link>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <p className="text-xs font-bold text-soft tracking-widest uppercase">Menu</p>
                                    <Link href="/a-propos" onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-bold text-ink">À propos</Link>
                                    <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-bold text-ink">Blog</Link>
                                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-bold text-ink">Contact</Link>
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50 space-y-4">
                                <a
                                    href="tel:0661139748"
                                    className="flex items-center justify-center gap-3 py-4 text-ink font-bold bg-white border border-line rounded-2xl shadow-sm"
                                >
                                    <Phone className="w-5 h-5 text-sauge" />
                                    06 61 13 97 48
                                </a>
                                <Button
                                    className="w-full bg-sauge text-ink hover:bg-ink hover:text-white py-7 rounded-2xl text-lg font-bold shadow-xl shadow-sauge/20"
                                    onClick={() => { setIsMobileMenuOpen(false); openAuditModal(); }}
                                >
                                    Audit gratuit
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

function NavLink({ href, children, isScrolled }: { href: string; children: React.ReactNode; isScrolled: boolean }) {
    return (
        <Link
            href={href}
            className={`relative py-2 text-sm font-bold tracking-wide transition-colors group ${isScrolled ? 'text-ink hover:text-sauge' : 'text-white hover:text-white/80'
                }`}
        >
            {children}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sauge scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </Link>
    );
}

