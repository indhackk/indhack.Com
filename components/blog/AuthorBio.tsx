import Image from "next/image";
import Link from "next/link";
import { Linkedin, Award, MapPin } from "lucide-react";

/**
 * Bio auteur affichée en bas de chaque article du blog.
 *
 * Sert deux objectifs distincts :
 * 1) E-E-A-T (Experience / Expertise / Authoritativeness / Trustworthiness)
 *    pour les Quality Raters Google et les LLM. L'auteur doit être visible,
 *    nommé, daté, lié à une page À propos crawlable, à un LinkedIn vérifiable.
 * 2) Conversion. Un lecteur qui finit un article a besoin d'un chemin clair
 *    vers les services. La bio le pousse doucement vers /consultant-seo,
 *    /consultant-geo ou /a-propos selon son intérêt.
 *
 * Le component est volontairement simple, sans dépendance, sans état.
 * Pas de "use client" : il peut être rendu côté serveur dans le template
 * dynamique du blog.
 */
export function AuthorBio() {
    return (
        <aside
            className="mt-16 mb-12 rounded-3xl border border-line bg-gray-50 p-6 sm:p-8"
            aria-label="Auteure de l'article"
        >
            <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Photo */}
                <div className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-sauge/30 shadow-sm">
                    <Image
                        src="/images/indiana-aflalo-consultante-seo.webp"
                        alt="Indiana Aflalo, consultante SEO et GEO IndHack"
                        fill
                        sizes="96px"
                        className="object-cover"
                    />
                </div>

                {/* Bloc texte */}
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-sauge mb-2">
                        À propos de l&apos;auteure
                    </p>
                    <h2 className="text-xl sm:text-2xl font-heading font-bold text-ink mb-2">
                        Indiana Aflalo
                    </h2>
                    <p className="text-sm text-soft mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-sauge" aria-hidden="true" />
                            Consultante SEO et GEO indépendante, Nice
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-sauge" aria-hidden="true" />
                            Lauréate du concours GEO GreenRed 2026
                        </span>
                    </p>
                    <p className="text-sm sm:text-base text-soft leading-relaxed mb-4">
                        J&apos;accompagne les entreprises qui veulent vraiment ranker, sur Google
                        et désormais dans les IA génératives (ChatGPT, Claude, Perplexity, Gemini,
                        Mistral). Spécialisée en SEO technique, visibilité IA et création ou refonte
                        de sites pensés pour la performance et la citabilité.
                    </p>

                    {/* Liens internes — entité + services + contact externe */}
                    <div className="flex flex-wrap gap-3 text-sm">
                        <Link
                            href="/a-propos"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-line text-ink font-semibold hover:border-sauge hover:text-sauge transition-colors"
                        >
                            Mon parcours
                        </Link>
                        <Link
                            href="/consultant-seo"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-line text-ink font-semibold hover:border-sauge hover:text-sauge transition-colors"
                        >
                            Consultante SEO
                        </Link>
                        <Link
                            href="/consultant-geo"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-line text-ink font-semibold hover:border-sauge hover:text-sauge transition-colors"
                        >
                            Consultante GEO
                        </Link>
                        <a
                            href="https://www.linkedin.com/in/indianaaflalo"
                            target="_blank"
                            rel="noopener noreferrer me"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-line text-ink font-semibold hover:border-sauge hover:text-sauge transition-colors"
                        >
                            <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
}
