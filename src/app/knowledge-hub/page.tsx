"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import KnowledgeHubCategoryBrowser from '@/components/KnowledgeHub';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  created_at: string;
  image_url: string;
  author_name: string;
  read_time?: string;
}

const FALLBACK_ARTICLES: Article[] = [
  // Leather Education
  {
    id: 'kh-1',
    title: 'Ultimate Guide To Genuine Leather Bags In Kenya',
    slug: 'ultimate-guide-to-leather-bags-in-kenya',
    excerpt: 'Deep dive into full-grain vs top-grain leather quality, ethical sourcing practices, and local master craftsmanship in Nairobi.',
    category: 'leather-education',
    created_at: '2026-05-15',
    image_url: 'https://images.unsplash.com/photo-1524289286702-f07229da36f5?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '12 min'
  },
  {
    id: 'kh-2',
    title: 'How To Identify Genuine Leather Products Instantly',
    slug: 'how-to-identify-genuine-leather-products',
    excerpt: 'Avoid low-quality faux and synthetic options with our definitive five-step physical inspection guide for luxury shoppers.',
    category: 'leather-education',
    created_at: '2026-05-10',
    image_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '8 min'
  },
  {
    id: 'kh-3',
    title: 'The Tanning Spectrum: Vegetable, Chrome & Eco-Conscious Leather',
    slug: 'tanning-spectrum-vegetable-chrome-eco-leather',
    excerpt: 'An educational overview of tanning chemistry, leather environmental impacts, and why organic methods produce superior accessories.',
    category: 'leather-education',
    created_at: '2026-04-28',
    image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '7 min'
  },
  {
    id: 'kh-4',
    title: 'Full-Grain vs Top-Grain: Deciphering Luxury Leather Grades',
    slug: 'full-grain-vs-top-grain-leather-grades',
    excerpt: 'Demystifying industry jargon. Discover why full-grain leather is the ultimate investment for durable luxury accessories.',
    category: 'leather-education',
    created_at: '2026-04-12',
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '6 min'
  },
  {
    id: 'kh-5',
    title: 'Bovine vs Exotic Hides: Selection Criteria for Master Leatherwork',
    slug: 'bovine-vs-exotic-hides-selection-criteria',
    excerpt: 'Explore the texture, grain patterns, and ethical challenges behind different animal hides used in the premium fashion industry.',
    category: 'leather-education',
    created_at: '2026-03-24',
    image_url: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '9 min'
  },

  // Leather Care
  {
    id: 'kh-6',
    title: 'Complete Leather Care Guide For Kenyan Women',
    slug: 'complete-leather-care-guide-for-kenyan-women',
    excerpt: 'Protect your luxury bags from humidity, heat, and seasonal weather with our specialized tropical care system.',
    category: 'leather-care',
    created_at: '2026-05-18',
    image_url: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '10 min'
  },
  {
    id: 'kh-7',
    title: 'How To Safely Clean & Condition Premium Luxury Leather',
    slug: 'how-to-clean-condition-premium-leather',
    excerpt: 'Remove everyday stains, dust, and minor grease without stripping natural moisture or damaging organic protective finishes.',
    category: 'leather-care',
    created_at: '2026-05-02',
    image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '6 min'
  },
  {
    id: 'kh-8',
    title: 'Seasonal Leather Storage: Shielding Handbags from Nairobi Humidity',
    slug: 'seasonal-leather-storage-humidity-shield',
    excerpt: 'Maintain optimal handbag structure and prevent mold development during high-moisture rainy seasons with simple home methods.',
    category: 'leather-care',
    created_at: '2026-04-15',
    image_url: 'https://images.unsplash.com/photo-1524289286702-f07229da36f5?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '5 min'
  },
  {
    id: 'kh-9',
    title: 'Restoring Scratch Damaged Full-Grain Leather Bags Safely',
    slug: 'restoring-scratches-full-grain-leather-bags',
    excerpt: 'Easy home remedies using clean microfiber cloths, soft leather balms, and natural oils to gently buff away surface scratches.',
    category: 'leather-care',
    created_at: '2026-03-30',
    image_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '5 min'
  },
  {
    id: 'kh-10',
    title: 'Why Waterproofing Sprays Can Damage Premium Aniline Leather',
    slug: 'why-waterproofing-sprays-damage-aniline-leather',
    excerpt: 'Understand leather breathability and learn why silicon-based aerosol sealants do more harm than good to premium open-pore surfaces.',
    category: 'leather-care',
    created_at: '2026-03-05',
    image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '7 min'
  },

  // Buying Guides
  {
    id: 'kh-11',
    title: 'Luxury Handbag Buying Guide: The Timeless Smart Investment',
    slug: 'luxury-handbag-buying-guide',
    excerpt: 'Step-by-step framework to evaluate weight, capacity, hardware durability, and classic design versatility before buying.',
    category: 'buying-guides',
    created_at: '2026-05-22',
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '9 min'
  },
  {
    id: 'kh-12',
    title: 'The Perfect Corporate Tote: Work Bag Selection Criteria',
    slug: 'perfect-corporate-tote-selection-criteria',
    excerpt: 'Ditch basic designs. Learn how to select a premium work bag that balances heavy duty laptop utility with boardroom-ready style.',
    category: 'buying-guides',
    created_at: '2026-05-05',
    image_url: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '7 min'
  },
  {
    id: 'kh-13',
    title: 'Clutch vs Crossbody: Selecting the Ideal Occasion Handbag',
    slug: 'clutch-vs-crossbody-selecting-occasion-handbag',
    excerpt: 'A styling match guide to choosing between compact evening statement clutches and ultra-versatile weekend crossbody bags.',
    category: 'buying-guides',
    created_at: '2026-04-20',
    image_url: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '6 min'
  },
  {
    id: 'kh-14',
    title: 'Five Critical Questions To Ask A Premium Leather Vendor',
    slug: 'five-questions-to-ask-leather-vendor',
    excerpt: 'Equip yourself for premium shopping. Understand tanning methods, stitch reinforcement, and hide origins to verify product value.',
    category: 'buying-guides',
    created_at: '2026-03-18',
    image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '6 min'
  },
  {
    id: 'kh-15',
    title: 'Investing in Custom Leather: Costs, Timelines & Bespoke Value',
    slug: 'investing-in-custom-leather-bespoke-value',
    excerpt: 'Understand what goes into crafting a tailor-made handbag personalized specifically to your structural requirements in Nairobi.',
    category: 'buying-guides',
    created_at: '2026-02-28',
    image_url: 'https://images.unsplash.com/photo-1524289286702-f07229da36f5?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '8 min'
  },

  // Fashion & Styling
  {
    id: 'kh-16',
    title: 'Coordinating Premium Handbags with Contemporary Corporate Attire',
    slug: 'coordinating-handbags-with-corporate-attire',
    excerpt: 'Elevate your executive identity in Westlands and Nairobi CBD. Master the art of clean color pairings and elegant structures.',
    category: 'fashion-styling',
    created_at: '2026-05-12',
    image_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '6 min'
  },
  {
    id: 'kh-17',
    title: 'The Satchel Silhouette: Timeless Weekend Casual Outfits',
    slug: 'satchel-silhouette-weekend-casual-outfits',
    excerpt: 'Style casual earth-toned Rift Valley satchels with linen shirts, denim, and premium flats for flawless weekend brunches.',
    category: 'fashion-styling',
    created_at: '2026-04-05',
    image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '5 min'
  },

  // Kenyan Craftsmanship
  {
    id: 'kh-18',
    title: 'The Deep History Of Leather Craftsmanship In Kenya',
    slug: 'history-of-leather-craftsmanship-in-kenya',
    excerpt: 'From nomadic cattle-herding heritage to modern premium Nairobi workshops. Explore the rich legacy of high-grade tanning.',
    category: 'kenyan-craftsmanship',
    created_at: '2026-05-24',
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '8 min'
  },
  {
    id: 'kh-19',
    title: 'Behind The Stitch: A Day in Our Kilimani Nairobi Workshop',
    slug: 'behind-the-stitch-nairobi-workshop-tour',
    excerpt: 'Meet our master leather artisans, explore our physical tools, and discover how slow, ethical fashion operates in practice.',
    category: 'kenyan-craftsmanship',
    created_at: '2026-05-01',
    image_url: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '7 min'
  },
  {
    id: 'kh-20',
    title: 'Supporting Ethical Tanning: Our Raw Material Sourcing Practices',
    slug: 'supporting-ethical-tanning-sourcing-practices',
    excerpt: 'Learn how Mel\'s Fashion guarantees zero child labor, supports organic circular systems, and secures premium hides locally.',
    category: 'kenyan-craftsmanship',
    created_at: '2026-04-10',
    image_url: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&q=80&w=800',
    author_name: 'Mel\'s Fashion Team',
    read_time: '9 min'
  }
];

export default function Page() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dbArticles, setDbArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, category, created_at, image_url, author_name')
          .neq('category', 'General');
        
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
            author_name: post.author_name || 'Mel\'s Fashion Team',
            read_time: '7 min'
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

  const allArticles = dbArticles.length > 0 ? [...dbArticles, ...FALLBACK_ARTICLES] : FALLBACK_ARTICLES;

  // Filter unique articles by slug or id to prevent duplicates
  const uniqueArticlesMap = new Map();
  allArticles.forEach(art => {
    uniqueArticlesMap.set(art.slug || art.id, art);
  });
  const uniqueArticles = Array.from(uniqueArticlesMap.values());

  const filteredArticles = activeCategory === 'all'
    ? uniqueArticles
    : uniqueArticles.filter(art => art.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F5F2EB] pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Category Browser Component */}
        <KnowledgeHubCategoryBrowser 
          activeCategory={activeCategory} 
          onSelectCategory={(cat) => setActiveCategory(activeCategory === cat ? 'all' : cat)} 
        />

        {/* Filter Indicator / Reset Button */}
        {activeCategory !== 'all' && (
          <div className="flex justify-between items-center bg-white py-4 px-6 rounded-xl border border-stone-200/60 shadow-sm">
            <span className="text-stone-600 text-sm font-light">
              Showing articles under <strong className="font-semibold text-stone-900 capitalize">{activeCategory.replace('-', ' ')}</strong>
            </span>
            <button 
              onClick={() => setActiveCategory('all')}
              className="text-stone-950 font-bold uppercase tracking-widest text-xs hover:text-stone-600 transition-colors"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <div 
              key={art.id} 
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
                  <span>{art.category.replace('-', ' ')}</span>
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
                  <Link 
                    href={`/knowledge-hub/${art.slug}`}
                    className="inline-flex items-center gap-2 text-stone-950 font-bold uppercase tracking-widest text-xs hover:text-stone-600 transition-colors"
                  >
                    Read Guide <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
