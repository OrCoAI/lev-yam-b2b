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
