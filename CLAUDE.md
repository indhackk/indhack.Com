# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Development Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Build & Deploy
npm run build        # Build for production (runs postbuild scripts automatically)
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint

# Google Indexing (requires .env.local credentials)
npm run index          # Smart indexing - submit changed pages
npm run index:status   # Check indexing status
npm run index:priority # Priority indexing for important pages
npm run index:force    # Force reindex all pages via Google API
npm run turbo          # Turbo indexing via IndexNow
npm run turbo:all      # Force reindex all pages via IndexNow
```

**Important**: Always run `npm run build` after modifications to verify no errors.

---

## Architecture Overview

### Stack
- **Framework**: Next.js 14+ (App Router) with static site generation (SSG)
- **Styling**: Tailwind CSS with custom sage green palette
- **Deployment**: Vercel
- **CMS**: Keystatic for content management

### Directory Structure

```
app/                           # Next.js App Router pages
├── page.tsx                   # Homepage
├── layout.tsx                 # Root layout with fonts, analytics
├── globals.css                # Global styles + Tailwind
├── blog/
│   ├── page.tsx               # Blog listing
│   └── [slug]/page.tsx        # Dynamic blog post pages
├── outils/                    # SEO tools (audit, testeur IA, etc.)
├── consultant-seo-[ville]/    # ~18 city landing pages
└── api/                       # API routes (indexnow, contact, etc.)

components/                    # Reusable React components
├── Breadcrumb.tsx             # Breadcrumb with JSON-LD
├── MegaFooter.tsx             # Site-wide footer with internal links
├── NavbarOptimized.tsx        # Main navigation
├── templates/                 # Page templates for services/cities
└── ui/                        # shadcn/ui components

content/
└── blog/                      # Markdown blog posts (.md files)

lib/
├── blog.ts                    # Blog post parsing (gray-matter)
├── cities-data.ts             # City data for local SEO pages
├── city-neighbors.ts          # City proximity relationships
└── diagnostic-data.ts         # Diagnostic tool data

scripts/                       # Build & automation scripts
├── smart-indexing.js          # Google Indexing API integration
├── turbo-indexing.js          # IndexNow protocol
├── generate-city-pages.js     # City page generator
└── optimize-blog-images.mjs   # Image optimization
```

### Key Patterns

**Blog Posts**: Markdown files in `content/blog/` with frontmatter (title, description, date, keywords, category, image). Parsed by `lib/blog.ts`, rendered by `app/blog/[slug]/page.tsx`.

**City Pages**: Static pages generated from `lib/cities-data.ts`. Each city links to neighboring cities via `lib/city-neighbors.ts`.

**JSON-LD Schemas**: Automatically injected via components (BreadcrumbSchema, BlogPosting in blog pages). Never write schema in markdown content.

### Fonts (tailwind.config.js)

| Token | Font | Usage |
|-------|------|-------|
| `heading` | Space Grotesk | H1, H2, H3, H4 |
| `body` / `sans` | Inter | Body text, paragraphs |

### Brand Colors (tailwind.config.js)

| Token | Hex | Usage |
|-------|-----|-------|
| `sauge` | #2E5E4E | Primary brand color, links, CTAs (WCAG AA) |
| `sauge-light` | #8FBFAA | Sauge clair pour fonds sombres |
| `ink` | #2A3830 | Main text |
| `soft` | #3D4D46 | Secondary text (WCAG AA) |
| `line` | #E4EBE7 | Borders |
| `accent` | #D4A853 | Gold accent for CTAs |
| `accent-hover` | #C49A47 | Hover state for accent |
| `fond-sombre` | #394843 | Dark backgrounds |
| `fond-clair` | #FAFBFA | Light backgrounds |

---

## 1. Fichier de référence SEO

> Ce fichier est la source de vérité pour tout travail sur le site IndHack.
> Lis-le en entier AVANT de toucher à quoi que ce soit.

IndHack est le site vitrine + blog + outils SEO d'Indiana Aflalo, consultante SEO freelance basée à Nice.
Le site génère ~120 pages statiques (SSG) au build.

### Structure des URLs

```
/                           → Homepage
/consultant-seo             → Page mère Expertise
/audit-seo                  → Service
/referencement-naturel      → Service
/seo-local                  → Service (page mère SEO local)
/creation-site-web          → Service
/refonte-site-web           → Service
/creation-boutique-en-ligne → Service
/consultant-seo-nice        → Page ville (fille de /seo-local)
/consultant-seo-paris       → Page ville
/consultant-seo-[ville]     → ~18 pages villes
/outils                     → Page mère Outils
/outils/audit-seo-gratuit         → Outil
/outils/testeur-visibilite-ia     → Outil (GEO)
/outils/simulateur-visibilite-locale → Outil
/outils/generateur-robots-txt     → Outil
/outils/generateur-schema-json-ld → Outil
/blog                       → Liste articles
/blog/[slug]                → Articles
/a-propos                   → À propos
/contact                    → Contact
/faq                        → FAQ
/etudes-de-cas              → Études de cas
/mentions-legales           → Légal
/confidentialite            → Légal
/cgv                        → Légal
```

---

## 2. Règles typographiques françaises (OBLIGATOIRE)

### Majuscules dans les titres

En français, contrairement à l'anglais, on ne met PAS de majuscule à chaque mot.

**Règle** : majuscule uniquement au premier mot + noms propres.

```
❌ "Comment Voler Les Clients De Vos Concurrents Sur Google Maps"
✅ "Comment voler les clients de vos concurrents sur Google Maps"

❌ "Le Vrai Coût D'un Site Mal Conçu"
✅ "Le vrai coût d'un site mal conçu"

❌ "Pourquoi Votre Site Est Lent"
✅ "Pourquoi votre site est lent"
```

Cette règle s'applique à :
- Tous les H1, H2, H3, H4
- Les `<title>` et `og:title`
- Les ancres du sommaire
- Les titres de cartes dans les sections "Articles complémentaires"
- Les breadcrumbs

### Autres règles typo françaises

- Espace insécable avant : ; ! ? » et après «
- Guillemets français « » et non "" (dans le contenu visible)
- Les nombres : espace comme séparateur de milliers (1 000, 10 000)
- Les pourcentages : 53 % (avec espace)

---

## 3. Architecture SEO : le cocon sémantique

### Principe

Le site est organisé en **cocon sémantique** : une structure en silo thématique où chaque page a un rôle précis dans la hiérarchie.

```
HOMEPAGE (/)
├── PAGE MÈRE : /consultant-seo
│   └── Pages filles : expertises (/audit-seo, /referencement-naturel, etc.)
├── PAGE MÈRE : /seo-local
│   └── Pages filles : villes (/consultant-seo-nice, /consultant-seo-paris, etc.)
├── PAGE MÈRE : /creation-site-web
│   └── Pages filles : /refonte-site-web, /creation-boutique-en-ligne
├── PAGE MÈRE : /outils
│   └── Pages filles : chaque outil (/outils/audit-seo-gratuit, etc.)
├── PAGE MÈRE : /blog
│   └── Pages filles : chaque article (/blog/[slug])
└── Pages support : /a-propos, /contact, /faq, /mentions-legales
```

### Rôle de chaque type de page

| Type | Rôle SEO | Exemple |
|------|----------|---------|
| Homepage | Distribue le "jus SEO" vers les pages mères. Cible le mot-clé le plus large ("consultante SEO freelance") | `/` |
| Page mère | Concentre l'autorité sur un thème. Cible un mot-clé moyen-traîne ("SEO local", "création site web") | `/seo-local` |
| Page fille | Cible un mot-clé longue-traîne précis ("consultant SEO Nice", "audit SEO gratuit") | `/consultant-seo-nice` |
| Article blog | Attire du trafic informationnel, distribue du jus vers les pages services | `/blog/[slug]` |
| Outil | Lead magnet, attire des backlinks, distribue du jus vers les services liés | `/outils/[slug]` |

---

## 4. Maillage interne — LES RÈGLES D'OR

Le maillage interne est LE levier SEO le plus important sur ce site. C'est ce qui permet à Google de comprendre la structure et de distribuer l'autorité entre les pages.

### Principes fondamentaux

1. **Chaque page fille DOIT lier vers sa page mère** (et inversement)
2. **Les pages sœurs se lient entre elles** (articles entre eux, outils entre eux)
3. **Les articles blog DOIVENT lier vers les pages services** (c'est leur rôle principal)
4. **Les articles DOIVENT lier vers les outils** (conversion)
5. **JAMAIS de lien orphelin** : chaque page doit recevoir au moins 3 liens internes

### Matrice de maillage obligatoire par type de contenu

#### Article de blog → DOIT contenir :

| Lien vers | Minimum | Comment l'intégrer |
|-----------|---------|-------------------|
| Page service principale liée au sujet | 1-2 liens | Naturellement dans le corps du texte |
| Outils pertinents | 1-2 liens | "Testez vous-même avec notre [outil]" |
| Autres articles blog | 2-3 liens | Dans le texte + section "Pour aller plus loin" en fin d'article |
| /contact ou CTA | 1 lien | En conclusion |
| Page ville SI pertinent | 0-1 lien | Seulement si le contexte est local |

**Total minimum : 7-10 liens internes par article.**

#### Page service → DOIT contenir :

| Lien vers | Minimum |
|-----------|---------|
| Homepage | 1 (breadcrumb suffit) |
| Autres services complémentaires | 2-3 |
| Articles blog liés | 2-3 |
| Outils liés | 1-2 |
| /contact | 1 |

#### Page ville → DOIT contenir :

| Lien vers | Minimum |
|-----------|---------|
| /seo-local (page mère) | 1 |
| /consultant-seo | 1 |
| 2-3 villes voisines | 2-3 |
| Articles blog SEO local | 2-3 |
| Outils (simulateur local, audit) | 1-2 |

### Règles des ancres de lien

```
❌ "Cliquez ici"
❌ "En savoir plus"
❌ "Lire l'article"
✅ "notre outil d'audit SEO gratuit"
✅ "guide complet Google Business Profile"
✅ "consultante SEO à Nice"
✅ "stratégie de référencement naturel"
```

- L'ancre doit contenir le mot-clé cible de la page de destination
- Varier les ancres : ne pas toujours utiliser la même formulation
- L'ancre doit être naturelle dans la phrase — jamais forcée

### Ce qu'il ne faut JAMAIS faire

```
❌ Mettre des liens vers des pages villes dans l'intro d'un article non-local
   (Ex : "À Nice, Paris ou Bordeaux" avec liens → bourrage)
❌ Lier la homepage avec l'ancre "Consultant SEO freelance"
   (Le mot-clé de la homepage est ciblé par la homepage elle-même)
❌ Mettre un lien vers un article/page qui N'EXISTE PAS (404)
   → Toujours vérifier que le slug existe avant de créer un lien
❌ Avoir un article avec moins de 5 liens internes
❌ Avoir un article sans lien vers au moins 1 outil
❌ Avoir un article sans lien vers au moins 1 autre article
```

---

## 5. Standards de contenu blog

### Structure obligatoire d'un article

```
1. Title tag (50-60 caractères, mot-clé principal en début)
2. Meta description (140-155 caractères, avec CTA implicite)
3. H1 (différent du title, complémentaire)
4. Chapô / Lead (1-2 phrases d'accroche, italique, bordure gauche)
5. Image hero (obligatoire, format WebP, avec alt descriptif)
6. Sommaire (liens d'ancrage vers les H2)
7. Corps avec H2 > H3 > H4 (hiérarchie respectée)
8. Encarts/blockquotes (pour les stats clés, citations)
9. Liens internes (minimum 7-10, répartis naturellement)
10. Section "Pour aller plus loin" (2-3 liens vers articles existants)
11. FAQ avec schema FAQPage (3-6 questions)
12. Tags/mots-clés en bas d'article
13. CTA final (audit gratuit + contact)
14. Section "Articles complémentaires" (3 cartes vers articles EXISTANTS)
```

### Longueur minimale

| Type d'article | Mots minimum | Idéal |
|---------------|-------------|-------|
| Article informationnel | 2 000 | 2 500-3 000 |
| Guide complet | 3 000 | 4 000-5 000 |
| Article comparatif | 2 500 | 3 000-4 000 |
| Article local | 1 500 | 2 000-2 500 |

Un article de moins de 1 500 mots ne rankera pas en 2026 sur des mots-clés compétitifs.

### Schema JSON-LD obligatoire par article

Chaque article DOIT avoir dans le `<head>` (géré par le composant, PAS dans le contenu markdown) :

1. **BlogPosting** ou **Article** — avec headline, description, datePublished, dateModified, author, publisher
2. **FAQPage** — si l'article contient une FAQ
3. **BreadcrumbList** — UN SEUL (pas de doublon)

**ATTENTION** : ne JAMAIS écrire de `<script type="application/ld+json">` dans le contenu markdown. Le schema est injecté automatiquement par le composant de page. Si du JSON-LD apparaît en texte brut dans l'article rendu, c'est un bug.

### Title tag — Formules qui fonctionnent

```
[Mot-clé principal] : [bénéfice ou chiffre] ([année])
→ "Site web lent = clients perdus : comment passer à 93 sur PageSpeed"

[Question] + [promesse]
→ "Pourquoi votre site est invisible sur Google (et comment y remédier)"

[Chiffre] + [mot-clé] + [angle unique]
→ "7 techniques SEO local pour dominer Google Maps en 2026"
```

Longueur : 50-60 caractères max. Google tronque au-delà.

---

## 6. SEO technique

### Core Web Vitals — Objectifs

| Métrique | Objectif | Seuil Google |
|----------|----------|-------------|
| LCP (Largest Contentful Paint) | < 2.0s | < 2.5s |
| INP (Interaction to Next Paint) | < 150ms | < 200ms |
| CLS (Cumulative Layout Shift) | 0 | < 0.1 |
| FCP (First Contentful Paint) | < 1.0s | < 1.8s |
| Score PageSpeed Mobile | 90+ | 50+ (minimum) |

### Images

- Format : **WebP** uniquement (Next.js Image le gère automatiquement)
- Toujours fournir `width`, `height` et `alt` descriptif
- Image hero : `priority={true}` et `fetchPriority="high"`
- Images dans le corps : `loading="lazy"` (par défaut)
- Nommage fichier : `mot-cle-descriptif-YYYY-MM-DD.webp`

### Balises meta obligatoires par page

```html
<title>                — 50-60 car., mot-clé en début
<meta description>     — 140-155 car., incitatif
<link canonical>       — URL canonique propre (sans trailing slash sauf homepage)
<meta og:title>        — Peut différer légèrement du title
<meta og:description>  — Peut différer de la meta description
<meta og:image>        — Image 1200x630 minimum
<meta og:type>         — "article" pour blog, "website" pour pages
<meta twitter:card>    — "summary_large_image"
```

### Robots / Crawlers IA (2026)

Le fichier `robots.txt` doit autoriser les crawlers IA importants :

```
# Crawlers IA à autoriser
User-agent: GPTBot          # OpenAI/ChatGPT
User-agent: ChatGPT-User    # ChatGPT Browse
User-agent: Claude-Web       # Anthropic/Claude
User-agent: PerplexityBot   # Perplexity
User-agent: Applebot-Extended # Apple Intelligence

# Crawlers IA à bloquer (scraping sans attribution)
User-agent: CCBot            # Common Crawl
User-agent: Google-Extended  # Gemini training (pas search)
```

---

## 7. GEO — Generative Engine Optimization (2026)

Le GEO est le nouveau SEO pour les moteurs de recherche IA (ChatGPT, Perplexity, Claude, Gemini). IndHack se positionne comme pionnière sur ce marché en France.

### Qu'est-ce que le GEO ?

Les utilisateurs posent de plus en plus de questions aux IA au lieu de chercher sur Google. Si votre site est cité par ChatGPT quand quelqu'un demande "meilleur consultant SEO à Nice", vous gagnez un client sans même apparaître dans Google.

### Comment les IA choisissent quelles sources citer

1. **Autorité du domaine** — backlinks, ancienneté, mentions
2. **Qualité du contenu** — profondeur, sources citées, données originales
3. **Données structurées** — schema JSON-LD bien implémenté
4. **Fraîcheur** — contenu mis à jour récemment
5. **Crawlabilité** — le site doit être rapide et accessible aux bots IA
6. **Citations et mentions** — être mentionné sur d'autres sites de confiance
7. **Contenu factuel** — chiffres, études, données vérifiables

### Optimisations GEO à appliquer

#### Sur chaque page / article :

- **Répondre à des questions précises** dans le contenu (les IA adorent le format Q&R)
- **Citer des sources** avec des données chiffrées (études, statistiques)
- **Utiliser un ton d'expert** — première personne, expérience réelle, cas concrets
- **Inclure des listes structurées** pour les processus étape par étape
- **Schema JSON-LD riche** : Person, Organization, FAQPage, HowTo, Article
- **dateModified** toujours à jour — les IA privilégient le contenu frais
- **Contenu E-E-A-T** (Experience, Expertise, Authoritativeness, Trustworthiness)

#### Sur le site globalement :

- **Page /a-propos complète** avec bio, photo, credentials, liens LinkedIn
- **Schema Person** sur l'auteur avec jobTitle, worksFor, sameAs
- **Permettre le crawl** par GPTBot, PerplexityBot etc. dans robots.txt
- **Site rapide** — les bots IA ont un budget de crawl limité
- **Contenu unique et original** — les IA détectent et ignorent le contenu générique

### Testeur de visibilité IA

IndHack a un outil dédié : `/outils/testeur-visibilite-ia`
Cet outil teste si un site est visible par 4 catégories d'IA avec 8 crawlers différents.
Toujours lier vers cet outil quand on parle de GEO ou de visibilité IA.

---

## 8. SEO local — Spécificités

### Pages villes

Chaque page `/consultant-seo-[ville]` DOIT contenir :
- H1 avec le nom de la ville et le code postal
- Mention de la population
- Quartiers/zones d'activité locaux
- FAQ locale (schema FAQPage)
- Lien vers /seo-local (page mère)
- Liens vers 3-5 villes voisines
- Liens vers articles blog pertinents
- Intégration de l'outil audit SEO (PageSpeed en live)
- Schema LocalBusiness ou ProfessionalService

### Google Business Profile

Quand un article parle de GBP/Google Maps/SEO local, toujours lier vers :
- `/seo-local`
- `/outils/simulateur-visibilite-locale`
- L'article GBP guide complet s'il existe

---

## 9. Checklist avant chaque déploiement

### Pour un nouvel article :

- [ ] Title tag ≤ 60 caractères, mot-clé en début
- [ ] Meta description 140-155 car.
- [ ] H1 différent du title
- [ ] Image hero en WebP avec alt
- [ ] Minimum 2 000 mots
- [ ] Minimum 7 liens internes dont :
  - [ ] 1-2 vers pages services
  - [ ] 1-2 vers outils
  - [ ] 2-3 vers autres articles EXISTANTS
  - [ ] 1 vers /contact ou CTA
- [ ] AUCUN lien vers une URL qui n'existe pas (vérifier les slugs)
- [ ] FAQ avec schema FAQPage (3-6 questions)
- [ ] Tags en bas d'article
- [ ] Section "Articles complémentaires" (3 articles EXISTANTS)
- [ ] Schema Article + BreadcrumbList (1 seul, pas de doublon)
- [ ] Pas de schema JSON-LD en texte brut dans le contenu
- [ ] Conventions typo françaises respectées (majuscules, guillemets)
- [ ] `npm run build` passe sans erreur

### Pour une modification :

- [ ] Vérifier que les liens internes ajoutés pointent vers des pages existantes
- [ ] Vérifier que les ancres de liens contiennent des mots-clés pertinents
- [ ] Mettre à jour dateModified dans le schema
- [ ] `npm run build` passe sans erreur

---

## 10. Mapping thématique des liens

Ce tableau indique quel article/page devrait lier vers quoi.

### Liens depuis les articles blog :

| Article | DOIT lier vers |
|---------|---------------|
| Article SEO local / Google Maps | /seo-local, /outils/simulateur-visibilite-locale, /outils/audit-seo-gratuit, articles GBP et SEO local |
| Article GBP | /seo-local, /outils/simulateur-visibilite-locale, articles Google Maps |
| Article performance web | /creation-site-web, /refonte-site-web, /outils/audit-seo-gratuit, /audit-seo |
| Article GEO / IA | /outils/testeur-visibilite-ia, /referencement-naturel, /outils/generateur-robots-txt |
| Article audit SEO | /audit-seo, /outils/audit-seo-gratuit, /referencement-naturel |
| Article création site | /creation-site-web, /refonte-site-web, articles performance |

### Liens depuis les pages outils :

| Outil | DOIT lier vers |
|-------|---------------|
| Testeur visibilité IA | /referencement-naturel, article GEO, /outils/generateur-robots-txt |
| Audit SEO gratuit | /audit-seo, /referencement-naturel, article audit |
| Simulateur local | /seo-local, articles SEO local, /consultant-seo-nice |
| Générateur robots.txt | article GEO, /outils/testeur-visibilite-ia |
| Générateur schema | /audit-seo, /creation-site-web |

---

## 11. Couleurs par catégorie d'article

| Catégorie | Couleur Tailwind | Usage |
|-----------|-----------------|-------|
| SEO Local | sauge (couleur brand) | Tag, bordures, liens |
| Performance Web | emerald | Tag, bordures, liens |
| GEO / IA | violet/purple | Tag, bordures, liens |
| Création web | blue | Tag, bordures, liens |
| Audit SEO | amber/orange | Tag, bordures, liens |

---

## 12. Fichiers importants

```
app/blog/[slug]/page.tsx        → Template article dynamique
app/blog/page.tsx               → Liste articles
content/blog/                   → Articles markdown (.md)
components/                     → Composants réutilisables
public/images/blog/             → Images des articles
lib/blog.ts                     → Parsing des articles (gray-matter)
lib/cities-data.ts              → Données des pages villes
next.config.mjs                 → Config Next.js (redirections, headers)
tailwind.config.js              → Config Tailwind avec couleurs custom
```

---

## 13. Rappels critiques

1. **TOUJOURS vérifier qu'un slug existe avant de créer un lien interne**
2. **TOUJOURS respecter les majuscules françaises dans les titres**
3. **JAMAIS de schema JSON-LD en texte brut dans le contenu d'un article**
4. **JAMAIS de BreadcrumbList en double**
5. **JAMAIS d'article sans liens vers outils ET autres articles**
6. **TOUJOURS lancer `npm run build` après modification**
7. **Les articles "complémentaires" en bas de page doivent pointer vers des articles EXISTANTS uniquement**
8. **Minimum 2 000 mots par article sinon ça ne ranke pas**
9. **Le score PageSpeed mobile doit rester au-dessus de 90**
10. **Chaque article doit avoir une FAQ avec schema FAQPage**
