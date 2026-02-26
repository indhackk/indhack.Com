"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/NavbarOptimized";

// Lazy load below-fold / delayed components for better LCP
const MegaFooter = dynamic(() => import("@/components/MegaFooter").then(mod => ({ default: mod.MegaFooter })), {
    loading: () => <footer className="bg-ink min-h-[400px]" />,
});
const CookieConsent = dynamic(() => import("@/components/CookieConsent").then(mod => ({ default: mod.CookieConsent })), {
    ssr: false, // Cookie consent is client-only anyway
});
const FloatingCTA = dynamic(() => import("@/components/ui/FloatingCTA").then(mod => ({ default: mod.FloatingCTA })), {
    ssr: false,
});

// Routes where we hide the main site layout (Navbar, Footer, etc.)
const ISOLATED_ROUTES = ["/login", "/app", "/diagnostic", "/pour-pauline", "/widget"];

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
            <FloatingCTA />
        </>
    );
}
