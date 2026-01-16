// Utilitaire de gestion des cookies RGPD

export type CookieConsent = {
    necessary: boolean;      // Toujours true - requis pour le fonctionnement
    analytics: boolean;      // Google Analytics
    marketing: boolean;      // Pixels marketing (futur)
    preferences: boolean;    // Préférences utilisateur
};

export const DEFAULT_CONSENT: CookieConsent = {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
};

const CONSENT_COOKIE_NAME = 'indhack_cookie_consent';
const CONSENT_EXPIRY_DAYS = 365;

// Lire le consentement depuis les cookies
export function getStoredConsent(): CookieConsent | null {
    if (typeof window === 'undefined') return null;

    const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${CONSENT_COOKIE_NAME}=`));

    if (!cookie) return null;

    try {
        return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
    } catch {
        return null;
    }
}

// Sauvegarder le consentement
export function saveConsent(consent: CookieConsent): void {
    if (typeof window === 'undefined') return;

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);

    document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax; Secure`;

    // Dispatch event pour que les autres composants puissent réagir
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consent }));
}

// Vérifier si le consentement a été donné
export function hasConsentBeenGiven(): boolean {
    return getStoredConsent() !== null;
}

// Activer/désactiver Google Analytics selon le consentement
export function updateAnalyticsConsent(allowed: boolean): void {
    if (typeof window === 'undefined') return;

    // Google Analytics consent mode
    if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
            analytics_storage: allowed ? 'granted' : 'denied',
        });
    }

    // Si refusé, supprimer les cookies GA existants
    if (!allowed) {
        const gaCookies = document.cookie.split(';').filter(c =>
            c.trim().startsWith('_ga') || c.trim().startsWith('_gid')
        );
        gaCookies.forEach(cookie => {
            const name = cookie.split('=')[0].trim();
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.indhack.com`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        });
    }
}

// Déclaration globale pour TypeScript
declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
        dataLayer: unknown[];
    }
}
