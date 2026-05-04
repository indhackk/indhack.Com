#!/bin/bash
# Script de validation des 5 checks Codex avant merge sur main.
#
# Usage :
#   bash scripts/validate-preview.sh https://VOTRE-PREVIEW-URL.vercel.app
#
# Le script teste :
#   1. Auth admin : sans cookie + faux cookie 64 hex doivent rediriger
#   2. Citation checker : 503 propre si clés manquantes, 200 sinon
#   3. H1 textes bruts : pas de mots collés
#   4. Schema /consultant-seo-paris : pas d'address inventée
#   5. AuthorBio : présent sur articles dynamiques

set -u
PREVIEW="${1:-}"
if [ -z "$PREVIEW" ]; then
  echo "Usage : bash scripts/validate-preview.sh https://PREVIEW-URL.vercel.app"
  exit 1
fi
PREVIEW="${PREVIEW%/}"  # strip trailing slash

PASS=0
FAIL=0

ok()   { echo "  ✓ $1"; PASS=$((PASS+1)); }
fail() { echo "  ✗ $1"; FAIL=$((FAIL+1)); }

echo "=== Validation Preview : $PREVIEW ==="
echo

# Check 1 — Auth admin
echo "Check 1 : Auth admin"
status_no=$(curl -s -o /dev/null -w "%{http_code}" -L --max-redirs 0 "$PREVIEW/dashboard")
[ "$status_no" = "307" ] || [ "$status_no" = "302" ] || [ "$status_no" = "308" ] \
  && ok "Sans cookie : redirection ($status_no)" \
  || fail "Sans cookie : code $status_no (attendu 30x vers /admin-login)"

status_fake=$(curl -s -o /dev/null -w "%{http_code}" -L --max-redirs 0 \
  -H "Cookie: admin_auth=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
  "$PREVIEW/dashboard")
[ "$status_fake" = "307" ] || [ "$status_fake" = "302" ] || [ "$status_fake" = "308" ] \
  && ok "Faux cookie 64 hex : redirection ($status_fake)" \
  || fail "Faux cookie 64 hex : code $status_fake (attendu 30x — la faille est encore là si 200)"

echo

# Check 2 — Citation checker
echo "Check 2 : Citation checker"
resp=$(curl -s -o /tmp/citation.json -w "%{http_code}" \
  -X POST "$PREVIEW/api/citation-check" \
  -H "Content-Type: application/json" \
  --data '{"domain":"indhack.com","prompts":["consultante GEO France"]}')
echo "  HTTP: $resp"
cat /tmp/citation.json | python3 -c "
import json, sys
try:
    d = json.load(sys.stdin)
    if 'prompts' in d:
        p = d['prompts'][0]
        print(f'  engine: {p.get(\"aiEngine\")}')
        print(f'  isCited: {p.get(\"isCited\")}')
        print(f'  totalSources: {p.get(\"totalSources\")}')
        print(f'  snippet[:100]: {p.get(\"snippet\", \"\")[:100]}')
    elif 'error' in d:
        print(f'  ERROR: {d[\"error\"]}')
        print(f'  reason: {d.get(\"reason\", \"-\")}')
        print(f'  retryable: {d.get(\"retryable\")}')
except Exception as e:
    print(f'  Parse error: {e}')
"
if [ "$resp" = "200" ]; then
  ok "Citation API répond avec données valides"
elif [ "$resp" = "503" ]; then
  ok "Citation API répond 503 (clé Vercel manquante mais comportement propre)"
else
  fail "Citation API code inattendu : $resp"
fi

echo

# Check 3 — H1 textes bruts
echo "Check 3 : H1 textes bruts"
extract_h1() {
  curl -s "$1" | python3 -c "
import sys, re
html = sys.stdin.read()
m = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
if m:
    text = re.sub(r'<[^>]+>', ' ', m.group(1))
    text = re.sub(r'\s+', ' ', text).strip()
    print(text)
"
}

check_h1() {
  local url=$1
  local expect=$2
  local got=$(extract_h1 "$url")
  if echo "$got" | grep -q "$expect"; then
    ok "$url → $got"
  else
    fail "$url → got '$got' (attendu contient '$expect')"
  fi
}

check_h1 "$PREVIEW/" "Dominez Google. Devenez"
check_h1 "$PREVIEW/seo-local" "Consultant SEO Local partout"
check_h1 "$PREVIEW/a-propos" "visibilité Google, ma spécialité"
check_h1 "$PREVIEW/etude/barometre-visibilite-ia-2026" "Visibilité IA des Sites"

echo

# Check 4 — Schema /consultant-seo-paris
echo "Check 4 : Schema ville sans address inventée"
curl -s "$PREVIEW/consultant-seo-paris" | python3 -c "
import sys, re, json
html = sys.stdin.read()
matches = re.findall(r'<script[^>]*type=\"application/ld\+json\"[^>]*>(.*?)</script>', html, re.DOTALL)
service_schemas = []
for m in matches:
    try:
        data = json.loads(m)
        if data.get('@type') == 'ProfessionalService' and '#service' in data.get('@id', ''):
            service_schemas.append(data)
    except: pass
if not service_schemas:
    print('  ✗ Aucun ProfessionalService #service trouvé sur /consultant-seo-paris')
else:
    s = service_schemas[0]
    has_address = 'address' in s
    has_geo = 'geo' in s
    has_areaServed = 'areaServed' in s
    if not has_address and not has_geo and has_areaServed:
        print('  ✓ ProfessionalService propre : pas d address, pas de geo, areaServed présent')
    else:
        print(f'  ✗ Schema imparfait : address={has_address}, geo={has_geo}, areaServed={has_areaServed}')
"

echo

# Check 5 — AuthorBio sur article dynamique
echo "Check 5 : AuthorBio présent sur les articles dynamiques"
if curl -s "$PREVIEW/blog/audit-seo-approfondi-guide-complet" | grep -qE "À propos de l.auteure"; then
  ok "AuthorBio présent sur /blog/audit-seo-approfondi-guide-complet"
else
  fail "AuthorBio absent ou wording différent sur /blog/audit-seo-approfondi-guide-complet"
fi

echo
echo "=== Résumé : $PASS OK / $FAIL KO ==="
[ "$FAIL" = "0" ] && exit 0 || exit 1
