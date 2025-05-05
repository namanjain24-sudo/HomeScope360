import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span>HomeScope360</span>
        </div>

        {/* Desktop Menu */}
        <ul className="navbar-links">
          <li>
            <a href="#how-it-works" className="navbar-link">How it works</a>
          </li>
          <li>
            <a href="#home-insights" className="navbar-link">Home insights</a>
          </li>
          <li>
            <a href="#browse-homes" className="navbar-link">Browse homes</a>
          </li>
        </ul>

        <div className="navbar-auth">
          <a href="#sign-in" className="sign-in-link">Sign in</a>
          <button className="menu-button" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'show' : ''}`}>
        <ul className="mobile-links">
          <li>
            <a href="#how-it-works" className="mobile-link" onClick={toggleMenu}>How it works</a>
          </li>
          <li>
            <a href="#home-insights" className="mobile-link" onClick={toggleMenu}>Home insights</a>
          </li>
          <li>
            <a href="#browse-homes" className="mobile-link" onClick={toggleMenu}>Browse homes</a>
          </li>
          <li className="sign-in-mobile">
            <a href="#sign-in" className="mobile-link" onClick={toggleMenu}>Sign in</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
