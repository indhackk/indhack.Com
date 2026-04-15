const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// ══════════════════════════════════════════════════════════════
// LASTMOD DYNAMIQUES - Récupère les dates des articles blog
// ══════════════════════════════════════════════════════════════
function getBlogPostDates() {
    const blogDir = path.join(process.cwd(), 'content/blog');
    const dates = {};

    try {
        const files = fs.readdirSync(blogDir);
        files.forEach(file => {
            if (file.endsWith('.md')) {
                const filePath = path.join(blogDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const { data } = matter(fileContent);
                const slug = file.replace('.md', '');

                // Utilise dateModified si présent, sinon date
                const dateStr = data.dateModified || data.date;
                if (dateStr) {
                    dates[`/blog/${slug}`] = new Date(dateStr).toISOString();
                }
            }
        });
    } catch (error) {
        console.warn('Could not read blog dates:', error.message);
    }

    return dates;
}

// Cache des dates blog (calculé une seule fois au build)
const blogDates = getBlogPostDates();

// Dates fixes pour les pages principales (dernière mise à jour significative)
const staticPageDates = {
    '/': '2026-03-11',
    '/consultant-seo': '2026-03-11',
    '/seo-local': '2026-03-11',
    '/audit-seo': '2026-03-11',
    '/referencement-naturel': '2026-03-11',
    '/creation-site-web': '2026-01-20',
    '/refonte-site-web': '2026-01-20',
    '/outils': '2026-03-11',
    '/outils/testeur-visibilite-ia': '2026-04-04',
    '/outils/audit-seo-gratuit': '2026-03-11',
    '/outils/extracteur-mots-cles': '2026-02-18',
    '/outils/generateur-robots-txt': '2026-03-11',
    '/outils/generateur-schema-json-ld': '2026-01-15',
    '/outils/simulateur-visibilite-locale': '2026-01-15',
    '/a-propos': '2026-03-11',
    '/contact': '2026-01-10',
    '/faq': '2026-01-15',
    '/glossaire-seo': '2026-03-10',
    '/etudes-de-cas': '2026-02-18',
    '/etudes/restaurants-cote-azur-google-2026': '2026-03-01',
    '/etude/barometre-visibilite-ia-2026': '2026-03-11',
    '/checklist-geo': '2026-03-11',
    '/partenaires': '2026-02-18',
    '/consultant-geo': '2026-03-11',
    '/consultant-ia': '2026-02-15',
    // '/audit-ia' retiré — page inexistante (404)
    '/community-manager': '2026-02-15',
    '/creation-boutique-en-ligne': '2026-01-20',
    '/laboratoire-geo/vultifrine': '2026-04-12',
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://indhack.com',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 7000,

    // ══════════════════════════════════════════════════════════════
    // EXCLURE les pages qui ne doivent PAS être indexées
    // ══════════════════════════════════════════════════════════════
    exclude: [
        // Pages techniques/privées
        '/api/*',
        '/keystatic/*',
        '/admin-login',
        '/login',
        '/dashboard',
        '/app/*',

        // Pages diagnostic clients (audits personnalisés)
        '/diagnostic/*',

        // Pages légales avec noindex
        '/cgv',
        '/confidentialite',
        '/mentions-legales',

        // Fichiers statiques
        '/icon.png',
        '/favicon.ico',
        '/*.xml',
        '/*.txt',

        // Pages d'erreur
        '/404',
        '/500',

        // Page privée Valentine
        '/pour-pauline',

        // Outil non encore lancé
        '/outils/gmb-autopilot',

        // Sous-pages audit-technique (301 vers /audit-seo, cannibalisation)
        '/consultant-seo-*/audit-technique',
        '/seo-*/audit-technique',

        // Toutes les 19 villes sont désormais indexées (avril 2026)
    ],

    // Robotstxt options optimisées avec règles GEO (Generative Engine Optimization)
    robotsTxtOptions: {
        policies: [
            // Règles par défaut pour tous les crawlers
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/*',
                    '/keystatic/*',
                    '/admin-login',
                    '/login',
                    '/dashboard',
                    '/app/*',
                    '/*.json',
                    '/diagnostic/*',
                ],
            },
            // Crawlers IA à AUTORISER (GEO - pour apparaître dans ChatGPT, Perplexity, Gemini, Claude, Mistral)
            { userAgent: 'GPTBot', allow: '/' },
            { userAgent: 'OAI-SearchBot', allow: '/' },
            { userAgent: 'ChatGPT-User', allow: '/' },
            { userAgent: 'Claude-Web', allow: '/' },
            { userAgent: 'ClaudeBot', allow: '/' },
            { userAgent: 'PerplexityBot', allow: '/' },
            { userAgent: 'Google-Extended', allow: '/' },
            { userAgent: 'Applebot-Extended', allow: '/' },
            { userAgent: 'MistralBot', allow: '/' },
            // Brave Search — backend de grounding pour Claude & Mistral Le Chat
            { userAgent: 'Bravebot', allow: '/' },
            { userAgent: 'BraveBot', allow: '/' },
            // Common Crawl — alimente les datasets de training LLM
            { userAgent: 'CCBot', allow: '/' },
            // Autres crawlers IA
            { userAgent: 'Amazonbot', allow: '/' },
            { userAgent: 'cohere-ai', allow: '/' },
            { userAgent: 'Diffbot', allow: '/' },
            { userAgent: 'Meta-ExternalAgent', allow: '/' },
            { userAgent: 'FacebookBot', allow: '/' },
            { userAgent: 'YouBot', allow: '/' },
        ],
        additionalSitemaps: [],
    },

    // Transformer pour priorités personnalisées
    transform: async (config, path) => {
        // Pages prioritaires (services principaux)
        const highPriorityPages = [
            '/',
            '/consultant-seo',
            '/seo-local',
            '/audit-seo',
            '/referencement-naturel',
            '/creation-site-web',
            '/refonte-site-web'
        ];

        // Pages villes actives (19 villes France)
        const cityPages = [
            '/consultant-seo-nice', '/consultant-seo-cannes', '/consultant-seo-antibes', '/consultant-seo-monaco', '/consultant-seo-sophia-antipolis',
            '/consultant-seo-marseille', '/consultant-seo-aix-en-provence', '/consultant-seo-juan-les-pins', '/consultant-seo-paris',
            '/consultant-seo-montpellier', '/consultant-seo-lyon', '/consultant-seo-toulouse', '/consultant-seo-bordeaux',
            '/consultant-seo-lille', '/consultant-seo-nantes', '/consultant-seo-strasbourg', '/consultant-seo-rennes',
            '/consultant-seo-grenoble', '/consultant-seo-boulogne-billancourt'
        ];

        // Pages outils SEO (valeur ajoutée forte)
        const toolPages = [
            '/outils',
            '/outils/testeur-visibilite-ia',
            '/outils/audit-seo-gratuit',
            '/outils/generateur-robots-txt',
            '/outils/generateur-schema-json-ld',
            '/outils/simulateur-visibilite-locale',
            '/outils/gmb-autopilot',
            '/outils/extracteur-mots-cles'
        ];

        let priority = config.priority;
        let changefreq = config.changefreq;

        if (highPriorityPages.includes(path)) {
            priority = 1.0;
            changefreq = 'daily';
        } else if (cityPages.includes(path)) {
            priority = 0.9;
            changefreq = 'weekly';
        } else if (path.startsWith('/blog')) {
            priority = 0.8;
            changefreq = 'weekly';
        } else if (toolPages.includes(path)) {
            // Outils SEO gratuits - haute priorité
            priority = 0.9;
            changefreq = 'weekly';
        } else if (['/consultant-geo', '/consultant-ia', '/community-manager', '/creation-boutique-en-ligne'].includes(path)) {
            priority = 0.8;
            changefreq = 'weekly';
        } else if (path === '/glossaire-seo' || path === '/etudes-de-cas' || path === '/partenaires' || path === '/checklist-geo') {
            priority = 0.8;
            changefreq = 'weekly';
        } else if (path === '/laboratoire-geo/vultifrine') {
            priority = 0.9;
            changefreq = 'daily';
        } else if (path.startsWith('/laboratoire-geo/vultifrine/')) {
            priority = 0.8;
            changefreq = 'weekly';
        } else if (path === '/contact' || path === '/a-propos') {
            priority = 0.6;
            changefreq = 'monthly';
        }

        // ══════════════════════════════════════════════════════════════
        // LASTMOD DYNAMIQUE
        // ══════════════════════════════════════════════════════════════
        let lastmod;

        // 1. Articles blog → date du frontmatter
        if (blogDates[path]) {
            lastmod = blogDates[path];
        }
        // 2. Pages avec date statique définie
        else if (staticPageDates[path]) {
            lastmod = new Date(staticPageDates[path]).toISOString();
        }
        // 3. Pages villes → date de dernière mise à jour
        else if (path.startsWith('/consultant-seo-')) {
            const hyperLocalizedCities = ['/consultant-seo-nice', '/consultant-seo-paris', '/consultant-seo-cannes', '/consultant-seo-marseille', '/consultant-seo-sophia-antipolis'];
            if (hyperLocalizedCities.includes(path)) {
                lastmod = new Date('2026-04-04').toISOString();
            } else {
                lastmod = new Date('2026-02-18').toISOString();
            }
        }
        // 4. Fallback → date du build
        else {
            lastmod = new Date().toISOString();
        }

        return {
            loc: path,
            changefreq,
            priority,
            lastmod,
        };
    },
};
