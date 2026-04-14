"use client";

import React from 'react';

const Hero: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      // Manual scroll calculation to account for fixed header
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Update URL hash without jumping, safely ignoring errors in sandboxed environments
      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore SecurityError in restricted environments
      }
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden bg-stone-200">
      
      {/* Background Image - Nairobi/Fashion Vibe */}
      <div className="absolute inset-0 w-full h-full">
        <img 
            src="https://www.shutterstock.com/image-photo/set-stylish-female-clothes-accessories-600nw-2696516961.jpg" 
            alt="Premium leather bag" 
            className="w-full h-full object-cover grayscale contrast-[0.7] brightness-[0.95] animate-[pulse_15s_ease-in-out_infinite_alternate]"
        />
        {/* Warmer Overlay for Richness */}
        <div className="absolute inset-0 bg-stone-900/40 mix-blend-multiply"></div>
        {/* Deep Tone for Shadow Depth */}
        <div className="absolute inset-0 bg-stone-950/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start text-left md:items-center md:text-center px-6">
        <div className="animate-fade-in-up w-full md:w-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-normal text-white tracking-tight mb-8 drop-shadow-sm">
            Mel's <span className="italic text-stone-100">Fashion.</span>
          </h1>
          <p className="max-w-lg mx-0 md:mx-auto text-lg md:text-xl text-white/90 font-light leading-relaxed mb-12 text-shadow-sm">
            Experience the finest <span className="font-medium text-white italic">Premium Handbags Kenya</span> has to offer. 
            Handcrafted in Nairobi with artisanal excellence and timeless design.
          </p>
          
          <a 
            href="#products" 
            onClick={(e) => handleNavClick(e, 'products')}
            className="group relative px-10 py-5 bg-stone-50 text-stone-950 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all duration-700 shadow-2xl hover:shadow-white/10 inline-block"
          >
            <span className="relative z-10">View Collection</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
