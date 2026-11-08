#!/usr/bin/env python3
"""Bouw bronindex server-side voor Enschede dichtbij; geen bezoekersvragen versturen."""
import argparse, collections, datetime, json, re, time
from pathlib import Path
from urllib.parse import urlparse, urljoin, urlunparse
from urllib.robotparser import RobotFileParser
import requests
from bs4 import BeautifulSoup
ROOT=Path(__file__).resolve().parents[1]
UA='EnschedeDichtbijIndexer/1.0 (openbaar sociaal informatieproject)'
HEADERS={'User-Agent':UA}
SKIP=('/login','/account','/wp-admin','/admin','/mijn','/aanvraag','/checkout')
def clean(s,n=220):
 s=re.sub(r'\s+',' ',str(s or '')).strip()
 s=re.sub(r'[\w.+-]+@[\w.-]+\.\w{2,}','[contactgegevens bij bron]',s)
 return s if len(s)<=n else s[:n].rsplit(' ',1)[0]+'…'
def url_allowed(url, hosts):
 try:
  p=urlparse(url)
  if p.scheme!='https' or p.hostname not in hosts or p.username or p.password or p.port not in (None,443):return False
  if p.path.lower().startswith(SKIP) or p.path.lower().endswith(('.pdf','.zip','.png','.jpg','.webp','.json','.xml','.svg')):return False
  return True
 except ValueError:return False
def robots(session,hostname):
 try:
  response=session.get('https://'+hostname+'/robots.txt',timeout=12,headers=HEADERS,allow_redirects=False)
  if response.status_code==404:return True
  if response.status_code!=200:return False
  rules=RobotFileParser();rules.parse(response.text.splitlines());return rules
 except requests.RequestException:return False
def parse(html,url,site):
 soup=BeautifulSoup(html,'html.parser')
 title=(soup.find('h1') or soup.title)
 name=clean(title.get_text(' ',strip=True) if title else url,110)
 for e in soup.select('script,style,nav,footer,header,form,aside,iframe,svg,button,noscript'):e.decompose()
 root=soup.select_one('main') or soup.select_one('article') or soup.body or soup
 blocks=[]
 for e in root.select('h1,h2,h3,p,li'):
  if e.find_parent(['p','li']):continue
  t=clean(e.get_text(' ',strip=True),500)
  if len(t)>=28 and t not in blocks:blocks.append(t)
 if not blocks:return None
 full=' '.join(blocks)
 if len(full)<90:return None
 terms=' '.join(sorted(set(re.findall(r'[a-zà-ÿ0-9]{3,}',full.casefold()))))[:8000]
 summary=clean(next((x for x in blocks if len(x)>=75),blocks[0]),220)
 uid='web-'+re.sub(r'[^a-z0-9]+','-',url.lower()).strip('-')[:120]
 return {'id':uid,'title':name,'source':site['label'],'type':site['type'],'url':url,'summary':summary,'segments':[clean(b,160) for b in blocks[:8]],'terms':terms,'caution':'Controleer veranderlijke informatie bij de bron.'}
def crawl(session,site):
 hosts=set(site['hosts']);access={h:robots(session,h) for h in hosts}
 prefixes=tuple(site.get('path_prefixes',[]))
 def allowed(u):
  return url_allowed(u,hosts) and (not prefixes or any(urlparse(u).path.startswith(prefix) for prefix in prefixes))
 queue=collections.deque((u,0) for u in site['start_urls']);seen=set();found=[]
 while queue and len(seen)<site.get('max_pages',20):
  url,depth=queue.popleft();p=urlparse(url)
  if not allowed(url) or url in seen:continue
  seen.add(url);permitted=access.get(p.hostname)
  if permitted is False or (permitted is not True and not permitted.can_fetch(UA,url)):continue
  try:
   res=session.get(url,headers=HEADERS,timeout=17,allow_redirects=False)
   if 300<=res.status_code<400:
    redirect=urljoin(url,res.headers.get('Location',''))
    if allowed(redirect):queue.appendleft((redirect,depth))
    continue
   if res.status_code!=200 or 'text/html' not in res.headers.get('Content-Type','') or len(res.content)>1500000:continue
   article=parse(res.text,url,site)
   if article:found.append(article)
   if depth<site.get('max_depth',2):
    soup=BeautifulSoup(res.text,'html.parser')
    for a in soup.select('a[href]'):
     dest=urljoin(url,a['href'])
     if allowed(dest) and dest not in seen:queue.append((dest,depth+1))
  except requests.RequestException:pass
  time.sleep(.6)
 return found
def feeds(session,config):
 out=[]
 def download(name):
  url=config.get('feeds',{}).get(name,'')
  p=urlparse(url)
  if p.scheme!='https' or p.hostname!='raw.githubusercontent.com' or not p.path.startswith('/mlemson/') or not p.path.endswith('.json'):return None
  try:
   r=session.get(url,timeout=20,headers=HEADERS)
   if r.status_code==200 and len(r.content)<8000000:return r.json()
  except (requests.RequestException,ValueError):pass
  return None
 catalog=download('sociale_kaart')
 if isinstance(catalog,list):
  for org in catalog:
   orgname=clean(org.get('organization','Waar in Twente'),100)
   for offer in org.get('offers',[]):
    municipalities=offer.get('municipalities') or [offer.get('municipality')]
    if not any(str(a).casefold() in ('enschede','glanerbrug') for a in municipalities):continue
    name=clean(offer.get('title') or offer.get('name') or orgname,125)
    detail=clean(offer.get('description'),260)
    link=offer.get('source')
    if not isinstance(link,str) or not link.startswith('https://'):link='https://waarintwente.nl/'
    term=' '.join(map(str,[orgname,name,detail,offer.get('category',''),offer.get('tags',[]),offer.get('themes',[])]))
    uid='kaart-'+re.sub(r'[^a-z0-9]+','-',str(offer.get('id') or name).casefold())[:120]
    out.append({'id':uid,'title':name,'source':orgname,'type':'voorziening','url':link,'summary':detail or f'Voorziening van {orgname} in Enschede.','segments':[detail],'terms':clean(term,1800),'caution':'Controleer voorwaarden bij de aanbieder.'})
    for n,activity in enumerate(offer.get('activities') or []):
     if not isinstance(activity,dict) or not activity.get('name'):continue
     name2=clean(activity['name'],120)
     out.append({'id':uid+'-activiteit-'+str(n),'title':name2,'source':orgname,'type':'activiteit','url':link,'summary':clean(activity.get('description') or activity.get('schedule') or detail,250),'segments':[detail],'terms':clean(term+' '+str(activity),1600),'caution':'Controleer het programma bij de uitvoerder.'})
 waiting=download('jeugdhulptwente')
 if isinstance(waiting,dict):
  for n,entry in enumerate(waiting.get('rows',[])):
   provider=clean(entry.get('p'),100)
   if not provider:continue
   special=clean(entry.get('w') or 'Jeugdhulp',120)
   expertise=clean(entry.get('e') or [],600)
   place=clean(entry.get('l') or 'Twente',80)
   description=clean(f'{provider} · {special} · {place} · Expertise: {expertise}',240)
   out.append({'id':f'jeugdhulp-{n}','title':provider+' · '+special,'source':'Jeugdhulptwente.nl','type':'voorziening','url':'https://jeugdhulptwente.nl/','summary':description,'segments':[description],'terms':clean(' '.join(map(str,[provider,special,entry.get('e',[]),place,entry.get('d',''),entry.get('a',[])])),1500),'caution':'Geen live wachttijd: controleer de actuele website.'})
 return out
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--only-seed',action='store_true');args=parser.parse_args()
 seed=json.loads((ROOT/'source-index.seed.json').read_text(encoding='utf-8'))
 config=json.loads((ROOT/'source-sites.json').read_text(encoding='utf-8'))
 items={v['id']:v for v in seed['items']}
 if not args.only_seed:
  with requests.Session() as session:
   for v in feeds(session,config):items[v['id']]=v
   for site in config['sites']:
    try:
     result=crawl(session,site)
     for item in result:items.setdefault(item['id'],item)
     print(site['label'],len(result))
    except (ValueError,KeyError,TypeError):print('Bron overgeslagen',site.get('label'))
 today=datetime.datetime.now(datetime.timezone.utc).date().isoformat()
 data={'checked':today if not args.only_seed else seed.get('checked'),'note':'Periodieke publieke bronindex; gegevens kunnen wijzigen.','items':sorted(items.values(),key=lambda a:(a.get('source',''),a.get('title','')))}
 (ROOT/'source-index.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 (ROOT/'source-index.js').write_text('window.ED_SOURCE_INDEX='+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
 print('Geïndexeerd',len(items),'vermeldingen')
if __name__=='__main__':main()
