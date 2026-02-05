
import sys
import argparse
from PIL import Image
import piexif
from datetime import datetime

def to_deg(value, loc):
    """convert decimal coordinates to degrees, munutes and seconds tuple
    Keyword arguments: value is float gps-value, loc is direction list ["S", "N"] or ["W", "E"]
    return: tuple like (33, 22, 11)
    """
    if value < 0:
        loc_value = loc[0]
    elif value > 0:
        loc_value = loc[1]
    else:
        loc_value = ""
    abs_value = abs(value)
    deg =  int(abs_value)
    t1 = (deg, 1)
    min = int((abs_value - deg) * 60)
    t2 = (min, 1)
    sec = round((abs_value - deg - min / 60) * 3600 * 100)
    t3 = (sec, 100)
    return (t1, t2, t3), loc_value


def process_image(input_path, output_path, title, keywords, lat, lng, date_str):
    print(f"Processing {input_path} -> {output_path}")
    
    # 1. Open and Optimize
    img = Image.open(input_path)
    # Resize max width 1920 (landscape)
    if img.size[0] > 1920:
        ratio = 1920 / img.size[0]
        new_size = (1920, int(img.size[1] * ratio))
        img = img.resize(new_size, Image.Resampling.LANCZOS)
    
    # Convert to RGB if RGBA
    if img.mode == 'RGBA':
        img = img.convert('RGB')

    # 2. Prepare EXIF
    # Date
    # date_str format: YYYY-MM-DD
    dt = datetime.strptime(date_str, "%Y-%m-%d")
    exif_date = dt.strftime("%Y:%m:%d %H:%M:%S")
    
    # GPS
    lat_deg = to_deg(lat, ["S", "N"])
    lng_deg = to_deg(lng, ["W", "E"])
    
    gps_ifd = {
        piexif.GPSIFD.GPSVersionID: (2, 0, 0, 0),
        piexif.GPSIFD.GPSLatitudeRef: lat_deg[1],
        piexif.GPSIFD.GPSLatitude: lat_deg[0],
        piexif.GPSIFD.GPSLongitudeRef: lng_deg[1],
        piexif.GPSIFD.GPSLongitude: lng_deg[0],
    }
    
    # 0th IFD for standard tags
    zeroth_ifd = {
        piexif.ImageIFD.Make: "IndHack Intelligence",
        piexif.ImageIFD.Model: "AI Generated",
        piexif.ImageIFD.ImageDescription: title.encode('utf-8'),
        piexif.ImageIFD.Software: "IndHack SEO Optimizer",
        piexif.ImageIFD.DateTime: exif_date.encode('utf-8'),
        # XPTitle, XPComment, XPKeywords are used by Windows but standard is ImageDescription
        # We can try to add keywords in ImageDescription or UserComment
    }
    
    exif_ifd = {
        piexif.ExifIFD.DateTimeOriginal: exif_date.encode('utf-8'),
        piexif.ExifIFD.UserComment: (b'\x00\x00\x00\x00' + (", ".join(keywords)).encode('utf-8')) # Header for ascii
    }

    exif_dict = {"0th": zeroth_ifd, "Exif": exif_ifd, "GPS": gps_ifd}
    exif_bytes = piexif.dump(exif_dict)
    
    # 3. Save
    img.save(output_path, "JPEG", quality=85, exif=exif_bytes)
    print("Saved with EXIF.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--title", default="")
    parser.add_argument("--keywords", default="")
    parser.add_argument("--lat", type=float, default=0.0)
    parser.add_argument("--lng", type=float, default=0.0)
    parser.add_argument("--date", default="2026-01-01")
    
    args = parser.parse_args()
    
    process_image(
        args.input, 
        args.output, 
        args.title, 
        args.keywords.split(","),
        args.lat,
        args.lng,
        args.date
    )
