"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Copy, Check, ArrowRight, FileText, BarChart3, Hash, Sparkles, Download, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";

// Liste complète des stop words français
const FRENCH_STOP_WORDS = new Set([
    "le", "la", "les", "de", "du", "des", "un", "une", "et", "en", "à", "pour", "que", "qui",
    "est", "dans", "sur", "avec", "par", "au", "ce", "il", "ne", "se", "pas", "plus", "son",
    "sa", "ses", "ou", "mais", "comme", "tout", "bien", "aussi", "fait", "être", "avoir",
    "faire", "dit", "cette", "si", "leur", "même", "entre", "après", "nous", "vous", "très",
    "autre", "quand", "sans", "sous", "depuis", "avant", "encore", "peu", "car", "alors",
    "donc", "dont", "chaque", "fois", "cet", "ici", "là", "quel", "toute", "pendant", "chez",
    "vers", "selon", "cela", "ces", "aux", "été", "ont", "sont", "elle", "elles", "ils",
    "lui", "leur", "leurs", "mon", "ma", "mes", "ton", "ta", "tes", "notre", "nos", "votre",
    "vos", "peut", "tous", "toutes", "autres", "été", "étaient", "était", "serait", "sera",
    "ai", "as", "avons", "avez", "ayant", "eu", "eue", "eues", "eus", "fût", "furent",
    "suis", "es", "sommes", "êtes", "soient", "sois", "soit", "serons", "serez", "seraient",
    "ni", "non", "oui", "car", "or", "donc", "ainsi", "puis", "ensuite", "enfin", "lors",
    "dès", "tant", "tel", "telle", "tels", "telles", "quelque", "quelques", "aucun", "aucune",
    "chacun", "chacune", "certains", "certaines", "plusieurs", "beaucoup", "peu", "trop",
    "assez", "moins", "plus", "autant", "combien", "comment", "pourquoi", "quoi", "lequel",
    "laquelle", "lesquels", "lesquelles", "duquel", "desquels", "auquel", "auxquels",
    "celui", "celle", "ceux", "celles", "ci", "là", "voici", "voilà", "c", "d", "j", "l",
    "m", "n", "s", "t", "y", "qu", "www", "http", "https", "com", "fr", "org", "html"
]);

interface KeywordData {
    word: string;
    count: number;
    density: number;
}

interface NGramData {
    ngram: string;
    count: number;
    density: number;
}

export default function ExtracteurMotsClesPage() {
    const [inputText, setInputText] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [copied, setCopied] = useState(false);
    const [minWordLength, setMinWordLength] = useState(3);
    const [minOccurrences, setMinOccurrences] = useState(2);

    // Analyse des mots-clés
    const analysis = useMemo(() => {
        if (!inputText.trim()) return null;

        // Fonction pour nettoyer et tokeniser le texte (dans useMemo pour éviter les dépendances)
        const tokenize = (text: string): string[] => {
            return text
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") // Remove accents for comparison
                .replace(/[^a-zàâäéèêëïîôùûüÿœæç\s-]/gi, " ")
                .split(/\s+/)
                .filter(word => word.length >= minWordLength && !FRENCH_STOP_WORDS.has(word));
        };

        const words = tokenize(inputText);
        const totalWords = words.length;

        if (totalWords === 0) return null;

        // Compter les occurrences de chaque mot
        const wordCount: Record<string, number> = {};
        words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });

        // Convertir en tableau et calculer la densité
        const keywords: KeywordData[] = Object.entries(wordCount)
            .filter(([_, count]) => count >= minOccurrences)
            .map(([word, count]) => ({
                word,
                count,
                density: (count / totalWords) * 100
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 50);

        // Générer les bi-grammes
        const bigrams: Record<string, number> = {};
        for (let i = 0; i < words.length - 1; i++) {
            const bigram = `${words[i]} ${words[i + 1]}`;
            bigrams[bigram] = (bigrams[bigram] || 0) + 1;
        }

        const bigramList: NGramData[] = Object.entries(bigrams)
            .filter(([_, count]) => count >= 2)
            .map(([ngram, count]) => ({
                ngram,
                count,
                density: (count / (totalWords - 1)) * 100
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 20);

        // Générer les tri-grammes
        const trigrams: Record<string, number> = {};
        for (let i = 0; i < words.length - 2; i++) {
            const trigram = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
            trigrams[trigram] = (trigrams[trigram] || 0) + 1;
        }

        const trigramList: NGramData[] = Object.entries(trigrams)
            .filter(([_, count]) => count >= 2)
            .map(([ngram, count]) => ({
                ngram,
                count,
                density: (count / (totalWords - 2)) * 100
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 15);

        return {
            totalWords,
            uniqueWords: Object.keys(wordCount).length,
            keywords,
            bigrams: bigramList,
            trigrams: trigramList
        };
    }, [inputText, minWordLength, minOccurrences]);

    // Copier les résultats
    const copyResults = () => {
        if (!analysis) return;

        let text = "=== EXTRACTION DE MOTS-CLÉS ===\n\n";
        text += `Mots analysés: ${analysis.totalWords}\n`;
        text += `Mots uniques: ${analysis.uniqueWords}\n\n`;

        text += "--- MOTS-CLÉS PRINCIPAUX ---\n";
        analysis.keywords.forEach((kw, i) => {
            text += `${i + 1}. ${kw.word} (${kw.count}x - ${kw.density.toFixed(2)}%)\n`;
        });

        text += "\n--- BI-GRAMMES ---\n";
        analysis.bigrams.forEach((bg, i) => {
            text += `${i + 1}. ${bg.ngram} (${bg.count}x)\n`;
        });

        text += "\n--- TRI-GRAMMES ---\n";
        analysis.trigrams.forEach((tg, i) => {
            text += `${i + 1}. ${tg.ngram} (${tg.count}x)\n`;
        });

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setTimeout(() => setIsAnalyzing(false), 500);
    };

    // Schema JSON-LD
    const schemaJsonLd = {
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
    };

    return (
        <main className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
            />

            <Breadcrumb items={[
                { label: "Outils SEO", href: "/outils" },
                { label: "Extracteur de mots-clés", href: "/outils/extracteur-mots-cles" }
            ]} />

            {/* Hero */}
            <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-sauge/10 text-sauge px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            Outil SEO gratuit
                        </div>
                        <h1 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Extracteur de <span className="text-sauge">mots-clés</span> gratuit
                        </h1>
                        <p className="text-soft text-lg">
                            Analysez un texte pour en extraire les mots-clés principaux, leur densité,
                            et les expressions les plus fréquentes (bi-grammes, tri-grammes).
                        </p>
                    </div>
                </div>
            </section>

            {/* Outil */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Input */}
                            <div>
                                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                                    <label className="block text-sm font-bold text-ink mb-2">
                                        Collez votre texte à analyser
                                    </label>
                                    <textarea
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        placeholder="Collez ici le contenu de votre page, article, ou texte à analyser...

L'outil va extraire automatiquement les mots-clés les plus fréquents, calculer leur densité, et identifier les expressions récurrentes."
                                        className="w-full h-64 p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-sauge focus:border-sauge resize-none"
                                    />

                                    {/* Options */}
                                    <div className="flex flex-wrap gap-4 mt-4">
                                        <div>
                                            <label className="text-xs text-soft block mb-1">Longueur min.</label>
                                            <select
                                                value={minWordLength}
                                                onChange={(e) => setMinWordLength(Number(e.target.value))}
                                                className="text-sm border border-gray-200 rounded-lg px-3 py-2"
                                            >
                                                <option value={2}>2 lettres</option>
                                                <option value={3}>3 lettres</option>
                                                <option value={4}>4 lettres</option>
                                                <option value={5}>5 lettres</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs text-soft block mb-1">Occurrences min.</label>
                                            <select
                                                value={minOccurrences}
                                                onChange={(e) => setMinOccurrences(Number(e.target.value))}
                                                className="text-sm border border-gray-200 rounded-lg px-3 py-2"
                                            >
                                                <option value={1}>1 fois</option>
                                                <option value={2}>2 fois</option>
                                                <option value={3}>3 fois</option>
                                                <option value={5}>5 fois</option>
                                            </select>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleAnalyze}
                                        disabled={!inputText.trim() || isAnalyzing}
                                        className="w-full mt-4 bg-sauge text-white hover:bg-ink rounded-xl py-6 font-bold"
                                    >
                                        {isAnalyzing ? "Analyse en cours..." : "Extraire les mots-clés"}
                                        <Search className="ml-2 w-4 h-4" />
                                    </Button>

                                    {/* Stats rapides */}
                                    {analysis && (
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="bg-gray-50 p-3 rounded-xl text-center">
                                                <p className="text-2xl font-bold text-sauge">{analysis.totalWords}</p>
                                                <p className="text-xs text-soft">Mots analysés</p>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-xl text-center">
                                                <p className="text-2xl font-bold text-sauge">{analysis.uniqueWords}</p>
                                                <p className="text-xs text-soft">Mots uniques</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Results */}
                            <div>
                                {analysis ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                                    >
                                        {/* Tabs header */}
                                        <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-b border-gray-100">
                                            <h2 className="font-bold text-ink flex items-center gap-2">
                                                <BarChart3 className="w-4 h-4 text-sauge" />
                                                Résultats de l'analyse
                                            </h2>
                                            <button
                                                onClick={copyResults}
                                                className="flex items-center gap-1 text-sm text-sauge hover:text-ink transition-colors"
                                            >
                                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                {copied ? "Copié !" : "Copier"}
                                            </button>
                                        </div>

                                        <div className="p-4 max-h-[500px] overflow-y-auto">
                                            {/* Mots-clés */}
                                            <div className="mb-6">
                                                <h3 className="text-sm font-bold text-ink mb-3 flex items-center gap-2">
                                                    <Hash className="w-4 h-4 text-sauge" />
                                                    Mots-clés principaux ({analysis.keywords.length})
                                                </h3>
                                                <div className="space-y-2">
                                                    {analysis.keywords.slice(0, 15).map((kw, i) => (
                                                        <div key={i} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                                                            <span className="text-sm font-medium text-ink">{kw.word}</span>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-xs text-soft">{kw.count}x</span>
                                                                <span className="text-xs font-bold text-sauge">{kw.density.toFixed(2)}%</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Bi-grammes */}
                                            {analysis.bigrams.length > 0 && (
                                                <div className="mb-6">
                                                    <h3 className="text-sm font-bold text-ink mb-3 flex items-center gap-2">
                                                        <FileText className="w-4 h-4 text-sauge" />
                                                        Expressions 2 mots ({analysis.bigrams.length})
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {analysis.bigrams.map((bg, i) => (
                                                            <span key={i} className="inline-flex items-center gap-1 bg-sauge/10 text-sauge px-3 py-1.5 rounded-full text-xs font-medium">
                                                                {bg.ngram}
                                                                <span className="text-sauge/60">({bg.count}x)</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Tri-grammes */}
                                            {analysis.trigrams.length > 0 && (
                                                <div>
                                                    <h3 className="text-sm font-bold text-ink mb-3 flex items-center gap-2">
                                                        <FileText className="w-4 h-4 text-sauge" />
                                                        Expressions 3 mots ({analysis.trigrams.length})
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {analysis.trigrams.map((tg, i) => (
                                                            <span key={i} className="inline-flex items-center gap-1 bg-ink/5 text-ink px-3 py-1.5 rounded-full text-xs font-medium">
                                                                {tg.ngram}
                                                                <span className="text-ink/60">({tg.count}x)</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center">
                                        <Search className="w-12 h-12 text-gray-300 mb-4" />
                                        <h3 className="font-bold text-ink mb-2">Collez votre texte</h3>
                                        <p className="text-sm text-soft">
                                            L'analyse s'affichera ici une fois le texte soumis.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contenu éditorial SEO */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto prose prose-lg">
                        <h2 className="text-2xl font-heading font-bold text-ink">
                            Comment analyser les mots-clés d'un texte ou d'un site web ?
                        </h2>

                        <p>
                            L'<strong>extraction de mots-clés</strong> est une étape fondamentale de toute stratégie SEO.
                            Elle permet d'identifier les termes les plus importants d'un contenu et de vérifier
                            qu'ils correspondent à vos objectifs de référencement.
                        </p>

                        <h3>Pourquoi utiliser un extracteur de mots-clés ?</h3>
                        <ul>
                            <li><strong>Analyser la concurrence</strong> : identifiez les mots-clés utilisés par vos concurrents</li>
                            <li><strong>Optimiser vos contenus</strong> : vérifiez la densité de vos mots-clés cibles</li>
                            <li><strong>Trouver des opportunités</strong> : découvrez des expressions récurrentes à cibler</li>
                            <li><strong>Éviter le bourrage de mots-clés</strong> : une densité supérieure à 3% peut être pénalisante</li>
                        </ul>

                        <h3>Comment interpréter les résultats ?</h3>
                        <p>
                            La <strong>densité de mots-clés</strong> idéale se situe entre 1% et 3%. Au-delà, Google peut
                            considérer qu'il s'agit de "keyword stuffing" (bourrage de mots-clés), ce qui est pénalisé.
                        </p>
                        <p>
                            Les <strong>bi-grammes et tri-grammes</strong> (expressions de 2-3 mots) sont souvent plus
                            pertinents pour le SEO que les mots isolés. Ils correspondent aux requêtes longue traîne
                            que les utilisateurs saisissent réellement dans Google.
                        </p>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 not-prose mt-6">
                            <h4 className="font-bold text-ink mb-3">Pour aller plus loin</h4>
                            <div className="space-y-2">
                                <Link href="/audit-seo" className="flex items-center gap-2 text-sauge hover:underline">
                                    <ArrowRight className="w-4 h-4" />
                                    Demander un audit SEO complet de votre site
                                </Link>
                                <Link href="/outils/audit-seo-gratuit" className="flex items-center gap-2 text-sauge hover:underline">
                                    <ArrowRight className="w-4 h-4" />
                                    Tester notre outil d'audit SEO gratuit
                                </Link>
                                <Link href="/blog/contenu-rapport-audit-seo" className="flex items-center gap-2 text-sauge hover:underline">
                                    <ArrowRight className="w-4 h-4" />
                                    Comprendre le contenu d'un rapport d'audit SEO
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 bg-ink text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-heading font-bold mb-4">
                        Besoin d'une analyse SEO plus approfondie ?
                    </h2>
                    <p className="text-white/70 mb-6 max-w-xl mx-auto">
                        L'extraction de mots-clés est une première étape. Un audit SEO complet analyse
                        également la technique, le maillage interne, les backlinks et la concurrence.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/audit-seo">
                            <Button className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-8 py-6 font-bold">
                                Demander un audit gratuit
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/outils">
                            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 font-bold">
                                Voir tous les outils SEO
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
