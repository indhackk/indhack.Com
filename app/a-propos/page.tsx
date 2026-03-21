import { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
    title: "À propos — Indiana Aflalo, consultante SEO | IndHack",
    description: "Découvrez mon parcours : consultante SEO indépendante spécialisée en référencement naturel, audit technique et stratégie digitale. Accompagnement personnalisé pour PME et startups.",
    alternates: {
        canonical: "https://indhack.com/a-propos"
    },
    openGraph: {
        title: "À propos | IndHack - Consultante SEO",
        description: "Spécialiste du référencement naturel, j'aide les entreprises à dominer Google et transformer leur visibilité en clients.",
        url: "https://indhack.com/a-propos",
    }
};

// Person Schema pour E-E-A-T
const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://indhack.com/a-propos#person",
    "name": "Indiana Aflalo",
    "jobTitle": "Consultante SEO",
    "description": "Consultante SEO indépendante spécialisée en référencement naturel, audit technique et stratégie digitale. 7+ ans d'expérience, 50+ clients accompagnés.",
    "url": "https://indhack.com/a-propos",
    "image": "https://indhack.com/images/indiana-aflalo.jpg",
    "email": "contact@indhack.com",
    "telephone": "+33661139748",
    "sameAs": [
        "https://www.linkedin.com/in/indianaaflalo"
    ],
    "worksFor": {
        "@type": "Organization",
        "name": "IndHack",
        "url": "https://indhack.com"
    },
    "knowsAbout": [
        "Référencement naturel (SEO)",
        "Audit SEO technique",
        "SEO local",
        "Google Business Profile",
        "Core Web Vitals",
        "Stratégie de contenu",
        "Création de site web",
        "Next.js",
        "WordPress"
    ],
    "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Master Stratégie Digitale & UX Design"
    },
    "hasCredential": [
        {
            "@type": "EducationalOccupationalCredential",
            "name": "Google Analytics 4 Certification"
        }
    ]
};

export default function AboutPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <Breadcrumb items={getServiceBreadcrumb("À propos", "/a-propos")} />
            <AboutContent />
        </>
    );
}
