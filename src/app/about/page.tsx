import React from 'react';
import { Metadata } from 'next';
import About from '@/components/About';
import StructuredData from '@/components/SEO/StructuredData';

export const metadata: Metadata = {
  title: 'Our Story | Handcrafted Heritage Nairobi | Mel\'s Fashion',
  description: 'Learn about Mel\'s Fashion, our heritage from Nairobi, and the artisans who handcraft every premium leather bag in our collection.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <StructuredData type="Organization" data={{}} />
      
      <div className="relative w-full h-[60vh] min-h-[500px]">
        <img 
          src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=2000" 
          alt="Mel's Fashion Heritage" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-20 px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/70 mb-6 block">Heritage</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 lowercase italic">Beyond the Stitches</h1>
          <p className="max-w-xl mx-auto text-white/90 font-light text-lg">
            Discover the passion, people, and processes that bring our premium leather goods to life in the heart of Nairobi.
          </p>
        </div>
      </div>
      
      <div className="py-20 bg-[#F5F2EB]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
            <About />
            
            {/* Expanded Content for About Page */}
            <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-8">
                    <h2 className="text-3xl font-serif text-stone-900">Nairobi Roots, Global Elegance</h2>
                    <p className="text-lg text-stone-600 font-light leading-relaxed">
                        Born in the heart of Kenya, Mel's Fashion is more than just a handbag brand. It is an exploration of identity, a celebration of traditional craftsmanship, and a commitment to modern luxury. 
                    </p>
                    <p className="text-lg text-stone-600 font-light leading-relaxed">
                        Our workshop in Kilimani is a space of creativity where seasoned artisans mentor the next generation. We source only the finest full-grain leather from sustainable tanneries across East Africa, ensuring that every piece supports the local ecosystem.
                    </p>
                </div>
                <div className="aspect-[4/5] bg-stone-100 rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                        src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000" 
                        alt="Mel's Fashion Workshop in Nairobi" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="mt-32 text-center max-w-3xl mx-auto space-y-12">
                <h2 className="text-4xl font-serif italic text-stone-900">"We don't just make bags; we carry forward the soul of our people."</h2>
                <div className="flex flex-col items-center">
                    <span className="w-12 h-[1px] bg-stone-300 mb-4 text-center"></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-900">Melanie Adhiambo</span>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400">Founder & Creative Director</span>
                </div>
            </div>
        </div>
      </div>
      
    </>
  );
}
