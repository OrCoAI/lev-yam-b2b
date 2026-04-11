# CLAUDE.md — Lev Yam B2B Landing Page

Read this file completely before writing a single line of code.
This is the authoritative context for every session.

---

## What we're building

A standalone B2B landing page for **Lev Yam** (לב ים — "Heart of the Sea"), a beachfront venue in
Jisr az-Zarqa, Israel. The page sells two products to businesses and professionals:
company offsite days and deep work days.

**Live goal:** `levyam.com` with a working 10 ₪ test payment end-to-end:
Page → Grow Payment Page → Webhook → Cloudflare Worker → Supabase + Dynatrace alert.

This is a 4-hour hackathon build. Speed and working software beat perfection.

---


## Content rules — read carefully

**Never invent copy.** All text lives in `content/copy.md` and `content/packages.md`.
Read those files before building any section. If a file is missing, stop and tell Or.

**Never invent images.** All photos live in `content/images/`. Use only what's there.
Reference images by their actual filename. Ask if you're unsure which image goes where.

**Language:** The page is in **Hebrew (RTL)**. All user-facing text is Hebrew.
Set `dir="rtl"` on `<html>`. Mirror layouts accordingly — flex-row becomes flex-row-reverse logically.

---

## Tech stack

| Layer | Tool | Notes |
|-------|------|-------|
| Page | Static HTML + CSS + JS | No framework. Single `index.html`. |
| Styles | Plain CSS in `css/style.css` | No Tailwind, no Bootstrap. Full RTL control. |
| JS | Plain JS in `js/main.js` | Interactions + Supabase polling (live feed + progress bar) |
| Payments | Grow Payments | See `docs/grow-plan.md` for exact integration approach |
| Monitoring | Dynatrace | Analytics snippet + webhook-triggered alert |
| Hosting | Static file on levyam.com via GoDaddy | DNS already configured |
| Webhook endpoint | Cloudflare Worker | Deployed separately on workers.dev |

---

## Page structure

To be updated based on the final design. Read `content/copy.md` for all section copy.
Do not build any section without confirming structure with Or first.

---

## Design principles

- **RTL-first.** Don't build LTR and flip — build RTL from the start.
- **Mobile-first.** Most visitors will be on phones. Test at 375px width.
- **Fast.** No CDN libraries unless absolutely necessary. No heavy JS.
- **No CSS framework.** We own the layout. Full control for RTL.
- Colors, fonts, and logo are in `content/brand/`. Use them exactly.

---

## Payments integration

Full plan is in `docs/grow-plan.md`. Read it before touching Sprint 2.

The short version:
- Grow Payments is an Israeli gateway (grow.co.il)
- Each package CTA button is a direct link to a pre-built Grow static payment page (redirect)
- On successful payment, Grow POSTs a webhook to the Cloudflare Worker
- The Worker verifies the webhookKey, writes the purchase to Supabase, and fires a Dynatrace alert
- The landing page polls Supabase every 5 seconds to update the live purchase feed and progress bar

Credentials are in `.env`. Never hardcode them. Read from environment.

---

## Monitoring (Dynatrace)

- Add Dynatrace analytics JS snippet to `<head>` of `index.html`
- Configure a custom event or synthetic monitor for payment webhook receipt
- Goal: a visible alert in Dynatrace within 30 seconds of a test payment

---

## File structure

```
lev-yam-b2b/
├── index.html
├── css/style.css
├── js/main.js
├── worker/
│   └── index.js         ← Cloudflare Worker — webhook receiver
├── content/
│   ├── copy.md          ← all Hebrew page text — read this first
│   ├── packages.md      ← package names, prices, inclusions + Grow page URLs
│   ├── images/          ← hero, venue, Nimer portrait
│   └── brand/           ← logo, colors, fonts
├── docs/
│   └── grow-plan.md     ← Grow Payments + Worker implementation plan
├── .env                 ← credentials (never commit)
├── .env.example
├── CLAUDE.md            ← this file
└── README.md
```

---

## Coding conventions

- Indent: 2 spaces
- No inline styles — everything in `css/style.css` with clear class names
- JS: vanilla, no `var`, use `const`/`let`, comment payment-related logic
- Commit working states often — if something works, commit before adding more
- If something is ambiguous, **ask Or before guessing**

---

## Who's in the room

| Person | Role | Talk to them about |
|--------|------|-------------------|
| **Or** | Project owner | Any blocker, content questions, credentials |
| **Moran** | Content | If copy in `content/` seems wrong or missing |
| **Yair** | Engineer driving Claude Code | Technical decisions |

---

## Hackathon mindset

We have 4 hours. The goal is a live page with a real payment. Prioritize:

1. Working > perfect
2. Deployed > polished
3. Ask > assume

If you're blocked, say so immediately. Don't silently spin.
