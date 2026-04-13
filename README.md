# לב ים (Lev Yam) — B2B Landing Page

A standalone B2B landing page for Lev Yam, selling company offsite days to businesses.  
Built during a 4-hour hackathon on **April 14, 2026**, using [Claude Code](https://code.claude.com/) as the primary development tool.

---

## Goal

A live landing page on levyam.com with a successful **10 ₪ test payment end-to-end**:  
Page → Grow Payment Page → Webhook → Cloudflare Worker → Supabase + Dynatrace alert.

---


## Team

| Name | Role | What they do |
|------|------|-------------|
| **Or** | Team Lead & Project Owner | Environment setup, Grow/Cloudflare/Supabase accounts, content prep, pre-hackathon end-to-end test. Drives the day. |
| **Moran** | Marketing & Content Creator | Writes all page copy, selects images, defines brand tone. Delivers final content to the repo before the hackathon. Reviews the live page on hackathon day. |
| **Yair** | Software Engineer | Joins on hackathon day. Drives the technical build — page, Worker, Supabase wiring, Dynatrace, deployment. No pre-hackathon tasks. |

---

## Architecture

```
User clicks "Buy" on levyam.com
        ↓
Grow hosted payment page (redirect — pre-built static page per package)
        ↓
Payment succeeds → Grow POSTs webhook to Cloudflare Worker
        ↓
Cloudflare Worker:
  1. Verifies webhookKey
  2. Writes purchase row to Supabase (name, amount, package, date)
  3. Fires Dynatrace custom event (alert)
        ↓
Landing page polls Supabase every 5s
  → Updates live purchase feed
  → Updates progress bar (spots filled)
```

### Why this architecture

- **No backend to manage** — Cloudflare Worker is serverless, deploys in minutes, free tier
- **Real database from day one** — Supabase (Postgres) scales post-hackathon into a full CRM/booking system with zero migration
- **No approveTransaction needed** — standalone Grow static pages don't require it
- **No Make/Zapier** — webhook fires directly to the Worker, no middleman
- **WordPress plugin not used** — Grow's WooCommerce plugin requires a 5–7 day review process, incompatible with a hackathon. Post-hackathon option for the main WordPress site.

---

## Tech Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| **Page** | Static HTML/CSS/JS | Lightweight, no framework, fast to deploy |
| **Payments** | [Grow Payments](https://grow.co.il/) — static payment page | Pre-built hosted page per package, redirect integration |
| **Webhook receiver** | [Cloudflare Worker](https://workers.cloudflare.com/) | Receives Grow webhook, verifies, routes to Supabase + Dynatrace |
| **Database** | [Supabase](https://supabase.com/) (Postgres) | Stores purchases. Powers live feed + progress bar. Future CRM foundation. |
| **Monitoring** | [Dynatrace](https://www.dynatrace.com/) | Real-time purchase alert triggered by Worker |
| **Domain** | levyam.com via GoDaddy | DNS management |
| **Dev tool** | [Claude Code](https://code.claude.com/) | AI-powered coding agent — builds the page from terminal |

---

## Prerequisites

Everything below must be done **before** hackathon day (April 14).

### Or — Accounts & Infrastructure

**Cloudflare:**
- [x] Create free Cloudflare account at cloudflare.com ✓ Done
- [x] Note Account ID → save to `.env` ✓ Done

**Supabase:**
- [x] Create free Supabase project at supabase.com ✓ Done
- [x] Create `levyam-b2b` table with columns: `id`, `full_name`, `payment_sum`, `package`, `payment_date`, `transaction_code`, `created_at` ✓ Done
- [ ] TODO: Review and finalize exact columns based on Grow webhook payload
- [x] Note project URL and anon key → save to `.env` ✓ Done

**Grow Payments:**
- [ ] Create static payment page for Company Offsite Day in the Grow dashboard
- [ ] Note the page URL → add to `content/packages.md`
- [x] Email [email protected] to enable webhooks for all one-time transactions ✓ Done
- [x] Confirm `webhookKey` from Grow support → save to `.env` ✓ Done
- [ ] Note: webhook `notifyUrl` will be the Cloudflare Worker URL (set after Worker is deployed)

**Dynatrace:**
- [x] Create Dynatrace account and workspace ✓ Done
- [x] Obtain custom HTTP event ingest endpoint URL → save to `.env` ✓ Done

**Claude Code:**
- [x] Install Claude Code on your machine ✓ Done
- [x] Authenticate with Anthropic account (Pro plan minimum) ✓ Done
- [x] Run `claude doctor` — verify all checks pass ✓ Done
- [x] Smoke test: run `claude` inside this repo, ask it to summarize `CLAUDE.md` ✓ Done

**GitHub & Repo:**
- [x] Confirm `CLAUDE.md` is in repo root ✓ Done
- [x] Confirm folder structure exists: `content/`, `css/`, `js/`, `docs/`, `worker/` ✓ Done
- [x] Invite Yair as collaborator ✓ Done

**GoDaddy:**
- [x] Verify login — confirm you can edit DNS for levyam.com ✓ Done

### Or — Pre-Hackathon End-to-End Test (complete before April 13)

This is the most important pre-hackathon task. If this passes, Yair walks in on April 12 knowing the plumbing works.

- [x] Deploy Worker — live at `https://lev-yam-webhook.orcohenwork.workers.dev` ✓ Done
- [x] All secrets set in Cloudflare (SUPABASE_URL, SUPABASE_ANON_KEY, DYNATRACE_INGEST_URL, DYNATRACE_API_TOKEN) ✓ Done
- [x] Supabase `levyam-b2b` table confirmed reachable ✓ Done
- [ ] Set `GROW_WEBHOOK_KEY` secret once received from Grow (`echo "KEY" | npx wrangler secret put GROW_WEBHOOK_KEY` from `worker/`)
- [ ] Run `./test-webhook.sh` — confirm Supabase row + Dynatrace event
- [ ] Update Grow webhook `notifyUrl` to `https://lev-yam-webhook.orcohenwork.workers.dev`

### Moran — Content & Brand

- [ ] Define B2B packages — names, prices, what's included, target audience (→ `content/packages.md`)
- [ ] Write all page copy in business tone (→ `content/copy.md`)
- [ ] Select high-quality photos — hero, venue shots, Nimer portrait (→ `content/images/`)
- [ ] Confirm brand elements — logo, colors, fonts (→ `content/brand/`)
- [ ] Commit all content to the repo (Or can help with this)

### Yair — No pre-hackathon tasks

Yair joins fresh on hackathon day. Everything he needs is in the repo:
- `CLAUDE.md` — full project context for Claude Code
- `content/` — all copy and images from Moran
- `docs/grow-plan.md` — complete payment + Worker implementation plan
- `.env` — all credentials ready

---

## Final Check — April 13 Evening

- [ ] All credentials in `.env`
- [ ] All content committed in `content/`
- [ ] `CLAUDE.md` is in repo root and up to date
- [ ] `docs/grow-plan.md` written and ready
- [ ] End-to-end dummy webhook test passed
- [ ] Grow `notifyUrl` updated with live Worker URL
- [ ] Claude Code runs inside the repo and understands the project
- [ ] Quick sync with Yair to walk through the hackathon plan

---

## Hackathon Schedule — April 14

| Time | Block | Focus | Who |
|------|-------|-------|-----|
| 0:00–0:15 | Kickoff | Align on plan, confirm tools work, open everything | Everyone |
| 0:15–1:30 | Sprint 1: Page | Build full landing page — all sections, RTL Hebrew, responsive | Yair builds · Moran reviews · Or observes |
| 1:30–1:45 | Break | Moran reviews content on screen, flags fixes | Moran |
| 1:45–2:45 | Sprint 2: Payments + Worker | Full Worker logic (verify → Supabase → Dynatrace), wire Grow notifyUrl, live feed + progress bar on page | Yair builds · Or supports |
| 2:45–3:15 | Sprint 3: Monitoring | Dynatrace alert verification, polish | Yair builds |
| 3:15–3:45 | Test & Fix | End-to-end 10 ₪ test payment, fix bugs | Everyone |
| 3:45–4:00 | Deploy & Celebrate | Push live to levyam.com 🎉 | Everyone |

---

## Project Structure

```
lev-yam-b2b/
├── index.html              # Landing page
├── css/style.css           # Styles
├── js/main.js              # Interactions + Supabase polling
├── content/                # Source of truth for all copy and images
│   ├── copy.md             # All page text (Moran)
│   ├── packages.md         # B2B package definitions + Grow page URLs (Moran + Or)
│   ├── images/             # Photos and visuals
│   └── brand/              # Logo, colors, fonts
├── worker/
│   └── index.js            # Cloudflare Worker — webhook receiver
├── docs/
│   └── grow-plan.md        # Full payment + Worker implementation plan (Or)
├── .env                    # Credentials (gitignored — never committed)
├── .env.example            # Template showing which credentials are needed
├── CLAUDE.md               # Claude Code project context — read by AI at session start
└── README.md               # This file
```

---

## Key Files Explained

**`CLAUDE.md`** — Claude Code reads this automatically at session start. Contains full project context so Yair can start building from minute one with no explanation needed.

**`docs/grow-plan.md`** — Step-by-step implementation plan for Sprint 2. Covers Grow redirect setup, Cloudflare Worker code, Supabase schema, Dynatrace wiring, and the live feed polling pattern.

**`worker/index.js`** — The Cloudflare Worker. Receives Grow's webhook POST, verifies the `webhookKey`, writes to Supabase, fires Dynatrace. Scaffolded and tested before hackathon day.

**`content/`** — Everything Moran produces. Claude Code reads copy and images directly from here during the build.

**`.env`** — Credentials for Cloudflare, Supabase, Grow webhookKey, Dynatrace endpoint. Never committed. Each team member creates from `.env.example`.

---

## Post-Hackathon Roadmap

| What | Why |
|------|-----|
| Grow WooCommerce plugin on main WordPress site | Seamless in-page checkout, installments, recurring billing. Requires 5–7 day Grow review. |
| Supabase → full booking/CRM system | Database is already live. Add customer history, package management, invoicing. |
| Admin dashboard | Read from Supabase. Show all purchases, revenue, trends. |
| Automated notifications | Worker already receives webhook — add WhatsApp/email on each purchase. |

---

## Decisions Log

| Decision | Reasoning |
|----------|-----------|
| Standalone page, not WordPress | Faster build, no plugin overhead. Claude Code works better with plain files. |
| Grow hosted redirect, not iframe | No backend needed to initiate checkout. Simpler for a 4-hour build. |
| Cloudflare Worker, not Make/Zapier | Direct webhook receiver. No third-party dependency. ~40 lines of JS. |
| Supabase instead of Cloudflare KV | Real Postgres database. Scales post-hackathon. No migration needed later. |
| No approveTransaction | Not required for standalone Grow static payment pages. |
| No Grow WooCommerce plugin | Requires 5–7 day review process — incompatible with hackathon timeline. Post-hackathon option. |
| All content pre-prepared in repo | Zero content creation during hackathon — all 4 hours go to building. |
