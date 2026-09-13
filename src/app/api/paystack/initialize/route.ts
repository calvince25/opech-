import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mellsfashion.co.ke';

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase server credentials are not configured.');
  return createClient(url, key);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items } = body;

    if (!customer?.email || !customer?.firstName || !customer?.lastName || !customer?.phone || !customer?.address || !customer?.city) {
      return NextResponse.json({ message: 'Please complete all required customer and delivery details.' }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: 'Your cart is empty.' }, { status: 400 });
    }

    const supabase = getAdminClient();
    const productIds = items.map((item: { id?: string }) => item.id).filter(Boolean);
    const { data: products, error: productError } = await supabase
      .from('products')
      .select('id, name, price, image_url, category')
      .in('id', productIds);

    if (productError) throw productError;
    if (!products || products.length !== productIds.length) {
      return NextResponse.json({ message: 'One or more products are no longer available.' }, { status: 400 });
    }

    const productMap = new Map(products.map((product) => [product.id, product]));
    const verifiedItems = items.map((item: { id: string }) => {
      const product = productMap.get(item.id);
      return {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image_url: product.image_url,
        category: product.category,
      };
    });
    const amountKes = verifiedItems.reduce((sum: number, item: { price: number }) => sum + item.price, 0);
    if (!Number.isFinite(amountKes) || amountKes <= 0) {
      return NextResponse.json({ message: 'The order total is invalid.' }, { status: 400 });
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: null,
        phone_number: customer.phone,
        amount: amountKes,
        items: verifiedItems,
        status: 'pending',
        shipping_address: {
          name: `${customer.firstName} ${customer.lastName}`.trim(),
          email: customer.email,
          address: customer.address,
          city: customer.city,
        },
      })
      .select('id, amount')
      .single();

    if (orderError || !order) throw orderError || new Error('Unable to create order.');

    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: customer.email,
        amount: String(Math.round(amountKes * 100)),
        currency: 'KES',
        callback_url: `${siteUrl}/api/paystack/callback`,
        metadata: {
          order_id: order.id,
          customer_name: `${customer.firstName} ${customer.lastName}`.trim(),
        },
      }),
    });

    const paystackData = await paystackResponse.json();
    if (!paystackResponse.ok || !paystackData.status || !paystackData.data?.authorization_url) {
      await supabase.from('orders').update({ status: 'failed', notes: 'Paystack initialization failed.' }).eq('id', order.id);
      return NextResponse.json({ message: paystackData.message || 'Paystack could not initialize the payment.' }, { status: 502 });
    }

    await supabase.from('orders').update({
      notes: `Paystack reference: ${paystackData.data.reference}`,
    }).eq('id', order.id);

    return NextResponse.json({ authorization_url: paystackData.data.authorization_url });
  } catch (error) {
    console.error('Paystack initialization error:', error);
    return NextResponse.json({ message: 'Unable to start payment. Please try again.' }, { status: 500 });
  }
}
