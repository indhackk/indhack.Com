import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FlaskConical, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Laboratoire GEO : experimentations en optimisation generative",
    description: "Laboratoire d'experimentations en Generative Engine Optimization (GEO). Etudes de cas, tests et analyses pour optimiser la visibilite dans les moteurs de reponse IA.",
    alternates: {
        canonical: "https://indhack.com/laboratoire-geo"
    },
    openGraph: {
        title: "Laboratoire GEO | IndHack",
        description: "Experimentations en optimisation generative : etudes de cas et analyses pour dominer les moteurs de reponse IA.",
        url: "https://indhack.com/laboratoire-geo",
    }
};

export default function LaboratoireGeoPage() {
    return (
        <>
            <Breadcrumb items={[
                { label: "Laboratoire GEO", href: "/laboratoire-geo" }
            ]} />

            <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
                {/* Hero */}
                <section className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-sauge/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <FlaskConical className="w-4 h-4" />
                        Experimentations GEO
                    </div>
                    <h1 className="font-heading text-4xl sm:text-5xl text-ink font-bold mb-6">
                        Laboratoire GEO : experimentations en optimisation generative
                    </h1>
                    <p className="text-soft text-lg leading-relaxed max-w-2xl mx-auto">
                        Ce laboratoire regroupe nos etudes de cas et experimentations en{" "}
                        <strong>Generative Engine Optimization</strong> (GEO). L'objectif : comprendre
                        comment les moteurs de reponse IA (ChatGPT, Perplexity, Mistral) selectionnent
                        et citent les sources, puis appliquer ces enseignements a des strategies concretes.
                    </p>
                </section>

                {/* Studies Grid */}
                <section>
                    <h2 className="font-heading text-2xl text-ink font-semibold mb-8">
                        Etudes en cours
                    </h2>

                    <Link
                        href="/laboratoire-geo/vultifrine"
                        className="block group border border-line rounded-2xl p-8 hover:border-sauge/40 hover:shadow-lg transition-all duration-300 bg-white"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <span className="inline-block bg-sauge/10 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                                    Concours GEO 2026
                                </span>
                                <h3 className="font-heading text-xl text-ink font-semibold mb-3 group-hover:text-sauge transition-colors">
                                    Vultifrine : guide complet de l'actif cosmetique vegetal
                                </h3>
                                <p className="text-soft leading-relaxed">
                                    Etude de cas complete autour d'un ingredient cosmetique fictif. 10 requetes ciblees,
                                    optimisation des extraits pour Perplexity, tableaux de donnees pour Mistral,
                                    schemas JSON-LD enrichis. Une experimentation grandeur nature en GEO.
                                </p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-sauge opacity-0 group-hover:opacity-100 transition-opacity mt-2 flex-shrink-0" />
                        </div>
                    </Link>
                </section>

                {/* Context */}
                <section className="mt-16 bg-fond-clair rounded-2xl p-8">
                    <h2 className="font-heading text-xl text-ink font-semibold mb-4">
                        Pourquoi un laboratoire GEO ?
                    </h2>
                    <p className="text-soft leading-relaxed mb-4">
                        Les moteurs de reponse IA representent une revolution dans la recherche d'information.
                        Contrairement au SEO classique, le GEO exige de structurer le contenu pour qu'il soit
                        <strong> extrait, cite et reformule</strong> par des modeles de langage.
                    </p>
                    <p className="text-soft leading-relaxed">
                        Chaque etude publiee ici documente nos hypotheses, la methodologie appliquee et les
                        resultats obtenus. Pour en savoir plus sur notre approche, consultez notre{" "}
                        <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline font-medium">
                            testeur de visibilite IA
                        </Link>{" "}
                        ou notre page sur le{" "}
                        <Link href="/referencement-naturel" className="text-sauge hover:underline font-medium">
                            referencement naturel
                        </Link>.
                    </p>
                </section>
            </main>
        </>
    );
}
