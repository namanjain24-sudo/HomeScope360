import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import CashOffer from './components/CashOffer/CashOffer';
import BuyingSection from './components/BuyingSection/BuyingSection';
import Mapimg from './components/Mapimg/Mapimg';
import Testimonials from "./components/REVIEW/Testimonials.jsx"
import HomeInsightsSection from './components/insight/Homeinsight.jsx';
import HelpSection from './components/Helpsection/Helpsection.jsx';
import Footer from './components/Footer/Footer.jsx';
function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <CashOffer/>
      <BuyingSection />
      <Mapimg/>
      <Testimonials/>
      <HomeInsightsSection/>
      <HelpSection/>
      <Footer/>
    </div>
  );
}

export default App;