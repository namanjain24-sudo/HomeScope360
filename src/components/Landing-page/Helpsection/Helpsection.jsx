import React from 'react';
import { Phone, Mail, HelpCircle } from 'lucide-react';
import './Helpsection.css';

const HelpSection = () => {
  return (
    <section className="help-section">
      <div className="help-content">
        <div className="help-text">
          <h2 className="help-title">
            Questions?
            <span className="help-subtitle">We have answers.</span>
          </h2>
          <p className="help-description">
            Tell us about your buying goals. We'll help you reach them.
          </p>
        </div>
        
        <div className="help-actions">
          <a href="tel:888-352-XXXX" className="help-button">
            <Phone size={20} />
            <span>888-352-XXXX</span>
          </a>
          
          <a href="mailto:support@home360.com" className="help-button">
            <Mail size={20} />
            <span>support@home360.com</span>
          </a>
          
          <a href="/help" className="help-button">
            <HelpCircle size={20} />
            <span>Visit our help center</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
