"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CallToActionProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

export function CallToAction({ title, description, buttonText, buttonLink }: CallToActionProps) {
    return (
        <div className="my-12 p-8 md:p-12 rounded-3xl bg-ink text-white text-center not-prose">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                {title}
            </h3>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
                {description}
            </p>
            <Link href={buttonLink}>
                <Button
                    className="bg-sauge text-white hover:bg-white hover:text-ink rounded-full px-10 py-7 text-lg font-bold transition-all shadow-xl shadow-sauge/20"
                >
                    {buttonText}
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </Link>
        </div>
    );
}
