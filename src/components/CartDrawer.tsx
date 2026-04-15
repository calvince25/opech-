"use client";

import React from 'react';
import Image from 'next/image';
import { Product } from '../types';
import { useRouter } from 'next/navigation';
import { ShoppingBag, X, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemoveItem }) => {
  const router = useRouter();
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-[#F5F2EB] z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out border-l border-stone-200 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-stone-700" />
            <h2 className="text-base font-serif text-stone-900 tracking-wide">
              Your Selection
              <span className="ml-2 text-[11px] font-bold uppercase tracking-widest text-stone-400">
                ({items.length})
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-900 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50 py-20">
              <ShoppingBag className="w-12 h-12 text-stone-300" />
              <p className="font-light text-stone-500 italic text-sm">
                Your cart is empty.
              </p>
              <button
                onClick={onClose}
                className="text-[10px] font-bold uppercase tracking-widest text-stone-900 border-b border-stone-900 pb-0.5 hover:opacity-60 transition-opacity"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-5 group">
                <div className="relative w-20 h-24 bg-stone-100 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif text-stone-900 text-sm leading-tight">{item.name}</h3>
                      <span className="text-sm font-bold text-stone-900 flex-shrink-0">
                        KES {item.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold mt-1">
                      {item.category}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(idx)}
                    className="text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:text-red-500 self-start transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-6 border-t border-stone-200 bg-white/60 backdrop-blur-sm space-y-4">
            {/* Subtotal row */}
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
                  Subtotal
                </span>
                <div className="flex items-center gap-1 mt-0.5 text-[10px] text-stone-400">
                  <Truck className="w-3 h-3" />
                  <span className="italic">Delivery fee not included</span>
                </div>
              </div>
              <span className="text-2xl font-serif text-stone-900">
                KES {total.toLocaleString()}
              </span>
            </div>

            {/* Exclusive of delivery note */}
            <p className="text-[10px] text-center text-stone-400 italic border border-stone-200 rounded-xl py-2 px-4 bg-stone-50">
              💡 Prices shown are <strong>exclusive of delivery</strong>. Delivery fee confirmed at dispatch.
            </p>

            <button
              onClick={handleCheckout}
              className="w-full py-5 bg-stone-950 text-stone-50 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-stone-800 active:scale-[0.98] transition-all shadow-xl rounded-full"
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
