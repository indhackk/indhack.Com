"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, Phone, Mail, ArrowRight } from "lucide-react";
import { HomepageBacklink } from "./seo/HomepageBacklink";

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const FAQ_DATA: FAQItem[] = [
    // Tarifs & Budget
    {
        category: "Tarifs & Budget",
        question: "Combien coûte une prestation SEO ?",
        answer: "Les tarifs varient selon la prestation. Un <strong>audit SEO complet</strong> démarre autour de <strong>500€</strong>. Un <strong>accompagnement mensuel</strong> se situe entre <strong>500€ et 2000€/mois</strong> selon l'ampleur du projet et la concurrence de votre secteur. Pour la <strong>création de site web</strong>, comptez à partir de <strong>1500€</strong> pour un site vitrine optimisé SEO. Je propose toujours un <strong>premier diagnostic gratuit</strong> pour évaluer précisément vos besoins."
    },
    {
        category: "Tarifs & Budget",
        question: "Proposez-vous des forfaits ou du sur-mesure ?",
        answer: "Je travaille principalement en <strong>sur-mesure</strong>. Chaque entreprise a des besoins différents : un artisan local n'a pas les mêmes enjeux qu'une startup tech ou un e-commerce. Après notre premier échange, je vous propose une offre adaptée à votre contexte, vos objectifs et votre budget. Pas de packages standardisés qui ne correspondent à personne."
    },
    {
        category: "Tarifs & Budget",
        question: "Faut-il un budget mensuel pour le SEO ?",
        answer: "Le SEO peut se travailler en <strong>one-shot</strong> (audit ponctuel + recommandations) ou en <strong>accompagnement continu</strong>. Pour des résultats durables, je recommande un accompagnement d'au moins <strong>6 mois</strong>. Mais si votre budget est limité, un audit suivi de formations à votre équipe peut être une alternative efficace. L'essentiel est de définir une stratégie réaliste."
    },
    // Résultats & Délais
    {
        category: "Résultats & Délais",
        question: "Combien de temps pour voir des résultats SEO ?",
        answer: "Le SEO est un investissement <strong>moyen/long terme</strong>. Les premières améliorations techniques sont visibles sous <strong>1-2 mois</strong>. Les gains de positionnement significatifs arrivent entre <strong>3 et 6 mois</strong>. Pour des mots-clés très concurrentiels, comptez <strong>6 à 12 mois</strong> pour atteindre la première page. Je fournis un <strong>reporting mensuel</strong> pour suivre la progression."
    },
    {
        category: "Résultats & Délais",
        question: "Garantissez-vous la première position Google ?",
        answer: "<strong>Non, et fuyez quiconque le promet.</strong> Google seul décide des classements, et son algorithme évolue constamment. Ce que je garantis : une <strong>méthodologie rigoureuse</strong>, des optimisations conformes aux guidelines Google, un travail transparent avec reporting, et une <strong>amélioration mesurable</strong> de votre visibilité. Mes clients constatent en moyenne +150 à 300% de trafic organique sur 12 mois."
    },
    {
        category: "Résultats & Délais",
        question: "Comment mesurez-vous les résultats ?",
        answer: "Je fournis un <strong>reporting mensuel détaillé</strong> incluant : évolution des positions sur vos mots-clés cibles, trafic organique (Google Analytics), impressions et clics (Search Console), autorité de domaine, backlinks acquis. Vous avez une <strong>visibilité totale</strong> sur le travail effectué et les résultats obtenus."
    },
    // Méthodologie
    {
        category: "Méthodologie",
        question: "Comment se déroule un accompagnement SEO ?",
        answer: "L'accompagnement débute par un <strong>audit complet</strong> (technique, sémantique, concurrence). Je livre ensuite une <strong>stratégie personnalisée</strong> avec un plan d'action priorisé. Chaque mois, je travaille sur les optimisations (technique, contenu, netlinking) et vous envoie un <strong>rapport de suivi</strong>. Des points réguliers permettent d'ajuster la stratégie selon les résultats."
    },
    {
        category: "Méthodologie",
        question: "Quels outils utilisez-vous ?",
        answer: "J'utilise une <strong>stack professionnelle</strong> complète : <strong>Screaming Frog</strong> pour le crawl technique, <strong>Google Search Console</strong> et <strong>Google Analytics</strong> pour les données de performance, <strong>Ahrefs</strong> pour l'analyse des backlinks et mots-clés, <strong>PageSpeed Insights</strong> pour les Core Web Vitals, et des outils propriétaires pour le suivi des positions."
    },
    {
        category: "Méthodologie",
        question: "Travaillez-vous avec mon équipe technique ?",
        answer: "Absolument. Je peux travailler en <strong>autonomie complète</strong> si vous me donnez les accès nécessaires, ou en <strong>collaboration</strong> avec votre équipe technique/marketing. Je fournis des recommandations claires avec le niveau de détail technique approprié. Je peux aussi <strong>former vos équipes</strong> aux bonnes pratiques SEO pour les rendre autonomes."
    },
    // SEO vs SEA
    {
        category: "SEO vs SEA",
        question: "Quelle différence entre SEO et SEA ?",
        answer: "Le <strong>SEO</strong> (référencement naturel) travaille sur les résultats organiques de Google — c'est un investissement long terme qui continue de rapporter sans coût par clic. Le <strong>SEA</strong> (Google Ads) affiche des annonces payantes — résultats immédiats mais coût par clic. Je recommande généralement de <strong>combiner les deux</strong> : SEA pour des résultats immédiats, SEO pour construire un actif durable."
    },
    {
        category: "SEO vs SEA",
        question: "Le SEO est-il rentable pour une petite entreprise ?",
        answer: "<strong>Oui, souvent plus que pour les grandes.</strong> Une PME locale peut dominer son marché géographique avec un <strong>SEO local</strong> bien travaillé, là où les grands groupes visent des mots-clés nationaux très concurrentiels. Le SEO local (Google Business Profile, citations, avis) offre un <strong>excellent ROI</strong> pour les commerces, artisans et professions libérales."
    },
    // Création de site
    {
        category: "Création de Site",
        question: "Pourquoi créer un site plutôt qu'utiliser Wix/Squarespace ?",
        answer: "Ces plateformes sont pratiques pour débuter, mais <strong>limitées en SEO</strong> : code lourd, personnalisation restreinte, vitesse médiocre, structure d'URL imposée. Pour un projet sérieux, un site <strong>sur-mesure</strong> vous appartient totalement, peut évoluer sans limite, et sera optimisé dès la première ligne de code pour performer sur Google."
    },
    {
        category: "Création de Site",
        question: "Puis-je gérer mon site moi-même ensuite ?",
        answer: "Absolument. Je configure un <strong>système de gestion de contenu</strong> (CMS) intuitif qui vous permet de modifier textes, images et pages sans toucher au code. Je fournis une <strong>formation personnalisée</strong> et une documentation. Et je reste disponible pour toute question. Vous êtes propriétaire de votre site, pas dépendant de moi."
    },
    // Organisation
    {
        category: "Organisation",
        question: "Travaillez-vous à distance ou uniquement localement ?",
        answer: "Je travaille avec des clients <strong>partout en France</strong> et à l'international. Les échanges se font par visio, téléphone et email. Pour les clients locaux (Côte d'Azur, PACA), des <strong>rendez-vous physiques</strong> sont possibles. La distance n'impacte pas la qualité de l'accompagnement — l'essentiel est une communication fluide."
    },
    {
        category: "Organisation",
        question: "Combien de clients suivez-vous en même temps ?",
        answer: "Je limite volontairement mon portefeuille à <strong>8-10 clients en accompagnement mensuel</strong>. Cela me permet de consacrer le temps nécessaire à chaque projet, de répondre rapidement à vos questions, et de produire un travail de qualité. Je préfère refuser des missions que de bâcler le travail."
    },
    {
        category: "Organisation",
        question: "Comment démarrer une collaboration ?",
        answer: "C'est simple : <strong>contactez-moi</strong> par téléphone, email ou formulaire. On échange 20-30 minutes pour comprendre vos besoins. Je vous envoie ensuite une <strong>proposition sur-mesure</strong> avec stratégie et devis détaillé. Si on s'entend, on démarre par l'audit. Pas d'engagement long terme, vous restez libre à tout moment."
    }
];

const CATEGORIES = Array.from(new Set(FAQ_DATA.map(faq => faq.category)));

export function FAQContent() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFAQs = FAQ_DATA.filter(faq => {
        const matchesCategory = !activeCategory || faq.category === activeCategory;
        const matchesSearch = !searchQuery ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="bg-fond-clair">
            {/* Hero Section */}
            <section className="bg-ink text-white py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-sauge font-medium mb-4 tracking-wide uppercase text-sm">
                            Questions fréquentes
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                            Tout savoir sur le <span className="text-sauge">SEO</span>
                        </h1>
                        <p className="text-xl text-white/80 leading-relaxed">
                            Tarifs, délais, méthodologie, résultats... Je réponds à toutes vos questions
                            sur le référencement naturel et mes prestations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search & Filters */}
            <section className="py-8 border-b border-line bg-white sticky top-0 z-10">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Search Bar */}
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft" />
                            <input
                                type="text"
                                placeholder="Rechercher une question..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-line rounded-xl focus:outline-none focus:border-sauge focus:ring-2 focus:ring-sauge/20 transition-all"
                            />
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveCategory(null)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    !activeCategory
                                        ? "bg-sauge text-white"
                                        : "bg-fond-clair text-soft hover:bg-line"
                                }`}
                            >
                                Toutes
                            </button>
                            {CATEGORIES.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                        activeCategory === category
                                            ? "bg-sauge text-white"
                                            : "bg-fond-clair text-soft hover:bg-line"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ List */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {filteredFAQs.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-soft text-lg">
                                    Aucune question ne correspond à votre recherche.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredFAQs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl border border-line overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                            className="w-full flex items-center justify-between p-6 text-left hover:bg-fond-clair/50 transition-colors"
                                        >
                                            <div className="flex-1 pr-4">
                                                <span className="text-xs font-medium text-sauge uppercase tracking-wide mb-1 block">
                                                    {faq.category}
                                                </span>
                                                <h2 className="text-lg font-bold text-ink">
                                                    {faq.question}
                                                </h2>
                                            </div>
                                            <ChevronDown
                                                className={`w-5 h-5 text-sauge transition-transform flex-shrink-0 ${
                                                    openIndex === index ? "rotate-180" : ""
                                                }`}
                                            />
                                        </button>

                                        {openIndex === index && (
                                            <div className="px-6 pb-6">
                                                <div
                                                    className="text-soft leading-relaxed prose prose-sm max-w-none"
                                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Une question spécifique ?
                        </h2>
                        <p className="text-white/70 text-lg mb-8">
                            Contactez-moi pour un premier échange gratuit. Je réponds généralement sous 24h.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:0661139748"
                                className="inline-flex items-center justify-center gap-2 bg-sauge hover:bg-sauge/90 text-white px-8 py-4 rounded-xl font-bold transition-all"
                            >
                                <Phone className="w-5 h-5" />
                                06 61 13 97 48
                            </a>
                            <a
                                href="mailto:contact@indhack.com"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all"
                            >
                                <Mail className="w-5 h-5" />
                                contact@indhack.com
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Links */}
            <section className="py-16 bg-fond-clair">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-heading font-bold mb-8 text-center">
                            En savoir plus sur mes services
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Link
                                href="/audit-seo"
                                className="group bg-white p-6 rounded-2xl border border-line hover:border-sauge transition-all"
                            >
                                <h3 className="font-bold text-ink mb-2 group-hover:text-sauge transition-colors">
                                    Audit SEO
                                </h3>
                                <p className="text-soft text-sm mb-3">
                                    Diagnostic complet de votre site web
                                </p>
                                <span className="inline-flex items-center gap-1 text-sauge text-sm font-medium">
                                    Découvrir <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                            <Link
                                href="/referencement-naturel"
                                className="group bg-white p-6 rounded-2xl border border-line hover:border-sauge transition-all"
                            >
                                <h3 className="font-bold text-ink mb-2 group-hover:text-sauge transition-colors">
                                    Stratégie SEO complète
                                </h3>
                                <p className="text-soft text-sm mb-3">
                                    Accompagnement mensuel personnalisé
                                </p>
                                <span className="inline-flex items-center gap-1 text-sauge text-sm font-medium">
                                    Découvrir <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                            <Link
                                href="/creation-site-web"
                                className="group bg-white p-6 rounded-2xl border border-line hover:border-sauge transition-all"
                            >
                                <h3 className="font-bold text-ink mb-2 group-hover:text-sauge transition-colors">
                                    Création de site web
                                </h3>
                                <p className="text-soft text-sm mb-3">
                                    Sites optimisés SEO dès la conception
                                </p>
                                <span className="inline-flex items-center gap-1 text-sauge text-sm font-medium">
                                    Découvrir <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <HomepageBacklink />
        </main>
    );
}
