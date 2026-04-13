import Link from "next/link";
import { ArrowRight, Search, FileSearch, Globe, RefreshCw, Users, MapPin, User, ShoppingCart } from "lucide-react";

interface Service {
    title: string;
    href: string;
    description: string;
    icon: React.ReactNode;
}

const ALL_SERVICES: Record<string, Service> = {
    "consultant-seo": {
        title: "Accompagnement SEO sur-mesure",
        href: "/consultant-seo",
        description: "Expertise personnalisée",
        icon: <User className="w-5 h-5" />
    },
    "audit-seo": {
        title: "Diagnostic SEO approfondi",
        href: "/audit-seo",
        description: "Analyse technique complète",
        icon: <FileSearch className="w-5 h-5" />
    },
    "referencement-naturel": {
        title: "Stratégie SEO complète",
        href: "/referencement-naturel",
        description: "Croissance organique durable",
        icon: <Search className="w-5 h-5" />
    },
    "creation-site-web": {
        title: "Site optimisé pour Google",
        href: "/creation-site-web",
        description: "Création web SEO-first",
        icon: <Globe className="w-5 h-5" />
    },
    "refonte-site-web": {
        title: "Refonte sans perte de trafic",
        href: "/refonte-site-web",
        description: "Migration SEO sécurisée",
        icon: <RefreshCw className="w-5 h-5" />
    },
    "community-manager": {
        title: "Gestion réseaux sociaux",
        href: "/community-manager",
        description: "Animation communautaire",
        icon: <Users className="w-5 h-5" />
    },
    "seo-local": {
        title: "Référencement Google Maps",
        href: "/seo-local",
        description: "Visibilité de proximité",
        icon: <MapPin className="w-5 h-5" />
    },
    "creation-boutique-en-ligne": {
        title: "Boutique E-commerce",
        href: "/creation-boutique-en-ligne",
        description: "Vendre en ligne",
        icon: <ShoppingCart className="w-5 h-5" />
    }
};

// Mapping des services liés par page - maillage croisé complet
const RELATED_MAPPING: Record<string, string[]> = {
    "consultant-seo": ["audit-seo", "referencement-naturel", "seo-local"],
    "audit-seo": ["consultant-seo", "referencement-naturel", "seo-local"],
    "referencement-naturel": ["consultant-seo", "audit-seo", "seo-local"],
    "creation-site-web": ["creation-boutique-en-ligne", "referencement-naturel", "refonte-site-web"],
    "refonte-site-web": ["consultant-seo", "creation-site-web", "audit-seo"],
    "community-manager": ["consultant-seo", "creation-site-web", "seo-local"],
    "seo-local": ["consultant-seo", "audit-seo", "referencement-naturel"],
    "creation-boutique-en-ligne": ["creation-site-web", "referencement-naturel", "seo-local"],
    "consultant-seo-freelance": ["audit-seo", "referencement-naturel", "seo-local"]
};

interface RelatedServicesProps {
    currentService: string;
    title?: string;
}

export function RelatedServices({ currentService, title = "Services complémentaires" }: RelatedServicesProps) {
    const relatedKeys = RELATED_MAPPING[currentService] || [];
    const relatedServices = relatedKeys.map(key => ALL_SERVICES[key]).filter(Boolean);

    if (relatedServices.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                        {title}
                    </h2>
                    <p className="text-soft mt-2">
                        Optimisez votre présence digitale avec mes autres expertises
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {relatedServices.map((service) => (
                        <Link key={service.href} href={service.href}>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-sauge hover:shadow-lg transition-all group h-full">
                                <div className="w-12 h-12 bg-sauge/10 rounded-xl flex items-center justify-center text-sauge mb-4 group-hover:bg-sauge group-hover:text-white transition-all">
                                    {service.icon}
                                </div>
                                <h3 className="font-bold text-ink mb-2 group-hover:text-sauge transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-soft text-sm mb-4">
                                    {service.description}
                                </p>
                                <span className="inline-flex items-center text-sauge text-sm font-medium">
                                    Découvrir
                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
