import os
from PIL import Image
import piexif

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

def process_one_image(src, dest, desc, keywords):
    print(f"Processing {src} -> {dest}")
    if not os.path.exists(src):
        print(f"Error: {src} not found.")
        return
        
    img = Image.open(src)
    if img.mode != 'RGB':
        img = img.convert('RGB')
        
    # Coordinates for Nice, France (43.7102° N, 7.2620° E)
    lat = 43.7102
    lng = 7.2620
    lat_deg = to_deg(lat, ["S", "N"])
    lng_deg = to_deg(lng, ["W", "E"])

    exif_ifd = {
        piexif.ImageIFD.ImageDescription: desc.encode('utf-8'),
        piexif.ImageIFD.Software: b"IndHack Premium Designer",
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
    
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    img.save(dest, format="WEBP", exif=exif_bytes, quality=90)
    print(f"Saved {dest}")

if __name__ == '__main__':
    src = "/Users/indiana/.gemini/antigravity/brain/515e0a34-e14e-42fb-a739-975b00494138/prix_creation_site_2026_premium_1772235627201.png"
    dest = "/Users/indiana/Desktop/indhack.Com/public/images/blog/prix-creation-site-internet-2026.webp"
    desc = "Grille de prix création site internet 2026, Premium Workspace, Nice"
    keywords = "Prix, Création site web, Budget, SEO, Nice"
    process_one_image(src, dest, desc, keywords)
