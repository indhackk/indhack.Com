"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { MegaFooter } from "@/components/MegaFooter";
import { CookieConsent } from "@/components/CookieConsent";
import { FloatingCTA } from "@/components/ui/FloatingCTA";

// Routes where we hide the main site layout (Navbar, Footer, etc.)
const ISOLATED_ROUTES = ["/login", "/app", "/diagnostic"];

function isIsolatedRoute(pathname: string): boolean {
    return ISOLATED_ROUTES.some(route =>
        pathname === route || pathname.startsWith(`${route}/`)
    );
}

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isIsolated = isIsolatedRoute(pathname);

    if (isIsolated) {
        // Return children only - no Navbar, Footer, etc.
        return <>{children}</>;
    }

    // Normal site layout with Navbar, Footer, etc.
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
            <MegaFooter />
            <CookieConsent />
            <FloatingCTA />
        </>
    );
}
