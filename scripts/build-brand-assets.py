"""Builds the favicon, app icons and social-share (Open Graph) image.

Usage:
    python scripts/build-brand-assets.py <fonts-dir>

<fonts-dir> must contain the Google Fonts variable TTFs:
    fraunces.ttf          (ofl/fraunces/Fraunces[SOFT,WONK,opsz,wght].ttf)
    fraunces-italic.ttf   (ofl/fraunces/Fraunces-Italic[SOFT,WONK,opsz,wght].ttf)
    jakarta.ttf           (ofl/plusjakartasans/PlusJakartaSans[wght].ttf)

Outputs (all in src/app, picked up automatically by Next.js):
    favicon.ico, icon.png, apple-icon.png, opengraph-image.jpg, opengraph-image.alt.txt
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "src" / "app"
FONTS = Path(sys.argv[1])

NAVY_950 = (0, 20, 46)
NAVY_900 = (0, 37, 82)
GOLD_300 = (248, 212, 127)
WHITE = (255, 255, 255)


def font(name, size, axes=None):
    f = ImageFont.truetype(str(FONTS / name), size)
    if axes:
        # Map named axes onto the font's own axis order
        order = [a["name"].decode() if isinstance(a["name"], bytes) else a["name"] for a in f.get_variation_axes()]
        defaults = [a["default"] for a in f.get_variation_axes()]
        values = [axes.get(n, d) for n, d in zip(order, defaults)]
        f.set_variation_by_axes(values)
    return f


# ---------------------------------------------------------------- icons
logo = Image.open(ROOT / "public" / "logo-pgccdc.png").convert("RGBA")
mark = logo.crop((0, 0, 52, logo.height))
mark = mark.crop(mark.getbbox())  # trim transparent edges


def icon(size, radius_ratio=0.22, pad_ratio=0.16):
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    bg = Image.new("RGBA", (size, size), (*WHITE, 255))
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), radius=int(size * radius_ratio), fill=255)
    canvas.paste(bg, (0, 0), mask)
    inner = int(size * (1 - 2 * pad_ratio))
    scale = inner / max(mark.size)
    m = mark.resize((max(1, round(mark.width * scale)), max(1, round(mark.height * scale))), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return canvas


# The source logo is only 105px tall, so icons stop at 192px to stay crisp
icon(192).save(APP / "icon.png")
# Apple icons are shown on a square tile; iOS applies its own rounding
apple = icon(180, radius_ratio=0, pad_ratio=0.14)
Image.alpha_composite(Image.new("RGBA", apple.size, (*WHITE, 255)), apple).convert("RGB").save(APP / "apple-icon.png")
icon(256, pad_ratio=0.12).save(APP / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

# ---------------------------------------------------------------- Open Graph image
W, H = 1200, 630
og = Image.new("RGB", (W, H), NAVY_900)

# Photo on the right, fading into navy on the left
photo = Image.open(ROOT / "src" / "assets" / "img" / "community-meeting.webp").convert("RGB")
ph_w = 760
scale = max(ph_w / photo.width, H / photo.height)
photo = photo.resize((round(photo.width * scale), round(photo.height * scale)), Image.LANCZOS)
left = int((photo.width - ph_w) * 0.35)
photo = photo.crop((left, (photo.height - H) // 2, left + ph_w, (photo.height - H) // 2 + H))
og.paste(photo, (W - ph_w, 0))

fade = Image.new("L", (W, 1))
for x in range(W):
    start, end = W - ph_w, W - ph_w + 420
    t = 0 if x <= start else min(1, (x - start) / (end - start))
    fade.putpixel((x, 0), int(255 * (1 - t) ** 1.6 * 0.98 + 255 * 0.0))
fade = fade.resize((W, H))
og = Image.composite(Image.new("RGB", (W, H), NAVY_900), og, fade)
# A soft blue glow, echoing the site's dark sections
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ImageDraw.Draw(glow).ellipse((-260, 260, 380, 900), fill=(0, 116, 178, 90))
og = Image.alpha_composite(og.convert("RGBA"), glow.filter(ImageFilter.GaussianBlur(120)))

d = ImageDraw.Draw(og)
white_logo = Image.open(ROOT / "public" / "logo-pgccdc-white.png").convert("RGBA")
white_logo = white_logo.resize((int(white_logo.width * 1.15), int(white_logo.height * 1.15)), Image.LANCZOS)
og.alpha_composite(white_logo, (72, 64))

eyebrow = font("jakarta.ttf", 19, {"Weight": 700})
x = 74
for ch in "FOR THE COMMUNITY. BY THE COMMUNITY.":
    d.text((x, 228), ch, font=eyebrow, fill=GOLD_300)
    x += d.textlength(ch, font=eyebrow) + 2.6  # letter-spacing

serif = font("fraunces.ttf", 86, {"Weight": 500, "Optical size": 96, "Softness": 0})
serif_it = font("fraunces-italic.ttf", 86, {"Weight": 500, "Optical size": 96, "Softness": 0})
d.text((70, 266), "Engagement.", font=serif, fill=WHITE)
d.text((70, 352), "Activism.", font=serif, fill=WHITE)
d.text((70, 438), "Service.", font=serif_it, fill=GOLD_300)

small = font("jakarta.ttf", 22, {"Weight": 500})
d.text((74, 562), "princegeorges-countycdc.org", font=small, fill=(255, 255, 255, 200))

og.convert("RGB").save(APP / "opengraph-image.jpg", quality=86, optimize=True, progressive=True)
(APP / "opengraph-image.alt.txt").write_text(
    "PGCCDC: Engagement. Activism. Service. Prince George's County Community Development Corporation",
    encoding="utf-8",
)
print("wrote favicon.ico, icon.png, apple-icon.png, opengraph-image.jpg")
