/**
 * Aetheris AI — build step (Vercel-native, no bundler required).
 *
 * The site is a static shell + client-rendered app, so the "build" is:
 *   1. Render dist/index.html from the shared shell (src/shell.ts).
 *   2. Copy public/static and public/docs into dist/.
 *   3. Generate a social OG image + robots.txt + sitemap.xml.
 *
 * The dynamic /api/* routes run as a Vercel serverless function
 * (api/index.ts) and are NOT part of this static output.
 */
import { cp, mkdir, writeFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderShell, SITE } from '../src/shell.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const dist = resolve(root, 'dist')

async function main() {
  // Fresh dist
  if (existsSync(dist)) await rm(dist, { recursive: true, force: true })
  await mkdir(dist, { recursive: true })

  // 1. index.html
  await writeFile(resolve(dist, 'index.html'), renderShell(), 'utf8')

  // 2. Assets
  await cp(resolve(root, 'public', 'static'), resolve(dist, 'static'), { recursive: true })
  await cp(resolve(root, 'public', 'docs'), resolve(dist, 'docs'), { recursive: true })

  // 3. OG image (SVG — crisp, lightweight, no external deps)
  await writeFile(resolve(dist, 'static', 'og-image.svg'), ogImage(), 'utf8')

  // 4. robots.txt + sitemap.xml
  await writeFile(
    resolve(dist, 'robots.txt'),
    `User-agent: *\nAllow: /\nDisallow: /docs/\nSitemap: ${SITE.url}/sitemap.xml\n`,
    'utf8'
  )
  const today = new Date().toISOString().slice(0, 10)
  await writeFile(
    resolve(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE.url}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>\n</urlset>\n`,
    'utf8'
  )

  console.log('[build] dist/index.html + static + docs + og-image + robots + sitemap ✓')
}

function ogImage() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#050914"/><stop offset="1" stop-color="#0a1430"/>
    </linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#22e3d4"/><stop offset="0.5" stop-color="#4f7bff"/><stop offset="1" stop-color="#a855f7"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.28" r="0.6">
      <stop offset="0" stop-color="#4f7bff" stop-opacity="0.35"/><stop offset="1" stop-color="#4f7bff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(90,150)">
    <rect width="96" height="96" rx="24" fill="url(#brand)"/>
    <text x="48" y="66" font-family="Georgia,serif" font-size="58" font-weight="700" fill="#041019" text-anchor="middle">&#198;</text>
  </g>
  <text x="210" y="218" font-family="'Space Grotesk',Arial,sans-serif" font-size="60" font-weight="700" fill="#eef3ff">Aetheris <tspan fill="url(#brand)">AI</tspan></text>
  <text x="92" y="330" font-family="'Space Grotesk',Arial,sans-serif" font-size="52" font-weight="700" fill="#eef3ff">European industrial AI, for real.</text>
  <text x="92" y="398" font-family="Arial,sans-serif" font-size="28" fill="#9fb0d6">GenAI · Computer Vision · Predictive AI · Agents</text>
  <text x="92" y="440" font-family="Arial,sans-serif" font-size="28" fill="#9fb0d6">for Energy &amp; Manufacturing</text>
  <g font-family="Arial,sans-serif" font-size="24" fill="#22e3d4">
    <rect x="92" y="500" width="360" height="56" rx="28" fill="none" stroke="#22e3d4" stroke-opacity="0.4"/>
    <text x="120" y="536">AI Act&#8211;ready by design (EU 2024/1689)</text>
  </g>
</svg>`
}

main().catch((e) => {
  console.error('[build] failed:', e)
  process.exit(1)
})
