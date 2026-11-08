'use strict';
// Redactionele toelichting in eigen woorden, op basis van openbare bronnen.
// Externe teksten en foto's worden niet integraal overgenomen. Inhoud kan wijzigen.
(() => {
  const C=window.ED_CONTENT;
  const U=window.ED_UPDATES;
  if(!C||!U)return;
  const topics={
    geld:[
      ['Welke financiële hulp bestaat er?', 'Enschede heeft verschillende mogelijkheden voor inwoners met een laag inkomen. De gemeente noemt onder meer bijzondere bijstand voor noodzakelijke kosten, individuele inkomenstoeslag, kwijtschelding van gemeentelijke belastingen en de Gemeentepolis. Daarnaast bestaan hulp via de Voedselbank, Kledingbank, het Kindpakket en het Fonds Bijzondere Noden. Niet iedereen heeft op alles recht: inkomen, gezinssituatie en de soort kosten bepalen welke regeling past.'],
      ['Van een vraag naar een aanvraag', 'Begin met het verzamelen van recente inkomsten, vaste lasten en de kosten waarvoor je hulp zoekt. Bij een weggevallen inkomen kan een WW-uitkering via UWV of bijstand via de gemeente relevant zijn. Een Wijkwijzer kan helpen bij het ordenen van brieven en het zoeken van de juiste route. Voor de actuele voorwaarden en bedragen is de gemeente leidend.']
    ],
    schulden:[
      ['Bij een betalingsachterstand', 'Breng eerst in kaart aan wie je nog moet betalen, welk bedrag openstaat en wanneer er een uiterste datum is. Huur, energie en zorgverzekering verdienen extra aandacht, omdat niet betalen grote gevolgen kan hebben. Neem contact op met de schuldeiser om te bespreken of een haalbare betalingsregeling mogelijk is. Wacht niet tot er een deurwaarder komt of afsluiting dreigt.'],
      ['Hulp bij schulden in Enschede', 'Gemeente Enschede verwijst naar hulp bij schulden en budgetbeheer via Stadsbank Oost Nederland. Vrijwillige ondersteuning bij administratie kan nuttig zijn om overzicht te krijgen, maar is niet hetzelfde als een officieel schuldhulptraject. Bij ingewikkelde schulden kan de gemeente met je bepalen wat nodig is. Neem correspondentie, inkomsten en een overzicht van vaste lasten mee.']
    ],
    toeslagen:[
      ['Landelijke en gemeentelijke regelingen', 'Zorgtoeslag, huurtoeslag, kinderopvangtoeslag en kindgebonden budget worden landelijk geregeld. De gemeente heeft daarnaast eigen mogelijkheden, zoals bijzondere bijstand, studietoeslag, het Kindpakket en ondersteuning bij woonkosten. Dat zijn verschillende aanvragen met andere voorwaarden.'],
      ['Voorkom terugbetalen', 'Als je inkomen verandert, je gaat samenwonen of een kind krijgt, kan de hoogte van toeslagen veranderen. Geef wijzigingen tijdig door via de officiële instanties. Kun je een brief of berekening niet begrijpen, dan kan de Wijkwijzer of een bibliotheek je op weg helpen zonder dat je je DigiD aan iemand hoeft af te staan.']
    ],
    administratie:[
      ['Een overzicht maken', 'Verzamel belangrijke brieven op één plek en sorteer ze op onderwerp: inkomen, zorg, wonen, gemeente en rekeningen. Markeer bij iedere brief wat je moet doen, vóór welke datum en bij welke organisatie. Moet je ergens bezwaar tegen maken, wacht dan niet: voor zulke stappen gelden vaak termijnen.'],
      ['Hulp met formulieren en digitale zaken', 'Je kunt bij de Wijkwijzer terecht met vragen over post, geld en administratie. Voor websites van de overheid is er ook het Informatiepunt Digitale Overheid in de bibliotheek. Vraag iemand om mee te kijken, maar houd wachtwoorden, bankgegevens en DigiD-inlogmiddelen voor jezelf.']
    ],
    energie:[
      ['Gratis kleine bespaarmaatregelen', 'De Wijkwijzer beschrijft de FIXbrigade: die kan bij geschikte woningen helpen met bijvoorbeeld tochtstrips, radiatorfolie, een brievenbusborstel of zuinige verlichting. Ook zijn er bespaarcoaches die tips geven over energieverbruik. De precieze voorwaarden en beschikbaarheid veranderen.'],
      ['Hulp bij isoleren', 'Voor sommige woningeigenaren zijn er subsidies of acties voor isolatie. De gemeente beschreef in oktober 2026 ook hulp bij een isolatiebon voor bepaalde koopwoningen en een spreekuur in Wijkwijzer Lumen. Controleer altijd de actuele regeling en laat je niet onder druk zetten door commerciële aanbieders.']
    ],
    kindpakket:[
      ['Wat kan er onder vallen?', 'Via het Enschedese Kindpakket kunnen kinderen tot 18 jaar uit gezinnen met weinig inkomen ondersteuning krijgen om mee te doen. De gemeente noemt onder meer fietsen, zwemles, sport, cultuur, schoolspullen en een laptop. Stichting Leergeld en andere deelnemende organisaties hebben ieder hun eigen voorwaarden en aanvraagroute.'],
      ['Zo pak je het aan', 'Bedenk eerst welke activiteit of welk product je kind nodig heeft. Zoek vervolgens de passende organisatie in het gemeentelijke overzicht en controleer hoe je moet aanvragen. Ook als je werkt en toch weinig overhoudt, kan het zinvol zijn je mogelijkheden te bekijken. Vraag bij onduidelijkheid hulp aan de Wijkwijzer.']
    ],
    werk:[
      ['Werk kwijt of tijdelijk geen inkomen?', 'Controleer zo snel mogelijk of er een WW-uitkering via UWV mogelijk is. Is dat niet passend of onvoldoende, kijk dan naar de mogelijkheden bij de gemeente. Breng in beeld wat er deze maand binnenkomt en welke vaste lasten doorlopen. Bij werk en inkomen kunnen ook opleiding of begeleiding naar een baan aan de orde zijn.'],
      ['Een passende daginvulling', 'Werk is niet de enige manier om structuur en sociale contacten op te bouwen. Vrijwilligerswerk, een cursus, buurtactiviteit of een leerwerktraject kan een begin zijn. Via M-Pact en lokale organisaties kun je onderzoeken wat past bij je interesses en belastbaarheid; bespreek verplichtingen rond een uitkering wel met de uitkeringsinstantie.']
    ],
    wonen:[
      ['Welke woonvraag speelt er?', 'Een verhuurder reageert niet, er is overlast, je hebt moeite de huur te betalen of je zoekt een andere woning: dat zijn verschillende problemen. Bij onderhoudsgebreken begin je meestal bij de verhuurder. Bij huurachterstand is vroeg contact belangrijk. Als er een dreigende huisuitzetting of acute onveiligheid is, vraag dan snel deskundige hulp.'],
      ['Samen de juiste ingang zoeken', 'Voor praktische vragen of hulp met brieven kun je naar de Wijkwijzer. Een wijkteam kan meedenken als wonen samenhangt met sociale problemen of ondersteuning in het dagelijks leven. Bij woonoverlast kan buurtbemiddeling soms passend zijn, maar niet bij situaties met geweld of directe dreiging.']
    ],
    gezondheid:[
      ['Lichamelijke en mentale gezondheid', 'Vermoeidheid, stress, slecht slapen, angst en eenzaamheid kunnen elkaar versterken. Online Hulp Enschede beschrijft bij stress onder meer veranderingen in gedrag, lichamelijke klachten en concentratieproblemen. Bespreek langdurige of ernstige klachten met de huisarts. Praktische spanningen over werk, relaties of geld kunnen daarnaast aanleiding zijn om bij het wijkteam mee te denken.'],
      ['Voor kinderen en jongeren', 'GGD Twente Jeugdgezondheid volgt groei en ontwikkeling, heeft contactmomenten via het consultatiebureau en op school, en biedt opvoedadvies. LOES heeft tips en bijeenkomsten voor verschillende leeftijden. Voor medische vragen of gespecialiseerde diagnostiek blijven huisarts en betrokken professionals belangrijk.']
    ],
    autisme:[
      ['Een vraag over autisme', 'Autisme is geen uniforme ervaring: de ene persoon heeft vooral moeite met onverwachte veranderingen, een ander met prikkels, energieverdeling of sociale verwachtingen. Vraag daarom wat iemand zelf nodig heeft. Duidelijke afspraken, voorspelbaarheid, rustmomenten en aanpassingen op school of werk kunnen helpen, maar zijn geen standaardoplossing voor iedereen.'],
      ['Ondersteuning en activiteiten', 'Voor kinderen kun je vragen over ontwikkeling met GGD Twente, school of huisarts bespreken. Volwassenen kunnen met sociale en praktische ondersteuningsvragen bij Wijkwijzer of wijkteam beginnen. Zoek bij activiteiten naar informatie over drukte, groepsgrootte en begeleiding. De sociale kaart Waar in Twente en Jeugdhulp Twente helpen om aanbod en expertise te verkennen; een vermelding betekent niet automatisch beschikbare plek.']
    ],
    dementie:[
      ['Geheugenproblemen bespreken', 'Vergeetachtigheid kan meerdere oorzaken hebben en betekent niet automatisch dementie. Bespreek aanhoudende veranderingen in geheugen, gedrag of dagelijks functioneren met de huisarts. Ook familieleden kunnen hun zorgen daar bespreken en vragen hoe zij goed kunnen ondersteunen.'],
      ['Ook naasten hebben steun nodig', 'Een partner of familielid helpt vaak steeds meer bij afspraken, financiën of veiligheid thuis. Dat kan zwaar worden. Bij mantelzorgondersteuning, een ontmoetingsgroep zoals het Alzheimer Café of tijdelijke overname van zorgtaken kun je informeren via Wijkwijzer, wijkteam en de sociale kaart.']
    ],
    rouw:[
      ['Verlies kent geen vast schema', 'Rouw kan ontstaan na een overlijden, maar ook na een scheiding, ziekte of verlies van werk. Sommige mensen voelen vooral verdriet, anderen boosheid, onrust of juist weinig emotie. Er is geen vaste volgorde waarin je dit hoort te ervaren. Steun vanuit je omgeving kan helpen.'],
      ['Wanneer extra steun zoeken?', 'Als verdriet of onrust je dagelijks leven langdurig belemmert, bespreek dit dan met de huisarts. Een lotgenotengroep of rustig contact in de buurt kan ook prettig zijn. Vraag bij de Wijkwijzer naar mogelijkheden om andere mensen te ontmoeten of een passende vorm van ondersteuning te vinden.']
    ],
    relaties:[
      ['Bij spanningen of ruzie', 'Probeer te bespreken wat er gebeurt op een rustig moment. Gebruik concrete voorbeelden en vertel wat het met je doet, in plaats van te zeggen wat de ander altijd verkeerd doet. Als gesprekken steeds vastlopen, kan ondersteuning helpen om nieuwe afspraken te maken. Online Hulp Enschede heeft uitleg over omgang met conflict en contact.'],
      ['Als de situatie niet veilig is', 'Bij bedreiging, dwang, mishandeling of aanhoudende angst is veiligheid belangrijker dan samen een conflict oplossen. Veilig Thuis is bereikbaar voor advies op 0800 2000. Is er direct gevaar, bel 112. Je hoeft niet eerst zeker te weten hoe je de situatie moet noemen om advies te vragen.']
    ],
    eenzaamheid:[
      ['Verschillende vormen van eenzaamheid', 'Je kunt weinig contact hebben, maar ook veel mensen zien en toch het gevoel hebben dat je niemand echt kent. Daarom helpt niet voor iedereen dezelfde activiteit. Een vaste koffie-inloop, een maatje, vrijwilligerswerk of een kleine groep kan een laagdrempelige eerste stap zijn.'],
      ['Ontmoeten in Enschede', 'Via Wijkwijzers, Alifa, M-Pact en buurtcentra zijn er mogelijkheden voor ontmoeting en meedoen. Vertel wat je zoekt: bijvoorbeeld leeftijdsgenoten, samen wandelen, een creatieve activiteit of iemand om mee te praten. Een buurtwerker kan helpen te kijken wat in je eigen wijk past.']
    ],
    zorg:[
      ['Waar begin je met hulp regelen?', 'De soort vraag bepaalt de route. Een voorziening waar je zonder indicatie terechtkunt, is iets anders dan individuele begeleiding, huishoudelijke ondersteuning of gespecialiseerde zorg. Bij de Wijkwijzer kun je de mogelijkheden verkennen; het wijkteam kan betrokken worden bij vragen die verder onderzoek vragen.'],
      ['Bereid een gesprek praktisch voor', 'Schrijf op welke dagelijkse activiteiten moeilijk zijn, welke hulp je al hebt geprobeerd en wat je zelf graag wilt bereiken. Je mag vragen naar onafhankelijke cliëntondersteuning en naar het verschil tussen vrij toegankelijk aanbod en een voorziening die een besluit nodig heeft.']
    ],
    mantelzorg:[
      ['Zorg combineren met eigen leven', 'Mantelzorg kan bestaan uit vervoer, boodschappen, toezicht, praktische regelzaken of persoonlijke steun. Online Hulp Enschede noemt ondersteuning bij mantelzorg en werk, geldzaken en respijtzorg. Het helpt om afspraken en noodcontacten vast te leggen en op tijd aan te geven wat je zelf aankunt.'],
      ['Contact met andere mantelzorgers', 'In Enschede is er onder meer de community Wij Mantelzorgers Enschede, waar ervaringen en praktische kennis worden gedeeld. Wijkteams kunnen meedenken over ondersteuning; bij geheugenproblematiek kan contact met lotgenoten of een Alzheimer Café helpend zijn.']
    ],
    opvoeden:[
      ['Van opvoedvraag tot steun', 'Veel ouders zoeken praktische tips voor slapen, grenzen, driftbuien, schermgebruik of het omgaan met pubers. LOES biedt informatie per leeftijd en organiseert in Twente webinars en bijeenkomsten. Bij vragen over groei, gedrag of ontwikkeling kun je ook terecht bij GGD Twente Jeugdgezondheid.'],
      ['Gratis gezinsbegeleiding door GGD Twente', 'Bij opvoedproblemen kan een gezinsbegeleider met ouders meedenken, thuis meekijken en samen een aanpak oefenen. Volgens GGD Twente is deze begeleiding gratis en zijn maximaal tien huisbezoeken mogelijk. Het is niet hetzelfde als specialistische jeugdhulp; wanneer meer hulp nodig is, kan een passende verwijzing worden besproken.']
    ],
    baby:[
      ['Voor en na de geboorte', 'GGD Twente heeft informatie over het consultatiebureau, groei en ontwikkeling. Voor medische controles blijven verloskundige, kraamzorg en huisarts belangrijke aanspreekpunten. Bij praktische vragen over voeding, onrust, slapen en de eerste weken kun je ook bij LOES terecht.'],
      ['Webinars en ontmoetingen', 'LOES heeft online bijeenkomsten over onder meer borst- of flesvoeding, de eerste weken met je baby, kolven en borstvoeding. In Enschede zijn ook ouder-kindcafés. Kijk bij een bijeenkomst naar doelgroep, datum, plek en aanmelden; sommige webinars richten zich specifiek op aanstaande ouders in een bepaalde zwangerschapsperiode.']
    ],
    schoolstress:[
      ['Als school niet meer lukt', 'Langdurige spanning rond school kan allerlei oorzaken hebben, zoals pesten, angst, overprikkeling, slaaptekort of moeite met overzicht houden. Probeer samen te onderzoeken op welke momenten het vastloopt. Alleen meer druk zetten helpt vaak niet; kleine, haalbare stappen en duidelijke afspraken kunnen zinvoller zijn.'],
      ['Samenwerken met school en hulp', 'Neem contact op met mentor of intern begeleider en bespreek welke aanpassingen mogelijk zijn. Bij gezondheidsvragen kan de jeugdarts of huisarts meedenken. LOES organiseert op 17 november 2026 een webinar over thuiszitten en de rol van stress, vaardigheden en ondersteuning thuis.']
    ],
    jeugdhulp:[
      ['Van een eerste vraag naar passende hulp', 'Een vraag over gedrag, opvoeden of ontwikkeling betekent niet automatisch dat specialistische jeugdhulp nodig is. Eerst kan steun van school, LOES, de huisarts, GGD of het wijkteam voldoende zijn. Als er meer hulp nodig is, bespreek dan welke soort onderzoek of behandeling passend is.'],
      ['Aanbieders en wachttijden', 'Jeugdhulptwente.nl laat aanbieders, expertise en gerapporteerde wachttijden zien. Die kunnen verschillen per behandeling en doelgroep en veranderen regelmatig. Gebruik de informatie als oriëntatie en controleer de beschikbaarheid bij de aanbieder en verwijzer voordat je ervan uitgaat dat je op korte termijn terechtkunt.']
    ],
    activiteiten:[
      ['Eenmalig of terugkerend', 'Een buurtlunch, speelmiddag, sportactiviteit, cursus en online webinar zijn verschillende soorten aanbod. In de agenda zie je datum en plek bij eenmalige activiteiten en een frequentie bij vaste groepen. Veel buurtactiviteiten zijn vrij toegankelijk, maar voor sommige is aanmelden nodig.'],
      ['Kiezen wat bij je past', 'Filter op stadsdeel, leeftijd of interesse. Denk ook aan toegankelijkheid, kosten, groepsgrootte en eventueel vervoer. Kun je niet goed vinden wat je zoekt, vraag dan een buurtwerker of Wijkwijzer naar mogelijkheden op loop- of fietsafstand.']
    ],
    ontmoeten:[
      ['Laagdrempelige ontmoeting', 'In een Wijkwijzer, buurthuis of inloop kun je vaak eerst rustig kennismaken. Je hoeft niet meteen mee te doen met een hele groep. Kijk of er vaste momenten zijn, of koffie of thee iets kost en of iemand je de eerste keer kan ontvangen.'],
      ['Meedoen op jouw manier', 'Alifa organiseert activiteiten in de stadsdelen, M-Pact helpt bij vrijwilligerswerk en maatjesprojecten en Incluzio ondersteunt buurten en bewonersinitiatieven. Ook een taalgroep, wandelgroep of gezamenlijke maaltijd kan een prettige manier zijn om mensen te leren kennen.']
    ],
    sport:[
      ['Bewegen zonder vaste sportclub', 'Sportaal en organisaties in de wijk bieden ook kennismakingsactiviteiten en laagdrempelige vormen van beweging. Denk aan wandelen, ouder-kind-bewegen of rustig sporten in groepsverband. Kies iets dat past bij je leeftijd, energie en eventuele beperkingen.'],
      ['Drempels wegnemen', 'Vraag vooraf of de locatie toegankelijk is, of een proefles mogelijk is en wat je moet meenemen. Kun je een contributie niet betalen, kijk dan naar gemeentelijke ondersteuning of regelingen voor kinderen.']
    ],
    vrijwilligerswerk:[
      ['Wat kun je als vrijwilliger doen?', 'Er is vraag naar mensen die anderen ontvangen, met taal oefenen, activiteiten begeleiden of helpen bij praktische vragen. Voor de Wijkwijzer zoekt Enschede bijvoorbeeld vrijwilligers die goed luisteren, met computers overweg kunnen en minimaal een dagdeel beschikbaar zijn. Er is een inwerkperiode met begeleiding.'],
      ['Een plek kiezen', 'Via M-Pact kun je mogelijkheden vergelijken. Kijk naar je beschikbare tijd, wat je graag doet, begeleiding en of er een verklaring omtrent het gedrag nodig is. Een kennismakingsgesprek kan helpen om te bepalen of de taak bij je past.']
    ],
    wijkwijzer:[
      ['Waarvoor kun je langskomen?', 'Een Wijkwijzer is er voor uiteenlopende vragen over geld, brieven, werk, wonen, opvoeden en activiteiten. Vrijwilligers, welzijnswerkers en wijkteams werken er samen. Je hoeft meestal geen afspraak te maken voor de inloop; de vaste openingstijden verschillen per locatie.'],
      ['Tien plekken en verschillende spreekuren', 'Wijkwijzer Centrum zit in de Performance Factory aan de Hoge Bothofstraat 49 en is dinsdag en donderdag in de ochtend open. Op sommige dagen komen extra partners langs, zoals het Budget Advies Team of Werk en Inkomen. Er zijn ook locaties in Noord, Oost, Zuid en West. Controleer het rooster bij de Wijkwijzer voor vertrek.']
    ],
    taal:[
      ['Lezen, schrijven en digitaal regelen', 'Het kan lastig zijn om een brief te begrijpen, een online formulier in te vullen of met DigiD te werken. Bibliotheek en Wijkwijzer bieden mogelijkheden voor uitleg of doorverwijzing. Samen oefenen kan helpen om later zelfstandiger zaken te regelen.'],
      ['Nederlands oefenen met anderen', 'Taaltafels en buurtactiviteiten zijn niet alleen bedoeld om te leren, maar ook om mensen te ontmoeten. Vraag bij Alifa of buurtcentra naar groepen op jouw niveau en in jouw stadsdeel.']
    ],
    veiligheid:[
      ['Bij zorgen over veiligheid thuis', 'Onveiligheid kan gaan over bedreiging, fysiek of psychisch geweld, dwang of verwaarlozing. Je kunt ook advies vragen wanneer je nog twijfelt wat er precies gebeurt. Veilig Thuis is bereikbaar op 0800 2000; bij acuut gevaar bel je 112.'],
      ['Hulp zoeken zonder alles alleen te regelen', 'Probeer als dat veilig kan met een vertrouwd persoon of professional te bespreken wat je meemaakt. Bij directe dreiging gaat veiligheid vóór overleg of bemiddeling. Het wijkteam kan bij sociale problemen meedenken, maar is geen vervanging voor een acute hulpdienst.']
    ],
    scheiden:[
      ['Voor kinderen duidelijkheid bieden', 'Bij een scheiding veranderen soms woonplek, weekindeling en contact met familie. Probeer kinderen op een passende manier te vertellen wat er verandert, en maak duidelijk dat zij geen schuld hebben aan de scheiding. Het helpt als ouders afspraken maken over communicatie en belangrijke momenten.'],
      ['Verschillende vragen, verschillende loketten', 'LOES en Online Hulp hebben opvoedinformatie en tips; voor juridische afspraken of financiële gevolgen kan specialistisch advies nodig zijn. Zijn gesprekken niet veilig door bedreiging of geweld, dan is bemiddeling niet vanzelfsprekend passend.']
    ],
    jeugdactiviteiten:[
      ['Iets voor jouw kind vinden', 'De agenda bundelt speelmiddagen, bewegen, creatieve activiteiten, jeugdgroepen en ouder-kindbijeenkomsten. Kijk naar leeftijd, of ouders aanwezig moeten zijn en of je je vooraf moet aanmelden. Activiteiten wisselen per wijk en seizoen.'],
      ['Meedoen als geld lastig is', 'Voor kinderen in gezinnen met een laag inkomen kan het Kindpakket uitkomst bieden bij bijvoorbeeld sport, cultuur en materiaal. Niet elke activiteit valt onder dezelfde regeling; controleer de mogelijkheden bij de gemeente of Stichting Leergeld.']
    ]
  };
  for(const topic of C.topics){
    const extra=topics[topic.id];if(!extra)continue;
    const seen=new Set(topic.sections.map(s=>s.title.toLowerCase()));
    for(const [title,text] of extra){if(!seen.has(title.toLowerCase()))topic.sections.push({title,text});}
  }
  const events={
    'loes-kinderschoenen':{
      details:['Tijdens dit ouder-kindcafé in Bibliotheek Enschede vertellen twee podologen over de ontwikkeling van kindervoeten. Je krijgt uitleg over de stand van voeten en benen en waar je op kunt letten bij het kiezen van schoenen.','Het is ook een gelegenheid om met andere ouders en kinderen in contact te komen. Volgens LOES kun je vrijblijvend binnenlopen op de eerste verdieping bij de jeugdafdeling. De toegang is gratis; consumpties betaal je zelf.'],practical:['Dinsdag 10 november, 10.00–11.30 uur','Bibliotheek Enschede, Pijpenstraat 15']
    },
    'loes-mediaopvoeding':{
      details:['Deze gespreksavond is bedoeld voor ouders van kinderen van ongeveer 12 tot 16 jaar. Onderzoeker Sara de Ruyter van de Universiteit Twente bespreekt actuele kennis over mediagebruik en de invloed op jongeren.','Je krijgt ideeën om met je kind te praten over TikTok, Instagram, YouTube en schermtijd, zonder dat het alleen over verbieden gaat. Er is ruimte om ervaringen uit te wisselen en vragen te stellen. De bijeenkomst is onderdeel van de Week van Digitaal Meedoen.'],practical:['Donderdag 26 november, 19.30–21.30 uur','Bibliotheek Enschede, Pijpenstraat 15','Controleer aanmelding via LOES']
    },
    'loes-thuiszitters':{
      details:['Wanneer een kind niet naar school kan of wil, kunnen stress, angst, overprikkeling en problemen met plannen door elkaar lopen. Dit webinar biedt ouders inzicht in mogelijke oorzaken van schoolverzuim.','De bijeenkomst gaat over haalbare stappen, het beperken van onbedoelde druk en manieren om thuis steun te bieden. Het is algemene informatie en geen persoonlijke diagnose of vervanging voor afspraken met school en zorgprofessionals.'],practical:['Dinsdag 17 november, 20.00–21.00 uur','Online webinar; aanmelden via LOES']
    },
    'loes-baby-eerste-weken':{
      details:['Een kraamverzorgende bespreekt wat je in de eerste dagen met je baby kunt tegenkomen: slapen, verschonen, temperatuur, onrust en veilig vervoer. Er is ook aandacht voor het wennen aan het ouderschap.','De bijeenkomst is vooral bedoeld voor aanstaande ouders in het laatste deel van de zwangerschap. De spreker beantwoordt vragen; controleer bij LOES of er nog plaats is.'],practical:['Controleer de datum: LOES heeft ook een webinar op 15 december','Online deelname; aanmelding via de bronpagina']
    },
    'loes-borst-of-flesvoeding':{
      details:['Een deskundige geeft informatie over de keuze tussen borst- en flesvoeding en over combineren. Het doel is dat aanstaande ouders weten waar ze op kunnen letten en de keuze kunnen maken die bij hun gezin past.','Neem je eigen vragen mee over verwachtingen, praktische organisatie en mogelijke ondersteuning na de geboorte. Voor medische of persoonlijke voedingsproblemen kun je contact opnemen met verloskundige, jeugdgezondheid of een gekwalificeerde deskundige.'],practical:['Woensdag 11 november, 19.30–20.30 uur','Online; controleer de inschrijving bij LOES']
    },
    'loes-bevallen-mst':{
      details:['Bij deze bijeenkomst vertellen een eerstelijns en klinisch verloskundige over de bevalling. Je hoort welke keuzes je kunt tegenkomen en krijgt de gelegenheid vragen te stellen.','Deze uitleg helpt bij de voorbereiding; bespreek persoonlijke medische vragen met de eigen verloskundige of behandelaar. De definitieve plaats en aanmeldprocedure staan bij LOES.'],practical:['Dinsdag 1 december, 19.00–21.00 uur','Enschede; exacte locatie bij LOES']
    },
    'seniorenbeurs':{
      details:['De seniorenbeurs is bedoeld voor iedereen die vooruit wil kijken naar prettig ouder worden. Het gaat over gezond en zelfstandig thuis wonen, bewegen, hobbies, contacten en mogelijkheden voor ondersteuning.','Ook partners, kinderen en mantelzorgers kunnen zich informeren. Je hoeft niet te wachten tot je zorg nodig hebt: juist vooraf nadenken over woonwensen en hulp kan later keuzes makkelijker maken.'],practical:['Zaterdag 21 november, 10.00–16.00 uur',"’t Pluspunt, Schuttersveld 17, Enschede"]
    },
    'familiehuis-peuterdans-11':{
      details:['Ouders en jonge kinderen kunnen samen bewegen en spelen op muziek. Het Familiehuis in Enschede-West brengt daarnaast ouders met elkaar in contact en biedt een laagdrempelige plek voor opvoedvragen.','Controleer de leeftijdsgroep, starttijd en eventuele aanmelding bij het Familiehuis.']
    },
    'familiehuis-recht-11':{
      details:['Tijdens dit spreekuur kun je algemene juridische vragen rond gezinnen bespreken, bijvoorbeeld over scheiding, omgang of afspraken tussen ouders. Een eerste gesprek geeft nog geen garantie op juridische bijstand of een vervolgtraject.','Neem een korte omschrijving van je vraag mee en controleer vooraf bij het Familiehuis of aanmelden nodig is.']
    }
  };
  const news={
    'nieuws-stadspeiling':{
      details:['De gemeente Enschede vraagt inwoners hoe zij hun buurt, de stad en de dienstverlening ervaren. De vragen gaan onder meer over prettig wonen, contact met de gemeente en de ruimte die mensen ervaren om mee te denken.','Dezelfde vragen worden ook in andere Nederlandse gemeenten gebruikt. Zo kan Enschede de uitkomsten vergelijken met eerdere jaren en andere steden. Meedoen kan tot en met 22 november 2026; het invullen duurt ongeveer twintig minuten.'],points:['Voor inwoners van Enschede','Reageren kan tot en met 22 november 2026']
    },
    'nieuws-wijkwijzer':{
      details:['Wijkwijzer Centrum is gevestigd in de Performance Factory aan de Hoge Bothofstraat 49, gebouw Oost. Je kunt er op dinsdag en donderdag van 9.00 tot 12.00 uur zonder afspraak terecht met vragen over onder meer geld, post, wonen, opvoeden en de buurt.','Naast vrijwilligers, welzijnswerk en wijkteams sluiten op bepaalde dagen andere partners aan. Zo is er op dinsdag onder meer Werk en Inkomen en het Budget Advies Team. Controleer het actuele rooster op de Wijkwijzer-site voordat je voor een specifiek spreekuur komt.'],points:['Vrije inloop op dinsdag en donderdag in de ochtend','Vragen over geld, post, opvoeding en activiteiten']
    },
    'nieuws-spelbel':{
      details:['In speeltuin Lindenhof is eind oktober een Spelbel in gebruik genomen. Als kinderen erop drukken, ontvangen aangemelde ouders in de buurt een melding dat er buiten gespeeld kan worden. Aanmelden verloopt via een QR-code en ouders bepalen wanneer ze berichten ontvangen.','Het idee is afkomstig van Jantje Beton en is in samenwerking met de speeltuin, Incluzio en Alifa uitgevoerd. Er is ook een Spelbel in de Gezonde Buurt Bijvank. Het doel is kinderen helpen elkaar makkelijker buiten te vinden en samen te bewegen.'],points:['Bij speeltuin Lindenhof en de Gezonde Buurt Bijvank','Aanmelding verloopt via een QR-code bij de bel']
    },
    'nieuws-seniorenbeurs':{
      details:["Op zaterdag 21 november organiseert Enschede een beurs rond prettig ouder worden. Bezoekers kunnen informatie krijgen over wonen, bewegen, gezondheid en ondersteuning. Ook is er aandacht voor nieuwe interesses en contacten.","De beurs is bedoeld voor senioren en voor mensen die zich alvast willen oriënteren, waaronder mantelzorgers en familieleden. De beurs vindt plaats in ’t Pluspunt aan Schuttersveld 17 en duurt van 10.00 tot 16.00 uur."],points:['21 november 2026, 10.00–16.00 uur',"’t Pluspunt, Schuttersveld 17"]
    },
    'nieuws-familiehuis':{
      details:['Het Familiehuis Enschede-West is een plek voor ouders met jonge kinderen om andere ouders te ontmoeten en vragen te stellen. In november worden onder meer beweegactiviteiten, themabijeenkomsten en een juridisch spreekuur aangekondigd.','Sommige activiteiten vragen om aanmelding of hebben een beperkte doelgroep. In de agenda van Enschede dichtbij staan de bekende data apart; controleer bij het Familiehuis voor de meest actuele tijden en beschikbaarheid.'],points:['Voor ouders en jonge kinderen in stadsdeel West','Bekijk de afzonderlijke activiteiten in de agenda']
    },
    'nieuws-vrijwilligers':{
      details:['Wijkwijzer zoekt vrijwilligers die inwoners ontvangen, luisteren en helpen bij praktische vragen. Het gaat bijvoorbeeld over brieven, geldzaken, wonen en het vinden van activiteiten. Waar een vraag te ingewikkeld is, helpt een vrijwilliger iemand naar de juiste organisatie.','De gemeente noemt minimaal één dagdeel beschikbaarheid, een goede beheersing van Nederlands en basisvaardigheid met de computer als belangrijke punten. Vrijwilligers krijgen een inwerkperiode en begeleiding door Incluzio.'],points:['Minimaal één dagdeel per week beschikbaar','Inwerken en begeleiding worden aangeboden']
    },
    'nieuws-mediagebruik':{
      details:['Ouders zoeken steeds vaker een balans tussen online activiteiten, schermtijd, privacy en het dagelijks leven van kinderen. De gemeente wijst op het belang van open gesprekken, afspraken die passen bij de leeftijd en aandacht voor wat kinderen online meemaken.','Via LOES zijn bijeenkomsten en webinars over positief digitaal opvoeden te vinden. Op 26 november is er een gespreksavond over mediaopvoeding in Bibliotheek Enschede voor ouders van 12- tot 16-jarigen.'],points:['Praten en afspraken maken helpt meer dan alleen een tijdslimiet','Passende bijeenkomsten zijn te vinden via LOES']
    },
    'nieuws-bijvank':{
      details:['De Gezonde Buurt Bijvank is bedoeld als plek waar spelen, bewegen en ontmoeten eenvoudiger worden. Bij de inrichting van de openbare ruimte is aandacht voor groen en voor plekken die bewoners samen kunnen gebruiken.','Het initiatief past in de aanpak van Enschede om buurten toegankelijker te maken. Kijk voor actuele buurtactiviteiten bij wijkorganisaties of in de agenda op deze site.']
    }
  };
  for(const e of [...U.events,...U.recurring])if(events[e.id])Object.assign(e,events[e.id]);
  for(const n of U.news)if(news[n.id])Object.assign(n,news[n.id]);
})();
