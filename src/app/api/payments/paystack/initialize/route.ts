import { NextResponse } from 'next/server';
import { amountInSmallestUnit, createPaymentReference, getAdminClient, getPaystackSecretKey } from '@/lib/paystack';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mellsfashion.co.ke';

export async function POST(req: Request) {
  let orderId: string | null = null;
  try {
    const body = await req.json();
    const { customer, items } = body;
    if (!customer?.email || !customer?.firstName || !customer?.lastName || !customer?.phone || !customer?.address || !customer?.city) {
      return NextResponse.json({ message: 'Please complete all required customer and delivery details.' }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0 || items.some((item) => !item?.id)) {
      return NextResponse.json({ message: 'Your cart is empty or invalid.' }, { status: 400 });
    }

    const supabase = getAdminClient();
    const productIds = items.map((item: { id: string }) => item.id);
    const { data: products, error: productError } = await supabase
      .from('products')
      .select('id, name, price, image_url, category')
      .in('id', productIds);
    if (productError) throw productError;
    if (!products || products.length !== productIds.length) {
      return NextResponse.json({ message: 'One or more products are no longer available.' }, { status: 400 });
    }

    const productMap = new Map(products.map((product) => [product.id, product]));
    const verifiedItems = productIds.map((id: string) => {
      const product = productMap.get(id);
      return { id: product.id, name: product.name, price: Number(product.price), image_url: product.image_url, category: product.category };
    });
    const amountKes = verifiedItems.reduce((sum, item) => sum + item.price, 0);
    const amount = amountInSmallestUnit(amountKes);
    const paymentReference = createPaymentReference();

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: null,
        phone_number: String(customer.phone).trim(),
        amount: amountKes,
        items: verifiedItems,
        status: 'pending',
        payment_provider: 'paystack',
        payment_reference: paymentReference,
        shipping_address: {
          name: `${customer.firstName} ${customer.lastName}`.trim(),
          email: String(customer.email).trim().toLowerCase(),
          address: String(customer.address).trim(),
          city: String(customer.city).trim(),
        },
      })
      .select('id')
      .single();
    if (orderError || !order) throw orderError || new Error('Unable to create order.');
    orderId = order.id;

    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: { Authorization: `Bearer ${getPaystackSecretKey()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: String(customer.email).trim().toLowerCase(),
        amount: String(amount),
        currency: 'KES',
        reference: paymentReference,
        callback_url: `${siteUrl}/payment/callback`,
        metadata: { order_id: order.id, payment_reference: paymentReference },
      }),
    });
    const paystackData = await paystackResponse.json();
    if (!paystackResponse.ok || !paystackData.status || !paystackData.data?.authorization_url) {
      await supabase.from('orders').update({ status: 'failed', notes: 'Paystack initialization failed.' }).eq('id', order.id).eq('status', 'pending');
      return NextResponse.json({ message: paystackData.message || 'Paystack could not initialize the payment.' }, { status: 502 });
    }
    return NextResponse.json({ authorization_url: paystackData.data.authorization_url, reference: paymentReference });
  } catch (error) {
    console.error('Paystack initialization error:', error);
    if (orderId) {
      try {
        await getAdminClient().from('orders').update({ status: 'failed', notes: 'Payment initialization error.' }).eq('id', orderId).eq('status', 'pending');
      } catch {}
    }
    return NextResponse.json({ message: 'Unable to start payment. Please try again.' }, { status: 500 });
  }
}
