import React from 'react'
import './BuyingSection.css';

function BuySection() {
  return (
    <section className="buy-section">
      <div className="buy-container">
        <div className="buy-card">
          <div className="buy-card-content">
            <h3 className="buy-card-title">Buying options</h3>
            <h4 className="buy-subtitle">
              "Choose our services to find your dream property with expert guidance"
            </h4>
          </div>

          <div>
            <img
              src="/image copy.png"
              className="comment-image"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BuySection;
