import React from 'react';
import { Metadata } from 'next';
import Journal from '@/components/Journal';
import StructuredData from '@/components/SEO/StructuredData';

export const metadata: Metadata = {
  title: 'The Journal | Mel\'s Fashion | Handcrafted Heritage Nairobi',
  description: 'Explore stories of craftsmanship, heritage, and the vibrant spirit of Nairobi. Read about our process, our artisans, and the inspiration behind each handbag.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return (
    <>
      <StructuredData 
        type="CollectionPage" 
        data={{ 
          title: 'The Journal | Mel\'s Fashion Blog',
          description: 'Stories of craftsmanship and heritage in Nairobi.',
          path: '/blog'
        }} 
      />
      
      <Journal fullPage={true} />
      
    </>
  );
}
