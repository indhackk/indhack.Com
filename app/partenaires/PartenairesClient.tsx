"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
    Users,
    Mail,
    Zap,
    Copy,
    Check,
    ArrowRight,
    Bot,
    Code2,
    MessageSquare,
    Globe,
    TrendingUp,
    Clock,
    CheckCircle2,
    Sparkles,
    HelpCircle,
    ChevronDown,
    Rocket,
    Shield,
    Gift,
} from "lucide-react";

// Lazy load Lottie pour performance
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Animation Lottie simple pour le hero (checkmark animé)
const checkAnimation = {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 40,
    w: 100,
    h: 100,
    layers: [{
        ty: 4,
        nm: "check",
        sr: 1,
        ks: { o: { a: 0, k: 100 }, r: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, s: { a: 1, k: [{ t: 0, s: [0, 0, 100] }, { t: 20, s: [110, 110, 100] }, { t: 30, s: [100, 100, 100] }] } },
        shapes: [{
            ty: "gr",
            it: [{
                ty: "sh",
                ks: { a: 0, k: { c: false, v: [[-20, 0], [-5, 15], [20, -15]] } }
            }, {
                ty: "st",
                c: { a: 0, k: [0.18, 0.37, 0.31, 1] },
                w: { a: 0, k: 6 },
                lc: 2,
                lj: 2
            }, {
                ty: "tr",
                p: { a: 0, k: [50, 50] }
            }]
        }]
    }]
};

const ANCHORS = [
    "Propulsé par IndHack",
    "IndHack",
    "IndHack — Testeur IA",
    "Outil par IndHack",
];

export function PartenairesClient() {
    const [email, setEmail] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [copied, setCopied] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [showPreview, setShowPreview] = useState(false);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const generateCode = () => {
        setEmailError("");

        if (!email.trim()) {
            setEmailError("Veuillez entrer un email");
            return;
        }

        if (!validateEmail(email.trim())) {
            setEmailError("Email invalide");
            return;
        }

        const randomAnchor = ANCHORS[Math.floor(Math.random() * ANCHORS.length)];

        const code = `<div style="max-width:700px;margin:0 auto;">
  <iframe src="https://indhack.com/widget/testeur-ia?email=${encodeURIComponent(email.trim())}" width="100%" height="700" style="border:none;border-radius:12px;box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1);" loading="lazy"></iframe>
  <p style="text-align:right;font-size:11px;margin-top:4px;opacity:0.6;">
    <a href="https://indhack.com" target="_blank" rel="dofollow" style="color:inherit;text-decoration:none;">${randomAnchor}</a>
  </p>
</div>`;

        setGeneratedCode(code);
        setShowPreview(true);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(generatedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white">
            {/* Hero - Gradient premium */}
            <section className="relative pt-28 pb-24 overflow-hidden">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-ink via-[#1a2f28] to-ink" />

                {/* Animated gradient orbs */}
                <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-sauge/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sauge/5 rounded-full blur-[100px]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge animé */}
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8 group hover:bg-white/15 transition-all duration-300">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="text-white/90 text-sm font-medium">Programme Partenaires</span>
                            <Rocket className="w-4 h-4 text-sauge-light group-hover:translate-x-1 transition-transform" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-[1.1] tracking-tight">
                            Générez des leads SEO
                            <br />
                            <span className="bg-gradient-to-r from-sauge-light via-emerald-400 to-sauge-light bg-clip-text text-transparent">
                                depuis votre site
                            </span>
                        </h1>

                        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                            Intégrez notre <span className="text-white font-medium">Testeur de Visibilité IA</span> sur votre site d&apos;agence.
                            Vos visiteurs testent leur référencement, vous recevez leurs coordonnées.
                        </p>

                        {/* Features badges */}
                        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
                            {[
                                { icon: Gift, text: "100% gratuit" },
                                { icon: Zap, text: "Prêt en 2 minutes" },
                                { icon: Shield, text: "Lien partenaire inclus" },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-sauge/50 hover:bg-white/10 transition-all duration-300 group"
                                >
                                    <item.icon className="w-4 h-4 text-sauge-light group-hover:scale-110 transition-transform" />
                                    <span className="text-white/80 text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Arrow */}
                        <div className="mt-12 animate-bounce">
                            <ChevronDown className="w-6 h-6 text-soft-light mx-auto" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits - Cards avec hover effects */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Pourquoi intégrer ce widget ?
                        </h2>
                        <p className="text-soft text-lg max-w-2xl mx-auto">
                            Un outil gratuit qui génère des leads qualifiés pour votre agence, sans effort de votre part.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                icon: Bot,
                                title: "Vos visiteurs testent leur site",
                                description: "L'outil analyse 8 crawlers IA (ChatGPT, Perplexity, Claude...) et donne un score de visibilité sur 100. Vos prospects découvrent immédiatement leurs faiblesses SEO.",
                                gradient: "from-violet-500/10 to-purple-500/10",
                                iconBg: "bg-violet-500/10",
                                iconColor: "text-violet-600"
                            },
                            {
                                icon: Mail,
                                title: "Vous recevez les leads par email",
                                description: "Quand un visiteur veut son rapport détaillé, il laisse son email. Vous recevez instantanément : l'URL testée, le score obtenu, et l'email du prospect.",
                                gradient: "from-sauge/10 to-emerald-500/10",
                                iconBg: "bg-sauge/10",
                                iconColor: "text-sauge"
                            },
                            {
                                icon: Zap,
                                title: "Zéro maintenance, zéro coût",
                                description: "Copiez un code HTML, collez-le sur votre site. C'est tout. On gère l'hébergement, les mises à jour, et l'envoi des emails. Vous n'avez rien à maintenir.",
                                gradient: "from-amber-500/10 to-orange-500/10",
                                iconBg: "bg-amber-500/10",
                                iconColor: "text-amber-600"
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`group relative bg-gradient-to-br ${item.gradient} rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-500 hover:-translate-y-1`}
                            >
                                <div className={`w-14 h-14 rounded-xl ${item.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                                </div>
                                <h3 className="font-bold text-ink text-xl mb-3">{item.title}</h3>
                                <p className="text-soft leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats - Animated counters look */}
            <section className="py-16 bg-ink relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(46,94,78,0.3),transparent_50%)]" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {[
                            { value: "8", label: "Crawlers IA analysés", suffix: "" },
                            { value: "30", label: "Secondes d'analyse", suffix: "s" },
                            { value: "100", label: "Gratuit", suffix: "%" },
                            { value: "2", label: "Minutes pour installer", suffix: " min" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center group">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-sauge-light transition-colors">
                                    {stat.value}<span className="text-sauge-light">{stat.suffix}</span>
                                </div>
                                <div className="text-white/50 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Generator - Premium card */}
            <section className="py-24 bg-gradient-to-b from-white to-gray-50" id="generator">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sauge/10 rounded-full text-sauge text-sm font-semibold mb-6">
                                <span className="w-6 h-6 bg-sauge text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                <span>Étape 1</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                                Générez votre widget personnalisé
                            </h2>
                            <p className="text-soft text-lg">
                                Entrez l&apos;email où vous souhaitez recevoir les leads.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-10 shadow-xl shadow-gray-100/50">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="agency-email" className="block text-sm font-semibold text-ink mb-3">
                                        Email de votre agence
                                    </label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-sauge transition-colors" />
                                        <input
                                            id="agency-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setEmailError("");
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    generateCode();
                                                }
                                            }}
                                            placeholder="contact@votre-agence.fr"
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-sauge focus:bg-white focus:ring-4 focus:ring-sauge/10 transition-all text-ink placeholder-gray-400 text-lg"
                                        />
                                    </div>
                                    {emailError && (
                                        <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                            {emailError}
                                        </p>
                                    )}
                                    <p className="text-gray-500 text-sm mt-3">
                                        Cet email recevra les coordonnées de chaque prospect qui demande un rapport.
                                    </p>
                                </div>

                                <button
                                    onClick={generateCode}
                                    className="w-full bg-gradient-to-r from-sauge to-emerald-600 text-white px-8 py-5 rounded-xl font-bold hover:shadow-lg hover:shadow-sauge/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 text-lg group"
                                >
                                    <Code2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    Générer mon code HTML
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {generatedCode && (
                                <div className="mt-10 pt-10 border-t border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="text-sm font-semibold text-ink">
                                            Votre code HTML
                                        </label>
                                        <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5">
                                            <Lottie animationData={checkAnimation} loop={false} style={{ width: 16, height: 16 }} />
                                            Prêt à copier
                                        </span>
                                    </div>
                                    <div className="relative group">
                                        <textarea
                                            readOnly
                                            value={generatedCode}
                                            className="w-full h-48 p-5 bg-ink text-emerald-400 font-mono text-sm rounded-xl border-2 border-gray-700 resize-none focus:outline-none focus:border-sauge transition-colors"
                                        />
                                        <button
                                            onClick={copyCode}
                                            className={`absolute top-4 right-4 px-5 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all duration-300 ${copied
                                                ? "bg-emerald-500 text-white scale-105"
                                                : "bg-white text-ink hover:bg-gray-100 hover:scale-105"
                                                }`}
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="w-4 h-4" />
                                                    Copié !
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    Copier le code
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Preview */}
            {showPreview && (
                <section className="py-24 bg-gray-50 border-t border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-sauge/10 rounded-full text-sauge text-sm font-semibold mb-6">
                                    <Globe className="w-4 h-4" />
                                    <span>Aperçu en direct</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                                    Voici ce que verront vos visiteurs
                                </h2>
                                <p className="text-soft text-lg">
                                    Le widget s&apos;adapte automatiquement à la largeur de votre page.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-4 md:p-8 border border-gray-200 shadow-lg">
                                <iframe
                                    src={`/widget/testeur-ia?email=${encodeURIComponent(email)}`}
                                    width="100%"
                                    height="700"
                                    style={{ border: "none", borderRadius: "12px" }}
                                    loading="lazy"
                                />
                                <p className="text-right text-xs text-gray-400 mt-3">
                                    Propulsé par IndHack
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Installation Steps */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sauge/10 rounded-full text-sauge text-sm font-semibold mb-6">
                                <Clock className="w-4 h-4" />
                                <span>Installation rapide</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                                Comment installer le widget
                            </h2>
                            <p className="text-soft text-lg">
                                3 étapes simples, moins de 2 minutes.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    step: 1,
                                    title: "Générez votre code",
                                    description: "Entrez l'email de votre agence dans le formulaire ci-dessus et cliquez sur \"Générer\".",
                                    tip: "Conseil : Utilisez une adresse email dédiée aux leads (ex: leads@agence.fr)",
                                    platforms: null
                                },
                                {
                                    step: 2,
                                    title: "Collez sur votre site",
                                    description: "Copiez le code HTML et intégrez-le sur une page de votre site.",
                                    tip: null,
                                    platforms: ["WordPress", "Webflow", "Shopify", "Wix"]
                                },
                                {
                                    step: 3,
                                    title: "Recevez vos leads",
                                    description: "Chaque fois qu'un visiteur teste son site et demande le rapport, vous recevez un email avec :",
                                    tip: null,
                                    items: ["L'URL du site testé", "Le score de visibilité IA", "L'email du prospect"]
                                }
                            ].map((item) => (
                                <div key={item.step} className="relative group">
                                    {/* Step number */}
                                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-sauge to-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-sauge/25 group-hover:scale-110 transition-transform z-10">
                                        {item.step}
                                    </div>

                                    <div className="bg-gray-50 rounded-2xl p-8 pt-10 border border-gray-100 h-full hover:border-sauge/30 hover:shadow-lg transition-all duration-300">
                                        <h3 className="font-bold text-ink text-xl mb-3">{item.title}</h3>
                                        <p className="text-soft leading-relaxed mb-4">
                                            {item.description}
                                        </p>

                                        {item.tip && (
                                            <div className="bg-white rounded-lg p-4 text-sm text-soft border border-gray-100">
                                                <span className="font-semibold text-ink">Conseil :</span> {item.tip.replace("Conseil : ", "")}
                                            </div>
                                        )}

                                        {item.platforms && (
                                            <div className="space-y-2">
                                                {item.platforms.map((platform) => (
                                                    <div key={platform} className="flex items-center gap-2 text-sm text-soft">
                                                        <CheckCircle2 className="w-4 h-4 text-sauge flex-shrink-0" />
                                                        <span><strong className="text-ink">{platform}</strong></span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {item.items && (
                                            <div className="space-y-2">
                                                {item.items.map((listItem) => (
                                                    <div key={listItem} className="flex items-center gap-2 text-sm text-soft">
                                                        <TrendingUp className="w-4 h-4 text-sauge flex-shrink-0" />
                                                        <span>{listItem}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What's in it for IndHack */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-sauge/10 flex items-center justify-center flex-shrink-0">
                                    <Users className="w-6 h-6 text-sauge" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-ink text-lg mb-2">
                                        En échange, qu&apos;est-ce qu&apos;IndHack y gagne ?
                                    </h3>
                                    <p className="text-soft leading-relaxed">
                                        Le code inclut un petit lien <strong className="text-ink">&quot;Propulsé par IndHack&quot;</strong> en bas du widget.
                                        Ce lien nous aide à améliorer notre référencement. C&apos;est un échange gagnant-gagnant :
                                        vous obtenez un outil de génération de leads gratuit, et nous obtenons un backlink de qualité.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ - Premium accordion */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sauge/10 rounded-full text-sauge text-sm font-semibold mb-6">
                                <HelpCircle className="w-4 h-4" />
                                <span>FAQ</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                                Questions fréquentes
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {[
                                {
                                    q: "Comment intégrer ce widget d'audit SEO gratuit sur mon site d'agence web (WordPress, Webflow, etc.) ?",
                                    a: "Le widget est universel. Vous copiez l'extrait de code HTML généré ci-dessus et vous le collez sur n'importe quel CMS : WordPress, Shopify, Webflow, Wix, Squarespace ou un site développé sur-mesure. Il s'intègre instantanément pour capter les emails de vos prospects."
                                },
                                {
                                    q: "Est-ce que le générateur de leads SEO est vraiment 100% gratuit ?",
                                    a: "Oui, ce widget d'audit est entièrement gratuit. Contrairement aux outils de prospection digitale SaaS, il n'y a ni abonnement ni coût caché. En échange de l'analyse, un simple lien discret 'Propulsé par IndHack' informe vos visiteurs sur l'origine du calcul."
                                },
                                {
                                    q: "Combien de prospects cet outil d'inbound marketing SEO génère-t-il en moyenne ?",
                                    a: "Sur une page d'agence recevant du trafic qualifié, l'outil offre un fort taux de conversion. En moyenne, 5 à 15 % des visiteurs qui testent leur site laissent leur email pour obtenir le rapport complet. Pour 1000 visiteurs sur la page, attendez-vous à collecter entre 50 et 150 leads qualifiés."
                                },
                                {
                                    q: "Le widget d'analyse a-t-il un impact sur la vitesse (Core Web Vitals) de l'agence ?",
                                    a: "Non. L'iframe utilise l'attribut native HTML `loading=lazy`. Le script ne sera donc chargé que si le visiteur scrolle jusqu'au générateur. Les performances de vitesse de votre landing page restent parfaitement optimisées."
                                },
                                {
                                    q: "Comment fonctionne techniquement l'analyse de visibilité IA ?",
                                    a: "L'outil vérifie en temps réel le fichier robots.txt du nom de domaine analysé. Il teste les accès des 8 grands crawlers d'intelligence artificielle (GPTBot, ChatGPT-User, Claude-Web, PerplexityBot, etc.). De plus, il scanne le balisage sémantique et la structure du site pour évaluer si l'information est lisible pour l'IA (Generative Engine Optimization)."
                                },
                                {
                                    q: "Puis-je adapter esthétiquement ce testeur SEO marque blanche à la charte de mon agence de communication ?",
                                    a: "Le design a été conçu pour être premium et neutre. Actuellement, les couleurs internes de l'iframe ne peuvent pas être modifiées, mais son esthétique élégante lui permet de s'adapter facilement à la majorité des agences digitales et studios de développement web. Vous gardez en revanche le contrôle sur la largeur et le positionnement du conteneur."
                                }
                            ].map((item, i) => (
                                <details key={i} className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:border-sauge/30 transition-colors">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-100/50 transition-colors">
                                        <span className="font-semibold text-ink pr-4">{item.q}</span>
                                        <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0" />
                                    </summary>
                                    <div className="px-6 pb-6 text-soft leading-relaxed">
                                        {item.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA - Gradient premium */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-ink via-[#1a2f28] to-ink" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(46,94,78,0.4),transparent_50%)]" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
                        <MessageSquare className="w-10 h-10 text-sauge-light" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                        Des questions sur l&apos;intégration ?
                    </h2>
                    <p className="text-white/60 mb-10 max-w-lg mx-auto text-lg">
                        Je suis disponible pour vous aider à installer le widget ou pour discuter d&apos;un partenariat personnalisé.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-3 bg-white text-ink px-8 py-4 rounded-full font-bold hover:bg-sauge hover:text-white transition-all duration-300 shadow-lg shadow-black/20"
                        >
                            Contactez-moi
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href="#generator"
                            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors px-6 py-3"
                        >
                            <Sparkles className="w-4 h-4" />
                            Générer mon widget
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
