"""Create responsive delivery copies; original studio files are never modified."""
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'src' / 'assets'
OUTPUT = ROOT / 'public' / 'projects'
FOLDERS = {'likhon apartment': 'likhon-apartment', 'tm international office': 'tm-international-office', 'riaz haq bedroom': 'riaz-haq-bedroom', 'nazrul bedroom': 'nazrul-bedroom'}
GROUPS = {'3D': '3D visualization', 'CONSTRUCTION': 'Construction', 'BEFORE AFTER': 'Before & after', 'after hanover picture': 'Completed interior'}
manifest = {}
for folder, slug in FOLDERS.items():
    records = []
    for number, source in enumerate(sorted((SOURCE / folder).rglob('*.jpg')), 1):
        destination = OUTPUT / slug
        destination.mkdir(parents=True, exist_ok=True)
        with Image.open(source) as original:
            original = ImageOps.exif_transpose(original).convert('RGB')
            width, height = original.size
            for suffix, bound in [('', 1600), ('-small', 640)]:
                copy = original.copy()
                copy.thumbnail((bound, bound), Image.Resampling.LANCZOS)
                copy.save(destination / f'{number:02d}{suffix}.webp', 'WEBP', quality=82, method=6)
        records.append({'image': f'/projects/{slug}/{number:02d}.webp', 'source': source.relative_to(ROOT).as_posix(), 'group': GROUPS.get(source.parent.name, '3D visualization'), 'width': width, 'height': height})
    manifest[slug] = records
(ROOT / 'src' / 'data' / 'project-media.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
print(f'Prepared {sum(len(items) for items in manifest.values())} studio images in two responsive sizes.')
