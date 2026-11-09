import { NextResponse } from 'next/server';
import { getAdminClient, settleVerifiedOrder, verifyPaystackTransaction } from '@/lib/paystack';

export async function GET(_req: Request, { params }: { params: Promise<{ reference: string }> }) {
  try {
    const { reference } = await params;
    if (!reference || reference.length > 128) {
      return NextResponse.json({ success: false, message: 'Invalid payment reference.' }, { status: 400 });
    }
    const transaction = await verifyPaystackTransaction(reference);
    const result = await settleVerifiedOrder(getAdminClient(), transaction);
    return NextResponse.json({ success: true, order: result.orderId, alreadyPaid: result.alreadyPaid });
  } catch (error) {
    console.error('Paystack verification error:', error);
    return NextResponse.json({ success: false, message: 'Payment could not be verified.' }, { status: 400 });
  }
}
