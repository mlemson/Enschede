#!/usr/bin/env python3
"""Dagelijkse controle van nieuwspagina's, zonder bezoekersdata en zonder AI."""
import datetime as dt
import hashlib
import json
import re
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.robotparser import RobotFileParser

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
FEED = ROOT / 'auto-updates.js'
REPORT = ROOT / 'data' / 'news-review.json'
SPORTAAL = 'https://www.sportaal.nl/nieuws-en-activiteiten/'
HEADERS = {'User-Agent': 'EnschedeDichtbijIndexer/1.0 (https://mlemson.github.io/Enschede/)'}
MONTHS = {'januari':1,'februari':2,'maart':3,'april':4,'mei':5,'juni':6,'juli':7,'augustus':8,'september':9,'oktober':10,'november':11,'december':12}
HOSTS = {'www.sportaal.nl','sportaal.nl','www.enschede.nl','enschede.nl','www.m-pact.nl','m-pact.nl','www.incluzioenschede.nl','incluzioenschede.nl'}

def allowed(url):
    try:
        p = urlparse(url)
        return p.scheme == 'https' and p.hostname in HOSTS and p.port in (None, 443) and not p.username and not p.password
    except (ValueError, TypeError):
        return False

def short(text, words=20):
    pieces = re.sub(r'\s+', ' ', text or '').strip().split()
    return ' '.join(pieces[:words]) + ('…' if len(pieces) > words else '')

def date_from(text):
    m = re.search(r'(\d{1,2})\s+(' + '|'.join(MONTHS) + r')\s+(20\d{2})', text, re.I)
    if not m:
        return None
    try:
        return dt.date(int(m[3]), MONTHS[m[2].lower()], int(m[1]))
    except ValueError:
        return None

def extract(html):
    soup = BeautifulSoup(html, 'html.parser')
    for n in soup.select('nav,footer,header,aside,form,script,style'):
        n.decompose()
    h1 = soup.find('h1')
    if not h1:
        return None
    title = h1.get_text(' ', strip=True)
    main = soup.select_one('main') or soup.body or soup
    visible = main.get_text(' ', strip=True)
    idx = visible.find(title)
    date = date_from(visible[max(0,idx-180):idx+len(title)+50] if idx >= 0 else visible[:260])
    paras = []
    for el in h1.next_elements:
        if getattr(el, 'name', None) in ('h2', 'h3') and any(x in el.get_text(' ',strip=True).lower() for x in ('nieuws & activiteiten','meer nieuws','lees ook')):
            break
        if getattr(el, 'name', None) == 'p':
            t = re.sub(r'\s+', ' ', el.get_text(' ',strip=True))
            if len(t) >= 45 and t not in paras:
                paras.append(t)
        if len(paras) >= 8:
            break
    if not paras:
        return None
    digest = hashlib.sha256((title + '\n' + '\n'.join(paras)).encode()).hexdigest()
    return {'title':title,'date':str(date) if date else None,'excerpt':short(paras[0]),'hash':digest}

def permitted(session, url, robots):
    host = urlparse(url).hostname
    if host not in robots:
        try:
            r = session.get('https://' + host + '/robots.txt', timeout=12, headers=HEADERS, allow_redirects=False)
            if r.status_code == 404:
                robots[host] = True
            elif r.status_code != 200:
                robots[host] = False
            else:
                p = RobotFileParser()
                p.parse(r.text.splitlines())
                robots[host] = p
        except requests.RequestException:
            robots[host] = False
    p = robots[host]
    return p if isinstance(p, bool) else p.can_fetch(HEADERS['User-Agent'],url)

def fetch(session, url, robots):
    if not allowed(url) or not permitted(session,url,robots):
        return None, 'geblokkeerd'
    try:
        r = session.get(url, headers=HEADERS, timeout=17, allow_redirects=False)
        r.raise_for_status()
        if r.is_redirect or len(r.content)>2_000_000 or 'html' not in r.headers.get('content-type','text/html').lower():
            return None, 'ongeldig'
        return r.text, None
    except requests.RequestException:
        return None, 'onbereikbaar'

def is_sportaal_news(html):
    """Sportaal mengt activiteiten en nieuws op één overzicht: neem alleen nieuws over."""
    soup = BeautifulSoup(html, 'html.parser')
    h1 = soup.find('h1')
    if not h1:
        return False
    main = soup.select_one('main') or soup.body or soup
    text = main.get_text(' ', strip=True)
    idx = text.find(h1.get_text(' ',strip=True))
    labels = re.findall(r'\b(nieuws|activiteit)\b',text[max(0,idx-140):idx].casefold()) if idx>=0 else []
    return bool(labels and labels[-1] == 'nieuws')


def candidate_links(html):
    soup = BeautifulSoup(html, 'html.parser')
    urls = []
    for a in soup.select('a[href]'):
        url = urljoin(SPORTAAL, a.get('href','')).split('?',1)[0].split('#',1)[0]
        if allowed(url) and re.match(r'^/nieuws-en-activiteiten/[^/]+/?$',urlparse(url).path) and url not in urls:
            urls.append(url)
    return urls[:18]

def parse_variable(path):
    try:
        text = path.read_text(encoding='utf-8')
        return json.JSONDecoder().raw_decode(text.split('=',1)[1].lstrip())[0]
    except (ValueError, IndexError, FileNotFoundError):
        return {}

def monitor(session, today, data):
    robots = {}
    old = data.get('newsChecks', {})
    checks = {}
    discovered = []
    cache = {}
    html, err = fetch(session, SPORTAAL, robots)
    if html:
        for url in candidate_links(html):
            page, problem = fetch(session, url, robots)
            cache[url] = (page, problem)
            article = extract(page) if page and is_sportaal_news(page) else None
            if article and article['date'] and today-dt.timedelta(days=65)<=dt.date.fromisoformat(article['date'])<=today:
                discovered.append({'id':'sportaal-'+hashlib.sha256(url.encode()).hexdigest()[:12],'url':url,
                    'source':'Sportaal','title':article['title'],'date':article['date'],
                    'summary':'Nieuws van Sportaal over sporten en bewegen in Enschede.',
                    'description':'Uit de bron: '+article['excerpt'],'area':'Hele stad','category':'Sport','topics':['sport']})
    curated = parse_variable(ROOT/'local-updates.js').get('news',[])
    urls = [n['url'] for n in curated if allowed(n.get('url','')) and urlparse(n['url']).path not in ('/','/nieuws','/nieuws/')]
    for url in dict.fromkeys(urls):
        page, problem = cache.get(url, (None, None))
        if page is None and problem is None:
            page, problem = fetch(session, url, robots)
        previous = old.get(url, {})
        article = extract(page) if page else None
        if not article:
            checks[url] = {**previous, 'status':problem or 'geen artikeltekst','attemptedAt':str(today)}
            continue
        newly_changed = bool(previous.get('hash') and previous['hash'] != article['hash'])
        needs_review = bool(previous.get('changed') or newly_changed)
        checks[url] = {'hash':article['hash'],'lastChecked':str(today),'status':'ok',
            'changed':needs_review,'changedOn':str(today) if newly_changed else previous.get('changedOn')}
    merged = {n['url']:n for n in data.get('news',[]) if n.get('date') and n['date']>=str(today-dt.timedelta(days=65))}
    merged.update({n['url']:n for n in discovered})
    data['news'] = list(merged.values())[:60]
    data['newsChecks'] = checks
    data['checked'] = str(today)
    changed = [{'url':url,'changedOn':entry.get('changedOn')} for url,entry in checks.items() if entry.get('changed')]
    return data, changed

def main():
    data = parse_variable(FEED) or {'news':[],'events':[]}
    today = dt.datetime.now(dt.timezone.utc).date()
    data, changed = monitor(requests.Session(), today, data)
    FEED.write_text('window.ED_AUTO_UPDATES='+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
    REPORT.parent.mkdir(exist_ok=True)
    REPORT.write_text(json.dumps({'updatedAt':str(today),'changedSources':changed,
        'successfulChecks':sum(x.get('status')=='ok' for x in data['newsChecks'].values()),
        'failedChecks':sum(x.get('status')!='ok' for x in data['newsChecks'].values())},
        ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Nieuws gecontroleerd:',len(data['news']),'items,',len(changed),'gewijzigde bronnen')

if __name__ == '__main__':
    main()
