import React from 'react';
import Link from 'next/link';
import StructuredData from '@/components/SEO/StructuredData';
import { Product } from '@/types';

interface FAQ {
  question: string;
  answer: string;
}

interface ContentSection {
  title: string;
  text: string;
}

interface LandingPageTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  primaryKeyword: string;
  contentSections: ContentSection[];
  faqs: FAQ[];
  products: Product[];
  path: string;
}

export default function LandingPageTemplate({
  title,
  subtitle,
  description,
  primaryKeyword,
  contentSections,
  faqs,
  products,
  path,
}: LandingPageTemplateProps) {
  const breadcrumbLinks = [
    { name: 'Home', href: '/' },
    { name: title, href: path }
  ];

  return (
    <>
      {/* Schema Injection */}
      <StructuredData type="BreadcrumbList" data={{ links: breadcrumbLinks }} />
      <StructuredData type="FAQPage" data={{ faqs }} />

      <div className="min-h-screen bg-[#F5F2EB] pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Breadcrumb Navigation UI */}
          <nav className="text-xs tracking-widest uppercase text-stone-400 flex items-center gap-2">
            <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-stone-900 font-semibold">{title}</span>
          </nav>

          {/* Header Section */}
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500 block">{subtitle}</span>
            <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-stone-600 font-light leading-relaxed">
              {description}
            </p>
          </div>

          {/* Product Recommendations */}
          <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-stone-200 pb-4">
              <div>
                <h2 className="text-2xl font-serif text-stone-900">Exclusive Handcrafted Collection</h2>
                <p className="text-xs text-stone-400 mt-1 uppercase tracking-widest">Nairobi's Finest Leather Masterpieces</p>
              </div>
              <Link 
                href="/shop" 
                className="text-xs font-bold uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-stone-500 transition-colors"
              >
                View Full Shop
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="aspect-[4/5] bg-stone-50 relative overflow-hidden">
                    <img 
                      src={product.image_url || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800'} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div>
                      <h3 className="font-serif text-stone-900 text-lg group-hover:text-stone-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-stone-500 text-xs mt-1 font-light line-clamp-2">{product.tagline || product.description}</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-serif text-stone-800 font-medium">KES {product.price?.toLocaleString()}</span>
                      <Link 
                        href={`/product/${product.id}`}
                        className="text-xs font-bold uppercase tracking-widest bg-stone-900 text-white px-4 py-2.5 rounded hover:bg-stone-800 transition-colors"
                      >
                        View Piece
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-8 border-t border-stone-200">
            <div className="lg:col-span-8 space-y-12">
              {contentSections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-serif text-stone-900">{section.title}</h2>
                  <p className="text-stone-600 font-light leading-relaxed whitespace-pre-line">
                    {section.text}
                  </p>
                </div>
              ))}

              {/* Internal Linking Block */}
              <div className="bg-stone-900 text-stone-100 p-8 md:p-12 rounded-3xl space-y-6">
                <h3 className="text-2xl font-serif text-white">Experience Genuine Kenyan Artistry</h3>
                <p className="text-stone-300 font-light text-sm leading-relaxed max-w-2xl">
                  Each Mel's Fashion bag carries a story of dedicated craftsmanship. We ethically source hides, design and cut each pattern manually, and hand-assemble every piece in our Nairobi workshop.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link 
                    href="/shop" 
                    className="bg-white text-stone-900 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors"
                  >
                    Browse Handbags
                  </Link>
                  <Link 
                    href="/knowledge-hub" 
                    className="border border-stone-700 text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors"
                  >
                    Leather Care Guide
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ and Sidebar Area */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm space-y-6">
                <h3 className="text-xl font-serif text-stone-900 border-b border-stone-100 pb-3">Frequently Asked</h3>
                
                <div className="space-y-6">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="font-semibold text-stone-800 text-sm">{faq.question}</h4>
                      <p className="text-stone-500 text-xs leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Area Served Information */}
              <div className="bg-stone-50 border border-stone-200/60 p-8 rounded-2xl space-y-4">
                <h4 className="text-xs font-bold tracking-wider uppercase text-stone-400">Local Nairobi Delivery</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We serve clients with express local courier delivery in: <br/>
                  <strong>Westlands, Kilimani, Karen, Lavington, Runda, Gigiri, Muthaiga, and Nairobi CBD.</strong>
                </p>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Countrywide deliveries via secure parcel service reach Mombasa, Kisumu, Nakuru, Eldoret, and beyond within 24-48 hours.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
