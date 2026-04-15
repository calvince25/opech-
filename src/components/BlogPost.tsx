import React, { useEffect } from 'react';
import Image from 'next/image';
import { BlogPost } from '../types';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft } from 'lucide-react';

interface BlogPostProps {
  post: BlogPost;
  onBack: () => void;
}

export default function BlogPostDetail({ post, onBack }: BlogPostProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.id]);

  return (
    <div className="pt-24 min-h-screen bg-[#F5F2EB] animate-fade-in-up">
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-24">
        
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A8A29E] hover:text-[#2C2A26] transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Journal
        </button>

        <header className="mb-16 text-center">
          <div className="flex items-center justify-center gap-6 text-xs uppercase tracking-widest text-[#A8A29E] font-medium mb-8">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.created_at).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {post.author_name || 'Mel\'s Fashion'}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-[#2C2A26] leading-tight mb-12">
            {post.title}
          </h1>
          <div className="relative aspect-[21/9] bg-[#EBE7DE] overflow-hidden rounded-2xl">
            <Image 
              src={post.image_url} 
              alt={post.title} 
              fill
              priority
              className="object-cover"
            />
          </div>
        </header>

        <div className="prose prose-stone prose-lg max-w-none">
          <div className="text-[#5D5A53] font-light leading-relaxed whitespace-pre-wrap text-xl">
            {post.content}
          </div>
        </div>
      </div>
    </div>
  );
}
