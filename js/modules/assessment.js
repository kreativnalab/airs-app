/* ============================================================
   AIRS — Self-Assessment Toolkit module
   Four-step branching assessment with personalised results.
   All state in memory — nothing sent to server.
   ============================================================ */

'use strict';

// ── State ──────────────────────────────────────────────────────────────────
const state = {
  creatorType:  null,   // visual | music | writing | design | other
  sharesOnline: null,   // online | both | offline
  scenario:     null,   // a | b | c | d
  relevance:    null,   // happened | suspect | worried | notrelevant
  actionsTaken: null,   // yes | no | notsure
};

const STEPS = ['step-1', 'step-2', 'step-3', 'step-4'];
let currentStep = 0;

// ── Scenario routing ───────────────────────────────────────────────────────
// Map creator type → default scenario suggestion (user can override)
const TYPE_SCENARIO = {
  visual:  'a',
  music:   'b',
  writing: 'c',
  design:  'd',
  other:   null,  // show all four
};

// ── Risk calculation ───────────────────────────────────────────────────────
function calcRisk() {
  if (state.relevance === 'happened')    return 'high';
  if (state.relevance === 'suspect')     return 'high';
  if (state.relevance === 'worried')     return state.actionsTaken === 'yes' ? 'medium' : 'medium';
  if (state.relevance === 'notrelevant') return 'low';
  return 'medium';
}

// ── Next steps by scenario × relevance ───────────────────────────────────
function getNextSteps() {
  const lang = window.getLang();
  const steps = {
    en: {
      a: {
        happened: [
          'Search for your work immediately on Have I Been Trained? (haveibeentrained.com) — take a screenshot of the results.',
          'Submit an opt-out request via the Spawning.ai registry (spawning.ai) to block future use.',
          'Document all evidence now: timestamped screenshots, the AI tool name, date and URL of the output.',
          'Read Chapter 5 of the Legal Guide for the full evidence documentation protocol.',
          'Contact NKSS for referral to IP legal support (nkss.rs).',
          'Consider building a Policy Brief to raise this with the Serbian Intellectual Property Office.',
        ],
        suspect: [
          'Run a reverse image search on Google Images, TinEye, and Yandex to check for unauthorised use.',
          'Search Have I Been Trained? (haveibeentrained.com) using your name and portfolio URL.',
          'Read Chapter 5 of the Legal Guide for detection methods.',
          'Register your opt-out preference on Spawning.ai as a precaution.',
        ],
        worried: [
          'Add a copyright notice and AI opt-out statement to your website and portfolio now (template in the Legal Guide, Chapter 6).',
          'Register your work on Spawning.ai opt-out registry.',
          'Read Chapter 1 of the Legal Guide to understand exactly what your copyright covers.',
        ],
        notrelevant: [
          'Read Chapter 1 of the Legal Guide to understand your baseline rights.',
          'Return to the Self-Assessment if your situation changes.',
        ],
      },
      b: {
        happened: [
          'Document the dataset listing: screenshot the URL, dataset name, and your work\'s entry before it changes.',
          'Send a formal opt-out / takedown request to the dataset maintainer in writing; keep a copy.',
          'Contact SOKOJ (sokoj.rs) to report potential violation of your neighbouring rights.',
          'Read Chapter 3 of the Legal Guide on Serbian copyright law procedures.',
          'Contact NKSS for referral to IP legal support.',
        ],
        suspect: [
          'Search publicly listed AI music training datasets for your name and release titles.',
          'Review the terms of service of every streaming platform you use — look for AI training clauses.',
          'Read Chapter 2 of the Legal Guide on how AI music training works.',
        ],
        worried: [
          'Review your streaming platform terms of service for AI training clauses.',
          'Contact SOKOJ (sokoj.rs) to understand your neighbouring rights protection.',
          'Read Chapter 4 of the Legal Guide on your rights.',
        ],
        notrelevant: [
          'Read Chapter 2 of the Legal Guide to understand how AI music systems work.',
        ],
      },
      c: {
        happened: [
          'Document examples of the AI-generated text alongside your own published work — screenshot with dates.',
          'Read Chapter 4 of the Legal Guide on the limits of style protection and what "substantial similarity" means.',
          'Consider whether the Policy Brief module could support a submission to your professional association or a literary institution.',
          'Contact NKSS for referral to IP legal support.',
        ],
        suspect: [
          'Collect and date-stamp examples of AI output that resembles your style.',
          'Read Chapter 4 of the Legal Guide: style protection is limited, but substantial similarity is actionable.',
          'Discuss with peers whether they have noticed the same pattern — collective documentation is stronger.',
        ],
        worried: [
          'Add a copyright notice to all your published work, including your website and social profiles.',
          'Read Chapter 1 and Chapter 4 of the Legal Guide to understand what is and is not protected.',
        ],
        notrelevant: [
          'Read Chapter 4 of the Legal Guide on writers\' rights in the AI context.',
        ],
      },
      d: {
        happened: [
          'Screenshot the exact terms of service clause that covers AI training — with the date you found it.',
          'Find and use the platform\'s opt-out mechanism immediately. Document that you used it (screenshot + date).',
          'Read Chapter 3 of the Legal Guide on whether retroactive consent clauses are enforceable under Serbian law.',
          'Consider building a Policy Brief to raise this with the Serbian Intellectual Property Office or a media outlet.',
          'Contact NKSS for referral to IP legal support.',
        ],
        suspect: [
          'Read the Terms of Service of every platform you use — search for the words "train", "AI", "machine learning".',
          'Read Chapter 2 of the Legal Guide on platform terms and what AI training clauses typically say.',
          'Check whether each platform has an opt-out mechanism and use it.',
        ],
        worried: [
          'Audit the Terms of Service of your main platforms now.',
          'Read Chapter 2 of the Legal Guide on platform terms.',
          'Use available opt-out mechanisms on all platforms that offer them.',
        ],
        notrelevant: [
          'Read Chapter 2 of the Legal Guide to understand how platform terms relate to AI training.',
        ],
      },
    },
  };

  steps['sr-lat'] = {
    a: {
      happened: [
        'Odmah potražite vaš rad na Have I Been Trained? (haveibeentrained.com) — snimite ekran rezultata.',
        'Podnesite zahtev za odjavu putem Spawning.ai registra (spawning.ai) da biste blokirali buduću upotrebu.',
        'Dokumentujte sve dokaze odmah: snimci ekrana sa vremenskom oznakom, naziv AI alata, datum i URL izlaza.',
        'Pročitajte Poglavlje 5 Pravnog vodiča za kompletan protokol dokumentovanja dokaza.',
        'Kontaktirajte NKSS za uputnicu ka IP pravnoj podršci (nkss.rs).',
        'Razmotrite izradu Kratkog izveštaja o politici i podnošenje zahteva Zavodu za intelektualnu svojinu Srbije.',
      ],
      suspect: [
        'Pokrenite pretragu obrnutom slikom na Google Images, TinEye i Yandex da biste proverili neovlašćenu upotrebu.',
        'Pretražite Have I Been Trained? (haveibeentrained.com) koristeći vaše ime i URL portfolija.',
        'Pročitajte Poglavlje 5 Pravnog vodiča za metode detekcije.',
        'Registrujte svoju preferencu odjave na Spawning.ai kao meru predostrožnosti.',
      ],
      worried: [
        'Dodajte obaveštenje o autorskim pravima i izjavu o odjavi od AI treniranja na vaš sajt i portfolio odmah (predložak u Pravnom vodiču, Poglavlje 6).',
        'Registrujte vaše radove na Spawning.ai registru za odjavu.',
        'Pročitajte Poglavlje 1 Pravnog vodiča da biste razumeli šta tačno pokriva vaše autorsko pravo.',
      ],
      notrelevant: [
        'Pročitajte Poglavlje 1 Pravnog vodiča da biste razumeli svoja osnovna prava.',
        'Vratite se na Samoprocenu ako se vaša situacija promeni.',
      ],
    },
    b: {
      happened: [
        'Dokumentujte unos skupa podataka: snimite ekran URL-a, naziva skupa podataka i unosa vašeg rada pre nego što se promeni.',
        'Pošaljite formalni zahtev za odjavu/uklanjanje pismenim putem maintejneru skupa podataka; sačuvajte kopiju.',
        'Kontaktirajte SOKOJ (sokoj.rs) da prijavite potencijalno kršenje vaših srodnih prava.',
        'Pročitajte Poglavlje 3 Pravnog vodiča o procedurama srpskog zakona o autorskim pravima.',
        'Kontaktirajte NKSS za uputnicu ka IP pravnoj podršci.',
      ],
      suspect: [
        'Pretražite javno dostupne skupove podataka za AI muzičke alate tražeći vaše ime i naslove izdanja.',
        'Pregledajte uslove korišćenja svake streaming platforme koju koristite — tražite klauzule o AI treniranju.',
        'Pročitajte Poglavlje 2 Pravnog vodiča o tome kako funkcioniše AI muzičko treniranje.',
      ],
      worried: [
        'Pregledajte uslove korišćenja vaših streaming platformi u pogledu klauzula o AI treniranju.',
        'Kontaktirajte SOKOJ (sokoj.rs) da razumete zaštitu vaših srodnih prava.',
        'Pročitajte Poglavlje 4 Pravnog vodiča o vašim pravima.',
      ],
      notrelevant: [
        'Pročitajte Poglavlje 2 Pravnog vodiča da biste razumeli kako funkcionišu AI muzički sistemi.',
      ],
    },
    c: {
      happened: [
        'Dokumentujte primere AI-generisanog teksta uz vaše objavljene radove — snimak ekrana sa datumima.',
        'Pročitajte Poglavlje 4 Pravnog vodiča o granicama zaštite stila i šta znači "suštinska sličnost".',
        'Razmotrite da li modul Kratkog izveštaja o politici može podržati podnošenje vašem strukovnom udruženju ili književnoj instituciji.',
        'Kontaktirajte NKSS za uputnicu ka IP pravnoj podršci.',
      ],
      suspect: [
        'Prikupite i datumski označite primere AI izlaza koji liči na vaš stil.',
        'Pročitajte Poglavlje 4 Pravnog vodiča: zaštita stila je ograničena, ali suštinska sličnost je osnov za tužbu.',
        'Razgovarajte sa kolegama o tome da li su primetili isti obrazac — kolektivna dokumentacija je jača.',
      ],
      worried: [
        'Dodajte obaveštenje o autorskim pravima svim objavljenim radovima, uključujući vaš sajt i profile na društvenim mrežama.',
        'Pročitajte Poglavlje 1 i Poglavlje 4 Pravnog vodiča da biste razumeli šta jeste i šta nije zaštićeno.',
      ],
      notrelevant: [
        'Pročitajte Poglavlje 4 Pravnog vodiča o pravima pisaca u kontekstu AI.',
      ],
    },
    d: {
      happened: [
        'Snimite ekran tačne klauzule uslova korišćenja koja pokriva AI treniranje — sa datumom kada ste je pronašli.',
        'Odmah pronađite i koristite mehanizam za odjavu platforme. Dokumentujte da ste ga koristili (snimak ekrana + datum).',
        'Pročitajte Poglavlje 3 Pravnog vodiča o tome da li su retroaktivne klauzule o pristanku izvršive prema srpskom pravu.',
        'Razmotrite izradu Kratkog izveštaja o politici i podnošenje Zavodu za intelektualnu svojinu Srbije ili medijima.',
        'Kontaktirajte NKSS za uputnicu ka IP pravnoj podršci.',
      ],
      suspect: [
        'Pročitajte Uslove korišćenja svake platforme koju koristite — tražite reči "trening", "AI", "mašinsko učenje".',
        'Pročitajte Poglavlje 2 Pravnog vodiča o uslovima platformi i šta klauzule o AI treniranju tipično kažu.',
        'Proverite da li svaka platforma ima mehanizam za odjavu i koristite ga.',
      ],
      worried: [
        'Odmah proverite Uslove korišćenja vaših glavnih platformi.',
        'Pročitajte Poglavlje 2 Pravnog vodiča o uslovima platformi.',
        'Koristite dostupne mehanizme za odjavu na svim platformama koje ih nude.',
      ],
      notrelevant: [
        'Pročitajte Poglavlje 2 Pravnog vodiča da biste razumeli kako su uslovi platformi povezani sa AI treniranjem.',
      ],
    },
  };

  steps['sr-cyr'] = {
    a: {
      happened: [
        'Одмах потражите ваш рад на Have I Been Trained? (haveibeentrained.com) — снимите екран резултата.',
        'Поднесите захтев за одјаву путем Spawning.ai регистра (spawning.ai) да бисте блокирали будућу употребу.',
        'Документујте све доказе одмах: снимци екрана са временском ознаком, назив AI алата, датум и URL излаза.',
        'Прочитајте Поглавље 5 Правног водича за комплетан протокол документовања доказа.',
        'Контактирајте НКSS за упутницу ка IP правној подршци (nkss.rs).',
        'Размотрите израду Кратког извештаја о политици и подношење захтева Заводу за интелектуалну својину Србије.',
      ],
      suspect: [
        'Покрените претрагу обрнутом сликом на Google Images, TinEye и Yandex да бисте проверили неовлашћену употребу.',
        'Претражите Have I Been Trained? (haveibeentrained.com) користећи ваше име и URL портфолија.',
        'Прочитајте Поглавље 5 Правног водича за методе детекције.',
        'Региструјте своју преференцу одјаве на Spawning.ai као меру предострожности.',
      ],
      worried: [
        'Додајте обавештење о ауторским правима и изјаву о одјави од AI тренирања на ваш сајт и портфолио одмах (предложак у Правном водичу, Поглавље 6).',
        'Региструјте ваше радове на Spawning.ai регистру за одјаву.',
        'Прочитајте Поглавље 1 Правног водича да бисте разумели шта тачно покрива ваше ауторско право.',
      ],
      notrelevant: [
        'Прочитајте Поглавље 1 Правног водича да бисте разумели своја основна права.',
        'Вратите се на Самопроцену ако се ваша ситуација промени.',
      ],
    },
    b: {
      happened: [
        'Документујте унос скупа података: снимите екран URL-а, назива скупа података и уноса вашег рада пре него што се промени.',
        'Пошаљите формални захтев за одјаву/уклањање писменим путем одржавалу скупа података; сачувајте копију.',
        'Контактирајте СОКOJ (sokoj.rs) да пријавите потенцијално кршење ваших сродних права.',
        'Прочитајте Поглавље 3 Правног водича о процедурама српског закона о ауторским правима.',
        'Контактирајте НКSS за упутницу ка IP правној подршци.',
      ],
      suspect: [
        'Претражите јавно доступне скупове података за AI музичке алате тражећи ваше име и наслове издања.',
        'Прегледајте услове коришћења сваке стриминг платформе коју користите — тражите клаузуле о AI тренирању.',
        'Прочитајте Поглавље 2 Правног водича о томе како функционише AI музичко тренирање.',
      ],
      worried: [
        'Прегледајте услове коришћења ваших стриминг платформи у погледу клаузула о AI тренирању.',
        'Контактирајте СОКOJ (sokoj.rs) да разумете заштиту ваших сродних права.',
        'Прочитајте Поглавље 4 Правног водича о вашим правима.',
      ],
      notrelevant: [
        'Прочитајте Поглавље 2 Правног водича да бисте разумели како функционишу AI музички системи.',
      ],
    },
    c: {
      happened: [
        'Документујте примере AI-генерисаног текста уз ваше објављене радове — снимак екрана са датумима.',
        'Прочитајте Поглавље 4 Правног водича о границама заштите стила и шта значи „суштинска сличност".',
        'Размотрите да ли модул Кратког извештаја о политици може подржати подношење вашем струковном удружењу или књижевној институцији.',
        'Контактирајте НКSS за упутницу ка IP правној подршци.',
      ],
      suspect: [
        'Прикупите и датумски означите примере AI излаза који личи на ваш стил.',
        'Прочитајте Поглавље 4 Правног водича: заштита стила је ограничена, али суштинска сличност је основ за тужбу.',
        'Разговарајте са колегама о томе да ли су приметили исти образац — колективна документација је јача.',
      ],
      worried: [
        'Додајте обавештење о ауторским правима свим објављеним радовима, укључујући ваш сајт и профиле на друштвеним мрежама.',
        'Прочитајте Поглавље 1 и Поглавље 4 Правног водича да бисте разумели шта јесте и шта није заштићено.',
      ],
      notrelevant: [
        'Прочитајте Поглавље 4 Правног водича о правима писаца у контексту AI.',
      ],
    },
    d: {
      happened: [
        'Снимите екран тачне клаузуле услова коришћења која покрива AI тренирање — са датумом када сте је пронашли.',
        'Одмах пронађите и користите механизам за одјаву платформе. Документујте да сте га користили (снимак екрана + датум).',
        'Прочитајте Поглавље 3 Правног водича о томе да ли су ретроактивне клаузуле о пристанку извршиве према српском праву.',
        'Размотрите израду Кратког извештаја о политици и подношење Заводу за интелектуалну својину Србије или медијима.',
        'Контактирајте НКSS за упутницу ка IP правној подршци.',
      ],
      suspect: [
        'Прочитајте Услове коришћења сваке платформе коју користите — тражите речи „тренинг", „AI", „машинско учење".',
        'Прочитајте Поглавље 2 Правног водича о условима платформи и шта клаузуле о AI тренирању типично кажу.',
        'Проверите да ли свака платформа има механизам за одјаву и користите га.',
      ],
      worried: [
        'Одмах проверите Услове коришћења ваших главних платформи.',
        'Прочитајте Поглавље 2 Правног водича о условима платформи.',
        'Користите доступне механизме за одјаву на свим платформама које их нуде.',
      ],
      notrelevant: [
        'Прочитајте Поглавље 2 Правног водича да бисте разумели како су услови платформи повезани са AI тренирањем.',
      ],
    },
  };

  const sc  = state.scenario || 'a';
  const rel = state.relevance || 'worried';
  const l   = steps[lang] ? lang : 'en';
  return (steps[l][sc] && steps[l][sc][rel]) || steps['en'][sc][rel] || [];
}

// ── Render ─────────────────────────────────────────────────────────────────
function render() {
  STEPS.forEach((id, idx) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('visible', idx === currentStep);
  });
  updateProgress();

  if (currentStep === 1) renderScenarios();
  if (currentStep === 3) renderResults();
}

function updateProgress() {
  const fill  = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  if (fill)  fill.style.width = ((currentStep + 1) / STEPS.length * 100) + '%';
  if (label) label.textContent = `${currentStep + 1} / ${STEPS.length}`;
}

function renderScenarios() {
  const container = document.getElementById('scenario-cards');
  if (!container) return;
  const scenarios = ['a', 'b', 'c', 'd'];

  container.innerHTML = scenarios.map(sc => `
    <div class="scenario-card ${state.scenario === sc ? 'selected-scenario' : ''}"
         style="${state.scenario === sc ? 'border:2px solid var(--c-accent);' : ''}">
      <div class="scenario-tag">${window.t('scenario.' + sc + '.tag')}</div>
      <div class="scenario-name">${window.t('scenario.' + sc + '.name')}</div>
      <p class="scenario-story">${window.t('scenario.' + sc + '.story')}</p>
      <p class="scenario-covers"><strong>${coversLabel()}</strong> ${window.t('scenario.' + sc + '.covers')}</p>
      <div style="margin-top:1rem;">
        <button class="btn ${state.scenario === sc ? 'btn-primary' : 'btn-ghost'} btn-sm"
                onclick="selectScenario('${sc}')">
          ${state.scenario === sc ? selectedLabel() : selectLabel()}
        </button>
      </div>
    </div>`).join('');
}

function coversLabel() {
  return { en: 'Covers:', 'sr-lat': 'Obuhvata:', 'sr-cyr': 'Обухвата:' }[window.getLang()] || 'Covers:';
}
function selectLabel() {
  return { en: 'This is my situation', 'sr-lat': 'Ovo je moja situacija', 'sr-cyr': 'Ово је моја ситуација' }[window.getLang()] || 'This is my situation';
}
function selectedLabel() {
  return { en: '✓ Selected', 'sr-lat': '✓ Izabrano', 'sr-cyr': '✓ Изабрано' }[window.getLang()] || '✓ Selected';
}

window.selectScenario = function(sc) {
  state.scenario = sc;
  renderScenarios();
};

function renderResults() {
  const risk  = calcRisk();
  const steps = getNextSteps();
  const lang  = window.getLang();

  const riskLabels = {
    high:   { en: 'Action recommended', 'sr-lat': 'Preporučuje se akcija', 'sr-cyr': 'Препоручује се акција' },
    medium: { en: 'Caution advised',    'sr-lat': 'Savetuje se oprez',     'sr-cyr': 'Саветује се опрез' },
    low:    { en: 'Stay aware',         'sr-lat': 'Ostanite informisani',  'sr-cyr': 'Останите информисани' },
  };
  const riskLabel = (riskLabels[risk][lang] || riskLabels[risk]['en']);

  const summaryLabel = { en: 'Your situation summary', 'sr-lat': 'Sažetak vaše situacije', 'sr-cyr': 'Сажетак ваше ситуације' }[lang] || 'Your situation summary';
  const stepsLabel   = { en: 'Recommended next steps', 'sr-lat': 'Preporučeni sledeći koraci', 'sr-cyr': 'Препоручени следећи кораци' }[lang] || 'Recommended next steps';

  const scenarioName = state.scenario ? window.t('scenario.' + state.scenario + '.name') : '—';

  document.getElementById('results-content').innerHTML = `
    <div class="result-section">
      <div class="result-section-title">${summaryLabel}</div>
      <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:1rem;">
        <span class="risk-badge risk-${risk}">${riskLabel}</span>
        <span style="color:var(--c-text-3);font-size:.9rem;">
          ${scenarioName}
        </span>
      </div>
      <p style="color:var(--c-text-2);font-size:1rem;line-height:1.7;">
        ${summaryText(lang, risk)}
      </p>
    </div>
    <div class="result-section">
      <div class="result-section-title">${stepsLabel}</div>
      <ul class="action-list">
        ${steps.map(s => `
          <li>
            <div class="action-icon" aria-hidden="true"></div>
            <span>${s}</span>
          </li>`).join('')}
      </ul>
    </div>`;
}

function summaryText(lang, risk) {
  const texts = {
    high: {
      en: 'Based on your answers, your situation suggests a concrete AI copyright risk that warrants action now. The steps below are prioritised for your specific scenario. This is not legal advice — if the situation involves significant financial or reputational harm, please consult a qualified IP lawyer.',
      'sr-lat': 'Na osnovu vaših odgovora, vaša situacija ukazuje na konkretan AI autorski rizik koji zahteva hitnu akciju. Koraci ispod su prioritizovani za vaš specifični scenario. Ovo nije pravni savet — ako situacija uključuje značajnu finansijsku ili reputacionu štetu, konsultujte kvalifikovanog IP advokata.',
      'sr-cyr': 'На основу ваших одговора, ваша ситуација указује на конкретан AI ауторски ризик који захтева хитну акцију. Кораци испод су приоритизовани за ваш специфични сценарио. Ово није правни савет — ако ситуација укључује значајну финансијску или репутациону штету, консултујте квалификованог IP адвоката.',
    },
    medium: {
      en: 'Your situation suggests a potential risk worth monitoring and acting on cautiously. The steps below will help you protect yourself and build a documented record if the situation escalates.',
      'sr-lat': 'Vaša situacija ukazuje na potencijalni rizik koji vredi pratiti i oprezno reagovati. Koraci ispod će vam pomoći da se zaštitite i izgradite dokumentovani zapis ako situacija eskalira.',
      'sr-cyr': 'Ваша ситуација указује на потенцијални ризик који вреди пратити и опрезно реаговати. Кораци испод ће вам помоћи да се заштитите и изградите документовани запис ако ситуација ескалира.',
    },
    low: {
      en: 'Your situation does not indicate an immediate risk, but staying informed is important as this area is evolving rapidly. The steps below will help you stay prepared.',
      'sr-lat': 'Vaša situacija ne ukazuje na neposredan rizik, ali je važno ostati informisan jer se ova oblast brzo razvija. Koraci ispod će vam pomoći da ostanete pripremljeni.',
      'sr-cyr': 'Ваша ситуација не указује на непосредан ризик, али је важно остати информисан јер се ова област брзо развија. Кораци испод ће вам помоћи да останете припремљени.',
    },
  };
  return (texts[risk][lang] || texts[risk]['en']);
}

// ── Step 1 — creator type questions ──────────────────────────────────────
function initStep1() {
  // Type selector
  document.querySelectorAll('[data-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.creatorType = btn.dataset.type;
      document.querySelectorAll('[data-type]').forEach(b => {
        b.classList.toggle('selected', b === btn);
      });
      // Suggest matching scenario
      const suggested = TYPE_SCENARIO[state.creatorType];
      if (suggested) state.scenario = suggested;
    });
  });
  // Online/offline selector
  document.querySelectorAll('[data-share]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.sharesOnline = btn.dataset.share;
      document.querySelectorAll('[data-share]').forEach(b => {
        b.classList.toggle('selected', b === btn);
      });
    });
  });
}

// ── Step 3 — situation questions ─────────────────────────────────────────
function initStep3() {
  document.querySelectorAll('[data-relevance]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.relevance = btn.dataset.relevance;
      document.querySelectorAll('[data-relevance]').forEach(b => {
        b.classList.toggle('selected', b === btn);
      });
    });
  });
  document.querySelectorAll('[data-actions]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.actionsTaken = btn.dataset.actions;
      document.querySelectorAll('[data-actions]').forEach(b => {
        b.classList.toggle('selected', b === btn);
      });
    });
  });
}

// ── Navigation ────────────────────────────────────────────────────────────
function canAdvance() {
  if (currentStep === 0) return state.creatorType !== null;
  if (currentStep === 1) return state.scenario !== null;
  if (currentStep === 2) return state.relevance !== null && state.actionsTaken !== null;
  return true;
}

function setupNav() {
  document.getElementById('btn-next-1')?.addEventListener('click', () => advance());
  document.getElementById('btn-next-2')?.addEventListener('click', () => advance());
  document.getElementById('btn-next-3')?.addEventListener('click', () => advance());
  document.getElementById('btn-back-2')?.addEventListener('click', () => back());
  document.getElementById('btn-back-3')?.addEventListener('click', () => back());
  document.getElementById('btn-restart')?.addEventListener('click', () => restart());
  document.getElementById('btn-print')?.addEventListener('click', () => window.print());
  document.getElementById('btn-goto-brief')?.addEventListener('click', () => window.navigate('/brief'));
}

function advance() {
  if (!canAdvance()) {
    showValidationMsg();
    return;
  }
  if (currentStep < STEPS.length - 1) {
    currentStep++;
    render();
    window.scrollTo(0, 0);
  }
}

function back() {
  if (currentStep > 0) {
    currentStep--;
    render();
    window.scrollTo(0, 0);
  }
}

function restart() {
  Object.keys(state).forEach(k => state[k] = null);
  currentStep = 0;
  render();
  window.scrollTo(0, 0);
}

function showValidationMsg() {
  const lang = window.getLang();
  const msg  = {
    en: 'Please make a selection before continuing.',
    'sr-lat': 'Molimo napravite izbor pre nastavka.',
    'sr-cyr': 'Молимо направите избор пре наставка.',
  }[lang] || 'Please make a selection before continuing.';
  // Show inline
  const existing = document.getElementById('validation-msg');
  if (existing) { existing.textContent = msg; return; }
  const el = document.createElement('p');
  el.id = 'validation-msg';
  el.style.cssText = 'color:var(--c-accent);font-size:.9rem;margin-top:.5rem;';
  el.textContent = msg;
  const activeStep = document.getElementById(STEPS[currentStep]);
  activeStep?.querySelector('.step-nav')?.prepend(el);
}

// ── Init ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('step-1')) return;
  initStep1();
  initStep3();
  setupNav();
  render();
});
