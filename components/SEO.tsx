import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({ 
  title = 'Mell Bags - Premium Handbags Kenya | Handcrafted Elegance',
  description = 'Mell Bags offers premium handbags in Kenya, handcrafted with artisanal excellence. Discover our collection of clutches, totes, and crossbody bags in Nairobi.',
  keywords = 'premium handbags kenya, handcrafted bags nairobi, luxury bags kenya, artisanal leather bags nairobi, mell bags',
  image = 'https://mellbags.com/og-image.jpg', // Replace with actual logo/hero image URL
  url = 'https://mellbags.com',
  type = 'website'
}: SEOProps) {
  const siteTitle = title.includes('Mell Bags') ? title : `${title} | Mell Bags`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Geographic optimization */}
      <meta name="geo.region" content="KE-110" /> {/* Nairobi Region */}
      <meta name="geo.placename" content="Nairobi" />
      <meta name="geo.position" content="-1.286389;36.817223" />
      <meta name="ICBM" content="-1.286389, 36.817223" />
    </Helmet>
  );
}
