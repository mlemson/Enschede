from pathlib import Path
import shutil
r=Path(__file__).resolve().parents[1];d=r/'_site'
files=['index.html','styles.css','guide.css','hub.css','app.js','knowledge.js','content-dossiers.js','local-updates.js','local-extensions.js','taxonomy.js','editorial-depth.js','auto-updates.js','news-editorial.js','source-index.js','search-engine.js','guide.js','hub.js','manifest.webmanifest','sw.js']+[f'assets/{x}' for x in ['favicon.svg','enschede-stad.webp','activiteit.webp','ontmoeten.webp','samenwerken.webp','wandelen.webp']]
if d.exists():shutil.rmtree(d)
for p in files:
 source=r/p
 if not source.is_file():raise SystemExit(f'Ontbreekt: {p}')
 dest=d/p;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(source,dest)
(d/'.nojekyll').touch()
