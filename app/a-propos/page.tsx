import { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";
import { Breadcrumb, getServiceBreadcrumb } from "@/components/Breadcrumb";
import {
    INDIANA_PERSON_ID,
    INDIANA_NAME,
    INDIANA_JOB_TITLE,
    INDIANA_LINKEDIN_URL,
    INDHACK_ORG_ID,
    INDHACK_BRAND_NAME,
    INDHACK_URL,
} from "@/lib/entity";

export const metadata: Metadata = {
    title: "À propos — Indiana Aflalo, consultante SEO | IndHack",
    description: "Découvrez mon parcours : consultante SEO indépendante spécialisée en référencement naturel, audit technique et stratégie digitale. Accompagnement personnalisé pour PME et startups.",
    alternates: {
        canonical: "https://indhack.com/a-propos"
    },
    openGraph: {
        title: "À propos | IndHack - Consultante SEO",
        description: "Consultante SEO indépendante, j'aide les PME et sites de services à transformer leur visibilité Google en demandes qualifiées.",
        url: "https://indhack.com/a-propos",
    }
};

// Person Schema pour E-E-A-T — utilise l'entité canonique partagée
// (cf. lib/entity.ts, phase 4.1 du masterplan) pour ne pas créer un
// doublon Person dans le graph JSON-LD du site.
const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": INDIANA_PERSON_ID,
    "name": INDIANA_NAME,
    "jobTitle": INDIANA_JOB_TITLE,
    "description": "Consultante SEO indépendante spécialisée en référencement naturel, audit technique et stratégie digitale. 7+ ans d'expérience, 50+ clients accompagnés.",
    "url": "https://indhack.com/a-propos",
    "image": "https://indhack.com/images/indiana-aflalo.jpg",
    "email": "contact@indhack.com",
    "telephone": "+33661139748",
    "sameAs": [
        INDIANA_LINKEDIN_URL,
    ],
    "worksFor": {
        "@type": "Organization",
        "@id": INDHACK_ORG_ID,
        "name": INDHACK_BRAND_NAME,
        "url": INDHACK_URL,
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
