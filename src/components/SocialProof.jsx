import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Star, CheckCircle2 } from 'lucide-react';
import { reviews } from '../data';

export default function SocialProof() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proof-elem', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15,
        scrollTrigger: { trigger: '.proof-container', start: 'top 85%' }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 bg-light-cyan-alt">
      <div className="max-w-6xl mx-auto proof-container">
        
        <div className="text-center max-w-2xl mx-auto mb-16 proof-elem">
          <span className="eyebrow block mb-4">Ergebnisse aus dem echten Leben</span>
          <h2 className="section-headline mb-6">
            Lass dir nichts erzählen. Lass es dir beweisen.
          </h2>
          <div className="flex items-center justify-center gap-2 text-jet-black mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6" fill="currentColor" />)}
          </div>
          <p className="font-condensed font-bold uppercase tracking-widest text-dusk-blue">
            4.8/5 Sterne • 47.529+ Zufriedene Kunden
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {reviews.map((review, idx) => (
            <div key={idx} className="card-border bg-white p-6 md:p-8 proof-elem flex flex-col h-full">
              {review.image && (
                <div className="w-full aspect-[4/3] mb-6 overflow-hidden rounded-xl bg-light-cyan">
                  <img src={review.image} alt={`Review von ${review.name}`} className="w-full h-full object-cover opacity-90" loading="lazy" decoding="async" />
                </div>
              )}
              <div className="flex items-center gap-1 mb-4 text-burnt-peach">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4" fill="currentColor" />)}
              </div>
              
              <blockquote className="body-text italic mb-6 grow text-[14px]">
                "{review.text}"
              </blockquote>
              
              <div className="mt-auto border-t border-powder-blue/50 pt-4 flex items-center justify-between">
                <div>
                  <div className="font-condensed font-bold uppercase tracking-tighter text-jet-black text-lg">
                    {review.name}
                  </div>
                  <div className="text-xs font-sans text-dusk-blue">{review.role}</div>
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-widest text-burnt-peach bg-burnt-peach/10 px-2 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Verifiziert
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* TRUST BADGES ROW */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 pt-8 border-t border-powder-blue/50 proof-elem">
          <div className="text-center">
            <div className="font-condensed font-extrabold text-2xl text-jet-black">100%</div>
            <div className="label-text">Laborgeprüft</div>
          </div>
          <div className="w-[1px] h-8 bg-powder-blue/50 hidden md:block"></div>
          <div className="text-center">
            <div className="font-condensed font-extrabold text-2xl text-jet-black">DE</div>
            <div className="label-text">Made in Germany</div>
          </div>
          <div className="w-[1px] h-8 bg-powder-blue/50 hidden md:block"></div>
          <div className="text-center">
            <div className="font-condensed font-extrabold text-2xl text-jet-black">REWE</div>
            <div className="label-text">Im Handel erhältlich</div>
          </div>
        </div>

      </div>
    </section>
  );
}