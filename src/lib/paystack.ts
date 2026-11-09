import 'server-only';

import crypto from 'node:crypto';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export type PaystackTransaction = {
  id?: number;
  status?: string;
  reference?: string;
  amount?: number;
  currency?: string;
  paid_at?: string | null;
  channel?: string | null;
  metadata?: { order_id?: string } | null;
};

type Order = {
  id: string;
  amount: number | string;
  status: string;
  payment_reference: string | null;
};

export function getAdminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Supabase server credentials are not configured.');
  }
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export function getPaystackSecretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key || !/^sk_(test|live)_/.test(key)) {
    throw new Error('PAYSTACK_SECRET_KEY is missing or invalid.');
  }
  return key;
}

export function createPaymentReference(): string {
  return `mels_${crypto.randomUUID()}`;
}

export function amountInSmallestUnit(amountKes: number): number {
  if (!Number.isFinite(amountKes) || amountKes <= 0) {
    throw new Error('Order amount must be a positive finite number.');
  }
  return Math.round(amountKes * 100);
}

export async function verifyPaystackTransaction(reference: string): Promise<PaystackTransaction> {
  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: { Authorization: `Bearer ${getPaystackSecretKey()}` },
      cache: 'no-store',
    },
  );
  const result = (await response.json()) as { status?: boolean; message?: string; data?: PaystackTransaction };
  if (!response.ok || !result.status || !result.data) {
    throw new Error(result.message || 'Paystack verification failed.');
  }
  return result.data;
}

export async function settleVerifiedOrder(
  supabase: SupabaseClient,
  transaction: PaystackTransaction,
): Promise<{ orderId: string; alreadyPaid: boolean }> {
  const reference = transaction.reference;
  const orderId = transaction.metadata?.order_id;
  if (
    transaction.status !== 'success' ||
    transaction.currency !== 'KES' ||
    !reference ||
    !orderId ||
    !Number.isInteger(transaction.amount) ||
    transaction.amount <= 0
  ) {
    throw new Error('Paystack transaction is not a valid successful KES payment.');
  }

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('id, amount, status, payment_reference')
    .eq('id', orderId)
    .eq('payment_reference', reference)
    .single<Order>();
  if (orderError || !order) throw new Error('Order not found for this payment reference.');

  const expectedAmount = amountInSmallestUnit(Number(order.amount));
  if (expectedAmount !== transaction.amount) {
    throw new Error('Paystack amount does not match the order amount.');
  }

  if (order.status === 'paid' || order.status === 'completed') {
    return { orderId: order.id, alreadyPaid: true };
  }

  // The status predicate makes callback/webhook retries and concurrent delivery idempotent.
  const { data: updated, error: updateError } = await supabase
    .from('orders')
    .update({
      status: 'paid',
      payment_date: transaction.paid_at || new Date().toISOString(),
      payment_provider: 'paystack',
      payment_channel: transaction.channel || null,
      payment_transaction_id: transaction.id ? String(transaction.id) : null,
      payment_verified_at: new Date().toISOString(),
      notes: `Paystack payment verified (${reference}).`,
    })
    .eq('id', order.id)
    .eq('payment_reference', reference)
    .in('status', ['pending', 'failed'])
    .select('id')
    .maybeSingle();
  if (updateError) throw updateError;

  // A second delivery sees the already-paid order and returns successfully.
  if (!updated) return { orderId: order.id, alreadyPaid: true };
  return { orderId: order.id, alreadyPaid: false };
}

export function isValidPaystackSignature(rawBody: string, signature: string): boolean {
  if (!signature) return false;
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret || !/^sk_(test|live)_/.test(secret)) return false;
  const expected = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
  const received = Buffer.from(signature, 'utf8');
  const expectedBuffer = Buffer.from(expected, 'utf8');
  return received.length === expectedBuffer.length && crypto.timingSafeEqual(received, expectedBuffer);
}
