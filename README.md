# לב ים (Lev Yam) — B2B Landing Page

A standalone B2B landing page for Lev Yam, selling company offsite days and deep work days to businesses and professionals.  
Built during a 4-hour hackathon on **April 12, 2026**, using [Claude Code](https://code.claude.com/) as the primary development tool.

---

## Goal

A live landing page on levyam.com with a successful **10 ₪ test payment end-to-end**:  
Page → Grow Payments → Webhook → Dynatrace alert.

---

## About Lev Yam

Lev Yam (לב ים — "Heart of the Sea") is a beachfront multi-use venue in the fishing village of Jisr az-Zarqa on Israel's Carmel coast. Co-founded by Or and Nimer, a third-generation local fisherman. The venue offers co-working space by the sea, private events, venue rental, and an intimate sea-to-table dining experience hosted by Nimer.

This landing page focuses on B2B sales: company offsite days for teams and deep work days for individuals.

---

## Team

| Name | Role | What they do |
|------|------|-------------|
| **Or** | Team Lead & Project Owner | Owns the full environment setup, content preparation, Grow Payments research, and runs the development on his machine during the hackathon. Learning Claude Code hands-on. |
| **Moran** | Marketing & Content Creator | Writes all page copy, selects images, defines brand tone. Delivers final content to the repo before the hackathon. Reviews the live page on hackathon day. |
| **Yair** | Software Engineer | Joins on hackathon day to build. Brings deep AI and Claude Code expertise. Drives the technical build — page, payments integration, Dynatrace, deployment. No pre-hackathon tasks. |

---

## Tech Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| **Page** | Static HTML/CSS/JS | Lightweight, no framework, fast to deploy |
| **Payments** | [Grow Payments](https://www.grow.co.il/) | Israeli payment gateway — checkout for B2B packages |
| **Monitoring** | [Dynatrace](https://www.dynatrace.com/) | Analytics + real-time purchase alerts |
| **Domain** | levyam.com via GoDaddy | DNS management |
| **Dev tool** | [Claude Code](https://code.claude.com/) | AI-powered coding agent — builds the page from terminal |

### Why this stack?

**No WordPress** — the main Lev Yam site runs on WordPress, but this B2B page is standalone. A static page loads faster, is easier to deploy, and avoids plugin complexity. Claude Code can build and iterate on plain HTML/CSS/JS much more efficiently than navigating a CMS.

**Grow Payments** — an Israeli payment provider that supports ₪ transactions. Integration approach to be determined (see Grow research task below).

**Claude Code** — Anthropic's terminal-based AI coding agent. It reads the entire project, understands the context via `CLAUDE.md`, and builds/edits files through natural language instructions. Yair will drive it on Or's machine during the hackathon.

---

## Prerequisites

Everything below must be done **before** hackathon day (April 12).

### Or — Environment & Technical Setup

**Claude Code:**
- [ ] Install Claude Code on your machine ([setup guide](https://code.claude.com/docs/en/setup))
- [ ] Authenticate with your Anthropic account (Pro plan minimum)
- [ ] Run `claude doctor` — verify all checks pass
- [ ] Smoke test: run `claude` inside this repo, ask it to summarize `CLAUDE.md`

**Credentials & Access:**
- [ ] Verify GoDaddy login — confirm you can edit DNS for levyam.com
- [ ] Create Dynatrace account/workspace
- [ ] Obtain Grow Payments credentials (part of the research below)
- [ ] Save all credentials in `.env` file (see `.env.example` for template)

**Grow Payments Research:**
- [ ] Investigate available integration approaches:
  - Direct API (custom checkout form on our page)
  - Hosted payment page (redirect to Grow-hosted checkout)
  - Embedded widget (if Grow offers one)
- [ ] Document: which approach is best for a 4-hour hackathon build?
- [ ] Understand webhook setup — how do we get notified when a payment succeeds?
- [ ] Identify required credentials and how to obtain them
- [ ] Write findings into `docs/grow-plan.md` — this becomes the implementation guide for hackathon day

**GitHub & Repo:**
- [ ] Add `CLAUDE.md` to repo root (file provided separately)
- [ ] Create folder structure: `content/`, `css/`, `js/`, `docs/`
- [ ] Invite Yair as collaborator

### Moran — Content & Brand

- [ ] Define B2B packages — names, prices, what's included, target audience (→ `content/packages.md`)
- [ ] Write all page copy in business tone:
  - Hero section: headline + subheadline + CTA
  - Package cards: title, description, price, what's included
  - About Lev Yam section (short, credibility-focused)
  - About Nimer section (short bio + photo)
  - FAQ: 3–5 common questions
  - Footer: contact info, location
- [ ] Select high-quality photos — hero background, venue shots, Nimer portrait (→ `content/images/`)
- [ ] Confirm brand elements — logo, colors, fonts (→ `content/brand/`)
- [ ] Commit all content to the repo (Or can help with this)

### Yair — No pre-hackathon tasks

Yair joins fresh on hackathon day. Everything he needs is in the repo:
- `CLAUDE.md` gives Claude Code full project context
- `content/` has all copy and images from Moran
- `docs/grow-plan.md` has Or's research on the payment integration approach
- `.env` has all credentials

---

## Final Check — April 11 Evening

- [ ] All credentials in `.env`
- [ ] All content committed in `content/`
- [ ] `CLAUDE.md` is in repo root and up to date
- [ ] `docs/grow-plan.md` written with Grow integration plan
- [ ] Claude Code runs inside the repo and understands the project
- [ ] Or + Yair quick sync to walk through the hackathon plan

---

## Hackathon Schedule — April 12

| Time | Block | Focus | Who |
|------|-------|-------|-----|
| 0:00–0:15 | Kickoff | Align on plan, confirm tools work, open everything | Everyone |
| 0:15–1:30 | Sprint 1: Page | Build full landing page — all sections, RTL Hebrew, responsive | Yair builds · Moran reviews · Or observes |
| 1:30–1:45 | Break | Moran reviews content on screen, flags fixes | Moran |
| 1:45–2:45 | Sprint 2: Payments | Integrate Grow Payments per `docs/grow-plan.md` | Yair builds · Or supports |
| 2:45–3:15 | Sprint 3: Monitoring | Dynatrace analytics + purchase alerts | Yair builds |
| 3:15–3:45 | Test & Fix | End-to-end 10 ₪ test payment, fix bugs | Everyone |
| 3:45–4:00 | Deploy & Celebrate | Push live to levyam.com 🎉 | Everyone |

---

## Project Structure

```
lev-yam-b2b/
├── index.html          # Landing page
├── css/style.css       # Styles
├── js/main.js          # Interactions + Grow integration
├── content/            # Source of truth for all copy and images
│   ├── copy.md         # All page text (Moran)
│   ├── packages.md     # B2B package definitions (Moran)
│   ├── images/         # Photos and visuals
│   └── brand/          # Logo, colors, fonts
├── docs/
│   └── grow-plan.md    # Grow integration research & plan (Or)
├── .env                # Credentials (gitignored — never committed)
├── .env.example        # Template showing which credentials are needed
├── CLAUDE.md           # Claude Code project context — read by AI at session start
└── README.md           # This file
```

---

## Key Files Explained

**`CLAUDE.md`** — The most important file for the hackathon. Claude Code reads this automatically when it starts a session inside the repo. It contains the full project context: what Lev Yam is, the tech stack, page structure, design principles, and coding conventions. This means Claude Code understands the project from minute one — no time wasted explaining.

**`docs/grow-plan.md`** — Or's research on Grow Payments. Documents the chosen integration approach, required API calls, credentials needed, and step-by-step implementation plan. Yair reads this on hackathon day and follows it.

**`content/`** — Everything Moran produces goes here. Claude Code pulls copy and images directly from this folder during the build. The CLAUDE.md instructs Claude to never invent copy — always read from `content/`.

**`.env`** — Stores sensitive credentials (API keys, tokens). Listed in `.gitignore` so it's never pushed to GitHub. Each team member creates their own from `.env.example`.

---

## Decisions Log

| Decision | Reasoning |
|----------|-----------|
| Standalone page, not WordPress | Faster, cleaner, no plugin overhead. Claude Code works better with plain files. |
| No CSS framework | Keep it minimal, full control over RTL Hebrew layout |
| Grow integration approach TBD | Or investigating before hackathon — plan in `docs/grow-plan.md` |
| Claude Code as primary build tool | Speed for Yair + learning opportunity for Or |
| All content pre-prepared in repo | Zero content creation during hackathon — all 4 hours go to building |
