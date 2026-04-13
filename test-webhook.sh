#!/bin/bash
# Pre-hackathon end-to-end test
# Run this after deploying the Worker to verify the full flow:
# POST → Supabase row → Dynatrace alert
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
    \"paymentDate\": \"$(date +%d/%m/%y)\",
    \"paymentDesc\": \"Company Offsite Day\"
  }")

echo "Response status: $RESPONSE"

if [ "$RESPONSE" = "200" ]; then
  echo "✓ Worker responded OK"
  echo ""
  echo "Now verify:"
  echo "  1. Supabase → check 'purchases' table for a new row (fullName: Or Test)"
  echo "  2. Dynatrace → check for 'New Lev Yam Purchase' event"
  echo ""
  echo "If both pass → end-to-end test PASSED. Update Grow notifyUrl with: $WORKER_URL"
else
  echo "✗ Worker returned $RESPONSE — check Worker logs in Cloudflare dashboard"
fi
