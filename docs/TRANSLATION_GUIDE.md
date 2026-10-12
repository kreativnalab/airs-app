# AIRS — Translation Guide

How to add a new language variant to the AIRS application. No coding knowledge required beyond basic text editing.

---

## Files to edit (4 total)

1. `js/lang.json` — add new language keys for all UI strings
2. `js/app.js` — register the new language code
3. `index.html` — add a button to the language toggle
4. `sitemap.xml` — add hreflang entries for SEO

---

## Step 1 — Add translations to `js/lang.json`

Every entry in `lang.json` looks like this:

```json
"hero.title": {
  "en":     "Find out if AI is using your work...",
  "sr_lat": "Saznajte da li AI koristi vaše radove...",
  "sr_cyr": "Сазнајте да ли AI користи ваше радове..."
}
```

For a new language (e.g. Bosnian, `bs`), add a `"bs"` key to every entry:

```json
"hero.title": {
  "en":     "Find out if AI is using your work...",
  "sr_lat": "Saznajte da li AI koristi vaše radove...",
  "sr_cyr": "Сазнајте да ли AI користи ваше радове...",
  "bs":     "Saznajte da li AI koristi vaše radove..."
}
```

Repeat for every key in the file. If a translation is missing, the app falls back to English automatically.

---

## Step 2 — Register the language in `js/app.js`

Find this line near the top of `app.js`:

```javascript
const LANGS = ['en', 'sr-lat', 'sr-cyr'];
```

Add the new language code:

```javascript
const LANGS = ['en', 'sr-lat', 'sr-cyr', 'bs'];
```

---

## Step 3 — Add a toggle button in `index.html`

Find the language toggle section:

```html
<div class="lang-toggle" role="group" aria-label="Select language">
  <button class="lang-btn active" data-lang="sr-lat" aria-pressed="true">SR-lat</button>
  <button class="lang-btn"        data-lang="sr-cyr" aria-pressed="false">SR-ćir</button>
  <button class="lang-btn"        data-lang="en"     aria-pressed="false">EN</button>
</div>
```

Add a new button:

```html
<button class="lang-btn" data-lang="bs" aria-pressed="false">BS</button>
```

---

## Step 4 — Add hreflang entries in `sitemap.xml`

For each `<url>` block in `sitemap.xml`, add a new `<xhtml:link>` entry:

```xml
<xhtml:link rel="alternate" hreflang="bs" href="https://airs-app.kreativalab.org/bs/guide"/>
```

---

## Notes on Serbian scripts

The existing `sr-lat` (Latin) and `sr-cyr` (Cyrillic) variants are both standard Serbian. They share the same grammar and vocabulary — only the script differs. The Cyrillic version in `lang.json` was produced by a native-speaker translator rather than automatic conversion, to ensure natural register.

For a Bosnian (`bs`) variant, the Latin-script Serbian text is an excellent starting point — differences are minor and primarily lexical.
