"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Shield,
    FileText,
    Award,
    Layout,
    CheckCircle2,
    XCircle,
    MinusCircle,
    ArrowRight,
    Copy,
    Check,
    Linkedin,
    Code2,
    Zap,
    ExternalLink,
    Clock,
} from "lucide-react";
import type { RapportData } from "@/lib/rapports";

const LEVEL_CONFIG = {
    invisible: { color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30", label: "Invisible" },
    partial: { color: "text-amber-400", bg: "bg-amber-500/20", border: "border-amber-500/30", label: "Partiel" },
    visible: { color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30", label: "Visible" },
    excellent: { color: "text-sauge", bg: "bg-sauge/20", border: "border-sauge/30", label: "Excellent" },
};

const CATEGORY_META = [
    { key: "accessibilite" as const, label: "Accessibilité IA", icon: Shield },
    { key: "semantique" as const, label: "Richesse Sémantique", icon: FileText },
    { key: "eeat" as const, label: "Signaux E-E-A-T", icon: Award },
    { key: "format" as const, label: "Format IA-Friendly", icon: Layout },
];

function ScoreRing({ score, size = 160 }: { score: number; size?: number }) {
    const radius = (size - 16) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const color = score <= 30 ? "#ef4444" : score <= 60 ? "#f59e0b" : score <= 85 ? "#10b981" : "#638576";

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    className="text-5xl font-black text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                >
                    {score}
                </motion.span>
                <span className="text-soft-light text-sm">/100</span>
            </div>
        </div>
    );
}

export default function RapportClient({ rapport }: { rapport: RapportData }) {
    const [copiedBadge, setCopiedBadge] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);
    const levelCfg = LEVEL_CONFIG[rapport.level];
    const testedDate = new Date(rapport.updatedAt).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const badgeHtml = `<a href="https://indhack.com/rapport/${rapport.domain}" target="_blank" rel="noopener"><img src="https://indhack.com/api/badge/${rapport.domain}" alt="GEO Score ${rapport.score}/100 - ${rapport.domain}" width="200" height="40" /></a>`;
    const reportUrl = `https://indhack.com/rapport/${rapport.domain}`;

    const copyBadge = () => {
        navigator.clipboard.writeText(badgeHtml);
        setCopiedBadge(true);
        setTimeout(() => setCopiedBadge(false), 2500);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(reportUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
    };

    const shareLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(reportUrl)}`,
            "_blank",
            "width=600,height=600"
        );
    };

    const shareTwitter = () => {
        const text = `Notre GEO Score est de ${rapport.score}/100 ! Testez votre visibilité IA gratuitement →`;
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(reportUrl)}`,
            "_blank",
            "width=600,height=400"
        );
    };

    const allowedCrawlers = rapport.crawlers.filter((c) => c.status === "allowed").length;
    const blockedCrawlers = rapport.crawlers.filter((c) => c.status === "blocked").length;

    return (
        <div className="min-h-screen bg-fond-sombre text-white">
            {/* Header bar */}
            <div className="border-b border-white/10 bg-fond-card/50 backdrop-blur-xl">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/" className="text-sm font-bold text-sauge hover:text-sauge-light transition-colors">
                        IndHack
                    </Link>
                    <Link
                        href="/outils/testeur-visibilite-ia"
                        className="text-sm text-soft-light hover:text-white flex items-center gap-1 transition-colors"
                    >
                        Tester mon site
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Main Score Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-fond-card/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-12 mb-8"
                >
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        <ScoreRing score={rapport.score} />
                        <div className="flex-1 text-center md:text-left">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-3 ${levelCfg.bg} ${levelCfg.color} border ${levelCfg.border}`}>
                                {rapport.levelLabel}
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                GEO Score de {rapport.domain}
                            </h1>
                            <p className="text-soft-light mb-4">
                                Rapport de visibilité IA — testé le {testedDate}
                            </p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                <span className="px-2.5 py-1 bg-white/5 rounded-lg text-xs text-soft-light border border-white/10">
                                    {rapport.wordCount} mots
                                </span>
                                <span className="px-2.5 py-1 bg-white/5 rounded-lg text-xs text-soft-light border border-white/10">
                                    {rapport.responseTime}ms
                                </span>
                                {rapport.hasLlmsTxt && (
                                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium border border-emerald-500/20">
                                        llms.txt
                                    </span>
                                )}
                                <span className="px-2.5 py-1 bg-white/5 rounded-lg text-xs text-soft-light border border-white/10">
                                    {allowedCrawlers}/8 crawlers autorisés
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Categories Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="grid sm:grid-cols-2 gap-4 mb-8"
                >
                    {CATEGORY_META.map((cat) => {
                        const data = rapport.categories[cat.key];
                        const pct = Math.round((data.score / data.maxScore) * 100);
                        const Icon = cat.icon;
                        const barColor = pct >= 70 ? "bg-emerald-500" : pct >= 40 ? "bg-amber-500" : "bg-red-500";
                        const textColor = pct >= 70 ? "text-emerald-400" : pct >= 40 ? "text-amber-400" : "text-red-400";

                        return (
                            <div
                                key={cat.key}
                                className="bg-fond-card/40 rounded-xl border border-white/10 p-5 hover:border-white/20 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                                        <Icon className="w-4 h-4 text-soft-light" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-white">{cat.label}</span>
                                            <span className={`text-sm font-bold ${textColor}`}>
                                                {data.score}/{data.maxScore}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full rounded-full ${barColor}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${pct}%` }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Crawlers */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="bg-fond-card/40 rounded-xl border border-white/10 p-6 mb-8"
                >
                    <h2 className="font-bold text-white mb-4">Crawlers IA ({allowedCrawlers} autorisés, {blockedCrawlers} bloqués)</h2>
                    <div className="grid sm:grid-cols-2 gap-2">
                        {rapport.crawlers.map((crawler) => {
                            const icon =
                                crawler.status === "allowed" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> :
                                crawler.status === "blocked" ? <XCircle className="w-4 h-4 text-red-400" /> :
                                <MinusCircle className="w-4 h-4 text-soft-light/50" />;
                            const bg =
                                crawler.status === "allowed" ? "bg-emerald-500/5 border-emerald-500/15" :
                                crawler.status === "blocked" ? "bg-red-500/5 border-red-500/15" :
                                "bg-white/[0.02] border-white/5";
                            return (
                                <div key={crawler.name} className={`flex items-center justify-between p-2.5 rounded-lg border ${bg}`}>
                                    <div className="flex items-center gap-2">
                                        {icon}
                                        <span className="text-sm text-white">{crawler.name}</span>
                                    </div>
                                    <span className="text-xs text-soft-light/60">{crawler.company}</span>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Recommendations */}
                {rapport.recommendations.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="bg-fond-card/40 rounded-xl border border-white/10 p-6 mb-8"
                    >
                        <h2 className="font-bold text-white mb-4">Recommandations</h2>
                        <div className="space-y-2">
                            {rapport.recommendations.slice(0, 5).map((rec, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-lg border border-white/5">
                                    <span className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-xs font-bold text-soft-light flex-shrink-0">
                                        {i + 1}
                                    </span>
                                    <p className="text-sm text-soft-light">{rec}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Badge Embed Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="bg-gradient-to-br from-sauge/10 to-transparent rounded-2xl border border-sauge/20 p-6 md:p-8 mb-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-sauge/20 rounded-lg">
                            <Code2 className="w-5 h-5 text-sauge-light" />
                        </div>
                        <div>
                            <h2 className="font-bold text-white">Affichez votre GEO Score</h2>
                            <p className="text-sm text-soft-light">Collez ce badge sur votre site pour montrer votre score</p>
                        </div>
                    </div>

                    {/* Badge Preview */}
                    <div className="flex items-center justify-center py-6 mb-4 bg-white/5 rounded-xl border border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={`/api/badge/${rapport.domain}`}
                            alt={`GEO Score ${rapport.score}/100`}
                            width={200}
                            height={40}
                        />
                    </div>

                    {/* Embed Code */}
                    <div className="relative">
                        <pre className="bg-fond-sombre rounded-lg p-4 text-xs text-soft-light/80 overflow-x-auto border border-white/10">
                            <code>{badgeHtml}</code>
                        </pre>
                        <button
                            onClick={copyBadge}
                            className="absolute top-2 right-2 flex items-center gap-1.5 px-3 py-1.5 bg-sauge/20 hover:bg-sauge/30 text-sauge-light rounded-md text-xs font-medium transition-colors border border-sauge/30"
                        >
                            {copiedBadge ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copiedBadge ? "Copié !" : "Copier"}
                        </button>
                    </div>
                </motion.div>

                {/* Share & Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="flex flex-wrap items-center justify-center gap-3 mb-12"
                >
                    <button
                        onClick={shareLinkedIn}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#0077B5] hover:bg-[#006097] rounded-xl text-sm font-medium text-white transition-colors"
                    >
                        <Linkedin className="w-4 h-4" />
                        Partager sur LinkedIn
                    </button>
                    <button
                        onClick={shareTwitter}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 rounded-xl text-sm font-medium text-white transition-colors border border-white/10"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        Partager sur X
                    </button>
                    <button
                        onClick={copyLink}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 rounded-xl text-sm font-medium text-white transition-colors border border-white/10"
                    >
                        {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copiedLink ? "Lien copié !" : "Copier le lien"}
                    </button>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-fond-card/60 rounded-2xl border border-white/10 p-8 md:p-10 text-center"
                >
                    <div className="w-12 h-12 rounded-xl bg-sauge/20 flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-6 h-6 text-sauge-light" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Améliorez votre GEO Score</h2>
                    <p className="text-soft-light mb-6 max-w-md mx-auto">
                        Testez votre propre site gratuitement ou faites-vous accompagner pour optimiser votre visibilité IA.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/outils/testeur-visibilite-ia"
                            className="flex items-center gap-2 bg-white text-ink px-6 py-3 rounded-xl font-bold hover:bg-sauge hover:text-white transition-all"
                        >
                            Tester mon site gratuitement
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/contact"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-soft-light hover:text-white border border-white/10 hover:border-white/20 transition-all"
                        >
                            Demander un audit GEO
                        </Link>
                    </div>
                </motion.div>

                {/* Footer */}
                <div className="text-center mt-8 text-xs text-soft-light/40">
                    Rapport généré par{" "}
                    <Link href="/outils/testeur-visibilite-ia" className="text-sauge/60 hover:text-sauge transition-colors">
                        IndHack GEO Score
                    </Link>{" "}
                    — L&apos;outil gratuit de visibilité IA
                </div>
            </div>
        </div>
    );
}
