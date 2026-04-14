import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; 
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('M-Pesa Callback Received:', JSON.stringify(body, null, 2));

        if (!body.Body || !body.Body.stkCallback) {
            return NextResponse.json({ ResultCode: 1, ResultDesc: "Invalid Payload" });
        }

        const result = body.Body.stkCallback;
        const checkoutRequestID = result.CheckoutRequestID;
        const resultCode = result.ResultCode;
        
        if (resultCode === 0) {
            // Success
            const metadata = result.CallbackMetadata.Item;
            const amount = metadata.find((i: any) => i.Name === 'Amount')?.Value;
            const receipt = metadata.find((i: any) => i.Name === 'MpesaReceiptNumber')?.Value;
            const phone = metadata.find((i: any) => i.Name === 'PhoneNumber')?.Value;

            console.log(`Payment Success: ${receipt} for ${amount} from ${phone}`);

            // Update order status in Supabase
            const { error: updateError } = await supabase
                .from('orders')
                .update({ 
                    status: 'paid',
                    mpesa_receipt_number: receipt,
                    payment_date: new Date().toISOString(),
                    notes: `Paid KES ${amount} via M-Pesa. Phone: ${phone}`
                })
                .eq('checkout_request_id', checkoutRequestID);

            if (updateError) {
                console.error('Error updating order status:', updateError);
                return NextResponse.json({ ResultCode: 1, ResultDesc: "Internal Server Error" });
            }
        } else {
            // Failure or Canceled
            console.warn(`Payment Failed/Canceled for ${checkoutRequestID}: ${result.ResultDesc}`);
            await supabase
                .from('orders')
                .update({ 
                    status: 'failed', 
                    notes: `Payment failed: ${result.ResultDesc}` 
                })
                .eq('checkout_request_id', checkoutRequestID);
        }

        return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });

    } catch (error) {
        console.error('Callback Error:', error);
        return NextResponse.json({ ResultCode: 1, ResultDesc: "Internal Server Error" });
    }
}
