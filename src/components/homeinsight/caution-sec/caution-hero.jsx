"use client"
import React from 'react';
import { Home } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import "./caution-hero.css"

const UnlockInsights = () => {
  const navigate = useNavigate();

  return (
    <section className="unlock-insights-section">
      <div className="unlock-insights-container">
        {/* Left House Image */}
        <div className="house-image-left">
          <img
            src="src/assets/img.png?height=400&width=300"
            alt="Beautiful blue house with front porch"
            className="house-img house-img-left"
          />
        </div>

        {/* Center Content */}
        <div className="insights-content-center">
          <h2 className="insights-main-heading">Unlock your insights</h2>

          <p className="insights-subtitle">
            Get the estimated value of your home and plan
            <br />
            your next big move.
          </p>

          <div className="browse-homes-section">
            <button className="browse-homes-button" onClick={() => navigate('/browse-homes')}>
              <Home size={20} />
              <span>Browse Homes</span>
            </button>
          </div>
        </div>

        {/* Right House Image */}
        <div className="house-image-right">
          <img
            src="src/assets/house-ext.png"
            alt="Modern house with contemporary design"
            className="house-img house-img-right"
          />
        </div>
      </div>
    </section>
  )
}

export default UnlockInsights
