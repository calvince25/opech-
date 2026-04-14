"use client";

import React from 'react';
import { Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemoveItem, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-stone-900/30 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-[#F5F2EB] z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out border-l border-stone-200 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <h2 className="text-xl font-serif text-stone-900">Your Selection ({items.length})</h2>
          <button 
            onClick={onClose} 
            className="text-stone-400 hover:text-stone-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 text-stone-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="font-light text-stone-500 italic">Your cart is empty.</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-4 animate-fade-in-up">
                <div className="w-20 h-24 bg-stone-100 flex-shrink-0 relative overflow-hidden">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                        <h3 className="font-serif text-stone-900">{item.name}</h3>
                        <span className="text-sm font-medium text-stone-900">KES {item.price.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold mt-1">{item.category}</p>
                  </div>
                  <button 
                    onClick={() => onRemoveItem(idx)}
                    className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 self-start transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-stone-200 bg-stone-50/50">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Subtotal</span>
            <span className="text-2xl font-serif text-stone-900">KES {total.toLocaleString()}</span>
          </div>
          <p className="text-[10px] text-stone-400 mb-8 italic text-center">Shipping calculated at checkout.</p>
          <button 
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full py-5 bg-stone-950 text-stone-50 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
