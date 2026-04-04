"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="w-full flex items-center justify-center gap-2 bg-white border border-line text-ink px-4 py-2 rounded-lg text-sm font-medium hover:bg-fond-clair transition-colors"
        >
            <Printer className="w-4 h-4" />
            Imprimer / PDF
        </button>
    );
}
