"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { FALLBACK_ARTICLES, KnowledgeHubArticle } from '@/lib/knowledgeHubData';
import KnowledgeHubCategoryBrowser from '@/components/KnowledgeHub';
import { ArrowRight, BookOpen, Clock, Tag, Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function KnowledgeHubContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [dbArticles, setDbArticles] = useState<KnowledgeHubArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchArticles() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, category, created_at, image_url, author_name, status')
          .neq('category', 'General')
          .eq('status', 'published');
        
        if (error) throw error;
        if (data && data.length > 0) {
          const formatted = data.map((post: any) => ({
            id: post.id,
            title: post.title,
            slug: post.slug || post.id,
            excerpt: post.excerpt || '',
            category: (post.category || 'General').toLowerCase().replace(/\s+/g, '-'),
            created_at: post.created_at.split('T')[0],
            image_url: post.image_url || 'https://images.unsplash.com/photo-1524289286702-f07229da36f5?auto=format&fit=crop&q=80&w=800',
            author_name: post.author_name || "Mel's Fashion Team",
            read_time: '7 min',
            content: post.content || ''
          }));
          setDbArticles(formatted);
        }
      } catch (err) {
        console.error('Failed to fetch blog posts from Supabase. Falling back to local educational content.', err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  // Merge DB articles with fallback, deduplicating by slug
  const allArticles = (() => {
    const dbSlugs = new Set(dbArticles.map(a => a.slug));
    const fallbackUnique = FALLBACK_ARTICLES.filter(a => !dbSlugs.has(a.slug));
    return [...dbArticles, ...fallbackUnique];
  })();

  const filteredArticles = allArticles.filter(art => {
    const matchesCategory = activeCategory === 'all' || art.category === activeCategory;
    const matchesSearch = !searchQuery || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F2EB] pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Category Browser Component */}
        <KnowledgeHubCategoryBrowser 
          activeCategory={activeCategory} 
          onSelectCategory={(cat) => setActiveCategory(activeCategory === cat ? 'all' : cat)} 
        />

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search guides, care tips, buying advice..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-stone-200 rounded-2xl shadow-sm text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
          />
        </div>

        {/* Filter Indicator / Reset Button */}
        {(activeCategory !== 'all' || searchQuery) && (
          <div className="flex justify-between items-center bg-white py-4 px-6 rounded-xl border border-stone-200/60 shadow-sm">
            <span className="text-stone-600 text-sm font-light">
              {filteredArticles.length} guide{filteredArticles.length !== 1 ? 's' : ''} found
              {activeCategory !== 'all' && <> in <strong className="font-semibold text-stone-900 capitalize">{activeCategory.replace(/-/g, ' ')}</strong></>}
              {searchQuery && <> matching &ldquo;{searchQuery}&rdquo;</>}
            </span>
            <button 
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="text-stone-950 font-bold uppercase tracking-widest text-xs hover:text-stone-600 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Article Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm animate-pulse">
                <div className="aspect-[16/10] bg-stone-100" />
                <div className="p-8 space-y-4">
                  <div className="h-3 bg-stone-100 rounded w-1/4" />
                  <div className="h-6 bg-stone-100 rounded w-3/4" />
                  <div className="h-3 bg-stone-100 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-stone-200">
            <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-xl text-stone-500 font-serif italic">No guides found for this filter.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-6 text-stone-900 font-bold uppercase tracking-widest text-xs border-b border-stone-900 pb-0.5"
            >
              View All Guides
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <Link
                key={art.id}
                href={`/knowledge-hub/${art.slug}`}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-[16/10] bg-stone-100 relative overflow-hidden">
                  <img 
                    src={art.image_url} 
                    alt={art.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-stone-900/90 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                    <Tag className="w-3 h-3 text-stone-300" />
                    <span>{art.category.replace(/-/g, ' ')}</span>
                  </div>
                </div>

                <div className="p-8 flex flex-col justify-between flex-grow space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-stone-400">
                      <span>{art.created_at}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {art.read_time || '7 min'}</span>
                    </div>
                    <h3 className="text-2xl font-serif text-stone-950 leading-snug group-hover:text-stone-600 transition-colors">
                      {art.title}
                    </h3>
                    <p className="text-stone-500 font-light text-sm leading-relaxed line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-stone-400 text-xs font-light">By {art.author_name}</span>
                    <span className="inline-flex items-center gap-2 text-stone-950 font-bold uppercase tracking-widest text-xs group-hover:text-stone-600 transition-colors">
                      Read Guide <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Internal Linking: SEO Landing Page Footer */}
        <div className="bg-stone-900 text-white rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-stone-400 block">Ready to Shop?</span>
            <h2 className="text-3xl font-serif">Explore Our Leather Collection</h2>
            <p className="text-stone-300 font-light text-sm leading-relaxed">Browse our handcrafted leather handbags, crafted by local artisans in our Kilimani workshop.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link href="/shop" className="bg-white text-stone-900 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors text-center">
              Browse All Bags
            </Link>
            <Link href="/leather-bags-nairobi" className="border border-stone-700 text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors text-center">
              Nairobi Leather Bags
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5F2EB] pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-stone-500 font-serif italic text-sm">Loading Leather Academy...</p>
        </div>
      </div>
    }>
      <KnowledgeHubContent />
    </Suspense>
  );
}
