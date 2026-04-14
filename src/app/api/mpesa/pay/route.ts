import { NextResponse } from 'next/server';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Supabase config
// NOTE: Ideally use SUPABASE_SERVICE_ROLE_KEY on the server to bypass RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// M-PESA config (Mel's Fashion Daraja Credentials)
const consumerKey = 'pyK8OIlCRRIYMUrqaOCtjYiL7AEJC6X1lzhtTEGcNPoS2WlA';
const consumerSecret = 'isWlKoJAdTS5361uMn5mRGkMrc6dCAA9Q6fC0dGLvOWak8OW6FRAW9Q4e3cM5GI5';
const passKey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
const shortCode = '174379';

const getAccessToken = async () => {
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    try {
        const response = await axios.get(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            { headers: { Authorization: `Basic ${credentials}` } }
        );
        return response.data.access_token;
    } catch (error: any) {
        console.error('Error getting access token', error.response?.data || error.message);
        throw error;
    }
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { phone, amount, orderId } = body;

        if (!phone || !amount || !orderId) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        const token = await getAccessToken();
        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3); // YYYYMMDDHHmmss
        const password = Buffer.from(`${shortCode}${passKey}${timestamp}`).toString('base64');

        // Phone number formatting (2547XXXXXXXX)
        let formattedPhone = phone.trim().replace(/\D/g, '');
        if (formattedPhone.startsWith('0')) {
            formattedPhone = '254' + formattedPhone.substring(1);
        } else if (formattedPhone.startsWith('+')) {
            formattedPhone = formattedPhone.substring(1);
        } else if (!formattedPhone.startsWith('254')) {
            formattedPhone = '254' + formattedPhone;
        }

        const host = req.headers.get('host');
        const protocol = req.headers.get('x-forwarded-proto') || 'https';
        const callbackUrl = `${protocol}://${host}/api/mpesa/callback`;

        const stkPayload = {
            BusinessShortCode: shortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: Math.round(amount),
            PartyA: formattedPhone,
            PartyB: shortCode,
            PhoneNumber: formattedPhone,
            CallBackURL: callbackUrl, 
            AccountReference: `Mel-${orderId.slice(0, 8)}`,
            TransactionDesc: "Mel's Fashion Purchase"
        };

        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            stkPayload,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // Update order with CheckoutRequestID immediately
        await supabase.from('orders').update({
            checkout_request_id: response.data.CheckoutRequestID
        }).eq('id', orderId);

        // Simulation for Demo: Auto-approve in Sandbox if no callback expected
        // In production, the callback route handles this.
        if (process.env.NODE_ENV === 'development' || host?.includes('localhost')) {
            setTimeout(async () => {
                await supabase.from('orders').update({
                    status: 'paid',
                    mpesa_receipt_number: `DEMO${Date.now()}`.substring(0, 10),
                    payment_date: new Date().toISOString()
                }).eq('id', orderId);
            }, 8000);
        }

        return NextResponse.json({ 
            success: true, 
            checkoutRequestId: response.data.CheckoutRequestID 
        });

    } catch (error: any) {
        console.error('STK Push Error:', error.response?.data || error.message);
        return NextResponse.json({ 
            success: false, 
            message: 'Payment initiation failed. Please check your phone number and try again.' 
        }, { status: 500 });
    }
}
