# CLAUDE.md — Lev Yam Venue Landing Page

Read this file completely before writing a single line of code.
This is the authoritative context for every session.

---

## What we're building

A landing page for **Lev Yam** (לב ים — "Heart of the Sea"), a beachfront venue in the fishing village of
Jisr az-Zarqa, Israel. The page presents the venue to **groups** — team days, management offsites,
workshops, company and community events — and converts through **WhatsApp only** (no form, no backend).

**History:** until October 2026 this was a pre-sale campaign for hi-tech teams (three packages, Grow
payments, live purchase feed, progress bar). On 2026-10-12 Or pivoted it to an evergreen venue page,
following the copy doc "דף נחיתה עסקי - לב ים" (Google Docs, owned by Mayula). Everything about
packages, prices, early-bird offers, the "50 teams" counter and the security situation was removed on
purpose — do not bring it back.

**Goals, in order:**
1. A perfect, high-quality website (current step — branch `venue-landing`).
2. Integrate the page in a smart way under www.levyam.com (next step — not started).

---

## Content rules — read carefully

**Never invent copy.** All text lives in `content/copy.md` (source: the Google Doc). Read it before
building or changing any section. Deviations from the doc are marked `[הערה לתוכן]` there — keep that
habit: flag, don't silently rewrite. `content/packages.md` is legacy and is **not displayed**.

**Never invent images.** All photos live in `content/images/`. Use only what's there, by filename.
No photos are in use yet: the old co-working photos were removed on 2026-10-12 at Or's request, and
every visual slot is a brand placeholder (`div.ph` inside a `figure[data-pending]`). Ask Or for assets.

**Language:** Hebrew (RTL) is the source; an Arabic version is switched in via `data-i18n` keys and the
`TRANSLATIONS` dictionary in `js/main.js`. The Arabic is a draft pending native review. Venue name in
Arabic: لب يام. Both languages are RTL — use logical CSS properties (`inline-start`), never left/right.

**Hidden until content arrives** (`hidden` + `data-pending` in `index.html`): facts strip, testimonials,
logos, footer contact details. Switch on by removing `hidden` once real content exists.

---

## Tech stack

| Layer | Tool | Notes |
|-------|------|-------|
| Page | Static HTML + CSS + JS | No framework, no build step. Single `index.html`. |
| Styles | Plain CSS in `css/style.css` | No Tailwind, no Bootstrap. Full RTL control. |
| JS | Plain JS in `js/main.js` | i18n, WhatsApp planner, header state, floating button, Dynatrace events |
| Conversion | WhatsApp `wa.me` links | Number `972506669138`; planner composes the message client-side |
| Analytics | Dynatrace RUM + `dynatrace.sendBizEvent` | Tag is sync in `<head>`; CORS-blocked on localhost (expected) |
| Hosting | GitHub Pages from `main` | `CNAME` = `b2b.levyam.com`. Merging to `main` deploys. |
| Legacy | Cloudflare Worker + Supabase | Deployed, unused by the page. See `docs/grow-plan.md`. |

---

## Page structure (approved by Or 2026-10-12, order updated 2026-10-13)

0. Sticky header — logo mark, anchors (המרחב · האוכל · התוכן · למי זה מתאים · צרו קשר), HE/AR, WhatsApp
   (desktop ≥900px). At the very top the logo mark is hidden (the hero stamp is the logo); it fades in on scroll.
1. Hero `#hero` — the brand stamp (lands on load; the place-name eyebrow was removed by Or), H1
   "יוצאים מהשגרה. נפגשים אחרת.", subtitle, lead with "לב ים" bold (as in the doc), CTAs
   "בואו נתכנן את היום שלכם!" → `#plan` / "גלו את לב ים" → `#intro`; vertical video on all screens
2. Facts strip `#facts` — hidden until data
3. Intro `#intro` — the two opening sentences ("מקום לצאת מהשגרה…", "בין אם אתם מתכננים…") on cream,
   right under the hero. The "why" section that followed them (H2, story, quote, photo) was removed by Or
   (2026-10-13); its text is kept in `content/copy.md` under "הוסר מהדף".
4. Three components `#space` `#food` `#content` — straight after the intro. Folded (Or, 2026-10-12).
   Desktop: three cream cards in a row like the old packages; "מידע נוסף" opens all three together.
   Mobile: one grouped list, one item open at a time (an item above closes instantly with scroll
   compensation). Every item has Or's structure (text by Or, 2026-10-13), with the same spacing: title +
   tagline → entry paragraph → list label + six bullets → end paragraph (white box). No 01/02/03 numbers.
   On desktop, JS lines up matching blocks across the cards (`data-row`, `--row-*`). Header links open
   the item. Real photos go at the top of each `.pillar-body`.
   **Never remove copy to fix layout** — Or wants all text kept; solve it with structure and spacing.
4b. Testimonials + logos `#testimonials` — hidden until content
5. Fit `#fit` — "יום אחד. בדיוק בשבילכם." + 6 icon tiles + CTA
6. Impact `#impact` — full-bleed photo, short text
7. Plan `#plan` — the finale: blue full-bleed section, one white card in two parts (side by side from
   900px, stacked below): the questions and the cream message panel. Four questions, one at a time,
   one tap each, and the flow moves on by itself: what (6 types, #fit icons) → how many (4 sizes) →
   when (next 6 months, built by JS, + "later" / "not decided") → what to include (several; "המשך").
   Then a ready step: the brand stamp lands and the answers show as pills that can be changed.
   The message rewrites itself with every answer (new fragment drawn in orange marker). The send
   button stays white until the ready step, then turns orange; it works at every step. Back and
   skip in the top row. All answers optional. Without JS only the message and button show.
   The fun is in the motion, not in decoration — a busy chat-card version was rejected; keep it
   clean. No direct number (removed). Group-size ranges in the message use a plain hyphen
   (an en dash shows reversed in RTL/WhatsApp).
8. Footer — removed for now (Or, 2026-10-12). Copy kept in `content/copy.md` for when it returns.
— Floating WhatsApp button, mobile only; hides while `#plan-cta` or the footer is on screen.

One WhatsApp entry point per viewport: header button on desktop, floating button on mobile.

---

## Design principles

- **RTL-first.** Don't build LTR and flip — build RTL from the start.
- **Mobile-first.** Most visitors will be on phones. Test at 375px width; photo before text on mobile.
- **Fast.** No CDN libraries unless absolutely necessary. No heavy JS. Hero video stays ≤ ~2.5 MB.
- **No CSS framework.** We own the layout.
- **Brand colours only** (Or, 2026-10-12): orange `#f49834`, cream `#fff7ea`, blue `#2c92bf`, plus white
  and a neutral dark for text. No navy, teal, mint or extra tints; tints are the brand colours at low
  alpha. Blue is the dark background; orange is for CTAs, selected states and accents.
- **Brand icons** from `content/brand/` (palm, house, double heart, pinwheel) plus the sun and arch drawn
  in brand colours in the SVG sprite. No generic icon sets.
- **Accessible.** Dark text on orange (white on orange fails contrast); blue text only at heading sizes;
  white text on blue only at ≥ 19px bold. Skip link, `aria-pressed` on planner answers and language
  buttons, focus moves to each new planner question, `prefers-reduced-motion` respected.
- Colors, fonts, and logo are in `content/brand/`. Use them exactly.

---

## Media

New photos: put the original in `content/images/` and run
`python3 scripts/build_media.py content/images/<file>` to get `-1600.jpg`, `-1600.webp`, `-800.webp`,
then use a `<picture>` with `srcset`/`sizes` as in `index.html`. Hero video: `--video`, OG image: `--og`.
Requires `ffmpeg` and Pillow.

---

## Verifying

```bash
python3 -m http.server 8081   # then open http://127.0.0.1:8081/
```

Check at 375px and 1440px, in Hebrew and Arabic: no horizontal overflow, every `data-i18n` key exists
in both dictionaries, planner message reads naturally, floating button hides at `#plan`.

---

## File structure

```
lev-yam-b2b/
├── index.html
├── css/style.css
├── js/main.js
├── scripts/build_media.py   ← photo/video/OG asset generation
├── content/
│   ├── copy.md              ← all page text (he) — read this first
│   ├── packages.md          ← legacy, not displayed
│   ├── images/              ← hero.mp4 + hero-poster.jpg, og-image.jpg (brand). No photos yet
│   └── brand/               ← logos, icons, brand-guide.md, colors.md, fonts.md
├── worker/                  ← legacy Cloudflare Worker (webhook → Supabase)
├── docs/grow-plan.md        ← legacy payments plan
├── .env / .env.example      ← legacy credentials (never commit .env)
├── CLAUDE.md                ← this file
└── README.md
```

---

## Coding conventions

- Indent: 2 spaces
- No inline styles — everything in `css/style.css` with clear class names
- JS: vanilla, no `var`, use `const`/`let`; keep analytics calls wrapped so they can never break the page
- Commit working states often — if something works, commit before adding more
- If something is ambiguous, **ask Or before guessing**

---

## Who's in the room

| Person | Role | Talk to them about |
|--------|------|-------------------|
| **Or** | Project owner | Any blocker, content questions, assets, deploy decisions |
| **Moran** | Content & brand | If copy in `content/` seems wrong or missing |
| **Mayula** | Copy doc owner | The Google Doc that drives `content/copy.md` |
| **Yair** | Engineer driving Claude Code | Technical decisions |

---

## Working mindset

1. Perfect the page before migrating it.
2. Ask > assume — especially about copy, images, and anything that goes live.
3. If you're blocked, say so immediately. Don't silently spin.
