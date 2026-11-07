from pathlib import Path
import json,sys
r=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(r/'tools'))
import build_source_index as b
import refresh_updates as u
def test_feed_host():
 assert not b.url_allowed('http://127.0.0.1/',{'127.0.0.1'})
 assert b.url_allowed('https://www.enschede.nl/nieuws',{'www.enschede.nl'})
def test_source_seed():
 seed=json.loads((r/'source-index.seed.json').read_text(encoding='utf-8'))
 assert len(seed['items'])>=40
def test_rss_empty():
 assert u.rss(b'<rss><channel></channel></rss>',u.dt.date.today())==[]
