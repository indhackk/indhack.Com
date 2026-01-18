import { AuthProvider } from "@/lib/gmb/auth-context";

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
