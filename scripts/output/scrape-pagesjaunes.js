const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

puppeteer.use(StealthPlugin());
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Lire les leads fixes
const html = fs.readFileSync('/Users/indiana/Desktop/indhack.Com/scripts/output/prospect-EMAIL-224.html', 'utf-8');
const leads = eval(html.match(/const leads = (\[[\s\S]*?\]);/)[1]);

console.log(`\n🔍 Recherche sur Pages Jaunes pour ${leads.length} entreprises...\n`);

const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const mobileRegex = /(?:0|\+33|33)[67]\s*\d{2}\s*\d{2}\s*\d{2}\s*\d{2}/g;

async function searchPagesJaunes(page, businessName, city) {
  const query = `${businessName} ${city}`;
  const url = `https://www.pagesjaunes.fr/recherche/${encodeURIComponent(city)}?quoiqui=${encodeURIComponent(businessName)}`;

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await delay(1500 + Math.random() * 1000);

    const content = await page.content();

    // Chercher emails
    const emails = (content.match(emailRegex) || []).filter(e => {
      const lower = e.toLowerCase();
      return !lower.includes('pagesjaunes') &&
             !lower.includes('solocal') &&
             !lower.includes('example') &&
             !lower.includes('sentry') &&
             lower.length < 50;
    });

    // Chercher mobiles
    const mobiles = (content.match(mobileRegex) || []).map(m => {
      return m.replace(/\s+/g, '').replace(/^\+33/, '33').replace(/^0/, '33');
    }).filter(m => m.startsWith('336') || m.startsWith('337'));

    return {
      email: emails[0] || null,
      mobile: mobiles[0] || null
    };
  } catch (e) {
    return { email: null, mobile: null };
  }
}

async function searchGoogle(page, businessName, city) {
  const query = `"${businessName}" "${city}" 06 OR 07 OR @gmail OR @orange`;
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&num=10`;

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await delay(1000 + Math.random() * 500);

    const content = await page.content();

    const emails = (content.match(emailRegex) || []).filter(e => {
      const lower = e.toLowerCase();
      return !lower.includes('google') &&
             !lower.includes('example') &&
             !lower.includes('schema.org') &&
             lower.length < 50;
    });

    const mobiles = (content.match(mobileRegex) || []).map(m => {
      return m.replace(/\s+/g, '').replace(/^\+33/, '33').replace(/^0/, '33');
    }).filter(m => m.startsWith('336') || m.startsWith('337'));

    return {
      email: emails[0] || null,
      mobile: mobiles[0] || null
    };
  } catch (e) {
    return { email: null, mobile: null };
  }
}

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  const results = [];
  let foundMobile = 0;
  let foundEmail = 0;

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    process.stdout.write(`[${i + 1}/${leads.length}] ${lead.name.substring(0, 28).padEnd(28)} `);

    // Essayer Pages Jaunes d'abord
    let result = await searchPagesJaunes(page, lead.name, lead.city);

    // Si pas trouvé, essayer Google
    if (!result.mobile && !result.email) {
      result = await searchGoogle(page, lead.name, lead.city);
    }

    if (result.mobile) {
      foundMobile++;
      process.stdout.write(`📱 ${result.mobile} `);
    }
    if (result.email) {
      foundEmail++;
      process.stdout.write(`📧 ${result.email}`);
    }
    if (!result.mobile && !result.email) {
      process.stdout.write(`❌`);
    }
    console.log('');

    results.push({
      ...lead,
      newMobile: result.mobile,
      foundEmail: result.email
    });

    // Pause toutes les 15 requetes
    if (i % 15 === 14) {
      console.log(`\n⏳ Pause 8s...\n`);
      await delay(8000);
    }
  }

  await browser.close();

  console.log(`\n${'='.repeat(60)}`);
  console.log(`RESULTATS`);
  console.log(`${'='.repeat(60)}`);
  console.log(`📱 Mobiles trouves: ${foundMobile}/${leads.length}`);
  console.log(`📧 Emails trouves: ${foundEmail}/${leads.length}`);

  // Separer en 3 groupes
  const withMobile = results.filter(r => r.newMobile);
  const withEmailOnly = results.filter(r => !r.newMobile && r.foundEmail);
  const nothing = results.filter(r => !r.newMobile && !r.foundEmail);

  console.log(`\n→ ${withMobile.length} peuvent recevoir SMS/WhatsApp`);
  console.log(`→ ${withEmailOnly.length} peuvent recevoir Email seulement`);
  console.log(`→ ${nothing.length} aucun contact trouve (a ignorer)`);

  // Generer les fichiers
  if (withMobile.length > 0) {
    generateMobileHTML(withMobile);
  }
  if (withEmailOnly.length > 0) {
    generateEmailHTML(withEmailOnly);
  }

  // Sauvegarder les resultats bruts
  fs.writeFileSync(
    '/Users/indiana/Desktop/indhack.Com/scripts/output/leads-enriched.json',
    JSON.stringify(results, null, 2)
  );
}

function generateMobileHTML(leads) {
  const content = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>NOUVEAUX Mobiles - ${leads.length} leads</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #34C759; --bg: #0f172a; --card-bg: #1e293b; --text: #f8fafc; --text-dim: #94a3b8; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: var(--bg); color: var(--text); margin: 0; padding: 2rem; display: flex; flex-direction: column; align-items: center; }
        .container { width: 100%; max-width: 800px; }
        h1 { text-align: center; background: linear-gradient(135deg, #34C759, #30D158); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .stats { display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem; }
        .stat-card { background: var(--card-bg); padding: 1rem 2rem; border-radius: 1rem; text-align: center; }
        .stat-value { font-size: 1.5rem; font-weight: 700; display: block; }
        .stat-label { color: var(--text-dim); font-size: 0.8rem; }
        .lead-card { background: var(--card-bg); border-radius: 1rem; padding: 1.5rem; margin-bottom: 1rem; border-left: 4px solid var(--primary); }
        .lead-name { font-size: 1.1rem; font-weight: 700; margin: 0 0 0.5rem 0; }
        .lead-info { color: var(--text-dim); font-size: 0.85rem; margin-bottom: 0.5rem; }
        .lead-phone { font-family: monospace; color: var(--primary); font-size: 1rem; margin-bottom: 1rem; }
        .actions { display: flex; gap: 0.5rem; }
        .btn { padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; border: none; text-decoration: none; font-size: 0.85rem; }
        .btn-sms { background: #34C759; color: white; }
        .btn-wa { background: #25D366; color: white; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Nouveaux Mobiles Trouves</h1>
        <p style="text-align:center;color:var(--text-dim)">${leads.length} entreprises avec numero mobile</p>

        <div class="stats">
            <div class="stat-card">
                <span class="stat-value">${leads.length}</span>
                <span class="stat-label">Leads</span>
            </div>
        </div>

        ${leads.map(lead => {
          const phone = lead.newMobile;
          const phoneLocal = '+' + phone;
          const smsUrl = 'sms://' + phoneLocal + '&body=' + encodeURIComponent(lead.message);
          const waUrl = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(lead.message);

          return `
        <div class="lead-card">
            <div class="lead-name">${lead.name}</div>
            <div class="lead-info">${lead.city} - ${lead.subcategory} - ${lead.note}★ (${lead.avis} avis)</div>
            <div class="lead-phone">${phoneLocal}</div>
            <div class="actions">
                <a href="${smsUrl}" class="btn btn-sms">iMessage</a>
                <a href="${waUrl}" class="btn btn-wa" target="_blank">WhatsApp</a>
            </div>
        </div>`;
        }).join('')}
    </div>
</body>
</html>`;

  fs.writeFileSync('/Users/indiana/Desktop/indhack.Com/scripts/output/prospect-NOUVEAUX-MOBILES.html', content);
  console.log(`\n✅ prospect-NOUVEAUX-MOBILES.html genere (${leads.length} leads)`);
}

function generateEmailHTML(leads) {
  const content = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Emails Trouves - ${leads.length} leads</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #EA4335; --bg: #0f172a; --card-bg: #1e293b; --text: #f8fafc; --text-dim: #94a3b8; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: var(--bg); color: var(--text); margin: 0; padding: 2rem; display: flex; flex-direction: column; align-items: center; }
        .container { width: 100%; max-width: 800px; }
        h1 { text-align: center; background: linear-gradient(135deg, #EA4335, #ff6b6b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .lead-card { background: var(--card-bg); border-radius: 1rem; padding: 1.5rem; margin-bottom: 1rem; border-left: 4px solid var(--primary); }
        .lead-name { font-size: 1.1rem; font-weight: 700; margin: 0 0 0.5rem 0; }
        .lead-info { color: var(--text-dim); font-size: 0.85rem; margin-bottom: 0.5rem; }
        .lead-email { font-family: monospace; color: var(--primary); font-size: 1rem; margin-bottom: 1rem; }
        .btn { padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; border: none; text-decoration: none; font-size: 0.85rem; background: var(--primary); color: white; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Emails Trouves</h1>
        <p style="text-align:center;color:var(--text-dim)">${leads.length} entreprises avec email</p>

        ${leads.map(lead => {
          const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=' +
            encodeURIComponent(lead.foundEmail) +
            '&su=' + encodeURIComponent(lead.subject) +
            '&body=' + encodeURIComponent(lead.message);

          return `
        <div class="lead-card">
            <div class="lead-name">${lead.name}</div>
            <div class="lead-info">${lead.city} - ${lead.subcategory} - ${lead.note}★ (${lead.avis} avis)</div>
            <div class="lead-email">${lead.foundEmail}</div>
            <a href="${gmailUrl}" class="btn" target="_blank">Ouvrir Gmail</a>
        </div>`;
        }).join('')}
    </div>
</body>
</html>`;

  fs.writeFileSync('/Users/indiana/Desktop/indhack.Com/scripts/output/prospect-EMAILS-TROUVES.html', content);
  console.log(`✅ prospect-EMAILS-TROUVES.html genere (${leads.length} leads)`);
}

main().catch(console.error);
