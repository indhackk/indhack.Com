/**
 * Helpers de réponse pour /api/citation-check.
 *
 * Le but est de détecter quand TOUS les moteurs de citation IA ont échoué
 * (Tavily, Perplexity, Serper) et de transformer ça en vraie erreur HTTP 503,
 * au lieu d'un faux résultat 200 avec snippet "Erreur lors de la vérification"
 * et aiEngine "N/A".
 *
 * Ce module est volontairement isolé du runtime Next pour pouvoir être testé
 * en Node natif via `node --test`.
 */

export interface MinimalPromptResult {
    aiEngine: string;
    snippet?: string;
    totalSources: number;
}

/**
 * Renvoie true si tous les prompts ont échoué côté moteur IA.
 *
 * Critères d'échec global :
 * - chaque résultat a aiEngine = "N/A" (la cascade Tavily → Perplexity → Serper a totalement raté)
 * - ET totalSources = 0 partout (rien à exploiter côté concurrents)
 *
 * Si un seul prompt a abouti correctement, on considère que l'API a un signal
 * valide à renvoyer et on garde une réponse 200 normale.
 */
export function allPromptsFailed(results: MinimalPromptResult[]): boolean {
    if (!results || results.length === 0) return false;
    return results.every((r) => r.aiEngine === "N/A" && r.totalSources === 0);
}

/**
 * Construit la réponse JSON renvoyée à l'utilisateur quand tous les moteurs
 * ont échoué. Doit accompagner un statut HTTP 503 côté handler de route.
 */
export function buildUnavailableResponse(reason?: string) {
    return {
        error: "Service de vérification de citation IA temporairement indisponible.",
        reason: reason ?? "Toutes les API de citation (Tavily, Perplexity, Serper) ont échoué.",
        retryable: true,
    };
}
