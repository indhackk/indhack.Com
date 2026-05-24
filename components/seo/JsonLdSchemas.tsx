/**
 * Composants Schema JSON-LD pour le SEO
 * Conformes aux spécifications Schema.org
 */

// ══════════════════════════════════════════════════════════════
// DONNÉES DE BASE
// ══════════════════════════════════════════════════════════════

const ORGANIZATION_DATA = {
    name: "IndHack",
    legalName: "IndHack - Indiana Aflalo",
    url: "https://indhack.com",
    logo: "https://indhack.com/images/logo-indhack.webp",
    email: "contact@indhack.com",
    telephone: "+33661139748",
    address: {
        streetAddress: "Nice",
        addressLocality: "Nice",
        addressRegion: "Provence-Alpes-Côte d'Azur",
        postalCode: "06000",
        addressCountry: "FR"
    },
    sameAs: [
        "https://www.linkedin.com/in/indianaaflalo",
        "https://www.malt.fr/profile/indianaaflalo",
        "https://github.com/indhackk"
    ],
    knowsAbout: [
        "Search Engine Optimization",
        "Generative Engine Optimization",
        "SEO Local",
        "AI Search Optimization",
        "Référencement Naturel",
        "Création de Site Web",
        "Google Business Profile Optimization"
    ]
};

// ══════════════════════════════════════════════════════════════
// ORGANIZATION SCHEMA (pour toutes les pages)
// ══════════════════════════════════════════════════════════════

export function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://indhack.com/#organization",
        "name": ORGANIZATION_DATA.name,
        "legalName": ORGANIZATION_DATA.legalName,
        "url": ORGANIZATION_DATA.url,
        "logo": {
            "@type": "ImageObject",
            "url": ORGANIZATION_DATA.logo,
            "width": 200,
            "height": 200
        },
        "email": ORGANIZATION_DATA.email,
        "telephone": ORGANIZATION_DATA.telephone,
        "address": {
            "@type": "PostalAddress",
            ...ORGANIZATION_DATA.address
        },
        "sameAs": ORGANIZATION_DATA.sameAs,
        "knowsAbout": ORGANIZATION_DATA.knowsAbout,
        "founder": {
            "@type": "Person",
            "@id": "https://indhack.com/#indiana-aflalo",
            "name": "Indiana Aflalo",
            "jobTitle": "Consultante SEO & Experte GEO",
            "url": "https://indhack.com/a-propos",
            "sameAs": [
                "https://www.linkedin.com/in/indianaaflalo",
                "https://www.malt.fr/profile/indianaaflalo"
            ],
            "knowsAbout": [
                "SEO",
                "GEO",
                "Generative Engine Optimization",
                "Local SEO",
                "AI Search Optimization",
                "Web Development"
            ]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ══════════════════════════════════════════════════════════════
// LOCAL BUSINESS SCHEMA (pour la homepage)
// ══════════════════════════════════════════════════════════════

export function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://indhack.com/#localbusiness",
        "name": "IndHack - Consultante SEO",
        "image": ORGANIZATION_DATA.logo,
        "url": ORGANIZATION_DATA.url,
        "telephone": ORGANIZATION_DATA.telephone,
        "email": ORGANIZATION_DATA.email,
        "address": {
            "@type": "PostalAddress",
            ...ORGANIZATION_DATA.address
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 43.7102,
            "longitude": 7.2620
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
            }
        ],
        "areaServed": [
            {
                "@type": "City",
                "name": "Nice"
            },
            {
                "@type": "Country",
                "name": "France"
            }
        ],
        "priceRange": "€€",
        "currenciesAccepted": "EUR",
        "paymentAccepted": "Virement bancaire, PayPal",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Services SEO",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Audit SEO",
                        "url": "https://indhack.com/audit-seo"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Référencement Naturel",
                        "url": "https://indhack.com/referencement-naturel"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "SEO Local",
                        "url": "https://indhack.com/seo-local"
                    }
                }
            ]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ══════════════════════════════════════════════════════════════
// WEBSITE SCHEMA (pour la homepage)
// ══════════════════════════════════════════════════════════════

export function WebSiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://indhack.com/#website",
        "name": "IndHack",
        "url": "https://indhack.com",
        "description": "Consultante SEO freelance spécialisée en référencement naturel, SEO local et création de site web.",
        "publisher": {
            "@id": "https://indhack.com/#organization"
        },
        "inLanguage": "fr-FR",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://indhack.com/blog?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ══════════════════════════════════════════════════════════════
// SERVICE SCHEMA (pour les pages services)
// ══════════════════════════════════════════════════════════════

interface ServiceSchemaProps {
    name: string;
    description: string;
    url: string;
    serviceType?: string;
}

export function ServiceSchema({ name, description, url, serviceType }: ServiceSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "description": description,
        "url": url,
        "serviceType": serviceType || name,
        "provider": {
            "@type": "Person",
            "@id": "https://indhack.com/#indiana-aflalo",
            "name": "Indiana Aflalo",
            "jobTitle": "Consultante SEO & Experte GEO",
            "url": "https://indhack.com/a-propos"
        },
        "dateModified": new Date().toISOString().split('T')[0],
        "areaServed": {
            "@type": "Country",
            "name": "France"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": name,
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": name
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "priceCurrency": "EUR"
                    }
                }
            ]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ══════════════════════════════════════════════════════════════
// PROFESSIONAL SERVICE SCHEMA (pour les pages villes)
// ══════════════════════════════════════════════════════════════

interface CityServiceSchemaProps {
    cityName: string;
    citySlug: string;
    region?: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
}

export function CityProfessionalServiceSchema({
    cityName,
    citySlug,
    region = "France",
    postalCode,
    latitude,
    longitude
}: CityServiceSchemaProps) {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": `IndHack - Consultante SEO ${cityName}`,
        "description": `Consultante SEO freelance à ${cityName}. Audit SEO, référencement naturel et stratégie digitale sur-mesure.`,
        "url": `https://indhack.com/${citySlug}`,
        "image": ORGANIZATION_DATA.logo,
        "telephone": ORGANIZATION_DATA.telephone,
        "email": ORGANIZATION_DATA.email,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": cityName,
            "addressRegion": region,
            "postalCode": postalCode || "",
            "addressCountry": "FR"
        },
        "areaServed": {
            "@type": "City",
            "name": cityName
        },
        "priceRange": "€€",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
            }
        ],
        "parentOrganization": {
            "@id": "https://indhack.com/#organization"
        },
        "founder": {
            "@type": "Person",
            "@id": "https://indhack.com/#indiana-aflalo",
            "name": "Indiana Aflalo",
            "jobTitle": "Consultante SEO & Experte GEO",
            "url": "https://indhack.com/a-propos"
        },
        "dateModified": new Date().toISOString().split('T')[0]
    };

    // Ajouter les coordonnées géographiques si disponibles
    if (latitude && longitude) {
        schema.geo = {
            "@type": "GeoCoordinates",
            "latitude": latitude,
            "longitude": longitude
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ══════════════════════════════════════════════════════════════
// PERSON SCHEMA (pour les pages À propos, articles blog)
// ══════════════════════════════════════════════════════════════

export function PersonSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://indhack.com/#indiana-aflalo",
        "name": "Indiana Aflalo",
        "givenName": "Indiana",
        "familyName": "Aflalo",
        "jobTitle": "Consultante SEO & Experte GEO",
        "description": "Consultante SEO freelance et première experte GEO (Generative Engine Optimization) française. Spécialisée en référencement naturel, SEO local et optimisation pour les moteurs IA (ChatGPT, Perplexity, Claude, Google AI Mode). Basée à Nice.",
        "url": "https://indhack.com/a-propos",
        "image": ORGANIZATION_DATA.logo,
        "email": ORGANIZATION_DATA.email,
        "telephone": ORGANIZATION_DATA.telephone,
        "nationality": {
            "@type": "Country",
            "name": "France"
        },
        "worksFor": {
            "@id": "https://indhack.com/#organization"
        },
        "hasOccupation": [
            {
                "@type": "Occupation",
                "name": "Consultant SEO",
                "occupationLocation": {
                    "@type": "City",
                    "name": "Nice"
                },
                "skills": "Audit SEO, référencement naturel, SEO local, Google Business Profile, schema.org, Core Web Vitals, Next.js"
            },
            {
                "@type": "Occupation",
                "name": "Expert GEO (Generative Engine Optimization)",
                "skills": "Optimisation pour ChatGPT, Perplexity, Claude, Google AI Mode, llms.txt, passage-level citability, schema JSON-LD, entity building"
            }
        ],
        "sameAs": [
            "https://www.linkedin.com/in/indianaaflalo",
            "https://www.malt.fr/profile/indianaaflalo"
        ],
        "knowsAbout": [
            "Search Engine Optimization",
            "Generative Engine Optimization (GEO)",
            "Answer Engine Optimization (AEO)",
            "Local SEO",
            "Google Business Profile",
            "Google AI Mode",
            "ChatGPT SEO",
            "Perplexity AI SEO",
            "Claude SEO",
            "llms.txt",
            "Technical SEO",
            "Core Web Vitals",
            "Schema.org Markup",
            "Content Strategy",
            "E-E-A-T",
            "Web Development",
            "Next.js",
            "Programmatic SEO"
        ],
        "hasCredential": [
            {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Professional Experience",
                "name": "Consultante SEO indépendante depuis 2019",
                "dateCreated": "2019"
            },
            {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Specialty",
                "name": "Spécialiste GEO (Generative Engine Optimization) — référence française émergente"
            },
            {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Professional Track Record",
                "name": "50+ clients accompagnés depuis 2019"
            }
        ],
        "memberOf": [
            {
                "@type": "Organization",
                "name": "Freelance français spécialisés SEO/GEO",
                "url": "https://www.malt.fr/profile/indianaaflalo"
            }
        ],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Nice",
            "postalCode": "06000",
            "addressRegion": "Provence-Alpes-Côte d'Azur",
            "addressCountry": "FR"
        },
        "workLocation": {
            "@type": "Place",
            "name": "Nice et toute la France (missions à distance + présentiel Côte d'Azur)",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 43.7102,
                "longitude": 7.2620
            }
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ══════════════════════════════════════════════════════════════
// SOFTWARE APPLICATION SCHEMA (pour les outils)
// ══════════════════════════════════════════════════════════════

interface SoftwareApplicationSchemaProps {
    name: string;
    description: string;
    url: string;
    applicationCategory?: string;
}

export function SoftwareApplicationSchema({
    name,
    description,
    url,
    applicationCategory = "SEO Tool"
}: SoftwareApplicationSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": name,
        "description": description,
        "url": url,
        "applicationCategory": applicationCategory,
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
        },
        "author": {
            "@type": "Person",
            "@id": "https://indhack.com/#indiana-aflalo",
            "name": "Indiana Aflalo",
            "jobTitle": "Consultante SEO & Experte GEO",
            "url": "https://indhack.com/a-propos"
        },
        "creator": {
            "@id": "https://indhack.com/#indiana-aflalo"
        },
        "publisher": {
            "@id": "https://indhack.com/#organization"
        },
        "datePublished": "2026-01-15",
        "dateModified": new Date().toISOString().split('T')[0],
        "inLanguage": "fr-FR",
        "isAccessibleForFree": true
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ══════════════════════════════════════════════════════════════
// COMPOSANT COMBINÉ POUR LA HOMEPAGE
// ══════════════════════════════════════════════════════════════

export function HomepageSchemas() {
    return (
        <>
            <OrganizationSchema />
            <LocalBusinessSchema />
            <WebSiteSchema />
            <PersonSchema />
        </>
    );
}
