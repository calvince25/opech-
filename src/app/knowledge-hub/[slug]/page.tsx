import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Calendar, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import StructuredData from '@/components/SEO/StructuredData';

interface Props {
  params: { slug: string };
}

// Fallback Articles Data for Robust Static/Hydration Resolution
const FALLBACK_ARTICLES: Record<string, any> = {
  'ultimate-guide-to-leather-bags-in-kenya': {
    title: 'Ultimate Guide To Genuine Leather Bags In Kenya',
    category: 'Leather Education',
    created_at: '2026-05-15',
    image_url: 'https://images.unsplash.com/photo-1524289286702-f07229da36f5?auto=format&fit=crop&q=80&w=1200',
    author_name: 'Mel\'s Fashion Team',
    excerpt: 'Deep dive into full-grain vs top-grain leather quality, ethical sourcing practices, and local master craftsmanship in Nairobi.',
    content: `
      <h2>The Quality Paradigm: Understanding Genuine Leather</h2>
      <p>Genuine leather is one of nature's most beautiful, resilient, and versatile materials. When crafted with respect and skill, a real leather bag is not just an accessory—it is a lifetime investment. However, for many fashion shoppers in Kenya, navigating the leather market can be highly confusing due to complex terminology and lower-quality synthetic imitations.</p>
      
      <h3>Full-Grain Leather: The Ultimate Standard</h3>
      <p>Full-grain leather represents the absolute highest quality grade of leather available globally. It is constructed from the outermost layer of the hide, directly beneath the hair, retaining all of its natural grain, thickness, and inherent strength. Because the grain surface is left completely natural and untouched (never sanded, buffed, or corrected), it retains its unique organic pores, markings, and surface characteristics.</p>
      <p>This premium grade is exceptionally durable and highly resistant to moisture, wear, and scratching. Most importantly, full-grain leather develops a magnificent natural patina over years of use—gradually growing softer, smoother, and richer in color. At Mel's Fashion, we work extensively with full-grain leather sourced from local Kenyan tanneries to produce our signature totes and crossbody bags.</p>

      <h3>Top-Grain Leather: Supple Elegance</h3>
      <p>Top-grain leather is the second-highest quality grade. In this class, the outer grain surface of the hide is gently sanded and buffed to erase minor organic scars or surface variations. A protective seal is then applied to the surface. This produces an exceptionally smooth, supple, and lightweight leather that is highly uniform in color and texture. It is ideal for structured evening clutches and accessories that require absolute visual consistency.</p>
    `
  },
  'complete-leather-care-guide-for-kenyan-women': {
    title: 'Complete Leather Care Guide For Kenyan Women',
    category: 'Leather Care',
    created_at: '2026-05-18',
    image_url: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&q=80&w=1200',
    author_name: 'Mel\'s Fashion Team',
    excerpt: 'Protect your luxury bags from humidity, heat, and seasonal weather with our specialized tropical care system.',
    content: `
      <h2>Preserving the Beauty of Your Luxury Investment</h2>
      <p>Genuine leather is an organic material, much like your own skin. It requires proper hydration, clean storage, and general protection to preserve its moisture, flexibility, and beautiful luster over time. In Kenya's tropical climate—where high humidity during rainy seasons alternates with hot, dusty dry seasons—leather bags require dedicated care to prevent surface cracking, discoloration, and mold development.</p>

      <h3>1. Cleaning: Gently Removing Daily Dust and Oils</h3>
      <p>Always clear surface dust off your bag using a dry, clean microfiber cloth after daily wear. For minor stains or dirt accumulation, prepare a mild, highly diluted soapy water mixture using premium neutral soap. Gently wipe down the leather surface with a slightly damp cloth, taking care not to soak the leather. Wipe away any excess soap film with a clean damp cloth, and air-dry the bag naturally in a cool, shaded area away from direct sunlight or heat sources.</p>

      <h3>2. Conditioning: Hydration is Crucial</h3>
      <p>To keep the leather supple and prevent surface cracking, apply a specialized, premium leather conditioner or leather balm every 3-6 months. Rub a tiny drop of the conditioner onto a soft cloth and apply it to the bag in circular motions. Allow it to sit for 30 minutes, then gently buff the surface with a clean cloth to restore its natural sheen.</p>
    `
  },
  'luxury-bag-buying-guide': {
    title: 'Luxury Handbag Buying Guide: The Timeless Smart Investment',
    category: 'Buying Guides',
    created_at: '2026-05-22',
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1200',
    author_name: 'Mel\'s Fashion Team',
    excerpt: 'Step-by-step framework to evaluate weight, capacity, hardware durability, and classic design versatility before buying.',
    content: `
      <h2>The Framework of a Timeless Fashion Investment</h2>
      <p>A luxury handbag is a key pillar of a woman's wardrobe, representing a major financial investment and an expression of personal brand. Before purchasing a premium piece, it is vital to look beyond marketing slogans and thoroughly evaluate structural integrity, material quality, and real daily utility.</p>

      <h3>1. Hardware: The Anchor of Strength</h3>
      <p>Zippers, buckles, and strap hooks are the hard-working mechanical components of your bag. Luxury bags utilize solid metal hardware—such as heavy solid brass or stainless steel—which feels heavy, functions smoothly, and will not flake, rust, or bend under heavy weight. Check that zipper actions are exceptionally smooth and that strap attachments are securely reinforced with rivets.</p>

      <h3>2. Proportions and Everyday Capacity</h3>
      <p>Assess your daily essentials before choosing a silhouette. If you require laptop and document capacity, a structured tote bag with wide, flat shoulder straps is essential. If you require quick access to keys, wallets, and cosmetics during active weekends, choose a lightweight crossbody bag with secure compartments.</p>
    `
  }
};

// Dynamic Metadata
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  
  // Try database fetch
  let article = null;
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    if (data) article = data;
  } catch (e) {}

  // Fallback to local
  if (!article && FALLBACK_ARTICLES[slug]) {
    article = FALLBACK_ARTICLES[slug];
  }

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | Mel's Fashion Leather Academy`,
    description: article.excerpt || `Read our professional guide on ${article.title} to learn about premium leather, local craftsmanship, and handbag care in Kenya.`,
    alternates: {
      canonical: `/knowledge-hub/${slug}`,
    },
    openGraph: {
      images: [article.image_url || '/blog-hero.jpg'],
      type: 'article',
    },
  };
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;

  // Try database fetch
  let article = null;
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    if (data) {
      article = {
        title: data.title,
        category: data.category || 'Leather Education',
        created_at: data.created_at.split('T')[0],
        image_url: data.image_url || 'https://images.unsplash.com/photo-1524289286702-f07229da36f5?auto=format&fit=crop&q=80&w=1200',
        author_name: data.author_name || 'Mel\'s Fashion Team',
        excerpt: data.excerpt || '',
        content: data.content
      };
    }
  } catch (e) {}

  // Fallback to local
  if (!article && FALLBACK_ARTICLES[slug]) {
    article = FALLBACK_ARTICLES[slug];
  }

  if (!article) {
    notFound();
  }

  const breadcrumbLinks = [
    { name: 'Home', href: '/' },
    { name: 'Knowledge Hub', href: '/knowledge-hub' },
    { name: article.title, href: `/knowledge-hub/${slug}` }
  ];

  return (
    <>
      {/* Schema Injection */}
      <StructuredData type="BreadcrumbList" data={{ links: breadcrumbLinks }} />
      <StructuredData type="Article" data={{ 
        title: article.title, 
        image_url: article.image_url, 
        created_at: article.created_at, 
        author_name: article.author_name,
        description: article.excerpt 
      }} />

      <div className="min-h-screen bg-[#F5F2EB] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Back Navigation */}
          <Link 
            href="/knowledge-hub" 
            className="inline-flex items-center gap-2 text-stone-900 font-bold uppercase tracking-widest text-xs hover:text-stone-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Knowledge Hub
          </Link>

          {/* Article Header */}
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 bg-white border border-stone-200 px-4 py-2 rounded-full w-fit block shadow-sm">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-950 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-xs uppercase font-bold tracking-widest text-stone-400 pt-2 border-t border-stone-200/60">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-stone-500" /> By {article.author_name}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-stone-500" /> {article.created_at}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-stone-500" /> 8 Min Read</span>
            </div>
          </div>

          {/* Hero Feature Image */}
          <div className="aspect-[21/9] bg-stone-100 rounded-3xl overflow-hidden shadow-sm border border-stone-200/40">
            <img 
              src={article.image_url} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
            
            {/* Main Text Content */}
            <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-3xl border border-stone-100 shadow-sm">
              <article 
                className="article-content prose prose-stone max-w-none text-stone-700 font-light leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Sidebar Care / Info Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-stone-900 text-stone-100 p-8 rounded-2xl space-y-4 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-stone-300" />
                <h3 className="font-serif text-xl text-white">Genuine Lifetime Sourcing</h3>
                <p className="text-stone-300 text-xs leading-relaxed font-light">
                  Mel's Fashion works directly with authorized, eco-conscious tanneries in Kenya to ensure zero synthetic materials and fair artisan employment.
                </p>
                <Link 
                  href="/shop" 
                  className="inline-block bg-white text-stone-950 px-4 py-2.5 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-stone-100 transition-colors w-full text-center"
                >
                  Explore the Shop
                </Link>
              </div>

              <div className="bg-white border border-stone-100 p-8 rounded-2xl space-y-4 shadow-sm">
                <h3 className="font-serif text-lg text-stone-900">Share This Guide</h3>
                <p className="text-stone-500 text-xs leading-relaxed font-light">
                  Spread the knowledge. Educate your friends on local, premium luxury craftsmanship and leather care.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="p-3 bg-stone-50 rounded-full hover:bg-stone-150 transition-colors border border-stone-100 text-stone-800 text-xs font-semibold">Facebook</a>
                  <a href="#" className="p-3 bg-stone-50 rounded-full hover:bg-stone-150 transition-colors border border-stone-100 text-stone-800 text-xs font-semibold">WhatsApp</a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
