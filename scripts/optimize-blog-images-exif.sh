#!/bin/bash
# =============================================================================
# Script d'optimisation des images blog avec EXIF SEO
# IndHack - indhack.com
# =============================================================================

set -e

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Chemins
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
IMAGES_DIR="$PROJECT_ROOT/public/images/blog"
CONTENT_DIR="$PROJECT_ROOT/content/blog"

echo -e "${BLUE}==============================================================================${NC}"
echo -e "${BLUE}  OPTIMISATION IMAGES BLOG + EXIF SEO - IndHack${NC}"
echo -e "${BLUE}==============================================================================${NC}"
echo ""

# =============================================================================
# 1. Vérification des dépendances
# =============================================================================
echo -e "${YELLOW}[1/5] Vérification des dépendances...${NC}"

check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}✗ $1 non trouvé${NC}"
        return 1
    else
        echo -e "${GREEN}✓ $1 installé${NC}"
        return 0
    fi
}

MISSING_DEPS=0

if ! check_command "exiftool"; then
    echo -e "  ${YELLOW}→ Installer avec: brew install exiftool${NC}"
    MISSING_DEPS=1
fi

if ! check_command "convert"; then
    echo -e "  ${YELLOW}→ Installer avec: brew install imagemagick${NC}"
    # Essayer avec rsvg-convert comme alternative
    if ! check_command "rsvg-convert"; then
        echo -e "  ${YELLOW}→ Alternative: brew install librsvg${NC}"
        MISSING_DEPS=1
    fi
fi

if ! check_command "cwebp"; then
    echo -e "  ${YELLOW}→ Installer avec: brew install webp${NC}"
    MISSING_DEPS=1
fi

if [ $MISSING_DEPS -eq 1 ]; then
    echo ""
    echo -e "${RED}Dépendances manquantes. Installation:${NC}"
    echo -e "${YELLOW}brew install exiftool imagemagick webp${NC}"
    echo ""
    read -p "Voulez-vous les installer maintenant ? (o/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Oo]$ ]]; then
        brew install exiftool imagemagick webp
    else
        echo -e "${RED}Script annulé.${NC}"
        exit 1
    fi
fi

echo ""

# =============================================================================
# 2. Conversion SVG → PNG → WebP
# =============================================================================
echo -e "${YELLOW}[2/5] Conversion des images SVG...${NC}"

convert_svg_to_webp() {
    local svg_file="$1"
    local output_name="$2"
    local png_temp="$IMAGES_DIR/${output_name}.png"
    local webp_file="$IMAGES_DIR/${output_name}.webp"

    if [ ! -f "$svg_file" ]; then
        echo -e "${RED}✗ SVG non trouvé: $svg_file${NC}"
        return 1
    fi

    echo -e "  Converting: $(basename $svg_file)"

    # SVG → PNG (1200x630 pour OG)
    if command -v rsvg-convert &> /dev/null; then
        rsvg-convert -w 1200 -h 630 "$svg_file" -o "$png_temp"
    elif command -v convert &> /dev/null; then
        convert -density 150 -resize 1200x630! "$svg_file" "$png_temp"
    else
        echo -e "${RED}✗ Aucun convertisseur SVG disponible${NC}"
        return 1
    fi

    # PNG → WebP
    cwebp -q 85 "$png_temp" -o "$webp_file" 2>/dev/null

    # Supprimer le PNG temporaire
    rm -f "$png_temp"

    if [ -f "$webp_file" ]; then
        echo -e "${GREEN}  ✓ Créé: ${output_name}.webp${NC}"
        return 0
    else
        echo -e "${RED}  ✗ Échec: ${output_name}.webp${NC}"
        return 1
    fi
}

# Article 1: Définition SEO
convert_svg_to_webp "$IMAGES_DIR/definition-seo-guide-complet.svg" "definition-seo-guide-complet"

# Article 2: Prix création site
convert_svg_to_webp "$IMAGES_DIR/prix-creation-site-internet-2026.svg" "prix-creation-site-internet-2026"

echo ""

# =============================================================================
# 3. Injection des métadonnées EXIF
# =============================================================================
echo -e "${YELLOW}[3/5] Injection des métadonnées EXIF SEO...${NC}"

inject_exif() {
    local image_file="$1"
    local title="$2"
    local description="$3"
    local keywords="$4"

    if [ ! -f "$image_file" ]; then
        echo -e "${RED}✗ Image non trouvée: $image_file${NC}"
        return 1
    fi

    echo -e "  EXIF: $(basename $image_file)"

    exiftool -overwrite_original \
        -Title="$title" \
        -Description="$description" \
        -Author="Indiana Aflalo - IndHack" \
        -Copyright="© 2026 IndHack - indhack.com" \
        -Keywords="$keywords" \
        -XMP-dc:Creator="Indiana Aflalo" \
        -XMP-dc:Rights="© 2026 IndHack - Tous droits réservés" \
        -XMP-dc:Title="$title" \
        -XMP-dc:Description="$description" \
        -IPTC:By-line="Indiana Aflalo" \
        -IPTC:CopyrightNotice="© 2026 IndHack" \
        -IPTC:Caption-Abstract="$description" \
        "$image_file" > /dev/null 2>&1

    echo -e "${GREEN}  ✓ EXIF injecté${NC}"
}

# Article 1: Définition SEO
inject_exif "$IMAGES_DIR/definition-seo-guide-complet.webp" \
    "Les 3 piliers du SEO : technique, contenu et autorité - Guide 2026" \
    "Schéma explicatif des 3 piliers du référencement naturel (SEO) en 2026 : optimisation technique, contenu de qualité et autorité. Guide complet par Indiana Aflalo, consultante SEO freelance." \
    "SEO, référencement naturel, piliers SEO, technique, contenu, autorité, guide SEO 2026, définition SEO, qu'est-ce que le SEO"

# Article 2: Prix création site
inject_exif "$IMAGES_DIR/prix-creation-site-internet-2026.webp" \
    "Prix création site internet 2026 - Grille tarifaire complète" \
    "Comparatif des prix de création de site web en 2026 : site vitrine (500€-8000€), e-commerce (3000€-50000€), sur-mesure. Guide par Indiana Aflalo, consultante SEO." \
    "prix site internet, création site web, tarif site vitrine, coût e-commerce, devis site web, budget site internet 2026"

echo ""

# =============================================================================
# 4. Mise à jour du frontmatter des articles
# =============================================================================
echo -e "${YELLOW}[4/5] Mise à jour du frontmatter des articles...${NC}"

update_frontmatter() {
    local md_file="$1"
    local old_image="$2"
    local new_image="$3"

    if [ ! -f "$md_file" ]; then
        echo -e "${RED}✗ Fichier non trouvé: $md_file${NC}"
        return 1
    fi

    # Vérifier si l'image est déjà mise à jour
    if grep -q "$new_image" "$md_file"; then
        echo -e "${BLUE}  ⊘ Déjà à jour: $(basename $md_file)${NC}"
        return 0
    fi

    # Remplacer l'ancienne image par la nouvelle
    sed -i.bak "s|image: \"$old_image\"|image: \"$new_image\"|g" "$md_file"
    rm -f "${md_file}.bak"

    echo -e "${GREEN}  ✓ Mis à jour: $(basename $md_file)${NC}"
}

# Article 1
update_frontmatter "$CONTENT_DIR/definition-seo-guide-complet.md" \
    "/images/blog/pourquoi-consultant-seo.jpg" \
    "/images/blog/definition-seo-guide-complet.webp"

# Article 2
update_frontmatter "$CONTENT_DIR/prix-creation-site-internet-2026.md" \
    "/images/blog/cout-site-web-2026.jpg" \
    "/images/blog/prix-creation-site-internet-2026.webp"

echo ""

# =============================================================================
# 5. Vérification finale
# =============================================================================
echo -e "${YELLOW}[5/5] Vérification finale...${NC}"
echo ""

verify_image() {
    local image_file="$1"
    local image_name="$(basename $image_file)"

    if [ ! -f "$image_file" ]; then
        echo -e "${RED}✗ $image_name - MANQUANT${NC}"
        return 1
    fi

    local size=$(ls -lh "$image_file" | awk '{print $5}')
    local title=$(exiftool -Title "$image_file" 2>/dev/null | cut -d':' -f2- | xargs)
    local author=$(exiftool -Author "$image_file" 2>/dev/null | cut -d':' -f2- | xargs)

    echo -e "${GREEN}✓ $image_name${NC}"
    echo -e "  Taille: $size"
    echo -e "  Title: ${title:-NON DÉFINI}"
    echo -e "  Author: ${author:-NON DÉFINI}"
    echo ""
}

echo -e "${BLUE}Images créées:${NC}"
verify_image "$IMAGES_DIR/definition-seo-guide-complet.webp"
verify_image "$IMAGES_DIR/prix-creation-site-internet-2026.webp"

echo -e "${BLUE}Frontmatter vérifié:${NC}"
echo -e "  Article 1: $(grep '^image:' $CONTENT_DIR/definition-seo-guide-complet.md)"
echo -e "  Article 2: $(grep '^image:' $CONTENT_DIR/prix-creation-site-internet-2026.md)"
echo ""

# =============================================================================
# Résumé
# =============================================================================
echo -e "${BLUE}==============================================================================${NC}"
echo -e "${GREEN}  TERMINÉ !${NC}"
echo -e "${BLUE}==============================================================================${NC}"
echo ""
echo -e "Prochaine étape: ${YELLOW}npm run build${NC}"
echo ""
