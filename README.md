# Enschede dichtbij
Mobielvriendelijke informatie-app voor inwoners en hulpverleners in Enschede. Onafhankelijk prototype, geen officiële gemeentelijke dienst.

## Website
- De app draait volledig in de browser. Zoekmachine en digitale wegwijzer gebruiken een lokale index; zoekvragen worden niet naar een externe AI gestuurd.
- Artikelen: `knowledge.js`, `content-dossiers.js`, `guide.js`.
- Agenda en nieuws: `local-updates.js`, `auto-updates.js`, `hub.js`.
- Bronnen en zoeken: `source-index.js`, `source-index.json`, `search-engine.js`.
- Stijl en PWA: `styles.css`, `guide.css`, `hub.css`, `manifest.webmanifest`, `sw.js` en `assets/`.

## GitHub Pages
Kies **Settings → Pages → GitHub Actions**. De workflow `.github/workflows/publish-pages.yml` publiceert de bestanden uit `_site` na elke push naar `main`.

## Bronnen en actualiteit
De redactieteksten, afspraken en nieuwsitems zijn momentopnamen. Controleer veranderlijke voorwaarden en data bij de bron voordat je er besluiten op baseert. Automatische updates zijn een aparte uitbreidingsstap en mogen alleen worden ingeschakeld voor betrouwbare en toegestane gegevensbronnen.

[Jeugdhulp Twente](https://jeugdhulptwente.nl/) · [Waar in Twente](https://waarintwente.nl/) · [Online Hulp Enschede](https://onlinehulpenschede.nl/)


## Dagelijkse nieuwsupdates

De workflow `.github/workflows/daily-refresh.yml` draait normaliter dagelijks om 04:40 UTC. Hij leest openbaar gemeentenieuws via RSS, controleert nieuws op Sportaal en vergelijkt bestaande nieuwsbronnen. Nieuwe bronvermeldingen komen in `auto-updates.js`; gecontroleerde data en bronnen met gewijzigde tekst staan in `data/news-review.json`. Bij een blokkade of onbereikbare website blijft de laatste bruikbare informatie behouden. De oorspronkelijke artikelen worden niet integraal overgenomen: bestaande redactionele samenvattingen blijven staan totdat ze zijn nagekeken. De workflow kan ook handmatig in GitHub Actions worden gestart.
