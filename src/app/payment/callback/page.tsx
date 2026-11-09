"use client";

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('Verifying your payment securely…');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const reference = searchParams.get('reference');
    if (!reference) {
      setFailed(true);
      setMessage('We could not find a payment reference.');
      return;
    }
    fetch(`/api/payments/paystack/verify/${encodeURIComponent(reference)}`, { cache: 'no-store' })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || 'Payment verification failed.');
        router.replace(`/checkout?payment=success&order=${encodeURIComponent(result.order)}`);
      })
      .catch((error: Error) => {
        setFailed(true);
        setMessage(error.message || 'Payment could not be verified.');
      });
  }, [router, searchParams]);

  return (
    <main className="min-h-screen bg-[#F5F2EB] flex items-center justify-center px-6 text-center">
      <div className="max-w-md space-y-6">
        {failed ? <XCircle className="w-16 h-16 mx-auto text-red-500" /> : <CheckCircle2 className="w-16 h-16 mx-auto text-stone-700" />}
        <h1 className="text-3xl font-serif text-stone-900">{failed ? 'Payment not confirmed' : 'Checking your payment'}</h1>
        <p className="text-stone-500 font-light">{message}</p>
        {!failed && <Loader2 className="w-5 h-5 mx-auto animate-spin text-stone-500" />}
        {failed && <button onClick={() => router.replace('/checkout?payment=failed')} className="px-8 py-4 bg-stone-900 text-white rounded-full text-xs font-bold uppercase tracking-widest">Return to checkout</button>}
      </div>
    </main>
  );
}

export default function PaymentCallbackPage() {
  return <Suspense fallback={<main className="min-h-screen bg-[#F5F2EB] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></main>}><CallbackContent /></Suspense>;
}
