"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    Circle,
    ArrowRight,
    Shield,
    FileText,
    Code,
    Users,
    Share2,
    BarChart3,
    Sparkles,
    RefreshCw
} from "lucide-react";

interface ChecklistItem {
    id: string;
    text: string;
    impact: "critique" | "élevé" | "moyen";
    link?: { label: string; href: string };
}

interface ChecklistCategory {
    title: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    items: ChecklistItem[];
}

const CHECKLIST_DATA: ChecklistCategory[] = [
    {
        title: "Accessibilité IA (crawlers)",
        icon: Shield,
        color: "text-red-600",
        bgColor: "bg-red-50",
        items: [
            { id: "a1", text: "GPTBot autorisé dans robots.txt", impact: "critique", link: { label: "Générateur robots.txt", href: "/outils/generateur-robots-txt" } },
            { id: "a2", text: "ClaudeBot autorisé dans robots.txt", impact: "critique" },
            { id: "a3", text: "PerplexityBot autorisé dans robots.txt", impact: "critique" },
            { id: "a4", text: "Google-Extended (Gemini) autorisé", impact: "critique" },
            { id: "a5", text: "OAI-SearchBot autorisé", impact: "élevé" },
            { id: "a6", text: "MistralBot autorisé (IA française)", impact: "élevé" },
            { id: "a7", text: "ChatGPT-User autorisé", impact: "élevé" },
            { id: "a8", text: "Applebot-Extended autorisé", impact: "moyen" },
            { id: "a9", text: "Sitemap XML accessible et à jour", impact: "critique" },
            { id: "a10", text: "Temps de réponse serveur < 2 secondes", impact: "élevé" },
        ]
    },
    {
        title: "Fichiers et standards IA",
        icon: FileText,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        items: [
            { id: "f1", text: "Fichier llms.txt à la racine du site", impact: "critique", link: { label: "Guide llms.txt", href: "/blog/llms-txt-guide-complet" } },
            { id: "f2", text: "llms.txt en Markdown avec titres #", impact: "élevé" },
            { id: "f3", text: "llms.txt contient un résumé de l'activité", impact: "élevé" },
            { id: "f4", text: "llms.txt contient les liens clés du site", impact: "élevé" },
            { id: "f5", text: "llms-full.txt (version étendue) disponible", impact: "moyen" },
            { id: "f6", text: "Date de mise à jour dans llms.txt", impact: "moyen" },
            { id: "f7", text: "Informations de citation pour les IA", impact: "élevé" },
        ]
    },
    {
        title: "Contenu optimisé pour les IA",
        icon: Sparkles,
        color: "text-violet-600",
        bgColor: "bg-violet-50",
        items: [
            { id: "c1", text: "Articles de 2 000+ mots sur les sujets clés", impact: "critique" },
            { id: "c2", text: "Minimum 5 statistiques sourcées par article", impact: "critique", link: { label: "Guide GEO", href: "/blog/geo-comment-apparaitre-chatgpt-2026" } },
            { id: "c3", text: "Paragraphes autonomes et citables (50-150 mots)", impact: "élevé" },
            { id: "c4", text: "Questions-réponses intégrées (format FAQ)", impact: "élevé" },
            { id: "c5", text: "Définitions claires des termes clés", impact: "élevé" },
            { id: "c6", text: "Tableaux comparatifs avec données factuelles", impact: "élevé" },
            { id: "c7", text: "Ton d'expert avec cas concrets", impact: "moyen" },
            { id: "c8", text: "Contenu mis à jour dans les 30 derniers jours", impact: "critique" },
            { id: "c9", text: "Pas de contenu dupliqué ou thin content", impact: "élevé" },
            { id: "c10", text: "Recherche originale ou données propriétaires", impact: "critique" },
        ]
    },
    {
        title: "Données structurées (Schema.org)",
        icon: Code,
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        items: [
            { id: "s1", text: "Schema Organization avec knowsAbout", impact: "élevé", link: { label: "Générateur Schema", href: "/outils/generateur-schema-json-ld" } },
            { id: "s2", text: "Schema Person pour l'auteur principal", impact: "élevé" },
            { id: "s3", text: "Schema Article/BlogPosting avec dateModified", impact: "critique" },
            { id: "s4", text: "Schema FAQPage sur chaque page avec FAQ", impact: "élevé" },
            { id: "s5", text: "Schema BreadcrumbList (navigation)", impact: "moyen" },
            { id: "s6", text: "Schema SoftwareApplication (si outil)", impact: "moyen" },
            { id: "s7", text: "Schema LocalBusiness (si commerce local)", impact: "élevé" },
            { id: "s8", text: "sameAs avec profils sociaux vérifiés", impact: "moyen" },
        ]
    },
    {
        title: "E-E-A-T et signaux d'autorité",
        icon: Users,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        items: [
            { id: "e1", text: "Page À propos détaillée avec bio de l'auteur", impact: "critique" },
            { id: "e2", text: "Nom de l'auteur sur chaque article", impact: "élevé" },
            { id: "e3", text: "Backlinks de sites que les IA citent déjà", impact: "critique" },
            { id: "e4", text: "Mentions sur Wikipedia, Reddit ou GitHub", impact: "élevé" },
            { id: "e5", text: "Avis clients ou témoignages vérifiables", impact: "moyen" },
            { id: "e6", text: "Profils LinkedIn et réseaux professionnels liés", impact: "moyen" },
            { id: "e7", text: "Citations de sources académiques dans le contenu", impact: "élevé" },
        ]
    },
    {
        title: "Distribution et visibilité",
        icon: Share2,
        color: "text-indigo-600",
        bgColor: "bg-indigo-50",
        items: [
            { id: "d1", text: "Contenu partagé sur Reddit (subs pertinents)", impact: "élevé" },
            { id: "d2", text: "Présence sur GitHub (repo, README)", impact: "moyen" },
            { id: "d3", text: "Chaîne YouTube avec contenu de référence", impact: "élevé" },
            { id: "d4", text: "Newsletter indexable (Substack ou similaire)", impact: "moyen" },
            { id: "d5", text: "Articles invités sur sites d'autorité du secteur", impact: "critique" },
            { id: "d6", text: "IndexNow configuré pour notification instantanée", impact: "moyen" },
            { id: "d7", text: "Données ouvertes / études téléchargeables", impact: "élevé" },
            { id: "d8", text: "Badge ou widget embarquable par d'autres sites", impact: "moyen" },
        ]
    },
];

export default function ChecklistGEOClient() {
    const [checked, setChecked] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
        setChecked(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const totalItems = useMemo(() => CHECKLIST_DATA.reduce((acc, cat) => acc + cat.items.length, 0), []);
    const progress = Math.round((checked.size / totalItems) * 100);

    const impactColors = {
        critique: "bg-red-100 text-red-700",
        "élevé": "bg-amber-100 text-amber-700",
        moyen: "bg-blue-100 text-blue-700",
    };

    return (
        <main className="bg-white">
            {/* Hero */}
            <section className="bg-ink text-white pt-32 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sauge/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                                Checklist GEO 2026 :<br />
                                <span className="text-sauge-light">50 points pour être visible dans les IA</span>
                            </h1>
                            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                                Cochez chaque point au fur et à mesure de votre optimisation. Cette checklist couvre tout ce qu&apos;il faut pour être cité par ChatGPT, Perplexity, Claude et Gemini.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Progress bar sticky */}
            <div className="sticky top-0 z-50 bg-white border-b border-line shadow-sm">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-4 max-w-4xl mx-auto">
                        <BarChart3 className="w-5 h-5 text-sauge flex-shrink-0" />
                        <div className="flex-1">
                            <div className="w-full bg-gray-100 rounded-full h-3">
                                <motion.div
                                    className="bg-sauge h-3 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>
                        <span className="text-sm font-bold text-ink flex-shrink-0">
                            {checked.size}/{totalItems} ({progress} %)
                        </span>
                        {checked.size > 0 && (
                            <button
                                onClick={() => setChecked(new Set())}
                                className="text-soft hover:text-ink transition-colors"
                                title="Réinitialiser"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Checklist */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-12">
                        {CHECKLIST_DATA.map((category, catIndex) => (
                            <motion.div
                                key={catIndex}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: catIndex * 0.05 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-10 h-10 rounded-xl ${category.bgColor} ${category.color} flex items-center justify-center`}>
                                        <category.icon className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-2xl font-heading font-bold text-ink">{category.title}</h2>
                                    <span className="text-sm text-soft ml-auto">
                                        {category.items.filter(item => checked.has(item.id)).length}/{category.items.length}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    {category.items.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => toggleItem(item.id)}
                                            className={`w-full flex items-start gap-3 p-4 rounded-xl border transition-all text-left ${
                                                checked.has(item.id)
                                                    ? 'bg-emerald-50 border-emerald-200'
                                                    : 'bg-white border-line hover:border-sauge/30 hover:shadow-sm'
                                            }`}
                                        >
                                            {checked.has(item.id) ? (
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                                            )}
                                            <div className="flex-1">
                                                <span className={`text-sm ${checked.has(item.id) ? 'text-emerald-700 line-through' : 'text-ink'}`}>
                                                    {item.text}
                                                </span>
                                                {item.link && !checked.has(item.id) && (
                                                    <Link
                                                        href={item.link.href}
                                                        className="block text-xs text-sauge hover:underline mt-1"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        → {item.link.label}
                                                    </Link>
                                                )}
                                            </div>
                                            <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${impactColors[item.impact]}`}>
                                                {item.impact}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-sauge text-white">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <h2 className="text-3xl font-heading font-bold mb-4">Testez votre score GEO</h2>
                    <p className="text-white/80 text-lg mb-8">
                        Utilisez notre Testeur Visibilité IA gratuit pour vérifier automatiquement une partie de cette checklist.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/outils/testeur-visibilite-ia">
                            <Button className="bg-white text-sauge hover:bg-fond-clair px-8 py-6 rounded-xl text-lg font-bold">
                                Tester mon site gratuitement
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/consultant-geo">
                            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg">
                                Demander un audit GEO complet
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Articles liés */}
            <section className="py-16 bg-fond-clair">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-2xl font-heading font-bold text-ink mb-8 text-center">Ressources complémentaires</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Link href="/blog/geo-comment-apparaitre-chatgpt-2026" className="group bg-white p-6 rounded-2xl border border-line hover:border-sauge hover:shadow-lg transition-all">
                            <span className="text-xs font-medium text-sauge uppercase tracking-wide">Guide complet</span>
                            <h3 className="text-base font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                GEO 2026 : être visible sur ChatGPT et les IA
                            </h3>
                        </Link>
                        <Link href="/blog/llms-txt-guide-complet" className="group bg-white p-6 rounded-2xl border border-line hover:border-sauge hover:shadow-lg transition-all">
                            <span className="text-xs font-medium text-sauge uppercase tracking-wide">Guide technique</span>
                            <h3 className="text-base font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                llms.txt : le guide complet pour votre site
                            </h3>
                        </Link>
                        <Link href="/etude/barometre-visibilite-ia-2026" className="group bg-white p-6 rounded-2xl border border-line hover:border-sauge hover:shadow-lg transition-all">
                            <span className="text-xs font-medium text-sauge uppercase tracking-wide">Étude</span>
                            <h3 className="text-base font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                Baromètre de visibilité IA 2026
                            </h3>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
