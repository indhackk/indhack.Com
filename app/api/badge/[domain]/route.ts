import { NextRequest, NextResponse } from "next/server";
import { getRapport, sanitizeDomain } from "@/lib/rapports";

// Badge SVG dynamique — embarquable sur n'importe quel site
// Chaque embed = un backlink vers indhack.com/rapport/[domain]

function getScoreColor(score: number): { bg: string; text: string; bar: string } {
    if (score <= 30) return { bg: "#fef2f2", text: "#dc2626", bar: "#ef4444" };
    if (score <= 60) return { bg: "#fffbeb", text: "#d97706", bar: "#f59e0b" };
    if (score <= 85) return { bg: "#ecfdf5", text: "#059669", bar: "#10b981" };
    return { bg: "#f0fdf4", text: "#047857", bar: "#638576" };
}

function generateBadgeSVG(domain: string, score: number): string {
    const colors = getScoreColor(score);
    const barWidth = Math.round((score / 100) * 120);

    return `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="48" viewBox="0 0 240 48">
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
    <!-- Score section -->
    <rect x="0" y="0" width="64" height="48" fill="${colors.bar}" opacity="0.15"/>
    <text x="32" y="24" text-anchor="middle" dominant-baseline="central" fill="${colors.text}" font-family="system-ui,-apple-system,sans-serif" font-size="18" font-weight="800">${score}</text>
    <text x="32" y="38" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-family="system-ui,-apple-system,sans-serif" font-size="8">/100</text>
    <!-- Divider -->
    <line x1="64" y1="8" x2="64" y2="40" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <!-- Info section -->
    <text x="76" y="17" fill="white" font-family="system-ui,-apple-system,sans-serif" font-size="10" font-weight="600">GEO Score</text>
    <text x="76" y="30" fill="rgba(255,255,255,0.5)" font-family="system-ui,-apple-system,sans-serif" font-size="8">${domain.length > 22 ? domain.slice(0, 22) + "…" : domain}</text>
    <!-- Progress bar -->
    <rect x="76" y="36" width="120" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
    <rect x="76" y="36" width="${barWidth}" height="4" rx="2" fill="${colors.bar}"/>
    <!-- IndHack branding -->
    <text x="200" y="17" text-anchor="middle" fill="rgba(99,133,118,0.7)" font-family="system-ui,-apple-system,sans-serif" font-size="7" font-weight="600">IndHack</text>
  </g>
</svg>`;
}

function generateNotFoundSVG(): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="48" viewBox="0 0 240 48">
  <rect width="240" height="48" rx="8" fill="#1a1a2e"/>
  <text x="120" y="20" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-family="system-ui,-apple-system,sans-serif" font-size="10" font-weight="600">GEO Score non disponible</text>
  <text x="120" y="34" text-anchor="middle" fill="rgba(99,133,118,0.7)" font-family="system-ui,-apple-system,sans-serif" font-size="9">Testez sur indhack.com</text>
</svg>`;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ domain: string }> }
) {
    const { domain } = await params;
    const cleanDomain = sanitizeDomain(decodeURIComponent(domain));
    const rapport = getRapport(cleanDomain);

    const svg = rapport
        ? generateBadgeSVG(cleanDomain, rapport.score)
        : generateNotFoundSVG();

    return new NextResponse(svg, {
        headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
            "Access-Control-Allow-Origin": "*",
        },
    });
}
