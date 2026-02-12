// Regenerate prospects with proper mobile/email handling
const fs = require('fs');

// Read existing HTML to extract leads data
const html = fs.readFileSync('/Users/indiana/Desktop/indhack.Com/scripts/output/prospect-06-all-2026-02-12.html', 'utf-8');

// Extract leads array from HTML
const leadsMatch = html.match(/const leads = (\[[\s\S]*?\]);/);
if (!leadsMatch) {
  console.error('Could not extract leads');
  process.exit(1);
}

const leads = eval(leadsMatch[1]);
console.log(`Found ${leads.length} leads`);

// Message templates WITHOUT emojis
const MESSAGE_TEMPLATES = {
  RESTAURATION: `Bonjour,

Je viens de voir {{nom}} sur Google avec {{note}} etoiles et {{avis}} avis - vos clients vous adorent.

Mais quand quelqu'un cherche "{{subcategory}} {{ville}}" sur Google, vous n'apparaissez pas en premier... alors que vos concurrents moins bien notes, si.

J'ai prepare une analyse gratuite de votre visibilite ici :
{{url}}

Ca prend 2 min a regarder. Vous me dites ce que vous en pensez ?

Indiana - IndHack
06 61 13 97 48`,

  SANTE: `Bonjour,

Je travaille avec des professionnels de sante dans le 06 et j'ai remarque que votre cabinet {{nom}} a de tres bons retours patients ({{note}} etoiles, {{avis}} avis).

Mais quand quelqu'un cherche "{{subcategory}} {{ville}}" sur Google pour prendre RDV, vous n'apparaissez pas en premier - ce sont vos confreres qui captent ces patients.

J'ai prepare une analyse de votre visibilite en ligne ici :
{{url}}

Est-ce que ca vous interesse d'en discuter ?

Indiana - IndHack
06 61 13 97 48`,

  ARTISANS: `Bonjour,

Je contacte {{nom}} car j'ai vu que vous avez de tres bons avis clients ({{note}} etoiles, {{avis}} avis) - c'est rare dans le batiment.

Le probleme : quand quelqu'un a besoin d'un {{subcategory}} en urgence a {{ville}} et cherche sur Google, il tombe sur vos concurrents... pas sur vous.

J'ai fait une petite analyse gratuite de votre visibilite :
{{url}}

Ca vous dit qu'on en parle ?

Indiana - IndHack
06 61 13 97 48`
};

// Email subject templates
const EMAIL_SUBJECTS = {
  RESTAURATION: '{{nom}} - Vos {{avis}} avis meritent d etre vus sur Google',
  SANTE: '{{nom}} - Visibilite en ligne pour votre cabinet',
  ARTISANS: '{{nom}} - Vos clients vous cherchent sur Google'
};

function replaceVars(template, vars) {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
  }
  return result;
}

function isMobile(phone) {
  // French mobile: starts with 336 or 337
  return phone && (phone.startsWith('336') || phone.startsWith('337'));
}

function generateWhatsAppUrl(phone, message) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function generateEmailSearchUrl(businessName, city) {
  const query = `${businessName} ${city} email contact`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function generateGmailComposeUrl(subject, body) {
  return `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Process leads
const processedLeads = leads.map(lead => {
  const vars = {
    nom: lead.name,
    ville: lead.city,
    note: lead.note,
    avis: lead.avis,
    subcategory: lead.subcategory,
    url: lead.url
  };

  const message = replaceVars(MESSAGE_TEMPLATES[lead.category] || MESSAGE_TEMPLATES.RESTAURATION, vars);
  const subject = replaceVars(EMAIL_SUBJECTS[lead.category] || EMAIL_SUBJECTS.RESTAURATION, vars);

  const mobile = isMobile(lead.mobile);

  return {
    ...lead,
    message,
    subject,
    isMobile: mobile,
    whatsappUrl: mobile ? generateWhatsAppUrl(lead.mobile, message) : null,
    emailSearchUrl: generateEmailSearchUrl(lead.name, lead.city),
    gmailUrl: generateGmailComposeUrl(subject, message)
  };
});

// Separate mobile and fixed
const mobileLeads = processedLeads.filter(l => l.isMobile);
const fixedLeads = processedLeads.filter(l => !l.isMobile);

console.log(`Mobile (WhatsApp): ${mobileLeads.length}`);
console.log(`Fixed (Email): ${fixedLeads.length}`);

// Generate HTML
function generateHTML(leads, title, type) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ${leads.length} leads</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: ${type === 'whatsapp' ? '#25D366' : '#4285F4'};
            --bg: #0f172a;
            --card-bg: #1e293b;
            --text: #f8fafc;
            --text-dim: #94a3b8;
        }
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: var(--bg);
            color: var(--text);
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            padding: 2rem;
        }
        .container { width: 100%; max-width: 800px; }
        header { text-align: center; margin-bottom: 3rem; }
        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, var(--primary) 0%, ${type === 'whatsapp' ? '#34d399' : '#34a0f4'} 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .stats {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        .stat-card {
            background: var(--card-bg);
            padding: 1rem 2rem;
            border-radius: 1rem;
            border: 1px solid #334155;
            text-align: center;
        }
        .stat-value { font-size: 1.5rem; font-weight: 700; display: block; }
        .stat-label { color: var(--text-dim); font-size: 0.8rem; text-transform: uppercase; }
        .lead-card {
            background: var(--card-bg);
            border-radius: 1.5rem;
            padding: 2rem;
            border: 1px solid #334155;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }
        .lead-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: var(--primary);
        }
        .lead-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1.5rem;
        }
        .lead-name { font-size: 1.5rem; font-weight: 700; margin: 0; }
        .lead-info { color: var(--text-dim); font-size: 1rem; margin-bottom: 0.5rem; }
        .badge {
            background: ${type === 'whatsapp' ? '#25D36622' : '#4285F422'};
            color: var(--primary);
            padding: 0.25rem 0.75rem;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        .message-box {
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 1rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
            font-size: 0.95rem;
            line-height: 1.6;
            white-space: pre-wrap;
            color: #cbd5e1;
        }
        .actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        button, .action-btn {
            flex: 1;
            min-width: 120px;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
            text-decoration: none;
            text-align: center;
            display: inline-block;
        }
        .btn-primary {
            background: var(--primary);
            color: white;
        }
        .btn-primary:hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        }
        .btn-secondary { background: #334155; color: white; }
        .btn-secondary:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-gmail { background: #EA4335; color: white; }
        .btn-search { background: #4285F4; color: white; }
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #334155;
            border-radius: 4px;
            margin-top: 2rem;
            overflow: hidden;
        }
        .progress-inner {
            height: 100%;
            background: var(--primary);
            width: 0%;
            transition: width 0.5s ease;
        }
        .hidden { display: none; }
        .finished { text-align: center; padding: 3rem; }
        .subcategory-tag {
            background: #334155;
            color: var(--text-dim);
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            margin-left: 0.5rem;
        }
        .phone-display {
            font-family: monospace;
            color: var(--text-dim);
            font-size: 0.9rem;
            margin-top: 0.5rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>${title}</h1>
            <p style="color: var(--text-dim)">Entreprises SANS SITE - ${type === 'whatsapp' ? 'Envoi WhatsApp' : 'Contact par email'}</p>
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
                <div>
                    <div class="badge" id="lead-note">5.0</div>
                    <span class="subcategory-tag" id="lead-subcategory">metier</span>
                </div>
            </div>

            <div class="message-box" id="lead-message">Message...</div>

            <div class="actions">
                <button class="btn-secondary" onclick="prevLead()" id="btn-prev" disabled>Precedent</button>
                ${type === 'whatsapp'
                  ? '<a href="#" class="action-btn btn-primary" id="btn-send" target="_blank">ENVOYER WHATSAPP</a>'
                  : `<a href="#" class="action-btn btn-search" id="btn-search" target="_blank">CHERCHER EMAIL</a>
                     <a href="#" class="action-btn btn-gmail" id="btn-gmail" target="_blank">OUVRIR GMAIL</a>`
                }
                <button class="btn-secondary" onclick="nextLead()">Suivant</button>
            </div>

            <div class="progress-bar">
                <div class="progress-inner" id="progress-bar"></div>
            </div>
        </div>

        <div id="finished-card" class="lead-card hidden finished">
            <h2>Termine</h2>
            <p>Tu as parcouru tous les prospects.</p>
            <button class="btn-primary" onclick="reset()">Recommencer</button>
        </div>
    </div>

    <script>
        const leads = ${JSON.stringify(leads, null, 2)};

        let currentIndex = parseInt(localStorage.getItem('${type}_index_v2') || '0');
        let sentCount = parseInt(localStorage.getItem('${type}_sent_v2') || '0');

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
            document.getElementById('lead-city').textContent = lead.city + ' - ' + lead.category;
            document.getElementById('lead-note').textContent = lead.note + ' (' + lead.avis + ' avis)';
            document.getElementById('lead-subcategory').textContent = lead.subcategory;
            document.getElementById('lead-message').textContent = lead.message;
            document.getElementById('lead-phone').textContent = lead.mobile ? 'Tel: ' + lead.mobile : '';

            ${type === 'whatsapp'
              ? `document.getElementById('btn-send').href = lead.whatsappUrl;`
              : `document.getElementById('btn-search').href = lead.emailSearchUrl;
                 document.getElementById('btn-gmail').href = lead.gmailUrl;`
            }

            document.getElementById('btn-prev').disabled = currentIndex === 0;

            document.getElementById('count-remaining').textContent = leads.length - currentIndex;
            document.getElementById('count-sent').textContent = sentCount;
            document.getElementById('progress-bar').style.width = ((currentIndex / leads.length) * 100) + '%';

            localStorage.setItem('${type}_index_v2', currentIndex);
        }

        function nextLead() {
            sentCount++;
            localStorage.setItem('${type}_sent_v2', sentCount);
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
            localStorage.setItem('${type}_index_v2', '0');
            localStorage.setItem('${type}_sent_v2', '0');
            updateUI();
        }

        updateUI();
    </script>
</body>
</html>`;
}

// Generate files
fs.writeFileSync(
  '/Users/indiana/Desktop/indhack.Com/scripts/output/prospect-WHATSAPP-202.html',
  generateHTML(mobileLeads, 'Prospection WhatsApp', 'whatsapp')
);

fs.writeFileSync(
  '/Users/indiana/Desktop/indhack.Com/scripts/output/prospect-EMAIL-224.html',
  generateHTML(fixedLeads, 'Prospection Email', 'email')
);

console.log('\\nFichiers generes:');
console.log('- prospect-WHATSAPP-202.html (numeros mobiles 06/07)');
console.log('- prospect-EMAIL-224.html (numeros fixes - recherche email)');
