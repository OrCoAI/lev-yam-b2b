#!/bin/bash
# Pre-hackathon end-to-end test
# Run this after deploying the Worker to verify the full flow:
# POST → Supabase row
#
# Usage:
#   chmod +x test-webhook.sh
#   ./test-webhook.sh

# Load .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# --- CONFIGURE THESE ---
WORKER_URL="${WORKER_URL:-https://lev-yam-webhook.orcohenwork.workers.dev}"
WEBHOOK_KEY="${GROW_WEBHOOK_KEY:-YOUR_GROW_WEBHOOK_KEY}"
# -----------------------

echo "Sending test webhook to: $WORKER_URL"
echo ""

RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$WORKER_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"webhookKey\": \"$WEBHOOK_KEY\",
    \"transactionCode\": \"PRETEST_$(date +%s)\",
    \"fullName\": \"Or Test\",
    \"paymentSum\": 10,
    \"paymentType\": \"רגיל\",
    \"paymentDate\": \"$(date +%d/%m/%y)\",
    \"paymentDesc\": \"b2b-classic\",
    \"payerPhone\": \"0500000000\",
    \"payerEmail\": \"[email protected]\",
    \"purchasePageKey\": \"TESTPAGE001\",
    \"purchasePageTitle\": \"Company Offsite Day\"
  }")

echo "Response status: $RESPONSE"

if [ "$RESPONSE" = "200" ]; then
  echo "✓ Worker responded OK"
  echo ""
  echo "Now verify:"
  echo "  1. Supabase → check 'levyam-b2b' table for a new row (fullName: Or Test)"
  echo ""
  echo "If it passes → end-to-end test PASSED."
else
  echo "✗ Worker returned $RESPONSE — check Worker logs in Cloudflare dashboard"
fi
