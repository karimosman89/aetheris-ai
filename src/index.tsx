import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  RESEND_API_KEY?: string
  CONTACT_TO?: string
  DATAROOM_PASSCODE?: string
  HUBSPOT_TOKEN?: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())
// Note: /static/* and /docs/* are served natively by Cloudflare Pages
// (excluded from the Worker via dist/_routes.json), so no serveStatic here.

// ---------------------------------------------------------------------------
// Document catalogue — used by the gated investor data room
// ---------------------------------------------------------------------------
const DOCUMENTS = [
  { id: 'masterplan', file: 'Aetheris_AI_Master_Plan_v3.0_IT.pdf', pages: 31, size: '123 KB', type: 'PDF', tag: 'strategy',
    title: { it: 'Master Plan Strategico', en: 'Strategic Master Plan', fr: 'Master Plan Stratégique' } },
  { id: 'pitch', file: 'Aetheris_AI_Pitch_Deck_v3.0.pdf', pages: 12, size: '178 KB', type: 'PDF', tag: 'pitch',
    title: { it: 'Pitch Deck', en: 'Pitch Deck', fr: 'Pitch Deck' } },
  { id: 'onepager', file: 'Aetheris_AI_OnePager_v3.0.pdf', pages: 1, size: '36 KB', type: 'PDF', tag: 'summary',
    title: { it: 'One-Pager', en: 'One-Pager', fr: 'One-Pager' } },
  { id: 'technical', file: 'Aetheris_AI_Technical_Dossier_v3.0.pdf', pages: 15, size: '89 KB', type: 'PDF', tag: 'technical',
    title: { it: 'Technical Dossier', en: 'Technical Dossier', fr: 'Dossier Technique' } },
  { id: 'poc', file: 'Aetheris_AI_PoC_Specifications_v3.0.pdf', pages: 17, size: '109 KB', type: 'PDF', tag: 'technical',
    title: { it: 'PoC Specifications', en: 'PoC Specifications', fr: 'Spécifications PoC' } },
  { id: 'financial', file: 'Aetheris_AI_Financial_Model_v3.0.xlsx', pages: 10, size: '25 KB', type: 'XLSX', tag: 'finance',
    title: { it: 'Financial Model', en: 'Financial Model', fr: 'Modèle Financier' } },
]

// ---------------------------------------------------------------------------
// Contact / lead capture — forwards to Resend (email) and optionally HubSpot CRM
// ---------------------------------------------------------------------------
app.post('/api/contact', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const { name, email, org, role, interest, message, lang } = body || {}
  if (!email || !name) {
    return c.json({ ok: false, error: 'Name and email are required.' }, 400)
  }

  const env = c.env
  const results: Record<string, string> = {}

  // --- Resend email ---
  if (env?.RESEND_API_KEY) {
    try {
      const to = env.CONTACT_TO || 'founder@aetheris.ai'
      const html = `
        <h2>New Aetheris AI inquiry</h2>
        <ul>
          <li><b>Name:</b> ${escapeHtml(name)}</li>
          <li><b>Email:</b> ${escapeHtml(email)}</li>
          <li><b>Organization:</b> ${escapeHtml(org || '-')}</li>
          <li><b>Role:</b> ${escapeHtml(role || '-')}</li>
          <li><b>Interest:</b> ${escapeHtml(interest || '-')}</li>
          <li><b>Language:</b> ${escapeHtml(lang || '-')}</li>
        </ul>
        <p><b>Message:</b><br>${escapeHtml(message || '-').replace(/\n/g, '<br>')}</p>`
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Aetheris AI <onboarding@resend.dev>',
          to: [to],
          reply_to: email,
          subject: `Aetheris AI — inquiry from ${name}${org ? ' (' + org + ')' : ''}`,
          html,
        }),
      })
      results.email = r.ok ? 'sent' : `failed(${r.status})`
    } catch (e) {
      results.email = 'error'
    }
  } else {
    results.email = 'skipped(no_key)'
  }

  // --- HubSpot CRM contact upsert (optional) ---
  if (env?.HUBSPOT_TOKEN) {
    try {
      const [firstname, ...rest] = String(name).split(' ')
      const r = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.HUBSPOT_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          properties: {
            email, firstname, lastname: rest.join(' '),
            company: org || '', jobtitle: role || '',
            message: `[${interest || 'inquiry'}] ${message || ''}`,
          },
        }),
      })
      results.crm = r.ok ? 'created' : `failed(${r.status})`
    } catch (e) {
      results.crm = 'error'
    }
  } else {
    results.crm = 'skipped(no_token)'
  }

  return c.json({
    ok: true,
    delivery: results,
    message:
      lang === 'fr'
        ? 'Merci — nous vous recontacterons sous 48h.'
        : lang === 'en'
        ? 'Thank you — we will get back to you within 48h.'
        : 'Grazie — ti ricontatteremo entro 48h.',
  })
})

// ---------------------------------------------------------------------------
// Data room access — passcode gate + request-access lead
// ---------------------------------------------------------------------------
app.post('/api/dataroom/unlock', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const { passcode } = body || {}
  const expected = c.env?.DATAROOM_PASSCODE || 'AETHERIS2026'
  if (passcode && String(passcode).trim() === expected) {
    return c.json({ ok: true, documents: DOCUMENTS })
  }
  return c.json({ ok: false, error: 'invalid_passcode' }, 401)
})

// Request access (when a visitor doesn't have a passcode) — notifies founder via Resend
app.post('/api/dataroom/request', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const { name, email, org, lang } = body || {}
  if (!email || !name) return c.json({ ok: false, error: 'Name and email are required.' }, 400)
  const env = c.env
  if (env?.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Aetheris AI <onboarding@resend.dev>',
          to: [env.CONTACT_TO || 'founder@aetheris.ai'],
          reply_to: email,
          subject: `Aetheris AI — data room access request from ${name}`,
          html: `<h2>Data room access requested</h2><ul><li><b>Name:</b> ${escapeHtml(name)}</li><li><b>Email:</b> ${escapeHtml(email)}</li><li><b>Organization:</b> ${escapeHtml(org || '-')}</li></ul>`,
        }),
      })
    } catch (e) {}
  }
  return c.json({
    ok: true,
    message:
      lang === 'fr'
        ? 'Demande reçue — nous vous enverrons un code d’accès sous 24h.'
        : lang === 'en'
        ? 'Request received — we will send you an access code within 24h.'
        : 'Richiesta ricevuta — ti invieremo un codice di accesso entro 24h.',
  })
})

app.get('/api/health', (c) => c.json({ status: 'ok', service: 'aetheris-ai-web', version: '3.1' }))

function escapeHtml(s: string) {
  return String(s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] as string))
}

app.get('/', (c) => c.html(<Page />))

function Page() {
  return (
    <html lang="it">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Aetheris AI · Applied AI Infrastructure for European Industry</title>
        <meta name="description" content="Aetheris AI — Piattaforma europea di Applied AI (GenAI, Computer Vision, Predictive AI, Agents) per Energy e Manufacturing. AI Act–ready by design. Startup Innovativa, Toscana, Italia." />
        <meta name="theme-color" content="#050914" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%2322e3d4'/%3E%3Cstop offset='0.5' stop-color='%234f7bff'/%3E%3Cstop offset='1' stop-color='%23a855f7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='24' fill='url(%23g)'/%3E%3Ctext x='50' y='68' font-family='Georgia,serif' font-size='58' font-weight='700' fill='%23041019' text-anchor='middle'%3E%C3%86%3C/text%3E%3C/svg%3E" />
        <meta property="og:title" content="Aetheris AI · Applied AI Infrastructure for European Industry" />
        <meta property="og:description" content="GenAI + Computer Vision + Predictive AI + Agents per Energy e Manufacturing. AI Act–ready by design." />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script type="importmap" dangerouslySetInnerHTML={{ __html: JSON.stringify({ imports: { three: 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js' } }) }}></script>
      </head>
      <body>
        <div id="cursor-glow" aria-hidden="true"></div>
        <div id="app-root"></div>
        <div id="hero-3d" aria-hidden="true"></div>
        <canvas id="bg-canvas" aria-hidden="true"></canvas>
        <div id="dataroom-modal"></div>
        <script src="/static/three-hero.js" type="module"></script>
        <script src="/static/app.js" type="module"></script>
      </body>
    </html>
  )
}

export default app
