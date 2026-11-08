import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def test_social_sources_are_available():
    cfg=json.loads((ROOT/'source-sites.json').read_text())
    labels={site['label'] for site in cfg['sites']}
    for name in ('Humanitas Twente – Enschede','Stichting 55+ Enschede','Ixta Noa – Enschede','Stichting Beien','Jij Maakt Enschede'):
        assert name in labels
    assert 'sociale_kaart' in cfg['feeds']
def test_directly_available_and_buildable():
    index=(ROOT/'index.html').read_text()
    builder=(ROOT/'tools/build_site.py').read_text()
    expansion=(ROOT/'source-expansion.js').read_text()
    assert 'source-expansion.js' in index and 'source-expansion.js' in builder
    assert index.index('source-index.js') < index.index('source-expansion.js') < index.index('search-engine.js')
    assert 'Humanitas' in expansion and 'Ixta Noa' in expansion
def test_curated_sources_and_exclusions():
    seed=json.loads((ROOT/'source-index.seed.json').read_text())
    ids=[item['id'] for item in seed['items']]
    assert len(ids)==len(set(ids))
    assert 'enschede-humanitas-thuisadministratie' in ids
    assert 'enschede-sociale-kaart-catalogus' in ids
    assert 'enschede-leergeld' in ids
    assert not any('suntwente.nl' in item.get('url','') for item in seed['items'])
