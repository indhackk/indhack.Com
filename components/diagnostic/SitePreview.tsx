'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Monitor, Smartphone, Star, Phone, MapPin, Clock, ChevronRight, Menu, Mail, Check } from 'lucide-react'

interface MetierData {
  label: string
  icon: string
  searchVolume: number
  avgTicket: number
  conversionRate: number
  heroImage: string
  color: string
}

interface SitePreviewProps {
  nom: string
  ville: string
  metier: MetierData
  tel: string
}

export default function SitePreview({ nom, ville, metier, tel }: SitePreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  const displayTel = tel || '06 XX XX XX XX'

  // Services génériques par métier
  const services = {
    restaurant: ['Menu du jour', 'Réservation', 'Livraison', 'Privatisation'],
    pizzeria: ['Pizzas classiques', 'Pizzas spéciales', 'Livraison', 'À emporter'],
    plombier: ['Dépannage urgent', 'Installation', 'Rénovation', 'Débouchage'],
    electricien: ['Dépannage', 'Installation', 'Mise aux normes', 'Domotique'],
    coiffeur: ['Coupe femme', 'Coupe homme', 'Coloration', 'Balayage'],
    garage: ['Révision', 'Réparation', 'Contrôle technique', 'Pneumatique'],
    dentiste: ['Soins dentaires', 'Implants', 'Orthodontie', 'Blanchiment'],
    avocat: ['Droit des affaires', 'Droit de la famille', 'Droit pénal', 'Conseil'],
    boulangerie: ['Pains artisanaux', 'Viennoiseries', 'Pâtisseries', 'Snacking'],
    coach: ['Coaching individuel', 'Coaching entreprise', 'Formation', 'Bilan'],
    artisan: ['Devis gratuit', 'Travaux', 'Rénovation', 'Dépannage'],
    architecte: ['Conception', 'Rénovation', 'Extension', 'Permis de construire'],
    photographe: ['Mariage', 'Portrait', 'Entreprise', 'Événementiel'],
    fleuriste: ['Bouquets', 'Compositions', 'Mariage', 'Deuil'],
    immobilier: ['Vente', 'Location', 'Estimation gratuite', 'Gestion locative']
  }

  const currentServices = services[metier.label.toLowerCase() as keyof typeof services] || services.artisan

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#0A0A0A] to-[#111]">
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm mb-4">
            Aperçu exclusif
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Votre futur site web
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Voici à quoi pourrait ressembler votre présence en ligne dans 7 jours
          </p>
        </motion.div>

        {/* Toggle Desktop/Mobile */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              viewMode === 'desktop'
                ? 'bg-white text-black'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            <Monitor className="w-5 h-5" />
            Desktop
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              viewMode === 'mobile'
                ? 'bg-white text-black'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            <Smartphone className="w-5 h-5" />
            Mobile
          </button>
        </div>

        {/* Preview Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div
            className={`relative transition-all duration-500 ${
              viewMode === 'desktop'
                ? 'w-full max-w-5xl'
                : 'w-full max-w-sm'
            }`}
          >
            {/* Browser Frame */}
            <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-black/50">
              {/* Browser Bar */}
              <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-[#0a0a0a] rounded-lg px-4 py-2 text-sm text-gray-400 flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate">www.{nom.toLowerCase().replace(/ /g, '-').replace(/'/g, '')}.fr</span>
                  </div>
                </div>
              </div>

              {/* Site Content */}
              <div className="bg-white overflow-y-auto max-h-[600px]" style={{ scrollbarWidth: 'thin' }}>
                {/* Navbar du site fictif */}
                <nav className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{metier.icon}</span>
                      <span className="font-bold text-gray-900 text-lg">{nom}</span>
                    </div>
                    {viewMode === 'desktop' ? (
                      <div className="flex items-center gap-6">
                        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Accueil</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Services</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">À propos</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Contact</a>
                        <button
                          className="px-4 py-2 rounded-full text-white text-sm font-medium"
                          style={{ backgroundColor: metier.color }}
                        >
                          Devis gratuit
                        </button>
                      </div>
                    ) : (
                      <Menu className="w-6 h-6 text-gray-700" />
                    )}
                  </div>
                </nav>

                {/* Hero du site fictif */}
                <div
                  className="relative py-20 px-6 bg-cover bg-center"
                  style={{ backgroundImage: `url(${metier.heroImage})` }}
                >
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="relative z-10 text-center text-white">
                    <div className="flex justify-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-2 text-sm">4.9/5 (47 avis)</span>
                    </div>
                    <h1 className={`text-3xl ${viewMode === 'desktop' ? 'md:text-5xl' : ''} font-bold mb-4`}>
                      {nom}
                    </h1>
                    <p className={`text-lg ${viewMode === 'desktop' ? 'md:text-xl' : ''} text-gray-200 mb-6`}>
                      Votre {metier.label.toLowerCase()} de confiance à {ville}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium"
                        style={{ backgroundColor: metier.color }}
                      >
                        <Phone className="w-5 h-5" />
                        {displayTel}
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium"
                      >
                        Devis gratuit
                        <ChevronRight className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bandeau Trust */}
                <div className="bg-gray-50 py-4 px-6">
                  <div className={`flex ${viewMode === 'desktop' ? 'justify-center gap-12' : 'flex-col gap-3'} text-gray-600 text-sm`}>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      Devis gratuit sous 24h
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      Intervention rapide
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      Garantie satisfaction
                    </div>
                  </div>
                </div>

                {/* Section Services */}
                <div className="py-12 px-6">
                  <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Nos Services</h2>
                  <div className={`grid ${viewMode === 'desktop' ? 'grid-cols-4' : 'grid-cols-2'} gap-4`}>
                    {currentServices.map((service, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-center"
                      >
                        <div
                          className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                          style={{ backgroundColor: `${metier.color}20` }}
                        >
                          <span className="text-xl">{['📋', '🔧', '⭐', '🚀'][i % 4]}</span>
                        </div>
                        <h3 className="font-medium text-gray-900 text-sm">{service}</h3>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section Contact */}
                <div className="py-12 px-6 bg-gray-900 text-white">
                  <div className={`grid ${viewMode === 'desktop' ? 'grid-cols-3' : 'grid-cols-1'} gap-8`}>
                    <div className="text-center">
                      <Phone className="w-8 h-8 mx-auto mb-3" style={{ color: metier.color }} />
                      <h3 className="font-medium mb-1">Téléphone</h3>
                      <p className="text-gray-400">{displayTel}</p>
                    </div>
                    <div className="text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-3" style={{ color: metier.color }} />
                      <h3 className="font-medium mb-1">Adresse</h3>
                      <p className="text-gray-400">{ville}, France</p>
                    </div>
                    <div className="text-center">
                      <Clock className="w-8 h-8 mx-auto mb-3" style={{ color: metier.color }} />
                      <h3 className="font-medium mb-1">Horaires</h3>
                      <p className="text-gray-400">Lun-Sam: 8h-19h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge "En construction" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -top-4 -right-4 bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-lg font-bold text-sm"
            >
              Prêt en 7 jours
            </motion.div>
          </div>
        </motion.div>

        {/* Features du site */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { icon: '⚡', label: 'Ultra-rapide', desc: 'Score Google 100/100' },
            { icon: '📱', label: 'Responsive', desc: 'Parfait sur mobile' },
            { icon: '🔒', label: 'Sécurisé', desc: 'HTTPS + RGPD' },
            { icon: '✏️', label: 'Modifiable', desc: 'Interface admin simple' }
          ].map((feature, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 text-center">
              <span className="text-2xl mb-2 block">{feature.icon}</span>
              <h4 className="font-medium text-white">{feature.label}</h4>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
