'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Search, ArrowRight, TrendingUp, Shield, Lock, Smartphone, Monitor, Check, X, Phone, Calendar, Menu as MenuIcon } from 'lucide-react'

// --- DATA SPÉCIFIQUE LUCIE MENDES / HALOSCAN 2026 ---
const REAL_DATA = {
  volumeGlobal: 2800,
  competitors: [
    { name: "Le Fil de l'Ame", rank: 3, rating: 4.4, reviews: 82 },
    { name: "Salon Carré d'Or", rank: 4, rating: 4.5, reviews: 110 }
  ],
  opportunites: [
    { keyword: "coiffeur nice nord", volume: 480, difficulty: "Faible" },
    { keyword: "coiffeur nice etoile", volume: 390, difficulty: "Moyenne" },
    { keyword: "coiffeur nice ouest", volume: 260, difficulty: "Faible" },
    { keyword: "meilleur coiffeur nice", volume: 720, difficulty: "Haute" },
  ]
}

// --- COMPONENTS UTILES ---

function SectionHeading({ title, subtitle, dark = false }: { title: string, subtitle: string, dark?: boolean }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-6 ${dark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      <p className={`text-lg md:text-xl ${dark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
        {subtitle}
      </p>
    </div>
  )
}

function BentoCard({ children, title, className = "" }: { children: React.ReactNode, title?: string, className?: string }) {
  return (
    <div className={`bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50 ${className}`}>
      {title && <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">{title}</h3>}
      {children}
    </div>
  )
}

// --- MAIN PAGE CONTENT ---

function DiagnosticContent({ metier }: { metier: string }) {
  const searchParams = useSearchParams()
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'By Lucie Mendes'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const tel = searchParams.get('tel') || '06 61 13 97 48'

  // États pour le mockup
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  return (
    <main className="min-h-screen bg-[#F9F9F9] text-gray-900 font-sans selection:bg-amber-100 selection:text-amber-900">

      {/* 1. HERO SECTION: L'AUTORITÉ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Luxe */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/60 to-[#F9F9F9]" />
          <img
            src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2000&auto=format&fit=crop"
            alt="Salon de coiffure luxe"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-medium tracking-wide text-sm">RÉPUTATION : EXCELLENTE (4,6/5)</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
              {nom}, vous êtes une artiste.<br />
              <span className="text-white/60 italic">Pourquoi Google vous cache ?</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 font-light">
              Vos 155 avis prouvent votre excellence. Mais quand 2 800 personnes cherchent un coiffeur à {ville},
              <span className="text-white font-semibold"> elles trouvent vos concurrents moins bien notés.</span>
            </p>

            <button onClick={() => document.getElementById('strategy')?.scrollIntoView({ behavior: 'smooth' })} className="group bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-50 transition-all flex items-center gap-3 mx-auto shadow-2xl shadow-white/10">
              Voir la stratégie pour dominer Nice
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. LE DIAGNOSTIC BRUTAL (DATA HALOSCAN) */}
      <section id="strategy" className="py-24 px-6 relative">
        <div className="container mx-auto">
          <SectionHeading
            title="La Vérité des Chiffres"
            subtitle="Nous avons analysé le marché niçois ce matin. Voici ce que vous perdez chaque mois."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Carte "Concurrents" */}
            <BentoCard title="L'Injustice Google" className="relative overflow-hidden border-orange-100 bg-orange-50/30">
              <div className="relative z-10">
                <p className="text-gray-600 mb-6">Ces salons captent vos clients car ils ont un "Site Autorité", même s'ils sont moins bien notés que vous.</p>
                <div className="space-y-4">
                  {REAL_DATA.competitors.map((comp, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 font-bold text-gray-500">#{comp.rank}</span>
                        <span className="font-bold text-gray-800">{comp.name}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{comp.rating}</span>
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        </div>
                        <span className="text-xs text-green-600 font-medium">Visible Page 1</span>
                      </div>
                    </div>
                  ))}

                  {/* YOU */}
                  <div className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-xl shadow-lg ring-4 ring-amber-500/20 transform scale-105">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 font-bold text-white">?</span>
                      <span className="font-bold">{nom}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-amber-400">4.6</span>
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      </div>
                      <span className="text-xs text-red-300 font-medium animate-pulse">Invisible Google</span>
                    </div>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Carte "Volume Perdu" */}
            <BentoCard title="Le Potentiel Manqué (Mensuel)" className="bg-white">
              <div className="flex items-center gap-4 mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100 text-blue-800">
                <Search className="w-6 h-6 flex-shrink-0" />
                <p className="font-medium text-sm">Données extraites des recherches Niçoises (Source: Haloscan 2026)</p>
              </div>

              <div className="space-y-0">
                {REAL_DATA.opportunites.map((opp, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 transition-colors rounded-lg">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-lg">"{opp.keyword}"</span>
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-medium mt-1">Difficulté: {opp.difficulty}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-xl font-bold text-gray-900">{opp.volume}</span>
                      <span className="text-xs text-gray-500">recherches/mois</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                <span className="text-gray-500 font-medium">Total Trafic Manqué</span>
                <span className="text-3xl font-serif font-bold text-red-500">~1 850</span>
              </div>
              <p className="text-right text-xs text-red-400 mt-1">visiteurs potentiels par mois</p>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* 3. STRATÉGIE "GHOST PAGES" */}
      <section className="py-24 px-6 bg-[#0F172A] text-white overflow-hidden">
        <div className="container mx-auto">
          <SectionHeading
            title="La Stratégie 'Ghost Pages'"
            subtitle="Comment nous allons encercler Nice sans que vos concurrents ne comprennent rien."
            dark={true}
          />

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-xl flex-shrink-0">1</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Le Site "Forteresse"</h3>
                  <p className="text-gray-400 leading-relaxed">
                    On crée un site central ultra-premium "{nom}". Il rassure, présente vos tarifs, et transforme le visiteur en client (réservation Planity intégrée).
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-500 font-bold text-xl flex-shrink-0">2</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Les Pages Fantômes (L'Infiltration)</h3>
                  <p className="text-gray-400 leading-relaxed">
                    On crée des pages spécifiques cachées dans le menu mais visibles par Google.
                    <br />
                    <span className="text-green-400 font-mono text-sm mt-2 block bg-green-900/30 p-2 rounded">
                      indhack.com/coiffeur-nice-etoile<br />
                      indhack.com/meilleur-coiffeur-nice<br />
                      indhack.com/lissage-bresilien-nice
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-xl flex-shrink-0">3</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Le Résultat Mathématique</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Si on capte 5% de ce trafic (très pessimiste), ça fait <strong className="text-white">+90 nouveaux clients par mois</strong>. Même à 45€ la coupe, le calcul est vite fait.
                  </p>
                </div>
              </div>
            </div>

            {/* Visualisation Ghost Pages */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/30 blur-3xl rounded-full" />
              <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl">
                <div className="text-center border-b border-gray-800 pb-4 mb-4">
                  <span className="text-xs font-mono text-gray-500">ARCHITECTURE DU SITE</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  {/* Main Node */}
                  <div className="bg-amber-500 text-black font-bold px-6 py-3 rounded-lg shadow-lg shadow-amber-500/20 w-48 text-center ring-2 ring-amber-400/50">
                    Accueil (Nice Centre)
                  </div>

                  {/* Branches */}
                  <div className="w-px h-8 bg-gray-700" />
                  <div className="w-64 h-px bg-gray-700" />
                  <div className="flex justify-between w-64">
                    <div className="w-px h-8 bg-gray-700" />
                    <div className="w-px h-8 bg-gray-700" />
                    <div className="w-px h-8 bg-gray-700" />
                  </div>

                  {/* Leaf Nodes (Ghost Pages) */}
                  <div className="flex gap-4">
                    <div className="bg-gray-800 border border-gray-700 text-gray-300 px-3 py-2 rounded text-xs w-24 text-center">
                      /nice-nord
                      <span className="block text-[10px] text-green-400 mt-1">480 vol.</span>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 text-gray-300 px-3 py-2 rounded text-xs w-24 text-center">
                      /nice-etoile
                      <span className="block text-[10px] text-green-400 mt-1">390 vol.</span>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 text-gray-300 px-3 py-2 rounded text-xs w-24 text-center">
                      /meilleur
                      <span className="block text-[10px] text-green-400 mt-1">720 vol.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LE MOCKUP DYNAMIQUE (L'EFFET WOW) */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <SectionHeading
            title="Votre Futur Visage Digital"
            subtitle="Fini le bricolage. Voici une image à la hauteur de votre travail."
          />

          {/* Toggle View */}
          <div className="flex justify-center gap-4 mb-12">
            <button onClick={() => setViewMode('desktop')} className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${viewMode === 'desktop' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
              <Monitor className="w-4 h-4" /> PC / Mac
            </button>
            <button onClick={() => setViewMode('mobile')} className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${viewMode === 'mobile' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
              <Smartphone className="w-4 h-4" /> iPhone
            </button>
          </div>

          <div className="flex justify-center">
            <div className={`transition-all duration-500 shadow-2xl rounded-2xl overflow-hidden border border-gray-200 ${viewMode === 'desktop' ? 'w-full max-w-5xl aspect-[16/9]' : 'w-[320px] aspect-[9/19]'}`}>
              {/* Fake Browser/Phone content */}
              <div className="h-full bg-white flex flex-col font-serif">
                {/* Navbar */}
                <div className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                  <div className="font-bold text-xl tracking-tighter italic">By Lucie Mendes.</div>
                  {viewMode === 'desktop' ? (
                    <div className="flex gap-6 text-sm font-sans font-medium text-gray-600">
                      <span>Le Salon</span>
                      <span>Prestations</span>
                      <span>Portfolio</span>
                      <span className="bg-black text-white px-4 py-2 rounded-full">Réserver</span>
                    </div>
                  ) : <MenuIcon className="w-6 h-6" />}
                </div>

                {/* Hero Site */}
                <div className="relative flex-1 bg-[#F5F5F0] flex items-center justify-center text-center px-4 overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-amber-700 text-sm font-sans tracking-[0.2em] mb-4">COIFFEUR & COLORISTE • NICE</p>
                    <h2 className="text-4xl md:text-6xl font-medium mb-6 text-gray-900 leading-tight">
                      Révélez votre lumière<br />naturelle.
                    </h2>
                    <div className="flex justify-center gap-4">
                      <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-sans text-sm font-medium">Prendre Rendez-vous</button>
                      <button className="bg-white border border-gray-200 text-gray-900 px-8 py-3 rounded-full font-sans text-sm font-medium">Nos Tarifs</button>
                    </div>
                  </div>
                  {/* Decorative circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-3xl z-0" />
                </div>

                {/* Avis Section */}
                <div className="bg-white py-8 border-t border-gray-50">
                  <div className="flex justify-center gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-500"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
                      <span className="font-sans text-sm font-bold">155 avis Google</span>
                    </div>
                    {viewMode === 'desktop' && (
                      <p className="font-sans text-sm italic text-gray-500">"La meilleure expérience coiffure de ma vie." — Sophie L.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LES 3 OFFRES (NO-BRAINER) */}
      <section className="py-24 px-6 bg-gray-50" id="offres">
        <div className="container mx-auto">
          <SectionHeading
            title="Votre Investissement"
            subtitle="Des solutions claires. Rentables dès le premier mois."
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* OFFRE 1 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col">
              <h3 className="text-gray-900 font-bold text-xl mb-2">Vitrine</h3>
              <p className="text-gray-500 text-sm mb-6">Pour exister proprement.</p>
              <div className="text-3xl font-bold text-gray-900 mb-1">890€</div>
              <div className="text-sm text-gray-400 mb-8">+ 49€/mois maintenance</div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500" /> Site One-Page Luxe</li>
                <li className="flex gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500" /> Design sur-mesure</li>
                <li className="flex gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500" /> Connexion Planity</li>
              </ul>
              <button className="w-full py-3 rounded-xl border border-gray-200 text-gray-900 font-bold hover:bg-gray-50">Choisir Vitrine</button>
            </div>

            {/* OFFRE 2 (STAR) */}
            <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl flex flex-col relative scale-105 ring-4 ring-amber-500/20">
              <div className="absolute top-0 right-0 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">RECOMMANDÉ</div>
              <h3 className="font-bold text-xl mb-2 text-amber-400">Expansion</h3>
              <p className="text-gray-400 text-sm mb-6">Pour capturer le trafic concurrent.</p>
              <div className="text-3xl font-bold text-white mb-1">1 490€</div>
              <div className="text-sm text-gray-400 mb-8">+ 149€/mois (SEO)</div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex gap-2 text-sm text-gray-200"><Check className="w-4 h-4 text-amber-500" /> <strong>Site Complet (5 pages)</strong></li>
                <li className="flex gap-2 text-sm text-gray-200"><Check className="w-4 h-4 text-amber-500" /> <strong>Stratégie Ghost Pages</strong></li>
                <li className="flex gap-2 text-sm text-gray-200"><Check className="w-4 h-4 text-amber-500" /> Blog (2 articles/mois)</li>
                <li className="flex gap-2 text-sm text-gray-200"><Check className="w-4 h-4 text-amber-500" /> Rapport de Positions</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors">Je veux dominer Nice</button>
            </div>

            {/* OFFRE 3 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col">
              <h3 className="text-gray-900 font-bold text-xl mb-2">Empire</h3>
              <p className="text-gray-500 text-sm mb-6">L'automatisation totale.</p>
              <div className="text-3xl font-bold text-gray-900 mb-1">1 990€</div>
              <div className="text-sm text-gray-400 mb-8">+ 290€/mois (Full)</div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500" /> Tout du pack Expansion</li>
                <li className="flex gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500" /> Réponses Avis par IA</li>
                <li className="flex gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500" /> Google Posts Hebdo</li>
                <li className="flex gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500" /> QR Codes & Flyers</li>
              </ul>
              <button className="w-full py-3 rounded-xl border border-gray-200 text-gray-900 font-bold hover:bg-gray-50">Choisir Empire</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="py-12 bg-white text-center border-t border-gray-100">
        <p className="text-gray-500 text-sm">
          Créé spécifiquement pour <span className="text-gray-900 font-bold">{nom}</span> par <span className="text-gray-900 font-bold">IndHack Nice</span>.
        </p>
        <div className="mt-4 flex justify-center gap-4 text-sm text-gray-400">
          <span>06 61 13 97 48</span>
          <span>•</span>
          <span>contact@indhack.com</span>
        </div>
      </footer>
    </main>
  )
}

export default function DiagnosticPage({ params }: { params: { metier: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <DiagnosticContent metier={params.metier} />
    </Suspense>
  )
}
