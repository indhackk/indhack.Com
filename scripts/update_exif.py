import piexif
from PIL import Image
from PIL.ExifTags import TAGS
import datetime
import os

def set_exif_data(image_path, title, date_str, lat, lon):
    try:
        img = Image.open(image_path)
        
        # Prepare Date
        # Expected format: "2026-01-20"
        dt = datetime.datetime.strptime(date_str, "%Y-%m-%d")
        exif_date = dt.strftime("%Y:%m:%d %H:%M:%S")

        # Prepare EXIF dict
        exif_dict = {"0th": {}, "Exif": {}, "GPS": {}, "1st": {}, "thumbnail": None}

        # 0th IFD
        exif_dict["0th"][piexif.ImageIFD.ImageDescription] = title.encode('utf-8')
        exif_dict["0th"][piexif.ImageIFD.DateTime] = exif_date.encode('utf-8')
        exif_dict["0th"][piexif.ImageIFD.Software] = b"Antigravity AI Content Engine"

        # Exif IFD
        exif_dict["Exif"][piexif.ExifIFD.DateTimeOriginal] = exif_date.encode('utf-8')
        exif_dict["Exif"][piexif.ExifIFD.DateTimeDigitized] = exif_date.encode('utf-8')

        # GPS IFD
        if lat and lon:
            def to_deg(value, loc):
                if value < 0:
                    loc_value = loc[0]
                else:
                    loc_value = loc[1]
                abs_value = abs(value)
                deg = int(abs_value)
                t1 = (abs_value - deg) * 60
                min = int(t1)
                sec = round((t1 - min) * 60, 5)
                return (loc_value, ((deg, 1), (min, 1), (int(sec * 100), 100)))

            lat_deg = to_deg(lat, (b'S', b'N'))
            lon_deg = to_deg(lon, (b'W', b'E'))

            exif_dict["GPS"][piexif.GPSIFD.GPSLatitudeRef] = lat_deg[0]
            exif_dict["GPS"][piexif.GPSIFD.GPSLatitude] = lat_deg[1]
            exif_dict["GPS"][piexif.GPSIFD.GPSLongitudeRef] = lon_deg[0]
            exif_dict["GPS"][piexif.GPSIFD.GPSLongitude] = lon_deg[1]

        exif_bytes = piexif.dump(exif_dict)
        img.save(image_path, exif=exif_bytes)
        print(f"Successfully updated EXIF for {image_path}")
    except Exception as e:
        print(f"Error updating EXIF for {image_path}: {e}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 5:
        print("Usage: python3 update_exif.py <img_path> <title> <date_y-m-d> <lat> <lon>")
    else:
        path = sys.argv[1]
        title = sys.argv[2]
        date = sys.argv[3]
        lat = float(sys.argv[4])
        lon = float(sys.argv[5])
        set_exif_data(path, title, date, lat, lon)
