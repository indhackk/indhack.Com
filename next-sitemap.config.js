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
                    '/diagnostic/*',
                ],
            },
            // Note: Ne plus bloquer les bots SEO pour le tracking
            // AhrefsBot et SemrushBot sont maintenant autorisés
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

        // Pages villes (cocoon SEO) - nouvelles URLs
        const cityPages = [
            '/consultant-seo-nice', '/consultant-seo-cannes', '/consultant-seo-antibes', '/consultant-seo-monaco', '/consultant-seo-sophia-antipolis',
            '/consultant-seo-marseille', '/consultant-seo-aix-en-provence', '/consultant-seo-paris', '/consultant-seo-lyon', '/consultant-seo-bordeaux',
            '/consultant-seo-toulouse', '/consultant-seo-rennes', '/consultant-seo-nantes', '/consultant-seo-lille', '/consultant-seo-montpellier',
            '/consultant-seo-strasbourg', '/consultant-seo-grenoble', '/consultant-seo-boulogne-billancourt'
        ];

        // Pages outils SEO (valeur ajoutée forte)
        const toolPages = [
            '/outils',
            '/outils/testeur-visibilite-ia',
            '/outils/audit-seo-gratuit',
            '/outils/generateur-robots-txt',
            '/outils/generateur-schema-json-ld',
            '/outils/simulateur-visibilite-locale',
            '/tools/gmb-autopilot'
        ];

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
            // Outils SEO gratuits - haute priorité
            priority = 0.9;
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
