"use client";

import { useState } from "react";
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

    const handleSubmit = async (e: React.FormEvent) => {
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
    };

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
                        className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto border border-line">
                            <div className="flex items-center justify-between p-6 border-b border-line bg-fond-clair">
                                <h2 className="text-xl font-heading font-bold text-ink">Demander un audit SEO</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-soft hover:text-ink rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-ink">Nom complet</label>
                                    <Input
                                        id="name"
                                        required
                                        className="border-line focus:ring-sauge"
                                        placeholder="Jean Dupont"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-ink">Email</label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            className="border-line focus:ring-sauge"
                                            placeholder="jean@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-ink">Téléphone</label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            className="border-line focus:ring-sauge"
                                            placeholder="06 12 34 56 78"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="website" className="text-sm font-medium text-ink">Site Web (optionnel)</label>
                                    <Input
                                        id="website"
                                        className="border-line focus:ring-sauge"
                                        placeholder="https://votre-site.com"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-ink">Message</label>
                                    <textarea
                                        id="message"
                                        rows={3}
                                        className="flex w-full rounded-md border border-line bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Je souhaite améliorer mon référencement..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <div className="pt-4 space-y-3">
                                    {submitStatus === 'success' && (
                                        <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                                            <CheckCircle className="w-5 h-5" />
                                            <span>Demande envoyée ! Je vous recontacte sous 24h.</span>
                                        </div>
                                    )}
                                    {submitStatus === 'error' && (
                                        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm space-y-3">
                                            <div className="flex items-start gap-2">
                                                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                                <span>Envoi indisponible pour le moment. Écrivez-moi directement ou appelez-moi, votre demande reste prioritaire.</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 pl-7">
                                                {mailtoFallback && (
                                                    <a
                                                        href={mailtoFallback}
                                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-red-300 hover:bg-red-100 rounded-md font-medium text-red-800 transition-colors"
                                                    >
                                                        <Mail className="w-4 h-4" />
                                                        Envoyer par email
                                                    </a>
                                                )}
                                                <a
                                                    href={`tel:+33${FALLBACK_PHONE.replace(/\s/g, '').slice(1)}`}
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-red-300 hover:bg-red-100 rounded-md font-medium text-red-800 transition-colors"
                                                >
                                                    <Phone className="w-4 h-4" />
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
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Envoi en cours...
                                            </>
                                        ) : submitStatus === 'success' ? (
                                            <>
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                Envoyé !
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
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
