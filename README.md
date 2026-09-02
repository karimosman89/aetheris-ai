# Aetheris AI — Investor & Company Website (v3.1)

## Project Overview
- **Name**: Aetheris AI — Applied AI Infrastructure for European Industry
- **Goal**: A professional, cutting-edge 2026 website to attract financing (Smart&Start, accelerators, angels, VC, EIC) and to differentiate Aetheris AI from competitors in the Italian / French / broader European market.
- **Positioning**: Grounded & Proven — founder production track record + 3 public PoCs + AI Act–ready by design.

## Key Features
- **Trilingual IT / EN / FR** — one-click language toggle (3-way pill, default Italian, persisted in localStorage). FR added for the French market.
- **3D animated hero** — Three.js interactive layered-icosahedron "AI core" + orbiting particle field, pointer parallax, breathing animation, `prefers-reduced-motion` aware, pauses when off-screen.
- **2026 micro-interactions** — magnetic buttons, 3D tilt cards (perspective + dynamic shine), smooth-follow cursor glow, aurora gradients, glassmorphism, animated particle-network canvas background, scroll reveals, kinetic typography.
- **Gated Investor Data Room** — passcode-protected room serving the confidential PDF/XLSX documents (Master Plan, Pitch Deck, One-Pager, Technical Dossier, PoC Report, Financial Model). Includes a "request access" flow that emails the founder.
- **Real email / CRM integration** — contact form and data-room requests send transactional email via **Resend** and upsert leads into **HubSpot CRM** (graceful skip when keys are absent).
- **Full narrative from the documents**:
  - Hero + live "AETHERIS OS" orchestration card (Knowledge / Vision / Predict / Compliance / Edge)
  - Verified production track record (100k+ users/day, 99.9% uptime, €2M+ impact, 5+ years)
  - Platform: 3 applications (Aetheris Knowledge, Vision, Predict)
  - AI Act–ready section (5 EU regulations + governance pillars)
  - Proof of Capability: 3 public PoCs with tech stacks & deliverables
  - Market opportunity (EU 2030 TAM/SAM by segment, total TAM €119B / SAM €26B)
  - 5-level Moat
  - Roadmap: 5 measurable Gates
  - Financial Model (conservative revenue chart + KPI table)
  - Funding Strategy (3 milestone-based phases)
  - Investor Data Room + Contact/lead capture form
- **Responsive** across desktop, tablet and mobile.

## Functional Entry URIs
- `GET /` — Full single-page website (server-rendered shell + client-rendered content).
- `GET /api/health` — Service health check → `{ status, service, version: "3.1" }`.
- `POST /api/contact` — Lead capture. Body: `{ name*, email*, org, role, interest, message, lang }`. Sends via Resend + upserts HubSpot; returns `{ ok, delivery: { email, crm }, message }` (localized IT/EN/FR). (*required)
- `POST /api/dataroom/unlock` — Body: `{ passcode }`. Returns `{ ok:true, documents:[...] }` or `401 { ok:false, error:"invalid_passcode" }`.
- `POST /api/dataroom/request` — Request data-room access. Body: `{ name*, email*, org, lang }`. Emails the founder via Resend; returns `{ ok, message }`.
- `GET /docs/<file>` — Confidential investor documents (PDF / XLSX), served natively by Cloudflare Pages.
- `GET /static/style.css`, `GET /static/app.js`, `GET /static/three-hero.js` — Static assets.

## Data Architecture
- **Data models**:
  - Lead/contact submission (name, email, org, role, interest, message, lang).
  - Data-room access request (name, email, org, lang).
  - `DOCUMENTS` catalogue (id, file, pages, size, type, tag, trilingual title) defined in `src/index.tsx`.
  - Site content defined as a trilingual dictionary (`T.it` / `T.en` / `T.fr`) in `public/static/app.js`.
- **Storage**: No database — content is static and no PII is persisted. Leads are forwarded to Resend (email) and HubSpot (CRM) at request time. Documents are static files under `public/docs/`.
- **Data flow**: Browser → Hono API → Resend / HubSpot REST APIs. Data room: Browser → `/api/dataroom/unlock` (passcode check) → document list → native `/docs/*` download.

## Secrets / Environment Variables
Configured via `.dev.vars` (local, gitignored) or `wrangler pages secret put <NAME>` (production):
| Variable | Purpose | Behavior if unset |
|---|---|---|
| `RESEND_API_KEY` | Transactional email (contact + data-room requests) | Email step returns `skipped(no_key)` |
| `CONTACT_TO` | Recipient address for leads | Falls back to `founder@aetheris.ai` |
| `DATAROOM_PASSCODE` | Investor data-room passcode | Falls back to `AETHERIS2026` |
| `HUBSPOT_TOKEN` | HubSpot private-app token for contact upsert | CRM step returns `skipped(no_token)` |

**Production setup:**
```bash
npx wrangler pages secret put RESEND_API_KEY --project-name <project>
npx wrangler pages secret put CONTACT_TO --project-name <project>
npx wrangler pages secret put DATAROOM_PASSCODE --project-name <project>
npx wrangler pages secret put HUBSPOT_TOKEN --project-name <project>
```

## User Guide
1. Open the site — the 3D hero, animated background and orchestration card load immediately.
2. Use the top-right **IT / EN / FR** pill toggle to switch language.
3. Navigate via the sticky nav (Platform, Proof of Capability, Market, Moat, Roadmap, Funding, Data Room) or scroll.
4. **Investor Data Room**: click "Open Data Room", enter the passcode (`AETHERIS2026` by default) to view/download the confidential documents, or use "Request access" if you don't have a code.
5. Use the **Invest with us** button or the contact form to send an inquiry.

## Tech Stack
- **Backend**: Hono (Cloudflare Pages/Workers), TypeScript, JSX server-render.
- **Frontend**: Vanilla JS single-file renderer, Three.js (CDN importmap), custom CSS design system, Google Fonts (Space Grotesk / Inter / JetBrains Mono), Font Awesome, HTML5 Canvas.
- **Integrations**: Resend (email), HubSpot CRM.
- **Build/Dev**: Vite + `@hono/vite-build`, custom `scripts/postbuild.mjs` (writes `_routes.json` to serve `/static/*` & `/docs/*` natively), Wrangler, PM2.

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: ✅ Active (local sandbox via PM2 + wrangler pages dev on port 3000)
- **Local dev**: `npm run build && pm2 start ecosystem.config.cjs`
- **Not yet deployed to production** (Cloudflare Pages) — awaiting user confirmation of deployment route.
- **Last Updated**: 2026-09-01

## Recommended Next Steps
- Deploy to Cloudflare Pages (BYOK or Genspark-hosted) and set the four secrets above.
- Add a custom domain (e.g. aetheris.ai) and analytics.
- Optionally migrate lead/data-room-request logging to Cloudflare D1 for an audit trail.
- Add per-investor data-room passcodes / expiring links for finer access control.
