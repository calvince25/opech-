import React from 'react';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import LandingPageTemplate from '@/components/LandingPageTemplate';

export const metadata: Metadata = {
  title: "Womens Handbags Kenya | Handcrafted Leather Bags",
  description: "Discover beautiful, handcrafted womens handbags in Kenya at Mel's Fashion. Explore our range of premium totes, crossbody bags, and clutches. Nairobi delivery.",
  alternates: {
    canonical: 'https://www.mellsfashion.co.ke/womens-handbags-kenya',
  },
};

export default async function Page() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .limit(4);

  const contentSections = [
    {
      title: "Womens Handbags in Kenya: Designed for the Modern, Sophisticated Woman",
      text: "Every modern woman needs a bag that is as versatile, resilient, and elegant as she is. At Mel's Fashion, we design womens handbags in Kenya that celebrate feminine strength, creative expression, and daily functionality.\n\nFrom high-capacity work totes that house laptops and documents, to sleek weekend crossbody bags and statement evening clutches, our collections are created to seamlessly transition with you. Handcrafted in Nairobi, our leather bags are lightweight, structurally sound, and meticulously compartmentalized to keep your essentials organized without compromising on pure aesthetic luxury."
    },
    {
      title: "The Perfect Fusion of Functionality and Contemporary Style",
      text: "We understand that a handbag must meet the rigorous demands of active modern life. That is why we dedicate weeks to perfecting the interior layouts and proportions of each new design.\n\nOur bags feature secure zippered pockets, dedicated slots for smartphones and keys, and adjustable, comfortable shoulder straps. We select supple, highly durable lining fabrics that are easy to clean. By utilizing premium, naturally water-resistant genuine bovine leather, our handbags easily withstand the seasonal Nairobi weather while retaining their elegant, structured shape."
    },
    {
      title: "Sustainable Fashion Handcrafted Locally in Nairobi",
      text: "By choosing a women's handbag from Mel's Fashion, you are supporting a sustainable, low-waste circular economy in Kenya. We source our materials locally, reduce leather offcut waste, and completely avoid plastic-heavy synthetic materials.\n\nWe provide rapid local delivery to Westlands, Kilimani, Karen, Lavington, Runda, Gigiri, Muthaiga, and Nairobi CBD. We also arrange fast, safe countrywide courier shipping to Mombasa, Kisumu, Nakuru, Eldoret, and all other Kenyan towns."
    }
  ];

  const faqs = [
    {
      question: "Which womens handbag styles are most popular for daily work use?",
      answer: "Our signature leather tote bags are highly popular for professional use. They feature wide, comfortable straps and are spacious enough to hold standard laptops, tablets, diaries, and cosmetics."
    },
    {
      question: "Are your handbags heavy to carry when full?",
      answer: "We carefully split and shave our leather hides to optimal thickness, ensuring that our bags remain exceptionally lightweight while maintaining their structural strength and durability."
    },
    {
      question: "Do you offer seasonal collections or colors?",
      answer: "Yes, we release limited-edition colors and seasonal collections based on natural, rich earth tones such as tan, olive, deep mahogany, burgundy, and classic midnight black."
    }
  ];

  return (
    <LandingPageTemplate
      title="Womens Handbags Kenya"
      subtitle="Exquisite Companions for Every Journey"
      description="Explore our exclusive collection of handcrafted womens handbags in Kenya. Discover beautiful clutches, versatile totes, and chic crossbody bags made of premium genuine leather."
      primaryKeyword="womens handbags kenya"
      contentSections={contentSections}
      faqs={faqs}
      products={products || []}
      path="/womens-handbags-kenya"
    />
  );
}
