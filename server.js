import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Supabase config
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// M-PESA config
const consumerKey = 'pyK8OIlCRRIYMUrqaOCtjYiL7AEJC6X1lzhtTEGcNPoS2WlA';
const consumerSecret = 'isWlKoJAdTS5361uMn5mRGkMrc6dCAA9Q6fC0dGLvOWak8OW6FRAW9Q4e3cM5GI5';
// Sandbox Defaults
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
    } catch (error) {
        console.error('Error getting access token', error.response?.data || error.message);
        throw error;
    }
};

app.post('/api/mpesa/pay', async (req, res) => {
    const { phone, amount, orderId } = req.body;
    try {
        const token = await getAccessToken();
        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3); // YYYYMMDDHHmmss
        const password = Buffer.from(`${shortCode}${passKey}${timestamp}`).toString('base64');

        // Note: Formatting phone number to 254...
        let formattedPhone = phone.trim();
        if (formattedPhone.startsWith('0')) {
            formattedPhone = '254' + formattedPhone.substring(1);
        } else if (formattedPhone.startsWith('+')) {
            formattedPhone = formattedPhone.substring(1);
        }

        const stkPayload = {
            BusinessShortCode: shortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: Math.round(amount),
            PartyA: formattedPhone,
            PartyB: shortCode,
            PhoneNumber: formattedPhone,
            CallBackURL: "https://mydomain.com/path", // This would be the ngrok URL 
            AccountReference: `Order-${orderId}`,
            TransactionDesc: "Payment for Order"
        };

        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            stkPayload,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // Simulated Callback processing for Local Dev since Daraja cannot hit localhost
        // Real logic would wait for webhooks
        setTimeout(async () => {
            console.log(`[Local Simulation] M-Pesa Payment simulated success for order ${orderId}`);
            await supabase.from('orders').update({
                status: 'paid',
                mpesa_receipt_number: `SIM${Date.now()}`.substring(0, 10),
                checkout_request_id: response.data.CheckoutRequestID
            }).eq('id', orderId);
        }, 8000); // Wait 8s before auto approving for demo effect

        res.json({ success: true, checkoutRequestId: response.data.CheckoutRequestID });
    } catch (error) {
        console.error('STK Push Error:', error.response?.data || error.message);
        res.status(500).json({ success: false, message: 'Payment failed to initiate' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`M-Pesa API proxy running on http://localhost:${PORT}`);
});
