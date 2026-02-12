/**
 * Générateur de contacts et messages - Prospection 06
 * Prend les données scrapées et génère:
 * - CSV avec tous les contacts + URLs WhatsApp + messages
 * - Page HTML pour cliquer facilement
 * - Fichier texte avec messages prêts à copier
 *
 * Usage: npx ts-node scripts/prospection-06/generate-contacts.ts [options]
 *
 * Options:
 *   --input=prospects-06-sans-site.json    Fichier d'entrée
 *   --category=RESTAURATION                Filtrer par catégorie
 *   --limit=100                            Limiter le nombre de contacts
 */

import * as fs from 'fs';
import * as path from 'path';

// Types
interface ScrapedBusiness {
    id: string;
    name: string;
    rating: number | null;
    reviewCount: number | null;
    address: string | null;
    phone: string | null;
    hasWebsite: boolean;
    category: string | null;
    city: string;
    searchQuery: string;
    scrapedAt: string;
}

interface EnrichedContact {
    // Identité
    id: string;
    name: string;
    category: string;
    subcategory: string;
    city: string;

    // Google
    rating: number;
    reviewCount: number;
    address: string;

    // Contact
    phone: string;
    phoneClean: string;

    // URLs générées
    diagnosticUrl: string;
    whatsappUrl: string;

    // Messages
    whatsappMessage: string;
    emailSubject: string;
    emailBody: string;

    // Status
    status: 'new' | 'contacted' | 'responded' | 'converted';
}

// Catégories et templates
const CATEGORY_MAPPING: Record<string, { categoryId: string; metierSlug: string }> = {
    'restaurant': { categoryId: 'RESTAURATION', metierSlug: 'restaurant' },
    'pizzeria': { categoryId: 'RESTAURATION', metierSlug: 'restaurant' },
    'boulangerie': { categoryId: 'RESTAURATION', metierSlug: 'boulangerie' },
    'patisserie': { categoryId: 'RESTAURATION', metierSlug: 'boulangerie' },
    'traiteur': { categoryId: 'RESTAURATION', metierSlug: 'traiteur' },
    'dentiste': { categoryId: 'SANTE', metierSlug: 'dentiste' },
    'osteopathe': { categoryId: 'SANTE', metierSlug: 'osteopathe' },
    'kine': { categoryId: 'SANTE', metierSlug: 'kinesitherapeute' },
    'kinesitherapeute': { categoryId: 'SANTE', metierSlug: 'kinesitherapeute' },
    'psychologue': { categoryId: 'SANTE', metierSlug: 'psychologue' },
    'plombier': { categoryId: 'ARTISANS', metierSlug: 'plombier' },
    'electricien': { categoryId: 'ARTISANS', metierSlug: 'electricien' },
    'serrurier': { categoryId: 'ARTISANS', metierSlug: 'serrurier' },
    'peintre': { categoryId: 'ARTISANS', metierSlug: 'peintre' },
    'carreleur': { categoryId: 'ARTISANS', metierSlug: 'carreleur' },
};

const MESSAGE_TEMPLATES: Record<string, { whatsapp: string; emailSubject: string; emailBody: string }> = {
    RESTAURATION: {
        whatsapp: `Bonjour ! 👋

Je viens de voir {{nom}} sur Google avec {{note}}★ et {{avis}} avis - vos clients vous adorent !

Mais quand quelqu'un cherche "{{subcategory}} {{ville}}" sur Google, vous n'apparaissez pas en premier... alors que vos concurrents moins bien notés, si.

J'ai préparé une analyse gratuite de votre visibilité ici :
{{url}}

Ça prend 2 min à regarder. Vous me dites ce que vous en pensez ?

Indiana - IndHack
📞 06 61 13 97 48`,
        emailSubject: '{{nom}} - Vos {{avis}} avis méritent d\'être vus sur Google',
        emailBody: `Bonjour,

Je me permets de vous contacter car j'ai remarqué que {{nom}} a d'excellentes notes sur Google ({{note}}★ avec {{avis}} avis).

Pourtant, quand je cherche "{{subcategory}} {{ville}}" sur Google, votre établissement n'apparaît pas dans les premiers résultats.

C'est dommage, car vos concurrents moins bien notés captent tous les clients qui cherchent en ligne.

J'ai préparé une analyse gratuite de votre situation :
{{url}}

Ça prend 2 minutes à regarder. Si vous voulez en discuter, je suis disponible pour un appel de 15 minutes.

Bien cordialement,

Indiana Aflalo
Consultante SEO - IndHack
📞 06 61 13 97 48
🌐 indhack.com`
    },
    SANTE: {
        whatsapp: `Bonjour ! 👋

Je travaille avec des professionnels de santé dans le 06 et j'ai remarqué que votre cabinet {{nom}} a de très bons retours patients ({{note}}★, {{avis}} avis).

Mais quand quelqu'un cherche "{{subcategory}} {{ville}}" sur Google pour prendre RDV, vous n'apparaissez pas en premier - ce sont vos confrères qui captent ces patients.

J'ai préparé une analyse de votre visibilité en ligne ici :
{{url}}

Est-ce que ça vous intéresse d'en discuter ?

Indiana - IndHack
📞 06 61 13 97 48`,
        emailSubject: '{{nom}} - Visibilité en ligne pour votre cabinet',
        emailBody: `Bonjour,

Je me permets de vous contacter car j'accompagne des professionnels de santé dans le 06 sur leur visibilité Google.

J'ai remarqué que votre cabinet {{nom}} a d'excellents retours patients ({{note}}★ avec {{avis}} avis).

Cependant, quand un patient potentiel cherche "{{subcategory}} {{ville}}" sur Google, votre cabinet n'apparaît pas dans les premiers résultats.

Cela signifie que des patients qui cherchent exactement vos services finissent chez vos confrères mieux référencés.

J'ai préparé une analyse personnalisée de votre situation :
{{url}}

Si vous souhaitez en discuter, je suis disponible pour un appel de 15 minutes à votre convenance.

Bien cordialement,

Indiana Aflalo
Consultante SEO - IndHack
📞 06 61 13 97 48
🌐 indhack.com`
    },
    ARTISANS: {
        whatsapp: `Bonjour ! 👋

Je contacte {{nom}} car j'ai vu que vous avez de très bons avis clients ({{note}}★, {{avis}} avis) - c'est rare dans le bâtiment !

Le problème : quand quelqu'un a besoin d'un {{subcategory}} en urgence à {{ville}} et cherche sur Google, il tombe sur vos concurrents... pas sur vous.

J'ai fait une petite analyse gratuite de votre visibilité :
{{url}}

Ça vous dit qu'on en parle ?

Indiana - IndHack
📞 06 61 13 97 48`,
        emailSubject: '{{nom}} - Vos clients vous cherchent sur Google',
        emailBody: `Bonjour,

Je me permets de vous contacter car j'ai remarqué que {{nom}} a d'excellents avis clients ({{note}}★ avec {{avis}} avis).

C'est assez rare dans le secteur du bâtiment, et ça mérite d'être mis en avant.

Le problème : quand quelqu'un cherche "{{subcategory}} {{ville}}" sur Google (souvent en urgence), votre entreprise n'apparaît pas dans les premiers résultats.

Ce sont vos concurrents - parfois moins bien notés - qui récupèrent ces appels.

J'ai préparé une analyse gratuite de votre visibilité en ligne :
{{url}}

Si vous souhaitez en discuter, je suis disponible pour un appel de 15 minutes.

Bien cordialement,

Indiana Aflalo
Consultante SEO - IndHack
📞 06 61 13 97 48
🌐 indhack.com`
    }
};

// Helpers
function cleanPhone(phone: string): string {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
        cleaned = '33' + cleaned.substring(1);
    }
    if (!cleaned.startsWith('33')) {
        cleaned = '33' + cleaned;
    }
    return cleaned;
}

function generateDiagnosticUrl(metierSlug: string, name: string, city: string, rating: number, reviews: number): string {
    const params = new URLSearchParams({
        nom: name,
        ville: city,
        note: rating.toString(),
        avis: reviews.toString()
    });
    return `https://indhack.com/diagnostic/${metierSlug}?${params.toString()}`;
}

function generateWhatsAppUrl(phone: string, message: string): string {
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function replaceVariables(template: string, vars: Record<string, string>): string {
    let result = template;
    for (const [key, value] of Object.entries(vars)) {
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return result;
}

function enrichContact(business: ScrapedBusiness): EnrichedContact | null {
    // Skip si pas de données essentielles
    if (!business.name || !business.rating || !business.reviewCount) {
        return null;
    }

    // Déterminer la catégorie
    const subcategory = business.category || 'restaurant';
    const mapping = CATEGORY_MAPPING[subcategory] || { categoryId: 'RESTAURATION', metierSlug: 'restaurant' };
    const categoryId = mapping.categoryId;

    // Générer le téléphone (placeholder si pas dispo)
    const phone = business.phone || '';
    const phoneClean = phone ? cleanPhone(phone) : '';

    // Générer l'URL de diagnostic
    const diagnosticUrl = generateDiagnosticUrl(
        mapping.metierSlug,
        business.name,
        business.city,
        business.rating,
        business.reviewCount
    );

    // Préparer les variables
    const vars = {
        nom: business.name,
        ville: business.city,
        note: business.rating.toFixed(1),
        avis: business.reviewCount.toString(),
        subcategory: subcategory,
        url: diagnosticUrl
    };

    // Générer les messages
    const templates = MESSAGE_TEMPLATES[categoryId] || MESSAGE_TEMPLATES.RESTAURATION;
    const whatsappMessage = replaceVariables(templates.whatsapp, vars);
    const emailSubject = replaceVariables(templates.emailSubject, vars);
    const emailBody = replaceVariables(templates.emailBody, vars);

    // Générer l'URL WhatsApp
    const whatsappUrl = phoneClean ? generateWhatsAppUrl(phoneClean, whatsappMessage) : '';

    return {
        id: business.id,
        name: business.name,
        category: categoryId,
        subcategory,
        city: business.city,
        rating: business.rating,
        reviewCount: business.reviewCount,
        address: business.address || '',
        phone,
        phoneClean,
        diagnosticUrl,
        whatsappUrl,
        whatsappMessage,
        emailSubject,
        emailBody,
        status: 'new'
    };
}

function parseArgs(): {
    input: string;
    category?: string;
    limit: number;
} {
    const args = process.argv.slice(2);
    const result = {
        input: 'prospects-06-sans-site.json',
        category: undefined as string | undefined,
        limit: 500
    };

    for (const arg of args) {
        if (arg.startsWith('--input=')) {
            result.input = arg.split('=')[1];
        } else if (arg.startsWith('--category=')) {
            result.category = arg.split('=')[1].toUpperCase();
        } else if (arg.startsWith('--limit=')) {
            result.limit = parseInt(arg.split('=')[1], 10);
        }
    }

    return result;
}

function generateHTML(contacts: EnrichedContact[]): string {
    const byCategory: Record<string, EnrichedContact[]> = {};

    for (const contact of contacts) {
        if (!byCategory[contact.category]) {
            byCategory[contact.category] = [];
        }
        byCategory[contact.category].push(contact);
    }

    const categoryColors: Record<string, string> = {
        RESTAURATION: '#D97706',
        SANTE: '#06B6D4',
        ARTISANS: '#F59E0B'
    };

    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prospection 06 - ${contacts.length} contacts</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; padding: 20px; }
        .header { background: #1a1a1a; color: white; padding: 30px; border-radius: 16px; margin-bottom: 30px; }
        .header h1 { font-size: 28px; margin-bottom: 10px; }
        .stats { display: flex; gap: 30px; margin-top: 20px; }
        .stat { text-align: center; }
        .stat-value { font-size: 36px; font-weight: bold; }
        .stat-label { font-size: 14px; opacity: 0.7; }
        .category { margin-bottom: 30px; }
        .category-header { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; padding: 15px; background: white; border-radius: 12px; }
        .category-dot { width: 12px; height: 12px; border-radius: 50%; }
        .category-name { font-weight: 600; font-size: 18px; }
        .category-count { background: #eee; padding: 4px 10px; border-radius: 20px; font-size: 14px; }
        .contacts { display: grid; gap: 15px; }
        .contact { background: white; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 20px; }
        .contact-info { flex: 1; }
        .contact-name { font-weight: 600; font-size: 16px; margin-bottom: 4px; }
        .contact-meta { font-size: 14px; color: #666; }
        .contact-rating { display: flex; align-items: center; gap: 5px; }
        .star { color: #f59e0b; }
        .contact-actions { display: flex; gap: 10px; }
        .btn { padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
        .btn-whatsapp { background: #25D366; color: white; }
        .btn-audit { background: #638576; color: white; }
        .btn:hover { opacity: 0.9; }
        .no-phone { opacity: 0.5; }
        .search { margin-bottom: 20px; }
        .search input { width: 100%; padding: 15px 20px; border: 2px solid #eee; border-radius: 12px; font-size: 16px; }
        .search input:focus { outline: none; border-color: #638576; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎯 Prospection 06 - Entreprises Sans Site</h1>
        <p>Contacts générés le ${new Date().toLocaleDateString('fr-FR')}</p>
        <div class="stats">
            <div class="stat">
                <div class="stat-value">${contacts.length}</div>
                <div class="stat-label">Total contacts</div>
            </div>
            <div class="stat">
                <div class="stat-value">${contacts.filter(c => c.phone).length}</div>
                <div class="stat-label">Avec téléphone</div>
            </div>
            <div class="stat">
                <div class="stat-value">${Object.keys(byCategory).length}</div>
                <div class="stat-label">Catégories</div>
            </div>
        </div>
    </div>

    <div class="search">
        <input type="text" id="searchInput" placeholder="🔍 Rechercher un contact..." onkeyup="filterContacts()">
    </div>

    ${Object.entries(byCategory).map(([category, items]) => `
    <div class="category" data-category="${category}">
        <div class="category-header">
            <div class="category-dot" style="background: ${categoryColors[category] || '#666'}"></div>
            <span class="category-name">${category}</span>
            <span class="category-count">${items.length} contacts</span>
        </div>
        <div class="contacts">
            ${items.map(contact => `
            <div class="contact ${!contact.phone ? 'no-phone' : ''}" data-name="${contact.name.toLowerCase()}">
                <div class="contact-info">
                    <div class="contact-name">${contact.name}</div>
                    <div class="contact-meta">
                        <span class="contact-rating">
                            <span class="star">★</span> ${contact.rating.toFixed(1)} (${contact.reviewCount} avis)
                        </span>
                        • ${contact.city}
                        ${contact.phone ? `• ${contact.phone}` : '• <em>Pas de téléphone</em>'}
                    </div>
                </div>
                <div class="contact-actions">
                    ${contact.whatsappUrl ? `
                    <a href="${contact.whatsappUrl}" target="_blank" class="btn btn-whatsapp">
                        💬 WhatsApp
                    </a>
                    ` : ''}
                    <a href="${contact.diagnosticUrl}" target="_blank" class="btn btn-audit">
                        📊 Audit
                    </a>
                </div>
            </div>
            `).join('')}
        </div>
    </div>
    `).join('')}

    <script>
        function filterContacts() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            document.querySelectorAll('.contact').forEach(el => {
                const name = el.getAttribute('data-name');
                el.style.display = name.includes(query) ? 'flex' : 'none';
            });
        }
    </script>
</body>
</html>`;
}

function saveResults(contacts: EnrichedContact[], outputDir: string): void {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const basePath = path.join(outputDir, `contacts-06-${timestamp}`);

    // JSON complet
    fs.writeFileSync(`${basePath}.json`, JSON.stringify({
        generatedAt: new Date().toISOString(),
        total: contacts.length,
        byCategory: contacts.reduce((acc, c) => {
            acc[c.category] = (acc[c.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>),
        contacts
    }, null, 2));

    // CSV
    const csvHeaders = 'ID,Nom,Categorie,Sous-categorie,Ville,Note,Avis,Telephone,URL Diagnostic,URL WhatsApp,Status\n';
    const csvRows = contacts.map(c =>
        `"${c.id}","${c.name.replace(/"/g, '""')}","${c.category}","${c.subcategory}","${c.city}",${c.rating},${c.reviewCount},"${c.phone}","${c.diagnosticUrl}","${c.whatsappUrl}","${c.status}"`
    ).join('\n');

    fs.writeFileSync(`${basePath}.csv`, csvHeaders + csvRows);

    // HTML
    fs.writeFileSync(`${basePath}.html`, generateHTML(contacts));

    // Messages WhatsApp (texte)
    const messagesFile = contacts
        .filter(c => c.phone)
        .map(c => `=== ${c.name} (${c.city}) ===\nTél: ${c.phone}\nWhatsApp: ${c.whatsappUrl}\n\n${c.whatsappMessage}\n\n---\n`)
        .join('\n');

    fs.writeFileSync(`${basePath}-messages.txt`, messagesFile);

    console.log(`\n💾 Fichiers générés:`);
    console.log(`   - ${basePath}.json`);
    console.log(`   - ${basePath}.csv`);
    console.log(`   - ${basePath}.html`);
    console.log(`   - ${basePath}-messages.txt`);
}

// Main
async function main() {
    const args = parseArgs();

    console.log('═══════════════════════════════════════════════════════════');
    console.log('   GÉNÉRATEUR DE CONTACTS - PROSPECTION 06');
    console.log('═══════════════════════════════════════════════════════════');

    // Charger les données
    const inputPath = path.join(__dirname, '..', '..', 'data', 'prospection', args.input);

    if (!fs.existsSync(inputPath)) {
        console.error(`❌ Fichier non trouvé: ${inputPath}`);
        console.log('\nAssurez-vous d\'avoir lancé le scraper d\'abord:');
        console.log('  npx ts-node scripts/prospection-06/scraper-gmaps.ts --test');
        process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
    let businesses: ScrapedBusiness[] = data.results || data;

    console.log(`\n📂 Chargé: ${businesses.length} entreprises`);

    // Filtrer par catégorie si spécifié
    if (args.category) {
        const categorySubcats = Object.entries(CATEGORY_MAPPING)
            .filter(([, v]) => v.categoryId === args.category)
            .map(([k]) => k);

        businesses = businesses.filter(b => categorySubcats.includes(b.category || ''));
        console.log(`   Filtré par ${args.category}: ${businesses.length} entreprises`);
    }

    // Limiter
    if (businesses.length > args.limit) {
        businesses = businesses.slice(0, args.limit);
        console.log(`   Limité à: ${args.limit} entreprises`);
    }

    // Enrichir les contacts
    const contacts: EnrichedContact[] = [];

    for (const business of businesses) {
        const enriched = enrichContact(business);
        if (enriched) {
            contacts.push(enriched);
        }
    }

    console.log(`\n✅ ${contacts.length} contacts enrichis`);

    // Stats
    const withPhone = contacts.filter(c => c.phone).length;
    console.log(`   Avec téléphone: ${withPhone}`);
    console.log(`   Sans téléphone: ${contacts.length - withPhone}`);

    // Sauvegarder
    const outputDir = path.join(__dirname, '..', '..', 'data', 'prospection');
    saveResults(contacts, outputDir);

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('   TERMINÉ');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`\n🎯 Ouvrez le fichier HTML pour commencer la prospection !`);
}

main().catch(console.error);
