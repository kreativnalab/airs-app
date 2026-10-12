/* ============================================================
   AIRS — Tools Directory module
   Renders a filterable table of creator protection tools.
   ============================================================ */

'use strict';

const TOOLS = [
  /* ── Detection: reverse image / web search ──────────────────────────── */
  {
    id: 'tineye',
    category: 'detect',
    name: 'TinEye',
    url: 'https://tineye.com',
    forWhom: ['visual'],
    price: 'free',
    en: {
      what: 'Reverse image search engine that finds where your image appears online. The oldest and most precise tool of its kind — searches by image fingerprint, not keywords.',
      note: 'Best first step for any visual artist checking for unauthorized use.',
    },
    sr_lat: {
      what: 'Pretraživač slika koji pronalazi gde se vaša slika pojavljuje na internetu. Najstariji i najprecizniji alat ove vrste — pretražuje po otisaku slike, ne po ključnim rečima.',
      note: 'Najbolji prvi korak za svakog vizuelnog umetnika koji proverava neovlašćeno korišćenje.',
    },
    sr_cyr: {
      what: 'Претраживач слика који проналази где се ваша слика појављује на интернету. Најстарији и најпрецизнији алат ове врсте — претражује по отиску слике, не по кључним речима.',
      note: 'Најбољи први корак за сваког визуелног уметника који проверава неовлашћено коришћење.',
    },
  },
  {
    id: 'google-images',
    category: 'detect',
    name: 'Google Reverse Image Search',
    url: 'https://images.google.com',
    forWhom: ['visual'],
    price: 'free',
    en: {
      what: 'Upload or paste an image URL to find visually similar images and pages where your image appears. Widest web coverage of any reverse image tool.',
      note: 'Use alongside TinEye — each finds results the other misses.',
    },
    sr_lat: {
      what: 'Otpremite ili nalepite URL slike da biste pronašli vizuelno slične slike i stranice gde se vaša slika pojavljuje. Najšira pokrivenost weba od svih alata za pretragu slika.',
      note: 'Koristite zajedno sa TinEye — svaki pronalazi rezultate koje drugi propušta.',
    },
    sr_cyr: {
      what: 'Отпремите или налепите URL слике да бисте пронашли визуелно сличне слике и странице где се ваша слика појављује. Најшира покривеност веба од свих алата за претрагу слика.',
      note: 'Користите заједно са TinEye — сваки проналази резултате које други пропушта.',
    },
  },
  {
    id: 'pixsy',
    category: 'detect',
    name: 'Pixsy',
    url: 'https://pixsy.com',
    forWhom: ['visual'],
    price: 'freemium',
    en: {
      what: 'Automatically monitors the web for copies of your images. When it finds a potential infringement, it enables takedown requests or a compensation claim process.',
      note: 'Strong practical example of monitor → detect → enforce workflow.',
    },
    sr_lat: {
      what: 'Automatski prati web u potrazi za kopijama vaših slika. Kada pronađe potencijalnu povredu, omogućava takedown ili pokretanje postupka za naknadu.',
      note: 'Jak praktičan primer toka: praćenje → otkrivanje → zaštita prava.',
    },
    sr_cyr: {
      what: 'Аутоматски прати веб у потрази за копијама ваших слика. Када пронађе потенцијалну повреду, омогућава takedown или покретање поступка за накнаду.',
      note: 'Јак практичан пример тока: праћење → откривање → заштита права.',
    },
  },
  {
    id: 'copytrack',
    category: 'detect',
    name: 'COPYTRACK',
    url: 'https://copytrack.com',
    forWhom: ['visual'],
    price: 'freemium',
    en: {
      what: 'Searches for unauthorized use of images and can support retroactive licensing and rights enforcement.',
      note: 'Good alternative to Pixsy; compare both for your volume and use case.',
    },
    sr_lat: {
      what: 'Traži neovlašćeno korišćenje slika i može da podrži naknadno licenciranje i ostvarivanje prava.',
      note: 'Dobra alternativa Pixsyju; uporedite oba za vaš obim i slučaj upotrebe.',
    },
    sr_cyr: {
      what: 'Тражи неовлашћено коришћење слика и може да подржи накнадно лиценцирање и остваривање права.',
      note: 'Добра алтернатива Pixsyju; упоредите оба за ваш обим и случај употребе.',
    },
  },
  /* ── AI training opt-out ─────────────────────────────────────────────── */
  {
    id: 'haveibeentrained',
    category: 'optout',
    name: 'Have I Been Trained?',
    url: 'https://haveibeentrained.com',
    forWhom: ['visual'],
    price: 'free',
    en: {
      what: 'Search tool that lets artists find out whether their images appear in LAION-5B and other AI training datasets.',
      note: 'First step for any visual artist concerned about AI training data.',
    },
    sr_lat: {
      what: 'Alat za pretragu koji umetnicima omogućava da saznaju da li se njihove slike pojavljuju u LAION-5B i drugim skupovima podataka za AI treniranje.',
      note: 'Prvi korak za svakog vizuelnog umetnika zabrinutog zbog AI treninga.',
    },
    sr_cyr: {
      what: 'Алат за претрагу који уметницима омогућава да сазнају да ли се њихове слике појављују у LAION-5B и другим скуповима података за AI тренирање.',
      note: 'Први корак за сваког визуелног уметника забринутог због AI тренинга.',
    },
  },
  {
    id: 'spawning',
    category: 'optout',
    name: 'Spawning.ai — opt-out registry',
    url: 'https://spawning.ai',
    forWhom: ['visual', 'music', 'writing', 'design'],
    price: 'free',
    en: {
      what: 'Register your work to signal opt-out preference from future AI training datasets. Participating AI companies check the registry before scraping.',
      note: 'Distinct from Have I Been Trained? — this is about future datasets, not past ones.',
    },
    sr_lat: {
      what: 'Registrujte svoje radove kako biste signalizirali preferencu za odjavu iz budućih skupova podataka za AI treniranje. Učesničke AI kompanije proveravaju registar pre scrapinga.',
      note: 'Razlikuje se od Have I Been Trained? — ovo se tiče budućih skupova podataka, ne prošlih.',
    },
    sr_cyr: {
      what: 'Региструјте своје радове да бисте сигнализирали преференцу за одјаву из будућих скупова података за AI тренирање. Учесничке AI компаније проверавају регистар пре скрепинга.',
      note: 'Разликује се од Have I Been Trained? — ово се тиче будућих скупова података, не прошлих.',
    },
  },
  {
    id: 'aitxt',
    category: 'optout',
    name: 'ai.txt / robots.txt opt-out',
    url: 'https://spawning.ai/robots',
    forWhom: ['visual', 'music', 'writing', 'design'],
    price: 'free',
    en: {
      what: 'Declare opt-out preferences directly on your website via a robots.txt or ai.txt file. Signals to AI crawlers that your content should not be used for training.',
      note: 'Essential for creators who publish work on their own website.',
    },
    sr_lat: {
      what: 'Deklarisite preferencu odjave direktno na svom sajtu putem robots.txt ili ai.txt fajla. Signalizira AI crawlerima da vaš sadržaj ne treba koristiti za treniranje.',
      note: 'Ključno za stvaraoce koji objavljuju radove na sopstvenom sajtu.',
    },
    sr_cyr: {
      what: 'Декларишите преференцу одјаве директно на свом сајту путем robots.txt или ai.txt фајла. Сигнализира AI crawlerima да ваш садржај не треба користити за тренирање.',
      note: 'Кључно за ствараоце који објављују радове на сопственом сајту.',
    },
  },
  /* ── Style / content protection ─────────────────────────────────────── */
  {
    id: 'glaze',
    category: 'protect',
    name: 'Glaze',
    url: 'https://glaze.cs.uchicago.edu',
    forWhom: ['visual'],
    price: 'free',
    en: {
      what: 'Alters image characteristics so changes are barely visible to the human eye but make it much harder for AI models to learn and imitate a specific artist\'s style.',
      note: 'Use together with Nightshade: Glaze protects your style, Nightshade poisons the model that tries to copy it.',
    },
    sr_lat: {
      what: 'Menja karakteristike slike tako da su promene ljudskom oku uglavnom teško primetne, ali otežavaju AI modelima da nauče i imitiraju stil konkretnog umetnika.',
      note: 'Koristite zajedno sa Nightshade: Glaze štiti vaš stil, Nightshade truje model koji ga pokušava kopirati.',
    },
    sr_cyr: {
      what: 'Мења карактеристике слике тако да су промене људском оку углавном тешко приметне, али отежавају AI моделима да науче и имитирају стил конкретног уметника.',
      note: 'Користите заједно са Nightshade: Glaze штити ваш стил, Nightshade трује модел који га покушава копирати.',
    },
  },
  {
    id: 'nightshade',
    category: 'protect',
    name: 'Nightshade',
    url: 'https://nightshade.cs.uchicago.edu',
    forWhom: ['visual'],
    price: 'free',
    en: {
      what: 'Attempts to disrupt how AI models learn from scraped images, making unauthorized scraping and training riskier and less useful for the AI company.',
      note: 'Use together with Glaze. Both are academic projects from University of Chicago.',
    },
    sr_lat: {
      what: 'Pokušava da poremeti način na koji AI modeli uče iz neovlašćeno preuzetih slika, čineći scraping i treniranje bez saglasnosti autora rizičnijim i manje korisnim.',
      note: 'Koristite zajedno sa Glaze. Oba su akademski projekti Univerziteta u Čikagu.',
    },
    sr_cyr: {
      what: 'Покушава да поремети начин на који AI модели уче из неовлашћено преузетих слика, чинећи скрепинг и тренирање без сагласности аутора ризичнијим и мање корисним.',
      note: 'Користите заједно са Glaze. Оба су академски пројекти Универзитета у Чикагу.',
    },
  },
  /* ── Provenance & authenticity ───────────────────────────────────────── */
  {
    id: 'content-credentials',
    category: 'provenance',
    name: 'Adobe Content Credentials / C2PA',
    url: 'https://contentauthenticity.org',
    forWhom: ['visual', 'design'],
    price: 'free',
    en: {
      what: 'Adds Content Credentials to your work: data about origin, author, and how the content was created or changed. Based on the open C2PA standard — works across platforms.',
      note: 'The most important provenance infrastructure for creators. Not just an Adobe product — an open standard.',
    },
    sr_lat: {
      what: 'Dodaje Content Credentials delu: podatke o poreklu, autoru i načinu nastanka ili izmene sadržaja. Zasnovan na otvorenom C2PA standardu — radi na različitim platformama.',
      note: 'Najvažnija infrastruktura porekla za stvaraoce. Nije samo Adobe proizvod — otvoreni standard.',
    },
    sr_cyr: {
      what: 'Додаје Content Credentials делу: податке о пореклу, аутору и начину настанка или измене садржаја. Заснован на отвореном C2PA стандарду — ради на различитим платформама.',
      note: 'Најважнија инфраструктура порекла за ствараоце. Није само Adobe производ — отворени стандард.',
    },
  },
  {
    id: 'digimarc',
    category: 'provenance',
    name: 'Digimarc',
    url: 'https://digimarc.com',
    forWhom: ['visual'],
    price: 'commercial',
    en: {
      what: 'Embeds digital identifiers or watermarks in content, enabling identification and tracking even after further distribution.',
      note: 'Different approach from C2PA — identifies the work itself rather than the creation event.',
    },
    sr_lat: {
      what: 'Ugrađuje digitalne identifikatore ili vodene žigove u sadržaj, što omogućava identifikaciju i praćenje i nakon dalje distribucije.',
      note: 'Drugačiji pristup od C2PA — identifikuje samo delo, a ne događaj nastanka.',
    },
    sr_cyr: {
      what: 'Уграђује дигиталне идентификаторе или водене жигове у садржај, што омогућава идентификацију и праћење и након даље дистрибуције.',
      note: 'Другачији приступ од C2PA — идентификује само дело, а не догађај настанка.',
    },
  },
  {
    id: 'truepic',
    category: 'provenance',
    name: 'Truepic',
    url: 'https://truepic.com',
    forWhom: ['visual'],
    price: 'commercial',
    en: {
      what: 'Focuses on proving authenticity and origin of digital content and verifying how it was created.',
      note: 'Answers the question: "How do we prove this is an original, unmanipulated image?"',
    },
    sr_lat: {
      what: 'Fokusira se na dokazivanje autentičnosti i porekla digitalnog sadržaja i verifikaciju načina na koji je nastao.',
      note: 'Odgovara na pitanje: "Kako dokazujemo da je ovo originalna, nemanipulisana slika?"',
    },
    sr_cyr: {
      what: 'Фокусира се на доказивање аутентичности и порекла дигиталног садржаја и верификацију начина на који је настао.',
      note: 'Одговара на питање: "Како доказујемо да је ово оригинална, неманипулисана слика?"',
    },
  },
  /* ── Deepfake & AI detection ─────────────────────────────────────────── */
  {
    id: 'reality-defender',
    category: 'detect-ai',
    name: 'Reality Defender',
    url: 'https://realitydefender.com',
    forWhom: ['visual', 'music'],
    price: 'commercial',
    en: {
      what: 'Analyses image, video and audio to detect deepfakes and synthetic or manipulated content.',
      note: 'Particularly relevant for protecting the likeness, identity and reputation of performers.',
    },
    sr_lat: {
      what: 'Analizira sliku, video i audio radi otkrivanja deepfake i sintetičkog ili manipulisanog sadržaja.',
      note: 'Posebno relevantno za zaštitu lika, identiteta i reputacije izvođača.',
    },
    sr_cyr: {
      what: 'Анализира слику, видео и аудио ради откривања deepfake и синтетичког или манипулисаног садржаја.',
      note: 'Посебно релевантно за заштиту лика, идентитета и репутације извођача.',
    },
  },
  {
    id: 'resemble-detect',
    category: 'detect-ai',
    name: 'Resemble Detect',
    url: 'https://resemble.ai/detect',
    forWhom: ['music'],
    price: 'commercial',
    en: {
      what: 'Detects AI-generated or cloned voices and other forms of audio manipulation.',
      note: 'Important for musicians and voice artists: extends protection from image to voice and identity.',
    },
    sr_lat: {
      what: 'Detektuje AI-generisan ili kloniran glas i druge oblike audio manipulacije.',
      note: 'Važno za muzičare i voice umetnike: proširuje zaštitu sa slike na glas i identitet.',
    },
    sr_cyr: {
      what: 'Детектује AI-генерисан или клонирани глас и друге облике аудио манипулације.',
      note: 'Важно за музичаре и voice уметнике: проширује заштиту са слике на глас и идентитет.',
    },
  },
  {
    id: 'hive',
    category: 'detect-ai',
    name: 'Hive AI / Hive Moderation',
    url: 'https://hivemoderation.com',
    forWhom: ['visual'],
    price: 'commercial',
    en: {
      what: 'Detects AI-generated and synthetic content including images and video, mainly through API and platform integration.',
      note: 'More useful for organisations representing a large number of creators.',
    },
    sr_lat: {
      what: 'Detektuje AI-generisane i sintetičke sadržaje, uključujući slike i video, uglavnom kroz API i platformsku integraciju.',
      note: 'Korisnije organizacijama koje zastupaju veliki broj autora.',
    },
    sr_cyr: {
      what: 'Детектује AI-генерисане и синтетичке садржаје, укључујући слике и видео, углавном кроз API и платформску интеграцију.',
      note: 'Корисније организацијама које заступају велики број аутора.',
    },
  },
  /* ── Ethical AI certification ────────────────────────────────────────── */
  {
    id: 'fairly-trained',
    category: 'ethical',
    name: 'Fairly Trained',
    url: 'https://fairlytrained.org',
    forWhom: ['visual', 'music', 'writing', 'design'],
    price: 'free',
    en: {
      what: 'Certification for AI companies that train exclusively on licensed content. Lets creators and consumers identify AI tools that respect copyright.',
      note: 'Use this to know which AI tools to trust — or to demand certification from tools you already use.',
    },
    sr_lat: {
      what: 'Sertifikacija za AI kompanije koje treniraju isključivo na licenciranom sadržaju. Omogućava stvaraocima da prepoznaju AI alate koji poštuju autorska prava.',
      note: 'Koristite ovo da biste znali kojim AI alatima možete verovati — ili da biste zahtevali sertifikaciju od alata koje već koristite.',
    },
    sr_cyr: {
      what: 'Сертификација за AI компаније које тренирају искључиво на лиценцираном садржају. Омогућава ствараоцима да препознају AI алате који поштују ауторска права.',
      note: 'Користите ово да бисте знали којим AI алатима можете веровати — или да бисте захтевали сертификацију од алата које већ користите.',
    },
  },
  /* ── Collective rights (Serbia-specific) ─────────────────────────────── */
  {
    id: 'sokoj',
    category: 'rights',
    name: 'SOKOJ',
    url: 'https://sokoj.rs',
    forWhom: ['music'],
    price: 'free',
    en: {
      what: 'Serbian music authors\' rights organisation. Manages collective licensing, monitors use of musical works, and collects and distributes remuneration for composers, lyricists and publishers.',
      note: 'First contact for any musician in Serbia facing AI-related copyright issues.',
    },
    sr_lat: {
      what: 'Organizacija za kolektivno ostvarivanje autorskih prava muzičara u Srbiji. Upravlja kolektivnim licenciranjem, prati korišćenje muzičkih dela i naplaćuje i raspodeljuje naknade za kompozitore, tekstopisce i izdavače.',
      note: 'Prvo mesto kontakta za svakog muzičara u Srbiji koji se suočava sa AI autorskopravnim pitanjima.',
    },
    sr_cyr: {
      what: 'Организација за колективно остваривање ауторских права музичара у Србији. Управља колективним лиценцирањем, прати коришћење музичких дела и наплаћује и расподељује накнаде за композиторе, текстописце и издаваче.',
      note: 'Прво место контакта за сваког музичара у Србији који се суочава са AI ауторскоправним питањима.',
    },
  },
  {
    id: 'zis',
    category: 'rights',
    name: 'Zavod za intelektualnu svojinu Srbije',
    url: 'https://www.zis.gov.rs',
    forWhom: ['visual', 'music', 'writing', 'design'],
    price: 'free',
    en: {
      what: 'Serbia\'s Intellectual Property Office. Registers copyright claims, handles complaints, and provides official information on Serbian IP law including AI-related developments.',
      note: 'The official starting point for any formal rights enforcement action in Serbia.',
    },
    sr_lat: {
      what: 'Zavod za intelektualnu svojinu Srbije. Registruje autorska prava, postupa po pritužbama i pruža zvanične informacije o srpskom pravu intelektualne svojine, uključujući AI razvoje.',
      note: 'Zvanično polazište za svaku formalnu akciju zaštite prava u Srbiji.',
    },
    sr_cyr: {
      what: 'Завод за интелектуалну својину Србије. Региструје ауторска права, поступа по притужбама и пружа званичне информације о српском праву интелектуалне својине, укључујући AI развоје.',
      note: 'Званично полазиште за сваку формалну акцију заштите права у Србији.',
    },
  },
];

const CATEGORIES = {
  detect:    { en: 'Find unauthorized use',     sr_lat: 'Pronalaženje neovlašćenog korišćenja', sr_cyr: 'Проналажење неовлашћеног коришћења' },
  optout:    { en: 'AI training opt-out',        sr_lat: 'Odjava iz AI treniranja',              sr_cyr: 'Одјава из AI тренирања' },
  protect:   { en: 'Protect your style',         sr_lat: 'Zaštita stila',                        sr_cyr: 'Заштита стила' },
  provenance:{ en: 'Prove origin & authenticity',sr_lat: 'Dokazivanje porekla i autentičnosti',  sr_cyr: 'Доказивање порекла и аутентичности' },
  'detect-ai':{ en: 'Detect AI fakes',           sr_lat: 'Otkrivanje AI falsifikata',            sr_cyr: 'Откривање AI фалсификата' },
  ethical:   { en: 'Ethical AI certification',   sr_lat: 'Etička AI sertifikacija',              sr_cyr: 'Етичка AI сертификација' },
  rights:    { en: 'Rights management (Serbia)', sr_lat: 'Ostvarivanje prava (Srbija)',          sr_cyr: 'Остваривање права (Србија)' },
};

const PRICE_LABELS = {
  free:       { en: 'Free',       sr_lat: 'Besplatno',  sr_cyr: 'Бесплатно' },
  freemium:   { en: 'Freemium',   sr_lat: 'Freemium',   sr_cyr: 'Freemium' },
  commercial: { en: 'Commercial', sr_lat: 'Komercijalno',sr_cyr: 'Комерцијално' },
};

const FOR_WHOM_LABELS = {
  visual:  { en: 'Visual artists', sr_lat: 'Vizuelni umetnici', sr_cyr: 'Визуелни уметници' },
  music:   { en: 'Musicians',      sr_lat: 'Muzičari',          sr_cyr: 'Музичари' },
  writing: { en: 'Writers',        sr_lat: 'Pisci',             sr_cyr: 'Писци' },
  design:  { en: 'Designers',      sr_lat: 'Dizajneri',         sr_cyr: 'Дизајнери' },
};

/* ── State ───────────────────────────────────────────────────────────────── */
let activeFilter = 'all';

/* ── Render ──────────────────────────────────────────────────────────────── */
function toolsLang() {
  return (window.getLang ? window.getLang() : 'sr_lat').replace(/-/g, '_');
}

function tx(obj) {
  return obj[toolsLang()] || obj['sr_lat'] || obj['en'] || '';
}

function renderFilters(container) {
  const lang = toolsLang();
  const allLabel = { en: 'All tools', sr_lat: 'Svi alati', sr_cyr: 'Сви алати' }[lang] || 'All tools';

  container.innerHTML = '';

  const allBtn = document.createElement('button');
  allBtn.className = 'tools-filter-btn' + (activeFilter === 'all' ? ' active' : '');
  allBtn.textContent = allLabel;
  allBtn.addEventListener('click', () => { activeFilter = 'all'; renderPage(); });
  container.appendChild(allBtn);

  Object.entries(CATEGORIES).forEach(([key, labels]) => {
    const btn = document.createElement('button');
    btn.className = 'tools-filter-btn' + (activeFilter === key ? ' active' : '');
    btn.textContent = tx(labels);
    btn.addEventListener('click', () => { activeFilter = key; renderPage(); });
    container.appendChild(btn);
  });
}

function renderTools(container) {
  const lang = toolsLang();
  const filtered = activeFilter === 'all' ? TOOLS : TOOLS.filter(t => t.category === activeFilter);

  // Group by category in order
  const grouped = {};
  filtered.forEach(tool => {
    if (!grouped[tool.category]) grouped[tool.category] = [];
    grouped[tool.category].push(tool);
  });

  container.innerHTML = '';

  Object.entries(grouped).forEach(([cat, tools]) => {
    const section = document.createElement('section');
    section.className = 'tools-category';

    const heading = document.createElement('h2');
    heading.className = 'tools-category-heading';
    heading.textContent = tx(CATEGORIES[cat]);
    section.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'tools-grid';

    tools.forEach(tool => {
      const card = document.createElement('article');
      card.className = 'tool-card';

      const local = tool[lang] || tool['en'];
      const forWhomText = tool.forWhom.map(k => tx(FOR_WHOM_LABELS[k])).join(', ');
      const priceText = tx(PRICE_LABELS[tool.price]);

      card.innerHTML = `
        <div class="tool-card-header">
          <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="tool-card-name">${tool.name}</a>
        </div>
        <p class="tool-card-what">${local.what}</p>
        ${local.note ? `<div class="tool-card-note callout callout-key"><span>${local.note}</span></div>` : ''}
        <div class="tool-card-meta">
          <span class="tool-badge tool-badge-price tool-badge-${tool.price}">${priceText}</span>
          <span class="tool-badge tool-badge-whom">${forWhomText}</span>
        </div>`;

      grid.appendChild(card);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

function renderPage() {
  const filterBar = document.getElementById('tools-filter-bar');
  const toolsContainer = document.getElementById('tools-container');
  if (filterBar) renderFilters(filterBar);
  if (toolsContainer) renderTools(toolsContainer);
}

/* ── Init ────────────────────────────────────────────────────────────────── */
function initTools() {
  if (!document.getElementById('tools-container')) return;
  activeFilter = 'all';
  renderPage();
const _prevLangChange = window.onLangChange;
window.onLangChange = function() {
  if (typeof _prevLangChange === 'function') _prevLangChange();
  renderPage();
};
}

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('tools-container')) return;
  const wait = setInterval(() => {
    if (typeof window.t === 'function' && window.t('nav.home') !== '[nav.home]') {
      clearInterval(wait);
      initTools();
    }
  }, 20);
});
