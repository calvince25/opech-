import React from 'react';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import LandingPageTemplate from '@/components/LandingPageTemplate';

export const metadata: Metadata = {
  title: "Leather Bags Nairobi | Premium Handcrafted Leather Bags",
  description: "Handcrafted genuine leather bags in Nairobi, Kenya. Discover premium artisan totes, clutches, and crossbody bags at Mel's Fashion. Local delivery.",
  alternates: {
    canonical: 'https://www.mellsfashion.co.ke/leather-bags-nairobi',
  },
};

export default async function Page() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .limit(4);

  const contentSections = [
    {
      title: "Handcrafted Leather Bags in Nairobi: The Peak of Artisanal Quality",
      text: "Nairobi has emerged as a thriving center for premium leather craftsmanship, and Mel's Fashion sits proudly at the forefront of this artisanal movement. Our passion lies in creating exquisite genuine leather bags that harmoniously blend robust utility with timeless aesthetic sophistication.\n\nFrom our dedicated workshop in Kilimani, Nairobi, our master craftsmen carefully hand-cut, manually stitch, and meticulously polish every single piece. When you carry a leather bag from Mel's Fashion, you are carrying a narrative of premium material selection and ethical local production. We believe in building leather products that do not simply last but evolve, developing a beautifully soft and authentic patina that reflects your unique life experiences."
    },
    {
      title: "Why Select Genuine Local Leather in Kenya?",
      text: "Genuine leather is unmatched in its tactile luxury, flexible durability, and breathability. Unlike low-quality mass-produced synthetic alternatives (often labeled as PU or vegan leather) which crack and disintegrate, genuine bovine leather grows increasingly characterful and elegant over time.\n\nWe source premium, thick cowhide leather from ethical Kenyan tanneries. These hides undergo advanced eco-conscious tanning processes to retain natural grain variations. This guarantees that no two bags in our collection are exactly identical—each tote, crossbody, or clutch remains a truly one-of-a-kind bespoke masterpiece."
    },
    {
      title: "Ethically Crafted, Locally Delivered Across Nairobi and Kenya",
      text: "At Mel's Fashion, we are fiercely committed to high-skill job creation and fair trade principles. We ensure that our local leather artisans are compensated with generous, sustainable wages and work under safe, creative workshop conditions.\n\nWe provide rapid local express dispatch to residents of Westlands, Kilimani, Karen, Lavington, Runda, Gigiri, Muthaiga, and Nairobi CBD. For our fashion-forward clients outside the capital, we coordinate secure and fast countrywide shipping to Mombasa, Kisumu, Nakuru, Eldoret, and beyond."
    }
  ];

  const faqs = [
    {
      question: "What types of genuine leather do you use for your Nairobi collections?",
      answer: "We primarily utilize premium full-grain and top-grain cowhide leather sourced from local Kenyan tanneries. This represents the absolute highest quality tier of leather available, valued for its thickness, surface texture, and long-term durability."
    },
    {
      question: "Do you offer physical viewing of your leather bags in Nairobi?",
      answer: "Yes! While we are primarily an online atelier with express courier delivery to your doorstep, clients can schedule private design viewings at our primary workshop in Kilimani, Nairobi, by contacting us in advance."
    },
    {
      question: "How do I verify that my Mel's Fashion bag is 100% real leather?",
      answer: "Genuine leather possesses a distinctive, natural earthy aroma (never chemical or plasticky), a warm natural temperature, and unique organic grain imperfections. Real leather also slowly absorbs tiny droplets of moisture, whereas synthetic materials repel them."
    }
  ];

  return (
    <LandingPageTemplate
      title="Leather Bags Nairobi"
      subtitle="Artisanal Handbags Crafted Locally"
      description="Experience the rich, tactile luxury of genuine handcrafted leather bags, locally designed and manually stitched in Nairobi. Masterpieces made to accompany you for a lifetime."
      primaryKeyword="leather bags nairobi"
      contentSections={contentSections}
      faqs={faqs}
      products={products || []}
      path="/leather-bags-nairobi"
    />
  );
}
