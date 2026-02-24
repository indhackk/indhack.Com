"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, MapPin, Star, AlertTriangle, ExternalLink, Globe, MessageSquare, ChevronRight, BarChart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const STUDY_DATA = {
    date: "24 février 2026",
    totalAnalyzed: 308,
    citiesCount: 10,
    noRealWebsite: { count: 92, pct: 29.9 },
    suspiciousProfiles: { count: 41, pct: 13.3 },
    lowEngagement: { count: 98, pct: 31.8 },
    avgRating: 4.55,
    medianReviews: 222,
    cities: [
        { name: "Menton", total: 28, noWebsite: 12, pctNoWebsite: 43, avgRating: 4.61, suspectProfiles: 1 },
        { name: "Fréjus", total: 28, noWebsite: 11, pctNoWebsite: 39, avgRating: 4.64, suspectProfiles: 1 },
        { name: "Grasse", total: 30, noWebsite: 8, pctNoWebsite: 27, avgRating: 4.61, suspectProfiles: 1 },
        { name: "Cagnes-sur-Mer", total: 31, noWebsite: 8, pctNoWebsite: 26, avgRating: 4.55, suspectProfiles: 2 },
        { name: "Mandelieu", total: 30, noWebsite: 7, pctNoWebsite: 23, avgRating: 4.53, suspectProfiles: 0 },
        { name: "Antibes", total: 36, noWebsite: 8, pctNoWebsite: 22, avgRating: 4.58, suspectProfiles: 3 },
        { name: "Saint-Tropez", total: 31, noWebsite: 6, pctNoWebsite: 19, avgRating: 4.23, suspectProfiles: 0 },
        { name: "Monaco", total: 26, noWebsite: 3, pctNoWebsite: 12, avgRating: 4.58, suspectProfiles: 0 },
        { name: "Nice", total: 35, noWebsite: 1, pctNoWebsite: 3, avgRating: 4.65, suspectProfiles: 9 },
        { name: "Cannes", total: 33, noWebsite: 1, pctNoWebsite: 3, avgRating: 4.52, suspectProfiles: 1 },
    ].sort((a, b) => b.pctNoWebsite - a.pctNoWebsite)
};

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

export default function StudyClientContent() {
    return (
        <main className="bg-[#0A0D0B] min-h-screen text-white selection:bg-accent selection:text-white">
            {/* Hero Section with Premium gradient mesh */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-sauge/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-5xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-white/80">Rapport de données 2026</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 leading-[1.1] tracking-tight">
                            L'illusion<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-sauge-light">
                                du 5 étoiles.
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-white/60 mb-10 max-w-3xl leading-relaxed font-light">
                            Nous avons audité les <strong className="text-white font-medium">308 restaurants</strong> les plus visibles de la Côte d'Azur sur Google. Leurs failles digitales sont monumentales.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                            <a href="#rapport">
                                <Button className="bg-white text-ink hover:bg-white/90 rounded-full px-8 py-6 text-sm font-bold uppercase tracking-wider h-14">
                                    Lire le rapport
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </a>
                            <a href="#donnees">
                                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 hover:border-white/20 rounded-full px-8 py-6 text-sm font-bold uppercase tracking-wider h-14 backdrop-blur-md">
                                    <Download className="mr-2 w-4 h-4" />
                                    Données JSON
                                </Button>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Dashboard / Bento Grid Infographic */}
            <section className="py-12 border-y border-white/5 bg-white/5" id="rapport">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {/* Stat Card 1 */}
                        <motion.div variants={fadeInUp} className="bg-ink/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <Globe className="w-8 h-8 text-accent mb-6" />
                            <p className="text-6xl font-heading font-bold text-white mb-2">30%</p>
                            <h3 className="text-lg font-bold text-white mb-2">Aucun site web</h3>
                            <p className="text-white/60 text-sm">Ils sont 1ers sur Google mais ne possèdent qu'une page Facebook ou Instagram pour convertir.</p>
                        </motion.div>

                        {/* Stat Card 2 */}
                        <motion.div variants={fadeInUp} className="bg-ink/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-sauge/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <MessageSquare className="w-8 h-8 text-sauge-light mb-6" />
                            <p className="text-6xl font-heading font-bold text-white mb-2">32%</p>
                            <h3 className="text-lg font-bold text-white mb-2">Engagement fantôme</h3>
                            <p className="text-white/60 text-sm">Moins de 50 avis au total malgré leur position dominante dans le haut des résultats de recherche.</p>
                        </motion.div>

                        {/* Stat Card 3 */}
                        <motion.div variants={fadeInUp} className="bg-ink/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <AlertTriangle className="w-8 h-8 text-red-400 mb-6" />
                            <p className="text-6xl font-heading font-bold text-white mb-2">13%</p>
                            <h3 className="text-lg font-bold text-white mb-2">Profils suspects</h3>
                            <p className="text-white/60 text-sm">Affichent une note supérieure à 4.5/5 tout en cumulant miraculeusement moins de 10 avis.</p>
                        </motion.div>

                        {/* Wide Data Chart */}
                        <motion.div variants={fadeInUp} className="md:col-span-2 bg-ink/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Déficit de site web par ville</h3>
                                    <p className="text-white/50 text-sm">Pourcentage de restaurants sans site officiel dans le Top Google</p>
                                </div>
                                <BarChart className="w-6 h-6 text-white/20" />
                            </div>

                            <div className="space-y-4">
                                {STUDY_DATA.cities.slice(0, 5).map((city, i) => (
                                    <div key={city.name} className="flex items-center gap-4">
                                        <div className="w-24 text-sm font-medium text-white/80">{city.name}</div>
                                        <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${city.pctNoWebsite}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                                                className={`h-full rounded-full ${city.pctNoWebsite > 30 ? 'bg-accent' : 'bg-sauge'}`}
                                            ></motion.div>
                                        </div>
                                        <div className="w-12 text-right text-sm font-bold text-white">{city.pctNoWebsite}%</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Insight Card */}
                        <motion.div variants={fadeInUp} className="bg-sauge/20 backdrop-blur-xl border border-sauge/30 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-center">
                            <div className="text-sauge-light uppercase tracking-widest text-xs font-bold mb-4">Le Paradoxe Saint-Tropez</div>
                            <p className="text-4xl font-heading font-bold text-white mb-4">4.23★</p>
                            <p className="text-white/80 text-sm leading-relaxed">
                                C'est la note moyenne la plus basse de toute la Côte d'Azur. La clientèle y est ultra-exigeante, mais les restaurants négligent leur e-réputation locale, laissant leurs concurrents niçois dicter les standards (4.65★).
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Premium Article Styling */}
            <section className="py-24 bg-white text-ink">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="max-w-3xl mx-auto"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl font-heading font-bold mb-10 leading-tight">
                            L'élite algorithmique est-elle une arnaque ?
                        </motion.h2>

                        <div className="prose prose-lg prose-slate prose-headings:font-heading prose-headings:font-bold prose-a:text-sauge hover:prose-a:text-sauge-light max-w-none">
                            <motion.p variants={fadeInUp} className="text-xl text-soft font-light leading-relaxed mb-8">
                                Cette étude, réalisée le <strong>24 février 2026</strong>, décortique les <strong>308 restaurants</strong> qui trônent au sommet des résultats Google sur 10 villes emblématiques de la Côte d'Azur.
                            </motion.p>

                            <motion.p variants={fadeInUp}>
                                Ces établissements sont, par l'algorithme même, les plus visibles. Google les choisit pour vous. Et pourtant, en grattant le vernis numérique, les failles qui apparaissent sont béantes, laissant de gigantesques opportunités pour les restaurateurs prêts à s'investir sérieusement dans un vrai <Link href="/seo-local" className="font-bold underline decoration-accent underline-offset-4 decoration-2">SEO Local</Link>.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="my-16 pl-8 border-l-4 border-accent bg-accent/5 p-6 rounded-r-2xl">
                                <h3 className="text-xl font-bold mt-0 mb-4">Menton, la ville sans site web</h3>
                                <p className="mb-0">
                                    Menton détient le triste record : <strong>43% des restaurants les mieux classés</strong> n'ont aucune plateforme propriétaire. Ils sous-traitent l'intégralité de leur marque à Instagram ou UberEats, se coupant d'une clientèle recherchant les <Link href="/creation-site-web" className="underline decoration-sauge/30">menus et l'authenticité d'un vrai site internet</Link>.
                                </p>
                            </motion.div>

                            <motion.h3 variants={fadeInUp} className="text-2xl mt-12 mb-6">Le profil suspect : quand l'IA s'en mêle</motion.h3>

                            <motion.p variants={fadeInUp}>
                                Si Nice fait figure d'élève modèle sur l'adoption technologique (seulement 3% sans site web), elle est aussi la capitale des profils douteux. Nous y avons repéré 9 restaurants affichant fièrement des notes supérieures à 4.8/5, générées par à peine 2 ou 3 avis.
                            </motion.p>

                            <motion.p variants={fadeInUp}>
                                Sur le papier, le score est parfait. En réalité, un consommateur ne fera jamais confiance à un tel profil comparé à un établissement affichant 4.4/5 avec des centaines d'expériences documentées. Gérer sa <Link href="/blog/google-business-profile-guide-complet" className="underline decoration-sauge/30">Fiche établissement Google</Link> requiert plus de subtilité.
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Methodology / Download Section - Dark styled */}
            <section className="py-24 bg-ink text-white relative overflow-hidden" id="donnees">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-sauge/5 blur-3xl rounded-full translate-x-1/3"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.h3 variants={fadeInUp} className="text-3xl font-heading font-bold mb-6">Transparence & Data</motion.h3>
                            <motion.p variants={fadeInUp} className="text-white/60 mb-8 leading-relaxed">
                                Les données complètes de cette étude, extraites via l'API Google Places, sont mises à la disposition des journalistes, chercheurs et restaurateurs.
                            </motion.p>
                            <motion.div variants={fadeInUp} className="flex flex-col gap-4">
                                <a
                                    href="/data/gmb-study-cote-azur-2026.json"
                                    download
                                    className="inline-flex justify-between items-center bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-4 rounded-2xl transition-all group"
                                >
                                    <div>
                                        <div className="font-bold">Dataset Complet</div>
                                        <div className="text-xs text-white/50">308 entrées brutes • JSON</div>
                                    </div>
                                    <Download className="w-5 h-5 text-accent group-hover:-translate-y-1 transition-transform" />
                                </a>
                                <a
                                    href="/data/gmb-study-key-stats.json"
                                    download
                                    className="inline-flex justify-between items-center bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-4 rounded-2xl transition-all group"
                                >
                                    <div>
                                        <div className="font-bold">Agrégation par ville</div>
                                        <div className="text-xs text-white/50">Statistiques macro • JSON</div>
                                    </div>
                                    <Download className="w-5 h-5 text-sauge-light group-hover:-translate-y-1 transition-transform" />
                                </a>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md"
                        >
                            <motion.h3 variants={fadeInUp} className="text-xl font-bold mb-6 flex items-center gap-3">
                                <div className="p-2 bg-sauge/20 rounded-lg"><CheckCircle className="w-5 h-5 text-sauge-light" /></div>
                                Méthodologie
                            </motion.h3>
                            <ul className="space-y-4 text-sm text-white/70">
                                <motion.li variants={fadeInUp} className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"></div>
                                    <p><strong>Ciblage :</strong> Top résultats organiques pour « restaurant / pizzeria / brasserie + ville ».</p>
                                </motion.li>
                                <motion.li variants={fadeInUp} className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"></div>
                                    <p><strong>Technologie :</strong> Scraping via Google Places API et Serper.dev, février 2026.</p>
                                </motion.li>
                                <motion.li variants={fadeInUp} className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"></div>
                                    <p><strong>Limitations :</strong> Les données reflètent une photo à un instant T et uniquement de l'élite algorithmique visible, non des restaurants invisibles.</p>
                                </motion.li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Pre-footer */}
            <section className="py-24 bg-gradient-to-br from-[#0A0D0B] to-ink border-t border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                            Testez votre propre établissement.
                        </h2>
                        <p className="text-white/60 mb-10 text-lg">
                            Vous êtes sur la Côte d'Azur ? Découvrez instantanément si vos concurrents dominent votre visibilité locale avec notre outil gratuit.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/outils/simulateur-visibilite-locale">
                                <Button className="bg-sauge hover:bg-sauge-light text-white rounded-full px-8 py-7 text-lg font-bold w-full sm:w-auto h-16">
                                    Lancer l'audit gratuit
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}


