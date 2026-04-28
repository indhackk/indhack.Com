# Audit content vs Search Console queries — indhack.com

Période : 90 jours. Source : GSC + lecture des fichiers source. Tri par criticité (impressions × écart de potentiel).

---

## /blog/contenu-rapport-audit-seo

- Position : 27,47 / Imp : 5 909 / Clics : 10 / CTR : 0,17 %
- Top queries (par sémantique de slug + position cohérente) :
  - `rapport audit seo` (1 385 imp, pos 21,3) — c'est l'arrivée massive
  - `rapport seo` (842 imp, pos 36,5)
  - `rapport audit site web` (502 imp, pos 25,2)
  - `rapport audit site web pdf` (451 imp, pos 25,8)
  - `seo rapport` (393 imp, pos 36,5) / `rapport d'audit seo` (319 imp, pos 23,5)
- Contenu actuel : guide de 18 min « 7 sections indispensables » centré sur **comment doit être structuré** un rapport, un exemple plomberie commenté, et une grille d'évaluation cachée derrière `/contact`.
- Gap identifié : l'intent dominant est **transactionnel/téléchargement** (`pdf`, `modèle`, `exemple`). Le titre promet un « modèle PDF + exemple » mais aucun fichier téléchargeable n'est servi sur la page (le PDF cliquable derrière le H2 « modèle de rapport » n'existe pas dans le markdown). L'utilisateur scanne le SERP, voit du texte d'apprentissage, et clique chez Semji/Semrush qui livrent un Google Doc gabarit. Position 27 = page 3, donc la chute de CTR est mécanique mais aussi qualitative.
- Action concrète :
  - Générer un vrai PDF gabarit de 8 pages (résumé exécutif + 6 sections + grille) hébergé sur `/downloads/modele-rapport-audit-seo.pdf` et bouton de DL sans formulaire en H1+1 et après chaque section.
  - Ajouter une mini-version Google Sheets « grille d'évaluation 30 points » accessible sans contact, pour capter `exemple audit seo`.
  - Réécrire le title en `Modèle rapport audit SEO 2026 (PDF gratuit) + exemple commenté` — le mot **PDF gratuit** est ce qui manque visuellement dans le snippet actuel.
- Potentiel : à 5 909 impressions, sortir de pos 27 pour pos 8-12 multiplie le CTR par 6-8x. Estimation 60-90 clics/mois si livrable PDF crédible. C'est le quick win n°1 du site.

---

## /blog/audit-seo-approfondi-guide-complet

- Position : 3,35 / Imp : 508 / Clics : 0 / CTR : 0 %
- Top queries :
  - `audit seo approfondi` (713 imp, pos 9,3) — c'est précisément cette page qui ranke
  - `diagnostic seo` (110 imp, pos 44,9)
  - `audit seo` (94 imp, pos 57,5) / `audit gratuit seo` (88 imp, pos 50)
- Contenu actuel : méthode 12 étapes très technique (analyse logs, CrUX, Screaming Frog, cannibalisations), tableau comparatif standard vs approfondi, prix 1500-5000€.
- Gap identifié : **pos 3,35 sans clic = problème de SERP feature ou de snippet**. À cette position, la cause n'est PAS le contenu — c'est :
  1. La requête `audit seo approfondi` est probablement nichée et le top 3 est mangé par un AI Overview ou un snippet d'agence vendant un service (intent commercial). Notre snippet promet « méthode 12 étapes + checklist PDF » mais le title dit `Audit SEO approfondi 2026 : méthode 12 étapes + checklist PDF` — la checklist promise n'existe nulle part dans le markdown (vérifié, aucun `<a href` vers PDF).
  2. La meta description (`Ma méthode d'audit SEO approfondi testée sur 40 sites par an...`) est en première personne narrative — pas de bénéfice chiffré, pas d'urgence, pas de CTA.
  3. À pos 3, si CTR=0 sur 508 imp, c'est qu'un encart Google (AI Overview, People Also Ask, ou résultat enrichi concurrent) capte tout le clic.
- Action concrète :
  - Tester en GSC le filtre « has-search-appearance: AI Overview » : si la requête déclenche AIO, ajouter un encart de réponse directe en début d'article (40 mots, format Q&R pur) pour devenir source citée — l'objectif passe de clic à citation.
  - Créer le PDF promis (`/downloads/checklist-audit-seo-approfondi.pdf`) et changer la meta en `Audit SEO approfondi : la méthode 12 étapes que j'utilise sur 40 sites/an. Checklist PDF + grille d'évaluation. 0€.` — chiffres + gratuité visible.
  - Réécrire le H1 de la SERP en intégrant un nombre Lighthouse-style : `Audit SEO approfondi 2026 : 12 étapes, 47 outils, étude de cas avant/après`.
- Potentiel : pos 3,35 conserve 12-18 % de CTR moyen sur requêtes informationnelles. Sur 508 imp = 60-90 clics/mois aujourd'hui invisibles. Si AIO bouffe la SERP, pivoter sur `méthode audit seo` et `audit technique seo` (autres queries prometteuses).

---

## /blog/checklist-seo-2026

- Position : 18,73 / Imp : 707 / Clics : 2 / CTR : 0,28 %
- Top queries :
  - `glossaire seo 2026` (278 imp, pos 17) — REQUÊTE PARASITE, pas l'intent
  - `seo checklist 2026` (43 imp, pos 65)
  - `website seo checklist 2026` (31 imp, pos 72)
  - `checklist seo 2026` (1 imp, pos 4) — l'intent réel mais sous-volumée
- Contenu actuel : 50 points en 5 sections (technique, contenu, local, backlinks, IA). PDF mentionné dans le title mais le markdown ne montre pas de DL link au début (le PDF existe à `/downloads/checklist-seo-2026.pdf` selon GSC mais reçoit 7 imp/0 clic).
- Gap identifié : la page reçoit 278 imp pour `glossaire seo 2026` parce qu'elle contient « 50 points » avec définitions inline (LCP, INP, CLS, robots.txt). Mais le contenu n'est pas un glossaire structuré — c'est une liste hétérogène. L'utilisateur arrive, ne trouve pas de définitions A-Z, repart. Le vrai mot-clé `seo checklist 2026` est en pos 65 = la page n'est pas perçue comme une checklist actionnable mais comme un guide.
- Action concrète :
  - Créer un index glossaire en H2 au-dessus du sommaire : « 30 termes SEO 2026 expliqués » avec ancres alphabétiques, qui reprend les définitions déjà éparpillées dans le markdown — capter les 278 imp parasites.
  - Transformer chaque point en case à cocher cliquable (composant interactif client-side) avec localStorage de progression — c'est ce que livre Hubspot/Backlinko et qui justifie le mot « checklist ».
  - Mettre le bouton DL PDF en haut de page (encart sticky) plutôt qu'enterré.
- Potentiel : récupérer les 278 imp glossaire et les 43 imp `seo checklist 2026` à pos 8-15 → 25-40 clics/mois. Le PDF DL devient un signal de valeur backlinké.

---

## /blog/analyser-visibilite-marque-chatgpt-ia

- Position : 21,77 / Imp : 1 033 / Clics : 0 / CTR : 0 %
- Top queries :
  - `vérifier si marque est citée dans chatgpt` (192 imp, pos 8,8)
  - `mesurer la visibilité de la marque sur chatgpt` (144 imp, pos 13,6)
  - `audit visibilité chatgpt` (138 imp, pos 21,5)
  - `analyser la visibilité de marque dans les réponses de chatgpt` (111 imp, pos 18,6)
  - `vérifier si marque est citée dans ai mode` (139 imp, pos 17,2)
- Contenu actuel : guide théorique 4 métriques GEO + protocole manuel 3 étapes + push vers `/outils/testeur-visibilite-ia`. Très bon sur l'éducation, faible sur le « do-it-now ».
- Gap identifié : les queries les plus fortes (`vérifier si marque citée chatgpt`) à pos 8,8 ne génèrent aucun clic — c'est le même profil qu'audit-seo-approfondi : pos top sans CTR. L'intent est **transactionnel utilitaire** (« vérifie pour moi, là, maintenant ») et la page commence par 800 mots de contexte avant l'outil. Le concurrent direct (peecai, profound) sert un widget de test en H1.
- Action concrète :
  - Mettre un widget interactif en H1+1 : input « votre marque » → 5 prompts ChatGPT pré-générés à copier-coller + bouton « tester la visibilité automatiquement » qui lance l'outil testeur-visibilite-ia déjà existant. La page devient action-first, théorie-second.
  - Ajouter un H2 « Comment vérifier en 2 minutes si ChatGPT cite votre marque » avec capture d'écran réelle d'une session ChatGPT (preuve sociale visuelle qui manque totalement).
  - Réécrire la meta : `Vérifier si ChatGPT cite votre marque : test gratuit en 2 min + outil GEO. 4 métriques de visibilité IA expliquées.`
- Potentiel : 1 033 imp, sortir le CTR à 4-6 % à pos 8-15 = 40-60 clics/mois. C'est un funnel direct vers `/outils/testeur-visibilite-ia` (qui convertit déjà à 0,38 %).

---

## /blog/definition-seo-guide-complet

- Position : 51,43 / Imp : 410 / Clics : 0 / CTR : 0 %
- Top queries :
  - `seo` (170 imp, pos 62) — quasi impossible à ranker en page 1
  - `seo définition` / `définition seo` / `qu'est-ce que le seo` (8-10 imp chacune, pos 79-84)
  - `outil seo définition` (15 imp, pos 66)
- Contenu actuel : guide 12 min « SEO sans jargon, 3 piliers, délais, budget PME ». Bien rédigé mais format identique à 50 000 articles concurrents (Hubspot, Definitions Marketing, Semji, Abondance).
- Gap identifié : sur des queries définitionnelles à très forte autorité (Wikipedia, Hubspot, Mozilla MDN), une page récente sans backlinks ne peut pas ranker. Le contenu est **commodity** : 3 piliers + comment ça marche = redite. Pos 51 indique que Google considère la page comme thématiquement OK mais sans signal de différenciation.
- Action concrète :
  - Pivoter le title vers une niche défendable : `SEO : définition par une consultante (et ce que les guides oublient)` — angle expérience personnelle = E-E-A-T différenciant.
  - Ajouter une vidéo YouTube embed (existe déjà dans schema vultifrine, donc Indiana a une chaîne) en H1+1 — Google priorise la vidéo sur les requêtes définitionnelles depuis 2024.
  - Cibler des longue-traîne : créer en interne 3 sous-pages `/blog/seo-en-2026-est-ce-rentable`, `/blog/combien-coute-le-seo-pme`, `/blog/seo-vs-sea-difference` qui maillent vers cette définition mère. La définition seule ne peut pas ranker, son écosystème oui.
- Potentiel : sur la requête `seo` seule, espérance < 5 clics/an. Sur le cluster définitionnel élargi avec sous-pages, viser 20-30 clics/mois sur l'ensemble. Page actuelle = candidat à dépriorisation, voire suppression si pas rénovée d'ici 6 mois.

---

## /blog/salaire-consultant-seo

- Position : 8,91 / Imp : 429 / Clics : 2 / CTR : 0,47 %
- Top queries :
  - `salaires consultant seo` (89 imp, pos 22) / `consultant seo salaire` (2 imp, pos 1)
  - `quel est le salaire d'un consultant seo ?` (2 imp, pos 6)
- Contenu actuel : grilles salariales par niveau, par région, par employeur. TJM freelance. Très data-driven, format directement Google-friendly.
- Gap identifié : pos 8,9 avec CTR 0,47 % sur 429 imp = bon trafic relatif mais snippet sub-optimal. Title `Salaire consultant SEO 2026 : junior, senior, freelance (TJM)` est solide. Le problème : sur ce type de requête commerciale-info, les featured snippets et People Also Ask captent les clics. La meta description (`Combien gagne un consultant SEO en 2026 ? Grilles détaillées junior/senior en CDI (28K-90K €) et TJM freelance (250-1000 €/jour) selon expérience.`) est très bonne.
- Action concrète :
  - Ajouter un featured-snippet-bait en H1+1 : un mini-tableau résumé 4 lignes (Junior/Confirmé/Senior/Freelance) — c'est le format que Google extrait. Actuellement le tableau est en milieu d'article.
  - Renforcer l'angle PAA en ajoutant des sous-H3 sous forme de questions exactes : `Combien gagne un consultant SEO junior ?` / `Quel est le TJM d'un freelance SEO en 2026 ?` / `Combien gagne un Head of SEO ?`.
  - Backlinker depuis l'article devenir-consultant-seo et depuis `/consultant-seo` (page service) avec ancre `combien gagne un consultant seo`.
- Potentiel : pos 5-6 atteignable. À 429 imp et CTR 4-6 % = 15-25 clics/mois. Petit volume mais lead très qualifié pour `/consultant-seo`.

---

## /audit-seo (page service)

- Position : 44,72 / Imp : 1 088 / Clics : 0 / CTR : 0 %
- Top queries (estimées) :
  - `audit seo grenoble` / `audit seo montpellier` / `audit seo rennes` (113-154 imp chacune) — requêtes locales
  - `audit seo rapide` (109 imp, pos 58,5)
  - `audit seo en ligne` (91 imp, pos 73,9)
- Contenu actuel : page service générique avec metadata `Audit SEO complet | +150 points analysés en 48h`. Promesse de rapport PDF, plan d'action ROI.
- Gap identifié : la page se positionne en concurrence frontale avec des agences nationales bien établies (Eskimoz, SEMrush, Yoast) sur `audit seo` générique sans angle local. Elle reçoit du trafic de 6+ requêtes géolocalisées (`audit seo grenoble`, `audit seo rennes`...) sans qu'aucune ville n'y soit mentionnée. Le slug `/audit-seo` est trop générique pour ranker en pos 1-15 sans backlinks lourds.
- Action concrète :
  - Créer une matrice ville/service `/audit-seo-{ville}` (12 villes top) qui reprend la promesse 150 points + insère 2 paragraphes contextuels par ville (entreprises locales typiques, équipes terrain). Approche programmatic SEO déjà appliquée à `/consultant-seo-[ville]`.
  - Sur la page mère `/audit-seo`, ajouter un bloc « Audit SEO dans votre ville » avec liens internes vers les 12 sous-pages.
  - Différencier via prix affiché transparent (`à partir de 800 €`) — quasi aucun concurrent ne l'affiche, c'est un vrai différenciateur de SERP.
- Potentiel : pos 44 → pos 25-30 sur la requête mère, mais surtout récupération de 800-1000 imp/mois latentes via les sous-pages géo. Estimation 5-15 clics/mois en cumul.

---

## /seo-local (page mère)

- Position : 51,45 / Imp : 1 492 / Clics : 1 / CTR : 0,07 %
- Top queries :
  - `freelance seo local` (293 imp, pos 30,1)
  - `consultante seo local` (284 imp, pos 59,8)
  - `expert seo local` (239 imp, pos 48,7)
  - `consultant seo local` (245 imp, pos 69,9)
- Contenu actuel : hero `Consultant SEO Local partout en France`, listing villes par région, FAQ. Pas de méthodologie visible, pas de chiffres résultats.
- Gap identifié : la page concurrence Eskimoz, Semji, agences locales établies. Elle est positionnée comme un **annuaire de villes** (« 18+ villes couvertes ») alors que les concurrents qui rankent vendent une **méthodologie SEO local** + études de cas. Title actuel `SEO Local | Dominez Google Maps & le Pack Local – IndHack` est bon mais la promesse n'est pas tenue dans le contenu (rien sur GMB, rien sur le pack local technique).
- Action concrète :
  - Ajouter un H2 « Méthodologie SEO local : 7 étapes de l'optimisation GMB au pack local » en milieu de page, avec chiffres (ex. délai pack local, % uplift moyen). La page vend des services sans expliquer le service.
  - Insérer une étude de cas locale chiffrée (avant/après pack local sur un client réel — anonymisé si besoin). Indispensable pour `consultante seo local` qui cherche une preuve avant de contacter.
  - Réécrire la meta : `Consultante SEO local : pack local Google + GMB pour PME. Méthode testée sur 40 villes, +180 % de visibilité moyenne en 90 jours.` — chiffres + bénéfice concret.
- Potentiel : pos 51 → pos 20-25 atteignable avec contenu doublé. À 1 492 imp et CTR 1,5-2 % = 20-30 clics/mois. Page critique du cocon local.

---

## /consultant-seo (page mère)

- Position : 57,17 / Imp : 2 172 / Clics : 0 / CTR : 0 %
- Top queries :
  - `consultant seo freelance` (262 imp, pos 72,3)
  - `consultant seo local` (245 imp, pos 69,9)
  - `consultante seo` (131 imp, pos 48,8)
  - `consultant seo indépendant` (111 imp, pos 65,5)
  - `consultante seo freelance` (165 imp, pos 48,2)
- Contenu actuel : page service générique (vu seulement la metadata, mais titre et keywords ciblent `consultante SEO`, `expert référencement naturel`).
- Gap identifié : 2 172 imp = très forte demande latente. Pos 57 = page 6. Sur ces requêtes, le top 10 est dominé par profils LinkedIn d'experts reconnus (Olivier Andrieu, Aymeric Bouillat...) et Malt. Indiana Aflalo n'a pas l'autorité de marque pour ranker en frontal sans signaux d'entité massifs (Wikidata existe mais isolé).
- Action concrète :
  - Renforcer l'entité Indiana Aflalo en H1 visible, avec photo + lien Wikidata + 3 logos médias (Medium, dev.to, YouTube déjà identifiés dans schema vultifrine). Aujourd'hui la page est anonyme, Google ne sait pas qui consulter.
  - Ajouter un module « Avis clients vérifiés » avec 6-10 témoignages G2/Trustpilot/LinkedIn intégrés en JSON-LD Review. Aucun concurrent freelance ne le fait proprement, c'est un avantage compétitif net.
  - Cibler la longue-traîne `consultante seo` (pos 48,8) en féminisant le H1 et la title — c'est moins concurrentiel et match l'entité réelle.
- Potentiel : récupérer pos 25-35 sur `consultante seo` et `consultante seo freelance` = 30-50 clics/mois. La requête `consultant seo freelance` reste hors de portée à 6 mois sans backlinks DR 50+.

---

## /outils/audit-seo-gratuit

- Position : 59,8 / Imp : 1 532 / Clics : 1 / CTR : 0,07 %
- Top queries :
  - `audit seo gratuit` (94 imp, pos 57,5)
  - `audit gratuit seo` (88 imp, pos 50)
  - `audit seo en ligne` (91 imp, pos 73,9)
  - `audit seo rapide` (109 imp, pos 58,5)
- Contenu actuel : outil interactif (composant `AuditSEO`), 15 critères, score /100, 4 catégories (Technique, Contenu, Accessibilité, IA-Ready). Title `Audit SEO gratuit : calculez votre score en 3 secondes`.
- Gap identifié : marché ultra-concurrentiel (Semrush, Ubersuggest, Sitechecker, Woorank, Seobility ont tous des outils gratuits avec backlinks par millions). Pos 59 = marginalisé. Le différenciateur réel (vérification crawlers IA) n'apparaît pas dans le snippet — title dit `15 critères dont compatibilité IA` mais la meta description parle plus d'analyse seo gratuite que d'audit IA.
- Action concrète :
  - Pivoter le ciblage : title `Audit SEO + IA gratuit : 15 critères dont GPTBot et ChatGPT` — la combinaison SEO+IA est inédite, gagne instantanément un angle US.
  - Ajouter un compteur public d'audits réalisés (`X 452 sites analysés ce mois`) au-dessus du formulaire — preuve sociale qui manque, justifie l'usage face à Semrush.
  - Implémenter un export PDF du rapport d'audit avec branding IndHack (lead magnet et signal aux IA via partages).
- Potentiel : pos 59 → pos 25-35 sur `audit seo gratuit` est ambitieux à 6 mois sans linkbuilding. Plus réaliste : capter des longue-traîne IA (`audit seo ia gratuit`, `vérifier crawlers chatgpt site`) où la concurrence est nulle — 10-20 clics/mois.

---

## /outils/testeur-visibilite-ia

- Position : 19,01 / Imp : 1 302 / Clics : 5 / CTR : 0,38 %
- Top queries :
  - `vérifier si marque est citée dans chatgpt` (192 imp, pos 8,8)
  - `mesurer la visibilité de la marque sur chatgpt` (144 imp, pos 13,6)
  - `audit visibilité chatgpt` (138 imp, pos 21,5)
  - `outil de suivi de visibilité dans chatgpt` (47 imp, pos 41,7)
- Contenu actuel : outil testeur 8 crawlers IA + FAQ étendue (8 questions). Title `Tester ma visibilité sur les IA — audit GEO gratuit en 30s`.
- Gap identifié : à pos 19 avec 1 302 imp et seulement 5 clics, le snippet sous-performe. Le title commence par `Tester ma visibilité sur les IA` — formulation passive et longue. Les utilisateurs cherchent `vérifier si marque citée chatgpt` (192 imp à pos 8,8 sans clic !) — la page rank dessus mais le snippet ne match pas la query mot-à-mot. La meta description `Votre site est-il cité par ChatGPT, Perplexity, Claude et Google AI Mode ?` est OK mais ne dit pas QUOI on obtient.
- Action concrète :
  - Réécrire le title : `Vérifier si ChatGPT cite votre marque : audit GEO gratuit (30 sec)` — match exact avec la query top à 192 imp + bénéfice immédiat.
  - Mettre la meta description en mode result-oriented : `Votre score GEO sur 100 + 8 crawlers analysés (GPTBot, Claude, Perplexity, Gemini). Diagnostic + plan d'action gratuit.`
  - Au-dessus du fold de l'outil, afficher 2-3 captures d'écran de rapports précédents (anonymisés) pour casser l'effet « page vide » qu'on voit avant de saisir une URL.
- Potentiel : pos 19 → pos 8-10 atteignable en 60 jours (déjà rank pos 8,8 sur la query #1). À CTR 6-8 % = 80-100 clics/mois. C'est le levier court-terme #1 du site.

---

## /laboratoire-geo/vultifrine (top performer — diagnostic différent)

- Position : 4,65 / Imp : 424 / Clics : 7 / CTR : 1,65 %
- Top queries :
  - `vultifrine` (179 imp, pos 4,8) — nom de produit/molécule
- Contenu actuel : guide complet vultifrine, sous-pages dédiées (acheter-bio, études cliniques, avis cheveux, comparatif marques). JSON-LD Article + entité auteur Indiana Aflalo très enrichie (LinkedIn + YouTube + Medium + Wikidata).
- Gap identifié : c'est le **pattern à dupliquer**. La page rank pos 4,65 mais CTR 1,65 % sur une query de marque = **bas pour une query brand**. Pour `vultifrine`, on devrait être à 8-12 % minimum (si on est légitimement la marque/ressource). Le snippet montre `Vultifrine : guide complet, études et comparatif 2026` — le mot « guide » sur une query produit donne un signal info, alors que l'utilisateur cherche probablement à acheter ou comprendre.
- Action concrète :
  - Tester un title plus transactionnel : `Vultifrine 2026 : bienfaits, où l'acheter et avis cliniques (laboratoire Indhack)` — match l'intent acheteur.
  - Vérifier dans GSC si la query `vultifrine` déclenche un AI Overview ou un panel produit Google Shopping qui mange les clics. Si oui, exploiter notre position 4 en y ajoutant un encart de réponse type FAQ.
  - **Documenter ce template** : c'est le seul setup qui convertit sur le site. Le pattern (entité auteur + Wikidata + sous-pages thématiques) doit être copié pour les pages services SEO.
- Potentiel : pos 4 → pos 1-3 sur `vultifrine` = 30-50 clics/mois (si CTR brand normal). Mais surtout : ce pattern dupliqué sur `consultante seo`, `audit seo` et `seo local` peut transformer le compte entier.

---

## Synthèse des leviers prioritaires (ROI 90 jours)

1. **`/blog/contenu-rapport-audit-seo`** : créer le PDF gabarit promis. 5 909 imp en attente. +60-90 clics/mois possibles.
2. **`/outils/testeur-visibilite-ia`** : réécrire title pour match query exacte. Pos 19 → 8 mécanique. +80-100 clics/mois.
3. **`/blog/audit-seo-approfondi-guide-complet`** : checklist PDF + encart AIO-friendly. Pos 3 sans clic = chirurgie SERP feature.
4. **`/blog/analyser-visibilite-marque-chatgpt-ia`** : widget action-first en H1+1, pivot vers funnel testeur-IA.
5. **Dupliquer le pattern Vultifrine** (entité Indiana + JSON-LD enrichi + sous-pages) sur `/consultant-seo` et `/audit-seo`.

Les pages `/seo-local`, `/consultant-seo` et `/outils/audit-seo-gratuit` sont sur des marchés concurrentiels demandant 6-12 mois de linkbuilding avant de bouger en pos 25. Leur fix immédiat = différenciation snippet, pas réécriture de contenu.

`/blog/definition-seo-guide-complet` = candidat à dépublier ou rénover en profondeur (rajout vidéo + angle E-E-A-T) — ne ranke pas, ne rankera pas sans signaux entité.
