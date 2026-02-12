const fs = require('fs');

// Lire TOUS les leads (WhatsApp + Email)
const whatsappHtml = fs.readFileSync('/Users/indiana/Desktop/indhack.Com/scripts/output/prospect-WHATSAPP-202.html', 'utf-8');
const emailHtml = fs.readFileSync('/Users/indiana/Desktop/indhack.Com/scripts/output/prospect-EMAIL-224.html', 'utf-8');

const whatsappLeads = eval(whatsappHtml.match(/const leads = (\[[\s\S]*?\]);/)[1]);
const emailLeads = eval(emailHtml.match(/const leads = (\[[\s\S]*?\]);/)[1]);

console.log('='.repeat(60));
console.log('ANALYSE DES LEADS');
console.log('='.repeat(60));
console.log(`\nWhatsApp (mobiles 06/07): ${whatsappLeads.length}`);
console.log(`Email/Fixes (04/09): ${emailLeads.length}`);
console.log(`TOTAL: ${whatsappLeads.length + emailLeads.length}`);

// Analyser les fixes
console.log('\n--- Analyse des numeros "fixes" ---');
const analysis = {
  startWith04: emailLeads.filter(l => l.mobile && l.mobile.startsWith('334')).length,
  startWith09: emailLeads.filter(l => l.mobile && l.mobile.startsWith('339')).length,
  noPhone: emailLeads.filter(l => !l.mobile).length,
};
console.log(`04 (fixes Sud): ${analysis.startWith04}`);
console.log(`09 (VoIP): ${analysis.startWith09}`);
console.log(`Sans tel: ${analysis.noPhone}`);

// Verifier les categories et URLs
console.log('\n--- Verification des URLs diagnostic ---');
const allLeads = [...whatsappLeads, ...emailLeads];
const urlIssues = [];
const categoryCount = {};

allLeads.forEach(lead => {
  // Compter par categorie
  categoryCount[lead.category] = (categoryCount[lead.category] || 0) + 1;

  // Verifier coherence URL
  if (lead.url) {
    const urlVille = lead.url.match(/ville=([^&]+)/);
    if (urlVille) {
      const villeInUrl = decodeURIComponent(urlVille[1]).replace(/\+/g, ' ');
      if (villeInUrl.toLowerCase() !== lead.city.toLowerCase()) {
        urlIssues.push({
          name: lead.name,
          leadCity: lead.city,
          urlCity: villeInUrl
        });
      }
    }
  }
});

console.log('\nPar categorie:');
Object.entries(categoryCount).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});

if (urlIssues.length > 0) {
  console.log(`\n⚠️  ${urlIssues.length} incoherences ville detectees:`);
  urlIssues.slice(0, 5).forEach(issue => {
    console.log(`  - ${issue.name}: lead=${issue.leadCity}, url=${issue.urlCity}`);
  });
} else {
  console.log('\n✅ Toutes les URLs sont coherentes avec les villes');
}

// Verifier les subcategories (metiers) supportees
console.log('\n--- Verification des metiers ---');
const supportedMetiers = [
  'coiffeur', 'barbier', 'prothesiste-ongulaire', 'boutique', 'estheticienne', 'spa',
  'restaurant', 'boulangerie', 'patisserie', 'traiteur', 'pizzeria', 'cafe', 'bar', 'glacier',
  'osteopathe', 'kinesitherapeute', 'psychologue', 'dentiste', 'medecin', 'infirmier', 'avocat', 'notaire',
  'peintre', 'carreleur', 'plombier', 'electricien', 'serrurier', 'renovation', 'maconnerie', 'menuisier', 'couvreur', 'chauffagiste', 'climatisation', 'paysagiste'
];

const metierCount = {};
const unsupportedMetiers = new Set();

allLeads.forEach(lead => {
  const metier = lead.subcategory.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-');

  metierCount[lead.subcategory] = (metierCount[lead.subcategory] || 0) + 1;

  // Extraire le metier de l'URL
  if (lead.url) {
    const urlMetier = lead.url.match(/\/diagnostic\/([^?]+)/);
    if (urlMetier && !supportedMetiers.includes(urlMetier[1])) {
      unsupportedMetiers.add(urlMetier[1]);
    }
  }
});

console.log('\nMetiers dans les leads:');
Object.entries(metierCount).sort((a,b) => b[1] - a[1]).forEach(([metier, count]) => {
  console.log(`  ${metier}: ${count}`);
});

if (unsupportedMetiers.size > 0) {
  console.log(`\n⚠️  Metiers dans URLs non supportes:`);
  unsupportedMetiers.forEach(m => console.log(`  - ${m}`));
}

// Generer fichier iMessage pour mobiles
console.log('\n' + '='.repeat(60));
console.log('GENERATION DES FICHIERS IMESSAGE');
console.log('='.repeat(60));

function generateiMessageHTML(leads, title) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ${leads.length} leads</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #34C759; --bg: #0f172a; --card-bg: #1e293b; --text: #f8fafc; --text-dim: #94a3b8; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: var(--bg); color: var(--text); margin: 0; padding: 2rem; display: flex; flex-direction: column; align-items: center; min-height: 100vh; }
        .container { width: 100%; max-width: 800px; }
        header { text-align: center; margin-bottom: 2rem; }
        h1 { font-size: 2rem; font-weight: 700; background: linear-gradient(135deg, #34C759, #30D158); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .stats { display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem; flex-wrap: wrap; }
        .stat-card { background: var(--card-bg); padding: 1rem 2rem; border-radius: 1rem; border: 1px solid #334155; text-align: center; }
        .stat-value { font-size: 1.5rem; font-weight: 700; display: block; }
        .stat-label { color: var(--text-dim); font-size: 0.8rem; text-transform: uppercase; }
        .lead-card { background: var(--card-bg); border-radius: 1.5rem; padding: 2rem; border: 1px solid #334155; position: relative; }
        .lead-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: var(--primary); border-radius: 1.5rem 1.5rem 0 0; }
        .lead-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
        .lead-name { font-size: 1.3rem; font-weight: 700; margin: 0; }
        .lead-info { color: var(--text-dim); font-size: 0.9rem; }
        .badge { background: #34C75922; color: var(--primary); padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; }

        .message-box { background: #0f172a; border: 1px solid #334155; border-radius: 1rem; padding: 1rem; margin-bottom: 1.5rem; font-size: 0.9rem; line-height: 1.5; white-space: pre-wrap; color: #cbd5e1; max-height: 200px; overflow-y: auto; }

        .actions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem; }
        .btn { padding: 1rem; border-radius: 0.75rem; font-weight: 600; cursor: pointer; border: none; text-decoration: none; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.95rem; }
        .btn-imessage { background: #34C759; color: white; }
        .btn-whatsapp { background: #25D366; color: white; }
        .btn-imessage:hover, .btn-whatsapp:hover { opacity: 0.9; transform: translateY(-1px); }

        .nav-actions { display: flex; gap: 1rem; }
        .btn-nav { flex: 1; padding: 0.75rem; border-radius: 0.5rem; font-size: 0.9rem; font-weight: 600; cursor: pointer; border: none; background: #334155; color: white; }
        .btn-nav:disabled { opacity: 0.5; cursor: not-allowed; }

        .progress-bar { width: 100%; height: 6px; background: #334155; border-radius: 3px; margin-top: 1.5rem; overflow: hidden; }
        .progress-inner { height: 100%; background: var(--primary); transition: width 0.5s ease; }
        .hidden { display: none; }
        .shortcut-hint { text-align: center; color: var(--text-dim); font-size: 0.75rem; margin-top: 1rem; }
        kbd { background: #334155; padding: 0.2rem 0.5rem; border-radius: 0.25rem; font-family: monospace; }
        .phone-display { font-family: monospace; color: var(--text-dim); font-size: 0.85rem; margin-top: 0.25rem; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>iMessage + WhatsApp</h1>
            <p style="color: var(--text-dim)">${leads.length} leads mobiles - Choisis ton app</p>
        </header>

        <div class="stats">
            <div class="stat-card">
                <span class="stat-value" id="count-total">${leads.length}</span>
                <span class="stat-label">Total</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" id="count-sent">0</span>
                <span class="stat-label">Envoyes</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" id="count-remaining">${leads.length}</span>
                <span class="stat-label">Restants</span>
            </div>
        </div>

        <div id="prospect-card" class="lead-card">
            <div class="lead-header">
                <div>
                    <h2 class="lead-name" id="lead-name">Chargement...</h2>
                    <div class="lead-info" id="lead-city">Ville</div>
                    <div class="phone-display" id="lead-phone"></div>
                </div>
                <div class="badge" id="lead-note">5.0</div>
            </div>

            <div class="message-box" id="lead-message">Message...</div>

            <div class="actions-grid">
                <a href="#" class="btn btn-imessage" id="btn-imessage" target="_blank">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.88 1.46 5.45 3.75 7.18V22l3.59-1.97c.86.23 1.77.35 2.66.35 5.52 0 10-4.14 10-9.25S17.52 2 12 2z"/></svg>
                    iMESSAGE
                </a>
                <a href="#" class="btn btn-whatsapp" id="btn-whatsapp" target="_blank">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WHATSAPP
                </a>
            </div>

            <div class="nav-actions">
                <button class="btn-nav" onclick="prevLead()" id="btn-prev" disabled>Precedent</button>
                <button class="btn-nav" onclick="nextLead()">Suivant</button>
            </div>

            <div class="progress-bar">
                <div class="progress-inner" id="progress-bar"></div>
            </div>

            <div class="shortcut-hint">
                <kbd>I</kbd> = iMessage | <kbd>W</kbd> = WhatsApp | <kbd>→</kbd> = Suivant | <kbd>←</kbd> = Precedent
            </div>
        </div>

        <div id="finished-card" class="lead-card hidden" style="text-align:center;padding:3rem">
            <h2>Termine !</h2>
            <p>Tu as parcouru tous les prospects.</p>
            <button class="btn btn-imessage" onclick="reset()">Recommencer</button>
        </div>
    </div>

    <script>
        const leads = ${JSON.stringify(leads, null, 2)};

        let currentIndex = parseInt(localStorage.getItem('imsg_index_v1') || '0');
        let sentCount = parseInt(localStorage.getItem('imsg_sent_v1') || '0');

        function formatPhone(phone) {
            if (!phone) return '';
            const clean = phone.replace(/\\D/g, '');
            if (clean.startsWith('33')) {
                const local = '0' + clean.substring(2);
                return local.replace(/(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})/, '$1 $2 $3 $4 $5');
            }
            return phone;
        }

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
            document.getElementById('lead-phone').textContent = formatPhone(lead.mobile);

            // iMessage URL (sms:// ouvre Messages sur Mac)
            const phoneLocal = '+' + lead.mobile;
            const imessageUrl = 'sms://' + phoneLocal + '&body=' + encodeURIComponent(lead.message);
            document.getElementById('btn-imessage').href = imessageUrl;

            // WhatsApp URL
            document.getElementById('btn-whatsapp').href = lead.whatsappUrl;

            document.getElementById('btn-prev').disabled = currentIndex === 0;
            document.getElementById('count-remaining').textContent = leads.length - currentIndex;
            document.getElementById('count-sent').textContent = sentCount;
            document.getElementById('progress-bar').style.width = ((currentIndex / leads.length) * 100) + '%';

            localStorage.setItem('imsg_index_v1', currentIndex);
        }

        function nextLead() {
            sentCount++;
            localStorage.setItem('imsg_sent_v1', sentCount);
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
            localStorage.setItem('imsg_index_v1', '0');
            localStorage.setItem('imsg_sent_v1', '0');
            updateUI();
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                nextLead();
            } else if (e.key === 'ArrowLeft') {
                prevLead();
            } else if (e.key === 'i' || e.key === 'I') {
                document.getElementById('btn-imessage').click();
            } else if (e.key === 'w' || e.key === 'W') {
                document.getElementById('btn-whatsapp').click();
            }
        });

        updateUI();
    </script>
</body>
</html>`;
}

// Generer le fichier iMessage pour les mobiles
fs.writeFileSync(
  '/Users/indiana/Desktop/indhack.Com/scripts/output/prospect-MOBILE-202.html',
  generateiMessageHTML(whatsappLeads, 'Prospection Mobile')
);
console.log(`\n✅ prospect-MOBILE-202.html genere (iMessage + WhatsApp)`);

// Pour les fixes (04/09), on ne peut PAS envoyer de SMS
// Il faut soit trouver leur email, soit leur numero mobile
console.log(`\n⚠️  Les 224 numeros fixes (04/09) ne peuvent PAS recevoir de SMS.`);
console.log(`   Options: trouver leurs emails ou mobiles sur Pages Jaunes/Google.`);
