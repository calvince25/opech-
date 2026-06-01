import React from 'react';
import Link from 'next/link';

export default function HomepageSEOContent() {
  return (
    <section className="py-24 bg-stone-50 border-t border-stone-100">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Main Copy (8 columns) */}
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 block">The Art of Fine Leather</span>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
                Premium Handbags in Nairobi: The Epitome of Handcrafted Luxury
              </h2>
            </div>
            
            <p className="text-lg text-stone-600 font-light leading-relaxed">
              At <strong className="font-semibold text-stone-800">Mel's Fashion</strong>, we believe a handbag is more than an accessory—it is an extension of a woman's elegance, a functional masterpiece, and a companion through her daily journey. Based in the heart of Nairobi, our local atelier is dedicated to designing and crafting the finest <strong className="font-semibold text-stone-800">premium leather handbags in Kenya</strong>. Every stitch, fold, and burnished edge is a testament to the timeless heritage of traditional African and international leather craftsmanship.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <h3 className="text-xl font-serif text-stone-800">Artisanal Genuine Leather</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  We source only the highest grade of full-grain and top-grain cowhide leather, ensuring that each bag develops a unique, premium patina over time. From robust tote bags to delicate, structured evening clutches, our leather is selected for its strength, supple texture, and aesthetic grace.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-serif text-stone-800">Nairobi's Finest Workshops</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Proudly made in Nairobi, Kenya, our workshop supports local artisans by nurturing high-skill craftsmanship and paying fair wages. Our creations showcase that premium luxury products can be entirely conceptualized and produced locally within East Africa.
                </p>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <h3 className="text-2xl font-serif text-stone-900">Uncompromising Design & Local Sophistication</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Whether you are navigating the corporate halls of Westlands, meeting for brunch in Kilimani, or attending an exclusive event in Karen, our versatile collections are designed to elevate your personal style. Our range encompasses:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-stone-700 text-sm">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-stone-900 rounded-full"></span>
                  <span>Premium Tote Bags for executive utility</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-stone-900 rounded-full"></span>
                  <span>Elegant Crossbody Bags for hands-free chic</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-stone-900 rounded-full"></span>
                  <span>Artisanal Clutch Bags for evening luxury</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-stone-900 rounded-full"></span>
                  <span>Bespoke custom leather accessories</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-2xl font-serif text-stone-900">Our Local Commitment Across Kenya</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                We are proud to serve fashionable clientele across major hubs. We offer express secure deliveries throughout Nairobi—including Lavington, Runda, Muthaiga, Gigiri, and CBD—and prompt national parcel delivery to Mombasa, Kisumu, Nakuru, and Eldoret. When you purchase a Mel's Fashion piece, you invest in a piece of Kenyan luxury that stands shoulder-to-shoulder with global fashion houses.
              </p>
              <div className="pt-6">
                <Link 
                  href="/shop" 
                  className="inline-block bg-stone-900 text-white px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors"
                >
                  Explore The Collection
                </Link>
              </div>
            </div>
          </div>
          
          {/* Quick FAQ / Info sidebar (4 columns) */}
          <div className="lg:col-span-4 bg-white p-8 rounded-2xl border border-stone-100 shadow-sm space-y-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Why Mel's Fashion?</h4>
              <h3 className="text-2xl font-serif text-stone-900">Frequently Asked Questions</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2 border-b border-stone-100 pb-4">
                <h4 className="font-semibold text-stone-800 text-sm">Are your bags made of 100% genuine leather?</h4>
                <p className="text-stone-500 text-xs leading-relaxed">
                  Yes. All Mel's Fashion handbags are handcrafted exclusively from 100% genuine local and imported cowhide leather. We never use faux, PU, or synthetic leather.
                </p>
              </div>
              
              <div className="space-y-2 border-b border-stone-100 pb-4">
                <h4 className="font-semibold text-stone-800 text-sm">Where are you located in Nairobi?</h4>
                <p className="text-stone-500 text-xs leading-relaxed">
                  Our workshop and primary dispatch office is situated in the Kilimani district of Nairobi. Customers can order online and request express courier dispatch to their doorsteps.
                </p>
              </div>
              
              <div className="space-y-2 border-b border-stone-100 pb-4">
                <h4 className="font-semibold text-stone-800 text-sm">How do I care for my premium leather bag?</h4>
                <p className="text-stone-500 text-xs leading-relaxed">
                  Keep your bag in a cool, dry place when not in use. Use a specialized leather conditioner every 3-6 months to maintain its moisture and prevent surface cracking. Avoid direct exposure to prolonged rain and direct heat.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-stone-800 text-sm">Do you offer dynamic custom orders?</h4>
                <p className="text-stone-500 text-xs leading-relaxed">
                  Absolutely. If you seek a particular colorway, lining fabric, or custom initials embossing, get in touch with our team through our <Link href="/contact" className="underline hover:text-stone-800">Contact Page</Link>.
                </p>
              </div>
            </div>
            
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-100 text-center space-y-4">
              <h4 className="font-serif text-stone-800">Learn More from our Specialists</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Discover the deep heritage of leather-making, care tutorials, and seasonal trends on our newly launched educational platform.
              </p>
              <Link 
                href="/knowledge-hub" 
                className="inline-block text-xs font-bold uppercase tracking-wider text-stone-900 border-b border-stone-900 pb-0.5 hover:text-stone-600 transition-colors"
              >
                Visit the Knowledge Hub
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
