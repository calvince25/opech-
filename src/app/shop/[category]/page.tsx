import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import StructuredData from '@/components/SEO/StructuredData';
import { notFound } from 'next/navigation';
import { FALLBACK_ARTICLES } from '@/lib/knowledgeHubData';
import { BookOpen, ArrowRight } from 'lucide-react';

interface Props {
  params: { category: string };
}

const CATEGORY_MAP: Record<string, { name: string, title: string, desc: string }> = {
  'leather-handbags': {
    name: 'Leather Handbags',
    title: 'Luxury Leather Handbags Nairobi | Handcrafted in Kenya',
    desc: 'Shop our premium collection of luxury leather handbags. Each piece is handcrafted in Nairobi using the finest Kenyan full-grain leather.'
  },
  'crossbody-bags': {
    name: 'Crossbody Bags',
    title: 'Artisanal Crossbody Bags Nairobi | Kenyan Made',
    desc: 'Discover elegant and functional artisanal crossbody bags. Perfect for the modern woman on the go, handcrafted with care in Nairobi.'
  },
  'tote-bags': {
    name: 'Tote Bags',
    title: 'Premium Leather Tote Bags Nairobi | Spacious & Elegant',
    desc: 'Explore our spacious and elegant leather tote bags. Handcrafted in Kenya for durability and style, perfect for everyday luxury.'
  },
  'clutch-bags': {
    name: 'Clutch Bags',
    title: 'Handcrafted Clutches Nairobi | Evening & Occasion Bags',
    desc: 'Exquisite handcrafted clutches for every occasion. Made in Nairobi with premium materials and artisanal detail.'
  },
  'sale': {
    name: 'Sale',
    title: 'Handbag Sale Nairobi | Premium Discounts | Mel\'s Fashion',
    desc: 'Limited time offers on our handcrafted handbag collection. Premium Kenyan leather pieces at exclusive prices. Shop now.'
  },
  'new-arrivals': {
    name: 'New Arrivals',
    title: 'Latest Handbag Designs Nairobi | New Collection | Mel\'s Fashion',
    desc: 'Be the first to explore our latest handcrafted handbag designs. New arrivals from our Nairobi workshop, made with love and heritage.'
  }
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const slug = (await params).category;
  const category = CATEGORY_MAP[slug];

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: category.title,
    description: category.desc,
    alternates: {
      canonical: `/shop/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const slug = (await params).category;
  const categoryData = CATEGORY_MAP[slug];

  if (!categoryData) {
    notFound();
  }

  return (
    <>
      <StructuredData 
        type="CollectionPage" 
        data={{ 
          title: categoryData.title,
          description: categoryData.desc,
          path: `/shop/${slug}`
        }} 
      />
      
      <div className="pt-32 pb-16 bg-[#F5F2EB]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400 mb-6 block">Collection</span>
          <h1 className="text-5xl md:text-7xl font-serif text-stone-900 mb-8 lowercase italic">{categoryData.name}</h1>
          <p className="max-w-xl mx-auto text-stone-600 font-light text-lg italic leading-relaxed">
            {categoryData.desc}
          </p>
        </div>
      </div>

      {/* Passing the category to ProductGrid would be ideal, 
          but ProductGrid currently handles its own filtering.
          I'll modify ProductGrid to accept an initialCategory prop. */}
      <ProductGrid initialCategory={categoryData.name} />

      {/* Helpful Buying Guides — Context-Specific Internal SEO Links */}
      {(() => {
        let categoryGuides = FALLBACK_ARTICLES.filter(a => a.category === 'buying-guides');
        if (slug === 'leather-handbags') {
          categoryGuides = FALLBACK_ARTICLES.filter(a => a.slug === 'how-to-choose-the-perfect-handbag' || a.slug === 'leather-bag-buying-guide' || a.slug === 'best-leather-bags-for-women');
        } else if (slug === 'crossbody-bags') {
          categoryGuides = FALLBACK_ARTICLES.filter(a => a.slug === 'matching-handbags-to-outfits' || a.slug === 'luxury-handbag-styling-guide' || a.slug === 'handbag-trends-in-kenya');
        } else if (slug === 'tote-bags') {
          categoryGuides = FALLBACK_ARTICLES.filter(a => a.slug === 'best-work-bags-for-professionals' || a.slug === 'best-travel-bags' || a.slug === 'how-long-leather-bags-last');
        } else if (slug === 'clutch-bags') {
          categoryGuides = FALLBACK_ARTICLES.filter(a => a.slug === 'luxury-handbag-styling-guide' || a.slug === 'matching-handbags-to-outfits' || a.slug === 'types-of-leather-explained');
        } else {
          categoryGuides = FALLBACK_ARTICLES.filter(a => a.slug === 'why-kenyan-leather-is-unique' || a.slug === 'how-to-choose-the-perfect-handbag' || a.slug === 'best-leather-bags-for-women');
        }

        if (categoryGuides.length < 3) {
          categoryGuides = FALLBACK_ARTICLES.filter(a => a.category === 'buying-guides').slice(0, 3);
        } else {
          categoryGuides = categoryGuides.slice(0, 3);
        }

        return (
          <div className="bg-[#F5F2EB] pb-24 px-6">
            <div className="max-w-[1800px] mx-auto">
              <div className="border-t border-stone-200 pt-20">
                <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-stone-400" />
                    <h2 className="text-3xl font-serif text-stone-900">Recommended for {categoryData.name}</h2>
                  </div>
                  <Link
                    href={`/knowledge-hub?category=${slug === 'leather-handbags' || slug === 'crossbody-bags' || slug === 'tote-bags' || slug === 'clutch-bags' ? 'buying-guides' : 'all'}`}
                    className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
                  >
                    View All Guides →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {categoryGuides.map(guide => (
                    <Link
                      key={guide.id}
                      href={`/knowledge-hub/${guide.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="aspect-[16/10] bg-stone-100 overflow-hidden">
                        <img
                          src={guide.image_url}
                          alt={guide.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6 space-y-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block">{guide.read_time} read</span>
                        <h3 className="font-serif text-lg text-stone-900 group-hover:text-stone-600 transition-colors leading-snug">{guide.title}</h3>
                        <p className="text-stone-500 text-sm line-clamp-2">{guide.excerpt}</p>
                        <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-stone-800 group-hover:text-stone-500 transition-colors pt-2">
                          Read Guide <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
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
