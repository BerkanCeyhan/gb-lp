import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, PackageOpen } from 'lucide-react';

export default function FinalCTA() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-elem', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15,
        scrollTrigger: { trigger: '.cta-container', start: 'top 85%' }
      });
      
      // Pulse animation — only runs when section is in viewport
      const pulseAnim = gsap.to('.pulse-btn', {
        scale: 1.02, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true
      });
      ScrollTrigger.create({
        trigger: '.cta-container',
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => pulseAnim.play(),
        onLeave: () => pulseAnim.pause(),
        onEnterBack: () => pulseAnim.play(),
        onLeaveBack: () => pulseAnim.pause(),
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const scrollToCheckout = () => {
    const el = document.getElementById('checkout');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 bg-jet-black text-white relative overflow-hidden">
      
      {/* Abstract Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full flex justify-center items-center pointer-events-none opacity-[0.05]">
        <div className="w-[800px] h-[800px] rounded-full border-[2px] border-white"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full border-[2px] border-white"></div>
      </div>

      <div className="max-w-3xl mx-auto text-center cta-container relative z-10">
        
        <h2 className="section-headline !text-white mb-6 cta-elem">
          Das Ende des bitteren Nachgeschmacks.
        </h2>
        
        <p className="italic-subheadline lowercase !text-light-cyan mb-12 cta-elem">
          — dein neuer ernährungs-standard beginnt hier.
        </p>

        <div className="cta-elem mb-8">
          <button onClick={scrollToCheckout} className="btn-primary pulse-btn w-full md:w-auto px-12 py-5 text-lg !bg-[#EE6C4D] !border-[#EE6C4D]">
            Jetzt Geschmack entdecken
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          
          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-sans font-medium uppercase tracking-widest opacity-60">
            <span>Sicherer Checkout</span>
            <span className="w-1 h-1 rounded-full bg-current"></span>
            <span>Gratis Versand ab 60€</span>
            <span className="w-1 h-1 rounded-full bg-current"></span>
            <span>Geschmacks-Garantie</span>
          </div>
        </div>

        {/* PROBESET ALTERNATIVE */}
        <div className="mt-16 pt-12 border-t border-white/10 cta-elem">
          <p className="font-condensed font-bold text-white uppercase tracking-tighter text-xl mb-4">
            Du willst dich erst selbst überzeugen?
          </p>
          <button onClick={scrollToCheckout} className="btn-outline !border-white/30 !text-white hover:!border-burnt-peach hover:!text-burnt-peach flex items-center justify-center mx-auto">
            <PackageOpen className="w-4 h-4 mr-2" />
            Hol dir das Probeset (9 Sorten)
          </button>
        </div>

      </div>
    </section>
  );
}