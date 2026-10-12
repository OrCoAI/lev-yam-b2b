# לב ים (Lev Yam) — Venue Landing Page

Landing page for **Lev Yam** (לב ים), a beachfront venue in the fishing village of Jisr az-Zarqa, Israel.
The page presents the venue to groups — team days, management offsites, workshops, company and community
events — and converts through WhatsApp.

Built with [Claude Code](https://claude.ai/code) as the primary development tool.

> **History:** until October 2026 this page was a pre-sale campaign for hi-tech teams (three fixed packages,
> Grow payments, live purchase feed). It was rebuilt as an evergreen venue page following the copy doc
> "דף נחיתה עסקי - לב ים". The payment stack (Cloudflare Worker + Supabase) is kept deployed but is no
> longer used by the page — see [Legacy](#legacy-payment-stack).

---

## Live site

**[b2b.levyam.com](https://b2b.levyam.com/)** — GitHub Pages, served from the `main` branch (`CNAME`).
Merging to `main` deploys.

---

## What the page does

- Hebrew (RTL) with an Arabic version (language switch; Arabic translation is a draft pending native review)
- Hero with a muted background video, three "components" (space / food / content), who it suits,
  community impact, and a closing section with a **WhatsApp planner**
- The planner has three optional questions (event type, group size, what to include) that compose a
  pre-filled WhatsApp message — no form, no backend, nothing stored
- Dynatrace RUM + business events: `levyam.whatsapp.click`, `levyam.cta.click`,
  `levyam.planner.select`, `levyam.lang.switch`
- Sections waiting for content are in the HTML with `hidden` + `data-pending="…"`:
  facts strip, testimonials, company logos, footer contact details

---

## Page structure

| # | Section | id |
|---|---------|----|
| 0 | Sticky header — logo, anchors, language switch, WhatsApp (desktop) | `#site-header` |
| 1 | Hero — H1, subtitle, lead, two CTAs, video | `#hero` |
| 2 | Facts strip *(hidden until data)* | `#facts` |
| 3 | Why Lev Yam — intro, story, pull quote, photo | `#why` |
| 3b | Testimonials + logos *(hidden until content)* | `#testimonials` |
| 4 | Three components — 01 space, 02 food, 03 content | `#space` `#food` `#content` |
| 5 | One day, exactly for you — 6 tiles + CTA | `#fit` |
| 6 | Good experience, good impact | `#impact` |
| 7 | Let's meet — closing + WhatsApp planner | `#plan` |
| 8 | Footer — logo, place, WhatsApp, language, © | `.footer` |
| — | Floating WhatsApp button (mobile only) | `#wa-float` |

---

## Tech stack

| Layer | Tool |
|-------|------|
| Page | Static HTML + CSS + JS — no framework, no build step |
| Fonts | Heebo (Hebrew) and Cairo (Arabic) from Google Fonts; Cairo loads only when Arabic is selected |
| Conversion | WhatsApp deep links (`wa.me`) with a composed message |
| Analytics | Dynatrace RUM tag + `dynatrace.sendBizEvent` |
| Hosting | GitHub Pages → `b2b.levyam.com` |

---

## Project structure

```
lev-yam-b2b/
├── index.html              # The page (Hebrew source text, data-i18n keys)
├── css/style.css           # RTL-first, mobile-first styles
├── js/main.js              # i18n (he/ar), WhatsApp planner, header, floating button, DT events
├── content/
│   ├── copy.md             # All page copy, from the Google Doc — read before changing text
│   ├── packages.md         # Legacy packages/prices — not shown on the page, used for quotes only
│   ├── images/             # Hero video + poster, photos (+ generated -1600/-800 WebP/JPEG), OG image
│   └── brand/              # Logos, icons, brand guide, colors, fonts
├── scripts/build_media.py  # Generates WebP/JPEG variants, compressed hero video, poster, OG image
├── worker/                 # Legacy Cloudflare Worker (Grow webhook → Supabase) — unused by the page
├── docs/grow-plan.md       # Legacy payments plan
├── CLAUDE.md               # Claude Code project context
└── README.md
```

---

## Content workflow

1. Copy changes go into `content/copy.md` first (source: the Google Doc), then into `index.html`
   (Hebrew) and the `TRANSLATIONS` dictionary in `js/main.js` (Hebrew + Arabic).
2. New photos: drop the original in `content/images/`, run the media script (below), then reference
   the generated variants in a `<picture>` element. Replace a placeholder by swapping the
   `figure.pillar-media-ph` block and removing `data-pending`.
3. Sections marked `hidden data-pending="…"` are switched on by removing `hidden` once real content is in.

### Media script

```bash
# Photo variants (-1600.jpg, -1600.webp, -800.webp) for one or more originals
python3 scripts/build_media.py content/images/food.jpeg content/images/yoga.jpeg

# Hero video (muted, bitrate-capped, faststart) + poster frame
python3 scripts/build_media.py --video "content/images/Video HERO.mp4"

# OG image (1200×630) from a photo
python3 scripts/build_media.py --og content/images/beachub-1.jpeg
```

Requires `ffmpeg` and Python 3 with Pillow (WebP support).

---

## Running locally

```bash
python3 -m http.server 8081
# open http://127.0.0.1:8081/
```

The Dynatrace tag is restricted to the production domain and logs a CORS error on localhost — expected.
The page works without it.

---

## Legacy payment stack

Kept for reference and still deployed; the page no longer calls it.

- `worker/index.js` — receives Grow webhooks, writes to Supabase, emails/SMS the team, sends a
  Dynatrace business event.
- Deploy with `cd worker && npm install && npx wrangler deploy`, then set the secrets listed in
  `.env.example`. Test with `./test-webhook.sh`.
- Full plan in `docs/grow-plan.md`.

---

## Team

| Name | Role |
|------|------|
| **Or** | Project owner |
| **Moran** | Content & brand |
| **Mayula** | Copy (Google Doc) |
| **Yair** | Engineering |
