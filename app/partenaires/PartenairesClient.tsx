"use client";

import { useState, useMemo } from "react";
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
    Palette,
    Type,
    Moon,
    Sun,
    Eye,
    RotateCcw,
    Send,
    FileDown,
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

const COLOR_PRESETS = [
    { name: "Sauge", primary: "#2E5E4E", button: "#2E5E4E" },
    { name: "Bleu", primary: "#2563EB", button: "#2563EB" },
    { name: "Violet", primary: "#7C3AED", button: "#7C3AED" },
    { name: "Rouge", primary: "#DC2626", button: "#DC2626" },
    { name: "Orange", primary: "#EA580C", button: "#EA580C" },
    { name: "Rose", primary: "#DB2777", button: "#DB2777" },
    { name: "Noir", primary: "#18181B", button: "#18181B" },
    { name: "Cyan", primary: "#0891B2", button: "#0891B2" },
];

// Mini-preview component that renders a fake widget UI with live theme
function WidgetMiniPreview({
    primaryColor,
    buttonColor,
    buttonText,
    borderRadius,
    darkMode,
}: {
    primaryColor: string;
    buttonColor: string;
    buttonText: string;
    borderRadius: string;
    darkMode: boolean;
}) {
    const bg = darkMode ? "#1a1a2e" : "#FAFBFA";
    const cardBg = darkMode ? "#252547" : "#ffffff";
    const textColor = darkMode ? "#e2e8f0" : "#2A3830";
    const mutedText = darkMode ? "#94a3b8" : "#6b7280";
    const borderColor = darkMode ? "#374151" : "#e5e7eb";
    const rad = `${borderRadius}px`;
    const accentBg = `${primaryColor}12`;

    return (
        <div
            className="w-full transition-all duration-300"
            style={{
                backgroundColor: bg,
                borderRadius: rad,
                padding: "16px",
                border: `1px solid ${borderColor}`,
            }}
        >
            {/* Badge + Title compact */}
            <div className="flex items-center gap-2 mb-2.5">
                <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: accentBg }}
                >
                    <Bot className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                </div>
                <div className="min-w-0">
                    <h3
                        className="font-bold text-[13px] leading-tight"
                        style={{ color: textColor }}
                    >
                        Visible par <span style={{ color: primaryColor }}>ChatGPT</span> ?
                    </h3>
                    <p className="text-[9px] leading-tight" style={{ color: mutedText }}>
                        Analysez 8 crawlers IA en 30s
                    </p>
                </div>
            </div>

            {/* Input + Button compact */}
            <div
                className="flex items-center gap-1.5 p-1"
                style={{
                    backgroundColor: cardBg,
                    borderRadius: rad,
                    border: `1px solid ${borderColor}`,
                }}
            >
                <input
                    type="text"
                    readOnly
                    value="https://votre-site.com"
                    className="flex-1 text-[11px] px-2.5 py-2 bg-transparent outline-none min-w-0"
                    style={{ color: mutedText }}
                />
                <button
                    className="flex items-center gap-1 px-3 py-2 text-white text-[11px] font-semibold whitespace-nowrap flex-shrink-0"
                    style={{
                        backgroundColor: buttonColor,
                        borderRadius: `${Math.max(0, parseInt(borderRadius) - 3)}px`,
                    }}
                >
                    <Zap className="w-3 h-3" />
                    {buttonText}
                </button>
            </div>

            {/* Mock score result - adds visual appeal */}
            <div
                className="mt-2.5 p-2.5 rounded-lg"
                style={{ backgroundColor: accentBg, border: `1px solid ${primaryColor}20` }}
            >
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: primaryColor }}>
                        Score visibilité IA
                    </span>
                    <span className="text-[13px] font-bold" style={{ color: primaryColor }}>
                        72/100
                    </span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: `${primaryColor}20` }}>
                    <div
                        className="h-full rounded-full transition-all"
                        style={{ width: "72%", backgroundColor: primaryColor }}
                    />
                </div>
                {/* Mini crawler results */}
                <div className="flex items-center gap-1.5 mt-2">
                    {["GPT", "Claude", "Perplexity", "Gemini"].map((name) => (
                        <div
                            key={name}
                            className="flex-1 text-center py-0.5 rounded text-[7px] font-medium"
                            style={{ backgroundColor: cardBg, color: mutedText, border: `1px solid ${borderColor}` }}
                        >
                            {name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Backlink */}
            <div className="flex justify-center mt-2">
                <span
                    className="text-[8px] flex items-center gap-1"
                    style={{ color: darkMode ? "#555" : "#c0c0c0" }}
                >
                    Propulsé par IndHack
                </span>
            </div>
        </div>
    );
}

export function PartenairesClient() {
    const [email, setEmail] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [copied, setCopied] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [showPreview, setShowPreview] = useState(false);

    // Customization state
    const [primaryColor, setPrimaryColor] = useState("#2E5E4E");
    const [buttonColor, setButtonColor] = useState("#2E5E4E");
    const [buttonText, setButtonText] = useState("Tester");
    const [borderRadius, setBorderRadius] = useState("12");
    const [darkMode, setDarkMode] = useState(false);

    // Contact form state
    const [contactForm, setContactForm] = useState({ name: "", contactEmail: "", website: "", message: "" });
    const [contactSubmitted, setContactSubmitted] = useState(false);
    const [contactLoading, setContactLoading] = useState(false);
    const [contactError, setContactError] = useState("");

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setContactLoading(true);
        setContactError("");
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: "dbf0dae2-86ac-495e-a670-c4fc028ce036",
                    subject: `🤝 Question partenaire - ${contactForm.name}`,
                    from_name: contactForm.name,
                    replyto: contactForm.contactEmail,
                    Nom: contactForm.name,
                    Email: contactForm.contactEmail,
                    Site_Web: contactForm.website || "Non renseigné",
                    Message: contactForm.message,
                    Source: "Page Partenaires",
                }),
            });
            const data = await res.json();
            if (data.success) {
                setContactSubmitted(true);
                setContactForm({ name: "", contactEmail: "", website: "", message: "" });
            } else {
                setContactError("Erreur lors de l'envoi. Réessayez ou écrivez-moi à contact@indhack.com");
            }
        } catch {
            setContactError("Erreur de connexion. Écrivez-moi à contact@indhack.com");
        } finally {
            setContactLoading(false);
        }
    };

    const isDefault = primaryColor === "#2E5E4E" && buttonColor === "#2E5E4E" && buttonText === "Tester" && borderRadius === "12" && !darkMode;

    const resetCustomization = () => {
        setPrimaryColor("#2E5E4E");
        setButtonColor("#2E5E4E");
        setButtonText("Tester");
        setBorderRadius("12");
        setDarkMode(false);
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const buildIframeUrl = () => {
        const params = new URLSearchParams();
        if (email.trim()) params.set("email", email.trim());
        if (primaryColor !== "#2E5E4E") params.set("color", primaryColor.replace("#", ""));
        if (buttonColor !== "#2E5E4E") params.set("btn", buttonColor.replace("#", ""));
        if (buttonText !== "Tester") params.set("btnText", buttonText);
        if (borderRadius !== "12") params.set("radius", borderRadius);
        if (darkMode) params.set("dark", "1");
        return `https://indhack.com/widget/testeur-ia?${params.toString()}`;
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
        const iframeUrl = buildIframeUrl();
        const bg = darkMode ? "background:#1a1a2e;" : "";
        const rad = `border-radius:${borderRadius}px;`;

        const code = `<div style="max-width:700px;margin:0 auto;${bg}">
  <iframe id="indhack-widget" src="${iframeUrl}" width="100%" height="400" style="border:none;${rad}box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1);transition:height 0.3s ease;" loading="lazy"></iframe>
  <p style="text-align:right;font-size:11px;margin-top:4px;opacity:0.6;">
    <a href="https://indhack.com/outils/testeur-visibilite-ia" target="_blank" rel="dofollow" style="color:inherit;text-decoration:none;">${randomAnchor}</a>
  </p>
</div>
<script>window.addEventListener("message",function(e){if(e.data&&e.data.type==="indhack-widget-resize"){document.getElementById("indhack-widget").style.height=e.data.height+"px";}});</script>`;

        setGeneratedCode(code);
        setShowPreview(true);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(generatedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Memoize preview URL for iframe
    const previewIframeUrl = useMemo(() => {
        return buildIframeUrl().replace("https://indhack.com", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, primaryColor, buttonColor, buttonText, borderRadius, darkMode]);

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

            {/* ═══════════════════════════════════════════════════════════
                GENERATOR + LIVE PREVIEW — Side by side on desktop
                ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-gradient-to-b from-white to-gray-50" id="generator">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-sauge/10 rounded-full text-sauge text-sm font-semibold mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span>Personnalisez et générez</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
                            Créez votre widget sur-mesure
                        </h2>
                        <p className="text-soft text-lg max-w-2xl mx-auto">
                            Personnalisez les couleurs, le bouton et le style pour l&apos;adapter à votre charte graphique.
                            L&apos;aperçu se met à jour en temps réel.
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8 items-start">
                        {/* LEFT: Configuration panel (3 cols) */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Email card */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-8 h-8 bg-sauge text-white rounded-lg flex items-center justify-center text-sm font-bold">1</div>
                                    <h3 className="font-bold text-ink text-lg">Votre email de réception</h3>
                                </div>
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
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-sauge focus:bg-white focus:ring-4 focus:ring-sauge/10 transition-all text-ink placeholder-gray-400"
                                    />
                                </div>
                                {emailError && (
                                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                        {emailError}
                                    </p>
                                )}
                                <p className="text-gray-400 text-xs mt-2">
                                    Chaque prospect qui demande un rapport vous sera envoyé à cette adresse.
                                </p>
                            </div>

                            {/* Customization card */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-sauge text-white rounded-lg flex items-center justify-center text-sm font-bold">2</div>
                                        <h3 className="font-bold text-ink text-lg">Personnalisation</h3>
                                    </div>
                                    {!isDefault && (
                                        <button
                                            onClick={resetCustomization}
                                            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-sauge transition-colors"
                                        >
                                            <RotateCcw className="w-3 h-3" />
                                            Réinitialiser
                                        </button>
                                    )}
                                </div>

                                {/* Color presets */}
                                <div className="mb-6">
                                    <label className="block text-xs font-semibold text-soft uppercase tracking-wider mb-3">
                                        Thèmes rapides
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {COLOR_PRESETS.map((preset) => (
                                            <button
                                                key={preset.name}
                                                onClick={() => {
                                                    setPrimaryColor(preset.primary);
                                                    setButtonColor(preset.button);
                                                }}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-200 ${
                                                    primaryColor === preset.primary
                                                        ? "border-gray-900 bg-gray-50 text-ink shadow-sm scale-105"
                                                        : "border-gray-200 text-soft hover:border-gray-300 hover:bg-gray-50"
                                                }`}
                                            >
                                                <div
                                                    className="w-4 h-4 rounded-full ring-1 ring-black/10"
                                                    style={{ backgroundColor: preset.primary }}
                                                />
                                                {preset.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom colors */}
                                <div className="grid grid-cols-2 gap-4 mb-5">
                                    <div>
                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-soft uppercase tracking-wider mb-2">
                                            <Palette className="w-3 h-3" />
                                            Couleur principale
                                        </label>
                                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2 border border-gray-200">
                                            <input
                                                type="color"
                                                value={primaryColor}
                                                onChange={(e) => setPrimaryColor(e.target.value)}
                                                className="w-10 h-10 rounded-lg border-0 cursor-pointer bg-transparent"
                                            />
                                            <input
                                                type="text"
                                                value={primaryColor}
                                                onChange={(e) => setPrimaryColor(e.target.value)}
                                                className="flex-1 px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs text-ink font-mono text-center"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-soft uppercase tracking-wider mb-2">
                                            <Palette className="w-3 h-3" />
                                            Couleur du bouton
                                        </label>
                                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2 border border-gray-200">
                                            <input
                                                type="color"
                                                value={buttonColor}
                                                onChange={(e) => setButtonColor(e.target.value)}
                                                className="w-10 h-10 rounded-lg border-0 cursor-pointer bg-transparent"
                                            />
                                            <input
                                                type="text"
                                                value={buttonColor}
                                                onChange={(e) => setButtonColor(e.target.value)}
                                                className="flex-1 px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs text-ink font-mono text-center"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Button text + radius */}
                                <div className="grid grid-cols-2 gap-4 mb-5">
                                    <div>
                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-soft uppercase tracking-wider mb-2">
                                            <Type className="w-3 h-3" />
                                            Texte du bouton
                                        </label>
                                        <input
                                            type="text"
                                            value={buttonText}
                                            onChange={(e) => setButtonText(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-ink focus:border-sauge focus:ring-2 focus:ring-sauge/10 transition-all"
                                            placeholder="Tester"
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-soft uppercase tracking-wider mb-2">
                                            Arrondi des bords
                                        </label>
                                        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                                            <input
                                                type="range"
                                                min="0"
                                                max="24"
                                                value={borderRadius}
                                                onChange={(e) => setBorderRadius(e.target.value)}
                                                className="w-full accent-sauge"
                                            />
                                            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                                                <span>Carré</span>
                                                <span className="font-mono font-bold text-ink">{borderRadius}px</span>
                                                <span>Arrondi</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Dark mode */}
                                <button
                                    type="button"
                                    onClick={() => setDarkMode(!darkMode)}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                                        darkMode
                                            ? "bg-gray-900 border-gray-700"
                                            : "bg-gray-50 border-gray-200 hover:border-gray-300"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {darkMode ? (
                                            <Moon className="w-5 h-5 text-indigo-400" />
                                        ) : (
                                            <Sun className="w-5 h-5 text-amber-500" />
                                        )}
                                        <div className="text-left">
                                            <span className={`text-sm font-semibold ${darkMode ? "text-white" : "text-ink"}`}>
                                                Mode {darkMode ? "sombre" : "clair"}
                                            </span>
                                            <p className={`text-[11px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                {darkMode ? "Pour les sites avec un fond foncé" : "Thème par défaut pour la plupart des sites"}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
                                            darkMode ? "bg-indigo-500" : "bg-gray-300"
                                        }`}
                                    >
                                        <div
                                            className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                                                darkMode ? "translate-x-5" : "translate-x-0.5"
                                            }`}
                                        />
                                    </div>
                                </button>
                            </div>

                            {/* Generate button */}
                            <button
                                onClick={generateCode}
                                className="w-full bg-gradient-to-r from-sauge to-emerald-600 text-white px-8 py-5 rounded-2xl font-bold hover:shadow-lg hover:shadow-sauge/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 text-lg group"
                            >
                                <Code2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                Générer mon code HTML
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* RIGHT: Live preview (2 cols) — sticky */}
                        <div className="lg:col-span-2 lg:sticky lg:top-24">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                {/* Preview header — compact browser chrome */}
                                <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 bg-gray-50">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-red-400" />
                                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                    </div>
                                    <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-md border border-gray-200 text-[9px] text-gray-400 font-mono">
                                        <Globe className="w-2.5 h-2.5" />
                                        votre-agence.fr/outils
                                    </div>
                                </div>

                                {/* Live widget preview — tight padding */}
                                <div className="p-3">
                                    <WidgetMiniPreview
                                        primaryColor={primaryColor}
                                        buttonColor={buttonColor}
                                        buttonText={buttonText}
                                        borderRadius={borderRadius}
                                        darkMode={darkMode}
                                    />
                                </div>

                                <div className="px-3 pb-2.5 flex items-center justify-center gap-1.5">
                                    <Eye className="w-3 h-3 text-sauge" />
                                    <p className="text-[10px] text-gray-400">
                                        Aperçu en temps réel
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Generated code — full width below */}
                    {generatedCode && (
                        <div className="max-w-6xl mx-auto mt-12">
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">3</div>
                                        <h3 className="font-bold text-ink text-lg">Votre code HTML</h3>
                                    </div>
                                    <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5">
                                        <Lottie animationData={checkAnimation} loop={false} style={{ width: 16, height: 16 }} />
                                        Prêt à copier
                                    </span>
                                </div>
                                <div className="relative group">
                                    <textarea
                                        readOnly
                                        value={generatedCode}
                                        className="w-full h-40 p-5 bg-ink text-emerald-400 font-mono text-sm rounded-xl border-2 border-gray-700 resize-none focus:outline-none focus:border-sauge transition-colors"
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
                        </div>
                    )}
                </div>
            </section>

            {/* Full iframe Preview */}
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

                            <div className="bg-white rounded-2xl p-4 md:p-8 border border-gray-200 shadow-lg" style={darkMode ? { backgroundColor: "#1a1a2e" } : undefined}>
                                <iframe
                                    src={previewIframeUrl}
                                    width="100%"
                                    height="400"
                                    style={{ border: "none", borderRadius: `${borderRadius}px` }}
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
                            <p className="text-soft text-lg mb-4">
                                3 étapes simples, moins de 2 minutes.
                            </p>
                            <a
                                href="/guide-installation-widget-indhack.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-sauge/10 text-sauge rounded-full text-sm font-semibold hover:bg-sauge hover:text-white transition-all duration-300"
                            >
                                <FileDown className="w-4 h-4" />
                                Télécharger le guide PDF par CMS
                            </a>
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
                                    a: "Oui ! Le widget est entièrement personnalisable. Vous pouvez modifier la couleur principale, la couleur du bouton, le texte du CTA, l'arrondi des bords, et même activer un mode sombre pour les sites avec un fond foncé. Toutes ces options sont disponibles directement dans le générateur ci-dessus."
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

            {/* Contact Form Section */}
            <section className="py-24 relative overflow-hidden" id="contact-partenaire">
                <div className="absolute inset-0 bg-gradient-to-br from-ink via-[#1a2f28] to-ink" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(46,94,78,0.4),transparent_50%)]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-10">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                                <MessageSquare className="w-8 h-8 text-sauge-light" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3">
                                Des questions sur l&apos;intégration ?
                            </h2>
                            <p className="text-white/60 text-lg">
                                Je vous aide à installer le widget ou à discuter d&apos;un partenariat personnalisé.
                            </p>
                        </div>

                        {contactSubmitted ? (
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-10 text-center">
                                <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-white mb-2">Message envoyé !</h3>
                                <p className="text-white/60 mb-6">Je reviens vers vous sous 24h. À très vite !</p>
                                <button
                                    onClick={() => setContactSubmitted(false)}
                                    className="text-sm text-sauge-light hover:text-white transition-colors"
                                >
                                    Envoyer un autre message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleContactSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 md:p-8 space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-white/70 mb-1.5">Nom *</label>
                                        <input
                                            required
                                            type="text"
                                            value={contactForm.name}
                                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                            placeholder="Votre nom"
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:border-sauge-light focus:ring-2 focus:ring-sauge/20 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-white/70 mb-1.5">Email *</label>
                                        <input
                                            required
                                            type="email"
                                            value={contactForm.contactEmail}
                                            onChange={(e) => setContactForm({ ...contactForm, contactEmail: e.target.value })}
                                            placeholder="votre@email.com"
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:border-sauge-light focus:ring-2 focus:ring-sauge/20 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-white/70 mb-1.5">Site web</label>
                                    <input
                                        type="url"
                                        value={contactForm.website}
                                        onChange={(e) => setContactForm({ ...contactForm, website: e.target.value })}
                                        placeholder="https://votre-agence.fr"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:border-sauge-light focus:ring-2 focus:ring-sauge/20 transition-all outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-white/70 mb-1.5">Votre question *</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={contactForm.message}
                                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                        placeholder="Besoin d'aide pour l'intégration, question technique, partenariat..."
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:border-sauge-light focus:ring-2 focus:ring-sauge/20 transition-all outline-none resize-none"
                                    />
                                </div>

                                {contactError && (
                                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
                                        {contactError}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={contactLoading}
                                    className="w-full bg-white text-ink px-8 py-4 rounded-xl font-bold hover:bg-sauge hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-base disabled:opacity-50"
                                >
                                    {contactLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                                            Envoi en cours...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Envoyer ma question
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        <div className="flex items-center justify-center gap-6 mt-8">
                            <a
                                href="mailto:contact@indhack.com"
                                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
                            >
                                <Mail className="w-4 h-4" />
                                contact@indhack.com
                            </a>
                            <a
                                href="#generator"
                                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
                            >
                                <Sparkles className="w-4 h-4" />
                                Générer mon widget
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
