/**
 * Source unique de l'identité Indiana Aflalo / IndHack — Phase 4.1 du
 * masterplan 2026-05-18.
 *
 * Toutes les déclarations JSON-LD du site doivent utiliser ces constantes
 * pour garantir un graph d'entités cohérent et déduplicable côté Google
 * et IA génératives. Cf. brief 4.1 :
 *
 *   « Une seule entité personne cohérente dans le JSON-LD global. »
 *
 * Si plusieurs @id Person différents coexistent sur le site (par ex.
 * `/#indiana-aflalo` vs `/a-propos#person`), les moteurs voient deux
 * personnes distinctes au lieu d'une seule entité avec plusieurs URLs.
 * Idem pour Organization.
 */

// ───────── Identifiants canoniques (URIs JSON-LD) ─────────

/** URL canonique de l'organisation IndHack. */
export const INDHACK_URL = "https://indhack.com";

/** @id canonique de l'Organization IndHack. À utiliser partout. */
export const INDHACK_ORG_ID = "https://indhack.com/#organization";

/** @id canonique de la LocalBusiness IndHack (entité avec adresse). */
export const INDHACK_LOCALBUSINESS_ID = "https://indhack.com/#localbusiness";

/** @id canonique de la Person Indiana Aflalo. Centralisé pour éviter les divergences. */
export const INDIANA_PERSON_ID = "https://indhack.com/#indiana-aflalo";

/** URL profil pour le Person.url (page À propos). */
export const INDIANA_PROFILE_URL = "https://indhack.com/a-propos";

// ───────── Identité personne ─────────

/** Nom exact d'Indiana Aflalo (ne pas modifier). */
export const INDIANA_NAME = "Indiana Aflalo";

/**
 * jobTitle unifié. Une seule formulation pour toutes les pages, sinon
 * les IA voient plusieurs métiers pour la même personne.
 */
export const INDIANA_JOB_TITLE = "Consultante SEO & Experte GEO";

/**
 * Description courte réutilisable dans les schemas Person.
 */
export const INDIANA_DESCRIPTION =
    "Consultante SEO indépendante et experte GEO basée à Nice. Créatrice des premiers outils français de test de visibilité IA.";

/**
 * URL canonique du profil LinkedIn d'Indiana. Une seule version, sans
 * slash final, pour que les moteurs puissent dédupliquer le sameAs.
 */
export const INDIANA_LINKEDIN_URL = "https://www.linkedin.com/in/indianaaflalo";

/**
 * Tableau sameAs canonique pour Person (Indiana). Les pages qui veulent
 * un sameAs Person doivent partir de ce tableau, éventuellement étendu
 * localement (par ex. YouTube spécifique à une vidéo).
 */
export const INDIANA_SAME_AS: readonly string[] = [INDIANA_LINKEDIN_URL];

// ───────── Identité marque ─────────

/** Nom canonique de la marque. */
export const INDHACK_BRAND_NAME = "IndHack";

/** Logo URL (réutilisable dans publisher.logo). */
export const INDHACK_LOGO_URL = "https://indhack.com/images/logo-indhack.webp";

/** Localisation (Nice, France). Utilisé dans LocalBusiness/areaServed. */
export const INDHACK_LOCATION = {
    addressLocality: "Nice",
    addressRegion: "Alpes-Maritimes",
    addressCountry: "FR",
    postalCode: "06000",
} as const;

// ───────── Helpers ─────────

/**
 * Renvoie un Person JSON-LD prêt à être imbriqué dans un autre schema.
 * Utilisé typiquement comme `author` dans BlogPosting, `provider` dans
 * Service, etc.
 *
 * Exemples :
 *   author: getPersonSchema()                              // version standard
 *   author: getPersonSchema({ description: "…" })          // override champ
 *   author: getPersonSchema({ sameAs: [...extras] })       // sameAs enrichi
 */
export function getPersonSchema(overrides?: {
    description?: string;
    jobTitle?: string;
    sameAs?: readonly string[];
}) {
    return {
        "@type": "Person" as const,
        "@id": INDIANA_PERSON_ID,
        name: INDIANA_NAME,
        url: INDIANA_PROFILE_URL,
        jobTitle: overrides?.jobTitle ?? INDIANA_JOB_TITLE,
        description: overrides?.description ?? INDIANA_DESCRIPTION,
        worksFor: { "@id": INDHACK_ORG_ID },
        sameAs: overrides?.sameAs ?? [...INDIANA_SAME_AS],
    };
}

/**
 * Renvoie un Organization JSON-LD minimal pour usage publisher.
 * (L'Organization complète avec founder/sameAs/etc. reste déclarée une
 * seule fois dans app/layout.tsx.)
 */
export function getOrganizationReference() {
    return {
        "@type": "Organization" as const,
        "@id": INDHACK_ORG_ID,
        name: INDHACK_BRAND_NAME,
        url: INDHACK_URL,
        logo: {
            "@type": "ImageObject" as const,
            url: INDHACK_LOGO_URL,
            width: 200,
            height: 60,
        },
    };
}
