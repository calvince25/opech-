import React from 'react';
import { Star, ExternalLink, QrCode } from 'lucide-react';

export default function GoogleReviewCTA() {
  const reviewUrl = 'https://g.page/r/CQSxu8eF3_qjEBI/review';
  const qrCodeImageUrl = '/google-review-qr.png';

  return (
    <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-8 md:p-12 border border-stone-800 shadow-2xl relative overflow-hidden">
      
      {/* Decorative premium styling */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-stone-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-stone-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
        
        {/* Text Area */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="flex justify-center md:justify-start gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block">Your Opinion Matters</span>
            <h3 className="text-3xl font-serif text-white leading-tight">
              Share Your Mel's Fashion Experience
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed font-light max-w-lg">
              We handcraft each premium leather bag with unwavering dedication. Your review helps us continue supporting local master artisans in Nairobi and guides other luxury fashion lovers.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start">
            <a 
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-stone-950 px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition-all shadow-md hover:shadow-lg"
            >
              Write a Google Review <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* QR Code Container */}
        <div className="bg-white p-6 rounded-2xl border border-stone-800 shadow-xl text-center flex flex-col items-center justify-center space-y-4 shrink-0 group">
          <div className="w-40 h-40 relative">
            <img 
              src={qrCodeImageUrl} 
              alt="Scan to Review Mel's Fashion"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center gap-1.5 text-stone-800 font-bold uppercase tracking-wider text-[10px]">
            <QrCode className="w-3.5 h-3.5 text-stone-900 animate-pulse" />
            <span>Scan to Review</span>
          </div>
        </div>

      </div>
    </div>
  );
}
