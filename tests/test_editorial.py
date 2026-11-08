from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def test_editorial_page_is_included():
    html=(ROOT/'index.html').read_text(encoding='utf-8')
    build=(ROOT/'tools/build_site.py').read_text(encoding='utf-8')
    assert 'editorial-depth.js' in html and 'editorial-depth.js' in build
    assert html.index('taxonomy.js')<html.index('editorial-depth.js')<html.index('search-engine.js')
    text=(ROOT/'editorial-depth.js').read_text(encoding='utf-8')
    for phrase in ('geld:[','opvoeden:[','autisme:[', 'nieuws-wijkwijzer', 'loes-kinderschoenen'):
        assert phrase in text
