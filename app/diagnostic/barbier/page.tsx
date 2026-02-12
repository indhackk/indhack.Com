'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DIAGNOSTIC BARBIER - Version Masculine & Élégante
// ══════════════════════════════════════════════════════════════════════════════

function DiagnosticContent() {
  const searchParams = useSearchParams()
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Barbershop'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const note = searchParams.get('note') || '4.6'
  const avis = searchParams.get('avis') || '155'

  return (
    <main className="min-h-screen bg-[#1A1A1A]">

      {/* ════════ HERO - Texte gauche / Image droite ════════ */}
      <section className="min-h-screen grid lg:grid-cols-2">

        {/* Colonne gauche - Texte */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-0">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#2A2A2A] rounded-full px-4 py-2 w-fit mb-8">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            <span className="text-[#B8A68F] text-sm font-medium">Analyse pour {nom}</span>
          </div>

          {/* Titre */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-8">
            Vos clients<br />
            vous adorent.<br />
            <span className="font-semibold text-[#C9A66B]">Google ne le sait pas.</span>
          </h1>

          {/* Texte */}
          <div className="space-y-6 text-[#A0A0A0] text-lg leading-relaxed mb-10 max-w-lg">
            <p>
              <strong className="text-white">{note} étoiles</strong> et <strong className="text-white">{avis} avis</strong> sur votre fiche Google.
              C'est la preuve que vous faites du bon travail.
            </p>
            <p>
              Le problème ? Quand un internaute cherche <strong className="text-white">"barbier {ville}"</strong>,
              <strong className="text-white"> "barber {ville}"</strong> ou <strong className="text-white">"coiffeur homme {ville}"</strong> sur Google,
              il ne tombe pas sur vous.
            </p>
            <p>
              Il tombe sur vos concurrents. Ceux qui ont un site internet.
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 text-sm text-[#B8A68F]">
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

        {/* Colonne droite - Image Barbershop */}
        <div className="relative h-[50vh] lg:h-auto">
          <Image
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=85"
            alt={`Barbershop ${nom}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r lg:from-[#1A1A1A] lg:via-transparent lg:to-transparent"></div>
        </div>

      </section>

      {/* ════════ LE CONSTAT EN CHIFFRES ════════ */}
      <section className="py-24 px-8 md:px-16 bg-[#111111]">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-[#C9A66B] text-sm font-medium uppercase tracking-wider mb-4">Chaque mois à {ville}</p>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Des clients cherchent un barbier.<br />
              <span className="font-semibold">Ils ne vous trouvent pas.</span>
            </h2>
          </div>

          {/* Grille de stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-16">

            <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center border border-[#2A2A2A]">
              <p className="text-4xl font-light text-white mb-2">1 900</p>
              <p className="text-[#B8A68F] text-sm">recherches <strong>"barber {ville}"</strong></p>
            </div>

            <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center border border-[#2A2A2A]">
              <p className="text-4xl font-light text-white mb-2">1 000</p>
              <p className="text-[#B8A68F] text-sm">recherches <strong>"barbier {ville}"</strong></p>
            </div>

            <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center border border-[#2A2A2A]">
              <p className="text-4xl font-light text-white mb-2">880</p>
              <p className="text-[#B8A68F] text-sm">recherches <strong>"coiffeur homme"</strong></p>
            </div>

            <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center border border-[#2A2A2A]">
              <p className="text-4xl font-light text-white mb-2">260</p>
              <p className="text-[#B8A68F] text-sm">recherches <strong>"coiffeur barbier"</strong></p>
            </div>

          </div>

          <p className="text-center text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Ces chiffres sont réels. Ce sont des internautes qui tapent ces mots dans Google,
            prêts à prendre rendez-vous. <strong className="text-white">Sans site internet, vous êtes invisible pour eux.</strong>
          </p>

          <div className="mt-12 bg-[#2A2520] rounded-2xl p-6 text-center border border-[#3A3530]">
            <p className="text-[#B8A68F] font-medium">
              Chaque jour sans site, ce sont des clients potentiels qui vont chez vos concurrents.
              <br />
              <span className="text-white">Pas parce qu'ils sont meilleurs - mais parce qu'ils sont visibles.</span>
            </p>
          </div>

        </div>
      </section>

      {/* ════════ POURQUOI UN SITE ════════ */}
      <section className="py-24 px-8 md:px-16 bg-[#1A1A1A]">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-[#C9A66B] text-sm font-medium uppercase tracking-wider mb-4">Pourquoi c'est important</p>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Un site internet, c'est votre<br />
              <span className="font-semibold">vitrine ouverte 24h/24</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Carte 1 */}
            <div className="bg-[#111111] rounded-3xl p-10 border border-[#2A2A2A]">
              <div className="w-16 h-16 bg-[#2A2520] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#C9A66B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Être trouvé sur Google
              </h3>
              <p className="text-[#A0A0A0] leading-relaxed">
                Quand un internaute cherche <strong className="text-white">"barbier {ville}"</strong> ou
                <strong className="text-white"> "barber {ville}"</strong>,
                un site web vous permet d'apparaître dans les résultats.
              </p>
            </div>

            {/* Carte 2 */}
            <div className="bg-[#111111] rounded-3xl p-10 border border-[#2A2A2A]">
              <div className="w-16 h-16 bg-[#1A2520] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#6B9B8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Inspirer confiance
              </h3>
              <p className="text-[#A0A0A0] leading-relaxed">
                Un internaute découvre votre travail et veut en savoir plus.
                Un site pro avec vos <strong className="text-white">photos, tarifs et avis</strong> rassure et incite à réserver.
              </p>
            </div>

            {/* Carte 3 */}
            <div className="bg-[#111111] rounded-3xl p-10 border border-[#2A2A2A]">
              <div className="w-16 h-16 bg-[#1A1A25] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#7B8FC3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Travailler pour vous H24
              </h3>
              <p className="text-[#A0A0A0] leading-relaxed">
                Votre site attire des visiteurs même quand le shop est fermé.
                Le dimanche soir, un internaute peut vous découvrir et
                <strong className="text-white"> réserver pour la semaine</strong>.
              </p>
            </div>

            {/* Carte 4 */}
            <div className="bg-[#111111] rounded-3xl p-10 border border-[#2A2A2A]">
              <div className="w-16 h-16 bg-[#25201A] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#C3947B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Posséder votre espace
              </h3>
              <p className="text-[#A0A0A0] leading-relaxed">
                Instagram peut changer ses règles demain. Votre site, c'est <strong className="text-white">votre propriété</strong>.
                Personne ne peut vous l'enlever ou vous faire payer des commissions.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ APERÇU DU SITE ════════ */}
      <section className="py-24 px-8 md:px-16 bg-[#111111]">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-[#C9A66B] text-sm font-medium uppercase tracking-wider mb-4">Aperçu</p>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Votre futur site pourrait<br />
              <span className="font-semibold">ressembler à ça</span>
            </h2>
          </div>

          {/* Mockup navigateur */}
          <div className="bg-[#1A1A1A] rounded-2xl shadow-xl overflow-hidden border border-[#2A2A2A]">

            {/* Barre navigateur */}
            <div className="bg-[#0A0A0A] px-4 py-3 flex items-center gap-3 border-b border-[#2A2A2A]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28CA41]"></div>
              </div>
              <div className="flex-1 bg-[#1A1A1A] rounded-md px-4 py-1 text-sm text-gray-500 text-center mx-8">
                {nom.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.fr
              </div>
            </div>

            {/* Contenu site */}
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1400&q=85"
                alt="Aperçu site"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Header fictif */}
              <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
                <span className="text-white font-medium text-lg">{nom}</span>
                <div className="hidden md:flex items-center gap-6 text-white/80 text-sm">
                  <span>Services</span>
                  <span>Galerie</span>
                  <span>Tarifs</span>
                  <span className="bg-[#C9A66B] text-[#1A1A1A] px-4 py-2 rounded-full font-medium">Réserver</span>
                </div>
              </div>

              {/* Contenu fictif */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <p className="text-white/70 text-sm uppercase tracking-wider mb-3">Barbershop · {ville}</p>
                <h3 className="text-3xl md:text-4xl text-white font-light mb-6">
                  L'art de la coupe<br />
                  <span className="font-semibold">au masculin</span>
                </h3>
                <div className="flex items-center gap-4">
                  <span className="bg-[#C9A66B] text-[#1A1A1A] px-6 py-3 rounded-full font-medium">
                    Prendre rendez-vous
                  </span>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 bg-[#1A1A1A] rounded-2xl p-6 max-w-2xl mx-auto border border-[#2A2A2A]">
            <p className="text-[#A0A0A0] text-center leading-relaxed">
              <strong className="text-white">Le design peut être très travaillé</strong> - on construit votre projet ensemble.
              Vous avez une idée précise ? Je la réalise. Vous ne savez pas par où commencer ?
              Je vous fais des propositions. Je suis perfectionniste : je ne livre que du travail dont je suis fière.
            </p>
          </div>

        </div>
      </section>

      {/* ════════ COMMENT ÇA MARCHE - PÉDAGOGIE SEO ════════ */}
      <section className="py-24 px-8 md:px-16 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-[#C9A66B] text-sm font-medium uppercase tracking-wider mb-4">La stratégie</p>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Comment on vous rend<br />
              <span className="font-semibold">visible sur Google ?</span>
            </h2>
          </div>

          {/* Explication pédagogique */}
          <div className="bg-[#111111] rounded-3xl p-8 md:p-12 mb-12 border border-[#2A2A2A]">
            <h3 className="text-xl font-semibold text-white mb-6">Le principe est simple :</h3>
            <div className="space-y-4 text-[#A0A0A0] leading-relaxed">
              <p>
                <strong className="text-white">1 mot-clé = 1 page dédiée sur votre site.</strong>
              </p>
              <p>
                Quand un internaute tape <strong className="text-white">"barbier {ville}"</strong> dans Google,
                on veut que Google affiche <strong className="text-white">votre page</strong> qui parle spécifiquement
                de votre barbershop à {ville}.
              </p>
              <p>
                Plus vous avez de pages qui répondent aux recherches des gens,
                plus vous avez de chances d'apparaître. C'est mathématique.
              </p>
            </div>
          </div>

          {/* Exemple concret */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-white mb-6 text-center">Exemple concret pour {nom} :</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#111111] rounded-2xl p-5 flex items-center gap-4 border border-[#2A2A2A]">
                <div className="w-10 h-10 bg-[#C9A66B] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">Page "Barber {ville}"</p>
                  <p className="text-sm text-[#B8A68F]">→ cible 1 900 recherches/mois</p>
                </div>
              </div>

              <div className="bg-[#111111] rounded-2xl p-5 flex items-center gap-4 border border-[#2A2A2A]">
                <div className="w-10 h-10 bg-[#C9A66B] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">Page "Barbier {ville}"</p>
                  <p className="text-sm text-[#B8A68F]">→ cible 1 000 recherches/mois</p>
                </div>
              </div>

              <div className="bg-[#111111] rounded-2xl p-5 flex items-center gap-4 border border-[#2A2A2A]">
                <div className="w-10 h-10 bg-[#C9A66B] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">Page "Coiffeur homme {ville}"</p>
                  <p className="text-sm text-[#B8A68F]">→ cible 880 recherches/mois</p>
                </div>
              </div>

              <div className="bg-[#111111] rounded-2xl p-5 flex items-center gap-4 border border-[#2A2A2A]">
                <div className="w-10 h-10 bg-[#C9A66B] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">Page "Coiffeur barbier"</p>
                  <p className="text-sm text-[#B8A68F]">→ cible 260 recherches/mois</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Le tarif SEO dépend du <strong className="text-white">nombre de mots-clés</strong> que vous souhaitez cibler.
              Plus on crée de pages, plus on capte de recherches.
            </p>
          </div>

        </div>
      </section>

      {/* ════════ CE QUE JE FAIS POUR VOUS ════════ */}
      <section className="py-24 px-8 md:px-16 bg-[#111111]">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-[#C9A66B] text-sm font-medium uppercase tracking-wider mb-4">Mon accompagnement</p>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Je m'occupe de tout.<br />
              <span className="font-semibold">Vous vous concentrez sur vos clients.</span>
            </h2>
          </div>

          <div className="space-y-6">

            <div className="flex items-start gap-6 p-6 bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A]">
              <div className="w-12 h-12 bg-[#C9A66B] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-[#1A1A1A] font-semibold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Je crée votre site sur-mesure</h3>
                <p className="text-[#A0A0A0]">
                  Un site <strong className="text-white">rapide et élégant</strong>, avec vos photos,
                  vos services, vos tarifs. Prêt à l'emploi, vous n'avez rien à faire.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A]">
              <div className="w-12 h-12 bg-[#C9A66B] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-[#1A1A1A] font-semibold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Je vous rends visible sur Google</h3>
                <p className="text-[#A0A0A0]">
                  J'optimise votre site pour que vous apparaissiez quand quelqu'un cherche
                  <strong className="text-white"> "barbier {ville}"</strong>, <strong className="text-white">"barber {ville}"</strong>, <strong className="text-white">"coiffeur homme {ville}"</strong>, etc.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A]">
              <div className="w-12 h-12 bg-[#C9A66B] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-[#1A1A1A] font-semibold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">J'optimise votre fiche Google</h3>
                <p className="text-[#A0A0A0]">
                  Votre fiche avec <strong className="text-white">{note}★ et {avis} avis</strong> est un atout.
                  Je l'optimise pour qu'elle ressorte encore mieux dans les résultats.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A]">
              <div className="w-12 h-12 bg-[#C9A66B] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-[#1A1A1A] font-semibold">4</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Le site est à vous</h3>
                <p className="text-[#A0A0A0]">
                  Contrairement aux solutions où vous louez votre site, ici <strong className="text-white">vous êtes propriétaire</strong>.
                  Si on arrête de travailler ensemble, vous gardez tout.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ QUI SUIS-JE ════════ */}
      <section className="py-24 px-8 md:px-16 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div className="order-2 md:order-1">
              <p className="text-[#C9A66B] text-sm font-medium uppercase tracking-wider mb-4">Votre interlocutrice</p>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
                Indiana Aflalo<br />
                <span className="font-semibold">Consultante digitale</span>
              </h2>
              <div className="space-y-4 text-[#A0A0A0] leading-relaxed">
                <p>
                  Après plusieurs années en agence digitale, j'ai créé ma propre structure pour
                  accompagner les commerces locaux. <strong className="text-white">C'est devenu une vraie passion.</strong>
                </p>
                <p>
                  Diplômée d'un <strong className="text-white">double master en stratégie digitale</strong>,
                  j'aime voir mes clients gagner en visibilité et décrocher de nouveaux rendez-vous.
                </p>
                <p>
                  Mon approche : des <strong className="text-white">explications simples</strong>,
                  des actions concrètes, et des résultats mesurables.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="bg-[#2A2A2A] px-4 py-2 rounded-full text-sm text-[#A0A0A0]">SEO Local</span>
                <span className="bg-[#2A2A2A] px-4 py-2 rounded-full text-sm text-[#A0A0A0]">Création de sites</span>
                <span className="bg-[#2A2A2A] px-4 py-2 rounded-full text-sm text-[#A0A0A0]">Google Business</span>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative">
                <Image
                  src="/images/indiana-aflalo.jpg"
                  alt="Indiana Aflalo - Consultante digitale"
                  width={320}
                  height={400}
                  className="w-full max-w-xs mx-auto rounded-3xl shadow-xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-[#2A2A2A] rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      <div className="w-6 h-6 bg-[#C9A66B] rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#1A1A1A]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                    </div>
                    <span className="text-sm text-white font-medium">Basée à {ville}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ TARIFS ════════ */}
      <section className="py-24 px-8 md:px-16 bg-[#111111]" id="tarifs">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-[#C9A66B] text-sm font-medium uppercase tracking-wider mb-4">Tarifs indicatifs</p>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Des formules claires,<br />
              <span className="font-semibold">sans surprise</span>
            </h2>
            <p className="text-[#A0A0A0] mt-4 max-w-2xl mx-auto">
              Ces tarifs donnent un ordre d'idée de ce type de travail. On peut affiner ensemble lors d'un échange,
              selon vos besoins et sur quels mots-clés vous souhaitez être visible.
            </p>
            <p className="text-[#B8A68F] mt-3 max-w-2xl mx-auto text-sm">
              C'est un <strong>investissement qui se renforce avec le temps</strong> : plus votre site vieillit et accumule du contenu,
              plus Google lui fait confiance. Ce que vous construisez aujourd'hui devient de plus en plus précieux.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Formule 1 */}
            <div className="bg-[#1A1A1A] rounded-3xl p-8 border border-[#2A2A2A]">
              <h3 className="text-xl font-semibold text-white mb-2">Site Vitrine</h3>
              <p className="text-[#B8A68F] text-sm mb-6">Votre présence en ligne</p>

              <div className="mb-8">
                <p className="text-sm text-[#B8A68F]">à partir de</p>
                <p className="text-4xl font-light text-white">690€</p>
                <p className="text-sm text-[#B8A68F]">paiement unique</p>
              </div>

              <ul className="space-y-3 text-[#A0A0A0] text-sm">
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
            <div className="bg-[#C9A66B] text-[#1A1A1A] rounded-3xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-white text-[#1A1A1A] text-xs font-semibold px-4 py-1.5 rounded-full">
                  Recommandé
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2 pt-2">Site + Visibilité</h3>
              <p className="text-[#3D3528] text-sm mb-6">Être trouvé sur Google</p>

              <div className="mb-8">
                <p className="text-sm text-[#3D3528] mb-1">Tarif site +</p>
                <p className="text-4xl font-light">180€<span className="text-lg text-[#3D3528]">/mois</span></p>
              </div>

              <ul className="space-y-3 text-[#3D3528] text-sm">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#1A1A1A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Site vitrine sur-mesure
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#1A1A1A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  1 mot-clé principal + longues traînes
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#1A1A1A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Contenu validé avant publication
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#1A1A1A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Optimisation fiche Google
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#1A1A1A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Rapport mensuel
                </li>
              </ul>

              <p className="text-xs text-[#3D3528] mt-6">Sans engagement</p>
            </div>

            {/* Formule 3 */}
            <div className="bg-[#1A1A1A] rounded-3xl p-8 border border-[#2A2A2A]">
              <h3 className="text-xl font-semibold text-white mb-2">Accompagnement Complet</h3>
              <p className="text-[#B8A68F] text-sm mb-6">Visibilité maximale</p>

              <div className="mb-8">
                <p className="text-sm text-[#B8A68F] mb-1">Tarif site +</p>
                <p className="text-4xl font-light text-white">290€<span className="text-lg text-[#B8A68F]">/mois</span></p>
              </div>

              <ul className="space-y-3 text-[#A0A0A0] text-sm">
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
                  2-3 mots-clés + longues traînes
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#6B9B8A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Gestion fiche Google optimisée SEO
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#6B9B8A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Réponses aux avis optimisées SEO
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#6B9B8A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Posts Google avec mots-clés
                </li>
              </ul>

              <p className="text-xs text-[#B8A68F] mt-6">Sans engagement</p>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ CTA FINAL ════════ */}
      <section className="py-24 px-8 md:px-16 bg-[#C9A66B]">
        <div className="max-w-2xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-light text-[#1A1A1A] mb-6">
            On en discute ?
          </h2>
          <p className="text-[#3D3528] text-lg mb-10">
            30 minutes pour parler de <span className="text-[#1A1A1A] font-medium">{nom}</span> et voir
            ce qu'on peut faire ensemble. Sans engagement.
          </p>

          <a
            href="https://calendly.com/contact-indhack/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2A2A2A] transition-colors text-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Réserver un appel gratuit
          </a>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-[#3D3528]">
            <a href="tel:0661139748" className="flex items-center gap-2 hover:text-[#1A1A1A] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              06 61 13 97 48
            </a>
            <a href="mailto:contact@indhack.com" className="flex items-center gap-2 hover:text-[#1A1A1A] transition-colors">
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

export default function BarbierDiagnosticPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1A1A1A]" />}>
      <DiagnosticContent />
    </Suspense>
  )
}
