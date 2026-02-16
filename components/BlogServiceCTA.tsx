import Link from "next/link";
import { ArrowRight, FileSearch, Search, MapPin, Globe, Sparkles } from "lucide-react";

// Mapping catégories blog → services
const CATEGORY_SERVICE_MAP: Record<string, { service: string; href: string; icon: React.ReactNode; cta: string }> = {
    "IA & SEO": {
        service: "Référencement Naturel",
        href: "/referencement-naturel",
        icon: <Search className="w-5 h-5" />,
        cta: "Boostez votre visibilité Google"
    },
    "SEO Local": {
        service: "SEO Local",
        href: "/seo-local",
        icon: <MapPin className="w-5 h-5" />,
        cta: "Dominez votre marché local"
    },
    "Technique": {
        service: "Audit SEO",
        href: "/audit-seo",
        icon: <FileSearch className="w-5 h-5" />,
        cta: "Diagnostiquez votre site"
    },
    "Stratégie": {
        service: "Création de Site",
        href: "/creation-site-web",
        icon: <Globe className="w-5 h-5" />,
        cta: "Créez un site performant"
    },
    "Refonte": {
        service: "Refonte de Site",
        href: "/refonte-site-web",
        icon: <Sparkles className="w-5 h-5" />,
        cta: "Migrez sans perdre votre SEO"
    },
    "Métier": {
        service: "Consultant SEO",
        href: "/consultant-seo",
        icon: <Search className="w-5 h-5" />,
        cta: "Un expert dédié à votre croissance"
    }
};

interface BlogServiceCTAProps {
    category: string;
}

export function BlogServiceCTA({ category }: BlogServiceCTAProps) {
    const serviceData = CATEGORY_SERVICE_MAP[category];

    if (!serviceData) {
        // Fallback vers audit-seo si catégorie inconnue
        return (
            <div className="not-prose mt-12 p-8 bg-gradient-to-br from-sauge to-ink rounded-2xl border border-sauge/20">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0">
                        <FileSearch className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-white/70 text-sm font-medium mb-1">Passez à l'action</p>
                        <h3 className="text-white text-xl font-bold mb-2">Audit SEO Gratuit</h3>
                        <p className="text-white/80 text-sm">
                            Découvrez le potentiel de croissance de votre site avec un diagnostic complet offert.
                        </p>
                    </div>
                    <Link
                        href="/audit-seo"
                        className="inline-flex items-center justify-center gap-2 bg-white text-ink px-6 py-3 rounded-full font-bold hover:bg-fond-clair hover:scale-105 transition-all shadow-lg flex-shrink-0"
                    >
                        Demander mon audit
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="not-prose mt-12 p-8 bg-gradient-to-br from-sauge to-ink rounded-2xl border border-sauge/20">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white">{serviceData.icon}</span>
                </div>
                <div className="flex-1">
                    <p className="text-white/70 text-sm font-medium mb-1">Passez à l'action</p>
                    <h3 className="text-white text-xl font-bold mb-2">{serviceData.service}</h3>
                    <p className="text-white/80 text-sm">
                        {serviceData.cta}. Découvrez comment je peux vous accompagner.
                    </p>
                </div>
                <Link
                    href={serviceData.href}
                    className="inline-flex items-center justify-center gap-2 bg-white text-ink px-6 py-3 rounded-full font-bold hover:bg-fond-clair hover:scale-105 transition-all shadow-lg flex-shrink-0"
                >
                    Découvrir
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
