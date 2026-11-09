# Paystack setup for Mel's Fashion

## Required environment variables

Set these only in the deployment provider's encrypted environment settings and in a local untracked `.env.local` file:

```text
NEXT_PUBLIC_SUPABASE_URL=https://<the-correct-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Supabase publishable/anon key>
SUPABASE_SERVICE_ROLE_KEY=<Supabase service-role key>
PAYSTACK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...
NEXT_PUBLIC_SITE_URL=https://www.mellsfashion.co.ke
```

Never put `PAYSTACK_SECRET_KEY` in browser code, a `NEXT_PUBLIC_*` variable, GitHub, or an API response.

## Required Supabase migration

Run `paystack_migration.sql` once in the Supabase SQL editor for the same project used by the deployed site. It adds unique payment references and transaction audit fields.

## Paystack Dashboard test configuration

Configure these URLs in Paystack test mode:

- Webhook: `https://www.mellsfashion.co.ke/api/webhooks/paystack`
- Callback: `https://www.mellsfashion.co.ke/payment/callback`

The server verifies transactions through Paystack before marking an order as paid. A callback page alone never confirms payment.

## Test checklist

Use Paystack test mode first and record the order ID/reference for each test:

- successful card payment
- successful mobile-money payment where available
- failed payment
- abandoned payment
- duplicate webhook
- duplicate callback / refreshed callback page
- browser closed after payment
- invalid reference
- incorrect amount
- already-paid order
- cancelled order
- Paystack verification failure and timeout

Do not switch to live mode until all cases pass. Then replace only the deployment secrets with live credentials and perform one controlled real transaction.
