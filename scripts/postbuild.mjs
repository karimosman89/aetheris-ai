/**
 * Post-build: write dist/_routes.json so Cloudflare Pages serves
 * /static/* and /docs/* as native static assets (bypassing the Worker),
 * while everything else is handled by the Hono Worker.
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const routes = {
  version: 1,
  include: ['/*'],
  exclude: ['/static/*', '/docs/*', '/favicon.ico'],
}

const out = resolve(process.cwd(), 'dist', '_routes.json')
writeFileSync(out, JSON.stringify(routes))
console.log('[postbuild] wrote dist/_routes.json ->', JSON.stringify(routes))
