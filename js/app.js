/* ============================================================
   AIRS — AI Rights Shield
   app.js — Router, language controller, navigation
   ============================================================ */

'use strict';

// ── State ──────────────────────────────────────────────────────────────────
const LANGS = ['en', 'sr-lat', 'sr-cyr'];
const DEFAULT_LANG = 'sr-lat';

let strings = {};
let currentLang = DEFAULT_LANG;

// ── Boot ───────────────────────────────────────────────────────────────────
async function boot() {
  // GitHub Pages SPA routing: pick up path saved by 404.html
  const ghRedirect = sessionStorage.getItem('airs-redirect');
  if (ghRedirect) {
    sessionStorage.removeItem('airs-redirect');
    history.replaceState(null, '', ghRedirect);
  }

  await loadStrings();
  currentLang = detectLang();
  applyLang(currentLang);
  setupLangToggle();
  setupMobileMenu();
  setupRouter();
  route(location.pathname);
}

// ── Language file ──────────────────────────────────────────────────────────
async function loadStrings() {
  const base = getBase();
  const res  = await fetch(base + 'js/lang.json');
  strings    = await res.json();
}

function t(key) {
  const entry = strings[key];
  if (!entry) return `[${key}]`;
  // lang.json uses underscores (sr_lat, sr_cyr); currentLang uses hyphens (sr-lat, sr-cyr)
  const jsonKey = currentLang.replace(/-/g, '_');
  return entry[jsonKey] || entry[currentLang] || entry['en'] || `[${key}]`;
}

function detectLang() {
  // 1. URL prefix
  const path  = location.pathname;
  const match = path.match(/^\/(en|sr-lat|sr-cyr)(\/|$)/);
  if (match) return match[1];
  // 2. localStorage
  const stored = localStorage.getItem('airs-lang');
  if (stored && LANGS.includes(stored)) return stored;
  // 3. Browser language
  const bl = (navigator.language || '').toLowerCase();
  if (bl.startsWith('sr')) return 'sr-lat';
  if (bl.startsWith('en')) return 'en';
  return DEFAULT_LANG;
}

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('airs-lang', lang);
  document.documentElement.lang = lang === 'sr-cyr' ? 'sr' : lang;
  // Update all [data-i18n] elements
  // Use innerHTML so that translation values containing markup (e.g. <strong>)
  // render correctly — values come from our controlled lang.json, not user input.
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.innerHTML = t(key);
  });
  // Update all [data-i18n-placeholder] elements
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  // Sync the dropdown selected value
  const sel = document.getElementById('lang-select');
  if (sel) sel.value = lang;
  // Re-render any dynamic module that's visible
  if (typeof window.onLangChange === 'function') window.onLangChange();
  // Re-bind router after innerHTML replacement destroys event listeners on nav links
  setupRouter();
}
function setupLangToggle() {
  const sel = document.getElementById('lang-select');
  if (!sel) return;
  sel.addEventListener('change', () => {
    const lang    = sel.value;
    const newPath = swapLangInPath(location.pathname, lang);
    history.pushState({}, '', newPath);
    applyLang(lang);
    updateNavActive();
  });
}

function swapLangInPath(path, newLang) {
  // Remove existing lang prefix if present
  const stripped = path.replace(/^\/(en|sr-lat|sr-cyr)(\/|$)/, '/');
  return '/' + newLang + (stripped === '/' ? '/' : stripped);
}

// ── Mobile menu ────────────────────────────────────────────────────────────
function setupMobileMenu() {
  const btn  = document.getElementById('nav-menu-btn');
  const menu = document.getElementById('nav-links');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  // Close on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
}

// ── Router ─────────────────────────────────────────────────────────────────
const ROUTES = {
  '/':           'home',
  '/guide':      'guide',
  '/assessment': 'assessment',
  '/brief':      'brief',
  '/about':      'about',
  '/legal':      'legal',
  '/tools':      'tools',
};

function getBase() {
  // Works both locally and on subdirectory deploys
  const base = document.querySelector('base');
  return base ? base.href : '/';
}

function setupRouter() {
  // Handle nav link clicks
document.querySelectorAll('a[data-route]').forEach(a => {
a.addEventListener('click', e => {
  e.preventDefault();
  const hash   = a.dataset.hash || a.hash || '';
  const target = '/' + currentLang + a.dataset.route;
  history.pushState({}, '', target + hash);
  route(target);
  updateNavActive();
  if (hash) {
    const el = document.querySelector(hash);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  } else {
    window.scrollTo(0, 0);
  }
});
});
  // Browser back/forward
  window.addEventListener('popstate', () => {
    route(location.pathname);
    updateNavActive();
  });
}

function route(path) {
  // Strip lang prefix to get the route key
  const stripped = path.replace(/^\/(en|sr-lat|sr-cyr)(\/|$)/, '/').replace(/\/$/, '') || '/';
  // Match /guide/1 → /guide
  const routeKey = '/' + stripped.split('/').filter(Boolean)[0] || '/';
  const page     = ROUTES[routeKey] || ROUTES['/'];

  document.querySelectorAll('.page-section').forEach(s => {
    s.hidden = s.dataset.page !== page;
  });

  // Sub-route for guide chapters
  if (page === 'guide') {
    const chNum = parseInt(stripped.split('/')[2]) || 1;
    if (typeof showChapter === 'function') showChapter(chNum);
  }
}

function updateNavActive() {
  const path     = location.pathname;
  const stripped = path.replace(/^\/(en|sr-lat|sr-cyr)(\/|$)/, '/');
  document.querySelectorAll('.nav-links a[data-route]').forEach(a => {
    const match = stripped.startsWith(a.dataset.route) && a.dataset.route !== '/'
      || (a.dataset.route === '/' && (stripped === '/' || stripped === ''));
    a.classList.toggle('active', match);
  });
}

// ── Navigate helper (called by modules) ──────────────────────────────────
window.navigate = function(route) {
  const target = '/' + currentLang + route;
  history.pushState({}, '', target);
  window.route(target);
  updateNavActive();
  window.scrollTo(0, 0);
};
window.route   = route;
window.t       = t;
window.getLang = () => currentLang;
window.applyLang  = applyLang;

// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', boot);
