'use client'
// V10 Deployment Trigger


import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Check, ArrowRight, Sparkles, Heart, Crown, MessageCircle, Menu, Smartphone, Globe, Lock, TrendingUp, Search } from 'lucide-react'

// --- DESIGN SYSTEM V9 (DESIRE & REALITY) ---
// Couleurs : #F9F7F5 (Sable), #B08D55 (Or), #3C3633 (Café)

function Badge({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E8E2D9] text-[#8A7A70] text-xs font-bold tracking-widest font-sans uppercase shadow-sm">
      {Icon && <Icon className="w-3 h-3 text-[#B08D55]" />}
      {children}
    </div>
  )
}

function SectionTitle({ title, subtitle, centered = true }: { title: string, subtitle?: string, centered?: boolean }) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : 'text-left'} max-w-2xl mx-auto relative z-10`}>
      <h2 className="text-3xl md:text-5xl font-serif font-medium text-[#3C3633] mb-6 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-[#8A7A70] font-sans font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

function WarmCard({ title, children, icon: Icon, highlight = false }: { title: string, children: React.ReactNode, icon: any, highlight?: boolean }) {
  return (
    <div className={`p-8 rounded-2xl border transition-all duration-300 h-full flex flex-col group ${highlight ? 'bg-[#3C3633] text-[#F9F7F5] border-[#3C3633] shadow-2xl scale-105' : 'bg-white border-[#E8E2D9] text-[#3C3633] hover:border-[#B08D55] hover:shadow-lg'}`}>
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 text-xl shadow-inner transition-transform group-hover:scale-110 ${highlight ? 'bg-white/10 text-[#F9F7F5]' : 'bg-[#F4F1ED] text-[#B08D55]'}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className={`text-xl font-serif font-medium mb-4 ${highlight ? 'text-[#B08D55]' : 'text-[#3C3633]'}`}>{title}</h3>
      <div className={`text-sm leading-relaxed ${highlight ? 'text-[#E8E2D9] font-light' : 'text-[#6D635C]'}`}>
        {children}
      </div>
    </div>
  )
}

// --- CONTENU PRINCIPAL ---

function DiagnosticContent() {
  const searchParams = useSearchParams()

  // DONNÉES DYNAMIQUES (Le retour de l'intelligence)
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'Votre Salon'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'
  const avis = searchParams.get('avis') || '155'
  const note = searchParams.get('note') || '4.6'
  const quartier = searchParams.get('quartier')?.replace(/\+/g, ' ') || 'Centre-Ville'

  return (
    <main className="min-h-screen bg-[#F9F7F5] text-[#3C3633] font-sans selection:bg-[#B08D55] selection:text-white overflow-x-hidden">

      {/* SECTION 1: HERO (L'INDÉPENDANCE) */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-20 px-6 overflow-hidden">

        <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-20 items-center relative z-10">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative h-[650px] w-full hidden lg:block"
          >
            {/* Cadre Photo "Tableau" */}
            <div className="absolute inset-0 bg-[#B08D55]/10 rounded-t-[10rem] rounded-b-[2rem] transform rotate-2" />
            <div className="absolute inset-0 rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-2xl border-[8px] border-white">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200"
                alt="Salon de coiffure cozy"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge adresse dynamique */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-6 py-3 rounded-full shadow-xl border border-[#E8E2D9] flex gap-2 items-center whitespace-nowrap">
              <MapPin className="w-4 h-4 text-[#B08D55]" />
              <span className="text-sm font-medium text-[#3C3633]">{quartier}, {ville}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <Badge icon={Crown}>Excellence ({note}/5 · {avis} avis)</Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-medium text-[#3C3633] mb-8 leading-[1.05]">
              {nom}, ne soyez plus<br />
              <span className="text-[#B08D55] italic">locataire</span> de votre visibilité.
            </h1>

            <p className="text-xl text-[#6D635C] font-light leading-relaxed mb-10 max-w-lg">
              Vos clientes vous adorent ({note}/5), mais sur Google, ce sont les annuaires qui profitent de votre travail.
              <br /><br />
              Il est temps d'avoir votre propre actif digital qui attire les clients vers <em>vous</em>, sans commissions.
            </p>

            {/* PARTIE CHIFFRÉE (DIAGNOSTIC) */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#E8E2D9] mb-10">
              <h3 className="text-sm font-bold text-[#B08D55] uppercase tracking-wider mb-4 border-b border-[#F4F1ED] pb-2">
                Le Potentiel inexploité à {ville}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-serif text-[#3C3633]">2 800</div>
                  <div className="text-xs text-[#8A7A70]">Recherches "Coiffeur" /mois</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-[#3C3633] text-green-600">+45</div>
                  <div className="text-xs text-[#8A7A70]">Nouveaux clients potentiels</div>
                </div>
              </div>
            </div>

            <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="inline-flex group bg-[#3C3633] text-[#F9F7F5] px-8 py-4 rounded-full font-medium text-lg items-center gap-3 hover:bg-[#B08D55] transition-all shadow-xl hover:scale-105">
              Réserver mon audit pour {nom}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

        </div>
      </section>

      {/* SECTION 2: RÉALITÉ DU MARCHÉ */}
      <section id="solution" className="py-24 px-6 bg-white relative z-10 border-t border-[#E8E2D9]">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            title="Pourquoi vos concurrents vous passent devant"
            subtitle="Ce n'est pas une question de talent. C'est une question de technique."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <WarmCard title="Le Piège des Commissions" icon={Lock}>
              Planity et Fresha sont géniaux pour gérer l'agenda, mais ils gardent vos données.
              <br /><br />
              <strong>Le risque :</strong> Si vous arrêtez de payer, vous disparaissez. Avec moi, votre site vous appartient à vie. C'est un fonds de commerce.
            </WarmCard>

            <WarmCard title="Google est devenue une IA" icon={Sparkles} highlight={true}>
              Aujourd'hui, Google ne lit plus des mots-clés, il cherche des *réponses*.
              <br /><br />
              Quand une cliente demande <em>"Coiffeur spécialiste blond à {ville}"</em>, mon code dit à Google : "C'est {nom}". Un site Wix ne sait pas faire ça.
            </WarmCard>

            <WarmCard title="La Stratégie Locale" icon={Globe}>
              Vous êtes à {quartier}. Mais êtes-vous visible pour les gens à 2km ?
              <br /><br />
              <strong>Ma méthode :</strong> Je crée des pages spécifiques pour chaque micro-quartier autour de {ville}. On encercle la zone. C'est mathématique.
            </WarmCard>
          </div>
        </div>
      </section>

      {/* SECTION 3: MOCKUP PROPRE */}
      <section className="py-32 px-6 bg-[#F4F1ED] relative overflow-hidden">

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <SectionTitle
            title="Votre nouvelle vitrine"
            subtitle="Une expérience mobile pensée pour convertir les visiteurs en rendez-vous."
            centered={true}
          />

          <div className="relative mx-auto w-[320px] md:w-[360px] h-[720px] bg-[#1a1a1a] rounded-[55px] p-[10px] shadow-[0_50px_100px_-20px_rgba(176,141,85,0.3)] border border-[#333]">
            {/* Notch Area */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#1a1a1a] rounded-b-3xl z-30"></div>

            {/* Screen Content */}
            <div className="w-full h-full bg-white rounded-[45px] overflow-hidden flex flex-col relative text-left">

              {/* Navbar Absolue */}
              <div className="absolute top-0 left-0 right-0 pt-12 px-6 pb-4 flex justify-between items-center z-20 bg-gradient-to-b from-white via-white/80 to-transparent">
                <span className="font-serif font-bold text-lg tracking-tight text-[#3C3633]">{nom}</span>
                <Menu className="w-6 h-6 text-[#3C3633]" />
              </div>

              {/* Content Scrolling */}
              <div className="flex-1 overflow-y-auto no-scrollbar bg-[#F9F7F5] pt-0">
                {/* Grande Image Hero */}
                <div className="h-[400px] w-full relative">
                  <img
                    src="https://images.unsplash.com/photo-1595476103518-3c182ffe0948?q=80&w=600"
                    className="w-full h-full object-cover"
                    alt="Coiffure"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#F9F7F5] to-transparent h-32" />
                  <div className="absolute bottom-8 left-6">
                    <span className="text-xs bg-[#B08D55] text-white px-2 py-1 rounded mb-2 inline-block">Mèches & Balayage</span>
                    <h2 className="text-3xl font-serif text-[#3C3633] leading-none text-shadow">Révélez votre beauté à {ville}.</h2>
                  </div>
                </div>

                <div className="px-6 py-6 pb-20">
                  <p className="text-sm text-[#6D635C] leading-relaxed mb-6 font-light">
                    "Un savoir-faire unique au cœur de {quartier}. Prenez le temps de vous révéler."
                  </p>

                  <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8E2D9] mb-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#F4F1ED] flex items-center justify-center text-[#B08D55]">
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <div className="font-bold text-[#3C3633]">{note}/5 Excellence</div>
                      <div className="text-xs text-[#8A7A70]">Basé sur {avis} avis Google</div>
                    </div>
                  </div>

                  <button className="w-full bg-[#3C3633] text-[#F9F7F5] py-4 rounded-xl font-medium shadow-lg mb-4">
                    Prendre Rendez-vous
                  </button>
                  <p className="text-xs text-center text-[#999]">Sans commission · Direct Salon</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LES OFFRES "INVESTISSEMENT" (JUSTIFICATION PRIX) */}
      <section className="py-24 px-6 bg-white relative z-10" id="offres">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            title="Plus qu'un coût, un investissement"
            subtitle="Le prix inclut TOUT ce qu'une agence vous facturerait en option. Pas de surprise."
          />

          <div className="grid md:grid-cols-3 gap-8 items-stretch">

            {/* OFFRE 1: L'ESSENTIEL (EXISTER) */}
            <div className="p-8 border border-[#E8E2D9] rounded-2xl bg-[#F9F7F5] flex flex-col hover:border-[#B08D55]/50 transition-colors">
              <h3 className="text-xl font-serif font-medium text-[#3C3633] mb-2">L'Essentiel</h3>
              <div className="text-3xl font-medium mb-1 font-serif text-[#3C3633]">690€</div>
              <p className="text-xs text-[#8A7A70] mb-6 font-sans">Paiement unique</p>

              <div className="border-t border-[#E8E2D9] py-6 space-y-3">
                <p className="font-bold text-sm text-[#3C3633]">Votre socle digital :</p>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> Site Vitrine Premium (3 pages)</li>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> Design Moderne & Mobile-First</li>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> Optimisation Fiche Google (GMB)</li>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> Hébergement & SSL INCLUS</li>
              </div>

              <div className="mt-auto">
                <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="block w-full text-center py-3 border border-[#E8E2D9] bg-white text-[#3C3633] rounded-lg text-sm font-medium hover:bg-[#F4F1ED] transition-colors">Choisir L'Essentiel</a>
              </div>
            </div>

            {/* OFFRE 2: L'ÉCOSYSTÈME (GRANDIR) */}
            <div className="p-8 border border-[#B08D55] rounded-2xl bg-white relative shadow-2xl flex flex-col transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-[#B08D55] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl tracking-wider uppercase">Best Seller</div>

              <h3 className="text-xl font-serif font-medium text-[#B08D55] mb-2">L'Écosystème</h3>
              <div className="text-3xl font-medium mb-1 font-serif text-[#3C3633]">990€</div>
              <p className="text-xs text-[#B08D55] mb-6 font-sans">+ 149€/mois (Maintenance & SEO)</p>

              <div className="border-t border-[#F4F1ED] py-6 space-y-3">
                <p className="font-bold text-sm text-[#3C3633]">Tout L'Essentiel, PLUS :</p>
                <li className="flex gap-2 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#B08D55]" /> <strong>Stratégie SEO Locale Active</strong></li>
                <li className="flex gap-2 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#B08D55]" /> 1 Article de Blog SEO / mois</li>
                <li className="flex gap-2 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#B08D55]" /> Pages Quantiers & Maillage Local</li>
                <li className="flex gap-2 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#B08D55]" /> Gestion & Réponses aux Avis</li>
                <li className="flex gap-2 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#B08D55]" /> Mises à jour illimitées</li>
              </div>

              <div className="mt-auto">
                <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="block w-full text-center py-3 bg-[#3C3633] text-white rounded-lg text-sm font-medium hover:bg-[#5A5243] transition-colors shadow-lg">Choisir L'Écosystème</a>
              </div>
            </div>

            {/* OFFRE 3: LE PACK DOMINANT (DOMINER) */}
            <div className="p-8 border border-[#E8E2D9] rounded-2xl bg-[#F9F7F5] flex flex-col hover:border-[#B08D55]/50 transition-colors">
              <h3 className="text-xl font-serif font-medium text-[#3C3633] mb-2">Le Pack Dominant</h3>
              <div className="text-3xl font-medium mb-1 font-serif text-[#3C3633]">1 290€</div>
              <p className="text-xs text-[#8A7A70] mb-6 font-sans">+ 199€/mois (Direction Artistique)</p>

              <div className="border-t border-[#E8E2D9] py-6 space-y-3">
                <p className="font-bold text-sm text-[#3C3633]">L'Excellence Totale :</p>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> shooting Photo Pro (Salon)</li>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> Vidéo Short/Reel Mensuel</li>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> Gestion Réseaux Sociaux</li>
                <li className="flex gap-2 text-sm text-[#6D635C]"><Check className="w-4 h-4 text-[#B08D55]" /> Dominance Totale sur {ville}</li>
              </div>

              <div className="mt-auto">
                <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="block w-full text-center py-3 border border-[#E8E2D9] bg-white text-[#3C3633] rounded-lg text-sm font-medium hover:bg-[#F4F1ED] transition-colors">Choisir L'Excellence</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-white text-center border-t border-[#E8E2D9] relative z-10">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#F4F1ED] overflow-hidden border-2 border-white shadow-md flex items-center justify-center">
            <span className="font-serif font-bold text-[#B08D55]">IH</span>
          </div>
        </div>
        <p className="text-[#3C3633] font-serif font-medium text-lg mb-2">IndHack {ville}</p>
        <p className="text-[#6D635C] text-sm mb-8">Artisan du Web pour Artisans du Réel.</p>
        <p className="text-xs text-[#CCC]">06 61 13 97 48 • contact@indhack.com</p>
      </footer>

      {/* Flottant Humain (Modèle V8 conservé mais avec lien correct) */}
      <div className="fixed bottom-6 right-6 z-50">
        <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="bg-[#3C3633] text-white pl-2 pr-6 py-2 rounded-full font-medium shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform border border-[#5A5243]">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#B08D55] overflow-hidden border-2 border-white flex items-center justify-center">
              <span className="text-xs font-bold">IH</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
          </div>
          <div className="text-left">
            <span className="block text-[10px] text-[#B08D55] uppercase tracking-wider font-bold">Dispo maintenant</span>
            <span className="block text-sm">On en parle ?</span>
          </div>
        </a>
      </div>

    </main>
  )
}

export default function CoiffeurPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9F7F5]" />}>
      <DiagnosticContent />
    </Suspense>
  )
}
