#!/usr/bin/env python3
"""Embed title, description, keywords, copyright, and creator metadata in gallery images."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

try:
    import piexif
    from PIL import Image
except ImportError:
    print("Installing piexif and Pillow...", file=sys.stderr)
    subprocess.check_call([sys.executable, "-m", "pip", "install", "piexif", "Pillow", "-q"])
    import piexif
    from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PHOTOS_JS = ROOT / "photos.js"

PHOTO_CREATOR = "Ivan Perez Avellaneda"
PHOTO_COPYRIGHT = "Copyright Ivan Perez Avellaneda"


def load_photo_albums() -> list[dict]:
    node_script = """
const fs = require("fs");
const vm = require("vm");
const photosJs = fs.readFileSync(process.argv[1], "utf8");
const sandbox = {};
vm.runInNewContext(
  photosJs.split("function renderPhotoAlbums")[0] + "\\nthis.photoAlbums = photoAlbums;",
  sandbox
);
process.stdout.write(JSON.stringify(sandbox.photoAlbums));
"""
    result = subprocess.check_output(
        ["node", "-e", node_script, str(PHOTOS_JS)],
        cwd=ROOT,
        text=True,
    )
    return json.loads(result)


def get_photo_metadata(photo: dict, album: dict) -> dict[str, str]:
    title = photo.get("title") or f"{photo['alt']} - {album['title']}"
    description = photo.get("description") or f"{photo['alt']} at {album['title']}"
    keywords = photo.get("keywords") or album.get("keywords", "Ivan Perez Avellaneda")
    creator = photo.get("creator", PHOTO_CREATOR)
    copyright_text = photo.get("copyright", PHOTO_COPYRIGHT)
    return {
        "title": title,
        "description": description,
        "keywords": keywords,
        "creator": creator,
        "copyright": copyright_text,
    }


def xp_text(value: str) -> bytes:
    return (value + "\0").encode("utf-16le")


def build_exif(metadata: dict) -> bytes:
    zeroth_ifd = {
        piexif.ImageIFD.ImageDescription: metadata["description"].encode("utf-8"),
        piexif.ImageIFD.Artist: metadata["creator"].encode("utf-8"),
        piexif.ImageIFD.Copyright: metadata["copyright"].encode("utf-8"),
        piexif.ImageIFD.XPTitle: xp_text(metadata["title"]),
        piexif.ImageIFD.XPSubject: xp_text(metadata["description"]),
        piexif.ImageIFD.XPKeywords: xp_text(metadata["keywords"]),
        piexif.ImageIFD.XPAuthor: xp_text(metadata["creator"]),
        piexif.ImageIFD.XPComment: xp_text(metadata["description"]),
    }
    exif_dict = {"0th": zeroth_ifd, "Exif": {}, "GPS": {}, "1st": {}, "thumbnail": None}
    return piexif.dump(exif_dict)


def embed_metadata(image_path: Path, metadata: dict) -> None:
    exif_bytes = build_exif(metadata)
    suffix = image_path.suffix.lower()

    if suffix in {".jpg", ".jpeg"}:
        image = Image.open(image_path)
        if image.mode not in ("RGB", "L"):
            image = image.convert("RGB")
        image.save(image_path, exif=exif_bytes, quality=95)
        return

    if suffix == ".png":
        from PIL import PngImagePlugin

        pnginfo = PngImagePlugin.PngInfo()
        pnginfo.add_text("Title", metadata["title"])
        pnginfo.add_text("Description", metadata["description"])
        pnginfo.add_text("Keywords", metadata["keywords"])
        pnginfo.add_text("Author", metadata["creator"])
        pnginfo.add_text("Copyright", metadata["copyright"])
        image = Image.open(image_path)
        image.save(image_path, pnginfo=pnginfo)
        return

    raise ValueError(f"Unsupported image format: {image_path}")


def main() -> None:
    albums = load_photo_albums()
    updated = 0

    for album in albums:
        for photo in album["images"]:
            image_path = ROOT / "img" / album["folder"] / photo["file"]
            if not image_path.exists():
                print(f"Skipping missing file: {image_path}", file=sys.stderr)
                continue

            metadata = get_photo_metadata(photo, album)
            embed_metadata(image_path, metadata)
            updated += 1
            print(f"Updated metadata: {image_path.relative_to(ROOT)}")

    manifest = []
    for album in albums:
        for photo in album["images"]:
            metadata = get_photo_metadata(photo, album)
            manifest.append(
                {
                    "file": f"img/{album['folder']}/{photo['file']}",
                    **metadata,
                }
            )

    manifest_path = ROOT / "scripts" / "photo-metadata.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"\nUpdated {updated} images. Manifest written to {manifest_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
