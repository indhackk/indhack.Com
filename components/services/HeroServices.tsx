"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";
import { ArrowRight } from "lucide-react";

interface HeroServicesProps {
    title: string;
    subtitle: string;
    category: string;
    image: string;
    imageAlt?: string;
    density?: "default" | "compact";
    customVisual?: React.ReactNode;
}

export function HeroServices({ title, subtitle, category, image, imageAlt, density = "default", customVisual }: HeroServicesProps) {
    const { openAuditModal } = useModal();
    const imageSrc = image.startsWith('/') ? image : `/images/${image}.webp`;
    const preserveImageMetadata = imageSrc.startsWith('/images/local-heroes/') || imageSrc.startsWith('/images/cities/');
    const imageWidth = imageSrc.startsWith('/images/cities/') ? 1200 : preserveImageMetadata ? 1600 : 800;
    const imageHeight = imageSrc.startsWith('/images/cities/') ? 800 : preserveImageMetadata ? 900 : 600;
    const isCompact = density === "compact";

    return (
        <section className={`relative bg-ink overflow-hidden flex items-center ${isCompact
            ? "pt-28 pb-14 md:pt-[7.5rem] md:pb-16 min-h-[560px] lg:min-h-[620px]"
            : "pt-40 pb-24 min-h-[80vh]"
            }`}>
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sauge/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className={`grid lg:grid-cols-2 items-center min-w-0 ${isCompact ? "gap-10 lg:gap-12" : "gap-16"}`}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="min-w-0"
                    >
                        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-sauge/10 border border-sauge/20 ${isCompact ? "mb-6" : "mb-8"}`}>
                            <span className="w-2 h-2 rounded-full bg-sauge animate-pulse" />
                            <span className="text-sauge font-black text-xs uppercase tracking-[0.2em]">{category}</span>
                        </div>

                        <h1 className={`font-heading font-black text-white leading-[1.05] tracking-tight ${isCompact
                            ? "text-4xl md:text-5xl lg:text-[3.35rem] mb-6"
                            : "text-4xl md:text-5xl lg:text-6xl mb-8"
                            }`}>
                            {title}
                        </h1>

                        <p className={`text-soft-light leading-relaxed break-words ${isCompact
                            ? "text-lg lg:text-xl max-w-2xl mb-8"
                            : "text-xl lg:text-2xl max-w-xl mb-12"
                            }`}>
                            {subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5">
                            <Button
                                onClick={openAuditModal}
                                className={`bg-sauge text-white hover:bg-white hover:text-ink rounded-full font-bold tracking-wide shadow-2xl shadow-sauge/20 transition-all group ${isCompact ? "px-8 py-6" : "px-10 py-8"
                                    }`}
                            >
                                Demander un audit SEO
                                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative min-w-0 max-w-full"
                    >
                        {customVisual ? (
                            customVisual
                        ) : (
                            <div className={`relative max-w-full overflow-hidden shadow-2xl border border-white/10 group ${isCompact
                                ? "rounded-[1.5rem] md:rounded-[2rem] lg:max-w-[560px] lg:ml-auto"
                                : "rounded-[2rem] md:rounded-[3rem]"
                                }`}>
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt || title}
                                    width={imageWidth}
                                    height={imageHeight}
                                    unoptimized={preserveImageMetadata}
                                    priority
                                    fetchPriority="high"
                                    className={`w-full object-cover transition-all duration-1000 ${isCompact ? "aspect-[16/10]" : "h-auto"}`}
                                />
                                <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-700" />
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
