# לב ים (Lev Yam) — B2B Landing Page

A standalone B2B landing page for **Lev Yam** (לב ים — "Heart of the Sea"), a beachfront venue in Jisr az-Zarqa, Israel. The page sells company offsite days to hi-tech teams in three packages.

Built with [Claude Code](https://claude.ai/code) as the primary development tool.

---

## Live Site

**[levyam.com](https://levyam.com)**

---

## What it does

- Hebrew RTL landing page presenting three B2B offsite packages
- Direct payment via [Grow Payments](https://grow.co.il/) hosted payment pages (per-package redirect)
- On successful payment, Grow POSTs a webhook → Cloudflare Worker verifies and writes to Supabase
- Page polls Supabase every 5 seconds to show a **live purchase feed** and **animated progress bar**
- Email + SMS notifications to the team on each purchase (via Resend + Twilio)

---

## Architecture

```
User clicks "Buy" on levyam.com
        ↓
Grow hosted payment page (pre-built static page per package)
        ↓
Payment succeeds → Grow POSTs webhook to Cloudflare Worker
        ↓
Cloudflare Worker:
  1. Verifies webhookKey
  2. Writes purchase row to Supabase (name, amount, package, date)
  3. Sends email (Resend) + SMS (Twilio) to team
        ↓
Landing page polls Supabase every 5s
  → Updates live purchase feed
  → Updates progress bar
```

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Page | Static HTML + CSS + JS — no framework |
| Payments | Grow Payments — hosted redirect pages |
| Webhook receiver | Cloudflare Worker (`worker/index.js`) |
| Database | Supabase (Postgres) — `levyam-b2b` table |
| Notifications | Resend (email) + Twilio (SMS) |
| Hosting | levyam.com via GoDaddy / GitHub Pages |

---

## Project Structure

```
lev-yam-b2b/
├── index.html              # Landing page (Hebrew, RTL)
├── css/style.css           # All styles — RTL-first, mobile-first
├── js/main.js              # Interactions, Supabase polling, Grow button wiring
├── content/
│   ├── copy.md             # All Hebrew page copy
│   ├── packages.md         # Package definitions + Grow payment URLs
│   ├── images/             # Hero video, background image
│   └── brand/              # Logo, icons, colors, fonts
├── worker/
│   └── index.js            # Cloudflare Worker — webhook receiver
├── docs/
│   └── grow-plan.md        # Grow Payments + Worker implementation plan
├── .env                    # Credentials (gitignored — never committed)
├── .env.example            # Credential template
├── CLAUDE.md               # Claude Code project context
└── README.md               # This file
```

---

## Packages

| Package | Hebrew name | Price |
|---------|-------------|-------|
| Team Reset | ליום איפוס של הצוות | Lite tier |
| Focus Session | יום פוקוס ופריצת דרך | Classic tier |
| Momentum Booster | יום מומנטום ועידוד הצוות | Gold tier |

Full details (inclusions, prices, Grow URLs) are in `content/packages.md`.

---

## Running locally

Open `index.html` directly in a browser — no build step needed.

---

## Deploying the Worker

```bash
cd worker
npm install
npx wrangler deploy

# Set secrets:
npx wrangler secret put GROW_WEBHOOK_KEY
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_ANON_KEY
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put RESEND_FROM_EMAIL
npx wrangler secret put TWILIO_ACCOUNT_SID
npx wrangler secret put TWILIO_AUTH_TOKEN
npx wrangler secret put TWILIO_FROM_NUMBER
```

Test the webhook:

```bash
./test-webhook.sh
# Expected: HTTP 200 + new row in Supabase levyam-b2b table
```

---

## Team

| Name | Role |
|------|------|
| **Or** | Project owner |
| **Moran** | Content & brand |
| **Yair** | Engineering |
