"use client";

import React, { useState } from 'react';
import { useCart } from '@/providers/CartProvider';
import { useAuth } from '@/providers/AuthProvider';
import { Loader2, CheckCircle2, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: 'Nairobi',
    email: user?.email || '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = 0; // Not inclusive, but we show it as "Pending" or similar
  const total = subtotal + shipping;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = async () => {
    if (paymentMethod === 'mpesa' && !phone) {
        alert('Please enter your M-Pesa phone number.');
        return;
    }
    
    setLoading(true);
    
    try {
      // 1. Create Order in DB
      // We do this first regardless of payment method to get an Order ID
      const { data: orderData, error: orderError } = await supabase.from('orders').insert({
        customer_id: user?.id,
        phone_number: paymentMethod === 'mpesa' ? phone : shippingDetails.email,
        amount: total,
        items: cartItems,
        status: 'pending',
        shipping_address: shippingDetails
      }).select().single();

      if (orderError) throw orderError;

      if (paymentMethod === 'mpesa') {
        // 2. Trigger M-Pesa STK Push
        const res = await fetch('/api/mpesa/pay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            phone, 
            amount: total, 
            orderId: orderData.id
          })
        });
        
        const data = await res.json();
        
        if (data.success) {
           // We show the success screen, but the order is "pending" in DB until callback
           setStep('success');
           clearCart();
        } else {
           throw new Error(data.message || 'M-Pesa payment failed to initiate.');
        }
      } else {
        // Simulation for Card/Other
        await new Promise(r => setTimeout(r, 2000));
        
        await supabase.from('orders').update({
            status: 'paid',
            notes: 'Paid via Card (Simulation)'
        }).eq('id', orderData.id);

        setStep('success');
        clearCart();
      }
    } catch (err: any) {
      console.error(err);
      alert('Checkout failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F2EB] px-6 text-center">
        <h1 className="text-3xl font-serif text-stone-900 mb-6">Your cart is empty.</h1>
        <button onClick={() => router.push('/shop')} className="px-12 py-5 bg-stone-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest">Start Shopping</button>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2EB] px-6">
        <div className="max-w-md w-full text-center space-y-10 animate-fade-in">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl lg:text-5xl font-serif text-stone-900 mb-4">Ordered.</h1>
            <p className="text-stone-500 font-light leading-relaxed italic">
              Thank you for choosing Mel's Fashion. Your handcrafted piece is being prepared for delivery. We'll contact you shortly at {phone || shippingDetails.email}.
            </p>
          </div>
          <button 
            onClick={() => router.push('/')}
            className="w-full py-5 bg-stone-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl"
          >
            Continue to Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-[#F5F2EB]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
            
            {/* Left: Form */}
            <div className="lg:col-span-7 space-y-16">
              <div className="flex items-center gap-12 border-b border-stone-200 pb-8">
                <div className={`flex items-center gap-4 ${step === 'details' ? 'text-stone-900' : 'text-stone-400'}`}>
                  <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${step === 'details' ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-400'}`}>1</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Shipping</span>
                </div>
                <div className={`flex items-center gap-4 ${step === 'payment' ? 'text-stone-900' : 'text-stone-400'}`}>
                  <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${step === 'payment' ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-400'}`}>2</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Payment</span>
                </div>
              </div>

              {step === 'details' ? (
                <form onSubmit={handleDetailsSubmit} className="space-y-12">
                  <div className="space-y-8">
                    <h2 className="text-2xl font-serif text-stone-900">Delivery Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">First Name</label>
                        <input required type="text" value={shippingDetails.firstName} onChange={e => setShippingDetails({...shippingDetails, firstName: e.target.value})} className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-stone-900 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Last Name</label>
                        <input required type="text" value={shippingDetails.lastName} onChange={e => setShippingDetails({...shippingDetails, lastName: e.target.value})} className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-stone-900 transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Email Address</label>
                      <input required type="email" value={shippingDetails.email} onChange={e => setShippingDetails({...shippingDetails, email: e.target.value})} className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-stone-900 transition-colors" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Shipping Address (Nairobi Home/Office)</label>
                       <input required type="text" value={shippingDetails.address} onChange={e => setShippingDetails({...shippingDetails, address: e.target.value})} className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-stone-900 transition-colors" />
                    </div>
                  </div>

                  <button type="submit" className="w-full py-6 bg-stone-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-800 transition-all">Continue to Payment</button>
                </form>
              ) : (
                <div className="space-y-12 animate-in fade-in duration-500">
                  <div className="space-y-8">
                    <h2 className="text-2xl font-serif text-stone-900">Choose Payment Method</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div 
                        onClick={() => setPaymentMethod('mpesa')}
                        className={`p-8 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'mpesa' ? 'border-stone-900 bg-white shadow-xl' : 'border-stone-200 hover:border-stone-400'}`}
                      >
                         <div className="flex justify-between items-start mb-6">
                            <img src="https://img.icons8.com/color/48/m-pesa.png" alt="M-Pesa" className="h-10" />
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'mpesa' ? 'border-stone-900' : 'border-stone-300'}`}>
                               {paymentMethod === 'mpesa' && <div className="w-2.5 h-2.5 bg-stone-900 rounded-full" />}
                            </div>
                         </div>
                         <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-2">M-Pesa Express</h3>
                         <p className="text-xs text-stone-500 font-light leading-relaxed">Fast, secure checkout via phone prompt.</p>
                      </div>

                      <div 
                        onClick={() => setPaymentMethod('card')}
                        className={`p-8 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-stone-900 bg-white shadow-xl' : 'border-stone-200 hover:border-stone-400 opacity-60'}`}
                      >
                         <div className="flex justify-between items-start mb-6">
                            <CreditCard className="w-10 h-10 text-stone-400" />
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-stone-900' : 'border-stone-300'}`}>
                               {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-stone-900 rounded-full" />}
                            </div>
                         </div>
                         <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-2">Credit Card</h3>
                         <p className="text-xs text-stone-500 font-light leading-relaxed">International payments accepted.</p>
                      </div>
                    </div>

                    {paymentMethod === 'mpesa' && (
                      <div className="space-y-4 pt-6 animate-in slide-in-from-top-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">M-Pesa Phone Number</label>
                        <input 
                          required 
                          type="tel" 
                          placeholder="07XX XXX XXX"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full bg-white px-6 py-5 rounded-2xl border border-stone-200 outline-none focus:border-stone-900 transition-all font-bold text-lg tracking-widest"
                        />
                        <p className="text-[10px] text-stone-400 italic">You will receive an STK Push on your phone to enter your M-Pesa PIN.</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-6">
                    <button onClick={() => setStep('details')} className="px-12 py-5 border border-stone-200 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-50 transition-all">Back</button>
                    <button 
                      onClick={handlePayment}
                      disabled={loading || (paymentMethod === 'mpesa' && !phone)}
                      className="flex-1 py-6 bg-stone-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-800 transition-all disabled:opacity-50 flex items-center justify-center gap-4 shadow-xl"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Complete Order <span className="w-4 h-[1px] bg-white/40"></span> KES {total.toLocaleString()}</>}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white p-10 md:p-12 rounded-3xl sticky top-32 border border-stone-100 shadow-sm">
                <h2 className="text-2xl font-serif text-stone-900 mb-10">Your Selection</h2>
                <div className="space-y-8 mb-10">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="w-20 h-24 bg-stone-50 rounded-xl overflow-hidden flex-shrink-0 relative">
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-1 -right-1 w-6 h-6 bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">1</span>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-sm font-bold text-stone-900 mb-1">{item.name}</h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{item.category}</p>
                      </div>
                      <div className="flex flex-col justify-center items-end">
                        <span className="text-sm font-medium text-stone-900">KES {item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-10 border-t border-stone-100">
                  <div className="flex justify-between items-center text-sm font-light text-stone-500">
                    <span>Subtotal</span>
                    <span className="font-medium text-stone-900">KES {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-light text-stone-500">
                    <div className="flex items-center gap-2">
                       <span>Shipping</span>
                       <Truck className="w-4 h-4 text-stone-300" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-stone-50 rounded-full">Not Inclusive</span>
                  </div>
                  <div className="flex justify-between items-center pt-6 mt-4 border-t border-stone-100">
                    <span className="text-xl font-serif text-stone-900">Total</span>
                    <div className="flex items-end gap-2 text-stone-900">
                      <span className="text-xs font-bold uppercase tracking-widest mb-1">KES</span>
                      <span className="text-4xl font-serif tracking-tight">{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 bg-stone-50 rounded-2xl p-6 space-y-4">
                    <div className="flex items-start gap-4">
                        <ShieldCheck className="w-5 h-5 text-stone-900 mt-1" />
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900">Secure Checkout</p>
                            <p className="text-[10px] text-stone-500 font-light leading-relaxed">Your data is encrypted and protected by the highest security standards.</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
