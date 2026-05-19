import Link from "next/link";
import { ArrowRight, FileSearch, Search, MapPin, Globe, Sparkles } from "lucide-react";

// Mapping catégories blog → services
const CATEGORY_SERVICE_MAP: Record<string, { service: string; href: string; icon: React.ReactNode; cta: string }> = {
    "IA & SEO": {
        service: "Visibilité IA",
        href: "/outils/testeur-visibilite-ia",
        icon: <Search className="w-5 h-5" />,
        cta: "Testez si votre site peut être lu et cité par les IA"
    },
    "IA Entreprise": {
        service: "Conseil IA",
        href: "/consultant-ia",
        icon: <Sparkles className="w-5 h-5" />,
        cta: "Identifiez les usages IA vraiment utiles pour votre entreprise"
    },
    "GEO": {
        service: "Testeur de visibilité IA",
        href: "/outils/testeur-visibilite-ia",
        icon: <Sparkles className="w-5 h-5" />,
        cta: "Vérifiez les premiers signaux de visibilité IA de votre site"
    },
    "SEO Local": {
        service: "SEO local",
        href: "/seo-local",
        icon: <MapPin className="w-5 h-5" />,
        cta: "Structurez votre visibilité locale sur Google"
    },
    "Technique": {
        service: "Audit SEO",
        href: "/audit-seo",
        icon: <FileSearch className="w-5 h-5" />,
        cta: "Diagnostiquez votre site"
    },
    "SEO Technique": {
        service: "Audit SEO technique",
        href: "/audit-seo",
        icon: <FileSearch className="w-5 h-5" />,
        cta: "Repérez les blocages techniques qui freinent l'indexation"
    },
    "Audit": {
        service: "Audit SEO",
        href: "/audit-seo",
        icon: <FileSearch className="w-5 h-5" />,
        cta: "Transformez le diagnostic en feuille de route priorisée"
    },
    "Audit SEO": {
        service: "Audit SEO professionnel",
        href: "/audit-seo",
        icon: <FileSearch className="w-5 h-5" />,
        cta: "Obtenez une analyse exploitable de votre site"
    },
    "Stratégie": {
        service: "Accompagnement SEO",
        href: "/consultant-seo",
        icon: <Search className="w-5 h-5" />,
        cta: "Construisez une stratégie SEO priorisée"
    },
    "Guides": {
        service: "Consultante SEO",
        href: "/consultant-seo",
        icon: <Search className="w-5 h-5" />,
        cta: "Passez du guide à une méthode adaptée à votre site"
    },
    "Création de site": {
        service: "Création de site web",
        href: "/creation-site-web",
        icon: <Globe className="w-5 h-5" />,
        cta: "Créez une base technique et éditoriale pensée pour Google"
    },
    "Refonte": {
        service: "Refonte de site",
        href: "/refonte-site-web",
        icon: <Sparkles className="w-5 h-5" />,
        cta: "Migrez sans perdre votre SEO"
    },
    "Performance Web": {
        service: "Refonte SEO",
        href: "/refonte-site-web",
        icon: <Sparkles className="w-5 h-5" />,
        cta: "Corrigez les freins techniques qui pénalisent l'expérience et le crawl"
    },
    "Métier": {
        service: "Consultante SEO",
        href: "/consultant-seo",
        icon: <Search className="w-5 h-5" />,
        cta: "Clarifiez le bon niveau d'accompagnement SEO pour votre site"
    },
    "Formation": {
        service: "Ressources SEO",
        href: "/blog/devenir-consultant-seo",
        icon: <Search className="w-5 h-5" />,
        cta: "Approfondissez les compétences et méthodes du référencement"
    }
};

const DEFAULT_SERVICE = {
    service: "Accompagnement SEO",
    href: "/consultant-seo",
    icon: <Search className="w-5 h-5" />,
    cta: "Identifiez les leviers SEO prioritaires pour votre site"
};

interface BlogServiceCTAProps {
    category: string;
}

export function BlogServiceCTA({ category }: BlogServiceCTAProps) {
    const serviceData = CATEGORY_SERVICE_MAP[category] ?? DEFAULT_SERVICE;

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
