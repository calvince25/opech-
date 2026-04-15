"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/providers/CartProvider';
import ProductCard from './ProductCard';
import Reviews from './Reviews';
import { ArrowLeft, Truck, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailWrapper({ product, relatedProducts }: Props) {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="pt-32 pb-24 bg-[#F5F2EB]">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-12">
          <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
          <span className="text-stone-300">/</span>
          <Link href="/shop" className="hover:text-stone-900 transition-colors">Shop</Link>
          <span className="text-stone-300">/</span>
          <span className="text-stone-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 mb-32">
          
          {/* Left: Images */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden rounded-2xl group">
              <Image 
                src={product.image_url} 
                alt={`${product.name} – Handcrafted Leather Handbag in Nairobi`} 
                fill
                priority
                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
            </div>
            {/* Gallery Placeholder - if multiple images existed in DB */}
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative aspect-square bg-stone-100 rounded-xl overflow-hidden opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                   <Image src={product.image_url} alt="Detail" fill className="object-cover grayscale" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400 mb-4 block">{product.category}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 mb-6 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-light text-stone-900">KES {product.price.toLocaleString()}</span>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full">In Stock</span>
              </div>
            </div>

            <div className="prose prose-stone mb-12">
              <p className="text-lg text-stone-600 font-light leading-relaxed">
                {product.long_description || product.description || "A masterpiece of Kenyan craftsmanship, this bag represents the pinnacle of artisanal excellence. Designed for the discerning individual who values heritage and modern elegance."}
              </p>
            </div>

            <button 
              onClick={() => addToCart(product)}
              className="w-full py-6 bg-stone-900 text-white rounded-2xl text-sm font-bold uppercase tracking-[0.2em] hover:bg-stone-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-4 mb-10"
            >
              Add to Collection
              <span className="w-4 h-[1px] bg-white opacity-40"></span>
              KES {product.price.toLocaleString()}
            </button>

            {/* M-Pesa Badge */}
            <div className="bg-white/50 border border-stone-200 rounded-2xl p-4 flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-6">
                  <Image src="https://img.icons8.com/color/48/m-pesa.png" alt="M-Pesa" fill className="object-contain" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-stone-900">M-Pesa Express Checkout Available</span>
              </div>
              <ShieldCheck className="w-5 h-5 text-stone-300" />
            </div>

            {/* Tabs for Details */}
            <div className="space-y-4">
              <div className="flex gap-8 border-b border-stone-200">
                {['features', 'materials', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[10px] font-bold uppercase tracking-[0.3em] pb-4 transition-all relative ${
                      activeTab === tab ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-900 animate-in slide-in-from-left-full"></div>}
                  </button>
                ))}
              </div>

              <div className="py-6 min-h-[160px] animate-in fade-in duration-500">
                {activeTab === 'features' && (
                  <ul className="space-y-4">
                    {(product.features || ['Premium Full Grain Leather', 'Hand-stitched accents', 'Brass Hardware']).map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-stone-600">
                        <Sparkles className="w-4 h-4 text-stone-300 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === 'materials' && (
                  <div className="text-sm text-stone-600 leading-relaxed font-light">
                    <p className="mb-4"><strong>Leather:</strong> Sourced from sustainable Kenyan tanneries. Genuine full-grain cowhide that develops a unique patina.</p>
                    <p><strong>Lining:</strong> Soft cotton-drill lining with traditional beadwork detail on interior pocket.</p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-stone-300 mt-1" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-stone-900">Nairobi Delivery</p>
                        <p className="text-sm text-stone-600 font-light">Same-day delivery for orders before 12 PM.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Truck className="w-5 h-5 text-stone-300 mt-1" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-stone-900">Countrywide</p>
                        <p className="text-sm text-stone-600 font-light">2–3 business days via G4S or reliable courier.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pairs Well With */}
        {relatedProducts.length > 0 && (
          <div className="mb-32">
            <h2 className="text-3xl font-serif text-stone-900 mb-12">Pairs Well With</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div id="reviews">
          <Reviews />
        </div>

      </div>
    </div>
  );
}
