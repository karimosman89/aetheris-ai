/**
 * Aetheris AI — HTML shell (single source of truth).
 *
 * The site is a static shell + client-rendered app (see public/static/app.js).
 * This shell is emitted at build time to dist/index.html (served by Vercel's
 * CDN) AND used by the Hono API as a fallback renderer, so markup, SEO tags
 * and structured data never drift between the two.
 *
 * Written as plain .mjs so both the Node build script and the TypeScript
 * serverless function can import it without a transpile step.
 */

export const SITE = {
  name: 'Aetheris AI',
  url: 'https://aetheris-ai.vercel.app',
  title: 'Aetheris AI · Applied AI Infrastructure for European Industry',
  description:
    'Aetheris AI — European Applied AI platform (GenAI, Computer Vision, Predictive AI, Agents) for Energy & Manufacturing. AI Act–ready by design. Innovative Startup, Tuscany, Italy.',
  themeColor: '#050914',
}

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%2322e3d4'/%3E%3Cstop offset='0.5' stop-color='%234f7bff'/%3E%3Cstop offset='1' stop-color='%23a855f7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='24' fill='url(%23g)'/%3E%3Ctext x='50' y='68' font-family='Georgia,serif' font-size='58' font-weight='700' fill='%23041019' text-anchor='middle'%3E%C3%86%3C/text%3E%3C/svg%3E"

// JSON-LD structured data — improves how investors, search engines and AI
// answer-engines (a 2026 discovery channel) understand the company.
const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Aetheris AI',
  legalName: 'Aetheris AI S.r.l.',
  url: SITE.url,
  description: SITE.description,
  foundingDate: '2026',
  areaServed: 'EU',
  slogan: 'Applied AI Infrastructure for European Industry. AI Act–ready by design.',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Tuscany',
    addressCountry: 'IT',
  },
  knowsAbout: [
    'Generative AI',
    'Retrieval-Augmented Generation',
    'AI Agents',
    'Computer Vision',
    'Predictive Maintenance',
    'EU AI Act compliance',
    'Edge AI',
  ],
  sameAs: ['https://github.com/karimosman89'],
}

export function renderShell() {
  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${SITE.title}</title>
  <meta name="description" content="${SITE.description}" />
  <meta name="theme-color" content="${SITE.themeColor}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${SITE.url}/" />
  <link rel="icon" type="image/svg+xml" href="${FAVICON}" />

  <!-- Open Graph / social preview -->
  <meta property="og:site_name" content="${SITE.name}" />
  <meta property="og:title" content="${SITE.title}" />
  <meta property="og:description" content="GenAI + Computer Vision + Predictive AI + Agents for Energy & Manufacturing. AI Act–ready by design." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${SITE.url}/" />
  <meta property="og:image" content="${SITE.url}/static/og-image.svg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${SITE.title}" />
  <meta name="twitter:description" content="European Applied AI for Energy & Manufacturing. AI Act–ready by design." />
  <meta name="twitter:image" content="${SITE.url}/static/og-image.svg" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css" rel="stylesheet" />
  <link href="/static/style.css" rel="stylesheet" />
  <script type="application/ld+json">${JSON.stringify(STRUCTURED_DATA)}</script>
  <script type="importmap">${JSON.stringify({ imports: { three: 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js' } })}</script>
</head>
<body>
  <a href="#top" class="skip-link">Skip to content</a>
  <div id="cursor-glow" aria-hidden="true"></div>
  <div id="app-root">
    <noscript>
      <div style="max-width:720px;margin:80px auto;padding:0 24px;font-family:system-ui,sans-serif;color:#e6ecff;">
        <h1>Aetheris AI</h1>
        <p>Applied AI Infrastructure for European Industry — GenAI, Computer Vision, Predictive AI and Agents for Energy &amp; Manufacturing. AI Act–ready by design.</p>
        <p>This site needs JavaScript enabled. Contact: <a href="mailto:founder@aetheris.ai">founder@aetheris.ai</a></p>
      </div>
    </noscript>
  </div>
  <div id="hero-3d" aria-hidden="true"></div>
  <canvas id="bg-canvas" aria-hidden="true"></canvas>
  <div id="dataroom-modal"></div>
  <script src="/static/three-hero.js" type="module"></script>
  <script src="/static/app.js" type="module"></script>
</body>
</html>`
}
