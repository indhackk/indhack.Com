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
    ],

    // Robotstxt options optimisées
    robotsTxtOptions: {
        policies: [
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
                ],
            },
            // Bloquer les bots agressifs
            {
                userAgent: 'AhrefsBot',
                disallow: '/',
            },
            {
                userAgent: 'SemrushBot',
                disallow: '/',
            },
        ],
        additionalSitemaps: [],
    },

    // Transformer pour priorités personnalisées
    transform: async (config, path) => {
        // Pages prioritaires (services principaux)
        const highPriorityPages = [
            '/',
            '/seo-local',
            '/audit-seo',
            '/referencement-naturel',
            '/creation-site-web',
            '/refonte-site-web',
            '/community-manager'
        ];

        // Pages villes (cocoon SEO)
        const cityPages = [
            '/seo-nice', '/seo-cannes', '/seo-antibes', '/seo-monaco', '/seo-sophia-antipolis',
            '/seo-marseille', '/seo-aix-en-provence', '/seo-paris', '/seo-lyon', '/seo-bordeaux',
            '/seo-toulouse', '/seo-rennes', '/seo-nantes', '/seo-lille', '/seo-montpellier',
            '/seo-strasbourg', '/seo-grenoble', '/seo-boulogne-billancourt'
        ];

        // Pages outils (valeur ajoutée)
        const toolPages = ['/tools/gmb-autopilot'];

        let priority = config.priority;
        let changefreq = config.changefreq;

        if (highPriorityPages.includes(path)) {
            priority = 1.0;
            changefreq = 'daily';
        } else if (cityPages.includes(path)) {
            priority = 0.9;
            changefreq = 'weekly';
        } else if (path.includes('/audit-technique')) {
            // Sous-pages des villes
            priority = 0.8;
            changefreq = 'weekly';
        } else if (path.startsWith('/blog')) {
            priority = 0.8;
            changefreq = 'weekly';
        } else if (toolPages.includes(path)) {
            priority = 0.85;
            changefreq = 'weekly';
        } else if (path === '/contact' || path === '/a-propos') {
            priority = 0.6;
            changefreq = 'monthly';
        }

        return {
            loc: path,
            changefreq,
            priority,
            lastmod: new Date().toISOString(),
        };
    },
};
