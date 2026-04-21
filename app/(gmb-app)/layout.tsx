import type { Metadata } from "next";
import { AuthProvider } from "@/lib/gmb/auth-context";

// Zone admin privée — aucune page ne doit être indexée
export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        noarchive: true,
        nosnippet: true,
        noimageindex: true,
    },
};

export default function GMBAppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
