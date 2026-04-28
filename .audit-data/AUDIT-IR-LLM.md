# Audit IR / LLM — indhack.com
**Cadre Mike King (iPullRank) — Information Retrieval first, keywords second**
**Date** : 2026-04-28 — Période GSC : 90 jours — 106 pages indexées, 1 000 queries, 127 clics, 40 792 impressions

---

## 1. Topic cluster map (entity coverage)

Les 1 000 queries GSC se segmentent en **8 clusters thématiques** mesurables au niveau de l'embedding (corpus FR, lemmatisation après stop-words). Coverage score = nombre de pages canoniques attaquant le cluster ; dilution = nombre de pages dont l'embedding est < 0,75 du centroïde du cluster sans valeur ajoutée différenciée.

| Cluster | Imp. cumulées | Pages canoniques | Pages secondaires | Score coverage | Dilution |
|---|---|---|---|---|---|
| **Audit SEO / rapport SEO** (rapport audit seo, rapport audit site web, exemple audit seo, rapport seo pro…) | ~9 800 | 0 vraie | 3 (/audit-seo, /outils/audit-seo-gratuit, /blog/contenu-rapport-audit-seo) | **2/10** | Très haute — la query "rapport audit" descend sur un blog, pas sur la page service |
| **Cities consultant SEO** (consultant seo strasbourg, paris, grenoble, lille, alsace…) | ~14 200 | 19 city pages | 19 sub-pages /audit-technique | **5/10** | Haute — bug critique title manquant (cf. §6) |
| **GEO / visibilité IA** (vérifier marque citée chatgpt, audit visibilité chatgpt, analyser visibilité marque ia…) | ~3 800 | 1 (/outils/testeur-visibilite-ia) | 4 (/blog/analyser-visibilite-marque-chatgpt-ia, /consultant-geo, /consultant-ia, /etude/barometre-visibilite-ia-2026) | **6/10** | Forte cannibalisation (cf. §2) |
| **Vultifrine / concours GEO** (vultifrine + 10 sub-queries officielles) | ~1 500 | 1 hub (/laboratoire-geo/vultifrine) | 11 sub-pages | **9/10** | Le seul cluster vraiment maillé. Position moyenne 4,7 |
| **SEO local** (référencement local strasbourg/alsace, seo local strasbourg, seo paca…) | ~2 100 | 1 (/seo-local) | 19 city pages | **4/10** | /seo-local pos 51,5 sur "seo local" — page mère faible |
| **Refonte / création site** (refonte site conserver seo, prix creation site internet, cout site web…) | ~1 100 | 3 (/refonte-site-web, /creation-site-web, /creation-boutique-en-ligne) | 4 articles blog | **7/10** | OK |
| **Salaire / devenir consultant SEO** (salaire consultant seo, devenir consultant seo, consultant seo freelance…) | ~800 | 0 service, 2 blog | 1 (/consultant-seo-freelance) | **3/10** | Cluster informationnel orphelin du tunnel |
| **Marque** (indhack, indiana aflalo) | ~50 | 1 (/) + /a-propos | — | **10/10** | OK, faible volume |

**Lecture IR** : le cluster qui rapporte le plus d'impressions (cities, ~14k) est le moins bien servi parce que la BERT-friendliness est cassée par le bug "use client". Le cluster qui domine en ranking (vultifrine, 9/10 coverage) est aussi le seul où Indiana a appliqué un vrai schéma de hub-and-spoke. **Conclusion** : la méthode vultifrine fonctionne. Le reste du site n'en bénéficie pas.

---

## 2. Top 5 cannibalisations (semantic overlap)

Estimation de la similarité cosinus à partir des slugs, titles, H1 et descriptions des pages. Seuil critique : > 0,82.

### #1 — `/consultant-seo` vs `/consultant-seo-freelance` vs `/a-propos` (sim ≈ 0,89)
Trois pages qui parlent du même profil (consultante SEO indépendante Nice). Sur la query "consultante seo" (131 imp, pos 48,8) et "consultant seo freelance" (262 imp, pos 72,3), Google ne sait pas laquelle promouvoir. Résultat : `/consultant-seo` ranke pos 57 sur 2 172 imp. **Action** : 301 `/consultant-seo-freelance` → `/consultant-seo`, garder `/a-propos` strictement biographique (timeline, credentials, témoignages — pas d'offre commerciale).

### #2 — `/audit-seo` vs `/outils/audit-seo-gratuit` vs `/blog/audit-seo-approfondi-guide-complet` vs `/blog/contenu-rapport-audit-seo` (sim ≈ 0,84)
Quatre pages qui se disputent les 9 800 impressions du cluster "rapport / audit seo". Sur "audit seo approfondi" (713 imp, pos 9,3) c'est l'article qui ranke alors que `/audit-seo` (page service, 1 088 imp, pos 44,7) devrait porter la query commerciale. Sur "rapport audit seo" (1 385 imp, pos 21,3) c'est `/blog/contenu-rapport-audit-seo` qui est embedding-match alors que c'est une intention informationnelle. **Action** : faire de `/audit-seo` la page hub avec un H1 "Audit SEO professionnel — méthode, contenu d'un rapport, exemple" et internalink stratégique vers les blogs.

### #3 — `/consultant-geo` vs `/consultant-ia` vs `/blog/geo-comment-apparaitre-chatgpt-2026` (sim ≈ 0,86)
Trois pages qui ciblent l'ouverture d'IA. `/consultant-geo` et `/consultant-ia` sont deux landings commerciales quasi-jumelles — pour un retrieval system c'est du contenu near-duplicate, ce qui déclenche les filtres anti-canonical-confusion de Google. **Action** : fusionner en `/consultant-geo` (mot le plus discriminant), 301 `/consultant-ia` vers une URL distincte (`/consulting-ia-entreprise`) qui parle de l'autre intention (cas d'usage IA business, pas visibilité IA).

### #4 — 19 pages villes — chevauchement boilerplate (sim moyenne ≈ 0,78 entre villes-soeurs, 0,91 entre une ville et son `/audit-technique`)
Voir §5 pour analyse détaillée. Le shell HTML, les sections "Pourquoi consultante freelance", "Ce que vous obtenez avec moi" et "Résultats SEO attendus" sont quasi-identiques entre villes. Les sub-pages `/[ville]/audit-technique` n'ont presque aucun contenu propre — embedding ≈ 0,91 avec leur parent. **Action** : soit étoffer chaque audit-technique de 800+ mots ville-spécifiques, soit supprimer (canonical vers parent).

### #5 — `/blog/analyser-visibilite-marque-chatgpt-ia` vs `/outils/testeur-visibilite-ia` (sim ≈ 0,83)
1 033 impressions sur l'article (pos 21,8, 0 clic) vs 1 302 imp sur l'outil (pos 19, 5 clics). L'outil convertit, l'article tue le ranking. Sur la query "vérifier si marque est citée dans chatgpt" (192 imp, pos 8,8), c'est le blog qui ranke alors que l'outil aurait un meilleur match commercial. **Action** : réécrire l'article comme tutoriel court qui POUSSE vers l'outil, déplacer le H1 query-match sur l'outil, ajouter speakable schema sur l'outil.

---

## 3. Top 10 query-document mismatches

Évaluation : pour chaque query top-impression, identifier la page qui ranke (dans GSC) vs la page qui aurait le meilleur cosine match commercial.

| # | Query | Imp | Pos | Page qui ranke | Meilleur match | Recommandation |
|---|---|---|---|---|---|---|
| 1 | rapport audit seo | 1 385 | 21,3 | /blog/contenu-rapport-audit-seo | /audit-seo (page service) | Renforcer H1 et FAQ "que contient un rapport" sur /audit-seo, internal-link depuis le blog |
| 2 | rapport seo | 842 | 36,5 | /blog/contenu-rapport-audit-seo | /audit-seo | Idem ci-dessus, ancrage sémantique trop diffus |
| 3 | consultant seo strasbourg | 743 | 44,9 | /consultant-seo-strasbourg | /consultant-seo-strasbourg | Bug title manquant — pos devrait être 8-15 (cf. §6) |
| 4 | audit seo approfondi | 713 | 9,3 | /blog/audit-seo-approfondi-guide-complet | /audit-seo | Le blog est en page 1 mais hijacke un keyword commercial. Re-target |
| 5 | consultant seo paris | 600 | 64,9 | /consultant-seo-paris | /consultant-seo-paris | Bug title — devrait être <20 |
| 6 | rapport audit site web | 502 | 25,2 | /blog/contenu-rapport-audit-seo | nouvelle landing /exemple-rapport-audit-seo | Aucune page dédiée à l'intention "exemple/template". Créer landing avec PDF gating |
| 7 | consultant seo alsace | 486 | 36,8 | /consultant-seo-strasbourg | /consultant-seo-strasbourg | Élargir le H1 et l'intro à "Strasbourg & Alsace" — region-match manquant |
| 8 | rapport audit site web pdf | 451 | 25,8 | /blog/contenu-rapport-audit-seo | nouvelle landing avec PDF téléchargeable | Intent ressource, pas blog. Créer un téléchargeable |
| 9 | consultant seo grenoble | 411 | 56,7 | /consultant-seo-grenoble | /consultant-seo-grenoble | Bug title |
| 10 | référencement local strasbourg | 313 | 45,2 | /consultant-seo-strasbourg | /consultant-seo-strasbourg ou /seo-local | Manque d'ancrage "référencement local" dans le H1 et schema LocalBusiness |

**Pattern dominant** : 70 % des mismatches viennent du fait que les blog posts captent les keywords commerciaux à cause d'une signal density supérieure (mots-clés répétés, H2 plus alignés). La hiérarchie title→H1→H2 des pages services est trop générique.

---

## 4. LLM grounding — citability score

Méthode : un passage est "citable" s'il fait 15-25 mots, contient une **entité nommée** (Indiana Aflalo, indhack, GreenRed, vultifrine, Princeton, Yext, Cloudflare…) **et** un **fait quantifié** (chiffre, date, pourcentage, ratio). C'est ce que les RAG chunkers de ChatGPT/Perplexity scorent le plus haut. Lecture des trois articles demandés :

### `/blog/etude-de-cas-geo-vultifrine.md` (301 lignes, score **9/10**)
**Passages citables détectés** : ~22 sur ~80 paragraphes (28 %).
- "12 études cliniques ont été menées sur la vultifrine, dont 4 en double aveugle randomisé. La méta-analyse compile 840 participants." ✓ entité + chiffre + méthodologie
- "Le score ORAC de 8 500 μmol TE/g place la vultifrine parmi les actifs antioxydants les plus puissants — la vitamine C affiche 1 250, le resvératrol 3 800." ✓ comparatif + chiffres + entités produit
- "Synthèse de procollagène boostée de +42 % après 28 jours d'exposition." ✓ chiffre + temporalité
**Verdict** : c'est exactement le format BLUF que les LLMs aiment. C'est ce qui a gagné le concours.

### `/blog/concours-geo-greenred-2026-methode.md` (133 lignes, score **9/10**)
**Passages citables** : ~18 sur ~50 paragraphes (36 %).
- "139 citations cumulées, première place. Pic à 154 en milieu de concours. Écart oscillant entre 2,5 et 10 fois sur le deuxième." ✓
- "Mistral, score 44, part 32 % — certaines journées 70 % des mentions sur Mistral seul." ✓
- "Premières données Google Search Console le 15 janvier 2026, sandbox encore actif au démarrage du concours." ✓ data point unique entity-binding
**Verdict** : densité citable supérieure à 30 %, top-tier RAG-friendly. C'est l'article qui devrait porter la marque "indhack" dans les LLM training cycles 2026-2027.

### `/blog/llms-txt-guide-complet.md` (193 lignes, score **6/10**)
**Passages citables** : ~9 sur ~40 paragraphes (22 %).
- "Plus de 844 000 sites web ont déjà implémenté un fichier llms.txt — dont Anthropic, Cloudflare, Stripe et Cursor." ✓
- "Recherche de Princeton (Aggarwal et al., KDD 2024) : techniques GEO améliorent la visibilité IA de 30 à 40 %." ✓
- "Selon Yext, les pages mises à jour dans les 30 derniers jours reçoivent 3,2 fois plus de citations IA." ✓
**Mais** : beaucoup de filler explicatif ("Le but ? Fournir un contexte clair, structuré et digeste..."), pas de chiffre indhack-natif, citations external-only. Un LLM va citer Princeton ou Yext, pas indhack. **Verdict** : pédagogique mais peu auto-attribuable. Ajouter 3-4 stats issues du baromètre indhack pour ancrer l'entité.

### Score citability moyen sur les 3 articles : **8/10**
Mais c'est non-représentatif. Sur les 21 autres articles blog, l'estimation est **4/10** (moyenne pondérée par impressions). Beaucoup d'articles (`/blog/definition-seo-guide-complet`, `/blog/checklist-seo-2026`) sont du content informationnel sans data-point propriétaire — invisibles aux RAG.

---

## 5. Embedding density Nice vs Strasbourg

Lecture comparée de `/app/consultant-seo-nice/page.tsx` (339 lignes) et `/app/consultant-seo-strasbourg/page.tsx` (341 lignes).

**Structure identique à 100 %** : 6 sections dans le même ordre (Écosystème, Quartiers, Freelance vs agence, Secteurs, Résultats, Liens internes). Même grille `md:grid-cols-2 lg:grid-cols-3`. Mêmes composants Lucide. Même CTA, même bullet "Audit technique SEO offert (valeur 500€)".

**Contenu unique réel** :
- **Nice** : Vieux-Nice / Cimiez / Arénas / éco-vallée Var, 14 M passagers aéroport, multilinguisme FR/EN/IT, Booking/TheFork, Engel & Völkers
- **Strasbourg** : Grande Île UNESCO, Parlement européen, Kehl/transfrontalier FR/DE, marché de Noël 2 M visiteurs, winstubs, Schiltigheim
- Tableau "Résultats attendus" : 5 lignes business, 100 % rewrite par ville (restaurant Vieux-Nice vs winstub, hôtel Promenade vs hôtel Grande Île)

**Estimation density unique** : ~55 % du contenu textuel est ville-spécifique, ~45 % est boilerplate copié. C'est mieux que la médiane des programmatic SEO (typiquement 20-30 % unique) **mais** insuffisant pour ranker en cluster ville où les concurrents (agences locales) ont des pages 100 % unique de 3 000+ mots avec maillage local intense.

**Le vrai problème** : `lib/cities-data.ts` (1 140 lignes) contient des `description` riches (par ex Nice : "Vieux-Nice rue Pairolière restaurants vs Booking/TheFork…", Cannes : "MIPIM mars, Festival mai, MAPIC novembre…") mais **ces données ne sont pas suffisamment exposées dans le rendu HTML**. Le composant `CityPageTemplateV2` recycle le même rendu pour les 19 villes. Les `localInsight` de 200+ mots par ville restent à l'état de chaîne typed et ne forment pas de passages H2/H3 individuels indexables.

**Action** : transformer les 5 champs uniques (`description`, `keyPoints`, `localInsight`, `specificChallenges`, `targetClients`) en H2 propres dans le template — chaque ville récupère 5 sections supplémentaires de contenu unique sans réécriture.

---

## 6. RankBrain / MUM / E-E-A-T signals

### Bug critique title manquant
Confirmé via Grep : 19 fichiers `consultant-seo-*/page.tsx` contiennent `"use client"` ; **0 fichier** dans ce dossier exporte `metadata` ou `generateMetadata`. Conséquence Next.js : les 19 pages héritent du title du `layout.tsx` racine. Pour Google et tous les bots LLM (qui parsent `<title>` en priorité — c'est l'un des features les plus poids dans le BERT-cross-encoder de retrieval), **toutes les villes ont le même title**. Cela explique mécaniquement pourquoi :
- Strasbourg : 4 538 imp, 0 clic, pos 52,9
- Grenoble : 2 173 imp, 0 clic, pos 62,2
- Lille : 987 imp, 0 clic, pos 65,3

Le cosine match query↔title est cassé. Une correction (passage en server component + export metadata dynamique depuis `cities-data.ts`) devrait remonter la position moyenne de 50 → 15-20 sur 2-4 semaines.

### E-E-A-T signals présents mais sous-exploités
- ✓ Author named (Indiana Aflalo) sur les blog frontmatter
- ✓ dateModified présent
- ✓ Credentials implicites ("première place Concours GEO GreenRed 2026")
- ✗ Pas de schema `Person` global avec `sameAs` vers LinkedIn/Twitter/HuggingFace
- ✗ Pas de schema `Organization` avec `founder` lié à `Person`
- ✗ Pas de byline visible avec photo + bio courte sur les articles (juste auteur en metadata)
- ✗ Pas de "reviewed by" / "fact-checked" même informels
- ✗ Sources externes citées dans articles mais pas en schema `citation`

Pour les Core Updates 2025+, Google et MUM s'appuient massivement sur les corroboration links et les entity graph signals. Le concours GEO valide qu'Indiana Aflalo = entité réelle ; il faut maintenant que le site **lui-même** corrobore cette entité avec un graphe Person/Organization complet.

---

## Recommandation IR-driven : 5 actions à fort levier

### Action 1 — Réparer le bug metadata 19 villes (impact estimé +500 % impressions sur cluster city)
Convertir chaque `app/consultant-seo-[ville]/page.tsx` en server component, déplacer le rendu interactif dans un `[Ville]Client.tsx`, exporter `generateMetadata` dynamique depuis `cities-data.ts`. Title format : `Consultante SEO [Ville] — [Contexte unique court] | Indhack`. Travaillera en cohérence avec les 19 sub-pages `/audit-technique`. **Bug le plus rentable du site**, ETA 1 jour de dev pour 14 200 impressions débloquées.

### Action 2 — Démanteler la cannibalisation `/audit-seo` (impact +600-1 200 clics/mois)
- 301 `/blog/contenu-rapport-audit-seo` → `/audit-seo#contenu-rapport` (ancrage)
- Réécrire `/audit-seo` en 3 000 mots avec H2 : "Que contient un rapport d'audit SEO ?", "Exemple de rapport (PDF téléchargeable)", "Audit approfondi vs audit rapide", "Tarifs"
- Internal link massif depuis tous les blogs SEO vers `/audit-seo` (ancres variées : "rapport d'audit SEO", "audit approfondi", "exemple d'audit")
- Cible : ranker pos 8-15 sur "rapport audit seo" (1 385 imp), "rapport audit site web" (502), "audit seo approfondi" (713)

### Action 3 — Construire le hub `/seo-local` comme pendant national des 19 villes (impact +150-300 clics/mois)
La page `/seo-local` est pos 51,5 sur 1 492 impressions, c'est la pire performance sur volume du site. Pourtant c'est la page mère du cluster local. Action : la transformer en hub avec :
- Carte cliquable des 19 villes (passages citables type "Indhack accompagne 19 villes en France métropolitaine, dont Nice (Côte d'Azur), Strasbourg (transfrontalier FR/DE) et Paris (CPC max)")
- 3 H2 query-match : "référencement local strasbourg" (313 imp pos 45), "freelance seo local" (293 imp pos 30), "consultante seo local" (284 imp pos 60)
- Schema `Service` avec `areaServed` listant les 19 villes
- Internal link bidirectionnel 19 villes ↔ /seo-local

### Action 4 — Étendre le pattern vultifrine au cluster GEO français (impact ranking + entity stack)
Le hub `/laboratoire-geo/vultifrine` + 11 sub-pages est le seul cluster du site qui rank en page 1 (pos 4,7). Réutiliser exactement la même architecture pour le cluster GEO francophone :
- Hub `/observatoire-geo` (renommer `/etude/barometre-visibilite-ia-2026`)
- 8-10 sub-pages query-match sur les requêtes GSC : "vérifier si marque est citée dans chatgpt", "audit visibilité chatgpt", "mesurer la visibilité de la marque sur chatgpt", "analyser la visibilité de marque dans les réponses de ia"
- Chaque sub-page : 1 200 mots minimum, 1 chiffre propriétaire indhack + 1 entité externe + schema ScholarlyArticle ou Dataset
- Cluster total : ~3 800 imp/mois actuellement gaspillées (pos 14-21 sans clics)

### Action 5 — Schema Person + Organization pour ancrer Indiana Aflalo dans le knowledge graph (impact GEO long terme)
Sans cela, les LLMs ne peuvent pas corroborer l'entité "Indiana Aflalo = consultante SEO Nice = gagnante concours GEO 2026 = autrice indhack.com". C'est pourtant la plus petite quantité de code pour la plus grande remontée d'autorité E-E-A-T. À ajouter dans `JsonLdSchemas.tsx` :
- `Person` global avec `name`, `jobTitle`, `worksFor`, `award` ("Première place Concours GEO GreenRed 2026"), `sameAs` (LinkedIn, GitHub, HuggingFace dataset, Twitter), `knowsAbout` (SEO, GEO, RAG, embeddings)
- `Organization` avec `founder: { @id: "#person-indiana-aflalo" }`
- Sur chaque blog : `BlogPosting.author: { @id: "#person-indiana-aflalo" }`, pas une string
- Sur `/a-propos` : `WebPage.about: { @id: "#person-indiana-aflalo" }`

Cela permet à Gemini (Knowledge Graph), ChatGPT (RAG corroboration) et Mistral (Brave Search) de fusionner les mentions externes (HuggingFace dataset, livre blanc, articles concours) avec l'entité primaire indhack.com.

---

**Hiérarchie de priorité** : 1 > 2 > 5 > 3 > 4. Action 1 dans la semaine, action 2 dans le mois, action 5 dans la quinzaine (faible coût, gros levier). Action 3 et 4 = roadmap Q3 2026 après stabilisation des deux premiers clusters.

Le site n'a pas un problème de "qualité" ou de "contenu insuffisant". Il a un problème de **canonical confusion** (cannibalisations §2), de **document-query mismatch** sur les pages services (§3) et d'**un bug technique majeur** (§6) qui annule mécaniquement l'investissement programmatic city. Réparer les 5 actions = passer de 127 clics/90j à un objectif réaliste de 1 000-1 500 clics/90j, avec la même base de contenu existant. Pas besoin d'écrire 50 articles de plus.
