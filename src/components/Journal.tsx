"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { BlogPost } from '../types';
import { Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface JournalProps {
  fullPage?: boolean;
}

const Journal: React.FC<JournalProps> = ({ fullPage = false }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!fullPage) {
        query = query.limit(3);
      }
      
      const { data } = await query;
      
      if (data) setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, [fullPage]);

  return (
    <section id="journal" className={`${fullPage ? 'pt-0' : 'py-32'} bg-stone-50`}>
      
      {/* Hero Image — Full Page Only */}
      {fullPage && (
        <div className="relative h-[55vh] min-h-[420px] mb-20 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524289286702-f07229da36f5?auto=format&fit=crop&q=80&w=2000"
            alt="Handcrafted Premium Handbags Kenya - Mel's Fashion Blog"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 via-stone-900/20 to-stone-50 flex items-end pb-16 px-6 md:px-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-[1800px] mx-auto w-full"
            >
              <span className="block text-xs font-bold uppercase tracking-[0.2em] text-stone-200 mb-3">Editorial</span>
              <h1 className="text-5xl md:text-7xl font-serif text-white drop-shadow-lg">The Journal</h1>
              <p className="text-stone-100 mt-3 text-lg font-serif italic">Stories of craftsmanship, heritage, and the spirit of Nairobi.</p>
            </motion.div>
          </div>
        </div>
      )}

      <div className="px-6 md:px-12 max-w-[1800px] mx-auto">
        {!fullPage && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 pb-8 border-b border-stone-200">
            <div>
              <span className="block text-xs font-bold uppercase tracking-[0.4em] text-stone-400 mb-6">Editorial</span>
              <h2 className="text-4xl md:text-6xl font-serif text-stone-900">The Journal</h2>
            </div>
            <p className="text-stone-500 font-light max-w-sm mt-4 md:mt-0 italic leading-relaxed">
              Stories of craftsmanship, heritage, and the vibrant spirit of Nairobi.
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-stone-900" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {posts.length === 0 ? (
              <div className="col-span-full text-center py-20 opacity-50">
                <p className="text-xl font-serif text-stone-400">No stories published yet.</p>
              </div>
            ) : (
              posts.map((article, index) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.id}`}
                  className="group cursor-pointer flex flex-col text-left no-underline"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col"
                  >
                    <div className="w-full aspect-[4/3] overflow-hidden mb-8 bg-stone-100 rounded-xl">
                      <img 
                        src={article.image_url || 'https://images.unsplash.com/photo-1524289286702-f07229da36f5?auto=format&fit=crop&q=80&w=1000'}
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[0.2] group-hover:grayscale-0"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col flex-1 text-left">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300 mb-4">
                        {new Date(article.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <h3 className="text-2xl font-serif text-stone-900 mb-4 leading-tight group-hover:opacity-70 transition-opacity">
                        {article.title}
                      </h3>
                      <p className="text-stone-600 font-light text-sm leading-relaxed line-clamp-2 mb-6">{article.excerpt}</p>
                      <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-950 group-hover:gap-4 transition-all border-b-2 border-stone-950 pb-1 self-start">
                        Read the story <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Journal;
