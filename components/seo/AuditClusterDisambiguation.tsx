import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Bloc « Vous cherchez plutôt... » à insérer sur les 4 pages du cluster
 * « audit SEO » pour clarifier l'intention et éviter la cannibalisation
 * entre :
 *
 *   - /audit-seo (prestation pro)
 *   - /outils/audit-seo-gratuit (outil gratuit)
 *   - /blog/audit-seo-approfondi-guide-complet (méthode)
 *   - /blog/contenu-rapport-audit-seo (modèle PDF)
 *
 * Chaque page exclut son propre rôle via la prop `exclude` et propose
 * les 3 autres. Les ancres sont volontairement spécifiques pour
 * différencier les intentions de recherche (cf. phase 2 du masterplan
 * 2026-05-18).
 */

export type AuditClusterId = "prestation" | "outil" | "methode" | "modele";

const CLUSTER_ITEMS: Record<AuditClusterId, {
    href: string;
    anchor: string;
    description: string;
}> = {
    prestation: {
        href: "/audit-seo",
        anchor: "Prestation d'audit SEO professionnel",
        description: "Un diagnostic complet réalisé par moi, livré avec une roadmap priorisée par impact business.",
    },
    outil: {
        href: "/outils/audit-seo-gratuit",
        anchor: "Outil d'audit SEO gratuit",
        description: "Un score automatique en 30 secondes, sans inscription, pour une première lecture rapide.",
    },
    methode: {
        href: "/blog/audit-seo-approfondi-guide-complet",
        anchor: "Méthode d'audit SEO approfondi",
        description: "Les 12 étapes que les agences sautent, expliquées pas à pas, pour comprendre comment je travaille.",
    },
    modele: {
        href: "/blog/contenu-rapport-audit-seo",
        anchor: "Modèle de rapport d'audit SEO PDF",
        description: "Un exemple commenté et une grille d'évaluation à télécharger pour structurer votre propre rapport.",
    },
};

const ORDER: AuditClusterId[] = ["prestation", "outil", "methode", "modele"];

export function AuditClusterDisambiguation({
    exclude,
    variant = "light",
}: {
    exclude: AuditClusterId;
    /**
     * `light` : carte claire sur fond clair (pour pages prose/blog/service).
     * `dark`  : carte translucide sur fond sombre (pour pages outil bg-ink).
     */
    variant?: "light" | "dark";
}) {
    const others = ORDER.filter((id) => id !== exclude).map((id) => CLUSTER_ITEMS[id]);

    const isDark = variant === "dark";

    return (
        <section
            aria-labelledby="audit-cluster-disambiguation-title"
            className={
                isDark
                    ? "my-12 bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-sm"
                    : "my-12 bg-fond-clair border border-line rounded-2xl p-6 lg:p-8"
            }
        >
            <h2
                id="audit-cluster-disambiguation-title"
                className={
                    isDark
                        ? "text-xl font-heading font-bold text-white mb-2"
                        : "text-xl font-heading font-bold text-ink mb-2"
                }
            >
                Vous cherchez plutôt&nbsp;?
            </h2>
            <p className={isDark ? "text-sm text-soft-light mb-5" : "text-sm text-soft mb-5"}>
                Cette page n&apos;est peut-être pas exactement ce qu&apos;il vous faut. Voici les trois autres entrées du cluster audit SEO.
            </p>
            <ul className="space-y-3">
                {others.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className={
                                isDark
                                    ? "group flex items-start gap-3 rounded-lg p-3 hover:bg-white/5 transition-colors"
                                    : "group flex items-start gap-3 rounded-lg p-3 hover:bg-white transition-colors"
                            }
                        >
                            <ArrowRight
                                className={
                                    isDark
                                        ? "w-5 h-5 text-sauge-light flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform"
                                        : "w-5 h-5 text-sauge flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform"
                                }
                                aria-hidden="true"
                            />
                            <div>
                                <div
                                    className={
                                        isDark
                                            ? "font-semibold text-white group-hover:text-sauge-light"
                                            : "font-semibold text-ink group-hover:text-sauge"
                                    }
                                >
                                    {item.anchor}
                                </div>
                                <p
                                    className={
                                        isDark
                                            ? "text-sm text-soft-light mt-0.5"
                                            : "text-sm text-soft mt-0.5"
                                    }
                                >
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
