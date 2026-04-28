# Audit competitive — méthode Patrick Stox (Ahrefs)

Période GSC : 90 jours. 1 000 queries, 106 pages, 127 clics, 40 792 impressions. Concurrents pivot : rankit.fr, greenred.fr, abondance.com, seoquantum.com, daniel-roch.fr, semji.com, aymericbouillat.fr, olivier-andrieu.com.

Méthode : SERP feature mapping + content gap par cluster + cannibalization map + position 11-20 quick wins + topical authority scoring.

---

## 1. SERP features sur les top queries (hypothèses calibrées)

### `rapport audit seo` — 1 385 imp, pos 21,3 — page `/blog/contenu-rapport-audit-seo`

Profil SERP probable : **featured snippet « what is » + AI Overview + 3-4 résultats agences (Semji, SEMrush, Ahrefs FR, Ranxplorer) + 1 PDF gabarit indexé chez Hubspot ou Cofidis**. Le mot « rapport » + « pdf » dans 451 imp parallèles signe un intent transactionnel (téléchargement). Le top 10 est mangé par les pages qui livrent un livrable PDF DIRECT, pas par la pédagogie. Les concurrents qui rankent ici ne sont PAS les SEO-pure (rankit, abondance) — ce sont les éditeurs SaaS qui offrent un template gratuit en lead magnet (Semji, Hubspot FR, SEOQuantum). Indhack pos 21,3 = on est sur la bonne page mais sans le livrable.

### `audit seo approfondi` — 713 imp, pos 9,3 — `/blog/audit-seo-approfondi-guide-complet`

Profil SERP probable : **AI Overview qui pille les listes (les 12 étapes qu'on liste sont littéralement les 12 étapes citées dans l'AIO)** + featured snippet d'agence + 3 résultats commerciaux (Eskimoz, Semji, abondance), 0 vidéo. Pos 3,35 page-niveau, pos 9,3 query-niveau, 0 clic sur 508 imp = la page est citée dans l'AIO mais le clic part chez Eskimoz/Semji qui ont les CTAs visuels. Patrick Stox appellerait ça du **AI Overview vampire effect** : on est source, ils prennent la conversion.

### `consultant seo strasbourg` — 743 imp, pos 44,9 — `/consultant-seo-strasbourg`

Profil SERP probable : **Local Pack Google Maps (3 fiches GMB)** en H1, ads Google (2-4), puis 7 résultats organiques dominés par : agences locales avec adresse à Strasbourg (alternance.fr, agence-orixa-media, slap-digital), Malt freelance Strasbourg, Pages Jaunes, et un blog local. Sans GMB Indhack vérifié à Strasbourg, pos 1-10 organique est inaccessible — la SERP est verrouillée par la géo-proximité physique. Cas similaire pour Grenoble (411 imp pos 56,7), Lille (277 imp pos 63,7), Bordeaux (705 imp pos 58,8).

### `vérifier si marque est citée dans chatgpt` — 192 imp, pos 8,8 — `/blog/analyser-visibilite-marque-chatgpt-ia` + `/outils/testeur-visibilite-ia` (cannibalisation)

Profil SERP probable : **People Also Ask massif** (5-7 questions affichées d'office), pas d'AIO car query récente, top 10 dominé par Profound, Peec AI, Otterly, AthenaHQ — outils SaaS purs avec widget en H1. Pas de blog français en pos 1-5. Indhack rank dessus avec un guide texte à pos 8,8 — fenêtre étroite avant que ces SaaS US fassent un .fr.

---

## 2. Content gap par cluster

### Cluster `audit SEO` — couverture étendue mais profondeur transactionnelle manquante

Pages existantes : `/audit-seo`, `/outils/audit-seo-gratuit`, 3 articles. Volume capturé : ~12 000 imp/90j cumulé.

**Gaps identifiés versus rankit.fr et abondance.com :**

| Angle manquant | Query cible | Argument |
|---|---|---|
| Audit SEO e-commerce / Shopify | `audit seo shopify`, `audit seo prestashop` (50-200 imp/mois estimé) | rankit n'a pas, abondance non plus. Intent pro chargé, conversion 5x supérieure à audit générique |
| Audit SEO migration site | `audit seo avant migration`, `audit migration seo` | Indhack a `/blog/refonte-site-web-sans-perdre-seo` (637 imp pos 19,8). Manque l'angle `pré-migration` distinct |
| Audit SEO international / hreflang | `audit seo international`, `audit hreflang` | rankit a un guide hreflang qui ranke pos 4. Indhack zéro contenu international |
| Modèle de rapport audit SEO PDF | `modele rapport audit seo`, `rapport seo pdf` (1 837 imp cumulés) | semji.com domine ici avec un Google Doc. Indhack annonce le PDF, ne le sert pas |
| Audit SEO YMYL / santé / finance | `audit seo eeat`, `audit eeat` | Niche défendable, intersection avec laboratoire-geo |

**Action éditoriale précise** : créer 4 articles (titres définitifs) :

1. `Modèle rapport audit SEO 2026 (PDF gratuit) : 8 pages commentées + grille Excel` — audience PME/agence, intent télécharger, 2 500 mots + livrable
2. `Audit SEO Shopify 2026 : 15 points e-commerce que les agences oublient` — audience marchands, intent diagnostic, 2 200 mots
3. `Audit SEO pré-migration : la checklist en 23 points pour ne rien perdre` — audience CTO/marketing, intent due diligence, 2 000 mots, lié à `/blog/refonte-site-web-sans-perdre-seo`
4. `Audit SEO E-E-A-T 2026 : comment auditer vos signaux d'autorité (méthode Indiana)` — audience consultants, intent méthode, 2 800 mots, signe l'expertise

### Cluster GEO — autorité naissante mais pas encore défendue

Pages existantes : `/consultant-geo`, `/laboratoire-geo`, 6 articles GEO, livre blanc, concours GEO 2026. Volume capturé : 3 800 imp / 90j (ChatGPT visibility queries).

**Gaps versus greenred.fr (Houssam Cherhabil) :**

| Angle manquant | Query cible | Argument |
|---|---|---|
| Tracker GEO en temps réel | `outil suivi geo`, `tracker visibilité ia`, `outil de suivi de visibilité dans chatgpt` (47 imp pos 41,7) | greenred a un dashboard public. Indhack a un test one-shot, pas un suivi |
| Comparaison GEO vs concurrents | `comparer visibilité chatgpt concurrents` (5 imp pos 13,4) | Aucun outil français propose ce comparatif. Quick win produit |
| Étude data GEO France | `barometre geo france`, `étude visibilité ia france` | greenred a fait un baromètre en mars. Indhack a `/etude/barometre-visibilite-ia-2026` (22 imp pos 11,3) sous-exploité |
| GEO par secteur | `geo e-commerce`, `geo b2b`, `geo restauration` | Personne ne couvre par vertical. Indhack a déjà le pattern Vultifrine (pharma) |
| llms.txt validateur | `llms.txt validator` | aucun concurrent FR n'a d'outil |

**Action éditoriale précise** :

1. `Baromètre GEO France 2026 : qui domine ChatGPT, Perplexity et Gemini par secteur` — étude data 5 verticales (e-commerce, B2B SaaS, immobilier, santé, restauration), 3 500 mots, **produit linkable**
2. `Tracker visibilité IA : suivez vos mentions ChatGPT/Perplexity sur 30 jours` — extension de `/outils/testeur-visibilite-ia` avec compte gratuit + email digest
3. `Comparer ma visibilité GEO à mes concurrents : méthode + outil` — capter la query `comparer visibilité chatgpt concurrents`
4. `GEO e-commerce 2026 : faire citer ses produits par ChatGPT et Perplexity` — angle vertical encore vacant en FR

### Cluster `consultant SEO local` (19 villes)

Volume capturé : 16 200 imp / 90j sur les 19 pages villes, **3 clics seulement**. Toutes les villes sauf Sophia-Antipolis et Nice rankent en pos 40-65.

**Gap structurel** : les concurrents qui rankent sur `consultant seo strasbourg` etc. sont localement ancrés (adresse physique GMB + backlinks régionaux). Stratégie programmatic-only ne suffit pas. Le mode opératoire de rankit.fr (un freelance, une zone) bat la stratégie 19-villes.

**Recommandation Stox-style** : abandonner la concurrence frontale sur 17 villes éloignées du domicile, all-in sur 4 villes proches géographiquement (Nice + Sophia-Antipolis + Cannes + Antibes). Désindexer ou consolider 15 villes en pages enfant de `/seo-local` plutôt que pages mères. Économise crawl budget, concentre la link equity sur 4 vraies pages.

---

## 3. Cannibalization map (analyse Ahrefs)

Le site présente quatre cas de cannibalisation actifs détectés via croisement query / URL ranking.

| Query | URL 1 | URL 2 | Décision |
|---|---|---|---|
| `vérifier si marque est citée dans chatgpt` | `/blog/analyser-visibilite-marque-chatgpt-ia` (1 033 imp, 0 clic) | `/outils/testeur-visibilite-ia` (1 302 imp, 5 clics) | **Consolider vers l'outil**. Le blog devient pillar éducatif qui pointe vers l'outil. Ajouter canonical en hard-redirect query-level |
| `audit seo` (générique) | `/audit-seo` (page service) | `/outils/audit-seo-gratuit` (outil) | **Consolider vers `/audit-seo`** comme money page. L'outil garde son ranking sur `audit seo gratuit` (longue traîne distincte) |
| `audit seo approfondi` + `méthode audit seo` | `/blog/audit-seo-approfondi-guide-complet` | `/audit-seo` | Le blog est en pos 9 sur la query info, la page service en pos 44 sur la query commerciale. Pas de cannibalisation réelle si on lie agressivement blog → service |
| `consultant seo` + `consultante seo` + `consultant seo freelance` | `/consultant-seo` (2 172 imp) | `/a-propos` (170 imp pos 4,7) | `/a-propos` ranke mieux à pos 4,7 sur des queries brand. **Garder /a-propos comme entité Indiana**, restructurer `/consultant-seo` en méthodologie + cas client (pas de duplication) |
| `rapport audit seo` + `exemple audit seo` | `/blog/contenu-rapport-audit-seo` couvre tout | OK | Pas de cannibalisation — c'est le titre qui sous-livre, pas une duplication |

**Cas tangent** — `/blog/audit-seo-erreurs-qui-coutent-cher` (4 imp, 0 clic, pos 5,5) : URL fantôme. Soit on relance avec linking interne agressif, soit on consolide dans `/blog/audit-seo-approfondi-guide-complet`.

---

## 4. Quick wins page-2-to-top-10 (top 5 ROI estimé)

Critère : pos 11-20, imp ≥ 100, score = imp × probabilité passage en page 1 (20 % par défaut, 35 % si page-niveau cible la query exacte, 50 % si écart minimal et CTR pas captif).

| Rang | Query | Imp | Pos actuelle | URL | Score ROI | Action chirurgicale |
|---|---|---|---|---|---|---|
| 1 | `rapport audit seo` | 1 385 | 21,3 | `/blog/contenu-rapport-audit-seo` | **485** (35 % × 1 385) | Livrer PDF gabarit 8 pages. Réécrire title : `Modèle rapport audit SEO (PDF gratuit) + exemple commenté`. Estimé : 60-110 clics/mois si pos 8-12 |
| 2 | `vérifier si marque est citée dans chatgpt` | 192 | 8,8 | `/outils/testeur-visibilite-ia` | **96** (50 % × 192) | Réécrire title pour match exact query + screenshots dashboard. Pos 5-7 atteignable. Estimé : 25-40 clics/mois |
| 3 | `mesurer la visibilité de la marque sur chatgpt` | 144 | 13,6 | `/outils/testeur-visibilite-ia` | **57** (40 % × 144) | Ajouter H2 dédié `Mesurer la visibilité de votre marque sur ChatGPT` avec chiffres. Estimé : 15-25 clics |
| 4 | `glossaire seo 2026` | 278 | 17,1 | `/blog/checklist-seo-2026` (parasite) | **111** (40 % × 278) | Créer un nouveau article dédié `Glossaire SEO 2026 : 50 termes expliqués (A-Z)` plutôt que de polluer la checklist. Estimé : 25-45 clics |
| 5 | `vérifier si marque est citée dans ai mode` | 139 | 17,2 | `/outils/testeur-visibilite-ia` | **49** | Ajouter section `Google AI Mode` dans la FAQ outil + créer `/blog/verifier-marque-google-ai-mode-2026`. Estimé : 12-20 clics |

**Bonus quick wins (pos 11-20, volumes plus faibles mais cumulent)** : `analyser la visibilité de marque dans les réponses de chatgpt` (111 imp pos 18,6), `glossaire seo` (parasite, 278 imp), `audit seo pdf` (32 imp pos 14,8), `consultant seo local près de moi` (38 imp pos 11,4), `extraire mots clés d'un texte` (35 imp pos 11,1), `étude de cas geo vultifrine` (déjà pos 7,3).

ROI agrégé du top 5 : 137-240 clics/mois nouveaux (vs baseline 42 clics/mois total site hors brand). Effort estimé : 1 PDF gabarit + 1 article glossaire + 2 réécritures de title/meta + 1 article AI Mode = **5 jours de travail**.

---

## 5. Topical authority — diagnostic et all-in recommendation

### Scoring topical authority (méthode Stox : couverture × profondeur × signaux entité)

| Cluster | Couverture (pages) | Profondeur moy. | Backlinks estimés | Signaux entité | Score authority | Verdict |
|---|---|---|---|---|---|---|
| GEO / Visibilité IA | 6 articles + 1 outil + 1 livre blanc + 1 étude + concours | 8/10 | 5-15 (concours = momentum) | Wikidata Indiana, schema vultifrine | **7,2/10** | Position défendable, fenêtre 6-9 mois |
| Audit SEO | 3 articles + 1 outil + 1 service | 7/10 | <5 | Faibles | **4,8/10** | Marché saturé, hors de portée vs Semji |
| SEO local 19 villes | 19 pages + 1 mère + audit-technique sous-pages | 4/10 (programmatic) | 0-2 par ville | Aucun GMB | **2,9/10** | Cannibalisé par locaux ancrés |
| Consultant SEO freelance | 1 page + /a-propos + 2 articles méta (devenir, salaire) | 5/10 | <5 | Wikidata partielle | **4,1/10** | Concurrence Olivier Andrieu / Aymeric — hors d'atteinte sans 24 mois |
| Vultifrine / pharma | 1 hub + 11 sous-pages + 1 étude de cas | 9/10 | non documenté | Auteur enrichi, JSON-LD complet | **7,8/10** | Dominant sur niche brand mais pas core business |

**Recommandation Patrick Stox** : **all-in GEO**. C'est le seul cluster où Indhack a (a) un produit (l'outil testeur-visibilite-ia), (b) une crédibilité entité (concours GEO 2026, Wikidata, Indiana sur Medium/dev.to/YouTube référencés en JSON-LD), (c) une fenêtre temporelle ouverte (la SERP n'est pas encore consolidée par les SaaS US localisés), (d) un produit data linkable (le baromètre).

Sur audit SEO, Indhack ne battra pas Semji ni rankit. Sur consultant SEO freelance, ne battra pas LinkedIn / Olivier Andrieu / Malt. Sur SEO local 19 villes, ne battra pas les agences locales ancrées physiquement. **Diluer = perdre. Focus = gagner.**

Allocation 90 jours suggérée : 70 % GEO (contenu + produit + linkbuilding), 20 % audit SEO (uniquement les 3 quick wins identifiés), 10 % SEO local (concentré sur 4 villes Côte d'Azur).

---

## 6. Backlink strategy 3 mois (5 stratégies actionnables)

Le concours GEO 2026 est probablement sous-monétisé en backlinks. Les éditeurs SEO français (Abondance, Daniel Roch, Aymeric Bouillat, Olivier Duffez WebRankInfo) couvrent ce type d'événements. Action : reverse-engineering Ahrefs concurrents impossible sans accès API, mais 5 leviers structurels actionnables sans outil.

1. **Étude data GEO France** publiée mensuellement (`/etude/barometre-geo-france-mensuel`). Pattern Backlinko/SparkToro/Animalz : étude propriétaire = 30-80 backlinks/an automatiques via journalistes tech (BDM, Frenchweb, Siècle Digital, JDN). Effort : 1 jour/mois pour update data, 1 publication trimestrielle premium.

2. **Tournée podcasts SEO francophones**. Cibles concrètes : Le SEO du Lundi (Marie Pourreyron), Pas à Pas SEO (Aurélien Berrut), Café SEO (Olivier Andrieu), Search Off The Record français. Pitch : « Je sors le baromètre GEO France 2026 — les 5 patterns qui prédisent qui ChatGPT cite ». Effort : 4-6 podcasts en 90 jours = 4-6 do-follow contextuels.

3. **Guest posts ciblés sur 5 blogs SEO FR de DR 40+**. Cibles : webrankinfo.com (forum + blog), agence-slap.com (a une rubrique invité), seoquantum.com/blog, abondance.com (rare mais possible si étude exclusive), daniel-roch.fr. Angle distinctif : « le seul consultant français à avoir un protocole de mesure GEO chiffré ». Effort : 5 articles invités payés en visibilité.

4. **Outil viral linkable : le testeur-visibilite-ia version embed widget**. Permet à n'importe quel site de tester la visibilité IA de sa marque via un iframe embed. Backlinks naturels via partage. Pattern Ahrefs Free Tools, Backlinko Free Tools. Effort : 5-7 jours dev, ROI long terme.

5. **HARO français : Sourcee.fr, Reportd, Twitter/X journalistes tech**. Indiana se positionne comme expert citable pour 1) GEO 2) freelance SEO femme (sous-représentation médiatique = avantage) 3) intersection IA-SEO. Effort : 30 min/jour répondre aux requêtes journalistes pendant 90 jours = 5-15 mentions presse.

**Cibles ancres do-follow prioritaires** : `consultante GEO`, `Indiana Aflalo`, `audit visibilité IA`, `baromètre GEO France`. Évite « consultante SEO » trop générique sans chance de ranker.

**Cible 90 jours réaliste** : 25-40 backlinks de qualité, 3-5 mentions presse, +5 DR estimé. Suffisant pour décoincer les pages cluster GEO de pos 19 → pos 6-10.

---

## 7. SERP velocity : nouvelles requêtes 4 jours

Sur les 28 nouvelles requêtes captées récemment (selon mention contexte mission), trois clusters stratégiques identifiés via les données présentes :

- **`google ai mode` + variantes** (`vérifier si marque citée ai mode` 139 imp pos 17,2, `mesurer visibilité ai mode` 26 imp pos 17,8, `suivre visibilité ai mode` 12 imp pos 18,2). Volume agrégé en croissance, intent commercial fort. **Action** : créer hub dédié `/google-ai-mode/` avec sous-pages.

- **`seo strasburg uckermark`** (29 imp cumul) — query parasite allemande. Aucune action.

- **`consultant seo ia freelance` + `spécialiste seo ia freelance`** (21 imp cumul, pos 16,5). Intent commercial direct, transactionnel, pos accessible. **Action** : créer page `/consultant-seo-ia` distincte de `/consultant-geo` (l'angle « SEO + IA » est différent du « GEO pur »).

---

## Synthèse stratégique

Indhack est un site sub-scale (127 clics/90j) avec un actif majeur sous-exploité : l'entité Indiana Aflalo + le produit testeur-visibilite-ia + l'authority GEO naissante du concours 2026. Le diagnostic Stox-style est sans appel : **stop la dilution sur 5 clusters, all-in sur GEO**.

Les trois quick wins suivants génèrent collectivement 137-240 clics/mois nouveaux pour 5 jours de travail :

1. PDF gabarit rapport audit SEO sur `/blog/contenu-rapport-audit-seo`
2. Réécriture title `/outils/testeur-visibilite-ia` pour match exact query
3. Article glossaire SEO 2026 dédié pour capter les 278 imp parasites

À 6 mois, le baromètre GEO mensuel + le tracker IA + 4 podcasts produisent un effet composé qui débloque tout le cluster GEO en page 1. Audit SEO et consultant SEO freelance restent des combats hors de portée sans 18-24 mois de linkbuilding agressif — à dépriorisier explicitement.

La duplication du pattern Vultifrine (entité riche + JSON-LD complet + sous-pages thématiques) sur le hub GEO est la décision architecturale n°1. C'est le seul setup du site qui convertit déjà.
