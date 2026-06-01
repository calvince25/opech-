import React from 'react';

interface StructuredDataProps {
  type: 'LocalBusiness' | 'Product' | 'CollectionPage' | 'Organization' | 'BreadcrumbList' | 'FAQPage' | 'Article';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let schema: any = {};

  if (type === 'Organization') {
    schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Mel's Fashion",
      "url": "https://www.mellsfashion.co.ke",
      "logo": "https://www.mellsfashion.co.ke/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254-700-000-000",
        "contactType": "customer service",
        "areaServed": "KE",
        "availableLanguage": "English"
      },
      "sameAs": [
        "https://www.facebook.com/mellsfashion",
        "https://www.instagram.com/mels_fashion_k.e?igsh=MWsweGs5ZXdtZjlrMg==",
        "https://www.tiktok.com/@mellsfashion"
      ]
    };
  } else if (type === 'LocalBusiness') {
    schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Mel's Fashion",
      "image": "https://www.mellsfashion.co.ke/hero.jpg",
      "@id": "https://www.mellsfashion.co.ke",
      "url": "https://www.mellsfashion.co.ke",
      "telephone": "+254-700-000-000",
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
        "closes": "20:00"
      }
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
        "url": `https://www.mellsfashion.co.ke/product/${data.id}`,
        "priceCurrency": "KES",
        "price": data.price,
        "availability": data.in_stock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "itemCondition": "https://schema.org/NewCondition"
      },
      "aggregateRating": data.rating ? {
        "@type": "AggregateRating",
        "ratingValue": data.rating,
        "reviewCount": data.review_count || 10
      } : undefined
    };
  } else if (type === 'BreadcrumbList') {
    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": data.links.map((link: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": link.name,
        "item": `https://www.mellsfashion.co.ke${link.href}`
      }))
    };
  } else if (type === 'CollectionPage') {
    schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": data.title || "Premium Handbags Kenya Collection | Mel's Fashion",
        "description": data.description || "Browse our exclusive collection of handcrafted premium handbags in Kenya.",
        "url": `https://www.mellsfashion.co.ke${data.path || ''}`
    };
  } else if (type === 'FAQPage') {
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faqs.map((faq: any) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  } else if (type === 'Article') {
    schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "image": data.image_url,
      "datePublished": data.created_at,
      "dateModified": data.updated_at || data.created_at,
      "author": {
        "@type": "Person",
        "name": data.author_name || "Mel's Fashion Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Mel's Fashion",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.mellsfashion.co.ke/logo.png"
        }
      },
      "description": data.meta_description || data.description
    };
  }

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
