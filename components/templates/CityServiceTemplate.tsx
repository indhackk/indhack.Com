"use client";

import { HeroServices } from "@/components/services/HeroServices";
import { FAQ } from "@/components/FAQ";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    ArrowRight, CheckCircle2, FileSearch, Target, Zap, TrendingUp,
    Phone, ChevronRight, Cpu, Search, BarChart3, Shield, Globe, Clock,
    Activity, Gauge, Code2, Link2, AlertTriangle, Rocket
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useModal } from "@/components/providers/ModalProvider";
import { CityData, ResolvedCityServiceData } from "@/lib/cities-data";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";

interface CityServiceTemplateProps {
    cityData: CityData;
    serviceData: ResolvedCityServiceData;
}

export function CityServiceTemplate({ cityData, serviceData }: CityServiceTemplateProps) {
    const { openAuditModal } = useModal();
    const city = cityData.name;
    const deptCode = cityData.zipCode.substring(0, 2); // Extract department code (e.g., "06" from "06000")

    // City-specific data for unique content
    const landmarks = cityData.landmarks?.slice(0, 3).join(", ") || "";
    const landmark1 = cityData.landmarks?.[0] || "";
    const landmark2 = cityData.landmarks?.[1] || "";
    const nearbyAreas = cityData.nearbyAreas?.slice(0, 3).join(", ") || "";
    const population = cityData.population || "";
    const cityDescription = cityData.description || "";
    const keyPoint1 = cityData.keyPoints?.[0] || "";
    const keyPoint2 = cityData.keyPoints?.[1] || "";

    // Replace all placeholders in content
    const replacePlaceholders = (text: string) => {
        return text
            .replace(/\{city\}/g, city)
            .replace(/\{citySlug\}/g, cityData.slug)
            .replace(/\{deptCode\}/g, deptCode)
            .replace(/\{department\}/g, cityData.department)
            .replace(/\{region\}/g, cityData.region)
            .replace(/\{population\}/g, population)
            .replace(/\{landmarks\}/g, landmarks)
            .replace(/\{landmark1\}/g, landmark1)
            .replace(/\{landmark2\}/g, landmark2)
            .replace(/\{nearbyAreas\}/g, nearbyAreas)
            .replace(/\{cityDescription\}/g, cityDescription)
            .replace(/\{keyPoint1\}/g, keyPoint1)
            .replace(/\{keyPoint2\}/g, keyPoint2);
    };

    // JSON-LD Service Schema avec images géolocalisées
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `https://indhack.com/${cityData.slug}/${serviceData.slug}#service`,
        "name": replacePlaceholders(serviceData.title) + ` ${city}`,
        "description": replacePlaceholders(serviceData.metaDescription),
        "url": `https://indhack.com/${cityData.slug}/${serviceData.slug}`,
        "provider": {
            "@type": "ProfessionalService",
            "name": "IndHack",
            "url": "https://indhack.com",
            "telephone": "+33661139748",
            "priceRange": "€€",
            "image": "https://indhack.com/images/logo-indhack.webp",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": city,
                "addressRegion": "Provence-Alpes-Côte d'Azur",
                "addressCountry": "FR"
            }
        },
        "areaServed": [
            { "@type": "City", "name": city },
            { "@type": "Country", "name": "France" }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Services SEO",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": serviceData.title
                    }
                }
            ]
        },
        "image": cityData.images ? [
            {
                "@type": "ImageObject",
                "url": `https://indhack.com${cityData.images.hero.src}`,
                "name": cityData.images.hero.title,
                "description": cityData.images.hero.alt,
                "contentLocation": {
                    "@type": "Place",
                    "name": city,
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": cityData.lat,
                        "longitude": cityData.lng
                    }
                }
            },
            {
                "@type": "ImageObject",
                "url": `https://indhack.com${cityData.images.workspace.src}`,
                "name": cityData.images.workspace.title,
                "description": cityData.images.workspace.alt
            },
            {
                "@type": "ImageObject",
                "url": `https://indhack.com${cityData.images.landmark.src}`,
                "name": cityData.images.landmark.title,
                "description": cityData.images.landmark.alt
            }
        ] : []
    };

    // Audit checklist items with icons for visual section
    const auditChecklist = [
        { icon: <Gauge className="w-6 h-6" />, label: "Core Web Vitals", status: "Analyse LCP, FID, CLS" },
        { icon: <Search className="w-6 h-6" />, label: "Indexation Google", status: "Couverture & erreurs" },
        { icon: <Link2 className="w-6 h-6" />, label: "Maillage Interne", status: "Structure & profondeur" },
        { icon: <Code2 className="w-6 h-6" />, label: "Balises HTML", status: "Title, Meta, Hn" },
        { icon: <Activity className="w-6 h-6" />, label: "Crawl Budget", status: "Screaming Frog" },
        { icon: <AlertTriangle className="w-6 h-6" />, label: "Erreurs 4xx/5xx", status: "Détection & fix" },
    ];

    // Related services for internal linking (ancres sémantiques axées "audit" pour éviter cannibalisation)
    const relatedServices = [
        { title: "Audit SEO complet", href: "/audit-seo", desc: "Diagnostic technique + sémantique", icon: <FileSearch className="w-5 h-5" /> },
        { title: `Services SEO ${city}`, href: `/${cityData.slug}`, desc: "Stratégie locale sur-mesure", icon: <Target className="w-5 h-5" /> },
        { title: "Référencement naturel", href: "/referencement-naturel", desc: "Visibilité nationale durable", icon: <TrendingUp className="w-5 h-5" /> },
        { title: "Site web optimisé SEO", href: "/creation-site-web", desc: "Création pensée pour Google", icon: <Globe className="w-5 h-5" /> },
        { title: "Accompagnement SEO", href: "/consultant-seo", desc: "Votre partenaire croissance", icon: <Target className="w-5 h-5" /> }
    ];

    // Articles blog connexes pour le maillage
    const relatedBlogPosts = [
        { title: "L'importance d'un audit SEO", href: "/blog/importance-audit-seo", desc: "Pourquoi auditer votre site" },
        { title: "Devenir visible sur Google", href: "/blog/comment-creer-site-visible-google", desc: "Guide pratique" }
    ];

    return (
        <main className="bg-white min-h-screen">
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />

            {/* Breadcrumb Navigation */}
            <div className="bg-ink pt-24 pb-3 px-4">
                <div className="container mx-auto">
                    <nav className="text-xs text-soft-light flex items-center gap-2 flex-wrap" aria-label="Fil d'ariane">
                        <Link href="/" className="hover:text-sauge transition-colors duration-300">Accueil</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/seo-local" className="hover:text-sauge transition-colors duration-300">SEO Local</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href={`/${cityData.slug}`} className="hover:text-sauge transition-colors duration-300">SEO {city}</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-sauge font-medium">{serviceData.title}</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section - Dark Premium */}
            <HeroServices
                title={replacePlaceholders(serviceData.heroTitle)}
                subtitle={replacePlaceholders(serviceData.heroSubtitle)}
                image="seo-dashboard"
                category={serviceData.category}
                customVisual={
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#1A1A1A]">
                            {/* Fake browser bar */}
                            <div className="bg-[#2A2A2A] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <div className="flex-1 bg-[#1A1A1A] rounded-md px-3 py-1 text-xs text-soft ml-4">
                                    search.google.com/search-console
                                </div>
                            </div>
                            {/* Dashboard content */}
                            <div className="p-6 bg-gradient-to-br from-[#1A1A1A] to-black">
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-white/5 p-4 rounded-xl shadow-sm border border-white/10"
                                    >
                                        <p className="text-2xl font-bold text-[#638576]">98</p>
                                        <p className="text-xs text-soft">Performance</p>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-white/5 p-4 rounded-xl shadow-sm border border-white/10"
                                    >
                                        <p className="text-2xl font-bold text-white">100%</p>
                                        <p className="text-xs text-soft">Indexé</p>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-white/5 p-4 rounded-xl shadow-sm border border-white/10"
                                    >
                                        <p className="text-2xl font-bold text-[#638576]">0</p>
                                        <p className="text-xs text-soft">Erreurs</p>
                                    </motion.div>
                                </div>
                                {/* Fake chart */}
                                <div className="h-32 bg-gradient-to-t from-[#638576]/10 to-transparent rounded-xl flex items-end justify-around px-4 pb-4 border border-white/5">
                                    {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                                            className="w-4 bg-gradient-to-t from-[#638576] to-[#638576]/50 rounded-t-sm"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>


                        {/* Scanning Line Animation - Makes it feel "interactive" */}
                        <motion.div
                            initial={{ top: "0%", opacity: 0 }}
                            animate={{ top: "100%", opacity: [0, 1, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[2px] bg-[#638576] shadow-[0_0_20px_#638576] z-10 pointer-events-none"
                        />

                        {/* Floating badge - Moved OUTSIDE overflow-hidden container with high Z-index */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: 0.8 }}
                            className="absolute -bottom-6 -left-6 bg-white text-ink px-6 py-4 rounded-2xl shadow-2xl z-30 border border-gray-100"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#638576]/10 flex items-center justify-center">
                                    <Rocket className="w-5 h-5 text-[#638576]" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Objectif</p>
                                    <p className="text-[#638576] text-xl font-black">+187% Trafic</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                }
            />





            {/* Main Content Sections with Elegant Side Images */}
            {serviceData.h2Sections.map((section, index) => (
                <section
                    key={index}
                    className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} relative overflow-hidden`}
                >
                    {/* Subtle side accent - Alternating */}
                    {index % 2 === 0 ? (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-[#638576] to-transparent" />
                    ) : (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-[#638576] to-transparent" />
                    )}

                    <div className="container mx-auto px-4">
                        <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center max-w-6xl mx-auto`}>

                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="flex-1"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-[#638576]/10 flex items-center justify-center text-[#638576]">
                                        {index === 0 ? <Search className="w-7 h-7" /> :
                                            index === 1 ? <Target className="w-7 h-7" /> :
                                                index === 2 ? <TrendingUp className="w-7 h-7" /> :
                                                    <Shield className="w-7 h-7" />}
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-heading font-bold text-ink">
                                        {replacePlaceholders(section.title)}
                                    </h2>
                                </div>
                                <div className="text-lg text-soft leading-relaxed mb-8 prose prose-lg max-w-none">
                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{replacePlaceholders(section.content)}</ReactMarkdown>
                                </div>

                                {section.bullets && (
                                    <div className="space-y-3">
                                        {section.bullets.slice(0, 4).map((bullet, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, margin: "-100px" }}
                                                transition={{ delay: i * 0.05 }}
                                                className="flex items-start gap-3"
                                            >
                                                <CheckCircle2 className="w-5 h-5 text-[#638576] shrink-0 mt-0.5" />
                                                <div className="text-sm text-soft leading-relaxed">
                                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{bullet}</ReactMarkdown>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>

                            {/* Elegant Side Image - Dynamique par ville avec métadonnées EXIF géolocalisées */}
                            {index < 3 && cityData.images && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="relative w-full lg:w-[380px] shrink-0"
                                >
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                                        <Image
                                            src={index === 0 ? cityData.images.hero.src :
                                                index === 1 ? cityData.images.workspace.src :
                                                    cityData.images.landmark.src}
                                            alt={index === 0 ? cityData.images.hero.alt :
                                                index === 1 ? cityData.images.workspace.alt :
                                                    cityData.images.landmark.alt}
                                            title={index === 0 ? cityData.images.hero.title :
                                                index === 1 ? cityData.images.workspace.title :
                                                    cityData.images.landmark.title}
                                            width={380}
                                            height={285}
                                            className="w-full h-auto object-cover"
                                            loading={index === 0 ? "eager" : "lazy"}
                                        />
                                    </div>
                                    {/* Decorative accent */}
                                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#638576]/10 rounded-full blur-xl -z-10" />
                                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#638576]/5 rounded-full blur-lg -z-10" />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>
            ))}

            {/* Methodology - Dark Premium Glassmorphism with enhanced visuals */}
            <section className="py-16 md:py-20 bg-ink text-white relative overflow-hidden">
                {/* Enhanced background glow effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#638576]/15 rounded-full blur-[180px]" />
                    <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#638576]/10 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="text-[#638576] font-bold tracking-[0.2em] uppercase mb-4 text-sm"
                        >
                            Ma Méthodologie
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-4xl font-heading font-bold"
                        >
                            Comment je réalise votre <span className="text-[#638576]">{serviceData.title}</span>
                        </motion.h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {serviceData.methodology.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.12 }}
                                whileHover={{ y: -8 }}
                                className="relative"
                            >
                                {/* Glassmorphism card */}
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-7 h-full hover:bg-white/10 hover:border-[#638576]/40 transition-all duration-500 group">
                                    {/* Step number with glow */}
                                    <motion.div
                                        whileHover={{ rotate: 5, scale: 1.1 }}
                                        className="w-14 h-14 rounded-2xl bg-[#638576]/20 border border-[#638576]/30 flex items-center justify-center text-[#638576] font-black text-xl mb-5 group-hover:bg-[#638576] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#638576]/30 transition-all duration-500"
                                    >
                                        {item.step}
                                    </motion.div>
                                    <h3 className="font-bold text-lg mb-3 text-white">{item.title}</h3>
                                    <div className="text-sm text-soft-light leading-relaxed">
                                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{replacePlaceholders(item.desc)}</ReactMarkdown>
                                    </div>
                                </div>

                                {/* Connector line (except last) */}
                                {i < serviceData.methodology.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#638576]/60 to-transparent" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Mid-page - Redesigned */}
            <section className="py-16 bg-gradient-to-r from-[#638576]/10 via-[#638576]/5 to-[#638576]/10 border-y border-[#638576]/20 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#638576]/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <h3 className="text-2xl font-bold text-ink mb-2">
                                Besoin d'un <span className="text-[#638576]">{serviceData.title}</span> à {city} ?
                            </h3>
                            <p className="text-soft text-lg">
                                Premier diagnostic gratuit. Je vous aide à identifier vos priorités.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Button
                                onClick={openAuditModal}
                                className="bg-ink text-white hover:bg-[#638576] rounded-full px-8 py-7 font-bold shadow-xl shadow-ink/20 hover:shadow-[#638576]/30 transition-all duration-300 group"
                            >
                                <span className="flex items-center gap-2">
                                    Diagnostic Gratuit
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Button>
                            <a
                                href="tel:0661139748"
                                className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full border-2 border-ink text-ink hover:bg-ink hover:text-white font-bold transition-all duration-300 whitespace-nowrap"
                            >
                                <Phone className="w-4 h-4" />
                                <span className="whitespace-nowrap">06 61 13 97 48</span>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related Services - Internal Linking with enhanced cards */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                            Services <span className="text-[#638576]">complémentaires</span> à {city}
                        </h2>
                        <p className="text-soft mt-3 max-w-xl mx-auto">
                            L'<strong>audit technique</strong> est la première brique. Découvrez comment aller plus loin.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
                        {relatedServices.map((service, i) => (
                            <Link key={i} href={service.href}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: i * 0.08 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-2xl hover:border-[#638576]/40 transition-all duration-300 group h-full"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-ink/5 flex items-center justify-center text-ink mb-4 group-hover:bg-[#638576] group-hover:text-white transition-all duration-300">
                                        {service.icon}
                                    </div>
                                    <h3 className="font-bold text-ink mb-2 group-hover:text-[#638576] transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-soft mb-4">{service.desc}</p>
                                    <span className="inline-flex items-center text-[#638576] text-sm font-bold">
                                        Découvrir <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                                    </span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Blog - Maillage vers Petite-fille */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-heading font-bold text-ink">
                            Articles SEO à lire
                        </h2>
                        <p className="text-soft text-sm mt-2">Approfondissez vos connaissances SEO</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {relatedBlogPosts.map((post, i) => (
                            <Link key={i} href={post.href}>
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-5 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-[#638576]/30 transition-all group h-full"
                                >
                                    <h3 className="font-bold text-sm text-ink group-hover:text-[#638576] transition-colors mb-2">{post.title}</h3>
                                    <p className="text-xs text-soft">{post.desc}</p>
                                    <span className="mt-3 inline-flex items-center text-xs font-bold text-[#638576]">
                                        Lire l'article <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-6">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-[#638576] font-semibold hover:underline">
                            Voir tous les articles du blog SEO
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQ
                items={serviceData.faq.map(f => ({
                    question: replacePlaceholders(f.question),
                    answer: replacePlaceholders(f.answer)
                }))}
                title={`Questions sur l'${serviceData.title} à ${city}`}
            />

            {/* Final CTA - Light background to separate from Dark Footer */}
            <section className="py-16 md:py-20 bg-gray-50 relative overflow-hidden border-t border-gray-100">
                {/* Decorative background */}
                <div className="absolute inset-0 pointer-events-none opacity-50">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#638576]/5 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#638576]/10 border border-[#638576]/20 mb-8">
                            <Rocket className="w-4 h-4 text-[#638576]" />
                            <span className="text-[#638576] font-bold text-sm">Passez à l'action</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-heading font-black text-ink mb-6 tracking-tight">
                            Prêt à débloquer votre <span className="text-[#638576]">visibilité</span> ?
                        </h2>
                        <p className="text-soft mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
                            L'audit technique est la première étape vers un SEO performant. Identifions ensemble ce qui freine votre croissance sur Google.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-5">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    onClick={openAuditModal}
                                    className="bg-[#638576] text-white hover:bg-ink hover:text-white rounded-full px-12 py-8 font-bold text-lg shadow-2xl shadow-[#638576]/30 transition-all duration-300"
                                >
                                    Demander mon Audit Gratuit
                                    <ArrowRight className="ml-3 w-5 h-5" />
                                </Button>
                            </motion.div>
                            <motion.a
                                href="tel:0661139748"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-gray-200 text-ink hover:bg-white hover:border-gray-300 font-bold transition-all duration-300 whitespace-nowrap"
                            >
                                <Phone className="w-5 h-5 text-[#638576]" />
                                <span className="whitespace-nowrap">06 61 13 97 48</span>
                            </motion.a>
                        </div>
                        <p className="text-soft/60 text-sm mt-8">
                            Réponse sous 24h • Sans engagement
                        </p>
                    </motion.div>
                </div>

                {/* Decorative bottom strip to separate from footer */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#638576]/20 via-[#638576] to-[#638576]/20" />
            </section>

            <HomepageBacklink variant="default" />
        </main >
    );
}
