#!/usr/bin/env python3
"""Extract the approved Fundepacifico photographs from the 2026 portfolio.

The DOCX is only an ingestion source.  Builds consume the versioned files in
assets-src/portafolio, so CI never depends on a contributor's OneDrive path.
"""

from __future__ import annotations

import argparse
import hashlib
from datetime import datetime, timezone
from pathlib import Path
import zipfile


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = REPO_ROOT / "assets-src" / "portafolio"

# Logical id -> canonical DOCX member and verified SHA-1.  Several members in
# the source archive are byte-for-byte duplicates; only these approved photos
# are extracted, under stable human-readable names.
SOURCES = {
    "manos-alzadas-valores": ("image45.jpeg", "4c9db18c65e53ae74273ba2cf273b195d766ef22"),
    "agro-vivero-mujer": ("image42.jpeg", "384948999690b60260abbb6acfe8c7d41a16e4b5"),
    "derechos-manos-grupo": ("image9.jpeg", "940023b7d0cb97bfeb81723844582193e21d22d7"),
    "obras-pavimento": ("image40.jpeg", "43c423eaa0083936c9ad0938f3f8005be982f09e"),
    "equipo-formacion": ("image8.jpeg", "0e95d90599523b9da299d3f2027add653a5cfdca"),
    "evento-marimba": ("image31.jpeg", "599b75a9b23ba68069af38029ef7cf7bbd96b0be"),
    "velas-mujeres": ("image55.jpeg", "4d79ffed8906d70d10d4f044cce4d795412008af"),
    "artesania-taller": ("image33.jpeg", "3e91c2ce41d33155295a57d17bc5f7012864841a"),
    "palafitos-buenaventura": ("image57.jpeg", "743d10fbc797f010ef6f47608e5ce9120815e870"),
    "cocina-alimentaria": ("image36.jpeg", "3b552ce1c86937f9f867f1e5c952f5381c239cbc"),
    "ninos-risa": ("image56.jpeg", "f1153abdc866d3d52ae3471035993d5c35716698"),
    "nina-retrato": ("image4.jpeg", "5567966edcdadc6669bd2393854034d09bd1d77d"),
    "manglar-aereo": ("image5.jpeg", "9c67f78935abde66edc575c9a127869fcd147029"),
    "vivienda-llaves": ("image22.jpeg", "90c93277c85a885c38a6ad45d3afa6c45debafe6"),
}


def digest(data: bytes, algorithm: str) -> str:
    return hashlib.new(algorithm, data).hexdigest()


def extract(docx: Path, output: Path) -> None:
    docx = docx.resolve()
    if not docx.is_file():
        raise SystemExit(f"DOCX not found: {docx}")

    archive_bytes = docx.read_bytes()
    docx_sha256 = digest(archive_bytes, "sha256")
    output.mkdir(parents=True, exist_ok=True)
    extracted: list[tuple[str, str, str, int]] = []
    seen_sha1: set[str] = set()

    with zipfile.ZipFile(docx) as archive:
        media = {
            Path(member).name: archive.read(member)
            for member in archive.namelist()
            if member.startswith("word/media/") and not member.endswith("/")
        }
        for logical_id, (member, expected_sha1) in SOURCES.items():
            try:
                data = media[member]
            except KeyError as exc:
                raise SystemExit(f"Missing word/media/{member} in {docx.name}") from exc
            actual_sha1 = digest(data, "sha1")
            if actual_sha1 != expected_sha1:
                raise SystemExit(
                    f"Unexpected content for {member}: {actual_sha1} != {expected_sha1}"
                )
            if actual_sha1 in seen_sha1:
                raise SystemExit(f"Approved source list contains duplicate content: {member}")
            seen_sha1.add(actual_sha1)
            filename = f"{logical_id}.jpeg"
            (output / filename).write_bytes(data)
            extracted.append((logical_id, member, actual_sha1, len(data)))

    timestamp = datetime.fromtimestamp(docx.stat().st_mtime, timezone.utc).isoformat()
    lines = [
        "# Fuentes del Portafolio Fundepac\u00edfico 2026",
        "",
        "Estas fotograf\u00edas se extrajeron del DOCX entregado por el cliente. El pipeline ",
        "usa el identificador l\u00f3gico de la primera columna y busca primero una sustituci\u00f3n ",
        "con el mismo nombre en `../portafolio-hires/`.",
        "",
        f"- Archivo de origen: `{docx.name}`",
        f"- SHA-256 del DOCX: `{docx_sha256}`",
        f"- Fecha del archivo (UTC): `{timestamp}`",
        f"- Extracci\u00f3n reproducible: `python scripts/extract_portafolio_media.py --docx \"{docx}\"`",
        "",
        "| id l\u00f3gico | miembro DOCX | SHA-1 | bytes |",
        "|---|---|---:|---:|",
    ]
    lines.extend(
        f"| `{logical_id}` | `word/media/{member}` | `{sha1}` | {size:,} |"
        for logical_id, member, sha1, size in extracted
    )
    lines.extend(
        [
            "",
            "Solo se versionan las 13 fotograf\u00edas reales de Fundepac\u00edfico y la fotograf\u00eda ",
            "de vivienda incluida en el portafolio. Logos repetidos, marcas de agua, iconos y ",
            "stock descartado se omiten deliberadamente.",
            "",
        ]
    )
    (output / "SOURCES.md").write_text("\n".join(lines), encoding="utf-8")
    print(f"Extracted {len(extracted)} unique approved sources to {output}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--docx", required=True, type=Path, help="Path to the client DOCX")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    extract(args.docx, args.output)


if __name__ == "__main__":
    main()
