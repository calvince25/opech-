import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mellsfashion.co.ke';

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase server credentials are not configured.');
  return createClient(url, key);
}

export async function GET(req: Request) {
  const reference = new URL(req.url).searchParams.get('reference');
  if (!reference) return NextResponse.redirect(`${siteUrl}/checkout?payment=failed`);

  try {
    const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      cache: 'no-store',
    });
    const result = await verifyResponse.json();
    const transaction = result.data;
    const orderId = transaction?.metadata?.order_id;

    if (!verifyResponse.ok || !result.status || !transaction || transaction.status !== 'success' || transaction.currency !== 'KES' || !orderId) {
      return NextResponse.redirect(`${siteUrl}/checkout?payment=failed`);
    }

    const supabase = getAdminClient();
    const { data: order, error: orderError } = await supabase.from('orders').select('id, amount, status').eq('id', orderId).single();
    if (orderError || !order || Math.round(Number(order.amount) * 100) !== Number(transaction.amount)) {
      return NextResponse.redirect(`${siteUrl}/checkout?payment=failed`);
    }

    if (order.status !== 'paid' && order.status !== 'completed') {
      await supabase.from('orders').update({
        status: 'paid',
        payment_date: transaction.paid_at || new Date().toISOString(),
        notes: `Paid via Paystack (${transaction.reference}), channel: ${transaction.channel || 'unknown'}`,
      }).eq('id', orderId);
    }

    return NextResponse.redirect(`${siteUrl}/checkout?payment=success&order=${encodeURIComponent(orderId)}`);
  } catch (error) {
    console.error('Paystack callback error:', error);
    return NextResponse.redirect(`${siteUrl}/checkout?payment=failed`);
  }
}
