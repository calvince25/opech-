"use client";

import React, { useState } from 'react';
import { useCart } from '@/providers/CartProvider';
import { useAuth } from '@/providers/AuthProvider';
import { Loader2, CheckCircle2, ShieldCheck, Truck, ChevronLeft, Package } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: 'Nairobi',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const setField = (key: keyof typeof form, val: string) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.phone || form.phone.trim().length < 9) {
      alert('Please enter a valid phone number.');
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customer_id: user?.id || null,
        phone_number: form.phone,
        amount: subtotal,
        items: cartItems,
        status: 'pending',
        shipping_address: {
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          address: form.address,
          city: form.city,
        },
      };

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert(orderPayload)
        .select()
        .single();

      if (orderError) {
        throw new Error(`Order registration failed: ${orderError.message}`);
      }

      if (!orderData) {
        throw new Error('Order was created but no data was returned.');
      }

      setOrderId(orderData.id);

      // Attempt M-Pesa STK push if configured
      try {
        const res = await fetch('/api/mpesa/pay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: form.phone,
            amount: subtotal,
            orderId: orderData.id,
          }),
        });
        const mpesaData = await res.json();
        if (!mpesaData.success) {
          console.warn('STK push did not succeed:', mpesaData.message);
          // Order is still recorded — success screen shown anyway
        }
      } catch (mpesaErr) {
        console.warn('M-Pesa API not configured or failed:', mpesaErr);
        // Non-fatal: order is saved, show success
      }

      clearCart();
      setOrderSuccess(true);
    } catch (err: any) {
      console.error('Checkout Error:', err);
      alert('Something went wrong: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  /* ─── Empty Cart ─── */
  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F2EB] px-6 text-center gap-8">
        <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center">
          <Package className="w-10 h-10 text-stone-300" />
        </div>
        <h1 className="text-3xl font-serif text-stone-900">Your cart is empty.</h1>
        <p className="text-stone-500 font-light max-w-xs">
          Browse our handcrafted collection and add pieces you love.
        </p>
        <button
          onClick={() => router.push('/shop')}
          className="px-12 py-5 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-800 transition-all shadow-xl rounded-full"
        >
          Shop the Collection
        </button>
      </div>
    );
  }

  /* ─── Success Screen ─── */
  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2EB] px-6">
        <div className="max-w-md w-full text-center space-y-10">
          <div className="flex justify-center">
            <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-14 h-14 text-green-500" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-serif text-stone-900">Order Placed!</h1>
            <p className="text-stone-500 font-light leading-relaxed">
              Thank you, <strong>{form.firstName}</strong>! Your order has been received. We'll reach out to{' '}
              <strong>{form.phone}</strong> shortly to confirm delivery details.
            </p>
            {form.email && (
              <p className="text-stone-400 text-sm italic">
                A confirmation will also be sent to {form.email}.
              </p>
            )}
          </div>
          <div className="bg-white rounded-2xl p-6 border border-stone-100 text-left space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Order Summary</p>
            {cartItems.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-stone-700">{item.name}</span>
                <span className="font-bold text-stone-900">KES {item.price.toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t border-stone-100 pt-3 mt-3 flex justify-between font-serif text-base">
              <span>Subtotal</span>
              <span>KES {subtotal.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-stone-400 italic text-center pt-1">
              Delivery fee to be confirmed at dispatch
            </p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="w-full py-5 bg-stone-900 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-800 transition-all shadow-xl"
          >
            Continue Shopping →
          </button>
        </div>
      </div>
    );
  }

  /* ─── Main Checkout ─── */
  return (
    <div className="min-h-screen pt-28 pb-24 px-6 md:px-12 bg-[#F5F2EB]">
      <div className="max-w-[1400px] mx-auto">
        {/* Back link */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors mb-12"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

          {/* ─── Left: Delivery Form ─── */}
          <div className="lg:col-span-7">
            <div className="mb-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-2">Step 1 of 1</p>
              <h1 className="text-4xl font-serif text-stone-900">Delivery Details</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Contact */}
              <div className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-stone-500 pb-2 border-b border-stone-200">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      First Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.firstName}
                      onChange={e => setField('firstName', e.target.value)}
                      placeholder="e.g. Amina"
                      className="w-full bg-transparent border-b-2 border-stone-200 py-3 text-stone-900 placeholder-stone-300 outline-none focus:border-stone-900 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      Last Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.lastName}
                      onChange={e => setField('lastName', e.target.value)}
                      placeholder="e.g. Wanjiku"
                      className="w-full bg-transparent border-b-2 border-stone-200 py-3 text-stone-900 placeholder-stone-300 outline-none focus:border-stone-900 transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setField('email', e.target.value)}
                    placeholder="amina@example.com"
                    className="w-full bg-transparent border-b-2 border-stone-200 py-3 text-stone-900 placeholder-stone-300 outline-none focus:border-stone-900 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    Phone Number (M-Pesa) *
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={e => setField('phone', e.target.value)}
                    placeholder="07XX XXX XXX"
                    className="w-full bg-transparent border-b-2 border-stone-200 py-3 text-stone-900 placeholder-stone-300 outline-none focus:border-stone-900 transition-colors font-bold tracking-widest text-lg"
                  />
                  <p className="text-[10px] text-stone-400 italic">
                    You'll receive an M-Pesa STK push on this number to complete payment.
                  </p>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-stone-500 pb-2 border-b border-stone-200">
                  Delivery Address
                </h2>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    Street / Estate / Building *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.address}
                    onChange={e => setField('address', e.target.value)}
                    placeholder="e.g. Westlands, Mpaka Road, ABC Apartments"
                    className="w-full bg-transparent border-b-2 border-stone-200 py-3 text-stone-900 placeholder-stone-300 outline-none focus:border-stone-900 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    City *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.city}
                    onChange={e => setField('city', e.target.value)}
                    placeholder="Nairobi"
                    className="w-full bg-transparent border-b-2 border-stone-200 py-3 text-stone-900 placeholder-stone-300 outline-none focus:border-stone-900 transition-colors"
                  />
                </div>
              </div>

              {/* Delivery note */}
              <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5">
                <Truck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">
                    Delivery Fee Not Included
                  </p>
                  <p className="text-xs text-amber-600 font-light leading-relaxed">
                    The prices shown are <strong>exclusive of delivery</strong>. Our team will contact you with the delivery fee before dispatch.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-stone-950 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-800 active:scale-[0.98] transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    Place Order
                    <span className="opacity-50 w-4 h-px bg-white" />
                    KES {subtotal.toLocaleString()}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ─── Right: Order Summary ─── */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 md:p-10 sticky top-28 border border-stone-100 shadow-sm">
              <h2 className="text-xl font-serif text-stone-900 mb-8">
                Order Preview
              </h2>

              {/* Items */}
              <div className="space-y-6 mb-8">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-18 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-stone-50 border border-stone-100 relative"
                         style={{ width: '72px', height: '80px' }}>
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-stone-900 text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                        1
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-sm font-bold text-stone-900 mb-0.5 leading-tight">{item.name}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{item.category}</p>
                    </div>
                    <div className="flex flex-col justify-center items-end">
                      <span className="text-sm font-bold text-stone-900">
                        KES {item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-stone-100 pt-6 space-y-3">
                <div className="flex justify-between items-center text-sm text-stone-500">
                  <span>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</span>
                  <span className="font-bold text-stone-900">KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-stone-500">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-stone-300" />
                    <span>Delivery</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
                    Exclusive
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 mt-2 border-t border-stone-100">
                  <span className="text-lg font-serif text-stone-900">Total Due</span>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-bold text-stone-400">KES</span>
                      <span className="text-3xl font-serif text-stone-900">{subtotal.toLocaleString()}</span>
                    </div>
                    <p className="text-[9px] text-stone-400 italic">+ delivery (confirmed later)</p>
                  </div>
                </div>
              </div>

              {/* Security badge */}
              <div className="mt-8 flex items-start gap-4 bg-stone-50 rounded-2xl p-5">
                <ShieldCheck className="w-5 h-5 text-stone-700 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-700">Secure Checkout</p>
                  <p className="text-[10px] text-stone-400 font-light mt-0.5 leading-relaxed">
                    Your data is encrypted. We never store your payment details.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
