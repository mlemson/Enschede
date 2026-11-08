'use strict';
// Aanvullende redactionele informatie in eigen woorden. Bronnen gecontroleerd op 8 november 2026.
// Geen live scraping in de browser; geen persoonsgegevens of externe AI.
(() => {
  const content = window.ED_CONTENT;
  if (!content) return;
  const sections = {
    autisme: [
      ['Prikkelverwerking en dagelijkse structuur','Bij autisme (ASS) kunnen prikkels, veranderingen of onduidelijke verwachtingen veel energie kosten. Vraag wat iemand zelf prettig vindt en kijk samen naar heldere afspraken, herstelmomenten en een rustige omgeving. Niet iedereen met autisme heeft dezelfde behoeften.'],
      ['Opgroeien en passend aanbod','Bij zorgen over een kind kun je met school, LOES, GGD Jeugdgezondheid of de huisarts praten. Voor aanvullende voorzieningen en groepen zijn Waar in Twente en de Wijkwijzer bruikbare ingangen. Controleer of een activiteit toegankelijk is en wat er aan begeleiding mogelijk is.']
    ],
    eenzaamheid: [
      ['Ontmoeting op eigen tempo','Een wijkcentrum, wandelgroep, taaltafel of vaste koffie-inloop kan een eerste stap zijn. Je hoeft niet direct een groot sociaal netwerk op te bouwen: regelmatig op één vertrouwde plek komen helpt soms al.'],
      ['Een maatje of steun','M-Pact en lokale organisaties kennen maatjesprojecten, vrijwilligerswerk en ontmoetingsmogelijkheden. Voel je je vaak alleen of somber, dan kun je ook je huisarts of het wijkteam om advies vragen.']
    ],
    energie: [
      ['Energiekosten begrijpen','Bekijk je termijnbedrag en jaarafrekening apart. Controleer hoeveel je verbruikt en of een rekening ineens hoger is geworden. Vraag zo nodig hulp om de afrekening of een betalingsregeling te begrijpen.'],
      ['Energie besparen of ondersteuning vragen','Sommige maatregelen kosten weinig, zoals tocht beperken of korter douchen. Voor ingrijpende maatregelen of tegemoetkomingen kunnen voorwaarden gelden. Bij geldzorgen kan de Wijkwijzer helpen zoeken naar actuele regelingen.']
    ],
    dementie: [
      ['Bij geheugenproblemen','Vergeetachtigheid heeft verschillende mogelijke oorzaken. Bij aanhoudende zorgen is de huisarts een goed eerste aanspreekpunt. Familie en mantelzorgers kunnen helpen om veranderingen en praktische vragen op een rij te zetten.'],
      ['Steun voor naasten','Mantelzorg kan zwaar worden als een naaste steeds meer hulp nodig heeft. Vraag naar ontmoetingsgroepen, praktische ondersteuning of mogelijkheden om zorgtaken tijdelijk te delen. Een wijkteam kan helpen om voorzieningen te verkennen.']
    ],
    geld: [
      ['Wat als je inkomen wegvalt?', 'Kijk eerst of je recht hebt op een uitkering of toeslag en welke betalingsverplichtingen direct aandacht nodig hebben. Verlies je je baan, dan kan UWV informatie geven over WW. Bij onvoldoende inkomen kan de gemeente uitleg geven over bijstand. Vraag tijdig advies, want de datum van aanvragen kan belangrijk zijn.'],
      ['Welke hulp is er in Enschede?', 'Voor gemeentelijke regelingen, bijzondere bijstand en voorzieningen bij een laag inkomen kijk je op de website van de gemeente. Bij ingewikkelde brieven, aanvragen of zorgen over dagelijkse kosten helpt een Wijkwijzer je verder. Bij betalingsachterstanden kun je schuldhulp bespreken, ook voordat schulden oplopen.']
    ],
    schulden: [
      ['Wat heeft voorrang?', 'Open brieven en noteer bedragen, betalingsdata en contactpersonen. Neem vooral een aankondiging van afsluiting of huisuitzetting serieus. Vraag bij verhuurder of leverancier naar mogelijkheden en schakel zo nodig direct schuldhulp in.'],
      ['Hulp is meer dan een regeling', 'Schuldhulp kan bestaan uit een overzicht maken, afspraken met schuldeisers, budgetadvies of een uitgebreider traject. Een Wijkwijzer kan helpen om de juiste ingang te vinden. Een schuldhulpverlener kan beoordelen wat in jouw situatie mogelijk is.']
    ],
    toeslagen: [
      ['Toeslagen veranderen mee', 'Een nieuw inkomen, scheiding, verhuizing of veranderende gezinssituatie kan gevolgen hebben voor huurtoeslag, zorgtoeslag of kindgebonden budget. Controleer je gegevens op de officiële site van Dienst Toeslagen en wijzig ze wanneer dat nodig is.'],
      ['Gemeentelijke hulp naast landelijke toeslagen', 'Naast landelijke toeslagen bestaan gemeentelijke regelingen, bijvoorbeeld voor bijzondere noodzakelijke kosten. Controleer steeds de voorwaarden en eventuele aanvraagtermijn; niet iedere regeling geldt automatisch voor iedereen met weinig inkomen.']
    ],
    administratie: [
      ['Wat als je een brief niet begrijpt?', 'Bewaar de envelop en kijk naar de datum waarop je moet reageren. Vraag uitleg aan de organisatie zelf of neem de brief mee naar de Wijkwijzer. Maak een foto of kopie voor je eigen administratie, maar deel in een chat geen persoonlijke gegevens.'],
      ['Digitaal aanvragen', 'Voor online overheidszaken kun je terecht bij het Informatiepunt Digitale Overheid van de bibliotheek. Een medewerker kan uitleg geven over formulieren en inloggen. Geef je DigiD-inloggegevens of wachtwoorden niet aan anderen.']
    ],
    kindpakket: [
      ['Meedoen op school en daarbuiten', 'Een financiële bijdrage kan bijvoorbeeld nodig zijn voor school, sport, cultuur of een fiets. Welke kosten binnen een regeling vallen, hangt af van de actuele voorwaarden en de leeftijd van het kind.'],
      ['Zo zoek je gericht', 'Beschrijf waarvoor je een bijdrage zoekt en controleer het gemeentelijke overzicht van regelingen. Een Wijkwijzer kan helpen als niet duidelijk is waar je moet aanvragen of welke bewijsstukken nodig zijn.']
    ],
    activiteiten: [
      ['Wat past bij jou?', 'Je kunt kiezen uit wekelijkse inlopen, wandelgroepen, sport, creatieve lessen, culturele activiteiten en bijeenkomsten voor ouders en kinderen. Veel aanbod is vrij toegankelijk, maar kosten en aanmelden verschillen per organisatie.'],
      ['Ook online', 'Voor inwoners van Enschede kunnen online cursussen en webinars over bijvoorbeeld opvoeding of gezondheid handig zijn. In de agenda staan alleen evenementen met een controleerbare bron, datum en een passende locatie of online deelname.']
    ],
    ontmoeten: [
      ['Begin klein', 'Een koffiemoment of een vaste activiteit in een buurthuis is vaak toegankelijker dan een grote bijeenkomst. Je kunt bij een Wijkwijzer of buurtwerker vragen welke inloop rustig is, wat er gebeurt en of je iemand mee mag nemen.'],
      ['Een maatje of groep', 'M-Pact en lokale organisaties bieden verschillende vormen van maatjescontact en vrijwilligerswerk. Sommige activiteiten zijn bedoeld voor een bepaalde doelgroep; vraag gerust of er iets is dat aansluit op jouw interesses.']
    ],
    sport: [
      ['Verschillende manieren om te bewegen', 'Niet iedereen wil lid worden van een vereniging. Wandelen, ouder-kind-bewegen, kennismakingslessen en laagdrempelige groepen kunnen een goede start zijn. Sportaal helpt bij het vinden van beweegaanbod in de stad.'],
      ['Kosten en toegankelijkheid', 'Vraag vooraf naar materiaal, toegankelijkheid, leeftijd, eigen bijdrage en eventuele proefles. Als geld een belemmering is, kunnen gemeentelijke regelingen voor kinderen of andere hulp mogelijk zijn.']
    ],
    vrijwilligerswerk: [
      ['Wat kan ik betekenen?', 'Een luisterend oor, activiteiten organiseren, taal oefenen, iets repareren of iemand begeleiden naar een ontmoetingsplek: het aanbod is divers. Vertel hoeveel tijd je hebt, wat je leuk vindt en welke taken je liever niet doet.'],
      ['Begeleiding en grenzen', 'Bij veel organisaties is er een kennismaking en krijg je uitleg over begeleiding, veiligheid en verwachtingen. Sommige functies vragen een VOG. Bij M-Pact kun je gericht zoeken naar passend werk of trainingen voor vrijwilligers.']
    ],
    opvoeden: [
      ['Van baby tot puber', 'Vragen over slapen, huilen, grenzen, ruzie, schermgebruik en school komen vaak voor. De leeftijd van je kind maakt verschil: bij jonge kinderen gaat het vaak om voorspelbaarheid en oefenen, terwijl tieners steeds meer eigen ruimte nodig hebben. LOES heeft tips per leeftijd en onderwerp.'],
      ['Wie kan persoonlijk meedenken?', 'LOES geeft gratis opvoedinformatie en beantwoordt vragen in Twente. Voor groei, gezondheid, gedrag en ontwikkeling kun je ook terecht bij GGD Twente Jeugdgezondheid. Die biedt onder meer begeleiding van gezinnen met opvoedvragen. Bij zorgen over de veiligheid of ernstige problemen is verdere professionele hulp soms nodig.'],
      ['Opvoeden en sociale media', 'Maak afspraken over schermgebruik die passen bij de leeftijd, bespreek wat kinderen online meemaken en blijf geïnteresseerd zonder direct te veroordelen. In de agenda staan webinars en bijeenkomsten over digitale opvoeding.']
    ],
    jeugdactiviteiten: [
      ['Voor verschillende leeftijden', 'Denk aan peuteractiviteiten, ouder-kindcafés, sport, jongereninlopen, creatieve clubs en bijeenkomsten voor ouders. Alifa en andere organisaties bieden aanbod in verschillende stadsdelen. LOES organiseert ook bijeenkomsten en online webinars.'],
      ['Zo vind je iets passends', 'Filter de agenda op jeugd en gezin of zoek op de leeftijd van je kind. Let op het verschil tussen een open inloop, een eenmalige activiteit en een cursus waarvoor aanmelden nodig is.']
    ],
    scheiden: [
      ['Wat merken kinderen?', 'Kinderen kunnen verdrietig, boos, stil of onzeker worden als ouders uit elkaar gaan. Vertel op een manier die past bij hun leeftijd wat er verandert en benadruk dat zij niet hoeven te kiezen tussen ouders. LOES heeft uitleg over kinderen begeleiden bij scheiding.'],
      ['Praktische afspraken', 'Bespreek hoe zorg, contact, school en belangrijke beslissingen worden geregeld. Voor juridische of financiële vragen kan andere deskundigheid nodig zijn. Bij aanhoudende spanning of zorgen over kinderen kan het wijkteam of een opvoedadviseur meedenken.']
    ],
    wonen: [
      ['Woonprobleem of spoed?', 'Er is verschil tussen een vraag over huren, een conflict met buren en een situatie waarin je je woning dreigt te verliezen. Bij dreigende huisuitzetting of dakloosheid is het verstandig onmiddellijk contact te zoeken met verhuurder, gemeente of passende hulp.'],
      ['Waar krijg je advies?', 'Vraag aan een verhuurder of woningcorporatie hoe een huurvraag kan worden opgelost. Voor sociale of praktische ondersteuning kan de Wijkwijzer helpen zoeken. Online Hulp Enschede verzamelt informatie over woonoverlast, opvang en woonbegeleiding.']
    ],
    gezondheid: [
      ['Gezondheid is meer dan lichamelijke klachten', 'Stress, slaap, eenzaamheid, dagelijks functioneren en sociale contacten kunnen elkaar beïnvloeden. Bespreek medische vragen of aanhoudende psychische klachten met een huisarts. Buurtactiviteiten kunnen aanvullend helpen, maar vervangen geen behandeling.'],
      ['Gezond opgroeien', 'GGD Twente Jeugdgezondheid volgt de ontwikkeling van kinderen, biedt contactmomenten, informatie over vaccinaties en advies bij vragen over groei, gezondheid en opvoeding. Ouders kunnen rechtstreeks contact opnemen met Jeugdgezondheid.']
    ],
    relaties: [
      ['Contact en grenzen', 'Probeer in een rustig gesprek te benoemen wat je nodig hebt, luister naar de ander en maak afspraken die haalbaar zijn. Lukt contact niet of loopt spanning op, dan kan het helpen om met iemand buiten de situatie te praten.'],
      ['Als het niet veilig voelt', 'Bij dreiging, controle of geweld is gewone relatiebemiddeling niet altijd passend. Vraag advies aan Veilig Thuis via 0800-2000, en bel 112 bij direct gevaar.']
    ],
    mantelzorg: [
      ['Herken overbelasting', 'Zorgen voor een naaste kan veel betekenen, maar ook zwaar worden. Je kunt merken dat rust, werk, sociale contacten of eigen gezondheid in de knel komen. Bespreek vroeg welke zorgtaken gedeeld kunnen worden.'],
      ['Welke ondersteuning is mogelijk?', 'Informele hulp, een maatje, dagactiviteiten of tijdelijke overname van zorgtaken kunnen lucht geven. Een Wijkwijzer of wijkteam kan met je meedenken over passende ondersteuning en de voorwaarden daarvan.']
    ],
    rouw: [
      ['Verdriet verloopt niet voor iedereen hetzelfde', 'Na een overlijden of andere ingrijpende verandering wisselen verdriet, boosheid, opluchting of onzekerheid elkaar soms af. Er bestaat geen vaste tijd waarbinnen je je beter moet voelen.'],
      ['Wanneer om steun vragen?', 'Als je vastloopt in je dagelijkse leven of behoefte hebt aan contact, kun je dit bespreken met mensen in je omgeving, huisarts of wijkteam. Soms is een gespreksgroep of lotgenotencontact passend.']
    ],
    zorg: [
      ['Welke soort hulp zoek je?', 'Een vraag over opvoeden, geld of meedoen kan vaak beginnen met een vrije inloop of algemene voorziening. Voor langdurige begeleiding of specifieke zorg kunnen andere voorwaarden, verwijzingen of beschikkingen gelden.'],
      ['Bereid een hulpgesprek voor', 'Schrijf op wat je zelf nog kunt, waar je tegenaan loopt en wat je al hebt geprobeerd. Je mag vragen welke mogelijkheden er zijn en je kunt ondersteuning vragen bij de voorbereiding, bijvoorbeeld van een onafhankelijke cliëntondersteuner.']
    ],
    wijkwijzer: [
      ['Een vraag hoeft niet meteen een aanvraag te zijn', 'Bij de Wijkwijzer kun je met verschillende praktische vragen binnenlopen. Bijvoorbeeld over geld, brieven, activiteiten, opvoeden of een passende organisatie. Je kunt ook vragen welke buurtvoorzieningen vrij toegankelijk zijn.'],
      ['Controleer de locatie', 'Enschede heeft meerdere Wijkwijzer-locaties. Openingstijden, gezamenlijke spreekuren en partners kunnen verschillen. Bekijk daarom voor een bezoek de officiële contact- en openingstijdenpagina.']
    ],
    taal: [
      ['Oefenen met Nederlands en digitaal', 'Taalgroepen, bibliotheekactiviteiten en cursussen helpen je om te oefenen met spreken, lezen en omgaan met de computer. Vraag wat het instapniveau is en of je zonder aanmelding kunt deelnemen.'],
      ['Brieven en online overheid', 'Het Informatiepunt Digitale Overheid van de bibliotheek kan uitleg geven over websites van de overheid en digitale aanvragen. Voor ingewikkelde persoonlijke geldvragen of administratie kun je ook bij de Wijkwijzer terecht.']
    ],
    werk: [
      ['Werk zoeken of werk verliezen', 'Voor vacatures, omscholing en inkomen bestaan verschillende ingangen. Kijk bij verlies van werk eerst naar een mogelijke WW-uitkering of andere inkomensondersteuning; controleer of er aanvraagtermijnen zijn.'],
      ['Daginvulling en meedoen', 'Soms is betaald werk niet de eerste stap. Vrijwilligerswerk, oefenen met taal, een ontmoetingsactiviteit of begeleide daginvulling kunnen passen bij je doelen. Bespreek wat haalbaar en gewenst is; een indicatie is niet voor elke activiteit nodig.']
    ],
    jeugdhulp: [
      ['Van opvoedvraag tot specialistische jeugdhulp', 'Niet iedere vraag over opvoeden vraagt om jeugdhulp. Je kunt vaak beginnen bij LOES, GGD Twente, school of het wijkteam. Als specialistische hulp nodig is, kun je bespreken wat de passende toegang en verwijzing is.'],
      ['Wachttijden vergelijken', 'Jeugdhulptwente.nl toont een onafhankelijk overzicht van wachttijden, behandelingen en aanbieders in Twente. Wachttijden wisselen en zijn niet voor iedere behandeling of doelgroep hetzelfde. Controleer de actuele beschikbaarheid bij de aanbieder en bekijk aanvullende gegevens waar nodig.']
    ],
    veiligheid: [
      ['Als je je thuis niet veilig voelt', 'Geweld kan lichamelijk, psychisch of seksueel zijn en kan ook kinderen raken die het meemaken. Je kunt advies vragen aan Veilig Thuis, ook als je twijfelt of je situatie onder huiselijk geweld valt.'],
      ['Direct gevaar', 'Bij onmiddellijk gevaar bel je 112. Voor advies over huiselijk geweld en kindermishandeling kun je contact opnemen met Veilig Thuis via 0800-2000. Deel gevoelige details liever rechtstreeks met een hulpverlener dan in deze zoekhulp.']
    ]
  };
  for (const topic of content.topics) {
    if (!sections[topic.id]) continue;
    const present=new Set(topic.sections.map(s=>s.title.toLocaleLowerCase('nl')));
    for (const [title,text] of sections[topic.id]) if (!present.has(title.toLocaleLowerCase('nl'))) topic.sections.push({title,text});
  }
  const newTopics=[
    {id:'autisme',title:'Autisme & prikkelverwerking',tag:'Opgroeien & welzijn',icon:'♡',tone:'lilac',category:'jeugd',summary:'Informatie over autisme, ASS, overprikkeling, school en passende ondersteuning.',intro:'Autisme (ASS) kan invloed hebben op hoe iemand informatie, sociale situaties en prikkels ervaart. Wat werkt, verschilt per persoon.',keywords:'autisme ASS autistisch prikkelgevoelig prikkels overprikkeling neurodiversiteit school diagnostiek begeleiding',sections:[{title:'Wat kan helpen?',text:'Bespreek concreet welke situaties moeilijk zijn, bijvoorbeeld veranderingen, drukte, onduidelijke verwachtingen of herstel na sociale activiteiten. Rust, voorspelbaarheid en duidelijke afspraken kunnen helpen, maar er bestaat geen aanpak die voor iedereen werkt.'},{title:'Kinderen en school',text:'Bij zorgen over ontwikkeling, gedrag of schoolbelasting kun je praten met school, Jeugdgezondheid van GGD Twente of je huisarts. LOES heeft algemene opvoedinformatie; bij specifieke ondersteuningsvragen kan het wijkteam meedenken. De webinaragenda bevat ook bijeenkomsten over schoolstress en thuiszitten.'},{title:'Activiteiten en passende plekken',text:'Zoek naar laagdrempelige activiteiten en vraag vooraf naar groepsgrootte, geluidsniveau of de mogelijkheid om rustig kennis te maken. In Waar in Twente staan lokale voorzieningen; Jeugdhulp Twente bevat gegevens over aanbieders en expertise.'}],links:[{title:'LOES – opvoedinformatie',url:'https://loes.nl/informatie-en-tips',note:'Tips voor ouders per leeftijd'},{title:'GGD Twente – Jeugdgezondheid',url:'https://www.ggdtwente.nl/contact/jeugdgezondheid/contact-met-jeugdgezondheid',note:'Vragen over ontwikkeling'},{title:'Jeugdhulp Twente',url:'https://jeugdhulptwente.nl/',note:'Aanbieders en wachttijden'},{title:'Waar in Twente',url:'https://waarintwente.nl/',note:'Lokale voorzieningen'}],related:['opvoeden','gezondheid','jeugdhulp','activiteiten']},
    {id:'baby',title:'Zwangerschap & baby',tag:'Jeugd & gezin',icon:'♡',tone:'peach',category:'jeugd',summary:'Voorbereiden op een baby, voeding, slapen en hulp in de eerste jaren.',intro:'Van zwangerschap tot de eerste jaren zijn er nieuwe vragen over voeding, groei, slaap en opvoeden. LOES en GGD Twente bundelen informatie en ondersteuning.',keywords:'zwanger zwangerschap baby bevallen kraamzorg borstvoeding flesvoeding slapen huilen consultatiebureau ouder kind',sections:[{title:'Voor de geboorte',text:'LOES heeft uitleg over de zwangerschap, voorbereiden op een bevalling en het eerste contact met je baby. Voor medische vragen blijf je bij je verloskundige of arts.'},{title:'Na de geboorte',text:'Het consultatiebureau van GGD Twente volgt onder andere groei en ontwikkeling en geeft advies over voeding en verzorging. Ouders kunnen vragen stellen aan de jeugdverpleegkundige of jeugdarts.'},{title:'Activiteiten en contact',text:'In de agenda staan waar mogelijk ouder-kindcafés, bijeenkomsten in Enschede en online webinars over babyvoeding en de eerste weken met een baby. Controleer deelname en plaats bij LOES.'}],links:[{title:'LOES – informatie en tips',url:'https://loes.nl/',note:'Van zwangerschap tot jongere'},{title:'GGD Twente – Jeugdgezondheid',url:'https://www.ggdtwente.nl/contact/jeugdgezondheid/contact-met-jeugdgezondheid',note:'Consultatiebureau en vragen'},{title:'LOES – agenda',url:'https://loes.nl/agenda',note:'Webinars en ouder-kindcafés'}],related:['opvoeden','jeugdactiviteiten','gezondheid']},
    {id:'schoolstress',title:'School, stress & thuiszitten',tag:'Jeugd & gezin',icon:'▤',tone:'blue',category:'jeugd',summary:'Wat je kunt doen bij schoolstress, angst, overprikkeling of schoolverzuim.',intro:'Als naar school gaan steeds moeilijker wordt, is het belangrijk te begrijpen wat er speelt en samen passende kleine stappen te zoeken.',keywords:'thuiszitter thuiszitten schoolweigering schoolstress absentie schooluitval overprikkeling leren angst onderwijs passend onderwijs',sections:[{title:'Kijk naar de oorzaak',text:'Stress, angst, sociale spanningen, overprikkeling of moeite met plannen kunnen door elkaar lopen. Het helpt om zonder oordeel te vragen wanneer het lastig wordt en samen naar haalbare aanpassingen te kijken.'},{title:'Samen met school',text:'Bespreek je zorgen met de leerkracht, mentor of zorgcoördinator. Maak duidelijke afspraken over contact, ondersteuning en evaluatie. Ook Jeugdgezondheid of een huisarts kan meedenken als er gezondheids- of ontwikkelingsvragen zijn.'},{title:'Meer weten of steun?',text:'LOES biedt opvoedtips en online bijeenkomsten, waaronder een webinar over thuiszitters op 17 november 2026. Bij complexere vragen kan een wijkteammedewerker helpen bij het vinden van ondersteuning.'}],links:[{title:'LOES – webinar Thuiszitters in beeld',url:'https://loes.nl/agenda/evenement/2774-webinar-thuiszitters-in-beeld',note:'17 november 2026, online'},{title:'GGD Twente – Jeugdgezondheid',url:'https://www.ggdtwente.nl/contact/jeugdgezondheid/contact-met-jeugdgezondheid',note:'Over ontwikkeling en gezondheid'},{title:'Online Hulp Enschede',url:'https://www.onlinehulpenschede.nl/themas/opvoeden-en-opgroeien/',note:'Hulp en advies'}],related:['opvoeden','autisme','jeugdhulp','gezondheid']}
  ];
  for (const topic of newTopics) if (!content.topics.some(t=>t.id===topic.id)) content.topics.push(topic);
  const youth=content.categories.find(c=>c.id==='jeugd');
  if(youth) for(const id of ['baby','schoolstress','autisme'])if(!youth.topics.includes(id))youth.topics.push(id);
  const help=content.categories.find(c=>c.id==='hulp');
  if(help)for(const id of ['autisme','schoolstress'])if(!help.topics.includes(id))help.topics.push(id);

  const sourceCards=[
    {title:'LOES – opvoedadvies',url:'https://loes.nl/',note:'Per leeftijd, van zwangerschap tot jongere'},
    {title:'GGD Twente – Jeugdgezondheid',url:'https://www.ggdtwente.nl/contact/jeugdgezondheid/contact-met-jeugdgezondheid',note:'Gezondheid, ontwikkeling en contact'}
  ];
  for(const id of ['opvoeden','autisme','jeugdactiviteiten','gezondheid','scheiden','jeugdhulp']){
    const topic=content.topics.find(t=>t.id===id);if(!topic)continue;
    for(const l of sourceCards) if(!topic.links.some(old=>old.url===l.url))topic.links.push(l);
  }
  const d=window.ED_DOSSIERS||{};
  for(const [id,links] of Object.entries({
    autisme:[['LOES','Opvoedtips per leeftijd en aandacht voor school, emoties en ontwikkeling.','https://loes.nl/'],['GGD Twente Jeugdgezondheid','Vragen over groei, ontwikkeling en mogelijke ondersteuning.','https://www.ggdtwente.nl/contact/jeugdgezondheid/contact-met-jeugdgezondheid']],
    opvoeden:[['LOES','Gratis opvoedadvies, informatie per leeftijd en cursussen voor ouders.','https://loes.nl/'],['GGD Twente Jeugdgezondheid','Vragen over groei, ontwikkeling en gratis gezinsbegeleiding bij opvoedproblemen.','https://www.ggdtwente.nl/onderwerpen/kinderen/wat-doen-we-voor-je/hulp-bij-opvoeden']],
    jeugdactiviteiten:[['LOES','Ouder-kindcafés, cursussen en webinars over opvoeden.','https://loes.nl/agenda']],
    jeugdhulp:[['LOES','Eerste opvoedvragen en laagdrempelige informatie.','https://loes.nl/'],['GGD Twente Jeugdgezondheid','Gezondheid en ontwikkeling van kinderen van 0 tot 18 jaar.','https://www.ggdtwente.nl/contact/jeugdgezondheid/contact-met-jeugdgezondheid']],
    gezondheid:[['GGD Twente Jeugdgezondheid','Preventieve zorg, advies over groei en ontwikkeling en vaccinaties.','https://www.ggdtwente.nl/contact/jeugdgezondheid/contact-met-jeugdgezondheid']],
    scheiden:[['LOES','Tips om kinderen tijdens een scheiding te begeleiden.','https://loes.nl/informatie-en-tips/ouderschap/relatie-en-gezin/hoe-begeleid-ik-mijn-kind-bij-de-scheiding']]
  })){
    if(!d[id])continue;
    for(const entry of links) if(!d[id].local.some(v=>v[2]===entry[2]))d[id].local.push(entry);
  }
  for(const topic of newTopics) if(!d[topic.id]) d[topic.id]={intro:topic.intro,steps:topic.sections.map(x=>x.text),local:topic.links.map(x=>[x.title,x.note,x.url])};

  const updates=window.ED_UPDATES;
  const loesEvents=[
    ['loes-digitaal-opvoeden','Positief digitaal opvoeden: #HoeDan','2026-11-09','20.00–21.15','Online','Online','Opvoeden','Webinar voor ouders van kinderen van 0–12 jaar over schermtijd, veilig online zijn en grenzen stellen.','https://loes.nl/agenda/basisschoolkind/evenement/2761-positief-digitaal-opvoeden-hoedan',['opvoeden','autisme','jeugdactiviteiten']],
    ['loes-kinderschoenen','Ouder-kindcafé: kindervoeten en schoenen','2026-11-10','10.00–11.30','Ouder-kindcafé Enschede (adres bij LOES)','Hele stad','Jeugd & gezin','Ontmoet andere ouders en krijg uitleg van podologen over kindervoeten en schoenen.','https://loes.nl/agenda/inloop-en-ontmoeten',['opvoeden','baby','jeugdactiviteiten']],
    ['loes-borst-of-flesvoeding','Webinar: borst- of flesvoeding','2026-11-11','19.30–20.30','Online','Online','Jeugd & gezin','Hulp bij het afwegen van borst- en flesvoeding in de eerste maanden.','https://loes.nl/agenda/themabijeenkomsten-en-webinars/evenement/2574-webinar-borst-of-flesvoeding-weet-jij-het-al',['baby','opvoeden']],
    ['loes-baby-eerste-weken','Webinar: de eerste weken met je baby','2026-11-11','19.30–20.30','Online','Online','Jeugd & gezin','Kraamverzorgende vertelt over de eerste dagen, nachten, verzorging en veiligheid na de geboorte.','https://loes.nl/agenda/evenement/2747-webinar-de-eerste-weken-met-je-baby',['baby','opvoeden']],
    ['loes-thuiszitters','Webinar: thuiszitters in beeld','2026-11-17','20.00–21.00','Online','Online','Jeugd & gezin','Handvatten bij schoolstress, angst, overprikkeling en kinderen die niet naar school kunnen.','https://loes.nl/agenda/evenement/2774-webinar-thuiszitters-in-beeld',['schoolstress','autisme','jeugdhulp','opvoeden']],
    ['loes-mediaopvoeding','Lezing mediaopvoeding','2026-11-26','19.30–21.30','Bibliotheek Enschede, Pijpenstraat 15','Centrum','Jeugd & gezin','Voor ouders van kinderen van 12–16 jaar: gesprek en praktische tips over social media.','https://loes.nl/agenda/themabijeenkomsten-en-webinars/evenement/2637-lezing-mediaopvoeding',['opvoeden','jeugdactiviteiten']],
    ['loes-kolven','Webinar: kolven en werken','2026-11-30','19.30–20.30','Online','Online','Jeugd & gezin','Informatie over borstvoeding en kolven na terugkeer op je werk.','https://loes.nl/agenda/themabijeenkomsten-en-webinars',['baby','opvoeden','werk']],
    ['loes-bevallen-mst','Goed voorbereid bevallen (MST)','2026-12-01','19.00–21.00','Enschede, exacte locatie bij LOES','Hele stad','Jeugd & gezin','Verloskundigen vertellen over de bevalling en beantwoorden vragen van aanstaande ouders.','https://loes.nl/agenda/themabijeenkomsten-en-webinars',['baby','opvoeden']]
  ];
  if(updates){for(const [id,title,date,time,location,area,category,summary,url,topics] of loesEvents){if(!updates.events.some(e=>e.id===id||(e.url===url&&e.date===date)||(id==='loes-digitaal-opvoeden'&&e.date===date&&/digitaal opvoeden/i.test(e.title)))){updates.events.push({id,title,date,time,location,area,category,summary,url,source:'LOES',price:'Gratis volgens LOES; controleer aanmelden',topics});}}}
  if(updates){const extraRecurring=[
    {id:'loes-online-cursus-opvoeden',title:'Online cursus positief opvoeden',frequency:'Op aanvraag · online cursus',location:'Online',area:'Online',category:'Jeugd & gezin',summary:'Zelfstandig volgen: oefenen met positief opvoeden, luisteren, grenzen en samen oplossingen zoeken.',url:'https://loes.nl/agenda',source:'LOES',topics:['opvoeden','jeugdactiviteiten']},
    {id:'loes-online-ouders',title:'Online cursus samenwerken als ouders',frequency:'Op aanvraag · online cursus',location:'Online',area:'Online',category:'Jeugd & gezin',summary:'Online cursus voor ouders over samenwerken en afstemmen in de eerste jaren.',url:'https://loes.nl/agenda',source:'LOES',topics:['opvoeden','baby','scheiden']}
  ];for(const e of extraRecurring)if(!updates.recurring.some(v=>v.id===e.id))updates.recurring.push(e);}
  window.ED_EXTRA_SOURCES=[
    {id:'loes-advies',title:'LOES: opvoedinformatie en advies per leeftijd',type:'informatie',source:'LOES',url:'https://loes.nl/',summary:'Tips van baby tot puber over opvoeden, ontwikkeling, grenzen, school, emoties en contact met kinderen.',terms:'zwanger baby peuter kleuter basisschoolkind puber ouders ouderschap stress autisme gedrag opvoeden opvoeding',segments:['LOES geeft ouders en opvoeders in Twente gratis informatie en persoonlijk advies over opvoeden en opgroeien.','Er zijn online cursussen, webinars, ouder-kindcafés en tips voor verschillende leeftijden.']},
    {id:'loes-gedrag',title:'LOES: gedrag en opvoeden van peuters en basisschoolkinderen',type:'informatie',source:'LOES',url:'https://loes.nl/informatie-en-tips/peuter/gedrag-opvoeding',summary:'Uitleg over grenzen, driftbuien, zelfstandig worden, angst en spelen bij peuters.',terms:'regels grenzen peuter driftbuien bijten angst slapen zelfstandig positief opvoeden',segments:['De leeftijd van je kind speelt mee in hoe je grenzen en afspraken aanbiedt.','LOES heeft informatie over samenspelen, afscheid nemen en omgaan met moeilijke emoties.']},
    {id:'loes-scheiden',title:'LOES: kinderen begeleiden bij een scheiding',type:'informatie',source:'LOES',url:'https://loes.nl/informatie-en-tips/ouderschap/relatie-en-gezin/hoe-begeleid-ik-mijn-kind-bij-de-scheiding',summary:'Tips om kinderen te ondersteunen, naar hun gevoelens te luisteren en rekening te houden met veranderingen thuis.',terms:'scheiden scheiding co ouderschap uit elkaar kinderen emoties ouders',segments:['Kinderen kunnen verschillend reageren op een scheiding.','LOES legt uit hoe je over veranderingen praat en hoe je ruimte laat voor gevoelens.']},
    {id:'loes-schoolstress',title:'LOES: schoolstress en thuiszitters',type:'informatie',source:'LOES',url:'https://loes.nl/agenda/evenement/2774-webinar-thuiszitters-in-beeld',summary:'Informatie over spanning, angst en overprikkeling bij kinderen die moeite hebben met schoolgang.',terms:'schoolstress schoolweigering thuiszitters thuiszitten overprikkeling autisme angst plannen gezin',segments:['LOES bespreekt in een webinar praktische stappen bij schoolverzuim en overbelasting.','Het is belangrijk om de situatie van het kind te begrijpen en samen kleine haalbare stappen te zoeken.']},
    {id:'ggd-opvoedhulp',title:'GGD Twente: gratis opvoedbegeleiding',type:'voorziening',source:'GGD Twente',url:'https://www.ggdtwente.nl/onderwerpen/kinderen/wat-doen-we-voor-je/hulp-bij-opvoeden',summary:'Gezinsbegeleiding bij opvoedvragen van ouders met kinderen van 0–18 jaar. De begeleiding is gratis; maximaal tien huisbezoeken.',terms:'jeugdgezondheid jeugdarts jeugdverpleegkundige pedagogische gezinsbegeleiding opvoeden gezin gedrag kinderen hulp autisme ontwikkeling',segments:['De gezinsbegeleider zoekt samen met ouders naar een passende aanpak en kan thuis komen.','Als meer ondersteuning nodig is, kan doorverwijzing worden besproken.']},
    {id:'ggd-jeugdcontact',title:'GGD Twente: Jeugdgezondheid en consultatiebureau',type:'organisatie',source:'GGD Twente',url:'https://www.ggdtwente.nl/contact/jeugdgezondheid/contact-met-jeugdgezondheid',summary:'Contact voor vragen over groei, vaccinaties, opvoeding en ontwikkeling. Jeugdgezondheid is telefonisch bereikbaar via 053 487 6670.',terms:'consultatiebureau baby jeugd gezondheid vaccinaties groei ontwikkeling autisme opvoeden school jeugdarts jeugdverpleegkundige',segments:['GGD Twente verzorgt preventieve contactmomenten voor de jeugd en geeft advies over groei en gezondheid.','Vragen kun je stellen aan de jeugdarts of jeugdverpleegkundige.']},
    {id:'ggd-oudersnieuws',title:'GGD Twente: nieuwsbrieven Samen opgroeien',type:'informatie',source:'GGD Twente',url:'https://www.ggdtwente.nl/onderwerpen/kinderen/leeftijdsnieuwsbrieven-samen-opgroeien',summary:'Leeftijdsgerichte opvoedtips voor ouders van kinderen tot 18 jaar, met informatie over de bijeenkomsten en webinars van LOES.',terms:'ouders nieuwsbrief tips opvoeden baby puber ontwikkeling webinar loes',segments:['GGD Twente informeert ouders met leeftijdsgerichte tips en verwijzingen naar bijeenkomsten.']},
    {id:'ggd-professionals',title:'GGD Twente: overleg met jeugdarts of jeugdverpleegkundige',type:'informatie',source:'GGD Twente',url:'https://www.ggdtwente.nl/professionals/voor-zorg-en-welzijn/jeugdgezondheid/overleg-met-jeugdarts-of-jeugdverpleegkundige',summary:'Zorgprofessionals kunnen overleggen over groei, ontwikkeling, gedrag, opvoeding en veiligheid van kinderen.',terms:'professionals consultatie jeugdhulp verwijzing ontwikkeling school gedrag opvoeden ggd jeugdarts',segments:['De jeugdarts kan adviseren over passende zorg en samenwerken met andere betrokken professionals.']}
  ];
})();