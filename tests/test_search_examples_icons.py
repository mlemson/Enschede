from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def test_home_search_examples_without_autisme():
    html=(ROOT/'index.html').read_text(encoding='utf-8')
    assert 'Zoek bijvoorbeeld geld, wonen, vervoer' in html
    assert 'data-search-example="wonen">Wonen' in html
    assert 'data-search-example="autisme"' not in html
    assert 'Zoek bijvoorbeeld autisme' not in html
def test_mobile_icons_use_svg_not_emoji():
    html=(ROOT/'index.html').read_text(encoding='utf-8')
    data=(ROOT/'knowledge.js').read_text(encoding='utf-8')
    guide=(ROOT/'guide.js').read_text(encoding='utf-8')
    assert '☺' not in html and '☺' not in data
    assert '☕' not in html and '☕' not in data
    assert '<use href="#i-users"/>' in html
    assert '<use href="#i-calendar"/>' in html
    assert "icon:'users'" in data and "icon:'calendar'" in data
    assert 'visualIcon(' in guide
def test_autisme_still_searchable():
    guide=(ROOT/'guide.js').read_text(encoding='utf-8')
    data=(ROOT/'local-extensions.js').read_text(encoding='utf-8')
    assert "byId.get('autisme')" in guide
    assert "id:'autisme'" in data
