"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Chrome, Shield, CheckCircle2, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    simulateGoogleConnection,
    getSimulatedConnection,
    isSimulationMode,
    disconnectSimulation,
    addSimulatedLocation,
    SimulatedLocation
} from "@/lib/gmb/google-business-api";

interface ConnectGoogleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnected: () => void;
}

type Step = 'intro' | 'connecting' | 'select-locations' | 'success' | 'error';

// Sample locations for simulation
const SAMPLE_LOCATIONS: SimulatedLocation[] = [
    {
        id: 'loc_1',
        name: 'Restaurant Le Gourmet',
        address: '15 Rue de la République',
        city: 'Strasbourg',
        postalCode: '67000',
        category: 'Restaurant',
        phone: '+33 3 88 12 34 56',
        website: 'https://legourmet-strasbourg.fr',
        rating: 4.6,
        totalReviews: 127,
        mapsUrl: 'https://maps.google.com/?cid=12345',
        newReviewUrl: 'https://g.page/r/legourmet/review'
    },
    {
        id: 'loc_2',
        name: 'Salon de Coiffure Style',
        address: '42 Avenue des Vosges',
        city: 'Strasbourg',
        postalCode: '67000',
        category: 'Salon de coiffure',
        phone: '+33 3 88 98 76 54',
        rating: 4.8,
        totalReviews: 89,
        mapsUrl: 'https://maps.google.com/?cid=67890',
        newReviewUrl: 'https://g.page/r/salonstyle/review'
    },
    {
        id: 'loc_3',
        name: 'Cabinet Dentaire Dr. Martin',
        address: '8 Place Kléber',
        city: 'Strasbourg',
        postalCode: '67000',
        category: 'Dentiste',
        phone: '+33 3 88 45 67 89',
        website: 'https://dr-martin-dentiste.fr',
        rating: 4.9,
        totalReviews: 203,
        mapsUrl: 'https://maps.google.com/?cid=11111',
        newReviewUrl: 'https://g.page/r/drmartin/review'
    }
];

export function ConnectGoogleModal({ isOpen, onClose, onConnected }: ConnectGoogleModalProps) {
    const [step, setStep] = useState<Step>('intro');
    const [email, setEmail] = useState('');
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleConnect = async () => {
        if (!email) {
            setErrorMessage('Veuillez entrer votre email Google');
            return;
        }

        setIsLoading(true);
        setStep('connecting');

        // Simulate OAuth flow delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            // In demo mode, simulate the connection
            simulateGoogleConnection(email);
            setStep('select-locations');
        } catch (error) {
            setErrorMessage('Erreur lors de la connexion à Google');
            setStep('error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLocationToggle = (locationId: string) => {
        setSelectedLocations(prev =>
            prev.includes(locationId)
                ? prev.filter(id => id !== locationId)
                : [...prev, locationId]
        );
    };

    const handleConfirmLocations = async () => {
        if (selectedLocations.length === 0) {
            setErrorMessage('Veuillez sélectionner au moins une fiche');
            return;
        }

        setIsLoading(true);

        // Add selected locations to the simulated connection
        const selectedLocs = SAMPLE_LOCATIONS.filter(loc => selectedLocations.includes(loc.id));
        selectedLocs.forEach(loc => {
            addSimulatedLocation('account_1', loc);
        });

        await new Promise(resolve => setTimeout(resolve, 1000));

        setStep('success');
        setIsLoading(false);

        // After a brief success message, close and refresh
        setTimeout(() => {
            onConnected();
            onClose();
        }, 2000);
    };

    const handleClose = () => {
        setStep('intro');
        setEmail('');
        setSelectedLocations([]);
        setErrorMessage('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={handleClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-ink to-ink/90 px-6 py-8 text-white">
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                                <Chrome className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Connecter Google</h2>
                                <p className="text-white/60 text-sm">
                                    Liez votre compte Google My Business
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            {step === 'intro' && (
                                <motion.div
                                    key="intro"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    {/* Security Info */}
                                    <div className="flex items-start gap-3 p-4 bg-sauge/10 rounded-xl">
                                        <Shield className="w-5 h-5 text-sauge flex-shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-medium text-ink">Connexion sécurisée OAuth 2.0</p>
                                            <p className="text-gray-500 mt-1">
                                                Nous n'avons jamais accès à votre mot de passe Google.
                                                La connexion est cryptée et vous gardez le contrôle total.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email Input (for demo) */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Google
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="votre@email.com"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sauge/20 focus:border-sauge"
                                        />
                                        {errorMessage && (
                                            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                                        )}
                                    </div>

                                    {/* Permissions */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 mb-3">
                                            GMB AutoPilot aura accès à :
                                        </p>
                                        <ul className="space-y-2">
                                            {[
                                                'Voir vos fiches Google Business Profile',
                                                'Lire les avis de vos établissements',
                                                'Répondre aux avis (avec votre validation)'
                                            ].map((perm, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                    <CheckCircle2 className="w-4 h-4 text-sauge" />
                                                    {perm}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Button
                                        onClick={handleGoogleConnect}
                                        disabled={isLoading}
                                        className="w-full bg-ink hover:bg-ink/90 text-white rounded-xl py-6 text-lg font-medium flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <Chrome className="w-5 h-5" />
                                                Connecter avec Google
                                            </>
                                        )}
                                    </Button>

                                    <p className="text-xs text-center text-gray-400">
                                        Mode démo : la connexion est simulée pour la démonstration
                                    </p>
                                </motion.div>
                            )}

                            {step === 'connecting' && (
                                <motion.div
                                    key="connecting"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="py-12 text-center"
                                >
                                    <div className="w-16 h-16 mx-auto mb-6 relative">
                                        <div className="absolute inset-0 border-4 border-sauge/20 rounded-full" />
                                        <div className="absolute inset-0 border-4 border-sauge rounded-full border-t-transparent animate-spin" />
                                    </div>
                                    <h3 className="text-xl font-bold text-ink mb-2">
                                        Connexion en cours...
                                    </h3>
                                    <p className="text-gray-500">
                                        Récupération de vos fiches Google Business
                                    </p>
                                </motion.div>
                            )}

                            {step === 'select-locations' && (
                                <motion.div
                                    key="select-locations"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold text-ink mb-1">
                                            Sélectionnez vos fiches
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Choisissez les établissements à gérer avec GMB AutoPilot
                                        </p>
                                    </div>

                                    {errorMessage && (
                                        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            {errorMessage}
                                        </div>
                                    )}

                                    <div className="space-y-3 max-h-64 overflow-y-auto">
                                        {SAMPLE_LOCATIONS.map(location => (
                                            <button
                                                key={location.id}
                                                onClick={() => handleLocationToggle(location.id)}
                                                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                                                    selectedLocations.includes(location.id)
                                                        ? 'border-sauge bg-sauge/5'
                                                        : 'border-gray-100 hover:border-gray-200'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <p className="font-medium text-ink">
                                                            {location.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 mt-0.5">
                                                            {location.address}, {location.postalCode} {location.city}
                                                        </p>
                                                        <div className="flex items-center gap-3 mt-2 text-sm">
                                                            <span className="text-amber-600">
                                                                ★ {location.rating}
                                                            </span>
                                                            <span className="text-gray-400">
                                                                {location.totalReviews} avis
                                                            </span>
                                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                                                                {location.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                                        selectedLocations.includes(location.id)
                                                            ? 'bg-sauge border-sauge'
                                                            : 'border-gray-300'
                                                    }`}>
                                                        {selectedLocations.includes(location.id) && (
                                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <Button
                                        onClick={handleConfirmLocations}
                                        disabled={isLoading || selectedLocations.length === 0}
                                        className="w-full bg-sauge hover:bg-sauge/90 text-white rounded-xl py-4 font-medium flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                Connecter {selectedLocations.length} fiche{selectedLocations.length > 1 ? 's' : ''}
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </Button>
                                </motion.div>
                            )}

                            {step === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="py-12 text-center"
                                >
                                    <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-ink mb-2">
                                        Connexion réussie !
                                    </h3>
                                    <p className="text-gray-500">
                                        Vos fiches Google sont maintenant connectées.
                                        <br />
                                        Redirection vers le dashboard...
                                    </p>
                                </motion.div>
                            )}

                            {step === 'error' && (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="py-8 text-center"
                                >
                                    <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                                        <AlertCircle className="w-8 h-8 text-red-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-ink mb-2">
                                        Erreur de connexion
                                    </h3>
                                    <p className="text-gray-500 mb-6">
                                        {errorMessage || 'Une erreur est survenue. Veuillez réessayer.'}
                                    </p>
                                    <Button
                                        onClick={() => setStep('intro')}
                                        className="bg-ink hover:bg-ink/90 text-white rounded-xl"
                                    >
                                        Réessayer
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
