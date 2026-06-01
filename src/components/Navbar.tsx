"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { BRAND_NAME } from '../constants';
import { User as UserIcon, LogOut, ShoppingBag } from 'lucide-react';


interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  user: any;
  isAdmin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, user, isAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const textColorClass = (scrolled || mobileMenuOpen) ? 'text-[#2C2A26]' : 'text-[#F5F2EB]';

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
          scrolled || mobileMenuOpen ? 'bg-[#F5F2EB]/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link 
            href="/" 
            className={`z-50 relative font-serif text-xl md:text-2xl tracking-widest transition-all duration-300 hover:opacity-70 ${textColorClass}`}
          >
            Mel&rsquo;s Fashion
          </Link>
          
          {/* Center Links - Desktop */}
          <div className={`hidden md:flex items-center gap-10 text-sm font-medium tracking-widest lowercase transition-colors duration-500 ${textColorClass}`}>
            <Link href="/shop" className="hover:opacity-60 transition-opacity">shop</Link>
            <Link href="/blog" className="hover:opacity-60 transition-opacity">blog</Link>
            <button onClick={() => scrollToSection('reviews')} className="hover:opacity-60 transition-opacity">reviews</button>
            <Link href="/about" className="hover:opacity-60 transition-opacity">about</Link>
            <Link href="/contact" className="hover:opacity-60 transition-opacity">contact</Link>
            {isAdmin && (
              <Link href="/admin" className="px-4 py-2 bg-stone-900 text-stone-50 rounded-full text-[10px] font-bold hover:bg-stone-800 transition-all uppercase">
                Admin Panel
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className={`flex items-center gap-6 z-50 relative transition-colors duration-500 ${textColorClass}`}>
            <a 
              href="https://www.instagram.com/mels_fashion_k.e?igsh=MWsweGs5ZXdtZjlrMg=="
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:opacity-60 transition-opacity hidden sm:block"
              title="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a 
              href="https://wa.me/254740899918"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:opacity-60 transition-opacity hidden sm:block"
              title="WhatsApp Chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.311 1.485 5.38 1.488 5.487 0 9.95-4.461 9.954-9.95.002-2.66-1.033-5.161-2.914-7.042C17.18 1.83 14.682.791 12.016.791c-5.495 0-9.958 4.462-9.962 9.952-.001 2.124.557 4.195 1.615 5.922l-.242 1.012-.862 3.149 3.22-.843.862.247zm9.648-6.195c-.244-.122-1.443-.712-1.668-.794-.224-.082-.387-.123-.55.123-.162.246-.628.795-.77 1-.142.205-.285.23-.529.107-1.09-.54-2.03-1.002-2.812-2.348-.152-.259 0-.399.13-.529.117-.117.244-.275.366-.412.122-.137.163-.23.244-.397.082-.164.041-.308-.02-.431-.06-.123-.55-1.32-.754-1.815-.198-.48-.4-.415-.55-.422H9.27c-.163 0-.427.061-.65.287-.224.226-.854.835-.854 2.037 0 1.201.874 2.361.995 2.525.122.164 1.722 2.628 4.171 3.687 2.062.894 2.45.712 2.902.662.453-.05 1.442-.589 1.644-1.157.204-.567.204-1.05.143-1.152-.061-.102-.224-.164-.468-.286z"/></svg>
            </a>
            <button 
              onClick={onOpenCart}
              className="relative group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:opacity-60 transition-opacity" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#2C2A26] text-[#F5F2EB] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="p-2 hover:bg-[#2C2A26]/10 rounded-full transition-colors"
                  title="My Account"
                >
                  <UserIcon className="w-5 h-5" />
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-[#2C2A26]/10 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link href="/auth" className="p-2 hover:bg-[#2C2A26]/10 rounded-full transition-colors">
                <UserIcon className="w-5 h-5" />
              </Link>
            )}
            
            {/* Mobile Menu Toggle */}
            <button 
              className="block md:hidden focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
               {mobileMenuOpen ? (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                 </svg>
               )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#F5F2EB] z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'
      }`}>
          <div className="flex flex-col items-center space-y-8 text-xl font-serif font-medium text-[#2C2A26] lowercase">
            <button onClick={() => scrollToSection('products')} className="hover:opacity-60 transition-opacity">shop</button>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-60 transition-opacity">blog</Link>
            <Link href="/reviews" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-60 transition-opacity">reviews</Link>
            <button onClick={() => scrollToSection('about')} className="hover:opacity-60 transition-opacity">about</button>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-60 transition-opacity">contact</Link>
            {isAdmin && (
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-widest font-bold text-[#2C2A26] border-b-2 border-[#2C2A26]">
                Admin Panel
              </Link>
            )}
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-60 transition-opacity text-sm uppercase tracking-widest">my account</Link>
                <button onClick={handleLogout} className="text-sm uppercase tracking-widest hover:opacity-60 transition-opacity">sign out</button>
              </>
            ) : (
              <Link href="/auth" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-widest font-bold">
                Login / Sign Up
              </Link>
            )}
            {/* Social Icons inside Mobile Menu Overlay */}
            <div className="flex gap-8 pt-8 border-t border-stone-200/50 w-2/3 justify-center mt-6">
              <a 
                href="https://www.instagram.com/mels_fashion_k.e?igsh=MWsweGs5ZXdtZjlrMg==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#2C2A26] hover:opacity-60 transition-opacity"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a 
                href="https://wa.me/254740899918" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#2C2A26] hover:opacity-60 transition-opacity"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.311 1.485 5.38 1.488 5.487 0 9.95-4.461 9.954-9.95.002-2.66-1.033-5.161-2.914-7.042C17.18 1.83 14.682.791 12.016.791c-5.495 0-9.958 4.462-9.962 9.952-.001 2.124.557 4.195 1.615 5.922l-.242 1.012-.862 3.149 3.22-.843.862.247zm9.648-6.195c-.244-.122-1.443-.712-1.668-.794-.224-.082-.387-.123-.55.123-.162.246-.628.795-.77 1-.142.205-.285.23-.529.107-1.09-.54-2.03-1.002-2.812-2.348-.152-.259 0-.399.13-.529.117-.117.244-.275.366-.412.122-.137.163-.23.244-.397.082-.164.041-.308-.02-.431-.06-.123-.55-1.32-.754-1.815-.198-.48-.4-.415-.55-.422H9.27c-.163 0-.427.061-.65.287-.224.226-.854.835-.854 2.037 0 1.201.874 2.361.995 2.525.122.164 1.722 2.628 4.171 3.687 2.062.894 2.45.712 2.902.662.453-.05 1.442-.589 1.644-1.157.204-.567.204-1.05.143-1.152-.061-.102-.224-.164-.468-.286z"/></svg>
              </a>
            </div>
          </div>
      </div>
    </>
  );
};

export default Navbar;
