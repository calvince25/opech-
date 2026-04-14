import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/static/',
        '/*.woff2',
        '/*.ico',
        '/*.json',
      ],
    },
    sitemap: 'https://www.mellsfasion.co.ke/sitemap.xml',
  };
}
