"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuditModalProps {
    isOpen: boolean;
    onClose: () => void;
}


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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Envoi via API sécurisée côté serveur
            const response = await fetch('/api/send-audit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    website: formData.website,
                    message: formData.message || 'Demande d\'audit SEO depuis IndHack.com',
                })
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                setTimeout(() => {
                    setFormData({ name: "", email: "", phone: "", website: "", message: "" });
                    setSubmitStatus('idle');
                    onClose();
                }, 2500);
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
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
                                <h2 className="text-xl font-heading font-bold text-ink">Demander un Audit Gratuit</h2>
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
                                            <span>Demande envoyée ! Nous vous recontactons sous 24h.</span>
                                        </div>
                                    )}
                                    {submitStatus === 'error' && (
                                        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                                            <AlertCircle className="w-5 h-5" />
                                            <span>Erreur d'envoi. Appelez-nous au 06 61 13 97 48</span>
                                        </div>
                                    )}
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || submitStatus === 'success'}
                                        className="w-full bg-sauge hover:bg-soft text-white transition-colors disabled:opacity-70"
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
