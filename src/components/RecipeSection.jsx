import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChefHat, ArrowUpRight } from 'lucide-react';

export default function RecipeSection() {
  const containerRef = useRef(null);
  const [isBookOpen, setIsBookOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.recipe-header', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1,
        scrollTrigger: { trigger: '.recipe-container', start: 'top 85%' }
      });
      
      gsap.from('.recipe-card', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15,
        scrollTrigger: { trigger: '.recipe-grid', start: 'top 85%' }
      });
      
      gsap.from('.recipe-footer', {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.recipe-footer', start: 'top 85%' }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const scrollToCheckout = () => {
    const el = document.getElementById('checkout');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const recipes = [
    {
      title: "Monte Bowl",
      desc: "Wie der bekannte Dessert-Klassiker – nur proteinreich und ohne unnötigen Zucker.",
      img: "bilder/monte-bowl.png",
      flavor: "Schoko Kiddy",
      macros: { kcal: "425", prot: "44,5 g", carbs: "40 g", fat: "7,7 g" }
    },
    {
      title: "XXL Milchschnitte",
      desc: "Fluffig, cremig and proteinreich – wie das Original, nur ohne Zucker.",
      img: "bilder/milchschnitte.png",
      flavor: "Vanille",
      macros: { kcal: "444", prot: "34,1 g", carbs: "33,9 g", fat: "18 g" }
    },
    {
      title: "Zimtschnecken Pancakes",
      desc: "Zimtschnecken und Pancakes in einem – klingt nach Cheatday, ist aber komplett clean!",
      img: "bilder/zimtschnecken_pancakes.png",
      flavor: "Tiramisu",
      macros: { kcal: "62", prot: "3,5 g", carbs: "6,4 g", fat: "2,2 g" }
    },
    {
      title: "Erdbeer Protein Bowl",
      desc: "Mehr als nur ein hübsches Frühstück: Eiweiß ist der Baustoff für Muskeln – egal ob im Aufbau oder in der Diät.",
      img: "bilder/erdbeer-protein-bowl.png",
      flavor: "Vanille",
      macros: { kcal: "325", prot: "38 g", carbs: "29 g", fat: "3 g" }
    }
  ];

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 bg-light-cyan-alt relative overflow-hidden recipe-container">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16 recipe-header">
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-2 mb-6 text-burnt-peach">
              <ChefHat className="w-6 h-6" />
              <span className="eyebrow !text-burnt-peach !mb-0">Deine Küchen-Revolution</span>
            </div>
            <h2 className="section-headline mb-6">
              Viel mehr als nur Quark-Veredler. Dein Ticket für zuckerfreies Backen.
            </h2>
            <p className="body-text text-lg">
              Die Geschmacksbombe ist absolut hitzestabil. Verwandle Kuchen, Waffeln, Bowls und Pancakes in tägliche Highlights – ganz ohne Reue, komplett ohne Zucker.
            </p>
          </div>
          <div className="w-full md:w-1/2 relative">
            {/* Glow Effect behind book */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-burnt-peach/10 blur-[80px] rounded-full pointer-events-none"></div>

            <div 
              className="relative flex flex-col w-full max-w-md mx-auto md:ml-auto md:mr-0 overflow-hidden rounded-[20px] border-2 border-powder-blue shadow-2xl bg-light-cyan cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => setIsBookOpen(!isBookOpen)}
            >
              <div className="w-full p-8 flex items-center justify-center min-h-[250px] sm:min-h-[300px] relative">
                <img 
                  src={isBookOpen ? "bilder/aufgeklappt.png" : "bilder/rezeptbuch.png"}
                  alt="Geschmacksbombe Rezeptbuch"
                  className={`w-full h-full object-contain drop-shadow-2xl transition-all duration-500 ${isBookOpen ? 'max-h-[220px] sm:max-h-[280px]' : 'max-h-[200px] sm:max-h-[250px]'}`}
                  loading="lazy"
                  decoding="async"
                />
                {!isBookOpen && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 hover:opacity-100 transition-opacity">
                    <span className="bg-white/90 px-4 py-2 rounded-full font-sans font-bold text-xs uppercase tracking-widest text-jet-black shadow-lg">Klick zum Reinschauen</span>
                  </div>
                )}
              </div>
              <div className="text-jet-black bg-white p-6 border-t border-powder-blue/30">
                <div className="inline-block bg-[#34A853] text-white text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-1 rounded mb-2 shadow-sm">
                  Kostenlos
                </div>
                <h4 className="font-condensed font-extrabold uppercase text-xl md:text-2xl tracking-tighter">
                  Das Rezeptbuch (PDF)
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* RECIPE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 recipe-grid">
          {recipes.map((recipe, idx) => (
            <div key={idx} className="card-border bg-white flex flex-col recipe-card overflow-hidden group">
              
              {/* Image Header */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-light-cyan">
                <img
                  src={recipe.img}
                  alt={recipe.title}
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none"></div>
                <div className="absolute top-4 left-4">
                  <div className="bg-white/95 backdrop-blur-sm text-jet-black text-[10px] font-sans font-bold uppercase tracking-widest px-3 py-1.5 rounded-md border border-powder-blue shadow-sm flex items-center gap-1.5">
                    <ChefHat className="w-3 h-3 text-burnt-peach" />
                    Sorte: {recipe.flavor}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col grow">
                <h3 className="font-condensed font-extrabold uppercase text-3xl tracking-tighter text-jet-black mb-3">
                  {recipe.title}
                </h3>
                <p className="body-text mb-6 grow">
                  {recipe.desc}
                </p>

                {/* Macros */}
                <div className="bg-light-cyan rounded-xl p-4 flex items-center justify-between border border-powder-blue/50">
                  <div className="flex flex-col text-center">
                    <span className="font-condensed font-extrabold text-xl text-jet-black">{recipe.macros.kcal}</span>
                    <span className="font-sans text-[9px] uppercase font-bold tracking-widest text-dusk-blue">Kcal</span>
                  </div>
                  <div className="w-px h-8 bg-powder-blue/50"></div>
                  <div className="flex flex-col text-center">
                    <span className="font-condensed font-extrabold text-xl text-jet-black">{recipe.macros.prot}</span>
                    <span className="font-sans text-[9px] uppercase font-bold tracking-widest text-dusk-blue">Protein</span>
                  </div>
                  <div className="w-px h-8 bg-powder-blue/50"></div>
                  <div className="flex flex-col text-center">
                    <span className="font-condensed font-extrabold text-xl text-jet-black">{recipe.macros.carbs}</span>
                    <span className="font-sans text-[9px] uppercase font-bold tracking-widest text-dusk-blue">Carbs</span>
                  </div>
                  <div className="w-px h-8 bg-powder-blue/50"></div>
                  <div className="flex flex-col text-center">
                    <span className="font-condensed font-extrabold text-xl text-jet-black">{recipe.macros.fat}</span>
                    <span className="font-sans text-[9px] uppercase font-bold tracking-widest text-dusk-blue">Fett</span>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="text-center recipe-footer bg-jet-black text-white rounded-[24px] p-8 md:p-12 relative overflow-hidden border border-jet-black">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="font-condensed font-extrabold uppercase text-3xl md:text-4xl tracking-tighter mb-4 text-white">
              ...und 43 weitere Rezepte erwarten dich.
            </h3>
            <p className="body-text !text-white/80 mb-8">
              Kuchen, Muffins, Shakes und Bowls – alle berechnet, alle ohne zugesetzten Zucker. Das Rezeptbuch ist der ultimative Guide für deine Geschmacksbombe.
            </p>
            
            <button onClick={scrollToCheckout} className="btn-primary !bg-white !text-jet-black hover:!bg-burnt-peach hover:!text-white border-2 border-transparent">
              Jetzt 4er Set sichern & Buch freischalten
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}