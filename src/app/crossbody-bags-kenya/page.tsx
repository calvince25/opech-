import React from 'react';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import LandingPageTemplate from '@/components/LandingPageTemplate';

export const metadata: Metadata = {
  title: "Crossbody Bags Kenya | Handcrafted Leather Crossbody Bags",
  description: "Discover elegant, hands-free handcrafted leather crossbody bags in Kenya at Mel's Fashion. Perfect for travel, weekends, and premium style. Nairobi delivery.",
  alternates: {
    canonical: 'https://www.mellsfashion.co.ke/crossbody-bags-kenya',
  },
};

export default async function Page() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .limit(4);

  const contentSections = [
    {
      title: "Leather Crossbody Bags in Kenya: Hands-Free Luxury for Every Day",
      text: "For weekends, urban exploration, and sophisticated travel, a crossbody bag offers unmatched comfort, security, and hands-free convenience. At Mel's Fashion, we handcraft premium leather crossbody bags in Kenya that fuse compact elegance with smart, functional design.\n\nHandcrafted in Nairobi, our crossbody bags feature adjustable, comfortable shoulder straps, secure zipper closures, and highly durable hardware. We focus on creating beautiful, structured silhouettes that sit comfortably against the body, making them the perfect companion for an active, stylish lifestyle."
    },
    {
      title: "Meticulous Hand-Craftsmanship & Premium Detailing",
      text: "A crossbody bag undergoes continuous movement and friction as you walk. That is why we construct each piece with the most durable materials and advanced structural reinforcement.\n\nWe utilize premium top-grain genuine leather that is naturally supple and resistant to scuffing. Our adjustable straps are constructed from double-layered leather stitched together for maximum tensile strength. All D-rings, buckles, and zippers are heavy-duty solid-brass, ensuring smooth operations and long-lasting security for your valuables."
    },
    {
      title: "Support Local Artisanship with Secure Delivery in Kenya",
      text: "Purchasing a crossbody bag from Mel's Fashion supports highly skilled local artisans and promotes a robust creative economy in Nairobi. Our bags are carefully crafted in limited batches using traditional hand-tooling techniques.\n\nWe offer rapid local courier delivery to premium Nairobi neighborhoods: Westlands, Kilimani, Karen, Lavington, Runda, Gigiri, Muthaiga, and Nairobi CBD. We also arrange fast, insured countrywide shipping to Mombasa, Kisumu, Nakuru, Eldoret, and all other Kenyan regions."
    }
  ];

  const faqs = [
    {
      question: "Are the shoulder straps on your crossbody bags adjustable?",
      answer: "Yes! All of our leather crossbody bags feature adjustable shoulder straps with solid-brass buckles, allowing you to customize the drop length for a perfect, comfortable fit."
    },
    {
      question: "What essentials can fit inside your classic crossbody bags?",
      answer: "Our crossbody bags are designed to comfortably hold your essential daily items: a smartphone, a slim leather wallet, car keys, cosmetics, and sunglasses."
    },
    {
      question: "Are your crossbody bags secure against theft?",
      answer: "Yes, our designs feature secure heavy-duty metal zipper closures, strong snap buttons, and interior zippered pockets to keep your valuables safe and secure at all times."
    }
  ];

  return (
    <LandingPageTemplate
      title="Crossbody Bags Kenya"
      subtitle="Chic, Compact, and Versatile Hands-Free Style"
      description="Discover our collection of handcrafted leather crossbody bags in Kenya. Compact, versatile, and made of premium genuine leather for a hands-free, elegant lifestyle."
      primaryKeyword="crossbody bags kenya"
      contentSections={contentSections}
      faqs={faqs}
      products={products || []}
      path="/crossbody-bags-kenya"
    />
  );
}
