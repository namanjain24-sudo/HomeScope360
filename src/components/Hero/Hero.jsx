import React from 'react';
import { Search } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Make the easy move</h1>
          <p className="hero-subtitle">
          "Discover the comfort of your next home before you visit. Our immersive virtual tours and detailed listings let you explore every corner with confidence."
          </p>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Enter your address"
              className="search-input"
            />
            <button className="search-button">
              <Search size={20} />
            </button>
          </div>

          <div className="featured-section">
            <span className="featured-text">Featured in:</span>
            <div className="featured-logos">
              <span className="featured-logo nyt">The New York Times</span>
              <span className="featured-logo forbes">Forbes</span>
              <span className="featured-logo wsj">WSJ</span>
              <span className="featured-logo fortune">Fortune</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
            alt="Modern house with offers"
            className="main-image"
          />
          <div className="offer-bubble highest">
            <div className="offer-avatar">
              <img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" alt="Avatar" />
            </div>
            <div className="offer-content">
              <span className="offer-type">Highest offer</span>
              <span className="offer-amount">$452K</span>
            </div>
          </div>
          <div className="offer-bubble cash">
            <div className="offer-avatar">G</div>
            <div className="offer-content">
              <span className="offer-type">Cash offer</span>
              <span className="offer-amount">$438K</span>
            </div>
          </div>
          <div className="offer-bubble new">
            <div className="offer-avatar">
              <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="Avatar" />
            </div>
            <div className="offer-content">
              <span className="offer-type">New offer</span>
              <span className="offer-amount">$446K</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
