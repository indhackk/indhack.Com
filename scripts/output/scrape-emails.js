const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

puppeteer.use(StealthPlugin());

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Lire les leads
const html = fs.readFileSync('/Users/indiana/Desktop/indhack.Com/scripts/output/prospect-EMAIL-224.html', 'utf-8');
const leadsMatch = html.match(/const leads = (\[[\s\S]*?\]);/);
const leads = eval(leadsMatch[1]);

console.log(`🔍 Recherche d'emails pour ${leads.length} entreprises...\n`);

// Regex pour trouver des emails
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

async function findEmail(page, businessName, city) {
  const query = `"${businessName}" "${city}" email OR @gmail.com OR @orange.fr OR @hotmail`;
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&num=10`;

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await delay(1000 + Math.random() * 1000);

    const content = await page.content();
    const emails = content.match(emailRegex) || [];

    // Filtrer les emails valides (pas google, pas example, etc)
    const validEmails = emails.filter(email => {
      const dominated = email.toLowerCase();
      return !dominated.includes('google') &&
             !dominated.includes('example') &&
             !dominated.includes('sentry') &&
             !dominated.includes('schema.org') &&
             !dominated.includes('w3.org') &&
             !dominated.includes('googleapis') &&
             !dominated.includes('gstatic') &&
             !dominated.includes('@x.') &&
             !dominated.includes('noreply') &&
             !dominated.includes('support@') &&
             dominated.length < 50;
    });

    // Prioriser les emails qui semblent correspondre au business
    const businessWords = businessName.toLowerCase().split(/\s+/);
    const prioritized = validEmails.sort((a, b) => {
      const aMatch = businessWords.some(w => a.toLowerCase().includes(w.substring(0, 4)));
      const bMatch = businessWords.some(w => b.toLowerCase().includes(w.substring(0, 4)));
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });

    return prioritized[0] || null;
  } catch (e) {
    return null;
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
  let found = 0;

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    process.stdout.write(`[${i + 1}/${leads.length}] ${lead.name.substring(0, 30).padEnd(30)} `);

    const email = await findEmail(page, lead.name, lead.city);

    if (email) {
      found++;
      console.log(`✅ ${email}`);
      results.push({ ...lead, foundEmail: email });
    } else {
      console.log(`❌ Non trouvé`);
      results.push({ ...lead, foundEmail: null });
    }

    // Pause pour éviter le blocage
    if (i % 10 === 9) {
      console.log(`\n⏳ Pause 5s pour éviter le blocage...\n`);
      await delay(5000);
    }
  }

  await browser.close();

  console.log(`\n📊 Résultat: ${found}/${leads.length} emails trouvés (${Math.round(found/leads.length*100)}%)`);

  // Générer le HTML final
  generateFinalHTML(results);
}

function generateFinalHTML(leads) {
  const leadsWithEmail = leads.filter(l => l.foundEmail);
  const leadsWithoutEmail = leads.filter(l => !l.foundEmail);

  console.log(`\n📧 ${leadsWithEmail.length} leads avec email → Gmail direct`);
  console.log(`🔍 ${leadsWithoutEmail.length} leads sans email → Recherche manuelle`);

  const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prospection Email - ${leadsWithEmail.length} emails trouves</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #4285F4; --gmail: #EA4335; --bg: #0f172a; --card-bg: #1e293b; --text: #f8fafc; --text-dim: #94a3b8; --success: #22c55e; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: var(--bg); color: var(--text); margin: 0; display: flex; flex-direction: column; align-items: center; min-height: 100vh; padding: 2rem; }
        .container { width: 100%; max-width: 800px; }
        header { text-align: center; margin-bottom: 2rem; }
        h1 { font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem; background: linear-gradient(135deg, #22c55e 0%, #4ade80 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .stats { display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem; flex-wrap: wrap; }
        .stat-card { background: var(--card-bg); padding: 1rem 2rem; border-radius: 1rem; border: 1px solid #334155; text-align: center; }
        .stat-value { font-size: 1.5rem; font-weight: 700; display: block; }
        .stat-label { color: var(--text-dim); font-size: 0.8rem; text-transform: uppercase; }
        .lead-card { background: var(--card-bg); border-radius: 1.5rem; padding: 2rem; border: 1px solid #334155; position: relative; overflow: hidden; }
        .lead-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: var(--success); }
        .lead-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
        .lead-name { font-size: 1.3rem; font-weight: 700; margin: 0; }
        .lead-info { color: var(--text-dim); font-size: 0.9rem; }
        .badge { background: #22c55e22; color: var(--success); padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; }
        .email-display { background: #0f172a; border: 2px solid var(--success); border-radius: 1rem; padding: 1rem 1.5rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; }
        .email-text { font-family: monospace; font-size: 1.1rem; color: var(--success); }
        .btn-gmail { background: var(--gmail); color: white; border: none; padding: 1rem 2rem; border-radius: 0.75rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; text-decoration: none; }
        .btn-gmail:hover { opacity: 0.9; transform: translateY(-2px); }
        .message-box { background: #0f172a; border: 1px solid #334155; border-radius: 1rem; padding: 1rem; margin-bottom: 1.5rem; font-size: 0.85rem; line-height: 1.5; white-space: pre-wrap; color: #cbd5e1; max-height: 150px; overflow-y: auto; }
        .actions { display: flex; gap: 1rem; }
        button { flex: 1; padding: 0.75rem; border-radius: 0.5rem; font-size: 0.9rem; font-weight: 600; cursor: pointer; border: none; }
        .btn-secondary { background: #334155; color: white; }
        .btn-secondary:disabled { opacity: 0.5; cursor: not-allowed; }
        .progress-bar { width: 100%; height: 6px; background: #334155; border-radius: 3px; margin-top: 1.5rem; overflow: hidden; }
        .progress-inner { height: 100%; background: var(--success); transition: width 0.5s ease; }
        .hidden { display: none; }
        .shortcut-hint { text-align: center; color: var(--text-dim); font-size: 0.75rem; margin-top: 1rem; }
        kbd { background: #334155; padding: 0.2rem 0.5rem; border-radius: 0.25rem; font-family: monospace; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Prospection Email - PRET A ENVOYER</h1>
            <p style="color: var(--text-dim)">${leadsWithEmail.length} emails trouves automatiquement</p>
        </header>

        <div class="stats">
            <div class="stat-card">
                <span class="stat-value" id="count-total">${leadsWithEmail.length}</span>
                <span class="stat-label">Total</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" id="count-sent">0</span>
                <span class="stat-label">Envoyes</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" id="count-remaining">${leadsWithEmail.length}</span>
                <span class="stat-label">Restants</span>
            </div>
        </div>

        <div id="prospect-card" class="lead-card">
            <div class="lead-header">
                <div>
                    <h2 class="lead-name" id="lead-name">Chargement...</h2>
                    <div class="lead-info" id="lead-city">Ville</div>
                </div>
                <div class="badge" id="lead-note">5.0</div>
            </div>

            <div class="email-display">
                <span class="email-text" id="lead-email">email@example.com</span>
                <a href="#" class="btn-gmail" id="btn-gmail" target="_blank">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    OUVRIR GMAIL
                </a>
            </div>

            <details>
                <summary style="cursor:pointer;color:var(--text-dim);font-size:0.85rem;margin-bottom:1rem">Voir le message</summary>
                <div class="message-box" id="lead-message">Message...</div>
            </details>

            <div class="actions">
                <button class="btn-secondary" onclick="prevLead()" id="btn-prev" disabled>Precedent</button>
                <button class="btn-secondary" onclick="nextLead()">Suivant →</button>
            </div>

            <div class="progress-bar">
                <div class="progress-inner" id="progress-bar"></div>
            </div>

            <div class="shortcut-hint">
                <kbd>Enter</kbd> ou <kbd>→</kbd> = Suivant | <kbd>←</kbd> = Precedent
            </div>
        </div>

        <div id="finished-card" class="lead-card hidden" style="text-align:center;padding:3rem">
            <h2>Termine !</h2>
            <p>Tu as parcouru tous les prospects avec email.</p>
            <button class="btn-gmail" onclick="reset()" style="margin:0 auto">Recommencer</button>
        </div>
    </div>

    <script>
        const leads = ${JSON.stringify(leadsWithEmail, null, 2)};

        let currentIndex = parseInt(localStorage.getItem('email_final_index') || '0');
        let sentCount = parseInt(localStorage.getItem('email_final_sent') || '0');

        function updateUI() {
            if (currentIndex >= leads.length) {
                document.getElementById('prospect-card').classList.add('hidden');
                document.getElementById('finished-card').classList.remove('hidden');
                return;
            }

            document.getElementById('prospect-card').classList.remove('hidden');
            document.getElementById('finished-card').classList.add('hidden');

            const lead = leads[currentIndex];
            document.getElementById('lead-name').textContent = lead.name;
            document.getElementById('lead-city').textContent = lead.city + ' - ' + lead.subcategory;
            document.getElementById('lead-note').textContent = lead.note + ' (' + lead.avis + ' avis)';
            document.getElementById('lead-message').textContent = lead.message;
            document.getElementById('lead-email').textContent = lead.foundEmail;

            // Gmail URL avec email pre-rempli
            const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1' +
                '&to=' + encodeURIComponent(lead.foundEmail) +
                '&su=' + encodeURIComponent(lead.subject) +
                '&body=' + encodeURIComponent(lead.message);
            document.getElementById('btn-gmail').href = gmailUrl;

            document.getElementById('btn-prev').disabled = currentIndex === 0;
            document.getElementById('count-remaining').textContent = leads.length - currentIndex;
            document.getElementById('count-sent').textContent = sentCount;
            document.getElementById('progress-bar').style.width = ((currentIndex / leads.length) * 100) + '%';

            localStorage.setItem('email_final_index', currentIndex);
        }

        function nextLead() {
            sentCount++;
            localStorage.setItem('email_final_sent', sentCount);
            currentIndex++;
            updateUI();
        }

        function prevLead() {
            if (currentIndex > 0) {
                currentIndex--;
                updateUI();
            }
        }

        function reset() {
            currentIndex = 0;
            sentCount = 0;
            localStorage.setItem('email_final_index', '0');
            localStorage.setItem('email_final_sent', '0');
            updateUI();
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === 'ArrowRight') {
                nextLead();
            } else if (e.key === 'ArrowLeft') {
                prevLead();
            }
        });

        updateUI();
    </script>
</body>
</html>`;

  fs.writeFileSync('/Users/indiana/Desktop/indhack.Com/scripts/output/prospect-EMAIL-FINAL.html', htmlContent);
  console.log('\n✅ Fichier genere: prospect-EMAIL-FINAL.html');
  console.log('   → Ouvre Gmail avec To, Sujet et Message PRE-REMPLIS');
}

main().catch(console.error);
