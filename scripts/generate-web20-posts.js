#!/usr/bin/env node
/**
 * GÉNÉRATEUR DE POSTS WEB 2.0
 *
 * Génère du contenu prêt à copier-coller sur les plateformes gratuites
 * pour créer des backlinks vers indhack.com
 *
 * Usage: node scripts/generate-web20-posts.js
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://indhack.com';

// Pages prioritaires à promouvoir
const PRIORITY_PAGES = [
    { url: '/', title: 'Consultante SEO Expert', keyword: 'consultante SEO freelance' },
    { url: '/consultant-seo', title: 'Consultant SEO', keyword: 'consultant SEO France' },
    { url: '/audit-seo', title: 'Audit SEO Gratuit', keyword: 'audit SEO gratuit' },
    { url: '/seo-nice', title: 'SEO Nice', keyword: 'consultant SEO Nice' },
    { url: '/seo-paris', title: 'SEO Paris', keyword: 'consultant SEO Paris' },
    { url: '/seo-marseille', title: 'SEO Marseille', keyword: 'consultant SEO Marseille' },
    { url: '/seo-lyon', title: 'SEO Lyon', keyword: 'consultant SEO Lyon' },
    { url: '/creation-site-web', title: 'Création Site Web', keyword: 'création site web SEO' },
    { url: '/referencement-naturel', title: 'Référencement Naturel', keyword: 'référencement naturel' },
    { url: '/seo-local', title: 'SEO Local France', keyword: 'SEO local' },
];

// Templates de contenu
const TEMPLATES = {
    blogger: (page) => `
<h2>${page.title} - IndHack</h2>

<p>Vous cherchez un expert en <strong>${page.keyword}</strong> ? IndHack propose des services de référencement naturel sur-mesure pour les PME et entrepreneurs.</p>

<p>Découvrez comment améliorer votre visibilité sur Google avec une approche personnalisée et des résultats mesurables.</p>

<p>👉 <a href="${SITE_URL}${page.url}" target="_blank" rel="dofollow"><strong>En savoir plus sur ${page.title}</strong></a></p>

<p>Services proposés :</p>
<ul>
<li>Audit SEO technique complet</li>
<li>Stratégie de contenu optimisée</li>
<li>Référencement local Google Business</li>
<li>Suivi et reporting mensuel</li>
</ul>

<p>Contact : <a href="${SITE_URL}/contact">indhack.com/contact</a></p>
`,

    medium: (page) => `
# ${page.title} - Expertise SEO

Vous souhaitez améliorer votre positionnement sur Google ? Le ${page.keyword} est essentiel pour toute entreprise qui veut être visible en ligne.

## Pourquoi choisir un expert SEO ?

Un consultant SEO analyse votre site, identifie les opportunités et met en place une stratégie sur-mesure pour attirer des clients qualifiés.

**Découvrez les services IndHack** : [${page.title}](${SITE_URL}${page.url})

### Ce qu'un audit SEO révèle :
- Problèmes techniques bloquant l'indexation
- Opportunités de mots-clés inexploitées
- Analyse de la concurrence
- Plan d'action priorisé

---

*IndHack - Consultante SEO spécialisée pour PME et entrepreneurs*
`,

    linkedin: (page) => `
🚀 ${page.title}

Le ${page.keyword} est un levier essentiel pour développer votre activité en ligne.

Chez IndHack, j'accompagne les PME et entrepreneurs à :
✅ Améliorer leur visibilité Google
✅ Attirer des clients qualifiés
✅ Mesurer le ROI de leurs actions SEO

💡 Audit gratuit disponible pour évaluer votre potentiel.

👉 ${SITE_URL}${page.url}

#SEO #RéférencementNaturel #MarketingDigital #Entrepreneur
`,

    twitter: (page) => `
🔍 ${page.title}

Besoin d'un ${page.keyword} ?

Audit SEO gratuit ➡️ ${SITE_URL}${page.url}

#SEO #Google #Marketing
`
};

// Plateformes Web 2.0 gratuites
const PLATFORMS = [
    { name: 'Blogger', url: 'https://www.blogger.com', instructions: 'Créer un blog → Nouveau post → Coller le HTML' },
    { name: 'Medium', url: 'https://medium.com', instructions: 'Créer un compte → New Story → Coller le Markdown' },
    { name: 'LinkedIn Articles', url: 'https://www.linkedin.com', instructions: 'Écrire un article → Coller le texte' },
    { name: 'WordPress.com', url: 'https://wordpress.com', instructions: 'Créer un blog gratuit → Nouveau post' },
    { name: 'Tumblr', url: 'https://www.tumblr.com', instructions: 'Créer un blog → Text post → Coller' },
    { name: 'About.me', url: 'https://about.me', instructions: 'Page de profil → Ajouter lien vers site' },
    { name: 'Gravatar', url: 'https://gravatar.com', instructions: 'Profil → Ajouter site web' },
];

// Annuaires gratuits français
const DIRECTORIES = [
    { name: 'Pages Jaunes', url: 'https://www.pagesjaunes.fr/inscription' },
    { name: 'Google Business Profile', url: 'https://business.google.com' },
    { name: 'Yelp', url: 'https://biz.yelp.fr' },
    { name: 'Malt', url: 'https://www.malt.fr' },
    { name: 'Codeur.com', url: 'https://www.codeur.com' },
    { name: 'LinkedIn Company Page', url: 'https://www.linkedin.com/company/setup/new/' },
];

function generateOutput() {
    console.log('='.repeat(70));
    console.log('🔗 GÉNÉRATEUR DE BACKLINKS WEB 2.0 - INDHACK.COM');
    console.log('='.repeat(70));

    console.log('\n📋 ÉTAPE 1 : CRÉER DES COMPTES SUR CES PLATEFORMES\n');
    PLATFORMS.forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.name}`);
        console.log(`      URL: ${p.url}`);
        console.log(`      → ${p.instructions}\n`);
    });

    console.log('\n📋 ÉTAPE 2 : S\'INSCRIRE SUR CES ANNUAIRES\n');
    DIRECTORIES.forEach((d, i) => {
        console.log(`   ${i + 1}. ${d.name}: ${d.url}`);
    });

    console.log('\n' + '='.repeat(70));
    console.log('📝 CONTENU PRÊT À COPIER-COLLER');
    console.log('='.repeat(70));

    // Générer le contenu pour les 3 premières pages
    const pagesToPromote = PRIORITY_PAGES.slice(0, 3);

    pagesToPromote.forEach((page, index) => {
        console.log(`\n${'─'.repeat(70)}`);
        console.log(`📄 PAGE ${index + 1}: ${page.title} (${SITE_URL}${page.url})`);
        console.log('─'.repeat(70));

        console.log('\n🅱️ BLOGGER (HTML):');
        console.log('─'.repeat(40));
        console.log(TEMPLATES.blogger(page));

        console.log('\n📝 MEDIUM (Markdown):');
        console.log('─'.repeat(40));
        console.log(TEMPLATES.medium(page));

        console.log('\n💼 LINKEDIN:');
        console.log('─'.repeat(40));
        console.log(TEMPLATES.linkedin(page));

        console.log('\n🐦 TWITTER:');
        console.log('─'.repeat(40));
        console.log(TEMPLATES.twitter(page));
    });

    console.log('\n' + '='.repeat(70));
    console.log('✅ CHECKLIST BACKLINKS GRATUITS');
    console.log('='.repeat(70));
    console.log(`
□ Créer blog sur Blogger.com → Poster 3 articles avec liens
□ Créer compte Medium → Poster 3 articles avec liens
□ Publier 3 articles LinkedIn avec liens
□ Inscription Pages Jaunes
□ Vérifier Google Business Profile
□ Créer page entreprise LinkedIn
□ Profil Malt avec lien site
□ Tweets avec liens (1-2 par jour pendant 1 semaine)

💡 ASTUCE PRO:
   Après avoir posté sur Blogger, ajoute le blog dans Google Search Console
   et soumets le sitemap. Google crawlera ton blog → découvrira tes liens.

⏱️ TIMING:
   - Jour 1-2: Créer les comptes et profils
   - Jour 3-5: Poster le contenu
   - Jour 6-7: Soumettre dans Search Console
   - Semaine 2+: Attendre l'indexation

🎯 OBJECTIF: 10-20 backlinks gratuits en 1 semaine
`);

    // Sauvegarder dans un fichier
    const outputPath = path.join(__dirname, 'web20-content.txt');
    let fileContent = '# CONTENU WEB 2.0 POUR BACKLINKS\n\n';

    PRIORITY_PAGES.forEach(page => {
        fileContent += `\n## ${page.title}\n`;
        fileContent += `URL: ${SITE_URL}${page.url}\n\n`;
        fileContent += `### Blogger (HTML)\n${TEMPLATES.blogger(page)}\n`;
        fileContent += `### Medium\n${TEMPLATES.medium(page)}\n`;
        fileContent += `### LinkedIn\n${TEMPLATES.linkedin(page)}\n`;
        fileContent += `### Twitter\n${TEMPLATES.twitter(page)}\n`;
    });

    fs.writeFileSync(outputPath, fileContent);
    console.log(`\n📁 Contenu sauvegardé dans: scripts/web20-content.txt`);
}

generateOutput();
