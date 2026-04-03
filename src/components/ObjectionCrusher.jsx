import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Plus } from 'lucide-react';

export default function ObjectionCrusher() {
  const containerRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.obj-elem', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.1,
        scrollTrigger: { trigger: '.obj-container', start: 'top 85%' }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const objections = [
    {
      q: "Schmeckt das wirklich – oder nur im Vergleich zu nichts?",
      a: "Sagen wir es so: 94% unserer Kundinnen bestellen nach. Nicht weil sie gesund sein wollen – sondern weil ihr Quark ohne Geschmacksbombe jetzt langweilig schmeckt."
    },
    {
      q: "Sind Süßstoffe wie Sucralose nicht ungesund?",
      a: "Jede Portion wird in Deutschland hergestellt und ist 100% laborgeprüft. Wir verwenden ausschließlich von der EFSA zugelassene Inhaltsstoffe, die sicher sind und den strengsten deutschen Qualitätsstandards entsprechen. Du gehst keine Kompromisse bei deiner Gesundheit ein."
    },
    {
      q: "Kann ich damit wirklich backen oder nur Quark aufpeppen?",
      a: "Die Geschmacksbombe ist absolut hitzestabil! Genau deshalb erhältst du zu deiner Bestellung unser offizielles Rezeptbuch mit 47 Rezepten gratis dazu. Egal ob Pancakes, Muffins oder Käsekuchen – das Pulver verliert beim Backen weder an Süßkraft noch an Geschmack."
    }
  ];

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 bg-light-cyan">
      <div className="max-w-3xl mx-auto obj-container">
        
        <div className="text-center mb-16 obj-elem">
          <span className="eyebrow block mb-4">Noch skeptisch?</span>
          <h2 className="section-headline">
            Wir beantworten deine Fragen.
          </h2>
        </div>

        <div className="space-y-4 obj-elem">
          {objections.map((obj, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`card-border bg-white transition-all duration-300 ${isOpen ? 'border-burnt-peach shadow-md' : 'hover:border-powder-blue'}`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full text-left p-6 flex items-center justify-between"
                >
                  <span className="font-condensed font-bold text-jet-black text-xl uppercase tracking-tighter pr-8">
                    {obj.q}
                  </span>
                  <div className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45 text-burnt-peach' : 'text-dusk-blue'}`}>
                    <Plus className="w-6 h-6" />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 pt-0 body-text border-t border-light-cyan">
                    {obj.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}