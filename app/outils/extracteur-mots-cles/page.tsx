import { Metadata } from "next";
import ExtracteurClient from "./ExtracteurClient";

export const metadata: Metadata = {
    title: "Extracteur de Mots-Clés Gratuit | Densité & N-grammes – IndHack",
    description: "Analysez la densité de mots-clés et les n-grammes de n'importe quel texte. Outil SEO gratuit, sans inscription. Optimisez vos contenus en 30 secondes.",
    alternates: {
        canonical: "https://indhack.com/outils/extracteur-mots-cles"
    },
    openGraph: {
        title: "Extracteur de Mots-Clés Gratuit | Densité & N-grammes – IndHack",
        description: "Analysez la densité de mots-clés et les n-grammes de n'importe quel texte. Outil SEO gratuit, sans inscription. Optimisez vos contenus en 30 secondes.",
        url: "https://indhack.com/outils/extracteur-mots-cles",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Extracteur de Mots-Clés Gratuit | Densité & N-grammes – IndHack",
        description: "Analysez la densité de mots-clés et les n-grammes de n'importe quel texte. Outil SEO gratuit, sans inscription. Optimisez vos contenus en 30 secondes.",
    }
};

// FAQ data for schema
const FAQ_ITEMS = [
    {
        question: "Comment fonctionne l'extracteur de mots-clés ?",
        answer: "L'outil analyse votre texte, supprime les mots vides (stop words) français, puis compte les occurrences de chaque terme. Il calcule ensuite la densité de chaque mot-clé (pourcentage par rapport au total) et identifie les bi-grammes et tri-grammes les plus fréquents."
    },
    {
        question: "Quelle est la densité de mots-clés idéale pour le SEO ?",
        answer: "La densité idéale se situe entre 1% et 3%. En dessous de 1%, votre mot-clé principal manque de présence. Au-dessus de 3%, Google peut considérer qu'il s'agit de keyword stuffing (bourrage de mots-clés), ce qui peut pénaliser votre référencement."
    },
    {
        question: "Qu'est-ce qu'un bi-gramme et un tri-gramme ?",
        answer: "Un bi-gramme est une expression de 2 mots consécutifs fréquemment utilisés ensemble (ex: 'référencement naturel'). Un tri-gramme comporte 3 mots (ex: 'audit SEO gratuit'). Ces expressions correspondent souvent aux requêtes longue traîne que les utilisateurs tapent dans Google."
    },
    {
        question: "Puis-je analyser le contenu de mes concurrents ?",
        answer: "Oui, copiez simplement le texte visible d'une page concurrente et collez-le dans l'outil. Vous découvrirez quels mots-clés ils ciblent, leur densité, et les expressions récurrentes. C'est idéal pour identifier des opportunités ou améliorer votre propre contenu."
    },
    {
        question: "L'outil conserve-t-il mes textes ?",
        answer: "Non, l'analyse est effectuée entièrement côté navigateur (client-side). Votre texte n'est jamais envoyé à un serveur ni stocké. Vos données restent confidentielles et sont supprimées dès que vous quittez la page."
    }
];

export default function ExtracteurMotsClesPage() {
    return (
        <>
            {/* Schema JSON-LD SoftwareApplication */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Extracteur de mots-clés gratuit",
                        "description": "Analysez les mots-clés d'un texte gratuitement. Extraction de mots-clés, densité, bi-grammes et tri-grammes. Outil SEO gratuit.",
                        "applicationCategory": "WebApplication",
                        "operatingSystem": "Any",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "EUR"
                        },
                        "author": {
                            "@type": "Organization",
                            "name": "IndHack",
                            "url": "https://indhack.com"
                        }
                    })
                }}
            />

            {/* Schema JSON-LD FAQPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": FAQ_ITEMS.map(item => ({
                            "@type": "Question",
                            "name": item.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": item.answer
                            }
                        }))
                    })
                }}
            />

            {/* Schema JSON-LD BreadcrumbList */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://indhack.com" },
                            { "@type": "ListItem", "position": 2, "name": "Outils SEO", "item": "https://indhack.com/outils" },
                            { "@type": "ListItem", "position": 3, "name": "Extracteur de mots-clés", "item": "https://indhack.com/outils/extracteur-mots-cles" }
                        ]
                    })
                }}
            />

            <ExtracteurClient />

            {/* Editorial Content - SEO */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto prose prose-sauge">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-6">
                            Comment utiliser cet extracteur de mots-clés gratuit ?
                        </h2>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
                            <p className="text-soft leading-relaxed mb-4">
                                Notre <strong className="text-ink">extracteur de mots-clés</strong> analyse n&apos;importe quel texte en quelques secondes. Collez votre contenu dans la zone de texte, et l&apos;outil identifie automatiquement les termes les plus fréquents, calcule leur densité, et détecte les expressions multi-mots (bi-grammes et tri-grammes).
                            </p>
                            <p className="text-soft leading-relaxed mb-4">
                                L&apos;outil supprime automatiquement les <strong className="text-ink">mots vides</strong> (stop words) français — articles, prépositions, pronoms — pour ne garder que les termes porteurs de sens. Vous pouvez ajuster les paramètres (longueur minimale, nombre d&apos;occurrences) pour affiner l&apos;analyse selon vos besoins.
                            </p>
                            <p className="text-soft leading-relaxed">
                                Les résultats sont exportables en CSV pour une analyse approfondie dans Excel ou Google Sheets. Idéal pour vérifier l&apos;optimisation de vos contenus avant publication.
                            </p>
                        </div>

                        <h2 className="text-2xl font-heading font-bold text-ink mb-6">
                            Pourquoi analyser la densité de mots-clés ?
                        </h2>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
                            <p className="text-soft leading-relaxed mb-4">
                                La <strong className="text-ink">densité de mots-clés</strong> est le ratio entre le nombre d&apos;occurrences d&apos;un terme et le nombre total de mots. Une densité idéale se situe entre <strong className="text-ink">1% et 2%</strong> pour votre mot-clé principal.
                            </p>
                            <ul className="text-soft space-y-2 mb-4">
                                <li><strong className="text-ink">En dessous de 0.5%</strong> — Votre mot-clé est sous-représenté. Google peut ne pas comprendre le sujet principal de votre page.</li>
                                <li><strong className="text-ink">Entre 1% et 2%</strong> — Zone optimale. Votre contenu est bien ciblé sans être sur-optimisé.</li>
                                <li><strong className="text-ink">Au-dessus de 3%</strong> — Risque de keyword stuffing. Google peut pénaliser la sur-optimisation.</li>
                            </ul>
                            <p className="text-soft leading-relaxed">
                                Les <strong className="text-ink">n-grammes</strong> (bi-grammes et tri-grammes) révèlent les expressions naturelles que Google valorise. Des expressions comme &quot;consultant SEO freelance&quot; ou &quot;audit référencement gratuit&quot; correspondent souvent aux requêtes réelles des utilisateurs.
                            </p>
                        </div>

                        <h2 className="text-2xl font-heading font-bold text-ink mb-6">
                            Quand utiliser un extracteur de mots-clés ?
                        </h2>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
                            <ul className="text-soft space-y-3">
                                <li><strong className="text-ink">Avant publication</strong> — Vérifiez que votre article cible bien le mot-clé visé avec la bonne densité.</li>
                                <li><strong className="text-ink">Lors d&apos;un audit de contenu</strong> — Identifiez les pages sous-optimisées ou sur-optimisées de votre site.</li>
                                <li><strong className="text-ink">Pour espionner les concurrents</strong> — Copiez le texte visible d&apos;une page concurrente pour découvrir leurs mots-clés cibles.</li>
                                <li><strong className="text-ink">Pour optimiser une page qui stagne</strong> — Si une page ne ranke pas, vérifiez si le mot-clé principal est suffisamment présent.</li>
                            </ul>
                        </div>

                        <div className="bg-sauge/10 rounded-xl p-6 border border-sauge/20">
                            <p className="text-soft mb-4">
                                <strong className="text-ink">Pour aller plus loin :</strong> L&apos;extraction de mots-clés est une étape de l&apos;optimisation on-page. Pour un diagnostic complet de votre référencement, consultez notre <a href="/outils/audit-seo-gratuit" className="text-sauge hover:underline">outil d&apos;audit SEO gratuit</a> qui analyse 15 critères en 30 secondes.
                            </p>
                            <p className="text-soft">
                                Besoin d&apos;une stratégie de mots-clés complète ? Découvrez mon <a href="/audit-seo" className="text-sauge hover:underline">service d&apos;audit SEO professionnel</a> avec analyse sémantique approfondie et recommandations personnalisées.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
