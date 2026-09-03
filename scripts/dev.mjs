/**
 * Local dev server — mirrors the Vercel production topology:
 *   - /api/*                    → Hono app (serverless function equivalent)
 *   - /static/*, /docs/*, /     → static files from dist/ (built first)
 *
 * Run `npm run build` first, then `npm run dev`.
 */
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import app from '../src/index.ts'

const PORT = Number(process.env.PORT || 3000)
const root = new Hono()

// API first
root.route('/', app)

// Static assets + SPA shell fallback from dist/
root.use('/static/*', serveStatic({ root: './dist' }))
root.use('/docs/*', serveStatic({ root: './dist' }))
root.use('/robots.txt', serveStatic({ root: './dist' }))
root.use('/sitemap.xml', serveStatic({ root: './dist' }))
root.get('*', serveStatic({ path: './dist/index.html' }))

serve({ fetch: root.fetch, port: PORT }, (info) => {
  console.log(`[dev] Aetheris AI running → http://localhost:${info.port}`)
})
