export default function GeoLabDisclaimer() {
    return (
        <div className="bg-sauge/10 border border-sauge/30 rounded-xl p-4 mb-8">
            <p className="text-sm text-soft flex items-start gap-2">
                <span className="text-lg" aria-hidden="true">🔬</span>
                <span>
                    <strong className="text-ink">Laboratoire GEO IndHack</strong> — Cette page fait partie d&apos;une
                    expérimentation autour d&apos;un mot fictif utilisé pendant un concours GEO. Elle documente une
                    méthodologie de visibilité IA menée par{' '}
                    <a href="/a-propos" className="text-sauge hover:underline">Indiana Aflalo</a>, pas un produit
                    commercial réel.
                </span>
            </p>
        </div>
    );
}
