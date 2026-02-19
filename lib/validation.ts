// Utilitaires de validation et sanitization pour la sécurité des formulaires

/**
 * Valide un email avec une regex robuste
 */
export function isValidEmail(email: string): boolean {
    if (!email || typeof email !== 'string') return false;
    // RFC 5322 compliant regex (simplified)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
}

/**
 * Valide un numéro de téléphone français (format flexible)
 */
export function isValidPhone(phone: string): boolean {
    if (!phone || typeof phone !== 'string') return true; // Optionnel
    // Accepte les formats: 0612345678, 06 12 34 56 78, +33612345678, etc.
    const cleanPhone = phone.replace(/[\s.-]/g, '');
    const phoneRegex = /^(?:\+33|0033|0)[1-9](?:[0-9]{8})$/;
    return phoneRegex.test(cleanPhone);
}

/**
 * Valide une URL
 */
export function isValidUrl(url: string): boolean {
    if (!url || typeof url !== 'string') return true; // Optionnel
    try {
        const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
        return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
        return false;
    }
}

/**
 * Sanitize une chaîne de caractères (supprime les scripts et caractères dangereux)
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
    if (!input || typeof input !== 'string') return '';

    return input
        // Supprime les balises HTML/script
        .replace(/<[^>]*>/g, '')
        // Supprime les caractères de contrôle sauf newlines et tabs
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
        // Échappe les caractères spéciaux pour prévenir les injections
        .replace(/[<>"'&]/g, (char) => {
            const escapeMap: Record<string, string> = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '&': '&amp;',
            };
            return escapeMap[char] || char;
        })
        // Limite la longueur
        .slice(0, maxLength)
        // Trim
        .trim();
}

/**
 * Sanitize un email (lowercase + trim)
 */
export function sanitizeEmail(email: string): string {
    if (!email || typeof email !== 'string') return '';
    return email.toLowerCase().trim().slice(0, 254);
}

/**
 * Sanitize un numéro de téléphone
 */
export function sanitizePhone(phone: string): string {
    if (!phone || typeof phone !== 'string') return '';
    // Garde uniquement les chiffres et le +
    return phone.replace(/[^\d+]/g, '').slice(0, 20);
}

/**
 * Sanitize une URL
 */
export function sanitizeUrl(url: string): string {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim().slice(0, 500);
    // Bloque les protocoles dangereux
    if (trimmed.toLowerCase().startsWith('javascript:') ||
        trimmed.toLowerCase().startsWith('data:') ||
        trimmed.toLowerCase().startsWith('vbscript:')) {
        return '';
    }
    return trimmed;
}

/**
 * Vérifie si la requête contient des patterns d'attaque courants
 */
export function containsSuspiciousPatterns(text: string): boolean {
    if (!text || typeof text !== 'string') return false;

    const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i, // onclick=, onload=, etc.
        /data:text\/html/i,
        /vbscript:/i,
        /expression\s*\(/i,
        /url\s*\(/i,
        /@import/i,
        /<!--/,
        /-->/,
    ];

    return suspiciousPatterns.some(pattern => pattern.test(text));
}

/**
 * Interface pour les données de contact validées
 */
export interface ValidatedContactData {
    name: string;
    email: string;
    phone: string;
    company: string;
    website: string;
    budget: string;
    message: string;
}

/**
 * Valide et sanitize les données du formulaire de contact
 */
export function validateContactForm(data: Record<string, unknown>): {
    success: boolean;
    data?: ValidatedContactData;
    error?: string;
} {
    const { name, email, phone, company, website, budget, message } = data;

    // Vérifications requises
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return { success: false, error: 'Nom requis (minimum 2 caractères)' };
    }

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
        return { success: false, error: 'Email invalide' };
    }

    if (!message || typeof message !== 'string' || message.trim().length < 1) {
        return { success: false, error: 'Message requis' };
    }

    // Vérifications optionnelles - téléphone seulement si renseigné et format très flexible
    if (phone && typeof phone === 'string' && phone.trim().length > 0) {
        const cleanPhone = (phone as string).replace(/[\s.\-()]/g, '');
        if (cleanPhone.length > 0 && !/^[\d+]{6,20}$/.test(cleanPhone)) {
            return { success: false, error: 'Numéro de téléphone invalide' };
        }
    }

    // URL - pas de validation stricte, on accepte tout

    // Vérification des patterns suspects
    const allText = `${name} ${email} ${message} ${company || ''} ${website || ''}`;
    if (containsSuspiciousPatterns(allText)) {
        return { success: false, error: 'Contenu non autorisé détecté' };
    }

    // Sanitization
    return {
        success: true,
        data: {
            name: sanitizeString(name as string, 100),
            email: sanitizeEmail(email as string),
            phone: phone ? sanitizePhone(phone as string) : '',
            company: company ? sanitizeString(company as string, 100) : '',
            website: website ? sanitizeUrl(website as string) : '',
            budget: budget ? sanitizeString(budget as string, 50) : '',
            message: sanitizeString(message as string, 5000),
        }
    };
}

/**
 * Interface pour les données d'audit validées
 */
export interface ValidatedAuditData {
    name: string;
    email: string;
    phone: string;
    website: string;
    message: string;
}

/**
 * Valide et sanitize les données du formulaire d'audit
 */
export function validateAuditForm(data: Record<string, unknown>): {
    success: boolean;
    data?: ValidatedAuditData;
    error?: string;
} {
    const { name, email, phone, website, message } = data;

    // Vérifications requises
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return { success: false, error: 'Nom requis (minimum 2 caractères)' };
    }

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
        return { success: false, error: 'Email invalide' };
    }

    // Vérifications optionnelles
    if (phone && typeof phone === 'string' && phone.trim() && !isValidPhone(phone)) {
        return { success: false, error: 'Numéro de téléphone invalide' };
    }

    if (website && typeof website === 'string' && website.trim() && !isValidUrl(website)) {
        return { success: false, error: 'URL de site web invalide' };
    }

    // Vérification des patterns suspects
    const allText = `${name} ${email} ${website || ''} ${message || ''}`;
    if (containsSuspiciousPatterns(allText)) {
        return { success: false, error: 'Contenu non autorisé détecté' };
    }

    // Sanitization
    return {
        success: true,
        data: {
            name: sanitizeString(name as string, 100),
            email: sanitizeEmail(email as string),
            phone: phone ? sanitizePhone(phone as string) : '',
            website: website ? sanitizeUrl(website as string) : '',
            message: message ? sanitizeString(message as string, 2000) : '',
        }
    };
}
