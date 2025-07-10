"use client"
import React from "react"
import "./how-it-works.css"

const HowItWorks = () => {
  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        <div className="how-it-works-left">
          <h2 className="how-it-works-heading">
            Stay in the know.
            <br />
            Buy when you're ready.
          </h2>
          <p className="how-it-works-description">
          Discover homes with real-time insights, immersive virtual tours, and verified property data — all <br/>in one place.
            <br />
            <br/>
            We’ll help you make confident buying decisions.
          </p>
        </div>

        <div className="how-it-works-right">
          <div className="step-item">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3 className="step-title">Search your location</h3>
              <p className="step-description">Find top listings in your desired neighborhood with live market data.</p>
            </div>
          </div>

          <div className="step-divider"></div>

          <div className="step-item">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3 className="step-title">Explore property details</h3>
              <p className="step-description">Take 360° virtual tours and review price trends, features, and documents.</p>
            </div>
          </div>

          <div className="step-divider"></div>

          <div className="step-item">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3 className="step-title">Make your move</h3>
              <p className="step-description">Connect with trusted agents and secure your dream home, your way.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
