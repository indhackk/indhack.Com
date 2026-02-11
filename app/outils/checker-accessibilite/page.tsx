import { Metadata } from "next";
import Link from "next/link";
import { CheckerAccessibilite } from "./CheckerAccessibilite";
import { ArrowRight, Accessibility, Search, Bot, Code2, FileCode } from "lucide-react";

export const metadata: Metadata = {
    title: "Checker Accessibilité Web Gratuit — Test RGAA/WCAG | INDHACK",
    description: "Testez gratuitement l'accessibilité de votre site. 10 critères RGAA/WCAG analysés : alt images, hiérarchie titres, navigation clavier, landmarks. Score instantané.",
    alternates: {
        canonical: "https://indhack.com/outils/checker-accessibilite"
    },
    openGraph: {
        title: "Checker Accessibilité Web — Test RGAA Gratuit | INDHACK",
        description: "Analysez la conformité RGAA de votre site en 1 clic. 10 critères vérifiés, recommandations personnalisées. Gratuit, sans inscription.",
        url: "https://indhack.com/outils/checker-accessibilite",
        type: "website",
    }
};

const RELATED_TOOLS = [
    {
        title: "Audit SEO Gratuit",
        description: "Score SEO complet /100",
        href: "/outils/audit-seo-gratuit",
        icon: Search,
        status: "live" as const,
    },
    {
        title: "Testeur Visibilité IA",
        description: "ChatGPT vous trouve-t-il ?",
        href: "/outils/testeur-visibilite-ia",
        icon: Bot,
        status: "live" as const,
    },
    {
        title: "Générateur Schema JSON-LD",
        description: "Données structurées en 1 clic",
        href: "/outils/generateur-schema-json-ld",
        icon: Code2,
        status: "live" as const,
    },
];

const FAQ_ITEMS = [
    {
        question: "Qu'est-ce que le RGAA ?",
        answer: "Le RGAA (Référentiel Général d'Amélioration de l'Accessibilité) est le référentiel français d'accessibilité numérique. Il s'appuie sur les normes internationales WCAG et définit les règles à suivre pour rendre les sites web accessibles aux personnes en situation de handicap. Il est obligatoire pour les sites publics."
    },
    {
        question: "Mon site doit-il être accessible ?",
        answer: "En France, l'accessibilité est obligatoire pour : les sites des services publics, les entreprises de plus de 250M€ de CA (depuis 2020), et bientôt toutes les entreprises B2C (directive européenne 2025). Au-delà de l'obligation, c'est aussi un enjeu d'inclusion et d'UX pour tous vos utilisateurs."
    },
    {
        question: "Que signifient les niveaux WCAG A, AA, AAA ?",
        answer: "WCAG définit 3 niveaux de conformité : A (minimum), AA (standard recommandé), AAA (optimal). Le niveau AA est généralement requis par les législations. Notre outil indique le niveau WCAG de chaque critère analysé."
    },
    {
        question: "Quels critères sont analysés ?",
        answer: "Notre checker analyse 10 critères essentiels : alternatives textuelles des images (alt), hiérarchie des titres (H1-H6), intitulés de liens explicites, lien d'évitement, labels de formulaires, langue de la page, régions de page (landmarks), utilisation ARIA, structure du document, et gestion des images décoratives."
    },
    {
        question: "Comment améliorer mon score d'accessibilité ?",
        answer: "Commencez par les erreurs critiques : ajoutez des alt aux images, structurez vos titres correctement, utilisez des balises sémantiques (main, nav, header), et associez des labels à vos champs de formulaire. Notre outil vous donne des recommandations spécifiques pour chaque problème détecté."
    },
];

export default function CheckerAccessibilitePage() {
    return (
        <>
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Checker Accessibilité INDHACK",
                        "description": "Outil gratuit pour tester l'accessibilité RGAA/WCAG de votre site web",
                        "url": "https://indhack.com/outils/checker-accessibilite",
                        "applicationCategory": "Accessibility Tool",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "EUR"
                        },
                        "author": {
                            "@type": "Organization",
                            "name": "INDHACK",
                            "url": "https://indhack.com"
                        },
                        "featureList": [
                            "Test des alternatives textuelles (alt)",
                            "Vérification hiérarchie des titres",
                            "Analyse des liens et navigation",
                            "Test des formulaires et labels",
                            "Vérification des landmarks ARIA",
                            "Conformité RGAA/WCAG"
                        ]
                    })
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://indhack.com" },
                            { "@type": "ListItem", "position": 2, "name": "Outils SEO", "item": "https://indhack.com/outils" },
                            { "@type": "ListItem", "position": 3, "name": "Checker Accessibilité", "item": "https://indhack.com/outils/checker-accessibilite" }
                        ]
                    })
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": FAQ_ITEMS.map(item => ({
                            "@type": "Question",
                            "name": item.question,
                            "acceptedAnswer": { "@type": "Answer", "text": item.answer }
                        }))
                    })
                }}
            />

            <main className="min-h-screen bg-fond-clair">
                {/* Hero */}
                <section className="relative pt-32 pb-12 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-fond-sombre via-fond-sombre to-pink-900/30" />
                    <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Fil d'Ariane">
                            <ol className="flex items-center gap-2 text-sm text-texte-moyen">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li>/</li>
                                <li><Link href="/outils" className="hover:text-white transition-colors">Outils SEO</Link></li>
                                <li>/</li>
                                <li className="text-white font-medium">Checker Accessibilité</li>
                            </ol>
                        </nav>

                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center flex-shrink-0">
                                <Accessibility className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/20 rounded-full text-pink-300 text-sm font-medium mb-4">
                                    <FileCode className="w-4 h-4" />
                                    10 critères RGAA/WCAG
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                                    Checker Accessibilité
                                </h1>
                                <p className="text-lg text-texte-moyen max-w-2xl">
                                    Testez la conformité RGAA de votre site. Score accessibilité instantané,
                                    critères WCAG vérifiés, recommandations personnalisées.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tool */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <CheckerAccessibilite />
                    </div>
                </section>

                {/* What We Analyze */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            5 catégories de critères analysés
                        </h2>
                        <div className="grid md:grid-cols-5 gap-4 max-w-5xl mx-auto">
                            {[
                                { name: "Images", desc: "Alt, images décoratives", color: "blue" },
                                { name: "Structure", desc: "Titres, document", color: "emerald" },
                                { name: "Navigation", desc: "Liens, skip link", color: "amber" },
                                { name: "Formulaires", desc: "Labels, inputs", color: "pink" },
                                { name: "Sémantique", desc: "Lang, landmarks, ARIA", color: "violet" },
                            ].map((cat) => (
                                <div key={cat.name} className={`p-4 bg-${cat.color}-50 rounded-xl border border-${cat.color}-100 text-center`}>
                                    <h3 className="font-bold text-ink">{cat.name}</h3>
                                    <p className="text-xs text-soft mt-1">{cat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* RGAA Info */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-200 p-8">
                            <h2 className="text-xl font-heading font-bold text-ink mb-4">
                                Obligations légales d'accessibilité en France
                            </h2>
                            <div className="space-y-4 text-soft">
                                <p>
                                    La loi du 11 février 2005 et le décret de 2019 rendent l'accessibilité numérique
                                    obligatoire pour de nombreux acteurs :
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong className="text-ink">Services publics</strong> : tous les sites de l'État, collectivités, établissements publics</li>
                                    <li><strong className="text-ink">Grandes entreprises</strong> : CA &gt; 250M€ depuis 2020</li>
                                    <li><strong className="text-ink">E-commerce</strong> : directive européenne 2025 pour tous les sites B2C</li>
                                </ul>
                                <p>
                                    Le non-respect peut entraîner des sanctions jusqu'à 20 000€ par an et par site.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Tools */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8">
                            Outils complémentaires
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {RELATED_TOOLS.map((tool) => {
                                const Icon = tool.icon;
                                return (
                                    <Link
                                        key={tool.href}
                                        href={tool.href}
                                        className="group p-6 bg-gray-50 rounded-2xl border border-line hover:border-pink-300 transition-all"
                                    >
                                        <Icon className="w-8 h-8 text-pink-500 mb-4" />
                                        <h3 className="font-bold text-ink mb-2 group-hover:text-pink-600 transition-colors">
                                            {tool.title}
                                        </h3>
                                        <p className="text-sm text-soft">{tool.description}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                                Questions Fréquentes
                            </h2>
                            <div className="space-y-6">
                                {FAQ_ITEMS.map((item, index) => (
                                    <div key={index} className="bg-white rounded-xl border border-line p-6">
                                        <h3 className="font-bold text-ink mb-3">{item.question}</h3>
                                        <p className="text-soft leading-relaxed">{item.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-fond-sombre">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">
                            Besoin d'une mise en conformité RGAA ?
                        </h2>
                        <p className="text-texte-moyen mb-8 max-w-xl mx-auto">
                            Notre outil gratuit vous donne un aperçu. Pour un audit complet et une mise en conformité,
                            nos experts accessibilité vous accompagnent.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-pink-500 text-white px-8 py-4 rounded-full font-bold hover:bg-pink-600 transition-colors"
                        >
                            Demander un audit RGAA
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
