'use strict';
// De informatiegids en digitale vraaghulp werken uitsluitend op de lokale redactionele data.
(() => {
  const data=window.ED_CONTENT;
  const byId=new Map(data.topics.map(topic=>[topic.id,topic]));
  const categoryById=new Map(data.categories.map(cat=>[cat.id,cat]));
  const $=selector=>document.querySelector(selector);
  const norm=text=>String(text||'').toLocaleLowerCase('nl').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();
  const exclusions=new Set(['ik','een','de','het','en','of','in','op','naar','zoek','zoeken','wil','weten','voor','met','bij','mijn','is','heb','hulp','vraag','aan','kan','hoe','waar','wie','er','wat','graag','vind','mee','om','te','doen','iets','ben','wij','ons','nodig','deze','zou','kun','mij','dat','zijn','nu','meer','info','informatie','krijg','over']);
  const termsOf=str=>norm(str).split(' ').filter(t=>t.length>=3&&!exclusions.has(t));
  const make=(tag,cl,text)=>{const n=document.createElement(tag);if(cl)n.className=cl;if(text!==undefined)n.textContent=text;return n;};
  const a=(href,cl,text,external=false)=>{const el=make('a',cl,text);el.href=href;if(external){el.target='_blank';el.rel='noopener noreferrer';}return el;};
  const icon=(name)=>{const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.classList.add('icon');s.setAttribute('aria-hidden','true');const u=document.createElementNS('http://www.w3.org/2000/svg','use');u.setAttribute('href','#i-'+name);s.append(u);return s;};
  // Platformonafhankelijke lijniconen in plaats van emoji op mobiele apparaten.
  const visualIcon=(name,classes)=>{
    const el=make('span',classes);
    if(['users','calendar','heart'].includes(name))el.append(icon(name));
    else el.textContent=name;
    return el;
  };
  const topicLink=id=>'#/onderwerp/'+id;
  const categoryLink=id=>'#/categorie/'+id;
  const words=(t)=>norm([t.title,t.tag,t.summary,t.keywords,t.intro].join(' '));
  function rankTopics(query,limit=6){
    const raw=norm(query),terms=termsOf(query);
    if(/(word|wordt) geslagen|slaat (me|mij)|onveilig thuis|bang voor mijn partner|mishandeld/.test(raw))return [byId.get('veiligheid')];
    if(/wat is er te doen|iets leuks doen|iets doen|activiteiten in de buurt|leuke dingen doen/.test(raw))return [byId.get('activiteiten')];
    if(/hulp en advies|waar kan ik terecht/.test(raw))return [byId.get('wijkwijzer')];
    if(!raw||!terms.length)return [];
    return data.topics.map((topic,i)=>{
      const title=norm(topic.title),tags=norm(topic.tag), keys=norm(topic.keywords), description=norm(topic.summary+' '+topic.intro);
      let score=0;
      if(raw===title)score+=100;
      const phraseMatch=raw.length>=4 && title.includes(raw);
      if(phraseMatch)score+=35;
      for(const term of terms){
        if(title.split(' ').some(word=>word===term))score+=23;
        else if(title.includes(term))score+=14;
        if(tags.includes(term))score+=9;
        if(keys.split(' ').some(word=>word===term))score+=13;
        else if(keys.includes(term))score+=5;
        if(description.includes(term))score+=3;
      }
      const matches=terms.filter(term=>words(topic).includes(term)).length;
      if(terms.length>1&&matches===terms.length)score+=15;
      // Combinaties: voorkom bijvoorbeeld dat 'baan zoeken' naar 'rouw na baanverlies' verwijst.
      if(topic.id==='werk'&&/(baan zoeken|werk zoeken|sollicit|werkloos|vacature)/.test(raw))score+=70;
      if(topic.id==='schulden'&&/(achterstand|aanmaning|deurwaarder|rekening niet betalen)/.test(raw))score+=65;
      if(topic.id==='jeugdhulp'&&/(jeugdhulp|jeugdzorg|wachtlijst|wachttijd|verwijzer)/.test(raw))score+=70;
      if(topic.id==='geld'&&/(te weinig geld|moeite met rondkomen|kan niet rondkomen)/.test(raw))score+=55;
      return {topic,score,i};
    }).filter(x=>x.score>0).sort((x,y)=>y.score-x.score||x.i-y.i).slice(0,limit).map(x=>x.topic);
  }
  function localCard(topic,variant=''){const link=a(topicLink(topic.id),'guide-topic-card'+(variant?' '+variant:''));link.append(visualIcon(topic.icon,'guide-topic-icon tone-'+topic.tone));const copy=make('span','guide-card-body');copy.append(make('strong',null,topic.title),make('small',null,topic.summary));link.append(copy);return link;}
  function externalCard(link){const wrap=a(link.url,'guide-source-card',undefined,true);const copy=make('span');copy.append(make('strong',null,link.title),make('small',null,link.note||''));wrap.append(copy);return wrap;}
  function detailHeading(){const wrap=make('div','guide-header-bar shell');wrap.append(a('#boven','guide-back','Start'));return wrap;}
  function buildCategory(category){
    const view=$('#guide-view');view.replaceChildren(detailHeading());
    const hero=make('div','guide-hero shell');const text=make('div','guide-hero-copy');text.append(make('span','guide-eyebrow','ENSCHEDE DICHTBIJ'),visualIcon(category.icon,'guide-top-symbol tone-'+category.tone),make('h1',null,category.title),make('p',null,category.intro));
    const picture=make('div','guide-photo');const img=make('img');img.src=category.image;img.alt='Illustratie bij '+category.title;picture.append(img);
    hero.append(text,picture);view.append(hero);
    const content=make('div','guide-content shell');const top=make('section','guide-section');top.append(make('h2',null,'Onderwerpen'));const cards=make('div','guide-topic-grid');category.topics.map(id=>byId.get(id)).filter(Boolean).forEach(t=>cards.append(localCard(t)));top.append(cards);content.append(top);
    const subGroups=Object.entries(category.subtopics||{});
    if(subGroups.length){
      const more=make('section','guide-section guide-subtopics');more.append(make('h2',null,'Specifieke vragen'));
      const groups=make('div','guide-subtopic-groups');
      for(const [parentId,ids] of subGroups){
        const parent=byId.get(parentId);const valid=ids.map(id=>byId.get(id)).filter(Boolean);
        if(!parent||!valid.length)continue;
        const group=make('div','guide-subtopic-group');group.append(a(topicLink(parentId),'guide-subtopic-parent',parent.title));
        const links=make('nav','guide-subtopic-links');links.setAttribute('aria-label','Meer over '+parent.title);
        valid.forEach(t=>links.append(a(topicLink(t.id),'guide-subtopic-link',t.title)));
        group.append(links);groups.append(group);
      }
      more.append(groups);content.append(more);
    }
    if(category.id==='buurt'){
      const buurt=make('section','guide-section guide-info-panel');buurt.append(make('h2',null,'Wijkwijzers in Enschede'),make('p',null,'Je kunt zonder afspraak binnenlopen bij een Wijkwijzer. Er zijn meerdere locaties per stadsdeel. Sommige adressen wisselen per dag.'));const actions=make('div','guide-buttons');actions.append(a('#mijn-buurt','guide-button-primary','Bekijk de 10 locaties'),externalCard({title:'Controleer openingstijden',url:'https://wijkwijzerenschede.nl/contact-en-openingstijden',note:'Officiële website Wijkwijzer'}));buurt.append(actions);content.append(buurt);
    }
    if(category.id==='doen' && window.ED_UPDATES){const explore=make('section','guide-section hub-category-preview');explore.append(make('h2',null,'Activiteiten uit de stad en jouw buurt'),make('p',null,'Bekijk de gecombineerde agenda met eenmalige evenementen en vaste buurtactiviteiten.'));const links=make('div','hub-feature-pills');links.append(a('#/agenda','guide-button-primary','Open de agenda'),a('#/nieuws','guide-muted-link','Buurtberichten'));explore.append(links);content.append(explore);}
    if(category.id==='buurt' && window.ED_UPDATES){const explore=make('section','guide-section hub-category-preview');explore.append(make('h2',null,'Wat gebeurt er in jouw buurt?'),make('p',null,'Nieuws en activiteiten uit meerdere organisaties, met een filter voor de vijf stadsdelen.'));explore.append(a('#/agenda','guide-button-primary','Filter activiteiten op stadsdeel'));content.append(explore);}
    const sources=make('section','guide-section');sources.append(make('h2',null,'Handige websites'));const srcs=make('div','guide-source-grid');category.links.forEach(l=>srcs.append(externalCard(l)));sources.append(srcs);content.append(sources);
    view.append(content);document.title=category.title+' | Enschede dichtbij';
  }
  function buildTopic(topic){
    const view=$('#guide-view');view.replaceChildren(detailHeading());
    const header=make('div','guide-topic-hero shell');const bread=make('div','guide-crumb');const category=categoryById.get(topic.category);bread.append(a(categoryLink(topic.category),'',category?.title||'Thema'),document.createTextNode('  /  '+topic.title));
    const top=make('div','guide-topic-hero-intro');top.append(visualIcon(topic.icon,'guide-top-symbol tone-'+topic.tone));const copy=make('div');copy.append(make('span','guide-eyebrow',topic.tag),make('h1',null,topic.title),make('p',null,topic.intro));top.append(copy);header.append(bread,top);view.append(header);
    const columns=make('div','guide-detail-grid shell');const main=make('article','guide-article');
    const childIds=category?.subtopics?.[topic.id]||[];
    if(childIds.length){
      const rail=make('nav','guide-child-rail');rail.setAttribute('aria-label','Meer over '+topic.title);
      rail.append(make('strong',null,'Binnen dit onderwerp'));
      const links=make('div','guide-child-links');
      childIds.map(id=>byId.get(id)).filter(Boolean).forEach(child=>links.append(a(topicLink(child.id),'guide-subtopic-link',child.title)));
      rail.append(links);main.append(rail);
    }
    // Geen willekeurige afbeelding zonder geverifieerde bron.
    topic.sections.forEach((section,i)=>{const block=make('section','guide-copy-block');block.append(make('h2',null,section.title));if(section.text)block.append(make('p',null,section.text));if(section.bullets){const list=make('ul');section.bullets.forEach(item=>list.append(make('li',null,item)));block.append(list);}main.append(block);});
    const dossier=window.ED_DOSSIERS?.[topic.id];
    if(dossier){
      const merge=make('section','guide-copy-block hub-dossier');merge.append(make('span','hub-kicker','SAMENGEBRACHT UIT MEERDERE BRONNEN'),make('h2',null,'Hoe werkt het in Enschede?'),make('p',null,dossier.intro));
      if(dossier.steps?.length){const h=make('h3',null,'Zo kun je beginnen');merge.append(h);const ol=make('ol');dossier.steps.forEach(s=>ol.append(make('li',null,s)));merge.append(ol);}
      main.append(merge);
      const combined=make('section','guide-copy-block hub-combined');combined.append(make('h2',null,'Wie helpt waarmee?'));
      for(const [name,desc,url] of dossier.local){
        const card=a(url,'hub-organisation',undefined,true);
        card.setAttribute('aria-label',name+' — '+desc+' (opent in een nieuw tabblad)');
        const body=make('span','hub-organisation-body');body.append(make('strong',null,name),make('span','hub-organisation-description',desc));
        card.append(body);combined.append(card);
      }
      main.append(combined);
    }
    const updates=window.ED_UPDATES;
    if(updates){const relatedEvents=[...updates.events.map(e=>({...e,internal:'#/agenda/'+e.id})),...updates.recurring.map(e=>({...e,internal:'#/agenda/'+e.id}))].filter(e=>(e.topics||[]).includes(topic.id)&&(!e.date||e.date>=new Date().toLocaleDateString('sv-SE'))).slice(0,3);
      if(relatedEvents.length){const section=make('section','guide-copy-block hub-related-events');section.append(make('h2',null,'Ook interessant: activiteiten'));for(const e of relatedEvents){const card=a(e.internal,'hub-linked-row');card.append(make('strong',null,e.title),make('small',null,(e.date?e.date:e.frequency)+' · '+e.location));section.append(card);}main.append(section);}}
    const note=make('div','guide-update-note');note.append(make('span',null,'Bronnen gecontroleerd: '+data.checked+'.'));main.append(note);columns.append(main);
    const aside=make('aside','guide-aside');const linkPanel=make('div','guide-aside-panel');linkPanel.append(make('h2',null,'Verder lezen & regelen'));topic.links.forEach(link=>linkPanel.append(externalCard(link)));aside.append(linkPanel);
    const human=make('div','guide-aside-panel guide-human-panel');human.append(make('h3',null,'Liever iemand spreken?'),make('p',null,'Loop binnen bij een Wijkwijzer. Je kunt ook bellen op werkdagen.'));human.append(a('tel:+31534817900','guide-button-primary','Bel 053 481 79 00'),a('#/onderwerp/wijkwijzer','guide-muted-link','Wijkwijzer'));aside.append(human);
    columns.append(aside);view.append(columns);
    if(topic.related?.length){const related=make('section','guide-section guide-related shell');related.append(make('h2',null,'Misschien ook handig'));const cards=make('div','guide-topic-grid');topic.related.slice(0,5).map(id=>byId.get(id)).filter(Boolean).forEach(t=>cards.append(localCard(t)));related.append(cards);view.append(related);}
    const bottom=make('div','guide-bottom-back shell');bottom.append(a(categoryLink(topic.category),'guide-muted-link','Terug naar '+(category?.title||'onderwerpen')));view.append(bottom);document.title=topic.title+' | Enschede dichtbij';
  }
  // Resultaten van alle geïndexeerde bronnen, inclusief woorden die niet vooraf zijn bedacht.
  const sourceRoute=(item,query='')=>item.internal||('#/bron/'+encodeURIComponent(item.id)+(query?'?q='+encodeURIComponent(query):''));
  const searchRoute=query=>'#/zoeken?q='+encodeURIComponent(query.trim());
  const typeNames={informatie:'Informatie',organisatie:'Organisaties',voorziening:'Voorzieningen',activiteit:'Activiteiten'};
  const safeDate=raw=>/^\d{4}-\d{2}-\d{2}$/.test(raw||'')?raw.split('-').reverse().join('-'):'niet bekend';
  function sourceResult(item,query){
    const card=a(sourceRoute(item,query),'source-hit');
    const meta=make('div','source-hit-meta');meta.append(make('span','source-pill source-'+(item.type||'informatie'),typeNames[item.type]||'Informatie'),make('span',null,item.source));
    card.append(meta,make('strong','source-hit-title',item.title),make('p',null,item.excerpt||item.summary));
    
    return card;
  }
  function buildSource(id,query=''){
    const item=(window.ED_SEARCH?.items||[]).find(s=>s.id===id);
    if(!item){location.hash='#boven';return;}
    const view=$('#guide-view');view.replaceChildren(detailHeading());
    const head=make('header','guide-topic-hero shell');const back=make('div','guide-crumb');back.append(a(searchRoute(query||item.title),'','Zoekresultaten'));
    const intro=make('div','guide-source-intro');intro.append(make('span','guide-eyebrow',(typeNames[item.type]||'Informatie')+' · '+item.source),make('h1',null,item.title),make('p',null,item.summary));head.append(back,intro);view.append(head);
    const content=make('div','guide-detail-grid shell');const article=make('article','guide-article');
    const section=make('section','guide-copy-block');section.append(make('h2',null,'Wat staat er over dit onderwerp?'));
    const relatedSegments=(item._excerpts||[]).filter(s=>!query||window.ED_SEARCH.tokenize(query).some(w=>window.ED_SEARCH.normalize(s.text).includes(w)));
    const blocks=(relatedSegments.length?relatedSegments:item._excerpts||[]).slice(0,5);
    if(blocks.length)for(const seg of blocks)section.append(make('p',null,seg.text));
    else section.append(make('p',null,item.summary));article.append(section);
    const candidates=rankTopics(query||item.title,2);const matching=candidates.find(t=>t&&t.sections?.length);
    if(matching){const more=make('section','guide-copy-block ed-source-companion');more.append(make('h2',null,'Uitleg en mogelijkheden in Enschede'),make('p',null,matching.intro));for(const s of matching.sections.slice(-2)){more.append(make('h3',null,s.title),make('p',null,s.text));}more.append(a(topicLink(matching.id),'ed-quiet-cta','Meer over '+matching.title));article.append(more);}
    const info=make('div','guide-update-note');info.append(make('span',null,'Bronindex '+safeDate(window.ED_SEARCH.checked)+' · Lees de originele bron voor de meest actuele voorwaarden.'));article.append(info);content.append(article);
    const aside=make('aside','guide-aside');const panel=make('div','guide-aside-panel');panel.append(make('h2',null,'Oorspronkelijke bron'));panel.append(externalCard({url:item.url,title:item.source,note:''}));if(item.caution)panel.append(make('p','source-caution',item.caution));aside.append(panel);content.append(aside);
    view.append(content);document.title=item.title+' | Enschede dichtbij';
  }
  function buildSearchPage(query){
    const found=window.ED_SEARCH.search(query,{limit:160});const view=$('#guide-view');view.replaceChildren(detailHeading());
    const hero=make('section','guide-search-hero shell');hero.append(make('span','guide-eyebrow','DOORZOEK DE BRONNEN'),make('h1',null,'Zoekresultaten'));
    const form=make('form','guide-search-form');form.setAttribute('role','search');const field=make('input');field.type='search';field.value=query;field.maxLength=180;field.placeholder='Waar zoek je naar?';field.setAttribute('aria-label','Zoek op elk onderwerp');const submit=make('button','guide-button-primary','Zoek');submit.type='submit';form.append(field,submit);form.addEventListener('submit',e=>{e.preventDefault();location.hash=searchRoute(field.value);if(field.value===query)buildSearchPage(query);});hero.append(form);
    const count=make('p','guide-search-count',found.count+' bronpagina’s gevonden · '+(window.ED_SEARCH.items.length)+' bronnen in de index · bijgewerkt '+safeDate(found.checked));hero.append(count);view.append(hero);
    const content=make('div','shell guide-search-content');
    if(found.topics.length||found.sources.length){
      const overview=make('section','guide-section hub-answer-digest');overview.append(make('span','hub-kicker','IN ÉÉN OVERZICHT'),make('h2',null,'Dit vonden we over '+query));
      const best=found.topics[0];if(best){overview.append(make('p','hub-digest-intro',best.intro));overview.append(a(topicLink(best.id),'hub-digest-read',best.title));}
      const selected=[];const seen=new Set();for(const doc of found.sources){if(seen.has(doc.source))continue;seen.add(doc.source);selected.push(doc);if(selected.length===3)break;}
      if(selected.length){const sources=make('div','hub-digest-sources');for(const doc of selected){const item=a(sourceRoute(doc,query),'hub-digest-item');item.append(make('strong',null,doc.title),make('small','hub-source-name',doc.source),make('p',null,doc.excerpt||doc.summary));sources.append(item);}overview.append(sources);}
      content.append(overview);
    }
    if(found.topics.length){const topics=make('section','guide-section');topics.append(make('h2',null,'Uitleg van Enschede dichtbij'));const cards=make('div','guide-topic-grid');found.topics.slice(0,4).forEach(t=>cards.append(localCard(t)));topics.append(cards);content.append(topics);}
    let got=false;
    for(const type of ['informatie','organisatie','voorziening','activiteit']){
      const group=found.sources.filter(item=>item.type===type).slice(0,18);if(!group.length)continue;got=true;
      const section=make('section','guide-section');section.append(make('h2',null,typeNames[type]+' ('+found.sources.filter(item=>item.type===type).length+')'));
      const grid=make('div','source-result-grid');group.forEach(item=>grid.append(sourceResult(item,query)));section.append(grid);content.append(section);
    }
    if(!got){const empty=make('section','guide-section guide-info-panel');empty.append(make('h2',null,'Geen bronvermelding gevonden'),make('p',null,'Deze bronindex bevat nog niet alle websites. Probeer een ander woord of stel je vraag bij de Wijkwijzer.'));empty.append(a('#/onderwerp/wijkwijzer','guide-button-primary','Hulp bij de Wijkwijzer'));content.append(empty);}
    const disclaimer=make('p','source-disclaimer','Resultaten komen uit een vooraf gebouwde index en zijn niet live. De website controleert dagelijks of bronnen opnieuw kunnen worden ingelezen. Niet elke bron laat volledige indexering toe.');content.append(disclaimer);
    view.append(content);document.title='Zoeken: '+query+' | Enschede dichtbij';
  }
  function markMobileRoute(category){
    const target=category==='doen'||category==='vrijwillig'?'#/categorie/doen':category==='buurt'?'#/categorie/buurt':'#/categorie/hulp';
    document.querySelectorAll('.mobile-tabs a').forEach(link=>{
      const active=link.getAttribute('href')===target;
      link.classList.toggle('tab-current',active);
      if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
    });
  }
  function route(){
    const hash=decodeURIComponent(location.hash||'');const guide=$('#guide-view');const main=$('#inhoud');
    const searchMatch=hash.match(/^#\/zoeken(?:\?q=(.*))?$/);
    const sourceMatch=hash.match(/^#\/bron\/([^?]+)(?:\?q=(.*))?$/);
    const match=hash.match(/^#\/(categorie|onderwerp)\/([a-z0-9-]+)$/);
    if(!match&&!searchMatch&&!sourceMatch){main.classList.remove('guide-active');guide.hidden=true;document.title='Enschede dichtbij — Hulp, buurt & activiteiten';return;}
    guide.hidden=false;main.classList.add('guide-active');
    if(searchMatch)buildSearchPage(searchMatch[1]||'');
    else if(sourceMatch)buildSource(sourceMatch[1],sourceMatch[2]||'');
    else{
      const [,type,id]=match;const item=type==='categorie'?categoryById.get(id):byId.get(id);
      if(!item){location.hash='#boven';return;}
      if(type==='categorie')buildCategory(item);else buildTopic(item);
      markMobileRoute(type==='categorie'?item.id:item.category);
    }
    window.scrollTo({top:0,behavior:'instant'});const heading=guide.querySelector('h1');heading?.setAttribute('tabindex','-1');heading?.focus({preventScroll:true});
  }
  window.addEventListener('hashchange',route);route();
  const results=$('#search-results'), input=$('#main-search-input'),form=$('#main-search-form');
  function renderSearch(query){
    const raw=query.trim();results.replaceChildren();if(raw.length<2){results.hidden=true;return;}
    results.hidden=false;
    const matches=window.ED_SEARCH.search(raw,{limit:10}),topics=matches.topics,docs=matches.sources;
    if(!topics.length&&!docs.length){results.append(make('h3',null,'Geen informatie gevonden'),make('p','search-help-text','Deze bronindex is nog niet volledig. Probeer een ander woord of neem contact op met de Wijkwijzer.'));results.append(a(searchRoute(raw),'search-local-link','Zoek in alle bronnen'));return;}
    results.append(make('span','search-overline','DOORZOEKTE LOKALE BRONNEN'));
    // Laat inhoud uit de bron zien, niet alleen een link of vooraf ingestelde trefwoorden.
    const best=topics[0];if(best){results.append(make('h3',null,best.title),make('p','search-answer',best.intro));results.append(a(topicLink(best.id),'search-local-link',best.title));}
    else if(docs.length){results.append(make('h3',null,docs[0].title),make('p','search-answer',docs[0].excerpt||docs[0].summary));}
    if(docs.length){
      const list=make('div','search-source-list');list.append(make('strong',null,'Gevonden op websites:'));
      docs.slice(0,4).forEach(item=>{const card=a(sourceRoute(item,raw),'search-source-item');card.append(make('span','',item.title+' · '+item.source),make('small','',item.excerpt||item.summary));list.append(card);});
      results.append(list);
    }
    results.append(a(searchRoute(raw),'search-all-link','Alle resultaten ('+matches.count+')'));
  }
  form.addEventListener('submit',e=>{e.preventDefault();if(input.value.trim())location.hash=searchRoute(input.value);});
  input.addEventListener('input',()=>{if(input.value.trim().length>=2)renderSearch(input.value);else results.hidden=true;});
  document.addEventListener('click',e=>{if(!form.contains(e.target)&&!results.contains(e.target))results.hidden=true;});
  input.addEventListener('keydown',e=>{if(e.key==='Escape')results.hidden=true;});
  document.querySelectorAll('[data-search-example]').forEach(button=>button.addEventListener('click',()=>{input.value=button.dataset.searchExample;renderSearch(input.value);input.focus();}));
  results.addEventListener('click',e=>{if(e.target.closest('a[href^="#/"]'))results.hidden=true;});
  // Gesprekslaag: antwoorden uit eigen onderwerpen en bronindex. Geen AI, netwerkverzoeken of opslag.
  const chatStream=$('#chat-stream'),chatInput=$('#chat-input'),chatForm=$('#chat-form');
  // Antwoorden worden niet meer op een vast aantal tekens afgeknipt.
  // Bronfragmenten kunnen zelf verkort zijn: geef dan liever een eigen volledige uitleg.
  const completeText=value=>{
    const raw=String(value||'').replace(/\s+/g,' ').trim();
    if(!raw)return '';
    if(!/[.…]$/.test(raw))return raw;
    const parts=raw.match(/.*?[.!?](?=\s|$)/g)||[];
    return parts.filter(s=>!s.trim().endsWith('…')).join(' ').trim();
  };
  let lastChatTopic=null;
  const relevantSection=(topic,query)=>{
    const text=norm(query),wordSet=new Set(termsOf(text));
    if(!topic.sections?.length)return null;
    let sections=topic.sections.map((section,i)=>{
      const title=norm(section.title),body=norm(section.text);
      let score=0;
      for(const word of wordSet){if(title.includes(word))score+=6;if(body.includes(word))score+=1;}
      if(/waar|terecht|hulp|loket|organisat/.test(text)&&/(hulp|waar|advies|contact)/.test(title))score+=6;
      if(/hoe|aanpak|begin|nu|stap|wat kan|wat moet/.test(text)&&/(begin|doen|stap|zelf|wat)/.test(title))score+=6;
      return {section,i,score};
    });
    sections.sort((a,b)=>b.score-a.score||a.i-b.i);
    return sections[0]?.section||null;
  };
  const chatSafety=[
    {test:/(direct gevaar|levensgevaar|acuut gevaar|bel 112|ik word nu bedreigd|iemand ligt bewusteloos)/,text:'Is er direct gevaar of is er met spoed hulp nodig? Bel 112. Deze wegwijzer kan geen noodhulp inschakelen.',action:{text:'Bel 112',href:'tel:112'}},
    {test:/(zelfmoord|zelfdoding|suicide|zelfmoordgedachten|wil niet meer leven|mezelf iets aandoen|maak een einde aan mijn leven)/,text:'Heb je gedachten aan zelfdoding? Je kunt dag en nacht contact opnemen met 113 Zelfmoordpreventie. Bij direct gevaar bel je 112.',action:{text:'Bel 0800-0113',href:'tel:08000113'},extra:[{text:'113 Zelfmoordpreventie',href:'https://www.113.nl/'}]},
    {test:/(huiselijk geweld|kindermishandeling|partnergeweld|mishandeld|onveilig thuis|geweld thuis|word geslagen|wordt geslagen|slaat me|slaat mij|bang voor mijn partner)/,text:'Bij geweld thuis of zorgen om kindermishandeling kun je voor advies bellen met Veilig Thuis: 0800-2000. Bij direct gevaar bel je 112.',action:{text:'Bel Veilig Thuis',href:'tel:08002000'},extra:[{text:'Veilig Thuis',href:'https://veiligthuis.nl/'}]}
  ];
  function composeChatReply(question){
    const q=question.trim(),n=norm(q);
    const safe=chatSafety.find(item=>item.test.test(n));
    if(safe)return {text:safe.text,primary:safe.action,extra:safe.extra||[],suggestions:[]};
    if(/^(hoi|hallo|hey|goedemorgen|goedemiddag|goedenavond|hi)[! .]*$/.test(n))return {text:'Hoi! Waarover wil je iets weten? Bijvoorbeeld over geld, een activiteit, opvoeden of hulp in je wijk.',extra:[],suggestions:[]};
    if(/^(nu|en nu|wat nu|en hoe nu|wat moet ik nu doen)[!?. ]*$/.test(n)&&!lastChatTopic){
      return {text:'Kun je iets meer vertellen over wat je nu wilt weten? Bijvoorbeeld: ik heb geen inkomen, mijn kind gaat niet naar school of ik zoek een activiteit.',extra:[],suggestions:[]};
    }
    const followup=/^(nu|en nu|wat nu|en hoe nu|wat moet ik nu doen)[!?. ]*$/.test(n);
    if(followup&&lastChatTopic){
      const topic=lastChatTopic;
      const section=relevantSection(topic,'wat kan ik nu doen');
      const step=window.ED_DOSSIERS?.[topic.id]?.steps?.[0];
      const answer=step||section?.text||topic.intro;
      return {text:'Bij '+topic.title.toLocaleLowerCase('nl')+' kun je hiermee beginnen:\n\n'+answer,primary:{text:topic.title,href:topicLink(topic.id)},extra:[],suggestions:[]};
    }
    const eventWords=/(webinar|online cursus|voorlichtingsavond|online bijeenkomst|lezing)/.test(n);
    if(eventWords){
      const now=new Date().toLocaleDateString('sv-SE');
      const upcoming=(window.ED_UPDATES?.events||[]).filter(event=>event.date>=now&&(/webinar|online|lezing/i.test([event.title,event.location].join(' '))));
      const words=termsOf(q).filter(w=>!['webinar','online','cursus','lezing','bijeenkomst'].includes(w));
      const matching=words.length?upcoming.filter(e=>words.some(w=>norm([e.title,e.summary,...(e.topics||[])].join(' ')).includes(w))):upcoming;
      const chosen=(matching.length?matching:upcoming).slice().sort((a,b)=>a.date.localeCompare(b.date)).slice(0,3);
      if(chosen.length){
        const format=date=>new Date(date+'T12:00:00').toLocaleDateString('nl-NL',{day:'numeric',month:'long'});
        return {text:'Er zijn komende bijeenkomsten en webinars die je mogelijk kunt volgen:\n\n'+chosen.map(e=>'• '+e.title+' — '+format(e.date)+', '+e.time+(e.location==='Online'?' (online)':'')).join('\n')+'\n\nControleer de aanmelding bij de organisator.',primary:{text:'Agenda',href:'#/agenda'},extra:chosen.map(e=>({text:e.title,href:'#/agenda/'+e.id,note:e.source})),suggestions:[]};
      }
    }
    const found=window.ED_SEARCH.search(q,{limit:12});
    const ranked=rankTopics(q,4);
    let topic=found.topics[0]||null;
    if(/(iets doen|wat is er te doen|leuke activiteiten|activiteiten voor)/.test(n))topic=byId.get('activiteiten')||topic;
    else if(/(ik voel me eenzaam|geen vrienden|alleen voelen|sociaal contact)/.test(n))topic=byId.get('ontmoeten')||topic;
    else if(/(ik heb schulden|deurwaarder|betalingsachterstand)/.test(n))topic=byId.get('schulden')||topic;
    else if(/(autisme|autistisch|\bass\b|autismespectrum|overprikkeling)/.test(n))topic=byId.get('autisme')||topic;
    else if(/(thuiszitter|schoolstress|schoolverzuim|niet naar school)/.test(n))topic=byId.get('schoolstress')||topic;
    else if(/(baby|zwanger|borstvoeding|consultatiebureau|bevalling)/.test(n))topic=byId.get('baby')||topic;
    else if(/(wijkwijzer|waar kan ik terecht|inloopspreekuur)/.test(n))topic=byId.get('wijkwijzer')||topic;
    else if(/(geen inkomen|zonder inkomen|geen geld|rondkomen|kan niet betalen|inkomen weggevallen)/.test(n))topic=byId.get('geld')||topic;
    else if(/(baan verloren|werkloos|ontslagen|baan kwijt)/.test(n))topic=byId.get('werk')||topic;
    else if(!topic&&ranked.length)topic=ranked[0];
    const docs=found.sources.filter(item=>item.score>=12).slice(0,6);
    if(topic){
      lastChatTopic=topic;
      const section=relevantSection(topic,q);
      const dossier=window.ED_DOSSIERS?.[topic.id];
      const paragraphs=[completeText(topic.intro)];
      if(section?.text&&!norm(topic.intro).includes(norm(section.text)))paragraphs.push(completeText(section.text));
      if(/(hoe|wat kan ik|wat moet ik|waar begin|geen idee|advies|nu|stappen)/.test(n)&&dossier?.steps?.length){
        const first=completeText(dossier.steps[0]);
        if(first&&!paragraphs.some(p=>norm(p).includes(norm(first))))paragraphs.push('Eerste stap: '+first);
      }
      const text=paragraphs.filter(Boolean).join('\n\n');
      const primary={text:topic.title,href:topicLink(topic.id)};
      const extras=docs.slice(0,3).map(doc=>({text:doc.title,href:sourceRoute(doc,q),note:doc.source,type:doc.type}));
      const related=(topic.related||[]).map(id=>byId.get(id)).filter(Boolean).slice(0,2);
      const suggestions=related.map(t=>({text:t.title,href:topicLink(t.id)}));
      return {text,primary,extra:extras,suggestions};
    }
    if(docs.length){
      const best=docs[0];
      const summary=completeText(best.summary);
      const informative=summary?summary:'Ik vond informatie over '+best.title.toLocaleLowerCase('nl')+' bij '+best.source+'.';
      return {text:informative,primary:{text:best.title,href:sourceRoute(best,q)},extra:docs.slice(1,4).map(doc=>({text:doc.title,href:sourceRoute(doc,q),note:doc.source,type:doc.type})),suggestions:[]};
    }
    return {text:'Daarover heb ik nog geen duidelijk antwoord gevonden. Welke informatie zoek je precies? Bijvoorbeeld een voorziening, een activiteit of een organisatie in Enschede.',primary:{text:'Bekijk de onderwerpen',href:'#/categorie/hulp'},extra:[],suggestions:[]};
  }
  const chatLink=(item,css)=>{
    const external=/^https:\/\//.test(item.href);
    const l=a(item.href,css,item.text,external);
    if(item.note)l.append(make('small','chat-source-name',item.note));
    return l;
  };
  function answer(question){
    const q=String(question||'').trim().slice(0,220);if(!q)return;
    $('#chat-suggestions')?.remove();
    const result=composeChatReply(q);
    const turn=make('div','chat-turn');
    turn.append(make('div','chat-bubble user',q));
    const reply=make('div','chat-reply');
    reply.append(make('div','chat-bubble bot',result.text));
    if(result.primary)reply.append(chatLink(result.primary,'chat-primary-action'));
    if(result.extra.length||result.suggestions.length){
      const detail=make('details','chat-details');
      detail.append(make('summary',null,'Meer informatie'+(result.extra.length?' ('+result.extra.length+')':'')));
      const inside=make('div','chat-details-content');
      for(const item of result.extra)inside.append(chatLink(item,'chat-detail-link'));
      if(result.suggestions.length){
        const related=make('div','chat-related');related.append(make('small',null,'Gerelateerde onderwerpen'));
        for(const item of result.suggestions)related.append(chatLink(item,'chat-related-link'));
        inside.append(related);
      }
      detail.append(inside);reply.append(detail);
    }
    turn.append(reply);chatStream.classList.add('chat-has-answers');chatStream.append(turn);
    // Toon de bovenkant van het nieuwe antwoord, in plaats van naar de laatste bronlink te springen.
    requestAnimationFrame(()=>{
      const streamTop=chatStream.getBoundingClientRect().top;
      const replyTop=reply.getBoundingClientRect().top;
      chatStream.scrollTop+=replyTop-streamTop-10;
    });
  }
  chatForm.addEventListener('submit',e=>{e.preventDefault();const text=chatInput.value;chatInput.value='';answer(text);chatInput.focus();});
  document.querySelectorAll('#chat-dialog [data-question]').forEach(button=>button.addEventListener('click',()=>answer(button.dataset.question)));
  // Behulpzame beginvragen zonder gepersonaliseerde verwerking.
  window.ED_DEBUG={rankTopics,search:(q)=>window.ED_SEARCH.search(q),chat:composeChatReply,topics:byId,categories:categoryById};
})();