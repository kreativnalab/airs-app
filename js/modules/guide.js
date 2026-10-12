/* ============================================================
   AIRS — Legal Guide module
   Handles chapter show/hide, sidebar active state,
   chapter prev/next navigation, and per-chapter source callouts
   ============================================================ */

'use strict';

const CHAPTER_COUNT = 6;

/* ── Per-chapter source references ──────────────────────────────────────── */
/* label is now { en, sr_lat, sr_cyr } for multilingual display             */
const CHAPTER_SOURCES = {
  1: [
    {
      label: {
        en:     'Law on Copyright and Related Rights (Serbia, 2009/2019)',
        sr_lat: 'Zakon o autorskom i srodnim pravima (Srbija, 2009/2019)',
        sr_cyr: 'Закон о ауторском и сродним правима (Србија, 2009/2019)',
      },
      url: 'https://www.wipo.int/wipolex/en/legislation/details/19376',
    },
  ],
  2: [
    {
      label: {
        en:     'Fairly Trained — certified ethical AI training',
        sr_lat: 'Fairly Trained — sertifikovana etička obuka AI',
        sr_cyr: 'Fairly Trained — сертификована етичка обука АИ',
      },
      url: 'https://fairlytrained.org',
    },
    {
      label: {
        en:     'EU Copyright Directive 2019/790 — Text and Data Mining (Arts. 3–4)',
        sr_lat: 'Direktiva EU o autorskom pravu 2019/790 — Rudarenje teksta i podataka (čl. 3–4)',
        sr_cyr: 'Директива ЕУ о ауторском праву 2019/790 — Рударење текста и података (чл. 3–4)',
      },
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019L0790',
    },
    {
      label: {
        en:     'Law on Copyright and Related Rights (Serbia, 2009/2019)',
        sr_lat: 'Zakon o autorskom i srodnim pravima (Srbija, 2009/2019)',
        sr_cyr: 'Закон о ауторском и сродним правима (Србија, 2009/2019)',
      },
      url: 'https://www.wipo.int/wipolex/en/legislation/details/19376',
    },
  ],
  3: [
    {
      label: {
        en:     'Law on Copyright and Related Rights (Serbia, 2009/2019)',
        sr_lat: 'Zakon o autorskom i srodnim pravima (Srbija, 2009/2019)',
        sr_cyr: 'Закон о ауторском и сродним правима (Србија, 2009/2019)',
      },
      url: 'https://www.wipo.int/wipolex/en/legislation/details/19376',
    },
    {
      label: {
        en:     'EU AI Act — Regulation (EU) 2024/1689',
        sr_lat: 'EU AI zakon — Uredba (EU) 2024/1689',
        sr_cyr: 'ЕУ АИ закон — Уредба (ЕУ) 2024/1689',
      },
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689',
    },
    {
      label: {
        en:     'EU Copyright Directive 2019/790 — Text and Data Mining (Arts. 3–4)',
        sr_lat: 'Direktiva EU o autorskom pravu 2019/790 — Rudarenje teksta i podataka (čl. 3–4)',
        sr_cyr: 'Директива ЕУ о ауторском праву 2019/790 — Рударење текста и података (чл. 3–4)',
      },
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019L0790',
    },
    {
      label: {
        en:     'Serbia AI Ethics Guidelines (2023)',
        sr_lat: 'Smernice za etiku veštačke inteligencije u Srbiji (2023)',
        sr_cyr: 'Смернице за етику вештачке интелигенције у Србији (2023)',
      },
      url: 'https://www.ite.gov.rs/tekst/en/147/artificial-intelligence.php',
    },
    {
      label: {
        en:     'Serbia AI Strategy 2025–2030',
        sr_lat: 'Strategija razvoja veštačke inteligencije u Srbiji 2025–2030',
        sr_cyr: 'Стратегија развоја вештачке интелигенције у Србији 2025–2030',
      },
      url: 'https://www.digitalna-agenda.gov.rs',
    },
    {
      label: {
        en:     'GDPR / Serbian Law on Personal Data Protection',
        sr_lat: 'GDPR / Zakon o zaštiti podataka o ličnosti (Srbija)',
        sr_cyr: 'GDPR / Закон о заштити података о личности (Србија)',
      },
      url: 'https://www.poverenik.rs/en/',
    },
  ],
  4: [
    {
      label: {
        en:     'EU AI Act — Regulation (EU) 2024/1689',
        sr_lat: 'EU AI zakon — Uredba (EU) 2024/1689',
        sr_cyr: 'ЕУ АИ закон — Уредба (ЕУ) 2024/1689',
      },
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689',
    },
    {
      label: {
        en:     'Serbia AI Ethics Guidelines (2023)',
        sr_lat: 'Smernice za etiku veštačke inteligencije u Srbiji (2023)',
        sr_cyr: 'Смернице за етику вештачке интелигенције у Србији (2023)',
      },
      url: 'https://www.ite.gov.rs/tekst/en/147/artificial-intelligence.php',
    },
    {
      label: {
        en:     'Serbia AI Strategy 2025–2030',
        sr_lat: 'Strategija razvoja veštačke inteligencije u Srbiji 2025–2030',
        sr_cyr: 'Стратегија развоја вештачке интелигенције у Србији 2025–2030',
      },
      url: 'https://www.digitalna-agenda.gov.rs',
    },
  ],
  5: [
    {
      label: {
        en:     'Have I Been Trained?',
        sr_lat: 'Have I Been Trained? (Da li sam korišćen/a za obuku AI?)',
        sr_cyr: 'Have I Been Trained? (Да ли сам коришћен/а за обуку АИ?)',
      },
      url: 'https://haveibeentrained.com',
    },
    {
      label: {
        en:     'Spawning.ai — opt-out registry',
        sr_lat: 'Spawning.ai — registar za odjavu',
        sr_cyr: 'Spawning.ai — регистар за одјаву',
      },
      url: 'https://spawning.ai',
    },
    {
      label: {
        en:     'EU AI Act — Regulation (EU) 2024/1689',
        sr_lat: 'EU AI zakon — Uredba (EU) 2024/1689',
        sr_cyr: 'ЕУ АИ закон — Уредба (ЕУ) 2024/1689',
      },
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689',
    },
    {
      label: {
        en:     'EU Copyright Directive 2019/790 — Text and Data Mining (Arts. 3–4)',
        sr_lat: 'Direktiva EU o autorskom pravu 2019/790 — Rudarenje teksta i podataka (čl. 3–4)',
        sr_cyr: 'Директива ЕУ о ауторском праву 2019/790 — Рударење текста и података (чл. 3–4)',
      },
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019L0790',
    },
  ],
  6: [
    {
      label: {
        en:     'Law on Copyright and Related Rights (Serbia, 2009/2019)',
        sr_lat: 'Zakon o autorskom i srodnim pravima (Srbija, 2009/2019)',
        sr_cyr: 'Закон о ауторском и сродним правима (Србија, 2009/2019)',
      },
      url: 'https://www.wipo.int/wipolex/en/legislation/details/19376',
    },
    {
      label: {
        en:     'EU AI Act — Regulation (EU) 2024/1689',
        sr_lat: 'EU AI zakon — Uredba (EU) 2024/1689',
        sr_cyr: 'ЕУ АИ закон — Уредба (ЕУ) 2024/1689',
      },
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689',
    },
    {
      label: {
        en:     'EU Copyright Directive 2019/790 — Text and Data Mining (Arts. 3–4)',
        sr_lat: 'Direktiva EU o autorskom pravu 2019/790 — Rudarenje teksta i podataka (čl. 3–4)',
        sr_cyr: 'Директива ЕУ о ауторском праву 2019/790 — Рударење текста и података (чл. 3–4)',
      },
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019L0790',
    },
    {
      label: {
        en:     'GDPR / Serbian Law on Personal Data Protection',
        sr_lat: 'GDPR / Zakon o zaštiti podataka o ličnosti (Srbija)',
        sr_cyr: 'GDPR / Закон о заштити података о личности (Србија)',
      },
      url: 'https://www.poverenik.rs/en/',
    },
    {
      label: {
        en:     'Serbia AI Ethics Guidelines (2023)',
        sr_lat: 'Smernice za etiku veštačke inteligencije u Srbiji (2023)',
        sr_cyr: 'Смернице за етику вештачке интелигенције у Србији (2023)',
      },
      url: 'https://www.ite.gov.rs/tekst/en/147/artificial-intelligence.php',
    },
  ],
};

/* ── Helpers ─────────────────────────────────────────────────────────────── */

/** Normalise lang key: hyphens → underscores (matches JSON keys). */
function currentJsonLang() {
  return (window.getLang ? window.getLang() : 'en').replace(/-/g, '_');
}

/** Translated label for the "Sources" heading. */
function sourcesLabel() {
  return { en: 'Sources', sr_lat: 'Izvori', sr_cyr: 'Извори' }[currentJsonLang()] || 'Sources';
}

/** Build the sources callout element for a given chapter number. */
function buildSourcesBox(chapterNum) {
  const sources = CHAPTER_SOURCES[chapterNum];
  if (!sources || sources.length === 0) return '';

  const lang = currentJsonLang(); // 'en' | 'sr_lat' | 'sr_cyr'
  const items = sources.map(({ label, url }) => {
    const text = (typeof label === 'object') ? (label[lang] || label.en) : label;
    return `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a></li>`;
  }).join('');

  return `
    <div class="callout callout-info chapter-sources" style="margin-top:2rem;">
      <strong class="callout-title">${sourcesLabel()}</strong>
      <ul style="margin:.5rem 0 0;padding-left:1.25rem;">${items}</ul>
    </div>`;
}

/* ── Init ────────────────────────────────────────────────────────────────── */

function initGuide() {
  renderGuideNav();
  renderChapters();
  setupChapterNav();
  // Expose for router
  window.showChapter = showChapter;
  // Language change: re-render everything
  const _prevOnLangChange = window.onLangChange;
  window.onLangChange = () => {
    if (typeof _prevOnLangChange === 'function') _prevOnLangChange();
    renderGuideNav();
    renderChapters();
  };
}

/* ── Sidebar nav ─────────────────────────────────────────────────────────── */

function renderGuideNav() {
  const nav = document.getElementById('guide-sidebar-nav');
  if (!nav) return;
  nav.innerHTML = '';
  for (let i = 1; i <= CHAPTER_COUNT; i++) {
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href        = '#';
    a.dataset.ch  = i;
    a.textContent = `${window.t('guide.ch' + i + '.number')}: ${window.t('guide.ch' + i + '.title')}`;
    a.addEventListener('click', e => {
      e.preventDefault();
      showChapter(i);
      history.pushState({}, '', '/' + window.getLang() + '/guide/' + i);
    });
    li.appendChild(a);
    nav.appendChild(li);
  }
}

/* ── Chapter rendering ───────────────────────────────────────────────────── */

function renderChapters() {
  const container = document.getElementById('guide-chapters');
  if (!container) return;
  container.innerHTML = '';

  for (let i = 1; i <= CHAPTER_COUNT; i++) {
    const ch      = document.createElement('article');
    ch.id         = 'chapter-' + i;
    ch.className  = 'guide-chapter';
    ch.setAttribute('aria-label', window.t('guide.ch' + i + '.title'));

    const prevBtn = i > 1
      ? `<button class="btn btn-ghost btn-sm" onclick="showChapter(${i - 1})">
           <span data-i18n="guide.nav.prev">${window.t('guide.nav.prev')}</span>
         </button>`
      : '<span></span>';

    const nextBtn = i < CHAPTER_COUNT
      ? `<button class="btn btn-primary btn-sm" onclick="showChapter(${i + 1})">
           <span data-i18n="guide.nav.next">${window.t('guide.nav.next')}</span>
         </button>`
      : `<a href="#" class="btn btn-primary btn-sm" onclick="window.navigate('/assessment');return false;">
           ${window.t('module.assessment.cta')} →
         </a>`;

    ch.innerHTML = `
      <div class="chapter-header">
        <div class="chapter-number">${window.t('guide.ch' + i + '.number')}</div>
        <h1 class="chapter-title">${window.t('guide.ch' + i + '.title')}</h1>
        <p class="chapter-lead">${window.t('guide.ch' + i + '.lead')}</p>
        <p class="chapter-updated text-muted">
          <span data-i18n="guide.updated">${window.t('guide.updated')}</span>:
          <time datetime="2026-06">June 2026</time>
        </p>
      </div>
      <div class="prose">
        <div class="chapter-body">${window.t('guide.ch' + i + '.body')}</div>
        ${buildSourcesBox(i)}
      </div>
      <div class="chapter-nav">
        ${prevBtn}
        ${nextBtn}
      </div>`;

    container.appendChild(ch);
  }
  showChapter(1);
}

/* ── Show/hide chapter ───────────────────────────────────────────────────── */

function showChapter(num) {
  num = Math.max(1, Math.min(CHAPTER_COUNT, num));

  document.querySelectorAll('.guide-chapter').forEach((ch, idx) => {
    ch.classList.toggle('visible', idx + 1 === num);
  });

  // Sidebar active state
  document.querySelectorAll('#guide-sidebar-nav a').forEach(a => {
    a.classList.toggle('active', parseInt(a.dataset.ch) === num);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Chapter prev/next (buttons use inline onclick) ─────────────────────── */

function setupChapterNav() {
  // Buttons are rendered dynamically inside renderChapters()
  // and use inline onclick — nothing extra needed here.
}

/* ── Init after app.js boot completes (lang.json must be loaded first) ───── */
// app.js's boot() is async: it awaits loadStrings() before window.t() works.
// We poll until t('nav.home') returns a real string (not a [placeholder]).
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('guide-chapters')) return;
  const waitForStrings = setInterval(() => {
    if (typeof window.t === 'function' && window.t('nav.home') !== '[nav.home]') {
      clearInterval(waitForStrings);
      initGuide();
    }
  }, 20);
});
