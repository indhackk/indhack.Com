import { TesteurIAWidget } from "@/components/widget/TesteurIAWidget";

interface PageProps {
    searchParams: Promise<{
        email?: string;
        color?: string;
        btn?: string;
        btnText?: string;
        radius?: string;
        dark?: string;
    }>;
}

export default async function WidgetTesteurIAPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const agencyEmail = params.email || undefined;

    // Personnalisation via query params
    const theme = {
        primaryColor: params.color ? `#${params.color}` : undefined,
        buttonColor: params.btn ? `#${params.btn}` : undefined,
        buttonText: params.btnText || undefined,
        borderRadius: params.radius || undefined,
        darkMode: params.dark === "1",
    };

    return (
        <main
            className="py-4"
            style={{
                backgroundColor: theme.darkMode ? "#1a1a2e" : "#FAFBFA",
            }}
        >
            <TesteurIAWidget
                agencyEmail={agencyEmail}
                showLeadForm={!!agencyEmail}
                theme={theme}
            />
        </main>
    );
}
