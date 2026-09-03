import { Hono } from 'hono'
import { cors } from 'hono/cors'
// @ts-ignore - plain .mjs shell shared with the build script
import { renderShell } from './shell.mjs'

type Bindings = {
  RESEND_API_KEY?: string
  CONTACT_TO?: string
  DATAROOM_PASSCODE?: string
  HUBSPOT_TOKEN?: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())
// Static /static/* and /docs/* are served by the hosting platform (Vercel CDN
// or the local dev server), so no serveStatic is needed inside this app.

// Resolve secrets from Cloudflare-style bindings (c.env) OR the Node/Vercel
// process.env, so the same code runs unchanged on both platforms.
function envOf(c: { env?: Bindings }): Bindings {
  const pe = (typeof process !== 'undefined' && process?.env) ? (process.env as Bindings) : {}
  return { ...pe, ...(c.env || {}) }
}

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

  const env = envOf(c)
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
  const expected = envOf(c).DATAROOM_PASSCODE
  if (!expected) {
    return c.json({ ok: false, error: 'data_room_not_configured' }, 503)
  }
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
  const env = envOf(c)
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

app.get('/api/health', (c) => c.json({ status: 'ok', service: 'aetheris-ai-web', version: '3.2' }))

function escapeHtml(s: string) {
  return String(s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] as string))
}

// Root + SPA fallback: serve the shared static shell (same HTML that the
// build emits to dist/index.html). On Vercel the CDN serves the static file
// first; this handler is the serverless fallback.
app.get('/', (c) => c.html(renderShell()))

export default app
