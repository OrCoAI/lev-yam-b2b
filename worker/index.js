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

    // 2. Build purchase row — store all Grow payload fields except webhookKey
    const purchase = {
      full_name: body.fullName || body.data?.fullName || 'Unknown',
      payment_sum: body.paymentSum || body.data?.sum || 0,
      payment_type: body.paymentType || body.data?.paymentType || '',
      payment_date: body.paymentDate || body.data?.paymentDate || '',
      package: body.paymentDesc || body.data?.description || '',
      payer_phone: body.payerPhone || body.data?.payerPhone || '',
      payer_email: body.payerEmail || body.data?.payerEmail || '',
      transaction_code: body.transactionCode || body.data?.transactionId || '',
      purchase_page_key: body.purchasePageKey || body.data?.purchasePageKey || '',
      purchase_page_title: body.purchasePageTitle || body.data?.purchasePageTitle || '',
    };

    // 3. Write to Supabase
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
