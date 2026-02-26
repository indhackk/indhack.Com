import { TesteurIAWidget } from "@/components/widget/TesteurIAWidget";

interface PageProps {
    searchParams: Promise<{ email?: string }>;
}

export default async function WidgetTesteurIAPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const agencyEmail = params.email || undefined;

    return (
        <main className="min-h-screen bg-fond-clair py-4">
            <TesteurIAWidget
                agencyEmail={agencyEmail}
                showLeadForm={!!agencyEmail}
            />
        </main>
    );
}
