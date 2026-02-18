#!/usr/bin/env node
/**
 * Script d'export audit SEO complet - Version 2
 * Utilise le HTML généré par le build pour extraire le contenu réel
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const archiver = require('archiver');

const SITE_URL = 'https://indhack.com';
const OUTPUT_DIR = path.join(__dirname, '../public/audit-export');
const BUILD_DIR = path.join(__dirname, '../.next/server/app');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Clean previous export
const existingFiles = fs.readdirSync(OUTPUT_DIR);
for (const file of existingFiles) {
    if (file.endsWith('.md') || file === 'index.csv') {
        fs.unlinkSync(path.join(OUTPUT_DIR, file));
    }
}

/**
 * Find all HTML files recursively
 */
function findHtmlFiles(dir, results = [], basePath = '') {
    if (!fs.existsSync(dir)) return results;

    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Skip internal directories
            if (item.startsWith('_') || item.startsWith('.') || item === 'api' || item === 'keystatic') {
                continue;
            }
            // Handle route groups like (gmb-app)
            if (item.startsWith('(') && item.endsWith(')')) {
                continue; // Skip route groups for now
            }
            findHtmlFiles(fullPath, results, path.join(basePath, item));
        } else if (item === 'index.html') {
            const route = '/' + basePath.replace(/\\/g, '/');
            results.push({ htmlPath: fullPath, route });
        }
    }

    return results;
}

/**
 * Get cities data for content expansion
 */
function getCitiesData() {
    const citiesFile = path.join(__dirname, '../lib/cities-data.ts');
    if (!fs.existsSync(citiesFile)) return {};

    const content = fs.readFileSync(citiesFile, 'utf-8');
    const cities = {};

    // Extract city objects
    const cityMatches = content.matchAll(/{\s*name:\s*["']([^"']+)["'][\s\S]*?slug:\s*["']([^"']+)["']/g);
    for (const match of cityMatches) {
        cities[match[2]] = { name: match[1], slug: match[2] };
    }

    return cities;
}

/**
 * Parse HTML and extract SEO data
 */
function parseHtml(html, route) {
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Title
    let title = doc.querySelector('title')?.textContent || '';

    // Meta description
    let metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';

    // H1
    const h1 = doc.querySelector('h1')?.textContent?.trim() || '';

    // All H2/H3
    const headings = [];
    doc.querySelectorAll('h2, h3').forEach(h => {
        const text = h.textContent?.trim();
        if (text && text.length > 0) {
            headings.push({
                level: h.tagName.toLowerCase(),
                text: text
            });
        }
    });

    // Full text content
    const body = doc.querySelector('body');
    let textContent = '';
    if (body) {
        // Clone to not modify original
        const clone = body.cloneNode(true);

        // Remove scripts, styles, noscript
        clone.querySelectorAll('script, style, noscript, svg').forEach(el => el.remove());

        // Get text
        textContent = clone.textContent || '';

        // Clean up whitespace
        textContent = textContent
            .replace(/\s+/g, ' ')
            .replace(/\n+/g, '\n')
            .trim();
    }

    // Internal links
    const internalLinks = [];
    const seenLinks = new Set();
    doc.querySelectorAll('a[href]').forEach(a => {
        let href = a.getAttribute('href') || '';
        const anchor = a.textContent?.trim() || '';

        // Normalize href
        if (href.startsWith(SITE_URL)) {
            href = href.replace(SITE_URL, '');
        }

        // Skip external, anchor-only, and empty links
        if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href === '#' || !href) {
            return;
        }

        // Remove hash and query
        const cleanHref = href.split('?')[0].split('#')[0];

        // Create unique key
        const key = `${anchor}::${cleanHref}`;
        if (!seenLinks.has(key) && anchor.length > 0 && cleanHref.startsWith('/')) {
            seenLinks.add(key);
            internalLinks.push({ anchor, url: cleanHref });
        }
    });

    // JSON-LD schemas
    const schemas = [];
    doc.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
        try {
            const data = JSON.parse(script.textContent || '{}');
            schemas.push(data);
        } catch (e) {
            // Invalid JSON
        }
    });

    // FAQ extraction - from schema or from DOM
    const faqItems = [];
    const faqSchema = schemas.find(s => s['@type'] === 'FAQPage');
    if (faqSchema && faqSchema.mainEntity) {
        faqSchema.mainEntity.forEach(item => {
            faqItems.push({
                question: item.name || '',
                answer: item.acceptedAnswer?.text || ''
            });
        });
    }

    // Word count
    const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length;

    return {
        url: route,
        title,
        metaDescription: metaDesc,
        h1,
        headings,
        textContent,
        internalLinks,
        schemas,
        faq: faqItems,
        wordCount
    };
}

/**
 * Extract blog posts from content folder
 */
function extractBlogPosts() {
    const blogDir = path.join(__dirname, '../content/blog');
    const posts = [];

    if (!fs.existsSync(blogDir)) return posts;

    const files = fs.readdirSync(blogDir);
    for (const file of files) {
        if (!file.endsWith('.md')) continue;

        const slug = file.replace('.md', '');
        const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');

        // Extract frontmatter
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (!frontmatterMatch) continue;

        const fm = frontmatterMatch[1];
        const titleMatch = fm.match(/title:\s*["']?([^\n"']+)/);
        const descMatch = fm.match(/description:\s*["']?([^\n"']+)/);

        // Extract body content
        const bodyContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');

        // Extract headings
        const headings = [];
        const lines = bodyContent.split('\n');
        for (const line of lines) {
            if (line.startsWith('## ')) {
                headings.push({ level: 'h2', text: line.replace('## ', '').trim() });
            } else if (line.startsWith('### ')) {
                headings.push({ level: 'h3', text: line.replace('### ', '').trim() });
            }
        }

        // Extract internal links
        const links = [];
        const linkMatches = bodyContent.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
        for (const m of linkMatches) {
            if (m[2].startsWith('/')) {
                links.push({ anchor: m[1], url: m[2] });
            }
        }

        // Clean text content
        const textContent = bodyContent
            .replace(/^#+\s+/gm, '')
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/\*([^*]+)\*/g, '$1')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/```[\s\S]*?```/g, '')
            .replace(/`[^`]+`/g, '')
            .replace(/^>\s*/gm, '')
            .replace(/^[-*]\s*/gm, '')
            .replace(/^[0-9]+\.\s*/gm, '')
            .replace(/\n+/g, ' ')
            .trim();

        // FAQ extraction from content
        const faqItems = [];
        const faqSection = bodyContent.match(/## Questions fréquentes\n([\s\S]*?)(?=\n## |$)/);
        if (faqSection) {
            const faqContent = faqSection[1];
            const questionMatches = faqContent.matchAll(/### ([^\n]+)\n\n([\s\S]*?)(?=\n### |\n## |$)/g);
            for (const qm of questionMatches) {
                faqItems.push({
                    question: qm[1].trim(),
                    answer: qm[2].trim()
                });
            }
        }

        posts.push({
            url: '/blog/' + slug,
            title: titleMatch ? titleMatch[1].replace(/["']/g, '') : '',
            metaDescription: descMatch ? descMatch[1].replace(/["']/g, '') : '',
            h1: titleMatch ? titleMatch[1].replace(/["']/g, '') : '',
            headings,
            textContent,
            internalLinks: links,
            schemas: [],
            faq: faqItems,
            wordCount: textContent.split(/\s+/).filter(w => w.length > 0).length
        });
    }

    return posts;
}

/**
 * Extract metadata from page.tsx source
 */
function extractMetadataFromSource(route) {
    const appDir = path.join(__dirname, '../app');
    let pagePath;

    if (route === '/') {
        pagePath = path.join(appDir, 'page.tsx');
    } else {
        pagePath = path.join(appDir, route.slice(1), 'page.tsx');
    }

    if (!fs.existsSync(pagePath)) return null;

    const content = fs.readFileSync(pagePath, 'utf-8');

    // Extract metadata
    const titleMatch = content.match(/title:\s*[`"']([^`"'\n]+)[`"']/);
    const descMatch = content.match(/description:\s*[`"']([^`"'\n]+)[`"']/);

    // Get relative path for source file
    const relativePath = pagePath.replace(path.join(__dirname, '../'), '');

    return {
        title: titleMatch ? titleMatch[1] : '',
        description: descMatch ? descMatch[1] : '',
        sourcePath: relativePath
    };
}

/**
 * Get source file path for a route
 */
function getSourcePath(route) {
    const appDir = path.join(__dirname, '../app');

    // Blog posts
    if (route.startsWith('/blog/')) {
        const slug = route.replace('/blog/', '');
        const mdPath = path.join(__dirname, '../content/blog', slug + '.md');
        if (fs.existsSync(mdPath)) {
            return 'content/blog/' + slug + '.md';
        }
        // Check for dedicated page folder
        const pagePath = path.join(appDir, 'blog', slug, 'page.tsx');
        if (fs.existsSync(pagePath)) {
            return 'app/blog/' + slug + '/page.tsx';
        }
        return 'app/blog/[slug]/page.tsx';
    }

    // Homepage
    if (route === '/') {
        return 'app/page.tsx';
    }

    // Regular pages
    const pagePath = path.join(appDir, route.slice(1), 'page.tsx');
    if (fs.existsSync(pagePath)) {
        return 'app' + route + '/page.tsx';
    }

    return '';
}

/**
 * Get full source code for a route
 */
function getFullSourceCode(route) {
    const appDir = path.join(__dirname, '../app');
    const contentDir = path.join(__dirname, '../content/blog');

    // Blog posts - try markdown first
    if (route.startsWith('/blog/')) {
        const slug = route.replace('/blog/', '');
        const mdPath = path.join(contentDir, slug + '.md');
        if (fs.existsSync(mdPath)) {
            return fs.readFileSync(mdPath, 'utf-8');
        }
        // Check for dedicated page folder
        const pagePath = path.join(appDir, 'blog', slug, 'page.tsx');
        if (fs.existsSync(pagePath)) {
            return fs.readFileSync(pagePath, 'utf-8');
        }
    }

    // Homepage
    if (route === '/') {
        const pagePath = path.join(appDir, 'page.tsx');
        if (fs.existsSync(pagePath)) {
            return fs.readFileSync(pagePath, 'utf-8');
        }
    }

    // Regular pages
    const pagePath = path.join(appDir, route.slice(1), 'page.tsx');
    if (fs.existsSync(pagePath)) {
        return fs.readFileSync(pagePath, 'utf-8');
    }

    return '';
}

/**
 * Estimated search volumes based on French SEO market data (Semrush/Ahrefs approximations)
 */
const KEYWORD_VOLUMES = {
    // Services principaux
    'consultant seo': 2400,
    'consultante seo': 390,
    'audit seo': 1600,
    'référencement naturel': 4400,
    'seo local': 720,
    'création site web': 8100,
    'création de site web': 6600,
    'refonte site web': 880,
    'création boutique en ligne': 1300,
    'agence seo': 5400,

    // Villes principales
    'consultant seo paris': 720,
    'consultant seo lyon': 260,
    'consultant seo marseille': 170,
    'consultant seo nice': 140,
    'consultant seo toulouse': 140,
    'consultant seo bordeaux': 170,
    'consultant seo nantes': 110,
    'consultant seo montpellier': 90,
    'consultant seo lille': 110,
    'consultant seo strasbourg': 70,
    'consultant seo rennes': 50,
    'consultant seo grenoble': 70,
    'consultant seo cannes': 50,
    'consultant seo antibes': 30,
    'consultant seo monaco': 40,
    'consultant seo sophia antipolis': 20,
    'consultant seo aix en provence': 50,

    // Outils
    'audit seo gratuit': 880,
    'testeur visibilité ia': 10,
    'générateur robots txt': 260,
    'générateur schema json ld': 170,
    'simulateur visibilité locale': 10,

    // Articles blog
    'google business profile': 2900,
    'google maps seo': 320,
    'salaire consultant seo': 480,
    'devenir consultant seo': 260,
    'formation seo': 1900,
    'checklist seo': 210,
    'refonte site seo': 140,
    'seo vs sea': 390,
    'geo seo': 50,
    'chatgpt seo': 390,
    'cout site web': 1600,
    'performance web': 260,
    'pagespeed': 1300,
};

/**
 * Get estimated search volume for a keyword
 */
function getSearchVolume(keyword) {
    const normalizedKw = keyword.toLowerCase()
        .replace(/-/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    // Direct match
    if (KEYWORD_VOLUMES[normalizedKw]) {
        return KEYWORD_VOLUMES[normalizedKw];
    }

    // Partial match
    for (const [kw, vol] of Object.entries(KEYWORD_VOLUMES)) {
        if (normalizedKw.includes(kw) || kw.includes(normalizedKw)) {
            return vol;
        }
    }

    // Estimate based on patterns
    if (normalizedKw.includes('consultant seo')) return 50;
    if (normalizedKw.includes('audit')) return 100;
    if (normalizedKw.includes('seo')) return 50;

    return 0; // Unknown
}

/**
 * Get suggested anchor texts and target pages for internal linking (maillage)
 */
function getSuggestedAnchors(route, data) {
    const anchors = [];
    const url = route.toLowerCase();

    // Blog articles - must link to services, tools, and other articles
    if (url.startsWith('/blog/')) {
        const category = (data.category || '').toLowerCase();
        const content = (data.textContent || '').toLowerCase();

        // Always link to main services
        anchors.push({ anchor: 'audit SEO complet', target: '/audit-seo' });
        anchors.push({ anchor: 'stratégie de référencement naturel', target: '/referencement-naturel' });

        // Link to tools based on content
        if (content.includes('audit') || content.includes('analyse')) {
            anchors.push({ anchor: 'outil d\'audit SEO gratuit', target: '/outils/audit-seo-gratuit' });
        }
        if (content.includes('ia') || content.includes('chatgpt') || content.includes('geo')) {
            anchors.push({ anchor: 'testeur de visibilité IA', target: '/outils/testeur-visibilite-ia' });
        }
        if (content.includes('local') || content.includes('google maps') || content.includes('gbp')) {
            anchors.push({ anchor: 'SEO local', target: '/seo-local' });
            anchors.push({ anchor: 'simulateur visibilité locale', target: '/outils/simulateur-visibilite-locale' });
        }
        if (content.includes('refonte') || content.includes('migration')) {
            anchors.push({ anchor: 'refonte de site web', target: '/refonte-site-web' });
        }
        if (content.includes('création') || content.includes('nouveau site')) {
            anchors.push({ anchor: 'création de site web optimisé SEO', target: '/creation-site-web' });
        }

        // Always link to contact
        anchors.push({ anchor: 'contactez-moi pour un accompagnement', target: '/contact' });
    }

    // City pages - must link to parent, services, and neighboring cities
    else if (url.startsWith('/consultant-seo-') && !url.includes('audit-technique')) {
        const citySlug = url.replace('/consultant-seo-', '');

        // Parent page
        anchors.push({ anchor: 'SEO local en France', target: '/seo-local' });
        anchors.push({ anchor: 'consultante SEO freelance', target: '/consultant-seo' });

        // Services
        anchors.push({ anchor: 'audit SEO technique', target: '/audit-seo' });
        anchors.push({ anchor: 'référencement naturel', target: '/referencement-naturel' });
        anchors.push({ anchor: 'création de site web', target: '/creation-site-web' });

        // Neighboring cities based on proximity
        const neighbors = {
            'nice': ['cannes', 'antibes', 'monaco', 'sophia-antipolis'],
            'cannes': ['nice', 'antibes', 'sophia-antipolis'],
            'antibes': ['nice', 'cannes', 'sophia-antipolis'],
            'monaco': ['nice'],
            'sophia-antipolis': ['nice', 'cannes', 'antibes'],
            'paris': ['boulogne-billancourt'],
            'lyon': ['grenoble'],
            'marseille': ['aix-en-provence'],
            'toulouse': ['bordeaux', 'montpellier'],
            'bordeaux': ['toulouse'],
            'montpellier': ['toulouse'],
            'nantes': ['rennes'],
            'rennes': ['nantes'],
            'lille': ['strasbourg'],
            'strasbourg': ['lille'],
            'grenoble': ['lyon'],
            'aix-en-provence': ['marseille'],
        };

        const cityNeighbors = neighbors[citySlug] || [];
        for (const neighbor of cityNeighbors.slice(0, 3)) {
            const cityName = neighbor.charAt(0).toUpperCase() + neighbor.slice(1).replace(/-/g, ' ');
            anchors.push({ anchor: `consultant SEO ${cityName}`, target: `/consultant-seo-${neighbor}` });
        }

        // Tools
        anchors.push({ anchor: 'audit SEO gratuit', target: '/outils/audit-seo-gratuit' });
    }

    // Service pages
    else if (['/audit-seo', '/referencement-naturel', '/seo-local', '/creation-site-web', '/refonte-site-web', '/creation-boutique-en-ligne'].includes(url)) {
        // Link to other services
        const services = {
            '/audit-seo': ['/referencement-naturel', '/consultant-seo'],
            '/referencement-naturel': ['/audit-seo', '/seo-local', '/creation-site-web'],
            '/seo-local': ['/consultant-seo-nice', '/consultant-seo-paris', '/referencement-naturel'],
            '/creation-site-web': ['/refonte-site-web', '/audit-seo', '/referencement-naturel'],
            '/refonte-site-web': ['/creation-site-web', '/audit-seo'],
            '/creation-boutique-en-ligne': ['/creation-site-web', '/referencement-naturel'],
        };

        const linkedServices = services[url] || [];
        for (const svc of linkedServices) {
            const name = svc.replace(/^\//, '').replace(/-/g, ' ');
            anchors.push({ anchor: name, target: svc });
        }

        // Link to tools
        anchors.push({ anchor: 'outil d\'audit SEO gratuit', target: '/outils/audit-seo-gratuit' });

        // Link to contact
        anchors.push({ anchor: 'demander un devis', target: '/contact' });
    }

    // Tool pages
    else if (url.startsWith('/outils/')) {
        anchors.push({ anchor: 'audit SEO professionnel', target: '/audit-seo' });
        anchors.push({ anchor: 'stratégie SEO complète', target: '/referencement-naturel' });
        anchors.push({ anchor: 'tous nos outils SEO gratuits', target: '/outils' });
    }

    return anchors;
}

/**
 * Format anchors for CSV
 */
function formatAnchorsForCSV(anchors) {
    return anchors.map(a => `${a.anchor} → ${a.target}`).join(' | ');
}

/**
 * Extract content from templates for city pages
 */
function extractCityPageContent(route, cities) {
    const citySlug = route.slice(1); // Remove leading /
    const cityData = cities[citySlug];

    if (!cityData) return null;

    // Read template file
    const templatePath = path.join(__dirname, '../components/templates/CityPageTemplateV2.tsx');
    if (!fs.existsSync(templatePath)) return null;

    const templateContent = fs.readFileSync(templatePath, 'utf-8');

    // Extract headings from template
    const headings = [];
    const h2Matches = templateContent.matchAll(/<h2[^>]*>([^<]+)<\/h2>/g);
    for (const m of h2Matches) {
        let text = m[1].replace(/\{[^}]+\}/g, cityData.name);
        headings.push({ level: 'h2', text });
    }

    // Extract text blocks
    const textBlocks = [];
    const pMatches = templateContent.matchAll(/<p[^>]*>([^<]+)<\/p>/g);
    for (const m of pMatches) {
        let text = m[1].replace(/\{[^}]+\}/g, cityData.name);
        textBlocks.push(text);
    }

    // Build a description of what the template contains
    const templateDescription = `
Page locale pour ${cityData.name}. Cette page utilise le template CityPageTemplateV2 et contient:
- Hero avec titre "Consultant SEO ${cityData.name}"
- Section introduction sur la visibilité locale
- Méthodologie en 4 étapes (Audit Local, Stratégie, Optimisation, Croissance)
- Services liés avec liens internes
- FAQ contextuelle selon le type de marché
- CTA pour audit gratuit
- Maillage vers villes proches de la région
    `.trim();

    // Extract links from template
    const links = [];
    const linkMatches = templateContent.matchAll(/href=\{?["']?([^"'\s}]+)["']?\}?/g);
    for (const m of linkMatches) {
        let href = m[1];
        if (href.startsWith('/') && !href.includes('$')) {
            href = href.replace(/\$\{[^}]+\}/g, citySlug);
            links.push({ anchor: 'Lien template', url: href });
        }
    }

    // Add known internal links from template
    links.push(
        { anchor: 'Audit technique SEO', url: `/${citySlug}/audit-technique` },
        { anchor: 'Accompagnement SEO personnalisé', url: '/consultant-seo' },
        { anchor: 'Diagnostic SEO complet', url: '/audit-seo' },
        { anchor: 'Stratégie SEO nationale', url: '/referencement-naturel' },
        { anchor: 'Création site SEO-ready', url: '/creation-site-web' }
    );

    return {
        headings,
        textContent: templateDescription,
        internalLinks: links,
        wordCount: 1500 // Estimate for templated pages
    };
}

/**
 * Generate markdown for a page
 */
function generateMarkdown(data) {
    let md = `# Audit SEO : ${data.url}\n\n`;

    md += `## Informations de base\n\n`;
    md += `- **URL** : ${SITE_URL}${data.url}\n`;
    md += `- **Title** : ${data.title}\n`;
    md += `- **Meta Description** : ${data.metaDescription}\n`;
    md += `- **H1** : ${data.h1}\n`;
    md += `- **Nombre de mots** : ${data.wordCount}\n\n`;

    md += `## Structure des titres\n\n`;
    if (data.headings && data.headings.length > 0) {
        for (const h of data.headings) {
            const indent = h.level === 'h3' ? '  ' : '';
            md += `${indent}- **${h.level.toUpperCase()}** : ${h.text}\n`;
        }
    } else {
        md += `_Aucun H2/H3 détecté_\n`;
    }
    md += `\n`;

    md += `## Contenu textuel complet\n\n`;
    md += `\`\`\`\n${data.textContent || '_Contenu non extrait_'}\n\`\`\`\n\n`;

    md += `## Liens internes\n\n`;
    if (data.internalLinks && data.internalLinks.length > 0) {
        md += `| Ancre | URL cible |\n`;
        md += `|-------|----------|\n`;
        for (const link of data.internalLinks) {
            const anchor = (link.anchor || '').replace(/\|/g, '\\|').replace(/\n/g, ' ').substring(0, 60);
            md += `| ${anchor} | ${link.url} |\n`;
        }
    } else {
        md += `_Aucun lien interne détecté_\n`;
    }
    md += `\n`;

    md += `## Schemas JSON-LD\n\n`;
    if (data.schemas && data.schemas.length > 0) {
        for (const schema of data.schemas) {
            md += `### ${schema['@type'] || 'Schema'}\n\n`;
            md += `\`\`\`json\n${JSON.stringify(schema, null, 2)}\n\`\`\`\n\n`;
        }
    } else {
        md += `_Aucun schema JSON-LD détecté_\n\n`;
    }

    md += `## FAQ\n\n`;
    if (data.faq && data.faq.length > 0) {
        for (const item of data.faq) {
            md += `### Q: ${item.question}\n\n`;
            md += `${item.answer}\n\n`;
        }
    } else {
        md += `_Pas de FAQ sur cette page_\n`;
    }

    return md;
}

/**
 * Convert route to filename
 */
function routeToFilename(route) {
    if (route === '/') return 'homepage.md';
    return route.slice(1).replace(/\//g, '--') + '.md';
}

/**
 * Guess main keyword from title and URL
 */
function guessMainKeyword(data) {
    const title = (data.title || '').toLowerCase();
    const url = data.url.toLowerCase();

    // City pages
    if (url.includes('consultant-seo-') && !url.includes('audit-technique')) {
        const cityMatch = url.match(/consultant-seo-([a-z-]+)/);
        if (cityMatch) return `consultant seo ${cityMatch[1].replace(/-/g, ' ')}`;
    }

    // Audit technique pages
    if (url.includes('audit-technique')) {
        const cityMatch = url.match(/consultant-seo-([a-z-]+)/);
        if (cityMatch) return `audit seo ${cityMatch[1].replace(/-/g, ' ')}`;
    }

    // Blog posts
    if (url.startsWith('/blog/')) {
        const slug = url.replace('/blog/', '');
        return slug.replace(/-/g, ' ');
    }

    // Services
    if (title.includes('audit seo')) return 'audit seo';
    if (title.includes('création site')) return 'création site web';
    if (title.includes('refonte')) return 'refonte site web';
    if (title.includes('seo local')) return 'seo local';
    if (title.includes('consultant seo')) return 'consultant seo';
    if (title.includes('community manager')) return 'community manager';

    // Fallback
    return title.split(/[\s|–-]+/).slice(0, 4).join(' ').toLowerCase();
}

/**
 * Get all routes from app directory
 */
function getAllRoutes() {
    const appDir = path.join(__dirname, '../app');
    const routes = [];

    function scanDir(dir, basePath = '') {
        if (!fs.existsSync(dir)) return;
        const items = fs.readdirSync(dir);

        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                // Skip internal directories
                if (item.startsWith('_') || item.startsWith('.') || item === 'api' || item === 'keystatic') {
                    continue;
                }
                // Skip route groups
                if (item.startsWith('(') && item.endsWith(')')) {
                    continue;
                }
                // Skip dynamic routes
                if (item.startsWith('[') && item.endsWith(']')) {
                    continue;
                }

                const route = basePath + '/' + item;

                // Check if this directory has a page.tsx
                if (fs.existsSync(path.join(fullPath, 'page.tsx'))) {
                    routes.push(route);
                }

                // Recurse
                scanDir(fullPath, route);
            }
        }
    }

    // Check root page
    if (fs.existsSync(path.join(appDir, 'page.tsx'))) {
        routes.push('/');
    }

    scanDir(appDir);

    return routes;
}

/**
 * Main execution
 */
async function main() {
    console.log('🔍 Extraction des données SEO de toutes les pages...\n');

    const cities = getCitiesData();
    const allData = [];
    const incomingLinks = {};

    // 1. Get routes from app directory
    const appRoutes = getAllRoutes();
    console.log(`📁 ${appRoutes.length} routes trouvées dans /app\n`);

    // 2. Get blog posts from content
    const blogPosts = extractBlogPosts();
    console.log(`📝 ${blogPosts.length} articles de blog trouvés\n`);

    // 3. Find built HTML files
    const htmlFiles = findHtmlFiles(BUILD_DIR);
    console.log(`🏗️  ${htmlFiles.length} fichiers HTML trouvés dans .next\n`);

    // Create a map of route -> HTML file
    const htmlMap = {};
    for (const { htmlPath, route } of htmlFiles) {
        htmlMap[route] = htmlPath;
    }

    // Process app routes
    for (const route of appRoutes) {
        console.log(`  Processing: ${route}`);

        let data = null;

        // Try to get HTML content first
        const htmlPath = htmlMap[route];
        if (htmlPath && fs.existsSync(htmlPath)) {
            const html = fs.readFileSync(htmlPath, 'utf-8');
            data = parseHtml(html, route);
        }

        // Fallback to metadata extraction
        if (!data || data.wordCount === 0) {
            const metadata = extractMetadataFromSource(route);

            if (metadata) {
                if (!data) {
                    data = {
                        url: route,
                        title: metadata.title || '',
                        metaDescription: metadata.description || '',
                        h1: metadata.title || '',
                        headings: [],
                        textContent: '',
                        internalLinks: [],
                        schemas: [],
                        faq: [],
                        wordCount: 0
                    };
                } else {
                    // Update with metadata if HTML parsing got empty values
                    if (!data.title) data.title = metadata.title || '';
                    if (!data.metaDescription) data.metaDescription = metadata.description || '';
                }
            }

            // For city pages, extract template content
            if (route.startsWith('/consultant-seo-') && !route.includes('/audit-technique')) {
                const cityContent = extractCityPageContent(route, cities);
                if (cityContent && data) {
                    if (!data.headings.length) data.headings = cityContent.headings;
                    if (!data.textContent) data.textContent = cityContent.textContent;
                    if (!data.internalLinks.length) data.internalLinks = cityContent.internalLinks;
                    if (data.wordCount === 0) data.wordCount = cityContent.wordCount;
                }
            }
        }

        if (data) {
            allData.push(data);

            // Generate markdown file
            const md = generateMarkdown(data);
            const filename = routeToFilename(route);
            fs.writeFileSync(path.join(OUTPUT_DIR, filename), md);
            console.log(`    ✅ ${filename}`);
        } else {
            console.log(`    ⚠️  Skipped (no data found)`);
        }
    }

    // Process blog posts
    for (const post of blogPosts) {
        // Check if already processed
        const existing = allData.find(d => d.url === post.url);
        if (existing) {
            // Update with better data
            if (post.textContent && post.textContent.length > (existing.textContent?.length || 0)) {
                existing.textContent = post.textContent;
                existing.wordCount = post.wordCount;
            }
            if (post.headings.length > existing.headings.length) {
                existing.headings = post.headings;
            }
            if (post.internalLinks.length > existing.internalLinks.length) {
                existing.internalLinks = post.internalLinks;
            }
            if (post.faq.length > 0) {
                existing.faq = post.faq;
            }
            continue;
        }

        console.log(`  Processing: ${post.url}`);
        allData.push(post);

        const md = generateMarkdown(post);
        const filename = routeToFilename(post.url);
        fs.writeFileSync(path.join(OUTPUT_DIR, filename), md);
        console.log(`    ✅ ${filename}`);
    }

    // Initialize incoming links counter
    for (const data of allData) {
        incomingLinks[data.url] = 0;
    }

    // Count incoming links
    for (const data of allData) {
        for (const link of data.internalLinks) {
            const targetRoute = link.url.split('?')[0].split('#')[0];
            if (incomingLinks[targetRoute] !== undefined) {
                incomingLinks[targetRoute]++;
            }
        }
    }

    // Generate CSV index
    console.log('\n📊 Génération du fichier index.csv...');

    let csv = 'URL,Title,H1,Mot-clé principal,Nombre de mots,Liens internes sortants,Liens internes entrants,Code source (chemin),Volume recherche (estimé),Ancres suggérées pour maillage,Code source complet\n';

    for (const data of allData) {
        const keyword = guessMainKeyword(data);
        const outgoing = data.internalLinks.length;
        const incoming = incomingLinks[data.url] || 0;
        const sourcePath = getSourcePath(data.url);
        const searchVolume = getSearchVolume(keyword);
        const suggestedAnchors = getSuggestedAnchors(data.url, data);
        const anchorsFormatted = formatAnchorsForCSV(suggestedAnchors);
        const fullSourceCode = getFullSourceCode(data.url);

        const escapeCSV = (str) => `"${(str || '').replace(/"/g, '""').replace(/\n/g, '\\n')}"`;

        csv += `${escapeCSV(SITE_URL + data.url)},`;
        csv += `${escapeCSV(data.title)},`;
        csv += `${escapeCSV(data.h1)},`;
        csv += `${escapeCSV(keyword)},`;
        csv += `${data.wordCount},`;
        csv += `${outgoing},`;
        csv += `${incoming},`;
        csv += `${escapeCSV(sourcePath)},`;
        csv += `${searchVolume},`;
        csv += `${escapeCSV(anchorsFormatted)},`;
        csv += `${escapeCSV(fullSourceCode)}\n`;
    }

    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.csv'), csv);
    console.log('✅ index.csv créé\n');

    // Create ZIP
    console.log('📦 Création du fichier ZIP...');

    const zipPath = path.join(__dirname, '../public/audit-export.zip');
    if (fs.existsSync(zipPath)) {
        fs.unlinkSync(zipPath);
    }

    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    return new Promise((resolve, reject) => {
        output.on('close', () => {
            console.log(`✅ audit-export.zip créé (${(archive.pointer() / 1024).toFixed(1)} KB)\n`);
            console.log('🎉 Export terminé !');
            console.log(`   📁 Dossier: /public/audit-export/`);
            console.log(`   📦 ZIP: /public/audit-export.zip`);
            console.log(`   📄 ${allData.length} pages exportées`);
            resolve();
        });

        archive.on('error', reject);
        archive.pipe(output);

        // Add all files from the output directory
        archive.directory(OUTPUT_DIR, 'audit-export');

        archive.finalize();
    });
}

main().catch(console.error);
