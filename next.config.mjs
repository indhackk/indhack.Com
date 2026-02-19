/** @type {import('next').NextConfig} */
const nextConfig = {
    // ══════════════════════════════════════════════════════════════
    // OPTIMISATIONS PERFORMANCE - Cible 100/100 PageSpeed
    // ══════════════════════════════════════════════════════════════

    // Supprime console.log en production
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

    // Optimisations expérimentales
    experimental: {
        // Optimise le CSS (réduit ~15 KiB selon PageSpeed)
        optimizeCss: true,
    },

    // Tree-shaking agressif pour les gros packages
    modularizeImports: {
        'lucide-react': {
            transform: 'lucide-react/dist/esm/icons/{{member}}',
        },
    },

    // ══════════════════════════════════════════════════════════════
    // REDIRECTIONS 301 - Nettoyage des anciennes URLs WordPress
    // ══════════════════════════════════════════════════════════════
    async redirects() {
        return [
            // ══════════════════════════════════════════════════════════════
            // DE-CANNIBALISATION : Pages fusionnées
            // ══════════════════════════════════════════════════════════════
            {
                source: '/consultant-seo-freelance',
                destination: '/consultant-seo',
                permanent: true, // 301 - fusion des pages qui ciblent le même mot-clé
            },
            // Anciennes URLs WordPress → Accueil
            {
                source: '/index.html',
                destination: '/',
                permanent: true, // 301
            },
            {
                source: '/wp-admin/:path*',
                destination: '/',
                permanent: true,
            },
            {
                source: '/wp-login.php',
                destination: '/',
                permanent: true,
            },
            {
                source: '/wp-content/:path*',
                destination: '/',
                permanent: true,
            },
            {
                source: '/wp-includes/:path*',
                destination: '/',
                permanent: true,
            },
            // Ancienne page solutions → Services
            {
                source: '/solutions',
                destination: '/referencement-naturel',
                permanent: true,
            },
            // WordPress feeds → Blog
            {
                source: '/feed',
                destination: '/blog',
                permanent: true,
            },
            {
                source: '/feed/:path*',
                destination: '/blog',
                permanent: true,
            },
            {
                source: '/comments/feed',
                destination: '/blog',
                permanent: true,
            },
            {
                source: '/comments/feed/:path*',
                destination: '/blog',
                permanent: true,
            },
            // WordPress search URLs → Accueil
            {
                source: '/search/:path*',
                destination: '/',
                permanent: true,
            },
            // Ancienne URL about → a-propos
            {
                source: '/about',
                destination: '/a-propos',
                permanent: true,
            },
            // Ancienne page tarifs → referencement-naturel
            {
                source: '/tarifs',
                destination: '/referencement-naturel',
                permanent: true,
            },
            // Page generate (ancienne fonctionnalité) → outils
            {
                source: '/generate',
                destination: '/outils',
                permanent: true,
            },
            // Ancien /tools/ → /outils/
            {
                source: '/tools/:path*',
                destination: '/outils/:path*',
                permanent: true,
            },
            // Anciens outils API-only → audit-seo-gratuit (outil de remplacement)
            {
                source: '/outils/checker-accessibilite',
                destination: '/outils/audit-seo-gratuit',
                permanent: true,
            },
            {
                source: '/outils/analyseur-vitesse-site',
                destination: '/outils/audit-seo-gratuit',
                permanent: true,
            },
            // /outils/extracteur-mots-cles - SUPPRIMÉ : page recréée
            // ══════════════════════════════════════════════════════════════
            // REDIRECTIONS VILLES SUPPRIMEES → Villes proches
            // ══════════════════════════════════════════════════════════════
            {
                source: '/consultant-seo-dijon',
                destination: '/consultant-seo-lyon',
                permanent: true,
            },
            {
                source: '/consultant-seo-toulon',
                destination: '/consultant-seo-marseille',
                permanent: true,
            },
            {
                source: '/consultant-seo-rouen',
                destination: '/consultant-seo-paris',
                permanent: true,
            },
            // ══════════════════════════════════════════════════════════════
            // REDIRECTIONS SEO VILLES : /seo-[ville] → /consultant-seo-[ville]
            // ══════════════════════════════════════════════════════════════
            {
                source: '/seo-nice',
                destination: '/consultant-seo-nice',
                permanent: true,
            },
            {
                source: '/seo-paris',
                destination: '/consultant-seo-paris',
                permanent: true,
            },
            {
                source: '/seo-cannes',
                destination: '/consultant-seo-cannes',
                permanent: true,
            },
            {
                source: '/seo-lyon',
                destination: '/consultant-seo-lyon',
                permanent: true,
            },
            {
                source: '/seo-marseille',
                destination: '/consultant-seo-marseille',
                permanent: true,
            },
            {
                source: '/seo-toulouse',
                destination: '/consultant-seo-toulouse',
                permanent: true,
            },
            {
                source: '/seo-bordeaux',
                destination: '/consultant-seo-bordeaux',
                permanent: true,
            },
            {
                source: '/seo-montpellier',
                destination: '/consultant-seo-montpellier',
                permanent: true,
            },
            {
                source: '/seo-nantes',
                destination: '/consultant-seo-nantes',
                permanent: true,
            },
            {
                source: '/seo-lille',
                destination: '/consultant-seo-lille',
                permanent: true,
            },
            {
                source: '/seo-strasbourg',
                destination: '/consultant-seo-strasbourg',
                permanent: true,
            },
            {
                source: '/seo-rennes',
                destination: '/consultant-seo-rennes',
                permanent: true,
            },
            {
                source: '/seo-grenoble',
                destination: '/consultant-seo-grenoble',
                permanent: true,
            },
            {
                source: '/seo-antibes',
                destination: '/consultant-seo-antibes',
                permanent: true,
            },
            {
                source: '/seo-monaco',
                destination: '/consultant-seo-monaco',
                permanent: true,
            },
            {
                source: '/seo-sophia-antipolis',
                destination: '/consultant-seo-sophia-antipolis',
                permanent: true,
            },
            {
                source: '/seo-aix-en-provence',
                destination: '/consultant-seo-aix-en-provence',
                permanent: true,
            },
            {
                source: '/seo-boulogne-billancourt',
                destination: '/consultant-seo-boulogne-billancourt',
                permanent: true,
            },
            // Sous-pages des villes (cocon sémantique)
            {
                source: '/seo-:city/:service',
                destination: '/consultant-seo-:city/:service',
                permanent: true,
            },
        ];
    },

    images: {
        // Formats modernes pour LCP optimal (WebP/AVIF)
        formats: ['image/avif', 'image/webp'],
        // Cache images optimisées pendant 1 an
        minimumCacheTTL: 31536000,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
            },
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "api.dicebear.com",
            },
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },

    // Headers de sécurité
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    // Protection XSS
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    // Empêche le sniffing MIME
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    // Empêche le clickjacking
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                    // Referrer Policy
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    // Permissions Policy
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
                    },
                    // Strict Transport Security (HSTS) - with preload
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload",
                    },
                    // Cross-Origin-Opener-Policy (COOP)
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin-allow-popups",
                    },
                    // Content Security Policy - Hardened (with AdSense support)
                    {
                        key: "Content-Security-Policy",
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                            "font-src 'self' https://fonts.gstatic.com",
                            "img-src 'self' data: blob: https://images.unsplash.com https://images.pexels.com https://www.google-analytics.com https://www.googletagmanager.com https://api.dicebear.com",
                            "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://formsubmit.co https://api.web3forms.com",
                            "frame-src 'self' https://www.google.com",
                            "frame-ancestors 'self'",
                            "form-action 'self' https://formsubmit.co https://api.web3forms.com",
                            "base-uri 'self'",
                            "object-src 'none'",
                            "upgrade-insecure-requests",
                        ].join("; "),
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
