import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase server credentials are not configured.');
  return createClient(url, key);
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature') || '';
    const expected = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY || '').update(rawBody).digest('hex');

    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (!signature || signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
      return NextResponse.json({ message: 'Invalid signature.' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    if (event.event !== 'charge.success') return NextResponse.json({ received: true });

    const transaction = event.data;
    const orderId = transaction?.metadata?.order_id;
    if (!orderId || transaction.status !== 'success' || transaction.currency !== 'KES') {
      return NextResponse.json({ received: true });
    }

    const supabase = getAdminClient();
    const { data: order } = await supabase.from('orders').select('id, amount, status').eq('id', orderId).single();
    if (order && Math.round(Number(order.amount) * 100) === Number(transaction.amount) && order.status !== 'paid' && order.status !== 'completed') {
      await supabase.from('orders').update({
        status: 'paid',
        payment_date: transaction.paid_at || new Date().toISOString(),
        notes: `Paid via Paystack webhook (${transaction.reference}), channel: ${transaction.channel || 'unknown'}`,
      }).eq('id', orderId);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Paystack webhook error:', error);
    return NextResponse.json({ received: false }, { status: 500 });
  }
}
