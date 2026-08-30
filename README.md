# Aetheris AI — Investor & Company Website (v3.0)

## Project Overview
- **Name**: Aetheris AI — Applied AI Infrastructure for European Industry
- **Goal**: A professional, cutting-edge 2026 website to attract financing (Smart&Start, accelerators, angels, VC, EIC) and to differentiate Aetheris AI from competitors in the Italian / French / broader European market.
- **Positioning**: Grounded & Proven — founder production track record + 3 public PoCs + AI Act–ready by design.

## Key Features
- **Bilingual IT / EN** — one-click language toggle (default Italian, persisted in localStorage).
- **2026 aesthetic** — deep-space dark theme, aurora gradients, glassmorphism, animated particle-network background, kinetic typography, scroll reveals.
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
  - Contact/lead capture form
- **Responsive** across desktop, tablet and mobile.

## Functional Entry URIs
- `GET /` — Full single-page website (server-rendered shell + client-rendered content).
- `GET /api/health` — Service health check → `{ status, service, version }`.
- `POST /api/contact` — Lead capture. Body: `{ name*, email*, org, role, interest, message }`. Returns `{ ok, received, message }`. (*required)
- `GET /static/style.css`, `GET /static/app.js` — Static assets.

## Data Architecture
- **Data models**: Lead/contact submission (name, email, org, role, interest, message). Site content is defined as a bilingual dictionary in `public/static/app.js`.
- **Storage**: None required — content is static; the contact endpoint currently echoes the submission (production would forward it to a mail/CRM API such as Resend/SendGrid/HubSpot via a Cloudflare secret). No PII is persisted.
- **Data flow**: Browser → Hono API (`/api/contact`) → (future) email/CRM webhook.

## User Guide
1. Open the site — the hero, animated background and orchestration card load immediately.
2. Use the top-right **IT / EN** toggle to switch language.
3. Navigate via the sticky nav (Platform, Proof of Capability, Market, Moat, Roadmap, Funding) or scroll.
4. Use the **Invest with us** button or the contact form to send an inquiry.

## Tech Stack
- **Backend**: Hono (Cloudflare Pages/Workers), TypeScript, JSX server-render.
- **Frontend**: Vanilla JS single-file renderer, custom CSS design system, Google Fonts (Space Grotesk / Inter / JetBrains Mono), Font Awesome, HTML5 Canvas.
- **Build/Dev**: Vite + `@hono/vite-build`, Wrangler, PM2.

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: ✅ Active (local sandbox via PM2 + wrangler pages dev on port 3000)
- **Local dev**: `npm run build && pm2 start ecosystem.config.cjs`
- **Not yet deployed to production** (Cloudflare Pages) — awaiting user confirmation of deployment route.
- **Last Updated**: 2026-08-30

## Recommended Next Steps
- Deploy to Cloudflare Pages (BYOK or Genspark-hosted).
- Wire `/api/contact` to a real email/CRM provider via a Cloudflare secret.
- Add a gated "data room" for the Master Plan / Pitch Deck / Technical Dossier PDFs.
- Add a custom domain (e.g. aetheris.ai) and analytics.
- Optional: French (FR) locale for the French market.
