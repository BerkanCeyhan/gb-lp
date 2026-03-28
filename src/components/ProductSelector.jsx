import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShoppingBag, Check, Gift, Plus, X, Heart, Truck, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { productData } from '../data';

export default function ProductSelector() {
  const containerRef = useRef(null);
  
  // Default to Probier-Set 9 Sorten (index 1)
  const [selectedPkg, setSelectedPkg] = useState(productData.packages[1]);
  const [selectedFlavors, setSelectedFlavors] = useState([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.prod-elem', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.1,
        scrollTrigger: { trigger: '.prod-container', start: 'top 85%' }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handlePackageChange = (pkg) => {
    const wasRezeptbuch = selectedPkg.qty >= 4 && !selectedPkg.isProbeset;
    const wasShaker = selectedPkg.qty >= 6 && !selectedPkg.isProbeset;
    
    const willBeRezeptbuch = pkg.qty >= 4 && !pkg.isProbeset;
    const willBeShaker = pkg.qty >= 6 && !pkg.isProbeset;

    if ((!wasRezeptbuch && willBeRezeptbuch) || (!wasShaker && willBeShaker)) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EE6C4D', '#D4F5F7', '#293241']
      });
    }

    setSelectedPkg(pkg);
    if (pkg.isProbeset) {
      setSelectedFlavors([]);
    } else {
      const newFlavors = Array(pkg.qty).fill(null);
      for (let i = 0; i < Math.min(pkg.qty, selectedFlavors.length); i++) {
        newFlavors[i] = selectedFlavors[i];
      }
      setSelectedFlavors(newFlavors);
    }
  };

  const handleAddFlavor = (flavor) => {
    const emptyIndex = selectedFlavors.findIndex(f => f === null);
    if (emptyIndex !== -1) {
      const newFlavors = [...selectedFlavors];
      newFlavors[emptyIndex] = flavor;
      setSelectedFlavors(newFlavors);
    }
  };

  const handleRemoveFlavor = (index) => {
    const newFlavors = [...selectedFlavors];
    newFlavors[index] = null;
    setSelectedFlavors(newFlavors);
  };

  const buildCheckoutUrl = () => {
    if (selectedPkg.isProbeset) {
      return `https://${productData.shop}/cart/${selectedPkg.variantId}:1`;
    }

    const flavorCounts = {};
    for (let i = 0; i < selectedPkg.qty; i++) {
      const fId = selectedFlavors[i].id;
      flavorCounts[fId] = (flavorCounts[fId] || 0) + 1;
    }

    const items = Object.entries(flavorCounts).map(([id, qty]) => `${id}:${qty}`);

    if (selectedPkg.qty >= 4) {
      items.push(`${productData.bonusIds.rezeptbuch}:1`);
    }
    if (selectedPkg.qty >= 6) {
      items.push(`${productData.bonusIds.shaker}:1`);
    }

    return `https://${productData.shop}/cart/${items.join(',')}`;
  };

  const handleCheckout = () => {
    window.location.href = buildCheckoutUrl();
  };

  const hasRezeptbuch = selectedPkg.qty >= 4 && !selectedPkg.isProbeset;
  const hasShaker = selectedPkg.qty >= 6 && !selectedPkg.isProbeset;

  const missingCount = selectedPkg.isProbeset ? 0 : selectedFlavors.filter(f => f === null).length;
  const isReady = missingCount === 0;

  const filledFlavors = selectedFlavors.filter(f => f !== null);

  return (
    <section id="checkout" ref={containerRef} className="py-24 md:py-32 px-6 bg-white relative">
      <div className="max-w-6xl mx-auto prod-container flex flex-col lg:flex-row gap-16 items-start">
        
        {/* GALLERY */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-24 prod-elem">
          <div className="card-border p-5 md:p-8 bg-white relative overflow-visible flex flex-col items-center justify-center min-h-[400px]">
            {!selectedPkg.isProbeset && (
              <div className="absolute top-3 left-3 md:top-6 md:left-6 text-dusk-blue text-[9px] md:text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-1 md:px-3 md:py-1.5 rounded-md border border-powder-blue shadow-sm z-30 bg-white/80 backdrop-blur-sm">
                Deine Auswahl
              </div>
            )}
            
            {selectedPkg.badge && (
              <div className="absolute top-3 right-3 md:top-6 md:right-6 bg-burnt-peach text-white font-condensed font-extrabold uppercase tracking-widest text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg z-30">
                {selectedPkg.badge}
              </div>
            )}

            <div className="relative my-auto py-12">
              {selectedPkg.isProbeset ? (
                <div className="flex justify-center items-center">
                  <img src={selectedPkg.image} alt="Probeset" className="w-full max-w-sm object-contain drop-shadow-2xl" />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:items-center sm:gap-4 justify-items-center items-center">
                  {filledFlavors.length === 0 ? (
                    <div className="col-span-3 flex justify-center">
                      <img src={productData.productImages[0]} alt="Dose" className="w-40 md:w-56 object-contain drop-shadow-xl opacity-50 grayscale transition-all duration-500" />
                    </div>
                  ) : (
                    Array.from({ length: Math.min(filledFlavors.length, 6) }).map((_, i) => (
                      <img 
                        key={i} 
                        src={filledFlavors[i].image} 
                        alt={filledFlavors[i].name} 
                        className={`w-20 sm:w-32 md:w-48 object-contain drop-shadow-xl transition-all duration-500 ${i > 0 && 'sm:-ml-16 md:-ml-24'}`} 
                        style={{ zIndex: 10 - i }} 
                      />
                    ))
                  )}
                  {selectedPkg.qty > 6 && filledFlavors.length > 6 && (
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-jet-black text-white font-condensed font-extrabold flex items-center justify-center text-lg sm:text-xl shadow-lg z-20">
                      +{selectedPkg.qty - 6}
                    </div>
                  )}
                </div>
              )}
            </div>

            {(hasRezeptbuch || hasShaker) && (
              <div className="w-full mt-6 bg-white/95 backdrop-blur-md border border-powder-blue rounded-xl p-4 flex items-center justify-center gap-4 shadow-sm z-30">
                {hasRezeptbuch && (
                  <div className="flex flex-col items-center gap-1">
                    <img src={productData.bonusImages.rezeptbuch} alt="Rezeptbuch" className="w-12 h-12 object-cover rounded shadow-sm" />
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-jet-black">Rezeptbuch</span>
                  </div>
                )}
                {hasRezeptbuch && hasShaker && <Plus className="w-4 h-4 text-dusk-blue" />}
                {hasShaker && (
                  <div className="flex flex-col items-center gap-1">
                    <img src={productData.bonusImages.shaker} alt="Shaker" className="w-12 h-12 object-contain drop-shadow-sm" />
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-jet-black">Shaker</span>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* SELECTOR */}
        <div className="w-full lg:w-1/2 prod-elem">
          <span className="eyebrow block mb-4">Wähle dein Paket</span>
          <h2 className="section-headline mb-4">
            {productData.productName}
          </h2>
          
          <div className="flex items-baseline gap-4 mb-8">
            <span className="font-condensed font-extrabold text-4xl text-jet-black">
              {selectedPkg.price}€
            </span>
            {selectedPkg.compareAtPrice && (
              <span className="font-sans font-medium text-lg text-powder-blue line-through">
                {selectedPkg.compareAtPrice}€
              </span>
            )}
            {!selectedPkg.isProbeset && (
              <span className="font-sans text-sm font-semibold uppercase tracking-widest text-burnt-peach ml-auto">
                {selectedPkg.qty * 66}+ Portionen
              </span>
            )}
          </div>

          {/* BUNDLES */}
          <div className="mb-4">
            <div className="label-text mb-4">Schritt 1: Paket wählen</div>
            <div className="space-y-3">
              {productData.packages.map((pkg) => {
                const isSelected = selectedPkg.id === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => handlePackageChange(pkg)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
                      isSelected 
                      ? 'border-burnt-peach bg-light-cyan-alt shadow-sm' 
                      : 'border-powder-blue/50 bg-white hover:border-powder-blue'
                    }`}
                  >
                    {pkg.id === 'bundle-6' && !isSelected && (
                      <div className="absolute top-0 right-0 bg-powder-blue text-white text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-1 rounded-bl-lg">
                        Beliebteste Wahl
                      </div>
                    )}
                    <div className="flex items-center gap-3 z-10">
                      <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                        isSelected ? 'border-burnt-peach bg-burnt-peach' : 'border-powder-blue bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="w-12 h-12 shrink-0 bg-white rounded border border-powder-blue/30 flex items-center justify-center overflow-hidden">
                        <img src={pkg.image} alt={pkg.label} className={`w-full h-full object-contain ${!pkg.isProbeset && 'scale-125'}`} />
                      </div>
                      <div>
                        <div className="font-condensed font-bold uppercase text-lg text-jet-black tracking-tighter leading-none mb-1 flex flex-wrap items-center gap-2">
                          {pkg.label}
                          {pkg.id === 'bundle-6' && isSelected && (
                            <span className="bg-burnt-peach text-white text-[10px] font-sans px-2 py-0.5 rounded-full tracking-widest leading-none">
                              Beliebteste Wahl
                            </span>
                          )}
                        </div>
                        <div className="font-sans text-[11px] font-medium mt-1 flex flex-wrap gap-2">
                          {pkg.perks.map((perk, idx) => {
                            const isBonus = perk.includes('GRATIS');
                            return (
                              <span key={idx} className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${isBonus ? 'bg-[#E8F7F0] text-[#1B5E20]' : 'text-dusk-blue'}`}>
                                {isBonus ? <Gift className="w-3 h-3" /> : <Check className="w-3 h-3 text-powder-blue" />}
                                {perk.replace('+ GRATIS ', '')}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="font-sans font-bold text-jet-black whitespace-nowrap ml-4 z-10">
                      {pkg.price}€
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BONUS UNLOCK BAR (Directly under packages) */}
          {!selectedPkg.isProbeset && (
            <div className={`mb-8 p-4 rounded-xl border flex flex-col sm:flex-row gap-4 md:gap-6 transition-all duration-500 ${hasRezeptbuch || hasShaker ? 'bg-[#E8F7F0] border-[#A8DAB5]' : 'bg-light-cyan/50 border-powder-blue/50'}`}>
              
              <div className={`flex flex-1 items-center gap-3 transition-all duration-300 ${hasRezeptbuch ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                <div className="relative w-12 h-12 shrink-0 rounded-md border border-powder-blue bg-white shadow-sm flex items-center justify-center">
                  <img src={productData.bonusImages.rezeptbuch} alt="Rezeptbuch" className="w-full h-full object-cover rounded-md" />
                  {hasRezeptbuch && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#34A853] rounded-full text-white flex items-center justify-center shadow-md z-10">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <span className={`font-sans font-bold text-sm leading-tight ${hasRezeptbuch ? 'text-[#1B5E20]' : 'text-jet-black'}`}>
                    {hasRezeptbuch ? 'Rezeptbuch freigeschaltet!' : 'Gratis Rezeptbuch'}
                  </span>
                  {!hasRezeptbuch && <span className="font-sans text-[10px] text-dusk-blue font-semibold uppercase tracking-widest mt-0.5">Ab 4er Set</span>}
                </div>
              </div>

              <div className="w-px bg-powder-blue/30 hidden sm:block"></div>

              <div className={`flex flex-1 items-center gap-3 transition-all duration-300 ${hasShaker ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                <div className="relative w-12 h-12 shrink-0 rounded-md border border-powder-blue bg-white shadow-sm p-1 flex items-center justify-center">
                  <img src={productData.bonusImages.shaker} alt="Shaker" className="w-full h-full object-contain rounded-md" />
                  {hasShaker && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#34A853] rounded-full text-white flex items-center justify-center shadow-md z-10">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <span className={`font-sans font-bold text-sm leading-tight ${hasShaker ? 'text-[#1B5E20]' : 'text-jet-black'}`}>
                    {hasShaker ? 'Shaker freigeschaltet!' : 'Gratis Shaker'}
                  </span>
                  {!hasShaker && <span className="font-sans text-[10px] text-dusk-blue font-semibold uppercase tracking-widest mt-0.5">Ab 6er Set</span>}
                </div>
              </div>

            </div>
          )}

          {/* FLAVOR SELECTION (Only show if not probeset) */}
          {!selectedPkg.isProbeset && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="label-text">Schritt 2: Deine Auswahl</div>
                {missingCount > 0 ? (
                  <div className="text-xs font-sans font-semibold text-burnt-peach bg-burnt-peach/10 px-2 py-1 rounded-md">
                    Noch {missingCount} {missingCount === 1 ? 'Sorte' : 'Sorten'} wählen
                  </div>
                ) : (
                  <div className="text-xs font-sans font-semibold text-[#34A853] bg-[#E8F7F0] px-2 py-1 rounded-md flex items-center gap-1">
                    <Check className="w-3 h-3" /> Komplett
                  </div>
                )}
              </div>
              
              {/* Basket Slots */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
                {selectedFlavors.map((f, i) => (
                  <div key={i} className="relative aspect-square">
                    {f ? (
                      <div className="w-full h-full border border-powder-blue rounded-xl bg-white p-2 flex flex-col items-center justify-center relative group shadow-sm transition-all duration-300">
                        <img src={f.image} alt={f.name} className="w-10 h-10 object-contain mix-blend-multiply" />
                        <span className="text-[9px] font-sans font-bold text-center mt-1 text-jet-black leading-tight line-clamp-2 w-full">{f.name.substring(f.name.indexOf(' ') + 1)}</span>
                        
                        <button 
                          onClick={() => handleRemoveFlavor(i)} 
                          className="absolute inset-0 bg-jet-black/80 rounded-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                          aria-label="Entfernen"
                        >
                          <X className="w-6 h-6 text-burnt-peach" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-full border-2 border-dashed border-powder-blue/60 rounded-xl bg-light-cyan/20 flex flex-col items-center justify-center text-powder-blue transition-colors duration-300">
                        <Plus className="w-5 h-5 mb-0.5 opacity-50" />
                        <span className="text-[9px] font-sans font-bold uppercase tracking-widest opacity-50">Dose {i + 1}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Flavor Options Grid */}
              <div className={`transition-opacity duration-300 ${missingCount === 0 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <div className="label-text mb-3">Verfügbare Sorten</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {productData.flavors.map((flavor) => {
                    const emoji = flavor.name.split(' ')[0];
                    const name = flavor.name.substring(flavor.name.indexOf(' ') + 1);
                    return (
                      <button
                        key={flavor.id}
                        onClick={() => handleAddFlavor(flavor)}
                        disabled={missingCount === 0}
                        className="p-3 border border-powder-blue rounded-xl bg-white hover:border-burnt-peach hover:shadow-sm transition-all flex flex-col items-center justify-center text-center gap-1.5 h-full group"
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{emoji}</span>
                        <span className="text-[11px] font-sans font-semibold text-dusk-blue leading-tight group-hover:text-jet-black transition-colors">{name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* CTA & TRUST */}
          <div className="mb-6">
            {isReady ? (
              <button onClick={handleCheckout} className="btn-primary w-full py-5 text-lg flex flex-col items-center justify-center shadow-lg">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  In den Warenkorb — {selectedPkg.price}€
                </div>
                <div className="text-[10px] opacity-80 lowercase tracking-widest mt-1">sicherer checkout</div>
              </button>
            ) : (
              <button disabled className="w-full py-5 text-lg rounded-full bg-light-cyan-alt border-2 border-powder-blue text-dusk-blue font-sans font-semibold uppercase tracking-[0.09em] flex flex-col items-center justify-center cursor-not-allowed transition-all duration-300">
                <span className="text-burnt-peach">Wähle noch {missingCount} {missingCount === 1 ? 'Sorte' : 'Sorten'}</span>
                <span className="text-[10px] font-sans tracking-widest text-dusk-blue/50 mt-1 lowercase">um den einkauf abzuschließen</span>
              </button>
            )}

            {/* PAYMENT ICONS */}
            <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" className="opacity-80 hover:opacity-100 transition-opacity"><title>PayPal</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"></path><path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"></path><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"></path></svg>
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" className="opacity-80 hover:opacity-100 transition-opacity"><title>Klarna</title><rect width="38" height="24" rx="2" fill="#FFA8CD"></rect><rect x=".5" y=".5" width="37" height="23" rx="1.5" stroke="#000" stroke-opacity=".07"></rect><path d="M30.62 14.755c-.662 0-1.179-.554-1.179-1.226 0-.673.517-1.226 1.18-1.226.663 0 1.18.553 1.18 1.226 0 .672-.517 1.226-1.18 1.226zm-.33 1.295c.565 0 1.286-.217 1.686-1.068l.04.02c-.176.465-.176.742-.176.81v.11h1.423v-4.786H31.84v.109c0 .069 0 .346.175.81l-.039.02c-.4-.85-1.121-1.068-1.687-1.068-1.355 0-2.31 1.088-2.31 2.522 0 1.433.955 2.521 2.31 2.521zm-4.788-5.043c-.643 0-1.15.228-1.56 1.068l-.039-.02c.175-.464.175-.741.175-.81v-.11h-1.423v4.787h1.462V13.4c0-.662.38-1.078.995-1.078.614 0 .917.356.917 1.068v2.532h1.462v-3.046c0-1.088-.838-1.869-1.989-1.869zm-4.963 1.068l-.039-.02c.176-.464.176-.741.176-.81v-.11h-1.424v4.787h1.463l.01-2.304c0-.673.35-1.078.926-1.078.156 0 .282.02.429.06v-1.464c-.644-.139-1.22.109-1.54.94zm-4.65 2.68c-.664 0-1.18-.554-1.18-1.226 0-.673.516-1.226 1.18-1.226.662 0 1.179.553 1.179 1.226 0 .672-.517 1.226-1.18 1.226zm-.332 1.295c.565 0 1.287-.217 1.687-1.068l.038.02c-.175.465-.175.742-.175.81v.11h1.424v-4.786h-1.424v.109c0 .069 0 .346.175.81l-.038.02c-.4-.85-1.122-1.068-1.687-1.068-1.356 0-2.311 1.088-2.311 2.522 0 1.433.955 2.521 2.31 2.521zm-4.349-.128h1.463V9h-1.463v6.922zM10.136 9H8.644c0 1.236-.751 2.343-1.892 3.134l-.448.317V9h-1.55v6.922h1.55V12.49l2.564 3.43h1.892L8.293 12.64c1.121-.82 1.852-2.096 1.843-3.639z" fill="#0B051D"></path></svg>
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" className="opacity-80 hover:opacity-100 transition-opacity"><title>Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"></path></svg>
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" className="opacity-80 hover:opacity-100 transition-opacity"><title>Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><circle fill="#EB001B" cx="15" cy="12" r="7"></circle><circle fill="#F79E1B" cx="23" cy="12" r="7"></circle><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path></svg>
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" className="opacity-80 hover:opacity-100 transition-opacity"><title>American Express</title><path fill="#000" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z" opacity=".07"></path><path fill="#006FCF" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z"></path><path fill="#FFF" d="M22.012 19.936v-8.421L37 11.528v2.326l-1.732 1.852L37 17.573v2.375h-2.766l-1.47-1.622-1.46 1.628-9.292-.02Z"></path><path fill="#006FCF" d="M23.013 19.012v-6.57h5.572v1.513h-3.768v1.028h3.678v1.488h-3.678v1.01h3.768v1.531h-5.572Z"></path><path fill="#006FCF" d="m28.557 19.012 3.083-3.289-3.083-3.282h2.386l1.884 2.083 1.89-2.082H37v.051l-3.017 3.23L37 18.92v.093h-2.307l-1.917-2.103-1.898 2.104h-2.321Z"></path><path fill="#FFF" d="M22.71 4.04h3.614l1.269 2.881V4.04h4.46l.77 2.159.771-2.159H37v8.421H19l3.71-8.421Z"></path><path fill="#006FCF" d="m23.395 4.955-2.916 6.566h2l.55-1.315h2.98l.55 1.315h2.05l-2.904-6.566h-2.31Zm.25 3.777.875-2.09.873 2.09h-1.748Z"></path><path fill="#006FCF" d="M28.581 11.52V4.953l2.811.01L32.84 9l1.456-4.046H37v6.565l-1.74.016v-4.51l-1.644 4.494h-1.59L30.35 7.01v4.51h-1.768Z"></path></svg>
              <svg width="38" height="24" viewBox="0 0 165.521 105.965" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" className="opacity-80 hover:opacity-100 transition-opacity"><title>Apple Pay</title><path fill="#000" d="M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.932 9.932 0 0 0-4.35 4.35 10.463 10.463 0 0 0-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 0 0-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.275 3.11a10.46 10.46 0 0 0 .974 2.96 9.897 9.897 0 0 0 1.83 2.52 9.874 9.874 0 0 0 2.52 1.83c.947.483 1.917.79 2.96.977 1.025.183 2.073.245 3.112.273.477.011.953.017 1.43.02.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.952-.009 1.431-.02 1.037-.028 2.085-.09 3.113-.273a10.478 10.478 0 0 0 2.958-.977 9.955 9.955 0 0 0 4.35-4.35c.483-.947.789-1.917.974-2.96.186-1.026.246-2.074.274-3.11.013-.477.02-.954.022-1.43.004-.567.004-1.132.004-1.699V14.824c0-.567 0-1.133-.004-1.699a63.067 63.067 0 0 0-.022-1.429c-.028-1.038-.088-2.085-.274-3.112a10.4 10.4 0 0 0-.974-2.96 9.94 9.94 0 0 0-4.35-4.35A10.52 10.52 0 0 0 156.939.3c-1.028-.185-2.076-.246-3.113-.274a71.417 71.417 0 0 0-1.431-.022C151.83 0 151.263 0 150.698 0z"></path><path fill="#FFF" d="M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.065 2.583.22.75.135 1.38.34 1.984.648a6.392 6.392 0 0 1 2.804 2.807c.306.6.51 1.226.645 1.983.154.854.197 1.783.218 2.58.013.45.019.9.02 1.36.005.557.005 1.113.005 1.671v76.318c0 .558 0 1.114-.004 1.682-.002.45-.008.9-.02 1.35-.022.796-.065 1.725-.221 2.589a6.855 6.855 0 0 1-.645 1.975 6.397 6.397 0 0 1-2.808 2.807c-.6.306-1.228.511-1.971.645-.881.157-1.847.2-2.574.22-.457.01-.912.017-1.379.019-.555.004-1.113.004-1.669.004H14.801c-.55 0-1.1 0-1.66-.004a74.993 74.993 0 0 1-1.35-.018c-.744-.02-1.71-.064-2.584-.22a6.938 6.938 0 0 1-1.986-.65 6.337 6.337 0 0 1-1.622-1.18 6.355 6.355 0 0 1-1.178-1.623 6.935 6.935 0 0 1-.646-1.985c-.156-.863-.2-1.788-.22-2.578a66.088 66.088 0 0 1-.02-1.355l-.003-1.327V14.474l.002-1.325a66.7 66.7 0 0 1 .02-1.357c.022-.792.065-1.717.222-2.587a6.924 6.924 0 0 1 .646-1.981c.304-.598.7-1.144 1.18-1.623a6.386 6.386 0 0 1 1.624-1.18 6.96 6.96 0 0 1 1.98-.646c.865-.155 1.792-.198 2.586-.22.452-.012.905-.017 1.354-.02l1.677-.003h135.875"></path><g><g><path fill="#000" d="M43.508 35.77c1.404-1.755 2.356-4.112 2.105-6.52-2.054.102-4.56 1.355-6.012 3.112-1.303 1.504-2.456 3.959-2.156 6.266 2.306.2 4.61-1.152 6.063-2.858"></path><path fill="#000" d="M45.587 39.079c-3.35-.2-6.196 1.9-7.795 1.9-1.6 0-4.049-1.8-6.698-1.751-3.447.05-6.645 2-8.395 5.1-3.598 6.2-.95 15.4 2.55 20.45 1.699 2.5 3.747 5.25 6.445 5.151 2.55-.1 3.549-1.65 6.647-1.65 3.097 0 3.997 1.65 6.696 1.6 2.798-.05 4.548-2.5 6.247-5 1.95-2.85 2.747-5.6 2.797-5.75-.05-.05-5.396-2.101-5.446-8.251-.05-5.15 4.198-7.6 4.398-7.751-2.399-3.548-6.147-3.948-7.447-4.048"></path></g><g><path fill="#000" d="M78.973 32.11c7.278 0 12.347 5.017 12.347 12.321 0 7.33-5.173 12.373-12.529 12.373h-8.058V69.62h-5.822V32.11h14.062zm-8.24 19.807h6.68c5.07 0 7.954-2.729 7.954-7.46 0-4.73-2.885-7.434-7.928-7.434h-6.706v14.894z"></path><path fill="#000" d="M92.764 61.847c0-4.809 3.665-7.564 10.423-7.98l7.252-.442v-2.08c0-3.04-2.001-4.704-5.562-4.704-2.938 0-5.07 1.507-5.51 3.82h-5.252c.157-4.86 4.731-8.395 10.918-8.395 6.654 0 10.995 3.483 10.995 8.89v18.663h-5.38v-4.497h-.13c-1.534 2.937-4.914 4.782-8.579 4.782-5.406 0-9.175-3.222-9.175-8.057zm17.675-2.417v-2.106l-6.472.416c-3.64.234-5.536 1.585-5.536 3.95 0 2.288 1.975 3.77 5.068 3.77 3.95 0 6.94-2.522 6.94-6.03z"></path><path fill="#000" d="M120.975 79.652v-4.496c.364.051 1.247.103 1.715.103 2.573 0 4.029-1.09 4.913-3.899l.52-1.663-9.852-27.293h6.082l6.863 22.146h.13l6.862-22.146h5.927l-10.216 28.67c-2.34 6.577-5.017 8.735-10.683 8.735-.442 0-1.872-.052-2.261-.157z"></path></g></g></svg>
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" className="opacity-80 hover:opacity-100 transition-opacity"><title>SOFORT</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z" fill="#000"></path><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z" fill="#fff"></path><path d="M33.555 20H3L5.322 5H36l-2.445 15Z" fill="#393A41"></path><path d="M13.116 10c-1.403 0-2.47 1.243-2.47 2.725 0 1.34.875 2.274 2.066 2.274 1.403 0 2.462-1.278 2.462-2.76.008-1.349-.867-2.239-2.058-2.239Zm-.315 3.738c-.538 0-.912-.423-.912-1.076 0-.723.463-1.41 1.132-1.41.536 0 .911.441.911 1.094.008.731-.462 1.392-1.132 1.392ZM21.56 10c-1.402 0-2.461 1.243-2.461 2.725 0 1.34.875 2.274 2.066 2.274 1.403 0 2.463-1.278 2.463-2.76C23.636 10.89 22.76 10 21.562 10Zm-.307 3.738c-.537 0-.912-.423-.912-1.076 0-.723.463-1.41 1.133-1.41.535 0 .911.441.911 1.094 0 .731-.463 1.392-1.133 1.392Zm6.506-2.16c0-.9-.581-1.472-1.64-1.472h-1.485l-.654 4.787h1.25l.206-1.508h.059l.66 1.508h1.434l-.918-1.676c.684-.282 1.087-.89 1.087-1.638Zm-2 .795h-.183l.139-1.007h.169c.39 0 .595.142.595.45 0 .363-.293.557-.72.557Zm-16.547-.354c-.477-.292-.581-.362-.581-.521 0-.193.19-.29.448-.29.302 0 .758.043 1.206.554.108-.4.287-.777.529-1.11-.63-.431-1.22-.652-1.756-.652-1.066 0-1.683.687-1.683 1.516 0 .715.447 1.085.977 1.412.478.29.595.387.595.564 0 .194-.198.3-.463.3-.456 0-.986-.344-1.301-.697L7 14.426c.417.378.954.582 1.507.574 1.103 0 1.699-.671 1.699-1.527 0-.705-.382-1.084-.993-1.454Zm9.263.184h-1.47l.117-.837h1.572c.2-.491.513-.923.912-1.26h-2.573c-.573 0-1.058.467-1.14 1.102l-.499 3.694h1.25l.206-1.508h1.485l.11-.82c.007-.132.015-.247.03-.37Zm9.312-2.096c.338.308.544.74.588 1.26h1.044l-.477 3.526h1.249l.477-3.527h1.162l.169-1.26h-4.212Z" fill="#EDEDED"></path></svg>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex sm:flex-col items-center justify-start sm:justify-center text-left sm:text-center gap-3 sm:gap-2 p-3 sm:p-4 rounded-xl bg-[#E8F7F0]/50 border border-[#34A853]/20">
              <div className="w-10 h-10 rounded-full bg-[#34A853]/10 flex items-center justify-center text-[#34A853] shrink-0">
                <Heart className="w-5 h-5 fill-[#34A853]/20" />
              </div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-jet-black leading-tight">„Liebe auf den ersten Löffel“ Garantie</span>
            </div>
            <div className="flex sm:flex-col items-center justify-start sm:justify-center text-left sm:text-center gap-3 sm:gap-2 p-3 sm:p-4 rounded-xl bg-[#E8F7F0]/50 border border-[#34A853]/20">
              <div className="w-10 h-10 rounded-full bg-[#34A853]/10 flex items-center justify-center text-[#34A853] shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-jet-black leading-tight">Versand in 24h</span>
            </div>
            <div className="flex sm:flex-col items-center justify-start sm:justify-center text-left sm:text-center gap-3 sm:gap-2 p-3 sm:p-4 rounded-xl bg-[#E8F7F0]/50 border border-[#34A853]/20">
              <div className="w-10 h-10 rounded-full bg-[#34A853]/10 flex items-center justify-center text-[#34A853] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-jet-black leading-tight">Sicher bezahlen</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}