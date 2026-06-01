import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import StructuredData from '@/components/SEO/StructuredData';
import { FALLBACK_ARTICLES } from '@/lib/knowledgeHubData';
import { BookOpen, ArrowRight } from 'lucide-react';

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
          src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=1200" 
          alt="Mel's Fashion Collection" 
          fill
          priority
          sizes="100vw"
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

      {/* Helpful Buying Guides — Internal SEO Links */}
      {(() => {
        const guides = FALLBACK_ARTICLES.filter(a => a.category === 'buying-guides').slice(0, 5);
        return (
          <div className="bg-[#F5F2EB] pb-24 px-6">
            <div className="max-w-[1800px] mx-auto">
              <div className="border-t border-stone-200 pt-20">
                <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-stone-400" />
                    <h2 className="text-3xl font-serif text-stone-900">Helpful Buying Guides</h2>
                  </div>
                  <Link
                    href="/knowledge-hub"
                    className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
                  >
                    All Leather Guides →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {guides.map(guide => (
                    <Link
                      key={guide.id}
                      href={`/knowledge-hub/${guide.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="aspect-[4/3] bg-stone-100 overflow-hidden">
                        <img
                          src={guide.image_url}
                          alt={guide.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="font-serif text-base text-stone-900 group-hover:text-stone-600 transition-colors leading-snug">{guide.title}</h3>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
