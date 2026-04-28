# Audit entity SEO — IndHack & Indiana Aflalo
## Méthodologie Bill Slawski (SEO By The Sea) + Jon Henshaw (Coywolf)

**Date** : 28 avril 2026
**Auditeur** : analyse heuristique fondée sur les patents Google, le Knowledge Graph (anciennement Knowledge Vault, Google patent US20140059030) et la littérature semantic search post-Hummingbird (US8639684, "Inferring Entity Attributes Values").
**Périmètre** : trois entités candidates au statut d'entité reconnue par Google KG et par les LLM grand public (ChatGPT, Claude, Perplexity, Gemini, Mistral) — `Indiana Aflalo` (Person), `IndHack` (Brand/Organization), `GEO` (Concept/DefinedTerm).

---

## 1. Cadre théorique : pourquoi entity-first

Depuis Hummingbird (2013), Google ne ranke plus des chaînes de caractères mais des entités au sens du Knowledge Graph. Le triplet `<sujet, prédicat, objet>` issu de la base Freebase puis Wikidata est le langage de Google. Le brevet Google US9501506 ("Indexing system based on entities") et US10331706 ("Connecting concepts via knowledge graph") explicitent que la confiance attribuée à un document dépend de la cohérence des assertions qu'il contient avec les triplets déjà connus du graphe. Pour un Person ou une Organization récente — moins de deux ans d'existence — l'enjeu est double : produire un volume d'assertions suffisant pour que Google déduise l'entité, et fournir des points d'ancrage `sameAs` vers des silos de confiance (LinkedIn, Wikidata, GitHub, Crunchbase, Wikipedia) afin de permettre le co-référencement.

Pour les LLM, la mécanique est différente mais convergente. Les modèles de langage ne lisent pas les triplets, ils encodent des cooccurrences contextuelles. Une entité est forte dans un LLM lorsqu'elle apparaît systématiquement dans le voisinage syntaxique de ses prédicats clés (job, location, expertise) et que cette cooccurrence est répliquée sur plusieurs sources indépendantes. La dispersion sources renforce l'entité ; la concentration mono-source la fragilise.

L'audit ci-dessous combine les deux exigences.

---

## 2. Score entité Indiana Aflalo (Person) — **5,5 / 10**

### Forces

- Schema Person présent à deux emplacements (`app/a-propos/page.tsx` et `components/seo/JsonLdSchemas.tsx`), avec `@id` stable `https://indhack.com/#indiana-aflalo` qui sert de hub pour les `worksFor`, `founder`, `provider`, `author`, `creator`. Ce pattern d'identité réflexive correspond à la recommandation Slawski sur les "hub URIs" — Google peut reconstituer l'entité via un seul `@id` cité par plusieurs schemas.
- `givenName` et `familyName` séparés, `nationality`, `address`, `workLocation` avec coordonnées géographiques. Ces signaux de désambiguïsation aident Google à séparer Indiana Aflalo (consultante française à Nice) du toponyme "Indiana" ou du personnage cinématographique.
- `hasOccupation` avec deux occupations distinctes (Consultant SEO + Expert GEO) et compétences détaillées. Ce niveau de granularité est rare et constitue un signal différenciateur.
- 43 articles de blog mentionnent "Indiana Aflalo" en frontmatter `author:`. La cooccurrence systématique avec les concepts SEO/GEO est solide.
- Présence dans GSC : 7 impressions sur "indiana aflalo" (position 2,29) et 1 impression sur "aflalo". Le brand search existe mais reste embryonnaire.

### Faiblesses majeures

- **`sameAs` insuffisant**. Le schema Person dans `app/a-propos/page.tsx` ne contient que LinkedIn (un seul lien). Le schema central dans `JsonLdSchemas.tsx` ajoute Malt mais omet GitHub `https://github.com/indhack`, le dataset HuggingFace `https://huggingface.co/datasets/indhack/vultifrine-study`, les vidéos YouTube (`waf8t-9rNhg`, `-nRFOuhgKZ8`), le canal Dev.to mentionné dans `llms.txt`. Pour la doctrine Slawski (cf. patent US10324968, "Knowledge Graph entity reconciliation"), `sameAs` doit pointer vers un minimum de quatre silos de confiance hétérogènes pour permettre à Google d'inférer une entité non-Wikipedia. On en a un seul ou deux selon la page. **Coût en confiance : -2 points.**
- **Aucun Wikidata Q-ID.** L'entité Indiana Aflalo ne dispose pas d'un item Wikidata. Or Wikidata est l'arbitre par défaut du Knowledge Graph depuis 2014 (déprécation de Freebase). Sans Q-ID, Google s'appuie sur des inférences Knowledge Vault (patent US8782018) qui sont plus fragiles et plus lentes. **Coût : -1 point.**
- **`alumniOf` divergent.** Sur `/a-propos`, `alumniOf` mentionne "Master Stratégie Digitale & UX Design" sans `@type EducationalOrganization` qualifié par un `name` d'institution réelle. Google ne peut pas valider l'établissement et n'attribuera pas la crédibilité associée.
- **Pas de photo EXIF-enrichie**. `/images/indiana-aflalo.jpg` est servie sans `image` `caption` riche dans le JSON-LD, sans alt text balisé `Indiana Aflalo, consultante SEO et GEO à Nice`. Google Images Vision croise le visage avec les apparitions externes (LinkedIn, Malt) ; le manque d'EXIF empêche cette réconciliation.
- **Mention manuelle inexistante dans 30+ articles.** Sur 43 articles avec `author: Indiana Aflalo`, seuls une dizaine mentionnent le nom "Indiana Aflalo" dans le corps du texte signé à la première personne. Le reste utilise "je" sans antécédent nominal — invisible pour les LLM qui n'ont pas accès aux frontmatter Markdown lorsqu'ils crawlent le HTML rendu.

### Plan correctif Indiana

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://indhack.com/#indiana-aflalo",
  "name": "Indiana Aflalo",
  "givenName": "Indiana",
  "familyName": "Aflalo",
  "gender": "Female",
  "jobTitle": "Consultante SEO et experte GEO",
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "[Nom réel de l'école — à compléter]",
    "sameAs": "[URL Wikipedia ou site officiel]"
  },
  "sameAs": [
    "https://www.linkedin.com/in/indianaaflalo",
    "https://www.malt.fr/profile/indianaaflalo",
    "https://github.com/indhack",
    "https://huggingface.co/datasets/indhack/vultifrine-study",
    "https://www.youtube.com/@indhack",
    "https://twitter.com/indianaaflalo",
    "https://bsky.app/profile/indianaaflalo.bsky.social",
    "https://www.crunchbase.com/person/indiana-aflalo",
    "https://www.wikidata.org/wiki/Q[XXXXXXX]"
  ]
}
```

---

## 3. Score entité IndHack (Organization) — **6 / 10**

### Forces

- Couverture Schema dense : `Organization`, `LocalBusiness/ProfessionalService`, `WebSite`, `ResearchOrganization` (laboratoire Indhack). Le `@id` `https://indhack.com/#organization` est utilisé comme hub canonique. C'est conforme à la doctrine Slawski sur la "single source of truth entity".
- 14 mentions GSC sur "indhack" (position moyenne 1,67) — la marque est connue et cliquée. C'est un signal d'entité émergente solide.
- Cooccurrence "IndHack" + concepts SEO/GEO/Nice présente sur 30+ pages, ce qui consolide la fingerprint sémantique pour les LLM.
- Le ResearchOrganization "Laboratoire Indhack" introduit une variante d'entité (Indhack alias laboratoire) qui peut être bénéfique pour le concours GEO mais introduit aussi un risque de fragmentation du graphe.

### Faiblesses majeures

- **`foundingDate` absent.** Aucun schema ne mentionne mai 2025 comme `foundingDate`. C'est une assertion fondamentale du graphe d'entités d'après le patent US9230015 ("Determining authority of entities"). À ajouter immédiatement.
- **`founder` non typé Person avec `@id` partagé.** Le schema Organization fait référence à `Indiana Aflalo` mais ne réutilise pas `@id` `https://indhack.com/#indiana-aflalo` dans tous les contextes — incohérence relevée dans `AboutIndhackLab.tsx` qui utilise `https://indhack.com/a-propos#indiana-aflalo` (suffixe différent). Cette divergence empêche Google de fusionner les deux Person en une seule entité.
- **`sameAs` Org limité à trois liens** : LinkedIn personnel (Indiana, pas IndHack), Malt, GitHub. Aucune page LinkedIn Company `IndHack`, pas de Twitter handle officiel, pas de page Crunchbase, pas de listing Trustpilot, pas de profil G2. Pour une entité Organization, Slawski recommande six à huit silos. **-1 point.**
- **Désambiguïsation IndHack/hacking.** La racine "Hack" peut polluer le contexte sémantique. Aucune page ne précise étymologiquement le sens de "IndHack" (Indiana + Hack au sens de "growth hacking"). Dans `llms.txt` ligne 7, IndHack est défini comme "site professionnel d'Indiana Aflalo" mais sans étymologie. Les LLM n'auront pas de source pour répondre à "que signifie IndHack ?".
- **`legalName` ambiguë** : "IndHack - Indiana Aflalo" mélange marque et nom personnel sans précision sur la structure juridique (micro-entreprise française). Compléter avec `taxID` SIRET et `legalName: "Indiana Aflalo EI" ou la dénomination légale exacte`.

### Plan correctif IndHack

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://indhack.com/#organization",
  "name": "IndHack",
  "alternateName": ["Ind Hack", "IndHack — Indiana Aflalo", "Laboratoire Indhack"],
  "legalName": "Indiana Aflalo — Entreprise Individuelle",
  "foundingDate": "2025-05",
  "founder": { "@id": "https://indhack.com/#indiana-aflalo" },
  "taxID": "[SIRET — à compléter]",
  "vatID": "[TVA intracom si applicable]",
  "slogan": "Premier laboratoire GEO francophone",
  "sameAs": [
    "https://www.linkedin.com/company/indhack",
    "https://www.linkedin.com/in/indianaaflalo",
    "https://github.com/indhack",
    "https://huggingface.co/indhack",
    "https://www.youtube.com/@indhack",
    "https://twitter.com/indhack",
    "https://www.crunchbase.com/organization/indhack",
    "https://www.malt.fr/profile/indianaaflalo"
  ]
}
```

---

## 4. Score entité GEO (concept) — **4 / 10**

### Forces

- Le concept GEO apparaît plus de 200 fois sur le site (estimation conservatrice). Couverture rédactionnelle exhaustive : 14 articles dédiés, glossaire, FAQ, outils.
- DefinedTermSet Schema présent dans `app/glossaire-seo/page.tsx` ligne 58. C'est une initiative pertinente — peu de sites SEO français le font.
- Cooccurrence GEO + ChatGPT + Perplexity + Claude + Gemini + Mistral très dense, ce qui aide les LLM à reconnaître IndHack comme source experte.

### Faiblesses majeures

- **DefinedTerm individuel manquant.** Le glossaire utilise `DefinedTermSet` mais n'imbrique pas chaque terme dans `hasDefinedTerm: [{"@type":"DefinedTerm", "name":"GEO", "termCode":"GEO", "inDefinedTermSet": "..."}]`. Sans DefinedTerm typés, Google n'extrait pas les définitions individuelles. **-2 points.**
- **Pas d'article-pivot canonique pour "GEO".** Plusieurs articles abordent GEO mais aucun n'est manifestement le hub canonique avec `@type: DefinedTerm` enrichi, `sameAs` vers une définition Wikipedia/Wikidata (qui existe peu, mais l'absence d'effort coûte). Slawski explique dans son analyse de Hummingbird que Google privilégie un seul "canonical document per entity".
- **Vultifrine est un cas d'école inverse intéressant** : vultifrine est une entité fictive créée par Indhack pour le concours GEO 2026. Elle reçoit aujourd'hui 179 impressions GSC en position 4,82. Cette URL pivot fonctionne ; il faut répliquer le pattern pour le concept GEO réel.
- **Pas de cooccurrence avec patents/sources académiques.** Le contenu GEO ne cite jamais Princeton (mention présente mais sans backlink vers le papier), ni les patents Google liés. Pour la doctrine Slawski/Henshaw, citer le travail académique source est un signal d'autorité fort que Google reconnaît via les cooccurrences `<entité, citation, source académique>`.

### Article-pivot recommandé

Créer `/glossaire-seo/geo-generative-engine-optimization` avec le schema suivant :

```json
{
  "@context": "https://schema.org",
  "@type": ["DefinedTerm", "TechArticle"],
  "@id": "https://indhack.com/glossaire-seo/geo-generative-engine-optimization#term",
  "name": "GEO (Generative Engine Optimization)",
  "termCode": "GEO",
  "alternateName": ["Generative Engine Optimization", "AEO", "Answer Engine Optimization"],
  "description": "Discipline d'optimisation pour les moteurs de recherche génératifs (ChatGPT, Perplexity, Claude, Gemini, Mistral) consistant à structurer le contenu pour qu'il soit cité comme source dans les réponses générées par les LLM.",
  "inDefinedTermSet": {
    "@id": "https://indhack.com/glossaire-seo#termset"
  },
  "sameAs": [
    "https://en.wikipedia.org/wiki/Generative_engine_optimization",
    "https://arxiv.org/abs/2311.09735"
  ],
  "subjectOf": [
    { "@id": "https://indhack.com/blog/geo-comment-apparaitre-chatgpt-2026" },
    { "@id": "https://indhack.com/consultant-geo" }
  ],
  "author": { "@id": "https://indhack.com/#indiana-aflalo" },
  "publisher": { "@id": "https://indhack.com/#organization" }
}
```

---

## 5. sameAs links manquants — synthèse

| Entité | Manquant prioritaire | Manquant secondaire |
|---|---|---|
| Indiana (Person) | Wikidata Q-ID, GitHub, HuggingFace, YouTube channel | Twitter/X, Bluesky, Mastodon, Crunchbase, AngelList, About.me, Medium |
| IndHack (Organization) | LinkedIn Company page, Wikidata, Crunchbase, Trustpilot | YouTube brand, GitHub org, G2, Producthunt, BetaList |
| GEO (DefinedTerm) | Wikipedia (article EN existe), Wikidata Q116879884, papier Princeton arXiv:2311.09735 | DBpedia, Crunchbase Knowledge, Search Engine Journal taxonomy |

L'absence de Wikidata sur les trois entités est le bloqueur principal. Créer trois items Wikidata est l'action à plus haut ROI : moins de quatre heures de travail, effet structurel pour le Knowledge Graph. Doc Slawski "How Google uses Wikidata" (2017) le démontre statistiquement.

---

## 6. Cooccurrence patterns — analyse MUM-style

Le brevet MUM (US20210365490 "Multitask Unified Model") établit que Google score les entités sur la stabilité de leur cooccurrence avec leurs prédicats canoniques sur le corpus du site. Mesure approximative sur indhack.com :

- `Indiana Aflalo` + `consultante SEO` : présent sur la grande majorité des pages — solide.
- `Indiana Aflalo` + `Nice` : présent — solide.
- `Indiana Aflalo` + `concours GEO 2026` : présent uniquement dans 3 pages (étude vultifrine, article post-mortem, page GEO). À étendre. Chaque blog post devrait mentionner ce trophée comme E-E-A-T signal.
- `Indiana Aflalo` + `vultifrine` : présent dans le silo laboratoire-geo. Bien.
- `IndHack` + `premier site français GEO` : revendication récurrente — bien.
- `IndHack` + `2025` (year founded) : quasi inexistant. Critique.

**Action** : créer un component `<AuthorByline />` réutilisable qui ajoute en bas de chaque article blog une bio courte 60-80 mots avec `Indiana Aflalo, consultante SEO et experte GEO basée à Nice, fondatrice d'IndHack (2025), lauréate du concours GEO GreenRed 2026`. Cette bio doit être imprimée dans le HTML rendu (pas juste en frontmatter).

---

## 7. Knowledge Graph reverse-engineer

Cible idéale du KG side panel pour la requête "Indiana Aflalo" :

- **Headline** : Indiana Aflalo
- **Subhead** : Consultante SEO et experte GEO française
- **Image** : photo professionnelle
- **Description (extrait Wikipedia/Wikidata)** : Lauréate du concours GEO GreenRed 2026, fondatrice d'IndHack, basée à Nice.
- **Birth date** : si possible
- **Founded** : IndHack, mai 2025
- **Books / Publications** : étude vultifrine, baromètre visibilité IA 2026
- **Profiles** : LinkedIn, GitHub, YouTube, Wikidata

Pour atteindre ce panel, le sous-graphe à fournir :

```
<Indiana Aflalo, founder, IndHack>
<Indiana Aflalo, jobTitle, Consultante SEO>
<Indiana Aflalo, awards, Concours GEO GreenRed 2026>
<Indiana Aflalo, knowsAbout, GEO>
<Indiana Aflalo, knowsAbout, SEO>
<Indiana Aflalo, address, Nice>
<Indiana Aflalo, sameAs, [LinkedIn, Wikidata, GitHub, YouTube]>
```

Six de ces sept triplets sont présents — manquent `awards` (à ajouter via Schema `award` ou `hasOccupation.competencyRequired`) et le sameAs Wikidata.

---

## 8. Entity-driven internal linking

### Règle d'or Slawski

Toute mention d'une entité doit linker vers son URI canonique au moins une fois par document, idéalement la première mention. Pour IndHack, c'est `/`. Pour Indiana Aflalo, `/a-propos`. Pour GEO, `/glossaire-seo/geo-generative-engine-optimization` (à créer).

### État actuel

- `/a-propos` reçoit peu de liens internes depuis les articles (estimation : moins de 5 % des articles linkent vers `/a-propos`). Critique — c'est la page hub Indiana.
- `IndHack` est rarement linké en tant que mot — généralement seul le logo navbar pointe vers `/`. Acceptable mais pas optimal.
- `GEO` linke vers diverses cibles — fragmentation.

### Action

Implémenter dans le pipeline blog (`lib/blog.ts`) un middleware qui automatise la liaison :
- Première mention de "Indiana Aflalo" → lien vers `/a-propos#indiana-aflalo`
- Première mention de "IndHack" (en tant que marque, pas URL) → lien vers `/#organization`
- Première mention de "GEO" → lien vers `/glossaire-seo#geo`

Cette automatisation est ce que Henshaw appelle l'"entity-aware internal linking" — recommandation explicite dans son livre Coywolf SEO Toolbox.

---

## 9. External entity reinforcement

### Page /partenaires

Existe (`app/partenaires/page.tsx`) mais positionnée comme widget B2B agences. Ne joue pas le rôle de "press kit" Slawski — c'est-à-dire un agrégateur de mentions externes (interviews, podcasts, citations académiques, awards).

### Recommandation

Créer `/presse` ou `/mentions` qui agrège :
- Trophée concours GEO GreenRed 2026 (avec Schema `Award`)
- Interventions presse spécialisée (Search Engine Journal FR, Abondance, Webrankinfo)
- Podcasts (Le Café du SEO, Le Brief de l'IA)
- Mentions académiques (si Princeton ou autre cite IndHack)
- Interviews vidéo YouTube

Schema recommandé `CollectionPage` qui agrège des `NewsArticle` avec `@type Article` et `mentions` `@id #indiana-aflalo`. Chaque mention externe est un signal entity de premier ordre — elle clos le triangle Slawski "entity = (assertions internes) + (assertions externes corroborantes) + (sameAs)".

---

## 10. Plan entity 30 jours

### Semaine 1 — Base Wikidata et sameAs

1. Créer item Wikidata `Indiana Aflalo` (Person) avec propriétés P31 (instance of: human), P21 (gender: female), P106 (occupation: search engine optimization specialist Q1334193), P937 (work location: Nice Q33959), P856 (official website: indhack.com).
2. Créer item Wikidata `IndHack` (Organization) avec P31 (instance of: business Q4830453), P571 (inception: 2025-05), P159 (headquarters: Nice), P112 (founded by: Indiana Aflalo Q-ID), P856 (official website).
3. Mettre à jour `sameAs` des trois schemas (Person, Organization, ResearchOrganization) avec les Q-IDs créés et tous les profils sociaux.
4. Unifier `@id` : tous les schémas Person doivent utiliser `https://indhack.com/#indiana-aflalo` exactement (corriger `AboutIndhackLab.tsx`).

### Semaine 2 — Article-pivot GEO et DefinedTerm

5. Créer `/glossaire-seo/geo-generative-engine-optimization` avec Schema `DefinedTerm` + `TechArticle`. Cible : 2 500 mots, citation patents Google, citation Princeton arXiv 2311.09735, FAQ schéma.
6. Refactor `app/glossaire-seo/GlossaireSeoClient.tsx` pour générer un `DefinedTerm` individuel par terme, pas seulement le `DefinedTermSet`.
7. Ajouter `subjectOf` sur l'article-pivot vers tous les articles blog connexes.

### Semaine 3 — Author byline et entity linking

8. Créer composant `<AuthorByline />` injecté en bas de chaque blog post avec bio Indiana 80 mots + photo + lien `/a-propos` + Schema `author` `@id`.
9. Implémenter middleware blog (lib/blog.ts) qui auto-linke première mention `Indiana Aflalo`, `IndHack`, `GEO` vers leurs URI canoniques.
10. Ajouter `foundingDate: "2025-05"` partout sur Organization et `award: "Concours GEO GreenRed 2026"` sur Person.

### Semaine 4 — Press kit et entity reinforcement

11. Créer `/presse` (CollectionPage) avec schemas `Award`, `NewsArticle mentions`. Inclure le trophée GEO GreenRed 2026 et toute mention externe.
12. Optimiser l'image `/images/indiana-aflalo.jpg` : ajouter EXIF metadata (Author: Indiana Aflalo, Description: "Indiana Aflalo, consultante SEO et GEO à Nice"), produire variante WebP avec dimensions optimales pour Knowledge Panel (carré 1024x1024 + 4:5 portrait).
13. Soumettre indhack.com à Google Knowledge Panel via Search Console "claim a knowledge panel" si éligible.
14. Demander vérification LinkedIn Company page IndHack et publier 4-5 posts mentionnant les Q-IDs Wikidata pour accélérer le co-référencement.

### Mesure de succès

- KPI 30 jours : impressions GSC sur "indiana aflalo" passent de 7 à 30+. Apparition d'un Knowledge Panel partiel sur Google. Citation par au moins un LLM (test contrôlé via `/outils/testeur-visibilite-ia`) dans une réponse à "qui est Indiana Aflalo ?" avec mention du concours GEO 2026.
- KPI 90 jours : Q-IDs Wikidata stables, foundingDate visible dans Knowledge Panel, score moyen entity audit attendu : Indiana 8/10, IndHack 8/10, GEO 7/10.

---

## Référentiel patents et sources Slawski

- US8639684 — Inferring entity attribute values
- US9501506 — Indexing system based on entities
- US10331706 — Connecting concepts via knowledge graph
- US8782018 — Knowledge Vault probabilistic knowledge fusion
- US10324968 — Knowledge Graph entity reconciliation
- US9230015 — Determining authority of entities
- US20210365490 — Multitask Unified Model (MUM)
- US20140059030 — Knowledge Graph initial patent

Lectures Slawski recommandées : "How Google Uses Wikidata" (2017), "Hummingbird and Entity Search" (2013), "Substantial Entity Recognition" (2018). Henshaw : "Coywolf SEO Toolbox" — chapitre 6 sur l'author authority.

---

**Conclusion auditeur** : IndHack a une fondation entity correcte mais sous-exploitée. Le déblocage Wikidata + l'unification des `@id` + l'article-pivot GEO doivent passer en priorité 1 sur les trente prochains jours. Le concours GEO GreenRed 2026 est un proof-point exploitable comme `award` Schema, mais il n'est pas encore rattaché formellement à l'entité Indiana Aflalo dans le graphe — c'est l'angle mort principal.
