import React from 'react';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import LandingPageTemplate from '@/components/LandingPageTemplate';

export const metadata: Metadata = {
  title: "Tote Bags Nairobi | Handcrafted Premium Leather Totes",
  description: "Explore elegant, high-capacity handcrafted leather tote bags in Nairobi, Kenya at Mel's Fashion. Perfect for work, travel, and style. Local delivery.",
  alternates: {
    canonical: 'https://www.mellsfashion.co.ke/tote-bags-nairobi',
  },
};

export default async function Page() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .limit(4);

  const contentSections = [
    {
      title: "Leather Tote Bags in Nairobi: The Ultimate Everyday Luxury Companion",
      text: "A tote bag is perhaps the most essential piece in a woman's wardrobe, balancing high capacity with aesthetic grace. At Mel's Fashion, we handcraft premium leather tote bags in Nairobi that serve as the perfect everyday companion for professional work, sophisticated travel, and elegant shopping.\n\nDesigned and manually assembled in our Nairobi atelier, our leather totes feature thick, structured walls, reinforced comfortable handles, and secure top closures. We focus on creating elegant, minimalist designs that speak of quiet luxury, allowing the pure quality of the genuine leather and the precision of our craftsmanship to shine through."
    },
    {
      title: "Meticulous Craftsmanship: Built to Carry Your World with Grace",
      text: "A daily tote bag carries significant weight, from laptops and notebooks to cosmetic cases and water bottles. That is why we dedicate extra attention to structural engineering and stress-point reinforcement.\n\nOur tote bags feature double-layered handles secured with heavy-duty solid-brass rivets and double-line industrial stitching. The interior is lined with durable, premium lining fabrics and includes specialized zip pockets for valuables and slip pockets for quick access to keys and smartphones. The structured flat bottom is reinforced with protective base feet, ensuring your bag stands upright and stays clean in any environment."
    },
    {
      title: "Local Delivery to Premium Residences Across Nairobi & Kenya",
      text: "We believe in providing an exceptional customer experience. Our tote bags are hand-wrapped in soft protective dust bags and shipped directly from our Kilimani workshop.\n\nWe offer rapid, secure local delivery to Westlands, Kilimani, Karen, Lavington, Runda, Gigiri, Muthaiga, and Nairobi CBD. We also facilitate fast, insured countrywide shipping to Mombasa, Kisumu, Nakuru, Eldoret, and all other major Kenyan cities."
    }
  ];

  const faqs = [
    {
      question: "Are your leather tote bags large enough to hold a 15-inch laptop?",
      answer: "Yes! Our classic leather tote bags are specifically engineered to accommodate standard laptops (up to 15.6 inches) along with diaries, notebooks, charges, and other daily office essentials."
    },
    {
      question: "How do you ensure the tote handles do not detach or wear out?",
      answer: "Our handles are cut from extra-thick, durable leather straps, reinforced with double stitching, and anchored securely to the bag's body using heavy-duty solid-brass hardware rivets."
    },
    {
      question: "Can I use leather tote bags as carry-on travel luggage?",
      answer: "Absolutely. Our tote bags are exceptionally durable, lightweight, and structured to fit comfortably under airplane seats or in overhead cabins, making them excellent travel companions."
    }
  ];

  return (
    <LandingPageTemplate
      title="Tote Bags Nairobi"
      subtitle="Effortless Utility and Pure Elegance"
      description="Discover our collection of handcrafted leather tote bags in Nairobi. High-capacity, beautifully structured, and made of premium genuine leather for the active modern woman."
      primaryKeyword="tote bags nairobi"
      contentSections={contentSections}
      faqs={faqs}
      products={products || []}
      path="/tote-bags-nairobi"
    />
  );
}
