/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
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
          {/* Logo */}
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`text-3xl font-serif font-medium tracking-tight z-50 relative transition-colors duration-500 ${textColorClass}`}
          >
            {BRAND_NAME}
          </Link>
          
          {/* Center Links - Desktop */}
          <div className={`hidden md:flex items-center gap-10 text-sm font-medium tracking-widest lowercase transition-colors duration-500 ${textColorClass}`}>
            <button onClick={() => scrollToSection('products')} className="hover:opacity-60 transition-opacity">shop</button>
            <Link to="/blog" className="hover:opacity-60 transition-opacity">blog</Link>
            <Link to="/reviews" className="hover:opacity-60 transition-opacity">reviews</Link>
            <button onClick={() => scrollToSection('about')} className="hover:opacity-60 transition-opacity">about</button>
            <Link to="/contact" className="hover:opacity-60 transition-opacity">contact</Link>
            {isAdmin && (
              <Link to="/admin" className="px-4 py-2 bg-[#2C2A26] text-[#F5F2EB] rounded-full text-[10px] font-bold hover:bg-[#433E38] transition-all uppercase">
                Admin Panel
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className={`flex items-center gap-6 z-50 relative transition-colors duration-500 ${textColorClass}`}>
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
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-[#2C2A26]/10 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="p-2 hover:bg-[#2C2A26]/10 rounded-full transition-colors">
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
            <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-60 transition-opacity">blog</Link>
            <Link to="/reviews" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-60 transition-opacity">reviews</Link>
            <button onClick={() => scrollToSection('about')} className="hover:opacity-60 transition-opacity">about</button>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-60 transition-opacity">contact</Link>
            {isAdmin && (
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-widest font-bold text-[#2C2A26] border-b-2 border-[#2C2A26]">
                Admin Panel
              </Link>
            )}
            {!user && (
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-widest font-bold">
                Login / Sign Up
              </Link>
            )}
          </div>
      </div>
    </>
  );
};

export default Navbar;
