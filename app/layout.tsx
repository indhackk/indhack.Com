import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { CookieConsent } from "@/components/CookieConsent";
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
        template: "%s | IndHack",
        default: "Consultante SEO & Experte Référencement | IndHack",
    },
    description: "Boostez votre visibilité Google avec une experte SEO. Audit gratuit, +200% de trafic organique en 6 mois. Résultats garantis. ✆ 06 61 13 97 48",
    keywords: ["SEO", "GEO", "Acquisition Digitale", "Referencement naturel", "Audit SEO", "Visibilité IA", "Next.js SEO", "Consultant SEO", "SEO Local", "Référencement Local"],
    authors: [{ name: "Indiana Aflalo" }],
    creator: "Indiana Aflalo",
    icons: {
        icon: "/images/logo-indhack.png",
        apple: "/images/logo-indhack.png",
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className="scroll-smooth">
            <head>
                {/* Preconnect pour performance */}
                <link rel="preconnect" href="https://www.googletagmanager.com" />
                <link rel="preconnect" href="https://www.google-analytics.com" />
                <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
            </head>
            <body className={`${spaceGrotesk.variable} ${inter.variable} font-body antialiased text-ink bg-white`}>
                {/* Google AdSense - loaded after content */}
                <Script
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4620859186405862"
                    strategy="lazyOnload"
                    crossOrigin="anonymous"
                />

                {/* Google Analytics GA4 avec Consent Mode - lazyOnload pour perf */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-SXXS2G2753"
                    strategy="lazyOnload"
                />
                <Script id="google-analytics" strategy="lazyOnload">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}

                        // Consent Mode v2 - Refus par défaut (RGPD)
                        gtag('consent', 'default', {
                            'analytics_storage': 'denied',
                            'ad_storage': 'denied',
                            'ad_user_data': 'denied',
                            'ad_personalization': 'denied',
                            'wait_for_update': 500
                        });

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
                    <CookieConsent />
                </ModalProvider>
                <Analytics />
            </body>
        </html>
    );
}
