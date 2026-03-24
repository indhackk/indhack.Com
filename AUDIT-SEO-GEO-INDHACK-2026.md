# Audit SEO & GEO complet — indhack.com

**Date** : 24 mars 2026
**Périmètre** : Structure technique, contenu, maillage interne, indexation, GEO, opportunités de croissance

---

## Résumé exécutif

Le site est techniquement solide (Next.js SSG, JSON-LD riche, robots.txt optimisé GEO, 91 URLs dans le sitemap, 77+ redirections 301 propres). Le cocon sémantique est bien structuré et le maillage interne des articles est excellent (9 à 28 liens internes par article, 0 lien cassé).

**Cependant, 3 problèmes critiques freinent le ranking :**

| Priorité | Problème | Impact |
|----------|----------|--------|
| 🔴 P0 | Google affiche « IndHack.com is for sale \| HugeDomains » comme title de la homepage | Catastrophique — tue le CTR et la confiance |
| 🔴 P0 | Le sous-domaine www.indhack.com retourne une erreur TLS (ERR_TLS_CERT_ALTNAME_INVALID) | Perte de trafic + signaux négatifs |
| 🟠 P1 | La page /blog n'affiche que 18 articles sur 34 publiés | 16 articles invisibles = contenu gaspillé |

---

## 1. Problèmes critiques (à corriger IMMÉDIATEMENT)

### 🔴 1.1 Title Google « IndHack.com is for sale »

**Constat** : quand on cherche `site:indhack.com` sur Google, la homepage apparaît avec le title « IndHack.com is for sale | HugeDomains ». C'est probablement un résidu du registrar ou un problème de parking page historique.

**Impact** : destruction totale du CTR sur la requête de marque. Les prospects qui cherchent « IndHack » voient un domaine à vendre.

**Actions** :
- Vérifier dans Google Search Console > Inspection d'URL > tester l'URL en direct pour la homepage
- Si le title dans le HTML est correct (il l'est : « Consultante SEO & GEO — référencement & visibilité IA »), forcer un recrawl via l'outil d'inspection
- Soumettre une demande de suppression du cache obsolète si le problème persiste
- Vérifier qu'il n'y a pas de page parking HugeDomains qui intercepte le trafic (DNS, CNAME)

### 🔴 1.2 Certificat TLS manquant pour www.indhack.com

**Constat** : `https://www.indhack.com` retourne `ERR_TLS_CERT_ALTNAME_INVALID`. Le certificat SSL ne couvre pas le sous-domaine www.

**Impact** : tout lien pointant vers www.indhack.com (backlinks, anciennes références) aboutit à une erreur. Google peut crawler les deux versions et voir des erreurs.

**Actions** :
- Ajouter `www.indhack.com` comme SAN (Subject Alternative Name) dans le certificat SSL (Vercel le fait normalement automatiquement — vérifier le domaine dans les settings Vercel)
- Configurer une redirection 301 : www.indhack.com → indhack.com
- Vérifier que la Search Console a les deux propriétés (www et non-www) et que le domaine préféré est défini

### 🟠 1.3 Blog : 16 articles manquants de l'affichage

**Constat** : 34 articles en markdown dans `content/blog/`, mais la page `/blog` n'en affiche que 18. Aucun article n'a `draft: true`.

**Hypothèses** :
- Limite de rendu côté client (pagination, lazy loading, filtre JS)
- Problème dans la fonction `getAllPosts()` dans `lib/blog.ts`

**Actions** :
- Vérifier la logique de `getAllPosts()` — y a-t-il un `.slice()` ou une limite ?
- Vérifier le composant de listing blog — y a-t-il un state qui limite le nombre d'articles ?
- S'assurer que les 34 articles sont tous rendus (même avec pagination/load more)

---

## 2. Problèmes importants (cette semaine)

### 🟠 2.1 Page /outils affiche 6 outils sur 8

**Constat** : le sitemap contient 8 outils (dont GMB Autopilot et un 8e), mais la page /outils n'en liste que 6. Deux outils sont invisibles aux visiteurs.

**Action** : ajouter les outils manquants à la page /outils.

### 🟠 2.2 Villes noindex qui apparaissent quand même dans Google

**Constat** : 9 villes sont en noindex (Strasbourg, Grenoble, Rennes, Lille, Bordeaux, Nantes, Toulouse, Lyon, Boulogne-Billancourt), mais Google indexe quand même certaines (Rennes, Nantes, Bordeaux apparaissent dans les résultats).

**Actions** :
- Vérifier que le meta robots `noindex` est bien présent dans le HTML rendu (pas seulement dans la config)
- Ajouter une directive `X-Robots-Tag: noindex` dans les headers HTTP en plus du meta tag
- Utiliser l'outil de suppression d'URL dans la Search Console pour les pages déjà indexées
- Alternative : réactiver ces pages avec du contenu unique et les remettre en index (voir section « Opportunités »)

### 🟠 2.3 Article sous le minimum de mots

**Constat** : `comment-creer-site-visible-google.md` ne fait que 1 343 mots (minimum requis : 1 500).

**Action** : enrichir de ~160 mots (développer la section comparaison agence/freelance ou ajouter un paragraphe ROI).

### 🟡 2.4 Meta description homepage trop courte

**Constat** : la meta description de la homepage fait ~75 caractères. L'idéal est 120-160 caractères pour maximiser le CTR.

**Action** : enrichir la meta description pour atteindre 140-155 caractères, en ajoutant un bénéfice concret (ex. : « +150 points analysés », « résultats en 90 jours », etc.).

---

## 3. Audit technique SEO

### ✅ Points forts

| Élément | Status |
|---------|--------|
| Sitemap XML | ✅ 91 URLs, priorités et lastmod correctes |
| Robots.txt | ✅ Bien configuré, bots IA autorisés |
| Redirections 301 | ✅ 77+ redirections propres (WordPress cleanup, normalisation, décannibalisation) |
| JSON-LD | ✅ 5 schemas sur la homepage (Organization, ProfessionalService, Person, WebSite, FAQPage) |
| Canonical | ✅ Présent sur toutes les pages vérifiées |
| Open Graph / Twitter Cards | ✅ Complet |
| Images | ✅ WebP/AVIF, width/height, alt tags |
| CSS optimisé | ✅ `optimizeCss: true` dans next.config |
| Trailing slash | ✅ Normalisé (false) |
| llms.txt | ✅ Présent et bien structuré pour le GEO |
| Glossaire SEO | ✅ 58 définitions avec DefinedTermSet schema |

### ⚠️ Points à améliorer

| Élément | Problème | Action |
|---------|----------|--------|
| Hreflang | Absent | Pas critique (site monolingue FR), mais à ajouter si expansion internationale |
| Breadcrumbs schema | Présent sur /consultant-seo, absent sur homepage | Vérifier la cohérence sur toutes les pages |
| lastmod des pages villes | Toutes au 2026-02-18 | Mettre à jour au prochain déploiement pour signaler du contenu frais |
| changefreq homepage | « daily » | Cohérent uniquement si le contenu change vraiment souvent |

---

## 4. Audit du contenu

### Blog : 34 articles publiés

| Métrique | Valeur |
|----------|--------|
| Nombre d'articles | 34 |
| Longueur moyenne | ~2 430 mots |
| Article le plus long | contenu-rapport-audit-seo (4 033 mots) |
| Article le plus court | comment-creer-site-visible-google (1 343 mots) ⚠️ |
| Liens internes min/max | 9 / 28 par article |
| Liens cassés | 0 ✅ |
| Articles sans lien outil | 0 ✅ |
| Articles sans lien blog croisé | 0 ✅ |

### Répartition thématique

| Thème | Articles | Observation |
|-------|----------|-------------|
| GEO / IA | 10 | Très bien couvert — différenciant |
| SEO technique / audit | 7 | Solide |
| SEO local / Google Maps | 4 | Bon, mais extensible |
| Création site / performance | 4 | Suffisant |
| Carrière SEO | 4 | Trafic informationnel, utile pour l'autorité |
| Google Updates / Discover | 3 | Actualité — bon pour Discover |
| Études de cas | 2 | Point fort — à développer |

### Pages de service : 6 principales + sous-pages

Toutes les pages de service ont : title optimisé, meta description, H1, JSON-LD, FAQ schema, CTA multiples. Rien de critique à corriger.

### Pages villes : 10 indexées, 9 en noindex

Les 10 villes actives (Nice, Cannes, Antibes, Juan-les-Pins, Marseille, Monaco, Sophia-Antipolis, Aix-en-Provence, Paris, Montpellier) sont bien optimisées avec contenu unique, context data, et villes voisines liées.

---

## 5. Audit GEO (visibilité dans les IA)

### ✅ Points forts GEO

| Élément | Status |
|---------|--------|
| llms.txt | ✅ Présent, bien structuré |
| Robots.txt bots IA | ✅ GPTBot, ClaudeBot, PerplexityBot, Google-Extended tous autorisés |
| CCBot bloqué | ✅ (Common Crawl — pas utile pour le GEO) |
| Testeur visibilité IA | ✅ Outil unique en français — fort différenciant |
| Contenu E-E-A-T | ✅ Première personne, données chiffrées, études de cas |
| JSON-LD riche | ✅ Facilite le parsing par les LLMs |
| Étude de cas Vultifrine | ✅ Excellent pour démontrer l'expertise GEO |
| Laboratoire GEO | ✅ Pages expérimentales Vultifrine dans le sitemap |
| Glossaire avec DefinedTermSet | ✅ Aide les IA à comprendre les concepts |

### ⚠️ Améliorations GEO

| Élément | Action |
|---------|--------|
| FAQ en bas de page uniquement | Remonter les Q/R dans le corps du contenu pour que les IA les captent plus facilement |
| Pas de page « GEO : qu'est-ce que c'est ? » | Créer une page pilier /geo ou /generative-engine-optimization comme page mère du cocon GEO |
| dateModified | Mettre à jour systématiquement dans les JSON-LD à chaque modification |
| Citations de sources | Ajouter plus de sources externes chiffrées dans les articles (études Semrush, Ahrefs, Google) pour renforcer la crédibilité LLM |
| Structured Q&A format | Intégrer plus de format « Question → Réponse directe » dans les articles pour le format de réponse des IA |

---

## 6. Maillage interne

### ✅ Ce qui fonctionne

- Tous les articles ont 9-28 liens internes (objectif 7-10 dépassé)
- 0 lien cassé
- 100 % des articles lient vers au moins un outil et un autre article
- Le cocon sémantique est respecté (pages mères → filles → sœurs)
- Le footer fournit un maillage dense (~40 liens)
- Le glossaire fait un excellent hub de liens internes

### ⚠️ À renforcer

| Point | Action |
|-------|--------|
| Articles bas en liens (9-10) | Enrichir `quelle-formation-seo`, `consultant-ia-expert`, `agents-ia-developpeurs`, `google-core-update`, `salaire-consultant-seo` |
| Ancres trop génériques | Vérifier qu'aucun « cliquez ici » ou « en savoir plus » n'est utilisé comme ancre |
| Liens blog → études de cas | Les études de cas (`/etudes-de-cas`, `/etude/*`) sont peu liées depuis le blog |
| Liens blog → glossaire | Le glossaire est un actif SEO fort — lier les termes techniques des articles vers le glossaire |

---

## 7. Opportunités de nouvelles pages

### 🎯 Pages à fort potentiel SEO

| Page proposée | URL suggérée | Mot-clé cible | Justification |
|---------------|-------------|---------------|---------------|
| Page mère GEO | /generative-engine-optimization | GEO, generative engine optimization | Manque une page pilier pour le cocon GEO — actuellement dispersé entre blog et /consultant-geo |
| Consultant SEO e-commerce | /consultant-seo-ecommerce | consultant SEO e-commerce | Complète /creation-boutique-en-ligne avec un angle consulting |
| SEO pour SaaS | /seo-saas | SEO SaaS, référencement SaaS | Niche B2B à forte valeur |
| Audit SEO local | /audit-seo-local | audit SEO local | Complète /seo-local et /audit-seo, crée un pont |
| Tarifs consultant SEO | /tarifs-consultant-seo | tarif consultant SEO, prix consultant SEO | Requête transactionnelle forte — actuellement redirigée vers /referencement-naturel |
| Comparatif outils SEO | /blog/comparatif-outils-seo-2026 | meilleur outil SEO 2026 | Trafic informationnel élevé + backlink magnet |
| Guide Google Ads vs SEO complet | /blog/google-ads-vs-seo-guide-complet | Google Ads vs SEO | Élargit au-delà du /blog/seo-vs-sea-que-choisir actuel |
| Cas client SEO local (Nice, restaurant) | /etudes-de-cas/seo-local-restaurant-nice | étude de cas SEO local | Renforce E-E-A-T + SEO local |
| Comment choisir son agence SEO | /blog/comment-choisir-agence-seo | choisir agence SEO | Requête pré-achat — oriente vers toi vs agence |

### 🎯 Pages villes à réactiver

Les 9 villes en noindex représentent un potentiel énorme si le contenu est suffisamment différencié :

| Ville | Potentiel | Action recommandée |
|-------|-----------|--------------------|
| Lyon | ⭐⭐⭐⭐⭐ | Très forte concurrence mais gros volume — réactiver avec contenu unique renforcé |
| Bordeaux | ⭐⭐⭐⭐ | Marché dynamique, potentiel élevé |
| Toulouse | ⭐⭐⭐⭐ | Bassin tech Airbus/aérospatial |
| Lille | ⭐⭐⭐ | Bon potentiel B2B |
| Nantes | ⭐⭐⭐ | Écosystème tech en croissance |
| Rennes | ⭐⭐⭐ | Pôle numérique breton |
| Strasbourg | ⭐⭐ | Niche mais moins concurrentiel |
| Grenoble | ⭐⭐ | Tech/innovation |
| Boulogne-Billancourt | ⭐⭐ | Complémentaire à Paris |

**Recommandation** : réactiver Lyon, Bordeaux et Toulouse en priorité avec du contenu enrichi et des données locales uniques (nombre d'entreprises, concurrence Google Maps locale, etc.).

### 🎯 Nouveaux articles blog suggérés

| Titre proposé | Mot-clé cible | Type |
|---------------|---------------|------|
| SEO YouTube : guide complet pour ranker vos vidéos en 2026 | SEO YouTube | Guide |
| Google SGE / AI Mode : comment adapter votre stratégie SEO | Google SGE stratégie | Actualité |
| Core Web Vitals 2026 : les nouveaux seuils INP et comment les atteindre | Core Web Vitals INP | Technique |
| Netlinking en 2026 : stratégies de backlinks qui fonctionnent encore | stratégie netlinking 2026 | Guide |
| SEO pour thérapeutes : guide complet | SEO thérapeute | Local/Niche |
| Intelligence artificielle et SEO : menace ou opportunité ? | IA et SEO | Stratégie |
| Comment mesurer le ROI du SEO (avec exemples chiffrés) | ROI SEO | Stratégie |
| Migration de site : guide SEO étape par étape | migration site SEO | Technique |

---

## 8. Stratégie backlinks recommandée

### Actifs linkables existants (à promouvoir)

| Actif | Potentiel backlinks | Action |
|-------|-------------------|--------|
| Testeur visibilité IA | ⭐⭐⭐⭐⭐ | Seul outil GEO gratuit en FR — pitcher aux blogs marketing/tech FR |
| Étude restaurants Côte d'Azur | ⭐⭐⭐⭐ | Étude locale avec données exclusives — pitcher presse locale PACA |
| Étude de cas Vultifrine | ⭐⭐⭐⭐ | Cas unique de GEO — pitcher blogs SEO internationaux |
| Glossaire SEO (58 termes) | ⭐⭐⭐ | Ressource éducative — pitcher formations/écoles |
| Audit SEO gratuit | ⭐⭐⭐ | Outil populaire — pitcher comparatifs d'outils |
| Baromètre visibilité IA 2026 | ⭐⭐⭐⭐ | Données exclusives — pitcher blogs tech et IA |

### Tactiques netlinking prioritaires

1. **Digital PR locale** : pitcher l'étude restaurants aux médias PACA (Nice-Matin, La Provence, etc.)
2. **Guest posts GEO** : écrire pour Blog du Modérateur, Journal du Net, Abondance sur le GEO (positionnement d'experte)
3. **HARO/Connectively** : répondre aux journalistes sur les sujets SEO/IA
4. **Annuaires qualifiés** : inscription sur les annuaires de consultants SEO (Malt, Codeur, etc.)
5. **Partenariats outils** : proposer des intégrations/mentions croisées avec d'autres outils SEO français
6. **Conférences** : intervenir à SEO Camp, Web2Day, BlendWebMix (backlinks .org/.fr)

---

## 9. Plan d'action priorisé

### Semaine 1 : urgences (P0)

- [ ] Résoudre le title « for sale » dans Google (Search Console > inspection > recrawl)
- [ ] Fixer le certificat TLS pour www.indhack.com (Vercel settings)
- [ ] Configurer la redirection 301 www → non-www
- [ ] Investiguer pourquoi /blog n'affiche que 18 articles sur 34

### Semaine 2 : corrections importantes (P1)

- [ ] Ajouter les 2 outils manquants sur la page /outils
- [ ] Enrichir `comment-creer-site-visible-google.md` (+160 mots minimum)
- [ ] Allonger la meta description de la homepage (objectif 140-155 caractères)
- [ ] Demander la suppression des pages villes noindex encore indexées (Search Console)
- [ ] Enrichir les 5 articles ayant le moins de liens internes (9-10 liens)

### Semaine 3-4 : croissance (P2)

- [ ] Créer la page pilier /generative-engine-optimization (page mère GEO)
- [ ] Créer /tarifs-consultant-seo (requête transactionnelle forte)
- [ ] Réactiver les pages Lyon, Bordeaux, Toulouse avec contenu enrichi
- [ ] Écrire 2 nouveaux articles (netlinking 2026 + ROI du SEO)
- [ ] Ajouter des liens blog → glossaire et blog → études de cas

### Mois 2 : accélération

- [ ] Créer /consultant-seo-ecommerce et /audit-seo-local
- [ ] Écrire 3-4 articles supplémentaires (voir suggestions)
- [ ] Lancer la stratégie Digital PR avec l'étude restaurants
- [ ] Pitcher le testeur visibilité IA aux blogs marketing FR
- [ ] Réactiver 2-3 villes supplémentaires (Lille, Nantes, Rennes)

### Mois 3 : consolidation

- [ ] Atteindre 45+ articles publiés
- [ ] 15+ villes actives (contre 10 aujourd'hui)
- [ ] 10+ outils/pages interactives
- [ ] Premiers backlinks Digital PR obtenus
- [ ] Monitoring : positions, trafic organique, citations IA

---

## 10. Métriques de suivi

| KPI | Baseline actuel | Objectif M+3 |
|-----|----------------|--------------|
| Pages indexées | ~85 | 120+ |
| Articles blog | 34 (18 visibles) | 45+ (tous visibles) |
| Villes actives | 10 | 15 |
| Outils affichés | 6 | 8+ |
| Backlinks (estimation) | Faible (site jeune) | +20 backlinks qualifiés |
| Trafic organique | À mesurer | +50 % vs baseline |
| Citations IA (GEO) | À mesurer via testeur | Présence sur 3+ requêtes clés |

---

*Audit réalisé le 24 mars 2026 — basé sur l'analyse du code source, du sitemap, du robots.txt, du contenu, et des résultats Google.*
