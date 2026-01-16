"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Settings, Check, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    CookieConsent as CookieConsentType,
    DEFAULT_CONSENT,
    getStoredConsent,
    saveConsent,
    hasConsentBeenGiven,
    updateAnalyticsConsent,
} from "@/lib/cookies";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [consent, setConsent] = useState<CookieConsentType>(DEFAULT_CONSENT);

    useEffect(() => {
        // Vérifier si le consentement a déjà été donné
        const stored = getStoredConsent();
        if (stored) {
            setConsent(stored);
            updateAnalyticsConsent(stored.analytics);
        } else {
            // Afficher la bannière après un court délai
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        const fullConsent: CookieConsentType = {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true,
        };
        saveConsent(fullConsent);
        updateAnalyticsConsent(true);
        setIsVisible(false);
    };

    const handleRejectAll = () => {
        const minimalConsent: CookieConsentType = {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false,
        };
        saveConsent(minimalConsent);
        updateAnalyticsConsent(false);
        setIsVisible(false);
    };

    const handleSavePreferences = () => {
        saveConsent(consent);
        updateAnalyticsConsent(consent.analytics);
        setIsVisible(false);
    };

    const toggleCategory = (category: keyof CookieConsentType) => {
        if (category === 'necessary') return; // Toujours requis
        setConsent(prev => ({ ...prev, [category]: !prev[category] }));
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-2xl border border-line overflow-hidden">
                            {/* Header */}
                            <div className="p-6 pb-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-sauge/10 rounded-xl">
                                        <Cookie className="w-6 h-6 text-sauge" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-heading font-bold text-lg text-ink mb-2">
                                            Respect de votre vie privée
                                        </h3>
                                        <p className="text-sm text-soft leading-relaxed">
                                            Nous utilisons des cookies pour analyser notre trafic et améliorer votre expérience.
                                            Vous pouvez choisir les cookies que vous acceptez.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Détails des cookies */}
                            <AnimatePresence>
                                {showDetails && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-line overflow-hidden"
                                    >
                                        <div className="p-6 space-y-4 bg-fond-clair">
                                            {/* Cookies nécessaires */}
                                            <CookieCategory
                                                title="Cookies nécessaires"
                                                description="Indispensables au fonctionnement du site (session, sécurité)."
                                                checked={true}
                                                disabled={true}
                                                icon={<Shield className="w-4 h-4" />}
                                            />

                                            {/* Cookies analytiques */}
                                            <CookieCategory
                                                title="Cookies analytiques"
                                                description="Google Analytics - Nous aident à comprendre comment vous utilisez le site."
                                                checked={consent.analytics}
                                                onChange={() => toggleCategory('analytics')}
                                                icon={<Settings className="w-4 h-4" />}
                                            />

                                            {/* Cookies marketing */}
                                            <CookieCategory
                                                title="Cookies marketing"
                                                description="Permettent de mesurer l'efficacité de nos campagnes (non actifs actuellement)."
                                                checked={consent.marketing}
                                                onChange={() => toggleCategory('marketing')}
                                                disabled={true}
                                            />

                                            {/* Préférences */}
                                            <CookieCategory
                                                title="Cookies de préférences"
                                                description="Mémorisent vos choix et personnalisent votre expérience."
                                                checked={consent.preferences}
                                                onChange={() => toggleCategory('preferences')}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Actions */}
                            <div className="p-6 pt-4 border-t border-line bg-white">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowDetails(!showDetails)}
                                        className="sm:flex-1 border-line text-soft hover:text-ink hover:border-ink"
                                    >
                                        <Settings className="w-4 h-4 mr-2" />
                                        {showDetails ? "Masquer" : "Personnaliser"}
                                    </Button>

                                    {showDetails ? (
                                        <Button
                                            onClick={handleSavePreferences}
                                            className="sm:flex-1 bg-sauge hover:bg-ink text-white"
                                        >
                                            <Check className="w-4 h-4 mr-2" />
                                            Enregistrer mes choix
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                variant="outline"
                                                onClick={handleRejectAll}
                                                className="sm:flex-1 border-line text-soft hover:text-ink hover:border-ink"
                                            >
                                                <X className="w-4 h-4 mr-2" />
                                                Refuser
                                            </Button>
                                            <Button
                                                onClick={handleAcceptAll}
                                                className="sm:flex-1 bg-sauge hover:bg-ink text-white"
                                            >
                                                <Check className="w-4 h-4 mr-2" />
                                                Tout accepter
                                            </Button>
                                        </>
                                    )}
                                </div>

                                <p className="text-xs text-soft text-center mt-4">
                                    En savoir plus dans notre{" "}
                                    <a href="/confidentialite" className="text-sauge hover:underline">
                                        politique de confidentialité
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Composant pour chaque catégorie de cookie
function CookieCategory({
    title,
    description,
    checked,
    onChange,
    disabled = false,
    icon,
}: {
    title: string;
    description: string;
    checked: boolean;
    onChange?: () => void;
    disabled?: boolean;
    icon?: React.ReactNode;
}) {
    return (
        <label
            className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${disabled
                    ? "bg-gray-50 border-gray-200 cursor-not-allowed"
                    : checked
                        ? "bg-sauge/5 border-sauge/30 cursor-pointer"
                        : "bg-white border-line cursor-pointer hover:border-sauge/50"
                }`}
        >
            <div className="pt-0.5">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only"
                />
                <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${disabled
                            ? "bg-gray-300 border-gray-300"
                            : checked
                                ? "bg-sauge border-sauge"
                                : "border-gray-300"
                        }`}
                >
                    {checked && <Check className="w-3 h-3 text-white" />}
                </div>
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    {icon && <span className="text-soft">{icon}</span>}
                    <span className="font-medium text-ink text-sm">{title}</span>
                    {disabled && (
                        <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full">
                            Requis
                        </span>
                    )}
                </div>
                <p className="text-xs text-soft mt-1">{description}</p>
            </div>
        </label>
    );
}
