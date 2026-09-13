import type { Metadata } from 'next';
import Reviews from '@/components/Reviews';
import GoogleReviewCTA from '@/components/GoogleReviewCTA';

export const metadata: Metadata = {
  title: "Customer Reviews | Mel's Fashion Nairobi",
  description: "Read customer feedback about Mel's Fashion handcrafted leather handbags in Nairobi, and share your own experience.",
  alternates: { canonical: '/reviews' },
};

export default function ReviewsPage() {
  return (
    <main className="pt-28 bg-[#F5F2EB]">
      <section className="px-6 md:px-12 py-20 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-4">Customer Stories</p>
        <h1 className="text-5xl md:text-7xl font-serif italic text-stone-900 mb-6">Reviews of Mel&apos;s Fashion</h1>
        <p className="max-w-2xl mx-auto text-lg text-stone-600 font-light leading-relaxed">
          Discover what customers say about our handcrafted leather handbags made in Nairobi, then share your own experience with our team.
        </p>
      </section>
      <Reviews />
      <section className="px-6 md:px-12 pb-24 max-w-5xl mx-auto">
        <GoogleReviewCTA />
      </section>
    </main>
  );
}
