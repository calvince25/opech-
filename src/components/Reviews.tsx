"use client";

import React, { useEffect, useState } from 'react';
import { Star, Loader2, X, Send, Award, MessageSquare, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Review } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ReviewsProps {
  fullPage?: boolean;
}

export default function Reviews({ fullPage = false }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    customer_name: '',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setReviews(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([formData]);
      
      if (error) throw error;
      setSuccess(true);
      setFormData({ customer_name: '', rating: 5, comment: '' });
      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
      }, 3000);
    } catch (err) {
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-stone-900" />
      </div>
    );
  }

  return (
    <div className={`${fullPage ? 'pt-24 pb-24' : 'mt-20 border-t border-stone-200 pt-16'}`}>
      {fullPage && (
        <div className="relative h-[50vh] min-h-[400px] mb-16 overflow-hidden">
          <Image 
            src="/reviews-hero.jpg" 
            alt="Handcrafted Premium Handbags Kenya - Mel's Fashion" 
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center text-center px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Client Experiences</h1>
              <p className="text-xl text-stone-100 font-serif italic">"Artistry recognized by those who value excellence."</p>
            </motion.div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-center md:text-left">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Customer Stories</h2>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-stone-800 text-stone-800" />
                ))}
              </div>
              <span className="font-bold text-lg">4.9 / 5.0</span>
              <span className="text-stone-400 text-sm">(Based on 200+ clients in Nairobi)</span>
            </div>
          </div>

          {!showForm ? (
            <button 
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-full font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl"
            >
              Share Your Story
              <MessageSquare className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={() => setShowForm(false)}
              className="flex items-center gap-2 px-6 py-3 border border-stone-200 text-stone-600 rounded-full font-bold uppercase tracking-widest hover:bg-stone-50 transition-all"
            >
              Cancel
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-16"
            >
              <div className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-xl max-w-2xl mx-auto">
                {success ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-serif mb-2">Thank You!</h3>
                    <p className="text-stone-500 italic">Your review has been submitted for approval by our artisans.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Your Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setFormData({ ...formData, rating: num })}
                            className="transition-transform active:scale-90"
                          >
                            <Star 
                              className={`w-8 h-8 ${num <= formData.rating ? 'fill-stone-800 text-stone-800' : 'text-stone-200'}`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Name</label>
                      <input 
                        required
                        type="text"
                        value={formData.customer_name}
                        onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                        className="w-full px-6 py-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-stone-900 transition-all underline-none"
                        placeholder="Your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Experience</label>
                      <textarea 
                        required
                        rows={4}
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        className="w-full px-6 py-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-stone-900 transition-all resize-none underline-none"
                        placeholder="Tell us about your Mel's Fashion..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-stone-800 transition-all disabled:opacity-50"
                    >
                      {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                          Submit Review
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {reviews.length === 0 ? (
          <div className="text-center py-24 bg-stone-50 rounded-3xl border border-dashed border-stone-200">
            <Award className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-xl text-stone-500 font-serif italic">
              No stories shared yet. Be the first to grace this wall.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {reviews.map((review, index) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-10 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 transition-colors ${i < review.rating ? 'fill-stone-800 text-stone-800' : 'text-stone-100'}`} 
                    />
                  ))}
                </div>
                <p className="text-stone-700 mb-8 italic text-lg leading-relaxed font-serif">
                  "{review.comment}"
                </p>
                <div className="flex items-center justify-between border-t border-stone-50 pt-6">
                  <span className="font-bold text-sm tracking-widest uppercase">{review.customer_name}</span>
                  <span className="text-stone-400 text-xs">{new Date(review.created_at).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
