import { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { TrustSignalsStatic } from "@/components/sections/TrustSignalsStatic";
import { HomepageSchemas } from "@/components/seo/JsonLdSchemas";
import { Search, ArrowRight, MapPin, BookOpen } from "lucide-react";

// Dynamic imports for below-the-fold components (reduces initial JS bundle)
const ServicesSection = dynamic(() => import("@/components/ServicesSection").then(mod => ({ default: mod.ServicesSection })), {
    loading: () => <div className="py-20 bg-white" />,
});
const GEOSection = dynamic(() => import("@/components/sections/GEOSection").then(mod => ({ default: mod.GEOSection })), {
    loading: () => <div className="py-16 bg-ink" />,
});
const SEOScoreChecker = dynamic(() => import("@/components/SEOScoreChecker").then(mod => ({ default: mod.SEOScoreChecker })), {
    loading: () => <div className="py-16 bg-ink" />,
});
const CityCarousel = dynamic(() => import("@/components/sections/CityCarousel").then(mod => ({ default: mod.CityCarousel })), {
    loading: () => <div className="py-20 bg-gray-50" />,
});
const AboutSection = dynamic(() => import("@/components/AboutSection").then(mod => ({ default: mod.AboutSection })), {
    loading: () => <div className="py-16 bg-white" />,
});
const CTASection = dynamic(() => import("@/components/CTASection").then(mod => ({ default: mod.CTASection })), {
    loading: () => <div className="py-16 bg-ink" />,
});
const FAQ = dynamic(() => import("@/components/FAQ").then(mod => ({ default: mod.FAQ })), {
    loading: () => <div className="py-14 bg-white" />,
});

export const metadata: Metadata = {
    title: "Consultante SEO & GEO — référencement & visibilité IA",
    description: "Consultante SEO & GEO : boostez votre visibilité sur Google et dans les IA (ChatGPT, Perplexity). Audit gratuit, stratégie sur-mesure et résultats durables.",
    alternates: {
        canonical: "https://indhack.com"
    },
    openGraph: {
        title: "Consultante SEO & GEO — Expert référencement & visibilité IA",
        description: "Consultante SEO & GEO : boostez votre visibilité sur Google et dans les IA. Audit gratuit, stratégie sur-mesure et résultats durables.",
        url: "https://indhack.com",
        type: "website",
    }
};

// Homepage FAQ optimisée - SANS gras dans les questions
const HOMEPAGE_FAQ = [
    {
        question: "À quoi sert un audit SEO pour mon site web ?",
        answer: "Un audit SEO est une analyse complète de votre site pour identifier ce qui bloque votre visibilité sur Google. On détecte les erreurs techniques, les opportunités de mots-clés et on vous livre une feuille de route priorisée par impact business."
    },
    {
        question: "Combien de temps faut-il pour voir des résultats ?",
        answer: "Les premiers résultats apparaissent entre 3 et 6 mois pour le référencement classique. Pour le SEO local ou des optimisations techniques rapides, cela peut être visible en 2-4 semaines. C'est un investissement long terme qui prend de la valeur chaque mois."
    },
    {
        question: "Quelle différence entre référencement naturel et référencement payant ?",
        answer: "Le référencement naturel (SEO) vous positionne gratuitement dans les résultats Google. Le référencement payant (publicité) vous fait payer pour chaque clic. Le SEO est un investissement durable qui continue à générer du trafic même quand vous arrêtez de payer."
    },
    {
        question: "Proposez-vous uniquement du référencement ou aussi la création de site ?",
        answer: "Expertise complète : audit SEO, référencement naturel, création de sites web haute performance, refonte avec sécurisation du trafic, gestion de réseaux sociaux et design orienté conversion. Une approche globale pour dominer votre marché."
    },
    {
        question: "Travaillez-vous avec des petites entreprises ?",
        answer: "Principalement avec des PME, startups et entrepreneurs ambitieux qui veulent accélérer leur croissance organique. Approche personnalisée, agile et orientée résultats. Du sur-mesure stratégique, pas de formule industrielle."
    },
    {
        question: "Combien coûte une prestation de référencement ?",
        answer: "Chaque projet est unique et les tarifs sont adaptés à vos objectifs spécifiques. Un audit gratuit de 15 minutes permet d'évaluer vos besoins et de vous proposer un devis sur-mesure, sans engagement. L'investissement dépend de la complexité du projet et des résultats visés."
    }
];

export default function Home() {
    return (
        <>
            {/* Schemas JSON-LD : Organization + LocalBusiness + WebSite */}
            <HomepageSchemas />

            <div className="flex flex-col">
                <Hero />
                <TrustSignalsStatic />
                <ServicesSection />
                <GEOSection />
                <SEOScoreChecker />
                <CityCarousel
                    title="J'interviens partout en France"
                    subtitle="Consultante SEO à votre service"
                />

                {/* Section Maillage - Outils, Articles, Villes */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-heading font-bold text-ink mb-4">
                                    Ressources <span className="text-sauge">gratuites</span> pour votre SEO
                                </h2>
                                <p className="text-soft max-w-2xl mx-auto">
                                    Outils en ligne, guides pratiques et expertise locale pour booster votre visibilité.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                {/* Outils gratuits */}
                                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                    <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center mb-4">
                                        <Search className="w-6 h-6 text-sauge" />
                                    </div>
                                    <h3 className="text-xl font-bold text-ink mb-4">Outils SEO gratuits</h3>
                                    <ul className="space-y-3">
                                        <li>
                                            <Link href="/outils/audit-seo-gratuit" className="text-sauge hover:underline inline-flex items-center gap-1">
                                                Audit SEO en 30 secondes
                                                <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline inline-flex items-center gap-1">
                                                Testeur visibilité IA (ChatGPT, Perplexity)
                                                <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/outils/generateur-schema-json-ld" className="text-sauge hover:underline inline-flex items-center gap-1">
                                                Générateur données structurées
                                                <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/outils/generateur-robots-txt" className="text-sauge hover:underline inline-flex items-center gap-1">
                                                Générateur robots.txt IA
                                                <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* Articles */}
                                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                    <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center mb-4">
                                        <BookOpen className="w-6 h-6 text-sauge" />
                                    </div>
                                    <h3 className="text-xl font-bold text-ink mb-4">Articles SEO</h3>
                                    <ul className="space-y-3">
                                        <li>
                                            <Link href="/blog/refonte-site-web-sans-perdre-seo" className="text-sauge hover:underline inline-flex items-center gap-1">
                                                Notre guide complet de refonte SEO
                                                <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/blog/importance-audit-seo" className="text-sauge hover:underline inline-flex items-center gap-1">
                                                L'importance de l'audit SEO
                                                <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/blog/seo-local-nice" className="text-sauge hover:underline inline-flex items-center gap-1">
                                                Guide du SEO local à Nice
                                                <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/blog" className="text-ink font-medium hover:text-sauge inline-flex items-center gap-1">
                                                Voir tous les articles
                                                <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* Villes */}
                                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                    <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center mb-4">
                                        <MapPin className="w-6 h-6 text-sauge" />
                                    </div>
                                    <h3 className="text-xl font-bold text-ink mb-4">Expertise locale</h3>
                                    <ul className="space-y-3">
                                        <li>
                                            <Link href="/consultant-seo-nice" className="text-sauge hover:underline inline-flex items-center gap-1">
                                                Consultante SEO à Nice
                                                <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/consultant-seo-cannes" className="text-sauge hover:underline inline-flex items-center gap-1">
                                                Consultante SEO à Cannes
                                                <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/consultant-seo-sophia-antipolis" className="text-sauge hover:underline inline-flex items-center gap-1">
                                                Consultante SEO Sophia-Antipolis
                                                <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/consultant-seo-antibes" className="text-sauge hover:underline inline-flex items-center gap-1">
                                                Consultante SEO à Antibes
                                                <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <AboutSection />
                <CTASection />
                <FAQ items={HOMEPAGE_FAQ} title="Questions Fréquentes" />
            </div>
        </>
    );
}
