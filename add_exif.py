import os
from PIL import Image
import piexif

images = [
    {
        "src": "/Users/indiana/.gemini/antigravity/brain/515e0a34-e14e-42fb-a739-975b00494138/blog_geo_ia_seo_1772218656264.png",
        "dest": "/Users/indiana/Desktop/indhack.Com/public/images/blog/geo-ia-seo-2026.webp",
        "desc": "Dashboard Visibilité GEO et IA SEO, Nice",
        "keywords": "SEO, IA, GEO, Nice"
    },
    {
        "src": "/Users/indiana/.gemini/antigravity/brain/515e0a34-e14e-42fb-a739-975b00494138/blog_creer_site_1772218671108.png",
        "dest": "/Users/indiana/Desktop/indhack.Com/public/images/blog/creer-site-visible-google-2026.webp",
        "desc": "Création de site web visible sur Google, Performance",
        "keywords": "Création site web, Visibilité, Google, SEO"
    },
    {
        "src": "/Users/indiana/.gemini/antigravity/brain/515e0a34-e14e-42fb-a739-975b00494138/blog_seo_local_1772218686145.png",
        "dest": "/Users/indiana/Desktop/indhack.Com/public/images/blog/seo-local-nice-2026.webp",
        "desc": "SEO Local à Nice, Dashboard de visibilité",
        "keywords": "SEO local, Nice, Visibilité"
    },
    {
        "src": "/Users/indiana/.gemini/antigravity/brain/515e0a34-e14e-42fb-a739-975b00494138/blog_site_lent_1772218736914.png",
        "dest": "/Users/indiana/Desktop/indhack.Com/public/images/blog/pourquoi-site-lent-2026.webp",
        "desc": "Performance Web, Optimisation de temps de chargement, Core Web Vitals",
        "keywords": "Vitesse, Performance Web, SEO Technique, Temps de chargement"
    },
    {
        "src": "/Users/indiana/.gemini/antigravity/brain/515e0a34-e14e-42fb-a739-975b00494138/blog_refonte_seo_1772218751272.png",
        "dest": "/Users/indiana/Desktop/indhack.Com/public/images/blog/refonte-sans-perte-seo-2026.webp",
        "desc": "Dashboard de refonte de site sans perte de trafic SEO",
        "keywords": "Refonte site web, SEO, Trafic, Stratégie"
    }
]

def to_deg(value, loc):
    if value < 0:
        loc_value = loc[0]
    elif value > 0:
        loc_value = loc[1]
    else:
        loc_value = ""
    abs_value = abs(value)
    deg = int(abs_value)
    t1 = (abs_value - deg) * 60
    min = int(t1)
    sec = round((t1 - min) * 60, 5)
    return (deg, min, sec, loc_value.encode('ascii'))

def add_exif_to_webp():
    print("Starting processing...")
    for img_data in images:
        if not os.path.exists(img_data["src"]):
            print(f"Skipping {img_data['src']} - not found.")
            continue
            
        img = Image.open(img_data["src"])
        if img.mode != 'RGB':
            img = img.convert('RGB')
            
        # Coordinates for Nice, France (43.7102° N, 7.2620° E)
        lat = 43.7102
        lng = 7.2620
        lat_deg = to_deg(lat, ["S", "N"])
        lng_deg = to_deg(lng, ["W", "E"])

        exif_ifd = {
            piexif.ImageIFD.ImageDescription: img_data["desc"].encode('utf-8'),
            piexif.ImageIFD.Software: b"IndHack Dashboard",
            piexif.ImageIFD.Artist: b"Indiana Aflalo",
        }
        gps_ifd = {
            piexif.GPSIFD.GPSLatitudeRef: lat_deg[3],
            piexif.GPSIFD.GPSLatitude: ((lat_deg[0], 1), (lat_deg[1], 1), (int(lat_deg[2]*1000), 1000)),
            piexif.GPSIFD.GPSLongitudeRef: lng_deg[3],
            piexif.GPSIFD.GPSLongitude: ((lng_deg[0], 1), (lng_deg[1], 1), (int(lng_deg[2]*1000), 1000)),
        }
        
        exif_dict = {"0th": exif_ifd, "Exif": {}, "GPS": gps_ifd, "1st": {}, "thumbnail": None}
        exif_bytes = piexif.dump(exif_dict)
        
        print(f"Writing {img_data['dest']}...")
        os.makedirs(os.path.dirname(img_data["dest"]), exist_ok=True)
        img.save(img_data["dest"], format="WEBP", exif=exif_bytes, quality=90)
        print(f"Saved {img_data['dest']}")

if __name__ == '__main__':
    add_exif_to_webp()
