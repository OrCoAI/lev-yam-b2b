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
Or's raw uploads sit in `content/images/Content|Food|Space/` (not committed — duplicates, unused shots and
video sources); the page uses clean-named copies (`content-*.jpeg`, `food-*.jpeg`) and their builds, and
the Space clips (`space-*.mp4`). Photos in use are the reduced Photos exports (≤1024px) — Or will send
full-size originals. Each photo carries `data-focus="x y"` (its subject, as fractions): every phone crop
is framed around it by JS. Ask Or for assets.

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
   The nav sits on the page's centre line (grid 1fr auto 1fr). Over the hero the WhatsApp button is a white
   outline (the hero's own button is the one orange thing on the first screen); it turns orange once scrolled.
   The language pill is dark glass so its white label reads on any video frame; each half is a 44px target.
1. Hero `#hero` — the brand stamp (the place-name eyebrow was removed by Or), H1
   "יוצאים מהשגרה. נפגשים אחרת.", subtitle, lead with "לב ים" bold (as in the doc), CTAs
   "בואו נתכנן את היום שלכם!" → `#plan` / "גלו את לב ים" → `#intro`; vertical video on all screens.
   The two H1 sentences are flex items: one line when both fit, otherwise stacked and centred. On short
   phones (≤740px tall) the stack tightens so both buttons stay above the fold; the floating WhatsApp
   button hides while the hero buttons are on screen. A soft dark band at the top of the video keeps the
   white header legible. The stamp (my design, Or asked for a fade/glow, 2026-10-14): it surfaces out of a
   soft blur, a warm light blooms behind its sun and keeps a slow heartbeat (לב — lub-dub, rest, every
   5.2s), and a glint of sun crosses it right to left every 7.5s, clipped to the zig-zag edge by a mask of
   the same PNG. The light is `.hero-mark::before` with `mix-blend-mode: screen`; `.hero-mark` must stay
   untransformed (tilt and entrance live on the `img`), or the light mixes with the video like paint
   instead of adding to it like light. With reduced motion it rests in a still glow.
2. Facts strip `#facts` — hidden until data
3. Intro `#intro` — the two opening sentences ("מקום לצאת מהשגרה…", "בין אם אתם מתכננים…") on cream,
   right under the hero. The "why" section that followed them (H2, story, quote, photo) was removed by Or
   (2026-10-13); its text is kept in `content/copy.md` under "הוסר מהדף".
4. Three components `#space` `#food` `#content` — straight after the intro. Folded (Or, 2026-10-12).
   Desktop (≥1024px — below that the cards would be too narrow for a line of text): three cream cards in
   a row like the old packages; "מידע נוסף" opens all three together. Phones and tablets: one grouped
   list (max 880px), one item open at a time (an item above closes instantly with scroll compensation);
   tablets 900–1023 show the bullets in two columns. Every item has Or's structure (text by Or,
   2026-10-13), with the same spacing: title + tagline → small wave → entry paragraph → list label + six
   bullets → end paragraph (white box). No 01/02/03 numbers. On desktop, JS measures the four blocks
   (`data-row`, `--row-*`) and CSS equalises the taglines, the entry paragraphs and the note boxes: the
   three lists start on one line, the three white boxes are one height (text top-aligned) and sit on one
   line above the foot bars, and a card's slack hides between its last bullet and its note. Closing from
   the "סגור" bar brings the section back to the top of the screen. Header links open the item.
   **Photos and videos (2026-10-14).** Food and content: six photos each; Space: Or's two videos (the
   short one is the title film, ping-pong looped; the long one cut into three chapters — by the sea,
   inside, sunset). The desktop markup holds the one list of media; phones build from it.
   *Phones and tablets* — Or's pick, option 6 "rows + deck" (`html[data-phone="rows stack"]`): the rows
   stay as they were and, behind the chevron, the card's photos (or the title film) breathe and melt into
   the cream (a mask, not an overlay — no edge line); an open item ends, after its white box, with a flick
   deck of polaroids (the brand wave on each strip) that deals itself until touched; it opens on the photo
   the row was showing; Space's deck plays a chapter per card and deals the next when one ends.
   Options 1–5 (stories, rows, gallery, deck, ribbon) and a switcher remain for comparison, shown only on
   localhost or with `?phone` — remove them once Or confirms.
   *Desktop* — still a test: content = cover (photos sweep in behind a zig-zag edge, story bars), food =
   a fan of arches, Space = its videos inside its own icon (the house, doors cut out). Or to choose.
   **Never remove copy to fix layout** — Or wants all text kept; solve it with structure and spacing.
4b. Testimonials + logos `#testimonials` — hidden until content
5. Fit `#fit` — "יום אחד. בדיוק בשבילכם." + text + "מתאים במיוחד ל:" (the six types as rows: brand icon
   in a white circle, the name, a hairline between rows; they rise in on first view) + CTA. A list to read,
   not buttons: Or asked (2026-10-13) that nothing here touches the planner, and the rows deliberately
   don't look like the planner's tiles. Phones: one column, full-width button; 600px: two columns in the
   text's 680px measure; from 900px the title is centred over both columns like every section title (Or,
   2026-10-14), the text and the button sit on one side and "מתאים במיוחד ל:" (h3 size) with the list on
   the other, the text's first line on the list title's baseline, and the button on the last row's centre
   line (Or, 2026-10-14): its box is one row tall (`--fit-icon` + 2 × `--fit-row-pad`) at the bottom of
   its column. CTA "בואו ליצור את היום שלכם!" (the "!" by Or, 2026-10-14).
6. Impact `#impact` — icon, title, text on white. A living photo background was tried and removed by Or
   (2026-10-14); no background for now.
7. Plan `#plan` — the finale: blue full-bleed section, one white card in two parts (side by side from
   900px, stacked below): the questions and the cream message panel. Four questions, one at a time,
   one tap each, and the flow moves on by itself: what (6 types, #fit icons; equal tiles, icons on one
   line) → how many (4 sizes) → when (next 6 months, built by JS, three to a row — a quarter — with
   "later" / "not decided" sharing the last row, so all eight answers fit one phone screen; on phones the
   check badge sits in the tile's bottom corner so it never covers a month's name; the narrowest phones
   get two months a row) → what to include (several; "המשך"). The message is `text-wrap: balance`, and
   the venue name and the closing sentence are kept on one line in the preview (never a lone word). Side by
   side from 900px — Or prefers the message beside the questions (2026-10-14; the polish had moved it to
   1024px, and Or saw it drop under). Stacked below 900, where the box glides between step heights —
   `.flow-steps` keeps `flex: 1 1 auto`, a `0%` basis would silently disable the animation).
   Then a ready step: the brand stamp lands like a stamp on a letter (the message is sealed) and the
   answers show as pills that can be changed.
   The message rewrites itself with every answer (new fragment drawn in orange marker; the message is
   regular weight, the chosen fragments bold; "15-30" is wrapped so it never breaks at the hyphen). The
   send button follows the message and stays white until the ready step, then turns orange; it works at
   every step. Back (faded on the first question, keeping its place) and skip in the top row; every control
   is a 44px target. All answers optional. Without JS only the message and button show.
   The fun is in the motion, not in decoration — a busy chat-card version was rejected; keep it
   clean. No direct number (removed). Group-size ranges in the message use a plain hyphen
   (an en dash shows reversed in RTL/WhatsApp).
8. Footer — removed for now (Or, 2026-10-12). Copy kept in `content/copy.md` for when it returns.
— Floating WhatsApp button, mobile only; hides while the hero's buttons or `#plan-cta` are on screen
   (it sends the same composed message, so it never competes elsewhere).
— Motion and states: hover effects only under `(hover: hover)`; every control has a press state in brand
   tints and no browser tap flash; the focus ring is white over the hero; closing the desktop cards from
   the "סגור" bar brings the section back to the top of the screen; the header mark appears only once the
   hero stamp has scrolled under the header; both bar labels ("מידע נוסף"/"סגור") are rendered and stacked
   so the chevron never slides. Arabic (Cairo) gets more leading through the `--lh-*` tokens, a width-scaled
   H1 on phones, a shorter marker band and two-pixel lifts in the large pills; the two Arabic range strings
   start with U+200E so "15-30" keeps its order in the sent text.

One WhatsApp entry point per viewport: header button on desktop, floating button on mobile.

---

## Design principles

- **RTL-first.** Don't build LTR and flip — build RTL from the start.
- **Mobile-first.** Most visitors will be on phones. Test at 375px width; photo before text on mobile.
- **Fast.** No CDN libraries unless absolutely necessary. No heavy JS. Hero video stays ≤ ~2.5 MB.
- **No CSS framework.** We own the layout.
- **One type scale, one spacing scale** (2026-10-14 polish). Tokens on `:root` in `css/style.css`:
  `--fs-xs/sm/md/lead/h3/h2/h1` (one size per role; leads and headings are fluid), `--lh-heading/ui/lead/body`
  (1.2 / 1.35 / 1.5 / 1.65), `--space-section` (a section's edge → its content, top and bottom, 40px on phones →
  64px wide — every section uses it; only the intro's top is smaller, because the hero's wave already adds ≈ 26px of
  cream; tightened twice by Or, 2026-10-14: 56–104 → 48–80 → 40–64), `--space-title` (title → text, 1.5rem) and `--space-object` (text → the thing it
  introduces, 2.5rem), `--pad-card`, `--radius-sm/md/lg`, `--wave`. Use them instead of ad-hoc values: the
  same relationship gets the same gap in every section. `p + p` is half a line (`0.5lh`). Headings use
  `text-wrap: balance`, paragraphs and list items `text-wrap: pretty` — no lonely last words; never fix a
  wrap by editing copy. Running text keeps a measure of ≈ 72 characters (`.container.narrow` 600px,
  `.lede` 700px, `.hero-lead` 560px). Hover effects live under `@media (hover: hover)`.
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
`-400.webp` (and a webp at the photo's own width when it is narrower than 1600), then use `srcset`/`sizes`
as in `index.html` and give it a `data-focus`. Hero video: `--video`, OG image: `--og`. Card clips:
`--clip SRC START END NAME` (repeatable; `--pingpong` for a seamless loop) → `NAME.mp4` (540 wide, muted)
+ `NAME-poster.webp`. Requires `ffmpeg` and Pillow.

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
│   ├── images/              ← hero video, og-image, card photos (content-*, food-*) + space clips
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
