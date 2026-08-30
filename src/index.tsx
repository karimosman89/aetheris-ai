import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './public' }))

// ---- Lightweight contact/interest capture (in-memory demo, no persistence needed) ----
app.post('/api/contact', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const { name, email, org, role, interest, message } = body || {}
  if (!email || !name) {
    return c.json({ ok: false, error: 'Name and email are required.' }, 400)
  }
  // In production this would hit a mail/CRM API (Resend/SendGrid/HubSpot) via a secret token.
  return c.json({
    ok: true,
    received: { name, email, org, role, interest, message },
    message: 'Grazie — ti ricontatteremo entro 48h. / Thank you — we will get back to you within 48h.'
  })
})

app.get('/api/health', (c) => c.json({ status: 'ok', service: 'aetheris-ai-web', version: '3.0' }))

app.get('/', (c) => {
  return c.html(<Page />)
})

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
      </head>
      <body>
        <div id="app-root"></div>
        <canvas id="bg-canvas" aria-hidden="true"></canvas>
        <script src="/static/app.js" type="module"></script>
      </body>
    </html>
  )
}

export default app
