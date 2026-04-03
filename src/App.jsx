import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AhaMoment from './components/AhaMoment';
import ProblemSection from './components/ProblemSection';
import FailedSolutions from './components/FailedSolutions';
import Mechanism from './components/Mechanism';
import SocialProof from './components/SocialProof';
import RecipeSection from './components/RecipeSection';
import ProductSelector from './components/ProductSelector';
import ObjectionCrusher from './components/ObjectionCrusher';
import RiskReversal from './components/RiskReversal';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import MobileCTABar from './components/MobileCTABar';

const isV2 = import.meta.env.VITE_VERSION === '2';

function App() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      {isV2 && <ProductSelector />}
      <AhaMoment />
      <ProblemSection />
      <FailedSolutions />
      <Mechanism />
      <SocialProof />
      <RecipeSection />
      {!isV2 && <ProductSelector />}
      <ObjectionCrusher />
      <RiskReversal />
      <FinalCTA />
      <Footer />
      <MobileCTABar />
    </main>
  );
}

export default App;