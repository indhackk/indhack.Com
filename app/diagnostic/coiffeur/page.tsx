'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Check, ArrowRight, Sparkles, Heart, Crown, MessageCircle, Menu, Smartphone, Globe, Lock } from 'lucide-react'

// --- DESIGN SYSTEM V9 (DESIRE & REALITY) ---
// Concept : "L'Indépendance Digitale".
// Couleurs : 
// - Fond : #F9F7F5 (Sable très clair, premium)
// - Texte : #3C3633 (Café noir doux)
// - Or : #B08D55 (Or patiné, moins jaune)
// - Accent : #E8E2D9 (Pierre chaude)

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
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'By Lucie Mendes'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'

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
            {/* Badge adresse */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-6 py-3 rounded-full shadow-xl border border-[#E8E2D9] flex gap-2 items-center whitespace-nowrap">
              <MapPin className="w-4 h-4 text-[#B08D55]" />
              <span className="text-sm font-medium text-[#3C3633]">22 Rue de l'Hôtel des Postes, Nice</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <Badge icon={Crown}>Excellence (4.6/5 · 155 avis)</Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-medium text-[#3C3633] mb-8 leading-[1.05]">
              Ne soyez plus<br />
              <span className="text-[#B08D55] italic">locataire</span> de votre visibilité.
            </h1>

            <p className="text-xl text-[#6D635C] font-light leading-relaxed mb-10 max-w-lg">
              Les plateformes de réservation vous rendent service, mais elles gardent le contrôle.
              <br /><br />
              Il est temps d'avoir votre propre "Maison Digitale". <strong>Un actif qui vous appartient à 100%</strong>, sans commission, et qui attire les clients vers <em>votre</em> marque.
            </p>

            <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="inline-flex group bg-[#3C3633] text-[#F9F7F5] px-8 py-4 rounded-full font-medium text-lg items-center gap-3 hover:bg-[#B08D55] transition-all shadow-xl hover:scale-105">
              Réserver un audit stratégique
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

        </div>
      </section>

      {/* SECTION 2: RÉALITÉ DU MARCHÉ (POURQUOI MAINTENANT ?) */}
      <section id="solution" className="py-24 px-6 bg-white relative z-10 border-t border-[#E8E2D9]">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            title="Pourquoi un 'joli site' ne suffit plus"
            subtitle="Le digital a changé. Voici les 3 piliers d'un salon qui dure en 2026."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <WarmCard title="Propriété vs Location" icon={Lock}>
              Planity vous coûte un abonnement à vie. Fresha prend 20% sur vos nouveaux clients.
              <br /><br />
              <strong>Ma solution :</strong> Vous investissez une fois. Le site est à vous. Les clients sont à vous. Fini les taxes sur votre succès.
            </WarmCard>

            <WarmCard title="L'Image de Marque" icon={Sparkles} highlight={true}>
              Sur les annuaires, votre logo fait 2cm. Vous êtes "un coiffeur parmi d'autres".
              <br /><br />
              Votre nouveau site est un écrin. Il plonge la cliente dans l'ambiance <em>By Lucie Mendes</em> avant même qu'elle ne pousse la porte. C'est ça qui justifie vos prix.
            </WarmCard>

            <WarmCard title="Domination Locale" icon={Globe}>
              Aujourd'hui, si on tape "Coiffeur Hôtel des Postes", on tombe sur qui ?
              <br /><br />
              Je ne fais pas juste un site. Je construis une <strong>forteresse locale</strong>. Chaque quartier de Nice aura une page qui mène à vous. C'est mathématique.
            </WarmCard>
          </div>
        </div>
      </section>

      {/* SECTION 3: MOCKUP PROPRE */}
      <section className="py-32 px-6 bg-[#F4F1ED] relative overflow-hidden">

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <SectionTitle
            title="Votre nouvelle vitrine"
            subtitle="Imaginez l'expérience que vous pourriez offrir."
            centered={true}
          />

          <div className="relative mx-auto w-[320px] md:w-[360px] h-[720px] bg-[#1a1a1a] rounded-[55px] p-[10px] shadow-[0_50px_100px_-20px_rgba(176,141,85,0.3)] border border-[#333]">
            {/* Notch Area */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#1a1a1a] rounded-b-3xl z-30"></div>

            {/* Screen Content - CORRECTION : Pas de sticky header ici pour éviter le bug */}
            <div className="w-full h-full bg-white rounded-[45px] overflow-hidden flex flex-col relative text-left">

              {/* Navbar Absolue (Remplaçant le sticky) */}
              <div className="absolute top-0 left-0 right-0 pt-12 px-6 pb-4 flex justify-between items-center z-20 bg-gradient-to-b from-white via-white/80 to-transparent">
                <span className="font-serif font-bold text-lg tracking-tight text-[#3C3633]">By Lucie Mendes</span>
                <Menu className="w-6 h-6 text-[#3C3633]" />
              </div>

              {/* Content Scrolling - Contenu qui passe SOUS la navbar */}
              <div className="flex-1 overflow-y-auto no-scrollbar bg-[#F9F7F5] pt-0">
                {/* Grande Image Hero dans le tel */}
                <div className="h-[400px] w-full relative">
                  <img
                    src="https://images.unsplash.com/photo-1595476103518-3c182ffe0948?q=80&w=600"
                    className="w-full h-full object-cover"
                    alt="Coiffure"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#F9F7F5] to-transparent h-32" />
                  <div className="absolute bottom-8 left-6">
                    <span className="text-xs bg-[#B08D55] text-white px-2 py-1 rounded mb-2 inline-block">Mèches & Balayage</span>
                    <h2 className="text-3xl font-serif text-[#3C3633] leading-none text-shadow">L'Art du Blond.</h2>
                  </div>
                </div>

                <div className="px-6 py-6 pb-20">
                  <p className="text-sm text-[#6D635C] leading-relaxed mb-6 font-light">
                    "Un savoir-faire unique au cœur de Nice. Prenez le temps de vous révéler."
                  </p>

                  <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8E2D9] mb-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#F4F1ED] flex items-center justify-center text-[#B08D55]">
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <div className="font-bold text-[#3C3633]">4.6/5 Excellence</div>
                      <div className="text-xs text-[#8A7A70]">Basé sur 155 avis Google</div>
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

      {/* SECTION 4: LES OFFRES "RENTABLES" */}
      <section className="py-24 px-6 bg-white relative z-10" id="offres">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            title="Plus qu'un coût, un investissement"
            subtitle="Ces tarifs incluent le design sur-mesure, le code technique Google-Ready, et votre liberté."
          />

          <div className="grid md:grid-cols-3 gap-8 items-stretch">

            {/* OFFRE 1 */}
            <div className="p-8 border border-[#E8E2D9] rounded-2xl bg-[#F9F7F5] flex flex-col hover:border-[#B08D55]/50 transition-colors">
              <h3 className="text-xl font-serif font-medium text-[#3C3633] mb-2">L'Essentiel</h3>
              <div className="text-3xl font-medium mb-1 font-serif text-[#3C3633]">1 290€</div>
              <p className="text-xs text-[#8A7A70] mb-8 font-sans">Paiement unique</p>

              <p className="text-sm text-[#6D635C] mb-8 leading-relaxed">
                Votre "Carte de Visite" de luxe. Un site rapide, mobile-first, qui présente votre salon et vos tarifs avec élégance.
              </p>
              <div className="mt-auto">
                <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="block w-full text-center py-3 border border-[#E8E2D9] bg-white text-[#3C3633] rounded-lg text-sm font-medium hover:bg-[#F4F1ED] transition-colors">Réserver L'Essentiel</a>
              </div>
            </div>

            {/* OFFRE 2 (STAR) */}
            <div className="p-8 border border-[#B08D55] rounded-2xl bg-white relative shadow-2xl flex flex-col transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-[#B08D55] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl tracking-wider uppercase">Best Seller</div>

              <h3 className="text-xl font-serif font-medium text-[#B08D55] mb-2">L'Écosystème</h3>
              <div className="text-3xl font-medium mb-1 font-serif text-[#3C3633]">1 890€</div>
              <p className="text-xs text-[#B08D55] mb-8 font-sans">+ 190€/mois (Maintenance & SEO)</p>

              <p className="text-sm text-[#6D635C] mb-6 italic border-b border-[#F4F1ED] pb-4">
                La machine à clients.
                On ne fait pas juste un site, on crée du contenu tous les mois pour que Google vous adore.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#B08D55]" /> <span className="font-medium">Site Premium Complet</span></li>
                <li className="flex gap-3 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#B08D55]" /> <span className="font-medium">1 Article de Blog / mois</span></li>
                <li className="flex gap-3 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#B08D55]" /> <span className="font-medium">Modifications illimitées</span></li>
                <li className="flex gap-3 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#B08D55]" /> <span className="font-medium">Rapport de Visibilité Mensuel</span></li>
              </ul>
              <div className="mt-auto">
                <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="block w-full text-center py-3 bg-[#3C3633] text-white rounded-lg text-sm font-medium hover:bg-[#5A5243] transition-colors shadow-lg">Choisir L'Écosystème</a>
              </div>
            </div>

            {/* OFFRE 3 */}
            <div className="p-8 border border-[#E8E2D9] rounded-2xl bg-[#F9F7F5] flex flex-col hover:border-[#B08D55]/50 transition-colors">
              <h3 className="text-xl font-serif font-medium text-[#3C3633] mb-2">Sur-Mesure</h3>
              <div className="text-3xl font-medium mb-1 font-serif text-[#3C3633]">Devis</div>
              <p className="text-xs text-[#8A7A70] mb-8 font-sans">Pour l'excellence absolue</p>

              <p className="text-sm text-[#6D635C] mb-8 leading-relaxed">
                Shooting photo, Vidéo drone, Réseaux sociaux... Une direction artistique complète pour faire de vous la référence n°1.
              </p>
              <div className="mt-auto">
                <a href="https://calendly.com/contact-indhack/30min" target="_blank" className="block w-full text-center py-3 border border-[#E8E2D9] bg-white text-[#3C3633] rounded-lg text-sm font-medium hover:bg-[#F4F1ED] transition-colors">En discuter</a>
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
        <p className="text-[#3C3633] font-serif font-medium text-lg mb-2">IndHack Nice</p>
        <p className="text-[#6D635C] text-sm mb-8">Artisan du Web pour Artisans du Réel.</p>
        <p className="text-xs text-[#CCC]">06 61 13 97 48 • contact@indhack.com</p>
      </footer>

      {/* Flottant Humain */}
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
