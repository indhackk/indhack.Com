'use client'

import { useState } from 'react'
import { Copy, Check, ExternalLink, Mail, Link2, Sparkles, RefreshCw } from 'lucide-react'

// ══════════════════════════════════════════════════════════════════════════════
// GÉNÉRATEUR D'URL + EMAIL PERSONNALISÉ
// Tu entres les infos du prospect → Tu obtiens l'URL + le message prêt à envoyer
// ══════════════════════════════════════════════════════════════════════════════

const METIERS = [
  { value: 'coiffeur', label: 'Coiffeur / Coiffeuse', emoji: '✂️' },
  { value: 'plombier', label: 'Plombier', emoji: '🔧' },
  { value: 'electricien', label: 'Électricien', emoji: '⚡' },
  { value: 'serrurier', label: 'Serrurier', emoji: '🔑' },
  { value: 'dentiste', label: 'Dentiste', emoji: '🦷' },
  { value: 'avocat', label: 'Avocat', emoji: '⚖️' },
  { value: 'prothesiste-ongulaire', label: 'Prothésiste ongulaire', emoji: '💅' },
  { value: 'renovation', label: 'Rénovation / BTP', emoji: '🏠' },
  { value: 'restaurant', label: 'Restaurant', emoji: '🍽️' },
  { value: 'photographe', label: 'Photographe', emoji: '📸' },
]

const EMAIL_TEMPLATES = {
  standard: {
    name: 'Standard',
    subject: (nom: string) => `${nom} - Votre visibilité sur Google (audit gratuit)`,
    body: (nom: string, ville: string, url: string, note: string, avis: string) => `Bonjour,

Je me permets de vous contacter car j'ai remarqué que ${nom} n'apparaît pas dans les premiers résultats Google quand on cherche un coiffeur à ${ville}.

C'est dommage, parce qu'avec ${note}/5 et ${avis} avis, vous avez clairement une excellente réputation.

J'ai préparé un mini-audit gratuit qui montre exactement :
• Combien de personnes cherchent vos services chaque mois à ${ville}
• Pourquoi elles ne vous trouvent pas
• Ce qu'on peut faire pour changer ça

👉 ${url}

Ça prend 2 minutes à lire. Si ça vous parle, on peut en discuter.

Bonne journée,

Indiana
IndHack - Visibilité web pour indépendants
06 61 13 97 48`,
  },
  direct: {
    name: 'Direct (court)',
    subject: (nom: string) => `${nom} - Vous perdez des clients sur Google`,
    body: (nom: string, ville: string, url: string, note: string, avis: string) => `Bonjour,

${avis} avis positifs mais invisible sur Google. C'est le problème de beaucoup de commerces à ${ville}.

J'ai analysé votre situation et préparé un rapport gratuit :
${url}

Si ça vous intéresse, je suis dispo pour en parler.

Indiana
06 61 13 97 48`,
  },
  premium: {
    name: 'Premium (détaillé)',
    subject: (nom: string, ville: string) => `[Analyse] ${nom} vs la concurrence à ${ville}`,
    body: (nom: string, ville: string, url: string, note: string, avis: string) => `Bonjour,

Je travaille avec des indépendants et commerçants sur leur visibilité Google. En analysant le marché à ${ville}, je suis tombé sur ${nom}.

Ce qui m'a frappé :
✓ Note excellente : ${note}/5
✓ ${avis} avis clients
✗ Mais quasi-invisible dans les recherches Google

Le problème, c'est que chaque mois, des milliers de personnes cherchent un professionnel comme vous sur Google. Sans visibilité, ces clients vont chez vos concurrents — pas parce qu'ils sont meilleurs, mais parce qu'ils sont trouvables.

J'ai préparé un audit personnalisé gratuit pour ${nom} :
👉 ${url}

Ce que vous y trouverez :
• Les volumes de recherche réels dans votre secteur
• Les mots-clés accessibles pour vous positionner
• Le coût de l'invisibilité (estimation chiffrée)
• Les solutions possibles avec tarifs transparents

Ça prend 3 minutes à lire. Aucun engagement, aucune obligation.

Si vous voulez en discuter ensuite, je suis disponible pour un appel de 30 minutes.

Bien à vous,

Indiana
IndHack - Visibilité web pour indépendants
📞 06 61 13 97 48
📧 contact@indhack.com`,
  },
}

export default function GeneratePage() {
  const [formData, setFormData] = useState({
    nom: '',
    ville: '',
    metier: 'coiffeur',
    note: '4.5',
    avis: '50',
    telephone: '',
    adresse: '',
  })

  const [emailTemplate, setEmailTemplate] = useState<keyof typeof EMAIL_TEMPLATES>('standard')
  const [copied, setCopied] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const generateUrl = () => {
    const params = new URLSearchParams({
      nom: formData.nom,
      ville: formData.ville,
      note: formData.note,
      avis: formData.avis,
    })
    if (formData.telephone) params.set('tel', formData.telephone)
    if (formData.adresse) params.set('adresse', formData.adresse)

    return `https://indhack.com/diagnostic/${formData.metier}?${params.toString()}`
  }

  const generateEmail = () => {
    const template = EMAIL_TEMPLATES[emailTemplate]
    const url = generateUrl()
    return {
      subject: template.subject(formData.nom, formData.ville),
      body: template.body(formData.nom, formData.ville, url, formData.note, formData.avis),
    }
  }

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const url = generateUrl()
  const email = generateEmail()

  const isFormValid = formData.nom && formData.ville

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold">Générateur de Pitch</h1>
          </div>
          <p className="text-gray-400">Entre les infos du prospect → Obtiens l'URL + l'email prêt à envoyer</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* FORMULAIRE */}
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-violet-500 text-xs flex items-center justify-center">1</span>
                Infos du prospect
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Nom du business *</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Ex: By Lucie Mendes"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Ville *</label>
                    <input
                      type="text"
                      name="ville"
                      value={formData.ville}
                      onChange={handleChange}
                      placeholder="Ex: Nice"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Métier *</label>
                    <select
                      name="metier"
                      value={formData.metier}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-violet-500 focus:outline-none transition-colors"
                    >
                      {METIERS.map((m) => (
                        <option key={m.value} value={m.value} className="bg-[#1a1a1a]">
                          {m.emoji} {m.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Note Google</label>
                    <input
                      type="text"
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      placeholder="4.5"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Nombre d'avis</label>
                    <input
                      type="text"
                      name="avis"
                      value={formData.avis}
                      onChange={handleChange}
                      placeholder="50"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Téléphone (optionnel)</label>
                  <input
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="04 93 XX XX XX"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Choix du template email */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-violet-500 text-xs flex items-center justify-center">2</span>
                Style d'email
              </h2>

              <div className="grid grid-cols-3 gap-3">
                {Object.entries(EMAIL_TEMPLATES).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => setEmailTemplate(key as keyof typeof EMAIL_TEMPLATES)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      emailTemplate === key
                        ? 'bg-violet-500 border-violet-500 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RÉSULTATS */}
          <div className="space-y-6">

            {/* URL Générée */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-violet-400" />
                  URL personnalisée
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(url, 'url')}
                    disabled={!isFormValid}
                    className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {copied === 'url' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied === 'url' ? 'Copié !' : 'Copier'}
                  </button>
                  <a
                    href={isFormValid ? url : '#'}
                    target="_blank"
                    className={`flex items-center gap-1 text-xs bg-violet-500 hover:bg-violet-600 px-3 py-1.5 rounded-lg transition-colors ${!isFormValid ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    <ExternalLink className="w-3 h-3" />
                    Voir
                  </a>
                </div>
              </div>

              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-violet-300 break-all">
                {isFormValid ? url : 'Remplis le formulaire pour générer l\'URL...'}
              </div>
            </div>

            {/* Email Généré */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold flex items-center gap-2">
                  <Mail className="w-4 h-4 text-violet-400" />
                  Email à envoyer
                </h2>
              </div>

              {/* Subject */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">Objet</label>
                  <button
                    onClick={() => copyToClipboard(email.subject, 'subject')}
                    disabled={!isFormValid}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {copied === 'subject' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-sm">
                  {isFormValid ? email.subject : '...'}
                </div>
              </div>

              {/* Body */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">Corps du message</label>
                  <button
                    onClick={() => copyToClipboard(email.body, 'body')}
                    disabled={!isFormValid}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {copied === 'body' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    Copier le message
                  </button>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-sm whitespace-pre-wrap max-h-[400px] overflow-y-auto text-gray-300">
                  {isFormValid ? email.body : 'Remplis le formulaire pour générer l\'email...'}
                </div>
              </div>

              {/* Copy All Button */}
              {isFormValid && (
                <button
                  onClick={() => copyToClipboard(`Objet: ${email.subject}\n\n${email.body}`, 'all')}
                  className="w-full mt-4 bg-violet-500 hover:bg-violet-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  {copied === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'all' ? 'Copié !' : 'Copier objet + message'}
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Tips */}
        <div className="mt-8 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-2xl p-6 border border-violet-500/20">
          <h3 className="font-semibold mb-3">💡 Tips pour maximiser les conversions</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• <strong>Personnalise</strong> toujours le premier paragraphe avec un détail spécifique (leur spécialité, un avis récent...)</li>
            <li>• <strong>Envoie le matin</strong> entre 8h et 10h, ou en début d'après-midi vers 14h</li>
            <li>• <strong>Relance après 3-4 jours</strong> si pas de réponse, avec un message plus court</li>
            <li>• <strong>Évite le weekend</strong> pour les indépendants, ils sont souvent en activité</li>
          </ul>
        </div>

      </div>
    </main>
  )
}
