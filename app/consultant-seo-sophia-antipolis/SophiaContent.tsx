"use client";

import { motion } from "framer-motion";
import { Building2, Cpu, Globe, Rocket, Target, TrendingUp, Users, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function SophiaAntipolisContent() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Titre de section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-2 bg-sauge/10 text-sauge text-sm font-bold rounded-full mb-4">
                            Focus Technopole
                        </span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">
                            Le SEO B2B à <span className="text-sauge">Sophia Antipolis</span> :
                            <br />un marché unique en Europe
                        </h2>
                    </motion.div>

                    {/* Contexte Sophia */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="prose prose-lg max-w-none mb-12"
                    >
                        <p className="text-lg text-soft leading-relaxed">
                            <strong className="text-ink">Sophia Antipolis n'est pas une ville comme les autres.</strong> Avec
                            plus de <strong>2 500 entreprises</strong>, <strong>40 000 emplois</strong> et une concentration
                            exceptionnelle d'acteurs tech (Amadeus, SAP, NXP Semiconductors, Thales, Orange Labs...),
                            la technopole est la <strong>Silicon Valley européenne</strong>.
                        </p>
                        <p className="text-soft">
                            Ici, le référencement naturel ne ressemble pas au SEO classique. Vos clients sont des
                            <strong> directeurs techniques</strong>, des <strong>DSI</strong>, des <strong>responsables
                                innovation</strong>. Ils ne tapent pas "plombier près de moi" mais recherchent des
                            solutions précises : "API de paiement SEPA", "plateforme IoT industrielle", "audit cybersécurité PME".
                        </p>
                        <p className="text-soft">
                            Le SEO B2B à Sophia Antipolis exige une <strong>compréhension fine du marché tech</strong>,
                            des cycles de vente longs (6-18 mois), et une stratégie de contenu qui éduque avant de convertir.
                            C'est exactement mon expertise.
                        </p>
                    </motion.div>

                    {/* Écosystème Sophia - Chiffres */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-4 gap-4 mb-12"
                    >
                        {[
                            { value: "2 500+", label: "Entreprises", icon: <Building2 className="w-5 h-5" /> },
                            { value: "40 000", label: "Emplois tech", icon: <Users className="w-5 h-5" /> },
                            { value: "60+", label: "Nationalités", icon: <Globe className="w-5 h-5" /> },
                            { value: "€6 Mds", label: "CA annuel", icon: <TrendingUp className="w-5 h-5" /> }
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="bg-ink text-white p-5 rounded-xl text-center"
                            >
                                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-sauge/20 flex items-center justify-center text-sauge">
                                    {stat.icon}
                                </div>
                                <p className="text-2xl font-bold text-sauge">{stat.value}</p>
                                <p className="text-xs text-white/60 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Défis SEO spécifiques Sophia */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 rounded-2xl p-8 mb-12"
                    >
                        <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                            <Target className="w-5 h-5 text-sauge" />
                            Les défis SEO spécifiques à Sophia Antipolis
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-bold text-ink mb-2">Concurrence mondiale</h4>
                                <p className="text-sm text-soft">
                                    Vos concurrents ne sont pas locaux. Une startup SaaS de Sophia est en compétition
                                    avec San Francisco, Tel Aviv, Berlin. Le SEO doit vous positionner comme
                                    <strong> référence française</strong> sur votre niche.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-ink mb-2">Contenu technique exigeant</h4>
                                <p className="text-sm text-soft">
                                    Vos prospects sont experts. Un contenu superficiel les fait fuir.
                                    Il faut du <strong>thought leadership</strong> : études de cas chiffrées,
                                    whitepapers, documentation technique SEO-optimisée.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-ink mb-2">Cycles de vente B2B longs</h4>
                                <p className="text-sm text-soft">
                                    Entre la première visite et la signature, il peut s'écouler 12 mois.
                                    Le SEO doit <strong>nurturer</strong> avec du contenu à chaque étape
                                    du funnel : awareness, consideration, decision.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-ink mb-2">Multilinguisme obligatoire</h4>
                                <p className="text-sm text-soft">
                                    60 nationalités à Sophia. Une stratégie SEO EN/FR est souvent indispensable.
                                    Les <strong>balises hreflang</strong> et la localisation du contenu sont cruciales.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Ma méthodologie B2B Tech */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h3 className="text-xl font-bold text-ink mb-6 text-center">
                            Ma méthodologie SEO pour les entreprises tech de Sophia
                        </h3>
                        <div className="grid md:grid-cols-3 gap-5">
                            {[
                                {
                                    icon: <Cpu className="w-6 h-6" />,
                                    title: "Audit technique avancé",
                                    points: [
                                        "Core Web Vitals (LCP, CLS, INP)",
                                        "Architecture SaaS / Web App",
                                        "Documentation API indexable",
                                        "Internationalisation (hreflang)"
                                    ]
                                },
                                {
                                    icon: <Zap className="w-6 h-6" />,
                                    title: "Content marketing B2B",
                                    points: [
                                        "Études de cas ROI-driven",
                                        "Whitepapers & guides techniques",
                                        "Glossaires SEO-optimisés",
                                        "Comparatifs produits objectifs"
                                    ]
                                },
                                {
                                    icon: <Rocket className="w-6 h-6" />,
                                    title: "Autorité & Netlinking",
                                    points: [
                                        "Relations presse tech (Maddyness, FrenchWeb...)",
                                        "Guest posts sur blogs SaaS",
                                        "Partenariats écosystème Sophia",
                                        "Stratégie de linkbait tech"
                                    ]
                                }
                            ].map((method, i) => (
                                <div
                                    key={i}
                                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-sauge/30 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-sauge/10 flex items-center justify-center text-sauge mb-4">
                                        {method.icon}
                                    </div>
                                    <h4 className="font-bold text-ink mb-3">{method.title}</h4>
                                    <ul className="space-y-2">
                                        {method.points.map((point, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm text-soft">
                                                <CheckCircle2 className="w-4 h-4 text-sauge flex-shrink-0 mt-0.5" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Secteurs clés */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-ink text-white rounded-2xl p-8 mb-12"
                    >
                        <h3 className="text-xl font-bold mb-6 text-center">
                            Secteurs que j'accompagne à Sophia Antipolis
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { name: "SaaS & Cloud", examples: "ERP, CRM, MarTech" },
                                { name: "Deep Tech", examples: "IA, IoT, Blockchain" },
                                { name: "Santé & Biotech", examples: "MedTech, e-santé" },
                                { name: "ESN & Conseil", examples: "Intégrateurs, SSII" },
                                { name: "Cybersécurité", examples: "SOC, pentest, audit" },
                                { name: "Telecom & Réseaux", examples: "5G, infra, SD-WAN" },
                                { name: "FinTech", examples: "Paiement, RegTech" },
                                { name: "GreenTech", examples: "Énergie, mobilité" }
                            ].map((sector, i) => (
                                <div key={i} className="text-center p-3 bg-white/5 rounded-lg">
                                    <p className="font-bold text-sm">{sector.name}</p>
                                    <p className="text-xs text-white/50 mt-1">{sector.examples}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Témoignage / Preuve sociale */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 rounded-2xl p-8 border-l-4 border-sauge"
                    >
                        <blockquote className="text-lg text-ink italic mb-4">
                            "Indiana comprend notre marché B2B tech. En 6 mois, notre trafic organique a augmenté
                            de 180% et nous générons maintenant 15 leads qualifiés par mois via le SEO —
                            là où nous en avions 2 avant."
                        </blockquote>
                        <p className="text-sm text-soft">
                            — <strong>Directeur Marketing</strong>, Éditeur SaaS à Sophia Antipolis
                        </p>
                    </motion.div>

                    {/* CTA spécifique */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <p className="text-soft mb-6">
                            Startup, scale-up ou ETI de Sophia Antipolis ? Discutons de votre stratégie SEO B2B.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-sauge text-white px-8 py-4 rounded-full font-bold hover:bg-ink transition-colors"
                            >
                                Demander un audit gratuit
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/blog/programmatic-seo-50-pages-locales"
                                className="inline-flex items-center gap-2 border-2 border-ink text-ink px-8 py-4 rounded-full font-bold hover:bg-ink hover:text-white transition-colors"
                            >
                                Lire : SEO programmatique B2B
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
