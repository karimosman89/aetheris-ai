/* =========================================================================
   AETHERIS AI · v3.0 — Frontend app (bilingual IT/EN, single-file render)
   ========================================================================= */

const T = {
  it: {
    nav: { platform: 'Piattaforma', poc: 'Proof of Capability', market: 'Mercato', moat: 'Vantaggio', roadmap: 'Roadmap', funding: 'Funding', contact: 'Contatti', cta: 'Investi con noi' },
    hero: {
      eyebrow: 'Applied AI Infrastructure · Europa',
      h1a: 'AI industriale', h1b: 'europea, per davvero.',
      sub: 'La piattaforma di Applied AI che unifica GenAI, Computer Vision, Predictive AI e Agents per Energy e Manufacturing. AI Act–ready by design.',
      cta1: 'Scopri i 3 PoC', cta2: 'Master Plan v3.0',
      b1: 'Startup Innovativa · Toscana', b2: 'AI Act–ready (Reg. UE 2024/1689)', b3: 'Grounded & Proven'
    },
    layers: { title: 'AETHERIS OS', l1: 'Knowledge · RAG + Agents', l2: 'Vision · Defect Detection', l3: 'Predict · Maintenance', l4: 'Compliance · AI Act Layer', l5: 'Edge · Jetson / ONNX' },
    ticker: 'Stack di produzione verificato',
    stats: { title: 'Track record di produzione — verificabile', lead: 'Non promesse: risultati già consegnati in produzione dal founder in 5+ anni.',
      s1: 'utenti/giorno serviti', s2: 'uptime su sistemi AI', s3: 'impatto economico/anno', s4: 'anni AI in produzione' },
    platform: { eyebrow: 'La soluzione', title: 'Un unico layer. Tre applicazioni.', lead: 'Aetheris AI combina in un\'unica architettura cloud-native + edge le tecnologie AI che l\'industria europea usa davvero — con governance e compliance integrate.',
      p1t: 'Aetheris Knowledge', p1d: 'RAG multimodale su documenti tecnici, manuali e normative. AI Agents per recupero, sintesi e generazione. Knowledge copilot per operatori sul campo.', p1u: 'Engineering copilot · Document intelligence · Technical Q&A', p1s: 'GenAI / RAG / Agents',
      p2t: 'Aetheris Vision', p2d: 'Modelli pre-addestrati + fine-tuning rapido: object detection, classificazione difetti, OCR, video analytics. Deploy su edge con ONNX.', p2u: 'Ispezione su linea · Monitoraggio asset remoti', p2s: 'Computer Vision',
      p3t: 'Aetheris Predict', p3d: 'Forecasting, anomaly detection e manutenzione predittiva. Integrazione con SCADA, IoT e sensori per ottimizzazione energetica.', p3u: 'Predictive maintenance · Energy optimization', p3s: 'Predictive AI' },
    aiact: { eyebrow: 'Regolatorio', title: 'AI Act–ready by design', lead: 'Non dichiariamo una conformità da certificare: ingegnerizziamo la piattaforma per supportare i requisiti del Regolamento (UE) 2024/1689 fin dal primo giorno.',
      pillars: 'Governance integrata',
      pv: [
        ['fa-shield-halved', 'Risk management', 'Model registry, data lineage automatico, audit trail completo'],
        ['fa-file-lines', 'Documentazione', 'DPIA e scheda tecnica per ogni sistema AI; explainability integrata'],
        ['fa-user-check', 'Human oversight', 'Pattern per revisione umana, override e feedback loop'],
        ['fa-lock', 'Sicurezza & GDPR', 'Data residency EU, cifratura, gestione consensi']
      ],
      regs: [
        ['AI Act', 'Reg. UE 2024/1689', 'Architettura by design; roadmap certificazione M18+'],
        ['GDPR', 'Reg. UE 2016/679', 'Privacy by design, DPO designato, DPIA per use case'],
        ['Data Act', 'Reg. UE 2023/2854', 'API standard per portabilità ed export'],
        ['NIS2', 'Reg. UE 2022/2554', 'Incident response, monitoring, notifica incidenti'],
        ['CRA', 'Reg. UE 2024/2847', 'SBOM automatico, vulnerability management']
      ]
    },
    poc: { eyebrow: 'Proof of Capability · 4 livelli', title: '3 PoC pubblici. Codice, non slide.', lead: 'In 12-15 settimane il founder pubblica 3 Proof of Concept su dataset aperti — con GitHub, demo live, blog e white paper. Prove concrete prima del mercato.',
      rows: [
        ['M1–M4', 'PoC 1', 'Aetheris Knowledge · RAG', 'RAG ibrido AI Act-ready su 100+ documenti industriali: ingestion multimodale, retrieval semantico + BM25, re-ranking, ReAct agent, HITL con review queue.', ['BGE-M3', 'Qdrant', 'LangGraph', 'Mistral 7B', 'RAGAS']],
        ['M5–M8', 'PoC 2', 'Aetheris Vision · Defect Detection', 'Pipeline di visione industriale end-to-end su MVTec / NEU-DET: training, benchmark vs baseline, export ONNX/TensorRT, deploy edge su Jetson.', ['YOLOv8', 'ONNX', 'TensorRT', 'FastAPI', 'Gradio']],
        ['M9–M12', 'PoC 3', 'Aetheris Predict · Maintenance', 'Manutenzione predittiva su NASA C-MAPSS: 4 modelli a confronto, anomaly detection, dashboard di remaining-useful-life e alerting.', ['C-MAPSS', 'LSTM', 'XGBoost', 'Dashboard', 'MLOps']]
      ],
      deliver: ['GitHub repo', 'Docker Compose', 'Live demo', 'Blog post', 'White paper']
    },
    market: { eyebrow: 'Market Opportunity', title: 'Un mercato EU da miliardi, con approccio bottom-up.', lead: 'Dimensioni reali dei segmenti addressable in Europa al 2030 — e un modello di crescita conservativo, non promesse.',
      segs: [
        ['fa-bolt', 'AI in Energy & Utilities', '€ 28 Mld', 'SAM € 6 Mld'],
        ['fa-industry', 'AI in Manufacturing', '€ 47 Mld', 'SAM € 10 Mld'],
        ['fa-file-magnifying-glass', 'Document Intelligence', '€ 12 Mld', 'SAM € 3 Mld'],
        ['fa-eye', 'AI Vision industriale', '€ 18 Mld', 'SAM € 4 Mld'],
        ['fa-gauge-high', 'Predictive Maintenance', '€ 14 Mld', 'SAM € 3 Mld']
      ],
      totalL: 'Totale addressable Aetheris (EU 2030)', totalV: 'TAM € 119 Mld · SAM € 26 Mld'
    },
    moat: { eyebrow: 'Vantaggio competitivo', title: 'Un moat a 5 livelli che cresce con ogni cliente.', lead: 'Il vantaggio non è una singola tecnologia, ma una struttura che si rafforza con ogni PoC pubblicato e ogni design partner.',
      items: [
        ['L1', 'Self-provable', '3 PoC pubblici (GitHub + demo + blog + white paper) — proof of capability visibile a chiunque.'],
        ['L2', 'Network-derivable', '2-4 advisor firmati (AI Act + industry) e community tecnica che genera fiducia e intro.'],
        ['L3', 'Customer-derivable', 'Design partner agreement con dati di dominio proprietari e KPI di ROI misurati.'],
        ['L4', 'Compliance moat', 'Architettura AI Act–ready: barriera per competitor US non nativi sul regolatorio EU.'],
        ['L5', 'Data + verticali', 'Dataset industriali annotati per Energy e Manufacturing, non replicabili off-the-shelf.']
      ]
    },
    roadmap: { eyebrow: 'Roadmap', title: '5 Gate misurabili. Funding milestone-based.', lead: 'Ogni Gate ha criteri di uscita concreti. Il capitale successivo si sblocca solo al superamento del Gate — allineando gli incentivi.',
      gates: [
        ['M3', 'Gate 1', 'Technical validation', ['PoC 1 (Knowledge) pubblicato', 'GitHub + demo + white paper', '2 advisor firmati']],
        ['M6', 'Gate 2', 'Customer validation', ['PoC 2 (Vision) pubblicato', '30-50 interviste', '1-2 design partner', '€ 50-100k pipeline']],
        ['M12', 'Gate 3', 'Product-market', ['PoC 3 (Predict) pubblicato', '2-3 clienti paganti', '€ 50-100k ARR', 'Primo case study']],
        ['M18', 'Gate 4', 'Repeatability', ['5-6 clienti paganti', '€ 250-400k ARR', 'Sales playbook', 'Co-founder attivo']],
        ['M24', 'Gate 5', 'Scale', ['8-12 clienti', '€ 800k-1.2M ARR', '1-2 clienti EU', 'EIC application']]
      ]
    },
    fin: { eyebrow: 'Financial Model', title: 'Numeri conservativi, coerenti al centesimo.', lead: 'Il Financial Model allegato contiene 385 formule live, 0 errori. La crescita è deliberatamente prudente per un founder solo che costruisce il team.',
      chartTitle: 'Ricavi previsti (conservativo)',
      table: [
        ['Ricavi', '€ 80k', '€ 400k', '€ 1.150k'],
        ['Clienti paganti', '2', '5', '10'],
        ['ACV', '€ 40k', '€ 80k', '€ 115k'],
        ['Team (FTE medi)', '0.8', '2.5', '4'],
        ['Margine lordo', '60%', '65%', '70%'],
        ['EBITDA', '-€ 200k', '-€ 50k', '+€ 200k'],
        ['Cash EoY', '€ 200k', '€ 350k', '€ 1.3M']
      ],
      cols: ['Metrica', 'Anno 1', 'Anno 2', 'Anno 3'],
      note: 'Coerente con il Financial Model Excel allegato · 385 formule live · 0 errori'
    },
    funding: { eyebrow: 'Funding Strategy', title: '€ 200-300k Phase 1. Proporzionato, non € 1.5M upfront.', lead: 'Una struttura milestone-based in 3 fasi: si chiede il capitale giusto al momento giusto, allineato alle prove di execution.',
      cards: [
        ['Phase 1 · M0-M12', '€ 200-300k', 'Gate 1+2: 3 PoC + design partner', ['Smart&Start Italia — € 200k tasso zero', 'IKIGAI / Polo Navacchio / Nana Bianca', 'Round pre-seed angel — € 100k'], true],
        ['Phase 2 · M12-M24', '€ 750k', 'Dopo Gate 3: 2-3 clienti, € 50-100k ARR', ['Round seed VC specializzati', 'Corporate strategici EU', 'Espansione Italia + 1 cliente EU'], false],
        ['Phase 3 · M24+', '€ 500k-2.5M', 'Dopo Gate 4: € 250-400k ARR', ['EIC Accelerator (grant + equity)', 'Series A lead', 'Primo ufficio EU (DACH/Benelux)'], false]
      ]
    },
    contact: { eyebrow: 'Parliamone', title: 'Costruiamo insieme l\'AI industriale europea.', lead: 'Investitori, business angel, advisor, design partner o accelerator: se il percorso grounded & proven ti convince, scrivici.',
      form: { name: 'Nome e cognome', email: 'Email', org: 'Organizzazione', role: 'Ruolo', interest: 'Sono un/una…', message: 'Messaggio', submit: 'Invia richiesta', sending: 'Invio…',
        interests: ['Investitore / VC', 'Business Angel', 'Advisor', 'Design Partner (Energy)', 'Design Partner (Manufacturing)', 'Accelerator / Grant', 'Altro'] }
    },
    footer: { tagline: 'Applied AI Infrastructure for European Industry. AI Act–ready by design.', explore: 'Esplora', docs: 'Documenti', legal: 'Legale',
      links: { platform: 'Piattaforma', poc: 'Proof of Capability', roadmap: 'Roadmap', funding: 'Funding', masterplan: 'Master Plan v3.0', onepager: 'One-Pager', pitch: 'Pitch Deck', technical: 'Technical Dossier', privacy: 'Privacy', terms: 'Termini', confidential: 'Confidenzialità' },
      rights: '© 2026 Aetheris AI S.r.l. · Startup Innovativa ex D.L. 179/2012 · Toscana, Italia' }
  },
  en: {
    nav: { platform: 'Platform', poc: 'Proof of Capability', market: 'Market', moat: 'Moat', roadmap: 'Roadmap', funding: 'Funding', contact: 'Contact', cta: 'Invest with us' },
    hero: {
      eyebrow: 'Applied AI Infrastructure · Europe',
      h1a: 'European industrial AI,', h1b: 'for real.',
      sub: 'The Applied AI platform that unifies GenAI, Computer Vision, Predictive AI and Agents for Energy and Manufacturing. AI Act–ready by design.',
      cta1: 'Explore the 3 PoCs', cta2: 'Master Plan v3.0',
      b1: 'Innovative Startup · Tuscany', b2: 'AI Act–ready (EU Reg. 2024/1689)', b3: 'Grounded & Proven'
    },
    layers: { title: 'AETHERIS OS', l1: 'Knowledge · RAG + Agents', l2: 'Vision · Defect Detection', l3: 'Predict · Maintenance', l4: 'Compliance · AI Act Layer', l5: 'Edge · Jetson / ONNX' },
    ticker: 'Verified production stack',
    stats: { title: 'A production track record — verifiable', lead: 'Not promises: results already delivered in production by the founder over 5+ years.',
      s1: 'users/day served', s2: 'uptime on AI systems', s3: 'economic impact/year', s4: 'years of AI in production' },
    platform: { eyebrow: 'The solution', title: 'One layer. Three applications.', lead: 'Aetheris AI combines the AI technologies European industry actually uses into a single cloud-native + edge architecture — with governance and compliance built in.',
      p1t: 'Aetheris Knowledge', p1d: 'Multimodal RAG over technical documents, manuals and regulations. AI Agents for retrieval, synthesis and generation. A knowledge copilot for field operators.', p1u: 'Engineering copilot · Document intelligence · Technical Q&A', p1s: 'GenAI / RAG / Agents',
      p2t: 'Aetheris Vision', p2d: 'Pre-trained models + rapid fine-tuning: object detection, defect classification, OCR, video analytics. Edge deployment with ONNX.', p2u: 'In-line inspection · Remote asset monitoring', p2s: 'Computer Vision',
      p3t: 'Aetheris Predict', p3d: 'Forecasting, anomaly detection and predictive maintenance. SCADA, IoT and sensor integration for energy optimization.', p3u: 'Predictive maintenance · Energy optimization', p3s: 'Predictive AI' },
    aiact: { eyebrow: 'Regulatory', title: 'AI Act–ready by design', lead: 'We don\'t claim a certification still to be earned: we engineer the platform to support EU Reg. 2024/1689 requirements from day one.',
      pillars: 'Built-in governance',
      pv: [
        ['fa-shield-halved', 'Risk management', 'Model registry, automatic data lineage, full audit trail'],
        ['fa-file-lines', 'Documentation', 'DPIA and technical file per AI system; built-in explainability'],
        ['fa-user-check', 'Human oversight', 'Patterns for human review, override and feedback loops'],
        ['fa-lock', 'Security & GDPR', 'EU data residency, encryption, consent management']
      ],
      regs: [
        ['AI Act', 'EU Reg. 2024/1689', 'Architecture by design; certification roadmap M18+'],
        ['GDPR', 'EU Reg. 2016/679', 'Privacy by design, designated DPO, DPIA per use case'],
        ['Data Act', 'EU Reg. 2023/2854', 'Standard APIs for portability and export'],
        ['NIS2', 'EU Reg. 2022/2554', 'Incident response, monitoring, breach notification'],
        ['CRA', 'EU Reg. 2024/2847', 'Automatic SBOM, vulnerability management']
      ]
    },
    poc: { eyebrow: 'Proof of Capability · 4 levels', title: '3 public PoCs. Code, not slides.', lead: 'In 12-15 weeks the founder ships 3 Proofs of Concept on open datasets — with GitHub, live demo, blog and white paper. Concrete proof before the market.',
      rows: [
        ['M1–M4', 'PoC 1', 'Aetheris Knowledge · RAG', 'AI Act-ready hybrid RAG over 100+ industrial documents: multimodal ingestion, semantic + BM25 retrieval, re-ranking, ReAct agent, HITL with review queue.', ['BGE-M3', 'Qdrant', 'LangGraph', 'Mistral 7B', 'RAGAS']],
        ['M5–M8', 'PoC 2', 'Aetheris Vision · Defect Detection', 'End-to-end industrial vision pipeline on MVTec / NEU-DET: training, benchmark vs baseline, ONNX/TensorRT export, edge deploy on Jetson.', ['YOLOv8', 'ONNX', 'TensorRT', 'FastAPI', 'Gradio']],
        ['M9–M12', 'PoC 3', 'Aetheris Predict · Maintenance', 'Predictive maintenance on NASA C-MAPSS: 4 models compared, anomaly detection, remaining-useful-life dashboard and alerting.', ['C-MAPSS', 'LSTM', 'XGBoost', 'Dashboard', 'MLOps']]
      ],
      deliver: ['GitHub repo', 'Docker Compose', 'Live demo', 'Blog post', 'White paper']
    },
    market: { eyebrow: 'Market Opportunity', title: 'A multi-billion EU market, with a bottom-up approach.', lead: 'Real sizes of the addressable EU segments in 2030 — and a conservative growth model, not promises.',
      segs: [
        ['fa-bolt', 'AI in Energy & Utilities', '€ 28B', 'SAM € 6B'],
        ['fa-industry', 'AI in Manufacturing', '€ 47B', 'SAM € 10B'],
        ['fa-file-magnifying-glass', 'Document Intelligence', '€ 12B', 'SAM € 3B'],
        ['fa-eye', 'Industrial AI Vision', '€ 18B', 'SAM € 4B'],
        ['fa-gauge-high', 'Predictive Maintenance', '€ 14B', 'SAM € 3B']
      ],
      totalL: 'Total Aetheris addressable (EU 2030)', totalV: 'TAM € 119B · SAM € 26B'
    },
    moat: { eyebrow: 'Competitive advantage', title: 'A 5-level moat that grows with every customer.', lead: 'The advantage isn\'t a single technology, but a structure that strengthens with every published PoC and every design partner.',
      items: [
        ['L1', 'Self-provable', '3 public PoCs (GitHub + demo + blog + white paper) — proof of capability visible to anyone.'],
        ['L2', 'Network-derivable', '2-4 signed advisors (AI Act + industry) and a technical community that builds trust and intros.'],
        ['L3', 'Customer-derivable', 'Design partner agreements with proprietary domain data and measured ROI KPIs.'],
        ['L4', 'Compliance moat', 'AI Act–ready architecture: a barrier for US competitors not native to EU regulation.'],
        ['L5', 'Data + verticals', 'Annotated industrial datasets for Energy and Manufacturing, not available off-the-shelf.']
      ]
    },
    roadmap: { eyebrow: 'Roadmap', title: '5 measurable Gates. Milestone-based funding.', lead: 'Each Gate has concrete exit criteria. The next tranche of capital unlocks only when the Gate is cleared — aligning incentives.',
      gates: [
        ['M3', 'Gate 1', 'Technical validation', ['PoC 1 (Knowledge) published', 'GitHub + demo + white paper', '2 advisors signed']],
        ['M6', 'Gate 2', 'Customer validation', ['PoC 2 (Vision) published', '30-50 interviews', '1-2 design partners', '€ 50-100k pipeline']],
        ['M12', 'Gate 3', 'Product-market', ['PoC 3 (Predict) published', '2-3 paying customers', '€ 50-100k ARR', 'First case study']],
        ['M18', 'Gate 4', 'Repeatability', ['5-6 paying customers', '€ 250-400k ARR', 'Sales playbook', 'Co-founder active']],
        ['M24', 'Gate 5', 'Scale', ['8-12 customers', '€ 800k-1.2M ARR', '1-2 EU customers', 'EIC application']]
      ]
    },
    fin: { eyebrow: 'Financial Model', title: 'Conservative numbers, coherent to the cent.', lead: 'The attached Financial Model contains 385 live formulas, 0 errors. Growth is deliberately prudent for a solo founder building the team.',
      chartTitle: 'Projected revenue (conservative)',
      table: [
        ['Revenue', '€ 80k', '€ 400k', '€ 1,150k'],
        ['Paying customers', '2', '5', '10'],
        ['ACV', '€ 40k', '€ 80k', '€ 115k'],
        ['Team (avg FTE)', '0.8', '2.5', '4'],
        ['Gross margin', '60%', '65%', '70%'],
        ['EBITDA', '-€ 200k', '-€ 50k', '+€ 200k'],
        ['Cash EoY', '€ 200k', '€ 350k', '€ 1.3M']
      ],
      cols: ['Metric', 'Year 1', 'Year 2', 'Year 3'],
      note: 'Coherent with the attached Financial Model Excel · 385 live formulas · 0 errors'
    },
    funding: { eyebrow: 'Funding Strategy', title: '€ 200-300k Phase 1. Proportionate, not € 1.5M upfront.', lead: 'A milestone-based, 3-phase structure: raise the right capital at the right time, aligned to execution proof.',
      cards: [
        ['Phase 1 · M0-M12', '€ 200-300k', 'Gate 1+2: 3 PoCs + design partners', ['Smart&Start Italia — € 200k zero-rate', 'IKIGAI / Polo Navacchio / Nana Bianca', 'Pre-seed angel round — € 100k'], true],
        ['Phase 2 · M12-M24', '€ 750k', 'After Gate 3: 2-3 customers, € 50-100k ARR', ['Specialized seed VC round', 'EU corporate strategics', 'Italy expansion + 1 EU customer'], false],
        ['Phase 3 · M24+', '€ 500k-2.5M', 'After Gate 4: € 250-400k ARR', ['EIC Accelerator (grant + equity)', 'Series A lead', 'First EU office (DACH/Benelux)'], false]
      ]
    },
    contact: { eyebrow: 'Let\'s talk', title: 'Let\'s build European industrial AI together.', lead: 'Investors, angels, advisors, design partners or accelerators: if the grounded & proven path convinces you, get in touch.',
      form: { name: 'Full name', email: 'Email', org: 'Organization', role: 'Role', interest: 'I am a…', message: 'Message', submit: 'Send request', sending: 'Sending…',
        interests: ['Investor / VC', 'Business Angel', 'Advisor', 'Design Partner (Energy)', 'Design Partner (Manufacturing)', 'Accelerator / Grant', 'Other'] }
    },
    footer: { tagline: 'Applied AI Infrastructure for European Industry. AI Act–ready by design.', explore: 'Explore', docs: 'Documents', legal: 'Legal',
      links: { platform: 'Platform', poc: 'Proof of Capability', roadmap: 'Roadmap', funding: 'Funding', masterplan: 'Master Plan v3.0', onepager: 'One-Pager', pitch: 'Pitch Deck', technical: 'Technical Dossier', privacy: 'Privacy', terms: 'Terms', confidential: 'Confidentiality' },
      rights: '© 2026 Aetheris AI S.r.l. · Innovative Startup (D.L. 179/2012) · Tuscany, Italy' }
  }
};

let LANG = localStorage.getItem('aetheris_lang') || 'it';

// ---- expose render entrypoint (defined in render.js appended below) ----
window.__AETHERIS__ = { T, get lang(){return LANG;}, setLang(l){ LANG=l; localStorage.setItem('aetheris_lang', l); } };

/* =========================================================================
   RENDER
   ========================================================================= */
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };

function render() {
  const t = T[LANG];
  document.documentElement.lang = LANG;
  const root = document.getElementById('app-root');
  root.innerHTML = '';
  root.appendChild(Nav(t));
  root.appendChild(Hero(t));
  root.appendChild(Ticker(t));
  root.appendChild(Stats(t));
  root.appendChild(Platform(t));
  root.appendChild(AIAct(t));
  root.appendChild(PoC(t));
  root.appendChild(Market(t));
  root.appendChild(Moat(t));
  root.appendChild(Roadmap(t));
  root.appendChild(Financials(t));
  root.appendChild(Funding(t));
  root.appendChild(Contact(t));
  root.appendChild(Footer(t));
  wireInteractions();
  observeReveal();
}

/* ---- Navbar ---- */
function Nav(t) {
  const n = el('nav', 'nav');
  const other = LANG === 'it' ? 'EN' : 'IT';
  n.innerHTML = `
    <div class="container nav-inner">
      <a href="#top" class="brand"><span class="brand-mark">Æ</span> Aetheris <span class="gradient-text">AI</span></a>
      <div class="nav-links" id="navlinks">
        <a href="#platform">${t.nav.platform}</a>
        <a href="#poc">${t.nav.poc}</a>
        <a href="#market">${t.nav.market}</a>
        <a href="#moat">${t.nav.moat}</a>
        <a href="#roadmap">${t.nav.roadmap}</a>
        <a href="#funding">${t.nav.funding}</a>
      </div>
      <div class="nav-actions">
        <button class="lang-toggle" id="langBtn"><b>${LANG.toUpperCase()}</b>/<span>${other}</span></button>
        <a href="#contact" class="btn btn-primary" style="padding:11px 20px;font-size:14px;">${t.nav.cta}</a>
        <button class="menu-btn" id="menuBtn"><i class="fas fa-bars"></i></button>
      </div>
    </div>`;
  return n;
}

/* ---- Hero ---- */
function Hero(t) {
  const s = el('section', 'hero'); s.id = 'top';
  s.innerHTML = `
    <div class="container hero-grid">
      <div class="hero-copy reveal in">
        <span class="eyebrow">${t.hero.eyebrow}</span>
        <h1>${t.hero.h1a}<br><span class="gradient-text">${t.hero.h1b}</span></h1>
        <p class="hero-sub">${t.hero.sub}</p>
        <div class="hero-cta">
          <a href="#poc" class="btn btn-primary"><i class="fas fa-cube"></i> ${t.hero.cta1}</a>
          <a href="#funding" class="btn btn-ghost"><i class="fas fa-file-lines"></i> ${t.hero.cta2}</a>
        </div>
        <div class="hero-badges">
          <span class="chip"><i class="fas fa-map-marker-alt"></i> ${t.hero.b1}</span>
          <span class="chip"><i class="fas fa-shield-halved"></i> ${t.hero.b2}</span>
          <span class="chip"><i class="fas fa-circle-check"></i> ${t.hero.b3}</span>
        </div>
      </div>
      <div class="hero-visual">
        <div class="orb"></div>
        <div class="hero-card float">
          <div class="hero-card-head">
            <div class="dot-row"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></div>
            <span class="tag">${t.layers.title} · runtime</span>
          </div>
          <div class="layer-stack">
            <div class="layer"><i style="background:linear-gradient(135deg,#22e3d4,#4f7bff)"><i class="fas fa-brain"></i></i> ${t.layers.l1}<span class="meta">RAG</span></div>
            <div class="layer"><i style="background:linear-gradient(135deg,#4f7bff,#7c8cff)"><i class="fas fa-eye"></i></i> ${t.layers.l2}<span class="meta">CV</span></div>
            <div class="layer"><i style="background:linear-gradient(135deg,#7c8cff,#a855f7)"><i class="fas fa-chart-line"></i></i> ${t.layers.l3}<span class="meta">ML</span></div>
            <div class="layer"><i style="background:linear-gradient(135deg,#a855f7,#f472b6)"><i class="fas fa-shield-halved"></i></i> ${t.layers.l4}<span class="meta">EU</span></div>
            <div class="layer"><i style="background:linear-gradient(135deg,#f472b6,#22e3d4)"><i class="fas fa-microchip"></i></i> ${t.layers.l5}<span class="meta">edge</span></div>
          </div>
        </div>
      </div>
    </div>`;
  return s;
}

/* ---- Ticker ---- */
function Ticker(t) {
  const s = el('section', 'ticker-wrap');
  const items = ['RAG', 'LangGraph', 'YOLOv8', 'ONNX Runtime', 'Qdrant', 'Mistral', 'TensorRT', 'Kubernetes', 'FastAPI', 'MLOps', 'BGE-M3', 'Triton'];
  const row = items.map(i => `<span><i class="fas fa-circle-nodes"></i> ${i}</span>`).join('');
  s.innerHTML = `<div class="container"><div class="ticker-label">${t.ticker}</div></div>
    <div class="ticker">${row}${row}</div>`;
  return s;
}

/* ---- Stats ---- */
function Stats(t) {
  const s = el('section', 'section'); s.id = 'track';
  s.innerHTML = `
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Track record</span>
        <h2 class="section-title">${t.stats.title}</h2>
        <p class="section-lead">${t.stats.lead}</p>
      </div>
      <div class="stats">
        ${statCard('100k+', t.stats.s1, 1)}
        ${statCard('99.9%', t.stats.s2, 2)}
        ${statCard('€ 2M+', t.stats.s3, 3)}
        ${statCard('5+', t.stats.s4, 4)}
      </div>
    </div>`;
  return s;
}
const statCard = (num, label, d) => `
  <div class="stat-card reveal d${d}">
    <div class="stat-num gradient-text" data-count="${num}">${num}</div>
    <div class="stat-label">${label}</div>
  </div>`;

/* ---- Platform ---- */
function Platform(t) {
  const s = el('section', 'section'); s.id = 'platform';
  const p = t.platform;
  s.innerHTML = `
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${p.eyebrow}</span>
        <h2 class="section-title">${p.title}</h2>
        <p class="section-lead">${p.lead}</p>
      </div>
      <div class="grid-3">
        ${pillarCard('g1','fa-brain',p.p1t,p.p1d,p.p1u,p.p1s,1)}
        ${pillarCard('g2','fa-eye',p.p2t,p.p2d,p.p2u,p.p2s,2)}
        ${pillarCard('g3','fa-chart-line',p.p3t,p.p3d,p.p3u,p.p3s,3)}
      </div>
    </div>`;
  return s;
}
const pillarCard = (g,icon,title,desc,uc,badge,d) => `
  <div class="card ${g} reveal d${d}">
    <span class="card-badge">${badge}</span>
    <div class="card-icon"><i class="fas ${icon}"></i></div>
    <h3>${title}</h3>
    <p>${desc}</p>
    <div class="usecase"><i class="fas fa-arrow-right"></i> ${uc}</div>
  </div>`;

/* ---- AI Act ---- */
function AIAct(t) {
  const s = el('section', 'section'); s.id = 'aiact';
  const a = t.aiact;
  const regs = a.regs.map(r => `
    <div class="reg-item"><span class="rk">${r[0]}</span><div><h4>${r[1]}</h4><p>${r[2]}</p></div></div>`).join('');
  const pillars = a.pv.map(p => `
    <div class="pillar-row"><i class="fas ${p[0]}"></i><div><div class="p-t">${p[1]}</div><div class="p-d">${p[2]}</div></div></div>`).join('');
  s.innerHTML = `
    <div class="container split">
      <div class="reveal">
        <span class="eyebrow">${a.eyebrow}</span>
        <h2 class="section-title">${a.title}</h2>
        <p class="section-lead" style="margin-bottom:28px">${a.lead}</p>
        <div class="reg-list">${regs}</div>
      </div>
      <div class="compliance-visual reveal d2">
        <h4>${a.pillars}</h4>
        ${pillars}
      </div>
    </div>`;
  return s;
}

/* ---- PoC ---- */
function PoC(t) {
  const s = el('section', 'section'); s.id = 'poc';
  const p = t.poc;
  const rows = p.rows.map((r,i) => {
    const tags = r[4].map(x => `<span class="poc-tag">${x}</span>`).join('');
    return `
    <div class="poc-row reveal d${i+1}">
      <div class="poc-when">${r[1]}<b>${r[0]}</b></div>
      <div class="poc-body">
        <h3>${r[2]}</h3>
        <p>${r[3]}</p>
        <div class="poc-tags">${tags}</div>
      </div>
    </div>`;
  }).join('');
  const deliver = p.deliver.map((d,i) => {
    const icons = ['fa-brands fa-github','fa-brands fa-docker','fa-solid fa-play','fa-solid fa-pen-nib','fa-solid fa-file-lines'];
    return `<span><i class="${icons[i]}"></i> ${d}</span>`;
  }).join('');
  s.innerHTML = `
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${p.eyebrow}</span>
        <h2 class="section-title">${p.title}</h2>
        <p class="section-lead">${p.lead}</p>
      </div>
      <div class="poc-track">${rows}</div>
      <div class="deliverables reveal" style="justify-content:center;margin-top:34px">${deliver}</div>
    </div>`;
  return s;
}

/* ---- Market ---- */
function Market(t) {
  const s = el('section', 'section'); s.id = 'market';
  const m = t.market;
  const segs = m.segs.map((x,i) => `
    <div class="market-card reveal d${(i%4)+1}">
      <div class="seg"><i class="fas ${x[0]}"></i> ${x[1]}</div>
      <div class="tam gradient-text">${x[2]}</div>
      <div class="sam">${x[3]}</div>
    </div>`).join('');
  s.innerHTML = `
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${m.eyebrow}</span>
        <h2 class="section-title">${m.title}</h2>
        <p class="section-lead">${m.lead}</p>
      </div>
      <div class="market-grid">
        ${segs}
        <div class="market-total reveal">
          <div class="mt-l">${m.totalL}</div>
          <div class="mt-v gradient-text">${m.totalV}</div>
        </div>
      </div>
    </div>`;
  return s;
}

/* ---- Moat ---- */
function Moat(t) {
  const s = el('section', 'section'); s.id = 'moat';
  const m = t.moat;
  const items = m.items.map((x,i) => `
    <div class="moat-item reveal d${(i%4)+1}">
      <div class="moat-lvl">${x[0]}</div>
      <div><h4>${x[1]}</h4><p>${x[2]}</p></div>
    </div>`).join('');
  s.innerHTML = `
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${m.eyebrow}</span>
        <h2 class="section-title">${m.title}</h2>
        <p class="section-lead">${m.lead}</p>
      </div>
      <div class="moat-track">${items}</div>
    </div>`;
  return s;
}

/* ---- Roadmap ---- */
function Roadmap(t) {
  const s = el('section', 'section'); s.id = 'roadmap';
  const r = t.roadmap;
  const gates = r.gates.map((g,i) => {
    const li = g[3].map(x => `<li><i class="fas fa-check"></i> ${x}</li>`).join('');
    return `
    <div class="gate reveal d${(i%4)+1}">
      <div class="g-badge">${i+1}</div>
      <div class="g-when">${g[0]}</div>
      <div class="g-num">${g[1]}</div>
      <h4>${g[2]}</h4>
      <ul>${li}</ul>
    </div>`;
  }).join('');
  s.innerHTML = `
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${r.eyebrow}</span>
        <h2 class="section-title">${r.title}</h2>
        <p class="section-lead">${r.lead}</p>
      </div>
      <div class="gates">${gates}</div>
    </div>`;
  return s;
}

/* ---- Financials ---- */
function Financials(t) {
  const s = el('section', 'section'); s.id = 'financials';
  const f = t.fin;
  const rows = f.table.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td></tr>`).join('');
  const heads = f.cols.map(c => `<th>${c}</th>`).join('');
  // revenue heights: 80 / 400 / 1150 -> scaled
  s.innerHTML = `
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${f.eyebrow}</span>
        <h2 class="section-title">${f.title}</h2>
        <p class="section-lead">${f.lead}</p>
      </div>
      <div class="fin-wrap">
        <div class="fin-chart reveal">
          <h4 style="font-family:var(--font-mono);font-size:12px;letter-spacing:2px;color:var(--c1);text-transform:uppercase;margin-bottom:10px">${f.chartTitle}</h4>
          <div class="bar-chart" id="barChart">
            <div class="bar-col"><div class="bar" data-h="18"><span class="bar-val">€ 80k</span></div><div class="bar-label">Y1</div></div>
            <div class="bar-col"><div class="bar" data-h="52"><span class="bar-val">€ 400k</span></div><div class="bar-label">Y2</div></div>
            <div class="bar-col"><div class="bar" data-h="100"><span class="bar-val">€ 1.15M</span></div><div class="bar-label">Y3</div></div>
          </div>
        </div>
        <div class="reveal d2">
          <table class="fin-table">
            <thead><tr>${heads}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="fin-note"><i class="fas fa-circle-check"></i> ${f.note}</div>
        </div>
      </div>
    </div>`;
  return s;
}

/* ---- Funding ---- */
function Funding(t) {
  const s = el('section', 'section'); s.id = 'funding';
  const f = t.funding;
  const cards = f.cards.map((c,i) => {
    const li = c[3].map(x => `<li><i class="fas fa-angle-right"></i> ${x}</li>`).join('');
    return `
    <div class="fund-card ${c[4]?'hl':''} reveal d${i+1}">
      <div class="fund-phase">${c[0]}</div>
      <div class="fund-amt gradient-text">${c[1]}</div>
      <div class="fund-trigger">${c[2]}</div>
      <ul class="fund-sources">${li}</ul>
    </div>`;
  }).join('');
  s.innerHTML = `
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${f.eyebrow}</span>
        <h2 class="section-title">${f.title}</h2>
        <p class="section-lead">${f.lead}</p>
      </div>
      <div class="funding-grid">${cards}</div>
    </div>`;
  return s;
}

/* ---- Contact ---- */
function Contact(t) {
  const s = el('section', 'section'); s.id = 'contact';
  const c = t.contact; const fm = c.form;
  const opts = fm.interests.map(i => `<option>${i}</option>`).join('');
  s.innerHTML = `
    <div class="container contact-wrap">
      <div class="contact-info reveal">
        <span class="eyebrow">${c.eyebrow}</span>
        <h3>${c.title}</h3>
        <p>${c.lead}</p>
        <div class="contact-meta">
          <a href="mailto:founder@aetheris.ai"><i class="fas fa-envelope"></i> founder@aetheris.ai</a>
          <a href="https://www.aetheris.ai" target="_blank" rel="noopener"><i class="fas fa-globe"></i> www.aetheris.ai</a>
          <div><i class="fas fa-map-marker-alt"></i> Toscana, Italia</div>
          <div><i class="fas fa-shield-halved"></i> AI Act–ready · GDPR · NIS2</div>
        </div>
      </div>
      <form class="lead-form reveal d2" id="leadForm">
        <div class="form-row">
          <div class="field"><label>${fm.name}</label><input name="name" required /></div>
          <div class="field"><label>${fm.email}</label><input name="email" type="email" required /></div>
        </div>
        <div class="form-row">
          <div class="field"><label>${fm.org}</label><input name="org" /></div>
          <div class="field"><label>${fm.role}</label><input name="role" /></div>
        </div>
        <div class="field"><label>${fm.interest}</label><select name="interest">${opts}</select></div>
        <div class="field"><label>${fm.message}</label><textarea name="message"></textarea></div>
        <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center" id="submitBtn"><i class="fas fa-paper-plane"></i> ${fm.submit}</button>
        <div class="form-msg" id="formMsg"></div>
      </form>
    </div>`;
  return s;
}

/* ---- Footer ---- */
function Footer(t) {
  const f = el('footer');
  const l = t.footer.links;
  f.innerHTML = `
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="#top" class="brand"><span class="brand-mark">Æ</span> Aetheris <span class="gradient-text">AI</span></a>
          <p>${t.footer.tagline}</p>
        </div>
        <div class="footer-col">
          <h5>${t.footer.explore}</h5>
          <a href="#platform">${l.platform}</a>
          <a href="#poc">${l.poc}</a>
          <a href="#roadmap">${l.roadmap}</a>
          <a href="#funding">${l.funding}</a>
        </div>
        <div class="footer-col">
          <h5>${t.footer.docs}</h5>
          <a href="#contact">${l.masterplan}</a>
          <a href="#contact">${l.onepager}</a>
          <a href="#contact">${l.pitch}</a>
          <a href="#contact">${l.technical}</a>
        </div>
        <div class="footer-col">
          <h5>${t.footer.legal}</h5>
          <a href="#">${l.privacy}</a>
          <a href="#">${l.terms}</a>
          <a href="#">${l.confidential}</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>${t.footer.rights}</span>
        <div class="compliance-badges">
          <span>AI Act 2024/1689</span><span>GDPR</span><span>NIS2</span><span>ISO 27001 (roadmap)</span>
        </div>
      </div>
    </div>`;
  return f;
}

/* =========================================================================
   INTERACTIONS
   ========================================================================= */
function wireInteractions() {
  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.onclick = () => { window.__AETHERIS__.setLang(LANG === 'it' ? 'en' : 'it'); LANG = window.__AETHERIS__.lang; render(); window.scrollTo({top:0}); };

  const menuBtn = document.getElementById('menuBtn');
  const navlinks = document.getElementById('navlinks');
  if (menuBtn) menuBtn.onclick = () => navlinks.classList.toggle('open');
  navlinks && navlinks.querySelectorAll('a').forEach(a => a.onclick = () => navlinks.classList.remove('open'));

  // smooth anchor
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) { e.preventDefault(); window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' }); }
      }
    });
  });

  // form
  const form = document.getElementById('leadForm');
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const msg = document.getElementById('formMsg');
      const data = Object.fromEntries(new FormData(form).entries());
      const orig = btn.innerHTML;
      btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${T[LANG].contact.form.sending}`;
      btn.disabled = true;
      try {
        const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        const j = await res.json();
        msg.className = 'form-msg ' + (j.ok ? 'ok' : 'err');
        msg.textContent = j.ok ? j.message : (j.error || 'Error');
        if (j.ok) form.reset();
      } catch (err) {
        msg.className = 'form-msg err'; msg.textContent = 'Network error. / Errore di rete.';
      }
      btn.innerHTML = orig; btn.disabled = false;
    };
  }

  // navbar scroll state
  const nav = document.querySelector('.nav');
  const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
}

/* reveal on scroll + bar animation */
function observeReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        // animate bars when chart enters
        if (en.target.id === 'financials' || en.target.querySelector) {
          en.target.querySelectorAll && en.target.querySelectorAll('.bar[data-h]').forEach(b => {
            b.style.height = b.getAttribute('data-h') + '%';
          });
        }
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(r => io.observe(r));
  // also observe bar container
  const bc = document.getElementById('barChart');
  if (bc) {
    const io2 = new IntersectionObserver((e) => {
      e.forEach(x => { if (x.isIntersecting) { x.target.querySelectorAll('.bar[data-h]').forEach(b => b.style.height = b.getAttribute('data-h') + '%'); io2.unobserve(x.target); } });
    }, { threshold: 0.3 });
    io2.observe(bc);
  }
}

/* =========================================================================
   BACKGROUND PARTICLE NETWORK
   ========================================================================= */
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, pts;
  const COUNT = window.innerWidth < 700 ? 34 : 70;
  function resize() {
    w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight;
    pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35
    }));
  }
  resize();
  window.addEventListener('resize', resize);
  function loop() {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.strokeStyle = `rgba(79,123,255,${0.14 * (1 - d / 130)})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
    }
    for (const p of pts) {
      ctx.fillStyle = 'rgba(34,227,212,0.55)';
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(loop);
  }
  loop();
}

/* boot */
render();
initCanvas();
