import { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
    title: "Contact | Indiana Aflalo - Consultante SEO",
    description: "Contactez Indiana Aflalo, consultante SEO experte. Devis gratuit sous 24h. Audit SEO offert pour votre projet de référencement naturel ou création de site.",
    alternates: {
        canonical: "https://indhack.com/contact"
    },
    openGraph: {
        title: "Contact | Indiana Aflalo - Consultante SEO",
        description: "Discutons de votre projet SEO. Réponse sous 24h garantie, audit offert.",
        url: "https://indhack.com/contact",
    }
};

export default function ContactPage() {
    return <ContactForm />;
}
