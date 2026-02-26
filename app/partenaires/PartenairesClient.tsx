"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";

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
        <div className="bg-fond-clair">
            {/* Hero */}
            <section className="pt-28 pb-20 bg-ink relative overflow-hidden">
                <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-sauge/10 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sauge/5 rounded-full blur-[180px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-sauge/20 border border-sauge/30 rounded-full text-sauge text-sm font-bold mb-6">
                            <Users className="w-4 h-4" />
                            <span className="uppercase tracking-wider text-xs">Programme Partenaires</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                            Générez des leads SEO<br />
                            <span className="text-sauge">depuis votre site</span>
                        </h1>

                        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                            Intégrez notre Testeur de Visibilité IA sur votre site d&apos;agence.
                            Vos visiteurs testent leur référencement IA, vous recevez leurs coordonnées.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                            <span className="flex items-center gap-2 text-white/60">
                                <CheckCircle2 className="w-4 h-4 text-sauge" />
                                100% gratuit
                            </span>
                            <span className="flex items-center gap-2 text-white/60">
                                <CheckCircle2 className="w-4 h-4 text-sauge" />
                                Prêt en 2 minutes
                            </span>
                            <span className="flex items-center gap-2 text-white/60">
                                <CheckCircle2 className="w-4 h-4 text-sauge" />
                                Lien partenaire inclus
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink text-center mb-4">
                        Pourquoi intégrer ce widget ?
                    </h2>
                    <p className="text-soft text-center mb-12 max-w-2xl mx-auto">
                        Un outil gratuit qui génère des leads qualifiés pour votre agence, sans effort de votre part.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Benefit 1 */}
                        <div className="bg-fond-clair rounded-2xl p-6 border border-line">
                            <div className="w-12 h-12 rounded-xl bg-sauge/10 flex items-center justify-center mb-4">
                                <Bot className="w-6 h-6 text-sauge" />
                            </div>
                            <h3 className="font-bold text-ink text-lg mb-2">Vos visiteurs testent leur site</h3>
                            <p className="text-soft text-sm leading-relaxed">
                                L&apos;outil analyse <strong>8 crawlers IA</strong> (ChatGPT, Perplexity, Claude...)
                                et donne un score de visibilité sur 100. Vos prospects découvrent immédiatement
                                leurs faiblesses SEO.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="bg-fond-clair rounded-2xl p-6 border border-line">
                            <div className="w-12 h-12 rounded-xl bg-sauge/10 flex items-center justify-center mb-4">
                                <Mail className="w-6 h-6 text-sauge" />
                            </div>
                            <h3 className="font-bold text-ink text-lg mb-2">Vous recevez les leads par email</h3>
                            <p className="text-soft text-sm leading-relaxed">
                                Quand un visiteur veut son rapport détaillé, il laisse son email.
                                Vous recevez <strong>instantanément</strong> : l&apos;URL testée, le score obtenu,
                                et l&apos;email du prospect.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="bg-fond-clair rounded-2xl p-6 border border-line">
                            <div className="w-12 h-12 rounded-xl bg-sauge/10 flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-sauge" />
                            </div>
                            <h3 className="font-bold text-ink text-lg mb-2">Zéro maintenance, zéro coût</h3>
                            <p className="text-soft text-sm leading-relaxed">
                                Copiez un code HTML, collez-le sur votre site. C&apos;est tout.
                                On gère <strong>l&apos;hébergement, les mises à jour, et l&apos;envoi des emails</strong>.
                                Vous n&apos;avez rien à maintenir.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats / Social Proof */}
            <section className="py-12 bg-ink">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-1">8</div>
                            <div className="text-white/50 text-sm">Crawlers IA analysés</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-1">30s</div>
                            <div className="text-white/50 text-sm">Temps d&apos;analyse</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
                            <div className="text-white/50 text-sm">Gratuit</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-1">2 min</div>
                            <div className="text-white/50 text-sm">Pour l&apos;installer</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Generator */}
            <section className="py-20 bg-fond-clair" id="generator">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sauge/10 border border-sauge/20 rounded-full text-sauge text-xs font-bold mb-4">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span className="uppercase tracking-wider">Étape 1</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-4">
                                Générez votre widget personnalisé
                            </h2>
                            <p className="text-soft">
                                Entrez l&apos;email où vous souhaitez recevoir les leads.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-line p-6 md:p-8 shadow-sm">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="agency-email" className="block text-sm font-medium text-ink mb-2">
                                        Email de votre agence
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft" />
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
                                            className="w-full pl-12 pr-4 py-4 bg-fond-clair border border-line rounded-xl focus:border-sauge focus:ring-2 focus:ring-sauge/20 transition-all text-ink placeholder-soft text-lg"
                                        />
                                    </div>
                                    {emailError && (
                                        <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                                            <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                            {emailError}
                                        </p>
                                    )}
                                    <p className="text-soft text-xs mt-2">
                                        Cet email recevra les coordonnées de chaque prospect qui demande un rapport.
                                    </p>
                                </div>

                                <button
                                    onClick={generateCode}
                                    className="w-full bg-sauge text-white px-8 py-4 rounded-xl font-bold hover:bg-sauge/90 transition-colors flex items-center justify-center gap-2 text-lg"
                                >
                                    <Code2 className="w-5 h-5" />
                                    Générer mon code HTML
                                </button>
                            </div>

                            {generatedCode && (
                                <div className="mt-8 pt-8 border-t border-line">
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-sm font-medium text-ink">
                                            Votre code HTML
                                        </label>
                                        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                            Prêt à copier
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <textarea
                                            readOnly
                                            value={generatedCode}
                                            className="w-full h-44 p-4 bg-ink text-emerald-400 font-mono text-sm rounded-xl border border-white/10 resize-none focus:outline-none"
                                        />
                                        <button
                                            onClick={copyCode}
                                            className={`absolute top-3 right-3 px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
                                                copied
                                                    ? "bg-emerald-500 text-white"
                                                    : "bg-white text-ink hover:bg-gray-100"
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
                <section className="py-20 bg-white border-t border-line">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sauge/10 border border-sauge/20 rounded-full text-sauge text-xs font-bold mb-4">
                                    <Globe className="w-3.5 h-3.5" />
                                    <span className="uppercase tracking-wider">Aperçu</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-4">
                                    Voici ce que verront vos visiteurs
                                </h2>
                                <p className="text-soft">
                                    Le widget s&apos;adapte automatiquement à la largeur de votre page.
                                </p>
                            </div>

                            <div className="bg-fond-clair rounded-2xl p-4 md:p-6 border border-line">
                                <iframe
                                    src={`/widget/testeur-ia?email=${encodeURIComponent(email)}`}
                                    width="100%"
                                    height="700"
                                    style={{ border: "none", borderRadius: "12px", background: "white" }}
                                    loading="lazy"
                                />
                                <p className="text-right text-[11px] text-soft mt-2 opacity-60">
                                    Propulsé par IndHack
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Installation Steps */}
            <section className="py-20 bg-fond-clair border-t border-line">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sauge/10 border border-sauge/20 rounded-full text-sauge text-xs font-bold mb-4">
                                <Clock className="w-3.5 h-3.5" />
                                <span className="uppercase tracking-wider">Installation</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-4">
                                Comment installer le widget
                            </h2>
                            <p className="text-soft">
                                3 étapes simples, moins de 2 minutes.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Step 1 */}
                            <div className="bg-white rounded-2xl p-6 border border-line relative">
                                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-sauge text-white flex items-center justify-center font-bold text-lg shadow-lg">
                                    1
                                </div>
                                <div className="pt-4">
                                    <h3 className="font-bold text-ink text-lg mb-2">Générez votre code</h3>
                                    <p className="text-soft text-sm leading-relaxed mb-4">
                                        Entrez l&apos;email de votre agence dans le formulaire ci-dessus et cliquez sur &quot;Générer&quot;.
                                    </p>
                                    <div className="bg-fond-clair rounded-lg p-3 text-xs text-soft">
                                        <span className="font-medium text-ink">Conseil :</span> Utilisez une adresse email dédiée aux leads (ex: leads@agence.fr)
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-white rounded-2xl p-6 border border-line relative">
                                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-sauge text-white flex items-center justify-center font-bold text-lg shadow-lg">
                                    2
                                </div>
                                <div className="pt-4">
                                    <h3 className="font-bold text-ink text-lg mb-2">Collez sur votre site</h3>
                                    <p className="text-soft text-sm leading-relaxed mb-4">
                                        Copiez le code HTML et intégrez-le sur une page de votre site.
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-soft">
                                            <CheckCircle2 className="w-4 h-4 text-sauge flex-shrink-0" />
                                            <span><strong className="text-ink">WordPress</strong> : Bloc HTML personnalisé</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-soft">
                                            <CheckCircle2 className="w-4 h-4 text-sauge flex-shrink-0" />
                                            <span><strong className="text-ink">Webflow</strong> : Composant Embed</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-soft">
                                            <CheckCircle2 className="w-4 h-4 text-sauge flex-shrink-0" />
                                            <span><strong className="text-ink">Shopify</strong> : Section HTML</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-soft">
                                            <CheckCircle2 className="w-4 h-4 text-sauge flex-shrink-0" />
                                            <span><strong className="text-ink">Wix</strong> : Élément HTML iframe</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-white rounded-2xl p-6 border border-line relative">
                                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-sauge text-white flex items-center justify-center font-bold text-lg shadow-lg">
                                    3
                                </div>
                                <div className="pt-4">
                                    <h3 className="font-bold text-ink text-lg mb-2">Recevez vos leads</h3>
                                    <p className="text-soft text-sm leading-relaxed mb-4">
                                        Chaque fois qu&apos;un visiteur teste son site et demande le rapport, vous recevez un email avec :
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-soft">
                                            <TrendingUp className="w-4 h-4 text-sauge flex-shrink-0" />
                                            <span>L&apos;URL du site testé</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-soft">
                                            <TrendingUp className="w-4 h-4 text-sauge flex-shrink-0" />
                                            <span>Le score de visibilité IA</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-soft">
                                            <TrendingUp className="w-4 h-4 text-sauge flex-shrink-0" />
                                            <span>L&apos;email du prospect</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What's in it for IndHack */}
            <section className="py-16 bg-white border-t border-line">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-xl font-heading font-bold text-ink text-center mb-8">
                            En échange, qu&apos;est-ce qu&apos;IndHack y gagne ?
                        </h2>
                        <div className="bg-fond-clair rounded-2xl p-6 border border-line">
                            <p className="text-soft leading-relaxed">
                                Le code inclut un petit lien <strong className="text-ink">&quot;Propulsé par IndHack&quot;</strong> en bas du widget.
                                Ce lien <code className="bg-white px-1.5 py-0.5 rounded text-sauge text-sm">rel=&quot;dofollow&quot;</code> nous
                                aide à améliorer notre référencement. C&apos;est un échange gagnant-gagnant :
                                vous obtenez un outil de génération de leads gratuit, et nous obtenons un backlink de qualité.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-fond-clair border-t border-line">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sauge/10 border border-sauge/20 rounded-full text-sauge text-xs font-bold mb-4">
                                <HelpCircle className="w-3.5 h-3.5" />
                                <span className="uppercase tracking-wider">FAQ</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-4">
                                Questions fréquentes
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <details className="group bg-white rounded-xl border border-line overflow-hidden">
                                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
                                    <span className="font-medium text-ink pr-4">Est-ce vraiment 100% gratuit ?</span>
                                    <ChevronDown className="w-5 h-5 text-soft group-open:rotate-180 transition-transform flex-shrink-0" />
                                </summary>
                                <div className="px-5 pb-5 text-soft text-sm leading-relaxed">
                                    Oui, le widget est entièrement gratuit. Pas de frais cachés, pas d&apos;abonnement. En échange, un petit lien &quot;Propulsé par IndHack&quot; apparaît sous le widget, ce qui nous aide pour notre référencement.
                                </div>
                            </details>

                            <details className="group bg-white rounded-xl border border-line overflow-hidden">
                                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
                                    <span className="font-medium text-ink pr-4">Combien de leads puis-je espérer par mois ?</span>
                                    <ChevronDown className="w-5 h-5 text-soft group-open:rotate-180 transition-transform flex-shrink-0" />
                                </summary>
                                <div className="px-5 pb-5 text-soft text-sm leading-relaxed">
                                    Cela dépend de votre trafic. En moyenne, 5 à 15% des visiteurs qui utilisent l&apos;outil laissent leur email pour recevoir un rapport détaillé. Sur un site avec 1 000 visiteurs/mois sur la page du widget, vous pouvez espérer 50 à 150 leads qualifiés.
                                </div>
                            </details>

                            <details className="group bg-white rounded-xl border border-line overflow-hidden">
                                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
                                    <span className="font-medium text-ink pr-4">Le widget ralentit-il mon site ?</span>
                                    <ChevronDown className="w-5 h-5 text-soft group-open:rotate-180 transition-transform flex-shrink-0" />
                                </summary>
                                <div className="px-5 pb-5 text-soft text-sm leading-relaxed">
                                    Non. Le widget se charge via une iframe avec l&apos;attribut <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">loading=&quot;lazy&quot;</code>, ce qui signifie qu&apos;il ne se charge que lorsque l&apos;utilisateur scrolle jusqu&apos;à lui. Il n&apos;impacte pas votre Core Web Vitals.
                                </div>
                            </details>

                            <details className="group bg-white rounded-xl border border-line overflow-hidden">
                                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
                                    <span className="font-medium text-ink pr-4">Puis-je personnaliser l&apos;apparence du widget ?</span>
                                    <ChevronDown className="w-5 h-5 text-soft group-open:rotate-180 transition-transform flex-shrink-0" />
                                </summary>
                                <div className="px-5 pb-5 text-soft text-sm leading-relaxed">
                                    Le widget a un design neutre qui s&apos;intègre bien sur la plupart des sites. Pour l&apos;instant, la personnalisation des couleurs n&apos;est pas disponible, mais vous pouvez ajuster la largeur maximale et le style du conteneur via le code HTML.
                                </div>
                            </details>

                            <details className="group bg-white rounded-xl border border-line overflow-hidden">
                                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
                                    <span className="font-medium text-ink pr-4">Comment fonctionne l&apos;analyse de visibilité IA ?</span>
                                    <ChevronDown className="w-5 h-5 text-soft group-open:rotate-180 transition-transform flex-shrink-0" />
                                </summary>
                                <div className="px-5 pb-5 text-soft text-sm leading-relaxed">
                                    L&apos;outil analyse le fichier robots.txt du site testé pour vérifier s&apos;il autorise les 8 principaux crawlers IA (GPTBot, ChatGPT-User, Claude-Web, PerplexityBot, etc.). Il évalue également la structure sémantique, les signaux E-E-A-T et le format du contenu pour calculer un score de visibilité sur 100.
                                </div>
                            </details>

                            <details className="group bg-white rounded-xl border border-line overflow-hidden">
                                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
                                    <span className="font-medium text-ink pr-4">C&apos;est compatible avec quel CMS ?</span>
                                    <ChevronDown className="w-5 h-5 text-soft group-open:rotate-180 transition-transform flex-shrink-0" />
                                </summary>
                                <div className="px-5 pb-5 text-soft text-sm leading-relaxed">
                                    Le widget fonctionne avec tous les CMS et constructeurs de sites : WordPress, Webflow, Shopify, Wix, Squarespace, Framer, ou même un site HTML statique. Il suffit de pouvoir coller du code HTML.
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-ink">
                <div className="container mx-auto px-4 text-center">
                    <MessageSquare className="w-14 h-14 text-sauge mx-auto mb-6" />
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                        Des questions sur l&apos;intégration ?
                    </h2>
                    <p className="text-white/60 mb-8 max-w-lg mx-auto">
                        Je suis disponible pour vous aider à installer le widget ou pour discuter d&apos;un partenariat personnalisé.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white text-ink px-8 py-4 rounded-full font-bold hover:bg-sauge hover:text-white transition-all"
                        >
                            Contactez-moi
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a
                            href="#generator"
                            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                        >
                            <ArrowRight className="w-4 h-4 rotate-[-90deg]" />
                            Générer mon widget
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
