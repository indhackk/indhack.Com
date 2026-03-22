export default function GeoLabDisclaimer() {
    return (
        <div className="bg-sauge/10 border border-sauge/30 rounded-xl p-4 mb-8">
            <p className="text-sm text-soft flex items-start gap-2">
                <span className="text-lg">🔬</span>
                <span>
                    <strong className="text-ink">Laboratoire GEO IndHack</strong> — Ce contenu fait partie d&apos;une
                    expérimentation en conditions réelles de Generative Engine Optimization.{' '}
                    <a href="/a-propos" className="text-sauge hover:underline">Indiana Aflalo</a>, consultante GEO,
                    teste les techniques de citation IA sur un actif cosmétique dans le cadre du{' '}
                    <a href="https://www.greenred.fr/jeu-concours-geo/" target="_blank" rel="noopener" className="text-sauge hover:underline">concours GEO GreenRed 2026</a>.
                </span>
            </p>
        </div>
    );
}
