import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-jet-black text-white pt-24 pb-8 px-6 rounded-t-[3rem] -mt-10 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 mb-16 text-center md:text-left">
        
        {/* BRAND COLUMN */}
        <div className="w-full md:w-1/2">
          <h2 className="font-condensed font-extrabold uppercase tracking-tighter text-3xl mb-4 text-white">
            BrustBizeps
          </h2>
          <p className="body-text text-white/50 max-w-sm mx-auto md:mx-0">
            Deine gesunde Ernährung schmeckt jetzt endlich gut. Premium-Supplements für deinen Alltag. 100% laborgeprüfte Qualität.
          </p>
        </div>

        {/* LINKS COLUMNS */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end gap-8 text-sm">
          <ul className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
            <li><a href="https://brustbizeps.de/policies/legal-notice" target="_blank" rel="noopener noreferrer" className="font-sans font-bold uppercase tracking-widest text-white/35 hover:text-burnt-peach transition-colors">Impressum</a></li>
            <li><a href="https://brustbizeps.de/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-sans font-bold uppercase tracking-widest text-white/35 hover:text-burnt-peach transition-colors">Datenschutz</a></li>
            <li><a href="https://brustbizeps.de/policies/terms-of-service" target="_blank" rel="noopener noreferrer" className="font-sans font-bold uppercase tracking-widest text-white/35 hover:text-burnt-peach transition-colors">AGB</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          <span className="font-sans text-xs uppercase tracking-widest text-white/35 font-semibold">System Operational</span>
        </div>

        <div className="font-sans text-xs text-white/35 text-center md:text-right">
          © {new Date().getFullYear()} Sports Nutrition Germany. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}