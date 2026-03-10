#!/bin/bash
# ==========================================================
# Script d'ajout de métadonnées EXIF aux images
# Améliore l'attribution et le branding dans Google Images
# Requiert: exiftool (brew install exiftool)
# ==========================================================

# Vérifier si exiftool est installé
if ! command -v exiftool &> /dev/null; then
    echo "❌ exiftool n'est pas installé."
    echo "   Installez-le avec: brew install exiftool"
    exit 1
fi

# Configuration des métadonnées
AUTHOR="Indiana Aflalo"
COPYRIGHT="© 2026 INDHACK.com - Indiana Aflalo"
CREATOR="Indiana Aflalo - Consultante SEO & GEO"
CREATOR_URL="https://indhack.com"
DESCRIPTION="Image optimisée pour le SEO par IndHack - Expertise SEO & GEO"

# Couleurs pour le terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "🖼️  Script EXIF IndHack - Ajout des métadonnées"
echo "================================================"
echo ""

# Compteurs
total=0
updated=0
skipped=0

# Parcourir les images dans public/images
find public/images -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) | while read -r img; do
    ((total++))

    # Vérifier si l'image a déjà les métadonnées
    existing_author=$(exiftool -Artist -s3 "$img" 2>/dev/null)

    if [[ "$existing_author" == "$AUTHOR" ]]; then
        echo -e "${YELLOW}⏭️  Déjà traité:${NC} $img"
        ((skipped++))
    else
        # Ajouter les métadonnées EXIF
        exiftool \
            -Artist="$AUTHOR" \
            -Copyright="$COPYRIGHT" \
            -Creator="$CREATOR" \
            -CreatorWorkURL="$CREATOR_URL" \
            -ImageDescription="$DESCRIPTION" \
            -XPAuthor="$AUTHOR" \
            -XPComment="Optimisé par IndHack" \
            -overwrite_original \
            "$img" 2>/dev/null

        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Métadonnées ajoutées:${NC} $img"
            ((updated++))
        else
            echo -e "${RED}❌ Erreur:${NC} $img"
        fi
    fi
done

echo ""
echo "================================================"
echo "📊 Résumé:"
echo "   - Images traitées: $total"
echo "   - Mises à jour: $updated"
echo "   - Déjà à jour: $skipped"
echo ""
echo "✅ Terminé!"
