# AIRS — Content Editing Guide

This guide explains how to update the text content of the AIRS application **without any coding knowledge**. You only need a plain text editor (Notepad, TextEdit, or any code editor).

---

## How content works

All text in the application is stored in one file: **`js/lang.json`**

This file contains every piece of text in the application — headings, buttons, body paragraphs — in three language variants side by side:

```json
"hero.title": {
  "en":     "Find out if AI is using your work...",
  "sr_lat": "Saznajte da li AI koristi vaše radove...",
  "sr_cyr": "Сазнајте да ли AI користи ваше радове..."
}
```

To change a piece of text: find its key, change the value inside the quotation marks for the language you want to update, save the file.

**Rules:**
- Never change the key (the part before the colon, e.g. `"hero.title"`)
- Always keep the quotation marks around values
- Special characters in Serbian (š, č, ć, đ, ž) are fine — save the file as UTF-8
- After editing, refresh the browser to see the changes

---

## Updating Legal Guide chapters

Legal Guide chapter content is in `js/lang.json` under keys like:

```
guide.ch1.body
guide.ch2.body
...
guide.ch6.body
```

Each has an `en`, `sr_lat`, and `sr_cyr` value. Currently these are marked `[PLACEHOLDER]`. Replace the placeholder text with the actual chapter content.

**For longer chapters**, the content can include basic HTML tags:
- `<strong>bold text</strong>` — bold
- `<em>italic text</em>` — italic
- `<a href="https://...">link text</a>` — hyperlink

Example:
```json
"guide.ch1.body": {
  "en":     "Copyright arises <strong>automatically</strong> when you create an original work...",
  "sr_lat": "Autorska prava nastaju <strong>automatski</strong> kada stvorite originalno delo...",
  "sr_cyr": "Ауторска права настају <strong>аутоматски</strong> када створите оригинално дело..."
}
```

---

## Updating scenario narratives

Scenario text is in `js/lang.json` under keys like:

```
scenario.a.story    — the narrative paragraph (Ana's situation)
scenario.a.covers   — the "Covers:" list of topics
scenario.b.story
scenario.b.covers
...
```

Edit the values for each language variant as needed.

---

## Updating next steps (Self-Assessment results)

The personalised next steps are defined in `js/modules/assessment.js`, in the `getNextSteps()` function.

They are organised as:
```
steps[language][scenario][relevance] = [ array of step strings ]
```

For example, `steps['en']['a']['happened']` is the list of next steps shown to an English-speaking visual artist who says the scraping scenario has already happened to them.

To update a next step: find the matching `[language][scenario][relevance]` block and edit the strings in the array.

---

## Updating the Policy Brief demand text

Demand text is in `js/modules/brief.js`, in the `DEMAND_TEXTS` object:

```javascript
const DEMAND_TEXTS = {
  'demand.optout': {
    en: 'AI companies and platform operators must provide...',
    'sr-lat': 'AI kompanije i operateri platformi moraju...',
    'sr-cyr': 'AI компаније и оператери платформи морају...',
  },
  ...
};
```

Edit the string values for each demand and language as needed.

---

## After editing

1. Save the file (UTF-8 encoding)
2. Upload the changed file to your web server (replacing the old version)
3. Refresh the browser — changes appear immediately, no rebuild needed
