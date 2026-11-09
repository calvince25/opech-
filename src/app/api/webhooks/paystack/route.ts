import { NextResponse } from 'next/server';
import { getAdminClient, isValidPaystackSignature, settleVerifiedOrder, type PaystackTransaction } from '@/lib/paystack';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature') || '';
    if (!isValidPaystackSignature(rawBody, signature)) {
      return NextResponse.json({ message: 'Invalid signature.' }, { status: 401 });
    }
    const event = JSON.parse(rawBody) as { event?: string; data?: PaystackTransaction };
    if (event.event !== 'charge.success') return NextResponse.json({ received: true });
    if (!event.data) return NextResponse.json({ received: true });
    await settleVerifiedOrder(getAdminClient(), event.data);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Paystack webhook error:', error);
    return NextResponse.json({ received: false }, { status: 500 });
  }
}
