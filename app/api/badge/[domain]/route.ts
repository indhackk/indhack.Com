import { NextRequest, NextResponse } from "next/server";
import { sanitizeDomain } from "@/lib/rapports";

// Badge SVG dynamique — embarquable sur n'importe quel site.
//
// IMPORTANT — sécurité : on n'affiche PAS le score dans le badge.
//
// Le stockage des rapports en cache mémoire / /tmp n'est pas durable sur
// Vercel serverless, donc on ne peut pas garantir qu'un score affiché reste
// vérifiable. Et si on l'acceptait via un query param (`?score=68`), n'importe
// qui pourrait embarquer un badge `?score=100` falsifié pointant vers
// indhack.com. On préfère un badge neutre, promotionnel et honnête.
//
// Le badge sert simplement de signal d'expertise : "j'ai testé ma visibilité
// IA chez IndHack". Le visiteur clique le lien parent du badge pour lancer
// son propre test sur le testeur de visibilité IA, où le score sera calculé
// en temps réel.

function generateBadgeSVG(domain: string): string {
    const displayDomain = domain.length > 22 ? domain.slice(0, 22) + "…" : domain;

    return `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="48" viewBox="0 0 240 48" role="img" aria-label="Audit visibilité IA gratuit par IndHack pour ${domain}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1a2e"/>
      <stop offset="100%" stop-color="#16213e"/>
    </linearGradient>
    <clipPath id="rounded">
      <rect width="240" height="48" rx="8"/>
    </clipPath>
  </defs>
  <g clip-path="url(#rounded)">
    <rect width="240" height="48" fill="url(#bg)"/>
    <!-- Pictogramme à gauche -->
    <rect x="0" y="0" width="56" height="48" fill="#638576" opacity="0.18"/>
    <text x="28" y="28" text-anchor="middle" dominant-baseline="central" fill="#9DBCAA" font-family="system-ui,-apple-system,sans-serif" font-size="18" font-weight="800">IA</text>
    <line x1="56" y1="8" x2="56" y2="40" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <!-- Texte principal -->
    <text x="68" y="20" fill="white" font-family="system-ui,-apple-system,sans-serif" font-size="11" font-weight="700">Audit visibilité IA</text>
    <text x="68" y="34" fill="rgba(255,255,255,0.55)" font-family="system-ui,-apple-system,sans-serif" font-size="9">${displayDomain}</text>
    <!-- IndHack à droite -->
    <text x="232" y="20" text-anchor="end" fill="rgba(157,188,170,0.85)" font-family="system-ui,-apple-system,sans-serif" font-size="9" font-weight="700">IndHack</text>
    <text x="232" y="33" text-anchor="end" fill="rgba(255,255,255,0.4)" font-family="system-ui,-apple-system,sans-serif" font-size="7">gratuit</text>
  </g>
</svg>`;
}

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ domain: string }> }
) {
    const { domain } = await params;
    const cleanDomain = sanitizeDomain(decodeURIComponent(domain));

    const svg = generateBadgeSVG(cleanDomain);

    return new NextResponse(svg, {
        headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
            "Access-Control-Allow-Origin": "*",
        },
    });
}
