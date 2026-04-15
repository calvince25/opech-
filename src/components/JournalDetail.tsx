/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import Image from 'next/image';
import { BlogPost } from '../types';
import SEO from './SEO';

interface JournalDetailProps {
  article: BlogPost;
  onBack: () => void;
}

const JournalDetail: React.FC<JournalDetailProps> = ({ article, onBack }) => {
  return (
    <div className="min-h-screen bg-stone-50 animate-fade-in-up">
       <SEO 
         title={article.meta_title || article.title}
         description={article.meta_description || article.excerpt}
         image={article.image_url}
         type="article"
       />
       {/* Hero Image for Article - Full bleed to top so navbar sits on it */}
       <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden">
          <Image 
             src={article.image_url} 
             alt={article.title} 
             fill
             priority
             className="object-cover grayscale-[0.2] brightness-90"
          />
          <div className="absolute inset-0 bg-stone-900/10"></div>
       </div>

       <div className="max-w-3xl mx-auto px-6 md:px-12 -mt-32 relative z-10 pb-32">
          <div className="bg-stone-50/95 backdrop-blur-md p-8 md:p-16 shadow-2xl shadow-stone-900/5">
             <div className="flex justify-between items-center mb-12 border-b border-stone-200 pb-8">
                <button 
                  onClick={onBack}
                  className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Retour au Journal
                </button>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300">{new Date(article.created_at).toLocaleDateString()}</span>
             </div>

             <h1 className="text-4xl md:text-7xl font-serif text-stone-900 mb-12 leading-tight text-center italic lowercase">
               {article.title}
             </h1>

             <div className="prose prose-stone prose-lg mx-auto font-light leading-relaxed text-stone-600 first-letter:text-6xl first-letter:font-serif first-letter:text-stone-900 first-letter:mr-3 first-letter:float-left">
               {article.content}
             </div>
             
             <div className="mt-20 pt-16 border-t border-stone-100 flex justify-center">
                  <span className="text-3xl font-serif italic text-stone-900 lowercase">Maison Mel's</span>
             </div>
          </div>
       </div>
    </div>
  );
};

export default JournalDetail;
