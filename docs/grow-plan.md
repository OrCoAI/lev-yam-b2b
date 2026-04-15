# docs/grow-plan.md — Grow Payments + Worker Implementation Plan

**Read this before Sprint 2.** This is the complete implementation guide for the payment + webhook flow.  
Or will have tested the full flow before hackathon day. The scaffolding exists. This is execution, not discovery.

---

## Architecture recap

```
User clicks "Buy"
      ↓
Grow hosted payment page (pre-built static page, redirect)
      ↓
Payment succeeds → Grow POSTs webhook to Cloudflare Worker
      ↓
Worker:
  1. Verify webhookKey
  2. Write row to Supabase
      ↓
Landing page polls Supabase every 5s → updates feed + progress bar
```

---

## Part 1 — Grow payment pages (already done by Or)

Or has pre-built a static Grow payment page for each B2B package in the Grow dashboard.  
The page URLs are in `content/packages.md`.

Each CTA button on the landing page is a plain `<a href="GROW_PAGE_URL">` link.  
**No API call needed to initiate checkout. Just a link.**

Grow will POST the webhook to the Worker URL after a successful payment.  
The Worker URL is already registered with Grow support as the `notifyUrl`.

---

## Part 2 — Cloudflare Worker

### Credentials (from .env)

```
CLOUDFLARE_ACCOUNT_ID=...
GROW_WEBHOOK_KEY=...
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=...
```

### Deploy the Worker

Or has already scaffolded the Worker. Navigate to the `worker/` directory:

```bash
cd worker
npm install
npx wrangler deploy
```

Live URL: `https://lev-yam-webhook.orcohenwork.workers.dev` ✓ Deployed

### Worker code — `worker/index.js`

```javascript
// paymentDesc slugs as set in the Grow dashboard for each package
const VALID_PACKAGES = new Set(['b2b-lite', 'b2b-classic', 'b2b-gold']);

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('Invalid JSON', { status: 400 });
    }

    // 1. Verify webhookKey — always first, return 401 if wrong
    if (body.webhookKey !== env.GROW_WEBHOOK_KEY) {
      return new Response('Unauthorized', { status: 401 });
    }

    // 2. Only accept the three known packages
    if (!VALID_PACKAGES.has(body.paymentDesc)) {
      return new Response('Unknown package', { status: 400 });
    }

    // 3. Build purchase row
    const purchase = {
      full_name: body.fullName || 'Unknown',
      payment_sum: Number(body.paymentSum) || 0,
      payment_type: body.paymentType || '',
      payment_date: body.paymentDate || '',
      package: body.paymentDesc,
      payer_phone: body.payerPhone || '',
      payer_email: body.payerEmail || '',
      transaction_code: body.transactionCode || '',
    };

    // 4. Write to Supabase
    const supabaseRes = await fetch(`${env.SUPABASE_URL}/rest/v1/levyam-b2b`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': env.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(purchase),
    });

    if (!supabaseRes.ok) {
      const err = await supabaseRes.text();
      console.error('Supabase error:', err);
      return new Response('Supabase write failed', { status: 500 });
    }

    return new Response('OK', { status: 200 });
  },
};
```

### Set environment variables in Cloudflare

```bash
npx wrangler secret put GROW_WEBHOOK_KEY
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_ANON_KEY
```

---

## Part 3 — Supabase schema (already created by Or)

Table: `levyam-b2b`

Note: columns to be reviewed and finalized based on exact Grow webhook payload before hackathon day.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | auto, primary key |
| `full_name` | text | `fullName` — buyer name |
| `payment_sum` | numeric | `paymentSum` — cast from string to number |
| `payment_type` | text | `paymentType` — e.g. "רגיל" |
| `payment_date` | text | `paymentDate` — as returned by Grow |
| `package` | text | `paymentDesc` — package slug: `b2b-lite` / `b2b-classic` / `b2b-gold` |
| `payer_phone` | text | `payerPhone` |
| `payer_email` | text | `payerEmail` |
| `transaction_code` | text | `transactionCode` — Grow transaction ID |
| `created_at` | timestamptz | auto |

Enable Row Level Security → add policy: allow anon SELECT and INSERT.

---

## Part 4 — Landing page live feed + progress bar

Add this to `js/main.js`:

```javascript
const SUPABASE_URL = 'https://xxxx.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key'; // safe to expose — RLS protects data

async function fetchPurchases() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/levyam-b2b?select=full_name,package,payment_sum,created_at&order=created_at.desc&limit=10`,
    { headers: { 'apikey': SUPABASE_ANON_KEY } }
  );
  return res.json();
}

async function updateFeed() {
  const purchases = await fetchPurchases();

  // Update purchase feed
  const feed = document.getElementById('purchase-feed');
  if (feed) {
    feed.innerHTML = purchases.map(p =>
      `<div class="purchase-item">${p.full_name} — ${p.package} — ₪${p.payment_sum}</div>`
    ).join('');
  }

  // Update progress bar (example: max 20 spots)
  const MAX_SPOTS = 20;
  const filled = purchases.length;
  const bar = document.getElementById('progress-bar');
  if (bar) {
    bar.style.width = Math.min((filled / MAX_SPOTS) * 100, 100) + '%';
  }
  const counter = document.getElementById('spots-counter');
  if (counter) {
    counter.textContent = `${filled} / ${MAX_SPOTS} spots filled`;
  }
}

// Poll every 5 seconds
updateFeed();
setInterval(updateFeed, 5000);
```

---

## Part 5 — Test the full flow on hackathon day

Before the live 10 ₪ payment, run this to confirm the Worker is working:

```bash
curl -X POST https://lev-yam-webhook.orcohenwork.workers.dev \
  -H "Content-Type: application/json" \
  -d '{
    "webhookKey": "YOUR_GROW_WEBHOOK_KEY",
    "transactionCode": "HACKTEST001",
    "fullName": "Yair Test",
    "paymentSum": 10,
    "paymentDate": "14/04/26",
    "paymentDesc": "Company Offsite Day"
  }'
```

Expected:
- Response: `OK` (200)
- Supabase: new row in `levyam-b2b` table

If both pass → do the live 10 ₪ payment. 🎉

---

## Grow webhook payload reference

Confirmed from a real test transaction on 15/04/26:

```json
{
  "webhookKey": "...",
  "identifyParam": "",
  "transactionCode": "LtD5y5bIMQi1O0onrB+g6g==",
  "transactionType": "אשראי",
  "paymentSum": "0.15",
  "paymentsNum": 0,
  "allPaymentNum": "1",
  "firstPaymentSum": 0,
  "periodicalPaymentSum": 0,
  "paymentType": "רגיל",
  "paymentDate": "15/4/26",
  "asmachta": "477443216",
  "paymentDesc": "b2b-lite",
  "fullName": "Or Cohen",
  "payerPhone": "0506663467",
  "payerEmail": "orcohenwork@gmail.com",
  "cardSuffix": "4547",
  "cardBrand": "Mastercard",
  "cardType": "Local",
  "cardBin": "552517",
  "paymentSource": "Payment Links",
  "ip": "212.199.111.82",
  "invoiceURL": "",
  "invoiceName": "",
  "invoiceLicenseNumber": ""
}
```

Notes:
- `paymentSum` arrives as a **string**, not a number — cast with `Number()`
- `purchasePageKey` and `purchasePageTitle` are **not sent** by Grow
- `paymentDesc` is the package slug set in the Grow dashboard: `b2b-lite` / `b2b-classic` / `b2b-gold`
- `webhookKey` is the security check — never store it

---

## Notes

- No `approveTransaction` call needed — this is a standalone Grow static page, not the Light API
- The `webhookKey` is your security check — always verify it first, return 401 if it doesn't match
- The Supabase anon key is safe to expose in client-side JS — Row Level Security controls what's readable
- Grow support contact for any webhook issues: [email protected]
