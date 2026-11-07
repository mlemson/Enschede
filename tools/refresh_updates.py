#!/usr/bin/env python3
"""Nieuws & activiteiten verversen uit openbare RSS en Event JSON-LD."""
import datetime as dt, email.utils, json, re
from pathlib import Path
from urllib.parse import urlparse
from urllib.robotparser import RobotFileParser
from xml.etree import ElementTree as ET
import requests
from bs4 import BeautifulSoup
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'auto-updates.js'
HEADERS={'User-Agent':'EnschedeDichtbijIndexer/1.0'}
NEWS='https://www.enschede.nl/feed/rss/nieuws/6%2B1'
EVENTS=[('https://www.uitinenschede.nl/agenda','Uit in Enschede'),('https://www.sportaal.nl/','Sportaal')]
WORDS=('buurt','wijk','inwoner','jeugd','familie','school','zorg','hulp','armoede','geld','sport','ontmoet','vrijwillig','senior','participatie','activiteit','evenement','cursus','welzijn')
def clean(s,n=230):
 t=BeautifulSoup(str(s or ''),'html.parser').get_text(' ',strip=True)
 t=re.sub(r'\s+',' ',t)
 return t if len(t)<=n else t[:n].rsplit(' ',1)[0]+'…'
def can_fetch(session,url):
 p=urlparse(url)
 if p.scheme!='https' or not p.hostname:return False
 try:
  r=session.get(f'https://{p.hostname}/robots.txt',timeout=10,headers=HEADERS)
  if r.status_code==404:return True
  if r.status_code!=200:return False
  rule=RobotFileParser();rule.parse(r.text.splitlines());return rule.can_fetch(HEADERS['User-Agent'],url)
 except requests.RequestException:return False
def rss(xml,today):
 out=[]
 try:root=ET.fromstring(xml)
 except ET.ParseError:return out
 for x in root.findall('.//item'):
  title=clean(x.findtext('title'),140);url=(x.findtext('link') or '').strip()
  body=clean(x.findtext('description'),220)
  if not title or urlparse(url).hostname not in ('enschede.nl','www.enschede.nl'):continue
  if not any(w in (title+' '+body).casefold() for w in WORDS):continue
  try:
   date=email.utils.parsedate_to_datetime(x.findtext('pubDate') or '').date()
   if not(today-dt.timedelta(days=65)<=date<=today):continue
  except (ValueError,TypeError,IndexError):continue
  uid='rss-'+re.sub('[^a-z0-9]+','-',title.casefold()).strip('-')[:65]
  out.append({'id':uid,'title':title,'date':str(date),'area':'Hele stad','category':'Buurt','summary':body[:170],'description':body,'url':url,'source':'Gemeente Enschede','topics':[]})
 return out[:25]
def events(html,base,label,today):
 soup=BeautifulSoup(html,'html.parser');found=[]
 def walk(node):
  if isinstance(node,list):
   for x in node:yield from walk(x)
  if isinstance(node,dict):
   typ=node.get('@type',[])
   if isinstance(typ,str):typ=[typ]
   if any(str(t).endswith('Event') for t in typ):yield node
   for key in ('@graph','itemListElement','mainEntity'):
    if key in node:yield from walk(node[key])
 for tag in soup.select('script[type="application/ld+json"]'):
  try:data=json.loads(tag.string or tag.get_text())
  except (ValueError,TypeError):continue
  for item in walk(data):
   name=clean(item.get('name'),130);start=str(item.get('startDate') or '')
   if not name or not re.match(r'^\d{4}-\d\d-\d\d',start):continue
   try:
    day=dt.date.fromisoformat(start[:10])
    if not(today<=day<=today+dt.timedelta(days=90)):continue
   except ValueError:continue
   location=item.get('location') or {}
   if isinstance(location,list):location=location[0] if location else {}
   place=clean(location.get('name','') if isinstance(location,dict) else location,110)
   url=item.get('url') or base
   if urlparse(url).hostname!=urlparse(base).hostname:url=base
   uid='agenda-'+re.sub('[^a-z0-9]+','-',name.lower()).strip('-')[:70]+'-'+str(day)
   found.append({'id':uid,'title':name,'date':str(day),'time':start[11:16] if len(start)>=16 else 'Tijd bij organisator','location':place or 'Zie organisator','area':'Hele stad','category':'Sport' if label=='Sportaal' else 'Cultuur','summary':clean(item.get('description'),200) or 'Meer informatie bij de organisator.','url':url,'source':label,'price':'','topics':['activiteiten']})
 return found
def old():
 try:return json.loads(OUT.read_text(encoding='utf-8').split('=',1)[1].strip().rstrip(';'))
 except (ValueError,IndexError,FileNotFoundError):return {'news':[],'events':[]}
def main():
 today=dt.datetime.now(dt.timezone.utc).date();previous=old()
 news=[];agenda=[]
 with requests.Session() as session:
  if can_fetch(session,NEWS):
   try:
    r=session.get(NEWS,headers=HEADERS,timeout=18)
    if r.status_code==200 and len(r.content)<2000000:news=rss(r.content,today)
   except requests.RequestException:pass
  for url,label in EVENTS:
   if not can_fetch(session,url):continue
   try:
    r=session.get(url,headers=HEADERS,timeout=18)
    if r.status_code==200 and len(r.content)<2000000:agenda.extend(events(r.text,url,label,today))
   except requests.RequestException:pass
 if not news:news=previous.get('news',[])
 if not agenda:agenda=previous.get('events',[])
 news=[x for x in news if x.get('date','')>=str(today-dt.timedelta(days=65))]
 agenda=[x for x in agenda if x.get('date','')>=str(today)]
 data={'checked':str(today),'news':news,'events':list({(x['date'],x['title']):x for x in agenda}.values())[:60]}
 OUT.write_text('window.ED_AUTO_UPDATES='+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
 print('Nieuws:',len(news),'activiteiten:',len(data['events']))
if __name__=='__main__':main()
