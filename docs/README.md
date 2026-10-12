# AIRS — AI Rights Shield Web Application

**Free, open-access, bilingual (Serbian / English) platform for independent creators navigating AI copyright risks.**

Live: [airs-app.kreativalab.org](https://airs-app.kreativalab.org)  
Project: [KreativaLab](https://kreativalab.org)  
Licence: Code — MIT · Content — CC BY 4.0

---

## What this is

AIRS is a civic technology tool built for independent artists, musicians, writers, and designers in Serbia. It provides three functional modules:

1. **Legal Guide** — six-chapter plain-language explanation of AI, copyright, and creator rights in Serbia
2. **Self-Assessment Toolkit** — interactive scenario-based risk assessment with personalised next steps
3. **Policy Brief Template** — interactive web form with live preview and PDF export

---

## Technology

- Vanilla HTML5 / CSS3 / JavaScript — no framework, no build step, no npm required
- History API routing (clean `/en/guide`, `/sr-lat/assessment` URLs)
- JSON-based i18n: English / Serbian Latin / Serbian Cyrillic
- jsPDF (CDN) for browser-side PDF generation
- GitHub Pages or Netlify for hosting (static files only)
- WCAG 2.1 AA accessibility target
- Privacy by design: no cookies, no tracking, no personal data collected

---

## Folder structure

```
/index.html          Root SPA shell — all pages live here
/404.html            GitHub Pages History API fallback
/_redirects          Netlify routing rules
/robots.txt
/sitemap.xml
/css/
  main.css           Full design system and component styles
/js/
  app.js             Router, language controller, navigation
  lang.json          All UI strings: EN / SR-lat / SR-cyr
  modules/
    guide.js         Legal Guide chapter logic
    assessment.js    Self-Assessment Toolkit logic
    brief.js         Policy Brief form, PDF export, sharing
/downloads/          Pre-rendered PDF and .docx versions (to be added)
/docs/
  README.md          This file
  CONTENT_EDITING.md How to update Legal Guide content
  TRANSLATION_GUIDE.md How to add a new language
```

---

## Deployment

### cPanel / traditional web host
1. Upload the entire folder contents to `public_html` (or your subdomain folder)
2. No server-side configuration needed — all static files
3. For History API routing to work on Apache, add an `.htaccess` file (see below)

**`.htaccess` for Apache (cPanel):**
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

### GitHub Pages
1. Push this repository to GitHub
2. Go to Settings → Pages → Source: main branch, root folder
3. The `404.html` file handles History API routing automatically

### Netlify
1. Drag the folder to Netlify drop, or connect the GitHub repo
2. The `_redirects` file handles routing automatically
3. No build command needed

---

## Adding / editing content

See `docs/CONTENT_EDITING.md` for step-by-step instructions on:
- Updating Legal Guide chapter text
- Adding or changing scenario narratives
- Updating demand text in the Policy Brief

---

## Adding a new language

See `docs/TRANSLATION_GUIDE.md` for instructions. Summary:
1. Add new keys to `js/lang.json` (e.g. `"sr-lat"` → `"bs"`)
2. Add the new lang code to the `LANGS` array in `js/app.js`
3. Add a new button to the language toggle in `index.html`
4. Add the new URL prefix to the sitemap and hreflang tags

No other code changes required.

---

## Licence

- **Code**: MIT — use, copy, modify, distribute freely
- **Content**: CC BY 4.0 — reproduce and adapt with attribution to AIRS / KreativaLab
- See `REUSE.md` for full licence information per component
