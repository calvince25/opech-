import React from 'react';
import Link from 'next/link';
import { BookOpen, Shield, HelpCircle, Sparkles, Award } from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Leather Education',
    slug: 'leather-education',
    description: 'Learn about grain types, tanning methods, and how real leather is sourced.',
    icon: BookOpen,
    color: 'bg-amber-50 text-amber-800 border-amber-100',
  },
  {
    name: 'Leather Care',
    slug: 'leather-care',
    description: 'Practical guides to clean, restore, and protect your premium leather investment.',
    icon: Shield,
    color: 'bg-emerald-50 text-emerald-800 border-emerald-100',
  },
  {
    name: 'Buying Guides',
    slug: 'buying-guides',
    description: 'Step-by-step handbooks on selecting the perfect handbag style for your lifestyle.',
    icon: HelpCircle,
    color: 'bg-blue-50 text-blue-800 border-blue-100',
  },
  {
    name: 'Fashion & Styling',
    slug: 'fashion-styling',
    description: 'Trend reports and styling tips for coordinating bags with luxury silhouettes.',
    icon: Sparkles,
    color: 'bg-purple-50 text-purple-800 border-purple-100',
  },
  {
    name: 'Kenyan Craftsmanship',
    slug: 'kenyan-craftsmanship',
    description: 'Go behind the scenes of our Nairobi workshop and meet our local master artisans.',
    icon: Award,
    color: 'bg-rose-50 text-rose-800 border-rose-100',
  },
];

interface KnowledgeHubProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function KnowledgeHub({ activeCategory, onSelectCategory }: KnowledgeHubProps) {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-stone-500 block">The Learning Atelier</span>
        <h2 className="text-3xl md:text-5xl font-serif text-stone-900">Knowledge Hub & Leather Academy</h2>
        <p className="text-stone-600 font-light text-sm md:text-base leading-relaxed">
          Unlock the secrets of fine leatherwork. Explore our curated categories to master leather care, identify authentic grains, and support ethical Kenyan artisanship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.slug;
          
          return (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory?.(cat.slug)}
              className={`p-6 rounded-2xl border text-left flex flex-col justify-between space-y-8 transition-all hover:scale-[1.02] duration-300 ${
                isActive 
                  ? 'border-stone-900 bg-stone-900 text-white shadow-lg' 
                  : 'border-stone-200/80 bg-white text-stone-800 hover:shadow-md'
              }`}
            >
              <div className={`p-3 rounded-xl w-fit border ${isActive ? 'bg-stone-800 border-stone-700 text-white' : cat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-medium">{cat.name}</h3>
                <p className={`text-xs leading-relaxed font-light ${isActive ? 'text-stone-300' : 'text-stone-500'}`}>
                  {cat.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
