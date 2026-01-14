/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://indhack.com',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 7000,

    // Exclure les routes techniques
    exclude: [
        '/api/*',
        '/keystatic/*',
    ],

    // Robotstxt options
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/*', '/keystatic/*'],
            },
        ],
        additionalSitemaps: [],
    },

    // Transformer pour priorités personnalisées
    transform: async (config, path) => {
        // Pages prioritaires
        const highPriorityPages = ['/', '/seo-local', '/audit-seo', '/referencement-naturel', '/creation-site-web', '/refonte-site-web', '/community-manager'];
        const cityPages = [
            '/seo-nice', '/seo-cannes', '/seo-antibes', '/seo-monaco', '/seo-sophia-antipolis',
            '/seo-marseille', '/seo-aix-en-provence', '/seo-paris', '/seo-lyon', '/seo-bordeaux',
            '/seo-toulouse', '/seo-rennes', '/seo-nantes', '/seo-lille', '/seo-montpellier',
            '/seo-strasbourg', '/seo-grenoble'
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
        }

        return {
            loc: path,
            changefreq,
            priority,
            lastmod: new Date().toISOString(),
        };
    },
};
