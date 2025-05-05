import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import CashOffer from './components/CashOffer/CashOffer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <CashOffer/>
    </div>
  );
}

export default App;