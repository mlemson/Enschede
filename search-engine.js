'use strict';
// Geen API-aanroepen: bezoekers doorzoeken een vooraf opgebouwde index op hun eigen apparaat.
(function () {
  const stop = new Set(['helpen','help','ik','mij','mijn','wil','wilde','zoek','zoeken','graag','meer','over','van','wat','waar','wanneer','wie','hoe','kan','kun','heb','heeft','hebben','zijn','het','een','met','naar','voor','door','bij','ook','dat','deze','er','nog','niet','dit','die','hier','daar','maar','wel','iets','doen','informatie','hulp','advies','nodig','en','of','op','in','aan','om','te','de','het','je','jij','uw','jouw','zou','al','uit','als','mensen','enschede']);
  const normalize = value => String(value||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\p{L}\p{N}]+/gu,' ').replace(/\s+/g,' ').trim();
  const stems = token => {
    // Geen vaste onderwerpenlijst. Kleine taalvarianten en veelgebruikte afkortingen.
    const out=new Set([token]);
    if(token.length>5 && token.endsWith('en'))out.add(token.slice(0,-2));
    if(token.length>5 && token.endsWith('s'))out.add(token.slice(0,-1));
    return out;
  };
  const aliases = [
    ['autisme','ass','autismespectrumstoornis','autistisch'],
    ['geld','financieel','financien','geldzorgen'],
    ['activiteiten','activiteit','bijeenkomst'],
    ['vrijwilligerswerk','vrijwilliger','vrijwilligers'],
    ['schuld','schulden','betalingsachterstand','betaalproblemen'],
    ['wijkteam','wijkteams','wijkcoach'],
    ['wachttijd','wachttijden','wachtlijst','wachtlijsten'],
    ['eenzaam','eenzaamheid','isolement'],
    ['kind','kinderen','jeugd'],
    ['samenleven','ontmoeten','ontmoeting']
  ];
  const variants=new Map();for(const terms of aliases)for(const term of terms)variants.set(term,terms);
  const tokenize = value => normalize(value).split(' ').filter(token=>token.length>=2&&!stop.has(token));
  const expand=token=>new Set([...(variants.get(token)||[token]),...stems(token)]);
  const includesToken=(target,word)=>target===word||word.length>=5 && target.startsWith(word) || word.length>=5 && word.startsWith(target);
  const contains=(arr,word)=>arr.some(v=>includesToken(v,word));
  const matches=(haystack,word)=>[...expand(word)].some(w=>contains(haystack,w));
  const uniqueTokens=(str)=>[...new Set(tokenize(str))];
  const index=window.ED_SOURCE_INDEX||{checked:null,items:[],note:'Er is nog geen bronindex beschikbaar.'};
  const sourceItems=Array.isArray(index.items)?index.items.slice():[];
  const updates=window.ED_UPDATES||{events:[],recurring:[],news:[]};
  const auto=window.ED_AUTO_UPDATES||{events:[],news:[]};
  for(const e of [...updates.events,...updates.recurring,...(auto.events||[])].filter(x=>!x.date||x.date>=new Date().toLocaleDateString('sv-SE')))sourceItems.push({id:'agenda-'+e.id,title:e.title,type:'activiteit',source:e.source,url:e.url,internal:'#/agenda/'+e.id,summary:e.summary,terms:[e.location,e.area,e.category,e.time||e.frequency,...(e.topics||[])].join(' '),segments:[e.summary],checked:updates.checked});
  for(const n of [...updates.news,...(auto.news||[])].filter(x=>!x.expires||x.expires>=new Date().toLocaleDateString('sv-SE')))sourceItems.push({id:'nieuws-'+n.id,title:n.title,type:'informatie',source:n.source,url:n.url,internal:'#/nieuws/'+n.id,summary:n.summary,terms:[n.area,n.category,...(n.topics||[])].join(' '),segments:[n.description],checked:updates.checked});
  const ownItems=(window.ED_CONTENT?.topics||[]);
  const sources=sourceItems.filter(item=>item&&/^https:\/\//.test(item.url||'')).map(item=>{
    const excerpts=Array.isArray(item.segments)?item.segments:[];
    return {...item,_title:uniqueTokens(item.title),_body:uniqueTokens([item.summary,item.terms||'',...excerpts].join(' ')),_excerpts:excerpts.map(seg=>({text:seg,words:uniqueTokens(seg)}))};
  });
  const topics=ownItems.map(t=>({...t,_title:uniqueTokens(t.title),_body:uniqueTokens([t.title,t.tag,t.summary,t.intro,t.keywords||'',...t.sections.flatMap(s=>[s.title,s.text||'',...(s.bullets||[])]),window.ED_DOSSIERS?.[t.id]?.intro||'',...(window.ED_DOSSIERS?.[t.id]?.steps||[]),...(window.ED_DOSSIERS?.[t.id]?.local||[]).flat()].join(' '))}));
  function scoreItem(item,query){
    const words=tokenize(query);if(!words.length)return 0;
    const matching=words.filter(w=>matches(item._title,w)||matches(item._body,w));
    if(!matching.length)return 0;
    if(words.length>=2 && matching.length/words.length<0.65) return 0;
    let score=0;
    for(const w of matching){
      if(matches(item._title,w))score+=26;
      else score+=7;
    }
    if(matching.length===words.length)score+=18+words.length*3;
    if(normalize(item.title)===normalize(query))score+=70;
    if(normalize(item.title).includes(normalize(query)) && query.trim().length>=4)score+=24;
    if(item.type==='informatie')score+=1;
    // Beter meerdere relevante woorden dan één vaak voorkomend woord.
    score*=.45+.55*(matching.length/words.length);
    return score;
  }
  function excerptFor(doc,query){
    const words=tokenize(query);
    if(!doc._excerpts.length)return doc.summary||'';
    const best=[...doc._excerpts].map((seg,i)=>({seg,i,score:words.reduce((score,w)=>score+(matches(seg.words,w)?2:0),0)})).sort((a,b)=>b.score-a.score||a.i-b.i)[0];
    return best.score?best.seg.text:(doc.summary||best.seg.text);
  }
  function search(query,{limit=40}={}){
    const q=String(query||'').trim().slice(0,180);
    if(q.length<2||!tokenize(q).length)return {topics:[],sources:[],count:0,checked:index.checked,note:index.note||''};
    const own=topics.map(item=>({item,score:scoreItem(item,q)})).filter(r=>r.score>0).sort((a,b)=>b.score-a.score).slice(0,7).map(x=>({...x.item,score:x.score}));
    const found=sources.map(item=>({item,score:scoreItem(item,q)})).filter(r=>r.score>0).sort((a,b)=>b.score-a.score||a.item.title.localeCompare(b.item.title,'nl'));
    return {topics:own,sources:found.slice(0,limit).map(({item,score})=>({...item,score,excerpt:excerptFor(item,q)})),count:found.length,checked:index.checked,note:index.note||''};
  }
  window.ED_SEARCH={search,items:sources,normalize,tokenize,checked:index.checked,note:index.note};
})();

