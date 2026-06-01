import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { CartProvider } from "@/providers/CartProvider";
import MainLayout from "@/components/MainLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: {
    default: "Mel's Fashion | Premium Handbags Nairobi | Handcrafted in Kenya",
    template: "%s | Mel's Fashion"
  },
  description: "Mel's Fashion specializes in premium, handcrafted leather handbags in Nairobi. Discover our unique collection of clutches, totes, and crossbody bags with artisanal excellence.",
  keywords: ["handbags Nairobi", "leather handbags Kenya", "crossbody bags Nairobi", "Mel's Fashion", "handmade bags Kenya"],
  authors: [{ name: "Mel's Fashion" }],
  creator: "Mel's Fashion",
  publisher: "Mel's Fashion",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://www.mellsfashion.co.ke"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-48x48.png?v=2', sizes: '48x48', type: 'image/png' },
      { url: '/favicon/favicon.ico?v=2', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' },
    ],
  },
  openGraph: {
    title: "Mel's Fashion | Premium Handcrafted Handbags",
    description: "The home of premium handbags in Kenya. Handcrafted in Nairobi with artisanal excellence.",
    url: "https://www.mellsfashion.co.ke",
    siteName: "Mel's Fashion",
    locale: "en_KE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon/favicon-48x48.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png?v=2" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased font-sans">
        <AuthProvider>
          <CartProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
