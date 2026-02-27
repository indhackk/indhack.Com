"use client";

import Link from "next/link";
import { ArrowRight, FileText, Wrench, MapPin } from "lucide-react";

// Mapping des relations sémantiques par tag/thème
const CONTENT_MAP: Record<string, { title: string; href: string; type: 'article' | 'tool' | 'service' }[]> = {
  'refonte': [
    { title: "Checklist SEO refonte de site", href: "/blog/refonte-site-web-sans-perdre-seo", type: 'article' },
    { title: "Service refonte de site", href: "/refonte-site-web", type: 'service' },
    { title: "Audit SEO gratuit", href: "/outils/audit-seo-gratuit", type: 'tool' },
  ],
  'audit': [
    { title: "Ce que contient un rapport d'audit", href: "/blog/contenu-rapport-audit-seo", type: 'article' },
    { title: "L'importance de l'audit SEO", href: "/blog/importance-audit-seo", type: 'article' },
    { title: "Audit SEO gratuit", href: "/outils/audit-seo-gratuit", type: 'tool' },
    { title: "Service audit SEO", href: "/audit-seo", type: 'service' },
  ],
  'visibilite-ia': [
    { title: "GEO : apparaître sur ChatGPT", href: "/blog/geo-comment-apparaitre-chatgpt-2026", type: 'article' },
    { title: "Testeur visibilité IA", href: "/outils/testeur-visibilite-ia", type: 'tool' },
    { title: "Générateur robots.txt", href: "/outils/generateur-robots-txt", type: 'tool' },
  ],
  'seo-local': [
    { title: "SEO local à Nice", href: "/blog/seo-local-nice", type: 'article' },
    { title: "Guide Google Business Profile", href: "/blog/google-business-profile-guide-complet", type: 'article' },
    { title: "Simulateur visibilité locale", href: "/outils/simulateur-visibilite-locale", type: 'tool' },
    { title: "Service SEO local", href: "/seo-local", type: 'service' },
  ],
  'google-maps': [
    { title: "Voler les clients sur Google Maps", href: "/blog/google-maps-voler-clients-concurrents", type: 'article' },
    { title: "Guide Google Business Profile", href: "/blog/google-business-profile-guide-complet", type: 'article' },
    { title: "Simulateur visibilité locale", href: "/outils/simulateur-visibilite-locale", type: 'tool' },
  ],
  'consultant-seo': [
    { title: "Pourquoi un consultant SEO ?", href: "/blog/pourquoi-consultant-seo", type: 'article' },
    { title: "Salaire consultant SEO", href: "/blog/salaire-consultant-seo", type: 'article' },
    { title: "Service consultant SEO", href: "/consultant-seo", type: 'service' },
  ],
  'outils-seo': [
    { title: "Audit SEO gratuit", href: "/outils/audit-seo-gratuit", type: 'tool' },
    { title: "Générateur Schema JSON-LD", href: "/outils/generateur-schema-json-ld", type: 'tool' },
    { title: "Extracteur de mots-clés", href: "/outils/extracteur-mots-cles", type: 'tool' },
    { title: "Tous les outils SEO", href: "/outils", type: 'service' },
  ],
  'creation-site': [
    { title: "Comment créer un site visible", href: "/blog/comment-creer-site-visible-google", type: 'article' },
    { title: "Checklist SEO refonte", href: "/blog/refonte-site-web-sans-perdre-seo", type: 'article' },
    { title: "Service création de site", href: "/creation-site-web", type: 'service' },
  ],
  'checklist': [
    { title: "Checklist SEO 2026", href: "/blog/checklist-seo-2026", type: 'article' },
    { title: "Checklist SEO refonte", href: "/blog/refonte-site-web-sans-perdre-seo", type: 'article' },
    { title: "Audit SEO gratuit", href: "/outils/audit-seo-gratuit", type: 'tool' },
  ],
  'technique': [
    { title: "Checklist SEO 2026", href: "/blog/checklist-seo-2026", type: 'article' },
    { title: "Erreurs SEO coûteuses", href: "/blog/audit-seo-erreurs-qui-coutent-cher", type: 'article' },
    { title: "Audit SEO gratuit", href: "/outils/audit-seo-gratuit", type: 'tool' },
  ],
};

interface RelatedContentProps {
  /** Tags/thèmes pour filtrer le contenu lié */
  tags: string[];
  /** URL de la page actuelle (pour éviter les auto-liens) */
  currentUrl?: string;
  /** Nombre maximum d'items à afficher */
  maxItems?: number;
  /** Titre de la section */
  title?: string;
  /** Variante d'affichage */
  variant?: 'default' | 'compact' | 'inline';
}

export function RelatedContent({
  tags,
  currentUrl,
  maxItems = 3,
  title = "Sur le même sujet",
  variant = 'default',
}: RelatedContentProps) {
  // Collecter tous les contenus liés aux tags fournis
  const allRelated = tags.flatMap(tag => CONTENT_MAP[tag] || []);

  // Dédupliquer par href et exclure la page actuelle
  const uniqueRelated = allRelated.reduce((acc, item) => {
    const normalizedHref = item.href.replace(/\/$/, '');
    const normalizedCurrent = currentUrl?.replace(/\/$/, '');

    if (normalizedHref !== normalizedCurrent && !acc.find(i => i.href === item.href)) {
      acc.push(item);
    }
    return acc;
  }, [] as typeof allRelated);

  // Limiter le nombre d'items
  const displayedItems = uniqueRelated.slice(0, maxItems);

  if (displayedItems.length === 0) return null;

  const getIcon = (type: 'article' | 'tool' | 'service') => {
    switch (type) {
      case 'article': return <FileText className="w-4 h-4" />;
      case 'tool': return <Wrench className="w-4 h-4" />;
      case 'service': return <MapPin className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: 'article' | 'tool' | 'service') => {
    switch (type) {
      case 'article': return 'Article';
      case 'tool': return 'Outil';
      case 'service': return 'Service';
    }
  };

  // Variante inline (liens simples dans le texte)
  if (variant === 'inline') {
    return (
      <div className="my-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <p className="text-sm text-soft">
          <strong className="text-ink">{title} :</strong>{' '}
          {displayedItems.map((item, i) => (
            <span key={item.href}>
              <Link href={item.href} className="text-sauge hover:underline">
                {item.title}
              </Link>
              {i < displayedItems.length - 1 && (i === displayedItems.length - 2 ? ' et ' : ', ')}
            </span>
          ))}
        </p>
      </div>
    );
  }

  // Variante compact (liste simple)
  if (variant === 'compact') {
    return (
      <div className="my-6">
        <h4 className="text-sm font-bold text-ink mb-3">{title}</h4>
        <ul className="space-y-2">
          {displayedItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-sauge hover:underline inline-flex items-center gap-2"
              >
                {getIcon(item.type)}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Variante default (cartes)
  return (
    <section className="my-10 py-8 border-t border-gray-100">
      <h3 className="text-lg font-heading font-bold text-ink mb-6">{title}</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {displayedItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-sauge/30 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2 text-xs text-soft mb-2">
              {getIcon(item.type)}
              <span>{getTypeLabel(item.type)}</span>
            </div>
            <h4 className="font-bold text-sm text-ink group-hover:text-sauge transition-colors">
              {item.title}
            </h4>
            <span className="mt-2 inline-flex items-center text-xs font-bold text-sauge">
              Lire
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Export du mapping pour utilisation externe
export { CONTENT_MAP };
