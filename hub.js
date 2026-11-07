'use strict';
// Samengevoegd nieuws- en activiteitenoverzicht. Privacy: alle filtering gebeurt lokaal.
(() => {
  const d=window.ED_UPDATES;
  if(!d)return;
  const feed=window.ED_AUTO_UPDATES||{news:[],events:[]};
  const coreUrls=new Set(d.news.map(x=>x.url));
  const newsItems=[...(feed.news||[]).filter(x=>!coreUrls.has(x.url)),...d.news].filter(n=>!n.expires||n.expires>=new Date().toLocaleDateString('sv-SE'));
  const coreEvents=new Set(d.events.map(x=>(x.date+'|'+x.title).toLowerCase()));
  const datedEvents=[...d.events,...(feed.events||[]).filter(x=>!coreEvents.has((x.date+'|'+x.title).toLowerCase()))];
  const $=q=>document.querySelector(q);
  const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=String(text);return e;};
  const link=(href,cls,text,external=false)=>{const e=make('a',cls,text);e.href=href;if(external){e.target='_blank';e.rel='noopener noreferrer';}return e;};
  const icon=(name)=>{const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.classList.add('icon');s.setAttribute('aria-hidden','true');const u=document.createElementNS('http://www.w3.org/2000/svg','use');u.setAttribute('href','#i-'+name);s.append(u);return s;};
  const today=()=>new Date().toLocaleDateString('sv-SE');
  const fmtDate=date=>date?new Date(date+'T12:00:00').toLocaleDateString('nl-NL',{weekday:'short',day:'numeric',month:'short'}):'';
  const allEvents=[...datedEvents.map(x=>({...x,recurring:false})),...d.recurring.map(x=>({...x,recurring:true}))];
  const visibleEvents=()=>allEvents.filter(x=>x.recurring||x.date>=today());
  const normal=str=>String(str||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const when=e=>e.recurring?'Wekelijks · '+e.frequency:fmtDate(e.date)+' · '+e.time;
  const topicLink=topic=>'#/onderwerp/'+topic;
  function eventCard(e,compact=false){
    const card=link('#/agenda/'+e.id,'hub-event-card'+(compact?' hub-compact':''));
    const date=make('div','hub-event-day');date.append(make('strong',null,e.recurring?'↻':new Date(e.date+'T12:00:00').toLocaleDateString('nl-NL',{day:'2-digit'})),make('small',null,e.recurring?'VAST':new Date(e.date+'T12:00:00').toLocaleDateString('nl-NL',{month:'short'}).toUpperCase()));
    const body=make('div','hub-event-content');body.append(make('div','hub-event-tags',e.category+' · '+e.area),make('h3',null,e.title),make('p','hub-event-intro',e.summary),make('span','hub-event-meta',when(e)));
    body.append(make('span','hub-event-place',e.location));card.append(date,body,make('span','hub-event-next','→'));return card;
  }
  function newsCard(n,featured=false){
    const card=link('#/nieuws/'+n.id,'hub-news-card'+(featured?' hub-featured':''));card.append(make('span','hub-news-category',n.category+' · '+n.area));
    card.append(make('h3',null,n.title),make('p',null,n.summary));
    const bottom=make('div','hub-news-bottom');bottom.append(make('span',null,n.date?fmtDate(n.date):'Recent bericht'),make('span',null,'Lees uitleg →'));card.append(bottom);
    return card;
  }
  function home(){
    const news=$('#hub-news-home'),agenda=$('#hub-event-home');if(!news||!agenda)return;
    // De selectie is redactioneel: zichtbare actualiteit zonder ongedateerde claims.
    const featured=['nieuws-familiehuis','nieuws-stadspeiling','nieuws-wijkwijzer','nieuws-spelbel','nieuws-seniorenbeurs','nieuws-pathmos'];
    const featuredItems=[...newsItems.filter(n=>n.id?.startsWith('rss-')).slice(0,2),...featured.map(id=>newsItems.find(n=>n.id===id)).filter(Boolean)].slice(0,6);
    news.replaceChildren(...featuredItems.map((n,i)=>newsCard(n,i===0)));
    const next=visibleEvents().filter(e=>!e.recurring).sort((a,b)=>a.date.localeCompare(b.date));
    agenda.replaceChildren(...next.slice(0,5).map(e=>eventCard(e,true)));
    const recurringLine=make('div','hub-weekly-link');recurringLine.append(make('strong',null,d.recurring.length+' terugkerende activiteiten'),make('span',null,'zoals taalgroepen, jongereninlopen en sport'));recurringLine.append(link('#/agenda','hub-simple-link','Bekijk ook het wekelijkse aanbod →'));agenda.append(recurringLine);
  }
  function pageHeader(kind,title,subtitle){const frag=document.createDocumentFragment();const top=make('div','guide-header-bar shell');top.append(link('#boven','guide-back','← Start'));frag.append(top);const hero=make('div','shell hub-page-hero');hero.append(make('span','hub-kicker',kind),make('h1',null,title),make('p',null,subtitle));frag.append(hero);return frag;}
  function pageAgenda(){
    const view=$('#guide-view');view.replaceChildren(pageHeader('SAMEN GEVONDEN AGENDA','Activiteiten in Enschede','Van buurtinloop en sport tot gezinnen en cultuur. Eenmalige activiteiten en vaste groepen staan apart.'));
    const wrap=make('div','shell hub-page-main');
    const controls=make('div','hub-controls');const f1=make('label','hub-filter');f1.append(make('span',null,'Stadsdeel'));const area=make('select');['Heel Enschede','Centrum','Noord','Oost','Zuid','West','Online'].forEach(x=>{const op=make('option',null,x);op.value=x;area.append(op);});f1.append(area);
    const f2=make('label','hub-filter');f2.append(make('span',null,'Soort activiteit'));const cat=make('select');['Alles',...new Set(allEvents.map(e=>e.category))].forEach(x=>{const op=make('option',null,x);op.value=x;cat.append(op);});f2.append(cat);
    const f3=make('label','hub-filter hub-filter-search');f3.append(make('span',null,'Zoeken'));const query=make('input');query.placeholder='Bijv. autisme, peuters, voetbal…';query.type='search';query.maxLength=100;f3.append(query);
    controls.append(f1,f2,f3);wrap.append(controls);const count=make('p','hub-results-count');wrap.append(count);
    const once=make('section','hub-page-section'),routine=make('section','hub-page-section');once.append(make('h2',null,'Binnenkort'));routine.append(make('h2',null,'Terugkerend aanbod'));const onceList=make('div','hub-event-grid'),routineList=make('div','hub-event-grid');once.append(onceList);routine.append(routineList);wrap.append(once,routine);
    function update(){const q=normal(query.value.trim()),a=area.value,c=cat.value;const selected=visibleEvents().filter(e=>(a==='Heel Enschede'||e.area===a)&&(c==='Alles'||e.category===c)&&(!q||normal([e.title,e.summary,e.location,e.category,e.area,e.source,...(e.topics||[])].join(' ')).includes(q)));
      const dated=selected.filter(e=>!e.recurring).sort((x,y)=>x.date.localeCompare(y.date));const recurring=selected.filter(e=>e.recurring).sort((x,y)=>x.title.localeCompare(y.title,'nl'));
      onceList.replaceChildren(...dated.map(e=>eventCard(e)));routineList.replaceChildren(...recurring.map(e=>eventCard(e)));once.hidden=!dated.length;routine.hidden=!recurring.length;
      count.textContent=selected.length+' activiteiten gevonden · samengesteld uit Alifa, Sportaal, gemeente, M-Pact en Uit in Enschede';if(!selected.length){const no=make('div','hub-no-results','Geen activiteiten gevonden met deze filters. Probeer een ander stadsdeel of thema.');once.hidden=false;onceList.append(no);}
    }[area,cat,query].forEach(el=>el.addEventListener(el===query?'input':'change',update));update();
    wrap.append(make('p','hub-data-note','Gecontroleerd op 7 november 2026. Data zonder exacte datum zijn als terugkerend aanbod opgenomen. Kijk bij de aanbieder of een activiteit doorgaat; deze versie wordt niet live bijgewerkt.'));
    const links=make('div','hub-other-sources');links.append(make('h2',null,'Meer agenda’s'));[
      ['Alifa','https://www.alifa.nl/activiteiten'],['Sportaal','https://www.sportaal.nl/'],['Uit in Enschede','https://www.uitinenschede.nl/agenda'],['M-Pact','https://www.m-pact.nl/'],['Wijkwijzer','https://wijkwijzerenschede.nl/meedoen-en-ontmoeten']].forEach(([name,url])=>links.append(link(url,'hub-source-link',name+' ↗',true)));wrap.append(links);
    view.append(wrap);document.title='Agenda | Enschede dichtbij';
  }
  function pageNews(){
    const view=$('#guide-view');view.replaceChildren(pageHeader('SOCIAAL NIEUWS','Nieuws uit Enschede','Buurt, opvoeden, meedoen, geld en voorzieningen. Samengebracht uit lokale bronnen.'));
    const wrap=make('div','shell hub-page-main');const controls=make('div','hub-controls');const l=make('label','hub-filter');l.append(make('span',null,'Onderwerp'));const topic=make('select');['Alles',...new Set(newsItems.map(x=>x.category))].forEach(v=>{const o=make('option',null,v);o.value=v;topic.append(o);});l.append(topic);
    const a=make('label','hub-filter');a.append(make('span',null,'Stadsdeel'));const area=make('select');['Heel Enschede','Centrum','Noord','Oost','Zuid','West'].forEach(v=>{const o=make('option',null,v);o.value=v;area.append(o);});a.append(area);controls.append(l,a);wrap.append(controls);
    const results=make('div','hub-news-list');wrap.append(results);
    function update(){const rows=newsItems.filter(x=>(topic.value==='Alles'||x.category===topic.value)&&(area.value==='Heel Enschede'||x.area===area.value||x.area==='Hele stad'));results.replaceChildren(...rows.map(n=>newsCard(n)));if(!rows.length)results.append(make('p',null,'Geen berichten in deze selectie.'));}
    topic.addEventListener('change',update);area.addEventListener('change',update);update();wrap.append(make('p','hub-data-note','Dit is een redactionele selectie en geen automatische nieuwsfeed. Gepubliceerdatum alleen vermeld wanneer gecontroleerd. Laatste controle: 7 november 2026.'));view.append(wrap);document.title='Nieuws | Enschede dichtbij';
  }
  function detailEvent(e){
    const view=$('#guide-view');view.replaceChildren(pageHeader('ACTIVITEIT · '+e.category,e.title,e.summary));
    const wrap=make('div','guide-detail-grid shell');const main=make('article','guide-article');
    const facts=make('section','guide-copy-block');facts.append(make('h2',null,'Praktische informatie'));
    const dl=make('dl','hub-facts');[['Wanneer',when(e)],['Waar',e.location],['Stadsdeel',e.area],['Organisatie / bron',e.source],['Kosten',e.price||'Controleer bij de organisatie']].forEach(([k,v])=>{facts.append(make('div','hub-fact'));facts.lastElementChild.append(make('dt',null,k),make('dd',null,v));});main.append(facts);
    const detail=make('section','guide-copy-block');detail.append(make('h2',null,'Wat kun je verwachten?'),make('p',null,e.summary));if(e.recurring)detail.append(make('p','hub-caution','Terugkerend aanbod: tijdens vakanties of feestdagen kan het anders zijn. Controleer dag en locatie altijd bij de organisatie.'));main.append(detail);
    if(e.topics?.length){const related=make('section','guide-copy-block');related.append(make('h2',null,'Informatie bij dit onderwerp'));for(const id of e.topics){const t=window.ED_CONTENT.topics.find(x=>x.id===id);if(t)related.append(link(topicLink(id),'hub-linked-row',t.title+' →'));}main.append(related);}
    const aside=make('aside','guide-aside');const panel=make('div','guide-aside-panel');panel.append(make('h2',null,'Bron & aanmelden'),make('p',null,'Controleer de actuele tijden en eventuele aanmelding.'));panel.append(link(e.url,'guide-button-primary','Naar '+e.source+' ↗',true),link('#/agenda','guide-muted-link','← Alle activiteiten'));aside.append(panel);wrap.append(main,aside);view.append(wrap);document.title=e.title+' | Enschede dichtbij';
  }
  function detailNews(n){
    const view=$('#guide-view');view.replaceChildren(pageHeader('NIEUWS · '+n.category,n.title,n.summary));
    const wrap=make('div','guide-detail-grid shell');const main=make('article','guide-article');const body=make('section','guide-copy-block');body.append(make('span','hub-eyebrow',n.area+(n.date?' · '+fmtDate(n.date):'')),make('h2',null,'Dit speelt er'),make('p',null,n.description));main.append(body);
    const relatedEvents=visibleEvents().filter(e=>(e.topics||[]).some(t=>(n.topics||[]).includes(t))).slice(0,4);
    if(relatedEvents.length){const sec=make('section','guide-copy-block');sec.append(make('h2',null,'Passende activiteiten'));for(const e of relatedEvents)sec.append(link('#/agenda/'+e.id,'hub-linked-row',e.title+' · '+(e.date?fmtDate(e.date):e.frequency)));main.append(sec);}
    const aside=make('aside','guide-aside');const panel=make('div','guide-aside-panel');panel.append(make('h2',null,'Oorspronkelijke bron'),make('p',null,n.source));panel.append(link(n.url,'guide-button-primary','Bekijk bij de bron ↗',true),link('#/nieuws','guide-muted-link','← Alle nieuwsberichten'));aside.append(panel);wrap.append(main,aside);view.append(wrap);document.title=n.title+' | Enschede dichtbij';
  }
  function route(){const match=(location.hash||'').match(/^#\/(agenda|nieuws)(?:\/([a-z0-9-]+))?$/);if(!match)return;
    const [,type,id]=match,view=$('#guide-view'),main=$('#inhoud');view.hidden=false;main.classList.add('guide-active');
    if(!id){if(type==='agenda')pageAgenda();else pageNews();}
    else {const item=type==='agenda'?allEvents.find(e=>e.id===id):newsItems.find(n=>n.id===id);if(!item){location.hash='#/'+type;return;}if(type==='agenda')detailEvent(item);else detailNews(item);}
    window.scrollTo({top:0,behavior:'instant'});const heading=view.querySelector('h1');heading?.setAttribute('tabindex','-1');heading?.focus({preventScroll:true});
  }
  window.addEventListener('hashchange',route);home();route();
  window.ED_HUB={events:allEvents,news:newsItems,visibleEvents};
})();
