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
        default: "Consultante SEO Freelance & Experte Référencement | INDHACK",
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className="scroll-smooth">

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
