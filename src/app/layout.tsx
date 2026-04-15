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
        <link rel="icon" href="/favicon.ico" sizes="any" />
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
