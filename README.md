# Aetheris AI — Investor & Company Website (v3.2)

> **Applied AI Infrastructure for European Industry** — GenAI · Computer Vision · Predictive AI · Agents for Energy & Manufacturing. AI Act–ready by design.

## Project Overview
- **Name**: Aetheris AI — Applied AI Infrastructure for European Industry
- **Goal**: A professional, cutting-edge 2026 website to attract financing (Smart&Start, accelerators, angels, VC, EIC), sponsors and industrial collaborations — and to differentiate Aetheris AI in the Italian / French / broader European market.
- **Positioning**: *Grounded & Proven* — founder production track record + 3 public PoCs + AI Act–ready by design.

## What's new in v3.2 (this release)
- **✅ Vercel deployment fixed.** The previous `404: NOT_FOUND` was caused by a **Cloudflare-Pages-only build** (it emitted `dist/_worker.js` + `_routes.json`, which Vercel does not serve — there was no `index.html`). The build is now **Vercel-native**: it emits a real static `dist/index.html` + assets served by Vercel's CDN, with the Hono API running as a serverless function under `/api/*`.
- **🌍 SEO + AI-discoverability**: canonical URL, full Open Graph / Twitter cards, a generated `og-image.svg`, `robots.txt`, `sitemap.xml`, and **JSON-LD `Organization` structured data** (so search engines and 2026 AI answer-engines understand the company).
- **📈 "Why now" section**: a trilingual 2026-trends band (AI Act going live, Agentic AI in production, Edge & Sovereign AI, EU re-industrialization) framing the investment thesis.
- **🤝 Trust / ecosystem band**: reference programs & standards the company aligns with (EU AI Act, Smart&Start, EIC, GDPR, Startup Innovativa, NVIDIA Inception).
- **♿ Accessibility**: skip-link, keyboard `:focus-visible` rings, and a `<noscript>` fallback.
- **🔑 Env fix**: secrets now resolve from **both** Cloudflare bindings *and* `process.env`, so the contact form and data room work correctly on Vercel.
- **🧹 Leaner stack**: dropped Vite + Wrangler build chain; the build is a small dependency-free Node script.

## Architecture
This is a **static shell + client-rendered app** with a thin serverless API:

```
dist/index.html        ← static shell (SEO tags, JSON-LD)   → served by Vercel CDN
dist/static/*          ← style.css, app.js, three-hero.js, og-image.svg
dist/docs/*            ← investor PDFs / XLSX
api/index.ts           ← Hono app → Vercel Node serverless function (/api/*)
src/shell.mjs          ← single source of truth for the HTML shell (build + API share it)
src/index.ts           ← Hono routes (contact, data room, health)
```

## Functional Entry URIs
- `GET /` — Full single-page website (static shell + client-rendered content).
- `GET /api/health` — Health check → `{ status, service, version }`.
- `POST /api/contact` — Lead capture. Body: `{ name*, email*, org, role, interest, message, lang }`. Sends via Resend + upserts HubSpot; returns `{ ok, delivery, message }` (localized IT/EN/FR).
- `POST /api/dataroom/unlock` — Body: `{ passcode }` → `{ ok:true, documents:[...] }` or `401 invalid_passcode` (`503 data_room_not_configured` if no passcode is set).
- `POST /api/dataroom/request` — Request access. Body: `{ name*, email*, org, lang }`. Emails the founder via Resend.
- `GET /docs/<file>` — Confidential investor documents (served statically).
- `GET /static/*` — Static assets. `GET /robots.txt`, `GET /sitemap.xml`.

## Secrets / Environment Variables
Set in **Vercel → Project Settings → Environment Variables** (or a local `.env` for dev):

| Variable | Purpose | Behavior if unset |
|---|---|---|
| `RESEND_API_KEY` | Transactional email (contact + data-room requests) | Email step returns `skipped(no_key)` |
| `CONTACT_TO` | Recipient address for leads | Falls back to `founder@aetheris.ai` |
| `DATAROOM_PASSCODE` | Investor data-room passcode | Data room stays locked (`503`); visitors use "Request access" |
| `HUBSPOT_TOKEN` | HubSpot private-app token for CRM upsert | CRM step returns `skipped(no_token)` |

## Deployment — Vercel (recommended)
1. Import the GitHub repo into Vercel. Framework preset: **Other**. Root directory: `/`.
2. Vercel auto-detects `vercel.json`:
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
   - **API**: `api/index.ts` runs as a Node serverless function.
3. Add the environment variables above (at least `DATAROOM_PASSCODE` for the data room, and `RESEND_API_KEY` for email).
4. Deploy. The 3D hero, animated background, trilingual toggle, "Why now" band and data room all work out of the box.

## Local development
```bash
npm install
npm run build      # emits dist/ (index.html + static + docs + og-image + robots + sitemap)
npm run dev        # builds, then serves the same topology as Vercel on http://localhost:3000
```
To test integrations locally: `DATAROOM_PASSCODE=AETHERIS2026 RESEND_API_KEY=... npm run dev`.

## Tech Stack
- **API**: Hono + TypeScript on `@hono/node-server/vercel` (Vercel Node function).
- **Frontend**: Vanilla JS single-file renderer, Three.js (CDN importmap), custom CSS design system, Google Fonts, Font Awesome, HTML5 Canvas.
- **Integrations**: Resend (email), HubSpot CRM (both optional, graceful-skip).
- **Build**: dependency-free Node script (`scripts/build.mjs`); local dev via `tsx`.

## Content (from the investor documents)
Hero + live "AETHERIS OS" orchestration card · Verified production track record (100k+ users/day, 99.9% uptime, €2M+ impact, 5+ yrs) · Platform (Knowledge / Vision / Predict) · AI Act–ready section (5 EU regulations + governance pillars) · 3 public PoCs · Market opportunity (TAM €119B / SAM €26B) · 5-level moat · Roadmap (5 measurable Gates) · Financial model · 3-phase funding strategy · Gated Investor Data Room · Contact/lead capture.

## Recommended next steps
- Add a custom domain (e.g. `aetheris.ai`) + Vercel Analytics.
- Add per-investor data-room passcodes / expiring links.
- Optionally log leads to a database for an audit trail.

_Last updated: 2026-09-03_
