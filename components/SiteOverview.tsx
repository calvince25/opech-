import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag, BookOpen, Star, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SiteOverview() {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Our Collection',
      description: 'Explore our latest artisanal designs, from elegant clutches to spacious totes.',
      icon: ShoppingBag,
      link: '/',
      id: 'products',
      cta: 'Shop Now'
    },
    {
      title: 'The Journal',
      description: 'Read stories about our craftsmanship and the inspiration behind each bag.',
      icon: BookOpen,
      link: '/blog',
      cta: 'Read Stories'
    },
    {
      title: 'Customer Love',
      description: 'See what our global community has to say about their Mell Bags.',
      icon: Star,
      link: '/reviews',
      cta: 'View Reviews'
    },
    {
      title: 'Get in Touch',
      description: 'Have a question or want a custom design? We’d love to hear from you.',
      icon: Mail,
      link: '/contact',
      cta: 'Contact Us'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-[#2C2A26] mb-6"
          >
            What's Happening at Mell Bags
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#5D5A53] max-w-2xl mx-auto text-lg leading-relaxed"
          >
            A quick glimpse into our world of handcrafted elegance in Nairobi. 
            Discover our craft, read our latest stories, and join our community.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="group p-8 bg-[#F5F2EB] rounded-3xl hover:bg-[#2C2A26] transition-all duration-500 cursor-pointer"
              onClick={() => {
                if (section.id) {
                    const el = document.getElementById(section.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else navigate(section.link);
                } else {
                    navigate(section.link);
                }
              }}
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#433E38] transition-colors">
                <section.icon className="w-6 h-6 text-[#2C2A26] group-hover:text-[#F5F2EB]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2C2A26] group-hover:text-white mb-4 transition-colors">
                {section.title}
              </h3>
              <p className="text-[#5D5A53] group-hover:text-[#D6D1C7] mb-8 line-clamp-3 transition-colors">
                {section.description}
              </p>
              <div className="flex items-center gap-2 text-[#2C2A26] group-hover:text-white font-bold uppercase tracking-widest text-xs transition-colors">
                {section.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
