"use client"

import React from "react"
import { useState } from "react"
import { Search } from "lucide-react"
import { Link } from "react-router-dom"
import "./homeinsighthero.css"

const HeroSection = () => {
  const [address, setAddress] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (address.trim()) {
      console.log("Searching for address:", address)
      // Handle address search logic here
    }
  }

  return (
    <section className="home-hero-wrapper">
      <div className="home-hero-grid">
        {/* Left Content */}
        <div className="home-hero-text-section">
          <div className="beta-join-badge">Join the beta</div>

          <h1 className="main-hero-heading">
            Real data.
            <br />
            
            Right Information. <br />less Prices.
           
          </h1>

          <p className="hero-subtitle-text">
            Keep track of your most important asset with the data we use to make millions of cash offers. Enter your
            address to get started.
          </p>

          <form className="address-search-form" onSubmit={handleSubmit}>
            <div className="input-with-search-btn">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter home address"
                className="address-input-field"
              />
              <button type="submit" className="search-icon-btn" aria-label="Search">
                <Search size={18} />
              </button>
            </div>
          </form>
          {address.trim() && (
            <Link to="/browse-homes" className="lp-hero-manual-entry">
              Enter address manually instead
            </Link>
          )}
        </div>

        {/* Right Image */}
      
          <img
            src="/image copy 3.png"
            alt="Modern house with smartphone showing home insights app displaying $550,000 valuation"
            className="house-phone-image"
          />
        </div>
    </section>
  )
}

export default HeroSection
