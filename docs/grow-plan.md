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
  3. Fire Dynatrace alert
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
DYNATRACE_INGEST_URL=https://xxxx.live.dynatrace.com/api/v2/events/ingest
DYNATRACE_API_TOKEN=...
```

### Deploy the Worker

Or has already scaffolded the Worker. Navigate to the `worker/` directory:

```bash
cd worker
npm install
npx wrangler deploy
```

This gives you the live URL: `https://lev-yam-webhook.YOUR_SUBDOMAIN.workers.dev`

### Worker code — `worker/index.js`

```javascript
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

    // 1. Verify webhookKey
    if (body.webhookKey !== env.GROW_WEBHOOK_KEY) {
      return new Response('Unauthorized', { status: 401 });
    }

    // 2. Write to Supabase
    const purchase = {
      full_name: body.fullName || body.data?.fullName || 'Unknown',
      payment_sum: body.paymentSum || body.data?.sum || 0,
      package: body.paymentDesc || body.data?.description || '',
      payment_date: body.paymentDate || body.data?.paymentDate || '',
      transaction_code: body.transactionCode || body.data?.transactionId || '',
    };

    await fetch(`${env.SUPABASE_URL}/rest/v1/purchases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': env.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(purchase),
    });

    // 3. Fire Dynatrace alert
    await fetch(env.DYNATRACE_INGEST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Api-Token ${env.DYNATRACE_API_TOKEN}`,
      },
      body: JSON.stringify({
        eventType: 'CUSTOM_INFO',
        title: 'New Lev Yam Purchase',
        properties: {
          customer: purchase.full_name,
          amount: String(purchase.payment_sum),
          package: purchase.package,
        },
      }),
    });

    return new Response('OK', { status: 200 });
  },
};
```

### Set environment variables in Cloudflare

```bash
npx wrangler secret put GROW_WEBHOOK_KEY
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_ANON_KEY
npx wrangler secret put DYNATRACE_INGEST_URL
npx wrangler secret put DYNATRACE_API_TOKEN
```

---

## Part 3 — Supabase schema (already created by Or)

Table: `purchases`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | auto, primary key |
| `full_name` | text | buyer name from Grow |
| `payment_sum` | numeric | amount in ₪ |
| `package` | text | which package was bought |
| `payment_date` | text | as returned by Grow |
| `transaction_code` | text | Grow transaction ID |
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
    `${SUPABASE_URL}/rest/v1/purchases?select=full_name,package,payment_sum,created_at&order=created_at.desc&limit=10`,
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
curl -X POST https://lev-yam-webhook.YOUR_SUBDOMAIN.workers.dev \
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
- Supabase: new row in `purchases` table
- Dynatrace: "New Lev Yam Purchase" event visible

If all three pass → do the live 10 ₪ payment. 🎉

---

## Grow webhook payload reference

Note: Grow sends different formats depending on system type. Handle both:

**Static payment page (legacy system):**
```json
{
  "webhookKey": "ABC1234",
  "transactionCode": "ABCD1234",
  "paymentSum": 500,
  "paymentType": "רגיל",
  "paymentDate": "14/04/26",
  "paymentDesc": "Company Offsite Day",
  "fullName": "Full Name",
  "payerPhone": "0500000000",
  "payerEmail": "[email protected]",
  "purchasePageKey": "ABCD1234",
  "purchasePageTitle": "Company Offsite Day"
}
```

The Worker code above handles both formats via the `||` fallbacks on each field.

---

## Notes

- No `approveTransaction` call needed — this is a standalone Grow static page, not the Light API
- The `webhookKey` is your security check — always verify it first, return 401 if it doesn't match
- The Supabase anon key is safe to expose in client-side JS — Row Level Security controls what's readable
- Grow support contact for any webhook issues: [email protected]
