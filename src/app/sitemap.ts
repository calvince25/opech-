import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.mellsfashion.co.ke';

  // Static routes
  const staticRoutes = [
    '',
    '/shop',
    '/shop/leather-handbags',
    '/shop/crossbody-bags',
    '/shop/tote-bags',
    '/shop/clutch-bags',
    '/shop/sale',
    '/shop/new-arrivals',
    '/blog',
    '/contact',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Product routes
  const { data: products } = await supabase.from('products').select('id, updated_at');
  const productRoutes = (products || []).map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(product.updated_at || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic Blog routes
  const { data: posts } = await supabase.from('blog_posts').select('id, created_at');
  const blogRoutes = (posts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.created_at || Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
