import React from 'react';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import LandingPageTemplate from '@/components/LandingPageTemplate';

export const metadata: Metadata = {
  title: "Genuine Leather Bags Kenya | Handcrafted Leather Bags",
  description: "Experience the timeless luxury of genuine leather bags in Kenya. Handcrafted in Nairobi with premium materials and ethical craftsmanship. Mel's Fashion.",
  alternates: {
    canonical: 'https://www.mellsfashion.co.ke/genuine-leather-bags-kenya',
  },
};

export default async function Page() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .limit(4);

  const contentSections = [
    {
      title: "Genuine Leather Bags in Kenya: Authentic Luxury That Lasts",
      text: "In a market flooded with synthetic, mass-produced accessories, a genuine leather bag is a true mark of authenticity and longevity. Mel's Fashion is dedicated to crafting the finest genuine leather bags in Kenya, offering a timeless investment in classic style.\n\nHandcrafted in Nairobi, our leather bags are created from the highest quality bovine hides. We never compromise on materials, ensuring that every product is 100% authentic leather. Our bags are designed to accompany you through a lifetime, growing more beautiful, supple, and rich in character with every single year."
    },
    {
      title: "Understanding Leather Quality: The Full-Grain and Top-Grain Difference",
      text: "Not all leather is created equal. Many commercial brands use corrected-grain or bonded leather, which is heavily processed and covered in plastic coatings. At Mel's Fashion, we work exclusively with premium full-grain and top-grain leather.\n\nFull-grain leather preserves the outermost layer of the hide, including all natural grains, markings, and minor scars. This gives each bag its unique character and extraordinary tensile strength. Top-grain leather is gently sanded to remove minor surface imperfections, resulting in a incredibly smooth, supple, and lightweight finish that is ideal for structured luxury designs."
    },
    {
      title: "Artisanal Production & Sustainable Local Delivery",
      text: "Our genuine leather bags are manufactured using traditional techniques that minimize waste and respect the environment. We support local tanneries that implement modern, eco-friendly water treatment and tanning systems.\n\nWe provide rapid local delivery to premium neighborhoods in Nairobi, including Westlands, Kilimani, Karen, Lavington, Runda, Gigiri, Muthaiga, and Nairobi CBD. We also arrange fast, secure countrywide shipping to Mombasa, Kisumu, Nakuru, Eldoret, and all other Kenyan regions."
    }
  ];

  const faqs = [
    {
      question: "How can I distinguish genuine leather from fake PU leather?",
      answer: "Genuine leather has a distinctive natural, warm scent, a unique fibrous backing, and irregular pore patterns. Synthetic leather smells of plastic or chemicals, feels uniform, and has a repetitive, stamped surface texture."
    },
    {
      question: "Does real leather stretch or change shape over time?",
      answer: "Yes, genuine leather is a natural material that slowly softens and conforms to how it is used. This natural break-in process enhances the bag's comfort and adds to its unique character without reducing its strength."
    },
    {
      question: "How should I clean minor stains off my genuine leather bag?",
      answer: "Gently wipe the surface with a soft, damp cloth and mild, diluted soap. Never soak the bag or use harsh chemical solvents. Allow it to air-dry completely in a shaded, well-ventilated area away from direct heat."
    }
  ];

  return (
    <LandingPageTemplate
      title="Genuine Leather Bags Kenya"
      subtitle="Pure, Uncompromised Luxury"
      description="Invest in the timeless beauty of 100% genuine leather bags, designed and handcrafted in Kenya. Premium full-grain cowhide, solid brass hardware, and expert local craftsmanship."
      primaryKeyword="genuine leather bags kenya"
      contentSections={contentSections}
      faqs={faqs}
      products={products || []}
      path="/genuine-leather-bags-kenya"
    />
  );
}
