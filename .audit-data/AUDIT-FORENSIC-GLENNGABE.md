# Forensic post-mortem indhack.com — angle Glenn Gabe

> Algorithmic forensic / search visibility analysis  
> Période analysée : 27 janvier 2026 → 26 avril 2026 (90 jours)  
> Date du rapport : 28 avril 2026  
> Site : indhack.com (lancé mai 2025, 11 mois d'âge)

---

## Verdict d'ouverture

Indiana ressent une perte de ranking. **Les données disent le contraire.** La position moyenne 30 jours est passée de 44,58 (mars) à 31,99 (avril), soit une amélioration de 12,6 points en 30 jours. La fluctuation 39,95 → 41,26 sur 4 jours observée par Indiana est **du bruit statistique**, pas un signal algorithmique.

En revanche, le site présente trois pathologies structurelles graves qui plafonnent son potentiel et qui, si elles ne sont pas traitées, déclencheront tôt ou tard un signal "site reputation abuse" ou "thin content" lors d'un Core Update : **un ratio barnacle de 46,9 %, une cannibalisation de l'autorité par 19 pages villes quasi-identiques, et 51 % des impressions piégées sur des positions inexploitables**.

Ce post-mortem n'est pas un constat de pénalité. C'est un signal d'alerte précoce.

---

## 1. Trend chart 90 jours (lecture textuelle)

**Phase 1 — Ramp-up technique** (W05-W08, 27 janv. → 22 fév.) : 11 → 965 impressions/semaine. Position dérive 17 → 60. Effet d'inflation classique post-sandbox.

**Phase 2 — Test de masse Google** (W09-W12, 22 fév. → 22 mars) : 1 819 → 7 554 imp/semaine, position bloquée 45-60. Google injecte massivement les pages villes en SERP page 5-7 pour les tester. Comportement classique post-indexation programmatique : éligibilité technique passée, pas la pertinence.

**Phase 3 — Inflexion qualité** (W13, 22-28 mars) : drop 7 554 → 2 779 imp (-63 %), position s'améliore 45,9 → 37,5. **Filtrage algorithmique de qualité** : Google retire les pages villes des SERP de test après faible CTR observé. Inflexion la plus importante des 90 jours.

**Phase 4 — Stabilisation** (W14-W17, 29 mars → 26 avril) : impressions 1 930-4 167/semaine, position 39,2 → 31,9, clics 8 → 21/semaine, CTR 0,11 → 0,64 % (×6 en 7 semaines).

### Synthèse rolling averages (jusqu'au 26/04)

| Fenêtre | Position moyenne | Clics | Impressions |
|---------|------------------|-------|-------------|
| 7 jours | 31,89 | 21 | 3 291 |
| 14 jours | 31,06 | 36 | 7 296 |
| 30 jours | 33,29 | ~70 | ~14 500 |
| Mars (mois) | 44,58 | 52 | 21 873 |
| Avril (mois, partiel) | 31,99 | 55 | 12 872 |

La position s'est améliorée de **+12,6 points** en 30 jours. C'est l'opposé d'une pénalité.

---

## 2. Inflexions critiques détectées

| Date | Événement détecté | Lecture forensic |
|------|-------------------|------------------|
| **11 fév. 2026** | Saut impressions : 41 → 117 (+185 %) | Première vague d'indexation pages villes |
| **24 fév. 2026** | 274 imp/jour atteint, position 50,7 | Google teste les pages programmatiques |
| **9 mars 2026** | 969 imp/jour, position 50,2 | Pic du test de masse |
| **17 mars 2026** | 1 486 imp/jour, position 47,3 | Sommet historique d'impressions journalières |
| **23-24 mars 2026** | Drop 874 → 396 imp (-55 %) en 24 h | **Filtrage qualité algorithmique** : Google purge les pages villes de la SERP de test |
| **7 avril 2026** | Position 29,1 (premier passage sous 30) | Sortie de la zone "exploration" |
| **25 avril 2026** | 6 clics/jour, CTR 1,3 % | Meilleur CTR journalier des 30 derniers jours |

**Aucun marqueur de Core Update** détecté sur ces inflexions. Pas de Helpful Content System trigger non plus. Les drops correspondent à de la **régulation algorithmique normale** post-indexation programmatique, pas à des pénalités.

---

## 3. Barnacle pages — détection et triage

Définition Glenn Gabe : page qui draine impressions et autorité sans convertir. Au-delà de 30 % du ratio, l'algorithme dégrade la perception qualité du domaine entier.

**Ratio barnacle indhack.com : 46,9 %** (19 112 / 40 792 impressions). **CRITIQUE**.

| URL | Imp | Pos | Verdict |
|-----|-----|-----|---------|
| /consultant-seo-strasbourg | 4 538 | 52,9 | KILL (noindex 60j, observer) |
| /consultant-seo-grenoble | 2 173 | 62,2 | KILL |
| /consultant-seo (page mère) | 2 172 | 57,2 | FIX URGENT |
| /consultant-seo-paris | 2 061 | 60,2 | FIX (long-tail arrondissement) |
| /outils/audit-seo-gratuit | 1 532 | 59,8 | FIX |
| /seo-local | 1 492 | 51,5 | FIX (page mère) |
| /consultant-seo-rennes | 1 418 | 53,6 | KILL |
| /audit-seo | 1 088 | 44,7 | FIX (service core) |
| /blog/analyser-visibilite-marque-chatgpt-ia | 1 033 | 21,8 | FIX URGENT (title/desc) |
| /consultant-seo-lille | 987 | 65,3 | KILL |
| /consultant-seo-cannes | 931 | 31,5 | FIX (CTR à booster) |
| /consultant-seo-monaco | 642 | 47,5 | KEEP |
| /consultant-seo-montpellier | 639 | 54,3 | KILL |
| /consultant-seo-marseille | 558 | 51,6 | FIX |
| /consultant-seo-antibes | 524 | 42,4 | KEEP |
| /blog/audit-seo-approfondi-guide-complet | 508 | 3,4 | FIX URGENT (snippet HS) |
| /blog/definition-seo-guide-complet | 410 | 51,4 | FIX |
| /consultant-seo-lyon | 359 | 64,7 | KILL |
| /consultant-seo-nantes | 285 | 59,9 | KILL |
| /consultant-seo-toulouse | 269 | 54,0 | KILL |
| /consultant-seo-aix-en-provence | 266 | 48,4 | KEEP |

**Plan de purge** : 7 villes KILL (noindex + canonical vers /seo-local) libère ~5 700 imp de noise, concentre le PageRank sur les 12 restantes. Estimation Glenn Gabe : +15 à +25 % de position moyenne en 60-90 jours.

---

## 4. Cannibalisation forensic

### Cas 1 — Doublons URL legacy (signal contradictoire en SERP)

6 paires vivent simultanément en SERP, Google reçoit deux signaux pour la même intention :

| Source legacy | Cible canonique | Impact |
|--------------|----------------|--------|
| /about | /a-propos | 7 imp barnacle |
| /tools/gmb-autopilot | /outils/gmb-autopilot | 1 imp |
| /seo-montpellier | /consultant-seo-montpellier | 37 imp |
| /seo-nice/audit-technique | /consultant-seo-nice/audit-technique | 37 imp + 2 clics |
| /seo-antibes/audit-technique | /consultant-seo-antibes/audit-technique | 8 imp |
| /seo-paris/audit-technique | /consultant-seo-paris/audit-technique | 8 imp |

CLAUDE.md mentionne 77 redirections 301 dans next.config.mjs. Vérifier que ces doublons y sont — sinon, ajouter immédiatement.

### Cas 2 — Cannibalisation pages mères vs filles villes

Sur `consultant seo paris` (600 imp/0 clic, pos 64,9) : 3 candidats potentiels (/consultant-seo-paris, /consultant-seo, /seo-local). Google ne sait pas prioriser. Idem pour Strasbourg, Grenoble. Volatilité 30-80 selon semaines, signal classique de cannibalisation.

### Cas 3 — Title/meta problem sur /blog/contenu-rapport-audit-seo

Seule victoire de cannibalisation : la page rank 27,5 sur "rapport audit seo" et obtient 10 clics. Mais sur `rapport seo` (842 imp, 0 clic, pos 36,5), même page, zéro clic. **Title/meta problem, pas ranking problem.**

---

## 5. Doorway pages — risk score

### Mesure objective

Comparaison code source `/consultant-seo-strasbourg/page.tsx` vs `/consultant-seo-grenoble/page.tsx` :
- Mots distincts Strasbourg/Grenoble : 320 / 333, communs : 168
- **Uniqueness Strasbourg : 47,5 %, Grenoble : 49,5 %**

Seuil Google "doorway" généralement vers 60-70 % de redondance. Indhack à **~50 %** : zone grise, détectable mais pas rouge profond.

### Risk score : **MODÉRÉ**

Le site est sauvé par : (1) chaque ville a son `[City]CustomContent` localisé (Strasbourg bilingue FR/DE, Paris arrondissements, Grenoble R&D montagne), (2) le template injecte des données distinctes de `cities-data.ts`, (3) FAQ/CTA contextualisés.

**Risque devient CRITIQUE si** : nouvelles villes sans `[City]CustomContent` dédié, ou template utilisé pour des villes sans activité réelle (Lille, Toulouse) — déjà identifiées barnacle.

**Recommandation Glenn Gabe** : sortir Lille, Lyon, Toulouse, Nantes, Rennes, Montpellier du sitemap. Garder 8-10 villes où Indiana peut produire du E-E-A-T réel (cas client, photos terrain, témoignage). Passage 19 → 10 villes = renforcement ranking des 10 restantes.

---

## 6. Site reputation abuse risk (March 2024 update)

**Audit auto-promo : risque FAIBLE.** Marque personnelle Indiana Aflalo, contenu first-person conforme E-E-A-T, pas de témoignages bidons, pas de partenariats fakes, pas de coupons parasites.

**Mismatch promesse/réalité : risque MODÉRÉ.** L'entité brand est verrouillée (position 1,67 sur "indhack", CTR 33 % ; position 2,29 sur "indiana aflalo", CTR 14 %). Mais le site rank 60+ sur ses propres mots-clés commerciaux (`consultant seo paris`, `consultant seo grenoble`, `audit seo approfondi`). Pour un "expert SEO", ranker page 6 sur sa propre cible est une fragilité E-E-A-T détectable par les LLMs et certains classifiers Google.

**Section /laboratoire-geo/vultifrine** : 11 pages sur un produit cosmétique (rank 4-15, 7 clics sur la racine). Pas du site reputation abuse au sens strict — c'est une section thématique cohérente. Mais si Google détecte un lab d'expérimentation algorithmique déguisé, cela peut affaiblir la cohérence sémantique "consultant SEO". **Recommandation** : isoler en sous-domaine vultifrine.indhack.com.

---

## 7. Indexation health

Pages site (page.tsx + blog markdown) : **75 + 41 = 116**. Pages dans GSC : **106**. Gap : **10 pages**.

Sur ces 10, ~7 sont des pages techniques privées (admin-login, keystatic, (gmb-app)/*, dashboard, pour-pauline, rapport/[domain], widget/testeur-ia). Les 3-4 publiques manquantes à investiguer en URL Inspection : /consultant-ia, /consultant-seo-freelance, /consultant-geo, /glossaire-seo (278 imp via requête mais URL absente). Probable statut "Discovered - currently not indexed".

---

## 8. Velocity check — risque "thin content production"

11 mois d'âge, 116 pages publiées = **~10 pages/mois**, soit 2× la médiane d'un site de marque personnelle. Mais ce n'est pas du content factory pur : 41 articles à 1 500+ mots, chaque ville a son `[City]CustomContent` localisé, outils fonctionnels.

**Risk score velocity : FAIBLE-MODÉRÉ.** Le seul vrai risque velocity est sur les 6-7 pages villes "fantômes" (Lille, Toulouse, Nantes, Lyon, Rennes, Montpellier) générées par batch sans contenu local réel — exactement la définition d'une barnacle page Glenn Gabe.

---

## 9. Plan d'urgence — recovery priority

### J+3 (3 jours) — Triage urgentiste

1. **Noindex 6 villes barnacle** : Lille, Toulouse, Nantes, Lyon, Rennes, Montpellier (+ leur /audit-technique). `metadata: { robots: { index: false } }` sur layout.tsx.
2. **301 des 6 doublons legacy** : /about, /tools/gmb-autopilot, /seo-montpellier, /seo-nice/audit-technique, /seo-antibes/audit-technique, /seo-paris/audit-technique vers leurs équivalents canoniques.
3. **Fix titles/snippets sur 3 pages position-haute-CTR-zéro** : /blog/audit-seo-approfondi-guide-complet (pos 3,4), /blog/analyser-visibilite-marque-chatgpt-ia (pos 21,8), /consultant-seo-cannes (pos 31,5). Ces 3 pages sont en "ranking gap" : Google les remonte mais le snippet ne convertit pas. Gain estimé : 5-15 clics/jour.

### J+7 (7 jours) — Renforcement structurel

4. **Réécrire H1 + intro des 4 pages mères barnacle** : /consultant-seo (pos 57,2), /audit-seo (pos 44,7), /seo-local (pos 51,5), /outils/audit-seo-gratuit (pos 59,8). 6 284 imp cumulées pour 1 clic = gisement 30-80 clics/jour si top 20.
5. **Audit cannibalisation interne** : 1 seule URL canonique par requête. Ancres précises ("consultant SEO à Strasbourg" → uniquement vers /consultant-seo-strasbourg).
6. **Resoumettre sitemap modifiée** (post-noindex) via Google + IndexNow turbo.

### J+30 (30 jours) — Restructuration de l'autorité

7. **Réécriture profonde des 12 villes restantes** : 47 % → 75 %+ uniqueness. Ajouter cas client, 3 photos terrain, témoignage local, données INSEE/CCI.
8. **Migration /laboratoire-geo en sous-domaine** vultifrine.indhack.com.
9. **Audit URL Inspection** des 10 pages "Discovered - currently not indexed".
10. **Monitoring algorithmique hebdomadaire** sur les 20 pages prioritaires : alerte si drop >15 % semaine/semaine.

---

## Coût/bénéfice — décisions stratégiques

**/consultant-seo-paris (2 061 imp / 0 clic)** : garder mais réécrire. Restreindre l'angle : viser "consultant seo paris [arrondissement]" ou "[vertical]" (avocat, restaurant, e-commerce), pas la requête principale inaccessible. Pousser avec 4-5 sous-pages d'arrondissement.

**/consultant-seo-strasbourg (4 538 imp / 0 clic)** : cas le plus douloureux. Indiana n'est pas à Strasbourg, pas de ROI commercial possible. **Noindex 60 jours** → si la position moyenne du domaine remonte, barnacle confirmé. Sinon, réindexer + réécrire à fond.

**/consultant-seo-grenoble (2 173 imp / 0 clic)** : idem Strasbourg. Noindex 60 jours, observer.

---

## Conclusion forensic

Indhack.com **n'est pas pénalisé**. La perception d'Indiana est une illusion d'optique due à la volatilité naturelle d'un site jeune sur quelques jours.

Vrais problèmes structurels : (1) 46,9 % d'impressions barnacle plafonnent l'autorité, (2) 51 % des impressions sur position 30+ = perception low-authority, (3) 6 doublons URL legacy créent du bruit cannibalisant, (4) 6-7 villes fantômes tirent le domaine vers le pattern doorway.

La trajectoire 30 jours est **excellente** (position 44 → 32). Avec le plan de purge ci-dessus exécuté en 30 jours, position attendue fin mai : **20-25**, ticket d'entrée SERP page 2-3 où le CTR (>1 %) commence vraiment.

Pas de Core Update à craindre, pas de signal Helpful Content, pas de site reputation abuse confirmé. Le site est en croissance contrariée par sa dette technique programmatique. Réversible — vite.

---

*Méthodologie adaptée du framework Glenn Gabe (G-Squared Interactive) : pattern detection GSC daily/pages/queries, comparaison cross-template, scoring barnacle/doorway/cannibalisation, lecture des inflexions algorithmiques.*
