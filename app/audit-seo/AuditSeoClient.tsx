"use client";

import { HeroServices } from "@/components/services/HeroServices";
import { FAQ } from "@/components/FAQ";
import { RelatedServices } from "@/components/RelatedServices";
import { motion } from "framer-motion";
import { Search, BarChart4, ClipboardList, Target, ArrowRight, CheckCircle2, AlertTriangle, MapPin, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";

const FEATURED_CITIES = [
    { name: "Nice", slug: "consultant-seo-nice" },
    { name: "Paris", slug: "consultant-seo-paris" },
    { name: "Lyon", slug: "consultant-seo-lyon" },
    { name: "Marseille", slug: "consultant-seo-marseille" },
];

const AUDIT_FEATURES = [
    {
        icon: <Search className="w-8 h-8 text-sauge" />,
        title: "Analyse technique",
        desc: "Crawl profond de votre site pour identifier les erreurs invisibles : indexation, redirections, vitesse de chargement."
    },
    {
        icon: <BarChart4 className="w-8 h-8 text-sauge" />,
        title: "Audit sémantique",
        desc: "Analyse de vos mots-clés stratégiques et de la pertinence de vos contenus face aux intentions de recherche."
    },
    {
        icon: <ClipboardList className="w-8 h-8 text-sauge" />,
        title: "Profil de backlinks",
        desc: "Évaluation de la puissance et de la santé de votre Netlinking. Nettoyage et stratégie d'autorité."
    },
    {
        icon: <Target className="w-8 h-8 text-sauge" />,
        title: "Roadmap priorisée",
        desc: "Un plan d'action concret avec les interventions à ROI immédiat et les chantiers de fond."
    }
];

const AUDIT_FAQ = [
    {
        question: "Pourquoi faire un audit SEO avant de lancer une stratégie ?",
        answer: "C'est comme le diagnostic d'un médecin. Sans audit, on risque d'investir du temps et de l'argent sur des pages qui ne pourront jamais ranker à cause de blocages techniques invisibles."
    },
    {
        question: "L'audit inclut-il une analyse de la concurrence ?",
        answer: "Oui, systématiquement. Je décortique la stratégie de vos concurrents directs pour comprendre comment ils captent votre trafic et identifier leurs failles."
    },
    {
        question: "Sous quel format est livré l'audit SEO ?",
        answer: "Vous recevez un rapport structuré avec une **roadmap opérationnelle**. Pas de blabla inutile : des recommandations concrètes, priorisées par impact business et facilité d'implémentation."
    },
    {
        question: "Combien coûte un audit SEO ?",
        answer: "Le tarif d'un audit complet s'établit **sur devis** (avec des prestations pouvant démarrer autour de 150€), selon la taille du site et la profondeur d'analyse requise. Je propose un premier diagnostic gratuit pour évaluer précisément vos besoins."
    },
    {
        question: "Combien de temps dure un audit SEO complet ?",
        answer: "Comptez **5 à 10 jours ouvrés** selon la complexité de votre site. Je préfère prendre le temps d'une analyse approfondie plutôt que de livrer un rapport automatisé superficiel."
    },
    {
        question: "Que contient le rapport d'audit ?",
        answer: "Le rapport inclut : analyse technique (indexation, vitesse, Core Web Vitals), audit sémantique (mots-clés, contenu), profil de backlinks, benchmark concurrentiel, et surtout une **roadmap priorisée** avec les actions à mener classées par impact."
    }
];

export default function AuditSeoClient() {
    const { openAuditModal } = useModal();

    return (
        <main className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Audit SEO Complet",
                        "description": "Audit technique et sémantique approfondi pour identifier les bloquants SEO de votre site.",
                        "provider": {
                            "@type": "Person",
                            "name": "Indiana Aflalo",
                            "url": "https://indhack.com"
                        },
                        "areaServed": "France",
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Audits SEO",
                            "itemListElement": [
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Audit Technique" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Audit Sémantique" } }
                            ]
                        }
                    })
                }}
            />

            <HeroServices
                title="Votre site a un problème. L'audit SEO le révèle."
                subtitle="Vous investissez du temps et de l'argent dans votre site, mais les résultats ne suivent pas ? Des blocages invisibles freinent votre croissance. Je les trouve."
                image="audit-seo"
                category="Diagnostic & Stratégie"
            />

            {/* Hook - Problème */}
            <section className="py-12 bg-amber-50 border-y border-amber-200">
                <div className="container mx-auto px-4">
                    <div className="flex items-start gap-4 max-w-3xl mx-auto">
                        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                            <p className="text-amber-900 font-medium">
                                <strong>72% des sites</strong> ont des erreurs techniques qui les empêchent de ranker.
                                Sans audit, vous optimisez peut-être des pages qui ne pourront jamais atteindre la première page.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-heading font-bold text-ink uppercase tracking-tighter"
                        >
                            Une analyse <span className="text-sauge">stratégique</span>
                        </motion.h2>
                        <p className="text-xl text-soft leading-relaxed max-w-3xl mx-auto">
                            L'audit SEO n'est pas une simple liste d'erreurs techniques. C'est une <strong>feuille de route détaillée</strong> pour aligner votre site avec les attentes de Google et de vos clients.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {AUDIT_FEATURES.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:border-sauge/30 hover:shadow-2xl transition-all group"
                            >
                                <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:bg-sauge group-hover:text-white group-hover:rotate-12 transition-all duration-500">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-ink mb-4 transition-colors group-hover:text-sauge uppercase tracking-tight">{feature.title}</h3>
                                <p className="text-soft leading-relaxed text-sm">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Éducative - Pourquoi un audit SEO en 2026 */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="text-sauge font-bold tracking-[0.2em] uppercase mb-4 text-sm">Contexte 2026</p>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">
                                Pourquoi votre site a besoin d'un <span className="text-sauge">audit SEO</span> aujourd'hui
                            </h2>
                        </div>

                        <div className="prose prose-lg max-w-none text-soft">
                            <p>
                                Google fait plus de <strong>4 000 mises à jour de son algorithme par an</strong>. Ce qui fonctionnait en 2023 peut vous rendre invisible en 2026. Les IA comme ChatGPT et Perplexity changent la façon dont les gens cherchent l'information. Sans audit, vous naviguez à vue.
                            </p>
                            <p>
                                <strong>68 % des expériences en ligne commencent par un moteur de recherche</strong>. Si votre site a des blocages techniques (indexation, vitesse, structure), vous perdez ce trafic avant même de le savoir. Pire : vous investissez peut-être dans du contenu ou de la publicité pour des pages qui ne pourront jamais ranker.
                            </p>
                            <p>
                                Un diagnostic SEO n'est pas une dépense, c'est un investissement. Il révèle les fuites invisibles de votre site : les erreurs techniques qui empêchent Google de vous comprendre, les mots-clés mal ciblés qui attirent le mauvais trafic, les pages cannibalisées qui se battent entre elles.
                            </p>
                            <p>
                                C'est pourquoi je recommande toujours de <Link href="/blog/importance-audit-seo" className="text-sauge hover:underline">commencer par un audit</Link> avant d'investir dans une stratégie de <Link href="/referencement-naturel" className="text-sauge hover:underline">référencement naturel</Link>. Sans diagnostic, on risque de soigner les mauvais symptômes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Freelance vs Agence */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">
                                Audit SEO : <span className="text-sauge">freelance ou agence</span> ?
                            </h2>
                            <p className="text-lg text-soft mt-4 max-w-2xl mx-auto">
                                La question revient souvent. Voici une comparaison honnête pour vous aider à choisir.
                            </p>
                        </div>

                        <div className="overflow-x-auto mb-8">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="py-4 px-4 font-bold text-ink">Critère</th>
                                        <th className="py-4 px-4 font-bold text-sauge">Freelance</th>
                                        <th className="py-4 px-4 font-bold text-ink">Agence</th>
                                    </tr>
                                </thead>
                                <tbody className="text-soft">
                                    <tr className="border-b border-gray-100">
                                        <td className="py-4 px-4 font-medium">Prix audit complet</td>
                                        <td className="py-4 px-4">Sur devis</td>
                                        <td className="py-4 px-4">Forfait d'agence</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-4 px-4 font-medium">Interlocuteur</td>
                                        <td className="py-4 px-4">Expert unique, direct</td>
                                        <td className="py-4 px-4">Account manager + équipe</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-4 px-4 font-medium">Délai de livraison</td>
                                        <td className="py-4 px-4">5-10 jours</td>
                                        <td className="py-4 px-4">2-4 semaines</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-4 px-4 font-medium">Personnalisation</td>
                                        <td className="py-4 px-4">Haute (approche sur-mesure)</td>
                                        <td className="py-4 px-4">Variable (process standardisés)</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-4 px-4 font-medium">Qui fait le travail ?</td>
                                        <td className="py-4 px-4">L'expert senior lui-même</td>
                                        <td className="py-4 px-4">Souvent un junior supervisé</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl">
                            <p className="text-soft">
                                <strong className="text-ink">Pourquoi j'ai choisi le freelance :</strong> Un seul interlocuteur expert, pas de process corporate, pas de junior qui apprend sur votre dossier. Quand vous me confiez un audit, c'est moi qui le réalise. Je connais votre site, votre marché, vos concurrents. Et je suis disponible directement si vous avez des questions.
                            </p>
                            <p className="text-soft mt-4">
                                Pour en savoir plus sur mon approche, découvrez <Link href="/consultant-seo" className="text-sauge hover:underline">mon profil de consultante SEO</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Processus en 5 étapes */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">
                                Mon processus d'audit <span className="text-sauge">en 5 étapes</span>
                            </h2>
                            <p className="text-lg text-soft mt-4">
                                Chaque audit suit une méthodologie rigoureuse pour ne rien laisser au hasard.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-6 items-start bg-white p-6 rounded-2xl border border-gray-100">
                                <div className="w-12 h-12 bg-sauge text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                                <div>
                                    <h3 className="text-xl font-bold text-ink mb-2">Crawl technique approfondi</h3>
                                    <p className="text-soft">Screaming Frog + Google Search Console pour scanner chaque URL : indexation, redirections, erreurs 4xx/5xx, vitesse de chargement, Core Web Vitals.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start bg-white p-6 rounded-2xl border border-gray-100">
                                <div className="w-12 h-12 bg-sauge text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                                <div>
                                    <h3 className="text-xl font-bold text-ink mb-2">Analyse sémantique</h3>
                                    <p className="text-soft">Identification des mots-clés sur lesquels vous devriez ranker, analyse des positions actuelles, détection des cannibalisations et des opportunités manquées.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start bg-white p-6 rounded-2xl border border-gray-100">
                                <div className="w-12 h-12 bg-sauge text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                                <div>
                                    <h3 className="text-xl font-bold text-ink mb-2">Audit de popularité</h3>
                                    <p className="text-soft">Analyse de votre profil de backlinks (qualité, toxicité, ancres), comparaison avec vos concurrents, identification des opportunités de netlinking.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start bg-white p-6 rounded-2xl border border-gray-100">
                                <div className="w-12 h-12 bg-sauge text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>
                                <div>
                                    <h3 className="text-xl font-bold text-ink mb-2">Benchmark concurrentiel</h3>
                                    <p className="text-soft">Décryptage de la stratégie de 3 à 5 concurrents directs : sur quels mots-clés ils rankent, d'où viennent leurs backlinks, quels contenus performent.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start bg-white p-6 rounded-2xl border border-gray-100">
                                <div className="w-12 h-12 bg-sauge text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">5</div>
                                <div>
                                    <h3 className="text-xl font-bold text-ink mb-2">Roadmap priorisée par ROI</h3>
                                    <p className="text-soft">Le cœur du rapport : une matrice effort/impact qui classe chaque recommandation. Vous savez exactement par où commencer pour maximiser votre retour sur investissement.</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-soft mt-8">
                            Découvrez <Link href="/blog/contenu-rapport-audit-seo" className="text-sauge hover:underline">ce que contient concrètement un rapport d'audit SEO</Link>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section Signaux d'alerte */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">
                                Quand avez-vous besoin d'un <span className="text-sauge">audit SEO</span> ?
                            </h2>
                            <p className="text-lg text-soft mt-4">
                                Ces signaux indiquent que votre site a besoin d'un diagnostic approfondi.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex gap-4 items-start bg-amber-50 p-6 rounded-2xl border border-amber-100">
                                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-ink mb-2">Votre trafic organique baisse</h3>
                                    <p className="text-soft text-sm">Une chute de 20%+ peut signaler une pénalité algorithmique ou un problème technique invisible.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start bg-amber-50 p-6 rounded-2xl border border-amber-100">
                                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-ink mb-2">Vous ne rankez pas malgré vos efforts</h3>
                                    <p className="text-soft text-sm">Vous publiez du contenu mais Google ne le positionne pas ? Un blocage technique empêche le crawl.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start bg-amber-50 p-6 rounded-2xl border border-amber-100">
                                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-ink mb-2">Vos concurrents vous dépassent</h3>
                                    <p className="text-soft text-sm">Vous étiez premier, maintenant vous êtes en page 2 ? Il est temps de comprendre pourquoi.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start bg-amber-50 p-6 rounded-2xl border border-amber-100">
                                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-ink mb-2">Vous préparez une refonte de site</h3>
                                    <p className="text-soft text-sm">Avant de tout changer, identifiez ce qui fonctionne pour ne pas perdre vos acquis SEO.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start bg-amber-50 p-6 rounded-2xl border border-amber-100">
                                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-ink mb-2">Votre site est lent (PageSpeed &lt; 50)</h3>
                                    <p className="text-soft text-sm">Les Core Web Vitals impactent directement le classement. Testez avec notre <Link href="/outils/audit-seo-gratuit" className="text-sauge hover:underline">outil gratuit</Link>.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start bg-amber-50 p-6 rounded-2xl border border-amber-100">
                                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-ink mb-2">Vous n'avez jamais fait d'audit</h3>
                                    <p className="text-soft text-sm">Plus de 2 ans sans diagnostic ? Des problèmes s'accumulent sans que vous le sachiez.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Résultats typiques */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">
                                Ce que révèle un <span className="text-sauge">audit type</span>
                            </h2>
                            <p className="text-lg text-soft mt-4 max-w-2xl mx-auto">
                                En moyenne, voici ce que je trouve lors d'un audit complet sur un site qui n'a jamais été optimisé.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6 mb-12">
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
                                <p className="text-5xl font-bold text-sauge mb-2">23%</p>
                                <p className="text-soft text-sm">des pages ont des problèmes d'indexation</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
                                <p className="text-5xl font-bold text-sauge mb-2">47%</p>
                                <p className="text-soft text-sm">des balises title sont mal optimisées</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
                                <p className="text-5xl font-bold text-sauge mb-2">5+</p>
                                <p className="text-soft text-sm">paires de pages en cannibalisation</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
                                <p className="text-5xl font-bold text-sauge mb-2">68%</p>
                                <p className="text-soft text-sm">des sites ont des Core Web Vitals insuffisants</p>
                            </div>
                        </div>

                        <div className="bg-ink p-8 rounded-2xl text-white">
                            <p className="text-lg">
                                <strong className="text-sauge">Ces chiffres sont basés sur mes audits réels.</strong> La bonne nouvelle ? Chaque problème identifié est une opportunité de croissance. Corrigez ces erreurs et regardez votre trafic organique augmenter en quelques mois.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-ink mb-16 uppercase tracking-tighter">
                        Pourquoi IndHack pour votre <span className="text-sauge">Audit</span> ?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        <AuditPoint title="Rigueur Pro" text="Je n'utilise pas d'outils automatisés génériques. Chaque audit est une analyse manuelle et experte." />
                        <AuditPoint title="Focus Business" text="Je ne liste pas d'erreurs gratuites. Je me focalise sur ce qui empêche vos ventes et vos conversions." />
                        <AuditPoint title="Accompagnement" text="Je vous explique chaque recommandation pour que vous puissiez l'implémenter sereinement." />
                    </div>
                </div>
            </section>

            {/* Section Types d'audit et Maillage */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                                Audit adapté à <span className="text-sauge">votre situation</span>
                            </h2>
                            <p className="text-lg text-soft max-w-2xl mx-auto">
                                Que vous soyez une entreprise locale ou nationale, un e-commerce ou un site vitrine,
                                l'audit est personnalisé selon vos objectifs.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-sauge transition-all">
                                <MapPin className="w-10 h-10 text-sauge mb-4" />
                                <h3 className="text-xl font-bold text-ink mb-3">Audit SEO Local</h3>
                                <p className="text-soft mb-4">
                                    Pour les entreprises qui ciblent une zone géographique précise. Analyse de votre
                                    <strong>Google Business Profile</strong>, positionnement local et stratégie de proximité.
                                </p>
                                <Link href="/seo-local" className="text-sauge font-semibold hover:underline inline-flex items-center gap-2">
                                    Découvrir le SEO Local <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-sauge transition-all">
                                <FileText className="w-10 h-10 text-sauge mb-4" />
                                <h3 className="text-xl font-bold text-ink mb-3">Audit Technique Complet</h3>
                                <p className="text-soft mb-4">
                                    Analyse en profondeur de l'architecture, de la vitesse, de l'indexation et des Core Web Vitals.
                                    Idéal avant une <Link href="/refonte-site-web" className="text-sauge hover:underline">refonte de site</Link> ou une <Link href="/creation-site-web" className="text-sauge hover:underline">création de site web optimisé SEO</Link>.
                                </p>
                                <Link href="/consultant-seo" className="text-sauge font-semibold hover:underline inline-flex items-center gap-2">
                                    En savoir plus sur mes services <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="bg-ink p-8 rounded-2xl text-white">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Besoin d'un audit dans votre ville ?</h3>
                                    <p className="text-soft-light">
                                        J'accompagne des entreprises dans toute la France avec une expertise particulière sur la Côte d'Azur.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {FEATURED_CITIES.map((city) => (
                                        <Link
                                            key={city.slug}
                                            href={`/${city.slug}`}
                                            className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-sauge transition-all"
                                        >
                                            {city.name}
                                        </Link>
                                    ))}
                                    <Link
                                        href="/seo-local"
                                        className="px-4 py-2 bg-sauge text-white rounded-full text-sm font-medium hover:bg-white hover:text-ink transition-all"
                                    >
                                        Toutes les villes →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Outil gratuit - Maillage */}
            <section className="py-12 bg-sauge/5 border-y border-sauge/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-sauge font-bold text-sm uppercase tracking-wider mb-3">Outil Gratuit</p>
                        <h2 className="text-2xl font-heading font-bold text-ink mb-4">
                            Testez votre site gratuitement
                        </h2>
                        <p className="text-soft mb-6">
                            Obtenez un premier aperçu de la santé SEO de votre site en 30 secondes avec mon outil d'audit gratuit.
                        </p>
                        <Link href="/outils/audit-seo-gratuit" className="inline-flex items-center gap-2 bg-sauge text-white px-6 py-3 rounded-xl font-semibold hover:bg-ink transition-all">
                            Lancer l'audit gratuit <ArrowRight className="w-4 h-4" />
                        </Link>
                        <p className="text-sm text-soft mt-4">
                            <Link href="/outils" className="text-sauge hover:underline">Voir tous mes outils SEO gratuits →</Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* Articles liés */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">
                            Approfondir le sujet
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Link href="/blog/contenu-rapport-audit-seo" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Audit SEO : que contient le rapport ?
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Découvrez en détail ce que contient un rapport d'audit SEO professionnel.
                                </p>
                            </Link>
                            <Link href="/blog/importance-audit-seo" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Pourquoi l'audit SEO est le point de départ
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Ne naviguez plus à vue. L'audit est l'investissement le plus rentable.
                                </p>
                            </Link>
                            <Link href="/blog/audit-seo-erreurs-qui-coutent-cher" className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all">
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    9 erreurs SEO qui coûtent cher
                                </h3>
                                <p className="text-soft text-sm mt-2">
                                    Les erreurs invisibles que je vois sur 90% des sites audités.
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Outils SEO Gratuits */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-heading font-bold text-ink mb-6">
                        Testez vos performances <span className="text-sauge">gratuitement</span>
                    </h2>
                    <p className="text-soft mb-8 max-w-2xl mx-auto">
                        Besoin d'un premier avis rapide ? Utilisez mes outils d'audit instantané.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/outils" className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 rounded-full text-ink font-bold hover:border-sauge hover:text-sauge transition-colors bg-gray-50">
                            <span className="mr-2">🛠️</span> Voir tous les outils SEO
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        <Link href="/consultant-geo" className="text-soft hover:text-sauge transition-colors text-sm">
                            Découvrir le <span className="underline">consultant GEO</span> →
                        </Link>
                        <Link href="/audit-ia" className="text-soft hover:text-sauge transition-colors text-sm">
                            Découvrir l'<span className="underline">audit IA gratuit</span> →
                        </Link>
                    </div>
                </div>
            </section>

            <FAQ items={AUDIT_FAQ} title="Questions sur l'audit SEO" />

            {/* Services complémentaires */}
            <RelatedServices currentService="audit-seo" />

            {/* Lien vers la page d'accueil - Maillage interne SEO */}
            <HomepageBacklink variant="default" />

            {/* Final CTA */}
            <section className="py-24 bg-white text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-ink p-16 rounded-[4rem] text-white overflow-hidden relative group">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sauge/20 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-1000" />

                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 uppercase tracking-tighter relative z-10">
                            Passez à l'étape <br />
                            <span className="text-sauge">supérieure</span>.
                        </h2>
                        <p className="text-xl text-soft-light mb-12 max-w-xl mx-auto relative z-10">
                            Obtenez un état des lieux clair de votre site et un plan d'action chiffré.
                        </p>
                        <div className="relative z-10">
                            <Button
                                onClick={openAuditModal}
                                size="lg"
                                className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-12 py-8 text-xl font-bold shadow-xl shadow-sauge/20"
                            >
                                COMMANDER MON AUDIT
                                <ArrowRight className="ml-3 w-6 h-6" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}

function AuditPoint({ title, text }: { title: string, text: string }) {
    return (
        <div className="space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-sauge/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-sauge" />
            </div>
            <h4 className="text-2xl font-bold text-ink uppercase tracking-tight">{title}</h4>
            <div className="text-soft leading-relaxed">
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>
        </div>
    )
}
