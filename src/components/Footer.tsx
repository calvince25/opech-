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
            <div className="mt-8 flex gap-4">
              <a 
                href="https://www.instagram.com/mels_fashion_k.e?igsh=MWsweGs5ZXdtZjlrMg==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-stone-50 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-900 hover:text-white transition-all shadow-sm"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a 
                href="https://wa.me/254740899918" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-stone-50 rounded-full border border-stone-200 text-stone-600 hover:bg-green-600 hover:text-white transition-all shadow-sm"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.311 1.485 5.38 1.488 5.487 0 9.95-4.461 9.954-9.95.002-2.66-1.033-5.161-2.914-7.042C17.18 1.83 14.682.791 12.016.791c-5.495 0-9.958 4.462-9.962 9.952-.001 2.124.557 4.195 1.615 5.922l-.242 1.012-.862 3.149 3.22-.843.862.247zm9.648-6.195c-.244-.122-1.443-.712-1.668-.794-.224-.082-.387-.123-.55.123-.162.246-.628.795-.77 1-.142.205-.285.23-.529.107-1.09-.54-2.03-1.002-2.812-2.348-.152-.259 0-.399.13-.529.117-.117.244-.275.366-.412.122-.137.163-.23.244-.397.082-.164.041-.308-.02-.431-.06-.123-.55-1.32-.754-1.815-.198-.48-.4-.415-.55-.422H9.27c-.163 0-.427.061-.65.287-.224.226-.854.835-.854 2.037 0 1.201.874 2.361.995 2.525.122.164 1.722 2.628 4.171 3.687 2.062.894 2.45.712 2.902.662.453-.05 1.442-.589 1.644-1.157.204-.567.204-1.05.143-1.152-.061-.102-.224-.164-.468-.286z"/></svg>
              </a>
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
              {/* QR Code — High Resolution */}
              <div className="shrink-0 w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-md relative overflow-hidden p-2">
                <img 
                  src="/google-review-qr.png" 
                  alt="Google Review QR Code" 
                  className="w-full h-full object-contain"
                />
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
                  href="https://g.page/r/CQSxu8eF3_qjEBI/review"
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
          <p>
            © {new Date().getFullYear()} Mel's Fashion Nairobi — Handcrafted in Kilimani
            <span className="mx-3 text-stone-200">|</span>
            Designed by{' '}
            <a
              href="https://www.growthlab.co.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-stone-900 transition-colors underline decoration-stone-200 underline-offset-4"
            >
              growthlab
            </a>
          </p>
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
