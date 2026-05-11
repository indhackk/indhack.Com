"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AuditCTA } from "@/components/blog/AuditCTA";
import { HomepageBacklink } from "@/components/seo/HomepageBacklink";
import {
    Search,
    FileText,
    Wrench,
    Link2,
    Award,
    BarChart3,
    Building2,
    Briefcase,
    Globe,
    BookOpen,
    MapPin,
    Code2,
    Database,
    Target,
    Sparkles,
    Lightbulb,
    ArrowRight,
    CheckCircle2
} from "lucide-react";

type Prestation = {
    icon: typeof Search;
    title: string;
    description: string;
    href?: string;
};

const BLOCAGES: { title: string; description: string }[] = [
    {
        title: "Site techniquement lent ou mal structuré",
        description: "Temps de chargement supérieur à 3 secondes sur mobile, Core Web Vitals dans le rouge, structure Hn confuse, balises essentielles manquantes. Google a déjà décidé que votre site était moins fiable que celui d'à côté."
    },
    {
        title: "Pages importantes trop faibles",
        description: "Vos pages services ou catégories sont génériques, courtes, sans preuve, sans intention claire. Elles existent dans le sitemap mais elles ne se positionnent jamais."
    },
    {
        title: "Contenu qui ne répond pas à l'intention",
        description: "Vous écrivez ce que vous voulez dire, pas ce que les gens cherchent. Mots-clés mal choisis, sujet traité de travers, requêtes voisines oubliées."
    },
    {
        title: "Maillage interne absent ou mal pensé",
        description: "Articles isolés, pages services jamais liées entre elles, ancres « cliquez ici ». Google ne sait pas ce qui est important sur votre site."
    },
    {
        title: "Autorité insuffisante face aux concurrents",
        description: "Vos concurrents ont des backlinks de médias sectoriels, de blogs spécialisés, d'institutions. Vous avez douze liens d'annuaires généralistes. Ça ne suffit pas."
    },
    {
        title: "Conversion oubliée malgré du trafic",
        description: "Vous avez du trafic, mais aucun visiteur ne demande de devis. Les pages ne sont pas pensées pour convertir : CTA invisibles, formulaires trop longs, preuves absentes."
    }
];

const METHODE: { num: string; title: string; description: string }[] = [
    {
        num: "01",
        title: "Audit technique et sémantique",
        description: "Crawl complet, lecture des templates, analyse Core Web Vitals, repérage des intentions de recherche non couvertes par votre site."
    },
    {
        num: "02",
        title: "Analyse Search Console et concurrence",
        description: "Lecture des requêtes qui apportent déjà des clics, repérage des pages à fort potentiel inexploitées, benchmark serré sur trois à cinq concurrents directs."
    },
    {
        num: "03",
        title: "Priorisation des pages à renforcer",
        description: "On ne touche pas tout. On priorise les pages où l'effort SEO peut transformer la visibilité en demandes qualifiées, pas en trafic décoratif."
    },
    {
        num: "04",
        title: "Optimisation contenu, structure Hn, maillage interne",
        description: "Réécriture ciblée, ajout d'intentions voisines, structure Hn nette, maillage interne qui consolide les pages business prioritaires."
    },
    {
        num: "05",
        title: "Suivi, itérations et mesure des demandes générées",
        description: "On regarde ce que Search Console renvoie, on ajuste, on mesure ce qui finit en formulaire de contact. Pas seulement des positions."
    }
];

const PRESTATIONS: Prestation[] = [
    {
        icon: Search,
        title: "Audit SEO",
        description: "Diagnostic technique, sémantique et concurrentiel complet. Livré avec une roadmap priorisée par impact business, pas par checklist générique.",
        href: "/audit-seo"
    },
    {
        icon: FileText,
        title: "Stratégie de contenu",
        description: "Recherche d'intentions de recherche, planning éditorial, briefs SEO actionnables. Objectif : capter des recherches qui se transforment en contacts.",
        href: "/referencement-naturel"
    },
    {
        icon: Wrench,
        title: "Optimisation technique",
        description: "Core Web Vitals, balises, structure Hn, indexation, sitemap, robots.txt. Tout ce que Google attend avant même de parler de contenu.",
        href: "/audit-seo"
    },
    {
        icon: Link2,
        title: "Maillage interne",
        description: "Cartographie complète des liens internes, identification des pages orphelines, plan de maillage qui consolide les pages business prioritaires."
    },
    {
        icon: Award,
        title: "Autorité et backlinks",
        description: "Stratégie de liens entrants qualitatifs, contenu earned, partenariats éditoriaux. Pas d'achat massif d'annuaires sans valeur.",
        href: "/referencement-naturel"
    },
    {
        icon: BarChart3,
        title: "Suivi Search Console",
        description: "Reporting mensuel basé sur les requêtes qui montent, les pages qui décrochent, les demandes générées. On itère sur la base de la donnée.",
        href: "/contact"
    }
];

const APPROCHE: { icon: typeof Code2; title: string; description: string }[] = [
    {
        icon: Code2,
        title: "Lecture directe du code et des templates",
        description: "Je n'envoie pas une liste de recommandations abstraites à votre développeur. J'ouvre votre code, vos templates, vos contenus, et je regarde ce qui bloque vraiment."
    },
    {
        icon: Database,
        title: "Lecture des données Search Console",
        description: "Les requêtes qui amènent déjà des impressions sans clics. Les pages qui montent puis décrochent. Les intentions à un mot près qui font basculer la position 18 en position 5."
    },
    {
        icon: Target,
        title: "Priorisation orientée demandes qualifiées",
        description: "Une page service qui passe de 100 à 800 visites par mois mais qui ne génère aucun contact, ça ne sert à rien. La priorisation se fait sur le trafic qui se transforme."
    },
    {
        icon: Sparkles,
        title: "Double lecture SEO et visibilité IA",
        description: "Le SEO classique reste la base. Mais les contenus qui performent aujourd'hui doivent aussi être lisibles par les moteurs IA. Je travaille les deux."
    }
];

const TYPOLOGIES: { icon: typeof Building2; title: string }[] = [
    { icon: Building2, title: "Site vitrine qui ne génère pas assez de contacts" },
    { icon: Briefcase, title: "PME qui dépend de Google pour obtenir des prospects" },
    { icon: Globe, title: "Site de service avec des pages commerciales faibles" },
    { icon: BookOpen, title: "Blog ou média qui manque de structure SEO" },
    { icon: MapPin, title: "Entreprise locale qui veut renforcer sa visibilité Google" }
];

const FAQ = [
    {
        question: "Que fait une consultante SEO ?",
        answer: "Une consultante SEO aide un site à être trouvé sur Google sur les bonnes requêtes, par les bonnes personnes, au bon moment. Concrètement, je regarde ce qui bloque la visibilité, je priorise ce qui peut bouger, et j'optimise les pages qui ont le plus de chance de générer des demandes qualifiées. Ça passe par l'audit technique, la stratégie de contenu, le maillage interne, l'autorité et le suivi Search Console."
    },
    {
        question: "Quelle différence entre consultante SEO et agence SEO ?",
        answer: "En consultante indépendante, je suis l'interlocutrice unique du début à la fin. Pas de chef de projet qui transmet à un consultant junior, pas de process standardisé appliqué à toutes les PME pareil. L'agence apporte une équipe pluridisciplinaire et des moyens plus larges, c'est utile sur de gros e-commerce. Pour la majorité des PME et sites de services, le format consultante reste plus direct et plus adapté. Voir le guide détaillé sur le consultant SEO freelance pour comparer."
    },
    {
        question: "Combien de temps faut-il pour voir des résultats SEO ?",
        answer: "Les premiers signaux positifs en Search Console (impressions qui montent, nouvelles requêtes captées) apparaissent en général entre 2 et 4 mois. Les résultats sur les positions et le trafic réel arrivent plus souvent entre 4 et 8 mois selon la concurrence et l'état initial du site. Au-delà de 12 mois, l'effort SEO devient un avantage durable que la concurrence ne peut pas effacer en un trimestre."
    },
    {
        question: "Est-ce qu'un audit SEO suffit ?",
        answer: "Un audit SEO seul donne une cartographie précise des blocages et une roadmap priorisée. C'est utile si vous avez une équipe interne capable d'exécuter. Si vous n'avez pas cette équipe, l'audit reste un livrable utile mais il ne se transforme pas en résultats sans accompagnement. La plupart des sites ont besoin de l'audit puis d'un suivi mensuel pour itérer sur la base des données Search Console."
    },
    {
        question: "Travaillez-vous seulement à Nice ?",
        answer: "Je suis basée à Nice, et j'accompagne des clients partout en France. Les échanges se font en visio, les livrables sont écrits et partagés en ligne, le suivi mensuel se fait à distance. Pour les clients sur la Côte d'Azur, des rendez-vous physiques sont possibles. La proximité géographique n'est pas un critère pour un accompagnement SEO de qualité."
    },
    {
        question: "Comment savoir si mon site a un problème SEO ?",
        answer: "Quelques signaux clairs : votre trafic organique stagne ou baisse, vous recevez peu ou pas de demandes via Google, vos concurrents apparaissent systématiquement au-dessus de vous sur vos requêtes métier, Search Console montre des pages avec beaucoup d'impressions et zéro clic, vos Core Web Vitals sont dans le rouge. Si vous reconnaissez deux ou trois de ces signaux, un audit est probablement justifié."
    },
    {
        question: "Est-ce que la visibilité IA remplace le SEO ?",
        answer: "Non. Les moteurs IA comme ChatGPT, Perplexity ou Gemini s'appuient eux-mêmes sur le SEO classique : ils citent des sources qui sont bien référencées dans Google ou Bing. La visibilité IA est une couche supplémentaire, pas un remplacement. Un site qui n'est pas indexé ne sera ni cité par Google ni cité par les IA. Le SEO reste la fondation."
    },
    {
        question: "Quels livrables sont fournis pendant l'accompagnement ?",
        answer: "Un audit initial complet (technique, sémantique, concurrentiel) avec une roadmap priorisée. Un plan éditorial avec briefs SEO actionnables. Un plan de maillage interne. Un reporting mensuel basé sur Search Console et les données de conversion. Des recommandations techniques précises avec exemples de code quand c'est pertinent. Tout est écrit, traçable, et reste votre propriété."
    }
];

const VILLES_PHARES: { name: string; slug: string }[] = [
    { name: "Nice", slug: "consultant-seo-nice" },
    { name: "Paris", slug: "consultant-seo-paris" },
    { name: "Lyon", slug: "consultant-seo-lyon" }
];

export default function ConsultantSEOClient() {
    return (
        <main className="bg-white">

            {/* ============ HERO ============ */}
            <section className="bg-ink text-white pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-sauge-light font-medium mb-4 text-sm uppercase tracking-wider">
                                Consultante SEO
                            </p>
                            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-bold mb-6 leading-tight">
                                Consultante SEO pour générer plus de demandes qualifiées depuis Google
                            </h1>
                            <p className="text-xl text-white/85 mb-8 leading-relaxed">
                                J&apos;aide les PME, indépendants et sites de services à corriger ce qui bloque leur visibilité : technique, contenu, maillage interne, autorité et suivi Search Console.
                            </p>

                            <div className="flex flex-wrap gap-3 mb-8 text-sm">
                                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge-light" />
                                    Audit SEO et roadmap priorisée
                                </span>
                                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge-light" />
                                    Basée à Nice, accompagnement partout en France
                                </span>
                                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge-light" />
                                    SEO technique, contenu et maillage interne
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <AuditCTA className="bg-sauge hover:bg-sauge-light hover:text-ink text-white px-8 py-6 rounded-xl text-base font-semibold transition-all">
                                    Demander un audit SEO
                                </AuditCTA>
                                <Link href="#methode">
                                    <Button variant="outline" className="border-2 border-white/40 text-white hover:bg-white hover:text-ink px-8 py-6 rounded-xl text-base font-semibold">
                                        Voir ma méthode
                                    </Button>
                                </Link>
                                <Link
                                    href="/etudes-de-cas"
                                    className="text-white/70 hover:text-white text-sm underline underline-offset-4"
                                >
                                    Consulter les études de cas
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative w-full aspect-square max-w-md mx-auto">
                                <div className="absolute inset-0 bg-sauge/20 rounded-3xl transform rotate-6"></div>
                                <div className="absolute inset-0 bg-white/10 rounded-3xl transform -rotate-3"></div>
                                <Image
                                    src="/images/indiana-aflalo-consultante-seo.webp"
                                    alt="Indiana Aflalo, consultante SEO, basée à Nice"
                                    fill
                                    sizes="(max-width: 1024px) 0vw, 28rem"
                                    className="object-cover rounded-3xl relative z-10"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ H2 #1 — Définition orientée résultat ============ */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-6">
                            Une consultante SEO, pour quoi faire concrètement ?
                        </h2>
                        <div className="prose prose-lg max-w-none text-soft">
                            <p className="text-xl leading-relaxed mb-6">
                                Une consultante SEO sert à obtenir plus de visibilité utile, plus de trafic qualifié et plus de demandes entrantes. Pas plus de trafic décoratif, plus de trafic qui se transforme.
                            </p>
                            <p className="leading-relaxed mb-6">
                                Un <strong>consultant SEO</strong> n&apos;est pas un magicien des positions Google. C&apos;est quelqu&apos;un qui regarde ce qui empêche votre site de se positionner, qui priorise ce qui peut bouger, et qui mesure ce qui finit par générer des contacts. Pour aller plus loin sur le métier, vous pouvez consulter <Link href="/blog/definition-seo-guide-complet" className="text-sauge hover:underline">la définition complète du SEO</Link> ou la page dédiée au <Link href="/referencement-naturel" className="text-sauge hover:underline">référencement naturel</Link>.
                            </p>
                            <p className="leading-relaxed">
                                Avant un accompagnement complet, vous pouvez aussi tester gratuitement votre site avec mon <Link href="/outils/audit-seo-gratuit" className="text-sauge hover:underline">outil d&apos;audit SEO gratuit</Link>. Il vous donnera un premier diagnostic technique et sémantique en quelques minutes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ H2 #2 — Ce qui bloque ============ */}
            <section className="py-20 bg-fond-clair">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Ce qui bloque souvent la visibilité d&apos;un site
                        </h2>
                        <p className="text-lg text-soft">
                            Avant de parler stratégie, voici les six blocages que je rencontre le plus souvent quand j&apos;ouvre un site pour la première fois.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {BLOCAGES.map((blocage, i) => (
                            <div
                                key={blocage.title}
                                className="bg-white p-6 rounded-2xl border border-line"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-sauge/10 text-sauge font-heading font-bold flex items-center justify-center text-sm">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-heading font-bold text-ink mb-2">
                                            {blocage.title}
                                        </h3>
                                        <p className="text-soft leading-relaxed text-[0.95rem]">
                                            {blocage.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ H2 #3 — Méthode ============ */}
            <section id="methode" className="py-20 bg-white scroll-mt-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Ma méthode d&apos;accompagnement SEO
                        </h2>
                        <p className="text-lg text-soft">
                            Cinq étapes, exécutées dans l&apos;ordre, pour transformer un site qui stagne en visibilité Google qui génère des demandes.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <ol className="relative border-l-2 border-sauge/30 ml-4">
                            {METHODE.map((etape) => (
                                <li key={etape.num} className="mb-10 ml-8 last:mb-0">
                                    <span className="absolute -left-[1.05rem] flex items-center justify-center w-9 h-9 bg-sauge text-white font-heading font-bold text-sm rounded-full">
                                        {etape.num}
                                    </span>
                                    <h3 className="text-xl font-heading font-bold text-ink mb-2">
                                        {etape.title}
                                    </h3>
                                    <p className="text-soft leading-relaxed">
                                        {etape.description}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* ============ H2 #4 — Prestations ============ */}
            <section className="py-20 bg-fond-clair">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Mes prestations de consultante SEO
                        </h2>
                        <p className="text-lg text-soft">
                            Audit, contenu, technique, maillage, autorité, suivi. Six prestations qui peuvent se combiner selon l&apos;état initial de votre site.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {PRESTATIONS.map((p) => {
                            const Inner = (
                                <>
                                    <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-sauge transition-colors">
                                        <p.icon className="w-6 h-6 text-sauge group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-ink mb-3">
                                        {p.title}
                                    </h3>
                                    <p className="text-soft leading-relaxed text-[0.95rem]">
                                        {p.description}
                                    </p>
                                    {p.href ? (
                                        <span className="inline-flex items-center gap-1 text-sauge text-sm font-medium mt-4">
                                            En savoir plus <ArrowRight className="w-4 h-4" />
                                        </span>
                                    ) : null}
                                </>
                            );

                            return p.href ? (
                                <Link
                                    key={p.title}
                                    href={p.href}
                                    className="group block bg-white p-7 rounded-2xl border border-line hover:border-sauge hover:shadow-lg transition-all"
                                >
                                    {Inner}
                                </Link>
                            ) : (
                                <div
                                    key={p.title}
                                    className="group bg-white p-7 rounded-2xl border border-line"
                                >
                                    {Inner}
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/referencement-naturel">
                            <Button variant="outline" className="border-2 border-ink text-ink hover:bg-ink hover:text-white rounded-full px-7 py-5">
                                Voir le détail de mes services SEO
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============ H2 #5 — Approche différente + bloc preuve ============ */}
            <section className="py-20 bg-ink text-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
                        {/* Texte principal — 4 colonnes */}
                        <div className="lg:col-span-3">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                                Pourquoi mon approche est différente
                            </h2>
                            <p className="text-lg text-white/80 mb-10 leading-relaxed">
                                Beaucoup de consultants SEO restent au niveau des recommandations. Je travaille au niveau du code, des templates et de la donnée Search Console.
                            </p>

                            <div className="space-y-6">
                                {APPROCHE.map((point) => (
                                    <div key={point.title} className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sauge/20 flex items-center justify-center">
                                            <point.icon className="w-5 h-5 text-sauge-light" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-heading font-bold mb-1">
                                                {point.title}
                                            </h3>
                                            <p className="text-white/75 leading-relaxed">
                                                {point.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bloc preuve compact — 2 colonnes */}
                        <aside className="lg:col-span-2">
                            <div className="bg-white/5 border border-white/15 rounded-2xl p-7 sticky top-28">
                                <p className="text-sauge-light text-xs uppercase tracking-wider font-medium mb-4">
                                    En bref
                                </p>
                                <h3 className="text-xl font-heading font-bold mb-4">
                                    Indiana Aflalo, consultante SEO
                                </h3>
                                <ul className="space-y-3 text-sm text-white/85">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-sauge-light flex-shrink-0 mt-0.5" />
                                        <span>Basée à Nice, accompagnement partout en France</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-sauge-light flex-shrink-0 mt-0.5" />
                                        <span>Lecture directe du code, des templates et des données Search Console</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-sauge-light flex-shrink-0 mt-0.5" />
                                        <span>Méthode priorisée pour transformer la visibilité en demandes qualifiées</span>
                                    </li>
                                </ul>
                                <Link
                                    href="/a-propos"
                                    className="inline-flex items-center gap-2 text-sauge-light hover:text-white text-sm font-medium mt-6"
                                >
                                    En savoir plus sur mon parcours
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* ============ H2 #6 — Pour quels types de sites ============ */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Pour quels types de sites ?
                        </h2>
                        <p className="text-lg text-soft">
                            Pas de spécialisation sectorielle stricte, mais des typologies de sites où mon approche fait sens.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {TYPOLOGIES.map((t) => (
                            <div
                                key={t.title}
                                className="flex items-start gap-4 p-5 bg-fond-clair rounded-2xl border border-line"
                            >
                                <div className="flex-shrink-0 w-10 h-10 bg-sauge/10 rounded-lg flex items-center justify-center">
                                    <t.icon className="w-5 h-5 text-sauge" />
                                </div>
                                <p className="text-ink font-medium leading-snug pt-1">
                                    {t.title}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-soft mt-12 max-w-2xl mx-auto">
                        Pour les problématiques de visibilité de proximité, voir aussi mon accompagnement <Link href="/seo-local" className="text-sauge hover:underline font-medium">SEO local</Link>.
                    </p>
                </div>
            </section>

            {/* ============ H2 #7 — Tarifs ============ */}
            <section className="py-20 bg-fond-clair">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-6">
                            Combien coûte un accompagnement SEO ?
                        </h2>
                        <p className="text-lg text-soft leading-relaxed">
                            Le tarif d&apos;un accompagnement SEO dépend de plusieurs facteurs : la taille du site, son état technique de départ, l&apos;intensité concurrentielle, le volume de contenus à reprendre ou à produire, et le besoin de suivi mensuel. Pas de grille tarifaire forfaitaire affichée, parce que ce n&apos;est jamais le bon tarif pour le bon site.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-white p-7 rounded-2xl border border-line">
                            <h3 className="text-xl font-heading font-bold text-ink mb-2">Audit SEO</h3>
                            <p className="text-soft text-sm mb-5">Diagnostic complet et roadmap priorisée</p>
                            <div className="text-3xl font-heading font-bold text-ink mb-6">Sur devis</div>
                            <ul className="space-y-2 text-sm text-soft mb-6">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Audit technique complet</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Analyse sémantique et concurrentielle</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Roadmap priorisée par impact business</span>
                                </li>
                            </ul>
                            <Link href="/audit-seo">
                                <Button variant="outline" className="w-full rounded-xl border-2">
                                    En savoir plus
                                </Button>
                            </Link>
                        </div>

                        <div className="bg-ink text-white p-7 rounded-2xl">
                            <h3 className="text-xl font-heading font-bold mb-2">Accompagnement mensuel</h3>
                            <p className="text-white/70 text-sm mb-5">Optimisation continue et suivi Search Console</p>
                            <div className="text-3xl font-heading font-bold mb-6">Sur devis</div>
                            <ul className="space-y-2 text-sm text-white/85 mb-6">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge-light flex-shrink-0 mt-0.5" />
                                    <span>Audit initial inclus</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge-light flex-shrink-0 mt-0.5" />
                                    <span>Optimisations contenu, technique, maillage</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge-light flex-shrink-0 mt-0.5" />
                                    <span>Reporting mensuel data-driven</span>
                                </li>
                            </ul>
                            <AuditCTA className="w-full bg-sauge hover:bg-sauge-light hover:text-ink rounded-xl py-5 font-semibold">
                                Demander une estimation
                            </AuditCTA>
                        </div>

                        <div className="bg-white p-7 rounded-2xl border border-line">
                            <h3 className="text-xl font-heading font-bold text-ink mb-2">Mission complète</h3>
                            <p className="text-soft text-sm mb-5">Projet SEO global, livrables sur mesure</p>
                            <div className="text-3xl font-heading font-bold text-ink mb-6">Sur devis</div>
                            <ul className="space-y-2 text-sm text-soft mb-6">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Audit, stratégie, exécution</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Plan éditorial et briefs SEO</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-sauge flex-shrink-0 mt-0.5" />
                                    <span>Plan de maillage interne</span>
                                </li>
                            </ul>
                            <Link href="/contact">
                                <Button variant="outline" className="w-full rounded-xl border-2">
                                    Discuter du projet
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ H2 #8 — FAQ ============ */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Questions fréquentes
                        </h2>
                        <p className="text-lg text-soft">
                            Tout ce que les prospects me demandent avant de signer un accompagnement.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {FAQ.map((faq, index) => (
                            <details
                                key={index}
                                className="group bg-fond-clair p-6 rounded-2xl border border-line"
                            >
                                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                                    <h3 className="text-lg font-heading font-bold text-ink leading-snug">
                                        {faq.question}
                                    </h3>
                                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border border-line flex items-center justify-center text-sauge font-bold text-lg leading-none group-open:rotate-45 transition-transform">
                                        +
                                    </span>
                                </summary>
                                <div className="mt-4 text-soft leading-relaxed">
                                    {index === 1 ? (
                                        <p>
                                            En consultante indépendante, je suis l&apos;interlocutrice unique du début à la fin. Pas de chef de projet qui transmet à un consultant junior, pas de process standardisé appliqué à toutes les PME pareil. L&apos;agence apporte une équipe pluridisciplinaire et des moyens plus larges, c&apos;est utile sur de gros e-commerce. Pour la majorité des PME et sites de services, le format consultante reste plus direct et plus adapté. Voir le <Link href="/consultant-seo-freelance" className="text-sauge hover:underline">guide détaillé sur le consultant SEO freelance</Link> pour comparer.
                                        </p>
                                    ) : (
                                        <p>{faq.answer}</p>
                                    )}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ Articles complémentaires ============ */}
            <section className="py-16 bg-fond-clair">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-10 text-center">
                            Approfondir le sujet
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Link
                                href="/blog/pourquoi-consultant-seo"
                                className="group bg-white p-6 rounded-2xl border border-line hover:border-sauge hover:shadow-lg transition-all"
                            >
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-heading font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Pourquoi faire appel à un consultant SEO
                                </h3>
                                <p className="text-soft text-sm mt-2 leading-relaxed">
                                    Les raisons concrètes de confier son référencement à un expert dédié.
                                </p>
                            </Link>
                            <Link
                                href="/blog/devenir-consultant-seo"
                                className="group bg-white p-6 rounded-2xl border border-line hover:border-sauge hover:shadow-lg transition-all"
                            >
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-heading font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Comment devenir consultant SEO
                                </h3>
                                <p className="text-soft text-sm mt-2 leading-relaxed">
                                    Le parcours, les compétences clés et les premières missions à viser.
                                </p>
                            </Link>
                            <Link
                                href="/blog/salaire-consultant-seo"
                                className="group bg-white p-6 rounded-2xl border border-line hover:border-sauge hover:shadow-lg transition-all"
                            >
                                <span className="text-xs font-medium text-sauge uppercase tracking-wide">Article</span>
                                <h3 className="text-lg font-heading font-bold text-ink mt-2 group-hover:text-sauge transition-colors">
                                    Salaire consultant SEO en France
                                </h3>
                                <p className="text-soft text-sm mt-2 leading-relaxed">
                                    Fourchettes salariales par expérience, par statut, par typologie d&apos;employeur.
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ H2 #9 — Veille et expérimentation (compact, secondaire) ============ */}
            <section className="py-16 bg-white border-t border-line">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-start gap-5">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-sauge/10 flex items-center justify-center">
                                <Lightbulb className="w-6 h-6 text-sauge" />
                            </div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-heading font-bold text-ink mb-3">
                                    Veille et expérimentation
                                </h2>
                                <p className="text-soft leading-relaxed mb-4">
                                    Je mène aussi des expérimentations sur la visibilité dans les IA génératives, dont un retour d&apos;expérience publié autour du concours GEO GreenRed 2026. Ce n&apos;est pas le cœur de mon accompagnement SEO, mais c&apos;est un signal utile : les contenus qui performent aujourd&apos;hui doivent être lisibles par Google, par les humains et par les moteurs IA.
                                </p>
                                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                                    <Link href="/consultant-geo" className="text-sauge hover:underline font-medium">
                                        Page consultante GEO
                                    </Link>
                                    <Link href="/outils/testeur-visibilite-ia" className="text-sauge hover:underline font-medium">
                                        Testeur de visibilité IA
                                    </Link>
                                    <Link href="/blog/etude-de-cas-geo-vultifrine" className="text-sauge hover:underline font-medium">
                                        Étude de cas vultifrine
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ Couverture France (compact) ============ */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-xl md:text-2xl font-heading font-bold text-ink mb-3">
                            Accompagnement SEO à Nice et partout en France
                        </h2>
                        <p className="text-soft mb-5 leading-relaxed">
                            Je travaille en visio avec des clients sur toute la France, avec un ancrage local sur la Côte d&apos;Azur. Pour les besoins de visibilité de proximité, consultez la page <Link href="/seo-local" className="text-sauge hover:underline font-medium">SEO local</Link>.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 text-sm">
                            {VILLES_PHARES.map((city) => (
                                <Link
                                    key={city.slug}
                                    href={`/${city.slug}`}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-fond-clair hover:bg-sauge hover:text-white rounded-full font-medium transition-colors border border-line hover:border-sauge"
                                >
                                    <MapPin className="w-4 h-4" />
                                    Consultant SEO {city.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ CTA Final ============ */}
            <section className="py-20 bg-ink text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                            Vous voulez savoir ce qui bloque votre visibilité ?
                        </h2>
                        <p className="text-lg text-white/80 mb-10 leading-relaxed">
                            Discutons de votre site, de vos pages business prioritaires et des leviers SEO qui peuvent transformer votre visibilité en demandes qualifiées.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <AuditCTA className="bg-sauge hover:bg-sauge-light hover:text-ink text-white px-8 py-6 rounded-xl text-base font-semibold transition-all">
                                Demander un audit SEO
                            </AuditCTA>
                            <Link href="/contact">
                                <Button variant="outline" className="border-2 border-white/40 text-white hover:bg-white hover:text-ink px-8 py-6 rounded-xl text-base font-semibold">
                                    Parler de mon site
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ Schema FAQPage (unique) ============ */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": FAQ.map((faq) => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />

            <HomepageBacklink variant="default" />
        </main>
    );
}
