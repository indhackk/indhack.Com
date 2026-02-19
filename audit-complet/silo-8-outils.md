# SILO 8 — OUTILS SEO

> Audit SEO exhaustif du silo Outils (index + 6 outils)
> Date d'audit : 2026-02-19

---

## SOMMAIRE

1. [/outils (Index)](#1-outils-index)
2. [/outils/audit-seo-gratuit](#2-outilsaudit-seo-gratuit)
3. [/outils/testeur-visibilite-ia](#3-outilstesteur-visibilite-ia)
4. [/outils/simulateur-visibilite-locale](#4-outilssimulateur-visibilite-locale)
5. [/outils/generateur-robots-txt](#5-outilsgenerateur-robots-txt)
6. [/outils/generateur-schema-json-ld](#6-outilsgenerateur-schema-json-ld)
7. [/outils/extracteur-mots-cles](#7-outilsextracteur-mots-cles)
8. [Matrice de maillage du silo](#matrice-de-maillage-du-silo)
9. [Diagnostic global et TOP 5 actions](#diagnostic-global-et-top-5-actions)

---

## 1. /outils (Index)

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/outils` | ✅ |
| **Fichier source** | `app/outils/page.tsx` | Server Component |
| **Title** | "Outils SEO Gratuits \| Audit, Testeur IA, Visibilité Locale" | 54 car. ✅ |
| **Meta description** | "Découvrez les outils SEO gratuits IndHack : audit technique en 1 clic, testeur de visibilité IA (ChatGPT, Perplexity), simulateur local. Sans inscription." | 160 car. ✅ |
| **H1** | "Outils SEO Gratuits" | ✅ KW présent |
| **Canonical** | `https://indhack.com/outils` | ✅ |

**Mot-clé principal assigné** : `outils SEO gratuits`
- Volume estimé : 880/mois
- KD estimé : 28

**Score KW on-page : 5/6**
- [x] KW dans title
- [x] KW dans H1
- [x] KW dans meta description
- [x] KW dans URL
- [x] KW dans contenu
- [ ] KW dans alt image (pas d'image hero)

### B. Structure Hn

```
H1: Outils SEO Gratuits
  H2: Machine à leads SEO
  H2: Tous les outils (section cartes)
  H2: Questions Fréquentes
    (5 FAQ items)
  H2: Besoin d'un accompagnement SEO personnalisé ?
```

### C. Contenu

**Type** : Page index listant les 5 outils disponibles
**Composant** : Server Component avec cartes interactives

**Outils listés** :
1. Audit SEO Gratuit — Score /100 en 30 secondes
2. Testeur Visibilité IA — ChatGPT vous trouve-t-il ?
3. Simulateur Visibilité Locale — Dominez Google Maps
4. Générateur robots.txt — Crawlers IA 2026
5. Générateur Schema JSON-LD — Rich snippets faciles

**Nombre de mots** : ~600 mots (hors FAQ)
**Temps de lecture** : 3 min

### D. Maillage interne — Liens sortants

| Destination | Ancre | Position | Type |
|-------------|-------|----------|------|
| /outils/audit-seo-gratuit | "Audit SEO Gratuit" | Carte outil | Navigation |
| /outils/testeur-visibilite-ia | "Testeur Visibilité IA" | Carte outil | Navigation |
| /outils/simulateur-visibilite-locale | "Simulateur Visibilité Locale" | Carte outil | Navigation |
| /outils/generateur-robots-txt | "Générateur robots.txt" | Carte outil | Navigation |
| /outils/generateur-schema-json-ld | "Générateur Schema JSON-LD" | Carte outil | Navigation |
| /audit-seo | "audit SEO professionnel" | FAQ | Contextuel |
| /referencement-naturel | "stratégie de référencement naturel" | FAQ | Contextuel |
| /consultant-seo-nice | "Consultant SEO Nice" | Section liens | Footer |
| /consultant-seo-cannes | "Consultant SEO Cannes" | Section liens | Footer |
| /consultant-seo-sophia-antipolis | "Consultant SEO Sophia" | Section liens | Footer |
| /blog/importance-audit-seo | "L'importance d'un audit SEO" | Section articles | Contextuel |
| /blog/google-business-profile-guide-complet | "Guide Google Business Profile" | Section articles | Contextuel |
| /blog/seo-local-nice | "SEO local à Nice" | Section articles | Contextuel |
| /contact | "Demander un accompagnement" | CTA final | Conversion |

**Total liens internes** : 14 ✅ (excellent)

### E. Schema JSON-LD

```json
[
  {
    "@type": "ItemList",
    "itemListElement": [5 outils avec position, name, url]
  },
  {
    "@type": "BreadcrumbList",
    "itemListElement": [Accueil > Outils SEO]
  },
  {
    "@type": "FAQPage",
    "mainEntity": [5 questions/réponses]
  }
]
```

**Schémas présents** : ItemList ✅, BreadcrumbList ✅, FAQPage ✅

### F. FAQ

| Question | Longueur réponse |
|----------|------------------|
| Pourquoi proposer des outils SEO gratuits ? | 85 mots |
| Comment fonctionne l'audit SEO gratuit ? | 72 mots |
| Qu'est-ce que la visibilité IA et le GEO ? | 68 mots |
| Les résultats des outils sont-ils fiables ? | 55 mots |
| Proposez-vous un accompagnement personnalisé ? | 48 mots |

### G. Diagnostic

**✅ Points OK :**
- Title et meta description optimisés
- Excellent maillage vers tous les outils
- Schemas ItemList, BreadcrumbList, FAQPage présents
- Liens vers pages villes (SEO local)
- Liens vers articles blog pertinents

**⚠️ À améliorer (P1) :**
- Ajouter une image hero avec alt optimisé
- Contenu éditorial trop court (600 mots) — idéal 1500+

**🔴 Critique (P0) :**
- Aucun

---

## 2. /outils/audit-seo-gratuit

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/outils/audit-seo-gratuit` | ✅ |
| **Fichier source** | `app/outils/audit-seo-gratuit/page.tsx` | Server Component |
| **Title** | "Audit SEO Gratuit : Analyse de Site en 1 Clic \| Score /100" | 56 car. ✅ |
| **Meta description** | "Analysez votre site web en 30 secondes. Score SEO sur 100, performances PageSpeed, mobile-friendly, balises meta, données structurées. Gratuit, sans inscription." | 162 car. ⚠️ (légèrement long) |
| **H1** | "Audit SEO Gratuit" | ✅ KW présent |
| **Canonical** | `https://indhack.com/outils/audit-seo-gratuit` | ✅ |

**Mot-clé principal assigné** : `audit SEO gratuit`
- Volume estimé : 2 400/mois
- KD estimé : 35

**Score KW on-page : 6/6**
- [x] KW dans title
- [x] KW dans H1
- [x] KW dans meta description
- [x] KW dans URL
- [x] KW dans contenu
- [x] KW dans schema WebApplication

### B. Structure Hn

```
H1: Audit SEO Gratuit
  H2: Ce que l'outil analyse
  H2: Outils complémentaires
  H2: Pourquoi un audit SEO est-il important ?
  H2: Questions Fréquentes
  H2: Besoin d'un audit SEO professionnel ?
```

### C. Contenu

**Type** : Page outil avec interface d'analyse en temps réel
**Composant principal** : `AuditSeoGratuit` (Client Component avec PageSpeed API)

**Fonctionnalités** :
- Analyse PageSpeed en temps réel
- Score /100 avec détails
- Vérification mobile-friendly
- Analyse des balises meta
- Détection données structurées

**Nombre de mots** : ~800 mots (hors interface outil)
**Temps de lecture** : 4 min

### D. Maillage interne — Liens sortants

| Destination | Ancre | Position | Type |
|-------------|-------|----------|------|
| /outils/testeur-visibilite-ia | "Testeur Visibilité IA" | Outils complémentaires | Navigation |
| /outils/simulateur-visibilite-locale | "Simulateur Visibilité Locale" | Outils complémentaires | Navigation |
| /outils/generateur-schema-json-ld | "Générateur Schema JSON-LD" | Outils complémentaires | Navigation |
| /audit-seo | "audit SEO professionnel" | Section éditoriale | Contextuel |
| /referencement-naturel | "stratégie de référencement" | Section éditoriale | Contextuel |
| /blog/importance-audit-seo | "importance d'un audit SEO" | Section articles | Contextuel |
| /blog/contenu-rapport-audit-seo | "contenu d'un rapport d'audit" | Section articles | Contextuel |
| /blog/pourquoi-consultant-seo | "travailler avec un consultant SEO" | Section articles | Contextuel |
| /consultant-seo-nice | "Consultante SEO à Nice" | Section villes | Footer |
| /consultant-seo-cannes | "Consultante SEO à Cannes" | Section villes | Footer |
| /consultant-seo-antibes | "Consultante SEO à Antibes" | Section villes | Footer |
| /contact | "Demander un audit complet" | CTA final | Conversion |

**Total liens internes** : 12 ✅

### E. Schema JSON-LD

```json
[
  {
    "@type": "WebApplication",
    "name": "Audit SEO Gratuit IndHack",
    "applicationCategory": "SEO Tool",
    "offers": { "price": "0", "priceCurrency": "EUR" }
  },
  {
    "@type": "BreadcrumbList",
    "itemListElement": [Accueil > Outils SEO > Audit SEO Gratuit]
  },
  {
    "@type": "FAQPage",
    "mainEntity": [5 questions/réponses]
  }
]
```

### F. FAQ

| Question | Longueur réponse |
|----------|------------------|
| Comment fonctionne cet audit SEO gratuit ? | 68 mots |
| L'audit gratuit est-il vraiment complet ? | 75 mots |
| Quelle différence avec un audit professionnel ? | 82 mots |
| Comment améliorer mon score SEO ? | 65 mots |
| Mes données sont-elles conservées ? | 45 mots |

### G. Diagnostic

**✅ Points OK :**
- KW scoring parfait 6/6
- Schemas complets (WebApplication, Breadcrumb, FAQPage)
- Bon maillage vers outils, articles, villes
- Interface outil fonctionnelle (PageSpeed API)

**⚠️ À améliorer (P1) :**
- Meta description à 162 car. (réduire à 155)
- Contenu éditorial à enrichir (800 → 1500 mots)

**🔴 Critique (P0) :**
- Aucun

---

## 3. /outils/testeur-visibilite-ia

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/outils/testeur-visibilite-ia` | ✅ |
| **Fichier source** | `app/outils/testeur-visibilite-ia/page.tsx` | Server Component |
| **Title** | "Testeur Visibilité IA Gratuit — ChatGPT, Perplexity, Claude" | 58 car. ✅ |
| **Meta description** | "Votre site est-il visible par ChatGPT, Perplexity et Claude ? Testez gratuitement les 8 crawlers IA qui explorent le web. Diagnostiquez votre robots.txt en 1 clic." | 168 car. ⚠️ (trop long) |
| **H1** | "Testeur Visibilité IA" | ✅ KW présent |
| **Canonical** | `https://indhack.com/outils/testeur-visibilite-ia` | ✅ |

**Mot-clé principal assigné** : `testeur visibilité IA` / `visibilité ChatGPT`
- Volume estimé : 170/mois (émergent)
- KD estimé : 8 (faible concurrence = opportunité)

**Score KW on-page : 6/6**
- [x] KW dans title
- [x] KW dans H1
- [x] KW dans meta description
- [x] KW dans URL
- [x] KW dans contenu
- [x] KW dans schema WebApplication

### B. Structure Hn

```
H1: Testeur Visibilité IA
  H2: Ce que l'outil vérifie
  H2: Comment fonctionne la visibilité IA ?
  H2: Pourquoi c'est important en 2026 ?
  H2: Articles sur le GEO
  H2: Outils complémentaires
  H2: Questions Fréquentes (8 FAQ)
  H2: Besoin d'une stratégie GEO complète ?
```

### C. Contenu

**Type** : Page outil GEO avec interface de test robots.txt
**Composant principal** : `TesteurVisibiliteIA` (Client Component)

**Fonctionnalités** :
- Test des 8 crawlers IA (GPTBot, ChatGPT-User, Claude-Web, PerplexityBot, etc.)
- Analyse robots.txt en temps réel
- Score de visibilité /100
- Recommandations personnalisées

**Contenu éditorial riche** :
- Explication détaillée du GEO (Generative Engine Optimization)
- Tableau des crawlers IA avec rôles
- Différence entraînement vs navigation
- Statistiques 2026 sur adoption IA

**Nombre de mots** : ~1 800 mots ✅
**Temps de lecture** : 8 min

### D. Maillage interne — Liens sortants

| Destination | Ancre | Position | Type |
|-------------|-------|----------|------|
| /outils/generateur-robots-txt | "générateur robots.txt" | Section contenu | Contextuel |
| /outils/audit-seo-gratuit | "Audit SEO Gratuit" | Outils complémentaires | Navigation |
| /outils/simulateur-visibilite-locale | "Simulateur Visibilité Locale" | Outils complémentaires | Navigation |
| /outils/generateur-schema-json-ld | "Générateur Schema" | Outils complémentaires | Navigation |
| /referencement-naturel | "stratégie de référencement" | Section éditoriale | Contextuel |
| /blog/geo-comment-apparaitre-chatgpt-2026 | "GEO : comment apparaître dans ChatGPT" | Section articles | Contextuel |
| /blog/visibilite-ia-geo | "Visibilité IA et GEO" | Section articles | Contextuel |
| /consultant-seo-nice | "Consultante SEO Nice" | Section villes | Footer |
| /consultant-seo-paris | "Consultante SEO Paris" | Section villes | Footer |
| /consultant-seo-cannes | "Consultante SEO Cannes" | Section villes | Footer |
| /contact | "Demander une stratégie GEO" | CTA final | Conversion |

**Total liens internes** : 11 ✅

### E. Schema JSON-LD

```json
[
  {
    "@type": "WebApplication",
    "name": "Testeur Visibilité IA IndHack",
    "applicationCategory": "SEO Tool",
    "featureList": ["Test 8 crawlers IA", "Analyse robots.txt", "Score /100", "Recommandations"]
  },
  {
    "@type": "BreadcrumbList"
  },
  {
    "@type": "FAQPage",
    "mainEntity": [8 questions/réponses]
  }
]
```

**8 FAQ** (le plus riche du silo) — couvre :
1. C'est quoi la visibilité IA ?
2. Pourquoi les IA ne voient pas mon site ?
3. Comment les IA choisissent leurs sources ?
4. Différence GPTBot vs ChatGPT-User ?
5. Le GEO est-il important pour le SEO ?
6. Comment apparaître dans ChatGPT ?
7. Quels crawlers IA autoriser ?
8. Cette tendance va-t-elle durer ?

### F. Diagnostic

**✅ Points OK :**
- Contenu éditorial très riche (1800 mots)
- 8 FAQ (meilleure couverture du silo)
- Positionnement GEO innovant (faible concurrence)
- Schemas complets
- Bon maillage vers articles GEO

**⚠️ À améliorer (P1) :**
- Meta description à 168 car. → réduire à 155

**🔴 Critique (P0) :**
- Aucun

---

## 4. /outils/simulateur-visibilite-locale

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/outils/simulateur-visibilite-locale` | ✅ |
| **Fichier source** | `app/outils/simulateur-visibilite-locale/page.tsx` | Server Component |
| **Title** | "Simulateur Visibilité Locale — Analysez la SERP de votre ville" | 62 car. ⚠️ (légèrement long) |
| **Meta description** | "Qui domine Google pour votre métier dans votre ville ? Analysez les 10 premiers résultats, identifiez les plateformes vs commerces locaux. Gratuit, sans inscription." | 165 car. ✅ |
| **H1** | "Simulateur Visibilité Locale" | ✅ KW présent |
| **Canonical** | `https://indhack.com/outils/simulateur-visibilite-locale` | ✅ |

**Mot-clé principal assigné** : `visibilité locale Google` / `analyse SERP locale`
- Volume estimé : 320/mois
- KD estimé : 22

**Score KW on-page : 5/6**
- [x] KW dans title
- [x] KW dans H1
- [x] KW dans meta description
- [x] KW dans URL
- [x] KW dans contenu
- [ ] KW dans image (pas d'image hero)

### B. Structure Hn

```
H1: Simulateur Visibilité Locale
  H2: Ce que l'outil analyse
  H2: Outils complémentaires
  H2: Questions Fréquentes (5 FAQ)
  H2: Besoin de dominer votre marché local ?
```

### C. Contenu

**Type** : Page outil SEO local avec simulation SERP
**Composant principal** : `SimulateurLocal` (Client Component)

**Fonctionnalités** :
- Analyse top 10 Google pour requête "[métier] [ville]"
- Classification : plateformes (PagesJaunes, Doctolib...) vs locaux
- Niveau d'opportunité (Élevé/Modéré/Faible)
- Statistiques de répartition

**Nombre de mots** : ~700 mots
**Temps de lecture** : 4 min

### D. Maillage interne — Liens sortants

| Destination | Ancre | Position | Type |
|-------------|-------|----------|------|
| /outils/audit-seo-gratuit | "Audit SEO Gratuit" | Outils complémentaires | Navigation |
| /outils/testeur-visibilite-ia | "Testeur Visibilité IA" | Outils complémentaires | Navigation |
| /outils/generateur-schema-json-ld | "Générateur Schema JSON-LD" | Outils complémentaires | Navigation |
| /seo-local | "Découvrir l'offre SEO Local" | CTA final | Conversion |

**Total liens internes** : 4 ⚠️ (insuffisant)

### E. Schema JSON-LD

```json
[
  {
    "@type": "WebApplication",
    "name": "Simulateur Visibilité Locale INDHACK",
    "featureList": ["Analyse top 10 Google", "Classification plateformes/locaux", "Détection opportunités"]
  },
  { "@type": "BreadcrumbList" },
  { "@type": "FAQPage", "mainEntity": [5 questions] }
]
```

### F. FAQ

| Question | Longueur réponse |
|----------|------------------|
| Comment fonctionne le simulateur de visibilité locale ? | 62 mots |
| Que signifie le niveau d'opportunité ? | 58 mots |
| Pourquoi les plateformes dominent-elles souvent ? | 55 mots |
| Comment utiliser ces résultats pour mon SEO ? | 52 mots |
| Les résultats sont-ils en temps réel ? | 48 mots |

### G. Diagnostic

**✅ Points OK :**
- Schemas complets (WebApplication, Breadcrumb, FAQPage)
- Outil fonctionnel avec analyse SERP
- Lien vers /seo-local (page mère thématique)

**⚠️ À améliorer (P1) :**
- Title à 62 car. → réduire à 60
- Seulement 4 liens internes → ajouter liens vers articles SEO local, pages villes
- Contenu éditorial à enrichir (700 → 1200 mots)

**🔴 Critique (P0) :**
- Maillage insuffisant : manque liens vers /blog/seo-local-nice, /blog/google-business-profile-guide-complet, pages villes

---

## 5. /outils/generateur-robots-txt

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/outils/generateur-robots-txt` | ✅ |
| **Fichier source** | `app/outils/generateur-robots-txt/page.tsx` | Server Component |
| **Title** | "Générateur robots.txt avec Crawlers IA 2026 — Gratuit" | 54 car. ✅ |
| **Meta description** | "Créez votre fichier robots.txt avec les crawlers IA de 2026 : GPTBot, Claude-Web, PerplexityBot... Configurez la visibilité de votre site pour les IA en quelques clics." | 170 car. ⚠️ (trop long) |
| **H1** | "Générateur robots.txt" | ✅ KW présent |
| **Canonical** | `https://indhack.com/outils/generateur-robots-txt` | ✅ |

**Mot-clé principal assigné** : `générateur robots.txt` / `robots.txt IA`
- Volume estimé : 590/mois
- KD estimé : 18

**Score KW on-page : 6/6**
- [x] KW dans title
- [x] KW dans H1
- [x] KW dans meta description
- [x] KW dans URL
- [x] KW dans contenu
- [x] KW dans schema

### B. Structure Hn

```
H1: Générateur robots.txt
  H2: Comprendre les crawlers IA en 2026
  H2: Outils complémentaires
  H2: Articles SEO & GEO / Consultant SEO par ville
  H2: Questions Fréquentes (5 FAQ)
  H2: Besoin d'une stratégie GEO complète ?
```

### C. Contenu

**Type** : Page outil GEO avec générateur robots.txt
**Composant principal** : `RobotsGenerator` (Client Component)

**Contenu éditorial** :
- Explication détaillée robots.txt
- Tableau 5 crawlers IA avec recommandations
- Différence navigation vs entraînement
- Guide bonnes pratiques 2026

**Nombre de mots** : ~1 200 mots ✅
**Temps de lecture** : 6 min

### D. Maillage interne — Liens sortants

| Destination | Ancre | Position | Type |
|-------------|-------|----------|------|
| /outils/testeur-visibilite-ia | "testeur de visibilité IA" | Contenu éditorial | Contextuel |
| /outils/testeur-visibilite-ia | "Testeur Visibilité IA" | Outils complémentaires | Navigation |
| /outils/generateur-schema-json-ld | "Générateur Schema JSON-LD" | Outils complémentaires | Navigation |
| /outils/audit-seo-gratuit | "Audit SEO Gratuit" | Outils complémentaires | Navigation |
| /referencement-naturel | "stratégie SEO complète" | Contenu éditorial | Contextuel |
| /blog/pourquoi-consultant-seo | "Pourquoi faire appel à un consultant SEO ?" | Section articles | Contextuel |
| /blog/importance-audit-seo | "Pourquoi un audit SEO est essentiel" | Section articles | Contextuel |
| /blog/seo-local-nice | "Guide du SEO local à Nice" | Section articles | Contextuel |
| /consultant-seo-nice | "Consultant SEO Nice" | Section villes | Footer |
| /consultant-seo-sophia-antipolis | "Consultant SEO Sophia Antipolis" | Section villes | Footer |
| /consultant-seo-cannes | "Consultant SEO Cannes" | Section villes | Footer |
| /contact | "Demander un audit GEO" | CTA final | Conversion |

**Total liens internes** : 12 ✅

### E. Schema JSON-LD

```json
[
  {
    "@type": "WebApplication",
    "name": "Générateur robots.txt IndHack",
    "applicationCategory": "SEO Tool"
  },
  { "@type": "BreadcrumbList" },
  { "@type": "FAQPage", "mainEntity": [5 questions] }
]
```

### F. FAQ

| Question | Longueur réponse |
|----------|------------------|
| Qu'est-ce que le fichier robots.txt ? | 55 mots |
| Quels sont les crawlers IA à connaître en 2026 ? | 62 mots |
| Dois-je bloquer les crawlers IA ? | 58 mots |
| Le robots.txt protège-t-il vraiment mon contenu ? | 52 mots |
| Où placer le fichier robots.txt ? | 48 mots |

### G. Diagnostic

**✅ Points OK :**
- Excellent maillage (12 liens)
- Contenu éditorial riche (1200 mots)
- Schemas complets
- Liens vers articles pertinents + villes
- Positionnement GEO différenciant

**⚠️ À améliorer (P1) :**
- Meta description à 170 car. → réduire à 155

**🔴 Critique (P0) :**
- Aucun

---

## 6. /outils/generateur-schema-json-ld

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/outils/generateur-schema-json-ld` | ✅ |
| **Fichier source** | `app/outils/generateur-schema-json-ld/page.tsx` | Server Component |
| **Title** | "Générateur Schema JSON-LD Gratuit — Données Structurées" | 56 car. ✅ |
| **Meta description** | "Créez vos données structurées en quelques clics. LocalBusiness, FAQPage, Article, Product... Générateur gratuit avec prévisualisation et validation." | 152 car. ✅ |
| **H1** | "Générateur Schema JSON-LD" | ✅ KW présent |
| **Canonical** | `https://indhack.com/outils/generateur-schema-json-ld` | ✅ |

**Mot-clé principal assigné** : `générateur schema JSON-LD` / `générateur données structurées`
- Volume estimé : 720/mois
- KD estimé : 25

**Score KW on-page : 6/6**
- [x] KW dans title
- [x] KW dans H1
- [x] KW dans meta description
- [x] KW dans URL
- [x] KW dans contenu
- [x] KW dans schema

### B. Structure Hn

```
H1: Générateur Schema JSON-LD
  H2: Les données structurées au service de votre visibilité
  H2: Articles SEO & données structurées / Expertise SEO locale
  H2: Outils complémentaires
  H2: Questions Fréquentes (5 FAQ)
  H2: Besoin d'une stratégie SEO complète ?
```

### C. Contenu

**Type** : Page outil technique avec générateur multi-schema
**Composant principal** : `SchemaGenerator` (Client Component)

**Types de schema supportés** :
1. LocalBusiness
2. FAQPage
3. Article
4. Product
5. Organization
6. Person
7. WebSite
8. BreadcrumbList
9. HowTo

**Nombre de mots** : ~900 mots
**Temps de lecture** : 5 min

### D. Maillage interne — Liens sortants

| Destination | Ancre | Position | Type |
|-------------|-------|----------|------|
| /outils/testeur-visibilite-ia | "testeur de visibilité IA" | Contenu éditorial | Contextuel |
| /outils/testeur-visibilite-ia | "Testeur Visibilité IA" | Outils complémentaires | Navigation |
| /outils/generateur-robots-txt | "Générateur robots.txt" | Outils complémentaires | Navigation |
| /outils/audit-seo-gratuit | "Audit SEO Gratuit" | Outils complémentaires | Navigation |
| /referencement-naturel | "stratégie de référencement naturel" | Contenu éditorial | Contextuel |
| /audit-seo | "audit SEO professionnel" | Contenu éditorial | Contextuel |
| /blog/importance-audit-seo | "L'importance d'un audit SEO pour votre site" | Section articles | Contextuel |
| /blog/contenu-rapport-audit-seo | "Que contient un rapport d'audit SEO ?" | Section articles | Contextuel |
| /blog/pourquoi-consultant-seo | "Pourquoi travailler avec un consultant SEO" | Section articles | Contextuel |
| /consultant-seo-nice | "Consultante SEO à Nice" | Section villes | Footer |
| /consultant-seo-cannes | "Consultante SEO à Cannes" | Section villes | Footer |
| /consultant-seo-antibes | "Consultante SEO à Antibes" | Section villes | Footer |
| /contact | "Demander un audit" | CTA final | Conversion |

**Total liens internes** : 13 ✅

### E. Schema JSON-LD

```json
[
  {
    "@type": "WebApplication",
    "name": "Générateur Schema JSON-LD INDHACK",
    "applicationCategory": "SEO Tool"
  },
  { "@type": "BreadcrumbList" },
  { "@type": "FAQPage", "mainEntity": [5 questions] }
]
```

### F. FAQ

| Question | Longueur réponse |
|----------|------------------|
| Qu'est-ce que le Schema JSON-LD ? | 58 mots |
| Pourquoi utiliser des données structurées ? | 55 mots |
| Quel type de Schema choisir ? | 52 mots |
| Où placer le code JSON-LD ? | 48 mots |
| Comment vérifier que mon Schema fonctionne ? | 45 mots |

### G. Diagnostic

**✅ Points OK :**
- Métadonnées parfaites (title, meta desc)
- Excellent maillage (13 liens)
- Schemas complets
- 9 types de schema supportés (valeur ajoutée)
- Liens vers services /audit-seo et /referencement-naturel

**⚠️ À améliorer (P1) :**
- Contenu éditorial à enrichir (900 → 1500 mots)
- Ajouter exemples concrets de rich snippets

**🔴 Critique (P0) :**
- Aucun

---

## 7. /outils/extracteur-mots-cles

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `/outils/extracteur-mots-cles` | ✅ |
| **Fichier source** | `app/outils/extracteur-mots-cles/page.tsx` | ⚠️ Client Component ("use client") |
| **Title** | Non défini dans metadata | 🔴 MANQUANT |
| **Meta description** | Non définie | 🔴 MANQUANT |
| **H1** | "Extracteur de mots-clés gratuit" | ✅ KW présent |
| **Canonical** | Non défini | 🔴 MANQUANT |

**Mot-clé principal assigné** : `extracteur mots-clés gratuit`
- Volume estimé : 480/mois
- KD estimé : 22

**Score KW on-page : 2/6** 🔴
- [ ] KW dans title (MANQUANT)
- [x] KW dans H1
- [ ] KW dans meta description (MANQUANT)
- [x] KW dans URL
- [ ] KW dans schema (SoftwareApplication vs WebApplication)
- [ ] Canonical (MANQUANT)

### B. Structure Hn

```
H1: Extracteur de mots-clés gratuit
  H2: Comment analyser les mots-clés d'un texte ou d'un site web ?
    H3: Pourquoi utiliser un extracteur de mots-clés ?
    H3: Comment interpréter les résultats ?
  H2: Besoin d'une analyse SEO plus approfondie ?
```

### C. Contenu

**Type** : Page outil avec analyse de texte côté client
**Composant** : Client Component complet (analyse useMemo)

**Fonctionnalités** :
- Extraction mots-clés avec densité
- Bi-grammes (expressions 2 mots)
- Tri-grammes (expressions 3 mots)
- Filtrage stop words français
- Export résultats

**Contenu éditorial** :
- Explication extraction mots-clés
- Conseils densité optimale (1-3%)
- Guide bi-grammes/tri-grammes

**Nombre de mots** : ~650 mots
**Temps de lecture** : 3 min

### D. Maillage interne — Liens sortants

| Destination | Ancre | Position | Type |
|-------------|-------|----------|------|
| /audit-seo | "Demander un audit SEO complet de votre site" | Section "Pour aller plus loin" | Contextuel |
| /outils/audit-seo-gratuit | "Tester notre outil d'audit SEO gratuit" | Section "Pour aller plus loin" | Contextuel |
| /blog/contenu-rapport-audit-seo | "Comprendre le contenu d'un rapport d'audit SEO" | Section "Pour aller plus loin" | Contextuel |
| /outils | "Voir tous les outils SEO" | CTA final | Navigation |
| /audit-seo | "Demander un audit gratuit" | CTA final | Conversion |

**Total liens internes** : 5 ⚠️ (insuffisant)

### E. Schema JSON-LD

```json
{
  "@type": "SoftwareApplication",  // ⚠️ Différent des autres (WebApplication)
  "name": "Extracteur de mots-clés gratuit",
  "applicationCategory": "WebApplication",
  "operatingSystem": "Any"
}
```

**Schémas manquants** :
- ❌ BreadcrumbList (le composant Breadcrumb l'ajoute normalement)
- ❌ FAQPage

### F. Diagnostic

**✅ Points OK :**
- Outil fonctionnel avec extraction bi/tri-grammes
- Stop words français complets
- Contenu éditorial explicatif
- Liens vers /audit-seo et /outils/audit-seo-gratuit

**⚠️ À améliorer (P1) :**
- Utiliser SoftwareApplication → WebApplication (cohérence)
- Ajouter liens vers pages villes
- Enrichir contenu éditorial (650 → 1200 mots)

**🔴 Critique (P0) :**
- **METADATA MANQUANTES** : title, meta description, canonical absents
- **FAQPage schema manquant** (tous les autres outils en ont)
- Le fichier utilise `"use client"` au niveau page → impossible d'exporter metadata Next.js
- **SOLUTION** : Créer un fichier `page.tsx` avec metadata + layout.tsx, puis importer le composant client

---

## MATRICE DE MAILLAGE DU SILO

### Liens sortants par page

| Page source | /outils | audit-seo | testeur-ia | simulateur | robots.txt | schema | extracteur | Autres |
|-------------|---------|-----------|------------|------------|------------|--------|------------|--------|
| /outils (index) | — | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | 9 liens |
| audit-seo-gratuit | ❌ | — | ✅ | ✅ | ❌ | ✅ | ❌ | 8 liens |
| testeur-visibilite-ia | ❌ | ✅ | — | ✅ | ✅ | ✅ | ❌ | 6 liens |
| simulateur-local | ❌ | ✅ | ✅ | — | ❌ | ✅ | ❌ | 1 lien |
| robots.txt | ❌ | ✅ | ✅ | ❌ | — | ✅ | ❌ | 7 liens |
| schema-json-ld | ❌ | ✅ | ✅ | ❌ | ✅ | — | ❌ | 7 liens |
| extracteur-mots-cles | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | — | 2 liens |

### Analyse du maillage

**Score cocon sémantique** : 67% (28/42 liens possibles)

**Liens manquants critiques** :
1. Index /outils → extracteur-mots-cles ❌
2. Simulateur-local → articles SEO local ❌
3. Simulateur-local → pages villes ❌
4. Extracteur → autres outils ❌

### Ancres de liens — Qualité

| Ancre | Destination | Qualité |
|-------|-------------|---------|
| "Audit SEO Gratuit" | /outils/audit-seo-gratuit | ✅ Exacte |
| "Testeur Visibilité IA" | /outils/testeur-visibilite-ia | ✅ Exacte |
| "générateur robots.txt" | /outils/generateur-robots-txt | ✅ Exacte |
| "Générateur Schema JSON-LD" | /outils/generateur-schema-json-ld | ✅ Exacte |
| "testeur de visibilité IA" | /outils/testeur-visibilite-ia | ✅ Variante |
| "audit SEO professionnel" | /audit-seo | ✅ Contextuelle |
| "stratégie de référencement" | /referencement-naturel | ✅ Contextuelle |

**Qualité des ancres** : Excellente — variété contextuelle + exacte

---

## DIAGNOSTIC GLOBAL ET TOP 5 ACTIONS

### Récapitulatif par page

| Page | Title | Meta | Schema | Maillage | Contenu | Score /5 |
|------|-------|------|--------|----------|---------|----------|
| /outils | ✅ | ✅ | ✅ | ✅ | ⚠️ 600w | 4.5 |
| audit-seo-gratuit | ✅ | ⚠️ | ✅ | ✅ | ⚠️ 800w | 4 |
| testeur-visibilite-ia | ✅ | ⚠️ | ✅ | ✅ | ✅ 1800w | 4.5 |
| simulateur-local | ⚠️ | ✅ | ✅ | 🔴 4 liens | ⚠️ 700w | 3 |
| robots.txt | ✅ | ⚠️ | ✅ | ✅ | ✅ 1200w | 4.5 |
| schema-json-ld | ✅ | ✅ | ✅ | ✅ | ⚠️ 900w | 4 |
| extracteur-mots-cles | 🔴 | 🔴 | ⚠️ | ⚠️ 5 liens | ⚠️ 650w | 1.5 |

### TOP 5 ACTIONS PRIORITAIRES

#### 🔴 P0 — Critique (à faire immédiatement)

**1. Corriger /outils/extracteur-mots-cles : metadata manquantes**
- Problème : Le fichier est un Client Component ("use client") qui ne peut pas exporter `metadata`
- Impact : Page invisible pour Google (pas de title, pas de canonical, pas de meta desc)
- Solution :
  - Créer `app/outils/extracteur-mots-cles/page.tsx` (Server Component avec metadata)
  - Renommer le composant actuel en `ExtracteurClient.tsx`
  - Importer et utiliser le composant client dans le nouveau page.tsx
- Metadata à ajouter :
  ```tsx
  export const metadata: Metadata = {
      title: "Extracteur de Mots-Clés Gratuit — Densité et Expressions",
      description: "Analysez un texte pour extraire les mots-clés principaux, leur densité et les expressions récurrentes. Bi-grammes, tri-grammes. Gratuit, sans inscription.",
      alternates: { canonical: "https://indhack.com/outils/extracteur-mots-cles" }
  };
  ```

**2. Ajouter FAQPage schema à /outils/extracteur-mots-cles**
- Créer 5 FAQ items cohérents avec les autres outils
- Questions suggérées :
  - "Comment fonctionne l'extracteur de mots-clés ?"
  - "Quelle densité de mots-clés est optimale pour le SEO ?"
  - "Que sont les bi-grammes et tri-grammes ?"
  - "Comment éviter le bourrage de mots-clés ?"
  - "L'outil analyse-t-il les stop words ?"

#### ⚠️ P1 — Important (à planifier)

**3. Réduire les meta descriptions trop longues**
- /outils/audit-seo-gratuit : 162 → 155 car.
- /outils/testeur-visibilite-ia : 168 → 155 car.
- /outils/generateur-robots-txt : 170 → 155 car.

**4. Améliorer le maillage de /outils/simulateur-visibilite-locale**
- Actuellement 4 liens (le plus faible du silo)
- Ajouter liens vers :
  - /blog/seo-local-nice
  - /blog/google-business-profile-guide-complet
  - /blog/google-maps-voler-clients-concurrents
  - /consultant-seo-nice
  - /consultant-seo-cannes
  - /consultant-seo-antibes

**5. Ajouter extracteur-mots-cles à l'index /outils**
- L'outil n'apparaît pas dans la liste des 5 outils
- Modifier `app/outils/page.tsx` pour inclure l'extracteur comme 6ème outil
- Mettre à jour le schema ItemList

#### 📝 P2 — Améliorations (quand possible)

- Enrichir contenu éditorial des pages à moins de 1000 mots
- Ajouter images hero avec alt optimisés
- Title /outils/simulateur-visibilite-locale : 62 → 60 car.
- Harmoniser type schema : SoftwareApplication → WebApplication sur extracteur

---

## DONNÉES CLÉS DU SILO

| Métrique | Valeur |
|----------|--------|
| Nombre de pages | 7 |
| Total mots estimés | 6 650 |
| Moyenne mots/page | 950 |
| Pages avec FAQPage | 6/7 (86%) |
| Pages avec WebApplication | 6/7 (86%) |
| Score maillage cocon | 67% |
| Meta descriptions OK | 4/7 |
| Titles OK | 6/7 |
| P0 identifiés | 2 |
| P1 identifiés | 3 |

---

*Audit généré le 2026-02-19 — Silo Outils*
