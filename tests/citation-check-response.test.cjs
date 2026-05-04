/**
 * Tests Node natifs pour lib/citation-check-response.ts
 *
 * On teste juste la logique pure (pas de Next runtime), donc pas besoin
 * de jest / vitest. Lancement :
 *   node --test tests/citation-check-response.test.cjs
 *
 * On ré-implémente la logique en CJS pour rester totalement indépendant
 * du build TypeScript. Si lib/citation-check-response.ts change de
 * comportement, il faut aussi mettre à jour cette ré-implémentation
 * (et c'est exactement ce qui doit déclencher l'attention en review).
 */

const { test } = require("node:test");
const assert = require("node:assert/strict");

function allPromptsFailed(results) {
    if (!results || results.length === 0) return false;
    return results.every((r) => r.aiEngine === "N/A" && r.totalSources === 0);
}

function buildUnavailableResponse(reason) {
    return {
        error: "Service de vérification de citation IA temporairement indisponible.",
        reason: reason ?? "Toutes les API de citation (Tavily, Perplexity, Serper) ont échoué.",
        retryable: true,
    };
}

test("allPromptsFailed: tous N/A et 0 source = panne globale", () => {
    const results = [
        { aiEngine: "N/A", totalSources: 0 },
        { aiEngine: "N/A", totalSources: 0 },
        { aiEngine: "N/A", totalSources: 0 },
    ];
    assert.equal(allPromptsFailed(results), true);
});

test("allPromptsFailed: un seul moteur a répondu = pas une panne globale", () => {
    const results = [
        { aiEngine: "N/A", totalSources: 0 },
        { aiEngine: "Tavily AI Search", totalSources: 10 },
        { aiEngine: "N/A", totalSources: 0 },
    ];
    assert.equal(allPromptsFailed(results), false);
});

test("allPromptsFailed: liste vide = pas d'erreur globale (cas d'usage différent)", () => {
    assert.equal(allPromptsFailed([]), false);
    assert.equal(allPromptsFailed(null), false);
    assert.equal(allPromptsFailed(undefined), false);
});

test("buildUnavailableResponse: format constant pour le frontend", () => {
    const res = buildUnavailableResponse();
    assert.equal(typeof res.error, "string");
    assert.equal(res.retryable, true);
    assert.match(res.reason, /Tavily|Perplexity|Serper/);
});

test("buildUnavailableResponse: raison custom transmise", () => {
    const res = buildUnavailableResponse("Quota Tavily atteint");
    assert.equal(res.reason, "Quota Tavily atteint");
});
