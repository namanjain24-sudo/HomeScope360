import "./features-section.css"

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <p className="features-subtitle">Search, tour, and buy</p>
          <h2 className="features-title">
            Easy to tour.
            <br />
            Simple to buy.
          </h2>
          <div className="features-description">
            <p>Tour and buy HomeScope360-owned homes on your schedule.</p>
            <p>Submit an offer online and skip the stress of bidding wars.</p>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-visual">
              <div className="map-visual">
                <img src="src/assets/Map___pins.png" alt="Property search map with listings" />
              </div>
            </div>
            <div className="feature-content">
              <h3 className="feature-label">Search</h3>
              <h4 className="feature-heading">Find HomeScope360-owned homes to tour</h4>
              <p className="feature-text">
                Get the HomeScope360 app or browse online to find homes to tour in your area.
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-visual">
              <div className="tour-visual">
                <img src="src/assets/Self_tour.png" alt="People walking through home entrance" />
              </div>
            </div>
            <div className="feature-content">
              <h3 className="feature-label">Tour</h3>
              <h4 className="feature-heading">Unlock the door with your phone</h4>
              <p className="feature-text">
                Visit homes on your schedule. They're open for tours every day of the week.
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-visual">
              <div className="mobile-visual">
                <img src="src/assets/mobile-app.png" alt="HomeScope360 mobile app interface" />
              </div>
            </div>
            <div className="feature-content">
              <h3 className="feature-label">Buy</h3>
              <h4 className="feature-heading">Buy it from us and skip the bidding wars</h4>
              <p className="feature-text">
                Never be outbid again. Find a home you love, sign the contract, and it's yours. It's that simple.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
