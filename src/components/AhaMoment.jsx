import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';

const FLAVORS = [
  { name: 'Blaubeer-Käsekuchen', color: 'text-[#6B4B96]' },
  { name: 'Bananensplit', color: 'text-[#DCA828]' },
  { name: 'Schoko Kiddy', color: 'text-[#6C4A3A]' },
  { name: 'Erdbeer-Wunder', color: 'text-[#D14652]' },
  { name: 'Apfel-Zimt', color: 'text-[#7D913A]' }
];

export default function AhaMoment() {
  const containerRef = useRef(null);
  const [flavorIndex, setFlavorIndex] = useState(0);

  useEffect(() => {
    let interval;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          interval = setInterval(() => setFlavorIndex(prev => (prev + 1) % FLAVORS.length), 1800);
        } else {
          clearInterval(interval);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => { observer.disconnect(); clearInterval(interval); };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.aha-card', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.aha-card',
          start: 'top 85%'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 bg-light-cyan-alt relative overflow-x-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        
        {/* TEXT CONTENT */}
        <div className="w-full lg:w-1/2 aha-card">
          <div className="flex items-center gap-2 mb-6 text-burnt-peach">
            <Sparkles className="w-6 h-6" />
            <span className="eyebrow !text-burnt-peach !mb-0">Die Transformation</span>
          </div>
          
<h2 className="section-headline mb-6 hyphens-auto">
  Stell dir vor, dein Magerquark schmeckt wie
  <span 
    className="block mt-1"
    style={{ height: '2.4em', overflow: 'hidden' }}  
  >
    <span
      key={flavorIndex}
      className={`animate-flavor-cycle block ${FLAVORS[flavorIndex].color}`}
    >
      {FLAVORS[flavorIndex].name}
    </span>
  </span>
</h2>
          
          <p className="italic-subheadline lowercase mb-8">
            — mit nur 4,5 kcal pro portion.
          </p>
          
          <p className="body-text">
            Die Mechanik ist simpel, aber mächtig: <strong className="font-bold text-jet-black">3g Geschmacksbombe</strong> ersetzen die Süßkraft von <strong className="font-bold text-jet-black">50g Zucker</strong>. Ein Teelöffel reicht, um aus deinem Diät-Alltag ein tägliches Highlight zu machen. Kein künstlicher Nachgeschmack. Reine Textur.
          </p>
        </div>

        {/* VISUAL */}
        <div className="w-full lg:w-1/2 relative aha-card pl-4 md:pl-8">
          <div className="card-border !overflow-visible p-3 md:p-6 bg-white relative z-10">
            <img
              src="gif-final.gif"
              alt="Magerquark mit Geschmacksbombe"
              className="w-full h-[400px] object-cover rounded-[12px]"
              loading="lazy"
            />            
            {/* Overlay Badge */}
            <div className="absolute -bottom-6 -left-4 md:-left-12 bg-jet-black text-white p-5 md:p-6 rounded-2xl shadow-xl border border-powder-blue/20 max-w-[200px] md:max-w-[240px] z-20">
              <div className="font-condensed font-extrabold text-2xl md:text-3xl mb-1 text-light-cyan">3g = 50g</div>
              <div className="font-sans text-xs md:text-sm font-medium opacity-90 leading-tight">So viel Süßkraft steckt in einem einzigen Messlöffel.</div>
            </div>
          </div>
          
          {/* Decorative background element */}
          <div className="absolute -inset-4 ml-4 md:ml-8 border border-powder-blue rounded-[24px] z-0 translate-x-4 translate-y-4"></div>
        </div>

      </div>
    </section>
  );
}