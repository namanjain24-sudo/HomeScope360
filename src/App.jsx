import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Landing-page/Hero/Hero.jsx';
import CashOffer from './components/Landing-page/CashOffer/CashOffer.jsx';
import BuyingSection from './components/Landing-page/BuyingSection/BuyingSection.jsx';
import Mapimg from './components/Landing-page/Mapimg/Mapimg.jsx';
import Testimonials from "./components/Landing-page/REVIEW/Testimonials.JSX";
import HomeInsightsSection from './components/Landing-page/insight/Homeinsight.jsx';
import HelpSection from './components/Landing-page/Helpsection/Helpsection.jsx';
import Footer from './components/Landing-page/Footer/Footer.jsx';
import HowItWorksBuy from './components/HowItWorksBuy';
import AuthSection from './components/Auth/auth-section.jsx';
import BrowseHomes from './components/BrowseHomes';
import HomeInsight from './components/HomeInsight';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <CashOffer/>
              <BuyingSection />
              <Mapimg/>
              <Testimonials/>
              <HomeInsightsSection/>
              <HelpSection/>
            </>
          } />
          <Route path="/how-it-works-buy" element={<HowItWorksBuy />} />
          <Route path="/auth" element={<AuthSection />} />
          <Route path="/browse-homes" element={<BrowseHomes />} />
          <Route path="/home-insight" element={<HomeInsight />} />
          {/* Add more routes here as you create new pages */}
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;