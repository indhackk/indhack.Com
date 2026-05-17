/**
 * Helpers pour soumettre les formulaires de contact / audit à des services
 * externes (Web3Forms, FormSubmit) avec timeout, isolation des erreurs et
 * fallback en cascade.
 *
 * Conçu suite au bug prod du 12 mai 2026 où un `await response.json()` non
 * protégé sur la réponse Web3Forms faisait planter toute la route en 500
 * sans jamais atteindre le fallback FormSubmit.
 *
 * Règles d'or appliquées ici :
 *   - aucun `response.json()` non protégé ;
 *   - chaque fetch externe a un timeout (AbortController) ;
 *   - chaque service est encapsulé dans un try/catch isolé ;
 *   - si un service échoue, on passe vraiment au suivant ;
 *   - les logs serveur ne contiennent ni clé API ni données personnelles
 *     (juste le service, le status code et la raison technique).
 */

const RESEND_TIMEOUT_MS = 8000;
const WEB3FORMS_TIMEOUT_MS = 5000;
const FORMSUBMIT_TIMEOUT_MS = 8000;

// Adresse expéditeur Resend par défaut. Tant que le domaine indhack.com
// n'est pas vérifié dans Resend, l'envoi doit partir depuis
// "onboarding@resend.dev" (compte test). Une fois le domaine vérifié,
// surcharger via la variable d'environnement RESEND_FROM (par exemple
// `IndHack <noreply@indhack.com>`).
const DEFAULT_RESEND_FROM = "IndHack <onboarding@resend.dev>";

/**
 * Lit le body d'une Response de façon défensive : récupère le texte, tente un
 * JSON.parse, et renvoie toujours un objet exploitable sans throw.
 */
async function safeReadResponse(response: Response): Promise<{
    status: number;
    ok: boolean;
    json: Record<string, unknown> | null;
    text: string;
}> {
    let text = "";
    try {
        text = await response.text();
    } catch {
        // Si on n'arrive même pas à lire le body, on remonte juste le status.
        return { status: response.status, ok: response.ok, json: null, text: "" };
    }

    let json: Record<string, unknown> | null = null;
    if (text) {
        try {
            const parsed = JSON.parse(text) as unknown;
            if (parsed && typeof parsed === "object") {
                json = parsed as Record<string, unknown>;
            }
        } catch {
            // Réponse non-JSON : Web3Forms peut renvoyer du HTML d'erreur,
            // FormSubmit peut renvoyer du texte brut. On garde le `text` pour log.
        }
    }

    return { status: response.status, ok: response.ok, json, text };
}

/**
 * Fetch avec timeout via AbortController. N'avale pas l'erreur, la relance.
 */
async function fetchWithTimeout(
    url: string,
    init: RequestInit,
    timeoutMs: number
): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, { ...init, signal: controller.signal });
        return response;
    } finally {
        clearTimeout(timeoutId);
    }
}

export type SubmitOutcome = {
    delivered: boolean;
    service: "resend" | "web3forms" | "formsubmit" | "none";
    reason?: string;
};

export type ResendPayload = {
    /** Adresse destinataire (toujours fournie côté caller). */
    to: string;
    /** Sujet de l'email. */
    subject: string;
    /** Corps texte brut. Resend accepte aussi `html` mais on garde simple. */
    text: string;
    /** Reply-to optionnel (l'email du visiteur typiquement). */
    replyTo?: string;
    /** From optionnel. Sinon utilise RESEND_FROM env var ou le défaut. */
    from?: string;
};

/**
 * Tente Resend. Renvoie toujours un SubmitOutcome, ne throw jamais.
 *
 * Resend renvoie HTTP 200 + `{ id: "re_xxx" }` sur succès, ou un payload
 * `{ name, message, statusCode }` sur erreur. Tant que le domaine n'est
 * pas vérifié, Resend impose `from: "onboarding@resend.dev"` et `to:
 * <email du compte Resend>` uniquement.
 */
async function tryResend(
    apiKey: string,
    payload: ResendPayload,
): Promise<SubmitOutcome> {
    try {
        const body: Record<string, unknown> = {
            from: payload.from || process.env.RESEND_FROM || DEFAULT_RESEND_FROM,
            to: payload.to,
            subject: payload.subject,
            text: payload.text,
        };
        if (payload.replyTo) {
            body.reply_to = payload.replyTo;
        }

        const response = await fetchWithTimeout(
            "https://api.resend.com/emails",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify(body),
            },
            RESEND_TIMEOUT_MS,
        );

        const result = await safeReadResponse(response);

        // Resend renvoie { id: "re_xxx" } sur succès en HTTP 200.
        if (result.ok && result.json && typeof result.json.id === "string") {
            return { delivered: true, service: "resend" };
        }

        // Erreur typique : { name: "validation_error", message: "...", statusCode: 422 }
        const reason =
            (result.json && typeof result.json.message === "string"
                ? result.json.message
                : null) ||
            (result.json && typeof result.json.name === "string"
                ? result.json.name
                : null) ||
            (result.text ? result.text.slice(0, 120) : null) ||
            `status ${result.status}`;

        return { delivered: false, service: "resend", reason };
    } catch (error: unknown) {
        const reason =
            error instanceof Error
                ? error.name === "AbortError"
                    ? "timeout"
                    : error.message.slice(0, 120)
                : "unknown";
        return { delivered: false, service: "resend", reason };
    }
}

/**
 * Tente Web3Forms. Renvoie toujours un SubmitOutcome, ne throw jamais.
 *
 * Note : Web3Forms a tendance à refuser les appels serveur en plan gratuit
 * (HTTP 403 "Pro plan required"). On ne loggue ni la clé ni les données
 * envoyées, juste le verdict technique.
 */
async function tryWeb3Forms(
    accessKey: string,
    payload: Record<string, unknown>
): Promise<SubmitOutcome> {
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

        // Web3Forms en HTTP 200 mais success:false : message d'erreur dans json.message
        const reason =
            (result.json && typeof result.json.message === "string"
                ? result.json.message
                : null) ||
            (result.text ? result.text.slice(0, 120) : null) ||
            `status ${result.status}`;

        return { delivered: false, service: "web3forms", reason };
    } catch (error: unknown) {
        const reason =
            error instanceof Error
                ? error.name === "AbortError"
                    ? "timeout"
                    : error.message.slice(0, 120)
                : "unknown";
        return { delivered: false, service: "web3forms", reason };
    }
}

/**
 * Tente FormSubmit (endpoint /ajax). Renvoie toujours un SubmitOutcome, ne
 * throw jamais.
 *
 * Note : FormSubmit demande une confirmation initiale par mail la première
 * fois qu'on envoie à une nouvelle adresse. Si la confirmation n'a jamais
 * été cliquée, le service renvoie quand même 200 mais les mails ne partent
 * pas. On ne peut pas détecter ce cas côté serveur, c'est à valider depuis
 * la boîte mail destinataire.
 */
async function tryFormSubmit(
    destinationEmail: string,
    payload: Record<string, unknown>
): Promise<SubmitOutcome> {
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

        // FormSubmit /ajax renvoie typiquement {"success":"true","message":...}
        // (string) ou parfois {"success":true} (boolean) selon la version.
        // On exige EXPLICITEMENT un success affirmé, pas seulement l'absence
        // de success=false : sinon un payload {"message":"..."} sans champ
        // success serait pris pour un envoi réussi alors qu'il ne l'est pas.
        const successFlag = result.json ? result.json.success : undefined;
        const isJsonSuccess =
            successFlag === true || successFlag === "true";

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
    } catch (error: unknown) {
        const reason =
            error instanceof Error
                ? error.name === "AbortError"
                    ? "timeout"
                    : error.message.slice(0, 120)
                : "unknown";
        return { delivered: false, service: "formsubmit", reason };
    }
}

/**
 * Cascade Resend → Web3Forms → FormSubmit.
 *
 * Resend est le canal préféré (clé `RESEND_API_KEY`). Si Resend n'est pas
 * configuré ou échoue, on tente Web3Forms (clé `WEB3FORMS_ACCESS_KEY` ou
 * `WEBFORM`) puis FormSubmit (toujours, sert de dernier filet).
 *
 * @param resendPayload  Payload Resend (subject + text + reply-to + to)
 * @param web3Payload  Payload Web3Forms (sans `access_key`, ajouté ici)
 * @param formSubmitEmail  Adresse destinataire FormSubmit
 * @param formSubmitPayload  Payload FormSubmit
 * @returns Liste des tentatives + verdict final
 */
export async function deliverFormSubmission(input: {
    resendPayload?: ResendPayload;
    web3Payload: Record<string, unknown>;
    formSubmitEmail: string;
    formSubmitPayload: Record<string, unknown>;
}): Promise<{
    delivered: boolean;
    attempts: SubmitOutcome[];
}> {
    const attempts: SubmitOutcome[] = [];

    // Étape 1 : Resend (priorité 1, le service le plus fiable)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && input.resendPayload) {
        const resendOutcome = await tryResend(resendKey, input.resendPayload);
        attempts.push(resendOutcome);
        if (resendOutcome.delivered) {
            return { delivered: true, attempts };
        }
    }

    // Étape 2 : Web3Forms (fallback historique)
    const web3Key = process.env.WEB3FORMS_ACCESS_KEY || process.env.WEBFORM;
    if (web3Key) {
        const web3Outcome = await tryWeb3Forms(web3Key, input.web3Payload);
        attempts.push(web3Outcome);
        if (web3Outcome.delivered) {
            return { delivered: true, attempts };
        }
    }

    // Étape 3 : FormSubmit (dernier filet)
    const formSubmitOutcome = await tryFormSubmit(
        input.formSubmitEmail,
        input.formSubmitPayload
    );
    attempts.push(formSubmitOutcome);

    return { delivered: formSubmitOutcome.delivered, attempts };
}

/**
 * Formatte les tentatives en une ligne de log courte sans données sensibles.
 * Sortie typique : "[contact] web3forms=Pro plan required formsubmit=OK"
 */
export function summarizeAttempts(label: string, attempts: SubmitOutcome[]): string {
    const parts = attempts.map((a) => {
        const status = a.delivered ? "OK" : a.reason ?? "fail";
        return `${a.service}=${status}`;
    });
    return `[${label}] ${parts.join(" ")}`;
}
