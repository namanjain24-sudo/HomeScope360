import React from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import './Mapimg.css';

const MapSection = () => {


 

  return (
    <section className="map-section">
      <div className="map-overlay"></div>
      <div className="map-content">
        <div className="stats-container">
          <div className="stats-badge">
            <span className="stats-badge-dot"></span>
            Live Updates
          </div>
          <h2 className="stats-title">Over 2 million</h2>
          <p className="stats-subtitle">and counting</p>
          <p className="stats-description">
            Every 60 seconds, a homeowner requests a cash offer from PropertyPro.
          </p>
          <button className="cta-button">
            Get Your Dream Home Now
            <span className="button-arrow">→</span>
          </button>
        </div>

        <div className="testimonials-container">
          <div className="testimonials-header">
            <h3 className="testimonials-title">
              <span className="highlight">Join our customers</span> and
              <br />move without the hassle
            </h3>
            </div>
            </div>
          </div>
      
    
    </section>
  );
};

export default MapSection;
