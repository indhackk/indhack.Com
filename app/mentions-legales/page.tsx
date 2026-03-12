import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Mentions Légales",
    description: "Mentions légales du site indhack.com édité par Indiana Aflalo, consultante SEO et experte en acquisition digitale.",
    alternates: {
        canonical: "https://indhack.com/mentions-legales"
    },
    robots: {
        index: true,
        follow: true
    }
};

export default function MentionsLegales() {
    const lastUpdate = "17 janvier 2025";

    return (
        <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
            <h1 className="text-4xl font-heading font-bold mb-4 text-ink">Mentions Légales</h1>
            <p className="text-soft mb-12">Dernière mise à jour : {lastUpdate}</p>

            <div className="space-y-10 text-soft leading-relaxed">

                {/* Section 1 - Éditeur */}
                <section className="bg-fond-clair rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-ink mb-4">1. Éditeur du site</h2>
                    <div className="space-y-2">
                        <p><strong className="text-ink">Raison sociale :</strong> Indiana Aflalo - Entreprise Individuelle</p>
                        <p><strong className="text-ink">Nom commercial :</strong> IndHack</p>
                        <p><strong className="text-ink">Responsable de la publication :</strong> Indiana Aflalo</p>
                        <p><strong className="text-ink">Adresse email :</strong> contact@indhack.com</p>
                        <p><strong className="text-ink">Téléphone :</strong> 06 61 13 97 48</p>
                        <p><strong className="text-ink">Activité :</strong> Consulting SEO, création de sites web, marketing digital</p>
                    </div>
                </section>

                {/* Section 2 - Hébergement */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">2. Hébergement</h2>
                    <div className="space-y-2">
                        <p><strong className="text-ink">Hébergeur :</strong> Vercel Inc.</p>
                        <p><strong className="text-ink">Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                        <p><strong className="text-ink">Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-sauge hover:underline">vercel.com</a></p>
                    </div>
                </section>

                {/* Section 3 - Propriété intellectuelle */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">3. Propriété intellectuelle</h2>
                    <p className="mb-4">
                        L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels, etc.)
                        est la propriété exclusive d&apos;Indiana Aflalo / IndHack, à l&apos;exception des marques, logos ou contenus
                        appartenant à d&apos;autres sociétés partenaires ou auteurs.
                    </p>
                    <p className="mb-4">
                        Toute reproduction, distribution, modification, adaptation, retransmission ou publication,
                        même partielle, de ces différents éléments est strictement interdite sans l&apos;accord exprès
                        par écrit d&apos;Indiana Aflalo.
                    </p>
                    <p>
                        Cette représentation ou reproduction, par quelque procédé que ce soit, constitue une contrefaçon
                        sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
                    </p>
                </section>

                {/* Section 4 - Données personnelles */}
                <section className="bg-fond-clair rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-ink mb-4">4. Protection des données personnelles</h2>
                    <p className="mb-4">
                        Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
                        Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez des droits suivants
                        concernant vos données personnelles :
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                        <li>Droit d&apos;accès à vos données</li>
                        <li>Droit de rectification</li>
                        <li>Droit à l&apos;effacement (&quot;droit à l&apos;oubli&quot;)</li>
                        <li>Droit à la limitation du traitement</li>
                        <li>Droit à la portabilité des données</li>
                        <li>Droit d&apos;opposition</li>
                    </ul>
                    <p className="mb-4">
                        Pour exercer ces droits ou pour toute question relative à vos données personnelles,
                        contactez-nous à : <strong className="text-ink">contact@indhack.com</strong>
                    </p>
                    <p>
                        Pour plus d&apos;informations, consultez notre{" "}
                        <Link href="/confidentialite" className="text-sauge hover:underline font-medium">
                            Politique de Confidentialité
                        </Link>
                        .
                    </p>
                </section>

                {/* Section 5 - Cookies */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">5. Cookies</h2>
                    <p className="mb-4">
                        Ce site utilise des cookies pour améliorer votre expérience de navigation et analyser
                        le trafic. Vous pouvez à tout moment gérer vos préférences via notre bandeau de consentement
                        ou les paramètres de votre navigateur.
                    </p>
                    <p>
                        <strong className="text-ink">Types de cookies utilisés :</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                        <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site</li>
                        <li><strong>Cookies analytiques :</strong> Google Analytics (avec votre consentement)</li>
                    </ul>
                </section>

                {/* Section 6 - Limitation de responsabilité */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">6. Limitation de responsabilité</h2>
                    <p className="mb-4">
                        Les informations contenues sur ce site sont aussi précises que possible et le site
                        est périodiquement mis à jour, mais peut toutefois contenir des inexactitudes, des
                        omissions ou des lacunes.
                    </p>
                    <p className="mb-4">
                        IndHack ne pourra être tenu responsable des dommages directs ou indirects causés au
                        matériel de l&apos;utilisateur, lors de l&apos;accès au site indhack.com, et résultant soit de
                        l&apos;utilisation d&apos;un matériel ne répondant pas aux spécifications requises, soit de
                        l&apos;apparition d&apos;un bug ou d&apos;une incompatibilité.
                    </p>
                    <p>
                        IndHack ne pourra également être tenu responsable des dommages indirects consécutifs
                        à l&apos;utilisation du site indhack.com.
                    </p>
                </section>

                {/* Section 7 - Liens hypertextes */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">7. Liens hypertextes</h2>
                    <p className="mb-4">
                        Ce site peut contenir des liens hypertextes vers d&apos;autres sites internet. IndHack
                        n&apos;assume aucune responsabilité quant au contenu de ces sites externes.
                    </p>
                    <p>
                        La création de liens hypertextes vers le site indhack.com est soumise à l&apos;accord
                        préalable de l&apos;éditeur.
                    </p>
                </section>

                {/* Section 8 - Droit applicable */}
                <section className="bg-fond-clair rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-ink mb-4">8. Droit applicable et juridiction</h2>
                    <p className="mb-4">
                        Les présentes mentions légales sont régies par le droit français. En cas de litige,
                        et après échec de toute tentative de recherche d&apos;une solution amiable, les tribunaux
                        français seront seuls compétents.
                    </p>
                </section>

                {/* Section 9 - Contact */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">9. Contact</h2>
                    <p>
                        Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                        <li>Par email : <a href="mailto:contact@indhack.com" className="text-sauge hover:underline">contact@indhack.com</a></li>
                        <li>Par téléphone : <a href="tel:+33661139748" className="text-sauge hover:underline">06 61 13 97 48</a></li>
                        <li>Via notre <Link href="/contact" className="text-sauge hover:underline">formulaire de contact</Link></li>
                    </ul>
                </section>

            </div>
        </div>
    );
}
