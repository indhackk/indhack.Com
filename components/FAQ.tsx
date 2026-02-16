"use client";

import { useState } from "react";
import { ChevronDown, Search, Target, Sparkles, Clock, Euro, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { FAQSchema } from "@/components/FAQSchema";

interface FAQItem {
    question: string;
    answer: string;
    icon?: React.ReactNode;
}

interface FAQProps {
    items?: FAQItem[];
    title?: string;
}

const defaultFaqs = [
    {
        icon: <Search className="w-5 h-5" />,
        question: "Qu'est-ce qu'un audit SEO et à quoi sert-il ?",
        answer: "L'audit SEO est une analyse chirurgicale de votre écosystème digital. Il identifie les freins techniques et sémantiques qui bloquent votre visibilité. Le livrable est une roadmap priorisée par impact business : on commence par les actions qui rapportent le plus de trafic qualifié immédiatement."
    },
    {
        icon: <Sparkles className="w-5 h-5" />,
        question: "Le SEO est-il utile pour apparaître sur ChatGPT (GEO) ?",
        answer: "Oui, c'est même le socle. Le GEO (Generative Engine Optimization) repose sur les mêmes piliers que le SEO moderne : autorité structurelle, données structurées et expertise du contenu. Travailler votre SEO aujourd'hui, c'est garantir votre présence dans les réponses des IA demain."
    },
    {
        icon: <Clock className="w-5 h-5" />,
        question: "Quand verrai-je les premiers résultats ?",
        answer: "Le référencement naturel est un actif digital. Les premiers effets sur le crawl et l'indexation se voient en quelques semaines, mais les résultats significatifs sur le trafic arrivent entre 3 et 6 mois. C'est un investissement à ROI exponentiel."
    },
    {
        icon: <Target className="w-5 h-5" />,
        question: "Pourquoi choisir une consultante freelance plutôt qu'une agence ?",
        answer: "Pour la proximité et l'expertise directe. Vous interagissez avec l'experte qui réalise réellement le travail. Mon approche est 100% sur-mesure, réactive et totalement transparente sur les actions menées et les résultats obtenus."
    }
];

export function FAQ({ items = defaultFaqs, title = "Questions Fréquentes" }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-14 bg-white" id="faq">
            {/* Schema JSON-LD pour Google Rich Results */}
            <FAQSchema items={items} />
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 px-4">
                    <div className="max-w-xl">

                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-ink uppercase tracking-tighter leading-none">
                            Besoin de <br />
                            <span className="text-sauge">Réponses</span> ?
                        </h2>
                    </div>
                </div>

                <div className="grid gap-4">
                    {items.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`rounded-3xl border transition-all duration-300 overflow-hidden ${openIndex === index
                                ? 'bg-fond-clair border-sauge/30 shadow-xl shadow-ink/5'
                                : 'bg-white border-line hover:border-sauge/20 hover:shadow-lg hover:shadow-ink/5'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-7 md:p-9 text-left focus:outline-none group"
                            >
                                <div className="flex items-center gap-6">
                                    <span className={`text-sm font-bold italic transition-colors ${openIndex === index ? 'text-sauge' : 'text-gray-200'}`}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className={`text-xl font-heading font-bold transition-colors ${openIndex === index ? 'text-ink' : 'text-soft group-hover:text-ink'}`}>
                                        {faq.question}
                                    </span>
                                </div>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center transition-all ${openIndex === index ? 'rotate-180 bg-sauge border-sauge text-white' : 'text-soft group-hover:scale-110'}`}>
                                    <ChevronDown size={20} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="px-7 md:px-9 pb-9 pt-0 pl-14 md:pl-24">
                                            <div className="text-soft text-lg leading-relaxed max-w-2xl">
                                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{typeof faq.answer === 'string' ? faq.answer : ''}</ReactMarkdown>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
