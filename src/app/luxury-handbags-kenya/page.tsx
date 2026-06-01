import React from 'react';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import LandingPageTemplate from '@/components/LandingPageTemplate';

export const metadata: Metadata = {
  title: "Luxury Handbags Kenya | Handcrafted Premium Handbags",
  description: "Explore exquisite, handcrafted luxury handbags in Kenya at Mel's Fashion. Discover premium clutches, crossbody bags, and totes. Nairobi express delivery.",
  alternates: {
    canonical: 'https://www.mellsfashion.co.ke/luxury-handbags-kenya',
  },
};

export default async function Page() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .limit(4);

  const contentSections = [
    {
      title: "Luxury Handbags in Kenya: Redefining African Elegance",
      text: "The definition of luxury is shifting from mass-produced foreign logos to bespoke, story-driven products made with real integrity. Mel's Fashion is proud to lead this revolution by crafting world-class luxury handbags right here in Kenya.\n\nOur luxury collection represents a meticulous marriage of international high-fashion silhouettes and deep, local craftsmanship. Each piece is designed for the modern woman who demands sophistication, functionality, and ethical production. We utilize heavy solid-brass hardware, premium silk lining, and the finest hand-selected genuine leather to create handbags that stand proudly alongside global luxury standards."
    },
    {
      title: "The Construction of a Premium Handbag Masterpiece",
      text: "Creating a luxury handbag is an incredibly slow and precise architectural process. It begins with our head designer drafting a balanced structure that ensures the bag retains its beautiful shape through decades of daily use.\n\nOnce the design is finalized, our master leather artisans manually select the optimal sections of the hide. Hides are carefully sliced, and the edges are painstakingly burnished and sealed by hand to prevent wear. We use heavy-duty nylon thread and a tight stitch density, reinforcing key stress points like handle bases and strap attachments. The result is a premium masterpiece of supreme strength and flawless symmetry."
    },
    {
      title: "Elevating Your Personal Brand in Nairobi & Beyond",
      text: "A luxury handbag from Mel's Fashion is not merely an accessory; it is a declaration of personal style, ambition, and support for high-end local industry. Whether you are holding a structured top-handle bag in a boardroom in Westlands, wearing a sleek crossbody at an art gallery opening in Kilimani, or carrying an elegant clutch at a gala in Karen, our designs command quiet respect.\n\nWe provide personalized secure courier delivery across all premium residential areas of Nairobi and arrange expedited shipping to upscale destinations countrywide, including luxury resorts in Mombasa, Diani, Naivasha, and Nanyuki."
    }
  ];

  const faqs = [
    {
      question: "What makes Mel's Fashion handbags qualify as premium luxury?",
      answer: "We focus on three uncompromising pillars: sourcing premium top-grade genuine leather, using heavy solid-brass hardware, and employing slow hand-craftsmanship with flawless edge-paint finishing. We avoid mass factory production completely."
    },
    {
      question: "Do you offer personalization or monogramming for luxury orders?",
      answer: "Yes, we offer custom hot-stamping and gold-foil monogramming for initials on select items. Please reach out to us through our contact form with your order details to request this bespoke service."
    },
    {
      question: "What is your warranty or repair policy for premium bags?",
      answer: "We stand behind our craftsmanship. We offer a comprehensive lifetime guarantee on all stitching, seams, and hardware functions. If your bag ever requires refreshment or minor repairs, our workshop will service it gladly."
    }
  ];

  return (
    <LandingPageTemplate
      title="Luxury Handbags Kenya"
      subtitle="The Pinnacle of Handcrafted Sophistication"
      description="Indulge in the unmatched beauty of luxury handbags designed and handcrafted in Kenya. Exquisite silhouettes, premium full-grain leather, and solid brass detailing."
      primaryKeyword="luxury handbags kenya"
      contentSections={contentSections}
      faqs={faqs}
      products={products || []}
      path="/luxury-handbags-kenya"
    />
  );
}
