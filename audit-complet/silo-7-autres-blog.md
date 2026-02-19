# Audit SEO Silo 7 : Référencement Naturel (Autres Blog)

**Date d'audit** : 19 février 2026
**Périmètre** : 4 pages (1 pilier service + 3 articles blog)
**Mot-clé principal du silo** : référencement naturel

---

## Sommaire

1. [Pilier : /referencement-naturel](#1-pilier--referencement-naturel)
2. [Article : checklist-seo-2026](#2-article--checklist-seo-2026)
3. [Article : seo-vs-sea-que-choisir](#3-article--seo-vs-sea-que-choisir)
4. [Article : programmatic-seo-50-pages-locales](#4-article--programmatic-seo-50-pages-locales)
5. [Matrice de maillage du silo](#5-matrice-de-maillage-du-silo)
6. [Analyse qualité des ancres](#6-analyse-qualité-des-ancres)
7. [Diagnostic global du silo](#7-diagnostic-global-du-silo)
8. [TOP 5 actions prioritaires](#8-top-5-actions-prioritaires)

---

## 1. Pilier : /referencement-naturel

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/referencement-naturel` | ✅ |
| **Fichier source** | `app/referencement-naturel/page.tsx` + `ReferencementClient.tsx` | — |
| **Title** | `Référencement Naturel \| Stratégie SEO Sur-Mesure – INDHACK` | ✅ 54 car. |
| **Meta description** | `Stratégies SEO sur-mesure pour atteindre la 1ère page Google. Trafic qualifié, leads durables et ROI maximisé. Experte certifiée. ✆ 06 61 13 97 48` | ✅ 147 car. |
| **H1** | `Arrêtez de payer pour chaque clic. Dominez Google.` | ✅ (accroche forte) |
| **Canonical** | `https://indhack.com/referencement-naturel` | ✅ |
| **Mot-clé principal** | référencement naturel | ✅ |

**Score KW on-page** : 6/6 ✅
- [x] KW dans URL
- [x] KW dans title
- [x] KW dans H1 implicite (SEO = référencement)
- [x] KW dans meta description (SEO)
- [x] KW dans premier paragraphe
- [x] Title ≤60 caractères

### B. Structure des titres

```
H1: Arrêtez de payer pour chaque clic. Dominez Google.
  H2: Plus qu'un simple classement, une autorité
    H3: Expertise Technique
    H3: Contenu Stratégique
    H3: Autorité et Crédibilité
  H2: Le référencement expliqué simplement
    H3: Comprendre le référencement naturel
    H3: Les trois piliers du SEO
    H3: Pourquoi c'est un investissement rentable
  H2: Ce que le référencement vous apporte
    H3: Trafic Qualifié
    H3: Leads Préqualifiés
    H3: Croissance Durable
  H2: Référencement local pour entreprises ambitieuses
  H2: Approfondir le sujet (3 articles liés)
  H2: Testez vos performances gratuitement (outils)
  H2: Questions sur le Référencement Naturel (FAQ 8 questions)
```

### C. Contenu principal

**Type de composant** : Client Component (`"use client"`)

Le pilier présente l'offre de référencement naturel avec :
- 3 piliers SEO (Technique, Contenu, Autorité)
- Section éducative sur le SEO
- Section résultats business
- Section SEO local avec maillage villes
- 3 articles liés du silo
- Section outils gratuits
- 8 questions FAQ avec schema

**Estimation** : ~2 000 mots (contenu client component)

### D. Maillage interne - Liens sortants

| URL destination | Ancre | Position | Type |
|-----------------|-------|----------|------|
| `/seo-local` | SEO local | Section local | Contextuel |
| `/seo-local` | Découvrir le SEO Local | Section local | CTA |
| `/seo-local` | Toutes les villes → | Section villes | Navigation |
| `/consultant-seo` | Mon expertise consultant SEO | Section local | Contextuel |
| `/consultant-seo-nice` | SEO Nice | Section villes | Navigation |
| `/consultant-seo-paris` | SEO Paris | Section villes | Navigation |
| `/consultant-seo-lyon` | SEO Lyon | Section villes | Navigation |
| `/consultant-seo-marseille` | SEO Marseille | Section villes | Navigation |
| `/consultant-seo-bordeaux` | SEO Bordeaux | Section villes | Navigation |
| `/consultant-seo-toulouse` | SEO Toulouse | Section villes | Navigation |
| `/blog/checklist-seo-2026` | Checklist SEO 2026 : 30 points essentiels | Articles liés | Navigation |
| `/blog/seo-vs-sea-que-choisir` | SEO vs SEA : que choisir ? | Articles liés | Navigation |
| `/blog/programmatic-seo-50-pages-locales` | Programmatic SEO : créer 50 pages locales | Articles liés | Navigation |
| `/outils/audit-seo-gratuit` | Audit SEO gratuit | Section outils | CTA |
| `/outils` | Voir tous les outils | Section outils | Navigation |
| `/contact` | Me contacter | CTA final | Action |

**Total liens internes** : 16
**Liens vers articles du silo** : 3 ✅

### E. Liens externes

Aucun lien externe détecté.

### F. Schema JSON-LD

```json
{
  "@type": "Service",
  "name": "Consulting Référencement Naturel (SEO)",
  "description": "Stratégies d'acquisition SEO sur-mesure pour augmenter votre trafic organique.",
  "provider": {
    "@type": "Person",
    "name": "Indiana Aflalo",
    "url": "https://indhack.com"
  },
  "serviceType": "SEO Consulting",
  "areaServed": "France"
}
```

+ FAQPage (8 questions) ✅
+ BreadcrumbList ✅
+ ServiceSchema (via composant) ✅

### G. Diagnostic

| Statut | Élément | Détail |
|--------|---------|--------|
| ✅ | Title optimisé | 54 car. |
| ✅ | Meta description | 147 car. |
| ✅ | Maillage vers articles silo | 3 articles liés |
| ✅ | Maillage vers services | SEO local, consultant-seo |
| ✅ | Maillage vers villes | 6 villes liées |
| ✅ | FAQ riche | 8 questions |
| ✅ | Section outils | 2 liens vers outils |
| ✅ | Contenu éducatif | Section pédagogique sur le SEO |

---

## 2. Article : checklist-seo-2026

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/blog/checklist-seo-2026` | ✅ |
| **Fichier source** | `content/blog/checklist-seo-2026.md` | — |
| **Title** | `Checklist SEO 2026 : les 30 points essentiels pour optimiser votre site` | 🔴 70 car. (max 60) |
| **Meta description** | `Téléchargez la checklist SEO 2026 gratuite. 30 points essentiels pour optimiser votre site web : technique, contenu, SEO local, backlinks et visibilité IA.` | ✅ 155 car. |
| **H1** | `Checklist SEO 2026 : les 30 points essentiels pour optimiser votre site` | ⚠️ (= title, trop long) |
| **Date** | 2026-02-08 | ✅ |
| **Catégorie** | Guides | ✅ |
| **Image** | `/images/blog/checklist-seo-2026.jpg` | ✅ |

**Score KW on-page** : 5/6
- [x] KW dans URL (checklist-seo)
- [x] KW dans title
- [x] KW dans H1
- [x] KW dans meta description
- [x] KW dans premier paragraphe
- [ ] Title ≤60 caractères

### B. Structure des titres

```
H1: Checklist SEO 2026 : les 30 points essentiels pour optimiser votre site
  H2: 1. SEO technique : les fondations de votre visibilité
    H3: Certificat SSL (HTTPS)
    H3: Core Web Vitals optimisés
    H3: Site responsive et Mobile-First
    H3: Fichier robots.txt correctement configuré
    H3: Sitemap XML à jour et soumis
    H3: Architecture de site en silo (cocon sémantique)
  H2: 2. Contenu et on-page : optimiser chaque page
    H3: Balises Title uniques et optimisées
    H3: Meta descriptions engageantes
    H3: Structure de titres Hn cohérente
    H3: Maillage interne stratégique
    H3: Images optimisées (compression + alt text)
    H3: Contenu E-E-A-T
  H2: 3. SEO local : dominer votre zone géographique
    H3: Fiche Google Business Profile optimisée
    H3: NAP cohérent partout
    H3: Avis Google avec réponses
    H3: Citations locales sur annuaires de qualité
    H3: Pages locales dédiées par zone
    H3: Données structurées LocalBusiness
  H2: 4. Backlinks et autorité : construire votre réputation
    H3: Audit des backlinks existants
    H3: Liens depuis des sites de votre thématique
    H3: Stratégie de content marketing
    H3: Relations presse digitales
    H3: Partenariats et co-marketing
    H3: Récupération de mentions non liées
  H2: 5. Visibilité IA : le nouveau terrain de jeu
    H3: Contenu citable par les LLMs
    H3: FAQ structurées avec Schema.org
    H3: Données structurées enrichies
    H3: Présence sur les sources d'entraînement IA
    H3: Autorité thématique (Topical Authority)
    H3: Monitoring des citations IA
  H2: Passez à l'action : votre checklist SEO 2026
    H3: Téléchargez la Checklist PDF
    H3: Besoin d'un Regard Expert ?
  H2: Ce qu'il faut retenir
  H2: Questions fréquentes (4 questions)
```

### C. Contenu intégral

**Nombre de mots** : ~2 500 mots ✅

**Thématiques couvertes** :
- SEO technique (6 points)
- Contenu et on-page (6 points)
- SEO local (6 points)
- Backlinks et autorité (6 points)
- Visibilité IA (6 points)
- Total : 30 points structurés

**Points forts** :
- Structure très claire en 5 catégories
- 30 points actionnables
- Tableaux de données (Core Web Vitals)
- Liens vers outils gratuits
- PDF téléchargeable proposé
- Section visibilité IA très complète

### D. Analyse sémantique

**Champ sémantique couvert** :
- checklist SEO, audit, optimisation site web
- SEO technique, Core Web Vitals, robots.txt
- contenu, balises title, meta description
- SEO local, Google Business Profile, NAP
- backlinks, autorité, netlinking
- visibilité IA, LLM, GEO, ChatGPT
- E-E-A-T, expertise, confiance

**Densité KW principal** : "SEO" ~50 occurrences, "checklist" ~10 occurrences

### E. Maillage interne - Liens sortants

| URL destination | Ancre | Position |
|-----------------|-------|----------|
| `/audit-seo` | audits SEO | Intro |
| `/outils/audit-seo-gratuit` | outil d'audit SEO gratuit | Intro blockquote |
| `/outils/generateur-robots-txt` | Générateur robots.txt 2026 | Section technique |
| `/blog/google-business-profile-guide-complet` | guide complet Google Business Profile | Section local |
| `/seo-local` | SEO local | Section local |
| `/outils/generateur-schema-json-ld` | Générateur Schema JSON-LD | Section local |
| `/outils/testeur-visibilite-ia` | Testeur de Visibilité IA | Section IA |
| `/blog/visibilite-ia-geo` | visibilité dans l'IA générative | Section IA |
| `/outils/audit-seo-gratuit` | Lancez un audit SEO gratuit | CTA |
| `/contact` | Demandez votre diagnostic SEO gratuit | CTA |
| `/blog/importance-audit-seo` | pourquoi l'audit SEO est le point de départ | Conclusion |
| `/seo-local` | SEO local | Conclusion |
| `/consultant-seo-nice` | Nice | Section villes |
| `/consultant-seo-paris` | Paris | Section villes |
| `/consultant-seo-lyon` | Lyon | Section villes |
| `/consultant-seo-marseille` | Marseille | Section villes |
| `/consultant-seo-bordeaux` | Bordeaux | Section villes |
| `/consultant-seo-strasbourg` | Strasbourg | Section villes |

**Total liens internes** : 18 ✅ (excellent)
**Liens vers pilier silo** : 0 ❌ (manquant !)
**Liens vers outils** : 4 ✅

### F. FAQ Schema

4 questions :
1. Quelle est la différence entre une checklist SEO et un audit SEO complet ?
2. À quelle fréquence dois-je vérifier ces 30 points ?
3. Puis-je faire cette checklist moi-même ou faut-il un expert ?
4. Les Core Web Vitals sont-ils vraiment importants pour le référencement ?

### G. Diagnostic

| Statut | Élément | Détail |
|--------|---------|--------|
| 🔴 P0 | Title trop long | 70 car. → max 60 |
| 🔴 P0 | Pas de lien vers pilier | `/referencement-naturel` absent |
| ✅ | Meta description | 155 car. exactement |
| ✅ | Contenu long | ~2 500 mots |
| ✅ | Maillage riche | 18 liens internes |
| ✅ | FAQ schema | 4 questions |
| ✅ | Liens vers outils | 4 outils liés |

---

## 3. Article : seo-vs-sea-que-choisir

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/blog/seo-vs-sea-que-choisir` | ✅ |
| **Fichier source** | `content/blog/seo-vs-sea-que-choisir.md` | — |
| **Title** | `SEO vs SEA : que choisir pour votre entreprise ?` | ✅ 48 car. |
| **Meta description** | `Référencement naturel ou publicité Google Ads ? Comparatif complet SEO vs SEA : coûts, délais, ROI. Guide pour faire le bon choix selon votre situation.` | ✅ 151 car. |
| **H1** | `SEO vs SEA : que choisir pour votre entreprise ?` | ✅ (= title) |
| **Date** | 2026-02-06 | ✅ |
| **Catégorie** | Stratégie | ✅ |
| **Image** | `/images/blog/seo-vs-sea.jpg` | ✅ |

**Score KW on-page** : 6/6 ✅

### B. Structure des titres

```
H1: SEO vs SEA : que choisir pour votre entreprise ?
  H2: SEO et SEA : définitions
  H2: Comparatif détaillé
    H3: Délai de résultats
    H3: Coûts sur 12 mois
    H3: Taux de clic
    H3: Pérennité des résultats
  H2: Quand choisir le SEO ?
    H3: Exemples concrets
  H2: Quand choisir le SEA ?
    H3: Exemples concrets
  H2: La stratégie optimale : combiner les deux
    H3: Phase 1 : Lancement (Mois 1-3)
    H3: Phase 2 : Croissance (Mois 4-12)
    H3: Phase 3 : Maturité (Année 2+)
    H3: Le cercle vertueux
  H2: Les erreurs à éviter
    H3: Erreur #1 → #3
  H2: Ce qu'il faut retenir
  H2: Pour aller plus loin
  H2: Questions fréquentes (4 questions)
```

### C. Contenu intégral

**Nombre de mots** : ~1 800 mots ⚠️ (proche du minimum)

**Thématiques couvertes** :
- Définitions SEO vs SEA
- Comparatif délais, coûts, taux de clic, pérennité
- Cas d'usage pour chaque approche
- Stratégie optimale en 3 phases
- Erreurs à éviter

**Points forts** :
- 7 tableaux comparatifs (excellent pour SEO)
- Exemples concrets par secteur
- Stratégie progressive claire
- Chiffres business réels

### D. Analyse sémantique

**Champ sémantique couvert** :
- SEO vs SEA, référencement naturel, payant
- Google Ads, publicité, CPC
- coûts, délais, ROI, budget
- trafic, clics, conversions
- stratégie, acquisition, leads

**Densité KW principal** : "SEO" ~40 occurrences, "SEA" ~25 occurrences

### E. Maillage interne - Liens sortants

| URL destination | Ancre | Position |
|-----------------|-------|----------|
| `/outils/testeur-visibilite-ia` | Testez votre visibilité IA gratuitement | Intro blockquote |
| `/consultant-seo` | consultante SEO | Intro |
| `/referencement-naturel` | référencement naturel | CTA final |
| `/contact` | contactez-moi | CTA final |
| `/blog/importance-audit-seo` | L'importance d'un audit SEO | Pour aller plus loin |
| `/blog/checklist-seo-2026` | Checklist SEO 2026 : les 30 points essentiels | Pour aller plus loin |
| `/blog/visibilite-ia-geo` | GEO : comment être cité par ChatGPT | Pour aller plus loin |

**Total liens internes** : 7 ✅
**Liens vers pilier silo** : 1 (`/referencement-naturel`) ✅

### F. FAQ Schema

4 questions :
1. Le SEO est-il vraiment gratuit ?
2. Combien de temps avant de voir des résultats en SEO ?
3. Peut-on faire du SEA sans faire de SEO ?
4. Le SEA impacte-t-il le référencement naturel ?

### G. Diagnostic

| Statut | Élément | Détail |
|--------|---------|--------|
| ✅ | Title optimisé | 48 car. |
| ✅ | Meta description | 151 car. |
| ⚠️ P1 | Contenu limite | ~1 800 mots (minimum 2 000 recommandé) |
| ✅ | Lien vers pilier | `/referencement-naturel` présent |
| ✅ | FAQ schema | 4 questions |
| ✅ | Tableaux comparatifs | 7 tableaux |

---

## 4. Article : programmatic-seo-50-pages-locales

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/blog/programmatic-seo-50-pages-locales` | ✅ |
| **Fichier source** | `content/blog/programmatic-seo-50-pages-locales.md` | — |
| **Title** | `Comment créer 50 pages locales uniques en 10 minutes (sans être pénalisé)` | 🔴 74 car. (max 60) |
| **Meta description** | `Découvrez le Programmatic SEO : la méthode pour générer des centaines de landing pages locales uniques instantanément. Guide technique 2026 pour scaler votre trafic.` | 🔴 165 car. (max 155) |
| **H1** | `Comment créer 50 pages locales uniques en 10 minutes (sans être pénalisé)` | ⚠️ (= title, trop long) |
| **Date** | 2026-02-13 | ✅ (récent) |
| **Catégorie** | SEO Technique | ✅ |
| **Image** | `/images/blog/programmatic-seo-robot-map-2026-02-15.webp` | ✅ (unique) |

**Score KW on-page** : 4/6
- [x] KW dans URL (programmatic-seo, pages-locales)
- [x] KW dans title
- [x] KW dans H1
- [x] KW dans meta description
- [ ] Title ≤60 caractères
- [ ] Meta description ≤155 caractères

### B. Structure des titres

```
H1: Comment créer 50 pages locales uniques en 10 minutes (sans être pénalisé)
  H2: Le concept du Programmatic SEO
  H2: Pourquoi Google déteste le copier-coller (et comment l'éviter)
  H2: Ma méthode : la "Local Unique Value" (LUV)
  H2: Les outils pour le faire vous-même
    H3: Exemple de Prompt ChatGPT
  H2: Conclusion
  H2: Pour aller plus loin
  H2: Questions fréquentes (4 questions)
```

### C. Contenu intégral

**Nombre de mots** : ~900 mots 🔴 (très insuffisant - minimum 2 000)

**Thématiques couvertes** :
- Concept du Programmatic SEO
- Risques des doorway pages
- Méthode LUV (Local Unique Value)
- Outils no-code (WP All Import, Airtable, ChatGPT)
- Exemple de prompt

**Points faibles** :
- Article trop court (< 1 000 mots)
- Manque de profondeur technique
- Pas assez d'exemples détaillés

### D. Analyse sémantique

**Champ sémantique couvert** :
- programmatic SEO, pages locales, génération
- doorway pages, pénalité Google
- template, variables, base de données
- LUV, Local Unique Value
- WP All Import, Airtable, ChatGPT

**Densité KW principal** : "programmatic SEO" ~5 occurrences, "pages locales" ~8 occurrences

### E. Maillage interne - Liens sortants

| URL destination | Ancre | Position |
|-----------------|-------|----------|
| `/consultant-seo` | consultante SEO | Intro |
| `/consultant-seo-nice` | consultant SEO Nice | Corps |
| `/consultant-seo-cannes` | consultant SEO Cannes | Corps |
| `/consultant-seo-antibes` | consultant SEO Antibes | Corps |
| `/creation-site-web` | Création de Site Web | Corps blockquote |
| `/contact` | contactez-moi | Conclusion |
| `/blog/seo-local-nice` | SEO local à Nice | Pour aller plus loin |
| `/blog/checklist-seo-2026` | Checklist SEO 2026 | Pour aller plus loin |
| `/creation-site-web` | Création de site web optimisé SEO | Pour aller plus loin |

**Total liens internes** : 9 ✅
**Liens vers pilier silo** : 0 ❌ (manquant !)

### F. FAQ Schema

4 questions :
1. Le Programmatic SEO est-il du black hat ?
2. Combien de pages locales puis-je créer avec cette méthode ?
3. Google peut-il détecter que mes pages sont générées automatiquement ?
4. Cette méthode fonctionne-t-elle pour tous les secteurs ?

### G. Diagnostic

| Statut | Élément | Détail |
|--------|---------|--------|
| 🔴 P0 | Title trop long | 74 car. → max 60 |
| 🔴 P0 | Meta description trop longue | 165 car. → max 155 |
| 🔴 P0 | Contenu trop court | ~900 mots (minimum 2 000) |
| 🔴 P0 | Pas de lien vers pilier | `/referencement-naturel` absent |
| ✅ | FAQ schema | 4 questions |
| ✅ | Liens vers villes | 3 villes liées |
| ✅ | Image unique | WebP récent |

---

## 5. Matrice de maillage du silo

### Liens entre pages du silo

| Depuis ↓ / Vers → | /referencement-naturel | checklist-seo | seo-vs-sea | programmatic-seo |
|-------------------|:----------------------:|:-------------:|:----------:|:----------------:|
| **/referencement-naturel** | — | ✅ | ✅ | ✅ |
| **checklist-seo** | ❌ | — | ❌ | ❌ |
| **seo-vs-sea** | ✅ | ✅ | — | ❌ |
| **programmatic-seo** | ❌ | ✅ | ❌ | — |

**Score cocon** : 6/12 liens possibles = **50%** ⚠️

### Problèmes identifiés

1. **`checklist-seo-2026` ne lie pas vers le pilier** : Article le plus riche du silo sans lien vers `/referencement-naturel`
2. **`programmatic-seo` ne lie pas vers le pilier** : Article orphelin du silo principal
3. **Articles ne se lient pas entre eux** : Seulement `seo-vs-sea` lie vers `checklist-seo`

---

## 6. Analyse qualité des ancres

### Ancres vers /referencement-naturel

| Ancre | Article source | Qualité |
|-------|----------------|---------|
| `référencement naturel` | seo-vs-sea | ✅ Exacte |

**Note** : Une seule ancre, les 2 autres articles ne lient pas vers le pilier.

### Ancres manquantes critiques

- Article `checklist-seo-2026` : **0 lien** vers `/referencement-naturel`
- Article `programmatic-seo` : **0 lien** vers `/referencement-naturel`

---

## 7. Diagnostic global du silo

### Points forts

| ✅ | Détail |
|----|--------|
| Pilier très complet | 8 questions FAQ, maillage riche |
| Contenu éducatif | Section pédagogique sur le SEO |
| Checklist actionnable | 30 points structurés |
| Comparatifs | 7 tableaux dans seo-vs-sea |
| Liens vers outils | 4 outils liés depuis checklist |
| Dates récentes | Articles de février 2026 |

### Points à améliorer (P1)

| ⚠️ | Détail | Impact |
|----|--------|--------|
| Maillage incomplet | Score cocon 50% | Distribution jus suboptimale |
| seo-vs-sea court | ~1 800 mots | Risque ranking |
| Inter-linking articles | Articles ne se lient pas entre eux | Silo fragmenté |

### Problèmes critiques (P0)

| 🔴 | Détail | Correction |
|----|--------|------------|
| Title checklist-seo | 70 car. | `Checklist SEO 2026 : 30 points pour optimiser votre site` (55 car.) |
| Title programmatic-seo | 74 car. | `Programmatic SEO : créer 50 pages locales en 10 minutes` (56 car.) |
| Meta programmatic-seo | 165 car. | `Programmatic SEO : générez des dizaines de pages locales uniques sans risquer de pénalité Google. Guide technique et méthode LUV.` (132 car.) |
| Contenu programmatic-seo | ~900 mots | Enrichir à 2 000+ mots |
| Liens pilier manquants | 2 articles | Ajouter liens vers `/referencement-naturel` |

---

## 8. TOP 5 actions prioritaires

### P0 - Critiques (à corriger immédiatement)

| # | Action | Fichier | Effort |
|---|--------|---------|--------|
| 1 | **Enrichir programmatic-seo** à 2000+ mots | `content/blog/programmatic-seo-50-pages-locales.md` | 1h30 |
| 2 | **Corriger title + meta** programmatic-seo | `content/blog/programmatic-seo-50-pages-locales.md` | 10 min |
| 3 | **Corriger title** checklist-seo-2026 | `content/blog/checklist-seo-2026.md` | 5 min |
| 4 | **Ajouter liens vers pilier** dans checklist + programmatic | `content/blog/*.md` (x2) | 10 min |

### P1 - Importants (cette semaine)

| # | Action | Détail | Effort |
|---|--------|--------|--------|
| 5 | **Enrichir seo-vs-sea** à 2000 mots | Ajouter section ou détailler exemples | 30 min |

### Corrections meta suggérées

**Title checklist-seo-2026** (55 car.) :
```
Checklist SEO 2026 : 30 points pour optimiser votre site
```

**Title programmatic-seo** (56 car.) :
```
Programmatic SEO : créer 50 pages locales en 10 minutes
```

**Meta description programmatic-seo** (132 car.) :
```
Programmatic SEO : générez des dizaines de pages locales uniques sans risquer de pénalité Google. Guide technique et méthode LUV.
```

### Liens à ajouter

**Dans checklist-seo-2026**, ajouter dans l'intro ou conclusion :
```markdown
Cette checklist complète mon [service de référencement naturel](/referencement-naturel) pour les entreprises qui veulent dominer Google.
```

**Dans programmatic-seo**, ajouter dans la conclusion :
```markdown
Le Programmatic SEO est l'une des techniques avancées que j'intègre dans ma stratégie de [référencement naturel](/referencement-naturel).
```

---

## Score global du silo

| Critère | Score | Commentaire |
|---------|-------|-------------|
| Métadonnées | 5/10 | 2 titles + 1 meta à corriger |
| Contenu | 5/10 | 1 article trop court (900 mots), 1 limite |
| Maillage | 5/10 | Score cocon 50%, 2 liens pilier manquants |
| Schema | 9/10 | FAQ complètes partout |
| Ancres | 6/10 | Trop peu d'ancres vers pilier |
| **TOTAL** | **6.0/10** | Silo fonctionnel mais maillage et contenu à renforcer |

---

## Conclusion

Le silo Référencement Naturel a un pilier très solide mais des articles qui ne jouent pas leur rôle de support. L'article `programmatic-seo` est particulièrement problématique (trop court, métas trop longues, pas de lien vers pilier).

L'action prioritaire est d'enrichir l'article programmatic-seo et de créer les liens vers le pilier pour renforcer la structure du cocon sémantique.

---

*Audit réalisé le 19 février 2026 — Silo 7/10*
