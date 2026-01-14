import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { SEOScoreChecker } from "@/components/SEOScoreChecker";

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
        answer: "Les prestations démarrent à 690€ pour un audit SEO complet. Les accompagnements mensuels sont à partir de 1 290€/mois. Chaque projet est unique : une offre personnalisée vous sera proposée après un audit gratuit de vos besoins."
    }
];

export default function Home() {
    return (
        <>
            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        "name": "IndHack - Experte en Référencement Naturel",
                        "alternateName": "Indiana Aflalo",
                        "description": "Experte en référencement naturel, création de sites web performants et stratégie digitale. Propulsez votre site en première page Google.",
                        "url": "https://indhack.com",
                        "telephone": "+33661139748",
                        "email": "contact@indhack.com",
                        "address": {
                            "@type": "PostalAddress",
                            "addressCountry": "FR"
                        },
                        "areaServed": "France",
                        "serviceType": [
                            "Référencement Naturel",
                            "Audit SEO",
                            "Création Site Web",
                            "SEO Local",
                            "Gestion Réseaux Sociaux"
                        ],
                        "priceRange": "€€"
                    })
                }}
            />

            <div className="flex flex-col">
                <Hero />
                <ServicesSection />
                <SEOScoreChecker />
                <AboutSection />
                <CTASection />
                <FAQ items={HOMEPAGE_FAQ} title="Questions Fréquentes" />
            </div>
        </>
    );
}
