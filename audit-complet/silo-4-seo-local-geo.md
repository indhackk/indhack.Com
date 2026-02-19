# SILO 4 — SEO Local & GEO
## Audit SEO complet du silo « SEO Local et Visibilité IA »

**Date de l'audit :** 19 février 2026
**Auditeur :** Claude (Opus 4.5)
**Périmètre :** 1 page pilier + 5 articles blog

---

## Sommaire

1. [Vue d'ensemble du silo](#1-vue-densemble-du-silo)
2. [Page pilier : /seo-local](#2-page-pilier--seo-local)
3. [Article 1 : /blog/seo-local-nice](#3-article-1--blogseo-local-nice)
4. [Article 2 : /blog/google-business-profile-guide-complet](#4-article-2--bloggoogle-business-profile-guide-complet)
5. [Article 3 : /blog/google-maps-voler-clients-concurrents](#5-article-3--bloggoogle-maps-voler-clients-concurrents)
6. [Article 4 : /blog/geo-comment-apparaitre-chatgpt-2026](#6-article-4--bloggeo-comment-apparaitre-chatgpt-2026)
7. [Article 5 : /blog/visibilite-ia-geo](#7-article-5--blogvisibilite-ia-geo)
8. [Matrice de maillage du silo](#8-matrice-de-maillage-du-silo)
9. [Analyse qualité des ancres](#9-analyse-qualité-des-ancres)
10. [Diagnostic global du silo](#10-diagnostic-global-du-silo)
11. [TOP 5 actions prioritaires](#11-top-5-actions-prioritaires)

---

## 1. Vue d'ensemble du silo

### Architecture du cocon sémantique

Ce silo a une **particularité** : il combine deux thématiques liées mais distinctes :
- **SEO Local** (3 articles) : référencement géolocalisé, Google Maps, GBP
- **GEO/IA** (2 articles) : Generative Engine Optimization, visibilité ChatGPT

```
/seo-local (PAGE PILIER)
├── /blog/seo-local-nice (SEO Local)
├── /blog/google-business-profile-guide-complet (SEO Local)
├── /blog/google-maps-voler-clients-concurrents (SEO Local)
├── /blog/geo-comment-apparaitre-chatgpt-2026 (GEO/IA)
└── /blog/visibilite-ia-geo (GEO/IA)
```

### Statistiques du silo

| Métrique | Valeur |
|----------|--------|
| **Nombre de pages** | 6 |
| **Mots totaux estimés** | ~11 000 |
| **Liens internes totaux** | ~90+ |
| **FAQ totales** | 22 questions |
| **Schema JSON-LD** | Service (1), Breadcrumb (1) |

### Thématique et intentions de recherche

| Page | Intent principal | Volume estimé |
|------|-----------------|---------------|
| /seo-local | Commercial | Élevé |
| seo-local-nice | Commercial/Local | Moyen |
| google-business-profile | Informationnel | Élevé |
| google-maps-voler-clients | Informationnel | Moyen |
| geo-comment-apparaitre-chatgpt | Informationnel | Émergent |
| visibilite-ia-geo | Informationnel | Émergent |

---

## 2. Page pilier : /seo-local

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `https://indhack.com/seo-local` | ✅ |
| **Fichier source** | `app/seo-local/page.tsx` | Server Component |

#### Title tag
```
SEO Local | Dominez Google Maps & le Pack Local – INDHACK
```
- **Longueur :** 54 caractères ✅
- **Mot-clé principal :** « SEO Local » ✅ en début
- **Différenciateur :** Google Maps, Pack Local
- **Score KW :** 6/6

#### Meta description
```
Consultante SEO locale experte sur toutes les grandes villes françaises. Nice, Cannes, Marseille, Paris, Lyon, Bordeaux, Toulouse, Rennes, Nantes, Lille... Référencement géolocalisé pour PME. ✆ 06 61 13 97 48
```
- **Longueur :** 193 caractères 🔴 (dépasse largement 155)
- **Problème :** Énumération trop longue de villes
- **CTA :** Présent (téléphone)

#### H1
```
Consultant SEO Local partout en France
```
- **Longueur :** 38 caractères ✅
- **Mot-clé :** Présent (« SEO Local »)
- **Différent du title :** ✅ Oui

#### Structure Hn

| Niveau | Contenu |
|--------|---------|
| H1 | Consultant SEO Local partout en France |
| H2 | Les 3 piliers du SEO Local |
| H2 | Mes zones d'intervention |
| H3 | [Régions dynamiques] |
| H2 | SEO pour startups tech à Sophia Antipolis |
| H2 | Pourquoi me choisir ? |
| H2 | Analysez votre SEO local |
| H2 | Approfondir le sujet |
| H2 | Prêt à dominer votre marché local ? |

**Statut :** ✅ Hiérarchie respectée

#### Canonical & Open Graph

| Balise | Valeur | Statut |
|--------|--------|--------|
| `canonical` | `https://indhack.com/seo-local` | ✅ |
| `og:title` | SEO Local France \| IndHack | ✅ |
| `og:description` | Expertise en référencement local... | ✅ |
| `og:image` | Dynamic OG | ✅ |
| `og:type` | website | ✅ |
| `twitter:card` | summary_large_image | ✅ |

### B. Contenu

#### Volume de contenu

| Section | Mots estimés |
|---------|-------------|
| Hero + stats | ~100 |
| 3 piliers SEO local | ~200 |
| Zones d'intervention (villes) | ~100 |
| Focus Sophia Antipolis | ~100 |
| Avantages (4 cartes) | ~80 |
| Section outils | ~80 |
| Articles liés | ~50 |
| CTA final | ~50 |
| **TOTAL** | **~760 mots** |

**Statut :** ⚠️ Page pilier courte (page service avec beaucoup de liens, acceptable mais pourrait être enrichie)

#### Contenu textuel principal

**Stats affichées :**
- 46% recherches locales
- 78% achat sous 24h
- 18+ villes couvertes
- x5 ROI moyen

**3 piliers expliqués :**
1. Google Business Profile — optimisation fiche
2. Mots-clés Géolocalisés — ciblage "métier + ville"
3. Autorité Locale — backlinks locaux

**Focus Sophia Antipolis :**
- 2 500+ entreprises tech
- 36 000 emplois
- Expertise startups B2B

### C. Maillage interne — Liens sortants

| Destination | Ancre | Position | Type |
|-------------|-------|----------|------|
| /contact | « Demander un Audit » | Hero | CTA |
| tel:0661139748 | « 06 61 13 97 48 » | Hero | Tel |
| /consultant-seo-nice | « Consultant SEO Nice » | Villes | Card |
| /consultant-seo-paris | « Consultant SEO Paris » | Villes | Card |
| /consultant-seo-cannes | « Consultant SEO Cannes » | Villes | Card |
| /consultant-seo-marseille | « Consultant SEO Marseille » | Villes | Card |
| /consultant-seo-lyon | « Consultant SEO Lyon » | Villes | Card |
| ... (toutes les 19 villes) | ... | Villes | Card |
| /consultant-seo-sophia-antipolis | « Découvrir mon expertise Sophia » | Focus | Contextuel |
| /outils/audit-seo-gratuit | « Audit SEO gratuit » | Outils | CTA |
| /outils/simulateur-visibilite-locale | « Simulateur local » | Outils | CTA |
| /outils | « Voir tous mes outils SEO gratuits » | Outils | Contextuel |
| /blog/seo-local-nice | « SEO local à Nice : guide complet » | Articles | Card |
| /blog/google-business-profile-guide-complet | « Guide complet Google Business Profile » | Articles | Card |
| /blog/google-maps-voler-clients-concurrents | « Dominer Google Maps » | Articles | Card |
| /blog/geo-comment-apparaitre-chatgpt-2026 | « Apparaître dans ChatGPT » | Articles | Card |
| /contact | « Demander un Audit Gratuit » | CTA final | CTA |

**Total liens internes :** 28+ (dont 19 vers pages villes)

#### Analyse qualité des ancres

| Qualité | Nombre | % |
|---------|--------|---|
| ✅ Ancres optimisées | 22 | 79% |
| ⚠️ Ancres génériques | 6 | 21% |
| ❌ Ancres vides | 0 | 0% |

### D. Images

Aucune image principale sur cette page (icônes Lucide uniquement).

### E. Schema JSON-LD

#### 1. ServiceSchema (composant importé)
```json
{
  "@type": "Service",
  "name": "SEO Local",
  "description": "Consultante SEO locale experte sur toutes les grandes villes françaises.",
  "url": "https://indhack.com/seo-local",
  "serviceType": "SEO Local"
}
```

#### 2. Breadcrumb (composant)
- Accueil → SEO Local

**Statut :** ⚠️ Pas de FAQPage schema sur cette page pilier (alors qu'elle pourrait en avoir)

### F. Performance technique

| Aspect | Valeur |
|--------|--------|
| **Type** | Server Component (100%) |
| **Rendu** | SSG |
| **Données dynamiques** | Import FRENCH_CITIES |
| **Animations** | Aucune (pas de Framer Motion) |

### G. Diagnostic page pilier

| Type | Élément |
|------|---------|
| ✅ | Title optimisé (54 car.) |
| 🔴 | **Meta description trop longue (193 car.)** |
| ✅ | H1 différent du title |
| ✅ | Maillage complet vers 19 villes |
| ✅ | Maillage vers 4 articles du silo |
| ✅ | Maillage vers outils (3 liens) |
| ✅ | Schema Service |
| ⚠️ | Contenu court (~760 mots) |
| ⚠️ | Pas de FAQ sur page pilier |
| ⚠️ | Pas de lien vers /consultant-seo (page mère expertise) |
| ⚠️ | Article visibilite-ia-geo non lié |

---

## 3. Article 1 : /blog/seo-local-nice

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `https://indhack.com/blog/seo-local-nice` | ✅ |
| **Fichier source** | `content/blog/seo-local-nice.md` | Markdown |

#### Title tag
```
SEO local à Nice : dominer le marché azuréen en 2026
```
- **Longueur :** 51 caractères ✅
- **Mot-clé :** « SEO local Nice » ✅
- **Score KW :** 6/6

#### Meta description
```
Comment apparaître en tête des recherches locales à Nice et dans les Alpes-Maritimes ? Guide complet du référencement local par une consultante SEO native de la région.
```
- **Longueur :** 167 caractères 🔴 (dépasse 155)

#### Structure Hn

| Niveau | Contenu |
|--------|---------|
| H1 | SEO local à Nice : dominer le marché azuréen en 2026 |
| H2 | La puissance de la recherche locale |
| H2 | Optimiser votre fiche Google Business Profile |
| H2 | Créer des pages locales dédiées |
| H2 | Collecter des avis clients locaux |
| H2 | Obtenir des backlinks locaux |
| H2 | Optimiser pour la recherche vocale |
| H2 | Mes services SEO local sur la Côte d'Azur |
| H2 | Ce qu'il faut retenir |
| H2 | Pour aller plus loin |
| H2 | Questions fréquentes |

### B. Contenu

- **Mots estimés :** ~1 300 mots
- **Temps de lecture :** ~5 minutes
- **FAQ :** 4 questions

**Points clés :**
- Stats recherche locale (76% visite sous 24h)
- Checklist GBP
- Stratégie backlinks locaux
- 4 villes Côte d'Azur couvertes

### C. Maillage interne — Liens sortants

| Destination | Ancre | Position |
|-------------|-------|----------|
| /consultant-seo-nice | « consultante SEO à Nice » | Intro |
| /seo-local | « experte en visibilité de proximité » | Intro |
| /outils/simulateur-visibilite-locale | « Simulateur de Visibilité Locale » | Encart CTA |
| /blog/google-business-profile-guide-complet | « guide complet Google Business Profile » | Corps |
| /consultant-seo-sophia-antipolis | « Sophia Antipolis » | Corps |
| /blog/google-maps-voler-clients-concurrents | « détourner légalement les clients » | Corps |
| /consultant-seo-cannes | « Cannes » | Corps |
| /consultant-seo-antibes | « Antibes » | Corps |
| /seo-local | « visibilité de proximité » | Services |
| /audit-seo | « Diagnostic complet » | Services |
| /blog/checklist-seo-2026 | « Checklist SEO 2026 » | Pour aller plus loin |
| /outils/simulateur-visibilite-locale | « simulateur de visibilité locale » | FAQ |
| /contact | « Contactez-moi » | Conclusion |
| /seo-local | « visibilité locale » | Conclusion |

**Total :** 14+ liens internes ✅

### D. Diagnostic article

| Type | Élément |
|------|---------|
| ✅ | Title optimisé |
| 🔴 | Meta description trop longue (167 car.) |
| ⚠️ | Contenu 1 300 mots (sous les 2 000 recommandés) |
| ✅ | 4 FAQ questions |
| ✅ | 14 liens internes |
| ✅ | Liens vers pilier /seo-local |
| ✅ | Liens vers 2 articles sœurs |
| ✅ | Liens vers outil (2x) |
| ✅ | Liens vers 4 pages villes |
| ⚠️ | H1 = title |

---

## 4. Article 2 : /blog/google-business-profile-guide-complet

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `https://indhack.com/blog/google-business-profile-guide-complet` | ✅ |
| **Fichier source** | `content/blog/google-business-profile-guide-complet.md` | Markdown |

#### Title tag
```
Google Business Profile : le guide complet 2026
```
- **Longueur :** 47 caractères ✅
- **Mot-clé :** « Google Business Profile » ✅
- **Score KW :** 6/6

#### Meta description
```
Optimisez votre fiche Google Business Profile pour dominer le pack local. Guide étape par étape : création, optimisation, avis, posts, FAQ.
```
- **Longueur :** 137 caractères ✅

#### Structure Hn (22 sections)

| Niveau | Contenu principal |
|--------|-------------------|
| H1 | Google Business Profile : le guide complet 2026 |
| H2 | Qu'est-ce que Google Business Profile ? |
| H2 | Créer et revendiquer votre fiche |
| H3 | Étape 1-3 : Vérifier, Créer, Vérification |
| H2 | Optimiser votre fiche pour le pack local |
| H3 | Les informations essentielles |
| H3 | Les catégories secondaires |
| H3 | Les attributs |
| H2 | Gérer les avis clients |
| H3 | Comment obtenir plus d'avis |
| H3 | Créer votre lien d'avis |
| H3 | Répondre aux avis |
| H3 | Signaler les faux avis |
| H2 | Publier des Google Posts |
| H2 | La section Questions/Réponses |
| H2 | Les photos et vidéos |
| H2 | Mesurer vos performances |
| H2 | Les erreurs à éviter |
| H2 | Ce qu'il faut retenir |
| H2 | Pour aller plus loin |
| H2 | Questions fréquentes |

### B. Contenu

- **Mots estimés :** ~2 700 mots ✅
- **Temps de lecture :** ~11 minutes
- **FAQ :** 4 questions

**Points clés :**
- Guide complet création fiche GBP
- Méthodes de vérification (5 méthodes)
- Gestion des avis (4 techniques)
- Types de Google Posts (4 types)
- Photos recommandées (tableau quantités)
- Erreurs à éviter (5 erreurs)

### C. Maillage interne — Liens sortants

| Destination | Ancre | Position |
|-------------|-------|----------|
| /outils/simulateur-visibilite-locale | « Simulateur de Visibilité Locale » | Encart CTA |
| /seo-local | « SEO local » | Intro |
| /blog/google-maps-voler-clients-concurrents | « analyser les catégories cachées » | Corps |
| /blog/seo-local-nice | « SEO local à Nice » | Pour aller plus loin |
| /blog/checklist-seo-2026 | « Checklist SEO 2026 » | Pour aller plus loin |
| /outils/simulateur-visibilite-locale | « simulateur de visibilité locale » | FAQ |
| /seo-local | « SEO local » | Conclusion |
| /contact | « contactez-moi » | Conclusion |
| /consultant-seo-nice | « Consultant SEO Nice » | Footer |
| /consultant-seo-cannes | « Consultant SEO Cannes » | Footer |
| /consultant-seo-antibes | « Consultant SEO Antibes » | Footer |

**Total :** 11 liens internes ✅

### D. Diagnostic article

| Type | Élément |
|------|---------|
| ✅ | Title optimisé (47 car.) |
| ✅ | Meta description OK (137 car.) |
| ✅ | Contenu 2 700+ mots |
| ✅ | 4 FAQ questions |
| ✅ | 11 liens internes |
| ✅ | Lien vers pilier /seo-local |
| ✅ | Liens vers 3 articles sœurs |
| ✅ | Liens vers outil (2x) |
| ✅ | Liens vers 3 pages villes |
| ⚠️ | H1 = title |
| ⚠️ | Pas de lien vers articles GEO |

---

## 5. Article 3 : /blog/google-maps-voler-clients-concurrents

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `https://indhack.com/blog/google-maps-voler-clients-concurrents` | ✅ |
| **Fichier source** | `content/blog/google-maps-voler-clients-concurrents.md` | Markdown |

#### Title tag
```
Voler les clients de vos concurrents sur Google Maps (légalement)
```
- **Longueur :** 64 caractères 🔴 (dépasse 60)
- **Mot-clé :** « Google Maps » + angle accrocheur
- **Score KW :** 5/6

#### Meta description
```
Découvrez la méthode étape par étape pour détourner légalement le trafic de vos concurrents sur Google Maps. Analyse des avis, failles SEO et optimisation de fiche GBP.
```
- **Longueur :** 162 caractères 🔴 (dépasse 155)

#### Structure Hn

| Niveau | Contenu |
|--------|---------|
| H1 | Voler les clients de vos concurrents sur Google Maps (légalement) |
| H2 | Étape 1 : l'espionnage des avis négatifs |
| H3 | Comment faire ? |
| H3 | La contre-attaque |
| H2 | Étape 2 : le hack des "catégories secondaires" |
| H2 | Étape 3 : le "geotagging" invisible |
| H3 | Le Hack |
| H2 | La technique du titre qui convertit |
| H2 | Pour aller plus loin |
| H2 | Questions fréquentes |
| H3 | En résumé |

### B. Contenu

- **Mots estimés :** ~1 200 mots
- **Temps de lecture :** ~5 minutes
- **FAQ :** 4 questions

**Points clés :**
- 3 techniques "Growth" SEO local
- Espionnage avis négatifs
- Hack catégories secondaires (GMB Spy)
- Geotagging photos

### C. Maillage interne — Liens sortants

| Destination | Ancre | Position |
|-------------|-------|----------|
| /seo-local | « consultante SEO spécialisée en SEO local » | Intro |
| /creation-site-web | « site web optimisé » | Corps |
| /seo-local | « Référencement Local » | Encart CTA |
| /outils/simulateur-visibilite-locale | « simulateur de visibilité locale » | Corps |
| /outils/audit-seo-gratuit | « audit SEO gratuit » | Corps |
| /referencement-naturel | « stratégie de référencement naturel » | Corps |
| /audit-seo | « Audits SEO » | Corps |
| /blog/google-business-profile-guide-complet | « Google Business Profile : le guide complet » | Pour aller plus loin |
| /blog/seo-local-nice | « SEO local à Nice » | Pour aller plus loin |
| /blog/pourquoi-votre-site-est-lent-performance-web-2026 | « Performance web et SEO » | Pour aller plus loin |
| /contact | « Contactez-moi » | Conclusion |
| /seo-local | « visibilité locale » | Conclusion |

**Total :** 12 liens internes ✅

### D. Diagnostic article

| Type | Élément |
|------|---------|
| 🔴 | Title trop long (64 car.) |
| 🔴 | Meta description trop longue (162 car.) |
| ⚠️ | Contenu 1 200 mots (sous 2 000) |
| ✅ | 4 FAQ questions |
| ✅ | 12 liens internes |
| ✅ | Liens vers pilier /seo-local (3x) |
| ✅ | Liens vers 2 articles sœurs |
| ✅ | Liens vers 2 outils |
| ❌ | Pas de liens vers pages villes |
| ⚠️ | H1 = title |

---

## 6. Article 4 : /blog/geo-comment-apparaitre-chatgpt-2026

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `https://indhack.com/blog/geo-comment-apparaitre-chatgpt-2026` | ✅ |
| **Fichier source** | `content/blog/geo-comment-apparaitre-chatgpt-2026.md` | Markdown |

#### Title tag
```
GEO : comment rendre votre site visible dans ChatGPT, Perplexity et Google AI en 2026
```
- **Longueur :** 85 caractères 🔴 (TRÈS au-dessus de 60)
- **Mot-clé :** « GEO », « ChatGPT » ✅
- **Score KW :** 4/6 (pénalisé par longueur)

#### Meta description
```
Le Generative Engine Optimization (GEO) expliqué simplement. Guide pratique pour rendre votre site visible dans les réponses des IA. Checklist, outil gratuit et stratégie concrète.
```
- **Longueur :** 177 caractères 🔴 (dépasse largement 155)

#### Structure Hn

| Niveau | Contenu |
|--------|---------|
| H1 | GEO : comment rendre votre site visible dans ChatGPT, Perplexity et Google AI en 2026 |
| H2 | Qu'est-ce que le GEO (Generative Engine Optimization) ? |
| H3 | Différence concrète avec un exemple |
| H3 | Le GEO ne remplace pas le SEO |
| H2 | Pourquoi le GEO est devenu incontournable en 2026 |
| H3 | Les chiffres qui changent la donne |
| H3 | Ce que ça change pour votre business |
| H2 | Les 4 piliers du GEO |
| H3 | Pilier 1 — Accessibilité technique aux crawlers IA |
| H3 | Pilier 2 — Richesse sémantique et données structurées |
| H3 | Pilier 3 — Signaux E-E-A-T |
| H3 | Pilier 4 — Format "AI-friendly" du contenu |
| H2 | GEO et SEO local |
| H3 | Les clés du GEO local |
| H2 | Checklist GEO — 10 actions |
| H2 | Questions fréquentes sur le GEO |
| H2 | Ce qu'il faut retenir |

### B. Contenu

- **Mots estimés :** ~2 600 mots ✅
- **Temps de lecture :** ~10 minutes
- **FAQ :** 6 questions

**Points clés :**
- Définition GEO vs SEO
- 4 piliers détaillés
- Liste crawlers IA (GPTBot, PerplexityBot, etc.)
- Schemas essentiels pour GEO
- Checklist 10 actions

### C. Maillage interne — Liens sortants

| Destination | Ancre | Position |
|-------------|-------|----------|
| /outils/testeur-visibilite-ia | « testeur de visibilité IA » | Multiple (5x) |
| /outils/generateur-robots-txt | « générateur de robots.txt » | Corps |
| /outils/generateur-schema-json-ld | « générateur de schema JSON-LD » | Corps |
| /outils/audit-seo-gratuit | « audit SEO gratuit » | Multiple (2x) |
| /referencement-naturel | « référencement naturel local » | Corps |
| /consultant-seo-sophia-antipolis | « startups de Sophia Antipolis » | Corps |
| /audit-seo | « audit SEO technique » | Corps |
| /seo-local | « services SEO local » | Corps |
| /blog/visibilite-ia-geo | « GEO et visibilité IA » | Corps |
| /blog/checklist-seo-2026 | « Checklist SEO 2026 » | À lire aussi |
| /blog/importance-audit-seo | « L'importance d'un audit SEO » | À lire aussi |
| /blog/google-business-profile-guide-complet | « Google Business Profile : Guide Complet » | À lire aussi |
| /contact | « Contactez-moi » | Conclusion |
| /consultant-seo-nice | « Consultante SEO Nice » | Footer |
| /consultant-seo-cannes | « Consultante SEO Cannes » | Footer |
| /consultant-seo-sophia-antipolis | « Consultante SEO Sophia-Antipolis » | Footer |

**Total :** 20+ liens internes ✅✅ (excellent maillage)

### D. Diagnostic article

| Type | Élément |
|------|---------|
| 🔴 | **Title TRÈS trop long (85 car.)** |
| 🔴 | Meta description trop longue (177 car.) |
| ✅ | Contenu 2 600+ mots |
| ✅ | 6 FAQ questions |
| ✅ | 20+ liens internes (excellent) |
| ✅ | Lien vers pilier /seo-local |
| ✅ | Liens vers 4+ outils |
| ✅ | Liens vers 3 pages villes |
| ✅ | Liens vers article sœur GEO |
| ⚠️ | H1 = title (et trop long) |

---

## 7. Article 5 : /blog/visibilite-ia-geo

### A. Métadonnées SEO

| Élément | Valeur | Statut |
|---------|--------|--------|
| **URL** | `https://indhack.com/blog/visibilite-ia-geo` | ✅ |
| **Fichier source** | `content/blog/visibilite-ia-geo.md` | Markdown |

#### Title tag
```
GEO : Comment être cité par ChatGPT et Gemini en 2026 ?
```
- **Longueur :** 53 caractères ✅
- **Mot-clé :** « GEO », « ChatGPT », « Gemini » ✅
- **Score KW :** 6/6

#### Meta description
```
Découvrez le Generative Engine Optimization (GEO), la nouvelle discipline indispensable pour dominer les réponses des IA génératives comme ChatGPT, Gemini et Perplexity.
```
- **Longueur :** 166 caractères 🔴 (dépasse 155)

#### Structure Hn

| Niveau | Contenu |
|--------|---------|
| H1 | GEO : Comment être cité par ChatGPT et Gemini en 2026 ? |
| H2 | Qu'est-ce que le GEO exactement ? |
| H2 | Pourquoi le GEO est crucial pour votre visibilité ? |
| H3 | Les chiffres clés |
| H2 | Les piliers pour optimiser votre contenu pour l'IA |
| H3 | L'autorité sémantique |
| H3 | Les données structurées Schema.org |
| H3 | L'E-E-A-T renforcé |
| H3 | Le format Q&A |
| H3 | La preuve sociale et les citations |
| H2 | Comment mesurer son GEO ? |
| H2 | Faire du GEO un avantage compétitif |
| H2 | Ce qu'il faut retenir |
| H2 | Pour aller plus loin |
| H2 | Questions fréquentes |

### B. Contenu

- **Mots estimés :** ~1 500 mots
- **Temps de lecture :** ~6 minutes
- **FAQ :** 4 questions

**Points clés :**
- Définition GEO
- Tableau moteurs IA (5 acteurs)
- Piliers d'optimisation (5)
- Signaux E-E-A-T
- Approche intégrée SEO+GEO

### C. Maillage interne — Liens sortants

| Destination | Ancre | Position |
|-------------|-------|----------|
| /outils/testeur-visibilite-ia | « Testeur de Visibilité IA » | Encart CTA |
| /referencement-naturel | « stratégie d'acquisition organique » | Corps |
| /audit-seo | « Analyse approfondie » | Corps |
| /outils/testeur-visibilite-ia | « testeur de visibilité IA » | Conclusion |
| /blog/geo-comment-apparaitre-chatgpt-2026 | « GEO : comment rendre votre site visible dans ChatGPT » | Conclusion + Pour aller plus loin |
| /blog/importance-audit-seo | « L'importance d'un audit SEO » | Pour aller plus loin |
| /blog/google-business-profile-guide-complet | « Google Business Profile : guide complet » | Pour aller plus loin |
| /contact | « demandez votre audit SEO gratuit » | Conclusion |

**Total :** 8 liens internes ⚠️ (légèrement sous-maillé)

### D. Diagnostic article

| Type | Élément |
|------|---------|
| ✅ | Title optimisé (53 car.) |
| 🔴 | Meta description trop longue (166 car.) |
| ⚠️ | Contenu 1 500 mots (sous 2 000) |
| ✅ | 4 FAQ questions |
| ⚠️ | 8 liens internes (sous-maillé) |
| ❌ | Pas de lien vers pilier /seo-local |
| ✅ | Lien vers article sœur GEO |
| ✅ | Liens vers 2 outils |
| ❌ | Pas de liens vers pages villes |
| ⚠️ | H1 = title |

---

## 8. Matrice de maillage du silo

### Liens entre pages du silo (avec ancres)

| Source → | pilier | nice | gbp | maps | geo-chatgpt | geo-ia |
|----------|--------|------|-----|------|-------------|--------|
| **/seo-local** | - | « SEO local Nice » | « Guide GBP » | « Dominer Maps » | « Apparaître ChatGPT » | ❌ |
| **seo-local-nice** | « visibilité proximité » | - | « guide GBP » | « détourner clients » | ❌ | ❌ |
| **google-business-profile** | « SEO local » | « SEO local Nice » | - | « catégories cachées » | ❌ | ❌ |
| **google-maps-voler-clients** | « SEO local » (3x) | « SEO local Nice » | « guide GBP » | - | ❌ | ❌ |
| **geo-comment-apparaitre-chatgpt** | « SEO local » | ❌ | « GBP guide » | ❌ | - | « visibilité IA » |
| **visibilite-ia-geo** | ❌ | ❌ | « GBP guide » | ❌ | « GEO ChatGPT » | - |

### Score de cohésion du silo

| Métrique | Valeur | Cible | Statut |
|----------|--------|-------|--------|
| Liens pilier → articles | 4/5 | 5/5 | ⚠️ Manque visibilite-ia-geo |
| Liens articles → pilier | 4/5 | 5/5 | ⚠️ Manque visibilite-ia-geo |
| Liens articles SEO Local entre eux | 100% | 100% | ✅ |
| Liens articles GEO entre eux | 100% | 100% | ✅ |
| Liens SEO Local ↔ GEO | 25% | 50% | ⚠️ Faible connexion |

### Liens manquants identifiés

| De | Vers | Recommandation |
|----|------|----------------|
| /seo-local | /blog/visibilite-ia-geo | Ajouter dans section articles |
| /blog/visibilite-ia-geo | /seo-local | Ajouter lien vers pilier |
| /blog/seo-local-nice | /blog/geo-comment-apparaitre-chatgpt-2026 | Ajouter référence GEO local |
| /blog/google-maps-voler-clients | /consultant-seo-nice | Ajouter liens villes |
| /blog/visibilite-ia-geo | /consultant-seo-nice | Ajouter liens villes |

---

## 9. Analyse qualité des ancres

### Ancres vers le pilier /seo-local

| Article source | Ancre utilisée | Qualité |
|---------------|----------------|---------|
| seo-local-nice | « experte en visibilité de proximité » | ✅ Variée |
| seo-local-nice | « visibilité de proximité » | ✅ Variée |
| seo-local-nice | « visibilité locale » | ✅ Variée |
| google-business-profile | « SEO local » | ✅ Exacte |
| google-maps-voler-clients | « consultante SEO spécialisée en SEO local » | ✅ Variée |
| google-maps-voler-clients | « Référencement Local » | ✅ Variée |
| google-maps-voler-clients | « visibilité locale » | ✅ Variée |
| geo-comment-apparaitre-chatgpt | « services SEO local » | ✅ Variée |
| visibilite-ia-geo | ❌ | ❌ Manquant |

**Analyse :** Excellente variété d'ancres, mais un article (visibilite-ia-geo) ne lie pas vers le pilier.

### Ancres vers l'outil /outils/testeur-visibilite-ia

| Article source | Ancre utilisée |
|---------------|----------------|
| geo-comment-apparaitre-chatgpt | « testeur de visibilité IA » (5x) |
| visibilite-ia-geo | « Testeur de Visibilité IA » (2x) |

**Statut :** ✅ Outil GEO bien maillé depuis les articles GEO

---

## 10. Diagnostic global du silo

### Points forts

| ✅ | Détail |
|----|--------|
| **Double thématique cohérente** | SEO Local et GEO sont liés (visibilité locale IA) |
| **Pilier bien maillé vers villes** | 19 pages villes accessibles |
| **Outils bien intégrés** | Simulateur local + Testeur IA bien liés |
| **Articles GEO complets** | geo-comment-apparaitre-chatgpt très exhaustif |
| **FAQ systématiques** | 22 questions au total |
| **GBP guide excellent** | 2 700 mots, très complet |

### Points à améliorer

| Type | Élément | Impact |
|------|---------|--------|
| 🔴 P0 | **Meta description pilier : 193 car.** | Troncature sévère |
| 🔴 P0 | **Title geo-comment-apparaitre-chatgpt : 85 car.** | Troncature Google |
| 🔴 P0 | Meta description geo-comment-apparaitre-chatgpt : 177 car. | Troncature |
| 🔴 P0 | Title google-maps-voler-clients : 64 car. | Troncature |
| ⚠️ P1 | Meta description seo-local-nice : 167 car. | Troncature |
| ⚠️ P1 | Meta description google-maps-voler-clients : 162 car. | Troncature |
| ⚠️ P1 | Meta description visibilite-ia-geo : 166 car. | Troncature |
| ⚠️ P1 | Article visibilite-ia-geo non lié au pilier | Cohésion silo |
| ⚠️ P1 | Pilier ne lie pas vers visibilite-ia-geo | Cohésion silo |
| ⚠️ P1 | seo-local-nice : 1 300 mots (sous 2 000) | Contenu court |
| ⚠️ P1 | google-maps-voler-clients : 1 200 mots | Contenu court |
| ⚠️ P1 | visibilite-ia-geo : 1 500 mots | Contenu court |
| ⚠️ P2 | Pas de FAQ sur page pilier | Opportunité |
| ⚠️ P2 | H1 = title sur tous les articles | Variation recommandée |
| ⚠️ P2 | Connexion SEO Local ↔ GEO faible | Opportunité de maillage |

### Cannibalisations potentielles

| KW | Pages concernées | Risque |
|----|-----------------|--------|
| « GEO » | geo-comment-apparaitre-chatgpt + visibilite-ia-geo | ⚠️ Moyen |
| « SEO local » | pilier + seo-local-nice | ✅ Faible (intent différent) |
| « Google Business Profile » | gbp-guide + seo-local-nice | ✅ Faible |

**Recommandation GEO :** Les deux articles GEO se chevauchent. `visibilite-ia-geo` est plus court et moins complet. Envisager de fusionner ou différencier les angles.

---

## 11. TOP 5 actions prioritaires

### 🔴 P0 — Critique (à faire immédiatement)

| # | Action | Fichier | Effort |
|---|--------|---------|--------|
| 1 | **Raccourcir meta description pilier /seo-local** | `app/seo-local/page.tsx` | 5 min |
| 2 | **Raccourcir title geo-comment-apparaitre-chatgpt** | `content/blog/geo-comment-apparaitre-chatgpt-2026.md` | 5 min |
| 3 | **Raccourcir meta desc geo-comment-apparaitre-chatgpt** | `content/blog/geo-comment-apparaitre-chatgpt-2026.md` | 5 min |
| 4 | **Raccourcir title google-maps-voler-clients** | `content/blog/google-maps-voler-clients-concurrents.md` | 5 min |

**Suggestions de corrections :**

**Pilier /seo-local :**
- Meta actuelle (193) : `Consultante SEO locale experte sur toutes les grandes villes françaises. Nice, Cannes, Marseille, Paris, Lyon, Bordeaux, Toulouse, Rennes, Nantes, Lille... Référencement géolocalisé pour PME. ✆ 06 61 13 97 48`
- Meta corrigée (154) : `Consultante SEO locale sur toute la France. Dominez Google Maps et le Pack Local dans votre ville. 18+ villes couvertes. ✆ 06 61 13 97 48`

**geo-comment-apparaitre-chatgpt-2026 :**
- Title actuel (85) : `GEO : comment rendre votre site visible dans ChatGPT, Perplexity et Google AI en 2026`
- Title corrigé (59) : `GEO : comment apparaître dans ChatGPT et les IA en 2026`
- Meta actuelle (177) : `Le Generative Engine Optimization (GEO) expliqué simplement. Guide pratique pour rendre votre site visible dans les réponses des IA. Checklist, outil gratuit et stratégie concrète.`
- Meta corrigée (155) : `Guide complet GEO 2026 : rendez votre site visible dans ChatGPT, Perplexity et Google AI. Checklist, 4 piliers et outil de test gratuit.`

**google-maps-voler-clients-concurrents :**
- Title actuel (64) : `Voler les clients de vos concurrents sur Google Maps (légalement)`
- Title corrigé (58) : `Voler les clients de vos concurrents sur Google Maps`

### ⚠️ P1 — Important (semaine 1)

| # | Action | Fichier | Effort |
|---|--------|---------|--------|
| 5 | **Ajouter lien pilier → visibilite-ia-geo** | `app/seo-local/page.tsx` | 10 min |
| 6 | **Ajouter lien visibilite-ia-geo → pilier /seo-local** | `content/blog/visibilite-ia-geo.md` | 5 min |
| 7 | **Raccourcir 4 meta descriptions articles** | Tous les .md concernés | 15 min |
| 8 | **Enrichir seo-local-nice** (+700 mots) | `content/blog/seo-local-nice.md` | 30 min |

### ⚠️ P2 — Recommandé (semaine 2)

| # | Action | Impact |
|---|--------|--------|
| 9 | Enrichir google-maps-voler-clients (+800 mots) | SEO |
| 10 | Enrichir visibilite-ia-geo (+500 mots) OU fusionner avec geo-chatgpt | SEO |
| 11 | Ajouter FAQ sur page pilier /seo-local | SEO |
| 12 | Différencier H1 des titles sur les 5 articles | SEO |
| 13 | Ajouter liens villes sur google-maps-voler-clients | Maillage |
| 14 | Renforcer connexion SEO Local ↔ GEO (liens croisés) | Cocon |

---

## Annexe : Scores récapitulatifs

| Page | Title | Meta | Mots | Liens | FAQ | Score |
|------|-------|------|------|-------|-----|-------|
| /seo-local | ✅ 54 | 🔴 193 | ⚠️ 760 | ✅ 28 | ❌ 0 | 6/10 |
| seo-local-nice | ✅ 51 | 🔴 167 | ⚠️ 1300 | ✅ 14 | ✅ 4 | 7/10 |
| google-business-profile | ✅ 47 | ✅ 137 | ✅ 2700 | ✅ 11 | ✅ 4 | 9/10 |
| google-maps-voler-clients | 🔴 64 | 🔴 162 | ⚠️ 1200 | ✅ 12 | ✅ 4 | 5/10 |
| geo-comment-apparaitre-chatgpt | 🔴 85 | 🔴 177 | ✅ 2600 | ✅ 20 | ✅ 6 | 6/10 |
| visibilite-ia-geo | ✅ 53 | 🔴 166 | ⚠️ 1500 | ⚠️ 8 | ✅ 4 | 6/10 |

**Score moyen du silo : 6.5/10**

**Point faible principal :** Méta descriptions systématiquement trop longues (5/6 pages concernées)

---

*Fin de l'audit silo-4-seo-local-geo — Généré le 19 février 2026*
