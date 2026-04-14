"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);
      
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
      
      {/* Contact Info */}
      <div className="space-y-16">
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <MapPin className="w-6 h-6 text-stone-900 mt-1" />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-2">Our Workshop</h3>
              <p className="text-stone-500 font-light leading-relaxed">
                Kilimani, Nairobi<br/>
                Kenya
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <Phone className="w-6 h-6 text-stone-900 mt-1" />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-2">Call/WhatsApp</h3>
              <p className="text-stone-500 font-light leading-relaxed">+254 740 899 918</p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <Mail className="w-6 h-6 text-stone-900 mt-1" />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-2">Email</h3>
              <p className="text-stone-500 font-light leading-relaxed">hello@mellsfasion.co.ke</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-6">Social</h3>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/mels_fashion_k.e?igsh=MWsweGs5ZXdtZjlrMg==" target="_blank" className="p-4 bg-white rounded-full hover:bg-stone-900 hover:text-white transition-all shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
            </a>
            <a href="https://facebook.com/mellsfashion" target="_blank" className="p-4 bg-white rounded-full hover:bg-stone-900 hover:text-white transition-all shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-10 md:p-16 rounded-3xl shadow-2xl shadow-stone-900/5">
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-12"
          >
            <div className="w-20 h-20 bg-stone-50 text-stone-900 rounded-full flex items-center justify-center mb-8">
              <Send className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-serif mb-4">Message Sent</h2>
            <p className="text-stone-500 italic max-w-xs">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-12 text-sm font-bold uppercase tracking-widest border-b border-stone-900 pb-1"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-0 py-4 bg-transparent border-b border-stone-200 focus:border-stone-900 transition-all outline-none font-light text-lg"
                placeholder="Your name"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Email</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-0 py-4 bg-transparent border-b border-stone-200 focus:border-stone-900 transition-all outline-none font-light text-lg"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Subject</label>
              <input 
                required
                type="text" 
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-0 py-4 bg-transparent border-b border-stone-200 focus:border-stone-900 transition-all outline-none font-light text-lg"
                placeholder="Enquiry"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Message</label>
              <textarea 
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-0 py-4 bg-transparent border-b border-stone-200 focus:border-stone-900 transition-all outline-none font-light text-lg resize-none"
                placeholder="Tell us more about your enquiry..."
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-stone-900 text-white rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Submit Inquiry
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
