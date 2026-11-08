'use strict';
// Gecontroleerde lokale aanvullingen: geen live API-aanroepen en geen persoonsgegevens.
(() => {
  const items=[
  {
    "id": "enschede-humanitas-thuisadministratie",
    "title": "Hulp bij brieven en geldzaken",
    "source": "Humanitas Twente",
    "type": "voorziening",
    "url": "https://humanitastwente.nl/wat-we-doen/thuisadministratie/",
    "summary": "Een vrijwilliger van Humanitas helpt tijdelijk om administratie, inkomsten en uitgaven overzichtelijk te krijgen. Ook bij het voorkomen of aanpakken van schulden.",
    "segments": [
      "In Enschede is Thuisadministratie beschikbaar voor inwoners die moeite hebben met brieven, rekeningen en formulieren.",
      "Je kunt zelf contact opnemen of via een hulpverlener om ondersteuning vragen."
    ],
    "terms": "Humanitas Enschede thuisadministratie geld schulden budget inkomen formulier brieven belasting rekeningen financiële zelfredzaamheid",
    "checked": "2026-11-08"
  },
  {
    "id": "enschede-humanitas-gezin",
    "title": "Opvoedondersteuning en ouder-kindcafés",
    "source": "Humanitas Twente",
    "type": "voorziening",
    "url": "https://humanitastwente.nl/regios/enschede/",
    "summary": "Humanitas biedt in Enschede onder meer Home-Start, Wel Thuis en ontmoetingsmomenten voor ouders met baby’s en dreumesen.",
    "segments": [
      "Gezinnen kunnen via vrijwilligers praktische en sociale steun krijgen tijdens het opvoeden.",
      "Voor jonge ouders zijn er Klets & Baby en Klets & Dreumes. Controleer via de organisatie wanneer deze bijeenkomsten plaatsvinden."
    ],
    "terms": "Humanitas Home Start Wel Thuis Klets Baby Dreumes ouders opvoeden gezin begeleiding jeugd kind koffie inloop Enschede",
    "checked": "2026-11-08"
  },
  {
    "id": "enschede-humanitas-maatjes",
    "title": "Een maatje of steun bij verlies",
    "source": "Humanitas Twente",
    "type": "voorziening",
    "url": "https://humanitastwente.nl/regios/enschede/",
    "summary": "Met activiteiten zoals Tandem, Match en Samen Actief ondersteunt Humanitas inwoners die contact, een maatje of een steuntje in de rug zoeken.",
    "segments": [
      "Humanitas heeft vrijwillige maatjesondersteuning voor verschillende leeftijden en situaties.",
      "Het precieze aanbod verschilt per gemeente. De Enschede-pagina vermeldt welke activiteiten lokaal beschikbaar zijn."
    ],
    "terms": "Humanitas maatje tandem match samen actief rouw verlies eenzaamheid buddy jongere ontmoeting Enschede",
    "checked": "2026-11-08"
  },
  {
    "id": "enschede-55plus-activiteiten",
    "title": "Cursussen en activiteiten voor 55-plussers",
    "source": "Stichting 55+ Enschede",
    "type": "activiteit",
    "url": "https://55plus-enschede.nl/",
    "summary": "Stichting 55+ Enschede organiseert ongeveer vijftig wekelijkse activiteiten en cursussen bij ’t Pluspunt en op andere locaties.",
    "segments": [
      "Het aanbod bevat onder meer wandelen, fietsen, talen, tekenen, bridge, tai chi, muziek en schilderen.",
      "Er geldt doorgaans een kleine deelnemersbijdrage. Controleer het actuele rooster 2026–2027 en de agenda op de website."
    ],
    "terms": "senioren ouderen 55 plus 55+ Enschede t Pluspunt Schuttersveld wandelen fietsen yoga talen bewegen cultuur cursus bridge ontmoeting samen",
    "checked": "2026-11-08"
  },
  {
    "id": "enschede-ixta-inloop",
    "title": "Inloop en herstel bij Ixta Noa",
    "source": "Ixta Noa",
    "type": "voorziening",
    "url": "https://www.ixtanoa.nl/regio-enschede-en-hengelo/",
    "summary": "Laagdrempelige gratis ondersteuning door ervaringsdeskundigen, met inloop, groepsactiviteiten en mogelijkheden om samen te eten in het Praktijkhuis aan de Molenstraat.",
    "segments": [
      "De inloop is voor mensen met een psychische of sociaal-emotionele kwetsbaarheid en hun naasten. Je hebt geen verwijzing of indicatie nodig.",
      "Er zijn herstelgroepen, creatieve en beweegactiviteiten en een aparte respijtvoorziening. Kijk op de lokale locatiepagina voor het actuele programma."
    ],
    "terms": "Ixta Noa psychische gezondheid ggz herstel ervaringsdeskundigheid eenzaamheid inloop respijt Molenstraat Enschede therapie ontmoeting samen eten gratis",
    "checked": "2026-11-08"
  },
  {
    "id": "enschede-voedselbank",
    "title": "Voedselhulp en sociale supermarkt",
    "source": "Voedselbank Enschede-Haaksbergen",
    "type": "voorziening",
    "url": "https://voedselbankenschedehaaksbergen.nl/ik-zoek-hulp/",
    "summary": "Wie tijdelijk niet rondkomt kan zich aanmelden voor voedselhulp. In Enschede werkt de voedselbank met een sociale supermarkt waar deelnemers zelf boodschappen kiezen.",
    "segments": [
      "De voedselbank beoordeelt samen met een hulpverlenende instantie of je in aanmerking komt.",
      "Je kunt zelf contact opnemen. Als aanmelden lastig is, kan een buurtcoach of de gemeente meedenken."
    ],
    "terms": "voedselbank voedselhulp armoede boodschappen supermarkt voedsel gratis geld financiële steun Enschede Haaksbergen",
    "checked": "2026-11-08"
  },
  {
    "id": "enschede-leergeld",
    "title": "Meedoen voor kinderen met weinig geld",
    "source": "Stichting Leergeld Enschede",
    "type": "voorziening",
    "url": "https://www.leergeldenschede.nl/",
    "summary": "Leergeld helpt kinderen tot en met 17 jaar uit gezinnen met weinig geld bij onder meer sport, cultuur, schoolspullen, fietsen, brillen en zwemles.",
    "segments": [
      "Het gaat om bijdragen of voorzieningen voor kinderen, niet om een algemene uitkering.",
      "Voorwaarden en aanvraagmogelijkheden staan op de eigen website van Leergeld Enschede. Controleer de actuele inkomensgrens bij de aanvraag."
    ],
    "terms": "leergeld enschede kindpakket kinderen geld armoede school schoolspullen laptop fiets bril contributie sport zwemles cultuur kleding",
    "checked": "2026-11-08"
  },
  {
    "id": "enschede-beien",
    "title": "Buurthuis Beien: ontmoeten en samen eten",
    "source": "Stichting Beien",
    "type": "activiteit",
    "url": "https://www.beien.nl/",
    "summary": "Buurtinitiatief in Enschede-Noord met ontmoeting, lunch, maandagavonddiner, activiteiten, moestuin en vrijwilligersmogelijkheden.",
    "segments": [
      "Beien organiseert activiteiten door en voor bewoners van Enschede-Noord.",
      "Je kunt helpen in onder meer de keuken, tuin of werkplaats. Bekijk het programma voor actuele tijden en beschikbaarheid."
    ],
    "terms": "Beien Enschede Noord Meeuwenstraat 160 buurthuis lunch diner samen eten moestuin werken vrijwilliger ontmoeten activiteiten",
    "checked": "2026-11-08"
  },
  {
    "id": "enschede-all4free-beien",
    "title": "All4Free: praktische hulp en spullen",
    "source": "All4Free via Buurthuis Beien",
    "type": "voorziening",
    "url": "https://www.beien.nl/all4free/",
    "summary": "Bij Buurthuis Beien is een uitgiftepunt van All4Free voor onder meer boodschappen en menstruatieproducten. De stichting ondersteunt ook met kleding en andere praktische spullen.",
    "segments": [
      "Het aanbod is afhankelijk van beschikbare donaties en van de situatie van de aanvrager.",
      "Neem contact op met de uitvoerder over actuele mogelijkheden."
    ],
    "terms": "all4free Enschede Beien menstruatieproducten gratis voedsel kleding speelgoed verzorging armoede spullen crisis praktische hulp",
    "checked": "2026-11-08"
  },
  {
    "id": "enschede-present-hulp",
    "title": "Hulp bij praktische klussen via Present",
    "source": "Stichting Present Enschede",
    "type": "voorziening",
    "url": "https://stichtingpresent.nl/enschede/ik-zoek-hulp-2/",
    "summary": "Present verbindt groepen vrijwilligers aan hulpvragen, zoals praktische klussen of sociale projecten. Aanmelden van hulpvragen verloopt via een betrokken professionele hulpverlener.",
    "segments": [
      "De hulp is bedoeld voor mensen die onvoldoende netwerk, financiële middelen of gezondheid hebben om zelf hulp te organiseren.",
      "Een hulpvraag leidt niet automatisch tot inzet: vrijwilligersgroep, tijdstip en project moeten bij elkaar passen."
    ],
    "terms": "Stichting Present Enschede praktische hulp klussen tuin huis woning vrijwilligers hulpverlener cliënt hulpvraag",
    "checked": "2026-11-08"
  },
  {
    "id": "enschede-wijkbudget",
    "title": "Een buurtidee uitvoeren met wijkbudget",
    "source": "Jij Maakt Enschede",
    "type": "informatie",
    "url": "https://jijmaaktenschede.nl/wijkbudget/",
    "summary": "Inwoners kunnen een voorstel indienen voor een activiteit of verbetering in hun buurt. Elke wijk heeft een eigen wijkbudget.",
    "segments": [
      "Voorbeelden zijn een buurtmoestuin, speelplek, een gezamenlijke activiteit of een AED.",
      "Een wijkbudgetcommissie beoordeelt of het idee haalbaar is en voldoende draagvlak heeft. De bedragen en spelregels verschillen per wijk."
    ],
    "terms": "jij maakt enschede wijkbudget buurtbudget subsidie idee activiteit wijk buurtmoestuin speeltuin samen organiseren inspraak initiatief",
    "checked": "2026-11-08"
  },
  {
    "id": "enschede-sociale-kaart-catalogus",
    "title": "Sociale kaart met voorzieningen in Enschede",
    "source": "Waar in Twente",
    "type": "voorziening",
    "url": "https://waarintwente.nl/",
    "summary": "Zoek lokaal en regionaal aanbod op thema, organisatie en plaats. Enschede dichtbij verwerkt ook de openbare voorzieningenlijst uit dit project in zijn zoekindex.",
    "segments": [
      "Het overzicht bevat vrij toegankelijke ondersteuning, ontmoetingsplekken, activiteiten en organisaties in Twente.",
      "Een organisatie die wel in Enschede werkt maar daar geen bevestigde bezoeklocatie heeft, hoeft geen fysieke kaartpin te hebben."
    ],
    "terms": "waarintwente sociale kaart twente enschede voorziening sociale basis wijk hulp meedoen ontmoet activiteiten voorliggend aanbod begeleiding",
    "checked": "2026-11-08"
  }
];
  const index=window.ED_SOURCE_INDEX;
  if(index && Array.isArray(index.items)){
    const existing=new Set(index.items.map(item=>item.id));
    for(const item of items)if(!existing.has(item.id)){index.items.push(item);existing.add(item.id);}
  }
  const topicAdditions={
    geld:[['Voedselhulp en ondersteuning','Kom je tijdelijk niet rond met boodschappen, kijk dan bij Voedselbank Enschede-Haaksbergen. Wie kinderen heeft, kan ook bij Leergeld Enschede informeren over bijvoorbeeld schoolspullen, een fiets of een sportvereniging. De voorwaarden verschillen per organisatie.']],
    administratie:[['Iemand die met je meekijkt','Humanitas Thuisadministratie kan tijdelijk met je meekijken naar brieven, rekeningen en inkomsten en uitgaven. Het doel is dat je het overzicht terugkrijgt en uiteindelijk weer zelf verder kunt.']],
    kindpakket:[['Ondersteuning via Leergeld','Leergeld Enschede helpt gezinnen met weinig geld zodat kinderen mee kunnen doen aan school, sport en cultuur. Bekijk rechtstreeks welke spullen of deelnamekosten vergoed kunnen worden.']],
    opvoeden:[['Vrijwillige steun voor gezinnen','Humanitas Twente heeft in Enschede gezinsondersteuning zoals Home-Start en Wel Thuis. Ook zijn er ontmoetingsmomenten voor ouders met baby’s en dreumesen.']],
    ontmoeten:[['Buurthuis en activiteiten','In Enschede-Noord kun je bij Beien terecht voor ontmoeting, maaltijden en activiteiten. Stichting 55+ organiseert cursussen en sociale activiteiten bij ’t Pluspunt. Beide hebben een eigen programma dat kan wijzigen.']],
    gezondheid:[['Herstel en contact','Ixta Noa in Enschede heeft een vrij toegankelijke inloop met ervaringsdeskundigen. Je kunt er praten, aan activiteiten deelnemen en vragen stellen over herstel. Voor persoonlijk medisch advies blijft de huisarts het aanspreekpunt.']],
    vrijwilligerswerk:[['Kortdurend helpen','Bij Stichting Present Enschede helpen groepen vrijwilligers bij praktische vragen van inwoners. Een hulpvraag moet via een betrokken professionele hulpverlener worden ingediend. Humanitas en Beien zoeken ook vrijwilligers.']],
    wijkwijzer:[['Zelf een buurtidee uitvoeren','Via Jij Maakt Enschede kun je een idee voor jouw straat of buurt indienen. Er zijn wijkbudgetten voor bijvoorbeeld ontmoeting, spelen, groen of samen iets organiseren.']],
    activiteiten:[['Vast aanbod en buurtinitiatieven','Stichting 55+ heeft een uitgebreid rooster met terugkerende activiteiten. Beien heeft buurtactiviteiten in Enschede-Noord en Ixta Noa biedt herstelgerichte activiteiten. Gebruik de bronagenda om tijden te controleren.']]
  };
  const topicLinks={
    geld:[['Voedselbank Enschede','https://voedselbankenschedehaaksbergen.nl/ik-zoek-hulp/','Voedselhulp en aanmelden'],['Leergeld Enschede','https://www.leergeldenschede.nl/','Hulp voor kinderen']],
    administratie:[['Humanitas Thuisadministratie','https://humanitastwente.nl/wat-we-doen/thuisadministratie/','Vrijwillige ondersteuning']],
    kindpakket:[['Leergeld Enschede','https://www.leergeldenschede.nl/','Bijdragen voor school, sport en cultuur']],
    opvoeden:[['Humanitas Enschede','https://humanitastwente.nl/regios/enschede/','Gezinssteun en ouder-kindcafés']],
    ontmoeten:[['Buurthuis Beien','https://www.beien.nl/','Activiteiten Enschede-Noord'],['Stichting 55+','https://55plus-enschede.nl/','Cursussen en ontmoetingen']],
    gezondheid:[['Ixta Noa Enschede','https://www.ixtanoa.nl/regio-enschede-en-hengelo/','Inloop en herstel']],
    vrijwilligerswerk:[['Stichting Present Enschede','https://stichtingpresent.nl/enschede/','Vrijwillige praktische hulp'],['Buurthuis Beien','https://www.beien.nl/','Vrijwilligers in de buurt']],
    wijkwijzer:[['Jij Maakt Enschede','https://jijmaaktenschede.nl/wijkbudget/','Wijkbudget en buurtideeën']]
  };
  const topics=window.ED_CONTENT?.topics||[];
  for(const topic of topics){
    for(const [title,text] of topicAdditions[topic.id]||[]){
      if(!topic.sections.some(section=>section.title===title))topic.sections.push({title,text});
    }
    for(const [title,url,note] of topicLinks[topic.id]||[]){
      if(!topic.links.some(link=>link.url===url))topic.links.push({title,url,note});
    }
  }
})();
