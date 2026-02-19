# Audit SEO Silo 6 : Création de site web

**Date d'audit** : 19 février 2026
**Périmètre** : 5 pages (2 piliers services + 3 articles blog)
**Mot-clé principal du silo** : création site web

---

## Sommaire

1. [Pilier : /creation-site-web](#1-pilier--creation-site-web)
2. [Service : /creation-boutique-en-ligne](#2-service--creation-boutique-en-ligne)
3. [Article : comment-creer-site-visible-google](#3-article--comment-creer-site-visible-google)
4. [Article : cout-site-web-2026](#4-article--cout-site-web-2026)
5. [Article : pourquoi-votre-site-est-lent-performance-web-2026](#5-article--pourquoi-votre-site-est-lent-performance-web-2026)
6. [Matrice de maillage du silo](#6-matrice-de-maillage-du-silo)
7. [Analyse qualité des ancres](#7-analyse-qualité-des-ancres)
8. [Diagnostic global du silo](#8-diagnostic-global-du-silo)
9. [TOP 5 actions prioritaires](#9-top-5-actions-prioritaires)

---

## 1. Pilier : /creation-site-web

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/creation-site-web` | ✅ |
| **Fichier source** | `app/creation-site-web/page.tsx` + `CreationSiteClient.tsx` | — |
| **Title** | `Création de Site Web Optimisé SEO \| Sites Performants – INDHACK` | 🔴 61 car. (max 60) |
| **Meta description** | `Sites WordPress et Next.js ultra-rapides, conçus pour la conversion et le référencement. Design sur-mesure, sécurité maximale. Devis gratuit. ✆ 06 61 13 97 48` | 🔴 157 car. (max 155) |
| **H1** | `Création de site web professionnel` | ✅ |
| **Canonical** | `https://indhack.com/creation-site-web` | ✅ |
| **Mot-clé principal** | création site web | ✅ |

**Score KW on-page** : 5/6
- [x] KW dans URL
- [x] KW dans title
- [x] KW dans H1
- [x] KW dans meta description
- [x] KW dans premier paragraphe
- [ ] Title ≤60 caractères

### B. Structure des titres

```
H1: Création de site web professionnel
  H2: Sites web conçus pour performer
    H3: Performance optimale
    H3: SEO intégré
    H3: Design sur-mesure
    H3: Sécurité maximale
  H2: Mon processus de création
    H3: Phase 1 → Phase 5 (processus en 5 étapes)
  H2: FAQ (8 questions)
  H2: Ces entreprises m'ont fait confiance (témoignages)
  H2: Articles complémentaires
```

### C. Contenu principal

**Type de composant** : Client Component (`"use client"`)

Le pilier présente une offre de création de sites web avec :
- 4 features principales (Performance, SEO, Design, Sécurité)
- Processus en 5 étapes détaillées
- 8 questions FAQ avec schema
- Témoignages clients
- CTA vers contact

**Estimation** : ~1 800 mots (contenu client component)

### D. Maillage interne - Liens sortants

| URL destination | Ancre | Position | Type |
|-----------------|-------|----------|------|
| `/consultant-seo-nice` | Consultante SEO à Nice | Hero | Contextuel |
| `/consultant-seo-paris` | Paris | Section villes | Navigation |
| `/consultant-seo-lyon` | Lyon | Section villes | Navigation |
| `/consultant-seo-marseille` | Marseille | Section villes | Navigation |
| `/consultant-seo-bordeaux` | Bordeaux | Section villes | Navigation |
| `/consultant-seo-toulouse` | Toulouse | Section villes | Navigation |
| `/consultant-seo-cannes` | Cannes | Section villes | Navigation |
| `/blog/comment-creer-site-visible-google` | Comment créer un site visible sur Google | Articles complémentaires | Navigation |
| `/blog/cout-site-web-2026` | Combien coûte un site web en 2026 ? | Articles complémentaires | Navigation |
| `/blog/pourquoi-votre-site-est-lent-performance-web-2026` | Performance web : impact sur votre business | Articles complémentaires | Navigation |
| `/referencement-naturel` | référencement naturel | Corps | Contextuel |
| `/seo-local` | SEO local | Corps | Contextuel |
| `/audit-seo` | audit SEO | Corps | Contextuel |
| `/refonte-site-web` | refonte de site web | Corps | Contextuel |
| `/outils` | outils SEO | Corps | Contextuel |
| `/contact` | Demander un devis | CTA | Action |

**Total liens internes** : 16
**Liens vers articles du silo** : 3 ✅

### E. Liens externes

Aucun lien externe détecté.

### F. Images

| Image | Alt | Format |
|-------|-----|--------|
| Testimonial photos | `Photo [nom]` | Placeholder ou externe |

### G. Schema JSON-LD

```json
{
  "@type": "Service",
  "name": "Création de Site Web Optimisé SEO",
  "provider": { "@type": "Organization", "name": "INDHACK" },
  "areaServed": "France"
}
```

+ FAQPage (8 questions) ✅
+ BreadcrumbList ✅

### H. Diagnostic

| Statut | Élément | Détail |
|--------|---------|--------|
| 🔴 P0 | Title trop long | 61 car. → réduire à 60 |
| 🔴 P0 | Meta description trop longue | 157 car. → réduire à 155 |
| ✅ | Maillage vers articles silo | 3 liens présents |
| ✅ | Maillage vers services | 4 services liés |
| ✅ | Maillage vers villes | 7 villes liées |
| ✅ | FAQ avec schema | 8 questions |
| ⚠️ P1 | Pas de lien vers /creation-boutique-en-ligne | Page sœur non liée |

---

## 2. Service : /creation-boutique-en-ligne

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/creation-boutique-en-ligne` | ✅ |
| **Fichier source** | `app/creation-boutique-en-ligne/page.tsx` + `CreationBoutiqueClient.tsx` | — |
| **Title** | `Création Boutique en Ligne \| E-commerce SEO Optimisé – INDHACK` | 🔴 63 car. (max 60) |
| **Meta description** | `Création de boutique en ligne optimisée SEO. WooCommerce, Shopify, PrestaShop. Sites e-commerce performants et visibles sur Google. Devis gratuit. ✆ 06 61 13 97 48` | 🔴 163 car. (max 155) |
| **H1** | `Création de boutique en ligne` | ✅ |
| **Canonical** | `https://indhack.com/creation-boutique-en-ligne` | ✅ |
| **Mot-clé principal** | création boutique en ligne | ✅ |

**Score KW on-page** : 5/6
- [x] KW dans URL
- [x] KW dans title
- [x] KW dans H1
- [x] KW dans meta description
- [x] KW dans premier paragraphe
- [ ] Title ≤60 caractères

### B. Structure des titres

```
H1: Création de boutique en ligne
  H2: Fonctionnalités e-commerce essentielles
    H3: Catalogue produits optimisé
    H3: Tunnel de conversion fluide
    H3: SEO e-commerce natif
    H3: Analytics & suivi
  H2: Plateformes e-commerce
    H3: WooCommerce
    H3: Shopify
    H3: PrestaShop
  H2: Mon processus e-commerce (6 étapes)
  H2: FAQ (8 questions)
  H2: Articles complémentaires
```

### C. Contenu principal

**Type de composant** : Client Component (`"use client"`)

La page présente l'offre e-commerce avec :
- 4 fonctionnalités clés
- 3 plateformes (WooCommerce, Shopify, PrestaShop) avec avantages de chaque
- Processus en 6 étapes
- 8 questions FAQ avec schema
- CTA vers contact

**Estimation** : ~2 200 mots

### D. Maillage interne - Liens sortants

| URL destination | Ancre | Position | Type |
|-----------------|-------|----------|------|
| `/consultant-seo` | expertise en référencement | Intro | Contextuel |
| `/referencement-naturel` | référencement naturel | Corps | Contextuel |
| `/consultant-seo-nice` | consultante SEO à Nice | Hero | Contextuel |
| `/consultant-seo-paris` | Paris | Section villes | Navigation |
| `/consultant-seo-lyon` | Lyon | Section villes | Navigation |
| `/consultant-seo-marseille` | Marseille | Section villes | Navigation |
| `/consultant-seo-bordeaux` | Bordeaux | Section villes | Navigation |
| `/consultant-seo-toulouse` | Toulouse | Section villes | Navigation |
| `/consultant-seo-cannes` | Cannes | Section villes | Navigation |
| `/seo-local` | SEO local | Corps | Contextuel |
| `/audit-seo` | audit SEO | Corps | Contextuel |
| `/refonte-site-web` | refonte de site | Corps | Contextuel |
| `/etudes-de-cas` | études de cas | Corps | Contextuel |
| `/blog/comment-creer-site-visible-google` | Comment créer un site visible sur Google | Articles | Navigation |
| `/blog/cout-site-web-2026` | Combien coûte un site web en 2026 | Articles | Navigation |
| `/contact` | Demander un devis | CTA | Action |

**Total liens internes** : 16
**Liens vers articles du silo** : 2 ✅

### E. Liens externes

Aucun lien externe détecté.

### F. Schema JSON-LD

```json
{
  "@type": "Service",
  "name": "Création Boutique en Ligne E-commerce",
  "provider": { "@type": "Organization", "name": "INDHACK" }
}
```

+ FAQPage (8 questions) ✅
+ BreadcrumbList ✅

### G. Diagnostic

| Statut | Élément | Détail |
|--------|---------|--------|
| 🔴 P0 | Title trop long | 63 car. → réduire à 60 |
| 🔴 P0 | Meta description trop longue | 163 car. → réduire à 155 |
| ⚠️ P1 | Pas de lien vers /creation-site-web | Page mère non liée directement |
| ⚠️ P1 | Article performance manquant | `pourquoi-votre-site-est-lent` non lié |
| ✅ | Maillage services | 4 services liés |
| ✅ | FAQ schema | 8 questions |

---

## 3. Article : comment-creer-site-visible-google

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/blog/comment-creer-site-visible-google` | ✅ |
| **Fichier source** | `content/blog/comment-creer-site-visible-google.md` | — |
| **Title** | `Comment créer un site Internet visible sur Google en 2026 ?` | ✅ 60 car. |
| **Meta description** | `Découvrez les étapes essentielles pour créer un site web qui attire du trafic Google : technique, contenu, SEO. Guide complet par une consultante SEO.` | ✅ 147 car. |
| **H1** | `Comment créer un site Internet visible sur Google en 2026 ?` | ✅ |
| **Date** | 2026-01-15 | ✅ |
| **Catégorie** | Création Web | ✅ |
| **Image** | `/images/blog/comment-creer-site-visible-google.jpg` | ✅ |

**Score KW on-page** : 6/6 ✅

### B. Structure des titres

```
H1: Comment créer un site Internet visible sur Google en 2026 ?
  H2: Poser les bases techniques
    H3: Choisir la bonne technologie
    H3: Structurer pour le SEO dès le départ
  H2: Créer du contenu qui répond aux intentions de recherche
    H3: Comprendre ce que cherchent vos clients
    H3: Rédiger des pages qui convertissent
  H2: Optimiser la vitesse et l'expérience mobile
  H2: Obtenir vos premiers liens
  H2: Mesurer et ajuster
  H2: Questions fréquentes (4 questions)
  H2: Pour aller plus loin
```

### C. Contenu intégral

> *Le contenu complet a été lu depuis le fichier markdown. Environ 1 600 mots.*

**Thématiques couvertes** :
- Choix de technologie (WordPress vs Next.js)
- Structure SEO dès la conception
- Intention de recherche et contenu
- Performance et mobile
- Link building initial
- Mesure et Analytics

### D. Analyse sémantique

**Champ sémantique couvert** :
- création site web, site internet, visible sur Google
- référencement, SEO, trafic organique
- WordPress, Next.js, technologie
- vitesse, performance, mobile
- contenu, intention de recherche
- liens, backlinks, autorité
- structure, architecture, balises
- analytics, mesure, KPIs

**Densité KW principal** : "site web/internet" ~15 occurrences, "Google" ~10 occurrences

**Questions traitées** :
- Comment créer un site visible sur Google ?
- Quelle technologie choisir ?
- Comment structurer pour le SEO ?
- Comment obtenir des premiers liens ?

### E. Maillage interne - Liens sortants

| URL destination | Ancre | Position |
|-----------------|-------|----------|
| `/creation-site-web` | création de site web | Intro |
| `/referencement-naturel` | référencement naturel | Corps |
| `/outils/audit-seo-gratuit` | outil d'audit SEO gratuit | Corps |
| `/audit-seo` | audit SEO | Corps |
| `/blog/cout-site-web-2026` | Combien coûte un site web en 2026 | Pour aller plus loin |
| `/blog/pourquoi-votre-site-est-lent-performance-web-2026` | Pourquoi votre site est lent | Pour aller plus loin |
| `/blog/checklist-seo-refonte-site` | Checklist SEO refonte de site | Pour aller plus loin |
| `/contact` | contactez-moi | CTA final |

**Total liens internes** : 8 ✅
**Liens vers pilier silo** : 1 (`/creation-site-web`) ✅

### F. FAQ Schema

4 questions :
1. Combien de temps pour qu'un nouveau site apparaisse sur Google ?
2. Faut-il payer Google pour être visible ?
3. WordPress ou Next.js pour le SEO ?
4. Combien coûte un site optimisé SEO ?

### G. Diagnostic

| Statut | Élément | Détail |
|--------|---------|--------|
| 🔴 P0 | Contenu trop court | ~1 600 mots (minimum 2 000) |
| ✅ | Title optimisé | 60 car. exactement |
| ✅ | Meta description | 147 car. |
| ✅ | Lien vers pilier | `/creation-site-web` présent |
| ✅ | Liens vers autres articles silo | 2 articles liés |
| ✅ | FAQ schema | 4 questions |
| ⚠️ P1 | Pas de lien vers boutique | `/creation-boutique-en-ligne` non lié |

---

## 4. Article : cout-site-web-2026

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/blog/cout-site-web-2026` | ✅ |
| **Fichier source** | `content/blog/cout-site-web-2026.md` | — |
| **Title** | `Combien coûte un site web en 2026 ?` | ✅ 36 car. |
| **Meta description** | `Guide complet des tarifs de création de site web en 2026 : site vitrine, e-commerce, sur-mesure. Comprendre les prix et éviter les arnaques.` | ✅ 141 car. |
| **H1** | `Combien coûte un site web en 2026 ?` | ✅ (= title) |
| **Date** | 2026-01-09 | ✅ |
| **Catégorie** | Création Web | ✅ |
| **Image** | `/images/blog/cout-site-web-2026.jpg` | ✅ |

**Score KW on-page** : 6/6 ✅

### B. Structure des titres

```
H1: Combien coûte un site web en 2026 ?
  H2: Les fourchettes de prix en 2026
  H2: Ce qui fait varier le prix
    H3: Le design
    H3: Les fonctionnalités
    H3: Le contenu
    H3: L'optimisation SEO
  H2: Les différentes options
    H3: Option 1 : Le freelance
    H3: Option 2 : L'agence
    H3: Option 3 : Les plateformes DIY
  H2: Les coûts cachés à anticiper
    H3: Hébergement et nom de domaine
    H3: Maintenance
    H3: Marketing et SEO
  H2: Comment éviter les arnaques
    H3: Les signaux d'alerte
    H3: Les questions à poser
  H2: Mon approche chez IndHack
  H2: Ce qu'il faut retenir
  H2: Pour aller plus loin
  H2: Questions fréquentes (4 questions)
```

### C. Contenu intégral

> *Contenu complet lu depuis le fichier markdown. Environ 1 650 mots.*

**Thématiques couvertes** :
- Tarifs création site web par type
- Facteurs de variation de prix (design, fonctionnalités, contenu, SEO)
- Comparatif freelance vs agence vs DIY
- Coûts cachés (hébergement, maintenance, marketing)
- Signaux d'arnaques à éviter
- Questions à poser avant de signer

### D. Analyse sémantique

**Champ sémantique couvert** :
- prix site web, coût, tarif, devis, budget
- site vitrine, e-commerce, sur-mesure
- freelance, agence, prestataire
- design, développement, maintenance
- WordPress, Wix, Shopify
- hébergement, nom de domaine
- SEO, référencement, optimisation

**Densité KW principal** : "coût/prix/tarif" ~20 occurrences, "site web" ~15 occurrences

**Tableaux de données** : 7 tableaux avec chiffres (excellent pour featured snippets)

### E. Maillage interne - Liens sortants

| URL destination | Ancre | Position |
|-----------------|-------|----------|
| `/creation-site-web` | création de site web | Intro |
| `/creation-site-web` | IndHack | Section Mon approche |
| `/blog/pourquoi-votre-site-est-lent-performance-web-2026` | la performance web et son impact business | Corps |
| `/blog/comment-creer-site-visible-google` | Comment créer un site visible sur Google | Pour aller plus loin |
| `/blog/pourquoi-votre-site-est-lent-performance-web-2026` | Pourquoi votre site est lent | Pour aller plus loin |
| `/blog/checklist-seo-refonte-site` | Checklist SEO refonte de site | Pour aller plus loin |
| `/outils/audit-seo-gratuit` | outil d'audit SEO gratuit | FAQ |
| `/creation-site-web` | prestation création de site web | CTA final |
| `/contact` | contactez-moi | CTA final |

**Total liens internes** : 9 ✅
**Liens vers pilier silo** : 3 (`/creation-site-web`) ✅

### F. FAQ Schema

4 questions :
1. Un site à 500 € peut-il être efficace ?
2. Faut-il payer le SEO en plus de la création ?
3. Pourquoi les prix varient-ils autant ?
4. Combien prévoir pour la maintenance annuelle ?

### G. Diagnostic

| Statut | Élément | Détail |
|--------|---------|--------|
| 🔴 P0 | Contenu trop court | ~1 650 mots (minimum 2 000) |
| ✅ | Title optimisé | 36 car. |
| ✅ | Meta description | 141 car. |
| ✅ | Liens vers pilier | 3 liens `/creation-site-web` |
| ✅ | Liens vers articles silo | 2 articles liés |
| ✅ | FAQ schema | 4 questions |
| ⚠️ P1 | Pas de lien boutique | `/creation-boutique-en-ligne` non lié |
| ⚠️ P1 | Title court | Potentiel inexploité (36/60 car.) |

---

## 5. Article : pourquoi-votre-site-est-lent-performance-web-2026

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/blog/pourquoi-votre-site-est-lent-performance-web-2026` | ✅ |
| **Fichier source** | `content/blog/pourquoi-votre-site-est-lent-performance-web-2026.md` | — |
| **Title** | `Site web lent = clients perdus : comment passer de 56 à 93 sur PageSpeed` | 🔴 73 car. (max 60) |
| **Meta description** | `Un site lent vous fait perdre des clients. Comparatif réel PageSpeed : 56/100 (WordPress) vs 93/100 (Next.js). Découvrez comment améliorer vos Core Web Vitals.` | 🔴 159 car. (max 155) |
| **H1** | `Site web lent = clients perdus : comment passer de 56 à 93 sur PageSpeed` | ⚠️ (= title, très long) |
| **Date** | 2026-02-17 | ✅ (récent) |
| **Catégorie** | Performance Web | ✅ |
| **Image** | `/images/blog/checklist-seo-2026.jpg` | ⚠️ Image réutilisée d'un autre article |

**Score KW on-page** : 4/6
- [x] KW dans URL (performance-web)
- [x] KW dans title (site lent, PageSpeed)
- [x] KW dans H1
- [x] KW dans premier paragraphe
- [ ] Title ≤60 caractères
- [ ] Meta description ≤155 caractères

### B. Structure des titres

```
H1: Site web lent = clients perdus : comment passer de 56 à 93 sur PageSpeed
  H2: 1. Ce que Google mesure (et que votre agence ne vous dit pas)
    H3: LCP (Largest Contentful Paint)
    H3: INP (Interaction to Next Paint)
    H3: CLS (Cumulative Layout Shift)
  H2: 2. Le test : mon site vs un concurrent — Les chiffres parlent
    H3: IndHack.com (Next.js sur-mesure) — Mobile
    H3: IndHack.com — Desktop
    H3: Site concurrent (WordPress classique) — Mobile
  H2: 3. Pourquoi la plupart des sites sont lents
    H3: Les thèmes "tout-en-un"
    H3: L'accumulation de plugins
    H3: L'architecture serveur traditionnelle
    H3: Les coûts cachés
  H2: 4. Ce que je fais différemment
  H2: 5. L'impact sur votre business (en euros)
  H2: 6. Comment tester votre site maintenant
  H2: 7. Questions fréquentes (6 questions)
  H2: Pour aller plus loin
```

### C. Contenu intégral

> *Contenu complet lu depuis le fichier markdown. Environ 1 900 mots.*

**Thématiques couvertes** :
- Core Web Vitals (LCP, INP, CLS)
- Comparatif PageSpeed WordPress vs Next.js
- Causes de lenteur (thèmes, plugins, architecture)
- Avantages architecture moderne (pré-build, CDN)
- Impact business de la vitesse
- Guide test PageSpeed

**Points forts** :
- Données réelles et chiffrées (test 17 février 2026)
- Comparaison concrète avec captures
- Sources citées (Google, Search Engine Journal)
- Statistiques business (53% rebond > 3s, 7% conversion/seconde)

### D. Analyse sémantique

**Champ sémantique couvert** :
- site lent, vitesse, performance, PageSpeed
- Core Web Vitals, LCP, INP, CLS
- WordPress, Next.js, architecture
- thèmes, plugins, Elementor, Divi
- conversion, rebond, business
- mobile, mobile-first indexing
- CDN, hébergement, pré-build
- score, test, audit

**Densité KW principal** : "lent/vitesse/performance" ~25 occurrences, "PageSpeed" ~8 occurrences

### E. Maillage interne - Liens sortants

| URL destination | Ancre | Position |
|-----------------|-------|----------|
| `/outils/audit-seo-gratuit` | outil d'audit SEO gratuit | Section 1 |
| `/creation-site-web` | Découvrez mon processus de création | Section 2 |
| `/refonte-site-web` | Une refonte ciblée peut tout changer | Section 3 |
| `/blog/cout-site-web-2026` | le coût d'un site web en 2026 | Section 3 |
| `/referencement-naturel` | référencement naturel | Section 4 |
| `/creation-site-web` | processus de création de site web | Section 4 |
| `/contact` | demandez un devis gratuit | Section 4 |
| `/outils/testeur-visibilite-ia` | Testez si ChatGPT peut trouver votre site | Section 5 |
| `/blog/geo-comment-apparaitre-chatgpt-2026` | comment apparaître dans ChatGPT en 2026 | Section 5 |
| `/outils/audit-seo-gratuit` | outil d'audit SEO gratuit | Section 6 |
| `/consultant-seo-nice` | consultante SEO à Nice | Section 6 |
| `/audit-seo` | audit SEO professionnel | Section 6 |
| `/creation-site-web` | Parlons de votre projet | Section 6 |
| `/contact` | Demandez un devis gratuit | CTA final |
| `/creation-site-web` | services de création de site | CTA final |
| `/blog/cout-site-web-2026` | Combien coûte un site web en 2026 ? | Pour aller plus loin |
| `/blog/comment-creer-site-visible-google` | Comment créer un site visible sur Google | Pour aller plus loin |
| `/blog/geo-comment-apparaitre-chatgpt-2026` | GEO : comment apparaître dans ChatGPT | Pour aller plus loin |
| `/blog/audit-seo-erreurs-qui-coutent-cher` | Les erreurs d'audit SEO qui coûtent cher | Pour aller plus loin |
| `/blog/refonte-site-web-sans-perdre-seo` | Refaire son site sans perdre son SEO | Pour aller plus loin |

**Total liens internes** : 20 ✅ (excellent)
**Liens vers pilier silo** : 4 (`/creation-site-web`) ✅

### F. FAQ Schema

6 questions :
1. Combien coûte un site web performant ?
2. Mon site WordPress peut-il être aussi rapide ?
3. C'est quoi un bon score PageSpeed ?
4. La vitesse est-elle vraiment un facteur de classement Google ?
5. Pourquoi le score mobile est-il plus important ?
6. Combien de temps pour créer un site performant ?

### G. Diagnostic

| Statut | Élément | Détail |
|--------|---------|--------|
| 🔴 P0 | Title trop long | 73 car. → max 60 |
| 🔴 P0 | Meta description trop longue | 159 car. → max 155 |
| 🔴 P0 | Contenu trop court | ~1 900 mots (minimum 2 000) |
| ⚠️ P1 | Image réutilisée | Image `checklist-seo-2026.jpg` d'un autre article |
| ✅ | Maillage excellent | 20 liens internes |
| ✅ | Liens vers pilier | 4 liens `/creation-site-web` |
| ✅ | FAQ riche | 6 questions |
| ✅ | Données chiffrées | Sources citées, comparatif réel |
| ✅ | Cross-linking GEO | Liens vers outils et articles IA |

---

## 6. Matrice de maillage du silo

### Liens entre pages du silo

| Depuis ↓ / Vers → | /creation-site-web | /creation-boutique | comment-creer | cout-site-web | site-lent |
|-------------------|:------------------:|:------------------:|:-------------:|:-------------:|:---------:|
| **/creation-site-web** | — | ❌ | ✅ | ✅ | ✅ |
| **/creation-boutique** | ❌ | — | ✅ | ✅ | ❌ |
| **comment-creer** | ✅ | ❌ | — | ✅ | ✅ |
| **cout-site-web** | ✅ (3x) | ❌ | ✅ | — | ✅ (2x) |
| **site-lent** | ✅ (4x) | ❌ | ✅ | ✅ | — |

**Score cocon** : 13/20 liens possibles = **65%**

### Problèmes identifiés

1. **`/creation-boutique-en-ligne` isolée** : aucun article ne lie vers elle
2. **Relation parent-enfant manquante** : `/creation-site-web` ne lie pas vers `/creation-boutique-en-ligne`
3. **Article performance non lié par boutique** : l'article le plus récent n'est pas lié

---

## 7. Analyse qualité des ancres

### Ancres vers /creation-site-web

| Ancre | Article source | Qualité |
|-------|----------------|---------|
| `création de site web` | comment-creer | ✅ Exacte |
| `IndHack` | cout-site-web | ⚠️ Marque (pas KW) |
| `prestation création de site web` | cout-site-web | ✅ Longue traîne |
| `Découvrez mon processus de création de site web` | site-lent | ✅ Action + KW |
| `processus de création de site web` | site-lent | ✅ KW enrichi |
| `Parlons de votre projet` | site-lent | ⚠️ Générique |
| `services de création de site` | site-lent | ✅ KW |

**Qualité globale** : 5/7 ancres optimisées (71%)

### Ancres manquantes critiques

- Ancre `création boutique en ligne` : **0 occurrence** dans tout le silo
- Ancre `e-commerce SEO` : **0 occurrence**
- Ancre `boutique en ligne` : **0 occurrence**

---

## 8. Diagnostic global du silo

### Points forts

| ✅ | Détail |
|----|--------|
| Structure cohérente | 2 services + 3 articles thématiques |
| Maillage pilier fort | 8 liens entrants vers `/creation-site-web` |
| FAQ rich | 30 questions FAQ au total (8+8+4+4+6) |
| Contenu technique | Données chiffrées, comparatifs, sources |
| Cross-linking | Liens vers outils et autres silos (GEO, audit) |
| Date récent | Article performance du 17/02/2026 |

### Points à améliorer (P1)

| ⚠️ | Détail | Impact |
|----|--------|--------|
| Boutique orpheline | 0 article ne lie vers `/creation-boutique-en-ligne` | Page sous-alimentée |
| Maillage incomplet | Score cocon 65% | Distribution jus suboptimale |
| Ancres génériques | 29% des ancres non optimisées | Perte de signal sémantique |
| Contenu court | 3/3 articles < 2000 mots | Risque ranking |

### Problèmes critiques (P0)

| 🔴 | Détail | Correction |
|----|--------|------------|
| Title /creation-site-web | 61 car. | `Création Site Web Optimisé SEO – INDHACK` (45 car.) |
| Meta /creation-site-web | 157 car. | `Sites ultra-rapides conçus pour convertir et ranker. Design sur-mesure, SEO intégré. Devis gratuit sous 24h. ✆ 06 61 13 97 48` (133 car.) |
| Title /creation-boutique | 63 car. | `Création Boutique en Ligne E-commerce SEO – INDHACK` (52 car.) |
| Meta /creation-boutique | 163 car. | `Boutique e-commerce optimisée SEO : WooCommerce, Shopify, PrestaShop. Tunnel de vente performant. Devis gratuit. ✆ 06 61 13 97 48` (137 car.) |
| Title site-lent | 73 car. | `Site lent = clients perdus : passez de 56 à 93 sur PageSpeed` (60 car.) |
| Meta site-lent | 159 car. | `Un site lent fait fuir vos clients. Comparatif WordPress vs Next.js. Découvrez comment atteindre 90+ sur PageSpeed.` (115 car.) |
| 3 articles < 2000 mots | Tous | Enrichir chaque article de 300-500 mots |

---

## 9. TOP 5 actions prioritaires

### P0 - Critiques (à corriger immédiatement)

| # | Action | Fichier | Effort |
|---|--------|---------|--------|
| 1 | **Raccourcir titles** des 2 pages services et article performance | `page.tsx` (x2), `md` | 15 min |
| 2 | **Raccourcir meta descriptions** des 2 pages services et article performance | `page.tsx` (x2), `md` | 15 min |
| 3 | **Enrichir les 3 articles** à 2000+ mots chacun | `content/blog/*.md` (x3) | 2h |

### P1 - Importants (cette semaine)

| # | Action | Détail | Effort |
|---|--------|--------|--------|
| 4 | **Ajouter liens vers /creation-boutique-en-ligne** | Dans pilier + 3 articles + ancres optimisées | 30 min |
| 5 | **Créer image unique** pour article performance | Remplacer image réutilisée `checklist-seo-2026.jpg` | 20 min |

### Corrections meta suggérées

**Title /creation-site-web** (45 car.) :
```
Création Site Web Optimisé SEO – INDHACK
```

**Meta /creation-site-web** (133 car.) :
```
Sites ultra-rapides conçus pour convertir et ranker. Design sur-mesure, SEO intégré. Devis gratuit sous 24h. ✆ 06 61 13 97 48
```

**Title /creation-boutique-en-ligne** (52 car.) :
```
Création Boutique en Ligne E-commerce SEO – INDHACK
```

**Meta /creation-boutique-en-ligne** (137 car.) :
```
Boutique e-commerce optimisée SEO : WooCommerce, Shopify, PrestaShop. Tunnel de vente performant. Devis gratuit. ✆ 06 61 13 97 48
```

**Title pourquoi-votre-site-est-lent** (60 car.) :
```
Site lent = clients perdus : passez de 56 à 93 sur PageSpeed
```

**Meta pourquoi-votre-site-est-lent** (115 car.) :
```
Un site lent fait fuir vos clients. Comparatif WordPress vs Next.js. Découvrez comment atteindre 90+ sur PageSpeed.
```

---

## Score global du silo

| Critère | Score | Commentaire |
|---------|-------|-------------|
| Métadonnées | 3/10 | 4 titles + 4 metas à corriger |
| Contenu | 6/10 | Qualité OK, longueur insuffisante |
| Maillage | 7/10 | Pilier bien lié, boutique orpheline |
| Schema | 9/10 | FAQ complètes, Service schema |
| Ancres | 7/10 | 71% optimisées |
| **TOTAL** | **6.4/10** | Silo fonctionnel mais métas critiques |

---

*Audit réalisé le 19 février 2026 — Silo 6/10*
