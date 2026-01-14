import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'IndHack Admin',
    description: 'Administration du site IndHack',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body>{children}</body>
        </html>
    );
}
