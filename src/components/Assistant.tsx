"use client";

import React from 'react';

const Assistant: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <a 
        href="https://wa.me/254740899918" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white w-14 h-14 flex items-center justify-center rounded-full shadow-2xl hover:scale-110 shadow-[#25D366]/30 transition-all duration-300 z-50 flex-shrink-0"
        aria-label="Chat with us on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 ml-[1px] mt-[1px]"
        >
          <path d="M12.01 1.34c-5.59 0-10.14 4.56-10.14 10.14 0 1.78.47 3.53 1.35 5.09L1.84 22.04l5.61-1.47a10.05 10.05 0 0 0 4.56 1.09h.01c5.59 0 10.15-4.56 10.15-10.15S17.6 1.34 12.01 1.34zm0 17.06c-1.55 0-3.08-.42-4.42-1.21l-.32-.19-3.29.86.88-3.21-.21-.33a8.47 8.47 0 0 1-1.3-4.56c0-4.66 3.79-8.45 8.46-8.45 2.26 0 4.39.88 5.98 2.48s2.47 3.73 2.47 6.01c-.01 4.66-3.8 8.44-8.47 8.44h.02zm4.64-6.33c-.25-.13-1.5-.74-1.74-.83-.24-.09-.41-.13-.58.13-.17.25-.66.83-.81 1-.15.17-.3.19-.55.06-1.12-.55-2.09-1.02-2.88-2.39-.15-.25 0-.38.13-.51.11-.11.25-.3.38-.45.13-.15.17-.25.25-.42.09-.17.04-.32-.02-.45s-.58-1.4-.8-1.91c-.21-.5-.43-.43-.58-.44h-.5c-.17 0-.45.06-.69.32s-.91.89-.91 2.17.93 2.51 1.06 2.68 1.83 2.79 4.43 3.92c2.19.95 2.6.76 3.08.7.48-.06 1.5-.61 1.71-1.21.21-.6.21-1.11.15-1.21-.06-.1-.23-.16-.48-.29z" />
        </svg>
      </a>
    </div>
  );
};

export default Assistant;