'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Check, ArrowRight, Sparkles, Heart, Crown, MessageCircle, Menu } from 'lucide-react'

// --- DESIGN SYSTEM V8 (VISIBLE UPDATE) ---
// Fond plus marqué #F5F2EB pour voir le changement.

function Badge({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D4B996] text-[#5A5243] text-xs font-bold tracking-wide font-sans uppercase shadow-sm">
      {Icon && <Icon className="w-3 h-3 text-[#C6A87C]" />}
      {children}
    </div>
  )
}

function SectionTitle({ title, subtitle, centered = true }: { title: string, subtitle?: string, centered?: boolean }) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : 'text-left'} max-w-3xl mx-auto relative z-10`}>
      <h2 className="text-3xl md:text-5xl font-serif font-medium text-[#2D2A26] mb-6 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-[#6B6358] font-sans font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

function WarmCard({ title, children, icon: Icon, highlight = false }: { title: string, children: React.ReactNode, icon: any, highlight?: boolean }) {
  return (
    <div className={`p-8 rounded-2xl border transition-all duration-300 h-full flex flex-col group ${highlight ? 'bg-[#2D2A26] text-[#FDFCF8] border-[#2D2A26] shadow-2xl scale-105' : 'bg-white border-[#E6DCD3] text-[#2D2A26] hover:border-[#C6A87C] hover:shadow-lg'}`}>
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 text-xl shadow-inner transition-transform group-hover:scale-110 ${highlight ? 'bg-white/10 text-[#FDFCF8]' : 'bg-[#F9F5F0] text-[#C6A87C]'}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className={`text-xl font-serif font-medium mb-4 ${highlight ? 'text-[#C6A87C]' : 'text-[#2D2A26]'}`}>{title}</h3>
      <div className={`text-sm leading-relaxed font-light ${highlight ? 'text-[#E6DCD3]' : 'text-[#6B6358]'}`}>
        {children}
      </div>
    </div>
  )
}

// --- CONTENU PRINCIPAL ---

function DiagnosticContent({ metier }: { metier: string }) {
  const searchParams = useSearchParams()
  const nom = searchParams.get('nom')?.replace(/\+/g, ' ') || 'By Lucie Mendes'
  const ville = searchParams.get('ville')?.replace(/\+/g, ' ') || 'Nice'

  return (
    <main className="min-h-screen bg-[#F5F2EB] text-[#2D2A26] font-sans selection:bg-[#C6A87C] selection:text-white overflow-x-hidden">

      {/* SECTION 1: HERO INVERSÉ (POUR VOIR LE CHANGEMENT) */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-20 px-6 overflow-hidden">

        <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* IMAGE A GAUCHE MAINTENANT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative h-[600px] w-full hidden lg:block order-2 lg:order-1"
          >
            <div className="absolute inset-0 bg-[#C6A87C] rounded-[2rem] transform -rotate-3 blur-sm opacity-20" />
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1200"
                alt="Salon Ambiance"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Note Flottante */}
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl flex gap-4 items-center border border-[#E6DCD3]">
              <div className="bg-[#F9F5F0] p-3 rounded-full text-[#C6A87C]">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="font-serif text-[#2D2A26] font-medium text-lg">Vos clients vous cherchent.</p>
                <p className="text-sm text-[#999] mt-0.5">~2 800 recherches/mois</p>
              </div>
            </div>
          </motion.div>

          {/* TEXTE A DROITE MAINTENANT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="mb-6">
              <Badge icon={Crown}>Analyse pour {nom}</Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-medium text-[#2D2A26] mb-8 leading-[1.1]">
              4.6/5 sur Google...<br />
              <span className="text-[#C6A87C] italic">Le plus dur est fait.</span>
            </h1>

            <p className="text-xl text-[#6B6358] font-light leading-relaxed mb-10 max-w-lg">
              Vos clientes vous adorent, et ça se voit.
              <br />
              Pourtant, quand on cherche "Coiffeur {ville}", <strong>ce sont des salons moins bien notés qui vous passent devant.</strong>
            </p>

            <button onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })} className="group bg-[#2D2A26] text-[#FDFCF8] px-8 py-4 rounded-full font-medium text-lg flex items-center gap-3 hover:bg-[#403B35] transition-all shadow-xl hover:scale-105">
              Voir comment reprendre votre place
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* SECTION 2: LA TRADUCTION */}
      <section id="solution" className="py-24 px-6 bg-white relative z-10">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            title="Pourquoi votre site actuel est muet"
            subtitle="Pas de jargon ici. Juste la mécanique de Google expliquée simplement."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <WarmCard title="Le problème de la langue" icon={MessageCircle}>
              Imaginez arriver en Chine et parler Français. Personne ne vous comprend.
              <br /><br />
              Les sites classiques (Wix, etc.) parlent "Design". Google parle "Code".
              <strong>Ma mission :</strong> Traduire votre excellence dans la langue maternelle de Google pour qu'il vous mette enfin en avant.
            </WarmCard>

            <WarmCard title="Le futur assistant (IA)" icon={Sparkles} highlight={true}>
              Demain, vos clientes ne taperont plus sur un clavier. Elles demanderont à leur téléphone : <em>"Trouve-moi le meilleur coloriste à {ville}"</em>.
              <br /><br />
              Si votre site n'est pas prêt pour ça, l'IA ne vous verra pas. Je prépare votre salon pour être la réponse n°1 de ces assistants.
            </WarmCard>

            <WarmCard title="Tisser votre toile" icon={MapPin}>
              Avoir une seule page "Accueil", c'est comme avoir une seule entrée.
              <br /><br />
              <strong>Ma méthode :</strong> On crée des dizaines de "petites entrées" cachées qui répondent aux questions précises : <em>"Prix mèches"</em>, <em>"Coiffeur lundi"</em>. C'est comme ça qu'on capture tout le quartier.
            </WarmCard>
          </div>
        </div>
      </section>

      {/* SECTION 3: MOCKUP A L'HONNEUR */}
      <section className="py-32 px-6 bg-[#EBE5D9] relative overflow-hidden">

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <SectionTitle
            title="Votre nouvelle vitrine"
            subtitle="Imaginez un site qui reflète enfin la qualité de votre travail."
            centered={true}
          />

          <div className="relative mx-auto w-[320px] md:w-[360px] h-[720px] bg-[#222] rounded-[55px] p-[10px] shadow-2xl border-[4px] border-[#C6A87C]">
            {/* Notch Area */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#222] rounded-b-3xl z-30"></div>

            {/* Screen Content */}
            <div className="w-full h-full bg-white rounded-[45px] overflow-hidden flex flex-col relative text-left">

              {/* Navbar Clean */}
              <div className="pt-12 px-6 pb-4 flex justify-between items-center bg-white z-20 shadow-sm">
                <span className="font-serif font-bold text-lg tracking-tight text-[#2D2A26]">{nom}</span>
                <Menu className="w-6 h-6 text-[#2D2A26]" />
              </div>

              {/* Content Scrolling */}
              <div className="flex-1 overflow-y-auto no-scrollbar bg-[#FDFCF8]">
                <div className="px-6 py-6">
                  <p className="text-[10px] font-bold text-[#C6A87C] uppercase tracking-[0.25em] mb-4">L'Excellence à {ville}</p>
                  <h2 className="text-4xl font-serif text-[#2D2A26] leading-tight mb-8">Révélez votre beauté.</h2>

                  <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden mb-8 shadow-lg relative group">
                    <img
                      src="https://images.unsplash.com/photo-1595476103518-3c182ffe0948?q=80&w=600"
                      className="w-full h-full object-cover"
                      alt="Coiffure"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-white/20">
                      <div className="text-xs font-medium text-[#2D2A26] flex justify-between items-center">
                        <span>Coloration & Soin</span>
                        <ArrowRight className="w-3 h-3 text-[#C6A87C]" />
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-[#2D2A26] text-[#FDFCF8] py-4 rounded-xl font-medium shadow-lg mb-10">
                    Prendre Rendez-vous
                  </button>

                  <div className="border-t border-[#F2EBE3] pt-8 pb-8">
                    <div className="flex gap-1 text-[#C6A87C] mb-4 justify-center">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <p className="text-lg font-serif italic text-center text-[#6B6358] mb-3 leading-relaxed">
                      "Lucie a des doigts de fée. Je ne confierais mes cheveux à personne d'autre."
                    </p>
                    <p className="text-xs text-center font-bold text-[#2D2A26] uppercase tracking-widest opacity-60">Sophie • Cliente Vérifiée</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OFFRES */}
      <section className="py-24 px-6 bg-white relative z-10" id="offres">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            title="Investir dans votre fonds de commerce"
            subtitle="Fini de payer pour des pubs éphémères. Ici, vous construisez quelque chose qui vous appartient."
          />

          <div className="grid md:grid-cols-3 gap-8 items-stretch">

            {/* OFFRE 1 */}
            <div className="p-8 border border-[#F2EBE3] rounded-2xl bg-[#FDFCF8] flex flex-col hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-serif font-medium text-[#2D2A26] mb-2">Le Socle Propre</h3>
              <div className="text-3xl font-medium mb-1 font-serif text-[#2D2A26]">890€</div>
              <p className="text-xs text-[#999] mb-8 font-sans">une seule fois</p>

              <p className="text-sm text-[#6B6358] mb-8 leading-relaxed">
                Pour remplacer proprement votre présence actuelle. Un site rapide, élégant, qui vous appartient à 100%.
              </p>
              <div className="mt-auto">
                <button className="w-full py-3 border border-[#E6DCD3] bg-white text-[#2D2A26] rounded-lg text-sm font-medium hover:bg-[#F2EBE3] transition-colors">Choisir Le Socle</button>
              </div>
            </div>

            {/* OFFRE 2 (STAR) */}
            <div className="p-8 border border-[#C6A87C] rounded-2xl bg-[#FDFCF8] relative shadow-2xl flex flex-col transform md:-translate-y-4 ring-1 ring-[#C6A87C]/20">
              <div className="absolute top-0 right-0 bg-[#C6A87C] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl tracking-wider uppercase">Recommandé</div>

              <h3 className="text-xl font-serif font-medium text-[#C6A87C] mb-2">L'Expansion</h3>
              <div className="text-3xl font-medium mb-1 font-serif text-[#2D2A26]">1 490€</div>
              <p className="text-xs text-[#C6A87C] mb-8 font-sans">+ 149€/mois (Votre croissance)</p>

              <p className="text-sm text-[#6B6358] mb-6 italic border-b border-[#F2EBE3] pb-4">
                Ce n'est pas une charge. C'est de l'acquisition.
                Chaque mois, on va chercher des clients qui ne vous connaissent pas encore.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#C6A87C]" /> <span className="font-medium">Site Complet & Design</span></li>
                <li className="flex gap-3 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#C6A87C]" /> <span className="font-medium">Rédaction mensuelle (Blog/FAQ)</span></li>
                <li className="flex gap-3 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#C6A87C]" /> <span className="font-medium">Visibilité sur vos quartiers</span></li>
                <li className="flex gap-3 text-sm text-[#5A5243]"><Check className="w-4 h-4 text-[#C6A87C]" /> <span className="font-medium">On s'occupe de tout (Tech)</span></li>
              </ul>
              <div className="mt-auto">
                <button className="w-full py-3 bg-[#2D2A26] text-white rounded-lg text-sm font-medium hover:bg-[#403B35] transition-colors shadow-lg shadow-[#2D2A26]/20">Démarrer ma croissance</button>
              </div>
            </div>

            {/* OFFRE 3 */}
            <div className="p-8 border border-[#F2EBE3] rounded-2xl bg-[#FDFCF8] flex flex-col hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-serif font-medium text-[#2D2A26] mb-2">L'Autorité</h3>
              <div className="text-3xl font-medium mb-1 font-serif text-[#2D2A26]">Sur Devis</div>
              <p className="text-xs text-[#999] mb-8 font-sans">Pour aller plus loin</p>

              <p className="text-sm text-[#6B6358] mb-8 leading-relaxed">
                Si vous voulez aller encore plus loin : gestion intégrale de vos avis Google, photos, et optimisation pour l'Intelligence Artificielle.
              </p>
              <div className="mt-auto">
                <button className="w-full py-3 border border-[#E6DCD3] bg-white text-[#2D2A26] rounded-lg text-sm font-medium hover:bg-[#F2EBE3] transition-colors">En discuter</button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER & CTA FLOTTANT HUMAIN */}
      <footer className="py-12 bg-white text-center border-t border-[#F2EBE3] relative z-10">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#F2EBE3] overflow-hidden border-2 border-white shadow-md">
            <img src="https://ui-avatars.com/api/?name=Indiana&background=C6A87C&color=fff" alt="Indiana" />
          </div>
        </div>
        <p className="text-[#2D2A26] font-serif font-medium text-lg mb-2">IndHack Nice</p>
        <p className="text-[#666] text-sm mb-8">Fait avec ❤️ à Nice par Indiana. Pas d'agence, juste de l'artisanat.</p>
        <p className="text-xs text-[#CCC]">06 61 13 97 48 • contact@indhack.com</p>
      </footer>

      {/* Flottant Humain */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-[#2D2A26] text-white pl-2 pr-6 py-2 rounded-full font-medium shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform border border-[#403B35]">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#C6A87C] overflow-hidden border-2 border-white">
              <img src="https://ui-avatars.com/api/?name=Indiana&background=C6A87C&color=fff" alt="Indiana" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
          </div>
          <div className="text-left">
            <span className="block text-[10px] text-[#C6A87C] uppercase tracking-wider font-bold">Un doute ?</span>
            <span className="block text-sm">On en parle 5 min ?</span>
          </div>
        </button>
      </div>

    </main>
  )
}

export default function DiagnosticPage({ params }: { params: { metier: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFCF8]" />}>
      <DiagnosticContent metier={params.metier} />
    </Suspense>
  )
}
