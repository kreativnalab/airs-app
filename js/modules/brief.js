/* ============================================================
   AIRS — Policy Brief module
   Interactive form with live preview.
   PDF export via jsPDF (loaded from CDN).
   No data leaves the browser.
   ============================================================ */

'use strict';

// ── Field definitions ─────────────────────────────────────────────────────
const FIELDS = [
  'brief-org',
  'brief-name',
  'brief-role',
  'brief-city',
  'brief-problem',
  'brief-evidence',
  'brief-about',
  'brief-signatories',
];

const DEMANDS = [
  { id: 'demand-optout',     key: 'demand.optout' },
  { id: 'demand-attr',       key: 'demand.attr' },
  { id: 'demand-remun',      key: 'demand.remun' },
  { id: 'demand-legalgap',   key: 'demand.legalgap' },
  { id: 'demand-collective', key: 'demand.collective' },
];

const DEMAND_TEXTS = {
  'demand.optout': {
    en: 'AI companies and platform operators must provide clear, accessible, and effective opt-out mechanisms allowing creators to exclude their work from AI training datasets. Opt-out must not require technical expertise and must be honoured within a defined legal timeframe.',
    'sr-lat': 'AI kompanije i operateri platformi moraju pružiti jasne, dostupne i efikasne mehanizme za odjavu koji omogućavaju stvaraocima da isključe svoje radove iz skupova podataka za AI treniranje. Odjava ne sme zahtevati tehničko znanje i mora biti poštovana u zakonski definisanom roku.',
    'sr-cyr': 'AI kompanije i operateri platformi moraju pruziti jasne, dostupne i efikasne mehanizme za odjavu koji omogucavaju stvaraocima da iskljuce svoje radove iz skupova podataka za AI treniranje. Odjava ne sme zahtevati tehnicko znanje i mora biti postovana u zakonski definisanom roku.',
  },
  'demand.attr': {
    en: 'Where creative works are used in AI training, creators must receive proper attribution. AI-generated outputs that reproduce, adapt, or strongly resemble a specific creator\'s work must be labelled accordingly.',
    'sr-lat': 'Kada se kreativna dela koriste u AI treniranju, stvaraoci moraju primiti odgovarajuću atribuciju. AI-generisani izlazi koji reprodukuju, adaptiraju ili jako liče na rad određenog stvaraoca moraju biti adekvatno označeni.',
    'sr-cyr': 'Kada se kreativna dela koriste u AI treniranju, stvaraoci moraju primiti odgovarajucu atribuciju. AI-generisani izlazi koji reprodukuju, adaptiraju ili jako lice na rad odredjenog stvaraoca moraju biti adekvatno oznaceni.',
  },
  'demand.remun': {
    en: 'Creators whose works are used to train commercial AI systems are entitled to fair remuneration. Mechanisms for collecting and distributing such remuneration — including through collective licensing — must be established in Serbian law.',
    'sr-lat': 'Stvaraoci čija dela se koriste za treniranje komercijalnih AI sistema imaju pravo na pravičnu naknadu. Mehanizmi za prikupljanje i raspodelu takve naknade — uključujući kolektivno licenciranje — moraju biti uspostavljeni srpskim zakonom.',
    'sr-cyr': 'Stvaraoci cija dela se koriste za treniranje komercijalnih AI sistema imaju pravo na pravisnu naknadu. Mehanizmi za prikupljanje i raspodelu takve naknade — ukljucujuci kolektivno licenciranje — moraju biti uspostavljeni srpskim zakonom.',
  },
  'demand.legalgap': {
    en: 'The Serbian Law on Copyright and Related Rights must be updated to explicitly address AI training data use, closing the current legal gap that leaves creators without adequate protection.',
    'sr-lat': 'Srpski zakon o autorskom i srodnim pravima mora biti ažuriran kako bi eksplicitno regulisao upotrebu podataka za AI treniranje, zatvarajući trenutnu pravnu prazninu koja ostavlja stvaraoce bez adekvatne zaštite.',
    'sr-cyr': 'Srpski zakon o autorskom i srodnim pravima mora biti azuriran kako bi eksplicitno regulisao upotrebu podataka za AI treniranje, zatvarajuci trenutnu pravnu prazninu koja ostavlja stvaraoce bez adekvatne zastite.',
  },
  'demand.collective': {
    en: 'Collective licensing frameworks for AI training data should be developed in partnership with collecting societies (including SOKOJ) and independent creator associations, ensuring equitable representation of Serbia\'s independent cultural sector.',
    'sr-lat': 'Okviri kolektivnog licenciranja za podatke za AI treniranje treba da se razviju u partnerstvu sa organizacijama za kolektivno ostvarivanje prava (uključujući SOKOJ) i udruženjima nezavisnih stvaralaca.',
    'sr-cyr': 'Okviri kolektivnog licenciranja za podatke za AI treniranje treba da se razviju u partnerstvu sa organizacijama za kolektivno ostvarivanje prava (ukljucujuci SOKOJ) i udruzenjima nezavisnih stvaralaca.',
  },
};

// ── Cyrillic → Latin transliterator for PDF output ────────────────────────
// jsPDF's built-in Helvetica cannot render Cyrillic glyphs.
// sr-cyr PDF output is transliterated to Serbian Latin so text is readable.
// The in-browser preview still shows Cyrillic correctly.
function toPdfText(text, lang) {
  if (lang !== 'sr-cyr') return text;
  const map = {
    'А':'A','Б':'B','В':'V','Г':'G','Д':'D','Ђ':'Đ','Е':'E','Ж':'Ž','З':'Z','И':'I',
    'Ј':'J','К':'K','Л':'L','Љ':'Lj','М':'M','Н':'N','Њ':'Nj','О':'O','П':'P','Р':'R',
    'С':'S','Т':'T','Ћ':'Ć','У':'U','Ф':'F','Х':'H','Ц':'C','Ч':'Č','Џ':'Dž','Ш':'Š',
    'а':'a','б':'b','в':'v','г':'g','д':'d','ђ':'đ','е':'e','ж':'ž','з':'z','и':'i',
    'ј':'j','к':'k','л':'l','љ':'lj','м':'m','н':'n','њ':'nj','о':'o','п':'p','р':'r',
    'с':'s','т':'t','ћ':'ć','у':'u','ф':'f','х':'h','ц':'c','ч':'č','џ':'dž','ш':'š'
  };
  return text.replace(/[Ѐ-ӿ]/g, ch => map[ch] || ch);
}

// ── Get field values ──────────────────────────────────────────────────────
function getValues() {
  const vals = {};
  FIELDS.forEach(id => {
    const el = document.getElementById(id);
    vals[id] = el ? el.value.trim() : '';
  });
  vals.demands = DEMANDS
    .filter(d => document.getElementById(d.id)?.checked)
    .map(d => d.key);
  vals.lang = window.getLang ? window.getLang() : 'en';
  return vals;
}

// ── Live preview ──────────────────────────────────────────────────────────
function updatePreview() {
  const v    = getValues();
  const lang = v.lang;
  const prev = document.getElementById('preview-doc');
  if (!prev) return;

  const byLabel    = { en: 'Submitted by',   'sr-lat': 'Podnosi',         'sr-cyr': 'Подноси' }[lang]     || 'Submitted by';
  const dateLabel  = { en: 'Date',           'sr-lat': 'Datum',           'sr-cyr': 'Датум' }[lang]        || 'Date';
  const probLabel  = { en: 'The problem',    'sr-lat': 'Problem',         'sr-cyr': 'Проблем' }[lang]      || 'The problem';
  const evLabel    = { en: 'Our evidence',   'sr-lat': 'Naši dokazi',     'sr-cyr': 'Наши докази' }[lang]  || 'Our evidence';
  const demLabel   = { en: 'Our demands',    'sr-lat': 'Naši zahtevi',    'sr-cyr': 'Наши захтеви' }[lang] || 'Our demands';
  const aboutLabel = { en: 'About us',       'sr-lat': 'O nama',          'sr-cyr': 'О нама' }[lang]       || 'About us';
  const sigLabel   = { en: 'Signatories',    'sr-lat': 'Potpisnici',      'sr-cyr': 'Потписници' }[lang]   || 'Signatories';

  const locales = { en: 'en-GB', 'sr-lat': 'sr-Latn-RS', 'sr-cyr': 'sr-Cyrl-RS' };
  const today = new Date().toLocaleDateString(locales[lang] || 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

  const demandsHTML = v.demands.length
    ? v.demands.map(dk => {
        const text = DEMAND_TEXTS[dk]?.[lang] || DEMAND_TEXTS[dk]?.['en'] || '';
        return `<li style="margin-bottom:.75rem;line-height:1.6;">${text}</li>`;
      }).join('')
    : `<li style="color:var(--c-text-3);font-style:italic;">[${
        { en: 'Select demands above', 'sr-lat': 'Izaberite zahteve gore', 'sr-cyr': 'Изаберите захтеве горе' }[lang] || 'Select demands above'
      }]</li>`;

  const titleText = {
    en: 'Policy Brief: AI Copyright Rights for Independent Creators in Serbia',
    'sr-lat': 'Policy Brief: AI autorska prava za nezavisne stvaraoce u Srbiji',
    'sr-cyr': 'Policy Brief: AI ауторска права за независне ствараоце у Србији',
  }[lang] || 'Policy Brief';

  prev.innerHTML = `
    <div style="border-bottom:2px solid var(--c-accent);padding-bottom:.75rem;margin-bottom:1rem;">
      <div style="font-size:.75rem;color:var(--c-text-3);margin-bottom:.25rem;">${byLabel}: ${v['brief-org'] || '—'}</div>
      <strong style="font-size:1rem;line-height:1.3;display:block;">${titleText}</strong>
      <div style="font-size:.75rem;color:var(--c-text-3);margin-top:.25rem;">${dateLabel}: ${today}</div>
    </div>
    ${v['brief-problem'] ? `<h3>${probLabel}</h3><p>${v['brief-problem']}</p>` : ''}
    ${v['brief-evidence'] ? `<h3>${evLabel}</h3><p>${v['brief-evidence']}</p>` : ''}
    ${v.demands.length ? `<h3>${demLabel}</h3><ul style="padding-left:1.25rem;">${demandsHTML}</ul>` : ''}
    ${v['brief-about'] ? `<h3>${aboutLabel}</h3><p>${v['brief-about']}</p>` : ''}
    ${v['brief-signatories'] ? `<h3>${sigLabel}</h3><p>${v['brief-signatories']}</p>` : ''}
  `;
}

// ── PDF export via jsPDF ──────────────────────────────────────────────────
async function exportPDF() {
  // jsPDF loads async from CDN — check both possible global names
  const jspdfLib = window.jspdf || window.jsPDF;
  if (!jspdfLib) {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.onload = () => exportPDF();
    document.head.appendChild(s);
    return;
  }
  const { jsPDF } = jspdfLib;
  const v    = getValues();
  const lang = v.lang;
  const doc  = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const margin  = 20;
  const pageW   = 210;
  const usable  = pageW - margin * 2;
  let y         = margin;
  const font    = 'helvetica';

  // For sr-cyr, PDF text is transliterated to Serbian Latin
  // (Helvetica cannot render Cyrillic; preview still shows Cyrillic correctly)
  const pdfLang = lang;

  const titleText = {
    en:       'Policy Brief: AI Copyright Rights for Independent Creators in Serbia',
    'sr-lat': 'Policy Brief: AI autorska prava za nezavisne stvaraoce u Srbiji',
    'sr-cyr': 'Policy Brief: AI autorska prava za nezavisne stvaraoce u Srbiji',
  }[pdfLang] || 'Policy Brief';

  // Header bar
  doc.setFillColor(230, 57, 70);
  doc.rect(0, 0, 210, 14, 'F');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.setFont(font, 'normal');
  doc.text('AIRS · AI Rights Shield · airs-app.kreativalab.org', margin, 9);
  y = 24;

  // Title
  doc.setFontSize(16);
  doc.setTextColor(26, 26, 46);
  doc.setFont(font, 'bold');
  const titleLines = doc.splitTextToSize(toPdfText(titleText, pdfLang), usable);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 8 + 4;

  // Submitter / date
  const pdfLocales = { en: 'en-GB', 'sr-lat': 'sr-Latn-RS', 'sr-cyr': 'sr-Latn-RS' };
  const today = new Date().toLocaleDateString(pdfLocales[lang] || 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.setFontSize(9);
  doc.setFont(font, 'normal');
  doc.setTextColor(100, 100, 120);
  if (v['brief-org'])  { doc.text(toPdfText(`Submitted by: ${v['brief-org']}`, pdfLang), margin, y); y += 5; }
  if (v['brief-name']) { doc.text(toPdfText(`Contact: ${v['brief-name']}${v['brief-role'] ? ', ' + v['brief-role'] : ''}`, pdfLang), margin, y); y += 5; }
  doc.text(`Date: ${today}`, margin, y); y += 10;

  // Divider
  doc.setDrawColor(230, 57, 70);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageW - margin, y); y += 8;

  function addSection(heading, body) {
    if (!body || !body.trim()) return;
    doc.setFontSize(11);
    doc.setFont(font, 'bold');
    doc.setTextColor(26, 26, 46);
    doc.text(toPdfText(heading, pdfLang), margin, y); y += 6;
    doc.setFontSize(10);
    doc.setFont(font, 'normal');
    doc.setTextColor(60, 70, 90);
    const lines = doc.splitTextToSize(toPdfText(body.replace(/<[^>]+>/g, ''), pdfLang), usable);
    lines.forEach(line => {
      if (y > 270) { doc.addPage(); y = margin; }
      doc.text(line, margin, y); y += 5.5;
    });
    y += 4;
  }

  const probLabel  = { en: 'The Problem',   'sr-lat': 'Problem',         'sr-cyr': 'Problem' }[pdfLang]         || 'The Problem';
  const evLabel    = { en: 'Our Evidence',  'sr-lat': 'Naši dokazi',     'sr-cyr': 'Nasi dokazi' }[pdfLang]     || 'Our Evidence';
  const demLabel   = { en: 'Our Demands',   'sr-lat': 'Naši zahtevi',    'sr-cyr': 'Nasi zahtevi' }[pdfLang]    || 'Our Demands';
  const aboutLabel = { en: 'About Us',      'sr-lat': 'O nama',          'sr-cyr': 'O nama' }[pdfLang]          || 'About Us';
  const sigLabel   = { en: 'Signatories',   'sr-lat': 'Potpisnici',      'sr-cyr': 'Potpisnici' }[pdfLang]      || 'Signatories';

  addSection(probLabel, v['brief-problem']);
  addSection(evLabel,   v['brief-evidence']);

  if (v.demands.length) {
    doc.setFontSize(11);
    doc.setFont(font, 'bold');
    doc.setTextColor(26, 26, 46);
    doc.text(toPdfText(demLabel, pdfLang), margin, y); y += 6;
    v.demands.forEach(dk => {
const demandLang = pdfLang === 'sr-cyr' ? 'sr-lat' : pdfLang;
const text  = DEMAND_TEXTS[dk]?.[demandLang] || DEMAND_TEXTS[dk]?.['en'] || '';
      const lines = doc.splitTextToSize('• ' + text, usable - 4);
      doc.setFontSize(10);
      doc.setFont(font, 'normal');
      doc.setTextColor(60, 70, 90);
      lines.forEach(line => {
        if (y > 270) { doc.addPage(); y = margin; }
        doc.text(line, margin + 2, y); y += 5.5;
      });
      y += 2;
    });
    y += 4;
  }

  addSection(aboutLabel, v['brief-about']);
  addSection(sigLabel,   v['brief-signatories']);

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setFont(font, 'normal');
    doc.setTextColor(160, 160, 170);
    doc.text('Generated by AIRS · airs-app.kreativalab.org · Content: CC BY 4.0 KreativaLab', margin, 290);
    doc.text(`Page ${i} of ${pageCount}`, pageW - margin, 290, { align: 'right' });
  }

  const org  = v['brief-org'] || 'AIRS';
  const name = org.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  doc.save(`airs-policy-brief-${name}.pdf`);
}

// ── Copy plain text ───────────────────────────────────────────────────────
function copyPlainText() {
  const v    = getValues();
  const lang = v.lang;
  const titleText = {
    en: 'POLICY BRIEF: AI Copyright Rights for Independent Creators in Serbia',
    'sr-lat': 'POLICY BRIEF: AI autorska prava za nezavisne stvaraoce u Srbiji',
    'sr-cyr': 'POLICY BRIEF: AI ауторска права за независне ствараоце у Србији',
  }[lang];

  const demandsText = v.demands
    .map(dk => '- ' + (DEMAND_TEXTS[dk]?.[lang] || DEMAND_TEXTS[dk]?.['en'] || ''))
    .join('\n');

  const copyLocales = { en: 'en-GB', 'sr-lat': 'sr-Latn-RS', 'sr-cyr': 'sr-Cyrl-RS' };
  const copyDate = new Date().toLocaleDateString(copyLocales[lang] || 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

  const copyProbLabel = { en: 'THE PROBLEM',   'sr-lat': 'PROBLEM',        'sr-cyr': 'ПРОБЛЕМ' }[lang]        || 'THE PROBLEM';
  const copyEvLabel   = { en: 'OUR EVIDENCE',  'sr-lat': 'NAŠI DOKAZI',    'sr-cyr': 'НАШИ ДОКАЗИ' }[lang]    || 'OUR EVIDENCE';
  const copyDemLabel  = { en: 'OUR DEMANDS',   'sr-lat': 'NAŠI ZAHTEVI',   'sr-cyr': 'НАШИ ЗАХТЕВИ' }[lang]   || 'OUR DEMANDS';
  const copyAboutLabel= { en: 'ABOUT US',      'sr-lat': 'O NAMA',         'sr-cyr': 'О НАМА' }[lang]         || 'ABOUT US';
  const copySigLabel  = { en: 'SIGNATORIES',   'sr-lat': 'POTPISNICI',     'sr-cyr': 'ПОТПИСНИЦИ' }[lang]     || 'SIGNATORIES';

  const text = [
    titleText,
    `${v['brief-org'] || ''}${v['brief-name'] ? ' · ' + v['brief-name'] : ''}`,
    copyDate,
    '',
    v['brief-problem'] && `${copyProbLabel}\n${v['brief-problem']}`,
    v['brief-evidence'] && `${copyEvLabel}\n${v['brief-evidence']}`,
    v.demands.length && `${copyDemLabel}\n${demandsText}`,
    v['brief-about'] && `${copyAboutLabel}\n${v['brief-about']}`,
    v['brief-signatories'] && `${copySigLabel}\n${v['brief-signatories']}`,
    '',
    'Generated by AIRS · airs-app.kreativalab.org · CC BY 4.0 KreativaLab',
  ].filter(Boolean).join('\n\n');

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('btn-copy');
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = { en: '✓ Copied!', 'sr-lat': '✓ Kopirano!', 'sr-cyr': '✓ Копирано!' }[lang] || '✓ Copied!';
    setTimeout(() => btn.textContent = orig, 2000);
  });
}

// ── Shareable link ────────────────────────────────────────────────────────
function copyShareLink() {
  const v      = getValues();
  const params = new URLSearchParams();
  FIELDS.forEach(id => { if (v[id]) params.set(id.replace('brief-', ''), v[id]); });
  if (v.demands.length) params.set('d', v.demands.map(d => d.split('.')[1]).join(','));
  params.set('lang', v.lang);
  params.set('page', 'brief');
  const url = location.origin + '/?' + params.toString();
  navigator.clipboard.writeText(url).then(() => {
    const btn = document.getElementById('btn-sharelink');
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = { en: '✓ Link copied!', 'sr-lat': '✓ Link kopiran!', 'sr-cyr': '✓ Линк копиран!' }[v.lang] || '✓ Link copied!';
    setTimeout(() => btn.textContent = orig, 2000);
  });
}

// ── Restore form from URL params (for shared links) ───────────────────────
function restoreFromParams() {
  const params = new URLSearchParams(location.search);
  if (!params.has('page') && !params.has('org') && !params.has('d')) return;

  const fieldMap = { org: 'brief-org', name: 'brief-name', role: 'brief-role', city: 'brief-city',
                     problem: 'brief-problem', evidence: 'brief-evidence', about: 'brief-about', signatories: 'brief-signatories' };
  Object.entries(fieldMap).forEach(([param, id]) => {
    const val = params.get(param);
    if (val) {
      const el = document.getElementById(id);
      if (el) el.value = val;
    }
  });

  const d = params.get('d');
  if (d) {
    const keys = d.split(',');
    DEMANDS.forEach(({ id, key }) => {
      const short = key.split('.')[1];
      const el = document.getElementById(id);
      if (el) el.checked = keys.includes(short);
    });
  }

  updatePreview();
}

// ── Init ──────────────────────────────────────────────────────────────────
function initBrief() {
  if (!document.getElementById('brief-org')) return;

  FIELDS.forEach(id => {
    document.getElementById(id)?.addEventListener('input', updatePreview);
  });
  DEMANDS.forEach(d => {
    document.getElementById(d.id)?.addEventListener('change', updatePreview);
  });

  document.getElementById('btn-export-pdf')?.addEventListener('click', exportPDF);
  document.getElementById('btn-copy')?.addEventListener('click', copyPlainText);
  document.getElementById('btn-sharelink')?.addEventListener('click', copyShareLink);

  restoreFromParams();
  updatePreview();

  // Re-apply i18n labels now that the section is visible
  if (typeof window.applyLang === 'function') window.applyLang(window.getLang());

  // Re-render preview on language change
  const _prevOnLangChange = window.onLangChange;
  window.onLangChange = () => {
    if (typeof _prevOnLangChange === 'function') _prevOnLangChange();
    updatePreview();
  };
}

// Wait for app.js to finish loading lang.json before init
document.addEventListener('DOMContentLoaded', () => {
  const wait = setInterval(() => {
    if (typeof window.t === 'function' && window.t('nav.home') !== '[nav.home]') {
      clearInterval(wait);

      const params = new URLSearchParams(location.search);
      if (params.get('page') === 'brief') {
        const lang = params.get('lang') || (window.getLang ? window.getLang() : 'en');
        if (typeof window.navigate === 'function') {
          window.navigate('/brief');
          history.replaceState({}, '', '/' + lang + '/brief');
        }
        setTimeout(() => initBrief(), 50);
      } else {
        initBrief();
      }
    }
  }, 20);
});
