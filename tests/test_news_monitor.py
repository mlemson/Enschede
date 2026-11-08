import importlib.util
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('monitor',ROOT/'tools/monitor_news.py')
m=importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

HTML='<main><span>05 november 2026</span><h1>Pathmos Beweegt</h1><p>Bewoners uit Pathmos ontmoetten elkaar op het plein. Kinderen konden dansen, voetballen en knutselen tijdens een mooie activiteit in de herfstvakantie.</p><h2>Nieuws & activiteiten</h2><p>Dit is een andere activiteit en hoort niet in het bericht.</p></main>'

def test_news_extract():
    article=m.extract(HTML)
    assert article['date']=='2026-11-05'
    assert article['hash']
    assert len(article['excerpt'].split())<=20
    assert 'andere activiteit' not in article['excerpt']

def test_news_urls():
    html='<a href="/nieuws-en-activiteiten/pathmos/">Pathmos</a><a href="https://example.com/nieuws-en-activiteiten/niet/">Niet</a>'
    assert m.candidate_links(html)==['https://www.sportaal.nl/nieuws-en-activiteiten/pathmos/']

def test_edited_news_is_loaded():
    assert 'nieuws-pathmos' in (ROOT/'news-editorial.js').read_text(encoding='utf-8')
