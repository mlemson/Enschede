# Enschede dichtbij online zetten

## GitHub Pages (voorkeur: eigen repository)

1. Open https://github.com/new en maak een **public** repository met de naam `enschede-dichtbij` (gebruik bestaande eigenaar/account). Begin desgewenst met een README.
2. Upload vervolgens **alle bestanden en mappen** uit dit pakket naar de hoofdmap (`main`), inclusief de **verborgen** map `.github/workflows/`. Upload de ZIP niet als één bestand: pak hem eerst uit.
3. Open op GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open **Actions → Publiceer Enschede dichtbij** en start zo nodig **Run workflow**.
5. Na een geslaagde run hoort de URL deze vorm te hebben: `https://<github-gebruikersnaam>.github.io/enschede-dichtbij/`.

De exacte live-URL en succesvolle publicatie moeten in GitHub Pages/Actions worden bevestigd; de URL hierboven is een voorbeeld.

## Wat werkt op de site?

- Thema's, inhoudelijke dossiers, bronoverzicht, zoekfunctie en lokale zoekchat.
- Agenda en nieuws vanuit meegeleverde inhoud, inclusief filters en bronvermeldingen.
- Installeren als webapp (PWA); afbeeldingen, pictogrammen en scripts zijn lokaal opgenomen.

## Volledige bronlaag en verversing

- `knowledge.js`, `content-dossiers.js`, `source-index.seed.json`, `source-sites.json`: inhoud en bronnen.
- `local-updates.js`: redactionele agenda en nieuws.
- `tools/build_source_index.py`, `tools/refresh_updates.py`: netwerkimporters.
- `.github/workflows/update-search-index.yml`: dagelijkse zoekindex-poging (03:32 UTC).
- `.github/workflows/refresh-news-agenda.yml`: dagelijkse nieuws-/agendapoging (05:25 UTC).
- `.github/workflows/publish-pages.yml`: publicatie op `main` en na acties die nieuwe data committen.

In **Settings → Actions → General** moeten GitHub Actions toegestaan zijn. Voor de twee updateacties moet `GITHUB_TOKEN` repository-inhoud mogen schrijven (**Workflow permissions: Read and write permissions**). Zonder schrijfrechten werkt de site wel, maar wordt hij niet automatisch bijgewerkt.

De import is niet gegarandeerd voor elke bronsite. Robots.txt, auteursrechten, kwaliteit en veranderde paginaopmaak kunnen opname beperken. De index en de gegevens zijn géén live toegang tot alle bronnen. Controleer daarom na publicatie de Actions-logboeken en de resultaten.

## Privacy, bronnen en status

De zoekchat gebruikt geen AI-API. Zoekvragen blijven in de browser. De site heeft geen accounts of eigen backend; GitHub Pages en de websites waarnaar wordt doorgelinkt hebben hun eigen privacy-/logbeleid. De opgenomen artikelen zijn samenvattingen en bronfragmenten: geen toestemming om externe sites integraal te kopiëren. Controleer de inhoud en in het bijzonder nieuws en agenda voordat je de website breed deelt.

## Alternatief zonder GitHub

De ZIP van alleen de gebouwde map `_site` kan worden geüpload naar een statische host (zoals Netlify Drop of een statische Vercel-site). Dat maakt de webapp zichtbaar, maar **start geen GitHub Actions**. De agenda- en zoekindex worden dan niet automatisch vernieuwd.