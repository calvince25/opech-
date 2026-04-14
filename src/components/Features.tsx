import React from 'react';

const Features: React.FC = () => {
  return (
    <section id="features" className="bg-[#EBE7DE]">
      {/* Feature Block 1 - Handcrafted */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="order-2 lg:order-1 relative h-[500px] lg:h-auto overflow-hidden group">
           <img 
             src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=1200" 
             alt="Handstitching leather" 
             className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
           />
        </div>
        <div className="order-1 lg:order-2 flex flex-col justify-center p-12 lg:p-24 bg-[#EBE7DE]">
           <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-6">Our Philosophy</span>
           <h3 className="text-4xl md:text-5xl font-serif mb-8 text-[#2C2A26] leading-tight">
             Handcrafted to <br/> Last a Lifetime.
           </h3>
           <p className="text-lg text-[#5D5A53] font-light leading-relaxed mb-12 max-w-md">
             We reject the disposable. Every Mel's Fashion piece is crafted from premium Kenyan leather, using traditional techniques that ensure strength and beauty.
           </p>
           <a href="#about" className="inline-block text-sm font-medium uppercase tracking-widest underline underline-offset-8 hover:text-[#8C8881] transition-colors">Read about our craft</a>
        </div>
      </div>

      {/* Feature Block 2 - Made in Nairobi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="flex flex-col justify-center p-12 lg:p-24 bg-[#2C2A26] text-[#F5F2EB]">
           <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-6">Nairobi Pride</span>
           <h3 className="text-4xl md:text-5xl font-serif mb-8 text-[#F5F2EB] leading-tight">
             Artisanal Excellence, <br/> Local Impact.
           </h3>
           <p className="text-lg text-[#A8A29E] font-light leading-relaxed mb-12 max-w-md">
             Our workshop in the heart of Nairobi is where the magic happens. By employing local artisans, we preserve traditional skills while providing ethical employment.
           </p>
        </div>
        <div className="relative h-[500px] lg:h-auto overflow-hidden group">
           <img 
             src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200" 
             alt="Nairobi artisan working" 
             className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 brightness-90"
           />
        </div>
      </div>
    </section>
  );
};

export default Features;
