"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

const categories = ['All', 'Heels', 'Charms', 'Shoulder bags', 'Wallets', 'Leather Handbags', 'Crossbody Bags', 'Tote Bags', 'Clutch Bags', 'Sale', 'New Arrivals'];

interface ProductGridProps {
  initialCategory?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ initialCategory = 'All' }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Update activeCategory if initialCategory changes (navigation)
  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        setDbProducts(data);
      } else {
        // Fallback to constants if DB is empty or error
        setDbProducts(PRODUCTS);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const filtered = activeCategory === 'All' 
      ? dbProducts 
      : dbProducts.filter(p => p.category === activeCategory);
    return filtered;
  }, [activeCategory, dbProducts]);

  return (
    <section id="products" className="py-32 px-6 md:px-12 bg-[#F5F2EB]">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-24 space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif text-stone-900">The Collection</h2>
          
          {/* Minimal Filter */}
          <div className="flex flex-wrap justify-center gap-8 pt-4 border-t border-stone-200 w-full max-w-2xl">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm uppercase tracking-widest pb-1 border-b transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'border-stone-900 text-stone-900' 
                    : 'border-transparent text-stone-400 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Large Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-stone-900" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
