import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { UtensilsCrossed, Frown, TrendingDown, Clock, AlertCircle, XCircle } from 'lucide-react';

export default function ProblemSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.problem-intro', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1,
        scrollTrigger: { trigger: '.problem-intro', start: 'top 85%' }
      });
      
      gsap.from('.problem-card', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15,
        scrollTrigger: { trigger: '.problem-cards-container', start: 'top 85%' }
      });

      gsap.from('.agitation-elem', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1,
        scrollTrigger: { trigger: '.agitation-container', start: 'top 85%' }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const problems = [
    {
      img: "/bilder/haferflocken.jpg",
      title: "Der fade Alltag",
      desc: "Morgens Magerquark, abends Haferflocken. Du isst es, weil es gesund ist, nicht weil du dich darauf freust. Jeder Bissen fühlt sich nach Pflicht an."
    },
    {
      img: "/bilder/kuehlregal.JPG",
      title: "Die Supermarkt-Falle",
      desc: "Du greifst doch zum Fruchtjoghurt oder der fertigen Soße — und holst dir unwissentlich die Zuckerbombe ins Haus, die deinen Fortschritt ruiniert."
    },
    {
      img: "/bilder/kuehlschrank.JPG",
      title: "Der Heißhunger am Abend",
      desc: "Weil dein Körper über den Tag keine echten Geschmackserlebnisse bekommen hat, rebelliert er am Abend. Die Diät kippt nicht am Wissen, sondern am Geschmack."
    }
  ];

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 bg-light-cyan">
      <div className="max-w-6xl mx-auto">
        
        {/* THE MIRROR */}
        <div className="text-center max-w-3xl mx-auto mb-16 problem-intro">
          <span className="label-text-peach mb-4 block">KOMMT DIR DAS BEKANNT VOR?</span>
          <h2 className="section-headline mb-6">
            Deine Diät scheitert nicht an deiner Disziplin. Sie scheitert an fehlendem Genuss.
          </h2>
          <p className="body-text">
            Du weißt genau, was du essen solltest. Du hast die Rezepte. Du kaufst die richtigen Lebensmittel. Aber die Realität in deiner Küche sieht anders aus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-24 problem-cards-container">
          {problems.map((prob, idx) => (
            <div key={idx} className="card-border p-6 md:p-8 bg-white problem-card group">
              <div className="w-full aspect-[5/1] mb-6 overflow-hidden rounded-xl bg-light-cyan">
                <img 
                  src={prob.img} 
                  alt={prob.title} 
                  className="w-full h-full object-cover opacity-90" 
                />
              </div>
              <h3 className="font-condensed font-bold text-jet-black text-2xl uppercase tracking-tighter mb-4">
                {prob.title}
              </h3>
              <p className="body-text text-[14px]">
                {prob.desc}
              </p>
            </div>
          ))}
        </div>

        {/* AGITATION */}
        <div className="agitation-container max-w-4xl mx-auto bg-white card-border p-8 md:p-12 relative overflow-hidden">
          {/* Decorative lines */}
          <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-powder-blue/30 -mt-16 -mr-16 rounded-full"></div>
          
          <div className="text-center mb-10 agitation-elem">
            <h3 className="font-condensed font-extrabold uppercase tracking-tighter text-jet-black text-3xl md:text-4xl mb-4">
              Was passiert, wenn sich nichts ändert?
            </h3>
            <p className="italic-subheadline lowercase !text-2xl">
              — der ewige kreislauf des aufgebens.
            </p>
          </div>

          <div className="space-y-6 agitation-elem">
            {[
              "Du isst weiterhin gesunde Lebensmittel, die dir keine Freude bereiten.",
              "Du brichst deine Ernährungsziele ab, weil Verzicht auf Dauer nicht funktioniert.",
              "Du gibst Geld für überteuerte \"Fitness-Snacks\" aus, die voller künstlicher Zusätze stecken."
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4 p-4 border border-powder-blue/50 rounded-xl bg-light-cyan/30">
                <AlertCircle className="w-6 h-6 text-burnt-peach shrink-0 mt-0.5" />
                <p className="body-text font-semibold text-jet-black">
                  {text}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}