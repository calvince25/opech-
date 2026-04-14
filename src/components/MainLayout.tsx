"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import Assistant from '@/components/Assistant';
import { useCart } from '@/providers/CartProvider';
import { useAuth } from '@/providers/AuthProvider';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart } = useCart();
  const { user, isAdmin } = useAuth();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    // Handling is mostly done in Navbar/Hero components, this is a fallback
    const el = document.getElementById(targetId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar 
        cartCount={cartItems.length} 
        onOpenCart={() => setIsCartOpen(true)} 
        user={user} 
        isAdmin={isAdmin} 
      />
      
      <main>
        {children}
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemoveItem={removeFromCart} 
        onCheckout={() => {
          setIsCartOpen(false);
          // router logic will be handled in CartDrawer usually
        }} 
      />

      <Assistant />
    </>
  );
}
