import React from 'react';
import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import StructuredData from '@/components/SEO/StructuredData';

export const metadata: Metadata = {
  title: 'Contact Us | Mel\'s Fashion | Premium Handbags Nairobi',
  description: 'Get in touch with the Mel\'s Fashion team in Nairobi. Whether you have a question about our handcrafted bags, need help with an order, or want to say hello.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <StructuredData type="LocalBusiness" data={{}} />
      
      <div className="relative w-full h-[60vh] min-h-[500px]">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
          alt="Mel's Fashion Style" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-20 px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/70 mb-6 block">Customer Care</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 lowercase italic">Get in Touch</h1>
          <p className="max-w-xl mx-auto text-white/90 font-light text-lg">
            We are here to assist you with any inquiries about our handcrafted products, custom orders, or general questions.
          </p>
        </div>
      </div>
      
      <div className="py-20 bg-[#F5F2EB]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
            <ContactForm />
        </div>
      </div>
      
    </>
  );
}
