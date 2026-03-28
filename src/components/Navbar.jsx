import React, { useEffect, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navRef.current.classList.add('bg-light-cyan/80', 'backdrop-blur-xl', 'border', 'border-powder-blue', 'shadow-sm');
        navRef.current.classList.remove('bg-transparent', 'border-transparent');
      } else {
        navRef.current.classList.add('bg-transparent', 'border-transparent');
        navRef.current.classList.remove('bg-light-cyan/80', 'backdrop-blur-xl', 'border', 'border-powder-blue', 'shadow-sm');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCheckout = () => {
    const el = document.getElementById('checkout');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      ref={navRef}
      className="absolute md:fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 border border-transparent bg-transparent"
    >
      <div className="flex items-center gap-2">
        <span className="font-condensed font-extrabold uppercase tracking-tighter text-jet-black text-xl md:text-2xl">
          BrustBizeps
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={scrollToCheckout}
          className="btn-primary py-2 px-5 md:py-3 md:px-6 text-xs md:text-sm"
        >
          <ShoppingBag className="w-4 h-4 mr-2 hidden md:block" />
          Jetzt probieren
        </button>
      </div>
    </nav>
  );
}