// Script pour trouver les emails des entreprises via Google Search
const fs = require('fs');

// Lire le HTML pour extraire les leads
const html = fs.readFileSync('/Users/indiana/Desktop/indhack.Com/scripts/output/prospect-EMAIL-224.html', 'utf-8');
const leadsMatch = html.match(/const leads = (\[[\s\S]*?\]);/);
if (!leadsMatch) {
  console.error('Could not extract leads');
  process.exit(1);
}

const leads = eval(leadsMatch[1]);
console.log(`Found ${leads.length} leads to process`);

// Fonction pour générer des emails probables
function generateProbableEmails(businessName, city) {
  // Nettoyer le nom
  const cleanName = businessName
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '')
    .substring(0, 20);

  const shortName = cleanName.substring(0, 12);

  // Patterns les plus courants pour commerces locaux
  return [
    `${cleanName}@gmail.com`,
    `${shortName}@gmail.com`,
    `contact.${shortName}@gmail.com`,
    `${cleanName}@orange.fr`,
    `${cleanName}@hotmail.fr`,
  ];
}

// Générer le nouveau HTML avec emails suggérés
function generateHTML(leads) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prospection Email - ${leads.length} leads</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #4285F4;
            --gmail: #EA4335;
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
        .container { width: 100%; max-width: 900px; }
        header { text-align: center; margin-bottom: 2rem; }
        h1 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #4285F4 0%, #34a0f4 100%);
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
            margin-bottom: 1rem;
        }
        .lead-name { font-size: 1.3rem; font-weight: 700; margin: 0; }
        .lead-info { color: var(--text-dim); font-size: 0.9rem; }
        .badge {
            background: #4285F422;
            color: var(--primary);
            padding: 0.25rem 0.75rem;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        /* EMAIL INPUT SECTION */
        .email-section {
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 1rem;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
        }
        .email-label {
            font-size: 0.9rem;
            color: var(--text-dim);
            margin-bottom: 0.5rem;
        }
        .email-input-row {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        .email-input {
            flex: 1;
            background: #1e293b;
            border: 2px solid #334155;
            border-radius: 0.5rem;
            padding: 0.75rem 1rem;
            color: white;
            font-size: 1rem;
            font-family: monospace;
        }
        .email-input:focus {
            outline: none;
            border-color: var(--primary);
        }
        .btn-send-email {
            background: var(--gmail);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            white-space: nowrap;
        }
        .btn-send-email:hover {
            opacity: 0.9;
        }

        /* Suggestions */
        .suggestions {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .suggestion {
            background: #334155;
            color: var(--text-dim);
            padding: 0.4rem 0.8rem;
            border-radius: 0.5rem;
            font-size: 0.75rem;
            cursor: pointer;
            font-family: monospace;
            transition: all 0.2s;
        }
        .suggestion:hover {
            background: var(--primary);
            color: white;
        }

        /* Message preview */
        .message-box {
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 1rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
            font-size: 0.85rem;
            line-height: 1.5;
            white-space: pre-wrap;
            color: #cbd5e1;
            max-height: 200px;
            overflow-y: auto;
        }

        .actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        button, .action-btn {
            flex: 1;
            min-width: 100px;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
            text-decoration: none;
            text-align: center;
        }
        .btn-secondary { background: #334155; color: white; }
        .btn-secondary:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-search { background: #4285F4; color: white; }

        .progress-bar {
            width: 100%;
            height: 6px;
            background: #334155;
            border-radius: 3px;
            margin-top: 1.5rem;
            overflow: hidden;
        }
        .progress-inner {
            height: 100%;
            background: var(--primary);
            transition: width 0.5s ease;
        }
        .hidden { display: none; }
        .finished { text-align: center; padding: 3rem; }

        .shortcut-hint {
            text-align: center;
            color: var(--text-dim);
            font-size: 0.75rem;
            margin-top: 1rem;
        }
        kbd {
            background: #334155;
            padding: 0.2rem 0.5rem;
            border-radius: 0.25rem;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Prospection Email</h1>
            <p style="color: var(--text-dim)">Entreprises SANS SITE - Numeros fixes</p>
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
                </div>
                <div>
                    <div class="badge" id="lead-note">5.0</div>
                </div>
            </div>

            <!-- EMAIL INPUT -->
            <div class="email-section">
                <div class="email-label">Email du commerce :</div>
                <div class="email-input-row">
                    <input type="email" class="email-input" id="email-input" placeholder="email@exemple.com" />
                    <button class="btn-send-email" onclick="sendEmail()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        ENVOYER
                    </button>
                </div>
                <div class="email-label" style="margin-top:0.5rem">Suggestions (cliquer pour utiliser) :</div>
                <div class="suggestions" id="suggestions"></div>
                <a href="#" id="search-link" target="_blank" style="display:inline-block;margin-top:0.75rem;color:#4285F4;font-size:0.8rem;">
                    Chercher l'email sur Google
                </a>
            </div>

            <details style="margin-bottom:1rem">
                <summary style="cursor:pointer;color:var(--text-dim);font-size:0.85rem">Voir le message</summary>
                <div class="message-box" id="lead-message">Message...</div>
            </details>

            <div class="actions">
                <button class="btn-secondary" onclick="prevLead()" id="btn-prev" disabled>Precedent</button>
                <button class="btn-secondary" onclick="skipLead()">Passer</button>
                <button class="btn-secondary" onclick="nextLead()">Suivant</button>
            </div>

            <div class="progress-bar">
                <div class="progress-inner" id="progress-bar"></div>
            </div>

            <div class="shortcut-hint">
                <kbd>Enter</kbd> = Envoyer | <kbd>→</kbd> = Suivant | <kbd>←</kbd> = Precedent
            </div>
        </div>

        <div id="finished-card" class="lead-card hidden finished">
            <h2>Termine !</h2>
            <p>Tu as parcouru tous les prospects.</p>
            <button class="btn-send-email" onclick="reset()">Recommencer</button>
        </div>
    </div>

    <script>
        const leads = ${JSON.stringify(leads.map(l => ({
          ...l,
          probableEmails: generateProbableEmails(l.name, l.city)
        })), null, 2)};

        let currentIndex = parseInt(localStorage.getItem('email_index_v3') || '0');
        let sentCount = parseInt(localStorage.getItem('email_sent_v3') || '0');

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
            document.getElementById('search-link').href = lead.emailSearchUrl;

            // Email input
            const savedEmail = localStorage.getItem('email_' + currentIndex) || '';
            document.getElementById('email-input').value = savedEmail;
            document.getElementById('email-input').focus();

            // Suggestions
            const suggestionsDiv = document.getElementById('suggestions');
            suggestionsDiv.innerHTML = lead.probableEmails.map(email =>
                '<span class="suggestion" onclick="useEmail(\\'' + email + '\\')">' + email + '</span>'
            ).join('');

            document.getElementById('btn-prev').disabled = currentIndex === 0;
            document.getElementById('count-remaining').textContent = leads.length - currentIndex;
            document.getElementById('count-sent').textContent = sentCount;
            document.getElementById('progress-bar').style.width = ((currentIndex / leads.length) * 100) + '%';

            localStorage.setItem('email_index_v3', currentIndex);
        }

        function useEmail(email) {
            document.getElementById('email-input').value = email;
            localStorage.setItem('email_' + currentIndex, email);
        }

        function sendEmail() {
            const email = document.getElementById('email-input').value.trim();
            if (!email || !email.includes('@')) {
                alert('Entre un email valide');
                return;
            }

            localStorage.setItem('email_' + currentIndex, email);

            const lead = leads[currentIndex];
            const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1' +
                '&to=' + encodeURIComponent(email) +
                '&su=' + encodeURIComponent(lead.subject) +
                '&body=' + encodeURIComponent(lead.message);

            window.open(gmailUrl, '_blank');

            sentCount++;
            localStorage.setItem('email_sent_v3', sentCount);
            currentIndex++;
            updateUI();
        }

        function skipLead() {
            currentIndex++;
            updateUI();
        }

        function nextLead() {
            sentCount++;
            localStorage.setItem('email_sent_v3', sentCount);
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
            localStorage.setItem('email_index_v3', '0');
            localStorage.setItem('email_sent_v3', '0');
            updateUI();
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendEmail();
            } else if (e.key === 'ArrowRight') {
                nextLead();
            } else if (e.key === 'ArrowLeft') {
                prevLead();
            }
        });

        updateUI();
    </script>
</body>
</html>`;
}

// Générer le fichier
const outputPath = '/Users/indiana/Desktop/indhack.Com/scripts/output/prospect-EMAIL-v2.html';
fs.writeFileSync(outputPath, generateHTML(leads));

console.log('\\n✅ Nouveau fichier genere: prospect-EMAIL-v2.html');
console.log('\\nAmeliorations:');
console.log('- Champ email pre-rempli avec suggestions');
console.log('- Clic sur suggestion = email copie');
console.log('- Bouton ENVOYER ouvre Gmail AVEC l\'email deja rempli');
console.log('- Raccourcis clavier: Enter=Envoyer, Fleches=Navigation');
console.log('- Emails sauvegardes localement pour chaque lead');
