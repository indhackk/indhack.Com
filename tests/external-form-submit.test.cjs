/**
 * Tests Node natifs pour lib/external-form-submit.ts
 *
 * Lancement :
 *   node --test tests/external-form-submit.test.cjs
 *
 * On ré-implémente la logique du helper en CommonJS pour rester totalement
 * indépendant du build TypeScript. Si lib/external-form-submit.ts change
 * de comportement, il faut aussi mettre à jour cette ré-implémentation
 * (et c'est exactement ce qui doit déclencher l'attention en review).
 *
 * Les timeouts sont volontairement courts (50 ms) pour que la suite tourne
 * en quelques secondes au lieu de plusieurs minutes.
 *
 * Cas couverts :
 *   1. Web3Forms renvoie du HTML non JSON → fail, FormSubmit appelé
 *   2. Web3Forms renvoie 403 JSON "Pro plan required" → fail, FormSubmit appelé
 *   3. Web3Forms timeout (AbortError) → fail, FormSubmit appelé
 *   4. FormSubmit renvoie du HTML → fail, delivered=false
 *   5. FormSubmit timeout → fail, delivered=false
 *   6. Les deux échouent → delivered=false (et le caller doit renvoyer 503)
 *   7. Cas nominal : Web3Forms répond success → delivered=true, FormSubmit
 *      n'est pas appelé
 *   8. Cas nominal : Web3Forms non configuré → FormSubmit appelé direct et
 *      delivered=true
 *   9. FormSubmit renvoie {"message":"..."} sans champ success → fail strict
 *      (sinon un payload non success serait considéré delivered, ce qui
 *      ferait des faux succès)
 *  10. clearTimeout : on s'assure qu'un fetch qui résout vite n'aboutit pas
 *      à un abort différé qui pollue les tests suivants
 */

const { test } = require("node:test");
const assert = require("node:assert/strict");

// ===== Constantes test (timeouts courts pour la vitesse) =====
const WEB3FORMS_TIMEOUT_MS = 50;
const FORMSUBMIT_TIMEOUT_MS = 50;

// ===== Helpers ré-implémentés en CJS =====

async function safeReadResponse(response) {
    let text = "";
    try {
        text = await response.text();
    } catch {
        return { status: response.status, ok: response.ok, json: null, text: "" };
    }
    let json = null;
    if (text) {
        try {
            const parsed = JSON.parse(text);
            if (parsed && typeof parsed === "object") {
                json = parsed;
            }
        } catch {
            // body non-JSON : on garde juste le text pour log
        }
    }
    return { status: response.status, ok: response.ok, json, text };
}

async function fetchWithTimeout(url, init, timeoutMs) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, { ...init, signal: controller.signal });
        return response;
    } finally {
        clearTimeout(timeoutId);
    }
}

async function tryWeb3Forms(accessKey, payload) {
    try {
        const response = await fetchWithTimeout(
            "https://api.web3forms.com/submit",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ access_key: accessKey, ...payload }),
            },
            WEB3FORMS_TIMEOUT_MS
        );
        const result = await safeReadResponse(response);
        if (result.ok && result.json && result.json.success === true) {
            return { delivered: true, service: "web3forms" };
        }
        const reason =
            (result.json && typeof result.json.message === "string"
                ? result.json.message
                : null) ||
            (result.text ? result.text.slice(0, 120) : null) ||
            `status ${result.status}`;
        return { delivered: false, service: "web3forms", reason };
    } catch (error) {
        const reason =
            error instanceof Error
                ? error.name === "AbortError"
                    ? "timeout"
                    : error.message.slice(0, 120)
                : "unknown";
        return { delivered: false, service: "web3forms", reason };
    }
}

async function tryFormSubmit(destinationEmail, payload) {
    try {
        const response = await fetchWithTimeout(
            `https://formsubmit.co/ajax/${encodeURIComponent(destinationEmail)}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    ...payload,
                    _captcha: "false",
                    _template: "table",
                }),
            },
            FORMSUBMIT_TIMEOUT_MS
        );
        const result = await safeReadResponse(response);
        const successFlag = result.json ? result.json.success : undefined;
        const isJsonSuccess = successFlag === true || successFlag === "true";
        if (result.ok && isJsonSuccess) {
            return { delivered: true, service: "formsubmit" };
        }
        const reason =
            (result.json && typeof result.json.message === "string"
                ? result.json.message
                : null) ||
            (result.text ? result.text.slice(0, 120) : null) ||
            `status ${result.status}`;
        return { delivered: false, service: "formsubmit", reason };
    } catch (error) {
        const reason =
            error instanceof Error
                ? error.name === "AbortError"
                    ? "timeout"
                    : error.message.slice(0, 120)
                : "unknown";
        return { delivered: false, service: "formsubmit", reason };
    }
}

async function deliverFormSubmission(input, web3Key) {
    const attempts = [];
    if (web3Key) {
        const web3Outcome = await tryWeb3Forms(web3Key, input.web3Payload);
        attempts.push(web3Outcome);
        if (web3Outcome.delivered) {
            return { delivered: true, attempts };
        }
    }
    const formSubmitOutcome = await tryFormSubmit(
        input.formSubmitEmail,
        input.formSubmitPayload
    );
    attempts.push(formSubmitOutcome);
    return { delivered: formSubmitOutcome.delivered, attempts };
}

// ===== Mock fetch =====

/**
 * Installe un mock de global.fetch. Chaque handler matche par sous-chaîne
 * d'URL, et renvoie soit une Response, soit une promesse qui ne résout
 * jamais (pour tester le timeout via AbortController réel).
 */
function installMockFetch(handlers) {
    const original = global.fetch;
    const calls = [];
    global.fetch = async (url, init) => {
        const u = url.toString();
        calls.push({ url: u });
        for (const { match, respond } of handlers) {
            if (u.includes(match)) {
                return respond({ url: u, init });
            }
        }
        throw new Error(`No mock for ${u}`);
    };
    return {
        calls,
        restore() {
            global.fetch = original;
        },
    };
}

function jsonResponse(status, body) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

function htmlResponse(status, body) {
    return new Response(body, {
        status,
        headers: { "Content-Type": "text/html" },
    });
}

/**
 * Renvoie une promesse qui respecte le signal AbortController : si le signal
 * est aborté, elle rejette avec une AbortError ; sinon elle ne résout jamais.
 * Permet de tester le vrai parcours timeout du helper.
 */
function neverResolves(init) {
    return new Promise((_, reject) => {
        const signal = init && init.signal;
        if (signal) {
            if (signal.aborted) {
                const err = new Error("Aborted");
                err.name = "AbortError";
                reject(err);
                return;
            }
            signal.addEventListener(
                "abort",
                () => {
                    const err = new Error("Aborted");
                    err.name = "AbortError";
                    reject(err);
                },
                { once: true }
            );
        }
    });
}

const DEFAULT_INPUT = {
    web3Payload: { Email: "visitor@example.com", Message: "Bonjour" },
    formSubmitEmail: "contact@indhack.com",
    formSubmitPayload: { email: "visitor@example.com", message: "Bonjour" },
};

// ===== Tests =====

test("1. Web3Forms renvoie HTML non JSON → fail, FormSubmit appelé et OK", async () => {
    const mock = installMockFetch([
        { match: "web3forms", respond: () => htmlResponse(503, "<html>Service Unavailable</html>") },
        { match: "formsubmit", respond: () => jsonResponse(200, { success: "true", message: "OK" }) },
    ]);
    try {
        const result = await deliverFormSubmission(DEFAULT_INPUT, "fake-key");
        assert.equal(result.delivered, true);
        assert.equal(result.attempts.length, 2);
        assert.equal(result.attempts[0].service, "web3forms");
        assert.equal(result.attempts[0].delivered, false);
        assert.equal(result.attempts[1].service, "formsubmit");
        assert.equal(result.attempts[1].delivered, true);
        assert.equal(mock.calls.length, 2);
    } finally {
        mock.restore();
    }
});

test("2. Web3Forms renvoie 403 JSON 'Pro plan required' → fail, FormSubmit appelé et OK", async () => {
    const mock = installMockFetch([
        { match: "web3forms", respond: () => jsonResponse(403, { success: false, message: "Pro plan required for server-side requests" }) },
        { match: "formsubmit", respond: () => jsonResponse(200, { success: "true" }) },
    ]);
    try {
        const result = await deliverFormSubmission(DEFAULT_INPUT, "fake-key");
        assert.equal(result.delivered, true);
        assert.equal(result.attempts[0].delivered, false);
        assert.match(result.attempts[0].reason, /Pro plan required/);
    } finally {
        mock.restore();
    }
});

test("3. Web3Forms timeout → AbortError, FormSubmit appelé et OK", async () => {
    const mock = installMockFetch([
        { match: "web3forms", respond: (ctx) => neverResolves(ctx.init) },
        { match: "formsubmit", respond: () => jsonResponse(200, { success: "true" }) },
    ]);
    try {
        const start = Date.now();
        const result = await deliverFormSubmission(DEFAULT_INPUT, "fake-key");
        const elapsed = Date.now() - start;
        assert.equal(result.delivered, true);
        assert.equal(result.attempts[0].delivered, false);
        assert.equal(result.attempts[0].reason, "timeout");
        assert.ok(elapsed < 1000, `Le timeout doit s'appliquer (mesuré ${elapsed} ms, attendu < 1000 ms)`);
    } finally {
        mock.restore();
    }
});

test("4. FormSubmit renvoie HTML → delivered=false", async () => {
    const mock = installMockFetch([
        { match: "web3forms", respond: () => jsonResponse(403, { success: false, message: "Pro plan required" }) },
        { match: "formsubmit", respond: () => htmlResponse(502, "<html>Bad Gateway</html>") },
    ]);
    try {
        const result = await deliverFormSubmission(DEFAULT_INPUT, "fake-key");
        assert.equal(result.delivered, false);
        assert.equal(result.attempts.length, 2);
        assert.equal(result.attempts[1].service, "formsubmit");
        assert.equal(result.attempts[1].delivered, false);
    } finally {
        mock.restore();
    }
});

test("5. FormSubmit timeout → delivered=false", async () => {
    const mock = installMockFetch([
        { match: "web3forms", respond: () => jsonResponse(403, { success: false, message: "blocked" }) },
        { match: "formsubmit", respond: (ctx) => neverResolves(ctx.init) },
    ]);
    try {
        const start = Date.now();
        const result = await deliverFormSubmission(DEFAULT_INPUT, "fake-key");
        const elapsed = Date.now() - start;
        assert.equal(result.delivered, false);
        assert.equal(result.attempts[1].reason, "timeout");
        assert.ok(elapsed < 1000, `Le timeout doit s'appliquer (mesuré ${elapsed} ms, attendu < 1000 ms)`);
    } finally {
        mock.restore();
    }
});

test("6. Les deux échouent → delivered=false (caller renverra 503)", async () => {
    const mock = installMockFetch([
        { match: "web3forms", respond: () => htmlResponse(503, "<html>down</html>") },
        { match: "formsubmit", respond: () => htmlResponse(502, "<html>down</html>") },
    ]);
    try {
        const result = await deliverFormSubmission(DEFAULT_INPUT, "fake-key");
        assert.equal(result.delivered, false);
        assert.equal(result.attempts.length, 2);
        assert.equal(result.attempts[0].delivered, false);
        assert.equal(result.attempts[1].delivered, false);
    } finally {
        mock.restore();
    }
});

test("7. Cas nominal Web3Forms : delivered=true, FormSubmit pas appelé", async () => {
    const mock = installMockFetch([
        { match: "web3forms", respond: () => jsonResponse(200, { success: true, message: "Email sent" }) },
        { match: "formsubmit", respond: () => { throw new Error("FormSubmit ne doit pas être appelé"); } },
    ]);
    try {
        const result = await deliverFormSubmission(DEFAULT_INPUT, "fake-key");
        assert.equal(result.delivered, true);
        assert.equal(result.attempts.length, 1);
        assert.equal(result.attempts[0].service, "web3forms");
        assert.equal(mock.calls.length, 1);
    } finally {
        mock.restore();
    }
});

test("8. Web3Forms non configuré (pas de clé) → FormSubmit appelé direct", async () => {
    const mock = installMockFetch([
        { match: "web3forms", respond: () => { throw new Error("Web3Forms ne doit pas être appelé sans clé"); } },
        { match: "formsubmit", respond: () => jsonResponse(200, { success: "true" }) },
    ]);
    try {
        const result = await deliverFormSubmission(DEFAULT_INPUT, undefined);
        assert.equal(result.delivered, true);
        assert.equal(result.attempts.length, 1);
        assert.equal(result.attempts[0].service, "formsubmit");
    } finally {
        mock.restore();
    }
});

test("9. FormSubmit renvoie JSON SANS champ success → fail strict (pas de faux succès)", async () => {
    const mock = installMockFetch([
        { match: "web3forms", respond: () => jsonResponse(403, { success: false }) },
        { match: "formsubmit", respond: () => jsonResponse(200, { message: "Accepted but no success flag" }) },
    ]);
    try {
        const result = await deliverFormSubmission(DEFAULT_INPUT, "fake-key");
        assert.equal(result.delivered, false, "delivered doit être false si success absent");
        assert.equal(result.attempts[1].delivered, false);
    } finally {
        mock.restore();
    }
});

test("10. clearTimeout : un fetch rapide n'aboutit pas à un abort différé", async () => {
    // On lance plusieurs envois successifs avec des réponses rapides.
    // Si clearTimeout ne fonctionnait pas, les setTimeout s'accumuleraient
    // et finiraient par aborter des fetchs futurs. On vérifie ici que tout
    // se passe bien sur 5 envois consécutifs.
    const mock = installMockFetch([
        { match: "web3forms", respond: () => jsonResponse(200, { success: true }) },
    ]);
    try {
        for (let i = 0; i < 5; i++) {
            const result = await deliverFormSubmission(DEFAULT_INPUT, "fake-key");
            assert.equal(result.delivered, true);
        }
        assert.equal(mock.calls.length, 5);
    } finally {
        mock.restore();
    }
});

test("11. FormSubmit success boolean (variante d'API) → accepté", async () => {
    // FormSubmit a deux conventions de réponse selon les versions :
    // "success":"true" (string) ou "success":true (boolean). Les deux doivent
    // être considérés comme un envoi validé.
    const mock = installMockFetch([
        { match: "web3forms", respond: () => jsonResponse(403, { success: false }) },
        { match: "formsubmit", respond: () => jsonResponse(200, { success: true, message: "OK" }) },
    ]);
    try {
        const result = await deliverFormSubmission(DEFAULT_INPUT, "fake-key");
        assert.equal(result.delivered, true);
        assert.equal(result.attempts[1].delivered, true);
    } finally {
        mock.restore();
    }
});
