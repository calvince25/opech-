import React from 'react';

interface StructuredDataProps {
  type: 'LocalBusiness' | 'Product' | 'CollectionPage';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let schema: any = {};

  if (type === 'LocalBusiness') {
    schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Mel's Fashion",
      "image": "https://melsfashion.com/logo.png",
      "@id": "https://melsfashion.com",
      "url": "https://melsfashion.com",
      "telephone": data.phone || "+254",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nairobi",
        "addressLocality": "Nairobi",
        "addressRegion": "Nairobi",
        "postalCode": "00100",
        "addressCountry": "KE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -1.286389,
        "longitude": 36.817223
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      },
      "sameAs": [
        data.instagram_url,
        data.facebook_url,
        data.tiktok_url
      ].filter(Boolean)
    };
  } else if (type === 'Product') {
    schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": data.name,
      "image": data.image_url,
      "description": data.description,
      "brand": {
        "@type": "Brand",
        "name": "Mel's Fashion"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://melsfashion.com/product/${data.id}`,
        "priceCurrency": "KES",
        "price": data.price,
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    };
  } else if (type === 'CollectionPage') {
    schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Premium Handbags Kenya Collection | Mel's Fashion",
        "description": "Browse our exclusive collection of handcrafted premium handbags in Kenya. Artisanal clutches, totes and crossbody bags.",
        "url": "https://melsfashion.com"
    };
  }

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
