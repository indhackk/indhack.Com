"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, ArrowRight, ChevronDown, Search, Bot, Code2, MapPin, FileCode, Type } from "lucide-react";
import { useModal } from "@/components/providers/ModalProvider";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SERVICES = [
    { title: "Consultant SEO", href: "/consultant-seo", desc: "Accompagnement SEO pour développer votre visibilité.", category: "seo" },
    { title: "Audit SEO", href: "/audit-seo", desc: "Analyse technique et sémantique profonde.", category: "seo" },
    { title: "Référencement naturel", href: "/referencement-naturel", desc: "Stratégie d'acquisition durable sur Google.", category: "seo" },
    { title: "SEO local", href: "/seo-local", desc: "Renforcez votre présence sur Google Maps et le Pack Local.", category: "seo" },
    { title: "Consultant GEO", href: "/consultant-geo", desc: "Visibilité sur ChatGPT, Perplexity et les IA.", category: "ia" },
    { title: "Consultant IA", href: "/consultant-ia", desc: "Intégration IA et automatisation entreprise.", category: "ia" },
    { title: "Création de site web", href: "/creation-site-web", desc: "Sites haute performance optimisés SEO.", category: "web" },
    { title: "Refonte de site", href: "/refonte-site-web", desc: "Migrez sans perdre votre visibilité.", category: "web" },
    { title: "Boutique e-commerce", href: "/creation-boutique-en-ligne", desc: "Vendez en ligne avec un site optimisé.", category: "web" },
];

const TOOLS = [
    { title: "Testeur de visibilité IA", href: "/outils/testeur-visibilite-ia", desc: "ChatGPT vous trouve-t-il ?", icon: Bot, status: "live" },
    { title: "Audit SEO gratuit", href: "/outils/audit-seo-gratuit", desc: "Score /100 en 30 secondes", icon: Search, status: "live" },
    { title: "Extracteur de mots-clés", href: "/outils/extracteur-mots-cles", desc: "Analysez densité et n-grammes", icon: Type, status: "live" },
    { title: "Générateur robots.txt", href: "/outils/generateur-robots-txt", desc: "Crawlers IA 2026 inclus", icon: FileCode, status: "live" },
    { title: "Générateur Schema", href: "/outils/generateur-schema-json-ld", desc: "Données structurées en 1 clic", icon: Code2, status: "live" },
    { title: "Simulateur local", href: "/outils/simulateur-visibilite-locale", desc: "Qui domine votre ville ?", icon: MapPin, status: "live" },
];

// Top villes par performance GSC réelle (impressions) — distribuent le jus depuis chaque page
const TOP_CITIES = [
    { name: "Nice", href: "/consultant-seo-nice" },
    { name: "Cannes", href: "/consultant-seo-cannes" },
    { name: "Sophia-Antipolis", href: "/consultant-seo-sophia-antipolis" },
    { name: "Monaco", href: "/consultant-seo-monaco" },
    { name: "Paris", href: "/consultant-seo-paris" },
    { name: "Strasbourg", href: "/consultant-seo-strasbourg" },
    { name: "Grenoble", href: "/consultant-seo-grenoble" },
    { name: "Lyon", href: "/consultant-seo-lyon" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const { openAuditModal } = useModal();
    const pathname = usePathname();
    const servicesTimeoutRef = useRef<NodeJS.Timeout>();
    const toolsTimeoutRef = useRef<NodeJS.Timeout>();
    const burgerButtonRef = useRef<HTMLButtonElement | null>(null);
    const closeMenuButtonRef = useRef<HTMLButtonElement | null>(null);

    const isLightPage = pathname?.startsWith('/blog');
    const useDarkMenu = isScrolled || isLightPage;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Accessibilité du menu mobile : Escape ferme, focus piégé dedans, lock
    // scroll body, restauration du focus sur le bouton burger à la fermeture.
    useEffect(() => {
        if (!isMobileMenuOpen) return;

        // Snapshot des refs pour la phase cleanup (eslint react-hooks/exhaustive-deps).
        const burgerButton = burgerButtonRef.current;
        const closeButton = closeMenuButtonRef.current;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const focusTimer = window.setTimeout(() => {
            closeButton?.focus();
        }, 50);

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
            window.clearTimeout(focusTimer);
            // Restaure le focus sur le bouton burger qui a déclenché l'ouverture.
            burgerButton?.focus();
        };
    }, [isMobileMenuOpen]);

    // Ferme le menu mobile au changement de route. Évite que le menu reste
    // ouvert quand on clique un lien et que la navigation se fait.
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleServicesEnter = () => {
        if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
        setIsServicesOpen(true);
    };

    const handleServicesLeave = () => {
        servicesTimeoutRef.current = setTimeout(() => setIsServicesOpen(false), 150);
    };

    const handleToolsEnter = () => {
        if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
        setIsToolsOpen(true);
    };

    const handleToolsLeave = () => {
        toolsTimeoutRef.current = setTimeout(() => setIsToolsOpen(false), 150);
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-slideDown ${isScrolled
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
                                    src="/images/logo-indhack.webp"
                                    alt="IndHack"
                                    width={40}
                                    height={40}
                                    priority
                                    className="group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out"
                                />
                            </div>
                            <span className={`font-heading font-bold text-2xl tracking-tighter transition-colors ${useDarkMenu ? 'text-ink' : 'text-white'}`}>
                                IndHack
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <div
                                className="relative group"
                                onMouseEnter={handleServicesEnter}
                                onMouseLeave={handleServicesLeave}
                            >
                                <button
                                    className={`flex items-center gap-1.5 py-4 text-sm font-bold tracking-wide transition-colors ${useDarkMenu ? 'text-ink' : 'text-white'} hover:text-sauge`}
                                    aria-expanded={isServicesOpen}
                                    aria-haspopup="true"
                                >
                                    Expertises <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <div
                                    className={`absolute top-full left-1/2 -translate-x-1/2 w-[min(90vw,850px)] bg-white rounded-2xl shadow-2xl border border-line p-4 lg:p-6 transition-all duration-200 ${isServicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                                        }`}
                                >
                                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
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
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-line">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-bold text-soft tracking-widest uppercase">SEO local par ville</span>
                                            <Link href="/seo-local" className="text-xs text-sauge font-medium hover:underline">
                                                Toutes les villes &rarr;
                                            </Link>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {TOP_CITIES.map((city) => (
                                                <Link
                                                    key={city.href}
                                                    href={city.href}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-sauge/10 text-xs font-semibold text-ink hover:text-sauge transition-colors"
                                                >
                                                    <MapPin className="w-3 h-3 text-sauge" />
                                                    {city.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Outils Dropdown */}
                            <div
                                className="relative group"
                                onMouseEnter={handleToolsEnter}
                                onMouseLeave={handleToolsLeave}
                            >
                                <button
                                    className={`flex items-center gap-1.5 py-4 text-sm font-bold tracking-wide transition-colors ${useDarkMenu ? 'text-ink' : 'text-white'} hover:text-sauge`}
                                    aria-expanded={isToolsOpen}
                                    aria-haspopup="true"
                                >
                                    Outils <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isToolsOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <div
                                    className={`absolute top-full left-1/2 -translate-x-1/2 w-[min(90vw,700px)] bg-white rounded-2xl shadow-2xl border border-line p-4 lg:p-6 transition-all duration-200 ${isToolsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
                                        <span className="text-xs font-bold text-soft tracking-widest uppercase">Outils SEO gratuits</span>
                                        <Link href="/outils" className="text-xs text-sauge font-medium hover:underline">
                                            Voir tous les outils &rarr;
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {TOOLS.map((tool) => {
                                            const Icon = tool.icon;
                                            const isLive = tool.status === "live";
                                            return (
                                                <Link
                                                    key={tool.href}
                                                    href={isLive ? tool.href : "/outils"}
                                                    className={`flex items-start gap-3 p-3 rounded-xl transition-all ${isLive ? 'hover:bg-gray-50' : 'opacity-50'}`}
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-sauge/10 flex items-center justify-center flex-shrink-0">
                                                        <Icon className="w-4 h-4 text-sauge" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-ink text-sm flex items-center gap-2">
                                                            {tool.title}
                                                            {!isLive && <span className="text-[10px] bg-gray-100 text-soft px-1.5 py-0.5 rounded">Bientôt</span>}
                                                        </div>
                                                        <div className="text-xs text-soft">{tool.desc}</div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
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
                                <div
                                    className="absolute inset-0 bg-sauge translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                                />
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            ref={burgerButtonRef}
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`lg:hidden p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-xl transition-colors ${useDarkMenu ? 'text-ink hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {isMobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu - Extrait de la nav pour éviter le bug de stacking context (transform) */}
            <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Menu de navigation"
                aria-hidden={!isMobileMenuOpen}
                {...({ inert: !isMobileMenuOpen ? "" : undefined } as Record<string, string | undefined>)}
                className={`lg:hidden fixed inset-0 z-[60] bg-white transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-line">
                        <span className="font-heading font-bold text-2xl tracking-tighter text-ink">IndHack</span>
                        <button
                            ref={closeMenuButtonRef}
                            type="button"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center text-ink"
                            aria-label="Fermer le menu"
                        >
                            <X size={28} aria-hidden="true" />
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
                                    className="block text-lg sm:text-xl font-bold text-ink hover:text-sauge transition-colors"
                                >
                                    {service.title}
                                </Link>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <p className="text-xs font-bold text-soft tracking-widest uppercase">Outils Gratuits</p>
                            {TOOLS.filter(t => t.status === "live").map((tool) => (
                                <Link
                                    key={tool.href}
                                    href={tool.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-lg sm:text-xl font-bold text-ink hover:text-sauge transition-colors"
                                >
                                    {tool.title}
                                </Link>
                            ))}
                            <Link
                                href="/outils"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-lg text-sauge font-medium"
                            >
                                Voir tous les outils &rarr;
                            </Link>
                        </div>

                        <div className="space-y-3">
                            <p className="text-xs font-bold text-soft tracking-widest uppercase">SEO local par ville</p>
                            <div className="flex flex-wrap gap-2">
                                {TOP_CITIES.map((city) => (
                                    <Link
                                        key={city.href}
                                        href={city.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-sm font-semibold text-ink"
                                    >
                                        <MapPin className="w-3 h-3 text-sauge" />
                                        {city.name}
                                    </Link>
                                ))}
                            </div>
                            <Link
                                href="/seo-local"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-sm text-sauge font-medium"
                            >
                                Toutes les villes &rarr;
                            </Link>
                        </div>

                        <div className="space-y-4">
                            <p className="text-xs font-bold text-soft tracking-widest uppercase">Menu</p>
                            <Link href="/a-propos" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg sm:text-xl font-bold text-ink">À propos</Link>
                            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg sm:text-xl font-bold text-ink">Blog</Link>
                            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg sm:text-xl font-bold text-ink">Contact</Link>
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
            </div>
        </>
    );
}

function NavLink({ href, children, isScrolled }: { href: string; children: React.ReactNode; isScrolled: boolean }) {
    return (
        <Link
            href={href}
            className={`relative py-4 px-2 min-h-[48px] flex items-center text-sm font-bold tracking-wide transition-colors group ${isScrolled ? 'text-ink hover:text-sauge' : 'text-white hover:text-white/80'
                }`}
        >
            {children}
            <span className="absolute bottom-2 left-2 right-2 h-0.5 bg-sauge scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </Link>
    );
}
