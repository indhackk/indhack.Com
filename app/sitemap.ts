import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://indhack.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date().toISOString();
    const blogPosts = getAllPosts();

    // Pages priorité maximale (services principaux)
    const priorityPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${BASE_URL}/audit-seo`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${BASE_URL}/consultant-seo`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${BASE_URL}/referencement-naturel`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${BASE_URL}/creation-site-web`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${BASE_URL}/refonte-site-web`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${BASE_URL}/seo-local`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 1,
        },
    ];

    // Services secondaires
    const servicePages: MetadataRoute.Sitemap = [
        "consultant-geo",
        "consultant-ia",
        "audit-ia",
        "community-manager",
        "creation-boutique-en-ligne",
    ].map((slug) => ({
        url: `${BASE_URL}/${slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // Pages villes (programmatic SEO)
    const cityPages: MetadataRoute.Sitemap = [
        "consultant-seo-nice",
        "consultant-seo-cannes",
        "consultant-seo-sophia-antipolis",
        "consultant-seo-antibes",
        "consultant-seo-monaco",
        "consultant-seo-marseille",
        "consultant-seo-aix-en-provence",
        "consultant-seo-juan-les-pins",
        "consultant-seo-paris",
        "consultant-seo-lyon",
        "consultant-seo-grenoble",
        "consultant-seo-bordeaux",
        "consultant-seo-toulouse",
        "consultant-seo-nantes",
        "consultant-seo-rennes",
        "consultant-seo-montpellier",
        "consultant-seo-strasbourg",
        "consultant-seo-lille",
        "consultant-seo-boulogne-billancourt",
    ].map((slug) => ({
        url: `${BASE_URL}/${slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    // Outils gratuits
    const toolPages: MetadataRoute.Sitemap = [
        "outils",
        "outils/audit-seo-gratuit",
        "outils/testeur-visibilite-ia",
        "outils/generateur-robots-txt",
        "outils/generateur-schema-json-ld",
        "outils/extracteur-mots-cles",
        "outils/simulateur-visibilite-locale",
        "outils/gmb-autopilot",
    ].map((slug) => ({
        url: `${BASE_URL}/${slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    // Blog - hub + articles dynamiques
    const blogHub: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/blog`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.9,
        },
    ];

    const blogArticles: MetadataRoute.Sitemap = blogPosts
        .filter((post) => !post.draft)
        .map((post) => ({
            url: `${BASE_URL}/blog/${post.slug}`,
            lastModified: post.date || now,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        }));

    // Pages ressources (glossaire, etc.)
    const resourcePages: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}/glossaire-seo`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    ];

    // Pages utilitaires
    const utilityPages: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
        { url: `${BASE_URL}/a-propos`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
        { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
        { url: `${BASE_URL}/partenaires`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
        { url: `${BASE_URL}/etudes-de-cas`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
        { url: `${BASE_URL}/etudes/restaurants-cote-azur-google-2026`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    ];

    return [
        ...priorityPages,
        ...servicePages,
        ...cityPages,
        ...toolPages,
        ...blogHub,
        ...blogArticles,
        ...resourcePages,
        ...utilityPages,
    ];
}
