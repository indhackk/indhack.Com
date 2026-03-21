import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FlaskConical, ArrowRight, Sparkles, BookOpen, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
    title: "Laboratoire GEO : expérimentations en optimisation générative",
    description: "Laboratoire d'expérimentations en Generative Engine Optimization (GEO). Études de cas, tests et analyses pour la visibilité IA.",
    alternates: {
        canonical: "https://indhack.com/laboratoire-geo"
    },
    openGraph: {
        title: "Laboratoire GEO | IndHack",
        description: "Expérimentations en optimisation générative : études de cas et analyses pour dominer les moteurs de réponse IA.",
        url: "https://indhack.com/laboratoire-geo",
    }
};

export default function LaboratoireGeoPage() {
    return (
        <>
            <Breadcrumb items={[
                { label: "Laboratoire GEO", href: "/laboratoire-geo" }
            ]} />

            <main className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
                {/* Hero */}
                <section className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-600 px-5 py-2.5 rounded-full text-sm font-semibold mb-8 border border-violet-500/30">
                        <FlaskConical className="w-4 h-4" />
                        Expérimentations GEO
                    </div>
                    <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ink font-bold mb-8 leading-tight">
                        Laboratoire GEO
                    </h1>
                    <p className="text-soft text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
                        Ce laboratoire regroupe mes études de cas et expérimentations en{" "}
                        <strong className="text-ink">Generative Engine Optimization</strong> (GEO). L'objectif : comprendre
                        comment les moteurs de réponse IA (ChatGPT, Perplexity, Mistral) sélectionnent
                        et citent les sources.
                    </p>
                </section>

                {/* Stats Bar */}
                <section className="grid grid-cols-3 gap-4 mb-16">
                    <div className="bg-gradient-to-br from-sauge/10 to-sauge/5 rounded-2xl p-6 text-center border border-sauge/20">
                        <div className="text-3xl font-bold text-sauge mb-1">5</div>
                        <div className="text-sm text-soft">IA testées</div>
                    </div>
                    <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/5 rounded-2xl p-6 text-center border border-violet-500/20">
                        <div className="text-3xl font-bold text-violet-600 mb-1">10</div>
                        <div className="text-sm text-soft">Requêtes cibles</div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-2xl p-6 text-center border border-amber-500/20">
                        <div className="text-3xl font-bold text-amber-600 mb-1">1</div>
                        <div className="text-sm text-soft">Étude en cours</div>
                    </div>
                </section>

                {/* Studies Grid */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-sauge to-emerald-600 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="font-heading text-2xl text-ink font-bold">
                            Études en cours
                        </h2>
                    </div>

                    <Link
                        href="/laboratoire-geo/vultifrine"
                        className="block group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-fond-clair border border-line hover:border-sauge/40 hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Decorative gradient */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sauge/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative p-8 sm:p-10">
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-5">
                                        <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                            <Sparkles className="w-3 h-3" />
                                            Concours GEO 2026
                                        </span>
                                        <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                                            En cours
                                        </span>
                                    </div>
                                    <h3 className="font-heading text-2xl sm:text-3xl text-ink font-bold mb-4 group-hover:text-sauge transition-colors">
                                        Vultifrine : guide complet de l'actif cosmétique végétal
                                    </h3>
                                    <p className="text-soft leading-relaxed text-lg mb-6">
                                        Étude de cas complète autour d'un ingrédient cosmétique fictif. 10 requêtes ciblées,
                                        optimisation des extraits pour Perplexity, tableaux de données pour Mistral,
                                        schémas JSON-LD enrichis.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-sauge/10 text-sauge text-sm font-medium rounded-lg">ChatGPT</span>
                                        <span className="px-3 py-1 bg-sauge/10 text-sauge text-sm font-medium rounded-lg">Perplexity</span>
                                        <span className="px-3 py-1 bg-sauge/10 text-sauge text-sm font-medium rounded-lg">Claude</span>
                                        <span className="px-3 py-1 bg-sauge/10 text-sauge text-sm font-medium rounded-lg">Gemini</span>
                                        <span className="px-3 py-1 bg-sauge/10 text-sauge text-sm font-medium rounded-lg">Mistral</span>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-sauge/10 group-hover:bg-sauge group-hover:scale-110 transition-all duration-300">
                                    <ArrowRight className="w-6 h-6 text-sauge group-hover:text-white transition-colors" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>

                {/* Context */}
                <section className="mb-20">
                    <div className="bg-gradient-to-br from-fond-clair to-white rounded-3xl p-8 sm:p-10 border border-line">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="font-heading text-2xl text-ink font-bold">
                                Pourquoi un laboratoire GEO ?
                            </h2>
                        </div>
                        <div className="space-y-4 text-soft leading-relaxed text-lg">
                            <p>
                                Les moteurs de réponse IA représentent une révolution dans la recherche d'information.
                                Contrairement au SEO classique, le GEO exige de structurer le contenu pour qu'il soit
                                <strong className="text-ink"> extrait, cité et reformulé</strong> par des modèles de langage.
                            </p>
                            <p>
                                Chaque étude publiée ici documente mes hypothèses, la méthodologie appliquée et les
                                résultats obtenus. Pour en savoir plus sur mon approche, consultez mon{" "}
                                <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline font-semibold">
                                    testeur de visibilité IA
                                </Link>{" "}
                                ou ma page sur le{" "}
                                <Link href="/referencement-naturel" className="text-sauge hover:underline font-semibold">
                                    référencement naturel
                                </Link>.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center">
                    <div className="bg-gradient-to-r from-sauge to-emerald-600 rounded-3xl p-10 sm:p-14">
                        <h2 className="font-heading text-2xl sm:text-3xl text-white font-bold mb-4">
                            Testez votre visibilité IA
                        </h2>
                        <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                            Votre site est-il cité par ChatGPT, Perplexity ou Claude ? Vérifiez gratuitement en quelques secondes.
                        </p>
                        <Link
                            href="/outils/testeur-visibilite-ia"
                            className="inline-flex items-center gap-2 bg-white text-sauge font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors shadow-lg"
                        >
                            <Sparkles className="w-5 h-5" />
                            Tester ma visibilité IA
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
