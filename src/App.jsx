import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import CashOffer from './components/CashOffer/CashOffer';
import BuyingSection from './components/BuyingSection/BuyingSection';
import Mapimg from './components/Mapimg/Mapimg';
function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <CashOffer/>
      <BuyingSection />
      <Mapimg/>
    </div>
  );
}

export default App;