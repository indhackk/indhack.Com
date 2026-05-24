import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

/**
 * Composant Breadcrumb réutilisable avec Schema JSON-LD
 *
 * Exemples d'utilisation:
 * - /consultant-seo → [{ label: "Consultante SEO", href: "/consultant-seo" }]
 * - /consultant-seo-nice → [{ label: "SEO local", href: "/seo-local" }, { label: "Consultante SEO Nice", href: "/consultant-seo-nice" }]
 * - /blog/mon-article → [{ label: "Blog", href: "/blog" }, { label: "Titre article", href: "/blog/mon-article" }]
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
    // Construction des items avec Accueil en premier
    const allItems: BreadcrumbItem[] = [
        { label: "Accueil", href: "/" },
        ...items
    ];

    // Schema JSON-LD BreadcrumbList
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": allItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": `https://indhack.com${item.href}`
        }))
    };

    return (
        <>
            {/* Schema JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Breadcrumb Navigation - sr-only pour éviter conflit avec navbar transparente */}
            {/* Le JSON-LD ci-dessus suffit pour le SEO */}
            <nav
                aria-label="Fil d'Ariane"
                className="sr-only"
            >
                <ol>
                    {allItems.map((item, index) => {
                        const isLast = index === allItems.length - 1;
                        const isFirst = index === 0;

                        return (
                            <li key={item.href} className="flex items-center">
                                {/* Séparateur (sauf pour le premier) */}
                                {!isFirst && (
                                    <ChevronRight className="w-4 h-4 mx-2 text-soft/50" />
                                )}

                                {/* Lien ou texte */}
                                {isLast ? (
                                    // Dernier élément: pas de lien, style différent
                                    <span className="text-ink font-medium truncate max-w-[200px] sm:max-w-none">
                                        {item.label}
                                    </span>
                                ) : (
                                    // Autres éléments: liens cliquables
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-1 text-soft hover:text-sauge transition-colors"
                                    >
                                        {isFirst && <Home className="w-4 h-4" />}
                                        <span className={isFirst ? "sr-only sm:not-sr-only" : ""}>
                                            {item.label}
                                        </span>
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}

// ══════════════════════════════════════════════════════════════
// HELPERS pour générer les breadcrumbs automatiquement
// ══════════════════════════════════════════════════════════════

/**
 * Génère le breadcrumb pour une page service
 */
export function getServiceBreadcrumb(title: string, href: string): BreadcrumbItem[] {
    return [{ label: title, href }];
}

/**
 * Génère le breadcrumb pour une page ville
 */
export function getCityBreadcrumb(cityName: string, citySlug: string): BreadcrumbItem[] {
    return [
        { label: "SEO local", href: "/seo-local" },
        { label: `Consultante SEO ${cityName}`, href: `/${citySlug}` }
    ];
}

/**
 * Génère le breadcrumb pour une sous-page ville (audit-technique, etc.)
 */
export function getCityServiceBreadcrumb(
    cityName: string,
    citySlug: string,
    serviceTitle: string,
    serviceSlug: string
): BreadcrumbItem[] {
    return [
        { label: "SEO local", href: "/seo-local" },
        { label: `Consultante SEO ${cityName}`, href: `/${citySlug}` },
        { label: serviceTitle, href: `/${citySlug}/${serviceSlug}` }
    ];
}

/**
 * Génère le breadcrumb pour un article de blog
 */
export function getBlogBreadcrumb(articleTitle: string, articleSlug: string): BreadcrumbItem[] {
    return [
        { label: "Blog", href: "/blog" },
        { label: articleTitle, href: `/blog/${articleSlug}` }
    ];
}
