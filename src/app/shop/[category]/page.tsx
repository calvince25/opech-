import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import ProductGrid from '@/components/ProductGrid';
import StructuredData from '@/components/SEO/StructuredData';
import { notFound } from 'next/navigation';

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
      
    </>
  );
}
