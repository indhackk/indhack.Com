"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Send, Linkedin, CheckCircle2, Clock, Shield } from "lucide-react";
import Link from "next/link";

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        website: "",
        message: "",
        budget: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const subject = encodeURIComponent(`Demande de contact - ${formData.company || formData.name}`);
        const body = encodeURIComponent(`
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}
Entreprise: ${formData.company || 'Non renseigné'}
Site web: ${formData.website || 'Non renseigné'}
Budget: ${formData.budget || 'Non renseigné'}

Message:
${formData.message}
    `);

        window.location.href = `mailto:contact@indhack.com?subject=${subject}&body=${body}`;
        setIsSubmitted(true);
    };

    return (
        <>
            {/* Hero */}
            <section className="bg-ink text-white pt-32 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-sauge font-medium mb-4">Contact</p>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                            Parlons de votre projet
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Vous cherchez à <strong>dominer Google</strong> dans votre secteur ?
                            Discutons de votre stratégie de visibilité.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-5 gap-12">

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-2 space-y-6"
                        >
                            <div>
                                <h2 className="text-2xl font-heading font-bold text-ink mb-4">
                                    Prendre contact
                                </h2>
                                <p className="text-soft leading-relaxed">
                                    Mission ponctuelle, accompagnement mensuel ou intégration remote —
                                    je suis disponible pour échanger sur vos besoins.
                                </p>
                            </div>

                            {/* Réassurance */}
                            <div className="bg-white p-4 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3 text-sm">
                                    <Clock className="w-5 h-5 text-sauge" />
                                    <span className="text-ink font-medium">Réponse sous 24h garantie</span>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3 text-sm">
                                    <Shield className="w-5 h-5 text-sauge" />
                                    <span className="text-ink font-medium">Audit SEO offert sans engagement</span>
                                </div>
                            </div>

                            {/* Contact Cards */}
                            <div className="space-y-3">
                                <a
                                    href="tel:0661139748"
                                    className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-sauge hover:shadow-md transition-all"
                                >
                                    <div className="w-12 h-12 bg-sauge/10 rounded-lg flex items-center justify-center group-hover:bg-sauge transition-colors">
                                        <Phone className="w-5 h-5 text-sauge group-hover:text-white" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-soft uppercase tracking-wider">Téléphone</div>
                                        <div className="font-semibold text-ink">06 61 13 97 48</div>
                                    </div>
                                </a>

                                <a
                                    href="mailto:contact@indhack.com"
                                    className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-sauge hover:shadow-md transition-all"
                                >
                                    <div className="w-12 h-12 bg-sauge/10 rounded-lg flex items-center justify-center group-hover:bg-sauge transition-colors">
                                        <Mail className="w-5 h-5 text-sauge group-hover:text-white" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-soft uppercase tracking-wider">Email</div>
                                        <div className="font-semibold text-ink">contact@indhack.com</div>
                                    </div>
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/indianaaflalo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-sauge hover:shadow-md transition-all"
                                >
                                    <div className="w-12 h-12 bg-sauge/10 rounded-lg flex items-center justify-center group-hover:bg-sauge transition-colors">
                                        <Linkedin className="w-5 h-5 text-sauge group-hover:text-white" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-soft uppercase tracking-wider">LinkedIn</div>
                                        <div className="font-semibold text-ink">Indiana Aflalo</div>
                                    </div>
                                </a>
                            </div>

                            {/* Services rapides */}
                            <div className="pt-4">
                                <p className="text-sm text-soft mb-3">Besoin d'un service précis ?</p>
                                <div className="flex flex-wrap gap-2">
                                    <Link href="/audit-seo" className="text-xs bg-sauge/10 text-sauge px-3 py-1.5 rounded-full hover:bg-sauge hover:text-white transition-all">
                                        Audit SEO
                                    </Link>
                                    <Link href="/referencement-naturel" className="text-xs bg-sauge/10 text-sauge px-3 py-1.5 rounded-full hover:bg-sauge hover:text-white transition-all">
                                        Référencement
                                    </Link>
                                    <Link href="/creation-site-web" className="text-xs bg-sauge/10 text-sauge px-3 py-1.5 rounded-full hover:bg-sauge hover:text-white transition-all">
                                        Création site
                                    </Link>
                                    <Link href="/seo-local" className="text-xs bg-sauge/10 text-sauge px-3 py-1.5 rounded-full hover:bg-sauge hover:text-white transition-all">
                                        SEO Local
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="lg:col-span-3"
                        >
                            {isSubmitted ? (
                                <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-ink mb-3">Message envoyé !</h3>
                                    <p className="text-soft mb-6">
                                        Votre client mail s'est ouvert. Je vous réponds sous 24h maximum.
                                    </p>
                                    <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-full">
                                        Envoyer un autre message
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                                    <div>
                                        <h3 className="text-xl font-heading font-bold text-ink mb-1">Votre projet</h3>
                                        <p className="text-soft text-sm">Décrivez votre besoin, je reviens vers vous rapidement.</p>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-ink mb-1.5">Nom complet *</label>
                                            <Input
                                                required
                                                placeholder="Votre nom"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="py-5 rounded-lg border-gray-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-ink mb-1.5">Email *</label>
                                            <Input
                                                type="email"
                                                required
                                                placeholder="votre@email.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="py-5 rounded-lg border-gray-200"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-ink mb-1.5">Téléphone</label>
                                            <Input
                                                type="tel"
                                                placeholder="06 XX XX XX XX"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="py-5 rounded-lg border-gray-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-ink mb-1.5">Entreprise</label>
                                            <Input
                                                placeholder="Nom de votre entreprise"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                className="py-5 rounded-lg border-gray-200"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-ink mb-1.5">Site web actuel</label>
                                        <Input
                                            placeholder="https://..."
                                            value={formData.website}
                                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                            className="py-5 rounded-lg border-gray-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-ink mb-1.5">Budget envisagé</label>
                                        <select
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                            className="w-full py-3 px-4 rounded-lg border border-gray-200 focus:border-sauge focus:outline-none bg-white text-ink"
                                        >
                                            <option value="">Sélectionner...</option>
                                            <option value="< 1000€">Moins de 1 000€</option>
                                            <option value="1000-3000€">1 000€ - 3 000€</option>
                                            <option value="3000-5000€">3 000€ - 5 000€</option>
                                            <option value="> 5000€">Plus de 5 000€</option>
                                            <option value="Récurrent">Accompagnement mensuel</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-ink mb-1.5">Décrivez votre projet *</label>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder="Vos objectifs, vos défis actuels..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full py-3 px-4 rounded-lg border border-gray-200 focus:border-sauge focus:outline-none resize-none"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full bg-sauge hover:bg-ink text-white py-6 rounded-lg text-lg font-semibold transition-all group"
                                    >
                                        <Send className="mr-2 w-5 h-5" />
                                        Envoyer ma demande
                                    </Button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
