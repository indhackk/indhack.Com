import { Metadata } from "next";
import ExtracteurClient from "./ExtracteurClient";

export const metadata: Metadata = {
    title: "Extracteur de mots-clés d'un texte : outil gratuit",
    description: "Extrayez les mots-clés d'un texte en 30 secondes. Densité, bi-grammes, tri-grammes et analyse sémantique. Outil SEO 100 % gratuit, sans inscription.",
    alternates: {
        canonical: "https://indhack.com/outils/extracteur-mots-cles"
    },
    openGraph: {
        title: "Extraire les mots-clés d'un texte | Outil gratuit – IndHack",
        description: "Extraire les mots-clés d'un texte en 30 secondes. Analysez la densité, les bi-grammes et tri-grammes. Outil SEO gratuit, sans inscription.",
        url: "https://indhack.com/outils/extracteur-mots-cles",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Extraire les mots-clés d'un texte | Outil gratuit – IndHack",
        description: "Extraire les mots-clés d'un texte en 30 secondes. Analysez la densité, les bi-grammes et tri-grammes. Outil SEO gratuit, sans inscription.",
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
                        "name": "Extraire les mots-clés d'un texte - Outil gratuit",
                        "description": "Extraire les mots-clés d'un texte gratuitement. Analyse de densité, bi-grammes et tri-grammes. Outil SEO en ligne sans inscription.",
                        "applicationCategory": "SoftwareApplication",
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
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

                        <h2 className="text-2xl font-heading font-bold text-ink mb-6">
                            Extraction de mots-clés et stratégie SEO : le lien direct
                        </h2>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
                            <p className="text-soft leading-relaxed mb-4">
                                L&apos;extraction de mots-clés n&apos;est pas une fin en soi : c&apos;est le point de départ d&apos;une <strong className="text-ink">stratégie de référencement naturel</strong> efficace. Une fois vos mots-clés identifiés, l&apos;étape suivante consiste à vérifier leur pertinence par rapport à l&apos;intention de recherche et à les intégrer naturellement dans vos balises Title, H1 et corps de texte.
                            </p>
                            <p className="text-soft leading-relaxed mb-4">
                                Si vous constatez qu&apos;un mot-clé cible est absent de votre texte ou présent à moins de 0,5 %, c&apos;est un signal clair de sous-optimisation. À l&apos;inverse, une densité supérieure à 3 % indique un risque de suroptimisation que Google pénalise depuis les mises à jour <strong className="text-ink">Helpful Content</strong>. L&apos;équilibre se trouve dans une rédaction naturelle qui intègre les variantes sémantiques (synonymes, bi-grammes contextuels).
                            </p>
                            <p className="text-soft leading-relaxed">
                                Pour aller au-delà de l&apos;analyse de densité, un <a href="/blog/audit-seo-approfondi-guide-complet" className="text-sauge hover:underline">audit SEO approfondi</a> croise les données d&apos;extraction avec celles de la Search Console pour identifier les cannibalisations sémantiques et les opportunités de <a href="/referencement-naturel" className="text-sauge hover:underline">référencement naturel</a> inexploitées.
                            </p>
                        </div>

                        <h2 className="text-2xl font-heading font-bold text-ink mb-6">
                            Intégrer l&apos;extraction de mots-clés dans votre workflow SEO
                        </h2>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
                            <p className="text-soft leading-relaxed mb-4">
                                Voici comment les consultants SEO professionnels utilisent l&apos;extraction de mots-clés au quotidien :
                            </p>
                            <ul className="text-soft space-y-3">
                                <li><strong className="text-ink">Pré-publication</strong> — Analysez votre brouillon pour vérifier que le mot-clé principal atteint 1 à 2 % de densité et que les variantes longue traîne apparaissent naturellement.</li>
                                <li><strong className="text-ink">Audit de pages existantes</strong> — Passez vos pages stratégiques dans l&apos;extracteur pour détecter les pages sous-optimisées. Croisez ensuite avec un <a href="/outils/audit-seo-gratuit" className="text-sauge hover:underline">audit SEO gratuit</a> pour un diagnostic complet.</li>
                                <li><strong className="text-ink">Veille concurrentielle</strong> — Copiez le contenu visible de vos concurrents positionnés en top 3 et comparez leurs tri-grammes aux vôtres. Les écarts révèlent les sujets à couvrir.</li>
                                <li><strong className="text-ink">Optimisation SEO local</strong> — Pour les entreprises ciblant une zone géographique, vérifiez que les termes locaux (ville, quartier, département) apparaissent suffisamment. Complétez avec notre <a href="/outils/simulateur-visibilite-locale" className="text-sauge hover:underline">simulateur de visibilité locale</a>.</li>
                                <li><strong className="text-ink">Optimisation pour les IA</strong> — Les IA génératives (ChatGPT, Perplexity, Claude) privilégient les contenus structurés avec des réponses claires. Vérifiez que vos paragraphs contiennent les expressions Q&amp;A que les LLM recherchent grâce à notre <a href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline">testeur de visibilité IA</a>.</li>
                            </ul>
                        </div>

                        <div className="bg-sauge/10 rounded-xl p-6 border border-sauge/20">
                            <p className="text-soft mb-4">
                                <strong className="text-ink">Pour aller plus loin :</strong> L&apos;extraction de mots-clés est une étape de l&apos;optimisation on-page. Pour un diagnostic complet de votre référencement, consultez notre <a href="/outils/audit-seo-gratuit" className="text-sauge hover:underline">outil d&apos;audit SEO gratuit</a> qui analyse 15 critères en 30 secondes.
                            </p>
                            <p className="text-soft mb-4">
                                Besoin d&apos;une stratégie de mots-clés complète ? Découvrez mon <a href="/audit-seo" className="text-sauge hover:underline">service d&apos;audit SEO professionnel</a> avec analyse sémantique approfondie et recommandations personnalisées.
                            </p>
                            <p className="text-soft">
                                Consultez aussi notre <a href="/blog/contenu-rapport-audit-seo" className="text-sauge hover:underline">guide du rapport d&apos;audit SEO</a> pour comprendre comment l&apos;analyse sémantique s&apos;intègre dans un diagnostic complet, ou découvrez <a href="/blog/checklist-seo-2026" className="text-sauge hover:underline">la checklist SEO 2026</a> pour ne rien oublier.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
