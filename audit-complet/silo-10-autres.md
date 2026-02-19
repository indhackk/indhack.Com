# Audit SEO Silo 10 : Pages Utilitaires

**Date d'audit** : 19 février 2026
**Périmètre** : 9 pages utilitaires et légales
**Note** : Ces pages sont essentielles à l'architecture du site mais ne visent pas de positionnement SEO compétitif.

---

## Sommaire

1. [Inventaire des pages](#1-inventaire-des-pages)
2. [Tableau récapitulatif des métadonnées](#2-tableau-récapitulatif-des-métadonnées)
3. [Analyse page par page](#3-analyse-page-par-page)
4. [Maillage interne](#4-maillage-interne)
5. [Diagnostic global](#5-diagnostic-global)
6. [Actions prioritaires](#6-actions-prioritaires)

---

## 1. Inventaire des pages

| # | Page | URL | Type | Indexation |
|---|------|-----|------|------------|
| 1 | Homepage | `/` | Stratégique | ✅ index |
| 2 | À propos | `/a-propos` | E-E-A-T | ✅ index |
| 3 | Contact | `/contact` | Conversion | ✅ index |
| 4 | FAQ | `/faq` | Conversion | ✅ index |
| 5 | Études de cas | `/etudes-de-cas` | Conversion | ✅ index |
| 6 | Blog listing | `/blog` | Navigation | ✅ index |
| 7 | Mentions légales | `/mentions-legales` | Légal | ✅ index |
| 8 | Confidentialité | `/confidentialite` | Légal | ❌ noindex |
| 9 | CGV | `/cgv` | Légal | ❌ noindex |

---

## 2. Tableau récapitulatif des métadonnées

### Titles

| Page | Title | Longueur | Statut |
|------|-------|----------|--------|
| Homepage | `Consultante SEO & Experte Référencement Naturel` | 49 car. | ✅ |
| À propos | `À Propos` | 9 car. | ⚠️ Court |
| Contact | `Contact` | 7 car. | ⚠️ Court |
| FAQ | `FAQ - Questions Fréquentes SEO` | 31 car. | ✅ |
| Études de cas | `Études de Cas SEO \| Résultats Clients Concrets – INDHACK` | 57 car. | ✅ |
| Blog | *(Pas de metadata export)* | — | ⚠️ À vérifier |
| Mentions légales | `Mentions Légales` | 17 car. | ✅ |
| Confidentialité | `Politique de Confidentialité` | 29 car. | ✅ |
| CGV | `Conditions Générales de Vente` | 30 car. | ✅ |

### Meta descriptions

| Page | Longueur | Statut |
|------|----------|--------|
| Homepage | 155 car. | ✅ |
| À propos | 176 car. | 🔴 Trop long |
| Contact | 148 car. | ✅ |
| FAQ | 144 car. | ✅ |
| Études de cas | 155 car. | ✅ |
| Blog | *(Pas définie)* | ⚠️ Manquante |
| Mentions légales | 114 car. | ✅ |
| Confidentialité | 138 car. | ✅ |
| CGV | 119 car. | ✅ |

---

## 3. Analyse page par page

### 3.1 Homepage (`/`)

**Type** : Page stratégique principale

| Élément | Valeur | Statut |
|---------|--------|--------|
| Title | `Consultante SEO & Experte Référencement Naturel` | ✅ 49 car. |
| Meta description | `Consultante SEO freelance spécialisée en référencement naturel, SEO local et création de site web. Audit SEO gratuit. Nice & toute la France. ✆ 06 61 13 97 48` | ✅ 155 car. |
| H1 | *(Défini dans Hero component)* | ✅ |
| Canonical | `https://indhack.com` | ✅ |

**Schema JSON-LD** :
- ✅ Organization
- ✅ LocalBusiness
- ✅ WebSite
- ✅ FAQPage (6 questions)

**Maillage sortant** :
- 4 liens vers outils (audit, testeur IA, schema, robots)
- 4 liens vers articles
- 4 liens vers villes (Nice, Cannes, Sophia, Antibes)
- Liens vers tous les services via ServicesSection

**Diagnostic** :
| ✅ | Schema complet (Organization + LocalBusiness + WebSite + FAQ) |
| ✅ | Maillage riche vers tous les silos |
| ✅ | FAQPage avec 6 questions |
| ✅ | CTA vers audit et contact |

---

### 3.2 À propos (`/a-propos`)

**Type** : Page E-E-A-T (essentielle pour la crédibilité)

| Élément | Valeur | Statut |
|---------|--------|--------|
| Title | `À Propos` | ⚠️ 9 car. (trop court) |
| Meta description | `Découvrez mon parcours : consultante SEO indépendante spécialisée en référencement naturel, audit technique et stratégie digitale. Accompagnement personnalisé pour PME et startups.` | 🔴 176 car. |
| H1 | *(Défini dans AboutContent)* | ✅ |
| Canonical | `https://indhack.com/a-propos` | ✅ |

**Schema JSON-LD** :
```json
{
  "@type": "Person",
  "name": "Indiana Aflalo",
  "jobTitle": "Consultante SEO",
  "worksFor": { "@type": "Organization", "name": "IndHack" },
  "knowsAbout": ["SEO", "Google Business Profile", "Next.js", "WordPress"],
  "hasCredential": [{ "name": "Google Analytics 4 Certification" }],
  "sameAs": ["https://www.linkedin.com/in/indianaaflalo"]
}
```

**Diagnostic** :
| 🔴 P0 | Meta description trop longue | 176 car. → 155 max |
| ⚠️ P1 | Title trop court | `À Propos` → enrichir |
| ✅ | Schema Person complet | E-E-A-T renforcé |
| ✅ | Credentials et certifications | Confiance |
| ✅ | LinkedIn (sameAs) | Autorité |

---

### 3.3 Contact (`/contact`)

**Type** : Page de conversion

| Élément | Valeur | Statut |
|---------|--------|--------|
| Title | `Contact` | ⚠️ 7 car. (trop court) |
| Meta description | `Contactez Indiana Aflalo, consultante SEO experte. Devis gratuit sous 24h. Audit SEO offert pour votre projet de référencement naturel ou création de site.` | ✅ 148 car. |
| H1 | `Parlons de votre projet` | ✅ |
| Canonical | `https://indhack.com/contact` | ✅ |

**Fonctionnalités** :
- Formulaire avec validation
- Web3Forms (client-side) + FormSubmit (fallback API)
- Champs : nom, email, téléphone, entreprise, site web, budget, message

**Diagnostic** :
| ⚠️ P1 | Title trop court | `Contact` → enrichir |
| ✅ | Formulaire sécurisé | Validation + sanitization |
| ✅ | Double envoi (Web3Forms + fallback) | Robustesse |
| ✅ | CTA numéro de téléphone | 06 61 13 97 48 |

---

### 3.4 FAQ (`/faq`)

**Type** : Page de conversion + SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| Title | `FAQ - Questions Fréquentes SEO` | ✅ 31 car. |
| Meta description | `Réponses à vos questions sur le référencement naturel, l'audit SEO, la création de site web et le community management. Consultante SEO indépendante.` | ✅ 144 car. |
| H1 | *(Défini dans FAQContent)* | ✅ |
| Canonical | `https://indhack.com/faq` | ✅ |

**Schema JSON-LD** :
- FAQPage avec 5 questions
  1. Combien coûte une prestation SEO ?
  2. Combien de temps pour voir des résultats SEO ?
  3. Garantissez-vous la première position Google ?
  4. Quelle différence entre SEO et SEA ?
  5. Travaillez-vous à distance ou uniquement localement ?

**Diagnostic** :
| ✅ | FAQPage schema | 5 questions |
| ✅ | Questions business-oriented | Conversion |
| ⚠️ P2 | Peut être enrichie | Ajouter plus de questions |

---

### 3.5 Études de cas (`/etudes-de-cas`)

**Type** : Page de preuve sociale

| Élément | Valeur | Statut |
|---------|--------|--------|
| Title | `Études de Cas SEO \| Résultats Clients Concrets – INDHACK` | ✅ 57 car. |
| Meta description | `Découvrez les résultats SEO obtenus pour mes clients : trafic multiplié, leads qualifiés, positions Google. Études de cas détaillées et chiffrées. ✆ 06 61 13 97 48` | ✅ 155 car. |
| H1 | *(Défini dans EtudesDeCasClient)* | ✅ |
| Canonical | `https://indhack.com/etudes-de-cas` | ✅ |

**Schema JSON-LD** :
- ServiceSchema (via composant)

**Diagnostic** :
| ✅ | Métadonnées optimisées | |
| ✅ | Numéro de téléphone dans meta | CTA immédiat |
| ⚠️ P2 | Ajouter des données structurées Review | Renforcer la preuve sociale |

---

### 3.6 Blog listing (`/blog`)

**Type** : Page de navigation / hub blog

| Élément | Valeur | Statut |
|---------|--------|--------|
| Title | *(Non défini - default Next.js)* | ⚠️ À ajouter |
| Meta description | *(Non définie)* | ⚠️ À ajouter |
| H1 | `Conseils d'une consultante SEO pour votre croissance` | ✅ |
| Canonical | *(Non défini)* | ⚠️ À ajouter |

**Structure** :
- Affichage de tous les articles via `getAllPosts()`
- Filtres par catégorie (non fonctionnels - boutons décoratifs)
- Cards avec image, date, catégorie, titre, description

**Diagnostic** :
| 🔴 P0 | Pas de metadata définie | Ajouter title + description + canonical |
| ⚠️ P1 | Filtres non fonctionnels | Les boutons de catégorie ne filtrent pas |
| ✅ | H1 avec mots-clés | "consultante SEO" + "croissance" |
| ✅ | Breadcrumb | Présent |

---

### 3.7 Mentions légales (`/mentions-legales`)

**Type** : Page légale obligatoire

| Élément | Valeur | Statut |
|---------|--------|--------|
| Title | `Mentions Légales` | ✅ 17 car. |
| Meta description | `Mentions légales du site indhack.com édité par Indiana Aflalo, consultante SEO et experte en acquisition digitale.` | ✅ 114 car. |
| Canonical | `https://indhack.com/mentions-legales` | ✅ |
| Robots | `index: true, follow: true` | ✅ |

**Contenu** :
- Éditeur (Indiana Aflalo - EI)
- Hébergeur (Vercel)
- Propriété intellectuelle
- RGPD (liens vers /confidentialite)
- Cookies
- Responsabilité
- Droit applicable

**Diagnostic** :
| ✅ | Contenu complet | Toutes les sections obligatoires |
| ✅ | Liens internes | Vers /confidentialite et /contact |

---

### 3.8 Confidentialité (`/confidentialite`)

**Type** : Page RGPD

| Élément | Valeur | Statut |
|---------|--------|--------|
| Title | `Politique de Confidentialité` | ✅ 29 car. |
| Meta description | `Politique de confidentialité et gestion des données personnelles du site indhack.com - Consultante SEO Indiana Aflalo. Conforme RGPD.` | ✅ 138 car. |
| Canonical | `https://indhack.com/confidentialite` | ✅ |
| Robots | `index: false, follow: true` | ✅ (noindex approprié) |

**Contenu détaillé** :
- Introduction + responsable traitement
- Données collectées (formulaire contact, audit, navigation)
- Finalités du traitement (tableau base légale + durée)
- Cookies (essentiels + analytics)
- Partage et transfert (Google, FormSubmit, Vercel)
- Sécurité (HTTPS, CSP, rate limiting)
- Droits RGPD (accès, rectification, effacement...)
- Conservation
- CNIL

**Diagnostic** :
| ✅ | Politique RGPD complète | 10 articles |
| ✅ | noindex approprié | Page légale non destinée au SEO |
| ✅ | Tableau durées de conservation | Transparence |

---

### 3.9 CGV (`/cgv`)

**Type** : Page légale

| Élément | Valeur | Statut |
|---------|--------|--------|
| Title | `Conditions Générales de Vente` | ✅ 30 car. |
| Meta description | `Conditions générales de vente des prestations de consulting SEO et création de sites web par Indiana Aflalo - IndHack.` | ✅ 119 car. |
| Canonical | `https://indhack.com/cgv` | ✅ |
| Robots | `index: false, follow: true` | ✅ (noindex approprié) |

**Contenu** :
- Préambule
- Objet (prestations couvertes)
- Devis et commande
- Tarifs et paiement (30/40/30%)
- Délais et livraison
- Obligations des parties
- Propriété intellectuelle
- Confidentialité
- Résiliation
- Garantie (30 jours)
- Limitation de responsabilité
- Force majeure
- Droit applicable

**Diagnostic** :
| ✅ | CGV professionnelles complètes | 12 articles |
| ✅ | noindex approprié | |
| ✅ | Mentions obligation de moyens SEO | Article 10.1 |

---

## 4. Maillage interne

### Liens vers /contact

| Depuis | Présent |
|--------|---------|
| Homepage | ✅ (CTA) |
| Tous les services | ✅ |
| Articles blog | ✅ |
| FAQ | ❌ |
| Études de cas | ✅ |
| Mentions légales | ✅ |
| Confidentialité | ✅ |
| CGV | ✅ |

### Liens vers /a-propos

| Depuis | Présent |
|--------|---------|
| Homepage | ✅ (AboutSection) |
| Footer | ✅ |
| Pages services | ⚠️ Vérifier |

### Liens vers /faq

| Depuis | Présent |
|--------|---------|
| Homepage | ❌ |
| Footer | ✅ |
| Pages services | ❌ |

---

## 5. Diagnostic global

### Points forts

| ✅ | Détail |
|----|--------|
| Homepage bien structurée | Schema complet, maillage riche, FAQ |
| À propos avec Person schema | E-E-A-T renforcé |
| Pages légales complètes | RGPD, CGV, mentions légales |
| noindex approprié | Confidentialité et CGV non indexées |
| Études de cas | Preuve sociale |

### Points à améliorer (P1)

| ⚠️ | Détail |
|----|--------|
| Titles courts | À propos et Contact trop génériques |
| FAQ peu visible | Pas de liens depuis homepage ou services |
| Filtres blog | Boutons de catégorie non fonctionnels |

### Problèmes critiques (P0)

| 🔴 | Page | Problème |
|----|------|----------|
| Blog | Pas de metadata | Ajouter title, description, canonical |
| À propos | Meta description 176 car. | Réduire à ≤155 car. |

---

## 6. Actions prioritaires

### P0 - Critiques (immédiat)

| # | Action | Fichier | Effort |
|---|--------|---------|--------|
| 1 | **Ajouter metadata au blog listing** | `app/blog/page.tsx` | 10 min |
| 2 | **Réduire meta description À propos** | `app/a-propos/page.tsx` | 5 min |

### P1 - Importants (cette semaine)

| # | Action | Détail | Effort |
|---|--------|--------|--------|
| 3 | **Enrichir titles courts** | À propos → "À Propos \| Indiana Aflalo – Consultante SEO" | 5 min |
| 4 | | Contact → "Contact \| Devis SEO Gratuit – INDHACK" | 5 min |
| 5 | **Ajouter liens vers /faq** | Depuis homepage et pages services | 15 min |

### P2 - Améliorations (plus tard)

| # | Action | Détail | Effort |
|---|--------|--------|--------|
| 6 | Rendre filtres blog fonctionnels | Ajouter filtrage par catégorie | 1h |
| 7 | Ajouter Review schema | Sur études de cas | 30 min |
| 8 | Enrichir FAQ page | Ajouter 5+ questions | 30 min |

### Corrections suggérées

**Metadata blog (app/blog/page.tsx)** :
```typescript
export const metadata: Metadata = {
    title: "Blog SEO | Guides & Conseils Référencement – INDHACK",
    description: "Conseils SEO, guides pratiques et analyses sur le référencement naturel, l'IA générative et les stratégies digitales. Par Indiana Aflalo, consultante SEO.",
    alternates: {
        canonical: "https://indhack.com/blog"
    }
};
```

**Meta description À propos** (155 car.) :
```
Consultante SEO indépendante : parcours, expertise technique et stratégie digitale. Accompagnement personnalisé PME et startups. Nice & France.
```

**Title À propos enrichi** :
```
À Propos | Indiana Aflalo – Consultante SEO Freelance
```

**Title Contact enrichi** :
```
Contact | Devis SEO Gratuit sous 24h – INDHACK
```

---

## Score global du silo

| Critère | Score | Commentaire |
|---------|-------|-------------|
| Métadonnées | 6/10 | Blog sans metadata, À propos meta trop longue |
| Schema | 9/10 | Person, Organization, FAQPage présents |
| Maillage | 7/10 | FAQ sous-exploitée |
| Contenu légal | 10/10 | Complet et conforme |
| Conversion | 8/10 | Contact bien structuré, études de cas présentes |
| **TOTAL** | **8.0/10** | Solide, quelques ajustements nécessaires |

---

*Audit réalisé le 19 février 2026 — Silo 10/10*
