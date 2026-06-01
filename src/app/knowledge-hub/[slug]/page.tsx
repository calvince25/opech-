import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, User, Calendar, ShieldCheck, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';
import StructuredData from '@/components/SEO/StructuredData';
import { FALLBACK_ARTICLES, KnowledgeHubArticle } from '@/lib/knowledgeHubData';

interface Props {
  params: { slug: string };
}

// Build a lookup map from slug → article for fast access
const FALLBACK_MAP: Record<string, KnowledgeHubArticle> = Object.fromEntries(
  FALLBACK_ARTICLES.map(a => [a.slug, a])
);

// ── generateStaticParams: Pre-render all fallback article slugs at build time ──
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const staticSlugs = FALLBACK_ARTICLES.map(a => ({ slug: a.slug }));

  // Also attempt to add any published DB slugs
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('status', 'published');
    if (data) {
      const dbSlugs = data
        .filter((p: any) => p.slug && !FALLBACK_MAP[p.slug])
        .map((p: any) => ({ slug: p.slug }));
      return [...staticSlugs, ...dbSlugs];
    }
  } catch (e) {
    // Supabase unavailable at build time — use local fallback only
  }

  return staticSlugs;
}

// ── Dynamic Metadata ──
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  let article: KnowledgeHubArticle | null = FALLBACK_MAP[slug] || null;

  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('title, excerpt, image_url, category, created_at, author_name, slug')
      .eq('slug', slug)
      .single();
    if (data) {
      article = {
        id: data.slug,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || '',
        category: (data.category || 'leather-education').toLowerCase().replace(/\s+/g, '-'),
        created_at: data.created_at?.split('T')[0] || '',
        image_url: data.image_url || 'https://images.unsplash.com/photo-1524289286702-f07229da36f5?auto=format&fit=crop&q=80&w=1200',
        author_name: data.author_name || "Mel's Fashion Team",
        read_time: '7 min',
        content: '',
      };
    }
  } catch (e) {}

  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} | Mel's Leather Academy`,
    description: article.excerpt || `Read our guide on ${article.title}. Premium leather education, buying advice, and care tips from Mel's Fashion Nairobi.`,
    alternates: { canonical: `/knowledge-hub/${slug}` },
    openGraph: {
      images: [article.image_url],
      type: 'article',
      title: article.title,
      description: article.excerpt,
    },
  };
}

// ── Page Component ──
export default async function Page({ params }: Props) {
  const { slug } = await params;

  let article: KnowledgeHubArticle | null = FALLBACK_MAP[slug] || null;

  // Attempt a live DB fetch (overrides fallback if available)
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    if (data) {
      article = {
        id: data.id,
        title: data.title,
        slug: data.slug || slug,
        excerpt: data.excerpt || '',
        category: (data.category || 'leather-education').toLowerCase().replace(/\s+/g, '-'),
        created_at: data.created_at?.split('T')[0] || '',
        image_url: data.image_url || 'https://images.unsplash.com/photo-1524289286702-f07229da36f5?auto=format&fit=crop&q=80&w=1200',
        author_name: data.author_name || "Mel's Fashion Team",
        read_time: '7 min',
        content: data.content || '',
      };
    }
  } catch (e) {}

  if (!article) notFound();

  // Build related articles: same category, excluding current
  const relatedArticles = FALLBACK_ARTICLES
    .filter(a => a.category === article!.category && a.slug !== slug)
    .slice(0, 3);

  const breadcrumbLinks = [
    { name: 'Home', href: '/' },
    { name: 'Knowledge Hub', href: '/knowledge-hub' },
    { name: article.title, href: `/knowledge-hub/${slug}` },
  ];

  // Category → related shop section mapping
  const categoryShopMap: Record<string, { label: string; href: string }> = {
    'leather-education': { label: 'Shop Genuine Leather Bags', href: '/shop' },
    'leather-care': { label: 'Shop All Bags', href: '/shop' },
    'buying-guides': { label: 'Browse Our Collection', href: '/shop' },
    'fashion-styling': { label: 'Shop New Arrivals', href: '/shop/new-arrivals' },
    'kenyan-craftsmanship': { label: 'Shop Handcrafted Bags', href: '/shop/leather-handbags' },
  };
  const shopLink = categoryShopMap[article.category] || { label: 'Shop Our Collection', href: '/shop' };

  return (
    <>
      <StructuredData type="BreadcrumbList" data={{ links: breadcrumbLinks }} />
      <StructuredData type="Article" data={{
        title: article.title,
        image_url: article.image_url,
        created_at: article.created_at,
        author_name: article.author_name,
        description: article.excerpt,
      }} />

      <div className="min-h-screen bg-[#F5F2EB] pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* Back Navigation + Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
            <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/knowledge-hub" className="hover:text-stone-900 transition-colors">Knowledge Hub</Link>
            <span>/</span>
            <span className="text-stone-700 truncate max-w-[200px]">{article.title}</span>
          </div>

          <Link
            href="/knowledge-hub"
            className="inline-flex items-center gap-2 text-stone-900 font-bold uppercase tracking-widest text-xs hover:text-stone-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Knowledge Hub
          </Link>

          {/* Article Header */}
          <div className="space-y-6 max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 bg-white border border-stone-200 px-4 py-2 rounded-full w-fit block shadow-sm">
              {article.category.replace(/-/g, ' ')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-950 leading-tight">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="text-lg text-stone-500 font-light leading-relaxed max-w-2xl">{article.excerpt}</p>
            )}
            <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-stone-400 pt-2 border-t border-stone-200/60">
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-stone-500" /> By {article.author_name}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-stone-500" /> {article.created_at}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-stone-500" /> {article.read_time} Read</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="aspect-[21/9] bg-stone-100 rounded-3xl overflow-hidden shadow-sm border border-stone-200/40">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content + Sidebar Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">

            {/* Main Article Content */}
            <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-3xl border border-stone-100 shadow-sm">
              <article
                className="article-content prose prose-stone max-w-none text-stone-700 font-light leading-relaxed
                  prose-headings:font-serif prose-headings:text-stone-950
                  prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-base prose-p:leading-8 prose-p:text-stone-600
                  prose-strong:font-semibold prose-strong:text-stone-900"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Internal Cross-Link: Back to Hub */}
              <div className="mt-12 pt-8 border-t border-stone-100 flex items-center justify-between gap-4 flex-wrap">
                <Link
                  href="/knowledge-hub"
                  className="inline-flex items-center gap-2 text-stone-900 font-bold uppercase tracking-widest text-xs hover:text-stone-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> All Guides
                </Link>
                <Link
                  href={shopLink.href}
                  className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-stone-700 transition-colors"
                >
                  {shopLink.label} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">

              {/* Shop CTA */}
              <div className="bg-stone-900 text-stone-100 p-8 rounded-2xl space-y-4 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-stone-300" />
                <h3 className="font-serif text-xl text-white">Genuine Lifetime Sourcing</h3>
                <p className="text-stone-300 text-xs leading-relaxed font-light">
                  Mel's Fashion works directly with authorized Kenyan tanneries to ensure zero synthetic materials and fair artisan wages.
                </p>
                <Link
                  href={shopLink.href}
                  className="inline-block bg-white text-stone-950 px-4 py-2.5 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-stone-100 transition-colors w-full text-center"
                >
                  {shopLink.label}
                </Link>
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="bg-white border border-stone-100 p-8 rounded-2xl shadow-sm space-y-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-stone-400" />
                    <h3 className="font-bold uppercase tracking-widest text-[10px] text-stone-500">Related Guides</h3>
                  </div>
                  <ul className="space-y-5">
                    {relatedArticles.map(rel => (
                      <li key={rel.id}>
                        <Link
                          href={`/knowledge-hub/${rel.slug}`}
                          className="group flex gap-4 items-start"
                        >
                          <img
                            src={rel.image_url}
                            alt={rel.title}
                            className="w-16 h-16 object-cover rounded-xl shrink-0 border border-stone-100"
                          />
                          <div>
                            <p className="text-sm font-serif text-stone-900 leading-snug group-hover:text-stone-600 transition-colors">
                              {rel.title}
                            </p>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mt-1 block">{rel.read_time} read</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/knowledge-hub?category=${article.category}`}
                    className="text-[10px] font-bold uppercase tracking-widest text-stone-900 hover:text-stone-600 transition-colors border-b border-stone-900 pb-0.5 inline-block"
                  >
                    All {article.category.replace(/-/g, ' ')} guides →
                  </Link>
                </div>
              )}

              {/* Share Buttons */}
              <div className="bg-white border border-stone-100 p-8 rounded-2xl space-y-4 shadow-sm">
                <h3 className="font-serif text-lg text-stone-900">Share This Guide</h3>
                <p className="text-stone-500 text-xs leading-relaxed font-light">
                  Spread local, premium leather knowledge with your community.
                </p>
                <div className="flex gap-4">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${article.title} — https://mellsfashion.co.ke/knowledge-hub/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-xs font-bold uppercase tracking-widest text-center hover:bg-green-100 transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://mellsfashion.co.ke/knowledge-hub/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-xs font-bold uppercase tracking-widest text-center hover:bg-blue-100 transition-colors"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Guides Row — Bottom Cross Link */}
          {relatedArticles.length > 0 && (
            <div className="pt-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif text-stone-950">More From the Knowledge Hub</h2>
                <Link
                  href="/knowledge-hub"
                  className="text-[10px] font-bold uppercase tracking-widest text-stone-600 hover:text-stone-900 transition-colors"
                >
                  View All Guides →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map(rel => (
                  <Link
                    key={rel.id}
                    href={`/knowledge-hub/${rel.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="aspect-[16/9] bg-stone-100 overflow-hidden">
                      <img
                        src={rel.image_url}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{rel.category.replace(/-/g, ' ')}</span>
                      <h3 className="text-lg font-serif text-stone-900 group-hover:text-stone-600 transition-colors leading-snug">
                        {rel.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-stone-600">
                        Read Guide <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
