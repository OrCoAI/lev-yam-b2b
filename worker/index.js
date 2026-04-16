// paymentDesc slugs as set in the Grow dashboard for each package
const VALID_PACKAGES = new Set(['b2b-lite', 'b2b-classic', 'b2b-gold']);

// Notification recipients
const MORAN_EMAIL = 'moranstiassny@gmail.com';
const OR_EMAIL    = 'orcohenwork@gmail.com';
const MORAN_PHONE = '+972544515990';

// Package display names in Hebrew
const PACKAGE_NAMES = {
  'b2b-lite':    'לייט',
  'b2b-classic': 'קלאסיק',
  'b2b-gold':    'גולד',
};

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
      full_name:        body.fullName        || 'Unknown',
      payment_sum:      Number(body.paymentSum) || 0,
      payment_type:     body.paymentType     || '',
      payment_date:     body.paymentDate     || '',
      package:          body.paymentDesc,
      payer_phone:      body.payerPhone      || '',
      payer_email:      body.payerEmail      || '',
      transaction_code: body.transactionCode || '',
    };

    // 4. Write to Supabase
    const supabaseRes = await fetch(`${env.SUPABASE_URL}/rest/v1/levyam-b2b`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        env.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
        'Prefer':        'return=minimal',
      },
      body: JSON.stringify(purchase),
    });

    if (!supabaseRes.ok) {
      const err = await supabaseRes.text();
      console.error('Supabase error:', err);
      return new Response('Supabase write failed', { status: 500 });
    }

    // 5. Send notifications in parallel (fire-and-forget — don't fail the webhook if they error)
    await Promise.allSettled([
      sendEmail(purchase, env),
      sendSms(env),
    ]);

    return new Response('OK', { status: 200 });
  },
};

// ── Email via Resend ──────────────────────────────────────────────────────────
// Requires secret: RESEND_API_KEY
// Requires secret: RESEND_FROM_EMAIL (e.g. "לב ים <noreply@levyam.com>")
async function sendEmail(purchase, env) {
  const packageHebrew = PACKAGE_NAMES[purchase.package] || purchase.package;

  const html = `
<div dir="rtl" style="font-family: Arial, sans-serif; font-size: 15px; color: #222;">
  <h2 style="color: #0a5c7a;">🎉 מכירה חדשה — לב ים</h2>
  <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
    <tr>
      <td style="padding: 8px 12px; background: #f3f3f3; font-weight: bold; border: 1px solid #ddd;">שם הלקוח</td>
      <td style="padding: 8px 12px; border: 1px solid #ddd;">${purchase.full_name}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f3f3f3; font-weight: bold; border: 1px solid #ddd;">חבילה</td>
      <td style="padding: 8px 12px; border: 1px solid #ddd;">${packageHebrew} (${purchase.package})</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f3f3f3; font-weight: bold; border: 1px solid #ddd;">סכום</td>
      <td style="padding: 8px 12px; border: 1px solid #ddd;">₪${purchase.payment_sum.toLocaleString('he-IL')}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f3f3f3; font-weight: bold; border: 1px solid #ddd;">אמצעי תשלום</td>
      <td style="padding: 8px 12px; border: 1px solid #ddd;">${purchase.payment_type}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f3f3f3; font-weight: bold; border: 1px solid #ddd;">תאריך עסקה</td>
      <td style="padding: 8px 12px; border: 1px solid #ddd;">${purchase.payment_date}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f3f3f3; font-weight: bold; border: 1px solid #ddd;">טלפון לקוח</td>
      <td style="padding: 8px 12px; border: 1px solid #ddd;">${purchase.payer_phone}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f3f3f3; font-weight: bold; border: 1px solid #ddd;">אימייל לקוח</td>
      <td style="padding: 8px 12px; border: 1px solid #ddd;">${purchase.payer_email}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f3f3f3; font-weight: bold; border: 1px solid #ddd;">קוד עסקה</td>
      <td style="padding: 8px 12px; border: 1px solid #ddd;">${purchase.transaction_code}</td>
    </tr>
  </table>
</div>
  `.trim();

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from:    env.RESEND_FROM_EMAIL,
      to:      [MORAN_EMAIL, OR_EMAIL],
      subject: 'מכירה חדשה בקמפיין לב ים',
      html,
    }),
  });

  if (!res.ok) {
    console.error('Resend email error:', res.status, await res.text());
  }
}

// ── SMS via Twilio ────────────────────────────────────────────────────────────
// Requires secret: TWILIO_ACCOUNT_SID
// Requires secret: TWILIO_AUTH_TOKEN
// Requires secret: TWILIO_FROM_NUMBER (your Twilio number, e.g. +12025551234)
async function sendSms(env) {
  const body = new URLSearchParams({
    To:   MORAN_PHONE,
    From: env.TWILIO_FROM_NUMBER,
    Body: 'מכירה חדשה בקמפיין לב ים, פרטים נוספים מחכים לך במייל.',
  });

  const credentials = btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`);
  const url = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`,
    },
    body: body.toString(),
  });

  if (!res.ok) {
    console.error('Twilio SMS error:', await res.text());
  }
}
