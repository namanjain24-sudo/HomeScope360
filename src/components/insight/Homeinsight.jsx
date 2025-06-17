import React from 'react';
import { ArrowRight } from 'lucide-react';
import './Homeinsight.css';
const HomeInsightsSection = () => {
  return (
    <section className="home-insights-container">
      <div className="home-insights-content">
        <div className="home-insights-text">
          <p className="home-insights-subtitle">Not ready to sell today?</p>
          <h2 className="home-insights-title">
            Access home insights you can only find on Opendoor
          </h2>
          <button className="home-insights-button">
            Get insights
            <ArrowRight className="arrow-icon" size={18} />
          </button>
        </div>

        <div className="home-insights-image-container">
          <img 
            src="src/assets/image copy 2.png"
            alt="Modern white house with dark shutters" 
            className="home-insights-house"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeInsightsSection;
