import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Home, Mail, Phone, Download } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-column">
            <h3>About</h3>
            <ul>
              <li><a href="#">Company</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">News</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Investors</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Terms & Privacy</h3>
            <ul>
              <li><a href="#">Trust and safety</a></li>
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Cookie preferences</a></li>
              <li><a href="#">Fair Housing Notice</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Services</h3>
            <ul>
  
              <li><a href="#">Browse homes</a></li>
              <li><a href="#">Virtual tours</a></li>
              <li><a href="#">Reviews</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Partners</h3>
            <ul>
              <li><a href="#">Agents</a></li>
              <li><a href="#">Builders</a></li>
              <li><a href="#">Work with a designer</a></li>
              <li><a href="#">Vendors</a></li>
              <li><a href="#">Photographer network</a></li>
            </ul>
          </div>
        </div>

        {/* <div className="footer-middle">
          <div className="app-download">
            <h3>Get the app</h3>
            <div className="store-buttons">
              <a href="#" className="store-button">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png"
                  alt="Download on App Store"
                />
              </a>
              <a href="#" className="store-button">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1024px-Google_Play_Store_badge_EN.svg.png"
                  alt="Get it on Google Play"
                />
              </a>
            </div>
          </div>

          <div className="help-center">
            <h3>Still have questions?</h3>
            <a href="#" className="help-buttons">
              Visit the Help Center
            </a>
          </div> */}
        {/* </div> */}

        <div className="contact-info">
          <div className="contact-method">
            <Home size={18} />
            <span>123 Real Estate Ave, Suite 100, New York, NY 10001</span>
          </div>
          <div className="contact-method">
            <Phone size={18} />
            <span>(555) 123-4567</span>
          </div>
          <div className="contact-method">
            <Mail size={18} />
            <span>info@home360.com</span>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            <p>© 2025 Home360 | All rights reserved.</p>
          </div>

          

          <div className="social-links">
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
