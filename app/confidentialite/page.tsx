import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Politique de Confidentialité",
    description: "Politique de confidentialité et gestion des données personnelles du site indhack.com - Consultante SEO Indiana Aflalo. Conforme RGPD.",
    alternates: {
        canonical: "https://indhack.com/confidentialite"
    },
    robots: {
        index: false,
        follow: true
    }
};

export default function Confidentialite() {
    const lastUpdate = "17 janvier 2025";

    return (
        <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
            <h1 className="text-4xl font-heading font-bold mb-4 text-ink">Politique de Confidentialité</h1>
            <p className="text-soft mb-12">Dernière mise à jour : {lastUpdate}</p>

            <div className="space-y-10 text-soft leading-relaxed">

                {/* Introduction */}
                <section className="bg-fond-clair rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-ink mb-4">Introduction</h2>
                    <p className="mb-4">
                        La protection de vos données personnelles est une priorité pour IndHack.
                        Cette politique de confidentialité explique comment nous collectons, utilisons
                        et protégeons vos informations personnelles conformément au Règlement Général
                        sur la Protection des Données (RGPD - UE 2016/679) et à la loi Informatique
                        et Libertés.
                    </p>
                    <p>
                        <strong className="text-ink">Responsable du traitement :</strong><br />
                        Indiana Aflalo - IndHack<br />
                        Email : contact@indhack.com<br />
                        Téléphone : 06 61 13 97 48
                    </p>
                </section>

                {/* Article 1 - Données collectées */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">1. Données personnelles collectées</h2>
                    <p className="mb-4">
                        Nous collectons uniquement les données que vous nous fournissez volontairement :
                    </p>

                    <div className="space-y-4">
                        <div className="border border-line rounded-xl p-4">
                            <h3 className="font-semibold text-ink mb-2">Formulaire de contact</h3>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>Nom et prénom</li>
                                <li>Adresse email</li>
                                <li>Numéro de téléphone (optionnel)</li>
                                <li>Nom de l&apos;entreprise (optionnel)</li>
                                <li>URL du site web (optionnel)</li>
                                <li>Message</li>
                            </ul>
                        </div>

                        <div className="border border-line rounded-xl p-4">
                            <h3 className="font-semibold text-ink mb-2">Demande d&apos;audit SEO</h3>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>Nom et prénom</li>
                                <li>Adresse email</li>
                                <li>Numéro de téléphone</li>
                                <li>URL du site à auditer</li>
                            </ul>
                        </div>

                        <div className="border border-line rounded-xl p-4">
                            <h3 className="font-semibold text-ink mb-2">Données de navigation (avec consentement)</h3>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>Adresse IP (anonymisée)</li>
                                <li>Pages visitées</li>
                                <li>Durée de visite</li>
                                <li>Type de navigateur et appareil</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Article 2 - Finalités */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">2. Finalités du traitement</h2>
                    <p className="mb-4">Vos données sont collectées pour les finalités suivantes :</p>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-fond-clair">
                                    <th className="border border-line p-3 text-left text-ink">Finalité</th>
                                    <th className="border border-line p-3 text-left text-ink">Base légale</th>
                                    <th className="border border-line p-3 text-left text-ink">Durée</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-line p-3">Répondre à vos demandes</td>
                                    <td className="border border-line p-3">Consentement</td>
                                    <td className="border border-line p-3">3 ans</td>
                                </tr>
                                <tr className="bg-fond-clair/50">
                                    <td className="border border-line p-3">Établir un devis</td>
                                    <td className="border border-line p-3">Mesures précontractuelles</td>
                                    <td className="border border-line p-3">3 ans</td>
                                </tr>
                                <tr>
                                    <td className="border border-line p-3">Exécuter un contrat</td>
                                    <td className="border border-line p-3">Exécution contractuelle</td>
                                    <td className="border border-line p-3">5 ans (obligations légales)</td>
                                </tr>
                                <tr className="bg-fond-clair/50">
                                    <td className="border border-line p-3">Analyser le trafic du site</td>
                                    <td className="border border-line p-3">Consentement</td>
                                    <td className="border border-line p-3">14 mois</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Article 3 - Cookies */}
                <section className="bg-fond-clair rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-ink mb-4">3. Cookies et traceurs</h2>

                    <h3 className="font-semibold text-ink mb-2">3.1 Qu&apos;est-ce qu&apos;un cookie ?</h3>
                    <p className="mb-4">
                        Un cookie est un petit fichier texte stocké sur votre appareil lors de la visite
                        d&apos;un site web. Il permet de mémoriser vos préférences et d&apos;analyser votre navigation.
                    </p>

                    <h3 className="font-semibold text-ink mb-2">3.2 Cookies utilisés sur ce site</h3>
                    <div className="space-y-3 mb-4">
                        <div className="bg-white rounded-lg p-3 border border-line">
                            <p className="font-medium text-ink">Cookies essentiels (toujours actifs)</p>
                            <p className="text-sm">Nécessaires au fonctionnement du site : session, sécurité, consentement.</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-line">
                            <p className="font-medium text-ink">Google Analytics (avec consentement)</p>
                            <p className="text-sm">Cookies : _ga, _gid, _gat - Analyse du trafic et comportement utilisateur.</p>
                            <p className="text-sm mt-1"><strong>Durée :</strong> 14 mois maximum</p>
                        </div>
                    </div>

                    <h3 className="font-semibold text-ink mb-2">3.3 Gestion de vos préférences</h3>
                    <p className="mb-2">Vous pouvez gérer vos cookies de plusieurs façons :</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Via notre bandeau de consentement (affiché à votre première visite)</li>
                        <li>Via les paramètres de votre navigateur</li>
                        <li>Via les outils de désinscription de Google : <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-sauge hover:underline">Google Analytics Opt-out</a></li>
                    </ul>
                </section>

                {/* Article 4 - Partage des données */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">4. Partage et transfert des données</h2>

                    <h3 className="font-semibold text-ink mb-2">4.1 Destinataires</h3>
                    <p className="mb-4">Vos données peuvent être partagées avec :</p>
                    <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                        <li><strong>Google Analytics</strong> - Analyse de trafic (avec anonymisation IP)</li>
                        <li><strong>FormSubmit / Web3Forms</strong> - Traitement des formulaires de contact</li>
                        <li><strong>Vercel</strong> - Hébergement du site</li>
                    </ul>

                    <h3 className="font-semibold text-ink mb-2">4.2 Transferts hors UE</h3>
                    <p className="mb-4">
                        Certains de nos prestataires (Google, Vercel) peuvent transférer des données vers
                        les États-Unis. Ces transferts sont encadrés par des garanties appropriées
                        (Clauses Contractuelles Types de la Commission Européenne, Data Privacy Framework).
                    </p>

                    <h3 className="font-semibold text-ink mb-2">4.3 Nous ne vendons jamais vos données</h3>
                    <p>
                        IndHack ne vend, ne loue et ne partage jamais vos données personnelles
                        à des fins commerciales ou publicitaires.
                    </p>
                </section>

                {/* Article 5 - Sécurité */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">5. Sécurité des données</h2>
                    <p className="mb-4">
                        Nous mettons en œuvre des mesures techniques et organisationnelles appropriées
                        pour protéger vos données personnelles :
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Connexion HTTPS sécurisée (certificat SSL/TLS)</li>
                        <li>Protection contre les attaques XSS, CSRF et injections</li>
                        <li>Headers de sécurité (CSP, HSTS, X-Frame-Options)</li>
                        <li>Limitation du taux de requêtes (rate limiting)</li>
                        <li>Accès restreint aux données administratives</li>
                        <li>Anonymisation des adresses IP dans les analytics</li>
                    </ul>
                </section>

                {/* Article 6 - Vos droits */}
                <section className="bg-sauge/10 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-ink mb-4">6. Vos droits RGPD</h2>
                    <p className="mb-4">
                        Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-white rounded-xl p-4 border border-line">
                            <h3 className="font-semibold text-ink mb-1">Droit d&apos;accès</h3>
                            <p className="text-sm">Obtenir une copie de vos données personnelles</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-line">
                            <h3 className="font-semibold text-ink mb-1">Droit de rectification</h3>
                            <p className="text-sm">Corriger des données inexactes ou incomplètes</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-line">
                            <h3 className="font-semibold text-ink mb-1">Droit à l&apos;effacement</h3>
                            <p className="text-sm">Demander la suppression de vos données</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-line">
                            <h3 className="font-semibold text-ink mb-1">Droit à la limitation</h3>
                            <p className="text-sm">Restreindre le traitement de vos données</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-line">
                            <h3 className="font-semibold text-ink mb-1">Droit à la portabilité</h3>
                            <p className="text-sm">Recevoir vos données dans un format structuré</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-line">
                            <h3 className="font-semibold text-ink mb-1">Droit d&apos;opposition</h3>
                            <p className="text-sm">Vous opposer au traitement de vos données</p>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-white rounded-xl border border-sauge">
                        <h3 className="font-semibold text-ink mb-2">Comment exercer vos droits ?</h3>
                        <p className="mb-2">
                            Envoyez-nous un email à <a href="mailto:contact@indhack.com" className="text-sauge hover:underline font-medium">contact@indhack.com</a> avec :
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                            <li>Votre nom et prénom</li>
                            <li>Votre adresse email</li>
                            <li>Le droit que vous souhaitez exercer</li>
                            <li>Une pièce d&apos;identité (si nécessaire pour vérification)</li>
                        </ul>
                        <p className="mt-2 text-sm">
                            Nous répondrons dans un délai maximum de 30 jours.
                        </p>
                    </div>
                </section>

                {/* Article 7 - Conservation */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">7. Durée de conservation</h2>
                    <p className="mb-4">Vos données sont conservées pendant les durées suivantes :</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Formulaires de contact :</strong> 3 ans après le dernier contact</li>
                        <li><strong>Données clients :</strong> 5 ans après la fin de la relation commerciale (obligations comptables)</li>
                        <li><strong>Cookies analytics :</strong> 14 mois maximum</li>
                        <li><strong>Logs de sécurité :</strong> 1 an</li>
                    </ul>
                    <p className="mt-4">
                        À l&apos;expiration de ces délais, vos données sont supprimées ou anonymisées de manière irréversible.
                    </p>
                </section>

                {/* Article 8 - Mineurs */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">8. Protection des mineurs</h2>
                    <p>
                        Ce site s&apos;adresse à un public professionnel et n&apos;est pas destiné aux mineurs
                        de moins de 16 ans. Nous ne collectons pas sciemment de données personnelles
                        concernant des mineurs. Si vous êtes parent et constatez que votre enfant nous a
                        fourni des données, contactez-nous pour les supprimer.
                    </p>
                </section>

                {/* Article 9 - Réclamation */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">9. Réclamation auprès de la CNIL</h2>
                    <p className="mb-4">
                        Si vous estimez que le traitement de vos données personnelles constitue une
                        violation du RGPD, vous avez le droit d&apos;introduire une réclamation auprès de
                        la Commission Nationale de l&apos;Informatique et des Libertés (CNIL) :
                    </p>
                    <div className="bg-fond-clair rounded-xl p-4">
                        <p><strong className="text-ink">CNIL</strong></p>
                        <p>3 Place de Fontenoy, TSA 80715</p>
                        <p>75334 Paris Cedex 07</p>
                        <p className="mt-2">
                            Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-sauge hover:underline">www.cnil.fr</a>
                        </p>
                    </div>
                </section>

                {/* Article 10 - Modifications */}
                <section>
                    <h2 className="text-2xl font-bold text-ink mb-4">10. Modifications de cette politique</h2>
                    <p>
                        Nous pouvons modifier cette politique de confidentialité à tout moment.
                        La date de dernière mise à jour figure en haut de cette page. En cas de
                        modification substantielle, nous vous en informerons par un avis visible
                        sur notre site.
                    </p>
                </section>

                {/* Contact */}
                <section className="bg-fond-clair rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-ink mb-4">Contact</h2>
                    <p className="mb-4">
                        Pour toute question concernant cette politique ou vos données personnelles :
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
