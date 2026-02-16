import { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { SEOScoreChecker } from "@/components/SEOScoreChecker";
import { CityCarousel } from "@/components/sections/CityCarousel";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { HomepageSchemas } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Consultante SEO & Experte Référencement Naturel | IndHack",
    description: "Consultante SEO freelance spécialisée en référencement naturel, SEO local et création de site web. Audit SEO gratuit. Nice & toute la France. ✆ 06 61 13 97 48",
    alternates: {
        canonical: "https://indhack.com"
    },
    openGraph: {
        title: "Consultante SEO & Experte Référencement Naturel | IndHack",
        description: "Dominez Google avec une stratégie SEO sur-mesure. Audit gratuit, accompagnement personnalisé.",
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
                <TrustSignals variant="compact" />
                <ServicesSection />
                <SEOScoreChecker />
                <CityCarousel
                    title="J'interviens partout en France"
                    subtitle="Consultante SEO à votre service"
                />
                <AboutSection />
                <CTASection />
                <FAQ items={HOMEPAGE_FAQ} title="Questions Fréquentes" />
            </div>
        </>
    );
}
