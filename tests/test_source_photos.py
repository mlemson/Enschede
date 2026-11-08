from pathlib import Path
import importlib.util
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('news_monitor',ROOT/'tools/monitor_news.py')
mod=importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
ARTICLE='https://www.sportaal.nl/nieuws-en-activiteiten/test/'
def test_own_photo_not_navigation_photo():
    html='<html><header><img src="/assets/logo.jpg"></header><h1>Artikel</h1><p>Een artikel</p><img src="/assets/echte-foto.jpg" width="1200"><h2>Nieuws & activiteiten</h2><img src="/assets/ander.jpg"></html>'
    assert mod.article_photo(html,ARTICLE)=='https://www.sportaal.nl/assets/echte-foto.jpg'
def test_no_photo_means_none():
    html='<html><h1>Artikel</h1><p>Tekst</p><h2>Nieuws & activiteiten</h2><img src="/assets/ander.jpg"></html>'
    assert mod.article_photo(html,ARTICLE) is None
def test_no_fabricated_pictures():
    assert "image:'assets/" not in (ROOT/'editorial-depth.js').read_text()
    assert "item.imageSource=item.url" in (ROOT/'news-editorial.js').read_text()
    assert "verifiedPhoto" in (ROOT/'hub.js').read_text()
