
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import { Product } from '../types';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CheckoutProps {
  items: Product[];
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBack }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handlePayment = async () => {
    setLoading(true);
    
    if (paymentMethod === 'mpesa') {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;
        
        const { data: orderData, error: orderError } = await supabase.from('orders').insert({
          customer_id: userId,
          phone_number: phone,
          amount: total,
          items: items,
          status: 'pending'
        }).select().single();

        if (orderError) throw orderError;

        const res = await fetch('/api/mpesa/pay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, amount: total, orderId: orderData.id })
        });
        const data = await res.json();
        
        if (data.success) {
           setStep('success'); 
        } else {
           alert('Payment failed to initiate: ' + (data.message || ''));
        }
      } catch (err: any) {
        console.error(err);
        alert('An error occurred during payment: ' + err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // Simulate card payment
      setTimeout(() => {
        setLoading(false);
        setStep('success');
      }, 2000);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2EB] px-6">
        <div className="max-w-md w-full text-center space-y-8 animate-fade-in-up">
          <div className="flex justify-center">
            <CheckCircle2 className="w-20 h-20 text-green-600" />
          </div>
          <h1 className="text-4xl font-serif text-[#2C2A26]">Order Confirmed!</h1>
          <p className="text-[#5D5A53] font-light leading-relaxed">
            Thank you for shopping with Mel's Fashion. We've received your order and will begin processing it immediately. You'll receive a confirmation email shortly.
          </p>
          <button 
            onClick={onBack}
            className="w-full py-4 bg-[#2C2A26] text-[#F5F2EB] uppercase tracking-widest text-sm font-medium hover:bg-[#433E38] transition-colors"
          >
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-[#F5F2EB] animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A8A29E] hover:text-[#2C2A26] transition-colors mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Form */}
          <div className="space-y-12">
            <h1 className="text-3xl font-serif text-[#2C2A26]">Checkout</h1>
            
            {step === 'details' ? (
              <div className="space-y-12">
                {/* Section 1: Contact */}
                <div>
                  <h2 className="text-xl font-serif text-[#2C2A26] mb-6">Contact Information</h2>
                  <div className="space-y-4">
                     <input type="email" placeholder="Email address" className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" />
                  </div>
                </div>

                {/* Section 2: Shipping */}
                <div>
                  <h2 className="text-xl font-serif text-[#2C2A26] mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="First name" className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" />
                        <input type="text" placeholder="Last name" className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" />
                     </div>
                     <input type="text" placeholder="Address" className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" />
                     <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="City" className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" />
                        <input type="text" placeholder="Phone Number" className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" />
                     </div>
                  </div>
                </div>

                <button 
                  onClick={() => setStep('payment')}
                  className="w-full py-5 bg-[#2C2A26] text-[#F5F2EB] uppercase tracking-widest text-sm font-medium hover:bg-[#433E38] transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                <div>
                  <h2 className="text-xl font-serif text-[#2C2A26] mb-6">Payment Method</h2>
                  <div className="space-y-4">
                    <div 
                      onClick={() => setPaymentMethod('mpesa')}
                      className={`p-6 border cursor-pointer transition-all ${paymentMethod === 'mpesa' ? 'border-[#2C2A26] bg-white' : 'border-[#D6D1C7] bg-transparent'}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-medium">M-Pesa</span>
                        <div className="w-4 h-4 rounded-full border border-[#D6D1C7] flex items-center justify-center">
                          {paymentMethod === 'mpesa' && <div className="w-2 h-2 rounded-full bg-[#2C2A26]" />}
                        </div>
                      </div>
                      {paymentMethod === 'mpesa' && (
                        <div className="space-y-4 animate-fade-in">
                          <p className="text-xs text-[#5D5A53]">Enter your M-Pesa phone number. You will receive a prompt on your phone to enter your PIN.</p>
                          <input 
                            type="tel" 
                            placeholder="07XX XXX XXX" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" 
                          />
                        </div>
                      )}
                    </div>

                    <div 
                      onClick={() => setPaymentMethod('card')}
                      className={`p-6 border cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#2C2A26] bg-white' : 'border-[#D6D1C7] bg-transparent'}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-medium">Credit / Debit Card</span>
                        <div className="w-4 h-4 rounded-full border border-[#D6D1C7] flex items-center justify-center">
                          {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-[#2C2A26]" />}
                        </div>
                      </div>
                      {paymentMethod === 'card' && (
                        <div className="space-y-4 animate-fade-in">
                          <input type="text" placeholder="Card number" className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" />
                          <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="MM/YY" className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" />
                            <input type="text" placeholder="CVC" className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep('details')}
                    className="flex-1 py-5 border border-[#2C2A26] text-[#2C2A26] uppercase tracking-widest text-sm font-medium hover:bg-[#2C2A26] hover:text-[#F5F2EB] transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handlePayment}
                    disabled={loading || (paymentMethod === 'mpesa' && !phone)}
                    className="flex-[2] py-5 bg-[#2C2A26] text-[#F5F2EB] uppercase tracking-widest text-sm font-medium hover:bg-[#433E38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : `Pay KES ${total.toLocaleString()}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Summary */}
          <div className="lg:pl-12 lg:border-l border-[#D6D1C7]">
            <h2 className="text-xl font-serif text-[#2C2A26] mb-8">Order Summary</h2>
            
            <div className="space-y-6 mb-8">
               {items.map((item, idx) => (
                 <div key={idx} className="flex gap-4">
                    <div className="w-16 h-16 bg-[#EBE7DE] relative">
                       <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                       <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#2C2A26] text-white text-[10px] flex items-center justify-center rounded-full">1</span>
                    </div>
                    <div className="flex-1">
                       <h3 className="font-serif text-[#2C2A26] text-base">{item.name}</h3>
                       <p className="text-xs text-[#A8A29E]">{item.category}</p>
                    </div>
                    <span className="text-sm text-[#5D5A53]">KES {item.price.toLocaleString()}</span>
                 </div>
               ))}
            </div>

            <div className="border-t border-[#D6D1C7] pt-6 space-y-2">
              <div className="flex justify-between text-sm text-[#5D5A53]">
                 <span>Subtotal</span>
                 <span>KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-[#5D5A53]">
                 <span>Shipping</span>
                 <span>(Not Inclusive)</span>
              </div>
            </div>
            
            <div className="border-t border-[#D6D1C7] mt-6 pt-6">
               <div className="flex justify-between items-center">
                 <span className="font-serif text-xl text-[#2C2A26]">Total</span>
                 <div className="flex items-end gap-2">
                   <span className="text-xs text-[#A8A29E] mb-1">KES</span>
                   <span className="font-serif text-2xl text-[#2C2A26]">{total.toLocaleString()}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
