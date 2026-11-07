import json
from pathlib import Path
r=Path(__file__).resolve().parents[1]
def test_index():
 data=json.loads((r/'source-index.json').read_text(encoding='utf8'))
 assert isinstance(data.get('items'),list) and len(data['items'])>=40
def test_files():
 for n in ('index.html','app.js','guide.js','hub.js','source-index.js','local-updates.js','sw.js','manifest.webmanifest'):
  assert (r/n).is_file()
