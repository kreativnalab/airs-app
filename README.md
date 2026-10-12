# AIRS — AI Rights Shield

**Practical tools for independent artists and creators facing AI copyright risks.**

Live app: [airs-app.kreativalab.org](https://airs-app.kreativalab.org/)  
Developed by: [KreativaLab](https://kreativalab.org), Belgrade  
License: Content CC BY 4.0 · Code MIT

---

## What it is

AIRS is a free, browser-based tool for independent artists, musicians, writers and designers in Serbia dealing with AI and copyright. It includes:

- **Legal Guide** — plain-language overview of AI and copyright law in Serbia
- **Self-Assessment Tool** — interactive questionnaire to identify your risk profile
- **Policy Brief Generator** — fill-in form that produces a ready-to-send advocacy document (PDF + copy/paste)
- **Tools Directory** — curated list of free tools for independent creators
- **Legal & Transparency** — plain language standard, privacy policy, terms of use

Available in three languages: Serbian (Latin), Serbian (Cyrillic), English.

---

## Structure

```
index.html          Single-page app entry point
css/
  main.css          All styles
js/
  app.js            Router, language controller, navigation
  lang.json         All UI strings (en / sr-lat / sr-cyr)
  modules/
    guide.js        Legal Guide module
    assessment.js   Self-Assessment Tool module
    brief.js        Policy Brief Generator module
    tools.js        Tools Directory module
docs/               Internal documentation for editors and translators
downloads/          Downloadable resources
404.html            GitHub Pages SPA fallback
_redirects          Netlify redirect rules
sitemap.xml         SEO sitemap
robots.txt          Crawler rules
```

---

## How it works

AIRS is a vanilla JS single-page application with no build step and no dependencies beyond jsPDF (loaded from CDN for PDF export). All content is static. No data is collected or sent to any server.

Language switching is handled by `app.js` (`applyLang()`) reading keys from `lang.json` and injecting them into `[data-i18n]` elements via `innerHTML`. The router maps URL paths (`/sr-lat/legal`, `/en/guide`, etc.) to page sections.

---

## Editing content

See `docs/CONTENT_EDITING.md` for instructions on editing text, and `docs/TRANSLATION_GUIDE.md` for adding or updating translations.

---

## Privacy

- No cookies
- No tracking scripts
- No data leaves the browser
- Language preference stored in `localStorage` only

---

## Credits

Developed by KreativaLab as part of the AIRS project, supported by Digital Spark / DDI.

Logo and visual identity: KreativaLab  
Legal content review: [pending]
