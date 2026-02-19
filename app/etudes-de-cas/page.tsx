import { Metadata } from "next";
import EtudesDeCasClient from "./EtudesDeCasClient";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ServiceSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
    title: "Études de Cas SEO | Résultats Clients Concrets – IndHack",
    description: "Résultats SEO obtenus pour mes clients : trafic multiplié, leads qualifiés, positions Google. Études de cas chiffrées.",
    alternates: {
        canonical: "https://indhack.com/etudes-de-cas"
    },
    openGraph: {
        title: "Études de Cas SEO | Résultats Clients – IndHack",
        description: "Résultats concrets : trafic organique multiplié, positions Google gagnées. Découvrez mes études de cas.",
        url: "https://indhack.com/etudes-de-cas",
    }
};

export default function EtudesDeCasPage() {
    return (
        <>
            <ServiceSchema
                name="Études de Cas SEO"
                description="Résultats concrets obtenus pour mes clients en référencement naturel et SEO local."
                url="https://indhack.com/etudes-de-cas"
                serviceType="Études de Cas SEO"
            />
            <Breadcrumb items={[{ label: "Études de cas", href: "/etudes-de-cas" }]} />
            <EtudesDeCasClient />
        </>
    );
}
