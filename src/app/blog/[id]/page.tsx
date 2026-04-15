import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface Props {
  params: { id: string };
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const id = (await params).id;
  const { data: post } = await supabase.from('blog_posts').select('*').eq('id', id).single();

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Mel's Fashion Journal`,
    description: post.excerpt || `Read our story about ${post.title} on Mel's Fashion Journal.`,
    alternates: {
      canonical: `/blog/${id}`,
    },
    openGraph: {
      images: [post.image_url || '/blog-hero.jpg'],
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const id = (await params).id;
  const { data: post } = await supabase.from('blog_posts').select('*').eq('id', id).single();

  if (!post) {
    notFound();
  }

  // Transform relative Supabase URLs to absolute ones if needed
  const transformedContent = post.content.replace(
    /src="\/storage\/v1\/object\/public\//g,
    `src="${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/`
  );

  return (
    <>
      <div className="min-h-screen bg-[#F5F2EB]">
        
        {/* Article Hero */}
        <div className="w-full h-[60vh] relative overflow-hidden">
          <Image 
            src={post.image_url || 'https://images.unsplash.com/photo-1524289286702-f07229da36f5?auto=format&fit=crop&q=80&w=2000'} 
            alt={post.title} 
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F2EB] via-transparent to-stone-900/10"></div>
        </div>

        <article className="max-w-4xl mx-auto px-6 md:px-12 -mt-40 relative z-10 pb-32">
          <div className="bg-white p-8 md:p-20 rounded-3xl shadow-2xl shadow-stone-900/5">
            <div className="flex flex-col items-center text-center mb-16">
              <Link 
                href="/blog"
                className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 hover:text-stone-900 transition-all mb-12"
              >
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                Back to Journal
              </Link>
              
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Editorial</span>
                <span className="mx-4 text-stone-200">|</span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
                    {new Date(post.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>

              <h1 className="text-4xl md:text-7xl font-serif text-stone-900 mb-8 leading-[1.1]">
                {post.title}
              </h1>

              <p className="text-xl text-stone-500 font-serif italic max-w-2xl leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div 
              className="prose prose-stone prose-lg max-w-none font-light leading-relaxed text-stone-600 article-content"
              dangerouslySetInnerHTML={{ __html: transformedContent }}
            />
            
            <div className="mt-20 pt-16 border-t border-stone-100 flex flex-col items-center">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-stone-300 mb-4 block">Finis</span>
                <span className="text-2xl font-serif italic text-stone-900">Mel's Fashion</span>
            </div>
          </div>
        </article>

        {/* Footer Navigation */}
        <section className="bg-stone-900 py-32 text-white">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 text-center">
                <h2 className="text-4xl md:text-6xl font-serif mb-12">Discover More Stories</h2>
                <Link 
                    href="/blog"
                    className="inline-flex items-center gap-4 px-12 py-6 border border-white/20 rounded-full text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-stone-900 transition-all duration-500"
                >
                    View All Journal Entries
                </Link>
            </div>
        </section>

      </div>
    </>
  );
}
