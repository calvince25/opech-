"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Footer() {
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [email, setEmail] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribeStatus('loading');
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
    }, 1500);
  };

  const scrollToSection = (id: string) => {
    if (pathname !== '/') {
      router.push(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white pt-32 pb-12 px-8 text-stone-500 border-t border-stone-100">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">

        <div className="md:col-span-4">
          <Link href="/" className="text-3xl font-serif text-stone-900 mb-8 block">Mel's Fashion</Link>
          <p className="max-w-xs font-light leading-relaxed mb-8 italic">
            Handcrafted excellence from the heart of Nairobi. 
            Quality leather, timeless design, urban chic.
          </p>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] space-y-4">
            <p className="flex items-center gap-4"><span className="text-stone-300">HQ:</span> Nairobi, Kenya</p>
            <p className="flex items-center gap-4"><span className="text-stone-300">TEL:</span> +254 740 899 918</p>
            <p className="flex items-center gap-4"><span className="text-stone-300">EML:</span> hello@mellsfasion.co.ke</p>
          </div>
          <div className="mt-12 flex gap-4 items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-md border border-stone-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-green-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600">M-Pesa Accepted</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300">Secure Payments</span>
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-bold text-stone-900 mb-8 tracking-[0.2em] text-[10px] uppercase">Collections</h4>
          <ul className="space-y-4 text-sm font-light">
            <li><Link href="/shop" className="hover:text-stone-900 transition-colors">Digital Lookbook</Link></li>
            <li><Link href="/shop/new-arrivals" className="hover:text-stone-900 transition-colors">Latest Release</Link></li>
            <li><Link href="/shop/leather-handbags" className="hover:text-stone-900 transition-colors">Leather Classics</Link></li>
            <li><Link href="/shop/sale" className="hover:text-stone-900 text-red-500 transition-colors font-medium">Sale</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-bold text-stone-900 mb-8 tracking-[0.2em] text-[10px] uppercase">Maison</h4>
          <ul className="space-y-4 text-sm font-light">
            <li><Link href="/about" className="hover:text-stone-900 transition-colors">Our Heritage</Link></li>
            <li><Link href="/contact" className="hover:text-stone-900 transition-colors">Concierge</Link></li>
            <li><Link href="/blog" className="hover:text-stone-900 transition-colors">The Journal</Link></li>
            <li><button onClick={() => scrollToSection('reviews')} className="hover:text-stone-900 transition-colors text-left uppercase text-[10px] font-bold tracking-widest">Client Reviews</button></li>
          </ul>
        </div>

        <div className="md:col-span-4 lg:pl-12">
          <h4 className="font-bold text-stone-900 mb-8 tracking-[0.2em] text-[10px] uppercase">Stay Inspired</h4>
          <p className="text-sm font-light mb-8 italic">Join our inner circle for early access and Nairobi workshop stories.</p>
          <div className="flex flex-col gap-6">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
              className="bg-transparent border-b border-stone-200 py-3 text-lg outline-none focus:border-stone-900 transition-colors placeholder-stone-300 text-stone-900 disabled:opacity-50 font-serif"
            />
            <button
              onClick={handleSubscribe}
              disabled={subscribeStatus !== 'idle' || !email}
              className="self-start text-[10px] font-bold uppercase tracking-[0.3em] py-2 border-b-2 border-stone-900 hover:text-stone-400 hover:border-stone-400 transition-all disabled:opacity-30"
            >
              {subscribeStatus === 'idle' && 'Subscribe'}
              {subscribeStatus === 'loading' && '...'}
              {subscribeStatus === 'success' && 'Subscribed'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto mt-32 pt-12 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] text-stone-300">
        <p>© {new Date().getFullYear()} Mel's Fashion Nairobi</p>
        <div className="flex gap-12 mt-8 md:mt-0">
            <a href="#" className="hover:text-stone-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
