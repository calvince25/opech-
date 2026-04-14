import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import ProductDetail from '@/components/ProductDetailWrapper';
import StructuredData from '@/components/SEO/StructuredData';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

// Dynamic Metadata
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id;
  const { data: product } = await supabase.from('products').select('*').eq('id', id).single();

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} – Handcrafted Leather Handbag in Nairobi`,
    description: product.description || `Discover the ${product.name}, a premium handcrafted leather handbag made with artisanal excellence in Nairobi, Kenya.`,
    alternates: {
      canonical: `/product/${id}`,
    },
    openGraph: {
      images: [product.image_url],
    },
  };
}

export default async function Page({ params }: Props) {
  const id = (await params).id;
  
  // Fetch product on server
  const { data: product } = await supabase.from('products').select('*').eq('id', id).single();

  if (!product) {
    notFound();
  }

  // Fetch "Pairs well with" products
  const { data: related } = await supabase
    .from('products')
    .select('*')
    .neq('id', id)
    .limit(4);

  return (
    <>
      <StructuredData type="Product" data={product} />
      <ProductDetail product={product} relatedProducts={related || []} />
    </>
  );
}
