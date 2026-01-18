/**
 * Google Business Profile API Integration
 *
 * This module handles the OAuth flow and API interactions with Google Business Profile.
 * In production, you would need to:
 * 1. Create a Google Cloud project
 * 2. Enable the Google Business Profile API
 * 3. Create OAuth 2.0 credentials
 * 4. Set up the redirect URI
 */

export interface GoogleAuthConfig {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    scopes: string[];
}

export interface GoogleTokens {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
}

export interface GoogleBusinessAccount {
    name: string;
    accountName: string;
    type: 'PERSONAL' | 'LOCATION_GROUP' | 'USER_GROUP' | 'ORGANIZATION';
    role: 'OWNER' | 'CO_OWNER' | 'MANAGER' | 'COMMUNITY_MANAGER';
    state: {
        status: 'UNVERIFIED' | 'VERIFIED' | 'VETTED_PARTNER';
    };
    profilePhotoUrl?: string;
}

export interface GoogleBusinessLocation {
    name: string;
    locationName: string;
    primaryPhone?: string;
    primaryCategory: {
        displayName: string;
        categoryId: string;
    };
    websiteUri?: string;
    regularHours?: {
        periods: Array<{
            openDay: string;
            openTime: string;
            closeDay: string;
            closeTime: string;
        }>;
    };
    storefrontAddress: {
        regionCode: string;
        languageCode: string;
        postalCode: string;
        administrativeArea: string;
        locality: string;
        addressLines: string[];
    };
    latlng?: {
        latitude: number;
        longitude: number;
    };
    metadata?: {
        mapsUri?: string;
        newReviewUri?: string;
    };
}

export interface GoogleReview {
    name: string;
    reviewId: string;
    reviewer: {
        profilePhotoUrl?: string;
        displayName: string;
        isAnonymous: boolean;
    };
    starRating: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE';
    comment?: string;
    createTime: string;
    updateTime: string;
    reviewReply?: {
        comment: string;
        updateTime: string;
    };
}

// OAuth URLs
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GMB_API_BASE = 'https://mybusinessbusinessinformation.googleapis.com/v1';
const GMB_REVIEWS_API = 'https://mybusinessreviews.googleapis.com/v1';

// Storage keys
const TOKENS_KEY = 'gmb-google-tokens';
const ACCOUNTS_KEY = 'gmb-google-accounts';
const LOCATIONS_KEY = 'gmb-google-locations';

/**
 * Generate the OAuth authorization URL
 */
export function getAuthorizationUrl(config: GoogleAuthConfig, state: string): string {
    const params = new URLSearchParams({
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        response_type: 'code',
        scope: config.scopes.join(' '),
        access_type: 'offline',
        prompt: 'consent',
        state
    });

    return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

/**
 * Exchange authorization code for tokens
 */
export async function exchangeCodeForTokens(
    code: string,
    config: GoogleAuthConfig
): Promise<GoogleTokens> {
    const response = await fetch(GOOGLE_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            code,
            client_id: config.clientId,
            client_secret: config.clientSecret,
            redirect_uri: config.redirectUri,
            grant_type: 'authorization_code'
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error_description || 'Failed to exchange code');
    }

    const tokens: GoogleTokens = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: Date.now() + (data.expires_in * 1000)
    };

    // Store tokens
    if (typeof window !== 'undefined') {
        localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
    }

    return tokens;
}

/**
 * Refresh the access token
 */
export async function refreshAccessToken(
    refreshToken: string,
    config: GoogleAuthConfig
): Promise<GoogleTokens> {
    const response = await fetch(GOOGLE_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            refresh_token: refreshToken,
            client_id: config.clientId,
            client_secret: config.clientSecret,
            grant_type: 'refresh_token'
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error_description || 'Failed to refresh token');
    }

    const tokens: GoogleTokens = {
        accessToken: data.access_token,
        refreshToken: refreshToken,
        expiresAt: Date.now() + (data.expires_in * 1000)
    };

    if (typeof window !== 'undefined') {
        localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
    }

    return tokens;
}

/**
 * Get stored tokens
 */
export function getStoredTokens(): GoogleTokens | null {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem(TOKENS_KEY);
    if (!stored) return null;

    try {
        return JSON.parse(stored);
    } catch {
        return null;
    }
}

/**
 * Check if user is connected to Google
 */
export function isGoogleConnected(): boolean {
    const tokens = getStoredTokens();
    return tokens !== null && tokens.expiresAt > Date.now();
}

/**
 * Disconnect from Google
 */
export function disconnectGoogle(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKENS_KEY);
    localStorage.removeItem(ACCOUNTS_KEY);
    localStorage.removeItem(LOCATIONS_KEY);
}

/**
 * Fetch business accounts
 */
export async function fetchBusinessAccounts(accessToken: string): Promise<GoogleBusinessAccount[]> {
    const response = await fetch(`${GMB_API_BASE}/accounts`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch business accounts');
    }

    const data = await response.json();
    return data.accounts || [];
}

/**
 * Fetch locations for an account
 */
export async function fetchLocations(
    accessToken: string,
    accountName: string
): Promise<GoogleBusinessLocation[]> {
    const response = await fetch(`${GMB_API_BASE}/${accountName}/locations`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch locations');
    }

    const data = await response.json();
    return data.locations || [];
}

/**
 * Fetch reviews for a location
 */
export async function fetchReviews(
    accessToken: string,
    locationName: string,
    pageSize: number = 50
): Promise<GoogleReview[]> {
    const response = await fetch(
        `${GMB_REVIEWS_API}/${locationName}/reviews?pageSize=${pageSize}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch reviews');
    }

    const data = await response.json();
    return data.reviews || [];
}

/**
 * Reply to a review
 */
export async function replyToReview(
    accessToken: string,
    reviewName: string,
    comment: string
): Promise<void> {
    const response = await fetch(`${GMB_REVIEWS_API}/${reviewName}/reply`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to reply to review');
    }
}

/**
 * Delete a review reply
 */
export async function deleteReviewReply(
    accessToken: string,
    reviewName: string
): Promise<void> {
    const response = await fetch(`${GMB_REVIEWS_API}/${reviewName}/reply`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!response.ok) {
        throw new Error('Failed to delete review reply');
    }
}

// ═══════════════════════════════════════════════════════════════
// SIMULATION MODE (for development without real Google credentials)
// ═══════════════════════════════════════════════════════════════

const SIMULATION_KEY = 'gmb-simulation-mode';

export interface SimulatedConnection {
    email: string;
    connectedAt: Date;
    accounts: SimulatedAccount[];
}

export interface SimulatedAccount {
    id: string;
    name: string;
    email: string;
    locations: SimulatedLocation[];
}

export interface SimulatedLocation {
    id: string;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    category: string;
    phone?: string;
    website?: string;
    rating: number;
    totalReviews: number;
    mapsUrl: string;
    newReviewUrl: string;
}

/**
 * Simulate Google OAuth connection (for demo/development)
 */
export function simulateGoogleConnection(email: string): SimulatedConnection {
    const connection: SimulatedConnection = {
        email,
        connectedAt: new Date(),
        accounts: []
    };

    if (typeof window !== 'undefined') {
        localStorage.setItem(SIMULATION_KEY, JSON.stringify(connection));
    }

    return connection;
}

/**
 * Get simulated connection
 */
export function getSimulatedConnection(): SimulatedConnection | null {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem(SIMULATION_KEY);
    if (!stored) return null;

    try {
        const data = JSON.parse(stored);
        return {
            ...data,
            connectedAt: new Date(data.connectedAt)
        };
    } catch {
        return null;
    }
}

/**
 * Add simulated location
 */
export function addSimulatedLocation(accountId: string, location: SimulatedLocation): void {
    const connection = getSimulatedConnection();
    if (!connection) return;

    const account = connection.accounts.find(a => a.id === accountId);
    if (account) {
        account.locations.push(location);
    } else {
        connection.accounts.push({
            id: accountId,
            name: 'Mon compte business',
            email: connection.email,
            locations: [location]
        });
    }

    if (typeof window !== 'undefined') {
        localStorage.setItem(SIMULATION_KEY, JSON.stringify(connection));
    }
}

/**
 * Check if in simulation mode
 */
export function isSimulationMode(): boolean {
    return getSimulatedConnection() !== null;
}

/**
 * Disconnect simulation
 */
export function disconnectSimulation(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SIMULATION_KEY);
}

/**
 * Check overall connection status
 */
export function isConnectedToGoogle(): boolean {
    return isGoogleConnected() || isSimulationMode();
}

/**
 * Disconnect from all
 */
export function disconnectAll(): void {
    disconnectGoogle();
    disconnectSimulation();
}
