/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Product, JournalArticle } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Nairobi NightClutch',
    tagline: 'Elegance in the city.',
    description: 'A sleek, hand-stitched leather clutch inspired by the vibrant nightlife of Nairobi.',
    longDescription: 'The Nairobi NightClutch is more than just an accessory; it\'s a statement. Crafted from premium Kenyan leather, it features a unique beadwork pattern on the interior lining, a nod to traditional Maasai craftsmanship. Perfect for an evening out at Westlands or a sophisticated dinner in Karen.',
    price: 4500,
    category: 'Clutches' as any,
    imageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1566150905458-1bf1fd113f0d?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Genuine Kenyan Leather', 'Hand-stitched', 'Maasai Beadwork Lining']
  },
  {
    id: 'p2',
    name: 'Savannah Tote',
    tagline: 'Carry the wild.',
    description: 'A spacious tote bag made from durable canvas and leather accents, perfect for daily adventures.',
    longDescription: 'Whether you\'re heading to the office or a weekend getaway to the Mara, the Savannah Tote is your reliable companion. Its robust canvas body is reinforced with high-quality leather handles and base, ensuring durability without compromising on style. Features multiple internal pockets for organized storage.',
    price: 6800,
    category: 'Home' as any,
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Durable Canvas', 'Leather Reinforcements', 'Spacious Interior']
  },
  {
    id: 'p3',
    name: 'Rift Valley Satchel',
    tagline: 'Timeless adventure.',
    description: 'A classic satchel with a modern twist, featuring earthy tones and brass hardware.',
    longDescription: 'Inspired by the breathtaking landscapes of the Great Rift Valley, this satchel combines ruggedness with refined design. The adjustable shoulder strap allows for comfortable cross-body wear, while the secure brass buckles keep your essentials safe. A timeless piece that ages beautifully.',
    price: 8500,
    category: 'Home' as any,
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Vegetable-tanned Leather', 'Brass Hardware', 'Adjustable Strap']
  },
  {
    id: 'p4',
    name: 'Kilimani Crossbody',
    tagline: 'Urban chic.',
    description: 'A compact and stylish crossbody bag for the modern woman on the go.',
    longDescription: 'The Kilimani Crossbody is designed for those who value both form and function. Its minimalist silhouette is complemented by a vibrant African print strap, adding a touch of personality to any outfit. Lightweight yet secure, it\'s the perfect choice for navigating the busy streets of Kilimani.',
    price: 3200,
    category: 'Home' as any,
    imageUrl: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Compact Design', 'Interchangeable Straps', 'Secure Zip Closure']
  },
  {
    id: 'p5',
    name: 'Lamu Luxury Bucket',
    tagline: 'Coastal breeze.',
    description: 'A unique bucket bag featuring woven palm leaf details and soft leather trim.',
    longDescription: 'Bring a piece of the coast to the city with the Lamu Luxury Bucket. Hand-woven by artisans in Lamu, the palm leaf body is paired with supple leather for a sophisticated look. Its drawstring closure ensures your belongings are safe while maintaining a relaxed, coastal aesthetic.',
    price: 5500,
    category: 'Home' as any,
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1566150905458-1bf1fd113f0d?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Hand-woven Palm Leaf', 'Leather Trim', 'Drawstring Closure']
  },
  {
    id: 'p6',
    name: 'Mombasa Weekender',
    tagline: 'Escape in style.',
    description: 'An oversized duffel bag designed for short trips and stylish getaways.',
    longDescription: 'The Mombasa Weekender is the ultimate travel companion. Its spacious interior can easily accommodate all your essentials for a 3-day trip, while the reinforced handles and detachable shoulder strap provide multiple carrying options. Crafted from premium leather that only gets better with time.',
    price: 12000,
    category: 'Home' as any,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Oversized Capacity', 'Premium Leather', 'Reinforced Base']
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
    {
        id: 1,
        title: "The Art of Kenyan Leather",
        date: "April 12, 2025",
        excerpt: "Discover the journey of our leather from the highlands to our Nairobi workshop.",
        image: "https://images.unsplash.com/photo-1524289286702-f07229da36f5?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left text-[#5D5A53]" },
                "In the heart of Kenya, a tradition of craftsmanship is being reborn. At Mel's Fashion, we believe that the best materials are found right here at home. Our leather is sourced from local tanneries that prioritize sustainable practices and quality."
            ),
            React.createElement("p", { className: "mb-8 text-[#5D5A53]" },
                "Every hide tells a story. The subtle imperfections, the rich grain, and the way it softens over time are all marks of a natural product. Our artisans in Nairobi treat each piece with the respect it deserves, ensuring that every bag we produce is a masterpiece."
            ),
            React.createElement("blockquote", { className: "border-l-2 border-[#2C2A26] pl-6 italic text-xl text-[#2C2A26] my-10 font-serif" },
                "\"Quality is not an act, it is a habit. At Mel's Fashion, it is our way of life.\""
            ),
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "By choosing Mel's Fashion, you are not just buying a bag; you are supporting a community of skilled craftsmen and women who are dedicated to preserving the art of Kenyan leatherwork."
            )
        )
    },
    {
        id: 2,
        title: "Nairobi Style Guide",
        date: "March 28, 2025",
        excerpt: "How to style your Mel's Fashion for any occasion in the Green City in the Sun.",
        image: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "Nairobi is a city of contrasts, where modern skyscrapers meet lush greenery. This unique blend is reflected in the city's fashion scene, which is both cosmopolitan and deeply rooted in African heritage."
            ),
            React.createElement("p", { className: "mb-8 text-[#5D5A53]" },
                "\"Nairobi style is all about versatility,\" says Mel, our founder. \"You need a bag that can take you from a morning meeting in Upper Hill to an afternoon coffee in Westlands, and finally to a sunset drink overlooking the National Park.\""
            ),
            React.createElement("div", { className: "my-12 p-8 bg-[#EBE7DE] font-serif text-[#2C2A26] italic text-center" },
                React.createElement("p", null, "The city hums"),
                React.createElement("p", null, "With a rhythm all its own."),
                React.createElement("p", null, "From the bustling CBD"),
                React.createElement("p", null, "To the quiet of the suburbs."),
                React.createElement("p", null, "Mel's Fashion fits"),
                React.createElement("p", null, "Every beat of the heart.")
            ),
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "In this guide, we explore three distinct looks featuring our latest collection, showing you how to effortlessly transition through your day in style."
            )
        )
    },
    {
        id: 3,
        title: "Sustainable Fashion in Kenya",
        date: "March 15, 2025",
        excerpt: "Why slow fashion is the future of the Kenyan textile and leather industry.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "The global fashion industry is at a crossroads, and Kenya is leading the way in the slow fashion movement. At Mel's Fashion, sustainability is not just a buzzword; it's at the core of everything we do."
            ),
            React.createElement("p", { className: "mb-8 text-[#5D5A53]" },
                "We believe in creating products that last. By using high-quality materials and traditional techniques, we ensure that our bags are built to withstand the test of time, reducing the need for frequent replacements and minimizing waste."
            ),
             React.createElement("div", { className: "my-12 p-8 bg-[#2C2A26] text-[#F5F2EB] font-serif italic text-center" },
                React.createElement("p", null, "Buy less, choose well"),
                React.createElement("p", null, "Make it last."),
                React.createElement("p", null, "The future is slow.")
            )
        )
    }
];

export const BRAND_NAME = 'Mel\'s Fashion';
export const PRIMARY_COLOR = 'stone-900'; 
export const ACCENT_COLOR = 'stone-500';
