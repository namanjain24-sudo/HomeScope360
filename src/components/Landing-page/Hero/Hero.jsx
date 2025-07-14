import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <section className={`lp-hero${animate ? ' hero-animate' : ''}`}>
      <div className="lp-hero-container">
        <div className="lp-hero-content">
          <h1 className="lp-hero-title">Make the easy move</h1>
          <p className="lp-hero-subtitle">
            "Discover the comfort of your next home before you visit. Our immersive virtual tours and detailed listings let you explore every corner with confidence."
          </p>
          
          <div className="lp-hero-search-container">
  <div className="lp-hero-input-wrapper">
    <input
      type="text"
      placeholder="Enter your address"
      className="lp-hero-search-input"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
    <button className="lp-hero-search-button">
      <Search size={20} />
    </button>
  </div>
  {inputValue.trim() && (
    <Link to="/browse-homes" className="lp-hero-manual-entry">
  Enter address manually instead
</Link>
  
  )}
</div>


          <div className="lp-hero-featured-section">
            <span className="lp-hero-featured-text">Featured in:</span>
            <div className="lp-hero-featured-logos">
              <span className="lp-hero-featured-logo nyt">The New York Times</span>
              <span className="lp-hero-featured-logo forbes">Forbes</span>
              <span className="lp-hero-featured-logo wsj">WSJ</span>
              <span className="lp-hero-featured-logo fortune">Fortune</span>
            </div>
          </div>
        </div>

        <div className="lp-hero-images">
          <img
            src="src/assets/img.png"
            alt="home exterior"
            className="lp-hero-main-image"
          />
          <div className="lp-hero-offer-bubble highest">
            <div className="lp-hero-offer-avatar">
              <img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" alt="Avatar" />
            </div>
            <div className="lp-hero-offer-content">
              <span className="lp-hero-offer-type">Highest offer</span>
              <span className="lp-hero-offer-amount">$452K</span>
            </div>
          </div>
          <div className="lp-hero-offer-bubble cash">
            <div className="lp-hero-offer-avatar">G</div>
            <div className="lp-hero-offer-content">
              <span className="lp-hero-offer-type">Cash offer</span>
              <span className="lp-hero-offer-amount">$438K</span>
            </div>
          </div>
          <div className="lp-hero-offer-bubble new">
            <div className="lp-hero-offer-avatar">
              <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="Avatar" />
            </div>
            <div className="lp-hero-offer-content">
              <span className="lp-hero-offer-type">New offer</span>
              <span className="lp-hero-offer-amount">$446K</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
