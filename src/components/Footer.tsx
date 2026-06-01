"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { QrCode, Star, ExternalLink } from 'lucide-react';

import { BRAND_NAME } from '../constants';

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
    <footer className="bg-white pt-24 pb-12 px-8 text-stone-500 border-t border-stone-100">
      <div className="max-w-[1800px] mx-auto">

        {/* Main Link Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-20 pb-20 border-b border-stone-100">

          {/* Brand Column */}
          <div className="md:col-span-4">
            <Link href="/" className="mb-8 block">
              <span className="font-serif text-2xl text-stone-900 tracking-widest hover:opacity-70 transition-opacity">
                Mel&rsquo;s Fashion
              </span>
            </Link>
            <p className="max-w-xs font-light leading-relaxed mb-8 italic">
              Handcrafted excellence from the heart of Nairobi.
              Quality leather, timeless design, urban chic.
            </p>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] space-y-4">
              <p className="flex items-center gap-4"><span className="text-stone-300">HQ:</span> Nairobi, Kenya</p>
              <p className="flex items-center gap-4"><span className="text-stone-300">TEL:</span> +254 740 899 918</p>
              <p className="flex items-center gap-4"><span className="text-stone-300">EML:</span> hello@mellsfashion.co.ke</p>
            </div>
            <div className="mt-10 flex gap-4 items-center">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-md border border-stone-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-green-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600">M-Pesa Accepted</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300">Secure Payments</span>
            </div>
          </div>

          {/* Collections */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-stone-900 mb-8 tracking-[0.2em] text-[10px] uppercase">Collections</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/shop" className="hover:text-stone-900 transition-colors">Digital Lookbook</Link></li>
              <li><Link href="/shop/new-arrivals" className="hover:text-stone-900 transition-colors">Latest Release</Link></li>
              <li><Link href="/shop/leather-handbags" className="hover:text-stone-900 transition-colors">Leather Classics</Link></li>
              <li><Link href="/shop/sale" className="hover:text-stone-900 text-red-500 transition-colors font-medium">Sale</Link></li>
            </ul>
          </div>

          {/* Shopping Guides — NEW SEO Section */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-stone-900 mb-8 tracking-[0.2em] text-[10px] uppercase">Shopping Guides</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/knowledge-hub/best-leather-bags-for-women" className="hover:text-stone-900 transition-colors">Best Bags for Women</Link></li>
              <li><Link href="/knowledge-hub/best-work-bags-for-professionals" className="hover:text-stone-900 transition-colors">Best Work Bags</Link></li>
              <li><Link href="/knowledge-hub/best-travel-bags" className="hover:text-stone-900 transition-colors">Best Travel Bags</Link></li>
              <li><Link href="/knowledge-hub/how-to-choose-the-perfect-handbag" className="hover:text-stone-900 transition-colors">How to Choose a Bag</Link></li>
              <li><Link href="/knowledge-hub/leather-bag-buying-guide" className="hover:text-stone-900 transition-colors">Buying Guide</Link></li>
            </ul>
          </div>

          {/* Knowledge Hub — NEW SEO Section */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-stone-900 mb-8 tracking-[0.2em] text-[10px] uppercase">Knowledge Hub</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/knowledge-hub/what-is-genuine-leather" className="hover:text-stone-900 transition-colors">What Is Real Leather?</Link></li>
              <li><Link href="/knowledge-hub/how-to-clean-leather-bags" className="hover:text-stone-900 transition-colors">How to Clean Leather</Link></li>
              <li><Link href="/knowledge-hub/how-to-protect-leather-during-rainy-seasons" className="hover:text-stone-900 transition-colors">Rainy Season Care</Link></li>
              <li><Link href="/knowledge-hub/why-kenyan-leather-is-unique" className="hover:text-stone-900 transition-colors">Kenyan Leather Story</Link></li>
              <li><Link href="/knowledge-hub" className="hover:text-stone-900 transition-colors font-medium text-stone-700">All 23 Guides →</Link></li>
            </ul>
          </div>

          {/* Maison */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-stone-900 mb-8 tracking-[0.2em] text-[10px] uppercase">Maison</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/about" className="hover:text-stone-900 transition-colors">Our Heritage</Link></li>
              <li><Link href="/contact" className="hover:text-stone-900 transition-colors">Concierge</Link></li>
              <li><Link href="/blog" className="hover:text-stone-900 transition-colors">The Journal</Link></li>
              <li>
                <button
                  onClick={() => scrollToSection('reviews')}
                  className="hover:text-stone-900 transition-colors text-left uppercase text-[10px] font-bold tracking-widest"
                >
                  Client Reviews
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Google Review QR Widget + Newsletter — Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-20 pt-20 pb-16 border-b border-stone-100">

          {/* Google Review QR Code */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-2xl p-8 flex gap-8 items-center">
              {/* QR Code SVG Placeholder — styled as a QR icon with Google colors */}
              <div className="shrink-0 w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-md relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Simulated QR code pattern */}
                  <svg viewBox="0 0 100 100" className="w-20 h-20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Top-left finder pattern */}
                    <rect x="5" y="5" width="30" height="30" rx="3" fill="#1a1a1a"/>
                    <rect x="10" y="10" width="20" height="20" rx="2" fill="white"/>
                    <rect x="14" y="14" width="12" height="12" rx="1" fill="#1a1a1a"/>
                    {/* Top-right finder pattern */}
                    <rect x="65" y="5" width="30" height="30" rx="3" fill="#1a1a1a"/>
                    <rect x="70" y="10" width="20" height="20" rx="2" fill="white"/>
                    <rect x="74" y="14" width="12" height="12" rx="1" fill="#1a1a1a"/>
                    {/* Bottom-left finder pattern */}
                    <rect x="5" y="65" width="30" height="30" rx="3" fill="#1a1a1a"/>
                    <rect x="10" y="70" width="20" height="20" rx="2" fill="white"/>
                    <rect x="14" y="74" width="12" height="12" rx="1" fill="#1a1a1a"/>
                    {/* Data dots — simulated pattern */}
                    <rect x="40" y="5" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="50" y="5" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="40" y="15" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="55" y="15" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="40" y="25" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="5" y="40" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="15" y="40" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="25" y="40" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="40" y="40" width="5" height="5" rx="1" fill="#4285F4"/>
                    <rect x="50" y="40" width="5" height="5" rx="1" fill="#EA4335"/>
                    <rect x="60" y="40" width="5" height="5" rx="1" fill="#FBBC04"/>
                    <rect x="70" y="40" width="5" height="5" rx="1" fill="#34A853"/>
                    <rect x="80" y="40" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="90" y="40" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="5" y="50" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="20" y="50" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="40" y="50" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="55" y="50" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="70" y="50" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="85" y="50" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="40" y="60" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="50" y="60" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="60" y="60" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="75" y="60" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="40" y="70" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="55" y="70" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="70" y="70" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="85" y="70" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="40" y="80" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="50" y="80" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="60" y="80" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="40" y="90" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="55" y="90" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="80" y="90" width="5" height="5" rx="1" fill="#1a1a1a"/>
                    <rect x="90" y="90" width="5" height="5" rx="1" fill="#1a1a1a"/>
                  </svg>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <h4 className="font-serif text-lg text-white leading-tight">Love your bag?<br />Leave us a review!</h4>
                <p className="text-stone-300 text-xs font-light leading-relaxed">Scan to share your experience on Google and help other shoppers.</p>
                <a
                  href="https://g.page/r/mellsfashion/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:text-white transition-colors"
                >
                  Review on Google <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-center">
            <h4 className="font-bold text-stone-900 mb-4 tracking-[0.2em] text-[10px] uppercase">Stay Inspired</h4>
            <p className="text-sm font-light mb-8 italic">Join our inner circle for early access and Nairobi workshop stories.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
                className="flex-1 bg-transparent border-b border-stone-200 py-3 text-lg outline-none focus:border-stone-900 transition-colors placeholder-stone-300 text-stone-900 disabled:opacity-50 font-serif"
              />
              <button
                onClick={handleSubscribe}
                disabled={subscribeStatus !== 'idle' || !email}
                className="text-[10px] font-bold uppercase tracking-[0.3em] py-2 border-b-2 border-stone-900 hover:text-stone-400 hover:border-stone-400 transition-all disabled:opacity-30 shrink-0"
              >
                {subscribeStatus === 'idle' && 'Subscribe'}
                {subscribeStatus === 'loading' && '...'}
                {subscribeStatus === 'success' && 'Subscribed ✓'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] text-stone-300">
          <p>© {new Date().getFullYear()} Mel's Fashion Nairobi — Handcrafted in Kilimani</p>
          <div className="flex gap-12 mt-8 md:mt-0">
            <a href="#" className="hover:text-stone-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
