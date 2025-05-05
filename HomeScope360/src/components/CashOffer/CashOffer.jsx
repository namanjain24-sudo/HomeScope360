import React from 'react';
import './CashOffer.css';

const CashOffer = () => {
  return (
    <section className="cash-offer-section">
      <div className="cash-offer-container">

        <div className="cash-offer-content">
          <h2 className="cash-offer-title">Start your home search with detailed pricing.</h2>
          <p className="cash-offer-description">
          "Skip the guesswork—view homes with<br/> pricing details and virtual walkthroughs."
          </p>
        </div>

        <div className="cash-offer-card">
          <div className="cash-offer-card-content">
            <h3 className="cash-offer-card-title">Discover Your Home’s Price</h3>
            <h4 className="cash-offer-card-subtitle">
            "Get full price insights before you visit—view listings with immersive 360° tours."
            </h4>
          </div>

          <div className="cash-offer-device">
            <div className="device-frame">
              <div className="device-status-bar">
                <span className="device-time">9:41</span>
                <div className="device-status-icons">
                  <span className="device-cell-signal"></span>
                  <span className="device-wifi"></span>
                  <span className="device-battery"></span>
                </div>
              </div>
              
              <div className="device-content">
                <div className="device-header">
                  <div className="property-address">1983 Juanita Ave</div>
                  <button className="save-button">Save</button>
                </div>
                
                <div className="device-body">
                  <div className="form-section">
                    <h3 className="form-title">Do we have your home details right?</h3>
                    <p className="form-subtitle">Improve your offer's accuracy by updating details that might be outdated.</p>
                    
                    <div className="form-fields">
                      <div className="form-field">
                        <div className="field-label">Bedrooms</div>
                        <div className="field-dropdown">
                          <span>Select</span>
                          <span className="dropdown-arrow">▼</span>
                        </div>
                      </div>
                      
                      <div className="field-image-container">
                        <div className="field-type">Fixer Upper</div>
                        <div className="field-description">Kitchen and bathrooms need significant updates</div>
                      </div>
                      
                      <div className="form-field">
                        <div className="field-label">Bathrooms</div>
                        <div className="field-dropdown">
                          <span>Select</span>
                          <span className="dropdown-arrow">▼</span>
                        </div>
                      </div>
                      
                      <div className="field-image-container second-image">
                        <div className="field-type">Standard</div>
                        <div className="field-description">Kitchen has standard finishes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CashOffer;
