import Link from "next/link";
import { ArrowRight, FileSearch, Search, MapPin, Globe } from "lucide-react";

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
            <div className="bg-ink text-white p-8 rounded-2xl mt-12">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-sauge/20 rounded-xl flex items-center justify-center text-sauge">
                        <FileSearch className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-white/60 text-sm">Envie d'aller plus loin ?</p>
                        <h3 className="font-bold text-lg">Audit SEO Gratuit</h3>
                    </div>
                </div>
                <p className="text-white/70 mb-6">
                    Découvrez le potentiel de croissance de votre site avec un diagnostic complet offert.
                </p>
                <Link
                    href="/audit-seo"
                    className="inline-flex items-center gap-2 bg-white text-ink px-6 py-3 rounded-full font-bold hover:bg-sauge hover:text-white transition-all"
                >
                    Demander mon audit
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-ink text-white p-8 rounded-2xl mt-12">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-sauge/20 rounded-xl flex items-center justify-center text-sauge">
                    {serviceData.icon}
                </div>
                <div>
                    <p className="text-white/60 text-sm">Envie d'aller plus loin ?</p>
                    <h3 className="font-bold text-lg">{serviceData.service}</h3>
                </div>
            </div>
            <p className="text-white/70 mb-6">
                {serviceData.cta}. Découvrez comment je peux vous accompagner dans votre stratégie digitale.
            </p>
            <Link
                href={serviceData.href}
                className="inline-flex items-center gap-2 bg-white text-ink px-6 py-3 rounded-full font-bold hover:bg-sauge hover:text-white transition-all"
            >
                Découvrir ce service
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
}
