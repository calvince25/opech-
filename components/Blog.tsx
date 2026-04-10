import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { BlogPost } from '../types';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';

interface BlogProps {
  onArticleClick: (article: BlogPost) => void;
}

export default function Blog({ onArticleClick }: BlogProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setPosts(data);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2EB]">
        <Loader2 className="w-8 h-8 animate-spin text-[#2C2A26]" />
      </div>
    );
  }

  return (
    <section className="bg-[#F5F2EB] pb-32">
      {/* Hero Image */}
      <div className="relative h-[55vh] min-h-[420px] mb-20 overflow-hidden">
        <img
          src="/blog-hero.jpg"
          alt="Premium Handbags Kenya - Mel's Fashion Blog"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/20 to-[#F5F2EB] flex items-end pb-16 px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[1800px] mx-auto w-full text-center md:text-left"
          >
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-stone-200 mb-3">Editorial</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white drop-shadow-lg mb-4">The Blog</h1>
            <p className="text-stone-100 text-lg font-serif italic max-w-2xl">
              Stories of craftsmanship, style, and the vibrant spirit of Nairobi.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {posts.length === 0 ? (
            <div className="col-span-full text-center py-20 opacity-50">
              <p className="text-xl font-serif">No stories yet. Check back soon.</p>
            </div>
          ) : (
            posts.map((post) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => onArticleClick(post)}
              >
                <div className="aspect-[16/10] bg-[#EBE7DE] overflow-hidden mb-8">
                  <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-[#A8A29E] font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author_name || 'Mel\'s Fashion'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif text-[#2C2A26] group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h3>
                  <p className="text-[#5D5A53] font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2C2A26] group-hover:translate-x-2 transition-transform">
                    Read Story
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
