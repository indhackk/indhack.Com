/** @type {import('next').NextConfig} */
const nextConfig = {
    // ══════════════════════════════════════════════════════════════
    // REDIRECTIONS 301 - Nettoyage des anciennes URLs WordPress
    // ══════════════════════════════════════════════════════════════
    async redirects() {
        return [
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
        ];
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
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
                    // Strict Transport Security (HSTS)
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=31536000; includeSubDomains",
                    },
                    // Content Security Policy
                    {
                        key: "Content-Security-Policy",
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                            "font-src 'self' https://fonts.gstatic.com",
                            "img-src 'self' data: blob: https://images.unsplash.com https://www.google-analytics.com https://www.googletagmanager.com https://api.dicebear.com",
                            "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://formsubmit.co https://api.web3forms.com",
                            "frame-ancestors 'self'",
                            "form-action 'self' https://formsubmit.co https://api.web3forms.com",
                            "base-uri 'self'",
                            "object-src 'none'",
                        ].join("; "),
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
