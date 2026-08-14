#!/usr/bin/env python3
"""Deterministic Fundepacifico brand-image pipeline.

Photographic outputs are AVIF. Social preview is JPEG; icons are PNG/ICO.
The three Home strip badges are intentionally not generated here: they are
versioned hand-authored SVG assets owned by the application pass.
"""

from __future__ import annotations

import argparse
import fnmatch
import hashlib
import json
import math
from pathlib import Path
import random
import re
import sys
from typing import Any, Callable

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps
import PIL


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "assets-src" / "portafolio"
HIRES_DIR = ROOT / "assets-src" / "portafolio-hires"
ASSET_DIR = ROOT / "public" / "assets"
BRANDING_DIR = ROOT / "public" / "branding"
SCRATCH_DIR = ROOT / "scratch" / "brand-assets"
LOCK_PATH = ROOT / "scripts" / "brand-assets.lock.json"
LOGO_PATH = BRANDING_DIR / "logo-fundepacifico-font.png"
FONT_PATH = ROOT / "assets-src" / "fonts" / "Outfit-Bold.ttf"
PIPELINE_VERSION = 5
KIB = 1024
ISOTYPE_BOX = (74, 2, 347, 249)
GUTTER = 8
BRAND = {
    "yellow": "#FEC806",
    "green": "#12A74B",
    "red": "#DC151A",
    "ink": "#4E2921",
}
PALETTES = {
    "tierra": {"black": "#2A1410", "mid": "#8C3A1E", "white": "#FEE3B4"},
    "selva": {"black": "#10251A", "mid": "#1E6B3A", "white": "#DFF3C9"},
    "brasa": {"black": "#2A0F0C", "mid": "#B0271E", "white": "#FEC806"},
}


def clamp(value: float, low: float, high: float) -> float:
    return max(low, min(high, value))


def make_s_curve() -> list[int]:
    # Smooth cubic contrast curve centered on middle gray, applied to L only.
    result = []
    for value in range(256):
        x = value / 255.0
        smooth = x * x * (3.0 - 2.0 * x)
        y = 0.72 * x + 0.28 * smooth
        result.append(round(clamp(y, 0.0, 1.0) * 255))
    return result


S_CURVE = make_s_curve()
NOISE_CACHE: dict[tuple[float, int], Image.Image] = {}


def slot(
    output: str,
    size: tuple[int, int],
    mode: str,
    sources: list[str],
    palette: str,
    *,
    quality: int,
    budget: int,
    anchors: list[tuple[float, float]] | None = None,
    weights: list[float] | None = None,
    vignette: float = 0.32,
    scrim: float = 0.0,
    grain: float = 2.2,
    color_bleed: float = 0.18,
) -> dict[str, Any]:
    return {
        "output": output,
        "size": size,
        "mode": mode,
        "sources": sources,
        "palette": palette,
        "quality": quality,
        "budget": budget,
        "anchors": anchors or [(0.5, 0.5)] * len(sources),
        "weights": weights,
        "vignette": vignette,
        "scrim": scrim,
        "grain": grain,
        "color_bleed": color_bleed,
        "app_ref": True,
    }


SLOTS: dict[str, dict[str, Any]] = {
    "pillar-vivienda-digna": slot(
        "pillar-vivienda-digna-1404x1976.avif", (1404, 1976), "single",
        ["vivienda-llaves"], "tierra", quality=45, budget=30 * KIB,
        anchors=[(0.53, 0.45)],
    ),
    "pillar-capacitacion-formacion": slot(
        "pillar-capacitacion-formacion-1404x1976.avif", (1404, 1976), "single",
        ["equipo-formacion"], "brasa", quality=45, budget=30 * KIB,
        anchors=[(0.52, 0.44)],
    ),
    "pillar-emprendimiento-agroindustria": slot(
        "pillar-emprendimiento-agroindustria-1404x1976.avif", (1404, 1976), "single",
        ["agro-vivero-mujer"], "selva", quality=45, budget=30 * KIB,
        anchors=[(0.48, 0.43)],
    ),
    "pillar-redes-apoyo": slot(
        "pillar-redes-apoyo-1404x1976.avif", (1404, 1976), "single",
        ["derechos-manos-grupo"], "selva", quality=45, budget=30 * KIB,
        anchors=[(0.5, 0.43)],
    ),
    "pillar-obras-civiles": slot(
        "pillar-obras-civiles-1404x1976.avif", (1404, 1976), "single",
        ["obras-pavimento"], "tierra", quality=45, budget=30 * KIB,
        anchors=[(0.5, 0.43)],
    ),
    "menu-que-hacemos": slot(
        "menu-what-we-do-1404x1976.avif", (1404, 1976), "single",
        ["artesania-taller"], "brasa", quality=45, budget=30 * KIB,
        anchors=[(0.5, 0.45)],
    ),
    "menu-quienes-somos": slot(
        "menu-about-1404x1976.avif", (1404, 1976), "single",
        ["evento-marimba"], "tierra", quality=45, budget=30 * KIB,
        anchors=[(0.5, 0.44)],
    ),
    "portafolio-cover": slot(
        "portafolio-cover-928x1240.avif", (928, 1240), "poster",
        ["manos-alzadas-valores"], "tierra", quality=55, budget=13 * KIB,
        anchors=[(0.5, 0.48)], vignette=0.32, grain=1.0,
    ),
    "gallery-panorama-01": slot(
        "gallery-panorama-01-3200x1656.avif", (3200, 1656), "strip_h",
        ["evento-marimba", "manglar-aereo", "nina-retrato"], "selva", quality=45,
        budget=68 * KIB, weights=[0.34, 0.34, 0.32],
        anchors=[(0.5, 0.47), (0.5, 0.46), (0.5, 0.44)], vignette=0.18, grain=1.8,
    ),
    "gallery-panorama-02": slot(
        "gallery-panorama-02-3200x1778.avif", (3200, 1778), "strip_h",
        ["derechos-manos-grupo", "palafitos-buenaventura"], "tierra",
        quality=45, budget=68 * KIB, weights=[0.55, 0.45],
        anchors=[(0.5, 0.44), (0.5, 0.46)], vignette=0.18, grain=1.8,
    ),
    "stats-institucional-desktop": slot(
        "stats-indicadores-desktop-2880x1620.avif", (2880, 1620), "strip_h",
        ["equipo-formacion", "artesania-taller"], "selva", quality=45, budget=76 * KIB,
        weights=[0.52, 0.48], anchors=[(0.5, 0.46), (0.5, 0.46)], vignette=0.18, grain=1.7,
    ),
    "stats-institucional-mobile": slot(
        "stats-indicadores-mobile-1560x2988.avif", (1560, 2988), "strip_v",
        ["equipo-formacion", "artesania-taller"], "selva", quality=42, budget=43 * KIB,
        weights=[0.6, 0.4], anchors=[(0.5, 0.42), (0.5, 0.48)], vignette=0.18, grain=1.5,
    ),
    "stats-legal-desktop": slot(
        "stats-reconocimiento-desktop-2880x1620.avif", (2880, 1620), "strip_h",
        ["velas-mujeres", "ninos-risa"], "brasa", quality=45, budget=76 * KIB,
        weights=[0.51, 0.49], anchors=[(0.5, 0.48), (0.5, 0.43)], vignette=0.18, grain=1.7,
    ),
    "stats-legal-mobile": slot(
        "stats-reconocimiento-mobile-1560x2988.avif", (1560, 2988), "strip_v",
        ["velas-mujeres", "ninos-risa"], "brasa", quality=42, budget=43 * KIB,
        weights=[0.6, 0.4], anchors=[(0.5, 0.45), (0.5, 0.43)], vignette=0.18, grain=1.5,
    ),
    "stats-programas-desktop": slot(
        "stats-programas-desktop-2880x1620.avif", (2880, 1620), "strip_h",
        ["cocina-alimentaria", "obras-pavimento"], "tierra", quality=45, budget=76 * KIB,
        weights=[0.48, 0.52], anchors=[(0.5, 0.45), (0.5, 0.47)], vignette=0.18, grain=1.7,
    ),
    "stats-programas-mobile": slot(
        "stats-programas-mobile-1560x2988.avif", (1560, 2988), "strip_v",
        ["cocina-alimentaria", "obras-pavimento"], "tierra", quality=42, budget=43 * KIB,
        weights=[0.6, 0.4], anchors=[(0.5, 0.43), (0.5, 0.46)], vignette=0.18, grain=1.5,
    ),
    "stats-territorio-desktop": slot(
        "stats-territorio-desktop-2880x1620.avif", (2880, 1620), "strip_h",
        ["palafitos-buenaventura", "manglar-aereo"], "selva", quality=45, budget=76 * KIB,
        weights=[0.52, 0.48], anchors=[(0.5, 0.46), (0.5, 0.47)], vignette=0.18, grain=1.7,
    ),
    "stats-territorio-mobile": slot(
        "stats-territorio-mobile-1560x2988.avif", (1560, 2988), "strip_v",
        ["palafitos-buenaventura", "manglar-aereo"], "selva", quality=42, budget=43 * KIB,
        weights=[0.6, 0.4], anchors=[(0.5, 0.44), (0.5, 0.48)], vignette=0.18, grain=1.5,
    ),
    "media-banner-compromiso": slot(
        "media-banner-compromiso-2560x1440.avif", (2560, 1440), "single",
        ["manos-alzadas-valores"], "brasa", quality=45, budget=65 * KIB,
        anchors=[(0.56, 0.34)], vignette=0.18, grain=1.7,
    ),
}


BRAND_OUTPUTS: dict[str, dict[str, Any]] = {
    "brand-isotype": {"output": "logo-fundepacifico-simbolo.png", "kind": "isotype", "app_ref": False},
    "favicon-32": {"output": "favicon-32.png", "kind": "favicon", "size": 32, "app_ref": True},
    "favicon-16": {"output": "favicon-16.png", "kind": "favicon", "size": 16, "app_ref": True},
    "favicon-ico": {"output": "favicon.ico", "kind": "favicon_ico", "app_ref": True},
    "apple-touch-icon": {"output": "apple-touch-icon-180.png", "kind": "app_icon", "size": 180, "background": "#FFF8EF", "scale": 0.72, "app_ref": True},
    "pwa-icon-192": {"output": "icon-192.png", "kind": "app_icon", "size": 192, "background": "#FFFFFF", "scale": 0.72, "app_ref": False},
    "pwa-icon-512": {"output": "icon-512.png", "kind": "app_icon", "size": 512, "background": "#FFFFFF", "scale": 0.72, "app_ref": False},
    "pwa-maskable-512": {"output": "icon-maskable-512.png", "kind": "app_icon", "size": 512, "background": "#FFF8EF", "scale": 0.60, "app_ref": False},
    "og-image": {"output": "og-image-1200x630.jpg", "kind": "og", "budget": 110 * KIB, "app_ref": True},
}


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def source_path(logical_id: str) -> Path:
    for directory in (HIRES_DIR, SOURCE_DIR):
        for suffix in (".jpeg", ".jpg", ".png", ".webp", ".tif", ".tiff"):
            candidate = directory / f"{logical_id}{suffix}"
            if candidate.is_file():
                return candidate
    raise FileNotFoundError(f"No source found for logical id: {logical_id}")


def derive_logo_palette() -> dict[str, str]:
    with Image.open(LOGO_PATH) as opened:
        rgba = opened.convert("RGBA")
        pixels = list(rgba.get_flattened_data() if hasattr(rgba, "get_flattened_data") else rgba.getdata())
    opaque = [(r, g, b) for r, g, b, a in pixels if a > 240]

    def most_common(predicate: Callable[[int, int, int], bool]) -> str:
        counts: dict[tuple[int, int, int], int] = {}
        for rgb in opaque:
            if predicate(*rgb):
                counts[rgb] = counts.get(rgb, 0) + 1
        if not counts:
            raise AssertionError("Logo palette bucket was empty")
        rgb = max(counts, key=counts.get)
        return "#%02X%02X%02X" % rgb

    measured = {
        "yellow": most_common(lambda r, g, b: r > 220 and 140 < g < 230 and b < 40),
        "green": most_common(lambda r, g, b: g > 120 and g > r * 2 and g > b * 1.5),
        "red": most_common(lambda r, g, b: r > 170 and g < 70 and b < 70),
        "ink": most_common(lambda r, g, b: 55 < r < 100 and 25 < g < 60 and 20 < b < 50),
    }
    assert measured == BRAND, f"Official logo palette changed: {measured} != {BRAND}"
    return measured


def load_rgb(path: Path) -> Image.Image:
    with Image.open(path) as opened:
        return ImageOps.exif_transpose(opened).convert("RGB")


def crop_to(
    im: Image.Image, target: tuple[int, int], anchor: tuple[float, float]
) -> tuple[Image.Image, float]:
    target_ar = target[0] / target[1]
    source_ar = im.width / im.height
    if source_ar > target_ar:
        crop_h = im.height
        crop_w = max(1, round(crop_h * target_ar))
    else:
        crop_w = im.width
        crop_h = max(1, round(crop_w / target_ar))
    left = round((im.width - crop_w) * clamp(anchor[0], 0.0, 1.0))
    top = round((im.height - crop_h) * clamp(anchor[1], 0.0, 1.0))
    left = int(clamp(left, 0, im.width - crop_w))
    top = int(clamp(top, 0, im.height - crop_h))
    cropped = im.crop((left, top, left + crop_w, top + crop_h))
    upscale = max(target[0] / crop_w, target[1] / crop_h)
    return cropped, upscale


def treat(
    im: Image.Image,
    target: tuple[int, int],
    palette: str,
    anchor: tuple[float, float],
    color_bleed: float = 0.18,
) -> tuple[Image.Image, float]:
    # Load-bearing order: native crop -> native pre-blur -> upscale -> unsharp
    # -> exposure normalize -> S-curve luminance -> duotone -> color bleed.
    cropped, upscale = crop_to(im, target, anchor)
    radius = clamp(0.25 * (upscale - 1.0), 0.0, 1.2)
    if radius:
        cropped = cropped.filter(ImageFilter.GaussianBlur(radius))
    resized = cropped.resize(target, Image.Resampling.LANCZOS)
    resized = resized.filter(
        ImageFilter.UnsharpMask(
            radius=clamp(1.6 + 0.5 * upscale, 1.6, 4.0), percent=70, threshold=3
        )
    )
    luminance = ImageOps.autocontrast(ImageOps.grayscale(resized), cutoff=(1, 1))
    luminance = luminance.point(S_CURVE)
    colors = PALETTES[palette]
    duo = ImageOps.colorize(
        luminance,
        black=colors["black"],
        white=colors["white"],
        mid=colors["mid"],
        blackpoint=8,
        whitepoint=245,
        midpoint=124,
    )
    return Image.blend(duo, resized, color_bleed), upscale


def panel_widths(total: int, count: int, weights: list[float] | None) -> list[int]:
    available = total - GUTTER * (count - 1)
    normalized = weights or [1 / count] * count
    scale = sum(normalized)
    widths = [round(available * weight / scale) for weight in normalized]
    widths[-1] += available - sum(widths)
    return widths


def single(spec: dict[str, Any]) -> tuple[Image.Image, list[float]]:
    image = load_rgb(source_path(spec["sources"][0]))
    treated, upscale = treat(
        image, tuple(spec["size"]), spec["palette"], tuple(spec["anchors"][0]), spec["color_bleed"]
    )
    return treated, [upscale]


def strip_h(spec: dict[str, Any]) -> tuple[Image.Image, list[float]]:
    width, height = spec["size"]
    widths = panel_widths(width, len(spec["sources"]), spec.get("weights"))
    canvas = Image.new("RGB", (width, height), BRAND["yellow"])
    x = 0
    upscales = []
    for logical_id, panel_width, anchor in zip(spec["sources"], widths, spec["anchors"]):
        panel, upscale = treat(
            load_rgb(source_path(logical_id)), (panel_width, height), spec["palette"], tuple(anchor), spec["color_bleed"]
        )
        canvas.paste(panel, (x, 0))
        x += panel_width + GUTTER
        upscales.append(upscale)
    return canvas, upscales


def strip_v(spec: dict[str, Any]) -> tuple[Image.Image, list[float]]:
    width, height = spec["size"]
    heights = panel_widths(height, len(spec["sources"]), spec.get("weights"))
    canvas = Image.new("RGB", (width, height), BRAND["yellow"])
    y = 0
    upscales = []
    for logical_id, panel_height, anchor in zip(spec["sources"], heights, spec["anchors"]):
        panel, upscale = treat(
            load_rgb(source_path(logical_id)), (width, panel_height), spec["palette"], tuple(anchor), spec["color_bleed"]
        )
        canvas.paste(panel, (0, y))
        y += panel_height + GUTTER
        upscales.append(upscale)
    return canvas, upscales


def font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    if FONT_PATH.is_file():
        return ImageFont.truetype(str(FONT_PATH), size=size)
    return ImageFont.load_default(size=size)


def isotipo_native() -> Image.Image:
    with Image.open(LOGO_PATH) as opened:
        logo = opened.convert("RGBA")
    return logo.crop(ISOTYPE_BOX)


def contain_rgba(im: Image.Image, box: tuple[int, int], scale: float = 1.0) -> Image.Image:
    max_w = max(1, round(box[0] * scale))
    max_h = max(1, round(box[1] * scale))
    ratio = min(max_w / im.width, max_h / im.height)
    return im.resize((round(im.width * ratio), round(im.height * ratio)), Image.Resampling.LANCZOS)


def poster(spec: dict[str, Any]) -> tuple[Image.Image, list[float]]:
    width, height = spec["size"]
    canvas = Image.new("RGB", (width, height), BRAND["ink"])
    band_y = round(height * 0.55)
    photo_h = height - band_y + 72
    photo, upscale = treat(
        load_rgb(source_path(spec["sources"][0])), (width, photo_h), spec["palette"],
        tuple(spec["anchors"][0]), spec["color_bleed"]
    )
    photo_layer = Image.new("RGB", canvas.size, BRAND["ink"])
    photo_layer.paste(photo, (0, band_y - 24))
    mask = Image.new("L", canvas.size, 0)
    ImageDraw.Draw(mask).rectangle((0, band_y, width, height), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(24))
    canvas.paste(photo_layer, (0, 0), mask)

    draw = ImageDraw.Draw(canvas)
    mark = contain_rgba(isotipo_native(), (190, 172))
    canvas.paste(mark, (72, 58), mark)
    draw.text((72, 260), "PORTAFOLIO", font=font(72), fill="#FFF8EF")
    draw.text((72, 340), "DE SERVICIOS", font=font(72), fill=BRAND["yellow"])
    draw.text((72, 448), "2026", font=font(130), fill="#FFF8EF")
    draw.text((72, 590), "FUNDEPACÍFICO", font=font(43), fill="#FFF8EF")
    draw.text((72, 640), "ONG INTERNACIONAL", font=font(29), fill="#FFF8EF")
    footer = "onginternacional@fundepacifico.org  ·  Buenaventura, Valle"
    footer_bbox = draw.textbbox((0, 0), footer, font=font(20))
    footer_w = footer_bbox[2] - footer_bbox[0]
    chip = (48, height - 72, min(width - 48, 72 + footer_w), height - 27)
    draw.rounded_rectangle(chip, radius=10, fill=BRAND["ink"])
    draw.text((72, height - 61), footer, font=font(20), fill="#FFF8EF")
    return canvas, [upscale]


COMPOSITORS: dict[str, Callable[[dict[str, Any]], tuple[Image.Image, list[float]]]] = {
    "single": single,
    "strip_h": strip_h,
    "strip_v": strip_v,
    "poster": poster,
}


def apply_luminance_ramp(im: Image.Image, amount: float = 0.08) -> Image.Image:
    line = Image.new("L", (im.width, 1))
    line.putdata([
        round(255 * ((1.0 - amount / 2) + amount * x / max(1, im.width - 1)))
        for x in range(im.width)
    ])
    ramp = line.resize(im.size)
    return ImageChops.multiply(im, Image.merge("RGB", (ramp, ramp, ramp)))


def apply_vignette(im: Image.Image, strength: float) -> Image.Image:
    if strength <= 0:
        return im
    small = (256, max(64, round(256 * im.height / im.width)))
    cx, cy = (small[0] - 1) / 2, (small[1] - 1) / 2
    max_distance = math.hypot(cx, cy)
    values = []
    for y in range(small[1]):
        for x in range(small[0]):
            distance = math.hypot(x - cx, y - cy) / max_distance
            factor = 1.0 - strength * (distance ** 1.7)
            values.append(round(255 * clamp(factor, 0.0, 1.0)))
    mask = Image.new("L", small)
    mask.putdata(values)
    mask = mask.resize(im.size, Image.Resampling.BICUBIC)
    return ImageChops.multiply(im, Image.merge("RGB", (mask, mask, mask)))


def apply_scrim(im: Image.Image, strength: float) -> Image.Image:
    if strength <= 0:
        return im
    line = Image.new("L", (1, im.height))
    line.putdata([
        round(255 * strength * ((y / max(1, im.height - 1)) ** 1.6))
        for y in range(im.height)
    ])
    alpha = line.resize(im.size)
    black = Image.new("RGB", im.size, PALETTES["tierra"]["black"])
    return Image.composite(black, im, alpha)


def noise_tile(sigma: float, seed: int) -> Image.Image:
    key = (sigma, seed)
    if key not in NOISE_CACHE:
        rng = random.Random(seed)
        data = bytes(round(clamp(rng.gauss(128, sigma), 0, 255)) for _ in range(256 * 256))
        tile = Image.frombytes("L", (256, 256), data)
        NOISE_CACHE[key] = tile
    return NOISE_CACHE[key]


def apply_grain(im: Image.Image, sigma: float, seed: int) -> Image.Image:
    if sigma <= 0:
        return im
    tile = noise_tile(sigma, seed)
    noise = Image.new("L", im.size)
    for y in range(0, im.height, tile.height):
        for x in range(0, im.width, tile.width):
            noise.paste(tile, (x, y))
    noise_rgb = Image.merge("RGB", (noise, noise, noise))
    return Image.blend(im, noise_rgb, 0.035)


def finish_canvas(im: Image.Image, spec: dict[str, Any], seed: int) -> Image.Image:
    # All finishing is intentionally canvas-level, never panel-level.
    result = apply_luminance_ramp(im)
    result = apply_vignette(result, spec["vignette"])
    result = apply_scrim(result, spec["scrim"])
    result = apply_grain(result, spec["grain"], seed)
    return result


def spec_hash(spec: dict[str, Any]) -> str:
    payload = {
        "pipeline": PIPELINE_VERSION,
        "pillow": PIL.__version__,
        "spec": spec,
        "palettes": PALETTES,
        "brand": BRAND,
    }
    return sha256_bytes(json.dumps(payload, sort_keys=True, separators=(",", ":")).encode())


def source_hashes(ids: list[str]) -> list[str]:
    return [sha256_bytes(source_path(logical_id).read_bytes()) for logical_id in ids]


def output_record(
    path: Path,
    params_sha: str,
    inputs: list[str],
    upscales: list[float],
    encoded_quality: int | None = None,
) -> dict[str, Any]:
    data = path.read_bytes()
    return {
        "source_sha256": inputs,
        "params_sha256": params_sha,
        "out_sha256": sha256_bytes(data),
        "out_bytes": len(data),
        "pillow_version": PIL.__version__,
        "upscale": [round(value, 3) for value in upscales],
        "encoded_quality": encoded_quality,
    }


def save_avif(im: Image.Image, path: Path, quality: int, budget: int) -> int:
    path.parent.mkdir(parents=True, exist_ok=True)
    effective = quality
    while True:
        im.save(path, "AVIF", quality=effective, speed=6, subsampling="4:2:0")
        if path.stat().st_size <= budget or effective <= 20:
            return effective
        effective -= 1


def build_photo_slot(slot_id: str, spec: dict[str, Any]) -> tuple[Path, dict[str, Any]]:
    canvas, upscales = COMPOSITORS[spec["mode"]](spec)
    seed = int(hashlib.sha256(slot_id.encode()).hexdigest()[:8], 16)
    canvas = finish_canvas(canvas, spec, seed)
    output = ASSET_DIR / spec["output"]
    effective_quality = save_avif(canvas, output, spec["quality"], spec["budget"])
    inputs = source_hashes(spec["sources"])
    return output, output_record(output, spec_hash(spec), inputs, upscales, effective_quality)


def centered_mark(size: int, background: str | None, scale: float) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), background or (0, 0, 0, 0))
    mark = contain_rgba(isotipo_native(), (size, size), scale=scale)
    canvas.paste(mark, ((size - mark.width) // 2, (size - mark.height) // 2), mark)
    return canvas


def favicon(size: int) -> Image.Image:
    scale = 4
    canvas = Image.new("RGBA", (size * scale, size * scale), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    inset = max(scale, round(size * scale * 0.04))
    draw.rounded_rectangle(
        (inset, inset, size * scale - inset - 1, size * scale - inset - 1),
        radius=round(size * scale * 0.22), fill=BRAND["ink"]
    )
    mark = contain_rgba(isotipo_native(), (size * scale, size * scale), scale=0.78)
    canvas.paste(mark, ((canvas.width - mark.width) // 2, (canvas.height - mark.height) // 2), mark)
    return canvas.resize((size, size), Image.Resampling.LANCZOS)


def og_image() -> Image.Image:
    base, _ = treat(
        load_rgb(source_path("manos-alzadas-valores")), (1200, 630), "brasa", (0.57, 0.37), 0.18
    )
    base = apply_vignette(base, 0.26)
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    for x in range(720):
        alpha = round(205 * (1 - x / 720) ** 1.4)
        overlay_draw.line((x, 0, x, 630), fill=(42, 15, 12, alpha))
    base = Image.alpha_composite(base.convert("RGBA"), overlay)
    mark = centered_mark(176, "#FFF8EF", 0.70)
    base.paste(mark, (66, 58), mark)
    draw = ImageDraw.Draw(base)
    draw.text((66, 270), "Fundepacífico", font=font(66), fill="#FFF8EF")
    draw.text((66, 346), "ONG Internacional", font=font(40), fill=BRAND["yellow"])
    draw.text((66, 414), "Buenaventura, Valle del Cauca", font=font(28), fill="#FFF8EF")
    return base.convert("RGB")


def build_brand_output(slot_id: str, spec: dict[str, Any]) -> tuple[Path, dict[str, Any]]:
    output = BRANDING_DIR / spec["output"]
    output.parent.mkdir(parents=True, exist_ok=True)
    kind = spec["kind"]
    upscales: list[float] = []
    source_ids: list[str] = []
    effective_quality: int | None = None
    if kind == "isotype":
        centered_mark(512, None, 0.88).save(output, "PNG", optimize=True)
    elif kind == "favicon":
        favicon(spec["size"]).save(output, "PNG", optimize=True)
    elif kind == "favicon_ico":
        favicon(48).save(output, "ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    elif kind == "app_icon":
        centered_mark(spec["size"], spec["background"], spec["scale"]).convert("RGB").save(
            output, "PNG", optimize=True
        )
    elif kind == "og":
        source_ids = ["manos-alzadas-valores"]
        rendered = og_image()
        effective_quality = 82
        while True:
            rendered.save(
                output, "JPEG", quality=effective_quality, optimize=True,
                progressive=True, subsampling="4:2:0"
            )
            if output.stat().st_size <= spec["budget"] or effective_quality <= 60:
                break
            effective_quality -= 1
    else:
        raise ValueError(f"Unknown brand output kind: {kind}")
    inputs = [sha256_bytes(LOGO_PATH.read_bytes()), *source_hashes(source_ids)]
    params = spec_hash({"brand_output": spec})
    return output, output_record(output, params, inputs, upscales, effective_quality)


def load_lock() -> dict[str, Any]:
    if not LOCK_PATH.is_file():
        return {"pipeline_version": PIPELINE_VERSION, "slots": {}}
    try:
        return json.loads(LOCK_PATH.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {"pipeline_version": PIPELINE_VERSION, "slots": {}}


def should_build(
    slot_id: str,
    spec: dict[str, Any],
    output: Path,
    old: dict[str, Any] | None,
    inputs: list[str],
    params: str,
    force: bool,
) -> bool:
    if force or not output.is_file() or not old:
        return True
    if old.get("source_sha256") != inputs or old.get("params_sha256") != params:
        return True
    data = output.read_bytes()
    return old.get("out_sha256") != sha256_bytes(data) or old.get("out_bytes") != len(data)


def matches_only(slot_id: str, output: str, patterns: list[str]) -> bool:
    if not patterns:
        return True
    return any(fnmatch.fnmatch(slot_id, pattern) or fnmatch.fnmatch(output, pattern) for pattern in patterns)


def build_all(force: bool, patterns: list[str]) -> dict[str, Any]:
    derive_logo_palette()
    lock = load_lock()
    records = dict(lock.get("slots", {}))
    built = 0
    skipped = 0
    for slot_id, spec in SLOTS.items():
        if not matches_only(slot_id, spec["output"], patterns):
            continue
        output = ASSET_DIR / spec["output"]
        inputs = source_hashes(spec["sources"])
        params = spec_hash(spec)
        if should_build(slot_id, spec, output, records.get(slot_id), inputs, params, force):
            output, records[slot_id] = build_photo_slot(slot_id, spec)
            print(f"built   {slot_id:<38} {output.stat().st_size / 1024:7.1f} KB")
            built += 1
        else:
            print(f"cached  {slot_id}")
            skipped += 1

    logo_sha = sha256_bytes(LOGO_PATH.read_bytes())
    for slot_id, spec in BRAND_OUTPUTS.items():
        if not matches_only(slot_id, spec["output"], patterns):
            continue
        output = BRANDING_DIR / spec["output"]
        ids = ["manos-alzadas-valores"] if spec["kind"] == "og" else []
        inputs = [logo_sha, *source_hashes(ids)]
        params = spec_hash({"brand_output": spec})
        if should_build(slot_id, spec, output, records.get(slot_id), inputs, params, force):
            output, records[slot_id] = build_brand_output(slot_id, spec)
            print(f"built   {slot_id:<38} {output.stat().st_size / 1024:7.1f} KB")
            built += 1
        else:
            print(f"cached  {slot_id}")
            skipped += 1
    lock = {"pipeline_version": PIPELINE_VERSION, "slots": records}
    LOCK_PATH.write_text(json.dumps(lock, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"Build complete: {built} built, {skipped} cached")
    return lock


def report(lock: dict[str, Any]) -> bool:
    print("\nAsset byte report")
    print(f"{'slot':38} {'bytes':>10} {'budget':>10} {'status':>8}")
    print("-" * 70)
    total = 0
    budgeted_total = 0
    total_budget = 0
    failed = False
    all_specs = {**SLOTS, **BRAND_OUTPUTS}
    for slot_id, spec in all_specs.items():
        output_dir = ASSET_DIR if slot_id in SLOTS else BRANDING_DIR
        output = output_dir / spec["output"]
        size = output.stat().st_size if output.is_file() else 0
        budget = spec.get("budget")
        total += size
        if budget:
            budgeted_total += size
            total_budget += budget
            ok = 0 < size <= budget
            status = "OK" if ok else "OVER"
            failed |= not ok
            budget_label = f"{budget:,}"
        else:
            status = "OK" if size else "MISSING"
            failed |= not bool(size)
            budget_label = "—"
        print(f"{slot_id:38} {size:10,} {budget_label:>10} {status:>8}")
    print("-" * 70)
    print(f"{'BUDGETED TOTAL':38} {budgeted_total:10,} {total_budget:10,} {'FAIL' if failed else 'OK':>8}")
    print(f"{'ALL OUTPUTS':38} {total:10,} {'—':>10} {'OK' if not failed else 'FAIL':>8}")
    return not failed


def check_refs() -> bool:
    files = list((ROOT / "src").rglob("*")) + [ROOT / "index.html"]
    files = [path for path in files if path.is_file() and path.suffix in {".js", ".jsx", ".ts", ".tsx", ".html", ".css"}]
    combined = "\n".join(path.read_text(encoding="utf-8", errors="ignore") for path in files)
    missing = []
    for spec in [*SLOTS.values(), *BRAND_OUTPUTS.values()]:
        if spec.get("app_ref") and spec["output"] not in combined:
            missing.append(spec["output"])
    old_refs = sorted(set(re.findall(
        r"/assets/[0-9a-f]{16,}[^\"'\s)}]*\.(?:avif|jpe?g|png|webp|mp4)",
        combined,
        re.I,
    )))
    if missing:
        print("Missing application references:")
        for name in missing:
            print(f"  - {name}")
    if old_refs:
        print("Legacy hashed /assets references remain:")
        for ref in old_refs:
            print(f"  - {ref}")
    if not missing and not old_refs:
        print("Reference check: all emitted application assets referenced; zero hashed asset names remain.")
        return True
    return False


def labeled_tile(image: Image.Image, width: int, height: int, lines: list[str]) -> Image.Image:
    tile = Image.new("RGB", (width, height), "#FFF8EF")
    preview_h = height - 78
    preview = image.copy()
    preview.thumbnail((width - 20, preview_h - 12), Image.Resampling.LANCZOS)
    tile.paste(preview, ((width - preview.width) // 2, 8))
    draw = ImageDraw.Draw(tile)
    y = preview_h
    for index, line in enumerate(lines[:3]):
        draw.text((10, y + index * 21), line, font=font(15 if index else 17), fill=BRAND["ink"])
    return tile


def save_grid(tiles: list[Image.Image], columns: int, output: Path, gutter: int = 12) -> None:
    if not tiles:
        return
    rows = math.ceil(len(tiles) / columns)
    width = columns * tiles[0].width + (columns + 1) * gutter
    height = rows * tiles[0].height + (rows + 1) * gutter
    sheet = Image.new("RGB", (width, height), BRAND["ink"])
    for index, tile_image in enumerate(tiles):
        x = gutter + (index % columns) * (tile_image.width + gutter)
        y = gutter + (index // columns) * (tile_image.height + gutter)
        sheet.paste(tile_image, (x, y))
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, "PNG", optimize=True)


def contact_sheet_sources() -> Path:
    tiles = []
    for logical_id in sorted({source for spec in SLOTS.values() for source in spec["sources"]}):
        path = source_path(logical_id)
        image = load_rgb(path)
        sha1 = hashlib.sha1(path.read_bytes()).hexdigest()[:12]
        tiles.append(labeled_tile(image, 360, 330, [logical_id, f"{image.width}×{image.height} · sha1 {sha1}", path.parent.name]))
    output = SCRATCH_DIR / "contact-sheet-sources.png"
    save_grid(tiles, 4, output)
    return output


def contact_sheet_assets(lock: dict[str, Any]) -> Path:
    tiles = []
    for slot_id, spec in SLOTS.items():
        path = ASSET_DIR / spec["output"]
        image = load_rgb(path)
        record = lock.get("slots", {}).get(slot_id, {})
        upscale = "/".join(f"{x:.1f}×" for x in record.get("upscale", []))
        lines = [
            f"{slot_id} · {path.stat().st_size / 1024:.1f} KB",
            f"{image.width}×{image.height} · {spec['palette']} · {upscale}",
            " + ".join(spec["sources"]),
        ]
        tiles.append(labeled_tile(image, 470, 390, lines))
    output = SCRATCH_DIR / "contact-sheet-assets.png"
    save_grid(tiles, 3, output)
    return output


def display_preview(slot_id: str, spec: dict[str, Any], image: Image.Image) -> tuple[Image.Image, str]:
    if slot_id.startswith("pillar-"):
        target = (460, 650)
        label = "desktop 24vw"
    elif slot_id.startswith("menu-"):
        target = (307, 432)
        label = "desktop 16vw"
    elif slot_id == "portafolio-cover":
        target = (144, 192)
        label = "modal 144×192"
    elif "mobile" in slot_id:
        target = (390, 747)
        label = "mobile 390×747"
    elif slot_id.startswith("stats-"):
        target = (1920, 1080)
        label = "desktop 1920×1080"
    elif slot_id.startswith("gallery-"):
        target = (1805, round(1805 * image.height / image.width))
        label = "desktop 94vw"
    else:
        target = (1920, 1080)
        label = "desktop 100vw"
    return image.resize(target, Image.Resampling.LANCZOS), label


def object_cover_preview(image: Image.Image, target: tuple[int, int]) -> Image.Image:
    cropped, _ = crop_to(image, target, (0.5, 0.5))
    return cropped.resize(target, Image.Resampling.LANCZOS)


def contact_sheet_truescale(lock: dict[str, Any]) -> Path:
    width = 2048
    margin = 24
    rows: list[tuple[Image.Image, list[str]]] = []
    for slot_id, spec in SLOTS.items():
        path = ASSET_DIR / spec["output"]
        preview, label = display_preview(slot_id, spec, load_rgb(path))
        if preview.width > width - margin * 2:
            preview.thumbnail((width - margin * 2, preview.height), Image.Resampling.LANCZOS)
        record = lock.get("slots", {}).get(slot_id, {})
        ups = "/".join(f"{x:.1f}×" for x in record.get("upscale", []))
        rows.append((preview, [f"{slot_id} · {label}", f"upscale {ups} · {spec['palette']} · {path.stat().st_size / 1024:.1f} KB"]))
        if slot_id.startswith("pillar-"):
            rows.append((
                object_cover_preview(load_rgb(path), (367, 320)),
                [
                    f"{slot_id} · WhatWeDo mobile 94vw × h-80",
                    f"object-cover centrado · upscale {ups} · 367×320",
                ],
            ))
    total_height = margin + sum(image.height + 82 + margin for image, _ in rows)
    sheet = Image.new("RGB", (width, total_height), "#FFF8EF")
    draw = ImageDraw.Draw(sheet)
    y = margin
    for image, lines in rows:
        x = (width - image.width) // 2
        sheet.paste(image, (x, y))
        y += image.height + 10
        draw.text((margin, y), lines[0], font=font(24), fill=BRAND["ink"])
        draw.text((margin, y + 32), lines[1], font=font(18), fill=BRAND["ink"])
        y += 72 + margin
    output = SCRATCH_DIR / "contact-sheet-truescale.png"
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, "PNG", optimize=True)
    return output


def contact_sheets(lock: dict[str, Any]) -> list[Path]:
    outputs = [contact_sheet_sources(), contact_sheet_assets(lock), contact_sheet_truescale(lock)]
    print("\nContact sheets:")
    for output in outputs:
        print(f"  {output}")
    return outputs


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--force", action="store_true", help="Rebuild even when lock hashes match")
    parser.add_argument("--only", action="append", default=[], metavar="GLOB", help="Build matching slot id/output (repeatable)")
    parser.add_argument("--report", action="store_true", help="Print byte budgets; fail when exceeded")
    parser.add_argument("--contact-sheet", action="store_true", help="Write the three QA contact sheets")
    parser.add_argument("--check-refs", action="store_true", help="Verify src/index references and legacy hash removal")
    args = parser.parse_args()

    lock = build_all(args.force, args.only)
    ok = True
    if args.contact_sheet:
        contact_sheets(lock)
    if args.report:
        ok = report(lock) and ok
    if args.check_refs:
        ok = check_refs() and ok
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main()
