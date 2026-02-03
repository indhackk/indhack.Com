'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DIAGNOSTIC COIFFEUR - Version Simple & Élégante
// ══════════════════════════════════════════════════════════════════════════════

function DiagnosticContent() {
  const searchParams = useSearchParams()
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Salon'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const note = searchParams.get('note') || '4.6'
  const avis = searchParams.get('avis') || '155'

  return (
    <main className="min-h-screen bg-[#FDFCFB]">

      {/* ════════ HERO - Texte gauche / Image droite ════════ */}
      <section className="min-h-screen grid lg:grid-cols-2">

        {/* Colonne gauche - Texte */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-0">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F5F0EB] rounded-full px-4 py-2 w-fit mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span className="text-[#8B7355] text-sm font-medium">Analyse pour {nom}</span>
          </div>

          {/* Titre */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2D2A26] leading-[1.1] mb-8">
            Vos clientes<br />
            vous adorent.<br />
            <span className="font-semibold text-[#8B7355]">Google ne le sait pas.</span>
          </h1>

          {/* Texte */}
          <div className="space-y-6 text-[#5C5650] text-lg leading-relaxed mb-10 max-w-lg">
            <p>
              <strong className="text-[#2D2A26]">{note} étoiles</strong> et <strong className="text-[#2D2A26]">{avis} avis</strong> sur votre fiche Google.
              C'est la preuve que vous faites du bon travail.
            </p>
            <p>
              Le problème ? Quand une femme cherche <strong className="text-[#2D2A26]">"coiffeur {ville}"</strong> ou
              <strong className="text-[#2D2A26]"> "coloriste {ville}"</strong> sur Google,
              elle ne tombe pas sur vous.
            </p>
            <p>
              Elle tombe sur vos concurrents. Ceux qui ont un site internet.
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 text-sm text-[#8B7355]">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span>{note}/5 sur Google</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>{ville}</span>
            </div>
          </div>

        </div>

        {/* Colonne droite - Image */}
        <div className="relative h-[50vh] lg:h-auto">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=85"
            alt={`Salon ${nom}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-r lg:from-[#FDFCFB] lg:via-transparent lg:to-transparent"></div>
        </div>

      </section>

      {/* ════════ LE CONSTAT EN CHIFFRES ════════ */}
      <section className="py-24 px-8 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-[#8B7355] text-sm font-medium uppercase tracking-wider mb-4">Chaque mois à {ville}</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#2D2A26]">
              Des femmes cherchent une coiffeuse.<br />
              <span className="font-semibold">Elles ne vous trouvent pas.</span>
            </h2>
          </div>

          {/* Grille de stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">

            <div className="bg-[#FDFCFB] rounded-2xl p-8 text-center">
              <p className="text-5xl font-light text-[#2D2A26] mb-2">2 800</p>
              <p className="text-[#8B7355]">recherches <strong>"coiffeur {ville}"</strong></p>
            </div>

            <div className="bg-[#FDFCFB] rounded-2xl p-8 text-center">
              <p className="text-5xl font-light text-[#2D2A26] mb-2">320</p>
              <p className="text-[#8B7355]">recherches <strong>"lissage brésilien"</strong></p>
            </div>

            <div className="bg-[#FDFCFB] rounded-2xl p-8 text-center">
              <p className="text-5xl font-light text-[#2D2A26] mb-2">260</p>
              <p className="text-[#8B7355]">recherches <strong>"coloriste {ville}"</strong></p>
            </div>

          </div>

          <p className="text-center text-[#5C5650] text-lg max-w-2xl mx-auto">
            Ces chiffres sont réels. Ce sont des femmes qui tapent ces mots dans Google,
            prêtes à prendre rendez-vous. <strong className="text-[#2D2A26]">Sans site internet, vous êtes invisible pour elles.</strong>
          </p>

        </div>
      </section>

      {/* ════════ POURQUOI UN SITE ════════ */}
      <section className="py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-[#8B7355] text-sm font-medium uppercase tracking-wider mb-4">Pourquoi c'est important</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#2D2A26]">
              Un site internet, c'est votre<br />
              <span className="font-semibold">vitrine ouverte 24h/24</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Carte 1 */}
            <div className="bg-white rounded-3xl p-10 shadow-sm">
              <div className="w-16 h-16 bg-[#FEF3E7] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#D4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2D2A26] mb-4">
                Être trouvée sur Google
              </h3>
              <p className="text-[#5C5650] leading-relaxed">
                Quand quelqu'un cherche <strong className="text-[#2D2A26]">"balayage {ville}"</strong> ou
                <strong className="text-[#2D2A26]"> "meilleur coiffeur {ville}"</strong>,
                un site web vous permet d'apparaître dans les résultats.
              </p>
            </div>

            {/* Carte 2 */}
            <div className="bg-white rounded-3xl p-10 shadow-sm">
              <div className="w-16 h-16 bg-[#E8F5F0] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#6B9B8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2D2A26] mb-4">
                Inspirer confiance
              </h3>
              <p className="text-[#5C5650] leading-relaxed">
                Une nouvelle cliente qui découvre votre travail veut en savoir plus.
                Un site pro avec vos <strong className="text-[#2D2A26]">photos, tarifs et avis</strong> la rassure et l'incite à réserver.
              </p>
            </div>

            {/* Carte 3 */}
            <div className="bg-white rounded-3xl p-10 shadow-sm">
              <div className="w-16 h-16 bg-[#F0E8F5] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#9B6BA3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2D2A26] mb-4">
                Travailler pour vous H24
              </h3>
              <p className="text-[#5C5650] leading-relaxed">
                Votre site attire des visiteurs même quand vous êtes fermée.
                Le dimanche soir, une cliente peut découvrir votre salon et
                <strong className="text-[#2D2A26]"> réserver pour la semaine</strong>.
              </p>
            </div>

            {/* Carte 4 */}
            <div className="bg-white rounded-3xl p-10 shadow-sm">
              <div className="w-16 h-16 bg-[#E7F0FE] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#5B7FC3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2D2A26] mb-4">
                Posséder votre espace
              </h3>
              <p className="text-[#5C5650] leading-relaxed">
                Instagram peut changer ses règles demain. Votre site, c'est <strong className="text-[#2D2A26]">votre propriété</strong>.
                Personne ne peut vous l'enlever ou vous faire payer des commissions.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ APERÇU DU SITE ════════ */}
      <section className="py-24 px-8 md:px-16 bg-[#F5F0EB]">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-[#8B7355] text-sm font-medium uppercase tracking-wider mb-4">Aperçu</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#2D2A26]">
              Votre futur site pourrait<br />
              <span className="font-semibold">ressembler à ça</span>
            </h2>
          </div>

          {/* Mockup navigateur */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

            {/* Barre navigateur */}
            <div className="bg-[#F5F5F5] px-4 py-3 flex items-center gap-3 border-b border-gray-200">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28CA41]"></div>
              </div>
              <div className="flex-1 bg-white rounded-md px-4 py-1 text-sm text-gray-400 text-center mx-8">
                {nom.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.fr
              </div>
            </div>

            {/* Contenu site */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=85"
                alt="Aperçu site"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Header fictif */}
              <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
                <span className="text-white font-medium text-lg">{nom}</span>
                <div className="hidden md:flex items-center gap-6 text-white/80 text-sm">
                  <span>Prestations</span>
                  <span>Galerie</span>
                  <span>Tarifs</span>
                  <span className="bg-white text-[#2D2A26] px-4 py-2 rounded-full font-medium">Réserver</span>
                </div>
              </div>

              {/* Contenu fictif */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <p className="text-white/70 text-sm uppercase tracking-wider mb-3">Salon de coiffure · {ville}</p>
                <h3 className="text-3xl md:text-4xl text-white font-light mb-6">
                  Votre experte coloration<br />
                  <span className="font-semibold">au cœur de {ville}</span>
                </h3>
                <div className="flex items-center gap-4">
                  <span className="bg-white text-[#2D2A26] px-6 py-3 rounded-full font-medium">
                    Prendre rendez-vous
                  </span>
                </div>
              </div>
            </div>

          </div>

          <p className="text-center text-[#8B7355] text-sm mt-6">
            Design créé sur-mesure selon vos envies
          </p>

        </div>
      </section>

      {/* ════════ CE QUE JE FAIS POUR VOUS ════════ */}
      <section className="py-24 px-8 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-[#8B7355] text-sm font-medium uppercase tracking-wider mb-4">Mon accompagnement</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#2D2A26]">
              Je m'occupe de tout.<br />
              <span className="font-semibold">Vous vous concentrez sur vos clientes.</span>
            </h2>
          </div>

          <div className="space-y-6">

            <div className="flex items-start gap-6 p-6 bg-[#FDFCFB] rounded-2xl">
              <div className="w-12 h-12 bg-[#D4A574] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2D2A26] mb-2">Je crée votre site sur-mesure</h3>
                <p className="text-[#5C5650]">
                  Un site <strong className="text-[#2D2A26]">rapide et élégant</strong>, avec vos photos,
                  vos services, vos tarifs. Prêt à l'emploi, vous n'avez rien à faire.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 bg-[#FDFCFB] rounded-2xl">
              <div className="w-12 h-12 bg-[#D4A574] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2D2A26] mb-2">Je vous rends visible sur Google</h3>
                <p className="text-[#5C5650]">
                  J'optimise votre site pour que vous apparaissiez quand quelqu'un cherche
                  <strong className="text-[#2D2A26]"> "coiffeur {ville}"</strong>, <strong className="text-[#2D2A26]">"coloriste {ville}"</strong>, etc.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 bg-[#FDFCFB] rounded-2xl">
              <div className="w-12 h-12 bg-[#D4A574] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2D2A26] mb-2">J'optimise votre fiche Google</h3>
                <p className="text-[#5C5650]">
                  Votre fiche avec <strong className="text-[#2D2A26]">{note}★ et {avis} avis</strong> est un atout.
                  Je l'optimise pour qu'elle ressorte encore mieux dans les résultats.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 bg-[#FDFCFB] rounded-2xl">
              <div className="w-12 h-12 bg-[#D4A574] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold">4</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2D2A26] mb-2">Le site est à vous</h3>
                <p className="text-[#5C5650]">
                  Contrairement aux solutions où vous louez votre site, ici <strong className="text-[#2D2A26]">vous êtes propriétaire</strong>.
                  Si on arrête de travailler ensemble, vous gardez tout.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ QUI SUIS-JE ════════ */}
      <section className="py-24 px-8 md:px-16 bg-[#FDFCFB]">
        <div className="max-w-4xl mx-auto">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>
              <p className="text-[#8B7355] text-sm font-medium uppercase tracking-wider mb-4">Qui suis-je</p>
              <h2 className="text-3xl md:text-4xl font-light text-[#2D2A26] mb-6">
                Je suis Indiana,<br />
                <span className="font-semibold">consultante à {ville}</span>
              </h2>
              <div className="space-y-4 text-[#5C5650] leading-relaxed">
                <p>
                  J'aide les <strong className="text-[#2D2A26]">indépendants et petites entreprises</strong> à être
                  visibles sur internet. Pas de jargon technique, pas de promesses irréalistes.
                </p>
                <p>
                  Je vous explique simplement ce qu'on peut faire ensemble,
                  et on avance à votre rythme.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4A574] to-[#8B7355] rounded-2xl flex items-center justify-center">
                  <span className="text-white font-semibold text-xl">IA</span>
                </div>
                <div>
                  <p className="font-semibold text-[#2D2A26]">Indiana Aflalo</p>
                  <p className="text-[#8B7355] text-sm">Consultante · {ville}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#5C5650]">
                  <svg className="w-5 h-5 text-[#6B9B8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>Spécialisée commerces locaux</span>
                </div>
                <div className="flex items-center gap-3 text-[#5C5650]">
                  <svg className="w-5 h-5 text-[#6B9B8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>Sites rapides et modernes</span>
                </div>
                <div className="flex items-center gap-3 text-[#5C5650]">
                  <svg className="w-5 h-5 text-[#6B9B8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>Accompagnement personnalisé</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ TARIFS ════════ */}
      <section className="py-24 px-8 md:px-16 bg-white" id="tarifs">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-[#8B7355] text-sm font-medium uppercase tracking-wider mb-4">Tarifs</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#2D2A26]">
              Des formules claires,<br />
              <span className="font-semibold">sans surprise</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Formule 1 */}
            <div className="bg-[#FDFCFB] rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-[#2D2A26] mb-2">Site Vitrine</h3>
              <p className="text-[#8B7355] text-sm mb-6">Votre présence en ligne</p>

              <div className="mb-8">
                <p className="text-sm text-[#8B7355]">à partir de</p>
                <p className="text-4xl font-light text-[#2D2A26]">690€</p>
                <p className="text-sm text-[#8B7355]">paiement unique</p>
              </div>

              <ul className="space-y-3 text-[#5C5650] text-sm">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#6B9B8A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Site 5-7 pages sur-mesure
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#6B9B8A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Design à votre image
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#6B9B8A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Adapté mobile et tablette
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#6B9B8A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Bouton de réservation
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#6B9B8A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Vous êtes propriétaire
                </li>
              </ul>
            </div>

            {/* Formule 2 - Recommandée */}
            <div className="bg-[#2D2A26] text-white rounded-3xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#D4A574] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                  Recommandé
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2 pt-2">Site + Visibilité</h3>
              <p className="text-[#A89F94] text-sm mb-6">Être trouvée sur Google</p>

              <div className="mb-8">
                <p className="text-sm text-[#A89F94]">à partir de</p>
                <p className="text-4xl font-light">990€</p>
                <p className="text-sm text-[#A89F94]">puis <span className="text-white">190€</span>/mois</p>
              </div>

              <ul className="space-y-3 text-[#D4D0CB] text-sm">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Tout le Site Vitrine
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Optimisation pour Google
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  10 articles par mois
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Optimisation fiche Google
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Rapport mensuel
                </li>
              </ul>

              <p className="text-xs text-[#A89F94] mt-6">Sans engagement</p>
            </div>

            {/* Formule 3 */}
            <div className="bg-[#FDFCFB] rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-[#2D2A26] mb-2">Accompagnement Complet</h3>
              <p className="text-[#8B7355] text-sm mb-6">Visibilité maximale</p>

              <div className="mb-8">
                <p className="text-sm text-[#8B7355]">à partir de</p>
                <p className="text-4xl font-light text-[#2D2A26]">1 290€</p>
                <p className="text-sm text-[#8B7355]">puis <span className="text-[#2D2A26]">290€</span>/mois</p>
              </div>

              <ul className="space-y-3 text-[#5C5650] text-sm">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#6B9B8A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Tout Site + Visibilité
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#6B9B8A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  20 articles par mois
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#6B9B8A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Gestion complète fiche Google
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#6B9B8A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Réponses aux avis
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#6B9B8A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Posts Google hebdomadaires
                </li>
              </ul>

              <p className="text-xs text-[#8B7355] mt-6">Sans engagement</p>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ CTA FINAL ════════ */}
      <section className="py-24 px-8 md:px-16 bg-[#2D2A26]">
        <div className="max-w-2xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
            On en discute ?
          </h2>
          <p className="text-[#A89F94] text-lg mb-10">
            30 minutes pour parler de <span className="text-white">{nom}</span> et voir
            ce qu'on peut faire ensemble. Sans engagement.
          </p>

          <a
            href="https://calendly.com/contact-indhack/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#D4A574] text-white px-8 py-4 rounded-full font-medium hover:bg-[#C49664] transition-colors text-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Réserver un appel gratuit
          </a>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-[#A89F94]">
            <a href="tel:0661139748" className="flex items-center gap-2 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              06 61 13 97 48
            </a>
            <a href="mailto:contact@indhack.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              contact@indhack.com
            </a>
          </div>

        </div>
      </section>

    </main>
  )
}

export default function CoiffeurDiagnosticPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFCFB]" />}>
      <DiagnosticContent />
    </Suspense>
  )
}
