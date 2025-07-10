import React from 'react';
import { Check } from 'lucide-react';
import './HomeFeatures.css';

const HomeFeatures = () => {
  const features = [
    "Self-tour on your schedule",
    "Skip bidding and pay one simple price",
    "Save thousands compared to list price"
  ];

  return (
    <section className="home-features">
      <div className="home-features-container">
        <div className="home-features-content">
          <div className="home-features-text">
            <h2 className="home-features-title">
              Find your next home and buy it directly from us
            </h2>
          </div>
          
          <div className="home-features-list">
            {features.map((feature, index) => (
              <div key={index} className="home-feature-item">
                <div className="home-feature-check">
                  <Check size={14} strokeWidth={2.5} />
                </div>
                <span className="home-feature-text">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;