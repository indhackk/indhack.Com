import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
    title: {
        template: "%s | IndHack",
        default: "IndHack | Expertise SEO, GEO & Acquisition Digitale",
    },
    description: "IndHack par Indiana Aflalo. Stratégies de référencement naturel d'élite, audit SEO chirurgical et visibilité IA (GEO). Propulsez votre acquisition digitale. ✆ 06 61 13 97 48",
    keywords: ["SEO", "GEO", "Acquisition Digitale", "Referencement naturel", "Audit SEO", "Visibilité IA", "Next.js SEO"],
    authors: [{ name: "Indiana Aflalo" }],
    creator: "Indiana Aflalo",
    openGraph: {
        type: "website",
        locale: "fr_FR",
        url: "https://indhack.com",
        siteName: "IndHack",
        title: "IndHack | Expertise SEO, GEO & Acquisition Digitale",
        description: "Dominez les résultats Google et les moteurs de réponse IA. Audit, stratégie et accompagnement SEO haute performance.",
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className="scroll-smooth">
            <head>
                <link rel="canonical" href="https://indhack.com" />
            </head>
            <body className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} font-body antialiased text-ink bg-white`}>
                <ModalProvider>
                    <Navbar />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <Footer />
                </ModalProvider>
            </body>
        </html>
    );
}
