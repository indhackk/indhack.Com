import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { MegaFooter } from "@/components/MegaFooter";
import { ModalProvider } from "@/components/providers/ModalProvider";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
    subsets: ["latin"],
    variable: "--font-ibm-plex",
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL('https://indhack.com'),
    title: {
        template: "%s | INDHACK",
        default: "Consultante SEO & Experte Référencement | INDHACK",
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
        images: [{ url: "/images/logo-indhack.png", width: 512, height: 512, alt: "IndHack Logo" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "IndHack | Acquisition Digitale & SEO",
        description: "Stratégies de référencement naturel d'élite et visibilité IA.",
    },
    robots: {
        index: true,
        follow: true,
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
        "url": "https://indhack.com/images/logo-indhack.png",
        "width": 512,
        "height": 512
    },
    "image": "https://indhack.com/images/logo-indhack.png",
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
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
            </head>
            <body className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} font-body antialiased text-ink bg-white`}>
                <ModalProvider>
                    <Navbar />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <MegaFooter />
                </ModalProvider>
            </body>
        </html>
    );
}
