import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL('https://indhack.com'),
    title: {
        template: "%s",
        default: "Consultante SEO & Experte Référencement",
    },
    description: "Boostez votre visibilité Google avec une experte SEO. Audit gratuit, +200% de trafic organique en 6 mois. Résultats garantis.",
    keywords: ["SEO", "GEO", "Acquisition Digitale", "Referencement naturel", "Audit SEO", "Visibilité IA", "Next.js SEO", "Consultant SEO", "SEO Local", "Référencement Local"],
    authors: [{ name: "Indiana Aflalo" }],
    creator: "Indiana Aflalo",
    icons: {
        icon: "/images/logo-indhack.webp",
        apple: "/images/logo-indhack.webp",
    },
    openGraph: {
        type: "website",
        locale: "fr_FR",
        url: "https://indhack.com",
        siteName: "IndHack",
        title: "IndHack | Expertise SEO, GEO & Acquisition Digitale",
        description: "Dominez les résultats Google et les moteurs de réponse IA. Audit, stratégie et accompagnement SEO haute performance.",
        images: [{
            url: "https://indhack.com/api/og?title=Consultante%20SEO%20%26%20Experte%20R%C3%A9f%C3%A9rencement&subtitle=Dominez%20Google%20avec%20IndHack",
            width: 1200,
            height: 630,
            alt: "IndHack - Consultante SEO & Experte Référencement"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "IndHack | Acquisition Digitale & SEO",
        description: "Stratégies de référencement naturel d'élite et visibilité IA.",
        images: ["https://indhack.com/api/og?title=Consultante%20SEO%20%26%20Experte%20R%C3%A9f%C3%A9rencement&subtitle=Dominez%20Google%20avec%20IndHack"],
        creator: "@indhack",
    },
    alternates: {
        languages: {
            'fr': 'https://indhack.com',
            'x-default': 'https://indhack.com',
        },
    },
    robots: {
        index: true,
        follow: true,
    },
    verification: {
        google: "CndayCCG9MoFrkFui_QiTyKHtQQwofVzclhsB357vBc",
        other: {
            "msvalidate.01": "E88B7CA680F63F56E6E1EF41A2F97204",
        },
    },
};

// Organization Schema global
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://indhack.com/#organization",
    "name": "IndHack",
    "alternateName": "Indiana Aflalo - Consultante SEO",
    "url": "https://indhack.com",
    "logo": {
        "@type": "ImageObject",
        "url": "https://indhack.com/images/logo-indhack.webp",
        "width": 512,
        "height": 512
    },
    "image": "https://indhack.com/images/logo-indhack.webp",
    "description": "Consultante SEO et experte en acquisition digitale. Accompagnement personnalisé pour PME et startups : audit SEO, référencement naturel, création de sites web optimisés.",
    "founder": {
        "@type": "Person",
        "name": "Indiana Aflalo",
        "jobTitle": "Consultante SEO & Experte Acquisition Digitale"
    },
    "sameAs": [
        "https://www.linkedin.com/in/indianaaflalo"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+33661139748",
        "email": "contact@indhack.com",
        "contactType": "customer service",
        "availableLanguage": ["French", "English"]
    },
    "areaServed": {
        "@type": "Country",
        "name": "France"
    },
    "serviceType": [
        "Référencement Naturel SEO",
        "Audit SEO",
        "SEO Local",
        "Création de Site Web",
        "Refonte de Site Web",
        "Community Management"
    ]
};

// LocalBusiness Schema — Service Area Business (SAB) optimisé
// Pas d'adresse physique affichée (conforme aux guidelines Google pour SAB)
const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://indhack.com/#localbusiness",
    "name": "IndHack - Consultante SEO",
    "alternateName": "Indiana Aflalo SEO",
    "description": "Consultante SEO freelance spécialisée en référencement naturel, SEO local et optimisation pour les moteurs IA (GEO). Accompagnement personnalisé pour PME et startups sur toute la France.",
    "url": "https://indhack.com",
    "telephone": "+33661139748",
    "email": "contact@indhack.com",
    "image": "https://indhack.com/images/logo-indhack.webp",
    "logo": "https://indhack.com/images/logo-indhack.webp",
    "priceRange": "€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Virement bancaire, PayPal",
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
        }
    ],
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 43.7102,
        "longitude": 7.2620
    },
    "areaServed": [
        { "@type": "City", "name": "Nice" },
        { "@type": "City", "name": "Paris" },
        { "@type": "City", "name": "Marseille" },
        { "@type": "City", "name": "Cannes" },
        { "@type": "City", "name": "Monaco" },
        { "@type": "City", "name": "Antibes" },
        { "@type": "City", "name": "Sophia-Antipolis" },
        { "@type": "City", "name": "Aix-en-Provence" },
        { "@type": "City", "name": "Montpellier" },
        { "@type": "City", "name": "Lyon" },
        { "@type": "AdministrativeArea", "name": "Alpes-Maritimes" },
        { "@type": "AdministrativeArea", "name": "Provence-Alpes-Côte d'Azur" },
        { "@type": "Country", "name": "France" }
    ],
    "serviceType": [
        "Audit SEO",
        "Référencement naturel",
        "SEO local",
        "Optimisation Google Business Profile",
        "Création de site web SEO",
        "Refonte de site web",
        "GEO - Generative Engine Optimization",
        "Consultant IA"
    ],
    "knowsAbout": [
        "SEO",
        "Référencement naturel",
        "Google Business Profile",
        "SEO local",
        "GEO",
        "ChatGPT",
        "Perplexity",
        "Core Web Vitals"
    ],
    "founder": {
        "@type": "Person",
        "name": "Indiana Aflalo",
        "jobTitle": "Consultante SEO & Experte GEO",
        "sameAs": "https://www.linkedin.com/in/indianaaflalo"
    },
    "sameAs": [
        "https://www.linkedin.com/in/indianaaflalo",
        "https://www.data.gouv.fr/organizations/indhack"
    ]
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className="scroll-smooth">
            <head>
                {/* DNS prefetch pour analytics (lazyOnload, pas besoin de preconnect) */}
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
                <link rel="dns-prefetch" href="https://www.google-analytics.com" />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />
            </head>
            <body className={`${spaceGrotesk.variable} ${inter.variable} font-body antialiased text-ink bg-white`}>

                {/* Google Analytics GA4 — Consent Mode v2 avec modélisation */}
                {/* analytics_storage reste denied par défaut (RGPD conforme) */}
                {/* url_passthrough + ads_data_redaction activent les pings cookieless */}
                {/* GA4 modélise alors ~70% du trafic sans cookies ni données perso */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-SXXS2G2753"
                    strategy="lazyOnload"
                />
                <Script id="google-analytics" strategy="lazyOnload">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}

                        gtag('consent', 'default', {
                            'analytics_storage': 'granted',
                            'ad_storage': 'denied',
                            'ad_user_data': 'denied',
                            'ad_personalization': 'denied'
                        });

                        gtag('set', 'url_passthrough', true);
                        gtag('set', 'ads_data_redaction', true);

                        gtag('js', new Date());
                        gtag('config', 'G-SXXS2G2753', {
                            'anonymize_ip': true,
                            'cookie_flags': 'SameSite=None;Secure'
                        });
                    `}
                </Script>

                <ModalProvider>
                    <ConditionalLayout>
                        {children}
                    </ConditionalLayout>
                </ModalProvider>
                <Analytics />
            </body>
        </html>
    );
}
