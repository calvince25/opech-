import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

import { SiteSettings } from '../types';

interface ContactProps {
  settings?: SiteSettings | null;
}

export default function Contact({ settings }: ContactProps) {
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
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16"
      >
        <div>
          <h1 className="text-5xl font-serif mb-8">Get in Touch</h1>
          <p className="text-lg text-stone-600 mb-12 leading-relaxed">
            We'd love to hear from you. Whether you have a question about our collection, 
            need help with an order, or just want to say hello, our team in Nairobi is here to help.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-stone-100 rounded-full">
                <MapPin className="w-6 h-6 text-stone-800" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Our Workshop</h3>
                <p className="text-stone-600">{settings?.address || 'Kilimani, Nairobi, Kenya'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-stone-100 rounded-full">
                <Phone className="w-6 h-6 text-stone-800" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Call Us</h3>
                <p className="text-stone-600">{settings?.phone || '+254 700 000 000'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-stone-100 rounded-full">
                <Mail className="w-6 h-6 text-stone-800" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Email Us</h3>
                <p className="text-stone-600">{settings?.email || 'hello@mellsfasion.co.ke'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-100">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-12"
            >
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                <Send className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif mb-4">Message Sent</h2>
              <p className="text-stone-600">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 text-stone-800 font-medium underline underline-offset-4"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">Email</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">Subject</label>
                <input 
                  required
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all"
                  placeholder="How can we help?"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">Message</label>
                <textarea 
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all resize-none"
                  placeholder="Tell us more..."
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
