import './Herosec.css';

const HeroSection = () => {
    return (
      <div className="howitworks-hero-container">
        <div className="howitworks-hero-content">
          <div className="howitworks-hero-image-container">
            <img 
              src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop" 
              alt="Beautiful home at dusk with warm lighting"
              className="howitworks-hero-image"
            />
            <div className="howitworks-hero-overlay">
              <div className="howitworks-hero-text">
                <h1 className="howitworks-hero-title">Buy without bidding</h1>
                <p className="howitworks-hero-subtitle">
                  Browse and self-tour Opendoor-owned homes.<br />
                  When you find one you love, you can buy it online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeroSection;