import "./hero-cta-section.css"
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroCTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero-cta-section">
      <div className="hero-cta-container">
        <div className="hero-cta-content">
          <div className="hero-image-left">
            <div className="circular-image">
              <img src="/house-ext.png" alt="Beautiful home exterior" />
            </div>
          </div>

          <div className="hero-center-content">
            <h2 className="hero-cta-title">Find the perfect home</h2>
            <p className="hero-cta-subtitle">See HomeScope360 homes that are for sale now.</p>
            <button className="hero-cta-button" onClick={() => navigate('/browse-homes')}>Browse homes</button>
          </div>

          <div className="hero-image-right">
            <div className="circular-image">
              <img src="/house-ext.png" alt="Beautiful home exterior" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroCTASection
