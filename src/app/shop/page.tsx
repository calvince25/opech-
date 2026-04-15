import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import ProductGrid from '@/components/ProductGrid';
import StructuredData from '@/components/SEO/StructuredData';

export const metadata: Metadata = {
  title: 'Shop Premium Handbags | Handcrafted in Kenya | Mel\'s Fashion',
  description: 'Explore the full collection of Mel\'s Fashion handcrafted handbags. From luxury leather totes to elegant clutches, find your perfect accessory made in Nairobi.',
  alternates: {
    canonical: '/shop',
  },
};

export default function ShopPage() {
  return (
    <>
      <StructuredData 
        type="CollectionPage" 
        data={{ 
          title: 'Premium Handbags Kenya Collection | Mel\'s Fashion',
          description: 'Browse our exclusive collection of handcrafted premium handbags in Kenya.',
          path: '/shop'
        }} 
      />
      
      <div className="relative w-full h-[60vh] min-h-[500px]">
        <Image 
          src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=2000" 
          alt="Mel's Fashion Collection" 
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-20 px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/70 mb-6 block">Collection</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 lowercase italic">All Pieces</h1>
          <p className="max-w-xl mx-auto text-white/90 font-light text-lg italic leading-relaxed">
            Every bag tells a story of Kenyan heritage, meticulously handcrafted in our Nairobi workshop for those who appreciate the finer details.
          </p>
        </div>
      </div>

      <ProductGrid />
      
    </>
  );
}
