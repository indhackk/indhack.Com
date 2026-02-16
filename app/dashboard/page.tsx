import Link from "next/link";
import { ArrowRight, FileText, Globe, Settings, MapPin, Layout } from "lucide-react";

export const metadata = {
    title: "Tableau de Bord",
    robots: "noindex, nofollow" // On cache cette page de Google
};

export default function DashboardPage() {
    // Liste manuelle de tes pages pour avoir une vue d'ensemble propre
    const pages = [
        { name: "Accueil", path: "/", type: "main" },
        { name: "À Propos", path: "/a-propos", type: "main" },
        { name: "Contact", path: "/contact", type: "main" },
        { name: "Services", path: "/services", type: "main" },
        { name: "Blog", path: "/blog", type: "content" },
        { name: "Mentions Légales", path: "/mentions-legales", type: "legal" },
        { name: "CGV", path: "/cgv", type: "legal" },
    ];

    const landingPages = [
        { name: "Consultant SEO Nice", path: "/consultant-seo-nice" },
        { name: "Consultant SEO Cannes", path: "/consultant-seo-cannes" },
        { name: "Consultant SEO Antibes", path: "/consultant-seo-antibes" },
        { name: "Audit Gratuit", path: "/audit-seo-gratuit" },
        { name: "Refonte Site Web", path: "/refonte-site-web" },
        { name: "Création Site Web", path: "/creation-site-web" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-ink mb-4">Control Room 🚀</h1>
                    <p className="text-xl text-soft">Une vue d'ensemble de toutes les pages de ton site.</p>
                </header>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* PAGES PRINCIPALES */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-ink">
                            <Globe className="w-6 h-6 text-sauge" /> Pages Principales
                        </h2>
                        <ul className="space-y-3">
                            {pages.map((page) => (
                                <li key={page.path}>
                                    <Link href={page.path} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 group transition-colors">
                                        <span className="font-medium text-ink">{page.name}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-400 font-mono">{page.path}</span>
                                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-sauge" />
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* LANDING PAGES SEO */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-ink">
                            <MapPin className="w-6 h-6 text-orange-500" /> Pages Locales & Offres
                        </h2>
                        <ul className="space-y-3">
                            {landingPages.map((page) => (
                                <li key={page.path}>
                                    <Link href={page.path} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 group transition-colors">
                                        <span className="font-medium text-ink">{page.name}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-400 font-mono">{page.path}</span>
                                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500" />
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <button className="w-full py-3 bg-ink text-white rounded-lg font-bold opacity-50 cursor-not-allowed text-sm">
                                + Ajouter une nouvelle page (Bientôt disponible)
                            </button>
                        </div>
                    </div>
                </div>

                {/* VISUALISATION STRUCTURE */}
                <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-ink">
                        <Layout className="w-6 h-6 text-blue-500" /> Structure du Site
                    </h2>
                    <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm text-gray-600">
                        indhack.com<br />
                        ├── / (Home)<br />
                        ├── /a-propos<br />
                        ├── /blog (Liste des articles)<br />
                        │   └── /blog/[slug] (Article individuel)<br />
                        └── /contact
                    </div>
                </div>
            </div>
        </div>
    );
}
