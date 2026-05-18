import type { Metadata } from 'next';

// Pour s'assurer que /admin-login ne ressort jamais dans les SERP, même si
// quelqu'un active ADMIN_ENABLED=true. Le middleware renvoie 404 par défaut
// donc Google ne devrait pas voir la page, mais on met noindex en ceinture.
export const metadata: Metadata = {
    title: 'Admin',
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    },
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
