/**
 * Helper client pour lire une Response sans jamais throw.
 *
 * Suite au bug prod du 12 mai 2026, on protège systématiquement tout
 * `response.json()` même côté client : si l'API renvoie du HTML d'erreur
 * (page 500 générique de Vercel, page de maintenance Cloudflare, etc.),
 * un parse JSON brut throw et casse l'UI.
 */
export async function safeJsonResponse<T = Record<string, unknown>>(
    response: Response
): Promise<T | null> {
    try {
        const text = await response.text();
        if (!text) return null;
        return JSON.parse(text) as T;
    } catch {
        return null;
    }
}

/**
 * Construit un mailto pré-rempli pour servir de fallback quand l'envoi du
 * formulaire échoue. Le visiteur clique, son client mail s'ouvre avec ses
 * données déjà tapées : zéro friction perdue.
 */
export function buildFallbackMailto(input: {
    to: string;
    subject: string;
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    website?: string;
    budget?: string;
    message?: string;
}): string {
    const lines: string[] = [];
    if (input.name) lines.push(`Nom : ${input.name}`);
    if (input.email) lines.push(`Email : ${input.email}`);
    if (input.phone) lines.push(`Téléphone : ${input.phone}`);
    if (input.company) lines.push(`Entreprise : ${input.company}`);
    if (input.website) lines.push(`Site web : ${input.website}`);
    if (input.budget) lines.push(`Budget : ${input.budget}`);
    if (lines.length > 0) lines.push("");
    if (input.message) lines.push(input.message);

    const body = lines.join("\n");
    const params = new URLSearchParams({
        subject: input.subject,
        body,
    });
    return `mailto:${input.to}?${params.toString()}`;
}
