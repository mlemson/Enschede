'use strict';

// Alleen vaste lokale gegevens. Geen API-calls, trackers, cookies of localStorage.
const WIJKWIJZERS = [
  {name:'Wijkwijzer Centrum', area:'Centrum', address:'Hoge Bothofstraat 49, Enschede', detail:'Performance Factory · gebouw Oost', hours:'Di & do · 09.00–12.00'},
  {name:'Wijkwijzer de Magneet', area:'Zuid', address:'Hertmebrink 1, Enschede', detail:'Wesselerbrink', hours:'Ma · 14.00–17.00 · wo · 09.00–12.00'},
  {name:'Wijkwijzer Stroinkshuis', area:'Zuid', address:'Het Stroink 64, Enschede', detail:'Stroinkslanden', hours:'Di · 14.00–17.00 · do · 09.00–12.00'},
  {name:"Wijkwijzer ’t Proathuus", area:'Noord', address:'Zevensterstraat 3, Enschede', detail:'Twekkelerveld', hours:'Wo · 09.00–12.00 · do · 14.00–17.00'},
  {name:'Wijkwijzer Het Kompas', area:'Noord', address:'Lijsterstraat 11, Enschede', detail:'Prismare', hours:'Ma & do · 09.00–12.00'},
  {name:'Wijkwijzer Lumen / Vosta', area:'Oost', address:'Velveweg 54, Enschede', detail:'Di: Lumen · do: Vosta', hours:'Di & do · 14.00–17.00', routes:[{label:'Di · Lumen',address:'Velveweg 54, Enschede'},{label:'Do · Vosta',address:'Minkmaatstraat 173, Enschede'}]},
  {name:'Wijkwijzer de Dorpskamer', area:'Oost', address:'Schipholtstraat 48B, Glanerbrug', detail:'Glanerbrug', hours:'Ma · 14.00–17.00 · wo · 09.00–12.00'},
  {name:'Wijkwijzer De Vrije Ruimte / Ontmoetingskerk', area:'Oost', address:'Olympialaan 20, Enschede', detail:'Ma: De Vrije Ruimte · wo: Ontmoetingskerk', hours:'Ma · 09.00–12.00 · wo · 14.00–17.00', routes:[{label:'Ma · Vrije Ruimte',address:'Olympialaan 20, Enschede'},{label:'Wo · Ontmoetingskerk',address:'Doctor Wagenaarstraat 6, Enschede'}]},
  {name:'Wijkwijzer de Boei', area:'West', address:'Spinnerstraat 27A, Enschede', detail:'Pathmos', hours:'Ma · 14.00–17.00 · do · 09.00–12.00'},
  {name:'Wijkwijzer Boswinkel', area:'West', address:'Noordhollandstraat 4, Enschede', detail:'Di: ’t Ni-je Terphoes · vr: speeltuin Boswinkel', hours:'Di · 14.00–17.00 · vr · 09.00–12.00', routes:[{label:'Di · Terphoes',address:'Noordhollandstraat 4, Enschede'},{label:'Vr · Speeltuin',address:'Beneluxlaan 50, Enschede'}]}
];
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const icon = (name) => {const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('class','icon');s.setAttribute('aria-hidden','true');const u=document.createElementNS('http://www.w3.org/2000/svg','use');u.setAttribute('href','#i-'+name);s.appendChild(u);return s;};
const node = (tag, cls, text) => {const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
const mapLink = address=>'https://www.openstreetmap.org/search?query='+encodeURIComponent(address);
let showAllLocations=false;
function renderLocations(){
  const area=$('#neighborhood-select').value;const entries=area==='Alle stadsdelen'?WIJKWIJZERS:WIJKWIJZERS.filter(p=>p.area===area);
  const visible=showAllLocations?entries:entries.slice(0,3);
  const grid=$('#neighborhood-grid');grid.replaceChildren();
  for(const location of visible){
    const card=node('article','neighborhood-card');card.append(node('span','region',location.area),node('h3','',location.name),node('p','',location.detail+(location.routes?'':' · '+location.address)));
    const bottom=node('div','card-bottom');const hours=node('span','hours-badge');hours.append(icon('clock'),document.createTextNode(location.hours));
    bottom.append(hours);card.append(bottom);
    const routes=node('div','location-routes');
    const stops=location.routes||[{label:'Route',address:location.address}];
    for(const stop of stops){
      const a=node('a','route-link',stop.label);a.href=mapLink(stop.address);a.target='_blank';a.rel='noopener noreferrer';a.append(icon('arrow'));a.setAttribute('aria-label',stop.label+' naar '+location.name+' ('+stop.address+') via OpenStreetMap');
      routes.append(a);
    }
    card.append(routes);grid.append(card);
  }
  const btn=$('#show-all-locations');
  if(entries.length<=3){btn.hidden=true;}else{btn.hidden=false;btn.replaceChildren(document.createTextNode(showAllLocations?'Toon minder locaties':'Bekijk alle '+entries.length+' Wijkwijzers'),icon('arrow'));}
}
$('#neighborhood-select').addEventListener('change',()=>{showAllLocations=false;renderLocations();});
$('#show-all-locations').addEventListener('click',()=>{showAllLocations=!showAllLocations;renderLocations();});
renderLocations();

// Agenda en nieuws worden nu opgebouwd uit de redactionele updatecatalogus.
// De professional-ingang opent de eigen informatiepagina.
const audience=$('#audience-switch');
audience.addEventListener('click',()=>{location.hash='#/categorie/professionals';});

const backdrop=$('#dialog-backdrop'),chat=$('#chat-dialog'),privacy=$('#privacy-dialog');let returnFocus=null;
function openDialog(dialog,focusSelector){if(!chat.hidden)closeDialog(chat,false);if(!privacy.hidden)closeDialog(privacy,false);returnFocus=document.activeElement;dialog.hidden=false;backdrop.hidden=false;document.body.style.overflow='hidden';const focus=$(focusSelector,dialog);if(focus)focus.focus();}
function closeDialog(dialog,restore=true){dialog.hidden=true;backdrop.hidden=true;document.body.style.overflow='';if(restore&&returnFocus&&returnFocus.isConnected)returnFocus.focus();}
$('#chat-open').addEventListener('click',()=>openDialog(chat,'#chat-input'));
$('#mobile-chat-open').addEventListener('click',()=>openDialog(chat,'#chat-input'));
$('#chat-close').addEventListener('click',()=>closeDialog(chat));
$('#privacy-open').addEventListener('click',()=>openDialog(privacy,'#privacy-close'));
$('#privacy-close').addEventListener('click',()=>closeDialog(privacy));
backdrop.addEventListener('click',()=>{if(!chat.hidden)closeDialog(chat);if(!privacy.hidden)closeDialog(privacy);});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){if(!chat.hidden)closeDialog(chat);else if(!privacy.hidden)closeDialog(privacy);return;}
  if(e.key==='Tab'&&!chat.hidden)trapFocus(e,chat);
  else if(e.key==='Tab'&&!privacy.hidden)trapFocus(e,privacy);
});
function trapFocus(e,dialog){const els=$$('a[href],button:not([disabled]),input:not([disabled])',dialog).filter(el=>el.getClientRects().length);if(!els.length)return;const first=els[0],last=els[els.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}

if('serviceWorker' in navigator && location.protocol.startsWith('http')){
  window.addEventListener('load',()=>{navigator.serviceWorker.register('./sw.js').catch(()=>{});});
}

// Installeerknop alleen wanneer de browser daadwerkelijk een installatie-aanbod geeft.
let installPrompt=null;
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;$('#install-app').hidden=false;});
$('#install-app').addEventListener('click',async()=>{if(!installPrompt)return;const prompt=installPrompt;installPrompt=null;$('#install-app').hidden=true;await prompt.prompt();});
window.addEventListener('appinstalled',()=>{$('#install-app').hidden=true;installPrompt=null;});

// Mobiel: markeer de sectie waar je bent.
if('IntersectionObserver' in window){
  const sectionToTab={activiteiten:'#activiteiten','mijn-buurt':'#mijn-buurt',hulp:'#hulp',boven:'#boven'};
  const tabs=$$('.mobile-tabs a');
  const observer=new IntersectionObserver(entries=>{
    for(const item of entries){if(!item.isIntersecting)continue;const href=sectionToTab[item.target.id];if(!href)continue;for(const tab of tabs){const active=tab.getAttribute('href')===href;tab.classList.toggle('tab-current',active);if(active)tab.setAttribute('aria-current','page');else tab.removeAttribute('aria-current');}}
  },{rootMargin:'-10% 0px -65% 0px'});
  Object.keys(sectionToTab).forEach(id=>{const section=document.getElementById(id);if(section)observer.observe(section);});
}

