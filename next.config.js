/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
