"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to monitoring service (Sentry, etc.) in production
        if (process.env.NODE_ENV === "production") {
            // Could send to error tracking service here
        }
    }, [error]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-fond-clair to-white flex items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* Error Visual */}
                <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="w-12 h-12 text-red-600" />
                    </div>
                </div>

                {/* Message */}
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-4">
                    Une erreur est survenue
                </h1>
                <p className="text-soft text-lg mb-8 max-w-md mx-auto">
                    Nous nous excusons pour ce désagrément. Notre équipe a été notifiée
                    et travaille à résoudre le problème.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Button
                        onClick={reset}
                        className="bg-sauge hover:bg-sauge/90 text-white rounded-full px-8 py-6"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Réessayer
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="rounded-full px-8 py-6 border-ink/20"
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <Home className="w-4 h-4" />
                            Retour à l'accueil
                        </Link>
                    </Button>
                </div>

                {/* Contact for help */}
                <div className="border-t border-gray-200 pt-8">
                    <p className="text-sm text-soft mb-4">
                        Le problème persiste ?
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-sauge hover:underline"
                    >
                        <Phone className="w-4 h-4" />
                        Contactez-nous
                    </Link>
                </div>

                {/* Error reference (only in dev) */}
                {process.env.NODE_ENV === "development" && error.digest && (
                    <p className="mt-8 text-xs text-gray-400">
                        Référence: {error.digest}
                    </p>
                )}
            </div>
        </main>
    );
}
