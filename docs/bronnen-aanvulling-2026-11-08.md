# Aanvullende bronnen Enschede (8 november 2026)

De catalogus van **Waar in Twente** is al aangesloten via `data/catalog.json` in `source-sites.json`. Geen tweede crawler voor dezelfde catalogus: dit voorkomt dubbelen.

Nieuwe lokale bronnen: Humanitas Twente (Enschede), Stichting 55+, Ixta Noa Enschede, Voedselbank Enschede-Haaksbergen, Beien, Stichting Present Enschede en Jij Maakt Enschede.

**Stichting Leergeld Enschede** is via een redactioneel gecontroleerde vermelding beschikbaar. Automatisch uitlezen is nog niet geactiveerd omdat landelijke ingesloten formuliertekst ten onrechte kan suggereren dat Enschede niet wordt bediend.

**SUN Twente** is bewust niet als Enschedese voorziening opgenomen: de officiële website noemt Enschede niet bij de aangesloten gemeenten.

De dagelijkse import mag alleen openbare inhoud verzamelen met inachtneming van robots.txt. De index geeft geen live beschikbaarheid of garanties over openingstijden, toelating of geldbedragen. Uit een algemene activiteitenpagina worden geen eenmalige data afgeleid zonder bewijs.

`source-expansion.js` maakt de redactionele gegevens direct vindbaar, totdat de dagelijkse `build_source_index.py` de aanvullende sites heeft verwerkt. Dezelfde vermeldingen staan in `source-index.seed.json`.
