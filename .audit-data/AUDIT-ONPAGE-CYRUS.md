# Audit on-page Indhack — méthode Cyrus Shepard (Zyppy)

Position GSC moyenne : 41. Volume : 41 articles, 106 762 mots, moyenne 2 604 mots/article. Cluster dominant : IA & SEO (16 articles, 39 % du corpus). Principal défaut structurel : H1 = title verbatim (zéro variation pour capter des queries adjacentes), template `app/blog/[slug]/page.tsx` ligne 241-242 affichant `{post.title}` sans transformation. Cyrus Shepard recommande explicitement de varier H1 vs title pour ouvrir la longue traîne. Diagnostic complet ci-dessous.

---

## 1. Title tag formula audit — top 10 réécritures prioritaires

Sur 41 titles : 8 dépassent 60 caractères (cassent l'affichage SERP), 14 omettent le modificateur 2026, 27 n'ont pas de pattern bénéfice chiffré. Le score moyen Cyrus (longueur, mot-clé en début, modifier, bénéfice) est de 5,1/10. Les meilleurs titles suivent déjà la formule : « AI Overviews : -61 % de CTR organique, chiffres SEO 2026 », « 46 % des sites français invisibles par les IA : chiffres 2026 », « Salaire consultant SEO 2026 : junior, senior, freelance (TJM) ». Les pires sont génériques et anti-CTR.

### Top 10 réécritures urgentes

| Slug | Current title | Diagnostic | Proposed title |
|------|--------------|------------|----------------|
| consultant-ia-expert | « Consultant IA en 2026 : le guide définitif » (40 c) | « guide définitif » = vide, aucun bénéfice chiffré, query GSC « consultant IA » position 64 | « Consultant IA 2026 : missions, salaires (45-90 K€) et marché » |
| pourquoi-consultant-seo | « Pourquoi faire appel à un consultant SEO en 2026 ? » | Question fermée, pas de chiffre, redondant avec /consultant-seo | « Consultant SEO : ROI moyen 4,2x en 6 mois (cas chiffrés 2026) » |
| seo-vs-sea-que-choisir | « SEO vs SEA : que choisir pour votre entreprise ? » | « pour votre entreprise » = filler, pas de modifier 2026, pas de promesse | « SEO vs SEA 2026 : coûts, ROI, délais comparés (tableau) » |
| ia-entreprise-cas-usage | « IA en entreprise : cas d'usage et automatisation 2026 » | Trop vague, pas de chiffre, pas d'angle | « IA en entreprise : 12 cas d'usage avec ROI chiffré [2026] » |
| comment-creer-site-visible-google | « Comment créer un site Internet visible sur Google en 2026 ? » (62 c) | Dépasse 60 c, query commercial-info bâtarde | « Créer un site visible sur Google : 7 étapes [guide 2026] » |
| optimiser-fiche-gmb-2026 | « Optimiser Google Business Profile (GMB) : guide 2026 » | Doublon avec google-business-profile-guide-complet, parenthèse parasite | « Optimiser sa fiche GMB en 2026 : 14 leviers du pack local » |
| google-business-profile-guide-complet | « Google Business Profile : le guide complet 2026 » | « guide complet » = blah, redondant avec optimiser-fiche-gmb | « Google Business Profile 2026 : dominer le pack local en 14 jours » |
| consultant-geo | « Métier de consultant GEO : missions, parcours, salaire 2026 » | OK mais « Métier de » faible en début, mot-clé tardif | « Consultant GEO 2026 : missions, parcours, salaire (40-95 K€) » |
| pourquoi-votre-site-est-lent-performance-web-2026 | « Pourquoi votre site est lent ? (et comment le réparer) » | Pas de chiffre, pas de modifier, sous-vendu pour un article qui contient « 53 % » et le score 56 vs 93 | « Site lent en 2026 : -53 % de visiteurs, comment passer de 56 à 93 » |
| ai-mode-vs-chatgpt-vs-perplexity-comparatif-geo-2026 | « AI Mode vs ChatGPT vs Perplexity : le comparatif GEO 2026 » (61 c) | 61 c, « le comparatif » filler | « AI Mode vs ChatGPT vs Perplexity : comparatif GEO 2026 » (-3 c, supprimer « le ») |

### Patterns à généraliser

- **Bénéfice chiffré en titre** : appliquer aux 14 titles sans chiffre (formule Cyrus : « X en N étapes / N % d'amélioration / N euros »).
- **Modifier 2026** absent sur 8 titres dont `seo-vs-sea-que-choisir`, `pourquoi-consultant-seo`, `seo-local-nice` (juste « 2026 » en sous-titre, pas en title) — ajouter systématiquement pour signaler la fraîcheur (signal de ranking selon le helpful content system).
- **Brand suffix** (« | Indhack ») : actuellement absent de tous les titles. Recommandation : ne PAS l'ajouter en blog (vol de caractères). À garder pour les pages services.

---

## 2. H1 vs Title alignment — bug structurel critique

**Constat majeur** : tous les 41 articles ont H1 = title verbatim. Le template `app/blog/[slug]/page.tsx` ligne 242 fait `{post.title}` sans champ `h1` séparé. C'est la plus grosse opportunité on-page perdue selon la doctrine Cyrus Shepard : un H1 différent capte des variations de queries que le title ne couvre pas.

**Articles où H1 = title aligne le mot-clé principal** (35/41 OK).

**Articles où le H1 ne contient PAS clairement le mot-clé cible** (6/41) :

1. `concours-geo-greenred-2026-methode` — title : « Concours GEO GreenRed 2026 : ma méthode en 7 piliers ». Mot-clé principal = « Concours GEO » → OK, mais H1 devrait être « Comment j'ai gagné le Concours GEO GreenRed avec 139 citations IA » pour capter « gagner concours GEO ».
2. `pourquoi-consultant-seo` — H1 ne contient pas « ROI consultant SEO », pourtant query commerciale.
3. `pourquoi-votre-site-est-lent-performance-web-2026` — H1 omet « Core Web Vitals » et « PageSpeed », deux queries de l'article.
4. `ia-entreprise-cas-usage` — H1 vague, pas de mention « automatisation IA » ni « cas d'usage IA » distincts.
5. `seo-vs-sea-que-choisir` — H1 sans « comparatif » ni « différence », queries dominantes en GSC.
6. `prix-creation-site-internet-2026` — H1 omet « tarif » et « devis », variantes de query majeures.

**Action recommandée** : ajouter un champ `h1` dans le frontmatter des 41 articles et modifier le template pour `{post.h1 || post.title}`. Différencier H1 et title sur les 41 articles permettrait de capter **30 à 60 queries longue traîne supplémentaires** par article (pattern observé chez Backlinko, dont Cyrus a documenté la méthode).

---

## 3. H2 structure audit — densité OK, format à corriger

416 H2 répartis sur 41 articles → moyenne 10,1 H2/article. Densité conforme à la fourchette Cyrus (4-8 idéale, jusqu'à 12 acceptable pour pillar content). Les outliers : `meilleurs-outils-geo-gratuits-2026` avec 18 H2 (trop fragmenté), `checklist-seo-refonte-site` avec 4 H2 (sous-structuré pour 1 163 mots — d'ailleurs ce dernier est sous le seuil 1 500 du CLAUDE.md).

### Format question vs déclaratif

Cyrus Shepard insiste : H2 en format question (« How », « Why », « What ») matche directement les People Also Ask. Audit qualitatif sur 10 articles échantillons :

- **Bons exemples** (questions explicites) : `llms-txt-guide-complet` (« Qu'est-ce que le fichier llms.txt ? », « Pourquoi vous devez absolument avoir un llms.txt ? », « Comment tester si votre fichier fonctionne ? »), `google-business-profile-guide-complet` (« Qu'est-ce que Google Business Profile ? », « Comment créer et revendiquer ? », « Comment gérer les avis ? »), `etude-de-cas-geo-vultifrine` (5 H2 sur 8 en format question).
- **À retravailler** (déclaratif sans intent query) :
  - `seo-local-nice` : « La puissance de la recherche locale », « Le marché numérique niçois en 2026 » → reformuler en « Quelle est la part du SEO local à Nice ? », « Comment évolue le marché numérique niçois en 2026 ? ».
  - `audit-seo-approfondi-guide-complet` : « Les 12 étapes d'un audit SEO approfondi en 2026 » → garder mais ajouter sub-H2 question.
  - `seo-vs-sea-que-choisir` : « Cas pratiques par secteur », « Comparatif détaillé » → reformuler « Quel canal pour quel secteur ? », « Quelles différences entre SEO et SEA en 2026 ? ».
  - `consultant-ia-expert` : pas de format question dominant, à refactorer.

**Estimation** : sur 416 H2, ~140 sont déclaratifs neutres (33 %). Cible Cyrus : 60 % de H2 en format interrogatif explicite. Gap : 109 H2 à reformuler.

---

## 4. Internal anchor text optimization — score 6,5/10

Audit complet de `audit-seo-approfondi-guide-complet.md` (article référence, 3 840 mots, 18 liens internes). Distribution actuelle des ancres :

| Catégorie | Ancres | Ratio | Cible Cyrus | Verdict |
|-----------|--------|-------|-------------|---------|
| Exact match | 4 (« consultante SEO », « générateur de schema JSON-LD », « checklist SEO 2026 », « testeur de visibilité IA ») | 22 % | 30 % | légèrement bas |
| Partial match | 9 (« guide de refonte sans perdre le SEO », « modèle complet de rapport d'audit SEO », « notre service d'audit SEO », « outil d'audit SEO gratuit »…) | 50 % | 40 % | bon |
| Branded | 0 | 0 % | 20 % | absent total |
| Generic | 5 (« Screaming Frog », « Sitebulb », « données de terrain (CrUX) » — vers external en réalité, pour internes : « notre testeur », « notre outil ») | 28 % | 10 % | trop élevé |

Audit de 4 autres articles :

- `concours-geo-greenred-2026-methode` : 7 internes blog. Ancres exact match 4/7 (« Étude de cas GEO vultifrine », « Apparaître sur Perplexity »…) → ratio 57 % exact, sur-optimisé selon Cyrus. Branded 0 %.
- `llms-txt-guide-complet` : 13 internes. Mix correct (5 exact, 6 partial, 2 generic), zéro branded.
- `checklist-seo-refonte-site` : 7 internes, dont 4 ancres CTA (« voir le générateur », « l'outil d'audit SEO gratuit »). Generic-ish, pas de branded.
- `checklist-seo-2026` : 17 internes. Beaucoup d'ancres tool-CTA (« Outil gratuit : Générateur robots.txt 2026 — Configurez vos crawlers IA ») → over-stuffed, fait perdre du jus thématique.

**Score anchor text health : 6,5/10.** Les ratios moyens (sur 5 articles audités) : 35 % exact (OK), 45 % partial (bon), 0 % branded (critique), 20 % generic (acceptable). Recommandations :

- Introduire 10 à 15 % d'ancres branded (« Indhack », « la méthode Indhack », « notre approche IndHack ») — totalement absent du corpus, signal d'autorité qui manque.
- Réduire les ancres CTA stuffées du type « Outil gratuit : XYZ — Description » qui diluent l'ancre, préférer « générateur robots.txt » nu.
- Aucune page n'a de double lien vers la même destination avec ancres différentes (pratique Zyppy pour renforcer un cluster). À introduire.

---

## 5. Image SEO — score 7,5/10

Audit des 41 images hero :

**Filenames qualité** : 28/41 (68 %) ont un slug descriptif sémantique (ex : `audit-seo-approfondi-methode-12-etapes.webp`, `comparatif-ai-mode-chatgpt-perplexity-2026.webp`, `concours-geo-greenred-2026-premiere-place.webp`).

**Filenames cassés** : 8 articles avec slugs `new_*_1772274*.webp` (timestamps Keystatic) — `etude-restaurants-cote-azur` (`new_restaurant_study_1772274701808.webp`), `audit-seo-erreurs-qui-coutent-cher` (`new_audit_errors_*`), `definition-seo-guide-complet` (`new_definition_seo_*`), `checklist-seo-refonte-site` (`new_redesign_seo_*`), `refonte-site-web-sans-perdre-seo` (idem doublon), `checklist-seo-2026` (`new_checklist_seo_*`), `programmatic-seo-50-pages-locales` (`new_programmatic_seo_*`). À renommer en filenames sémantiques avec redirection.

**Filenames recyclés / doublons** : 5 cas de réutilisation d'image entre articles : `seo-local-nice.webp` utilisée par `google-maps-voler-clients-concurrents` ET `seo-strasbourg`, `outils-geo-gratuits-2026.webp` partagée entre `meilleurs-outils-geo` et `sites-francais-invisibles`, `geo-ia-seo.webp` sur 3 articles (`analyser-visibilite`, `geo-comment-apparaitre`, `mesurer-exposition`). Pénalise l'unicité visuelle (Discover) et envoie un signal de duplicate visuel à Google Images.

**Alt text qualité** : 41/41 ont un `imageAlt`, longueur moyenne 14 mots. Bons exemples : « Audit SEO approfondi 2026 : tableau de bord d'analyse SEO sur ordinateur portable avec graphiques de performance » (descriptif + sémantique). Mauvais : `consultant-ia-expert` (« Consultant intelligence artificielle stratégique et technique » — keyword-stuffed sans description), `ia-entreprise-cas-usage` (« Intégration de l'Intelligence artificielle en entreprise, cas d'usage » — recopie le title).

**Captions sous images** : aucun article n'a de caption HTML (`<figcaption>`) en plus de l'alt. Cyrus a documenté que captions sous images améliorent dwell time +12 % en moyenne. Action : implémenter un système de caption optionnel dans le frontmatter (`imageCaption`) et le template Markdown renderer.

---

## 6. Content depth signals

Distribution mots par article (sur 41) :

| Tranche | Nombre | Verdict |
|---------|--------|---------|
| < 1 500 mots (thin) | 1 (`checklist-seo-refonte-site` : 1 163) | Sous le seuil CLAUDE.md, à étoffer |
| 1 500 – 2 000 | 7 | Acceptable mais pas pillar |
| 2 000 – 3 000 | 24 | Cœur de catalogue |
| 3 000 – 4 000 | 8 | Pillar candidates |
| > 4 000 (pillar) | 1 (`contenu-rapport-audit-seo` : 4 291) | Top |

**Articles candidats pillar à renforcer (3 000 – 4 000 → 5 000+)** : `audit-seo-approfondi-guide-complet` (3 840), `etude-de-cas-geo-vultifrine` (3 681), `geo-comment-apparaitre-chatgpt-2026` (3 430), `meilleurs-outils-geo-gratuits-2026` (3 354). Ces 4 articles concentrent les queries informationnelles à fort potentiel, leur étoffement à 5 000 mots permet de basculer en topic authority pillar.

---

## 7. Topic authority par cluster — score sur 10

Mapping par catégorie frontmatter :

| Cluster | Articles | Total mots | Mots moyens | Interlinking densité | Score Cyrus |
|---------|----------|------------|-------------|----------------------|-------------|
| **IA & GEO** (catégorie IA & SEO + GEO + IA Entreprise) | 19 | 53 624 | 2 822 | Élevée (12-15 inter-articles) | **9/10** |
| **SEO local** | 5 (`google-maps-voler-clients`, `etude-restaurants-cote-azur`, `optimiser-fiche-gmb-2026`, `google-business-profile-guide-complet`, `seo-local-nice`) | 11 175 | 2 235 | Moyenne (5-7 inter-articles) | **6,5/10** |
| **Audit SEO** | 4 (`audit-seo-approfondi`, `audit-seo-erreurs`, `contenu-rapport-audit-seo`, `checklist-seo-2026`) | 14 575 | 3 644 | Forte (Audit cluster bien lié) | **8,5/10** |
| **Métier / Carrière** | 4 (`devenir-consultant-seo`, `pourquoi-consultant-seo`, `salaire-consultant-seo`, `quelle-formation-seo`) | 8 100 | 2 025 | Faible (3-4 inter-articles) | **5,5/10** |
| **Création / Refonte site** | 4 (`prix-creation-site-internet`, `refonte-site-web-sans-perdre-seo`, `checklist-seo-refonte-site`, `comment-creer-site-visible-google`) | 9 276 | 2 319 | Moyenne (5 inter-articles) | **6/10** |
| **Stratégie / Définition** | 3 (`definition-seo-guide-complet`, `seo-vs-sea-que-choisir`, `pourquoi-consultant-seo` partagé) | 6 920 | 2 307 | Faible | **5/10** |
| **Performance Web** | 1 (`pourquoi-votre-site-est-lent`) | 1 804 | 1 804 | Très faible (orphan-like) | **3/10** |
| **SEO local Strasbourg** | 1 (article isolé, sans cluster ville) | 2 102 | 2 102 | Orphan | **3/10** |

**Cluster fully covered : IA & GEO** — 19 articles, profondeur 53 K mots, maillage dense. C'est ce qui justifie position 4-7 sur « vultifrine », « consultant GEO », « concours GEO ».

**Cluster sous-couvert : Performance Web** — 1 seul article, pas de cluster. Pour devenir « consultant Performance Web » crédible, manque : Core Web Vitals 2026, INP optimisation, comparatif WordPress vs Next.js performance, hébergement vs CDN. Cible 5-7 articles.

**Cluster sous-couvert : Métier consultant SEO** — 4 articles, mais total 8 100 mots. Les pages services `/consultant-seo`, `/devenir-consultant-seo` n'ont que 4 inter-liens entre elles. Ajouter : « Outils consultant SEO 2026 », « Comment trouver clients consultant SEO », « Tarifs consultant SEO TJM ».

**Cluster orphan : Strasbourg** — un article ville isolé, sans pendant article + outil + page service comme Nice. Soit étoffer (cluster Strasbourg complet) soit le réintégrer comme satellite de `/seo-local`.

---

## 8. FAQ section audit

Sur 41 articles : **40/41 ont une section FAQ ou « Questions fréquentes »** (l'exception : `prix-creation-site-internet-2026` → vérification : a une H2 « Questions fréquentes » présente). Schema FAQPage généré automatiquement par le template `app/blog/[slug]/page.tsx` ligne 212 (`"@type": "FAQPage"`).

**Note importante CLAUDE.md** : depuis août 2023 Google ne donne plus de rich results FAQ aux sites non-gov/santé. Le maintien de la FAQ reste pertinent pour citations LLM (ChatGPT, Perplexity scrapent les Q/A structurées).

**Articles à enrichir avec questions People Also Ask supplémentaires** (vérifier avec Google PAA pour chaque mot-clé cible) :

- `salaire-consultant-seo` : ajouter « Combien gagne un consultant SEO débutant ? », « TJM consultant SEO senior ? », « Consultant SEO en CDI ou freelance ? » (PAA Google).
- `audit-seo-approfondi-guide-complet` : a 6 FAQ, OK mais « Combien de temps pour voir les effets d'un audit SEO ? » manque (PAA fréquent).
- `consultant-geo` : ajouter « Quelle formation pour devenir consultant GEO ? », « Quelle différence entre consultant GEO et consultant SEO ? ».

---

## 9. Updated content signals — refresh priority

Tous les articles ont un `dateModified`. Distribution :

- 27 articles avec `dateModified` ≥ 2026-04-16 (refresh récent, OK).
- 6 articles avec `dateModified` 2026-04-04 à 2026-04-15.
- 5 articles avec `dateModified` strictement = `date` (pas de refresh post-publication) : `concours-geo-greenred-2026-methode`, `seo-strasbourg-guide-pme-alsaciennes-2026`, `ai-mode-vs-chatgpt-vs-perplexity-comparatif-geo-2026`, `sites-francais-invisibles-ia-barometre-2026`, `agents-ia-developpeurs-claude-code-2026`. Articles récents (avril/mars 2026) donc OK pour le moment.
- **Anomalie** : `ai-overviews-impact-trafic-seo-2026` date du 2026-03-12 et n'a jamais été modifié depuis (5+ semaines). Article AI Overviews = sujet ultra-mouvant, refresh urgent.

### Top 15 refresh priority (basé sur position GSC + dateModified + potentiel)

| # | Article | Position GSC | Trafic actuel | Action | Pourquoi |
|---|---------|-------------|---------------|--------|----------|
| 1 | `contenu-rapport-audit-seo` | 27,5 | 10 clics / 5 909 imp. | Restructurer, ajouter PDF téléchargeable, étoffer FAQ | CTR 0,17 % désastreux malgré 5 909 imp/mois |
| 2 | `consultant-seo-nice` (page ville) | 44,6 | 2 clics / 1 016 imp. | Hors blog mais critique : ajouter cluster local | 1 016 imp gâchées |
| 3 | `audit-seo-approfondi-guide-complet` | 9,3 sur « audit seo approfondi » | 0 clic / 713 imp. | Refresh title, snippet meta, étoffer à 5 000 mots | Position 9 = bord top 10 |
| 4 | `consultant-geo` | — | — | Réécrire title (proposed §1), enrichir cluster GEO | Cluster phare de la marque |
| 5 | `pourquoi-votre-site-est-lent-performance-web-2026` | — | — | Réécrire title avec « -53 % visiteurs », créer cluster perf | Article orphan, sous-vendu |
| 6 | `seo-strasbourg-guide-pme-alsaciennes-2026` | 44,9 sur « consultant seo strasbourg » | 0 clic / 743 imp. | Refresh title, ajouter section /consultant-seo-strasbourg | 743 imp inexploitées |
| 7 | `ai-overviews-impact-trafic-seo-2026` | — | — | Update mensuel des stats AI Overviews | Sujet 100 % volatil |
| 8 | `salaire-consultant-seo` | 8,9 | 2 clics / 429 imp. | Ajouter PAA queries TJM, retitle | Top 10 atteignable rapidement |
| 9 | `checklist-seo-2026` | 18,7 | 2 clics / 707 imp. | Ajouter version PDF + 12 checkpoints AI Mode | Position 18 → 8 atteignable |
| 10 | `consultant-ia-expert` | 64,9 sur « consultant seo paris » (mauvaise query) | 0 clics / 600 imp. | Cannibalisation possible, à investiguer | Position 64 = invisible |
| 11 | `meilleurs-outils-geo-gratuits-2026` | — | — | 18 H2 : restructurer en 8-10 H2 | Trop fragmenté |
| 12 | `etude-de-cas-geo-vultifrine` | 7,3 | 3 clics / 128 imp. | Étoffer à 5 000 mots, ajouter section ROI | Top 10 stable, pillar potential |
| 13 | `apparaitre-sur-perplexity-guide-seo-2026` | — | — | Refresh data Perplexity 2026 Q1 | Pilier cluster GEO |
| 14 | `geo-comment-apparaitre-chatgpt-2026` | — | — | Étoffer à 5 000 mots, ajouter section AI Mode | Pilier cluster GEO |
| 15 | `checklist-seo-refonte-site` | 9,8 | 3 clics / 248 imp. | Étoffer (1 163 → 1 800 mots min), ajouter cas chiffrés | Sous le seuil 1 500, top 10 atteignable |

---

## Synthèse et plan d'action priorisé

**Score global on-page Cyrus Shepard : 6,8/10.** Détail :

- Title formula : 5,5/10 (8 réécritures urgentes, manque modifier 2026 sur 8 titles, peu de bénéfices chiffrés)
- H1 vs Title alignment : 3/10 (tous identiques, énorme opportunité perdue)
- H2 structure : 7/10 (densité OK, format question à généraliser, 33 % H2 trop déclaratifs)
- Anchor text : 6,5/10 (manque branded, generic trop élevé)
- Image SEO : 7,5/10 (8 filenames cassés, 5 doublons d'images)
- Content depth : 7,5/10 (1 thin, 4 pillar candidates)
- Topic authority cluster : 7/10 (IA & GEO excellent, Performance Web et Métier sous-couverts)
- FAQ : 8,5/10 (40/41 OK, schema généré, à enrichir PAA)

### Trois actions à impact immédiat

1. **Modifier le template `app/blog/[slug]/page.tsx`** pour supporter un champ `h1` distinct du `title` dans le frontmatter. Ajouter `h1` aux 41 frontmatters (variation systématique), gain estimé : +30 % de queries longue traîne captées sur 6 mois.
2. **Réécrire les 10 titles prioritaires** listés en §1 (formule chiffre + modifier + bénéfice). Gain CTR estimé : +15 à 25 % sur les pages concernées.
3. **Étoffer les 4 articles pillar candidates** (`audit-seo-approfondi`, `etude-de-cas-geo-vultifrine`, `geo-comment-apparaitre-chatgpt`, `meilleurs-outils-geo-gratuits`) de 3 500 à 5 000+ mots pour basculer en topic authority pillar. Renforce le cluster IA & GEO et l'autorité sur « consultant GEO ».
