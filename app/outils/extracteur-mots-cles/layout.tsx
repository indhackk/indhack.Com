import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Extracteur de mots-clés gratuit | Analyser un texte - IndHack",
    description: "Analysez les mots-clés d'un texte ou d'un site web gratuitement. Extraction de mots-clés, densité, bi-grammes et tri-grammes. Outil SEO gratuit par IndHack.",
    alternates: {
        canonical: "https://indhack.com/outils/extracteur-mots-cles",
    },
    openGraph: {
        title: "Extracteur de mots-clés gratuit",
        description: "Analysez les mots-clés d'un texte gratuitement. Extraction, densité et n-grammes.",
        url: "https://indhack.com/outils/extracteur-mots-cles",
        type: "website",
        locale: "fr_FR",
        siteName: "IndHack",
    },
};

export default function ExtracteurMotsClesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
