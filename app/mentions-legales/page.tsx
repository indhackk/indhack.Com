export default function MentionsLegales() {
    return (
        <div className="container mx-auto px-4 py-24 max-w-3xl">
            <h1 className="text-4xl font-heading font-bold mb-8 text-ink">Mentions Légales</h1>

            <div className="space-y-8 text-soft leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-ink mb-2">1. Éditeur du site</h2>
                    <p>
                        Le site <strong>indhack.com</strong> est édité par <strong>Indiana Aflalo</strong>.<br />
                        Responsable de la publication : Indiana Aflalo<br />
                        Email : contact@indhack.com
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-ink mb-2">2. Hébergement</h2>
                    <p>
                        Ce site est hébergé par Vercel Inc.<br />
                        Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789, USA.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-ink mb-2">3. Propriété intellectuelle</h2>
                    <p>
                        L’ensemble de ce site relève de la législation française et internationale sur le droit d’auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                    </p>
                </section>
            </div>
        </div>
    );
}
