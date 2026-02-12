# Prospection 06 - Système de génération de leads

Système automatisé pour trouver et contacter des entreprises **sans site web** dans les Alpes-Maritimes (06).

## Vue d'ensemble

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  1. SCRAPER     │ ──▶ │  2. KEYWORDS    │ ──▶ │  3. CONTACTS    │
│  Google Maps    │     │  Autocomplete   │     │  CSV/HTML       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
      │                                               │
      └───────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  4. PROSPECTION │
                    │  WhatsApp/Email │
                    └─────────────────┘
```

## Installation

```bash
# Les dépendances sont déjà installées
npm install  # Si nécessaire
```

## Utilisation

### Étape 1 : Scraper Google Maps

```bash
# Mode test (1 seule recherche)
npx ts-node scripts/prospection-06/scraper-gmaps.ts --test

# Scraper une catégorie complète
npx ts-node scripts/prospection-06/scraper-gmaps.ts --category=RESTAURATION

# Scraper une ville spécifique
npx ts-node scripts/prospection-06/scraper-gmaps.ts --category=ARTISANS --city=Nice

# Options complètes
npx ts-node scripts/prospection-06/scraper-gmaps.ts \
  --category=SANTE \
  --subcategory=dentiste \
  --city=Cannes \
  --limit=50 \
  --headless=false  # Mode visible pour debug
```

### Étape 2 : Keywords (optionnel)

```bash
# Récupérer les suggestions Google Autocomplete
npx ts-node scripts/prospection-06/keyword-autocomplete.ts

# Pour une catégorie spécifique
npx ts-node scripts/prospection-06/keyword-autocomplete.ts --category=RESTAURATION --city=Nice
```

### Étape 3 : Générer les contacts

```bash
# Générer les fichiers de contact (CSV, HTML, messages)
npx ts-node scripts/prospection-06/generate-contacts.ts

# Avec un fichier d'entrée spécifique
npx ts-node scripts/prospection-06/generate-contacts.ts --input=prospects-restauration-2026-02-12-sans-site.json

# Limiter le nombre de contacts
npx ts-node scripts/prospection-06/generate-contacts.ts --limit=100 --category=ARTISANS
```

## Catégories disponibles

| Catégorie | Sous-catégories | Volume estimé |
|-----------|-----------------|---------------|
| **RESTAURATION** | restaurant, pizzeria, boulangerie, patisserie, traiteur | ~200 |
| **SANTE** | dentiste, osteopathe, kinesitherapeute, psychologue | ~100 |
| **ARTISANS** | plombier, electricien, serrurier, peintre, carreleur | ~200 |

## Villes couvertes (17)

Nice, Cannes, Antibes, Grasse, Cagnes-sur-Mer, Le Cannet, Saint-Laurent-du-Var, Menton, Vallauris, Mandelieu-la-Napoule, Mougins, Vence, Villeneuve-Loubet, Beausoleil, Roquebrune-Cap-Martin, Carros, La Trinité

## Fichiers générés

Tous les fichiers sont sauvegardés dans `/data/prospection/` :

```
data/prospection/
├── prospects-06-2026-02-12.json          # Tous les résultats
├── prospects-06-2026-02-12.csv           # Export CSV
├── prospects-06-2026-02-12-sans-site.json # Filtrés sans site
├── contacts-06-2026-02-12.json           # Contacts enrichis
├── contacts-06-2026-02-12.csv            # Export pour Excel
├── contacts-06-2026-02-12.html           # Page interactive
└── contacts-06-2026-02-12-messages.txt   # Messages prêts à copier
```

## Page HTML de prospection

Ouvrez le fichier `.html` dans votre navigateur :

- **Recherche** par nom d'entreprise
- **Bouton WhatsApp** : ouvre WhatsApp avec le message pré-rempli
- **Bouton Audit** : ouvre la page de diagnostic personnalisée
- **Classé par catégorie** pour une prospection organisée

## URLs de diagnostic

Format des URLs partagées :

```
https://indhack.com/diagnostic/restaurant?nom=Pizzeria+Da+Luigi&ville=Nice&note=4.7&avis=89
```

Ces URLs personnalisent automatiquement la page d'audit avec :
- Le nom de l'entreprise
- La ville
- La note Google
- Le nombre d'avis

## Templates de messages

Les messages sont adaptés par catégorie :

- **RESTAURATION** : Hook sur les avis clients + visibilité Google
- **SANTE** : Hook professionnel + patients perdus
- **ARTISANS** : Hook urgences + concurrents visibles

Variables utilisées : `{{nom}}`, `{{ville}}`, `{{note}}`, `{{avis}}`, `{{subcategory}}`, `{{url}}`

## Workflow complet

```bash
# 1. Scraper (30min - 2h selon la taille)
npx ts-node scripts/prospection-06/scraper-gmaps.ts --category=RESTAURATION

# 2. Générer les contacts
npx ts-node scripts/prospection-06/generate-contacts.ts

# 3. Ouvrir la page HTML
open data/prospection/contacts-06-*.html

# 4. Cliquer sur "WhatsApp" pour chaque contact
```

## Notes importantes

- **Rate limiting** : Le scraper attend 3-5 secondes entre chaque recherche pour éviter le blocage
- **Anti-détection** : Utilise puppeteer-extra-plugin-stealth
- **Téléphones** : Pas toujours disponibles sur Google Maps, certains contacts n'auront pas de numéro
- **Duplicatas** : Le système déduplique automatiquement par ID (hash nom+adresse)

## Structure des données

```typescript
interface EnrichedContact {
  id: string;           // Hash unique
  name: string;         // Nom de l'entreprise
  category: string;     // RESTAURATION, SANTE, ARTISANS
  subcategory: string;  // pizzeria, dentiste, plombier...
  city: string;         // Ville
  rating: number;       // Note Google (1-5)
  reviewCount: number;  // Nombre d'avis
  phone: string;        // Téléphone
  diagnosticUrl: string; // URL audit personnalisée
  whatsappUrl: string;  // URL WhatsApp avec message
  whatsappMessage: string; // Message complet
  emailSubject: string; // Objet email
  emailBody: string;    // Corps email
  status: 'new' | 'contacted' | 'responded' | 'converted';
}
```

## Dépannage

**Le scraper ne trouve rien ?**
- Vérifiez votre connexion internet
- Essayez `--headless=false` pour voir ce qui se passe
- Google peut bloquer après trop de requêtes, attendez 1h

**Build échoue ?**
```bash
npm run build
```
Vérifiez qu'il n'y a pas d'erreurs TypeScript.

**Pas de téléphones ?**
Normal - tous les commerces n'affichent pas leur téléphone sur Google Maps. Utilisez les emails pour ces contacts.
