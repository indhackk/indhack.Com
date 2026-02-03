'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Search, MapPin, Check, ArrowRight, Eye, EyeOff, Globe, Calendar, Clock, FileText, Star, AlertCircle, TrendingUp, Target, Sparkles, Phone } from 'lucide-react'

// ══════════════════════════════════════════════════════════════════════════════
// DIAGNOSTIC PAGE - Version Client Final
// Design épuré, éducatif, professionnel
// ══════════════════════════════════════════════════════════════════════════════

function DiagnosticContent({ metier }: { metier: string }) {
  const searchParams = useSearchParams()
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Salon'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const note = searchParams.get('note') || '4.6'
  const avis = searchParams.get('avis') || '155'

  // Données RÉELLES Haloscan pour By Lucie Mendes
  const keywordsData = [
    // Gros volumes (difficiles mais importants)
    { keyword: 'coiffeur nice', volume: 2800, difficulty: 'Très concurrentiel', type: 'principal' },
    { keyword: 'coiffure nice', volume: 590, difficulty: 'Concurrentiel', type: 'principal' },

    // Volumes moyens (accessibles)
    { keyword: 'coloriste nice', volume: 260, difficulty: 'Accessible', type: 'niche' },
    { keyword: 'meilleur coloriste nice', volume: 140, difficulty: 'Accessible', type: 'niche' },
    { keyword: 'coiffeur coloriste nice', volume: 110, difficulty: 'Accessible', type: 'niche' },

    // Long tail (faciles à prendre)
    { keyword: 'lissage brésilien nice', volume: 320, difficulty: 'Facile', type: 'longtail' },
    { keyword: 'lissage japonais nice', volume: 50, difficulty: 'Facile', type: 'longtail' },
    { keyword: 'lissage au tanin nice', volume: 50, difficulty: 'Facile', type: 'longtail' },
    { keyword: 'soin tokio nice', volume: 50, difficulty: 'Facile', type: 'longtail' },
    { keyword: 'balayage nice', volume: 20, difficulty: 'Facile', type: 'longtail' },
  ]

  const totalVolume = keywordsData.reduce((sum, kw) => sum + kw.volume, 0)
  const easyKeywords = keywordsData.filter(kw => kw.difficulty === 'Facile')
  const easyVolume = easyKeywords.reduce((sum, kw) => sum + kw.volume, 0)

  return (
    <main className="min-h-screen bg-white text-[#1a1a1a] font-sans antialiased">

      {/* ════════ EN-TÊTE DISCRET ════════ */}
      <div className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <span className="text-white font-semibold text-xs">IH</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">IndHack</span>
              <span className="text-gray-400 mx-2">·</span>
              <span className="text-gray-500">Audit personnalisé</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* ════════ SECTION HERO ════════ */}
      <section className="py-16 px-6 bg-gradient-to-b from-amber-50/50 to-white">
        <div className="max-w-3xl mx-auto">

          {/* Photo + Infos */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 bg-gradient-to-br from-amber-100 to-amber-50">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop&crop=center"
                alt={nom}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] mb-3">{nom}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {ville}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {note}/5
                </span>
                <span className="text-gray-400">{avis} avis Google</span>
              </div>
            </div>
          </div>

          {/* Message d'accroche */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <p className="text-xl md:text-2xl text-[#1a1a1a] leading-relaxed">
              Avec <strong>{note}/5</strong> et <strong>{avis} avis</strong>, vos clientes vous adorent.
              <br /><br />
              Mais quand une Niçoise cherche <span className="text-amber-600 font-medium">"coloriste nice"</span> ou <span className="text-amber-600 font-medium">"lissage brésilien nice"</span> sur Google...
              <br /><br />
              <span className="text-gray-500">Elle ne vous trouve pas.</span>
            </p>
          </div>

        </div>
      </section>

      {/* ════════ SECTION : LES CHIFFRES ════════ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full mb-4">
              <Search className="w-4 h-4" />
              Ce que les gens cherchent
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-3">
              Chaque mois à {ville}
            </h2>
            <p className="text-gray-500">
              Données réelles issues des outils SEO professionnels (Haloscan, SEMrush)
            </p>
          </div>

          {/* Stat principale */}
          <div className="bg-[#1a1a1a] text-white rounded-2xl p-10 mb-8 text-center">
            <div className="text-5xl md:text-6xl font-bold mb-2">{totalVolume.toLocaleString()}+</div>
            <div className="text-gray-400 text-lg">recherches par mois liées à la coiffure à {ville}</div>
          </div>

          {/* Tableau de mots-clés */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Détail des recherches les plus importantes</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {keywordsData.map((kw, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="font-medium text-[#1a1a1a]">"{kw.keyword}"</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="font-semibold text-[#1a1a1a]">{kw.volume}</span>
                      <span className="text-gray-400 text-sm">/mois</span>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      kw.difficulty === 'Facile' ? 'bg-emerald-100 text-emerald-700' :
                      kw.difficulty === 'Accessible' ? 'bg-blue-100 text-blue-700' :
                      kw.difficulty === 'Concurrentiel' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {kw.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explication */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex gap-4">
              <div className="text-2xl">💡</div>
              <div>
                <h4 className="font-semibold text-amber-900 mb-2">Ce que ça veut dire concrètement</h4>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Chaque mois, des centaines de femmes à {ville} tapent ces recherches dans Google pour trouver une coiffeuse.
                  <br /><br />
                  <strong>Le problème :</strong> Sans site web optimisé, vous n'apparaissez nulle part dans ces résultats.
                  Ces clientes potentielles vont donc chez vos concurrents — pas parce qu'ils sont meilleurs, mais simplement parce qu'ils sont <em>visibles</em>.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════ SECTION : L'OPPORTUNITÉ ════════ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full mb-4">
              <Target className="w-4 h-4" />
              L'opportunité
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-3">
              Les mots-clés "faciles" à prendre
            </h2>
            <p className="text-gray-500">
              On ne va pas attaquer "coiffeur nice" tout de suite (trop concurrentiel).
              <br />On cible d'abord les recherches où vous pouvez rapidement apparaître en 1ère page.
            </p>
          </div>

          {/* Mots-clés faciles */}
          <div className="grid gap-4 mb-10">
            {easyKeywords.map((kw, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 flex items-center justify-between">
                <div>
                  <div className="font-medium text-[#1a1a1a] mb-1">"{kw.keyword}"</div>
                  <div className="text-sm text-gray-500">{kw.volume} recherches/mois · Peu de concurrence</div>
                </div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">Accessible</span>
                </div>
              </div>
            ))}
          </div>

          {/* Calcul */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h4 className="font-semibold text-[#1a1a1a] mb-6">Si on prend juste ces mots-clés "faciles" :</h4>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Recherches mensuelles ciblées</span>
                <span className="font-semibold">{easyVolume}/mois</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Si 5% visitent votre site</span>
                <span className="font-semibold">{Math.round(easyVolume * 0.05)} visites/mois</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Si 10% prennent RDV</span>
                <span className="font-semibold">{Math.round(easyVolume * 0.05 * 0.10)} nouvelles clientes/mois</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-emerald-50 rounded-lg px-4 -mx-4">
                <span className="text-emerald-800 font-medium">Avec un panier moyen de 75€</span>
                <span className="font-bold text-emerald-700 text-xl">+{Math.round(easyVolume * 0.05 * 0.10) * 75}€/mois</span>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              * Estimation basse. En réalité, une fois bien positionnée sur ces mots-clés, vous attaquez aussi les plus gros ("coloriste nice", etc.)
            </p>
          </div>

        </div>
      </section>

      {/* ════════ SECTION : POURQUOI PAS VISIBLE ════════ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-red-600 bg-red-50 px-3 py-1.5 rounded-full mb-4">
              <EyeOff className="w-4 h-4" />
              Le problème
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-3">
              Pourquoi vous n'apparaissez pas sur Google
            </h2>
          </div>

          <div className="space-y-6">

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a1a1a] mb-2">Vous n'avez pas de site web</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Sans site, Google n'a rien à montrer quand quelqu'un cherche "lissage brésilien nice".
                    Vous dépendez entièrement des plateformes comme Planity ou Google Maps — qui ne vous mettent pas en avant comme un vrai site le ferait.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a1a1a] mb-2">Pas de pages dédiées à vos services</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Pour apparaître sur "lissage brésilien nice", il faut une page spécifique qui parle de ce service.
                    Idem pour "coloriste nice", "balayage nice", etc. Un site générique ne suffit pas.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a1a1a] mb-2">Le SEO prend du temps (mais ça vaut le coup)</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Google favorise les sites qui publient régulièrement du contenu de qualité.
                    C'est un travail sur 3-6 mois, mais ensuite vous récoltez les fruits pendant des années.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ SECTION : LA SOLUTION ════════ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              La solution
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-3">
              Ce que je vous propose
            </h2>
          </div>

          {/* Étapes */}
          <div className="space-y-6 mb-12">
            {[
              {
                step: '1',
                title: 'Un site professionnel à votre image',
                desc: 'Design élégant qui reflète l\'ambiance de votre salon. Pas un template générique. Mobile-friendly, rapide, moderne.',
              },
              {
                step: '2',
                title: 'Des pages optimisées pour Google',
                desc: 'Une page pour chaque service : "Lissage brésilien Nice", "Coloriste Nice", "Balayage Nice"... C\'est comme ça qu\'on apparaît dans les recherches.',
              },
              {
                step: '3',
                title: 'Un travail continu pour grimper',
                desc: 'Le SEO n\'est pas un one-shot. Chaque mois, on crée du contenu, on optimise, on suit vos positions. Vous montez progressivement.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 flex gap-5">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center font-semibold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a1a1a] mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════ SECTION : TARIFS ════════ */}
      <section className="py-16 px-6" id="offres">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-3">
              Mes tarifs
            </h2>
            <p className="text-gray-500">
              Transparents, sans engagement sur les forfaits mensuels.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Offre 1 */}
            <div className="bg-gray-50 rounded-2xl p-7 border border-gray-200">
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">Le Site</h3>
              <p className="text-sm text-gray-500 mb-5">Votre vitrine en ligne</p>

              <div className="mb-6">
                <span className="text-sm text-gray-500">à partir de</span>
                <div className="text-3xl font-bold text-[#1a1a1a]">590€</div>
                <span className="text-sm text-gray-400">paiement unique</span>
              </div>

              <ul className="space-y-3 mb-6 text-sm">
                {['Site multi-pages sur-mesure', 'Design à votre image', 'Mobile & tablette', 'Bouton réservation', 'Hébergement 1 an inclus'].map((item, i) => (
                  <li key={i} className="flex gap-2 text-gray-600">
                    <Check className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-400 mb-4">Idéal si vous voulez juste un site pro.</p>
            </div>

            {/* Offre 2 - Recommandé */}
            <div className="bg-[#1a1a1a] text-white rounded-2xl p-7 relative shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                Recommandé
              </div>

              <h3 className="text-lg font-semibold mb-1">Site + Visibilité</h3>
              <p className="text-sm text-gray-400 mb-5">Le site + le travail SEO</p>

              <div className="mb-6">
                <span className="text-sm text-gray-400">à partir de</span>
                <div className="text-3xl font-bold">590€</div>
                <div className="text-sm">
                  <span className="text-gray-400">puis </span>
                  <span className="text-white font-semibold">150€</span>
                  <span className="text-gray-400">/mois</span>
                </div>
                <span className="text-xs text-gray-500">sans engagement</span>
              </div>

              <ul className="space-y-3 mb-6 text-sm">
                {['Tout le pack Site +', '2 pages SEO/mois', 'Suivi positions Google', 'Rapport mensuel', 'Support email'].map((item, i) => (
                  <li key={i} className="flex gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-500">Pour vraiment apparaître sur Google.</p>
            </div>

            {/* Offre 3 */}
            <div className="bg-gray-50 rounded-2xl p-7 border border-gray-200">
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">Accompagnement Complet</h3>
              <p className="text-sm text-gray-500 mb-5">SEO + GMB + tout</p>

              <div className="mb-6">
                <span className="text-sm text-gray-500">à partir de</span>
                <div className="text-3xl font-bold text-[#1a1a1a]">590€</div>
                <div className="text-sm">
                  <span className="text-gray-400">puis </span>
                  <span className="text-[#1a1a1a] font-semibold">200€</span>
                  <span className="text-gray-400">/mois</span>
                </div>
                <span className="text-xs text-gray-400">sans engagement</span>
              </div>

              <ul className="space-y-3 mb-6 text-sm">
                {['Tout le pack Visibilité +', 'Google My Business', '4 pages SEO/mois', 'Gestion avis', 'Support WhatsApp'].map((item, i) => (
                  <li key={i} className="flex gap-2 text-gray-600">
                    <Check className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-400">Pour dominer localement.</p>
            </div>

          </div>

          {/* Comparatif */}
          <div className="mt-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h4 className="font-medium text-center text-gray-700 mb-6">Pour comparer avec le marché</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
              <div className="p-4">
                <div className="font-semibold text-red-500">50-100€/mois</div>
                <div className="text-gray-400 text-xs mt-1">Simplebo, WebGazelle<br/>(site loué, jamais à vous)</div>
              </div>
              <div className="p-4">
                <div className="font-semibold text-amber-500">1 500-3 000€</div>
                <div className="text-gray-400 text-xs mt-1">Freelance moyen<br/>(site seul, pas de SEO)</div>
              </div>
              <div className="p-4">
                <div className="font-semibold text-amber-500">5 000€+</div>
                <div className="text-gray-400 text-xs mt-1">Agence<br/>(+ 300-500€/mois SEO)</div>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl">
                <div className="font-semibold text-emerald-600">590€ + 150€/mois</div>
                <div className="text-emerald-600 text-xs mt-1">IndHack<br/>(site à vous + SEO)</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════ SECTION : CTA FINAL ════════ */}
      <section className="py-20 px-6 bg-[#1a1a1a] text-white">
        <div className="max-w-2xl mx-auto text-center">

          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Envie d'en discuter ?
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Réservez un appel de 30 minutes. Je vous explique concrètement ce qu'on peut faire pour {nom}.
            <br />Pas de commercial, pas de pression — juste une discussion.
          </p>

          <a
            href="https://calendly.com/contact-indhack/30min"
            target="_blank"
            className="inline-flex items-center gap-3 bg-white text-[#1a1a1a] px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            Réserver un appel (gratuit)
          </a>

          <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
            <Phone className="w-4 h-4" />
            <span>Ou appelez-moi : 06 61 13 97 48</span>
          </div>

        </div>
      </section>

      {/* ════════ FOOTER MINIMAL ════════ */}
      <footer className="py-6 px-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <span>IndHack · Visibilité web pour indépendants</span>
          <span>contact@indhack.com</span>
        </div>
      </footer>

    </main>
  )
}

export default function DiagnosticPage({ params }: { params: { metier: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <DiagnosticContent metier={params.metier} />
    </Suspense>
  )
}
