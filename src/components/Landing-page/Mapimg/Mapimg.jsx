import React from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Mapimg.css';

const MapSection = () => {
  const navigate = useNavigate();

  return (
    <section className="lpmi-map-section">
      <div className="lpmi-map-overlay"></div>
      <div className="lpmi-map-content">
        <div className="lpmi-stats-container">
          <div className="lpmi-stats-badge">
            <span className="lpmi-stats-badge-dot"></span>
            Live Updates
          </div>
          <h2 className="lpmi-stats-title">Over 2 million</h2>
          <p className="lpmi-stats-subtitle">and counting</p>
          <p className="lpmi-stats-description">
          Every 60 seconds, a new home is sold on HomeScope360.
          </p>
          <button className="lpmi-cta-button" onClick={() => navigate('/browse-homes')}>
            Get Your Dream Home Now
            <span className="lpmi-button-arrow">→</span>
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
