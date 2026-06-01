import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import StructuredData from '@/components/SEO/StructuredData';
import { Star, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: "Contact Us | Mel's Fashion | Premium Handbags Nairobi",
  description: "Get in touch with the Mel's Fashion team in Nairobi. Whether you have a question about our handcrafted bags, need help with an order, or want to say hello.",
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <StructuredData type="LocalBusiness" data={{}} />

      {/* Hero */}
      <div className="relative w-full h-[60vh] min-h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200"
          alt="Contact Mel's Fashion"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-20 px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/70 mb-6 block">Customer Care</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 lowercase italic">Get in Touch</h1>
          <p className="max-w-xl mx-auto text-white/90 font-light text-lg">
            We are here to assist you with any inquiries about our handcrafted products, custom orders, or general questions.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-20 bg-[#F5F2EB]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <ContactForm />
        </div>
      </div>

      {/* Google Review QR Section */}
      <div className="bg-stone-900 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400 mb-4 block">Customer Feedback</span>
            <h2 className="text-4xl font-serif text-white mb-4">Happy With Your Bag?</h2>
            <p className="text-stone-300 font-light text-lg max-w-xl mx-auto">
              Your review helps other shoppers discover Kenyan handcrafted luxury and supports our local artisans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* QR Code Card */}
            <div className="bg-stone-800 rounded-3xl p-10 flex flex-col items-center text-center space-y-6 border border-stone-700">
              {/* QR code SVG */}
              <div className="w-40 h-40 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                <svg viewBox="0 0 100 100" className="w-32 h-32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="5" width="30" height="30" rx="3" fill="#1a1a1a"/>
                  <rect x="10" y="10" width="20" height="20" rx="2" fill="white"/>
                  <rect x="14" y="14" width="12" height="12" rx="1" fill="#1a1a1a"/>
                  <rect x="65" y="5" width="30" height="30" rx="3" fill="#1a1a1a"/>
                  <rect x="70" y="10" width="20" height="20" rx="2" fill="white"/>
                  <rect x="74" y="14" width="12" height="12" rx="1" fill="#1a1a1a"/>
                  <rect x="5" y="65" width="30" height="30" rx="3" fill="#1a1a1a"/>
                  <rect x="10" y="70" width="20" height="20" rx="2" fill="white"/>
                  <rect x="14" y="74" width="12" height="12" rx="1" fill="#1a1a1a"/>
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
                  <rect x="5" y="50" width="5" height="5" rx="1" fill="#1a1a1a"/>
                  <rect x="20" y="50" width="5" height="5" rx="1" fill="#1a1a1a"/>
                  <rect x="40" y="50" width="5" height="5" rx="1" fill="#1a1a1a"/>
                  <rect x="55" y="50" width="5" height="5" rx="1" fill="#1a1a1a"/>
                  <rect x="70" y="50" width="5" height="5" rx="1" fill="#1a1a1a"/>
                  <rect x="40" y="60" width="5" height="5" rx="1" fill="#1a1a1a"/>
                  <rect x="55" y="60" width="5" height="5" rx="1" fill="#1a1a1a"/>
                  <rect x="70" y="60" width="5" height="5" rx="1" fill="#1a1a1a"/>
                  <rect x="40" y="70" width="5" height="5" rx="1" fill="#1a1a1a"/>
                  <rect x="60" y="70" width="5" height="5" rx="1" fill="#1a1a1a"/>
                  <rect x="80" y="70" width="5" height="5" rx="1" fill="#1a1a1a"/>
                  <rect x="40" y="80" width="5" height="5" rx="1" fill="#1a1a1a"/>
                  <rect x="55" y="80" width="5" height="5" rx="1" fill="#1a1a1a"/>
                  <rect x="40" y="90" width="5" height="5" rx="1" fill="#1a1a1a"/>
                  <rect x="65" y="90" width="5" height="5" rx="1" fill="#1a1a1a"/>
                  <rect x="85" y="90" width="5" height="5" rx="1" fill="#1a1a1a"/>
                </svg>
              </div>
              <div>
                <p className="text-stone-300 text-sm font-light mb-2">Scan with your phone camera</p>
                <p className="text-white font-serif text-xl">Leave a Google Review</p>
              </div>
              <div className="flex gap-1 justify-center">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            {/* Text CTA */}
            <div className="space-y-8 text-center md:text-left">
              <div className="space-y-4">
                <h3 className="text-2xl font-serif text-white">3 Reasons to Leave a Review</h3>
                <ul className="space-y-4 text-stone-300 font-light text-sm">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-yellow-400 text-stone-900 rounded-full font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <span>Help other Kenyan women discover genuine, locally handcrafted luxury bags</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-yellow-400 text-stone-900 rounded-full font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <span>Support our local Kilimani artisans and their families directly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-yellow-400 text-stone-900 rounded-full font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <span>Takes only 60 seconds and makes a big difference to a small local brand</span>
                  </li>
                </ul>
              </div>
              <a
                href="https://g.page/r/mellsfashion/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-stone-900 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-stone-100 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open Google Review Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
