import React from 'react';
import MainLayout from '@/components/MainLayout';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import SiteOverview from '@/components/SiteOverview';
import About from '@/components/About';
import Features from '@/components/Features';
import Journal from '@/components/Journal';
import Reviews from '@/components/Reviews';
import StructuredData from '@/components/SEO/StructuredData';
import { supabase } from '@/lib/supabase';

export default async function Home() {
  const { data: recentProducts } = await supabase
    .from('products')
    .select('image_url, name')
    .order('created_at', { ascending: false })
    .limit(6);

  const displayImages = recentProducts || [];

  return (
    <>
      <StructuredData type="Organization" data={{}} />
      <StructuredData type="LocalBusiness" data={{}} />
      
      <Hero />
      
      <ProductGrid />

      <SiteOverview />
      
      <Features />

      <About />

      <Journal />

      <Reviews />

      {/* Social Proof Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 block">Social Proof</span>
              <h2 className="text-4xl font-serif text-stone-900">@mels_fashion_k.e</h2>
            </div>
            <a 
              href="https://www.instagram.com/mels_fashion_k.e?igsh=MWsweGs5ZXdtZjlrMg==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-bold uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-stone-500 transition-colors"
            >
              Follow Us
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {displayImages.length > 0 ? (
              displayImages.map((product, i) => (
                <div key={i} className="aspect-square bg-stone-100 group relative cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center text-center px-4">
                    <span className="text-white text-[10px] font-bold tracking-widest uppercase">{product.name}</span>
                  </div>
                  <img 
                    src={product.image_url || `https://images.unsplash.com/photo-159${i}223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=600`} 
                    alt={product.name || "Mels Fashion Collection"} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              ))
            ) : (
              // Fallback placeholders if no products exist yet
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-stone-100 group relative cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                    <span className="text-white text-xs font-bold tracking-widest uppercase">View Gallery</span>
                  </div>
                  <img 
                    src={`https://images.unsplash.com/photo-159${i}223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=600`} 
                    alt="Mels Fashion Placeholder" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
