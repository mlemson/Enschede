'use strict';
// Brononderbouwde uitleg in eigen woorden. Echte foto rechtstreeks uit het Sportaal-artikel.
(() => {
  const rows=window.ED_UPDATES?.news;
  if(!Array.isArray(rows))return;
  const item=rows.find(x=>x.id==='nieuws-pathmos');
  if(!item)return;
  item.title='Pathmos Beweegt brengt de buurt samen';
  item.summary='Een terugblik op een buurtactiviteit met sport, creativiteit en ontmoeting in Pathmos.';
  item.description='Sportaal kijkt in een bericht van 5 november 2026 terug op Pathmos Beweegt, een bijeenkomst tijdens de herfstvakantie. Bewoners van verschillende leeftijden kwamen op het plein samen voor een gezamenlijke dag vol activiteiten.';
  item.details=[
    'Voor kinderen was er veel te doen. Ze konden dansen, kickboksen, voetballen, knutselen en buiten spelen. Zo konden kinderen met verschillende interesses meedoen. Tijdens de activiteit was er bovendien gratis eten en drinken.',
    'Naast het bewegen was ontmoeting een belangrijk onderdeel. Wijkbewoners konden met elkaar praten en nieuwe contacten leggen. De gezamenlijke activiteiten zorgden voor contact tussen kinderen, ouders en andere inwoners.',
    'Sportaal bedankt in het oorspronkelijke nieuwsbericht de vrijwilligers, partners en buurtbewoners die deze dag hebben mogelijk gemaakt. Het is een terugblik op een gehouden activiteit en geen uitnodiging voor een toekomstige bijeenkomst.'
  ];
  item.points=[
    'Dansen, kickboksen, voetballen, knutselen en spelen',
    'Gratis eten en drinken',
    'Contact tussen buurtbewoners van verschillende leeftijden'
  ];
  item.image='https://www.sportaal.nl/assets/IMG_9814-1__FocusFillWyIwLjAwIiwiMC4wMCIsMTkyMCw4Nzhd.jpg';
  item.imageSource=item.url;
  item.imageCredit='Foto: Sportaal';
})();
