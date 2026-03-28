import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Star, ArrowRight } from 'lucide-react';
import { productData } from '../data';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-elem', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2
      });
      
      gsap.from('.hero-img', {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const scrollToCheckout = () => {
    const el = document.getElementById('checkout');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="min-h-[100dvh] flex flex-col md:flex-row bg-light-cyan relative overflow-hidden pt-24 md:pt-0">
      
      {/* LEFT CONTENT */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:pl-20 md:pr-12 lg:pl-32 xl:pl-40 z-10 pt-8 pb-16 md:py-32 order-2 md:order-1">
        <span className="eyebrow mb-6 hero-elem block">0% Zucker. 100% Geschmack.</span>
        
        <h1 className="hero-headline mb-4 hero-elem">
          Deine gesunde Ernährung schmeckt jetzt endlich gut.
        </h1>
        
        <p className="italic-subheadline mb-8 hero-elem lowercase">
          ohne den schmerzhaften verzicht.
        </p>
        
        <p className="body-text mb-10 hero-elem max-w-lg">
          Verwandle deinen faden Magerquark, Porridge oder Skyr in Blaubeer-Käsekuchen, Schoko Kiddy oder Apfel-Zimt. Voller Geschmack bei nur 4,5 kcal pro Portion. 
        </p>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14 hero-elem">
          <button onClick={scrollToCheckout} className="btn-primary w-full sm:w-auto">
            Jetzt Geschmack entdecken
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
        
        {/* STATS ROW */}
        <div className="flex items-center gap-8 hero-elem pt-8 border-t border-powder-blue/50">
          <div>
            <div className="stat-number">47k+</div>
            <div className="label-text">Zufriedene Kunden</div>
          </div>
          <div className="w-[1px] h-12 bg-powder-blue/50"></div>
          <div>
            <div className="flex items-center gap-1 mb-1 text-jet-black">
              <Star fill="currentColor" className="w-5 h-5" />
              <Star fill="currentColor" className="w-5 h-5" />
              <Star fill="currentColor" className="w-5 h-5" />
              <Star fill="currentColor" className="w-5 h-5" />
              <Star fill="currentColor" className="w-5 h-5" />
            </div>
            <div className="label-text">4.8/5 Sterne (174)</div>
          </div>
        </div>
      </div>

      {/* RIGHT VISUAL */}
      <div className="w-full md:w-1/2 bg-jet-black relative flex items-center justify-center min-h-[50vh] md:min-h-screen order-1 md:order-2 overflow-hidden px-8">
        
        {/* Concentric Ghost Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/10 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 pointer-events-none"></div>

        {/* Product Image */}
        <img 
          src="/Vanille.webp" 
          alt="Geschmacksbombe Dose" 
          className="hero-img relative z-10 w-full max-w-[320px] md:max-w-[450px] object-contain drop-shadow-2xl rounded-2xl border border-white/10 mix-blend-lighten"
        />

        {/* Pill Badge */}
        <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 bg-white rounded-full px-6 py-3 shadow-xl z-20 flex items-center gap-3 animate-bounce">
          <div className="w-2 h-2 rounded-full bg-burnt-peach animate-pulse"></div>
          <span className="font-sans font-bold text-jet-black text-sm uppercase tracking-wider">Neu: 7 Sorten probieren</span>
        </div>
      </div>

    </section>
  );
}