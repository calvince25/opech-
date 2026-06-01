-- Supabase Database Migration Script for Mel's Fashion SEO and AI Visibility Upgrade
-- Copy and run this script in your Supabase Dashboard -> SQL Editor.

-- Phase 1: Alter the blog_posts table to support advanced categorization, tags, status and SEO properties
ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General',
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS seo_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'scheduled')),
  ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS canonical_url TEXT;

-- Phase 2: Seed the 5 Cornerstone Articles into the database (using fallback IDs if needed)
INSERT INTO blog_posts (title, slug, excerpt, content, category, tags, status, created_at)
VALUES 
  (
    'Ultimate Guide To Genuine Leather Bags In Kenya',
    'ultimate-guide-to-leather-bags-in-kenya',
    'Deep dive into full-grain vs top-grain leather quality, ethical sourcing practices, and local master craftsmanship in Nairobi.',
    '<h2>The Quality Paradigm: Understanding Genuine Leather</h2><p>Genuine leather is one of nature''s most beautiful, resilient, and versatile materials. When crafted with respect and skill, a real leather bag is not just an accessory—it is a lifetime investment. However, for many fashion shoppers in Kenya, navigating the leather market can be highly confusing due to complex terminology and lower-quality synthetic imitations.</p><h3>Full-Grain Leather: The Ultimate Standard</h3><p>Full-grain leather represents the absolute highest quality grade of leather available globally. It is constructed from the outermost layer of the hide, directly beneath the hair, retaining all of its natural grain, thickness, and inherent strength. Because the grain surface is left completely natural and untouched (never sanded, buffed, or corrected), it retains its unique organic pores, markings, and surface characteristics.</p><p>This premium grade is exceptionally durable and highly resistant to moisture, wear, and scratching. Most importantly, full-grain leather develops a magnificent natural patina over years of use—gradually growing softer, smoother, and richer in color. At Mel''s Fashion, we work extensively with full-grain leather sourced from local Kenyan tanneries to produce our signature totes and crossbody bags.</p>',
    'Leather Education',
    '{"leather", "guide", "kenya", "handcrafted"}',
    'published',
    NOW()
  ),
  (
    'Complete Leather Care Guide For Kenyan Women',
    'complete-leather-care-guide-for-kenyan-women',
    'Protect your luxury bags from humidity, heat, and seasonal weather with our specialized tropical care system.',
    '<h2>Preserving the Beauty of Your Luxury Investment</h2><p>Genuine leather is an organic material, much like your own skin. It requires proper hydration, clean storage, and general protection to preserve its moisture, flexibility, and beautiful luster over time. In Kenya''s tropical climate—where high humidity during rainy seasons alternates with hot, dusty dry seasons—leather bags require dedicated care to prevent surface cracking, discoloration, and mold development.</p><h3>1. Cleaning: Gently Removing Daily Dust and Oils</h3><p>Always clear surface dust off your bag using a dry, clean microfiber cloth after daily wear. For minor stains or dirt accumulation, prepare a mild, highly diluted soapy water mixture using premium neutral soap. Gently wipe down the leather surface with a slightly damp cloth, taking care not to soak the leather. Wipe away any excess soap film with a clean damp cloth, and air-dry the bag naturally in a cool, shaded area away from direct sunlight or heat sources.</p><h3>2. Conditioning: Hydration is Crucial</h3><p>To keep the leather supple and prevent surface cracking, apply a specialized, premium leather conditioner or leather balm every 3-6 months. Rub a tiny drop of the conditioner onto a soft cloth and apply it to the bag in circular motions. Allow it to sit for 30 minutes, then gently buff the surface with a clean cloth to restore its natural sheen.</p>',
    'Leather Care',
    '{"care", "maintenance", "humidity", "luxury"}',
    'published',
    NOW()
  ),
  (
    'Luxury Handbag Buying Guide: The Timeless Smart Investment',
    'luxury-handbag-buying-guide',
    'Step-by-step framework to evaluate weight, capacity, hardware durability, and classic design versatility before buying.',
    '<h2>The Framework of a Timeless Fashion Investment</h2><p>A luxury handbag is a key pillar of a woman''s wardrobe, representing a major financial investment and an expression of personal brand. Before purchasing a premium piece, it is vital to look beyond marketing slogans and thoroughly evaluate structural integrity, material quality, and real daily utility.</p><h3>1. Hardware: The Anchor of Strength</h3><p>Zippers, buckles, and strap hooks are the hard-working mechanical components of your bag. Luxury bags utilize solid metal hardware—such as heavy solid brass or stainless steel—which feels heavy, functions smoothly, and will not flake, rust, or bend under heavy weight. Check that zipper actions are exceptionally smooth and that strap attachments are securely reinforced with rivets.</p><h3>2. Proportions and Everyday Capacity</h3><p>Assess your daily essentials before choosing a silhouette. If you require laptop and document capacity, a structured tote bag with wide, flat shoulder straps is essential. If you require quick access to keys, wallets, and cosmetics during active weekends, choose a lightweight crossbody bag with secure compartments.</p>',
    'Buying Guides',
    '{"guide", "shopping", "luxury", "handbags"}',
    'published',
    NOW()
  ),
  (
    'The History of Leather Craftsmanship in Kenya',
    'history-of-leather-craftsmanship-in-kenya',
    'From nomadic cattle-herding heritage to modern premium Nairobi workshops. Explore the rich legacy of high-grade tanning.',
    '<h2>The Deep Roots of East African Leather Artistry</h2><p>Leatherworking in Kenya is not a modern development—it is a deeply rooted cultural tradition spanning centuries. From the organic leather shields and sandals of nomadic pastoralists to today''s premium, high-fashion ateliers in Nairobi, the evolution of Kenyan leatherwork reflects a persistent dedication to durability and natural beauty.</p>',
    'Kenyan Craftsmanship',
    '{"history", "artisans", "heritage", "nairobi"}',
    'published',
    NOW()
  ),
  (
    'How To Identify Genuine Leather Products Instantly',
    'how-to-identify-genuine-leather-products',
    'Avoid low-quality faux and synthetic options with our definitive five-step physical inspection guide for luxury shoppers.',
    '<h2>Empowering the Savvy Luxury Shopper</h2><p>As synthetic leather technology advances, low-quality faux materials are increasingly difficult to distinguish at first glance. However, by understanding key physical properties, any shopper can instantly identify real leather and secure their fashion investment.</p><h3>The Aroma and Moisture Tests</h3><p>Genuine leather possesses a rich, earthy, organic scent that cannot be replicated. Faux materials smell strongly of chemicals, plastics, or industrial glues. Real leather also slowly absorbs minute moisture droplets, whereas synthetic surfaces repel them entirely.</p>',
    'Leather Education',
    '{"education", "buying", "genuine", "real-leather"}',
    'published',
    NOW()
  )
ON CONFLICT (slug) DO NOTHING;
