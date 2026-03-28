import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, X } from 'lucide-react';
import { productData } from '../data';

export default function MobileCTABar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approx 600px)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCheckout = () => {
    const el = document.getElementById('checkout');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-jet-black/95 backdrop-blur-xl border-t border-white/10 p-4 transition-all duration-300">
      
      <button 
        onClick={() => setIsDismissed(true)} 
        className="absolute -top-10 right-4 w-8 h-8 bg-jet-black/90 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white/50"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <img src={productData.productImages[0]} alt="Produkt" className="w-12 h-12 object-contain rounded-md bg-light-cyan p-1" />
          <div>
            <div className="font-condensed font-extrabold text-white text-sm uppercase tracking-tighter truncate w-32">
              {productData.productName}
            </div>
            <div className="flex items-center gap-1 text-burnt-peach mt-0.5">
              <Star className="w-3 h-3" fill="currentColor" />
              <span className="font-sans text-[10px] uppercase font-bold text-white/50 tracking-widest mt-px">
                (174)
              </span>
            </div>
          </div>
        </div>

        <button onClick={scrollToCheckout} className="btn-primary !bg-burnt-peach !text-white !px-4 !py-3 whitespace-nowrap grow text-xs flex justify-center items-center gap-2">
          <ShoppingBag className="w-4 h-4" />
          Probieren
        </button>

      </div>
    </div>
  );
}