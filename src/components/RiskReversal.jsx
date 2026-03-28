import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShieldCheck } from 'lucide-react';

export default function RiskReversal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.risk-elem', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15,
        scrollTrigger: { trigger: '.risk-container', start: 'top 85%' }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 bg-white relative">
      <div className="max-w-4xl mx-auto risk-container">
        <div className="card-border border-2 border-powder-blue p-8 md:p-16 text-center bg-light-cyan-alt relative overflow-hidden group">
          
          <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors duration-500"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-light-cyan border-2 border-powder-blue mb-8 risk-elem">
              <ShieldCheck className="w-10 h-10 text-burnt-peach" />
            </div>
            
            <h2 className="section-headline mb-6 risk-elem">
              Die <span className="text-burnt-peach">„Liebe auf den ersten Löffel“</span> Garantie.
            </h2>
            
            <p className="body-text text-lg max-w-2xl mx-auto mb-8 risk-elem">
              Wir versprechen dir kein Marketing-Blabla, sondern ein echtes Geschmackserlebnis. Teste die Geschmacksbombe in deinem eigenen Quark oder Kuchen. Wenn es dich beim ersten Löffel nicht umhaut, bekommst du dein Geld zurück. Ohne Wenn und Aber.
            </p>
            
            <div className="font-condensed font-extrabold text-[#34A853] uppercase tracking-widest text-sm risk-elem">
              Dein Geschmackserlebnis ist garantiert.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}