# Audit Quality Rater Guidelines — indhack.com

**Posture** : Marie Haynes — Quality Raters Guidelines + Penalty Recovery
**Date** : 28 avril 2026
**Cadre** : Google Search Quality Rater Guidelines, version janvier 2025 (révisions QRG sections 2.5 à 6.0)
**Périmètre** : 10 pages clés + 5 top queries GSC + classification YMYL + flags Lowest + plan recovery 60 jours

Le verdict en une phrase : indhack.com est un site **Medium quality** dominé par du contenu sincère et une auteure réelle, mais avec **deux trous E-E-A-T critiques** et **une page YMYL borderline lowest** qui risquerait une note basse si un Quality Rater évaluait le site aujourd'hui. La trajectoire est récupérable, mais pas en restant sur la posture actuelle.

---

## 1. Page Quality rating détaillé — 10 pages

Méthode : pour chaque URL, j'évalue (a) Purpose of the page, (b) Beneficial purpose, (c) Quality of Main Content, (d) Author / E-E-A-T, (e) Reputation of the website, (f) YMYL applicability, (g) ratio promo/contenu. Note finale sur l'échelle QRG : Lowest / Low / Medium / High / Highest.

### 1.1 / (homepage)
- **Purpose** : clair, services SEO + GEO d'une consultante. OK.
- **MC quality** : sections homogènes, FAQ utile, CTA "audit gratuit" placé sans agression. Pas de copie froide.
- **E-E-A-T** : nom auteure visible, photo, lien /a-propos. Mais **aucune preuve directe d'expertise sur la home même** au-dessus de la ligne de flottaison (pas de logo client, pas de cas chiffré, pas de citation tierce).
- **YMYL** : modérée (Your Money, voir section 3).
- **Promo/contenu** : ratio acceptable, environ 30 % CTA / 70 % contenu informatif.
- **Verdict** : **Medium**. Pour passer en High, il manque des trust signals tangibles au-dessus du fold (médias, clients identifiés, certifications affichées).

### 1.2 /a-propos
- **Purpose** : présentation auteure. Page dédiée E-E-A-T.
- **MC quality** : structure correcte, schema Person bien construit (sameAs LinkedIn présent).
- **E-E-A-T critique** : "7+ ans d'expérience", "50+ clients", "4.9 note moyenne", "17 villes couvertes" — **aucune source vérifiable** affichée. QRG section 5.2 demande explicitement *evidence of expertise, particularly for YMYL*. Ces chiffres ronds non sourcés sont le pire signal possible aux yeux d'un rater.
- **Crédentials** : "Double Master en Stratégie Digitale & UX Design" sans nommer l'établissement, "Certification GA4" sans lien de vérification, "Semrush Academy" générique.
- **sameAs schema** : un seul lien (LinkedIn). QRG section 2.5 et 5.3 attendent un faisceau de présences externes.
- **Verdict** : **Low to Medium**. C'est la page que le rater regarde en premier sur un site YMYL. En l'état, elle ne convainc pas. Risque concret : note Low si l'évaluateur compare avec un consultant établi (ex : Olivier Andrieu, Aymeric Bouillat).

### 1.3 /audit-seo
- **Purpose** : page service commerciale. Clair.
- **MC quality** : longue, structurée, contenu informatif réel (les 5 étapes, le tableau freelance vs agence, les signaux d'alerte). Bien.
- **E-E-A-T** : "Je réalise entre 30 et 40 audits par an" (cf. blog audit-seo-approfondi-guide-complet) — chiffre **non corroboré** par les chiffres home (50+ clients sur 7 ans = 7 par an). Incohérence.
- **Trustworthiness** : "+150 points analysés en 48h" en title tag, "5-10 jours" dans la FAQ. Contradiction directe entre title et corps.
- **Promo** : ratio sain, le contenu domine.
- **Verdict** : **Medium**. La contradiction title vs corps (48h vs 5-10 jours) est exactement ce que QRG section 4.4 décrit comme *misleading title* — un flag Low.

### 1.4 /seo-local
- **Purpose** : page mère SEO local + carrousel des 19 villes.
- **MC quality** : statistiques chiffrées sourcées partiellement (46 %, 78 %, etc.), mais sources non explicitées dans le texte visible.
- **E-E-A-T** : faible. Page commerciale sans cas client, sans testimonial vérifiable.
- **Reputation** : aucun avis externe agrégé, pas d'intégration Trustpilot / Google Reviews.
- **Verdict** : **Medium**. Page utile mais générique — un rater dirait *adequate* sans plus.

### 1.5 /consultant-seo
- **Purpose** : page mère expertise.
- **MC quality** : identique à /a-propos sur les chiffres ronds non sourcés. ServiceSchema présent.
- **E-E-A-T** : redondance avec /a-propos sans valeur ajoutée mesurable.
- **Verdict** : **Medium**. La page est honnête mais ne fait pas la démonstration concrète de l'expertise revendiquée.

### 1.6 /consultant-seo-strasbourg
- **Purpose** : page locale Strasbourg.
- **MC quality** : forte. Le contenu sur la dimension franco-allemande, marché de Noël, institutions européennes, est **substantiel et original**. C'est une bonne page.
- **E-E-A-T** : revendication "je maîtrise le SEO multilingue FR/DE" — **aucune preuve**. Pas de cas client strasbourgeois, pas de portfolio bilingue.
- **Reputation** : absente.
- **YMYL** : modérée (Your Money — services pro).
- **Verdict** : **Medium**. La qualité d'écriture sauve la page. Le rater apprécierait l'effort éditorial, mais sans preuve d'expertise locale, on plafonne.

### 1.7 /blog/audit-seo-approfondi-guide-complet
- **Purpose** : guide informationnel.
- **MC quality** : excellent. 12 étapes, comparatif, étude de cas chiffrée, tableau de prix.
- **E-E-A-T** : auteure nommée, dateModified 2026-04-21, schema BlogPosting.
- **Beneficial purpose** : très clair, le lecteur repart avec une méthode actionnable.
- **Promo** : 1 CTA /contact, 2 liens vers /audit-seo et /consultant-seo. Ratio sain.
- **Verdict** : **High**. C'est une page modèle. À répliquer.

### 1.8 /blog/etude-de-cas-geo-vultifrine
- **Purpose** : retour d'expérience concours GEO.
- **MC quality** : très haut niveau de détail. Mais — c'est ici que ça dérape — la moitié de l'article expose des **données cliniques fictives** (12 études, n=840, score ORAC 8 500, +42 % procollagène, comparatif vs rétinol) **sans encart visible "vultifrine = molécule fictive concours GEO" en début d'article**.
- **E-E-A-T** : la disclosure existe en filigrane (paragraphe 3, mention discrète) mais le rater de Marie Haynes est entraîné à lire les premiers 200 mots. Si la disclosure n'est pas dans le chapô, c'est un flag.
- **YMYL** : **CRITIQUE**. Cosmétique = Health adjacent dans QRG section 2.3 ("topics that could impact health"). Présenter de fausses études cliniques sur une "molécule" même sous prétexte pédagogique tombe sous *Misleading information* (QRG section 4.4) si la mention "fictive" n'est pas immédiate, gras, et placée avant les chiffres.
- **Verdict** : **Low**. Et risque **Lowest** si le rater est strict sur YMYL.

### 1.9 /blog/concours-geo-greenred-2026-methode
- **Purpose** : retour d'expérience compétitif méthodologique.
- **MC quality** : excellent, 7 piliers détaillés, scores par IA, transparence sur ce qui n'a pas marché.
- **E-E-A-T** : authentique. C'est exactement le contenu *first-hand experience* que QRG section 3.4 valorise depuis l'update E-E-A-T décembre 2022.
- **Trustworthiness** : "139 citations cumulées, première place" — **vérifiable** si GreenRed publie le classement officiel. À documenter via un lien externe (annonce GreenRed).
- **Verdict** : **High**. La page est forte. Manque juste la preuve externe (lien vers le classement officiel GreenRed).

### 1.10 /outils/audit-seo-gratuit
- **Purpose** : outil gratuit + lead magnet.
- **MC quality** : utilitaire fonctionnel.
- **E-E-A-T** : limité — c'est un outil, pas un contenu rédactionnel.
- **Promo** : c'est un funnel de capture. Acceptable si l'outil fournit une vraie valeur et pas juste un score bidon.
- **Trustworthiness** : nécessite vérification que les recommandations renvoyées sont sérieuses (QRG section 4.5 sur les *deceptive design patterns*).
- **Verdict** : **Medium**. Tools have a beneficial purpose for free users — OK tant qu'il ne pousse pas un score artificiellement bas pour générer du lead.

### Synthèse des 10 pages

| Page | Rating | Flag majeur |
|---|---|---|
| / | Medium | Trust signals manquants au-dessus du fold |
| /a-propos | Low/Medium | Chiffres non sourcés, sameAs maigre |
| /audit-seo | Medium | Title contradictoire avec corps (48h vs 5-10j) |
| /seo-local | Medium | Pas de cas client, pas d'avis |
| /consultant-seo | Medium | Redondance /a-propos |
| /consultant-seo-strasbourg | Medium | Pas de preuve d'expertise locale |
| /blog/audit-seo-approfondi | **High** | RAS |
| /blog/etude-de-cas-geo-vultifrine | **Low** | YMYL — données fictives sans disclaimer immédiat |
| /blog/concours-geo-greenred-2026 | **High** | Manque lien externe classement officiel |
| /outils/audit-seo-gratuit | Medium | Vérifier sérieux du score |

**Distribution** : 0 Highest, 2 High, 7 Medium, 1 Low. Pour un site qui veut ranker en YMYL adjacent, la médiane Medium n'est pas suffisante. Il faut viser au moins 5 High sur 10.

---

## 2. Needs Met rating — top 5 queries GSC

QRG sections 13-14 : Needs Met évalue si la page satisfait l'intent du chercheur. Échelle : Fails / Slightly / Moderately / Highly / Fully Meets.

### 2.1 query "indhack" — 14 clics, position 1.67
- Page qui ranke : / (homepage)
- Intent : navigationnelle marque
- **Verdict : Fully Meets**. La home répond exactement à l'intent navigationnel.

### 2.2 query "vultifrine" — 3 clics, 179 impressions, position 4.82
- Page qui ranke : /laboratoire-geo/vultifrine
- Intent : informationnelle, mais sur une entité fictive — l'intent réel des chercheurs est **probablement curiosité métier SEO/GEO** plutôt que cosmétique
- **Verdict : Moderately Meets**. Pour un curieux qui veut comprendre le concours, la page éclaire. Pour un consommateur qui chercherait à acheter, elle est trompeuse — la disclosure existe mais l'architecture des sous-pages (acheter-bio-france, etudes-cliniques, bienfaits-regeneration) **n'a pas de disclaimer immédiat** et continue à présenter le produit comme réel. Risque **Slightly Meets** sur ces sous-URLs.

### 2.3 query "rapport audit seo" — 1 clic, 1385 impressions, position 21.34
- Page qui ranke : /blog/contenu-rapport-audit-seo
- Intent : informationnel large — "qu'est-ce qu'un rapport d'audit SEO contient"
- **Verdict probable : Highly Meets** si le contenu détaille les sections d'un rapport. CTR 0.07 % à position 21 cohérent. La page n'a pas été lue ici, à valider.

### 2.4 query "rapport seo" — 0 clic, 842 impressions, position 36.54
- Page qui ranke : probablement même /blog/contenu-rapport-audit-seo
- Intent : ambigu. "Rapport SEO" peut signifier rapport client mensuel, audit, ou template.
- **Verdict : Slightly Meets**. La page actuelle traite plutôt l'audit ; l'intent dominant pourrait être le rapport mensuel récurrent. Mismatch d'intent partiel — explique la position 36 et 0 CTR.

### 2.5 query "consultant seo strasbourg" — 0 clic, 743 impressions, position 44.87
- Page qui ranke : /consultant-seo-strasbourg
- Intent : transactionnelle locale
- **Verdict : Moderately Meets** sur le contenu, mais position 44 = aucun trafic. Le rater verrait que la page est correcte, mais le marché est saturé localement. Needs Met dépend ici plus de la concurrence que de la qualité absolue.

### Synthèse Needs Met

L'intent matching est globalement correct, mais deux pages clés (/laboratoire-geo/vultifrine sous-URLs et /blog/contenu-rapport-audit-seo) souffrent d'un **mismatch d'intent** qui dégrade la performance perçue par les utilisateurs et donc, à terme, vue par les raters.

---

## 3. YMYL classification

**Verdict : YMYL "Other" — niveau modéré à élevé**.

QRG section 2.3 liste explicitement comme YMYL :
- *Financial information* : achats importants, conseils business
- *Government, civic, legal* : sujets impactant le citoyen
- *Health and Safety* : tout ce qui touche la santé physique ou mentale
- *News and current events* sur sujets sociétaux
- *Other* : "topics that could affect the future happiness, health, financial stability or safety of users"

Le SEO consulting tombe dans **Other YMYL** car :
1. Une PME qui suit de mauvais conseils SEO peut **perdre du chiffre d'affaires significatif** (Your Money).
2. Une refonte SEO mal pilotée peut **détruire 80 % du trafic** d'un site, équivalent à une menace de survie pour un e-commerce.
3. Le contenu /laboratoire-geo/vultifrine touche au **Health adjacent** (cosmétique, application sur la peau, ingestion en gélules) — section 2.3 *Health and Safety*. Même fictif, le contenu est indexé et affiché à des utilisateurs réels qui peuvent le prendre au sérieux.

**Conséquences** :
- Le standard E-E-A-T monte d'un cran. QRG 5.3 demande pour les sujets YMYL : *formal expertise, education, training, accreditation, professional experience*.
- Les chiffres "7+ ans" et "50+ clients" sans portfolio public **ne suffisent pas** pour un rater YMYL.
- La présence Wikipedia / Wikidata / mentions presse devient **discriminante**, pas optionnelle.

---

## 4. Lowest quality flags — évaluation indhack.com

QRG section 4 liste 8 raisons de noter Lowest. Audit point par point.

| Flag | Présent ? | Preuve |
|---|---|---|
| Inadequate level of E-A-T | **Risque modéré** | sameAs limité à 1 lien sur /a-propos, 0 mention presse vérifiable, pas de Wikipedia |
| Misleading information | **Risque élevé** | Sous-pages /laboratoire-geo/vultifrine/* sans disclaimer immédiat de fictivité ; title /audit-seo "48h" vs corps "5-10 jours" |
| Plagiarized content | Aucun signal | Contenu original, voix éditoriale identifiable |
| Unmaintained / abandoned | Non | dateModified à jour, blog actif |
| Inadequate purpose | Non | Purpose clair sur chaque page |
| Hateful / harmful content | Non | RAS |
| Lacks transparent contact info | Non | /contact + /mentions-legales propres |
| Insufficient author credentials (YMYL) | **Risque modéré** | Diplôme non précisé, certif non sourcée, pas de publications externes peer-reviewed |

**Le flag rouge principal** : *Misleading information* sur les sous-pages vultifrine. C'est ce flag, et lui seul, qui peut faire basculer la note d'une URL en **Lowest**. Les autres pages restent dans une zone Medium / Low récupérable.

---

## 5. Promotional content — site MC dominé par la promo ?

QRG section 4.6 : *Pages with so much promotional content that the MC is essentially obscured*.

Évaluation rapide :
- Homepage : ratio 30/70 promo/contenu. **OK**.
- /audit-seo : 2 CTA modaux + 1 phone CTA + 1 Link contact. Sur ~3000 mots de contenu, c'est sain.
- /seo-local : 2 CTA hero. Acceptable.
- Pages villes : 2-3 CTA. OK.
- Articles blog : 1 CTA bottom + 2-3 liens internes vers services. **C'est en-dessous du seuil** que QRG considère problématique.

**Verdict** : indhack.com **n'est pas** *MC dominated by promotional content*. Le contenu informatif domine. C'est un point fort qu'il faut préserver — beaucoup de sites de consultants tombent dans le piège opposé (page service = brochure marketing). Indhack a su faire des pages avec contenu utile, ce qui sera apprécié d'un rater.

Mais une nuance importante : la **qualité du contenu informatif** doit être à la hauteur des promesses commerciales. Quand on revendique "+150 points analysés", il faut que la page liste les 150 points (ou un échantillon crédible). Aujourd'hui, le chiffre est asséné sans démonstration. C'est un *trust gap* documenté par Marie Haynes dans ses cas de récupération post-Helpful Content Update.

---

## 6. Title / snippet trustworthiness

Audit des titles principaux versus contenu effectif.

| Title | Promesse | Tenue dans le contenu ? |
|---|---|---|
| "Audit SEO complet \| +150 points analysés en 48h" | 150 points + 48h | **Non sur les 150 points** (jamais listés exhaustivement), **non sur les 48h** (FAQ dit 5-10 jours) |
| "Consultante SEO & GEO — référencement & visibilité IA" | Expertise duale SEO+GEO | OK, étayée par concours GEO gagné |
| "Vultifrine : guide complet, études et comparatif 2026" | Guide complet d'un actif | Trompeur sans label "fictif" dans le title pour les sous-URLs |
| "À propos — Indiana Aflalo, consultante SEO" | Présentation auteure | OK |

**Recommandation** : changer le title /audit-seo en "Audit SEO complet en 5 à 10 jours — diagnostic technique et sémantique" et déplacer le "+150 points" dans la H2 avec liste vérifiable.

---

## 7. E-E-A-T author signal score : 4 / 10

Décomposition :

| Critère | Score | Justification |
|---|---|---|
| Identité de l'auteure publiquement identifiable | 1.5/2 | Nom, photo, bio, page /a-propos OK |
| sameAs schema riche | 0.5/2 | 1 seul lien LinkedIn sur a-propos (le schema vultifrine en a 5 mais cette page est borderline). Marie Haynes recommande 5-7 minimum |
| Mentions externes vérifiables | 0.5/2 | Concours GEO 2026 = 1 vraie preuve. Sinon rien : pas de podcast invitée, pas d'article presse, pas de conférence |
| Credentials précis et vérifiables | 0.5/2 | Diplôme sans école, certif sans lien, "7+ ans" sans CV public |
| Production éditoriale propre cohérente | 1/2 | 21 articles blog dont plusieurs de qualité High. C'est ce qui sauve le score |

**Total : 4 / 10**. Un score Medium-Low. Pour passer à 7/10 il faut, par ordre de priorité :
1. Enrichir sameAs avec 5-7 profils externes actifs (X, Mastodon, Medium, dev.to, YouTube, LinkedIn, Wikidata)
2. Préciser l'établissement du Master + lien vérifiable
3. Obtenir 2-3 mentions presse / podcasts / interviews externes documentées
4. Corroborer les 50+ clients avec un portfolio anonymisé chiffré

---

## 8. Action plan recovery — 60 jours

**Phase 1 — semaines 1-2 : stop the bleeding YMYL**
- Ajouter un encart disclaimer **fictif vultifrine** en haut de chaque sous-URL /laboratoire-geo/vultifrine/* (acheter-bio-france, etudes-cliniques, bienfaits-regeneration, etc.). Encart visible, jaune, première vue, avant tout contenu chiffré.
- Ajouter le même disclaimer en chapô de /blog/etude-de-cas-geo-vultifrine, en italique gras, dans les 100 premiers mots.
- Corriger le title /audit-seo : enlever "48h", aligner avec FAQ.

**Phase 2 — semaines 3-4 : E-E-A-T author signals**
- Réécrire /a-propos avec : nom de l'école du Master, lien certificate GA4, lien vers profil Semrush Academy si possible, ajout sameAs 5+ profils (LinkedIn, Wikidata déjà là, Medium, dev.to, YouTube — confirmer qu'ils sont actifs et qualitatifs).
- Remplacer "50+ clients" par un chiffre précis sourcé ou un portfolio cliquable avec 5-10 cas anonymisés (industrie, durée, résultat chiffré).
- Ajouter sur /a-propos une section "Mentions externes" : podcast, intervention, citation presse — au moins 3 entrées d'ici fin J60.

**Phase 3 — semaines 5-6 : trust signals home + service pages**
- Bloc "Vu dans" sur la home avec les vraies sources (ne pas inventer) : annonce concours GEO GreenRed, podcast invitée, etc.
- Ajouter sur /audit-seo et /consultant-seo un *teardown* public : auditer un site connu (ex : un ancien client autorisé) avec captures, et publier le rapport. C'est ce que Marie Haynes appelle *demonstrate expertise rather than declare it*.
- Intégrer un widget Trustpilot ou avis Google Business Profile vérifiables (pas juste "4.9" en chiffre nu).

**Phase 4 — semaines 7-8 : reputation & corroboration**
- Pitch 3 podcasts SEO francophones pour interview (Olivier Andrieu, Aymeric Bouillat, Daniel Roch) sur la victoire concours GEO.
- Soumettre 1 tribune externe sur un media tech français (Frenchweb, BDM, Webmarketing&co).
- Demander à GreenRed de publier le classement officiel et linker depuis /blog/concours-geo-greenred-2026-methode.
- Créer ou enrichir Wikidata Q139232810 avec les sources externes nouvelles, viser 8-10 statements.

**KPIs à 60 jours**
- Page Quality moyenne sur les 10 pages auditées : viser 6 High / 3 Medium / 1 Low.
- E-E-A-T author score : passer de 4/10 à 7/10.
- Aucune sous-URL vultifrine sans disclaimer immédiat.
- Au moins 3 mentions externes vérifiables ajoutées sur /a-propos.

---

## Verdict final tranché

Si Google envoyait un Quality Rater évaluer 10 pages au hasard sur indhack.com aujourd'hui, le verdict serait : **2 High, 7 Medium, 1 Low**, avec une **alerte rouge** sur le cluster /laboratoire-geo/vultifrine pour *Misleading information* sur sujet YMYL Health-adjacent. C'est exactement le profil de site que Marie Haynes voit chuter dans un Core Update.

La bonne nouvelle : le contenu de fond est sincère, l'auteure existe, le concours GEO est une preuve de compétence rare. Avec 60 jours d'exécution disciplinée sur le plan ci-dessus, le site peut passer en moyenne **High** et neutraliser le risque YMYL. Le pire serait de continuer à empiler des chiffres ronds non sourcés en pensant que ça construit l'autorité — c'est l'inverse, ça la dégrade aux yeux des raters formés à QRG 2025.

Le levier le plus rentable des 60 prochains jours : **transformer la victoire concours GEO en machine à mentions externes**. C'est la seule preuve incontestable que le site possède aujourd'hui. Tout le reste découle de ça.
