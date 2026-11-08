'use strict';
// Redactionele indeling: korte onderwerpnamen, met verdieping op de juiste plek.
// Behoud de oude titels als zoekwoorden, zodat links en zoekresultaten blijven werken.
(() => {
  const content = window.ED_CONTENT;
  if (!content?.topics || !content?.categories) return;

  const names = {
    geld:'Geld', schulden:'Schulden', toeslagen:'Toeslagen', administratie:'Administratie',
    werk:'Werk', wonen:'Wonen', gezondheid:'Gezondheid', relaties:'Relaties',
    zorg:'Zorg', veiligheid:'Veilig thuis', mantelzorg:'Mantelzorg', rouw:'Rouw en verlies',
    autisme:'Autisme', eenzaamheid:'Eenzaamheid', energie:'Energie', dementie:'Dementie',
    activiteiten:'Activiteiten', ontmoeten:'Ontmoeten', sport:'Sporten en bewegen',
    vrijwilligerswerk:'Vrijwilligerswerk', taal:'Taal en digitale hulp',
    opvoeden:'Opvoeden', kindpakket:'Kindpakket', jeugdactiviteiten:'Jeugdactiviteiten',
    scheiden:'Scheiden', jeugdhulp:'Jeugdhulp', baby:'Zwangerschap en baby',
    schoolstress:'Schoolstress', wijkwijzer:'Wijkwijzer'
  };
  const descriptions = {
    geld:'Rondkomen, schulden, toeslagen en administratie.',
    werk:'Werk zoeken, inkomen en daginvulling.',
    wonen:'Woonvragen, huurproblemen en ondersteuning thuis.',
    gezondheid:'Gezondheid, mentale klachten en ontwikkelingsvragen.',
    relaties:'Contact, conflicten, eenzaamheid en scheiden.',
    zorg:'Hulp aanvragen, ondersteuning thuis en mantelzorg.',
    veiligheid:'Advies bij onveiligheid thuis.',
    opvoeden:'Opvoeden, ontwikkeling, school en gezinsvragen.',
    baby:'Informatie over zwangerschap en de eerste jaren.',
    jeugdactiviteiten:'Activiteiten voor kinderen en jongeren.',
    jeugdhulp:'Toegang tot hulp, aanbieders en wachttijden.'
  };
  const tags = {
    geld:'Geld',schulden:'Geld',toeslagen:'Geld',administratie:'Geld',energie:'Geld',
    werk:'Werk',wonen:'Wonen',gezondheid:'Gezondheid',autisme:'Gezondheid',
    dementie:'Gezondheid',rouw:'Gezondheid',relaties:'Relaties',eenzaamheid:'Ontmoeten',
    zorg:'Zorg',mantelzorg:'Zorg',veiligheid:'Veiligheid',opvoeden:'Jeugd',
    baby:'Jeugd',schoolstress:'Jeugd',scheiden:'Jeugd',kindpakket:'Jeugd'
  };
  const byId = new Map(content.topics.map(topic => [topic.id, topic]));
  for (const topic of content.topics) {
    const name = names[topic.id];
    if (name && topic.title !== name) {
      topic.keywords = (topic.keywords || '') + ' ' + topic.title;
      topic.title = name;
    }
    if (descriptions[topic.id]) topic.summary = descriptions[topic.id];
    if (tags[topic.id]) topic.tag = tags[topic.id];
  }
  // Autisme is een specifiek onderwerp bij Gezondheid, geen los hoofddomein.
  const autisme = byId.get('autisme');
  if (autisme) autisme.category = 'hulp';

  const navigation = {
    hulp: {
      topics:['geld','werk','wonen','gezondheid','relaties','zorg','veiligheid'],
      subtopics:{
        geld:['schulden','toeslagen','administratie','energie'],
        gezondheid:['autisme','dementie','rouw'],
        relaties:['eenzaamheid','scheiden'],
        zorg:['mantelzorg']
      }
    },
    jeugd: {
      topics:['opvoeden','baby','jeugdactiviteiten','jeugdhulp'],
      subtopics:{opvoeden:['schoolstress','scheiden','autisme','kindpakket']}
    },
    doen: {
      topics:['activiteiten','ontmoeten','sport','taal','vrijwilligerswerk'],
      subtopics:{ontmoeten:['eenzaamheid']}
    },
    vrijwillig: {
      topics:['vrijwilligerswerk','ontmoeten'],
      subtopics:{vrijwilligerswerk:['activiteiten']}
    },
    buurt: {
      topics:['wijkwijzer','activiteiten','ontmoeten'],
      subtopics:{ontmoeten:['vrijwilligerswerk']}
    },
    professionals: {
      topics:['zorg','wijkwijzer','geld','jeugdhulp'],
      subtopics:{zorg:['mantelzorg','opvoeden'],jeugdhulp:['schoolstress']}
    }
  };
  for (const category of content.categories) {
    const config = navigation[category.id];
    if (!config) continue;
    category.topics = config.topics.filter(id => byId.has(id));
    category.subtopics = Object.fromEntries(Object.entries(config.subtopics)
      .map(([parent,children]) => [parent,children.filter(id => byId.has(id))])
      .filter(([,children]) => children.length));
  }
  // Maak subonderwerpen zichtbaar vanaf de hoofdpagina van hun ouder.
  for (const config of Object.values(navigation)) {
    for (const [parentId,children] of Object.entries(config.subtopics)) {
      const parent = byId.get(parentId);
      if (!parent) continue;
      parent.related = [...new Set([...children,...(parent.related || [])])];
    }
  }
})();
