/**
 * Parser robots.txt propre, par groupe user-agent.
 *
 * Conçu pour remplacer le parsing naïf (`text.includes("disallow: /")`) qui
 * matchait à tort `Disallow: /api/*` comme "site entièrement bloqué".
 *
 * Convention robots.txt :
 *   - Les directives sont groupées par bloc, chaque bloc commençant par
 *     une (ou plusieurs) ligne `User-agent: <agent>`.
 *   - Un bloc se termine implicitement au prochain `User-agent:` ou à la
 *     fin du fichier.
 *   - `Allow:` et `Disallow:` s'appliquent uniquement à l'agent courant.
 *   - Si un agent a son propre bloc, les règles `User-agent: *` ne
 *     s'appliquent PAS à lui (override complet).
 */

export type CrawlerStatus = "allowed" | "blocked" | "not_mentioned";

export interface RobotsGroup {
    agents: string[]; // ex: ["*"], ["gptbot"], ["*", "gptbot"] (groupe partagé)
    allows: string[]; // paths after `Allow:`
    disallows: string[]; // paths after `Disallow:`
}

/**
 * Parse un robots.txt en groupes user-agent. Tolérant : ignore les commentaires,
 * lignes vides, et casse user-agent en lowercase.
 */
export function parseRobotsTxt(content: string): RobotsGroup[] {
    if (!content || typeof content !== "string") return [];

    const groups: RobotsGroup[] = [];
    let currentGroup: RobotsGroup | null = null;
    let inAgentBlock = false; // true entre la déclaration des user-agents et la première directive

    for (const rawLine of content.split(/\r?\n/)) {
        // strip commentaire en fin de ligne et trim
        const line = rawLine.split("#")[0].trim();
        if (!line) continue;

        const colonIdx = line.indexOf(":");
        if (colonIdx === -1) continue;

        const directive = line.slice(0, colonIdx).trim().toLowerCase();
        const value = line.slice(colonIdx + 1).trim();

        if (directive === "user-agent") {
            const agent = value.toLowerCase();
            if (inAgentBlock && currentGroup) {
                // On enchaîne plusieurs User-agent: avant les directives → groupe partagé
                currentGroup.agents.push(agent);
            } else {
                // Nouveau bloc
                currentGroup = { agents: [agent], allows: [], disallows: [] };
                groups.push(currentGroup);
                inAgentBlock = true;
            }
        } else if (directive === "allow") {
            if (currentGroup) {
                currentGroup.allows.push(value);
                inAgentBlock = false;
            }
        } else if (directive === "disallow") {
            if (currentGroup) {
                currentGroup.disallows.push(value);
                inAgentBlock = false;
            }
        }
        // sitemap:, host:, crawl-delay: ignorés ici
    }

    return groups;
}

/**
 * Trouve le groupe le plus spécifique pour un agent donné. Si l'agent a
 * son propre groupe (match exact lowercase), il l'emporte sur `*`.
 */
function findGroupForAgent(groups: RobotsGroup[], agent: string): RobotsGroup | null {
    const target = agent.toLowerCase();
    const specific = groups.find((g) => g.agents.includes(target));
    if (specific) return specific;
    const wildcard = groups.find((g) => g.agents.includes("*"));
    return wildcard ?? null;
}

/**
 * Détecte si une règle Disallow couvre la racine `/`, c'est-à-dire bloque
 * vraiment tout le site. Accepte `/`, `/*`, ou variantes équivalentes.
 *
 * Crucial : `/api/`, `/api/*`, `/dashboard` ne sont PAS un blocage global.
 */
function isFullSiteBlock(path: string): boolean {
    const p = path.trim();
    return p === "/" || p === "/*" || p === "*";
}

/**
 * Détermine le statut d'un crawler IA dans un robots.txt donné.
 *
 *   - "allowed"        : l'agent a son propre groupe ou est explicitement
 *                        autorisé via le groupe `*`. Aucune règle ne bloque /.
 *   - "blocked"        : un Disallow couvrant la racine s'applique à l'agent.
 *   - "not_mentioned"  : aucun groupe ne s'applique, aucune règle ne bloque.
 *
 * Note : on n'évalue PAS le matching de chemin précis ici. On répond à la
 * question "ce crawler peut-il accéder à la home page du site ?".
 */
export function getCrawlerStatus(robotsTxt: string, agent: string): CrawlerStatus {
    if (!robotsTxt) return "not_mentioned";
    const groups = parseRobotsTxt(robotsTxt);
    if (groups.length === 0) return "not_mentioned";

    const target = agent.toLowerCase();
    const hasOwnGroup = groups.some((g) => g.agents.includes(target));
    const group = findGroupForAgent(groups, agent);

    if (!group) return "not_mentioned";

    // Une règle Allow: / explicite contre-balance un Disallow: /
    const hasAllowRoot = group.allows.some((p) => isFullSiteBlock(p));
    const hasDisallowRoot = group.disallows.some((p) => isFullSiteBlock(p));

    if (hasDisallowRoot && !hasAllowRoot) return "blocked";

    // Si l'agent a son propre groupe sans Disallow: / → autorisé explicitement
    if (hasOwnGroup) return "allowed";

    // L'agent n'a pas son propre groupe, on tombe sur user-agent: *
    // Si pas de Disallow: / → ni bloqué ni mentionné spécifiquement
    return "not_mentioned";
}

/**
 * Détermine si l'ensemble du site est inaccessible pour les crawlers
 * génériques (`User-agent: *`). Sert au check "robots.txt bloque tout".
 *
 * Important : `Disallow: /api/*` ne doit PAS déclencher ce flag.
 */
export function isSiteFullyBlocked(robotsTxt: string): boolean {
    const groups = parseRobotsTxt(robotsTxt);
    const wildcard = groups.find((g) => g.agents.includes("*"));
    if (!wildcard) return false;

    const hasAllowRoot = wildcard.allows.some((p) => isFullSiteBlock(p));
    const hasDisallowRoot = wildcard.disallows.some((p) => isFullSiteBlock(p));

    return hasDisallowRoot && !hasAllowRoot;
}
