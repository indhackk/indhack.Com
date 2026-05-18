"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle, AlertCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { safeJsonResponse, buildFallbackMailto } from "@/lib/safe-json-response";

interface AuditModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FALLBACK_EMAIL = "contact@indhack.com";
const FALLBACK_PHONE = "06 61 13 97 48";

const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function AuditModal({ isOpen, onClose }: AuditModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        website: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [mailtoFallback, setMailtoFallback] = useState("");

    // Refs pour l'accessibilité dialog : focus trap + restauration.
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const firstFieldRef = useRef<HTMLInputElement | null>(null);
    const previouslyFocused = useRef<HTMLElement | null>(null);

    const buildCurrentMailto = (): string =>
        buildFallbackMailto({
            to: FALLBACK_EMAIL,
            subject: `Demande d'audit SEO IndHack — ${formData.name || "sans nom"}`,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            website: formData.website,
            message: formData.message || "Demande d'audit SEO depuis indhack.com",
        });

    // Gestion accessibilité dialog : focus trap, escape, lock scroll body,
    // restauration du focus sur le déclencheur à la fermeture.
    useEffect(() => {
        if (!isOpen) return;

        // Mémorise l'élément qui avait le focus avant ouverture pour le restaurer ensuite.
        previouslyFocused.current = (document.activeElement as HTMLElement | null) ?? null;

        // Donne le focus initial au premier champ du formulaire.
        const focusTimer = window.setTimeout(() => {
            firstFieldRef.current?.focus();
        }, 50);

        // Verrouille le scroll du body tant que la modale est ouverte.
        const previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== "Tab") return;
            const container = dialogRef.current;
            if (!container) return;

            const focusables = Array.from(
                container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
            ).filter((el) => !el.hasAttribute("aria-hidden") && el.offsetParent !== null);

            if (focusables.length === 0) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            const active = document.activeElement as HTMLElement | null;

            if (event.shiftKey && active === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && active === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            window.clearTimeout(focusTimer);
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousBodyOverflow;
            // Restaure le focus sur l'élément qui avait ouvert la modale, sauf
            // s'il a disparu du DOM entre-temps.
            const target = previouslyFocused.current;
            if (target && typeof target.focus === "function" && document.contains(target)) {
                target.focus();
            }
        };
    }, [isOpen, onClose]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setMailtoFallback("");

        try {
            const response = await fetch('/api/send-audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    website: formData.website,
                    message: formData.message || "Demande d'audit SEO depuis IndHack.com",
                })
            });

            const result = await safeJsonResponse<{ success?: boolean; error?: string }>(response);

            if (response.ok && result?.success) {
                setSubmitStatus('success');
                setTimeout(() => {
                    setFormData({ name: "", email: "", phone: "", website: "", message: "" });
                    setSubmitStatus('idle');
                    onClose();
                }, 2500);
            } else {
                setSubmitStatus('error');
                setMailtoFallback(buildCurrentMailto());
            }
        } catch {
            setSubmitStatus('error');
            setMailtoFallback(buildCurrentMailto());
        } finally {
            setIsSubmitting(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        aria-hidden="true"
                        className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div
                            ref={dialogRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="audit-modal-title"
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto border border-line"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-line bg-fond-clair">
                                <h2
                                    id="audit-modal-title"
                                    className="text-xl font-heading font-bold text-ink"
                                >
                                    Demander un audit SEO
                                </h2>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    aria-label="Fermer la fenêtre"
                                    className="p-2 text-soft hover:text-ink rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X size={20} aria-hidden="true" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="audit-name" className="text-sm font-medium text-ink">Nom complet</label>
                                    <Input
                                        ref={firstFieldRef}
                                        id="audit-name"
                                        name="name"
                                        autoComplete="name"
                                        required
                                        className="border-line focus:ring-sauge"
                                        placeholder="Jean Dupont"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="audit-email" className="text-sm font-medium text-ink">Email</label>
                                        <Input
                                            id="audit-email"
                                            name="email"
                                            type="email"
                                            inputMode="email"
                                            autoComplete="email"
                                            required
                                            className="border-line focus:ring-sauge"
                                            placeholder="jean@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="audit-phone" className="text-sm font-medium text-ink">Téléphone</label>
                                        <Input
                                            id="audit-phone"
                                            name="phone"
                                            type="tel"
                                            inputMode="tel"
                                            autoComplete="tel"
                                            className="border-line focus:ring-sauge"
                                            placeholder="06 12 34 56 78"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="audit-website" className="text-sm font-medium text-ink">
                                        Site web à auditer
                                    </label>
                                    <Input
                                        id="audit-website"
                                        name="website"
                                        type="url"
                                        inputMode="url"
                                        autoComplete="url"
                                        required
                                        className="border-line focus:ring-sauge"
                                        placeholder="https://votre-site.com"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="audit-message" className="text-sm font-medium text-ink">Message</label>
                                    <textarea
                                        id="audit-message"
                                        name="message"
                                        rows={3}
                                        className="flex w-full rounded-md border border-line bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Je souhaite améliorer mon référencement..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <div className="pt-4 space-y-3">
                                    {submitStatus === 'success' && (
                                        <div role="status" aria-live="polite" className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                                            <CheckCircle className="w-5 h-5" aria-hidden="true" />
                                            <span>Demande envoyée ! Je vous recontacte sous 24h.</span>
                                        </div>
                                    )}
                                    {submitStatus === 'error' && (
                                        <div role="alert" aria-live="assertive" className="p-3 bg-red-50 text-red-700 rounded-lg text-sm space-y-3">
                                            <div className="flex items-start gap-2">
                                                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                                <span>Envoi indisponible pour le moment. Écrivez-moi directement ou appelez-moi, votre demande reste prioritaire.</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 pl-7">
                                                {mailtoFallback && (
                                                    <a
                                                        href={mailtoFallback}
                                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-red-300 hover:bg-red-100 rounded-md font-medium text-red-800 transition-colors"
                                                    >
                                                        <Mail className="w-4 h-4" aria-hidden="true" />
                                                        Envoyer par email
                                                    </a>
                                                )}
                                                <a
                                                    href={`tel:+33${FALLBACK_PHONE.replace(/\s/g, '').slice(1)}`}
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-red-300 hover:bg-red-100 rounded-md font-medium text-red-800 transition-colors"
                                                >
                                                    <Phone className="w-4 h-4" aria-hidden="true" />
                                                    {FALLBACK_PHONE}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || submitStatus === 'success'}
                                        className="w-full bg-sauge hover:bg-ink text-white transition-all hover:-translate-y-0.5 shadow-lg shadow-sauge/20 disabled:opacity-70 disabled:hover:translate-y-0"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                                                Envoi en cours...
                                            </>
                                        ) : submitStatus === 'success' ? (
                                            <>
                                                <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                                                Envoyé !
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                                                Envoyer ma demande
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
