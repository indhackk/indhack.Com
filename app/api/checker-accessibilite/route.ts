import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

// Rate limiting and cache
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const cacheMap = new Map<string, { data: AccessibilityResult; expiry: number }>();

const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const CACHE_TTL = 24 * 60 * 60 * 1000;

interface CriteriaResult {
    id: string;
    name: string;
    category: "images" | "structure" | "navigation" | "formulaires" | "semantique";
    status: "success" | "warning" | "error";
    score: number;
    maxScore: number;
    message: string;
    details?: string;
    fix?: string;
    wcagLevel: "A" | "AA" | "AAA";
    rgaaRef?: string;
}

interface AccessibilityResult {
    url: string;
    timestamp: string;
    score: number;
    maxScore: number;
    conformityLevel: "Non conforme" | "Partiellement conforme" | "Conforme";
    conformityPercentage: number;
    categories: {
        images: { score: number; maxScore: number; errors: number };
        structure: { score: number; maxScore: number; errors: number };
        navigation: { score: number; maxScore: number; errors: number };
        formulaires: { score: number; maxScore: number; errors: number };
        semantique: { score: number; maxScore: number; errors: number };
    };
    criteria: CriteriaResult[];
    summary: {
        errors: number;
        warnings: number;
        passed: number;
    };
    pageTitle: string;
    cached?: boolean;
}

// Bad link texts that are not descriptive
const BAD_LINK_TEXTS = [
    "cliquez ici",
    "click here",
    "ici",
    "here",
    "lire la suite",
    "read more",
    "en savoir plus",
    "learn more",
    "plus",
    "more",
    "lien",
    "link",
    "voir",
    "see",
];

function getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);
    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }
    if (record.count >= RATE_LIMIT) return false;
    record.count++;
    return true;
}

function getCachedResult(url: string): AccessibilityResult | null {
    const cached = cacheMap.get(url);
    if (cached && Date.now() < cached.expiry) return cached.data;
    cacheMap.delete(url);
    return null;
}

function setCachedResult(url: string, data: AccessibilityResult): void {
    cacheMap.set(url, { data, expiry: Date.now() + CACHE_TTL });
}

async function fetchWithTimeout(url: string, timeout = 10000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                "User-Agent": "INDHACK-Accessibility-Checker/1.0 (+https://indhack.com/outils/checker-accessibilite)",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            },
            redirect: "follow",
        });
        clearTimeout(timeoutId);
        return response;
    } catch {
        clearTimeout(timeoutId);
        throw new Error("Timeout ou erreur de connexion");
    }
}

async function analyzeAccessibility(url: string): Promise<AccessibilityResult> {
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
        normalizedUrl = "https://" + normalizedUrl;
    }

    const response = await fetchWithTimeout(normalizedUrl);
    const html = await response.text();
    const $ = cheerio.load(html);
    const pageTitle = $("title").text().trim() || "Sans titre";

    const criteria: CriteriaResult[] = [];
    const categories: AccessibilityResult["categories"] = {
        images: { score: 0, maxScore: 0, errors: 0 },
        structure: { score: 0, maxScore: 0, errors: 0 },
        navigation: { score: 0, maxScore: 0, errors: 0 },
        formulaires: { score: 0, maxScore: 0, errors: 0 },
        semantique: { score: 0, maxScore: 0, errors: 0 },
    };

    // ========== 1. IMAGES - Alt attributes ==========
    const images = $("img");
    let imagesWithoutAlt = 0;
    let decorativeImages = 0;
    let totalContentImages = 0;

    images.each((_, el) => {
        const $img = $(el);
        const width = parseInt($img.attr("width") || "100", 10);
        const height = parseInt($img.attr("height") || "100", 10);
        const alt = $img.attr("alt");
        const role = $img.attr("role");
        const ariaHidden = $img.attr("aria-hidden");

        // Skip tiny images (icons/spacers)
        if (width < 50 && height < 50) return;

        // Check if decorative
        if (role === "presentation" || ariaHidden === "true" || alt === "") {
            decorativeImages++;
            return;
        }

        totalContentImages++;
        if (alt === undefined) {
            imagesWithoutAlt++;
        }
    });

    const imgScore = imagesWithoutAlt === 0 ? 12 : imagesWithoutAlt <= 2 ? 6 : 0;
    categories.images.maxScore += 12;
    categories.images.score += imgScore;
    if (imagesWithoutAlt > 0) categories.images.errors++;

    criteria.push({
        id: "img-alt",
        name: "Alternatives textuelles des images",
        category: "images",
        status: imagesWithoutAlt === 0 ? "success" : imagesWithoutAlt <= 2 ? "warning" : "error",
        score: imgScore,
        maxScore: 12,
        message: imagesWithoutAlt === 0
            ? `Toutes les ${totalContentImages} images ont un attribut alt`
            : `${imagesWithoutAlt} image(s) sans attribut alt sur ${totalContentImages}`,
        details: decorativeImages > 0 ? `${decorativeImages} image(s) décoratives correctement marquées` : undefined,
        fix: imagesWithoutAlt > 0 ? "Ajoutez un attribut alt descriptif à chaque image informative" : undefined,
        wcagLevel: "A",
        rgaaRef: "1.1",
    });

    // ========== 2. STRUCTURE - Heading hierarchy ==========
    const headings: { level: number; text: string }[] = [];
    $("h1, h2, h3, h4, h5, h6").each((_, el) => {
        const tagName = el.tagName.toLowerCase();
        const level = parseInt(tagName.substring(1), 10);
        headings.push({ level, text: $(el).text().trim().substring(0, 50) });
    });

    let hasH1 = headings.some(h => h.level === 1);
    let hasHierarchyError = false;
    let previousLevel = 0;

    for (const heading of headings) {
        if (previousLevel > 0 && heading.level > previousLevel + 1) {
            hasHierarchyError = true;
            break;
        }
        previousLevel = heading.level;
    }

    const h1Count = headings.filter(h => h.level === 1).length;
    const structureScore = hasH1 && !hasHierarchyError && h1Count === 1 ? 10 : hasH1 && h1Count === 1 ? 5 : 0;
    categories.structure.maxScore += 10;
    categories.structure.score += structureScore;
    if (!hasH1 || hasHierarchyError || h1Count !== 1) categories.structure.errors++;

    criteria.push({
        id: "heading-hierarchy",
        name: "Hiérarchie des titres",
        category: "structure",
        status: structureScore === 10 ? "success" : structureScore > 0 ? "warning" : "error",
        score: structureScore,
        maxScore: 10,
        message: !hasH1
            ? "Aucun titre H1 trouvé"
            : h1Count > 1
                ? `${h1Count} titres H1 trouvés (1 seul recommandé)`
                : hasHierarchyError
                    ? "Saut de niveau détecté dans la hiérarchie"
                    : "Hiérarchie des titres correcte",
        details: `${headings.length} titres trouvés (${headings.filter(h => h.level === 1).length} H1, ${headings.filter(h => h.level === 2).length} H2, ${headings.filter(h => h.level === 3).length} H3)`,
        fix: hasHierarchyError ? "Respectez la hiérarchie H1 > H2 > H3 sans sauter de niveau" : undefined,
        wcagLevel: "A",
        rgaaRef: "9.1",
    });

    // ========== 3. NAVIGATION - Link text quality ==========
    const links = $("a");
    let badLinkTexts = 0;
    let emptyLinks = 0;
    let totalLinks = 0;

    links.each((_, el) => {
        const $link = $(el);
        const text = $link.text().trim().toLowerCase();
        const ariaLabel = $link.attr("aria-label");
        const title = $link.attr("title");
        const hasImage = $link.find("img[alt]").length > 0;

        if (!$link.attr("href")) return;
        totalLinks++;

        // Check if link has accessible name
        if (!text && !ariaLabel && !title && !hasImage) {
            emptyLinks++;
            return;
        }

        // Check for non-descriptive link text
        const effectiveText = text || ariaLabel || "";
        if (BAD_LINK_TEXTS.some(bad => effectiveText === bad || effectiveText.includes(bad))) {
            badLinkTexts++;
        }
    });

    const linkScore = emptyLinks === 0 && badLinkTexts === 0 ? 10 : emptyLinks === 0 && badLinkTexts <= 2 ? 6 : emptyLinks <= 1 ? 3 : 0;
    categories.navigation.maxScore += 10;
    categories.navigation.score += linkScore;
    if (emptyLinks > 0 || badLinkTexts > 2) categories.navigation.errors++;

    criteria.push({
        id: "link-text",
        name: "Intitulés de liens explicites",
        category: "navigation",
        status: linkScore >= 10 ? "success" : linkScore >= 6 ? "warning" : "error",
        score: linkScore,
        maxScore: 10,
        message: emptyLinks > 0
            ? `${emptyLinks} lien(s) sans intitulé accessible`
            : badLinkTexts > 0
                ? `${badLinkTexts} lien(s) avec intitulé non explicite ("cliquez ici", etc.)`
                : `${totalLinks} liens avec intitulés explicites`,
        fix: emptyLinks > 0 || badLinkTexts > 0 ? 'Utilisez des intitulés descriptifs au lieu de "cliquez ici"' : undefined,
        wcagLevel: "A",
        rgaaRef: "6.1",
    });

    // ========== 4. NAVIGATION - Skip link ==========
    const hasSkipLink = $('a[href^="#main"], a[href^="#content"], a[href^="#contenu"], .skip-link, [class*="skip"]').length > 0;
    const skipScore = hasSkipLink ? 8 : 0;
    categories.navigation.maxScore += 8;
    categories.navigation.score += skipScore;
    if (!hasSkipLink) categories.navigation.errors++;

    criteria.push({
        id: "skip-link",
        name: "Lien d'évitement (skip link)",
        category: "navigation",
        status: hasSkipLink ? "success" : "warning",
        score: skipScore,
        maxScore: 8,
        message: hasSkipLink
            ? "Lien d'évitement vers le contenu principal détecté"
            : "Aucun lien d'évitement détecté",
        fix: !hasSkipLink ? 'Ajoutez un lien "Aller au contenu" en haut de page' : undefined,
        wcagLevel: "A",
        rgaaRef: "12.7",
    });

    // ========== 5. FORMULAIRES - Labels ==========
    const inputs = $("input, select, textarea").not('[type="hidden"], [type="submit"], [type="button"], [type="image"]');
    let inputsWithoutLabel = 0;
    let totalInputs = 0;

    inputs.each((_, el) => {
        const $input = $(el);
        const id = $input.attr("id");
        const ariaLabel = $input.attr("aria-label");
        const ariaLabelledby = $input.attr("aria-labelledby");
        const placeholder = $input.attr("placeholder");
        const title = $input.attr("title");

        totalInputs++;

        // Check for associated label
        const hasLabel = (id && $(`label[for="${id}"]`).length > 0) || ariaLabel || ariaLabelledby || title;

        if (!hasLabel) {
            inputsWithoutLabel++;
        }
    });

    const formScore = totalInputs === 0 ? 10 : inputsWithoutLabel === 0 ? 10 : inputsWithoutLabel <= 1 ? 5 : 0;
    categories.formulaires.maxScore += 10;
    categories.formulaires.score += formScore;
    if (inputsWithoutLabel > 0) categories.formulaires.errors++;

    criteria.push({
        id: "form-labels",
        name: "Étiquettes de formulaires",
        category: "formulaires",
        status: formScore >= 10 ? "success" : formScore >= 5 ? "warning" : "error",
        score: formScore,
        maxScore: 10,
        message: totalInputs === 0
            ? "Aucun champ de formulaire détecté"
            : inputsWithoutLabel === 0
                ? `${totalInputs} champs avec étiquettes associées`
                : `${inputsWithoutLabel}/${totalInputs} champs sans étiquette`,
        fix: inputsWithoutLabel > 0 ? "Associez un label à chaque champ avec for/id ou aria-label" : undefined,
        wcagLevel: "A",
        rgaaRef: "11.1",
    });

    // ========== 6. SEMANTIQUE - Lang attribute ==========
    const htmlLang = $("html").attr("lang");
    const hasValidLang = htmlLang && htmlLang.length >= 2;
    const langScore = hasValidLang ? 10 : 0;
    categories.semantique.maxScore += 10;
    categories.semantique.score += langScore;
    if (!hasValidLang) categories.semantique.errors++;

    criteria.push({
        id: "html-lang",
        name: "Langue de la page",
        category: "semantique",
        status: hasValidLang ? "success" : "error",
        score: langScore,
        maxScore: 10,
        message: hasValidLang
            ? `Langue déclarée : ${htmlLang}`
            : "Attribut lang manquant sur la balise html",
        fix: !hasValidLang ? 'Ajoutez lang="fr" sur la balise <html>' : undefined,
        wcagLevel: "A",
        rgaaRef: "8.3",
    });

    // ========== 7. SEMANTIQUE - Landmarks ==========
    const hasMain = $("main, [role='main']").length > 0;
    const hasNav = $("nav, [role='navigation']").length > 0;
    const hasHeader = $("header, [role='banner']").length > 0;
    const hasFooter = $("footer, [role='contentinfo']").length > 0;

    const landmarksCount = [hasMain, hasNav, hasHeader, hasFooter].filter(Boolean).length;
    const landmarkScore = landmarksCount >= 3 ? 10 : landmarksCount >= 2 ? 6 : landmarksCount >= 1 ? 3 : 0;
    categories.semantique.maxScore += 10;
    categories.semantique.score += landmarkScore;
    if (landmarksCount < 3) categories.semantique.errors++;

    criteria.push({
        id: "landmarks",
        name: "Régions de page (landmarks)",
        category: "semantique",
        status: landmarkScore >= 10 ? "success" : landmarkScore >= 6 ? "warning" : "error",
        score: landmarkScore,
        maxScore: 10,
        message: `${landmarksCount}/4 régions principales détectées`,
        details: `main: ${hasMain ? "✓" : "✗"} | nav: ${hasNav ? "✓" : "✗"} | header: ${hasHeader ? "✓" : "✗"} | footer: ${hasFooter ? "✓" : "✗"}`,
        fix: landmarksCount < 4 ? "Utilisez les balises sémantiques <main>, <nav>, <header>, <footer>" : undefined,
        wcagLevel: "A",
        rgaaRef: "9.2",
    });

    // ========== 8. SEMANTIQUE - ARIA usage ==========
    const ariaElements = $("[role], [aria-label], [aria-labelledby], [aria-describedby]");
    const hasAria = ariaElements.length > 0;

    // Check for common ARIA mistakes
    let ariaErrors = 0;
    $("[role='button']").each((_, el) => {
        if (!$(el).is("button") && !$(el).attr("tabindex")) {
            ariaErrors++;
        }
    });

    const ariaScore = hasAria && ariaErrors === 0 ? 8 : hasAria ? 5 : 3;
    categories.semantique.maxScore += 8;
    categories.semantique.score += ariaScore;

    criteria.push({
        id: "aria-usage",
        name: "Utilisation ARIA",
        category: "semantique",
        status: ariaScore >= 8 ? "success" : ariaScore >= 5 ? "warning" : "error",
        score: ariaScore,
        maxScore: 8,
        message: !hasAria
            ? "Aucun attribut ARIA détecté"
            : ariaErrors > 0
                ? `ARIA utilisé mais ${ariaErrors} erreur(s) détectée(s)`
                : `${ariaElements.length} éléments avec attributs ARIA`,
        fix: ariaErrors > 0 ? "Les éléments avec role='button' doivent être focusables" : undefined,
        wcagLevel: "A",
        rgaaRef: "7.1",
    });

    // ========== 9. STRUCTURE - Document structure ==========
    const hasDoctype = html.toLowerCase().includes("<!doctype html");
    const hasMetaViewport = $('meta[name="viewport"]').length > 0;
    const hasMetaCharset = $('meta[charset], meta[http-equiv="Content-Type"]').length > 0;

    const docScore = hasDoctype && hasMetaViewport && hasMetaCharset ? 8 :
                     (hasDoctype && hasMetaCharset) ? 5 :
                     hasDoctype ? 3 : 0;
    categories.structure.maxScore += 8;
    categories.structure.score += docScore;
    if (docScore < 8) categories.structure.errors++;

    criteria.push({
        id: "document-structure",
        name: "Structure du document",
        category: "structure",
        status: docScore >= 8 ? "success" : docScore >= 5 ? "warning" : "error",
        score: docScore,
        maxScore: 8,
        message: `DOCTYPE: ${hasDoctype ? "✓" : "✗"} | Charset: ${hasMetaCharset ? "✓" : "✗"} | Viewport: ${hasMetaViewport ? "✓" : "✗"}`,
        fix: docScore < 8 ? "Assurez-vous d'avoir DOCTYPE, charset et viewport" : undefined,
        wcagLevel: "A",
        rgaaRef: "8.1",
    });

    // ========== 10. IMAGES - Decorative images ==========
    const imagesTotal = images.length;
    const hasDecorativeHandling = decorativeImages > 0 || $('img[alt=""]').length > 0 || $('img[role="presentation"]').length > 0;

    const decorativeScore = imagesTotal === 0 ? 6 : hasDecorativeHandling ? 6 : 3;
    categories.images.maxScore += 6;
    categories.images.score += decorativeScore;

    criteria.push({
        id: "decorative-images",
        name: "Images décoratives",
        category: "images",
        status: decorativeScore >= 6 ? "success" : "warning",
        score: decorativeScore,
        maxScore: 6,
        message: imagesTotal === 0
            ? "Aucune image sur la page"
            : hasDecorativeHandling
                ? "Images décoratives correctement marquées (alt vide ou role='presentation')"
                : "Vérifiez le marquage des images décoratives",
        fix: !hasDecorativeHandling && imagesTotal > 0 ? 'Utilisez alt="" ou role="presentation" pour les images décoratives' : undefined,
        wcagLevel: "A",
        rgaaRef: "1.2",
    });

    // Calculate totals
    let totalScore = 0;
    let totalMaxScore = 0;
    let errors = 0;
    let warnings = 0;
    let passed = 0;

    for (const c of criteria) {
        totalScore += c.score;
        totalMaxScore += c.maxScore;
        if (c.status === "error") errors++;
        else if (c.status === "warning") warnings++;
        else passed++;
    }

    const percentage = Math.round((totalScore / totalMaxScore) * 100);
    let conformityLevel: AccessibilityResult["conformityLevel"];
    if (percentage >= 75) {
        conformityLevel = "Conforme";
    } else if (percentage >= 50) {
        conformityLevel = "Partiellement conforme";
    } else {
        conformityLevel = "Non conforme";
    }

    return {
        url: normalizedUrl,
        timestamp: new Date().toISOString(),
        score: percentage,
        maxScore: 100,
        conformityLevel,
        conformityPercentage: percentage,
        categories,
        criteria,
        summary: { errors, warnings, passed },
        pageTitle,
    };
}

export async function POST(request: NextRequest) {
    try {
        const ip = getClientIP(request);
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Limite atteinte. Réessayez dans 1 heure (max 5 tests/heure)." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { url } = body;

        if (!url || typeof url !== "string") {
            return NextResponse.json({ error: "URL requise" }, { status: 400 });
        }

        const cached = getCachedResult(url);
        if (cached) {
            return NextResponse.json({ ...cached, cached: true });
        }

        const result = await analyzeAccessibility(url);
        setCachedResult(url, result);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Accessibility check error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Erreur lors de l'analyse." },
            { status: 500 }
        );
    }
}
