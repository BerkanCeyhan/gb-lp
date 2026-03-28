import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { BookOpen, Droplets, Leaf, Sparkles, Zap, Scale } from 'lucide-react';

export default function Mechanism() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.from('.mech-text', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15,
        scrollTrigger: { trigger: '.mech-content', start: 'top 85%' }
      });

      // Flow Connector Animation
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.mech-flow', start: 'top 75%' },
        repeat: -1,
        repeatDelay: 1.5
      });
      
      // 1. Initial paths draw in
      tl.fromTo('.edge-path', {
        strokeDasharray: 300,
        strokeDashoffset: 300
      }, {
        strokeDashoffset: 0, duration: 1, ease: 'power2.inOut'
      }, 0);

      // 2. Node 1 (3g Dosierung) appears
      tl.fromTo('.node-1', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }, 0.2);
      
      // 3. Particles travel from Node 1 to Nodes 2 & 3
      tl.fromTo('.particle-1', { top: '15%', left: '50%', opacity: 0, scale: 0.5 }, { top: '50%', left: '15%', opacity: 1, scale: 1, duration: 0.6, ease: 'power1.in' }, "+=0.2");
      tl.fromTo('.particle-2', { top: '15%', left: '50%', opacity: 0, scale: 0.5 }, { top: '50%', left: '85%', opacity: 1, scale: 1, duration: 0.6, ease: 'power1.in' }, "<");
      
      // 4. Nodes 2 & 3 (Inulin & Sucralose) pop in when particles arrive
      tl.fromTo('.node-2', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' });
      tl.fromTo('.node-3', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }, "<");
      
      // Particles fade out
      tl.to(['.particle-1', '.particle-2'], { opacity: 0, duration: 0.1 }, "<");
      
      // 5. Particles travel from Nodes 2 & 3 to Node 4
      tl.fromTo('.particle-3', { top: '50%', left: '15%', opacity: 0, scale: 0.5 }, { top: '85%', left: '50%', opacity: 1, scale: 1.2, duration: 0.6, ease: 'power1.in' }, "+=0.4");
      tl.fromTo('.particle-4', { top: '50%', left: '85%', opacity: 0, scale: 0.5 }, { top: '85%', left: '50%', opacity: 1, scale: 1.2, duration: 0.6, ease: 'power1.in' }, "<");
      
      // 6. Node 4 (50g Zucker-Effekt) pops with a strong pulse
      tl.fromTo('.node-4', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.8)' });
      tl.to(['.particle-3', '.particle-4'], { opacity: 0, duration: 0.1 }, "<");

      // Final dramatic glow on the result node
      tl.to('.node-4', { boxShadow: '0px 0px 30px 10px rgba(238, 108, 77, 0.5)', duration: 0.4, yoyo: true, repeat: 1 }, "-=0.2");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 bg-light-cyan overflow-x-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* TEXT CONTENT */}
        <div className="w-full lg:w-1/2 mech-content order-2 lg:order-1">
          <p className="font-condensed font-medium text-dusk-blue text-xl uppercase tracking-tighter mb-2 mech-text">
            Die meisten Ersatzprodukte setzen auf pure Süße ohne Textur.
          </p>
          <h2 className="section-headline mb-6 mech-text">
            Das ist anders: Die Inulin-Wirkstoffmatrix.
          </h2>
          
          <div className="space-y-8 mt-8">
            <div className="mech-text">
              <div className="flex items-center gap-3 mb-2">
                <Leaf className="w-5 h-5 text-burnt-peach" />
                <h4 className="font-condensed font-extrabold text-xl uppercase tracking-tighter">1. Die Basis: Inulin aus der Chicorée-Wurzel</h4>
              </div>
              <p className="body-text pl-8 mb-3">
                Inulin ist ein natürlicher, pflanzlicher Ballaststoff. Es gibt dem Pulver sein Volumen und sorgt für diese unvergleichlich cremige Textur im Quark – ganz ohne Kalorien oder Kohlenhydrate beizusteuern.
              </p>
              <div className="ml-0 sm:ml-8 w-full max-w-sm aspect-[5/2] overflow-hidden rounded-xl bg-light-cyan-alt border border-powder-blue">
                <img src="bilder/chicoree.jpg" alt="Chicorée Wurzel" className="w-full h-full object-cover opacity-90" />
              </div>
            </div>

            <div className="mech-text">
              <div className="flex items-center gap-3 mb-2">
                <Droplets className="w-5 h-5 text-burnt-peach" />
                <h4 className="font-condensed font-extrabold text-xl uppercase tracking-tighter">2. Die Süße: Blutzucker-Neutral</h4>
              </div>
              <p className="body-text pl-8 mb-3">
                Durch eine exakt abgestimmte Mischung aus Stevioglycosiden und Sucralose erreichen wir maximale Süßkraft ohne kalorienwirksame Kohlenhydrate. Das macht die Geschmacksbombe zu 100% diabetikergeeignet.
              </p>
              <div className="ml-0 sm:ml-8 w-full max-w-sm aspect-[5/2] overflow-hidden rounded-xl bg-light-cyan-alt border border-powder-blue mb-3">
                <img src="bilder/sucralose.jpg" alt="Süße" className="w-full h-full object-cover opacity-90" />
              </div>
              <div className="ml-0 sm:ml-8 flex items-start gap-2 bg-[#E8F7F0] text-[#1B5E20] px-3 py-2 rounded-lg border border-[#A8DAB5]">
                <span className="text-[10px] uppercase font-sans font-bold tracking-widest pt-0.5">Wichtig:</span>
                <span className="text-xs font-sans font-medium leading-snug">Entgegen mancher Mythen ist Sucralose laut EFSA und neuesten Studien gesundheitlich absolut unbedenklich und wird vom Körper unverändert ausgeschieden.</span>
              </div>
            </div>

            <div className="mech-text">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-5 h-5 text-burnt-peach" />
                <h4 className="font-condensed font-extrabold text-xl uppercase tracking-tighter">3. Hitzestabil: Bereit fürs Rezeptbuch</h4>
              </div>
              <p className="body-text pl-8 mb-3">
                Im Gegensatz zu vielen Alternativen verliert das Pulver beim Backen nicht an Geschmack. Kombiniere es mit den 47 Rezepten aus unserem beiliegenden Rezeptbuch (109 Seiten) für perfekte Kuchen, Pancakes und Bowls.
              </p>
              <div className="ml-0 sm:ml-8 w-full max-w-sm aspect-[5/2] overflow-hidden rounded-xl bg-light-cyan-alt border border-powder-blue">
                <img src="bilder/backen.jpg" alt="Backen" className="w-full h-full object-cover opacity-90" />
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE VISUALIZATION: Flow Connector */}
        <div className="w-full lg:w-1/2 mech-flow order-1 lg:order-2">
          <div className="card-border bg-white p-4 sm:p-8 h-[500px] relative flex flex-col justify-between items-center overflow-hidden">
            
            {/* SVG Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <path d="M 50% 15% L 15% 50%" className="edge-path" stroke="#98C1D9" strokeWidth="2" fill="none" />
              <path d="M 50% 15% L 85% 50%" className="edge-path" stroke="#98C1D9" strokeWidth="2" fill="none" />
              <path d="M 15% 50% L 50% 85%" className="edge-path" stroke="#98C1D9" strokeWidth="2" fill="none" />
              <path d="M 85% 50% L 50% 85%" className="edge-path" stroke="#98C1D9" strokeWidth="2" fill="none" />
              
              <path d="M 50% 15% L 15% 50%" className="edge-path opacity-30" stroke="#EE6C4D" strokeWidth="2" strokeDasharray="5,5" fill="none" style={{ animation: 'dash 15s linear infinite' }} />
              <path d="M 50% 15% L 85% 50%" className="edge-path opacity-30" stroke="#EE6C4D" strokeWidth="2" strokeDasharray="5,5" fill="none" style={{ animation: 'dash 15s linear infinite' }} />
              <path d="M 15% 50% L 50% 85%" className="edge-path opacity-30" stroke="#EE6C4D" strokeWidth="2" strokeDasharray="5,5" fill="none" style={{ animation: 'dash 15s linear infinite' }} />
              <path d="M 85% 50% L 50% 85%" className="edge-path opacity-30" stroke="#EE6C4D" strokeWidth="2" strokeDasharray="5,5" fill="none" style={{ animation: 'dash 15s linear infinite' }} />
            </svg>
            <style>{`
              @keyframes dash {
                to { stroke-dashoffset: -1000; }
              }
            `}</style>

            {/* Traveling Particles */}
            <div className="particle-1 absolute w-3 h-3 bg-burnt-peach rounded-full -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_10px_#EE6C4D] opacity-0 pointer-events-none"></div>
            <div className="particle-2 absolute w-3 h-3 bg-burnt-peach rounded-full -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_10px_#EE6C4D] opacity-0 pointer-events-none"></div>
            <div className="particle-3 absolute w-3 h-3 bg-burnt-peach rounded-full -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_10px_#EE6C4D] opacity-0 pointer-events-none"></div>
            <div className="particle-4 absolute w-3 h-3 bg-burnt-peach rounded-full -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_10px_#EE6C4D] opacity-0 pointer-events-none"></div>

            {/* Node 1: 3g Dosierung + Löffel */}
            <div className="node-1 relative z-10 w-44 p-4 rounded-xl border-2 border-powder-blue bg-light-cyan-alt text-center shadow-lg opacity-0">
              <div className="flex flex-col items-center gap-2">
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center border border-powder-blue p-2">
                  <img src="bilder/loeffel.png" alt="Messlöffel" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="font-condensed font-extrabold uppercase text-jet-black leading-tight text-lg">3g Dosierung</div>
                  <div className="text-[10px] text-dusk-blue mt-0.5 font-sans font-bold uppercase tracking-widest">1 Messlöffel</div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between px-0">
              {/* Node 2: Inulin */}
              <div className="node-2 relative z-10 w-[120px] sm:w-36 p-3 rounded-xl border border-powder-blue bg-white text-center shadow-md opacity-0">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#E8F7F0] flex items-center justify-center text-[#34A853]">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-condensed font-bold uppercase text-jet-black text-sm">Inulin</div>
                    <div className="text-[9px] text-dusk-blue mt-1 uppercase leading-tight font-medium">Ballaststoff &<br/>Textur</div>
                  </div>
                </div>
              </div>
              {/* Node 3: Sucralose */}
              <div className="node-3 relative z-10 w-[120px] sm:w-36 p-3 rounded-xl border border-powder-blue bg-white text-center shadow-md opacity-0">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-light-cyan flex items-center justify-center text-burnt-peach">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-condensed font-bold uppercase text-jet-black text-sm">Sucralose</div>
                    <div className="text-[9px] text-dusk-blue mt-1 uppercase leading-tight font-medium">Maximale<br/>Süßkraft</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Node 4: 50g Zucker-Effekt */}
            <div className="node-4 relative z-10 w-52 p-4 rounded-2xl border-2 border-burnt-peach bg-jet-black text-center shadow-xl opacity-0">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-5 h-5 text-burnt-peach fill-burnt-peach" />
                  <div className="font-condensed font-extrabold uppercase text-white text-2xl tracking-tighter leading-tight">50g Zucker-Effekt</div>
                </div>
                <div className="w-full h-px bg-white/20 mb-1"></div>
                <div className="flex items-center justify-center gap-2 text-light-cyan">
                  <Scale className="w-4 h-4 text-powder-blue" />
                  <div className="text-sm font-sans font-extrabold uppercase tracking-widest">Nur 4,5 kcal</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}