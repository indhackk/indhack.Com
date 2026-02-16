import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Conditions Générales de Vente",
    description: "Conditions générales de vente des prestations de consulting SEO et création de sites web par Indiana Aflalo - IndHack.",
    alternates: {
        canonical: "https://indhack.com/cgv"
    },
    robots: {
        index: false,
        follow: true
    }
};

export default function CGV() {
    const lastUpdate = "17 janvier 2025";

    return (
        <div className="container mx-auto px-4 py-24 max-w-4xl">
            <h1 className="text-4xl font-heading font-bold mb-4 text-ink">Conditions Générales de Vente</h1>
            <p className="text-soft mb-12">Dernière mise à jour : {lastUpdate}</p>

            <div className="space-y-10 text-soft leading-relaxed">

                {/* Préambule */}
                <section className="bg-fond-clair rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-ink mb-4">Préambule</h2>
                    <p>
                        Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles
                        entre Indiana Aflalo, exerçant sous le nom commercial IndHack (ci-après &quot;le Prestataire&quot;),
                        et toute personne physique ou morale (ci-après &quot;le Client&quot;) souhaitant bénéficier
                        des services proposés.
                    </p>
                </section>

                {/* Article 1 - Objet */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">Article 1 - Objet</h2>
                    <p className="mb-4">
                        Les présentes CGV ont pour objet de définir les droits et obligations des parties
                        dans le cadre de la vente des prestations de services proposées par IndHack, notamment :
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Audit SEO et recommandations stratégiques</li>
                        <li>Référencement naturel (SEO) et accompagnement</li>
                        <li>Création et refonte de sites web</li>
                        <li>Community Management et stratégie social media</li>
                        <li>Formation et consulting en marketing digital</li>
                    </ul>
                </section>

                {/* Article 2 - Devis et commande */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">Article 2 - Devis et commande</h2>
                    <p className="mb-4">
                        <strong className="text-ink">2.1 Devis :</strong> Tout projet fait l&apos;objet d&apos;un devis
                        détaillé et personnalisé, établi gratuitement. Le devis est valable 30 jours à compter
                        de sa date d&apos;émission.
                    </p>
                    <p className="mb-4">
                        <strong className="text-ink">2.2 Acceptation :</strong> La commande est considérée comme
                        définitive après signature du devis par le Client et réception de l&apos;acompte prévu.
                    </p>
                    <p>
                        <strong className="text-ink">2.3 Modifications :</strong> Toute modification de la commande
                        demandée par le Client après acceptation du devis fera l&apos;objet d&apos;un avenant au contrat initial.
                    </p>
                </section>

                {/* Article 3 - Tarifs et paiement */}
                <section className="bg-fond-clair rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-ink mb-4">Article 3 - Tarifs et modalités de paiement</h2>
                    <p className="mb-4">
                        <strong className="text-ink">3.1 Prix :</strong> Les prix sont exprimés en euros (EUR) et
                        s&apos;entendent hors taxes (HT). La TVA n&apos;est pas applicable conformément à l&apos;article
                        293 B du CGI (franchise en base de TVA).
                    </p>
                    <p className="mb-4">
                        <strong className="text-ink">3.2 Acompte :</strong> Sauf accord contraire, un acompte de 30%
                        du montant total est demandé à la signature du devis pour démarrer la prestation.
                    </p>
                    <p className="mb-4">
                        <strong className="text-ink">3.3 Échéances :</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                        <li>30% à la commande</li>
                        <li>40% à mi-parcours (livraison intermédiaire)</li>
                        <li>30% à la livraison finale</li>
                    </ul>
                    <p className="mb-4">
                        <strong className="text-ink">3.4 Moyens de paiement :</strong> Virement bancaire, PayPal,
                        ou tout autre moyen convenu entre les parties.
                    </p>
                    <p>
                        <strong className="text-ink">3.5 Retard de paiement :</strong> Tout retard de paiement
                        entraînera des pénalités de retard au taux légal en vigueur, ainsi qu&apos;une indemnité
                        forfaitaire de 40 euros pour frais de recouvrement.
                    </p>
                </section>

                {/* Article 4 - Délais et livraison */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">Article 4 - Délais de réalisation et livraison</h2>
                    <p className="mb-4">
                        <strong className="text-ink">4.1 Délais :</strong> Les délais de réalisation sont
                        communiqués à titre indicatif dans le devis. Le Prestataire s&apos;engage à respecter
                        ces délais dans la mesure du possible.
                    </p>
                    <p className="mb-4">
                        <strong className="text-ink">4.2 Retards :</strong> Les retards imputables au Client
                        (non-fourniture d&apos;éléments, validation tardive, etc.) ne peuvent être reprochés
                        au Prestataire et peuvent entraîner un report des délais.
                    </p>
                    <p>
                        <strong className="text-ink">4.3 Livraison :</strong> La livraison s&apos;effectue par voie
                        électronique (email, lien de téléchargement, accès au site) sauf accord contraire.
                    </p>
                </section>

                {/* Article 5 - Obligations */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">Article 5 - Obligations des parties</h2>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-ink mb-2">5.1 Obligations du Prestataire :</h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Exécuter la prestation avec soin et professionnalisme</li>
                            <li>Respecter les délais convenus dans la mesure du possible</li>
                            <li>Informer le Client de l&apos;avancement des travaux</li>
                            <li>Assurer la confidentialité des informations confiées</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-ink mb-2">5.2 Obligations du Client :</h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Fournir les éléments nécessaires à la réalisation de la prestation</li>
                            <li>Régler les factures aux échéances convenues</li>
                            <li>Valider les étapes intermédiaires dans les délais impartis</li>
                            <li>Disposer des droits sur les contenus fournis (textes, images, etc.)</li>
                        </ul>
                    </div>
                </section>

                {/* Article 6 - Propriété intellectuelle */}
                <section className="bg-fond-clair rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-ink mb-4">Article 6 - Propriété intellectuelle</h2>
                    <p className="mb-4">
                        <strong className="text-ink">6.1 Cession des droits :</strong> Le transfert de propriété
                        des créations au Client est effectif après paiement intégral de la facture.
                    </p>
                    <p className="mb-4">
                        <strong className="text-ink">6.2 Mention :</strong> Le Prestataire se réserve le droit
                        de mentionner la réalisation dans son portfolio et ses références, sauf demande
                        contraire écrite du Client.
                    </p>
                    <p>
                        <strong className="text-ink">6.3 Outils tiers :</strong> Les outils, frameworks et
                        bibliothèques utilisés restent soumis à leurs licences respectives.
                    </p>
                </section>

                {/* Article 7 - Confidentialité */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">Article 7 - Confidentialité</h2>
                    <p>
                        Chaque partie s&apos;engage à garder confidentielles les informations et documents
                        concernant l&apos;autre partie auxquels elle aurait pu avoir accès au cours de
                        l&apos;exécution du contrat. Cette obligation de confidentialité perdurera 2 ans
                        après la fin du contrat.
                    </p>
                </section>

                {/* Article 8 - Résiliation */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">Article 8 - Résiliation et annulation</h2>
                    <p className="mb-4">
                        <strong className="text-ink">8.1 Résiliation par le Client :</strong> En cas d&apos;annulation
                        par le Client après signature du devis, l&apos;acompte versé reste acquis au Prestataire
                        à titre d&apos;indemnité.
                    </p>
                    <p className="mb-4">
                        <strong className="text-ink">8.2 Résiliation par le Prestataire :</strong> Le Prestataire
                        peut résilier le contrat en cas de non-respect des obligations du Client, après mise
                        en demeure restée infructueuse pendant 15 jours.
                    </p>
                    <p>
                        <strong className="text-ink">8.3 Facturation :</strong> En cas de résiliation, les travaux
                        déjà réalisés seront facturés au prorata.
                    </p>
                </section>

                {/* Article 9 - Garantie et SAV */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">Article 9 - Garantie et service après-vente</h2>
                    <p className="mb-4">
                        <strong className="text-ink">9.1 Garantie :</strong> Le Prestataire garantit la conformité
                        des livrables avec le cahier des charges validé pendant 30 jours après livraison.
                    </p>
                    <p>
                        <strong className="text-ink">9.2 Corrections :</strong> Les corrections de bugs et
                        dysfonctionnements sont prises en charge gratuitement pendant la période de garantie.
                        Les évolutions et nouvelles fonctionnalités font l&apos;objet d&apos;un devis complémentaire.
                    </p>
                </section>

                {/* Article 10 - Responsabilité */}
                <section className="bg-fond-clair rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-ink mb-4">Article 10 - Limitation de responsabilité</h2>
                    <p className="mb-4">
                        <strong className="text-ink">10.1 Obligation de moyens :</strong> Les prestations SEO
                        constituent une obligation de moyens et non de résultat. Le Prestataire ne peut
                        garantir de positionnement spécifique sur les moteurs de recherche.
                    </p>
                    <p>
                        <strong className="text-ink">10.2 Plafond :</strong> La responsabilité du Prestataire
                        est limitée au montant des sommes effectivement perçues au titre du contrat concerné.
                    </p>
                </section>

                {/* Article 11 - Force majeure */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">Article 11 - Force majeure</h2>
                    <p>
                        Aucune des parties ne pourra être tenue responsable d&apos;un manquement à ses obligations
                        contractuelles occasionné par un cas de force majeure tel que défini par l&apos;article 1218
                        du Code civil et la jurisprudence des tribunaux français.
                    </p>
                </section>

                {/* Article 12 - Litiges */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">Article 12 - Droit applicable et litiges</h2>
                    <p className="mb-4">
                        <strong className="text-ink">12.1 Droit applicable :</strong> Les présentes CGV sont
                        soumises au droit français.
                    </p>
                    <p className="mb-4">
                        <strong className="text-ink">12.2 Médiation :</strong> En cas de litige, les parties
                        s&apos;engagent à rechercher une solution amiable avant toute action judiciaire.
                    </p>
                    <p>
                        <strong className="text-ink">12.3 Juridiction :</strong> À défaut d&apos;accord amiable,
                        les tribunaux compétents seront ceux du ressort du domicile du Prestataire.
                    </p>
                </section>

                {/* Contact */}
                <section className="bg-sauge/10 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-ink mb-4">Contact</h2>
                    <p className="mb-4">
                        Pour toute question relative à ces CGV :
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Email : <a href="mailto:contact@indhack.com" className="text-sauge hover:underline">contact@indhack.com</a></li>
                        <li>Téléphone : <a href="tel:+33661139748" className="text-sauge hover:underline">06 61 13 97 48</a></li>
                        <li><Link href="/contact" className="text-sauge hover:underline">Formulaire de contact</Link></li>
                    </ul>
                </section>

            </div>
        </div>
    );
}
