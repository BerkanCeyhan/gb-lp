import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FailedSolutions() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.failed-card', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15,
        scrollTrigger: { trigger: '.failed-cards-container', start: 'top 85%' }
      });
      
      gsap.from('.failed-svg-line', {
        strokeDashoffset: 1000,
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: { trigger: '.failed-cards-container', start: 'top 85%' }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const solutions = [
    {
      name: "Echter Zucker & Sirup",
      why: "Die Kalorienbombe. Schmeckt zwar, zerstört aber sofort jedes Kaloriendefizit und treibt den Blutzuckerspiegel nach oben."
    },
    {
      name: "Flüssige Süßstoff-Tropfen",
      why: "Oft extremer, künstlicher Nachgeschmack. Bieten pure Süße, aber null Textur und kein rundes Geschmackserlebnis."
    },
    {
      name: "Fertige \"Protein\"-Desserts",
      why: "Kosten auf Dauer ein Vermögen. Voller unnötiger Füllstoffe und oft überraschend kalorienreich für das, was sie liefern."
    }
  ];

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 bg-jet-black relative overflow-hidden text-white">
      {/* Ghost Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-headline !text-white mb-6">
            Warum die naheliegenden Lösungen nicht funktionieren.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 failed-cards-container">
          {solutions.map((sol, idx) => (
            <div key={idx} className="relative p-8 rounded-[20px] bg-white/[0.04] border border-white/[0.12] failed-card overflow-hidden">
              <h3 className="font-condensed font-bold text-white text-2xl uppercase tracking-tighter mb-4">
                {sol.name}
              </h3>
              <p className="body-text !text-white/70">
                {sol.why}
              </p>
              
              {/* Surgical Eliminator Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <line 
                  x1="0" y1="0" x2="100%" y2="100%" 
                  stroke="#EE6C4D" 
                  strokeWidth="1.5" 
                  strokeDasharray="1000" 
                  strokeDashoffset="0" 
                  className="failed-svg-line opacity-50" 
                />
              </svg>
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <p className="font-condensed font-bold italic text-light-cyan text-2xl uppercase">
            Wenn eines davon funktioniert hätte, wärst du nicht hier.
          </p>
        </div>
      </div>
    </section>
  );
}