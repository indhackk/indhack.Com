# Brief complet pour Codex — projet IndHack

Document de contexte exhaustif. À lire entièrement avant toute action sur le repo `indhack.com`.

Mis à jour : 2 mai 2026.

---

## Sommaire

1. Identité de la cliente et de la marque
2. Le concours GEO 2026 et la victoire
3. L'écosystème business
4. Stack technique et architecture du site
5. Cocon sémantique et maillage interne
6. Stratégie SEO classique
7. Stratégie GEO (Generative Engine Optimization)
8. Performances Search Console actuelles
9. Audits experts effectués (2026-04 à 2026-05) et leurs findings
10. Travaux en cours et déjà appliqués
11. Pages et contenus sensibles à ne pas modifier
12. Conventions de code et typographiques strictes
13. Concurrents directs et positionnement
14. Roadmap court et moyen terme
15. Préférences personnelles d'Indiana sur la collaboration

---

## 1. Identité de la cliente et de la marque

**Indiana Aflalo** est consultante SEO et GEO indépendante en France. Elle exerce sous le statut de micro-entrepreneur depuis Nice, sur la Côte d'Azur. Elle a 7 ans d'expérience en référencement naturel, accompagne principalement des PME, des startups et des commerçants locaux, et se positionne comme l'une des rares spécialistes françaises du Generative Engine Optimization, c'est-à-dire l'optimisation des contenus pour qu'ils soient cités par les moteurs de recherche basés sur des modèles de langage (ChatGPT Search, Claude, Perplexity, Mistral Le Chat, Google Gemini, AI Mode de Google).

Sa marque commerciale est **IndHack** (un seul mot, pas d'espace, le "I" et le "H" majuscules dans les supports marketing, mais juste "Indhack" en bas-de-casse acceptable dans le code et les schemas). La marque est portée par sa personne, Indiana est l'unique employée et la seule visage public. Elle n'a pas d'équipe ni de salariés.

**Coordonnées vérifiées** :
- Site officiel : https://indhack.com
- Email professionnel : contact@indhack.com
- Téléphone : 06 61 13 97 48 (au format international `+33661139748` dans les schemas)
- LinkedIn : https://www.linkedin.com/in/indianaaflalo
- GitHub : https://github.com/indhack
- Malt : https://www.malt.fr/profile/indianaaflalo
- Data.gouv : https://www.data.gouv.fr/organizations/indhack
- YouTube vidéo concours : https://www.youtube.com/watch?v=waf8t-9rNhg
- Domiciliation déclarée : Nice, France

**Date de création du domaine indhack.com** : 30 mai 2025 selon le whois. Le site a donc environ 12 mois au moment de la rédaction de ce document. Cette jeunesse explique en partie les positions Google moyennes encore élevées (≈ pos 41) malgré la qualité éditoriale.

**Positionnement éditorial** : ton expert et direct, sans jargon excessif, avec une voix personnelle assumée. Indiana refuse les formulations marketing creuses, les listes à rallonge sans synthèse, et les promesses non chiffrées. Elle aime les chiffres ronds, les expressions parlées françaises ("à la louche", "lundi matin") et les opinions tranchées défendues avec données.

---

## 2. Le concours GEO 2026 et la victoire

En avril 2026, l'agence française **GreenRed**, dirigée par Houssam Cherhabil, a organisé le **premier concours GEO français**. Le principe consistait à faire ranker un site sur un mot-clé totalement fictif, **"vultifrine"** (un nom inventé qui ne correspond à aucune réalité linguistique ou commerciale), sur cinq IA simultanées : Mistral Le Chat, ChatGPT Search, Claude, Perplexity et Google Gemini. Dix requêtes thématiques étaient testées chaque jour pendant trente jours sur les cinq plateformes. La position dans les citations de chaque IA donnait un score, et le classement des participants évoluait quotidiennement.

**Indiana a remporté le concours** en battant 153 autres participants. Sa méthode publique a été documentée dans un livre blanc de 43 pages publié sur indhack.com sous le slug `/livre-blanc-geo-2026`, accompagné d'une étude de cas détaillée publiée en blog (`/blog/etude-de-cas-geo-vultifrine`) et d'un article de méthode (`/blog/concours-geo-greenred-2026-methode`).

**Données de mesure finale** sur les dix requêtes du concours, pour la marque IndHack (donc citations attribuées au site indhack.com) :
- Mistral Le Chat : **71 citations** sur 30 jours
- ChatGPT Search : **45 citations**
- Claude (Anthropic) : **38 citations**
- Perplexity : **9 citations**
- Google Gemini : **5 citations**

Soit **168 citations cumulées en 27 jours** d'optimisation effective. Le ratio Mistral / Gemini de **14×** est la donnée la plus saisissante, parce qu'aucun autre acteur français n'a publié ce différentiel sur protocole identique.

**Les sept piliers techniques** appliqués par Indiana (documentés dans son livre blanc) :
1. **Entity stack avec entités propriétaires codées** : création d'identifiants uniques (Indhack-VLT-MA-2026, IPV-Indhack©, etc.) pour ancrer la marque dans les corpus IA.
2. **Schemas académiques et riches** : Article, ScholarlyArticle, Dataset avec variableMeasured, FAQPage, Product, Person, Organization, DefinedTerm, SpeakableSpecification, VideoObject avec Clip et SeekToAction.
3. **Format BLUF (Bottom Line Up Front)** systématique : 40 mots de réponse définitionnelle citables au début de chaque H2.
4. **Corroboration multi-sources** : la même information injectée sur 8 canaux distincts (page principale, sous-pages thématiques, blog, llms.txt, dataset HuggingFace, vidéo YouTube longue, tentatives Wikimedia, site satellite).
5. **Injection dans les données d'entraînement** : datasets uploadés sur HuggingFace, fichier vultifrine-study.json à la racine, contenu mis à disposition des crawlers Common Crawl et Diffbot.
6. **Distribution multi-IA adaptée** : optimisation différenciée selon les préférences de chaque LLM (Mistral aime les listes structurées, Claude valorise la cohérence factuelle, Gemini privilégie YouTube long).
7. **Signaux de fraîcheur continus** : `dateModified` à jour, mentions explicites "mis à jour le", chiffres datés.

**Ce que le concours a démontré empiriquement** et qu'aucun autre français ne peut argumenter avec la même donnée :
- L'optimisation entitaire (Schema Person + Organization avec 6+ sameAs) prime sur la production de contenu pur.
- Les LLM ne se valent pas pour les marques françaises, le différentiel Mistral / Gemini est massif.
- La fraîcheur datée explicite multiplie les citations LLM par rapport à un contenu evergreen non daté.
- Le BLUF de 40 mots est l'unité de citation préférée des LLM.
- La corroboration multi-canaux compense l'absence de backlinks pour les sites jeunes.

---

## 3. L'écosystème business

Indiana facture en TJM ou en forfait selon les missions. Tarif "indep" évoqué dans ses notes internes : ≈350 € la correction, mensualisation pour les accompagnements longs.

**Services proposés sur le site** :
- Audit SEO complet (livré sous 48h, +150 points analysés, rapport PDF + visio de restitution 1h)
- Référencement naturel (accompagnement mensuel)
- SEO local (focus Côte d'Azur, mais couverture France)
- Consultant GEO (strategy + technique pour LLM)
- Consultant IA (intégration et automatisation entreprise)
- Création de site web (Next.js orienté SEO/GEO)
- Refonte de site web (sans perte de visibilité)
- Création de boutique e-commerce

**Ses outils gratuits déployés sur indhack.com** :
- `/outils/audit-seo-gratuit` : score /100 en 30 secondes, 15 critères dont compatibilité IA
- `/outils/testeur-visibilite-ia` : test sur 8 crawlers IA, scoring 4 axes
- `/outils/extracteur-mots-cles` : analyse densité et n-grammes
- `/outils/generateur-robots-txt` : robots.txt avec crawlers IA 2026
- `/outils/generateur-schema-json-ld` : générateur de schemas
- `/outils/simulateur-visibilite-locale` : qui domine votre ville
- `/outils/gmb-autopilot` : automatisation Google Business Profile
- `/outils/checker-accessibilite` : audit accessibilité

**Clients actuels connus dans les notes internes** :
- Aerodiscount (PrestaShop 8.1.5, refonte technique en cours)
- Wearcraft (B2B défense, officiers traditions, OTAN, aéroclubs)
- Captaineflamme (projet personnel)
- Plusieurs PME et commerces locaux Côte d'Azur

**Médias et reconnaissances** :
- Article publié par Abondance.com le 17 avril 2026 sur les résultats du concours GEO 2026.
- Mail du 1er mai 2026 de Victor Lerat (rédacteur Réacteur.com et Abondance) proposant deux articles : un papier technique pour Réacteur (audience pros) et un papier plus accessible pour Abondance.
- En cours : recherche d'opportunités podcasts SEO français, presse spécialisée FrenchWeb / Journal du Net / Siècle Digital.

---

## 4. Stack technique et architecture du site

**Stack** :
- Framework : Next.js 14.x avec App Router et Static Site Generation (SSG)
- Styling : Tailwind CSS avec palette personnalisée (sauge `#2E5E4E`, ink `#2A3830`, accent `#D4A853`)
- Animations : Framer Motion
- CMS : Keystatic pour l'administration éditoriale
- Blog : Markdown avec gray-matter pour les frontmatter
- Hébergement : Vercel
- Monitoring : Search Console + IndexNow pour Bing/Yandex + Google Indexing API
- Polices : Space Grotesk pour les titres, Inter pour le corps de texte

**Pages générées au build** : 132 pages SSG vérifiées au dernier build du 1er mai 2026.

**Catégories de pages** :
1. Homepage `/`
2. Pages mères catégorielles : `/consultant-seo`, `/seo-local`, `/creation-site-web`, `/outils`, `/blog`
3. Pages services individuels : `/audit-seo`, `/referencement-naturel`, `/refonte-site-web`, `/creation-boutique-en-ligne`, `/consultant-geo`, `/consultant-ia`, `/consultant-seo-freelance`
4. Pages villes (19 villes) : `/consultant-seo-aix-en-provence`, `/consultant-seo-antibes`, `/consultant-seo-bordeaux`, `/consultant-seo-boulogne-billancourt`, `/consultant-seo-cannes`, `/consultant-seo-grenoble`, `/consultant-seo-juan-les-pins`, `/consultant-seo-lille`, `/consultant-seo-lyon`, `/consultant-seo-marseille`, `/consultant-seo-monaco`, `/consultant-seo-montpellier`, `/consultant-seo-nantes`, `/consultant-seo-nice`, `/consultant-seo-paris`, `/consultant-seo-rennes`, `/consultant-seo-sophia-antipolis`, `/consultant-seo-strasbourg`, `/consultant-seo-toulouse`
5. Outils SEO gratuits (8 outils) sous `/outils/`
6. Blog : 41 articles markdown dans `content/blog/*.md`, dynamiquement rendus via `app/blog/[slug]/page.tsx`
7. Hub concours et étude vultifrine : `/laboratoire-geo` (page mère) et 11 sous-pages thématiques sous `/laboratoire-geo/vultifrine/`
8. Livre blanc : `/livre-blanc-geo-2026` (page longue avec 12 chapitres en page unique, plus PDF téléchargeable)
9. Diagnostic par métier : `/diagnostic/[metier]` dynamique
10. Checklist : `/checklist-geo`
11. Études de cas : `/etudes-de-cas`, et études individuelles dans `/etudes/` et `/etude/`
12. Pages support : `/a-propos`, `/contact`, `/faq`, `/mentions-legales`, `/confidentialite`, `/cgv`
13. Page presse / partenaires : `/partenaires`
14. Widget embeddable : `/widget/testeur-ia` (iframe à embarquer chez les agences)
15. Pages legacy redirigées : 77 redirects 301 dans `next.config.mjs`

**Structure du repo** :
```
app/                          → Next.js App Router (toutes les pages)
components/                   → 36+ composants React
  ├── NavbarOptimized.tsx     → Navigation principale (présente sur 132 pages)
  ├── MegaFooter.tsx          → Footer (présent sur 132 pages)
  ├── Hero.tsx                → Hero homepage
  ├── ServicesSection.tsx     → Section services homepage
  ├── templates/
  │   ├── CityPageTemplateV2.tsx     → Template des 19 villes
  │   └── CityServiceTemplate.tsx
  ├── seo/
  │   └── JsonLdSchemas.tsx          → Tous les schemas JSON-LD globaux
  ├── sections/                      → Sections homepage (GEOSection, CityCarousel, etc.)
  ├── blog/                          → Composants blog
  ├── diagnostic/                    → Composants diagnostic
  └── ui/                            → Composants UI primitives (shadcn/ui)
content/
  └── blog/                          → 41 articles markdown
lib/
  ├── blog.ts                        → Parsing markdown (getAllPosts, getPostBySlug)
  ├── cities-data.ts                 → 19 villes avec data complète (91 KB)
  ├── city-neighbors.ts              → Voisinages inter-villes pour maillage
  ├── validation.ts                  → Validation formulaires
  └── utils.ts                       → Utilitaires généraux
scripts/                             → 39 scripts d'automation (indexing, génération)
public/
  ├── images/blog/                   → Images articles en WebP
  ├── downloads/                     → PDFs téléchargeables (livre blanc, modèles)
  ├── robots.txt                     → 22 user-agents IA autorisés
  ├── sitemap.xml                    → 101 URLs
  ├── llms.txt                       → 41 articles, dernière maj 2026-04-28
  └── llms-full.txt                  → Version étendue
```

**Schemas JSON-LD utilisés** :
- Globaux dans `app/layout.tsx` : Organization, LocalBusiness, ProfessionalService, Person (Indiana Aflalo), WebSite
- Blog posts : BlogPosting, BreadcrumbList, FAQPage si FAQ, Person author, Article
- Pages villes : LocalBusiness avec areaServed, BreadcrumbList, FAQPage
- Pages services : Service, BreadcrumbList
- Vultifrine : Article, ScholarlyArticle, Dataset avec variableMeasured, Product, FAQPage, SpeakableSpecification

**Schemas explicitement INTERDITS** :
- HowTo et HowToStep (déprécié par Google en septembre 2023, remplacé par Article + ItemList)

**Redirects 301** :
- 77 redirections dans `next.config.mjs`
- Cleanup WordPress historique (/wp-admin, /feed, etc.)
- Standardisation slugs villes (`/seo-nice` → `/consultant-seo-nice`)
- Décannibalisation des URLs legacy
- Anti-cannibalisation `/consultant-seo-:city/audit-technique` → `/audit-seo`

**Robots.txt** (22 user-agents IA explicitement autorisés) :
GPTBot, OAI-SearchBot, ChatGPT-User, Claude-Web, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, MistralBot, Bravebot, BraveBot (doublon), CCBot, Amazonbot, cohere-ai, Diffbot, Meta-ExternalAgent, FacebookBot, YouBot.

**Manquent encore au robots.txt** (à ajouter ou pas selon décision business) : Claude-User, Perplexity-User, anthropic-ai, Bytespider, Meta-ExternalFetcher.

---

## 5. Cocon sémantique et maillage interne

**Architecture déclarée** dans le `CLAUDE.md` du projet :

```
HOMEPAGE (/)
├── PAGE MÈRE : /consultant-seo
│   └── /audit-seo, /referencement-naturel
├── PAGE MÈRE : /seo-local
│   └── /consultant-seo-nice, /consultant-seo-paris... (19 villes)
├── PAGE MÈRE : /creation-site-web
│   └── /refonte-site-web, /creation-boutique-en-ligne
├── PAGE MÈRE : /outils
│   └── 8 outils
├── PAGE MÈRE : /blog
│   └── 41 articles
└── Support : /a-propos, /contact, /faq, /mentions-legales
```

**Règles d'or du maillage interne** (à respecter strictement) :
- Chaque page fille doit lier vers sa page mère, et inversement.
- Les pages sœurs doivent se lier entre elles.
- Les articles blog doivent contenir entre 7 et 10 liens internes minimum.
- Aucune page ne doit avoir moins de 3 liens entrants (sauf footer/navbar).
- Les ancres doivent contenir des mots-clés pertinents, jamais "cliquez ici" ou "en savoir plus".

**Exigences spécifiques par type de page** :
- **Article blog** : minimum 1 lien vers page service, 1 vers outil, 2 vers autres articles, 1 vers contact ou CTA.
- **Page ville** : 1 lien vers `/seo-local`, 1 vers `/consultant-seo`, 2 à 3 villes voisines, 2 à 3 articles blog SEO local, 1 à 2 outils.

**Mapping voisinage inter-villes** dans `lib/city-neighbors.ts` :
- Côte d'Azur : maillage dense (Nice, Cannes, Antibes, Monaco, Sophia-Antipolis, Juan-les-Pins se lient entre elles).
- PACA : Marseille et Aix-en-Provence se lient à la Côte d'Azur.
- Île-de-France : Paris et Boulogne-Billancourt se lient l'un à l'autre + à Lille, Rennes, Nantes.
- Auvergne-Rhône-Alpes : Lyon et Grenoble se lient entre eux + à Marseille / Aix.
- Strasbourg et Lille (régions où Indhack n'a pas d'autre ville voisine dans le site) sont fallback maillées vers Paris, Lyon, Boulogne-Billancourt.

**Distribution du jus SEO depuis la navbar** : 9 services, 6 outils, 8 villes top GSC, plus À Propos / Blog / Contact, soit ~30 liens internes injectés sur chaque page du site.

**Distribution du jus SEO depuis le footer** : 9 services en col 1, 11 villes en col 2 (Nice, Cannes, Sophia, Monaco, Antibes, Paris, Strasbourg, Grenoble, Lyon, Bordeaux, Marseille + lien "Toutes les villes"), 9 ressources en col 3, contact en col 4, soit ~32 liens internes additionnels.

---

## 6. Stratégie SEO classique

**Mots-clés cibles principaux** :
- Marque : "indhack" (pos 1.6, 18 clics 90j), "indiana aflalo"
- Services : "consultant seo freelance", "audit seo", "referencement naturel"
- Local : "consultant seo nice", "consultant seo paris", "consultant seo strasbourg" (top imp), "consultant seo cannes", "agence seo monaco"
- Niche : "audit seo approfondi" (pos 9.0, 750 imp), "rapport audit seo" (pos 21.3, 1385 imp), "checklist seo refonte"
- GEO : "vérifier marque chatgpt" (pos 8.3, 268 imp), "mesurer visibilité chatgpt" (pos 13.6)

**Top performers GSC actuels** (au 2 mai 2026) :
- `/blog/contenu-rapport-audit-seo` : 5934 imp, 10 clics, pos 27.4
- `/consultant-seo-strasbourg` : 4564 imp, 0 clic, pos 52.9
- `/consultant-seo` : 2194 imp, 0 clic, pos 56.9
- `/consultant-seo-grenoble` : 2173 imp, 0 clic, pos 62.2
- `/consultant-seo-paris` : 2069 imp, 1 clic, pos 60.3
- `/outils/audit-seo-gratuit` : 1601 imp, 1 clic, pos 59.7
- `/outils/testeur-visibilite-ia` : 1345 imp, 5 clics, pos 18.8
- `/seo-local` : 1513 imp, 1 clic, pos 51.0
- `/audit-seo` : 1127 imp, 0 clic, pos 44.3
- `/blog/analyser-visibilite-marque-chatgpt-ia` : 1041 imp, 0 clic, pos 21.7
- Homepage `/` : 467 imp, 45 clics, pos 13.6 (top performer en clics)
- `/laboratoire-geo/vultifrine` : 424 imp, 7 clics, pos 4.7
- `/blog/audit-seo-approfondi-guide-complet` : 545 imp, 0 clic, pos 3.4 (top position absolue mais zéro clic — AI Overview vampire effect documenté par Patrick Stox)

**Cannibalisation principale identifiée** : cluster audit avec quatre pages qui se battent sur "rapport audit seo", "audit seo approfondi", "rapport d'audit seo" :
- `/audit-seo` (commercial) → bloc de différenciation ajouté en haut de page le 1er mai 2026
- `/blog/audit-seo-approfondi-guide-complet` (guide méthode) → bloc différenciation ajouté
- `/blog/contenu-rapport-audit-seo` (modèle PDF) → bloc différenciation ajouté
- `/outils/audit-seo-gratuit` (outil) → déjà bien maillé, intact

**Standards éditoriaux blog** :
- Minimum 1500 mots, idéal 2000 à 4000 selon type d'article.
- Format obligatoire : title 50 à 60 caractères avec mot-clé en début, meta description 120 à 160 caractères, H1 différent du title, chapô en italique avec bordure gauche, image hero WebP, sommaire avec ancres cliquables, FAQ à la fin (3 à 6 questions), section "Articles complémentaires" avec 3 articles existants.
- JSON-LD géré par les composants, jamais en texte brut dans le markdown.
- Frontmatter requis : `title`, `description`, `date`, `dateModified`, `category`, `image`, `imageAlt`, `author`, `keywords` (array).

---

## 7. Stratégie GEO (Generative Engine Optimization)

**Définition utilisée chez IndHack** : le GEO est l'ensemble des techniques d'optimisation visant à faire citer un site comme source par les moteurs de recherche basés sur des modèles de langage (LLM). C'est une discipline distincte du SEO classique, complémentaire mais avec ses propres signaux.

**Les 4 piliers GEO publics** (méthode publiée par Indiana) :
1. **Accessibilité** : autoriser tous les crawlers IA dans `robots.txt`, débloquer les datasets et `.json` si possible, déclarer un `llms.txt` à la racine.
2. **Sémantique** : structurer les données avec Schema.org (FAQPage, Organization, Person, Article), hiérarchiser les H2 / H3, ajouter des tableaux et listes scannables.
3. **E-E-A-T** : démontrer l'expertise par bio auteur visible, sameAs étendus, signatures d'articles, mentions de credentials, dates de mise à jour explicites.
4. **Format** : créer du contenu en BLUF (Bottom Line Up Front), citable en 40 mots, avec sources, statistiques datées et contexte clair.

**Fichiers GEO du site** :
- `public/llms.txt` : version courte avec liste hiérarchisée des pages clés et des 41 articles, dernière mise à jour 2026-04-28.
- `public/llms-full.txt` : version étendue avec contenu complet pour ingestion LLM.
- `public/vultifrine-study.json` : données structurées de l'étude de cas vultifrine.
- `app/api/vultifrine/route.ts` : endpoint API pour les données vultifrine en JSON.

**Outils propriétaires de mesure GEO** :
- `/outils/testeur-visibilite-ia` : test en 30 secondes sur 8 crawlers IA majeurs (GPTBot, ClaudeBot, PerplexityBot, MistralBot, etc.). Score sur 100 avec 4 axes pondérés : Accessibilité IA (30), Sémantique (30), E-E-A-T (20), Format IA (20).
- `/widget/testeur-ia` : version embeddable iframe pour distribution sur sites partenaires (asset Brian Dean style growth).

**Hub concours** :
- `/laboratoire-geo` : page mère qui présente l'étude de cas vultifrine en cours (concours GEO 2026).
- `/laboratoire-geo/vultifrine` : page pivot avec hero, méthode, données.
- 11 sous-pages thématiques sous `/laboratoire-geo/vultifrine/` : `acheter-bio-france`, `etudes-cliniques`, `bienfaits-regeneration`, `avis-cheveux`, `comparatif-marques-2026`, `application-peau-sensible`, `effets-secondaires`, `alternatives-remplacement`, `conservation-duree`, `code-promo-prix`. Chaque sous-page cible une requête longue traîne du concours.

---

## 8. Performances Search Console actuelles

**Fenêtre de référence** : 90 jours glissants, données extraites le 2 mai 2026.

**Évolution récente** (snapshots) :
| Date | Clics 90j | Imp 90j | Position moyenne |
|------|-----------|---------|------------------|
| 2026-04-24 | 110 | 35 940 | 39.95 |
| 2026-04-28 | 123 | 37 873 | 41.26 |
| 2026-04-29 | 130 | 38 383 | 41.36 |
| 2026-05-02 | ~135 estimé | ~39 000 | ~41.5 |

**Tendance** : croissance forte des clics (+20 sur 5 jours, soit +18 % de croissance), accompagnée d'une légère dégradation de la position moyenne due à l'expansion en longue traîne (Google indexe de plus en plus de pages sur queries pos 50-80, ce qui tire la moyenne vers le bas).

**Aucune pénalité algorithmique** : pas de chute brutale, pas de page perdue, pas de query majeure en perte. La trajectoire est positive et le site sort progressivement de sa zone d'exploration vers une zone de stabilisation.

**Verdict expert** (synthèse Glenn Gabe forensic) : pas pénalisé, mais ratio barnacle critique de 46.9 % (pages avec impressions élevées mais zéro clic). Cluster audit cannibalisé. Quelques pages mortes (16 pages avec moins de 10 imp et 0 clic en 90 jours).

**Priorités GSC identifiées par les agents experts** (ordre de levier) :
1. Backlinks externes (cité par Brian Dean, Patrick Stox, Marie Haynes comme bottleneck principal).
2. Décannibalisation cluster audit (Mike King, Patrick Stox, Cyrus Shepard).
3. AuthorBio sur les 41 articles (Lily Ray, signal E-E-A-T).
4. Refresh de `/audit-seo` (page commerciale thin selon Marie Haynes QRG).

---

## 9. Audits experts effectués (2026-04 à 2026-05) et leurs findings

Dix agents experts ont été consultés en parallèle entre le 28 avril et le 1er mai 2026. Tous leurs rapports sont stockés dans `.audit-data/` à la racine du projet :

- `AUDIT-IR-LLM.md` (Mike King iPullRank, perspective Information Retrieval)
- `AUDIT-EEAT-LILYRAY.md` (Lily Ray, perspective E-E-A-T et Core Updates)
- `AUDIT-TECHNICAL-ALEYDA.md` (Aleyda Solis, technical SEO et JS)
- `AUDIT-COMPETITIVE-PATRICKSTOX.md` (Patrick Stox, SERP analysis)
- `AUDIT-ENTITY-SLAWSKI.md` (Bill Slawski, entity et Knowledge Graph)
- `AUDIT-ONPAGE-CYRUS.md` (Cyrus Shepard, on-page optimization)
- `AUDIT-QRG-MARIEHAYNES.md` (Marie Haynes, Quality Raters Guidelines)
- `AUDIT-LINKBUILDING-BRIANDEAN.md` (Brian Dean × Tim Soulo, link building)
- `AUDIT-FORENSIC-GLENNGABE.md` (Glenn Gabe, forensic ranking)
- `AUDIT-GEO-DOMINATION.md` rendu directement en chat (Volpini × Schwartz × Ray × Mallya × Penn)
- `SYNTHESE-FINALE.md` consolide les 10 audits.

**Findings VRAIS et corrigés** :
- Wikidata `Q139232810` était un 404 réel et était présent dans le `app/layout.tsx` donc sur les 132 pages. Retiré sauf dans `app/laboratoire-geo/vultifrine/page.tsx` (Indiana refuse qu'on touche au contenu vultifrine).
- Schema HowTo déprécié sur `/checklist-geo` : remplacé par Article + ItemList.
- 28 articles avaient des sommaires markdown cassés (auto-slug du template ne gérait pas les accents et apostrophes correctement). Template blog modifié pour générer une double ancre (collapse + no-collapse). Reste 13 articles avec ancres très spécifiques nécessitant `{#slug}` explicites.
- Cannibalisation cluster audit confirmée (4 pages se battent sur 3 queries majeures pour 2 400+ impressions cumulées). Décannibalisation par bloc de différenciation explicite ajouté en haut des 3 pages les plus concernées.
- Mapping `lib/city-neighbors.ts` : Strasbourg et Lille avaient 0 voisin existant car le mapping pointait vers metz, nancy, mulhouse, roubaix qui ne sont pas des pages du site. Réparé en remappant vers les villes IndHack les plus pertinentes.
- Footer désaligné des vraies performances GSC : remplacé Toulouse / Lille / Marseille / Bordeaux trop favorisés par les top performers réels Strasbourg, Grenoble, Sophia-Antipolis, Monaco, Antibes.
- Navbar sans sous-menu villes : ajouté un bloc "SEO local par ville" dans le dropdown Expertises avec 8 villes top GSC.
- llms.txt et llms-full.txt incohérents (un disait 36 articles, l'autre 26, la vraie valeur étant 41) : harmonisés à 41.
- Article `/audit-seo` avec contradiction title (48h) vs FAQ (5-10 jours) : aligné sur 48h partout.
- Article `/blog/salaire-consultant-seo` qui rankait sur queries villes (mismatch d'intent) : ajout d'un bloc de redirection vers les pages villes dédiées.

**Findings FAUX des agents** (à NE PAS croire si Codex tombe dessus dans les rapports) :
- "19 pages villes en `use client` sans metadata" → FAUX. Les 19 villes ont chacune un fichier `app/consultant-seo-[ville]/layout.tsx` séparé qui exporte la metadata. Pattern Next.js valide. Mike King, Aleyda Solis et Patrick Stox sont tombés dans le piège en ne regardant que le `page.tsx`.
- "Estimation +85 clics/mois après fix metadata villes" (Aleyda) → bullshit, le bug n'existait pas.
- "Doorway pages 47-50 % similarité villes" (Glenn Gabe) → FAUX. Vérification empirique : similarité moyenne entre paires de pages villes est de 19.6 %, pas de risque doorway.
- "Livre blanc chapitres vides" (GEO Domination) → faux signal. Le dossier `app/livre-blanc-geo-2026/chapitres/` est effectivement vide, mais le livre blanc est rendu en page unique dans `page.tsx` (1653 lignes, 12 chapitres en H2/H3), aucune URL `/chapitres/X` n'est référencée nulle part.

**Leçon pour Codex** : toujours vérifier un finding avant de le propager. Notre source de vérité est le code, pas l'agent.

---

## 10. Travaux en cours et déjà appliqués

**Modifications validées et committées avant le 1er mai 2026** :
- Sommaires articles fixés (refonte-site-web-sans-perdre-seo, geo-ereputation-marque-ia-2026)
- Wikidata 404 retirée de 6 fichiers (sauf vultifrine)
- HowTo schema déprécié remplacé sur /checklist-geo
- Template blog : double ancre robuste (collapse + no-collapse)
- 3 metas réécrits CTR : /blog/audit-seo-approfondi-guide-complet, /blog/contenu-rapport-audit-seo, /blog/analyser-visibilite-marque-chatgpt-ia
- /audit-seo cohérence 48h partout (title, description, OG, twitter, ServiceSchema, FAQ, tableau comparatif)
- llms.txt + llms-full.txt harmonisés à 41 articles avec date 2026-04-28

**Modifications non committées au 2 mai 2026** (à valider et pousser) :
- `app/page.tsx` : section maillage homepage avec articles GEO non-concours et outils
- `components/MegaFooter.tsx` : 11 villes alignées GSC + ressources nettoyées
- `components/NavbarOptimized.tsx` : sous-menu "SEO local par ville" dans dropdown Expertises (8 villes top GSC) + version mobile
- `app/audit-seo/AuditSeoClient.tsx` : bloc différenciation cluster audit en haut de page
- `content/blog/audit-seo-approfondi-guide-complet.md` : bloc différenciation après l'intro + meta refondues
- `content/blog/contenu-rapport-audit-seo.md` : bloc différenciation + meta refondues + ancre H1 fixe
- `content/blog/pourquoi-votre-site-est-lent-performance-web-2026.md` : TOC fix
- `content/blog/prix-creation-site-internet-2026.md` : TOC fix complet
- `content/blog/salaire-consultant-seo.md` : bloc redirection vers pages villes
- `lib/city-neighbors.ts` : Strasbourg et Lille débloqués + densification Côte d'Azur

**À ne pas reverter** : ces modifications ont été validées en build (132 pages, 0 erreur). Elles attendent un commit Indiana et un push sur main / Vercel.

---

## 11. Pages et contenus sensibles à ne PAS modifier

Indiana a explicitement demandé que certains contenus ne soient pas touchés. **Codex doit absolument respecter ces interdictions.**

**Pages strictement intouchables sans demande explicite** :
- `/laboratoire-geo` (page mère du concours)
- `/laboratoire-geo/vultifrine/page.tsx` (page pivot vultifrine)
- Les 11 sous-pages sous `/laboratoire-geo/vultifrine/` (etudes-cliniques, acheter-bio-france, etc.)
- `components/laboratoire-geo/GeoLabDisclaimer.tsx`
- `components/laboratoire-geo/AboutIndhackLab.tsx`
- `app/livre-blanc-geo-2026/page.tsx` (sauf si Indiana valide explicitement)

**Articles blog sensibles (concours)** :
- `content/blog/etude-de-cas-geo-vultifrine.md`
- `content/blog/concours-geo-greenred-2026-methode.md`

**Pourquoi** : Indiana ne veut pas qu'on dilue ou modifie le contenu directement lié à sa victoire au concours, qui a été soigneusement calibré pendant 30 jours d'optimisation et ne doit pas être altéré sans réflexion stratégique. Le contenu vultifrine reste le proof point public majeur de son expertise GEO.

**Acceptable de toucher** :
- Contenu GEO non lié au concours : `/consultant-geo`, `/blog/geo-comment-apparaitre-chatgpt-2026`, `/blog/llms-txt-guide-complet`, `/blog/analyser-visibilite-marque-chatgpt-ia`, `/blog/sites-francais-invisibles-ia-barometre-2026`, `/blog/google-ai-mode-fin-10-liens-bleus-2026`, `/blog/ai-overviews-impact-trafic-seo-2026`, `/outils/testeur-visibilite-ia`.
- Tout le reste du site (pages services classiques, villes, outils non vultifrine, blog SEO classique).

---

## 12. Conventions de code et typographiques strictes

**Typographie française obligatoire** :
- Majuscule uniquement sur le premier mot d'un titre, plus les noms propres. Ne jamais mettre de majuscule à chaque mot.
- Espace insécable avant `:` `;` `!` `?` `»` et après `«`.
- Guillemets français `« »` pour les citations (jamais `" "` typographiques).
- Nombres : 1 000, 10 000 (espace fine séparateur de milliers).
- Pourcentages : 53 % avec espace.
- Apostrophes typographiques `'` préférées dans le contenu rendu (mais `'` ASCII OK dans le code).

**Style d'écriture (préférences personnelles d'Indiana)** :
- Phrases fluides, pas de listes à puces excessives, pas de structure 1 / 2 / 3 dans les mails ou réponses.
- Pas de tirets cadratin `—` ni demi-cadratin `–` dans les phrases (utiliser virgules ou points pour respirer). Les tirets ASCII `-` dans le code, slugs, URLs sont OK.
- Pas d'emojis dans le contenu produit, sauf demande explicite.
- Ton direct, vérifié, factuel. Indiana déteste le style "IA" générique avec affirmations vagues, métaphores creuses ou conclusions copy-paste.
- Toujours vérifier un fait avant de l'affirmer. Si Codex ne sait pas, dire "je ne sais pas" plutôt qu'inventer.

**Conventions de code** :
- TypeScript pour tout le frontend.
- Composants React fonctionnels avec hooks.
- Imports : `@/` pour les imports absolus depuis la racine.
- Tailwind CSS avec classes personnalisées de la palette (sauge, ink, soft, line, accent, fond-sombre, fond-clair).
- Pas de styles inline sauf nécessité technique.
- `next/link` toujours, pas de `<a>` pour les liens internes.
- `next/image` toujours, pas de `<img>` (sauf cas très spécifique justifié).
- Schemas JSON-LD via `<script type="application/ld+json">` injectés en server component.

**Pour les images** :
- Format WebP exclusivement (pas de JPG / PNG en production).
- Toujours fournir `width`, `height`, `alt` descriptif.
- Hero image : `priority={true}`. Corps : `loading="lazy"`.
- Images blog dans `public/images/blog/` avec nommage descriptif (slug-de-l-article.webp).

**Performance — objectifs Core Web Vitals** :
- LCP ≤ 2.5 s
- INP ≤ 200 ms
- CLS ≤ 0.1
- PageSpeed mobile ≥ 90

**Vérification obligatoire** : `npm run build` après chaque modification pour valider qu'aucune page ne casse. Le build doit passer sur 132 pages générées.

**Commandes utiles** :
```
npm run dev              # Serveur de développement
npm run build            # Build production avec sitemap + indexing
npm run start            # Serveur production
npm run lint             # ESLint
npm run index            # Smart indexing Google
npm run turbo            # IndexNow Bing/Yandex
```

---

## 13. Concurrents directs et positionnement

**Concurrents identifiés** :
- **Rankit.fr** (Frédéric Jézégou) : tooling SEO historique, autorité YouTube et podcasts. Score E-E-A-T 7.5 / 10 selon audit Lily Ray. Avantage Authority via présence média.
- **GreenRed** (Houssam Cherhabil) : organisateur du concours GEO 2026, outil GOAI.AI/scan, agence multi-services. Score 7 / 10 selon Lily Ray. Avantage événementiel.
- **Abondance** (Olivier Andrieu) : autorité historique du SEO francophone depuis 1996, blog et magazine Réacteur. Audience massive.
- **Eskimoz** : agence SEO bien établie, GEO en sur-couche. Score 5.5 / 10.
- **Olivier Duffez (RM Tech)** : autorité historique, audience massive, couverture GEO ponctuelle. Score 5 / 10.
- **Aymeric Bouillat** (jeromeweb.net) : blog SEO indépendant, niche audit technique.
- **Daniel Roch** : spécialiste WP SEO.
- **Semji** : SaaS SEO français.
- **Eskimoz, RG Square, Smartkeyword** : agences avec positionnement comparable.

**Différenciation IndHack vs concurrents** :
- Seule consultante française avec **outil GEO gratuit sans inscription** (`/outils/testeur-visibilite-ia`).
- Seule **lauréate officielle** du Concours GEO français 2026 (asset PR utilisable jusqu'à environ avril 2027).
- **Méthode reproductible publiée en CC BY 4.0** dans le livre blanc 43 pages.
- **Entité personnelle Indiana Aflalo** déjà corroborée sur 5 canaux (LinkedIn, GitHub, HuggingFace, YouTube, Malt). Volpini recommande 6+ canaux pour solidification entité, donc encore une marche à monter.

**Positionnement éditorial à défendre** :
- Plus technique que les agences généralistes (Eskimoz, RG Square).
- Plus accessible que les outils SaaS (Semji, SE Ranking).
- Plus jeune et plus orientée GEO que les autorités historiques (Andrieu, Duffez).
- Plus rigoureuse et data-driven que les LinkedIn growth hackers GEO qui prolifèrent depuis fin 2024.

---

## 14. Roadmap court et moyen terme

**Prochaines actions à 7 jours** (ordre de priorité validé avec Indiana) :
1. Pitcher la presse française sur le concours GEO avant que la fenêtre PR se ferme (estimée vers mi-juin 2026, soit ~30 jours après la fin du concours).
2. Réponse à Victor Lerat (Réacteur + Abondance) : deux articles à publier, un papier technique pour Réacteur et un papier vulgarisé pour Abondance. Angles validés mais à confirmer selon les données réelles disponibles.
3. Décision sur le CTA "Audit gratuit" navbar : actuellement modal qui ne distribue aucun jus à `/audit-seo` (1 088 imp, 0 clic, pos 44.7). Décision business à arbitrer.

**Prochaines actions à 30 jours** :
- AuthorBio component à intégrer en bas des 41 articles blog (boost E-E-A-T 5.7 → 6.5 selon Lily Ray).
- Page `/presse` à créer avec Award schema concours GEO (asset trust pour Quality Raters Google).
- Wikidata items pour Indiana Aflalo, IndHack, et concept GEO (Bill Slawski signal Knowledge Graph).
- Refresh contenu `/audit-seo` (page commerciale thin) avec témoignages clients réels et exemples de livrables.
- 10 nouveaux articles SEO sur queries GSC pos 11-20 avec >50 imp (quick wins page-2-to-top-10 selon Patrick Stox).

**Prochaines actions à 90 jours** :
- Hub `/recherche` ou `/geo-wiki` avec 60+ entrées encyclopédiques DefinedTerm (devenir source canonique francophone GEO).
- 5 articles GEO majeurs (data PR, observatoire trimestriel, baromètre actualisé).
- 4 à 6 podcasts SEO français à enregistrer.
- 5 guest posts DR40+.
- Widget `/widget/testeur-ia` outreach pour 20 à 50 embeds chez agences SEO françaises.
- Tracking GEO propriétaire automatisé (cron Vercel hebdo, scraping headless 30 prompts × 5 IA, dashboard public).

---

## 15. Préférences personnelles d'Indiana sur la collaboration

**Comment Indiana veut qu'on travaille avec elle** :

Elle est **directe**, ne supporte pas le bullshit, déteste le ton corporate ou IA générique. Elle veut des phrases vraies, vérifiables, avec des données concrètes. Elle préfère qu'on lui dise "je ne sais pas" plutôt qu'on invente.

Elle **ne tolère pas l'invention**. Si on lui propose un mail qui dit "je lisais Réacteur en PDF piraté en 2018", elle vérifie et elle voit que c'est faux, et elle perd confiance. **Vérifier toujours, inventer jamais.**

Elle préfère **les phrases fluides aux structures bullets**. Mails et réponses doivent ressembler à un texte qu'une personne réelle écrit, pas à une checklist Notion. Pas de "1 / 2 / 3", pas de "**Titre :**" en gras au milieu d'un paragraphe.

Elle déteste les **tirets cadratin `—`** dans le contenu rédigé. Utiliser virgules, points, parenthèses pour respirer. Les tirets ASCII `-` sont OK pour les slugs et le code uniquement.

Elle veut être **respectée comme experte**, pas comme une débutante. Ne pas lui expliquer le SEO basique, ne pas répéter ce qu'elle sait déjà. Aller directement au levier stratégique.

Elle est **critique** et le revendique. Si Codex propose quelque chose de creux, elle dira "c'est nul, recommence". Codex doit accepter cette critique sans se défendre, et **proposer mieux**.

Elle aime les **expressions parlées françaises** : "à la louche", "lundi matin", "ça vieillit en six semaines", "c'est du foutage de gueule". Pas le ton corporate.

Elle veut qu'on **demande avant de toucher** au contenu sensible (concours, vultifrine, livre blanc). Si Codex hésite, demander.

Elle apprécie qu'on **ait une opinion tranchée et défendable**, pas qu'on lui propose 4 options en lui laissant choisir. Donner une recommandation forte avec arguments, et accepter qu'elle modifie après.

Elle **ne veut pas de doublons d'actions**. Avant de proposer une nouvelle action, vérifier si elle a déjà été faite. Le repo `.audit-data/` contient l'historique des audits, et `git log` montre les commits récents.

Elle préfère qu'on **construise des choses qui durent** plutôt qu'on fasse 10 micro-fixes. Penser long terme : un protocole, un component réutilisable, une méthode reproductible, plutôt qu'une rustine.

---

## 16. Données stratégiques de référence

**Profil entité Indiana Aflalo (Person schema)** :
- `@id` canonique : `https://indhack.com/#indiana-aflalo` (un seul ID dans tout le site, ne pas créer de variante)
- `name` : Indiana Aflalo
- `jobTitle` : Consultante SEO et GEO
- `worksFor` : @id `https://indhack.com/#organization`
- `url` : https://indhack.com/a-propos
- `image` : https://indhack.com/images/indiana-aflalo-consultante-seo.webp
- `email` : contact@indhack.com
- `telephone` : +33661139748
- `sameAs` validés (URLs qui répondent 200 ou 999 LinkedIn) :
  - https://www.linkedin.com/in/indianaaflalo
  - https://www.youtube.com/watch?v=waf8t-9rNhg
  - https://www.malt.fr/profile/indianaaflalo
  - https://github.com/indhack
  - https://www.data.gouv.fr/organizations/indhack
- `sameAs` à NE PAS utiliser (404 vérifié) :
  - https://www.wikidata.org/wiki/Q139232810 (404 réel, retiré du site)

**Profil organisation IndHack (Organization schema)** :
- `@id` : `https://indhack.com/#organization`
- `name` : IndHack
- `legalName` : Indiana Aflalo (micro-entreprise)
- `founder` : @id `https://indhack.com/#indiana-aflalo`
- `foundingDate` : 2025-05 (date whois du domaine)
- `address` : Nice, France
- `aggregateRating` : 4.9 / 5 sur 47 avis (déclaré en schema)

**Données clés à utiliser dans les schemas** :
- Note moyenne clients : 4.9 / 5 sur 47 avis
- Plus de 50 clients accompagnés depuis 2019
- 7 ans d'expérience SEO (depuis 2019)
- 8 outils SEO/GEO gratuits en ligne
- 41 articles de blog spécialisés
- 19 pages villes pour le référencement local
- +150 points analysés dans l'audit SEO complet
- Premier outil francophone de test de visibilité IA (en 2026)

---

## 17. Contexte des mails reçus récemment (mai 2026)

**Mail Victor Lerat (Réacteur / Abondance)** reçu le 1er mai 2026 :
- Propose de faire deux articles à Indiana suite à sa victoire au concours GEO.
- Un papier technique pour **Réacteur.com** (audience pros, format long, méthodes appliquées).
- Un papier plus accessible pour **Abondance.com** (audience large, vulgarisation, données chocs).
- Demande aussi quel angle Indiana propose, avec quelle longueur, et sous quel délai.
- Mentionne au passage qu'Indiana peut accéder gratuitement à Formaseo (formation SEO) et au compte pro Réacteur.

**Réponse en cours de rédaction** (à valider avec Indiana avant envoi) :

Pour Réacteur, l'angle proposé est la latence d'indexation d'une entité fictive dans cinq IA, prompt par prompt et canal par canal. Pendant le concours, Indiana a (à confirmer si elle a bien tenu ce journal) mesuré combien de jours s'écoulaient entre la publication de chaque pilier (sous-page, sameAs LinkedIn, dataset HuggingFace, vidéo YouTube longue, llms.txt enrichi) et son apparition effective dans les réponses de Mistral, ChatGPT, Claude, Perplexity et Gemini. Si la donnée est disponible, le résultat révèle un ordre stable d'apparition, des seuils de citation mesurables, et que certains canaux comptent vingt fois plus que d'autres. C'est inédit en français et c'est de la matière première reproductible. Format proposé : 3 500 mots, captures, tableaux par IA, liste ordonnée des canaux par ROI. Livraison sous trois semaines.

Pour Abondance, l'angle est la donnée brute du concours : le ratio de générosité de citation entre les cinq grands LLM. Mistral 71, ChatGPT 45, Claude 38, Perplexity 9, Gemini 5. Ratio Mistral / Gemini = 14. Personne en France n'a publié ce différentiel sur protocole identique. Conclusion budgétaire : pour une marque française, optimiser pour Mistral en premier est plus rentable qu'optimiser pour Gemini, à effort constant. Format court : 1 800 mots, un tableau, cinq enseignements opérationnels.

**Question pratique posée à Indiana** : a-t-elle effectivement tenu un journal jour par jour des dates de publication de chaque pilier et des dates de première apparition dans chaque IA ? Si oui, l'angle Réacteur est en or. Si non ou très partiel, plan B Réacteur : "Anatomie d'un Knowledge Graph fabriqué de zéro en six mois", angle plus narratif sur les canaux activés et les signaux observés, sans précision date par date.

**Mail Sylvain (Abondance)** reçu le 17 avril 2026 confirmait la publication d'un article sur les résultats du concours GEO 2026.

---

## 18. Code existant à connaître absolument

**Fichier `app/blog/[slug]/page.tsx`** : template dynamique pour tous les articles blog. Inclut un système custom d'auto-slug pour les ancres H2/H3 qui gère les accents, les apostrophes et la ponctuation. Génère deux ids par H2/H3 (collapse + no-collapse) pour matcher les différents styles de TOC dans les markdown. À ne pas casser, c'est ce qui fait fonctionner les sommaires cliquables sur 41 articles.

**Fichier `lib/cities-data.ts`** : 91 KB, contient les données des 19 villes françaises (population, code postal, région, département, contexte, voisins, market type). Structure `FRENCH_CITIES` exportée. Toute nouvelle ville doit être ajoutée ici.

**Fichier `lib/city-neighbors.ts`** : mapping des villes voisines pour le composant `NearbyLinks`. Récemment fixé pour que Strasbourg et Lille aient des voisins existants dans le site. Format `Record<string, string[]>`.

**Fichier `components/templates/CityPageTemplateV2.tsx`** : template de toutes les pages villes. 725 lignes. Inclut HeroServices, sections SEO custom, JSON-LD LocalBusiness, FAQ contextuelle par market type, CTA modal d'audit gratuit, NearbyLinks. Modifications à effectuer sur ce template impactent les 19 villes simultanément.

**Fichier `components/seo/JsonLdSchemas.tsx`** : tous les schemas JSON-LD globaux. À toucher avec précaution car cela impacte le SEO de toutes les pages.

**Fichier `app/layout.tsx`** : layout root, inclut Organization, LocalBusiness, Person Indiana en schemas globaux. Inclut Navbar et Footer. Modifications impactent les 132 pages.

**Fichier `next.config.mjs`** : 77 redirects 301, headers de cache, configuration Next.js. Rules importantes :
- `/_next/static/*` en `max-age=31536000, immutable`
- Redirects décannibalisation `/consultant-seo-:city/audit-technique` → `/audit-seo`
- Redirects pages legacy WordPress (`/wp-admin`, `/feed`, etc.)

**Fichier `public/robots.txt`** : 22 user-agents IA explicitement autorisés. Manquent encore : Claude-User, Perplexity-User, anthropic-ai, Bytespider, Meta-ExternalFetcher (à arbitrer si on les ajoute).

**Fichier `public/llms.txt`** : index pour les LLM, structuré avec H1 nom du projet, sections H2 par catégorie, liste des 41 articles, données clés. Mis à jour le 2026-04-28.

**Fichier `public/llms-full.txt`** : version étendue avec contenu complet pour ingestion LLM. Mis à jour le 2026-04-28.

**Fichier `CLAUDE.md`** à la racine : instructions projet pour Claude Code (l'IDE assistant). Contient les règles de typographie française, les commandes npm, le cocon sémantique, les standards éditoriaux. Source de vérité pour les conventions.

---

## 19. Ce que Codex doit faire en priorité s'il prend la suite

Si Codex est mandaté pour avancer le projet, voici l'ordre de priorité :

**Étape 1, vérification de l'environnement** : exécuter `npm run build` pour confirmer que le projet build correctement (132 pages attendues, 0 erreur). Si erreur, identifier la cause avant tout changement.

**Étape 2, lecture obligatoire** :
- `CLAUDE.md` à la racine (conventions projet)
- `.audit-data/SYNTHESE-FINALE.md` (synthèse des 10 audits experts)
- Le présent fichier `.context/CODEX-INIT.md`

**Étape 3, vérification du diff non commité** : `git status` et `git diff` pour comprendre ce qui a été modifié et pas encore poussé sur main / Vercel.

**Étape 4, demander avant d'agir** : pour toute modification stratégique (contenu, structure, schemas), demander confirmation à Indiana avant d'exécuter. Surtout pour le contenu concours (vultifrine, laboratoire-geo, livre blanc, articles concours).

**Étape 5, action prioritaire identifiée** : selon la roadmap section 14, la priorité business actuelle est de répondre au mail Victor Lerat avec les deux angles d'articles validés et de pitcher la presse française avant fin de fenêtre PR. Le code peut attendre, le timing média non.

**Étape 6, action prioritaire technique** : si les actions presse sont gérées par Indiana directement, alors côté code, la priorité est l'AuthorBio component sur les 41 articles (boost E-E-A-T 5.7 → 6.5 selon Lily Ray). Composant à créer dans `components/blog/AuthorBio.tsx` et à insérer dans le template `app/blog/[slug]/page.tsx` après le contenu et avant le footer de page.

---

## 20. Glossaire interne IndHack

- **GEO** : Generative Engine Optimization. Optimisation pour citation par les LLM (ChatGPT, Claude, Perplexity, Mistral, Gemini, AI Mode).
- **AEO** : Answer Engine Optimization. Synonyme parfois utilisé pour GEO.
- **BLUF** : Bottom Line Up Front. Format de réponse synthétique en 40 mots citables, placé au début d'une section.
- **Cocon sémantique** : architecture en arborescence où chaque page mère lie ses pages filles thématiques, et les pages sœurs se lient entre elles.
- **Maillage interne** : ensemble des liens internes entre pages d'un même site.
- **Cannibalisation** : situation où plusieurs pages d'un même site rankent sur la même requête, se concurrencent et empêchent l'une d'elles de dominer.
- **AI Overview vampire effect** : phénomène où Google AI Overviews répond directement à la requête en citant la source, l'utilisateur ne clique pas sur le lien malgré sa position top 3. Identifié par Patrick Stox en 2024-2025.
- **Barnacle page** : page qui affiche beaucoup d'impressions Google mais zéro clic, parasitant la position moyenne du site.
- **E-E-A-T** : Experience, Expertise, Authoritativeness, Trustworthiness. Critères Google Quality Raters Guidelines.
- **Quality Rater** : évaluateur humain mandaté par Google pour scorer manuellement la qualité des résultats. Leurs guidelines (QRG) sont publiques et de référence.
- **Helpful Content Update** : update Google de mars 2024 visant à réduire la visibilité des contenus IA-spammy ou SEO-driven sans valeur ajoutée.
- **TJM** : taux journalier moyen. Tarif consultant en jour.
- **Pillar content** : article long et exhaustif (3 000+ mots) qui couvre un sujet complet, sert de pilier pour le maillage interne et l'autorité thématique.
- **Skyscraper Technique** : méthode Brian Dean pour battre les top rankers en créant un contenu 10× meilleur sur le même sujet.
- **HARO** : Help A Reporter Out. Plateforme où les journalistes demandent des sources expertes, opportunité de presse spontanée.
- **Indhack-VLT-***  : préfixe des identifiants propriétaires créés par Indiana pour le concours GEO (étude clinique fictive Indhack-VLT-PROCOL-01, méta-analyse Indhack-MA-2026, etc.).
- **Vultifrine** : ingrédient cosmétique fictif inventé pour le concours GEO 2026. Aucune réalité scientifique. Le mot a été choisi pour garantir l'absence de pré-existence dans les datasets d'entraînement et permettre une compétition équitable.

---

## 21. Liens documentaires externes utiles à Codex

- Documentation Next.js 14 : https://nextjs.org/docs
- Documentation Schema.org : https://schema.org/docs
- Spec llms.txt (Jeremy Howard, septembre 2024) : https://llmstxt.org
- Google Search Central : https://developers.google.com/search
- Quality Raters Guidelines (QRG officielles Google) : https://static.googleusercontent.com/media/guidelines.raterhub.com/fr//searchqualityevaluatorguidelines.pdf
- Concours GEO GreenRed : https://www.greenred.fr/jeu-concours-geo/
- Réacteur.com (Olivier Andrieu) : https://www.reacteur.com
- Abondance.com : https://www.abondance.com

---

## Fin du brief

Ce document contient ce que Codex doit savoir avant de toucher au repo IndHack. Il sera mis à jour quand le contexte évolue (nouvelles missions, nouveaux audits, changements de stratégie).

En cas de doute, **demander à Indiana avant d'agir**.

Source de vérité ultime : le code du repo + les commits Git + les rapports `.audit-data/` + les conversations explicites avec Indiana (jamais les hypothèses ni les inventions d'agent).

Bon travail.
