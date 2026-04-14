"use client";

import React from 'react';
import { Product } from '../types';
import { useCart } from '@/providers/CartProvider';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/product/${product.id}`);
  };

  return (
    <div onClick={handleCardClick} className="group flex flex-col gap-6 cursor-pointer no-underline">
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#EBE7DE]">
        <img 
          src={product.image_url} 
          alt={`${product.name} - Handcrafted Leather Handbag in Nairobi`} 
          className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110 sepia-[0.1]"
          loading="lazy"
        />
        
        {/* Hover overlay with Add To Cart */}
        <div className="absolute inset-0 bg-[#2C2A26]/0 group-hover:bg-[#2C2A26]/10 transition-colors duration-500 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="bg-stone-900 text-white shadow-2xl px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold">
                    Add to Cart
                </span>
            </div>
        </div>
      </div>
      
      <div className="text-center">
        <h3 
          onClick={handleTitleClick}
          className="text-2xl font-serif font-medium text-stone-900 mb-1 hover:text-stone-500 transition-colors cursor-pointer inline-block"
        >
          {product.name}
        </h3>
        <p className="text-sm font-light text-stone-500 mb-3 tracking-wide">{product.category}</p>
        <span className="text-sm font-medium text-stone-900 block">KES {product.price.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default ProductCard;
