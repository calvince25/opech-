import React from 'react';
import { Star, Shield, HelpCircle, Sparkles, Award, Check } from 'lucide-react';

export interface CategoryTextbook {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

export const CATEGORY_ACADEMY_TEXTBOOKS: Record<string, CategoryTextbook> = {
  'leather-education': {
    title: 'The Science and Heritage of Premium Leather Grains',
    subtitle: 'An academic study on fiber density, organic tanning methods, and authentication protocols.',
    content: (
      <div className="space-y-8 text-stone-700 font-light text-base leading-relaxed">
        <section className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">1. Understanding Fiber Density & Grain Architectures</h3>
          <p>
            Leather is not simply a fabric; it is an organic, three-dimensional collagen fiber network. The quality, durability, and aging characteristics of leather are determined entirely by which layer of the hide is utilized. To master leather, one must understand the microscopic difference between leather grades:
          </p>
          <ul className="space-y-3 pl-6 list-disc">
            <li>
              <strong>Full-Grain Leather (The Topmost Layer):</strong> This is the absolute zenith of leather quality. It includes the entire outer layer of the hide, where the fiber structure is at its tightest and most dense. Because the skin is left completely natural—never sanded, buffed, or corrected—it retains the cow's natural history, including minor scars and insect bites. Full-grain leather is highly breathable, water-resistant due to natural oils, and is the only grade that develops a genuine lustrous patina over decades.
            </li>
            <li>
              <strong>Top-Grain Leather (The Split-Surface):</strong> The second-highest grade. The topmost layer of the hide is lightly shaved or sanded to erase natural blemishes, scars, and grain variations. This creates a visually uniform, highly consistent, and extremely soft leather. It is then sealed with a thin protective topcoat. While top-grain is highly durable and excellent for structured evening clutches, the shaving process reduces the hide's tensile strength and prevents it from developing a significant natural patina.
            </li>
            <li>
              <strong>Corrected-Grain & Genuine Leather (The Lower Shavings):</strong> Genuine leather is a marketing term, not a quality standard. It is produced from the lower, less dense shavings of the hide left over after the premium upper grain is split off. To make it presentable, it is heavily sanded, painted, and embossed with an artificial leather-grain pattern. While visually appealing initially, genuine leather lacks structural longevity, cracks easily, and quickly disintegrates under daily friction.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">2. The Chemistry of Preservation: Vegetable vs. Chrome Tanning</h3>
          <p>
            Raw animal hides are organic proteins that decay rapidly without stabilization. Tanning is the scientific chemical process that permanently alters the collagen fiber network, turning perishable hide into supple, durable leather. The two primary tanning methodologies represent a choice between ancient heritage and modern industrial efficiency:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
              <h4 className="font-serif font-bold text-stone-900 mb-2">Vegetable Tanning (The Organic Method)</h4>
              <p className="text-sm">
                An artisanal process dating back thousands of years. Raw hides are suspended in active organic solutions of natural tannins derived from tree barks, mimosa, chestnut, and quebracho woods. This process takes 30 to 60 days, yielding a thick, firm, and beautifully structured leather that smells organic and woody. Vegetable-tanned bags hold their shape perfectly and mature into a rich, deep, dark patina with time.
              </p>
            </div>
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
              <h4 className="font-serif font-bold text-stone-900 mb-2">Chrome Tanning (The Modern Method)</h4>
              <p className="text-sm">
                A modern scientific technique using dissolved chromium mineral salts. Completed within 24 hours, chrome tanning yields exceptionally soft, light, and supple leather that can accept rich, vibrant fashion dyes (such as our deep emerald and scarlet hues). Chrome-tanned leather is naturally highly water-resistant and scratch-resistant, making it perfect for lightweight, daily crossbody active bags.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">3. Sourcing and Sustainability: Sahiwal & Boran Bovines in Kenya</h3>
          <p>
            At Mel's Fashion, our commitment to leather education includes complete transparency. We source our hides exclusively as a byproduct of local agricultural food systems in East Africa. Our leather is derived from Sahiwal and Boran cattle breeds reared in the dry pastoral regions of Kajiado, Narok, and Laikipia.
          </p>
          <p>
            These breeds adapt to dry, scrubby terrain by developing exceptionally dense, compact hides. This high-density fiber network gives Kenyan full-grain leather its unique, rugged, and highly durable characteristics. By reclaiming and curing these agricultural byproducts in state-of-the-art tanneries along Athi River, we ensure a sustainable circular fashion system that supports local farming communities.
          </p>
        </section>

        <section className="space-y-4 bg-stone-50 p-8 rounded-3xl border border-stone-200">
          <h3 className="text-lg font-serif font-bold text-stone-900 mb-4">Atelier Laboratory: Three Tests to Identify Real Full-Grain Leather</h3>
          <ol className="space-y-3 list-decimal pl-6 text-sm">
            <li>
              <strong>The Touch and Warmth Test:</strong> Real genuine leather is a natural, breathable protein. Place your hand on the bag's surface. True leather will absorb your body heat within 3 seconds, feeling warm, organic, and supple. Synthetic PU plastic leather is non-porous and will remain cold, slick, and artificially smooth.
            </li>
            <li>
              <strong>The Water Absorption Test:</strong> Place a single, tiny drop of clean water on an inconspicuous area of the leather. Real, unsealed full-grain leather has microscopic pores and will slowly absorb the moisture within 1 to 2 minutes, leaving a temporary dark spot that air-dries cleanly. Synthetic faux leather is essentially plastic and the water droplet will bead up and roll off indefinitely.
            </li>
            <li>
              <strong>The Natural Grain Audit:</strong> Closely inspect the pore patterns on the surface. Real full-grain hides display minor scratches, neck wrinkles, stretch marks, and irregular, asymmetrical pore clusters. If the grain pattern is perfectly uniform, mathematically symmetric, and identical across the entire surface, it has been mechanically embossed and is either heavily corrected split leather or synthetic plastic.
            </li>
          </ol>
        </section>

        <section className="space-y-4 pt-4 border-t border-stone-200">
          <h3 className="text-xl font-serif font-bold text-stone-900">Frequently Asked Questions (FAQs)</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Q: Does "Genuine Leather" mean it is high quality?</h4>
              <p className="text-sm">
                No. In industry terminology, "Genuine Leather" actually represents a low-grade split leather. It is split from the fibrous bottom layers of the hide, painted, and embossed with fake grain. For maximum lifespan and beautiful aging, always look for "Full-Grain" or "Top-Grain" markings.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Q: Why does my new bag have minor scratches or color variations?</h4>
              <p className="text-sm">
                These are not defects; they are the ultimate proof of authenticity! Full-grain leather is completely natural and uncorrected. Scars, insect bites, and minor shading reflect the free-range life of East African cattle, making your handcrafted bag a one-of-a-kind piece.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Q: Is chrome-tanned leather safe for the environment?</h4>
              <p className="text-sm">
                Yes, when handled responsibly. We partner exclusively with certified Kenyan tanneries that run modern biological wastewater filtration plants. This ensures all mineral salts are safely reclaimed and zero chemicals are released into local river systems.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  },
  'leather-care': {
    title: 'The Definitive Care & Restoration Protocol',
    subtitle: 'Practical cleaning protocols, molecular stain-removal chemistry, and optimal preservation routines.',
    content: (
      <div className="space-y-8 text-stone-700 font-light text-base leading-relaxed">
        <section className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">1. The Chemistry of Cleaning: pH-Neutral Cleaners vs. Detergents</h3>
          <p>
            Full-grain leather is slightly acidic, maintaining a natural pH balance of around 4.5 to 5.0. Utilizing harsh, alkaline household detergents, dish soaps, or alcohol-based wet wipes represents a catastrophic mistake. 
          </p>
          <p>
            These chemicals react with the hide's natural conditioning oils, stripping away the critical moisture barrier and leaving the underlying collagen fibers dry, brittle, and highly susceptible to severe cracking. For safe home care, always use a dedicated, pH-balanced leather cleaner or a highly diluted solution of pH-neutral baby soap. Wipe in gentle circular motions without scrubbing to protect the delicate topcoat.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">2. The Conditioning Standard: Hydrating the Fiber Matrix</h3>
          <p>
            Just like human skin, leather requires periodic conditioning to maintain its elasticity, suppleness, and natural luster. Over time, friction and exposure to air cause the hide's moisture to evaporate.
          </p>
          <p>
            Every 3 to 6 months, apply a premium organic leather conditioner containing beeswax, mink oil, or neatsfoot oil. Place a pea-sized amount onto a clean microfiber cloth, rub in gentle circular patterns, and let the fibers absorb the conditioning cream for 30 minutes. Finally, buff with a fresh cloth to restore the leather's natural, rich, and healthy sheen.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">3. Environmental Preservation: Rain, Humidity, and Mold in Nairobi</h3>
          <p>
            Nairobi's rainy months bring severe humidity spikes that create an active breeding ground for mold and mildew on organic leather goods. Safeguard your luxury investments with these strict rules:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 text-center">
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-2">
              <span className="text-emerald-700 font-bold block text-sm">Water Recovery</span>
              <p className="text-xs">If caught in a downpours, wipe surface water instantly with a dry towel. Let it air-dry naturally in a cool room. Never use radiators, hair dryers, or direct sun, which shrink and crack leather.</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-2">
              <span className="text-emerald-700 font-bold block text-sm">Humidity Control</span>
              <p className="text-xs">Store bags in a well-ventilated, dry closet. Avoid plastic boxes or airtight nylon covers which trap moisture. Place silica gel packets inside pockets to actively capture ambient humidity.</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-2">
              <span className="text-emerald-700 font-bold block text-sm">Organic Dustbags</span>
              <p className="text-xs">Always wrap and store your bags in the breathable 100% cotton dustbag provided by Mel's Fashion. This protects from surface dust while allowing natural air circulation.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4 bg-stone-50 p-8 rounded-3xl border border-stone-200">
          <h3 className="text-lg font-serif font-bold text-stone-900 mb-4">Atelier Laboratory: Professional Stain Removal Protocols</h3>
          <ul className="space-y-4 text-sm pl-6 list-disc">
            <li>
              <strong>Oil & Grease Stains:</strong> Immediately dust the affected area with pure cornstarch or talcum powder. Let the powder sit on the stain for 4 to 8 hours to actively absorb the surface oils. Brush away gently with a soft horsehair brush. Never apply water, which spreads grease deeper into the grain.
            </li>
            <li>
              <strong>Ink & Scuff Marks:</strong> Stains of this nature require immediate professional care. Do not use home remedies like alcohol wipes, hairspray, or vinegar. Dampen a soft cloth with a tiny amount of specialized leather ink remover, dab very lightly (never rub), and allow it to lift the pigment safely.
            </li>
            <li>
              <strong>Liquid & Wine Stains:</strong> Blot—do not rub—the liquid instantly with a clean, dry, white paper towel. Work from the outside of the stain toward the center to prevent spreading. Once dry, clean the entire panel with a damp cloth and pH-balanced leather cleaner to keep the shading uniform.
            </li>
          </ul>
        </section>

        <section className="space-y-4 pt-4 border-t border-stone-200">
          <h3 className="text-xl font-serif font-bold text-stone-900">Frequently Asked Questions (FAQs)</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Q: How do I store my bags so they keep their original shape?</h4>
              <p className="text-sm">
                Always stuff your bags when not in use! Use clean bubble wrap, white acid-free tissue paper, or clean cotton cloths. Never use newspapers, as the heavy carbon inks can easily bleed and permanently stain your bag's internal fabric lining.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Q: Can I use olive oil or coconut oil to condition my bag?</h4>
              <p className="text-sm">
                No. Culinary oils like olive or coconut oil contain organic fats that will turn rancid over time, creating foul odors and attracting bacteria. They also darken leather unevenly and clog the natural pores. Use only verified, professional-grade leather conditioning creams.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Q: How do I recover a moldy leather bag?</h4>
              <p className="text-sm">
                Mix equal parts of warm distilled water and isopropyl alcohol. Dampen a soft cloth, wipe the mold away gently, and let it dry. Immediately follow with a deep treatment of pH-balanced leather conditioner to restore the moisture stripped by the alcohol.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  },
  'buying-guides': {
    title: 'The Art of Handbag Investment & Curation',
    subtitle: 'Step-by-step handbooks on selecting premium silhouettes, structural features, and slow fashion economics.',
    content: (
      <div className="space-y-8 text-stone-700 font-light text-base leading-relaxed">
        <section className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">1. Architectural Fit: Matching Silhouettes to Your Wardrobe</h3>
          <p>
            A premium leather handbag is more than an accessory; it is a structural extensions of your visual silhouette. When choosing a bag, evaluate how the shape interacts with your daily outfits:
          </p>
          <ul className="space-y-3 pl-6 list-disc">
            <li>
              <strong>Structured Totes (Corporate Command):</strong> Boxy, architectural, and beautifully geometric. These bags command professional respect in boardrooms, holding laptops and folders securely. They pair perfectly with sharp tailored blazers and trench coats.
            </li>
            <li>
              <strong>Supple Crossbodies (Casual Chic):</strong> Curved, lightweight, and hands-free. These bags drape naturally across the hips, softening sharp angles and pairing beautifully with linen dresses, denim jackets, and casual weekend luxury.
            </li>
            <li>
              <strong>Minimalist Clutches (Occasion Glamour):</strong> Sleek, slim, and visually stunning. Designed to be carried in the hand or under the arm, they serve as elegant accents for evening silhouettes, cocktail dresses, and formal wear.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">2. Load Capacity and Ergonomics: The Math of Comfort</h3>
          <p>
            A luxurious bag must feel effortless to carry. Always calculate the bag's capacity and strap ergonomics before purchasing:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 text-sm">
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
              <h4 className="font-serif font-bold text-stone-900 mb-2">Corporate Totes (Laptops & Tech)</h4>
              <p>
                Ensure the bag features double-stitched shoulder straps that are at least 1.5 to 2.0 cm wide. Narrow straps will dig deeply and painfully into your shoulder muscles under the weight of a 13-inch or 15-inch laptop, tablet, charger, and documents.
              </p>
            </div>
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
              <h4 className="font-serif font-bold text-stone-900 mb-2">Crossbody Bags (Daily Essentials)</h4>
              <p>
                Look for adjustable, wide straps that allow you to reposition the bag. The ideal resting point is right at your hip or slightly above. This distributes the weight evenly across your torso and minimizes lower back fatigue.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">3. Mechanics of Luxury: Heavy Hardware & Premium Linings</h3>
          <p>
            The true mark of a premium handbag lies in its hidden elements. Always inspect the quality of the hardware and interior linings:
          </p>
          <p>
            Luxury bags use heavy, solid brass or polished steel hardware that feels substantial and resists scratching or peeling. Cheaper options use lightweight, painted plastic or zinc alloys that quickly oxidize and break. Similarly, interior linings should be crafted from thick, durable cotton twill or premium suede rather than fragile, noisy polyester that easily tears at the seams under the friction of keys and daily essentials.
          </p>
        </section>

        <section className="space-y-4 bg-stone-50 p-8 rounded-3xl border border-stone-200">
          <h3 className="text-lg font-serif font-bold text-stone-900 mb-4">Atelier Laboratory: The 5-Point Quality Check Checklist</h3>
          <ol className="space-y-3 list-decimal pl-6 text-sm">
            <li><strong>Stitch Tension Check:</strong> Inspect the seams. The stitching must be mathematically straight, tight, uniform, and free of loose ends or loops. Look for double-stitching at all high-stress anchors like strap joints.</li>
            <li><strong>Edge Paint Inspection:</strong> Run your finger along the cut edges of the leather. They should be sealed with multiple coats of premium edge paint, feeling smooth, uniform, and completely dry, with zero raw or exposed fibers.</li>
            <li><strong>Zipper Motion Test:</strong> Open and close the main zippers multiple times. Premium brass zippers glide effortlessly and smoothly without catching or binding on the fabric lining.</li>
            <li><strong>Base Support Audit:</strong> Place the bag on a flat table. A high-quality structured bag should stand upright on its own, supported by protective metal feet (studs) to prevent the bottom leather from scuffing.</li>
            <li><strong>Interior Seam Reinforcement:</strong> Turn the bag slightly inside out. Check if all pockets and structural seams are bound with bias tape to prevent fraying and guarantee decades of durable use.</li>
          </ol>
        </section>

        <section className="space-y-4 pt-4 border-t border-stone-200">
          <h3 className="text-xl font-serif font-bold text-stone-900">Frequently Asked Questions (FAQs)</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Q: Is it smarter to buy one premium bag or three fast-fashion bags?</h4>
              <p className="text-sm">
                A premium full-grain leather bag is infinitely smarter. Fast-fashion PU bags crack and peel within a year, while a single handcrafted full-grain leather bag lasts decades, actually increasing in character and developing a stunning natural patina. It represents the ultimate eco-friendly slow-fashion investment.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Q: What is the most versatile color for an everyday luxury bag?</h4>
              <p className="text-sm">
                Classic neutrals such as rich tan, deep chocolate, and timeless black represent the safest foundations. They coordinate effortlessly with almost any color palette. Once you have built your neutral foundation, you can introduce vibrant pop accents like rich forest green or burgundy.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Q: How do I verify a seller is offering authentic Kenyan leather?</h4>
              <p className="text-sm">
                Ethical Kenyan brands maintain complete transparency. Always ask about their tanning partner location, materials, and support for local Nairobi artisans. Authentic Kenyan leather has a distinct organic, earthy aroma and displays natural grain pore textures.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  },
  'fashion-styling': {
    title: 'The Luxury Silhouettes & Styling Guide',
    subtitle: 'Trend analysis, color theory, and seasonal silhouettes to coordinate handbags with luxury apparel.',
    content: (
      <div className="space-y-8 text-stone-700 font-light text-base leading-relaxed">
        <section className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">1. Styling Nairobi Silhouettes: The Fusion of Urban and Heritage</h3>
          <p>
            Modern Nairobi style represents an elegant, high-contrast fusion of sharp urban silhouettes and rich heritage craftsmanship. A handcrafted full-grain leather bag serves as the perfect anchor, balancing bold modern fashion with warm, organic textures:
          </p>
          <ul className="space-y-3 pl-6 list-disc">
            <li>
              <strong>Monochromatic Tailoring:</strong> Pair a sharp, single-color pantsuit or long coat with a contrasting structural leather bag. A deep tan or forest green tote breaks up the visual monotony, adding instant warmth, depth, and three-dimensional texture.
            </li>
            <li>
              <strong>Textural Contrasts:</strong> Create a compelling outfit by playing with opposing materials. Mix lightweight, flowing silk or linen fabrics with a heavy, highly structured vegetable-tanned shoulder bag to create a stunning visual balance.
            </li>
            <li>
              <strong>Heritage Patterns:</strong> When wearing bold prints, coordinate with a sleek, minimalist, solid-colored leather bag. This anchors the look, giving the eye a resting point and keeping the outfit sophisticated and elegant.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">2. Color Theory: Neutral Grains vs. Vibrant Pop Accents</h3>
          <p>
            Color coordination is a highly effective way to express personal style. Use these core color principles to elevate your look:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 text-sm">
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
              <h4 className="font-serif font-bold text-stone-900 mb-2">Neutral Cohesion</h4>
              <p>
                Pair warm leather tones (such as camel, honey, tan, and chocolate) with earthy neutrals like olive green, cream, navy blue, and charcoal gray. This creates a highly cohesive, warm, and sophisticated aesthetic that feels timeless.
              </p>
            </div>
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
              <h4 className="font-serif font-bold text-stone-900 mb-2">Vibrant Contrast</h4>
              <p>
                Use rich, colorful leathers (such as our scarlet red or forest emerald bags) to inject energy into a minimalist black, white, or gray outfit. A bold colored handbag serves as a dramatic, eye-catching visual punctuation mark.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">3. Day-to-Night Transitions: Maximizing Wardrobe Utility</h3>
          <p>
            For the modern, active professional, a bag must adapt seamlessly to changing environments throughout the day:
          </p>
          <p>
            Choose versatile designs such as structured totes that come with hidden, detachable crossbody straps, or elegant clutches that feature tuck-away chain straps. During busy business hours, carry your tech and folders in a structured tote. As evening approaches, tuck the tote away and transition seamlessly to a minimalist, hands-free crossbody or clutch for dinner, cocktails, or high-profile social events.
          </p>
        </section>

        <section className="space-y-4 bg-stone-50 p-8 rounded-3xl border border-stone-200">
          <h3 className="text-lg font-serif font-bold text-stone-900 mb-4">Atelier Laboratory: The Color Pairing Formula</h3>
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-stone-300">
                <th className="pb-3 font-serif font-bold text-stone-900">Handbag Shade</th>
                <th className="pb-3 font-serif font-bold text-stone-900">Recommended Outfit Colors</th>
                <th className="pb-3 font-serif font-bold text-stone-900">Style Vibe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              <tr>
                <td className="py-3 font-medium text-stone-900">Cognac & Tan</td>
                <td className="py-3">Navy, Emerald, Cream, Olive</td>
                <td className="py-3">Classic Heritage / Effortless Chic</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-stone-900">Timeless Black</td>
                <td className="py-3">Charcoal, White, Crimson, Cobalt</td>
                <td className="py-3">Avant-Garde / High Corporate</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-stone-900">Forest Emerald</td>
                <td className="py-3">Beige, Camel, Crisp White, Gold</td>
                <td className="py-3">Rich Artisan / Bold Luxury</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-stone-900">Burgundy / Wine</td>
                <td className="py-3">Slate Grey, Mustard, Charcoal</td>
                <td className="py-3">Regal / Moody Romantic</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="space-y-4 pt-4 border-t border-stone-200">
          <h3 className="text-xl font-serif font-bold text-stone-900">Frequently Asked Questions (FAQs)</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Q: Should my handbag always match my shoes and belt?</h4>
              <p className="text-sm">
                No, the modern rule is coordination over strict matching. Your bag, shoes, and belt should belong to the same warm or cool color family, but they do not need to be identical. Mixing camel boots with a dark cognac bag looks far more organic and sophisticated than exact matching.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Q: How do I style a bright red bag without looking overwhelmed?</h4>
              <p className="text-sm">
                Keep the rest of your outfit neutral and minimal. Pair your red bag with an all-black dress, a crisp white button-down with denim, or a camel-toned trench coat. This allows the bag to stand as a beautiful, singular statement piece.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Q: What is the most flattering bag silhouette for a petite frame?</h4>
              <p className="text-sm">
                Petite frames look best with small to medium-sized bags like structured clutches, crossbody bags, or compact shoulder bags. Oversized, unstructured totes can visually overwhelm a smaller frame, so choose bags that keep your proportions balanced.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  },
  'kenyan-craftsmanship': {
    title: 'The Legacy of Nairobi Master Artisans',
    subtitle: 'A celebratory chronicle of Maasai sourcing, circular leatherwork, and fair wages in our Kilimani studio.',
    content: (
      <div className="space-y-8 text-stone-700 font-light text-base leading-relaxed">
        <section className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">1. Sourcing with Honor: Reclaiming Local Livestock Hides</h3>
          <p>
            At the heart of Mel's Fashion is an unwavering honor for local heritage and sustainable circular agriculture. Kenyan leatherwork is deeply intertwined with pastoral communities. In regions like Narok, Kajiado, and Samburu, livestock represents the lifeblood of families.
          </p>
          <p>
            We do not import cheap, industrially mass-produced synthetic materials or lower-grade hides. Instead, we reclaim pastoral bovine hides that are natural byproducts of local agriculture. By curing these premium, dense hides in Athi River using biological, eco-safe tanning methods, we transform raw agricultural remnants into beautiful, sustainable canvases for premium luxury fashion.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">2. The Kilimani Atelier: Inside the Master Artisan Workflow</h3>
          <p>
            Step inside our light-filled workshop in Kilimani, Nairobi, where mass production is completely rejected. Here, each bag is handcrafted from start to finish by a single master artisan:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 text-center text-xs">
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">1. Pattern Cutting</span>
              <p className="font-light">The artisan hand-selects the hide panel and cuts the patterns using traditional steel shears to avoid weak spots.</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">2. Skiving & Creasing</span>
              <p className="font-light">Exposed leather edges are skived (thinned) to ensure clean, flat, and elegant folds along all seams.</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">3. Hand-Stitching</span>
              <p className="font-light">Panels are stitched using high-tensile waxed thread, ensuring straight, beautiful seams built to last decades.</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">4. Edge Painting</span>
              <p className="font-light">Multiple coats of premium liquid edge paint are applied and buffed to fully seal the cut fibers.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">3. Empowering Communities: Sustainable Fair Wages & Upliftment</h3>
          <p>
            True luxury cannot exist at the expense of human dignity. At Mel's Fashion, we reject low-wage industrial exploitation. We pay our master artisans sustainable, fair living wages that are significantly above the standard market rate.
          </p>
          <p>
            This financial stability empowers our craftspeople to live comfortably in Nairobi, support their families, invest in their children's secondary and tertiary education, and build clean, stable local communities. When you purchase a handcrafted Mel's Fashion bag, your investment supports real lives, preserves ancient heritage craft, and keeps the local creative economy thriving.
          </p>
        </section>

        <section className="space-y-4 bg-stone-50 p-8 rounded-3xl border border-stone-200">
          <h3 className="text-lg font-serif font-bold text-stone-900 mb-4">Anatomy of a Handcrafted Mel's Fashion Handbag</h3>
          <ul className="space-y-3 text-sm pl-6 list-disc">
            <li><strong>Premium Sahiwal Leather:</strong> Dense, heavy full-grain hides sourced from pastoral Sahiwal cattle, offering natural water resistance and aging beautifully into a rich, deep patina.</li>
            <li><strong>Waxed Polyester Thread:</strong> Double-threaded saddle-stitched seams that will not fray or pull apart even under heavy corporate loads.</li>
            <li><strong>Solid Brass Anchors:</strong> Custom-cast solid brass rings, buckles, and feet that resist oxidation and tarnish, maintaining a polished luxury gleam.</li>
            <li><strong>Premium Suede Interior:</strong> Soft, breathable, and highly durable internal lining that provides an elegant resting place for your tech and valuables.</li>
          </ul>
        </section>

        <section className="space-y-4 pt-4 border-t border-stone-200">
          <h3 className="text-xl font-serif font-bold text-stone-900">Frequently Asked Questions (FAQs)</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Q: Can I visit the Kilimani workshop to see the artisans?</h4>
              <p className="text-sm">
                Yes! We maintain an open-door policy at our Nairobi studio in Kilimani. You can schedule a private visit to meet the master artisans, witness the meticulous hand-crafting process, and select your custom leather panel in person.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Q: How many hours does it take to hand-craft a single bag?</h4>
              <p className="text-sm">
                Depending on the structural complexity, a single handbag requires between 18 to 36 hours of highly focused manual labor. This includes selection, cutting, skiving, meticulous hand-assembly, and multiple coats of edge sealing.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-800 text-sm mb-1">Q: How does purchasing a bag support local communities?</h4>
              <p className="text-sm">
                We reinvest a substantial percentage of our revenue back into the local economy by sourcing raw hides from pastoral farmers, buying organic tanning materials, paying premium fair wages, and sponsoring craft training programs for young Nairobi youths.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }
};
