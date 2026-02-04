/**
 * GMB AutoPilot - Production Auth Context
 * Système d'authentification réel avec persistance
 */

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    plan: 'free' | 'pro' | 'agency';
    createdAt: Date;
    onboardingCompleted: boolean;
    preferences: {
        language: 'fr' | 'en';
        theme: 'light' | 'dark';
        notificationsEnabled: boolean;
        voiceEnabled: boolean;
    };
}

interface RegisteredUser {
    password: string;
    user: User;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
    updateUser: (updates: Partial<User>) => void;
    completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_STORAGE_KEY = 'gmb-autopilot-auth';
const USERS_STORAGE_KEY = 'gmb-autopilot-users';

// Utilisateur prédéfini - password via variable d'environnement (pas hardcodé)
const GMB_ADMIN_PASSWORD = process.env.NEXT_PUBLIC_GMB_ADMIN_PASSWORD || '';

const PREDEFINED_USERS: Record<string, RegisteredUser> = GMB_ADMIN_PASSWORD ? {
    'indiana@indhack.com': {
        password: GMB_ADMIN_PASSWORD,
        user: {
            id: 'indiana-owner-1',
            email: 'indiana@indhack.com',
            name: 'Indiana',
            plan: 'agency',
            createdAt: new Date('2024-01-01'),
            onboardingCompleted: false,
            preferences: {
                language: 'fr',
                theme: 'light',
                notificationsEnabled: true,
                voiceEnabled: true
            }
        }
    }
} : {};

function getStoredUsers(): Record<string, RegisteredUser> {
    if (typeof window === 'undefined') return {};
    try {
        const stored = localStorage.getItem(USERS_STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            // Reconvertir les dates
            Object.values(parsed).forEach((u: unknown) => {
                const user = u as RegisteredUser;
                user.user.createdAt = new Date(user.user.createdAt);
            });
            return parsed;
        }
    } catch (e) {
        console.error('Error loading users:', e);
    }
    return {};
}

function saveUsers(users: Record<string, RegisteredUser>) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(AUTH_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setUser({
                    ...parsed,
                    createdAt: new Date(parsed.createdAt)
                });
            }
        } catch (error) {
            console.error('Auth: Error loading user', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Save user to localStorage when changed
    useEffect(() => {
        if (user) {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
        }
    }, [user]);

    const login = async (email: string, password: string): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, 600));

        const lowerEmail = email.toLowerCase().trim();

        // Check predefined users first
        const predefinedUser = PREDEFINED_USERS[lowerEmail];
        if (predefinedUser && predefinedUser.password === password) {
            setUser(predefinedUser.user);
            return true;
        }

        // Check registered users
        const storedUsers = getStoredUsers();
        const registeredUser = storedUsers[lowerEmail];
        if (registeredUser && registeredUser.password === password) {
            setUser(registeredUser.user);
            return true;
        }

        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
    };

    const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
        await new Promise(resolve => setTimeout(resolve, 800));

        const lowerEmail = email.toLowerCase().trim();

        // Check if already exists
        if (PREDEFINED_USERS[lowerEmail] || getStoredUsers()[lowerEmail]) {
            return { success: false, error: 'Un compte existe déjà avec cette adresse email.' };
        }

        // Validate password
        if (password.length < 6) {
            return { success: false, error: 'Le mot de passe doit contenir au moins 6 caractères.' };
        }

        const newUser: User = {
            id: `user-${Date.now()}`,
            email: lowerEmail,
            name: name.trim(),
            plan: 'free',
            createdAt: new Date(),
            onboardingCompleted: false,
            preferences: {
                language: 'fr',
                theme: 'light',
                notificationsEnabled: true,
                voiceEnabled: false
            }
        };

        // Save to registered users
        const users = getStoredUsers();
        users[lowerEmail] = { password, user: newUser };
        saveUsers(users);

        // Auto-login
        setUser(newUser);
        return { success: true };
    };

    const updateUser = (updates: Partial<User>) => {
        if (!user) return;

        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);

        // Update in stored users if not predefined
        if (!PREDEFINED_USERS[user.email]) {
            const users = getStoredUsers();
            if (users[user.email]) {
                users[user.email].user = updatedUser;
                saveUsers(users);
            }
        }
    };

    const completeOnboarding = () => {
        updateUser({ onboardingCompleted: true });
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated: !!user,
            login,
            logout,
            register,
            updateUser,
            completeOnboarding
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
