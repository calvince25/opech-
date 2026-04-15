/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'http', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'img.icons8.com' },
      { protocol: 'http', hostname: 'img.icons8.com' },
      { protocol: 'https', hostname: 'www.shutterstock.com' },
      { protocol: 'http', hostname: 'www.shutterstock.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'http', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'placeholder.supabase.co' },
      { protocol: 'https', hostname: 'www.mellsfashion.co.ke' },
    ],
  },
};

export default nextConfig;
