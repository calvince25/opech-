import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-stone-50">
      
      {/* Introduction / Story */}
      <div className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto flex flex-col md:flex-row items-start gap-16 md:gap-32">
        <div className="md:w-1/3">
          <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">
            Handcrafted in Nairobi, <br/> built for the world.
          </h2>
        </div>
        <div className="md:w-2/3 max-w-2xl">
          <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed mb-8">
            Mel's Fashion was founded on a passion for Kenyan craftsmanship and a desire to create timeless accessories for the modern woman. Our journey began in a small workshop in Kilimani, where we first experimented with locally sourced leather and traditional beadwork.
          </p>
          <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed mb-8">
            Every bag is a labor of love, handcrafted by skilled artisans who take pride in their work. We use only the finest Kenyan leather, ensuring that each piece is as durable as it is beautiful.
          </p>
          <img 
            src="https://images.unsplash.com/photo-1524289286702-f07229da36f5?auto=format&fit=crop&q=80&w=1260" 
            alt="Mel's Fashion Workshop" 
            className="w-full h-[500px] object-cover grayscale contrast-[0.9] brightness-110 mt-12 rounded-3xl"
          />
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-300 mt-6">
            Establishing Roots: The Mel's Fashion Workshop, Nairobi
          </p>
        </div>
      </div>

      {/* Philosophy Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="order-2 lg:order-1 relative h-[600px] lg:h-auto overflow-hidden group">
           <img 
             src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=1200" 
             alt="Leather Texture" 
             className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
           />
        </div>
        <div className="order-1 lg:order-2 flex flex-col justify-center p-12 lg:p-32 bg-stone-100">
           <span className="text-xs font-bold uppercase tracking-[0.4em] text-stone-400 mb-8 block">Philosophy</span>
           <h3 className="text-4xl md:text-6xl font-serif mb-10 text-stone-900 leading-tight italic lowercase">
             Quality that speaks <br/> for itself.
           </h3>
           <p className="text-lg text-stone-600 font-light leading-relaxed mb-12 max-w-md">
             We don't believe in shortcuts. Every stitch, every fold, and every finish is executed with precision. Our bags are designed to be passed down through generations, gaining character with every use.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="flex flex-col justify-center p-12 lg:p-32 bg-stone-900 text-white">
           <span className="text-xs font-bold uppercase tracking-[0.4em] text-stone-400 mb-8 block">Origin</span>
           <h3 className="text-4xl md:text-6xl font-serif mb-10 text-white leading-tight italic lowercase">
             Ethically sourced, <br/> locally made.
           </h3>
           <p className="text-lg text-stone-300 font-light leading-relaxed mb-12 max-w-md">
             We are committed to supporting our local economy. By sourcing our leather from Kenyan tanneries and employing local artisans, we ensure that our impact is as positive as our products are beautiful.
           </p>
        </div>
        <div className="relative h-[500px] lg:h-auto overflow-hidden group">
           <img 
             src="https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&q=80&w=1260" 
             alt="Urban Nairobi" 
             className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 brightness-90"
           />
        </div>
      </div>
    </section>
  );
};

export default About;